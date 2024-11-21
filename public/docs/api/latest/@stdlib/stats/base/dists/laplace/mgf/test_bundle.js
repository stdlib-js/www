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

},{"@stdlib/utils/native-class":156}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":156}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":156}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":156}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":98}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":79}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":102,"@stdlib/number/float64/base/get-high-word":106,"@stdlib/number/float64/base/to-words":118}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":78,"@stdlib/math/base/special/ldexp":81}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":75,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/trunc":96}],78:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/copysign":73,"@stdlib/number/float64/base/exponent":100,"@stdlib/number/float64/base/from-words":102,"@stdlib/number/float64/base/normalize":109,"@stdlib/number/float64/base/to-words":118}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":86}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":87,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/number/float64/base/get-high-word":106,"@stdlib/number/float64/base/set-high-word":112,"@stdlib/number/float64/base/set-low-word":114}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":89,"@stdlib/number/float64/base/set-low-word":114}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":84,"./logx.js":85,"./pow2.js":90,"./x_is_zero.js":91,"./y_is_huge.js":92,"./y_is_infinite.js":93,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-integer":63,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/assert/is-odd":67,"@stdlib/math/base/special/abs":69,"@stdlib/math/base/special/sqrt":94,"@stdlib/number/float64/base/set-low-word":114,"@stdlib/number/float64/base/to-words":118,"@stdlib/number/uint32/base/to-int32":121}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"./polyval_p.js":88,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-significand-mask":47,"@stdlib/constants/float64/ln-two":48,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/math/base/special/ldexp":81,"@stdlib/number/float64/base/get-high-word":106,"@stdlib/number/float64/base/set-high-word":112,"@stdlib/number/float64/base/set-low-word":114,"@stdlib/number/uint32/base/to-int32":121}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-odd":67,"@stdlib/math/base/special/copysign":73}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/number/float64/base/get-high-word":106}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/special/abs":69}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":71,"@stdlib/math/base/special/floor":79}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":106}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":104}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":103,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":105,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":108,"./main.js":110,"@stdlib/utils/define-nonenumerable-read-only-property":149}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":108}],111:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":105}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":111,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":34}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":115,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":119,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":117,"./main.js":120,"@stdlib/utils/define-nonenumerable-read-only-property":149}],119:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":103}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":117}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) of a Laplace (double exponential) distribution with location parameter `mu` and scale parameter `b`.
*
* @param {number} mu - mean
* @param {NonNegativeNumber} b - scale parameter
* @returns {Function} MGF
*
* @example
* var mgf = factory( 4.0, 2.0 );
*
* var y = mgf( 0.2 );
* // returns ~2.649
*
* y = mgf( 0.4 );
* // returns ~13.758
*/
function factory( mu, b ) {
	if ( isnan( mu ) || isnan( b ) || b <= 0.0 ) {
		return constantFunction( NaN );
	}
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) for a Laplace (double exponential) distribution.
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
		var bt;
		if ( abs( t ) >= 1.0/b ) {
			return NaN;
		}
		bt = b * t;
		return exp( mu * t ) / ( 1.0 - pow( bt, 2.0 ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"@stdlib/math/base/special/exp":76,"@stdlib/math/base/special/pow":83,"@stdlib/utils/constant-function":147}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the moment-generating function (MGF) for a Laplace (double exponential) distribution.
*
* @module @stdlib/stats/base/dists/laplace/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/laplace/mgf' );
*
* var y = mgf( 0.5, 0.0, 1.0 );
* // returns ~1.333
*
* y = mgf( 0.0, 0.0, 1.0 );
* // returns 1.0
*
* y = mgf( -1.0, 4.0, 0.2 );
* // returns ~0.019
*
* var mymgf = mgf.factory( 4.0, 2.0 );
*
* y = mymgf( 0.2 );
* // returns ~2.649
*
* y = mymgf( 0.4 );
* // returns ~13.758
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":123,"./main.js":125,"@stdlib/utils/define-nonenumerable-read-only-property":149}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the moment-generating function (MGF) for a Laplace (double exponential) distribution with location parameter `mu` and scale parameter `b` at a value `t`.
*
* @param {number} t - input value
* @param {number} mu - mean
* @param {NonNegativeNumber} b - scale parameter
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 0.5, 0.0, 1.0 );
* // returns ~1.333
*
* @example
* var y = mgf( 0.0, 0.0, 1.0 );
* // returns 1.0
*
* @example
* var y = mgf( -1.0, 4.0, 0.2 );
* // returns ~0.019
*
* @example
* var y = mgf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = mgf( 1.0, 0.0, 2.0 );
* // returns NaN
*
* @example
* var y = mgf( -0.5, 0.0, 4.0 );
* // returns NaN
*
* @example
* var y = mgf( 2.0, 0.0, 0.0 );
* // returns NaN
*
* @example
* var y = mgf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function mgf( t, mu, b ) {
	var bt;
	if (
		isnan( t ) ||
		isnan( mu ) ||
		isnan( b ) ||
		b <= 0.0 ||
		abs( t ) >= 1.0/b
	) {
		return NaN;
	}
	bt = b * t;
	return exp( mu * t ) / ( 1.0 - pow( bt, 2.0 ) );
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"@stdlib/math/base/special/exp":76,"@stdlib/math/base/special/pow":83}],126:[function(require,module,exports){
module.exports={"expected":[6.3775950048559795e-236,1.110822193128502,1.320650429316663,0.997825493253617,6.040306906074114,3.98157252345831,1.7951307223327282,1.7474390141632627,1.4100579453737152,1.1878711179834618,7.6514015970763944,1.154886769409208,1.0523477844360962,1.0790119538836742,13.425226281356228,1.068875811292257,1.475077737522596,1.4995463010939816,1.0497922058203695,2.2209549744958212,1.0220961026751247,10.695840478523573,1.1371120073933518,3.4155115905853353,65.77857780738115,2.3531683398636587,1.1184067826068051,1.189197202619559,5.455337039761757,1.4909110905510585,1.11097965970172,1.0755749205387435,3.4014660922064723,5.206622116772981,1.443493831335851,1.8402660215993925,1.5042200661844833,1.6889462282807743,1.3887402237278395,1.0061672191935864,1.6433535466391198,6.340371831720148,2.5714416492553034,1.0398370234788805,3.129667750621161,5.453634064025924,1.0249916931596723,1.0220597357833336,1.5966952585182008,5.041507846651717,2.2533671075870267,1.005608679066265,2.084777345016323,1.0503341557751882,2.7615915104269253,1.1764289154194367,1.0009969065370123,1.4195510297824903,1.5558297011118114,3.3356463626809707,1.4174690831085768,9.853523524792687,2.553826705763718,1.033626593611834,1.1346805287216828,1.077664795867286,1.7451391629111228,1.0303708833643836,1.0026472989980926,1.020325864629741,1.9983566806189943,1.7061345437470683,1.0025709961531812,1.0483527472877396,7.046098578622228,1.4575745078417721,1.022916824283748,5.543423514906389,0.9963719858935997,2.327356529853938,1.042623214179361,1.0529285805035922,1.1529105327984597,0.9998398928370477,1.2303788148075838,1.139203422785833,1.2320233957599513,1.0003175254396182,1.01370665284087,1.2976462660912274,1.0550574770587466,1.0481250187475721,1.168576996285335,1.4710427103092552,0.9990382065713389,1.1295890809080398,2.910229244528384,1.1042345615409175,4.863217928320777,1.2161663064894492,1.6418913047258228,1.9455089193312518,1.0033101882447213,4.797949458492672,3.1749424040478442,1.1501135028064988,4.1906875129806895,4.8567756426720345,1.1900820405326222,2.7399445669148936,1.8336210333447547,1.8027062113673937,1.439789424229455,1.2937201426533285,1.1113844342073078,1.544406733745366,1.7847855043844463,1.2320047994431882,1.3682971579897252,1.2105524488931136,8.61380853822416,1.557708842328469,6.486302578134573,1.0994707368584127,1.660579087257602,1.229054166879413,1.1680251928306074,1.1107740277249232,1.6341072151382903,2.07677663204525,1.0857289574218492,1.450454331998509,4.306099167413449,1.0855736158435452,2.593446692646114,0.9982569590182224,169.58215450975143,19.187217471205585,0.9643425032433826,1.006130626701117,1.4096351712208692,1.1192418617369728,1.7343698466293642,1.943840781257029,1.0727540450229311,1.3710688194680198,2.7750919063865793,1.3438438627864657,1.9400774004460735,1.0047174185045515,1.2517104822460028,1.3137739807951478,0.997999717836876,1.0233950634232682,1.00234195036679,5.78201294933908,3.7906875413825363,1.9808780328475522,2.015033289612526,1.0869598548488908,1.0685096679351873,1.0504301092914174,1.0514290524369463,2.9709939379705896,2.683435357590114,1.0359527522178282,1.0006334811661215,1.306791719273373,1.069091655595607,1.0188131272250478,288.02890409204895,3.9382209741198135,1.52285147033643,3.356784855852849,2.954960950510765,1.0563096569748942,1.0072280782058223,1.6083573384154475,1.0000927266221513,1.0505827337060811,1.0128174458426447,2.099743615259139,1.6503095200352718,2.006368849428663,1.6984921681273786,1.3096103507766925,1.012365362475418,2.260500373576749,3.7510586659400005,1.4500690587135256,5.934256650411913,1.0339501484826497,1.012398712604796,0.7615404017533183,0.9998008218572105,1.7291136959006748,2.9107332855017694,1.2817013373892052,175.32065765487462,1.230311776167278,1.2337120815406102,1.0317091386937787,13.36482077561447,1.3110296224369222,1.2049740675014586,1.2285006595982149,1.310102265114763,1.0425131710367277,1.0099652325322703,1.3350930409677273,2.3544218366024126,1.0761236474467781,5.837658195473875,1.001257840004098,2.156863785439735,1.3109489351517365,8.807511131440014,0.9195020818143436,1.0079875322343146,1.1844646075643543,1.8309785594750116,14.699736849512078,1.7146594914113718,3.4713697186591106,1.1275038945306513,1.7577339167165205,5.168073072380225,12.656977097860638,2.4138463624881026,1.7397410372668363,5.9569634062737835,1.0720846637005719,1.0837187419029173,3.795733996314817,1.1236743103897793,1.1057377469057021,2.777263121141266,6.82354306190184,1.0364703320092663,2.7713653907168414,4.679898402589533,1.9306986571993403,0.9876038142379852,1.2621570572558818,1.0245432260412626,1.106162957869559,1.3178763145274812,1.0751314694277059,1.5369542434001857,1.0072336875824888,1.503598046408644,3.3950699808752662,1.2403026230187206,30.835467443506293,1.0231424621282248,2.0233808147281045,2.8951594361065105,1.0123219318579575,0.9405386043881144,1.5085485288426979,2.373923016639535,1.0150401733658982,1.0006689687863837,11.21764229786544,1.103699858953834,1.4054833251144727,1.7464698158247138,1.2976827698235842,1.5476143338851862,1.0590319975016322,1.0001987768860374,1.0815998368094317,1.4978630321842312,1.3307783702455955,1.3190023767031749,1.743423940512474,92.65151495131401,1.4984029028079366,1.2442387794348226,0.9618388588515977,1.2910092585442974,2.810048312892862,5.2351415251829945,1.6274656180204472,12.358078637161395,1.3775762294192182,3.481134210499586,3.519991776925739,1.0041497411452738,1.0776715501869478,331.08650795981805,1.5580759930187802,1.0121168604312232,1.1202830765109755,2.460826624382227,1.0282563083897067,1.5911380522485736,1.0814117416019378,1.0035270448650213,1.046649269677421,1.4077036137041963,1.0036047370197554,1.9679512062589788,2.171624903859796,1.047669578341635,12.969045898664037,1.8881311634046212,1.841199993816408,0.9981901726340999,1.013336825061807,1.0144696264573043,21.251805518365174,1.4000055727466723,1.2144276420660982,1.7286029996643772,1.4678351318543645,1.1689901116591184,1.0140239251405547,1.0288771395072387,1.6601867971676785,1.0123223734143012,1.2331748539734182,1.3687533773318978,1.9127571773295315,1.019165696978485,1.0141118813786358,6.98523592830369,1.0396093854029078,0.9788724592404239,1.0909014596494475,1.0168488433246765,3.1258174209020826,1.2300592898456517,1.3112197263220526,1.4167949468741132,1.301305098251081,1.699663178808063,3.4418201013589944,1.8940521467601206,466.4364144322975,1.3209705882610563,1.107025301701743,1.9506553086347773,4.798983918966444,1.0779410804088199,1.1656623820283625,1.2052732080802078,0.8931189269777926,1.0288069014804981,1.1083091992498437,118.39921958386607,10.370903878127455,1.1232162687991887,1.0936752238714935,1.44399703082301,1.0010043583752766,1.0753263941318,1.2474568074271597,1.2254872828044656,2.046743683936466,1.3596740058916128,6.8896507135721885,3.712270123529284,0.9994715412046814,2.001119831018383,1.0607958610148547,1.5892786395797018,1.004965894091435,2.263405521828766,1.5085069849738353,1.3817050902667076,6.344039428596693,1.2952386958770776,1.004387711577192,1.3166325880596994,9.199814151670255,2.974413505948788,1.956029285580546,1.107328023846146,1.0794161289143507,1.0343207256116986,2.7629429230551734,5.6651339977572075,2.0402648339453187,1.0941795133727357,1.8066214159263085,1.0045230106491536,1.2394772200391349,1.038348287477067,1.0510187497657895,7.168295407133923,2.6343913523983096,2.934228583257549,1.601299374737163,1.0652234517198784,1.0356552215345922,1.3005943633381642,1.5891437285205396,1.000194141835054,2.86735994350467,24.22785533447911,1.7708915536840972,1.0364261719093264,0.9389319201364588,1.015779164132655,2.3924737699287526,1.0133512663849864,2.8805028216329713,1.0203272026239927,1.0453997861467785,1.2782365504386397,2.283977826677173,3.0160678175633984,54.241635621210094,1.1954791144198778,1.5721716613120011,6.552734465516026,2.1245215923512526,1.2304411997249047,1.095245258436252,2.8613570079719453,3.7724124916274318,17.958391111142753,1.139258172885571,1.2978287185676332,5.643106067849014,1.5233725528589703,0.9852367449508628,290.17743721204823,1.0057941634392669,1.1064381095902873,1.4791023482447554,4.692746496252294e14,1.0740785423122015,1.194698019820667,3.1411106614293294,1.074356915398055,1.3832289726191227,1.018961186488225,5.145810217408056,0.8294240040500771,14.38993374058095,1.172106405753888,1.4189493731441456,1.0010949351876746,11.601065055916298,1.415721487530951,1.9289705847201903,1.3778287736063164,2.7480539133745396,4.026342554129671,1.1940725781794304,1.0892620113168814,1.001672272867737,1.0378294123093743,1.7926316988960043,3.4271726938514604,1.504179285159474,9.120681133204583,1.6683151590522574,1.0002358747285012,0.9993942072624266,1.282088554237354,1.4489656607761954,1.74772951408876,1.5638589536483463,1.370900403532428,1.1403118389572808,1.1530531759615505,1.392128205651278,1.053946630300381,5.850810777568197,1.0919399375090821,1.1570997553967364,17.100303722867427,1.0533657295171928,1.0868985625281502,17.102402999308246,1.2672199541845413,4.212559724045471,1.8902190780154522,1.0400789235242178,1.5947606239483527,1.0987644544639041,1.0000129391127195,0.9985603475726986,1.2329048212061344,1.0076015182494296,1.1865252456989799,1.001680571180638,0.005683639643052677,6.79586651690102,14.181463509859611,2.0972007739439418,1.2272630089574925,3.2070862444075825,0.6440739626994691,1.5119540025332536,3.134909992123656,1.5457977710698259,1.000459970783762,1.1905207040543422,130.97022773915256,6.367441491439269,1.1960190709434895,5.063399827558631,1.2942790738918326,2.0206098313021683,1.5774616931303966,3.002015836471433,1.544816644061994,1.0029337481708476,1.380076476479677,1.0357426525500928,2.6806639768909424,1.5933186609899732,1.0239443684938638,1.5934074918726209,4.148497729259526,3.633839754280859,4.494195585895471,1.579287211901488,1.004261797616682,1.5111724743487762,1.0187961762288924,6.643696175375189,1.1277665540771336,1.288332790786248,1.0003144287607117,1.0017623685658927,1.179447141861195,1.0436078689723507,2.467518228844137,1.3474066511842322,4.244935331594773,1.2737223471471628,0.9651695002289644,1.578426118646214,3.79583686985507,2.6165933952197418,9.042500756009261,1.7385734080749404,1.5216193553412496,1.7160507585405163,1.242921295870195,1.0336523770079986,1.0988257649121596,1.037615206956184,0.9367788654731504,1.003723849812415,4.472236033267008,1.2178332550739153,1.6210819282258155,1.008627495323623,2.163147103810613,1.023120132486844,2.4200215008749093,0.7931148356356106,4.201917493324693,1.675582623350841,2.4629174452472307,1.252520871727933,1.3295175045354695,1.127082602069869,1.2806186934999377,2.5763446375577477,11.950845491088469,0.9968835446958502,2.955519566071047,1.034733228916172,2.4085095907602376,4.078164942551193,1.3251571917497058,3.2627552218297127,2.677185975157375,3.4155738862266625,1.2248331590086643,3.1665800630019096,1.00008941706383,1.9404119359595549,1.0548577970154436,1.1697209130308324,1.0778436000201668,22.236067506231816,1.139491520307557,1.153829957751406,1.151303397297633,1.2014789969027595,1.0499633846773222,1.020805769511142,1.3824052782393956,1.0052582140583781,3.7812007916889696,1.0753365578836547,44.77969566163388,1.3209453942244576,1.0020683067094465,1.0956215359784118,1.0160685735297612,1.1904369408393245,1.6480757097108691,1.0069465531362318,1.2504389907472568,1.006045090634729,1.0081718428322028,5.053457770522133,2.110704710576139,1.0988592181978019,1.0923220082432716,1.085763935768583,1.115615279600049,1.0546017719032483,1.951286908623135,2.0514045156275458,4.189146227710383,1.0662307666440627,1.4856260759656639,1.0109517314270575,1.0769915833093409,1.0737941833663787,1.0577224024303329,1.5976676976811597,1.3434685463221092,2.2972980210492753,1.8638202097535406,2.1923965371389333,4.257167140701636,1.0725382019106646,4.9989945348313,1.5119474428721082,1.5699498809386738,1.0387940048384467,1.1882780461305156,1.1238971288455624,1.117447956969253,1.1971840169431809,3.667641143801386,14.167809182186419,1.0423765794083366,1.7793522395144288,1.074676106760475,1.018945265954996,1.1269195635455242,7.974265567763135,1.0301825627015366,1.0051560418269199,1.0812551754280988,1.1639599608022173,1.3264755272933466,1.025543194217393,1.21248593159714,1.1518801917260004,2.919155678918095,107.63978424006832,2.516597491760497,1.0560172072155622,0.10643966198430242,1.341420254301954,3.665589462355735,1.1662492646296096,2.0434859862499324,2.7559296493324936,1.1986910203689654,1.727325090743865,1.0399043857610848,1.0273376842051822,1.0078791452502145,1.4209727074902612,7.924687437589331,1.064987099463531,6.581360925069694,0.9962097400149494,5.320716384631762,1.72525710060637,1.0586944495474777,5.5266212458217785,0.4320773968179598,1.005031203627951,1.074205451976401,1.2220317643119174,2.140108426917143,1.212542415127695,1.0868031502525182,1.06296743195991,1.9007053842397879,1.4988088031303584,1.0935085177101909,5.902099777305058,1.3835507958051534,1.0960046037530844,1.0208700201789696,1.0771367633924003,18.646794846495407,1.0310069891962113,1.0714411634506147,1.8887390798093242,0.6360478479233996,3.847743580021937,0.9317042953925135,1.2361484530069993,1.0237375960383155,1.0130420325932579,1.4085641378089624,1.035305408713282,1.024687955260579,5.137348090419576,1.205376893892879,2.278926451357685,1.0191746527628767,1.0778888878021946,1.5773766732697982,5.1942352046099325,1.540453292116,2.2381495602819936,4.1963484047006965,3.9647221145154807,1.4298503612400106,1.0093066531497301,0.8697145954179882,1.0383950255728585,1.0148404126467925,2.4167351077303314,1.367122916209197,1.9699296933819201,2.4340560705816223,4.278923615744641,1.7051121526956015,3.158606818741536,1.4487159146345225,1.237631990073997,8.039576526537799,1.4939917431693568,1.938182564059861,2.1192341492289164,132.19269300122465,2.8027596469204945,2.4412649898254566,1.8000994415110048,110.4798431835538,1.0512989733801223,2.5790143348478707,1.5190926455517146,1.1127944603530637,1.0133646145814432,1.0972782422130527,1.7117892423935388,0.9975548091638926,6.307165413798836,1.5082578070055352,1.0478414832284115,1.1363196387354384,1.5899980678809076,1.5141515824388523,1.298289596326753,1.1966263069170817,1.0145776020072486,1.026388220473401,1.3710286045363467,7.484106588575833,1.0021762743305458,15.579992518560273,1.1780198603066898,1.0125436806893517,1.0036493630653331,6.651757443002861,1.266085663854615,2.6651542629396685,154.20667906223775,3.065689841312591,1.2239629886164316,1.4712652598449962,1.1509538357656517,1.7051395754553749,1.9070030569773528,1.3091946306837325,5.925791696192234,1.1829772479839145,2.708871674379485,1.2177887093567277,0.9996574343703638,1.350393614754998,0.9964478789306851,4.392449020920605,13.77617904355662,0.9591313060502358,1.013913978192395,1.0020067860250814,3.913261908985408,1.2425380780178106,1.5502168092961988,1.1467673259253868,1.077171616682259,1.0046303755173047,3.852811999156164,1.003536410682446,2.11975876419912,1.9578752155600607,1.932034708222557,1.0369218577012087,1.4935500479447552,1.136865049906884,7.266200020147515,1.3367687776748374,1.0748374138501082,3.1546221065778277,17.317318093296393,1.075165508275292,1.0317026515485392,0.995510036931614,1.332091913229056,1.5586038233912722,9.48898020070962,1.0051352053169609,1.215909277033823,4.589994348934309,1.9745246203266775,0.9986294517535856,3.164539072398305,3.4283919337028395,1.8627090263281116,1.5588420252821096,1.4802561546506174,1.0019333878685306,1.056899122135137,1.2001050269523421,8.659398913458359,1.0290246632597393,1.0002283487893187,1.177169166596849,2.7823200462288646,1.2643671800296294,1.9271810089174821,0.9997949532805913,1.113552070222162,1.000017232126336,1.0556818458211894,1.4326311354142607,1.8687735225570334,1.083290483246551,1.916209773546082,4.357853668808708,1.5885587803029668,1.5042991983762783,1.4463031562677964,1.2360047283621103,3.0190133015398057,1.2889259718118258,1.0871656687860416,1.0649002059986028,1.238832481136479,1.0163996144430651,1.4763071533502976,1.6222023316249317,1.2038286408260093,1.1741312129957544,1.0183783283078824,1.259573704971921,1.1073483328935363,2.826502221232243,1.038877217126826,9.7419100342605,1.7367352132864686,0.09621062628473544,1.2786804313674052,1.0255994301230071,1.0107362928097956,1.219178403235297,1.6495616645336133,2.1808417737082073,1.260311086177219,1.4452520236111066,2.5876469352233196,1.8832853382873889,1.2251067321526465,1.7663378165749133,1.0442270747989244,2.5107509353445354,0.9927013714824549,1.1362487060915105,1.0438827082490758,1.1277199959187532,1.181730276992729,2.34040639572603,1.003341334962013,1.011104311218839,11.760982590904883,1.0653874899881248,1.172800639780493,1.104685004287955,1.2489277161217762,1.9235285668331548,2.1716606239354976,6.456575753701415,1.6746105958099167,2.21408042987955,1.5599094069985318,1.011986153782757,1.1022208287523576,1.526203542935889,1.1526512917059304,1.7053800473114786,1.1523500779717788,1.1169673760913859,1.0791891493640784,1.4555597611175441,3.4629982377106767,0.9964139018920384,1.0501801258649708,2.070602631397274,1.4133284605012753,1.6565222551144367,1.054676553287077,25.95167874304161,1.4469737079890042,1.0606508322646242,1.8439214582138064,1.1446727241570775,1.0487036789013335,1.1186752298362193,1.2749715297630475,1.2482868870885693,1.7933569391247455,1.2881608053189397,1.0763660053497008,1.4877596197610237,1.0110374186358766,3.232566105063975,5.3178511237795,1.3034997928835392,8.875618690926148,7.48099929841311,1.7628342419506688,1.0001417754679662,3.0512835233529434,1.708286788614844,5.3302236377675944,0.9995778287853491,3.074196022372146,1.1005975401241221,1.2445366146047974,1.089391014732936,4.344209880574198,8.578203085525361,1.1050271530216462,1.4984369309002807,3.262918341869586,1.6472698576657325,1.07191320769423,1.2035454371490713,1.7773982430619102,1.0095603459119453,3.487156785883196,1.4118505831646255,0.964188034187991,1.3632099803842226,1.090517523621332,1.5789774621420833,0.9931579018895447,1.2154603626976659,1.0299108569066324,1.0020021442039957,1.0713184626614054,1.3851353006689826,4.172597354124347,3.187406185116928,1.0705038245559293,0.9995067489234248,0.9175276516134518,1.921597447049841,1.1305770977703318,1.1731755934570263,8.227184784995098,1.7393447945469285,1.1946499127143548,1.3133785037726764,1.0006358325693134,1.0983199390877432,1.579620254526887,1.0605189157005477,1.363731542087983,1.0123856830126075,0.9978545279030806,1.0829278373663407,1.698677868669438,1.6015000291595778,1.0124113644397277,1.1897634667021042,1.0281540430405582,1.0338446234946879,1.2735206736843705,0.8705577616781401,2.5758866578035,1.0291675650793435,1.3218791616424341,1.0172289465688897,1.457364967613759,1.0133573262493034,1.7790722186999721,0.9988021832355584,1.620626319038629],"x":[-751.1014089223938,0.08440388341703209,-0.04374336251699179,-0.004408247288496689,0.061709185550007,0.08170922369744164,-0.06609484567380955,-0.18634344787267054,0.02735235174611668,-0.08613514989041747,-0.0762637192703506,0.01800676529471222,0.6442786772396669,-0.051772557376479275,-0.20271726717218264,0.045073819499305556,-0.057612599855946175,-0.029371384357515806,0.15403482721809003,0.04999988627474811,0.025139603689107393,0.3663739135778279,0.050882171988263586,0.05374430791639766,0.05559033681482337,0.09113371442163463,-0.018009128146877232,-0.028802033489150065,-0.0485595954335996,0.07886713663088737,-0.01950425369127204,0.024394934147942998,-0.046201496358326925,0.06573071834414355,0.06541081163917944,-0.04590366212729624,0.04153585682245935,0.03208806304888835,-0.06047894549579782,0.004518598030106187,0.031689589638258214,0.26882755963201976,0.20392933635367,0.015986772874877736,-0.06505461004235163,-0.07764787925753838,0.014503196844830826,0.008150975018468676,-0.14312493016237726,0.09192355917780518,0.07659969808995232,0.005241354744471308,-0.7525257975744787,0.02161965408916655,-0.05481794839079206,-0.022617711270029456,-0.00880245580081411,-0.051050788953275604,0.5220742441828345,0.0711849633737815,0.06064606366977755,-0.0970125767354064,-0.051015896556462235,0.07843724280314412,-0.029658749774650342,-0.05977629326639755,0.28740697188628506,-0.009088778410473362,0.0024474210055549367,-0.012743681417833885,0.03663193452362857,1.172133340844701,-0.02878121541583964,0.019447667597622467,-0.10882245794126631,-0.034594224990985925,0.019882447767047423,-0.15480023420424452,-0.00572878858199824,0.578908981183744,0.012990143294118947,0.0634682296215695,0.14573970570321487,-0.000171848615645169,-0.0269672276750064,-0.01846419765917487,0.05868902295084791,0.001583425837557273,0.009237484543875824,0.03518530982024701,0.01438682710032492,0.010927363661877874,-0.06390204532258582,0.2586274865578817,-0.004926762591628581,-0.017484811482530963,-0.06967615548078206,-0.032537524907363245,0.06307388679223694,-0.10186455618773954,-0.03415493478893565,-0.15528103760002138,0.0027713249757965186,0.05274270051702052,0.046739596104444156,-0.053959945050011504,0.17087607661507836,0.0813446100927856,-0.024380590895120402,-0.12707649873340773,0.04896945458577223,-0.03354186921594706,-0.042634210345528945,-0.22476370836725362,0.021053368672224196,-0.03796404732662835,-0.06490534819050667,-0.02767145484274338,0.028452974381917635,-0.023653567741233436,0.05091144478103299,0.2087737944118766,0.3441537912627116,0.01745635349898088,0.036385005015860714,-0.022976204812449795,0.84573419298184,-0.04556874428700938,0.06537856729460619,0.06601562409570465,-0.015036111141451841,0.034619918853862675,0.16079116059891974,0.013239050800970244,0.058424194863749196,-0.0069427555448612205,-0.16718382683087304,0.3568647359795048,-0.05311954189679691,-0.01229761233703873,0.0335854086397987,0.025853701468397314,-0.04346752611857885,0.04970301089362372,0.01314504648010402,0.039413290636576434,0.045314631023481974,-0.03676079098254069,0.10020020713757413,0.019486586609398282,-0.0406459974414584,-0.04311944973445742,-0.004222617999158448,-0.009158670492216789,0.0027528060329866932,-0.06430135063276043,-0.14062246967637132,0.19846498863408069,-0.036240274799800555,0.03713454099557165,-0.015663500863540916,0.023406271581928803,-0.027114178347929313,-0.04738360368620688,0.9223972032727126,0.013678049367391656,-0.0021682723314555286,-0.14832573900337676,-0.03136520192786718,0.036646646422783924,0.1392302941785071,0.17571412682661988,0.03854442252466969,0.04772946203795694,0.05519715725980119,-0.017315575022345035,0.011752097139953122,0.0333377553001892,-0.0006487888973212147,0.06005973269249354,0.00502313777925531,-0.04266977066268271,-0.049383839841967356,0.0969954735597578,0.05243779949063014,0.045713296839738446,-0.489271586329001,0.08276730673497981,0.13288346873736573,0.02845579198181123,0.09654698301020612,0.014599716081623124,-0.009293623286798919,-0.7074572202569869,-0.00023627356992711457,-0.043612741184455725,0.04658954391713959,-0.036834898264301696,-0.058503406596948054,-0.04063971359409509,-0.10855458160685605,0.053176326303304156,-0.09660137470799263,0.0316841829612587,-0.04053493313181419,-0.08424462310044113,-0.028757642319706005,-0.031556718479182594,-0.011571808778187961,0.04831884922129784,0.22898171637305587,-0.017470088266349715,-0.22313596646150216,-0.09417246478781177,0.052316191729527506,0.03452938013098425,0.05673920746770684,-0.9751179505122449,-0.09573015432816193,0.17100144059939298,-0.05680917825353006,0.07330476599389102,-0.06951451027101468,0.10644880656792177,0.03763937447008257,-0.04553689234465935,-0.5141421339360419,-0.06586407404042212,0.12017807846338074,0.157635632130127,0.05575028419051889,-0.01501920525235867,0.05641399694967536,0.04424338324438709,-0.019097441889722892,0.018296777924217675,0.05633541065518506,-0.0764384876087785,0.0164978712572246,0.30313263234554494,0.07720868102761773,-0.0754115466830118,-0.26237682342034463,0.07141726849672714,-0.0315030602665424,-0.030221829553727292,0.06767669510500657,-0.01427678694173102,0.0529081733894121,-0.011303536145629733,0.05841092604043649,-0.04421160120731782,0.02603626342619133,0.09885784096975676,-0.13774235362949955,-0.03652717119666788,0.0659983530677146,0.006016117647457173,-0.1264749485382638,0.05452051815980556,-0.10905229036873525,-0.01597655058861519,0.0009697587342368946,-0.26460571297628455,-0.02413637711391317,0.043985767743368376,0.03908458274893883,-0.05703514025514354,0.029829771696802933,0.012131979465101486,-0.0016954358004717257,0.02529682643442749,0.028679627220177598,-0.02696344306836604,-0.026008252251987003,-0.04062515601878704,0.06209001734564806,0.029365872517509002,0.0309230954721873,-0.05929397936203784,-0.06612887837035984,0.11916451885958709,0.0756609182549938,0.034693275937594865,-0.06447535591972049,0.07463654465179986,-0.04572511477872603,0.527314821577104,-0.005155346166296482,-0.015244888753011408,6.257050621178497,-0.03736799166956401,0.01989455398931006,-0.043457807987362776,0.048227540105294495,-0.04219725085119322,-0.03251679956490452,0.015835367225915963,-0.012202930187905664,-0.014319216487151051,0.0736358886360276,-0.004578400129523319,-0.17959917473673664,3.505502222002832,-0.018017771861824905,-0.05698090266597505,-0.425036068544558,-0.047264885135672674,-0.015171684132650659,0.009851678844891298,0.023835798078813697,0.8830993188610321,-0.044002774175234766,0.11531296109037104,-0.16043436735859296,-0.06573623905126603,0.05680973025606728,-0.015345966041067124,-0.02404597138630317,0.15151322765398023,-0.012313257762090704,-0.2143331496894059,-0.04438515407712294,0.1134057741723751,-0.008536576274133234,0.025117203549344325,-0.05678401271170763,-0.4864335245254928,-0.027665603542570694,-0.08198554291483551,0.0069619377547121,0.09535836286744721,0.11766274326569509,-0.027221950417575087,0.7092537574634876,0.1612292085986996,0.04149545567217765,-0.05983846757671868,0.04237033492314764,-0.05715531521469124,-0.2991081990976876,0.03383145755878114,-0.47697724203856984,0.18640349660454508,0.05484223362609314,0.022851913247547956,-0.026863864157159474,-0.26410421772716486,0.007993137041386447,-0.035138196571930735,0.07596617824384244,0.05816568164686598,-0.01798222908137237,0.028035235957241347,-0.06479976110459973,0.0011565292888715273,0.014381379551202701,-0.07442061936711643,0.03184036166062859,0.04010513230767377,0.032780268672069554,-0.12970200229911158,-0.22967602514508467,-0.0007677911914744581,-0.06936776342991752,-0.01699603160728952,0.06034843244771408,-0.008278406541707056,0.1255900183839422,0.24079836266424426,0.10627407072666928,0.07107046060853384,-0.03884819846504652,0.002795103836192199,-0.1011432378674481,0.06568990186569496,-0.15666887338752084,0.04216613065652516,-0.06031787437065406,-0.02067374184325478,0.018080784724726337,0.07305583451138688,-0.13191380109523745,0.48883897909641527,-0.09900080832538755,0.07221375313381954,0.004590919570438612,0.04051991059734966,-0.08604105378541763,0.0327197650897057,0.062417782306649294,0.09308719011827936,0.35661868322705403,-0.059243627521150775,-0.01658342936834014,0.017520760041365074,-0.033585567448596344,0.05335459877730342,0.0007923006705878727,0.0655738286837484,0.12439595440989462,0.036919665444790285,-0.010164109687502115,-0.24732271139439033,-0.009927304959753115,0.1420922585859984,-0.011697115255965534,0.05067021263201649,0.014783189209443881,0.03889694012512501,-0.027714645784457353,0.0765021630674744,-0.07789754270233026,-0.05311295048156287,-2.5526448095007446,-0.037070083631532316,0.05712002791711895,0.05812864320323209,0.026464749459756742,0.06009332895803285,1.2113510047421403,-0.27655032597339246,-0.12312097265151961,0.09440048027928694,0.02548265258482796,-0.060389924779844846,-0.05651860735226041,-0.2995778565696491,0.6429809815531797,-0.015108526921812943,-0.02591493550359735,0.03359875684284698,92.09381406523666,0.01906487950821141,0.24526887872194925,-0.04362009144244796,-0.0261807645226282,-0.02799268248608942,-0.009349229477723008,-0.12335574958206644,-1.9476041405427593,0.17165865761977164,0.023915589781899962,-0.03482796440877309,0.0024153618616283568,-0.057514882401718835,-0.03793795244878706,0.08024112462441081,0.5629232796854937,0.09546471102611905,0.07258055233307119,0.04765494440592956,0.01920684879404358,0.001319522238284375,-0.025053429810909855,0.040807031537350255,0.04379025304166314,-0.08332091266739651,0.5667236971121999,0.07516181824656165,-0.0016831343463770826,-0.0017010741778426819,0.038787329469732,0.02923205990623337,0.07281453758299888,0.17664127665913304,-0.18021579991199588,0.3082511958937577,-0.025234534959175624,-0.05245962700660151,0.013706243623250791,-0.07993112779163536,0.015779744024985762,0.08499879600600613,-0.10793227941890335,0.03257788772569303,0.02664505440388934,0.0701645597410819,-0.22594966478456924,0.1979742396412373,0.06703876771710254,-0.024433349619799732,0.046726792510116105,0.1775694757791385,6.545598493228749e-5,-0.0059583433759175936,0.32909054094186185,-0.007655015380873285,-0.021311760102087608,0.0013719944917191945,-5.950608540420258,0.07482512383555864,-0.3048298840518034,0.06575691809623924,-0.02777722188335599,-0.1417108532708845,-1.7547791357396583,0.03665967851585826,0.08269242193494611,-0.3636986094550899,-0.002444787180516189,0.02547477833093957,0.08009846360351405,0.2938123880714178,-0.04149379772879914,-0.9186654347543888,0.024075930131561216,-4.683967438413841,-0.048016857754567085,0.06430352365133413,-0.03214045500309139,-0.003691695080481068,0.07603188535602079,0.025257211118589612,-0.0526885529137359,-0.43197764489567286,0.026753820399535222,0.03697024984315946,-0.05525787460305755,0.06471386874221813,0.04614634496794381,-0.0680343232099955,0.003077934609090213,-0.07000984563741192,0.029378864768144386,-0.06161887926682,0.02142167496491726,0.028284256846878256,0.0003929401963523177,0.002484635556731396,0.19991427633180736,-0.026409993155631584,0.27114562356577143,0.060145121415207156,4.711702331420357,-0.057731855293458076,-0.09687830158464511,-0.03186250246383632,-0.0915024515218078,0.05453898886997546,0.08438634893956407,-0.27475887111179303,-0.03642812432619844,0.04368386502195935,-0.03290142783074887,0.04879727672165057,0.019478249349014626,0.04222494057702697,-0.29749790998114434,-0.006084175015386439,0.08398312608222239,0.046239661178354693,-0.032122367862554804,0.005547101649699668,0.06508057002880789,0.035031788012502174,0.4585669686117445,-0.8881451476654302,0.0652617150946651,0.6992437905794966,0.0555370600523931,-0.024504517477791258,0.03124047590897172,0.029697281817378143,0.07755532448030239,0.7721924490624223,0.157808469096228,-0.11391613012517698,-0.08738569693110931,0.03619280049036963,-0.1091312553519258,0.04467611885664137,0.07653264497749857,0.15857238933484116,-0.20380636102167848,1.3736090639235896,-0.02501565371117772,-0.13371761737025523,-0.0038123938525883583,0.07893882584407357,0.025463456306230425,0.02993640638090503,-0.020418479467554776,0.20094140077317016,0.032301886477966876,0.01953692382031913,-0.026034608992416497,0.06712312856770952,0.09945241217915002,-0.040593162220235485,-0.03808088684951174,-0.012951844552012814,-0.0579267503774914,0.037313321045147424,-0.10263283079173306,-0.07738541251434339,0.0022408967424300125,0.016447221433456914,-0.00895998095114263,-0.1503226472024669,-0.037122807654755875,-0.005708233374981761,-0.263914657272278,0.0075060477822811444,0.009171981672679519,-0.05282313330207837,-0.08026820325091474,0.01681545269346829,-0.023560841075855425,0.018289355938035018,-0.019136617903984174,0.012776027705118646,-0.04487318890812633,-0.21656164799717637,0.04642042703681558,0.014646114661477444,-0.15490822538937032,0.007239609197027125,0.020037680659723667,-0.023920549874568472,-0.012878257533650142,0.051951181463308904,0.06304751795410202,0.1539642314074941,-0.1171370908639053,-0.045836070211038395,0.059813001795351595,-0.03310761057993905,0.05828005786284238,0.07933392170739073,0.050113279594764096,-0.01676263132464839,-0.024514709236480935,-0.08446688737568034,-0.0412434924040838,0.05981628728958649,0.24613600074480435,0.0599762182190295,-0.012929898358218589,-0.09457685703632068,-0.01631374787610311,0.009701701224173104,-0.02173974248016458,0.4349300718679717,-0.016481597288546077,0.005297203776445825,0.013218393779542127,0.03251589293742825,0.04627776785352794,-0.008214256819780448,0.10643280330827948,0.03417069037918244,-0.13447478318488032,-0.12374249849201574,0.041137056917690054,-0.06252535695264577,-3.2631023487906887,-0.027711626275449788,0.04265855942921709,0.031996087601424666,-0.09859538037397206,0.3868254860253906,0.020077631471563072,-0.09887009152423082,0.01260567781623978,-0.01079854105880828,-0.004948339403096004,0.061080540797948085,-0.05844040329429452,0.018553255178579822,0.05912661324694299,-0.00985005077290721,-0.06356355015178033,0.04520174074126494,-0.022910443646647446,-0.049669276271224166,-3.131952456141656,0.0036775907518595274,0.02269587854544744,-0.05735645401621958,4.642360815719269,0.023009979245260243,-0.022335135697440903,-0.05250822198065219,-0.03503275533747201,-0.12560278912687128,0.020193676780242586,0.0643001486588391,0.05714234000686304,0.11098993916991584,0.014844310301878577,0.016573943811502206,0.15818940093385495,0.00872189072333926,-0.03520979897547133,-0.0419099218005412,-1.2809341659968694,0.05606403610025322,-0.47266202513008837,0.021067587144206368,0.010915368025395514,0.035541081224472526,-0.040061762894426804,-0.010229353543433142,0.009243530388974776,0.05738997637819537,0.14075268050393658,-0.03781823750836174,0.010285585889543244,-0.023872706006699787,0.03820202198211982,0.04493407783059319,0.03194545400596809,0.07366553701712973,0.08456394734887612,-0.09025560578037645,-0.03451714121129225,-0.04330680140740864,-0.16642151278761474,0.021432408531845387,-0.012103220166396686,-0.23600643454945353,-0.04307475239077046,0.04373441985104133,-0.053204854870978806,-0.5294427746338188,-0.14801481490815693,-0.1559585719810836,-0.04208704901017539,0.12133063454690207,0.0569072420286771,-0.0975339831682325,0.04480912143659781,0.6070526313106461,0.09271450618548378,-5.23951997889166,0.06904566578802109,-0.1565515359113092,0.07015496367445677,0.013103094484672895,0.052496808131747785,-0.19142718666833142,0.12972004705520512,-0.039821932228975204,0.09027995354897739,-0.0367044996509507,-0.009298243306061701,-0.05363013636712285,0.09230409729284139,0.009722974987943965,-0.25200973173390445,0.04821587482160511,-0.03592055985171065,0.03687432999129628,-0.07523883977688878,0.007467255148152857,0.010646748942742021,-0.02649390821332906,0.13619562160970342,-0.03689131484145464,0.06595649002159241,0.0711012995339724,0.006433021390107263,0.003417539673536682,0.2830253114045055,0.19636246300815652,0.06617886553188247,0.3828455483635631,-0.049985309475798406,-0.2587567815278465,-0.05883329155312602,-0.06567555537767292,0.07205650480368252,-0.0679019906406206,-0.03103450237858718,0.04650204829085278,0.04647061092857768,0.09930371294340562,0.026796720958884523,-0.00037754549792923253,-0.06527520018518781,-0.0320456851597723,0.06898523038372255,-0.06627113206928385,-0.0850191466536036,0.01189857226921684,-0.003427098052648736,-0.045256264054309624,-0.11403563072952905,-0.06720718802445991,-0.033289240045441745,0.04266397175518416,0.007595415306318742,-0.07920882967357178,0.004034952967118283,0.0415785612395414,0.1320308816440374,0.3218472327448294,-0.014184839265027976,-0.03914372851863098,0.08431741210518878,0.062321980914672045,-0.03623590506397309,0.02509867147938105,-0.05408927877356638,0.20653927036170314,0.029724533448205484,-0.03754080777671359,-0.08831671472071106,0.038647305487610376,0.05303119107792614,0.18472000578495057,0.011609136514020624,0.023668751377106466,0.12529817706780258,0.059764857045906755,-0.006499603497589809,0.06189624572704645,-0.07833285212862967,0.04874631321614101,0.07784427194992172,0.04126346460042517,0.002952262395784791,-1.7829359492986037,0.14010060285499926,0.06743621543578955,-0.008900546164676747,0.0009387661074037462,-0.25713654159265,0.05258800398960896,-0.025611197948494518,0.042666687162564935,-0.0002950304496646683,0.03200119127020061,1.9262348957910236e-5,-0.032149940918362624,0.32377797011062515,-0.15135482997421879,0.029930115060317133,-0.06573838841361185,-0.0706890352765975,0.036863310563130594,0.06455332659048298,-0.03477862329256061,0.02772822861939199,-0.04877517027568924,0.15382262704182603,-0.02322396517349397,0.011356894876068745,0.20451091793781828,-0.10165966334870946,0.08126769106796988,0.035083233347985736,-0.6715980596025977,-0.12674321032908017,-0.012794822993795668,0.0974695016270612,-0.09213457537676295,0.18911172779278057,0.04165907367991373,0.15227119578638376,0.053226129028321495,-14.954612546979979,0.032529835450498035,0.02260871886743565,0.010268233173880384,-0.0431242593767829,0.10109075337787088,0.05017108051668498,0.04224909517840368,-0.04502462332830892,0.9068889703500158,-0.05260622519819698,0.12353910103306737,-0.03686761950926029,0.017925510952090426,-0.7812945112652367,-0.10202237572450845,0.07239881153287034,-0.010886504452076423,-0.02967996217695621,-0.09069992814503706,-0.14217093372573716,-0.004123543208393476,0.009952146116573524,0.19832201153686924,-0.02313244463478928,-0.037889380269366536,0.036446383821376105,0.029775060108048423,-0.4665354161026153,0.03942982456210814,0.09733157641032489,0.03578189631329097,-0.045436715184177884,0.10914145909126832,0.005866930821105107,0.053219213004348204,-0.06387662800770261,0.021516007887236434,0.04146143408239977,-0.02890488394455821,0.021450198637960438,0.030806571834155055,0.03439445892639816,0.08819650135980714,-0.12915270856101763,-0.020923009277110466,-0.04821931584871962,-0.23826424517723901,-0.07895004755680138,0.05463601548320407,0.05391699253481892,-0.07681473087672767,0.013006849876341382,0.22364629986346218,0.018605774780870082,0.03166200548589407,-0.03290270864461828,0.11921250787102516,-0.027452965058535027,0.08544202592191041,0.028361733207515193,0.040833978217287625,0.065297119922744,-0.007195064963493515,0.940916151571132,-0.061685773813201394,0.058038812619436414,0.05693859503339568,-0.10893894680629454,0.04325194471331173,-0.0018535444237781917,0.043884673514925775,0.032128372028033404,-0.9022728289686287,-0.010429349849661679,0.07438955467960531,0.022708658387348465,-0.11624204960981444,0.05460970826836126,-0.07086236501485288,-0.40926905137568115,0.028366103834769507,-0.029890857827815344,-0.07075094623847406,-0.3032094653097268,-0.043232844815786375,0.02560937673862125,0.035624873765675275,0.004645143029199397,0.06855188644850678,-0.02922726214610871,-0.06359604443796296,-0.0296386616529122,0.1309047026524729,0.08264346721198526,-0.028784245143867487,0.043103082011265156,0.01446855321553743,0.002316742119403234,-0.023745159570454623,0.04089714529202504,-0.07512252595467145,0.048072748765381194,0.014125266790813232,-0.0011639362640226414,-0.37053960531336344,0.10896336985650193,-0.023307294565064467,-0.04108471806414239,0.10868909856613622,-0.037275014388036334,0.020535143313847454,0.05814956964114579,-0.005254847844529578,0.03933914376172826,0.048489193995083835,-0.01834709797760816,0.03718171912284342,0.010493174495026986,-0.008477935755240598,-0.07712078758594232,0.3063152873856766,1.2966043913305474,-0.006385953920968024,0.03218237177640937,0.007756907790097335,-0.016758900528381124,-0.20407577583956285,-0.23161913558252878,0.07777019270331,-0.014509229970158577,-0.3762874930419714,-0.00979773710655403,-0.20003141727862522,-0.19922144936338393,0.11309945609422198,-0.005744384988037671,-0.058428789109416714],"b":[0.0013252835737631585,2.5773535318984298,11.946572145148835,10.387954594809298,14.749497352687149,10.58528106257862,10.444437033926484,3.7389843405321166,19.04641752144355,5.2689986238951825,12.242431879247228,19.177857281616696,0.15990582914895413,5.830211799403742,4.762902196471277,3.890467145091918,10.123543600155793,19.959221670851623,1.1436122540145854,14.81008678538242,0.5036357533166447,2.5719527943396914,6.243947465183894,15.507530072236602,17.844750725890947,8.184041987656098,18.268114585567353,14.632621008852166,18.678904727287716,6.8222446395681535,16.24724605682441,9.912241580975323,18.257868042638414,13.587631595112445,7.888411689329238,15.063355607947395,13.36146221851453,19.671276901704676,8.924803282669348,16.92970798292695,19.420679738224763,3.3974572709738293,3.6745720035245544,10.64705646199803,12.804216904374947,11.653122730809011,8.01974584537044,14.523052605026106,4.431634188588114,9.737861534613677,9.696432007469742,14.059278476207698,1.145153446372631,9.166818297013588,14.647084006380627,17.46572530534705,10.50861216618133,11.09791467203642,0.9230951049182057,11.742897010889678,8.80349302480283,9.797411059168773,15.351008383821352,1.9312900975805203,12.342722385708642,5.038737276271887,1.7930404377974796,19.187319905853293,15.96321409107436,11.54112251333209,19.14672585669251,0.39218322186830523,6.094176585513358,10.488572680062491,8.550148285958365,16.29696427543972,7.149528054724881,5.936240139840834,6.505955111455033,0.9564348727820304,13.757257746118437,2.69563299862396,2.1673897871746606,16.651587890331264,16.87373225445465,19.38589838327983,6.463580494017758,4.042563092593476,12.405961929346262,13.562427659270426,14.199462745368884,18.971515585456107,6.584458034057401,1.4508505185765674,8.08275627191518,19.923630917005934,11.771022722465192,10.708858016523536,14.101144659994747,4.71915089497414,18.371642095140007,4.5043873029306125,8.804047837492739,16.752928878688614,17.622992736121994,7.34722866774062,5.0427294434715675,10.842768622608414,17.31547251623511,6.407516110260216,13.761213892672984,19.979274060293157,12.98121815308232,2.2141372199626153,14.963327436965766,16.01477876674965,10.380548939342393,15.75664090966091,18.16216454660775,18.162655602372794,18.41368153395061,2.8654429361276224,2.597104406182984,16.07588295184225,17.11600448367947,19.418005640895558,0.25186426756948155,7.435260750040578,9.198853022002043,10.636658193676674,19.87924581261739,15.83039152089675,5.432568997956708,19.936024641857756,13.32561787821939,9.77734743339234,5.964121537388238,2.703450120480415,1.5661781118481466,10.65297257225842,15.56401490760813,12.139534167863637,15.218627802243008,14.01539058297499,18.232463650263607,12.489611663217257,17.514120167261655,14.000750563565596,6.584052507737925,1.4265859826663796,11.472559102487402,11.897638051833903,7.936648707394616,17.33476368337934,7.215375091144147,14.222126172200209,6.214971135666567,3.3612478498980325,19.70261036838654,7.4193519664981,17.312916784233302,8.117191221588893,8.962861689182397,17.278530926770536,0.7954471286971776,11.22469814060787,13.382325556799577,3.3028058565403207,8.910650557028102,3.2036320063088386,7.169390936673037,4.8718407446792344,14.801196325293947,17.43282432051575,14.543617227289317,14.844057379701038,3.659282327094351,18.399741121125153,15.41446650883227,1.3327705859109695,18.983696303684976,17.20246779764048,13.16770518930332,6.995538521509976,11.838616440942854,10.179931242877384,1.2281698916376582,8.930927936857032,6.400395029042061,19.165657665689054,9.41297636060995,11.287401334841377,12.680125087198672,0.43713921297026115,7.128919469986998,14.916220321686499,17.20832223516161,13.497465492611642,17.044982210289504,11.166565714955784,4.444795480555976,2.593220873448847,9.991170051937575,15.297609023987512,10.351350582381734,5.124162262517986,17.172716217803714,7.819171374103617,11.012543247293305,9.856512505895068,3.026788930348583,16.41817635964008,4.162995582865161,2.0432963873960075,13.899295937755918,14.038237516439814,16.546466795621818,0.7165483237983894,3.2010773548676186,2.0048800849430704,12.060515299800647,13.139499432951878,9.33467108586743,7.773607642896483,8.16817558418892,14.72630489790333,1.7990827058082282,14.592157161548212,6.285722294732459,3.943781117398122,16.323301757606306,18.35077363161856,4.707930504159172,19.389177654499356,17.47151950868638,16.674982536192907,14.165906451990757,12.102868930537003,8.457241902548866,2.3795301311704176,11.431205893204769,9.291075268789037,1.0010143740983235,6.237587195657133,6.334320592726481,10.641585188369977,6.726317046867676,18.811046410316628,10.852005096220726,8.27623686793336,9.614283531229022,19.061314387241218,16.412373444426066,9.94872917505138,2.333333797563193,19.681994265740602,12.251264563782742,15.742907121513369,1.1086250465258063,10.258212032661493,7.080864556525741,7.6647270709975235,14.41517180231315,3.6429407056406937,12.933577098410588,11.69514893239191,16.561693004620356,8.6859132730936,19.674105716100012,19.379808327094384,8.409804139532948,9.743171803159502,19.562502151320782,18.98952548885579,19.62101052344069,16.47596935522976,16.014974942091186,19.146186259063725,13.644724773451715,1.45315005487626,7.465785711167667,6.539160814206406,11.871409401380237,17.774845803872882,14.86911194149621,6.597006094008835,18.548348436291995,1.4118934632969227,16.207563363205054,18.402385796322722,0.13534491703770524,16.386432069467606,1.970719019823286,7.56940894535763,15.943120528850411,4.468711469792299,19.051357444989037,16.01333475014063,6.759334154019898,16.413598410630676,7.2489030760553685,14.197743202019826,3.911979744583558,0.1503394752160947,12.395065513021608,16.87797637887588,1.801941583007669,14.558289341338554,4.833431380639932,10.484039526402963,3.2878093039646705,1.0779077942567072,12.78411969892819,2.6593576304937017,4.165622351688585,8.765832976904573,6.622850089557164,10.150932892746379,7.127130045360626,3.633985656298089,12.381484195233279,2.5505329170272883,12.119630055336742,6.032111627259291,17.77549334645025,2.7110015330946435,16.37580377544235,1.0250559331724762,2.808472439946299,4.680212220235198,15.830842155897532,8.628907790224583,3.0355819647534643,18.246022190787393,0.6556941743670386,2.44427416139954,15.006302315816491,14.153301883985714,15.87806385853126,17.478318352639203,1.8957504437707051,7.629601432648103,1.577952832325158,4.688059008994978,3.0167530025610567,15.757661949508606,16.28262609643282,1.4071753973034484,18.905902044050514,9.978113370989462,13.10450488172696,16.31982159775195,19.341682139438205,9.229840061339093,8.974086061334079,5.987618171041946,16.623583325076126,6.66434859470177,12.58361486354001,17.493197221027504,15.24332398184454,7.199461831578939,3.8060661163244403,19.01184604954888,10.494561736990429,14.20011310208594,9.629404445105942,12.454951043733011,5.868331636255006,1.6452893402584268,4.1640555426908366,12.826794764854931,12.36737334824392,19.828741349585655,4.978135723420083,14.322167266588517,5.22682540282112,16.25700384695675,6.183136966838654,14.564084295427765,9.520345987832034,10.811612460831302,6.881136147625178,1.4051833327648566,3.088365623064595,9.140200182801287,14.551590787752936,10.410563994725548,2.9899705343220573,5.3465884240883765,14.834197347418696,8.268722800385572,2.106182613019567,10.586644190444225,16.061435472721342,9.329614580780543,14.874482636601583,11.082138484891173,16.98979180890659,12.091906966288345,7.8654397193037395,17.50655110200164,19.573107574510168,0.5369438434273865,15.947579986905541,5.310348238053977,10.178898324377066,15.912164833118911,7.95394371098086,3.0971110770909327,17.441797094902917,9.777483079416083,10.511035572016954,18.654859853065876,0.23405840533017308,16.379595254073173,16.069669532566223,12.422148395938336,15.832140676309038,4.757018053953455,0.5647453015270187,3.1811871249394663,7.91373066841055,2.54379542061689,18.03556976712789,15.023238201683453,10.590962411793075,1.2561171834495877,1.5519513071446323,8.628178495563393,13.084206736304932,16.434335188893023,0.01044986468649256,12.019357937380661,1.0881227194268606,19.01614488966088,10.936371853482196,18.851478241897336,17.79051944306788,7.355306538059034,0.2739155761104861,5.582633840523212,15.059207451492131,15.725898381865232,7.546406821087968,16.64122022236451,14.541421627210402,8.646917666726432,0.6202370651165179,8.282798864926804,11.829511343467672,8.068546940618951,13.520031346439048,17.451373611173114,8.971553215908772,16.168993249371177,19.1090433631328,7.019118883309612,1.6388997923845317,8.161438474121084,14.14422055762563,19.32611387658751,11.919960536233699,18.777421911717994,8.78542411570766,3.039670689221863,2.9136025654320896,0.8896247490026976,15.303178158089983,10.238395583850197,15.32046361500823,11.436381496539397,18.380079529695657,4.13736205530753,8.99317408050656,4.535374863322343,8.997049179592915,13.802910948377324,2.5760066447029084,4.322049859130481,10.058815654452303,8.268310116535327,12.827505438672224,1.3530984317695038,17.117950811595605,7.843325268887553,0.8811433575049055,14.365585333401295,19.552286322641347,15.573966139700971,0.09486026788145807,12.269446935959314,3.178870161272278,10.752345863623978,15.737073065695316,5.87826355213505,0.4312249228274112,15.54878484127357,9.852160547384393,1.69308548824616,16.681566230919422,14.79307064708349,12.433864007254552,3.084009971272854,10.038873033775264,1.005147968050144,19.688797421583427,0.16957694089757336,13.09143930047808,12.600365351238239,18.548476037616744,18.782678695952917,6.242283538567763,4.4958060816705325,15.16696195455349,1.6807217620611992,1.2934480107452284,16.19761988837787,15.794783866880898,13.13850662370144,19.01012139761043,9.375477184294873,14.847698870561686,8.777496856116592,2.7521734573732415,14.959493701423998,15.498369976737596,15.94727595461598,12.085407137096716,7.500365226388994,0.47447991624862684,9.057767096714691,2.718380818900541,8.225304056194819,0.11367346786786303,8.467296060970195,2.428124213543703,19.228798234456008,9.43292453320912,14.407864342350125,11.11453027841117,2.5954733691013976,16.284363939941237,14.403561470327055,13.988778716178878,1.592100881566103,13.95417058998821,3.84201283143641,1.3718160154930414,14.942021431608108,10.360640845505529,9.059669572445156,19.62418903041508,14.571467133071883,11.056804076643466,3.8149918702170504,1.3172076576778702,0.5749620034860259,13.358247575788011,0.5909870321886368,13.750223512491226,18.420035965907786,15.16695796977714,11.059390492542542,5.543045177510315,0.6732952376912227,6.03613532940825,2.3141777684097242,9.368849203162842,4.662903345069176,7.053532450993458,19.32994272801124,5.7087075657957564,5.248630392266338,3.8915796060267116,0.48895162731354525,17.338883733669643,6.292289212587887,12.92682680718185,8.583601117644516,7.427989203818535,11.934067506914317,13.675334416091864,4.846344648156173,9.734399087659504,18.57004150498974,15.051433312333593,5.6812761192130035,1.2443367981557207,5.397919455264746,14.26499097339821,5.888057122528445,14.90361635875248,5.527365292551973,9.635197483133368,6.599236027739153,9.178646297896798,16.80997251912409,15.684131904896667,3.290001553466797,17.074071162930075,17.997870260705866,1.7505463314237968,8.673554817639516,4.982799131385067,16.97577783770186,9.15794921623515,17.376651253341755,12.951082735740446,14.196795222853513,16.825362193850406,16.115398907662456,15.854596300748295,3.308848830035487,18.749909776709956,15.02048111218751,4.002173993054612,11.72790281657035,13.162471718236937,11.892176722205381,19.092058709406558,11.716368564780764,7.922965689743489,4.621018801021735,5.92504375995996,16.207153428242105,14.536360552180962,9.197742823428365,15.25026467760183,6.881081251498253,11.685468725508684,12.30135413944291,16.882531977791686,3.962263647799471,7.902140655753818,6.232926071100331,3.347489594638091,16.049805968699747,16.757155265660924,7.051649425046391,16.366318305146205,10.020788745855143,16.56328440902557,2.0762736334143694,12.705556468517196,8.416829560859377,19.039238744415265,11.099138263190834,10.658290909611289,19.393703326695135,2.721035343028304,10.16939611847734,6.039671763910612,8.044128776128602,18.80163259839831,4.4155221661120825,0.22420310552459632,18.723704364330466,19.962258893458085,11.399264067529966,7.361483023975897,2.0308824332216124,19.31136069625274,6.669794584470878,13.716761799668088,15.41342605551575,18.45071072449818,8.753348034669202,16.0091305931697,12.61063076055462,15.55321697088694,6.026321823386969,14.213908659704542,14.249515086357768,11.63634195039931,18.26644347896188,0.3024742522247692,11.171858497459617,9.813604762272572,7.857802436299042,0.12575896270608844,17.448789037299917,13.234862741698347,5.449987805325209,19.711152104134932,4.824707463862352,13.624012799969138,14.14437891446433,8.64554167006406,1.6714463078204256,7.422835002458208,15.687410301093575,6.141369898132978,17.195298007420945,8.080874569243036,16.418709466171908,0.313128960547715,15.231230673750717,0.44181731153383197,19.871576434151464,12.57732389404811,1.858042564926854,13.912080124715743,19.239973310101874,16.177826312615796,15.600716588630018,2.670860287364407,19.866293876748372,10.61146226466433,11.569273918272218,15.772224220806299,19.97920786011706,17.99228623314946,9.87632136520844,10.30649028027554,9.70239533164499,16.054094565185867,3.7763770047898104,0.35935125286983727,6.150738608581405,11.549695026565532,3.346751539441759,12.513773284138598,15.922756981971467,14.497045287146548,1.6881693102314932,4.385563366218594,5.33618366825944,13.63120193344054,3.101451871369205,16.385484962658644,6.214204287411813,15.449829234062653,0.9933105826888733,10.74193670590085,0.1868244470487168,11.10213009900205,4.463959378051361,14.184877038710306,16.34266716465109,14.867529774795635,3.112887059877365,1.410520362001968,5.093154867892968,2.864971976505304,17.80555394684796,8.829690149613567,17.129069071621124,5.70572488270261,19.951565374130404,1.5590485350615824,12.278339896418856,16.548611122984266,12.364492049093707,5.573026309859737,11.279637167295746,12.962201478720932,19.861951123400893,6.779909335234127,3.171951847980967,14.659317259683666,5.25899332108501,16.02140802172675,15.350236328329014,3.254454191688021,1.0778443551599182,11.729222504983913,2.6006142067461813,16.59347763885782,1.928006111493188,10.127520474489593,6.1292572513309995,8.858636929844735,10.23320926162356,16.004813992820676,19.562114066034866,8.0426415450966,7.939796824196184,14.827484691650685,4.929884020080184,8.203439763058334,4.309908291975413,12.644881849705335,14.555611360830998,1.8773847869039306,5.4394509625206044,14.485280694179842,19.153846438457087,3.9245899331340084,8.940040691571829,11.304254998834349,4.907068896374707,2.6269146211944383,11.005949676640654,4.454885734741425,17.29126478310797,5.211324941022881,1.9204292678521195,14.956443533460032,15.101996818828031,2.551286520652236,14.82543652456846,13.854532668317763,8.563320425128715,15.346509281678525,4.668269354121932,8.79797614406517,5.5065473152196365,2.1192605627452554,12.606166011092853,11.119413197008342,5.10754766950138,1.018740864130021,16.95202169163055,7.035334482736602,11.483593168933037,7.696909457843066,13.312400027954535,10.898747565183825,13.932682965606569,7.375839185448081,13.394000374283848,14.115324609467699,0.27212397070705663,1.8145393037725288,13.883895680332916,19.665414966476405,13.227305312453774,1.9192987030253095,15.042436799771908,18.403894059126976,16.16278077080907,3.144869188108501,9.450785587840693,18.023880568234713,8.671880278015056,0.7639298769147107,4.536256583551332,8.82940056485352,10.725813050404685,12.510594396791923,16.345971415937566,8.839073489633012,16.290785085536932,15.423188534272638,16.91709385501461,2.823077238228451,13.263901109732572,19.786328936011056,1.9708470431244818,1.7716527172690721,6.569288971748861,17.598233848040763,1.0740905499937403,3.1726337568462615,10.627055816985052,3.7042648350449836,4.299462816779425,4.062421335294379,2.120243488637903,6.203515017787131,12.15067164317892,0.06216694134766332,14.096918900806639,2.508532894262303,9.876821326243533,10.654654793547408,5.860233619684498,14.583963326218598,10.72551533421413,12.906933402443101,0.3694852793924053,13.333197634194814,2.7497829191724943,18.037156689691397,9.988099674613418,1.072560815498802,2.5656402494728248,4.228106653290404,19.600571835290634,12.469890563016758,4.760614241431278,5.378712051243384,14.710394312226324,8.579084961310045,4.783245416773072,11.766201158160516,10.827450198846865,7.493505108811815,14.643620607618487,1.7104918219962917,18.321655530599497,9.374542331237162,17.366105056426036,16.299381576411882,4.893152319133134,15.373959119022786,5.579993520745812,9.374125455008112,16.409854428785668,15.477322003634253,13.165482995930834,14.673879640119356,7.377735264104532,16.15530619299772,9.476001360083313,2.2604226337154554,10.624443332635858,14.948221020001803,2.5637785068583474,8.188505082332656,3.6498304930907866,18.170249581919414,7.78340815530691,18.158460723111013,2.9689355177723353,18.65087594606749,4.989532052362331,10.695396999553362,3.0126297416548953,16.539720526415994,7.339280193020925,16.57238850575116,4.7206532593894845,8.566629241953233,15.920047884916894,0.6853749913624485,14.632934364772453,8.240036322654408,16.482576888956395,8.574334005598182,15.189314181164386,17.35909495331981,18.605177253896933,19.672814956518934,1.032717074729712,4.25476815797754,10.944624659304193,12.087103050054338,4.375507709809936,5.051905130244623,12.489687395127248,2.319327645282936,9.749416428601982,19.596257158916217,11.847507276621005,2.2568079529850626,6.481054817109371,15.979584826404665,18.145899925355838,19.569751275241828,12.206278748833972,19.059818819744304,1.6921667130798435,17.97945860560835,1.9555112463395696,7.192778818135008,5.0306562411712585,9.714967470111784,11.178189806585914,16.093183626911397,11.888413770232722,12.667811495377332,11.675209085354275,17.077182848690544,16.56599669584933,7.497229005153403,1.3142070925942795,5.976412487794258,14.953334692358595,10.08012484671854,8.565052812026552,17.63705512868443,19.05573960638794,8.371903475655134,10.781186121826112,6.5612694682682715,12.134518759666339,14.732001488820835,13.854546753014901,6.654003063401981,8.784400174789585,3.8526122110683625,1.9474848588914195,0.374126959806067,17.48897790091092,12.277412689004343,18.168521693482166,12.10807956948364,2.344745637097305,1.114740262223961,10.051518688831823,12.012599262058835,1.8416090312233058,15.667282325501017,3.1206035086050754,1.8677571239365243,5.43497595603891,5.02771640052281,10.886975180130886],"mu":[0.7272693144171016,0.6708343836349244,0.9334603917543953,0.9700102393975965,0.5786873469594502,0.037212196345614235,0.9415133165482861,0.5704079762520642,0.9869414817866282,0.6789224698302541,0.24339981762737262,0.9450187980458995,0.06263282938441339,0.3763744382690608,0.4664389018181059,0.7848065980855978,0.46981341548868305,0.5421002757439868,0.11081655928475587,0.06204850448862942,0.8629890367271926,0.4948223819880224,0.4341346650258662,0.7835912177347046,0.8572431805744167,0.47402834665950166,0.14708679236586342,0.7733339331277607,0.6886355041364227,0.7303777450297091,0.029971296329221797,0.5166989343301716,0.41266050944673793,0.7921219618142934,0.8788924320754652,0.8803225383904547,0.9654673945999654,0.4952716930115135,0.26435156208715016,0.061758559997229456,0.6533389397362954,0.18648943035500531,0.588453309875284,0.6044911928304626,0.6569181233916708,0.148337009290193,0.762845224348073,0.9456176446861806,0.3265904584064714,0.02043835402111993,0.13320773593660862,0.02824559372876534,0.8272978385292591,0.4181168302707845,0.3455950055733812,0.31751274121368356,0.863049191247971,0.7203535389960252,0.34040496030468836,0.06776467072715442,0.21989169601652492,0.5083714340261423,0.2461318144084701,0.12568593914618287,0.5909674738241633,0.3396889801504175,0.8635046180246924,0.10615700683323714,0.45610103190697027,0.13707204008822926,0.41431099505374136,0.25324846092240083,0.996478200809747,0.24283745329628914,0.5096056909555065,0.16564190351689656,0.11289228074439572,0.9565773748563018,0.8771003552191139,0.8267730575121381,0.7145368821555635,0.3445454422783252,0.25509199883370526,0.9793997821154059,0.9153643845229009,0.3671735104513094,0.9080069921922465,0.1746214609923924,0.04259073832800864,0.06100177897478476,0.7622936264056821,0.28141703488695,0.6112483068579337,0.905630436598861,0.5174376325029586,0.4301329877161906,0.6965006740100883,0.9307659930120507,0.2537543870416519,0.6584509033749346,0.13431632081087197,0.040582847589733406,0.9775970555754367,0.9611445347683625,0.441423089252184,0.5770604619025346,0.44562396231567325,0.9297839576922968,0.9130487329882515,0.6273244762354775,0.019384790169540533,0.20558965823644626,0.028596092469295398,0.12034529661580251,0.05162132445715417,0.7068547369206,0.39648838448494983,0.07974561915334877,0.10160353045229686,0.547829739851073,0.838419071359721,0.0011421581245028012,0.772379411035752,0.7334788955000089,0.45098470393725965,0.6839224351147519,0.12873961057215477,0.3704291220260898,0.6449090218099467,0.7792879814826821,0.7541633669412156,0.4244404295014679,0.1260075805041847,0.747945607905216,0.36411657815276643,0.9165151687006485,0.117341299477008,0.7954647716009073,0.8142797896003477,0.9107197996240501,0.7197087020949557,0.3462935998622747,0.5729359549566153,0.011459872606997656,0.8424039810872292,0.9667009870395946,0.5908159309839627,0.33205719521737587,0.9119972175314965,0.20184278928664967,0.5088911939249854,0.7541869324226198,0.7403148893335962,0.26241007757976,0.7064117074011689,0.8561562138392229,0.7864225418345152,0.47734693388576455,0.3415962963447474,0.11959032802679559,0.6459962919593538,0.5312538432823648,0.39553578833237224,0.43640219577566297,0.23218416013685683,0.8383654241383944,0.09640525154197288,0.046202214503613837,0.46298544777774664,0.1298662025403039,0.26811769804730035,0.28957513303987126,0.6963138885610585,0.6763072327049964,0.8957286061455092,0.7835895531153183,0.4553233198659927,0.09540173298634569,0.011247685726891499,0.7145726490339046,0.7169438869656455,0.7521377872191708,0.9860763648594537,0.8183875828130203,0.8197795234412246,0.561566524942211,0.8905156308842817,0.3026112260004832,0.27839389104505297,0.6535403512967908,0.33738922886288036,0.4009886186759488,0.17884658408537413,0.5271554100025464,0.855089739701371,0.06072799711360388,0.837876987634788,0.9705028594136587,0.2742417707450213,0.5740329116393765,0.5065837769697488,0.22599927735356373,0.9193554804919748,0.0956103619548192,0.1775188057605026,0.005115078865111089,0.32882360687643697,0.6712439127645462,0.5580020121239515,0.6572731727459493,0.8807611451190085,0.7147289330196274,0.9975020049109167,0.387291067809411,0.3109817169625946,0.08450394839133679,0.7673205712438194,0.7729944780318923,0.9469909839380564,0.2587809390668778,0.5095751916158573,0.8249082791563898,0.10573726813760409,0.8472243414249048,0.5503136782680156,0.7301817055001258,0.569179437541905,0.5316958627705803,0.29760805442776017,0.4135053104166013,0.419987979104421,0.6257476651695766,0.12846428638744323,0.055871098839110234,0.07462954191687099,0.15336772926707232,0.15031458308145673,0.21671586532888898,0.9796050514686521,0.9393934247368205,0.43848738626857653,0.22889526552395467,0.3199581697356222,0.16271645466961382,0.5202048193880131,0.27409666023706825,0.6473615839166158,0.16918992630505225,0.5638693870583407,0.1400104242037039,0.496181897479099,0.3670036402661603,0.5273046187131396,0.08637903971574068,0.6254584080097878,0.6207029597378257,0.03598508082020935,0.5378804966427906,0.6416936928191519,0.6606991326008802,0.3893760026509836,0.011318119306026775,0.48806666716364666,0.8700122998469835,0.1600511046931965,0.7502972815977387,0.3730718438467222,0.36851526960475733,0.4853491644619006,0.040336661062853496,0.002690853832219675,0.6233860336260657,0.9078255462075404,0.6777505948874016,0.9531452283361008,0.9447957172284591,0.6364136619037009,0.8318735553042556,0.7266865457233957,0.7818688489066739,0.3621809774194664,0.8284756607732264,0.15250450509846014,0.24610306702044715,0.001477268070018356,0.5718184812181055,0.5067209343751615,0.8540486442708002,0.5557082669516185,0.47039754644647913,0.725495787471556,0.7082251073731687,0.5280691744148591,0.02165349665387284,0.12357885986148198,0.19766093624332415,0.6052364956405982,0.7455201535420843,0.27091593264200275,0.7842220529828858,0.0896060874148048,0.13893063820825802,0.019462065905130554,0.1283976949759098,0.2550548392281118,0.4650733894378789,0.5828269002750777,0.656739223607909,0.47479610097624114,0.2561483179569286,0.3442523597324203,0.7822215690398444,0.9993848943421189,0.8282976434981204,0.2769190205422132,0.3003651882724183,0.06167476398751748,0.693269888122493,0.05583404097947131,0.9618636298757746,0.915294921659735,0.6785181995176273,0.6241645524196795,0.1543876515724083,0.504941513942327,0.3728849396194105,0.9922429193563078,0.5077843485216713,0.9907324162209652,0.881432640441427,0.6445215291666642,0.09854499276358109,0.5998927960755251,0.45324631138929883,0.1476205035803817,0.5866631787681891,0.9596327838790586,0.45499577419222126,0.8528324281591839,0.8575526469264272,0.3662403533563796,0.9673535862360152,0.35148065433335707,0.6757571236922397,0.8624559683578772,0.6305982406796267,0.955171909859156,0.990787963229181,0.6628814919556305,0.8063075082068736,0.8091302393735966,0.4390409768528427,0.708440200010737,0.7219367410095436,0.6994220751113531,0.8265243056079452,0.9575851504588972,0.8227705634869042,0.8903584351164646,0.962217943221424,0.609787430283963,0.9663924012262664,0.5788837582818185,0.9660143732871751,0.8827284019494475,0.05845689384447095,0.849132728201546,0.6926928479835606,0.2660742869179318,0.9982559862640514,0.9914835182046837,0.9779865237884924,0.09656431154416723,0.4656835402451025,0.1710949122712786,0.8386881905353099,0.12977619505715188,0.8589989485165066,0.792808887583931,0.9003391787896877,0.20278337758276543,0.5268399363360188,0.02013243290407507,0.15284722589778732,0.08223420175754836,0.2680067933784118,0.008689216982116443,0.4625349642643457,0.3584722662741089,0.5708526530438971,0.36034309965005695,0.7631959260121701,0.6897301257664037,0.4898223823663592,0.6272512016114258,0.4538057898008665,0.7230797685189769,0.6185700228100532,0.01629106443281869,0.9549338491169748,0.26854670078162,0.8295672202858559,0.45301596493271545,0.3267192008761508,0.9798830234035327,0.21004257165528184,0.0867473681519555,0.15642687588289927,0.4194453660401176,0.7656250443611623,0.7454423919150004,0.07933641395589941,0.07628897728480144,0.15349310843777553,0.10303576845411477,0.20204297196877508,0.5479047714812608,0.28642657662515947,0.54136723618052,0.09529629544569551,0.3468733665317587,0.576364385664883,0.7697262873527455,0.7519327952871351,0.9189079340603543,0.029365009651705964,0.40193218184046176,0.5593359442129335,0.32428806313179503,0.7520316709690862,0.8099939147995621,0.825703664983543,0.33852939789639813,0.9192649963550388,0.4240376493448097,0.46598384800861137,0.5276587919623756,0.07008986280719287,0.9916435937597423,0.7678115751611396,0.26798936032108234,0.9389394891648557,0.8310939547204585,0.19307861879103738,0.31549988858995115,0.46473567427445683,0.402168486984239,0.004255600768938939,0.33843131935203874,0.3084873386276179,0.7793908545646047,0.36476747878834903,0.8167368055028295,0.8643059375497788,0.587151438885577,0.297501133012706,0.6174529810657097,0.12433048227027155,0.3972566646733804,0.5286873848812581,0.19669794725737022,0.991924096008832,0.20613414622034676,0.421607455130911,0.43944907202598316,0.6061117223742545,0.03934313480958074,0.17233663390524878,0.7560301313974378,0.18140980956965613,0.543255163979182,0.4878950614158486,0.005508051994382868,0.1635486549458749,0.10311905161416934,0.9183451266958711,0.9060536274546134,0.8479838417681724,0.7826641453068666,0.6099893061117327,0.450987442446539,0.09711027861727173,0.46188607220466316,0.1955503422128111,0.1784950603175841,0.6087384061992307,0.36932137337399085,0.6001394062352918,0.9238058713622967,0.8910318147424088,0.9333194065016444,0.8797458559658884,0.47492369120627687,0.7245166863626777,0.2618824092697678,0.1306850365047636,0.7351242041990884,0.5588070272251533,0.6378606929986461,0.11319212836663706,0.49278847107273327,0.8330148517501694,0.7632223421517073,0.4442501790166451,0.2789466679532624,0.3188963935452154,0.14319862760517155,0.06261603219925127,0.9779518201233022,0.47759514694383687,0.13142312818514257,0.5120053041990751,0.8800894420348284,0.8766174164499452,0.6018144037477127,0.6553733335269876,0.8396556462378255,0.5890360265536956,0.21196071711278308,0.10603470705016127,0.758613577744025,0.9605136863592696,0.7024338277901605,0.8759492047047719,0.41058759763807795,0.022693678027361663,0.1611855068890049,0.915022503906529,0.742676834848151,0.5688837318361413,0.7803722466402654,0.6150263874258501,0.4408053048566789,0.29077492496759394,0.23508391589142574,0.5390849357590524,0.9535238533456742,0.4448424164974232,0.3562708371922736,0.017129915441381316,0.9990160738081286,0.5726373368326727,0.38239907257737005,0.8244575583926033,0.6254436643304047,0.5542209497953672,0.8981375915197287,0.2428497462172896,0.8319267444380476,0.7531033912026108,0.9853634344068962,0.088808016919256,0.7273232350954764,0.36697753990175586,0.6479374888305363,0.1379953718415705,0.9374481586223928,0.6011676572071722,0.12882706824319312,0.47036882426760895,0.47358712325427366,0.10893918335958008,0.9781605249541512,0.18488127107194785,0.5545984935238373,0.817459471898625,0.6450358985572959,0.6597039933079019,0.29550268951232095,0.14503043718566588,0.17212463961717162,0.8076629125755124,0.9109624762849062,0.016592728467436313,0.034003452383910115,0.4575788204748983,0.22444511731033834,0.5843178032956984,0.6143835033182976,0.612548391712608,0.6666638180807523,0.6752854703250801,0.30434192822801465,0.6892633374407029,0.8195797456170208,0.10008079765387023,0.9914804005976894,0.39335801830032713,0.3350565373664247,0.7048374845188234,0.6791525135437699,0.04542289236337016,0.6507918702709832,0.7816448775903633,0.10096907701222446,0.3080347636268219,0.7331985189467634,0.7176049347975224,0.44702270107317776,0.706320437233507,0.38084556071353703,0.6461287226599866,0.0628635333562737,0.23705394529722312,0.6593737511785847,0.1903664875340394,0.3773696049130131,0.2989773738818189,0.40014655376408914,0.6826575147420628,0.002204472701252458,0.770778452085567,0.8255742622371758,0.008942387207725888,0.3338802411370021,0.991602486103593,0.5762154020140153,0.5051589003870394,0.10341194877861826,0.5512257313342066,0.4845215460413166,0.1103107143082993,0.1301832561273757,0.8191867824052148,0.29506313257863814,0.385120694307755,0.637888752424014,0.8241825003084935,0.8385283892905127,0.7507762544166681,0.6203555677177197,0.3215310745909705,0.6273037318130761,0.02360003706590441,0.030223528602097316,0.5066910342021467,0.66479131010205,0.6499767929785458,0.5088634071133631,0.1284923158947615,0.11867599138069562,0.9556690244664627,0.8915469414960377,0.8881328632340184,0.9165478397427711,0.5952074785376245,0.9601011501896557,0.377698037439018,0.0811069322125304,0.058824192684099774,0.987224354979773,0.3718440153134055,0.04806257704541439,0.09853313125041518,0.2690696966720356,0.3962917983620178,0.9213320396545701,0.7186188328853755,0.1743087612104819,0.3451271304643606,0.3405316399757441,0.13858817013552716,0.9125004263639962,0.2439282676175878,0.6961289874237016,0.10403219786280204,0.10557663752365642,0.24008780668763618,0.2043441943119828,0.35930193472742844,0.26230980208272214,0.7438786867555798,0.35833722989951733,0.20922565292071282,0.7283925687271129,0.4615899496862663,0.995063807312677,0.9052510427759441,0.9120861921194618,0.4628006456093494,0.07411345866749186,0.7360819218961359,0.366959372256104,0.4642444670223853,0.16106977719992055,0.42181228233281187,0.529033702043693,0.3094089210517108,0.7850063638057696,0.510405643581894,0.5685527520462454,0.2601520302286944,0.2947777774957261,0.8927550916122193,0.4378212182707666,0.13308109155233838,0.49017520971057404,0.7341862209984278,0.24399966732758815,0.9164680683590034,0.40611401663137237,0.24161664540619254,0.7340462520307358,0.4701031868144585,0.1917043722919778,0.33167062008514714,0.24460471783808546,0.19761473727657397,0.6814349051146853,0.1819151088058233,0.12327422176439584,0.17601439990186263,0.972215339063522,0.7068493574359631,0.10301950172722418,0.8709298202553317,0.2682858641521775,0.4121021674211931,0.8603038930185769,0.9399615836109727,0.41335281687831094,0.4042473313369863,0.7094174025813273,0.3323752277010934,0.26542010393667437,0.28340535021657165,0.09091676973228391,0.18890718200969814,0.6771634396557484,0.4987349411553903,0.8476674044237931,0.5781604257850737,0.20592120952476267,0.4927549386693162,0.7596973748631188,0.40918839129549256,0.09765624150695773,0.5258663964403687,0.9824856678555227,0.23552634092333702,0.15061902370374436,0.10722413171747136,0.5613788891311315,0.721451011903038,0.2613020012006384,0.5323409431002701,0.9906725879540694,0.28904653283210147,0.9327172424288892,0.8613005986704987,0.15822772940640406,0.6681599301439956,0.5874101701478476,0.7596746596681492,0.18420276101446897,0.9846645902787985,0.6402792557807551,0.32678753102388747,0.718037249371902,0.31481107998818514,0.22596488976382112,0.18599796412589975,0.27766500993579735,0.25950553404146337,0.02929468573177907,0.9681113956001792,0.8708470348682444,0.7717089714151946,0.8869218554086882,0.325030177573316,0.8908711269677092,0.5511080065586702,0.14318843766834588,0.2038060349478099,0.4477569620279547,0.47031883609768577,0.3782180316477748,0.24754537969473334,0.9410246017314954,0.9166805024662958,0.5746941133885313,0.7120520545681561,0.708984094307944,0.6530924924617032,0.7943382203638023,0.8085315371695181,0.13499526215780366,0.6082335076927343,0.05573709136519356,0.14076231589250066,0.4730931673695167,0.6919107282233414,0.5557966636304288,0.9876462430028277,0.7948073569244496,0.5725404837194707,0.23105383429722903,0.5507586659566419,0.690699213088058,0.7355265653608818,0.9593970218211223,0.9826764016772536,0.00399136469057737,0.9910641133304532,0.35511267377610967,0.9562689163901179,0.05494076425206873,0.33197738060798776,0.45472187354142357,0.408400476037901,0.31138213461123976,0.22567688016923948,0.42916064020338296,0.8433828741727551,0.18348601855634072,0.7279625078839795,0.5965459197848608,0.25577899041870733,0.9320454741057356,0.0717053741324416,0.564739793598088,0.6715871215941109,0.06552407940786664,0.11950076933428022,0.8251168789397128,0.9816221648377792,0.2813549217597069,0.07895508035074794,0.45121761420643547,0.7686083707173408,0.6509449138229604,0.24900611829764663,0.6979910633053685,0.3634254939281836,0.8883362232352001,0.8314185448501643,0.9153877294619401,0.08085149213162013,0.25421931959502797,0.5649589992781283,0.7316618181276588,0.3175434096711236,0.22357758385780624,0.5212253797943225,0.3570828982431853,0.761710031989133,0.2915369688016445,0.6942632738371108,0.9744258009194178,0.1803646172140836,0.16436426041011742,0.6650321709536056,0.1092691169976241,0.8177574698025072,0.12498940799811975,0.03515084383197209,0.9346344679333629,0.7458999486356794,0.7769405756753982,0.7275296755439671,0.31539644598145444,0.19292678419174214,0.29011750312881035,0.2995133582414564,0.9755311002282221,0.03314070198956931,0.9034210472501336,0.6751830149697482,0.26282917020786734,0.03595536194063875,0.9721535236492926,0.9170361925893995,0.8403297595949049,0.6508731968469339,0.40307252675508565,0.5966895141644586,0.3722278154603318,0.7674790005155465,0.4053066392675633,0.3356238585445359,0.9136677485239968,0.4339177368601994,0.20099645569691948,0.08500668332586025,0.3744532793576376,0.823653280148392,0.5892832639358758,0.6569231113462397,0.6047829061695427,0.38387795581742945,0.7688020493904335,0.9530181041267092,0.8019914913148682,0.7716595657626895,0.006279838264631188,0.9974980963889502,0.6384841866852096,0.09407860004922375,0.3324420319864021,0.41457440728690687,0.0749977614625339,0.506316941515458,0.29309608133937815,0.7521278212780442,0.17841305546814534,0.4900571645018881,0.7175523857089061,0.08202547182843634,0.10736126435472881,0.508234206292606,0.46183037845340724,0.23165433146342318,0.7932194572364919,0.9484306982246773,0.11404642691388234,0.136354049970131,0.365986867524988,0.7037097578669527,0.6096810584010377,0.8793468720282556,0.3321839179613417,0.9887259760328564,0.12599586881719316,0.8748848182422486,0.33682022437245585,0.3100210830114354,0.6755578738259216,0.24423695343562835,0.09226641868610752,0.9938205945802712,0.4341823824576345,0.045829217955800194,0.4823496034338275,0.3878537455955753,0.793941529206029,0.3916332331774859,0.2294768900114581,0.48083333389890615,0.7716765238622154,0.693175703651363,0.11820223333785407,0.8530604018664267,0.40015746594685164,0.7158338832875064,0.528714372168344,0.4255976614225472,0.43684755965897315,0.2849011735132114,0.07768343165880154,0.9558478111235305,0.2619965938006319,0.649682191150923,0.9111502636146906,0.7566121698109545,0.8161343929472993,0.1442123851714816,0.2519329272493396,0.9747228013947287,0.054052334241522004,0.20504804105255703,0.26291102360341423,0.5960562681332684,0.3244929416787503,0.5044896382770314,0.8006643873361594,0.8366321399907553,0.4893085097165675,0.9627786854863922,0.9304029335211448,0.29064238036512324,0.692171877119055,0.8541849233527912,0.33488501497740875,0.5673490347215437,0.03629473289530605,0.4908133718405072,0.6313145061525636,0.6644976684371238,0.9322578109204913,0.04957478072033861,0.7073767952585088,0.9093639322559925,0.16535170628631812,0.29382458597887506,0.15629055723678253,0.03394044643338878,0.1247039179806333,0.9931028465217695,0.5228859323074229,0.08937795514466385,0.896350742213516,0.023690406845822798,0.14466257264416127,0.9973303978586754,0.6902918354822194,0.5853638089873068,0.6814562199473775,0.8976376997083526,0.35391133499299876,0.6122910444938503]}

},{}],127:[function(require,module,exports){
module.exports={"expected":[1.1471436067372296,0.008856242332258683,13.15423605851927,3.5682940353304824,6.952941737261123,0.7546308600651009,17.707239498313207,5789.789796749269,0.9735640331476973,2.048752306059403,0.6350426477616243,0.2945460617516581,26.70559019929831,0.35786361410360584,0.7366292881691006,1.036380982637269,2.0630766770571425,1.4393397692690788,0.872177728187766,1.130193828240558,61.64918677417891,18626.416600381533,21.013873554677637,1.0307531308279378,0.7430031150529298,0.16680205523968186,0.9872094705980126,0.9278935407206268,88.60390991343534,26.55781024572054,1.6938336111746883,1.125544874493169,3.6514456098717742,0.4395891698981888,0.37347990022008476,29.494734385058624,0.382210834969734,0.6423601300204427,0.9633426922690674,3.542249249672944,1.318922962177199,6.638363782936725,8.410657390717997,0.37574339615513513,1.6901960429606562,0.5337329728468223,1.7882519737720026,1.2121250136477564,0.6844673070805188,1.0380083441830164,0.9285681221063219,4.158641898188922,2.8076713383845093,0.7138633961823083,2.585961037460407,0.37616417563533694,900.8862356233594,1.5983654469385777,0.797489607352994,1.0030314967609257,0.7318549401810935,0.24409657746142668,2.3071660941734184,1.0740688211850122,1.0617670306701905,2.1937201056290734,1.1147420497734912,14.069183520843012,0.5333019497434904,0.8014869707455932,0.07750111502065565,0.21180436400151906,0.681039979521843,0.8929022224053478,1.5485344131440033,0.0011896233664614752,8.162662672491285,0.8574295245401236,18.855280890317637,1.234930860402596,2451.2229084556216,0.15702730699263723,0.7878190297819148,1.4847085474380783,1.37260331514563,0.5360075336229763,2.0764683279929796,81.50678150044749,1.6638996845939495,0.3812180774461414,0.16725998936609066,4.391758362670139e19,0.5855387719366485,0.0006350695231113436,1.8347887253017592,0.6871676626497351,0.14992340624704464,2.95807487491814,0.7367305167660194,1.9867027998198636,2.1743296550942564,1.9661141417627053,47.079531865531735,3.555266993202261,1.3816415324999252,1.985247072717234e-8,57.50071527929239,7.720052858171571,1.356118695603523,0.7239017907615846,1.3726598114115465,0.680004733312483,0.3783367410249983,0.369425810885392,1.3446741700358373,1.7427919143627073,1.7711799514068969,0.9982476730236591,46.349783569623284,4.10005138047583,2.5900540842250357,0.5799776082737771,0.8781422326382576,0.9575551566710956,1.6865326482870342,1.232050866325665,5.643384211923796,0.2786719861248837,1.5556243390652824,26.701003398524264,1.170720547049504e19,2.4352345486492575,0.6544506210092743,0.879926972457497,0.4613273391639104,161.41654019941862,7.133320928488439e21,0.31677814091726936,1.7030655365476877,0.7713789489001852,0.3806000948322405,9.667653494930669e-33,0.8647310594459889,0.29793226773299636,0.9974969174105334,0.98741177010977,4.737409640360295e-79,325.6256655210902,0.9127943864389382,1.1258848224966187,1.4562508131571605,2.2229392058763335,0.9299791880530238,26.98632812060192,3.6074761872357684,1.542540621378138,13.315502290871683,0.5594068418701323,0.06301524231561015,0.9863520417995215,1.0660728680311984,0.5704707922797552,2.2448908555754485,1.0004846301067631,0.736791760365484,0.8606509173572805,232.0476216888204,0.1794864030485385,0.6818480289547509,0.00413270117203902,0.9948704374494911,1.2580290546674797,3.364342106127948e6,26.026629774180208,27.040003060277062,0.989745889864292,0.005355495525919408,1.036578891016059,9.483934477524334,0.965940916183806,0.9423808784525365,0.9907809276357125,0.9971716403527274,0.5457519779208966,1.0066052611564755,1.1538785591807834,17.304985060837836,1.5378087612946443,5.409468828278394e7,0.033713360116000186,1.0739879508789565,87868.91751066559,1.010504375111826,0.8796644701138183,1.6588233444530842e9,1.2765411778975981,60455.34389768205,0.0010688419627646272,0.5573360635836371,1.990754200611067e28,0.8807161963828326,0.6941126244786899,0.9412719447795771,0.4651635154906665,6.006357060167755,5.0447146237514815,0.19709674070039734,3663.7094829619305,2.5463964610530536,0.01755304757663728,0.4857988839730725,1.2122201513355733,2.4958681465305492,0.9305298263105685,2029.4921925675285,1.7352150996417202,0.8373215069597681,1.5130209717897596,9.372971401253706,2.0124007315730554,15.74436458796104,1.0560539687165784,0.3529448330745775,0.7125088515707508,1.1587245556338983,1.2378318298212982,11.41650735461752,1.0563584446951118,1.0374795402324262,146.41455178877,0.10283931199712454,1.9841455144210143,81.90630692152807,0.6942023481945937,0.9192995822068203,195.29089988498748,8.229380720992207,0.8527913688829908,0.5585032289537332,1.0846133907852913,13.429640860742918,1.6834123969688564,4.3081032189821574e26,2.023067048368874,0.8432718124666622,1.0785681753749412,3.71358576038055,0.21178566523115377,12.215084276501813,2.3814106445912704,0.8990194199063261,6.251726225729649e-33,2.094863293117197,3.7022687568434742,1.80641900469842,20.937928118166983,2.001470192609959,32.962597181670404,0.5636735218560385,0.35346204221037564,0.5872171837987785,0.06762048775984929,0.3791747559616728,494999.7419906175,40.2419446348712,0.761124889017979,0.5332645450065329,1.2673499938180315,0.4641000760892317,6.207146151822737e-5,0.015083848858893958,0.795580094555836,1.161119256491927,0.9338717959718393,1.3732043784934864,0.6523126354084466,362158.90015824704,1.7068240079319348,1.3658359959879314,24.47464599414739,4.8663344673610514e19,1.248243986062997,33.65456297710125,5.629564144760207,0.346782372182216,1.03224674956582,1.0655527247078764,2.0332771537273957,1.5850797953763156,0.40338346220184923,0.39268930514483025,4.046383669936681,0.00013952507272836244,992.2963554709078,0.010007289822221054,0.006496446798488016,0.31926714501763515,0.3285061241564504,1.5739574324658216,0.7464393433112009,453.404191187155,0.09576537824861224,0.01210635285364354,0.1727219317444963,1.027226455695304,2.350573996978867,17.30390768557061,0.0002048881127785589,2.33717509211783,3.5694404520387275,67.97472507343666,1.2754296753271188,2.753134168003854,1.2829854227733566,7.045477095213368,7.983582414638524,1.802110299974484,0.9036318835245117,2.4916306791065176e12,1.4779239815302974,0.695731320004729,91.42229405283308,0.25567317410632195,0.11750201078086892,11.029456856883257,0.24210350516305268,74.36201012061939,0.009733304590085395,2.63020897984704,3.190552551709354,1.1624351694586308,1.2654728442512706,2.2218926315422327,1.1463370587722135,93.76788850045955,548037.1742048385,1.6569539993431668,0.8907604185105913,0.6935912744348469,1.0873528570036721,2.7628884915750693,0.2867849717125412,0.07987966806206112,0.6611351091617016,0.9788965932750879,2.091132336756416,2.0519013251339175,2.216909203423235,0.2775025322240767,2.2639289175729234,27.36506995228711,0.9956421706110246,7.322487765429626e-9,1.6079513132067895,0.655001942366001,5.098517221630881,1.1161782146790244,1.1910096702424209,0.8783426615703355,0.00886171857357772,0.30771588552895157,3.0433937315419484,18877.035244241022,2.140102811550058,0.991220166320159,0.9421660065270657,7.05799393794449,0.8847264368324728,12.254177286611244,1.0448146040034847,3.141298264606816e-5,5660.034488694719,1.058290215740575,1.359268985692767,1.173231569523327,38.5675047511821,0.9432374484655408,1.0145264193477097,2.5389659681180583,2.2547731345130524,1.46626631987543,3320.0101908900306,1.5137817756400944,1.2055632822946667,0.6130064458008316,0.8910008881103048,8.46827740093092,67.70014779232851,0.22137969053066847,1080.4035266925084,0.00240221268741221,12.376284322436714,3.129894290277259,1.580977275301705,0.8569215108566963,0.23272224450174245,6.479968181197472,1.6913516625841605,51.60515837400482,0.9493882489092519,1400.911894780229,0.5404053681298236,0.045676683809814225,5.648896049189998,1.389832592482638,4.35944128702348,26.322058404216733,6640.554922212976,1.0997340710604933,12.985585817672423,1.14752278375573,3.2389523749642235,1.334183048038786,0.530573545208209,2.906762457887135,8.01824919005283,115.01362153397446,0.7255657398838808,2.2867064075090413e-14,7.937875914137582e-7,1.9781400074610107,1.155102243590191,0.7961268992978116,2.2820522538048102,0.7545697106574374,1.0144816217259405,1.7046978170236013,3.252925064310806,2.8585414247888354,6.142217874815278,1.8771851292907455e-15,1.3503556036919562,0.5031673953494655,0.9233052895578885,16.905870660240563,0.01565453507654384,0.8918919712042244,3.797767370077821,56.224663558931624,2.3718819539206177,8.07915155725293,0.8676759056860524,16.064801912771824,27.319991551107776,0.06923638087119384,1.6908113245276213,0.15692832456045405,1.39048627558708,1.8318624560460914,1.3006212252873743,1.5116472396826643,10.984889745927882,0.0013208143904145627,0.9572032264228032,2.2620600323223465,1.2507478991325944,0.5430403996212712,0.3738819985590121,14.578892889342617,0.7667793475600068,0.6538342038781225,1.442275172793792,0.7002402748847836,0.07365466221882114,0.8155328206523128,0.06653876281983323,0.2339477286979805,0.5039920138509376,2.218565848075967,24.292185419152467,1.2641155281218632,1.223510753701751,0.9804370485060073,0.297744420800443,0.629906850669489,6.337696232645581,1.8016298465059692,1.5347848129011595e9,1.1058085309042072,0.6793985266389656,0.975863197316124,0.27218375648827425,0.1406300705117805,8.769611672483697,4.62327906055723,2.8642285577879787,0.9211465016453142,86.21997449328572,75564.37759865237,0.522425372104267,5.24525161982487,0.9781973898658716,0.003457615431727746,1.0906507143489066,2.548847876823512,16.26316276182767,2.03646709317121e-12,0.6903623492575568,0.172305300356114,0.9328530175683759,0.33541344496373904,92.10041050605079,2.0501244199108593,5.407759362276255,1.0992921214964013,0.16284356857178076,4.6865490406879795,23.366262310745874,1.1662433379783554,0.9439986406203792,0.5349413605097851,0.0021299326821251656,8.125223775903327,1.1202368496456758,1.7065002370782152,1.1384123589696622,1.4024597213247627,13.118782232169895,16.334654697280694,6.802405208150912,1.0369601875755854,1.0869224190478184,0.007485225661124,4.228856649096318,1.7933966605605813,0.5927744092295161,0.17222610571136415,0.45149234605523203,404.39240957870396,0.7702185125907716,0.9122243937136782,1.0081767621828972,0.6800078738754503,9.066190074456877,0.042526384415582624,1.2127641230170214,0.20987607124553267,0.724372477638223,0.566253270538518,4.054512341549139,0.001592541450328179,0.3878496027301766,1.7079922132980028,7.107612281738583,0.6074180440262702,0.7281200347085021,2.557779900807733,66.92328765195535,1.6320384641275298,0.21029556887196157,408375.4141239709,1.0854762505552376,0.36973276090451,10.045577110163952,7.404805770357553,3.8194682799548887,1.2714010049291553,0.6540671455776688,0.9899925363066872,0.6982015976200779,0.1340050780355877,0.2575932472391906,0.329897834794704,0.8369568675758781,1.1510650452748146,0.7733683471693057,2.206004683388071,1.6366477739154142,1.2900237379436237,6.805710392177996,0.5319907158894494,0.40534352938795304,1.941353996472318,6.994895164248699,10.606742061003256,0.11525853620706807,12.890355551372684,0.5706680408452327,2308.3404175466767,0.7417222902541153,1.6695998680212552,1.8375515405619063,4.644394355925731,1.8217185479974105,0.9294632642386019,1.0663090310445382,2.192575660454484,1.2389237432759974,28.355045973531354,1.0337950509100433,0.7966376515045105,13.303954384565326,1.0057526287670844,0.9784101319536556,2.6698285088539045e-7,2.0258745821103785,0.9427001674459594,1.051636402756015,0.33919508159126793,1.6577788026045404,5.931153002888947,1.0258317496526443,9.589384297349384e6,0.5649245425429043,0.06802294937296843,1.7222680080325587e6,0.02079581816430812,0.7271167098270627,0.6064013136787567,0.806315613460261,4.590194744026181,1.40895053139793,1082.3254980302424,4.4086135076118,0.53416230692214,5.815262866222075,86.50756356031573,1.149946394227024,0.9073483200293863,1.6612848197427085e8,0.8473466228186232,1.2881959677075985,9.537697510528993e-5,1.2728807580293746,84.65159668725035,1.1074983665072733,1.1677675593403778,2.1341793665012315e7,120.09558085489684,3.9670874209059734,1.0603738779527971,39.85635008415582,3.0347855131543375,180.63661731731162,0.9127594181389265,2.455321139036181,2.3732139602398594,0.6812331383419393,0.8368480840760322,0.4362353382723817,1.052582763128277,0.9465225779403466,2.2156377131081,0.14325731404448194,0.7233697017783272,0.22160513310499036,1.6109901410342824,1.8895822617227716,0.9625730261579307,0.41529732901167454,2.1584985455835306,0.7104696909425585,16.905712868892905,0.9856156218010029,0.5536919744273818,0.7909283332057409,11.341229538007497,0.6572084720076682,0.6020540250768727,0.0431768789963735,9.012312475137884,0.09792193373547468,0.7106901751643057,0.1763387829452978,20.855759926905687,353111.4378103348,0.414338629986485,0.7014479942305037,1.20012769799348,5.333389687169944,0.7865835725811834,70.77005539445778,2.3015370671160396,0.011498833202318752,975.8160826471724,58.1729725767419,0.8375877798788622,0.08827011037793599,0.9619846491300206,11.605935513501281,3.8536564640761104,1.6886117391296782,1.511532044743183,0.003627405913882244,4.876028117823549,1.0613473969845553,2.0452554912471754,13.936534723623419,1.135100106520526,0.6685593934448383,1.2232295135412856,5.4243336779284395,10.002575259949117,3.9976252700100234,774.011808596638,0.0172162681388509,0.8465080819446203,1.03292049998269,66.6950280299645,1.5787760958731851,127.01605571655172,1.044046822996173,957.2417372918055,1.0010408025911364,65860.2556725893,18.927320890319198,3.5128770638525157,0.0020643665142343524,1.000916717940353,9.495030531483762,2.451017009866329,2.5046615688519975,4.009737064496569,44.77703602685985,0.9854399359890363,48.128937894929216,1.27687310540581,0.147573089127438,1.004981375437782,12.391367553599784,5.971365031920771,0.25905561467227617,21.3166605283123,0.5927563743495886,0.5654761192146927,0.011248511604069429,23.10265901397241,0.5689298066291655,3.413475478157289e41,0.13810839721633097,0.2958571113574683,0.7386476173860936,0.5624829764193636,3.467273314094833,2.551013313531172,0.7141100512317138,0.8563044150509954,1.3941489363676356,0.027890958232867157,14.715943984385877,11.664964818013262,0.6731395726526694,0.19744795123177072,0.6983850586377046,4.7621571511751965e7,0.9845179037863528,0.3124333734230116,8.940374600024583,0.22990038683173078,7.8761798981525475,0.5121935987882243,0.012452156760468059,14.274476354569417,0.5603458044102952,9.34495869629224,1.8070234030799952,1.2707677183925442e7,0.22618917838537383,23.26571730308088,1.484947444009744,0.9627435875741858,1.9675087563885105,1.0289251414822707,3.879378753424486e-12,1.999653575063923,0.6447900039090562,1.2329174872190627,1.7816738397668463,2.6256910199548593,82.49003897381372,44.846847839370014,0.8796619102577687,0.17505107863879024,0.017217915483185155,0.11339544821476394,0.20109602729699974,0.3176179998189457,1.153573455438476,1.3860216656373909e-10,6.977890440676731,9.91898777028741e-20,0.8181237065299367,0.3117682677625878,0.37741137970053373,0.7952710037754018,0.2222314411428361,0.7300568293748151,0.5253489968810237,7.0311849774224,1.6816587134725915,0.17318947757443398,1.994474068243455,1.9327151400045957,1.0889899471755216,86946.68542343953,1.0507106678441127,1.2071050977037092,0.04078593618188971,0.7459690762618053,0.7977303112311445,1.4715562150769343,2.064435684911715,5.75597941311366,0.7145778540838791,0.45321834347679024,55.77797621424776,2.114815339528882,1.772638001377418,51.62765366414849,1.4665108430457936,398.95358332378896,0.9621884612715335,0.03805130145252442,1.9015030492319166e-5,2.617056887801417,1.5677782478491125,1.022498837497987,0.4337961611294587,0.3744317502191578,3.092132290982867,16.366858445958528,0.00874549888467911,211.01741870809127,0.8942001217899855,1.2905743592265277,0.9004475653207363,1.2392464342107006,2.5894578206595824,14.637269545751014,3.471618201772874,0.9476604302600017,165.09051295715975,3.082134941049461e-9,157.97741547441456,0.4650270969928785,3.5999573701956574e28,0.9393075589230557,1.0850464624483687,0.0008270960975874352,1.3486094436206382,1.710249606988844,11.120608847389255,1.359700023343964,2.5166923327732165,3.2314226919398456e-5,0.1326028236902571,7.757164345534344,0.8901905233777021,3.8936827669613203,1.0286657421337334e-19,18.956153399448834,0.7646313046651241,15.792332815651001,0.6382814168033311,4.234845862779389,0.9504185189346713,2.2179962333737957,3.539956240133779e-7,2.3521809921325123,0.8679917226554253,0.14986625526257005,0.002415226606445186,1.457936723926675,41.12375947483027,0.4918683455236884,0.95474630095477,1.3040411340874798,606.8748494202652,503.66734377916777,328.6580403687698,0.48735029612551917,75.39412589774786,0.8717472590838184,11.249196933397888,1243.6499265711304,22.98814208740214,1.011692044378345,0.5887892134973493,0.7651830347993667,0.5543474359340332,0.01080086732617386,0.7880674874680359,1.0442424383360094,0.9106796422180967,398123.23052446736,2.969601440095657,0.05647484740404751,1.4208332744323546,6.584280620638822,2.370401331976338,0.267373457459349,17.890918928543098,0.5863869900617764,3.037039751741131,45.24835566987692,0.1106146828246259,0.9349155323752842,0.9529819996097594,1.0389817126162162,3.3771915162349937,1.1595754415029649,0.18351348399415043,0.0857883773425952,2.135196743330099,20.325564044075783,0.8737986477405805,1.5766882377891058,0.9021938151601013,0.6627441837492208,1.483036426638899,0.8573355454858314,5.447803651580606,0.36424960318790095,0.9408479262508315,0.4987892702379875,0.11116588273877036,0.9323604294066962,117.12513106130218,0.12627056424803013,0.590008608821823,0.033378190377221166,1.7428738052252062,6.236345178912675,0.29780170816240187,3.1667616423828453,5.821110336795357,1.7869385394751018,0.2398055119318742,2120.6692327932606,0.9837249200409565,2.718394263005445,0.6022648365211879,0.5135344629748214,2.8931170802746923e-25,1.5771808221362802,1.2054410308120225,93098.93679080787,1.2939169082202002,1.9923765001999472,1.6929599342748856,0.9837133087617951,0.45352353432900405,2.1308291244967092,1.222975110898319e-47,264.06334954033736,5.953455495872007,0.47753157533156004,7.27300140274589,270716.3089552884,5.490906248171434,0.7947402738358422,8.932921878391785,0.34619513564486476,3.1128624347114173,0.6852327652387744,1.0990182223479401e7,66.78380297796409,1.67202325266908,0.25569023497722393,1.5039738943398646,26.96844432990742,105.54739372734178,6.1793947589529274,185.8160359010801,0.00015164236047776475,0.26845104433090017,0.6460750876613073,0.9261720076141291,2.91900930759915,0.3652691708548104,0.005994501317518596,73.2560082838359,2.2084483844494107,1.316318415874929,6.0059909145414424e-5,0.1334047649569266,0.49924578805382197,1.0926604649227973,0.5401088425579414,16.208923871414385,1.4135160330807663,0.9005868234977543,0.8739133677657296,0.7840521542349421,1.3540704609139493,4.6451579105746434,2.1885436548676904,2991.548863559749,5328.89536703454,150.6761374041731,0.398391088259966,1.165499391027173,14.493844096850456,577.9833706474326,0.7788445278865114,520620.4053180678,1.4942085259522506,31.216145817356978,0.20690608223971452,9.098781393365],"x":[-0.0471162742283005,0.9529945972769214,-0.38439777926546687,0.27882490464158777,-0.3495888544073022,0.08416776123524317,-2.421199497346941,-2.6866435520084484,0.03153335941365559,-0.08404523877764847,0.10494293072748004,0.21186796651401507,-0.23199538439081926,0.24597739297204246,0.1940255870549462,0.13470604819057325,-0.11738451469206998,-0.44074248741534827,0.15730294680830892,0.14950301738512262,-0.27333126722249274,-0.9964365306822558,-0.3809649845145984,-0.004845515319580995,0.09929861551980235,0.2833342871859662,0.08734251083582523,0.09542494035017865,-1.118319418097954,-0.21621957343994047,-0.05125660077953914,0.13368096619241432,-0.18554018615856144,0.12573123073938447,0.27926912715711816,-0.4837420956124847,0.17002583736834168,0.36563248397924974,0.01841239470696915,-0.1844262310130703,0.1188850531367425,-0.3548139163810247,-0.19231731349948178,0.667760278475363,-0.14303460170278579,0.0853244891855297,0.18842685950380697,-0.05694684904886693,0.04545401613063954,0.07230539405362713,0.10800060943210321,-0.1924396239191376,-0.3317402219856761,0.06788798743003799,-0.264511255295492,0.2767827595739431,-0.4584141665352718,0.475156384041268,0.0956847569664219,-0.0011637119098495408,0.23313068313060126,0.25646258236823766,-0.10454089116889677,-0.04751390359190985,0.18082077204463584,0.2366819654664516,0.15877276002086294,-0.3132896002760835,0.07270034864160002,0.031527272843490495,0.8364355277673579,0.190273538150096,0.32032539498556356,0.02395622577040718,-0.05866484034410169,1.3421583691380463,-0.2654461998376529,0.17268759133577843,-0.2527421137465695,-0.05297882527874753,-1.2348477212729825,0.2164447811906558,0.5270759215007252,0.18787296073510723,0.1163117062162767,0.24415800307368007,0.1898588676299304,-0.3857663422728639,-0.12615645336003703,0.22374849754516002,0.37598751693677757,-7.425727142322992,0.0664544283399976,1.0371500656099608,0.267721167926506,0.23743360961728927,0.5319947766520852,-0.11348642261717426,0.0661024124754733,-0.15503964321744426,-0.08734651710334779,-0.08644799626919353,-3.219672873601293,-0.1426528063952442,-0.053325450546687636,2.898642233107746,-1.0024767453806889,-0.8542015311856495,-0.06371899254811222,0.04288555676771347,-0.06582463248747578,0.04509163095869062,0.1919086503719057,0.13187625107403317,-0.14651539561419358,-0.25456339255685767,-0.43559101396111166,0.12022616007868736,0.24759763705663673,-0.34975281659693286,-0.19360841740586002,0.08914210399715167,0.049712186146087745,0.02051741002045454,-0.1588812048973825,-0.0260292468064921,0.24730453178058237,0.16454613143522057,0.4082246369663516,-0.42182490918457227,-9.422879498162834,0.2191945239879296,0.1312484496401261,0.028129658404076885,0.3323736461444528,-1.4689934626049006,-6.452485393512423,0.3256081627513555,-0.11989024674398693,0.1102516782124987,0.13686513271266176,8.981765733167094,0.023432339607561414,1.554147216306803,0.0025604640244015764,0.010764311215551381,20.615377195123102,-0.633003604946369,0.06089721984925334,-0.01228862878464998,-0.05679008923396944,-0.09989807857010996,0.02423338975682937,-0.24332226075421745,-0.13548582270460122,0.17598581804870675,-0.9383618145381425,0.33404963132408383,1.2515865434652678,0.024109193558073283,0.12336903940102484,0.38548603733540543,-0.10032725606131601,0.012428226126624864,0.14866564395014725,1.7205318597158255,-0.4703177825175734,0.20266233964118707,0.17039025577433575,0.9462728092452866,0.13002334242742936,-0.1223739805323398,-1.5394414587290977,-0.842713783710999,-0.3605967032325552,0.13971380246664528,1.5079563358639856,-0.0052912666880348125,-0.7124710772702277,0.14468987371276798,0.19919840137414635,0.01566392451927079,0.18265759503180168,0.06266413777442714,-0.005160155800114308,0.18888736051234545,-0.28015001355727387,-0.059947031512434856,-6.285432831852418,0.6044670014589494,-0.011377982701608585,-3.7898586855944627,1.24783154661856,0.033971612858484546,-2.2271909619073167,-0.07303845791541044,-1.573015631215446,0.878818029550922,0.1438815043785412,-12.547963603576207,0.01793920484155831,0.16445695353361622,0.020783951543542067,0.24277380768936996,-0.17521921321310188,-0.14886305617639467,0.19060558746393996,-0.9235986208370056,-0.21362364568393152,1.153203129800764,0.1220725906069558,-0.059133941073799406,-0.1542520927934018,0.007996079353417285,-0.6982844255394537,0.3928395291235997,0.04673529648544028,-0.2009004979390845,-0.424465577199132,0.15165551491625381,-0.40058712154390685,0.15585228990285682,0.8662557186579258,0.04372684521774528,-0.031174197717690755,0.1766531830458275,-0.7085636977831268,-0.050660861802505064,0.32983138517159544,-0.41290249768917964,1.1283138872513256,-0.13788785686526556,-0.33280898707969286,0.06618099521117587,0.026591021058393616,-0.26607478865814693,-0.22116096806000227,0.044513103236120455,0.25729871149396333,0.33070991394192034,-0.2816629371194402,-0.20842012597082904,-6.29643318052597,0.3378707384844985,0.4561834033473302,0.08164670691347331,0.5744188959465346,0.2873776971726971,-0.2715501038823032,-0.09502285834587981,0.055484210194730044,10.890487996195176,-0.15926795195285348,-0.14000791458424772,-0.07751022478369873,-0.6067476777594586,0.49188455600916037,-0.3959585791888916,0.12482673165477443,0.14696551313177242,0.17809597949544387,1.067888720288208,0.3627093384757408,-2.4410107917971935,-0.9253412498449922,0.11342264685791692,0.5628345563580227,-0.12460795917116252,0.19071112521338768,1.8209824775635925,0.5336922022407999,0.16495359560875467,-0.03629214679009346,0.008656116315531592,-0.0647904252231522,0.10162729311644303,-2.832900710447605,-0.18398586276695233,-0.19856929886053698,-0.7436213218248571,-4.964441674463938,0.16612985300680988,-0.26549615376665636,-0.8621432855396499,0.17915441346102834,0.09979295284588396,-0.020576824325371335,-0.19971271240601784,1.0116856330857256,0.41814747550389575,0.18805334279600106,-1.58441731170516,1.1255197980946514,-0.3805012422058425,2.5153559379702743,1.0363273500812151,0.13997906859590048,0.2116824651130298,-0.2893333827544473,0.2345317607074182,-0.6326426021936715,0.5595894087535307,0.7362544380721774,0.2083532223678885,-0.003912931725652824,-0.14300003811169681,-0.25004986875491153,1.6581831309517863,0.24121127689938265,-0.2535921690315301,-0.2882120256976038,-0.10410436396645442,0.29288681986066983,-0.037301762970126495,-0.2655021798070243,-0.2849460461824609,-0.09149049336095713,0.021806103578931813,-4.3812391327225075,0.1342226985260314,0.08487514851074157,-0.3524088407201722,0.4102896067126718,1.840058323074172,-0.2891365381366136,0.3811789420824886,-0.2624612351894324,0.48140874954626156,-0.0928747752530259,-0.13601830220143235,0.1718159343605683,0.20334603345406466,-0.13102603794528073,0.21680020321867957,-0.5826274814808323,-1.2874703857747223,-0.05715558805021895,0.03169116033648567,0.12628908000119288,0.19940136046098783,-0.1188964929931589,0.3252687071411997,0.4196045272750659,0.44871890827841665,0.014634985773009285,-0.07328488788984722,-0.07186109477613356,-0.5250175476401675,0.16055399164510709,-0.14135941365626395,-0.9797328785960273,0.15315944567399709,1.9206353999013794,0.995253986619991,3.5522973684909283,-0.17862201581896442,0.12352315717747914,0.18527219133368505,0.1594700700810175,0.7273786966929364,0.1870206238399616,-0.12138474912883945,-0.9014182628343266,0.175832684572158,0.1625107203995796,0.0069828707787307764,0.4680158554952489,0.018295995904428874,-0.2497328525815091,-0.1216383349095349,3.0964968309925873,-0.794260473768465,-0.01974076356801366,-0.1104690173833267,-0.4169814933256213,0.22958891441361773,0.00783269099504369,0.10023075704983286,0.4348724416848645,-0.20873636056624678,0.18834725354637036,-0.21070957799464932,-0.3768879176276748,0.278445705637762,0.09534903372309139,0.11354002409454644,-0.22214496888827473,-1.374841025416818,0.34737277445020215,-0.7151218953710976,2.277942034866354,-0.35523193900898886,-0.141967298930249,-0.046570867149504036,0.01690111737615224,0.6810488108850261,0.472777291358189,-0.07545313940942217,-0.21917126262317663,0.4042139882331721,-0.6777342684549111,0.18494486724577097,0.3524434884104628,-0.15213439619914826,0.13862132921558298,-0.21804340357134097,-0.29981629202606824,-0.8030510784296406,0.1260345250879068,-0.2749862382752225,-0.021303860951375375,0.21943632765331206,-0.04045862778639214,1.235615022782825,-0.1459705446714165,-0.3736057086328548,-0.7088659908850157,0.14638358788205091,3.75961496451597,3.270028062040727,-0.09691077184131167,-0.018871071149456742,0.24656301034084716,-0.14522372720268062,0.1521203655262597,0.04841018648604098,-0.11739165874969235,-0.17653883237586165,0.2025040036579355,-0.3040674822678623,3.7633303698145095,-0.03403349875255912,0.3276082524988739,0.06280058938979471,-0.2498526650516082,0.8713346969259703,0.16685813423890566,-0.20663424325072088,-0.2969908852636053,-0.22544192082878056,-0.17820708503120902,0.020833595731521326,-0.5015815260893954,-0.26128885296800464,0.4198209500509045,-0.07917339048567407,0.281956852739765,-0.14938291546097804,-0.1049845444495307,-0.02598588375779326,-0.06442758434200624,-0.41911465645370793,2.666840823655209,0.01866836929210658,-0.23894042906254995,-0.10242646450287055,0.07513277536886254,0.4307533283062791,-0.21352125803819944,0.28843919135962626,0.057832991758393126,-0.043073019201897406,0.10212949334700838,0.5993520412123322,0.40359529410262,0.44119515089800165,0.2629126499536987,0.08125023421879574,-0.09936074302097049,-0.27435121651102934,-0.06400944372911982,-0.0248072689261567,0.02751859192145495,0.2279855510126063,0.058872554088982176,-0.18366585096536425,-0.11316857390253998,-22.051652906295452,0.10650236310312805,0.055385187910476474,0.15152186928613431,0.2641868562708809,0.24470768790903785,0.28716059873851324,-0.141653622938486,-0.16537702010288183,0.01620653239715092,-3.025485531636249,-20.73998886100448,0.1538496016076492,-0.17320665374337946,0.04476999518734437,1.3426010180056178,0.5425582173820671,-0.14226749658431231,-2.0422625139035935,5.0969608942379026,0.10736418926163444,0.31845444413644736,0.016388219735808895,0.14427238229063605,-0.8892845625107313,-0.1949632725019559,-0.1590484489554468,0.08832584829559556,0.33510677486419105,0.23607566544139927,-0.3769676963030775,-0.02455678847719775,1.1602358395074412,0.16614427424911127,1.3076847563946608,0.23935373936058094,0.09638761119609618,0.1502566434650817,0.13303971138989348,-0.0750101948548948,-0.2577611579585229,-0.3403368944262095,-0.7357957888192183,-0.004214308094178498,-0.02101103789047995,0.648324703983869,-0.14923962237611768,-0.14052283221827677,0.8831932760390635,0.3512299326156465,0.09094293228514516,-1.8529930395968708,0.07409364411950631,0.016981978585213886,0.1280832361116978,0.40275264164493585,-0.21064514755914227,0.7423534956393691,-0.03086165007079611,0.22134884980883263,0.3790022777029993,0.32270868535357733,-0.24953762938148794,0.8907162858554636,0.13423068967970087,-0.07650055537812334,-0.19040078189310827,0.22924935074893682,0.2756482179799237,-0.1314624726940267,-0.1976949873362244,-0.18929648779458808,0.35795910180012125,-5.071452776780415,-0.01037393228120434,0.20897787283429892,-0.3503023985458134,-0.21216479760312562,-0.26227492617062054,-0.03279723150213104,0.24020077693204145,0.0057743268886726595,0.06846173929311111,0.32989918574345733,0.2281520272374391,0.5075324608981652,0.03203586274674497,-0.04669789909979777,0.05204736207999394,-0.12173370471281522,-0.3090474733533392,-0.0464751848522206,-0.4313518525370491,0.07310518664562321,0.19202379971834627,-0.15220729802930583,-0.24974990228407523,-0.29543286126692264,0.4842348010820976,-0.23160466044884842,0.06357834591776923,-1.8222705879988008,0.24788619829775033,-0.17677269325395328,-0.1845516074908583,-0.22991364492829358,-0.05970916871615556,0.015645682004032546,-0.014889443150839177,-0.09185257341935918,-0.03528352004585811,-0.45296643240140316,0.1456256802064398,0.13609237265648913,-0.5406285200567544,-0.024305622190744947,0.0027110836148162565,2.6693658461627043,-0.06703579800976839,0.02940492677357265,-0.013261345026430782,0.13692972497689437,-0.0870446225298181,-0.4554131465969878,-0.018147855528439782,-5.603315154547765,0.11688363721073414,0.3237113668134266,-1.4862239137935394,0.8363266193864007,0.05080266461926902,0.17086290704337764,0.18312289837311668,0.19859703902201153,-0.1108844678382499,-0.6248134134773988,-0.14083423586989674,0.24384865454660448,-0.24377743915088443,-0.27918927804810006,-0.02035677791901097,0.058084943014766355,-14.968427230970141,0.30085322233956835,-0.03077381738947363,1.334142422371515,-0.0543250747650538,-0.6272822925442985,-0.03216814634399806,-0.034760414586910926,-5.584607594678619,-0.47820144627323014,0.2282531712581618,0.15374830956842062,-0.22194116512723938,-0.14125692300812387,-0.4182819096490132,0.03533481496696311,-0.17808048014642264,-0.1401577845526445,0.046838503404452725,0.022754468963842395,0.15125532808246067,0.07294590773678156,0.015624700866626595,-0.13830983980833794,0.22977364782261023,0.18715377385138082,0.43773300375281105,-0.0467170616340955,-0.20436266697964506,0.159163206600748,0.21134164527078925,-0.15283339294664283,0.10023211150993425,-0.3270022234960146,0.005004013902804583,0.23596263197570216,0.05018833578568804,-0.16128790847505536,0.13934674043959938,0.05480002552863872,0.8378345423744702,-0.3615595735341244,0.35927005020868646,0.5223596794738012,0.28405971504232785,-0.1973794668232633,-1.4808856316467907,0.2192927155197648,0.1941972355385708,-0.035984208044478494,-0.49675363171284925,0.06663999088109068,-0.3105014445690937,-0.08822586020842504,0.4701301630483612,-0.6699388882674921,-1.2529317576731684,0.0320372926467887,0.3634725240126545,0.004795731313279927,-0.20189092887924204,-0.13672942766526947,-0.0560392190535986,-0.08401522978856091,0.8303615067972128,-0.4695085013532578,0.24432516178257663,0.3901266186100678,-0.20971066712416148,-0.03501595293366705,0.09224615969282424,-0.048002052670208156,-0.21672201715667017,0.23876719732782814,-0.18397910805181972,-0.7222024135817066,0.8079999391095525,0.04318165989732742,-0.03919947096638857,-0.42682866050539997,-0.04925755602052634,-0.44394130314476643,-0.00827169578941822,-1.2320636292882035,-0.005976944673006551,-1.1164577616984284,-0.35201866445310503,-0.11782296558054803,0.8768162686272669,-0.0009587513029511441,-0.29114261376576994,-0.10032384759641663,0.29266297899941446,-0.18020555475248445,-0.545453108206825,0.006431810648101277,-0.28465548711160993,-0.131387308623857,0.744451720421636,-0.006030162372807846,-0.36968342612830174,-0.14312509764310605,0.23472308567049222,-0.1978979382835725,0.12805825621672107,0.5790032758187883,0.7050474599383936,-0.36550780407212713,0.4994695339426406,-18.78222499594378,0.36518766134841374,0.5086504112142499,0.05285083351326403,0.2928449112495405,-0.2480204939502436,-0.1226785862737973,0.05654249425849195,0.028695229958467072,-0.18218794940383898,0.9219084226442738,-0.20801784467212892,-0.7824422323772003,0.18004836070983826,0.34502339038627894,0.10828678197180258,-5.930645910750229,0.02193933810075746,0.13729788249269037,0.5765453505041257,0.15927871910002844,-0.15945049986946047,0.16934706763436874,0.4651003362803361,-0.18186329154040168,0.09593000104679483,-0.2424340108909387,-0.10534151457392554,-1.532695960000286,0.3921849109550974,-0.29692139394234834,-0.41179456576175033,0.07728696493758969,-0.08667989485737787,-0.011453089136490041,4.186925318391662,-0.14729214323459566,0.142845696091008,-0.10925846437929099,-0.05924880469394034,0.278867289577798,-2.008357265502201,-0.21756967977834007,0.07118841610894872,0.7531898812715305,0.47575814788547854,0.3298125318843506,0.20636120704272587,0.14678254750491915,-0.04082919766199691,3.7249302973351908,-0.4082707745032953,8.385741865168487,0.10463911439672852,0.4094363983881245,0.17157612369741693,0.04731558573129449,0.22931413654673344,0.03470917107964877,0.11484859854524199,0.9585564680849875,-0.057118159726445156,0.301952534624147,-0.12738404810399737,-0.10760250535732077,-0.0595797608995714,-1.4144532118083948,-0.008858330083576449,-0.04696822420127994,0.6766020492609353,0.12697976386694032,0.025005706028808694,-0.06943499483942173,-0.12711436448750782,-0.352215528778411,0.16391165135201602,0.1276444834199146,0.3047248661602914,-0.07777531623941877,-0.13792354791216407,-0.36080981751223157,-0.10528017454886474,-0.8120103376277701,0.005444057294846816,1.6040542912555997,1.1141702482283051,0.279756609541822,-0.0662341363935185,-0.006651537899215798,0.1879673124407567,0.21091212045488805,-0.10022069988540777,-0.21474378528743576,1.4005073644124049,-0.5772766068053864,0.20188463640377918,-0.035018588738111256,0.04176625616315355,-0.026165973212855187,-0.30909872748296413,-0.26082219417523134,-1.8537271809745883,0.030646738774867677,-0.941783872129192,14.087581352476827,-0.8858347508955917,0.11877691284787723,-5.99171933472946,0.1686943245490996,-0.022931957014038162,1.4028186193730925,-0.11022520364694355,-0.08659603431748014,0.23719939328770315,-0.22756079779670957,-0.2090212383481395,1.5057224761594772,0.27067822049029017,-0.19817535995511337,0.013313420932249631,-0.2638114800336388,4.867775241576604,-0.9227823635323007,0.20938348869731127,-0.1764669722142319,0.08031940450274455,0.20784043330294366,0.030304258391614824,-0.11515387044915679,2.234606337671696,0.2592631073876812,0.10305687882313688,0.39118036616057944,0.7454905032456632,-0.11241372494072926,-0.33163310068864493,0.37300123864547613,0.11497998665435577,0.2635531399958139,-0.4533034342903066,-0.7458616831696652,-0.5999039485584241,0.22073442386803127,-0.33629986667734146,0.17451144565023985,-0.20656771531595902,-0.3520683453083192,-0.3051459311294173,0.1297152765662315,0.16020526968518128,0.07808564569973808,0.0935324862347815,0.8289420532516791,0.17957782686347656,-0.01035985433465958,0.04498442114631207,-23.382989687279913,-0.10101389346963913,0.43642713114010334,-0.10539964405292573,-0.24379864591365963,-0.15919514582788769,0.1821133224084973,-1.1508854967900426,0.19854653095104147,-0.10551293794689148,0.45616331595146214,0.7830705555488144,0.11203281546349281,0.7522192745388834,-0.0061717220010935325,-0.158150397680568,0.2545198495854214,0.2232516769493258,1.1220697698941229,-0.10366081515389888,-0.33749538705924087,0.020331358501704255,-0.14489174642907288,0.05153572447293242,0.08128319547472895,-0.1015891928197824,0.12626180524243125,-0.18245336416339492,0.1490762857584904,0.1221053730010434,0.1416006521910389,0.347305529671028,0.06494045175046159,-1.606977181483602,0.268023637227727,0.15337883382610604,0.5809675184967675,0.1442355225565996,-0.30960955508488597,0.30118387353749176,-0.16306540131557778,-0.2259490858103312,-0.0806138964342207,0.3750679569803717,-1.790030338544471,0.2750544632692632,-0.17951725782161088,0.09437995959177775,0.19351335097326672,6.5477354675686765,-0.06902472266137169,-0.12050515243386112,-1.1264704246488813,0.28964514686552445,-0.06995614448034385,-0.05786689863916855,0.03204782782445817,0.21012586452548626,-0.349620708096557,12.938506461805613,-0.31331474741386706,-0.23330083969107934,0.11656315108655602,-0.19718542184239427,-1.0306029721335859,-0.45531437151134746,0.056177015847098444,-0.17805479526744233,0.2685857183529914,-0.1126898015449881,0.05383647810887385,-3.6796412245399517,-0.2654842663221785,-0.13449695891064786,1.5416686698347146,-0.41284512139539464,-0.29316074801057757,-0.35801199585220406,-0.3172150049556799,-0.21605948190561855,1.5569998938702194,0.1451907947999605,0.07245625357448005,0.02315836288579598,0.18405319579110657,0.22269199756020847,0.6252120800699289,-0.41820783972966047,-0.17301483931461575,0.13267752932228963,1.2533200685105614,0.7293801828339153,0.13133217966481875,0.09943636605694506,0.10402630270575458,-0.9309835058546063,-0.11526487619397308,0.013404825250524943,0.1256945455751764,0.8725892215307336,-0.28669371886873374,0.2955924857850147,0.1606552170869168,-0.9963666848681414,-0.9556290052127607,-0.3551625313129183,0.19439345161806132,-0.03133384951712759,-0.26239506650856864,-0.7595189021420274,0.09578360785207396,-1.6183992358571944,0.18881515414634326,-0.6299239209193888,0.4940420221011462,-1.1224506336682012],"b":[4.812374661840515,0.9529806601889612,1.566501622217693,3.4549497000089535,1.3510681606838115,1.877976082104218,0.21552652109829484,0.3179875990817682,4.8864744446128325,4.013582527878573,4.103572376655307,1.0312897046627745,4.214253338605282,1.8457896265085671,3.5392371347050666,2.253375024642492,4.192606028547408,1.1588805013514591,3.947385587729042,3.0379463696400677,3.557822337498421,0.548698210120786,2.2918966470373303,0.7599293235012583,3.6476543906976966,1.4503843232410796,2.3999907227599246,4.302453234578535,0.31619596859004173,4.4699176555337905,3.2477145562028333,3.7544266195230094,3.9080412985802537,4.046280391435072,2.643933617818485,0.802996044488844,4.164828221173087,1.5710446244792298,2.9440144497450804,3.1252494494018404,4.811001467977157,1.708621248047073,3.645479855812599,1.3030278285213581,3.3098817890097187,1.4557878558463833,4.639049701637256,4.22725231712238,3.651611593558423,3.1616047919249257,1.8616547500452718,2.320147045061832,0.9967255188015911,2.9451255674955146,0.2777241861266255,2.5572713824469586,2.158924325290803,2.0624122559633284,4.933460330885956,2.5594887201803687,2.463848923399996,2.194484376744694,4.781491928573779,4.295485521373394,4.357289634036085,3.210456009400413,3.5754457940304576,2.5360802283724784,2.2730567409344102,3.850772886959054,0.9905314222201878,2.173083675256413,1.9272829224205257,3.0936391093465065,4.729487526743135,0.42319499207287836,1.4531321661586172,4.792895163012869,2.4103279345628947,3.106931538548585,0.6347390743848758,1.8968672799630104,1.0564418972784462,4.677414832931044,4.969423831607754,0.9212209283763351,4.761899198409852,2.0090309583156616,4.450932846943355,2.89171994992909,1.5670307938020434,0.06795311812218485,1.7732522305444576,0.7745208476133114,3.454275802877919,2.92408123192478,1.7960268384422118,4.3791838798729295,4.854454318817481,2.7913491076910146,4.662930256386901,0.7707200274072579,0.2701683227118834,2.346807850812694,3.957912875652325,0.17555087878327602,0.9048267731238113,0.8049706448274996,4.857547191440249,4.128535473466139,3.991290588951204,1.551413231465757,3.834669299409766,2.30765414971682,0.6947170279554293,2.1217537741379178,1.2952264608023234,4.340060164463989,4.02671033717811,1.6349443880676928,2.996222934221744,3.6863181463516046,4.970798824178377,2.237351160758373,1.8651884146396114,4.211163181485771,3.874097171417784,0.37133668533231856,1.6976660249038422,2.2519692333558474,0.0860630186429201,4.231034073282957,3.970503717196979,0.65793626038544,2.824280451448188,0.6393928456431996,0.1194557370996141,1.833207030712476,3.556813375394696,1.5099530190479105,2.646008299911448,0.0150480925366836,4.5510062422404225,0.6164892447552872,3.6483786133490104,4.503268700267553,0.04274249280088016,1.0596138450517478,3.410892743996733,1.6503185129034847,1.1671960473566434,3.8281710501813526,4.0366122742059805,3.9959511637930967,4.195331368137156,4.960267881462496,0.6847518297661825,2.634191995636596,0.5295974852075969,1.3911121460933495,4.451890517905102,1.6259135675181513,3.9350140426067917,2.039989133264611,4.998077715026257,0.46801485150107514,1.9011922130712078,0.9687022352234831,3.1963116975146466,0.8359948763491121,3.4686208474723457,3.2554281848125366,0.5434885761574471,0.11718844532705441,1.8088050735323546,4.736405490704288,0.16095053819111138,3.251302720481938,0.8383000798790874,4.7836294819679495,1.4764638911855488,4.412470750862727,3.5481876761449707,2.2645959279367975,4.006513633914017,4.863810608712324,1.102829764606662,3.1936208953051795,0.12807745361560374,1.2646069872212817,4.930566822549012,0.13251389515504863,0.7033579473797325,2.704856018422792,0.3839039560294655,4.228179943848468,0.6016569683595463,0.48415150225441184,3.26725592348867,0.03745156959343077,4.982102731325928,1.8011862547471702,4.363447179702824,1.6105717286705135,3.1749409304199014,4.403969922058204,1.307221345314078,0.5500834419375689,3.6262925284445533,0.34297300815241627,3.346528427141928,4.374072251227483,4.738604428609587,3.1248087417882586,1.248529944022323,2.057444109587375,1.008218054946034,0.8681965220284971,0.899742242233218,4.709691579185547,0.9124768950921835,4.519528878248073,0.8511803303488386,4.969556399905017,2.2572932580560634,3.834984989116026,1.1169781852159222,3.851713760831228,2.0836652267970224,2.0084820854582364,0.7552344758557872,3.9145080812461384,2.537482746004762,4.597411118208365,1.2080258137854427,3.7144699691081637,3.3258566084651706,1.5411040477792748,1.385145766796152,2.2146457981386303,2.3682629713924053,2.953971296744833,0.051846196371831965,2.1203510117779336,0.7427201747847278,4.837037119203487,1.6536358140901275,1.3832320740061332,3.183682461343238,4.990648361539455,3.564672777222677,0.05745208867562801,2.8641807901817415,4.125314048303551,2.333663195514001,1.301955210553859,1.4759490640167117,1.9503985592072293,2.9356289920814205,0.8222123451451424,3.4560809296896355,0.8136397813172158,2.589617099764915,0.24767791109303827,0.4356283500178215,3.089871792015555,1.358042550459545,2.361741367092196,3.004147537550985,0.43681693945132327,0.7428718926388178,0.9264738450520849,3.3684715484240213,3.6687980560254276,4.186651356133505,0.7230425502040383,0.13650398670152053,1.5889952121012563,0.6213604166180331,1.179702863907548,0.18954216710578176,2.9063849059298184,3.2583926325847665,0.9000273233788192,1.1500327218962902,4.889771261961955,4.98749121941295,1.4996180345639054,0.8193328546857814,1.2207450734426573,1.7583012382167473,0.46446494235966473,0.22901561791168423,2.5922782019424218,0.23407724893228066,0.5300132444534511,3.32498907790149,0.6681152101128407,1.9045032295855102,0.6683936884072861,1.3538272054244038,0.9717492046579435,0.48011009321408227,2.218685681605148,3.2735258471057826,2.2590542272321503,2.8260135846254975,0.5594309802783237,3.8807684166703647,2.2104013562591662,3.3560425435213705,3.0021571779966583,2.908329917784388,4.456343962470869,1.999352186533847,3.212552316737299,3.7754861932152037,3.8475579936373974,0.14093904125835222,4.572841350180703,3.8779266367755225,2.502756444219567,1.3228255716814474,0.5019426424860984,2.7860997527731,2.057905826626849,3.770652670008352,0.2443295280485991,3.737599857995213,4.022284480918506,4.642877790949246,3.7700477971530533,3.594912995238836,4.08543669513,1.0091118670099175,0.6471607084012232,4.403237550771423,1.461261031291955,3.8822535583683706,2.287184517654668,4.117481303087432,2.605011798143421,1.079604698811496,2.1382777438442546,4.667213096024339,1.073028839249185,2.7849116145750576,0.8570159385186293,1.5702004696627936,3.715457681501657,0.1619904954968454,1.7058637189363413,0.18680714279280086,0.7872421571506238,0.2639094805004072,1.3560967189481044,2.926830140874943,3.7148014128053464,3.7990487577622636,1.0323633123978815,2.797688238143018,1.3094943422469718,1.0674531292694145,4.830533701716017,3.23748421370723,3.6668907997904423,2.0221072298021294,4.700435395909119,2.7124916065076943,0.8635699585562417,0.27684857553023967,1.1747902985763425,4.764840940433751,3.9197950410587246,0.5071352741483537,4.319165269124509,1.473133327303443,2.5053514200657565,1.8027111316447209,1.3882277088374328,4.68182341042508,4.740536085502706,0.844627387252832,2.8269434293952598,2.1821261878240272,3.307315170637853,3.17476802650185,0.6137509581114953,2.062523978626735,1.1391867771953523,0.43353978381269753,2.459194965796927,2.399912037136225,4.599236713403622,2.7260184319424017,0.5822241566525654,2.089799979660202,2.962355852124172,4.197987247652816,0.4211503280092366,1.359025625567486,2.4610173224079612,0.5219962015174218,3.518503379450646,4.603887319570619,2.1767515881267108,1.7986519385472621,1.2337136702332552,4.943086891749279,3.0404453085064596,2.8998358030820794,4.200336924401096,4.942073490249718,0.4498688954798191,4.30873033220308,2.4827828864634194,0.46120564541877407,3.138816119458323,0.07182399232244174,0.2798891009512683,4.37409942730297,1.214316278346489,1.5615345884373333,4.739157840357484,4.010023356875054,4.081302934621075,3.140562628382079,1.9633850335035663,4.29283243980959,1.492692521648481,0.16495300111880162,3.542877424818758,2.6670354392382523,3.5516684536726517,3.3939661250590936,0.5806592507882724,3.960578990947521,3.955524132568139,3.103924418228794,2.8663571201811324,3.1263266116936794,0.8725778576493892,1.7803415707210957,2.9055722220265503,1.6923908827755418,3.469762329180254,2.6567011162440766,1.6779935964884996,2.3210919755164774,3.591311682920084,2.419634618533002,0.9876093932691754,0.25409807155151065,4.829281513330481,2.670021734355268,3.6221413215162093,3.616542117566115,1.8925154632379515,3.0852682775047002,3.2121653452135126,4.514249217364183,4.898914916526049,4.136723304396139,1.206442724839697,2.376555427594893,0.4908957499703692,0.7438860953224558,0.6195051460556122,4.617031213170485,2.793425470234703,2.72382791244999,3.158987667943942,4.308079366343155,2.9126797474397694,3.361294688743297,4.846078685463516,3.5550535304625885,0.024863720737510198,3.96810837780345,2.652787127335412,1.6127711967408842,0.40626092459781327,2.1158785858666116,3.4316103968341647,3.585520826718689,4.747167781791044,3.1181542687911614,0.18969084834645877,0.04032433822165782,3.387780180444586,2.251835567382746,2.3233593057279656,0.6909093002887112,0.7438920968105167,4.322678194385693,0.4646210223882885,0.12322567352163083,4.558906470263443,2.514120468159912,2.0879858542474805,3.745841318563482,0.3113643289361223,1.4752949462889253,2.575172623610519,4.641201757840144,2.4608839682659833,4.120423032315057,1.8009146278783494,3.954405979604604,0.852499342666575,1.4702390808757448,0.1254939954276102,4.039126044820583,3.6507321963965476,4.6749509406257586,4.1054029979481585,1.5329603578165185,2.638082691904007,0.7480534610996059,0.9094545220563288,3.1744088157257844,4.750989489362876,1.2772069828078048,4.663932402688252,0.5453497306557853,0.7688847993554637,2.069233842299046,1.9662922576191244,0.25625445809053904,4.0973120715616185,1.9861230667014684,2.0625919598502085,0.7443228792172008,4.080139228603832,0.6134689473377297,4.719444658728089,2.086549019320989,1.1531868468698503,1.2495664101795756,0.8362813444528117,0.5134827257100694,2.4709335439168623,3.9802982958073785,2.7179749721744217,1.97413547969848,2.8754039752863267,4.977137144865295,4.920929713699701,2.1159708102270147,1.4503804554808053,0.06547450086813678,4.051578370015413,2.13210731743539,2.612140792038906,3.144719025404564,2.785573765031243,4.78648390387816,3.8140521195368473,4.18952445765981,2.016180545879581,1.8831307692463928,2.6532430432181364,1.0287235411162987,3.3596887251338736,3.296690318102369,2.1205949989539574,3.233978434624013,1.7695822863588362,4.4238859923254985,1.1851889905491542,2.226883604973924,3.6352712142118158,3.5830322800942263,1.9691797293492963,1.3915176260569273,1.7495899633458667,3.8969881968898923,1.1220576099482515,0.24733085963335344,2.6075020259646187,2.7417732633812255,1.3335871285036849,3.348163182209433,2.011350233523693,3.5582501189631643,3.378820621022547,3.433921483872353,3.9092539893002365,2.090984020008595,4.555853971366083,4.503551513801294,0.27173385181848086,1.8055128745640892,2.756885161772147,0.2906683069257576,3.9821399921985403,3.164870189889073,2.329217468477758,3.4369910255453826,3.966582901590998,1.9895564130727783,3.682691316334431,0.07502421478475019,3.1982879236045116,0.8252052333406112,0.6042572149234782,0.576324108264481,2.817636461955184,3.1588630850278445,3.2281811760880275,4.675042727252926,1.040958810452759,1.4833718658959927,4.98473629779024,2.2201892392999802,3.5502290173158446,3.4552266487247096,2.0008630658727897,2.5096525183710785,0.06014990885285565,2.587112162225025,4.1934492071743446,0.581419255532678,3.725613350419821,0.5186358339587693,2.0299381754901735,2.412446670425364,0.06178884437763488,0.7280588908831731,4.182917692455771,3.677645645726988,4.221070165528575,1.8382147483622036,2.0031838702331974,2.316501847324334,1.7470835263869033,2.5351891801109083,3.964168967393399,4.295200601343798,3.611861117677262,4.690747752343833,2.8640865964354747,1.7125450110437812,1.6711289855770617,3.796771640587935,2.0310899863217946,2.124036832763431,2.662846288520683,2.163384217738298,2.699768202208533,1.6357274987966763,4.868648112719955,2.8455018677656287,1.5163878982857804,3.5283845502444535,0.8161068396350113,4.882229326820373,2.9889249172226817,3.441828723945987,0.9232319956682566,0.7269056743219493,2.201596991681145,0.6216396519387601,2.6769793079369917,4.767591354124056,0.6101185390351038,1.641397706810288,4.276416308678001,2.453376378558605,1.7891345036199002,3.2898623372826705,3.1622065738596525,1.4046192221053078,0.9486004322402453,1.0495553971293126,0.2234098466070089,4.726524131535133,2.0790069691997193,4.90742725898534,4.404104576744081,4.037435108859956,4.27326530966265,1.6010806017608958,0.54731027964534,1.8774316013211567,2.4825805521820907,2.1264845712806393,4.183029860685682,3.775271543236446,2.008756262852395,3.752754177967942,3.2786213802160424,4.009288704444881,1.7597076066337825,1.2306816982337965,1.1420724142856187,3.2469647386453406,4.288267932777892,2.316404219533897,2.976353118674433,2.2096657489859073,1.8557204186889609,0.4854790971204559,4.224915402328272,0.2979502304862647,2.5564768480248934,4.224998846338624,0.4035734772400057,2.0036456551485693,1.6639449522070515,4.9092755273306485,3.0986328072575384,1.716775147801276,1.3342164168365422,1.2386517546762676,3.0961496507284822,2.1533362509058085,1.0802345614495634,3.1367126095129647,1.6552171446014752,4.109229322007417,2.858254825633222,4.122845724784696,2.3150278087571188,1.6656979713234021,0.6470111178892468,0.09392275410618156,1.7997323643821306,0.03672333866832189,1.8265051313890424,1.0454115642067463,4.5814835625209,3.1275396855770445,2.0433299574239108,4.838921223735085,4.751614394587377,3.9277008252930545,0.7642790689076207,0.8675831036507842,3.463749607419545,1.0400130819884978,3.166274302640822,1.5882565530200032,3.3853172924990194,0.03099885602340202,4.297280070667057,1.9152526176272044,1.6571051853963403,0.6024507867598639,4.668760480111997,3.9942276608786162,0.4406351228483274,4.317510689794267,4.355350625817401,1.6257002170899193,2.141803995918653,0.5811337392959526,2.338666936460927,3.1056978929116497,0.6144040747673551,1.7730114213157955,4.259335840727597,4.728982032697241,0.1617326215598558,1.9123669264337828,2.393217636413192,3.1357250912766146,2.025332328350511,3.208541765750088,0.29927268649641015,4.232551448291252,2.8484503447985556,0.5040402518264853,1.3106140529463606,2.3973356100509924,1.903366340899224,0.3744479288375058,3.5917072461996957,0.2627324689561572,1.1909931814530383,0.06163455977087673,3.1029421557076073,1.3071234701105694,2.404473976739502,4.149455682186739,2.742131933339577,3.1126484715169167,1.4564490533378205,1.0109518175565246,4.762715405107007,2.5243810973567573,3.250374494940659,3.1645094431197194,1.7691765765308343,0.21352006704100202,3.248072592021942,2.26961910082799,0.6158026088493951,0.9883725367651142,0.7903175119714512,2.011850489413929,3.7274224171616543,2.1689524954411588,3.1489401301164435,4.485488811376904,3.2535421815286347,3.9016646814829956,3.039602153829403,1.4878812360367877,0.44861120218983697,0.8090842056101555,3.847866637435491,0.13638082906989424,0.2256467120748118,2.875515034214746,4.886729843497756,2.7333465685365366,4.209732213544242,1.8725269967641522,4.529642143421483,3.7823182965065785,0.35651411699208935,1.0169807257330254,2.321747204767205,2.7421029277429723,3.6293970187303968,3.5016235867612036,1.4312111951746076,2.7183297998097364,0.16811738893557804,3.411662856075125,0.8953294843463211,0.06642973582067446,0.4193513889033684,3.725916025587156,0.16666853664447534,1.5127564898133539,3.2531845502157344,0.6362321730719722,2.7348172074863153,2.0825149249211226,4.113931632375176,1.4014578203558825,2.8540403428797534,0.437980477550991,2.0107389564543645,4.574452293771994,2.8106531844253624,3.1300270714684775,0.18185692551874966,0.7511407036120354,4.037805415528746,4.535612526694801,1.2821239746290347,4.623578611942554,2.965614554937882,3.3267540563961018,0.4236433287879948,3.506885935788009,4.879075276879715,2.206648618626846,1.020093500075464,4.916086438580573,2.8409014152105536,2.2789663010382033,3.2387127474283552,2.3939263777543163,2.1313506158004425,0.8170228557686909,1.5606755654772575,2.589460265294906,2.927797865024674,3.7749441118423697,2.715417587254476,2.8044036179726026,2.7325350437316254,1.7198288694404473,2.6582721042303135,1.5138402618470348,2.7028952736804746,0.9653207239026262,4.3343071269724875,3.553244735894603,3.9050966283698285,0.0352703150094702,4.164490384652957,0.7525580037782942,3.963908042793154,1.2147285248805795,2.1030165267772736,1.9070423861131025,0.41452787586855555,1.2499565054394812,3.651837606339432,2.1833165127008067,1.1521526047247266,2.710750996312783,0.15815441737521696,4.2145874865540955,2.1412342211908064,1.706460738756057,0.28475821735056805,0.7222240153024795,2.892723693471735,1.7676782196898355,3.4535560151568245,3.790003879707886,0.8394893201430209,4.786890808748056,4.494950126744579,3.5120891170922617,3.84053421174901,1.3821524548367425,1.3784656150403496,3.1678518216038745,1.3362351140464468,3.528767006514675,0.2517757145113886,2.307542360239967,4.907268691285145,1.0850529418054589,4.580371632301034,2.7995396565239417,2.561052590005777,3.9085313727475124,3.579954165127136,4.613306136334925,2.4620889265926094,0.3677870473800482,2.63355510019795,2.96748981327549,3.4112333655367566,1.1560500162401233,0.06392688595533658,4.962632433707014,2.308285733328148,0.7558500284714409,2.8859118830871533,3.83594902170291,4.676989625051511,4.715597498044627,4.015217571080447,0.5165773574926757,0.062463805045073206,3.183982903347565,3.497885555397815,4.753041910829078,3.604480020192101,0.9234730219819387,1.38157573186247,4.1333802773932184,4.055526579200411,3.2939095839128907,4.6572639454067275,4.97967323917913,0.18575816015863555,3.6121697178538668,3.344223381166879,0.5316608133286627,0.9775835684911971,3.3053150241819864,2.6990806088094246,2.630779567501759,4.6139540052651835,0.4741142616456451,2.009632784213168,2.6945867783128117,2.462206559006017,4.627642424950189,3.6301596429663663,1.0698259092224605,2.066201760380131,2.529419279346631,4.234393921398659,0.7334390288525039,1.138009064215637,3.0615993772497054,4.536975812180857,3.35485770230406,0.9198757681461311,2.688922169300829,3.4765017542085506,3.7893898088972557,0.5971720957527082,0.9049119043544407,3.345286630939537,4.624306503301345,0.41770418994827363,0.9134142172270698,2.654449079955362,3.5583168757948194,3.669297634516544,1.5046702949129442,0.7569182914677131,1.1655944427963394,0.26052219043022684,3.1655621136796297,1.0107046076927484,1.8372608892220799,0.3885527894462304],"mu":[-1.7933248418006942,-6.7875139749116675,-5.531748078685612,-4.873883779814054,-4.824927768548479,-3.6454402691441,-1.0557140326331926,-2.7376280300059186,-1.6116542348740537,-7.096578367932034,-6.281362063183233,-6.000143281002039,-0.7077759845500387,-5.116108430575251,-4.86274678065098,-0.45230802401275305,-3.806729961257145,-0.1404093231895276,-3.965642676065546,-0.7266553800371489,-4.4212994016791685,-9.511084092332041,-4.2213431674912645,-6.248287123152623,-4.407819649252138,-6.973819298157711,-0.6618626009799367,-2.718735313505205,-3.8903021033795726,-2.5892560426368227,-9.733223892948075,-1.2862713182000096,-2.959273884081415,-8.919238410028786,-6.347869761355474,-6.657778290547858,-9.750435416322912,-2.3056760217571837,-2.1881306845886095,-4.668414147565709,-1.0042759202368878,-4.043648860395348,-7.556049607331525,-3.5849998976249142,-1.8951319085770901,-7.540731822874466,-4.580344909291442,-2.3298528044653954,-8.955215259448613,-0.22639557408465683,-1.0682939603526775,-6.250557871833897,-2.762920510546363,-5.565934509968258,-3.571439916852126,-6.043963379965622,-6.364413142185135,-5.805203244880028,-4.999674420357582,-2.593459315961264,-3.0564486440532823,-6.983794288643683,-5.246967140326808,-0.6083851300817211,-5.030800625412244,-0.31979411980422645,-1.7658889524480714,-5.254835326137169,-9.028230910308572,-7.48987339820141,-4.444122357004037,-9.142555183834586,-2.6972419559294636,-4.958456917223408,-6.088883970233763,-5.307598988058794,-7.302716080094025,-7.580955244469399,-9.78462789512408,-3.464544596554575,-5.548467199638183,-9.406269999327916,-1.1566247861103718,-5.770660128947219,-0.7728055642579812,-2.7667419790223735,-5.107268989792133,-9.028179121048774,-1.0335791843626163,-6.734148045893669,-5.8900760320500805,-6.051256817326259,-8.264408920602136,-8.097389174782688,-4.951540748474179,-4.350655134496835,-8.155613327584472,-7.056930782325899,-6.266039523604889,-3.090150590523988,-6.815790284885752,-7.768948274114442,-0.757407079181529,-8.058447443477446,-5.2077276108785835,-6.2217433085461105,-2.315743688905574,-1.6432177067079157,-3.200309014611349,-8.276672997755794,-3.725473964626047,-8.661503987089983,-9.12878086709917,-8.28801394916205,-1.9502192603099688,-0.8271328275296419,-0.4326691975069874,-2.658074882889312,-5.180181643101454,-2.902081545798212,-2.7965660556832828,-7.3930805582817705,-3.881414318647496,-2.216723017447697,-2.711191997298703,-7.552745949835032,-3.1118945830272926,-7.787848292691137,-0.5208065251995797,-2.271157115103055,-4.545828028865242,-4.912685896011036,-5.644417049104062,-4.559562935711918,-8.736746207602097,-2.0048281899191367,-7.6586592019377235,-4.883395028977134,-2.7669664888215895,-2.609308814817175,-8.08526429418575,-8.20940574032184,-6.690502927520477,-2.38827784368125,-1.0128979480364753,-1.3954151981060225,-8.82092820837181,-8.196018148727171,-2.2225662443781036,-9.61521975543538,-6.540961592225026,-6.413666888126532,-3.3923465577284384,-1.5948811406532482,-6.5895828415075774,-5.694391766775448,-2.1915108293280317,-6.195147649182444,-2.67104377820621,-0.6166700665316571,-2.3916145357449348,-2.750426577987901,-6.371367117423931,-0.012752520434888837,-7.4574204448579895,-0.6947471657085558,-8.164375821411923,-8.669393271721294,-4.312418933741339,-6.839260067479065,-1.7885136710180793,-0.4635927859177147,-8.98034862685433,-3.855780714901329,-7.607351440452801,-4.197045050744299,-3.508287728295203,-6.733691654497731,-2.5382312663491624,-4.74653846203831,-0.752104089848995,-0.896989987592065,-2.9980968106322847,-9.988717130007249,-1.1929924015622984,-9.07936832486354,-9.818566341879315,-6.556080642683724,-2.666793230576534,-7.06030061048692,-5.996371836251546,-2.927012360471306,-1.1704855678085146,-4.023772446259597,-8.942234192147628,-1.9705421787044197,-5.562022647559952,-8.011775064832998,-5.798664975507577,-5.173058641598624,-7.527635810669555,-2.77857894046293,-3.3093712405312226,-3.8360178610147533,-8.11843529092851,-7.097662186511833,-8.856791447183276,-8.56179496855486,-0.08489727496196142,-3.6529947521020123,-7.409917838854627,-2.0835310575932398,-0.9755553822255747,-9.082658165547244,-8.861814204226846,-1.293277104031274,-3.8465545511298327,-1.9074775742405525,-4.900694011641502,-0.09452970968957697,-6.523082429427005,-4.04829937900492,-2.1079025197503554,-8.858055677550588,-4.566460385939131,-2.2693722020565033,-2.0471107915884845,-0.31597494115104263,-1.8266248984233524,-9.257607139902731,-3.1637870697144743,-2.471595131964701,-9.484996220230675,-6.982911736384669,-3.2031721957426607,-5.680068541589756,-6.008895368817786,-3.683349604195123,-2.791834913879694,-2.0790046008174645,-7.131759537287927,-0.21267016923081306,-9.722175139058216,-0.04546158225827934,-0.6409787794361987,-1.1504537847621377,-1.7645010736877609,-5.9996747164520325,-4.149069743366594,-6.450476458884983,-2.637767586966775,-6.854529489609615,-3.1781464321613284,-6.450267503332368,-7.200090599603208,-3.4005987283882666,-0.11166843982126862,-6.536070522132338,-5.747775425695767,-7.176434473119104,-5.6629886029239485,-3.8394676622135893,-8.571316176799261,-5.1852942752767195,-3.801390613825917,-3.5619390498848125,-2.6764081036375176,-1.1743900800962748,-6.111403646833981,-5.869826226229156,-8.179129923703023,-1.5296202133806869,-3.7012630882188047,-8.020359419490875,-3.7153671287320478,-4.2571772066999936,-4.461103072964063,-2.420236222516683,-1.4928100104396957,-2.3262154102140564,-8.694818462669815,-0.263063199617688,-8.046465629149484,-0.9354264952819014,-6.153546270901131,-2.4071316747838556,-2.5711232960014474,-3.08278954657341,-0.6930969351742666,-2.893071964339189,-5.586289848656563,-0.38998684067331757,-7.948342998741245,-8.649662553611865,-1.9997629718713483,-5.206461512436853,-9.90054896383505,-5.354267307706195,-0.31694598799958396,-1.3529998851382552,-7.577942026976752,-4.818534907493504,-6.176532685558813,-9.582195717996548,-6.8230995520918984,-5.205908315476435,-8.634645253198554,-6.309820897666905,-5.143175487461451,-3.5302013151608747,-5.12423314455869,-1.3495812622029857,-0.9572498422787157,-5.929170951116765,-6.1069266565639335,-0.9034924221680507,-5.048636783025424,-4.970963917226041,-6.405456867515951,-0.6118840004195869,-5.625370101789333,-8.543501346402136,-4.174614195082727,-2.205865382776382,-4.682195780293126,-6.2274216304052565,-1.623554296075962,-9.651119623936427,-9.030045487203012,-5.9145398840017505,-5.011571333371636,-3.199418968327259,-4.178574244897748,-6.449491723332759,-7.065716082453295,-9.343283132351548,-7.690387370313041,-3.7179645236171543,-5.0741535048870805,-0.7494676882170603,-6.243101688431912,-7.731302213728126,-6.570277106670086,-6.5680633290866535,-1.7769544013758032,-9.981631734368326,-9.43336580315865,-1.085485148315577,-8.393376686390653,-3.497072051965071,-3.3516857104477737,-0.49014609708980306,-9.824935052959203,-0.4789230134032185,-0.7133621146552538,-8.781018315827964,-0.24418143242926682,-2.5209299770197235,-3.6813144382169694,-7.638182431812508,-8.012270070014404,-8.958148803041082,-8.035955617022433,-2.9414537010206177,-2.048478786430281,-8.625341481887796,-0.6531172226851933,-7.09992129021356,-7.575191107815495,-0.26919189538274324,-3.7771465291247996,-8.30446134711309,-2.4197465852089017,-0.8989331716895554,-0.2734255613900971,-1.9253162440376936,-7.477682326980313,-0.505950905657746,-0.049798591947507465,-3.474931598944251,-5.949102923119427,-9.535058771064158,-0.8166016173588764,-2.7998261583505,-5.596651204418903,-2.355183201821469,-6.520006132900857,-2.1604246213273726,-6.413939060720731,-8.243961349703191,-4.2726171360844,-3.02746888010909,-7.167900851013648,-8.826976025528912,-9.261748920356892,-2.391857138271085,-3.9507616778207177,-6.285702858225736,-9.441389881102662,-0.2012438185679044,-7.906800963288596,-4.582848991944681,-8.854185030463285,-9.161929566665744,-1.398600216333492,-5.581929996853656,-9.76191068920073,-5.98708277669314,-3.143302275640023,-4.9569484744179215,-6.2796942191341465,-3.2757897879642517,-6.117809930328173,-0.812058245255034,-3.8607915403348847,-0.30162262197622525,-6.534395069779793,-3.8114705764622436,-8.374472043070702,-4.851517182910554,-4.995165186783554,-7.612901556390854,-1.5754375509486973,-1.2618109944304945,-4.910546022784288,-0.5255322813563912,-3.2991761081571913,-5.956541797227086,-1.773235339788004,-5.211034174806837,-9.139702341975545,-8.395332835128908,-6.4965664135430075,-2.0831876894356394,-6.235441133583201,-5.110191633064622,-4.125689464554229,-1.1209434682338282,-7.184311134457437,-1.4333463427785187,-9.638486029399502,-6.828756048495073,-2.3525320780183168,-9.371667077894703,-8.034487965824479,-5.642574986148745,-9.48897140607136,-1.7723617396044378,-5.182837459358208,-9.778178513760238,-6.031542367259326,-5.269646560503761,-2.716398661008339,-2.7801385715689375,-1.2291439401442128,-0.7386311500485809,-9.147425059497307,-4.819779725230424,-9.884035828053353,-7.698362036851911,-8.567677301003558,-7.444903490088379,-5.414142473445757,-5.586521261732615,-6.763332130360416,-6.251232941958911,-5.673590492710896,-8.464365477823822,-5.641714635575383,-8.401744242433569,-3.179263907537846,-7.883344655139817,-1.2323008157337534,-7.864777966742855,-8.529107656130183,-1.4989751049387179,-3.6416436933424268,-0.9429723186896788,-0.9029879696062459,-7.373285236139822,-0.5676209491626327,-4.969453127345076,-9.29156293568819,-4.775049206209772,-8.702538245707023,-0.5702347279130016,-5.225867205475407,-1.3410625796380082,-0.48363703147876747,-6.280538167166682,-8.615721953040849,-0.7353640966513986,-5.687956249497783,-0.1677855468477496,-3.2369356656211834,-0.23631350948432495,-5.37996521917969,-6.0021463022972865,-8.738946357835102,-4.3128059101501215,-9.96573758330111,-4.9962770106027925,-3.2393127304369718,-9.457547384621856,-1.0112052952273975,-8.816873917557363,-5.836736318352537,-6.7206368520810695,-5.876711016568925,-3.35187652579523,-4.135689793780011,-4.7251182895455335,-2.645581924228131,-0.1934622499621863,-0.9692683368841704,-1.6884821338883982,-4.331641686601007,-7.5783974004009895,-8.010523677522283,-1.7986584577426967,-8.569509056068592,-3.4903358602068746,-9.334980762740155,-5.222199879416922,-4.1147854208090395,-1.2921784812029924,-7.146762688548827,-9.101268125616443,-3.1014070693993867,-4.828649626220138,-5.47683644177056,-0.5012717855871363,-1.191339861225047,-4.094872607947877,-4.566646427085621,-5.55576342582317,-8.137197852710383,-1.41010469903335,-2.31222766144187,-5.431264362660267,-7.496343584270488,-7.924274784838792,-5.7256764750314755,-8.66304111627586,-3.1743752925449087,-4.740564610165514,-2.892979384251446,-6.458925640329463,-1.6638243070478609,-5.233358820551846,-2.5245465649609122,-7.735801501222448,-5.82012963916152,-1.4025179652523834,-6.660220836179023,-2.2002285037998637,-6.560520522086819,-9.378901677498455,-1.8432077108118783,-5.528399652335477,-7.570632530880754,-7.945464714125102,-2.812135951586332,-5.919450176607322,-2.499087363882677,-5.173297244809431,-5.115916792924753,-0.4442169327420986,-4.550157848291009,-3.7436210278704296,-9.000586418183534,-8.181574636629152,-2.0392418474663,-6.679805156351355,-7.366683762679722,-7.074266611697199,-3.761388717454086,-8.903185194857299,-4.125191712859113,-3.387432554143426,-1.3849871025878735,-2.95824532597893,-2.7739309349231522,-9.801714553067022,-4.87368306789608,-4.14179371844461,-7.406292520351863,-5.527635577180838,-2.364315842926521,-3.755358715818211,-5.131748451435989,-4.7467775750262415,-0.15669104631997444,-8.071386411501123,-6.015450146413192,-9.428916005932903,-2.3025190790170202,-3.724574796177891,-9.724346577919665,-4.348818401675367,-0.13186976250402438,-1.1586547026947303,-2.8343407914160346,-6.173591921878964,-8.532111932562758,-8.5563149484864,-4.947092128971042,-6.680184167971981,-4.942863695990609,-3.523519057598876,-2.2997067199333365,-2.9709514806489556,-8.04682665543391,-5.713403996277635,-3.993978487768528,-1.5508422786340592,-6.421267987198711,-6.78176702948633,-2.043690882331317,-1.15337590586992,-3.644899499879286,-7.68344835100391,-7.6290462703009005,-3.671538109573904,-6.897489580596286,-3.0412267238087143,-4.258778622276682,-2.9992079992407317,-9.742909525500256,-4.589488625315024,-2.1243754162485096,-7.1389206477365486,-7.364853500894315,-9.528487700580968,-2.773622163017617,-4.472416586381527,-5.203251705723002,-8.944232549520173,-8.249402433578437,-7.828141720256088,-1.004508375099189,-3.645834233027032,-5.334410659783346,-9.150860391148676,-5.486820230179347,-7.012660338814931,-9.995359842456693,-1.395468534217219,-1.0325764294519257,-6.021644820690357,-4.612065745943157,-6.123987023873809,-2.5051942151409157,-2.9069495744000684,-7.512208655218366,-4.706810188233337,-9.056347084431394,-4.3795262637902965,-9.92026711053968,-4.839339472870536,-5.882892196148699,-9.202258298548687,-0.867113396051673,-9.148325872254077,-4.408820415009536,-7.48191861393116,-4.6505415914717085,-7.851561973671766,-4.8522279899913245,-0.22918848525794955,-4.3414532379677,-3.0058006580167373,-9.272802251160146,-9.970134505144923,-9.256454344632544,-3.1780079743155865,-6.256013072358819,-9.006761090885462,-8.197044161928666,-4.398794937505244,-7.208011847954969,-8.29509516033162,-4.699906261625046,-7.045832551987379,-0.1784726096672551,-1.6338319852181682,-1.1534132037594524,-5.564328607234961,-3.1154628804317364,-4.743498115695742,-3.510390086755417,-4.558553572096969,-0.7490204025635161,-6.930010113411318,-7.049399035918604,-7.387877751652261,-4.3187313213883805,-0.09506341569159193,-0.9464695680557034,-8.829542734723756,-3.5288075036376543,-5.182575651319241,-5.211778538754168,-0.06732371295333772,-9.83290231375692,-3.637765001714448,-8.246893119651519,-7.2041444000058386,-0.9518712189465495,-6.812118132658968,-6.1667730723310115,-2.767654647149722,-7.148054162990136,-5.587048878291032,-2.2902685264030054,-8.341334278116388,-1.2252661014104493,-3.967881488307541,-0.7646846319912592,-5.5396289758710004,-9.519492825381388,-8.30229290390079,-9.923200632594769,-4.80221944576426,-5.581212621736242,-6.695765453167272,-8.58741858648874,-4.433656124209229,-5.057331282212072,-7.032945131346777,-3.047710674876045,-6.8750620691883135,-8.19810961655442,-3.8163497670466207,-4.092076768781698,-7.2801614857022106,-5.851614208990887,-1.7163883293914828,-4.990038384158268,-9.40654096888836,-1.7526153076063844,-4.3812471191475755,-5.73690707981362,-4.647836914000996,-2.9751251313949,-1.1181538458750873,-8.995179167324093,-0.4314801416703484,-9.28786774746773,-7.8769978352346754,-7.562444777345116,-9.522180095263192,-9.347510912989417,-8.037578871694732,-8.521998973763449,-5.120818860158121,-9.643787157429797,-8.482549956357609,-4.201370275127719,-0.7994896601542223,-0.7365291905185467,-6.1170978236781455,-2.2331906352472064,-6.422098942864814,-4.143517750048731,-3.942100803588988,-0.7736262542613015,-9.503127684382314,-2.3202854488431446,-1.9739638611728538,-8.821584770734807,-2.3909126998420205,-2.5203583941048224,-9.572363243853221,-9.575540027668804,-8.584636785008058,-7.83425097882291,-2.966618846583904,-6.943531748576703,-4.097739345236833,-5.25511589998599,-2.983072345682136,-3.670798200707379,-6.76660220864056,-5.672167871680591,-8.753174472533416,-9.40309529397611,-5.8517997572984,-0.8842628677111386,-7.754010587059756,-8.68775197330309,-3.943363749336495,-4.978398491767013,-1.2433377831739945,-7.9729794319040925,-5.490714583302836,-3.764170368719013,-5.01047003485938,-2.4330457907299863,-9.052946749616847,-5.279952731174278,-3.7023053218157065,-2.4817885690615626,-3.9403336054637927,-9.311778469434032,-0.16362461641443282,-8.387805833901735,-2.749204760659385,-9.988918459889364,-3.615617593961391,-6.6795507577063296,-7.160809482220552,-2.0684212342340724,-9.81499294305753,-0.2845586328451022,-5.118126981646829,-3.2953086125036934,-9.677548213736644,-5.461614572204578,-8.961065644248475,-7.996889106763869,-3.588675746232768,-8.538950877585492,-1.7827340275387105,-7.019810761528378,-3.0673057478835575,-7.87561763077097,-2.373543830497027,-7.610722182355039,-0.6163005932904175,-2.112827055426294,-4.104097492381613,-1.539184830382232,-5.547263206693307,-8.281346505523912,-9.9891234420601,-0.7703481488522357,-3.315976131305385,-6.194754040814319,-1.8490083558082904,-5.815244611466928,-2.6666643235945253,-0.8789037942615185,-2.3111453422408057,-7.246204639823972,-8.762027081275765,-1.6331355911131507,-8.842277423099548,-0.8117507449310235,-9.296176995797902,-2.4787549437079437,-7.27313652384634,-9.838422976539338,-5.722619566980709,-5.420276872090266,-1.945680033117776,-5.539487591648589,-7.6609591996726145,-3.4603194271722137,-4.201912210238121,-8.346369026387134,-9.241510098233608,-0.11203544299801527,-4.615639220991299,-5.340007327835588,-1.7010763901373127,-0.9187667419614454,-8.159271106600535,-7.71957239072278,-6.172492125284155,-5.048360838611121,-2.4787297705777833,-4.047758211369359,-9.887810381570796,-9.779800961490768,-6.379522493001646,-0.3039364340180417,-4.55542737978353,-3.607733162061839,-7.0137084934999905,-6.696061516041178,-6.510399244931433,-4.047905108331373,-2.7767325164964896,-0.5026964076597173,-8.84701969855082,-6.846742311606797,-1.5124738947784588,-7.353994665551049,-4.6746446673658255,-7.949128746748412,-2.2817568801307964,-3.008585809374016,-9.00519403459652,-2.204212697801833,-4.959559233211679,-1.4644169626627712,-0.08297244670814274,-6.08651787198935,-6.925331485865609,-0.23963014146942685,-7.612560131904802,-3.141600777131839,-6.408776682408441,-7.620726857719077,-6.878424676565538,-0.6655153578527528,-2.033529385600119,-7.0805096628658415,-1.5773601258809178,-2.9532291188360915,-5.589883064767305,-7.065500043019794,-0.734724395622921,-6.498804518285814,-7.0234334067901845,-1.9091200560542587,-2.8528567475969546,-9.519401769387512,-8.889842031370513,-6.723818870768474,-0.12468623232138487,-1.4178046927087662,-7.022752077007672,-3.872553952358908,-3.094992047669123,-5.354505386631829,-8.914720708780452,-3.96157628074129,-2.763984982048615,-3.711426801849398,-6.531956768326667,-3.7092042886661125,-8.658705733356541,-4.792885517696428,-0.8822450782485847,-9.010976623710585,-3.252314274374113,-8.785404233355239,-7.783545204777409,-1.233290498988615,-9.684281212445459,-2.06895279473142,-8.430581157904783,-0.7675971822395811,-2.9468271001416224,-9.486499720969512,-6.494569306319233,-9.845223109643381,-2.6342231620299428,-5.076189890474245,-8.15915180050573,-9.632597202457712,-7.217588022704026,-8.406595076620093,-4.234895437574409,-6.329289406584073,-2.141314448194307,-1.6073326594973936,-0.5578765058736024,-1.7014087896504404,-5.432672346611893,-1.9831442775760744,-0.665063022630743,-6.153691224776903,-9.670490586395143,-6.565390390575169,-3.452401316646707,-1.202752682890491,-9.282141751577981,-9.132909770739996,-6.984303711865776,-3.35054493724928,-0.7869964115959815,-9.243001538284524,-4.362921508334956,-6.632071927936433,-1.3973494153036214,-7.169931334609849,-1.5720440161313043,-2.126285420522802,-7.973457215033561,-3.1192943582819677,-0.6418705555089232,-0.8142414425061695,-7.686880667980967,-0.12179084367505366,-7.8418323548952245,-7.477499387980833,-7.9364384737132365,-8.083116590268542,-4.462990386146211,-9.54386029633886,-7.844856460800891,-2.7404139697016627,-8.012262930571154,-0.2140018615335859,-4.637324738720241,-6.7041646011430345,-1.7792849415197098]}

},{}],128:[function(require,module,exports){
module.exports={"expected":[2.5048584822075344,0.5277600302493666,2.7471859531871416,6.422807142150144,1.0028151725165544,1.1006831564645918,1.1032523088458308,1.271498921438471,0.9436786167494083,0.14213142400957732,47.72961146125436,2.2974837387725477,0.1865237593843833,28.043430294914273,1.2963893343396122,0.0006671060687700085,16.868945353725827,4.591233014898703,0.05003753847306465,0.6979155842222735,0.2285519902545909,3.5149259071046113,0.3441104146389561,1.9472582167158186,1.1967163025760015,3.423321931189726,1.4520268243337775,1.376910087954801,1.1087032482101442,1.3327977094167993,4.430144894749825,306.897212970289,1.1054628882127204,37.36871607354649,9.558901259263987,2.6459017371175078,0.4962418412641918,3.0750235447257475,0.38710119320375413,1.5414449064071079,0.05122504354966741,18778.539744407237,2.2188974589962953,1.1176654474027425,6.283685276587161,0.7471856938825973,0.006962966664648444,2.4225924262532272,1.348489335054128,1.6673343444807167,0.3922212114016229,0.7901581679900264,1.6491979286330745,0.22615340374181633,0.006560889540434676,2.9686770171639996,13.26613750789718,0.8967439501134175,2.882134059240395,0.2233933167001933,1.405317994172009,0.5779186674465688,3.3671841391688724,0.033589248898114876,0.9226892458443815,0.06434707301460779,0.8811518010749936,8.623919411848822,0.8376009120069088,0.9116661990767637,0.9644601945637248,1.103339466087854,0.8973457857872689,1.1464571819561462,1.9016202219380975,2.498185520079388,44.492871228567715,0.29066071675957256,2.1713322573628053,0.467314100202874,0.030516081255980893,1083.8782688244837,2.6291137238030174e-5,0.05026972871559206,0.025188734087342287,1.187706216465743,0.8470141626735759,1.1499168115530207,0.8402328544681539,3.6459158272960384,0.7947238198673444,0.79104873829468,0.8760447368373,0.5761189794897826,0.526685323804603,0.8364480494129439,1.0117962673026821,0.534418236107553,15.510029900770665,1.251156309445693,0.838919703924149,1.0286466871550313,0.13535548201343497,2.5320537449863586e6,1.0241191675964536,0.992347158295084,0.8049989333821002,1.6254901300860904,3.98398375880818,0.566729529072001,0.10197723521488433,1.2186561577085198,0.04400700247739297,9.086307543543592e18,24.93317409904662,0.6048683205388836,13.714203649846704,0.902374013557616,40.15835147613106,0.5998567545728399,1.7549788232831225,0.4979350215733788,1.081480703933578,0.9073885929583554,1.5833336312907798,7.91683777023737,18.695724899530962,0.23653905253795132,0.8775959643390202,0.6036944077955153,12.487368101066197,0.5760092117378801,0.6960934197986626,0.796174285673404,6126.381348040322,117.35546272784823,2.27857575314319,0.9205255379592033,0.877034461609478,1.2736124314960502,1.1201690641005078,0.8812287539020004,0.648037366151197,0.8395348971337666,1.2340954770983001,8.509732807811078,1.385614869459657,0.8210027818242394,0.5728742846139758,4.596354904072146,0.9347511338562229,126.15530783654593,1.151952274596954,5.427729181762109,4.330450985241976,0.849814847434991,3.106675099441109,0.6993367062939015,1.0051532625630371e7,1.0175161890480624,0.030903484599667887,1.007731313127917,0.7379623177225496,0.9163778722645656,0.8883973839972683,0.5416916173800612,1.3820671740615422,10.75753151170101,3.0948622567408797,0.9314454432211099,0.5618429307942283,53.82059121685226,1.0181158171503388,0.454210248867818,3.389577821259056,5.674839755620885,1.448669068078361,0.006099435169492339,1.4853815002337918,0.5059469989007459,0.002497311786517532,1.616985817315208,0.6704038672011168,0.04836409828729437,47.26498731597738,0.4319576941005326,0.9625226861503634,3.698331329174428,8.095745406448393e6,0.9100579108472108,0.9809324709989073,2.170251759138778,0.04796033329648697,0.7539366126425554,4.583989858516069,5.032986182411275,0.6875556425299991,1.0981409776615285,0.5886827026451749,2.2427257658833045e-5,5.986200613061113,0.01296101582153241,0.638707007034283,0.042849925608667405,1.0792315967593173,0.4902110422710697,11652.406490345693,0.19835571436284927,0.5692645423681238,0.20053806548426606,0.43474306581247324,1.0982123725706867,189.1964270513198,1.2224107255360224,0.29984535512344895,1.6736284710622902,185.62473806629018,0.12701770986338312,0.5485716477147199,2.3363205090574404,0.8327121315592653,1.5167844868444105,0.9497787377083469,1.2880479705105148,0.4570291597342797,0.6474614659434947,11.644315330328128,10.673684659805103,10.875561114748704,15.336311634286337,0.6148688706000168,1.0454451493565824,0.9500933912979211,5.557004602985906,0.9240907923300404,2.4122075479325176,1.0288317789846566,8.218884358428692,1.4931123479386814,0.4704257698871453,3.743103885840648,13.89713726995085,0.5619612287422552,111.45474960830012,0.9878339623034086,1.0982898474604235,50.67304851322933,1.1043457225337932,1.9140947101228207,1.0931694649960986,0.5968284488088222,0.7699628757235109,3.7037055529991695e-7,0.67129138262122,0.5610395885019597,0.597650061685653,0.15777802121378473,6.45218684461256,1.0347188005185641,0.0037837455845765615,5.220120526163358,8.111966472055713,5.103456268661029,1.2378147750558366,225.28644059092304,0.6669346178541236,3.5011882368614446,0.7704426152882963,1.6144413574515875,1.5068284117744424,0.9328375474299094,0.30115077038285887,3.199686900440434e-25,0.6020377725078824,3.0160890570765257,0.003917570686392776,0.5262150275052168,23.799376684654064,0.05672301075888412,2.333671453085352,0.8388605011692402,1.0005143602117028,0.1736069482283886,0.6563350173638232,3.309155507593162,1.3309106877764096,1.2007438775288254e-61,0.9296092784844789,1.0673241735374248,3.5433140650324026,1.9366192960051567,5416.745638090666,0.7556536814979282,227.30912002282517,6571.788057904299,59.436993327349654,11.612144427857269,4.9092510149502696e-5,0.8652704235742175,1.8921112331364716,0.73927070627438,1.0247086427480236,0.4452839510536071,1.5781709368552785,47.398048246597355,0.4539900591152631,1.071369816220566,2.9495930159330275,0.16814102044972828,0.8529473199932524,1.145667276338772,0.8667479149578943,1.123648778068791,1.1823740790972022,4.2677729119273575,12.933592178512132,2.0603129047036464,3.107475516514029,1.2210737096188162,1.3799355744060091,1.9235328045529757e7,50.27041304953256,8.148815849742557e-6,0.805914402906274,1.1732378804474615,0.8892160953177843,0.0572369001559191,44.10203455157107,1.7229515353522429,0.0012229956738420387,0.5369897200662339,2.929629931278697,3.6308106259630684,4.151529206203011,3.371033575882768,10.733748062149541,2.182560593181796,16.177574220005912,2.2735721900926746,2.0397448224341352,27.32027185444259,1.4188542684686172,0.008691734097915758,1.2046036468894605,1.9589911365084058,0.6345082381396644,0.9572284259811523,0.6703667525766274,1.0360414031031584,6.884910904400568e-7,2.337234973052746,67.28993022351901,1.2105413974682737,0.8219052910903731,2.2703985481366815,8.278235404808681,0.05000230288746858,0.7056244571768188,1.0674396181505412,23.704954023782356,0.43785380551617453,6.050661643578222,0.8528994039530863,0.7452551461164509,0.8934315873333226,0.5152620414988746,25.451366227118264,1.009428447803153,0.41049615526563477,0.9020313933265494,2.0177446630544513,0.2742262259166543,0.6081289310335429,3.554912985182341,3.349510302734768,1.2598796557281966,1.486564401522409,0.7499359934252197,3.113184246201726,0.8945973348239744,0.004402239646967461,0.5245191690300735,1.2551899384126057,1.4369134524065739,185.06920023366848,0.7810357411214406,0.6352795187509286,1.1290528562141933,309.83101639764607,179559.50562038098,36.64618062003089,6.23062462489415e-11,0.09427502532778854,49.10560979979669,1.5764290102726528,1.3492464900415482,8.726926551698456,1.9018157728869494,0.6944937388108805,15.100948110494429,3.786817290768548,0.8947012951330319,0.7780991925421916,0.4235584744838987,2964.6362179528764,2.2611377836106934e-8,5.550163766312994,1.122761714095732,0.022377559257792425,1.0840079894446741,0.136680381563337,2.2225671790877817,1.858512636802394,0.389135486149315,1.3359366906037344,24.022590072748375,2.970641607284982,1.9791587326638036,0.8378500317203105,0.9406855124761364,40.460845398980574,0.9935024460909263,4.054722926293369,1.054998081814579,3.93846634656439e7,1.1385851405165412,1.0224102406488225,6.417593293684851e-6,2.98808707760659,78.29635833608174,1.3703797787836973,2.522682413682506,1.018986657863628,0.7724995560059265,1.8748552899730058,0.8740731899197921,8.605972868925249e10,2.839629431385469,1.6453539552289014,1.1234260505220661,0.5969155675654825,5.197235416302967,1.5320648600814195,3.2465762127959352,19.586453707652957,0.07712039881196744,0.7385024440346748,0.37090271305143074,2.249838282535833,0.761169536138587,0.00020808293861545858,8.155294539229962,5.327096483090355,0.001984346523779433,0.31298056738033486,0.8860516067122466,2.6148098440315137,2.4453976994941042,1.5738420754494906,1.189039324263027,0.7245951036917441,0.3425937986722861,0.5796145759416934,0.49265369439145856,5.874710967327474,5.574042051868411,0.12719242144665435,11376.211851650582,1.058413036398875,1367.3526947970063,3.7314838868683524,0.4485559334320559,0.005068303541738629,8.107512660096816,6.851492635346282,60.838248811518454,0.8493961741659078,11.404215216432462,1.1555080222215157,1.1077328907609743,467.0470911171388,3.046822955898501,0.7092333206653567,0.6537455852192995,3860.964973033158,5.274270111364412,0.9890994168573125,1.3918526055041764,0.7312775024804001,7.3633844720717,0.7935987661012368,0.00808298595945948,1.0569889959948346,0.5336780590855861,0.34753801162647424,5.909832038779129e8,5.65937573035171,1.0029356001168432,4.879060629312465e-5,0.9936367000200893,5.435466910319461,27.237711419195577,9.903294027907059,0.990552546121637,0.540469030291341,1213.1195132019584,2.190001798353052,1.330711251970913,4.451901512420375,11.40383059706289,9.622624550873757,6.227078760559473,1.530929985937693,1.0130256018012052,1.3278976092131993,0.5751100781720754,1.1762077122907566,6.3686327199089074e-9,8.4072874431511,0.005472730310347147,2.589328824794688,16.783386254083176,1.2748269740614315,1.0669048189373909,1.069114199669786,1.5633219341523696,2.7726896153053993,0.05743645885913715,0.2015355680831111,0.4256317391765228,0.24289590718028686,2.422822473685136,13.411369796933418,12944.933315608603,3.053684780778189,1.0098182274870073,0.5773909224525856,52.01500232467365,1.5190816654238106e57,1.3871959228656447,0.6639126790239877,11.181652817666142,1.465288431884569,9.059622534353762,2.8951699874523023,2.4248336334262234e-8,0.29233055084316245,0.4558474937280747,443.7237079413208,0.9163598318490741,0.8222227064121936,0.28738922288450364,1.692759373972385,0.49927224138531406,0.4910826229976466,10889.82836173058,17.67154174705521,1.0347630015706568,0.12155897944451419,0.014506325115165069,0.8788337886497326,1.05969890736546,1.024782944448497,2.27966181141098,1.6128514187613332,3.8196220288281597,0.8536742187220641,0.27703443404578343,1.453936732861485,0.49742322664110794,1.4734838606096832e7,0.22376792474690327,0.8128623910469592,0.6492568391660234,0.8161052398101689,2.8789987356056304,3.7868819453445925,1.0668230762758995,1.183422868205214,1.2598657223055156,43.387370871299595,7.853399270780802,3.168450980596537,1.7906370283257893,1.005250615630634,5.909174238234975e-11,1.2512715405215344,1.0646630377782864,446.98237683287897,815.8418389107526,0.0533295145290751,0.1397708440126251,1.5715600780212686,1.0867278344892788,0.20282170600496152,14.122606963435675,0.8433787628199946,0.8034811204181853,3.2572330949847257,38.21647041355371,157142.26735138753,3.0638345751740834,0.8510119368831462,3.5209790479773875,0.6061977549656922,0.10520476503702784,11.336913426848445,246.03769856891807,0.00032916048723161784,288030.920985689,1.4015202355884546,1.0161453711716892,3.150491389924383,1.0574110067763212,1.0088570948162008,89.16407537351226,0.029388353411633053,6.291471612830285,1.0939763770485083,0.6462338962243738,0.5895124333722268,0.9099016994828045,1.9151995591632584e10,8176.7979837278735,18.717985914916813,2.3137609764797586,1.1386017307649712,0.6386102002457156,0.9223470990443444,1.6904702771601745,1.2247242344708595,17.31199355659372,0.25097964486531305,0.04471036748508064,0.8217589962671187,0.7685437501169982,0.5703545893859158,1.0532730758454285,7.582700348379535,3.9015423540073475,3246.542463870614,0.032767820967842864,0.4901666607051524,0.639070609950462,0.000590260559245917,1.2014117640845399,26.612770079358437,1.8699810992189525,1.2339558623342919,15.516668222891317,0.8975054966954156,0.8938736586878419,1.0769478363117795,1.7413313367351473,2.1391406515907128,1.3922583996374671,4.648994038880211,0.9881950724487715,11521.727064255636,4.428383574617578e-6,4.182957360673372,2.0861386078186257,1.042353963150462,0.9112275958723084,4.428129648171606,1.4641119864349275,3.8334040617238476,1.0542549223348165,0.6493041281445032,0.48766963011303005,0.08599137140292994,33.12585992164927,2.2190418395637814,0.8320374682276049,12.4655644622925,4.353052647551888,5.6832220798971,2.3285989030638476,4.352763289227981,0.9663466363070973,0.2943971750792586,5.35839055256285,0.7222028888689139,0.14170162973502465,15.009016127597587,0.9088471534588709,1.0254001518797473,1.4893480067395453e20,0.881504250956591,1.5950007570905533,1.6264339877512347e-8,1369.6130451530137,0.5668581583200122,64.0842757817215,1.6922355417665138,21.21263382627389,0.14748502536420982,0.2542150125402025,0.8042803090481854,1.1995886408494083,1.0236648775280248,3.8668336739345825,9.593816475551282,0.3179822738240031,1.0197345772645732,0.3078915005105248,0.2683614643848,1.3964050708518443,0.7845344799660395,12.960881712938953,1.1146326378531823,1.4687619259161442,0.7737162340083663,162.8031428774719,2.1013776670408753,0.9577291318587633,7.855609120450818,0.5167159274775392,0.8195011275633127,0.09270457502058164,0.5515697054166218,0.9965028932005262,18.83271067374834,2.9020281126033067,0.5750539822033345,7.225885857109065,97.41875114121383,7.7156863546649745,1.0622522825948162,33.5847732374456,0.0004098380967115621,0.5773416224238981,2.0136294082157637,2.0657682879988064,1.2839817701700689,0.02257914840293655,1.4557434333984833,0.46128975751530227,403.96731573886376,0.45487990272891193,8.484926226524275,0.16260196587449705,8.976841258109213,6.420893176769956,0.6770251209816103,1.0650317072109992,8.426288640706764,0.7768543274674687,6.600972626128407e-10,2.195859941945621,45.4942476149574,0.5263321497565804,1.0275527852569497,41089.01854867822,6.672085479747602,0.21980383040772727,0.057681264195715024,5.305776992999121,1.0217900417095782,2404.921659424042,0.22287679220255638,0.8991454118841568,2.0671761810409004,0.8649813423133322,5.132057781903986,0.13237957815943466,0.7975018029654901,1.7149200194246161,0.2792177104790551,1.2251341676199343,2.186206146217075,160.64861975867913,0.6751668972336431,2.161420707573044,1.0990547045673082,2.226014107284976e-19,0.7367531351512274,2.90299241531605,0.9502689970049748,0.7364946480096356,0.812292183297582,0.07827942526543012,111.51309289953471,4.433467693559321e6,2.0398135773261625,1.3140045956019633,0.8369676010283369,3.9461741553464775,5.865140403498764,7.733132436008411e-7,2.1946287073420443,4.555872966424089e102,0.4199696385253684,0.6645903337808692,0.693314933763668,1.1063380407314716,5.789880760256609,3.381733974966081,4.148185509456237,19.012961257818045,8.670986562516288e-6,8.021369094061875,0.7448550231507802,0.44065991229064294,2.9792335518664226,1.2399997053566936,0.908781835901405,0.9996312710891498,1.0358312712578048,0.9152207449537347,1.0083130596503451,0.22893183129605202,1.9555287341385235,1.4808496622924825,37.72762270041081,0.5106649866306768,1.0029753185034658,298.4567098069568,1199.9586721301775,18.29936409533173,0.7325529821287772,0.37922101523064156,7.914304376485806,0.5567865893430868,0.08456130814459188,2.488972373742506,14.84110103076156,2.420167858560522e15,11.29129577635935,7.376418478906546,0.9466591199933261,1.24913386911907,1.5694469780337592,0.9786408677741654,1.4395524542503533,1.2595608424252314,1.374460219299656,30.016546767350263,1.3926173439892568e6,2.6347762269224644,160.61356289465638,75.35977381295244,26.474162965912292,1.0056867025748717,5.050440310607004,1.3854038179172665,2.417883162443343,0.6896109307021935,0.9165690739361597,1.1346598465881121,6.099166928217256e-10,3.2762115549832798,0.3873991982027151,0.9386979627045878,1.725054787461825,2.091991508386698,3.891811820431629,0.8573005320727142,0.9729007282574038,0.6596731959938165,1.302273248770374,1.0586041691307064e16,1.9184576521417265,1.0815185718636295,21.581227055594365,0.30794819379468985,172954.9178134987,0.9093782037334559,18773.914309583048,1.45006358079346,1.4100815069792825,0.5941248108749028,7.628867559808467,0.6752548875310468,1.3061553656511,11.075272728054253,2.5121800981734332,15.682059394641417,10.325279343477913,1.5089409997232865,1.1404014943421965,0.8165060663163598,1.124238347782656,0.23929210612897903,0.15925121030555228,2.3818644091702486,0.7900424408922279,1.0935782147289381,1.0776130773652497,1.1380327030935786,787.7459603006382,0.8031559964012843,0.6258152025121472,1.98256392600253,0.01523509783936783,1.021173487790224,1.1108781414450668,24.99894869045358,2.5453890689796728,0.1270861030795992,0.6874904818644654,0.08909439422888357,1.9306977373533165,1.8030688917855644,4.856271345274554e-9,0.7509648444979095,7.140813313178624e-17,8.673723300319198e50,0.7156131772714391,0.2770812570789287,0.5173198451744188,0.22228058974140494,4.277366828557433,0.6638910764273958,1.1484860396193948,45012.00766317622,10.486126476514048,0.7185667541389674,0.9701620328734515,40.34288981587329,60.99500787773969,1.2445860148757528e-12,4.013546355159437,1.154825454057106,0.7350374702652648,45.64096838820988,0.0005663892031883653,0.9061054504215837,3930.374112093469,1.1148349521295386,0.7024801128572454,1.4077092705143928,1.383354441934904,65.99867989567149,1867.7404585109912,49.00348805762746,244.49177020622622,61.71332510378458,1.673779210962036,3.4993789720138655,1.7352958616864457e-33,0.8645930165528088,4.474861635636593,0.010496289651159561,1.1263219432226605,0.9420753312493458,0.9145648938151788,0.0028643740219509023,17.130090373584213,1.1203817833077703,20.8972679002617,0.2634987396103411,1.0271080830241075,13.565147860666325,2.313031773318708,9.79432269935353e-6,1.2216443578014375,23.297148116929648,0.05277847890246599,1.7173228794100384,4.261687603547089,0.988949403487395,0.46319992472563515,0.8697412117451089,2.295736728268513,3.693773619112353,6.762057810078501,8.098362701036637,1.6575905205963675,0.22002870174338687,32.61613256631296,1.0008699990015455,1.9263263661034018,1.2840416599894526,0.8813264132090154,1.5030334164407857,0.7519372417413867,2.637446599720621,12.418376911564113,50.16604554066302,1.3361175043274598,2.153031329807948,0.9702418463627983,25.32396697155726,5.085317359488506,14.567727826118734,0.7080861052234803,0.5790328834839417,3.7482062815970667,2.8420163878078704,2.8266526996189407,1.170814548919186,0.672015770560128,0.7857756208710855,0.10202322041568648,1.3689268502026628,0.38404280646041106,0.7142449899881882,0.5257859638948896,2.1437291719423155],"x":[0.15761369874661482,-0.25489463054236977,-0.4269018328382441,0.19656727414365915,0.0011191820627998728,0.030368968252631218,0.07895256635504971,-0.22031726929307693,-0.013609660910532284,-0.40912998096447023,0.30342054441630645,0.1768795869513196,-0.6368505791416023,0.42079283929891714,-0.3553094317320701,-1.1214443595463772,0.258850842277893,-0.5055665220122102,-1.3794524324778512,-0.06421417601670382,-0.2753359929644208,0.27353128852984465,-0.22174432872376493,-0.23988299924844975,-0.17745798148061676,0.1571278738524309,-0.17479615023283546,-0.524365390726386,-0.07611731369232616,0.053681396204950604,0.15390870149557945,0.2888461382105529,0.01217252343196984,0.43234168198635725,0.2893936793095542,-0.41302709527947773,-0.11524527809921373,0.10495616828722926,-0.16317441478838995,0.43569363181752374,-0.41684516902547597,1.7737388202337971,0.12716148112233316,0.03498843022950743,0.20688412143737472,-0.03692342513930402,-0.6036803657492675,0.1974771486238367,0.1284501489914382,0.05606132034180644,-0.25501491412445915,-0.03497491886648302,0.5167786622547692,-0.5117511950344481,-0.7133388280306483,0.11105639901302555,0.2581896594545594,-0.05453600984443388,0.10493323515868497,-0.7649031181188696,-0.18413511975665534,-0.08878589528996983,0.16833687265690703,-1.1103692079435428,-0.1973410148662217,-0.5473841639651236,-0.1615247136138993,-0.5642543817759171,-0.07491355136022043,-0.06129510925516024,-0.005998580535698711,0.04560163338017098,-0.04957601915393672,-0.5890542595617378,0.10704417786772985,-0.9375701803159318,0.3964704877445341,-0.22163338473620753,0.1094092089974148,-0.4827062555682851,-0.7999556518598948,1.0544907959645262,-1.377088723113938,-3.023370664974915,-0.7502065962126547,0.02585606580893743,-0.14944237223823423,0.05030788162326852,-0.06863265766167898,0.30711180176308883,-0.02762697300771877,-0.3552799102115735,-0.186314152741126,-0.07589884739594494,-0.17513721559284262,-0.09126450417238802,0.014164477766769046,-0.09109795692865252,0.30477501185748024,-0.3119215636503596,-0.022698990700428467,-0.16757116754529047,-0.2880593813923091,2.6029368610803134,-0.10287016775596958,-0.25065004811361097,-0.06960642227834218,-0.23317435476302278,0.17230399671599322,-0.32362893481532773,-0.5457292556909781,-0.40361443664435187,-1.4114082550748424,8.077018621067168,0.4066660836402016,-0.18215211653424962,-0.35947082308671224,-0.021710726537993996,0.3747349298667847,-0.11705478443050138,0.15071278608026406,-0.24304991037273138,-0.05784113024745399,-0.13344089086442207,0.09687544748944887,0.4323934432608011,0.18572731053733627,-0.19845374415930095,-0.0933365015855823,-0.1879035228931987,0.28730289387771063,-0.2004399283699409,-0.301385521688436,-0.03197453639761802,1.3421517370215985,1.0528738034618543,0.1996140597567665,-0.1435638305971557,-0.3929356156695866,-0.7774451921341492,0.16186383752230538,-0.3883920842259398,-0.25665004352226745,-0.18661960168871217,0.07353969313697509,0.18045797716384626,0.03971552554428204,-0.03196547750880269,-0.08271718946831993,0.2615049534064322,-0.019195362163048235,0.2494857904202507,0.054529081131232504,-0.2577668109564408,0.17731644438372668,-0.05358397062046383,-0.3206781023628689,-0.051968112826982965,4.658774971604338,0.003920162215709011,-1.083207948398905,-0.2207056593829461,-0.1791491488119274,-0.035071270972404756,-0.2705474377605882,-0.10360648241581363,0.5063116309411999,0.20002283381062103,0.10516323811343445,-0.18571250325627137,-0.07763358663038594,0.38134456500320396,0.002393673948523578,-0.36927994547188836,0.15695876394636918,0.5596075667580686,0.42704993491957466,-0.9079477441669879,-0.8028076661637892,-0.1468895855231063,-0.6834294830484541,-0.1566920852917416,-0.07107147944908407,-0.34422553446091086,0.22049941803802672,-0.10762240152819669,-0.037784516895969955,-0.252382482923192,1.8858256865388174,-0.3202472126512784,-0.050738212168025654,0.571763645195294,-0.37833917276658363,-0.03390222474043003,0.12264264984608875,0.16570070160081551,-0.058992948432908726,-0.1491877937017903,-0.21451708865293856,-3.7664193665419954,0.2300920209045662,-0.5740199560523482,-0.059682546206931225,-0.7946690890504495,0.010937741996395522,-0.09326394656756098,1.6817475086822895,-0.23504431297537048,-0.47907720859791253,-0.47918029101899307,-0.14342806152609322,-0.10066902659529622,1.7433792945596078,0.035810944629132646,-0.4381114450832703,-0.24054922167906934,0.8622345946043743,-0.4671919089829368,-0.06416042598237992,0.16798461597515424,-0.031302050899422895,0.10282327470817379,-0.2607775889405774,-0.2134036761886219,-0.5879653602182998,-0.19512647866880628,0.28254553802918936,0.19352370647352843,0.18051142008411966,0.5138620261517968,-0.2210961850932951,0.0430059018159038,-0.010502037212855503,0.1564380432015373,-0.49623237357987715,0.7169066825652408,0.007979041383532726,0.41577652690002087,-0.2330060109227295,-0.10635673025874581,0.12003590993093283,0.4312202286144591,-0.09723080995065955,0.22273485492456505,-0.0039354815906979534,-0.2549316279383973,0.2826558323596721,0.05727010969743068,0.06600300842491591,0.026772021318174744,-0.11183680547441399,-0.08756620632470002,-4.768575415726355,-0.17220435441169085,-0.4824253837169306,-0.22806001257685873,-0.286074867181163,0.2246183755577122,0.020238538940539896,-0.9049197088881874,0.23295688007753163,-0.2931641264921748,0.18448830539959987,0.10282457693339209,0.5397252473904451,-0.14998654415204932,0.33869929564502743,-0.18681090914993387,0.05600317525521731,0.05585245558024421,-0.017300187622515617,-0.13902788572126212,-5.914334493664054,-0.09149076977197984,0.7541591069798566,-1.6018100025041093,-0.1031611676310975,0.2391578545840654,-0.6352064495546388,0.10549686131532127,-1.1312539792431915,5.3934686995604775e-5,-0.34947057071166066,-0.19346661297690382,-0.20289881243684219,0.057685752607985,-54.98180504365305,-0.42592440305052404,0.06923658046440889,0.10272674006039026,0.16617594098897942,0.9335161277696655,-0.1928237831874549,0.2309545749061746,4.110453894147093,0.5829281350561495,0.21284134425844925,-1.1455031720633304,-0.060708689580079744,0.08960057223749268,-0.1761852313128848,-0.10662422045054348,-0.15700401783418463,0.1053061493802081,0.6731081488842463,-0.12944130438810628,0.033538978345173415,0.11436232288641146,-0.3087068493751475,-0.09091618251587957,0.02773170726521279,-0.20316638624130237,-0.3483573800256744,0.06353711358427427,0.17030123479038603,0.24183441144138434,0.11090585145124848,0.13718274065555386,0.03944091496405666,0.22807868828969835,4.103302216306361,0.34312062234936025,-2.3334781738909367,-0.1621762954362551,0.048600895706462255,-0.09356731651011399,-0.39271722627654293,0.3315698527641832,-0.6711052779328119,-0.8839886220744171,-0.0792454759285808,0.3096953501848872,0.132049522497119,0.20295933228748486,0.10670173917312492,0.15980868915398475,0.08268009070328211,0.8852043460082104,0.25194910744109655,0.27368052726146785,0.6932355560004713,-0.13182969664357913,-0.5584608534420494,-0.19192594018607897,0.14695738575694323,-0.07110362841561488,-0.016368539781769692,-0.10896813661100009,0.0070886887580786095,-3.577098585171049,0.115780634093026,0.803456724796507,0.0405639696864418,-0.0401686992547623,0.12391233215928937,0.16364519059045424,-0.6422332040962017,-0.8921740121159772,0.0373258314216495,0.2696617635608423,-0.2629308271202839,0.3301541564136851,-0.05381565426956536,-0.06649964901647584,-0.10785659770772887,-0.09421314290546928,0.3305379476840383,0.0021213444362155054,-0.5059743428041446,-0.06367925763463689,0.07375585609379737,-0.25406987409796433,-0.1303054521328074,-0.3381619298027314,0.11648547200778481,-0.1605681711817219,0.1099159878109695,-0.23583089205839314,-0.2034855366376241,-0.4726164072090861,-0.6076754016414837,-0.08433963440447263,-0.1641485412961909,0.06794307433330282,0.45078850183468056,-0.04401839869417856,-0.060454907005542985,0.077578441846688,0.7187338582477881,1.7243874275702065,0.789692168586484,-11.226466976437873,-0.32272991502457066,-0.19992401264062443,-0.6654832367839578,0.03345806503109966,0.22075107194739368,0.6435478624150082,-0.06288695500439764,0.2328759657719256,-2.1115787424103716,-0.06761564149496124,-0.0997980968665325,-0.2634960634784781,4.944551068840883,-2.8898730179368495,0.1788591376778954,0.1629133167155683,-0.8480315882437495,0.1627467762327981,-3.064988159177865,0.18724180650778843,0.24095605285251875,-0.12742533897472674,-0.1665108150743389,0.7340541169598528,0.5177489567843017,0.08662216015361723,-0.12778595207590537,-0.018716557760445757,0.38927906067942014,-0.07064768216250844,0.12346046567719887,0.005822072256248173,2.6136524236796586,-0.3272077224942376,-0.08776087583550601,-2.0046771235912857,0.12329585787115754,0.45860498517381654,0.06739020404029938,0.16201870164677484,0.0022014017035288935,-0.20568238169289538,0.06508564603010125,-0.08081730883919663,2.6519481966827505,-0.4757738779045241,0.056326707724091096,0.06382103678615686,-0.08307577296571816,-0.29978696806379096,0.07210914867693202,-0.42341866002068407,0.3136847683895396,-0.45513149681740894,-0.3763208832359987,-0.5215079662040396,0.07957968657829173,-0.029723423729024867,-3.0935514220606004,0.15467655393397087,0.21244472342055615,-0.8097707578128984,-0.1934023206783911,-0.012221773756899035,0.18167190856347426,0.15907792074269578,0.18567278742454119,0.09074527536337473,-0.11919325526804797,-0.24311886113120243,-0.21895183093320436,-0.16477878872924132,0.18881941397744076,0.1595119366769719,-0.49586784448082794,2.2519240412996595,0.0078122853691104666,0.9719904237144215,0.12677816055697255,-0.35620472562773237,-0.8005170687485684,0.33442889284779437,0.7461430963596235,0.8729827618690662,-0.26988476138922746,0.18384299649805141,-0.1056693278345575,0.02113974165787269,0.7101652106824816,0.12054451063783739,-0.07422534057664987,-0.19565313738523987,0.9444542187604474,-0.47557391525484805,-0.2363496573103478,0.10261342957549335,-0.3143073931345314,0.21240725801642968,-0.0529619638330556,-0.9642808930349951,0.03011340252976863,-0.5635325819585202,-0.18068251558230788,1.8965678754808049,0.3243835022980587,0.011025626867584792,-1.2355542218473048,-0.01520071024604333,0.22729145210978063,0.4783527781454935,0.23966059237307052,-0.018405027298785542,-0.11011242986436343,0.7979358681572553,0.14829422616088211,0.16706924518430127,0.12593542329274154,0.2510758561294048,0.43200908314657693,0.14117396307831917,0.06904439962216838,-0.07294047832610384,-0.34580102673540325,-0.15593893737947484,0.08114000792396464,-3.841189552036133,0.2707636139065617,-0.8688036432549319,-0.2536891183245192,0.23236214799323102,0.03815157581420181,-0.4607940312329425,0.07120064804804038,0.1218999343462242,0.1456727055291428,-0.34738192734516227,-0.3728585721620482,-0.11624043546824153,-0.46528769003162807,0.1256764463226142,-0.25846996738968486,2.657604874399596,0.17531016753858275,0.0025929256639048437,-0.23729932798303782,0.4800333132809511,14.598803656794644,0.06480991080221404,-0.1421694724840025,0.9045524314224274,0.3835192708440288,0.1830054036593347,0.10240311772584898,-1.7681847262678452,-0.19376471489928815,-0.23154232687563675,0.5616067181495192,-0.05490941387264081,-0.18875746743119615,-0.1378226355564951,0.09695176024705449,-0.16510709561673328,-0.10266108347742728,0.5858793846716168,0.20398255035576196,0.029307065224094403,-0.3729445094350097,-0.5775803907441297,-0.015423140359095755,0.017455153986207506,0.037934200800473106,0.2431524295685734,0.0664925937965053,0.19258368751352167,-0.025657610843258766,-0.4046344906868535,0.12097786418484247,-0.13561914328128538,2.22613587839912,-1.6237063938041372,-0.1369647468573607,-0.15911245562726017,-0.022837746461813913,-0.2041702133489592,0.13518516538136227,0.09174490659029794,0.11605764202161634,0.03375222882751938,0.7462261914802879,0.21472376840850482,0.11074102521100404,0.059084067402403545,0.0013992961801749804,-4.088827342249526,0.04401741789266286,-0.10026239852357624,0.6931323838644032,0.5641501172564581,-0.6316506127751215,-0.6695582074983781,-0.1718509339609308,0.08835524047396787,-0.21696791365288326,0.4836085401320769,-0.044700415749194644,-0.03374418354012354,0.27038842121660156,0.2563292124389357,7.488867557135821,0.7182275150082289,-0.09134924547227039,0.1979568374007668,-0.07510863099997928,-0.37904138572964075,0.4000304872776162,1.051818527437267,-1.3892923002480388,1.7136128174306622,0.07144456568894553,0.02383836878153678,0.135870845020159,-0.5477565539384561,-0.059746017338136614,1.3668859664177084,-0.5227144758546556,1.7399886663569366,0.016696858489486432,-0.06579112086312766,-0.4393880141995483,-0.02733626536754402,2.332761946186741,1.0797377871263407,0.40058619621485525,0.18674964985088738,0.05089420552357532,-0.10848109118904722,-0.08148285296389965,-0.40154371310455705,-0.20228237875536298,0.20914910179675505,-0.24659956207608666,-0.562716983398472,-0.08603644932198382,-0.0514152888545851,-0.14596670915751028,-0.11704096815974346,0.22060956455163833,-0.29957478076828725,1.703850497869904,-0.376329016719797,-0.20804321046994562,-0.05100760257515635,-1.7312532206037834,-0.16805887916056914,0.6096163291409245,0.1308778926022095,0.051758251827351276,0.21458810769772713,-0.30319823211671987,-0.104251999576849,0.0105782185283263,0.13128485578814658,0.08997781397467314,0.038527639562681903,0.1409137974298562,-0.027161221252985313,0.6809526346297523,-1.3907543619863751,0.20180023359975008,0.6101051183139861,-0.07041472251277747,-0.012892125016574413,0.24792187123672793,-0.19723824139389579,0.12629323821774552,0.03167686023209987,-0.24711517257934892,-0.22571827284928248,-0.2872092372092865,0.2584958815075346,0.19076232982100472,-0.19806651058394925,0.19336444112651818,-0.22736143778466103,0.6759206951680865,0.22647449878603765,-0.36418789492068815,-0.554099099138484,-0.5874715838899386,0.20277384845281904,-0.051962778909206725,-0.34090748905590773,0.2526137972687369,-0.10189842513018002,0.007509921035861011,6.130388752297831,-0.6198261267548089,0.07528302429524414,-3.973867894922995,3.0172707706617388,-0.1758582162858324,0.20219350170040815,0.15402484539772515,1.8933134384828594,-0.3500071602186505,-0.1451606692626488,-0.04009190896271164,0.0875275514123729,0.016153774317300584,0.13324216113588427,0.27520646184984504,-0.9469262663205849,-0.1865582785427175,-1.085701581547802,-0.2849154269379086,0.38243003167335843,-0.17314954024871554,0.40586041800996764,-0.08946871600030407,-0.13576181598523057,-0.10059497056413025,0.6209877154130177,0.25040802409580065,-0.17808767014799592,0.31590523867705195,-0.11847158730474942,-0.731874074757854,-0.2763305267375854,-0.3487165666980567,-0.23698167575133872,0.29749186130521443,0.14855217914678875,-0.08482635496244759,0.21416476143517515,0.450598228446789,0.19583028956896392,-0.2275369841280701,0.21589184130082628,-2.1248646971313727,-0.4867379227134191,0.08684076917529332,0.1837808338051422,-0.20202939255694927,-0.555308151513124,-0.2818718370041997,-0.17388294416999084,0.7664648135375487,-0.22405075074618344,0.34044429768868634,-0.2950189722656922,0.7815383364335889,0.3510956071918462,-0.19550358472024418,0.009639702633134933,0.1772754761175302,-0.07902649216373187,-4.250124171372127,0.07865974089329875,0.38721595710596357,-0.12738914191978026,0.024468559951478064,3.072972885270838,0.5911992161320674,-0.9528451759228374,-0.49247755170940694,0.2122018195126546,-0.12405529170700264,1.0609401286666926,-0.3284092199405445,-0.7272923828970375,0.09523682368394326,-0.16599674903284356,0.14988892249099484,-0.21197887345837163,-0.05119021366112972,0.13126038237751603,-1.4453929235231144,0.0392814362965036,0.16243191185269193,2.592861092102985,-0.11262708514903486,0.1298088324448904,-0.16368889435153883,-7.6379320238148445,-0.40854297195488054,1.5330521066221898,-0.012531711266234424,-0.12211031366616576,-0.1110745547487072,-0.2686787793569352,3.4797124012207505,2.380132004860185,0.0712063728567714,0.32081655617118365,-0.022021062363595134,0.16402380944614725,0.2729041362407782,-2.6287745611373574,0.2817402516166202,34.82895880220985,-0.09050871619365108,-0.04764051160601901,-0.2663583975810059,0.05473578040568905,0.16920257845125208,0.13327636915260604,-0.22765394373690176,0.1960626472144403,-2.2955750727208604,0.2931781807676038,-0.2689993094021488,-0.12092096002546594,0.15216563682441758,0.040380171155768974,-0.016016478460776862,-0.3501786765448004,0.021063617818850355,-0.02683135456614008,0.027371348065960976,-0.5194625233453961,0.07528023702014364,-0.20308668933561275,0.7724543306343931,-0.36862132748936394,-0.03897319030802476,1.0622520169022074,1.9701331115295986,0.18711394926873998,-0.061315216978120174,-0.15157071455328053,0.2596244979168164,-0.09124641490769125,-0.6026977593324577,-0.15998951205692807,0.3180026940679018,64.73783407148491,0.8247412538470646,0.3281592310562381,-0.08196923006944923,0.05248656759785347,-0.15505519647004504,-0.0032694919476968787,0.08313899474369787,0.08370838169144024,0.08916298484988816,0.42851578853006045,1.7358442338895395,0.18284827435592688,0.6231424369662828,0.38897414216976467,0.22767416014365022,0.011043326165330603,0.14477616074187186,0.05697144756899564,0.2968464742049312,-0.17888021271255466,-0.01180651903100971,0.055539151415282484,-2.500830566978736,-0.1933896302243046,-0.16341023276523486,-0.14862959274932136,0.08938773590619659,0.13874112969137997,0.15132190720620764,-0.1203593892586744,-0.013868713438412006,-0.0496110188479153,0.03357946113671273,3.5623526717138154,0.08611296217659722,-0.28111297675354396,-0.36763383170174846,-0.2250385916708746,1.5699968692526312,-0.11268945080161785,1.0670444113601212,0.05667377780190419,0.04562174868891902,-0.13810792262345217,0.2435988994383833,-0.4225154789750305,0.14853131755622834,0.17092583918831938,-0.22157929472189625,0.23241177763547433,0.2130135416294753,0.06142038638927311,0.02837678528041465,-0.0668504666865512,0.012078911553071725,-0.22460010586804446,-0.6921363496851465,0.2882996072411892,-0.11460536162989945,0.011536157743518571,0.015765454284014435,-0.16791748348594557,0.6976389725026373,-0.022230720131690584,-0.28190302578986715,0.0674367412570143,-0.526452092116914,-0.06544573145616087,0.010294840243397496,0.3985934691436203,-0.21669328764289256,-0.2756737569136899,-0.2017169806501381,-0.41782736272845117,0.11248277502123011,0.10779339631198442,-4.40838894084267,-0.17686904512542637,-5.201669700368192,14.890410599485804,-0.04998037391214333,-0.4153822181741904,-0.09285252146385187,-0.2592641093298667,0.33186322830214376,-0.04351302513736699,0.07460506888156299,1.9191383460845528,0.21966590768693162,-0.05480958103082939,-0.08691174068380877,0.5320200274812628,0.339674308612104,-3.062125687516991,0.132863279798585,0.14204826797124193,-0.037672031220425756,0.2161816681532875,-1.322990222114912,-0.038704654815927775,0.7435309261479355,-0.4851941682108427,-0.11667552810203653,0.14905789759549187,-0.20366147976328094,0.571414627056323,1.5327683122266125,1.5178448532853597,0.31358852744255505,0.7316713287053013,0.14971585015281302,0.24871569089326784,-7.722817751633793,-0.04406666935968828,0.2527297763960052,-0.6315816793104523,0.05454578049043585,-0.07140817262601351,-0.02518645446095502,-0.9114559989873348,0.41789572842189826,0.029783271632201624,0.21597302527298706,-0.6348961208078179,0.046601039655097654,0.4311961084267575,0.10835749316891369,-2.2340834642419294,-0.12692577545061173,0.33893079432888806,-0.45471328452213333,0.11247042706623628,0.15586649354215473,-0.08972819186029077,-0.09118342023525755,-0.15283162550676466,0.08492371238249818,0.17639092931431435,0.20198364205077896,0.23036692553481453,-0.2515010618741038,-0.23901861708452823,0.31685431943880654,0.004419493227015514,0.10118668288877752,0.08662893590375365,-0.03440299935261673,-0.17970306691650223,-0.032678754808726895,0.11143662397599963,0.3626328307346023,0.3555317395152896,-0.3717866962644482,-0.293422361918846,-0.014274043794393565,0.19838444001726893,0.14539369537992047,0.3089804635933939,-0.12052568964310709,-0.1955274020016123,0.15068337811641755,0.2504520971811718,0.10742958361465549,-0.16214968579081804,-0.12323701384310007,-0.2117517018139209,-0.6828340380555997,-0.17892160169151908,-0.2073270169156616,-0.06978614017528087,-0.31947171760288473,0.09060557685597959],"b":[4.811910768860606,3.159868091887369,2.09984789703615,2.3659986379468934,2.23849437559549,4.465415269032263,2.04417139817619,3.357287296633209,1.7109894800743997,2.0322499173464523,2.8891224383945158,2.9801557174024285,1.4685718002435466,2.196724506352623,1.6258609621787579,0.8285926714925196,2.0646568120496744,1.9380654069715253,0.6928556339664427,4.900073134342175,0.49457531146640754,0.2896987449998989,3.5446670764543597,4.035369480586701,3.6481205130238026,4.185682220671913,3.7072583634649705,1.5618313797831096,4.133906335481928,3.572836029685742,1.418633743865172,3.395800928607348,0.7717071202437709,1.2109444672363234,2.1272469180343725,2.1900824626644653,4.923626787915704,3.665011983519173,3.8587819025926273,1.2409956038335124,1.775720092091977,0.4273909249568919,0.2740671494635516,2.1560460813539595,3.251397816444407,3.593942343084974,0.7560647713937918,2.999719417587383,3.0178718901364476,2.780248551640616,3.463167647484674,4.120678079613864,0.49316868072640796,1.0523081160417547,0.5813742260658583,1.695059706311558,3.2630725300849828,4.419989651679348,3.9568851416704387,1.0721979472503862,4.258546557769299,2.0542994472891096,4.9488309660598295,0.48352983955771145,3.4259604246062683,0.9905755659093785,3.8940351597811276,1.7226920374097576,2.966912633263228,1.2729025045980102,4.872691175998146,1.4776073531241751,0.2628272463692083,1.281370868926941,4.251288268260214,1.059818925878081,2.4483927096401525,2.495869951297305,3.8177977040220457,1.1116745350197899,0.8453117658210152,0.4715349200416896,0.5364390404712149,0.24225856733752327,0.8146990307683422,4.715922002655233,4.596786787406508,4.284347930171986,2.8630977193785325,1.6061719352952297,0.7781409340720968,1.4803356586663508,4.425474444828934,4.050431321328621,4.447061847748373,2.346068883242812,2.668289024239866,1.3334768055511481,1.7722710974588363,2.722217237519766,4.0993009207541595,4.651541729788981,2.1916770428435517,0.23338718974488692,1.5445151097259802,2.8286076197370402,2.0178375805997906,3.0234719643881536,4.379854636042203,2.587840804518764,0.8968736371029307,1.7307822583027976,0.5210026448455929,0.1175385941130691,1.1246758651014443,4.109739140866121,2.7245322594843993,3.4919212922045793,1.5568197052966803,2.701624826097663,3.9084210737306444,2.726943188126226,4.772386648846006,4.32552908726395,1.6782299546321622,1.3412634296071957,4.697210537919167,1.051542297469884,4.534164830928501,4.541362143030968,2.9796382193174944,2.5900554343504565,2.2483202178603934,4.621538184599117,0.5875823032603578,0.7353988863159422,2.478664222314093,2.595478506751375,2.0614335217007906,1.1481012488354392,1.9309687285051447,2.1940046211970152,3.6195765514822185,2.578735486846435,4.507215873976688,3.3244085387205233,0.5417635571541735,2.184725981142739,4.406750532433,1.9633566528114321,2.172230150842318,3.964434832881918,4.570644429305235,3.85040999725263,3.3561594158309624,3.845540022175321,2.8581283957755432,4.533196159709667,0.1994886849177646,0.877659750261075,0.5230461911744888,2.77769678487061,2.9486278290473313,2.7358185474119345,2.3280457214323116,4.001710476974446,0.7657064936466051,3.382039547700261,4.363571469608627,3.557306949596919,4.233115361331855,2.0915508872046615,3.086219666920782,2.0184685031737426,4.763348642139674,1.4278339371033477,0.8891392458232417,0.48775366562981537,1.1685794320968557,3.2297099111900875,1.0812490411716214,4.9746220176913605,4.611703654413629,1.3617814628593994,4.276786507939279,1.1589027849646705,2.3153969635120975,3.7106003816083346,0.48682238555615376,2.4118016699262643,2.678817868926612,1.110631185718578,1.5382171100820452,1.0077435726284545,4.54306196218294,3.3407541092417836,3.3967832670782605,4.529844728269944,2.04330045244304,0.2266256231285313,3.358792840576712,1.1848957109620495,4.120150019007921,1.0830742780057456,3.8968741462093615,3.0100243472817265,0.5517145074148755,1.748567578101925,1.1784075074693523,1.3351841066786707,3.5286548677276386,3.2903685977471553,0.30655471455235617,3.783366090984944,1.9442478897859217,4.02596603895473,0.8781261800735951,1.9589378945439428,1.0755102844601938,4.1077496660700135,2.7695371323351847,4.906550385792543,3.369261081594396,3.1070630341764405,1.3496880283937274,4.343635471312678,1.3809392715949265,4.207369138459292,4.988306408939396,0.22717683265094823,3.340716612478163,4.287300622596206,4.141157314341872,3.336115399981824,1.7552873749027065,0.9090353610271817,4.376332788773539,2.2470298398818467,3.0425282653120025,2.1043078545902705,4.003953233251022,1.9875172583899814,3.320293465584654,4.435841849213505,3.6494900863899202,1.2373969013778618,3.3423725610201114,3.242080938256037,1.523674653738455,3.484839889643797,3.4297910550836876,1.0944081770928116,0.18728406092844763,4.96978855802071,1.6942479839005353,2.611318669835022,1.5082182784568976,3.345860974420629,4.768329328681914,0.6408743763969327,2.449451224189374,3.2453235617968823,3.098073070810885,4.167170235053962,1.561493638817365,4.338159525515357,2.3060933581863674,3.5452400214055135,3.660386426460027,0.7911290487242506,3.212437581013102,1.6549525351110184,0.10718697655747067,2.2394682359211626,1.0119106293685698,0.33379253163588807,1.0593519808923646,3.6944147037010255,0.5596083528096263,4.009995872522559,0.7163430600280052,3.0819835194553047,2.1130124471918075,0.44655242974948495,4.155310645584605,4.118956685400668,0.014697153296906462,0.59968387622784,3.195372412963037,4.903256601642555,2.0666215820783,0.6075023006644453,4.102984377017165,4.271959392150633,0.20882399560284037,0.7514220957817164,3.187441820514103,0.2690911659583395,2.699538938331134,2.8610732270474895,3.3212642521696467,3.7910278281912735,2.7003640405280684,3.5735940140474143,0.11867166042989319,4.673646381122042,4.447499380797588,3.931883338199116,0.27680966088644565,2.2667373973718674,2.961777694257146,4.4274144291176825,2.3945779186962968,2.479259155204746,4.432225535841143,3.6224243073987483,2.8186462494986317,4.047043711596921,0.7059708199857828,1.8281179342287457,0.10396025563766287,2.3054238500249555,0.2300711518609544,4.027368858485277,3.1232747958873466,3.3835611788593423,1.87398734669465,2.1190380529193242,1.2232709151826038,0.44900816252288145,3.3198386744406916,2.2232653171832952,3.9394342712115096,2.346994674496028,4.252224504075784,4.693377181461345,4.716180562324988,0.5887354063496975,1.490366084036806,1.8590524131578068,0.74986579795014,4.948539578847813,0.9006781166541566,3.2360663724133665,4.153030400874853,3.483673154330602,4.993225097275944,4.444463332075303,3.1714066492206907,0.1897426125681878,4.888641384616651,0.6624995924956989,4.520985401690851,4.893361599702497,3.133816734838809,4.805032953375251,1.221596866471375,1.0437164040204272,4.33210832997284,2.933609200781623,3.3837444091010296,2.2029716233956407,2.2783714348611084,4.548889287913097,3.3478199802316144,2.3883792303375104,1.5004848263171688,4.302187360890128,1.0898795740415856,1.2482593167926603,2.8352433703232407,1.2424277389295257,2.8745537323490753,2.587503864193997,1.8726226370543853,4.9996274746920975,4.85428512627081,0.6045408544061592,4.553804044531998,1.9811873132341618,0.89498715026055,4.879371789348408,3.5270617942830396,3.201728079326408,2.1444716586215695,3.0339314455840825,4.361591931791546,3.5622806666380544,1.1207741451546382,0.48917776995700213,1.1959392576695738,0.05183322038651905,1.8086986700824614,4.991884718973467,1.041550650835944,3.7309201228100886,2.983160180328971,0.40753946168571087,3.8502695252300336,3.2888529343723527,0.4487416531031929,4.959625915208622,4.958115607247735,3.104079189510375,0.12784290704393797,0.15788896904685767,4.605279139380101,1.1395438208775999,0.5816853806632394,1.356366409619757,0.027914379650210153,3.180141162034019,1.564816144290927,3.7064006288901377,3.0352008465148095,1.245107623315358,0.9041902214235642,2.7198581053801396,4.2990801817457145,4.946235520973657,2.0776122026034995,2.714159344022092,4.52878015831754,4.382305043563653,0.18011201492242113,1.5639087125709272,4.130010805173531,0.4756873603068401,4.519268669001986,0.41452059391272833,0.9073016559934866,4.582908787689376,1.6319408050215312,2.3929873833109108,1.5748462224012416,2.3731355841429647,0.28497912251628565,1.816934427242074,3.95897104067732,3.3627770632344856,4.07268601572529,3.0698913490408053,2.8798851120098776,2.129209049612988,2.1487616491829598,0.8063157285468281,2.1707943154637652,0.8535508296259231,3.921211228069741,2.830430680499135,0.19891335835270807,4.806116857322042,4.057219341243146,0.8718935148175244,2.2998647110373103,1.4677896722048134,1.85934962413429,0.4931024150772578,1.515571730099724,1.489561720268776,3.521903487022928,3.482528282567743,3.6330685836515975,2.7572222308563443,4.66097376472759,2.8947234714810257,1.5091886778184793,0.22223916292295032,4.358253817591287,0.5144805271307451,2.6514363042854496,2.6566219160090676,0.5878551691240141,2.181736165314777,1.1444934904408677,0.736118180307539,1.900764943687382,4.632082137173846,4.46318964440831,3.776852267600783,0.7700680170759422,4.742010461383056,3.315528615953304,4.347423049532589,0.36828956462994666,1.9673938873193708,3.4466286860277684,4.860842160474657,1.2477560674646149,1.4073448480581185,3.9904168802005735,0.9497142531022118,2.3691066180724176,1.2169271941838378,3.5254523854638995,0.5208389894444332,1.8780539109842187,1.3211383395349574,0.7505992608923706,4.627198176112071,3.2316770122571503,1.6379518830503936,2.430088623500366,4.938493327876196,0.5639542246597029,0.23102029619281095,3.7292397532249666,2.3042636653597404,3.989102398555171,2.4423488387047243,1.0393256806669915,4.195805424980472,4.528918372525094,2.0320758072508873,2.4320722948193496,1.044901472305756,2.7969063252086435,0.13376723354373343,1.7356802091925483,1.0904908932594348,3.823537121157572,3.471794780171815,3.566835593398523,1.0911361120927032,1.1173280688135412,4.129344097198754,1.6811715218834766,1.2933299173233404,1.728218809015769,3.728961031452367,0.9612325156094204,1.9465686661375214,3.7301894273293312,0.28310818545709937,2.926110457376719,3.961294659529906,3.5392723134850543,1.7658610196016922,0.04330525230123006,2.1748835883831052,4.742252139801221,0.9271972861951983,1.3997191422772348,4.9117200458453025,3.776674345987133,0.1786806015936948,3.6549806255138084,2.8968273648257448,1.6631293019601323,3.968414633785007,4.7570813729706085,0.794715999667337,3.400094171773742,3.4570149318019205,4.275025781051447,1.682726503701395,3.754736893021801,4.302993904532693,1.3042485929380399,1.0801024244059476,3.123782094828141,4.135054412931498,3.276188705241357,3.0809013551341424,1.8694064941268174,3.880384583992088,4.774470328756772,2.235106464327644,4.255364515857104,2.166381350021751,0.2496094909299984,0.5605360898573364,2.0760522402224835,3.9672716330313063,1.460022572868448,4.031205027912165,4.144575410540154,2.230317405341,2.209766250073033,4.694048764100626,1.2349150216431004,2.3784102991477027,4.278392291939919,4.602118557471602,1.1082644867613567,0.19235667554675873,4.6123662277019655,3.0311585429726384,0.4369042854019567,1.5064745612807473,1.441875900960714,1.4120350519182234,4.434229252697288,2.29038059392086,0.6757856362604842,0.9533564880509082,3.2101741873911402,3.18298551538172,1.7799939856044944,3.4840639343168722,0.09774303457198319,0.8049727645296012,4.571097040241822,3.966891427390541,4.694078081360601,1.8663338410411923,2.3615708773086954,0.6039138286911261,0.4862050391943551,0.5633767955624946,1.1555527514695119,4.907785589477223,2.683354389009718,1.1517530585720726,2.941272472441303,0.0657307757626846,1.031779181839555,0.29263774454067804,4.461970987279571,4.423441394491325,2.1816867713190815,3.417524271917963,0.4142621658093182,0.4581490606378191,1.3628086462879774,2.978533175383893,3.870618779342412,4.182892355172486,4.684502543438783,1.73702646006329,3.940684328447955,4.305340332795193,2.0164638350715003,0.28914952844426134,4.029621007348739,3.3899585359722395,3.887892272334692,3.586689922302501,3.6961536270041586,3.0471100373815343,0.5290129637603846,1.0115095715855882,2.9325233069680703,1.663356198121937,0.5606932651276086,4.586382411588802,1.5604694718926748,1.622416042860223,1.6916993647091094,3.5804988601378005,1.559497144467611,2.594617709752287,1.664037231060218,3.1422340033155494,2.694634141100052,1.7683388506435727,2.940086478240016,2.9175959393243636,1.4337541943224719,0.39142066788201313,3.035691000023454,0.7008297645723816,4.361893821922674,4.9789667773028725,0.7646212370965355,4.707877241323306,2.4612382144419875,2.2693433104554295,3.58744477026929,3.10307029327583,0.5167404339187331,3.2195553355059214,2.462898573108446,4.451335903069823,4.737129510034861,4.05354095558733,0.8677359913894855,1.3436598768560493,2.4834695315879163,1.2568177620048393,1.3914684305671243,2.482103458166481,3.563281468427556,1.336883199181107,3.4547268739593284,3.065294536549966,1.5534625249678669,0.09959309093484969,1.0783652320665493,3.4902964927231164,0.23381749441310662,0.24688881517858752,3.1208454717593357,4.7551524546252155,4.081999243587142,0.42788791367451284,1.5836593364256568,1.428311932475872,4.9667413782323475,1.9364741574454059,2.7532109732091503,2.4934198609360116,2.4958787806725633,0.7280886879412751,4.392979090929893,0.5870884923277753,2.3302058749462393,1.1395524971930127,3.5926223029145032,1.7428688645737467,4.059840047179085,4.259549656828721,4.1340527509564415,1.0425771779200033,0.8173679280757695,4.470290110223289,2.6781967412004115,4.116894554011638,0.4226575176063474,2.024245589750123,2.5588458568675767,2.8287306274959487,0.5471537485599731,2.496400835639212,4.388491367418162,3.1207177167797973,1.2176481941073158,3.023608746680899,1.847642443674462,4.004073884122647,0.4093628139954486,0.6975383308199956,4.986611900371881,2.226556541079645,3.6609375388064223,0.07366326365132458,2.7653850051446094,4.0816171311487315,0.7687758964288149,2.390801254009254,1.806355879909436,2.309234686058159,1.0937892894562173,1.90832059310298,2.6502264274158316,4.929614657267786,3.376716139929253,3.8580946077231557,0.06984069676679971,3.706928919084318,1.470551521119674,3.055525692320835,2.9414247298240337,0.15821963320579835,0.9857487698871636,0.41372376325845117,1.1963472934011177,1.7727969019389145,3.9478931342264225,0.6490427032179802,1.991600121005267,1.1206503361207554,1.454104034739574,4.557817418889786,3.0254340334600602,0.3874899585808189,4.310715182924084,3.296385018084921,0.47375646972603214,2.7373937747814003,4.018217689903106,0.3457825163363881,3.9602585208370025,1.3370349780310131,4.154370382078307,0.04101244717060526,1.8118033687926116,0.03278946641075864,2.8741053865432598,1.8294050757462899,3.55861751447206,0.6353562664768153,0.25945945585906793,0.25847647910619553,2.899040882308752,1.4653659159842536,2.33845273634644,1.0333209129969878,2.084102494703198,0.34784496183659086,2.5366396967219105,0.027068033799688695,0.7202563344194801,2.483744351621331,2.693115105999535,3.9515378552360145,3.6102377053350687,3.4613086775240784,4.113361005192841,4.10289045140528,0.18457674511738853,1.3574923235069203,3.3880398402334357,4.307540733139881,3.935272047292153,0.45039344645785406,2.804755144968558,0.8164897635354662,2.7274254007272667,4.158237333534975,3.165449943977338,1.6643510551043394,3.1220019412265367,4.3882823724563815,1.1727156712900055,2.517754591734056,3.0838305567680613,0.7519367414868283,0.06334134389932022,4.489649328054382,4.001403095673344,2.6229430361500095,2.5611207823831172,1.8622350189758818,1.6125046285071676,4.931344002271842,2.3216053826607483,0.005752109608889722,0.7349147324977456,2.2583828291527306,0.5806614987494818,3.688715697852072,4.850644427025122,4.372489176052711,4.28364462486406,2.827297838208932,1.6702599930902817,1.6184066257699214,0.49441534037903856,4.1764518718206665,0.8977752398177796,2.50859239768337,4.279763542400063,4.973245963497951,4.227090646567699,1.4747977422511815,2.3765220043041992,4.485567048503341,3.081972658502142,3.685709241273262,0.3947758410068125,4.960723767717666,3.931535228224139,3.9494299115526132,3.1950818581391416,1.7806679775696155,1.5792912420745986,4.742659906975791,1.718706678184947,4.530562549975326,2.1956523107785877,0.25043587122872024,4.422291399480121,2.794940606990438,2.6733498785566248,1.150170406798947,0.528198020452364,1.9336496921022628,0.4684624111332014,3.6166814732208175,4.168040305008324,1.8567717603753642,2.4299718799434755,0.29516856095611055,3.2082240732204492,4.207678564722739,4.051308596788395,3.9291215436890137,4.106886858155923,4.584757244498906,2.9710613803135075,2.0424472446570565,3.592213476597598,0.9734933965636083,1.4011215373060926,1.3576738145039369,3.93411121645053,1.6424024624237898,3.6778278375517637,3.6103386850617722,1.3939213123344307,1.119752541182032,1.8751194192205856,4.80151737234662,1.2532429624929864,4.98963296473245,4.777616053589533,2.3988988164103553,3.994038854358102,1.8016956768389136,3.9334111034737598,1.8497262800723713,3.8727828660398735,3.238863988994561,0.1719389944772587,2.8990558275590073,0.1647537754973072,0.028021916420025716,3.226172992080717,1.3341000109226153,3.41798289796536,3.119003514454566,1.9785231376016699,0.6005156948656287,3.904848788732289,0.38782520971822,3.6245013159701167,3.760267585476419,4.379537110501774,1.1995701906304468,2.298676425347097,0.1901021916612311,4.782780452461184,1.4276381741892152,4.378482587527579,4.1836916499316406,0.7355559943688117,4.887617518437919,1.1365494008519739,1.4849328602485112,4.20415833300516,3.5096556357414475,4.516453185169348,1.4352253864922626,0.3360763794160593,0.5041741858878146,3.1634722825757864,1.2555211182085246,3.1759227661320044,2.929068016054596,0.10772526247659342,1.0267907945645482,2.5234596129905196,1.373701652217415,2.0240223808631086,1.5770451980034272,1.5888794120123584,0.8276367367942927,0.6097819991920439,3.507846915896511,4.444587928966746,0.7667654080165531,1.8198829235703196,1.987738023854152,3.915396460000161,0.25844981336021977,4.560713954803198,2.2643605482706275,1.503088884642847,3.4235656634531733,4.479233521953847,4.459018393112874,2.7686277259999725,4.893441564812264,4.238208493938513,4.619723628941391,2.370348649572278,3.1230222354130808,3.057077963193154,2.694619121624159,2.7550917796027563,1.6009011223687986,0.6124154853064789,2.1370584267655177,4.885913938546756,4.7023054880623665,2.2036674297369876,2.240547689728901,2.273273110259834,1.8424740149458618,1.5108788331262935,3.0193042147185856,4.307314734287506,4.338798400554099,4.598934995153785,2.588534352127967,4.1980878863619875,3.9708356169543526,4.672864481222138,2.270264715413309,4.692615623959608,4.8030971722194415,3.9057360335599425,1.4243260161112858,0.4795694456540389,4.499004264185177,2.7922723912988134,3.1825673856964753,1.7625079037856484,3.1899386655513426],"mu":[0.39388970547314717,6.611727020786525,1.4451739350297954,8.221762957523831,2.506241809562517,2.5476582217437804,0.9102889851246276,2.5050600885510144,4.299299136359657,7.64168271555927,7.9182008508154205,2.8622396353888124,5.898311294887066,3.3425053728160026,0.4122042440009599,8.296115909553457,9.616071998011728,3.354567725573765,3.945304249616848,7.224497896178104,5.428673158290039,4.572491187088666,9.148526548266428,8.750464458647247,2.049019194612529,4.2258835630702745,0.9819075204444361,1.508455365265866,0.014087961761264367,4.653406855675708,9.35350699822271,8.495397989100379,8.229674572200631,7.634000011942739,6.154537231033066,1.7723495382209409,9.451639839877915,9.176990814291887,8.91083318815279,0.19948592719455593,9.033020554686459,5.065878051153733,6.2581460204346895,3.0162868892958117,5.9724717729193895,8.374301518473697,8.61506957298758,2.292190740995881,1.0599358910412682,8.680360617934786,9.606979504532596,7.334157692130823,0.8381352957467758,3.5740752546600274,7.3111948562095534,9.472990885852948,5.221189422622041,3.096041990165108,8.284388790691267,3.419285360411275,3.3342776458626355,6.556843397143264,0.1775267870502617,3.362475303645567,3.5029210613976502,5.647981652695153,3.9008066997801283,1.3172247435305828,3.041850782844766,1.6084074721175923,6.175032723758404,2.05674387448213,2.1882312277029192,1.1996162683381817,3.836321244106038,3.68451819929837,2.378563832818996,7.223075446302516,5.334148875127638,2.2795739508469692,5.12607304588159,6.3578517523417055,8.231354610045383,1.2433886419790618,5.530549802140947,6.073780481364355,5.383482133122852,1.8311231167230169,3.11010108660724,3.3043122662010593,8.3332646693354,1.5711472216271671,6.823396171088641,8.573502478166603,8.98771444568225,2.4710513385563027,0.7270127877136745,7.041246388054776,7.863246436330693,3.3741874677552697,8.120902210135412,5.413456349289776,8.707631871252136,5.487654392703483,0.016870802048127853,2.8173909758453175,3.402544714576068,0.8637080134602382,3.1306554610069393,5.4894515251140135,4.685227448645164,1.1686362691399754,2.7642861216179826,5.117947928003099,7.33158735891246,7.272114896737474,1.6155722638253822,4.997080943150585,8.744275438382541,5.266185261942824,0.9044432943665481,5.249219490853118,0.016020124807272218,3.764915172741108,4.467023389823044,3.83677739589263,8.058367690945204,7.488732673250809,3.513351982667998,9.618356844491402,4.193564613922933,4.318906517461434,3.2413549071284176,7.819207567180433,5.7725864001103595,3.6567854443205294,2.719113367606769,1.6180213057693305,3.05053417542575,1.7380794543001343,0.06599669062360425,3.6600862808195322,9.434632487663121,2.3488681227732378,1.2776212168685985,9.393216470437489,8.200342863703685,6.323001211610453,8.458409943253365,4.662516547213611,3.605823280731486,4.044008283486836,1.418104695710074,9.749090556852021,5.8003013401845305,3.8467664242728494,2.180703913736717,7.980301055114629,3.0330053593299366,4.426528873870465,3.5671997308716774,2.100707783845963,3.5224100984593076,2.753685597393445,2.3052830562571214,7.737688239572147,0.31740884814083214,8.81796986656119,8.494315386939261,3.4704173128776628,8.898479942203078,7.800274737329788,7.477670778693062,4.333313096352227,2.561446403598562,1.2843018195426326,0.5033444240359852,5.857016470081568,2.1493964676532817,6.3741769285617185,9.92395959804411,2.903129229902206,7.225429308589357,9.520270870630917,7.504809230521106,7.945427068698903,1.2142780994671365,3.1214817253384153,7.453695400648308,3.128750918918999,0.7469370454666935,0.45226487158119166,9.121202690950042,8.365672064773968,9.383892205747092,7.544348429389959,7.044835591235876,3.4619397873597713,3.4646110428488064,3.188521661399315,3.8244347545256385,8.652728539627022,8.556641095807258,5.662896381413747,6.8049631034453935,8.524253720430506,4.3946780120352695,7.669680187553469,1.9771010819298596,4.451893378458078,7.870913169820605,0.22384353063119367,2.8143246138383593,5.090564148808672,5.700617549677139,9.410643107444459,5.070669001643189,8.307219415374886,9.432768940577311,1.2026144566014074,6.089415599757945,1.1948176130202048,5.8666003345556135,1.5279029996531857,3.021594875466682,8.721543571002279,8.103690258230692,6.615300441707978,3.99724900449264,5.286442320911702,5.766872768640869,0.22917275950823157,5.055039683490181,8.930628598242485,3.024055755171333,0.4570622091047216,3.4094179608772834,0.10601450204655638,1.2765928053260867,7.573614083445959,8.80785511783982,3.0271361420031395,7.059341013924487,4.384244131173132,3.1627520379070484,0.04339052868119753,5.995974644235835,1.1204765252626125,9.682581971370421,3.000855143216623,6.0380402963974555,3.090683264756011,3.4404855741055895,9.970207661571756,3.483977618880665,4.177563651243008,7.174899471638638,4.5963946255677985,1.224052612968718,6.6160692489652355,5.402647315823863,0.8953828793284857,6.690858585285135,0.10206507390762676,7.742000418227237,6.371306274395446,0.9191181834050877,4.486678672601984,7.7863134054432575,7.305904330022422,4.197506969053759,9.023627916695977,9.623320661760275,6.015053894607121,0.3059902721204977,3.670210525960369,6.340178650597119,6.9098217380425275,4.730207629183639,6.163726587020799,1.1004079773888464,9.533759653632686,7.265420913156076,2.215243538897489,0.21709810774707794,3.948131767589569,2.57054387174688,0.32976675941375655,0.2162248088162344,9.466108738595993,3.222184369030061,8.793856287660443,6.552437458251347,7.7855797913223075,1.8138531603797503,6.642138585472381,8.623310175219629,8.748680110977752,2.8321961953193764,6.358408972899419,4.093782761872806,1.4442219551020385,6.415044974692323,2.8826493208519888,5.722973317469108,9.621000852901666,1.384558907751381,7.483041533804871,5.799292310322707,2.2268420512994203,4.659583290992466,8.85496296640186,3.0819290600131954,2.241165271835952,3.5684922663235596,4.55391710374551,5.590560141456226,5.57875636218551,5.0443800599061905,0.5746103247680368,4.038552618776567,8.552698411964242,5.167235614089016,4.759905500897603,2.8076918574769905,2.3836396194716136,9.270306857973619,9.367437322832426,0.8592699789669056,7.780513925190129,8.75129235165187,1.3957887153334037,7.375349060792445,5.745607346753012,9.228732951921781,9.67762555652273,7.445162211360845,2.7866142997054144,2.6567617115163555,1.509987062908007,4.31686920651102,1.5515753829804013,9.019568919146408,1.5693411208058805,1.4047342830454679,7.288294740586981,3.080038074516964,6.123104672487553,4.923559256277279,4.139163062924833,3.9969187986123744,4.823990344567655,3.866918829085071,5.863572807364868,5.298141723374097,7.0305125123030665,6.152822071941939,2.6527951123564275,1.0386440830024646,8.094175127552203,9.104768134231396,3.1720988980988163,3.238119825058512,5.864626535793707,2.3400214723123325,7.589588834757686,8.938242941317975,4.384475344457625,2.476282884011589,1.7186817664657772,8.911373929286139,5.505439280149451,4.977100212233141,0.5395852933029288,9.958861942165012,5.001576529820985,0.5588663257491033,1.307304858808691,4.034018629775149,4.665105909440053,9.505591562756928,9.85091887484344,1.102523943851399,4.621802939053183,5.534292585899792,6.023177200041783,8.696603500312355,0.5405163177362904,6.524481340764217,6.295013128380038,1.7427974762905274,2.1299999720765617,8.608317867193186,8.139601836023576,0.2999354589589154,8.483492050086719,7.2381798557783235,0.8881122882236347,6.757980003399922,7.8644026265600235,0.449833451681263,3.4099407889904088,5.327992362161953,7.456063953316534,1.5136619349116898,6.1726750843295,3.2379997038304276,0.49547079135594974,4.809405958932373,0.18869805839427878,0.6517013838769636,1.927074349895801,1.9357444029125492,9.38758575549363,0.031866589496689635,1.8732191888464333,1.6251023006929866,7.2217605061475965,4.195797111553823,3.726846989257677,6.778425372668179,0.6225176712722646,8.302355955210846,9.084010866755023,6.59550778397775,0.5312710052165026,1.3522883702619581,7.1618716795710125,5.862923485498735,9.427925112981852,4.619995068320013,0.7644305861674461,8.538084717223303,2.6036934276269785,9.494715183032302,2.1291022232090584,9.175006143873397,0.6973367633017236,7.93494678769084,1.0847284619461672,7.674369634996827,0.7640053276416992,5.304925920993044,1.1759183061611744,7.552527272924509,5.947811881523437,3.7303185264903616,2.3252599225849258,8.901905851922718,9.420254100941971,2.8942273202253155,8.367713240596387,1.479881362301636,8.536471570269892,7.146083970523849,9.925068562404073,4.623921297306824,5.582394175818357,1.9982593107873936,1.704833630656053,4.329066622317493,9.596040703332749,7.066178827258442,5.6994371924724145,1.488313789659368,9.267839058318197,5.814302099056816,4.019219166366383,7.118367379698601,7.132638377844563,9.440929278223928,8.591006820774638,6.914375044750651,3.985054124914482,0.828180896416002,4.095795533872457,1.7363294961443554,6.213665266474154,1.0129557956705737,4.537443659843403,8.15455152103693,5.960089283613932,5.470444749464198,8.742895195285493,8.607845733390677,0.8831495025574454,4.655733626640409,0.4343169906779254,1.5270621819373886,8.958793733038185,5.227717937442491,6.888366609986325,1.671071164329887,2.2419132923712093,8.729908385641496,8.68805078573799,3.9134930755846997,0.2466161604774686,9.626992997383681,0.7462257509896597,4.0363167666201,4.918836324185262,7.8385230508171055,0.9664879112627522,5.623176279568147,8.85582279143158,2.824485107550727,0.7500266347053341,9.548367193160264,7.81553621114784,4.719744147036078,9.894125761342465,4.677852674918914,0.127127796830786,2.732844651201829,3.72006085977592,1.3485287297866666,4.992835753115694,6.941598954763439,8.617525127634622,7.3979902109671,7.610173703491936,5.874435872662785,0.49188208120030996,0.8494505079295411,1.2683896042389797,6.576163490329083,8.873625874854456,5.7349389712699095,9.138756595146223,3.5210606244443365,6.55031100420598,0.2206391115544637,3.24861724389113,4.625997571561154,3.7273863888415093,7.4643813267138075,5.590734413657488,8.983966216057793,4.740267771082969,7.144637923575459,1.325353738270545,0.10984853139516693,3.025734191525564,8.798855842455007,9.976376443828928,9.940583842199626,5.973997919148579,7.187114934672579,2.476666154040841,9.732698607145416,9.134835730607868,4.2425636228394055,6.5945876570766355,9.011175321597097,9.766261612943417,9.74890308351149,0.6190092369768996,6.374473476843699,8.18263531919217,8.52507053320122,3.0226909021393533,0.2350092086236999,0.0013564867474902265,6.954641638866144,2.714015450075009,6.755344153664717,7.3820709354650464,0.5485077984142617,5.81473230096659,7.2486376781321145,2.0074661568509433,2.1283013474758494,5.909031921676164,8.946783701995948,0.36217200130437943,7.0627779040646725,0.23885692079811394,0.8648836786000635,6.090951951892758,2.517066518479867,8.19070207830996,8.118227990674692,8.559996804048218,3.7407907856402245,5.995813102823851,4.136265993372854,0.34161702398663785,8.665487951861122,9.612750713004086,7.441153848581131,6.288790107044681,2.426884448189246,0.46807147070568433,7.453456839871501,4.980884236629022,4.276139387863562,6.827990573137603,3.3928279699751873,7.981567169708459,1.4952145572621744,0.9924554682675191,3.863496395114361,1.5150851099823126,8.4315706872387,7.771906057832343,0.4954204945389695,4.74304951542358,6.210554698006003,5.766963117773272,4.629020774151746,0.09373041396697923,7.396200030666138,0.8246197348254958,0.3774235292273209,3.2792589718053566,7.405336680222431,0.884531567008835,5.046054992121047,7.981185569167561,6.920693748662026,3.7746470401350773,8.984791021223176,8.083817798504914,6.429623861491709,2.509646133989396,1.7727375776438015,6.259247178900105,2.924621047218958,0.35236282066034796,3.9859508501688468,5.672117221059878,6.757626025346372,5.570084163910676,3.7700916038036114,5.720239839655148,6.509653777325726,1.212851572911815,4.227277997761578,1.4354327085059015,3.7630334673997057,9.499261951866036,5.6649871715683675,8.919549507652986,5.941819069216252,4.273289613560394,1.5223633465661979,4.430027476868117,3.912979304139217,8.618836412237352,1.1912693811041364,1.8049799544761558,6.978591413244284,2.8038613303736315,7.777694265571884,8.468587434402373,9.568539619017056,0.6691453340731979,9.237289037786901,9.11658766829495,4.75996758520024,0.8742975241410744,0.8180851812476475,7.531061078530561,5.854184303243535,8.11737028517291,9.835372868265344,1.5043579031243226,7.984871474359592,6.169702890170219,8.620129536749285,8.977407618353672,2.870937696735729,8.511895261060427,3.6012707285151935,1.8566344788438127,1.946846540189524,3.3032123416249592,0.640045733525263,1.2592925117665787,3.9595331070372675,6.837911599376289,6.934465994417014,6.414822404305662,5.0461934368578625,1.9454010714334413,3.321847814332357,7.500928420346837,1.1585243780098708,5.2512791316916445,5.013889723636556,2.1253575957402115,5.265899241128955,7.803445401131901,0.14950031543077724,1.0492711174082037,6.517295002424362,9.737581742263075,6.441852809914856,1.7460725663382881,1.3253399787061482,9.272438625545883,5.896756699620864,1.8911263898196151,5.864939764932071,1.5652177885605623,6.656818573704044,0.32235387676159855,4.227498736098476,4.602734475548493,0.36844036650263146,0.1669506213543337,4.437920841294741,7.3258413244765315,2.7946322161517223,5.883134268005527,2.542251730232823,7.866193593259629,0.4094126571451784,9.964843385033479,6.267853367638412,2.5327345504372056,9.777553720115401,6.1760041551876625,8.281168272140082,6.470883710334112,9.367232833598605,8.229320729156779,0.5893294071151489,9.90609693119369,4.33575396832836,1.3802026189732874,5.668639495119838,2.950515529336053,2.682632584357305,6.8293669238610955,1.9865250687936253,8.47880104838827,7.273451045369221,5.025205438139886,4.885340452599268,8.271693404610339,1.129232958271238,3.5993358181578428,3.5940351233103485,6.30142519385606,9.520048342821937,4.429780134476109,4.9953525831556185,8.870077648430287,8.84691888691793,6.327995314097015,0.8985631135713956,3.3693078276070776,2.5084343464156023,1.7672526176010228,6.658566102462135,7.145108171557364,2.036988390826442,6.7322435054374115,6.270813160581983,1.646959223060176,7.421702197828957,5.992019210388156,9.375503377401293,9.57100888892241,5.3953738931278465,2.5299060348029734,1.320452250308044,4.873054090488987,1.3977656373512537,1.330747156104859,5.457132100297521,5.702077485729157,3.21494933093182,5.636628371722723,2.6908895110234377,0.6935263334909658,4.174073127274493,2.9239482500876512,3.4011585124558374,9.591543865169559,0.8696268913564209,6.23037028750036,9.399585629044386,0.07270947319714338,8.202383420998752,8.191489156052727,5.050202307929732,6.041337445943499,0.25241122746799016,6.723825725742019,9.632570425395064,8.872378553197535,4.088426065399718,0.9709240441641209,7.618446626929261,7.346434406440774,2.9517952614851084,9.70892791524708,5.163588864524556,6.513670611729701,7.69571476768478,9.39444624008453,4.255885924903744,5.318955206546441,6.0981114144795345,0.24459793483210035,1.5143821886454423,3.7685849012288997,0.027160950648330573,5.48757048340444,8.154061382291717,5.851843092994134,2.475563476281526,7.183412942843052,0.29710906062620834,4.408111895528726,3.590796510752736,8.99781400933909,6.088253584070675,7.5323040695728665,5.719952481930206,6.738586684126993,8.896028902076472,0.3888823628906146,6.005694382588171,0.5448643846746615,2.383965911058281,3.661215805260152,0.6964100218804403,3.510340930868454,2.4717165585149736,6.666152167148227,2.7508443915149505,2.068147815027672,3.3156435379099425,6.408105722696426,7.381298016212519,0.5125372141315432,7.548220285721621,3.2978006995050624,1.2807596173414892,0.23993679615938568,7.944929891197312,5.597664267214329,0.6548190336651749,7.848410390080924,7.491011122736402,1.5039320605248685,9.954506805940706,6.9472028386749685,9.060616115657421,3.26804113016407,5.148037225996429,4.86618354201042,8.5913993961859,4.555141218626986,2.021929206622255,9.430388774898733,7.702941438253504,9.91173401699647,5.7464385298880565,3.1381596771047082,0.8359165363696874,5.542017299739211,6.940800691340357,1.2746507251400585,8.952499546105987,5.799617201481029,6.725286442917819,4.262511071299853,6.570450598745898,0.9664513973936417,0.06407634895002845,9.808104261642175,3.2400297726281813,4.1195437164135695,4.155071627468785,5.353110366611665,4.378472348612759,3.3139586147034694,9.539047667558432,6.585291477489649,6.7301524123805745,2.433525282546334,4.039301221805401,7.723198115758743,4.52767368652734,1.9581917621110567,5.384679353447885,9.888396075522374,2.8250809091481166,8.506221683058213,9.033326027137257,1.4028053857218503,9.978663459201908,1.9118273852732925,2.068592979380741,8.510677849535654,6.7803817820649375,7.964240288218718,3.9779362581197875,4.262841982410173,4.536247402268607,3.343997790931521,7.402245128949665,7.864005190622536,7.22202574870945,3.972983435342312,8.241647272766874,9.892865223837022,2.6795608242861246,9.429824899570482,0.66694370871059,5.162379317005145,6.123845085723336,6.821833997163587,2.14939372688427,5.966616582833897,9.332700817580655,9.087154029856933,6.566818847546518,0.7177449626186072,8.903636322179029,9.79277406847827,7.871167177811489,3.489044444954783,9.447201597576441,1.2847929178665018,5.38571300095356,0.1489534669762227,7.59509623690956,5.378105362284464,4.713116314553314,1.9836805951202652,4.325535110693124,3.096167111962229,1.7285301854538804,1.9943666893336176,9.920239632745865,3.348240252642798,3.863299456705651,9.427190110345043,1.9560439036838662,1.014352154763496,3.6094638086840325,7.347771256563654,6.637292921768152,3.448057741963899,2.2959428580768604,2.526698515681036,0.4190615847544943,2.970523396687861,5.907388027343523,5.344140638382622,1.638046091873464,6.665595987735569,7.853615689249322,3.3812322485778057,5.01291665467988,2.0680281172669823,9.162307739256727,6.274755214236663,8.152186393323808,1.2241548650379697,8.173790551789782,5.91530147497163,1.5468132507373,8.576029421231208,6.466863955941726,0.18544240767055076,6.44123586296897,2.483442890562677,4.505081966863498,4.69928631420002,8.883502336595692,8.125190234282567,3.808452672457383,9.435994377539314,0.2403236444701684,2.6230327437798717,2.3817504178083304,9.4828298302635,7.1101942041261985,5.366089243761882,5.317717073609014,7.516755839720601,4.224198783882784,2.6112388934804387,6.942893425718997,4.780343920034172,5.363827912161476,1.5889142145808943,3.5088845994535878,4.080147096502584,6.584676410975458,5.5471678922175744,3.2058983709348343,7.453340832390851]}

},{}],129:[function(require,module,exports){
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
	var mgf = factory( 0.0, 1.0 );
	t.equal( typeof mgf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, 1.0 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, 1.0 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 1.0, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function returns `NaN` for any `x` outside `(-1/b,1/b)', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, 2.0 );
	y = mgf( -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( -0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.8 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, 4.0 );
	y = mgf( -0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( -0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `b`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, -1.0 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, 0.0 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( PINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the mgf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var mgf;
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
		mgf = factory( mu[i], b[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the mgf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var mgf;
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
		mgf = factory( mu[i], b[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 60.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the mgf for `x` given large variance (large `b`)', function test( t ) {
	var expected;
	var delta;
	var mgf;
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
		mgf = factory( mu[i], b[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 80.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/mgf/test/test.factory.js")
},{"./../lib/factory.js":123,"./fixtures/julia/large_variance.json":126,"./fixtures/julia/negative_mean.json":127,"./fixtures/julia/positive_mean.json":128,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":284}],130:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/mgf/test/test.js")
},{"./../lib":124,"tape":284}],131:[function(require,module,exports){
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
var mgf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = mgf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a nonpositive `b`, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `NaN` for any `x` outside `(-1/b,1/b)', function test( t ) {
	var y;

	y = mgf( -1.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( -0.8, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.8, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 1.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( -0.5, 0.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( -0.3, 0.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.5, 0.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.3, 0.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the MGF for `x` given positive `mu`', function test( t ) {
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
		y = mgf( x[i], mu[i], b[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given negative `mu`', function test( t ) {
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
		y = mgf( x[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 60.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given large variance (large `b` )', function test( t ) {
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
		y = mgf( x[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 80.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/mgf/test/test.mgf.js")
},{"./../lib":124,"./fixtures/julia/large_variance.json":126,"./fixtures/julia/negative_mean.json":127,"./fixtures/julia/positive_mean.json":128,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":284}],132:[function(require,module,exports){
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

},{"./is_number.js":135}],133:[function(require,module,exports){
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

},{"./is_number.js":135,"./zero_pad.js":139}],134:[function(require,module,exports){
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

},{"./main.js":137}],135:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./format_double.js":132,"./format_integer.js":133,"./is_string.js":136,"./space_pad.js":138,"./zero_pad.js":139}],138:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"./main.js":141}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{"./main.js":144}],143:[function(require,module,exports){
arguments[4][136][0].apply(exports,arguments)
},{"dup":136}],144:[function(require,module,exports){
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

},{"./is_string.js":143,"@stdlib/string/base/format-interpolate":134,"@stdlib/string/base/format-tokenize":140}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"./main.js":148}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":150}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":154}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{"./define_property.js":152}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":151,"./has_define_property_support.js":153,"./polyfill.js":155}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":142}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":157,"./polyfill.js":158,"@stdlib/assert/has-tostringtag-support":20}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":159}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":159,"./tostringtag.js":160,"@stdlib/assert/has-own-property":16}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":145}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){

},{}],163:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"dup":162}],164:[function(require,module,exports){
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
},{"base64-js":161,"buffer":164,"ieee754":267}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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
},{"_process":274}],167:[function(require,module,exports){
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

},{"events":165,"inherits":268,"readable-stream/lib/_stream_duplex.js":169,"readable-stream/lib/_stream_passthrough.js":170,"readable-stream/lib/_stream_readable.js":171,"readable-stream/lib/_stream_transform.js":172,"readable-stream/lib/_stream_writable.js":173,"readable-stream/lib/internal/streams/end-of-stream.js":177,"readable-stream/lib/internal/streams/pipeline.js":179}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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
},{"./_stream_readable":171,"./_stream_writable":173,"_process":274,"inherits":268}],170:[function(require,module,exports){
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
},{"./_stream_transform":172,"inherits":268}],171:[function(require,module,exports){
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
},{"../errors":168,"./_stream_duplex":169,"./internal/streams/async_iterator":174,"./internal/streams/buffer_list":175,"./internal/streams/destroy":176,"./internal/streams/from":178,"./internal/streams/state":180,"./internal/streams/stream":181,"_process":274,"buffer":164,"events":165,"inherits":268,"string_decoder/":283,"util":162}],172:[function(require,module,exports){
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
},{"../errors":168,"./_stream_duplex":169,"inherits":268}],173:[function(require,module,exports){
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
},{"../errors":168,"./_stream_duplex":169,"./internal/streams/destroy":176,"./internal/streams/state":180,"./internal/streams/stream":181,"_process":274,"buffer":164,"inherits":268,"util-deprecate":292}],174:[function(require,module,exports){
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
},{"./end-of-stream":177,"_process":274}],175:[function(require,module,exports){
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
},{"buffer":164,"util":162}],176:[function(require,module,exports){
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
},{"_process":274}],177:[function(require,module,exports){
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
},{"../../../errors":168}],178:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],179:[function(require,module,exports){
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
},{"../../../errors":168,"./end-of-stream":177}],180:[function(require,module,exports){
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
},{"../../../errors":168}],181:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":165}],182:[function(require,module,exports){
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

},{"./":183,"get-intrinsic":258}],183:[function(require,module,exports){
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

},{"es-define-property":243,"es-errors/type":249,"function-bind":257,"get-intrinsic":258,"set-function-length":278}],184:[function(require,module,exports){
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

},{"./lib/is_arguments.js":185,"./lib/keys.js":186}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],187:[function(require,module,exports){
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

},{"es-define-property":243,"es-errors/syntax":248,"es-errors/type":249,"gopd":259}],188:[function(require,module,exports){
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

},{"define-data-property":187,"has-property-descriptors":260,"object-keys":272}],189:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],190:[function(require,module,exports){
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

},{"./ToNumber":221,"./ToPrimitive":223,"./Type":228}],191:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/isNaN":237,"../helpers/isPrefixOf":238,"./ToNumber":221,"./ToPrimitive":223,"es-errors/type":249,"get-intrinsic":258}],192:[function(require,module,exports){
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

},{"call-bind/callBound":182,"es-errors/type":249}],193:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":251}],194:[function(require,module,exports){
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

},{"./DayWithinYear":197,"./InLeapYear":201,"./MonthFromTime":211,"es-errors/eval":244}],195:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":242,"./floor":232}],196:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":232}],197:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":195,"./DayFromYear":196,"./YearFromTime":230}],198:[function(require,module,exports){
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

},{"./modulo":233}],199:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":240,"./IsAccessorDescriptor":202,"./IsDataDescriptor":204,"es-errors/type":249}],200:[function(require,module,exports){
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

},{"../helpers/timeConstants":242,"./floor":232,"./modulo":233}],201:[function(require,module,exports){
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

},{"./DaysInYear":198,"./YearFromTime":230,"es-errors/eval":244}],202:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":240,"es-errors/type":249,"hasown":266}],203:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":269}],204:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":240,"es-errors/type":249,"hasown":266}],205:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":202,"./IsDataDescriptor":204,"./IsPropertyDescriptor":206,"es-errors/type":249}],206:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":240}],207:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/timeConstants":242}],208:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"./DateFromTime":194,"./Day":195,"./MonthFromTime":211,"./ToInteger":220,"./YearFromTime":230,"./floor":232,"./modulo":233,"get-intrinsic":258}],209:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/timeConstants":242,"./ToInteger":220}],210:[function(require,module,exports){
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

},{"../helpers/timeConstants":242,"./floor":232,"./modulo":233}],211:[function(require,module,exports){
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

},{"./DayWithinYear":197,"./InLeapYear":201}],212:[function(require,module,exports){
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

},{"../helpers/isNaN":237}],213:[function(require,module,exports){
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

},{"../helpers/timeConstants":242,"./floor":232,"./modulo":233}],214:[function(require,module,exports){
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

},{"./Type":228}],215:[function(require,module,exports){
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


},{"../helpers/isFinite":236,"./ToNumber":221,"./abs":231,"get-intrinsic":258}],216:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":242,"./DayFromYear":196}],217:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":242,"./modulo":233}],218:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],219:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":221}],220:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/isNaN":237,"../helpers/sign":241,"./ToNumber":221,"./abs":231,"./floor":232}],221:[function(require,module,exports){
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

},{"./ToPrimitive":223,"call-bind/callBound":182,"safe-regex-test":277}],222:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":252}],223:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":254}],224:[function(require,module,exports){
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

},{"./IsCallable":203,"./ToBoolean":218,"./Type":228,"es-errors/type":249,"hasown":266}],225:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":258}],226:[function(require,module,exports){
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

},{"../helpers/isFinite":236,"../helpers/isNaN":237,"../helpers/sign":241,"./ToNumber":221,"./abs":231,"./floor":232,"./modulo":233}],227:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":221}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":195,"./modulo":233}],230:[function(require,module,exports){
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

},{"call-bind/callBound":182,"get-intrinsic":258}],231:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":258}],232:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],233:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":239}],234:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":242,"./modulo":233}],235:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":190,"./5/AbstractRelationalComparison":191,"./5/Canonicalize":192,"./5/CheckObjectCoercible":193,"./5/DateFromTime":194,"./5/Day":195,"./5/DayFromYear":196,"./5/DayWithinYear":197,"./5/DaysInYear":198,"./5/FromPropertyDescriptor":199,"./5/HourFromTime":200,"./5/InLeapYear":201,"./5/IsAccessorDescriptor":202,"./5/IsCallable":203,"./5/IsDataDescriptor":204,"./5/IsGenericDescriptor":205,"./5/IsPropertyDescriptor":206,"./5/MakeDate":207,"./5/MakeDay":208,"./5/MakeTime":209,"./5/MinFromTime":210,"./5/MonthFromTime":211,"./5/SameValue":212,"./5/SecFromTime":213,"./5/StrictEqualityComparison":214,"./5/TimeClip":215,"./5/TimeFromYear":216,"./5/TimeWithinDay":217,"./5/ToBoolean":218,"./5/ToInt32":219,"./5/ToInteger":220,"./5/ToNumber":221,"./5/ToObject":222,"./5/ToPrimitive":223,"./5/ToPropertyDescriptor":224,"./5/ToString":225,"./5/ToUint16":226,"./5/ToUint32":227,"./5/Type":228,"./5/WeekDay":229,"./5/YearFromTime":230,"./5/abs":231,"./5/floor":232,"./5/modulo":233,"./5/msFromTime":234}],236:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":237}],237:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],238:[function(require,module,exports){
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

},{"call-bind/callBound":182}],239:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],240:[function(require,module,exports){
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

},{"es-errors/type":249,"hasown":266}],241:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],242:[function(require,module,exports){
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

},{}],243:[function(require,module,exports){
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

},{"get-intrinsic":258}],244:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],245:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],246:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],247:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],248:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],249:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],250:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],251:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":249}],252:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":253,"./RequireObjectCoercible":251}],253:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],254:[function(require,module,exports){
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

},{"./helpers/isPrimitive":255,"is-callable":269}],255:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],256:[function(require,module,exports){
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

},{}],257:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":256}],258:[function(require,module,exports){
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

},{"es-errors":245,"es-errors/eval":244,"es-errors/range":246,"es-errors/ref":247,"es-errors/syntax":248,"es-errors/type":249,"es-errors/uri":250,"function-bind":257,"has-proto":261,"has-symbols":262,"hasown":266}],259:[function(require,module,exports){
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

},{"get-intrinsic":258}],260:[function(require,module,exports){
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

},{"es-define-property":243}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
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

},{"./shams":263}],263:[function(require,module,exports){
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

},{}],264:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":263}],265:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":257}],266:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":257}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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

},{}],270:[function(require,module,exports){
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

},{"call-bind/callBound":182,"has-tostringtag/shams":264}],271:[function(require,module,exports){
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

},{"./isArguments":273}],272:[function(require,module,exports){
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

},{"./implementation":271,"./isArguments":273}],273:[function(require,module,exports){
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

},{}],274:[function(require,module,exports){
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

},{}],275:[function(require,module,exports){
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
},{"_process":274,"through":290,"timers":291}],276:[function(require,module,exports){
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

},{"buffer":164}],277:[function(require,module,exports){
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

},{"call-bind/callBound":182,"es-errors/type":249,"is-regex":270}],278:[function(require,module,exports){
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

},{"define-data-property":187,"es-errors/type":249,"get-intrinsic":258,"gopd":259,"has-property-descriptors":260}],279:[function(require,module,exports){
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

},{"es-abstract/es5":235,"function-bind":257}],280:[function(require,module,exports){
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

},{"./implementation":279,"./polyfill":281,"./shim":282,"define-properties":188,"function-bind":257}],281:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":279}],282:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":281,"define-properties":188}],283:[function(require,module,exports){
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
},{"safe-buffer":276}],284:[function(require,module,exports){
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
},{"./lib/default_stream":285,"./lib/results":287,"./lib/test":288,"_process":274,"defined":189,"through":290,"timers":291}],285:[function(require,module,exports){
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
},{"_process":274,"fs":163,"through":290}],286:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":274,"timers":291}],287:[function(require,module,exports){
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
},{"_process":274,"events":165,"function-bind":257,"has":265,"inherits":268,"object-inspect":289,"resumer":275,"through":290,"timers":291}],288:[function(require,module,exports){
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
},{"./next_tick":286,"deep-equal":184,"defined":189,"events":165,"has":265,"inherits":268,"path":166,"string.prototype.trim":280}],289:[function(require,module,exports){
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

},{}],290:[function(require,module,exports){
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
},{"_process":274,"stream":167}],291:[function(require,module,exports){
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
},{"process/browser.js":274,"timers":291}],292:[function(require,module,exports){
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
},{}]},{},[129,130,131]);
