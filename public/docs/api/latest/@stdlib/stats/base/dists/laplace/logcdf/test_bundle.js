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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":48}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":49}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":50}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":105}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":105}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":105}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":105}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Natural logarithm of `1/2`.
*
* @module @stdlib/constants/float64/ln-half
* @type {number}
*
* @example
* var LN_HALF = require( '@stdlib/constants/float64/ln-half' );
* // returns -0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `1/2`.
*
* ```tex
* \ln (1/2)
* ```
*
* @constant
* @type {number}
* @default -0.6931471805599453
*/
var LN_HALF = -0.69314718055994530941723212145817656807550013436025525412;


// EXPORTS //

module.exports = LN_HALF;

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

},{"@stdlib/number/ctor":61}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":52}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":54}],54:[function(require,module,exports){
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

},{"./main.js":56}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_q.js":57,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/half-ln-two":44,"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":47,"@stdlib/math/base/assert/is-nan":51,"@stdlib/number/float64/base/from-words":63,"@stdlib/number/float64/base/get-high-word":67,"@stdlib/number/float64/base/set-high-word":70}],57:[function(require,module,exports){
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
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns -Infinity
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './main.js' );


// EXPORTS //

module.exports = log1p;

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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_log1p.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyval = require( './polyval_lp.js' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01; // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* ## Method
*
* 1.  Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*     ```tex
*     1+x = 2^k (1+f)
*     ```
*
*     where
*
*     ```tex
*     \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*     ```
*
*     <!-- <note> -->
*
*     If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*     ```tex
*     u = \operatorname{round}(1+x)
*     ```
*
*     and
*
*     ```tex
*     c = (1+x) - u
*     ```
*
*     then
*
*     ```tex
*     \ln (1+x) - \ln u \approx \frac{c}{u}
*     ```
*
*     We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*
*     <!-- </note> -->
*
* 2.  Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*     ```tex
*     s = \frac{f}{2+f}
*     ```
*
*     based on
*
*     ```tex
*     \begin{align*}
*     \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*             &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*             &= 2s + sR \\
*     \end{align*}
*     ```
*
*     We use a special Reme algorithm on \\(\[0,0.1716\]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ```tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ```tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*
*     <!-- </note> -->
*
*     Note that
*
*     ```tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ```tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3.  Finally,
*
*     ```tex
*     \begin{align*}
*     \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*     &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*     \end{align*}
*     ```
*
*     Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*     ```tex
*     \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*     ```
*
*     where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* -   Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*     ```javascript
*     var u = 1.0 + x;
*     if ( u === 1.0 ) {
*         return x;
*     } else {
*         return ln(u) * (x/(u-1.0));
*     }
*     ```
*
*     See HP-15C Advanced Functions Handbook, p.193.
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
*
* @example
* var v = log1p( -1.0 );
* // returns -Infinity
*
* @example
* var v = log1p( 0.0 );
* // returns 0.0
*
* @example
* var v = log1p( -0.0 );
* // returns -0.0
*
* @example
* var v = log1p( -2.0 );
* // returns NaN
*
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if ( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - ( x*x*0.5 );
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if ( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return ( k * LN2_HI ) + c;
		}
		R = hfsq * (1.0 - ( TWO_THIRDS*f ) ); // avoid division
		return ( k*LN2_HI ) - ( (R - ( (k*LN2_LO) + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - ( s*(hfsq+R) ) );
	}
	return ( k*LN2_HI ) - ( (hfsq - ( (s*(hfsq+R)) + ((k*LN2_LO) + c))) - f );
}


// EXPORTS //

module.exports = log1p;

},{"./polyval_lp.js":60,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":47,"@stdlib/math/base/assert/is-nan":51,"@stdlib/number/float64/base/get-high-word":67,"@stdlib/number/float64/base/set-high-word":70}],60:[function(require,module,exports){
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
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"./main.js":65}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":64,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":66,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],69:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":66}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":69,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var LNHALF = require( '@stdlib/constants/float64/ln-half' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the cumulative distribution function (CDF) for a Laplace distribution with location parameter `mu` and scale parameter `b`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 3.0, 1.5 );
*
* var y = logcdf( 1.0 );
* // returns ~-2.026
*
* y = logcdf( 4.0 );
* // returns ~-0.297
*/
function factory( mu, b ) {
	if ( isnan( mu ) || isnan( b ) || b <= 0.0 ) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the logarithm of the cumulative distribution function (CDF) for a Laplace distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*
	* @example
	* var y = logcdf( 2.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		z = ( x - mu ) / b;
		if ( x < mu ) {
			return LNHALF + z;
		}
		return LNHALF + log1p( -expm1( -z ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ln-half":45,"@stdlib/math/base/assert/is-nan":51,"@stdlib/math/base/special/expm1":55,"@stdlib/math/base/special/log1p":58,"@stdlib/utils/constant-function":96}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Laplace distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/laplace/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/laplace/logcdf' );
*
* var y = logcdf( 10.0, 0.0, 3.0 );
* // returns ~-0.018
*
* y = logcdf( 0.0, 0.0, 3.0 );
* // returns ~-0.693
*
* var mylogcdf = logcdf.factory( 2.0, 3.0 );
* y = mylogcdf( 10.0 );
* // returns ~-0.036
*
* y = mylogcdf( 2.0 );
* // returns ~-0.693
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":72,"./main.js":74,"@stdlib/utils/define-nonenumerable-read-only-property":98}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var LNHALF = require( '@stdlib/constants/float64/ln-half' );


// MAIN //

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for a Laplace distribution with location parameter `mu` and scale parameter `b` at value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {number} evaluated logarithm of CDF
*
* @example
* var y = logcdf( 2.0, 0.0, 1.0 );
* // returns ~-0.07
*
* @example
* var y = logcdf( 5.0, 10.0, 3.0 );
* // returns ~-2.36
*
* @example
* var y = logcdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 2, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logcdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function logcdf( x, mu, b ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( b ) ||
		b <= 0.0
	) {
		return NaN;
	}
	z = ( x - mu ) / b;
	if ( x < mu ) {
		return LNHALF + z;
	}
	return LNHALF + log1p( -expm1( -z ) );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/float64/ln-half":45,"@stdlib/math/base/assert/is-nan":51,"@stdlib/math/base/special/expm1":55,"@stdlib/math/base/special/log1p":58}],75:[function(require,module,exports){
module.exports={"expected":[-0.05705766685860736,-0.7286020570824241,-0.53420065130454,-0.5279911392161483,-0.33898230771320365,-0.540639742351337,-0.4134847461740265,-0.1568547478819503,-0.7634918961514876,-0.19854189195745364,-0.6513206445650285,-0.5044190608199202,-0.6632448645367822,-0.2593059764445411,-0.5115456721161118,-0.6767106052850925,-0.36123176351102276,-0.33234868406143586,-0.5687294614451204,-0.6352438259376187,-0.6087421795861762,-0.5197155430004559,-0.03491314534677892,-0.6605500018660597,-0.6823303856361793,-0.5889785814069536,-0.6495243075972599,-0.38852623614889525,-0.4350503604959003,-0.7643352749183343,-0.5781362223123616,-0.4376875802577568,-0.2962011221285285,-0.49584042194469413,-0.5302055854063978,-0.4905967479243607,-0.3642158638303336,-0.6804137936030078,-0.6292322440992953,-0.33489678767011377,-0.5872244030523912,-0.35801700970043354,-0.6568286086789311,-0.5182784349886027,-0.5372652841589968,-0.4660330313028463,-0.3664359999065043,-0.5219173750231749,-0.3704711795542264,-0.5833435248048333,-0.7415278406190591,-0.690633384566772,-0.2939943100738975,-0.5500798576175392,-0.4214827919395109,-0.6678383175163911,-0.7408234975726621,-0.4897451773786122,-0.46283122748733113,-0.7434460144934835,-0.4800886821536534,-0.6400144264259676,-0.4058049207816479,-0.5151056991584695,-0.5939138189975284,-0.5068074280040152,-0.23867251061575423,-0.47557101037674365,-0.4074009055083822,-0.3971695486083377,-0.23707869949917454,-0.6812775498827824,-0.6299305134730815,-0.3159379640437137,-0.4581168997832872,-0.4989916952623529,-0.5152559887237455,-0.7037623078279892,-0.32487735599277745,-0.38771511764076855,-0.4400840426850041,-0.3656361645579187,-0.7457609676837879,-0.5472720939298079,-0.4517268968915319,-0.3749972950117146,-0.49367292013730457,-0.4996238419183102,-0.6898452825549656,-0.36995987983406026,-0.4716213408883667,-0.6039701911073561,-0.2243107180513011,-0.5340312555624873,-0.5812252851761499,-0.48422388428246566,-0.23299153239364762,-0.6130540095091911,-0.6481373621469753,-0.6947287430042186,-0.5989295923272201,-0.4777742393067579,-0.6559989543693756,-0.5279679861126334,-0.49998442564648204,-0.18218156686815956,-0.40699889436640524,-0.5019987262163115,-0.5890412420584341,-0.05275797434003571,-0.18547862470613719,-0.4124490784017626,-0.6841275624729141,-0.7904342224769704,-0.5531119729024132,-0.7464970693691324,-0.024930827243836107,-0.6890962430574361,-1.142227638423299,-0.654056280905271,-0.598898058894567,-0.611942332869554,-0.5081408782414765,-0.5142545812188746,-0.5482170389292611,-0.14033120108215458,-0.5505833580127285,-0.32745810258741354,-0.5201832509594815,-1.250145951342848,-0.707996583728056,-0.23946894338209285,-0.5136997065337876,-0.5723649038143175,-0.06185579200837821,-0.4628432444307902,-0.5079735146688786,-0.6333216778474096,-0.5538136160366836,-0.5842357128519534,-0.4704425067610405,-0.562865548335467,-0.047213449953560915,-0.5893029746372327,-0.2167225757669402,-0.40096157585698655,-0.6366742390024305,-0.2320727981743127,-0.04485966522024054,-0.5479983609645411,-0.48661646497042466,-0.7061240581272514,-0.21279331252489653,-0.5209782979255055,-0.6553403841069323,-0.6930313388449678,-0.3067766270167327,-0.5376848941378087,-0.717009954132599,-0.5526804727142114,-0.06072621533836653,-0.5688511162560059,-0.4976122798833131,-0.6947555637984322,-0.6039263285541436,-0.6152218073147697,-0.4707893363868765,-0.2659712201108058,-0.3412070860803496,-0.4656728301061841,-0.6599063337654476,-0.2321771681051124,-0.5859694239314839,-0.47673443310120583,-0.4240782855516603,-0.6683602415158512,-0.3561000156593227,-0.4945401222468954,-0.09668314340845285,-0.6549662812224372,-0.4426263045982871,-0.5178885791658282,-0.3804120517282631,-0.12400373564510891,-0.6586753514195455,-0.6086460447380775,-0.35569522194408487,-0.7154741175648973,-0.6311213414641789,-0.5999125239288995,-0.6182400639804007,-0.6253711277212678,-0.7266158472089118,-0.5091222274022503,-0.6110719959337407,-0.49937762460552515,-0.4718618962878027,-0.4227391422900712,-0.6403254819361351,-0.5820723759053069,-0.6768280571756204,-0.5348678849981243,-0.5468297124598716,-0.6515436141358881,-0.644316064756755,-0.49109147943199716,-0.48357211077342577,-0.5606695984726169,-0.6413518159009829,-0.20466773690255347,-0.5559355928681499,-0.7275185405836735,-0.6004945048742485,-0.002686939451553849,-0.17176379819351661,-0.13492783506097383,-0.30468699438982416,-0.480923930200487,-0.6566107781150832,-0.7258898249744525,-0.4958783959648727,-0.5221954664165652,-0.0043218439222951766,-0.5817548924984934,-0.49522148868708304,-0.5600183615502762,-1.3190940390228418,-0.536073269943368,-0.5440347599208456,-0.6853826600342753,-0.6414787059633928,-0.561729194008541,-0.52165582705279,-0.4871797989763834,-0.3291630889340352,-0.36462315164636394,-0.5615677938582058,-0.5698700032201603,-0.7161384108087826,-0.5706234233248256,-0.49885116824104747,-0.5555604650254877,-0.2494192501694577,-0.29945925125195305,-0.16850753377792194,-0.6509178110562203,-0.43620179846536455,-0.2977075915887347,-0.20078933575136493,-0.48409188527669444,-0.03747507298946928,-0.43420222437225153,-0.5665131783887841,-0.414915192468986,-0.6788481456633425,-0.3465557762320721,-0.5113246587021423,-0.683409084126688,-0.5419671076373194,-0.5458708253986504,-0.5158933470720868,-0.5233380940576883,-0.6876742107431465,-0.6907543088728144,-0.5795777468522713,-0.6341986122347945,-0.6005258168856872,-0.05097305365072602,-0.47873050735203826,-0.6042725110351166,-0.6327038383389141,-0.4569975537916846,-0.4678492666198527,-0.5491102974742121,-0.644749418767447,-0.5036987747384255,-0.4882123013779185,-0.5500887908997194,-0.5577035268713808,-0.2968323722725325,-0.6757460045825987,-0.6221375569158294,-0.6065125591366527,-0.47787046705578284,-0.5390951830541741,-0.45022084963099446,-0.6218792699850016,-0.5536828459976472,-0.6620693749973228,-0.4837027347711598,-0.35703446019479873,-0.49741866927140616,-0.7755950444392739,-0.04059337374081873,-0.5681731602266669,-0.2078978712604082,-0.3496840084343022,-0.4729806624599001,-0.39648422325438415,-0.5366258079877821,-0.49777211256344933,-0.422825320142788,-0.5214316712286958,-0.7175084153563887,-0.6760631906004175,-0.5543105024766597,-0.3345494840371196,-0.31166913221089004,-0.7102614381496365,-0.6755299377503523,-0.5320662951986023,-0.5466740028335633,-0.7070622373987877,-0.38527823353240426,-0.37379947673493985,-0.5448930043258108,-0.6635000730501639,-0.7591364050582952,-0.6786741667641838,-0.466185865228139,-0.5768601600566055,-0.5523837675306281,-0.36772333744910835,-0.34695069728244116,-0.7147044274591294,-0.6389223006331898,-0.6836807554740878,-0.5753573311087011,-0.6389268136821915,-0.32241137491956695,-0.7557077124013112,-0.3708490574779317,-0.4909803787350061,-0.07791609894529072,-0.5510600740809829,-0.45818237135225426,-0.47950923342760715,-0.41621131738967726,-0.59538038339826,-0.7165959913414393,-0.38302487748750874,-0.6622088597978751,-0.5309695799377693,-0.42456497782217817,-0.3876050606558195,-0.0549357609007991,-0.0017091797880099957,-0.09402581008117139,-0.424429919994195,-0.5635440427328247,-0.2444984390739658,-0.1820811831445327,-0.5180767424606728,-0.6798811457692367,-0.5089512652847211,-0.5809055405654904,-0.5172033864251433,-0.6799378793591303,-0.49904233666268355,-0.6882409630826752,-0.4300489318122745,-0.5083991076912399,-0.6400928748755819,-0.6481386578434432,-0.020612797198382937,-0.7013539493496355,-0.4748728192517687,-0.3272239111924929,-0.5306587199440667,-0.7068073223235662,-0.6534557720478833,-0.6136979992630298,-0.14588062876710306,-0.26988230196696994,-0.6796892768716036,-0.6294716778014956,-0.5287539150432198,-0.8007334080299232,-0.3675223148074092,-0.26506868274029566,-0.6992579908501958,-0.5443339023356891,-0.6160545588434696,-0.6155292266880942,-0.6489611432854085,-0.5277645471682442,-0.43825653073497334,-0.637108816206764,-1.4632739464559563e-13,-0.4241193050197054,-0.5142623774760451,-0.5817255708549525,-0.6086419722566735,-0.30229918991564614,-0.33977096003248486,-0.5244251081427556,-0.799030215243056,-0.5669927818195979,0.0,-0.36762151158501016,-0.527236012877734,-0.0477019034848396,-0.529755271740922,-0.5177383769483309,-0.34534592274519915,-0.37119674685114634,-0.00025828959455043154,-0.6543942660459966,-0.6368340551318279,-0.47723608365957326,-0.6129686994490637,-0.09914814122537008,-0.26456159821742264,-0.0047268399392709215,-0.6714120964332617,-0.11154539763481852,-0.648784259806185,-0.40698726000161045,-0.40688511869960453,-0.28575143982617096,-0.5426575710273123,-0.2150246731356344,-0.5494599856531992,-0.5766873142386347,-0.6869184669949058,-0.5332708295146394,-0.6647395974648359,-0.5761477982928114,-0.5628817447680665,-0.4911213676971635,-0.5373878443018163,-0.5192658471202513,-0.510869095869629,-0.6704209437366336,-0.6601483488449341,-0.533934145910928,-0.00036376552008743346,-0.5034604867629913,-0.5107620135230061,-0.5007454483902226,-0.6568409523708539,-0.5870560135429368,-0.6214461880090152,-0.916277124830332,-0.20859621969811049,-0.5700567168611945,-0.5484403659203574,-0.6856123931481287,-0.6749610547850167,-0.14052381912163814,-0.3545600431826123,-0.47136757979278243,-0.7443696135009898,-0.641436053562078,-0.4202723115433996,-0.4820216224469658,-0.65407734352142,-0.5054833539051153,-0.6829193705517115,-0.49680925012326593,-0.6958947495135718,-0.6905800855898657,-1.0582068669715994,-0.5210247102999483,-0.5942201502378424,-0.30870122659942645,-0.5682382861988969,-0.4646812384228263,-0.4890809207190584,-0.4696415975885553,-0.44482948618835705,-0.5372184828798431,-0.20748673257930045,-0.5223482783530723,-0.7877415181539725,-0.6256065102935122,-0.4169156305213696,-0.32195817569663976,-0.5790584260179212,-0.5489041353372759,-0.34416937738599246,-0.22547103709239913,-0.5902947705425765,-0.4375078722528572,-0.4366781757793684,-0.5868210611148537,-0.6964435575609135,-0.6353337684661117,-0.4889535827670358,-0.44415942543580034,-0.6100568101487261,-0.5559336909764603,-0.45210008665919443,-0.6144006780877498,-2.270689892447386e-6,-0.48898970643154893,-0.5876228063766402,-0.7238330716740478,-0.5494991434148109,-0.5402127516594117,-0.3758131387185679,-0.6904068048738131,-0.605868925610921,-0.6844360444372707,-0.4694484366109365,-0.001432267174414581,-0.47528869497406084,-0.34390349013665483,-0.5436561007392118,-0.6380980926861746,-0.6104459869241551,-0.49655825097456174,-0.505218084566603,-0.7288501883651123,-0.6078736568747071,-0.6361611797044571,-0.5855955354194224,-0.37832506027183815,-0.644504236528643,-0.7329806772252311,-0.1648009538141737,-0.5904275789151096,-0.4039156810617089,-0.400305491521483,-0.6804748175161389,-0.6172481305639969,-0.544983517105837,-0.6543532887829114,-0.5308517091460675,-0.45055376846976586,-0.4344878551770425,-0.45880439677696294,-0.45669900503630845,-0.4304465192634038,-0.6788588657912452,-0.4390569941722601,-0.588698300574922,-0.3249074458284708,-0.27433290830903756,-0.054670539488371306,-0.5245464425180343,-0.5902510478616054,-0.45190728010192094,-0.7354440558822769,-0.4666664782133245,-0.30880112418600686,-0.05209368964005112,-0.5941584676458807,-0.47369683163658366,-0.4207202104464733,-0.4945497254393203,-0.4370584082626512,-0.04550578845821596,-0.4262166249713865,-0.026326962528770093,-0.46025092612122565,-0.4085681794226442,-0.221515697161416,-0.6531810841078415,-0.5132484512667422,-0.5722136124677171,-0.36723181946611066,-0.4777937340900945,-0.015040973035371885,-0.5298148891441343,-0.7338605016262347,-0.6021969993825866,-0.31350269634477396,-0.5796607925065516,-0.6541109438599644,-0.0036042803683119518,-0.4661008800505112,-0.3226874979508688,-0.6151122995004513,-1.4786838420377535e-11,-0.7018935530845247,-0.24782754615354308,-0.26460003537025983,-0.6338739028092627,-0.33721132020115274,-0.6116614246143068,-0.49429336067505575,-0.6454752245685706,-0.3743629494392756,-0.604527269769534,-0.6104348522347649,-0.5791897572512859,-1.031340723933738e-8,-0.5233042549404889,-0.7289886976712211,-0.6996767127512409,-0.731236937315507,-0.5970109813527044,-0.7526731512507472,-0.12819647057765826,-0.5597322787704293,-0.558070606349692,-0.10441132534199549,-0.11113352577986912,-0.14321335891757814,-0.3915868054633706,-0.6347787585132378,-0.47185246785195945,-0.6021978506171861,-0.4132209316247537,-0.6405184685407268,-0.6750663618491626,-0.650138978181604,-0.5095811336427549,-0.08971024470812772,-0.5591051070116898,-0.4869441889094409,-0.6243425822401087,-0.4968560329819798,-0.6329317792837015,-0.650617156587461,-0.05601610568103477,-0.5253300177083615,-0.3797859204769486,-0.2809083166897185,-0.0005673763079131477,-0.6036020774756853,-0.3970579849774683,-0.7419887696267545,-0.4052679328635115,-0.5742735514461949,-0.5027979372382532,-0.839764113260356,-0.00013408228096645214,-0.7211998456253671,-0.2835095253592735,-0.05357359721687771,-0.5763809465302281,-0.5703068475452114,-0.6149985178276974,-0.34877704930666453,-0.4581550806577993,-0.7597981736241157,-0.5208642599429599,-0.6014281483929671,-0.6116438403119546,-0.0660154646767861,-0.3890121596054769,-0.5789302140165149,-0.641401926189225,-0.17165266630887588,-0.6575790273919672,-0.2519949892933195,-0.5899304911184029,-0.5972224730071203,-0.4070159110901715,-0.4553622748085325,-0.43443892037228393,-0.5981901750786102,-0.3118963836109561,-0.8281415934956009,-0.6659397230428178,-0.061617330525692626,-0.4399207097111814,-0.6358844368535476,-0.7105627003665024,-0.5172443657249577,-0.4896424002535672,-0.7407989588084175,-0.6585387518009911,-0.6140429458180183,-0.6657485665830718,-0.6726770006989126,-0.2380212816411546,-0.5687131255744531,-0.48093718555702436,-0.23803392923505468,-0.42687402525324614,-0.40684216807400553,-0.4880300497708409,-0.12081733353581015,-0.473327072634516,-0.705220230198401,-0.6162843792547374,-0.34663206395851326,-0.6401476149326771,-0.6618565105940949,-0.5457428099520144,-0.8753279058556105,-0.6802556690544866,-0.48425286076363344,-0.485159971685726,-0.5986925973372756,-0.6369603175659672,-0.5025030330569857,-0.5290151351121812,-0.03910928407789471,-0.5117494391441733,-0.030809343321614335,-0.4636114458428745,-0.46667621249160024,-0.7263491956019731,-0.7368724156293354,-0.6830701111918243,-0.3611156643287872,-0.5523276187207065,-0.6152685415165909,-0.5806073065357626,-0.544521404613288,-0.6792468335343874,-0.7127379033093139,-0.6165401888111385,-0.529492487392293,-0.4053537870660365,-0.5780938414087913,-0.17649044369251532,-0.6323935937414498,-0.2438624316116607,-0.44723350474850804,-0.47864966311219515,-0.5333832280959132,-0.2004040060657914,-0.22622992441182443,-0.4123198365013998,-0.5054249774704909,-0.5031885826769591,-0.1960877240730602,-0.5731530958713495,-0.6759002323511902,-0.489756438504284,-0.6248862115241506,-0.7002992854034684,-0.4879949206139958,-0.45701809512806824,-0.2532037178665965,-0.5866653715186877,-0.5506836644660618,-0.5319843448365249,-0.004801698940074872,-0.6934834348984563,-0.3758022208017441,-0.587451173492709,-0.36657375656337865,-0.5188191147983375,-0.7261173572311337,-0.7168597966067811,-0.49532666475132464,-0.40403105040455944,-0.6645628052392393,-0.5915629214295564,-0.56401839626854,-0.03876119305265069,-0.6413336417983733,-0.6295717378163963,-0.5446637396605358,-0.45563941350806564,-0.7775779266933218,-0.3397276615712484,-0.6719222342877296,-0.7050752601864566,-0.6582575739320203,-0.7244178339214238,-0.4395649690316777,-0.006808339041075917,-0.6610810563997478,-0.7093044939455778,-0.5365001168956425,-0.41375159411034995,-0.6573614588929393,-0.556874689076108,-0.600370900879281,-0.6259329327994628,-0.5182054934231975,-0.5723573019741992,-0.5490054350932818,-0.5008710184196745,-0.5262795371755217,-1.2977676516357328,-0.5611113286248148,-0.5310025118553997,-0.3856534479283252,-0.5903461866982368,-0.06965514696617936,-0.4850497481962648,0.0,-0.6941436339967675,-0.3191292626704475,-0.3930517908865794,-0.6057918744508783,-0.5585539463910518,-0.4634078023665265,-0.7021746823256774,-0.009887266803179862,-0.004778287947046156,-0.5259133793004516,-0.4113128841378407,-0.3263036060041811,-0.5662665766628863,-0.5709213277907049,-0.5348261263139404,-0.09917480161998249,-0.6018932323091157,-0.02668519690433291,-0.5794673240178349,-0.5413093063344363,-0.5075906824577023,-0.5790750884458635,-0.5662015481799391,-0.7576493124230994,-0.6524225658530481,-0.6407903027901497,-0.6998561115976586,-0.14413141282484876,-0.44045315995810724,-0.599318650063759,-0.7666826926788671,-0.00040974072812516305,-0.02264929962123674,-0.6665710211231733,-0.6442288808776114,-0.5350898127317338,-0.5980893948850357,-0.516617424793461,-0.3291046276968881,-0.22921901042291137,-0.5816175734376994,-0.7236065746116462,-0.43404971629868677,-0.5492992217076466,-0.7638051089760965,-0.680316110876166,-0.36671042434452206,-0.5122437282817954,-0.6329351063321078,-0.45097933067177043,-1.7409367506837503,-0.4541049786030633,-0.5090325142147896,-0.6623766996416552,-0.12204951876766168,-0.5568386702033714,-0.6271900833584094,-0.47708999724916223,-0.6424187033317367,-0.5513319500578944,-0.33590782720336904,-0.5189086963337585,-0.5541343871467759,-0.5187236893561749,-0.51552486006505,-0.17217574183982087,-0.5336797929587473,-0.00032929328192965457,-0.6461455799095861,-0.44863906364361866,-0.4321340348377943,-0.8185051777663908,-0.4468740109708354,-0.6797450245408005,-0.48821119976880295,-0.09627172324111477,-0.6637184858490317,-0.4846437590382804,-0.4984778609891296,-0.7039988406571981,-0.197205596132623,-0.313750063623991,-0.6009855290902847,-0.5261169677804158,-0.547382405467278,-0.8948155771851292,-0.6213525823741886,-0.7857763977329857,-0.37063755920319624,-0.39426609597555584,-0.4887467656129437,-0.3931550441890031,-0.5352629240487573,-0.6038743121299402,-0.5980865903196712,-1.0324426366632105,-0.45001397303482327,-0.06121440876233386,-0.7677662739202842,-0.46445808892062007,-0.5342317310555291,-0.7174551724860941,-0.6219346921136023,-0.49149736373607733,-0.46095549172032035,-0.7243891180721298,-0.6410846102075417,-0.572657622477155,-0.06779011370034971,-0.6190019218834223,-0.48437968993702984,-0.6361345331650113,-0.561052914635493,-0.48310051753882266,-0.43988655308429303,-0.2740298252729251,-0.5549810219982152,-0.8327170670372939,-0.49319105127339213,-0.64582842544998,-0.6340320544617571,-0.5149162351730783,-0.5294815401806734,-0.6686335351052938,-0.6761370436922958,-0.5924462061750634,-0.6777797911784101,-0.24733702112741118,-0.5156837035821764,-0.5757681316579886,-0.5288853906257417,-0.6306626743431722,-0.5648161131016527,-0.32075538788152863,-0.5392098450534484,-0.08386961116076208,-0.5700032478388686,-0.32194520728211945,-0.6232834605291769,-0.5922945850934112,-0.2594170772956668,-0.6224919735600513,-0.5391049941893737,-0.7276641934560072,-0.7277276604235594,-0.8483526038220653,-0.49657471519217056,-0.4550647076585323,-0.07541483349861278,-0.44434558545918373,-0.30687098011074143,-0.7069274350569542,-0.6732959880785866,-0.06868124759981842,-0.7944980390504816,-0.297518215972726,-0.05075996577994635,-0.41592006565168843,-0.5432429427847691,-0.42017606398202967,-0.5802522308810271,-0.6216737161528557,-0.41727468688317476,-0.7468567331653931,-0.002672057452567045,-0.5086708540417744,-0.6193682398951106,-0.43568753363031754,-0.1704658369206049,-0.3489443642212491,-0.5439111662685858,-0.5431785364648959,-0.07220025382448492,-2.9347596773865448e-6,-0.71370981014455,-1.352182436264803,-0.6082412797118989,-0.4223792614975391,-0.5966784281253235,-0.44403406134659906,-0.654548044517198,-0.14592002620175049,-0.503936443561427,-0.5334971783110602,-0.41404960356471204,-0.6306017663144262,-0.6911737214569033,-0.6483929501164396,-0.6005955282742663,-0.03224844055661613,-0.5786409240188359,-0.044524457760467206,-0.569340088884317,-0.19559459077692065,-0.48711062717730585,-0.4657173544838497,-0.5871087260626363,-0.3123782045962431,-0.49539111371136574,-0.6176290916317673,-0.5859450712325383,-0.4196539244863299,-0.5908961984680302,-0.286348496781782,-0.9096050639238169,-0.7715597200966572,-0.6976220489908749,-0.5676687388796178,-0.5803484224697637,-0.5812044472773542,-0.7118836194232615,-0.7182291166823914,-0.5291536754045062,-0.5549802870402575,-0.5519565688834426,-0.29472405389537504,-0.6853373888593299,-0.5754961026312367,-0.6932672040119087,-0.4245519200034785],"x":[1.1268110006657373,0.46863736608484197,2.8430612128895394,3.2720157218522115,4.842509601723627,3.273766624275919,4.144692727708666,3.328068862105936,0.45835995063521096,3.1659759128919673,0.377404006139358,3.110932302991387,1.3755017256636404,3.680071273197579,2.884626628751957,0.44106046214142824,3.683340218774671,3.990573370508832,2.366274112701341,1.1473035601116166,1.8288567987901538,4.55714664883374,3.7456266477085287,0.9652596300804661,0.3267195984373228,2.4296597664797828,1.1255158529714626,3.4253521111371255,4.955825933706812,0.22909242578048272,2.277903654304425,2.1116042333716356,4.099974493256048,3.246463756376289,3.6616589217825557,1.965824010800038,2.732461794697775,0.9119659625306165,1.7345014454756291,0.3766289008200485,2.634925447539076,1.6500766307709935,0.9531551046810971,4.462376498279264,4.029865783273503,3.687111008672206,1.23941737268078,3.2211830408684095,3.4377650264987647,2.533316713840823,0.1465911317674029,0.09303502154107468,1.0263630428813453,2.8690074124925093,4.505644915644638,1.0359172071886968,0.25942350627926714,2.062942188336941,2.204758588438035,0.1483635322374366,4.729223433168823,1.616943956981488,3.8252058883970443,4.523836759917429,1.2601693590286622,2.7183240292657174,3.6093821908570156,2.6078468040945157,4.839413631871974,4.813452800867354,4.659918465921018,0.41316562502591636,1.469519661132619,2.684202364161914,2.82747189420147,1.6495450980467086,2.3997118214352273,0.5525106332248453,4.188048679886734,4.734337244601314,1.584714174517049,2.48554731006719,0.715754036693278,1.0655335852595338,4.81842062549007,2.2099238781611685,1.9804941705771495,4.662191198499438,0.0976377088127578,4.451938847937948,4.0934462705006425,2.156941778811454,2.926679882978014,3.1249328325279846,1.3804601639384118,2.7416231238581377,4.451272231197948,2.2534534690516606,1.4437014019386885,0.42916494983261666,1.563742525525621,2.4529289482566408,1.1030492047269935,4.41453868302856,3.604339688227509,4.347408289731512,4.2515996351186125,4.806296180758447,1.7959885415132115,0.6532381528711406,3.5915387887172043,4.420830502029371,0.972511822373151,0.17888258247872102,1.4030552405315533,0.4603424740670481,4.155509327237756,0.817017574647837,0.23768403880987554,1.483776329571339,1.931256074684734,1.62591175970916,2.1192117551036005,4.046043921151644,3.838529630841403,4.12419626816769,3.8999254384557966,4.116745887055747,3.926302862924712,0.26189621397543217,0.061765481909106246,2.4735584794591015,1.9537932993252116,1.5799059016512684,4.134321137761544,3.8709178030353195,2.8860117033284283,1.2061000149052792,1.9118345343002807,2.1787837855045167,4.559497518878511,2.860787680991974,4.718038694604991,1.3085318027452841,4.572626927060433,4.757148617701116,1.6518616573825495,3.5271676476563476,3.647547466800524,2.655406398475666,3.100273770683748,0.5643683679123901,2.707502952995422,3.779553859410536,1.3762988299769163,0.04376882765317336,2.9507765573226195,0.6354898512921425,0.5975655359169763,3.4513035886616175,3.4340809159949623,2.557724948459258,3.846554730268288,0.0424955906432678,2.7624323208786894,2.1007816762024847,4.3467485606931096,2.6269704521869897,3.568710024481485,2.2962091868833845,1.6000365447630416,1.3179060763328632,1.667523870326496,3.5237402197831456,4.6827279140485345,1.2355835532979353,2.6588761125038007,3.859181451801117,3.704607627984222,0.9974297516084951,3.5872264740419135,2.1888301271987567,3.4970064462352566,3.335565663227238,1.2032299354260045,1.6288457814003876,4.112362925829938,0.20674022140112158,1.7374829998141228,2.0109974268746242,1.2741885607584236,1.0049453770982486,0.12182872569876935,2.559563139618184,1.6858704713168104,3.137472081512179,1.3086094042013108,3.965193402841123,0.6630729498686772,2.3092331514171347,0.7017571928923105,2.7184961064362065,3.0869115309213937,1.0907910347694272,0.9758782480800232,4.061246220539014,2.271131482424491,3.3252243739373455,1.1076922975940862,4.665552494808951,3.2140933103646976,0.06279293819652643,1.9600967283160042,4.292141317106449,1.578771567339804,4.685131481472158,3.714874561168422,4.4110788111747015,1.3880244199084035,0.46469394751350923,1.8760770282749861,3.051404342099758,2.4296902082826644,2.347145329044743,3.8337583264994746,2.271725047488027,0.1849216209059923,3.1445872051001467,1.9609679510662803,0.23148372241096227,1.4568227558455071,1.3754436720490626,4.031472917957991,3.730268858887519,2.218368183613433,3.255077145894665,2.15452184132761,1.8764291388169574,0.3669995612907251,3.642311333924273,2.5877992134841,1.2707233318656574,3.6468778087841236,4.130808685729928,3.603774878752708,1.0090545961996122,3.0386895943410694,2.4067170927950743,3.7910523553033326,3.429763712905489,4.467725415893887,4.449301835788058,1.7710535598780575,2.963225133516443,0.16882099212808588,2.9132850700296533,2.1573689117115,0.37381620254459236,2.7195749249513645,3.7313048845114682,3.145267730769846,4.797041657312976,1.0542615688212464,0.6335258691707302,0.8089330558400354,1.8541490623593104,2.2651301768883325,4.56179045076737,2.6566899706327938,2.2630278011138127,1.2730485290906413,2.4354877060945377,2.5428617805962874,2.3742563343336376,0.7702787526097721,3.9746068032128044,4.028182778872386,2.7886375631655005,2.8391518514310987,4.60841024016209,0.28241932402655157,2.2747664709013216,2.0317168068060387,4.227552096059953,2.6524196624966025,4.57693752455136,1.3926124051742617,3.1893372508325335,0.8160702840876244,2.5950893959756183,4.124353847895853,4.71795500241538,0.19731523530398754,4.8774592447577,3.3823641124239945,4.014835535023018,3.3043433202898287,3.7277845308045943,2.424127816606222,4.447917156624996,4.331188364650895,4.839838419253926,4.251626658084893,0.5702375671567217,0.7269308163883614,3.362512636601523,2.191116108002227,4.159970998699815,0.25243792792355335,0.7176793802026638,1.6952160238370528,1.378557095063151,0.26150826065173716,1.040096574570396,2.745945879121657,4.022258044112411,1.240790376568378,0.02308116490293388,0.5487374592835059,4.949840009814896,1.8209256339772761,2.494105805643556,4.409875203709067,3.92119328872277,0.2416292532797759,1.3758315595997272,0.4034953495018889,2.154550753794794,1.4409616842450612,3.3558811835258373,0.23675196870678206,4.722233819481807,4.521456445781064,4.26522500527331,2.6206307290213324,3.0206522041852746,2.2045898955101793,3.824612469844666,2.041152234246162,0.5302297114076371,2.420114374810367,1.0902748458577294,4.104962961387322,1.6081756264402847,4.353419413710347,3.3551427357987498,4.768464330743064,3.450919963779524,4.97923905032523,2.868912053767879,4.192349391810682,2.8615255180513763,3.999657450890841,0.929721833014383,2.519208903729372,2.3762419185046966,3.926359725675901,0.5380868797427285,4.055389206730863,0.08645660585638315,2.251127666154973,0.7528815805053268,1.6109496157440228,0.6930006138224831,2.609604601332954,0.4824263098668846,3.6397808095414543,4.273728742155736,4.1082434442050015,0.7586530382190493,0.5272400054663573,2.0015694709889,4.294611636423186,3.661948006365324,0.5538981922490926,1.4272668194468574,3.5281220091185563,0.3657024830217881,4.993684506640391,4.602019680322346,0.5689802761103602,3.6342457118664138,1.94074987106027,1.6161364444057003,1.6444961601328012,4.7057140200767,2.322760998298147,1.9257806739133565,0.6392904640006158,3.0177813622165695,3.4327418190614556,2.592764585885381,1.8196093709542438,4.5613331577211245,4.4729838318334085,4.714487404017689,0.1938739638943754,2.939805035500589,4.956438498944539,2.411003063015904,3.9180101545074297,4.256910462963827,4.373474645542888,0.9136191018429252,4.355292070369393,4.377562723728867,4.719911907243791,0.7000405780885965,1.8576424822013216,3.613186964640467,1.7236560127083755,2.7761125448681714,2.963950988264693,4.611284678069239,0.9175603691889955,4.893176887718794,1.3750817145576455,4.852535596773068,4.890731891268149,3.456482262475191,3.587285716417241,4.728560872554414,3.4869542570592706,2.5736623197374775,0.07510959569818176,3.8122953590344757,1.0884308462569336,2.436654986166298,2.382938420849514,4.6098576759656895,2.7911549316202966,1.4713697230290212,3.4056682456569787,1.138054342451491,0.7615106403265759,0.6927305928687022,1.8165246848064165,2.48060088587465,4.813335877328755,4.995539070315836,0.5625227881577277,2.6191420208681415,1.7124161546804528,0.6319620483929533,3.6321838725445166,1.886575744629555,2.9991504367104973,1.0853736007674997,0.6858369821157484,3.2915525652268807,2.389409309125632,4.76503028969916,0.38639783811773243,1.8134029320835565,4.35983583569117,4.522138491686381,1.6469238521858443,1.1970697688416077,0.5561149998869308,1.614330873294254,0.18401812533803352,0.3801716769685215,0.025172782313875874,2.2991617861259286,1.4813437340531255,3.8129376624571942,1.6112999675901951,4.918568078123936,4.999708885669519,4.2756521319317375,2.2391959913386317,1.2515981237923235,4.264551457240926,3.990693966172075,0.03854940898209702,0.12550165408444225,2.616787352148855,3.73056538408413,2.1346600309394437,3.349201383304863,1.562067428047511,3.725256703441313,1.601952958266205,4.478548919914687,3.643310566287885,3.269787154977608,0.6856116587580441,0.9770548647693522,4.808618054935836,4.268473374680997,1.5890955185096967,1.3808722051598288,4.697748900949264,2.2641096982696207,4.025535345308944,1.119664826330704,1.8076434272265973,0.42504423624382115,3.958254758111538,4.389190085158158,4.891995715479357,1.0030037378161627,1.5557288237580713,0.17275658877447975,4.502311365264987,4.358603086834528,4.078267804996015,2.151207256708293,3.6494262710422154,0.9956602757440314,0.9037103381346145,3.8110102160024626,4.366327041282185,0.0731931008738751,1.9355308679778171,0.7386422866009168,2.4713601798032636,4.728232030552681,0.6001800938694957,0.355413301414621,4.664151506304595,2.6684756718966818,2.33816529303588,0.7653640458179989,0.4351465917655717,1.7762598451150613,2.336772976347943,1.054286790272403,2.722178531541346,3.9589373049849073,4.368899581316183,4.797241201524321,3.7941811358332824,3.3570572435238244,0.8521087408669104,3.1928409445575223,1.8642490603364947,1.4639143312794867,4.885934903966815,4.127855338311809,3.4081215458763445,2.760821769590911,2.5100375602733003,0.2212970705493078,3.628218826272056,4.602682341495699,4.6062942734270385,2.915952632883372,3.0359245068700034,4.566450067282761,3.370257637081433,1.1415178425898198,4.61377616484309,2.7287995762806516,4.0764472508174805,4.11344889103707,2.244571696097424,4.2322522865222245,0.5807504418761378,4.845986766778116,3.4032906395050433,4.80916471798825,1.3664727712739122,2.5938910329805767,3.092980182386028,0.19828903887219362,2.6069786186196184,3.456779724025191,2.42979379051485,0.6219440778950924,3.9633963072366507,3.004639079418341,4.771351809293607,0.9603443266075762,4.992598184663154,0.6358795642244852,2.6800965665967933,2.0051746431818063,2.1259996455166696,3.833543763766908,1.9628794035278507,4.114691601959271,1.2167400970820386,3.8842826493981084,2.3184775362513435,2.3021718736592156,2.3106326350962103,3.4673708517424497,2.3108593424249593,0.10531507923034589,0.8620789820440522,0.12885040866933428,1.6090348944415311,0.11632700863198342,4.623240231651721,3.742940255906597,4.043830413067331,1.9763599730891557,4.018443672347589,4.860367236978092,3.207167883201495,1.8738568973907832,4.619366478913064,2.010317313082326,2.9949766282037027,1.8138710358951482,0.5352828627235606,1.3517511658720616,4.29760196170272,3.2937017924638368,3.236312441575442,4.783553669620306,1.1721406728386885,3.1914704264168794,1.0964383453412463,1.4338282629617816,1.547063736106452,4.4518348284523634,4.961493573595487,1.7271655109600548,2.048019294959408,2.540080509596614,3.9960327655907024,0.0445501031805029,4.328141612161253,1.179547797692705,1.6226680421737483,0.34665841324039603,2.256039307115972,0.545651918397565,2.66023753148216,4.444671450426677,1.9076887323202685,1.4021671313632489,1.6682988407550337,2.1234668206852425,2.8324293636970466,0.4582587748852629,2.2520452643165534,2.802736412976834,1.9684693593027536,1.1238994625773269,3.6045903441641536,2.040696886132778,1.8025158591306867,3.3712257845037485,1.329213713255848,2.967268218027257,2.1724517710269686,1.2091099563574537,4.319451224319872,2.8498058780109705,4.236308695573245,1.31003231767442,4.40476220822646,0.6317491536559305,1.2218675503872611,4.364064815032411,4.327329883367543,1.4915876994995658,0.27628430032650253,4.495130495009927,4.738330322570049,0.20705729004091733,1.2082277850331147,1.5982087510317233,1.2413275237285248,0.8784790824132571,2.0613416444696275,1.0738200298850398,1.1822507525304582,4.139627153691809,4.803649922529365,4.580953835859459,4.195689071692308,4.948952297285086,1.4506493583375846,0.44854980845775994,0.3655415522115968,3.8098224978180797,1.0292653982486166,1.2469435079280822,2.398687974730749,0.012839235682480243,0.9745314873083544,2.3390980032014417,3.9280784711964536,2.2955149584551826,0.7231416211337238,4.39486140831405,4.09493104147391,4.1065793161533195,3.0224603460694723,2.9865535162171843,2.3442263165039376,3.2703990775759504,0.19885521050120092,0.6059523158666968,0.38719126172154894,4.7219995615978485,3.2047129135126773,1.657709189484724,3.010727445301691,3.68940336611818,0.7701347955856019,0.32573600650865786,1.4451234720489325,0.6214860317086002,3.0525123643208927,3.3881400265964725,4.005350416275015,1.294281577283195,1.9466037793903512,4.498343785915,3.0163740630585147,2.8152995668827763,3.7670137425671246,4.550333419205755,3.357671212592238,2.5718096466321883,4.0861729241566245,3.4125327812118034,3.0072211803807267,0.8476568768664416,4.990191746948361,1.9747856249129803,0.7745780144386916,1.8065314199392202,2.7814276274646477,3.275153701784008,2.0432759075037046,2.853694046303883,2.1675609048922393,3.986973247187542,0.23164684003738056,2.7689549066198493,2.5692431327623364,3.2301319954528873,4.290590459466042,0.3348420076180736,0.7161889943599786,3.4873751707114775,4.943272454950708,0.4857647937605847,0.7837507510821251,2.1947496390810786,4.261357347863671,1.2985243830941873,1.136124129142121,3.253410569989801,4.84960158092124,0.188727139404139,4.683467938293932,0.5863136038803718,0.4329816768596162,0.8305441633864774,0.1517873516157553,2.8073824773352083,4.215718624574855,0.7058358046442936,0.46870883802228813,1.330856081458387,2.653173551933384,0.9355732953319018,3.2449178976429396,1.5131096996741766,0.898848489501729,2.9839552761518706,2.4505159340527083,1.8414293048952068,2.773272138375872,2.48532741619509,0.4513997072967546,3.1666425168266965,2.0971584537752355,4.045099807692626,1.139740558292227,4.688600330415788,0.8029021017873816,2.7115167640743287,0.14008654291700173,2.223440077941945,1.6906878781350854,2.694477805064579,2.4526440935339777,3.084476951842434,0.40409318813586004,2.8256650525262703,1.6651672815966223,2.5597285771474043,3.766771053623519,2.540001253723736,2.6081345386577013,2.826837591792483,1.4852481144314045,4.031095980748349,2.6584603791881967,3.3009015275257503,2.079622047283828,3.0744221052227028,0.845971970341377,1.5062456757326748,2.466487846665597,0.4591963074118022,1.1384351937996984,1.7239094428664403,0.44346755859891895,2.0522605885094825,3.680348865739523,1.7023118331441522,0.0575830294833668,3.7795549442866117,4.012132823637623,1.3206801286947079,1.105956103629584,3.6909366600476967,2.4953339518174324,2.9635372811979654,3.7925740417140172,4.027314806645718,1.1678245227560147,0.3234061951105349,3.417032635454217,3.721130871992152,0.14287053364071434,1.038036324488758,4.834986351860641,3.7089204879748094,1.3007065003813278,4.462380846112248,0.8834057607125145,4.868176979052801,3.002332892789875,0.4451069306451072,2.8617489081873684,3.4829842404207634,0.5500807161992594,4.945964209032972,1.3122790120454564,3.0664498563578513,4.6950320700220685,1.7128003562236693,2.26895846395386,1.3730248872616924,3.8927644585632426,3.309162844220428,2.7692660280993175,3.2877115845551472,1.3937877529606024,3.913478664243363,4.0187283900866415,0.11611643598730348,4.356467418587371,0.7305039490366461,4.524355296426746,4.834445846373122,1.3332648019479276,4.463710065804618,4.377347764942217,0.2139636744626905,4.104708711877409,4.100701003462214,0.7355647021829492,2.09693606144722,0.9942771374401316,0.21487200761976188,1.9263124205389326,0.2876318554907964,4.5957223041046324,4.22665425867388,2.2271599646146587,3.7144721769072673,2.3626068566329295,2.4749551056910457,2.5820270053151253,0.28121624746484275,4.439790956149575,3.7315164171705018,0.4047121168127643,3.394271019631213,1.3906346490869148,0.02710619432794048,2.1016346944568856,0.6203724730810067,2.8003638685175902,0.08417915756768313,1.4582261268120456,1.4014656454933383,1.5686794737279874,1.9404536389227522,1.914334703565136,1.1749428556876518,3.550352461605908,4.326005014502363,0.9212349706266509,1.8031898017129466,2.264943994017038,0.0499338288258222,2.549166896888624,0.6732230350352375,1.809479640752203,4.7381094726985875,1.6748103044023566,1.0583406713886367,0.7728537063086205,2.4982742001356906,0.45098508011324534,4.958249369804843,3.742823007285432,1.6705154227465713,3.713321821884551,1.4710979600661889,2.704209956745239,3.8207170852221584,3.7664561553298093,2.1506918032541558,2.8539977829184657,3.2145354582357144,1.014806320354592,0.2960045111837839,4.90861257121805,1.5596166461925542,3.8621916793685704,0.2372620388949176,0.19082109302421268,0.33969416524664897,3.599919075410365,4.456046118691321,3.614863741981087,2.669178352053624,3.3280699105430465,0.06743258444751099,1.1744533099429055,3.106380285922624,0.7817660180100305,4.103580914093406,4.838140370778059,2.7176316199241946,2.4474450528044436,4.4807105905039455,2.81906202173397,2.0397486813805843,4.66091891137547,0.6835260566569024,3.0609424841097232,4.56462594104563,2.028029648346845,3.8094359968389755,3.816000730062922,4.861936158260968,1.522586605176004,2.6983707407323507,2.7936613323348025,2.570356400994159,0.17908894298165667,0.09745723822332297,1.6393168859398566,4.263074063893811,1.5560833212894065,3.1076380005962867,1.6389329552815335,4.51203270025167,3.630481184235302,4.023100234152698,4.862899933903151,1.3570384772941846,0.7938781407893514,1.7831844225341398,2.1127929115880804,4.156325405080072,2.27476903781781,3.6622321583244597,2.9896648268419224,1.7748777523480008,2.302889793699454,0.9013649739993546,2.4138568625889043,4.806445128566921,2.249451795711279,1.3002997438318353,1.029664793252416,2.224241161341036,2.647836471393963,0.917052422763035,0.331274665463529,0.3560936636416856,0.41836145566111815,1.9672215776899882,3.046332907154886,1.2122940755894052,0.4091588274254032,0.12847419509179558,3.3205736448642478,0.9986871688761623,2.21882464679517,4.643956668043096,0.7821307184221682,1.5310207073224802,0.002436738638438296,1.684875291354595],"b":[0.4109557836847655,10.17344046065832,15.009825583653287,14.521530823640028,7.334057470645221,15.168455800944383,9.061362229542462,2.502122982240258,7.330709889239495,3.0499011671644283,0.8907118988397045,11.117375073188214,13.445016412402806,4.1902671475919995,11.315315836254687,17.181630773950616,6.551885205287484,6.713734658615262,15.89192597065943,18.162364163705526,17.256474163107146,19.529184726997435,1.2359852989609577,5.7645024327033845,13.774151045395149,14.471649681002837,12.143905334696488,7.476889354308618,14.178097491330766,7.058624245131244,12.76715336327892,4.567086700184593,4.986632455612741,12.122514365522958,15.08061740968862,5.006806911162132,5.505488318918008,13.521642968657739,17.44215495391213,0.26730516520675707,18.460920265427006,1.299971674892677,7.050857108023871,18.179435822465084,18.736806817964094,12.212994435329062,2.528862976768913,13.508972908960821,7.113505073545379,19.93021855391121,7.809264844227144,19.607558234952712,1.3367939855472377,11.603498517805129,9.536551351237659,18.82963169806372,13.161942291576967,6.046681283010704,6.702377552111516,16.02934194574109,14.138759573783176,17.040226290082398,7.299188689768736,17.36848833280103,7.445465970158183,10.7671026914579,3.6684783632419515,5.845381371491025,9.618506142582524,11.268447258885775,4.7792458546767325,15.781249147676725,16.79467017892565,3.945807195397988,7.124687762976913,6.446228908331895,10.31317017293988,18.138109104061794,6.865013740119705,9.543538043542451,4.368127043289531,4.347140484450165,2.7360172955485806,1.3645192611043466,12.270413573986186,3.2226153430676074,7.577746627456219,17.044810677919635,15.348115484315862,8.429556222566688,11.712159153266164,18.663243430499257,2.3681787874316207,15.800784580469326,10.552229000516924,9.96264594952899,4.4290740744373025,15.4939959918958,15.357162285998122,19.242646750299976,13.073660560169484,5.636942880600979,17.13520109782508,18.082672506156303,12.69377610247814,3.66483347086513,8.904620857934397,17.203746185122377,15.289478102568284,0.27607713747084706,2.7504267560288165,9.67828524659295,9.099301261274992,6.537654650711158,6.83635201190123,9.47892870354076,1.2004958249777031,16.507477836052896,0.4412172482045351,18.567409056330376,18.0400418200096,11.007592391740557,8.044386709919333,16.413372068802524,19.864679094744183,2.552436078948257,19.943015001111274,6.352641740831535,18.237752777393958,1.0222024919799422,19.276737114326565,1.8871283797114957,8.036809003502379,9.802024036432112,1.6991660117523955,12.269157077171435,10.002290712359056,5.900542913289546,8.530440316101572,16.04757013493988,15.053095032301762,17.224141187847163,1.8406347142606627,8.420601031145608,4.6058852237000325,9.37975417373993,18.597539574282624,3.0090456854831693,1.2602128217598185,14.29418763029695,8.745544232691348,19.08273150352005,1.9991619308028596,18.14302524506013,17.96688355460754,12.412296918357285,4.284319641718914,3.3124541042168287,13.769919274835862,17.930418121563925,1.4802094072630378,16.63227752079347,13.934682767733651,10.89575398810672,18.486860425612303,19.8672607246591,13.870153652915395,2.628376648108719,6.187889703901415,4.694451620289306,18.04287373685217,1.3227082659041445,11.985554541478344,9.81755112130909,12.228627473086,11.57026289626855,3.8794706343670304,14.458815563815026,2.131435839430047,13.167429186555024,8.73485265066547,8.799340173585186,7.109022248523287,1.792563308404751,16.726363983234677,11.762224595956612,6.914666654587571,11.843995248269659,15.6226266050564,19.482024106651874,10.031103557182002,8.69783372736161,19.316671050552053,8.976396855890915,18.648040794471203,10.969415785789849,4.574623911105622,9.453727201054152,5.506119634940658,15.696955857736565,16.594909475848638,9.241049896164988,17.004504561774397,16.132230841514264,16.385248807662208,15.442600600946928,6.96916192264593,17.932734686182744,13.569195445108072,4.345709429284028,16.31857613264873,14.870232649620686,18.402106615787165,0.6424084347043824,0.5459320985288985,3.39249416116564,5.151574803190013,15.441786828447226,19.203975295922735,14.081350495051916,6.645587828739403,13.631799899645006,0.4029814352567307,14.826267349743908,13.249790731626504,11.508337673201034,1.2667127758899666,16.70314951561486,7.143298115372216,10.981561097230088,18.964161578683154,6.03136212701008,18.744342193250585,14.167712890022939,3.5066873430694168,6.514552503926847,7.680921524046211,7.124930256094197,15.826374447980594,19.682149329409967,8.810928189169775,7.138684741397556,3.500635994040433,5.499036272360476,2.3857157862305645,9.683734608018355,5.930056384952156,3.2552016323257105,3.3575829509141997,12.595971485699096,1.6799575406826817,9.874210748699728,8.615408173352863,6.779504664141811,5.461430610452793,3.96786092589132,9.631793111418494,18.38117154511638,14.86398326170567,18.73283451233872,14.559630725636952,19.772929001019484,14.781520964619599,18.064484449409242,5.997191372736954,18.45601144899131,16.187005917733085,1.7742019481141957,9.077642975329043,19.205057518817842,4.827762777160038,5.855678719395931,7.479755984117005,9.483767154317047,11.342355294609888,16.56656776837947,15.490936957433124,13.902516338232939,11.854125870336336,6.896235899732055,5.782279197884801,19.706378415286153,11.130384853662555,13.811155686938408,14.158643260118682,11.391271007587944,16.734564289705162,16.253290717501034,15.179648532917485,7.265906681430283,6.2311392054144354,18.333266747989686,3.330343564468441,1.8454956860199356,17.089932420062212,3.7717389848997263,5.997489421703555,11.540995099981743,4.645708363463865,18.760476776417633,14.301693628583788,12.535774735237556,18.693574906175115,10.411402362215627,14.557612096863792,18.451295112763752,3.2304915539621826,5.071620085473896,12.282902262785305,5.838055210982911,8.083521996284695,5.384082039447238,19.958523911249774,2.3130032867261363,4.332853090598547,18.698674749252085,9.908626144611873,10.831653895581645,19.357830763686714,16.053001194124704,11.205833492168527,13.703925989677042,7.550797641743494,5.72200481158136,12.211735465457378,14.654358468555507,19.570978974802152,13.043732893203819,15.394401880891264,5.336005665092394,5.764251991630531,8.191017323936332,16.92387389991906,2.1650503406497856,10.23824793226876,7.9778409035042275,7.363983575480555,9.312832901466042,15.04916593071317,19.037206855277567,3.693134890825771,16.578096809633166,19.82907100583697,2.349876956031185,9.258874723225006,1.1641022990551209,0.710391017260914,2.0014872652899163,13.015633570297007,17.06763653239872,4.651224000996148,2.3702030965218412,18.59741041361086,18.425055365994343,8.89760764891047,14.587688029039537,15.428480141031642,13.474190243366802,14.853630559710922,11.910375854831873,5.03161843298138,2.795220674283403,14.083365651598108,7.101360530756042,0.6689243950876067,8.48557948699256,10.653366623046825,7.077732847309406,19.491057403188673,16.86824752160774,1.9668934937212779,16.39375428971166,2.5372594217609024,3.6617344969528087,11.935712059764839,13.489717755168126,17.79568218805646,5.052861975055656,8.908634342106133,4.92834845435695,18.71486715608992,18.89810000617028,14.049756677821819,8.879071274287451,19.256736776198643,18.871093954237207,4.877557645392683,19.149971959513596,0.015475064356693657,7.175352054327271,14.711437590388421,18.593015100191998,13.101595358973256,6.300477246319329,7.768145637091117,18.789826428887707,2.9914735412800164,15.399698628024495,0.016831745771090922,4.338767683517464,18.24646646834986,1.7399428387870008,19.78120457549737,1.8918711892649709,7.471070117613552,7.526885858760077,0.6026400597476567,12.831780731455748,16.132736992173356,10.72208638472203,14.296488950887234,1.1868587100070327,3.726640090437514,0.8032978879887143,10.139955984629928,2.797083200671766,18.12450875691995,11.67720050392155,10.70162998097135,3.5648580103639427,14.667314500799922,4.728781928774217,17.824627274953663,13.56385314914871,7.210672466537291,19.68879418136055,13.995610423825632,13.634749550422587,11.2372921336441,17.129159919556436,14.125462872993136,3.725546572436622,11.8132673171846,19.44348126806219,11.153662481786712,2.6030473422218225,0.1977194865911569,8.16549035944211,19.351681464428086,16.93684411403341,10.74461442450621,16.201765384847604,17.047080754883048,1.4492190240109748,3.4335939697925655,13.001813732695267,13.95536387240691,11.651713683036391,18.35387260566577,2.214784465841584,3.7068484831265236,14.88637590555129,10.247877976350592,14.996810927064192,9.207132877903671,13.226228016382397,18.821945617675198,2.7052662758800228,11.577295319410169,3.482058163077424,17.3751983133968,9.884377677608063,2.0919028478898793,9.789482908792602,12.225548817495472,4.803758035393195,9.11050779257462,14.330425210564503,16.05804714593413,14.821009748259776,5.398308026991221,5.691846238072107,3.9385894551007627,17.38586459191252,2.39116303826163,0.9569290377979289,5.125194533935202,5.621118083471579,9.472262634222265,17.226094868069236,1.7174704814398556,3.9550911421580492,9.846066188682148,10.674260623109948,9.04447178857962,19.505498042026556,0.22022433710467748,13.324832194467886,18.254998260729923,12.78072908980517,16.99231788614164,6.922183487063136,12.201020929427656,16.521937866156247,0.31470846881121783,4.124023711868907,11.940956044784734,17.942742762735865,17.962838363082408,19.01187946025265,9.289515085588818,8.603430337936611,7.996509583810472,18.584445577111634,14.253577769956802,0.5783683066614698,11.547391937472643,2.949942978446929,17.83241080377579,16.042728842280354,8.335655879932533,13.169734872687267,16.388070830871694,19.589736339245526,18.47351612348936,7.272017027417839,12.54573146558442,8.903761419363626,11.646130258815734,13.743092068578457,3.69448021077583,18.40612660779354,5.412431034056251,1.3296519844056576,10.441484421205804,10.447473512089797,8.178593277634313,5.221947736036743,11.625979926150158,9.658107408360603,10.575503972109317,14.519286502813106,11.686187263471904,9.371805954970078,15.539426076845038,8.154309573738558,8.35188804543732,1.47005297966738,5.98734884877719,1.523087376539416,13.079931202868739,19.49201786625587,6.0313680114987855,9.161042487304641,10.179678872688221,6.388312529991729,1.8489982453004483,19.43374984504343,9.405820753197457,11.79390921693491,12.066251682628524,1.215487707359122,1.6807669576188333,7.286654525930727,1.3427963358221229,11.190036044757473,3.885310037384535,3.8897550542986536,11.836677649897048,19.937653214232697,18.942227728666666,8.003533082192028,4.198805048171228,0.6154798768449465,14.621748282155632,9.258487455319276,19.956039621462974,5.357277536429388,15.333807044688186,10.61630223417449,0.7413532464434125,7.676450988191941,6.770404049024901,5.075725212090654,0.18186774393860627,16.397087291147187,2.343057190239599,1.9665989491157232,19.287968659436903,5.806227090928036,13.958551876666174,13.493075655538465,10.561285589004154,7.06501206865946,19.327184965791812,19.643553545294132,11.172155149428665,0.19558072963991702,10.04712709029044,16.891885955262055,14.293871261413313,11.979209626149213,7.5182456396261355,5.5588010261416265,2.54589494835749,19.68054429911389,19.755880874055556,1.0439048848316457,2.061872551728978,3.283062474572498,6.45018426112415,15.369102131804295,13.485953460418072,14.662586558866316,6.20197233985786,16.21123963107094,16.94672480175667,16.03242505334942,17.022609231864845,1.526320230539584,16.91296442103702,18.129156851529817,10.360396968391905,10.355324853181017,12.985686612363994,18.862100268193554,0.3677247636344916,19.539344969497378,10.493602333426747,1.7608753162999147,0.17715971655375196,16.630706165402355,7.513509133001648,11.568911560067171,10.334713633636557,2.9690628525981433,2.92354924765196,3.5982746969346513,0.23388674768402673,9.519090000217748,2.4563852102261974,1.634173160685508,13.462727530333417,7.480855153452648,17.10773234628933,3.546507330398252,6.604690215215121,7.4331937350397315,9.148692261187277,18.100796408819264,14.4388736789417,0.4356688299586198,6.258794801822045,15.245138777998012,18.432131834352077,2.3248308468543266,18.282437275202554,3.0113715045699774,17.88784175409583,8.039802471711347,10.005655392463876,8.160197556136065,9.383653022850872,8.23795281160499,6.426145919450321,2.280134890469472,19.752551574225524,1.8787438742980145,12.558849738673654,11.12758954938926,18.784758559739277,17.68467592328917,18.115521412260065,9.265878735151748,17.347796790568445,18.307012292110635,15.791334959658743,18.75912889770307,1.6968226035678136,4.963039362516981,1.5662792292770256,4.0421375107128155,12.441658527650791,9.049671069083264,13.291778111819209,3.1385507428160064,4.959319378689955,19.177065532301857,3.484707413333421,6.420943728258419,1.3135228745160488,18.42751000943128,13.626880354302235,1.7996123405135878,11.466993483938888,6.407752440530974,14.462788000194093,18.782827677786745,8.727667429043628,15.421891571562512,18.279489836563588,1.3423441298408267,12.614563977961883,1.0076233099998344,5.188096118648251,10.113376835577629,17.2395661649888,5.2435140197794405,15.677714110175046,9.02746577912434,15.627647512131855,16.862302211128547,17.33995364465109,18.51059790164433,8.288027267558466,9.562048097196731,7.151057879885503,2.8468390326055992,6.857507306844792,19.703590998745977,2.8276095805016244,11.651701796687327,2.2299398584177332,12.267163889531108,7.858925190047259,10.689863643737008,3.1586924533724225,4.052833019894364,7.330736939592435,9.42365030666207,16.26086878683669,2.437197054369613,18.141147259586244,19.18951534145905,19.196280182335595,18.91479585469497,19.839567654150123,6.384528737999355,6.955173592009736,3.5976161832268305,8.901311385104806,15.476152580185886,6.5848787884295,0.7826484003599932,6.845253505217257,5.6895894153199045,19.821477879184638,5.730342541114473,18.41520547276953,12.784264123823622,11.680083659531189,12.116863157097155,10.026857971954017,12.053183322423138,1.296694889337795,14.211634723916955,1.5675695032749726,15.52130783505055,12.683987233670507,17.831405400872082,14.631309471685515,2.703842617853258,7.769844450876895,15.569864927677939,9.354920124827398,11.186804043952513,7.633513552349673,6.245574867086789,0.7495854742808961,19.54446053294989,6.795701258250846,4.9809516511091045,5.522442555982279,18.0366603180515,15.392518195874253,5.050204430207175,6.18536217085496,13.166555252048017,16.11323898454495,8.03563805463841,7.756464754629406,11.288091333413103,0.41538049062530114,17.320422380069097,8.040205805812718,8.556004574205334,6.008341306210245,1.980443224532138,0.7950477853177285,0.01880435075726883,6.861937128258733,2.7039065736532475,3.4114112899933113,18.611745372653953,11.808376330965062,9.752313185328711,17.874050966938647,0.5985543458808662,0.20202221665279296,9.930250652203657,7.141533011864127,3.4720628863964187,11.869346477388323,17.159106802592127,3.756212600632325,2.0260190101782927,19.60768087196807,0.8569625010967119,8.418095266453713,13.017448805775693,3.544195910660437,7.453878611160274,11.545608056035137,3.782159809812695,12.39520390415112,13.32218575628167,19.27281425818436,1.4689443967169247,10.041506385713692,13.850685107363375,10.083456418039418,0.4067166174455794,1.049928285715982,18.66780181971699,11.703866491664963,18.93790987756971,16.474013687223966,9.46081561704288,6.393089980215532,3.7707389593078267,5.821847085314169,18.708942663525164,7.213512492748735,16.623518524009647,6.969148173551956,13.718177769259107,7.918060891016636,13.381350133893083,11.755448692393315,12.522133175572105,0.025839522882167287,15.142564114040148,9.247307760682482,7.972190795655525,1.6471837531182265,16.585063076487767,5.427273430170971,15.086132409505417,12.821913151163749,15.617504961385071,7.963219720010253,6.860589511221495,11.870241780064038,5.731961115194566,16.399921260563687,2.610109677688488,11.68383733246329,0.3823965238546645,19.87370597953989,9.74194431469073,8.635170290342952,4.4078325483314496,11.624814359694176,16.54031400367675,17.527944535543764,2.563759577279896,17.95026707762888,15.919048264958281,15.931108974819272,17.77290119178549,3.6412509728804476,5.514604741582159,4.798051649143478,7.956139686875692,4.088807466481992,1.8823598145113385,15.590019616378218,6.657180229553479,7.672557223790397,9.108445973183752,5.806839946355837,8.421991494718192,12.33359207654242,18.978808171297725,17.156943771539947,0.7382667490721673,13.002990407802528,1.578627045366967,3.693970550734562,8.750161960717385,3.7652860231554097,16.173174457457677,14.769026189959531,0.947510659391293,8.126562525997269,18.555944083638543,9.38923906501035,7.54607720967019,0.7027528786331549,16.63180879118532,6.675841444770398,10.872866595341936,19.82102102451616,14.513336267637133,2.4560511017931352,2.2746083335515532,9.478970400362673,6.046930448297672,9.315993370690684,10.248405600574815,14.283611996231391,18.26734217996965,5.085904189518247,19.042385663336404,18.55834945942492,16.40908009303834,10.156976417783618,5.539490663551931,16.092781626295892,12.282354310942969,14.591947870048605,19.37856284344969,13.946922461748539,5.679418821467941,17.07144699053543,0.7821143295456601,13.263907132812172,4.645499475385302,8.94096299811662,1.6232802358261944,5.853034334888205,15.715833602748791,19.050153635346017,16.516901254226497,13.79910174344641,3.4014100133489222,13.748248158300092,13.744728540683706,1.6718549510534464,6.821465809691514,3.7983647851375757,2.903585036724352,19.527212128165715,1.2639607491628135,0.7733512053130154,4.837356006243607,1.884933899503265,5.424486151871966,13.613563638714883,11.466313231826192,17.032621821818303,16.89553054629391,11.193655371120364,3.517396491809679,0.4985026068853049,17.346621930087096,15.34559580403923,10.556490212433847,3.1352079968780577,8.519583095489388,6.645828487161194,14.009897016354408,1.410102147659531,0.15799743147576706,9.695235376149167,0.4895100300080335,8.628418936834148,11.301541161117541,12.144849237050481,7.776420974012197,17.79574731279743,3.3957625139600323,11.46838224445359,18.118954510536113,12.34141896102595,14.862554574413913,7.835453115923072,18.025144358039693,14.41879341023827,1.3834390261207163,13.59611911215238,1.4350092488757404,16.702479831468896,1.1841171400357497,5.736932312812257,0.5570806212660173,18.72497504814245,7.0788838781907115,5.926821391277328,11.6193703095926,7.046741709680346,3.4666188645511298,16.65586060374485,0.24610728884953303,2.779646137974403,4.639359206130003,18.99918450813926,12.704645637831131,17.400219206002355,9.160060591223864,14.97116410230253,8.939574564510417,15.778939068638778,4.63782906261923,11.037821752626487,5.881925176199472,8.79002055928944,6.339251566053243,5.1212861326647285,1.9736628542150703],"mu":[0.22314437018367883,0.8293354414262726,0.0050841055177153205,0.3976903928342057,0.7840766152411973,0.5430570940846442,0.6142388961444525,0.23371755069836042,0.9740366528778701,0.05130396513583779,0.3385220686208483,0.5224625588709222,0.9610712118871432,0.39719698712726736,0.3718972411419772,0.15393380768534382,0.4056082468470872,0.1637467657315943,0.10760399850553903,0.030983922660998475,0.23795709245546925,0.45689430378553975,0.43423605658824127,0.7710209000397421,0.17609817421406992,0.7466773122639749,0.571596241518582,0.13381070335932943,0.010538371587573536,0.7315824345832984,0.618447606310782,0.5406308888456168,0.7688191958260568,0.2637069836566057,0.7245558755972781,0.6927158878392397,0.015788566899820777,0.7375689553486826,0.5435392600411235,0.22598498424407132,0.44755916614487123,0.9900795506268953,0.6874260430960573,0.6071097825462466,0.568234986230254,0.09239962520046707,0.0042861542878498415,0.4284292601873736,0.027864705585278315,0.07462795302919356,0.5244085195075443,0.04362140439577433,0.12476759345561717,0.9311259641164553,0.9372630775223432,0.5469856580829056,0.8869364394755754,0.5172797673805813,0.1957102469172851,0.954620740830165,0.8962562023128895,0.6607309477204546,0.8705977437050534,0.75908505843128,0.43985388791729596,0.25049029249909505,0.4674053391060802,0.9800750697227361,0.976576174302429,0.05517544071261171,0.5382277179610171,0.22359790040397876,0.33614280480119074,0.26591331996322287,0.6344020105575441,0.09496454731075232,0.1665537399030883,0.7450489697661264,0.14314707614187272,0.5166737829050068,0.10117749236215312,0.354478139384657,0.8597062682484224,0.8324060295975675,0.9053147079563144,0.6974361148358774,0.09032224349883666,0.5682821224593548,0.046791909117281705,0.4015620989525719,0.7555782590462232,0.32952804691323423,0.7677636980042111,0.1336139283286033,0.050396343518193554,0.1072804574090811,0.5632498663840773,0.9043754526041019,0.719894122193204,0.45959839726130913,0.20373217118461207,0.9035376834218147,0.441945100354022,0.8347353058982947,0.5625433571472569,0.31861092602941565,0.6683394623334193,0.7370643577562697,0.019090892367236822,0.02511954743415612,0.612896069089798,0.6304093164195317,0.8896925972463527,0.8149116645214911,0.2894903366894701,0.9660422664311596,0.5408853849958533,0.7498748221423224,0.43582608265077716,0.7284284644702055,0.05391562498007141,0.6529885487032652,0.29165393121567007,0.4675667208652745,0.4703940887135294,0.7040647827573541,0.5829583590392562,0.4162485205279185,0.10970157084561416,0.83126174549948,0.348013523085424,0.8628366903513893,0.1949548780660113,0.23309971316982137,0.5311192467932246,0.19346893613290184,0.6111204561018908,0.8306270849704132,0.5304180032514929,0.21713633394521747,0.2399962789876866,0.2800252085955488,0.33099051735212615,0.3326609726131211,0.23206353433854288,0.8689264920547075,0.5387240266631101,0.875144264372248,0.5809266622476135,0.22748780433399607,0.8212463518948501,0.8120026382833458,0.7907116372640739,0.0038953960981418234,0.6703349848942124,0.04233079930767203,0.21755941003132406,0.02546598155825408,0.9261540016861058,0.5201602769097349,0.26873884817770954,0.19647203054303053,0.4562908691884502,0.06002013872841516,0.9513113946930509,0.4217033376594037,0.3746981375860652,0.6260929509806994,0.1785148329734616,0.9116181752804988,0.9796520737444283,0.15266508994567474,0.2285472928435115,0.8085612442957997,0.16734472946558876,0.9415023977825923,0.6719338063476721,0.27223632416159993,0.10009140638960057,0.4747256289818975,0.6606540341969145,0.3177227573850694,0.24436825600963075,0.7262071671285262,0.6060537057070643,0.5431197072094767,0.5643411077910416,0.471180357196189,0.704375191176696,0.007668655430799642,0.4619114166148539,0.372562521799201,0.7683319498574372,0.5335535779503682,0.018386286019252296,0.49861351554485833,0.006705227916154577,0.45041825131561786,0.35600661024309277,0.34755124230658274,0.42644994326663044,0.9799736391690899,0.1713679465576745,0.3904934345872868,0.1346831908320809,0.1466280601794705,0.4210335910728895,0.5860471321738685,0.36646993604606104,0.34674588811602103,0.6181542909056652,0.5739030582332372,0.08083648885052908,0.9339200859982,0.9492350180821207,0.015113963619918014,0.398283018282217,0.2457731086470134,0.6597693575977026,0.9257545996490397,0.24131664212672144,0.23878832271214523,0.5142847509879787,0.4883127858366665,0.5608477858243026,0.5038813424326631,0.977816503549132,0.030644273670927147,0.7086737234000549,0.14554992777692233,0.4235745722994697,0.4626589258591567,0.14923763686143254,0.050986183253970196,0.19106155135360448,0.0465176645841654,0.9904480879346487,0.8743794063315171,0.7308673802285619,0.8935059547495441,0.46103097361707435,0.13150713077640996,0.7847866372816144,0.5090022556680496,0.8108208210779053,0.5820830522808522,0.9828069252579987,0.24637017068671518,0.3963103472701559,0.09644225547736873,0.08368952307402155,0.9898162808612083,0.5215820627683252,0.34071812757393727,0.0895949294261964,0.7911024091486094,0.015301798695594782,0.19305832983933802,0.07114789303784219,0.4947167692205332,0.006359901168601523,0.7502430172601509,0.9729175562927885,0.5901961933851321,0.04045377845937015,0.6980205131015162,0.6126963054131587,0.46570951460491683,0.17573009112410598,0.38956054720148203,0.9624635321630577,0.621738165065451,0.3641358463420674,0.7778356407991844,0.1934092213445462,0.0991900299360553,0.03071173884159628,0.4669702229656354,0.9815384578720814,0.014219447971562715,0.18001893317276285,0.7684097388683315,0.9759078618733978,0.4335356508560255,0.07294964051299635,0.9140889067397395,0.10841089619629862,0.5544118723992455,0.32918761664400265,0.6677408855097671,0.9465522702051496,0.25202340970066506,0.4718949481786796,0.2060828334116438,0.9410060261448701,0.31962577600140807,0.1416847270767525,0.46468402534755326,0.45586880163741417,0.96503469949783,0.8551763645818755,0.1812503448679963,0.3737855187739687,0.8238721846629016,0.47390593601087616,0.38690064345430364,0.3677009889948091,0.9929654674582413,0.4626506811978621,0.6129844596176943,0.1423290393489125,0.45426566347664954,0.5392322552961726,0.005943278605215818,0.7009553976958816,0.7663619513318665,0.9380522857465992,0.7378536055068965,0.26445683734665315,0.22901223808899385,0.34611213509665517,0.24836864753238364,0.7438794231478432,0.8662711925188009,0.5048806497761642,0.5356290459283304,0.21645755051905868,0.41268866381294234,0.5584067154079493,0.17744657546711617,0.597366638970841,0.8027199959815778,0.228377619651716,0.15665094864065,0.9244256924724674,0.5658696677180906,0.20131039560089925,0.2455692675997716,0.41025505793095385,0.9766295727652006,0.7511305224738811,0.5610001509658926,0.2646944655496406,0.7426545377624616,0.2594078926646517,0.7524594440284058,0.7338348013904159,0.012998629342188428,0.18191697667468687,0.3269112433995065,0.307838639272761,0.2547405416830921,0.05022740299291395,0.6820081807369867,0.5086904172344457,0.5316059210941908,0.630025878335791,0.35771968264077003,0.4744316843464611,0.02773360327419594,0.4496095758616898,0.11894118136067533,0.8218932193333215,0.35831238108625585,0.4697257044840686,0.5520654987631703,0.660896291291666,0.14657624489878596,0.3247857769261504,0.9890756906680593,0.4459440397658818,0.5866181349220896,0.9863471282313794,0.9210288153949149,0.39107726704371615,0.509865164210658,0.025224442607558517,0.9093208408445279,0.6644132685652584,0.8356396663832455,0.6833432789084666,0.3290297614830293,0.7670880597739322,0.8689331323067457,0.7542752401566242,0.9643064291113224,0.6500423929790096,0.78892221566271,0.19268397770231172,0.36886184288638035,0.2254944556258407,0.26098792605024235,0.6101874165417323,0.4626479908621486,0.18950190477339746,0.8985567530831322,0.5106202606193351,0.7161103351924438,0.21018717227476125,0.30348914163705887,0.28655975051107485,0.12734241650599443,0.5081392205907009,0.5109093407483407,0.33757413492808075,0.7816706329891445,0.15888418703979856,0.18272144183835692,0.8949290549582962,0.6566464612945,0.4774044754326874,0.7974321488247686,0.10971690069350903,0.8649333149653229,0.6922706855367475,0.5425076476456065,0.5336926877205908,0.15330621675604128,0.581922605482847,0.9647836043144087,0.9879666484304939,0.2388571136060358,0.49501554428497885,0.7855023475617704,0.029914876415910507,0.06368725847747636,0.6792239980059895,0.6297133498194376,0.6994505023095139,0.26851293708851576,0.18390479147852523,0.686712608070039,0.7703841033910639,0.6859009856539469,0.3808916483408782,0.1995775844712051,0.38779660223941237,0.5674756803917929,0.4932863568860464,0.956831182732278,0.15772812229979438,0.6960394349682049,0.3956677986493857,0.9553262084561063,0.2786152039819101,0.06116162445763185,0.6372300828343438,0.9969138868663774,0.3458682589308788,0.32668627249823046,0.4774989451044884,0.5162658641789739,0.9113190805493583,0.9956015689444042,0.8934178831143662,0.9779382143335151,0.8816504384268624,0.571582846944718,0.4364810185423236,0.7628161797651989,0.23175768078702608,0.3547322352511375,0.7888421799682015,0.2625837198221175,0.13899131082970984,0.773997368417521,0.3106067800117902,0.6679323423649741,0.8780301890918392,0.0029662215005241688,0.45181273374956454,0.19965327270803512,0.398861635797946,0.4073846039041864,0.2647398926657776,0.05618652632746923,0.6540938207572313,0.37559982745974785,0.9146177451779154,0.44464514063894356,0.6335544287455488,0.1378522493183898,0.47303526526542927,0.8033532614757464,0.5155697493352187,0.9488015511644317,0.6863376011979294,0.15941640462159135,0.11935414497440222,0.02146498248648343,0.049163715536852726,0.2796820648138105,0.8147425382213904,0.8517870046593312,0.15390338869571707,0.06053992656554241,0.3987551403753822,0.9756332869494844,0.9440771794907123,0.9552399517659003,0.5487320137203784,0.9793623200937827,0.7910183949029641,0.009442291437488093,0.3886136657042367,0.9716403877045985,0.8572933718900793,0.5544747331908768,0.5138753943155578,0.06106004457185876,0.1521479054761874,0.5852983541565391,0.5706160934469178,0.772605610295122,0.2132683365212884,0.299189260057527,0.9592392713194717,0.6141581771201903,0.004706435721985702,0.9028487134990568,0.2635128316294044,0.5611274834125164,0.12680194240594944,0.21240845679109466,0.3011299802900256,0.9181423883456306,0.9137018393685261,0.8435299708524939,0.46863491150331504,0.8590369293505717,0.669265214917848,0.345181228425703,0.1684535143356649,0.008511151125047522,0.6268580210193133,0.40824125796388144,0.8900459311997952,0.597866739363216,0.48943433516350887,0.715387431826785,0.7540860210914033,0.5248714872937386,0.5885041939266105,0.6087805424574151,0.6428360211388977,0.5630897764311185,0.3767143900619403,0.7806702471252345,0.3876509154129828,0.1362356199113497,0.3770412391260658,0.7220239583814136,0.5472694665232649,0.06763378752226168,0.10559828147581984,0.7099885790084757,0.6932151715992594,0.642674384215536,0.08798812424969404,0.46926752955019047,0.7969022905662906,0.9145025244710738,0.21250710675177964,0.4327312170389106,0.23707333823883658,0.5752328112288201,0.6102308678834925,0.13816234687171236,0.46654329819222373,0.19068670123923437,0.3053462005914711,0.746068341297971,0.7434176209245733,0.5307162823049931,0.5833723390541268,0.7792945979909065,0.7512193692634517,0.49920584308025995,0.9106801280518146,0.5950017777462775,0.72448384513994,0.7621211896955469,0.6880544645270956,0.5585616481079427,0.4390278161616683,0.5308026628009668,0.8735118904504282,0.006242451316881503,0.25408380362015426,0.7107458987375908,0.9554112745836849,0.5851355894532411,0.809311419108232,0.4472200355900897,0.996720696383822,0.7122273615006449,0.9576725353117044,0.28729951528944064,0.8041330456448144,0.5233602910719275,0.4089924639427527,0.9211626283397569,0.7811528574335054,0.5432333732454675,0.5753911135265166,0.9132862053081521,0.2232298737782692,0.6312321659839482,0.4672902670628638,0.6034968465683979,0.6176444415643685,0.06869749765966637,0.40660288127245003,0.6598958638745933,0.26438125205769114,0.5959835191977934,0.7318745051669004,0.5093040424516881,0.1460775808455681,0.4703439586638083,0.8465886586473792,0.9042983935546942,0.8216171455230625,0.6095941275475623,0.1336991262759828,0.7789163095176119,0.9347357905682292,0.8742264123184547,0.3325601275328649,0.81268776190128,0.9265937778433455,0.7510822990990877,0.12757159328624446,0.3543129679446704,0.21794676966615145,0.24559012250646428,0.7998553060255877,0.953688518964031,0.34662831436852337,0.9747591231900286,0.6871588836179574,0.22749114206510823,0.8556896557897822,0.0746067458270887,0.7966810841074652,0.68898942373929,0.65495647767074,0.5324180860421401,0.11338767526239435,0.3559894850433436,0.2934686749155009,0.2991645869670101,0.9527763158058677,0.44563194078779667,0.3959059535331766,0.9395546246089623,0.6694191736767252,0.3730202657459416,0.0582860792965465,0.8156755891228307,0.6034306350850345,0.7178245960840499,0.10466468581374566,0.6485928888056032,0.5863224021609281,0.025574024778578952,0.7964777826951575,0.4864511719212976,0.6039421091056179,0.36833280739496566,0.7597923440293153,0.6680288084080626,0.27519600822077317,0.9365004922992259,0.7618661815256531,0.3034927227059414,0.05129096468605843,0.6800754725491569,0.0753828724459733,0.3768081538589605,0.9557521215616949,0.6517074707118824,0.04188443390891616,0.34069391712827524,0.824773981177092,0.6450454139478283,0.12550682107568512,0.336169644974742,0.20355954136527488,0.7590152320323498,0.5036512699242861,0.6597897715934118,0.22506187316120907,0.16303659712889962,0.7959564962013448,0.3046261411793929,0.7712435456291928,0.8352261989711955,0.22759759894126708,0.20339189093407217,0.6425349566013248,0.23352142856222358,0.8114954205939939,0.45675666881846766,0.6533043298751382,0.5130634396969662,0.851827762585234,0.06412967981433826,0.27050539808924134,0.8260289653111026,0.8149894730577982,0.5405947236388791,0.07912189254274704,0.48914288067315814,0.8674602923461334,0.7817298974755009,0.5678840403999752,0.8864117816856092,0.484791891412909,0.3921230455282161,0.26959095785779486,0.8961554772490672,0.533106620822223,0.510887916296503,0.08354974203077914,0.5890094787337001,0.9164726823513427,0.15678376133932614,0.6273649689879102,0.38142669893091385,0.9823604454759394,0.2817794816677681,0.9018028470273631,0.349193596044558,0.23394858622671788,0.1086812587739654,0.22629373895129512,0.43313762974593395,0.3999757929210468,0.7563414543916738,0.9931543335733628,0.4963041990136343,0.8489112079370464,0.1310933042692013,0.6371170173894376,0.0870146269059584,0.22250429049484177,0.4503533870291381,0.27496580781735913,0.14288245973679414,0.2833062349039981,0.4170145890567116,0.39821775467526765,0.24867747373005922,0.544567909008211,0.4261296235381864,0.3904923078414302,0.6803442097840893,0.9926044184297838,0.05835672391734059,0.5785091129269841,0.4052607937641317,0.5044169345140692,0.2661603111682229,0.8157136908885538,0.9966140774466061,0.453133534933698,0.19034312821116917,0.23638503113734255,0.48762321809021225,0.9251876534422043,0.22317751426009957,0.7025472552143159,0.5311653423028424,0.5404009491346771,0.22650108241498756,0.4512277932129374,0.7164710536444605,0.5937269301734007,0.5082335514437084,0.1469241437517128,0.5893703348331274,0.2211753775906713,0.9129047545325526,0.6156359507458962,0.17075175897594663,0.5654512148006838,0.4743640690096722,0.7251752857067078,0.5644399061875274,0.9539271882788196,0.5071113574058261,0.8829106184724542,0.4370417020420463,0.7783685129054485,0.6539213505223578,0.6893562946257938,0.7781650009997656,0.9997446182881671,0.7430934945089929,0.03783976552030732,0.546332761030079,0.7873339148122718,0.7031536781918624,0.6122119645654382,0.987854565558562,0.5727675403597365,0.12047692476198857,0.27667675618817067,0.26803755666340834,0.7990751611127251,0.8890021902976066,0.7512839863416727,0.8110159147824714,0.5039684685139507,0.13408114758227319,0.7647038819980907,0.9340195300012328,0.0956044969465697,0.6624905631586946,0.4369014783934153,0.8932692519895267,0.8877140395485319,0.9271533014057829,0.6352961064090996,0.8597295309063668,0.972604665954905,0.7513723659373654,0.5475211151769299,0.4525896063484365,0.9104801432854248,0.10198278468368072,0.9139277634168665,0.19201024514800302,0.43942451210191025,0.8647742789746169,0.16682528633536742,0.7824643895540704,0.6270757093804957,0.48481951355165553,0.22744119057675038,0.26425450735573364,0.35184001982888935,0.16121839592451814,0.3481536271284751,0.30506917629239094,0.5515246273795016,0.4864355512393348,0.41361308230926586,0.7538113903019377,0.9604053239715162,0.6686734962675167,0.5497879906567031,0.5058167414561692,0.0011992019374911234,0.4884037608658187,0.7889934867048183,0.2650879882595143,0.5227225096593002,0.4068291571380054,0.36389070617514774,0.6883288428081547,0.2484390140962125,0.5006463097871201,0.29632509134890084,0.5944844932839419,0.7204163276898234,0.9042812487341765,0.9206831049940336,0.3259936259106877,0.7336194359257224,0.08838884370558997,0.049169164288563216,0.6144485377592621,0.7795949042135435,0.5317068008171586,0.25396422116877004,0.3679727508115296,0.6803528502083689,0.7955295132585574,0.6788803459759487,0.42024358846001797,0.969216574805108,0.38078967751534143,0.33844901639528047,0.6639028031083087,0.9425440763948127,0.3674870115901414,0.14075919219000776,0.6084751011710319,0.15076487046807352,0.5175621656804605,0.5328454523638713,0.46214800114141696,0.08621451357890564,0.13076317284699468,0.7448586388745988,0.8939032250311509,0.21837458092174566,0.1641896983804887,0.9120330236585372,0.7733867403839016,0.6790082822321839,0.579811278553213,0.45171082357959125,0.6606381295926966,0.29246274542943684,0.38829665291836046,0.26838503728109586,0.036812199444809623,0.8437992783911252,0.17950549992168474,0.6504040783076519,0.41293047150977347,0.6590609930157025,0.7217794907727502,0.9908635029245993,0.44170946630187813,0.3432171444227696,0.11391051374599725,0.3252356899063238,0.3647498063939598,0.3918311785689854,0.8073761324900339,0.6680006529994236,0.8676114460564819,0.23286180514484323,0.15274789054792315,0.38973087935656814,0.4046905366638147,0.9058696946046332,0.10744472520727966,0.7789636591361953,0.5540947026010503,0.8601458265831956,0.8905787832132317,0.47871659799839406,0.6298689197436438,0.045921622495529446,0.16161485641903428,0.6511223865728502,0.7391668643877107,0.3820737415308004,0.8724438485679722,0.45223094838955036,0.6376207071421234,0.8056152252864361,0.1396864616427702,0.17885963939325955,0.3542290009160516,0.35636763202164157,0.22568087801529724,0.014283061596531255,0.6671605350848697,0.3784484767569676,0.42006160601975995,0.8386906720125824,0.053570888434672836,0.2592760652822599,0.5218065523393112,0.9244505171964104,0.08524072695156626,0.9518439842040944,0.579198437925972,0.0680848489039898,0.36541049027688355,0.7783846186690646,0.9386812647040943,0.6420863182529821,0.34188062176179024,0.5163271158122744,0.1597346590139428,0.6290980755655398,0.5495915269701617,0.8124055330818285,0.737100312955211,0.19249236221790733,0.3996982331864829,0.7870003654184086,0.35110918855014495,0.1834229394893674,0.9149771286214059,0.7505729384728892,0.7454766070050307,0.9329509849900284,0.7198776008173626,0.5033803066299971,0.1439358626181313,0.8337327853226915,0.05746502852213853,0.689665128340869,0.35269603328069055,0.22369918047174653,0.25494187903619436,0.40359868179707625,0.6894561876884879,0.7129421376379323,0.6856069723505507,0.0030514130785728177,0.9578749617659803]}

},{}],76:[function(require,module,exports){
module.exports={"expected":[-7.535894668605244,-4.384079485845922,-8.300800595984265,-6.72088933958039,-1.8869132226862688,-4.734581760212144,-6.695195690612859,-3.081082416561338,-11.789305815069525,-13.809995150973993,-2.16599014027896,-10.079016306805748,-4.652765952691103,-14.040438336575741,-8.07449006589837,-7.2564924978732055,-14.087211130694925,-2.344317222428381,-2.0267340148043687,-4.197773785488755,-1.873665445310027,-13.71654986358479,-2.4237645575466344,-7.52724574268029,-7.340644128349052,-1.8839646770912055,-3.5017939396502595,-2.0667764179485317,-5.449814984785578,-13.601034299766237,-5.676918959836231,-87.139198767736,-1.794603797756718,-4.612719071796582,-4.395556056004282,-1.5982692659720361,-1.5645556398105183,-8.620942196501383,-2.1666603292478586,-2.947744559244603,-3.219113770099813,-1.7577302981756726,-3.32129740283661,-2.589308210007339,-11.506496532447677,-13.448647197924888,-1.4749974238782624,-16.161783762181408,-7.514418051242287,-264.8990677751597,-4.251497446269458,-2.6024496170766684,-1.6683615724025858,-8.647545646622444,-1.300487985285743,-2.103935315125874,-34.22943741115833,-8.408981472676894,-4.456957097127792,-21.34797315135705,-5.090119425831986,-6.650257268343899,-14.826708724088503,-2.91214544087957,-8.322608879375787,-2.5199141278008517,-2.9111313700657817,-3.3697552274931324,-3.605535046294606,-4.553019517875499,-30.294978440452205,-5.127600936234588,-3.117572569450491,-13.69849904524312,-8.286628005431504,-5.770640292102763,-11.623798320121022,-3.784198544368301,-9.727649132682469,-3.9323204849651203,-3.1477365003875195,-5.478896414623188,-8.359094601936913,-15.890680344382789,-4.120265183593434,-3.1243929520289875,-5.010317017563459,-5.9396145978002375,-39.85743660305743,-6.2205068863007416,-47.503404123090725,-17.846992724898993,-31.875762607786715,-2.8749199724683416,-8.702256010330098,-5.597751911012175,-73.38102141561319,-2.588181018300756,-30.96732409945179,-3.7267886764286025,-5.886550171354512,-3.486613014425385,-2.276923958218756,-2.7247856777235637,-6.055039052439754,-4.307451511534802,-3.481076026176701,-2.7982076329807044,-1.0280048153328316,-1016.8117295226504,-3.023095015113836,-9.050711795510002,-10.738248177154366,-1.7632865514031257,-3.321788159453978,-2.454701396906238,-2.7459382248671913,-66.43471485956145,-15.063032149445084,-6.5824283177439415,-10.261372075705205,-7.902209973857783,-7.008758144445289,-4.266694954829363,-7.549212520410213,-5.145213556778671,-3.089474361851562,-25.69584066555675,-6.681674727506087,-4.5556151676712755,-3.4142048455127236,-9.426482839390006,-5.258474125874798,-1.152068718579549,-3380.5262249716143,-3.726842890375922,-2.8366019667843467,-3.268026037533276,-5.024226295958798,-3.637753767936317,-2.1590361774044164,-3.342355522202186,-5.009780398248586,-5.828179371156033,-5.577643350713741,-87.72993906288012,-14.617999252974343,-2.290739982978261,-3.9503382060024177,-13.34005913948205,-6.799011388041158,-2.7392531909279114,-2.6168512469574408,-6.7831998902327255,-32.28305834361653,-4.494497991660844,-15.955018134475141,-2.243520770123844,-3.0952692598850597,-5.129565610844134,-9.038824872422495,-11.84293155812778,-3.72617977742851,-2.5178091726452094,-2.3958393591672538,-8.812151821337608,-8.349992520013473,-8.954556451163215,-7.731552828100205,-5.787683968863244,-5.8048522820517165,-3.556327746138253,-2.7220039440028545,-2.225506865752242,-3.412263490633818,-2.6122253518055643,-11.854067409730638,-3.7336809458054288,-9.33357620247717,-21.931300889934516,-5.274357966393688,-11.86958763905167,-3.4915456100817166,-7.6147578567245375,-10.120206030453112,-7.343119849571873,-2.976354494405739,-11.061846169689499,-7.8090052689934435,-5.16925716377945,-1.1566046885735277,-2.2993273554942664,-16.7878925117916,-2.5003662212983366,-3.8931790119842615,-42.27636821630012,-13.169429899356336,-6.501566327166038,-6.065469098677237,-18.505851805561544,-2.346426645644296,-21.14970078732625,-4.311191138697002,-29.137085414267517,-2.749697850179933,-6.97741859994309,-4.5133439675525535,-5.299665144585291,-6.196243610928568,-1.0600365033290418,-6.285561174851012,-3.334217926083369,-5.123093150478539,-2.6879809618146906,-2.3670299970559143,-2.000529824861457,-11.132347981232687,-2.875447688742463,-306.17742268232524,-168.20116724360264,-26.663868064784015,-5.0716973340351945,-4.608981141927,-5.158494694404081,-2.5528442474582826,-8.47551266142586,-4.113714586547367,-5.160208988055968,-2.93751017594697,-2.6110740033577318,-10.447955958901417,-14.807335415215801,-6.313541945066093,-7.495415970682685,-3.1572113823128367,-15.39736157486737,-3.2030931505794666,-1.5002756996209636,-4.285049266184505,-7.3244821432926,-150.30750541395668,-7.368191724526579,-3.437976236161824,-5.709584306867627,-2.0878057489510145,-5.374877157226843,-3.527921383058154,-5.325170811039229,-9.006399295393269,-2.4758884641015317,-160.73380450016617,-4.813671043808574,-10.486630184522392,-7.9588808760090455,-7.577056528560164,-12.534196713939341,-2.9330330225844947,-4.525114525396794,-2.956206488573213,-4.7350861415017755,-8.471878455988785,-6.130112536002972,-4.19419913906156,-1.8776146584635898,-3.696552018442676,-2.0211615931422178,-1.4175508568971646,-3.566931664753249,-6.338605910364043,-11.894095785350412,-24.537275069550848,-11.273539580507851,-8.456596187295983,-2.710745155527684,-4.976169164072103,-5.30982925919666,-5.080762167054321,-5.963723150723924,-5.152711897622145,-4.796016865193167,-3.5504238569138344,-2.7002448518925872,-1.7392739298978253,-3.429465956306653,-3.5755002263682427,-2.6736727178641413,-2.108807851478042,-3.848679244803538,-6.249506096214994,-16.375683287611185,-57.54290681655958,-5.45080442957145,-6.906185109113583,-6.4242058697305815,-3.538884147858368,-19.582697530713517,-1.8776003916365522,-7.753577252144889,-2.2966338525503964,-0.9703899976941843,-5.394443049587848,-0.9170753991283043,-3.481983423384003,-1.7325036449502655,-3.037171786553,-3.1001049821930926,-3.8866359454329653,-2.9577320278238513,-4.496798390865427,-7.644368952041755,-3.0229031318030604,-10.444471988946436,-31.512688316453442,-11.527510226643523,-6.93781992081123,-4.020497518664989,-3.93569529501284,-123.92123723748476,-2.8938954597777173,-14.720151996565638,-4.178867501941514,-18.061635786876945,-2.384141410108371,-2.4246881927735333,-3.2662820724621713,-1.9765675912868543,-8.452369193695912,-11.533826485368268,-5.066564292545834,-2.847760896242353,-1.9098876398320002,-3.2483610751408327,-2.7955249626278764,-6.648845668482104,-2.7314680443073924,-13.953723855031635,-8.630341297146417,-187.5925284044522,-2.43235179164807,-11.493134861724048,-8.449797832911134,-12.37083677155688,-3.9312734176076862,-132.0039002895748,-17.398155813651535,-2.6835168729566554,-2.9791068560285243,-4.124948343232642,-10.339327806244134,-6.1411983902811835,-2.7244998066885273,-2.9090736214199953,-4.878232919765952,-5.3854114722171635,-4.802087665038235,-3.6305691232098143,-2.3707978113677597,-9.131459963348988,-9.690532186454307,-3.2230388048420533,-2.7567903489937664,-6.17977459909679,-5.011692640704956,-0.993584102668447,-4.775266050691306,-11.887766127601596,-22.138202352956878,-42.96451147665694,-15.003423595700125,-3.245264230828641,-15.42230422432696,-1.1225835886144302,-6.407653312626193,-5.029643532025839,-5.647313416430435,-3.8641720160473576,-4.86176395376094,-3.296772193498668,-2.2307515327012055,-3.7483167242108006,-4.524619595127413,-4.662271964436499,-43.59878446988164,-11.896254818807364,-1.6840155525757559,-5.819750114103841,-5.745705611980142,-3.877899846838874,-5.028495596834659,-5.331241793181771,-2.3660798083554684,-2.1476595639123377,-2.740837436276117,-4.204520090145315,-3.8000644928549527,-38.01927129539897,-6.019584487571568,-6.5789098544126405,-6.291266352748037,-7.993367078412301,-3.725334528667964,-1.9770909525942333,-4.03076649553204,-7.675204526523553,-3.633485118859399,-4.765172465764781,-1.467690049753993,-2.752199135531394,-2.537888604523386,-3.4289944961926424,-8.980610868083353,-4.157286107041334,-4.950646344977872,-6.166968086701786,-2.7355110109885308,-4.817503011735148,-4.086158426504624,-4.350555622797966,-2.8225259161221286,-4.834304142572676,-6.840058022714195,-2.561995051772889,-19.940606672987343,-22.87896594181955,-2.7223911180221987,-1.6626457455444341,-20.046848400149628,-3.0612275179192276,-3.9440067130207894,-3.654966099750014,-24.404163105020835,-3.2113865983059,-4.7432051467269565,-89.28681797333229,-22.548289764189917,-4.217589706549838,-5.97516586757595,-4.7107659793410255,-14.051827609942661,-2.266898132218858,-3.3254202551341616,-5.906352472526351,-2.328188225515687,-20.824749237301226,-2.316022953119445,-5.120066860875478,-9.621679042260126,-6.690825461899648,-2.2483313360562387,-30.328687788184155,-6.047784082963295,-5.5999512136855465,-4.3801706226227,-5.548842363217494,-4.062506512497398,-1.0264029673103716,-12.85837714419692,-3.385767924782448,-3.5294538141257608,-3.583569836227404,-3.7999021144649783,-1.2824626307801426,-6.469598055425122,-2.937612311820892,-2.2136623124147348,-4.149874860955392,-2.716418160179587,-3.6033095750808903,-8.71203446820454,-3.606652494018349,-2.8986794219278393,-44.25718774490961,-5.542881171615523,-3.51389564755454,-3.5015952483513764,-45.769994357417175,-7.3145235263136845,-5.096015157891229,-5.058640247441093,-3.7061011427359625,-3.200814597769094,-2.4300219960100855,-2.737538474774036,-6.553494330163217,-16.117546298739605,-4.338110157793984,-4.209553515159451,-3.927436555000117,-8.98798892187581,-5.292468051101114,-4.529622330393349,-174.75004298151356,-6.132002033501871,-2.8280907243933555,-11.748676199234621,-16.26854846646983,-11.64434462586897,-1.6575992475826842,-2.8383982987007617,-4.932205306035803,-1.8405593997008363,-6.822178753174896,-55.26699167536923,-14.609416303367246,-7.005406407226978,-4.207896308251538,-8.175994336973513,-9.42860137353149,-1.905257589330505,-9.018755721878016,-10.226146242960374,-10.473694264763763,-5.793057863577686,-4.186162438529928,-6.281060618069333,-4.56598446608474,-2.3864156341857403,-14.081383671553771,-1.6813791461335161,-3.168519611902677,-4.449428892476689,-4.06833123049626,-4.084977035334692,-5.315435190364919,-7.083647341027193,-19.66094421730749,-31.838764360666588,-62.944649735560006,-4.607813057390056,-5.8932247145245125,-0.9456267815997912,-2.8282808518718583,-3.735022007896667,-3.8600030042595934,-96.65572775870808,-3.2888606749040314,-10.940142139899697,-2.033578705742743,-4.359128082421743,-25.051209123573724,-1.4528379592147358,-1.815381149706906,-4.211957623658405,-6.479317857855861,-1.9534760173163495,-4.251119483099436,-7.064785386941532,-3.005214641029407,-6.469655494304307,-3.602444087152363,-1.8117956662556063,-3.4029119334819544,-3.091648977496772,-1.9994870305063608,-4.212120006971173,-2.8807829380473926,-6.179076360044963,-11.395777018405125,-38.40391255317896,-55.12702940742046,-5.652862558589454,-7.928158483893513,-0.9102972746871862,-3.5279983046542833,-4.566935974657482,-2.823702850573101,-18.05474473535894,-6.832735241457084,-1.5407322348066228,-7.298311294495019,-1.581338794718092,-4.340709557447274,-2.469389688707548,-5.255355157149363,-7.159961412279636,-14.871195084737707,-4.759606295715666,-14.478061032404472,-16.980114098735278,-3.4641506465754937,-32.1171717960128,-3.462925887899055,-2.3365137785734054,-2.662668583291185,-1.7783105205035774,-3.4800434602132246,-4.071866095952656,-6.624098198774186,-3.391236244670859,-4.6763082584789775,-6.60664750511544,-25.609980119836916,-9.391484870656328,-1.819243787619273,-2.231154885138915,-5.544890729881612,-6.202936701307804,-3.298362069783443,-3.8273487809108326,-12.21216084534434,-24.537661821093476,-37.63034765209102,-4.81479054987539,-36.91753855043112,-6.7034491087275905,-3.5608739680128987,-1.0399262989492775,-41.62896182356397,-4.333829727609893,-3.832569435637222,-2.537622278880489,-3.0594008449605985,-12.602628963769085,-1.9020347268836173,-5.110203157214252,-232.2549372867566,-3.0902404858012424,-1.8356657636351765,-3.019411580478519,-3.820590089229764,-3.6129665335414596,-2.9861968882210186,-2.9902886196419627,-3.1950828498763357,-3.848852412449174,-5.723852822428959,-4.211936904372155,-9.997590258380509,-5.050689513251751,-26.132988654049626,-67.63477939142105,-9.933619459638312,-9.04981242280972,-3.0620065440077497,-4.573584224656,-2.2774672068154214,-2.799970005484725,-158.76788873147976,-4.265997005259502,-2.3549546677170765,-40.030003350463055,-9.006442906357854,-8.140400685713601,-4.758133825862655,-4.266658214000651,-1.843196128618577,-3.9260450018283577,-6.232901850646574,-11.32318424130259,-7.280743568433511,-25.678006027974607,-6.816458502235117,-3.871259910109794,-6.3078228033056085,-6.76173054926124,-32.78294997377521,-2.982295770827882,-4.172150161778599,-5.443272771688651,-3.4806771740538482,-2.6998737170663416,-8.556795095815962,-4.064119782877186,-4.891480230131182,-4.868886928261708,-99.18383853592104,-14.381734853046979,-9.237738102119328,-6.031233329814502,-5.854496287117426,-4.047164631096451,-4.513650222479803,-11.191495186599836,-5.014069215862776,-20.01783612677666,-8.952739702240084,-3.5212034932625498,-3.842928362209255,-13.620384914886245,-5.076631507678423,-1.4946611217891808,-1.3104666363886195,-1.3525286030977233,-2.431435859637722,-4.713433954827284,-1.9381891222372456,-2.4824564886440657,-3.5828954024468316,-6.236049120980073,-3.6430164536664855,-2.6857401198606294,-7.518411810769834,-2.3028866502426464,-23.478033775265654,-4.997830649273888,-11.51339937359894,-3.871943856341153,-2.5076629157827073,-3.6003482139271967,-8.30426465046306,-7.220791106136582,-6.75674217228337,-6.7713414044378535,-7.709566963206453,-5.347257387182947,-6.064973696263194,-11.851776815707414,-1.3235231071316862,-6.153973202376182,-2.054339148360222,-3.476256012274669,-4.252618736268811,-21.481873093302013,-7.691262367467597,-1.8252088868096683,-3.324626564568685,-759.2112727941857,-4.9131915907166706,-0.9248425960128245,-24.0010961120078,-17.867805835934227,-7.494466447973795,-2.9803095714289434,-3.686085530299251,-7.05385241137736,-8.482000760606034,-35.31567422098369,-3.869600147542618,-7.790141346263878,-1.4330608822992736,-2.8801756377879726,-26.361772928877674,-2.9895929513185573,-3.7468049362753733,-1.9284185355689334,-3.8119433573722414,-19.04640986951122,-2.3106587671015704,-6.687416478558541,-8.789434704770153,-4.623369168243101,-32.88372570733443,-2.3934449314756647,-5.643623823806484,-4.023336240754174,-10.291675805988195,-2.625200115853103,-3.6420734757598665,-3.333446730565356,-124.52059962784898,-3.919050397865392,-8.160590045674269,-4.355836428510845,-5.085947772383552,-3.725505392725945,-4.555173034740258,-4.312813881870258,-45.07433474969907,-6.847562686322589,-21.93781932622728,-8.848042311788745,-2.8858779209266308,-3.874855027354707,-9.100980176305843,-7.011540112802166,-4.1785222962319,-4.276600321831987,-1.51492401349216,-6.972784351340751,-4.200453572386942,-7.215390342568334,-2.474825800488083,-10.130656802256636,-1.5706623187808002,-6.206073500949214,-4.184982912973449,-2.905830831150379,-3.6162952547711558,-2.3374905635444536,-9.85871450445188,-69.42760170230088,-5.3066489416974605,-4.77796132749612,-10.537911915662674,-15.443613411980927,-19.558277600186273,-2.3809978692813756,-10.149662678778935,-6.939666719818817,-2.0129113027764465,-13.589291098536627,-70.21341480969822,-3.521195907684384,-4.870424583624028,-17.034186403604792,-92.41691894376274,-3.3731084471114037,-6.536367886124955,-6.266564319899958,-3.556005017210841,-2.4779483572902476,-54.49968556791182,-6.803081060486155,-2.920531816691276,-3.0997957663081785,-3.993163856819069,-3.8679714028184855,-5.978369033989999,-47.14230655666306,-1.735972630029765,-4.215763243304607,-1.7716869791762178,-6.419325828701712,-3.698123670809481,-3.692223723555628,-19.554085559497853,-5.955421610983355,-65.959391127335,-2.693350023426066,-6.221140941965027,-4.947384679921256,-7.13229514158024,-9.414203277010033,-4.180532834435657,-3.994830489837193,-3.190279074302994,-10.5538355777822,-2.0669695292010997,-5.1410665575935175,-3.502778641580778,-2.16730303737414,-5.164202234891114,-6.266713406652028,-3.3050572558445976,-4.293619709488839,-1.103680343929488,-4.282475351471624,-12.831417050740939,-3.5444155417190477,-1.2497622094139749,-17.170601761707665,-2.2894499535006574,-3.319837900172894,-16.772393497430116,-10.652209269217176,-2025.2547876240808,-2.0650941332652337,-8.309599884769282,-4.551973098408513,-3.48261745805368,-3.8094270684786644,-8.269085936490548,-3.842790787496636,-6.754217728138506,-8.958952990498684,-2.8299408989072985,-3.2834228980022675,-4.07463675454918,-4.546348642709035,-2.4048090714018047,-4.823494845177199,-2.1980144785405433,-2.1293641105837318,-3.830034988913312,-2.373709688909615,-232.2407638516753,-6.697828707055674,-7.71862903658741,-5.0867359295557915,-15.89453295684902,-1.5911079885382464,-2.9282188788949868,-4.785462563382585,-17.439438270661302,-18.664862926746366,-9.995538532691997,-4.187735166369953,-3.969872232862212,-3.414446943268474,-9.020931387233981,-1571.7967803554386,-15.21949510421188,-5.810060258876817,-4.715701110516464,-11.37496549892665,-2.9741199745943576,-1.3523381811828803,-11.41087819950169,-4.969076474779636,-5.315430744722264,-95.73194981107741,-4.848358092473857,-4.319429533281423,-5.04415046586256,-16.866066923632637,-2.167723869349426,-89.57066425981448,-9.334003627255298,-79.53523025337083,-17.90822775859119,-7.149970165554224,-5.5405958006845,-4.339714444851044,-6.6626106646780565,-3.067835722916461,-3.033248076779205,-5.1117445867206355,-13.485359505972786,-11.489865008187554,-14.907608773666656,-4.018372000851593,-9.315639171421092,-1.437797590015048,-3.4749429970068655,-2.9324614464610455,-8.165025027547603,-3.1464317768471743,-4.333870955547498,-9.237748265550707,-8.991570216213734,-1.9634566853342732,-2.8289819112126517,-9.277905570749178,-2.8146359313799416,-3.5523942270372335,-2.371900211469348,-57.970551502362724,-29.254001663860286,-7.351749152890054,-3.5798611914682392,-6.653993968650773,-3.4029137964312506,-26.852747743629536,-31.457314012675656,-10.841712656342256,-9.517434078238974,-2.6598738354070726,-5.950654676364057,-2.6490289634317534,-27.681934590294993,-8.668803220065723,-4.4377937942689245,-4.061199815807436,-4.348072003826642,-2.091930923369862,-3.392513855171759,-16.619945581290633,-584.5528119794084,-2.1819001665679645,-5.485783091158599,-2.3518925259315493,-6.368246717416217,-7.304214888853165,-2.9379358122054566,-4.282036054006168,-1.7296828089897431,-7.40131879757222,-4.226299842485225,-3.302482338880723,-21.239779832158618,-27.33779328117027,-2.632870357044021,-2.161634439179777,-2.8320053072977727,-1.6459164786154261,-2.331150598461347,-0.8964289753517428,-2.7252771898784363,-2.177901226646411,-4.191877949726381,-3.788386743616356,-5.795487860630828,-2.502417466472313,-19.789652590401573,-5.201289027530378,-2.720781803907475,-3.753754718558576,-2.332773453524711,-3.763950213592276,-5.988514451351108,-9.092718021960616,-4.952448065887916,-21.841892002504235,-10.124647337126136,-4.274211687538688,-5.159455910488979,-3.2744245593247254,-35.700184893223906,-4.044465929858821,-13.678628716651039,-3.3925680663902247,-1.8485435326969326,-6.41621841208844,-4.034461839283031,-4.958600301832481,-4.478259745754618,-3.997898526804169,-1.6320171977507687,-6.31924335048435,-3.5713935985123766],"x":[-16.868405232434338,-19.23315961246995,-11.862214032201264,-13.809194894144492,-11.933416603797017,-16.324550595940643,-10.001953745639485,-15.782904536212591,-11.863481272881645,-12.234406268162035,-11.054643361888868,-11.571750697046213,-15.98217684263042,-15.262489707595023,-19.021574192682902,-17.311751090903588,-14.936913946286005,-11.254832522923458,-15.902174183461536,-16.824586289125087,-12.651712393206505,-18.720331683563273,-13.643803774904224,-17.919052941937256,-12.281311193627475,-12.540205335054871,-16.321882133093453,-14.694166675356481,-14.175949374706487,-12.563362383730276,-18.300962073957898,-12.514609288272425,-11.413420721008723,-18.662034167615708,-16.54019515018834,-12.988754109302407,-10.412951015629908,-13.244510652720313,-12.666590810093798,-14.172927490077429,-13.904480477241247,-14.259849267606173,-15.671726410927125,-13.542398666015,-16.677278833071888,-10.897989071995514,-10.215202959270593,-18.510714554488054,-10.478422547373702,-19.45746169490079,-12.68534842627595,-13.390597784312067,-13.167534285830275,-16.00183623474188,-11.458845853747608,-13.146331033754526,-19.4216125322999,-12.086449970292394,-19.489527540785577,-12.521893716986002,-14.61343054192987,-14.51645446448458,-11.784666500536316,-14.624198066707695,-19.95616544584879,-11.655661820000818,-13.593606335307658,-10.032694446927547,-19.111814991147092,-14.313321232209926,-18.899997528391424,-16.600966252448096,-14.408233729535196,-17.89894825259483,-19.90765041456241,-19.152909654179172,-12.207466512613848,-17.091858059623732,-14.970402305679224,-18.185843228376385,-12.961509140448248,-11.481046843134928,-17.38864815418739,-15.765277775762783,-10.276655483213084,-16.402830549055682,-19.59845876403503,-15.86529270989244,-15.858462004386816,-18.529467404635703,-15.899255632000758,-13.05112562630578,-18.995184482497553,-12.39965941939327,-11.648093842306329,-15.914146266858648,-19.673781250179047,-13.10505783697122,-15.695156842433152,-19.23355475959728,-13.026784116124839,-19.327022181584034,-10.699630548837682,-11.342508664909234,-17.14590258527324,-13.358659987089494,-11.924107790155592,-11.113092616602609,-10.600015059273908,-12.282231495417404,-15.379058066139354,-17.74127468618667,-16.250968752912748,-14.130511150791303,-17.294538885179303,-14.5281205635812,-15.287757379108644,-13.844797675811154,-18.598215512478426,-19.957799229509707,-14.868393223202034,-16.46724749733185,-18.016115454319998,-12.431549617672765,-10.379856144409256,-18.307437318283192,-15.473141217632534,-19.042022481302173,-15.095381576001945,-11.000809007354938,-14.440662864099403,-14.641585926492516,-15.516119073490767,-11.161432562901526,-19.231065319028694,-14.495440758766843,-10.561580660677297,-11.144093264948216,-14.298301527053594,-13.979547286767708,-11.860819583097193,-13.497617389598046,-15.27747991309042,-19.609561593645882,-16.512818876661658,-14.009826922623063,-15.2571427901691,-10.849341779099442,-19.116752539749648,-13.312060368962603,-15.459284732551009,-11.859454699373597,-13.830456617047114,-11.632928390318968,-10.571105766947056,-14.8567013776904,-19.408298686147685,-14.932219615939676,-13.87643100426072,-18.878270224567576,-14.151316152644037,-17.532215345085117,-19.24069245118931,-13.447784561101093,-14.288147097127998,-10.367089452935419,-16.65239305596782,-12.709418392431743,-14.501259998517204,-19.96728396369275,-11.730143183758088,-12.748231183691273,-18.32940680397978,-10.562082204807908,-13.679196764554014,-15.238198526125386,-13.045446418664765,-17.473458991951937,-14.422714728189785,-17.886022860460205,-16.643540628359418,-11.302574247838596,-11.853895406110704,-13.665956067962085,-13.158121769136102,-17.666670558079804,-10.909197410679543,-19.852180161336083,-16.412946224281107,-11.07986435354006,-10.085731318545019,-11.078202431933493,-16.450699957194598,-17.662888686953508,-11.729316938960883,-15.410362647551567,-16.131581980117012,-13.823671453514756,-17.648908098189796,-18.22317149216912,-13.406225610786443,-10.574678513155522,-19.444800017586854,-17.90133879360635,-12.262449546808813,-16.34756553178147,-12.864362857002458,-16.13399104229027,-12.787856424017555,-10.079964658723465,-13.58489568971403,-12.378877413258875,-16.591881718142353,-18.584061783808814,-13.253286783004905,-13.394282235268362,-11.795744801031173,-14.643403483094001,-17.424718332642154,-17.386039233759934,-18.557317831328913,-12.117253584822528,-16.73119293729477,-12.315340031985773,-18.014340206976744,-14.891913438569828,-14.895435792459804,-11.552465811144705,-10.711722969467703,-11.820433696382223,-11.180313777114952,-10.273124817051084,-19.203537011319085,-19.02183380811065,-16.90351027431724,-17.856888883474365,-11.939220100033332,-12.987862150997998,-13.829334948707421,-17.628323334837784,-12.172229810686805,-18.521919786466434,-13.24725214252627,-18.543533602551207,-10.903905709216819,-19.60183491291931,-19.4436838552487,-16.592106218407604,-18.29324862883251,-10.262352954710154,-18.808683070963415,-19.15356145351216,-16.41172748085583,-11.552695428464919,-11.28686376032417,-14.588710487825542,-10.201404206379777,-13.548717150591433,-11.11835995694955,-18.88393669907447,-13.75868464897698,-14.356242660560529,-11.703071013957134,-10.640069646251893,-10.652836100929653,-10.126737265021395,-10.4757726467442,-10.76482680636885,-18.016357372113205,-12.278302282175748,-16.60793255169291,-10.637967085073834,-16.736394269320552,-10.245026610122585,-19.182921852602593,-14.51473898889235,-16.809355032265806,-17.98919439253113,-17.566397496007237,-17.63821351319595,-15.941208816420627,-10.253898730416074,-11.27525722276875,-15.06657831148624,-10.658246418571089,-11.182602801664544,-11.159346153828126,-12.285243093890319,-13.2207401116861,-18.1447996525189,-18.2045837652409,-18.14940244918326,-17.99945531723568,-19.876070894475333,-13.706391564733435,-18.44740310334451,-10.37765041526659,-19.518246586849703,-12.211283224706895,-10.494073505668677,-18.23158573755665,-10.840675746962871,-11.270292831662001,-12.08524585303887,-19.1433836597075,-13.268680119572103,-16.348368203897156,-10.052380011866138,-19.60314416255851,-14.509398936153444,-12.768939846591598,-18.39311994854858,-15.342235949936295,-18.493090717986856,-14.432315169161615,-11.252865838237561,-18.00412794209294,-19.109876810652217,-10.675446834837054,-10.665234273497283,-18.419346857847877,-11.868427096630196,-17.148777367586305,-11.390174237716053,-10.216466856414977,-12.416919595258769,-17.460437283749933,-11.353300894435268,-19.827628893196607,-11.339421660183797,-13.829297399586306,-17.661361033574174,-13.862687758419467,-13.28981268953312,-12.79402306322448,-18.52799064739471,-19.090097701919206,-14.200523403511657,-12.50825983962477,-15.466030759311751,-12.216234122772583,-15.611320530406854,-11.912079492372689,-13.57594386770411,-19.640014345439475,-10.745305362486732,-12.13063898781879,-14.56678310491257,-12.588403637379892,-17.104389485280876,-16.748168882291218,-16.900094880419676,-18.50623607321539,-15.606866920431484,-18.6951241621181,-14.790419987422741,-14.025509386053294,-19.80425833629065,-19.12266843937728,-16.586899897549138,-14.65530951977022,-10.112237142570859,-17.264404262347746,-10.972337862740618,-16.17641561773109,-15.788277741544391,-19.651178197549264,-13.329012741471647,-14.718528788698318,-12.86139953264954,-12.743000149343946,-11.424704988514392,-14.091671069194707,-14.22927410120888,-18.712351419293213,-16.695093222305136,-14.48471328307198,-14.037188116331809,-12.934903024632124,-12.328539787453007,-15.226602474665167,-18.25558748078096,-12.318614782717393,-16.126526382795234,-10.788662018098695,-11.757490890681911,-19.467323933858655,-18.850181862935962,-13.964748640778069,-18.559094897963945,-12.747835542161813,-12.405060887762222,-15.629037347664433,-15.418218455346135,-17.031586861948895,-19.780477769040733,-17.238676513143222,-14.12385647580717,-18.91256547020396,-17.746144642638882,-14.726514238424093,-12.429325385547056,-14.858609337130353,-19.301965780754003,-13.10415013412973,-14.665133099384871,-13.111048544234196,-13.771869351426087,-13.53552123646849,-19.70689136177103,-14.562049524509034,-12.172998963660648,-10.970549617055239,-12.34057444190565,-11.057127240322222,-18.89362144590562,-15.170061690118715,-14.6957922625469,-10.590061139198092,-15.299788762834861,-11.034198613160981,-14.356684814577134,-19.441959996029837,-15.662674515780806,-13.076960325515754,-12.332709996141148,-10.974473505293085,-13.20215576014553,-15.479546489820509,-15.363699380931305,-18.174737942775575,-17.765348404762676,-19.120298200400022,-16.384153633406605,-13.661890432876868,-12.637678542852369,-17.353777514466714,-18.88736213583816,-17.366035117902523,-10.306646369700267,-12.946861724406325,-15.457315898147414,-10.33804459558903,-19.28960675247643,-10.972312006333313,-19.36837630898795,-19.20141315146101,-12.402476347205301,-12.584607502139962,-15.235833100601972,-10.250397677045795,-18.937861340482755,-17.322465550863164,-19.427721145139362,-16.343900866489594,-11.277496249626324,-18.087613792445325,-13.329823917545715,-16.216643762710984,-19.488015969270815,-15.87382027160891,-10.737783694445863,-15.546358665515827,-13.020992331152033,-15.181715686346074,-14.330281417528896,-17.685526951393474,-13.650230469983004,-11.506826972378514,-15.49938952241064,-14.130375591929138,-12.767631747509656,-12.932076466598218,-19.797566741578827,-18.22279100124312,-14.711412025891761,-18.10347539074989,-10.287610969851947,-10.919698452802727,-13.813113527044996,-14.864392384247454,-11.015362763421649,-10.90458140212571,-18.99312312012566,-19.749175611751475,-14.48017363138307,-12.188406681864276,-12.993386504804775,-15.228214547037915,-19.99299352823361,-14.084346146681796,-18.9013978347809,-17.91516469754381,-16.05555948684629,-13.407003071690674,-18.382813574492534,-16.788528863755225,-11.740426789255938,-14.924594416559527,-18.596794827613568,-12.840278406317156,-10.315390868402925,-16.93233939438882,-14.59564434250715,-16.78856267799999,-17.273897349608703,-15.260553080971516,-12.92167986482248,-15.099420357057102,-14.310305644405041,-19.057835868243348,-15.775328982411255,-17.938477467933424,-18.20797170770359,-16.871345105443392,-18.071136978701983,-14.802929408275517,-14.836843157445752,-13.685162235448445,-13.43468899610288,-19.811096829921684,-18.55676988715289,-10.179577359337749,-16.18857563598722,-11.581234349500908,-12.607588703316555,-16.743143385974776,-12.652918924125844,-11.282173053990016,-16.298869606789566,-10.147262511606137,-11.56155920155349,-16.94475668795594,-16.91759852941066,-13.162641727285028,-13.500415762382545,-14.749652366580392,-14.294203877852777,-14.292099259251444,-19.969984051213928,-11.377586414278074,-12.322163609437343,-15.885613641345895,-18.9665985113566,-13.751268700859796,-13.447894006887724,-16.182348254426245,-14.14073834872243,-18.052737155338797,-13.746464798235866,-10.240373186782465,-19.995702536334775,-14.272104499093698,-12.522378102615905,-17.38439619366775,-11.3934209195735,-19.330807527596516,-13.341549397883195,-16.120635958553912,-18.216035121046943,-10.896082548117045,-18.0462429224431,-10.459722867540366,-16.29204998962907,-13.43057485186851,-13.670989891007132,-10.11190659004927,-15.031765535491388,-10.361742103821964,-12.66404557189883,-13.457728850919533,-15.98825901211285,-14.863991102816755,-18.00195445683724,-19.182157371014767,-17.827825161525094,-13.324619793823132,-19.14823807143222,-18.162721749415343,-11.957706451251845,-18.849493547807988,-13.010751386073382,-12.172357935952839,-11.665578633747822,-10.628717308938572,-13.873268014789842,-16.43678410981185,-11.717314943816962,-10.098962843929893,-19.232126485560116,-15.19647978288667,-19.500020574720192,-18.464365403838773,-12.933515676672116,-10.651543215138224,-14.30167503374016,-13.396852465676998,-15.165173716206223,-14.64899445636999,-11.172087167342093,-15.650202656517994,-19.049615455739946,-18.68532704120454,-12.532972441134536,-13.665810809420666,-14.500953281244565,-10.476353232818699,-18.175976897907418,-19.571432820185628,-16.73806024475156,-10.019363166469972,-17.771070002398975,-19.04255569305525,-11.44655341239858,-12.683092293617817,-16.33615648299001,-15.025653152230252,-11.040769864031528,-12.183802490951567,-16.02355588098264,-10.541885777728213,-15.607909224998833,-18.651939352453994,-11.702849218182196,-13.184857486660215,-12.604480153129954,-17.101464311514484,-17.195616373646814,-18.017984201001454,-19.556173773229965,-19.798221168978255,-17.76919686373749,-15.091817565185949,-13.830661128168263,-17.223430128116842,-14.76472650830413,-17.610370240288788,-19.80925216970443,-16.90351885357258,-16.800848617096488,-19.211217373883443,-15.54444133254361,-15.336589258547331,-15.996392878786565,-18.479037136777198,-13.050876381059846,-18.757578234435492,-15.497410584768632,-17.76021323506587,-13.358476033300901,-16.766482825471694,-17.3218141319856,-16.56329779982401,-13.382850238024687,-19.63397569023367,-19.1386291427667,-13.121673963614667,-17.050833474661026,-17.861828717648354,-18.773326103617975,-10.452692136683485,-16.54461538985362,-10.022815069230226,-19.65013065670875,-12.71805383872043,-13.96788175070814,-12.122359530646706,-18.141259419534244,-19.705604160010097,-15.73547171630264,-15.09747153294642,-18.247193604685066,-18.88932703535407,-10.184460660108225,-13.616726788247247,-14.871132437457442,-11.011859242509264,-15.671302180796328,-12.945182378854419,-11.756302473000025,-11.658337931812355,-10.01779728501985,-11.757972021370186,-16.39508320302114,-14.704375504982785,-15.14212086145423,-11.482966912591465,-16.47591064651763,-17.290152789716245,-11.703523070437567,-10.4691374431218,-10.941890221404078,-10.642894257756412,-11.673879488194906,-17.679127421979832,-19.623978531125733,-12.279503242631058,-11.477863272688092,-14.662863064133951,-17.560485588815023,-15.395656729586445,-15.578121887108647,-18.0818735478582,-17.185624466822404,-18.302971147796008,-13.725719143190656,-16.259986984663392,-10.178045164016083,-13.93356238517873,-11.62610241371593,-11.16404544148602,-19.93663644010925,-17.31808022439633,-18.706432366202776,-12.682514049531088,-14.81386291028562,-17.200641746998908,-19.460940849964665,-10.708154773104166,-18.735871852533535,-14.953422250148922,-17.493185501012036,-16.871614538677008,-12.766243992657342,-11.547170660799003,-14.169723587104656,-12.127777742906776,-13.574785108384024,-17.142586047303045,-12.106926344168352,-10.616246029923193,-11.270846279340267,-13.123915358046967,-16.593056229378476,-10.174181479548338,-15.114831297285779,-19.37284367628718,-15.434151985926796,-18.60585681358955,-18.315439296077592,-17.752297864575862,-16.982405282519277,-16.170766486514268,-19.937812012997323,-16.31593327457837,-17.433269279709297,-14.163043854289793,-18.108751792672845,-11.701897632061655,-11.433478204094406,-14.401575549349639,-13.760199852827418,-10.934577967014187,-19.58462392550563,-12.236912124000822,-15.931641255022246,-18.26712630978746,-17.242241350780585,-10.511216154707217,-16.615333140911513,-15.563749558704245,-13.056674065501015,-19.723258424392036,-15.731414435669908,-18.161821012038256,-18.635259998622434,-18.80704695524419,-10.406839782541422,-12.675788445739627,-16.9172945672564,-16.67301157951251,-15.074298770577627,-19.09561783792444,-11.206551613606512,-18.745227348915016,-18.581216288663597,-15.54459619114613,-11.320606253139466,-13.18599449163818,-14.099041899873463,-18.184947502352525,-19.768641253784214,-19.412812609910045,-19.83598587318869,-10.29628927082696,-16.48672597994109,-10.801484817996625,-16.140111696487615,-17.971541910463134,-10.760716921563231,-19.2924020417365,-12.410966293345085,-19.898105533324784,-16.281681081453762,-13.525116645221313,-17.512580461523143,-11.565998410804475,-16.350714576556722,-18.33625984952206,-13.532423650651657,-11.619247951953406,-16.132002905767393,-16.38388297151917,-10.562613097078074,-16.22451180326176,-18.247086730799392,-15.365856087767497,-14.83746734488047,-18.020000009161908,-12.350762046621321,-18.84547437802415,-15.116192614076962,-18.13416840302006,-19.328918756715645,-17.587263207173386,-13.502131674140838,-18.60570299953492,-15.79151427594849,-16.954105031209032,-16.816831594436483,-16.945098238162725,-16.87080033368369,-16.250017517903142,-11.37134580769558,-18.617325013232065,-14.270914996706646,-14.934589062683624,-10.219646377724068,-17.01971265682267,-12.775699463548884,-10.862522037635092,-10.201623084740813,-18.314047007201342,-16.87872043014169,-16.218553570797354,-10.852453423701856,-14.452655163450919,-17.61668859657283,-13.236119163752992,-10.760839359240975,-18.158028848595418,-13.224192770890888,-14.675802958682475,-10.639629647166778,-10.777192007802832,-19.192409119625285,-12.048800274945354,-19.34274435694897,-12.902941032664488,-11.85189614725165,-12.88258226217726,-18.57984891329604,-10.17901719853684,-19.53875225187341,-15.728753241233255,-14.250944422653617,-16.281816379099116,-19.30395903740444,-14.711988278764313,-14.867912923201505,-14.779739859546996,-13.551915922078592,-11.55141545254371,-16.721955107065888,-14.79430624771102,-19.66670525298572,-18.28412322116521,-18.600404179488276,-12.548589653084534,-13.492842348221654,-13.668159707062784,-17.895452200898024,-15.759967169144245,-14.32441311946846,-10.105682621876944,-14.69441407357354,-15.46116478710833,-11.071718395099516,-15.739674471674478,-11.801811595954907,-11.132644580324538,-13.334480943767817,-11.53872493794259,-13.590927036247518,-13.886724637296306,-17.53137014689872,-12.114020452950973,-18.02434963549175,-19.350739640202075,-13.043206904716136,-17.693080835751886,-17.487971797266507,-14.202493725626354,-11.518518990728017,-16.28424902772382,-11.92417841212239,-16.531728383921678,-14.92948689982171,-17.13562645126941,-19.112302978057073,-10.832761671452719,-11.49331068610189,-15.547663074464626,-13.756060201849142,-16.053506678842847,-10.773304158058536,-12.129378465649921,-13.246101975378268,-18.734395451077763,-16.56171271519294,-18.920988850536173,-17.27534867953618,-10.609340239612596,-10.33903332956112,-14.025098974404367,-15.74609444337346,-13.520023865110335,-19.577780875707628,-16.47024924531159,-17.575637465903245,-10.638493813613723,-13.158762374499934,-12.269369066281197,-19.978094112793958,-13.461624105201281,-13.319216056771468,-16.026634170871453,-18.097485936061005,-18.36767280406953,-16.15115716584429,-12.45656369670378,-10.178536967307025,-11.136678920320197,-16.024361757166798,-13.771499157369727,-14.373129166367622,-15.097520899959484,-13.693903201203245,-10.60312667581415,-18.464714960829564,-16.7425307011468,-11.822328662375499,-19.034849874690618,-19.67883156890061,-10.88012062839341,-16.798996462546768,-19.71120721070207,-10.601332890098885,-11.956847987311654,-11.639976227597792,-11.057580065668628,-15.315885467019841,-15.28025310667502,-18.965708953447024,-16.824258983262464,-13.270233107818793,-14.719964605107887,-12.946320159897835,-14.219333830794149,-16.638952702655036,-13.34902725268619,-18.373230201986253,-16.311724378008442,-10.81983981503071,-12.185546942863503,-14.949085350345314,-10.024403413512182,-10.5855302599641,-12.153283510374289,-12.477356738118575,-18.959504639225614,-16.32088808913784,-13.427319111903397,-18.50337130793686,-19.666974997298063,-12.6484856242803,-14.907664626728712,-11.803213340130881,-11.107779518916765,-17.47207839520356,-18.84349209690856,-19.939257323081453,-15.085364761554862,-16.90114542056202,-10.837258962125427,-19.955830749689262,-13.73541182104955,-10.754370854067885,-14.33447754183278,-14.343347092715888,-19.560650212032083,-12.112703675032366,-16.30033851395068,-14.841061700089629,-10.417909731623865,-11.878422718756545,-15.795928500368309,-11.53826930336984,-18.63054406150717,-17.126505201072607],"b":[1.4555395353972211,4.643637568731707,1.222727621680083,2.118815071213219,4.536247742994217,1.932816092784273,1.042428837879651,3.921734769232753,0.8852493057725719,0.7417294297502752,4.559948769581878,1.1282255216993409,2.182404860991811,0.8862119406853131,1.4550624470538054,2.074006678268341,0.38665801762782115,2.705381365121297,4.803487610922044,4.466613425900792,3.973839429105487,0.94247419551584,3.094207117505441,1.8939933843682355,1.750347686340581,2.1793020739102653,4.104557080196621,3.6213199916071415,1.5429064569325224,0.6950143121586105,2.3230900365941345,0.11582021219702088,4.713738410525617,2.829070225529481,4.329422936612726,4.240427851403611,4.850368268511728,0.6342801374194773,3.1955582322908005,4.199528320475974,3.0864964655346236,4.74809688540736,4.489500642983929,4.832343045658832,0.9278583284290809,0.7763262828892747,0.7072556414198261,0.7991378111861003,0.7754159035712072,0.056210007116017646,3.2990432394433644,3.410817010976026,4.836289236521727,1.5879030811143624,2.632891279321119,4.5625910024246705,0.38165152438234595,1.509506488939244,3.849084582755593,0.6050563600062053,1.241393582087561,2.409355300469189,0.4000309992080464,3.25244284702506,2.602801035967138,3.949901777478501,2.2483394618714847,1.757960886416342,4.554810323182254,2.8246781710641953,0.5225035721132332,3.1648125829290352,2.120797359031097,0.6733173746339705,2.3655870885690753,3.4974006588130004,0.866480818748917,3.097984800436552,0.889107653548773,4.311112580548938,3.565454209602273,2.210091958142486,1.778602773775123,0.5158704234188827,0.9826276622637187,3.274774319776287,3.200464832402179,1.661656977646221,0.3602825692738043,1.7777602948346805,0.20269795674164093,0.6813560717105771,0.32051459028793916,4.000015653331191,1.2702173721116483,1.9372437451711844,0.23948450138617017,4.950239272072071,0.38361299495456413,4.517221121603011,1.3720816275804015,4.5773342152422725,4.573713544962663,2.8831627851475816,2.1119852026454335,1.9752458442646215,2.523663759306185,4.016648118187361,3.0122406358133027,0.008575577974038184,2.889683994338861,1.9733551976439279,1.2354175239223153,4.886024199018956,2.9005719837193666,3.214853120650595,4.428079595936525,0.15147800292280134,0.6416179972460379,2.254520953063517,1.1909557631698264,2.2773310328535326,1.7492757617403698,2.78591444784369,1.324476145818193,3.8291572531569953,4.070140027459476,0.4754286318490353,2.351669387598677,1.1178866526433084,4.927363163963782,1.3797402673045256,2.893522737478076,4.684678229686287,0.003989616657722461,4.776653981439718,2.8529416992933285,4.3000901368480084,3.1110655239624596,4.42613131458923,4.256887422182821,2.228749992568618,1.2788335632621384,2.4083233473240053,2.3830977369216755,0.15676009475486974,0.738833213537744,3.686015959296529,3.43146362009621,0.6060609795800775,1.8882883417562213,4.337947360463047,3.9490962719093137,1.0083692762410135,0.2407549491775185,2.930870202142568,1.2509952611397301,4.1706936092072375,3.7072650928966864,2.281128630365774,1.522039799692393,1.2757245884247914,3.9282764611240784,4.315097272218846,4.182261462497014,0.0837360117578323,1.5387718022607577,0.513426494625624,1.4313271545410222,2.306895676466323,1.653242115006065,2.58208165239711,4.397301756982753,2.6425321041668304,4.1176424530167735,3.365067581663083,0.7461106794222028,3.43717962167599,1.4730670862426787,0.6110032018359224,3.4959725149554757,0.94003719212292,1.7025189329083212,1.6861183386892853,1.1699966229706449,2.234883542213745,4.174686647617744,1.331868029840586,2.283050546402323,2.3823685319694032,3.9557828018360763,2.5282470371907753,0.7613087684902231,4.64404122495665,0.9509665260121314,0.24165260375519582,1.1971334090574415,1.0791600342951568,3.14186767703162,0.6486554084907403,3.370980569985267,0.29970834824137094,3.5314856909251215,0.5931833026880751,3.715706996674596,1.5444984819924301,3.043045359188973,1.41690060477624,2.106661552332385,0.6366663381276827,2.1212724958079288,4.285658691483924,2.3448127027690746,4.9431837468463256,4.636545348329829,4.967535162004342,0.7850345934751535,4.998795994654439,0.04339455903531575,0.07729931325444084,0.6868478537988387,2.2058614149886493,2.9468311516566184,1.9315069179641764,4.9704160336146606,1.16571947677803,2.1094108746978124,2.4234248284061257,2.204220742991506,1.8129330888387174,1.0996277907546859,0.4978059121211409,2.818793596026692,1.4212703566295515,4.804330364211037,0.798424898104042,2.46110068603444,4.168528897678216,3.113361096133578,1.1928547411629753,0.05792223697016263,1.3353001443310952,4.071162502589759,3.582848545818107,3.0623885385294414,3.1155784780792226,4.6624828552690145,1.819672078256146,1.8714090854076781,3.8913448881871537,0.07246048223041535,4.2055011145801835,1.486148733249254,1.0026667434148695,0.7906230934891934,1.1951127833544706,2.911613346788063,2.1552506585433253,1.422107663759008,2.3336027272704007,1.6616647344573643,2.311399502358744,3.090547504045155,1.6839762438248895,2.2780862663123314,1.3833415335849586,4.2186188309254415,2.627363155301776,1.6163031297622787,0.49240225008088223,0.5805481877750174,0.7576982164067203,2.0616842259433756,3.4704460719907173,2.846814119719072,1.7795536551160396,3.650279350533233,3.3832917882614124,2.051556437362364,2.1826346149840004,3.8763289560134284,4.008661394561685,2.301180210563145,3.580894281093445,1.8215300344067942,2.0013387108433953,2.6342169372804114,3.103540564236665,2.083948700018964,1.1082006351010476,0.25860466395276505,2.6206926364082928,1.998783763761841,3.3711767741173606,3.684472606565744,0.828263542043215,2.9002040396821274,2.170325922104622,3.617864784070118,2.759254943110955,2.686609582420231,4.438433475154969,3.891352815498237,3.156606542202638,4.026954414635474,2.3099424074582062,3.3502869565899873,4.253386548767106,2.682342399446985,1.3699392786764086,3.4784210257221746,1.80077912165994,0.4843191264850555,1.46768186842139,2.0226612288748527,1.4206659480946626,4.89825694815586,0.15183115064715036,3.6705683418322685,0.6548707479438365,2.6992188261509664,0.3835813408366251,4.954818438834949,3.094668064869671,1.985010866714142,2.6341116635090787,1.475061674096253,0.8936888734149473,3.8109549988023863,4.389483053991018,4.279974547171434,4.390564466824532,4.709223450116999,0.5925171098804893,4.169740585968134,1.3826310501841899,1.970124202074821,0.061405916394249305,2.424978493123956,1.356783179979163,0.6969645451127393,0.715172765639891,1.9846590230011385,0.06574809986206409,1.0051696791403797,3.5497327631634903,3.249661163435741,4.048213306263984,1.164644547278063,2.371985371332154,4.957314059689545,4.6957769545847485,3.7797873559180415,2.920469223054064,2.5654900579730566,4.3093263998185325,4.786701104269873,1.8802523863745246,1.0340982079169991,3.3250817311894734,2.2756425720971585,1.5304411902111081,2.074125079032707,3.5047382942427396,3.91066079497979,0.9091057168112326,0.8601917421621919,0.2962446295260446,0.41681170153935576,1.6771918023925192,0.29848328663403256,3.9675258099212405,2.031342503034516,1.6542793186434857,3.485809812181986,4.169409405965098,2.788739509029037,3.3972820960746453,4.935239442686833,2.262016328712262,3.9305926021012025,3.559630353736657,0.26430675593258957,1.2993649599594326,4.009744457144216,2.288621736927329,2.2371035377385597,3.8747063256016423,2.7199076443019865,2.944461695578556,3.2052873235643666,4.230081153900348,2.765852163694993,4.272158701256503,2.5597019578431146,0.2958476984396863,2.123724904664864,2.276496713176004,2.107889183262456,2.184654253408068,2.7632004497726284,4.373143441762668,3.209953171856441,2.304838253332826,3.6514684527469763,3.148371322257155,4.4388878193906365,3.548570829114186,2.221158254702095,3.572031694794936,0.6411595129700942,2.0083004308491725,0.7182402569073321,2.2436555194727594,3.3925102973206434,2.627995420021886,2.5054686900083323,3.9128878866414842,3.3838680089271023,1.4435547492832612,1.6231352463806037,2.5910354024344384,0.696059514629076,0.6159015843254367,2.3764199200055183,4.043641649268043,0.38967184133699817,4.393800551167896,3.6086953558322445,4.323925943741185,0.46175573474163345,4.380515493403575,3.618087789569114,0.08179578135932619,0.430636048989107,3.187441836885868,2.7754475027844583,4.616364596358978,0.8604229515493211,4.613890338361726,1.2538986474622482,2.907549940792685,0.7633445204093059,0.6260073432406432,4.155783857739591,2.638116492259164,2.0964095328186105,1.0812827901166555,3.5612370654338186,0.18376198820194922,0.880652975434516,3.303440853152467,4.671451906361314,2.2316460518787453,4.348365690666087,4.289037631780221,1.104257569032533,2.6547470844328913,4.742062775458164,4.3426126548532835,4.152920061387414,4.810357812728542,2.105602953306259,3.7823123143535895,4.892621801808365,1.687209375479699,4.056448007436327,3.48037751468647,1.052918292986188,4.444051449098826,2.1960645753277253,0.08111671917071628,2.526689251778207,4.410361316664804,4.722598074096901,0.30188941269847835,2.0360454814078297,0.7731628602551366,0.8929568508463637,4.382748836816093,2.978561386642032,4.551863218796555,3.9543730669095414,2.7909020145287453,1.2448814811820896,3.8613561489931447,1.8345978638194327,3.567390055256717,0.8867774220119962,3.2469919872511177,2.1502024091615013,0.05696079053241987,2.4672956213915276,4.991780607843844,0.9063686566838092,0.6311105317798438,1.2923493305458211,3.7430658601758937,3.5223820808256012,3.4908511410893417,4.419244269681668,1.3375656248485601,0.29670729237406324,0.6101309991599135,1.2422787392891788,2.44497443401222,0.9354235445167036,1.472630119735081,4.957686814588786,1.2833014197372161,1.7485444037789055,0.6473763693799206,1.8532937616202727,2.9585759642662177,2.018689592496509,4.54263525607269,3.621393545759232,1.097335316071284,3.8243320025389793,2.470636321867936,4.988986580302843,2.9310015134562084,2.782494720848361,1.4664268559409455,1.549387109756265,0.24859790927424852,0.40826750397965017,0.16499921649956617,1.8724243157286657,2.5597292576504715,3.754037771957579,0.7930408841234016,2.6074289500989147,3.4518548020683704,0.12081260649271286,4.466420589007657,0.872392036986509,3.381714525396019,2.5950596951065363,0.7776124575680499,2.946692071168334,3.8170971641212326,4.2352965712203705,2.719383556528685,4.405912763825739,3.718851629517459,2.433108894823157,4.016610024195951,2.582596511459747,3.3483627346224765,2.6770295691261516,4.79835616353866,4.437977990155067,3.414112075928558,2.667080098417264,4.492636771676737,2.9117019055891835,1.1481262675492854,0.3901235709287376,0.33365838637517853,1.56006828216527,1.9090394857451842,4.207177025586279,4.069009402160148,1.9018586077558852,2.9353204706915994,0.4450957147434531,1.8437296295517613,1.8348446368595805,1.8700002640867508,4.745456012347199,4.379889501831451,4.810318798012954,3.8381781276824514,1.7430366581163548,1.0599105195268999,2.1260504216496914,1.1472450050721839,0.5345605657758223,2.699990768583367,0.35421491887657086,1.6637120251489579,4.784261007874562,3.898857830942881,2.1928535886330422,1.5315413437530567,4.497616286233845,0.8711055967297388,2.968226582210989,3.79718605564779,1.4082270937843056,0.6953966604038886,0.9801516466598803,3.2405702720773,3.2627552892436604,2.6774255859900284,1.0301215681160358,4.516720478966435,2.8820696994134174,0.6198728477042181,0.6129622352818598,0.39074091300201674,3.4049938596607543,0.2763621216902401,2.237909456242665,2.322156976786464,4.022340600131772,0.39701426723323774,3.2706606615578315,2.1470829642384235,1.2595814912882874,3.4492089038279596,1.3667692273596554,4.711317213713912,2.385273523555005,0.02897364129399338,2.7140458935368095,3.119782213492689,4.261728849413682,2.5526711330752336,3.0340316392361864,3.499379718669836,4.186016753356855,3.3837938289126113,2.6277036274477474,2.4737704989711853,4.5642462108884345,1.0844082556652679,2.6118268456701954,0.4723505100343217,0.17055519526338214,1.507364959321289,1.5528949148329119,3.581395816019546,3.3141299370008226,3.916438520441441,4.728888790140434,0.08299517868185391,4.350402631427359,4.582507268170496,0.26227286274055794,0.7255314604589291,1.6187086829228625,1.9363851244937302,2.9715705748427403,3.988212784849331,2.96850887043717,2.3590580581723817,1.493998943383944,1.4140265928607998,0.4305192616844211,1.4185528995023544,3.680107180995943,1.236162285485115,3.1487655615733834,0.5110611780218122,2.987760987840332,4.485182166451491,3.157894768459333,3.2147780963814165,0.8106512045223202,1.7628963610435877,2.860035924285722,3.2599051361389986,2.7505026673010247,0.08217674442972389,0.4939531224292182,2.026849207399508,2.528867073729544,2.7991601094103746,3.7450778983727453,4.554384955944158,1.6569217257423186,1.6395418618438107,0.5113130036705682,1.7989521024606603,3.783960745291912,3.5226483357889338,0.9539334212450423,2.084962306392585,4.183366029620609,1.4611839962736206,3.152672014605138,4.840021927705944,3.2976457516799194,4.5076642948733125,3.782099174285518,3.913434203702846,2.598354987996819,1.4570049832606369,4.600572514892135,0.3613746259231043,2.779266527644727,0.3038184991010273,3.679967299331558,1.7995995546546162,2.9091135820087812,4.995160656077862,2.045846009608865,1.494565723130491,1.2612295675491902,1.9800735150704862,1.7923809019497605,1.5220898205154776,3.532306635467032,1.9264071837879237,1.2472945993464957,4.314073510725396,1.1969405225047403,4.904659247824514,2.5443558501583095,4.609871029822209,0.7375779187047582,1.5133952828468755,3.6893034845587005,4.875579526838835,0.01832941700235069,3.413630069012168,3.297222162514919,0.44588587954449865,0.32994340832825597,1.394829109780048,3.479654922111929,4.001034826449433,1.227054326269208,1.5081110451817925,0.324133858933241,2.2572984896852932,1.8276183138731183,2.9592339926801214,2.653435043685828,0.30024621163879717,4.301364582751862,3.885379040024307,4.536369606721928,2.176287267219561,1.0016784895229947,3.6255310023274,2.913594075480309,1.7061740062472852,3.3542208780521743,0.45590243068931113,4.6387249686155325,2.6327206367661695,4.224499497210729,1.7239404932634173,3.998408426106097,4.441337519420014,3.824848599787336,0.08758590708336844,3.6662167633249187,1.4935881066379852,2.983658767153554,3.9758352845793024,0.840333307799922,2.390724302493278,3.7610366436386067,0.2146479786684985,0.833349327863494,0.5767456535936122,1.6930972626218943,3.6179292509409375,4.944990337273172,1.728232087406898,2.0053102950153203,2.8448190520192886,4.106254836437905,3.657233839342374,1.674547012207449,2.8617314248052974,1.1151879799088993,3.2995651644299597,1.59821890943744,2.100080912754639,3.244190592848686,3.0856921575198584,3.653063983409792,1.3840958805439885,3.048816099167664,1.1367465941071009,0.15187798287538246,4.102095505887245,3.096887056331629,1.535197814755298,0.09208485017268453,0.44525567568043156,3.801477560799673,1.5600323196378774,2.0883394891414375,2.522852796805446,0.9353672302091931,0.15895137151070493,3.659317236048698,2.437062328494246,0.613960435483818,0.12530663064089453,2.6984190587171675,1.9851467809599166,2.4186766612479618,3.281490846594756,4.25940981096236,0.2834711789223854,1.2629921968339186,4.548339297655036,4.752097280702342,4.527483200913935,3.018051871255556,2.543874256096599,0.38655693124800217,4.550418224198561,3.6606009811237747,4.835058553545526,1.7717021334891392,3.9406672334128547,3.7593674252284845,0.5022006481375307,3.4718870207552044,0.15490192751049903,4.903990622747658,2.315008026382077,2.911998626694614,1.2407003171304376,1.2855477527457815,0.8961416267458822,4.976618538437623,3.7486718306543567,1.3379683781077167,3.0698265120170296,3.5879290249652063,2.953173779717054,4.662743685100529,1.7267174840726007,2.6409895392121996,3.5032599300870793,2.1842668134781906,4.658380438990072,2.097252821272444,1.0866294070516092,3.9332743167138062,2.6965999643480307,0.844642580745959,2.11974863357994,3.8216498571852697,0.6433951124350556,0.460711479482826,0.0070263816263804735,4.930224082500569,1.6802545796101875,2.8959484251774095,3.376426594226279,3.6101653964457237,1.6733872381011605,2.807568761956433,2.1252039388085953,1.4433753063820287,4.601724288587504,4.6989738333996955,4.862713078354854,3.751139137537182,4.941255477910975,2.4512912754625313,3.7128408873785657,4.949502154288577,4.1697219893286865,3.5443340248421262,0.07771006839212391,2.0219599998560946,2.6170456188795033,1.7414517773168103,0.5427020446818187,4.788903865948347,4.7092543488839365,3.076690391261736,0.3252296926216358,0.4412807020746168,0.7252497895073706,1.9645702701531653,2.124743751716456,4.651923778840661,1.2213258444400343,0.003254308560262098,0.5456477085974087,1.4043819453774842,1.198688609064933,1.1654780486089855,4.214830157154633,3.733827093487853,1.5333886835823884,3.0630725589123764,1.2216074298021462,0.08259018482034475,3.4708782885953293,1.5569915901545572,2.2123691532612524,0.6057525324467417,4.167076505353146,0.17381151512212534,1.1621353049031258,0.16200312179034948,0.8946876478291232,0.8472321586625986,1.4176584722095764,2.159474863189037,1.753540034379345,4.083843255979483,3.6147946192945346,0.7529820827287326,0.8974961919993196,0.9663291666985518,0.7378991944736013,4.313227569133432,1.7161890869734975,3.9012378544158532,2.290909454378566,3.0636547816632542,1.6890426372734357,4.8956732223373765,4.975056103530482,1.4827781548473373,1.4521244674479417,4.807055144135946,4.316130531148474,1.3675276374782308,4.784762321201875,3.006770294377782,4.100874686535474,0.2768736979756614,0.3119978196486439,2.382357578260088,3.092904228147375,1.8642505957939226,1.0455794865050838,0.42438917670780785,0.4318588094348419,1.0204419920475616,0.7286761392002084,3.543593727568053,2.2427406579932443,4.5104568380160925,0.3543458193319038,1.2684716256287432,2.8193710310921616,4.0620241789400975,4.505260372380495,4.236068925973935,3.533545015887741,0.9003474859589666,0.01287334933147477,4.880954538490566,1.8137277276555197,2.184149407492809,2.2461995166384274,1.2715423703689777,4.639404062847339,4.02387519007334,3.2107361334495197,1.790503955739421,3.4205231209364806,2.1732603143279716,0.7568583716851296,0.15901123234022485,4.57735848662192,4.579308410522913,1.0308336064922263,4.531966132906737,4.153566309855493,1.5466651035494006,0.7980807932533784,3.2528316386864873,2.212587246147671,3.68059639624182,2.0985504326723694,3.292556414344021,0.7885060470412064,2.2535959090593805,4.0501212707126495,4.4029482679359555,4.031413963105447,3.579680697905925,2.1184389219005895,1.618332931557649,3.0401280093584604,0.5553954207597245,0.7668988882144367,2.835439736237114,4.267050452534892,2.8962380120015707,0.2563188432078567,4.222901862348549,0.9582541318575377,4.18095767635957,4.283206414715184,2.199184392099507,3.1752836508643414,1.2584816238186203,1.6643830829575157,3.942677724368165,4.356365980019394,2.399897531894034,4.471046766820593],"mu":[-6.908515732844382,-2.0938076959984597,-2.5601260649931246,-1.0375239622246646,-6.518198089538343,-8.51320080245403,-3.745245292407735,-6.41805589450991,-2.0406145449397095,-2.5052541029457687,-4.338554919930817,-0.9823736054858045,-7.340685586656952,-3.433960909330349,-8.281259351399177,-3.699329071014643,-9.75799173134655,-6.7877878610060405,-9.496306347079699,-1.1707740427809554,-7.96052236596344,-6.446110717000599,-8.288915169353414,-4.975315477160851,-0.6458802911087402,-9.945054295215666,-4.793631192298012,-9.719815656945121,-6.836855906083715,-3.5921960961541255,-6.723211508862137,-2.502409249851081,-6.221442357000684,-7.57329003329586,-0.5109012441210958,-9.15064920940046,-6.1862990759682335,-8.21606774057553,-7.957893737415398,-4.704681947020315,-6.108093526567899,-9.20510548259768,-3.8726442981576836,-4.379498101915596,-6.644022578709652,-0.9955591571205091,-9.66223496393825,-6.149142174617836,-5.189100631679599,-4.606445018184344,-0.9461970386154817,-6.878316554742854,-8.451115419260631,-3.3710224020698787,-9.859783545409185,-6.709481784656535,-6.622436243663252,-0.43934803876192197,-5.002304818501662,-0.024559898533869085,-9.155057416032024,-0.16365969900383304,-6.130803753910168,-7.40703304737008,-0.09819463229931324,-4.440111808054987,-8.606824956234645,-5.327322192151767,-5.846440675188127,-3.4104240979001466,-3.4329349540045473,-2.566751208072069,-9.266518767608186,-9.142218878875344,-1.9446102179493985,-1.3948819007508528,-2.736266963748184,-7.515827917176772,-6.937757474045759,-4.2214024451769605,-4.209783317224243,-0.9041009472451944,-3.7539728069120604,-7.925319907618982,-6.909074531590383,-8.441049331584177,-5.781508525197838,-7.147463518041562,-1.7482511874665452,-8.703146784500612,-6.4109121951985575,-1.3632488114849384,-9.000701274733593,-3.6725340997475886,-1.4747846715994872,-6.412731430253064,-2.2661619321766757,-3.7241869114812043,-4.081589164792712,-5.5299253190880275,-5.901011287834505,-6.540395441121472,-3.4558892486622605,-5.48496415701393,-5.821666293678261,-6.219520377423784,-4.888312798948258,-2.6578055117161314,-9.59134328459869,-3.5684273616736695,-8.646245100984489,-1.2488311136300045,-3.841074952150485,-8.901784288528603,-9.669976506542621,-8.864982493965108,-6.197835241090496,-3.886396294781822,-9.3782386980864,-6.680291507246652,-3.4730606410237774,-0.04982508036491362,-6.968370274613632,-2.475951243275931,-1.2991611476066733,-1.259775062248878,-5.719754038168386,-7.155026125189352,-1.0123446670573055,-6.683007598301116,-1.033023558789783,-2.5918510501181813,-2.3062417532009127,-9.01153282460694,-5.74682697155213,-0.004526067997765448,-4.446429120507835,-0.07188208849872257,-0.8240306095823935,-0.946331861235421,-5.62069515011377,-7.593194317850182,-9.757224474017946,-7.242743679772994,-4.872587107565558,-0.36593117999067504,-4.968999585469456,-4.960589212928264,-7.939820032239937,-5.647260518475276,-3.929652533217647,-2.983554532470305,-6.233564060179977,-5.491906347196604,-2.9656783103630446,-3.715435557544293,-0.31577044667368215,-8.46608639406184,-4.971127670702318,-8.758229126963927,-1.4488625502242902,-3.308161258987221,-7.326101895088493,-5.574190576332563,-7.167043216043569,-9.687236384873366,-4.870255353345032,-8.467791989958274,-4.426998870517944,-8.214719073157244,-3.27925703048054,-5.355265177811543,-9.407911393425934,-6.512772541556286,-2.482848011503518,-8.78037078538948,-4.718164643501213,-7.0225982950323935,-1.6947831249875,-4.9094429429488695,-0.6277536358670766,-0.7963045413090342,-7.089569098028976,-1.9953013736134229,-2.128494750215566,-2.804756083933835,-1.3775223238243317,-6.042441466674027,-0.16708252736161944,-0.4161207838838177,-8.252394078963084,-7.017382163461234,-4.197629209910856,-9.270088959237807,-8.686193785103063,-5.361669011737124,-1.1958071165998452,-7.55545764806268,-0.7697835130485609,-6.668864297313806,-7.833052657231461,-4.443678620960534,-6.6677295502877465,-1.0288695706800777,-4.620909834686,-6.641517864115789,-1.239330753155976,-9.607012953150143,-1.194694755382384,-9.84637857709792,-1.7218616984530288,-1.0601496178824887,-6.204488135296566,-8.723231858650358,-5.492253196531287,-6.899812979506386,-3.6006110442695505,-3.7345284436588844,-4.16836290502014,-4.437784318275635,-0.7193839303909288,-2.458778747678847,-5.191891435223395,-3.690490417881689,-8.770872087999091,-5.819858422119413,-7.680053708633048,-0.7268773168341003,-5.764651500233073,-8.343360697360804,-0.453654950952902,-3.2469984690487497,-3.3608042419872097,-9.353970818882836,-5.065331810470395,-6.116678003999471,-5.76199035130891,-9.62332359515192,-2.6464467342028564,-9.718103984302335,-3.506231498953196,-9.608731843491299,-2.072607015341039,-0.5703991393717645,-6.63291929421413,-5.01553775743758,-6.226597737541908,-8.163342152201789,-2.735753091848836,-3.3250917740403962,-7.212059865112095,-1.8246937539658115,-1.8571551204189407,-4.267585885529284,-5.844286056309061,-0.43732082215033774,-3.6797226934594796,-5.289867007115296,-7.900045971482726,-9.451656916360127,-0.8330412097763196,-1.7892436436477843,-0.8829036220775666,-8.645454551878974,-3.8108207875729905,-8.289639770896907,-7.419789656556388,-3.2143513363214438,-8.891584758187063,-6.762929986136603,-2.765267316663491,-2.6212226347500867,-0.7306139132170952,-3.243061643039371,-6.989954394872995,-6.29910552134567,-0.7933346489752391,-0.15729799326741345,-8.417348792884214,-8.683148118746992,-4.865464500528236,-2.2081237802302556,-8.86793104945167,-5.268110056166235,-5.407953775867373,-7.218900376043742,-7.430188837053926,-2.491921330760871,-1.6415731725679783,-0.765403178689601,-3.5029707787777498,-5.681045130144273,-5.580935982006167,-0.5556589504397991,-3.2213516632309203,-2.8018772227226596,-6.9424944276877465,-4.194812181281908,-6.410085262386849,-9.729089892049021,-5.601039206033638,-9.846785245637248,-0.4179470661850804,-8.804406437863783,-9.70410342458959,-7.70874622061732,-5.649264448926408,-0.42022528397202885,-9.400449248448275,-4.986647196609906,-4.665067760986181,-0.8331378250815713,-0.4157427083301224,-2.591692519355251,-1.8014577304436585,-6.525812515510463,-2.121294110744365,-0.400014105258657,-2.5974498727984585,-1.4793591382278382,-9.010624943677751,-5.2061989487134746,-8.770207979056268,-6.031629564206558,-5.108766134467739,-9.036246922177405,-6.0151062713690955,-1.6651064194683851,-3.1607330884260887,-1.8817812672992473,-8.621679203388231,-6.4425297028910045,-3.962121006100199,-9.760959434149882,-4.294753830431127,-0.19350559392194322,-3.4528394762663184,-2.7237956259404017,-8.290726062594054,-0.8127891295261347,-6.810123629258205,-7.259754969329409,-5.485503038399166,-4.942511359329758,-2.848646177677525,-3.680024854578492,-4.702044609268379,-0.6741199737287507,-1.3540319696175063,-4.181691713553654,-6.678115948596719,-6.49459856637405,-2.6875019127316158,-1.9032534702109993,-8.153678200386052,-2.1321100625554212,-5.99509725898648,-3.9381005894769006,-9.81848872884264,-8.174803475759438,-9.95919527206475,-1.7152765459004304,-8.307200818518139,-9.919385076822529,-0.21263339186118335,-5.611185659265486,-1.2043188280408224,-0.806348086013926,-8.753838126605228,-8.581009737192707,-8.346592945571556,-9.720904955838353,-2.483551879277166,-7.055497871605921,-1.4430701431151682,-3.4737924466749925,-2.859526989645229,-5.19193947498297,-5.346457378697642,-5.417696392730383,-0.16664534681144927,-4.126970422325531,-0.9783649795564298,-1.5696008750026635,-6.815533055648785,-0.02463598037794057,-8.164227592297744,-6.510200561428303,-2.173001342639964,-4.902402970629717,-7.385605797111598,-6.252355466828588,-9.965428823314706,-0.4170761263046341,-9.078804534810697,-8.737629857991536,-5.926788951106587,-0.724937094247502,-7.112350620534505,-1.7976881919815235,-6.347972794337142,-6.814455099283288,-4.145007630586354,-3.2094529228136137,-2.3675989120141905,-1.8448854679399518,-9.672939636572861,-6.465177648383868,-9.438058594841197,-9.934358038211393,-9.248463342859184,-5.215967265086685,-7.912642323420956,-0.05920595323512856,-4.128386914718014,-8.054833211036627,-6.668978248558162,-0.38476307241344765,-3.3845245570395766,-9.321801962793943,-1.0569309689013395,-9.51443381850016,-6.04458268388802,-1.998393591164016,-8.254624609980024,-8.412405219864269,-3.432881114369466,-2.797283068646459,-3.7481847925660783,-2.557013715581893,-7.226040363105564,-6.734161619226924,-4.466832925964037,-9.137565107420876,-4.250278180568872,-1.4037229838124787,-2.6938119399272997,-0.34056895147889676,-5.871919874048894,-3.0455320588536394,-9.646258076446422,-0.2996611601503796,-9.08994497327776,-6.6870760337579505,-4.2279910676138766,-7.6896464904408806,-0.48355384251805633,-5.917290040936241,-7.046228044011171,-9.789947237105345,-5.534820756572825,-2.7285244390423524,-0.09871286364025567,-8.591528161635,-1.6926943479671652,-9.848149639245221,-4.654066526077831,-6.181596847337505,-2.766699655893472,-6.936029966894674,-2.9717153807803687,-7.902965514317499,-3.3834466437711885,-4.53172422604651,-7.7424102022538115,-8.498058066685505,-9.478233417611634,-3.521766708006171,-3.063593857823126,-2.5516220121786937,-9.286884366917947,-9.233859703109612,-0.6783057174146623,-7.357046818704318,-4.959619565090145,-1.1031891053712717,-4.622052001277299,-6.883476971172744,-7.021501511408903,-0.6080930539376173,-7.395151044807928,-3.1093461753201024,-2.820295530061172,-2.637468454460097,-0.5476267911682609,-0.4056734263880557,-5.737215132086901,-1.4554147546044383,-7.8725361716763365,-5.059035514789603,-5.83514803682178,-8.98697945233955,-4.495901933496135,-5.39838970589726,-3.386618086105637,-8.553013786257484,-2.6357561766350024,-8.130419183407051,-7.368200319149231,-3.798873933152127,-7.769583531916046,-2.1174089232616566,-0.739881759890777,-6.104897158030478,-8.946977243829583,-8.680425590436007,-8.260921670842398,-0.0575869106864757,-9.090156565669474,-3.626040383155269,-2.3889637064535263,-9.443633920490019,-8.486844814276061,-7.873620722658434,-5.591082405371801,-0.47824978444419575,-8.670937959077348,-0.14545843596394326,-9.90583510357344,-7.318943957076984,-1.0710577773320629,-8.664100328596295,-0.7418286944111552,-9.410328362515383,-1.6798757759776128,-7.892234016442828,-4.027399999946926,-2.381469776630092,-3.9522574782600373,-2.9880790010495506,-9.199444552653775,-9.868310907134646,-9.013284200581035,-5.986072046914847,-1.5691522418719672,-1.906867568079107,-5.8102555610114965,-9.761247118843372,-4.778659977799582,-1.028851642112194,-9.139011620276305,-8.038487508325964,-0.9824078369165568,-3.2317811162496435,-8.19836979237711,-0.21632291181075347,-0.6794586598841401,-4.854065010383515,-3.134346935844381,-4.005083452249368,-7.245718113116988,-6.993286132411638,-3.6276063149406834,-8.062387445647147,-7.999013801475217,-1.5651680724505024,-3.357417081762686,-1.0535789491963965,-1.4087775089319932,-0.05371381309615675,-3.158587898285876,-4.2343206645665905,-9.54613398042434,-4.757014111964944,-6.063176289185819,-7.417126218869459,-2.3843339173078215,-3.71202511437309,-8.80655521275511,-0.3123869345039143,-9.242854615396393,-0.012338850308666327,-6.319698376044665,-0.49138758715332465,-7.910263103898796,-2.800363041530769,-4.679122677425081,-3.3335645095532285,-9.456351498863436,-4.476022673297351,-7.7186352178699895,-8.40263724367177,-4.310063199433571,-3.986694689499519,-8.24911298469016,-9.605021141749264,-1.2406028893352405,-6.550830317920595,-2.090423162663111,-4.107322783086948,-6.868928406745338,-2.17293816090538,-9.938675393687104,-9.284320488348545,-5.633400442125689,-1.3114927181242586,-7.721099444574913,-3.3981462739421797,-5.616006992145657,-4.031763364208389,-1.0344156632455292,-4.6167400197553725,-4.651156676973988,-2.521922785219315,-0.21529928950076993,-7.841641514243256,-9.081489505643386,-1.923874443819531,-7.663995632329195,-9.997460203324163,-7.696096471483271,-9.609366794432706,-2.765042477964601,-5.751100705959491,-2.147205620443906,-9.626968239058083,-8.519831910715531,-7.476360709968553,-2.269894386454576,-8.04022264768035,-1.6830614799281696,-7.583657584107877,-9.036066803626394,-3.23681474001305,-4.892599401669053,-0.15966894726648695,-1.0408416476914484,-7.105801485690641,-6.636838155332672,-7.539651678034822,-8.38097801600533,-3.840432742675033,-2.1147946055353284,-5.346838115177572,-4.363157551631125,-8.55983452877039,-7.647439400689993,-6.689810749597962,-1.3601835745048518,-9.185603728898785,-8.894227494989375,-9.51288374337848,-3.2816553458273856,-8.125013207556728,-7.860096900928926,-8.464236463209886,-9.16069237478321,-2.428807690002688,-1.8789490981841928,-4.04343955781393,-6.010019841193257,-8.635573102067692,-4.867502321792994,-6.442199987953847,-0.5254293713300395,-2.738776724778469,-6.282245110242433,-1.4468713462675487,-2.86143196389822,-9.812035737527545,-8.825936852717671,-2.6818190955207943,-0.38171232681998957,-5.963963185189369,-1.232670524711823,-5.874237378491816,-5.360838908175632,-0.8226620826185749,-6.206293860428516,-1.2880291864860638,-2.536414908185649,-0.8471520264263699,-1.494386139743027,-3.1001281014658755,-3.7357620381577505,-0.01252110511261062,-0.3106051697676193,-4.575730743160086,-0.6134582597005211,-2.6169028802953354,-8.305311737806642,-9.11577997557465,-9.679158663584808,-7.981727879601701,-1.4468939032851291,-9.529889755335724,-4.715621655945121,-5.167071114896009,-2.88772588484836,-7.405548839553906,-1.30206913320694,-8.475412768835785,-6.168999231438708,-4.7514094408042995,-1.8380330231393782,-0.15185750328212455,-3.0320226586715826,-2.414065662269158,-8.715177430888792,-6.185170303578163,-7.162799204216325,-3.5717580378830505,-7.187434302638092,-6.506003339192734,-1.8632267827467386,-3.3773939532774655,-2.341888504636198,-7.458557077393959,-7.3972784333185215,-4.949919640779854,-4.082826203885405,-3.52793163397076,-1.9847750331523595,-8.115517853517655,-8.505994851928516,-1.9838759003141404,-3.2974467187853396,-5.05527035888695,-9.944203514319831,-8.34318654285665,-9.286756836520349,-8.006507401915288,-8.913078667620411,-0.7913934219342877,-3.7422397892013137,-2.4232674737334015,-0.9054444472737466,-6.404582623457669,-4.171989536611864,-9.917348566331551,-4.813108079976194,-3.5639386404337836,-3.2460648534955716,-4.728438389914087,-4.570534048631352,-8.327434888636132,-0.9887752281997297,-9.569813582296355,-1.1409893001073312,-4.501763975165947,-4.569465218109306,-2.306642286867646,-8.283552855260686,-6.904589992493246,-2.247551264171177,-0.8859771065854893,-6.437907118130612,-5.0115747957971735,-1.6031515952043263,-0.5879384596759252,-2.5747150972006216,-2.606916002493984,-0.0063630810064285726,-2.119572334412494,-9.68872051713711,-6.698602188576011,-4.653427208400894,-7.7159091481573805,-5.3824381295872525,-4.362560818876597,-1.7567189350521484,-5.123529380491005,-3.9897438659657114,-1.2007276668633837,-5.491482617060894,-8.719998466124924,-4.092475162747265,-7.401409740754121,-2.160240783661791,-6.8803256493446,-9.399484403197745,-9.195534062053097,-4.012411502531008,-9.363698821175646,-0.8602436412402303,-7.806486153807639,-7.46152124049452,-7.274689045403637,-8.172693913035191,-3.680114461379971,-7.745697195550802,-0.8436164130191215,-6.762604550743079,-4.722324565078962,-8.937994797929317,-8.086919588150908,-4.385158298841834,-1.3876418881095076,-4.926688486935255,-7.431146314705847,-7.229771624799522,-1.3606244059022932,-9.549378081772744,-6.10139568677601,-3.4923650875825474,-6.018983672201779,-4.334339852518221,-4.751063802466011,-4.855965891200995,-4.137981864579676,-4.017048309171192,-0.8794000353721731,-8.66708415800118,-0.43171202556888,-4.787883603321442,-3.3063166663003685,-5.784071902872645,-1.3925275341806054,-0.06475550168612232,-7.605470116695798,-5.950582562618674,-9.901389535438085,-7.989085475367337,-7.487306364413337,-6.312632545668562,-4.0301561957561916,-0.33568070489589985,-5.681647287222596,-7.145129046200369,-4.01948166699367,-4.556764482389861,-8.881747416396,-5.038683451541834,-8.246154354741147,-2.1861066482328373,-4.909987009203512,-1.7412998008265834,-6.002250109063949,-1.0608936232587562,-4.4783695021940435,-3.9889111254207443,-2.4813741501760123,-3.594316907985735,-7.728520522406241,-8.354160913018077,-8.940033765904463,-6.924926530533739,-4.426887604905643,-2.02129854874723,-9.259871292277621,-4.240469087050482,-9.840432149169944,-4.637510745203775,-0.29432115525314106,-6.188937778676236,-4.967066407738219,-5.284794368804471,-6.545164820316833,-1.7279801928371574,-2.4334545185180456,-1.6322964451733446,-5.902369682485786,-1.336176196405603,-6.657741250762688,-3.798093247818577,-4.418008869233397,-4.11017856154702,-2.8607454616464034,-0.25809346928136634,-6.410154228747711,-4.655054664643683,-7.964583088057324,-4.4428566633652515,-3.6420050345177857,-8.837831368493257,-1.6731241254400575,-6.142897362716013,-0.21439766765415813,-4.897366717346577,-5.243019205432457,-9.367911722265397,-7.369931085446324,-3.1691797528012366,-8.878022015682356,-2.1751112799143546,-7.947856703524585,-8.595801123751556,-4.109517314127499,-3.0803953961772246,-1.6308735174243583,-6.019788577824647,-5.408212484938413,-4.35262459468845,-8.769137461059259,-1.437299868010562,-7.917457226953215,-9.65271523504169,-1.5899021773665378,-6.253257955228175,-7.396590960083103,-9.843808561393182,-3.06574045857011,-8.556402598913131,-1.892493536586144,-6.4874619362996295,-5.77950453692631,-1.083792480083876,-4.887642558517267,-4.362962865019977,-3.7101830285094706,-5.362333595773732,-4.6212840811816935,-7.672992730299986,-3.2883669986824238,-6.355650890088443,-2.3143200297988376,-8.80225378801927,-1.7651401260734834,-8.301212109626977,-6.072872955763553,-4.578537482087475,-2.477522022303895,-7.704281873940085,-3.9661909935121287,-7.164613116029721,-3.125774179312464,-1.5095441602941873,-1.464975837687268,-3.8005014146024307,-5.525294334596755,-4.532045974043504,-3.9402208840425113,-0.5294747066242955,-9.827274673016808,-4.864525021565962,-6.434860247370395,-0.16802742584678843,-9.186561609969102,-2.504501934671326,-7.222827196053759,-1.344051520569165,-7.345260580535687,-0.03482757435398609,-2.7385852957944534,-3.415476786837315,-7.943081858571883,-8.128240662002305,-1.9026773806591168,-1.7812063139088963,-8.901350973352429,-6.625637319259205,-1.2647804780070415,-5.353738634372398,-3.212443598607373,-4.9547762813188045,-7.260662803418729,-5.371554311228904,-3.0851034645855457,-4.690312343564431,-2.9474395879874526,-7.434632402393784,-2.56847963045832,-6.8740004022020536,-8.55122745555732,-2.3830180854719485,-9.942190712011437,-2.708956789068502,-0.8610897899841441,-8.548569284434908,-1.0880617703535478,-9.112229240958975,-9.494421858409641,-9.587068323864912,-8.615032978470348,-7.86762875160274,-8.145529538321902,-9.709994555320819,-8.963726330133204,-7.323628573596459,-4.736109660556487,-7.567177057935083,-5.6133688473332555,-7.470194626740589,-3.445661314921622,-9.507444973506097,-4.436319507027038,-1.4319679684659126,-5.193201089026182,-0.11528517449995945,-6.254166263001062,-5.250189993318464,-6.990437401310601,-3.3394487326310673,-9.668138436297122,-0.6833663610095275,-0.8978660624850443,-6.2594181571512175,-1.7814074434240457,-0.18218735409494702,-1.8999557565968317,-8.274485737694626,-7.163902608020698,-3.7142495866995118,-4.231439891852848,-5.049915361242602,-5.578545398156605,-2.7663589829555013,-7.448207900819512,-5.128489749107114,-4.257730859973437]}

},{}],77:[function(require,module,exports){
module.exports={"expected":[-5.326042004162679,-7.810693760436141,-8.8282256600007,-24.38629993022939,-6.389779312825885,-9.586697091016358,-100.38831089757167,-8.196528314235255,-6.832844978280785,-11.452137089760031,-12.78448147740206,-6.234121356563575,-6.858826693334815,-3.793323220605019,-16.35346780554981,-7.136627378180713,-5.490577232466663,-16.30827663557348,-22.494476895145464,-6.214813889372657,-4.8987722858458955,-11.603143719270163,-5.977943127695448,-20.520800634622592,-13.330432575253765,-103.27536664944087,-9.707790125483973,-4.972227640875398,-7.927901906125778,-50.07253496259364,-27.74768481211298,-7.421568639691563,-13.659201118318009,-4.304705557252785,-14.291677205310386,-15.006785755634487,-4.875642894549078,-55.969142568053115,-5.963961721952619,-12.181362353716223,-10.859343443934337,-21.1605538362295,-9.02147435235222,-5.166694123651407,-5.3169731690746564,-4.908288126740423,-7.389673085786025,-6.528327303543872,-5.186856476722235,-5.40191752293595,-10.884756397001375,-55.67896096145212,-8.010743140501702,-6.067833413505916,-6.188513400304868,-12.100718260687382,-6.541966774883789,-62.67474111011979,-4.126560777489084,-5.736271661524167,-21.789465530029155,-9.682873792850371,-294.1235223518256,-9.203625510106203,-60.31301631109799,-6.023343811549066,-8.426832835682228,-10.347259780933566,-6.33472962247867,-15.788486410692197,-43.915285929912635,-4.769510522667105,-11.8224250762905,-6.706614104356945,-11.973500877285131,-28.053328491384953,-24.469326807219705,-6.657220685653996,-5.492463191803821,-11.3212327754689,-26.089451720589004,-11.066462899089633,-5.4889312657744,-4.32979197053645,-5.489504777499006,-4.696191998897456,-30.367964395436296,-6.300003301272748,-6.375480301543252,-7.42697429135731,-6.128180855004071,-5.0065921074320014,-48.42085848753872,-17.26152115381691,-3.6801889555135383,-6.43291702652247,-4.60404650870037,-9.717767494368886,-8.670086511247655,-36.71790011540389,-25.647565915675884,-18.100350525903522,-5.14363949897832,-187.04792383190772,-7.545442015136799,-4.197888885697482,-5.474874972652672,-10.34429624458647,-198.31351148574885,-19.83920957101543,-8.423402941295219,-50.977357622551764,-9.24337665607243,-48.96864724186254,-8.255904093170091,-5.926995166593086,-5.688446215017391,-14.405092110416328,-4.801917007606627,-8.488885714808454,-11.391870301943285,-5.967267149015145,-4.251129686230182,-4.1763436324134915,-10.099342520929182,-68.60513163481409,-6.938092694542495,-7.28139746796173,-5.552830078168174,-4.500000785646915,-3.411053487306634,-46.38323036160994,-12.511314559625397,-13.958151644254512,-4.535941547844166,-9.367961247690209,-9.394468632533622,-7.154408957357348,-7.0656355107089395,-7.821697956422898,-9.879842792068965,-64.94127725026047,-7.713548834448916,-9.380114200661827,-4.969293120644296,-5.262286334690519,-22.657613495972686,-10.659540461818956,-6.406578390721609,-5.9402795255149945,-5.846840531213901,-9.385754123015024,-5.751737132450337,-3.613975438797628,-31.212283300320166,-4.36702619737858,-7.073878041110518,-9.894416045642211,-8.843038179274748,-8.984016301532767,-4.873771212589856,-6.549506207019236,-46.80259971196669,-7.849437699030144,-9.438912242492632,-19.149394941734826,-5.022091720001613,-10.244582809167591,-5.325336877256525,-10.89130594648886,-20.844309296220647,-11.269095198874492,-12.258058810638971,-7.314923174642049,-13.057802222916154,-5.113274425266428,-37.389675212057575,-13.062413690201922,-6.444245137385025,-3.8078068422759865,-13.225206399950022,-6.486777072179475,-34.73664469836811,-5.7268633429933615,-470.7960798263233,-9.66752091741506,-6.879175978647855,-100.37461798662196,-7.9875522491913635,-6.2242640067213815,-4.87362324176931,-16.813604462603134,-14.818930854467423,-125.9910376638583,-6.77306681325334,-6.339180462291643,-13.683828695724978,-34.95475153992703,-6.596627995959835,-9.759253463761548,-12.738879899234833,-534.5884096371091,-24.988013920319972,-5.2266623547407,-5.910347666431558,-5.578212038767476,-12.960392382696888,-5.774664421496069,-8.895106677564177,-14.569073573643744,-20.28342666835631,-77.77655841087852,-35.08285024295192,-19.03515813933466,-6.890023337047237,-7.240709198822843,-10.71947006189422,-9.877502125403192,-314.36549212955146,-7.650764789854735,-6.285586766426988,-6.119519081118177,-4.479026206672623,-8.915265606651449,-13.068134879739159,-8.722614538366216,-4.324323753097582,-5.7449430814630125,-6.531522239648225,-6.440266072595764,-13.42516917344976,-6.446081019341359,-7.190905364202495,-36.425462128805215,-7.469351277412155,-15.195056548960697,-5.894614768024659,-11.765562696212633,-9.187199003882695,-48.1228502751731,-4.8191838661254645,-9.04950666981254,-11.294591586674578,-4.702070181819583,-48.81556977883698,-15.976640036130986,-5.678733293320699,-3.4936772868604806,-59.382539952021446,-36.332195990545834,-6.238463778084845,-4.638710126728613,-6.033344837986125,-8.679685046108814,-30.176132053092836,-12.679688722189175,-5.012219587979745,-6.936870537163011,-8.907426407831657,-4.0543043738978,-5.225581512956265,-5.64886774708303,-15.113431064926104,-3.8012614761858194,-7.329221012497581,-5.143799208993875,-11.331720974523716,-170.9999260535951,-5.3607403506943285,-3.9294385116847725,-6.0407347144991625,-5.063739382938934,-6.538291055009805,-5.044170963618177,-5.211711396982852,-17.851598152301758,-6.4070747832959265,-5.2801060129969235,-5.459407534075464,-36.08615385180548,-6.780620517006205,-4.785442957916203,-16.332581000403085,-5.717507292507694,-7.368189940059627,-13.058484138563609,-8.82029251025802,-15.827304446755754,-10.677521726568447,-9.596847814129843,-6.051433643965614,-7.600337799190976,-4.32515521750245,-7.12898290279829,-6.938848726526939,-16.1725190665515,-14.283852106945949,-9.587735205703208,-4.829235944227833,-9.101893812018194,-13.439012362455337,-20.827573942063953,-6.919302464859233,-8.216093165568823,-7.407488023245019,-147.1404337404464,-51.60912953305432,-6.521671016865963,-11.459898293459602,-4.754685365345214,-32.27902149214001,-134.09209907654335,-64.41932330469686,-13.912362019452976,-11.501781239787103,-6.071676864903505,-9.534467476361192,-8.541819029699145,-15.41103769117162,-7.044626766147047,-13.050660743402721,-9.609722973313964,-9.30884165346945,-6.02368323473621,-25.84539943542431,-13.601467052230358,-9.450951442837463,-12.021408321180727,-14.349063009772353,-10.115769406413069,-7.461998940497835,-15.590963522314684,-6.8146877627716265,-8.985707536019218,-4.834154894764016,-7.2992049813472,-9.75833705377229,-8.86449514258407,-38.578361244928125,-5.51514735259425,-8.963267489378984,-29.811555177856906,-6.395832402097572,-3.925429219341677,-5.449405873465813,-5.072474511640699,-8.317785259941825,-8.39408782152098,-22.417796516667085,-12.851008693841559,-14.26301270195701,-9.611875637243108,-10.509322139687837,-171.54484443490068,-7.34821938588458,-110.40125964578046,-4.970256459314071,-5.160853563663221,-4.386120739221339,-6.755077202940458,-4.4368883123321625,-40.56348823347016,-15.674895220455264,-9.752154949746876,-14.934786702342148,-10.359166485038639,-5.643506883738223,-16.631835193096382,-25.452284974039355,-7.224628909879617,-4.50134155944774,-41.867163727059,-7.006849333964467,-26.76740544664263,-4.895119017161482,-3.89282501912169,-695.6093794714462,-9.314732950287558,-5.709470642517846,-6.960525820836716,-15.082498120809431,-4.192946097468228,-59.48930529233679,-10.630485475458228,-7.248337558258671,-10.279539087254655,-9.832868786248882,-11.53224928563181,-24.409193000349422,-19.913355557981053,-5.874405716380254,-24.06098445795289,-5.815579559545663,-28.343330368579146,-7.074962625606124,-6.351693000339462,-5.984061393065039,-10.233126986443251,-65.97118347807252,-11.426152549616209,-12.038906934567278,-10.010332004767909,-5.625406834646686,-7.129861272762377,-5.119095924366978,-10.299387969250732,-10.64818783558755,-15.787328254257945,-14.970149929968583,-12.58292770664419,-25.037077313749567,-4.186845007529259,-39.353034622450124,-8.314578220579536,-8.85197881366773,-11.343336501915703,-7.576522367871072,-16.733296627883668,-6.493561900827928,-7.839494465040529,-7.050374893445507,-21.212694864579802,-11.03710263899777,-5.35952377311983,-10.395084891396,-41.506071721318115,-12.524416491763185,-6.165925683145015,-7.706732760207814,-13.727556304760668,-3.08523033660616,-6.347460570648335,-7.915475408139296,-70.20004788189478,-13.106592580388527,-6.103819113218227,-5.1239611051765275,-16.3624249060871,-38.79520444999799,-3.9219000381374984,-11.229950787304725,-115.97688912167757,-6.867219759107879,-5.133394158159035,-6.659568670968544,-15.135497405209756,-17.45776628550409,-4.5466414177717285,-4.722840583988038,-12.157175539227216,-6.815087562266677,-8.163337035836996,-9.083841431606537,-15.467485002691417,-33.602325712700974,-3.2415795232127786,-11.690066002247931,-275.98215266338417,-10.273291340681759,-13.70186945996901,-3.6586471004877112,-15.390913590134334,-5.09063281423624,-7.1255691004082555,-16.717153726244305,-140.1344435360686,-35.16310091045749,-6.897474121863359,-19.90509548230559,-6.967925349354715,-6.521647037751397,-5.367319884325585,-23.652131856646513,-39.24019183270847,-6.7740300684057075,-21.70018881992038,-6.391270517955442,-4.094260180263629,-12.451265928834351,-5.449683834848396,-20.0804721424846,-3.8096462832096605,-16.53172995022042,-68.3020142129843,-4.159631408133694,-94.64305169111906,-6.9954130420706,-13.983824742663908,-42.30475933239265,-7.0939574325679615,-4.588590108036813,-9.072446907780986,-7.366544712298805,-8.055934458172354,-83.95325144962082,-5.789234580575875,-6.1335515076891705,-3.9158788650606855,-29.209126351451403,-9.24233073655785,-21.36313934829577,-13.671668906739907,-89.4662134948789,-47.083192656635795,-13.626578479773412,-3.698574768986339,-29.71237391765479,-4.5969886726035005,-49.79179913781235,-88.64570365472791,-14.614695208955446,-14.945244221508116,-5.115843055290425,-34.08867918968954,-7.491488578484154,-7.068189813377913,-16.23686485723712,-5.672779603581945,-6.627283989329043,-18.457213640581628,-6.624860597238838,-6.3789221709725155,-13.788991494948174,-6.183510004295505,-17.079586412871897,-15.499638228258728,-18.77789395609638,-18.894652122288395,-7.956154868650553,-11.962887383065071,-10.52754925757302,-8.150066317255884,-12.903133063887534,-4.2349561801937865,-146.23530438490693,-55.29980291108013,-7.583166619684639,-9.234527523362726,-6.159305752112793,-3.985834136175531,-8.235960807970148,-5.871785306222636,-51.478095279890994,-24.04638896028323,-7.846525160658175,-10.693366780205057,-19.74232327380202,-6.857408203160958,-1199.7975697671277,-4.498298085594932,-8.545259548087694,-7.432771546065467,-18.919892137380305,-6.226137796584744,-4.455538189358008,-7.399577889312965,-7.103733291305097,-4.665815990717893,-8.060193585265674,-14.172482985662135,-3.7968807944813086,-58.41807017762074,-8.843243436733,-50.16707519191829,-21.52349342002536,-5.801832198625517,-54.04512195232997,-9.245440109113531,-7.979415727547607,-8.063991997002326,-5.890539407180977,-18.32673112894102,-41.76094427842008,-13.415935196865664,-5.950937723203103,-17.24867511217667,-7.517705915189195,-3.9916591407331383,-27.864481789954294,-17.23430429136792,-72.51830159602285,-6.159895594845852,-10.310417107625698,-16.411427273521802,-13.752283132870033,-19.304013213950522,-8.706759292300033,-29.269829160415597,-6.8383371073074875,-13.560999691131794,-37.08332282665173,-4.245418583331202,-11.334520647627581,-16.398283440476355,-5.701224355373922,-8.253342542726566,-5.423081398652946,-4.629140339564264,-21.491189906887435,-27.813957424822192,-38.9296623678542,-5.08460134552434,-5.794888567331943,-3.915185853829316,-6.512611760622423,-29.334450926195558,-6.264060001594466,-4.28054003913343,-4.562023744818467,-16.466508288690896,-21.474517998809638,-134.59012431207518,-8.984532643752758,-4.805542605303684,-5.8537562274177075,-24.543754873424124,-5.868248462335573,-84.44899371561708,-9.679261808815616,-5.865736030099525,-142.31524209895886,-77.99263800818467,-74.05620978381012,-12.790441286600185,-5.225325881325522,-56.319811394217766,-13.109705360190164,-8.342562530909534,-6.040405179147292,-9.41172837707181,-4.78430017804428,-9.385077459250315,-10.558883464440829,-8.58773608959694,-5.270700068888302,-9.057260709938667,-6.054562334494223,-14.975001114442593,-4.995683836588955,-5.816684597952538,-7.849154378517008,-8.806027508305673,-7.93963983272764,-4.753248929858115,-10.91266278026054,-6.6096003805117975,-14.307410612394612,-1544.8926186431718,-5.675625417426445,-6.787713616139977,-7.013436682666649,-5.974083785866889,-12.805920250946716,-6.165945638343251,-8.808098061977029,-7.284181749451745,-12.501754931050906,-3.6553577092093703,-6.311440248157633,-101.65175777889931,-4.685135994068573,-175.00817427876703,-5.819996259509257,-71.81283232376298,-11.80050282377948,-4.690469041024722,-4.460415307389111,-8.020898327636207,-28.518651121423428,-9.722480970280465,-5.850310313918879,-88.6746851443674,-48.0186590085159,-7.5279914379010195,-87.85661048278455,-14.313993687798801,-4.282710345129852,-7.129592481914156,-12.509059036435131,-35.327074485330236,-6.911135070305257,-53.06125969594505,-8.072990978775126,-8.286457692060916,-6.752668552568782,-10.262005191517288,-11.567085808710168,-16.29877508034506,-8.301493342623226,-18.340601035529428,-6.999480812279822,-5.0202926536684735,-8.221750175032057,-13.669190219918647,-6.786124846652334,-5.420972055486137,-4.492913580916131,-5.800818545454823,-10.903370598919157,-5.002969941479416,-5.459844007187299,-6.503070470998415,-9.293642889518543,-155.3064456740363,-29.338584889966643,-23.493419073612937,-26.629597948288886,-5.654312795328155,-151.49773623411073,-110.31452383237863,-1280.1385806428764,-93.78942011519874,-21.903809728561825,-5.717143175410392,-7.636495012581207,-20.127081021308,-5.764617301407845,-5.049271512469789,-9.795493827793738,-80.15376338181916,-5.884447309273617,-10.833591959177735,-10.64101788758454,-13.397265857608671,-31.290059332144995,-55.152235183834506,-11.614841589613139,-15.977196276206001,-6.807688333953211,-4.318310941803669,-625.779996863371,-5.83081501117147,-7.164960505948145,-4.254718333603141,-29.64209126458963,-9.154006333834836,-14.11952708073837,-10.679348558676223,-3.343264147490304,-18.203534319116976,-17.520272404915396,-7.233379890683885,-4.495407680885153,-4.123695975591571,-12.269025645290501,-14.508981514097476,-23.049628187043453,-4.754981058340217,-9.984142459826224,-47.370940523231006,-14.405708077417508,-15.238119985745676,-14.379030205751757,-14.642524928285173,-4.806123380008648,-4.263923349018675,-5.999405571517764,-5.743306297762421,-11.403449057536402,-16.425353295106355,-5.500399974553355,-246.02100183757037,-8.591154429087865,-3.2952136941904078,-44.106576716221696,-7.039983937906762,-6.090165492680378,-9.581943604821904,-15.818955031362274,-7.4904232800472705,-4.943684316319953,-3.501843992336105,-7.382928303041257,-7.402740842387668,-10.881178120920586,-5.140740609784019,-11.258712891572793,-6.483393588892977,-51.805028687876096,-6.355715116533262,-19.66005696231507,-9.104431692436114,-13.902940237898433,-5.85450235222635,-11.08744032932581,-9.244805783551358,-24.725666976911867,-41.22982769086835,-11.789806444004805,-22.874017816727285,-27.14725702537978,-6.011220851825661,-6.030122633666744,-7.897887199905935,-13.366119558228228,-190.26693780979983,-6.397768149864856,-5.830038571398638,-47.557851988611006,-36.658017904717,-5.114070695640197,-26.70977287418869,-7.913631894162067,-41.52350016559754,-65.68823589241242,-12.676254689218972,-17.521704973903613,-6.180050775711404,-7.528782289736306,-106.04837662151297,-7.785636971523769,-18.057131017578296,-5.274161647777225,-9.347464759996534,-5.138282258773483,-45.7437323594322,-10.895894542913627,-4.561244432416382,-5.906484876905275,-13.28305196573337,-18.94057945714117,-8.865985757417645,-5.1768658934736145,-297.2824225026326,-6.261370254283235,-6.643329807314743,-12.491635153383587,-4.206024281298098,-91.0360447500188,-121.5548034292572,-3.869181314678111,-8.009346010284586,-5.94649573720061,-11.492123152737646,-6.340007194862501,-18.80902143631978,-38.67431924378643,-43.42892342144353,-6.331723557101397,-6.126298742768113,-11.569901776465711,-11.497283435599641,-12.450258341241064,-5.516078191846412,-8.497054682548159,-10.31675077879875,-29.65908018556433,-6.365733646513098,-10.287449968742324,-8.483873371227574,-6.142417777335896,-12.999909785476191,-6.712466098282068,-5.304005135336866,-7.820745482184024,-93.91776560346028,-8.203893711915569,-147.6847700044472,-4.584915088405028,-6.790980956404068,-5.289764019168997,-10.973863634381894,-25.477439545289872,-10.200942919183099,-5.630235676770726,-5.599009628735254,-4.6459412272254195,-5.196361439554708,-7.595327239787236,-7.845851379190458,-4.877983006833192,-20.666124987966793,-22.758234753060734,-14.798428997830134,-152.86804760301652,-7.0533715226821165,-5.048282508414442,-5.217183469490256,-13.087494255366778,-9.117971111325145,-13.705251748604782,-8.427793146183186,-8.23587135891184,-4.823967670545167,-5.121512690337546,-7.7231982132044985,-10.216236058790207,-17.778516621048258,-41.823298367180215,-41.85689942356177,-10.149297283130368,-4.460440982768835,-6.416673466061385,-16.222143897770284,-7.725091867520618,-9.578165963690173,-10.205022838928471,-4.845298533112776,-4.3347526954142905,-10.438521436005349,-601.0268531578134,-5.19218269688795,-16.081592010382376,-9.206492135039355,-9.897176577456259,-3.678769320552767,-5.78438162440444,-530.8493895033514,-14.749496181189718,-7.00028785839775,-6.672585012569655,-281.212004509786,-24.56165500552972,-9.119571099389702,-9.776638148410695,-10.080149369746316,-25.385460796019075,-10.314006119953405,-4.656547820650151,-7.636306327176724,-4.312692786458255,-7.603219810383341,-8.541341141764462,-11.142494900684548,-10.946197532592171,-7.488865500499873,-5.512529215791772,-19.78015744301816,-11.84041634047901,-7.109595502118774,-3.950760335702676,-16.50101349609453,-5.756572551590874,-7.697366570603566,-19.88225366738179,-6.238002011299048,-5.655150686280643,-11.011709766163895,-6.4505522745237,-5.7282836531527845,-13.491946230576444,-422.5853433914927,-5.8527513583972155,-4.311013386401722,-5.995603147870241,-4.925553220973848,-7.97550180958491,-35.73608444444113,-16.526200367586043,-6.222128150992903,-6.173136324397109,-99.87159107715722,-7.50605085097981,-4.677266203885519,-24.136945140848727,-7.197975617859422,-6.537865730690629,-15.92759800286004,-12.446095883850392,-10.213114794817601,-65.73853807031297,-9.701272535399703,-13.037001019158497,-10.080540381571733,-102.3018418823205,-5.301534276653655,-7.681659717914105,-7.67441815733159,-9.812290395908022,-7.762872951033638,-15.062032776715451,-25.08236577860858,-13.941395468070295,-20.409625664643393,-36.59781868070743,-10.94339331015516,-36.967866433311116,-17.996227828812028,-20.241775724540712,-20.354503696076943,-5.5237856182675635,-7.862598488981575,-28.94436409358659,-7.1679260809657395,-6.660307695806136,-10.52200729969563,-4.575449129292359,-7.8262507530210055,-18.683003996424564,-5.814983312026702,-17.462388289834422,-6.99523286359294,-6.040561936646225,-17.945364024982428,-5.931321349950714,-12.304055660959833,-3.8465416059193074,-12.537265179121954,-27.281048295733996,-4.644216202456449],"x":[-13.966809516158046,-18.844267680797383,-19.52971243304067,-18.50778451053674,-14.614711185378555,-19.955806935317884,-13.62623681783003,-15.109036302117577,-13.908444260080019,-14.604936042404722,-19.516370324588475,-11.877488174005366,-19.98964505219788,-11.610199188933638,-10.416223823192595,-14.893652782897194,-13.81164096713221,-18.029279274755616,-17.154149753490774,-15.865744176293546,-10.097325279526688,-16.024299932728496,-11.707322819450638,-14.869791724642775,-16.49326716746702,-17.928986867929705,-12.923834914181569,-13.36623225881745,-18.563481045019678,-17.990043881100593,-16.843372380472772,-15.88034249106467,-11.852611426497921,-15.23450061610976,-15.778861661994554,-14.399761764945701,-18.679985250266416,-15.719349834531563,-19.58417631838119,-19.937439412686718,-14.94469006122002,-16.105258481848427,-18.686724912491222,-13.313451490253062,-12.939536822037606,-16.813906885111873,-15.798549657674128,-19.721814059798007,-13.79566244370536,-17.299661132655984,-18.538512891597765,-19.895176630723178,-15.258196696900875,-16.883304897516265,-19.451489217657535,-14.55694179908553,-15.942516371478835,-18.956316377041954,-15.183815313205947,-14.530562383919987,-18.10418382770576,-16.249309441992892,-10.046143750399576,-13.906314481592702,-14.10879843109923,-17.959801923893785,-13.75911301815279,-15.942305032306654,-16.174122442377556,-18.448763834423065,-12.549094374552233,-10.011396838048709,-16.643456566734244,-12.839905070082738,-14.082178999835053,-16.42140567834033,-19.18767906903842,-15.980067695519285,-17.075899950032053,-10.237902177835847,-19.948556955420994,-11.676508276687901,-11.591241635279086,-11.28551269144503,-10.829193566185786,-16.1505934592749,-15.79901357780384,-16.678729142126894,-19.251740722684417,-17.861718075961782,-10.278636622552607,-11.550309203136916,-10.120911028893753,-17.96100492829705,-10.621541054782508,-19.951267188428112,-10.10770249435032,-13.030119703313723,-17.585642273770432,-11.153149280685737,-14.566222605961993,-18.00893547368525,-15.515709338155784,-15.984947882321736,-19.26303519397087,-10.59977109496028,-15.392093059679663,-15.45823792368938,-10.881174092855868,-16.35613226020051,-16.669931572526856,-17.747540091039,-10.448283576607519,-17.711402766818892,-10.285397781704894,-17.614191130677096,-11.087169084107886,-12.007401389947374,-11.019448442256765,-17.78516973094942,-18.650097686589255,-10.236772848105545,-16.443462126311267,-10.241742316368065,-18.237647313580332,-15.517092133082315,-17.634995380058832,-18.92348735148089,-10.05401253317834,-12.672659623580902,-10.733936136180386,-11.850424759654864,-15.296085155300439,-11.699158436809697,-11.120613348863062,-17.582208361963332,-18.840877139755253,-14.603614211084137,-17.091181440564796,-19.453368833499116,-18.770480331286638,-16.402797387609954,-10.153681501902447,-15.795447630595811,-12.683555311329577,-15.307763006114756,-13.57810622332054,-12.865001813782506,-19.288729737359425,-10.627636991385597,-15.56489607537572,-15.061974403448179,-12.404594317698415,-11.007197603697493,-16.662252597508548,-10.197932843440977,-14.797728631891117,-15.611100546681032,-13.580411922417376,-16.311936357897068,-13.415273043591029,-18.23829482762346,-19.08700856737494,-12.339148123800197,-10.354176392661111,-17.921316891571315,-10.894505927810192,-17.77238253355432,-10.97912918963026,-15.185856311020379,-18.708759629824712,-10.720016161132204,-12.984011213594965,-16.893309176136682,-12.054188105592578,-13.566475398153452,-15.82067063511855,-14.552611864422829,-12.655318011249397,-10.164417479175036,-16.07095063468887,-18.77273721801744,-13.772464193403737,-19.337995726728195,-13.883224855687166,-14.436146314668804,-10.38636990495321,-11.991389172877412,-12.27094257896258,-18.409473964353047,-12.310561043109825,-18.4957613699417,-13.544107001496382,-14.591712966184279,-12.134129825561445,-13.457326168835646,-19.814676466344885,-16.347603771575884,-18.593675223233646,-12.652609018945174,-11.41008278769714,-17.329625885941894,-17.158731907754543,-15.045320873973775,-15.042067564908184,-16.24044627665911,-16.942777616341655,-11.530620576514599,-16.054380652280337,-12.276380133574856,-15.31450615512172,-15.901175139311178,-11.464603289224334,-17.94320401775597,-13.613011045165187,-11.295365329918926,-17.649201866781375,-19.26107367015263,-13.97274249558157,-18.241990522585642,-13.22700182951937,-17.40949492931641,-16.19470945873912,-10.788161690545678,-14.64673918763934,-16.4588871222456,-13.904572148701195,-11.170873733716215,-10.601496972821954,-19.61614372941064,-13.526301708117145,-10.309011043880725,-18.6240962108425,-10.99485443430833,-11.804464992660602,-15.586986454002197,-13.60016227323625,-18.79214932954271,-19.590350158856467,-16.50383018454757,-10.217627024406923,-12.961668031148912,-13.948722689810168,-11.069165163429265,-12.504657024063949,-12.712873034583618,-16.963322541393573,-10.691138150009445,-18.9301424056595,-19.664385275848627,-15.104263979120713,-16.41976747491451,-11.081486572175947,-19.41264311144121,-14.850582340553753,-18.077518955165722,-14.64770357608103,-15.838461695910137,-19.983655194847525,-12.503109500755937,-18.97915465309865,-19.311508577719515,-12.233932427395517,-10.820071278668484,-15.814044225332147,-13.681560442547049,-16.283491391347575,-12.892060899259421,-13.104786667644824,-13.121336765179102,-17.094025069420553,-19.985183268210008,-18.410607572018623,-19.6117753349803,-11.263189345341901,-16.885805938900063,-15.48138266965097,-18.17676597787528,-14.480807517947232,-15.273423828478043,-14.870231146279862,-10.294112177342782,-16.38382050816087,-11.365313766784775,-18.413315010895303,-15.759929742776377,-11.428480831217458,-15.26597218168817,-12.027524649704864,-14.051871490072177,-11.049615001041257,-17.202556313554386,-10.304238802332431,-14.18410632457866,-14.454897646927105,-14.67431980929524,-13.864142019633865,-16.524380594356607,-13.621359176927845,-12.546183733962895,-11.901722206718759,-15.393907621100073,-19.091775640907855,-18.1258510346205,-13.028353928052272,-15.330675340450252,-16.98591371791443,-16.296169237405945,-12.032098990726006,-11.023456569249282,-13.9510747482878,-18.024571027317812,-15.629557611026874,-13.91231941557956,-12.929364974027449,-12.157496581760894,-10.37407375375615,-18.111986416078768,-15.848937539949953,-12.80888593080526,-11.830681641519575,-16.77861906077039,-15.146003790151905,-16.975670598685195,-17.505903673998183,-18.066333482830103,-17.6021165263584,-15.367730252751974,-15.920044702539771,-11.421680622367901,-14.877187249676489,-13.425779182744563,-14.111554397302676,-16.94025502709263,-10.488747395688598,-10.930056713543713,-19.431761304186168,-10.281103709053776,-15.277371021381189,-11.384092046527535,-19.958265018975343,-11.689366031582633,-12.001792339740776,-10.049936762605572,-19.405818954480285,-10.664994813907729,-14.249087265314602,-17.733989307969708,-18.434332651997693,-14.601759359563566,-15.202464042041353,-18.06501354098544,-17.083519790703797,-14.484403334147437,-17.713640655765555,-14.21651090345247,-15.814146686353336,-15.059084403200718,-14.433948417442322,-10.400161605848453,-10.714107287584735,-16.08437503192492,-16.221976650051563,-11.177854165365062,-12.104919821394466,-17.387846984155445,-13.822654354557965,-19.015426776546818,-15.762345883243603,-11.843934716591313,-16.164616439859305,-13.868689520848825,-14.239864043373107,-13.38479966094431,-13.268780908914586,-10.794249947331968,-14.689839256857107,-12.702793242048923,-14.29428936837477,-14.623357305608062,-14.075649470586075,-13.481014437654547,-16.107472862545926,-13.544709042351764,-19.71928332173092,-12.786233565443535,-19.34229954892447,-12.998770620196451,-16.37878460222961,-18.41906823413121,-11.279364165317244,-13.885527204157889,-16.3700325471073,-16.923695901638173,-10.598431013079912,-18.281301798052315,-11.195657964414885,-14.56090986146462,-17.321132869914138,-16.78174133050179,-19.924276781546514,-10.512107674821682,-13.745978242749246,-12.2080879998709,-15.807523384562394,-10.027938610918367,-13.351513704239437,-16.210751479817265,-15.844510250430556,-11.109471887445858,-17.173679035538218,-10.63667306896714,-10.301125066608439,-11.475856335881222,-16.295616170879683,-10.610105745450012,-12.820974499740561,-12.80997055078561,-15.675898821357181,-14.444731820046123,-15.169258675923093,-13.52705420826716,-10.813160355281127,-18.04602216774257,-12.748188206136748,-14.507774800799698,-16.793722166579105,-11.74423211893306,-14.173941298881722,-15.208724310395139,-10.803382994856022,-12.617373099544771,-12.154862510599475,-19.321633387803185,-13.737411960185517,-11.071136834681795,-15.217846821381071,-15.11573621571162,-14.136271885319879,-13.189045130376723,-14.017695375692051,-15.3799073028218,-17.348925307571417,-16.3385681407898,-12.445551570273848,-18.620784301315297,-16.839769804668855,-10.935839203967834,-12.482782363874918,-18.65832765999115,-12.858396696432115,-15.373853633407677,-15.019129658575265,-17.89561896673878,-11.855702569867354,-11.439366134587374,-18.552334442908666,-16.84756337062915,-15.9728694412133,-13.911142233374163,-11.60299401059868,-18.332163403714944,-16.852852990638553,-13.906854913713797,-11.506232442967262,-17.77527609791317,-11.160721880345562,-15.216218202874236,-17.26771733287832,-10.565972905922571,-18.336357432727784,-18.48952890442317,-19.44627607095822,-15.399778559693829,-12.967091327911684,-17.864508830926333,-15.98358762444267,-12.391128479408318,-10.747876766846595,-12.15217782542898,-19.69135337168271,-10.139633372659514,-17.071051672383568,-15.614377971979405,-10.705006078258247,-16.034913650395374,-14.425792542940329,-18.53695692868969,-19.042855366126027,-15.554560588557592,-14.074211784038544,-14.413840604656066,-18.03209371104669,-18.7953986451022,-10.040736724413513,-13.185884702882035,-11.598206643849254,-10.995361444842775,-19.5357421641217,-10.443975153307054,-16.980097119289297,-11.320907560003057,-13.747215666812242,-19.175854195189753,-18.776518670942718,-10.059193647859814,-15.258451999341931,-16.250678201865572,-10.400794022558344,-15.093653920259058,-13.76955065135376,-11.576247669085408,-14.053587607075036,-19.817864797284603,-18.032438299898367,-12.461975708158175,-17.590704117205654,-13.223060265341179,-15.525496126022226,-10.440739331133024,-17.363474882082425,-14.621878396884757,-12.5215640841378,-15.980928050616647,-10.99609267921675,-16.898321870187846,-14.548719874924299,-10.360799225508002,-17.033676243758606,-11.575640108630722,-12.472891753804262,-10.726927942554969,-19.73718777416375,-13.107650806895387,-18.051136902696292,-11.620225214272361,-10.631270850533692,-17.878028085650357,-18.729856084734703,-10.926301203170146,-11.75575893456669,-15.300204170211963,-19.846523617903426,-12.993835253571024,-11.144839838708172,-19.88464750658521,-17.288181068577824,-18.00528742173928,-19.355832559503842,-11.946667428903321,-19.64714175394601,-12.656145020230037,-19.133499748986207,-19.495793288114275,-13.746198804280777,-11.441415974677728,-16.85769025042745,-16.767929654714596,-11.76712456447146,-13.96557008161446,-14.921965680756962,-11.779810179299782,-13.67723367002979,-15.294694217171056,-18.227868897934215,-14.330674491054454,-19.985657777946255,-14.991045963708082,-19.12902052015217,-16.61529020902307,-14.738154006471627,-15.742054314261102,-13.073330305685364,-16.205732750953135,-13.472180883639568,-15.787225702356531,-11.353306253344558,-13.116120338725084,-13.271230305473331,-12.919447130766606,-16.274425109144687,-11.015673113279188,-11.885280355363543,-11.751983802609711,-12.743889568287747,-15.595768781013952,-19.409532553951507,-14.48760045621598,-12.700173087910924,-10.654401113517231,-12.676283390175254,-15.31525698303482,-17.43683589937923,-19.868849993973974,-17.011310380066263,-13.668574235178959,-11.86878040101693,-12.966291549670535,-11.96357141776308,-16.844395567173887,-12.885571598074414,-16.143308331231715,-18.0659901451857,-13.777965554186839,-12.558801005269862,-13.28151749732328,-15.162867256077151,-11.955801375531118,-15.543532090770801,-17.812709491384627,-17.32508704117769,-15.858799923896216,-18.071763983500293,-14.066351573397789,-18.034896130745683,-18.638487597363728,-15.288578646073708,-17.201328784112977,-11.922318979137659,-11.052703675214744,-19.63278920168776,-14.805915063378382,-11.118122680608753,-19.010824299186392,-12.81077671363108,-16.229480841666064,-19.54381357533876,-18.562157893060217,-18.183039241867718,-16.188668749071464,-14.581889989956903,-11.732900706512215,-13.252129588377182,-13.881875966791037,-15.059937255001719,-14.751888693930821,-18.656382669665685,-16.1995877233133,-12.834042275796191,-11.915018795903737,-10.970140841928524,-14.974064698562657,-13.50578072305996,-10.64457158482475,-16.47123866530446,-17.629453687894433,-12.219035124279987,-17.597359018332003,-17.82156258014974,-18.681087236933852,-10.464176150878297,-18.861459705221037,-15.644515572540689,-17.712679075777682,-13.701684920682577,-18.454746965539908,-14.222016395181914,-10.436912250037738,-19.87939445852791,-11.683897668983626,-13.720354531034324,-16.0181921248024,-19.902263293037798,-11.759813118273195,-19.025572437338298,-12.992788808786475,-14.368403647184447,-18.40412806279473,-19.1433405341797,-15.100652109031556,-11.436703449145737,-13.760838966559358,-10.491924736255044,-14.405226736702168,-18.994869184868445,-16.53955122651337,-11.935353294229209,-12.309056592831906,-14.089805371510932,-19.54923947620372,-10.958677255523735,-18.9546705915293,-18.03649938610791,-17.381226869278017,-15.962079921737056,-18.972877380678387,-10.464319282615946,-14.543481030529872,-17.623204457908766,-16.101279607782526,-19.82446343108994,-17.046976748048795,-16.6755976741534,-18.75345789144,-16.036997153753692,-16.673186979802278,-10.515523594606645,-15.484377092124415,-10.740005634700328,-18.903787122146497,-15.651699393047547,-11.539823142375953,-17.148803169877944,-16.471873212105162,-14.905682417710453,-13.875120624817352,-11.533298471908548,-17.764448745285698,-17.84005203878646,-19.548763861262334,-10.227167847873567,-17.725849228186835,-13.306496407218493,-12.107741154510638,-17.353841456029578,-18.21741705702525,-16.16133153172608,-11.981291663104944,-19.846159414593203,-19.571772728952258,-17.155855780054523,-17.116340399146928,-15.239824736980252,-11.085711570918829,-16.639570059310792,-11.444053609949416,-17.67501639675561,-18.303748212943837,-12.630638429506085,-10.254823611205193,-19.72877258839361,-17.562745286452813,-12.053160121343174,-15.999732282437481,-18.73346367383324,-18.515474143850373,-18.11595160725536,-10.59580339491445,-11.366419911084968,-16.744567047803695,-14.949650697210927,-19.451834229961214,-10.156193027958187,-10.035736686000767,-18.62203756088584,-18.306258186843486,-12.001452988987655,-15.407267377181771,-16.877026002314114,-17.019734199868786,-12.127259293653172,-16.868328041001156,-12.666480295897697,-17.646489335691015,-10.833258984330296,-15.08802904980411,-15.068216785150694,-16.042342564689317,-10.85171439992653,-17.054224490381444,-15.70141843126837,-16.007912589849955,-11.886841443703307,-12.576363312750532,-15.044388779567283,-14.304773665583907,-19.6404484319048,-19.056501593101252,-18.448961676885002,-17.2018738691914,-15.731702528972853,-11.240126069476105,-12.154529837276929,-12.747291379199396,-11.140115872527245,-12.025600533746372,-11.416182553206413,-18.015625327370522,-14.780028082278779,-18.842560220389736,-14.631085079588509,-16.107971581669137,-12.680902718835583,-17.36463436657702,-15.338941649568408,-10.552228599797342,-15.89211680917642,-10.389088179676424,-17.915168522601466,-11.604614749866663,-19.960525886016462,-11.499080246491246,-17.88215906087028,-17.324629627252204,-17.19815036192337,-15.06624625130183,-13.868716483626946,-10.63528618274005,-15.615990130722714,-16.989067238558672,-16.577637087403193,-10.790608740800021,-18.710677686860645,-15.235944748805421,-14.264893870446599,-14.158091213906873,-15.305089543036326,-13.564286135872814,-14.540422655082875,-19.95009323282035,-14.758359017043844,-19.331920688727703,-15.039895587089163,-15.326342854087915,-12.355891072139578,-13.905099777270042,-18.555316424376926,-12.909062147334431,-11.98691301118825,-13.411334474361938,-16.655738692870198,-19.05175398359119,-10.492372564259405,-19.53396878111687,-17.39366069734741,-15.225615492528423,-13.696503600074008,-12.081227077200696,-16.916510534020468,-15.415321980179613,-12.80273524776174,-10.045207801153415,-18.856893545187205,-15.986951063074226,-16.124700732591442,-16.683628105492936,-10.17025704429339,-15.616847862350747,-14.462021097338347,-15.780366353679407,-10.131803086299175,-11.884720777355984,-16.37222960231285,-16.141855499247164,-18.43670668066665,-19.547088270952607,-17.63985858689741,-11.247022270123388,-18.619332465729556,-12.575345494805752,-17.542749811483237,-18.51732695767235,-18.457963327646357,-11.013051600633084,-12.987644039157129,-10.889320127703375,-19.72688030272852,-19.497724501956796,-10.404432491210471,-16.420243113707826,-12.339492839276264,-19.986929703783836,-19.399247379850294,-19.468007123326355,-16.314490274939754,-14.073606506098216,-10.964856604351569,-18.97022229861434,-15.81574688215954,-14.325606737600049,-14.953130308794025,-17.33861371958334,-15.718974531995304,-16.30746008965462,-12.068342917583452,-15.403742785200382,-14.93883048455806,-12.306649138611018,-13.822283385918281,-19.918660438229104,-12.096527525209403,-19.412792433968217,-16.791739781060354,-11.162675734685042,-14.460549194260572,-10.817705376527918,-15.746390174266873,-19.72634854974101,-19.133010180593978,-17.11902157045207,-17.62983147983292,-18.420214886025267,-17.374200472851157,-17.72437601106325,-14.666020172115806,-15.80470133275722,-10.432251337131909,-19.081703425308906,-10.757605146589253,-14.92749538929556,-19.04527719571882,-17.237288573697846,-13.104893788692868,-19.88279389777523,-18.360664915122555,-10.45318945837707,-15.918934417552478,-19.775645140632545,-17.837427931539626,-16.23133286660261,-17.00863737817872,-13.69153740628039,-15.36746239568295,-11.550016309192348,-10.462566447556199,-10.768378367142677,-18.016487512643064,-14.117858395653338,-15.572859083128199,-15.224272453907863,-13.788481342176626,-18.927547433135743,-16.821295099798515,-11.391343756221424,-16.299156598672973,-15.010862203918766,-12.719283726512735,-18.88801886169083,-14.690651948321436,-17.32451518006603,-13.901562338177937,-10.9809334489416,-17.14726420665635,-13.85768087420817,-10.691880220755131,-16.680820690728577,-12.119657390341361,-18.767306017416885,-14.457699840210063,-13.622405214625326,-12.861279013026534,-10.441465422448912,-18.379596077231266,-12.768309488851003,-15.800658794281787,-14.692443898228085,-19.757897528731345,-15.320654395449505,-15.976364870050624,-16.42730760840523,-17.291442093008797,-18.933884729557786,-11.159625761539205,-16.090853092182172,-13.256348663428486,-13.068758774652762,-11.272118330405295,-18.180670733838227,-15.001887100431311,-14.702833692983974,-19.724931783962468,-17.63505487630873,-15.619986834769897,-10.612047568558445,-16.511978494393414,-11.88690742535546,-16.64836047564267,-13.507109517923396,-11.131473113554557,-11.83831556690871,-14.539620150870913,-11.639763321467287,-16.366263354503037,-17.47531860008684,-17.77166110401182,-17.09355824109021,-11.851250096425385,-19.476353644209755,-13.717588898542841,-10.098672590110656,-14.24722608537685,-14.054063004410812,-12.201866126719906,-18.34266150754062,-12.40664114596285,-13.14709428831858,-15.515941034926115,-18.341683819525972,-14.51175833155676,-17.664817586969125,-16.07308354400979,-15.631460604483273,-19.162889352166058,-13.151622581085281,-15.993421974615972,-11.100944780188676,-11.152713783918085,-14.625188440403836,-19.941636881034242,-16.04229271095367],"b":[3.2907925656691672,4.015740372661374,3.279839157917185,1.0882269471599904,2.998896372987349,2.715534103810595,0.16163115452733412,3.075447228194684,3.6729977760485344,1.871648732018134,2.3733688136490882,3.018421323888533,4.209134163614513,4.965576099747113,0.9984142316500078,3.4915401101658072,4.6924798859217445,1.4330254312762292,0.8217287310715637,3.90554693640719,3.024150366570116,2.384673467499935,3.003357821858713,1.0530203545689798,1.9283607637951028,0.24266868263452035,1.7855866881476745,3.943536755164563,3.4657110559716555,0.44035081648751584,0.8901178726928682,3.0544236859093243,1.493454851461662,4.306227881254209,1.5817359566425193,1.3233675486304575,4.957392160016372,0.3600886299621797,4.731386342345547,2.363889273252815,1.6696731402995502,1.1820550209166503,2.4883375302941877,2.9924087833741053,3.9220773856736493,4.597405977239712,2.7393840501001065,3.6136961229056275,4.628856666957699,3.7819022452722217,2.446951473806367,0.3753109160353696,2.3313933126730104,4.762851459315581,3.8684574156737614,2.1026118147745585,4.360057404861873,0.4351404708676754,4.905910479703292,4.062773142844814,1.3094991632443187,2.1610011024001032,0.05976874894428774,2.5019513637146806,0.34723707403248594,4.876322888259878,2.0524941009913356,1.9598327445301789,3.0309364088621313,1.687114417201614,0.4181176711340584,4.458483398756732,1.6856163090607335,3.4856448758307446,2.086503625552666,0.9430533689827092,0.9664108495837997,3.80913075524734,3.9987209797774037,1.5146053013953387,1.0515639131360555,1.8741878574390736,2.8514868844551278,4.259901249727923,4.313472678719583,4.928839284191339,0.8210750100261366,3.6051059549589914,3.8322667744947356,3.4119016896688326,3.1709947714537243,3.7967385628485384,0.4086952470422167,1.1526358031195305,3.5686223049221732,4.771273112082719,3.6480767881405827,1.953415091429187,3.2682448060945726,0.5782087732713426,0.5918577450587803,1.5053212354755396,4.238343492104384,0.12141744025161993,2.839857736848117,4.85864041524406,3.532196389368183,2.2564259216406657,0.09439192524240525,0.9975012296207975,2.557271671860991,0.35853333680498367,1.786509649531951,0.46045212453293183,1.9525263749709199,4.446790520865308,3.0548247669975215,0.9891448958241755,4.569971605183383,2.5272303922334984,2.6601568308420207,3.5759278235993106,4.752484531361606,4.064231374242064,2.023178143019612,0.2561926360025635,3.3442338265022133,4.3397592270106,3.820273859264022,3.4663667772673987,4.070127769934043,0.31797334067284244,1.6219489326070913,1.214114675249075,3.8970662369045583,2.4571324153103946,2.755893332397009,3.1884050833193225,3.6281841908782972,3.196508743034283,2.9775876136978283,0.2568592002703374,2.0472882372725554,2.581829957457579,4.893868458992148,3.7171411630968096,1.0399691607463568,2.22267237927243,4.315062642305803,2.7941443695660717,3.431026273482516,2.521638033920107,4.279669962563259,4.366061821378687,0.6478263775492354,3.9576308099618194,2.3420780253042714,1.8002049833151823,2.28535109763373,2.9082904931182254,4.391552469728563,3.394285013801792,0.5975922587846016,2.4986419245886315,1.7071912378927512,1.2675050097820273,4.778372453834049,2.4228895102849135,2.9820002359431728,1.6245304371023428,1.3048709963321847,1.6115271335630954,1.8479570689321334,3.868792644304105,1.7468946389525852,4.4505346344178855,0.643550476263659,1.2317933808946113,2.2741272569471525,4.6666801143679475,1.767795867969999,4.917604496784829,0.6794817117385221,4.666060555652017,0.038856657615184975,2.5916122777270587,2.791977894927793,0.16252199573968173,1.7454311679455137,3.6170538661885523,4.149784636659216,1.5793902045141106,1.4912640172316827,0.186978841812232,2.137902281240999,2.519838066457254,1.6301462687333201,0.5115267199749152,4.044067206463967,2.2538392342363442,0.9624649107742755,0.034758104715905125,0.917861403435033,4.614902625803715,4.073389375545251,4.864880293143021,1.9729536966368155,3.2705522886027105,2.3076535930858686,1.297904435386299,1.1984772471909177,0.24938549052334058,0.4472088849732714,1.12811316729175,3.525443553112544,1.7879382324271098,2.6131754949285444,2.308062337979387,0.0704564927753959,3.146897811331532,3.2086698523620196,4.361985131615227,4.566330154416764,1.867766636402619,1.210739142114331,3.0685170053651554,4.857869241151551,3.65461037529925,2.328464476118585,4.969057150383853,1.404659193933292,2.157509394444358,4.2236802636398565,0.542908418375575,2.9722976712175275,1.6422933791328997,3.5059112061847255,2.359020407460183,3.296668076581739,0.398503681096003,4.823608265866289,2.3686470105581314,1.9512767569134348,4.336891373752282,0.3881768353862225,1.4630878258350977,4.061030068091117,4.425028824120733,0.45440233752487624,0.625601038903546,2.791752038164945,4.309009799327111,3.481952686967573,2.866717384139772,0.7280673868007814,2.1065454741591196,3.467930001596784,2.925271476463017,2.732154368334252,4.883925438616102,4.885408671965202,4.125057923120556,1.245651802619745,3.593278153593713,3.0149293526994203,4.050751067740579,1.860403800772542,0.12852578235367007,3.3144327946980665,4.094215495440206,4.031388533329255,4.760463920643852,3.3075940198459417,4.891526653912566,3.8447453240346086,1.5295748618525362,2.789569913011011,4.788469917416784,4.492057460917835,0.6825446020838766,2.7505951758610148,3.3227194437883387,1.6116357377941537,3.20873576280185,4.252026088660498,1.7843180315165341,1.9983724116960178,1.6481957999249885,1.6178207458448146,2.4712391747992313,3.6710373551770337,2.5081793797746545,4.947782817637433,2.5967816961162704,3.0331810308808915,1.5639356944892946,1.4739450098795104,2.9414866874711865,3.7299496672705335,2.3854396577230608,1.5385141647054945,0.8020314753668856,3.504736984823662,3.616437038617204,2.2533463983222948,0.1666564814219973,0.4578492777939702,4.0782018983202875,1.418527405869825,3.953307136553689,0.46298720546033234,0.20184644113341643,0.25107332241003255,1.488542270949642,2.0947769302068933,3.3391571019698474,1.6897229956739668,3.3279472526913088,1.737864621476547,2.962200164797917,1.4183993452537813,2.278249034472666,2.6095512627190667,4.613506479334192,0.7740056002943518,1.5922612714203044,2.6575350437874743,2.01471545101037,1.5865869482194472,1.9603944993543276,2.8525332315852547,1.0695922326279739,3.2956766227253587,3.0880765657244247,4.689937143864279,2.756711632652925,2.4687248147397622,2.159951475212938,0.5171118014771214,2.408704964576179,3.619526829537155,0.5276850748324691,2.819277027701066,4.856320520654425,4.249320444967701,4.6758016553549755,2.129283178208742,3.403645709895242,1.2585487969551323,1.549019880114887,1.4269408272407835,2.317089246158981,2.332117424266289,0.08620076101670038,3.601739921711189,0.20410294118386574,4.733038459135548,4.235552259285238,4.215291408275665,3.2456184529922316,4.003137394784316,0.4849035884845265,1.5870529332787953,2.304201174866376,1.235864025396779,2.0414054074664323,3.7294657905272,1.7982770935197079,0.7657628017411122,3.3436949079733367,4.879808559357275,0.5720330927219008,3.02732642197602,0.6426310327402951,4.203154114316764,4.440894329381093,0.028905181532646873,1.5334027473690504,4.061439756236441,3.5676626278331716,1.455006828956782,4.328668051037761,0.34957893004034957,2.1770137930658473,3.7586039593090383,2.035632214402111,2.631325932584425,1.9191917904945532,1.079921734461493,1.4233275160003156,2.9135375955077523,0.6068926789244677,3.409389288532253,0.7163093590636471,3.2142735048266857,4.374119675652352,3.5593988692808054,2.5472235643493923,0.3850971894834987,2.2799356892726075,2.5076319355004473,1.6732350834442022,3.518413549708849,2.960309998473354,4.609957714091766,1.0479480709786926,2.279048406396429,1.6176411797780177,1.4977374159609524,1.3537398761018926,0.7756197909460794,4.511584360926918,0.4903438450285158,1.9888825128317045,3.158000214400473,1.4865646713600944,2.8866534010320954,1.21307696352967,3.193814901089891,2.328125504844687,2.798626645905007,1.019767810059885,1.4558517415836703,4.582721838628711,1.6150554503142167,0.397126114588533,1.7429616683238458,2.1577684664547556,2.65896332601835,1.610464374682955,4.988230526999498,3.4878869829185954,2.7765328609869746,0.2846691080345831,1.3262525713291362,2.268670303624308,4.6545847528466915,1.269706769864175,0.47784736646617865,4.970291614325303,2.075100489325247,0.1500458339492694,3.9265038281627005,4.057965026165732,2.4937190470436876,1.8050313742168256,1.288273648918239,4.934636939872612,4.986573572317672,2.2809947902046357,2.7329000190947794,2.976632806344508,2.9370371606279844,1.6424251437761395,0.4585210728985467,4.91342194732843,2.2106567323439053,0.06854646614196103,2.526980937661821,1.698998908831696,4.219602354231582,1.5672870753684076,3.9150907333494,3.002101398823619,1.2209850633238228,0.1743569335716233,0.47652587115313727,3.346516909512286,1.326431935940271,2.408850858654157,3.185557041251088,4.304309282119002,1.1902356981137219,0.5909691792116267,3.2712954485615,1.2040143863411223,3.8823701226883434,4.276294500067621,1.5342206094806,4.261684171624182,1.2300304722463051,3.9712029213349807,1.266827794037585,0.3276069868736109,4.125076359346532,0.25235300219493606,2.9009238018756847,2.124066583384395,0.4850820515038312,2.747787054895876,3.786472406847615,2.851184142119907,3.645336271304843,2.8231051486106384,0.21208641889386315,2.739913496544364,3.34160908837943,3.4146096215642077,0.7675897525530828,2.056456133412583,0.9551779794428461,1.4121251748493924,0.2119727320274345,0.6211706683897589,1.6147187749361913,3.842442102876743,0.6590946320802726,4.242324289209966,0.3573894080615947,0.1895134510939811,1.3421567737183493,1.4334944401475047,4.292629474771128,0.6818966098610746,2.9248962115292265,2.735174176060723,1.4865417979283457,3.8032697103129918,2.8679131847663775,0.9683711176101628,3.470171629429043,4.231584689933142,1.0769395386065583,3.2561287262971583,0.9387229292789923,1.6054673333770075,0.9834378425204116,1.0456953470592711,3.473976550868562,1.6903010819204511,2.003224091275179,1.7228379064933996,1.8675290965909241,3.7895611856034717,0.12687934391552136,0.34113747687690155,2.4477746158544966,3.1613483693328437,4.914370329227769,4.289951199938601,1.8865648374876465,4.541192082047719,0.479938655637725,0.7857990761212241,2.699082916049184,2.919459440932022,1.0410387281468259,4.235571847988259,0.019852786554059865,3.855024663117158,2.6619624078937565,2.767321124405384,1.2938695103495956,3.781706154376392,4.229416497964419,2.1532944492306436,3.2031916268287928,4.780239977734323,2.6202935130673155,1.4935464143358301,4.861688233609303,0.25486722902210435,2.0979226548017618,0.40819060862578804,1.1058786695028844,4.3352210884532525,0.5228707026541368,2.037809783129474,3.0266063702936163,3.3335298794211354,4.11485468143964,1.1791799749792986,0.5369109649444592,1.5754365280810956,3.60287012421882,1.326344117915631,2.7635854449714206,4.720973731705324,0.6682234807055165,0.872180081335594,0.3331696647675986,2.6739429676129136,2.2743280633227405,1.003147204469813,1.670837771662378,1.314225411687222,2.532661258588017,0.7770320905366324,3.2113083508861093,1.3394230841135601,0.5647932927123323,4.898232021099931,1.816009446021607,1.44313683252413,3.9414846229142264,2.7078942595665154,2.8922708797039087,3.5326017218246184,0.6624939962012566,0.7423796123767334,0.4611879208678582,4.9679878677910985,4.818001700063643,4.773303934662621,3.752477862722258,0.4775592837199094,3.08558893434724,3.822172371450878,4.652245071200496,1.4836082452883959,0.9523246530602147,0.1755559720351163,3.2029185137958582,4.209364783196291,4.620172505688106,1.0630466776521208,3.013258179473095,0.3132256821682655,1.5467178571707196,3.0386655532733986,0.16990030174601767,0.19677997226205335,0.2663888283521887,2.3803812197587226,4.026134991860463,0.3054687663140365,1.6992766790135116,3.155089545579256,4.728753685827555,2.7792994661482604,4.778529478473512,1.7776977546737982,1.8500789448865107,2.8191983416585464,4.7996736959427375,2.1217615532083967,4.978572459292009,1.1399545906865238,4.56838270284236,3.0379889587905016,2.072737754118341,2.061399970046195,2.6816927401009014,4.162636333606349,2.0040875484441436,3.5927992531658424,1.4084520895397112,0.01708722585315181,4.320742655786608,3.544153054779974,2.939653856857692,3.8074186512380006,1.34303121109699,3.8367778673670037,1.7682998390121607,4.098165333766471,1.7877430407929806,4.9556690117016045,4.148180502230321,0.14997575863496704,3.833708925224706,0.10583681232715247,3.883396711919338,0.2542262652008598,1.8013822711813843,4.178473438128273,3.9430658864228905,3.1355512702977286,0.9511592206130282,2.3731942491580926,2.8498590623232047,0.19866419645271582,0.4265743184441906,2.656592995549972,0.26459689741623493,1.3292282617042495,4.358586083089566,2.0950318107838264,1.6484669261827634,0.6913810982679014,2.600647199846118,0.3916603423556586,3.1605471014163156,3.0045799988378583,2.706359520730163,2.9956759380266487,1.015920876911226,1.115111870476606,2.591610467760815,1.169376355976931,3.9498754748936427,4.072961544729653,2.4758748276198475,2.0387354565147553,2.891766881613518,4.338985620020911,4.878912015994601,3.602532633809817,1.069301418238865,4.417106680283714,4.454801308548256,2.6073744334023177,2.7928868998271152,0.17053542257384757,0.5566031423949003,0.8628442981468387,0.6847204500638593,4.444951232344948,0.16792125780128453,0.17920416980994114,0.008662873071663135,0.20335124132599192,0.7642394649405126,4.303468941695097,2.5218208675853235,1.1677081732722039,3.2851830739251997,3.2962733233033936,3.2341004322975566,0.31588106545285766,4.187654572720348,2.0394755553037127,2.5318056107196316,1.5746993781200136,0.6104673074174294,0.3838206015888723,2.3245427930229057,1.5389988425688683,2.7218584172136695,3.5584735463012693,0.03969159726714411,4.871737200231493,1.9526717534447047,4.585171888203028,0.7371681847961553,2.6785890979035845,1.3580535918072334,1.8838839611146863,4.402199832755269,1.5186486646986797,1.040365909744776,4.437979970116617,3.605339101081669,4.496614496923072,2.085701258907944,1.9495450632105427,0.5576815849124694,3.838665821353704,1.9645350591466448,0.4428176834077946,1.4781100372992106,1.7418744945852727,1.31806234625498,1.879161519782977,4.522675768475089,4.736949085939889,4.516760492347668,4.241470964774962,1.2885401134442998,1.563447439231802,3.3787929846390785,0.0750318623698143,2.2231062980389438,4.911259956058106,0.508398292280331,3.741187770474592,4.504718206189731,2.783250088522231,1.2721230523305271,3.998449512875263,3.9913577479407447,4.817728122842259,3.1074505423710574,2.466125135318725,1.840479772406275,2.9225417413738852,1.3729583543710755,4.270678055752003,0.30346058779550655,4.948648425334947,0.9348795348335903,2.4351260803659147,1.1677036908678085,4.275357516076339,1.817579418380304,1.4643789982189859,1.050398112464136,0.3328598094109103,2.4451724476535954,0.8493532859937447,0.9305944137466582,2.807677290566236,3.891365111319647,2.546469612872823,1.4847533465363405,0.13033619033903432,2.617047137831443,3.797201908965193,0.3751640905044584,0.49756387225920684,4.885261507379214,0.5090960115781262,2.7708846116367947,0.5043598526187143,0.31514602475600784,1.3345037440735874,0.9199656791712096,4.1897752452898365,2.408315116422297,0.27034298348626806,2.707877428391452,1.2090183235804497,4.004951278744175,2.0135330931845585,2.854660260788778,0.4591809061475749,2.6671788932789973,4.479921067258657,2.3973694966207812,1.2741620085371064,1.0395202420108474,3.5100473326847514,2.783073074144876,0.09741234497132711,3.208449887158822,3.3174758922658745,1.3888064316250637,4.384072328017701,0.2921224845356951,0.17890880443627188,4.828575061100976,2.5240402171341247,3.933644055702612,1.6058368118430055,4.5748077285468,1.1874582744298723,0.30424348641914234,0.4332367280820659,3.2398682720621617,4.435487552019523,1.6758972045961784,1.5076738933540923,1.6971003914485217,3.359276647970846,2.44371265254979,2.675110944914725,0.7678613117313948,3.415751989559588,2.7428389464990497,2.2981878181147177,4.216613053312333,2.109925787711764,4.037814613117718,3.6602081150255295,2.8680864398815418,0.1622439387076413,3.1838708937619864,0.1546952719168848,4.7086066214503095,3.382243466600322,3.13505594931756,2.6802594156023476,0.8131527672424055,3.0274270850398977,4.855768157491508,4.122550513721404,4.4511734473830185,4.219665464513872,3.6369589656492476,3.3822881394106643,4.6448491074474605,1.3016059764713417,0.7485988921957598,1.2078152848643153,0.13002107032882737,3.634949882535011,3.920591760925738,3.6660962136831943,1.6160106585686251,2.7716785516533338,1.069899701791257,3.7234111758797326,3.268328331049938,3.962899125113876,4.597349058286001,2.5887782486569613,2.0503792612793004,1.398118661628196,0.6117316520855887,0.6504342065599467,2.543530878297405,4.909731698699593,4.593676206415925,1.1789258425350924,3.1970255834765284,2.5373805668352603,1.3991137870090886,4.64060953248282,4.572934047644507,2.4986174859912924,0.04565960178856021,4.038924964818062,1.2765001597399173,3.0568625322777523,2.342163286850062,4.176767339477797,3.2842134907170073,0.04058881472740694,1.4079903490747225,3.4788171100897927,3.870909624634109,0.0796767671692955,0.7403550306405471,1.4866235627902757,2.139512127217502,1.3189087160404078,1.0151118515000668,2.4297221224851215,4.119426520685057,3.3976024477669853,4.604904505029652,3.852867820151081,2.6446979907333823,2.036786445430679,1.991987462823237,2.7117728656834448,3.413108128728738,1.029221785745713,1.8306351364193707,3.534210722499449,4.284246343681659,0.9260927936882457,3.387449563247994,2.8233738853924804,0.8177301204390397,3.562836807398692,3.4387902636689605,2.6408329242244086,3.3138607343380952,2.817059091222227,1.706300269891331,0.027424626873614466,4.62703032065208,4.261321610280822,4.71391665935823,4.294483074803999,3.419955528230062,0.5367649102227856,1.3002611599976666,4.769251578535201,4.6310286816275745,0.2691272877421458,2.9662308852972794,4.18255365767973,0.8962170647073708,2.725866466733752,3.5442867277253765,1.6242088988522174,1.678722236698108,2.367801317069975,0.3114350076942829,3.019902657435095,1.879619652097757,1.4112810324168912,0.22410566578783264,4.477863608360479,3.3404474849330903,2.1952799355996735,2.11630105842044,2.8570752397565577,1.5387342161387052,0.5395365708110411,1.3506842845523592,0.8940953674546792,0.6790608645614549,1.723931305122809,0.5375443177512274,1.5954052562795407,1.0492829375001977,0.6765696038606162,4.618073383103024,3.1571922531760688,0.6052726550848564,4.146314554211893,3.165536697706627,1.9326215698925997,4.9089532107420535,3.470012341157319,1.0341381484761325,4.670516076109935,1.4507222866288672,3.3939131625347683,3.6530490608111776,1.0217221527733622,4.16069790389538,1.1697681083968303,4.869231224893812,1.7909155862443293,1.065283841510356,4.76136642385312],"mu":[1.2790863268809982,9.73795147430934,7.152036516558507,7.275742774831371,2.468898254316958,4.194931150468166,2.487607594542167,7.96721640753244,8.642652096558708,5.532113778945515,9.180825410942226,4.847506433959681,5.962527226920908,3.783960860522828,5.219263160999428,7.60401677615482,8.700203055556575,4.347598346949308,0.7606292485483634,5.69938432217151,2.6211174242803015,9.992479343649887,4.164810425305998,6.009130945825132,7.875978148541449,6.964505192308872,3.172591526679125,3.5084788147430346,6.510088394617011,3.75420984637161,7.238355102814369,4.67110738248752,7.511604731160444,0.3176927603821378,5.730422235636105,4.54244302813305,2.0542862115653904,4.184907614346618,5.354083615800416,7.219429203957633,2.029534778749855,8.088342320628637,2.036964153648344,0.07322967509020506,5.195466522806047,2.564807295766107,2.5458065981843725,1.3647537270849908,7.005073791205243,0.5084479976470746,6.399860301032141,0.7415995083337146,1.8019975889503792,8.715527270433816,1.807100986957797,9.428751931870991,9.558672810454055,8.014383590595768,1.6602044331244925,5.958508313364648,9.521427398459938,3.1774996774422637,7.491822675839968,7.386488380879799,6.593430479988531,8.031957906724156,2.1142311679070103,2.978140961286959,0.9251551844312367,7.018800613282168,5.522845620760258,8.163001450036571,2.116235762378298,8.120905098827947,9.454319885898466,9.38070548281095,3.789878883818867,6.737868119290269,2.115225672710439,5.859452607896687,6.757280425886936,7.765034084362316,2.0838737843885635,4.206234994192424,9.859763885579962,3.5797710977256036,8.566237264424528,3.5345812472531013,2.524475698470885,5.113438021305543,6.955826741784639,4.826713489441612,9.38517773447154,1.1362961127527194,0.03808284905120196,7.434742347156053,4.159558565393365,4.598709812099068,8.484948262281195,9.676678921173576,0.20324339585630735,8.194497372301292,3.3470058162732896,6.641772077347259,0.1965073071665957,6.428508598612337,1.4979085824917604,6.3188649979981175,7.772592561016413,2.7420885166753406,3.098432500641697,0.2810256673323308,4.826783887108048,4.517153799297569,4.4810845576600595,5.6596344812650585,4.172594124911524,1.5556989492422502,7.757512999580809,1.91645762270924,9.810183706046104,8.623099492094122,0.46579469474173685,3.9147739859037567,0.7927615080276285,1.8814581804181651,3.2495626524648613,9.667932623126239,8.511307004866811,0.5232912390131927,0.3282897989881861,2.677803625043653,3.872378810546717,4.406078149806363,3.855010835247288,3.732958479173041,5.139036632782064,5.997505682713539,6.029379975438223,3.333106046710632,8.583710732354817,0.09992592095793507,4.2191042250332345,6.6328240613492255,8.243340430896552,1.6763722236213385,9.26426137696087,9.28702525343822,5.365083836993209,4.033608306638574,2.117561216190138,6.8576338765645195,9.244501152331212,1.7453191413980607,3.1088488008877446,4.341923945592692,0.14644090198519422,0.9530695170628944,5.044950417090752,7.800319486315647,4.944156749276505,1.6398568513301615,8.467643322189781,5.541859390185557,4.576517089738927,5.472069607496173,9.790803413633194,5.369690659160731,2.8340615788524737,1.3813630066332117,7.585907357288846,6.323411033534536,8.387448984785014,8.724969081997664,9.545561500397536,6.105453992946845,7.795397456774465,0.6837687486755484,0.42341060973959177,4.370702827179212,6.083171870504236,9.71804318971776,9.359469773562683,4.14962870715041,4.383403842023624,8.821950846676172,6.884885756694978,4.20904240079061,0.46093937944643004,1.5968735360547281,5.037514289618428,6.96473095360548,7.5211659066006,8.836341477898735,0.8641442269356991,0.7697634189564595,1.3620345339043083,1.1781223274494135,5.28039794631421,7.7809370238912345,0.18351227859305652,1.227561553848493,5.140588574268701,5.876410207473979,6.209621464330761,7.524809482760215,7.259929152764666,5.0887472654031685,2.8729006513262445,5.733246277102417,8.163998077113169,3.3223091815741967,3.914777471869877,2.7486600594473587,8.233726050159774,0.41127113172092056,8.55133939096271,1.936990076674816,8.12751081015854,3.652921104185858,4.7172904708081465,6.260258619533259,1.092864099173172,4.568836786259247,0.33614280294029797,8.179670009207364,3.7352088322195054,7.291471979618356,2.9929519505218494,8.94161849516607,4.357850041556408,2.1029977589070215,8.8203567873129,8.404520159141429,8.336430664107892,8.229403286507731,4.635721230262915,7.327904831760746,8.411719327922553,2.3970810919462537,9.684757637354462,6.831597892218322,6.737629369551268,6.317098418770768,6.175352691253668,9.648219298640065,3.2832925695853565,1.7012882931883233,7.7384548576081835,2.6314406852127292,0.37688493428932324,0.5817019239882248,7.5128290100370805,3.4825038268182795,6.615017410678239,7.172675880173609,0.3305372046789423,2.4261241460867367,2.459023678660186,3.912531618974313,3.1636393395031392,1.1311258099880295,5.728720187453646,0.348247918676281,4.19324955725715,4.346923013773467,3.5085517297417868,8.996751095530907,2.3656372077572874,0.12873735047097767,4.464177995876478,0.8208632230625201,0.9227553522508702,1.6713734716565232,6.109539297100177,9.359329335805437,0.45801785606445433,3.787748403678408,6.929507863739037,8.883881826499227,1.873943646131777,3.30343857181177,8.82124995476487,4.756530209617072,9.969140945421707,6.303763957167368,4.81258218149531,9.678082259860009,4.125403625112593,7.951302316290489,8.620854765860388,0.12191676826890818,7.666148156372761,2.5283540781411107,4.489445806843437,9.53442241148103,6.167809687357664,9.638931672142927,1.8060437309165844,7.512373952462809,7.707971917053873,0.7545363800954896,2.7292610572311427,9.080409465082191,2.101381826920421,9.075714151419378,6.325932030345653,7.473727736222302,3.2408325351015943,5.033051322047637,0.6727809312519506,8.901532663814253,0.37038515294707475,5.765040660877478,9.712312300290087,5.802259011870545,4.565308462178173,8.007979501539644,9.728763681207468,6.005467944331457,5.697207504981339,3.535561129873799,7.337092600830779,7.616792025581523,1.962080431283073,2.487084327935809,5.6720552072754105,7.455492500337075,5.7462531180719845,7.050376158688394,4.4311873352206765,2.508809459514403,6.0630637945569426,8.667806276456556,8.932318496185585,7.280939671864111,2.9476978861407477,7.368611375998466,4.313520272790614,0.23068370703868357,9.975657322295266,3.675983271473382,4.0756571015506164,5.6470608308728725,0.805048350839972,9.811871170100947,1.9859263370430447,8.477284266795234,8.907198634232063,4.231009824193313,4.160931090607161,2.6004762554072003,5.808952871124788,0.243142990171632,6.256198588022704,8.17523752242936,4.4295760239154465,3.8641194615754415,1.1330112953722637,9.274550335537352,4.272602833404788,3.248896418733178,7.5548505223081435,9.69592217951909,5.495810126245145,2.3444170926822805,4.639542809249808,9.646750777154615,3.1972808421854526,9.995347483255754,2.4186430859336183,9.684210504027746,4.873773306115295,3.3713278565255833,4.392754304340332,3.4151812217832367,5.396840587493963,0.5175700639293068,6.079206170162664,7.73653524378725,6.8609544117326156,1.6684533190228978,4.44642518065224,8.089013492003245,4.91908118591202,6.728134619707893,4.707286928726995,7.803545156189702,9.232688734045686,8.937583212712035,3.816427370840676,0.2962421617901567,1.094333537037393,2.8823890957642906,9.914469284625742,6.469854807825639,7.636816101037487,9.739551503498678,7.817255443259765,7.688820663564099,8.526712710117971,5.077732851976984,3.6077509548718223,6.846581084590295,4.595913169125598,0.03890289294697702,9.336505836212886,8.206217400022592,5.53869095513615,4.986198128814124,1.7079549651722825,5.125439408991972,8.655512790017623,3.6822745823664915,9.469975875732057,5.222089442973998,7.04894389529104,6.647965235335969,2.849552144735854,2.192861559430692,2.6222481954441834,7.398119996885155,4.246105213749491,3.33868375024744,2.920979172358056,1.7001033470665816,3.8277267304644114,0.0647567578364816,4.474925541293111,5.782727229172582,1.1288792272550086,7.104232971086837,7.8981691461084065,0.4648340370941373,2.7259519203909788,1.2038939015935912,5.405752114840081,4.779651791272133,4.070695837824609,2.8587981223698478,7.847230944588066,1.917937897525559,6.893594307451401,1.6797988018454046,2.4330273430488614,7.448110971605031,4.757647222381958,8.079755806563663,7.6115802662024645,7.491061300887094,3.8722542896313117,6.862158559431924,9.62465116021617,6.370124954972756,3.2338492788997697,1.0821572690846648,5.758078185295286,2.0225251229533825,8.23597223146674,8.190662724636415,0.9102364330020896,4.70345592679492,0.3637022638046217,5.403927929686525,8.05884020391651,6.537280747885288,5.265102849402197,5.546666818340277,8.21562444619056,4.549031873843068,0.2306613272794067,1.6295560506225426,7.8803270829659215,7.380336779420307,6.925273186333667,7.428271517330629,6.138636176054797,2.153032335333034,7.291671345476233,8.118679145902352,4.15564710682605,2.2366169681208814,2.9937051983871155,6.534759242451747,3.594506058953848,7.6736268087717825,3.8566005004645,9.693327151512111,1.1421908228667355,2.033502962754845,0.675775373302312,9.477085899666225,6.294684364237186,1.9905240264502977,7.617600626741254,0.7769539439912876,6.581497900144542,0.00900917277327995,2.3528312314717414,7.137045806094835,2.7634242345880655,7.00638970186546,5.070253730286563,9.640281359815589,2.1073356722446435,1.4889878550570756,3.8679645701976084,0.31068338105647797,7.146544137066348,1.5745385896987818,4.915349335602592,8.854054199556495,4.931407062741697,2.95443526424787,1.8520046995724582,4.974876272411692,5.515681904372645,5.715824897630881,1.4930930680541454,6.761469560059384,3.2205887303802827,9.437960002949835,1.58186844946278,1.896400057542691,4.38623355739133,6.8730158288316545,3.236504476537223,8.672429801533767,8.19784215344625,7.473613948626094,7.227619410154988,2.1201350118008344,3.065316131914957,0.3142511049380792,0.41515651544092425,7.008151542322889,6.233943835299769,9.124250732920817,8.132871414158663,3.1991651530951137,2.4742480306280457,8.216986281837892,4.5271360995211545,5.35712056137111,8.16272045941738,9.310588014992152,2.5427489837758266,8.103883029240889,4.449731598136493,2.722283156889127,1.2548861909705011,5.994559856990628,4.449529823561917,1.4283513766135325,2.1665198001227415,2.9995040446300814,3.6766455025763745,2.2223806099006715,7.53669934024485,6.166443577724483,0.16741951030220692,2.9323809904754494,3.4210379046106865,4.900098568893734,4.807966686650211,7.816604533528595,7.910526758954919,2.4369002342874335,2.9236462798306984,7.955641223164001,6.648359728517921,5.0511147647862575,8.976420262269977,3.838212228967315,5.470955581849724,6.1711013887312465,7.506944934029409,2.456067978968397,4.885293482630426,1.5074206235227328,7.6555375093360905,3.6021003648096572,9.987546532311946,4.015764931718491,9.075808046106085,8.86310429357452,0.8862323828043195,7.717398483191769,7.033926641634656,6.581097582111335,7.876643735361048,2.0845925496569184,1.8879988354592947,2.7958106025216556,2.727948794830748,6.8036353872334265,1.8114706008885317,0.9380046609180415,1.8150070211660974,3.2895410293044614,4.748647342386105,5.673382682272086,6.5142085295668295,1.6018043225649792,9.278611004310868,0.3964030042468236,2.0266796987201308,1.7558324940486436,2.4554298363840177,5.5887791045497615,2.4655247134276226,7.647614048990676,8.48486802157781,3.2442209020960533,5.8080079001518525,6.7158216705196505,0.30533762083839955,9.033153382410852,1.976664982968408,4.665063883127254,4.42884745885137,0.4050765975524584,8.424977610599333,9.785347400729682,5.436386542885896,0.7627276498451541,1.5553541729213305,5.5724325086212545,7.102826728023073,8.042879315964226,4.967805209467258,3.7187242336968573,5.000261386233729,8.37453599364201,6.910822934894596,2.9947658193751425,8.035811158542332,0.08107723213061302,6.821591761951947,3.650231308084959,3.8623854460196805,1.7498265660407508,5.927086013452674,6.256155474942505,4.009565299186189,3.6271749502832407,6.95600265383163,8.788726112867302,3.706443669407795,2.9189890132866148,8.115287260446857,1.2452768218301147,0.6233167139238627,3.2852329196055763,0.6479814165188436,8.556402418348906,6.888739932212353,4.2428226729264455,3.4262993002966025,3.457446546234544,1.5837686127108874,2.4307546839930394,0.007325562660647211,6.320678817944385,0.9830210980638743,3.709914408815085,0.486182788723899,4.572411354845878,7.323144107376754,6.327710914462024,3.260484642336352,3.7179425756945594,9.695923216777746,3.75217264302508,4.068312772954035,1.5656628992441313,3.710066759236128,1.175501061875257,5.388334525590106,4.396003221099017,5.212115538619482,1.555842284766078,5.287844539246254,5.4334820185430655,0.4371634344669584,9.692320317140062,0.5827419839732828,2.8585398867614176,2.0946650980422565,4.53523567341273,5.084769117337357,0.5773203623732392,1.9642809670035044,7.701261138162076,1.5824738714631037,3.840777166479634,8.023202354063702,2.9161756826853136,0.17780074708684923,0.13315978594969913,5.58298786766481,3.608822305141981,6.871408627691842,9.895170982016255,1.0384582266226894,5.79796397430105,6.225919770829941,4.287690467945642,7.483244237291611,0.09584393504969535,0.8565055443295022,1.2053934358953078,2.9035289895002347,9.51286957252882,0.15603799766495507,4.475746327647528,0.49937626920082856,2.3776847651622934,9.591743812147818,5.528331378242104,4.583515942317016,3.564848846751223,9.946250133778086,8.91945620939265,2.0388445171549607,9.458466309448765,7.712929629407553,5.2183856550212,4.0122768762567524,2.6452257341906105,5.081922906204377,7.466622206369986,0.5841669527094084,0.33068364633102476,2.6067768883563236,4.147690943009501,0.1177918411503942,8.217041213780181,0.2999245575177567,9.847558998522874,2.5567167452148976,9.573587537470347,3.5522454263626346,5.390118758140416,5.521786725968035,8.628333432239323,0.466344771773588,0.18475550146993536,1.375459958170464,3.650018114720588,8.14141460506866,8.467189112788274,5.372366794857828,8.566644552751164,7.768398809231121,1.8265558574724094,8.898881477315888,5.377760698418539,2.948939195655409,7.542252872873039,0.5412935844631717,2.3994932362566557,5.67126821245634,0.20306175864247988,7.026924658395631,9.43993439220062,4.67159821784348,5.683241841581936,0.7929271752427081,9.976691439682368,1.2337118007527126,2.291411549155289,8.633634140121284,3.7994061980091565,7.610748993855793,0.972676911821202,3.0898991583852498,6.712652946094206,0.7304135232656606,9.179497679316778,3.1006907144094,4.374566702578402,2.7442213898185197,4.702004259746424,3.5535116462398286,1.970640658361995,9.351596622668621,3.103943569135794,9.218076969373946,7.234780611164231,4.65752095621335,3.4323544298797137,2.885961017318881,1.0220219006611142,1.618087786382214,9.64207940744302,1.0605454965057026,8.8705276126995,1.9659642253496812,0.9057531042546962,5.019730387885968,2.454351634547376,1.29645229461818,5.357246065098222,6.2180499657577855,1.8334106220349167,0.17660605678903485,9.424606720384572,1.9219407086935325,8.531953820127196,4.447233999003903,1.6614539405822537,3.306844161338245,2.0994119910365394,0.3334593894748261,6.781268747643026,8.657235993950778,4.419708221462539,0.5113837576132974,2.6302438940055572,2.312836523358066,9.635296263571217,1.9861442576901456,9.357488021352784,0.47170399521522466,4.513971926309854,2.6893123800344254,3.3194802118724898,9.474681164123666,6.207892441462485,2.5329839654466646,8.4211722816212,1.807909777176242,1.354442083256835,9.708598102861782,4.828216678040189,1.385267162507966,2.8978600082969463,3.8062236046175313,8.318309768730341,8.096519536057933,4.4043933946078155,3.580768350782859,0.05970402174187983,0.6338008212701762,6.197119044216748,4.601960725848963,8.129126236904884,7.6962948862014935,5.329206530853876,5.434715717913323,7.449028825687241,5.846930559347959,5.863648102671421,7.454923998653598,4.235809149744916,4.18636696887845,3.2411845602886125,7.920371648816706,4.204115335055729,2.0711581273383173,7.568057370710422,0.7541685406746712,9.316151214808299,7.658866835678184,6.151059249873445,6.629715299139463,0.03183538937228558,9.287198766772606,9.866899838140792,4.484800643685425,8.658333562466892,0.7989255809812157,0.7291148865630204,7.717600512527076,7.715353940092919,2.135877199544889,4.278903170801762,6.2071135929684225,3.4322433521285323,1.8251192718184206,9.386474795906441,7.860359344342507,5.207349171079862,5.898192811861689,7.38153782373071,3.7795537649760114,4.1610253058177875,6.027605155327271,9.655290958755046,6.422178295870125,0.07618691299423608,8.917826041652926,0.5831595274986334,7.815286893689315,6.739972663523693,2.8759450368076456,0.18680972165919352,5.89521670037819,9.422467132889699,8.365720759453165,0.9339782908024485,6.5384584947243685,6.14133131792872,3.1966748293767067,2.0170595839667538,0.8017664273247105,1.7427683555854956,1.9537758045732145,5.710056039202877,6.137226075648979,8.659298275737182,2.3037074464166873,0.9769040385995442,8.971672635631126,1.6122206376656156,7.048972679365962,9.258155406699691,0.7540786257595244,8.365822057873038,2.8791805245847857,7.696049037217573,3.9348077002849347,9.891746043720337,4.124791158270595,3.417582338922216,3.729788273386263,0.7567479251831655,5.715930650950442,5.352565278350776,0.05485491087158012,3.6586176294621375,0.004833854981183272,5.9178492392006365,4.999630137831255,3.0745921919111407,4.943631953422221,8.482293789316165,4.621538832354554,0.5618717610369472,8.97731526030153,1.1287706395256625,5.494048896184931,2.6485819572072455,9.194676725535674,3.4835522080276338,5.147431443334365,3.4891646789403885,4.610739233216683,9.94179361252324,8.086544807108842,7.757740878820014,9.049019524215392,0.5729385014595945,7.754383130134174,4.6625349344379945,9.443240054113193,6.563259860868069,4.728049234554554,7.838558162518812,0.532480028265403,9.56860682128031,7.5817634228822754,2.6362023998687745,6.259105681577255,8.748821445480583,6.6963986531854,1.8187345823677292,8.167379324974151,8.360422883780531,7.570275763716161,1.519112045684743,1.5279374052848982,0.1530934750520263,6.609796166673359,0.5771619469328892,7.648019115912053,8.129072171840424,6.79445348418551,3.2036035989550227,8.061016707195074,8.581273126060989,4.897822943605932,8.503808482516002,6.482624446154954,5.8483727853801915,3.5420975813739974,6.4102736076672695,4.092238887352215,6.256800404247082,8.254428263067679,5.757270946584323,0.3714791003227602,4.475349553310921,5.801038312207121,2.481125669697417,4.201892816447801,6.586627088537855,8.382024556635852,2.7701946682305345]}

},{}],78:[function(require,module,exports){
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
	var logcdf = factory( 0.0, 1.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1.0 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `b`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `b`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `b`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, 0.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( PINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	b = positiveMean.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], b[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	b = negativeMean.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], b[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large variance ( = large `b`)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	b = largeVariance.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], b[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/logcdf/test/test.factory.js")
},{"./../lib/factory.js":72,"./fixtures/julia/large_variance.json":75,"./fixtures/julia/negative_mean.json":76,"./fixtures/julia/positive_mean.json":77,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":47,"@stdlib/math/base/assert/is-nan":51,"@stdlib/math/base/special/abs":53,"tape":233}],79:[function(require,module,exports){
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
var logcdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logcdf` functions', function test( t ) {
	t.equal( typeof logcdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/logcdf/test/test.js")
},{"./../lib":73,"tape":233}],80:[function(require,module,exports){
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
var logcdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `b`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `b`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a negative `b`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var b;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	b = positiveMean.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var b;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	b = negativeMean.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large variance ( = large `b` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var b;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	b = largeVariance.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/logcdf/test/test.logcdf.js")
},{"./../lib":73,"./fixtures/julia/large_variance.json":75,"./fixtures/julia/negative_mean.json":76,"./fixtures/julia/positive_mean.json":77,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":47,"@stdlib/math/base/assert/is-nan":51,"@stdlib/math/base/special/abs":53,"tape":233}],81:[function(require,module,exports){
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

},{"./is_number.js":84}],82:[function(require,module,exports){
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

},{"./is_number.js":84,"./zero_pad.js":88}],83:[function(require,module,exports){
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

},{"./main.js":86}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{"./format_double.js":81,"./format_integer.js":82,"./is_string.js":85,"./space_pad.js":87,"./zero_pad.js":88}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"./main.js":90}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{"./main.js":93}],92:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"dup":85}],93:[function(require,module,exports){
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

},{"./is_string.js":92,"@stdlib/string/base/format-interpolate":83,"@stdlib/string/base/format-tokenize":89}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/utils/define-property":103}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{"./define_property.js":101}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":100,"./has_define_property_support.js":102,"./polyfill.js":104}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":91}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":106,"./polyfill.js":107,"@stdlib/assert/has-tostringtag-support":20}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":108}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":108,"./tostringtag.js":109,"@stdlib/assert/has-own-property":16}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":94}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){

},{}],112:[function(require,module,exports){
arguments[4][111][0].apply(exports,arguments)
},{"dup":111}],113:[function(require,module,exports){
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
},{"base64-js":110,"buffer":113,"ieee754":216}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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
},{"_process":223}],116:[function(require,module,exports){
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

},{"events":114,"inherits":217,"readable-stream/lib/_stream_duplex.js":118,"readable-stream/lib/_stream_passthrough.js":119,"readable-stream/lib/_stream_readable.js":120,"readable-stream/lib/_stream_transform.js":121,"readable-stream/lib/_stream_writable.js":122,"readable-stream/lib/internal/streams/end-of-stream.js":126,"readable-stream/lib/internal/streams/pipeline.js":128}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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
},{"./_stream_readable":120,"./_stream_writable":122,"_process":223,"inherits":217}],119:[function(require,module,exports){
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
},{"./_stream_transform":121,"inherits":217}],120:[function(require,module,exports){
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
},{"../errors":117,"./_stream_duplex":118,"./internal/streams/async_iterator":123,"./internal/streams/buffer_list":124,"./internal/streams/destroy":125,"./internal/streams/from":127,"./internal/streams/state":129,"./internal/streams/stream":130,"_process":223,"buffer":113,"events":114,"inherits":217,"string_decoder/":232,"util":111}],121:[function(require,module,exports){
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
},{"../errors":117,"./_stream_duplex":118,"inherits":217}],122:[function(require,module,exports){
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
},{"../errors":117,"./_stream_duplex":118,"./internal/streams/destroy":125,"./internal/streams/state":129,"./internal/streams/stream":130,"_process":223,"buffer":113,"inherits":217,"util-deprecate":241}],123:[function(require,module,exports){
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
},{"./end-of-stream":126,"_process":223}],124:[function(require,module,exports){
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
},{"buffer":113,"util":111}],125:[function(require,module,exports){
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
},{"_process":223}],126:[function(require,module,exports){
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
},{"../../../errors":117}],127:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],128:[function(require,module,exports){
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
},{"../../../errors":117,"./end-of-stream":126}],129:[function(require,module,exports){
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
},{"../../../errors":117}],130:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":114}],131:[function(require,module,exports){
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

},{"./":132,"get-intrinsic":207}],132:[function(require,module,exports){
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

},{"es-define-property":192,"es-errors/type":198,"function-bind":206,"get-intrinsic":207,"set-function-length":227}],133:[function(require,module,exports){
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

},{"./lib/is_arguments.js":134,"./lib/keys.js":135}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],136:[function(require,module,exports){
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

},{"es-define-property":192,"es-errors/syntax":197,"es-errors/type":198,"gopd":208}],137:[function(require,module,exports){
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

},{"define-data-property":136,"has-property-descriptors":209,"object-keys":221}],138:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],139:[function(require,module,exports){
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

},{"./ToNumber":170,"./ToPrimitive":172,"./Type":177}],140:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/isNaN":186,"../helpers/isPrefixOf":187,"./ToNumber":170,"./ToPrimitive":172,"es-errors/type":198,"get-intrinsic":207}],141:[function(require,module,exports){
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

},{"call-bind/callBound":131,"es-errors/type":198}],142:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":200}],143:[function(require,module,exports){
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

},{"./DayWithinYear":146,"./InLeapYear":150,"./MonthFromTime":160,"es-errors/eval":193}],144:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":191,"./floor":181}],145:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":181}],146:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":144,"./DayFromYear":145,"./YearFromTime":179}],147:[function(require,module,exports){
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

},{"./modulo":182}],148:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":189,"./IsAccessorDescriptor":151,"./IsDataDescriptor":153,"es-errors/type":198}],149:[function(require,module,exports){
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

},{"../helpers/timeConstants":191,"./floor":181,"./modulo":182}],150:[function(require,module,exports){
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

},{"./DaysInYear":147,"./YearFromTime":179,"es-errors/eval":193}],151:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":189,"es-errors/type":198,"hasown":215}],152:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":218}],153:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":189,"es-errors/type":198,"hasown":215}],154:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":151,"./IsDataDescriptor":153,"./IsPropertyDescriptor":155,"es-errors/type":198}],155:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":189}],156:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/timeConstants":191}],157:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"./DateFromTime":143,"./Day":144,"./MonthFromTime":160,"./ToInteger":169,"./YearFromTime":179,"./floor":181,"./modulo":182,"get-intrinsic":207}],158:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/timeConstants":191,"./ToInteger":169}],159:[function(require,module,exports){
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

},{"../helpers/timeConstants":191,"./floor":181,"./modulo":182}],160:[function(require,module,exports){
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

},{"./DayWithinYear":146,"./InLeapYear":150}],161:[function(require,module,exports){
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

},{"../helpers/isNaN":186}],162:[function(require,module,exports){
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

},{"../helpers/timeConstants":191,"./floor":181,"./modulo":182}],163:[function(require,module,exports){
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

},{"./Type":177}],164:[function(require,module,exports){
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


},{"../helpers/isFinite":185,"./ToNumber":170,"./abs":180,"get-intrinsic":207}],165:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":191,"./DayFromYear":145}],166:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":191,"./modulo":182}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],168:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":170}],169:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/isNaN":186,"../helpers/sign":190,"./ToNumber":170,"./abs":180,"./floor":181}],170:[function(require,module,exports){
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

},{"./ToPrimitive":172,"call-bind/callBound":131,"safe-regex-test":226}],171:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":201}],172:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":203}],173:[function(require,module,exports){
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

},{"./IsCallable":152,"./ToBoolean":167,"./Type":177,"es-errors/type":198,"hasown":215}],174:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":207}],175:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/isNaN":186,"../helpers/sign":190,"./ToNumber":170,"./abs":180,"./floor":181,"./modulo":182}],176:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":170}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":144,"./modulo":182}],179:[function(require,module,exports){
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

},{"call-bind/callBound":131,"get-intrinsic":207}],180:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":207}],181:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],182:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":188}],183:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":191,"./modulo":182}],184:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":139,"./5/AbstractRelationalComparison":140,"./5/Canonicalize":141,"./5/CheckObjectCoercible":142,"./5/DateFromTime":143,"./5/Day":144,"./5/DayFromYear":145,"./5/DayWithinYear":146,"./5/DaysInYear":147,"./5/FromPropertyDescriptor":148,"./5/HourFromTime":149,"./5/InLeapYear":150,"./5/IsAccessorDescriptor":151,"./5/IsCallable":152,"./5/IsDataDescriptor":153,"./5/IsGenericDescriptor":154,"./5/IsPropertyDescriptor":155,"./5/MakeDate":156,"./5/MakeDay":157,"./5/MakeTime":158,"./5/MinFromTime":159,"./5/MonthFromTime":160,"./5/SameValue":161,"./5/SecFromTime":162,"./5/StrictEqualityComparison":163,"./5/TimeClip":164,"./5/TimeFromYear":165,"./5/TimeWithinDay":166,"./5/ToBoolean":167,"./5/ToInt32":168,"./5/ToInteger":169,"./5/ToNumber":170,"./5/ToObject":171,"./5/ToPrimitive":172,"./5/ToPropertyDescriptor":173,"./5/ToString":174,"./5/ToUint16":175,"./5/ToUint32":176,"./5/Type":177,"./5/WeekDay":178,"./5/YearFromTime":179,"./5/abs":180,"./5/floor":181,"./5/modulo":182,"./5/msFromTime":183}],185:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":186}],186:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],187:[function(require,module,exports){
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

},{"call-bind/callBound":131}],188:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],189:[function(require,module,exports){
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

},{"es-errors/type":198,"hasown":215}],190:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{"get-intrinsic":207}],193:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],194:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],195:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],196:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],197:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],198:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],199:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],200:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":198}],201:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":202,"./RequireObjectCoercible":200}],202:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],203:[function(require,module,exports){
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

},{"./helpers/isPrimitive":204,"is-callable":218}],204:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":205}],207:[function(require,module,exports){
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

},{"es-errors":194,"es-errors/eval":193,"es-errors/range":195,"es-errors/ref":196,"es-errors/syntax":197,"es-errors/type":198,"es-errors/uri":199,"function-bind":206,"has-proto":210,"has-symbols":211,"hasown":215}],208:[function(require,module,exports){
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

},{"get-intrinsic":207}],209:[function(require,module,exports){
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

},{"es-define-property":192}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{"./shams":212}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":212}],214:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":206}],215:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":206}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{"call-bind/callBound":131,"has-tostringtag/shams":213}],220:[function(require,module,exports){
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

},{"./isArguments":222}],221:[function(require,module,exports){
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

},{"./implementation":220,"./isArguments":222}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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
},{"_process":223,"through":239,"timers":240}],225:[function(require,module,exports){
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

},{"buffer":113}],226:[function(require,module,exports){
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

},{"call-bind/callBound":131,"es-errors/type":198,"is-regex":219}],227:[function(require,module,exports){
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

},{"define-data-property":136,"es-errors/type":198,"get-intrinsic":207,"gopd":208,"has-property-descriptors":209}],228:[function(require,module,exports){
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

},{"es-abstract/es5":184,"function-bind":206}],229:[function(require,module,exports){
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

},{"./implementation":228,"./polyfill":230,"./shim":231,"define-properties":137,"function-bind":206}],230:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":228}],231:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":230,"define-properties":137}],232:[function(require,module,exports){
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
},{"safe-buffer":225}],233:[function(require,module,exports){
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
},{"./lib/default_stream":234,"./lib/results":236,"./lib/test":237,"_process":223,"defined":138,"through":239,"timers":240}],234:[function(require,module,exports){
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
},{"_process":223,"fs":112,"through":239}],235:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":223,"timers":240}],236:[function(require,module,exports){
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
},{"_process":223,"events":114,"function-bind":206,"has":214,"inherits":217,"object-inspect":238,"resumer":224,"through":239,"timers":240}],237:[function(require,module,exports){
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
},{"./next_tick":235,"deep-equal":133,"defined":138,"events":114,"has":214,"inherits":217,"path":115,"string.prototype.trim":229}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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
},{"_process":223,"stream":116}],240:[function(require,module,exports){
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
},{"process/browser.js":223,"timers":240}],241:[function(require,module,exports){
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
},{}]},{},[78,79,80]);
