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
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a Laplace distribution with location parameter `mu` and scale parameter `b`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 10.0, 2.0 );
*
* var y = logpdf( 10.0 );
* // returns ~-1.386
*
* y = logpdf( 5.0 );
* // returns ~-3.886
*
* y = logpdf( 12.0 );
* // returns ~-2.386
*/
function factory( mu, b ) {
	if (
		isnan( mu ) ||
		isnan( b ) ||
		b <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a Laplace distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logarithm of PDF
	*
	* @example
	* var y = logpdf( -3.14 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		z = ( x - mu ) / b;
		return -( abs( z ) + ln( 2.0 * b ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"@stdlib/math/base/special/ln":53,"@stdlib/utils/constant-function":89}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Laplace distribution logarithm of probability density function (PDF).
*
* @module @stdlib/stats/base/dists/laplace/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/laplace/logpdf' );
*
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.688
*
* var mylogPDF = logpdf.factory( 10.0, 2.0 );
* y = mylogPDF( 10.0 );
* // returns -1.386
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
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a Laplace distribution with location parameter `mu` and scale parameter `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.693
*
* @example
* var y = logpdf( -1.0, 2.0, 3.0 );
* // returns ~-2.792
*
* @example
* var y = logpdf( 2.5, 2.0, 3.0 );
* // returns ~-1.958
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
function logpdf( x, mu, b ) {
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
	return -( abs( z ) + ln( 2.0 * b ) );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"@stdlib/math/base/special/ln":53}],68:[function(require,module,exports){
module.exports={"expected":[-2.977935338810811,-3.874207528923072,-3.6373346179585075,-2.904760824821367,-3.7704324015337005,-3.121995613482176,-2.763304653990134,-2.4134965024975834,-22.16368950888906,-3.5140477506994325,-2.996138165719742,-2.7073315444620967,-2.9538415991648517,-2.592245424091644,-2.4420702467656676,-3.3284895164625343,-3.2571371321684355,-3.189403823415872,-2.9421772126023233,-3.339003562039976,-3.929841981221453,-3.036457648089246,-3.7479667028182635,-2.8648821872455863,-1.9346532083807368,-1.3414546715423885,-3.0990632854475706,-1.399545372375715,-2.753911609734315,-3.256065516314747,-3.5292636581615993,-2.0682742857732164,-3.7460584652273425,-3.254059069579192,-2.9488172894043214,-3.4082609543343074,-3.720411692229033,-2.5991081233837203,-3.3752614689168934,-3.582099870750626,-3.233480426994745,-3.603369391404458,-3.2701076203584996,-3.0037129304394354,-3.827818754289059,-3.818725095400678,-3.3684938106048548,-3.5684223551948713,-3.310201419489407,-3.1260564354065457,-2.7353235249659327,-3.2758318141813385,-3.1063626315413355,-2.6233716963551186,-3.6815410692008532,-2.9450073901857854,-3.588323765358683,-2.9611774542849183,-3.365792229571645,-3.4562047002107805,-2.786178902695913,-3.2960220655204684,-2.7552529095435787,-2.8345308622807983,-3.494608482029368,-3.7426535742337688,-2.858502776486981,-2.399087207838748,-3.1861584569940917,-3.148404286009505,-3.570402392230729,-3.411953107606128,-3.211492406481175,-3.2828351585769306,-3.624723978972336,-3.343360584192093,-3.7586893431614987,-3.584315526631643,-3.8194735955624024,-3.2233173644824715,-3.09656498889194,-2.480717586779806,-2.94904142542112,-3.6227705960017262,-2.795288731703282,-1.7233883646794184,-3.301100515540271,-3.5923658076369027,-3.744408239091444,-3.6604067214606046,-3.3371560664403943,-3.767228204228984,-2.9847111388737346,-3.003790449749993,-3.0531470370310454,-3.660772273293868,-2.7622751766018836,-0.5621563720342605,-3.711959661375178,-3.065543534427364,-2.0064379859483727,-3.1007907660363943,-3.6558029929380638,-3.7497765432641885,-3.5200135691063275,-3.173700633182289,-3.247505410462784,-3.60407895575006,-3.8322436937825364,-3.600853435598293,-11.976536998349449,-3.0757053835763415,-2.5225981210309922,-3.335154077793453,-3.5093506145060913,-3.0936410023172134,-3.6235259264666646,-3.098948178961384,-25.857807554524598,-3.4496246354829316,-3.5784531310270937,-3.2831247596552484,-3.319633975903765,-3.1309145806916234,-2.8098867002619543,-3.5232709843743777,-3.4168379319100888,0.14178736486464338,-3.236472732848419,-3.517495635759141,-3.37803512460521,-2.3560562247570447,-3.701584765400999,-3.478240816910894,-3.3437957286693374,-2.636342216310235,-2.9397824898030547,-3.124991099600925,-3.5333741367235634,-3.679252076835156,-3.031722288628458,-1.9938063610476666,-3.8069823047248286,-2.663570352823518,-2.9357279160914924,-3.8229411890607943,-3.6598559419524817,-3.3750939645450315,-3.5913821990503054,-2.0714098901690594,-3.592311465993589,-3.1926665072020852,-3.224545688566418,-3.2550248245544857,-3.5035802095174837,-2.611469396020414,-3.119463240942446,-3.617876270543762,-3.239507899728418,-3.195069637838886,-3.18695045414393,-3.5761693653484583,-3.6707364328358105,-1.9339904169257787,-3.5599609923360735,-3.1003752833905986,-3.1772786028554747,-3.2462661187992734,-3.653344446219202,-2.303695880058189,-15.696347113820785,-5.518833153328847,-1.467113398559097,-3.7107004140793127,-126.25918892203336,-3.4042983140426357,-3.3218739358498865,-3.554230779607395,-3.6871714660421575,-3.5641741415628383,-3.4276996088420364,-2.434791629720042,-3.3358984685624153,-2.45925044784836,-3.47744925415854,-3.2390612953095843,-3.690267420332183,-3.1504035180100143,-3.136999417248081,-1.4148211315943404,-3.3501589892107515,0.34734562933449964,-3.320844504803108,-3.186196930094001,-3.5154621069867833,-3.242635982616983,-3.848589020361679,-3.5294861824219974,-3.3609575991162273,-3.286727992749847,-3.621996000934103,-3.5279605253609794,-3.4051868490209305,-3.157850947050621,-3.322991391609394,-2.869276127425456,-3.6598991554510425,-9.867781400125702,-2.4355420489566386,-3.6282972067762196,-3.633061456621124,-3.8577756726160857,-3.021216721552516,-2.675281857745932,-2.100056832012889,-2.1010529595361076,-7.430790757708478,-3.577110372608793,-3.3618582500187237,-2.924582422643366,-3.668630164688116,-3.2457412853103427,-2.1689696522668047,-2.824033829712694,-3.328778155396173,-2.886954194830693,-2.85582938659744,-2.8392516104352734,-2.4515289102657496,-3.789215468847004,-3.6206125095050252,-2.255216034661573,-3.352665320947478,-3.5833096666934754,-3.2997393432515087,-3.1708563083705132,-2.667949455358405,-3.7990060714627614,-3.303828954025399,-3.756548191743747,-2.9750024574507967,-2.792449188483971,-3.283239182106366,-2.996926606559448,-3.6968803068327967,-3.2394224969812226,-3.261332631434011,-2.7965456236750246,-0.9616421202821497,-1.9185471403985777,-3.3134639582637346,-3.428110736903702,-3.3269298721079297,-3.4986850881178624,-3.009425654067113,-3.4467262649265997,-3.4577255007217955,-0.8690281579424499,-3.158944462844343,-3.158071063928747,-3.5052510673237656,0.049135925804184855,-3.2019471078197523,-3.6675947943803524,-2.920673766870565,-2.8928209181981055,-2.9948245373670437,-3.645307855188714,-3.0524021162715806,-2.0348856245279303,-2.6792818781589576,-19.673677028825498,-3.6726613370749104,-3.5589489682028606,-3.660428074211661,-2.6489610445869007,-3.7143382413111685,-2.4694871602993365,-3.2049785780982436,-2.5416893265685707,-2.180026391791105,-3.3066385833091583,-3.505925532052204,-3.143199157253627,-3.528679648286661,-3.0903362850790854,-2.4711948687143153,-3.566049439884992,-2.2324802181635786,-1.1131283404863868,-3.2055625274668684,-2.778023729770769,-2.729935098836698,-4.125084667717761,-3.484972895908707,-2.203709814986131,-3.2764617583222417,-3.3116600920758317,-2.798709932586097,-1.1015925140649567,-2.930587368635639,-3.2727350597615885,-2.925669722690905,-3.062776618355872,-3.226685291122473,-2.4209370863638053,-2.9539274381203504,-3.4259323204661394,-2.4905436263849534,-2.8130362352096228,-3.4469619296409784,-2.985974817249399,-3.562104594600288,-3.6355607645558012,-3.669782525492737,-2.3876559848280863,-2.9695900493589584,-1.7060853528894153,-2.9936091733050736,-3.6495484577070365,-2.2722832030318934,-3.218885258744547,-3.2583328672092415,-3.7614713205883783,-3.767008603752813,-3.7847649376160213,-3.247764911712281,-1.7851723612995882,-1.335234282583863,-5.3698196874896995,-3.594586779360343,-0.29484019888601476,-1.6998088676630998,-3.4301572770606046,-3.3928824453768143,-2.465026037795945,-2.3710664672017217,-2.2730394743866373,-3.2857973199562767,-2.9109605824691385,-6.473101310354939,-2.2877954588643696,-3.0723852192911263,-3.083005579916459,-2.9198717212454977,-2.9415556554920492,-3.240972503835025,-2.643328485335772,-3.495023747460768,-3.69794925616611,-3.791362140554017,-3.1061016878772723,-3.4759851832849735,-3.4360147046613534,-3.110370206840059,-3.6367380651414694,-2.584524030706344,-3.698778468328037,-3.5362243639967708,-3.1893609013376247,-3.781022355352219,-3.607891457978572,-3.5228056211661465,-3.025516646719439,-3.590982215833426,-2.6605728000367845,-2.543799456321472,-2.9058725801532272,-2.9411338505860605,-3.5307462435868255,-3.4830055160784945,-3.1629563106506997,-2.661240164271823,-2.959084287307689,-3.4307555960622707,-3.3772664293257013,-2.9111406608876016,-3.147024070844607,-3.432819141451072,-3.782950700756119,-3.008890613161488,-3.232024089985936,-3.177088832362042,-3.717446524570478,-3.316206226401049,-3.7402770440357385,-2.164006455988653,-3.754940765657631,-2.1940496853996643,-3.158145351053427,-3.4422141777051065,-1.611893378716585,-3.415540976888584,-3.563377261730288,-0.7308261724235345,-2.142320348938705,-3.7019334897240266,-3.525282482387732,-2.8780370666318946,-3.2871725882766265,-3.3304644908752126,-3.1037751161544462,-3.539092261518035,-3.353146596791613,-3.6904690437681826,-3.635779836921811,-2.576711403542815,-2.4295847279146385,-3.5994006094612865,-3.686301589281279,-1.8360748291260065,-1.9416195839141155,-2.1436769088648835,-3.8482198724739436,-3.6384528530288724,-3.041482618159182,-3.581633129776855,-3.5546307915976905,-3.290804256778286,-3.7842285232998982,-3.7203222212113505,-3.780614971846982,-3.4958087038456944,-2.575529672288843,-2.6647510422088976,-3.052152941801433,-2.5443749732761773,-2.3652978101251882,-3.6588744442770706,-3.329763516687759,-2.906253019251517,-3.573387620806749,-3.5831432510251764,-5.775652287689464,-3.381176319312086,-2.7101291558433296,-3.3577399107691517,-3.6825086175029726,-3.065502935971538,-3.548359060434996,-2.944903170291374,-3.5956826734572225,-3.7459983783480157,-3.358159323503416,-2.9854445580723734,-2.163160673588922,-2.020356857392715,-3.093064063896472,-3.5319568486890196,-3.064664199321973,-3.7429842590658677,-3.586373922316202,-3.186651007337454,-3.244885283367435,-3.0203338233550796,-3.7483263122200197,-2.5285441631247867,-3.610345950874885,-2.612645695952785,-3.085863334880254,-3.090081218300377,-3.2707479649947606,-3.1603610134879676,-3.1047172200769313,-3.3207344197261537,-3.2924278773149713,-3.675226603377962,-3.349995954301036,-4.413835612115906,-6.539760816136621,-3.61942313495554,-2.5172298185813182,-3.1827222066094945,-3.6089353307557865,-3.4776855785791727,-3.4317454584245395,-3.3547383618476903,-3.1690156773762928,-2.9892274925473834,-3.5567955416597075,-1.9409454839893643,-2.949733162215982,-3.2722693115880066,-3.615099166341183,-2.8463138145116833,-3.193734698805909,-2.8961931614816177,-3.7032367928893706,-3.446343546739751,-1.4161781809256293,-2.751249742655792,-2.750804981801709,-3.4907246471549667,-2.8623514027779855,-2.774082095925376,-3.6579794157684384,-3.0325201335124072,-2.5018696143328367,-3.8483113206687256,-3.414719757616696,-4.1736952098791615,-3.290934060029424,-6.941121911314349,-3.0632582125066454,-3.3953575449892157,-3.7386263971839284,-10.602030685151659,-3.2397609357015114,-3.6651987598494284,-3.0539953689717603,-3.261248547991855,-3.406240548354144,-3.321034615802872,-2.9290299439952294,-3.9449947318251346,-3.0092519438567975,-2.228100680067824,-3.5002713583230114,-3.296097759439802,-3.687038506202646,-3.6658232605654484,-3.230374567319756,-3.673691698205157,-3.2575579029243653,-2.790482772144595,-2.4913486808316647,-3.444527627401151,-3.158042552110685,-3.2234311408514578,-3.266546426315387,-3.3878242626925035,-3.08017801169738,-3.643391470853697,-3.444741486562064,-3.343380250188432,-3.193945397484858,-2.5988893337129864,-1.5375990030240874,-2.221590411096568,-3.5113563215589347,-2.28186342228541,-2.296737446036334,-3.68446840107902,-3.105985880519255,-3.2069703055895142,-3.0801221944548263,-3.0558452744999993,-3.4255191113946606,-3.06941873100835,-3.7805904810577546,-3.803643765460122,-1.887939362895611,-2.984844836616674,-2.47736592485969,-3.647107603360743,-3.6105656610891144,-2.9788933480022095,-1.4444638597434825,-3.6843231491654675,-3.2273773729827506,-2.5264134127021745,-3.7368235504453766,-3.7045537115576934,-3.3120480217891646,-3.4767557269443223,-3.3642867366998606,-3.142863011796873,-3.4079385147240586,-3.4995966048008538,-2.856916632508605,-3.153046376377321,-3.571583482957154,-2.7622024717311917,-2.6895047085959587,-2.781788238737794,-2.817724690100753,-3.8197876244905227,-3.0945005956487632,-3.319740355781735,-3.643066762426686,-3.5026347066531294,-3.739915947995341,-2.7398135061050217,-2.7402787349822235,-3.7002855373067205,-3.8781775471999773,-3.1841202760366,-3.206295098601739,-3.3742055609658843,-2.877975347092618,-3.3339416459387934,-2.179150686096848,-3.3943804380401423,-2.020241686766006,-3.1656212381020192,-2.6328592691377772,-2.29592057760491,-3.082644860572738,-3.0756463962427163,-3.4653534187798942,-3.716133849781576,-3.5336175035310253,-7.105020795782969,-3.407405248568508,-1.3616534174110981,-3.1348422576623403,-3.6084211118833363,-2.238733053594379,-3.7664401687413043,-3.747939672903143,-3.5112190640923737,-3.7806726937249344,-3.4326880607641157,-15.418532818339699,-3.5833565298103203,-3.2223297725807982,-2.954425598340384,-2.865648524803617,-3.7413161050414976,-1.9754153309379847,-2.712944581852413,-3.3819818647502786,-3.8026658134819833,-3.07629727436034,-2.812782855637997,-2.8561457249168147,-3.675564175972601,-3.4380817802484747,-3.186097033995793,-3.772208690385415,-2.9962852184980973,-3.608495345435605,-3.6475202371522966,-2.8744373849496854,-3.355215133778035,-3.586721179156086,-3.5210425517649995,-3.6203940495914977,-3.7976513843101642,-1.588860725060364,-1.9093241482841432,-2.1574189090672684,-2.594729228056128,-3.087845340867168,-3.779718745969449,-2.4257323848028007,-3.5257514918232857,-2.8085004591068823,-1.442694938131005,-3.161003166476783,-3.8041059763626386,-3.5338634756182064,-3.4778341455888353,-3.32180690016342,-1.8758939218537645,-3.537301155148331,-2.4825631433046964,-3.6479526893700265,-2.5011760387310185,-3.109729256166457,-3.6683128791978743,-2.33814446135125,-3.213701211714436,-2.516872484786985,-3.1882488684089783,-3.4347056960395106,-88.1909790757909,-2.7705923624949205,-3.0149064211949796,-3.6235923503361316,-2.1034276072479408,-2.844425899770103,-2.665323446237893,-3.887398323344848,-3.4262967413677994,-3.8191309562305333,-3.3054949371030053,-2.5434970464335693,-3.1326307609240627,-3.164018485374151,-3.597812000810997,-3.734249415820888,-3.150883820775767,-3.1881967521836097,-5.288635118678533,-3.5548554488649295,-2.534561750842668,-3.0659725896601246,-3.530743503281501,-2.2255709458707544,-3.724467107924294,-1.2484863619144584,-3.0829302155445344,-2.739175009693195,-3.1365854125978694,-3.1455003894267946,-2.1996914490576147,-3.2483219621649972,-3.4030348595570517,-3.646689291113673,-3.2416238932105,-3.4863663473420408,-2.8012493601747206,-3.209770545549522,-5.297192299760473,-3.578053995301371,-3.0397400275362054,-3.511993686863988,-3.2579613266398266,-3.468939836135936,-3.156711240066867,-3.717547888077958,-3.1925421912212597,-2.353583066130189,-2.5283360299957094,-2.9727812293418046,-3.43241452629862,-3.5446514994409677,-3.6868243972442527,-3.5503575451946183,-3.5729250547263116,-3.1902961631699474,-3.3223109292766244,-3.530334029123157,-2.7724736365884555,-3.62290298530813,-3.195093567893538,-3.576390405621772,-3.3003907394215855,-3.519530795568544,-5.661122332703625,-2.6356929695477493,-2.9149676276538554,-3.821534600047148,-3.8997877872094877,-3.518244924781674,-3.438113811278193,-3.1098307601519686,-3.528050352193059,-3.693059722234222,-3.6863081404323226,-2.8596439063041075,-3.352832360717604,-3.1227576742733,-2.700036207812654,-1.962217790558978,-2.992541133197358,-2.4611530758285647,-3.589745941011373,-3.4095779911161825,-3.176358146125077,-3.1709135491605616,-2.368790805854961,-3.340143570893056,-2.813480944864813,-3.276697273772254,-3.54814084236787,-3.0319172496618827,-3.593580456640439,-3.6250737653557565,-3.0642948254147906,-3.3570319745003867,-3.1850075432926053,-3.6324487809546864,-1.6513206771066138,-3.6497688895660647,-2.6346199682743863,-3.7490997492791585,-3.7897353956026207,-4.311974186707049,-2.8730066290658414,-3.139187986617209,-2.6640337010971185,-1.878884173311619,-0.5121989408045182,-3.641955031435862,-2.177827227425618,-3.566084533842508,-3.6225714958687107,-3.389620127137673,-3.5521612115848704,-3.3611867144310654,-3.64879944531494,-3.4285758771062746,-3.4195690124058724,-2.292833950502996,-2.083289082179419,-3.0076619317855906,-2.900470079373535,-3.063399698428716,-2.8305915056084614,-3.3247771564791364,-3.1215927734722193,-5.442356273952952,-3.424385050872556,-3.6319258865311035,-3.6610154724546025,-2.6084512196589684,-3.5023638026569954,-2.8954431901780326,-3.4211181821355225,-2.556005448565424,-3.3629241303641932,-3.5485733844740612,-3.468958147825523,-4.114560783941474,-36.796713622257684,-2.115196461209617,-3.547730287765333,-3.2443516481633985,-3.2877486055141554,-2.955600224522487,-3.6435554660409974,-3.7793569010134873,-3.7282134926850623,-1.9209205448475006,-3.417869316666523,-2.7625704213789017,-3.152896082985614,-3.6597470153893186,-3.0673832613454812,-2.6467922143411697,-3.6238066312485846,-3.159866484974083,-3.292755311746128,-3.151949719956947,-3.350214651246417,-3.044704690034978,-3.3715924326575295,-3.6486014798864566,-2.5581241509099364,-3.6641326422307614,-3.4451985253518784,-3.1898327824878305,-2.5299651873602658,-3.7212540709351547,-2.680901487330271,-1.5591038259099157,-2.2944395326584943,-3.4109146021347483,-3.478826711372763,-3.585570732271613,-3.249123363011747,-3.049500084586914,-2.817973315527046,-3.6038454277169563,-3.83992482157614,-3.3846565560938755,-1.2487330182188792,-3.5997127150848223,-3.0406401382796773,-2.3901250154858062,-3.3200764443487056,-3.651280901070271,-2.838750201817872,-3.3152782906169724,-3.521693660728898,-3.6735561465657645,-3.6005838911376746,-2.9409261189806775,-3.348672767226399,-3.6941323673760618,-3.3820848416552685,-3.7413773497825313,-3.4365908966764613,-3.3722764126600984,-3.8376090674861096,-3.2421810273504423,-6.792592413254285,-3.5762492902596503,-3.1804898118101246,-3.3060150572429627,-2.798039146652293,-2.500203693438099,-2.8078715546901307,-3.6823471498984133,-3.0581377923238797,-2.752742102595297,-2.914241377583096,-3.5797712871125893,-2.350054185708053,-3.752410881707457,-3.5432005805453515,-3.3464045404392646,-3.403402313904014,-1.3683598009460896,-3.3090343067397567,-2.860197124581705,-3.0980317009239373,-3.7738311598243124,-3.301323425163324,-3.6925173171057124,-2.011343854127592,-3.3619065542779576,-3.418555849028589,-2.6544665116592654,-3.107008816092805,-3.643064843786231,-1.517553387481152,-3.784139605240963,-3.552112032018894,-3.4597895754961225,-3.7456492044969587,-3.1974712566872134,-3.521193826226471,-3.5708909877229025,-3.1406143785947793,-3.8683897530809785,-2.8942251927412164,-3.719794027224238,-3.3603451901091783,-2.75745908920921,-3.7512055656841845,-2.848306309646132,-3.737225098222383,-3.692638576934105,-3.0559026347208396,-3.715089132884795,-0.7302359734942891,-2.09178563877351,-2.8703706816727745,-2.6666778496336896,-3.5734680366552776,-3.477858208518345,-3.7660400875264064,-3.0490187879534014,-2.0798926541171667,-3.5597473522356458,-2.3649602582938085,-3.701829754591106,-15.686421334570564,-32.77701039321711,-3.1176004000263613,-2.7582217111086527,-3.5085469051606366,-0.7673102464670035,-3.4203346513217623,-2.7009852997879307,-2.8198283660763632,-2.2977896557522506,-3.6054092481340385,-3.0869137555779798,-1.423234618706979,-2.015158281343436,-2.4633723019293803,-2.697914233467609,-3.3672268392992417,-3.1317445558475896,-1.884490061948179,-3.7570948680822505,-2.8470572639456098,-3.044347418839644,-2.571107181208486,-2.6804391047503913,-3.615306191057687,-2.3793602102171327,-2.913468743373254,-3.7441658011632337,-3.6029063248742896,-3.372451823936702,-3.166724289497578,-3.7607804835995293,-3.397712792838022,-3.417524903962729,-3.739295045133407,-3.157895292001214,-3.6686912887466825,-2.793929146869307,-1.4562153121249253,-3.3474954053812698,-2.573416733443453,-1.7067042470611713,-3.8201051756823907,-2.3733802826822665,-2.835599905242269,-2.6144437620032486,-2.487980713319703,-3.0635165942086027,-3.6266717499100487,-3.6613655527006745,-3.048060553711386,-3.5689106189798574,-3.7289599896299768,-2.3387804423802088,-3.662247639590053,-3.1507038945214205,-3.6517602911367506,-1.8856579305979673,-2.6568037346692828,-2.544979051877311,-3.556525433031586,-3.7486134819079275,-2.8130057994320876,-3.55351687284739,-2.375465578167819,-3.0278821814445256,-2.800043719880624,-3.851519512415705,-711.0024668925944,-3.6755728696649297],"x":[3.812422892863032,4.642181411505196,3.2319027806058163,3.731781459906429,3.1004085237901933,4.619469301853893,2.334742516906215,1.771319952860655,3.8176719222352773,2.89074531477842,3.733863081716847,2.7455723082750905,2.278099164655889,2.0251383713776825,0.057355913666530256,1.7237388869503045,2.784432953798508,2.2223301909802173,0.17416995127969348,3.7669839107220913,4.99669788868336,0.4203680562858303,3.4222876228778887,2.0947942441261835,0.10256187887948576,0.5637457913198662,4.0112406438768735,0.8759592054031273,1.6551151542385867,2.8708983419420853,4.861909485432738,1.1458156772200367,3.1115200849905786,2.1680074752370446,3.2190809844195845,0.37751486543663226,3.483379547265042,2.747277475425002,0.5532459974789905,4.619242260925704,3.3165155782359945,0.4719360762638247,2.9127292429246188,0.7852566467882216,3.843481192649354,4.0832585239959585,1.005168950326354,1.953458276946618,1.133026082094939,4.312745157998074,1.1807917623995123,3.807813740291258,2.4476114357012557,1.4693153744538145,0.5470980302797201,1.3382240555101055,2.3988189860057085,2.4475669519408694,1.0134319166246764,0.23413074545514,0.6841443003839431,3.9523255325404074,2.340802068516621,0.2470508237438196,3.1375298704656496,3.0517610233457217,2.4204027371315395,1.6928937289341284,4.490616476761234,0.6546380949681407,3.119503288608297,3.3945998980381065,0.034230198308219384,4.901841357880724,2.1530585824976822,1.9513339999857926,3.3706942217915525,0.538355657065922,4.1632601014052515,3.8959307399389798,2.799252980804635,0.4153923191949016,1.6473364433973336,3.924839415153105,2.191854474077457,1.5161913495380397,2.0445003702801157,3.1582827938361593,2.709317474804438,3.598622626702009,1.414840648459158,3.8259178622872114,0.7838856605308853,3.737579523314134,1.357099910644981,2.0583339156554983,1.619796188984437,1.1669473614176396,4.764714113635962,4.367447007604845,0.8733198041114487,3.856371957961018,4.0342710386682565,3.0833826632293313,1.0068238934800255,4.566340417825934,3.8417131038264527,4.381078833149148,4.41048783264068,2.6717883293349285,4.4197224224857425,0.9083388621194421,1.3686919068881198,4.366126653509081,0.5045150099161222,4.840867728763967,2.2147024298036797,3.5798570415454725,3.363570332342448,0.2925454422272944,4.700472603618159,3.107115498023878,1.648816589926021,2.1578934759127666,3.6248886800684144,2.885330662284189,4.995094268034082,0.1887210337301859,1.5900491099969871,1.0710113635523666,2.6994763535842337,0.8120820129546591,2.925724554514526,1.8315195341881474,3.2526994620527647,2.142695227255378,2.054510227495393,2.199125211690298,4.483748911333,2.3347400501920976,2.3791120246984674,1.8448159516120666,4.768342223117309,2.6568627043390736,2.5799739892207505,4.976982273192241,3.8614697068176964,4.008510623992669,0.714418240677851,0.34571614566871633,1.7554592896701815,1.1068457044132507,0.8914185296040733,1.1941465774758897,2.7884622756693833,1.0145387840678621,4.600229497480939,2.2998069723726133,3.8427795909494114,2.684445303501292,2.297819073044983,4.101945436050894,3.419930715928301,0.7896687508927969,4.3355458986774575,4.632693478738221,0.05685792418834934,4.998408072937906,2.123595481328401,0.1219682954945911,4.775928371863629,4.977973259991616,0.18935103368552753,4.059619804956886,4.795627198095183,4.096080656650406,3.1542235676120267,1.8152692299537532,0.437979164119936,2.8531820504334493,1.7358635030649816,2.157855429933764,4.443482105030439,2.9411319288022986,4.371946331308604,4.720804222439191,4.368133981435159,4.964119298852255,4.6563270513833,0.5425283822974913,0.23550110455466622,0.4605583193870144,1.9275183634319815,2.852572919530494,0.9866263525633867,0.7716900630551737,4.306406868284917,0.5177250482668616,3.6144772448319196,1.2957296560325116,1.6995860370125304,2.5144380488169693,3.8512538774554708,3.1211215269899464,1.821177587096866,0.219692017288996,0.08848556477630942,3.6126651902618634,1.982907907152931,2.8845102995151573,1.0039521293131226,4.6660999605206035,2.963145253296519,1.9674256989054717,0.456018158276561,1.6503949833398057,4.29890731682952,4.524370650986722,3.377466238735053,3.805266386711368,3.4936538727788036,2.220991182693025,0.5942670213479428,1.6471042663993862,2.6687907346239426,3.1676161824343785,0.8469394373436301,2.985335172031557,1.351962353987729,3.0855187342040704,2.4904500017477504,1.198407098508898,4.3785528835347325,3.7927645111042962,3.660760156763354,2.5382570343508135,0.9545247802859025,4.029558045244036,3.185509697581291,3.837413573646895,4.58692276036289,0.8607600059741649,2.5874518332247156,3.2511543577653876,3.27199065100599,1.125147325654322,2.505648742209031,2.467056867336227,0.5429175365036498,0.14595964267264394,4.934773253059602,1.6383823995171543,2.64614506328134,1.5851905819018441,0.1961418599946052,1.2873648366159307,3.7670623730476227,0.7434839507563074,0.47076597458398095,4.363658147655455,1.7112700328055896,1.136908862267736,2.0872248242128277,3.0876880431854756,0.026223938031936234,2.773041883513263,4.267837175730403,3.4163416415714796,4.61366349120817,2.1105397104137094,0.030713596015501388,4.867030281576645,2.7230158696250073,3.7098715169563947,2.8279094816941672,1.5712200714947433,3.2229586614386507,1.2024065278418028,4.210334975733394,1.5633113979012403,1.732492238268174,1.7326521775907067,4.386117429085997,2.1087812539328024,0.47411747814168126,3.721319633966634,2.9816205097115933,3.532452005893245,1.6009422789888095,0.5987053549613619,2.381631491267835,1.4864208735414342,2.880643126533504,3.7359750925756785,0.9789021502817841,0.16622439143104795,3.6359342151743546,1.050161951898767,1.134523069504082,0.5976168489490197,0.6480931418343616,3.8846398744606967,3.4181992579608558,3.6538596397252188,4.647652427805767,0.18483607254718537,3.549755463427405,3.415474032552738,0.42229521407741943,0.6154311461826245,2.5396983680454355,1.3249596227259675,4.41424351434758,0.9774791126933391,1.1721011602090914,2.452773149687375,2.549094622864645,0.18393017320334382,2.382566815028917,3.9833128641332713,1.287936218003085,4.262431442179264,3.8629952571168547,4.460060459989053,3.4306135109158564,3.9466170420644486,4.902113935499286,0.9857607839883986,0.219389144249601,4.716041226824438,2.9157924877975248,0.6266099299179173,1.0437221000648422,3.136763023432516,0.6638120135685577,2.190520293497044,2.350349679713619,0.5491582256775318,3.1480791100262504,2.50910267966713,4.069388954498651,0.9035379639517238,0.6050279479579856,3.88858613510785,3.5256485041529997,2.693398856446183,3.5971855026056563,1.4618291359943325,1.1461961816783073,1.090865641883585,3.3073384132637775,1.8729074116977973,4.964075751717796,1.6352556605782975,1.9300984408349564,1.1528111702638855,1.7080176034488137,2.5218538429445445,2.0679975939901327,1.1664481567799734,3.313251590912719,2.749926545726816,1.4303353424927767,0.6961661447943845,4.255335865726703,2.5624510298123813,2.2242666557649504,0.1744609849940515,1.9158314447956715,2.6552852946877428,4.284993466095574,3.067876224363142,3.2077091228134913,2.5918254152352205,3.9220529867427523,0.8995298833632093,0.8759143887834109,4.125530628872931,1.7893481482162954,2.622941334634239,3.069657268394498,2.6182136764912913,4.262052102989902,3.407349756242797,4.404862793137857,4.747444835724663,2.438519727336508,2.940605223729087,2.0339948815153406,2.0912204106438335,3.060944087115426,0.7074510944690793,4.278208833984106,2.537335537406956,1.017870957079201,0.3607142085669168,4.152426963729435,4.82146384316517,3.7346021875652538,3.8601708132582457,2.373126054290833,0.4016257134295531,3.5651591682896377,4.656649208154938,2.3394915825499094,3.151893541864564,2.6981195744711925,1.7854729742273445,3.473441665786413,1.2029589913287886,0.3749102119688874,1.3260787697316123,0.2599676739990997,4.025830861223421,1.0625384509063118,4.171025800453326,4.442616407114523,4.687978302714228,3.421618593193246,3.765450924584827,1.765720563873906,4.594514950916975,4.61305066183603,2.4179713232380715,3.3018428303153993,1.9427567801552847,1.6554005687689333,0.5705581566612394,4.888187835583343,0.4230696984818205,1.22165809953656,1.725756893507443,3.5919556855553747,2.2380980177603913,3.5446470298126833,2.7332136135423046,1.4203275134872395,4.84329015646219,1.4568561110283917,4.167098380796715,0.8998173261183473,2.5191771779138294,4.428782364301752,3.350870800372505,1.2070380368031453,2.33447340974784,0.09656836411383374,2.3162317538970854,4.743902008892159,4.272699663497091,4.12352820040785,3.9556077138670354,1.2736721825406871,1.5374729589952485,3.3825598767232066,2.1267140214173508,0.24052248668972265,2.60901502997944,0.3941297484616457,2.3764275641887957,3.9248305025163885,4.976487626697866,1.6319557244342753,4.073897821090884,0.173897574730546,2.114118436668254,1.7167487277186722,4.995385381102811,2.743488237838142,2.9886083099725225,2.3671536258603645,1.3357134249487579,1.754766427420773,0.6022811560010788,3.9960092875778797,3.755483390977341,0.2887344137656911,0.7073973801495892,1.5815630661757996,4.069847007851589,1.5605111736388544,1.0882448743188422,1.1997952261162603,1.9419415332882872,0.19853069078794583,1.6252640750152236,3.7071831719229364,3.788275327112931,2.6098077221974725,0.38046153572021124,0.31472080359024823,1.0643847362561243,0.15309712183778634,1.2322891904237354,2.5219522464677335,3.7943227436748863,0.9997366488604442,1.7819790145877379,4.962102007527997,2.989845043592493,3.9009378437183106,3.055463412452765,1.979750814617337,3.9210486843513372,1.914883870554993,1.7360377169037189,2.034868470152168,1.6816453667705722,4.2383158346481045,0.21859135124192797,3.336062962514582,1.3783906817245917,3.368415318480017,3.3480870471306403,4.349549907144281,3.5964897022029305,1.7890176153610338,4.42314217644563,1.2428075756721335,1.1558888911922272,2.924368430758162,4.875163629673395,2.2711411342557533,1.346343621312025,1.1534267285296396,2.7061780382459046,0.3301583380490314,4.361260200466566,0.1474251504716173,1.8882274933087217,3.6474342363558554,1.770830990679847,2.838626632954572,2.7080804074408285,0.48557898479315353,1.164853504072092,2.521849945997232,0.31230978832036294,1.5182315937123692,0.14771593995036691,2.0550431879252375,1.7385159063443212,0.8947389967131558,4.116624351668485,1.324080493542782,4.51086140773866,0.18492069790452148,0.6115117163026962,4.331096771987143,3.9934424529502897,4.346164531387805,0.994156682605879,4.457026093008754,1.1116189053032954,0.6502591798436241,4.104525070661428,2.568636343147711,0.17161121174532057,3.5045062637293767,3.1511340899828486,2.8102187191317682,2.839896801175368,1.6317775188366757,3.3218202367413863,3.298196428518163,3.2403231393873257,4.567036198595412,4.612807822207485,1.8231536740286758,2.6653313214095364,4.6796041397642405,2.0386892987278324,0.4895067839119216,0.9398557477509006,2.5898038843823756,3.3230133426398445,3.7131786249759555,3.6586658495755997,3.7691854434000183,2.161681831101391,2.9680036819540554,4.225178920754308,2.8173738091737057,2.6732087996527354,1.522620695498913,4.824018163039289,4.871987814548521,0.8504206710082873,4.720974506574107,3.721335574279502,2.5177702994156315,1.5984584705944638,2.4296231667443244,1.7569330436643116,3.559978799982736,0.5179141696623868,1.9955542620558508,3.35325515187882,0.00821167993801053,3.993999026251618,1.4856946567730778,1.3703546977700443,3.764677184931511,0.014644435828313762,1.4529772922088535,0.4257195037957473,1.8645462280264524,1.6973563278007053,4.982143496670435,1.9167321580168983,4.360396885578702,4.741921512825047,0.009314708337619937,3.8685123226836913,3.1674193787757163,1.469379928269735,2.4242015535217396,0.17820432859395718,1.4789811207724957,1.4325081358589797,2.808799433627154,4.012892635314578,3.2110241450818897,0.637147272530163,2.523328407005435,1.5208317903323254,2.3088301681834023,3.1240581440283375,3.666828873560629,4.675108316881392,3.98825468447619,4.48993692773422,1.2386555159324886,1.201790683059667,3.648751610841414,0.5517854829662339,2.426882406272499,4.4526781624825045,4.7155798078895605,0.7307105962609217,1.076694940380738,1.7745758628104236,1.1682055208522246,4.873980528769005,4.796502072023976,0.23977820349851742,0.6200911401304754,1.7735971638150783,0.41899210159419553,1.8423533149243454,3.9518738331374834,4.528147887777988,2.7413562263880498,3.783213794712732,1.2897634153999193,3.9899062626913615,0.9219497996817616,4.693423327596883,2.762457445319182,3.2386814697623914,0.3185607168882365,2.4850425357628056,4.558845125938506,0.6969902031410447,3.8038849038172415,2.8483748118653027,4.147681467092113,2.0450380230210086,2.6686179008151187,4.419955681416314,1.8107349980709764,3.5882656854361317,3.200137401370118,4.546812716970505,2.37622786450556,4.730475780803629,4.005376216139126,0.7033868777613383,4.881237944371693,3.7767747604649937,1.6860792477215503,3.227526664497838,0.707401745630224,3.9993906035016167,4.537481949646347,3.696833088059188,1.697724919992255,4.115299175999861,0.4770545806308013,0.5207074434581416,2.603533976582235,1.083867701979715,2.7640082815716447,2.061589712314648,0.008496717352740601,2.48403448819027,1.8615276355189647,0.6476872901455211,3.430792238191245,4.6195215608021725,2.949573538991934,0.0690221762284593,0.7484663723404195,0.7525557757621459,4.583041200714804,3.2448479516587794,4.089389701152762,4.813760623339735,4.718899086272642,3.15478737454249,2.707322164187543,2.4892695558799973,2.839910872583081,2.290103736724216,2.231518380991088,2.089233453024688,0.3628352447850347,0.3452479568564504,1.9455585128169428,4.655853000001179,1.6945977266047063,2.4361764971157163,0.8755944490364354,4.493795920608924,3.1485761952623017,2.3488597217755225,4.743381303391291,0.4067381163168926,4.250365514001752,3.740360673696994,4.9078446429926395,0.48196485452865145,3.845329686704834,4.591970488703531,4.898964231152755,1.9322823519781496,3.659881953922184,4.426447156637746,0.49135802006363805,2.4252542803505683,0.8405317663277523,3.250994461670441,4.033758506944364,0.4732094420311439,1.183552747083998,0.47066253408823977,3.8948388045816817,2.076631004198699,0.4610096520524243,0.40537478266317595,2.5326192477138942,4.894955580055988,1.4205337949971875,2.2223192103205824,0.06241966522841591,1.5087012719521686,3.1743768289424388,1.6513927392828887,0.6878406016981731,2.9943966864830482,3.204506607671118,0.3736272432130727,4.23354297545097,0.3376037606243276,0.7430208258629445,2.6735365865695417,0.5311340544873955,4.635936898330485,3.4423611713818794,4.148351533636062,2.7843019700113913,0.7277319137698601,0.8109363504426936,1.172201566872878,0.43481439122946663,0.8563561564440914,1.3273429149837468,0.8387240924007899,2.2352070107669997,0.14450035560435004,1.0205584598098172,3.6017004751097215,4.520496934722276,3.0671835192283647,1.0621333234998565,1.0241528783999099,0.1921595613373117,3.9840249508721373,0.9289623907120748,4.648906341981281,0.8841060283676561,3.7158878113484493,0.6707626214357376,3.2159924315204647,4.900909657953886,4.717943404194717,4.419914048558249,2.115608438031514,2.595089443943893,2.6198501892993176,4.606288903496294,2.169664219261148,3.856299843221013,2.1564419677267024,0.8644152803946326,4.213228758646431,3.242514556220244,0.16899059660137938,1.9251180963423564,1.0561727103606555,1.188945143606135,4.06360664547745,4.78632211803991,4.021661623981306,2.167577436863967,0.5515869249241967,1.2384077876747246,3.2401608602020504,3.4278107857552733,4.611418051147468,1.7208152611850769,0.4515199775671297,1.2719330329010192,2.0411246563015872,1.352605012518392,2.110307552061075,3.6607522341190855,2.6696813357149107,4.87477703956033,1.9894781772302939,2.6118451192765493,2.067743531125299,2.2999271596782798,4.310910861620401,1.1352383354419915,2.3399196497730212,3.0742958277905896,0.7815280444212491,2.045526308031238,2.6569291223410643,3.3903947688782097,2.0163885965398176,3.53446309491968,3.845961163899619,2.473684906124609,4.093231455206421,4.8397563103007,1.3913283357946193,0.0982337808169953,4.162790028554388,0.7871294794330441,1.483352565657463,1.866654784654449,2.6906761844701377,1.8531706511518642,2.1618943036852145,3.0732380910125148,0.2868035741064423,4.699782725084304,4.104933484682549,4.908919818427342,2.92919096714079,4.409819926813706,4.600933716902013,1.7005902449044652,4.461365945585085,3.521509447950517,4.567422228706896,3.809387278425196,2.959877136272824,1.5289805750321306,1.1231122591856535,0.9660574126269039,2.716151095572883,0.5389026601874125,0.4454782105889066,1.9297030629322476,2.7175681805451646,0.9753180988775589,2.6640479922226143,0.29689887598359443,4.497521456665621,4.098591614535271,3.3679545192071236,0.5131304799815195,0.5204486232086958,3.7172136849046113,1.456704258657664,3.5487874805045374,3.2825780109263505,3.2207418824442735,3.356599946690654,0.2960897248388139,3.1869292842089623,1.853268711082935,3.307813331591177,3.2147367962209774,1.2876148034527568,1.1319703220417943,3.70734962257272,3.2402497190780166,0.14461968423477245,4.565476562086596,4.471393478880991,4.698191766929096,3.701732100403632,2.84759851978837,4.3046827169224455,3.6116611547871935,2.6053371355114274,2.667489593495793,1.0377440795859172,2.5821573056026947,0.48301254782220027,4.068593444405629,0.0635954821266338,1.1006040080583401,2.760328483346288,0.3423863543057415,0.9029123620204282,0.4090648301925004,2.570150184014871,3.9241854561186793,1.8176792270472808,2.1829141573265156,1.5617474320376556,2.0271287818181163,1.2684777837623973,1.8851318720192245,2.353029135266693,4.917477200842516,3.362754776463782,1.935265997909691,3.384125939168233,2.0591179754308597,0.5604888773986583,3.0818166968044123,1.4087774438264378,1.237661379630457,0.4665111443449754,0.5624901565441276,4.218605358646372,0.29670884343046877,1.2225013524923722,1.764605413241761,2.584340229803689,3.3346625042121767,4.569016015820074,1.2365652378909398,4.348917857292238,1.5387700249558367,1.9056646290016621,3.196378694597178,0.5596634335595163,3.367383647691191,2.313069579654293,2.108425178669404,4.394405372887852,3.8936892257856215,4.636837867686118,2.5626275287280356,3.278306684079957,1.1331301584873832,0.6567039018287024,2.7470312721779533,0.034405513170059354,3.149397863057466,3.035611628480984,1.2781614556971432,1.7647172952008672,1.0647799156361648,1.205618577876163,3.4985777673368066,1.791455713029042,1.9762271914373364,2.7847667205808224,1.043412750792031,4.484323807238453,3.381224215578975,1.8286270286857387,1.4473130987812433,4.492884265195149,3.8762945128224646,0.6104452401801397,1.744952327718401,0.7730008595492288,0.02289909401236523,1.5688712217856637,2.509328034205697,2.1464070160746553,1.3958070524785615,2.382066036839887,3.4278576241802874,4.8385001413646735,0.5076061235302276,1.7942502749851597,3.5919268818236896,4.457530480828956,2.819999888570263,1.415686324688521],"b":[5.2083070243610585,19.33135724551399,16.469416060857,5.067562093751401,18.817812455094632,3.8454481475959,5.1084981684444974,3.901013088625307,0.1434541048184501,13.58689175416005,1.4556032641561067,4.925856917046536,7.960168005075414,4.712734934339382,5.199131295245101,12.300322202927187,10.95753900025413,9.823878132127778,9.070290016181698,10.704362649352227,19.934236904849918,10.31811235248886,17.81369586900448,6.338244457974804,2.6062693403953263,1.4429925528680787,6.456718049090124,1.94163026435485,6.221668003456413,9.99411841196503,11.58393723068389,3.1444483207457274,18.33987640111048,10.924010341265792,5.051665387082371,15.06965293811055,16.808843314078953,4.315335666206854,14.445271522040862,12.425193369561578,9.92703510999339,18.32159562273067,10.113439341587934,9.335115010300612,19.547187284823107,18.946052832743177,13.763361753142291,16.538469238638186,12.601859491360887,6.987545621042566,7.479486450455437,9.605788644049511,9.234733761348792,0.45971096879131146,19.7090893116907,8.932560265672764,15.785953340841639,8.007112961920196,14.336678832429861,15.45424563714974,7.626779360912779,9.086403193279992,5.936423335741696,8.500447059824179,13.2245922687806,17.802954447541776,6.439497345662528,3.6874511934560505,5.239452003186322,11.630468571431445,15.040316705388523,11.32144330476339,12.247316117088406,2.620138101291225,17.31595599842788,13.087049460339792,18.48254314243297,17.85380780635301,18.70651637056621,8.523947054117368,7.924114854898239,5.373360392224051,8.399197239758456,14.411618537259677,6.38941145805489,0.6749758836778019,12.038529324745046,14.752054566308486,18.4695111436953,16.532460501393412,12.941438679198143,18.441671418453666,9.774879893083117,5.294979765241998,9.535140271260762,17.78376473290107,6.5507981402377435,0.4178734453857036,15.602956049887592,5.213600115506072,2.787432957319891,6.44395917249958,15.059663291312365,17.8956254412754,16.67432277414145,5.56690133246335,8.977378943592287,14.565112399008253,18.31712334022272,16.248255995510856,0.32482466250537634,10.755594133100734,5.135798073807778,8.315398028746745,16.58233536249446,3.2563180526021807,16.759197413646937,6.459580632465234,0.10052865478917372,15.588098526404348,1.7156718860956266,10.59341923395532,12.829239703749952,9.91168111304502,2.3002621920292343,14.68672952369397,8.79285188333785,0.22566718048760315,11.897967739488564,16.449370003540427,12.088640509483222,5.239524545656242,17.661253203750036,14.913216276434088,11.549894620787278,4.390735291393688,7.642119339870459,9.273738413215057,2.052516297602942,18.187914613269722,8.425184761347468,1.8636576504827884,17.73144018363559,3.5473952345196835,6.429810977015302,17.43155257210915,16.27812032065618,9.963888131599292,17.50342048222567,3.780124280963162,17.07103684524514,12.041252434714522,12.180727059640141,0.2620409735871343,13.686283058025243,5.775450733763345,4.32508958170895,16.457154768290224,9.344793198231214,9.55593784977243,10.705110555228634,13.407439033442579,16.10442923047264,3.385515608211569,13.267698727733785,3.3129608749119743,11.94016020719669,6.722697493134522,17.784995952463213,4.849219525984165,0.2615120757270484,0.9510864019766174,0.43173162006395316,16.284024385355753,0.032935870285597524,10.729407751930076,11.155058201498633,15.868971979298813,19.62650722463342,15.630559754955954,14.521651926676435,2.7402277192933644,9.029709913080763,2.4463873554499305,11.857907985260168,3.3948727845397464,15.115753638691864,4.033362260232218,5.560913168332671,1.9807036209591145,13.571816123548892,0.3490200979765046,12.533693386028663,9.284569378386749,16.157110408257005,12.737121210168212,19.419751826597007,16.634406702235598,10.238266070713191,12.98114223105275,16.967805678822426,15.174912544911429,11.569800463898506,8.058649570516323,12.853865375296163,8.276325533900074,19.00672560112075,0.3409802806624196,3.1398901302808246,16.754689881338546,18.776846623188778,19.376454797439038,7.266076836413751,5.737917674223949,3.800007861605401,3.053817570885826,0.5781719183586675,13.358844085413978,10.454985903912611,5.177434590876238,16.62207095786873,11.316222524422281,4.0084128647018735,7.519888808048152,11.44117011947992,4.6721410141616015,8.474805182516715,5.680806066429662,5.090387754993957,18.834636237344352,16.605345966020604,4.318303203342961,10.132352830739881,13.721031250258736,9.766233042071203,0.7348862916111543,6.585759274553844,18.71430004283983,10.6978442077008,17.71548160708538,3.4768725649710586,7.712104771459041,10.753048986856605,6.630927721766042,17.643630878148908,12.270938625055212,11.174629481153708,5.907167617928173,0.8823762312864103,2.4024814896397473,6.432607590040114,13.826835840693764,11.99335716162964,15.31786377625342,10.131452318768748,14.509323534823482,12.065905005811523,0.6254058708060839,11.477395715571902,4.9039439391228745,15.240891497757518,0.30103495504133715,11.083971768868395,17.105850976511704,8.48065051310034,6.173599444626325,3.8349234104616814,15.956527028569862,4.659605736791503,1.654790066459424,7.079967289373328,0.23004673816171106,16.83002166192919,14.12383715764264,17.420525216579605,6.398743071300488,17.80984844607549,5.047255821754342,1.8522978792468203,4.915647558211882,1.540656145469983,12.332335236268545,11.624233888220768,9.738549799639188,17.011713312175555,6.814202899953701,1.6090973158546618,14.217658241822463,3.267682626184638,1.214583122330315,10.167295854775587,7.405601711294261,4.566232390447551,1.0128703575043474,16.070931901063155,4.04962519757833,9.94940802573045,13.286550192312493,7.827239436410007,0.15531119754633949,9.337117488197606,8.350659443463893,5.963151243608107,5.7035519298359905,5.014637878906001,5.527188639340208,4.286842629931216,12.198610371710759,5.924372496614816,8.065396821603862,13.087996614814932,8.527010572070246,13.130456377515252,18.759114077545348,18.526889074892736,3.226994080184218,7.866041123227849,2.5793281025943626,8.101922134427948,15.143842619143918,4.2876358693935845,8.065089183701296,9.498218653038224,17.516286962006085,18.94255673796145,17.73652404453065,6.225404764266065,2.286305425401638,1.7058485025045966,0.8839332105975384,16.09927789386458,0.310563636268264,2.671924628255624,12.617527896078862,14.872209179079423,1.9879703784844471,2.7369262924031457,4.38169572769445,10.732328392283046,7.487655099281758,0.5823077432256163,4.862890352131366,10.636797119054812,6.376954771960839,4.359695355272808,7.442545159287519,9.395182402081442,5.513692744177798,16.153399124762302,19.77547750409768,19.171772214167536,9.916646873190498,10.907725728228534,14.053037435414337,10.195804588780488,18.44185371401383,4.954276594021909,17.738204304848214,15.435811443797714,0.18467996250024044,19.16562447401301,16.22619035824226,16.23860458991497,9.757039024753889,14.118473001873596,3.7535272653259444,4.237544710297159,8.50272083453817,7.295029285296568,14.884576449670718,12.299944390677005,9.02961957544234,4.015601802338411,6.464613917961199,12.096402769633698,14.57439194576608,8.778527594150795,7.362223962664132,14.391054321485367,19.311435776098183,7.699655935856486,9.877061171842767,7.914076931346856,17.560028265624542,9.265472906887911,16.587272127818842,1.8687851846071135,18.757564675892034,1.0004047507858216,9.595234445296995,12.872080294663032,2.041816429595471,10.77161252539244,15.956259918807243,0.9589586503332193,4.185615391144566,15.56098706678882,2.0609431764167185,4.82074129632255,8.990549063303952,12.071085689860848,10.804475210011827,13.271263351817684,8.300229280452118,18.521696440222755,15.701662855493566,3.541932264490266,4.214215268555304,15.18815111189368,19.50444351187738,2.9421636669037587,2.851843955446074,3.472454783200951,19.32209050419023,18.87701937972109,5.421556969986034,13.89690448047499,12.701109886239799,9.621771631462552,18.21804455712764,19.807739598539467,16.98870327927966,11.349158308329699,4.749758342306429,3.5144728725583985,9.520212816592512,5.538003997964758,5.223942137994255,1.5400852055074132,13.603767216507459,7.830704094999339,16.920678235045777,14.202862325870074,0.2745104341688176,11.342250122580072,5.008865993692395,13.402076728453647,14.572539419464494,9.706726208275512,13.524146659158877,9.094592261762449,16.306272723747565,17.36162569825952,11.70444726187322,9.396841067411659,0.8198911874780679,3.139443705549483,9.237797330167368,11.654659034307628,5.795180806792373,16.72916955764871,14.543321200222334,11.015930773733054,12.279762139143692,6.308406407917699,19.47211638382496,5.94944085863593,16.710859046543835,6.756004627245105,8.737359925266519,5.8483071947615395,7.647325101292011,10.036351515134525,1.906404858860613,13.377000644199688,11.14414960967867,18.059465803333854,3.3305495145151376,0.506741689164727,0.35025656978170616,17.01041965410022,5.067155886381078,10.466553094994339,18.43498368577368,11.729249703055409,11.241692611438339,14.140843213901565,11.81871552420413,8.410784715434417,13.17680179167558,1.9552621935325876,9.087493561143432,12.614327419433335,17.364835277412553,8.583285443401385,11.024790372225116,4.82276557419139,16.84628956685826,13.491066955558262,2.0151783276078605,7.513487264753538,7.0438515736178875,15.806319726733108,7.857458232243881,5.603907943484008,15.280321623786573,9.686031482645037,5.1310263038457915,18.45371086909626,13.023101958308398,0.917581872923181,9.987258875869053,0.21343744315478919,5.46794913331508,13.46158020269498,19.82772874154253,0.16285597403423058,11.511413135317415,15.925237270401924,9.9616775876332,9.700661171663354,14.127917987195193,11.079058599622504,6.469364069450418,1.532232666346478,5.305311037809997,1.334353175728813,11.94294381283845,12.919893527269256,19.763008693333248,16.75294887682005,3.6398364090337143,17.82413175170094,11.86473410467304,7.011614292436765,2.9655849877501295,15.206146819942457,4.816234960717756,12.247776533208658,11.840933537286741,10.977972233789055,9.938195591527776,17.04947217477967,12.851754346810974,13.945812090403855,11.79144817599996,4.096339828813247,2.0168479547993723,3.3007716617766203,16.700725953391423,3.4580796977637585,4.097431870802888,19.48627673741627,6.2894557610695845,11.977623070522787,4.767871554821621,10.606088386983131,15.040424074757501,4.908710722041429,18.211917788226227,1.1582320614148456,2.966621465044068,4.349010042224779,4.900551678888525,18.971125127006733,13.914506336607953,7.170061799709191,1.9477102964952353,16.37616594491085,10.161196341755069,3.2802265417082133,18.637923300898546,19.401227349070425,10.336514805865363,12.911091245722082,11.879756874937337,5.985722763645804,9.12659714834049,15.242535998879806,5.467281570449978,6.105092595281492,15.703731794323165,7.586167630934,6.888110175907549,5.81617174943196,4.420302148847961,19.034999397056104,6.30156273425952,10.568036856700287,16.864513438876898,14.032819907661818,17.39031153244349,4.462782130271226,4.9988633005903615,18.98005624707402,18.9643140270428,6.6412331666479,11.611533529261585,2.168671867209535,3.530773982961515,11.728989816356226,3.48827040361837,12.449634902272425,2.2769367833614407,1.844869104127418,6.918092146799952,3.5045522186720612,8.072491724360278,10.614271062881176,11.591725537454618,19.21874773993817,16.516433984186605,0.48763734613161525,14.47777245534136,0.843914239491701,11.0574800126351,17.3664129703973,0.6080212893298453,16.917914332844756,19.57438621402948,12.559911958088863,16.545350240138866,15.478741565137701,0.18138871041340376,14.493205596455429,11.412767621067061,7.442515331137267,8.304983431820547,19.789082684036956,3.0317669974445938,1.3186628060063432,10.919853588638215,18.964487616592017,10.693039798499946,5.544295831866175,7.040382420631501,17.719048638771827,12.450886823735141,7.998682474143122,17.47593988352171,2.362524778112638,13.878877242224226,18.92630653932983,7.779428834119142,10.21827932506827,17.893479555507547,14.490422300683147,14.604572292641222,17.449619784147945,2.1011492310293445,2.414782616651183,2.9967900005524717,5.708081918973331,3.8174819418571593,17.51197621196724,5.2035585036418475,16.892832205748327,6.66557956443242,1.8294425157034855,9.830973760380282,18.392413774812134,11.68037876564902,0.6633293820086905,9.589540421051632,1.5684870493995495,13.764100425279215,5.093186484338226,14.121064238532565,1.704784468177536,7.132982823729508,19.34110217823005,3.1074778480113485,3.746204394227828,5.999870759426935,7.508847415158413,12.338618416561808,0.04348626698319702,5.755017460542495,7.9839741752854065,14.881221258833794,1.6839535818090656,3.619620075516239,2.206143243538161,19.489041306391385,13.265301926957726,18.45672498415187,9.836650788085048,6.158426570997091,5.40489146784827,7.185551253496918,17.10667560198676,17.794171373514985,11.104573486295667,7.015054483295402,0.8064867590564528,13.443878848483998,5.561818962174168,4.974733147511987,16.94297963287012,4.561425332461839,18.453612592368355,1.1634402822896561,7.912577870840614,5.804324008254218,10.548500467196998,9.836340465632482,2.048791992250738,12.847882157347987,11.320910169611608,14.9940387041294,9.354236133195082,15.402624813106662,8.109343346898449,12.063802375876271,0.742789941676194,14.394254738080715,5.3222749674138115,11.662089412377949,8.055090258868729,13.522755817395247,9.604849963273367,18.678880657118228,9.748091774542264,2.8670318160125463,3.8656199012515513,8.585861492537056,14.835182678872174,17.119574574929054,18.952902461916977,12.929848583278707,16.946428557730762,10.56453775975787,13.022306093514725,12.703193058691724,4.052725919384064,16.198097859401507,6.75774868563316,17.547861024085954,9.081562420555457,12.647555766694417,0.95199957410951,6.760111415735417,4.68353715685192,17.79583457851573,19.995518764802128,14.930724420229113,0.9631284218737157,2.1726010417276775,16.671867165933683,17.978889114640644,19.400539187767457,1.3579802828818588,10.457822642036287,11.05084526120013,7.095960469459408,3.5519695473273982,5.917612757966042,4.407213564008909,17.84764115838611,14.525126178398704,9.243875456546323,5.482845982825806,4.084312744976426,12.36287009614713,7.517487136932077,12.113167180956733,14.792109981972752,9.615428713054502,17.556336463588163,15.86758370316395,7.810495660960588,14.04953499437324,6.966272863214837,18.69886947567195,1.8885007162574663,16.454927525954876,6.5141316913919445,16.438035616415764,18.70401134207587,1.1561417301672305,5.3736585556571725,11.456023781416548,7.175952562206054,2.1986611801789735,0.2938423850677685,18.923488888113088,3.400186106675287,17.26540408977941,17.183342618917994,14.533047840819675,17.02853883391431,1.055197569590618,15.14594522792323,12.92067016594821,14.583551104541321,4.529345365060622,3.6929463602132806,4.131229021385097,8.22496119935613,3.8653987458931693,8.224368942383204,9.42124197245812,10.797765194414307,0.607047886736165,9.025171281013979,14.482739241421143,15.37903805717972,5.214394244786997,13.924663643698718,6.723521332284852,10.743045023855139,0.5077316367030971,10.247518941277228,15.673306348123042,15.420160735956397,1.2370214573556737,0.0739684355081538,4.0981064850093185,15.90420763767658,12.534756088799991,12.272636793529825,2.9471512915464393,14.023023541621399,17.951023646756646,19.08130981251027,3.3886978493802644,14.437165329019983,3.332520448080958,1.6380170851800147,14.006189492789982,9.317969692890227,6.808426211217262,18.112929918619383,9.752070444656518,13.078536652040844,9.782104321761786,10.884286541170237,7.316826180225573,2.6045214187880816,17.286059195114834,3.4307902488310926,18.31263393639579,13.278013405182673,5.767676083198454,5.235199270725732,18.38464701468912,4.455072377082971,1.881075457807273,1.859236426081674,12.516895762347286,13.287963149102783,16.10308143042229,8.813809276065951,7.034858184465254,6.1423229366152166,13.68285435070284,18.2106463479342,14.289294557844068,1.7309094874657305,14.146267233841021,10.047169505151302,4.523866657755553,12.384094206541803,17.264464481963678,6.703083804398711,11.74140110559839,13.808646292256096,19.35796869263914,12.823401558623715,4.969421080363392,3.2398639607593394,17.78170566038032,9.33964253431959,16.43380295184442,14.22975305865589,9.672433079405835,19.63721909892428,7.60245496009142,0.5558222515607802,15.303053083375143,11.237078285423738,13.338543990850695,7.409818668653889,1.8816769197314898,8.043117800185588,19.72314327109261,8.902506435437235,5.758300597880117,8.532073625595288,15.269514003181591,5.143637115850606,16.394260452908526,13.3431011592564,10.805080025990454,14.88593233867961,1.755960901768443,10.077623240852706,7.8361537385943825,7.0596635697020504,19.084163504304648,10.669731397199334,16.586661755743943,3.5272890071166074,11.259962559056564,13.969750756425302,3.620292237079741,8.62708760381851,18.424455358502524,1.874480368786604,18.283615406749433,14.948894292510516,15.842491709309927,16.584963931502664,7.22187490831161,12.306801581029344,13.752314061256495,9.281932375651664,19.19600129890729,5.330909808898006,17.856604963241345,11.795504639235727,7.363989654224712,18.58894937187689,8.132005501575374,17.508407443351246,19.780622181893083,9.554135245905897,18.051164335518266,1.0300297019649207,4.005313221209312,8.559189989428258,5.043989227549388,14.09547355821104,14.426533232847438,19.380646680562734,9.376282791877276,0.6473135456733203,16.50294831870316,2.948328808506111,17.979093629147535,0.24576021388160285,0.0870754816717989,10.068893518059468,3.220782400004567,14.718253903560807,0.8769406253823053,12.259674162641314,6.199025832369474,7.810791269960435,4.912801580112185,18.386308022953408,2.2111925673918886,1.8315124344849876,2.9405283913551017,3.969181018564716,4.7827118170677885,11.873730292887256,5.2507095183940145,1.6380610274927987,16.606972242714697,7.566002872209774,9.197680824995738,3.2772319206394274,7.073690643606367,15.038648031082488,3.058373063423181,7.785631242950415,16.39077117515111,14.573945284140182,9.644905595161655,9.689988190304394,18.920256193135998,14.12890853714372,15.053317699945197,18.982132430721418,11.396025945045874,0.9290162647136535,4.4795232219043335,0.9946841709290322,13.230649200265594,5.719941922657945,1.374913800813733,19.291460139961284,4.232768066584058,7.143597733061915,2.3181923382994674,4.913922362529752,4.238199548843018,16.12834917414405,18.078213423862323,9.83976267088666,13.61272570611793,17.09351307719844,0.07071727699449859,18.113263525567188,10.878190797829799,18.380464274088254,2.374503427749053,5.146387108574961,3.565576250876754,16.20193185581059,19.369427092009662,3.7322877540338295,12.632278871881407,4.945168348435178,8.833953260339262,2.9147681580227003,19.024916795401193,0.0036663006466719494,19.1717434717822],"mu":[0.5075786355740497,0.40219919630008705,0.8820078177667567,0.7482350627268839,0.4192216021579487,0.4588548251177196,0.09082441346026737,0.3704152982654534,0.4590839015684456,0.013108437160392672,0.9280850886213332,0.6782585749039172,0.7955631447295657,0.38119580505838946,0.5795125368741454,0.1773807749633307,0.9220650905660768,0.14516275144146262,0.5734966629190612,0.8210897998967759,0.12763893129770265,0.3232783770417955,0.3075285201504372,0.034020693536587654,0.8416638986231197,0.15741586744628888,0.5194800768835357,0.9591973398180897,0.20716881618584493,0.26321722917837254,0.38475179565786743,0.424200492331974,0.47363042418381585,0.31148569561818196,0.006463569414095094,0.41414604800639365,0.03152597282736891,0.8321926517558589,0.7229368794699464,0.031530913071200484,0.8836832652445792,0.5111765017392662,0.2519311627083052,0.06848175369541298,0.6799610687494466,0.5975201707344344,0.27107921453503847,0.8026117218126836,0.08442715360054853,0.8973733958905497,0.9563158358836616,0.730899691267481,0.6907618206852775,0.22470224981158693,0.40294628472304983,0.7830015498062326,0.25104422513132585,0.9446317942328009,0.8725906445588683,0.6231721471220613,0.2161188390573643,0.35323990500739577,0.6726735878502974,0.2578032460816444,0.2362771010580751,0.022731282710909628,0.4698460803228699,0.21420905426551662,0.10627257468535523,0.6356938081001733,0.61497717965403,0.0875229605020027,0.19391567111710106,0.6402890493356721,0.7686754340191013,0.9228194690344209,0.6220537633287297,0.3785366160556518,0.4695745859246345,0.5946854797340659,0.15650374161284497,0.9855967850748286,0.5742708762262223,0.15492298222724665,0.610479032002639,0.5554850117620604,0.6017903554664328,0.09227092539053894,0.21335268394346607,0.9214586481857796,0.3332673882121904,0.8850582927875175,0.6690490062848777,0.3282261810829388,0.35575851307292194,0.46954757413696435,0.37815070133336537,0.8570583288967568,0.5308193148281,0.6077857887868041,0.07006602906685377,0.347633250601725,0.2597780520217361,0.004027481164270208,0.7901175446566207,0.3148151058549924,0.6129963671219498,0.9975643668322296,0.174466423021985,0.7265361478809127,0.3893436284920888,0.8316278209433485,0.3763751347427715,0.00970694744389422,0.6349423732150872,0.8684960940176063,0.34719926937315293,0.09015516136845192,0.602855144497715,0.44795483777402834,0.6763621767165802,0.6733346572634369,0.6897041983326759,0.7300818330495982,0.6720043643807694,0.7824924947298182,0.16120947272104846,0.04118897687351297,0.7933856410855731,0.6752185256481724,0.3709414658753205,0.8470730539782989,0.5049949626562322,0.59602193079091,0.8968416431074868,0.1067186036550416,0.4270418637851452,0.30118657676459226,0.13003251072653987,0.7824460074472712,0.6321524756412336,0.5810358827577968,0.5394685882297572,0.1587530144207634,0.12612925283344523,0.24410520754982712,0.9820840042227375,0.19254658712404926,0.08711839571620472,0.1623581103231666,0.7007933970131519,0.9722140340744421,0.5071951005723574,0.17189013865127745,0.1327904960668449,0.0632878981976086,0.4399984571264197,0.25963378725549413,0.9314895588580789,0.3455365199408891,0.9802123970806884,0.2511616191723325,0.2232834749528596,0.8619055655445271,0.6009355174368423,0.6260456766184073,0.1072919278781237,0.6445911823212642,0.6680342803465715,0.27583854071065583,0.501650853031036,0.3406316192115275,0.8861301865604572,0.35714226215191713,0.5475838553243828,0.4677943689912232,0.7354309137042119,0.2804564701408738,0.10151756409453228,0.9493954347887053,0.8803689358262683,0.14761499530904976,0.450264046113912,0.8091276602049624,0.6804955259119603,0.2271882421189506,0.1148216169703915,0.6780426864589195,0.6074823220459522,0.46682231407272323,0.9007441658530524,0.46479296670010894,0.683212949203569,0.394985156058973,0.34107384214123493,0.8349698913232404,0.6331383554355714,0.10409790578659095,0.11628551326789105,0.9052165851100245,0.04469804147115841,0.7667468464521237,0.8009757932602208,0.07529229730560116,0.8417177046957198,0.7388647019496675,0.5058557605127187,0.11742471045162883,0.1046034653368424,0.9330611723394049,0.8670740281485636,0.7797676515406939,0.45741662216531265,0.6187952419112162,0.7292634839182408,0.7601665198545207,0.08661985092878344,0.6264663645648616,0.01480732546724961,0.7654621968800808,0.7551411520882261,0.7911096644202575,0.2438230966612256,0.7948354314420925,0.39871715484849024,0.1204944669243857,0.6301154422028457,0.6618213312293197,0.6849804409194646,0.06499379798996419,0.5353259522015343,0.7700041894885821,0.8952061659919401,0.07117212198668299,0.46074320276724823,0.49104855808207226,0.3625134755862729,0.7251562873342237,0.6111855145503602,0.489859199878248,0.9858490914921971,0.4249422928468196,0.276592997431675,0.5189820185219312,0.9190666526751816,0.6460707014607427,0.7787274585708519,0.5340427171954925,0.8902487814936049,0.9841801552683,0.05283071881122914,0.14021395237202983,0.85398052225074,0.413095322664341,0.2025631484477084,0.14420948926675625,0.4586562188111374,0.33994992847018324,0.7624957925387084,0.07327548728893718,0.3682146157243398,0.9989608630106084,0.9422522332452616,0.7779355085244826,0.7872726641324872,0.43082954796590855,0.5957910412230478,0.5075830711868738,0.791276622835519,0.7237192462060906,0.23507975495724365,0.1625738812456572,0.09164431860545919,0.6317529667093864,0.9180664247310966,0.933186759155793,0.7039430835382092,0.40748752978427505,0.6994813654282237,0.3043223830310311,0.10760716251680003,0.4837971759406463,0.20503970175700736,0.4146654550667055,0.5018523985670413,0.4629040312974706,0.8859734553395755,0.42706622292006546,0.440091552978072,0.32471938911975706,0.4169127312417171,0.8744230785194405,0.5148805195060522,0.2728201705293487,0.7408346424837053,0.6195325573465054,0.7923782458539899,0.6281724589961311,0.759184501058221,0.24494087471559056,0.6802371358817663,0.06632282126812505,0.7531270201766886,0.06894733340479609,0.02828385514337617,0.284936791828049,0.09786211868353045,0.5919458771479571,0.5308396246949751,0.8759929959954185,0.15612253020746092,0.04941436842819247,0.5535877596823808,0.7761213044546369,0.10843161410490909,0.7651916647825945,0.8666430800080216,0.01521830122515122,0.6944449825951444,0.36685336924211653,0.7588397186011782,0.7283633289974041,0.8797812946930621,0.8658408427273783,0.92166518234049,0.11567438337893177,0.3825991383510068,0.37968861164518675,0.035115781521923184,0.47312090774713655,0.9409716811056859,0.8660729624547627,0.9799629250485584,0.5889920912827549,0.6602285666523962,0.034040303118519466,0.5136428186291877,0.9980913986016866,0.7935177916996148,0.9774449925600579,0.3887903852760244,0.840246013855301,0.44634158415866776,0.46309185153808774,0.23703282181593965,0.8982897612021248,0.7069617394799843,0.12229558755572234,0.8272300761347844,0.6882484809023244,0.5317266872177877,0.6954081338673463,0.673339872188552,0.2295448832747662,0.9589816445610773,0.6185848830594607,0.2657004206060647,0.2174741614995006,0.42582861359865154,0.39349887204591494,0.730551595805907,0.6710651388106743,0.7439776929276383,0.16557357802635653,0.7207626891606282,0.14244083176887323,0.5009917556224632,0.7895409156189301,0.013335417284523698,0.6120270350757187,0.8377668422914268,0.6362096728672737,0.8870697152203022,0.00860567656544986,0.9620596138171671,0.8287969140630826,0.47486922787044006,0.7572039521658149,0.7378632454131324,0.1297177072206337,0.9555797666820212,0.1621649368008371,0.9753471283323509,0.6210272649101991,0.7286553562084293,0.7914766145999372,0.8583297501381344,0.49843661721832966,0.532889717893718,0.1363678754399955,0.5636787781317834,0.28906988163811476,0.5568365274794242,0.9356643961829718,0.9415509724606934,0.28738461949897665,0.04402517563426045,0.47499327428623306,0.7844908639749062,0.28326750663835143,0.6046597353262362,0.07027929710879688,0.11006493707788834,0.14367944006464994,0.8877788382292404,0.1863827314605695,0.5060467138758868,0.5297457652868869,0.6524273278873047,0.7638730727802603,0.18725196162292113,0.754265187786477,0.974140345102898,0.2807524674733113,0.9235961120006824,0.603899382672795,0.8736157174455896,0.6262366620652002,0.21151974747743552,0.3282746722480352,0.9515770964904431,0.26376862299542503,0.3739364301768069,0.8776781262773776,0.7899987664737125,0.9375312369601925,0.8823303988379672,0.471834458653418,0.9857820725623332,0.06570444007944065,0.007480726916340608,0.8508901112110636,0.2322323293029187,0.4880195762188513,0.6013962241606756,0.7007538658400885,0.4931308950308182,0.32255994965237433,0.4906807457883422,0.7761194297763239,0.4989639884759991,0.7094152359340982,0.9809571395734582,0.950952712808004,0.7191183276711468,0.9664053202311049,0.6716016082052547,0.6847128639224562,0.2789595822138491,0.7116170277232532,0.23093144995579795,0.8128704997566256,0.23639727458662008,0.9997968192169904,0.3210678622811045,0.4483029071997404,0.5504868131009661,0.9188784134634576,0.45538530429044166,0.40957726171775977,0.23582484051598485,0.8221175902341011,0.016101327815440714,0.7065179896216649,0.6293894857214739,0.014939158627967686,0.12012121177264645,0.15372737046908425,0.5136006606878809,0.5733430407274471,0.7945424165410753,0.315680012233706,0.27489763151919666,0.6306342248702204,0.2138810362122996,0.16973355324446193,0.46583276970768783,0.6343085471714349,0.1806162108547944,0.3119480840246718,0.43178913704597277,0.6367159690742008,0.6411209656345822,0.7697320521854984,0.22728362355659337,0.5179218820275708,0.6702951804610693,0.6555530738048685,0.5703819268764421,0.3354760875666918,0.6258006243182295,0.32123950257026435,0.7405804675655547,0.38571840431609683,0.5187192729688102,0.1535354734704628,0.3344209816721797,0.892173183876211,0.5350815214393396,0.9732473588668429,0.6283256648913558,0.09447374643429773,0.31656382240055403,0.2509206771771879,0.5368131928640285,0.5781416396515211,0.12558206919415627,0.4928068761147133,0.9872347234026633,0.8372384110724655,0.4655662914601746,0.460916214916975,0.8996606975574424,0.9621535623118944,0.020806273820635823,0.16185063766849006,0.12573725799843882,0.5179960146775044,0.6719766863269083,0.9566899552593671,0.3427091067972985,0.34251666639961686,0.48888370433126127,0.26854829466574603,0.10331385369251977,0.5972699205082503,0.7814874912263357,0.06083014672305298,0.4528791522546953,0.6823850283823942,0.3673660780850172,0.8699797035993508,0.8928548617207253,0.16196821748697343,0.27564130947679777,0.770739924760435,0.4915060619963383,0.02407005050923794,0.4148266940060661,0.1937590440798984,0.8516217449872912,0.9467697155144823,0.4736257515592095,0.5067021748674914,0.9553737996983689,0.5770096725981504,0.17145222160077944,0.2861810829802369,0.4764814849962804,0.6175521182925361,0.9136258776625097,0.6756351908780236,0.8832296421327201,0.15664370494705815,0.859744599283123,0.14603498366756185,0.30410214727502005,0.006713766353054762,0.3054388374719812,0.9598313826471714,0.6933122375098477,0.6317133393861001,0.7379590652531329,0.39433227311639496,0.38646365930542204,0.9082828207876807,0.6144315887917868,0.016667917812050348,0.5677862788812447,0.12311138280850309,0.7065568817689305,0.08297913601538731,0.8136542496942296,0.481377860232441,0.6821066004953549,0.5012274631108002,0.2800054660600788,0.12628856570169766,0.92892915309903,0.05854269430601944,0.6092457750999296,0.9061418873059188,0.3588540978795829,0.48410154562500685,0.3126497002975417,0.22571509969171588,0.9026859168894363,0.14038649487627342,0.5854399094046452,0.46133290194905086,0.4214370875002613,0.7731424886959926,0.19439131363499196,0.6087569715441197,0.1284010052018023,0.47936615696248297,0.7734796158984163,0.9231487185097698,0.22367918921328012,0.2624520571152078,0.19610857673327042,0.773872955091077,0.2877951566480874,0.6175499706408911,0.7455993987892118,0.8524050330844137,0.8097818613045848,0.45508902767197545,0.8386094750305237,0.339611987652886,0.7486468463392235,0.08572237924686266,0.010449448518387694,0.8878425896966329,0.029214423478090445,0.39144520705333385,0.5332850776460087,0.6403400826304368,0.23150666706862877,0.9076409527060423,0.5101338532347539,0.7560231349711188,0.04489392058575703,0.7821133489272238,0.26754264030713326,0.032945147034098676,0.39912886585069707,0.34573303701093105,0.35798977004653154,0.8612214339905977,0.5781694815859377,0.5347330561905277,0.9770897596878936,0.19196415867161343,0.19609980397715865,0.3882816170291876,0.18945294491945974,0.861235388059475,0.4371713251038716,0.40875339779337083,0.26878667799780054,0.6755630284073797,0.2566305671517708,0.8461281034733521,0.8793082917696184,0.672935344587406,0.5235501389541661,0.3178587677140836,0.6852427135378958,0.0499898742569207,0.2914062441980372,0.05683010331695382,0.6219057056173258,0.25438993722661496,0.14063451484836165,0.9330345778408495,0.09933753779985888,0.3563091903887823,0.5895559252366191,0.015624775521774215,0.0684179744277047,0.8965437841511796,0.06410839013627312,0.505070085248841,0.2069990136062656,0.024997078160165387,0.20638445709775532,0.16100008309969427,0.7179498878478983,0.9921397304606583,0.31347111902693126,0.45762135135820614,0.5948357488754086,0.1734948551132529,0.41299219975923585,0.8443205351245877,0.796341328278918,0.903711550487678,0.8157909530381016,0.19262851082715216,0.5707916238607769,0.3407554213201591,0.14795787555598205,0.16221829535250665,0.6578324436857057,0.15861430228679407,0.9997757954542648,0.2924471886449711,0.3458692294635204,0.5881646189443337,0.46181191427517043,0.613886919490993,0.2214643338812603,0.3932837957375248,0.9310107416381406,0.8485513636209281,0.24442857041827493,0.6220455318435258,0.22430059579308925,0.9326462577901222,0.024995843368294413,0.972867137429049,0.6261346322880592,0.4339032819244719,0.9423401552281303,0.10578249912598903,0.49849330787926815,0.586216516022017,0.8644584571439013,0.8367331636013289,0.7739053991987084,0.6772836720579223,0.6726813785503709,0.5493607091104928,0.3641657768396165,0.9772166194269296,0.9898557828612873,0.1521083734329991,0.9653118830607781,0.8070006328615271,0.8520082991108766,0.9608801640602049,0.061700210074551176,0.742117901125751,0.3929789665841692,0.0023711047016052866,0.7478178769039223,0.0854163982960161,0.6086834281746318,0.08623343331308075,0.1315048965548753,0.6949517468086652,0.670983602053292,0.15328000472715142,0.6772619659638686,0.11556237886081777,0.97994326537613,0.8617335453262593,0.8444760622389909,0.4347341744641027,0.3000307849967694,0.7244745680790858,0.7674154801106168,0.17369203477125916,0.8474642659186742,0.46509177319072226,0.8090355121658912,0.8216185444873074,0.7238591621432158,0.9943805725104302,0.13614688225367222,0.6394881904699905,0.3239360541841749,0.5867268657047022,0.8374864175312073,0.4275158789458273,0.7943302894762152,0.9263788074043477,0.07304685497399177,0.33422297619359775,0.7388954444039619,0.6728190481675895,0.39665906267953477,0.5402720970900989,0.13418660007471694,0.1066216836979581,0.9708305461706617,0.42196963203163507,0.3028890535909048,0.13221733286053983,0.1063366672801549,0.8139398668672946,0.8120199653521714,0.2973798491009447,0.12811242881456075,0.6973250078319508,0.44040477883382145,0.4203381578612124,0.7663086740343057,0.4358549611925928,0.60977323519642,0.8430853186225726,0.9169825770029694,0.7853889156302631,0.3835960566054917,0.62054584832025,0.5013230248472078,0.2826924284816916,0.10523812305104863,0.713204988673318,0.6345560110019808,0.054199154477226674,0.14052317302312156,0.02998859183693381,0.10655467038055777,0.8681248188952879,0.8079489584826121,0.7396282773744951,0.15054523735725533,0.6250890902524491,0.8063403327829735,0.8796904985863605,0.3440515922823475,0.5347692965453541,0.24552442575682143,0.24398914661078952,0.37936778291423257,0.21621818608850796,0.5255573399134574,0.7716438427006329,0.11841172856506788,0.5812114073406114,0.44328279703205453,0.4572600645398863,0.519772765256076,0.526755794418182,0.44557167000010556,0.3552167976615168,0.20703923886017872,0.02998651697171506,0.39494905451597373,0.6931104455956694,0.6554883114774253,0.1956458816614559,0.9780923767871341,0.36666787517893984,0.724745073756454,0.025520416804317048,0.3918843837931665,0.1648663570696367,0.44294638010901144,0.9068276359946905,0.09654964950982103,0.01735841986989728,0.18550461648408323,0.19643572116521502,0.8747775906727997,0.34114386330945345,0.22138023218765235,0.2701069408445076,0.748469554487377,0.19009135462993387,0.18824350998867367,0.9934994229467564,0.5718796166733673,0.06288232344985678,0.3823135714618522,0.9340887579616091,0.08622325607363446,0.5255761365122664,0.383213129175878,0.6346265422225064,0.4980100205535811,0.8005037808435069,0.2240844570851226,0.29489460492637476,0.26660944905548223,0.6217895939339833,0.1325363950457279,0.9022629122877788,0.11393980139034854,0.7453302543167242,0.16336762439814745,0.5107277860079942,0.4468258029580767,0.49712560107100856,0.2414028685535139,0.6098682757121698,0.09274174840313032,0.5871425313360776,0.7634685553783498,0.8268633536693224,0.2096186769814934,0.5053817625982662,0.7794528493759441,0.5915722225707112,0.3392012696495843,0.9385266656551734,0.3161150135069355,0.2092321329361111,0.3953818626347789,0.19677576655674978,0.6420090102319012,0.41556404153180826,0.36667516447065207,0.32343614741816085,0.6377975665912063,0.6080345108639928,0.36849994956396936,0.7668057898604406,0.6518402334896041,0.19234137105694393,0.4994981974606718,0.40002013373144685,0.6167454889736472,0.8649683605981031,0.9807122513903561,0.6199349176466784,0.7644321037963528,0.3251166520234843,0.9332240150334346,0.08209386808675889,0.5186537092050256,0.6639526047021174,0.7859264680355582,0.173758808373786,0.8111662925252672,0.0711854402813692,0.7993072053776276,0.02910436554268392,0.31452806729356775,0.5391279704859424,0.06352009331424835,0.00036536150970922776,0.8926256432977355,0.3561234993799409,0.08995436505685261,0.4365702651436332,0.35011276598167207,0.9470375888757476,0.15042371633633267,0.7778524094660322,0.6192601616330611,0.1493670628952235,0.07782838222990618,0.4582694585161322,0.8479371404562572,0.22778336711234326,0.1439238434032597,0.20501366949496935,0.8878273097069982,0.3564874300816012,0.7773191000004511,0.5000756332828424,0.20003708869115622,0.380295944854004,0.37399649999221696,0.2715911782778313,0.6817289997379217,0.529385717054671,0.5745480655438375,0.6801785453345148,0.06786988915400327,0.5067126072574988,0.21001477808145563,0.48109803041985266,0.9628701875602654,0.47223307769321377,0.093477701875468,0.12866994470396742,0.5533346374888541,0.6892817310414656,0.9319397043817577,0.3410187269509639,0.1861744002243242,0.5749046192769902,0.8001146535552512,0.22622935549795686,0.5340482778143074,0.6546995435142196,0.6005609116897364,0.8678622866771029,0.337069827229483,0.8490749351646074,0.7985205746736244,0.39319136299714574,0.31666642137889944,0.3422295340880177,0.5138479889400269,0.8145955652862884,0.28508947892098324,0.24982521258256063,0.2712037425569176,0.786694207811877,0.7172667365298375,0.2799393505968686,0.04706065350505395,0.5587725548701361,0.9144572790516452,0.49968242642466976,0.7734686245874001,0.8888012027937953,0.5069277120026112,0.9141546326113683,0.43253774825612346,0.0028600514484964368,0.8927496807090469,0.7906932181639683,0.83489119802358,0.07656793396973915,0.12804206392824158,0.6045259368669316,0.4314380459379761,0.7441974252919576,0.9225422875149194,0.4149841399428744,0.5690025879958536,0.4123993724882118,0.1952296587697362,0.8599322157554583]}

},{}],69:[function(require,module,exports){
module.exports={"expected":[-3.8864017102730037,-8.14385446092945,-95.20605115830469,-5.978459264461228,-4.136258701155454,-11.240705186254408,-23.659025200802564,-16.040478222046755,-6.805023883130763,-13.799755571936256,-11.395376595352491,-9.418708755348014,-13.46070135215046,-10.257993490073867,-12.00309397822836,-9.06695538407195,-15.888139473821616,-4.033303521492243,-4.7972380376633135,-10.76291008805937,-3.352910525434579,-82.44984858279281,-6.009644752648185,-4.705682402410938,-62.844078823657995,-5.640085825843203,-3.2186861066592796,-7.300792318647124,-10.990746500066127,-5.764874456097217,-3.379576582575857,-6.281096720739181,-5.5389459034206565,-22.488268115411188,-4.513735565356201,-5.125277989183555,-3.5318342111870806,-3.7837232119915107,-11.808524458764744,-4.435411412983674,-10.432083724463126,-9.275844144815437,-5.39173746275879,-6.1210168526461,-13.438454215091534,-4.741523682344706,-5.625340154838373,-13.404914422989602,-7.778256294597313,-8.018590758627944,-2.2925400995121854,-5.811982206774971,-5.983738081245512,-4.328862797872976,-5.018659329810059,-7.300332057365464,-5.4321852167613205,-5.755755391282831,-3.801351061483972,-6.692500882455131,-3.4430641082813622,-7.031284691937796,-5.965442227607026,-4.081029540802167,-7.166937393264935,-11.861033575038954,-4.273861669556419,-5.143938414164622,-8.074761993838553,-45.58626066753673,-52.994802434996245,-5.352256006033522,-9.626944562891953,-6.4273480134631935,-6.321026982166536,-5.366401296699391,-4.676779366895747,-8.152248974372679,-5.069553808691323,-5.322504231850644,-4.250015576402324,-4.0330696105917365,-6.103455137924694,-7.074803928843443,-5.863042908159482,-25.41253035206675,-4.578817861549509,-4.197047351711503,-4.807087855082862,-3.1047112941427173,-3.9701127111676233,-4.253828627797654,-4.471485736073823,-3.556735352803734,-4.523866311006239,-5.188352964917527,-181.61897301383806,-4.015609226797946,-12.407226870120784,-5.630193732806754,-3.620600652381918,-5.234116372275331,-4.640650069774837,-3.6778752931828835,-4.909980823790372,-15.63394931386365,-9.09817242042454,-11.949452885061481,-5.746061871795923,-5.604714470611221,-4.771829566399129,-13.985865496420885,-5.857578443404965,-16.629915337591296,-23.718925539294705,-4.796905215473062,-7.533026839408168,-5.711452343745501,-4.788418592251604,-6.282369573232238,-3.5582146734955646,-3.7062177999086297,-5.145686955972472,-14.16707950383393,-2.6192593659995196,-3.5703265223289744,-50.957875277238976,-85.74550283695697,-3.6343566879059317,-6.533510410595833,-9.284792777584444,-5.293112183385512,-80.72428770955568,-5.274645785004848,-24.25967493970014,-4.914921128745395,-5.7169542957424735,-3.4631115253801905,-3.63562042541458,-8.902638634385093,-7.621734031445367,-10.494185145349883,-5.64820196110539,-6.957872445470265,-9.656348313524889,-17.992326558606386,-8.031009677355701,-18.894295055849465,-3.139465189537487,-6.359693936933834,-15.647921676016919,-4.141715488601303,-22.065654286662866,-4.515330603532066,-1.2727724670909184,-2.647741895320194,-5.94067299501851,-2.9416555664404718,-3.1805359044045476,-2.695928644386942,-24.07017845601172,-6.060159935659556,-3.3825432250830065,-5.164971652492135,-4.510184173899555,-3.6274223452227687,-3.417538461907567,-5.592475843661791,-6.118774115900578,-10.19514808485798,-5.015149470005641,-2.9270794337346326,-5.570040406176759,-8.650457918179768,-4.5861668151416,-5.4756615053411215,-5.712802645885859,-6.826226357079548,-6.9441823008591985,-17.007163034722176,-8.250422868812944,-4.423258361469289,-4.064323417222637,-2.559530935835997,-3.739019082371016,-5.086552336822575,-7.582274143627192,-4.7766090305827005,-6.381179242509773,-7.084888826609594,-4.786457023690256,-6.1458775039996025,-30.55827293728655,-2.1403336552375807,-4.26573275435199,-2.1005822276165693,-3.048443449825236,-7.061502789472238,-5.981899653075736,-8.537121005279495,-4.178139753461386,-5.5744958863555745,-12.946223286962878,-83.13339913258665,-28.397390336364673,-4.3970623725942986,-19.065398188729116,-3.758971345521953,-5.287412230100589,-11.281407735476076,-6.803103488078946,-7.395545824589023,-5.3857941429479705,-7.249826245607493,-14.786699753206403,-5.966244021155607,-6.128715927221375,-4.745513115220959,-4.48888438044829,-8.709736451374514,-4.570305329350066,-5.857131825867725,-6.21289398942438,-2.767999637657841,-53.32289424039078,-7.5748898674297696,-3.6135540328567544,-15.036244691115362,-5.741502365567823,-5.606533152465409,-4.718842920913552,-3.756292635536957,-6.97736620933929,-7.263184782426421,-5.98318947684038,-4.704203832888609,-6.1314512839278414,-3.761433388730304,-3.421215413323993,-4.136021710849924,-4.119265729737734,-6.184573173242407,-5.152705115971894,-14.247442045781627,-3.883659872091354,-6.42116433052832,-3.9301133997516517,-7.789587776329077,-8.941706417249925,-2.7900145480383944,-2.8826689254496967,-6.5402609697584895,-6.268797586978727,-8.937284303432145,-12.623912918825779,-11.592063774571253,-3.9275992247469467,-10.950648023317923,-6.803311729674685,-10.614622169542699,-4.737903693565803,-4.738568435545558,-5.571546690788571,-13.20494469631882,-10.959721251692008,-4.133231800237384,-5.9506426056948865,-4.054901738725006,-6.655806410641993,-6.809754251939672,-4.457068875001767,-15.977726011460513,-21.62744029866213,-5.429674789301199,-4.650744270499498,-266.20669323612543,-5.564006125973832,-8.889012572641738,-3.412004434924495,-4.75130616818444,-3.48795897417237,-4.267206278229565,-13.91496491534894,-6.062605171608556,-5.157243091205121,-32.94395662135565,-11.959071712769372,-5.199440918949318,-62.065923678807984,-4.559194523030081,-5.935159752902395,-3.029568705563518,-5.788740579086008,-3.9527345634225703,-5.006790312028199,-4.098723755027153,-6.423064733720967,-13.48456995962895,-3.700259129291583,-6.356312847780543,-7.7403034419920065,-3.4928066372355566,-2.5660224815232686,-4.883816240495934,-6.793943877751177,-13.423234337700935,-3.922465437143199,-5.738417909496667,-5.495323942107079,-10.531672819845319,-6.045917903871352,-8.987324167971533,-4.374918096109528,-70.19140596728434,-2.4688951036868003,-5.546140386963231,-85.33767658276057,-2.9599178575336547,-10.184067217540246,-6.7633455944406204,-5.519118163277614,-3.998813487573484,-9.29540719885888,-4.287299289048159,-4.038542454868988,-4.397823234050705,-10.650986427360468,-3.072954913949866,-3.859753769500456,-4.6507712685969045,-17.41492919575815,-10.866275028097746,-6.288127313509532,-6.4436310135581145,-5.276404244923425,-8.781606889158208,-4.905098237951337,-4.4104256303476355,-7.533449654255621,-4.669473501790794,-5.3124996520908265,-3.6294209863468048,-6.2203397633392905,-12.576689537691706,-5.7561469048635825,-14.904485227171,-5.49332778785938,-3.3957565168340147,-5.649416998613129,-6.873618495834409,-5.031075503184139,-5.22354416763528,-5.52892716806425,-4.3944144526965525,-56.805687761748665,-5.134935446672921,-5.249757253355758,-3.391855361261873,-5.170729047456001,-6.919085324675851,-5.445931041321161,-6.291442907850032,-16.585774401615158,-4.645372356991319,-61.59379220476373,-4.785746225197453,-6.081284206395722,-5.353304171224513,-3.9640628059587186,-6.939345791151053,-31.096836543032506,-10.020875752166905,-5.765048481350229,-6.05438351592867,-4.107777614044474,-5.08675349312156,-204.84706510868386,-17.48899058737439,-4.692921810126205,-11.22051970558187,-3.8425380497955683,-3.2599473231065064,-4.3552725914233115,-8.245340357370738,-6.597733067386018,-7.763087795854242,-10.068836766436721,-5.158542248608738,-5.496942451427381,-46.47035625470018,-10.508221005586789,-11.111736273865375,-4.790844144898857,-3.094181814392828,-13.31287009421655,-3.351533745828146,-5.0056151577875365,-8.257448176657842,-4.7228314013489445,-6.02968282703249,-21.1289432300186,-4.0235659815756355,-5.923355498495728,-4.894571517300529,-3.5897808009459293,-182.2894619806897,-3.1337163993038697,-31.334742023467545,-11.300950002930545,-8.619499126006577,-6.81274310178369,-3.120098746151322,-9.729699569953965,-7.083312015567123,-3.4270514037287914,-6.647626809641768,-5.774132383573781,-8.511717525551296,-8.375494923498502,-16.654232694640886,-10.050037652711751,-7.178569458299869,-5.044493373833843,-24.619723565304422,-11.11923209300019,-4.857494564453775,-5.2196226377583965,-238.94593369013705,-5.602120992510675,-4.044277810280034,-4.1480482678971855,-3.360792098891682,-4.446141476427815,-105.79521800981105,-2.8409189861150432,-6.817990103015589,-6.087313037919586,-4.470391355150905,-8.376507020264663,-4.9710808627623475,-9.307232557363227,-13.416277035194787,-5.368930532090584,-6.952957442292412,-6.553951564785271,-4.152994023057582,-5.050911899617841,-19.378002196436025,-5.181086306566677,-6.007306820897797,-5.06540810988347,-7.327122256293755,-4.471481973271121,-7.681920402642057,-14.868684314215017,-7.818328434531995,-4.781704340610686,-14.849853044054754,-12.869129092353749,-4.304591509921492,-16.72736445634482,-5.364113182225342,-4.19385816080687,-5.932250261704184,-4.837564111901592,-11.132348948483699,-7.258293534163818,-500.9473764883378,-8.647405890295087,-36.3113067605452,-4.4737983010892695,-7.897135477952835,-15.264732020113005,-7.717462840175369,-6.582809489606203,-19.920085452084002,-10.546288964846477,-6.5209183505855455,-4.3272485377063585,-2.3396688165319897,-3.803470744496851,-4.215916418931312,-4.804929047949937,-52.394904347717315,-5.501338035667353,-4.000881248490426,-3.773790607739639,-4.346710046983636,-2.386105916671565,-11.701629194426832,-5.797923268017963,-6.522789437761613,-7.072851800522233,-4.073018644548262,-4.608301319483479,-6.097618636258627,-3.8529795810523435,-5.211990208377841,-7.9248286935419125,-5.544638387042011,-3.2788119263959477,-13.760993719225391,-39.95121665229602,-4.991221618319257,-6.275199188942172,-12.782351137426176,-5.546600220245395,-3.265875693796249,-4.760834804285311,-6.038036016940467,-4.340698626111781,-4.89887042447767,-22.15058795375525,-3.4163484547495857,-4.057744615713414,-13.518515371372784,-3.788273435421705,-3.9644964998023573,-7.684995891984664,-5.292578836937764,-4.817060298529411,-21.603024990079238,-69.49532032574481,-5.325100060382155,-2.9085977404808916,-6.080262266416867,-4.5386472391162815,-6.973544811998158,-11.164400799660045,-4.526302802946674,-3.994849279747032,-6.208881249436014,-5.251099013069071,-3.0117425093697885,-7.999039630950614,-5.3062093375619686,-82.1643030591373,-10.212002903683679,-6.199438870530333,-3.9989518982601764,-15.7617459953133,-5.046267179766557,-4.15394350428592,-20.7257893490199,-7.256519467370181,-4.890941579508688,-3.800952494474071,-3.3007273076134394,-2.773628347793794,-7.429757850404542,-2.838422885912591,-6.728885464487465,-6.029551390169493,-8.389719631292289,-16.28361714685925,-8.334543922839469,-5.7231725945720235,-4.7570232110077555,-10.901628159900623,-6.201087018606968,-5.333815715993124,-25.160581097091825,-6.672969776163953,-98.64961542018969,-60.32785060794162,-29.20916693156258,-8.185097342976912,-7.08049651144877,-4.20988233013253,-5.680268742839451,-5.209196550139078,-12.013718677545647,-6.9545889826296525,-4.651081346132724,-3.7187425293072716,-5.446295108907573,-46.26474851936408,-7.2827458849942,-6.022097928960337,-8.53050354119327,-3.8067811753324294,-3.066454052230636,-3.226699952783238,-30.3274611728818,-2.897879836573082,-7.768772697286387,-4.549645923929723,-13.57441870089142,-239.76462744340125,-12.381289480729574,-3.963416246834843,-4.981763766245876,-9.545134637985045,-4.033431828250565,-5.519865399606499,-32.26841736384245,-13.99028964278317,-4.616163153153149,-5.062910306781764,-5.082918032326367,-4.892658763934175,-16.22512063909386,-5.457802473471531,-25.237132907192176,-4.3873731429152505,-5.683614856376671,-43.233538956426045,-9.465960945227575,-4.654435090805368,-5.100769967129507,-2.5607633685439417,-17.065066497306077,-5.586549661583266,-9.209239943602574,-4.5495876785531735,-6.114341383883962,-4.93564517061975,-4.651294965708268,-4.591862589649278,-3.5010975371979116,-6.931845089346967,-8.980185802083096,-6.093437286361334,-7.541015949435391,-16.90534824561484,-6.14433983345921,-4.740404562855041,-4.011327158737403,-15.47494034134848,-5.397838778968079,-6.667053673875772,-5.113805090193164,-6.356692781997772,-5.119631919389647,-7.455784042230363,-10.041453474983859,-8.928378313926007,-10.81868795578232,-61.2582736420417,-5.547796959068948,-5.100884700659499,-4.94916145880776,-4.321994726980711,-14.676088566016054,-5.258369785690389,-21.5856621341771,-6.0817296539094565,-19.337432794796236,-6.4920669008144305,-4.830680947849199,-17.420173281718515,-9.051508122849974,-9.97427696543826,-24.298578154090663,-3.9305318012102854,-4.061527849235168,-5.6877326210450265,-5.257792543174629,-4.768450419164858,-3.9683761309258383,-6.943873312180145,-27.15199313408614,-6.463528615020793,-5.122617283483751,-10.06870825182977,-4.455990638160711,-5.4705811058931815,-11.340392749259792,-6.10054747279144,-2.9850883620439124,-3.60127320806527,-14.040842367652825,-4.687204835615221,-96.69352636306041,-16.00026734998734,-7.073763872854271,-8.404420506060974,-7.64261775296041,-6.050836130967475,-6.460829921838755,-18.631805764687563,-7.9129404403197885,-5.276083495843694,-5.338470260423499,-8.125556579691125,-5.026639810123064,-6.45249454428074,-6.409834325540833,-9.089200407073733,-17.59583712660696,-8.597699418759262,-10.69115344146379,-6.184717771904279,-5.355243628061517,-9.36482038583814,-4.472912883260104,-3.721405105615334,-16.079644283783978,-9.043192068105043,-13.816539514376135,-5.028697157225334,-6.160554768755176,-12.193303328919319,-81.56659197709087,-5.748257754515473,-21.253626413965787,-4.588721266343406,-3.2308010853373217,-19.178502409271477,-16.258195627331016,-5.895385914614318,-4.724318804759823,-5.7729158032259,-4.92537847179101,-5.629093610329538,-6.639422004241397,-2.7810250814473183,-4.75156771308275,-14.921391729190217,-3.826294790968211,-5.951994702429944,-5.876683822742602,-4.835298826855711,-5.509494079865834,-4.815343639901453,-2.6433825283450156,-2.374381785847236,-4.577608651494058,-1.5097240376158787,-13.852736509418252,-24.618366432963978,-3.7804111994510556,-5.332505519049065,-17.15907142843155,-3.4713851793967963,-6.181320041120806,-9.796900292487033,-39.230941240397904,-5.373465157918902,-7.826027719152711,-5.661783622141823,-4.873799129272087,-2.2250719723181107,-30.114207433744294,-7.12252523280568,-8.154515705882918,-5.500464125213029,-4.950280543768325,-5.329211791315705,-7.698126710820902,-5.605791405545645,-6.309368209955256,-5.1634689479460345,-7.505716903476806,-4.835486250628515,-9.760249419371156,-5.845523779318048,-5.706203658761657,-12.375862709804228,-5.759733132713393,-7.327673452342745,-4.012483028797491,-5.2775747350727595,-9.024397873239216,-5.745275771542818,-11.274435752849932,-7.185096613376453,-45.477325845529855,-3.187668122890777,-6.370422613878018,-9.16399925481967,-5.354849937051634,-4.289913125954296,-14.31886160270045,-4.646257819624557,-4.465741603894385,-5.054006051602367,-3.2454585779253096,-4.709990293189442,-5.006225994478826,-10.702811718457358,-25.42894399482146,-6.598194691703034,-6.347484659788398,-4.079734502537524,-4.600705314991822,-3.9158376326302147,-50.209922643709646,-3.1262884595389355,-5.232548441426678,-3.0318499587891035,-6.449143769935194,-7.072081133084913,-16.031118859964963,-10.10976733045514,-9.087860446806868,-1.8674939784345752,-2.323997397672439,-16.870261203467614,-4.581269200339769,-5.005374699551405,-7.8511808552781055,-5.048284924592549,-6.4928738122433804,-3.186925134740104,-4.496919026634016,-5.343702284044604,-4.74262257531621,-5.021394741291478,-9.99612922437578,-4.760638613451803,-13.463087299569402,-6.474175903611053,-6.2803813527318635,-7.960009142326654,-722.8206343252988,-4.52457755939657,-2.7924794751020237,-6.093802986222568,-5.246284743132204,-3.5701666065136752,-5.323117411468889,-7.296923228791015,-17.49323875562559,-3.7124542311513666,-4.348449529248051,-5.533361070334598,-5.700560425183484,-3.279815895929014,-5.394440594525338,-3.3244002550651572,-5.196038602404105,-8.125242932138905,-4.298290024655094,-2.222127502098821,-4.668773359021312,-20.668262300914364,-7.778647624578275,-11.590707995664964,-14.108759676702167,-12.876532052951422,-8.293233694091944,-5.9506710017353335,-4.90725274708706,-5.6510540145164985,-6.17115077083851,-9.437617980240598,-4.728973285528111,-5.034891776749894,-7.1952318377284765,-5.461789242673579,-3.0684955642722134,-3.2155050588302307,-4.717240938722803,-3.66164548006926,-5.931225575831457,-157.13208724490536,-3.340801832116288,-2.4657618880827803,-12.215295544927242,-4.65745567620251,-4.333540834413757,-3.454879068689886,-5.419386554229818,-14.960111210845207,-4.43261223766371,-6.089468830346123,-6.374263334796242,-10.370655097912692,-9.891759235485726,-4.9581335107248945,-6.261963372660459,-4.698806417064229,-3.7425643573453105,-13.736541320739445,-5.201798414281552,-4.837696555263472,-3.986903483775831,-3.972175814119816,-5.99705268364482,-2.8473223343806007,-6.751817677474565,-4.256149423782906,-6.578279366809025,-3.7876158969440166,-5.452413943340089,-6.0185786746684045,-5.788095247247847,-4.476055902790818,-5.3041884789790466,-22.864440090936878,-43.75934824944944,-6.474280351473819,-4.683920393364193,-4.7428902195453535,-5.819545894176754,-8.393389445594918,-3.9775162039996266,-674.0427590282759,-5.248431424869782,-9.429864583843793,-3.6925490284422455,-6.2655202747786305,-10.803764192186676,-37.594221727959294,-13.465134395862469,-6.073338777569155,-6.677226443541107,-4.97574053957616,-3.952911013273546,-92.08319722011754,-6.5750543514604,-14.763033940363544,-6.982118349946768,-9.806503706592558,-6.04552712178834,-8.79996905862122,-10.570569681215407,-4.170950274940505,-3.5959697414201495,-8.46631790060086,-5.592838486465524,-6.583523166017921,-6.668394147453328,-3.055354221957776,-150.88855075674184,-2.5864882826660507,-5.112420813737817,-5.338148825215965,-6.091636963080909,-5.482945546448636,-4.923455207255785,-26.68311788142719,-3.8892978483596554,-4.965709769466086,-6.696933281522771,-4.524577126417688,-5.786379633146519,-3.596530320125046,-4.706103085238778,-8.511042628663297,-3.8350952160691776,-5.787705596668333,-45.85510202922103,-6.049169956569065,-639.9248355064469,-3.487330154031329,-3.853421326862263,-3.8097015507812984,-4.871319661062289,-8.945678839667062,-4.601697005202171,-3.726314377977025,-49.03295790540442,-27.426320831806713,-12.69822437414345,-4.506089033756624,-17.726289701003505,-5.354652156436561,-4.934506427376404,-7.820585018132329,-4.1877241144602415,-17.515756740023072,-4.529306462296832,-18.575719894018555,-13.717127151608944,-4.690545715109854,-2.6754469008214796,-5.821901870645365,-30.548572640238326,-53.60312843190122,-4.660929161674288,-6.612845732022336,-2.413066052386233,-19.482356274353258,-14.956625125960361,-5.908844589788395,-8.771633721778093,-7.553109438653681,-3.0890056163094104,-11.578366007163796,-5.606818447095133,-4.006780054103453,-17.321848686147312,-6.595048589847323,-7.336866630307485,-35.13946786752853,-3.4823403919334863,-6.2729395546518,-4.411677514196096,-16.18838075212465,-6.860281510945452,-6.9657053871843,-8.00584255953642,-6.748072655130101,-15.531085637562747,-3.050810848822989,-5.264663015708715,-18.10815918563142,-5.752268408831002],"x":[-13.289481950975093,-19.108607148419757,-16.589487202402452,-17.645149404755344,-12.267100093870926,-13.229316937584157,-11.946730364479286,-19.18171361577532,-19.096954759891947,-18.691557011512955,-18.7833311278196,-17.15097344105811,-19.201213478708866,-17.383362856609065,-15.329525018396355,-17.312472834266206,-15.876460517293387,-13.599243634110081,-14.584453761158088,-15.275579607276548,-12.09252883961905,-18.093608207089822,-15.806435771715414,-14.923373187634079,-18.034233072339564,-13.711529578606799,-11.807105424980733,-11.847863947352927,-11.119072366317253,-15.940917679503253,-10.24726821840588,-14.734792682335572,-14.872737105059091,-15.371482064391884,-17.811714190301238,-17.30914892923863,-15.947442868692459,-11.511270569527285,-11.118937426735174,-15.43440381521247,-17.70503957703572,-17.541930337074497,-14.0212766079704,-11.978608507466484,-13.271099539205347,-13.532772858240417,-12.386896090301601,-17.210988198849076,-18.55746548600503,-15.680203483851798,-10.163038959226348,-14.14444767999811,-11.623099789017218,-17.944087505953135,-17.225360273365197,-13.425997713496244,-19.352028910302565,-17.5604813728007,-14.646106090650177,-17.88231324616475,-12.055429771716526,-10.591423076511724,-18.49008386834764,-10.325744165541478,-19.537271398084318,-15.353435963316368,-13.199332626670152,-12.448610728469065,-14.762882281649311,-13.11519652078433,-10.847180488991327,-10.30992940039986,-18.50920684160562,-10.269192330296127,-19.14394166844566,-17.985133504325294,-17.136716531453832,-18.036158708298714,-18.247558616340804,-16.016905204317904,-16.60291638832957,-16.949934492233982,-13.680296085701526,-16.099907553474885,-18.165295690513275,-18.61100416348945,-15.281056427715862,-14.056845493493132,-19.158341732887138,-12.728463214417406,-12.108142509915803,-11.913500350669803,-12.19763667357986,-11.620330675106521,-16.613532070216564,-18.588699650190833,-19.025153493481767,-11.704011498787072,-18.586502215190322,-14.700850448583507,-15.232345942427848,-15.309128333204637,-13.699569263293421,-13.076415324008465,-10.690788387059445,-14.516932608915013,-16.717016033846317,-13.33116272428363,-13.98896014538408,-18.099117232245895,-11.364989389066176,-18.64344971134607,-16.388929760305334,-18.450373099934612,-19.616492237349018,-15.147332222308567,-15.433082671897413,-10.483434896851442,-12.090078642005874,-17.493247973922355,-10.638960075963036,-10.876315178981708,-15.09969072401452,-16.864910624534005,-12.120640063698406,-12.309950050501378,-15.215198985426328,-14.401249190359618,-11.639725189867809,-17.73687363905588,-17.030052303055857,-14.966859549724552,-18.93853720778335,-15.308109832019742,-17.491530786710392,-14.455618487711718,-14.632043624974552,-14.023477036356486,-10.45680782574925,-19.59356999456811,-14.879047631019798,-15.397670730090873,-18.573647756629978,-10.41247508713459,-19.262349651636804,-11.657563806787829,-11.103466744856917,-17.217007170397952,-11.126247635246989,-11.16251436818125,-13.47816315377688,-11.43553210208246,-18.35008141286154,-15.449419294230253,-10.123082535491612,-11.436055232353608,-12.713924410404108,-13.31501916659825,-14.392056690262677,-11.559716981935704,-14.789360366741718,-18.622579225768582,-15.188122314294937,-16.687091365795972,-16.593055538666864,-14.35709782664896,-10.538675153043185,-15.602446380367844,-19.21026308955923,-19.33178737190864,-17.77305033402899,-11.189252732723565,-14.749856663367558,-17.86477418436706,-15.571582889195106,-15.10339379290295,-17.95928741618916,-16.093811854395554,-19.423541632602152,-15.005258975047218,-16.28616340048901,-13.730057540315768,-13.046775018093166,-11.788440868738206,-10.549935666721069,-16.534790713916863,-16.541165997289255,-16.33062375155318,-19.785874551751657,-15.515285911434663,-13.765427492274734,-19.97232252000998,-17.590632263719694,-10.814276087796218,-10.710253404483645,-10.895440353241534,-12.736710603549747,-19.438756309718634,-14.015001205467414,-12.723368586118779,-12.563784461471311,-11.774626885159043,-11.406065459155393,-17.10543168041106,-14.93679382313178,-10.357663035113545,-16.521166696736252,-10.570878917730479,-12.62017075389831,-17.95329334159694,-18.611485897698287,-18.509408596319584,-18.866740458046962,-12.057634824368295,-10.959150701631437,-14.904604855773997,-18.156890731948074,-18.678507039894406,-10.200069210363168,-15.127589087753567,-11.437225245021846,-15.990228106335485,-18.81261976505362,-11.952569867426279,-12.132272953387771,-11.948179326747745,-13.05971239776126,-12.78718259649678,-16.165751065907827,-16.119074913746317,-17.89925881570719,-14.0903528845806,-15.935060728963215,-17.058134513954364,-14.788293431884014,-13.319799937291066,-17.90210280211973,-12.970411016816211,-12.446229230839723,-10.030077438133326,-10.58265600669954,-18.74957385368684,-18.46233203689827,-15.619123389346441,-14.344511770594046,-12.24067610289204,-12.95136810582293,-16.59889626454619,-10.587446169884496,-12.674654342673595,-10.489379297913326,-19.996629850168443,-12.874030077023965,-15.102072316078717,-19.617121382831954,-14.802488625382162,-10.333107453064914,-16.6489386958677,-15.905138355595996,-19.12017480608585,-12.892707751084307,-19.63338015154999,-13.312100987429938,-14.674155575316446,-13.940855989123222,-12.970427674059104,-15.9823709953702,-10.494824522459403,-19.819754093292076,-13.414807907978359,-14.865809018340288,-19.797968692334514,-19.753037825110503,-17.814067741723264,-19.88592402249763,-16.014223314527964,-17.561094356402627,-19.51167266479528,-13.70789935773524,-18.2123513679303,-10.693239492077682,-14.961352866694595,-18.501928002783924,-16.811989086020688,-13.103609718396035,-12.473018896599239,-18.619060090934386,-18.83992202350427,-11.927390407759058,-13.384598448445079,-14.876857266316915,-11.716205601410422,-14.508982563179387,-17.686141250327648,-15.589981677427296,-10.648149445536712,-16.674662718425225,-16.54229281686442,-11.152690166216107,-19.324148486475664,-18.38310235817621,-13.564862820797622,-12.05009430790254,-10.65002752205845,-19.4200442642837,-15.93096092181058,-14.027947931220117,-19.499260057658187,-16.26570783612133,-14.951508486784139,-19.813164645308873,-10.877902211958443,-15.630119677288334,-19.47906570975284,-10.822671215471281,-12.319522700185843,-18.206557504659603,-10.439810221148399,-18.011085571341923,-17.61812948067947,-19.061052165142748,-15.65618298452028,-17.50559447826494,-12.006173380988269,-15.71840227008446,-11.458647866922538,-16.684915598761435,-12.584481036035415,-13.347443351180829,-10.144823636917526,-18.42963881698719,-17.798746276205133,-19.82290161591057,-17.341846661379446,-12.332009486974307,-10.658353326974751,-13.148363608863928,-12.192559061688131,-19.185828103745127,-12.7593143734465,-15.275716807482972,-12.182760644038934,-15.583951728174998,-17.49867255363805,-14.962281323331549,-10.373200943725276,-14.159463727998356,-15.256857612119017,-19.6556578591642,-16.219990526405258,-12.917565520027573,-11.547132049817755,-17.86106007557122,-13.233116699195964,-18.63881340258481,-17.678059035600697,-19.380323461865704,-11.284903520352028,-15.901765736033806,-19.719034122838732,-12.486709583680115,-13.397867449947302,-11.950686724890405,-13.368706855299969,-10.934666408361394,-15.231212863488695,-16.568668116521096,-15.338436462641575,-17.10053320786824,-11.735413935843633,-14.503651532471258,-17.04111020135596,-13.31190563523404,-12.792815575985264,-18.35486861137677,-17.774048276339173,-19.21083523399703,-10.258158034069156,-14.260805076821493,-12.746248393900947,-11.444633103570855,-10.26992784435874,-15.173155600904993,-18.20180184778147,-14.554183177491193,-18.724196025604623,-19.452674838139345,-14.007173421864124,-13.796716171702654,-12.725995872072444,-17.164835773250363,-12.109266883965935,-14.050247417659198,-12.22361350634099,-12.194429429553523,-11.187329508860632,-14.0397693458439,-16.64267291643056,-12.316267578755252,-16.857148483314013,-17.462444439044273,-12.08436211324778,-18.024144233867084,-17.8717274833605,-12.780144425924005,-18.81632214804131,-11.32175862153446,-16.59558063767314,-19.120574088473127,-18.447531026560938,-14.908393754478709,-10.44365041106686,-14.755228409897164,-17.182908328116742,-11.153211204420634,-14.433344262120311,-17.336285508741504,-13.050314334564126,-18.44971122486427,-14.73257076898111,-16.089344126117847,-19.843227148757762,-13.796990148128856,-16.944949837733674,-15.202305694888436,-14.564323374735174,-14.60696687974869,-18.741913288217024,-16.094933608372678,-12.993763116692003,-15.992310316963218,-12.907802852855351,-15.43903305547194,-19.684622124849515,-12.242193129337677,-19.594826162088438,-14.611388498151811,-19.59010588452206,-17.952035965687177,-13.271824376370922,-16.964278995378578,-18.974724549849434,-17.579349848820666,-10.7140577903181,-19.49715035539879,-14.21106945291076,-13.371799465560185,-13.018882315145753,-11.489193164007363,-18.176468660322,-15.65396996695269,-18.86189473694946,-11.734690942611026,-19.923073994712816,-19.17525596719961,-19.740856838699187,-17.066573869620257,-13.861979679650162,-19.756097880756972,-18.343161065365692,-10.005394804711415,-15.800003334968402,-15.441707471917077,-11.058829955054023,-12.300657483630882,-16.67207443051996,-17.719856275278303,-15.948001151827134,-17.351783926212153,-11.724523940826778,-16.753471666375518,-18.38780642406548,-10.918979239793476,-18.721833089214776,-11.654993492896068,-14.289425041695786,-15.897562778294098,-13.273190134595637,-18.68167107484485,-10.179425391308875,-15.05614927717913,-13.422103100242527,-18.129511617757778,-13.277349855855334,-18.978272636554383,-14.34325220042079,-12.372761350516797,-11.526072321130725,-11.433408612111482,-18.792217917776476,-17.132356099865547,-17.677616948635006,-19.949311460033947,-17.90650120729684,-12.094671645515094,-10.572145881217379,-14.058018420168459,-16.62872524749784,-16.615564977403867,-10.260605451065876,-13.841361021578338,-12.611668904391845,-16.337143390008737,-16.260106093630558,-15.587145682950913,-14.22609357876048,-18.00372035951892,-12.099080467820889,-15.255423563826271,-15.367021305810866,-10.936834935936474,-14.966165111758674,-12.750812154717622,-15.020526211835058,-16.46220496492542,-18.088626528994595,-14.822505576761543,-14.808852308570447,-12.928841372758788,-16.45965170885171,-14.052118848523996,-17.081314319197126,-19.377919798620987,-16.840791948905537,-12.318611932270214,-19.76408519669508,-18.02140901197926,-16.537581160028736,-19.866572453911093,-17.490848950483905,-14.83018570901639,-16.446307701076442,-17.181210741912032,-11.918232724381348,-17.703157507369852,-18.509862846183836,-16.25042821705305,-18.210906144623213,-11.692300582865432,-10.703050397549452,-15.757675966260258,-13.063234073276577,-12.915850992200024,-10.737720169495748,-17.914362794313206,-12.13815244867331,-14.717891573403637,-14.204477147357675,-10.007547998538033,-17.878980431195078,-11.848436632664024,-18.724220518327293,-17.3571664795494,-11.965621652279419,-18.563284604149928,-17.939739821260588,-18.187068000151672,-18.98534459760361,-12.023491053619384,-18.751589936917853,-19.195067441240255,-15.424868982794418,-17.50198083822688,-11.453058438409702,-14.53719012257206,-12.46406341543975,-14.772242293804194,-16.629067881286115,-16.77528774099673,-17.68475247621502,-19.313300736311717,-19.634781539460768,-18.80420098616944,-13.113364608246371,-15.846665213534317,-18.319700319575517,-12.02021152008491,-16.670610154096092,-16.932999984077366,-15.721324718658705,-14.96241089122407,-12.179722711006935,-11.604413541969707,-15.07535314953988,-12.990479056367512,-15.962283712135662,-15.898285624923288,-12.067614775106662,-17.173535999391113,-15.102272514361504,-12.963265299870837,-14.376908827023636,-13.723369436174664,-14.868091244202759,-19.427299463547797,-13.742121753031821,-15.05442857190934,-13.571845650266098,-18.271179570877116,-14.610994871452881,-15.378193941093837,-19.811103567562913,-15.032768221885142,-11.469281327413913,-10.408258423670823,-17.707990230444427,-17.677037795032536,-19.96553594027332,-13.93141271385559,-19.954064592198044,-11.145115389270261,-17.57724296603617,-17.197245127605644,-19.508817272846805,-11.15334332524344,-17.599757486594324,-17.237814334940204,-17.33191626723954,-18.899968089568763,-13.700205458551926,-15.468330307267964,-19.185644060688603,-11.914030986703999,-10.143723861543583,-17.672494535004244,-14.144166682811832,-14.167261805791895,-16.75970476421775,-17.437832954138525,-16.665069675942867,-13.544970001548878,-13.430746648177152,-16.719925967559984,-10.646820688973433,-14.07023400101697,-14.099245848112261,-16.208980156867973,-14.154305516388687,-12.173372336989106,-17.65891316401356,-18.49285467644362,-18.086050427881453,-18.92711903967203,-19.107885782751076,-16.02895135926826,-11.054566215707984,-12.619341282739606,-19.649539694144476,-18.218682832969545,-13.390622664427552,-13.382206591338184,-14.051298685816318,-19.859433481208622,-17.75754381094307,-11.939570798463674,-18.372173180766545,-12.893425483159751,-18.805199709244842,-12.507014425704863,-15.059310167033903,-12.655063578290378,-15.83478499823888,-19.93819363310736,-11.397033424947018,-19.093769403293585,-14.265462633910246,-18.680999223491476,-16.044142279706936,-12.84025581928616,-10.885995665614228,-10.592074650015933,-18.1432869795701,-12.935898237919385,-14.213544298832883,-18.044006104847114,-19.357677392423028,-18.98976492385809,-17.856590390243927,-13.622249245584545,-16.318091286649025,-11.922200582966342,-18.33830262276891,-19.18791827613313,-12.34691310066584,-18.776373965656028,-16.64438543038417,-19.63917425726131,-18.989115336991237,-14.489380286169112,-16.24328794910151,-19.061968005348817,-17.912876872610866,-17.604955634262684,-17.176602809011847,-15.990989588043796,-15.10723959508839,-14.059680196504406,-18.115862465942076,-17.164242920686746,-10.298832522804325,-13.093213868934235,-11.607095299855388,-11.190367580116359,-18.498848486845144,-10.842162207341444,-19.86583719909732,-14.122466358470056,-12.513713299225287,-12.318062969700614,-14.451828511583816,-12.298003910307111,-19.92566693629153,-18.664745322940615,-18.012604426063547,-12.091050043775677,-15.064112059404799,-11.425942844714534,-18.504059209156637,-17.355074280263818,-12.815299493956974,-18.249160825350856,-18.671174959566645,-13.003637703349312,-10.048310333292878,-13.033682104865479,-11.565411406452018,-10.094105475520635,-12.120451394275609,-10.159974039527302,-17.683930000218158,-13.385370768927414,-12.357687709557608,-16.09589180179462,-19.271029201902333,-13.554916246602602,-12.928793403625145,-17.81606512775854,-18.977940238778178,-13.082924385980219,-16.871349872690256,-15.999769626658459,-14.97071113422505,-10.91284522036501,-18.39105593626757,-14.20247750461213,-19.431393497307717,-16.16616363963281,-13.22878976202083,-17.884434149579654,-19.725967717901668,-11.262322179767782,-14.632015043556484,-16.228118894579612,-17.461291133744336,-13.66148426091736,-15.123948466902293,-19.48929244157054,-18.9879387440948,-12.146318944685763,-16.77125156778667,-17.92309209016439,-13.560000839417938,-12.943757947889335,-14.409296850560585,-10.422099312196007,-18.735356629696533,-10.493478574005152,-16.291803843425452,-12.86556783985743,-13.705573105675931,-16.953415010885934,-15.405351783859874,-11.838522089615271,-14.75012696380782,-14.448463178418969,-11.961472704246392,-18.117893125245438,-10.662637870279168,-12.221887569791008,-17.194183625844715,-16.02156860746081,-10.365155523601508,-11.715208281405953,-16.65079697276775,-11.811951057765928,-15.549163630941113,-15.681711401733304,-17.71767562239417,-10.230631397000543,-19.69450643769634,-11.276325713517357,-17.487703620904618,-12.933809367858377,-17.421345515042074,-17.449860964164937,-18.247734242236433,-10.01923815795785,-11.70854719309509,-17.164926160712657,-15.327496420557793,-10.760344796798513,-13.638682965629371,-13.8924576365037,-12.13021828693936,-11.688689582112016,-14.711540024683261,-17.781871273773273,-15.162500168739282,-13.19002084736943,-14.993866014120112,-15.155642240892927,-18.820405123517304,-17.397480469063304,-18.661654087109063,-19.829296243939552,-11.023557216075908,-12.820340553367489,-12.653014399195555,-18.31085187332992,-16.964628088840314,-11.233801837603323,-18.59928771422515,-19.891873045135384,-19.641616684468232,-15.878311156965061,-10.05874576239533,-13.188848970992042,-13.179669020028467,-11.760924572230572,-15.620142553610872,-12.529418503356455,-14.92535945017352,-14.993915200949463,-12.030629634353946,-10.74138941898406,-16.338904616478246,-17.86271504401119,-10.027998479940889,-19.561308287125378,-19.739170900936905,-19.91837151927346,-19.797490300170054,-15.126253277381561,-18.198995012379942,-16.311373925393834,-19.378909138581584,-18.14121856358017,-12.995139487967817,-13.09215024953458,-18.79376912937398,-19.85539930857839,-11.969299413907939,-13.79400599119821,-19.39325769311241,-12.957078791226815,-16.563538043559753,-18.898574870280026,-13.593950766331774,-10.49046175145216,-16.93886286949618,-15.885477046333225,-15.694680957015523,-15.192535418878283,-15.438658241522752,-13.072405634690105,-14.197509750543986,-16.891327450560635,-19.69774376421973,-17.05331989928821,-18.304776453200915,-13.062561492729701,-14.974473257610153,-10.105368479583614,-10.717038482765062,-14.675679309824709,-10.35010626481184,-18.903422532687138,-13.34593713929252,-12.293402750261489,-17.969052065491546,-12.869347773334201,-17.49570421742561,-10.494811487445014,-19.549856198730136,-12.488062803780567,-11.489872666979954,-14.430577100901612,-13.466075255951427,-11.511927725189517,-16.329087459051618,-19.49629099924845,-10.236259270902213,-15.417854814841744,-11.176914966881952,-12.103353453982987,-12.493694257284279,-19.68404908380259,-10.958869208741685,-19.49503009516403,-16.7511168456799,-17.475945332774078,-13.630018164435986,-16.892200352204032,-15.951368178586666,-17.331150371288974,-18.94529487925055,-18.957438402676,-14.476224874230844,-15.375026422719909,-15.586315230207452,-13.478844907976068,-16.642974611360646,-19.128995941584297,-15.254785274220993,-16.236801784646786,-14.270814423206094,-19.267541370818858,-18.626783415902615,-17.44332967567441,-12.688514234057306,-18.01027334838774,-16.042672340833626,-18.500598730397428,-16.43599981718848,-12.447910509641407,-17.25233087683599,-11.569887503538778,-17.996243687030272,-12.220394833753474,-13.440065132397393,-12.759242450096963,-18.817964838008432,-19.748291770420803,-15.075542941710562,-12.844876480090502,-12.463090617162955,-19.438259109706923,-10.703279732896148,-14.469680245677495,-19.304331854139743,-15.150808013609486,-11.902908883031467,-12.668478776894716,-19.54631334776249,-16.083669957104973,-15.77818640590376,-11.981708616311202,-11.20437662442544,-12.012723626546444,-14.461710168775832,-13.980006920057747,-10.40326694019043,-13.447756933619818,-12.40391564888611,-15.130529460470985,-13.694057273261837,-14.962690815321443,-18.717052098347537,-11.387511229224007,-15.384798724877522,-15.075793771878995,-12.585523193268893,-18.564571758785814,-14.167014746840605,-14.80848464165209,-12.380743093525574,-16.26616882859156,-10.110618334056149,-10.840893054546438,-14.603085759393547,-16.718604906396976,-10.198271660782368,-16.27289223253519,-10.37516215164157,-10.358418901745125,-17.125562431182235,-17.492400029288852,-17.831090193073138,-11.152524290546344,-11.687822647437297,-12.621380610643719,-13.683669461202578,-12.622674754448067,-15.075470906622893,-16.532681819093394,-15.549875049727524,-18.117109398357773,-10.448270205428571,-17.294481192080475,-19.677594737886007,-14.146888123639805,-19.56437181173613,-16.8847023954432,-16.128839981815005,-19.744256479304575,-15.030148438147048,-10.731175245101364,-18.679381481217852,-19.63907829194807,-17.80853545430486],"b":[3.631297289554889,2.252240088945412,0.14404702971391403,2.0677818214654153,4.414229881787996,0.6357962117888349,0.364175564056729,1.209036350859537,2.118703623051058,1.189113663853748,1.7506254384481401,1.757719290332267,0.8818310592262091,0.9085511597954476,1.2191834907648014,1.4846557865353138,1.006089587874166,1.6394872505096048,3.2717393569793995,0.5189884030534697,1.4096332473562057,0.09762327094508749,2.5743332761624673,4.860250733723941,0.14355164752829608,3.134553142788108,3.4766732153369686,1.583168677170842,0.5889527977539899,4.323933605151207,1.866377337448768,2.631511266523663,4.427256305276936,0.5802594459222921,3.4949796059632354,3.900689125163761,4.523324310379749,1.8001233631639346,0.7519609128663618,4.058694671041263,1.8264704131734144,1.1784591184328819,4.191427599179141,0.7219039555395701,0.8578834047692252,3.1121165672421425,2.9021950753984536,1.1001719041803038,1.4093097114358422,2.4351096909544747,4.378381268643659,3.491821544302667,1.1921194365543197,4.6040486150583515,3.205302059453988,1.4461702634090745,3.7260950693861385,4.883185505290979,2.3357671210873288,2.692002245486721,4.773102757996006,1.5998411004896351,4.909918424892013,3.5073797061334746,2.407458427534237,0.4977021769759682,2.753549677496988,2.9799888751064065,1.7191671218247917,0.17062132185513446,0.16513326942463324,1.3209786861679151,1.5726103410118997,0.5458195184872294,3.8143735869952886,3.6825462342892634,2.798535309927994,1.3358587093286234,4.578730454451032,2.070605521558706,4.098530224071074,3.3506198567509484,2.98968299054047,2.35550796109119,4.952131702596191,0.5607429154715704,3.6800311040928,3.9290538100320394,3.4146337468439416,4.714606231126469,3.1032450783373955,4.696541417932442,1.3688384831613987,2.006901180714041,2.605919062354914,3.249368227519817,0.07158718729901814,4.617638811891175,1.5631200018204994,3.364885637544851,3.7414477031625584,4.188442323600573,4.7006441887981065,4.2510689350493305,2.75027929560241,0.8266077214066214,1.4507687851172202,1.0839907410040484,2.5302436391112595,4.946984515929842,2.9852559390875477,1.1422326568817431,2.907980228359234,1.020734103408374,0.5017104271646766,3.2289176748779047,1.4826003165786528,2.281513319287086,3.651596766329405,4.1369010877059385,3.691378493034575,1.5099055153929108,2.1874207725166017,0.8894291452354919,3.979427093889003,4.424054798464441,0.2817984010071417,0.1619277017633569,2.886101265664558,3.491954600726548,1.6388952616779007,4.69848761264799,0.20612067651982313,4.94669187799717,0.3840324352879787,3.640885468634394,3.699839685603974,3.1439832017703084,4.209640849236872,2.4377572646345014,1.8498506621578192,0.980469747781143,3.7233961736254653,1.7665762425394105,2.035653321338077,0.558359335199079,1.4522856261352723,0.3984955680169777,3.9625440546798973,2.036951451257174,0.8183440175217371,3.841838495932961,0.5990529223815644,3.0444720741558315,0.7497795133438234,4.371732395373415,2.0424156295697706,4.356581875266876,4.493659507639526,1.6913825779419855,0.5187574535184492,3.0589554956173504,4.85127569183497,3.4678080417520807,4.188178926826581,4.955475137175468,4.633383035189553,4.122752579248945,3.8016656065818086,1.4840891750657959,4.66906792234187,4.016602546601552,2.8815877006421187,2.06225188467963,2.078421607598483,3.068444531061293,3.755717533951061,1.1829341281164552,3.842630633355253,0.696605334384548,1.5865470800685444,3.4973662199030775,3.9931187139831383,3.435091043158601,4.984334467548768,4.1578180097349495,1.66515461660671,4.088570338501442,3.8848968504471704,2.7801625192330173,2.327132888742396,2.547965839534694,0.42789033082553884,2.0763190115103147,2.7239855504200348,1.1069073186576806,3.887524918545285,2.7437602660916314,2.0908595544978503,1.4720723889700482,1.5145691385727234,2.952045330650358,0.3078206027436303,0.1635503335355759,0.3169598749207292,4.092940245945363,0.6577073239358455,3.6060602243692976,2.8976234648132184,1.2289966098538274,3.8407483880768565,3.1449934867769236,3.3956878048577055,1.3546863616182947,0.7176834818247946,3.6316376519900495,4.061113828673674,4.360997094843682,4.25116671504094,1.9334021393009093,3.784474097134357,4.272449103539829,2.1362807539888173,2.658730278004826,0.07450161162524394,1.578257916468181,3.4861985612589996,0.5407568292510434,2.9761055993517593,1.3342861738203116,3.501851642547158,4.882648852367319,2.7307158789249133,1.4550720099209669,1.464507977690498,2.991281392589621,2.996622150997017,3.9777487717678097,3.0693524193313837,3.589229426450694,4.79372717779663,3.3532010436888693,3.6662721108034435,0.7478980865970508,4.811503496302319,2.473598818972383,4.929503519655106,1.6692535541854525,1.0866139371297112,3.292427556452667,2.8226063506757084,2.5967555648078844,1.8900704544607227,1.7842967038633573,1.2716340579151364,0.7312890642203174,2.67680130861486,0.8992878054105979,3.2082432943101367,1.3563745447286024,3.6192173181999543,4.256010213483135,3.677895472112639,1.0116038246102987,0.5447617092261958,3.9068464603993402,3.7676844936730083,1.927176479647107,3.373948851704325,1.0015233416560887,3.5018989716250815,0.7627250454693246,0.6751808149183081,4.458021370843498,3.951203362410991,0.03775115174210253,3.4745434783740015,2.7004120068550486,2.7951050935569888,4.248615569923571,1.9856504042972956,3.5918352038686505,1.3082760964796947,4.233745505411216,3.7379336105997774,0.35672993069116865,0.8137560821327439,3.3680408907600157,0.10077800492172773,4.458282752914195,3.1951613147833804,1.4923628254713828,3.540991657205237,4.726782617621805,2.4339008470605306,4.162492419739583,1.8571015072945696,1.2948705966806007,3.0364233778086467,1.9256222414480406,2.032925968715812,4.014566512646834,3.0739339375883876,1.4643688805069321,3.4773401943628546,1.1060477562068038,3.039305592957696,3.2660913813502503,4.199875143102689,0.8640858833572729,4.899230055068777,0.9934413192904334,4.010570523184138,0.27307794996524026,2.136050795308032,2.9843945777247507,0.19434926666391905,3.1882831859910388,1.4411461843082751,3.4400885958307423,4.985571641970317,4.913172688124733,2.174108732132015,0.5187706433455641,4.184203105388198,4.970286323706233,1.2439942744901578,4.7363892503019756,3.6339018492529593,2.3619632261656376,0.8127568272439456,1.374826029451628,4.399653519849869,2.8793609246365595,1.9377209915987303,0.9311586316052389,3.4691262571421886,2.8297700961170404,1.6748616242752101,3.452203078991954,2.0539618480131128,2.763685804574333,3.435481125316496,1.397948366859143,3.0107877863646193,0.2436501538739655,3.3368818055848983,4.7576364539968505,4.621507309530769,2.837219237789564,4.05572949409655,2.684372359461026,3.7237944777890797,1.1289375091460185,0.181656544808817,4.379260446025224,4.341670569979449,2.3029762446969,2.262586635846797,3.778803630034907,1.855804343292805,0.7171818858465406,0.6142889905670879,3.5099390214269235,0.14925043504551927,4.304283737971504,3.990307373732971,3.717108237585134,4.401369646205188,1.3336444624125,0.32633042349688224,1.157254007598858,3.3722440652438443,2.6458193577062006,4.269233997666268,4.913311014926574,0.0922558670760365,0.4601811630218211,4.811852725980311,0.9735678645927992,4.162432555171315,4.523174842866134,3.5804284860868343,2.631223765606231,1.712969950486104,1.8102171596057925,2.0500442538950026,4.681429238253206,3.0419378709411715,0.2127018610151099,1.3617145155398347,0.7645629880628502,1.4828269259530558,4.145196073686504,0.8058095107018093,4.337888580347603,4.2757207549258345,1.731848000342625,2.7679733840772878,1.7949748224889595,0.7610094343663998,3.2179929243638474,3.9562839058805386,3.5059460746262827,3.5728193055117305,0.09887188308946415,4.748776955979085,0.25343724328061534,1.8581512311647153,1.8467300054442748,2.3217702139697716,0.8370482767317566,0.5763462618788517,1.3417746397810637,2.3602574048962444,2.235865772040291,4.657879404651637,1.4844180958877662,2.4902761100102766,0.42133421807392324,1.1215301915998777,1.9742377320144355,4.074777048155996,0.4026555274804622,0.5523562008073812,3.460039921108974,4.105012247745666,0.07522084373103755,3.5367188718043097,1.034243006712331,2.626481124772162,4.715031454674997,4.720770337953795,0.10882583803140333,3.905694318406688,4.058422381765662,3.127713261295434,4.170675917091121,1.2905363675287085,4.832776969742363,1.6586573565413154,0.9291158701296975,2.4666139364391695,1.7314590337846358,3.0063858046778713,3.0485985205442203,4.029642528004256,0.5868820228203042,3.139230468024726,3.3634356594029837,1.5618544312979044,3.355894626026661,3.3173666838486318,2.1117068168405484,0.9516741323645228,1.5194073596791802,4.902201258158199,0.899319054846851,1.5638988507793306,4.214786393891639,0.5802949539072788,4.268182096037769,4.459324383488824,1.2296208627130378,3.8817312057130824,1.5964475616289253,3.2490929578354075,0.02160507928617439,2.3337026828357486,0.05102615760184559,3.470200950496306,2.390720506203409,0.7336749119777819,2.680558233747725,1.9593580684361578,0.5393363808612461,1.016104339598951,2.5552344661837036,3.77073658042037,2.2885314449061864,4.613833679424708,3.203596860232887,4.360427499283,0.19305720442800323,2.5631901312722105,2.5001924482779145,4.965518169601189,4.075070883135206,3.395291015275573,1.0131734242510604,4.647733371273133,3.8313376819625478,1.8086351647368848,4.231783978677389,4.2314205764862,1.3156714828033067,4.421580392613283,4.291114104034008,2.474765684571343,1.970819497273465,4.358154351579975,0.6869645370184252,0.3349423618728642,4.944385299982876,1.7343049210338957,1.1059445400370027,3.9117062708884163,4.549427460281853,1.9762548854086837,2.135319915221505,3.5139722113626837,3.1361685393588434,0.514398428842654,4.634732653005687,3.935212692077934,1.070862625369543,2.607869727037875,2.9682520738058473,1.8233622224428603,3.1424483225176116,3.982065610136385,0.5706504179990279,0.21660405739171495,2.4710147789990544,3.4390272411983256,2.379658659437389,3.8452560166743135,2.293742679092733,1.531652031917744,3.9382134493023435,3.724846711209535,3.4149628788685673,4.254418561049259,3.6027930479068457,1.9503558275787791,2.460514286233575,0.1781575412665526,1.7008866110826604,0.8542891365024707,2.8693686775398817,0.5230989987252421,4.401895112621314,3.2249659231783045,0.25405201122556176,2.8967832291580162,1.4840998728237975,4.568404501078188,4.409232549573474,2.3155844287732066,1.557345644774678,4.212806218387776,2.6204475024775196,4.3525147214965365,0.30658997896426454,0.9314114144588881,1.665821301745224,4.963689816784154,4.491355899207167,0.4849028477415829,3.6999432497701337,3.10303731495857,0.5168982613509732,3.689758058436726,0.08991729819597394,0.21356903723816822,0.24695445689138618,1.1592029257385728,1.618595695515248,4.683580950185046,2.5777920295734824,4.000196555193943,1.5115796388809943,3.231679653091455,4.9591873114521166,3.7745526081875824,2.6401376466251847,0.059056368068639564,2.369663364349698,4.105199404680208,1.3223072064658226,4.210826674163938,4.698037679274457,3.1230668132777772,0.3741977844810407,2.1864795923420055,2.365788815070373,4.878383778802533,0.4983706339156879,0.07018693541348986,1.2070368031253453,4.001522461253534,3.2823630810519058,0.9763659631559618,2.6760102889339112,4.725657309246138,0.2179586294903746,0.53873472862635,4.201476587771305,3.7836572603547927,4.158341519383788,4.113569366835823,1.2080558452555579,3.835476061755717,0.44655251154922637,2.6003349786737093,3.1032899566911656,0.3549809427550321,1.5939048129394318,2.794494606646283,3.7154905270287832,3.7157390074424343,0.5938531242417799,4.9295339523595025,2.378977989009484,3.6049910446401077,4.432452237018517,3.3224817382038143,3.0793842523428316,4.503463279881229,4.060008398481062,1.9603855229989575,1.6600709601167474,2.558809826098093,0.9022273707971573,1.036832215795812,2.128843251408503,3.559629478470642,3.7457650789409724,1.1479462649712857,2.7686373579579024,2.6508514326138712,3.6251344365231852,3.52459109747993,2.6913772599755648,2.2466647861535294,1.223137017289111,0.8337904013238817,1.1654839771304537,0.06304840462337813,4.12292642895117,4.174780142644593,3.5195383242741007,4.229396442808308,0.6557011066080509,4.13108621386837,0.44363286826062276,1.6481359162256448,0.8500902347249306,3.5634020942739553,4.2001681739327,0.30175149728861594,0.4881319776739057,2.211152716661174,0.34765267690585966,4.290237544169168,4.852599334104672,2.802896840098754,3.9674143360547776,0.9796724606446094,3.712098199136583,1.7255647455472467,0.36105208327781635,3.131662261945609,2.6579934814679165,1.4974311210148195,2.9247557578841796,3.8534345103599743,1.5042326096691139,1.6130740696079104,3.404429048150787,2.5860899554446193,1.2653512000900646,1.0622009533940913,0.10869057682631023,0.8637755402729475,2.5765379283434964,2.3543260242898634,2.702142548756158,2.2576247366019153,3.5915820255554687,0.4899050180915232,1.4300118185168276,3.869189980719537,1.4130343426404424,1.8741688292452052,2.953393721536343,2.901285441002881,4.425004299244067,1.0483350640235256,0.877290756346224,1.9617438670859488,0.92735474997103,3.192208051077329,4.473694558060796,1.4009756884108304,1.524516694942597,4.23111424037301,1.1136043536136608,2.255806572867635,0.4458994985015774,1.3784292366355877,2.245327889862634,0.788849590182803,0.15474700349248138,1.3338829821014797,0.5734712549488696,3.698824663422946,2.5257206305610658,0.4344950989836205,0.5172979192086646,2.9117295272654244,4.888719522973846,2.9087792818599834,3.4662243547695724,1.3342563293917864,2.227742804709447,2.108559477468993,4.088098069013419,0.9818287333782905,2.6311734221651384,4.467067488588691,3.2917288340396023,2.978980781034948,1.582479807065612,4.134292030270341,1.6422992861596386,1.5181600175325805,2.033992075882045,1.745137101050247,0.9946820050293859,0.16874474709930976,3.924655056863766,1.995822540202823,0.6304332984031868,2.612453301566827,0.6293362018903281,1.8398488464638885,0.41205204746809665,2.10364061344492,1.5933594080738367,2.6089402936809645,1.9759294911601233,1.90572470155833,0.37290116374287363,1.6924006735362984,2.9083304846911617,3.189087494416788,3.870780117993615,3.83916914906525,1.913404647219572,2.23046791724392,2.430702578098595,3.3925971289478785,2.9770416625108997,2.4164527427999563,1.0090998880435842,2.7541642088260465,4.466044021186271,0.7754479999390806,3.5246830550677046,2.273400633945064,4.513028303623177,1.6880352012355948,1.269445802081166,1.9913954686594615,0.980311058234784,1.4020043470545074,0.3483694648746538,4.124192018410562,2.935724066346701,1.4597509481305737,1.9701838995590115,1.6719078489740957,1.0320932833286378,3.2425201715202645,2.5803810029947947,4.846943754728904,4.241543665410373,2.359261351000541,2.6179241456662163,1.2826815649792545,0.22417527518942437,1.0608165059891161,1.9499416439668193,3.708969487250929,4.625839235731827,2.6875540169861023,0.34783045349578545,2.415076311818951,3.3101904821015635,1.5949268736205313,3.038837495284956,1.9894150417660827,0.6300571812807998,1.3506814202218975,1.8612802089495184,2.5634527403236493,2.4279994695929688,0.8555350703368192,4.102355889593947,3.368047003013718,1.0409947075022807,4.491645319556216,1.0981134518590319,2.9855557799618913,3.641363690859354,2.852473997428331,4.2224977633349745,2.9177789544528943,1.4208624650987967,3.934927024802511,1.2449353922881046,3.1108450894567365,1.766934911956739,2.726638730448423,0.01183884142476277,3.041976128985829,2.0956681814112343,3.0495449192868938,2.7553791744151312,3.453991160764567,2.8359459350927727,3.153844387206328,0.8763747964877022,3.7834079900410176,3.7235468669669967,1.217363042110866,2.767713339772835,3.8536721443569757,4.007531526869873,3.9593007866053718,2.8996939166303415,0.7337760197105869,3.184577746032172,2.9524512843149298,4.921053605804952,0.579462386641113,1.0759415536287065,1.5275489477367,1.4976194070414661,1.3738198284406755,1.5594966418512834,3.150931073387887,3.2980828050943622,4.464780894732494,4.60813724568482,0.9362448073982144,2.6230669130668827,3.743556162100039,1.9270877154326727,4.661643158930088,2.330439026867819,2.6848035202259277,3.693841225448782,4.6411942687403664,3.860115673199973,0.06204118819485904,1.799319305179693,4.06703053802569,1.0599529911454486,4.81333522811484,2.9096137806066604,4.134186177572446,2.5268217886092783,0.8877281082216504,1.3574295825800142,3.7424096827552713,3.207133241911765,1.5683011898260257,1.9171925617414287,1.934614820144711,2.377492475614366,3.7191444652698733,3.8610708278305106,0.6362105626559489,0.4617253449313108,3.2513687687940984,3.4182266558333674,4.869580163293401,3.1226465467111852,3.737460662911526,3.3346605843719668,3.526448410918368,3.537510006094231,2.9260294957150235,1.1718039297380534,3.3437305783502125,2.9998914066617424,2.1992926187708406,2.5428105196975292,0.6176791170875406,0.21864833795722127,2.4377710796668985,2.0507570517738594,4.291988401847474,2.0576729306885544,1.4483016150469652,4.942582108974765,0.019133615689085337,3.3084329149431255,1.9639249802526149,3.153893328726831,3.87431069553126,0.9973719605804499,0.25219700691699876,0.6819087199445439,4.9563267636805755,2.5913964460673586,4.182608766459054,4.146211843067987,0.07469049709282305,2.379848887591379,0.6711515419437553,1.3920931905437206,1.4688833049811734,1.4960026949677296,1.8712347846444055,1.777740286591637,4.955144059119604,3.8686573075931205,1.6224943269923797,2.4091693424413285,1.7563233888990892,1.2171160654339819,1.4552386323541744,0.10413602342017492,4.604792829417869,3.939713426817195,1.369609619494434,1.8673610928691065,2.381666424571195,4.402036684241812,0.5470731534767781,3.4230162831209885,3.647372194018784,1.2553317673637232,4.367517551177115,1.7379460061907925,4.9280719388437975,3.929220696280656,1.6555806358938308,4.00007116460086,2.250624997224447,0.32794937115423917,3.3988153357994855,0.010323597926885641,2.8810843214614987,4.97591405187389,1.9097417572245334,3.1604268030055813,1.7881155819850503,1.3233672738688351,3.535250613740657,0.19388082809891571,0.45924606394217804,0.9223399369844587,2.013332563994421,1.0064811580877686,2.9798552143550685,3.02729510695928,2.015630379151231,2.8339500708787035,0.9288512838523788,4.694400607562668,0.35524530009154454,0.6263397020777606,3.574612270944538,3.8406971221980535,0.8560487455961585,0.3838263752013771,0.20633387271821402,2.494225936946328,2.6431117154793493,4.9144627004582455,0.31706263968231285,1.1281995420870372,2.2859751081520208,2.302955822098516,1.6382947247158297,4.5638472973586275,0.47260109992448673,2.146670909640785,3.0633108789192622,0.47609968435680994,2.5122710306170437,2.2483253078570264,0.343078594235936,4.606679292471794,2.48250493673667,4.935449665552669,0.8503387850849797,3.7304111567011624,2.3245097238435752,2.022870859181528,4.102121708640762,0.44714144924455246,1.1554407665789213,4.395681932490128,0.7578186717604363,4.877205321465402],"mu":[-6.376709975002237,-4.1564762665600075,-2.6960763662735143,-8.218471951625506,-3.622810238067262,-6.235281912957236,-3.2152580497750094,-0.8557361766121652,-7.738431455525476,-3.3122741349365215,-1.0280392504913816,-2.805269298038293,-7.831493185337932,-8.606076885400828,-1.7822440494155911,-5.46696068572629,-0.5950450751064285,-8.93363541048215,-5.035002022227102,-9.70909857141433,-8.827206764399996,-9.885117447726032,-4.554264451653114,-3.105939899640815,-8.833722021836063,-1.7862725441601013,-7.35883046678905,-2.1141996772917837,-4.742475384962415,-0.34206027887276225,-6.397995414558122,-2.5761810970297794,-0.0059277535572799245,-2.4088336818665423,-8.832199936963956,-5.330220109200101,-9.933955320291947,-7.006064325150556,-2.546245982034181,-5.931364666507042,-1.0173991766735235,-7.621084962994782,-0.3339648618569435,-7.824966006393326,-2.205609702975102,-4.466948747664212,-1.1649040929991439,-3.3308885258634224,-9.05588659259033,-0.009172501054079962,-9.625750997221052,-0.6366450840854454,-5.525577986761796,-8.23516386012168,-7.0943434088104596,-4.404402911506393,-6.595081992835558,-0.582571045419884,-9.367591200608253,-4.397889714870429,-6.390136923521785,-1.20318241708119,-0.41648894687986937,-2.844457221436676,-6.067015186948225,-9.447881196908007,-6.128702731852302,-2.4392105300442446,-3.004166202350058,-5.153762992691786,-1.9130317397423058,-4.523070600953942,-5.171803387065273,-6.808877935439517,-2.7836991469634986,-5.57624272118074,-8.868343184083523,-8.45868298132592,-5.175352482703966,-7.938404706193742,-7.806487009995092,-9.810510533041484,-0.7793936356378106,-3.0859607963619173,-0.4858012430102532,-4.425399469809925,-5.7764580195817095,-5.666345050820574,-9.304151154421609,-8.669664768017583,-5.453180165499713,-2.455346567454,-7.455465487666231,-7.271383159842591,-9.126899349359645,-7.811373183585446,-5.884418612830531,-3.4265312061679043,-0.9742103710044647,-2.1711853777454815,-9.216169688630027,-2.2887677846983134,-2.4189476931822607,-6.540151774226654,-1.8757824776698118,-2.0093433965898133,-5.063089575972624,-1.216854723796228,-3.5527195262112565,-1.7108009103453403,-2.4540096623999275,-3.611972354287376,-4.475014727636641,-2.20411792847391,-7.7181733225377975,-5.681401522584411,-5.876119247359995,-0.9159858987521585,-1.8652174518452447,-0.24536797605813954,-4.883851729127697,-6.949015385637923,-7.072257541328131,-4.776583271050581,-9.951954478219406,-6.1599710889608295,-0.6937634528637426,-0.33411027265276116,-6.210094338735823,-1.7091456542164551,-3.758896004640573,-0.6236720983405108,-2.116939340140871,-0.5532184148624331,-8.073689845581463,-3.7894732564568745,-0.8852240645995901,-8.916158655889832,-4.120894601965384,-1.7530555600666142,-3.2000488870979837,-5.768711225758083,-5.018927149758376,-0.35061872609039924,-2.4633560952238143,-1.6730201811521495,-0.9886983530047067,-9.597291014321597,-6.8885772047284455,-1.0692316052028272,-1.0759574643259828,-3.35761608958695,-5.239860659823934,-7.202383118747882,-9.472572791710583,-9.340092159138258,-3.4548525602651026,-9.930736578698045,-9.967054373022874,-9.061147141910142,-2.3218808616894737,-5.625263190981475,-9.802457526621529,-5.491960541053826,-6.605207985180646,-7.74757373703568,-5.01983407277984,-1.243692277608317,-3.660737387038009,-5.815890925988992,-4.7881724842649875,-7.801265171498892,-3.7463647667597955,-2.947450008883634,-9.000838223506047,-3.8687641729893674,-4.07674284492531,-9.037513637044965,-0.575907455610869,-3.388980416190792,-5.028476405448208,-5.063230798404684,-5.114030692209674,-9.616294280747791,-3.3746272572202884,-4.1926624621877595,-5.91879671207918,-5.392608526559009,-2.960636366367053,-0.5879476254036997,-6.205334051021674,-8.462052476557638,-4.448402605489643,-9.326406948926113,-3.708277176043775,-9.449968694934965,-8.858812822211863,-4.734872966660408,-4.4991288287417035,-1.7456792907565988,-7.914266865783488,-0.5602481722827002,-7.271630217012679,-3.3261711028610175,-5.7914797918744725,-0.9657911767723415,-4.162026411422017,-4.14052225410706,-2.390475796384468,-5.193773746951167,-0.313050342593979,-1.033979223437158,-7.083226244984382,-3.586633202182732,-0.6063660898304613,-0.4382916758765254,-1.7739048602640906,-7.4285945448323325,-0.2160182619452211,-0.9029539580655088,-1.8010034751340087,-0.13176253843682595,-8.642469728295943,-9.035932682878858,-8.017796170881063,-1.8072077153452981,-7.232200497844589,-4.698605161432066,-4.387100126173289,-9.948015337388846,-8.19071176616054,-6.87644630394524,-1.5178223646750921,-8.043989296605448,-7.5997223959029325,-4.599153379220322,-4.89431023504503,-6.257680789580595,-7.515002625544223,-2.259621868291639,-1.6720264387451866,-4.392808149680136,-6.875509585909361,-5.264636357652344,-6.552267043414943,-0.3121340346536505,-4.8584644366261,-5.608423960110036,-1.7147078298144147,-9.694209926500506,-7.238128986033399,-7.291091832065195,-3.538903491846226,-1.4252368324278941,-4.751130472804553,-6.603375783930905,-4.310760892426497,-7.329031934358139,-0.04216860228701602,-6.076382485853813,-2.9091014078556343,-8.580142403155795,-0.1597305034060903,-2.0288442457019062,-8.017127577838092,-4.854524149878019,-1.1714721163762554,-5.280465838145205,-3.8050514539877867,-7.29040765560514,-6.0738843450491675,-7.93344767802342,-5.353410762088046,-3.361953399732096,-9.677686253751826,-5.867080465492425,-4.964498855664122,-0.06206040540545521,-8.98141144943808,-7.116812222640741,-6.505770309051869,-6.716669328686049,-1.5556871886338053,-0.1887338191033483,-1.345704196819757,-0.600481129072703,-9.283634738573156,-7.752457708880152,-5.511095527485814,-2.8127452997570135,-1.839400929200583,-8.826900327927094,-0.9427828410498562,-9.620630616786954,-7.255945265573409,-2.408651626604743,-7.183201491393964,-0.31366407176280475,-5.394320780626343,-9.680793072656877,-5.499067815588139,-7.905407641456872,-9.74489854004285,-5.071888112584082,-2.539195421438929,-1.9623585468375326,-7.5916433300017445,-6.886670889981261,-2.124215993486671,-6.323949013016068,-1.3739684368132288,-2.6315869577691786,-6.434533549324534,-0.14616904298408118,-8.650757789719886,-1.0994038830701447,-1.437592066444302,-6.9094622177333465,-4.859933046600798,-0.9863290588171303,-3.010388584252468,-7.236250952004985,-0.491799575873908,-9.801167022871057,-7.709506951849454,-1.0150891788998195,-4.569018614819884,-8.679173458371567,-6.529154661994106,-2.827152288392547,-4.670392876952296,-4.250109829646524,-1.7251277474837101,-3.829249249866986,-4.732762790523825,-3.0602987789283076,-2.851829338871339,-4.6170297013230925,-8.593045297927013,-3.309551519824818,-7.266124290450238,-6.877289291136284,-0.8353089495318877,-1.3544146075415275,-3.0371592109159073,-6.566566894027456,-2.1628937014836502,-9.819553137542755,-3.824458538471689,-1.6433599490243656,-1.0026525322421787,-2.0365348792623816,-4.749442615955218,-9.191531322977909,-8.135762946815957,-4.693952936223937,-5.971721359022615,-6.990990782463236,-7.618270488483816,-1.2160061974012515,-4.813950272401238,-9.144461404635873,-1.8886840368221214,-3.9037122349068842,-1.5613249718667799,-3.898084142816234,-0.5904049495914165,-2.8964909553354756,-9.226483572400452,-3.7891825159376524,-4.216563265433109,-6.415575836171388,-0.30744367834666386,-1.182284116509249,-9.973525444394033,-4.008629902674903,-0.15657531421735316,-2.1718645584084206,-2.5742947508900937,-2.471057117596107,-4.271549639796952,-5.486281471252752,-6.627951272648442,-0.8758666058366193,-5.361774533739028,-7.000335815613905,-1.70374387384709,-0.32901274158449345,-2.568009384709067,-2.6598647975078316,-4.219929249377293,-3.9383516792703133,-8.5582322124728,-8.16511610413134,-1.8513560412414631,-6.020909251331896,-1.8132804653498358,-4.493565314637182,-3.9803252997500227,-8.328245466658824,-1.7027719223385773,-5.128152467360609,-2.773052978972581,-7.539830856556553,-6.980463252640494,-0.6327698879197308,-7.1300981258028155,-8.481981454716369,-0.560949329102971,-4.942513730931253,-2.655794736967856,-8.263286052055568,-9.229451543259376,-9.003219688725071,-6.727413380976046,-2.918968443146188,-0.8360974228317564,-2.0306660837172408,-1.5906561366266447,-7.64344794596743,-5.723941740683043,-8.382303470377153,-1.7905366797003075,-6.944496397585693,-9.115535309517872,-4.45039397343562,-1.8228638075521197,-0.6257167525809582,-3.20085453156961,-9.562702416938041,-9.454326123000865,-7.641634525443132,-5.048512257157228,-8.005424772894687,-9.174909855683314,-0.422641590175612,-1.3065225692044957,-9.79249556663477,-8.36554219027904,-0.21118450663467847,-3.515757559529029,-7.085152392292127,-8.272970820551535,-0.8259621761044733,-5.186556236444018,-7.061603333506737,-1.4275882331321732,-1.7403089125147964,-0.991727559053226,-4.382357530524857,-9.521524913248488,-0.6620167678228328,-3.1786599019784334,-6.74332747604423,-5.637625069909092,-9.550403041951117,-4.816596390126389,-1.0351509359029087,-1.4134411254742218,-9.185081766617104,-0.38501202744824825,-2.057404506316607,-6.497579422128301,-4.87088936727909,-1.477864169301264,-0.7532238788759238,-0.21773822337665338,-5.057117126465938,-0.7666197040137668,-9.755242025777548,-7.95151996525459,-3.2488234067157706,-0.0009617837187070322,-2.535843528797024,-1.4329334841281183,-3.586642925712955,-5.901975976514898,-0.7790462298212941,-9.983219055835903,-8.306007656794822,-7.760458093508222,-5.866435792087062,-6.621420063220251,-2.9784186986607852,-9.066574733889558,-8.364376086813214,-5.03310097936563,-2.362563422631585,-9.835689031604398,-7.651976315257672,-0.547400912850724,-0.488595334047488,-9.482500819732586,-9.708486939058417,-1.6319918658329824,-3.8225876534600034,-6.659232250239344,-3.488060984835577,-0.9613460570347354,-2.036293384037695,-8.988050204433133,-3.37658539070701,-2.8215939895926545,-2.911146933478057,-6.861085344214628,-0.9674728159409396,-4.353902008305757,-7.287027657621168,-8.562867931214594,-5.5738626037196415,-2.5356148387493693,-5.360954613964646,-1.3711882951233956,-9.506942775777178,-8.61290182155061,-4.427735167780302,-9.25055051182824,-8.32804176975187,-1.2754297469911569,-5.604285710701662,-3.1328472188610257,-4.8289612002256765,-4.143754131071978,-7.630519328335252,-8.947464529740481,-9.007652001284171,-8.413422099762437,-4.036195472783386,-4.481270686026935,-7.793280145504228,-7.430120655894676,-1.804424032558869,-3.9499956998129515,-8.18254727721043,-4.75692835975956,-9.374731707038094,-1.4283901330656557,-2.9238372222706,-6.853797193693629,-4.2420565480786765,-7.536346948581684,-0.42501973232900836,-5.53108556735693,-5.3002809386717065,-1.9827172478744814,-6.494141473952116,-7.460335533208944,-9.24903117213739,-7.134326707697667,-8.077626575266748,-8.86936453534161,-5.432280482752843,-0.531866054589547,-9.243465504196173,-3.9759622340327594,-6.060637407938847,-1.1721546311879183,-7.479742110284158,-6.722393614887161,-3.2132255477185256,-8.308721582038356,-2.436589008117158,-0.2550860393507204,-2.42847884635496,-1.47135708404049,-5.076526757433291,-6.258803849863432,-7.069980941483188,-7.536117935571276,-7.269987195378354,-6.793862092895175,-3.1473531861345694,-2.359993671657985,-1.426086122758372,-9.440066162541088,-8.333863149919393,-9.161832266747325,-3.099901620868053,-0.8541801287542827,-5.727355591056364,-7.905170627799265,-8.298382669378071,-7.248555766442626,-3.6184330187262415,-9.880343248784094,-1.2600559682162538,-4.816135486404427,-5.300896413744467,-0.20738332731343734,-1.2213808217746114,-5.426020951712389,-4.201409405214653,-5.057237650042059,-8.563524304307894,-3.956860526677417,-6.527970062432753,-7.55757147552284,-3.1203367697406437,-6.772372524665123,-2.282948847853068,-3.920996324816679,-1.275949690244591,-1.9140526849006134,-0.14909299167475965,-3.2870182679134463,-5.735482524310516,-2.208358788156184,-6.725563341995011,-5.733380944094737,-8.454204988008637,-9.082736796599356,-7.545256856391598,-0.9388631363675914,-1.3110112201386204,-1.873659410295263,-0.17028609430417285,-7.131535981904129,-8.606733109056076,-8.119268344749438,-7.988726467253688,-4.5576934085564,-6.269996045133357,-0.49982551263445085,-3.872560210347036,-0.9006645258719526,-4.147940730896702,-4.280031684666053,-9.277336415727406,-0.6275160052699191,-6.458941204852491,-0.29329580267789757,-2.0740467966576315,-1.198398051303986,-1.3980866000482495,-0.6954115224576807,-2.9113492636797234,-9.19096271448886,-2.531628040621061,-8.180581245763614,-3.483935183657747,-6.057537996586948,-7.535585104018447,-9.678324600467342,-9.662516843725006,-3.029735792056647,-1.4253937491331037,-4.561707678429688,-3.662149044650045,-2.0828712614354195,-2.0400495438105093,-7.973257423999582,-9.621242080330104,-1.0920187159277694,-9.183739637505909,-4.298475321513699,-9.691522433675539,-1.7829330834392443,-6.162911807036913,-8.494432553464843,-7.770116539175458,-2.8104203461111954,-5.913947853401287,-5.442300561024489,-2.221909460600826,-5.65910187155062,-6.398944545642669,-5.46961809863022,-0.6423607055347103,-4.888996631591995,-7.253933090218383,-5.528564922883379,-1.5515648968904094,-8.757502915383492,-3.537996127936398,-4.695596803201328,-5.356332065179008,-2.850815699503131,-1.7641815413371864,-3.3650118971930865,-0.19515647447370554,-2.7843930623432422,-8.525403435120005,-6.690855848267729,-6.271453713517133,-6.024071712396033,-7.044267776831507,-6.01997908718563,-0.2739318185866191,-5.736988114012522,-1.2998621979578906,-4.87715046591326,-8.571238015170362,-3.7799567046148996,-3.022361762099639,-4.314551701257365,-9.987777973194065,-7.350010743716229,-1.101218271592106,-0.1632725504396748,-4.086982519077813,-7.559364467019865,-1.1471095320634928,-1.9313750774614724,-5.695172946447345,-4.483520222845283,-7.756116132733508,-4.55153940319123,-8.44445537309306,-3.9240843734102016,-6.059091488606255,-0.26239468772496055,-7.97645720801599,-6.994620687024433,-7.651486613680058,-5.88999721979355,-3.601738314980576,-8.596524026700052,-7.669206550404741,-3.3673697969252214,-7.1169206533858205,-1.443537561646251,-5.53018615546494,-3.91604703885863,-3.152885957081941,-1.8591853758688504,-9.177281468985427,-8.175552738635885,-5.663622734438221,-9.70668560810719,-4.589019471924005,-9.047856680563838,-5.607337702922024,-8.215781530435846,-8.59951317566193,-8.805611321298514,-9.183448450678966,-2.1882608025201367,-2.733035635113148,-4.801630703328678,-6.248365471979005,-5.53872176659536,-8.055722535394466,-9.222348426626777,-7.0520630076410455,-4.211847052193374,-0.8361410896153543,-4.533705113701377,-1.989293417125535,-5.250463162618349,-7.564185361482407,-2.094133619409313,-3.139554356207459,-5.206500310865039,-0.42773152918023527,-5.783755493752216,-5.9834777798407535,-8.08908360751736,-3.282856153724667,-2.8897729979019826,-3.353504209616127,-4.707247026459623,-5.380735214663661,-6.088879430110872,-4.136090556599987,-1.7330574882598149,-8.342908602113157,-1.865478567902994,-0.3230107841842189,-8.421128945650674,-0.20029912346747558,-5.140254579235095,-7.556974745919149,-6.684363659099237,-0.7197214784127248,-5.444763577391736,-4.672780513243858,-4.631221145679936,-5.965619760954208,-4.7701734991206095,-8.422312727953017,-3.501683676087737,-4.484786111776174,-5.513665852840351,-6.927338802467338,-4.112748872219731,-4.558630694055896,-9.677557271012983,-0.12691024336492385,-6.48385690628797,-8.630540581201858,-8.290822146917263,-3.373757387231635,-1.6118627410837139,-7.466494736701947,-5.137034375728639,-3.779167964129604,-9.421974891238985,-9.902643526169294,-3.1913501866108596,-5.167763441314683,-0.3264906217530017,-6.229031531986147,-1.0781588519695529,-5.864236916665919,-7.508935273923834,-5.566569749888533,-7.50620903659208,-4.1457984818404725,-3.6855751278900994,-2.2747059285416316,-4.540786654572059,-3.195399682828235,-2.9440763943748105,-9.795196229274667,-2.750197435405217,-2.421882932212467,-4.549441592941337,-9.804037645525538,-5.241528725552007,-7.211736187531043,-5.577929287231611,-8.425063147106473,-2.6871665389779498,-4.802792178319139,-9.48933870583479,-1.3433163605495602,-7.535991045977706,-2.138176188298062,-6.991457232344236,-2.342717950699753,-7.559761035847048,-4.955381766816858,-9.313280133430599,-4.2385311152714085,-9.423578872020597,-4.616445483436376,-5.97170088967024,-2.4831688947911212,-3.5619189249108874,-0.25254298126315744,-3.6169141893695933,-8.638163672541948,-2.1764753534674353,-8.236264430566017,-0.8557013168995864,-1.1759380920733786,-9.892574976686292,-4.938436956996979,-1.7802144334408676,-7.527870295906396,-4.80167594623079,-8.405378328676127,-9.67350290305207,-9.355514334009726,-6.303803439937643,-1.5577967716706076,-9.020445326437411,-9.88690996572619,-8.986874168616062,-4.787642541908051,-4.367559300985045,-8.210068145975718,-9.642632771096903,-5.838562158416578,-0.3015013121767973,-9.536270099808394,-1.6350502805925626,-5.215168108792376,-2.5817972577492254,-1.9170934529351635,-6.088124005859756,-3.793673344899915,-0.0928157738343649,-4.159115416173305,-6.089623419773414,-7.911533272128342,-9.261575236328053,-6.2885487702689,-4.0344929755034205,-4.962527824936112,-9.745694983796946,-1.3082626881514603,-2.3744199595952264,-3.200514030951487,-6.575077051009027,-6.098728101212869,-0.659943096057749,-1.4773933059621713,-4.925545680275631,-6.977211844049894,-5.5039571046824936,-0.4874969716013511,-3.497034684449898,-4.465680868084143,-0.974257930322957,-3.4300091755808526,-9.068214484067958,-2.6232977253864465,-6.535718911151507,-5.638720588101201,-1.6432291479796723,-7.7929053613674775,-0.5503371796174195,-5.864697683927624,-7.677397162273922,-9.974890213768228,-0.22486905317976147,-1.4366227986062285,-3.447655835012804,-7.96736602333705,-6.459099435579933,-4.708341397209428,-9.418341142398534,-6.9604676036227,-3.4151337690155192,-6.866224526936775,-5.270287236784097,-2.0901020378652846,-8.140656913147113,-6.692423999582382,-6.1835778889949555,-6.356825537703785,-9.144394714396345,-9.402574790412753,-9.556297291250221,-1.376017158691727,-9.88341242196261,-5.987344561076203,-6.289333391389231,-4.525351380330425,-3.4183516276710346,-6.720108415080535,-5.199896922051743,-8.347164404079866,-1.980975506220033,-5.211809511142544,-9.142993157579593,-2.8120863727353806,-8.021616883763068,-8.913449591684188,-3.042315628584482,-4.88024041031502,-3.028263155423281,-4.369849200237783,-2.0377398538958458,-9.131802326245953,-6.980099417571335,-3.46352097470769,-7.296451464351945,-4.893627380454896,-0.26271186575848704,-5.6016003334950915,-7.189009326497535,-2.7136893685108854,-2.496053576465338,-2.5467318532780925,-8.694883512815174,-1.5800172040628513,-0.7505298787106751,-5.898195138621372,-2.1223333531640276,-5.634111730801006,-2.870313884100981,-3.4178286094398325,-8.088124765726267,-3.930266562369047,-6.530562818512157,-7.665454534982679,-6.317375126576799,-2.7762473311385527,-5.475835137259823,-2.5813956506093327,-3.195458316757902,-9.747406169374885,-4.0368667898580295,-1.169599999094666,-7.459473058200324,-1.1478032137807448,-0.7226381662961301,-7.68216827508528,-7.122798000733086,-4.775515331157596,-5.9013523728336015,-6.805224449733151,-4.019777641395912,-2.434193331838088,-5.932290108615003,-4.636087707707775,-5.699881638277359,-9.204143397928865,-0.8328327373159472,-1.469580241755033,-4.264825061258481,-2.761349962886006,-0.6963777988620645,-8.035595791928248,-8.173974791483598,-5.09279828421173,-6.23150546483064,-0.8624473013104739]}

},{}],70:[function(require,module,exports){
module.exports={"expected":[-9.320637475763679,-8.097889544457125,-52.60015834422224,-25.846671340974222,-8.57879419373663,-7.92461707622956,-12.452104077414209,-24.357940850774902,-8.979596702080805,-41.024348026241846,-20.76147414200838,-8.809483025540581,-7.162767426489848,-10.126967390893547,-56.72349998832672,-18.166519836094253,-342.69386610678737,-23.90463586540553,-40.63061764057843,-7.896424880580242,-17.424796027589935,-7.059543290185754,-22.073316984860423,-5.671716894713912,-11.133859842500286,-14.230330401188112,-9.680748211946396,-6.935390119450671,-10.975802968271216,-16.322539456517468,-7.005208945219863,-7.219123358413189,-8.491562470895417,-6.0935783891392346,-7.862905681225772,-173.08242595135187,-137.15957541583825,-9.363049985537565,-10.202546541390241,-7.828348366842661,-7.522533917342141,-8.479395920960384,-5.368563260274067,-20.8534793112361,-17.401332427976158,-29.432502101058535,-15.946016624600869,-6.22471753558299,-7.075172760392596,-5.858555090649583,-67.51272499178995,-7.9845117162242065,-6.862825844447482,-10.815817339855617,-8.253509723836455,-167.0032780287203,-7.4531822826670915,-6.784982266519377,-7.656311232663426,-6.676486562220161,-13.275790878374227,-33.2001191037208,-7.470807522351806,-11.104926580535738,-10.411299506418715,-7.583268128780716,-14.371444006206655,-14.288572528394775,-13.409219133687813,-6.332632803547924,-12.014662066176182,-7.4244671493596,-4880.633975804305,-8.14672426145866,-6.601268428745907,-25.16608064677939,-5.40641144127863,-27.31379627979783,-16.915204873118533,-8.183164960870323,-13.440938375629297,-9.303235899019407,-35.932740770223404,-6.282823134823736,-886.6008612184827,-15.83759135528262,-8.37556230264548,-13.224644635016345,-7.834660866113162,-28.77669802962032,-9.38621152235173,-6.418294528476749,-7.131993898933564,-8.42796990286265,-8.589491009895081,-7.970104302654217,-7.840078783628487,-9.109493089565792,-102.5644022922872,-24.64033197162181,-12.239405994512843,-10.50562878773989,-8.966037785422929,-13.921550561712337,-123.66938253214924,-6.782867887011231,-6.407744316716117,-8.982071883919431,-7.399108749596179,-535.3769367422993,-8.211346289442256,-1377.9037122487205,-6.704653466517697,-15.511335547886192,-10.049968458485163,-8.426908817187822,-10.063418099932514,-6.726615164504915,-7.313558448838082,-11.89873039578378,-8.22543270313148,-25.71428262276386,-11.431455361928172,-6.616720341485372,-7.695352649348518,-9.72478041787944,-27.66188630183004,-26.36024691111195,-21.67737782401383,-9.080399663226356,-4.826415971495903,-32.34936695564646,-88.86264405052883,-6.825694990533282,-8.899255145689057,-14.126681281349276,-5.219053017774772,-9.467877631077313,-19.252414853737214,-81.15476557080163,-13.457988651041962,-10.312769389506773,-5.4419783546154505,-10.410894640708095,-20.657705783413533,-11.157805635100127,-7.229463218428375,-9.912882881783753,-9.136455743666342,-12.411969953250978,-18.06980639657293,-44.516317449290945,-61.98436832192206,-20.868968743741593,-10.312528070899193,-56.774406398716465,-15.714155349495151,-15.744045518230758,-7.699639830983772,-7.547475216735822,-60.59687712747535,-14.456129050072343,-8.398516159499062,-14.301105655164715,-590.5880139667656,-6.8690567372614115,-8.60078430815248,-13.833832175219921,-26.34364819204465,-8.047823755256555,-12.198882205677611,-6.519155422005105,-9.67054210141624,-6.796652065253639,-65.21545330047464,-8.219571253252639,-5.328130132907618,-8.389359974833114,-8.494799986562859,-6.313297097984821,-11.475561008087565,-7.599782046910186,-11.440697609545799,-14.428442247428393,-211.96171311513302,-37.527967559224116,-6.805400609702664,-10.645661409503143,-6.458246628432185,-5.679909329600797,-20.735532028203156,-6.4491000675698515,-39.0605563783263,-7.852729836973298,-5.9917139143372475,-7.332952405403709,-6.792443562983959,-26.49458886247528,-37.68210049434357,-10.969597478679223,-32.856843032333494,-10.899263267987807,-6.297460206389959,-6.532553173452414,-5.942331447431535,-11.375920327535699,-9.230851467716457,-6.002666953136317,-228.78129705010755,-17.76184097822285,-82.07266905574717,-31.87019851674904,-9.406361316795792,-8.050301125428678,-7.350660858620832,-7.5343494657353665,-156.0521647504901,-11.230994865779786,-6.186162252297172,-6.952373019489814,-24.63118683075333,-41.98806278934296,-23.19222194670224,-26.089136856678543,-20.170487950603427,-11.509359808274185,-8.302806208992877,-1294.2117061318988,-6.248128855098678,-6.445012899181183,-245.85458734821728,-15.682165009433303,-5.7889507057496195,-8.020078653094853,-6.7365757346209065,-7.000333498916124,-10.605603373370965,-5.525600232439809,-25.557369627150443,-151.16056790671527,-18.446011058388756,-7.169584819758418,-5.4048237448839425,-6.769002427479897,-6.26495883143027,-8.780901043793628,-5.538795763165497,-7.787815435793614,-52.81710946427393,-12.94979445247322,-24.162550458848376,-25.04855980486287,-10.798480221746013,-9.455323688100979,-35.76862777792629,-590.2185096184899,-7.506190890337921,-7.070529522182069,-11.356715430586018,-8.44959737114229,-9.959577235143412,-11.869838204669984,-28.246772722785288,-6.574418160514133,-8.095046164663085,-9.360014497496532,-92.97989842765831,-10.778319834703495,-7.641862773177333,-10.07858295893368,-5.100109521109021,-5.17670991447115,-7.461398074940606,-14.107208736385632,-9.11683833065067,-8.946998205299202,-46.202999249132255,-12.39479239014883,-16.657009900088678,-6.287849762990872,-10.887127140987097,-12.788025525515469,-26.882161018706576,-7.45414166264418,-69.53079681581737,-18.387871541097695,-7.735088129975516,-6.672477525131459,-13.550076574440611,-9.824336026894592,-4.802845303860215,-30.95485944299295,-18.137306876363475,-9.760082311545808,-12.642470854164063,-7.889908594534592,-6.41141154475816,-55.81980123757478,-34.634633031443,-8.547012274155417,-8.84624195783444,-5.341064384929605,-11.98621852293812,-9.000711556906635,-6.728520132286031,-9.348209463141751,-10.96647738673883,-347.4043455146854,-11.09860626826243,-6.401463900572509,-11.878230892572782,-6.4664150615058364,-9.85984377289818,-12.496399193098167,-9.233168152219154,-6.395917087325367,-11.242936893824753,-5.860259477534246,-9.936210479506475,-8.504794130560358,-7.004474418232293,-13.066569279042074,-5.197739925815543,-6.336209756385704,-38.7287784034884,-16.98840914196291,-86.85659734340778,-12.945880865469839,-15.027454313868915,-35.95534376536456,-7.308021815050801,-10.147847427558824,-51.73456523833685,-20.43362997635356,-21.15562631331358,-16.07851087594525,-8.420964656170304,-6.202500180389083,-5.4205194342690035,-10.956777683973582,-8.596330601069253,-6.132171161603573,-7.48066130875937,-11.759169710297702,-13.085291536010065,-36.41360036161842,-7.08521015636677,-6.1891342757062295,-6.225648420815428,-8.702489801720814,-7.790137987618408,-7.869153177016693,-7.345227848185728,-242.7014464224185,-8.54854449305042,-13.439931583350504,-8.206652784805845,-10.313758612086454,-9.26510885761205,-8.876580458304383,-10.357793220446943,-11.868545682818963,-18.400182856368218,-13.255358063805234,-9.952874196994943,-21.747833608240228,-8.934053138356763,-9.70514822619748,-6.406006020144648,-9.669970383590043,-5.786642006433569,-7.903844249453083,-5.648527632231811,-9.657313360858584,-51.95595208491995,-121.74315784584971,-53.43075998568481,-575.714192411032,-22.264855323562863,-18.371187414029354,-7.384254883310396,-7.108987595271774,-6.372461783071909,-8.171563218763493,-8.316648141268098,-15.981588746737271,-7.268787544880193,-6.742330376027365,-20.423521275918286,-7.625274102184977,-8.31087586928025,-16.46464360104309,-11.252031388785966,-19.667215263709537,-22.032018872109504,-8.027287683602989,-15.293918869363498,-6.715799688506065,-35.43867224411818,-18.78272579232956,-10.124339541982167,-7.385536604164065,-7.860480575997311,-13.161381644086143,-16.557305613837368,-7.820103358594815,-61.569442628704195,-7.796712115218349,-10.167414522598332,-7.784426495471216,-9.683433317130559,-7.088437660370375,-63.675183016594815,-5.590183373265452,-67.80807854289885,-19.759828940405413,-5.657099112826089,-8.047872750946324,-21.86060901573017,-6.520782488344239,-10.415639743151132,-9.044321914490212,-6.766119437534129,-35.12723110181286,-16.580307544990152,-16.1370993172483,-16.103162099217386,-14.8122040406897,-22.099192968952416,-7.855674634819627,-107.00363508031107,-7.662436006502269,-7.2155714975854455,-6.9703549105309826,-7.664356867817045,-8.205282526124783,-10.267167151555334,-7.6070970902334105,-8.534213359948835,-7.422808120140307,-12.279558766859436,-10.507896071154654,-189.92375932902013,-7.857665516386058,-45.81321596080359,-5.450549693931707,-14.825264457834399,-8.640180989020779,-18.530256631225875,-5.9449132415651,-43.001261935997725,-8.622189832832074,-7.3820171430773565,-32.78706063611921,-9.855966588915162,-23.68750631649538,-13.418855871373939,-7.390339986456667,-12.62603735871788,-9.416106383224,-42.913988352780315,-7.225529768339745,-6.397511943760517,-9.087889085552032,-9.384728464280478,-17.978735135352384,-39.878128252841975,-14.151700455328136,-9.36889291981131,-9.165073504332495,-6.532297477024777,-7.126173985967596,-17.795955947005385,-6.090057791186258,-8.325524781826223,-8.14003267235875,-21.112425002459553,-11.734285917358296,-26.575543974354478,-23.769176813772415,-16.166123451099885,-66.73609327887863,-6.353646153494484,-7.331115777686604,-12.864015963333653,-9.916696126597461,-53.20329890130751,-6.719233005090945,-9.717250968783658,-7.075038571803156,-5.65240663218496,-8.98662910504895,-9.996907949859771,-187.01722036609183,-8.191513569983734,-7.286275927074055,-5.559929488089532,-8.85054948723198,-10.677554949973441,-11.94973402898608,-6.561359464624774,-13.76908472140094,-11.153450452714292,-13.699919876041038,-6.188721280832434,-11.706141085885115,-25.464380448536655,-6.182205306824539,-6.332580143579197,-11.914320078760113,-6.739196026393316,-51.746565896040984,-6.760432940487025,-169.62811161243624,-7.580650337697856,-26.749458010158286,-7.733846343595193,-6.3160425206185105,-8.722673392603626,-11.756819871351572,-7.372090026490909,-8.28772024738007,-6.892751523179754,-12.27905902447017,-32.18164459877116,-6.721476934972619,-28.558988986769442,-38.463665624685255,-10.516466977543722,-12.232324346616569,-12.73462210302748,-8.065273252436786,-18.582737426582252,-21.332535257483194,-7.227469391460773,-7.845358056578146,-463.7666600682946,-12.705668563634282,-11.393680152530438,-11.89105045481329,-8.497610727849041,-5.764799781019082,-12.67771709750078,-7.2847410693006935,-15.967905473669765,-9.175945005507248,-6.193890983500535,-17.902553726705012,-8.583292023743347,-5.047473233212145,-6.4404671311324115,-13.316529996200119,-21.51470307310676,-9.624330120004059,-7.245343259505627,-13.459902090457447,-9.747144037708274,-19.553135286963897,-32.015650491768845,-11.706536670172978,-6.909711805908417,-5.3491856229833505,-7.3219784890593065,-6.632654517847595,-29.898330004463052,-8.621241655678329,-7.555373111705118,-7.932140353438539,-12.448615675749544,-39.50134369526806,-21.8129226861974,-8.604493184652659,-35.84384404380459,-10.94015452085939,-8.993730604422156,-8.280652101094176,-13.126085838530324,-5.395417760020518,-7.233522719512793,-6.645468784847544,-15.39319466051535,-7.46236240972271,-8.16210037261247,-21.334347620189238,-9.70802800912489,-43.8725750318649,-14.247935003306136,-411.6349848503461,-9.76822608916153,-9.245864884094354,-8.42336038793392,-8.320869450422853,-45.48844014145249,-14.749496649901442,-8.532414754604163,-6.401120139259742,-15.086358753609824,-14.683959619080287,-14.68916024415818,-8.466138936430166,-6.5685593255452694,-11.17033520590722,-152.1344752578985,-11.629368039618761,-26.58988589187205,-6.500365729293451,-8.905408754590374,-6.558524160545867,-16.84667901000813,-7.357247197198116,-7.939503468979179,-11.45967683571081,-9.649805502599902,-7.476940780764741,-11.899840361274096,-5.831171297955994,-11.824968541245502,-9.21593359808714,-7.977777745893453,-7.782242377981266,-10.26550035912713,-81.0147420200187,-7.280053421449407,-1360.5054010435656,-37.728409392415564,-8.435330025775094,-8.172070866473241,-8.446432891464516,-6.336286002036758,-16.355911108546564,-9.990489257471513,-192.1095008916323,-8.008348739676546,-10.443456099883676,-9.003490922983154,-7.192823597581441,-26.851887251539388,-6.526172396419106,-10.3362237822085,-11.912645064591688,-17.192820452770764,-7.926080178738201,-7.463302634013905,-62.610558333433836,-5.890127704903685,-23.191033030270326,-7.472976808987089,-41.215790541652744,-9.510672940198177,-58.840432434889756,-5.981815921845316,-22.97265629149647,-46.05866611620826,-9.687290994232342,-7.3549577206214725,-6.66249618125366,-8.048560327082907,-21.265795196236887,-11.960676170001467,-6.896724411580186,-6.098555771866153,-30.432145022162754,-14.263224886193065,-18.671475020015468,-9.218247382618385,-7.873618136878305,-7.67068202966346,-16.73722155782174,-5.534125860426909,-10.852645377025791,-6.236297179196846,-13.959632644649867,-7.62293044550573,-22.107825624570047,-12.027467293820743,-15.202781738689485,-9.077945913899876,-24.865019363690887,-15.083277237608712,-141.91574852890116,-36.77052414401426,-12.866112791819086,-5.807974634090222,-50.590924448717914,-8.256933128262272,-19.50912547497808,-13.137943721316471,-8.810363131914128,-5.811782616604318,-12.899969131274093,-7.158067288860556,-5.013276772589567,-14.681509838816952,-39.12316686226721,-8.308239370464058,-8.652323280220305,-4.9256058673620435,-10.62133156489953,-6.88307083251729,-32.21307523991911,-11.946824528513872,-24.275643832482693,-7.735830656982625,-8.080519235706268,-7.9128689746389735,-5.369459029283043,-6.830663954962226,-26.03047876435192,-9.581728768275367,-11.788879949653916,-5.6059898871554505,-16.67747591141408,-9.197465168123083,-14.196702174353536,-7.944741721250251,-8.098527089746224,-24.099675943550185,-49.71386039070528,-13.96007089015652,-13.081769754102291,-505.4325087394675,-20.753684187536866,-12.551561539574841,-6.457484070860543,-40.205164968203945,-43.15113740025273,-8.876431502795716,-7.559040815202664,-9.621556832297937,-23.479365285681258,-11.782556025167139,-9.429417803950667,-10.523586909975327,-7.810405649615636,-11.130629680869353,-7.147728733438587,-6.212062359763214,-17.151968794680418,-12.149032784986623,-6.687079271803731,-7.243090616957561,-12.351048243459289,-61.688103228792684,-16.9685714495102,-8.34216190296337,-8.417261350261029,-15.836368855336307,-8.225785866105838,-8.974326593744621,-8.00539033901642,-14.202134336409488,-6.775291087882884,-7.641242301412993,-6.481409890471865,-5.736346490334819,-18.046688035839612,-12.48075753502207,-7.288342048990667,-7.411899230936495,-8.391119345131404,-13.29026223566514,-10.51509671193283,-8.300956988775651,-6.640515065052806,-9.950457649236782,-160.8031574406479,-7.7791299634944915,-21.780305713873886,-7.668675798954538,-10.680459082422594,-7.772735495754215,-8.90580123804813,-12.661552768176405,-6.429234471142891,-8.513918344421961,-11.935126393028439,-9.182479739003742,-15.513069856893884,-9.293861628434762,-5.4127392579601405,-51.5687595968119,-9.641183433838727,-8.46481278184373,-9.369134342988572,-18.488074746516848,-9.677909239390045,-11.314821449438561,-7.540105435834434,-7.204116701253408,-11.78566088711951,-36.959374347160775,-7.498601173780645,-12.07645094770788,-14.722120464194978,-169.6896277469071,-6.056670335032274,-8.590984212249625,-10.652257979580952,-29.917990657103772,-6.476136745788853,-7.50946965902898,-6.824990304776431,-5.1972499953527915,-5.999886123979644,-9.572455519173516,-8.357349005169427,-11.56631400594605,-7.460544692730101,-29.341638768493397,-5.481112750900399,-10.78194993884209,-7.902677998208822,-10.77403457352713,-9.508623964982549,-6.0860344888223725,-14.139922045452035,-6.945724165268964,-6.113904789924003,-8.403698248858731,-25.529031571229204,-8.417584901356104,-13.263608954506678,-6.5334750710953875,-8.32899920711299,-12.48700345675099,-9.616658008854497,-8.714317820345043,-7.47528150683923,-11.348238866374093,-7.797498493172711,-9.839112635694356,-70.90499472575563,-8.588611805536496,-132.82592047506904,-12.647109239931318,-9.848641508615648,-6.281777221878484,-8.074917059260972,-7.748356212691107,-7.5135890136476435,-31.508749851206762,-87.30447762232721,-5.78854104887697,-6.132836438092172,-26.450282783914005,-5.568110372697141,-6.3104299970494075,-11.024590877170045,-5.658970560891419,-14.981938707592164,-9.731955059879084,-10.500398200368595,-7.762978038334959,-18.771021345328958,-85.9044984929201,-440.7184718127206,-9.829839585418604,-6.681598981861196,-6.980291199909599,-11.592598326886904,-5.9582547042762695,-12.204467450348348,-10.96642282571826,-9.291296513141258,-7.739456999433916,-5.832925027199289,-19.59240510531777,-5.709068078060654,-47.36407218142753,-16.379250260273633,-8.858646941960833,-7.134618579432248,-7.9540335215410165,-8.916264910830312,-17.43706276906824,-52.062631019608695,-1840.0364813183035,-62.72121118368688,-11.02667998469333,-7.0151608998504305,-5.109965052039768,-9.355951812590826,-7.499660866602042,-8.081481810783188,-11.883624055668951,-6.875736817420691,-32.11770735340947,-9.274398334690213,-6.47577299199034,-12.060417643134768,-30.396396519193143,-7.6283736801468685,-25.92068555138536,-28.1054067017927,-6.520590547817795,-5.936417502367244,-9.210776735341705,-6.526497319297779,-56.6066404555845,-10.583117559588572,-57.419169829902906,-7.372489885098149,-10.059108027971174,-45.65606126587641,-10.346190702179218,-112.50948699751211,-65.82282707465808,-36.63265788558702,-8.594190706378413,-5.776792029485641,-6.775225597733002,-6.150843746450179,-6.074458896854656,-9.322346968017625,-6.35002008052181,-16.808478830451985,-13.04516085702115,-8.920649697886809,-13.714291873290325,-23.726215770754376,-11.472318414154667,-6.710648463563903,-365.5520937273994,-58.796966193372846,-12.40598041249942,-10.89531964746183,-14.992352414687675,-10.278586626503671,-14.073911199993734,-6.006723108757534,-22.222355686057536,-7.549564488447439,-6.602049269118828,-9.47357012788354,-192.93273345608443,-16.014949412195673,-13.063829460932656,-7.636506077652497,-10.680902498024267,-7.003697655325611,-6.638426087777358,-7.848391016706259,-8.490577092586339,-6.755339062672155,-7.878747397048194,-6.749270320459759,-23.528809632794395,-633.692589587038,-7.695160942740182,-8.95058743905252,-14.550999311841583,-10.035473754032614,-6.692961993549922,-5.671419811583725,-7.18151239296075,-11.50527483324642,-337.33925994872794,-8.813045725764406,-6.794865322488283,-7.4927161414418855,-9.340767631642212,-5.902627810714668,-4.830270940858346,-85.94826787566194,-11.346537732335356,-133.2123152207126,-6.8493016863111915,-11.411107273582141,-7.8646245015592555,-18.55613298109938,-137.5038857381455,-13.506282273791626,-8.863438441334036,-16.60394918950167,-5.730651724825739,-5.9473942602175836,-4.676531260019635,-9.29041455241761,-15.878336166914066,-9.012568124946993,-6.0755141549624705,-11.991321906946173,-7.266679839989907,-5.785989548448941,-7.023514821611613,-21.463828195096543,-8.93400467487315,-7.956153142384744,-17.691207276294325,-13.098497099768062,-8.583001241525656,-6.863351873150316,-23.68126707551042,-8.961473247224841,-21.90055088917172,-12.667117413795225,-8.327900636958903,-9.513475435983132,-7.611777980676132,-68.73361402721044],"x":[-12.801825490315338,-10.07264389157957,-14.829566905056717,-14.516684602195735,-11.692091154704212,-19.314366508752272,-12.688374362947311,-18.349501272977168,-19.906081944476025,-13.511288549494125,-10.173459764801287,-19.768103940815244,-17.405151350194405,-18.96076745193283,-14.878663141528358,-19.284512642350265,-11.534088175248947,-13.67670190133361,-10.26591809015897,-11.404862056419276,-12.775331812191734,-12.004076936688278,-12.572044620534635,-14.931697213430501,-10.96814296076516,-11.021355243370131,-17.090478665206877,-10.341009615501209,-17.173192664768617,-10.928887996647054,-14.3933093358162,-12.65040587894353,-14.195784133401135,-13.971300326673223,-16.206537063502317,-11.515178458007739,-11.324397912013593,-17.67141332429499,-16.705689191570002,-15.880052303724671,-12.86768364569271,-12.561863652950901,-14.836953255748115,-14.551886616093485,-19.823810927246043,-12.364852401053506,-18.854215900619536,-12.373772009456394,-10.743533925694532,-10.632035663341322,-13.03644648455096,-15.410074203367635,-15.47531838988456,-16.44702800921239,-11.573196637664315,-15.599666188041548,-10.335035940192078,-12.289223688709125,-19.794445946548777,-17.772973509087667,-11.888485217979275,-17.836242055032834,-13.185425790860082,-11.262116697677083,-12.643077306960196,-16.474072674051875,-17.47646068446104,-11.380712265895943,-13.923338914830765,-10.627984755784375,-13.011405509138525,-14.98025609150213,-12.129873449491779,-14.729111555255187,-10.324440643087502,-15.879439548800951,-12.315071595274627,-11.173291720716964,-14.322473381168221,-16.96912303956774,-13.545857958208526,-16.788366439765326,-18.490245117342305,-11.610496776928919,-10.884828016203858,-19.405336743352215,-17.456671647488584,-19.780404389300717,-11.115414717319808,-16.028277699977306,-16.82091824892396,-10.636362432990303,-15.477566844929365,-17.765431686598273,-17.315100276169797,-15.080267396111324,-18.35850372303476,-15.82246193901093,-13.269947526027375,-10.749610306216585,-14.45057106632161,-16.238896238590456,-12.4357065225462,-17.504149488555992,-10.811006742065466,-15.062311842160206,-18.092140918345066,-11.93036351837942,-11.982620568014546,-14.28798353058478,-11.853982259184308,-17.624112112933062,-16.954950837072815,-13.991756041757881,-12.259319836926517,-14.994692305512174,-17.088785357938544,-13.61751817649667,-13.631731414603427,-14.339136800412183,-11.227999865600708,-17.88703919787611,-19.197901627925283,-17.1428254719948,-14.052706843070943,-18.577601512080555,-10.411320002083608,-17.53051676078121,-19.153054790449975,-16.305674412192534,-10.005382403246319,-15.21964148163609,-17.202857011502818,-16.689664923240215,-16.980290228814876,-13.237507630700392,-11.471350125848886,-12.28706214187947,-13.146426019508887,-17.446588199114906,-10.192102734380873,-13.132886936300395,-11.932476840828617,-17.550403114789958,-18.3738162497257,-18.58128369138379,-18.22299834027914,-18.71581897740902,-13.324002969979166,-16.201181567400948,-14.228667782115668,-19.284802582782024,-16.392297321810464,-14.89487116902231,-15.66893894322777,-17.901473380898977,-14.43907047749487,-19.981588701409212,-17.97414596478233,-10.813590619965016,-12.56667557188213,-19.273565176828214,-12.336982560891235,-19.23807962913292,-12.888806926434944,-13.359402501634538,-13.211599850103596,-15.488170114651966,-12.978919083566877,-14.813498127356386,-12.36925470395611,-11.710797617430554,-16.71921212229018,-12.886450833296985,-15.520807929465361,-19.90696863838478,-12.990312813800815,-17.3938121405612,-14.423720144054222,-16.029818744015806,-18.601948321031912,-11.413456090150776,-17.98827183464742,-19.804113975624198,-15.992423962494327,-10.375782263737666,-12.842061204042391,-13.82403368725216,-11.094341608248552,-13.358230226217621,-12.970446922081047,-13.194359238427664,-18.17866634722791,-19.923760330470998,-11.470728998920237,-11.631272594307443,-15.715962337515437,-16.65125028869428,-18.021887280100245,-14.546607878392038,-16.0535639474029,-11.236846251990517,-15.015856646132196,-12.335922967348967,-11.234712855917849,-11.153842795571162,-19.497473688944904,-14.234731883477798,-16.792964456239414,-19.702332577158327,-10.619788483962335,-16.277585828452725,-18.54705374961776,-13.698359959961877,-16.583652737123206,-14.675483275580717,-16.2270201358656,-10.042780540118159,-13.675822149377217,-15.768925308681252,-12.770703720010266,-17.88749205442693,-13.217829604763022,-11.226162781974462,-17.527219168201107,-14.996518820940326,-15.144496739651121,-17.44567859023629,-12.76344079706023,-12.17693269548819,-17.087972318226527,-13.440197378953755,-10.086431285259614,-11.339520431955716,-11.76243743745695,-18.948417079579837,-18.16587768199645,-11.171133297432753,-19.76024781109854,-10.792014092586069,-12.349911231414918,-13.032494585142967,-12.8587689726281,-10.816217470206144,-10.638488584907313,-12.836521173499689,-13.19168408964792,-14.524350174263606,-17.464556414061704,-18.49332419271518,-10.69579100421934,-17.143081940109866,-17.5396075799372,-19.240733584644403,-14.29767308102071,-13.8737633234987,-14.340129719348699,-15.079727852694196,-19.591068158620782,-13.148092468579586,-15.782862154897987,-10.10620540752881,-19.82137592258055,-14.959497892679487,-17.885570988678392,-13.242839680773947,-15.268658538401493,-15.197311179183329,-16.49560568216328,-19.43656642157024,-10.101600885315703,-12.129431538682214,-15.19861273230801,-13.3494039390684,-18.56174232590196,-19.853492306802824,-18.089744443960992,-18.173049002398688,-14.209292128072981,-16.65524592837162,-18.379138721877943,-15.464693063417979,-19.184022848487935,-14.509968241535816,-12.17116769381218,-10.498185162767683,-19.499085026992493,-12.511239598272317,-13.633501177891922,-16.175259699946384,-10.659764719208795,-19.628534270781866,-13.580336840830434,-16.476462759226543,-12.043774368265403,-14.505494976198833,-11.750342990585054,-14.608983620278593,-15.32804006648089,-19.01490294350906,-10.669186407901696,-10.200255398754095,-14.768313673511402,-18.422663496735037,-10.081587103174662,-10.345444055689208,-14.680885280774195,-15.949462963359686,-19.01478348119856,-10.08165771942486,-11.693889034047215,-11.48133646558784,-11.256874294275432,-11.000810150078681,-16.449547846106448,-12.240626702117392,-18.52170575425389,-10.561208469026306,-12.71075383162296,-10.005531024231383,-10.572023446869016,-19.568664440192588,-12.001349529212757,-10.523575566328052,-15.94192682230285,-14.439275677491686,-14.447851829555079,-10.573307783618924,-15.195484092989993,-10.879936768293849,-19.221343496438294,-11.086331063917132,-15.398885055634015,-19.45324198449901,-14.2848733967727,-17.85833552500953,-16.433849536340535,-11.089072787350378,-13.109673752723515,-12.141139494448828,-12.18874807541055,-10.292289376024009,-15.683133198835188,-10.564303643794409,-17.726994853388053,-19.918709829071418,-16.791178108824887,-10.48315360192541,-13.229743382846204,-12.032910725649728,-10.336774962528711,-14.560872857203462,-14.978074339538399,-19.341546366536278,-14.87734012941954,-11.99206617864505,-14.996759202378083,-14.035291700741649,-19.431872005081832,-14.934946117611487,-13.777877869695747,-18.78808357409473,-11.59510106974003,-15.624873666991695,-17.275103565876893,-15.421409243295717,-19.154865097287217,-14.948312030093208,-16.1943237518895,-12.520445538256364,-10.81447702337227,-10.143960248208135,-10.046383304741518,-18.597001760589976,-10.197220856021378,-19.272628784552634,-10.455599663562756,-19.2676197985027,-19.461679215855455,-19.393004387756893,-14.673637275736283,-10.299515419543152,-15.719906061675296,-11.740963606777024,-12.015430685702057,-12.464231300457861,-17.664960562228703,-11.627847142063281,-14.84791385851468,-10.575895133166828,-13.94242253631079,-15.912380727850287,-11.48659718450482,-17.967955438623132,-15.091706958116083,-18.983090111550393,-14.006005861997803,-14.646631146573645,-15.588926878996109,-13.1712015399142,-17.23350427814313,-13.75603207376667,-13.11698715629862,-14.91382686021021,-10.588108545811675,-18.522346823575603,-11.17339699443426,-10.100675418917646,-18.08438177582022,-18.765855111823797,-13.669606884617425,-17.38809804407144,-17.513889024259647,-12.143233710502603,-17.175392531065658,-18.223161608372013,-13.406519116433333,-13.504006201496965,-13.91581285281,-17.660409650138522,-15.301982012612372,-16.927958088326335,-12.444470905408727,-14.613569175896103,-12.577699538646431,-19.627203860853797,-19.475453481451797,-13.883258127203655,-13.976341344681455,-16.504255047017732,-15.8622434763549,-12.753302580204888,-16.258534843094104,-15.764085495866745,-15.193120960951896,-18.5885667287513,-16.340694345312457,-14.020925317376665,-12.63141634020223,-13.148971060697134,-18.132656053448418,-17.200152506663432,-11.707854952903954,-13.195721193784582,-15.392134797011694,-10.774216430806632,-19.30458153667496,-19.36741943819458,-15.483923729991389,-14.815372835521787,-16.078054560703613,-19.342097655467573,-12.416991139814098,-19.923701046913507,-17.6625991526072,-16.44225207176452,-13.774004898341076,-16.3869855544787,-16.836823553550502,-17.92386660471873,-17.648603276418076,-14.455184386192299,-15.691353227829907,-16.132411447270762,-18.67105642440732,-19.02816618228573,-10.75080859746956,-17.657637413867327,-12.00053151516599,-12.487832677359346,-19.165356523308436,-13.362279226534143,-16.639154240165745,-14.33301855992855,-17.771593324248837,-15.63133374154818,-17.71036006734088,-16.050429642201756,-11.037553991238948,-17.53994254432123,-12.540126450389222,-19.52866136755766,-14.70522208453091,-17.83332685517803,-14.781579343831519,-10.784656767582153,-12.410763948026437,-15.990584953631576,-12.908111410334888,-10.114577444281132,-12.746687690372392,-14.870215753972229,-15.030857794381706,-16.421606008153006,-18.7606239655076,-15.150978166413203,-11.30175466769861,-16.32744532329459,-17.632808483397326,-10.897864419002053,-12.229158632113933,-11.718961170405818,-13.308132473219192,-18.281589266209615,-13.831551526710484,-18.342176166772738,-18.913961399336053,-15.63927615001045,-13.422918911176474,-16.14292641993351,-11.681242410140669,-10.863434117115688,-11.012918563923167,-10.089721561958697,-15.855327656216442,-17.13520620131764,-13.865401796757027,-11.34358904865188,-15.366302606231672,-19.377571096189584,-15.754772762806121,-10.676368022404887,-14.384698403867812,-16.16045806326192,-16.777134512066134,-13.044878977557051,-14.910412962928607,-15.029848222584366,-19.089225966819857,-14.297037023412944,-18.917640487639595,-14.367067098455287,-18.355664743788008,-12.417633668197489,-15.39226931007363,-19.040857765382203,-18.84243296576901,-14.61555049382289,-18.099882579554443,-12.137130799352438,-12.805950783607356,-14.943152070750987,-19.930204025277767,-13.733336396512277,-13.995644242779782,-10.284707077451873,-10.212169216182478,-13.35242492344159,-12.769652255490605,-11.19696823763505,-11.297668222318336,-10.60791986114271,-13.933443786629686,-14.420227582099498,-18.820505880315846,-17.583326453195486,-18.25451403174384,-14.09717842188535,-12.606340062441745,-16.875276044458346,-11.7486524916606,-13.840934556240779,-14.56566939466205,-10.255650956027008,-14.15783776612713,-15.625041053968985,-16.027071646257305,-19.52407547667153,-19.55621206772549,-19.693126921437603,-11.401458313631839,-18.855858666749665,-16.373658820731233,-12.562097581801481,-15.444176852789678,-19.37374049367288,-14.925088279503528,-12.210695807217256,-13.352537598835736,-12.476943431115624,-13.160338714390324,-18.17802599577201,-17.284611414303154,-17.895826974967246,-13.539592046818905,-18.283982274692764,-16.702052516832296,-12.637382616703501,-11.109732479799296,-17.64709584393708,-19.199675474484273,-19.26907981020792,-19.22616049723827,-19.444499219153396,-18.56793813020273,-10.285940486694587,-16.580238757597353,-15.827522536485857,-18.092851762090202,-12.74102948419507,-14.297967238145135,-18.58274662643066,-17.085229332897764,-19.340399769811704,-18.3654694300118,-14.306927911615421,-19.313737300722746,-15.939157129526802,-15.613100901330782,-10.213271878561429,-12.879779067768965,-13.493903319304932,-10.971079676774082,-12.830542974266091,-17.180972487464437,-10.26516347976645,-17.658065281816235,-17.19037563638353,-13.684862839634174,-14.467926533733245,-15.71559315945324,-18.67357442066378,-14.611934183673597,-15.250942376896257,-18.78817147003093,-17.943512306101855,-16.74822226792715,-15.301784421948216,-18.129240120142377,-12.652780720310515,-15.06594502153951,-14.88117522760691,-16.581784589293505,-19.32845877550841,-17.43185041632543,-16.707848589756964,-10.278431146972178,-12.967178236051154,-10.875200560524199,-10.37957079679833,-10.546173615535032,-12.177585622350794,-15.860710047193491,-19.399917450656936,-13.535956023111083,-17.786301326099363,-18.906219192734955,-11.986739534241275,-19.15161941862001,-19.268629505226862,-12.962215908381449,-17.44853304065614,-17.65582154584988,-16.831202908569594,-14.945521893891565,-12.503765628914483,-14.623703211013519,-10.829527918516298,-12.327386098101073,-18.70436155968839,-15.059143476317036,-15.805390249145397,-17.8051579068692,-10.818329705649985,-17.69569376766849,-19.69302209279691,-18.085625530255033,-18.308041346814537,-13.344437212203399,-10.886959356573216,-10.96334451690816,-10.442030445230559,-17.613218071626807,-16.313733455545062,-16.75221770829618,-13.86358897293147,-14.565342987956418,-15.20044696557303,-16.44313583328287,-17.49979454598363,-19.875872986027346,-10.833486520399244,-10.121058511763323,-13.695649338963156,-17.921661385111886,-17.741149475205496,-12.252988052551611,-12.48536212449829,-13.240717363358394,-16.801520935394937,-11.937047839706622,-10.238043532774713,-18.39284078811732,-16.423978583809355,-17.13408255379819,-18.919357322116063,-11.271298558136024,-14.462507531839591,-14.214911162133841,-18.057827020082694,-15.541409321951152,-19.963841347139436,-10.847887586800809,-13.669661019410173,-14.564476922335716,-13.142598276934033,-12.485317338210429,-18.509359186410773,-17.63826896140431,-13.46529850929234,-10.7948894117166,-16.41941684179344,-18.385143625417285,-17.41128600306713,-14.928300568332645,-15.359163655918548,-18.546037573428308,-10.363319216198061,-13.779145445810295,-14.536652995432442,-11.840975000631557,-16.90615613569975,-13.12533432277786,-10.849038241275606,-16.719328932743608,-17.817536211748347,-18.046380630270967,-15.199328012871728,-15.179105549108593,-18.752793052446744,-15.059513529817872,-14.282455678761686,-19.21310915042141,-11.081508001170985,-16.654778922393398,-14.058631236164864,-10.37940786135626,-10.224480532437653,-15.716497447792193,-14.542110583918738,-14.107701261765795,-17.26878830859969,-19.234552416557317,-18.61003292248173,-11.412336797576598,-16.353025353559172,-18.15573267055494,-18.81794624509042,-16.959823405980302,-12.868960356688552,-19.361292400937447,-15.111039433335812,-16.01989107112881,-13.693481453757725,-12.992390837362562,-17.05207066775188,-12.407670077468067,-16.91386882924875,-18.310265919279168,-14.173336251409392,-19.6906890370131,-13.684376308135214,-17.433971860072443,-13.889722917222397,-19.09404456769597,-11.588965225924232,-13.755495563265521,-10.218930413359079,-18.749730296723847,-17.43720526916486,-15.611378720515914,-17.665982363911912,-19.68902228367105,-16.569684898986882,-18.794819794038528,-19.636243383306496,-12.084622334523413,-11.902337007365364,-17.317522741656507,-13.02170352348963,-16.28193052052265,-15.551216339300058,-18.145129455147462,-19.773557032872393,-15.054028293420156,-12.386862997836761,-13.454273955509278,-19.33593460156195,-11.39677889602173,-19.283794770786265,-19.570022044317696,-18.18579661842084,-18.076475558469905,-15.033276615961238,-15.618774327464058,-13.26808039679775,-13.694841833974902,-17.427787783198895,-19.224780963034583,-15.509031722377337,-14.772310185006896,-15.276571383045532,-14.257730428711442,-10.112952632497652,-18.8895107346129,-12.390857069895254,-19.052789596711037,-13.402654206171086,-17.606239818925776,-11.448710834968951,-11.061669664679819,-14.401323240137467,-12.45106579063902,-16.75529099060276,-15.170694218870846,-14.951131599346116,-11.915344585003176,-11.688019886803271,-19.362348922320095,-18.97260579901823,-17.632607121579248,-15.589419047870155,-19.388104045426562,-12.182065193223202,-18.848013142209403,-14.29524352853975,-15.17302366407977,-13.42560491595517,-19.590720329177707,-14.374496449100612,-17.001558828707232,-18.1644148460224,-17.23518705101326,-18.952439654957544,-19.543777531125844,-19.20525293414243,-10.208161424407855,-15.915666484377788,-17.139180907778737,-11.147240286130046,-13.619521842113837,-16.804635275926703,-13.988117398031575,-13.331177057503073,-13.174099450058083,-11.42858006164875,-11.54069492612173,-19.271009076557434,-14.616513641098184,-11.374691006179887,-13.141103153059978,-12.692237329215557,-15.969597736882374,-11.512376512550318,-13.224119385276316,-15.718922218454372,-15.146495913741644,-16.584658468486964,-10.19842213303271,-10.980355805668447,-10.600807088252724,-18.610149892570245,-18.9799470587165,-15.371511192698225,-14.981013242943703,-11.787711219681466,-17.658655407161895,-16.193714132760043,-16.767986090098514,-15.934380540659848,-11.02783402988292,-16.528761087413322,-19.395329305617352,-18.36001706121226,-19.7555424888092,-17.015188826183074,-13.7966039904535,-14.692703007443379,-15.598388388302226,-16.288308813409223,-10.303102772680578,-10.52755905154519,-12.409922192340783,-12.823563178549055,-10.076780785498558,-16.66195903271787,-15.590657528196793,-19.963096761524174,-12.33441443157748,-10.917892379063822,-19.343283626797614,-13.0414552029948,-15.56622623024939,-18.099316608668584,-14.111085997328063,-11.97326550535795,-14.093931790323193,-13.649378066290563,-14.401636490227666,-16.339303837725126,-12.561382157805385,-15.880871041279951,-19.69853600518181,-15.283696544427745,-13.644613695224905,-13.066957506757317,-10.393826906470085,-12.215907047935064,-19.847157339259805,-11.94102237774867,-14.9148922825012,-11.961028734285042,-10.36538064657929,-15.179034974184358,-10.002842410652411,-13.4691001765694,-19.535337032235685,-14.450615305204582,-18.629423137704247,-15.864894035713439,-14.757627363576699,-12.964231501175853,-18.487936377234515,-18.522111710826096,-16.49752251126084,-18.418701328731135,-15.467787351685145,-19.98965016071173,-13.865304202810655,-12.111958594565209,-15.514340171894549,-15.696190810228977,-16.58090668917772,-18.712577122725904,-15.938257144394445,-16.683786256675255,-17.030371732898153,-11.75187497887623,-18.395362057669548,-10.334269858101948,-10.39807249073715,-10.347257491024815,-18.545885941909162,-16.867504028346286,-19.704653193333773,-16.93820322286863,-11.338799281923391,-19.812221785604276,-13.544812255148758,-14.168245289566563,-17.854314472568966,-16.702657483287034,-18.082827268808213,-10.451758031528009,-14.95633164840159,-10.685189738616963,-14.004522270467172,-18.606951940943517,-15.44707122576985,-15.04769375347963,-13.910168583920555,-15.9448511661973,-10.230257055781207,-16.31432008951769,-14.012521253063433,-16.46051364892929,-14.053016637505799,-17.30914937670884,-16.757785951357768,-19.08080481459871,-11.686996141678101,-12.477160554524016,-15.552813277508173,-11.398098196933923,-11.04827383865887,-11.860453316064476,-10.935646440702714,-17.42169077383007,-19.678439974205915,-10.682909920906784,-11.964027578742717,-14.744097680060317,-11.477124585659965,-11.797336639307739,-14.752706824195075,-17.017554399633795,-13.19968089295102,-18.255930256917225,-19.826888976827547,-16.004201788117076,-15.982645788493857,-10.599311673683482,-16.597127236398553,-16.554432360331994,-14.398658157703313,-19.86868472165114,-17.874223707797782,-17.0814796095209,-11.855857245058544,-19.017731119905473],"b":[1.8779479378493058,1.610433195444666,0.2899575643877428,0.6414370385384482,2.0574511487859137,4.511593041492652,1.936483702752303,0.7924734001084821,3.5624657851132424,0.4041995579138602,0.9732556349965527,3.284463477565074,4.76869048124144,2.2978466905334494,0.30103936525468167,1.1348822239260292,0.038975062307864405,0.8619190656858855,0.29464275338485724,1.9339861824294358,1.083770313341098,3.326013765552421,0.8188753501903012,4.576577294329356,2.0105441198953935,1.142915296017737,2.7996736247985634,4.080718043884584,2.047321384947706,0.9042757112876221,4.048453778859573,3.729841955091363,2.1827471535147636,4.0958992093883415,3.927621847914705,0.09189229708033597,0.11405803325525876,3.2729004803933215,2.8823069430801693,4.600436120849968,3.702104644439279,2.7317269355905447,4.892848416505999,1.1496283235660865,1.3970164407640806,0.6516363116789947,1.401752876627591,4.361034164813365,2.7036475569076956,4.921534815128235,0.33363833462944803,3.004536978544693,3.2672141557485777,1.7353442777128558,1.7069276391053023,0.1430590734316417,1.7318032171136277,2.630996508760882,3.7661514681706443,4.1396522221324785,1.4014764714063,0.7282587418803865,2.7058570896712917,1.5883946181828446,1.6193026429187252,3.830144815028377,2.1063429923128476,0.9961062654242392,1.1278510604255287,3.762258662981125,1.5258788925842148,2.9225150993611937,0.003848557700818489,3.5893926863256076,2.7057812601647324,0.8278952245422566,4.622735410815839,0.7674100985025789,1.1184904489392244,4.2036191298606385,1.3447027533913702,3.266829762363961,0.6105184702140998,2.5233290683462584,0.016287174899918266,1.4729538794896546,3.2169058841676335,2.023340759993968,2.070946240398209,0.838534834664707,3.1954672917371942,3.347360069030676,3.523988012423799,3.931392906411657,2.867811137804238,2.825984307983834,3.889544523945192,2.3311720910978617,0.17985341491224105,0.7132033954540384,1.696009207184822,2.046605786402208,2.5487170595059325,2.056510385037135,0.13915150269015686,4.251636845257547,4.60019490621046,2.564688205405725,3.171930115429673,0.03358714723272871,2.1705951004341673,0.013966732009728089,4.1688283303628015,1.373433965717803,1.7930934684266397,2.7999531192239644,2.850698158592573,3.5462680017481683,3.3917092781032787,2.1426422065155073,3.2257414022676345,0.8844491889566963,2.1389187562573806,4.937082476508438,3.8406904930014694,2.331305343253953,0.4826540845435934,0.7747031323213849,1.0059267979330289,3.6646011415112714,3.5532136261927882,0.7348418610074148,0.23348085286941545,3.8469977582224435,3.6870695612674553,1.514282396355171,3.5361265858978506,1.5971606014204598,0.8292376944828816,0.330791804275925,1.1390643794319333,2.237849945161029,4.632212198164361,2.5735342701059127,1.3642894256249938,2.4807367250334753,4.453315478591968,3.565885210113157,2.985927456006867,1.9965490556625642,1.2940633863350448,0.6554878727326674,0.2622850884709049,0.8112299242472953,1.9705833169137998,0.4497851636548922,1.6083635832378385,1.3997309720403583,3.542625555123168,3.210824671312895,0.3271705171057926,1.7961443852871462,2.9726747095850268,1.6052046313817159,0.022285303308009485,3.135598943547373,3.3296335617758386,1.2721482840222664,0.5579498599717669,2.8838083576713047,1.4752854380899538,2.381696562967183,2.9343058555975277,3.8816231670298853,0.29682104907043594,4.803861139898126,4.460190164263775,4.314929063566037,2.399343903771981,4.796166615621641,2.4485564645761637,2.891855768242766,2.240058260944,1.9496744999770732,0.08633392367491055,0.3712354350317837,4.511597876221392,2.5887636980185746,3.1784677376385795,3.8228724772188327,0.6352492749235039,4.727551361834227,0.6862088993511128,4.75459297378605,4.744255520864443,3.1426548644888763,4.699303256359439,0.9876529477583229,0.6983844340838885,2.1221676442239366,0.7700852390272583,1.7399521865195466,3.6536427070998645,2.529648335121294,4.969911877916376,2.1185759686251995,2.5859906965683277,4.322069538434795,0.09086144589380174,1.423545758987813,0.22036041058960176,0.6971928285574236,3.284146758834442,3.254282837781124,4.606562763002124,2.7232918554602548,0.13471069880084507,1.513586424841894,3.3696535458616395,4.239815148819284,0.6683874078604324,0.5149419059309057,0.6526965772984206,0.7673699403509493,1.136853032522882,1.596447316590569,2.7424705718717712,0.021024890471323943,4.1865011526627125,3.5330831741489197,0.09972504006620087,1.229290829749775,4.195585147364346,2.7398099229040787,2.9493352555630437,4.2457163907046205,2.374754328160289,4.575600104446197,1.1177899228706545,0.10588088409156482,0.9156045117978473,3.094999372030843,4.720669043733519,3.142501632429575,4.819576700471106,2.318982956234039,4.963726357622234,3.229119258876546,0.4751768635148734,2.26530450734466,0.7331102389317057,0.7012900280478551,2.6986816153219517,2.976266140821954,0.44772656029345104,0.032174097939507984,3.0496290457615927,4.903254753327232,3.0920350087167003,2.308289808908305,1.938508683575575,1.612421537047164,0.7113264071560432,4.868789983317593,4.629515369309146,1.619771407943027,0.24698761184492213,2.1715144425215516,3.2671651569116733,2.492656582078091,4.536945409715791,4.8753219176354925,2.7424895035306296,1.6403343714523166,2.7869706927784765,2.8150697506737057,0.5713876363644865,2.3924537809026836,1.1675552651643983,4.052366335602736,2.726801047024263,1.815845971944945,0.7601826060432215,4.48781578900305,0.3064471283061543,0.909400782969122,4.731352642155086,4.939086943349796,1.8165879370559412,2.938811284890458,4.371149285677237,0.7859486609089239,1.2816942609128357,2.9525239561542236,1.659268807109372,2.9935133596194796,2.7024687323634167,0.3096781610422039,0.47553486131405975,3.2226691513298067,2.905805485342934,3.279055291422426,1.8664949081755466,3.8542183220688617,2.7040259674779534,1.7665445837627969,1.5611455977981281,0.07363111499866792,2.8470786067173726,4.631698539093554,1.8310715579019832,3.9765039503411748,1.5106688975203852,1.347489736428391,3.5996387484275747,3.6127937102530803,2.5272737938470033,4.947993175549875,2.6416501511539305,1.4143776192272584,3.532446811973724,2.057072857847845,4.736613138213435,3.2707995660803335,0.6701270761041456,1.3522945075307824,0.26037942647726964,1.7480381882479634,1.274924804853157,0.5045369085311568,4.883844899832238,1.967513594708934,0.4849970372389101,1.2909648854382327,1.1128190828085371,1.5342605721853386,3.852267113505045,3.073476994831954,4.812287462752975,1.21693410079316,2.686135185657512,3.051194711270476,4.666674743279038,1.4301015842178122,2.205504104561383,0.8170045134088866,3.7143264853597957,4.3167569200491,4.8057332353088045,2.871183556335918,2.2575032691635877,3.510228630733372,4.751337153999446,0.10561196346608237,3.6438712064737357,0.9942022000532802,3.1109039683088167,1.954901398658605,3.238861608846706,3.569672674051152,2.274872272901123,2.3630050700816962,1.2036851503942392,1.6651701379588013,2.352435609783241,1.0686215791944909,3.459672964744401,2.9113016706507002,4.313696044357806,1.4594176353352317,2.6577410615167087,3.073494125985853,4.9796158403064865,3.4061991033523786,0.3159106991644378,0.20347315339228844,0.2766346196933045,0.04238949815416615,1.3252522875051809,1.1090820278987734,2.5621914137754995,1.8304071724268234,4.315606074001378,3.410141125846878,2.6035700187229773,1.4697079188099738,3.465432439787036,2.9196652858464525,0.7527748244793853,2.0025526035641263,2.8933228311274863,1.536426350874105,1.6953557844381317,1.3004025566567945,1.1458440554918803,3.7914097373178812,1.698073780147794,3.8819403535835253,0.5350412593627529,1.072973909159538,2.746272553701127,3.9448498213768213,3.2842881991153905,1.7454724849938108,0.9860619544998472,3.348869816677741,0.25169686894572774,2.914174185655333,3.2566385164730094,3.953669356715186,1.9901838695476604,4.246835929569409,0.29980390780733557,4.5611983404404155,0.39777623580590227,1.2957028893071942,3.7259162866019446,3.61546874573202,0.6449506954528184,4.763594049636996,2.06171507017314,3.08038002660291,4.077631565546577,0.5904721076944841,1.434946240091144,1.7408960251213257,1.7165799836215423,1.6026580318712158,0.7063580272423609,2.9341925800558375,0.2091657445926154,3.619194730875747,4.831802824108344,3.923549578398813,4.007781513410581,4.311050587369837,2.927767499258996,3.2889609537907782,1.914424019591452,2.7274855658284625,2.540838267262643,2.898016866167249,0.09936505842978782,3.217482973562784,0.42542271999902903,3.0735715574367473,2.1174799070650465,3.915993115303346,1.4522409433307648,4.82861205435734,0.4737194862973715,3.6149000804712195,3.1868447888683917,0.8036231269174332,2.6815937305604876,0.9298341335126548,1.938551880580358,4.970530807498362,1.6758140260156362,2.7626732032251953,0.5046921424081452,4.83370069065471,4.808943910831981,2.5217107815559645,2.689491153027509,1.4646687540280123,0.3901336720459081,1.365266864954091,2.2608729728058496,2.1867260064531893,4.582435186331427,4.398589089443121,1.0893869729643701,4.2846534719835185,3.4682563129102215,2.6460532863551487,1.3745090996851983,2.0042280561666836,0.6229071919530982,1.1000614161974187,1.351354970459776,0.41743683179658486,4.3181515974699884,4.96884168535488,2.120037377796762,2.0545883417770883,0.3064662633828441,4.348095707676696,2.4507445789006543,3.0457851886861045,3.6540735419777928,2.452050818313464,2.5441547868086056,0.1343872199514129,4.5397719044164955,3.2528497019555527,3.815607705136148,3.6605562093514656,2.1649296681198695,1.8516405336944952,3.5457125639760765,1.0522624564686378,1.538880620213251,2.236887797113635,3.402267795531918,2.5916928358865587,0.7981237339315184,4.544885416566062,3.7278960585731946,2.183875782330257,4.807741485984481,0.29787958435477546,2.9287925349382258,0.10870729141827296,3.7424853015770463,0.9726695424650533,4.091932446168011,3.6383091781801813,2.980261710045321,2.4386972936511295,4.067484795143508,2.1198475722376653,4.151858622065095,1.864332087710574,0.6352862275464122,2.9223310513446377,0.5674434801605577,0.4660399679589633,3.0897218731327736,1.461446775975157,1.9221381506889934,3.2330569776142615,1.1923459352792154,1.0495777972260034,4.6634851939947115,4.933107000813425,0.052977610301551126,2.1800479475222314,2.307452122137436,1.2407332221001632,2.8203992540591107,4.454191555942307,2.7141537146798553,2.8437102391755142,1.3192726408562938,1.4763936854634274,4.132790395773248,1.0295997189989081,2.791611540925204,3.706721718777408,4.718758690606469,1.5315988908780465,1.004529392993706,2.0538532405220344,4.6654840754212925,1.888646157732965,2.744701062925088,0.8357902022336394,0.6038435926626173,1.8814405291160385,4.507113250652165,4.703599731224739,4.477083996443846,2.319254884024373,0.6107106015321739,2.700081952875655,4.489104962495985,3.946897167808323,2.3296373557965886,0.6881525725815485,0.7877159278405155,4.3203606229948885,0.6887003278297688,2.2614021522164673,2.4016488944755587,4.817021328863333,1.6474300156415367,3.9924470682018454,3.872235432956602,3.9311316612401646,1.3701690345193185,3.935370098921952,3.7219494270286804,1.2752442138922426,2.704431227809667,0.5808838600855681,1.5057046656514605,0.0520455445797352,1.503862061247827,3.18496064716339,4.032784988499474,4.772180236898729,0.519836955764732,1.934307767448331,3.111156502955106,4.091642269221626,1.593734831310013,1.866279352032476,2.068032276415704,1.991332521516409,4.828802790078264,2.1671616917728596,0.16601201111351438,2.142277099128884,0.7816627596512493,4.759989252872481,4.299363415292451,4.7971106976385,1.6058432822049085,3.300843257211936,3.647858683904426,1.3365050840454817,1.988483834621907,4.120877854417592,2.5291580184579465,3.627464329299844,1.8072884742483464,3.1522187253491674,2.122111359165282,3.2073018497819095,2.4714700838770276,0.3375349939852923,3.4580684951872733,0.016523085383232106,0.6185961793644845,3.349485296407085,4.3249851773097925,3.6105487166974095,4.585226785108726,1.0329271018799813,1.9778005066888527,0.09473175991209892,4.0449506900396965,2.2182318351381793,3.368802203832424,4.012268554371725,0.7356630092899119,3.3969214471091878,2.0095254330152934,1.5738990331357283,0.8471541026772722,3.2782835572878954,4.618872758629333,0.3795586097794057,4.427532592203302,1.1170787810525873,3.90221804924749,0.34758755607169234,3.6544967014079885,0.4025455591391025,3.8803907944973783,1.1107503721350909,0.4407570880878309,2.3260426877196902,3.05190718010786,2.791937077578387,3.450924561241986,0.5642779931181297,1.9729435074827784,4.282760897806867,4.261856124920236,0.67020857650256,2.0039310798361463,0.987039739820087,2.664843028900028,3.712166219541184,4.8925178224805705,1.2904395838347549,4.522589426443888,1.7777314086591856,4.904781983835573,1.527940951736808,4.7244063595928605,1.1109112151490985,2.5584653242100064,1.6125328861385868,3.304138301430992,0.8023176301542934,1.1704907583987456,0.1553598271187906,0.5611962163086293,1.1604572461183105,3.67527857999997,0.42546333085571875,4.016754162310384,1.3201293938534253,1.6532509786325433,3.129924522346018,3.563796617868503,2.17244097888865,3.7948270831506683,4.661610433324239,1.6411582585741025,0.5811195424647675,4.0411028943732745,2.7232523951258147,4.738605165419225,1.9330087655841743,3.3968978044874842,0.7375763157798176,1.8615901583714756,0.9424060983604698,2.989774519374848,3.5000529060737895,4.145960986590271,4.646163709115515,4.702061519844804,1.0934330245693347,2.8401989504293135,1.3779340439595034,4.644645354127962,1.2911019255682221,3.4027113312000115,2.0150489699993743,3.5812863478792134,2.475939585500573,0.9633854934467967,0.4035960911684955,1.4163918924058472,1.6147659830270944,0.0413508938646745,1.0375477731116223,1.9005620295754944,3.325137102685616,0.6038895378422771,0.46515382858729803,2.5052108235827433,3.4752812495545737,2.293942200233743,1.2038157238454272,2.1112205636374815,2.7885082494300493,2.864149026954573,3.567358863997947,1.8721601296477586,3.70612333982319,3.8760682122337977,1.1303887585516004,2.278718069738168,4.360315772048262,4.445473663489401,2.3686366272192148,0.3819390530730604,1.7468281768074456,3.1668057850240237,3.6740484411008465,1.8878654973786313,4.145432664547505,2.4504201198076436,3.7118983784078976,1.7576315340822257,4.219228554281078,4.339299143566652,3.316326961504419,3.658733824014635,1.4160781029681213,1.600068467050425,4.757485097206083,3.4206542124306525,2.5390043305607035,1.8863526271838815,1.6077099523336436,3.1669132561748703,3.228410070017016,2.620471632592718,0.09010731932400429,2.4174371428856767,0.6915821822983304,3.6792054950276576,2.4837157071172067,3.1479166587291365,3.0785951909351885,2.600572956366689,4.915742897141491,4.135643565152167,1.928793762823534,2.661470935526445,0.9981345269103392,3.4479571465337844,4.806269999492244,0.32938330121035087,2.126714041104205,2.9686718606969373,3.851119068344906,0.8652982846708968,2.436477455766932,1.5092060457676537,4.610585916400995,4.1411241589359635,2.3153132362572126,0.7108507987750801,4.790952103510518,2.160276916342866,1.8441954319956921,0.11680768881851877,4.776606335682192,2.6876229249970662,2.460328797196971,0.842747123803832,3.8765638053087703,4.563219874312825,4.6681450627575245,4.963505816576612,3.6924401859087297,3.622778896318942,2.4332129767548216,2.1312842445683264,3.8502721553038963,0.7181624651066054,4.266397176855471,1.1588114247805403,4.186010555134921,1.3287821680081768,2.985932916929145,4.2243799081045585,1.276481899943539,4.103575956238722,3.7255922942556086,4.761398699231938,1.080673969185385,4.183654354085348,2.0734124088608006,4.761135782217809,3.103614328224814,2.2953365727440254,1.752002820475137,3.175331896588469,3.600364628857026,2.558324025956964,2.3846642062063417,3.1110363855050926,0.2732776370628942,3.773533562535578,0.21543705788566347,2.002167598324288,3.3201843977425263,4.022834310957631,3.426315692253532,3.200601938795835,3.617685428343843,0.49971692432533965,0.283350897145086,3.940672874787199,4.411126263300003,0.6333557189595185,3.410063815595729,2.517644820483207,2.316286214364066,4.225481090944334,1.3772595595091364,1.8921840997127293,1.6939233229428041,3.939345814580456,0.9130110480217357,0.24978181946112232,0.04159459653302777,2.4572423637751784,4.912116655708068,3.964689260773583,1.9959417518019629,3.4816479561630285,2.4056403692414774,2.3022116875560616,2.8215160462122824,3.564822130537608,4.176293016523561,1.0618417297423222,4.828190467680406,0.4316261923719611,1.2194729003403004,2.845137901743471,4.53482641331323,4.099457573148698,4.1614352658772615,1.2600986205362608,0.5044793727744235,0.011902676563937398,0.33927335854210483,2.068737525100569,4.608106629235427,4.243981010652665,2.1292003226099263,3.1457747610198092,1.9796320651985033,1.2750113652107642,4.476790641231091,0.7748680244921691,4.140496203540437,3.0423892050323396,1.070181111946621,0.9534235171578831,2.401221862995011,0.794733663617494,0.9105276775528159,4.377068602059565,3.9302609376022324,2.022036418119707,4.443006137372779,0.3238349071568536,2.475600371193769,0.25988777723395917,4.1038981530312,3.428910256108162,0.48131878752282864,2.286217874553065,0.15802362607577503,0.19423990588815943,0.43156953898114914,4.109676430782586,3.821840218408463,4.403001943671059,4.389617682934041,2.7237305261466425,2.2526549878711535,4.073348998611714,1.4332163263549014,2.083979243200803,2.143437174626033,2.2581221447935618,0.8149677159857971,2.473431858416543,3.713887077409004,0.05533108962018196,0.40226422627298364,1.7671830264707156,2.2635051148640786,1.5119872680604352,2.774186818897917,1.3943945311555217,3.3379738209122856,1.1812613497541191,3.3236973217637944,4.854090219298227,3.511508057752285,0.08326790543730866,1.4410968572896876,1.6356126934620219,2.8480269562973426,2.991362569590408,4.052516738719641,3.0751595992732583,3.1622354591120585,3.9208965807618834,3.7585476516245353,4.394831766003912,4.183422498405597,0.7624704162556273,0.03931211700260673,4.066273798408764,2.2085627595364086,1.865082873981917,2.1601733739485196,4.811166963377385,4.07607937999368,3.5875531347087417,1.5413241869371541,0.06625839278835532,3.814042308957606,4.71571653245853,4.225701905211187,2.1833932691874214,4.894668048013051,3.7550995251796095,0.23895933211315112,1.4403165036280074,0.19115356995846433,3.5646750796735907,1.8084444990391524,3.1825209838204414,1.4660399296301296,0.13777600134330048,1.4245313310668262,3.601215221353349,1.2254618087166247,3.8117870940239684,2.92597082870681,4.887824469192765,2.9815517876379882,1.9742158489920503,2.164123315234506,3.106174046383993,2.1132547704149673,3.7553426792146127,4.955362809152438,2.8051546062772403,0.8609700847311019,2.4009745044232442,3.854554104594925,1.4263528555494098,1.8589761364383828,3.4620516328777695,2.1738689395458364,1.0045046282079828,3.503030463840018,1.1283582379097457,2.098272365352283,3.270358176249885,2.4587966847494203,3.89489383157541,0.3105067011244089],"mu":[2.2167075286418503,1.0848224305763488,0.5802370923977618,1.9025438708377407,3.047857370635345,6.513689673287761,8.802882677941044,0.5885446408096628,5.088165820783255,3.156707784685673,9.384536038325153,2.983809862575184,5.997428520227423,0.8049599269827734,2.350080747869907,0.4021120019009694,1.9218787329318965,6.457798658025662,1.8614191573055305,1.2505525872219692,5.27074752296377,5.173525565828991,5.099279875247773,0.8923602414059073,8.619195635324626,4.297825298711233,5.189598922894705,9.393220320394516,2.411736528280697,3.2953809241800025,5.499686250739995,6.780617248783745,1.1223666032864088,2.3731598999626025,6.580442389373835,4.545427961112567,4.4883199510469485,6.823714253933324,7.652134434738573,9.924024280609093,7.569730460210695,5.962836519423518,0.2704083116382128,8.464699542685263,3.050721690128866,6.641830260370087,2.053132820282173,5.32706005753141,3.8221611922219645,6.946640741886869,9.623360210633049,3.1917385141857646,0.8141651241324244,0.16275785320875258,0.41910938596403824,8.470685063073294,0.4209720222584523,1.1932453335180249,1.4357656730837909,1.1151319461398934,5.272758699997439,6.0681744509304885,2.4604937065801336,4.5409096223880585,2.313055707070293,4.7725768696961275,9.765596892109434,2.165662248323008,0.28279993022218175,5.60415284691423,3.619063578004569,1.557892674917063,6.672258605553822,7.437520600524117,2.9683336338079713,4.537948670874514,2.3957559870734624,9.45882272714934,3.69649469129973,8.479889532557428,3.1978673297776106,7.471989157819965,3.3254359957235557,0.15855442188319468,3.6111663116809467,2.3313004633257073,3.498237615753581,4.149135819952905,2.166615690942728,7.668423243488565,7.245203648667267,4.483580492558648,2.774060092268378,7.261143012643936,2.3087427511234715,2.548506419289287,4.156667505741325,1.8244518691121603,5.360504465776259,6.570657838395673,4.236025896189675,2.3776417253803483,6.264996397394111,8.217433740894336,6.575754681567101,4.675557870336813,1.1757683741775726,6.912625879360206,5.626734214072899,3.7845013718256926,2.782769714554918,1.6706717590612197,2.1544215575311854,5.924237143643236,3.4712721166369076,3.776638493932307,6.6367401248769315,3.2895705643013295,4.680369028552471,8.037640227918368,9.291337013883494,4.351485455141402,2.1442462646302385,4.21893605566622,7.672363648874261,0.5046103916657629,2.956843901341233,2.5516284330876893,1.9496008210037452,9.670971646405214,0.1760540167247493,8.269078716868902,3.722666452844645,1.7191994453848825,8.465194368826928,6.476317726234326,0.06658499680630037,0.9797572202706273,2.3988917822646005,9.535399479605475,4.199559103856563,6.591761146905036,2.9637755052991244,5.0258421243823665,8.439825632084224,5.124891651218427,4.233589411179479,9.62698978142258,8.620766778077966,5.81556858947952,7.924237735455155,9.71761607581186,0.034498267898757096,1.6420713780271012,1.950147567397924,7.682416674388981,8.955849919194437,0.614918250138361,2.366279773344926,7.448938668213929,7.397597773389486,4.394839197376863,7.329956430260845,1.8458132482445966,0.34194855737553764,2.4223471479177516,9.112843585075169,0.9225147124193311,1.658330394927614,3.34170428124968,4.031321694677619,0.09811876826131494,6.464515439376193,5.54059047768424,3.9912971805625985,8.709651742885132,1.0137545731058206,9.506024821287856,2.195233384001609,3.4058452197536715,5.606721744814928,5.488678686055827,4.280256101425691,5.673516140718339,2.458698050210746,3.666472483772343,7.936563187801314,9.478292497942382,3.5542633239537724,0.5790455336397149,0.04970012742509855,6.673390468171929,8.407799156428993,6.704202416205756,6.280530278150065,5.6367902600639574,5.674712169276344,8.843890156587399,8.061331876332922,5.664942778971769,8.916411363726853,5.55762194918646,0.7261857712212083,0.08800390730374863,6.884503194039211,9.88791515695972,0.12397795342874218,2.387020154178876,4.149378496266046,4.093007805309901,7.646329473240565,5.7103035269259195,6.163218710254517,6.403937472982424,7.048160282200733,1.2268006926108521,4.971546224551093,5.279808409683255,0.7402469639430742,4.644538837877823,3.498465363630725,3.718758049492934,1.745707859308132,8.465145327234664,4.469837494117845,1.524207507799491,2.958002588066857,9.831606576476728,4.497990498460154,3.6855324892993835,7.590662097407308,4.731893130754637,5.276839510870904,5.973456079254824,2.871718002478234,1.6911810594460586,3.3198598151949366,3.98195107815859,7.908259712445966,5.377358671667745,3.985420581071546,3.515383609121625,2.057251875459276,4.6789429163452585,8.635603729183217,3.968279050248673,2.908121858018975,4.599975695053001,7.657108491402296,7.419353802964146,6.737469654769259,0.1859674277305179,7.052316678556529,3.591712845939603,1.7663319888752227,5.204252723244014,3.0367290148230275,8.394521519957667,9.890678000708435,2.825142089103534,0.8970573244255653,7.145018308572522,0.020540294074182786,5.968633306468936,9.287123150426574,0.01431268857420731,7.870417456465075,5.018940690395808,2.3389248443076083,1.6814363453500247,3.0315329763218957,2.0059627333935337,0.5964396519529958,7.8423406372808895,2.0583178393150137,0.46811333227446683,8.233820836736482,7.735612174333477,4.2485314677984825,0.3460582455276162,6.68248290608545,5.414497495876967,0.9328494292772649,9.094274956478872,9.286370451614296,5.679776250582909,6.4652999418022645,9.132579557752576,8.637811365009242,7.4915273534842575,0.8567805862089473,4.344924544158073,8.45964800087929,7.097299706983011,6.943150062725463,3.7558755219282514,1.0163859364672478,2.825548696298197,1.1657919360882518,2.524306321452092,9.922467526122208,1.1464624172550653,5.145337395488905,8.396514474515511,3.548410527698047,3.9389005574616998,0.6619136147285531,9.771349728032522,7.631496872930386,9.257504235678354,7.679181973314515,5.986907972141227,1.96773886325184,4.502070863375716,9.680904685011004,3.7217383913611046,5.797361736731563,7.09387551731499,9.140076789150424,0.5527375952772817,7.264489030220851,4.4006325173801875,1.9682033612229355,4.057740825684231,9.815023289488394,7.188591323293574,8.337708467832828,9.868669551688967,2.7700167152239152,7.25630379016418,5.339228438605776,6.1843648284633534,9.707001395941234,5.701328717995189,8.367207387577844,5.090083363630374,8.14036194744768,2.392867769776985,2.0788665833005227,0.1100961157412339,6.386091607958075,2.899522760564903,8.803223510265836,4.749620329760318,7.859473458227542,9.430186962103587,2.0771012687386325,6.928410702395071,5.813895393780371,7.9350749418154525,3.846511605278542,6.220820843731536,9.223595930734277,6.454839255825167,9.035020551888477,0.686595878342604,4.846428756667538,3.4616069147576933,4.525144448080409,9.734916711581441,6.338185527270892,5.587411005156227,9.495446277138697,4.444229044757339,2.495414089441186,7.0071590572715525,5.061918090112474,8.177323858485149,2.1434731396873996,0.028773993891269,0.12483379291009955,8.567109326818574,6.635467716117636,7.762105515921915,6.36127022359701,5.681772873603858,4.4889412480996675,5.241220778509607,8.753081528928245,0.09856609864231425,0.05959055084844289,0.33753339482976763,2.4793363219807607,9.578087318398241,5.341574433913438,9.439381186525374,0.8155077313988102,2.905412251102566,0.2183949083658221,1.9154357590691018,5.024243392180501,7.659529582352982,5.519502426329699,6.364389427617776,9.203315355630226,3.7706861086087606,9.888060920717747,3.4677346252504138,3.335983519200829,6.162870335553892,5.8927135526659224,7.2304843120761735,6.517090197847053,5.876861025582394,5.068774981884854,1.2973807867534815,4.496199298320573,7.483388826267994,8.924783615058622,3.835830365744337,2.8530172308712953,3.6299867140439557,1.7295232207677103,3.271111714516637,9.888028482143909,6.145936902709033,0.18800483340870588,8.440096016194634,0.019019761738319207,2.664097310929676,3.2512978233589562,5.3312430488079965,6.587694749016371,6.02987705439056,9.701323108490323,6.2939583782922615,6.049543266936124,7.9888464222065725,1.3895443243687278,1.3535201522852502,6.7015355276217985,7.81471598042809,7.6453826214208505,3.501370729258546,7.1822103596032,7.497400840096247,8.54468465725829,4.803042153213588,1.1364499638864833,2.4693771479761173,8.937225311254096,8.159588097688664,7.324485303773565,6.096045993959754,4.1665644638190935,0.39687073746522916,9.031302967101649,6.407509567808503,9.878014441133104,2.9404331819896545,4.318058572957089,4.675220532178419,5.205746280196828,6.043402038753949,4.263205587079715,5.006332490062528,9.612234178319557,8.93123906253068,2.295260016949925,3.3673939459528324,4.00503535456372,9.504359273548626,4.188278760120232,2.7042747238733456,2.044021057040164,5.730534156416292,4.903791459642736,0.2918037000521734,5.769918134925551,4.327042592259447,0.616648387860208,8.418403407568801,1.899154826072662,2.556532414385906,4.386144698035714,1.4987291221836818,9.918896369283301,4.685072837651729,5.379635057753724,7.740198824918593,7.96245345773352,8.404778833818119,3.420959952199898,7.183707055300681,9.428049823494494,6.686480623687309,4.044267630427168,3.82085154793421,7.01083446765967,5.931022988710952,0.6397069581790427,3.266518335331985,6.263621810271198,8.887687371950289,8.412133645320797,2.4586402071368685,2.1584973335078095,8.783191310290508,2.3105666891775822,8.804544134638235,4.0898882019408545,1.9867520367491398,2.1256828939326367,9.012215872992371,0.6999829609626596,7.7320229516357415,1.0365180190801992,2.4268961211427853,2.6949712864735464,6.656893371141541,9.837349902728565,4.705088852592505,3.609650821707424,8.515972807262962,4.981907034493041,8.23592726251177,9.179059784703327,4.415297017084385,5.309307988952339,5.42936670682246,5.704943580074846,3.8302341064208156,5.444778693567683,4.278231365094611,3.5152906442612775,1.4380421939977106,1.223398782468117,2.9285369860596777,7.776643294829427,2.0123440418574168,2.971739383866707,5.673676559393968,2.7651547050710557,9.194222850516203,7.899783320583806,8.368677868094405,5.845737315385094,9.87330854574269,4.66172282960065,1.48885053689779,6.28134116420886,0.9930857684749439,9.887732196562741,2.0392577048386573,5.790381673393911,1.664035520746736,6.657017357926254,4.336341689337447,6.390645581654882,0.08695321369055042,8.501177629034997,8.07309994052024,6.9778814800528055,2.444916994847892,4.562921218833509,5.327641129033049,3.8247524968199698,1.8157369354452335,6.612155770602097,2.656619917533003,9.483942270036835,0.7764909006734033,8.401141884236232,1.5685166353652313,3.9792379928777843,3.0995206179051404,8.03710136692212,3.6286736605537717,5.859562775307108,7.270026726378234,5.422888248320101,9.001857424882573,8.09148775883065,8.765236540638048,2.386692164643651,9.602324735003817,4.734883789726345,1.0357095203823752,6.730980177504762,5.540982881322172,6.549698176198511,3.069864771219857,5.622891647185309,8.116684507620741,8.149917206850919,7.1137891430241424,3.0912285450923394,8.904136805115808,1.924303771608018,5.903387868552956,6.351066237092016,9.673806764061188,4.400186390923723,6.468648121115148,2.2901045702393485,7.304138206230171,5.615915592307714,9.118782810628225,9.348727780093625,1.3659439358995629,6.469813364950103,2.4468913117056923,8.35395706798572,2.455880512952655,2.0695952781342486,5.9086185838955885,9.723280139469692,4.675769759132253,9.566333561012684,7.842083432110993,8.833063591868743,0.5079542296847905,5.472261591317529,9.289205947820596,8.815753979947065,3.698725070247786,1.390743885504444,6.056228297197761,0.1772334029337741,4.5310556881356145,5.70597272380631,8.804366671597359,3.875577932363743,7.285145764669634,4.41881358619808,3.9399350577719083,9.264465837911153,8.056393143295157,0.7632663846698562,3.492249286187874,1.9735118346570513,3.475287738687829,7.355150352639392,0.5326984816342262,6.472450750352941,3.7961260897819638,9.19142242824186,2.693158369828803,7.100362154287505,6.564934723285091,3.572111995541396,7.641648129790076,8.342205238983954,4.469065029292569,2.8863736813567042,7.22192991153809,2.2371084040238065,2.4657362544077666,8.335923751182293,4.50459707304393,2.298324527249267,7.181771443738483,2.700447738268681,2.1259877927416904,1.9804891223242316,1.2956998507106232,6.484811939371459,1.1020491417232958,8.562144485534514,1.634381547012509,1.7994970596073312,4.394136051753215,7.995388444561106,6.939870238225902,2.4104270930958327,2.093144534685183,8.284202972877303,2.0668272585651404,1.7243512179597942,6.151103140202943,8.424961211489341,9.180649654721835,7.790110278459517,7.35922669621889,9.842805515313692,8.763195765280802,9.190165804517683,4.369783262015674,0.21611611232399408,4.729806151971935,0.6948089128659829,3.1200272233024373,3.893508328819042,7.8976161498062325,6.8750144567622495,6.731737329018788,7.490222593304006,9.349639429813703,0.472091314798877,8.031587894812567,7.5352772679274445,2.72481646509392,3.7512426221449235,6.223887855230965,7.995817024855825,0.02726055097424851,1.412601058055034,3.454756870621851,2.657687604126424,5.41503308737767,4.251475754512071,2.316349894844132,6.9337530257473485,7.801742435475525,9.472093383764404,1.4476101336409974,9.09486802042857,9.097647957552283,4.642261003996717,1.382144006244792,4.890671011262572,3.8881093069847816,6.3857286149783565,8.3872076198623,6.4730099959326886,0.7313733725934712,4.039408550108687,9.787448171683923,4.518953703408741,4.694293530388678,9.162178708367573,3.8693653332680844,8.19187250165106,4.3229837284026225,7.446145360331249,2.287983239462281,0.15375411685922824,4.3325109986268355,3.39755456108487,8.454311248617707,6.7750305955465,7.219072921273318,5.928873465839399,9.77124908639982,1.7118413178955194,5.007872902627193,5.760904085693241,8.24184413562492,8.511454179157907,5.1725671310236425,8.377757974148112,8.302033373017451,4.429417473544987,8.845953100500964,9.160156013299762,7.244726448135117,9.232994913226253,6.513265259456926,1.1363329635058927,9.405027204828,3.391282911814253,4.476693701172851,7.7611270344217065,1.5264856748494382,0.7135267126480849,7.029257504922137,5.701207097513176,7.042331679176117,0.4654321783110049,3.0060752467085106,2.8747475193496275,1.3431116937811538,3.008619252769087,1.5271558510134886,2.6400322575692314,3.0549847361403937,1.2405314323299255,4.61960973922944,2.1217835886309877,5.108863632042557,3.0647306304550015,4.155656563509993,8.950239375382449,3.799405625865191,7.677964893258333,0.7802013830897381,7.904231648358772,2.891803234036774,8.069553072708846,2.116464568161478,0.841437725626073,1.8739261927574313,1.6961401304808477,8.445993127164078,0.4690842209384716,7.334494090898154,1.9548564361761733,5.185942912183328,9.681552323159448,4.455039419728111,6.4524627069754175,6.912683137795968,4.850688852909961,9.710164736115129,4.372126536986265,4.8820341175367705,4.874428457517094,4.859877599547156,5.548556024989841,1.6565495027852561,9.40497025620603,6.15526228027913,0.1463163268537926,4.658474904238849,8.61486921430066,4.094134636936834,2.5082240527990485,7.462947327676401,3.205786000065014,2.7890921255607415,0.4585474024621172,9.784536010531106,0.5665141959623132,6.300782773682274,1.5241178066598282,1.9018339678504326,7.948910258864636,3.6075176207143778,9.920298781873962,7.783043990443057,8.69618655659554,8.962408848957327,0.9888031339798076,8.001622325982362,6.315708426901843,0.35632020620646854,6.628038227117536,6.380358064108151,5.2652890007543895,0.494583564675537,7.920983339616956,1.3774270094472119,7.5473164271420545,9.844570790217677,3.000092377437651,7.208387734505655,6.674239373046937,5.15714925140061,1.7183500666877394,8.875228242630133,2.126216718395404,8.094088005406395,0.6871153901833127,4.117294069365465,3.4285978487237156,1.0121245093334363,0.2770265044007836,2.713971873322334,0.2769983968924894,7.863828857735893,2.7552794811223102,3.0277161404104946,6.480009950188421,5.076012992853696,8.40661619740079,2.7160154985369056,5.095413214949012,5.012675021370407,9.267078298154011,9.39488653925362,3.3870679774453594,6.970236923189881,2.751562332960358,5.961618906666435,5.606532052261408,3.707813576597876,2.345649631515092,0.42225782126572575,3.7390578869156688,2.952430829323278,9.229229810640259,5.826502814889478,4.586627348667134,9.926330841431884,1.0521202614742808,9.244835237671944,8.149245470251156,6.718503832225531,4.275133675091993,5.803860579605851,2.3071064390452944,6.30815172978429,5.396589498837036,0.4507084470541223,3.8814339082694738,4.305910181476822,8.956869151672711,9.684659314577559,1.873490467765806,1.174557629442392,9.021967383371736,1.5081454461595367,4.66553641958019,6.945649043107673,4.933820217318869,3.2547840062625655,1.705299147671837,5.6422387035152965,4.070235213777336,5.900220998908834,2.5312179545394864,5.736024306410403,8.191254252752422,6.709751302505471,6.533875972905303,4.8942212505531195,2.5752493947605215,3.6571503924103688,6.815187266878642,2.3637923324944343,5.338000168939194,5.502865185750354,1.5626776647551988,2.4301724183026585,7.318696969349321,9.111811454936028,4.675780545240533,1.5503400146706037,8.934595777375385,3.0730611845861455,9.663961950719207,4.511175294415237,1.860258123504439,5.21729644755089,3.19498693563419,2.824877975913793,5.527335785423482,3.7714868159372705,4.329179153891349,1.6011453310579071,9.720503893779648,3.1004459178983668,4.432840113966876,7.709334592556316,0.27610892104279916,4.869831467399955,2.3985232119754674,5.042177960316918,8.20391265866537,9.568500477429065,4.430107557718623,8.63869237266048,6.669829561197638,0.9410933395995347,5.368613392290655,2.410098426059808,6.279493322467708,5.199549113917492,9.223420586448878,2.3188927890652433,6.829211815686149,1.814646974987304,3.225230520325748,4.112632182690601,3.738030399004515,5.312962686707056,8.480946175076017,7.256865881247368,6.013293004346563,7.595237959774639,3.2660191042351383,1.7803774916454307,0.33662669404038725,4.400247790591727,0.806214945410122,9.18729604399985,3.360711996291106,1.002242757339673,2.381270440309986,6.5461902999703,7.435329764624308,5.271491581604943,9.256030085420823,7.850823861575682,3.0530757764324257,0.3719210349373081,0.7786934015714775,4.9543290673106855,8.957595869560402,5.650606507947313,1.2340289600152188,7.5506248109763945,8.239750562817123,5.508633595870949,0.11155212470602027,0.9942639578726897,4.483455025431812,4.53894150083622,3.9118151041400617,5.904434376052647,7.033048159788262,1.1258769455087303,6.490030833033764,8.018267118127461,9.394625817749239,3.7009064188335627,3.2191088718365513,2.393803541232955,9.795718823813163,2.4724428326067427]}

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

tape( 'if provided a finite `mu` and `b`, the function returns a function which returns `-Infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `mu` and `b`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `b`, the created function always returns `NaN`', function test( t ) {
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
		logpdf = factory( mu[i], b[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var logpdf;
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
		logpdf = factory( mu[i], b[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large variance (large `b`)', function test( t ) {
	var expected;
	var logpdf;
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
		logpdf = factory( mu[i], b[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/logpdf/test/test.factory.js")
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/logpdf/test/test.js")
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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `b`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `b`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a nonpositive `b`, the function returns `NaN`', function test( t ) {
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
		y = logpdf( x[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
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
		y = logpdf( x[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large variance (large `b` )', function test( t ) {
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
		y = logpdf( x[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/logpdf/test/test.logpdf.js")
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
