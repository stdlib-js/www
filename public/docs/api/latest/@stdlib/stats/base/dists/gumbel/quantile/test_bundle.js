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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":46}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":47}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":48}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":98}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":98}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":98}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":98}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":57}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":50}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":52}],52:[function(require,module,exports){
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

},{"./main.js":54}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":55,"./polyval_q.js":56,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":49,"@stdlib/number/float64/base/get-high-word":60,"@stdlib/number/float64/base/set-high-word":63}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{"./main.js":58}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":59,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],62:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":59}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":62,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a Gumbel distribution with location parameter `mu` and scale parameter `beta`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 0.0, 1.0 );
* var y = quantile( 0.2 );
* // returns ~-0.476
*/
function factory( mu, beta ) {
	if ( isnan( mu ) || isnan( beta ) || beta <= 0.0 ) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a Gumbel distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return mu - (beta * ln( -ln( p ) ));
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":53,"@stdlib/utils/constant-function":89}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Gumbel distribution quantile function.
*
* @module @stdlib/stats/base/dists/gumbel/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/gumbel/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~1.4999
*
* var myQuantile = quantile.factory( 8.0, 2.0 );
* y = myQuantile( 0.5 );
* // returns ~8.733
*
* y = myQuantile( 0.7 );
* // returns ~10.062
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":65,"./main.js":67,"@stdlib/utils/define-nonenumerable-read-only-property":91}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Evaluates the quantile function for a Gumbel distribution with location parameter `mu` and scale parameter `beta` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~1.5
*
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns ~4.733
*
* @example
* var y = quantile( 0.5, 4.0, 4.0 );
* // returns ~5.466
*
* @example
* var y = quantile( 1.1, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = quantile( 0.5, 0.0, -1.0 );
* // returns NaN
*/
function quantile( p, mu, beta ) {
	if (
		isnan( mu ) ||
		isnan( beta ) ||
		isnan( p ) ||
		beta <= 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	return mu - ( beta * ln( -ln( p ) ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":53}],68:[function(require,module,exports){
module.exports={"beta":[15.54063231546007,10.579077554201302,0.1740020429615896,10.71924316701721,11.524538560754838,15.42298593980238,1.535141384805252,2.453547109548939,9.108753175241748,13.896565492525212,16.56072283983847,3.792008195447427,18.941403260695132,11.520634062393489,13.49499125414274,18.62508455896544,8.182304992796245,16.885896947342328,7.208420000306757,12.829022326832828,1.404010353793761,7.612712877261294,7.775683159561595,5.474983296678917,6.5091094905351765,3.8264882139466705,4.235203054511807,7.733720263212809,0.9031521121890407,5.68250029650835,18.627039206363087,17.663808161463667,16.883824190227354,9.160097663766336,19.53156103818911,6.295469305327557,17.594703694628283,17.699677606956854,0.5438034288376192,10.987348289450267,3.5277248301401087,1.777282898328969,16.255947109152107,11.596664400824448,2.600275748066423,14.926660401117822,3.6848374588318267,11.623306555573452,19.71190934950876,8.029347916311975,8.710890151297388,0.19187913296006442,3.25711658115023,12.83045724757724,0.25114832204705895,10.035873515655855,15.272326724119596,0.4753557777425854,13.913146988496244,7.758296104391489,14.57712337698629,4.936225347355201,12.661510333926017,0.032303678021978754,16.180211189082122,2.6031840366875603,7.624156725215867,18.93448190344397,7.02871977749818,14.122003981789275,7.267981645690154,8.186016838032572,13.510599459912198,17.70150181983112,18.262666648824943,4.681613748820381,2.57992875440455,7.191437461562966,19.69395809071862,14.98641470137966,14.010240432160415,6.383473051688449,9.240393654120954,18.333939315212486,13.408350685989085,10.858668071557624,3.854645883979093,8.976892939901177,12.592790838327828,18.262141160047687,10.392109283100384,6.75522541619634,15.062108420624426,7.627894887124178,6.355938367749636,11.730915068606734,0.9046367363414598,0.8319633269818105,10.329378947742672,9.141107890002402,3.4790887789654334,12.183414038164319,14.237279921254306,15.557505975666794,4.90336032931574,13.115414847122718,11.248269901556167,5.2174295593528885,7.373101226037355,10.138060364274804,13.02116173664379,12.796932567109614,15.95394583228623,9.766207577333553,3.4936167809816343,4.570726660411535,8.884538131446064,18.36947406872453,12.81084255707091,19.173768771727964,4.223048939444749,12.623942338697809,19.121399625134888,0.6915936803874967,6.536044052379668,13.670808782560924,10.144986695956767,12.315993086013313,13.901417994737365,0.31862613088547764,16.95293537200209,12.1843777154441,14.377756296390736,9.113717267236341,16.803269906892197,13.327171265345656,2.5216066601159337,9.566854655996785,11.585056966929642,15.075192826395881,6.596419867248344,3.6252459382081037,17.771493643506776,9.536549859057848,12.508986039180563,18.603691732212567,9.14536380330992,4.4185929146365455,3.5920268673479905,13.916049376536005,3.4233959960837046,0.3936884559878129,5.017611085208684,18.621954899125136,1.2844652891717478,0.09770430715881684,8.979369153100114,18.453814429470576,9.740140886208618,19.07215579255341,8.686758128951606,6.873991364708156,6.297358294159867,14.534157201113826,19.71887525556494,19.617564922716944,10.159503129421763,19.32639826796259,17.01215387901719,2.1087311960684163,7.625735762566497,8.795559113122637,8.357307996953057,19.504144272275127,6.627456833041583,6.309056108461304,4.790686316732842,3.0651261010865527,0.29706319489587685,10.87972605177756,17.016557189726143,1.145236669717704,6.488078255925784,0.001697381409142551,14.814899168716181,7.492903570714078,14.379740937791027,9.279164219551475,19.89078814289411,13.350726827326959,4.505752312978615,13.531625267858685,9.048307080645777,14.520511369745993,5.663946342181645,1.3374960056922713,1.7761184752128223,5.242779653746701,8.214469611040744,2.6692739624591866,15.0657137379243,15.82675954972994,16.053349219483994,4.957512245422229,19.629785019982346,10.180717436494348,17.80896932318694,9.020955851422986,18.73458748161152,17.67965883283019,6.388138342270655,3.6593979902087614,0.9811894729153625,11.700410783596062,10.969725462240657,5.416227367285802,5.076414474206068,3.0147032952665187,0.7038625356885131,18.822817891623416,14.197170801923459,14.701791559457282,8.16066939066221,2.0124844901028682,0.3765974298580277,13.381341947807677,0.8669990642640713,18.71884948490715,11.701774211559988,10.027513977926198,11.726213111870853,4.874141687612963,0.9367371659896451,11.757934518949703,3.687188287149117,8.644899048137438,9.66267913339562,6.983859463268884,3.7281562298046156,6.337306094164026,18.236499332795336,4.872597383764514,5.23916021715864,1.0406045428085076,14.013772546986702,0.7553260768063685,0.7285035688111474,15.543541688940653,9.199413732180822,19.198172695843546,10.922800819902605,17.828587379282148,6.990483845281674,10.355040456836129,5.75556296988974,15.872343650824035,4.72139183236397,10.843758728330396,15.987112827940466,3.29514004098022,15.474360265598559,14.474923428625882,14.496952767245288,11.8056102637741,16.314852417283934,15.393770057598175,15.346213939019698,8.137778430779425,14.877483007737329,5.486774747119609,9.085176854903253,13.5661342467858,8.928932619010528,12.066740569362118,0.7258758960898293,4.306640558048027,0.4505667087623788,19.3828644462296,10.420190434248081,12.390383005694897,7.054399199296606,18.95301134630951,7.553973924307149,2.9426140137779644,2.1270503590200107,2.9894495741257865,3.3517715123905933,13.715839422812767,19.24478066457857,16.45745538006883,1.8224156926359791,17.309406969058763,1.2595561819708934,12.546693199972925,12.897811656501975,16.09414960797124,13.234682061440477,1.5956750674096387,6.328008359078661,7.1204274988188,9.143323226732258,10.08121801673315,12.122632309798744,12.119123803955514,10.361356849664677,7.06757482730727,17.5817511433395,10.251743755440476,10.708096287452902,16.623689577674647,17.650895289786078,17.13004709908145,0.5379047336815646,8.636052905831399,15.685672453322663,7.6572472886860865,15.363933337544111,7.124934138152477,16.960593462241604,13.852980124919867,8.498318546566455,4.991709522845191,2.942450006242532,12.473352941699517,16.50461048834081,12.326308184237323,17.420862755549766,10.379272349263339,5.650070544385919,12.369127066630927,13.681875166404804,3.857735928184316,9.252031872010527,2.0453010784739023,1.1549488380485462,18.72032930887224,10.343181890101224,16.445970830769888,18.888676520187495,7.858598734199238,5.365399490767868,5.604529073114994,5.76063398274532,3.8180251007569854,17.84744622479976,3.9412126076845855,5.772496948044328,0.2592833143372397,9.300476125057834,14.608000735579338,15.730355179583096,16.063154052702302,19.85065270663714,1.5520067072744315,1.2137776525604682,9.674657272833409,18.688472236711313,19.406009307525412,8.060039620821286,6.7159275866567025,5.9146719203761755,11.397878697536775,9.927583698979303,18.417896069158004,6.96633386259089,14.817458475922498,9.328046108205603,2.3351138336971555,10.050636451248849,16.645879157573518,9.606401781388897,2.3403797194049325,0.3312146521889092,13.035324504101,5.459225662459106,17.477039122352696,8.520548185768453,16.326070264448003,3.919863188792543,2.6554820146973857,3.665610743013379,16.977784858456886,8.163480917651436,3.194605411393252,9.75411595367039,7.901350368936049,11.04862607232176,7.514810184668499,19.87953705156904,5.077058237258929,1.4398981744673556,10.19601280811187,19.168768287076556,14.357307147247687,5.200202342964095,8.82651681397828,10.323761469686952,19.553558578321045,8.570533555967689,6.878260670707288,0.2526493945893993,19.99842201676442,5.618434034575861,2.3963099738863747,9.586502750081438,11.678866160522938,14.5987775805011,6.009726240032336,2.943949844841538,6.63934428624859,14.195513496923295,7.293992322428928,2.7836223057703435,10.195823130672972,0.4069935477109565,0.6899165043636124,3.0230354866147646,3.046176982380593,16.59945407412338,16.315411867099865,18.899553050467336,14.118998071426176,8.212691534536617,3.908612995356382,1.4106049671790766,18.10539790008631,9.565290607019126,0.6299437945628616,17.383984628793208,8.072519470212605,6.178606918161007,19.781834551296793,16.621246405104195,6.306391271474023,11.551811198447513,0.8406463965221489,18.182366898375406,13.389692656251002,7.275248553587765,2.623523754425574,8.393287322909009,12.444185618744434,10.759973084633007,11.481337001016172,13.023278927113422,5.699948663343544,11.821567700021296,18.900335007910954,7.00684267941083,9.781060124016259,16.272054690218347,15.404943232181347,16.996055996666016,11.883977863896842,16.383841024886262,13.7636868434689,3.0135582337797207,16.55696129565858,19.29467603478018,17.414105237532965,13.579645239929441,5.488526520348764,0.913387884237653,10.151726513183155,8.468991964596322,4.053170099849415,6.982223960414107,14.955385866310866,18.12934986700034,10.958903702516384,18.61585218993482,2.4338153874533663,0.056945171618671964,0.681213601484072,6.447610764967466,11.87858566540962,3.722032403757183,12.672648919153495,11.771866685141056,8.968935905526259,13.844355607268195,17.632006780859754,2.785579037455843,7.732294750693827,17.472715475921014,0.16992186133577114,16.171681924491036,18.476213037764943,10.464537279682581,8.820615329441779,11.826001515885242,5.360846720799253,18.530956253563822,15.311761120689233,2.5638625895219835,12.120917670207128,0.3353340573446095,1.9477858812300353,6.386734785907917,14.493494842715101,5.729424856703851,12.739945968461601,16.774833065912347,16.539179815337537,2.0822974861803223,11.341895845636977,12.164120270552928,14.243161753085886,3.1067015869062153,8.21038843832769,18.833533118244024,3.086156008993921,13.989679743462835,10.946246535153268,9.143734777811137,18.523275713889245,16.128587730497017,6.2988934884234205,1.6989043028474304,7.258744233905023,0.49648671452862114,1.3301926914096285,12.78117389262652,10.95825845015825,0.6049690594283907,17.46890320896101,2.0775878709914286,15.517099219126823,6.978560993179017,7.847161885973097,10.384517671718317,17.95382583428637,6.4745882109267505,14.71099507645462,13.899267606954906,19.070697622981065,6.5158327649552605,17.349029714476547,17.538004094780064,1.2393559002059051,9.330923697772011,15.682368870018347,12.758326354673812,9.865582968184533,7.629802598671942,11.599376529952657,14.3845051777271,6.613728638949126,9.979335402364558,17.838363077987466,16.953385514720797,1.3417323447454121,2.2419054420536666,19.726127589381694,14.922043916502377,19.22316051333813,19.115852064154065,14.266536990668373,13.304260939009245,11.078612377613322,5.721245562388084,12.923710626855005,14.253119573190865,12.527958536747686,0.4312268070321501,15.466194897409276,0.2808296851100689,3.7955562332425696,19.09420126625517,12.915370766688184,7.790207617102989,3.2493699228421047,14.149859646939419,19.697766702797175,1.765305136244928,3.560215737072494,13.407685605969043,15.484956561605294,2.9709376367640505,13.807012830286318,7.597593157477505,8.011035173614008,6.701249929780491,17.812922121849766,15.331177796012332,8.654730439342888,13.563700567539811,10.50167811091196,18.474386593844013,9.301412394168743,12.182780680590062,11.619271728384067,14.395355967894483,17.601554666316005,1.5163214013228998,5.793674997031801,19.05382895664687,2.8756253839680257,15.378799690435487,19.399374542848463,10.619715440228518,14.575323226865788,14.225364976983897,9.577592756006759,1.4801847305622662,0.33892492734775903,2.2853794052893894,2.2234009075119143,13.202643329545097,4.287866725698315,0.6345035360106843,0.9190955012342084,7.893837226477003,6.328950923718293,11.270185525596887,1.6047096340703693,9.372435274996377,7.529099253081215,18.627560795114473,5.367603264053846,13.672645238783861,15.705765308247797,4.076808471419486,1.5693163361692797,1.2729724882866034,6.962274121997845,7.224792836067069,4.911568304115264,16.074088747401266,5.629370337442223,1.4319202383257457,17.67895273706083,2.0783180767058473,16.69448499925568,13.92922788058073,12.76529877577373,14.663314107899206,5.106460813348566,1.0515485232865052,5.528004724589568,14.605946220143075,13.14522094076231,7.607086509433185,7.273292751917624,9.222866489018706,6.62200509384999,5.071834234856545,12.84930857688165,5.338656893005291,18.959388034379323,7.098312895307943,9.013524664606178,10.546189851366234,12.135094795320423,12.826031161465178,10.411894303718586,11.224969783216668,10.783113614498529,6.971522192921498,12.373594164200146,6.376277156161025,19.841373994638207,6.162041022524791,17.04276737874375,7.10436541447705,12.142557878555454,2.381324155778377,10.881950892586145,19.631117023421805,4.385095304967437,16.521898629522536,17.64615336340974,18.798644713220263,19.852562623629243,8.143471199963717,9.522681329374084,2.916532923686801,7.810373282256506,13.83189175634557,16.750076044604455,6.537734444217391,7.893164421040089,12.188240327993398,3.951000733992407,1.378673585681165,10.360761102814195,5.554882731107891,18.581919133120287,13.141451467586833,2.3435009599306422,7.894592710184769,7.838469257119365,9.23611412898049,13.04036998516703,17.802277484237706,5.299315451228619,8.21717009038002,1.3988175234168354,4.898167614697138,2.6328345842545087,1.723063682474879,13.938895303775677,15.750362453497214,17.779676022864667,19.270305111828417,4.834546292415038,1.6357947158312003,13.110725259628424,1.0580455993316473,5.11499945684899,15.278345985873996,8.210462227743193,16.855545446768193,9.52238054882972,17.43518193418887,14.24160200074509,17.64231751365397,5.467474464371307,0.21399762312365844,19.11338510569908,6.512909925320356,10.546700252072526,11.559202875405656,13.21211902339587,6.106580981589476,7.194886084342107,13.994768796486397,6.485140329302785,6.160510828116879,8.370628247981958,3.9438406305674034,3.2589266857726473,13.680647732947747,8.038568231462015,15.57976008667099,3.7468448169291735,5.700997539688544,18.444093090450792,6.713253215289292,19.69662823415696,16.34665449658169,9.560107953797989,14.109038602735922,5.582870309913988,0.1546117814867598,17.17875376619862,17.12319346481797,17.78992261256521,18.126030146571708,18.73566662563626,3.673544531525743,8.306760917975415,14.351020157448842,5.855431484697098,19.2837316211553,18.8682222576847,17.509171482461824,0.19734947397838098,17.097102821178627,8.755723714924857,17.486160872891887,16.44190415699986,14.797212810768677,4.2661738733017085,0.6181471893294788,1.6108670536809555,13.397311952921548,12.349979824331543,11.873356273370046,4.350324614975398,8.06498021343816,3.2461347210082314,16.90964568513436,15.79319671233459,9.953140227929467,3.455389903946906,11.588384396022096,17.356148449925875,15.885029669722188,13.947624761100826,16.95982712171856,12.728277458010893,13.245658421948047,0.7781344090315878,9.298557290600463,8.2257365119472,16.017052772309842,12.827066051776224,12.23084492724226,11.009442975620377,10.189709174655285,7.834111971561142,0.5248803117850098,0.707599189766217,9.08689478484809,7.9057419832856946,3.268167011294749,6.697178386575864,15.569233349312203,18.44807877013597,0.485815683491877,3.3728265099282817,5.289561474473201,2.561990703259762,8.548860069775417,7.107691119502961,13.995133648331336,19.405859788785595,7.494148715469602,8.54381687337372,11.045618435449555,18.676116211681556,15.511753547075834,12.89507902400981,16.94195949848373,19.68207241645758,2.1886443359758,15.59784902467683,18.30936989867184,1.965578953430347,17.79118865689323,18.69179825387934,1.3446336643986623,3.6680567912589312,14.780475039408266,12.717140181341996,2.4816721499985706,19.521913568739624,17.190810332132244,8.463290359055012,8.65693334546728,18.45528676659127,3.9307151809185514,9.844394342388538,15.460076447247687,3.4566408872806553,5.86858807207999,12.614765969541871,5.143157845451443,12.93912741281925,6.436650134909514,13.882711586765488,18.88255689125974,17.954492219800823,5.272078925702113,6.142826365273137,4.941693677132535,5.334841504634169,4.100552813548339,11.64044722329383,9.84804125096586,3.7872748259356603,16.341627702487248,9.993115229402306,12.938470393453812,4.217119292778495,3.2609055081397376,7.588321342139359,4.7606635594547475,0.8117797793518466,9.265526479046207,12.980763638612904,1.933718244931013,18.679728813114544,16.661900369414088,6.9072264788149385,16.024700488207962,2.7485277361539318,18.93734387898501,18.56969615901924,1.6479671926146189,5.447882869668188,2.8581586093816647,17.638695494629246,13.732338245885298,18.46112639695255,13.368432921793403,5.457585104706277,3.3813390112421837,4.9313192024464625,17.130933570904226,7.639297364657582,5.616052518750192,5.506603288939069,7.341650370778883,5.446412757475718,15.405549081463574,10.533217901193975,19.52143734250654,2.236930891248794,11.380099886613104,9.985360684420591,16.914743429828608,17.903751259367723,19.88253349908291,0.8379388091717699,13.727612657992232,15.58368451752273,3.2523309814074564,14.523977868268751,3.2106995404259653,7.585324769482691,8.206233480668104,14.921913446757952,4.3282146320851655,10.94492639875738,14.7197605616428,12.030961646369018,15.547107526553784,11.113583335108984,14.932829831007881,5.157519874720431,2.424654510343962,1.728985556249092,16.157641503866145,12.726990970897841,17.832520461033056,17.667756949855136,1.7539724057278638,7.6060733417224125,18.39770989970922,8.835591250624582,15.391334733929014,6.744133923819562,17.99450759513484,18.92801364834935,12.622782070932734,14.452638900181555,1.8160912947331687,6.067239613838158,5.607852207826913,10.377163533653832,5.946347531683074,14.830443883797177,4.273880609729788,3.4087315941814467,8.921769315234261,2.656088030183641,7.512033448881152,1.05386946155265,14.936855800420755,10.00954616425033,5.916046215048936,19.60377905396534,8.506167884214072,18.31876045528518,11.774062266016498,11.583331182787578,2.113067194804157,6.34022216088777,17.548370829861515,15.10654220290812,11.373812824599652,5.4560232576834355,13.163372831177522,13.747747415075025,17.645181216749716,14.280420688905192,1.1448447230503733,6.266137288420981,2.6912025430114017,7.6741817448628025,18.87272917458437,10.225440658392628,16.734034698433277,9.506072886955842,15.111007480172628,16.00469638501998,14.178260538823451,13.575596558910267,0.6020449298071284,19.95535460093054,4.9735891713989,18.12611470620958,17.817562861778594,16.372415987122015,10.651147298729434,2.7502801489249373,13.766851811627735,10.939047068550058,4.418631332493663,0.8639263611559933,11.922056842317904,18.61551558330589,4.532206874848788,18.261231113805763,4.722988651783004,3.8385368658729524,3.976686322001246,4.619569117691715,16.427566370038708,10.362605567064378,8.82282794433869,10.556293398029899,10.880878758302014,3.232037018187075,18.136761619838396,19.224225795000336,9.059362424818937,16.870151849438386],"expected":[-12.40536655094671,42.203761164515015,0.5957386026698949,8.287365552131215,-13.206637945743715,-3.8691307906142134,0.3363192161602643,-1.4891638972012486,20.78055479381367,19.026137563211027,-18.38069120656164,15.467702129178416,8.768643103435958,-13.700560057343848,3.6326168368180323,13.772071795243498,2.9899175964738607,12.476895232763951,14.438050975093637,1.4707860033842406,5.077690638638306,-8.176826758789261,16.483859980116385,-2.1871345475859076,9.42067842645747,9.20083034954765,4.671908390040899,-5.690578748751104,0.7433623939767791,2.5655734457904504,-12.382520157842109,14.878332025919347,-0.2016816298754397,9.084921834615763,24.48175975975178,4.651966463430459,41.76880423442736,-30.494817777085174,0.6539433347649966,-6.798668651719947,2.509486432100627,1.1567872755749429,22.525215135362902,15.64185641147739,-1.3279572664396035,-13.519719117155391,-0.8186714783181956,21.490771324293885,4.4258489839062864,8.849426546031985,-1.0963068863072107,1.001424239661902,0.5235782699629972,7.471714159745623,0.4713082645847054,-0.747492735583529,16.10085476323809,-0.19155413149862682,7.627682185447021,-0.6742342679709397,9.980643698108628,4.0509700540567115,14.455058412558035,0.786842665389207,24.45077508233129,2.2943818486817795,8.610048160554875,-1.858072943097028,2.9834361186862415,5.857516742681252,4.264625406975016,29.24864450915871,-7.567724348065086,7.601371796521303,-3.047528450030198,8.0404258246179,1.0428636952918584,-2.0402273162815634,20.66491419836783,62.449983147861964,11.654473298352716,3.8632111501611552,15.936259580481705,16.781226648321528,10.61230121959458,16.618816970658443,3.901600945662927,4.2197710476064705,43.04623839676331,3.214085430670721,14.839392274918897,-3.61127303668415,14.709406126178603,2.7584690345762204,4.460051823634995,6.583893539299118,0.043875074019053106,1.7306537573860987,-1.0092759508591993,1.4651140402147986,5.068298322783076,-0.7808403895979343,8.168158299966713,-12.805733406312022,0.9113069370159653,-15.94579318736984,-7.982114102435782,1.671999084751226,7.871906391416363,10.130816559919731,13.141820269492555,-16.58252041819823,5.052888342829513,6.861668537958735,-1.1078672590685965,2.805159797044944,36.79912916754329,41.556462949692445,8.607045461585818,12.896690687108485,-1.1265582089180544,-3.1477425295778807,11.931481273304387,4.340991007213547,10.028864230073571,-0.2902549859373178,-7.270946218465489,24.13752393374105,20.241538762669236,0.7264752816250759,1.2291342890932653,6.626431551423433,-1.5437757288079328,17.402786084756737,-3.975440206725287,21.279458466732024,-0.7326730510255426,9.20245087446117,-16.653734046990515,25.450389574761477,-8.904437929584162,7.765516110445969,-3.911550294628204,29.656491687758514,4.81690879984667,50.84169828830841,0.5688401890728527,2.432372574210323,-3.554443443516451,7.7863418850216375,-1.5337603609145256,1.8717933899134005,-2.511093838753731,-1.668705669150316,0.9679175675174784,-0.00929247300745728,18.561336745119764,12.34436748456832,-4.34462385132019,16.86678038839322,24.588105934754225,23.036785500154213,5.229343418110544,14.229568437132006,-10.61335928554057,-5.779398312159769,-15.938163432980517,38.120592360888146,8.991132326261873,-0.8567231980021064,0.16866973108214264,8.952302834240008,11.025361551333862,6.132234450531757,6.665829446103167,6.30303330781069,2.4486190598895607,2.39226663630742,0.34318230957445817,1.3299922316872475,44.911779625627894,-0.20219249759171087,-3.290656893438838,0.7682925063718432,28.70107504865502,8.149380301406724,54.15775271507553,-2.430524330134647,23.927942448140847,-7.230007224408541,3.7129822057941237,-0.8235294532464577,9.976971727172305,4.080145078646184,12.073363616361688,0.8054882323184487,2.0817218408728335,1.4515295892361453,16.65141296862706,6.107233526506066,-4.543671119467635,26.22272174486129,3.3640060109398977,7.37108549643649,42.27781657369189,7.181358382833113,-10.334610803837945,4.91129725618078,-30.422263593313424,27.21795711100102,13.200382140273803,4.286571213709757,1.003035139391525,9.838873192394502,-9.828138506491666,-3.5464248984136537,-1.1570133761122452,1.6498957393299123,0.660359698993572,15.413033835371559,-3.752896966086701,47.60074505432229,4.8792774109388235,3.335701057890799,0.2209514140578558,11.833289118012942,1.6876252983259215,20.869562148736993,-0.8000660228690535,35.173533796716164,6.784156639458826,-3.1384567805811585,0.18027018304078335,11.904571275532811,1.870874512954147,-1.1443058807775641,25.054892481303476,6.0320063317742845,5.9320832860448425,-1.973786843673065,0.7150950374682422,1.856628992009309,-0.01719426128989332,0.28520978293589905,14.791783828519266,3.1369286726357553,1.0942436119860144,29.088958722368993,-0.550144530761719,-5.021571097114204,-0.11820934227757207,-4.126642104836931,16.29485266218529,12.980154253986765,0.6306219172186731,17.631620879429107,-2.0204267400626077,32.205933328812456,33.09603482301489,5.282212148117819,-8.282965290182716,14.47030484866208,7.449958112394932,-10.750274642704388,1.0406615453324326,-1.9269340378213864,24.185518807356615,3.1157606928996904,0.7509566151893776,1.0480317455229402,-13.883002508427591,61.12477397328563,14.0789776323032,25.876491872803893,0.48721500070238655,1.2162286821766783,0.4359808373029534,7.294934280579441,20.50360444998599,0.7920395349356512,-9.635923050923395,0.47881015970204854,4.660073452861566,3.119090001180987,2.542747034588926,-0.0643256240409038,6.484864369752233,0.032405848672449444,-19.591266360879757,-8.820031613356758,0.7086963650711842,-28.165421735954205,2.06495692102349,0.4832302227277144,-3.411421553690466,15.611171316022109,13.457935263307897,5.029191516372069,-9.629596026706215,-4.586175811224282,36.82550813870348,-10.977153146115253,10.72624558334922,16.104003457566623,5.224360827486806,0.17673781527874133,27.940350624060684,0.3098760069028298,36.01901146886194,20.049532624988714,-3.1949479913800483,5.520384675172332,-0.22088327256824397,9.159817144369837,12.425741304260072,13.463311044150576,-18.14316151654711,11.184510123595523,8.221301680948525,20.221677243679395,25.224231910513037,3.9832267074916197,3.2730677273233404,36.804270292624985,3.3459205204391216,6.6522988593735555,-13.021935280145817,3.725767465258418,7.539366439967084,-5.239337450482837,15.894384961395057,4.64971268107904,9.911169108922586,-1.0630730748983075,-0.3265656081695094,-15.582818850120978,-4.7607314663630085,-19.042234678094403,-11.611716547090372,19.06126979208421,-4.794140340586817,-7.780011775631476,-7.261054489747312,-0.2752112022672054,-8.00068887331052,0.7732801723689072,-1.565359977311598,0.7160223603221447,4.597276172780555,22.23661247847893,-1.9019114616972022,-3.5146224435834332,3.8228524978504304,0.1762997785908344,-0.15375263380880155,12.67974614738556,52.022982158851576,20.27428596567408,12.585909195744687,-2.3706110182034417,2.026216926038181,-7.504299682826394,-2.759042686209405,8.306671392496005,18.25101444908852,1.0762222858775563,6.0675261935168665,3.2427020275924994,68.88814324882158,-22.91550593701982,-6.7371177201873005,-2.5556241468276886,0.5516100041385308,-15.025995456075414,1.4594247477158913,11.760433130442808,8.93052849364506,17.54614127270967,12.042597602736608,0.5791195622996306,-2.6969534915168563,27.49006273167128,2.848154345417041,-1.2675285365307467,3.359368940153625,19.145376638816995,8.76026419692052,2.3825709129842068,7.838501761968363,0.18064833679085773,4.401879366017188,-2.331082890963953,-8.156156442129207,4.929877918359998,11.227177702794055,-6.753211674886504,28.405248033019877,15.996989744226429,-4.044029287770096,3.7593992613076797,0.9441510332842464,41.64944289909342,-3.7023247886053126,-2.5258681488328794,33.18176441562912,8.701423811887455,-1.0182441780499267,12.988630659416762,6.571952992014448,1.5192192731944236,28.04000144908585,3.5311900351230663,4.972094551554737,4.383027746599894,0.9481825946725713,1.5392854706140389,-0.9501881977534414,-1.2652974829377603,5.987423615101343,-20.863760945822246,38.56605197960722,-7.274570620090196,-9.991613555106442,2.017710567209525,0.018179890708041158,-2.3229993573007612,-9.036098034216895,-0.017561809753733393,10.64578567166893,33.54790699939329,31.755290452249536,1.8038024384792748,19.065166325630145,13.691378974469139,0.6901948299964104,-0.5169688271512707,-4.9763256930795325,15.024951355892329,10.839836182418113,1.8892796142900388,11.051391072285961,26.91215094469341,-5.7949466308462245,8.124000617094858,-12.125108971219198,1.919407402209365,40.28477423027385,3.590855625868821,-4.404911264344421,18.701700170304047,4.078653170459061,-19.120095524391555,9.895337056809764,11.139115298144782,-10.641595744812204,-21.54249971491769,0.7075122842445545,-4.254536265236755,19.45342145023661,1.766268395208325,5.576701815731743,-0.7865859826898041,2.2189078136882054,-5.4935750985189244,2.9567255466834306,5.676574013569255,-1.2242427972374355,-9.426675563835657,-6.242440273159948,30.22565801464124,0.10431220868780466,4.214140648069775,0.14776569011367235,-0.15546440385100668,2.38961340973251,-3.3398693170850757,0.22490382940546183,37.61821051157983,7.0772909257598755,-5.504908871074136,-14.35031819161556,-18.3926086004974,5.168480948985701,21.16089472570897,5.718725008613365,1.0737014565175076,8.815918726994322,-20.38608597006296,3.5897030517271467,3.754860719760459,-17.847075153184754,4.208596504502042,14.003924193324318,-2.597867960201563,-0.9203096361849916,0.4414984649041672,1.4179390632144782,1.2859386174995389,1.7652382845826118,14.978046516812208,-0.9029547590784253,5.155023952559386,18.609087443179163,30.20691891317115,0.38882012492696716,55.993011576607024,34.660470924052206,26.29421433710072,-2.0331930350738574,15.522500557852327,-0.2192641424759636,0.011886172057405883,41.36872538216392,-2.3186378756292454,19.21796722891347,3.5550918903013846,14.598607131787585,6.094665317560398,-0.17511049305751358,-6.531702510798767,0.4562081812373814,1.0846677076825153,27.00749785634979,40.35098347880171,0.11951119897637863,39.85309196513963,0.27935389392957716,17.85251665994337,1.857168257818483,3.0519474351587754,1.5034584476459971,-1.7882795525116737,5.114710697993878,5.925568208228484,38.05538265547215,-19.322315322889278,-5.997707452164401,5.2996557520926775,10.961676676719984,3.293548842970318,21.309134055329523,-17.231392940584463,-12.90828821349826,1.2999777771970282,2.1806598919106652,-5.006661215281504,8.382142841532849,9.863784101047216,-5.345277316737453,14.576940902473012,10.387476701958185,0.6837750754870836,6.565534819818316,-0.42656002076023103,7.520072476440323,16.217377448690993,4.505303513522424,0.05858899337837152,4.3647931458610705,7.239327181255967,-2.4319234369692344,15.505774306249196,-2.3966371484199067,-9.218130830415033,0.6470746462806917,-0.13053980813709815,0.8387790511873681,5.6129237292832395,-21.42275255248493,-11.085759980578219,1.331170653015041,-1.0694069181093888,-4.429495939114936,1.5398857655688616,1.8584629420847039,0.10017042556233285,1.0247420236684772,88.50772372749492,2.5630342387307623,16.7277827583256,-3.5633569193309,0.4365971138301297,7.033546220307301,25.08270713230585,12.500800605857378,15.693744584398475,0.9411343193755153,4.95557754680375,10.12510257367317,26.501590519505612,-2.3172940756745968,14.306502746442197,13.528062740777221,2.404018148936724,0.5201022345224139,18.182627301841006,-5.690117224837289,5.285654781131565,16.42339813650072,5.576428886943786,-3.0932607800992145,17.54680082511071,31.374529710015565,1.1615705548964321,2.281030487901031,0.9237588554726386,0.13216125667765555,0.21089373294144362,22.870469232727924,6.4890295892410865,-0.017227442520046488,1.8682519306025038,4.586097913422725,-4.675855967814871,22.592114615531134,1.6635730363890011,11.976130424337393,34.78286203068837,-13.254138891461286,0.41763472976265503,23.714507099058547,-11.333012143876656,8.263917319949245,-1.2927422206037755,-0.6744634710178277,0.6849328041181406,-3.8550193582591596,-3.201478689575313,-10.451599534978785,11.712154635951668,-0.23395725504800885,21.59219874540986,1.2401287051452246,-5.355037589285873,-7.932654946348497,84.11346912676927,2.706761722067238,-1.7732685146722074,0.7482285989350261,4.305341346461623,4.047140438454961,24.485340160493674,19.581492165505125,1.2901918149611022,9.375123715194555,0.812204250144395,10.840653939259848,42.218866129947486,-0.9916696924863888,5.435716493322558,11.806013295934154,-8.213606928874604,7.4829241025272,7.098507365679821,-1.2398662286143642,4.126757225831556,-5.358030120737812,9.479032372856077,-2.4111223269616366,-4.527987834979406,24.687866507625937,-11.5781305913374,9.644915266727617,20.448732151127313,1.808164631274216,-8.130297019231227,6.396271563634669,3.822461039356585,-18.299524343344892,11.126088591901544,-14.12183783689932,36.55684617821612,-3.1680911547816275,20.472131542281222,17.318928352820002,-9.057404473242713,-0.5287563330022274,-1.2323251241366395,-17.22565760509915,21.52213333525334,3.8450068021610138,12.010734964413889,-0.1747884387662364,-1.9990622398989333,1.0954904043951053,8.74542639637777,27.741988469322386,0.13968153133431532,-1.837913758383425,-0.5723547001803586,-5.206577240563506,18.931351127537315,20.33065324200727,14.962348912242229,18.489498060923946,12.436412382433403,-3.0583412244416115,1.6516265056403232,10.073909558376082,1.602347543300887,-0.6557108678864237,4.372749996447044,-5.591559258294647,-10.812533337707432,-1.0646830475462614,7.99606369340595,2.8097882736642643,9.556300997433624,2.606291975640347,-2.154934510436683,21.727912447307013,-8.674714710359753,10.418053559470106,6.744738132072872,-15.838098342302152,86.57430263076344,42.38259764813682,-2.2842828010377203,0.35965530905763354,-15.497229573463738,6.055077637239437,26.48372244892311,31.517473882828412,0.22134819432125807,-4.312094961550125,5.5657130488007525,-4.198553591275601,-1.8410812885856793,1.7154076244557124,29.322646591820465,2.542944919572964,2.609787819918203,-2.671996387148467,15.64407082744896,27.638959861440476,-3.7563288419042893,0.27664211395099414,-10.017750466214396,-1.9971090794484243,-5.411862754609903,4.704883406229971,-9.319426845400745,-0.35332367688882615,1.1986756350363104,0.932020429258694,3.1633060564730906,91.6644542789839,8.347150113030636,-12.082766226247983,43.29999688016162,0.9346235284377488,10.393030555227188,45.455439859453534,-0.8737363265555205,3.260796094335356,-4.3145437767145784,19.67986717979327,0.9116742526903547,-17.6425633983198,10.733759819847048,-8.857849172332587,-10.183029997018291,36.82873683035967,-0.1543947707126896,1.878593767573479,0.376226630264447,4.678169356678769,63.07322952128492,1.6610287400182897,15.66255980175998,-3.016440761354696,-3.1339372942494697,4.229418712798757,-11.868459219784198,27.14627619376743,1.948574534069971,23.925408621836496,22.832058489948867,-9.88216239218422,16.154582716172552,-6.700852565033482,8.793429860318499,4.640534693477026,4.523169165387188,8.619542143472628,-4.7171394502441935,20.989544075137935,1.013639220308395,1.7657963957734468,-0.27671815510442366,-6.257391297581084,-2.3993932454228193,0.33243300151509736,2.196822132740164,1.5184813742167338,8.111855505002147,0.4169359766838542,-3.7965611086276843,32.891489824281805,-1.7645027427649342,1.9724414275675983,6.929459160630798,3.695872894173526,6.639999726518542,22.76733132821824,4.1655504422009635,-6.830126634181612,76.26169096061915,6.586173873261992,3.8292316575726515,18.31448867138159,18.074394908396847,0.4519696906820927,-7.11857396666913,-17.846041433351047,19.292692464513205,-1.9034862614994372,-9.256849608406606,-0.6433458411945776,4.5073509107367595,23.021505691438506,-3.4775651703580497,3.252463301888201,4.493675760503921,22.446676576293324,-3.0477082576995462,1.582823775151465,19.75394577847974,19.377488285206997,0.900387732350125,-2.1438973786577304,53.92387809971687,4.875589522549246,30.005071630034085,-2.885072149078,-2.6287433495088317,-4.7153292888301515,-11.912853819250884,-1.8225905265719053,-0.8094673347840293,-0.055256974099521794,6.815402943244751,-16.046956393721953,22.58646963996826,5.009143400065129,0.03785587398721557,6.345148493541409,2.7919345123521238,3.2964996706076333,-0.28925238494420524,-2.3185798661486086,11.880634473275126,-3.295166310179667,56.190878560441405,9.113562056269247,9.687343908723273,2.977936484642087,-4.758520264544725,25.522900253283478,3.110601484083804,-5.008745679589747,-7.303113275779772,6.081860773325968,2.4859459741823517,-6.706805912285548,9.639752959193657,25.260694543274482,2.9242791614566666,1.126186038533922,31.814486190725717,3.122040828997768,9.301728179622708,-1.0208969671792854,-7.231864559391458,17.129115796951034,25.395969452687126,10.037378887461758,-3.525200566171387,3.8479228928076816,7.219980264552929,-9.987861870175644,18.36964025922721,-2.4413320558806486,7.5184330875306316,-6.7182647343546025,8.336730555599226,8.264251456280567,16.14699302310385,-5.728268188512507,2.2981746579460145,-7.738927201061722,16.364864711580623,-5.081258400813348,36.035887041782715,-16.728217855177515,1.2547358814481897,-2.9951032422402735,26.480860416284745,-1.0381987021131778,0.39968150273348685,2.189147511759151,10.411929748215268,-1.6210831412407574,12.401949331989256,3.778987109977353,48.12207838251431,1.7948052048371401,10.14972996639002,-2.064019198474419,23.155812202863867,-18.82820056280355,-0.10555321961968911,-1.868074325310287,1.675045230328458,-10.783502584800596,1.885923887297339,14.520178557314606,-9.411011598471113,3.4299990681163917,-2.972514633613625,7.035497665842383,4.568313692338434,-8.180992768322543,-3.593746750965953,15.524699616797962,0.8747975619066392,17.918048541584277,-9.575963353055503,2.7186141362831484,-4.72377572535464,-2.6703666478943804,24.857102919697653,-3.4290684922715604,16.911967491191117,-0.16919500622978223,-3.0007584605359092,28.90114398323049,-1.6420985131413977,1.6723544225116076,-1.219108136480921,-1.4278938442877451,13.11095778817404,3.4913934205896293,7.974617878845866,-5.076788030605963,-20.278474639294984,-0.6972783581727586,-15.713118967312589,1.9804576335605866,-6.816832981167588,70.90738316610971,-10.378612954417848,-0.30904171136856196,-1.117183988229653,6.931177916084046,-3.195852253847889,-5.30401862500822,6.4403503254866425,-0.7033365055246361,5.163146299287078,0.37662507195552103,3.1701203308420323,-5.615768105381369,-4.252999321465959,-14.488723984370655,40.388430113658295,-10.069589105535213,51.60939613769468,17.30022325227322,-13.863136245300193,1.5604756776708193,-7.7526938319071,0.27612520758619913,33.885933675282715,54.28436887909451,12.291575138458445,8.475667225610337,-1.5268207135173955,-9.221404570256148,7.95099491794775,4.853774626558096,1.5275546531597248,24.173839735312207,16.635740590314935,1.9286225459954494,45.503197191469525,6.969562552777151,0.8906929653861249,1.6908951087384976,0.79385728850596,-1.9905652743184732,3.457347881662364,2.695590125529483,-0.953793748914225,-16.083979516953146,3.8821901345678747,40.961206475472416,35.160840640567336,19.13107214814255,-11.861666224827205],"p":[0.09524160237993051,0.9806400224450444,0.41200442616026867,0.6291154289758916,0.0409327687676706,0.25657936364056,0.2966103938152005,0.06382643235104535,0.8962548810011732,0.7701137975940278,0.041215081776839524,0.9818783920247671,0.5177706915195661,0.028894644026015603,0.44759190781587477,0.6143240397271865,0.4804372229899032,0.6164059711366583,0.8632171231293237,0.40498806590987124,0.9566262826427827,0.040394376055826076,0.8769510749731231,0.19798581052988773,0.790223729209669,0.912845269874597,0.7087278000871184,0.1007530041682938,0.5305357882130612,0.46930405228502137,0.13039028545579323,0.6475356745504699,0.34774349933700544,0.6696754784245798,0.7484455570790289,0.5958703518390589,0.9082773065031395,0.002760824187342914,0.5156315498438173,0.15400731611930674,0.5900263236813739,0.5547338809810825,0.7708654875239727,0.7565212586672301,0.12654512410980256,0.07287137131392596,0.2572213400672698,0.8428648454866938,0.4332275855221215,0.6914444824293127,0.288841065429303,0.6851037059290024,0.41444654417864646,0.5624008977151647,0.8043466775502326,0.32028510480880934,0.7042829820793979,0.16819344884980714,0.548374470391567,0.29177810177052343,0.6007220750116524,0.610680133269347,0.7251835794711157,0.47037053680624674,0.7981343971432262,0.5567771198342699,0.6992044795337844,0.3164082042573235,0.5046539690573411,0.4994998522293226,0.5671623814853517,0.9697259190902696,0.15632766350347582,0.507811524211552,0.2930674585892912,0.8090254548635201,0.4164595958631263,0.2571103034602944,0.695823965297981,0.9845756101662864,0.6454503923803587,0.5341718049654849,0.8235944891537359,0.6588229541727417,0.6300512859077023,0.7970176098371329,0.6948408746218837,0.5231291515049563,0.9660752124989076,0.428908322700722,0.7727252036768999,0.175851235083184,0.6856350321049018,0.4640898609426696,0.6065790982612371,0.5431863539904425,0.13151695365845772,0.7010607891211953,0.31946793241697424,0.41796764028107103,0.760106081899516,0.31564116904032624,0.5610397820311559,0.090344841897251,0.368213470781372,0.026445316352135873,0.12920607513712423,0.4563168165107221,0.7053142717932512,0.6879934609602867,0.6937440109627286,0.024329890562034828,0.4697328136037313,0.6076526000347615,0.2407991018045148,0.5122461566846317,0.9838847070461545,0.9006429092806845,0.5860088562926156,0.5991249421632592,0.2559733662973047,0.25885927292292066,0.5796146873132664,0.9968569656796122,0.7846782577373799,0.3395893961085523,0.12425630646387775,0.8655936944312614,0.7792470750854827,0.7242588012581195,0.375986217675629,0.5348043053326474,0.3112238678999435,0.8502462593992071,0.2777530010621476,0.8050794962465266,0.1616101120506448,0.6763634260169136,0.011148584697108666,0.8278660238060778,0.02031423295444279,0.888493663889,0.269812921790344,0.9556906512058436,0.5052468519540461,0.9353116215560675,0.35079526056387755,0.5132646469586599,0.041932771095436694,0.5601560666523817,0.17504144023320567,0.9195480426046583,0.16879062877786488,0.3184237074579266,0.5636326844195287,0.06437213611081294,0.8789154749132166,0.5987728750212438,0.1993493161813502,0.6548066663300764,0.9366142760653293,0.9619295897838402,0.6348534567301909,0.6832964693812729,0.17963135103383365,0.24424813156183922,0.007629520876416773,0.8673677842987371,0.5391985435265245,0.17034647987329232,0.36223805126583386,0.6696670318244091,0.74946631316708,0.4745118326254232,0.6606704334940623,0.6614350320263493,0.5086035397722761,0.5506628193355152,0.23864704242452084,0.4124422441109237,0.9272375820543957,0.18874509886425028,0.16693180230981097,0.6264213965282994,0.8645706984538957,0.7021444766680769,0.9764671775438334,0.24059675366354427,0.7365962687454302,0.16663706536202816,0.5959297231868617,0.31860433208504535,0.7111559289226368,0.44607822939079456,0.8690035613344456,0.3394958187660819,0.6289699535364917,0.4677211289329486,0.8711432906055403,0.8937312231911425,0.24412985659255382,0.8220893152799376,0.4251998845047642,0.784346574323286,0.888953409823936,0.5907677991353175,0.15720187823428922,0.55493778094446,0.005807648132571952,0.8002439766845795,0.8779933841009022,0.6768003737140778,0.5805331915934615,0.6266977589429061,0.07326675035630426,0.1383891917513569,0.22341494508498028,0.4608086124865802,0.5417453334652684,0.6394946710379521,0.2502314075358476,0.960991756478695,0.5458644907469876,0.7791716556981196,0.49466051949355094,0.6539639371044492,0.6976716251288306,0.7171724557167836,0.32794105301275533,0.9683968939896233,0.5499596145966053,0.1411049171410712,0.13997425862386503,0.6823450485356701,0.48338821100837026,0.3012032461626324,0.921666609486451,0.644269666316138,0.8051032492570893,0.2155192926959426,0.37372319293589684,0.4851743237600574,0.3272036441302355,0.150612539193407,0.7037207119552069,0.9547093570655218,0.4711341633389525,0.8500993986063174,0.3091678031178837,0.2693988438162258,0.33364593573957135,0.26502688851370015,0.8974616891338305,0.7402454438890602,0.4071330488028744,0.7087736641488718,0.19573389399727192,0.94658346329735,0.8774516129141083,0.7651968942371594,0.16638461702653262,0.6800996561207113,0.5458394853748618,0.07170805287513327,0.38692118410142573,0.30584859948768006,0.804665598182774,0.4859259086151346,0.3735791821995582,0.4076201360378682,0.0066267671988007315,0.9882027582350632,0.8098281497594342,0.8846018555428554,0.1627972203087289,0.43042925677103905,0.10344544529913646,0.4925488409736487,0.8592750009560637,0.365481368190659,0.01829460324617549,0.3726071617773665,0.5404254123811894,0.6770394308660435,0.6698905128290511,0.24347272366280537,0.860781496911291,0.35485255592177767,0.054504928733757785,0.170927032957489,0.38300421326957634,0.005296107389365812,0.8122354501986015,0.3682214137152877,0.2552837891561355,0.6789906682067299,0.677600457414727,0.9324282012774394,0.009915236878751399,0.1167621503799996,0.9803986322506202,0.0392545920322136,0.6612198290844502,0.7541459289521368,0.5320931306716947,0.3767401489459188,0.8078651076384888,0.3453669596968456,0.9640943939447151,0.7350526798209869,0.29948359713765194,0.4768260144366425,0.08582941708369995,0.6783706900316469,0.6283654470629914,0.8321319625889303,0.03697613623389806,0.7990424860713374,0.5356653285139183,0.7800390564457873,0.949111674974175,0.6245452261785771,0.7052329309498286,0.9469009311448224,0.43328550141010025,0.548535355708996,0.10913297794469212,0.48306134153009817,0.7558015523383397,0.20171721662777142,0.7149083837385688,0.7383900077622365,0.7078346763611947,0.1691857146911082,0.13463159004401581,0.0891277543149156,0.19106310695200013,0.04055652727630843,0.15040971992880303,0.9080175177470879,0.06801645279435675,0.01325301645334287,0.02056023714742894,0.29655401412592197,0.19652404943609292,0.3906164855822982,0.2645611402497212,0.0585318632618248,0.5237307341527953,0.8036776095407716,0.3009891934628339,0.2817328859288717,0.4345898969478146,0.28824691131408753,0.2752601897827591,0.7481277213775679,0.9397262915677813,0.7019903013945767,0.801556142192303,0.22229802291035572,0.48774433265661354,0.1419817049717793,0.25196150915247983,0.5245869196069166,0.9244469237261241,0.37579993641224996,0.5921866595936376,0.6861050534875659,0.9989156827422068,0.017030696224713093,0.12455402209130972,0.03597837842733864,0.2989799278709999,0.0400130508185097,0.407485529620617,0.5978152212196153,0.6958507304622052,0.6979440041016276,0.9543327723975665,0.4349931327612093,0.08761079805273897,0.8107951063480532,0.475541904000218,0.19024698261750128,0.46140815634903376,0.9119204344847152,0.6231678255005135,0.4356869883805716,0.5032835238346505,0.3393374514980656,0.9384032264762123,0.2825596259910772,0.20723013767216858,0.479407164213981,0.8797475660100642,0.09181275315549242,0.9369972678293024,0.6408684980280408,0.19294728739279443,0.5240289220072991,0.75232981677345,0.8777239491281024,0.11731582806036167,0.04201445576056151,0.9674341298667473,0.618338738492229,0.3205014930371337,0.8890599591271229,0.8973414405763023,0.41155303573177715,0.8700915761588595,0.5039556111449179,0.8278468489989006,0.5079862416104799,0.6213941015412943,0.7407867318651629,0.23063882151180648,0.1484756196030661,0.48567459183997785,0.02745068577894849,0.8734727196073917,0.1810043795202374,0.0283381226196342,0.4817813504611965,0.3001475085112657,0.3008302360899682,0.07035480760492652,0.22376324466371234,0.5739099268449777,0.9831208455644316,0.9935421689444457,0.38916367470011926,0.7275619438881833,0.8896107359223153,0.364649537384514,0.05530277288301866,0.2536928356665731,0.7218469250287534,0.790823694661752,0.5610553530593507,0.7430111755853366,0.8838487330964846,0.16655783179056072,0.5944139635563186,0.07112936640070355,0.48183066974518574,0.9659923409812496,0.4280586733966536,0.14064126589704973,0.8570856095791053,0.4430360236131652,0.028297942638304763,0.5715985543549844,0.6642392226901077,0.1371505651356173,0.007752752400731033,0.40607464069004107,0.2624777128864202,0.6875558978095349,0.3843185726898499,0.49352636361550095,0.3133540451280816,0.8748261696319259,0.16005093337273424,0.47251537669584254,0.7500371334074758,0.2731908752319596,0.14367943365732883,0.23082385599120414,0.9340509411561178,0.36005546657589793,0.7826134954186879,0.5675692370258616,0.2099292991262649,0.49051503348647985,0.25368488720154114,0.3432000791811045,0.94762000497649,0.5746824561369743,0.15159480908127998,0.049832831321929616,0.05733998649583549,0.8151786858106165,0.9318038593131901,0.4746253082661085,0.7885233006388925,0.5566500077846446,0.04223986962610771,0.481565448878186,0.4905177566284453,0.008062806694132396,0.6064649328717158,0.6140028201387273,0.28264106711654535,0.1317316839173377,0.37046692651673574,0.7950886525266017,0.43721097819416177,0.4176471396146395,0.6943777524495349,0.2754926285762649,0.49371858428762927,0.7115077513351016,0.8451947085130969,0.2714337050138982,0.9923283037753068,0.9406324854161032,0.8459637178579456,0.10846044828780665,0.8487200442449656,0.36238811035526086,0.3649516524747507,0.9485819092252536,0.2829706025871557,0.8726074179909551,0.432322015045846,0.6514400131562221,0.6419217666643346,0.1801032597116361,0.06635452294877608,0.2847407833299771,0.5072645545729129,0.8817829559030919,0.9747667262857009,0.030247297421783115,0.9016108461295718,0.3127212969743072,0.7171316237727707,0.463634384748725,0.46687619326804564,0.3939476854748407,0.3306413038514471,0.6286173621856177,0.5012340010416965,0.9341669671122259,0.056727205852415974,0.06294281181482853,0.4582535316327163,0.5845434513878904,0.9311598112517769,0.8998338512085158,0.043644326065173766,0.061280296879692164,0.40027564367312474,0.4674268512066886,0.21297101200235713,0.5624447167283135,0.7700370803377481,0.17554310116140814,0.6278650742515144,0.5763016072983216,0.4283270393046499,0.9226357172991353,0.35583992220882843,0.5304783717681727,0.6403659273678113,0.4531132810444889,0.3685610587038948,0.48470234610613816,0.5784078307582479,0.17599200662222714,0.7325192855853164,0.3009690645846619,0.11053644280910735,0.3138502598505175,0.3579683189792844,0.8195201770839555,0.7960356535658988,0.04542962088696578,0.08853411634089192,0.40960532507807135,0.23306888697789385,0.25285657321544686,0.38523307510799243,0.6236833959339292,0.37232199409541544,0.3878055510170326,0.9964971918329022,0.6410821867381338,0.7356056634909298,0.16502522020264188,0.3691738461088687,0.686693169765298,0.77903539672131,0.6309456477044393,0.8444640633867442,0.3900577161252361,0.5354639790086995,0.5605507311494748,0.938991765922262,0.29178890718802575,0.7458935958270105,0.6685459378592922,0.39976726073343594,0.4913083145641788,0.9500184096293312,0.24775792076873304,0.8413020015979851,0.7046209852333938,0.46522361703215087,0.2575444602759369,0.7252813680516648,0.892719136968813,0.3881543430677674,0.7080795156224484,0.36890624024180796,0.25873333866065473,0.3775575965903557,0.8315345294156145,0.7968370841627923,0.2198397628676736,0.8489109438770455,0.5308044019369877,0.1136540496672418,0.8665744314788302,0.5186547217155766,0.752798057663284,0.9899380919156324,0.12163586450774977,0.33018370383247087,0.8354164775128523,0.1134195877616413,0.8687820052191277,0.03680018893029957,0.07194270146808046,0.35348750619571545,0.17066021808961152,0.12618875576346533,0.13228539524905125,0.8773737818018361,0.2621100503775926,0.7423832974895663,0.4911262067136022,0.24220734156621604,0.16723802633800533,0.9985999559783572,0.4152762410258892,0.1955194312426225,0.36940847046145064,0.6225277680689971,0.45870735471652213,0.8511151226543638,0.922605535251732,0.42548539098436144,0.6777135905249536,0.40784761672786773,0.8710063311150968,0.9632107365178542,0.23562862573409205,0.4669539997309753,0.8166351986782658,0.08230197596282562,0.5885133890016265,0.5624183331634323,0.3216537095853218,0.4849374624317133,0.17225723114930158,0.6357516176836504,0.21174988611728418,0.21505264774495347,0.9764977148928657,0.15664170525887933,0.8000443418808769,0.7352369619967878,0.43907752925059373,0.12926910163540994,0.9318514987922872,0.4693435805446857,0.07300291377751122,0.9143022296920122,0.0933044497013995,0.8782625533633088,0.30559122744447387,0.6966593592106622,0.8759260467813546,0.05803961489411247,0.19126061189134136,0.27620206745626463,0.0282584382779012,0.7461572290437419,0.5371106494048048,0.7897736094228869,0.33817905339684673,0.1778672232634757,0.5874815920546992,0.6341408000425721,0.9920998609425018,0.36092297793414874,0.3060287795277812,0.17458689703913488,0.11428290694731036,0.9089367893410927,0.8927389549957738,0.721375434542705,0.6878327624619409,0.9079860711066348,0.23139549190757625,0.5345932730438769,0.8676648297767289,0.5299959003957113,0.19367961326000893,0.47812271196285483,0.22446213497414558,0.15833397161561868,0.3299397661957282,0.8086800201200472,0.8225723458809777,0.5972840809470288,0.8888685724448644,0.17553188269025255,0.7841926445875123,0.050321973028299105,0.5703070059598316,0.58134963297952,0.07476691949568215,0.9975996669265823,0.9095160181966531,0.2179668724415207,0.7148387169020902,0.10389457970069516,0.6661691472296514,0.9157071943234496,0.9365886691969258,0.3476125789224451,0.12384517829689234,0.6178175212348382,0.24622210263327693,0.24537130014350161,0.4564991276392907,0.9669384294856451,0.5458201484952658,0.6028111145656885,0.2833436387963728,0.8578403288308938,0.8376931556052163,0.03163965308892824,0.32406785472818744,0.16374873113764,0.22648616375123343,0.25227573540641113,0.47208821877316987,0.054045680856209755,0.3488400820831312,0.39014286271182597,0.8273355645291762,0.431170775146672,0.9951161937669661,0.5251941798659083,0.1291219042914471,0.9011620819926185,0.3643145862497068,0.7495662162078298,0.9580740500602409,0.28702904424863185,0.41659268225273016,0.2754012404438204,0.7221726647747078,0.9143825455040839,0.051511613031423265,0.7393305047318459,0.18603359423555843,0.13988212516686582,0.9202338796165104,0.35121702879914674,0.9125546370013458,0.4217720619842229,0.48447873667874,0.9937590088674861,0.3964038367567375,0.9712336170163234,0.2139858254176925,0.07166414757640971,0.4469744146280603,0.1164153679730271,0.9320636521051751,0.5033166853311075,0.8760535583163711,0.7579114828798996,0.1376273396528187,0.715120040734474,0.22496434616965022,0.6055258644834844,0.4845759063554378,0.996542881315603,0.6729323058914805,0.16451414155955035,0.7575779727549321,0.39267694049396784,0.3926252853320451,0.33704798791554014,0.15234101932750543,0.22694640438121794,0.5442156279072561,0.9422773895389562,0.4213866268034874,0.6729851514080727,0.4094637114698203,0.1408056393267756,0.880671829782985,0.3310301041254444,0.9550809009693546,0.8664141390044584,0.5662603034508245,0.9210511610360053,0.9269612739898119,0.5720229124996414,0.19043002822488697,0.9803038351526276,0.6382787329384243,0.5248234267056582,0.8240124918456444,0.6751371678959048,0.3569821357376788,0.1702788569910325,0.05503024897537401,0.6824817227067104,0.05027024305054417,0.1596108056655925,0.34599035009646584,0.878679219468429,0.7511134267543562,0.29560485563480987,0.890303973829115,0.7353945598230311,0.7957907404339295,0.26934854351615667,0.46809829176539464,0.6874602275481108,0.7220229722004767,0.3748252846082889,0.25188394840738626,0.9458345347899408,0.7471020846048866,0.9490194541117987,0.28132217452350794,0.07645317691083164,0.08173096257629875,0.07403357718511505,0.20218302675939825,0.3202169811707032,0.32383123590401985,0.5422014602197232,0.09179236252310696,0.7415822597224193,0.6420815807692728,0.33451074558049365,0.7356652405564508,0.5435797151779942,0.6209241330203443,0.34499944776008595,0.27207950261825586,0.9558485614739229,0.27564462680761337,0.9961615052836184,0.5876137259791587,0.8817377469205143,0.6001754102023995,0.14638625784616877,0.9949441341495693,0.9286627890675239,0.16216882874964744,0.1640167285362928,0.9443325605801063,0.41443116085468956,0.21682204006038375,0.7555208180678004,0.8105585559710085,0.6255653476420515,0.3829118794090931,0.8282115061518185,0.8235706789926258,0.8052494739141904,0.15241759663362298,0.20415001809453526,0.7447748278832784,0.7718669991283216,0.6048094895107137,0.13113207213569988,0.6815356790852021,0.7633574668681979,0.16463532553119253,0.9036923101201078,0.1768454111573019,0.769471061210776,0.06016606192723928,0.7822971379897574,0.5357954068371977,0.796916586594109,0.2573442918087845,0.6459195055680493,0.13889225640696035,0.8162540100056379,0.25229800285326154,0.8707414234558022,0.09262966521137672,0.6576410740154357,0.28529106225146905,0.8305637134419463,0.2046001914282154,0.3654574732201634,0.5858639297811696,0.7742462625622168,0.2583868963043525,0.638536102019921,0.6336589660203704,0.9868162184931486,0.40091909799373715,0.645138311904681,0.29736101401897175,0.8822647574890465,0.02852406081012493,0.3272129739652234,0.042701094305300114,0.5377094484438101,0.12751680625370665,0.41062895203896455,0.6350094596457319,0.1712694218149362,0.8625311352811023,0.2157720290942824,0.49198006395111715,0.5203080293391704,0.16826073027122135,0.16189316410060273,0.6538118820217533,0.38165341907478756,0.7705132597898607,0.12641043341716895,0.6810325481764747,0.09596715364120367,0.18854002936990932,0.9072171203047952,0.1302376687251119,0.7143886328178273,0.2784503882136402,0.05837545076936834,0.9593120053588304,0.07077313090358017,0.43978858055373093,0.01104219310589305,0.3122147102052699,0.7600906330569404,0.5707691798527541,0.5085824003966266,0.14647483730076982,0.04454527535820829,0.3327209152781194,0.016781926696257443,0.5742008134448089,0.04550926114532072,0.981658482402233,0.13096990534222952,0.34641718276902544,0.2639811226631834,0.5327094420076286,0.2701765057314587,0.2543721202167015,0.5088752195984207,0.14497377977505121,0.6408567099535094,0.3542329614920354,0.5105187165253315,0.2522841388682311,0.2060574028179829,0.08156880392688826,0.9842927724569275,0.1381393753373199,0.9593228938151219,0.7381346254038834,0.051413093287974165,0.8884128442474184,0.21361752097575137,0.38736557235355473,0.8514217569478906,0.952757256705818,0.6213237606216828,0.6325511550299756,0.15588225997657523,0.14005937252792156,0.589145755751463,0.6778873135592167,0.5978701437742331,0.8753018622581896,0.6622242228429478,0.5075149565241064,0.9194699343092108,0.786411319757581,0.36824346599773383,0.45400813064710865,0.4226338306234785,0.3159994517426521,0.47594106604967035,0.43948447913952404,0.32873657649573285,0.01156580024557985,0.6938224452483523,0.8995534890512993,0.8465471514383993,0.8746965470866517,0.11969352035321701],"mu":[0.8816364923559832,0.5773299119704123,0.5748192628855588,0.043439875218902246,0.18309031095862505,0.8767987687727585,0.6357031379424205,0.9942628865574925,0.6360664975131822,0.37133450011218727,0.8246470997102582,0.29390447330330116,0.847125129037104,0.8763136040177903,0.686477961399351,0.3803870075076323,0.44907062526254093,0.218048213401836,0.6215480877576509,0.17455298320814094,0.7030579067324207,0.6994406022520447,0.6973611809868381,0.4526530390620207,0.006535850854922698,0.03707127071327787,0.15595747106070035,0.7343572438194683,0.33160201012338986,0.9798893474170032,0.8722512687384525,0.15780835131265336,0.7229255979437557,0.7136138449749769,0.2877557050378474,0.5076764934626812,0.5748822335160901,0.8979297242587552,0.4299279671740075,0.08317107007835634,0.25372031454263655,0.21682452388621987,0.6423422810571562,0.839234200480931,0.5602951285555098,0.8518972485181806,0.3084437836878291,0.959455557940641,0.9065198195140112,0.8438985822277498,0.7906923463364266,0.8148464133709081,0.1102114481466252,0.3835799682759049,0.08842689991836084,0.5546619897814573,0.09269969977742099,0.08324699069320496,0.5389565728125769,0.9429469739623899,0.15443427163909162,0.5616655693117685,0.08063226577650395,0.7777313507676011,0.34984161985730133,0.9013271055987888,0.7743406344267179,0.8001327232425322,0.31273725724564594,0.701995079134845,0.1422069976340541,0.7438547765391037,0.7861014814644915,0.7131536178305935,0.6937501145214768,0.7767929056455778,0.7012083878195534,0.16177050123492798,0.6894614107170507,0.0459072654910071,0.08233300556509415,0.8837345669077838,0.7866312543021878,0.7583016574513666,0.25716825116328335,0.5117134997551698,0.006857172243021514,0.3240024356181024,0.6538399247481526,0.17105017423369695,0.7534296177895772,0.12303100120949662,0.03253166042979516,0.7417596280681908,0.0534358320282724,0.7911675462019936,0.6837748609278489,0.8694178191685173,0.3541120829463573,0.21677592436112758,0.5679480156434726,0.955255652677482,0.3626461134017611,0.8410696218988187,0.9068547508379792,0.9726935859710297,0.07227806151110427,0.40613531311067486,0.1127269902313417,0.1593873788577389,0.04158697355664631,0.2155161089580213,0.5817191903461207,0.056085377461735586,0.12651119564618152,0.967517572484559,0.19594881131207154,0.0934744060256274,0.580123454656502,0.07185646686241576,0.1802842475421027,0.6545057907023226,0.339114111915485,0.3567246401000277,0.768402064112385,0.762093164944954,0.18526323351320895,0.2988596748030403,0.9381891099130146,0.36600653151618223,0.8555207984751783,0.9163746394098848,0.6796634902265581,0.8272602620023359,0.18604103502918123,0.9060216093356832,0.780913285141497,0.2193230189507882,0.7619265963846946,0.3273301453985269,0.06709975633866905,0.02510007674970871,0.8875939725254809,0.15055262282431103,0.042381291048284586,0.5201577322005497,0.993701951944586,0.6427554920828531,0.5917032173122541,0.19484661427158234,0.3677796724116227,0.8960555764192728,0.3795794592439463,0.8425829744443798,0.2534279016050427,0.08929892460994138,0.17673260648478117,0.022254174047069197,0.31026454243202006,0.4761335335974304,0.9084079673141556,0.7033683881418198,0.26159009123437427,0.19812542917866272,0.04450325572253511,0.9550203227133001,0.15723141213248581,0.43657661069604825,0.7946996412856531,0.34722482431770074,0.28561413362685806,0.9144191142261129,0.6336508119380762,0.4030461837861079,0.8291479079093265,0.7291318852076123,0.5733801026958185,0.8092707213221599,0.4500090192088877,0.008941422499073148,0.9576592803393893,0.38329858635399594,0.4874194747181375,0.767002734395811,0.1464436762896859,0.3601814809593018,0.41382051906415085,0.8535037846500295,0.35535211871288364,0.5574344786216312,0.7459907879375529,0.9945888174725812,0.23852323275759457,0.9711828258174271,0.9538904875126266,0.9087869281102086,0.7166356839244135,0.011910773298407396,0.37959473203526595,0.2718414891598222,0.6333406267986257,0.42321818388164445,0.8528655365550784,0.35577063856258806,0.27935239940945245,0.6471434127761635,0.6233719105509057,0.13470009389240034,0.27849586978460716,0.6753542029580759,0.1728777111340296,0.8444045089039411,0.40533525101674184,0.9371619643227451,0.7109933457471209,0.14704752454943426,0.8969770740412197,0.8805860633981981,0.3158493822084525,0.2602050302323542,0.8749071686476233,0.19991198005197242,0.7835071893947612,0.5419689559486118,0.08871211930386935,0.3739760804202463,0.8018708499437153,0.2545107141336769,0.47289875320652963,0.6940652633281708,0.7531973586241765,0.1372199867160655,0.8136468410649271,0.596267113762057,0.6949640174993321,0.4316294877629634,0.8375835796631244,0.292643832593668,0.2322903145258659,0.7407226888750242,0.42539676217224365,0.2778857449409837,0.5633097873973036,0.9493095416837087,0.13471045859741837,0.8168916269184456,0.8871992884261723,0.8357652264718076,0.9245851276928234,0.185338624994289,0.8997327188587538,0.9298450550135542,0.7486179095840324,0.5396304007519035,0.015350414652175015,0.7041299812396526,0.28924438183745504,0.7339578856175675,0.5687409080936776,0.9386265330684254,0.7562727587975955,0.6732023938785308,0.1751583690050873,0.6886645866609165,0.1958187486715237,0.6816957031754847,0.7618976950984206,0.4616489895252449,0.5204431083577474,0.45418840303468366,0.7692075635052651,0.9730542927687877,0.18365023906243194,0.552209515335214,0.9199990096924426,0.4805632416912704,0.8050903956797222,0.6062394634474961,0.8503668982057742,0.8728085319483014,0.14557716014133804,0.23523307726712228,0.9927323343820149,0.34849390531082225,0.597156340591054,0.9686440427366521,0.1242424954402983,0.5181964000861823,0.9615612982814403,0.5444361410882292,0.6337497672425276,0.5071080629073248,0.0869682845592139,0.4715670941914507,0.605374605006237,0.3386521634015194,0.9687833114805515,0.785035808789398,0.046095639465620675,0.856383733792631,0.9628868941788311,0.8668579707199049,0.025727444028605717,0.770309760426491,0.4524414174877569,0.0064925443389418636,0.7805264312187852,0.9376323861630473,0.5898345127056526,0.46246310301378313,0.10677000458612551,0.37640721937608856,0.26230956945346784,0.9850011042486122,0.4025689306251039,0.4911558760372807,0.18845859871687232,0.5356737089269046,0.22927943711905163,0.929054528362447,0.13616722276477322,0.22213659744599656,0.17751392672768662,0.5262776762180692,0.39657904621450535,0.3660451528580766,0.8335274967725255,0.4252850156200798,0.34654502026657186,0.5810638318467312,0.9560664651242428,0.04709233469538465,0.07965280908686401,0.11254656253192885,0.4769904917963077,0.9436799831620302,0.4511208003835969,0.11288678708791866,0.4562224390844274,0.6855143503470029,0.5111641255637307,0.4254235483447326,0.555939066542531,0.46997882047554373,0.686014366212867,0.5295378731278686,0.07945814893002567,0.9864974863836642,0.5445677068389683,0.022107534857240596,0.9749947405889012,0.28416531460868666,0.2041061574023859,0.5150749398164336,0.15536260976962146,0.7097912829885813,0.1075837721407602,0.11294385292881204,0.42583364754338304,0.3691711987889519,0.06647340701961535,0.11955585664741619,0.4275198526778956,0.23444818157952207,0.5293773121184264,0.7571758370612338,0.0379637511578963,0.9630680122307018,0.27986213044746067,0.4605597873153533,0.31222053533770056,0.25615646233398737,0.6140279885788047,0.21139717931512858,0.8705718949155292,0.14499892845842455,0.287288475255419,0.8491857364692137,0.03568830959602809,0.09207200423998807,0.5650206257423893,0.9726797898967767,0.42641546323862145,0.3504607118800276,0.8538732858169942,0.3103932563798786,0.48718570743267553,0.9898615008948262,0.36377466453964336,0.5749566147612155,0.43420190312541695,0.056568697726979256,0.5382736868968363,0.5134856831486669,0.5418755061494185,0.929899605954658,0.19850000119515543,0.16181256152043355,0.2236334942784033,0.7561221273417578,0.6266366262254441,0.9132339205904421,0.5797834203556744,0.23863497213947227,0.5111339731852986,0.146973313014513,0.867284860099145,0.12453412930715602,0.028505857366472043,0.7292089640396351,0.044265119855228185,0.7744503828208975,0.3334829949465261,0.41033108115086336,0.6458762638935733,0.7087425079772001,0.2080966838032572,0.701639476812387,0.5854566054922945,0.014178735544042365,0.7589978220944227,0.29385260354068077,0.4447174227680326,0.7890461346652364,0.27944986044095343,0.9962395879708854,0.301011208179236,0.23666742642998972,0.41917491457130973,0.6671116660683509,0.6199053811610686,0.6586637213214219,0.02507349017284599,0.15895568644104974,0.7916185981693762,0.37660609654864463,0.7693128057635787,0.01463347080576094,0.2941347052778531,0.4508208350617129,0.8629948574033139,0.8818719540899902,0.48417107474967724,0.6200085095093646,0.5336628533837975,0.12684126307720955,0.5179696748417595,0.48569916204162045,0.315818165820833,0.41706927748647815,0.7320298377999961,0.46196840136412276,0.02000906271656122,0.5176428170843033,0.6053026345084918,0.21758941272091836,0.3940788035075973,0.5613674843513705,0.5086724380551191,0.9878420455759567,0.8525261165549896,0.03001555199438788,0.38123361835615843,0.6538223177848859,0.5167905421268353,0.6260345181051208,0.5946579561917062,0.48539399786515713,0.6939591811310835,0.801500726669486,0.5002598445482072,0.7921417320354933,0.11539418690241288,0.1478913867282805,0.20221620232750603,0.41404198544998994,0.47478887118505786,0.5830239594963409,0.12361207489136894,0.188092779597691,0.8550205178545598,0.12782094014631862,0.7451732713320989,0.6683132774481526,0.5806475289966995,0.8294906416535044,0.1681908533859091,0.8977822572510903,0.30661844508414404,0.7623363107189791,0.7537626002551376,0.49390251051280987,0.6998002922682216,0.9842723712707317,0.891190060607753,0.35624511429333716,0.9240869436549415,0.9167547874337014,0.8986596272066045,0.3603014702856484,0.5524196074678263,0.7159411957129529,0.530429600565185,0.7229966053182553,0.9415974470266866,0.7991570219620083,0.6792373160157115,0.8261114420735125,0.44634002989575383,0.6803271094524348,0.06187419938581429,0.03644777361531881,0.21825392763740536,0.23210450553393747,0.9934009963493919,0.2942571710232247,0.9328340505360764,0.9703031353352338,0.7405327388220877,0.7122370064837067,0.5694430090425497,0.5691611531565373,0.5122811715980939,0.1687982513713513,0.8771084969839786,0.24260740994583463,0.5920802064243411,0.7662071585143382,0.02105415414573608,0.9158393421616897,0.7669967529909001,0.03226960633505316,0.14630788402726713,0.4813901342205742,0.7111539086017955,0.7808369403370004,0.6304050565754429,0.9964903752704448,0.05481962521573225,0.021008096154083056,0.3274648173951398,0.6711326214382713,0.19278447998656656,0.43009322446921106,0.09190339867747754,0.05134512725715257,0.43353379021878546,0.9880111578993636,0.1813862669673736,0.9342749746560652,0.28673080058304645,0.46234898188779683,0.9176373875340267,0.2191293551340121,0.7194399540616618,0.683633305462769,0.03826348759496545,0.032155531180604324,0.07204487610983867,0.5651664188608476,0.728159621352718,0.42239945749745855,0.21089304441975343,0.6733466611187551,0.7106456230319071,0.28618916361920554,0.38544460394697033,0.0033891992108749935,0.1286017964540913,0.3517124719266067,0.44573416711515934,0.1522983510607081,0.07588867015672074,0.6103605399236822,0.5335340932426602,0.05717582366438556,0.29816695256803905,0.9799926425352767,0.15483483982186907,0.42572437953816267,0.9093976744095,0.4084097684674841,0.47625232061863576,0.3672793699844794,0.6135386752091472,0.30959402670966685,0.12293363016920078,0.013391625845491362,0.02447371031147183,0.7791181672196501,0.22178440980480807,0.04971776071343137,0.4327921664539913,0.8764393331223501,0.0022356949835806716,0.9720921139721499,0.6569359985603547,0.23722443308745533,0.2825777703716066,0.38574660553710927,0.1452663711828026,0.9935336753287791,0.4187142921660476,0.6334578168051521,0.7066548529396754,0.9228128709654428,0.8213252211082354,0.15239389939465653,0.5553493664517726,0.1329417758865703,0.24629495631660547,0.20551346312841012,0.9808747799801059,0.24074490366331425,0.6889347663143757,0.9883002249451396,0.1769093672240536,0.1945844686189655,0.6258873193909433,0.9686317804811042,0.2553698460523406,0.8828085056469024,0.267714024271527,0.581970530044136,0.5573925527489083,0.9573764645932716,0.26235123695063023,0.37187006717054216,0.8722669319670848,0.2624863191283453,0.18404347919258468,0.1824151522663231,0.5314083160796739,0.4750108018199435,0.1642134848311434,0.23842034431723902,0.8124809678441984,0.7282067847081497,0.7438580010256608,0.17803635362407078,0.4058163720194212,0.49451580448003174,0.42050694142051137,0.14675810413324797,0.6678385341270321,0.09137481912629486,0.7997736401947657,0.02345547639770218,0.9753804849520229,0.2705554800539902,0.4720992516964484,0.03587945742684662,0.7904730860104374,0.39386967597025246,0.3761863323735639,0.7602845820885593,0.9797297944519605,0.9390282071021094,0.6547410523109725,0.7895574167961077,0.848306787325984,0.6686492746164787,0.4006927799167095,0.3539941620625595,0.42492510724924015,0.5615613732053679,0.08342224933384945,0.7846747777052894,0.5880918342862715,0.5471958592843109,0.14789541641049864,0.5289455930742164,0.03088306167784216,0.2700157732327362,0.8579453162063135,0.9046120250175058,0.9390417381638965,0.7360499049095832,0.36223394739533,0.9496762128042875,0.7360717657114624,0.6139087364309794,0.8103107037190078,0.15906311755805258,0.22516094539861942,0.5977849657330783,0.8735107317956738,0.491079744967442,0.38250312417795107,0.7328468809624078,0.9062241676625804,0.5200304293441689,0.2301392081443414,0.3697487106221362,0.9909390270683318,0.04692878484755192,0.07172319690303319,0.9969699311756652,0.5113053459533154,0.40622495870986475,0.19830995782776384,0.13583574582363434,0.7320440283395095,0.05833609313723209,0.9263072332833624,0.5048850604819977,0.13833598464842511,0.8653995125377683,0.3434318732547943,0.6779952412215848,0.12005239440483684,0.31610062228804603,0.6924000090571056,0.9194584989947161,0.7769665576904874,0.6839642847246605,0.8254858245179895,0.017265228214836448,0.12606784227878487,0.12414677687000286,0.18772141221891703,0.8578508891378518,0.012450445608758187,0.9495913319149862,0.18572497607463223,0.30826585504705517,0.5254965672954197,0.36402850657081043,0.21759418012262244,0.9242811730833351,0.5640942006938658,0.39072110354925504,0.5016439614595474,0.5708289507030075,0.6700603544067949,0.8872973015330488,0.9572491418504341,0.9197358412448942,0.6577332871385875,0.8925576769942902,0.015085354279412044,0.9182343468030816,0.3772109121502385,0.8606066613438437,0.6748810427705478,0.19369795293408676,0.5796213143777642,0.5182250074156223,0.9022593587332386,0.906989053365,0.9702217633276602,0.06033135906351261,0.24238376463590594,0.42429558389278554,0.70005115940541,0.4831707057772272,0.027215857697971302,0.4353818029117551,0.9453505712285204,0.2505808262738345,0.23287890070525719,0.9397003130489372,0.022436510267905385,0.03890047962441345,0.40039594313951543,0.13942221509321584,0.3639307128868823,0.4157596121090077,0.73949347738485,0.288559568731938,0.4755349941017233,0.012129951356458557,0.5668297396815039,0.2250636657266727,0.7285198526702503,0.6490126468558142,0.4882348099343705,0.5631331761804705,0.9945488318170601,0.9138021479738727,0.082949286487076,0.012997395280384128,0.3714658763477392,0.11457962515655895,0.008501904706109453,0.13955685509838278,0.46416722936616317,0.14836553767167193,0.9424631124615022,0.6470735732303663,0.18393554650939947,0.6879909139515452,0.07161644929842392,0.19960515209679364,0.19228694538626212,0.7890811139177463,0.046741381720196484,0.7115485604454965,0.7719211427049872,0.0865644427204435,0.4761288304891882,0.37885231964931876,0.7104457116706901,0.23984671512068623,0.7191081887628368,0.026285757671004273,0.24995223209057893,0.2411473259354635,0.5850358606078416,0.07866334397448083,0.17627763968604793,0.6242833732004993,0.9115257560933194,0.24656785412084004,0.19149849065289004,0.3529581396949746,0.49392793518742506,0.21188214643409609,0.44672814601612343,0.487061157942843,0.7634959581419114,0.21987248959937644,0.35812799656790717,0.16619672842034983,0.6222181566167264,0.4032325743909657,0.8987456756092518,0.5933307490993744,0.09311720381633726,0.7405849278246184,0.6367442083618862,0.6250627228624668,0.030857477512266085,0.9615265017393952,0.7888872132711955,0.6354483525872427,0.6721412931596773,0.15639284132770093,0.5901519205163328,0.8718018756241603,0.7173461225051327,0.0013408091994635551,0.3912706346998891,0.9079506247492504,0.7171680846695829,0.595828146876286,0.5091448759792447,0.1512580324083379,0.25720994904741334,0.4351914757064088,0.2777687135093978,0.14903246801709158,0.8489003983853978,0.6216364055134485,0.9402892184265583,0.9470256081515118,0.7856317277521854,0.19748479134278085,0.3643506463584447,0.9970836215028964,0.5352950787647421,0.38284054232335185,0.5517009484986597,0.11605345218230378,0.3645636049953982,0.8556686803348788,0.2542001124870532,0.843807427582544,0.35214735973259215,0.8267188638090761,0.4204435635009034,0.9681647920766685,0.785097107564231,0.9355933651434654,0.34973892995432876,0.4522697833177478,0.8468520574885561,0.34313131376770944,0.6063716914759036,0.763766716336008,0.11971165021038921,0.8756402103199172,0.6449893209150435,0.14392071890654679,0.8687043094463416,0.6879286313385993,0.9989903176623567,0.5285263968321854,0.23606232716418796,0.4468053177649327,0.0005729495034594301,0.44417492411908954,0.3316630774609628,0.6306209590041914,0.5047996162669193,0.5260179349142242,0.1146688072301465,0.23967057230993905,0.46325552537031256,0.4953021314552537,0.17889702389302697,0.0723417387285954,0.8616635552775698,0.43942753328981077,0.38252153830776026,0.8165798028549229,0.4710645453682969,0.22571169290060755,0.9356181940979562,0.06913169095725014,0.12035911320486781,0.4657733633533838,0.9166964006129541,0.8497462482236409,0.889855139808476,0.4037323195074425,0.4431161925063809,0.6221051564155626,0.07758446062335222,0.27964552476522164,0.7167558935721623,0.8072996513029851,0.7132178626744183,0.44791966308308573,0.12468286549993901,0.1659391958216061,0.9480934546047404,0.9266095203217488,0.9810965276401826,0.4440072054096935,0.2002481315432434,0.686598672535023,0.8056965102496685,0.7517084650157522,0.8808954991284372,0.5583212648179969,0.5198837842684498,0.9446890152760612,0.19495818921475405,0.3674047153888107,0.8412753943255322,0.1639228814373741,0.06929349154155506,0.3022314608490575,0.4759930417483731,0.5137638465668917,0.4297384988677231,0.595307604660142,0.7354581367590147,0.3356929005529279,0.900852435933976,0.3380905731653281,0.3548942732033076,0.4464562913372463,0.844617397130293,0.5025509375378732,0.23743585650934795,0.8392195710915735,0.050134811583236516,0.08886130135853154,0.4764782905474252,0.12340115924416395,0.424485442491519,0.4217854621678834,0.8866896903493158,0.9788298137321376,0.24881600952255822,0.6920883485805778,0.4004662027375263,0.9049673910585643,0.27548711438455875,0.9098600616145556,0.012558481709277425,0.7641295691932279,0.3264411752777585,0.13438056801940323,0.15819915226209424,0.17794794914800027,0.08282237757373356,0.9870609594873703,0.6792437625044025,0.9532253212981592,0.1389120104208017,0.13559335906042613,0.1689019202013209,0.2621037535081856,0.23472306857605685,0.8868946478195343,0.7516896225021927,0.10382543832153002,0.3341392290418279,0.37152345196179026,0.967825265703461,0.17159592853811323,0.1838278172285639,0.6295269924239237,0.23205402433771938,0.7067349989578682,0.9142848773539074,0.8372692263614872]}

},{}],69:[function(require,module,exports){
module.exports={"beta":[0.36655902326738876,1.0752872955898096,1.708090445039887,1.5357506036389823,4.320503701152417,4.41692037292716,0.3739468398194601,1.953050516989796,3.514743755118377,2.6832250920264067,1.5329464570876328,3.22190954835754,4.6017213813925455,2.999582495475245,2.9277940212028977,0.18621622959200557,0.05574803782081972,0.89938237570233,0.8821986825941186,3.2974649004376158,3.5854429998644175,4.9401749551808205,0.5313204242323621,3.8885913092576763,2.9972458853338404,0.972474957154218,1.5965447497647056,3.7611640648929487,2.8112576409366286,1.633965161903037,2.173826592992257,0.34515738899212667,3.0675003025991696,3.350895976092411,2.261210271906812,3.3081449374742222,2.8392660637186196,3.8275599947542482,3.2849275934690345,0.04650281608065576,1.340552342121727,1.324626520058203,0.592213283728078,2.5063010712040743,4.255824522636922,1.7513162168537477,1.4163759106748774,3.664130371526281,1.1811626105100248,4.476901070630523,1.2582902481349312,1.8908848119371402,4.0001505845126015,0.752554551975877,2.3340274339244695,0.7948648124174973,1.5707100918745676,3.3654821677595805,4.821504557052741,1.2783773179347713,3.265635272292343,2.972251538906936,4.4116912604019065,3.419915734314345,0.3869275154725016,2.7340792926496293,1.8044491451042988,1.2625810942003068,1.055740724575096,4.324972364551566,2.1607891028079984,2.965217324074322,1.4643472969326154,4.664895719744498,0.6327982097233864,2.1557038125705974,0.23724586593761643,3.1487993855090632,2.9140583058251224,2.7115590810282453,1.8871145731826744,3.759057556568263,3.5669114229524146,3.2883967273530224,0.657451965541288,4.523155756624493,0.008829286048476215,2.633336476343753,1.0061475868837955,3.758178465116341,2.3979197220334436,0.5463407895832884,1.182452309175085,1.5758237343530168,3.0742964800316908,0.7722348533437051,1.5771922692414464,2.7140633027873715,2.2275836447974062,2.5147929781930243,4.422620562392319,4.194143256572635,4.608257439439533,0.31945907848810795,1.3550073127701179,3.3991879190032295,1.846583252486691,0.3804294657529794,0.7045165834207712,1.4719494134584032,0.6173628039688561,0.17867012299868312,3.942755378858066,4.237315214636653,2.1437782026810073,1.5729508018411376,2.8476601482966646,3.7025981162518526,1.256169881966035,0.49124213391266935,2.4271947078738645,2.7723690351044414,2.804897874886697,2.93197800063147,3.409623776213948,4.258916192496191,3.4180172768078467,4.812113009202898,1.4347963089892446,3.4894070128970798,0.7982675243457737,4.014768875190886,2.114070204496427,2.9096628982346706,3.5925541673627013,3.4646604114309043,1.94003329388297,2.577987626137861,0.4130590416177349,3.2554747394499883,0.4446518886746498,3.168921086189107,0.2006948978683365,4.565959471627109,0.2585248226142356,0.34369663934969874,3.47691948538414,2.695251230128377,1.3275005186943656,1.1503249061557896,3.1236321975517365,1.8336567202355203,2.8356039155475488,2.5876928513612665,3.529567256074051,2.65745084881422,1.8502119967103137,4.89289512921924,1.5810626643168746,1.4921153050344271,3.4156905452119632,1.8156753338396492,1.6127099203758855,4.073109108503817,4.809200814354041,3.1505453063973663,4.255804815045368,0.23937463721252716,2.6518011588190338,4.463919403480028,2.5001454624773976,3.9059746401643625,2.963567885713222,4.707839845637965,3.5377910422126457,4.284704787909734,1.0508455848148412,0.47148777607033954,3.586988994938869,0.6537816240181238,4.25818868381826,2.218763753578229,2.4492593493985018,3.68535026701268,1.568859680547925,2.414570528821044,4.117922300735297,3.0407000418744268,3.5210213066152085,1.7587296207756453,0.7802978833481145,3.1997368057507716,1.062029720148966,4.707852420569072,0.5497139665063011,2.4283150439376056,0.22606169422443978,0.12784437273802518,4.4473598586728,0.6462660216879135,1.1297012699466191,2.6653632077821463,3.23485519761614,1.680029800042897,1.0366466581924638,3.899946163798551,2.223734188419282,1.552985127627745,4.788847276759381,0.6655815403838938,3.8007669204448313,4.575211396765884,3.76376820420825,2.304932225260533,2.4254433345253865,2.3049996770548606,2.2754664039204284,4.445981540187889,4.183934931403565,3.1263504871606784,2.7620401948006403,0.4789081282280305,3.8068571323900544,3.1596679507030134,0.8547530134296977,3.8988801613149437,2.74782965067358,1.0066891805507394,4.091160751160933,0.29532926836143947,4.879336910821788,1.1431920666164608,1.2167293736700724,1.576924260588034,3.3500821840608785,1.6958033298452035,3.0096344913070396,1.4843812934242007,0.8118342703628856,2.943356755148482,4.3101331559411005,0.6158320589566246,1.648250731014872,3.4647143588853533,4.213693012998391,4.907762680710581,1.4342351178882407,4.569913609687312,2.0744765171511927,0.5494757633436231,4.255039248461721,0.7019086898763183,3.2770758103061617,4.770814446530749,3.493571753275002,1.0375135241024203,4.307181556911408,0.03944768110281216,4.074594666020907,2.1986431643825997,3.316986824210084,4.068466698132035,2.122781374835483,1.1503758936019726,3.0826798374255615,1.5569972833008883,0.25638066517473135,1.059587256610881,3.537009880665778,3.253671964886916,4.68579662104712,3.237993982586196,3.0517324218169284,1.7470691582918951,3.1964443121535457,0.6291222264563778,0.7314750400747871,0.4759718513559763,0.16862345881218377,3.3605700264110014,4.576123683257846,1.609092082101502,3.8292690570681422,2.829991810334734,3.8967280857733835,1.381301063349727,3.6194513915017277,3.613801850673494,1.3569651268006,0.07517127064453843,4.746916517857279,1.1115336900282968,2.040330574983953,1.9584237293013385,1.2621378677898354,0.607539386727558,4.881065313351812,2.006351610259114,4.88456370039898,4.782575102448449,1.6323905088313528,2.9887654511122017,0.07340280210835881,2.5099913377745917,0.19131410840617535,1.3492407139187679,0.8475435370234197,0.44144194567387496,2.1559826725241713,0.3045855476776249,1.648398342752816,4.060281261311845,2.4320277560013115,3.1309803003198864,1.7239692904364534,4.584352756579889,1.7590624276712885,2.6669471454417746,0.5966411346801814,3.6833087836519605,3.529017428963974,4.606564940089228,1.11227419773958,4.362090479623294,3.4899288221727476,4.5790428307105095,2.101245294368553,2.7864268667791094,2.7204219181797873,1.3759245406849863,2.7779988673570646,4.007704819945489,1.8980525475562693,4.316769699906841,0.9233510236677933,4.256766061411199,2.395244846131429,1.6991692444760453,4.532937671245568,4.901788974011376,0.23795084373022912,4.050494672204805,0.3080755710494676,3.9243279341081374,1.856066569505307,4.278189531717968,4.537607779570304,2.9114133718012605,0.9557670340091562,0.7051525768068057,3.9999686248143695,4.370502108916044,3.9254633235155367,4.820522660823777,2.981718084478241,1.3959439489942727,2.6245138576368254,2.3197839726093727,4.977206869458764,1.3871170837671598,1.2851953853508824,0.7885633117362911,0.5790551441335912,3.0861559528315405,0.880200063209805,4.983224502293952,0.868273009549364,4.118845330990911,2.5295167184769696,3.4188794100657494,1.933193810643472,0.038688066718525205,3.5856481521497585,1.745875317023341,2.429714596865662,2.9208025597120013,1.709092767163809,1.3448935412398177,1.4788822040032545,0.45105174594304076,4.700834087536228,3.588343090870402,3.9904553583643776,3.2412545923140055,1.5836556691163461,0.1497931188418733,2.41557937709977,2.9125648407199,1.3247035035710575,0.8388283291521637,3.6849427567810245,3.447173157104475,2.7431234631212096,1.7226366606941879,1.9558658080206137,4.542248352995831,1.85569137716182,1.3556358825145587,2.328782696368693,2.352756155545639,0.4024265986734188,2.616260348665506,2.0721404419365994,1.950826469612953,0.567531854497586,0.9756436229571419,0.48693633966619077,1.1140896051001725,3.770102609402215,0.18450107505991742,1.095528781673858,2.727115738091288,4.469663414853628,3.550390404777324,4.8143243159162585,2.4427247932153984,1.485509837274912,2.2486698283855966,2.297252817064779,4.352276025129092,2.5903286112253623,0.8836612956968604,3.7439762784277275,0.5030177740103836,2.7627698283753666,0.9602561374889151,4.190134025783837,1.1452574803209026,0.5969676652661859,4.112162594303119,1.474404274063148,0.3775743964943712,4.660789169526208,4.224293124613457,1.7411323668069612,1.4628162100676534,0.26376826000934606,2.6791221567489742,4.099330341261736,3.1928777887321846,3.9300721961543426,1.0697811142460933,4.602439689466678,0.8451811312573776,3.7195848807261758,3.9093670934353932,0.2762340902311955,2.713920725805888,0.1094274032948972,3.8208275739014286,3.3244773646579304,1.409544733399939,0.2892954901074507,4.63290919591851,4.448208386297098,3.3208285148553305,4.366838966109656,2.1760962165707785,4.589241512226046,0.6440439664860187,1.5033252444731848,1.4915063668957285,0.7214094621868117,2.772895028244876,1.8861518955334,0.6569026293457547,2.1243648092653444,1.899759199890172,0.9982464765821819,1.6197963920577574,2.2606257367220897,2.4350666392130096,3.626225213451728,1.8294013584303814,4.579692539274683,3.5853792337284993,3.376888740620813,0.8643482833354221,4.058113338511551,2.3141844940162537,4.185544786089207,2.2188021889038256,4.34184766036833,1.9937494191846172,3.9858093419626828,1.9832201835464869,1.9690677849383031,1.6520388163540767,2.9190671761112865,2.9841187099990316,2.79642382510744,4.8471299899123546,1.4274921640239435,2.2185713083426184,2.440358352632873,4.283280497726053,2.3914593446507926,2.3734888309816746,3.0366859636252066,4.740973078908627,3.5245961308624008,1.0262785197190227,4.957044538546653,0.0058620861587366235,1.1416548447011043,0.8333139924998956,1.7643983363503635,0.577391947852931,3.3729497218806284,0.3000344056903248,1.243487740086624,4.47077785803427,3.6234161722221714,0.8928908230696897,0.39358533716612465,3.7255777146489653,4.902056624668747,4.243606192126017,2.3449416346501373,2.411909591143729,0.12676571559253613,3.0899093484776596,4.332848414438805,4.576756808789213,0.5368968278901687,3.58955772481555,2.773164903061539,1.1992232941415382,0.9120999806437846,3.84508823089074,2.079626657132062,0.06507237912562025,2.0625181805333392,4.575028002866909,0.5164428001789623,2.3548238809425523,4.0722850263809365,1.2523309776738145,3.11556929229335,1.9543946313884941,3.259141016132401,1.0367159755325606,3.0240457369902995,4.520060568759789,1.935751498900935,0.11473349820969814,0.02474752585528539,4.346660198872816,0.6841071018873646,4.922369528411656,3.1940897975068405,1.064901582359421,3.1044727522214863,3.5559726306081707,4.251840183203449,2.6183810765708246,0.7647956854414217,4.210451194336201,3.9854584950936855,2.5753684516273356,4.52094230777054,0.6578498682888556,2.1015016669421405,4.186390805160139,4.146935975091638,1.352243085592828,1.637344765536819,0.29976003812243746,2.08375504757253,0.9293842553959186,0.6903942075024161,4.746234213465202,2.6693373373010463,2.06742529831071,2.567745359237974,1.553440822057368,2.8807788551876135,3.0805917098084,3.1563267420070638,3.4578370473145736,2.0102660684207674,2.020669623291138,1.6263196854179451,0.47865014630816605,2.563700188808057,4.572577680964888,2.1054613989240787,3.987864342797508,0.4854801316063273,2.0702451550257575,0.7668996117971882,0.9820731514325665,4.605429620715603,0.9282883595965963,0.508264278598175,4.6972733349180915,0.20788047591193126,3.5059116509461474,0.2629626887570602,3.4366345797541156,0.1823885992552421,4.345865797652858,4.963420135055995,4.501219156585485,2.099251777489183,0.14361094787393003,1.0831342796225507,4.5210729959165,3.3932948825049203,4.433017735075568,0.10476510540522566,2.1761474989698515,0.2145074443938666,2.56555091450408,4.105241135138798,0.6414676307203282,4.9132355057349955,2.8229185241342583,3.940814315589871,3.3605529829839274,3.56596656225439,1.8917445455742476,1.1674101144757754,2.46575335070586,4.814557388503139,0.09127495753556092,3.4742945915586176,3.057414509660169,2.2080753373505644,1.0028648681491914,2.9531106199590162,4.641233130628759,3.2395942395729804,1.8270082523823972,2.688245798551617,3.946665659929931,2.744576874096718,3.883944033205078,1.9155136470443557,4.789904931747062,3.3852823004845933,0.8859330398909382,0.46935770280465583,0.5705024160496386,3.734496292805619,0.8660213454303134,3.477767945062004,0.0050257905083095356,1.6592221524417494,3.122616351805798,4.042003138613399,4.144676797463584,1.8972336949546131,3.4313565990422736,2.0853048041862876,3.369350716259464,3.8389461448167603,3.105258663823023,0.040494735952180116,4.3761389221588605,3.4565292778778534,1.7507613975871383,1.9582663439979087,2.4972619827785825,4.295930955812775,2.9632587353782833,2.1540173726742005,0.1955441680646952,0.4074394369408296,4.248153558908907,1.955717126655676,0.44838298370097673,0.2776064609963247,3.007957785685952,0.7321307073108996,4.214475363534187,3.1766216149999105,0.9130999712730681,0.9211219323693753,2.9901050153495023,4.839416358403459,0.1922094762777593,2.3579584099171456,0.5877622649373637,0.1776378900529918,3.9438133001678333,0.5217679851398682,4.939807442996801,2.972107351284452,2.0536612480306293,2.3932261037159197,2.4360369747087365,1.841842707375675,4.998969317461128,0.2569667730651093,1.9572401548587115,4.0314685896822136,4.906913658457879,2.9301619249651045,3.513702416768595,4.712406255923748,4.1461071610067854,1.0525305288657139,0.7626202282478955,3.7427735895318426,4.053811105088561,3.063641759500725,0.06239901916188284,2.038540876467919,0.6812419870977271,3.8406346394158497,2.671607999159593,3.6961235419137015,4.76939109123776,0.7802231528149772,0.8604920233744928,3.831060876054374,0.4791177958858328,3.863180560129036,2.9917506049760902,3.0531785237369578,4.320845233571307,1.0171007022024359,0.29736519749104184,0.020594579859324336,2.13025600879159,1.3266439344135172,1.9497807019211733,2.579912203399748,3.874231907430933,3.3532077208127973,2.546543415768323,3.664011325688704,2.7287932898591247,3.700844764469864,2.625037187076098,2.156407979929061,4.753672903100493,4.368686523580915,2.452647208131289,1.8559481695697122,1.6873981565361706,2.7414741687270516,3.2590930811582206,4.9733155600701275,3.5291837236030266,4.434132148202883,4.917098028836579,4.393878151586282,4.4510407949601,4.604751089527696,0.9904526397653723,2.303245780709733,1.371754577611124,1.1198832127718272,1.2843327192626797,2.996132334037794,3.5046297440180085,3.1107183160311713,2.792812963919189,3.8090112979572766,4.245737491126346,0.8081212219687905,3.187776751433258,0.29754184480085155,4.0129336343638755,4.725110192127211,0.7528282682075604,3.2158982629715336,3.25295297628632,4.048922424408323,4.215898787642588,0.49052341595680726,1.6482378082656013,2.5691972991168988,0.39950410665674396,3.9415123016386233,0.6713107541289132,2.90538797007338,3.863551717050424,1.115542048815561,2.5326610015175244,4.598395891966867,1.2312987538317388,1.3104019257000754,2.5455476650272324,2.683332278772278,2.958899807678692,1.503799166596349,4.218949875321828,1.1401479114523083,0.522018562644393,0.9923547131678967,0.30851672166830824,2.482712171241067,0.012712337076449254,3.538602033228424,0.4028919286340171,3.6721745180665244,2.5142946152589927,0.45792845001766613,4.195838640644024,0.8176188389466466,0.6055195976019057,3.8773967890627437,3.015980861476076,1.7900010453529092,1.4518586542124945,1.4993569205474577,3.9905034492432367,0.7664639065148804,3.900886655165874,0.26835474420895733,0.6856292906696315,2.9885242958586913,1.6146668722458235,1.0200446908004601,0.6869491113602977,1.21538306284514,3.3011396195230436,3.9426173943061094,1.3502322776726505,2.1867013372784774,4.884303313926103,0.37515057079736014,2.1636039924023343,4.90327930331791,3.6234226490885577,4.348600877424148,3.2472933930212644,1.2668316241347966,0.83954159017809,1.3730386587189103,2.102426937445915,1.2194905902839548,2.022130030160506,1.4998351821639577,3.7345783032416104,2.3610778415122633,0.08934498035062965,3.647487728506358,3.6365837751559162,0.4464639527813685,0.04675403999699346,1.4410371382015474,2.878854283761896,4.341466070991128,0.1323072755508825,0.11897373409105128,0.5384472904612725,0.9081793988859821,3.4512018719082906,4.310285259604686,2.607017303510607,3.3583147230013832,4.150840017005308,1.2276267266070617,0.9368219247680254,0.5952237842814034,4.289317812653872,2.1246026613668545,2.5303945545175077,4.943044535350841,0.3229244364963435,4.531973501626247,3.0236254477851765,4.439722068257362,2.5056842993130344,4.8470673717661406,1.2114688514827954,0.02461330554296537,0.4672076971993566,0.5466340039294904,2.829825226570506,0.9255502797559578,4.667390644653238,0.23115315221029498,2.7190580689789536,3.7110926784113643,2.645258025903873,3.475034147228383,4.168258571511179,3.220660956630128,1.3221785098216132,0.08516408945898557,4.804036950849869,0.9061481295663698,0.8856643173025847,3.3371367934515686,1.3034233106506388,4.635222923189294,2.608034170927047,2.180870201652195,3.4219414360050493,2.2547849852111748,2.8295244775291484,0.6657001689482256,3.9291231004398366,1.8916286666040305,2.576062632459264,1.391134022627778,1.8658847675537849,4.007970058931599,2.8216056528009426,3.0353934139578564,0.9615957161886401,4.763562653814307,2.797143383234343,2.3629436822023875,3.5191574026138994,1.1069835211407586,4.786755486645808,3.729295046956386,2.940042028991059,4.564099578322365,1.712078375764019,3.1243362708072455,4.425591813252198,2.047841095022128,1.8266223700214101,2.203871968502944,2.903646154319973,0.2149727969949733,0.005056813662480675,3.4514228994826155,0.279235220214733,2.6783304705356104,1.5331585719330743,2.286230964593549,2.675575057913906,1.4495531845784615,1.1791223781620086,4.204438791198387,2.320615443422912,4.815548437541794,4.043086182899167,0.2549761268060191,1.9301504092379207,1.7981562719133237,1.080171509693293,1.4409199074212753,4.694064232097479,1.0740886695551166,3.771325715162892,0.9069327430874785,1.3861928928182965,1.7406881065605573,3.9667625134121254,4.809547118796037,0.25508590817184373,2.452369209383459,0.20889957786390356,4.192128911262865,2.4084085944440603,0.6286959481278709,4.189159945255919,1.2506469221805627,0.25266658959552823,3.1053319329298668,1.8130218608144788,4.164100604373285,1.812738737774925,1.745465397733823,3.7864912028498487,2.1257331159803314,3.4470799823554907,4.747368911183915,0.021636906202623374,3.3710503650889603,4.195374692977385,3.2786329951904403,4.284384925734455,3.2759110674498357,4.716641760147181,2.333392296326493,3.8513251301581586,0.5717182477116489,3.384355700619138,4.572127514196911,2.7295992105283506,2.100463972217436,0.17429529712629344,4.669690911809252,0.10397151187694464,2.8980901806173276,0.7115427571552246,0.5053921915391202,1.0562736500370329,4.089699931815614,4.022486254928074,4.086578842098851,0.5947088314535165,3.072719277898476,0.1496930877459024,0.7542466918872592,2.2397852630601256,3.101266091658197,4.798391308569804,0.31580373662393746,4.609467774631347],"expected":[-6.754495429649378,-9.447417767868833,-11.259596449883004,-6.328016345227194,2.0229593789635327,-4.0605751090426345,-2.3530160569436385,-7.534653773063248,-10.058293210527271,-4.661274395644366,0.8178642417023538,-5.137221824619309,0.22464733209878318,-12.325476007824712,-6.172484610609138,-6.702609233011978,-9.10931903307624,-0.8039456994155562,-7.31087665398322,-6.770856929429977,4.275791773628464,-8.239931813455842,-3.3637497623823087,-4.424156580556361,4.330304471040359,-6.387710053443531,-0.43701820936868074,4.666034074233027,-4.336313230147472,-3.0823455034704934,-0.3662202280034823,-5.9032976062827345,-5.52949176703312,-7.183797481379152,-10.50738636933866,-9.082516770620721,-8.187744718036777,-6.791564642621368,-9.659963456498923,-9.4162721312351,-7.917703660860138,-5.316093951898576,-8.147865121291748,-3.32746170962892,3.364387491227922,-5.389684667818557,-1.3687884274812823,-4.819444053341769,1.8355309055101814,15.518759218498449,-0.6087688808944423,-5.114508594620336,-2.6612974262164566,-8.466539768337357,1.9137970729432512,-5.779446248504754,-3.3286490463953444,-12.478321167996857,-11.17070252507488,-4.606010004257708,-2.5413679829697515,-9.492227436309156,-4.896264165630825,-3.3490629194844033,-6.432559758675302,1.2389746728550914,-5.608498938490189,0.24494921373845358,-6.670162173528333,-8.160422763775742,-4.994992214115011,-3.1261336144061245,-6.603261707217912,6.413918750663776,-4.873101339552749,-6.8217146728324805,-5.592111651765347,-2.2044655486489204,-2.7378451069774004,-4.190829515368511,-1.7424484280653985,-1.3346928262658406,-2.0200317886238492,1.7016633089383002,-5.3727474107936315,1.3774943119010805,-8.631526697409289,0.2732200423561726,-3.688193123911409,-4.79460016429328,-7.314644368902343,-1.1962374671063576,-2.9082910567284026,-6.571121274848645,12.65201379097393,-8.621313942024123,-3.332287997929061,-13.214881935538543,-2.2272417737547694,-3.77209206585701,-4.78063792718428,-7.888006528995945,-1.1427299685725751,-2.1325300564189886,-7.027447455093274,-4.538984757512078,-9.195258736394571,-9.46456544687234,-7.623528771048715,-1.0071494095745939,-6.606896470626285,-4.134287563089806,5.181910254226455,-0.5420431691610879,-3.476187572197039,-2.6188886053604628,11.851014811117631,3.899675969045317,-1.8789742101990001,-0.39901351371351956,-1.1618793238751897,-12.888064051297622,-5.733190600918943,-2.840938665323079,-2.579597925628413,-7.790179023439674,1.1923903587864726,4.1952209341873825,-8.014438618093925,1.3259814825582419,-2.6828318195032432,-0.7972877189463583,-0.282906233453563,-8.624995211045627,-8.712210887911079,-6.034461535268193,-2.806683779471151,3.8139938957867967,-7.213201492461383,-4.4717070801813765,-4.5198390187049435,-6.313778884882427,-4.92404105077448,-3.4265884800242854,-8.348174980339401,-0.9806426075656051,0.5918428107374885,-7.88033292703439,-7.701459610082198,-2.0283197530648502,-5.909115157241525,-0.49456007611396413,-2.263044030354938,2.472960087362402,-3.566323196032842,-4.362179514934306,-3.369439613604259,-2.4925742541992144,-8.29806338410558,-1.5988797120496492,1.6547234826362218,-6.701309683033563,-3.761168491309136,2.658298158394279,3.992489408539702,-5.552460792424853,-6.488761797882422,-5.099759132794194,3.4447800535321305,-5.7479052643545625,-5.002174287850759,-0.4353948510810435,-9.300860657756854,-8.594914429684545,-4.174793521734576,-1.0061136903968166,-8.595707523634609,-7.541983941285975,-5.271033887767822,0.11752073872963814,-5.860651129335816,-3.6787624557682523,-7.098118923451479,-7.695905612709311,-5.865546467393109,-3.827146665968256,-7.848473209878857,-10.425062810344317,-3.2625868520482846,0.21509669610148308,-9.217997392625904,-7.5426709867789885,-7.850290110090657,8.122468382845216,-7.037457505167036,-1.318777589599005,-6.240339416732532,-9.130567867782187,0.36827076855437335,-3.128524885583201,-1.5252399168369888,-13.112706361661399,-4.669171394805391,0.5170664847102514,-4.4835850479796475,3.9784611915344996,-2.7655264509815867,-0.8844751322057041,-11.611813267688547,-6.155888754479661,-6.821604308407963,-0.29665301601029936,-8.092033296205136,-1.7492240644782038,-3.234868715096947,-2.1747155236392635,-7.3737693691055775,6.6656660870694,-3.869527516141773,-1.5753458625771888,-2.1476977834202753,-7.611840632017568,-4.493081359201285,-0.24944740856271252,-6.036507224102705,1.4868106350647357,-5.716850612367553,-0.7580388786768917,3.274926763655218,-8.624147591774328,-11.639357305682946,-7.32627246252399,-5.7342007540786355,-7.623606734947921,-7.567275207289464,-5.478787212464537,-12.262143299572971,-3.455407366611188,-0.9810851395186926,9.265624943021733,-7.318280505905427,-1.0588960110718308,-3.194385995473602,-2.594740175420634,-9.050801845413849,-0.8282851998654732,-1.8951307847017682,-5.0611985278489655,-4.396076546024912,-9.565227003905322,-6.788599243195653,-8.884753270136576,-4.318896139501309,-7.613643866975443,-2.976669361564304,-1.970383224908884,-10.856905468371682,-2.229348530385377,-2.005415660025002,3.377631786979831,-9.542240736586487,-3.1874161956226787,0.28986236886927186,2.7907729705081894,-8.415722080913415,0.3467162164450084,-5.611738650480032,-4.854911897969993,-2.373197132248173,-10.896751122015544,5.86103681766842,4.142545844074481,-7.1731334426658835,-4.697280236739633,-0.9195101588135772,-2.9878712795708937,0.5625468907718274,-2.8494910310064796,-8.302053986074098,-5.363633688272743,-7.563247822767541,-2.3349085371059712,-2.282026929602138,-4.101118870451341,0.7167995568637302,-9.839795695865634,-12.071086781849276,2.27871817258136,-0.15454688241848635,-6.97205551427826,-4.874393042546275,-2.8692703459397153,-8.829152925958052,-12.119721707573811,-3.0055079361828465,-0.6680527699186798,6.639363246641743,-5.354617770136824,2.2667197108853476,-2.1698306348074006,-0.27516625657635274,0.45034040212719173,-4.713533662758791,-2.002673293320858,-9.356566044692519,-3.021393240395335,-1.082815709255263,-5.249380002253945,-5.30953272015034,-3.0878854128049293,-1.4457655643285325,6.074563450569697,-3.9315278358196295,-5.110622504764839,-7.84139091520218,-6.685207036674998,-10.004366159586095,-13.425187628660566,-6.983659533549984,0.6052150102552538,1.3879650491187085,-3.7251754244624533,-8.233610249839527,-14.868364564623857,-8.538824414694773,-8.355296250528756,-9.383930303441916,-6.013737870884692,-6.326329080308441,-2.1520509608545098,-9.306531543025308,-10.56190920414403,-9.318495409006557,-8.500408734188118,-4.697205459429731,-0.6868063471323724,-4.853954296559177,-2.0479957112418608,-9.56166243453827,1.0106519141409835,-8.77218981868872,-12.088604425238067,0.022964679464120313,-1.1752254763739582,2.513803915103701,-1.5581932289754896,-5.377716359209398,-6.46332603710614,-3.0236025287960864,-4.902052742572686,13.933547298322026,6.780721092021446,-5.783745453394178,-7.680253905353862,-6.930455005921807,-11.001896275182533,-8.453148461873067,-0.052242652005705104,1.6600460073036567,0.19926461407943907,-5.097227504032188,-3.9702354007029657,-4.704314612995885,-1.3588933566389385,-6.908587335075317,-1.4220072944020208,1.0567864071604713,-8.036709547981442,-11.742628735141361,9.644930901576172,-3.461147516676582,-7.605525495522066,-5.445983139647886,-6.836699973295613,-7.491216996151297,-4.449399143678065,-2.1545395758229215,1.325294389924335,-0.8339849540426192,-7.168836374380269,-13.302378800371109,-1.3337755633882824,-1.4087264377280149,0.07600373720604028,-7.868731402885084,-5.382489994826364,-3.4788367571727186,-0.4951062007322602,1.6736693781216117,-1.7559949022212862,0.33385318786047613,-9.040364929127387,-2.710400486190986,1.64730065993471,-7.843679044536962,-2.4509679812232266,2.2707689450428212,-1.2121780823498418,-7.15300437773889,-3.4556672131402064,-2.965369953455243,-3.3996040730978008,-3.9984623312768686,-8.343931978574266,-1.3209126418167705,-0.6483969286908842,-7.364218688962492,-0.1847884634642547,-0.6525302113305982,-9.039249262306718,-4.776224715222738,-7.626570418337297,-10.429598618121062,-4.204576107339411,-10.846807518111135,-0.7836510073412843,1.871359630238655,-1.923603923074487,-11.128558137061024,-13.95730767770446,-2.256607048288709,2.750326079283409,-1.695051245841817,-7.222766196579194,-3.454678875020661,-2.994569926749426,-4.580685442463917,-8.041116103126576,-5.823409443418477,-12.304111039305205,1.6376926933693476,-0.10197798864882368,-2.3545529831532694,-1.9598816036121947,-3.3767730809788232,-4.360705885781185,-5.005146692914838,-1.509278240665774,-1.7964436268166537,-2.5852980895779663,-9.751499856585239,-0.48892136881475723,-2.046888629687684,-4.604200382327754,-5.7302088870745465,-1.9764833720270878,-9.832714867895438,-6.690163473162169,-2.0330246800793446,1.073961379842722,-6.041981566965163,-3.41308420943256,-8.554070997158567,-11.830816427442029,3.134227226969183,1.1875208539349558,-5.938598906551379,-1.074754393317244,3.6951244488849775,-5.20419794114603,-6.158906813772626,-5.404583390702545,-6.292992347460325,-0.5029367281941817,-3.7311426301763464,-8.630816862876841,0.16080832368866904,-3.457290375875641,-9.818740315519939,-7.4930376808213195,-0.7478336091153424,-5.8442056138389855,1.9016993476016308,-1.670038613468409,-0.3497354526571327,-1.3214270300873094,-10.902611282718302,-2.5257724552411007,-4.17457732613479,-5.211288523072433,-1.4742252283300727,-0.31696655528922424,-2.3424262132877325,-8.070330401311672,-5.230734104714746,0.36518698359502666,-0.599491874106554,-5.092793291334189,-0.27813310858031337,-5.276197182980658,-4.12207829778319,5.089057710540615,-5.286454302764806,-0.11520972904185278,1.0428466756279589,-0.05848402397692887,-10.774764606554738,-1.579294059303943,-8.45929964130895,-13.041972244694339,-11.452867386889137,-0.614786631781414,3.6005985787050587,-8.31976903404684,-1.433668825717763,-2.8548542604846485,0.4575707899293109,-6.106558497356758,-10.507795863824196,-5.339099714473723,-7.282150765828595,-7.593187003885483,-1.8474668142782698,-9.018852824396607,-8.251504521637981,-2.3455004715744616,-13.392006163719028,11.06605202853386,-9.655045827987799,-6.300190890979641,-6.077945799549091,-13.134998639824246,-4.484553771013203,-3.579064810528848,-6.894189891248208,0.4678723007837329,-1.430065086782431,-1.9249262184883411,-3.3659912373884584,-6.054266496727564,-6.02973926653622,-5.851856592030235,-5.5670013156184215,1.172640153631452,-7.338052946528525,-2.1504991332939833,-11.376052262842823,3.372570402098159,-0.8731214740437947,-2.487428246504728,-2.2941254734556393,-2.5400097729739017,-8.282978507065994,2.23685337004889,-2.572702671865411,-9.129358793334157,-6.677310014387127,6.159936411054589,-9.3281960566241,19.711997177052464,-8.869422782275802,-5.1154640058867855,-6.312879743581081,-4.395598110563121,0.9840527708772688,-5.538989453802279,-6.26681895365707,3.6955304101229727,2.803404629188644,-7.947722396822617,-5.709691334154052,-3.551112074075908,-0.728788667998134,15.58961655470757,-9.667596607438046,-5.814360867034171,-6.156425182074922,-2.506627821096364,-3.2708083017538834,-0.7511079015982007,-8.91389699477511,5.246484275037787,-2.269423545935733,-1.6622274286020795,-2.6806960461926517,1.8793122694410305,-9.199780771833764,-3.70078087625099,-10.29285720112122,1.7089916786174029,-1.4075619371245542,-6.306919626471243,-7.2157931431091376,-9.647336790514158,-6.761360210069211,0.9097363365293933,-6.844967840135257,0.5797677687546923,-3.7210689053273662,-2.8333579854511375,-4.886676079537776,-6.00177085171818,-11.454590553911393,-1.111084859605818,-4.914034723063153,-3.7497825127153908,-2.694155061945022,-7.286139194139724,-8.285990028232746,-0.3243935381316797,-8.788361944408157,12.000619576853857,5.486888642569572,-9.88531348738373,-10.046608835591746,-9.62578244305899,-7.791861637703973,6.669467589206507,-1.2193817473885706,-4.551215003794926,-1.8356549314244976,-4.895587590054611,-8.433452190392755,-8.356991175451547,2.1566422773093556,-2.76366190104663,0.582056533491963,-6.1620038780143025,2.0770404507943545,-10.478197989518845,-8.027702251645538,-5.387795306877198,-4.0355999670163785,0.6290962164341534,4.887142005562754,-7.567166703719282,-2.3340362863150026,1.0860981771296476,-8.766989576480611,-2.1415547346483867,3.0611414361487936,11.56518896415471,-3.539793161565457,-8.54630785952896,0.6701075123825919,-8.72479994631454,-10.470489770005885,-5.3965436097181785,-4.637800331663965,-8.605225698486848,-7.523311173227742,-6.734871948832654,-0.2877995878783035,-1.4246859081059748,-3.8151284780854318,-6.7112002893582705,0.5729592425236021,-1.6267589899130521,-4.6300034716372,-12.937650192387057,-3.7185154138821757,6.167459165432402,-10.362346397956248,3.042595630626146,-1.128116762050527,-5.878007590553476,-5.691112501307044,-0.06617211621825442,-8.133128370922247,2.730526551980315,-3.5646089988092973,2.067217703273637,7.898572895837253,-0.5276650410387409,6.693971849078087,-1.311032371571737,-7.218749912329934,-5.292476504684145,-2.757698293039323,-3.2600821544559833,-4.667843626152943,-4.976300952420446,-8.486764875866198,-1.8542231698752643,-3.767193662854277,-7.961356129311847,-1.3095160601462206,-7.805105826848181,-4.896922986531379,1.15865667033622,-7.0871301352877065,-7.4968943334649865,-5.18500188144653,-4.8503919988808235,-4.030194726190378,-3.9384432634938733,-7.794117837174588,11.004597736194146,-4.958720376318309,-2.067675110168656,-2.451893242385223,-1.486489604453893,-4.429404076171816,-6.77258816526153,-1.3622541514025273,-7.260360970189353,-6.315984019648857,8.774792488547131,-8.756034377869696,-2.919079331230658,-10.410930406191827,-8.279560450717373,-6.243557486589393,0.07840170362742205,-2.345721768119994,-5.22305094268118,-4.955668870182978,-5.217510728800278,-3.9794465937276446,-1.5776616744609573,-2.5524789949952917,2.045779636372586,-0.7323665213580841,-3.5044935304345604,-8.9638927961393,-6.119567443038904,-1.3747451697953552,-1.0182981918008134,-0.9166920517538144,-1.7882712919066366,5.216599395060715,6.102112536271262,-5.031505024703443,-1.8334953681174082,-0.3867556872273265,-6.076429953161577,-5.858807851587428,-7.00674268723626,3.4383438297161883,-11.7588431305937,-7.154353979322413,-8.035009891830336,-10.649453692642483,-0.8669537238167169,-3.7026827406798097,9.485157789145132,-1.8112367362029382,-9.645955264860694,-1.583905017890065,-7.762801445025365,-8.18672390936131,-0.759479234647614,-4.723705390836038,-11.079444324219573,3.2116178951410674,1.8804225288600875,-9.826754047392846,-10.794345748304634,4.190650057642843,-0.874157609426577,-4.60754527127927,-0.5237407818521849,-7.52724705044281,-7.69448883712809,-3.1855926928496165,-5.984476626941774,3.587904180730174,-3.237345844511195,1.9212842173816664,-3.4954164912796384,3.5836430947920785,-5.093576346722753,-9.578601259202394,-11.427536336827421,-5.874910380709678,-5.852990460592735,-0.9182777207460222,-4.018120629267284,-3.7635683498663144,-2.213194403047195,-5.152397814351205,4.838842791564959,-9.286500580585798,-4.623116055967039,-2.8963321238180755,-1.9993825614199296,0.9547356313416473,-2.6014533868269947,-4.772858188551808,0.17658497991289235,-4.891805667901777,-4.650854393941857,-4.940371956534463,-2.8140140047450424,-2.528402775946989,0.2713600411248045,-3.597426447721493,-3.13999023810883,-9.029435662495747,-7.5849434590566585,-4.247159359870361,-1.3628239859938083,-1.6919601368834967,-4.40309292821161,-4.99317410607434,-6.729104575294415,-4.309598136626806,-1.5375181317587718,-5.821830743154365,2.030500098226497,-2.17784246082998,2.823468103363183,-4.905944740800025,-10.175062107751511,-2.0482482299309686,-5.337575620505114,-2.8728667408146107,-2.419180595609814,1.0683105495895169,-8.422388059579921,-4.307306566436015,-2.7203876914383516,-1.865710448948331,-10.07279397503869,-2.672290918864804,-1.425468631535797,-5.361114625820437,-0.5905213114118408,-4.462187491544107,-3.8136812116106578,-5.164125535348674,-1.2151051834877915,-5.611829119607715,-2.6823309509953104,-5.620951714122341,0.7929443230559228,8.887571985233468,-1.2996814472985108,-0.6606061247647714,-10.91767692895564,-8.03880046362414,-1.0624322113072808,-3.458769803820487,-6.1072791445664585,-5.324495743525926,-3.933163610401755,-7.846221114173454,-5.4359910239730915,-5.940247494630822,-0.49047632904054217,5.356400900655522,-2.4228247395801503,-1.3645315821637325,-3.5070675223825853,-1.7392720333721257,6.736390259249829,1.1206859393302562,-7.759673179651693,-5.815051095238977,-8.324809652270181,-8.407211837707134,-0.8211725299100388,-3.6676172880371736,-6.025540412976921,-4.850316167886326,-9.111629017362668,-8.873367112541825,-1.905114529688365,-8.5533413959764,-4.558602609847888,-5.91912850766938,-8.236903725387485,-7.197445639835118,-5.178370642752474,0.9279422518069538,-3.5846558721787125,-0.5580319083026465,-5.4506360615282325,-4.687072137486482,-3.504406405351306,-8.822976794814114,-5.3927455769849955,-0.735887012733472,-5.166564401608767,-10.525689821123128,-8.044019813391028,-9.235789389437171,1.7867947225753684,-9.144446941479117,-6.349853363089534,-3.8980340364339114,-5.272473687402825,-10.686777673499767,-3.2870101228369695,-3.5393165049382453,-9.320714681115916,-5.1941338690008925,-8.59467044107293,3.286171376903604,-7.567442872190797,-2.2426151870822792,-4.899430972463946,1.772287818823611,-2.543497140353438,-3.2389233135372675,-5.723065606198608,-8.076093101154969,6.042851035244427,-7.686247993126223,-5.5781957834457145,-4.4984504781381185,-4.374280286366514,-4.769446320924138,-7.648423324943275,-1.1196107885840811,-9.893620387200267,7.783363846343647,-3.5656844581024965,-1.289406284810111,-1.3045054889766412,-5.648487640540698,-2.611808737867613,2.1674059997452906,0.6499593461730968,-10.026066282239903,-1.0421510955915096,-5.667918632739982,-1.3036588606410309,1.378915949409342,-4.09102216765557,-5.425689389290325,-3.337260589192092,-9.49468137042331,-5.621651539277803,-7.0139000563850855,-5.39652389614933,-6.005268729582783,-4.475444367918774,-8.257760004117285,-12.400047551550115,-2.455545810668964,-6.921402115574622,-3.5455218805986166,-6.989493106130054,31.523803551883365,-7.138984872887602,-5.818132399615385,1.106736270956303,-3.194195005008841,-3.7612504375226004,-5.764440615698049,-8.80669086521274,2.1925455999849355,-5.312253457689985,-3.3283952166282487,-5.989620728243326,-5.859857175854296,0.1996690592914181,-11.548063665738347,-1.9760631842226504,0.19049463864234184,-2.546443941702834,-10.941551669225882,-2.2558878496745614,0.2222612167909072,21.110899921059456,-5.341060277683222,-3.184141205310084,-2.8744604026308638,-2.6997027316056443,1.4894974740906493,-2.2426822751636326,-8.365851977318618,-8.079226320608575,3.3821940991975756,-7.7413572669303115,-6.6019372183335285,-0.9552653773321353,-6.800926356183311,7.132339239335656,-1.842005270666534,0.19280416410734524,4.078788788694478,-6.741215199854122,4.15114617092719,-1.7582769504664295,-8.13379807589986,8.481499204373707,-11.965876665535491,5.294703519663308,-6.804984984119088,-1.4140201306637004,-0.5826723340421207,-1.1490395593881337,-2.3272448930886656,-5.412882036197306,-7.925644313455742,-1.1764296889180814,8.286436465472937,-2.964536263791616,6.775361713534343,-9.727924253685718,-9.741030879547136,-2.6514069497976127,-5.908739300887294,-11.498708081052499,-9.065247354581828,-6.767928005023421,-7.297329503614623,-4.828575204413262],"p":[0.1948733763306698,0.5460380496216513,0.09425803602399419,0.5230186155872609,0.9102570522285294,0.38104233822169964,0.978250635261906,0.44619357556415173,0.1868995768485684,0.8272954772656684,0.909039766503204,0.2384310718635554,0.7868808985827835,0.09753098692052964,0.3886719216751122,0.9711604705640187,0.6080873603623069,0.48430615840194924,0.1262871959474865,0.6554941179453946,0.8533592490773765,0.41697893677154885,0.5799831610170452,0.49256508077249306,0.8695863420361039,0.6963878264562919,0.936323084585313,0.7985091431652989,0.23656272867924732,0.8426182048353539,0.6483803796785765,0.3752191759351702,0.6945726463003981,0.6009829420334944,0.0637199616684816,0.08835195990297051,0.5746802751602047,0.39422675465051493,0.09137096455051608,0.7174442300312758,0.011150443356209072,0.8979240204189003,0.2615808654391263,0.04406581728723591,0.8141128507199229,0.6136786474124238,0.15442644364874192,0.3143051060493802,0.8548281875916957,0.98696209353866,0.8256688718256333,0.8524023693810312,0.24142560779426114,0.8135021539655762,0.7703762423954394,0.3509369544564227,0.7783090046715935,0.09993043810588764,0.2726181982670077,0.6876177964103474,0.4971886199927653,0.3932069717720177,0.5407203288187408,0.8361666752190622,0.7466506864319042,0.831213715666151,0.3155403933192076,0.44632782284740546,0.8995300429019264,0.28347108510384533,0.6761145655188086,0.7653304720530671,0.11339334886473229,0.9510384628121009,0.6155773155818147,0.5168883971329619,0.21023993266179652,0.6303365074188052,0.24051945398141328,0.7169990382832334,0.580072938063527,0.6464109997679262,0.8838982250661913,0.6441146090474534,0.5365786319162815,0.8216778661021147,0.20306949743885316,0.6501474824603877,0.7373397703446136,0.7116621240498013,0.545183660454901,0.1634493834885682,0.013936971103325702,0.7432607185395983,0.9881592062456075,0.35932999334755555,0.3062720851425109,0.0057588628567524225,0.34926005316538045,0.7228041165299848,0.6240711735209334,0.05634501875819953,0.49126120871589163,0.002538263811683983,0.4253533019817264,0.23665982891227832,0.36424667644629904,0.0067319879191516385,0.16361004032712234,0.47522044268531816,0.4582596308022229,0.7411540751502579,0.8874718426430828,0.48925107581382554,0.3954095268061184,0.08911650528596415,0.98860579247969,0.9526877370335258,0.8111571492056562,0.9248678357295206,0.48270466164319803,0.006185828129667392,0.7708546268919472,0.5679879458134882,0.5590302646678595,0.3570180917954293,0.6521236821633087,0.8871256535809768,0.007960612303892889,0.8738617678398444,0.1823159968144854,0.8336740545258154,0.5494705252306049,0.10800344380189708,0.12457414975308456,0.164752371775019,0.044398619778238,0.94863018434497,0.45036970468190995,0.2564397871488955,0.13285562845365817,0.4124997644330115,0.3575271090458574,0.6322558013100581,0.742444141159881,0.33353722366719185,0.49647282117519764,0.45585345522357956,0.2589417731078667,0.2328175064009359,0.5939951828025432,0.6092211085037711,0.8302516054492,0.7650770419455526,0.5389996899149312,0.1874033542627307,0.4951178110267138,0.20076988677797036,0.24379896701582648,0.0625300655527865,0.813760532221689,0.6755476651288268,0.667725938059123,0.6050838828153302,0.6676598994902987,0.6615785062624231,0.3638692295280048,0.4562499384524117,0.9479143459783825,0.03508120838235107,0.6385728273582638,0.627418396695482,0.1297414350872561,0.283305547704392,0.7678503212265444,0.5435115119925771,0.7625895168604049,0.31530797923956877,0.4190903848877112,0.5315574324405261,0.09974467066074033,0.4900457505061633,0.4598634310932508,0.4953472769336986,0.8093163156978826,0.7899694355557494,0.030930692084390587,0.29413885652658456,0.2527146703590193,0.9551545115314761,0.4439656095618223,0.24510576602147238,0.3208289685576977,0.954411341709295,0.592888397456238,0.8825966849488516,0.7545696592510833,0.25662852140987313,0.672312709905659,0.6921638875904528,0.4242748277224677,0.011935089164439638,0.634064449937144,0.5411848883636439,0.37565638431149284,0.787997046998606,0.045592612500489293,0.6402456924058453,0.1974918309350333,0.3127349065688909,0.4268009548716185,0.6125984110864495,0.5362433585858812,0.5993524528556875,0.565420243544736,0.16718928457053917,0.29562290584325956,0.9503494773310168,0.5913616150930665,0.538751897998581,0.4542217062323137,0.9217054911035067,0.7049345931017701,0.6684745784619486,0.7621307780902495,0.5293219643343574,0.7386753051561223,0.5955619312136065,0.7160138675569059,0.8268442250256791,0.24144391538582388,0.86897545323533,0.05095608625368975,0.2662902236359488,0.19764348087896755,0.8425016646723518,0.0225935046088519,0.8278665553497322,0.539521908397518,0.9864220363901592,0.024983832092826175,0.6038744267793918,0.9411678262810224,0.5709604126349348,0.007794533333006726,0.5548968321966916,0.7097503952197763,0.6241086337369584,0.376529237559621,0.23472929262985875,0.13108359400813896,0.40816813963803544,0.5944292187166169,0.2713800085904827,0.3136411724660362,0.47769628319526447,0.13912323927173853,0.5217631290568212,0.3244567619810148,0.914376215910804,0.12202113694562167,0.768239554427822,0.6431951400258302,0.9555483849289879,0.07518366465618653,0.6647678915581652,0.5518054847479166,0.1750246560234785,0.5288459938848986,0.08574384374854005,0.8157616910278593,0.7665970545004728,0.6308350234467672,0.35142035536336347,0.8238249913482121,0.8207471618382225,0.8278998221080047,0.8723638759783567,0.9602768779990771,0.2752395972459081,0.45075730984283857,0.5769776571949026,0.5151366019598396,0.6692046059830221,0.895860825133602,0.35291122637429306,0.06391834829776744,0.6549019851195845,0.7319697452510558,0.35203941700726493,0.19704381324665343,0.628490723126353,0.481798772935524,0.03945249872166845,0.975804498940257,0.7112055053120752,0.9027309881772247,0.20136661849609916,0.5926093487975763,0.769443849970836,0.5459014813942591,0.6896915260315102,0.9947842760950407,0.8830062352979291,0.20047621921578562,0.5629945256442388,0.5987388476194098,0.11467130790921765,0.7937431323787056,0.5495210508376775,0.5686851160403106,0.8952089755521071,0.528074767278242,0.6541387762624356,0.13363512357200036,0.07551164036220581,0.12948549968993417,0.02285968633938862,0.77882150342548,0.8525095705901158,0.7981765360121937,0.2916884642094264,0.4036284469283353,0.01552352417353009,0.3333451117657529,0.10699059668724065,0.08590642032108908,0.03842075914731646,0.39886755848129263,0.7502167332512464,0.05067468278224174,0.2863992524321344,0.02599170568236775,0.4287009099938235,0.7927484290878779,0.8495223572837596,0.45535932951174907,0.34310836143306633,0.18815167025530966,0.568932019035701,0.5367190544749114,0.03442177149685377,0.5379405888831856,0.3596738806657811,0.969568546474961,0.5094331102141207,0.4358415256793766,0.28573242417314026,0.20582266725925802,0.761072229858337,0.9917335222862458,0.830345823805468,0.38911599557273546,0.5368128735132935,0.003937612891001141,0.07010089382516393,0.2718904065968255,0.7501277067082197,0.7229148293913936,0.45503767224747893,0.24862193058043314,0.22672728303214917,0.017143606676802925,0.4114687321765158,0.6850834615115371,0.7465447292457941,0.9035931200093335,0.4462213027247999,0.007240588989923857,0.9564013502050221,0.640017595021853,0.21028606559891538,0.49554516728102316,0.43064021123719787,0.5594781648861613,0.6209619259493786,0.9095576651578445,0.7586630777476362,0.7286682373218605,0.9619679174345981,0.021759035132245197,0.3752645653294826,0.5386027793673709,0.3869053213467546,0.32623393992070504,0.12888781895109602,0.17424497310981213,0.36638293303023683,0.8341421204195523,0.6163067421731032,0.45185020670390563,0.35668445000052884,0.48432011436922906,0.7971334570507209,0.4076891407744152,0.4676406028698945,0.9773894243927228,0.7496398779115829,0.07212205398918958,0.46669719384902253,0.001811924237064222,0.3776416263287805,0.40524618661213463,0.33214661073588636,0.7229064888550982,0.9191436561034403,0.7816930204416628,0.9897464004317515,0.5201600428266882,0.598513880047483,0.6169500191350155,0.20246381821966253,0.07187085736559395,0.28516709042334365,0.26895268187457444,0.747463491596732,0.9501194066343222,0.9394276142971343,0.14158477794284163,0.06123152660768949,0.7099219404073145,0.9766610138875398,0.7086496806400484,0.38272630711670286,0.12406910790642423,0.26431308678018106,0.2237985373241269,0.5194858364914812,0.8974638751341988,0.03579580283172845,0.8491493116285265,0.2983763304863787,0.23099771829086846,0.2931885083124455,0.7976126497525002,0.3136593655443072,0.9045027059711281,0.6708932128513949,0.7516552675422288,0.899985634239703,0.2535096638460532,0.5568699248943532,0.3545819487419932,0.6344519281050733,0.700425626480595,0.6724139159973959,0.04824560433563052,0.6486997737557978,0.23576436652744448,0.5022111998142291,0.4599817146573646,0.6960434027916942,0.6107508225375351,0.19461384552073424,0.7830880550716686,0.9165373694531604,0.0252119248374445,0.8860892652674781,0.6402586219605679,0.22236805980014895,0.7825555698427926,0.25516089515268825,0.028029835890794885,0.5706298871115847,0.87516968532131,0.32134668201692995,0.871525371685931,0.5097473629279716,0.27634166007503147,0.7220041856246877,0.41649387373669833,0.6839917841606891,0.8855310124960498,0.4347922120781167,0.44439199577620836,0.7015677574027315,0.08186671511264887,0.3246756104570676,0.6541583604253676,0.6115293416818643,0.6830944809760984,0.8530885293785013,0.6277767505582139,0.12821837232233735,0.035211000201021525,0.5148653331855231,0.2984972406624202,0.3446529855878768,0.4698773034547219,0.7366820210872471,0.08057484672649218,0.8327910516487189,0.8690855985866415,0.9880300135746336,0.9077171919819329,0.9003356174840649,0.1612318929951715,0.8932995245567132,0.4958078469760052,0.011595104488762109,0.1743349782082313,0.6606873234996578,0.7909843871333988,0.9674477611594516,0.6546079084384966,0.6196317312612092,0.8969627489733234,0.8965551950206172,0.2951058958791992,0.5831240194812684,0.3428491808071359,0.06293650529648742,0.3089394120505653,0.1712716775907468,0.7568494664157397,0.5201135632823697,0.016314166319771894,0.990918223098181,0.007591697479812698,0.17174480013392945,0.8076785875940296,0.015865020352375803,0.6786453116930187,0.48412486280170386,0.38595663515234246,0.5727226188708119,0.8180074410073295,0.8264203979640443,0.5060542049929886,0.4256617800212319,0.6734527071433043,0.9739256108937282,0.6721588386396877,0.6695151250302114,0.2131157529143064,0.2933573331374706,0.009331322776110929,0.9762068911396993,0.9145257080786247,0.2528829038327478,0.7176092599882709,0.6659724322549077,0.23844100124969425,0.7546478461475175,0.5328705428899241,0.6230945663620482,0.6260929908086996,0.9458690769156755,0.25045241877948343,0.9910417020705837,0.41987092865760234,0.7376708809756822,0.12223967080971998,0.5866497067457752,0.6421156493496618,0.5123628292811666,0.42119931972963154,0.7266298744408553,0.7554794825895477,0.5080257010763911,0.17079704267419626,0.43462166637435184,0.35617002670508646,0.9857120996638733,0.005006869548628945,0.5276005879816177,0.6661231591485632,0.2721903221051478,0.6595316603486758,0.9921569038105851,0.7821317290235701,0.7893256810608558,0.8065545778581964,0.15089630870549176,0.7148334886200411,0.774565868065054,0.0881114830579448,0.8270359758359449,0.05522321379048334,0.781694348151841,0.7502941006010488,0.3480862157789988,0.16906063394625215,0.29450516360944734,0.519381712535868,0.6546045406848229,0.10091914927859613,0.8521170492514536,0.1082456503297149,0.3316959117809466,0.8176175500388341,0.3591293771394748,0.1934565060111808,0.5099481032516149,0.8195648405855129,0.4219127166900447,0.34847268481756033,0.19100480205324688,0.0923735523005027,0.35324405319401264,0.846149658828333,0.9807729520087713,0.8711831315881924,0.23136271838036349,0.16225342257882192,0.30058653202215013,0.4496285019670354,0.9546672635087985,0.39316220193878837,0.26941112183424454,0.10119947400321694,0.4491871088370991,0.3839266744763776,0.48004342231089936,0.8842452155004907,0.7449840113529,0.5093215568129477,0.754979285715883,0.7397540479333959,0.22237334946355225,0.17017499027084781,0.26266169414954854,0.5095825818121735,0.5199706101244108,0.8509013752508303,0.8751149921307295,0.6941984461741939,0.8358146419920471,0.0586613926183408,0.6966352159126521,0.769357393524905,0.9652492571972211,0.601695169913526,0.1746815906686765,0.5926992374380964,0.4077683811736583,0.10903225977835596,0.7039701076872955,0.17758021430664317,0.11136510586465964,0.3449554216253359,0.30236670640550134,0.48371643591520597,0.3389252315582054,0.6811191303182937,0.737145890679497,0.7647105428345389,0.4163881498734876,0.6717161778425962,0.0458213308780091,0.1313130364806654,0.9141162054040293,0.05088340905664834,0.7266431467608809,0.46370018508686095,0.5177962115602286,0.44130781970853716,0.4262150791188515,0.7016385535713798,0.8508449253416026,0.36460170776939504,0.8538860470365537,0.9892809178812114,0.4610119023831605,0.9622479410635485,0.8698160109089126,0.030659600609624027,0.6158799118116618,0.5854011106115449,0.3337928704523603,0.4842546409802737,0.5335865986895714,0.7698631043136019,0.16667789695507862,0.7781003427468947,0.22237649373327306,0.487590183458942,0.46340593522896634,0.33705676569121223,0.8572744191978008,0.5710888465098563,0.7681039674760617,0.30217149374435914,0.7636634157831979,0.318945322235342,0.7172931576867623,0.14510178622521241,0.908582434453086,0.3731752867653746,0.6668971582482774,0.6470371910708115,0.3966278682635933,0.5818038796369516,0.552987513120476,0.5403170984240668,0.4192036373312127,0.41230782819408907,0.8646795838854797,0.3550002429919872,0.7823064844025673,0.12141044070637119,0.14260503297027327,0.5638184976834959,0.9789472960988601,0.3235282104544426,0.2650181151889308,0.7744627739129797,0.513324746823483,0.4932258964152978,0.5185322622452655,0.18808462322570074,0.7923512873264802,0.7086360829049312,0.3426549074578553,0.3772204459180837,0.9104042794351821,0.2812979501999231,0.5005072928667351,0.376015192028857,0.722754396707411,0.9277431371258529,0.8704636982406322,0.33072661185606633,0.09887696613349028,0.5922033579640058,0.7516362158868624,0.25864498498964505,0.5737061732468438,0.8430440953239422,0.19099367936862977,0.28855984130114565,0.36599358887772393,0.12389528849865927,0.6605985291216274,0.5704249990094645,0.9873972261088706,0.4647824404772627,0.28791492017011167,0.8514867897331371,0.3484666101280267,0.6374358260132644,0.6950445066267346,0.7046042584803638,0.03575007906577188,0.9290119585166181,0.9448521063273057,0.13993943466464942,0.30447660331404003,0.821993490211675,0.6437151159791323,0.3211922520613455,0.9532850340953472,0.48893440542715516,0.40224647540162883,0.2308388059694637,0.5518777978627623,0.7748038861366746,0.11034195307850281,0.9508058259143,0.6256728306477171,0.9144387646822587,0.15191514366325576,0.07392168368597152,0.20226376793174117,0.4508828310638737,0.3993458648775494,0.4889225474522787,0.3568030130206634,0.6238752214148029,0.6885354096168783,0.45790653557544747,0.7648427723947018,0.7029755463034544,0.7646966953051728,0.3025064176003813,0.5892578507498849,0.5190686414294274,0.07943718216537876,0.5897068156078482,0.4256558930727776,0.39889151150700464,0.12114238439455649,0.49360456632219796,0.2486777321190714,0.35752036202939474,0.9512882521660411,0.09744267139801588,0.32322959003219864,0.15495915850836917,0.2812253633485271,0.3669330208940915,0.5232809367910292,0.16948908007104735,0.19922744886377597,0.6232594847211943,0.6809288158546729,0.3448715362656869,0.1375968867394004,0.17031633989688943,0.9897102341472876,0.29205342292202796,0.7140569238479644,0.5177758227966176,0.15161979860990438,0.2542154145466018,0.313310939832234,0.4977699752870932,0.42146762139965954,0.6310416982707132,0.0021755390446744904,0.8999197239947774,0.32841800175682545,0.6978706261983407,0.134813563596889,0.393439314952575,0.8464569565339,0.3466714025992541,0.8907475047844828,0.7391113491695116,0.5584483871880457,0.1818618338186071,0.9127207746514028,0.39244992858252714,0.6561534251279433,0.30351956072811914,0.6990196158519371,0.9279628968522857,0.28998829329951126,0.5556621474605521,0.21143500007789062,0.10401360618307942,0.2576822736837068,0.7741620769142805,0.1909373272985515,0.2940864462886399,0.671519077032241,0.6156090764343003,0.4126466118367431,0.3808589619127516,0.1569871103847782,0.8938337884807712,0.4497360606318124,0.4499479379068081,0.6871178368198902,0.8361884283943013,0.9266731018405425,0.5977805497749813,0.9693241256081173,0.2497860299704613,0.3543635195690966,0.020753974331068736,0.5333179992468429,0.321495744796612,0.4755529833492864,0.5358663307840823,0.22095612222113292,0.4435652160472685,0.7159896050231127,0.053871709561166714,0.28313074963216645,0.09033665576298411,0.4687717257647266,0.37762456481098194,0.3976821041951184,0.8186214499259026,0.45939182990361904,0.4440927532894934,0.7461513044569983,0.29914169167760085,0.36895769231365527,0.08758003192990849,0.4291042203641824,0.14365761586528203,0.4820052557246868,0.08629746991232667,0.023165005790092286,0.3453758650102816,0.6444836841553581,0.2897848549204616,0.4614223745608428,0.6393494999622951,0.4916528254649841,0.26654722889320803,0.27265050610022934,0.19920105163558888,0.058835807634549875,0.6366433848961479,0.6710489040961785,0.812631851707212,0.6765714573987391,0.6874415241194507,0.7273365135022554,0.6997352179758902,0.6401155877263347,0.5355638542967427,0.04922833891075995,0.09522588927652409,0.9284412109850839,0.23968906678112778,0.01585707458302088,0.43169678224021824,0.9506010358865318,0.2534603619334419,0.5023102937570174,0.24684177068400914,0.2796780133696457,0.9198351968549556,0.7914656098079695,0.6197801051293017,0.8525325114976499,0.27836316038501185,0.4956170700177407,0.6521107677750715,0.7296457385119748,0.2612186516268018,0.6264126962500811,0.025354400998902404,0.5379683222326148,0.6188671533425019,0.3790081084349719,0.8324272725406439,0.563886215972901,0.6660789306869859,0.2184347886313971,0.4827580972417409,0.5773145895155731,0.1239782959839475,0.8779917344309551,0.05400005521389484,0.07103003360000804,0.7027192235815813,0.5212172922498526,0.1414627129251138,0.7181060662335716,0.9987050223605556,0.21663251840498732,0.9131415155881457,0.7723686485905725,0.10757454487746498,0.46193213741771744,0.6193550595159403,0.21915840857574365,0.9974100695899679,0.05213406541316146,0.2552042368801366,0.814281000604457,0.2559503943370729,0.8327514485333647,0.1955429320793005,0.8800355900413426,0.9415736654262332,0.46573434436579664,0.11299217319459287,0.30812190320420196,0.6127654606774158,0.9976810165414123,0.8802677013549247,0.6486155496375843,0.8203859796129456,0.8272684009002051,0.5369329789971491,0.5262396842286203,0.2905092815274273,0.5290510990582422,0.8832858006474127,0.5377176463264111,0.26873367633351175,0.5333180237454211,0.0306750905623272,0.9569721231058277,0.7098492720194332,0.8868701877262246,0.8171145720055082,0.4066639983579188,0.9240104998046477,0.8013589684183109,0.049422591009937955,0.955851332216449,0.17522490481152064,0.9255750643744605,0.7398437019812043,0.7166974082510496,0.840720170316442,0.5927554765183105,0.8332782628282043,0.9170285955064612,0.25570397282866386,0.39447348841662455,0.9481004921182241,0.4968314782179919,0.9018742603113241,0.09568961865972292,0.24234843717551113,0.7902620048297129,0.6694913824270614,0.11949450345291335,0.4007634535200135,0.15322554255355936,0.842917646350138,0.20953597138300717],"mu":[-6.574188472169316,-9.987660078696958,-9.79168090016833,-6.993996591421759,-8.191402952211002,-4.2186480055781335,-3.78044450997431,-7.953443744531141,-8.240762647238075,-9.123138866306366,-2.784603717871361,-3.9765576177618134,-6.348715379577772,-9.791334804148002,-6.338049974935689,-7.360215495002729,-9.148247158778277,-1.0931251876373604,-6.669376678947785,-9.612886406109816,-2.3269081833502248,-8.901183793666574,-3.6864827716701964,-5.766223943245768,-1.568241106084065,-7.376259554425674,-4.781561647045116,-0.9441765260040147,-3.308198969236984,-5.96577353943895,-2.1843572784441956,-5.9101844574187234,-8.625650295079632,-9.445439651667497,-8.217267161408676,-6.150111720811973,-9.864888702010958,-7.0659228992983625,-6.793943850695898,-9.467538668597268,-5.90251901905024,-8.26827042565152,-7.974095288836553,-0.4740466205495464,-3.366407618146643,-6.6451303300497795,-0.48371161448763855,-4.283863937659267,-0.35249589795165237,-3.88117363753143,-2.688152080867523,-8.583298055897986,-1.2552553365087293,-9.654000685135713,-1.2224568185862172,-5.742826082815162,-5.502152004696739,-9.670382922212376,-9.906887862894884,-5.861509995586105,-3.7118076202550254,-9.697018297529173,-7.041986932663969,-9.23397055620098,-6.908659024931043,-3.376455728201422,-5.3508713180394025,-0.02625507786059078,-9.04074584005306,-7.158657023067578,-7.021906967482279,-7.036756548022192,-5.464148258356333,-7.5421657472496895,-5.330744149641138,-7.717677119521602,-5.486686939478169,-4.639337819510159,-1.7058612412973573,-7.175095159238656,-2.8892499856980636,-4.452379687479315,-9.482780811273583,-0.9989538429137679,-5.684342773312244,-5.984244734155846,-8.627408926431318,-1.9458340831115906,-4.883905298219549,-8.847279373169538,-8.513201442634733,-0.871701054581755,-1.1909383031782284,-8.48575570668782,-0.9679029350416779,-8.603365726591804,-3.0668600543953217,-8.762846562640366,-2.1144488578638176,-6.601508721436698,-8.105809824062113,-3.4569304997474704,-2.715958211541818,-1.5614019275738023,-7.239975782900975,-3.2968244044599104,-9.177023654333967,-8.852220527053339,-7.205415283595908,-1.4424723259248928,-6.76003454065885,-4.349671679041299,-3.1982439621825076,-1.9642612351392685,-3.636763470052,-1.2301893778070094,-0.8749671730423247,-7.3075316257215945,-3.8436463182964142,-1.6515377464983905,-1.9312349831993747,-8.379104539231212,-9.508839889367257,-4.511494061070764,-4.427803111691149,-7.664419484229068,-1.7120759028563426,-6.017013303617942,-5.753889791223157,-5.665805244939568,-2.258303436488369,-7.639369110811272,-1.3670593236920103,-6.297197906425886,-6.076213263223284,-3.9916117877876744,-0.6026436099220267,-3.7716116647430376,-7.306569216356584,-3.468637124056926,-4.207537401321724,-6.699058331087819,-4.918392633829094,-6.987487015784595,-8.661328036363143,-0.948510038959447,-0.647162214115955,-8.530772589183758,-7.301938234734631,-1.5949660290662115,-7.946434843216361,-1.781857825331583,-7.032150477020178,-0.93656908196734,-5.264756748858035,-2.992237448003905,-4.021557819125999,-0.1758131420812159,-7.7532448028973056,-0.07750706157015896,-3.740176898919756,-8.40060548600108,-5.223321875563773,-0.14555760422922281,-0.3665649135977156,-8.337546431864764,-6.442368835807621,-5.157791997213872,-4.320328512485759,-0.351084239538515,-7.006798442170918,-3.4166913046665304,-7.184774140424159,-7.502286604838202,-8.884295866183633,-3.126104396417666,-9.967592655246682,-7.474366867040163,-5.771931730507685,-0.18253524645486685,-2.304458367880966,-4.428514106456554,-7.716653040473944,-8.997259167680664,-8.302332124797625,-7.31604799523164,-2.7180196007011803,-9.81120090157307,-2.140039157633433,-5.20474330464433,-9.3804904243199,-6.452215554359335,-7.714075522313115,-6.30642497094165,-7.394031485302657,-6.370514160298734,-6.526813924566797,-9.091245865275443,-3.73992960742233,-3.7746976693138024,-1.6990797247702805,-9.146620416741637,-7.212187429433845,-0.3024010212611117,-4.5055013026620845,-1.6155780376152151,-0.25820670158943404,-2.1387485512315974,-9.295468197108933,-6.055727844792756,-7.432878441689585,-3.559953066838304,-9.872071439481855,-3.2926420296320913,-4.597464837554228,-0.8344752618187234,-6.923771778173975,-6.571762325131432,-6.562865552807686,-3.0774256581095294,-2.801676247744833,-8.812362733005191,-8.493410173839091,-3.122919264665056,-7.150496779721429,-0.27668281976366504,-8.998756794302231,-1.4197333884219399,-1.2108158106243216,-9.11439420347919,-9.924543950686694,-9.57032656057021,-4.4069365071956295,-7.182021835743406,-5.948440385864959,-8.469970718828536,-8.252134865555483,-5.929158511178065,-1.3730141691296005,-3.3686733451147277,-1.6914098712581982,-1.4803760741010752,-7.814272385906314,-4.60095286274564,-2.393707774789353,-3.4263311717079525,-3.430459102072223,-8.497695338286599,-4.444857318925051,-9.36131868027055,-3.7718565081357114,-8.961773679856753,-6.460894702891695,-6.346435346836281,-2.4596423962981273,-2.284495542126539,-7.931258409287101,-2.246309063977243,-1.5233141452533494,-1.9285064147757613,-7.075624448245401,-8.61116594533094,-1.4466030142048214,-0.7646997728724259,-5.484659771016314,-1.0479027952424858,-5.7450397227284,-4.266301297137531,-3.968015610863387,-7.9726982687351295,-1.596107986273514,-0.1479057094947933,-9.53817889222903,-4.619089214411815,-6.164693812714077,-4.008190054370033,-0.6566265221201206,-3.7971863491687663,-8.842597306310898,-4.5075955430531085,-8.602571047096363,-3.2970245310243085,-3.8539149816271,-6.6824557365932735,-7.885406138617171,-9.783577882807384,-8.40945059080714,-0.8282325191420981,-1.7350048413103858,-6.968817804383914,-2.57168798372734,-3.7217453196630745,-9.470627671046623,-9.821893987443326,-7.6872405621099045,-1.3220552612844494,-4.4872484880835195,-4.408332427897308,-0.8972735485114924,-8.574069981511109,-1.094631831460886,-2.5090670712061947,-5.099152629454597,-7.233666152564888,-9.265805444971733,-3.769251246713188,-1.6486496488745495,-4.908261517400884,-8.468818238516933,-3.244131996456061,-2.388553391933539,-2.8619070757650444,-5.0225509343306936,-7.793855808761425,-6.6355634187405705,-2.334047195829214,-8.746636787671205,-9.88002695814126,-7.810843272353869,-6.154641142147687,-3.8694438147259236,-2.76380914121815,-8.341863057426373,-8.644481517099006,-8.210716438837235,-4.672611862334868,-7.497176484072742,-2.721661786810241,-6.55574830755622,-3.8676970314516845,-6.270999714591293,-9.666434567784947,-6.861046752400632,-9.21724962605654,-6.045245980597366,-8.406486275776828,-5.428689512477643,-1.9334944548621058,-7.235689253936073,-1.7966569775327268,-8.885065210639002,-7.168729555613864,-0.12430291786933223,-1.0876859396893601,-3.939491376279014,-3.2431486412664445,-6.220602216690176,-5.807382241891652,-2.585963213364224,-5.817470920691652,-5.231899273374687,-0.5725455799493129,-6.010474641753854,-9.968292070755638,-1.827287873235548,-9.637352496818703,-7.759817267420665,-2.9438332768336783,-3.9422039938292697,-0.13232650928345357,-4.672324431856101,-3.658953094724575,-3.892078781131023,-1.7254005579543197,-7.764400137304499,-7.551251236728975,-0.9306191683002707,-8.92022512729002,-7.708191411882486,-0.989572405945438,-5.020953466918168,-7.588339160718151,-6.7141696252965,-7.135947557641615,-8.811605467518504,-6.6146425563502875,-6.181194236805474,-0.40509819690432325,-2.535166743336028,-8.634754887198497,-6.992585786202943,-1.405815823243608,-3.3241866280408083,-0.09170034852822972,-7.689059068781738,-5.275049301620216,-2.130779741394395,-0.4832580555474464,-0.5880210707207745,-2.3646896029612874,-0.5142821994205926,-8.935447196481984,-3.592509271034252,-0.9090601683924637,-8.05573481578124,-3.6971982694008587,-4.739892548381722,-2.8989025980937555,-4.901644544198631,-4.094936416059836,-2.223830953438135,-3.4690382233538952,-4.209290712486813,-8.154138107746931,-1.959695592745736,-3.061379207957773,-8.046529808267566,-5.281723472080763,-2.2556949543155858,-9.162290072085849,-5.573557576906481,-6.349602858825212,-6.102606939194988,-3.3990615771602606,-9.534990807478925,-3.7984427094292372,-2.544539023102974,-8.158797903437824,-9.588670882621495,-9.486869042383743,-5.031343587728408,-0.559732611899979,-5.686013865351979,-7.243072429533894,-1.4221432597452766,-2.7202768822409973,-2.890095712590377,-8.52584484767619,-7.151027620728529,-7.357386400874885,-1.0321858444321252,-0.030191977481484056,-0.5737009619066002,-1.0959170909156835,-5.965202253613007,-4.144291332971683,-5.611521460962652,-3.9698637751218957,-6.935331875937118,-9.769962262151395,-8.507525780799757,-1.061703146036772,-1.8804907430512419,-5.269756501903117,-9.571186542916193,-5.589201176006893,-9.526359870842656,-8.963108968459094,-1.9927493080778436,-0.35082284700851396,-6.882643391842245,-4.844002269491703,-8.758635248792316,-9.548157909732621,-3.131067774945122,-6.915621273775887,-0.24846878932386351,-5.671715680189386,-0.01159902341508312,-4.941593260573381,-8.272161865834214,-4.939554110783659,-5.374045590580529,-2.105693881234083,-7.531497047678039,-8.547495699791508,-4.054051362622535,-4.207244107770347,-9.56755373161881,-9.309969496671826,-1.0474166093117399,-8.201559055189808,-5.739783938706468,-2.004557929244264,-1.3088501730424706,-5.0402627608610295,-7.80480457704204,-2.4240216598833064,-7.652644922173897,-6.853662298487269,-5.511750280374081,-4.398521657157348,-5.661731330932267,-6.635231442915666,-0.41633810863119347,-0.4473367530257444,-0.2257842772339025,-4.988419579283323,-1.097403966833428,-8.813815370512136,-1.5390473789422798,-3.1434017744728204,-8.089870420914202,-9.919825849307793,-4.655089396441399,-9.712622617850554,-9.33622633850219,-6.757875027973634,-9.535619920639888,-5.95651899338594,-9.486945699007553,-1.5186748875590972,-3.5890867526866144,-8.339749414466455,-2.413990906880521,-3.468862932769845,-3.4572530641202803,-7.385260031347693,-9.835918122103944,-5.524335128916205,-7.1974782135650806,-3.0452074668893614,-1.264327760816073,-8.511807128072991,-8.754510864227239,-3.929222534417953,-6.456507133256868,-8.865857515477053,-5.9376364329370235,-4.934314069632859,-6.273633007807455,-8.742462970894412,-8.590513604803824,-5.048272051641705,-6.920582911943198,-1.6304220264190694,-5.8810735678229875,-3.912407604243233,-3.7162643268735973,-6.660617929324404,-7.959664904510452,-6.088304930273296,-7.471041357852062,-3.0056937035594533,-7.113080605979629,-1.6699889175012506,-5.096196948672526,-1.2940444670948104,-8.3978363152731,-1.8652874413278853,-5.889389185211948,-3.4732139340668278,-7.193680815672188,-3.492813294822139,-3.468696866547014,-9.215241341035998,-6.6960869356018815,-6.396057253530114,-9.105636051512251,-3.4757059593708783,-9.322296389979128,-6.3825700044730205,-4.006937516002498,-6.630952932644131,-2.47786008351246,-6.592590574968917,-6.3780443397808835,-1.110720832800376,-2.264220051190615,-8.951483354579395,-3.1352802846582417,-3.6710948961442114,-0.6618875556738923,-2.1655173387843774,-2.7541147129482457,-6.419084542926827,-7.631199581117922,-2.4276925444347697,-5.097279145219371,-5.253219193421872,-9.882874485930488,-1.595139460430659,-6.372710256792871,-0.34488128438775023,-5.483442886278713,-0.24069715266874292,-6.642967406030311,-8.818322550848857,-6.936233511921159,-3.1362664907711557,-3.9148925602766926,-6.198147175234865,-6.280323209555602,-9.551193114962448,-7.845658415536072,-3.0166127749056737,-5.097327608454982,-6.727536466620741,-3.333162507839469,-2.6293970889958596,-6.11575385915846,-5.9784098881960634,-9.168718756764607,-1.4780808722728045,-5.734648802706084,-4.442116566623742,-2.6831835770631973,-5.518890018488662,-8.057763499392633,-0.18763708299745163,-9.114729569593614,-5.129678681289256,-4.346660340166575,-8.170284457200044,-8.791120491235203,-9.599357576650007,-8.034458710036896,-7.21302648188167,-1.4527689703286617,-3.34905028879813,-1.7488213443103828,-5.380322129950339,-8.442812135991355,-9.15080213491623,-6.445485459641008,-3.5480750079575296,-1.3514152266474344,-9.744765799778662,-2.648754635068531,-9.10800784197531,-5.989739122756548,-4.83853705684208,-4.495889731114168,-0.4180449743314174,-3.8922213481693513,-7.751031277818345,-5.835656242206646,-4.167839159388562,-6.4653244012715705,-3.161981353582979,-0.8920370826201518,-3.945450131456485,-5.73385798849956,-7.529332109063718,-1.0719925103428052,-9.153553998894825,-8.286481540625006,-9.462698336284475,-3.5897130957573253,-4.8396166781892695,-7.312222008076281,-6.576220312568668,-0.4379246491784694,-1.379736724668723,-7.389286833544375,-7.739638445125383,-4.0031103453540196,-1.627423562001078,-6.158986394567831,-9.421880981082442,-0.8562916186629055,-3.8220296401791254,-8.291847350020117,-0.8745114796090858,-1.67716183584264,-7.287362054421873,-6.462270353004254,-0.5605824463939268,-8.175141949250822,-5.247581307582374,-3.5338115949889404,-1.1636883080434401,-0.9730514314489258,-1.1663530505879516,-7.3001753398268505,-7.148296927505314,-4.529645845792811,-5.434093182029187,-3.01219833321944,-2.8658830766268406,-5.296380760574559,-5.1847999004338385,-8.859079065828483,-0.10010107914755428,-4.779512015314722,-6.243037910355742,-2.3606467929421004,-8.044764302735878,-4.819654592811706,-4.435294112295152,-9.891294629809286,-7.753003780516292,-4.7614692225866895,-5.620778770894336,-4.006493384991796,-8.283758119841767,-7.450958498145166,-0.5780934947080207,-5.001507119972759,-3.9233087151362156,-4.442103706707583,-1.6770473732726843,-5.55879842627469,-9.389746941741814,-1.4869239843144788,-7.534284013171957,-6.8040142518098135,-0.687171872372061,-8.653430339180288,-7.853803572424811,-6.895409473637137,-5.515611546801475,-6.829637652716521,-2.857767320430804,-1.8933633561141505,-4.073220893417888,-9.135081494598996,-5.242794514688523,-4.686870249784003,-1.8640879845097236,-0.5809259373427422,-1.8488596972022786,-4.672113678340562,-3.1772076794713433,-8.983705935234362,-8.155389652819576,-0.4640651089219783,-1.1946025150216988,-1.0021342356508334,-5.153683433578733,-2.691933362367498,-2.432556137598043,-4.928606356620078,-1.5840281737066997,-0.4000689409392444,-8.74671298819866,-5.4584187360188485,-8.152508783584999,-1.1220036350158558,-9.805795929565193,-6.425335180487155,-8.021955545039228,-7.951425225070185,-3.26943624580895,-5.839434562117085,-1.9797016023779945,-2.385553975350012,-8.603912020415724,-9.568869947772992,-7.633315437616042,-9.667469028355626,-2.4657891537983723,-7.600833924758577,-7.1576686374139005,-9.76203623808223,-8.246596180844152,-6.8280458961401225,-9.942468139156123,-2.969281085159341,-4.523330339644646,-4.021531857848357,-3.5345834886568728,-8.29822640027407,-7.822819831301658,-2.7571680412494226,-6.6525282080900405,-0.5045787920287248,-0.4674564463060271,-7.3700064557464895,-5.610432528984424,-5.611820191211265,-2.4033621185970278,-8.80495744135552,-9.932892565570956,-5.942591681098881,-6.196645927453477,-2.4997821937805975,-3.995450381550427,-6.1793181111437745,-5.41953757009426,-6.152743457114882,-0.7111822784825939,-9.798064633578543,-6.791766781687885,-2.437236346426963,-2.253855545100598,-0.7086720739213526,-1.977590231703641,-6.627696261405244,-0.4326154931401227,-4.985954694421222,-2.7588004452582404,-6.541123811588514,-2.4071284432364393,-2.491498391318967,-7.357569632216549,-1.3294191480145656,-2.7799519254406846,-8.092503864320477,-6.581200083660419,-4.244226169882371,-1.5896020259583077,-1.1225651561398564,-4.255533446153157,-6.852971354250044,-6.741261869718594,-4.088140228977162,-1.261607204950277,-3.7248914117205345,-9.463442869853667,-2.0827401430474013,-1.742812674377463,-5.247894881098332,-9.790763504218354,-0.82880996885764,-4.888490259860207,-3.5174188064627065,-2.6313962323836138,-0.09473431318163472,-1.186516473475534,-6.031483275752549,-2.301122162244551,-2.1400830588621167,-9.596229132529997,-2.8800948871267162,-4.318279835899112,-5.3022765482109175,-2.0721359856563604,-5.916166334183406,-5.597175751543282,-3.0616202255701697,-4.4466534445835615,-5.757984786675006,-6.903669169740498,-5.554965749506802,-1.4290957999171838,-3.828715609366893,-0.5263405458081971,-2.9728339808612536,-9.486504527338518,-7.004059272774676,-0.806741591133322,-5.329781165023865,-5.04704555853823,-5.078125252305261,-5.795077463477614,-8.931068867312849,-5.891544833674509,-6.023568171087408,-0.43543574872560553,-2.6212254879003782,-3.238423901395895,-1.4649260506966,-3.552894158607358,-4.21918315004671,-0.6766370755713935,-1.7642112004708443,-8.218612866257168,-5.776116736043539,-8.30502255967479,-7.1770372665561055,-2.4232226517623023,-3.122664290025303,-6.7990073103330655,-6.434810741310708,-7.4016019647246285,-9.127650759499502,-2.9321954696052144,-7.9152750056958805,-3.5610097810000796,-4.055379917234938,-8.939209147431008,-7.328402069356985,-5.2045595171070635,-6.3629633630863225,-4.34424892818984,-1.4841471244970372,-8.528051627078872,-3.775805730276134,-3.5079572141098403,-8.801070219062801,-5.470848863322093,-0.3735483755048241,-6.057915195207489,-9.69633229986788,-1.8560971742356291,-9.221640538737446,-0.4497925624488164,-8.350291516293261,-7.029434216147443,-6.69375727828225,-6.700164881806887,-9.787247345007819,-2.9405607332118855,-3.4985766487784353,-4.318089136364065,-5.9145931091622135,-9.408605933254883,-1.9622581621748614,-8.792362602204701,-6.791715995063248,-7.884465673147865,-0.47372558019223243,-5.30567983869048,-4.300719131832915,-2.603890707949348,-7.506882922956786,-4.174210917042389,-7.011761567941499,-1.9158199675704823,-4.7409466936752676,-9.939472574874825,-3.5002474779750536,-8.701406715364987,-0.10043727072782671,-9.660671101487656,-4.040662108417294,-7.629919223213994,-3.0316705061223437,-7.763693489070644,-5.376231054975085,-4.305796986379324,-1.0013963551006588,-2.7444959554809167,-8.682134404777885,-2.3430398682701647,-1.601596496497506,-3.4195671202648192,-0.12471384413823783,-4.146287421305638,-9.163531951962964,-4.954705387268945,-9.688274597417692,-5.619529983247709,-8.108433182323548,-5.563782121682297,-4.03391455360514,-7.602034242630358,-5.808835433518436,-9.797944666961246,-3.9657773033037214,-7.426470254345778,-0.7253611076866973,-9.554283899775058,-0.49291926714776,-5.420772619586513,-6.429663798472318,-1.506030060876753,-1.7524165943100423,-4.040295381781416,-6.824806144304516,-6.847540322315286,-4.203467584631708,-1.2273844202998463,-3.045739996059229,-8.18334547152906,-5.321078373455663,-6.536526392114821,-9.192390122388526,-2.5008626638309317,-6.700756572343105,-2.6026388499158104,-7.673681583323207,-1.8628608033637994,-0.22651025538464875,-4.29830620663203,-7.916654842283997,-3.3956771149693243,-7.903817286659178,-5.714216171318467,-0.4884707883025863,-3.0460324635724034,-7.995853036477012,-9.788840005292874,-1.0533936282382417,-9.386841258602129,-5.305420655710336,-0.9653092446460532,-2.5929506847970107,-5.9739993889781795,-5.353067745907598,-8.889198603147328,-1.1613801882793173,-7.239379055338326,-1.7707804500625146,-7.5644393511064045,-7.504302833153183,-2.002222938360927,-9.429017941296895,-1.6918242098196412,-9.32469030750837,-1.6056243231762757,-8.762095361551523,-1.2164364759702795,-7.258695851146713,-7.153503129573511,-7.768857931124757,-1.252853271156129,-3.7042239882024064,-4.402105318774727,-2.5024386483339156,-9.220645443025028,-8.669238046928067,-2.867939263992265,-6.597519672628069,-9.810964090997278,-9.3428254163637,-3.749457457556058,-7.855278443569434,-2.7703677203960497]}

},{}],70:[function(require,module,exports){
module.exports={"beta":[4.877219605115689,3.7152447985531434,0.12079094222795961,0.927139701554397,0.28795442106861135,2.206429004982432,3.3235812462077052,1.6177360900908289,0.023457957609795965,4.519499165410517,2.8227866894701794,2.422681709662867,2.2269827834220566,1.126441054432863,4.952220730730247,2.74822195057188,1.8980513045109249,0.17231714140444443,3.1679705439468595,4.200823835995434,2.2165791578175975,4.327975924254489,4.539682351108617,3.864391104498104,0.9930519212530042,4.199401332714841,2.0908939482505193,2.280138724695063,2.627485356605408,0.6801443452716449,4.187423966930668,1.9815642744997575,0.31923275888347424,2.215326796079151,0.9256344278831818,3.338352684481456,3.579134733825522,0.28169922570000616,1.7466540334228642,0.15613785146852965,2.5831331444210592,2.124914707711989,4.802794338377544,0.8063190585514879,3.7219756052774344,1.4559900213750143,2.675296138540432,1.7625784461712712,2.984414048673669,2.8204753852973576,0.7136527434823503,3.722507648984351,3.6898561197033954,4.21286515684936,3.774711987967599,3.0371070402039346,3.4818017929135268,4.708854939061123,1.2042715103532653,1.532396181417337,3.547191824206303,1.0037325792471918,1.5479997381125499,4.951086146979079,2.5088416278436254,1.6036510954709615,3.8637334923941324,4.423763527945512,3.3168112851060294,4.642605126463975,1.337397501384725,2.6141475255877267,0.45116816429921713,4.165309516452225,0.7826755201898861,2.811598783837086,2.8264887226058324,2.773839071684593,1.1752778513514417,3.474629252008331,3.2572982712074228,2.852222372328277,1.2412469170905605,0.5329117961698449,4.211474713632478,4.499908813753378,4.006951792170749,0.9370529640876191,4.586873699059061,3.7514417872521033,2.639177715022143,4.264238873671765,1.6609271338990717,2.357612648129215,0.20909792193987142,4.2741175376587295,1.7856533035085187,2.0552223422835336,3.134660929023444,0.041595305976882546,1.7346237965908406,2.743084616893393,4.383771446236305,1.336780766114587,3.533682525892554,2.36432604264188,0.04784504324845673,3.35243798052303,0.6478280886959276,1.4009230482352841,3.216269920802576,0.18963099581318033,1.5138397788216695,0.2570955755204307,1.3342976925468208,1.949765711694318,2.8549408074994167,1.3684025570754044,3.067603534469617,4.745719477547423,1.1541880367718926,0.815801308267905,0.21221964788465608,3.324582604141412,0.7956774255541421,0.7322744816449,1.4842767868397244,4.10772795986082,1.660762116730471,1.312693834654013,2.0867735186143612,0.06970140627170385,3.2627225647879032,1.4364663831108937,0.7999369712692339,0.973683953098814,1.9372762352455508,1.7970726119099223,4.901339679832192,1.857820079674145,4.466849517525229,0.13302585019319135,1.1722751849501478,1.2363681596500198,3.65472790372816,3.4513457542575687,2.5679910143108886,1.283105707821025,2.040914954929105,2.101101187198701,0.7804419085180503,4.949601315561452,0.845601893650112,1.1678992737436333,0.8398926985486854,2.3062936070289597,3.626885821904602,3.0764620699237675,0.04315178521987373,1.179433422403915,2.4421043732755985,3.2703803859870737,0.16345643571464064,0.6150726087147651,2.972391679026484,2.509966589351207,3.11911694324169,0.5331735641555913,3.0038048830550657,2.08518935845066,4.85356352810377,3.676744394199928,2.01624716121076,1.447563995061012,4.091028321678683,4.329129138087286,0.3258563081788546,0.06671333428862947,0.7617550091108538,3.8334567357467164,4.249600042156717,0.9263231330519883,0.9978991053215447,0.553374807865834,2.348577623328083,2.457133992202775,4.161591955664624,2.059464476189813,1.3403224924178792,4.69372568054966,0.32105867057666604,4.700894898453404,1.4321657719235026,2.178995839103549,2.7736783233592046,4.24731997209701,0.6146985107058778,0.12583619983451477,0.47896136808823875,1.35152279155772,0.09748704344611836,2.460588887049452,2.7366695242999874,3.81286587899326,4.631893880562984,4.839567475822114,2.8146388921333743,0.5157389038876581,1.9463892238875469,3.445694887854466,4.900033095494174,1.5428358041599222,1.0848624502024529,4.600503725584798,3.98131828647987,4.148418628997615,1.1849955902858145,2.358445474104991,0.586590308539332,4.50967188849453,3.212088017303396,0.8114336566236235,2.6691103422232407,4.225687350823566,2.5421014525870547,1.6208277591321163,0.09138705867359764,2.405045493896724,0.8425545760533992,1.3863201886981424,1.3602748059847625,3.110554301889218,3.8349783551528893,3.408190437230659,1.5145844284451893,2.676361855549212,3.583833781429211,2.28831490062439,1.5184889921888234,1.6355529429038151,1.853308053220627,4.288630638037628,1.1031529360028036,0.1683067428288798,1.81938655884339,4.936823276456222,2.5323372817646694,4.265727830652652,3.0983059243970903,3.408795056218344,2.4343418606395195,3.190105442970098,2.5669988052011963,0.8222196187749731,0.9615299689936874,1.4676088562689393,0.7215244384303143,0.07359120206582692,0.08084134541908039,0.04946544364129224,1.291649205599642,2.73041628939629,2.844006240010233,0.7444437353285938,0.07325959679424066,2.797539020922737,2.661513720690846,4.409399534755492,1.6698907728883616,4.99337428450508,4.164700295069649,0.6521758698851043,2.029416795976168,0.764741361568857,3.0747196684556135,4.4848293065747225,1.0500751505462358,1.773246530863185,3.493143090810358,3.474300248076693,2.3802907663030703,4.443856892635166,3.9233129837362535,2.0384365159763753,4.104171296829644,4.432890005758291,1.2209103104391816,4.112460914143536,2.751507922765739,2.821146253153619,3.1346245673818274,4.432105770511611,4.433665174342281,2.774755318050798,0.20060094392922223,3.746417800295805,4.1554510210222855,4.624656757898261,2.987664009586549,3.000011867408028,4.236734357334244,2.72987395219321,3.391429199544632,0.18876471980218468,1.5489008750970612,1.5047933203102015,0.5747890741712569,2.9648787947983024,2.0337979937649875,4.353424932997384,3.495295960434354,4.163120227333094,1.892445746877497,2.727148447005816,2.7458019377981993,0.792657112478311,0.9344404511384052,1.6258235399386622,2.817726756543668,1.709175285805894,4.174706237600528,4.008237741340621,3.9445010579521753,2.965508419846339,3.2176323767969395,0.2427374173994823,1.6918153038641481,4.132238655106246,2.940512552864111,2.5105602177344566,4.042421708185416,4.433315061323883,0.720809259013222,0.8001183207927132,0.29761271463682903,2.944259182396183,2.7023367636380238,4.26459793863935,4.6334899361828885,0.6649543373847067,0.7234371689870989,2.6378853641546494,3.6921254908312937,2.112132021163794,3.01009572547128,0.4774523156060295,1.8594527739103939,1.1072893202214695,0.2634586745142109,1.5996660271812824,2.0162612406004934,4.21235972462242,1.366854127414926,0.45731191878647826,2.182332989880771,3.7240958302512075,0.06026069646065224,1.1652369321098588,4.091086651482925,1.0267164173108911,2.218130572206245,2.2307067150250868,3.2821793209766046,1.1421773130399426,1.6339070860006044,3.6480768146305786,0.6288036319552226,4.75764062676613,3.157372860498555,1.7865470973878383,4.918122657887231,4.95696599458407,0.8438305037069327,3.2160429428846173,4.939846029519716,3.851211360100557,4.643562143641021,4.468449846505971,3.1295389536776677,1.0376259524095233,0.6383984378809582,1.1264406097360002,2.219760510663902,3.500910067252989,2.743280802129562,1.1696574642868496,1.9488228214810122,1.0121116837113653,2.1751889688510384,3.9032535016541847,2.449214958258076,4.679923893205997,4.0978372025409175,1.7637894220791206,0.10459934707314988,3.990648696323278,3.846124172066532,4.984371424702218,1.210398654770194,0.5328581763493889,3.3424224871699892,3.5128926397911275,3.8690604977873697,0.7310450950464864,2.8581955443715543,1.689977815744571,0.7965694624250119,2.619062191450724,2.9111726573237453,1.34915056533909,4.914567669504698,1.4847141314158463,2.180364109939701,4.621292098340054,4.407122076860814,3.1573686175949547,2.589606789709241,2.631590761206428,3.860714057348651,0.06570264546699178,2.0135043265297483,1.0327614070141211,3.3803611148830823,0.5215903043796333,1.267438852768682,1.906420359580504,0.1793647642842866,4.487579173893021,2.857580351028195,1.5439472160850232,1.0651450045727273,2.2293766466799934,4.319623906143049,1.2971109876656983,4.43866377198378,1.5638471666440201,3.174131496392482,3.829749625955614,4.449648357076183,2.81354672756825,0.8581246955540067,2.647810372645062,3.041122742938478,0.8277211062560286,1.3709770523830023,4.227643294148956,0.07030915011803862,3.376336293060377,1.1849031670535948,1.2164751306479182,1.8920130272981461,0.8226992593554738,1.1316451004707284,1.297220609313522,0.14188665508193865,4.952479175325788,4.299100336488362,3.0651308541455813,2.745645091240343,2.614910443357785,3.9476141531925157,0.9013425321233026,3.5396107602851155,3.5171621998501825,3.966809207696124,3.011896747986639,3.3276527914043266,1.7501261471985363,4.5442047062557815,4.555101100433582,4.494890973617477,2.244353544256205,1.551583755844097,2.9249447094138126,0.7637199185730714,0.663934222489696,3.0577856290797323,1.078902398010958,1.859688457860127,3.8179221715952147,1.4457978961781537,4.993726962944817,3.037890440320563,3.35580945919127,1.1252568023657228,2.3369095204743817,3.8724365683454263,3.6144954232753346,3.5742064340750113,3.007584476909156,2.344436755189289,0.68725567776459,1.3825237199893303,1.9530973593721734,4.184261294101961,3.2680562488156384,4.594353308451355,1.787443053558152,4.118666510783826,2.2415976509394464,2.187269702085015,0.2874454928810055,0.9335171895059546,3.1804460347863497,4.539623834262418,4.474863614272639,3.2094791535665887,3.518814416083731,4.8162431331921525,3.6795722553464394,2.6614774026116548,4.63784981459412,0.7442135592885624,4.358998360129172,3.315483045277845,4.18669876965016,2.8668593797578366,1.1852825243107845,0.7814258029991294,2.969895421942005,0.35952480078680793,4.221473668502958,2.2273553409035793,1.837382183175451,0.4515509288070796,1.0414064010549584,3.928032863477695,0.7007548026581079,3.324551884663828,3.576155866761762,3.1767899593993953,1.928704290389025,2.0793942923706874,2.1343458864156526,4.7775234734623675,1.2921485970421542,4.06800499556489,3.55744904913026,0.1082077392671199,3.530936593092453,4.811150044355576,4.6343300575074,4.129666540551529,3.8314746479716844,4.688940547827192,1.1264287628053349,4.192841500310939,4.8887680487696,2.498082855524565,0.9736378823597169,3.306706145623586,1.0277550469265317,0.3699666476241392,2.7112244080957417,0.7358820273600131,4.817454479383664,0.7683000425005304,3.787101953392921,3.3984560251875306,0.870373254684832,1.0846667684265054,2.3762710944125685,4.422584140091508,0.8046444681663689,4.898777923218761,2.3139184002897273,2.5582559111695713,4.954726912014154,3.3437300694838923,0.6491611162716049,2.1518637913573246,4.700306324118299,4.654701931796063,3.0994169150732764,1.1065942059612377,3.7629980867452284,2.2717074844826115,3.4362406730120734,1.3763955756355106,1.2635612403438057,0.3574675660962623,1.9521483357104652,0.8599187443513412,4.309614930323267,2.0128964902296023,0.90119082521112,3.438113197602185,3.286154371415786,1.4910872437446943,0.37762562655061394,1.0172387628163126,4.856840216166213,2.9318357851902555,0.2582544680687904,3.927378680000251,2.2515455327685583,3.941558825751218,4.660632656826128,4.273850353268465,3.291961046558608,0.6727879054524466,2.607358150537343,2.8465323717662527,3.2718643847349016,1.9401342470463623,3.6628382240512423,4.081314412464186,2.3733734155942674,4.658988353080441,4.625901264166638,4.824399914911298,4.573583566265781,0.020884879460505434,2.3800733103408565,4.333073428375935,2.6670407461156778,0.31312490005725,1.0784423674488564,0.19487962330210218,4.509257233189961,2.471053137010749,3.352910748158714,3.9589604179874116,3.268854961425366,4.398221043441474,3.1961289360193037,1.7672450109913507,4.881443821461576,3.697566479073313,0.6511174437925971,1.3733602387304222,2.9210333546434155,2.823285509766581,0.4061166152117912,4.071695221924715,3.4713364569118346,4.577295072009365,2.5419753946280355,1.9836148647578822,4.8850552151181486,3.6743538812695844,4.620358065021985,3.600225973828839,0.8217431743447157,0.2316209183208373,3.7575654625191213,0.3046486068346954,3.3580988174735484,4.692888484958661,4.471463970674105,4.505559504293415,2.3634375375877417,4.314306019975583,2.915508020411466,1.0210215285644042,0.4265407190795223,3.109211115265542,3.7619355976356452,1.7681941295045622,4.180940371051123,4.8439349652187245,1.30778240588463,3.755103585761267,0.11153410491060223,0.1686238632811088,1.207046385529934,4.396871799383755,4.850159214752909,1.1392283848408225,1.5464950327255667,4.250257323394119,3.015067975824656,4.751730910475526,1.381154440317599,0.35969374453905245,0.6991107358239124,4.842176410003134,2.1030924764865433,4.3987291973030445,2.498861809641334,0.17124077762047274,1.8561859669300362,1.784050220776875,2.3858228165637394,1.6164259080579002,4.500589156977131,4.767884231262603,3.5461214802825824,1.515542444229413,4.845947550599821,4.4419993814997305,2.4425664927021282,1.4751987781424791,0.22417313607418277,0.6986023325497326,0.8135755006055501,3.408206476063378,1.1666302752027902,2.0682932873871396,2.101959260095626,4.922967498209041,1.244522329280986,1.9099351697465128,4.206171513969304,2.4796567034721884,4.91697685529973,3.341379557855894,1.165954046138955,2.2965010554523246,4.300137583391078,0.7520651242271181,0.5998607075797957,4.668600140138798,0.388658293189984,0.7990533765364349,3.6512989352414724,0.011213464438984966,0.18487656434469146,1.5548204262676002,0.5570961929536666,4.304844808534759,4.43878684147918,1.2902981321456009,3.746128934398363,4.429835495321415,1.6645367936722621,0.5778141125852343,0.7070788424058483,2.285187387584692,2.0659589074595686,4.922369620242531,4.434166546770687,0.9317017814485429,1.8543352499912935,3.6542309851582724,0.3597874478505314,2.109043257662538,2.75697950860478,2.7404284969897716,1.2557662153789806,2.625751183088539,0.013635454298889238,1.027856644273859,4.029902310425676,4.317877968951555,2.160016567647797,0.8620194115453583,2.702272643733943,2.811636737199761,3.3937947466986564,4.767454223285852,2.094789370340516,2.70718610335388,3.297642520283307,1.3235285998332202,0.16258951711408343,1.632093011395055,1.550043486114251,0.6950830763339877,4.690019374423583,0.5744834902574802,4.877096316333093,4.4106111201802936,2.710721808846807,3.6963797772326923,4.628487959574704,4.084323464790099,2.829548506819112,1.7252893232120603,2.8321505390582438,0.03804759608988961,2.171090898123146,0.49958078320564314,3.795997224509362,4.134805202775807,1.5335155053778105,3.913768882100783,3.649607929960561,1.9034142261801879,2.6207326535321163,2.681739421495981,4.1101593500438085,4.012496779754635,2.7918165187321806,0.17917827824509458,0.277361372313063,1.0467847974353195,0.1307921745027174,1.8928999995473272,1.8642322352826268,3.4346631230978164,4.60303026118485,2.094708619704998,1.4731141636280198,1.4942229732721724,0.1621287800367044,2.1306403528240683,0.21075172619425708,2.3750779036169742,3.8354636420115726,4.392504038689936,1.916200881453901,0.4593218301510238,0.8488462145071529,2.249869001084072,1.2829101882732574,4.7055743264771035,2.421191233666793,3.582470521861131,4.976493733916239,2.6137072986487855,0.9499814193889944,3.8256238175281343,0.3345083025109974,0.9975343499288469,4.260823553445627,2.249845949494531,0.40467768087482203,0.543867697359891,1.7893115984236885,0.333169433679783,2.9549999789127925,4.469704073385341,2.3599566307026354,3.546391398186659,3.2773716753130246,4.608869914423131,0.7272942494746615,0.5773728645462806,1.728802407874841,3.87011726285589,4.033754178419303,1.148429602397919,4.0796863555741725,0.44524109102845544,2.067076980105844,2.3544869118750777,1.9382738475637529,4.189204883471863,1.5843030337166886,2.34136372100589,0.6546289609223466,4.683397109351465,4.638310072488099,3.6376689237516158,1.7338845527732072,4.938114717580778,2.9924795735934886,2.05405281627724,4.754513762911458,4.214726685572262,0.6867728436641818,1.9063693788552971,2.752187094595776,0.30447549682836916,3.6311593609123305,2.969894968695547,1.7445368194489008,1.9887100956777048,3.689152432139405,1.5917839012554913,0.48346300590382807,3.7321596052140285,1.3632566469179952,3.710493091131873,4.3792325261340395,0.2005474169792376,2.7855326425187688,0.5377141200440683,4.453624629996851,4.084704077810787,2.9984147265085004,0.6480859268523242,0.25613665191275947,3.554910627174718,2.5112005363999046,2.380036979996698,3.4429845435868165,4.987518450078159,4.826985480727325,0.7294751228549723,2.7062091067693927,0.881864762008916,4.629280700705839,1.3803358269356547,1.9785956153290618,0.046964091924657225,1.905920582842825,2.155995463758682,4.5914676974411,2.8781542069417734,1.6970669195453003,0.9998749731000389,3.9617070037326996,1.2149317347336896,3.3092251200605016,4.155447879063634,2.0588829987901827,4.337007598815122,0.23664314365267947,4.124868734730636,1.7576022189771534,2.1207292484813944,4.83552195822568,2.0932145074447828,1.2077159355476785,0.9212414131940971,2.7466958458591186,0.5695701089226068,2.2442240141372483,1.3314390707942425,3.4561683319168433,3.810939575879365,0.9973749667373644,2.271863056345019,2.275521266826457,4.594672665365546,3.884033781914443,4.108012023346429,0.996603050218734,4.938658312896848,4.149904957390875,1.3751245779788501,3.877381592078115,0.7473635639493803,0.8933110726223603,1.2796718137217722,4.272158279395376,1.6008730591787401,2.762594988185189,2.854772091817149,4.263329287410316,2.5577419835845827,3.2951197109298622,2.5178407234818323,0.19174878776539783,2.589970310818175,4.258998127413603,0.8697839392798479,0.9428090455429572,1.3903644336438414,3.208866165708769,3.783087838270973,4.572504065991961,1.574571247975033,1.42693899502644,3.9357504974843183,1.4129138145206477,0.8906302079808726,4.010137627521767,0.513759721187903,1.5399740957349772,3.0384677941952187,0.4599562327488116,4.44673709312227,0.004219897390452809,3.5200838518787405,2.8163728704053916,4.480695143764186,4.172648519509128,1.4315435182585379,2.54049942834265,0.10916095810432402,4.561695516554657,0.3356212275868198,1.910291243922927,4.553596604722939,2.4675437430454017,4.037202098198712,0.3039951396626639,2.6231126658563966,2.439654037422029,3.186591027925444,1.891488826043396,4.5311645919389125,4.61258920748376,1.338664286334288,4.903844522306748,1.9574078180645638,2.4308900038100836,3.013072696212892,3.9232117292991973,2.0261630180325785,0.4535373459922687,3.0452550380578467,0.4025388250162443,3.7753415034229096,2.721703394856351,0.7624719752877696,0.49769335324870156,0.026065848206947573,0.3728608862232552,0.5292330844344195,3.467628964488539,2.5324315417667895,1.9917129625949292,3.7264982466812335,3.0191637242734215,0.4744320466431762,0.3718499052269564],"expected":[1.1685641065624752,8.042727510982226,2.2132473315222407,0.608206619245904,2.0235905395641214,2.471881224899701,9.124073427259434,12.890938443488126,9.952672121608275,7.593236788554642,7.083120828337225,3.9976894161191767,1.761235687525907,9.00921851784905,5.645028968923356,17.074088253192322,0.8217975393466881,1.3245991509192625,18.284396958684475,14.87766075021582,5.912970070726198,3.024051142458529,9.084366130133922,8.720990281226051,5.282529321487979,-2.1925525016506735,0.703072506168561,5.172694942199131,1.4804820308396973,4.114693202219115,7.488240005310684,2.725415768255622,2.1835697403451193,3.800232966455728,7.476382263928295,6.902374991448934,15.794662154870537,4.544989397037953,7.662005153176741,4.294876551082613,2.0514048265729175,8.055603255638756,6.080619443060408,7.221640876662232,5.344561862942609,2.9517849769539217,9.633318656011395,12.159166448314025,13.389482911146374,5.622135832689841,7.587484972741352,9.108341014817128,7.5153645669567934,1.7740299745163841,2.8219684696981786,3.2052461366174168,6.048010030253375,10.86999579171297,6.3196355876868555,2.352013596647102,7.139611140701912,2.6869054947996065,8.560745419315209,10.229738828812682,4.019992227861108,7.1181017758873,11.915864475169647,-0.09063226943310365,9.103524863821205,2.461641051980112,7.628635381657229,-1.9982366669512008,5.132167607608223,14.242000020616675,7.154341599692341,4.119530281035604,3.720257960690148,3.3248562625301856,8.088163603141263,9.642137067315636,20.17280268954327,2.185918989302933,3.71807977195761,8.148876060773977,15.971670196716385,-1.8302367574879175,12.796159851894977,3.2582692490694374,8.490043428411118,14.460976560157915,12.257799215646337,8.327836559471574,13.923213549241831,-1.4881967358513806,9.414396158767039,8.739452759227017,1.2712620905244378,10.198202720494717,3.1441616720878844,9.621628629513838,10.380942879188915,1.333241357975742,12.36554847553649,3.594110449508262,3.6310813943140463,4.247115035403464,2.7791431331437693,2.310698171374065,2.537132213544044,4.87645887807167,5.540150626570442,2.905954682333625,14.16052413168192,3.6823592576803024,7.852563156438007,13.201695941698684,11.251431950089135,5.269803794789443,18.293205902001926,4.209717609299831,5.378901006613436,8.107205909897116,4.487530001114648,3.4519741266065775,-0.48353457405520406,9.171024279308812,0.048414396350942246,5.632838297417964,3.5708945698635426,7.035234501457695,8.18647484259855,6.664624091934967,8.423283706837353,9.016128809506776,0.15416932767312552,8.294944497486727,2.378897168240821,7.656493920729215,4.790253130960695,8.214594402841312,6.508453495306931,5.345996557683462,7.921462493919712,-0.326009239048243,14.753698309946758,1.526278250031243,11.205054033174441,8.864844229810451,-2.513751067632483,3.3866905427497747,4.4677694140036355,15.510283444545575,6.770673358814163,3.307281066305525,7.303605664746026,2.6409555417384007,8.636401973879025,11.69312880081258,6.806815720713461,4.564581576180451,5.448084395425824,-1.4908330356495472,2.6539400335863483,0.8682759131162818,8.533650055063717,7.323085242545952,6.962599992098163,3.005260808533045,1.4629198756571573,9.970287296976188,2.10876880000285,9.357914383324276,10.8856563950826,11.834691693151521,8.47146614220735,7.171516638143912,1.185338241780103,3.4291311062347214,4.300606941162457,5.697711447591364,14.714932615927669,3.6815322210417927,1.9365264283002106,1.0102024534857346,11.542272467805462,8.842156279018948,5.726437220442711,-0.2686226231171411,11.948977224878316,11.053933693460294,1.3723837450255876,22.214876796431426,11.826046733135787,8.33854178428361,4.518568410600714,9.209635372378985,8.9030206423123,8.070481104783914,6.291376803725476,5.906777725312782,1.5886150592499801,6.8580824564430785,5.701328356975172,4.601268304985213,9.724089215033818,0.7485428402649639,6.123434910236519,9.652349922165833,11.354084079501755,13.61176234050778,1.8810039835278474,7.534913374328829,5.790324562392607,12.209398657339777,7.052405008616007,6.0525064864391975,1.670638490295407,6.200722535850015,0.8082034254950079,24.719322655575066,6.478252665510471,2.273483297184267,2.108022493630191,8.959077043253327,6.109591605534812,4.521113880129469,0.538317587494803,6.04708915333479,2.941698065313644,9.102605377671036,8.13924079701988,22.988300293752474,-0.040186785978454154,6.247893498956645,1.9249440613296964,3.051448241172135,16.509684658825236,12.50267079763167,7.645656303492498,3.5613137587518766,3.3108182598335234,6.846666918855731,4.866491755193143,6.964973891627898,13.020822720509303,19.41816470775812,3.9569896816876087,14.566626996215831,10.368025120574941,6.741634337888494,7.229834502723116,4.070125238425321,6.019809250958346,2.8063087587537767,3.3058025397132287,3.3895676044927487,7.615766035729369,6.558111413555448,0.6797119137383095,0.11059385673836719,13.852085771043788,4.161160638308564,11.6052315438953,4.097911984189669,0.5876784879186792,19.21319936792478,9.249968943322084,-0.6997420155469001,6.215660024622359,15.860776212649586,7.072596017357371,3.9843142121607813,3.442959571142388,-0.19362490435176305,0.08890693249907372,5.624513203677962,8.044731733469355,9.253958578073496,3.405678088155442,5.848016331799435,-1.7422732308702344,6.62893743036213,8.879307784194758,3.3020764211943057,16.66688341008955,12.592450271971224,4.97954071717737,10.088863717864783,-0.7234262887479779,3.772827108501822,4.365005775571095,10.78625583327333,10.198839089361803,-0.009447226173882717,8.563548961616341,8.28007647891694,9.37217359436688,-1.8614444913867847,9.97040315845939,11.245526072542523,8.416776344876775,7.961349460617851,8.96817443066903,9.223899091926459,-0.8554772162757738,2.4216198853533273,4.19950901311835,6.907868134594571,6.491638598534499,15.042906726131786,8.815984793536375,11.791935453352835,3.3164173342862577,19.853146672932283,3.2003442951308134,5.674752828692542,6.163267889980188,5.877555537081168,7.865376919193591,9.471776567252238,15.721622376623479,10.233943984260282,-0.917784312966424,2.2040099346515776,5.275184800700757,0.6472215563550942,8.240359379853908,5.003151986294221,5.1286142339977525,14.358005527771303,5.819400685711856,1.9753072174749544,9.098183751895567,2.856342076461038,6.0071790410660535,6.180591632545119,6.653268848116086,10.56165413826067,8.65125339089521,6.052046949797864,2.6724125621926635,8.799541892101054,7.560295044621162,6.1702810717886205,1.4285963412139415,5.6975621319945695,10.976422307925883,6.99071752017699,3.952029271555909,0.19945844783917704,9.891237520604598,6.892133087287468,8.155308038579914,5.133379694781052,6.278376404080377,2.3369378986139324,6.2117330396739,8.315511742426192,4.584065855086292,9.041233967560954,4.368976476435555,4.217657739804615,4.987206016456712,1.5908008680340056,3.9526213474831486,0.03714307035179054,9.825387735267707,8.5070853999121,0.8438756661151965,5.419939449002525,13.303946235601003,2.7132403967361274,5.088324373421044,9.727282517068272,16.52320931982134,3.563254515418897,31.7749858111901,-4.770935962803954,5.888906779375395,8.347726357584186,8.194950608602268,6.1587861584861825,4.36947566240178,5.653964952120989,10.963379154454342,12.013592257118505,6.725047027350238,3.4574652137555475,2.4562374226794526,6.282228490373725,-0.5934298235729509,22.15697931695488,4.501455008367685,8.382407849074422,2.9873940828039207,2.264213911472013,4.604963004222029,6.284249054830079,8.08096360357105,4.617166205838792,5.479313812026035,-1.8819368454141436,2.6145968662553494,2.426056975151303,5.095438670783604,-1.8456033497316404,4.69783453595732,8.962435930938184,1.7969417125348341,5.28715469261305,5.39979742477932,4.317326385248382,-0.217958463010673,8.789988160127551,12.27625363389198,3.4485118910151735,14.794493177351978,7.058757680683862,8.726402597033504,3.187924617372914,7.000255187219385,2.7054731229583258,-0.7505727943785487,4.493157500097469,5.0830914304919235,9.402007218197891,3.2220134097112343,-0.6599875926703893,8.821186962639155,9.071570655835128,3.1927503328662232,10.380822994263612,2.7715649260398605,2.0845968050280472,4.041221981486466,3.508661829795351,22.00004903397471,6.248495946357241,8.136977588012611,14.405546100412511,2.643186144538909,1.4128122443244833,3.335934697211121,3.445636794226213,5.932505549004464,9.634006552497564,4.54631170958503,2.5068825161075567,7.005434070849589,5.828858736018137,7.745769199675263,0.5729771777821713,3.262594378004982,6.067980428308555,7.3557555253854,13.02661735699374,5.891708115206093,4.789670957705247,7.194182359313902,5.030292604391427,24.66778830526315,7.2864453904551265,7.148326585067811,5.474915473810343,-1.9245988248237813,12.457144980624086,0.5316484900131293,1.331835226149754,11.613950821131596,17.202864120559532,14.417517525216256,6.944767273344049,1.0459062140710835,0.8594338975660589,3.318405749700274,9.321365178628916,3.6518736187693683,9.190438221924024,6.906078216964075,1.0426025884014098,4.414105069842369,9.233127662942803,10.512616461372989,11.308954490909315,10.05063648236049,10.869937986542176,10.189548558649719,18.19867006625956,11.505213423538391,2.743205138686535,4.872885116776592,8.300511133558024,8.01902298220357,15.278449854813985,1.1568982951400262,5.239537399384168,4.60422351175716,2.846002985961298,16.280402064286136,7.814310095597168,8.156658425132685,2.6059508344810753,7.291946240771025,9.474600871343927,11.431780098499175,1.3404685540597363,4.98425010477373,15.303468724465077,5.213922173583746,2.884150144474055,6.471122147657405,0.9578288074972701,4.5111572982918995,-2.221226125599166,13.945115184401416,10.226076002257177,4.126595846452276,10.912055171045019,2.652298982138122,4.72811975014556,7.782932817315395,8.338352256277002,12.18933702150813,7.371507122353064,2.2515264651123976,4.6966439342143635,6.974474771397103,1.6536327378625295,6.238893843633512,11.069470888881199,9.75495393037956,1.0134708670492747,6.476562432072311,5.876003012868597,15.464302466807743,8.106665148323739,10.889907219004161,9.875451699046572,7.6718179568497575,6.582711949906036,10.364086287572889,18.585664845394895,13.995180259558229,6.728701473419742,3.6988547783519214,3.327402549681911,7.210550915828522,2.567110397144332,9.906298617254514,5.573804972473674,-0.9760134403389678,10.798469596416128,2.5056305329751263,-1.4080838070170167,2.783256317978812,7.006210860275758,3.772072251191772,9.137709900768627,-2.4641927051962815,4.280433580456451,2.938049577867552,4.356076750599053,1.4139085796102218,3.236447564310069,24.805131006614573,3.7222196965704137,9.862468812485726,22.00515683052196,10.492359493605274,8.827875916093806,5.898288266742554,0.9748405813784785,3.534385620039158,8.074486798750044,0.976397402290827,2.318991218357071,2.9894458832792012,18.097042529895596,1.0001643555897,7.281224762855128,8.745362615948302,-0.35847421634538246,9.005642345253388,13.299017585864682,2.008194425376876,2.134416327332474,5.564992355524839,10.473261830793591,2.466139793655513,5.38887132831109,4.843010914445382,8.090274359284557,3.5568468614411497,7.17752842711949,21.683426043394352,-2.404321950735402,10.214582875470356,0.6042024615249746,2.6141621099471175,6.498450020522225,0.9206554113202227,8.131249377469198,5.262246643272718,5.111831172846083,5.155885430506838,15.330300843895454,6.953505964673098,8.537433100003126,1.9556077702392516,5.1638527993214085,4.262969781750269,15.037765606376947,7.416899335623736,13.798137327672606,12.217681105119839,-0.513313261857934,6.01947551541802,7.230224800074082,9.298173445047409,8.683425698114517,2.8706931020577153,10.994352277594754,8.596017784249778,9.476739204686135,7.1597788095991834,4.6753632504048275,0.2392299915210856,3.661907951267193,4.56851196890377,9.894451039058218,9.719497914159914,3.8742874303889754,4.313905341081682,3.395785698525895,-6.174252254328993,14.253755783994649,1.8058352297327827,1.5012580878552055,6.031528223525111,-4.014342208059246,2.4893113413285715,25.05090060097963,14.449926465967723,5.048781634827101,5.980099261655387,-0.7012112062514879,2.156664524938427,6.535772333838181,-3.29167484231147,9.493976999980177,17.160984468844667,5.110885457413191,8.663099789319874,4.152410767935079,5.9764242711629585,0.0786760757915658,11.516844980492854,7.514244873320008,7.376740022789564,12.648567160685223,9.219668281516359,8.532037937559602,7.314176512219834,6.316656238712064,0.3165895819997722,-0.5411710009761517,7.561086038895473,0.5269327869888007,5.533905524166986,8.6485662816373,2.844570653139323,15.033097550948355,-0.2730705423051276,6.838293208386336,4.527788893253624,2.848117299155636,25.143947503692377,3.9939757656943766,-4.136511350665323,0.4300272780332217,4.362060508211871,17.118966651761212,1.0633521325847708,-1.2572652799454995,14.121619329201248,0.12218520667265587,-4.245414087532029,12.008470514812192,9.44950250633266,1.1093207790328288,2.7190819470463667,6.499704988298115,3.263686098176825,3.339320829381753,8.379538619353923,9.202392575760161,9.413541917707004,8.501269056057724,16.66300103322149,8.961898579477552,2.756837025500743,1.779114710059142,8.312400159514201,6.52790039525864,3.5279416446283385,20.801674972252655,13.609534445122677,5.804294960742744,4.9628183623185205,13.288227832466099,5.437340920741014,9.179152770315673,9.692038384889448,6.251820803318247,7.7144729342217175,7.175273163201608,6.9963966269155335,5.089966677300484,3.5141327982102513,8.793424442762662,3.4582715429337023,5.921337506714977,9.740490997248761,7.6517864135634905,20.676891272175673,1.812902965452633,8.2009053537839,6.136126940637682,10.826771371591054,9.20733151829035,-1.7362327822667112,8.155161110021057,8.390078819762117,8.900498394544657,16.215975761015414,6.26536627291521,8.509951622127558,0.06885716769579453,4.659286481097878,7.581698941322842,7.79541566459968,4.167563417716217,7.916799034973829,4.714436777304506,14.962984322318515,7.450480364112505,9.229221262520422,9.3717762710749,2.673998426874695,6.563713322442474,6.729986204810259,3.635619202484418,15.336960323365302,18.409386558137864,1.082036090981138,3.7186791719427834,6.178287574826925,5.248214263597408,10.826870603049349,2.4823736647538515,9.20485568222173,2.6498931081809234,-0.23759152272004647,11.478304524324283,1.3370435996715129,14.296813694319635,7.708801080011254,5.823968897784354,7.622377570788137,9.968217740498133,6.966913684093606,7.960982115392791,0.11982749704331253,-1.9459206581893698,4.589782227498063,5.995995762253532,2.908049879253889,2.6028113981260717,2.4601345184573096,3.8844754519307,5.477552166403097,10.1219472549101,10.784988385788878,7.755952483107654,4.169922133475607,4.837723759275423,9.395511104036832,9.908511728014073,8.307612664702859,10.607439908347878,4.95460769412235,9.022713910139855,1.6254397415433846,4.697516378655967,6.803346604036006,6.6420956548120715,2.7653377809807838,9.302575247560426,3.456551260429184,-1.2180450267984517,7.348980530919766,2.0838531569639205,4.0343303836236695,11.331951000234724,5.0566796068607776,1.087030289557589,5.4141138441073196,5.978312135907116,13.47123882932167,29.517663343702935,13.67663367202666,0.28706979121238596,7.91536255056351,2.2069022135116865,1.9648885940728742,5.131007887739422,9.137432652009757,3.257012205724462,6.219091917527763,6.532427776679048,7.849302626844225,8.41487031762102,21.5466781025103,-1.1212139838092128,13.919397957270503,15.89111195017588,18.905430809303336,6.43588280071015,2.3765269310282733,1.6418018533234335,10.241917489653469,1.632510162049256,1.063000351670433,6.957127021551921,5.096830387950749,6.834049992870593,6.043482717836685,1.7224673816657607,14.573338624247238,10.40166130566096,7.371468157161833,8.9079465196161,0.8896104918620344,23.55559523752983,-0.052427057811477606,4.755431925249208,12.085251579543256,-2.6115627678496054,9.886109021248254,14.978586007060258,6.684477344265492,4.9122252944869285,2.5858482829484886,7.584611830565237,8.66366203849337,6.7380998775608,0.43156418350386394,0.02638854031684046,11.862202616503726,1.7261087264305806,5.525535622642341,3.0954965561026286,1.1337906729055154,1.5055333385380194,18.922593700544216,23.96785373415272,0.8437412559476777,8.417667492080927,7.113477417651982,18.349431881497974,5.4599913359208925,11.619480785221688,11.285968934104268,2.239013683340103,8.009611593812867,3.6353833154114676,0.818292213173042,7.523958921856938,16.121710551205677,0.08414899575657842,2.213376255308655,6.159642440917052,1.5547495014525525,14.45050073859973,1.865388673148762,9.222220593677923,0.21615384071612342,6.850356776895547,3.459586039398971,15.118113962848462,6.948770279167716,4.883964603419107,9.474074563282992,13.402199574445987,1.9707007137725472,2.793627619172955,-0.861362493478226,6.315876000721605,8.176916766135077,6.544804128357357,13.467823664852117,10.728714735924767,9.00860161009813,13.82263818793946,1.348273794748581,3.9631966722068905,3.5414215163219405,-1.959989053542352,6.659376241696956,10.818630961250213,5.657448950124094,20.429370661534985,4.402071448688636,-0.8639706208220548,7.21291998387084,6.56689395369405,-1.3259200236689237,10.453233639300455,7.6971755769492844,4.545281399145706,13.134021852077826,3.0797808635528012,0.9718993816539994,5.633301269143246,1.1596246389235163,3.609448108438198,1.0910393527743585,2.964265775213602,2.23726211818572,7.303322106750745,7.448192593640119,5.836594919425872,9.688894023871239,2.5925065558626037,4.658133968419197,9.349890682739813,2.2317455007383145,12.050920598678132,3.646307001030738,2.815522357248822,1.0565559278680134,5.400960289953719,7.339933631036278,9.544837148812665,4.517748717832011,0.23811979397130573,12.395298581127452,2.7115557738472424,11.232578762226726,10.754398469660956,6.758953302933889,6.577391955616072,10.925111243336383,9.069199728441603,15.934442446729548,9.278924225709387,1.8990303952390102,9.169029008088351,4.785105138139541,7.682388788509262,4.418791361702368,8.941483968750607,4.544909838286716,8.983504774424802,0.9137500902264497,9.012258123663905,6.808361756897428,7.119876700733445,6.224992460807296,6.599164582288797,9.201037467846437,1.2765783446318562,-0.667402135442579,3.6489680957017243,22.180543579231582,3.4430188416974947,3.5115519920372456,7.343966066160281,4.18229512121053,6.887457874210754,-4.270365926027472,7.848893865850714,5.947830233589465,8.696069092686061,5.113176924931244,3.225312242196915,7.852209583650385,14.707818259058161,8.087775838834192,8.632780993425259,7.541473657337259,2.847493869404555,4.463345796222759,4.433438803978499,1.2373248867687563,1.05959299666804,4.302322654418306,8.19865650214457,8.189698693916288,4.573536398762882],"p":[0.2732956484109532,0.3181822526978917,0.5321145810681753,0.4200001217034093,0.6755277513947913,0.2746676703156681,0.6754452760475507,0.997427611967513,0.24982599465948807,0.23823047769610972,0.4238059971143229,0.15638073567005262,0.5592346062846285,0.7472928564649637,0.18831949974065876,0.9606724233365318,0.46306746815028044,0.8406600990642537,0.9540433927996368,0.9295053440583383,0.2254574301115122,0.15949455466906404,0.42186346867944646,0.8000974058761832,0.8838004708918563,0.08921996788504583,0.055430491448142494,0.6957962892041796,0.07106053314923488,0.0916685150833596,0.4614035376289747,0.19105679796722286,0.834314310728351,0.06932116099150565,0.6590581282706167,0.7478073248578416,0.8266065561176226,0.5502831186511286,0.8915080390137433,0.1961928811420235,0.3103127924178082,0.21159035014288086,0.18509074116837132,0.446878072660311,0.5729442232494675,0.7833722920310597,0.6716856666827371,0.9436778588115782,0.92289492227313,0.5019728733942161,0.42146093297039555,0.8454373147070038,0.6301492532700552,0.11867298831671014,0.40254732113007896,0.004686452196839719,0.44053236961213127,0.619777953312711,0.8849759095041356,0.06412028431338967,0.19692995109056066,0.19374406863602034,0.27627595652923076,0.6777580917578891,0.14627368340791236,0.8931208207494701,0.6112494622129745,0.16361668234131632,0.4596211702556734,0.3445327881727287,0.7040832789033205,0.11461952337270409,0.3845876758356326,0.7541430191086147,0.05913481182406244,0.0609179482107125,0.5765850386342499,0.2176092118428261,0.7041785938421743,0.5247679051443916,0.9977673592613323,0.02637122730981112,0.3208271141875243,0.8922661422713345,0.9424442575571084,0.20935242750745653,0.922091594141395,0.08251747534790477,0.44529404148987783,0.7520043732456303,0.7338287060469111,0.7162756338316811,0.9646318848990183,0.13602266223390846,0.7983198369539661,0.5671719828568227,0.3169508380001933,0.9028325851088157,0.6549383936330317,0.4760612500058319,0.5119062925325089,0.2267426892847768,0.8801804644150375,0.8520022980368485,0.4615846277000688,0.24249522236075416,0.9246909253377484,0.2757126819543445,0.8607677103946676,0.7471567950610105,0.7568416284025186,0.2660475036843215,0.988401182398027,0.8540301510987283,0.20102589810603866,0.9348458975128966,0.7997176399042327,0.3704373565557104,0.9376706780174573,0.10517040329268634,0.9896811160623846,0.6725445381559645,0.6324794536587997,0.11438415706635174,0.14346396681196638,0.801953613382399,0.0762108147857734,0.17896446708820957,0.050635261225001615,0.4996856673458363,0.3289451735047815,0.4158626210087091,0.8401758128879515,0.7122784728125591,0.10685597728308216,0.5498811697262138,0.6081357752296812,0.26200341636995805,0.23704195291416674,0.9604056681702859,0.11485428003276721,0.4067190853378748,0.45083981852977884,0.2486434450975259,0.9733147535357194,0.2537311911924147,0.752239082724939,0.7358005988080234,0.007005117964691943,0.45781990234535486,0.5549057703192242,0.8797689110986471,0.9596908748725901,0.6514803015256951,0.4344076860663093,0.4914348911118427,0.5299867906315865,0.6977202707498931,0.4726508173514601,0.7670500777263891,0.1698157235398272,0.14018048485322865,0.7577518041942004,0.628531382248916,0.4368911884822737,0.7285352327652099,0.8125456539691773,0.45420891594805846,0.15599494201945285,0.9538137443386734,0.04522475081727584,0.7009725979372212,0.7919850503586792,0.9251287017950385,0.7625055193334245,0.435896691030744,0.6701668729577266,0.4192766454088859,0.5119207096391059,0.2759024829157368,0.7993122528984671,0.04212295351230311,0.35849634258391383,0.5285446532633151,0.9803797241415053,0.689712704054682,0.5304505560632025,0.2801064561746096,0.9825610542243846,0.5477052723742497,0.3529790374383375,0.9543490873824552,0.8302202632006119,0.616475058646563,0.32627074292984504,0.392530830227926,0.9617083587712909,0.5584785749617915,0.7720013433886492,0.7664139098752591,0.37742948248135266,0.8663393134709514,0.01520822901298291,0.21402058842704696,0.4076615505837131,0.23731240504447215,0.29330917691963365,0.8088028938649214,0.6924438769702725,0.8715746989337729,0.16076343031643336,0.9310687260280788,0.9794249088436204,0.548118674083266,0.46835918009737965,0.17826401640390244,0.5070682009370182,0.9132614597140634,0.5467472672087217,0.9930884533751414,0.6143175119470123,0.48156570128702914,0.25378660997091007,0.5397884884972488,0.8453096358505914,0.6297275649897729,0.031073802016056584,0.7259495334044983,0.5639907442984429,0.5253565743443742,0.1893848892597545,0.9904283696188032,0.16053974482646383,0.47184466867538877,0.5663598719973295,0.652772566058172,0.8939572227190542,0.7753696730868413,0.37435646818160895,0.8173056694204399,0.5647431782448009,0.20121885005843732,0.5184670425994555,0.3941114121195364,0.980448153855175,0.9627475535457648,0.6569967938070198,0.7430843386367512,0.7672011927310338,0.49876472525432947,0.337570167682258,0.3557861523433452,0.8717260641700622,0.546010433875532,0.565716424025567,0.8297424844053198,0.5340366856317282,0.28397246452340963,0.6945990783047429,0.8611506263332205,0.9670868449924355,0.29995130867139874,0.6438653195102317,0.9697057918308774,0.9710822229948928,0.9723862883778922,0.7235402811138139,0.25978390983261956,0.766198548616166,0.8998751496536286,0.5640412432281618,0.2523262405125386,0.03375668620058647,0.1513361185630442,0.3352094571630204,0.12880228643790836,0.29789290717833916,0.7602249408761177,0.21164820082476665,0.06426033504707007,0.0841935046481388,0.2500862789869509,0.7297988581861763,0.41259403730139077,0.9701430929023234,0.6165196414991729,0.8602863695324892,0.5926849324965713,0.038436485556185396,0.4747512627933521,0.457752314281368,0.46275526663233735,0.5072271081080781,0.14958423078019956,0.173876274918499,0.80274519232941,0.717808795180193,0.08863903190323508,0.4732151541615237,0.9023707443466131,0.7804708622170111,0.177572650433379,0.4915708567813122,0.6437800655895203,0.04198620923056473,0.5043979483552696,0.9767918464600298,0.7223109063072979,0.230028908631549,0.8331220354320599,0.3361464951112263,0.5978823390853443,0.8038729611467286,0.9874904706210887,0.5629892112718149,0.14133193398234534,0.08174495142225502,0.7739648150971592,0.37213531014359935,0.3313292237954111,0.8704227595277714,0.654728121362149,0.039921856414894874,0.004208512984948509,0.18446549437038273,0.26230874219031675,0.30920199877305143,0.1297261627651769,0.7729665270419446,0.9767740581706781,0.37676953507432254,0.49272005075329384,0.08084061667547604,0.9722143996024171,0.6555200792974643,0.5743396652404649,0.5772093707428789,0.5534301985069903,0.5628984719907633,0.8012019436203854,0.2875755559478179,0.7076004328217538,0.32224224218347186,0.46652206954655684,0.2435002382744169,0.4917911071340819,0.5851651307682857,0.8578842613382709,0.6819917034393075,0.3964557673665865,0.8522424766351517,0.5200823133731625,0.47850080947788887,0.1794275823293603,0.5949539080580759,0.2190774856733646,0.12164607626765189,0.32668534536388294,0.654679754918982,0.643002401427524,0.46010938556149084,0.15572697501154065,0.184551185184336,0.6023932117622719,0.3171200986099949,0.10850542318564838,0.5738125075839142,0.3651116580563174,0.10096992122220927,0.3625059919014586,0.7055226954752336,0.05194747174222658,0.8968043039150015,0.5695663880429926,0.9481771578546512,0.6388368609538551,0.9909374003023383,0.04940588515504207,0.07499603627363438,0.39569416003036806,0.6675445804740525,0.2671900199861428,0.08894967490690942,0.42097523963450034,0.7651936465579798,0.9435080335885886,0.3206032002228121,0.051671400261118716,0.6008474273432476,0.24952927508140843,0.2584597704646596,0.9652202331531856,0.28571039084699645,0.8289914891829475,0.05016206415208946,0.5641732536530544,0.23699416363854042,0.516058252310911,0.6659466373492344,0.5931929682754078,0.2793731747477217,0.10577867827628418,0.07274923760832719,0.3606442659298166,0.2426913471425698,0.046322040336199466,0.6199259783371083,0.8082157518223905,0.32647635898859906,0.1492145453510092,0.43480698341219526,0.8978082590688399,0.14219587410524404,0.43857012244200466,0.5783306287978196,0.48254493633308515,0.9844157920320329,0.4103038531714165,0.4592504234152235,0.17799796200424023,0.8641551878677272,0.704271364453638,0.2197314654985627,0.33136602485843136,0.19363922254056742,0.7006251783428348,0.39845250652901765,0.027559126401577094,0.6250972936285473,0.47857126017768215,0.5993704096403176,0.6531607079165014,0.23110041059071196,0.7206661985457115,0.5041086641326453,0.4002085418712904,0.9804189098213545,0.636600149426793,0.23832623340905168,0.9359841092867709,0.8181721567055589,0.3400021237053654,0.464400858581127,0.13596604577236016,0.7197061395380375,0.4577004388414232,0.4396601615280378,0.09365216649370645,0.062331598218043904,0.07884354420831041,0.9465536167957547,0.5582655093139568,0.19896925835503065,0.4235725841147977,0.3380364531176092,0.8931797040163967,0.43761092773558485,0.45127882236032146,0.4289068665193583,0.5158108240201356,0.9867849031532647,0.10273192531551611,0.23405562937788438,0.2562837922858765,0.07319512915229787,0.8213063373599208,0.13967825139379753,0.5678242160420923,0.720457897332045,0.869572702591449,0.8193766597135739,0.5584777933560561,0.1597764279453946,0.013076883961520291,0.9864361105150512,0.742058784875337,0.16811679590539574,0.6705766590721101,0.26972177843318823,0.3511188688805327,0.5352341865075185,0.6530906253918103,0.4609012215292818,0.6554047159826089,0.39493577584235084,0.8674944239784035,0.9082914570510077,0.9289926642020512,0.5489934393421376,0.3319649292929112,0.43410403279154575,0.5344683726531128,0.7674652814765441,0.9660593123936476,0.11808463428647586,0.31376587003449874,0.1720462508048599,0.6926403166915325,0.8835693090214389,0.7915628034713342,0.37562164089948236,0.4732573731299654,0.7521046933812401,0.4222156148771523,0.495177198285641,0.1313683521873943,0.3366097951516036,0.8136231951729618,0.3469538910153709,0.114365566567872,0.1650808619721531,0.15461882864990795,0.2653987074652975,0.11350442492072732,0.844561620716203,0.4020704583374244,0.36965874272183297,0.7690838420861608,0.2525727462877261,0.7361410848064982,0.6953197507784881,0.589288685107414,0.7037260186667915,0.2669721951715389,0.5654878632734581,0.08712182125272383,0.49153281774586044,0.011153125696838462,0.7192561181490604,0.5101441454863964,0.639210974077951,0.20921763597138288,0.20071499189069475,0.5139017962395303,0.7792488261884432,0.6540221022776402,0.6926482588141096,0.765932743163136,0.7204842772120996,0.612172417732358,0.8577428816091255,0.8616320857998396,0.7156551650852867,0.6245704662329332,0.24554553265454615,0.67455840492247,0.43019282737693354,0.017558824282069008,0.8092813068961202,0.7658908632001162,0.22009012684858664,0.7160853702690702,0.6374495885637077,0.09056761289313608,0.24037117333942293,0.590050938303798,0.03578718607173337,0.5316242970394793,0.07097010024823303,0.9065708991430446,0.24275267497621322,0.7407895687597466,0.1989863159174583,0.6419828631579412,0.9835381077540415,0.6346180789132569,0.5098995075226767,0.9851448377896002,0.9432410708554317,0.7097550803369563,0.9225276189548912,0.3107995450096266,0.2895318711110535,0.6884124012759145,0.4330489996794997,0.3691471229140715,0.3802642973737489,0.9655961625660043,0.32177213437204233,0.4987018349249781,0.1443805786968657,0.08502948287611689,0.33252888415509374,0.8225456023406099,0.20355185232985207,0.02209014454744951,0.28275065419854517,0.4632731405438031,0.6112282990513571,0.6434084051737388,0.6558109570306032,0.773495247164034,0.45416465403559036,0.5374399546272002,0.9863095698419613,0.03516383522022859,0.5457814429249279,0.08043310014589888,0.40788908019537473,0.8434687411342976,0.5603116963453574,0.8900764732948545,0.2368765759043976,0.5841742111424271,0.34268272151762047,0.9373209764526607,0.2874402137795289,0.20791738499651613,0.3145186429291773,0.5751393902365416,0.5055827809817339,0.8285589370691775,0.0012861711925904462,0.8640778265389153,0.763872451756606,0.26460319437833,0.6998950594165436,0.22770592055724315,0.5968330877049015,0.39921573722791015,0.6188385499701872,0.73398260869035,0.6211059743158092,0.5715432320096974,0.797859885749487,0.3548092263371274,0.17045395973909172,0.2780079770919157,0.4589637542639806,0.7443763984396454,0.9061842945740004,0.04256308344785653,0.641899854789113,0.22855498927169937,0.008753413719980063,0.8807132886758167,0.41147108376046426,0.5182239152771286,0.14074499521467,0.009338891112375292,0.046003057452365326,0.9875447865400655,0.9120754555171788,0.969599535973352,0.9188878596684151,0.22480562171633278,0.7719361498968096,0.6562685700185731,0.065862994191215,0.7805298926499915,0.8304390643193083,0.5518591678473446,0.2729433850221301,0.571109434943899,0.20061394887679307,0.20511908962024372,0.7955775862731775,0.798526514172754,0.43537800995354803,0.935598808799128,0.38691745267124733,0.7815452032618804,0.8110204629276105,0.5727494270037556,0.7993346093116984,0.06977258279964227,0.5962736296430384,0.19292458563169146,0.5975274357893743,0.7761797942671163,0.524695243544339,0.870728919467737,0.2627495463127698,0.3771769391730069,0.5323175077288698,0.9818982264825404,0.9722487450325421,0.17130757336183855,0.019934364379178504,0.0461592933757522,0.16344029436176077,0.9822664458427011,0.21577043986133781,0.012275893026114426,0.993015645102413,0.030834371439408148,0.08492528841418645,0.8279274208238132,0.7312374475663894,0.058966931349109464,0.5783762582778211,0.34222300633617686,0.3974819195226593,0.6526866686112212,0.09919251383154082,0.9585837506472226,0.5010455734016748,0.7585151532236469,0.9703642195634079,0.8187572428425924,0.08442815540004633,0.2195221317002658,0.11063265531266486,0.3403451788162022,0.0786138509490879,0.9202767628717665,0.9168602583728891,0.19104669637277794,0.8096971447886769,0.8679783472149103,0.7691013731843865,0.5751926020267437,0.3942154619221543,0.41317079336332796,0.7929991587500329,0.8147505259249741,0.8735394287260854,0.6542904926633499,0.44365601816976796,0.7091555715820639,0.058137804907516966,0.6278302342450188,0.42455703441710546,0.730061473467259,0.9693685287484302,0.07105201134135242,0.9930321499753694,0.8043832686265848,0.6233928775337478,0.6371353058923617,0.13698656416488375,0.8073093113488425,0.9323623629485029,0.7235227200502108,0.891240124300051,0.6392640416975954,0.6815194127567961,0.04171181227852583,0.3146431648222223,0.5779655500546856,0.27142149669570115,0.740734828177481,0.8757484522476982,0.18952155668897275,0.9018284788271465,0.37019678942191425,0.1793573737030958,0.8780390222292875,0.3780258098152025,0.6458842309665644,0.5428997111476266,0.19589639236376266,0.9301417541094441,0.9404891068124761,0.10717824069430137,0.513870507312854,0.8354135276365164,0.9366944771084964,0.7605453693281234,0.26988541826246926,0.3209380177378489,0.3726635197688455,0.3350590289888795,0.6708277122455566,0.4672813355353074,0.7124071078702032,0.8420652684590513,0.04949658647903887,0.33220606133623387,0.5864295643643487,0.1938094503796728,0.3646238876587915,0.01912163178866977,0.15167284318174512,0.7038679651994117,0.6762390369762301,0.5916416219465712,0.534474298639332,0.5683995269344277,0.6548155476592854,0.26127543286558796,0.6190611658954719,0.45009071617458885,0.11769252393006857,0.9780591616869772,0.3868834838384094,0.33647136201717665,0.39575578640509645,0.7522312702976717,0.7177246248369811,0.4797602275611732,0.5579533507506038,0.48953500686223483,0.6173369396001109,0.9226923380028484,0.6335188421378666,0.09152866177198304,0.841365603999491,0.48391852910772815,0.2454304351958032,0.23279923836958405,0.47426176776631745,0.8143844348206304,0.9613611282992529,0.7841347547764017,0.5829123486553522,0.11592450957682465,0.8073167027859056,0.8235550474504816,0.983681113972855,0.8620356589703342,0.44305249422003046,0.21229941985272638,0.9428982598576279,0.028152045001277326,0.5384635144860017,0.966739771387209,0.12787413123396574,0.5562591843532378,0.14032493582327565,0.26221416595048974,0.7172372887129941,0.9398513039141339,0.08250320975120817,0.9229227010710424,0.9158077072976392,0.9020549577095931,0.04959734680757144,0.9144481794627646,0.12372147659050925,0.8384026669808122,0.2128902010299576,0.09586057753603128,0.4947854925211892,0.2343217307017773,0.7510844191597954,0.06637290359560666,0.4425924026615766,0.7502188417176539,0.4853547609550184,0.7525263928519943,0.5483397741343277,0.09886250442744848,0.9883074347072551,0.14505938871387625,0.6177106207628469,0.5198118063640269,0.05360114170762453,0.5782761598296164,0.825180814671169,0.6015448435084745,0.268237503870953,0.07393967137424373,0.8119559440463029,0.7900875142809609,0.32743328042014586,0.39903245163518086,0.2540327788186383,0.9002872115301426,0.03282903996184161,0.6810171765503894,0.26349666036487895,0.39727137568211957,0.4219861508397207,0.9708367524424828,0.9765361932148879,0.5509972240738639,0.9296576708812356,0.4328975235654935,0.9755542092928102,0.5522768214235005,0.9073938303802622,0.9095521973425058,0.49025830243410606,0.7852098890474426,0.6135198905380332,0.23565685109855994,0.4939073118093218,0.7587899472355766,0.03819261363909909,0.44167093662020496,0.5581052386808227,0.4813596031056131,0.7514396891824642,0.035313322858483875,0.40544348061407853,0.5387868315568651,0.44956230414477893,0.6100634799666611,0.7803755973546518,0.913603349785131,0.5619493576491257,0.6521229112998901,0.6951644050743484,0.2665578250375562,0.1083276726536424,0.03381220972200394,0.8034052610318869,0.6889117908753575,0.3019407431867165,0.7353498565931647,0.6785516312351241,0.7920809117966465,0.7429126211407286,0.0745153725660681,0.7573750857509167,0.8334249278679688,0.10202640729826751,0.9076902081668203,0.6651284335388674,0.8333117337601006,0.9628294954648544,0.09370167369349724,0.041964553161683016,0.10083313365662305,0.04773986308054656,0.11122926188645388,0.8629483038979433,0.34980744572653233,0.19479480200337074,0.696115362215497,0.059236452857373,0.16733589475640587,0.27413991804978144,0.5769300617443869,0.6030163987815651,0.5558321567651081,0.5310993741801167,0.16254783433870235,0.2902126549367192,0.8355837435887874,0.521211727175821,0.7123983882526599,0.11821381029501477,0.19537552756652943,0.880735370022079,0.5680376555848756,0.8336200728781455,0.9517914696889715,0.8085670872242774,0.4207882587719476,0.3573770668498808,0.8487739492624808,0.6208830382718513,0.24799137711398567,0.2680235660167678,0.8871952318099183,0.43083270166103027,0.9236664760674149,0.8452506565099416,0.6068924796040194,0.6494071116795159,0.519009264126939,0.8235435796095194,0.8735817038434959,0.6823671313805522,0.4688861374316098,0.2681612794157531,0.4225123651413236,0.7317375126602461,0.6095891963193001,0.4760448123430552,0.010747027614420368,0.47839874300201113,0.03464674104273979,0.7552819437659377,0.23982505087017358,0.5371900455921137,0.4721650812468936,0.8036267662123409,0.8924768808938022,0.4181605176073735,0.1175408656204655,0.35927413779494644,0.9605804017820645,0.1523956610615349,0.4879670304139705,0.5730895898066077,0.40488103555190635,0.3497945342432811,0.01533610004945607,0.7392444367188855,0.9158142482095213,0.40381776289292537,0.6837964193304995,0.5077946259647648,0.7295717493374008,0.8828783200770522,0.5162330520120733,0.1373894178520898,0.3287478404164281,0.36338252808828986,0.09220852060247209,0.6136182650195325,0.48382976847985826,0.05166430157855806,0.6187194463214318,0.4392549483422037,0.42161786785670485,0.2016126502154385],"mu":[2.4376602990905694,8.54621372400836,2.1576093857923873,0.4764234949835422,1.754114803532163,3.0374796011853844,6.0148082483844,3.246589516759577,9.960346072989516,9.223998562319832,6.652384755369525,5.495230197095715,0.5526875765684292,7.619857060121566,8.183503817499304,8.236258589602183,0.3254241873874597,1.0228396799068373,8.60109326580292,3.888769071534306,6.796329362517826,5.653082993961753,8.415873552397326,2.922526503219569,3.205739792427109,1.5129255472843806,2.923945935295338,2.860215223407956,4.035389227915398,4.707177872837541,6.412689539903127,3.72395077023574,1.6381742852169068,5.975032061287893,6.666633139724441,2.7769275849983943,9.858705596528516,4.399830257964423,3.881882091504427,4.371033687297499,2.4573516085298874,8.991107545994495,8.591990557202651,7.047209911347343,3.16627768398545,0.8988625678627682,7.1683229849138534,7.139656141137108,5.860598782708939,4.572325480166802,7.483184708778854,2.465975606667734,4.6644840880301,4.962205543623406,2.465734799729278,8.306183832806038,5.356072200566908,7.3980600052027,3.788090280935368,3.900511294828044,8.861597899583053,3.184192933778933,8.950551400770943,5.554595054499649,5.659544898747344,3.622027176318081,9.177372572154107,2.534664775562687,8.268148983651713,2.7564749333601113,6.227882841914978,0.022356784238968253,5.111669621095216,8.97190863121368,7.967969540559309,7.012626507418971,2.033726715173856,4.495499848664847,6.856757103151598,8.117413013829623,0.2920362854629288,5.867401142709044,3.877286841316754,6.991584918528826,4.072112492125433,0.181573259828387,2.730936664818686,4.114910506703884,7.5179422992219935,9.752091814794962,9.162405464905241,3.6476544725488735,8.402301331026667,0.13999614688819495,9.10272267887388,6.315034401630988,1.519288415866329,5.5109678822375585,0.448738605607375,9.609228040053278,9.685264528715935,2.4159377608427346,3.3409719367159685,1.1457374459726455,2.721652929090046,5.0708035316124995,2.657269263746267,3.1601992676915724,1.3078248080957833,3.1494245575143154,1.4298422363307073,2.9591875506154297,7.422386211496182,3.2076327980363084,8.483286938338635,7.9421983636068605,6.973705011998765,5.260289030667405,9.877795035610582,8.062746779631889,0.10587995770911851,7.35290960100019,4.321860454591113,6.024848529854349,0.044436495040061086,8.064608412813211,1.4518856226191867,7.861915233485314,5.386050105597013,6.555305661736204,8.407752248287352,6.655507710098723,2.720461914535477,7.463436645329404,0.7979672421953699,7.794397171641267,1.0258124228213172,8.181634590761877,6.575852497079653,2.252965780046947,9.956863336448421,5.331926561422979,7.654947589595203,0.0826740193300779,1.5595785862114586,2.616525093830122,7.97884710811261,7.348762647288156,0.755040295650915,2.8680916031129233,4.054601777079099,5.338975286411403,4.072631764288039,2.317549971452255,7.150916939250916,1.8524551018856128,6.988770349303088,8.549519187465844,6.794367097922733,2.999167957881841,6.846668734886395,0.7179914690717104,2.444340336647437,0.3964690335963539,7.972889802730938,4.43727772565949,2.058652072378986,2.8790383576554035,3.323668494810126,3.607284517006708,7.594007747678122,5.5531059614049605,7.950395520270776,8.138589210917049,3.1322667831462425,6.366697040256238,0.8869452462103156,3.4197809625736575,3.9950697721223305,6.667053644955208,8.357135171403032,4.74943093948434,1.9619815274609165,0.7611836467959643,2.3327939279328813,6.408955072142611,3.8301606990003356,0.2278127202769853,6.53371808531239,8.672018115328887,1.3853913378033345,7.813874381922698,9.417626100947622,6.75612656253487,4.832974431872145,8.924815114700886,6.909513323953105,8.002484368643447,5.6439074624773555,4.117178711393164,1.5860840420051359,2.0806789254112767,9.619489765554846,6.251761540995593,9.222246741663723,2.507802951051379,6.698148780339412,8.852838117870547,9.405835017403055,6.773890711368757,4.836335220529917,3.4631432826233355,1.5883298096805576,9.869020850409044,5.952022866769235,8.313108881577989,1.2120777766183144,0.5408462357062849,0.5122309335972686,2.301310429594159,4.168788491560074,2.018908119420737,2.950743656396213,6.915658878982338,1.5758041939839362,3.2711672742369613,0.6520538216373395,3.3087621597241212,2.472089478778643,8.491852885093449,8.831904490938358,8.542429760027288,2.275703804100595,5.272437909346015,1.0696446644603785,0.770971750673497,8.66686742748259,9.370454997425357,7.61891982660898,0.9431777831563859,2.273533907969465,8.871341333797078,4.402885415440537,6.952962620770582,5.880041493508816,3.269244638575761,1.760644690476496,9.387155160541118,6.253468488505989,5.504410080779785,7.4306300757964046,4.1750125210954225,0.9224368823567697,2.393280603268446,2.7647385948066328,0.9260771522382116,7.279286619490312,6.575053642588351,0.598106863955441,0.016582131546660772,9.464100215980057,4.668367049803637,9.27207464290207,1.5061632169666783,0.32917009141135933,9.210670119271162,6.247116084323229,0.6166913434078758,4.00626188118439,4.630420512138413,4.750695825359634,4.192965337764791,5.9196801269008485,0.29248410067481245,0.3623292453645255,8.84275719436858,8.245783316336254,6.959177158845657,4.9429368389028605,9.356061914902451,0.4144937644039315,8.079347099457522,4.346994340151862,3.0537159096956645,2.3177914602499006,9.372564940446303,2.66730882827817,7.424000203123107,2.527048641048162,2.942227986840338,3.591902369796647,9.631064168495273,8.481086438990728,1.7713878294189556,8.675740922988211,2.602714974814897,4.784678352606502,2.231755757684619,9.10374722741272,4.418540493575655,2.5069564618440943,9.455087142932957,7.807355329686461,9.069097650407318,0.9317409544786392,1.8509605381828265,2.043168408469729,3.5782836605965995,7.274562208732038,7.639500889393151,9.117868970416772,9.024170985590176,0.4364541390009169,7.921935046624757,1.6784445565696338,6.206808670820642,7.021037357964348,3.6636972617406283,7.832778895874339,9.641877096877316,7.477027089797799,6.790392289138742,3.695859939209407,7.2435851293321125,6.964125830645158,0.7179431355979227,8.511409669877558,7.953946682007899,1.1393393515313543,4.941500462391566,5.721702956345737,0.44326981917753416,9.76304555710412,0.0005749781398489695,5.750643745103465,4.444578086425784,5.035501103474951,8.323203595919553,6.084375602121348,5.0501664426692905,2.8316807342809502,5.998962831188308,8.0195398466953,5.597431981935584,2.4684592661904503,5.533838386458192,9.816346701764566,4.9140525555863634,3.699002202304582,0.07507595122893562,6.194814692789301,5.101869894284771,7.738369320556407,5.38085462213844,4.848230928588128,3.892160955468298,6.256632923464878,8.446273440868719,1.0700506453532266,8.202062355292634,3.8072841529045265,5.601563239849612,6.709125912315004,0.8146339367068212,4.1788108319389465,2.9480797776830237,9.455668779812319,8.542880392475084,3.463963491439881,5.446035669005442,8.12413152527215,8.088335560291286,3.217414119587987,7.879058203639535,2.0324906741192983,0.4717904588812316,9.95465162028511,0.14959107593253362,8.867543829255267,8.269199781387229,7.616579881746228,6.471347028687959,6.330938553448416,5.14697630356272,7.347286507476019,8.686241317076774,6.976206939427712,4.55677226776992,0.9890860368876164,7.562467699455397,0.14705505314966283,6.521015728307631,5.424953305719498,5.430292851694389,3.10204625339769,0.03771962327991263,6.0066771373099765,4.2247494594580814,6.991533588068998,4.2710020318756285,6.2918847895755,0.9611586780461323,6.342264558828015,2.4404355500053976,6.089550949662876,0.05118303416769443,4.110109720911779,4.911245702768752,2.125295231046982,6.1547941409949996,4.500932592527125,1.0101417159640635,1.2387673707619018,7.896697437781295,9.622316702311416,2.449145009801088,4.038162557422265,6.754622014276324,7.758044428889564,3.2237849140740704,3.126013682608413,1.6230013488547534,0.6544602223489759,4.545014761121163,5.711446980968677,7.4318429351546005,3.2070902365793597,5.077598206213729,6.662724785110187,8.600303894514587,2.479450562680381,8.478104871937175,4.42074989723648,0.6369880441325138,2.361676760403082,3.3710580273449864,9.546916753852656,3.204118865533294,9.741288538065845,6.7647187522708485,1.265011108398173,1.6136552224097422,2.5292491666580363,4.01744268954161,4.408028202476892,8.591941224569897,4.532508957575971,5.417677881332132,8.214928823235796,6.962951964183501,2.25564274877196,0.12896286417469316,3.804754582012384,5.870866484140906,7.367278520215182,2.226967538064162,5.07210165223306,4.089071304851775,6.736684323333995,3.9517289626842045,7.615077409872127,8.027581471200522,8.46887469176014,6.560188324894376,1.887985680203479,7.562008668365099,2.7852281107107824,0.3355562650002586,6.54651150818877,8.238988587875362,7.1655111659529265,5.732015796020933,1.9869236723847172,5.150801411838559,0.03935624498487389,8.518293114755357,5.420348104765173,8.200817089353665,7.40876166133964,1.21660787936952,3.734692543385578,4.9723624425721225,9.736601722501554,8.417722364419722,9.9678041170618,6.310863050047811,1.122508429927358,8.770725392121047,9.677443612623605,3.0373025414493338,4.448642387495278,7.979126954576756,6.18123198745971,8.704469812471661,4.333173069181844,5.722068921824679,7.201453836111337,1.0554719299413207,7.675664590120046,4.556103108860108,8.110622901790382,2.5225349129872887,6.119739781318216,9.0031868929744,9.83098810617393,4.508281153051177,5.257391381981609,9.748570363610556,5.4880275423262255,5.732024726688882,8.037453890823134,3.852875038484731,4.7214426537014,1.1676708571893268,8.049437058962097,9.836411755869353,4.1127298168988835,9.326984439251751,2.901746831008094,1.2144930747859894,7.418987076061628,5.648973487842472,9.859687354866661,7.8824726886908785,1.9977537802949596,5.625767548962523,5.630414873260006,2.707004558388142,2.5484274747123337,9.653606783631677,7.200711719017194,1.876546244894055,7.461499243817141,5.0075772079611625,8.83024510167358,6.999843679859607,6.81474728568209,5.173295922441563,7.551138739434878,4.069256549461144,1.3461885702020404,9.760511956123782,9.47340813549184,3.8414815022622584,5.290842211435551,2.2773753298735766,6.497056714470906,9.395686675405186,6.026734820114448,4.2870720456536855,0.3948443356188447,9.671282979605738,2.21043951462647,0.9673814409555748,3.0441797977383667,3.9253599011756157,4.696354079263125,7.398848750097187,0.8420251569264159,2.2595050186705556,3.3151152069377665,1.495417312657883,3.532490974887459,2.581669392101127,4.727885691910904,1.8987426898688065,8.851432023182381,1.1857219466343127,0.9966079196494926,8.132945664800289,0.4803563422178958,1.7072072845443387,4.53374976296822,5.020963282401656,0.7793733505984757,2.306024216478688,2.9129533166248955,6.5783052450450175,1.1731405082611923,6.822843469390132,8.981385464849602,1.4025457450571444,9.088405045182702,6.2616080756415515,2.9439640921004417,3.340495862489008,6.368273635315564,9.61197950206882,1.4094092652465795,5.0796844055586154,3.9651054308318634,1.4882816526527631,2.863131890909909,7.054464063184618,4.8578538578915875,0.31618592133432877,8.237338696921949,4.912443026909916,2.1484534285497725,0.6697350519897682,0.5533130036743472,2.524617526445887,6.300642117440541,3.0809120674139368,5.288874565618444,5.303141048950868,7.853568269358348,9.60893269121164,2.633869976388412,2.424676283100069,2.416855985373063,7.395511626203801,7.456487283669169,9.220028886297605,6.533871252567938,0.24631581583407058,5.6967971192494105,7.652801194073053,9.169276112996158,8.298867286359519,1.0565573537469475,7.059574794459563,5.659241640796684,7.577980957370876,0.6151952570645558,4.788941118991874,1.2475817590158256,4.8673437645260265,3.6440408502701316,9.100039882620145,6.536637992280976,7.232157570607849,2.017284807054631,3.5538954748070717,0.16000603694137583,7.091048845749026,1.2622131493080269,0.43479282111983597,7.367205992718649,3.5180355824692455,6.6215641931193385,4.8167086077669445,5.861180958701214,2.1908401881916384,5.408012924633809,0.8035637477013857,1.7449339900692906,3.632082340199898,1.4044870163461765,3.255368193763122,9.577764895410045,3.881666750992645,9.790008314301037,2.462853296479597,6.460366790978409,0.2749091904055101,6.929510423213861,1.9025197179163178,7.05055221658391,1.3202108733136697,8.96888078965336,6.700534270731953,1.4441498775006156,6.2514490400930285,0.06429152219724843,0.6408543304322634,4.660888062293154,2.942396941432801,4.777827433026134,6.525383099439537,0.9804010025773868,9.07101273004372,1.1053812052051537,6.803383295112262,4.3618916287165455,0.04983887000025389,7.855269340691691,5.188008593815687,1.867290183000918,3.2375448141046914,4.4637859166916005,9.650855375703769,1.8261744143125203,2.277644543587376,6.103208873197305,5.7334338009230095,0.0580336901087497,6.097407707425637,7.689203550881172,6.151780004189112,0.04350213953215443,6.670193824365091,3.1448541347510806,3.1483763633522743,8.964651161444195,6.6290472845153925,8.154103260918031,7.001060321267052,9.416179829706042,5.578585592874248,7.211968095146113,2.297177773983934,9.819639069286854,6.8430151391744705,5.8425177577155445,8.568524936029611,5.442714105087559,6.391871020700908,1.390732624979305,4.882188833660952,4.4315437490836995,8.823851517306053,9.357538314875267,6.203853422749448,6.5468112549651325,1.386637239619688,6.973958650123613,4.931427412696556,3.1916845523534088,8.198421608015167,7.959166196309109,2.527110921347282,9.540937279634168,3.3198792810142286,5.30442101593704,3.4315363038650504,5.333240214644787,5.058021313517703,9.113905158399769,7.561194320595792,1.6457547859851274,1.3196578026987726,5.91289045697385,6.808483724102081,8.3170103644574,5.97601874171535,6.4882295290961896,3.2557275358340187,5.057304039170509,6.826932861070045,8.492551544225046,4.151151817284844,5.840690689136821,6.764750429727919,5.162185051339801,7.436873885724951,9.695900516855865,3.85987838667347,2.596441780275718,3.755303349580419,4.37993880281206,4.659309077979112,8.229794078257697,9.205418480202777,2.1454427608817506,3.6525393789315164,3.3780206825717674,1.0208398056837509,9.92628525849959,3.7479389261333274,9.278366450208,2.586467254360647,0.15643710571614955,8.989359929422667,0.3266251641077411,9.291366528202257,0.5168978660601087,8.938059385264538,7.7899489909336594,8.189864217998213,6.985756092958086,7.980195461589135,0.8069857487100163,0.46254007259155294,0.2627063779119876,4.55676968007936,0.38509834730008796,0.8960657470041911,1.3731856682805454,1.6321288889176966,6.266775351687688,7.101372166011661,9.881120762899869,9.879564984184043,3.487551482533253,4.823389433218672,9.484992635168588,9.898591525301812,5.9296020978974395,8.550041805831398,3.8946441146224164,6.542853270441764,0.9206682999624616,3.623460923811881,3.0379013977505,6.514947443723473,4.6227337627762495,8.932488587106782,2.695511116417806,0.08545058166012032,9.003973825047558,1.5223387864476123,3.3071448459656105,8.586902378072388,1.875417870506213,0.2958497421849393,9.026608541598122,2.2458136526822625,7.598661181806392,9.078125087754742,8.691120643351969,0.09164665902612334,9.591362833526134,1.2590173156233697,3.2343542879482623,3.08754846318003,1.5182671548671611,3.5488281379802755,5.928912983976331,7.739995900187742,7.946461354396719,5.159727971404808,9.120547457703472,1.036390278053787,4.971463656281534,7.923822269160734,8.432919129219837,7.235822200416844,0.9826050649228346,2.9159832226053295,3.5241162977989204,3.392452539554449,2.041721797421865,5.5231121004432655,5.262591177311807,4.248272382874556,8.392927085969085,1.3262123122131153,9.34976054815447,9.887525344295938,4.426834056198707,8.57448307457161,4.818926973893403,2.9479216366524197,2.3405664210261024,3.4890707374426477,9.990468851925938,0.6014610430078782,8.649526583616618,7.136183560347336,3.8320616952904074,5.100749611379136,4.410706899665849,3.267168465429149,8.223521165168833,7.138154834499009,0.17977051941259647,0.5759592173724948,7.380842660775899,6.25859991918108,4.002714212905191,3.234718416721021,0.8352960123460784,1.3043271286259306,5.861346217180747,7.587562457970451,0.7399636201949034,1.1247704076474108,7.017964604403149,1.8757060320597163,3.330344064733446,4.6295655382121925,9.759107414531663,2.1523057132698042,2.9629649158379356,1.8365385057262817,1.6950294380024866,6.322427000900315,9.701553981731815,5.795893957380804,2.066107296846378,4.700422459761533,1.2785940810781682,8.651920026832041,3.531477009271553,9.019843386904471,0.1935846479784442,6.423825609892595,1.939974368722861,8.715737324613244,0.029782081814468953,3.948793560291586,8.624431790726291,9.394212227195059,2.3099945149764634,5.4366238846923265,4.207971773645851,3.18810637525321,3.895696114821916,6.587460594507302,8.602225425662155,9.063774735817361,5.920134388706931,7.955081014006129,3.3457459230334607,2.4167092109848243,1.9729284530465185,0.3068086942407433,5.329675064502628,8.805473545173584,3.3915510842245666,9.116087369534418,7.686694934859983,0.28702494229485565,9.099526577184989,9.098437354046979,2.288760393408078,3.016854954946717,7.8990629956714065,5.0357468552063995,8.119068039362872,7.39128096980461,1.770790441045853,6.633000133437507,0.7128695590789969,3.000574052574776,0.40994886720494117,1.0093638456804799,3.193091121438645,7.891211548955606,2.5468755522034314,4.010499973777475,6.922933480549132,5.092146736700456,5.892671061877293,8.954201073454255,0.7556553557547763,4.7941326467184275,1.030330597500484,1.3552500229865005,0.8559223236607982,5.492580863932696,0.49966348093302804,6.156376776006707,5.041193614574451,0.6306902567994044,4.040296951040463,2.4686289941130024,8.976431069954229,3.60406237405672,6.40222906113171,5.283760010143443,9.643338881994776,8.315247817023153,7.034995228806524,9.274865342371495,0.9209048851345369,9.942752790717918,4.117312284040498,2.8267444168216205,3.412046744489774,8.184216443132172,4.709896996474859,7.593346784875303,1.320757984441363,6.585048811807099,8.430201315284814,5.94588132424263,5.0658575350385675,6.136964697335136,3.499148160372001,0.9421210084722964,1.7584177846490645,3.6932171804067626,7.619869247318798,6.357943647008641,3.0671529749664805,4.471759649036951,3.98509266998496,7.0070088929662795,0.03749621906573575,3.1531664680217797,1.0220639208415516,8.651693801158482,2.1673983190261725,3.068691330912372,3.494565274951489,9.038770269826133,7.772338510744805,8.973992902811519,7.5442516932153625,2.8520517889205577,4.923066788245809,1.9483387353030812,0.42650424587578506,3.2229882217129147,1.5679900546109593,7.609334749679258,8.120156040514095,4.748634054567383]}

},{}],71:[function(require,module,exports){
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
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0 );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, -1.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, 0.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given positive `mu`', function test( t ) {
	var quantile;
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var p;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], beta[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given negative `mu`', function test( t ) {
	var quantile;
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var p;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], beta[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given large variance ( = large `beta`)', function test( t ) {
	var quantile;
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var p;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], beta[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/quantile/test/test.factory.js")
},{"./../lib/factory.js":65,"./fixtures/julia/large_variance.json":68,"./fixtures/julia/negative_mean.json":69,"./fixtures/julia/positive_mean.json":70,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":226}],72:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/quantile/test/test.js")
},{"./../lib":66,"tape":226}],73:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a finite `mu` and `beta`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.8, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.7, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.7, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile function at `p` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var p;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], beta[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var p;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], beta[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given large variance ( = large `beta` )', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var p;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], beta[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/quantile/test/test.quantile.js")
},{"./../lib":66,"./fixtures/julia/large_variance.json":68,"./fixtures/julia/negative_mean.json":69,"./fixtures/julia/positive_mean.json":70,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":226}],74:[function(require,module,exports){
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

},{"./is_number.js":77}],75:[function(require,module,exports){
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

},{"./is_number.js":77,"./zero_pad.js":81}],76:[function(require,module,exports){
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

},{"./main.js":79}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{"./format_double.js":74,"./format_integer.js":75,"./is_string.js":78,"./space_pad.js":80,"./zero_pad.js":81}],80:[function(require,module,exports){
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

},{"./main.js":83}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{"./main.js":86}],85:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],86:[function(require,module,exports){
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

},{"./is_string.js":85,"@stdlib/string/base/format-interpolate":76,"@stdlib/string/base/format-tokenize":82}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":96}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./define_property.js":94}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":93,"./has_define_property_support.js":95,"./polyfill.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":84}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":99,"./polyfill.js":100,"@stdlib/assert/has-tostringtag-support":20}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":101}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":101,"./tostringtag.js":102,"@stdlib/assert/has-own-property":16}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":87}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){

},{}],105:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],106:[function(require,module,exports){
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
},{"base64-js":103,"buffer":106,"ieee754":209}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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
},{"_process":216}],109:[function(require,module,exports){
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

},{"events":107,"inherits":210,"readable-stream/lib/_stream_duplex.js":111,"readable-stream/lib/_stream_passthrough.js":112,"readable-stream/lib/_stream_readable.js":113,"readable-stream/lib/_stream_transform.js":114,"readable-stream/lib/_stream_writable.js":115,"readable-stream/lib/internal/streams/end-of-stream.js":119,"readable-stream/lib/internal/streams/pipeline.js":121}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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
},{"./_stream_readable":113,"./_stream_writable":115,"_process":216,"inherits":210}],112:[function(require,module,exports){
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
},{"./_stream_transform":114,"inherits":210}],113:[function(require,module,exports){
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
},{"../errors":110,"./_stream_duplex":111,"./internal/streams/async_iterator":116,"./internal/streams/buffer_list":117,"./internal/streams/destroy":118,"./internal/streams/from":120,"./internal/streams/state":122,"./internal/streams/stream":123,"_process":216,"buffer":106,"events":107,"inherits":210,"string_decoder/":225,"util":104}],114:[function(require,module,exports){
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
},{"../errors":110,"./_stream_duplex":111,"inherits":210}],115:[function(require,module,exports){
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
},{"../errors":110,"./_stream_duplex":111,"./internal/streams/destroy":118,"./internal/streams/state":122,"./internal/streams/stream":123,"_process":216,"buffer":106,"inherits":210,"util-deprecate":234}],116:[function(require,module,exports){
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
},{"./end-of-stream":119,"_process":216}],117:[function(require,module,exports){
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
},{"buffer":106,"util":104}],118:[function(require,module,exports){
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
},{"_process":216}],119:[function(require,module,exports){
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
},{"../../../errors":110}],120:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],121:[function(require,module,exports){
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
},{"../../../errors":110,"./end-of-stream":119}],122:[function(require,module,exports){
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
},{"../../../errors":110}],123:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":107}],124:[function(require,module,exports){
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

},{"./":125,"get-intrinsic":200}],125:[function(require,module,exports){
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

},{"es-define-property":185,"es-errors/type":191,"function-bind":199,"get-intrinsic":200,"set-function-length":220}],126:[function(require,module,exports){
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

},{"./lib/is_arguments.js":127,"./lib/keys.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],129:[function(require,module,exports){
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

},{"es-define-property":185,"es-errors/syntax":190,"es-errors/type":191,"gopd":201}],130:[function(require,module,exports){
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

},{"define-data-property":129,"has-property-descriptors":202,"object-keys":214}],131:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],132:[function(require,module,exports){
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

},{"./ToNumber":163,"./ToPrimitive":165,"./Type":170}],133:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/isNaN":179,"../helpers/isPrefixOf":180,"./ToNumber":163,"./ToPrimitive":165,"es-errors/type":191,"get-intrinsic":200}],134:[function(require,module,exports){
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

},{"call-bind/callBound":124,"es-errors/type":191}],135:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":193}],136:[function(require,module,exports){
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

},{"./DayWithinYear":139,"./InLeapYear":143,"./MonthFromTime":153,"es-errors/eval":186}],137:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":184,"./floor":174}],138:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":174}],139:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":137,"./DayFromYear":138,"./YearFromTime":172}],140:[function(require,module,exports){
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

},{"./modulo":175}],141:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":182,"./IsAccessorDescriptor":144,"./IsDataDescriptor":146,"es-errors/type":191}],142:[function(require,module,exports){
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

},{"../helpers/timeConstants":184,"./floor":174,"./modulo":175}],143:[function(require,module,exports){
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

},{"./DaysInYear":140,"./YearFromTime":172,"es-errors/eval":186}],144:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":182,"es-errors/type":191,"hasown":208}],145:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":211}],146:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":182,"es-errors/type":191,"hasown":208}],147:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":144,"./IsDataDescriptor":146,"./IsPropertyDescriptor":148,"es-errors/type":191}],148:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":182}],149:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/timeConstants":184}],150:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"./DateFromTime":136,"./Day":137,"./MonthFromTime":153,"./ToInteger":162,"./YearFromTime":172,"./floor":174,"./modulo":175,"get-intrinsic":200}],151:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/timeConstants":184,"./ToInteger":162}],152:[function(require,module,exports){
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

},{"../helpers/timeConstants":184,"./floor":174,"./modulo":175}],153:[function(require,module,exports){
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

},{"./DayWithinYear":139,"./InLeapYear":143}],154:[function(require,module,exports){
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

},{"../helpers/isNaN":179}],155:[function(require,module,exports){
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

},{"../helpers/timeConstants":184,"./floor":174,"./modulo":175}],156:[function(require,module,exports){
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

},{"./Type":170}],157:[function(require,module,exports){
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


},{"../helpers/isFinite":178,"./ToNumber":163,"./abs":173,"get-intrinsic":200}],158:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":184,"./DayFromYear":138}],159:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":184,"./modulo":175}],160:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],161:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":163}],162:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/isNaN":179,"../helpers/sign":183,"./ToNumber":163,"./abs":173,"./floor":174}],163:[function(require,module,exports){
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

},{"./ToPrimitive":165,"call-bind/callBound":124,"safe-regex-test":219}],164:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":194}],165:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":196}],166:[function(require,module,exports){
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

},{"./IsCallable":145,"./ToBoolean":160,"./Type":170,"es-errors/type":191,"hasown":208}],167:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":200}],168:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/isNaN":179,"../helpers/sign":183,"./ToNumber":163,"./abs":173,"./floor":174,"./modulo":175}],169:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":163}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":137,"./modulo":175}],172:[function(require,module,exports){
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

},{"call-bind/callBound":124,"get-intrinsic":200}],173:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":200}],174:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],175:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":181}],176:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":184,"./modulo":175}],177:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":132,"./5/AbstractRelationalComparison":133,"./5/Canonicalize":134,"./5/CheckObjectCoercible":135,"./5/DateFromTime":136,"./5/Day":137,"./5/DayFromYear":138,"./5/DayWithinYear":139,"./5/DaysInYear":140,"./5/FromPropertyDescriptor":141,"./5/HourFromTime":142,"./5/InLeapYear":143,"./5/IsAccessorDescriptor":144,"./5/IsCallable":145,"./5/IsDataDescriptor":146,"./5/IsGenericDescriptor":147,"./5/IsPropertyDescriptor":148,"./5/MakeDate":149,"./5/MakeDay":150,"./5/MakeTime":151,"./5/MinFromTime":152,"./5/MonthFromTime":153,"./5/SameValue":154,"./5/SecFromTime":155,"./5/StrictEqualityComparison":156,"./5/TimeClip":157,"./5/TimeFromYear":158,"./5/TimeWithinDay":159,"./5/ToBoolean":160,"./5/ToInt32":161,"./5/ToInteger":162,"./5/ToNumber":163,"./5/ToObject":164,"./5/ToPrimitive":165,"./5/ToPropertyDescriptor":166,"./5/ToString":167,"./5/ToUint16":168,"./5/ToUint32":169,"./5/Type":170,"./5/WeekDay":171,"./5/YearFromTime":172,"./5/abs":173,"./5/floor":174,"./5/modulo":175,"./5/msFromTime":176}],178:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":179}],179:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],180:[function(require,module,exports){
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

},{"call-bind/callBound":124}],181:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],182:[function(require,module,exports){
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

},{"es-errors/type":191,"hasown":208}],183:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{"get-intrinsic":200}],186:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],187:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],188:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],189:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],190:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],191:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],192:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],193:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":191}],194:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":195,"./RequireObjectCoercible":193}],195:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],196:[function(require,module,exports){
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

},{"./helpers/isPrimitive":197,"is-callable":211}],197:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":198}],200:[function(require,module,exports){
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

},{"es-errors":187,"es-errors/eval":186,"es-errors/range":188,"es-errors/ref":189,"es-errors/syntax":190,"es-errors/type":191,"es-errors/uri":192,"function-bind":199,"has-proto":203,"has-symbols":204,"hasown":208}],201:[function(require,module,exports){
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

},{"get-intrinsic":200}],202:[function(require,module,exports){
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

},{"es-define-property":185}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{"./shams":205}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":205}],207:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":199}],208:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":199}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{"call-bind/callBound":124,"has-tostringtag/shams":206}],213:[function(require,module,exports){
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

},{"./isArguments":215}],214:[function(require,module,exports){
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

},{"./implementation":213,"./isArguments":215}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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
},{"_process":216,"through":232,"timers":233}],218:[function(require,module,exports){
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

},{"buffer":106}],219:[function(require,module,exports){
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

},{"call-bind/callBound":124,"es-errors/type":191,"is-regex":212}],220:[function(require,module,exports){
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

},{"define-data-property":129,"es-errors/type":191,"get-intrinsic":200,"gopd":201,"has-property-descriptors":202}],221:[function(require,module,exports){
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

},{"es-abstract/es5":177,"function-bind":199}],222:[function(require,module,exports){
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

},{"./implementation":221,"./polyfill":223,"./shim":224,"define-properties":130,"function-bind":199}],223:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":221}],224:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":223,"define-properties":130}],225:[function(require,module,exports){
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
},{"safe-buffer":218}],226:[function(require,module,exports){
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
},{"./lib/default_stream":227,"./lib/results":229,"./lib/test":230,"_process":216,"defined":131,"through":232,"timers":233}],227:[function(require,module,exports){
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
},{"_process":216,"fs":105,"through":232}],228:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":216,"timers":233}],229:[function(require,module,exports){
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
},{"_process":216,"events":107,"function-bind":199,"has":207,"inherits":210,"object-inspect":231,"resumer":217,"through":232,"timers":233}],230:[function(require,module,exports){
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
},{"./next_tick":228,"deep-equal":126,"defined":131,"events":107,"has":207,"inherits":210,"path":108,"string.prototype.trim":222}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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
},{"_process":216,"stream":109}],233:[function(require,module,exports){
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
},{"process/browser.js":216,"timers":233}],234:[function(require,module,exports){
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
},{}]},{},[71,72,73]);
