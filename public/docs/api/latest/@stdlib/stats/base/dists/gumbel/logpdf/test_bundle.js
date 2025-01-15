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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":53}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":54}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":55}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":133}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":133}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":133}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":133}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":80}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":61}],61:[function(require,module,exports){
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/to-words":97}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":69,"@stdlib/math/base/special/ldexp":72}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":66,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/trunc":78}],69:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":48,"@stdlib/constants/float64/max-base2-exponent-subnormal":47,"@stdlib/constants/float64/min-base2-exponent-subnormal":49,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/copysign":64,"@stdlib/number/float64/base/exponent":82,"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/normalize":91,"@stdlib/number/float64/base/to-words":97}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_p.js":76,"./polyval_q.js":77,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/set-high-word":94}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":70}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":88}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":86}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":85,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":87,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":90,"./main.js":92,"@stdlib/utils/define-nonenumerable-read-only-property":126}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":90}],93:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":87}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":93,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":98,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":96,"./main.js":99,"@stdlib/utils/define-nonenumerable-read-only-property":126}],98:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":85}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":96}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.0, 2.0 );
* var y = logpdf( 0.0 );
* // returns ~-1.693
*/
function factory( mu, beta ) {
	var lbeta;
	if (
		isnan( mu ) ||
		isnan( beta ) ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	lbeta = ln( beta );
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a Gumbel distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 2.3 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x === NINF ) {
			return 0.0;
		}
		z = ( x - mu ) / beta;
		return -z - exp( -z ) - lbeta;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/exp":67,"@stdlib/math/base/special/ln":74,"@stdlib/utils/constant-function":124}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Gumbel distribution logarithm of probability density function (PDF).
*
* @module @stdlib/stats/base/dists/gumbel/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/gumbel/logpdf' );
*
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.137
*
* var mylogpdf = logpdf.factory( 10.0, 2.0 );
* y = mylogpdf( 10.0 );
* // returns ~-1.693
*
* y = mylogpdf( 12.0 );
* // returns ~-2.064
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":100,"./main.js":102,"@stdlib/utils/define-nonenumerable-read-only-property":126}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated logarithm of PDF
*
* @example
* var y = logpdf( 0.0, 0.0, 2.0 );
* // returns ~-1.693
*
* @example
* var y = logpdf( 0.0, 0.0, 1.0 );
* // returns ~-1.0
*
* @example
* var y = logpdf( 1.0, 3.0, 2.0 );
* // returns ~-2.411
*
* @example
* var y = logpdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logpdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function logpdf( x, mu, beta ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( beta ) ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	z = ( x - mu ) / beta;
	return -z - exp( -z ) - ln( beta );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/exp":67,"@stdlib/math/base/special/ln":74}],103:[function(require,module,exports){
module.exports={"expected":[-3.0475560295473665,-2.2738474803071886,-3.9343124724075023,-3.284739729193,-3.936929361683225,-3.857866333191266,-3.9072985551687083,-2.1948572733192178,-3.272108403075209,-2.3947050948893542,-3.7700070523340377,-3.6459905141875457,-3.3437638030114227,-3.9100358324411952,-2.3282702008777756,-3.4288781306355993,-3.407326670559633,-2.5687940995271963,-2.5402464035333496,-2.9732728732504805,-2.1616589647550972,-3.6263748187769527,-3.8042531918156426,-3.717141545896648,-3.338885442298702,-3.5932913270855784,-3.5457257825777324,-3.290097593915522,-3.587826010239902,-3.855420872584297,-3.9417968122546605,-3.527688266322227,-3.236639090540837,-3.548570285759284,-3.754556960926662,-3.47344912506055,-3.543902536096939,-3.8289196305721123,-2.190437792572424,-3.8923220863772183,-3.94968651991668,-3.242532713368252,-9.849978747038659,-3.0087739116167516,-3.422486840660401,-2.2448550365839814,-5.241786636284851,-3.6518790925375786,-3.631354770865012,-3.5300636608487945,-2.3759373467025036,-2.651949839223279,-1.66979407824513,-2.8685977293740255,-3.528643138412257,-1.962422796820409,-3.8698794891009785,-3.8776525382923097,-2.7362534723061716,-2.472057077764493,-3.5133736190447458,-2.6883934978494524,-3.1329040358986173,-2.56865546251803,-3.752173580986865,-2.885984404631386,-3.09409636216058,-3.687328853242172,-3.609000169562198,-3.4942951348557694,-3.193207639441337,-3.526040542176244,-4.001043875627422,-3.926583804234189,-2.470506563897442,-3.6934413940117157,-2.9458347278713237,-3.1680409325235455,-2.5199928060914467,-3.392005011894936,-3.992947694349799,-2.272467818299304,-2.589860431709398,-3.71443651779416,-2.555073974145638,-3.277606604975267,-3.7713306057514666,-3.38424393726593,-3.7845049510015896,-3.653201532975496,-3.544949184623496,-3.2741938320671347,-3.218305132901094,-3.476308046664287,-2.790042483888854,-3.0630520779450645,-3.058321163453918,-3.8630585695011517,-3.4456398632925165,-3.3228018566946824,-3.6943843492804884,-3.346664950059269,-3.4364369224987694,-6.151273806986403,-2.9558475209834896,-3.4421898854508974,-3.033850255916284,-3.6757907177187223,-2.6530242905103893,-2.782362846187682,-3.4512762496405833,-2.859755908039781,-3.1390235325571956,-2.487149518679253,-3.871704432353775,-3.7470269567747856,-2.8132057701580537,-2.6818785182142957,-3.4432159491557597,-2.816490050463677,-3.847212992223452,-3.715880537115521,-3.8278559008378714,-3.684797973680543,-2.5403782754482167,-3.5453068920235666,-3.613990089511806,-3.943875382990491,-2.7029834767920677,-3.213105821727104,-3.553911383152558,-2.5828542406179107,-3.3743688717854274,-3.9526730271560293,-3.906472110895666,-2.835225268976532,-3.11559171922695,-3.2578570089074628,-2.231944277020554,-3.4475336599372257,-3.8866487310713107,-3.5256967464384243,-3.5594327430538293,-3.8201092351029953,-3.9790461873762615,-3.0884438116634367,-3.913538800674175,-3.026046376274456,-3.65072817835598,-3.748328759025149,-3.7794773857084993,-3.8468953644642188,-2.8555731492607572,-3.765567053927967,-3.624509003103321,-3.78450311303725,-3.853596973143479,-2.3639566640442347,-3.5949163054418802,-3.895200699851692,-2.3185887154799927,-3.9594961347075346,-3.3027818098112847,-3.5501718216057143,-3.8469975405547614,-2.0658345526218573,-3.639738451083864,-3.1392339768978363,-3.040394889527592,-2.448363478944781,-1.5549922038066093,-3.8247078001122388,-4.003978609172626,-2.9887584947083714,-3.5720925838987228,-3.2193672649706233,-3.3580290866243443,-3.501699129346572,-3.7209661949458037,-2.682426115418494,-2.5806922799104473,-3.9403700120603746,-2.6773412957706997,-3.8654905988090826,-3.264025851183366,-3.6908572989074897,-3.89931622474903,-3.018111096563363,-3.6496463094839733,-3.300435450377985,-3.7305958606934966,-3.56479997659269,-2.173920310892121,-3.1600294137978113,-3.638922303095518,-3.675130335596004,-3.9566674776563744,-2.294385711541717,-2.9714766304733256,-2.9652349888489544,-2.60606647415223,-2.0833508228873017,-3.0338508625216494,-2.5526465890463914,-3.1245480716278955,-3.8839308715804237,-2.1127984334570318,-3.988044202692063,-2.7311395039590387,-3.3454986598776575,-4.401817925284335,-3.871226954776447,-3.385213383249654,-3.619238302527065,-3.4704464274515585,-3.3432622021781238,-3.5192223333829036,-3.763054831187958,-3.5770800211807336,-3.749232338124561,-3.4823494422473793,-2.3808940727715364,-3.4750972462945495,-3.6610397745238927,-3.9725762709634083,-3.9032330777835416,-2.680484236393257,-3.24673165534094,-3.5882449443162217,-3.9703234394999845,-3.007353321500039,-2.754487130852305,-3.6614681261246966,-3.4289065874511166,-3.3390575947213543,-3.2462198889477607,-3.813550988572372,-3.0631084482656457,-2.8905944724926136,-2.947845188280618,-3.8943764390377575,-3.5749518555990027,-3.2787809671169983,-3.0967293885551372,-2.7701727558908726,-2.86300900066658,-2.8612764843637577,-2.2562851237492625,-3.590243263549232,-3.1027093850089447,-3.4786329373750657,-3.1079052344209783,-3.8128966943758273,-3.7812596034930306,-3.8061646557575926,-2.7541988481156157,-3.7599200551444305,-2.771581196747479,-3.481506863444128,-2.723043100562629,-2.863074680172242,-3.5076417680671903,-4.001670895676716,-3.8990416372560253,-3.340090986619278,-2.6578812817761004,-3.308247177579968,-6.708614956188446,-3.2663740387646114,-3.394918932441231,-2.8185669849646446,-3.6375075816329647,-1.3175565221397285,-3.896189622149934,-0.8547313736717806,-2.4634455505324633,-3.2931730927087415,-2.5621277360684176,-3.969532020255656,-3.552475778727801,-4.166014635282357,-2.0821756417790027,-2.277233293708069,-3.3651210816368744,-1.7266385537772,-2.9428917846827827,-3.0634849798349855,-1.9282525936209223,-3.482852246193033,-2.569375915434165,-3.328983740737969,-2.662144911276113,-3.422593224263888,-5.6923281322375265,-2.687493599679994,-2.5781513066921953,-2.208274270737958,-3.876193914120924,-3.312273471673031,-3.3670919209322547,-3.8950029531381736,-3.2755178316947386,-3.0676110483953227,-3.11103088344587,-3.4572977457501706,-3.1997566734061826,-3.995969427267181,-3.180244599007886,-2.694878837982368,-2.0144167105527115,-3.7720882235154107,-3.380551590738515,-2.538665270226307,-3.887970063771456,-2.985453447196459,-3.9268843929993507,-2.714441281948678,-3.99280954470255,-2.44238303099093,-3.714263292817658,-1.1875353636201913,-3.7455537660023994,-2.512465305431509,-2.6904684910887653,-2.2946531089200537,-1.1614522923427368,-1.765769889572082,-2.166876537706553,-3.5275784772118266,-2.9831085709240837,-2.008052148999931,-3.4358964454811356,-3.0738355866120077,-3.8213312695372545,-3.159040427963522,-3.545726305648072,-2.9860224185060273,-2.5215466208786452,-2.880626730651053,-3.822200722608837,-3.9819698171386158,-3.8839126145894776,-3.991693415203231,-2.741549427783821,-2.1931629407759043,-2.7300345159176045,-3.732948361331128,-2.890696237815819,-3.714254323296105,-3.2084288698866974,-2.2690832523012077,-2.970857581390452,-3.9464809555972966,-3.9453142225744786,-3.4728963108490545,-3.6815605745945263,-3.4055358521798773,-2.9860333405452204,-3.4327518094636655,-3.153688105559615,-3.5386213720088016,-3.8740325887139706,-3.360560312768534,-3.8754868552764505,-2.61777067809778,-2.615499804305776,-3.012449987170289,-2.481818057469861,-3.5787503392224767,-3.5143053278961087,-3.9606875349747064,-3.0270674971991802,-3.227468614994531,-2.462314158096399,-20.339987013749273,-3.5172438657511558,-2.0635169882746416,-3.9360373104888087,-3.364272026846936,-1.884227305616815,-2.4936294928364866,-3.516349826154496,-4.007355393859832,-2.3999813183674563,-2.167247029793225,-3.789090355360525,-3.126887174613091,-3.516758002673107,-3.8594852693891735,-2.663107851126899,-3.523231305706269,-2.3800678632182843,-3.9479604960469974,-3.8056187950358655,-2.6640844395458085,-3.0933658490100795,-3.139327712496978,-3.2024531689158175,-3.9177245357303483,-3.1586303769556583,-3.4997240319580314,-2.8377397353542357,-3.1324608180191085,-3.7212248024174417,-2.8019100530933696,-3.841033531032451,-2.2318532146558945,-2.2534126176331886,-2.7070265140514786,-3.15789078915402,-3.2945263946674057,-3.9047256351860726,-3.6756671316294276,-3.2384544708459404,-3.2252927649981524,-3.212794962182648,-3.719506514768172,-3.9786815067561294,-3.39384085597025,-2.4424608725368073,-3.7511937475716004,-3.547201798675455,-3.7115040623080278,-2.686150147549947,-3.1218824944163,-3.893167912652725,-3.5258304722857847,-2.6739999673355763,-3.2990988889854984,-2.5790109058827957,-2.781079512526645,-3.732921214708357,-3.2288537000072615,-2.901453564414727,-3.264420823957223,-2.4366243769444322,-3.4435200360763796,-3.7605721549774636,-2.133730930322873,-1.4163297680141367,-3.5341234709581433,-2.316836521007742,-3.0405425555897043,-2.9984850383350086,-3.0943735872033136,-3.9924638997723054,-9.716517891552337,-3.9791864092414286,-2.9130106079663687,-2.624012655249042,-4.000392802340362,-2.6888600282327113,-3.771275855194561,-3.2872407294659047,-3.767164600119295,-3.823979407594601,-2.5213353430404606,-3.864529041931241,-2.3374328925461696,-3.873438378459582,-3.33187226907165,-3.2055838266419108,-3.4320975826177182,-2.9300664435845682,-3.3859492004324188,-3.0315369779845973,-3.532566287303749,-4.890362334802549,-3.97333769070256,-2.994646130680004,-3.1582298178903643,-1.3913160152121604,-2.7930289676762827,-3.057246204907975,-3.7654431484702133,-3.6795905639543673,-3.728640558613388,-3.7052037268399123,-3.8964092138372592,-2.0026885915329053,-3.9054300998813742,-1.822163389127506,-3.8900174161884835,-3.459894556526222,-3.668046987038228,-2.1542566657732847,-3.7347656039316695,-2.0659976136880935,-3.617319872616031,-2.6821742891129317,-3.9700604658444725,-2.7484532106441315,-3.8698817107613035,-1.1408122218784233,-3.9730032571417295,-3.8965387151689725,-3.9148803711479467,-1.900380794121287,-3.964546236186247,-3.880535285124561,-3.4782103015586854,-3.640416053679126,-2.8665532702982226,-1.0998370276222207,-3.6937231371652173,-3.216194860173734,-2.2739747782182738,-3.4019460376617565,-3.9767543973024675,-3.4809803106721313,-2.585915283778209,-3.644477923098189,-1.987405301088536,-3.957523458888005,-2.4735376340360338,-3.008733060222549,-4.01054711205404,-2.0678269983196245,-3.028452267283062,-3.5529004612460375,-3.0218468179572406,-3.645018389885,-2.915545862604334,-3.4337575752481535,-3.010106302439869,-3.6660080160587416,-3.7563674336832293,-3.6725317050114317,-3.7187894843318356,-3.856994485521153,-1.93625059893248,-6.072168279756852,-2.5478859814466297,-3.8540409925635286,-3.826846152304955,-3.6780330087676862,-3.990011644503448,-17.20510875543248,-2.35064820285809,-3.846128559510246,-2.393499099410913,-2.5302124517653715,-3.7721319035345955,-3.581173239342057,-2.6938358915666307,-3.6331154426124455,-2.9858909583526843,-3.4725311762772875,-3.732442509554417,-3.1606057555195637,-3.980478210354076,-13.421243138085625,-0.4776374764484259,-3.058397915230489,-3.9339219723693284,-3.600616880309788,-3.864946353052502,-1.8569675350610102,-3.5124159103401773,-3.960302012835079,-3.8362450999788362,-3.5796967105510187,-2.887028023208364,-2.3335447562858795,-3.7490349650742867,-3.8133026027627412,-3.5036547257112716,-2.1999160406028517,-3.6287916528594186,-3.4793290652090514,-3.8211424313121816,-2.560162077454421,-3.134074041816031,-3.035303871170938,-3.629927702516915,-2.3017497841104335,-3.676829100132582,-3.2676754923161218,-22.55437769700462,-3.89845041876987,-3.2676577761266676,-3.801408843109771,-3.8399576443056276,-2.8890034584056488,-3.401870386415216,-3.9796069134418124,-3.4969008234842667,-3.3892092452877494,-3.6550287190912125,-3.8720362507153387,-3.53114382519178,-2.679775481115473,-3.068355332748742,-2.5696946026119956,-3.7561953545384514,-3.2294235201021193,-3.2537089043310967,-3.448732691217053,-3.2755500756254814,-3.4724642972719546,-3.6000347999381423,-2.5149776229198912,-3.065824383882032,-1.950980819423896,-3.967689540814443,-3.096908770885527,-3.76893138231062,-3.3788580321084654,-2.7309560221732223,-3.3203678370166574,-2.7664340558448215,-3.9741373920577363,-3.783379372179423,-2.6601139092431074,-3.525119511518194,-2.272135628725099,-3.6704178042740074,-3.1971831040958163,-3.3965867343992575,-3.4371624389597297,-3.741462497696876,-3.6332743030322616,-3.34145149438761,-1.829789945435729,-3.8077102737296533,-2.3294642304006334,-2.7985677544704832,-1.9319814994145463,-2.85976838369572,-3.348911836587479,-3.7777191801472876,-3.689877909266486,-3.790904110899036,-3.793175159235495,-3.6756256498342084,-1.9038307922345274,-2.315607815730967,-2.5226353438320928,-3.557971831543057,-3.0954359380982246,-3.4392013527483094,-3.979073268557804,-2.4822094419806895,-3.8249240153939987,-2.1501324190730413,-3.7436230557994694,-3.8368263959297835,-2.9972100225663145,-3.5108661793811247,-3.3238361336883946,-3.760348092703209,-3.7842753374833604,-3.9080683548593926,-3.78440270362222,-1.2757484754674926,-0.7902786327676992,-3.5883139693243553,-2.1407977831847234,-2.422198492199268,-3.916972660069489,-3.5752786898881315,-3.7706853588441445,-3.8389629306126247,-2.937054150598353,-3.874961941377365,-3.7476742988515586,-2.9510912203730904,-3.0426937699893477,-2.3925795094224216,-3.7418546234286625,-2.7625163477321166,-1.2584130949186745,-2.925355540071423,-26.46190705372984,-2.4485209073347196,-3.7307198791840497,-3.592605047838455,-3.9032640416723394,-3.415190539738693,-3.9458931245754147,-3.801986632338042,-3.711107415287709,-2.9229183235318867,-3.80340465277863,-3.252819016878364,-3.602301279407971,-2.5486830944142587,-3.4279308646101683,-3.40953435647502,-3.6610994083884507,-3.729924240331587,-3.8216553440942773,-3.264251386282357,-3.169263832982219,-2.9852017464300253,-2.1222664144252015,-3.3874042341819246,-3.042223953878221,-2.729107994316788,-3.4760934729210367,-3.9437650152997015,-3.411203535391852,-3.973481530377743,-2.112955948230636,-3.8623446896607936,-3.816860671775564,-3.73399459551203,-3.3424036438391442,-4.001026772468211,-1.5393387309246354,-2.855481056558828,-2.8928720983607024,-3.8436380179859055,-3.4276196027917853,-2.4364583968406306,-3.7759436955262125,-2.6503895402787014,-3.1988591694109156,-3.67579921311924,-3.8520453908390113,-3.5431767163481687,-3.6302815032859184,-2.0970405522068836,-3.621844041166515,-3.171762500849466,-26.79351258858089,-3.9184861789382675,-3.537825946231183,-2.3332395674362125,-2.2657922082310304,-3.463373383634513,-3.767559142915961,-3.2681695025679423,-3.0541215129793837,-40.792851848519334,-3.8164402035254374,-3.5532737953260773,-3.250592507384326,-3.9704192869031987,-2.2945144220407014,-3.2082341991483334,-3.9505935128661527,-3.8670403828121547,-2.0128865334175354,-3.625643400851909,-3.754870259829243,-3.690398160651574,-3.583644017436003,-2.6684140154507325,-3.303828084056083,-3.8388613934381777,-2.6655368085211775,-3.510865588697623,-3.473129463643864,-3.9650095684082842,-3.8873610771971148,-2.3731345180886514,-3.7614525912060888,-2.9432701350807084,-3.143018621220699,-1.6441618263238649,-3.9360103429147766,-3.352020457953043,-3.3582423642574417,-3.661180484158182,-3.7001422881003236,-3.0495516442202826,-3.3098492581988386,-3.580531524727408,-3.5620285142840715,-3.1232116991466174,-3.13626617830246,-3.006525855059306,-0.8617040859314962,-3.7327749567570088,-3.2355273358161325,-3.6221356430151603,-2.061269642061248,-3.9305345691190663,-3.801112285433387,-2.659013967306331,-3.5216609695131256,-2.997901992692716,-2.7985466129317618,-3.9695231291321207,-3.1810628533267127,-3.98386803286723,-2.8207162626791145,-3.6173828578685443,-3.5301559156910947,-3.914216216086784,-2.66979841537793,-2.4701037219720874,-1.8299885701122245,-3.0947832824854595,-3.886665703394049,-3.827884604810212,-1.0124690521490107,-3.936571450611594,-2.579474470161481,-2.1254367909343497,-3.3521134676342976,-3.7495540299363803,-2.3393259310080152,-2.7082639557417068,-3.4952299333404464,-3.785817392271768,-3.3516190494407665,-2.7975181484573204,-3.534366758499491,-3.4503180704582443,-2.969848553520384,-3.8146059568994097,-3.3456530574495504,-3.166283760289307,-2.0371464402965813,-3.8439826330559947,-2.943643690081206,-3.4857983460228286,-2.538440758268731,-3.677646878288149,-3.9698580161278416,-3.9023777667463055,-3.9251097767307805,-3.849685727883103,-3.7937908836724854,-2.6685686932087305,-2.080504607602103,-2.5254389469516725,-3.9011070750187167,-2.0598150307163126,-2.5004850639834606,-3.7898713563135793,-1.4964797240628485,-4.00230577093142,-3.226701762945271,-2.833429137913297,-0.5062677534817864,-3.9145891948418745,-2.8792322612802685,-3.5754212456203307,-3.6182574784460186,-2.7803374331946022,-3.652685421682685,-3.215032317305883,-3.708536995123577,-3.6118142857233337,-3.146318416878143,-2.1234866978960425,-8.786514817947348,-3.468787652609807,-2.7967949331095605,-3.4020886753802544,-2.445916005028428,-2.644924916775632,-3.256432920395496,-3.382709269543734,-3.9715634707834244,-3.612876378851378,-3.5953601617887188,-2.894849435196232,-3.402962887119742,-2.690964822165802,-3.683011209739135,-3.524966183550052,-3.6220760168603734,-3.8338814379983273,-3.236524451356424,-3.4578294393371882,-3.887271551548228,-3.087438095772672,-3.2353959734005793,-1.0858266020003795,-3.1251706503675627,-3.1590347868460604,-3.892506947279604,-3.3266150152579206,-3.65920150012834,-3.0907921508922422,-2.1062189647224066,-3.070003258437265,-3.8980238424243616,-2.2150525894479234,-3.955725978703205,-2.730302825466759,-2.9581171764374616,-3.87853170952923,-3.995789622705791,-2.8258009551267342,-3.9463853265301885,-1.1789590334495417,-2.8512558683994773,-1.8817979926951414,-3.9478551247116007,-2.353360245288146,-3.2374157219613484,-3.8650053838072767,-1.2554807782250814,-2.8612167696276853,-3.4099071190881602,-3.3462187810547324,-3.634266643571065,-2.726281410422745,-3.8608484664473286,-3.84732997966244,-3.2319430486854963,-3.5869836046931116,-3.7743459252326015,-3.6791506235860068,0.12760747654157223,-2.962617222294505,-3.626173689978237,-2.9190555498257327,-3.8985717389205687,-2.6001591507561956,-3.7342782626393913,-3.3489640443375532,-3.351124430491715,-3.968277293704098,-3.4970568394786103,-10.091997815322564,-3.7496360317529556,-2.740161214729428,0.5472827316118747,-3.5113446861008484,-3.328350196776364,-3.4323876536263396,-3.907618353689502,-2.69146436923414,-3.880937809451874,-2.278417328307757,-3.93278295281205,-4.601737685342832,-3.088227899856781,-2.9944885372502386,-3.598976544704289,-3.8733826574819195,-2.866039801733394,-71.24981854433095,-3.537223187544636,-3.357788393789494,-3.619033251754029,-3.3167547673721467,-3.6971547557913063,-3.9791805539003215,-3.9817908114198124,-2.8403872987064807,-1.441262523361757,-2.768046780405501,-3.320407213387981,-3.566930566635481,-3.4885675986168123,-3.674658468927918,-3.985789332371587,-3.7578646590293,-3.942369569568203,-2.6269099107838807,-3.9588868345312864,-2.520136376275053,-2.9110898594957373,-2.8464147600512124,-4.003980788725741,-3.2138115048596045,-2.924603522265066,-2.7684006808531683,-3.5093320087237014,-3.058515634201523,-3.1246867601642894,-3.8845211549426875,-4.008152146799049,-3.1485407113304467,-3.9782338470327776,-3.106306969191699,-3.720032962022315,-3.5325570090442,-2.93864586976973,-2.833685247284993,-3.496924581180598,-3.3516532680980573,-3.021378373637219,-3.9724157441667884,-3.1237377258304675,-5.627876011855228,-3.269334656068387,-3.9704358427960456,-3.5454003467497586,-3.7350851094199733,-3.7551447259717774,-3.8223903336025864,-3.4053275120737005,-3.512258526690983,-3.2460819570831116,-2.8669694094794393,-2.7078500758633295,-2.943012958198433,-2.8876344768750943,-3.743721126772758,-3.8247076266612545,-6.793048760765652,-3.861452758243532],"x":[3.124101584113903,2.6852854342795798,2.701860442821793,0.2620462610098051,1.10717315846537,0.7047422424689853,1.9522401856380767,2.5581873559429003,2.7486245323268257,0.8669262191476201,1.6005825498642512,1.6726742467699296,2.6910334394076276,2.6903873207947706,3.1030557742677836,1.5414144485756875,1.6416449189377469,3.9637227143518894,2.2942634822057064,2.2338013401176084,1.7406769576861747,1.6457931273744586,3.4849119453067567,0.15613023804398773,0.028960798880922622,4.828558651848505,2.8072633940792313,2.5249428620895475,0.4343996194297106,4.793624266444069,3.1760246793515687,0.24671749833066858,0.9734258407741414,1.00161500541884,4.495381939861698,1.545433857959444,1.196913995097415,3.042410862894908,0.992457054245317,0.9820296671802964,3.410225669902338,3.3958146011763555,4.577022789076461,1.933597825981982,2.924077366350919,2.1937157548234465,3.447007201942589,4.816132559939295,4.449356578879843,0.680890372625581,1.8223537366739206,3.1022567376285726,0.8133626480346234,0.35975152170327207,1.3726150718617292,0.34752289097824796,1.9667719392385064,2.0974110613058294,2.825130329238159,3.6311133766245742,4.556545960773795,3.6906371902172252,0.09063024654619611,0.32108787619887336,0.584380693107649,0.4089625644200423,0.46895862599875326,1.9665362110342122,4.214062926107218,2.196102922895177,3.5104422150358583,1.8727179646575953,4.823797899840287,1.3507909730868806,3.266951150107099,0.8907835116815122,2.939681154532611,4.790037058421916,3.3519147266464033,2.374320721575959,2.4908591299323812,3.317634982237289,0.6818202056989697,1.2328030069103635,2.7233146879116745,1.497437270003218,1.362484838801361,3.0153227061202004,3.5913883561010507,2.1390545600160147,1.7969533452225883,3.790636904319713,4.782401206194816,1.5840377464517474,4.076762434930831,4.6952385533499195,0.3190459636179388,2.591345882405233,0.3082327400029361,0.8442014480312876,3.4937350565117598,0.4486250025257088,3.9138141583157493,2.8637915137564187,4.737911189501016,2.4518233000892597,1.8626145535595084,1.0822730967486283,3.2858079533378737,4.302526068202144,0.4708210143141389,1.858514310445366,4.231252333273839,1.7641256999695198,0.7120955354527136,0.07241544640859132,3.548022823652741,4.453880054440596,0.0818844467537827,4.622646614866631,4.870113468294585,3.6482542155805375,3.826957063433066,0.3290995673032626,3.7902292328697573,0.5275918792219259,3.3724444752624505,4.945042711470016,3.60325707922775,0.9775863598225021,4.481596023681094,3.9059156425154606,2.8644835871494303,4.793167634889729,1.9840931216978308,4.84118952275227,4.918447507706128,1.445248527893943,3.084000785252784,0.4691501843172996,0.6095373501978696,0.13578820042921547,3.4572785397455155,3.5796609425664663,3.0727118799938227,4.245456232887141,2.7365306997044128,0.8215299567868184,0.37407125090473836,3.642917626194447,0.37624147558856014,3.0509346930129846,4.34743829318056,0.14446178397015785,3.749431656244507,4.1100881291923,4.002377420054871,0.6609508867390379,3.8989452916465384,2.522423908000384,3.224552032031982,3.6245282471591644,4.055268916571969,4.289639694836907,1.345977132104107,1.8151928717967702,4.5338635794615625,3.3764204083485216,0.935545195727252,2.79519600096535,0.7990068510776949,0.9763658365227668,3.3401072031103176,4.80617584853904,0.3095614290674775,0.5193628335779421,3.7573322598288614,0.9135471199487433,4.175214163184656,2.6406565954384686,0.9084445372361039,4.361344383232559,0.8323401966125399,4.450489916156297,4.001627754863132,4.119218692349376,1.3346736888270594,2.6170972679884654,1.277143845943567,3.4425018293998875,2.571769673254728,4.377546507170039,2.2896011834472683,3.2883356196459204,4.8494115008370455,2.2782898998334,4.510740159420008,1.6522899340952824,3.653469888863967,4.113397701260004,1.0604454892413584,1.8544898329623538,3.871224829821147,0.12514129047182743,3.710885744379401,4.778431349156882,2.2640319155181987,2.2204032151777886,0.7008269273187695,1.2976158572482877,3.3810465734560724,0.9271888076768442,4.908227917438727,4.462927821060656,1.0638547722878278,2.1343050845215705,0.5155070452252886,2.7202138154773325,3.270548119905139,0.6228008610645852,4.388483405379197,2.0648109520093483,4.868154260144488,2.7223404109911407,0.7577171561455709,2.779683745463325,3.735577776954022,4.596638693292611,4.180977797777777,2.074591972859877,4.884154981940966,2.9937556857194925,4.085053046109516,2.273910403138145,3.3288857358383552,3.9415912130971886,0.5976373784367939,0.3583216121750299,0.0334245505796249,0.7513708339936553,2.146033111366048,0.5381926490646372,4.477300213647414,3.8715282127046757,3.932437221946893,4.799701436135988,0.24004442717242447,0.07968451169408586,2.1078389250124663,4.665875259357184,3.754742341291762,1.349872896613331,0.17954040976377428,0.959313287461544,1.0807724194468638,3.09661268101991,1.0028530495316135,2.770142642943764,1.396336477641138,2.203655651576857,4.908458260808267,4.722521142195502,3.1510014000768773,0.37195066650030806,0.32212806165365704,4.128792768828386,3.971992424781632,3.459326581499711,2.8190332081299463,3.71304828185541,2.3732370074099487,4.02543307286815,1.0528331864301421,1.3679824226310777,0.9498649797102932,3.8385475480667375,1.4704769210937485,0.5869724855070879,3.6579700774508384,2.2493696181807596,2.0373798609175986,1.2908549976494543,1.751391838741162,4.619408458127305,1.308841408821545,1.4343472722791895,0.099823147012571,1.0178794634287702,2.457247361673369,2.0721714748140663,4.72190981825444,1.7250383211020215,3.1533091541113913,4.902337858989347,4.477552429852205,2.7022564415742547,2.4293461730483146,0.6450655455433241,4.327474174653437,0.9378505487341093,1.3695302513996166,2.872341877710473,1.050524170006123,4.584663044481163,0.1298309622334881,3.832082499738286,1.276938695327392,4.7292099766502,4.028311037179064,2.298920243799998,3.3059393000347113,2.003806666230079,2.008113486112928,4.107049669461525,2.7024727399793393,3.711290654193947,4.78700028251987,2.8473475289910946,2.8730141434421097,1.4575364670160729,1.868010989639366,4.941159538945201,4.234555422294724,3.7871305611098793,1.7689001177088137,0.20030348986253776,2.4048625961772108,0.9445257132330964,2.0201826930473032,0.6625487482956927,1.9995546575813694,3.445175003695149,2.2279747108243617,1.9011544859794427,4.561929987684156,1.418164368325907,3.2751553831508193,1.6894330687022585,4.311372874683292,1.5561325102378043,0.9146949867677245,4.653561925091653,3.661834758842181,3.4111995420438648,0.536820358977661,1.0019494188697198,1.7133235094080657,2.1401532819930633,3.502838356160084,2.4419062866154793,0.39490320280836766,2.299754087199326,3.1358556981480645,4.32358978295288,0.19817151653663934,4.0415013334594025,4.123438579568375,3.1702167418046012,1.7820581537440383,3.2578200801193145,3.8921257018674926,1.585655314361477,3.3392848087185403,4.462054466019689,3.594866020534171,4.119130232097498,4.108797322662175,3.209864252814094,1.9486504202111743,2.977780302880493,1.837026234846879,3.6289403602839885,3.2574483207141425,1.0614209468681568,3.3727177081428628,1.0850964221999226,2.7398955906811304,3.7166216977368114,1.612768613950406,0.38848541948079407,2.807533269047143,2.1215680603097633,4.881967296179975,3.7933829087006354,3.019975133808672,3.9845568726244296,1.9998122629862802,1.5418958690214069,0.6612160546966994,1.9494210077246321,4.4918891224548485,2.2599414434085574,2.724163078217173,1.983730569591079,1.994264342547094,0.7611488646533426,0.9699686075883607,1.0571924053292847,4.572086491109216,2.953260470745552,2.278804773774612,0.9351987142634688,0.3449530217962049,3.364576182259814,3.4058350726612465,2.2706805153198895,3.4838000382742997,1.751847644161082,4.45844832799648,1.7308843100737437,4.385626968105426,3.3401968179206865,0.397723361209501,1.7170099232337,2.5102971142468347,4.381701388138891,1.0518869490231852,4.181796345256512,0.25755800250757854,3.0362993867768973,1.8042259976333797,3.3150802770687804,1.1013123243646417,2.5143470964135153,4.375592786258615,1.6046225999385633,1.858061056951884,1.1133871831355757,4.9324325119309265,2.7588037833653156,1.1080519501044317,4.40241103819683,1.977488700345298,4.0482271890248045,3.984373340769273,3.0064176256223654,1.6584064593172032,4.664928333721061,2.023777218739251,1.3572040247081507,2.226723784160405,0.3240059591213307,0.8926509977643637,0.3603835378110465,1.0709449291906636,0.05923640183107537,3.600488852341215,0.5814058102011599,4.345901294865085,3.7741138055159817,3.1785334854585434,1.440981394459745,1.7831489557045355,0.4485330994025205,1.6709470903626633,2.6646532465223007,1.2518136475385278,4.932254420882022,1.6646753105613998,4.082451704313987,1.6750003746306852,1.7299439893892743,4.497327792710663,4.697592468681968,2.1708801940658864,2.0779219389816275,3.851048260076211,3.176196595552365,2.803809216383261,4.111631360790291,3.6924675920321692,0.23604866043241524,4.048766649291695,1.8754261727825794,1.950165629396512,0.9369705830366271,4.579873290147179,3.9174725590414363,3.712980781790074,2.1968101221456515,2.978280060787183,1.3816329779878422,0.4778367783770232,4.125076782428262,4.869313361276908,2.13312675298294,3.206074062891253,0.6683129051877512,4.049211310597407,2.1090704973863748,2.1322477571468235,4.274287818761104,2.702064646353163,1.4690316467997555,1.6083297041456446,4.678066741914031,0.49420743751766083,1.4895777505167895,3.5343384961393767,2.845161661340395,4.707083234144907,3.392755870178963,3.1359098087005224,0.6472413268019683,2.475420642501698,4.803685652343413,1.8964481551303425,2.709244109157938,1.7693415948445534,1.654835570931814,3.859071717102023,2.482158976352815,0.21106841651185926,2.1070085337944153,2.7724839595703576,4.761411581961771,4.7615524060404635,1.9956543508125657,2.4412104722763397,4.621152339538011,3.6809757669331233,1.7904595083037544,3.8930609749242153,4.612776539982969,0.4077964004431345,2.4516015650915257,0.9967129747254222,4.686926476910305,1.8084097020728196,3.761380753273278,0.4275055949220896,3.992587346984069,1.377961575229708,3.901370246336797,3.551629549310289,2.8939944849062216,1.7977916697431018,0.12427222665861826,1.4410659767627854,0.02865223735121214,3.099633491621404,1.7902531250613618,4.866699919725928,1.4408672169789005,3.4041009698138347,4.432639553428517,2.676344419747706,2.187498038219008,3.8962385749483675,0.32861018874461134,0.959716918820962,4.648422333718397,0.8689224454202227,4.946974622008832,1.119543683278561,1.4961973133057993,4.126197639779296,1.6324697351329165,4.766712046396327,3.2618033146270573,1.5976722110150965,0.5086105811904618,0.5505019143847623,2.0027369412506335,4.210430722150214,2.0000170108863835,4.985071735678047,1.9332512495872478,0.6156109286778655,2.0082509415832774,0.31918061777917783,3.4019595072879403,2.3106929405639223,2.4641265340535545,2.363577754234435,3.5762531317762303,1.0435706203392592,1.9702411394990482,1.9740734646574998,3.98368354456369,3.6304074056714306,1.9579757799198083,4.416420666288172,2.570000554311409,4.661594756593871,2.86221780127181,0.8665708942754968,3.5944786656714367,4.902056358535585,4.701914960372374,4.492089839783491,4.702146029963604,2.3623950440566635,2.477803949107585,4.680354757526926,1.8307320136190486,4.258390018133136,0.2966110304745162,0.034283200973871386,4.578395410021398,0.9714357752724645,3.760333832294527,1.3361461433945154,0.5022037379610778,3.349085174542309,1.816096035349184,3.038273699524221,1.6436820739879276,0.5494834434375528,2.7228498940738346,4.203846178613,1.8781863157137835,1.8706666092397661,4.196053291383955,0.21248273558946207,2.7372242509011544,4.440426442403295,0.3091788250047478,3.752311316168877,0.7127343337254177,4.6793922840912305,3.759883894463508,1.4026824158416662,0.5070731494572711,0.09068714826351743,2.116668295151287,1.4089896817992764,0.5858400016253951,0.5711652573480297,0.36540060717256573,0.06558623182705836,4.993692914305711,1.3207762697198,2.2453686320566657,3.664812047813193,0.2461156793823549,0.7355699388110637,0.9850918335255043,3.280678486485633,0.19299064550592382,3.9782783892951357,4.068904836333344,2.300208657921863,3.026398593117543,1.6333338462616076,0.1318945365727997,0.39534894835739687,3.6689325841143514,4.761377555451675,1.3116536231813636,0.8021058081901511,4.742989185607469,2.9434938633016605,2.93789370690721,1.9338174370375294,0.4441808247702195,2.219817268066371,2.49668961211049,3.4594264372334314,2.735620915582717,4.956233092747588,4.859348592638578,2.0826362881768343,4.906733059857604,4.885684558601503,4.412426723152199,3.0668788710454695,1.8846715967264904,3.272554675381537,0.44275023812835546,4.208709051501332,0.04163627508066425,0.544851516035475,4.563746332024248,0.6303500336572876,2.0060223742981806,4.967561171662157,3.206041748728042,2.4739554218328577,2.557818279400154,3.1461280627517283,2.354098151183904,3.353968399445754,0.14220453728811533,4.683122756653021,0.3535899510366636,0.7179847692876584,1.3687366089553343,4.6286025248779765,4.362927577349232,4.221281812145601,2.912944957179606,0.5259648670828232,0.9712296448421021,1.766596045295642,1.653506445693882,1.4023419563840955,2.644990525680875,3.0461356211810244,4.813750419966221,4.730445952039776,3.4264892094645916,2.6563413411387593,1.5977779334718045,1.720216962558423,2.9213126710182014,2.0480878133152833,2.601793124647095,3.080974259580368,0.5963035804494565,1.4583730453169774,1.8379577365230138,1.3436534236243969,3.21745446756883,1.4893571610018375,2.968628661277445,3.1491831526549285,2.393200482285379,1.5397260443546945,1.6843016779101005,0.8899189933184914,2.408657810708197,1.6022747633545498,4.664197923124735,0.8156954772831027,4.0541276620604645,4.742326035781774,1.4166129029785368,1.289525600564847,3.286336279257257,2.742444667894718,1.9716917246285415,4.96795171915406,4.176972339358487,0.3492758518920802,3.4358235857204047,3.689463251281241,4.248660069186615,1.7191257640534674,1.7683707579440522,2.5571985347304005,0.9081936428120707,1.5600221625375432,2.0533885109081784,4.439185734209023,0.7592415783253392,0.4857158360345659,3.36798686344298,0.8520678683293803,3.248648160951597,4.013568989967121,2.6581804845522305,1.054001224106762,2.865716315342719,4.43237676224269,0.6241154471329957,2.8835415014824948,2.695950830996833,1.001243173889368,4.136836121831918,0.9959652303840494,2.9069806402674203,2.5016429506178604,4.756288229079855,4.462178513237841,3.2338196450721424,0.840252090675887,0.35136940630876246,2.3720543119072888,1.605998324950716,3.0541278360761046,2.38658402572818,3.2132648932957397,0.8117894113362278,2.9653768309539874,0.35627421507716805,1.4476147568242148,2.0344164807695875,3.4119830846242927,4.58665762776765,1.3528795187641618,2.9207978529112646,1.827650848215432,0.847500736627852,3.00341638136313,3.8915628450464492,1.7212200935928557,4.156859539564022,4.60507403820934,1.844086327105925,1.4529270464949118,0.3139640308455349,2.482680050221612,1.7481311489953788,4.832585127975262,4.215431224763446,2.5704149630343975,0.8302344636491321,1.8250887549496897,1.6089428990196142,1.7508123008915044,2.035353741610116,2.030405636281276,1.3634084579353456,2.4294314148975857,0.23457106465847088,2.1336012962546036,4.857348518902914,4.714686772376569,4.4546861078689615,3.9390800528378325,2.1909037969860554,0.3882256607876733,4.286831932904601,2.0981289737307627,2.6783980717731426,2.1168061295264518,1.1254964292966718,2.093573382553686,3.055973076189021,3.691580517484213,3.7896007551972333,2.2295207092581935,0.4933368109630909,4.8399780167767394,0.8815967941762048,0.8440656914665834,0.6573649082206678,4.146253054305188,0.7392946994104088,0.3217115939076953,0.6351966747333793,1.4247885091034806,0.8209976931311846,3.399914423896162,3.8482842308620793,2.752449238287106,1.0719242419150388,0.560933589278757,2.2563074570499686,2.1726819341646264,0.791687339988858,2.1232048782909265,2.902414002745375,2.292853777053657,1.3839058675444826,1.4453559190221865,4.051093762277816,1.9625938955549627,4.5500522237230845,2.4957933996431203,0.43497285919188333,1.269189656056925,3.3423571348773895,3.1146747250411746,3.190983041433899,1.5266724467645365,1.4022993680731088,3.0730255924764425,1.1537208896036577,2.7830193705865156,1.1985507849980992,3.030781910838205,3.1234604680787594,0.6541063764329458,4.386847525903933,3.1838027679594716,4.2321583298137355,1.5898472245367234,4.927071265260198,2.8488920067894408,4.616203194426633,1.1273439594001,3.6451520070115784,2.9135802927380605,0.8287280620882187,1.7795626064473824,3.7273585176547064,4.545743612407138,2.74938233056764,2.7133904933125086,2.1446593957496263,2.8219705954885144,0.3390804606568254,1.8875271098329416,4.463149007473972,1.4175464699110663,3.1925813841036432,0.36231842647884815,2.436935782806274,0.7797414013135928,4.050952861061939,0.8054295926278543,1.2858422326906394,0.1986162781372225,3.308748305628453,1.8191585281090894,1.4772757511769896,1.9848387426078062,3.2623315784089737,4.472262622701816,4.523118267964698,0.8973604097538235,2.0701910882989716,3.943400558104959,0.6338502838345206,1.5671861261992082,2.7651050308651626,2.1460484211653497,0.29578710929224594,0.01739142714278774,0.16943003761162867,3.9960047103061616,3.9075761094464276,2.611540092203739,2.5266094819229314,2.3606458108315054,1.2109007117741866,3.092920581825709,0.7969404728569862,3.998350756344787,0.12137072099176582,2.4682854416785216,0.5973992130840244,3.3732279022756217,4.747116242557211,3.1074244755999647,0.6789902798509662,1.8616383547967763,0.1603284362483004,2.7073910957626204,0.6378997985761359,4.41516472285636,0.5973935968793609,0.015342802378038867,3.0184957400811587,2.295805303603383,0.015523806877945079,4.786776287434194,0.9518111336007817,2.300268706504447,4.9841242318547785,3.662501641118202,3.3751477599535096,4.3570385958481825,1.024468713743546,1.2484003256456766,0.7863229694489737,0.9337742252991921,4.110769688964013,1.915322829541648,1.7949675965294087,0.2870248309469092,1.0461742701150223,2.729261652957742,1.7532515680944394,2.321938871255065,3.9865677117410248,0.0627431406246659,3.639366833503778,2.2001273652225417,4.202068457897826,4.996353814654034,1.6777365301989022,4.405480178470315,1.4162160265363555,1.2440542826749057,3.213832890901438,4.626668939971104,3.935052413162264,1.486564847563585,1.2667826167283447,4.75542588908935,0.7390938566233918,1.3947906960580259,2.156684528815406,4.234727829739674,2.687219801393953,0.9980141278265575,0.6748800206482408,3.38746469325117,4.767006867096021,4.219120372257747,1.5415485086099256,0.11829247548477362,2.7808777420280686,2.9861823649784345,0.4199201259186436,1.2890893559468786,3.03576551880564,4.126553559047165,0.760173613306766,1.2524785110249403,2.709803602224933,2.0681226985312495,2.300235486044339,3.7281786668822194,4.857407294745688,4.508749848412109,4.844932419876233],"mu":[0.25925874227346046,0.9655752316715798,0.7111861057399675,0.2643593069546777,0.4369154248431899,0.5274382146562371,0.42978423304208535,0.13634660491306416,0.08253453399628485,0.29973257512741536,0.9908999305274748,0.3516869184918556,0.8763008633094347,0.40749806880181794,0.45356536953238513,0.1271846109125898,0.46169230936065,0.5145923480793657,0.6013293529386883,0.8735590248098766,0.9475799209507096,0.1875176198947408,0.0848896022393788,0.0949808100568077,0.35976937993402447,0.7147597870096349,0.8092809604622748,0.16577176823061857,0.0547530828452496,0.4592001362874989,0.42221878474336494,0.9924383175173519,0.5030862663546618,0.6529023872730917,0.8141870579735593,0.8179857866849447,0.5699160861760086,0.26731005585359147,0.5519685416787139,0.8950727348778138,0.4012749045276902,0.8511413545734436,0.8798383298164376,0.10574166567249521,0.34959729344115376,0.8402891155550742,0.5175498378915087,0.7281997626675549,0.012770980637470508,0.3182383476480726,0.702328128297887,0.016064266161938345,0.7154416136930566,0.8355670582922585,0.469556155007675,0.9088758985248782,0.9707520766720228,0.4902206768418438,0.12184990009159802,0.9183787023760566,0.7930984847823965,0.3395498663472505,0.3486038868492207,0.6555946766199248,0.75544861374668,0.38615751386583974,0.27198034157400586,0.9494611394741697,0.7083215255344855,0.828671322843348,0.5512995210493183,0.7320931883796866,0.4659749628953289,0.9740270985207888,0.16377761872289587,0.8497968481091487,0.18845474578659882,0.08989095710978456,0.330490721205718,0.9793876822208025,0.016774754470716857,0.7076657283048089,0.25105906414399826,0.4897779087661185,0.11514616857838678,0.3764931206632449,0.15976702001859744,0.040700843496227046,0.24246753853492575,0.012728488340570276,0.46425984967918454,0.4438688512886426,0.6082087313903228,0.5576795941501522,0.6576225760843122,0.035249801296701744,0.7644789653496216,0.03120714834067506,0.6652934503752892,0.22198597016250465,0.04316452606207388,0.20515842023541175,0.6325136908708588,0.6652318541963254,0.8431148915061977,0.21898139873805644,0.22758131057305508,0.32642580907098995,0.9273161492296011,0.10967726387196186,0.18188648560997667,0.0764478434069884,0.6490717926967116,0.8152144708625542,0.9579824352553468,0.5577852806269155,0.20792536760582325,0.543595917769423,0.5082543605994785,0.14272415092759205,0.8243126661636266,0.7775479449240685,0.36936881829697277,0.05619329950689922,0.6829938759871623,0.13816300972644724,0.8102459752671745,0.642181651240842,0.7395544284518634,0.7678306828182393,0.0006782176514499305,0.3403006068079808,0.7042732917479455,0.0044252599762604206,0.36653739336708235,0.4084176794280876,0.6670430732709647,0.9286825158423746,0.567805813346369,0.7252395049017628,0.802822744481763,0.7997556756984041,0.8950492312373028,0.15058963298747452,0.05652511885138489,0.7468329007798444,0.510181161465425,0.6348068128929714,0.5348063453475087,0.4054128990331367,0.5672549285359583,0.005328021822711637,0.6221883695963053,0.6251547692732304,0.969004798357324,0.5744358066804705,0.579381571462064,0.516416687389432,0.7180097709728737,0.2156589151671282,0.5275560658611915,0.4992532700525971,0.37109912188135175,0.32984276401123336,0.7892900345409477,0.6870960073802286,0.329303987516524,0.2532057046078744,0.010690492895266912,0.14636037805469004,0.7232311067013515,0.29967968402182765,0.637129727286212,0.07558091118070598,0.7982893791460954,0.4806514754515536,0.9483075684290403,0.5399125464325649,0.039647234136235276,0.38660253374486264,0.256989502037543,0.6229328961425842,0.3098889659388757,0.43492082809620536,0.7587330640293792,0.6582658253501652,0.1822260924663459,0.3902492048351658,0.5286881028812749,0.9218817092568059,0.28634647375272193,0.23986299663662392,0.25455836354022554,0.6448257214056445,0.07038164451118689,0.9839636510504299,0.6563228745993359,0.18176438625289482,0.6382487374148567,0.05111362011814302,0.6932191359581683,0.8124403852784032,0.7121362842670371,0.24503643450386914,0.8559911403619302,0.19979146841346118,0.1076851290859131,0.33410243264519046,0.7951969418016984,0.11718499635094104,0.1416494236707153,0.15157739307099738,0.31005701650272344,0.047431886047879956,0.4216867176186192,0.5485404983183029,0.8356466848355601,0.6358370167019685,0.3195649447289881,0.42857761581913256,0.5190240312163892,0.6246407888548304,0.3817099408184368,0.20802948739411264,0.8829587413087112,0.28420906707466287,0.37599894768219455,0.7950858954138311,0.8429397372455802,0.9530456382180577,0.6691393036652786,0.3257245135854916,0.5935568270433558,0.314452793775968,0.43114821757340915,0.10932267176687738,0.9080892109157532,0.4434209381317351,0.014209961706470375,0.24157034797716515,0.8994043883067964,0.22512146378429265,0.6877208203416734,0.34133145267102827,0.24833390785035903,0.2593128511842435,0.6793108438238653,0.3790086348545598,0.5678430773684302,0.2917075241883855,0.5865988464131529,0.5980712851533694,0.9083024695405493,0.24979678695581176,0.8768438040527928,0.8602831579065051,0.720657583216906,0.978392735520738,0.9370083054323113,0.7418505206392385,0.9585757652966203,0.3651323938904969,0.14543976339437004,0.48889314156461494,0.8950906207273015,0.9812139125519277,0.9399394296738321,0.4593961738110106,0.2963299195838731,0.459927230918864,0.4151987111365032,0.35700882192775096,0.22749386456490117,0.3370180082541021,0.5331973071359117,0.9678215734677558,0.10199701050882459,0.9162151056781862,0.2563801008100839,0.5974618813605044,0.6733462311441454,0.683478946854678,0.09988994669876217,0.45656211727099727,0.3456447824902176,0.6201873459595912,0.0013591668630574816,0.22604583513067888,0.31360573505074885,0.31949377785145505,0.17559567674090704,0.5636007947269239,0.9744457006169851,0.6934380181081796,0.5110827752197695,0.8028460391541989,0.6065565713959784,0.6352846808973014,0.2485795169416971,0.37988371049911107,0.2398009380484647,0.3983292866105801,0.004905734901623271,0.16837805566111164,0.9127528147780077,0.40868982168011736,0.7508333815381081,0.0006220186741654476,0.5202135533174932,0.6491860810625028,0.45351248427744784,0.4962309559495848,0.9880420992272672,0.08738568199536267,0.5893572105823826,0.7704229790812285,0.9846071520520454,0.8137305929018932,0.1279750658234886,0.8370413712776497,0.9919107794892237,0.0424648352017738,0.9127784901352385,0.5962212905408362,0.16203273891746628,0.5142212927822307,0.9605122136319291,0.6892096817977762,0.17689727945568645,0.0436285961844296,0.6381272946269596,0.9774394211784152,0.7359322812377918,0.133040438972706,0.04410386708840086,0.06250023658387316,0.7218228079198352,0.42217068172659755,0.24250258204731856,0.5852268512689387,0.5212625032879106,0.9534398323826097,0.3734813615981911,0.2650830189641553,0.18805246305199308,0.336968479242473,0.2523680980141749,0.4022079192164798,0.8953570130226471,0.8745503934479255,0.934334205014071,0.9522965791688431,0.31138242352203305,0.9807056000248842,0.026329988817097583,0.3045941827332528,0.8548987800983894,0.07635792645616579,0.9683984343652381,0.10883641127224086,0.8643351727773556,0.8708629967938535,0.4532384630144457,0.4766292777224004,0.6127075196648839,0.5928281651034166,0.6029906176153181,0.27574492053471444,0.8920870337383053,0.12482003042212164,0.4929337363039126,0.8161546246067117,0.10154879936987116,0.7143517042759426,0.10614876168257714,0.4570100091271243,0.7770807481439592,0.1649089383914275,0.8744123524246052,0.706750577020002,0.8243338094365642,0.8812139574748754,0.8542688458453078,0.8358793243685978,0.7071356327433529,0.07589512809640486,0.7110401956796699,0.4896709296752082,0.6006280448070769,0.9403644013569272,0.7049086431000495,0.5388652292913592,0.9250165908602621,0.6141442914127277,0.2503781032141619,0.4971398109354157,0.04673770618315021,0.8790735584443476,0.9881586425310214,0.352755362176981,0.7236166999336466,0.9000976497326858,0.8700080277702407,0.11360946415023165,0.13937560987883502,0.9175673262873081,0.9888038266287826,0.6026446241418455,0.5295750669897756,0.22691751247615,0.9828953646931662,0.9040901821258192,0.6351035504452511,0.1294651503781563,0.23892185411421707,0.1045784954649418,0.25055161612777366,0.7438875009610699,0.11355380614759181,0.5452462651641035,0.03351467376819106,0.8264715216914982,0.7913678537476607,0.977208927604893,0.1306855265549247,0.021893862735311798,0.43733095834032953,0.28242324888498005,0.7922000231688804,0.981192130438655,0.8911841287283229,0.5011676319769434,0.7211283613228063,0.3168594579602846,0.040014706659621035,0.9091994122607789,0.17480824738532807,0.11983364198691593,0.6342302042571926,0.310618056823988,0.5671139543127137,0.7260604955119259,0.4334433025599209,0.2027955352993367,0.02778333822405865,0.20400600892948284,0.9959100118573376,0.862087678760652,0.09257851551361895,0.2982118307803028,0.8053038771920871,0.9745505942579709,0.12022281587968187,0.17890078092886608,0.310273379007429,0.5346122408147815,0.944715080189225,0.02957679888276954,0.7495108595523703,0.36812707366301956,0.07060784611419746,0.5696521081300994,0.1874413256734222,0.6814792561162228,0.290892264954119,0.9841302874424209,0.3570440393681722,0.08574162936131913,0.992784681244707,0.8782947658263751,0.21817656594992152,0.492209893738921,0.3936639280295655,0.8548908849894843,0.2537319845003736,0.4240539948472619,0.7822346519412244,0.6442339992699331,0.09321547552909704,0.19632698902219592,0.3310276898142468,0.5744609429048937,0.7598437733827226,0.03450687034090105,0.1529562267751654,0.7359983880898486,0.8079942622542939,0.9234245150467228,0.21761189868558617,0.018799425431202277,0.16811850205771162,0.07946549619414478,0.43090836331602755,0.8218634133380038,0.09525284002018353,0.7485980398610248,0.21884436463400636,0.960786389248443,0.837959410039983,0.5885920803822775,0.8430294607566169,0.7055817840120606,0.3636353272162458,0.42228164870073726,0.8942855020516651,0.6343419598624522,0.43984939158306346,0.7314692484731529,0.2658796689627083,0.9221235003969126,0.32835116878569726,0.0062351516743621715,0.4008216289917501,0.6813205384081096,0.749437892356795,0.3455326269741239,0.9577890707717387,0.9858416841912414,0.835356931256424,0.9352173100251944,0.5080140543305387,0.22492549035217357,0.28095207565382774,0.10566084157642863,0.5518712994000345,0.5242503306090189,0.551116381556537,0.8293443320015419,0.07590522476107031,0.40626239656535557,0.3946026282876651,0.006361244217412354,0.6663224310973124,0.457452027140542,0.8966254693227056,0.41716154080488055,0.3143228204557227,0.7871102591075623,0.6484416165292681,0.6061580303089715,0.2325877022507874,0.37823231537528357,0.651777971743108,0.6875851781485451,0.9169487318159779,0.39608904716985016,0.8159003177196913,0.2726407316593493,0.6441271020119133,0.2888881435843931,0.0552706796097695,0.038991734290811486,0.4343048554280895,0.7000157094729511,0.3666431754739623,0.022824988838893612,0.9436151411894438,0.7540095622007852,0.01352504380399644,0.641453947337812,0.3198354262294205,0.19901034746025004,0.5679908738605632,0.01564065257280678,0.793825485265693,0.5078994246515773,0.27438093192954716,0.4149136241846425,0.19924438529480337,0.6681130388403136,0.7925937130646135,0.9495363263738392,0.24843134935123534,0.9637547339417281,0.7163994457119571,0.9229021074174713,0.24895010671548223,0.9716572375691852,0.5405925650835364,0.9388619306220152,0.6986106503077665,0.8244002165620572,0.7984610813036259,0.02135147231613166,0.22629073022860013,0.36739083274642015,0.3083376793757129,0.08463603701356193,0.2919270100835669,0.4806837804257762,0.6008762629063589,0.8200859320525009,0.7555942549982966,0.7039270978274224,0.3746756825266482,0.37601595994417925,0.5785011990189131,0.19747666896872884,0.9839814993267004,0.6225981968980561,0.1096500739372126,0.6512573246157549,0.7097678154157958,0.4097552232675068,0.034449374204321925,0.9359208804276018,0.09738466681247737,0.8836181854829523,0.3204006909684727,0.9176143387014801,0.44861983449298637,0.0320276885948203,0.6443790760210826,0.8682097624694047,0.5909429055425508,0.6225461173883493,0.9302099735496216,0.774726466254614,0.6925501063736037,0.31000382182504005,0.5995379998912935,0.3163277274853378,0.9199795477142814,0.1947270893054327,0.703295280484225,0.2631621002021687,0.0367715404150839,0.8519088876066783,0.21295684393221914,0.836653601420615,0.8444410374344902,0.7707674601001337,0.776293206877219,0.681842481477194,0.44503926005273664,0.9470843611289637,0.43680612857304757,0.03825647238930774,0.8536499646980471,0.5410982271212179,0.4066431969260422,0.9235597185125057,0.33468291183959376,0.938516376226189,0.19988858781866758,0.640302704894834,0.1616028830256424,0.700259326492404,0.9185909755392041,0.6531975031863866,0.8180372416451498,0.34270261962234505,0.5374459769511026,0.6985157935371553,0.9883045700424038,0.49153429291141393,0.8476238183051241,0.43760827757008913,0.8422288919527343,0.6220470725346139,0.05396155904191491,0.6668885848380273,0.740639841094068,0.4799129416757486,0.07014184486426611,0.9646381581905765,0.025939004812125743,0.3917208266256349,0.3422616482349532,0.2549716936973285,0.7820487883677145,0.6976837856848295,0.00729530027470493,0.142508709693151,0.9467892629225285,0.31289340950118283,0.5917408394148769,0.27703245257141385,0.4249614862516964,0.061593075594240876,0.21391981634633694,0.12603973228204324,0.3830079904773407,0.10868060221046072,0.7141234872154318,0.5445115370850262,0.13495300040777947,0.7285215683026556,0.8488623003041804,0.643245232852111,0.5298611172963976,0.6532955241970073,0.8469944780665586,0.07956606756112583,0.6139192057268184,0.48564923516162906,0.20159075180677677,0.06612944593199654,0.021838853983364048,0.8216366638713342,0.9789006692397206,0.11414989843574719,0.6437528371048298,0.5729084309978558,0.23289264007875743,0.982554063585978,0.3154522753614566,0.7747952629297099,0.7111375939901019,0.4412722166246388,0.4084842696985236,0.530929778530411,0.28387956879054,0.8248909710007766,0.3066821607155388,0.12167027534441166,0.8877940662384185,0.9279529927205485,0.6064730477570699,0.4795363511821462,0.0595344226386223,0.36904401451885493,0.4912977301675219,0.07434222858982631,0.5706261545441831,0.35019016465148134,0.4529088471175944,0.5280374665871017,0.23490948884196095,0.9585454582673598,0.043720655220945925,0.7986155653794267,0.7767719947342451,0.6475991647345583,0.9081885331459012,0.7464881854092986,0.5660948892739386,0.013837069286208425,0.3150815763975252,0.6954462298659301,0.05104298998222445,0.2317344403446573,0.39325486080119565,0.3000452038407764,0.9651874885068816,0.538581235903087,0.6481879413407861,0.17661228741137225,0.2389620416444469,0.0856422373214949,0.22090309484906734,0.7373565864008531,0.2806531627142026,0.5209233955837935,0.9162628006097195,0.9042468684079474,0.7608835514487524,0.08924672449577642,0.9755949823460466,0.7193970092983679,0.7360211875718474,0.04358785941508181,0.8170727567320422,0.26825116154665496,0.7610208349181256,0.7050642841122436,0.5819035404733286,0.3572935929939425,0.3413508697980414,0.5704882627948251,0.5395530783890257,0.8041827922145206,0.08818219456903442,0.23677970326232511,0.16219648281924948,0.5820024538299777,0.8497615889789945,0.40499634150584485,0.46453058844634865,0.8387219759294835,0.12490977708709683,0.3710806630228338,0.19002291823677653,0.11030121063075882,0.4629059592444973,0.9114424770063718,0.7015041863604299,0.21652483456358484,0.0013993785267585324,0.07834660799987203,0.3703321791635312,0.34637426336939914,0.6522515800550543,0.21167251450468383,0.17143952036192633,0.6214705241983682,0.6477725811010058,0.18347867687665476,0.22575296350329022,0.0038603566174806314,0.6158682278044649,0.8622417841374928,0.6215857642665621,0.9227325632716699,0.4533324337137754,0.6273916351212945,0.14218896650389024,0.18360075006665677,0.28482629426242667,0.5190990050729316,0.3240223273923972,0.09307543305189636,0.296333238517426,0.46784625049319106,0.8945595856171493,0.6432514240100424,0.9473337281128689,0.2046994752775202,0.21134618671303018,0.2501552686622921,0.6398919833044194,0.2567699443366198,0.9972821635966458,0.8738864448868413,0.2616054465008335,0.5815290088277125,0.21577676039367466,0.972389276087815,0.7818194021730338,0.5354515415585892,0.5794143312006754,0.7206621479722191,0.5077230357955465,0.9810033016215249,0.9718142171617883,0.05311677756302191,0.018769256004507406,0.6459297405126723,0.9420694858965344,0.5367514901469967,0.010384500950366471,0.9969970612867523,0.6608358693032801,0.7899155632509516,0.7140401299586916,0.5877233403418489,0.4984660097676621,0.785799633911755,0.09153165074875713,0.24203590966915534,0.5045107495225711,0.5757726584100724,0.007189838764196876,0.2631548136841675,0.2524169642854135,0.6213980653987463,0.6402917025210373,0.0022058218931260143,0.9294235059814178,0.0930683930309566,0.6323942819428705,0.6790098092781438,0.9912739840812386,0.1931807090963833,0.8989847248274607,0.9144755195780208,0.5930008220734719,0.815048999676758,0.3072408065821626,0.17932110018040315,0.38858475253803215,0.9085863251789343,0.4568118146604221,0.3933044553729592,0.9886624968288247,0.1726721159643605,0.6172973821750887,0.9598722065452334,0.5949919036053695,0.8691666909612155,0.30246420445693456,0.7619169009347013,0.40262767783409226,0.3059347689213323,0.9344639543036475,0.181832285226891,0.6356273637399243,0.9191781231550702,0.3603264185266326,0.7438806529454391,0.24030946584802426,0.6608628876509275,0.696936677061933,0.09768413126733577,0.4284155585879972,0.45041652267362564,0.20202218317074516,0.8884236619844426,0.6367591160046724,0.4956620493067396,0.9179120154958813,0.07749565176914364,0.1467945699693629,0.5227197520178097,0.2931303002886865,0.49825105418452176,0.2707825194379243,0.6676521053701672,0.03615110095372587,0.3386460167092531,0.2751082535426539,0.1882939316545711,0.36053294867688135,0.4040969404690218,0.9806190900693532,0.8594225489622649,0.8225309941823975,0.8819345951739792,0.9249631119415256,0.9720825393341896,0.5104927313436753,0.6046283834609947,0.7202447196010338,0.6425078510191449,0.6111522805494374,0.06827957157986453,0.6133677578934782,0.6991175479826777,0.3186248889329404,0.3203828716525412,0.8124611615833588,0.781304711270145,0.1762509559854113,0.10074939238810776,0.40344534101962193,0.4578320041859052,0.01814712426865861,0.9459781864566608,0.5916201439675834,0.722819437329097,0.11877393204244546,0.7203761459614042,0.5956129737406153,0.2281417655595841,0.009686605495886624,0.6671480150432445,0.7116076145321153,0.33250566279990856,0.3404260092475795,0.3585906269818768,0.8125643037344883,0.49899694553775253,0.40241693732597006,0.7863652616519623,0.1616119606371924,0.23365974962997949,0.6681650663543366,0.629645519280944,0.26794765677603793,0.8263098271068232,0.29842843472109615,0.8381958790029034,0.9556825563603524,0.7730787561694179,0.35727094952003635,0.7425567309081642,0.9749663377243352,0.0697676864895036,0.9340063768753997,0.5790026372602635,0.6805177149189428,0.26840003060517015,0.809494863049091,0.4715838783624149,0.30763250174656753,0.8656224801216734,0.8522557702710654,0.13821419738617924,0.7863090479026649,0.4872123677836082,0.2511097037312555,0.09405988066278037,0.3896694153699558,0.933760789506443,0.555899273397181,0.9235564961879443,0.5792315696005828,0.41298132524553965,0.20178504396091035,0.9861762634580513,0.32416194453696145,0.9452379278748688,0.12598833290301892,0.20665375928570562,0.025858281586061516,0.9735408070972198,0.6868842897759375,0.2711911013312198,0.578103009511211,0.2685918293132947],"beta":[7.2319153202937425,3.1549422042819586,18.70602408048811,9.82312894515891,18.846069233696067,17.423410463912816,18.245381955776594,1.8683168479146284,9.346803410291695,3.995176918200971,15.947235053589793,14.037019809246276,10.267941193540633,18.219708618490543,2.545009250071155,11.260619707959453,11.043216487491133,3.0504597920274623,4.366328593469007,7.070264984532524,3.1004985326877232,13.748689069208467,16.177759113213817,15.136868599798333,10.364335157468325,12.76235601991942,12.60123506435622,9.604742147747727,13.295454104737452,16.861608317839227,18.75625576349023,12.501809039265389,9.350173098595818,12.784092517959493,15.299159630365725,11.841380167404347,12.714032131027597,16.70750879866866,3.259932438451969,18.034930869188134,18.87095761144684,9.085983005051368,0.3381274248339228,7.238496449228755,10.990990249823959,3.213673460887465,0.4925699055930366,13.612392355387115,13.207081114462857,12.549114299296411,3.806045291889917,4.216727456407603,1.951417217409559,6.461221406804234,12.504606159040472,2.5505895194673034,17.60722310872715,17.70155964071483,1.0231208368435674,3.4007773657593487,11.792452758895283,4.238461455338531,8.435353209096338,4.7882135540357895,15.675732532182177,6.592801875177514,8.115730260274425,14.657853284410209,13.149998230949569,12.03815417763332,8.490564164131067,12.453118155711955,19.651984061166146,18.659983867062966,1.8993390320542414,14.782403988145738,6.468557028901318,7.416386083636732,3.3739228483048977,10.849101812766037,19.79546481303386,1.7979867852388765,4.884581973306412,15.078080004719205,3.975334218241664,9.690705675724534,15.935554994905825,10.458027271572332,15.858366546984035,14.04546084470212,12.674728478366877,9.160397215290246,8.241787966182926,11.854002754781675,4.940275721395171,2.1144378780269424,7.819867403543652,17.333991735737225,11.53234349089396,10.185584276602011,14.409239207650288,10.447842845761187,10.978126603487134,0.2987692883538351,5.934489742893803,11.289340438408262,7.47513118897571,14.5044601946599,4.6895706188058295,3.9657265719114587,11.599576385203335,6.1839034560015715,7.742785355754167,4.326521989688166,17.665385619686,15.588557510093013,5.171264646021747,2.597526050200929,11.501992907889779,3.685105898426415,16.78283871870244,14.855283168789928,16.56879038764732,14.652714389443418,3.4131222284258067,12.741246957201632,13.42172965291558,18.520164106457642,4.715569091944336,9.141683763276522,12.09824299127117,2.496797315819279,10.535099537875041,18.581025845233718,18.22230286925873,2.648596273120325,7.17043494167644,9.548840999752834,1.8470526160548673,11.556942373026185,17.932064639262805,12.481610881615005,12.683941711483545,16.441293159679816,19.445491340529927,7.318468502187043,18.29125254641388,7.581761670558542,14.163433514947101,15.293421050527227,16.109462144526464,16.974638741717566,5.2164957188851035,15.880696102714893,13.528020957864717,15.82024425825265,17.02484633610347,3.908999450706969,13.032028405295954,17.94445350180922,1.7215306332133151,19.043720013863428,9.339728357274485,12.21779752615622,17.227053041896113,2.6883152322577297,13.400378240962967,7.932514255153311,7.6396679686655045,3.3215196877559894,1.7403006252841724,16.842600203754618,19.99006488307119,5.508575587501112,13.083948628781986,9.20142559017657,0.7869686518535701,12.197545282883691,14.652843003758855,4.91123873424276,4.81599348566049,18.56716419060217,5.326446596902645,17.11578148080346,1.0085644804693272,14.3534334261724,18.125814763301666,7.2060718776981725,14.129542163536364,9.67209201349263,15.177390324329343,12.360868699073379,2.5024593081336244,8.282165028101009,1.495562798196497,14.457886218458697,18.861832790001266,3.3569815318071905,6.55475768609318,1.7726256032994714,4.969914465430905,2.775786845802042,6.998673355759406,4.722420832770506,7.896375365127426,17.320237304305248,1.295038756507556,19.759396823713825,5.646292019059951,10.373589463866658,0.6772499588999414,17.6418608436422,9.89693259680594,13.037774187033238,11.810567514393448,10.298444828014418,12.414770987783239,15.715308786755116,12.840223464100236,15.629426393587963,11.363798495798658,0.46398296545409057,11.054503573121739,14.098117140731347,19.541798609941473,18.067577767381792,4.170890341488351,8.7046458941178,12.903410428161607,19.466502413843806,6.165175200877031,0.988685521320587,13.907589827523307,0.47009030697381604,9.981310084766513,8.686444246792572,16.666094892760476,7.869934771287128,6.623277038951234,6.995401779568184,18.030058877094834,13.126980667779197,9.043681036693565,7.3782129396937535,4.552956704696989,2.685163562695281,6.416538532632101,3.499149065027125,13.246587445093155,6.966416794223407,11.51966896416119,8.197468690500758,16.641901926101728,16.123945708363713,16.54508379913647,5.354608556278393,15.796073929166234,5.616455402099003,11.950553368675067,5.41790113995094,5.086049868222959,11.523260658395525,19.90200884619842,18.156358870514953,10.366038087612125,1.447680426888982,9.615424186050156,0.3924870198690522,9.326691829723535,10.501652792347947,5.862103937930407,13.514825469432683,1.0994846038346617,18.07615453660878,0.7629286442050454,3.1687581939616383,9.814777010765505,4.757282662184386,19.196342994791316,12.735790202464429,0.24493495027318346,2.8909141853258813,3.2046125050015384,9.846548949755238,1.8421975349903974,6.932762070151113,7.872747350845035,2.4102804277890577,11.790356918851671,4.491813139942575,9.263204435088173,5.14744693410496,11.072236971190922,0.6952955828968932,2.8643649967747375,4.480592286922911,2.8249654542763913,17.7465966990132,9.28594738989585,10.651957174666009,18.048891466925493,9.430288270155348,7.838892034800047,7.020955400131541,11.646278002075077,1.1302096805067663,19.997882347544987,7.526881505206515,4.126137135346486,2.213306602776508,15.74666957767976,10.709077885871947,4.550878915325014,17.523857011352135,6.9866249938029235,18.445565989845747,3.912772526054211,19.840625460365505,3.183047986947911,15.080889551518117,0.5769729078881669,14.828152039778622,2.6200649063628267,4.396013039523643,3.2971194962758776,1.1260505816588706,1.5565648103410368,3.2020154941652157,12.391912880595877,7.2395286586840335,2.3944219301356418,11.16956734540944,7.8204327405629215,16.708618466334528,7.4408164324242865,12.682351855434973,6.851445792981776,4.410332898222751,5.129569105621128,16.78624523656239,19.722737714206133,17.515592331184905,19.657326373863135,1.3335436187131267,3.2795407015104328,5.602773237196348,15.310473007366392,6.404449438769184,14.87604543111884,8.9711904825988,3.5137078101446617,7.054923950177754,18.836190432431763,18.733228377183107,11.855498505238117,14.147753735346171,10.619328332865003,6.635465411172334,11.36169533628462,8.055330841001478,12.313844589451115,17.694033508573575,10.218283016066895,17.3030946172889,4.075316931646777,2.0576769898910907,6.653242961882837,3.2142286013106514,13.139226806222641,12.041124292585437,19.265374631925305,7.082978051067141,8.755252401022968,4.302283896628039,0.14675277340619797,12.378710824467678,2.071572262610717,18.51843119880047,10.611160433983526,2.398933509388579,4.012175300228549,12.32278328721874,19.847737854494113,1.9977529811596195,1.4625571986188346,15.814300823439883,8.293017112324325,12.344694535320077,17.452436219334754,5.182703566989417,11.913381101627474,3.6047648347999317,18.984224155623338,16.48185283996567,5.0017778196199725,8.107920463171116,8.444909154131924,9.045438128022226,18.16469532363255,8.282255680542946,12.082825338396578,6.282224610395026,8.418864489560725,14.864265513840644,5.137708026150718,17.08117756849194,2.061831057072907,3.3196039579966063,3.5865378076371046,8.526774453568935,9.352952310901163,18.102749048596255,14.520083575226618,9.249151167230242,8.98798931960294,8.13240935658138,15.151997291215373,19.371940105362484,10.954549285548536,3.429608836798641,15.564000439275594,12.537748280264562,15.048727139252094,5.187667791960813,7.2358256971634205,17.98262163992874,12.422795811169953,5.270899883753617,9.115150376623253,0.5763411525318718,5.932343799435134,14.90140358104532,9.206894970346312,1.5967495810493393,1.3587019307504544,3.6713537089794723,11.42080173841756,15.178800208577044,2.7966847544710483,1.0548294068545605,12.499472621198189,3.708927899383756,7.681314332487279,7.376198786354435,8.055371490047897,19.934212263741763,0.233119770964616,19.669793048928096,5.248448922106248,3.5709068073316352,19.957289939606007,5.393671654077381,15.894752723207194,9.844067758632068,15.856601503660382,16.71309058095555,4.568228740458853,16.88044433596174,3.7034617896035815,17.32254324641435,10.176411278174387,9.003610218368427,10.584496253899044,5.617711603514657,10.712514971237322,7.5498787021526725,12.118387733113538,0.5666254765545009,19.475260876363045,6.640711795887735,7.969580630521356,1.454791141175198,4.76733052386253,7.759866558192732,15.797923562194809,14.570197000574963,14.858810987396351,14.612664266543248,17.7605926869168,1.504229885517363,18.087548028494005,2.136079362663219,17.991401083366213,11.008526569220866,13.664203020726466,2.864890804822222,15.225757565355394,2.8921212422961595,13.182504293756852,4.978773161870271,19.396687857692683,3.39217000556848,17.493105061560307,0.9569932427631311,19.49323008237061,17.70107296302718,18.444560122674428,2.405848469788743,19.204315881431686,17.68523919120074,11.313468746801423,13.770899082839513,5.876001175060388,1.0829411324675675,14.704355232698031,8.222447009304075,3.282479712377757,10.873886308135896,19.567633008816895,11.930910523252418,2.273588602673997,13.866058953543817,2.6773658090860053,19.198519489991334,3.892870977489813,6.019051359916707,19.955026962218327,2.738714511489775,0.41241081054812057,12.334291735548213,6.892502113889951,13.999085539606462,5.787431732321653,10.526396015116344,7.462710880645802,14.257298035171818,15.736302114193887,13.981595466554309,15.065746859872196,0.8346528857940694,2.5501896343466113,0.6066840237894544,4.649445180778224,17.028728702948367,16.690489715569953,14.35307905235061,19.83171423093416,0.2149927704957566,3.781570104664489,17.211181693578407,2.6320103847583987,4.410665897925807,15.45785803405725,13.191509825767987,4.8697737144991216,13.352409531541936,7.056871832655642,11.703014296304222,15.039199757034861,8.676301049104435,19.67675148463816,0.3163154692501813,0.3383878627850523,6.622701428274382,18.786330599753992,13.39367005426855,17.269855895359086,2.196002356389295,11.437251724971693,19.131501027100867,17.00472173245138,13.189530334870616,6.599702082217576,3.2540277907215565,15.268091396959633,16.599639928415193,11.337895157816842,2.9713770965829367,13.850818396690162,11.860088726198171,16.789289000586358,4.106714403954643,8.207016149003618,7.5129375591985115,13.777787633390396,2.296934910744226,14.51754751232238,9.606648512480254,0.05636921237506698,17.89942948686473,9.226914442096263,16.42956448363831,16.746932807315194,6.131484202671724,10.167226507219036,19.52668009139319,12.13214192301109,10.358112407272868,13.502069616648491,17.187846059487626,11.98567330594894,3.318795407210069,7.754687970576386,4.485558852668867,15.172468413713865,9.184496836711746,8.826076583226525,11.573246625931525,9.685028863245817,11.211455665164953,13.437125592810425,1.7166383368483906,7.867477425663232,2.586613903105204,19.174338265297877,8.094668792597455,15.680106173892018,10.7663306053125,5.641458350502084,10.02503681762371,4.446709701839828,19.487797976518912,16.128060562234698,4.05014417289197,12.486592991202148,2.88104012926119,14.03558976643222,8.987349688019211,10.574961746970137,11.433519011896362,14.992949941161795,13.509319769936443,10.385263817127885,2.272227002944991,16.560453696094882,3.3157481613200224,5.891012352254887,2.5249702693480636,6.412420245652148,10.463387027174198,16.063095621938878,14.146144756763155,16.286743075532428,16.2598126855843,14.177908129823118,2.350405980675845,3.715300362438594,4.490149997669808,12.68974485650416,8.121412203110756,10.92602550565799,19.42664739479904,3.9642712674055547,16.734198191327604,2.832649802951881,15.534783936482079,17.059938858745625,6.7796605276449196,11.735997088560254,10.193948050741085,15.80533568366636,15.611965717530595,18.1682196889688,16.040154839852157,0.591194783454676,0.8093962863581128,13.238416624552883,2.3201276681318195,1.2779848034480334,18.367796851283913,12.24113342013252,15.439683598212564,17.046481282303525,5.303336306176805,17.094589060620624,15.239768811133425,6.383259521986968,7.572125408284132,1.955764224030725,15.514602428461505,4.726594410472349,0.7008534980456771,6.836965809531348,0.1561225441951608,4.244702590859291,15.253071125113,12.670565042132607,18.006325377028688,11.011085923419222,18.8689150354463,16.22573705726664,14.88635761227826,6.199206057880784,16.500696470324524,8.695889310099737,13.493400376100059,4.670214139184461,11.317618178490378,10.505777473670017,13.846636337196255,14.904077831709696,16.657434647601832,9.618498291647178,8.707592556551912,7.192356558030291,2.854540885484589,10.820786302341263,7.289339848703786,4.785523314924882,11.244908885460166,18.630227319491226,0.9725378230711224,19.45905862706532,2.8759268789378822,17.440754172873763,16.615068433976617,15.299457825568489,10.251517746116342,19.97050228098241,1.7080311592749409,6.311555573757821,6.514471987317223,17.146029214531815,11.08873682193706,4.045490033456964,15.810305685686687,4.720792087307926,8.89972359818322,14.4945131411066,17.282095421671503,12.693408328563782,13.732679702156556,0.3624354505074079,13.018863633174554,8.770341168007736,0.1284034480030316,18.035064006454924,12.621540363133512,3.6520322011894413,1.2001525971670768,11.44598638405467,15.877384769606637,8.757667772762936,7.000212612072878,0.145521211624291,16.50829243357507,12.483778103618622,8.549711608485762,19.45055300579095,3.4970297734341704,8.76710507183638,19.10545759377339,17.546909571403436,0.8659194474854814,13.392990786287307,15.717459586417144,14.736643703200754,12.87533155494829,5.269312825344419,9.529204226168947,16.691430409424072,4.948429787732778,12.291736837094277,11.636241204481102,0.8570044866527926,17.94369102195921,3.3494399360890847,15.615494351121635,6.981497219696995,7.851108908826663,1.8872044080290973,18.630156365270093,0.39474140738216423,9.628067729219548,13.852480917745478,14.674510870251778,7.760164843626107,10.072904390110246,13.053211502096044,12.921615942013611,7.992698398849214,8.325262293771036,6.787545699394415,0.6431964924740496,15.12914106731046,9.348664255016189,13.752274604932717,2.39896839142403,18.513647406238086,16.052403492314824,5.116042119356012,12.197854562771987,7.198558657744072,5.99719425499202,19.32203204673245,8.3692694086385,19.738207749586977,4.721223734429767,12.949496996950124,12.435252254139456,18.40310423227441,5.3109979600598,3.9683776485032496,1.6648496542142688,6.682038597668969,17.58659972497044,16.803401509524694,0.7731727932048571,18.78479481301396,4.5951076956895465,2.8775791923888416,10.444075911683166,15.573691126297561,3.791746059803014,5.1748565161488225,12.11808311441391,16.094354989779262,1.6916838502724652,3.266971969822179,12.014628599994657,11.047091458230533,6.873483313741842,16.68634667957758,9.758734697871926,8.64540372221352,1.7672363503911503,17.14502930751366,6.925314388302044,11.868188123807295,3.7206363283788724,14.242748088193098,19.180427765797184,18.176524348094887,18.63235856590757,16.698355639882006,16.340117743513854,5.268428930911844,2.9285451683237307,2.6599815560826245,18.193138900794107,2.8739051257765036,4.483043563058464,16.253513827897503,1.634815450338425,19.9897260881224,1.3066820779667676,5.660570826757949,0.41620097879752294,18.43726795121505,6.331087164364879,12.965027853270005,13.71026459741385,5.758377276863995,14.04003560856371,0.3785121570303751,14.986509641093084,13.59147645463732,1.0815558295484173,0.8741988729159322,0.44939283199609825,11.646069174995084,6.028631673175933,10.976153801724248,2.602015323224922,1.2154375429229924,9.215962980478682,10.798755236742913,19.47320902507233,13.475443607261145,13.36034091376554,6.31493244144941,11.043847577007394,5.049871675061803,14.346448963058226,12.488055958426948,13.34268409158815,16.820624871994525,8.752440380811226,11.610927989690314,17.339454800997302,7.701687442566412,8.62771856654902,0.857636074404251,7.7551644938485875,8.45695561772569,18.02667600127906,10.179109147289168,14.026617061498396,7.109402438787895,0.9014610104242538,7.5706250171739065,18.086657977582856,2.1477195881292133,19.21563925226263,5.564675943170854,1.985059304661787,17.771175354352874,19.875552444784702,6.207764850170343,18.963496610233918,1.0741954193195768,5.425171030095166,2.412834152628096,19.028648624755338,3.8634310903091595,8.947906012767373,17.476433385827164,1.156383051362062,6.295549244608374,10.802062574061404,9.859009984641949,13.246824785687018,5.571143562679746,17.409438758862166,16.869728758222276,9.316971701153566,13.227979776691354,15.89509178483107,14.42490943359406,0.3207981555532502,7.113204812493934,13.820773108921527,1.4983344607546556,17.822409657635312,0.5016104964464896,15.3108120564292,10.365463143205025,10.49226181357004,19.340924949174443,12.145422668075616,0.3096371651766816,15.629388958485691,5.439212258499468,0.20747858694164734,12.023561577057912,9.191026162448694,11.123142933523917,18.313120121585552,5.215951580460518,17.830266871640816,3.0702920330402828,18.77927224828385,0.9029094752427991,8.055586841257384,7.337989540968639,13.215091944810924,17.55463578180872,6.391114412786698,0.05659829836321517,12.642449184082496,10.350766333422513,13.082168982466463,9.69493254899402,14.516199131537082,19.209383848167676,19.71988730982586,6.276624338404919,1.490768766008208,5.830129680982252,9.504869099112527,12.980156447667275,11.976162627526787,14.506934110814438,19.80042936010451,15.564230041869113,18.901147659769578,4.827857662267658,18.99452246592237,4.568167641814362,6.1818920400241195,6.061566744643518,19.894811947840097,8.260773109263791,6.794547171280558,2.283368453069383,12.278553123541759,7.829759426852787,7.793002863998568,17.528178857624862,19.98145864855003,8.535370256696933,19.628093487907336,1.5018902230209186,15.178478897103066,12.539769233424082,6.833741598568026,5.296473771009338,11.887578832644552,10.500799498712471,7.546408091324732,19.29592018229188,6.972077266194008,0.6288670100289373,9.654208018495506,19.495467886734072,12.617422709569661,15.229412238268365,15.723314779533201,16.782491829747663,10.899368100854447,11.766314519542153,9.448810808253057,6.37403834414942,4.948046038578067,6.691486887303002,6.475390535418155,15.258137149489919,16.254974116962654,0.5290915328580903,16.910344349343184]}

},{}],104:[function(require,module,exports){
module.exports={"expected":[-75.73676952495204,-89.35783242559735,-6.121569319324228,-390.76931686955635,-91.04863464342968,-6.828973301308063e10,-32.74892494757309,-1713.2324402986999,-13.840621208478574,-35.52594117592557,-60570.576889691816,-283.1084807984827,-7.393902561733727,-697569.0914638707,-158.65217281954125,-3.761301475555724e7,-2.8656775186973765e92,-415.4748185276109,-146.86053705667987,-7.228114490313308,-5.735359516431641,-19.379641961994217,-3.344401671453036,-6.153316920537495e12,-13.48623895525564,-1.1481263792099936e8,-97.34156147046413,-12.583317671284176,-1091.4691610694736,-9.940537389848014,-1.9601404415648626e25,-2428.8218916583032,-3.291597687577076e7,-9.730716119444523,-4.230847238575881e13,-19.055761198229124,-7.488217128593037,-1.0715067796824385e8,-19.563233627186282,-419.496355140608,-28.451770817656516,-3.8998319771014667e9,-119.72754677675724,-1.1846664636600069e6,-3.142180385767409,-15695.325682297453,-165.90308486471403,-7.238983750853041e9,-9.069880672182006,-1021.7853823489747,-83.4365797549356,-74.57665525454568,-41.53535389296883,-5.3934800660442885,-95.72458817038317,-11.798266314815583,-353.63453064007075,-42.42183062160402,-8963.547872553538,-84.47664125493255,-7.62881200818811,-1515.4554999604948,-3.983580536349186e22,-5.4085813845453075,-2120.440016320855,-9.044009373436028,-71.421300568005,-374.7543349694389,-13.182204843189107,-170056.25101537938,-120.39158988764393,-14.346615011313467,-131215.08168838933,-4.629307640225151,-249.4302277228552,-16.587243165276085,-240.71620068919648,-2.7501000221787555,-270.76225230728926,-99.25777684918509,-17.626868754196565,-9422.249546030409,-3.8529072771516804,-3.4262464606538434,-78.8605799896062,-386.74127071456667,-259.75615911384125,-47.68943341188477,-92.89375952337836,-1.7118701598397174e26,-57.73289496517127,-60088.15320764492,-156.92965892257988,-4.597597169413607e7,-9.434562357038867,-119.5910849363518,-184.1036103145072,-4183.861278872775,-3046.423657595221,-652.5484989699933,-14.778482863939397,-5743.241490799393,-2.1417702608972378e9,-5.9447230202729166e7,-37.37892456146435,-8452.43335015278,-4.590115640900999,-61.72056160118918,-8.004394677564922e11,-31351.639129177463,-20.718481337630145,-7.313526736360512e12,-91.72881286818487,-15.558428848163658,-6.404559760362867,-2.348806100092351,-444.71785223004576,-28.807189856645397,-156.38021909233748,-2.2525755858167544,-559.2177362303396,-1.4877093587866232e9,-13174.954159956991,-34.951934173138895,-813.5402441710107,-4.2419101111118,-6.058853518208366,-31.10455261144438,-71.91295016994547,-246.94594425880854,-10.290937075186122,-158.30837840543163,-7.852194468020758e27,-9.194588737598808,-3.0522357863185148,-18.861211470486726,-5.319876882673277,-12.810387890050658,-77.09455472818183,-23.132626184354336,-4.102184465668388e19,-40423.09081280039,-14.485010573175336,-5.300297356288783,-30.52152375505437,-4.169514819749039,-26.823773712798438,-3.813836266045241,-1.414890171100741e14,-520.9669419473323,-2.8208686461673302,-14.458989376653339,-2.4234405347195422,-1081.2438294484868,-3244.1748170569185,-5.6724327468907445,-1142.317429755051,-4.9162234033134375e6,-15205.575171978482,-5.276999381549033,-4764.200333612688,-2959.1707869148754,-9.538457708303667,-1.5604217109915628e15,-2.2462962344527408e6,-34.08676543192628,-2.9223197969469004,-1.0505709863873683e160,-41.74328939900109,-1.370368893147596e36,-3.1303699471364933e88,-8.63276512726687,-3.3491438685255037,-827.0331049219432,-124.6424837911066,-3.8009753737248575,-10.795373778982219,-7.4559807464510985,-606922.4106929932,-1693.884590991634,-88.99013100015857,-39.79876426169626,-3.362077855579141,-13.649176855790147,-2750.2682816601605,-24.6394614047148,-20.008400872639648,-314.3384421314259,-3.4578762455945853,-12.913559558876289,-19.527387336615313,-4.6641224986973825e28,-2.2362444060927684e46,-9.299032967717912,-9651.01386298065,-4.447177244159673,-360.0899558254354,-5.4806073699064694e286,-21.2775368729587,-26.151108465859163,-7.35336575765422,-8.865836379945877,-22240.04506931603,-185.4349961778683,-7.567717883236891,-6.354194313158456,-132076.40955608294,-1.81133516251237e15,-2.843600248198366e7,-1.8906735173051113e13,-1343.5850266304433,-52.85705485666692,-318.5589042821532,-60.6849332395219,-12.015186735777316,-334.39473585572665,-5177.9859304361735,-7.57981549791403,-56719.4305020731,-17.77697883852988,-2541.1694275278123,-12.032200035027973,-3.563735285852051,-1173.8813230461253,-1.4017556886354984e11,-6.918788007165444,-13.595122173842302,-404.76475410920733,-50.050529274984484,-8.183792560997823,-30.41597444489183,-41.67331902074756,-29.452963410608355,-34.24384599101395,-57.26939904260562,-86.36452557869896,-23.24530339159519,-2.635998019854807,-8.792909433459987e93,-18.898410705924874,-18.124994992121295,-20.843725316430728,-74846.77299258769,-511.7668024631159,-664.021429598515,-7.528878400011374,-51.15713791134109,-6.51040086884589e40,-2.5510531034179316,-58.02089626430589,-22.53591866981694,-30.037129263138198,-485.2225638912728,-29.13003618874514,-4.044221573677468e203,-6.72680872416761,-187.37793770594007,-1.3959011796790257e6,-6.140261503667862,-1232.98373775197,-17.2271572751482,-26733.81187786415,-16.19778855966992,-6.532129270494876,-4.266287184200105,-275008.5793778935,-6.347219327519013,-4.783753382164583,-2.2086041879272522e14,-6.715723212838759,-6.537299868275193,-13.659584029237147,-2.2637725774856134,-6.542791445157145e15,-232.70947234579117,-9.58886582362843,-1.2335105270766363e25,-2.2090532863476517e47,-18.809285655736332,-3.4794670201616316,-6.6459895707293635,-1014.6859843446634,-37.39007561516507,-11.381152054756432,-91.7670105676578,-11.24001825135159,-112.99058323124069,-11.201671160148813,-1.7988021357047008e64,-4.460677655301771,-1.720389983248014e16,-4.7360223005162275e14,-8.19759431420211,-40.44835508605468,-22.88608585345621,-501.81239197856894,-28.58005627470893,-256.90684164619813,-402.497717321487,-36.10813859955691,-9.850367742717596,-12.34159317798817,-4.526153735143326,-647.8114181730701,-49.05324242128429,-24.81508523212892,-70.58276886732997,-5.532524229120214e7,-68.8239829424658,-2840.7337138006415,-51.51666169308461,-21.78876048620068,-3.5018004308777053,-5.06457511721748,-9.343573550908049,-15.108595577378718,-10.359430383768016,-6608.660715873547,-524.2181600282921,-840.6049670484541,-21.50723906228307,-4.501498312672831,-35.693365334114795,-5.997237066757656e7,-153.32981405020058,-4976.851384293456,-604.711703324637,-8861.38214886763,-14.271159517574695,-11.855050225894164,-3.8461686019322254,-1.5250994258068192e6,-610.5074326469202,-10.46574641537301,-1687.2229679366253,-13077.185649190653,-1657.2637262159724,-2.6782201055665594e22,-7.555279523809537,-612.0536213432895,-13.823968163531507,-14.904895702365206,-298864.2665662581,-730715.0302790863,-5.333838167360895,-28.25337969595245,-7.053859388809602e13,-20825.098967473907,-107.0855041433621,-100.23541109181362,-56.2567378933845,-4.355036596558867e23,-17.50225479503301,-2.386186906732741,-62728.91756416223,-9198.067130799307,-16.45888479773166,-85.16598894075439,-5.061056646519516,-42.68673314124572,-58.49898640723807,-2.989965966979577e8,-16.32158848465321,-13.406783129038905,-10.135226927531143,-1.3137683911081037e7,-6.220589256407384,-2814.0091811561824,-797.6652656101081,-4.596202249506521,-10.08410234529561,-2.1280202088361366,-7.220128485917383,-6.085032427066649e15,-60260.41380901073,-1621.8881938932998,-4.629029217033918,-2488.989972559845,-3.343473424976356,-43.02122349241671,-160223.89236568715,-1.2481522524305075e17,-2.364496899733585e44,-2.86970597710028,-109.99277525466204,-661.4948017773307,-472.80471126136837,-19.576472348107334,-2.5058995047925086,null,-5.567470983512196,-1.1745179869104323e18,-4.656847504811468e23,-3.562759011949821e8,-15.109945463046465,-2.123360718272863e23,-57.4232857777867,-15.265749843878115,-232385.06301862412,-4.68813309739515e11,-100.73131427115041,-8.834774077354062,-7.127598041824967e33,-44236.297251201344,-11062.244303515941,-171.40271450163053,-2.1084004133099234e6,-3.39449148259887,-12.793611980086423,-15.250958907595,-36.75273601837737,-57.392156112314694,-426041.04639665637,-9.145371141661334,-30449.02627660487,-14.683211495346349,-7087.040602193825,-6.44571064385711e23,-273350.27265212225,-6.861235987964246,-5.632779321884184,-609.1084992090066,-628.2286356986497,-8.063302721582534,-3.6644610899605836,-4.224822470166826,-68.50543059735445,-8.345100717283643,-324.38530421509506,-14.003677813839865,-1.274023669598856,-8.698572387258269,-9.121124310078796,-139.10604895274633,-33945.05555292392,-24.831107252005413,-1554.7109818738677,-1.204738905161854e28,-7.332513185729207,-12963.554925481632,-11.549471949307694,-4.368515146921832,-6.863154442730109,-4.6008265446379015,-25.52235594356572,-44.69753758521705,-8.396254991899113,-121.70546840319298,-2013.1689319075929,-2.8064689742542424,-3913.2731937757517,-9.7228137247699,-4.174689053952088,-2.6354806949249325,-23.168823837257673,-1686.0492461705137,-51944.4213947,-2.6720856666339627,-4.1804678508893405,-5.702514370025728e6,-766.4181491073018,-248.04399567089467,-125.12287650104352,-766.9907810778966,-13.779972668620697,-75.29745893140066,-19.411092256410022,-9.520663019646419,-508.6813095230028,-10.328922263054997,-237530.41429267783,-296.54478927920405,-265.9628822529587,-3.411511542953962,-549.2988803593854,-259.02573556079307,-4.606679982718298,-119.99432836674522,-22.612289179257484,-22.9312553466948,-5.1381359804913226e11,-11.904207859100003,-262.92122380545834,-3.5034641864133658,-3.9240869147458146,-4.944922005726885,-398.9044888358871,-80978.48145947373,-10.678462248934718,-100570.42122582694,-15.301773800360793,-1209.1793589529716,-207.06298157995047,-6.9104081007466,-2.2522109218469333,-9.316870161890774,-808.8827607506845,-52.68446384449165,-4.489137331435687,-4.074166397806153,-6.849033720099049e6,-2.9575983556997967,-2158.1129218663023,-9.219002288720926,-7.430083806964796,-55.6275836919532,-1.273434236511367e6,-1.9812517278579511,-54.24688884591327,-3.2736003695252407,-4.926696801663706e13,-21.841114099064708,-41.22533302409647,-183.15631937597848,-4637.652495070337,-107.92873217480644,-78718.95948292273,-11.670068888395956,-3.996226422595881,-1.046958422120693e8,-3.463966912065604e6,-325.7467988459701,-788.6906677228728,-2713.635689058006,-13.594397683649138,-295.9386872550568,-2.7762454406933026,-6.801770748942078,-15.160579350716542,-5.6357475403240205,-1.7117749073175318e9,-1.6068201153895119,-63.185685199351795,-748082.9238948945,-609.4923614333421,-3.9224277511919037,-1.7923107606884872e6,-2.8836688952329004,-275.28262116109096,-14874.82736262601,-4.50384283819425e7,-24.926206297707907,-2.5935806808830995,-8864.293582414464,-2.8920172911723476,-5.285019618484792e8,-35.60666008794811,-5.706166348183426e23,-6.827318917946882e6,-106.8470637861785,-2.979683270611045e16,-20.625055770418335,-6.198443325954613,-1235.2194693912536,-3.189320133796144e6,-51.60758296666091,-1360.0716630906475,-46.09705257318688,-9.576608486928766,-14.576166795881502,-2.8179174095868498e7,-153.141846542406,-25.719518977301956,-29.135701058934792,-13811.863052354563,-3.2307532781073336,-211.02466344537066,-22.468134383694984,-28174.796392123317,-3134.4847893606734,-10.930872995251471,-13.044000985292723,-8.512453266145169,-128590.69027493053,-12.452752127329605,-1.4044550053576885,-4.155135126466934,-5699.097914463368,-16.11899626933378,-2.8572698999380712,-76.99523255420638,-42.58614316528708,-8500.858743981355,-18.889387961107868,-28.97493879103911,-39.56021843323357,-89.76172094018622,-43.79130711432102,-7.797904471960626e10,-152.4533535832576,-11.833872173135575,-19.367538396068056,-58.91847608963472,-181838.22169364704,-20.11882421941083,-13.716263055827294,-37.775372872128855,-560710.3054145713,-160.31902512490404,-142.21017784793662,-1.3132997813575588e7,-1656.8533083686937,-34.480335119015635,-1.9714815928180696,-79.87200458043642,-3597.7340654848044,-8.583316176681222,-20.80222733716232,-12.487316627844253,-8.734614584702954e48,-10.153818424411797,-35.41350209634123,-20034.069560892345,-382.27464573856247,-11197.08034641371,-6.681417149476166e6,-89.28545324202166,-1781.54740442386,-1.2161389549305515e64,-4465.751784289357,-16.970457927532898,-3.628653417033155e7,-23.885274179986837,-17.5618622282692,-14.358166716137138,-1398.6932043202107,-637642.8900335818,-9856.264798975195,-42.53278084364097,-38.74028354221748,-3.621280175992171,-12.102269243963551,-96.6422504748142,-37.401734569974465,-312.46553863814256,-2.8768185671275094e14,-9.125669488624782,-2.987785665997112,-7716.555511716932,-29.560419181982017,-1.359128246490498,-284.93495028080304,-62.86256109245424,-2.5277301520717e10,-27.45077028368456,-7.948087624092059e14,-11230.551982648487,-6.12511541837781,-4.218193734161759,-8.896404404830546,-3.450151588283399,-8.789402650629224,-473077.7258564374,-3.432804741672883,-12.623039573742902,-211.9354034015635,-1.3698821812744245e7,-485.9305263082206,-627.3197674967629,-52.25792638253583,-36.0195762178401,-21.646369778915233,null,-5.349310846257229,-4.405404621963825,-4.3313939105090284e26,-4.613459205373756,-139.49549948866414,-12.229084807740726,-12.71686070162757,-2.0252540920504195e13,-43851.888825156486,-5.051620980407792,-4.5871280908325165,-1669.4956784183964,-13.478623932575763,-2.8134260288218824,-122.8462599042167,-1.996650187751869e14,-2.7967479977885164e36,-18.480201113441602,-3379.3882522799245,-304.730113162006,-208.07062870004174,-8.81893827530425,-3.399910149635271e110,-10.086828058732321,-14.1205845968532,-18.647653650771396,-5.08574392780614,-5.785104292997358,-9.251232381830508e13,-113.2092696045105,-28.02191318114699,-6882.7550677924155,-6.697799283130474,-20.254820327379292,-13.57306397991407,-56.44065805353568,-19.222857074026827,-1778.357620354564,-1437.392642437238,-8.987159256113936,-7.11376168429075e7,-11.83391882656027,-11.67555182756444,-50.93906885463889,-9.834362588266666,-34.80851096575473,-4.4837225035205655e216,-1388.9878367743802,-66.61447390445663,-5653.817616502848,-65.4630358824928,-8.052881368121321,-5.756711077825963,-2.5940725084798424,-21.873231451680976,-21.16322121358578,-1876.7675092500444,-3.429377029023341,-27.593837666862,-1.9084563944598352,-2.928398639321249e21,-143.19428764298172,-3.282061222518735,-120958.00081129516,-222.24619174581343,-6.237136658675596,-3.396000582394633,-62766.01335229526,-6.382846570895605,-3.637230565568609,-4.47615152854042,-3.8185824139011384,-1032.9229429499967,-5.3665130076126975,-1.528300652428465e7,-91876.36307457228,-7.242556155238653e13,-13.158809698559864,-9.611898284120322,-27.563847984016398,-5.153578101313873,-10.613634699426573,-5.884059639324261e7,-21.49565207163009,-2.458110389874825,-10.629463915932513,-19.53501669648994,-90.94122978128914,-6.048378345830639,-12.842632512732655,-7.540354427011972,-681333.5501695228,-57.5783454008657,-348.02329280040544,-121.51159775384902,-4.558538540507157,-6.020800325989231e9,-436514.34460550075,-5.123922359117141e6,-954.403822014978,-8.356901788539822,-3011.3149211945124,-3.878140533506097,-29.353221005548065,-6.507399269661237,-4.052588387910012e7,-108.66416653839852,-6.976227665622845,-29.851628349862846,-1.009775723322913e7,-36.315240081059066,-3974.934591435138,-26.205956957419538,-3.957887276598095,-20.58477565845911,-1.3795566689237573e9,-2.875938926900334e7,-215.8145713967489,-45.48640522505757,-2.535445560436031,-91.28043280723675,-481.13109748358653,-984.5087334350169,-1511.1987170945317,-8.432956762135746,-45.48652358430847,-5.845202276295915,-12760.540484880881,-128.54905703596984,-10.859974023700284,-1.0197554300705318e26,-284.3597259138383,-111.48180075207061,-4.6194948621786785e49,-908549.1308403757,-46.479025090893856,-4.942787560662275,-35.65943648598099,-3.7160878270437623,-9.714050146111869e8,-5.714745570283245,-272.51110697077473,-1.0096637650152632e21,-1.8434811761783637e7,-51691.84908555154,-19203.572622742413,-3.634439672405266,-23.390628929752744,-1669.4690334271702,-3.030089272823116,-3.6677551903600593e9,-1.1647015924786691e8,-2.9353914131695064e16,-88.67243243020238,-4.395259516466136,-85.12905940705146,-50.59660144599742,-2.660059751619689e21,-130.65271418125116,-3.442357467223765,-39.627323304072476,-32.026840358048716,-5976.490737724951,-1032.3557664104724,-2.6187156036177366,-7409.493038120977,-1440.1529555894415,-31.671366284587847,-3.2708027247779446e9,null,-4.9373718049899225,-4.754416112442612,-111.27813263313475,-3.412047157981721e17,-108.89807901334801,-4128.535378854715,-176285.2010982323,-39.04621401939148,-5.187930624390208,-1.7550891859121226e7,-10.724470393861752,-5.241148574814905,-4.973431745494705e8,-86.05742243771277,-47.92222152728358,-16.140912253070102,-3.1219246383668697e81,-2117.3828816895098,-4.5436555754934447e80,-6.291546006518471,-317.77194606330085,-3354.8507399675846,-16756.862911838005,-10.520900652450244,-1.7089949871548339e134,-7.127410292853335e8,-35063.25971551183,-9.119424940138853,-8.086274887379723,-33.8987388937232,-2453.8213053821373,-7.580317041783524,-22.733809230750307,-39.789781616675654,-12.740544053661583,-2.0502610372762527e7,-357430.1024176011,-12.896998109526312,-3.3440791711895335,-425.6464350655856,-232.5217816699434,-17.84364537170129,-137754.40718475,-14.780790350461544,-49601.37805982998,-31.274575603421503,-148952.91772982903,-1.1639151484427465e10,-8.962581042454396,-6.778242585190442e6,-27.53208499217633,-20.347042413923212,-3560.2701939879753,-5.062582172444464e61,-5.465933653432794,-32.49557108821828,-5.450594028305544,-6.337518359086145e6,-845.8699126802193,-41.50862197076155,-59.21834394905648,-43.42073102582175,-88.62924282496745,-4.54474911693505,-118.14064099230153,-102.45711194475923,-172544.49099463093,-7.874640630365614,-3.078669470409387e36,-5.5130170541157035,-2.416795342916809e9,-83661.30987409786,-1.937774181994523e19,-4.789651878978201,-5.67253794796709,-4.994433064600967,-46.38105255432192,-55.13354051142449,-55.9041088132701,-38.16456089447176,-2.5406783300817884e31,-4.630466327530085,-6.075749986132226e6,-23.358447596470796,-44.250376576260905,-3934.388923511501,-13.276043124247634,-2.3360369290832002e24,-19.38121411687802,-6.455827498409734,-574.7403719951201,-23.41708311531424,-8.25311390879785,-611.6698284676506,-4.96665636103675,-78.42691015377021,-8.466376515078816,-23477.174400180393,-1956.8328094853857,-60.0389714172896,-3.923928673481138,-3.1267442831532115e8,-2.304145864188009e19,-1.3557459444041703e31,-4.194649255272596e8,-7.8733927869733,-1.8575084614157575,-203.91663688067166,-251.9291063306464,-3.938657231055793e10,-56154.66752555782,-34.80541119819002,-2136.861581105666,-26.232224384957416,-2.773582917664893e8,-3.2851489219711296,-173.0301400709732,-486.83350289661485,-30.24718606625866,-72.0251059658142,-5.983715199785932,-24671.48732380213,-5.701557407049652,-4.843151977313212,-3.8932868308449886,-82.45344987861316,-2.890621320424715,-108.20838115369186,-6.691573348077773,-77.71228136084086,-316.0333763233776,-14.459947089643329,-1.38853045414081e13,-1.4495278686454184e9,-3.2739529814301085e7,-15.376868405251313,-2.8114569738837045,-191189.1989813893,-3.240354887028749e9,-38.661358336146264,-141.22468060364275,-1.1682978957640145e6,-8.903998431125729,-52.16827403425861,-58.65376596337789,-25.849587960636114,-33.44889038454741,-173.37927011300167,-10.838861318623263,-11.349119536912328,-3.651876234501742e9,-8.459179386441745,-24.539028334164495,-25.262413899888486,-21.550523225634315,-6.993794493049775,-932.9434324484655,-18165.257594714138,-1.2947077905110276e74,-117.54344686534253,-84.00387434196861,-678578.9782896487,-9.693912588144444e8,-42.25806977629041,-9447.083341125373,-8.304660481125376,-6.710060546916443],"x":[-19.180827573858537,-14.1276531218839,-18.473516937535045,-15.445525948343686,-19.81437621903754,-18.18376909073346,-12.731675660577146,-17.984896489937164,-16.146535709800528,-17.617426274076404,-18.1827323123063,-16.590940201034382,-12.619238313693259,-18.015565465938128,-13.306998443434523,-10.43773573244065,-17.788938857032022,-15.799847168044039,-11.116859010996059,-15.760483680119311,-12.511118606102922,-12.036948713336367,-14.83019596331532,-18.02488653158258,-12.389301273892109,-11.466839194685637,-19.820052081757563,-19.133533308690456,-18.87889227656175,-14.96523137532125,-18.25759294370782,-15.792087389273066,-19.514596585556784,-16.50168477395856,-15.377024898339933,-19.786218141613436,-10.86319837920173,-14.998329957115214,-13.411179385888754,-12.691378703562286,-18.64626645177822,-16.976248910466737,-18.905186911868032,-13.202563115421494,-11.999903541512019,-14.919168354696833,-18.919086448495406,-12.121380209742018,-11.157964010209316,-12.946239525267856,-18.789813343948236,-19.58081478298959,-12.64512697997441,-12.254647188162952,-14.627132866124832,-10.38272726630775,-15.97241117769129,-19.72652615218824,-17.78863691207937,-17.708815536855383,-10.074197835177664,-12.95450892198838,-13.241115213638457,-12.680484453775854,-12.055300797656027,-17.753983808640427,-16.215382291246897,-19.96528890084099,-17.36235747424371,-11.61052000375796,-19.26714532770633,-13.16456336432369,-10.108178567372054,-16.407493526213713,-16.057184208072474,-18.405026270482722,-11.527222836337007,-10.395456617373577,-19.025214744390503,-15.997730284833931,-13.997791758674412,-13.096932573749054,-11.790535256734813,-13.87779045220003,-14.26835232015601,-13.875159138613888,-11.113215388888696,-19.40397065315367,-16.274753832784747,-19.416975408373517,-12.141943715347526,-16.797385218007506,-19.16174079934244,-19.423009462277676,-11.697749680709057,-11.967819892752761,-16.982052414690482,-19.112656866015442,-12.336556224215416,-18.216499679754797,-11.000691921654166,-14.479794043220755,-17.29243082784834,-14.531840618606822,-13.064029533252642,-12.776294351313702,-10.565322242416446,-11.549887161782701,-15.343847879439988,-15.282051685719813,-18.971016083436524,-16.16177030972333,-17.233933120434052,-10.996305072185852,-13.918741079893966,-10.378940445873866,-10.87104408517834,-13.128983285122867,-19.71945977792516,-10.881511779165432,-19.7485130591621,-14.450434302521629,-12.740121864678875,-10.160410552939075,-11.419239913193033,-14.73416568081534,-11.718334795968648,-11.297670646090092,-12.48176249078708,-13.645388575800947,-12.50827790830538,-17.778834098836406,-17.21882146435332,-17.480156498270837,-13.107984438860589,-10.307443647757108,-12.956805445203859,-10.708456333449465,-10.40061803805145,-16.878234919269318,-19.41457338020482,-18.38627405965305,-17.968361478610284,-16.138963994219914,-10.604371807968596,-12.115383054981184,-13.026686790866508,-11.57005224433111,-15.064371612923015,-17.98131081892571,-10.457567103942981,-13.301462695181945,-11.652858377617825,-13.49095351637863,-17.149307743548942,-11.252969206602492,-17.72089387954646,-18.199860326693692,-17.869241586119248,-12.43392206588987,-10.763324800793658,-18.712161005689477,-16.825276468339794,-16.363446970843146,-18.797335445360247,-11.864782883936673,-12.845669186830824,-12.250669571063336,-10.698219974272277,-11.305844817231357,-18.301653988485413,-15.391788843794291,-12.330183804179304,-14.94348009109981,-18.2300709690908,-12.721604903388847,-17.171689722190916,-16.844047406694827,-19.602363475993844,-19.198484379402952,-17.55280956213371,-18.538063426981918,-12.34827643368389,-13.312298368336963,-14.162279756537696,-19.369206615780634,-17.850984974813166,-16.35407453526644,-11.076774077270075,-19.577298283085415,-14.154556471846327,-13.335857202874843,-14.294889628726985,-18.13182889604705,-16.649217652812485,-13.848362786124822,-12.899154031853254,-14.281754053253886,-11.895179169203507,-18.38776146452521,-15.435581009434499,-12.513007821427939,-16.746697932245738,-12.16450313562327,-12.94847980203755,-12.179347077099433,-19.287524290883713,-16.49000042997085,-14.501080627918718,-18.15154877624069,-18.90386250684735,-13.205878964565954,-15.598218381122974,-15.42880126286825,-18.107438958115758,-19.246282606317347,-18.298804731889348,-16.627066708327224,-16.080998661120674,-17.2319612319337,-14.35388636264121,-11.560935391201692,-10.155449016104077,-15.83508964523854,-19.01478560117807,-13.42505968659518,-11.712208954809045,-18.69377262377611,-19.789253051954397,-16.370050763918893,-18.559148556247294,-18.161714128004334,-15.6112333204272,-10.527890042023618,-18.7206546544541,-19.635303467735913,-11.958862168182673,-12.119789476436278,-10.120763184661982,-15.763487439087392,-14.045496680266748,-19.086070123993263,-12.095640235110015,-17.449747268298456,-17.844992399833558,-13.725544624605043,-19.60994572618737,-15.261776637784452,-11.460323575533405,-18.469046905523033,-13.156522481974864,-13.994029478358492,-12.375558045449992,-18.004852867015334,-16.598625383602474,-12.054426554796521,-15.122455818597327,-12.904147792850718,-11.327650378111862,-17.736226011642472,-11.76928338848666,-16.979417919827537,-12.972389341481074,-14.32961797776996,-13.972157493835258,-16.4607791593861,-15.489760163483412,-15.271262902895506,-10.732191722489866,-10.416698217690818,-10.937707525004203,-10.638436501845849,-11.76023923633716,-18.860727254197837,-18.613343142236133,-11.351507504956448,-16.394367406731348,-12.865597268650411,-17.101994425478075,-12.393341711603988,-10.151082966311156,-17.89608626766318,-18.9542204825233,-17.085713400514532,-18.01098944382446,-12.80490469830382,-18.948379392011116,-17.988009571230997,-13.861222936664321,-10.810852748409568,-19.843590336958478,-18.828660092186894,-14.453736161230935,-18.11170744890464,-15.314878095995175,-16.50425731268934,-19.32305922698005,-14.896411876148743,-17.01983750465055,-15.746447999171494,-15.829133067573839,-17.221618925599525,-10.113359754109126,-16.669578412754248,-11.413204193109907,-18.992253129067564,-19.377384592836243,-14.514046920975117,-17.240102982670958,-16.130325086437427,-14.346996058659707,-15.188362998287372,-11.951916686887294,-16.620902640804417,-16.194545778425987,-16.4781759396817,-17.55696475929423,-13.122931560750997,-19.681111127523184,-18.687590037104485,-17.644182417451614,-11.049736197825094,-16.856290497478913,-18.175126298878137,-19.790609466209645,-16.930271210212958,-14.708877506295712,-15.076103210734047,-13.356933467178337,-17.117717899560486,-11.667169282534296,-12.590322748593252,-18.146483270723508,-15.782493804752246,-14.492541505989509,-19.405264952979,-12.416330831540112,-19.90459062051555,-14.102847222066135,-18.27968137800547,-13.072195153611904,-13.578530461902961,-17.194085988483433,-18.057699285303233,-13.16003230258425,-19.407588075390166,-12.757747369891817,-10.926268749885995,-19.24406935607981,-11.679737924311373,-16.92411979655966,-16.51481695358462,-19.021585557302963,-10.246297582506966,-17.328262838147197,-13.667362066588542,-13.98291628242873,-17.49186535533329,-10.536307405038428,-15.136889506763938,-17.1638665252414,-18.12355459780782,-15.02024478051869,-13.798700378059,-13.19203297889401,-18.499628317187483,-16.898051039934256,-19.364453711441893,-16.691894858327878,-11.239887793001861,-10.017085149173319,-11.27132754126405,-14.103676883021105,-13.604238659649383,-14.912891870339491,-17.298000579320544,-10.672497238679323,-19.488977093981696,-14.828738890592948,-19.741503086531708,-16.091334141450318,-17.260508036808623,-19.728352929544602,-11.452082535985525,-14.80323894279209,-19.643809139918943,-13.471809328840887,-19.71677688375248,-11.63255915245317,-19.641939905323657,-13.784071951174443,-19.104654787197767,-10.133635956073395,-13.613170974410302,-18.037684200187066,-11.753282171599821,-17.792284478976637,-12.022121229958858,-16.193263950864274,-18.8287056731555,-15.405738650210068,-13.088971983006708,-13.843138132820993,-19.02427042413303,-19.63180157778998,-13.618406628458494,-19.843709759194525,-12.20126538021521,-10.010445792697915,-18.659430011955024,-19.37622222663753,-10.631704794449849,-17.714428613361587,-19.55634425742176,-16.612250443075467,-17.691073571318274,-18.685622976387705,-16.970961680466917,-15.110241652243236,-10.670325393355348,-17.083208793456848,-10.713108232629354,-15.401710746544918,-17.986011678726918,-14.82926442279149,-10.283788500134998,-19.714979041345096,-15.246358085839338,-11.802161595527274,-15.454794474025821,-10.390630476164374,-16.202418253376564,-17.68628075924922,-18.131318128656243,-15.731427614441847,-14.844910738213628,-10.430612529502687,-17.657567213802764,-10.342127360348965,-19.555887997268496,-15.47290422555877,-13.180523657186612,-15.263471415737666,-11.64224658024722,-17.525531545997012,-17.886550828325923,-10.988821952502503,-17.77772164089645,-17.027062758084885,-11.079274368060117,-17.549713372701746,-14.701450151432343,-10.153287283587662,-11.249099767590693,-16.465247808014883,-11.519658065844107,-14.94350933947963,-10.643972649021249,-14.174737215795492,-19.368415539870398,-14.7964005152872,-14.5600860867198,-14.566210935790835,-14.623600594850384,-13.531304597897424,-17.695348748717667,-11.285991132911139,-10.715719131768466,-15.723620957144945,-12.25007886027951,-15.77548542538523,-16.243977849251507,-17.003232767332054,-11.604502476976236,-17.986536497470205,-16.918055308452587,-14.768495145928442,-16.54899588143897,-12.316242127157857,-16.414866823217686,-17.90720072013404,-10.323109221560905,-15.87156903786676,-14.125209988151383,-15.549414098369962,-14.259398691021419,-15.72592008589325,-10.107409899851955,-17.94304254471625,-19.145165541568772,-15.126575313198972,-19.781083841086247,-15.095156832129133,-19.08262422913323,-11.36476054540681,-11.809007069828176,-15.183840466582616,-19.40301142528173,-15.672439744149704,-11.948293922524575,-18.235079419363025,-11.18248880031251,-12.742191107766265,-14.432083720946709,-16.96763157044892,-16.94597110986255,-10.503835766335655,-10.287801708380979,-12.173362596614318,-12.347383104565282,-18.120743276569215,-13.067216381172189,-15.922284804963356,-19.771986703156376,-16.46338534964645,-14.742286771974953,-16.790029724041432,-15.048010157645281,-13.005875844180645,-11.243259905454856,-19.056114213899992,-18.255421374641692,-17.267005620590584,-13.335029112692496,-18.385980987815223,-18.734418973950955,-11.53042943494432,-14.628886291330625,-19.495425407571428,-14.411464196664792,-18.035372759642176,-10.358956009710818,-15.011775090490723,-17.61528731501176,-15.719831621312082,-11.337075292039527,-10.493210432288942,-11.62664021196337,-15.217161412125344,-17.09471167454235,-18.789713163402073,-15.584021642673314,-10.724317203417726,-19.533864752115456,-10.022287179565064,-13.688165948743542,-18.502391696033996,-19.983238046766232,-16.719831828503008,-13.741734036659937,-11.888123995879635,-18.490217047591223,-12.670483739927839,-11.367520323390885,-11.679132070597722,-15.877768192181904,-16.23342382554579,-13.311950582234143,-10.144122919193867,-10.214046487658964,-15.178666401331867,-10.405185699836428,-16.553278806914463,-16.7818473521224,-18.11655479814767,-10.898491778032675,-19.99928280224424,-15.455205305815499,-11.375323577712406,-13.176008044491699,-10.712961818728473,-12.21844265602934,-11.005051564620196,-10.63791338267939,-19.076137397807994,-10.40973799288415,-10.775698290231128,-11.406384245404432,-18.86855163680741,-12.53135865934361,-19.27565519245346,-18.554542947486063,-11.294349182948462,-10.355266498167914,-16.91014518904788,-17.691692819343956,-14.660413997869263,-18.33708297223041,-18.642351741740313,-11.427561155566142,-16.324604181662817,-16.454557583072603,-15.969147472699738,-13.868189114487919,-14.485162554816702,-10.010126875855024,-18.863221549542967,-16.83168718998333,-16.953734967996578,-11.697991747576298,-11.313172167708371,-13.38461236075151,-14.543643037148147,-10.392891605855327,-14.968243701037123,-14.190287902034084,-12.169563421261156,-10.673656196307387,-14.047770228642928,-19.14512428530919,-11.48596582927096,-16.516237592556887,-13.651951137024326,-17.491588539071007,-18.962017732156774,-16.60549225954119,-14.789555456693469,-15.502293897988022,-19.16618220776764,-16.36737576861012,-13.224933667944773,-18.53428563382119,-13.34481810470518,-12.705234022533618,-14.795337283051346,-10.893434909342982,-10.333497815787249,-12.60781364374806,-18.57658951909759,-19.66023447116194,-12.871285368878036,-14.543902545505334,-14.225145012815894,-15.60572000300828,-14.668415413396641,-13.187256044589923,-13.911046710361589,-12.59260230453779,-15.376950267725494,-18.23437558301205,-10.548367865983836,-13.015154771713117,-14.989194355529214,-19.626838144877283,-10.152032449918238,-15.28218540835389,-12.876768523110396,-12.81951048951332,-14.26776487312678,-16.813692956833485,-14.06207122425213,-11.522270472217201,-14.51383785301978,-11.893035538420744,-18.130028735408754,-16.16924550312702,-19.173137249375934,-12.6374639938048,-17.887585780470637,-19.894525176512207,-17.01861900140362,-15.264136966218391,-18.523550506340992,-12.230144047455019,-11.867598316281212,-18.3358325695292,-12.80387211572392,-18.987663902175875,-15.440129870994568,-11.951853067109528,-17.37659216196519,-18.053440759455718,-10.189512558233638,-13.293213806982909,-13.616762145111633,-14.989540031922196,-13.093071181505017,-16.18415194301478,-18.799310864208238,-14.568406810220944,-10.520437400801558,-14.40094851949863,-16.82825853491173,-19.234411019713175,-17.038994933956776,-15.827570792106416,-11.28637354580621,-19.003780138659387,-14.989480158178266,-11.873591680414336,-11.58697903997597,-18.04360298420162,-18.551635716691653,-13.03874731893449,-19.357401211067796,-10.975001049306545,-12.021700262011375,-18.799636574445607,-18.547362206414594,-18.147876751305102,-17.155880239681494,-14.08690680862132,-14.37217216090347,-12.342312868892847,-16.115579529365068,-14.680280099926355,-19.684092421889524,-16.8266354382521,-19.67266526624244,-14.285602558049481,-18.463026475460797,-19.998245156635758,-17.365767125666732,-11.571802318088299,-10.537735671049447,-11.095220494901616,-10.505831313626341,-13.634962606942928,-15.787686350545684,-15.406378077889604,-10.360675155478825,-14.94360255225388,-10.4805391117106,-10.233017506619234,-17.67969924451331,-13.107492749862672,-17.64346512659063,-17.524296510711547,-12.35338390777671,-12.01276611679523,-19.841110513760828,-12.912499695217774,-15.257056607011048,-11.339770550493107,-12.804976087367375,-18.1993460194693,-11.40720822612304,-16.500392648075685,-14.655367069936753,-18.88301629541622,-15.367755951031576,-11.306544334449297,-17.9056899335505,-10.333125360314808,-17.2549764782204,-15.530330732739788,-17.786453197431634,-10.907952288275046,-14.257934602353298,-19.729642818102494,-18.75511300682431,-10.810515641583994,-16.71377897320952,-11.720551823397773,-14.158161266462994,-17.134426420799798,-15.818373078316057,-11.124584461601884,-12.52721869271279,-17.71123430889514,-16.286862337821468,-12.962848684928574,-15.789193888122723,-15.884087586985181,-19.134010615506575,-13.176341771882266,-16.707619656313398,-14.283954609161016,-18.083551449747766,-19.27875870854944,-13.963316985203736,-19.993500908950757,-11.726739704280538,-19.471849522436212,-17.897912581873175,-15.816471143435006,-10.05758041953081,-15.764964634976907,-15.125699216784401,-14.346165279993793,-18.77358987892525,-15.511871467915505,-10.254294329387637,-18.933237354766376,-18.83053999273203,-17.85980717738314,-17.646529760059043,-16.291421996273183,-16.815874568156087,-12.771827970215814,-14.561564480150901,-14.276826328713373,-14.135699966412744,-11.099702017127179,-19.52104241904005,-19.929500898682726,-16.0087715639405,-14.26585880369199,-16.19740003337292,-14.440085758465834,-12.056842431401705,-15.63851811564755,-16.12838115320318,-15.468202238823675,-14.863603955638649,-16.37403568087043,-18.635155612478215,-18.02875147555109,-18.813163287131736,-14.64605494141681,-18.855450440595654,-18.42187885632317,-13.427934728976732,-15.81833363266541,-14.663175644723728,-12.37377226460923,-17.07269941864573,-12.59183933945055,-12.421939401491628,-13.359503577494415,-19.639361301823165,-15.705050860653785,-10.391119925601789,-16.34272924053333,-18.540491656281922,-18.24143484867085,-15.394087358156597,-10.041146585817051,-17.431965897357554,-13.968573032559846,-12.518384541730772,-12.510804509694625,-10.864813804171224,-16.472274500668455,-14.091174833298926,-14.266755624403554,-13.937189705620046,-15.056993373498795,-14.631216470754362,-14.262621718324414,-17.180147545292456,-10.591368974288802,-16.792048667182282,-15.198210220059087,-15.368365639626845,-13.174078052533115,-19.15854660380978,-16.365504865835273,-16.214579675427853,-18.94981986813503,-19.279576306149306,-14.308652566351478,-10.36845740683429,-15.031440216898943,-16.37899799875346,-18.458321617642913,-18.369530143838382,-13.89568003155075,-10.15055981448953,-18.546172182692843,-12.677899694496265,-11.944126947552059,-14.707473850618165,-16.443317238909348,-12.229455538741531,-18.930457195652192,-15.76554431918004,-12.67963560392855,-14.852792799850796,-17.387781755503227,-13.381748284971602,-10.576125508526552,-15.364845155561962,-15.189987171868204,-10.944453124244792,-16.95263565981247,-17.62327904748309,-17.76726796868841,-15.2921586923898,-19.516071266280555,-12.154594028301396,-13.454569332839647,-13.693702507955505,-14.028455709403344,-17.60047173851531,-16.72976075441655,-18.276702313297978,-11.91633612855512,-13.293052749061413,-16.86998119555879,-14.569555846339874,-14.96672096585841,-19.85667373125212,-19.76032659129461,-14.936664803954427,-17.934936270417307,-10.7601081532611,-15.30614444603879,-11.27136012104682,-19.497425550121832,-11.242294810405149,-19.807929639502202,-10.397936595933404,-12.065332753433362,-17.903442904679984,-18.803648517796287,-14.995189840092573,-11.638149657724743,-12.77909822385241,-19.773355883094556,-14.963776627549901,-17.806234775293472,-18.14784447596155,-19.18665614426246,-16.950986517579253,-16.402964392097694,-19.684984889907096,-12.593083633556681,-19.307762159186783,-12.850355295899174,-15.079376763924248,-16.241594824452466,-14.707775349862223,-18.79966253333942,-12.439306754508525,-10.056680647843564,-10.528081368363246,-13.589652351513205,-17.234547127298722,-13.585809859607448,-10.546455947031305,-12.880282655720464,-18.500162515030325,-12.956342312740725,-18.976704542168324,-17.22812476646737,-16.40247241806756,-17.040469538372385,-16.069558672835043,-10.487241449800308,-19.9637079280907,-10.236656135571899,-14.671893859871732,-17.67189643623167,-18.197910273309926,-10.21522065961647,-14.358300186344257,-17.054164740339207,-11.513981064249897,-11.108741648768813,-18.724146266538803,-18.55211856482378,-11.94280329454057,-17.062539171927554,-13.061661051516104,-10.157719683730564,-11.269833528935306,-12.500932432446263,-11.980901920782348,-11.566081381833683,-15.446885781802047,-10.30563977474625,-17.85920904833633,-17.17820941654786,-15.947829146534175,-17.328082732281217,-12.286886609178094,-16.91713554613641,-18.210762344896686,-11.669119737171759,-14.959340004783394,-13.722205334971802,-14.863633766133047,-17.292534231178788,-15.637739627396423,-11.769716955105107,-17.20591370850546,-12.495573124200847,-11.163929332798443,-18.90764770230682,-10.668789536255101,-15.536268620886165,-16.213688506302205,-13.670462578910689,-15.08304417685859,-17.6000430387629,-15.427215767504768,-10.771192555090645,-10.714779236742487,-12.052253496306253,-16.280136663304322,-17.6527918863308,-19.511919867456204,-18.16179803311398,-14.995472493787025,-14.53687741515768,-13.56392386407665,-19.119789325225614,-13.823287488872477,-13.585002288226178],"mu":[-0.9857830827872727,-4.976716524548442,-9.341960624898073,-2.8482579092586713,-7.9697283093156805,-2.0761140283458435,-9.112998963567234,-2.693322939561964,-3.7136560151461917,-2.5330517297280286,-8.55707793187291,-3.272960996099741,-5.081052769912489,-3.301712354315771,-7.376441708673616,-1.1448246858657685,-9.233825243489465,-4.612016067199134,-3.7635762554017282,-7.0877721817558115,-4.121871439275004,-4.598918779343784,-9.957455306242558,-4.773969863999392,-4.888958540531084,-8.915768016898474,-0.31680488588816225,-7.936850046575699,-2.372841659401652,-8.961912092773577,-3.570602204912676,-2.033748313728174,-2.921395479795028,-7.3865828172317975,-3.0585374077969463,-5.353235498051552,-5.559245285144887,-0.21950254415795456,-1.8148463869038722,-3.9479782514433226,-5.8180317763104705,-1.8860772189293806,-6.592610847235962,-2.5521544002645524,-7.727387424040611,-3.1228351652308906,-7.914970784161737,-8.937858907983573,-1.616044717521179,-4.8466725799582395,-0.26473329918345945,-2.3641089971404816,-1.3806103481089171,-3.929875449302598,-4.74466458692193,-6.950289464584467,-0.4844616923103273,-9.319329124400774,-6.338451121770534,-2.952338229607887,-1.1737608013985223,-2.5282316532929494,-2.723077457867198,-4.908750831284907,-3.5042942247551645,-6.869816635322737,-3.9330580374253876,-2.3072059581254134,-4.705803101131922,-9.662998902278478,-6.432533428718232,-6.766818854032657,-1.3085194264340227,-8.929541542380225,-1.1202385753028699,-5.289538386583626,-0.2351741604676283,-7.493841644299046,-1.9666622857992944,-6.198277885020151,-7.329549278239815,-1.2389370797553223,-5.6738141283683285,-9.879050068263368,-0.5867008014853559,-0.2521224419954149,-3.1491995246962556,-2.0859130596434383,-9.10926819305603,-7.3807732727137365,-7.191619148050872,-2.333694901768364,-8.373901084258614,-9.72816506199236,-5.8131434645663145,-2.991313700144309,-3.8938456785354414,-3.404294716275842,-1.5197061122145161,-9.21882108975286,-0.3880115452770472,-3.7010683074777218,-4.177859271405142,-8.478144469078906,-4.613689245808914,-6.361037965923728,-3.1699855190393422,-2.187988969701893,-4.648021965632292,-3.9203404886343463,-4.260636865033208,-1.5896547816629614,-0.21585752640786993,-1.2562822682387509,-5.118120418421119,-8.91450076904696,-3.6553761929359108,-0.5734110513943524,-0.5313985971991841,-9.743891228375645,-1.8671032834927148,-6.47135616630459,-8.234921430552944,-3.45616462122857,-0.3371135521625712,-9.460616481821829,-5.121917799686133,-3.9482900116236297,-2.221830601981265,-2.533183236742771,-1.882176221368872,-9.657562743164432,-1.5680637930223318,-6.412712785357593,-9.949667907712438,-4.156587347784271,-7.353842867317269,-4.793355923318117,-3.355225679003677,-7.990940198561585,-9.570730177702737,-2.307273428613399,-6.371014029721362,-7.786969772885133,-1.5472283461995051,-6.055818031102643,-8.5014321605928,-5.942561350104234,-1.6940368945722373,-7.739383826216231,-7.288371439064121,-3.084505334781509,-9.537323009123796,-1.7407395647821367,-1.1893206544364099,-6.670269377901395,-0.1559794700425754,-0.009242362595227593,-4.54161834475761,-7.900749192533036,-1.534187973171699,-1.93432414889676,-7.481491098001096,-0.4588910329258056,-9.697499114817159,-4.862511019274304,-9.348030582290377,-4.803930000511041,-5.427480436222294,-3.151185561482708,-6.120212424198341,-9.354224299943155,-7.570454087945809,-3.2372763690600226,-6.533516613583599,-9.269713126933695,-8.463536011443757,-8.017528567556685,-6.046266770395463,-1.6409919631703573,-6.627205623729462,-0.15347649513373973,-7.518606270599419,-6.447131456682865,-6.0682535065351395,-9.024990393524153,-6.949106727732972,-9.74018069523121,-8.865639804075155,-8.371987299890458,-8.39195141424036,-0.8456797654504644,-7.365227138621999,-7.765522112467316,-1.0239801690652173,-9.120111803446058,-2.01048760102162,-4.059538784474352,-2.2754141618009305,-2.3388466263696195,-5.435646058278247,-4.842670731184255,-4.330330319866585,-9.400425446411809,-5.201430342262947,-5.460500373868777,-1.935474714621226,-1.7715530563630488,-3.0193702891430574,-1.2436423798484086,-3.2697465562650407,-7.33506074268136,-2.1856415095070925,-6.880489145086639,-6.595121518319105,-7.947700947758063,-9.885766217618743,-7.821813444009615,-3.88458291985895,-5.269653526122751,-5.8012946824305995,-0.5468006674783088,-5.445179711780613,-4.966761964875457,-4.134515415976745,-8.179015523175238,-9.39499411869414,-7.483913931880468,-0.6205973121633823,-9.140813791870777,-4.086990084383702,-6.449865546934239,-3.6522556949645613,-0.10819673114495165,-6.459833440422045,-7.136502114511682,-9.900480948313135,-9.466173739359204,-6.027752637134842,-3.764870257961377,-7.417764111300418,-6.973000867119648,-0.9728513047200504,-0.8006706239845873,-1.1347475038426946,-6.482652094728019,-3.517480695801656,-1.0533681407821982,-9.6018490096672,-1.7887632606643433,-7.90162252951371,-4.485307555148452,-1.1371429627063367,-2.8497280650736467,-8.140386560798433,-4.634253536381491,-1.459424674391998,-7.55777476939929,-5.656644039517618,-2.942568235740497,-1.5078947002660015,-6.963488675874647,-3.2650007649098445,-9.900550574223157,-8.18651194888512,-3.7402251952852072,-6.609082355764471,-8.220709386405662,-1.9451591384208111,-1.4704649711355255,-4.0659384085380035,-3.448674008099808,-9.925639767898014,-3.33654607217607,-9.20640830980405,-3.26146933428761,-5.684622375925352,-5.762759964449355,-8.69369448232092,-7.184594924618337,-5.001932701009633,-2.138375056959796,-1.3201115728532375,-9.915307080595362,-1.1251851780686795,-7.466211531905865,-1.1061761543584803,-8.43207309737237,-4.488181234347389,-6.38739537373298,-7.096984451056434,-0.4159113035670092,-4.40447134324391,-6.591944270202193,-0.05683062432340513,-5.747714989111088,-9.44769652932844,-7.090094627502202,-1.053153000895115,-4.905118786144326,-4.393845127170202,-8.269523398709994,-3.1765916266706307,-4.677584961583303,-1.006760249695935,-3.067876797553515,-8.295592165828147,-3.545178197122343,-1.4808327060976278,-5.1490797494487595,-9.256174611656034,-0.4756318645760804,-7.183859579588248,-9.338146850051977,-7.585148024152324,-6.121505450514071,-6.149868249553013,-3.6870663544046534,-3.694297268462192,-3.6906845920015807,-5.936089954356323,-6.289802637779049,-0.9772079165461567,-5.233821275808504,-3.9075958980605496,-4.170374914818591,-2.3141902971902306,-2.150162866269094,-2.4990708175253773,-9.788463007657635,-5.653366624851146,-8.54346861874528,-2.792066489746261,-8.230687787604388,-3.8275845986493717,-1.4094787315411939,-7.756368260538822,-8.47522714692378,-3.7939766713826772,-5.891928847913657,-2.5539333953475674,-4.571564422344596,-5.405582550280088,-3.844757548672031,-4.95221263959126,-5.716693065229501,-5.048102161156061,-0.5115578451508918,-7.441791073087954,-4.05909793895467,-2.1869328639364505,-4.383734734860056,-7.184200050591505,-8.171976571730493,-5.11279524076921,-8.468974374710054,-2.6023375883088717,-4.578968985824085,-3.7087543505273146,-4.014879262494484,-7.6946335749218235,-0.9111149480204905,-0.8640102851246323,-0.47834058774822275,-6.493609885923259,-6.889141617386077,-8.888599602343184,-1.828149417170648,-5.521291324517927,-4.459880507214589,-2.46130533279443,-9.965277449142711,-5.035988609119764,-3.6415626061628403,-9.351008059744625,-9.394236453531537,-6.366943670299738,-8.815015353707098,-9.890568413218526,-5.488327743595038,-4.494367354720006,-2.674363789447891,-2.359051814030464,-8.061881906998591,-9.286572686695436,-4.891440482870486,-0.9381959230362158,-5.0623157931421385,-9.961197037283856,-0.5357948575918425,-8.511647987479282,-0.11090469018981475,-5.823810599159991,-2.2808793982916,-8.855871727549394,-4.312636782814501,-0.969117454293229,-2.8025921984665936,-5.289662090764513,-5.242960142986314,-4.834357293913905,-4.465753358907783,-1.1764403808120472,-0.7930763413232045,-0.9856516893775069,-2.407510143776659,-4.229705088109603,-7.367329965156242,-1.499323939954682,-6.0530681082731075,-2.9165381284031278,-3.793027112959182,-8.80743247013885,-8.223743097857152,-3.7684046621925305,-8.677162744356613,-3.4332933809334865,-9.085653576820063,-6.673208107464008,-1.8770089489969166,-8.676438730985712,-3.7224089527761217,-5.054692342483829,-8.352134368773697,-9.54825912434166,-7.2782436485202044,-4.054046122174418,-5.6963918675005925,-0.24891427413413103,-3.476205127680574,-9.779111589729206,-5.634510563667137,-6.475458866530699,-6.4843598013299575,-4.892103857646271,-5.162671800053258,-1.4895362041335791,-4.090810424737388,-4.490740628561493,-7.744679706334074,-6.676079381119648,-6.173050851094777,-6.289598968137044,-6.736047887868491,-2.8719454802216804,-0.5696207071180237,-0.7147855510820444,-9.900147910435798,-1.7112574717376994,-8.038266429228415,-1.5524109633349759,-5.177434539140178,-7.263717416729691,-8.60083111105116,-4.8728528484294875,-4.847334264507747,-1.4859375364449723,-8.290785902210827,-8.13949044757803,-2.7288622059693335,-6.702099437084699,-2.96535933612484,-3.692068886572246,-7.812501996973824,-6.505081913011212,-1.098294775512616,-2.4992154531287247,-1.9762624060556133,-4.6717874755760995,-1.3058643367682854,-3.7193699979172057,-9.70595140043314,-8.128257345573328,-8.275708303437316,-0.40961994219554043,-6.612611360386598,-7.896868297467323,-1.2282308661488428,-4.882647815415442,-3.331131936672702,-0.8369462179030496,-2.761588157681336,-7.004729197490944,-8.656401006663794,-9.28780306954415,-9.843511522139972,-2.0362338227004995,-7.021916481895976,-8.89149988802224,-1.659076528730583,-6.511932275637237,-7.609140755638151,-4.501131544105803,-9.636363903123433,-9.569248415254407,-3.9022435717764603,-4.357495109215488,-5.254567952194018,-9.980670105979241,-6.000821075186192,-4.400526175161909,-7.809843089371031,-1.8809030034573437,-7.338394236957486,-9.508226896689496,-0.1598024051344482,-7.8541689837419675,-9.542313067784502,-1.6111588837774393,-7.86136702994879,-4.59041481594144,-5.721278547852508,-3.354099885771038,-2.3143269861121674,-9.366480807836162,-3.651515049831726,-0.046007210941605425,-7.942499160469909,-6.709136412096067,-3.210711180377317,-1.657410095270473,-4.340577107569244,-6.2555244326424875,-3.539133155090086,-8.40986760883945,-2.3309315059320057,-8.804163073179744,-7.012153230030933,-8.087600503773322,-7.812113140627499,-5.57039046643694,-9.615555258794169,-1.0071280168883234,-4.739693404576293,-1.725328554668244,-5.103817873116682,-0.7410197371590188,-9.689883406882032,-6.3268836844016345,-5.967605310598209,-4.646170759363494,-3.9066968145937264,-8.986558489632316,-5.469067739962656,-6.7184527509053975,-0.052109273718174975,-1.0717724171774523,-0.21946668165649275,-4.425095822503636,-0.7385145877570398,-2.381949210579015,-4.214807726430347,-9.067615620603767,-7.53656876486243,-5.417374392860827,-7.921602957875882,-6.648028706537956,-6.169149077151015,-5.8474129934010115,-5.250459726460354,-4.012890895842965,-4.613784486672814,-8.269815265331243,-6.838029338299307,-0.40104033051234556,-7.113734273014398,-1.211165849907736,-2.3652509885957085,-7.867563823491388,-1.887071864083496,-6.0056091892016195,-0.08133688552851792,-0.4787571439362681,-0.9023956278702583,-8.2253612789393,-9.72098318151875,-4.38959560994411,-4.363767390444686,-8.53476260012507,-9.549243918510001,-1.9327491219091786,-5.1014293375315045,-3.8512258059560067,-3.274743000597582,-2.042844241041224,-1.3514620959632029,-2.3614146713827955,-0.3718710667054781,-7.294797070046359,-9.344671194495328,-4.227212243384855,-2.622854750026351,-4.115661402324406,-4.9644422411426685,-0.07318675682295828,-3.1405915186784927,-9.854010246153106,-2.024622258200355,-0.19206100032619133,-3.8721162011693666,-2.489236578441323,-0.08286352728854363,-1.734110576720882,-9.998553232027511,-5.742990819354434,-6.350368833253734,-5.485832960190445,-6.311337109492414,-8.848923461842128,-5.489207885846,-0.40256984777532256,-2.193187727829673,-0.6425660827538104,-2.9275366955725657,-4.852198215435881,-7.970854422456997,-9.861914162543073,-5.535976216975613,-2.635164689986369,-2.270317654191496,-0.8551730591270501,-5.917399549450306,-9.459027623976525,-1.7057725431430404,-5.864560990562804,-2.1438369563494764,-4.839437375670981,-6.328016635334657,-9.007758370243653,-9.281221089711549,-8.587991134850352,-8.13485578340476,-4.869686572125628,-0.8699990015443926,-0.8596178076579108,-4.91357160677299,-4.286645082120286,-8.790916339658999,-1.2934841032401123,-7.432111529881745,-9.897341689982465,-8.921962987130339,-9.117221555726012,-4.780012469957717,-4.584400042559413,-3.873183842778294,-2.7225084825370094,-4.85092314049046,-7.851639134088828,-5.636112295629312,-8.833815683598697,-6.54263279142397,-6.313851527828353,-9.36505036699735,-5.633684370600555,-4.128481043752082,-0.7455784042643465,-2.9966428854679195,-2.158923245054223,-3.0161964760260496,-1.250148923853991,-7.193750335321414,-2.8777336958800848,-4.763822174095895,-5.777057477599863,-5.503103554851307,-6.617528801154218,-6.605607909454849,-9.759045854402457,-1.1669491737434856,-5.063458150838214,-6.807103133696835,-6.778288295039481,-6.503682323707416,-5.2918287497728755,-2.484809737877367,-9.900962078961253,-1.1995141488755068,-4.719025128224201,-1.122785263686339,-7.524903807969183,-4.325545734768584,-2.914758105922881,-2.0280351600511715,-8.733761524031255,-1.6343706011545023,-4.582750858069746,-9.67714332366145,-8.030292768253194,-6.91464393981104,-6.724245710414774,-1.6443122960360812,-0.7082136891686663,-0.867110976243104,-9.968129688420335,-5.478342477438369,-4.437858917289576,-9.57669623592633,-5.201264790979274,-7.976272639167286,-8.820680624490041,-5.767614830441352,-7.533164764975664,-9.487435493273805,-5.610453082917683,-2.206340563582878,-0.554869301370744,-5.887228507064397,-2.9125020395145262,-0.8564377383098654,-0.37669598958971484,-7.589662505706778,-3.8650885337538354,-4.762453215674178,-2.2414987989432977,-8.442401538170774,-8.00316470266747,-7.570451939048095,-0.8318302282443457,-2.439399554402686,-5.746825540891988,-9.46996388717,-9.204865911154382,-4.760474673405679,-5.5940868679760225,-8.393034711652042,-2.189897257246174,-1.5616926321881741,-3.616769620842901,-7.201415642544924,-0.2916996282281836,-3.911995858379327,-9.998819433141946,-6.0413921760255125,-7.750770833896827,-1.1418957185235046,-4.574371200584224,-7.901149413901578,-2.286947468154148,-9.155021900987173,-3.7723487813870515,-1.2655414405014387,-7.673818314793596,-5.470604149310956,-7.244971519109842,-5.79325168195939,-4.214675775561771,-8.855274609238954,-7.580569543258877,-4.8373499061775505,-9.69730940484694,-1.920570631725702,-3.809962283566539,-1.406319078813003,-4.731133484203571,-8.343060313262917,-2.4697298601719675,-8.447959915826308,-8.63623469867152,-4.434582243007199,-3.7579687425085306,-1.0289909569532552,-6.029499981726374,-6.549174753294624,-6.514980849104255,-7.245923236194846,-0.9880159585454162,-7.013811002657977,-9.894359381061781,-1.1371201155263244,-5.221420334949576,-8.539015117323519,-1.5883487445061206,-1.607521478817986,-2.384124186678893,-2.928894486736051,-3.8808202499131683,-8.334354734180568,-2.6066556098709492,-7.575141868063979,-4.451360857304061,-2.410968006586185,-9.537770377286721,-8.461253155971661,-0.5630050204479864,-1.6590221285145623,-1.2232725828758073,-5.854230693065561,-7.046686329960334,-6.9984914085897865,-6.457803285991021,-0.11083149740456877,-6.729334996098661,-0.17767430772410053,-5.613410646887312,-9.82771397366732,-2.426812551596289,-9.987828441073493,-3.0058253756242714,-6.655100111566652,-0.18994095999924188,-9.973189734642386,-6.624422892056121,-9.705409886338172,-3.9826374717210156,-0.292504388793815,-1.2371867399863756,-0.29092820953933174,-8.411136342885094,-9.963620540807803,-7.703464841664105,-2.5564103174164887,-9.643868011929808,-2.234345536990079,-2.29231026755895,-0.2756285533842706,-3.6170862143606852,-9.218882049557894,-2.0595621948697773,-9.16684110471018,-3.3342173998432756,-4.224854484331648,-5.278229965094637,-2.93862534276214,-3.6509136958975352,-9.59940811581677,-7.264448471257962,-8.722391533944345,-3.6372651290193136,-3.271396296309852,-7.432394759065719,-6.236370254468733,-6.171585515064358,-9.765559238060773,-7.78284893301749,-8.429356845711604,-2.1424311091311665,-5.958647301432423,-0.030273348793872223,-8.18105474539627,-0.2503066085037653,-4.969983200688876,-7.776288005003167,-3.1342396793584504,-9.773461812179644,-1.456148689039638,-0.5319078131272748,-6.635872450419673,-3.3709059992115797,-5.027383025080699,-1.2004706430253642,-3.789512243723374,-1.7141954973652518,-6.774246762363427,-0.9412126050114744,-6.545231811234668,-8.348641368297374,-5.649955123423931,-1.8409338106681505,-2.0981896199716643,-3.614817038575775,-2.4886938650644397,-3.7143269131211665,-5.682734156931217,-8.659069284124051,-9.387346608161693,-3.743409685260415,-6.135272671971297,-0.4079847762988775,-9.298743541575583,-3.833058834087457,-6.1369761633389,-1.2693441757025492,-9.307180495218564,-0.29867626095257505,-7.202578508682771,-9.027991423450676,-1.1279926806588692,-0.9985803302411056,-0.007973656775337457,-1.799204322565049,-6.006542126004495,-8.27316121048359,-4.430736589835458,-4.143297251248875,-0.5892229491025391,-7.002659513362226,-4.04365542778971,-5.283346267397633,-8.581275001110528,-2.0835927796383014,-8.742805153057716,-3.53808613396839,-0.967138715548943,-2.297156121934243,-4.768169633797392,-4.734857460203932,-3.5118973038763235,-0.7045119940662325,-2.934512938874061,-7.4902434644178895,-1.4049509463812515,-1.8611563191348157,-7.301095326353979,-1.7534080969388133,-6.275152445496719,-7.939161116029185,-8.583828840097267,-5.283350310584185,-8.435513119264312,-2.8019268290089583,-4.029118134583614,-4.146768847529538,-4.338903098705044,-9.745240033288308,-6.576817546514812,-5.373162728682114,-0.1419129912555528,-2.259408538019838,-7.958478136005893,-7.576277192409129,-7.933865861828247,-7.314776181191373,-8.169488189934595,-5.420867800889728,-0.7673242467162322,-3.915100398770115,-9.061113637248043,-9.396411159208666,-7.224878437991404,-5.026856268707947,-2.497087496143313,-3.40567431959101,-7.20681080991846,-0.5079171130376325,-0.002655507741537999,-8.614093813699162,-6.414198351770343,-5.533628046833414,-9.452543727669804,-4.531670210109113,-5.411129872992396,-1.0618026211059672,-0.15953860114504392,-2.5032098145484083,-4.790452356127,-1.1158800864549767,-6.334266445212647,-9.319110489580567,-3.502970965175103,-8.779657060867956,-7.432601191485952,-0.012720488685249443,-9.062783643550866,-4.2139791984803505,-4.099820277077264,-3.5413237616996773,-8.756964401485687,-3.2807839196390653,-8.280334544223578,-5.142280272831849,-0.648439542814716,-3.8534596335342197,-3.245644123606233,-3.996445856650561,-4.474483659229957,-8.354288889321902,-8.643060545800838,-5.052905537127101,-8.614626313652874,-0.7158759619531252,-3.453440223301032,-0.028300796398357253,-8.750217673970972,-4.733607973980192,-0.5899145033290387,-5.128223904094719,-0.2558862280041563,-0.37051667000236765,-2.2652291481262465,-1.0965499958522917,-4.980464428864142,-4.171116063985982,-0.1322202976828546,-7.22850997270317,-3.8222398236345523,-8.10219130641669,-4.237722392577792,-3.2704745087047016,-2.781169295210224,-1.319652429126259,-0.2820147263380268,-3.753386037470785,-8.141982813011133,-6.007362728279153,-5.746781787896973,-4.700292987053412,-4.139710699387371,-6.159992605599623,-4.200671478896895],"beta":[4.168088768654177,2.018005353973501,4.927594119173139,2.1060632285272964,2.6031612773678536,0.6456743795148878,1.0072113735330745,2.0525441455590276,4.588032602965618,4.154887887913711,0.8741258806762298,2.3518910108430866,3.5770194611769455,1.0935296870931133,1.1634443264147587,0.5327630001809114,0.04018548622156004,1.8515547810620814,1.4646274277060234,4.208555096218295,4.691960290453384,2.4219214393727895,4.631563967150654,0.44997660597688505,2.756628233952986,0.1374587520145676,4.230407683546562,4.271545157140205,2.357706616125974,2.459657597387751,0.25219067717874744,1.7643116837337336,0.9586198670528456,3.836247642156886,0.39260849577035795,4.777465625785018,2.443260705563458,0.7992985294697885,3.7919210123939804,1.4445896220628696,3.751682421510224,0.6833017343425163,2.5560138448084455,0.7615603149676975,4.471610089344087,1.2209349982586537,2.141946533978646,0.14022626195383192,4.154400938118956,1.1677709208234,4.153768225884634,3.9569990260248877,2.972539092980231,4.874240016156406,2.1480037224886073,1.2939043744729795,2.6330808528636274,2.7302994044079165,1.2579980316661055,3.297844497057165,4.2032435029407464,1.4227874889093783,0.20211816185388365,4.4951763925576085,1.1158918752447744,4.777734039480964,2.8475326197491277,2.973177621986082,4.760034099484141,0.16170097855789933,2.6615822621068808,2.29168558745139,0.7467029488253618,4.937811979817606,2.697545269595887,4.540933398229062,2.051868637569533,3.0676696326561794,3.036545412565843,2.113709176189531,2.233041489894049,1.2957047932659826,4.837841207146526,3.164997933720659,3.103554375923806,2.281543257977079,1.427331394588922,4.424244047739547,1.5662547733843035,0.19925903842929804,1.2010037067373303,1.3144332485923904,2.1223292196593935,0.5494812845801134,2.4610921173816322,1.8628997122656188,2.498364918643846,1.8833091370992727,1.3480190090238842,1.3863299325701284,3.808276467270292,1.2450523244767375,0.6104088190330503,0.3381839815593435,2.286948370345223,0.7093917605985134,4.915104424502097,2.2419653875601897,0.39023859384365034,1.0973947799946526,4.740648264884193,0.49195638659456864,3.7373638565274936,3.425748992953733,4.592204052310106,3.4772596230270745,1.180821534478086,3.6582501153512914,3.7801810265111646,3.2684576583097193,2.8222059821376524,0.37778825475055844,0.4748890119240001,1.8433502956033299,1.651830772644689,3.5132202379264674,3.461846282406756,2.0859995981458948,2.373653552786399,2.009970592080262,4.393624857502617,1.5944844631736887,0.24366516851907938,4.8244281019223845,2.6873984453652797,2.0135321599046896,3.1383473006651275,2.2001018232576683,1.6031705136174323,2.748973532767657,0.21797396999358676,1.5158274111617087,4.200923466882981,4.962798452916102,2.5887952122024585,4.265555349751917,1.3313155833938883,4.3659928740994856,0.41034388845801795,1.6343383193771754,4.478778556151754,3.6916177883912447,2.291008961966452,1.680562042764825,1.9735613438931099,2.4104476288095835,2.492831963290497,1.1805915022140667,1.3839649886905392,2.4870496657007104,1.0895437783521467,2.098511616111731,3.9718705245881547,0.45462718806932645,0.6222195392125429,1.9386624982116019,4.99324988851469,0.020210280564132432,1.3827492315333656,0.09800313924486215,0.05978074742830408,2.6258986820410266,4.402229005962256,1.7406273087477953,2.4082514971662916,2.309044832090846,3.5009332738663943,4.216975432250534,1.0180170732508653,2.3603041674868805,2.4125248314729153,4.9205609652792095,4.473621086415346,2.5065926388581827,1.0216734247815074,3.146348526665249,3.5358696261919564,1.1466077983765344,1.4447204767381694,4.232463556825642,1.864421658111436,0.18920990153611927,0.0649308607400001,4.480123214529045,1.7028907427408024,2.9493045443417065,1.8452448241318287,0.015482561968793718,3.0549930563282803,4.8211200958844,4.858969942566519,3.3371055162582497,1.2403852020560346,0.5260895160050827,3.639165307175353,3.4333547366310957,1.471607372108461,0.41893701479564505,0.6689738669795853,0.5530784462872829,2.169033016031227,1.4551421891478356,2.3208413732706035,2.054464805492672,4.476542623544935,1.9387881089656722,0.9835410799685373,4.169343521422616,1.1142285165889276,4.038100933313489,1.0904150885388098,4.274149474419789,3.7739608446114206,1.5364384419667176,0.5797621963663624,2.509421715433484,0.8248622062766731,1.8631721051835093,4.841138684121791,3.2534249683112515,4.158242432780465,3.088707399305811,3.4610895234265193,2.890214235482267,2.991263306745661,2.778723762500234,0.6244522000734853,2.999329541725789,0.018921585052384948,3.969791823198676,2.199661622141198,3.884679411106747,0.9910401599848251,2.6646579468269795,2.5681763219101716,3.395810499016816,4.039011783458615,0.1511905893648524,4.210469085530825,4.062055876201644,1.6269127753655177,2.731077568400475,1.8137931981528976,4.409845920403333,0.018041469228760043,3.7017203858654577,2.599600793887232,0.37786060819753997,2.9098227920392796,2.0770716936409284,3.490178271675257,0.982525416239417,3.367188815119663,2.153214385104538,3.9189935276406676,1.0156452786704484,4.6648796628641165,4.4509458485457785,0.2660435303498565,4.540483318753087,3.461410737490802,2.627546096839927,2.477949776462438,0.4262877605415827,1.7194965998532397,3.4082996960412215,0.1853715151749713,0.0651552385219778,2.7693068333293502,4.659206591825697,2.5103978238347677,2.2743865527739313,4.7967522782864345,2.8032779679218134,3.7079160822986967,2.0764053711612296,3.750524574325973,3.7974901902880607,0.06335166667106762,2.7193070025183506,0.3409650044032231,0.5448947019797001,4.608863735501525,3.061031650963014,4.768679071083416,1.72671366382668,2.87696466707834,1.401777359253823,2.656634799427535,2.9659828048718486,4.8362366435012785,3.417130612656447,4.610273718446423,1.8498693937002841,2.6332397092819546,4.85855497471937,2.575211532692403,0.6152352117365933,3.687427249503342,1.3805071822233117,1.268704114010415,4.666584295598283,3.9687933782876286,4.3969556451407215,3.6792941617677988,3.6852841465434105,4.717029199972682,1.0725674760572068,2.548903335136573,2.2246755710118347,3.7164102827550427,2.9432117180084316,4.3699585094445155,0.7225986777564086,3.1403044281886485,1.4986639947560754,1.9323750130320383,1.4219262353537032,3.9477870812874185,2.823002205762891,4.734698282406624,0.28423749246119123,2.3904088880762,3.0579187928971194,1.4344214467427185,1.8984298525096077,0.6282247226239213,0.22131904371815336,4.945223139308979,1.9276939869391763,3.865859694387356,3.209816444667002,0.9350176403160781,1.0526703586139041,4.838830912199001,4.014595441943053,0.24177882588196864,1.0472951609809777,2.5066414247540547,1.639508171052454,3.613479476308974,0.222871690540265,4.015984170608897,2.795815356238852,1.1057971840493375,0.5695114646741495,3.939151535305184,2.879742607396203,4.081298302617133,2.914385224030007,2.2962589226398533,0.8819681330907492,4.936850536393479,4.984674773669571,2.735027119174702,0.7083453804911455,4.217254108190395,2.2072392223056756,1.669895530804637,4.412689829105934,3.10670449923622,1.141460411827795,4.4180032049464515,0.2741170280344529,0.5053214762146518,1.0686748071015406,2.56187490868244,1.364495090484097,4.766989936375356,3.732956093327955,0.9676716750300174,0.37053011336325214,0.16999675577636597,4.149298638741566,1.1635355017613658,2.2685279336986985,2.0313246737392667,4.809408612071526,1.3533612577825127,0.021213604365897254,2.8466601517575807,0.45649944202537873,0.07908256268245428,0.5754998344447149,3.258015954947655,0.13852736914914954,4.107097025894191,3.260059024112949,0.8824393972130373,0.5055448847734134,2.273533393053464,3.7805610362458886,0.16249922215503476,1.7042432146295228,2.0023631795955135,2.1687308534885643,1.0722838656287415,4.358949894577123,3.2002030646898127,4.491496010059576,4.495615816037497,1.6635982933108806,0.6871450926440859,4.958691908763795,1.2440594929918525,3.229283776041215,1.7200846485712584,0.14383245188331673,0.6739621710542387,4.399898212843616,4.7660007656504355,1.088495991498748,1.603597636899724,4.443941516578428,4.259203259658973,1.8011755474382274,3.6682252692473494,4.327437141191738,1.9927788707557847,4.396787402744932,1.0831981227833754,4.719435212127738,4.908850096803288,2.3461121555011735,1.0389654667258907,2.9360101540192085,1.2158710616020063,0.2098212341168293,2.740282367119086,1.2471432854220033,3.443356055275335,4.858988609595252,4.497304152978154,2.996825688782949,4.429145038583069,4.496605721320038,4.661618015657247,1.6287038018473532,2.0123533452619737,4.654707619242257,1.9334252400026886,4.01775071196713,1.7347050699842193,3.656929869742421,3.596374482894648,0.8974682573701909,1.2393999925635213,2.1262473098677317,4.230234799261522,1.0696260985465633,1.2171674302465196,2.095655550917038,2.2369259997919135,1.0240592981474528,2.558300213854716,3.805943630376838,2.8673494365770704,3.706500278388507,1.7703016055073317,4.5235400142335855,0.9739873110076647,1.1448478920012506,1.5841077103822787,2.4644114713499032,2.7819340445055554,1.8482112800211314,4.475183467879356,3.1802351749082334,2.309551984036732,4.078256256909051,0.633049304396307,2.9107914084170616,1.5858624771577456,4.9902229533385345,4.850918065928456,2.5183110580487176,2.280999811462988,0.2730019170569187,3.660714379157426,1.5180578374055043,3.039020011780323,1.7136072332543206,1.978216822667812,4.735685748140403,2.5330475195364244,3.3696557258789985,1.6150723719264115,3.523627362558935,3.6515911029943746,4.284604898105676,0.8789635864629164,3.2729076050922643,1.4141598861326177,3.0216265632817487,3.528110477682558,4.129268965088745,0.18849124931896055,2.544164922939226,2.608630220940694,4.213163266916558,0.42914902515365116,2.305684595550334,3.3251679298270598,3.336651837740204,0.8404850533680686,2.3514210726491127,1.485218465682716,2.7504835546815585,4.751503259923323,0.4349778362048162,1.1554513087235263,2.3986437384815193,1.6488753104651976,1.2385951780473958,3.6840245243119893,2.874908769786595,4.891992137392421,3.784303090991046,4.063564851761299,3.627849130289774,0.586289521725406,1.6221396143965505,3.3406006255960916,0.9519645435683288,2.179203838119881,4.823181428057594,0.6772813449091908,1.4270343467997149,1.5772851045282943,1.15810107842235,0.8025603302487738,3.544852155053415,4.523903520382936,1.5471526415885206,3.414604262071277,0.6788986034868172,4.803464309785021,0.3613054555342876,0.7812905675074067,2.763502389698891,0.250603170147371,4.604973013665433,1.7690476895452223,0.5376581586509677,0.4181383969935615,1.9860557000539791,1.327547143245773,1.8315902430615016,1.7625483176391354,1.7579616080038607,0.6509102292581348,1.1438582460769986,2.481955675301121,2.8815273797471477,1.8581547733810655,3.2252415532120313,3.4978670801071177,4.105795710213713,0.34233452776108564,1.4018858915326438,1.8421882965931635,4.577573888060641,4.75021462304361,0.8275347113575893,4.152339456717188,1.2443657082887938,4.586481543895138,0.8142115272713901,3.5951858828338,2.8231751666878004,3.9577181482403443,3.5313363145152312,0.8225346110652154,2.3221823128720622,4.331859421915832,4.376877794324873,2.7115269518065443,4.690295187289965,0.4524596374882661,0.411218285085192,4.740841931621883,4.550882218491844,2.872194287688857,0.7351820882006177,4.686882315401251,2.503891549199684,2.432607720717863,1.1186132712248709,3.2857831619146793,1.5687137472523593,0.538352113097379,1.7934641900444115,3.552275764054632,2.6103223274149467,2.084519486880627,0.9572146869289411,2.929746101067744,1.37912586954004,1.9442979160030405,0.12117977974448135,4.617948938104536,3.9469964021431734,1.3133270801138597,2.443918356964123,1.5132465867399103,0.5494574635658145,1.0852473011031805,1.330745704391365,0.11202826824231127,1.6770317425590031,4.2442297173658,0.7248185615598801,1.178770834101659,3.7222661532674084,3.224196536740098,1.2071193851236295,0.41106112076649715,0.6828216196530756,2.5074464717171274,2.7868832639147234,3.2196951221612524,2.439295856683068,2.0291160144437823,4.002912911025583,2.3973569552138265,0.24851215491189627,4.180251580880433,4.466995374921644,1.5731806856150055,3.1201250325482377,1.1980072176934453,0.7215090898765286,1.3978796984912323,0.6198271054524773,1.6310021947539677,0.3325355090410853,1.0886699996424187,4.235304923473925,4.527708889694683,4.952636679787955,4.805030115229391,2.1287659098947853,0.6275318722066059,1.7147503067837377,4.7777278900165445,2.2390496677521554,1.121387386593743,1.5555127044036843,2.4384469475328006,4.215244774777686,4.328716668793271,2.5432135910283815,0.0010934630868653095,4.33041135793132,4.039040111869641,0.2092300671634606,3.935968700250232,2.4930276357308667,2.146188540832158,4.093031173476744,0.40187385014918475,1.0521593798799933,1.8586645533261381,4.428995112885481,1.1212566091629306,4.661574061586129,3.740408991971683,3.095556521430521,0.42761267600412656,0.16021661000291343,0.9752280493042098,1.2396240907562683,2.425977719566842,3.2114508580130376,3.637005378398277,0.055767182561166084,2.7425800392852806,3.3909276669066624,2.290971511336796,2.81855530486867,2.5440207001462345,0.509954150879004,3.7492867715134603,3.573226119049421,1.0623692804396356,2.6826318188376352,2.436591828639042,3.400634222802459,3.268477064671588,3.3375516487570964,1.1132023675705693,1.1434600766844816,2.940566272751206,0.15790139964835248,4.097168741580149,4.920569805761757,4.810226429663488,4.620521868664237,4.645695152263284,0.026919769506789093,2.497810326554065,2.92279334658741,1.5623010225134282,1.6069725350767294,3.7938603683418917,1.3169732222264996,3.6491193630171126,1.8976835053637264,4.788545355581311,1.7195238708885863,3.9304494681684474,1.6008931238718394,1.7864233137929364,0.11071580088261257,2.4207586348406815,4.633342262459795,1.320446110002449,2.943424008747695,4.633745456771514,4.317436051868164,1.769604095524271,4.717233124638024,4.289773663954079,3.359210646721068,3.7556831526223613,2.4557278513742653,3.904592363814948,0.5198350626852855,1.0822602793678826,0.30482303359569474,4.352826660610907,4.267950336670024,3.0125316911858,2.7321829940649733,4.07468365557288,0.5442645288072745,4.317935949346578,3.4614863507692553,2.674471114236759,4.892154153204343,1.9899293742452884,4.822314218493934,4.9051521099901105,4.9533967772991705,0.7018425293897934,2.139181734462422,2.275339430429412,0.5525898451139988,2.304095691378901,0.5895890178760377,0.9647550144089689,0.7724462812008026,1.4210611704166831,4.221348224932758,1.5748905932952317,4.5784194630383945,4.5658033826591335,3.690104020218825,0.4674876301345898,3.844525959554985,4.3302015883872835,3.3012926741610826,0.6286272710479957,4.897858360324277,1.871455899624317,3.8595635101695014,4.69501432638681,2.3748342969413527,0.5948694190242798,0.39424921115994604,2.654877508290915,3.3816118971456,4.5839765789127505,2.299567067843724,2.952714381556408,2.348530881165476,2.2420945134937718,4.729746785679108,2.517571929111515,3.0549421145234747,0.8570995596825637,2.8995393597752726,2.952579600980126,0.18237795682396807,2.454198920366455,2.127111326333504,0.11876810660101933,0.31181841530222854,3.386831814891571,4.858728713835326,3.259509747757523,4.611780295918136,0.45925589914863396,3.091436095476725,1.934140039682003,0.33251102278431977,1.0399418100805402,1.6343319965684688,1.0546126755988028,3.6260513294598304,3.4481019249511435,2.13698068884117,3.8952620815448746,0.6168134813072312,0.666061931502645,0.31905900015500754,2.9749767068434174,2.003703107856083,2.3098654022683474,1.0484044547823335,0.3305143486460971,2.3414218735559498,4.641408028997471,3.5841526474415506,4.218246961306703,0.9936740207354777,1.1703800243232076,4.845647712268372,1.547938333348211,1.4699418535098552,1.432090051699516,0.28639528801993497,0.0010818177991722688,4.079814294596376,3.9211209066295027,1.2283891469428532,0.29215731387626787,1.9247098290741416,1.7533284506093305,0.5034438569375221,4.551446608515325,3.2050755930934893,0.5404932584322542,4.925652541533561,3.1653651197300037,0.5851711228445711,4.148437871771829,2.4752426424214438,4.4871619853891955,0.07419449474442175,2.3598442238687136,0.05663961757336633,4.559786969036636,1.4290127614988002,1.9011140046316788,1.2247279602067584,4.094438114866846,0.026678087669571582,0.40764176351200665,1.5716843401074898,3.925766722871847,4.3501803892383055,3.0588606577329926,1.3780692672774664,1.5974518260843695,2.9699728612757834,3.2089426360594473,2.4458967357318597,0.8579682499916585,0.6326118443314876,3.591549318970395,3.8998200770283944,2.3237645784037406,1.0750861009541202,3.5814434939574635,0.8239497665127282,3.0686893035896166,1.5389660751417578,4.074697496508054,1.6377584281858815,0.44678360415506324,3.219834119349172,0.34461578779773516,2.824882920188375,4.355849382672088,1.9732441926794675,0.0793502050385042,4.525111659442521,2.2484006359427813,4.8096113864697285,0.7972138170697451,0.922279276347725,4.316818329056886,4.556669709788226,3.3002437975408503,2.911266216670265,3.866595727261508,2.454881466086075,2.2644915953058256,1.373549132776225,1.6561966853932009,0.2190372882104885,4.930280277221609,0.22050827343411017,1.4248358863815869,0.2821056248311471,4.449971434330713,1.5458150878402643,4.602828254990792,2.910067477907176,2.9939439276613857,3.382178218494387,3.7818214811273663,0.20532741753607642,4.71726877937015,0.629082006090671,4.441260563166891,3.2352918063921576,2.0591217048906585,1.7876971695382005,0.13372006709731155,2.7098728736474564,3.7757652726599753,1.6703481260903297,2.156630073797264,4.225561390873124,1.0290017739283286,2.5837664046711217,1.7773932889344979,2.7982031291429967,0.5484369138216549,1.3693106461747873,3.644832376811139,4.308740414789938,0.9441795448554235,0.3863613890637341,0.1086480302386783,0.5352074472233725,4.949843298170685,2.012727433424012,2.890723806535319,0.8692310640286482,0.5578662842056148,1.6013419421239594,4.348246324679596,0.7071936664041123,3.965871290059453,0.5514118164292503,1.4911919264136397,1.4680655964655909,1.6040488372344008,3.1921559809863287,2.76037905350886,4.319513512300206,0.8748111918393309,3.27250088871361,4.910163806022043,2.4978042501245215,1.9519443514833734,3.372533079102804,2.183265242507834,4.9464360234319,3.1876222201943225,2.4141531435861117,4.335171419398255,0.42474594750600114,0.18642760061064245,0.47815706777132316,4.678900809179083,3.1684770730062484,1.1712333286534726,0.4689158941819904,3.9951688435280417,1.714869759416282,0.7804793164131629,4.951621650616788,3.012885449743866,2.9692975183509853,3.2388844622221002,4.66315783913883,1.8473928521914285,4.267983184114559,4.80029009644408,0.6148574166810983,3.496464291072555,4.210339694052894,2.2030501717215403,2.0555830995763866,3.6352465332825536,1.3543658333178832,1.5253686527513066,0.10179208742201351,3.2850546611754226,2.2397694475314003,0.6693669457435836,0.42480280474546217,2.3253937639336497,1.6363841386813027,3.4363856368199963,4.785899345796855]}

},{}],105:[function(require,module,exports){
module.exports={"expected":[-175367.02455859233,-261754.59323455856,-210510.329514871,-3.360846699354954e14,-5.531498730020086e77,-138.57045589240744,-13479.226013561678,-1.1397317556987693e9,-1.3850001685993738e16,-351.7293977449543,-5.21166220592174e9,-8.382233548978914e14,-166.75349893390992,-22455.16760711923,-2.307524672600592e15,-8665.301122122926,-167.37278597434945,-1.5600731779055187e8,-646.6733691401511,-916.4529757486943,-2969.0946537772334,-5376.800657573588,-22.199338757942314,-9.113729515065561e83,-32.994076991092285,-1.3750299803403816e9,-21.5246062460642,-2521.2856560830896,-5.179510320952926e13,-19309.27837103844,-102.23930411084554,-6199.39424908238,-43.62167715234264,-30411.711535081937,-29.304635759221245,-1.1879738884037567e10,-241.88501002913804,-260.27975501549196,-19281.682355458634,-2.208568496228019e42,-106.58026678264122,-32.97965602878365,-102.8126362784999,-179.95867291438074,-1555.5752615156505,-201.46646462868162,-3.305745963177887e6,-344549.29737596685,-280.26493783733247,-926.0756584723617,-2.0578393880306952e32,-183.13754349302712,-103.02209453554121,-132928.76690877127,-90.31048352300847,-1.383772305197381e11,-8393.883881452311,-631.8728636753497,-3.1344864750072725e22,-2669.7821264120366,-2169.4591698943213,-195.96340984382852,-1945.8778079758713,-312.6247972801043,-86.74647557310988,-3264.8854375238557,-1.117005021430227e7,-57.79047297880736,-5.227348445365617e81,-6.337349987507902e6,-14913.665904378322,-2.179258374416017e6,-144.2094698545113,-69.1922962084033,-5.186516928019243e24,-1.8066660869092522e30,-4078.212648006912,-121.40579603520749,-573.6090335387233,-47.728041017176814,-48.87508141319785,-380850.99428654485,-187901.7742435189,-2.3750009212179172e8,-625.3203451667035,-56.75338455458802,-88.11021920064597,-44.00552146669148,-35756.53000715621,-1.0840062412239726e15,-1.6161644048401822e11,-334716.28197725595,-2.52773372743274e15,-1418.7739183086505,-1.8106056788723626e9,-138.58939369932284,-433.0041844443245,-294042.43614427967,-2.8503641891093866e11,-2.594820077062774e9,-1.0707655655076108e23,-87.69242440931542,-1.9366298682627022e8,-1.4538005246007305e15,-103.60561857985931,-167.76180164517,-173.5760766225455,-59.16111537023939,-57.90798594790356,-3203.610475634046,-6.626088388258785e7,-4.7839825154358734e13,-813.6667919197881,-1.8233764088309534e9,-976.4200758766743,-2621.474552742198,-7.081484722157013e6,-876.8322395754379,-184.00843767205157,-2916.2329162664714,-462.45499551274787,-68.5628648060835,-15642.581119729217,-690.480449556295,-201.2051655383912,-37898.159292521304,-7.391091516837074e19,-20842.965481660784,-301.1604646961614,-245.50194943323478,-4142.007836055851,-132.082532365813,-76.72902797672852,-1419.7138257969445,-1342.1278042063827,-142.6110896333048,null,-360.52590929294627,-8.735080497149869e10,-19.911687699329235,-129456.49044756449,-228.61168097227977,-255.02675301865807,-18.956665738075284,-11510.963609012457,-11145.80231535473,-6.5786647990109436e7,-92.25133571071439,-1.518775084401303e8,-2.611540657829641e15,-1381.3931725663479,-1038.3850900473576,-4.468530414681878e12,-161.35349340834287,-126.54209543425695,-273630.8758382944,-993.5094575514893,-345336.1128988671,-9879.686823112892,-306.12262931634103,-1533.2428027418546,-1.9611961439487671e87,-1.03481093448627e31,-30366.533253939695,-529.6237621966399,-185.23388472539855,-638.7575801434763,-16.219809370524747,-1.4977182633961535e8,-6.401454386597602e7,-122.06638539861436,-21.493305592283477,-1126.0289207627939,-533.7955446336643,-170.34885418278964,-2.2214444845850018e36,-18631.510936782943,-8519.661906912388,-362.4581551950487,-28.257701798546243,-1766.9094025411705,-750255.9725618433,-423.7585668271328,-24436.039784256518,-6.819003908362215e6,-331.66597911126684,-1.6816402087483154e47,-6563.945976127036,-69.90649983063696,-270.60071352634134,-25677.37630373484,-4056.20286182077,-64120.16579692368,-1.6895669580154797e8,-396740.5885692649,-26.814829872348607,-304.19849299643266,-401.7965098784506,-5.583649143766025e58,-1.1801575119424376e6,-27.17942623767878,-1.1537385770887386e10,-1.7924317517369515e8,-784.014573512249,-212.65941630995604,-7285.0861768524155,-33.6137164741845,-654.5364958536111,-10339.091773270391,-17539.90514501389,-6.2310981598064205e22,-2.145427115162378e8,-79.47673976433623,-14131.92847890515,-2067.0165575627384,-5.579714445557926e6,-139.56294196997501,-65.42250414451497,-3233.625289813563,-17.744256010825204,-218.5041480822667,-6.848030655756019e7,-7.492658269517292e19,-1.3001940633122636e38,-16873.146015415732,-42.858607588626256,-275780.4552525149,-73.97050227622904,-214.98840798836065,-1.4756821178410944e7,-1.9906166950673636e6,-88.22366339333733,-1.0078897811510888e45,-8.712113462141695e9,-100.9337477267529,-164.9361959365376,-2048.99747553483,-139.30296001493335,-682.3013354541929,-2.0375254207837963e10,-452.92407291766943,-1.0179586456539857e121,-462.5954636518246,-603.3280231046843,-394.0998367539275,-56.46790244248535,-145353.73345979836,-329214.19817668875,-22.32190492028321,-1.2250450521089618e9,-71.18279703304985,-5.757464486248597e9,-1.3775468523717248e9,-2.1088086691525322e6,-223.8297055225113,-587900.2593483631,-2.6336234679967817e25,-314487.6167149763,-22.96624334898729,-3.484236706239315e7,-404.0986776792923,-3.309590263176149e119,-2.4431508453286412e16,-7.42603600480768e73,-447.6808694588116,-519.5596861155233,-33948.340908991755,-3283.556118372182,-14.78222052184216,-3.5201811583625083e18,-1373.5693822674868,-42.25129371482828,-1.663024321709297e7,-150.75631327950447,-587.5368805184877,-15095.64396409118,-61.4002101971867,-6.296631554554487e6,-186.85309517735385,-80.51729301259081,-108.15585285829167,-2618.876356249661,-2.1863916497771817e18,-830005.4228770094,-10832.24315809611,-90.57526713749812,-1.91630709724927e23,-7.351675642023197e6,-69.24480778411271,-1013.64306703262,-9383.06465190166,-1.0751789307134722e6,-4480.4929335771085,-487050.5254237843,-14369.689850923041,-1.0531906622423265e18,-132583.19645809152,-122.31143156893658,-366.97195272143244,-1615.0884808775922,-26.790803297439698,-4.020176432132808e6,-8862.10016990594,-2.8117001968327518e28,-70479.534297675,-446.21457034660216,-217420.61272556926,-4.390638927997561e28,-60.15408105410064,-32696.702915657952,-2.801771523454245e6,-208.47451391316145,-179.3963168940841,-1.300649136284313e10,-77.48343883506719,-74004.41137511234,-2.7146045317064106e8,-1.3443415072774645e37,-186.37555850673095,-8892.519099282796,-584.6133141715691,-227.1751039798655,-16.700241484332608,-97.99673921666745,-43.6933364809252,-84794.75320343002,-318.0059275997771,-1158.2897511476465,-6.825589301951712e6,-105.91368337211861,-1618.8450948123673,-88.42992290598535,-72.17671959555749,-3.1977981507130413e283,-1.9344815481034908e22,-242.5566309514725,-14327.48720109884,-5145.30555598067,-10623.601754318122,-15976.87162482486,-1.0428011171423192e17,-170.32297974934832,-1054.693875678459,-162.19431121597796,-29221.38507737397,-26868.17250873393,-122.47098722358525,-127.35938706620925,-1.1976008115698881e57,-48585.95221333535,-356.3306439385822,-4.1280465763331106e21,-238.1334661277718,-7.948028033606961e7,-5.994596679562174e62,-22.955096387624643,-4.510958830955323e13,-23.58746283178835,-67.00980849467547,-196.9009956412475,-11004.561205596392,-401.8056522281569,-80.15789251991026,-1.096071577176656e13,-5.324365854270557e87,-196.34049617788042,-1.8655124945332345e6,-1009.9007945967023,-65.59343035814051,-35.88032437759177,-56.38506760407251,-3.3020971324607544e10,-515.1896274536202,-56.220012683457355,-18.523778352931163,-3005.263974588524,-2.326742510884901e23,-2.59015152434045e10,-137.78263970829786,-2324.2596282606123,-6.119679513636157e6,-2.4962179997413697e9,-28988.163314651985,-448197.5107518833,-1.1409157759497596e8,-24.57529783804105,-23.65923149443857,-1400.7654030932601,-40.762385676877045,-3.1442260602259523e24,-1931.7124427398833,-4352.691604569493,-77633.34053442185,-62.96651238410419,-1929.5635735261844,-1.502774994251367e28,-393.46516012018577,-2.9388863068336886e8,-7.209534108060414e11,-747.9195400236158,-3.901373937064953e52,-48.85119859621514,-6086.91426557806,-6.357754143001239e7,-476.66443945495865,-7.265555225520448e28,-3.271411706233855e10,-123.35749911816144,-2.3285857312211185e31,-1.4402498650668948e20,-389.697515943148,-2870.221080616549,-1.2932558058977793e6,-26512.49291904688,-7391.927109830654,-99.2450007953019,-2445.2296066358545,-73.64073559435175,-62.08028716098515,-1.1407594798034348e6,-15126.019818848941,-309.4258279434741,-2.9406717574191808e23,-15.77829858735254,-1.741767384496626e6,-273.8006555596762,-1426.7675157738856,-101339.30945940487,-651.6898829691896,-626.0383368675597,-446.84243210011414,-4.944800099757418e8,-1.534930822417066e13,-354927.6644692254,-574.8640546800561,-12536.98408997081,-1.4571373931881061e6,-80.76441635784958,-202.25238722291448,-267.46576846910045,-7052.753881924309,-1084.4635635669342,-201.91550828888867,-949888.4654859751,-638.9613185979206,-48.461349607904566,-48.471768642113226,-2272.6182744898956,-54.46022510921197,-179.15268494633895,-15473.924576391737,-35.521371871047506,-1903.7012406719493,-3.174287239338071e11,-135.16512740089715,-568414.5797814213,-302790.7056010897,-2113.447379541755,-3.301050794508351e17,-689271.9342795137,-152.6091370539143,-5.336440444553733e11,-28.493387661035655,-1248.353880762986,-4362.884072554273,-103.06224655771075,-378.2711647483286,-51.903130455782794,-126.25754155947143,-28428.379858104276,-2786.6252642239274,-38482.252167458006,-78.41969014886867,-87.51700271304057,-1212.4392581801737,-4.929324012327512e31,-423.46751774160253,-1229.8828364354483,-8.995772730156196e6,-1.363971958321458e53,-11666.80684582026,-19713.950445220857,-738.660525522459,-112.02212246759714,-102.98626590213446,-55.14988994105866,-1981.8163183698562,-343.1290112975753,-183.93490149392943,-8421.731329431665,-3.077892933045157e25,-22.957274314680927,-6.7250791219173624e16,-1063.088313963138,-370.382625352677,-72155.68851999745,-226.3562775357596,-101.87089045875854,-12.828316981024823,-1242.851444662204,-14.90691038479426,-9219.00342403643,-47.40932048530003,-332.8621287992231,-3.3172811169507573e12,-3.605143571146235e22,-65.01359843799041,-1.9551975079774902e9,-4.346552718404617e14,-162.35808566438743,-1.7897774029531312e51,-9078.55783693445,-143.03347451784137,-93.01332462244336,-109.93131313373523,-4909.708799306138,-715704.8678594774,-2694.053789105398,-556.6258201077555,-45.95382747218895,-298.06245682084716,-7929.784512452621,-841.8905691247533,-3.2743704039325544e21,-6.414881601222619e6,-10856.222324684524,-51.24097858720847,-1092.652593916291,-69.88007266034035,-1830.0210601049866,-1449.304904873611,-1214.1804773163879,-664690.9403783741,-1.9401553477138693e9,-71.7533025255349,-22138.14732800904,-252.4019412840714,-1.769988475690731e17,-994.2700064694744,-343.85663936473077,-2551.9198862314597,-50967.08981211702,-3.9910299425711955e17,-80.85866542646285,-124.07574859469962,-306.0202473309719,-2.3785043250156836e12,-559.2451520805342,-5123.54156649994,-146.64160322423868,-1.6936155983826384e12,-251.6195643262547,-1346.559863189237,-296.7742945772391,-10696.436290193511,-3.57835371915449e7,-73550.6040835865,-22.941043011174877,-1.661550013951847e49,-5.538803358857247e6,-18845.750415865623,-45.1343724834563,-6.549666991957018e7,-163.0997161532669,-7.268356905554233e10,-144.07254435743323,-125.17830361001907,-104.09566410142544,-181.69925673673512,-22561.012854382145,-9.174809907358952e8,-276.8373189994616,-699.6151738037271,-245.47949651484808,-115.41686839367014,-822.2122627797701,-87757.01027543114,-100.89611649639892,-810.8834521450211,-3.9955036592518373e9,-996.1472207906387,-6.43355724748152e27,-102.71472953762427,-5662.157812433896,-5.0187149696706325e8,-134.48429730537922,-134.66135679148363,-9.341352461537065e18,-731563.7605308483,-3.278325407324905e46,-364.7351162512948,-72.15173305463297,-58.745788300775814,-4845.290821472194,-67.6444634491894,-149.02608526856048,-84909.27004850892,-129613.09997767348,-241.28629787994603,-1105.244689567604,-231.183452601249,-273.9411005487016,-3.058664948273512e132,-5212.707228000039,-4.312148377384551e6,-6.506891154428998e19,-114.11772958062916,-1.8539283620989064e56,-1653.666581913669,-3.57093101983417e6,-2.2849334292384604e8,-204568.9913068672,-2.332686723290902e7,-581.6962400667275,null,-1362.0709591334057,-672.9663495827135,-1.437906116232519e6,-8.0719189175962e13,-1765.7025438248743,-91125.47417422869,-1088.7667749551524,-3223.193385726322,-467.22085102082826,null,-34743.461985335736,-28.495844030061487,-19654.551369034714,-2199.294431728681,-19061.87504329838,-12204.646534412079,-125274.7948875389,-269.75324684041857,-2123.1409717521988,-25.507130863204942,-88.48800495460225,-269.7100836680881,-7091.075942170999,-9970.6049000287,-105.83800670486448,-18854.870546070502,-430949.30601216096,-5.309517637037504e13,-150.27362130597214,-5247.418967313621,-89.11856407464083,-83.6066736046108,-197.56631206281753,-9.243076564437025e14,-76.54884671481031,-1.4104142461883876e7,-43.51725094865115,-10714.779733887444,-382.9582065503508,-597.4574870196124,-1.8656159031617755e11,-1395.2424273955505,-5.007057556268275e9,-2.450229835263938e64,-2.3659490540288574e10,-828958.6611200141,-6762.602026708335,-747.8066514395914,-2.5127543420161963e6,-2298.7359720936415,-135.039476302102,-3.793098685692242e37,-1.231992555983739e7,-5.53171341080171e8,-1741.424263928609,-71.61069981187865,-269232.60960532795,-283343.2441855097,-5.8566717529945496e10,-37.06428244029253,-2.290087390208881e9,-534.8504062146643,-199.97921112673788,-4.302966083525407e6,-1808.646873907707,-51.793138584675226,-182.82282025525393,-103.9963352514562,-5.65274974568789e11,-33.4418086812381,-3.684505518508929e13,-2.4653399532963512e6,-171.58266071589483,-7.0905821573634725e6,-1.6250572836975284e16,-43469.228609908576,-493.99567128750755,-2.9259646459421423e111,-1662.9559021742255,-384.9064321475588,-309716.8637467027,-7780.447329619752,-452.87891817789324,-128.31777769326337,-1.863320053458026e32,-1089.4729594375876,-21.727413394780534,-5957.5002203620925,-267.1555050333469,-290.3102070803045,-5.773929642187728e6,-5.223587683604505e22,-3.887872863007449e6,-118.04488068257425,-25303.3962796694,-3750.549218045055,-101.86616225914872,-1967.7390791683006,-878.1360130676873,-6.442867008961747e12,-3118.680891860959,-741.8808668638006,-178.45074414283349,-325.457157879985,-182.70556476152822,-34.01342935939646,-85197.33133282202,-134.6865313096278,-287.6699396449602,-3375.3978284878694,-5169.494792383135,-62.716179518605514,-2.211493917465139e16,-9.090792962108527e37,-69.0092505882287,-228589.39212343257,-216.00797343110975,-94.90870082976636,-7687.039557378557,-137.7440942680464,-322.46959560779976,-141.64583221577,-203.40202600293537,-77.3701193589149,-314.07753798289707,-1418.8689726933937,-1.1975214682098196e10,-1.376855409373327e10,-33.91112567149405,-207.2836948855586,-148.72838135666365,-1.8028917673502806e17,-7.420167206786884e6,-18152.158397447318,-544.590929758357,-68.99304522591984,-1010.91262382024,-905789.9849821344,-3.4047950845862404e6,-222424.5388174749,-837.0357607145316,-64.13361640216388,-1614.1726455855417,-2.0987303875496542e74,-27411.931120228728,-98.1400461184257,-175.26762934237885,-11350.03852709403,-608.4309792163399,-4.410047311084529e17,-12.382185918513485,-195.7553775803955,-57466.95434897891,-49.030051292267565,-2.799242734544588e15,-6.012322055599217e77,-1.0431532246192114e6,-1.6224630638192156e6,-571.5569032881749,-151.67561736096658,-1407.2125409009955,-4.2900481734496098e9,-89.38695707401689,-142.78552796451208,-42.680278422717016,-5104.762540155029,-3350.2083500558438,-3.733415465820804e6,-4.932520514712335e6,-4.3628622659601316e7,-16644.168620136763,-3.346308511389619e36,-963.315228077995,-1.469305479290089e7,-29.699890282858153,-186.0230210273019,-15.462046297033961,-8458.281865537094,-3.9178958165976036e8,-9.08078933593321e22,-1.2050526898687902e35,-1434.233926420461,-2278.9149685117686,-121.01827130575543,-303.2191132410636,-6902.045961776093,-1.1776478498601208e11,-5.7724057067292025e6,-762423.0923538156,-2051.283271712876,-176.471668516746,-103.18179231200169,-4.724907586435602e11,-1327.6952689778689,-2962.5983908865483,-3.5474452416890936e11,-3422.6888292433464,-188.63809966731716,-9.955979605916976,-36.33003748948641,-128699.9902489641,-321.8295481795651,-72.11321764238788,-1.7864165932793638e6,-157.53822631254022,-1.07823497689103e10,-955.2396440050189,-1340.4857023883546,-2.1341530837100022e6,-25.55826861195859,-10991.007770219803,-4286.249242884625,-60499.04317002161,-240.38951450164112,-2.833203070250937e6,-11847.080786158504,-116.18346902696763,-3522.630582735184,-71.48542734207128,-283.44453845042966,-2.492226015201922e14,-3.4136625809409546e27,-500.1093008683717,-654311.9033411015,-170976.3091040426,-39.60983424678962,-2.9050194134802795e6,-141.54379208225976,-415.8005580429945,-434.7706438903229,-612.2034571771574,-5.867678473769137e8,-1651.3863769130467,-58.94118947986596,-1327.9291193580793,-519.8730284081674,-1.2955674409258476e7,-43003.5702180284,-15429.106460829378,-597.2705935063954,-158.49090370733703,-227814.44023221332,-644.6198358841223,-808.2188175169644,-21714.638912619925,-98.98595583348748,-7103.1560771553,-2.2394612198481805e21,-3955.5158144680067,-8.94239461800122e6,-1.5511383794416663e57,-436.18621869396173,-75334.30202855516,-18582.997252123077,-294.2254302058468,-87.21780881903626,-1.0494129292138275e13,-50.413438862124565,-13790.461306746975,-1.313360892632498e7,-114.59785751939704,-2770.203106240227,-29391.92490189986,-1.6267648868216993e124,-279.0246279913585,-222.04435340797087,-1041.8594262621234,-7.652069796548411e8,-805766.77495277,-1193.0007987844137,-1028.2060010813852,-4.933551334166849e10,-15.599218011015504,-3520.900170941896,-237246.45739671958,-172.29317677958736,-5.510222873416108e6,-69.55321766757427,-8458.031136475922,-808.0764999070625,-2.516473346824438e15,-6.123877221642031e7,-8.805938300459235e86,-1011.919518124527,-1.190038931101654e6,-292.39732895900613,-143110.57266160016,-9428.667377935202,-149.38089787047517,-1.5964510158448029e9,-1.4873924702600214e11,-6.575383385899563e8,-346.57358603285746,-1.9374964174150344e7,-293684.25993646844,-157664.9054096282,-4.9404513913371224e16,-84.9777104905424,-58.795909865654664,-82.77552107958435,-35.282923855359805,-1435.3651616000755,-6.675536438347136e17,-70.8968446344017,-80595.906346447,-1.6802964252951005e6,-183.02540604101003,-2.8593872378288604e12,-24713.263705043897,-3.4202221921064377e10,-526.7491562983779,-6.412144254900203e6,-1.7149961749566249e24,-170.12475625029955,-24.884282993083243,-154.97125750678228,-7654.308424449353,-3.981239930430318e8,-46.10696647152778,-430.575093691454,-89.73872120427,-112.0296738200279,-2359.8928734796464,-1.4338277493272398e41,-1.4215948884055147e8,-40.39255128350017,-693.3724505596423,-51.89022987603205,-29.16907221062984,-1.942900315466013e7,-37.67808641900802,-51644.92006858487,-137.50732946175324,-239.5995844436917,-1.5142502165101125e14,-2.7944480617195472e7,-1700.0448797646757,-63.81277621000503,-37.03329770745877,-5876.249872401205,-71.4743152814862,-59.6588766644707,-2859.5217590381094,-73237.81084855748,-667.0350278805256,-1485.2924490098603,-58930.928436838454,-2.559116077935984e19,-4889.860537004474,-2.9437076275978787e6,-1.042062900810056e19,-48.742951078865616,-1.04416069139811e8,-4.565917859099491e7,-570.7623493477954,-4.5561313485113755e7,-2.5540670583712084e21,-12568.914812122863,-3.772350549791708e7,-479.3568611179274,-123.9310302239638,-118.97375301916857,-16.676753453098364,-1088.113395408584,-62.53411981690761,-74.98459632038292,-850.4317934236043,-56.94591429800715,-1211.5460332041298,-664.8786157749892,-1.195770505545359e9,-6.494032800222746e9,-201042.60379021493,-3.505625159824923e7,-195985.76867930603,-1.172511768624839e13,-285.97660284657616,-45.63259928745531,-860478.8232806583,-4760.383402141525,-163621.73970352422,-1.5873124532137817e8,-10867.679791778413,-44.54833503856726,-17990.170883881194],"x":[-16.575827047377445,-12.245277115850808,-18.633389802355648,-12.93654757046612,-17.590790833640334,-17.7105222348803,-19.56552280900891,-15.010402498902414,-19.144013526876957,-10.675463105788873,-19.83124406763944,-17.278524305595997,-12.73962785969562,-16.82029035783198,-19.187931656501807,-14.232608310127109,-16.994309428069126,-19.24502717756305,-12.340549151315694,-13.57010306321997,-19.27597346878351,-12.357054501717881,-10.648197373933375,-18.678175889074453,-10.610296252195187,-18.40862586020937,-12.733931055262293,-13.155112418803032,-17.94936280420544,-19.41597272966202,-11.313113716274131,-12.03377787612665,-12.390517396566747,-13.265005278522125,-13.207253287274835,-15.388965250675781,-12.058812474692393,-11.871513716945916,-19.653152888159877,-16.341551854626292,-15.496152524624733,-13.083814928855706,-12.83734256617649,-14.951435197934753,-19.282177727679773,-10.691617731150881,-18.984844947930437,-14.272027052900897,-10.374847736351462,-18.062362245320692,-12.709618193015867,-11.669225548967344,-14.339471985516353,-12.383568403144116,-18.827231308432527,-12.018071196361454,-14.723928140078302,-19.085991275403057,-15.23457706453124,-12.664100528476318,-17.65238591805607,-17.738136697950804,-18.76079347296072,-14.297393431376593,-10.735031187264479,-10.360262702086658,-12.413409861285011,-15.557446434859155,-17.572833454160936,-12.88493091135242,-11.179166835384326,-11.235224995552679,-17.392758872530706,-12.942241099504852,-17.98132399253537,-14.10135909928725,-16.1766469888692,-12.990273714327667,-17.138283718762622,-12.228419431133188,-16.22139620761213,-15.123735623844654,-11.450762333015785,-16.369464379207997,-13.469038415286699,-12.724317378707113,-11.447801602135703,-17.091618528889345,-10.08163566216393,-19.327406631137634,-16.39882683832311,-17.860949370949225,-15.443487912878187,-14.270868661454736,-16.347773254441616,-13.026449787763333,-19.855435001173024,-17.870276952400705,-19.28456154238994,-13.055397705355627,-10.54197945949966,-13.72418876278177,-14.536628148870738,-14.241409220806426,-18.442054377415534,-11.354210409718583,-19.73279709830115,-11.222523020566195,-14.052415407187958,-17.212073300457714,-16.856484641071436,-15.68606167709431,-13.912844927636732,-17.15383440775612,-19.969051120452566,-15.45305642967364,-15.375186122123353,-16.57361512756028,-14.789822899521369,-12.446908474652405,-11.255390424130386,-15.034064954972397,-18.87885524635277,-14.834607299988424,-19.382528858809046,-16.03730285816377,-12.912241337711736,-17.188825905898764,-14.832552879139154,-14.054605688096276,-14.200974547661811,-16.56806335374347,-15.481853978303217,-15.527786186038417,-17.304930263675267,-10.28587350756542,-15.493259348616045,-16.357584815146893,-17.005553447055544,-14.278383884929276,-18.993567490740514,-15.759666479721579,-15.54480249133272,-11.263273599144819,-15.624420544358879,-11.049091662382091,-19.083396614200446,-14.888942707420759,-10.862579808744854,-17.586825045881376,-11.262346235290616,-14.531884024759167,-18.707325736839493,-14.591249376020158,-14.56218382334788,-17.826704751804595,-11.508427387911063,-13.840076069760512,-17.83712403040824,-10.3233719629812,-15.357306073426706,-17.61457821018572,-10.19154832937658,-16.19353585252477,-10.982548556275546,-16.53330031883735,-16.742109656246754,-11.682145650346534,-17.952777226134916,-12.966019039224896,-19.403698034441092,-13.952947083639458,-10.892782157473025,-13.34162674745826,-10.924170211565249,-13.068149925963784,-11.290942539078818,-19.567738095594176,-14.945360944374988,-15.223704943002495,-16.634618239381712,-15.289762699947207,-11.793519131776865,-12.367911092469594,-16.57130626265556,-18.075349893559476,-16.540673124136138,-18.079460956102377,-14.1896748258058,-10.91564942052033,-15.721480447527224,-16.12934308274171,-18.297302222249286,-18.201263875040915,-18.239201940679028,-14.965779342028993,-16.718333817228995,-14.625825671227119,-15.526704487149415,-11.410916558155265,-14.106026882263054,-15.327927237487689,-13.46956860689911,-18.583524321414576,-11.352818902417196,-16.57298667349619,-15.869176276149389,-16.696496707860845,-12.209086081831185,-14.340301765301911,-19.338914028810567,-11.540638368279193,-10.213064771098093,-14.988992523760924,-15.574305596667791,-13.553551137744977,-17.422077265013176,-12.943115934331349,-10.39080117025403,-11.402553504296431,-13.109829705426444,-18.23694441407688,-16.92852935530808,-10.103485146613485,-15.644546748576946,-12.554454080423188,-12.260944022956533,-10.521729606262056,-14.819959729809334,-10.65412864759561,-14.025268547145123,-13.234017739313092,-15.553081060533811,-17.747374221433663,-19.08290625354401,-14.940522590684523,-14.432769420232107,-10.400018211503749,-14.188071928377958,-18.356364404119383,-12.818222551144569,-18.515616576140754,-11.047701179746223,-11.56267997709078,-16.52914221024026,-11.963419840725765,-14.068044779116473,-16.577109760310126,-13.887108399740328,-18.16807214122839,-10.574230354765417,-11.409851785400665,-14.190008642143193,-18.82568787069748,-16.404966298544675,-11.924257408240956,-13.539604732800889,-12.157540035283587,-11.215846243535754,-12.823522458154093,-18.00591660774518,-15.640432781188963,-12.760867812564367,-19.905506800595987,-12.280651442048589,-13.425318727205314,-14.776863039783745,-13.612634658569435,-12.422529769585797,-19.46954673935768,-17.6748816354701,-13.057305512012789,-10.337954722952922,-13.726884272392827,-18.983151343542218,-16.090441378632544,-10.024529707480806,-13.930672904401678,-13.584146389576253,-10.459213070667897,-11.935647030147676,-14.514617014483651,-12.644519044435247,-17.08337951738902,-17.319869952267553,-14.973219867739601,-18.798404254788213,-15.399087550601905,-15.728516176881126,-15.325909473046941,-16.83719087644436,-19.515620583186422,-11.51795928886914,-11.361860123560204,-10.204567770044942,-14.597910253419407,-19.443897988965336,-13.102073501416383,-10.291739103857742,-12.507465106016246,-12.703782654248313,-19.120827936439067,-11.19334162096002,-18.84514353766133,-12.564001454345458,-19.922191231376946,-19.53100599574237,-17.255775757767786,-13.33293664099842,-15.294989064546831,-19.656194974612752,-14.957549357892129,-13.698642728105646,-11.309170792077797,-15.660532608599047,-11.905154097433734,-19.7463154008757,-18.490617168054165,-18.562992597543868,-13.878430815880414,-10.94795963034263,-17.502666551946596,-13.135801732119393,-19.756195995820065,-11.46962805133513,-15.470993114998564,-11.626431864388486,-18.49957944644997,-16.565945043199207,-12.865831757896897,-15.744520580682815,-14.353473752230968,-13.058116376871071,-16.890323094369258,-15.081738744790403,-14.23745365537064,-16.772959149529278,-17.10842335819999,-19.76479996977912,-11.432747793269984,-18.70084035008058,-17.227823436941833,-18.47125387481875,-11.414525244104821,-15.677010519832589,-19.930109511169807,-19.801593861467367,-11.892985102007268,-10.119380570323788,-15.275399305366742,-11.67082382841732,-10.906885976931239,-11.727476762784006,-16.97307371930018,-13.34525988661099,-13.146985206382292,-15.395546135125308,-12.89903624030437,-13.365232601737189,-14.910193745169494,-18.166290190403522,-13.187817834608314,-12.461588347075459,-15.245374268576233,-17.41782204269625,-19.91905667495239,-16.886010626573587,-17.073128669954098,-12.822685900404629,-10.667719157319546,-18.993009327324593,-10.185340375171068,-19.38514001398036,-14.677087903367452,-12.759922921292029,-15.117496070136152,-13.724576643517384,-11.094828209460179,-14.600277734032312,-10.501669848708373,-18.489163428114757,-18.421649008746083,-19.133177883740252,-17.814720125022408,-17.329589812540643,-10.820602080277421,-11.29983040065428,-17.434334872526563,-11.201022502470419,-18.96723441466462,-18.992586381665195,-14.800099413875573,-16.671584534988078,-15.531743279193256,-13.706652073687879,-18.60934308184746,-17.998592212998112,-16.479404498693363,-11.649132321738252,-13.256860153802547,-14.787423787878836,-10.299524023757485,-15.710502038528379,-15.0047529181706,-19.643113623509006,-12.27246468937829,-14.949670267177641,-16.235222089907,-15.507151916696099,-16.187616222464644,-10.188102193493505,-18.844027023684255,-18.234467607738146,-10.146154429434873,-19.73667221571191,-14.567527336680442,-17.181972651497723,-15.594328820482183,-10.955600830105316,-13.971770847301512,-18.7040131171231,-10.428111933841116,-19.56819284965708,-11.36917892793424,-13.295347397845012,-18.647986473691944,-18.620385395746187,-10.951779441617207,-14.603720498371882,-19.67925186432817,-12.847771119739757,-13.810367252590511,-14.393446934090177,-19.76450537350996,-15.631934208394075,-18.321650274220186,-13.827445131235699,-15.383350284364681,-16.880474073233923,-19.812748833705832,-14.217779467237255,-16.76445642289105,-12.724932368633787,-10.758286674357143,-18.553528470957506,-10.402982666624723,-14.475839345858164,-17.13930847778536,-10.215584046420737,-19.29365291888429,-13.272360576666212,-15.576800980380996,-18.64941845345628,-11.769687262338614,-17.25276647531972,-14.406286362720852,-11.709609457938457,-18.003705701106984,-12.79204619269698,-14.884052965639015,-12.11050382968746,-12.45504846203609,-15.89433217814964,-11.683370692024216,-17.97819862330766,-13.961296166289994,-16.707796463952146,-11.993796350495213,-14.986919875911514,-13.253731230631129,-10.699773592186721,-13.08381925963354,-10.950300531596964,-15.994978498806269,-17.825194252497393,-14.754321828136225,-19.808721305254316,-15.16147399816266,-14.880797826566894,-18.518409673731053,-13.403053121965955,-13.872196566444057,-16.929790202366696,-13.319469764629927,-13.029008931565834,-12.940889287836832,-15.556773510598475,-13.893107966038823,-15.707322582344364,-14.50353350515297,-14.286498656386023,-11.33881275957503,-18.47056669613125,-10.001055609905436,-17.733811446181388,-11.204294794243271,-19.559399117321327,-15.78439567491571,-10.323674625725356,-12.362882323002415,-10.162090447989003,-11.360725076575855,-10.04680444938164,-14.727449487636699,-18.034719891515053,-17.61503793137536,-17.06127196956585,-16.459973180304722,-16.783278537916825,-11.692105617490629,-18.591392041688156,-15.072356286593395,-10.688875270013385,-15.060321607667221,-14.16039497164409,-17.64442516552397,-19.95240590954446,-15.2639284405146,-12.37936412751342,-14.575089580621402,-12.253246237549254,-17.858745520466293,-10.514067251792687,-15.046433420114822,-10.365259164437466,-19.765256917762603,-17.059941643896128,-19.88787209141885,-14.872075652101548,-10.741145591450415,-14.59957592717248,-14.426979963978898,-15.300272597341895,-10.205392575507169,-16.293437313096472,-13.57156264770584,-14.16058743762955,-11.160851017149048,-17.387733396606414,-11.879463224688635,-17.194731833146385,-14.173235166682831,-13.110762601047828,-17.021345632154375,-15.227789583751413,-16.724906226974852,-18.5957007225112,-17.878315753899848,-14.847038801644729,-18.89263759365399,-19.60539422098097,-13.434426468787388,-11.26122738754578,-19.414106245983906,-18.122073239582274,-14.950020065596284,-19.94428448664973,-11.549295579335206,-15.603142161402022,-19.20327470386524,-17.113015786320418,-13.869892395503268,-11.939362760335717,-19.46381378623563,-19.645186878708877,-14.026623977890056,-19.114190099461382,-15.396843661869967,-10.71888024144176,-17.144369365969883,-17.428500379489652,-17.056688710838397,-18.68523794686892,-19.720364918082808,-18.860722977873916,-17.846512427862418,-12.320278529067854,-10.440718958376717,-10.991100472227453,-14.094330828365697,-19.69867937588841,-18.8008019291473,-13.218557742830143,-16.695358364349755,-11.923677617868837,-16.667528210087003,-11.057516154947358,-10.93782484454919,-11.260753959736844,-13.776083169243948,-18.6809304048252,-14.016046790143104,-13.41973083634759,-17.964767475518208,-10.35467789250073,-10.298278887510833,-17.51679151766266,-18.970402358816102,-15.373785252378154,-17.664898782992797,-18.47159133567889,-13.688572512920969,-12.094911928172698,-16.972115403887685,-13.60643052933445,-11.397075898452973,-17.367887154504448,-13.219823510543652,-15.226942451299529,-15.430348234325226,-14.404042250984608,-15.082460848152193,-16.630912799085053,-11.611293866432986,-14.37213725914426,-11.778848554181756,-11.079648251705992,-18.834291818694805,-13.328729702522127,-19.49971675661157,-13.981648077984648,-16.632518479598907,-13.826599297543698,-14.122444134221844,-11.188503381773376,-17.966163027171092,-16.138709179384552,-14.27011809180122,-16.66171631593646,-12.300869624823953,-18.808592398894785,-17.20625853643571,-16.62965864931851,-15.498666320308654,-10.140628159194979,-18.319868331115593,-18.66042143382852,-11.246140822950167,-19.724995916287448,-18.1983059876917,-18.761967492801762,-19.508034555450703,-16.20538418100223,-11.790658444509436,-14.828876492571112,-14.168776083329016,-10.378696904573275,-12.623563092520481,-19.047729465704933,-11.686081134836519,-18.19582354735741,-10.029583622619251,-10.713468390511242,-11.546983360006902,-14.48047318043992,-14.768647273984474,-13.988876209564298,-12.508690189329425,-16.238992869185882,-12.8115216253743,-16.608262231442957,-11.377267858314863,-17.985317628353332,-13.120016583585556,-15.52975830167849,-13.974009756429549,-16.017361275782637,-14.333830130194233,-12.858980088783357,-14.18786628901602,-12.925475910203918,-18.38273476570804,-11.753513628283297,-10.536862000325712,-11.941232016693323,-14.885920144576012,-14.165437400650339,-12.312307680257984,-11.317792623376423,-14.32901066909719,-17.39265702524111,-10.918242227491824,-18.324371361430927,-17.209126036859573,-10.052970769903256,-14.523369940987163,-16.94110698857604,-15.78491545502586,-15.169657940293572,-13.76775901522527,-12.039858689825278,-16.533462368792506,-18.01497015735751,-13.70987175137455,-14.832643743403164,-12.4166915057401,-15.153581618556661,-12.016711667688496,-17.215743576137207,-19.534679837456007,-19.456473997293703,-12.85665108906864,-19.883233902534286,-18.866829410337417,-17.561176917396555,-13.666718663759635,-17.83745057918367,-13.36840434463151,-17.01074111535432,-16.188453362701612,-18.52810802118277,-14.785734293738164,-17.373443259457197,-10.995848081987896,-16.367785889242242,-17.54744891402926,-11.26815977020936,-10.99300060388477,-16.554781945831078,-13.647240072026733,-13.201517415287922,-18.901986799528313,-17.15549891479989,-15.061975309035148,-11.901764968625749,-16.01346463775201,-10.86162601163917,-13.258960154492076,-14.55328003240692,-17.936336770543903,-16.290015698628427,-11.941271569214367,-13.27596730400462,-11.80205010067474,-16.4705818750651,-16.056361651692985,-18.03133150120902,-19.394385497706352,-12.73861874582261,-19.022209611330844,-15.591092197034397,-17.40627369902083,-10.782964406175452,-13.904334477437226,-18.366343104275046,-12.976952850996215,-14.703997524945194,-14.916896783077098,-13.040308215727446,-10.725709716589824,-12.786043264456923,-18.95020041249303,-12.961163786295224,-19.016648274589254,-17.55183023876367,-14.86128377194936,-15.441231139945007,-17.203574759792794,-17.890503833361294,-18.94288119524468,-15.789584016904728,-16.51961178458054,-15.611325006192464,-10.01127830051475,-12.985629345877944,-10.034180846116808,-12.76808910605725,-17.26458443262041,-10.213149931286745,-12.422538452598337,-13.8775258606689,-16.49601127946536,-11.857446091391086,-15.873482145307207,-14.963826456002645,-14.880100867072017,-16.437856451913884,-16.955622460999624,-12.177774058393567,-15.301414205598006,-14.451190426994922,-19.180003824204494,-15.961805307168223,-15.488606054816483,-15.459133536406082,-15.392245243494958,-16.552089861314023,-11.216351898480152,-19.726050624352094,-13.536296644161215,-13.90257771653802,-12.799589791402806,-15.605361383169873,-11.540158657346609,-15.134685722036092,-13.05954815091688,-11.233689173739194,-17.074706817053038,-12.712371553675643,-15.225715693729766,-19.477848412862084,-13.745095710575699,-11.648397370654212,-10.092395925873323,-11.41102069596235,-17.195428498596787,-15.897312000680623,-11.661748781277442,-16.805158693508993,-15.573044344143252,-16.176666549669964,-10.45266370676152,-13.26426284124693,-10.97375501498908,-13.059556485114992,-16.662194816138385,-11.658375990278058,-14.045825003511762,-16.940774502332886,-14.731244989973371,-14.957315174477326,-12.340389297711722,-10.260398938625228,-13.335838610727755,-15.076566314864996,-15.555990965805504,-16.90543755231135,-10.3820280015887,-12.410793009815668,-16.206834369274873,-12.165075520143024,-12.734612577757593,-14.233178853798062,-14.916555529942212,-12.425252019430895,-10.5864560252508,-19.97605846704665,-15.265810951870453,-16.459346867345793,-11.284774335085913,-11.598545520602435,-16.16054596539879,-16.863975075804973,-10.077579734162686,-12.336730982300876,-19.842997859414556,-15.731568511849686,-15.57306187485683,-14.671063975643886,-19.708266625958824,-15.928319059267608,-16.91017085980383,-15.076678434853664,-18.567764491902487,-17.711671645126646,-14.764415552507595,-19.77167158918664,-17.493678558728234,-16.398485727165436,-13.967222870547655,-17.20029599309941,-19.161825050645376,-19.33658492474806,-10.234337977179502,-11.928220455269349,-13.972633134654568,-10.194638012263507,-19.93985949325601,-15.507657202807808,-18.672876698167453,-12.22281959038789,-19.97695379396987,-18.821752082921297,-14.222642312367368,-14.42614553888257,-14.018193932968133,-16.89261456971234,-17.002960265682347,-15.059146963960501,-19.25512191018158,-16.186350339480853,-17.34041677850612,-13.591885818598193,-19.938418328214212,-16.579570419219106,-11.703761316056065,-18.854463256954727,-11.04889448981938,-15.055070962538032,-13.650654199203798,-17.73698337200275,-17.570027294064165,-11.430476098807008,-13.281242336586969,-16.100888169639116,-17.80317618559718,-15.64630722848035,-18.162525678749912,-12.501981524950658,-14.068422891100651,-17.51091396071727,-11.00983060367416,-11.708829236927734,-13.686274515691183,-17.77199836633894,-16.4678673634921,-12.340974750398155,-11.74509926369877,-13.063542987818979,-15.216041557950959,-10.181082300799385,-15.323646388458931,-10.843497292757782,-11.847144179341138,-14.411128801746887,-13.112452419590252,-15.566961233641072,-10.874911697531743,-10.809614621305537,-18.932204346132814,-12.446547378522002,-18.27082418823524,-18.791063717253486,-10.919127976983313,-12.088853807666403,-12.947448994109244,-13.253088643586944,-15.45725798244665,-16.751599170052838,-13.421553226414993,-13.437573509225611,-17.757069408871313,-11.075317775348509,-12.797892165910929,-16.139286032506995,-12.564258659795783,-12.120283748980217,-10.834758516500838,-18.281632443416513,-12.329976637973099,-10.741212901051963,-14.35863930411098,-16.70119379289368,-15.452037363390614,-14.570251638964697,-13.97200235725074,-18.452449532947238,-17.845796252788045,-10.834013039971904,-12.62884522084043,-13.539095133454147,-10.291045853662064,-15.057172290250964,-10.18027399607232,-14.828184696021445,-10.846362642224932,-13.328201206391512,-19.413325455757196,-19.891576527831766,-12.597712732850198,-10.968772278296804,-17.126316240404854,-12.908842887031419,-15.694253838660593,-18.695486694419625,-16.307120560472747,-15.096285464225508,-18.15906833654643,-10.605490673161164,-17.129173193877918,-19.161375618590238,-17.622133823152414,-13.006026809436147,-15.901012233964774,-14.098688418760258,-17.362173956048668,-17.038352617796985,-12.360370638889988,-19.62741346195161,-11.309912997779612,-13.925534259057073,-15.87681151964668,-12.355813738122134,-15.134286354677878,-18.327919537194024,-13.181566405327356,-15.979913378779893,-12.90952285181272,-11.864030123935622,-18.438692517577046,-12.00518222239568,-16.09766217446768,-14.786162959253467,-15.14815680144097,-18.141170097378843,-12.87893491156768,-15.900538393526793,-17.41236998741094,-11.872070361917588,-12.95404604094964],"mu":[9.365402025691356,8.93172175728706,0.2869197203731666,6.042326230528503,2.7830717224393298,4.495163830916296,5.324583993911953,9.40667661623838,4.179364890050157,8.239088293050811,4.407349665343665,2.7695827918889404,5.484220672111344,6.398894057368678,5.979434889848281,4.699525157492959,5.644708941526515,0.8230146074637057,3.0835552830461244,8.15829923022973,9.92513371287256,5.854436453892955,2.620094576137584,6.005961680724696,7.135276231939067,9.181763014907695,1.0818810077483376,7.953267456973949,4.946430914427986,9.588325376033968,9.414245382114352,1.7225763085603796,4.173509332745525,9.661726837149676,3.463415388007147,0.5681239308349784,6.751977469637969,8.510755267424027,4.760546711689835,4.604470773931713,6.066632130593181,0.32361932403319305,3.2532150497260015,5.7759314627851825,1.4887831798340034,8.728889606411512,5.926766011507906,3.962954047061158,9.201620532438003,7.430562030805614,5.736650868759535,9.454826271244164,1.8616670886498121,6.0202925760013715,2.980150216731603,4.564010339386795,8.220156001284412,0.020502686417078753,8.788575698023969,6.8312822004276725,8.023835264650131,8.579700384162441,6.195409118272941,8.423648396375889,5.153326615284069,8.626923625062187,4.476661303573639,3.042680906123314,5.873711816607852,7.119821808392537,5.378041891376899,0.6057220725461687,7.433797639500144,0.10037854993722783,5.802668305530034,2.1329749518533303,6.982875652706841,4.835855183166114,8.93257605997036,1.2012752139410976,1.3808424648391182,5.810688469036842,5.783941875260508,9.485652349325624,5.650320935742423,6.030191390980171,5.344108832388226,0.19825915785760762,3.89623285433061,7.51311438098778,4.630791680913797,7.5993288108118096,2.5398737039232056,5.506589765780561,7.167230636891948,6.393440010134319,3.4326235393499505,6.39189580398237,4.911181492566334,6.381619145353374,5.793045971879412,0.0027541177867895783,0.8168777348839784,9.350843880810206,4.728139310653892,8.601327600898639,3.397648475269528,6.716672331591836,4.002033965855816,7.3045840562232245,4.213114918820424,6.485778885327013,5.490212096907832,7.46760532095241,7.972191328096985,6.95088876249862,5.296462084522384,8.946373477003913,8.470554861559243,2.1400660268517857,3.002422286376276,5.4684489649977035,9.030029361213117,6.861284679401301,1.6840870871599578,1.297355608512074,8.610944361124222,2.3101444328062537,7.932751357953405,6.308342127782893,9.44656927354617,2.358553606170155,6.205928735917876,8.843320022158759,7.033746564897616,2.068904697183853,9.508177985018625,9.03980768398036,6.67539985117501,0.9565833918645605,0.824069458883816,7.747822590816367,9.26169823649773,3.1063841001561343,4.649133235343806,4.886679075817053,2.6813258186443467,0.9611601293470562,8.722835062938689,3.602591646212172,5.3896343971446425,0.8124504616421824,6.731619890669897,6.372404280366175,8.82586344348653,7.8672167722491775,0.7111573186320097,0.5059016961734564,5.439263188700356,6.087984358212861,8.341776248106585,0.4113911347143495,0.12912127479807634,9.605137586143758,0.6937185028070458,0.35980911247405434,6.65135260244154,1.67492279896984,6.798213214469224,0.5118491619547383,3.769132301691771,1.1269422845452315,4.298142144334149,4.873619145958554,5.094731409146891,0.3864637487505651,1.7537328351100512,8.470131717380088,0.5302269209569266,0.5342648023470442,0.6879974141469436,7.9808352711954145,4.3299730391157665,4.688165931659061,4.612796932542331,7.66359905306116,8.183989703185944,4.934102510316929,5.507231832616348,4.031344596233472,6.4568029700734435,6.743889167146168,5.409503046846458,8.324090956078916,5.01823049366344,1.3938949034296932,7.254822336882731,6.2705364682468145,2.157002169915445,6.068445831875873,1.2193437306637023,4.320609311596522,7.537675694826396,0.7754679311152457,0.6804750114211555,1.8509211066119136,1.6370449303763257,5.276743375774402,9.870638935599523,8.06000166670252,7.685666685313153,4.58134776501436,5.066422161139377,8.754776190414649,1.8431982343276787,8.049024173877122,3.6740873525193862,5.993621258290607,9.17308652113347,2.439862656754901,7.538524169127454,1.171290948326431,8.113741543392074,2.131118552075364,5.042847226919451,3.711411205678783,1.7411281317798766,3.3576711375047408,3.9128500878899874,2.8709836946992784,6.6341741497791995,0.9269221238697201,3.8405890690206212,3.824729588724498,1.2262935769973593,6.446434385605446,8.746250622024066,1.8976876932286912,2.6199636207302124,5.157419458022357,7.517134402447667,8.990041700865293,9.084375372693334,0.8306846558070613,9.097344941935601,4.991653233366218,2.609091837587716,7.6247189052277475,0.30797530268797946,3.4000233704366156,9.681131063741022,7.610474862393335,8.678787944079211,7.168364943855634,5.649292168255111,9.162279745082486,6.371678955202391,6.629774963273363,3.991341545551943,1.3047828780390702,2.7787531421633016,4.608644941524944,7.1256234537931356,0.12512451831769855,3.294304539822206,9.998656880071726,3.147383859410622,2.7664276440980617,0.39327109880553435,2.4481480059952787,5.436639612092815,3.218058897428284,5.857252238320263,7.625919392611335,6.614781542741037,8.182069859985269,9.154800835138616,2.077205491865304,5.451022775560547,9.277269499276958,5.105316375014253,5.523120257122511,0.5437431829461459,6.296425983875611,6.174669899720202,7.1090803037349986,2.9885606272467347,5.036760522778905,5.057023376824647,2.2709458814610683,2.04300062832913,4.082129349726323,4.574527150090601,9.03167488153294,5.8942138001174875,7.502940761350121,7.574978793153743,1.5803507799008698,4.012170017991526,3.1092463541441573,2.343623353969071,2.8261849740563227,3.311105378879644,8.720958939241966,9.44444926558953,8.707281655263891,9.272930508322544,1.4796080481392226,2.9730944157331285,5.650414870485414,7.680935601763663,7.46897621886615,7.913410072252902,9.765444601076133,1.9541241361692396,3.1829418261988285,6.585258972361839,7.927367193180146,4.017574108199393,2.862480896292441,6.943655049208088,9.605407429207833,0.14617790965589572,1.5030912261400187,1.1391569029845483,4.12182177445974,6.387095459465774,0.7511129415141826,6.301864600232793,1.138863297277788,7.652218511471802,0.009102993432887896,6.6909119100209,4.51212956912876,1.0879417863125806,6.626166539261289,9.78200568646291,1.504146829361177,2.5646916456907,4.712315207230255,9.256957702284303,6.461490987927759,4.270705478921499,3.6452376722353397,7.360803802422002,1.6021305029289423,0.7053086745779713,1.7934611460868077,8.865447109286977,4.721237824698417,9.458166361852314,8.276334446004048,9.539912098746147,5.4527836152211595,0.6454504325685129,2.7991428325221634,9.187183885827315,1.6217100715142951,0.929251284263346,7.061315551811096,9.966831215517429,6.3750042378079685,6.194065874138466,6.6162000380798025,8.178084190639503,5.637293530742349,5.168983922126911,2.0761409258500962,8.122355028987617,5.251992841119952,0.5663281749719973,7.070400566494035,9.07725648499987,2.6184804442381004,0.7348390004711303,9.450685427346512,1.8898138345784377,0.31179756526100944,4.133476517020007,4.674621575460575,6.93087874365615,6.714332111044881,5.773513618240845,9.042943842382229,5.0742618979945835,0.7399678974338664,1.7383261817084228,5.880435334709906,0.9419641563199721,5.335632400549095,3.246646362438632,3.4932625546362672,6.63566411509774,3.216326073763982,1.3849657836495344,7.433166004253533,0.788432220472175,9.911962725679807,9.397657660427292,9.541156366165012,6.96629584546399,0.12155642131507882,2.0160214639050356,1.6754728845457234,8.398822563215717,7.314848034093712,7.537618997118837,4.686981342533563,7.430409722157039,3.5500176772165593,8.040511860333472,9.518236503992366,9.472252693329732,8.499009941932854,6.828898429158141,3.9209066351598065,7.2504743987819005,0.10611090016375613,3.841194832866286,8.669123885064396,5.2236177372799,4.5465832559318775,1.998788669436844,1.6925794193177457,6.021587259525008,2.2501912578100747,4.2617717932042565,9.977431043800971,6.16300986663449,1.6921024002149232,7.988365479543855,4.592610642693044,8.472361221097142,6.724181976066193,6.07998526377552,0.76098434439549,6.470198127330433,4.255850348824161,2.1922975875411654,7.269376136375625,7.649722845168185,6.0109014189324395,3.8490040146437465,9.243901471841927,3.9386577311877757,3.2021816568234507,4.914456225490895,8.541386599227074,5.860587294615032,6.117756146291424,3.6339810799770733,2.255681546565822,5.312329867277288,9.763531670783966,3.573510773593087,5.9760298827700575,8.798358724502096,3.567067498555443,8.349043364640387,1.2645027291448963,5.329488613158826,7.429986156963075,0.19100163409595527,5.85926878228991,2.577229917863937,7.4633519884461474,9.882238619439374,7.855102223578598,7.389143697167766,0.07174580907399752,9.587474469327331,2.1929299662943658,7.769383640570302,3.896371117737012,0.5616391053803094,9.668441214953475,0.964227090925911,6.370412263642395,0.6883647168170959,8.147549752148631,1.3907226869949851,3.6852509768946717,4.842258251677323,6.458328832230718,0.7921794849334551,3.815655004492575,0.05506571806732641,3.67983782892755,4.970119053491109,0.4725847504336711,7.197248331956336,4.495287711396876,5.682503791417282,5.404236163751685,3.9499897020232955,9.715735433751341,5.943586989153628,3.448047635310285,0.27448431645362703,9.239791357113738,2.4819187139664844,0.598966960321563,2.888757786515297,1.13023741818997,7.7934406706288595,5.489394381378223,2.1238241799775737,4.609216506405193,1.9220706131625054,9.364014104196956,7.16355236906163,9.417670054659563,3.9862451049871606,6.778034035734004,1.5570812648372456,3.9551729410694114,1.706891360122964,0.4634553960248122,8.484913676474267,1.1488979912091501,1.1507876717080134,1.2687506532696458,2.247932705446014,5.106462654647961,7.476783601108887,6.122956024801935,2.3494647274912195,5.2152668281807335,6.369304911465918,4.510620562400691,1.6516745183898607,2.6397386211248897,9.34691761365782,8.064609513785697,4.579548323291219,6.3070376565304525,1.0051529170070506,3.9333438447053815,7.740913857337208,5.30920852142331,2.443656071633047,9.372263974552105,6.214442930720184,5.10663774342026,6.1168068814791265,5.378319977144653,0.5467841003847251,0.39443204770083895,8.316375997577655,5.366531499890524,3.665529384237114,0.36008235841375136,4.205442580406604,7.317050680347064,2.0412274988366264,6.033997351761213,9.88071289266028,0.48488925966673424,1.0933838379581884,2.5750440297744936,5.950896696688989,2.413832848640247,1.780358185490325,2.223693080796696,4.2440124514366495,8.462151684903823,4.817103725017038,7.3235624295660395,9.881834057568536,8.24476436166277,9.115841615866344,8.154640033788308,0.6963649650323345,1.7948191952878623,1.8109484899841588,7.806157473728128,7.127789425499296,3.195851302652264,7.358771811476952,9.591389790605781,5.1744120600930765,5.747322064265095,1.8200840544669727,5.110501940607797,4.603264790303314,1.1787477457354845,2.349317588690789,8.303445202742099,5.336014353669023,1.327913233193414,9.557154819053192,1.9125576984249992,5.371859403092671,8.46258508906909,1.6087627582946196,2.459917497257882,9.81166562661048,3.7271587668513972,3.785241363882932,3.644139144626495,8.327719660828635,4.522082351906027,2.617577854759525,3.4228540079985414,8.887334643623838,3.4947706496325837,0.13584094283731307,9.219529425420118,1.296081213629099,8.80552942649522,5.657105137771117,5.118141079493119,1.6733975232408738,6.444088391937708,1.7528386828441755,9.705012442572569,2.489285804642447,8.934658048808142,8.986475727034096,9.836602067752462,1.1603107336029006,5.161325512919239,9.133750935496323,5.21414248184092,7.394171728813608,9.478920572993578,0.8629564260222566,6.888876654080958,7.288615604776103,7.492348733097689,3.6414716787591694,5.224794974521567,3.5723915491072566,3.690052757337363,4.523416216854217,3.4040861788601395,1.7070591234846177,8.412091259374733,6.233746702723524,0.43380817835488195,2.0380980049193753,7.463418119399387,1.9669028385635112,7.747982047461006,6.889548622214425,6.577887089655771,9.962529318915607,1.6087715817825865,2.826583602432915,2.8257935596904638,0.8663751130247888,4.834274648759129,8.747773717935285,2.827407509642177,2.250807792355123,5.732282125373032,8.660558126229777,6.704082154234506,0.3996150148351596,0.651793103366618,5.703119880856489,9.671361110353061,9.852888257301185,7.20834381693467,4.177567767193821,0.24548518632470762,1.4880068360359044,5.180299424861518,3.8288061556497643,3.176512129698408,6.480942996488645,8.875422990735512,4.125856200020643,7.619835181262484,5.0296493658823405,8.858248399849696,6.3911551542871425,4.191445787536951,4.643777768501889,1.1053586841906915,2.370954015324511,5.057761619160653,2.6693779148156938,2.8284476589431207,6.77548512842889,7.766744845693879,8.208404511298289,8.008146481131595,4.784222880071374,6.919141976904939,6.056747066043324,5.494350807783441,5.540507297907668,3.6947667081827285,3.7634507856016097,2.767587063475665,0.531687706077264,8.793335222930626,4.524334164313231,5.291851220761612,4.347005653273057,1.1111004230128896,8.518843940942533,5.992271827013969,0.11533436848681689,9.268254748155956,9.715601050399709,8.079418859384266,2.752820284632409,0.8047354943411555,8.578910331376537,6.371692112436551,8.565111590123045,3.0349951335936964,4.4647476552550085,9.943410684429573,5.619127372679817,4.334566767705372,9.198601017805672,9.009002372774672,2.0519989249428727,4.796038240702005,5.535113258312658,9.765101055293332,8.515032544931797,6.882283025364462,0.07648112129907236,5.677507435923108,6.490265483351836,3.3905363771830332,7.762887803763084,2.386499858413591,2.1430388823278546,2.637366652548354,1.7104534745795186,4.906310591939025,6.340116752126641,3.6192932963542135,7.540663430152852,0.572903457971381,4.488230431852108,0.5356423655323073,1.7458739767331877,3.2552362106346644,6.655303322152754,8.014652149090454,1.4898804960826473,8.157459911513827,9.441107593110951,7.020698704465276,2.6376134487519853,6.073190260134518,5.247255347671976,3.9087913784150397,5.473796001237526,9.106139256717219,4.730877054945526,7.6952831932401295,3.340078324278044,1.7063233715209236,1.4122918388153938,5.875245820822521,9.613455822062168,0.5812346834156501,9.260223170658799,1.843842455092215,8.87666844633269,4.43233108531969,5.9058580947538,3.765744790288057,7.585416906659324,6.112642423635515,3.241408450094716,1.5890273659248377,4.006252418870815,6.39173483428258,7.391956360749257,0.6328526266146262,7.302794092198375,1.924863590384871,8.75724757193542,4.205646064799897,9.227629192197817,5.905044284687748,4.368598104269821,7.167029412691703,2.7569725913113086,6.807566445263933,8.021940306850802,1.992209269770211,5.176515090811109,0.7968104199882475,5.919846550988552,4.914015105638441,6.8121166287889,8.203143033288756,0.4031001251269495,2.5352235539356305,7.041589976214075,1.894679708087177,8.110989615348846,2.3192206604985643,1.6872739977223872,9.070420224869991,1.5889416995824845,8.721377740782705,4.9493481570243025,8.508332723480539,9.154558371517448,8.66736999362379,4.187606919218981,8.961919043315419,0.704528707294747,0.1665807222101745,2.6561312735403897,1.7671290392032146,8.553496041218573,5.711858709957214,9.215423677056053,4.948587046564601,6.50976236029686,2.561850609475702,8.597210683412236,9.904027671436728,0.5166804258739188,1.8207031936141327,9.475516364153453,6.750711676902701,6.896302657800318,7.1072365684429695,8.003861704619604,4.999576945545399,8.921142390522947,4.298759552278499,3.1007962550553936,5.469768355073081,4.84401087952331,2.7224521632492094,4.681732091032941,7.712024578150056,6.556488750746887,7.570861533889827,6.364471481153384,8.905792848190611,6.364025860937918,8.515615432540331,9.191327266501379,4.810745650450013,5.076589025187646,4.664475178684131,1.0715999779420593,2.4153404217344265,8.954125582755427,8.50724684625489,7.944883266743082,7.860062522473061,5.519380748529463,4.041735718135473,7.515870885461435,7.187339797515586,0.8844996433779628,9.098468759568384,9.360625964091946,4.431791578173769,7.115699587253781,4.953240764150168,9.615363831682544,1.6709117066516388,6.674710144355744,9.289249799104986,9.966264412215812,1.190220464684495,0.8812180112102119,6.8234462978077985,5.482480026321945,7.697469815037099,0.40186182663379144,6.629282588556993,3.97994858825508,2.0664848716170203,6.923999599566278,7.145462565420953,4.101426310101557,0.16694128852853707,0.4169158457773747,8.733997978914429,0.9607786404663865,0.608560926185373,9.35780914830363,6.507511063593863,3.183762196551696,7.328925784930352,8.238298171727097,9.85720274178696,5.084613051416575,3.640022779312948,4.537570618353874,5.820987926289778,6.651930116675295,2.2554487763305464,0.739877202034207,9.487027803465441,0.8899766863437031,7.154991555031183,5.682914169306583,8.225223373236547,4.155213517415117,8.852946988454967,2.7651241177161023,8.655318622761685,2.572598685884675,1.6386917030526482,2.533340536116613,6.6884465444418995,6.574942668327594,2.9953423920717404,1.70698029887425,6.119777165554218,7.592629271596691,8.638884170013819,1.500711496984637,6.492738073747917,8.824240313234334,8.491056452696375,7.621276185175114,6.486336311770504,2.9221856541276736,3.8604917378303027,1.2847924867739269,2.529030075037304,8.504920073041456,9.965555501036752,3.7674460678880095,2.568133398827128,0.7190788106605894,4.987875642376141,9.617130461241949,8.507350842628739,3.8404375449261074,1.01391690170467,7.531884712724652,7.710930246034888,2.213268353960749,1.5116542773602082,7.235812044186787,0.8059060857987088,6.803884039810475,1.5592943027152106,8.739436258283206,4.9336509347745405,4.80716810072048,8.968385732426064,5.847139306683071,3.9717621670003034,2.1619787847249627,1.6054725753558463,0.16657674829251512,1.2981567128228977,3.26653274689642,7.151362192699531,7.123486612584282,4.3035644131922135,0.6302190664117191,6.930010800619993,5.59879709582151,6.40166962788991,4.356511879805176,7.23239753321435,1.8060175423136693,4.569162156714186,3.6557578455916606,8.65174250363232,7.096550914318216,3.5766625087293846,3.3906977977914954,0.16171845384354677,4.240049033540069,0.1939955584747577,7.808236875954913,5.000089559873063,4.9171191166131205,8.553307707620172,2.84992788248013,3.259723538155397,1.2182954985596361,6.030042334421648,3.6412569561462282,9.967182405224653,6.035420911539311,8.04049313354604,1.2715947594247368,1.7951877732619104,3.7083619851871763,0.9750961851251128,5.80201997663274,1.6985928543606343,4.315866099851931,1.4531013812053062,6.55432491435556,1.9522992354375868],"beta":[2.148395180649226,1.6975266737104622,1.543589392646092,0.5674077906409536,0.1138144138102426,4.480552415329786,2.617383147746284,1.170855005425565,0.6275281746580674,3.218864652061326,1.0833295486767514,0.5834331160498107,3.5458538127102415,2.317356783178206,0.7114459605969281,2.087786022353242,4.402891116493491,1.0637477776728776,2.380085179089211,3.182866427301038,3.650929053394937,2.11975819008148,4.1779745387337766,0.1276825099492629,4.993662452489711,1.3112217457630715,4.3948649384035665,2.6940327321377455,0.7250479471651416,2.938990494499798,4.450029675910018,1.5751175220918934,4.32670974667591,2.2209592777164078,4.8470912277119735,0.6878618965517358,3.416421892837609,3.6539965062455346,2.4741837022770286,0.21482897758078656,4.589537148476777,3.764561142787053,3.4486880872622794,3.975476773475015,2.8245775257154406,3.646744615872981,1.659537476101176,1.430191407775001,3.4640375496808087,3.7287257566856513,0.2479191301509076,4.038272418170133,3.4709552622214765,1.5599593660810496,4.808090088654601,0.6463930284690211,2.5391230906649143,2.9589649789204864,0.4637733601839056,2.47015688717519,3.340989239388147,4.968817150189631,3.293789758935306,3.945353364205133,3.5310304697105668,2.3460680142277446,1.0407500963314964,4.535905202926531,0.12460743238927652,1.2772817217870192,1.7227996254464495,0.8113292998087829,4.970770553765269,3.0461634277501792,0.4179368205767775,0.2330207935149442,2.785203231578921,3.6924441582745695,4.098843578914852,3.425654146756668,4.469845364240087,1.629113219908923,1.4192257007669173,1.3406381594711103,2.9657137453227964,4.5935365525855385,3.719740394355223,4.507369406377015,1.3331588649807535,0.7753019970599606,0.8148333018656573,2.00142513535123,0.5070577777629703,2.723435975495041,1.1031141400730493,3.91759008281219,3.8292447342198574,1.9268660828525408,0.9173434392015778,0.8966744201946553,0.3080462677661999,3.0424092285073803,0.8046223400935748,0.6757449022108319,4.961737644805487,3.8787166354102274,4.467406898085979,4.34979402080399,4.400164629125221,3.0364174931042753,1.1699411520226577,0.7038929912605474,2.892323787944715,1.154637533434285,4.055627555099114,2.845272884143919,1.3105720537735854,3.7626114040851757,4.443138725295796,1.8278100644456052,2.319113125996876,4.805659612382365,2.88962657205295,3.3148290714257076,3.9570949164662794,1.6441985492183375,0.47045839665204037,1.9606380892382458,3.9785887127220922,3.6887204571784915,2.83860437910778,3.854685815477673,4.956290309664718,3.355762654711145,3.37733957973412,2.476732134189479,0.024904507066675352,4.304785685818101,0.939974084050077,4.975584068015829,1.6835716662626,4.313841626185574,4.463875019087203,4.764310757979159,2.1678771424628653,1.7099189419573657,1.209021764848891,3.47604514582875,1.0396436281715227,0.5969065544480578,2.3014368306770114,2.2073934908351234,0.8733478146340246,4.105503003865733,4.806133812529324,2.052299257517883,1.769005346151834,1.124970904280722,2.5302970748959286,2.859527063930498,3.229129846117252,0.08968212768990957,0.1445181346233837,2.4995309011976508,1.8584487812867656,3.221802762087438,3.6170209638495923,4.662526904882088,1.3148199341233113,0.7498276647769186,4.796748537260528,4.805304075630986,2.1602571925822236,2.8960177415321975,3.1037030467840374,0.1607649346469009,1.3266056633522916,3.0977439333208387,2.620114428175625,4.62712270377463,2.315629015807935,1.7201564345255937,2.660165181085125,1.6880174873614295,1.346285263867707,4.424705419873098,0.22737147592727824,2.6179922741152986,4.5957554895497115,2.66072357642704,2.18424975548014,2.7525611084400605,2.1417925297780247,1.400112982663404,1.8041508098463788,4.879409039044866,4.182541719382998,3.478248268770563,0.13072917637896975,1.2502074023662668,4.549712977029934,0.8480580308607311,1.105396940428972,2.9017220824551284,2.236263366238748,2.071334346162205,4.900614382539612,3.3846899294360346,2.3884182394512243,2.292120240524884,0.5148870570477504,0.8403862466547019,3.461116671219445,2.484488502810219,2.2806281310617846,1.3906057801814309,4.250346045062336,4.485665211683315,2.420199950410893,4.688559144266029,3.820063987038983,1.0757218720370132,0.5472160650606706,0.13940860928870924,2.125269283117296,4.267554275755546,1.1177152579565552,3.193737192460846,3.4756840916109253,0.8193453957140895,1.4243999313680078,3.1347439018124525,0.18715389237837443,0.9425079703701889,4.371904329248525,4.170833695352169,3.0385638431663597,2.476695397493521,2.5725420647790944,0.9905717834029937,3.319221804474851,0.09871729349413938,3.2748286097133628,1.932853853194304,4.279609205054796,4.156042945256879,1.4029721163683684,1.9049807310209588,4.466389960218285,1.0306721097787774,4.707032322255717,0.8463347516110387,1.0867355894951858,1.7851047109921259,4.062517943598474,1.587323574171916,0.34017200179707996,1.484137956779561,4.747456356743784,0.8135451191242238,3.4563913184314465,0.07357830765030937,0.5270087639237953,0.11776233245977763,2.54676401779514,3.7403846227415816,1.7180525001325642,2.0223731625891936,4.6196040183039555,0.5132343308170517,3.196801949906327,4.285708325513987,0.9740461654126809,4.237312045703575,4.009446312079003,2.5224122809057525,4.611115365894129,1.0225064617552637,3.6248401281278033,4.461027460094764,3.6143607452768247,2.5450735200349706,0.31230504202269693,1.715419824232578,2.5287270192806077,4.8657684428647565,0.4063984883805416,1.2925539617596615,4.861178203839853,2.5402540518735273,2.063959526490422,1.6991455077186735,1.9136719750236042,1.5572161565984621,1.6815972265497614,0.5325717249614315,2.290696571826026,3.035703784383985,2.4166430959573884,2.112864790708632,4.485095972789828,1.4432329697271595,1.595558928188009,0.4208168734882678,1.9715134254732292,4.6849217506081935,2.3437572289053743,0.2840766667581007,3.936796605725622,2.0148866869994575,1.8414090411649597,4.1852416926733085,4.147794722452691,0.904928242267159,4.014252773845795,1.3457062935508834,1.35594679682834,0.3090128031598516,4.302791426723184,1.8408907432648125,2.8043026074776,4.980840726938216,4.589010000462247,4.6055987199357435,3.2869687266507643,1.7265257352972074,3.1183868353203392,2.7267596768631073,1.4531984856092572,2.9822091981800525,3.164579774369215,3.177885541900464,4.574570724068632,0.03278591902969197,0.3150958058132092,3.787664363380517,2.7746592962641636,2.177584012377828,2.408369217749472,1.6679695463785327,0.7134665451602629,4.592010653536334,3.26448621083522,2.945181016960202,2.2403830006412306,2.1112006766945512,4.241186377143169,2.806465819480221,0.14445076598176287,1.8530333491997897,3.5880467074706504,0.385421225746323,3.873806163258261,1.2327982525772052,0.09678727454669578,4.982059046585548,0.7818905651343944,4.493574124276717,3.364081299350733,4.143833863242367,3.022853294751935,3.2561770314359197,4.220251243168512,0.7281041697124846,0.12671416559565163,4.823185192779285,1.5274542728791152,2.7658611405522713,4.9601540101097275,4.375085485883653,4.798999430197123,0.7124463158775818,4.551296238929702,4.244330190208901,4.5035031379575665,3.06703147916759,0.2902091266051887,0.47572072796045917,3.7833597462912447,1.9571706208352546,1.6266721154737085,1.1616568812350925,2.424016756259376,2.063907591865223,1.207591269627456,3.5237239783432894,4.025497556301493,3.2162270510566024,3.221303573515679,0.43084376048996953,2.9379988507200783,2.1829021366115944,2.069936114637861,4.480516176065087,1.993975471744246,0.4013969036863696,3.1378503284687644,1.3534928812397584,0.7708362526567247,3.441483113647079,0.17964064786205713,2.6396246737399673,2.033975292710035,0.9283413999598089,4.540065328984432,0.294743169042575,0.9288018624555849,4.320887994156769,0.3175830381220768,0.42522865884397465,3.049399304345992,3.5610968875813196,1.9688298711184793,1.8305177462482114,2.9818130353319603,3.99338369018417,3.1305125181639823,3.6177522075301938,3.5448063266301357,1.6233271028066387,2.486052804231238,2.6042542950690697,0.3991069900973476,4.601612859700477,1.3442151332981367,3.713224042506831,3.1485824835826683,1.815772830013409,3.200936018193594,3.314538413783815,3.4084498045174705,0.9192747874336438,0.753103854473578,2.072715371885719,3.412199464691251,2.0220793056935173,1.4302178706928603,4.435969761826277,3.578808214306214,4.832692593794276,2.4674744780899327,3.25632659783325,3.110486884193441,1.4532129144617212,3.477465346690547,3.457586659988512,4.936483881814918,3.3215422377595774,3.9740822126325637,4.879057994426402,1.7524067411334,4.91823993279397,3.1716780745437365,0.8130799694866142,4.222683277814285,1.5382150108776538,1.6249293042393786,2.8163201529134128,0.5240961706225078,1.2012246317744868,3.4517121670998465,0.7364010812329713,4.712965374713751,2.4588246241254907,2.45215344452399,4.592287330520116,4.470937831649509,4.969157565596706,4.599943595832798,1.2993500012243653,2.556648699585055,1.4469061387173354,4.25542834887859,4.414641394769764,2.5877074200961325,0.33467145379065477,3.427985027920726,3.0243319436746283,0.9723271810957734,0.217952788892688,1.5796428324660805,1.7753527741967279,3.292733675574462,4.165578303714074,2.9603300392815015,4.130497513788822,2.0554789328412526,3.002966927745976,3.949574171624687,1.656726559235624,0.3660616748236134,4.9464446124735115,0.6233500035984052,2.208728835157421,3.6585033803661062,1.8700759228396013,4.688766997477424,4.131583737489657,4.0066433268030455,3.0298293774781584,4.542331629262748,1.3099358753810186,3.304446622350774,2.723703193204312,0.8958727467718386,0.44483583397251225,4.551316405990551,0.9848288743459865,0.5549630738954026,4.118702845432603,0.21823647592066564,2.6869110558055076,2.9408721878138366,4.784414960409386,3.32190117380991,2.540976684860503,1.6066486798484614,1.9904361541207238,3.295530904196371,4.052346949046639,2.34603699772189,2.130148859134058,1.8926643940598176,0.40679709823145616,1.1383112654947014,2.7856991763914927,4.873939352509713,3.5853487196709977,4.9577694715703675,2.0292948318373583,2.231302879332505,2.4014147788763385,1.8383689426467864,0.8542959475233325,4.842225193960987,1.9867716013517067,2.733125528959288,0.3800635883841197,3.6378041777995493,2.936216106976456,2.5025620199936904,2.1722677912608757,0.47683595248431243,4.998462356301259,4.403077279145294,3.8521506830814323,0.6717252230656123,2.883965833143507,2.711368055197604,4.841048697024064,0.8264442498058866,2.4872128703117404,2.1451440313804437,4.6840056540604085,2.1731299947121077,1.2064634426655385,2.6615517372543684,3.746459734805959,0.14732087507570601,1.4025832093426893,2.3428174180059766,4.216467409247082,0.7623121665800392,4.238632529929827,0.9552095332720278,4.5029345343218505,4.9287473564425435,4.860401057806909,3.943983647124792,2.5327381387636674,1.2862411581831068,4.471460599404455,2.955267076013106,3.897666691196404,4.32747715621055,3.8182030327695218,1.708601126787831,2.933296455221349,2.736692673642569,1.0713431365970116,3.599824153916642,0.38337679169281214,3.2234303718965163,2.5229730510414052,0.824950697364043,3.6212831425902015,2.7185896682450528,0.44049535632366243,1.2291209463825714,0.14101881843703756,4.7771936315899435,3.6874281019741773,4.564948733068576,3.113760453306822,2.8077333419983344,2.5357821883127682,2.4079077470140584,1.9280325987684033,3.4812633230538346,3.0384413717397676,4.908471291931069,3.235123431513461,0.04822830867532102,2.382498260583097,1.4723989276941607,0.32641825317955564,3.6717347492627814,0.1731938412501044,2.2284018289272245,1.6062652386529719,1.0422990035424906,1.651898597691328,1.0789380490430611,2.8321828903736277,0.005212228277522435,2.9750878248403123,2.0810423859974447,1.9584965021579237,0.6968711263709038,3.9220935438590976,1.325902493439196,3.1142201007134207,2.8415190405119595,3.140343701974362,0.0009581806373482049,2.6248117407685467,4.984111430829865,2.1401844891340236,3.1108884390703495,2.008255596995258,2.385697787815284,1.9109199198854032,3.5988702758800772,2.5038047038866305,4.433126537297927,4.810864010684646,3.628462231679783,2.216827991502183,2.8190849584224917,3.970412393656125,2.1127523298418716,2.0789210883980447,0.575015833247372,3.879286769826613,2.535142094954992,4.586849042212112,4.560073884405901,2.6814446919356785,0.6347728123526708,3.314245082349798,1.1579529533277344,3.8825188052752955,2.0970768278130283,2.411363005803686,2.613548458064953,0.789954834368356,3.1261340310067762,0.8602433081250582,0.11222464054203019,0.5636244705364424,1.6371791922122125,2.386374422666621,4.202590521726428,1.3794194303271679,2.545155887740418,2.882021725032484,0.20230676600677122,1.19522585432152,0.8289522810473449,2.3257148851965015,4.502998463532184,2.1800640817363695,1.2648391579531626,0.7323188205490705,4.625843341742244,1.1017226886366327,3.267364111963781,3.1028318780015574,1.044959729958168,2.0567976949198785,4.950277618571221,3.0542344123899734,4.491214664313969,0.7404710128232583,4.715988340253238,0.7135635604791046,1.7087766419535488,4.605658056352345,1.2649630012933055,0.5542088538814227,1.6944320599669127,3.5457297661435794,0.09177676764797305,2.3455457829233426,3.1172907310734512,1.2009596833960001,1.750500524282692,3.3967855161400387,4.454422502685473,0.3341161883800692,3.4011113681761165,4.430889037623467,3.2669851587727736,4.436661376794411,3.10849943734591,1.4731306242477105,0.5267257095332889,1.413516834711388,4.1179847522734985,1.6760099243510107,3.2930705675482965,4.54605724342385,3.4184251937045254,2.0680194545456567,0.7063313642257263,3.416138409836006,2.5521774041145475,2.94354522353332,4.441479826071593,4.333421912744599,4.251512370626704,2.087407571192247,4.604532080602394,4.373805111226416,2.5124034609748547,2.6772411627259975,2.611259881406389,0.5031606913367437,0.24076481407979022,4.992103857552722,1.949223874133178,2.655471343858,3.3608237844649693,1.613632521720122,3.6717813347179993,3.620572914218264,4.8968448599187315,4.314491472314317,4.62488753429036,3.3995729533305354,2.7649825299386666,0.7731550009996391,0.5366668607125324,4.791228166944829,4.67493128606905,4.1765895751724464,0.40756399121673503,1.4585823965099431,2.292375441504164,2.8125706825830044,3.6066224907618496,3.6139182315351706,1.3274753868183053,1.5242269475093306,1.8701174637343543,3.5579098949530117,4.801520059302389,3.3690828444266465,0.12405922952200554,2.0206518709250765,3.7237405604081433,4.317211529308251,2.701387956169193,1.649778623541056,0.5475520455384508,4.568576781655841,4.0865868311091855,1.979800174821752,4.088172897465928,0.45513456488417314,0.1198425352292487,1.631478321839267,1.0559034770680942,2.746681172288541,3.7594399998763226,2.932530831775387,1.074404033506301,3.884523631941794,3.9067355312930383,4.525915242507631,2.717805015903033,2.880402300316325,1.664554564009415,1.3881737339340428,1.1271376691248391,2.320829823398233,0.22959394723373494,2.6210889680550578,1.6814022699709141,4.494770347072279,3.636250725315814,4.828972951030575,2.3800887975291696,0.8315969828495839,0.41516350909942323,0.2632270420669658,1.5999725012711796,2.5354053651578035,4.0951366590060925,2.9880476156788607,3.120666215108867,0.6301720010291489,0.8565747386505418,1.4148278325006758,1.703868530988526,4.990454447542932,4.467059200613606,0.75033921317744,3.6076993121128673,3.0315129908101413,0.7657278048498517,2.3849948459876624,2.6545045674225776,4.683414398668297,4.304228394119117,1.566409796668582,3.4920166601386704,4.5774954069458005,1.8169414259252936,3.8716466114170722,0.9292633935284278,2.169706302543928,2.617137232447968,1.594656565758772,4.714600521137669,1.867332850960599,3.1537870396547216,1.5560283552805587,3.510533449126622,1.5692394776649032,2.15007731778333,3.7064852188900077,2.834418549706564,4.460288332710495,2.7415170796230717,0.48435990020899045,0.39149866692131496,2.8896346748114086,1.578710468469653,1.5765831287394427,4.8647805321704,1.5946430797104505,4.667538894695521,3.14194665159515,3.0726639189539084,4.413721795218467,1.2344092696424436,2.749649109629032,4.794378918268353,3.3870477444224276,2.714054533443763,1.180036476628905,2.252338669115704,2.8072805688727587,4.008381175080727,4.446518869550613,2.050126457262771,3.3250026905368846,3.568493080473245,2.1183866016178055,3.9081779356437707,3.186276348542566,0.5837450370307307,1.7702423567712466,1.1897753584551773,0.14371934085936844,3.253268033590576,1.9244074808487877,2.2564870310543705,4.907177153469617,4.929611036611265,0.7059999087733027,4.967887331013523,2.2078556960805895,1.214630381998948,4.55309877015171,2.181097698231439,2.2968907771456095,0.06656860115414776,3.7759699761306766,4.263429576165455,3.521013181055035,0.8649593693004853,1.4783824425352954,2.3974427726531102,2.944389555902945,0.8047808593495265,4.112910900294193,2.9886690190289467,1.6286919413168266,4.045892213107765,1.604095040436011,4.594485042611593,2.5584787120629295,3.1613063849912604,0.604687264283692,1.125685993024329,0.11979912006055415,2.7657377335865494,1.1668652984517003,3.205558377954838,1.7265670991602433,1.376550634223841,4.143086913833619,1.1068311269355036,0.9598697232381925,0.8124594744227598,3.514249322296937,0.9433340423956005,1.8960118407136828,1.065621524943613,0.4412814672866061,2.984913206851595,4.50159910438418,4.715373411067874,4.447198866539712,2.374872351798849,0.41407642970241354,4.278998654203877,2.440495503798762,0.9729861007041674,4.735357413424434,0.9628220400348053,1.9188597879881042,0.8126026725067437,3.0963036561726867,1.0320005711987656,0.3461872165200752,3.4959386530616032,4.862580434570685,4.331148743633976,3.0995626209104654,0.749548449039612,3.956293768744575,2.774218973185374,3.873190209918901,4.5790451975328725,2.489564899563532,0.23343806273430023,0.7108228404921291,4.871636419959449,3.369795437027181,4.734433096415579,4.939664000814611,1.2993506130533683,4.0066545138614265,2.327270573385359,3.9206945532049997,3.5611044339414,0.5378835584725294,1.0700193165932836,2.5878607380710794,4.98227452003856,3.853332313720972,1.957383992544095,2.886474017769054,3.2619867313386797,2.6016651260620014,2.0673911167003367,3.033229275381789,2.4757912448140154,1.9509561589669966,0.30296334677819003,2.6627886819719473,1.6310158780515749,0.5185801489608233,4.945605495984764,1.3751955810362482,0.7037312669051954,3.413879382270716,1.2938865866369564,0.5330254443597338,2.1295842066165105,1.1164682037264673,2.8285707330903365,3.6146119252042963,4.4270836204955835,4.334676306517128,3.920856019907981,3.9021066761880654,4.326567924368047,3.618123841328169,3.718051108858754,2.588984968211816,3.0035495183582404,0.919125285196416,0.8684181840307259,1.873400010063685,1.0303345565846722,2.172944325400148,0.4411951387233304,3.1548146109482134,4.779053013666829,1.179871661292523,2.826942009669388,1.214249110353397,1.070629713413791,2.029781012602496,4.790449684336688,1.5213502852408611]}

},{}],106:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logpdf = factory( 0.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `-Infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, 0.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], beta[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], beta[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large variance ( = large `beta`)', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], beta[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/logpdf/test/test.factory.js")
},{"./../lib/factory.js":100,"./fixtures/julia/large_variance.json":103,"./fixtures/julia/negative_mean.json":104,"./fixtures/julia/positive_mean.json":105,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":261}],107:[function(require,module,exports){
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
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/logpdf/test/test.js")
},{"./../lib":101,"tape":261}],108:[function(require,module,exports){
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
var logpdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `beta`, the function returns `0`', function test( t ) {
	var y = logpdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], beta[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], beta[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large variance ( = large `beta` )', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], beta[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/logpdf/test/test.logpdf.js")
},{"./../lib":101,"./fixtures/julia/large_variance.json":103,"./fixtures/julia/negative_mean.json":104,"./fixtures/julia/positive_mean.json":105,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":261}],109:[function(require,module,exports){
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

},{"./is_number.js":112}],110:[function(require,module,exports){
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

},{"./is_number.js":112,"./zero_pad.js":116}],111:[function(require,module,exports){
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

},{"./main.js":114}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./format_double.js":109,"./format_integer.js":110,"./is_string.js":113,"./space_pad.js":115,"./zero_pad.js":116}],115:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{"./main.js":118}],118:[function(require,module,exports){
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

},{"./main.js":121}],120:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"dup":113}],121:[function(require,module,exports){
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

},{"./is_string.js":120,"@stdlib/string/base/format-interpolate":111,"@stdlib/string/base/format-tokenize":117}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/utils/define-property":131}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{"./define_property.js":129}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":128,"./has_define_property_support.js":130,"./polyfill.js":132}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":119}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":134,"./polyfill.js":135,"@stdlib/assert/has-tostringtag-support":20}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":136}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":136,"./tostringtag.js":137,"@stdlib/assert/has-own-property":16}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":122}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){

},{}],140:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"dup":139}],141:[function(require,module,exports){
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
},{"base64-js":138,"buffer":141,"ieee754":244}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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
},{"_process":251}],144:[function(require,module,exports){
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

},{"events":142,"inherits":245,"readable-stream/lib/_stream_duplex.js":146,"readable-stream/lib/_stream_passthrough.js":147,"readable-stream/lib/_stream_readable.js":148,"readable-stream/lib/_stream_transform.js":149,"readable-stream/lib/_stream_writable.js":150,"readable-stream/lib/internal/streams/end-of-stream.js":154,"readable-stream/lib/internal/streams/pipeline.js":156}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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
},{"./_stream_readable":148,"./_stream_writable":150,"_process":251,"inherits":245}],147:[function(require,module,exports){
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
},{"./_stream_transform":149,"inherits":245}],148:[function(require,module,exports){
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
},{"../errors":145,"./_stream_duplex":146,"./internal/streams/async_iterator":151,"./internal/streams/buffer_list":152,"./internal/streams/destroy":153,"./internal/streams/from":155,"./internal/streams/state":157,"./internal/streams/stream":158,"_process":251,"buffer":141,"events":142,"inherits":245,"string_decoder/":260,"util":139}],149:[function(require,module,exports){
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
},{"../errors":145,"./_stream_duplex":146,"inherits":245}],150:[function(require,module,exports){
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
},{"../errors":145,"./_stream_duplex":146,"./internal/streams/destroy":153,"./internal/streams/state":157,"./internal/streams/stream":158,"_process":251,"buffer":141,"inherits":245,"util-deprecate":269}],151:[function(require,module,exports){
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
},{"./end-of-stream":154,"_process":251}],152:[function(require,module,exports){
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
},{"buffer":141,"util":139}],153:[function(require,module,exports){
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
},{"_process":251}],154:[function(require,module,exports){
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
},{"../../../errors":145}],155:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],156:[function(require,module,exports){
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
},{"../../../errors":145,"./end-of-stream":154}],157:[function(require,module,exports){
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
},{"../../../errors":145}],158:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":142}],159:[function(require,module,exports){
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

},{"./":160,"get-intrinsic":235}],160:[function(require,module,exports){
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

},{"es-define-property":220,"es-errors/type":226,"function-bind":234,"get-intrinsic":235,"set-function-length":255}],161:[function(require,module,exports){
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

},{"./lib/is_arguments.js":162,"./lib/keys.js":163}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],164:[function(require,module,exports){
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

},{"es-define-property":220,"es-errors/syntax":225,"es-errors/type":226,"gopd":236}],165:[function(require,module,exports){
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

},{"define-data-property":164,"has-property-descriptors":237,"object-keys":249}],166:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],167:[function(require,module,exports){
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

},{"./ToNumber":198,"./ToPrimitive":200,"./Type":205}],168:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/isNaN":214,"../helpers/isPrefixOf":215,"./ToNumber":198,"./ToPrimitive":200,"es-errors/type":226,"get-intrinsic":235}],169:[function(require,module,exports){
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

},{"call-bind/callBound":159,"es-errors/type":226}],170:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":228}],171:[function(require,module,exports){
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

},{"./DayWithinYear":174,"./InLeapYear":178,"./MonthFromTime":188,"es-errors/eval":221}],172:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":219,"./floor":209}],173:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":209}],174:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":172,"./DayFromYear":173,"./YearFromTime":207}],175:[function(require,module,exports){
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

},{"./modulo":210}],176:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":217,"./IsAccessorDescriptor":179,"./IsDataDescriptor":181,"es-errors/type":226}],177:[function(require,module,exports){
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

},{"../helpers/timeConstants":219,"./floor":209,"./modulo":210}],178:[function(require,module,exports){
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

},{"./DaysInYear":175,"./YearFromTime":207,"es-errors/eval":221}],179:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":217,"es-errors/type":226,"hasown":243}],180:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":246}],181:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":217,"es-errors/type":226,"hasown":243}],182:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":179,"./IsDataDescriptor":181,"./IsPropertyDescriptor":183,"es-errors/type":226}],183:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":217}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/timeConstants":219}],185:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"./DateFromTime":171,"./Day":172,"./MonthFromTime":188,"./ToInteger":197,"./YearFromTime":207,"./floor":209,"./modulo":210,"get-intrinsic":235}],186:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/timeConstants":219,"./ToInteger":197}],187:[function(require,module,exports){
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

},{"../helpers/timeConstants":219,"./floor":209,"./modulo":210}],188:[function(require,module,exports){
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

},{"./DayWithinYear":174,"./InLeapYear":178}],189:[function(require,module,exports){
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

},{"../helpers/isNaN":214}],190:[function(require,module,exports){
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

},{"../helpers/timeConstants":219,"./floor":209,"./modulo":210}],191:[function(require,module,exports){
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

},{"./Type":205}],192:[function(require,module,exports){
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


},{"../helpers/isFinite":213,"./ToNumber":198,"./abs":208,"get-intrinsic":235}],193:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":219,"./DayFromYear":173}],194:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":219,"./modulo":210}],195:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],196:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":198}],197:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/isNaN":214,"../helpers/sign":218,"./ToNumber":198,"./abs":208,"./floor":209}],198:[function(require,module,exports){
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

},{"./ToPrimitive":200,"call-bind/callBound":159,"safe-regex-test":254}],199:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":229}],200:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":231}],201:[function(require,module,exports){
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

},{"./IsCallable":180,"./ToBoolean":195,"./Type":205,"es-errors/type":226,"hasown":243}],202:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":235}],203:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/isNaN":214,"../helpers/sign":218,"./ToNumber":198,"./abs":208,"./floor":209,"./modulo":210}],204:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":198}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":172,"./modulo":210}],207:[function(require,module,exports){
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

},{"call-bind/callBound":159,"get-intrinsic":235}],208:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":235}],209:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],210:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":216}],211:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":219,"./modulo":210}],212:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":167,"./5/AbstractRelationalComparison":168,"./5/Canonicalize":169,"./5/CheckObjectCoercible":170,"./5/DateFromTime":171,"./5/Day":172,"./5/DayFromYear":173,"./5/DayWithinYear":174,"./5/DaysInYear":175,"./5/FromPropertyDescriptor":176,"./5/HourFromTime":177,"./5/InLeapYear":178,"./5/IsAccessorDescriptor":179,"./5/IsCallable":180,"./5/IsDataDescriptor":181,"./5/IsGenericDescriptor":182,"./5/IsPropertyDescriptor":183,"./5/MakeDate":184,"./5/MakeDay":185,"./5/MakeTime":186,"./5/MinFromTime":187,"./5/MonthFromTime":188,"./5/SameValue":189,"./5/SecFromTime":190,"./5/StrictEqualityComparison":191,"./5/TimeClip":192,"./5/TimeFromYear":193,"./5/TimeWithinDay":194,"./5/ToBoolean":195,"./5/ToInt32":196,"./5/ToInteger":197,"./5/ToNumber":198,"./5/ToObject":199,"./5/ToPrimitive":200,"./5/ToPropertyDescriptor":201,"./5/ToString":202,"./5/ToUint16":203,"./5/ToUint32":204,"./5/Type":205,"./5/WeekDay":206,"./5/YearFromTime":207,"./5/abs":208,"./5/floor":209,"./5/modulo":210,"./5/msFromTime":211}],213:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":214}],214:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],215:[function(require,module,exports){
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

},{"call-bind/callBound":159}],216:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],217:[function(require,module,exports){
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

},{"es-errors/type":226,"hasown":243}],218:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{"get-intrinsic":235}],221:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],222:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],223:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],224:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],225:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],226:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],227:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],228:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":226}],229:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":230,"./RequireObjectCoercible":228}],230:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],231:[function(require,module,exports){
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

},{"./helpers/isPrimitive":232,"is-callable":246}],232:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":233}],235:[function(require,module,exports){
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

},{"es-errors":222,"es-errors/eval":221,"es-errors/range":223,"es-errors/ref":224,"es-errors/syntax":225,"es-errors/type":226,"es-errors/uri":227,"function-bind":234,"has-proto":238,"has-symbols":239,"hasown":243}],236:[function(require,module,exports){
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

},{"get-intrinsic":235}],237:[function(require,module,exports){
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

},{"es-define-property":220}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{"./shams":240}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":240}],242:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":234}],243:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":234}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
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

},{"call-bind/callBound":159,"has-tostringtag/shams":241}],248:[function(require,module,exports){
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

},{"./isArguments":250}],249:[function(require,module,exports){
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

},{"./implementation":248,"./isArguments":250}],250:[function(require,module,exports){
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

},{}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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
},{"_process":251,"through":267,"timers":268}],253:[function(require,module,exports){
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

},{"buffer":141}],254:[function(require,module,exports){
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

},{"call-bind/callBound":159,"es-errors/type":226,"is-regex":247}],255:[function(require,module,exports){
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

},{"define-data-property":164,"es-errors/type":226,"get-intrinsic":235,"gopd":236,"has-property-descriptors":237}],256:[function(require,module,exports){
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

},{"es-abstract/es5":212,"function-bind":234}],257:[function(require,module,exports){
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

},{"./implementation":256,"./polyfill":258,"./shim":259,"define-properties":165,"function-bind":234}],258:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":256}],259:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":258,"define-properties":165}],260:[function(require,module,exports){
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
},{"safe-buffer":253}],261:[function(require,module,exports){
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
},{"./lib/default_stream":262,"./lib/results":264,"./lib/test":265,"_process":251,"defined":166,"through":267,"timers":268}],262:[function(require,module,exports){
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
},{"_process":251,"fs":140,"through":267}],263:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":251,"timers":268}],264:[function(require,module,exports){
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
},{"_process":251,"events":142,"function-bind":234,"has":242,"inherits":245,"object-inspect":266,"resumer":252,"through":267,"timers":268}],265:[function(require,module,exports){
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
},{"./next_tick":263,"deep-equal":161,"defined":166,"events":142,"has":242,"inherits":245,"path":143,"string.prototype.trim":257}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
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
},{"_process":251,"stream":144}],268:[function(require,module,exports){
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
},{"process/browser.js":251,"timers":268}],269:[function(require,module,exports){
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
},{}]},{},[106,107,108]);
