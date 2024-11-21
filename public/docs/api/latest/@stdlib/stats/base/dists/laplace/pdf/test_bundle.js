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

},{"@stdlib/utils/native-class":126}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":126}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":126}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":126}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":76}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/to-words":90}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":66,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/trunc":74}],69:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":48,"@stdlib/constants/float64/max-base2-exponent-subnormal":47,"@stdlib/constants/float64/min-base2-exponent-subnormal":49,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/copysign":64,"@stdlib/number/float64/base/exponent":78,"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/normalize":87,"@stdlib/number/float64/base/to-words":90}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":70}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
*/

'use strict';

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":84}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":82}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":81,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":83,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":86,"./main.js":88,"@stdlib/utils/define-nonenumerable-read-only-property":119}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":86}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":91,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":89,"./main.js":92,"@stdlib/utils/define-nonenumerable-read-only-property":119}],91:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":81}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":89}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a Laplace distribution with location parameter `mu` and scale parameter `b`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 10.0, 2.0 );
*
* var y = pdf( 10.0 );
* // returns 0.25
*
* y = pdf( 5.0 );
* // returns ~0.021
*
* y = pdf( 12.0 );
* // returns ~0.092
*/
function factory( mu, b ) {
	if (
		isnan( mu ) ||
		isnan( b ) ||
		b <= 0.0
	) {
		return constantFunction( NaN );
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a Laplace distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* var y = pdf( -3.14 );
	* // returns <number>
	*/
	function pdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		z = ( x - mu ) / b;
		return 0.5 * exp( -abs( z ) ) / b;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"@stdlib/math/base/special/exp":67,"@stdlib/utils/constant-function":117}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Laplace distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/laplace/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/laplace/pdf' );
*
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.068
*
* var myPDF = pdf.factory( 10.0, 2.0 );
* y = myPDF( 10.0 );
* // returns 0.25
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":93,"./main.js":95,"@stdlib/utils/define-nonenumerable-read-only-property":119}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Evaluates the probability density function (PDF) for a Laplace distribution with location parameter `mu` and scale parameter `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.068
*
* @example
* var y = pdf( -1.0, 2.0, 3.0 );
* // returns ~0.061
*
* @example
* var y = pdf( 2.5, 2.0, 3.0 );
* // returns ~0.141
*
* @example
* var y = pdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = pdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function pdf( x, mu, b ) {
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
	return 0.5 * exp( -abs( z ) ) / b;
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"@stdlib/math/base/special/exp":67}],96:[function(require,module,exports){
module.exports={"expected":[0.08367680705514,0.09250894589421085,0.029880191665234052,0.03549540642112819,0.02176141161094474,0.02393241448347101,0.04120146663195761,0.09601466238813129,0.03284786433587385,0.03663528294282794,0.02187352130807481,0.026172309817794982,0.02768428443454699,0.03015175255074413,0.05600025273307544,0.03168122522443031,0.028706803302589196,0.05093146507841376,0.05651626968357727,0.06350047093290317,0.030983733763405387,0.14857816886873984,0.027374250603255653,0.050836192401505234,0.04989267610242229,0.024351244096179028,0.02409031014367499,0.16799278990722682,0.5430350728052853,0.000381503124892285,0.06060981805566355,0.13089469999349962,0.028649815147155585,0.04065668572310277,0.023135112671129585,0.026197498311976482,0.040427084911723636,0.03176713648174279,0.05080039761098622,0.03388472781797252,0.1283755286809145,0.029461800574848696,0.02232550554363026,0.036719863056737814,0.025358207962909596,0.026504991422473617,0.022429541508985257,0.08849919554868924,0.12038451195824605,0.021403554770880795,0.03476363812460429,0.0372446192636873,0.027953330466488326,0.03703005495527923,0.09240572215982924,0.029164173760909705,0.04919919079598465,0.0799202018600262,0.06513442803874883,0.028408102672484028,0.6563473413324998,0.028914566359589493,0.07181362524889358,0.025907464946588098,0.04902475731800193,0.05072434367763638,0.031054061043373167,0.021602724181826332,0.0771877814210878,0.02528696972691839,0.04340805458352573,0.023183049294380174,0.02290144613630761,0.025551872618951216,0.11533169712428547,0.03682784817119948,0.02516783253677268,0.04472656949822877,0.035249128826156564,0.02453963758287829,0.11468780933237603,0.03317326928621914,0.08782275647452245,0.026877370933551435,0.033958622614514336,0.02441774354428041,0.04229744453296347,0.03488510475163344,0.11020336891890344,0.0316726235491963,0.03035090617235319,0.028447817326075025,0.02143408328229585,0.02192106701918671,0.024802424587083195,0.0025246674706556143,0.03148928628951717,0.04882188289031828,0.0054004609111674194,0.025628430530550295,0.08876317122493302,0.08943664688224465,0.024979740649834097,0.028343336407727994,0.0777255202820008,0.038062619474898335,0.03915419367356888,0.0348683654597303,0.048422566593972385,0.07860589214788156,0.06812539895492176,0.02896580682483558,0.10816643880255053,0.14241300932061435,0.2966173035659932,0.058530259758929684,0.039348327797753616,0.042499569770891844,8.811421205752654e-14,0.05292845013508478,0.048068530972307025,0.07713130236148352,0.07013197165946213,0.03141655993919839,0.03282788199514234,0.022184196974679462,0.02853557377362921,0.05078382663121639,0.11717051375330462,0.02371694206196789,0.038027743013803586,0.04482772501858925,0.06151316793955422,0.021357889320395562,0.0350892451617755,0.038836184019710736,0.027081741138958875,0.02918246778109977,0.04194332375492965,0.1301256392587818,0.10560560726195184,0.0668020990305935,0.03976997528954136,0.026875256669476943,0.052535943439073515,0.1496126730445914,0.0008240468744163332,0.05176015936829275,0.06677560378902134,0.05638032688725727,0.039075294665863215,0.06345508614215564,0.032110364441825336,0.026801538142694516,0.11390638602839656,0.036763319990236486,0.09991096444326789,0.04387427814665468,0.021104917644177892,0.03029469957797544,0.02388688551845579,0.08271480580383768,0.07484339328408136,0.09451972778542464,0.32717528125214557,0.029941738284232963,0.0396824857434931,0.02506203995658752,0.051871935093552826,0.04888197976235218,0.08811192790430536,0.037447469904425025,0.4614156532027968,0.04622151253107609,0.03255396101050408,0.040886975813780244,0.02176326841506035,0.03056487340016731,0.06753154634522146,0.04113078017451641,0.03713817183720122,0.1481284774414695,0.025408222906637704,0.09094282604601,0.041636070207137194,0.04358979919175513,0.023172569225491726,0.2129580932731299,0.02288207187916873,0.039163173638846534,0.08993606407526758,0.04252116883749383,0.04008391665892122,0.023658469679519623,0.025721547660026652,0.05021916380157571,0.038010045223924996,0.07780805533027903,0.026928979983694423,0.03915463589725588,0.09027862821289558,0.033098078081979,0.02496099319470206,0.10708889108520782,0.029503347866086535,0.02143431471453261,0.034539369924618736,0.0351151630735313,0.0313056278998108,0.03209044106481756,0.02164760157897204,0.06835635581717696,0.04582011054751302,0.04215038723327277,0.021350614528077103,0.06090151913376917,0.02160580005831317,0.021135829874741847,0.03960062222646359,0.02345729521896651,0.06019651714156851,0.05029551143181304,0.0606922809727658,0.05627428010617868,0.02410163042732911,0.025783679944952287,0.023754461551668677,0.03997298812018982,0.0421906740870845,0.03494686799635782,0.02229015453104215,0.024226907890228105,0.04666740752646283,0.03567602315946802,0.07628888237575449,0.07957282836328625,0.07523723919192524,0.04153231929497385,0.031403475229219935,0.024026848538269873,0.03298471446290601,0.05543578250337508,0.02280705559107969,0.037943241170890235,0.022323100573420306,0.035274444023826734,0.34308855539802346,0.03968220136804734,0.06935685276113988,0.023029886031126996,0.056527608403461285,0.08414775608234111,0.02126317284638038,0.030877411315877228,1.9651523115560565e-5,0.02661837195829677,0.03817691185838374,0.06826792216541469,0.06415923897232853,0.050002362123878825,0.025269098850837304,0.028404104228395347,0.026157343864282503,0.04423004857895838,0.059733721234086774,0.034418561782163355,0.13349088661112887,0.026477912402835285,0.024883167906635785,0.033104232060089236,0.0446412396044115,0.05836548945205947,0.06391920737017084,0.09089010297732392,0.028866113316468548,0.02585046201739373,0.022961083734132214,0.04530070691998567,0.037505739959995385,0.04799659566125929,0.042481978644250844,0.045100645519092986,0.04360254082353494,0.4399579865290938,0.1070554108527271,0.052424298560383095,0.029085703049253134,0.024322133280505493,0.03289385321898626,0.0401092857289631,0.028097965966395702,0.04229450900064529,0.03902880618562771,0.15391953470605224,0.010791921881626832,0.03835004943985717,0.07987186106145115,0.06160852282605969,0.05889949775123862,0.0854551641143433,0.09358002801962516,0.025407630561078306,0.03486353125456015,0.025030832218534273,0.04636911395635138,0.05300041046914371,0.030209239911751676,0.023897519771205286,0.041568226320979854,0.07367943877814152,0.19635445279830718,0.05784602170525059,0.0330960275249566,0.04463951967404541,0.02888977702145114,0.09526476982382047,0.03726664201455307,0.026276971052943687,0.02742481515908587,0.03556314240258152,0.03824142288416172,0.0478975546321478,0.05684194736123869,0.05379072411096444,0.11497319135661978,0.034381953758139704,0.049700568238385506,0.022951352909744618,0.045338715952577865,0.12840658931906238,0.03457028264232163,0.026338105363877356,0.0730453333173628,0.03885416689476252,0.050556933702422195,0.19580418589625928,0.041170733890982136,0.043095975818161554,0.05559773172298264,0.03652826073371907,0.021751347931693043,0.03856161971656448,0.025692898742123025,0.052244580404370175,0.01727321977492484,0.023384960736309718,0.03898932362364882,0.044659780052055315,0.028061145362715666,0.06747864268158749,0.03984388589478792,0.03130744652377442,0.14276487820349557,0.11426438061099677,0.033961870848251224,0.02022382012276933,0.17291032891573355,0.029017066043562075,0.11975215652949232,0.16306535805511624,0.030779674817094604,0.0383560691483745,0.08418593188218777,0.020807728966057322,0.04156692301137908,0.04226637053496953,0.12469185689106185,0.03944580467841845,0.042986391911463064,0.057782570947539046,0.04265629760707664,0.030501241271179355,0.07631378759031626,0.02562308928535388,0.023812202643061314,0.05033274322212357,0.04357168310373844,0.05990883217673443,0.0125068901099658,0.0333829860965883,0.0711926737509715,0.033899158576777944,0.029402540778610625,0.04142225964038739,0.07823508692961464,0.011468847184769669,0.04167462562928976,0.024121260925608047,0.02919175314992967,0.05369430121495783,0.02535402854904965,0.044890004486207766,0.03594953387577918,0.03760215461459789,0.020995174190092773,0.032610569068068286,0.075408683174238,0.06962900291931781,0.034585752389416385,0.0336656550713991,0.03112650998928103,1.6440747328272438,0.037531300699789875,0.04641998302267091,0.027745718390847073,0.05869097259834616,0.0451364613445443,0.022528865378140937,8.573998687916806e-9,0.1041364677879548,0.0989078674342209,0.03445134301824996,6.744570210265781e-8,0.09114329571933419,0.05572903635110105,0.23326268814622875,0.02608989782316504,0.04442523785529538,0.031461838704436,0.029161273873934804,0.021703756890670195,0.14515588142432498,0.10206437222118918,0.3049929032528802,0.06623056118722738,0.03980733296935159,0.04260403262855339,0.06364443871299245,0.02780456193670927,0.014178966537622588,0.028483101058268182,0.04463567948161868,0.02527071110314253,0.07582364474553324,0.1140425367770628,0.17841410376981065,0.062183083627636845,0.03933958736596034,0.040301421979712926,0.032181772685533475,0.030969673606324057,0.025952903393715924,0.03767763315767164,0.04720175672025688,0.028659072069334973,0.04571717041830347,0.03669487060177633,0.033116072490867524,0.021236937731038755,0.04029101540943322,0.031122283366297375,0.056586443240509474,0.05708692071148105,0.033369030369532364,0.041919539149922844,0.025824684436251254,0.025857137054337734,0.06517975160436498,0.02776242841756735,0.07257034362472843,0.15072556214190885,0.17806411961131777,0.021456848718029362,0.048479438840650375,0.07924597905666485,0.04927503784662912,0.025329253736434677,0.031955863310176205,0.02451237310354915,0.03739612085967664,0.035508365090746036,0.06875676291141555,0.1210394578523473,0.02946416619328143,0.05093101019412078,0.02362061371812556,0.028515919162071728,0.027043341102720924,0.4441034967103817,0.022756165962351776,0.04721536913961238,0.007704396585398081,0.12081583758626444,0.027535848704207763,0.03440946335695255,0.03997408557608224,0.04780393365857542,0.07507420561779178,0.024581587835947587,0.03875161450878095,0.031175375017116185,0.050303411507204514,0.02804409689137468,0.025314684882250534,0.1468427075090344,0.03519043391826411,0.02686827175244185,8.486896445747445e-6,1.6529753334483815e-7,0.06554713516887889,0.02436771010341142,0.04051404273052962,0.022712720129463338,0.039438108945849426,0.05130645514829352,0.023094779459041818,0.024356360046863274,0.09832084547676749,0.032715284658457605,0.025397318943155597,0.00490858726192816,0.02863447434115442,0.029330291342704023,0.03178777454319566,0.03504945802518501,0.053005745927961506,0.031505965478144694,0.030336984843967785,0.08030718212791742,0.03157850076095108,0.6886520572798492,0.03347406707856407,0.026053404607555515,0.042609705496108555,0.028410008993887015,0.025801743096555096,0.03448715359984381,0.026233492255810415,0.028177607551784962,0.045841766582577714,0.03668564776916924,0.026120302475979004,0.003593045369278653,0.0729692648438361,0.04572859932652115,0.056429884591068825,0.033785809186676515,0.4464481543099366,0.029560457282945703,0.04338751800775679,0.19929618505521718,0.04709343287391198,0.03075178821132688,0.027154708542524383,0.12497823460581321,0.024962863260132938,0.040795637138006116,0.04753828304796989,0.05529001473456704,0.059186174785574946,0.02340039399247079,0.08515503036298598,0.040295024286441064,0.0598603952961857,0.05984051638136848,0.03620168768353317,0.03609337555336406,0.030278946337861528,0.03637282673007013,0.09665500134297751,0.04120250630771323,0.08700423067514963,0.03932326839027172,0.023963078660184305,0.05671219528018522,0.06470532579272328,0.053506763129995236,0.04443743218679527,0.03987915989183617,0.03268203485755391,0.2654159429747655,0.03596760241412216,0.08875687738563817,0.05240906106474213,0.03218092404535273,0.028948443182038232,0.023412997183494842,0.03128306698784104,0.02231573479638497,0.07207936961778512,0.03644820129630533,0.03343380642497838,0.03286625000837352,0.03007580475956928,0.025140244648939776,0.03325023933179454,0.04301148908510133,0.08650555069642107,0.045991716238482055,0.021591222166108613,0.07266026639153418,0.04723046137616459,0.07779911484100813,0.025304855264882693,0.0500721481739563,0.006671035665897933,0.039096840569362794,0.058358424545050074,0.1562167021378232,0.024448505764932807,4.320962458366867e-38,0.032143326613703255,0.03378056685106495,0.04284441828911811,0.026466185717697252,0.03751823733597693,0.0357713538260587,0.2088015983109239,0.06694684285543905,0.025996337215241094,0.049742900784901845,0.03261357268097288,0.021271734209038263,0.029597256366178683,0.1349137681776865,0.02746406086152673,0.026532678504718524,0.044979750745208574,0.05202476679321566,0.04929836510606166,0.06311945591814495,0.08025605200469088,0.023295604330571887,0.04513298204099325,0.027978368881838144,0.039695337596019585,0.03873816738069754,0.028307389183707274,0.03585700864411078,0.02833520116344337,0.024858740183850633,0.031816374199718285,0.02712611375309151,0.02908066034836221,0.09406162218926276,0.022746837535742984,0.0393489684563807,0.029735652206443124,0.00885380732518946,0.04350576198053428,0.022246852061322955,0.039353742706055406,0.028963905386140614,0.04095709544309268,0.13503451239827718,0.10738786587889709,0.023005150125693853,0.03620352129093006,0.11372033689867744,0.02455494976784549,0.022791125479079383,0.08314755243721866,0.03164868817160334,0.030408211308380166,0.028041462247986447,0.022225290154240098,0.023764616218392973,0.03556875263974563,0.04308983889932486,0.03216339103955111,0.02240411381814855,0.16026474227885826,0.04073039406638991,0.08215053337490413,0.027789472874535412,0.07201993432324927,0.1127149013977949,0.03155106846306474,0.044987922121754474,0.04632585565024586,0.0626282134105018,0.038247561529861945,0.042777932997578184,0.0416057462974478,0.032018652364278886,0.033353707080240186,0.051649702520086216,0.0761070295717378,0.09004227201011755,0.8431862905805998,0.027814621317969086,0.24108107285480737,0.05462285038560517,0.030161294146533225,0.03986157282121502,0.02434923007254684,0.02977371381353557,0.025707781658263998,0.033322684339311154,0.03973242923693238,0.060141775887155594,0.00017289173671288722,0.02620836687441179,0.1185304994897175,0.04750583773508066,0.082813489040581,0.02298979424838966,0.03159992385968594,0.026215181385351116,0.0291811929407442,0.035735592786212904,0.10909978648577331,0.11916803749224293,0.1035665247005565,0.07863661944063073,0.06112775681831234,0.032586888969250875,0.047359899274179225,0.10606645716856218,0.04217055577925629,0.024795450816455386,0.11678319854262179,0.04057453573455947,0.02458605481584171,0.029844383209625742,0.09411378899937936,0.033875509923116366,0.026080738536950407,0.11261178638501187,1.579302637213616e-11,0.08986265083060362,0.02492588529584672,0.052347654595743476,0.05236565578037585,0.12351832331712065,0.029858964360652284,0.05797489635546458,0.03302466216263703,0.04395756787073186,0.023471048244222036,0.051035642479251644,0.03238302574825008,0.030086247006756713,0.2857665052006525,0.04227257468983688,0.04771908819025553,0.030659808052433322,0.02609209284706372,0.02633098936433907,0.03505933550781672,0.00021825172763024762,0.0033415921267313927,0.08122382379861863,0.04531528813187628,0.0392060683822168,0.08943522868084333,0.03464366709378488,0.031757965556836555,0.08168173316524382,0.025846214765648176,0.0657997204086259,0.062474595344493386,0.0858932505754078,0.05400112861079838,0.05213779959950355,0.07101524467126734,0.22883076735873434,0.035471673011932325,0.05143862530518639,0.04734310647883428,0.03608595861195003,0.026730042434655474,0.06320443342919214,0.02827535997922476,0.041458978855205865,0.022900148039640668,0.0842652826655128,0.03354405677307774,0.029396336861778137,0.13224390968559055,0.07048830331946994,0.022471838007825425,0.05188208612205548,0.02425234232910916,0.07169991286017097,0.29976521403648915,0.023545353549640855,0.03911938108122591,0.04044826887465968,0.15590121304944238,0.052382763962797285,0.08628497906576467,0.0812925954604139,0.022867012060092784,0.039136162081204996,0.05319601028758311,0.028593290926613044,0.03227908172633567,0.04026284768659627,0.023069114697453572,0.02847813305572182,0.02906496445589612,0.025409702154863035,0.026708329930660708,0.02407018393192446,0.041684718683954035,0.038609974037487005,0.043532804031602805,0.042546095474602974,0.6149303649037647,0.052943660443314035,0.05603500027572476,0.022993371181283383,0.06592650133628541,0.03337232366244676,0.057449866228921107,0.023819123272181393,0.046764637362128436,0.03927199495499767,0.04563407150391182,0.021730051814835477,0.03804088293262869,0.03642788094023474,0.08606438798448822,0.05476072130145474,0.11664819545753219,0.0525751474393937,0.4062568120022737,0.02806259632695606,0.03415271526188642,0.1020754117110934,0.24134126698159533,0.04140087345191187,0.05479724379675675,0.046221894568386185,0.034943037344781325,0.023826653345128207,0.030747351976993877,0.08762809772271672,0.0315475849150668,0.036261742186653026,0.03660145786932799,0.025314750714676183,0.03497796361020818,0.031157077749793594,0.10837780338446698,0.022423621089930935,0.08030267117329805,0.02445823564492112,0.026498982609122784,0.049165053384951175,0.1345407397329661,0.0393640413146947,0.02332239579843369,0.03369561048751518,0.024615757863491853,0.024507156643402413,0.023484253392040806,0.04286418721463628,0.05543750134233977,0.03068437210945206,0.0436072290062892,0.036224015123875075,0.045560971591027746,0.04236780395820931,0.027180160333211037,0.045899142185220815,0.03480679694634428,0.028215096740063717,0.028988458277462766,0.02289528781730267,0.023618921443753358,0.05423464982435842,0.027815867053200726,0.05050301461880403,0.02673873172353711,0.047167580100657414,0.02925981995611956,0.0269892786446771,0.11263473255894751,0.02939403008137959,0.034737474222395266,0.03557967914133188,0.022924788528635703,0.048783154191570643,0.06382503514384448,0.026932314432566065,0.044450334939721406,0.03353210345756549,0.024272379941983536,0.03434004187918563,0.05111561311043694,0.026585133589985523,0.024014847842029088,0.07888620099178674,0.05420923192420248,0.027794768742136267,0.034205666578747414,0.04135564575816403,0.3158037521014933,0.049678342144556964,0.029227284334740245,0.02684382701525805,0.03840549155598427,0.03956136547688999,0.031255246277348034,5.686010343194187e-7,0.07169641224148338,0.08920414718494017,0.08774076851685285,0.0713065900334815,0.07230134097949628,0.05151838828086902,0.031442817306368435,0.024140328906722262,0.4462793414526301,0.02708229319216527,0.042343218663070836,0.040957985958399834,0.02503716837935174,0.02251140220913845,0.041664547106485254,0.02334332262517603,0.03825280998805629,0.03383160222991979,0.025245420130186894,0.025105089084715346,0.06464172373199685,0.023872335076151614,0.07281017083785696,0.033998032934540984,0.003186197719709431,0.030529615133007837,0.06007244880633039,0.02717210203565546,0.05336536023703304,0.11522940028649488,0.04933225914226872,0.10547439370877432,0.022845545519786757,0.05340783294987593,0.10380743745313413,0.025596124219153697,0.021776696959816568,0.02735101994318016,0.03836023148152358,0.037320032012146016,0.03304358513333476,0.03195073185966063,0.06522788207943972,0.06075155997247363,0.045407428138211484,0.04913596635669006,0.02993205073567967,0.02942066404583843,0.05409687730799079,0.05494862956100604,0.04805803880286824,0.028628499227250973,0.08447847798237922,0.07129165970894044,0.033547104264270634,0.09549455500203262,0.2973642578948241,0.1748513576016612,0.033686696099913926,0.026556168635993162,0.03463365162202097,0.048077623396576945,0.025241038418713106,0.028768850479411107,0.02593605973026379,0.17653466274,0.04578035197515632,0.025502157460899993,0.0640171070994964,0.03375916241357778,0.05397002786166338,0.04303454846446811,0.030755007100589545,0.05645137339870803,0.04357426989972523,0.03465079375402659,0.054966004347003126,0.04398908559649258,0.34956415787290634,0.0710526212908375,0.059286545410922944,0.06444275723069401,0.09484218366545853,0.03911970383873062,0.03172229286204724,0.026063627869121246,0.03874846375381398,0.03447974754851668,0.026816109102799274,0.06753399459854531,0.02583182149423636,0.04788803732678682,0.03922962349013355,3.969158262190268e-38,0.033427200701780145,0.04082766029494998,0.029777381269748975,0.10482924286526389,0.043241199217869376,0.03635510289992279,0.03232954569374185,0.039001771687227314,0.027216315850820322],"x":[1.7834268878733428,0.31139417119966484,2.3533691850112435,2.853918466082692,4.873173793898932,3.594786568494369,0.9731110462040404,0.8298274504440184,1.7030687476095352,0.4349547535935838,4.843841954217867,3.290148345360022,4.101533020374247,1.8195826263374582,0.2864856208858302,1.7203953039108977,3.485012046760504,1.6932810697135925,3.5006197648362747,1.958882185538381,2.73657234520699,1.7674892524247043,1.9759249487257469,4.238036975324848,1.4589004969054409,3.4702164088955434,2.2890957348081074,0.21332650467393188,0.8647201044710884,4.376940313459681,3.351004373215777,0.4442834067702994,1.5536102161166787,0.9326237320407538,3.384519124342601,2.683383405217822,0.5139946633336689,4.170194195929248,1.1382904707684038,4.50006765589438,1.5249185304949409,3.038039841980148,3.373629773336627,4.856491684020792,3.022172949906272,1.799306360023789,3.2009757362523006,2.0710127739086137,0.31803608232393143,4.359503480859096,4.991641720618798,3.714478359045766,0.9564502722834278,1.1148307229203303,2.246821939055782,0.42268671114435774,2.917927214556215,0.6255283265109868,0.79922453163362,4.386325539338641,0.39444198480349746,2.2228149508935546,0.7620423071563542,2.063496657728867,3.682158508124841,1.8533329393553288,0.6478841344670128,4.736291300354491,0.2136883151249669,0.4817681226334891,2.55627119057538,2.6435061508665356,4.831441136599349,1.821352038260975,1.8918667332703454,4.794860967120549,2.4138371364718303,2.806604695911118,2.1048628484064134,3.0817595051891478,1.5045694389626796,0.7948204497120337,1.0800527298816875,3.480607686988473,2.0473217735216376,4.700964031619047,0.8781628646600392,4.5832041957771095,0.19885100571041647,0.5414615583142901,0.84764004133148,4.288182791212083,3.29919044038001,4.274685879049781,1.4375492528783906,3.1242743004940676,1.4542065987689745,3.9811702454313047,4.784763816219984,2.0771468045757513,1.18046251842426,2.49841664697506,4.905977371998312,1.663996171607599,0.25110910125332064,3.8632374585822493,4.358683763331711,3.373810153338337,3.669388802846343,0.9599934248672792,2.3623093438047835,4.48571690653258,0.19757885910109185,0.3024598371388809,0.5264324845470525,3.1040988863256658,1.1328740860753694,1.3402345186439868,3.6721065514114404,4.021577523658541,2.7449615904623057,3.123579219458108,1.2867537633696235,4.754422512221886,4.4444038476474335,2.9106342440305424,4.780707503224977,0.6925722885314178,1.0326793809128754,4.03671645513924,1.2644477957682687,3.8694505870574925,0.6019571422673786,4.516234594179556,2.4054940471298005,2.688706528128221,0.6309196011318241,1.3350128698161112,2.9912349685733597,0.8178187193381825,2.2806658855976814,1.599966032390675,1.6062517464668036,3.7337287113436366,2.9401195844954375,1.0484599566634878,4.6438702347138765,1.3389041004288271,2.2323796737360766,3.507747145595114,2.6456073163493823,2.8527999672688953,3.9467208794438626,4.7872276859654175,0.9080795436209232,4.6872749857862095,2.060451139550632,1.5607098255981555,4.373789240148249,3.1853953378541497,1.7187157706129885,2.140008478919385,0.22704105295356158,0.6744916438239013,0.05934503052271278,1.9577204060393016,0.0223519579981446,2.539149378103934,0.7501133679853489,0.24001382806871696,0.48642412766425336,1.9659380263640747,1.2363097566576575,1.3105110714026336,1.2531100530654682,4.8893755575424915,3.6972283750108073,0.7582003415262384,1.7647521930732113,4.964117894114888,0.9710945456310738,1.2725978571330676,0.6972801976839815,2.27209182921999,4.496094489234981,2.5795141776964545,3.8909593804805542,1.1442591631392474,3.4260689053813866,4.902070702362556,0.011418897969951436,4.129779106269496,0.9444868100098536,4.084429843186564,2.8306042755258662,3.0522983658194103,3.4113708865939083,1.6566187939821364,4.711610113814534,4.606838821001781,0.46833929820863207,3.093579645107065,0.7888760512776971,1.6800830743153605,1.4640130177985577,4.557527152712055,3.8413092486140767,1.3624515844621155,3.906225093243687,4.192126490418664,3.8100148756085748,2.926994635998472,0.21347901329738517,3.6211682180469573,3.8194154674514316,2.3799880031847165,3.6117907315109665,4.8671547647481175,2.6355626439723787,1.7176313483372596,3.096802915626553,4.018068800309171,1.435903461633078,3.5736348123270667,3.9679543505558454,0.7755322681446208,4.609946877165072,0.9158488766950457,0.224578557598073,3.5732028047705566,3.3732848911324997,4.409336677009086,3.6716309022017812,2.0895224325133945,0.2645017402938843,0.8748890077367022,1.3938581533988403,4.624665228815382,1.03440028841854,3.3366025265043597,4.490106078902945,0.2256325423270611,3.317026202974027,2.089014582180128,3.363878871890166,3.492113203546169,1.3497241651417413,1.6304505876057251,2.8554463943367123,1.7616923482813718,2.5164171681750824,2.0614824942543497,3.984657389377709,4.398082028608631,3.3476900906541074,4.478875515512377,3.4930334832759904,3.1657077322379887,1.603924276648957,0.2886000602382155,0.9896377201693618,4.347558486026269,1.2902187915107621,4.240220837885181,3.5603204752263906,1.140899569078535,1.619763763951385,0.4858196284200522,0.7445209881917625,3.0585077472896085,1.253831982775967,3.2174652724551764,1.5635562918415569,1.0440582213050054,4.461209376229273,1.4437089574522788,2.841644425919718,3.2118081814385824,2.0098480066073945,2.368383435593322,0.3720696512578592,4.214046322659701,4.61511084351852,0.458850628823263,1.861253376868649,0.6933338332604366,2.5830466849035814,4.070758247336773,4.9536378058552275,4.5718930088486935,1.1671850511731696,0.912388252797911,0.6504131304076011,0.5753827083398944,4.948825302759781,2.6964051731478333,0.22699933770343517,2.7186068171132263,3.486616266992214,2.6182598480950894,0.46531471643458944,1.051413109574989,1.7475769670810182,3.0197286417687508,4.002612890624615,3.481068661811233,1.7674350667630634,2.4855304553459554,2.7341111172678243,0.1414266181396462,1.277236892751955,1.952268138044746,3.8377944005673736,1.5605517537310998,1.7499794671554303,1.5723964072600727,3.972482322524866,0.17984201418533408,0.10917000516881492,4.469383896465921,1.8691617621403023,0.31933983075646544,2.6507724988397885,2.65564458121574,0.43235881030783907,2.211864900941316,1.3028775706303453,2.3697839340033666,3.150460774809072,2.0035929526748806,1.1410541143104935,0.3763270620907344,2.765302340060366,3.268006086197367,3.6830890740931,1.0561734333641715,2.5682094493017713,1.695630865584804,3.353495755195044,2.8309702192299135,4.208584765750424,3.083132504156323,1.0730299355164807,0.08604567852942169,3.2748747450396962,4.96011448852927,4.8765376424494224,4.611239480785775,1.0937187847296426,0.9843534798682629,3.7743376854827018,0.28648712184998204,1.0570762905883135,0.31391710899995817,2.1306981749521503,4.917341484809179,1.364974830344562,2.286331183565796,0.6131645813092368,0.6710938686111267,4.577345917665291,4.719956434904903,2.3321097713589065,4.987312476301168,3.2825339787432037,4.796167202601573,1.685751989238905,0.279354140091308,1.626321673440747,2.915229572850462,2.801895377153323,3.697181114261677,2.1926711168727553,3.0533132416216446,1.2277290846276223,3.4159856703666494,3.370646938215498,0.7616692877628972,4.8873248082852445,3.7723843164862148,0.007602322708569753,1.5011788236362222,1.4765631806041124,4.157767263174035,0.6367177693790937,4.3164684877083195,0.9506636151423065,4.29523492372291,4.9610538942529185,1.7351136949779566,3.3944347278377993,0.22372249786375087,0.5211914235923565,1.0838512529378364,4.971180845500144,2.4502685835464866,0.4045057674973618,1.483397646158784,0.7989663692441173,1.124218267629613,4.854285627569494,0.5444688657373586,0.5988829145508234,0.5061388132302769,0.8421826210329952,0.5786446064608075,4.6971184112637445,4.97947099120732,2.5503177190521384,1.5653854281129764,2.4057546793257223,1.8055962462048947,4.327622271650538,0.2692855900360447,1.807705698614156,0.8716047237579694,4.333680888976149,0.9695905879827327,2.2715243224318016,3.636017589554518,4.319215077594031,0.8526442775259813,1.0460430423663225,1.2044017678707841,0.6765001132473458,4.107284856826459,0.2874319820734583,2.590131288555524,4.4003458659488635,4.720543658976749,0.29676578626677497,0.3370687739561129,2.152935735562046,0.8781508315291586,1.7297733509869206,2.014466201655173,0.7077690473220188,2.1180055072931325,4.106743422800494,3.450494243581259,0.8888671055178177,2.110091510567087,2.965081290080651,2.795604385533533,2.02037063947218,2.946809947306752,1.9358064047325474,2.8557775119120166,4.805245215698662,0.6707183209620438,1.2217860861429186,0.40750078837714865,3.513321940040898,1.9738541476702332,4.371797216069217,0.27240494941281224,2.3530552150202,3.661252669069721,3.2627821423552215,2.648276549577946,0.82424923943899,0.9502096690860817,4.073907108463479,4.05238359132253,0.9036433036759473,3.7622478736551557,4.1680449611181745,2.4282247591792325,2.9929251355521735,1.5297902908107963,3.8994932426490356,3.3062874290199162,0.9887183846755709,1.2450513106132644,4.044634905180388,2.8268378580401885,1.3878698213490337,1.5138735909447065,0.8482285627797959,3.638013242799647,2.3393330562073755,2.50368227830379,1.7167272649484433,3.2332043604394043,2.954653978023157,4.8890487171405965,1.3894288211260697,2.9675955782724053,1.088524744711017,0.7909480319279416,1.9204756209431806,2.753493277587984,4.992859584564413,2.058570544347326,1.1373363455573138,1.9445837379909459,0.6729044199486134,3.171723839500613,4.777428471075935,2.26799944782508,3.635084955537957,3.047354739881054,3.2871847065081017,4.9222088518429885,0.6296546280010307,3.711279407743148,3.5699870488194616,1.3119429324923737,1.9593217429068743,1.5872412232129818,4.008637209631645,0.02822209448677837,4.732161001915647,2.683081078333199,1.0943047561889196,1.7267135755007001,4.978327671342953,3.6509939383768284,0.5182776877403283,0.08141719990815588,0.5638647287722942,2.846993297451786,1.511830806723654,3.139144742506468,4.456438636698184,4.257857998042485,4.858908349756449,4.1848592205091855,1.5814556672182267,0.7792144194120942,2.4331121321931795,3.739681166301777,4.48683944586067,2.6530747477790317,3.5860414331629764,2.7090857861781013,0.09896833941888561,0.8375494823160246,0.03146217122278805,3.039840206450628,0.13825568550753342,1.945398313179857,2.848038527962772,2.3477697535354567,1.5048450951916426,3.7115079851986477,1.8453275699757787,1.0256362140860709,0.3199178649462109,0.07895584883002238,2.4628101469096473,2.658079855340322,4.744583658013531,0.9037604394304866,0.9154962293987068,4.192214502300031,3.8475637302276287,4.595714774712748,1.9222874458648331,0.618395251587438,0.5208082594785657,1.7834784977635398,3.8992186680301466,4.342996047115931,3.075191122561338,2.0828811995359118,2.976460254541553,3.614851835839068,4.991098791796177,0.8242342297444638,1.1641393735717775,1.8641732348785378,2.244974889137845,1.1858240138105158,1.7876692914325776,0.5394502518778199,3.764995401870763,1.4745504705960033,3.2736821421327833,1.91570884885653,2.87995154100693,4.743764231996579,0.6868869457540228,1.1384367011790975,1.4780389840943642,1.123518342981653,4.371473649666897,2.440696161758864,2.8347857802779117,3.9064038615892125,2.7669680692643595,1.4460170599624866,0.4767468228361882,1.9024175559522005,3.4704184173639407,3.7050381619879458,2.450628254859233,2.3392822472148147,1.7880170317684785,1.1193219797984133,4.122595815350975,0.6525086392425761,2.7425090787416293,0.5151233414433398,0.7800569729671125,0.3318871313522598,1.2838337694963176,1.0565520409500628,2.7006657679096424,4.343579291604144,1.4874520573297212,4.519783803923878,3.907024979142829,3.0191345236880904,1.6783379979353652,2.999163005960729,0.20006518939184814,4.396893245792671,3.0285747326085657,2.8170254500205094,1.966092470974341,0.9767821519875042,1.5910400145707793,2.007476664957867,3.981080832093146,1.8603256268455526,0.7010131487998961,3.9057859272471385,4.945260505349144,3.360154554002004,1.3782499868551201,3.6690433942806564,3.638630997316974,2.4290906873833906,2.431889016091784,3.6490531260865575,2.24536457527213,2.72162086292963,3.5875733829615895,2.369619696161708,4.906572054020159,2.039685670651439,4.443990235794107,2.7400598829708924,2.2533328176144805,2.3560338189476084,1.8560241702958458,4.2886264932453795,2.136499292487628,3.4961654551058463,4.996540111875355,3.1390734861597624,2.109908499180645,2.2662053925030334,2.770361508008632,4.663833655400084,4.542156869460276,1.2240960727307126,0.7724464700294298,0.4442000966042692,4.0369713850090445,0.09143080709099971,4.5638111915838895,2.577179579738277,2.993505682172265,2.510360307797285,1.1445620128056455,4.799788480665383,3.3488048327080233,3.639611224971826,0.7624174337884582,2.6654333382984308,3.5044208297551904,4.764428370335903,2.9668120988566815,4.2302130757247,1.3010211682139439,1.827354376647895,0.08052775422622727,0.1666104244234612,1.067655027236476,1.0730729378002712,3.771632511290334,4.054786312289316,3.949105605323191,4.562953150269374,3.5450827180915248,0.17194064189174352,0.44238767709994575,3.283958657532613,0.27150510349045254,3.122617213060658,4.483251559015153,1.2995866351108687,4.771284564365307,3.0619069340479763,2.715756403230345,2.8090188007804495,4.493201393427157,3.9836939428248295,0.4157104419549029,1.3615954180232759,2.0412810993617247,0.2902860222153991,1.9586148434511341,1.4676688364478119,3.4365451946492165,4.368886107688448,2.588609772809558,0.2006019372863599,1.8775071514586505,1.006250827884585,3.8353476629960492,2.93253741590127,3.4869848382176363,1.2937032177416452,2.826017123571779,2.1230496052489234,0.9785776759450815,1.9943724653238393,1.5890135708076591,2.148560117006185,1.2847657414475722,1.369568827364831,2.23256738412583,0.25849551407770677,0.4664117718725691,4.458885456074201,3.638493938968479,1.432340233371856,0.9898443245443211,2.2787848697051407,1.7302764611479737,0.7532230740158741,0.7726382340359894,4.335177848169981,0.8381659849868817,2.162341962223321,4.894934194971302,3.593724559331134,3.1843256065007464,2.9087554619327416,2.978828158408948,4.2447978268523645,1.6806357212637535,1.9620313625265995,2.501164723524302,3.918275890611367,1.0716371204655872,4.490899752317665,1.4201198278238725,1.9356538490811692,0.23780668245389935,4.174025720638307,1.169313668762828,1.1073203163313972,0.8226498610824573,2.991875248685859,1.7484238136669206,4.631755083461503,4.570383268609848,1.0660748719961632,0.2797404116520419,0.29220798437578965,3.521785990245859,3.0564873727030797,1.8051493590315149,0.518782599299149,2.813886015282898,0.8758967237944748,0.5566046421245285,4.691565982803808,3.0710605122836663,3.8377027037283087,2.753705542527658,1.3584991979337213,2.6172872960630302,1.873869549323336,3.941329661075499,1.5738397461301812,3.660287425563559,2.473330099304288,1.6931294882064696,3.923916260822675,0.2627695177554168,0.02574566471878592,4.227923385550953,3.312875218984319,1.8262995222856981,2.2710488563075715,3.5983295908648616,0.2660020354356929,2.3838794612424428,1.4544727602789576,2.3696655413423775,4.533081634685633,1.8596187696939126,0.8626985168614376,1.054254328252816,0.2519215894738769,0.560838441643855,1.7504118875843766,3.327980953035384,2.36793488221116,4.988102695738745,1.0082516336928316,3.102577450663704,4.000879035188346,4.587812720626545,3.266519465564307,4.524360471512291,4.541213766810554,0.27327075175393456,0.956438478808258,3.5591456044899994,1.8305701384913076,0.9113072621919571,0.3867872111857884,0.7540648430119778,4.77059494828275,0.5536309642927728,0.3425578874807067,4.613509349202589,1.279247229364383,2.991336738142587,2.208342651994818,4.069258142222015,3.793963849274109,2.459070244103784,4.8647051587785395,2.39165015725908,2.642489924917617,2.482164252531459,3.8503600580082944,0.1918240063266785,1.6066325353685473,3.1134967598423593,2.9378011251921556,0.8372051223992982,4.832646062252328,0.7241120782720212,0.888890968244821,4.754641399745616,2.8379442600163705,1.5902593511432328,3.163822609424205,1.37811707688549,3.4847508237044735,2.3135988946340658,3.696713415367099,1.2160490811405933,2.6354183611000694,2.1652077343523732,3.445737282048389,4.602158444970982,0.7964918193401171,2.3963291373418816,2.9277954641433013,2.3440863372455034,4.099888336582863,3.403867770612546,4.286215096828272,2.0776922252676733,1.8208450013041932,4.073450196425691,3.424353217469167,0.342584506921928,3.28200943781749,1.0578412150940275,1.0221483369734585,3.4399716754569596,2.4129789307756653,1.9539639614313087,3.0923396237268275,2.4481460767521233,1.6610399902104522,4.144023309128459,2.4936276909272816,1.8786132399524613,2.117221822403571,3.9538151350134445,2.563488261948994,1.3018927302734595,3.112137028941564,2.853027531714072,1.2032034328967522,3.2117868766833,1.6482787908608199,1.60781460240507,1.1397407202068455,3.760091878348474,0.40807275112251684,3.875467789690891,2.2144373455065947,4.892264479021654,2.160088055377342,3.729581813796312,0.5812146963494691,2.4917454388103097,2.7611399046597818,0.5430413407134738,1.5656162495600245,3.233184290130385,4.852803174936748,1.638112077498446,0.1973717749851267,2.3399487000839736,3.292700208520929,3.537916913818766,3.5587649738319618,3.538816394484173,0.22375238527835184,2.091267393055759,1.5872629916411374,3.9985374778386173,1.7630775065913373,1.6195642378600572,1.67071632407352,2.0447197290446715,2.0825610264437646,4.848677327630443,4.837986999280731,2.1843099113638074,2.0056554374160287,3.8593394667003187,3.524991316544183,1.4034690201844058,3.291342078688043,0.027746049968860875,2.8877255238408073,4.120588147748775,0.8101610818359395,0.8398497572262753,4.447068330469751,1.1984912107961854,4.4816338249020955,2.6302582179617264,1.989064141547231,4.353011808919861,0.7396392009762132,3.386156429891014,2.4954723412019653,0.8121658188982905,3.9660109448937355,4.159097208000833,3.0555575554506333,3.0681300032954373,4.577877476106529,3.3761004449385834,1.1504474633183925,2.995038600994817,3.624403898253642,2.8143492364825553,1.2677981736668897,0.1323122468560778,1.4389766860840814,3.1832148340404953,2.190501673136928,1.269598891335847,4.213968734662952,2.8491522658072324,2.837674748701363,0.9551174919350214,1.7833755046743427,4.439218475794339,1.568030751557884,1.3522222216841973,2.043889656584393,2.2691237076868678,3.344007518562803,0.5381894894227324,3.4463015935446895,4.98440045128156,3.2124562596198256,4.533472801625016,0.6295317552304525,2.728781480738447,1.3837498132553816,3.46395862512358,0.3488138170669697,3.7543569950673294,1.240327391140219,0.6115523277971124,4.925667907193171,3.5167084827799133,3.7931814410706775,0.14517988403256132,3.530048320661592,1.5861934521477017,4.788143487251011,3.9114390245501673,4.2010821569607915,2.2844452781975644,1.7195465320076564,1.8431870089730185,3.430546793049938,0.5325116316234013,0.5718215524319692,3.764217490571191,1.0078417450396415],"b":[3.6830884252911034,5.254462676090279,14.503111413349687,11.195698347696288,18.145951843302363,17.45163213903657,11.457564453816836,4.645948268981779,13.550100189408631,13.356520688841051,18.072769022233732,16.152401692333605,13.742936645620517,15.594775691022233,8.347467300779648,14.337922865050526,13.498610322139024,8.765388041532699,5.6095100761705785,6.638391089640905,13.752192461062812,0.9253101678894282,17.139360861331344,4.0120751381723085,8.863838445778418,16.907576423048877,18.36545383105851,2.845576789139961,0.9193693069176812,0.4819590680576358,3.4883862759564144,3.2209587281112073,16.553472176335255,12.216180410260824,18.803289360148767,16.99659749511152,12.2524842829664,10.870185410855147,9.191871257769982,10.34129085527288,1.577470535636123,13.8298761375537,19.082288290756996,3.7599039316545158,16.693781535320493,17.65681667802129,19.148150565925132,3.017738784813697,4.026472485873351,19.053553276173062,8.364393797285693,9.009292824414018,17.212569462712327,13.366124831799727,1.4635944246077859,16.957468941566614,7.915694442278238,6.195996685486462,6.980984892943969,13.291096123824872,0.642026063850123,15.045535688940209,6.815156222895826,17.513163196818226,2.5728388486195097,7.901777691557936,15.57807734891373,18.8197139507637,5.841269490999017,19.713733870437817,9.150186389691171,19.647517042302308,16.856058237759136,18.297543833256643,2.62671321327395,7.566786891547008,18.33244512302779,8.420476833485884,12.80700742868226,18.0222883385228,3.2079914995065995,14.594775284562736,4.849007229160436,15.718644883393459,12.90990549648249,16.23254582257409,10.940372273083794,9.222211590668795,4.43506292813423,15.77425254051641,16.07109978373536,13.634845417925163,19.977428583491495,18.852274129205814,19.39699969365781,0.4832529785446349,15.385295280306828,3.324945833097668,0.9983458110716636,18.086358388927533,4.489473615617969,3.2846696843290157,14.177852510560953,0.43643687683937227,5.731272676279704,8.919005362977837,7.925310139703634,11.157580877963134,5.957671616079527,5.439021853267785,5.062489474715748,12.001277853095967,4.600733639443861,3.4630604136479493,0.1973359701996502,1.5151899974369964,11.874408436878966,11.22965836169437,0.103315572044691,2.264903455451157,8.28772761665098,2.583839347824033,6.157327529490275,10.477073231703544,10.881457969904327,19.945348820200262,12.376814785289763,9.801255454842014,3.6634662500401305,17.452829713971916,12.39714597167891,7.385792605396904,7.742733480879247,18.64956775199864,11.786310744094294,10.443638115287698,18.168646832218734,16.35165741077745,8.595548261898522,3.5604304505657813,3.1159400678473004,6.611865657207314,11.849823607099118,14.802011165319055,7.06079772748653,3.0116653573670193,0.5389063435006802,9.013487256352404,5.33050217893666,3.5044075639518812,10.488657861924132,4.596300922610439,11.976267309242159,13.95535859358323,3.6235842512684213,8.821073839126893,3.1050765842996153,10.763686051958983,19.4508728142263,13.096522602861285,19.15172676106775,3.1075872913535463,6.464923508295071,4.9966528694944,1.1488706149687467,15.100768526094978,12.388630154210304,17.962522292493205,9.414339658171848,9.682735105780523,5.6076680543815804,11.836791338903776,0.34184148213691756,10.059783967909048,14.90399310560317,5.615140481677585,19.954468692865778,16.162697134106683,6.5033295832856775,5.844720956020941,12.878166801048172,1.6394186769197727,19.2348142047177,2.555516823815136,2.8812344546354973,8.971923251730743,18.335894240845036,1.8071767158415275,18.539829988200225,6.8019643502508,4.677268173679638,7.762892715975682,12.390352534849063,16.571151633923197,17.35182073850772,7.175625586607737,9.943087913223367,5.529837998591507,13.761641144875378,3.1434391420702745,5.396962064129753,12.517184485825776,19.360410561805317,3.8581203017686505,16.167049973584632,19.355999684129173,11.078810503626757,13.776291745476573,12.153295420077455,11.171257980587415,19.37813112468792,4.359256061823498,10.71955919299989,8.422778862581982,19.83214575414578,6.086663602759659,19.22997249706231,18.45422580842921,10.84150347488527,19.56428560954716,5.484260653446942,4.5182487979253105,7.117226229305209,2.89278892103924,16.893294389094727,19.148369083217688,16.198244014013177,12.45260628468261,11.672836767024446,10.016166951248948,19.519596721554553,15.818449256737885,2.4602605179978854,12.546431178400773,5.929079958087646,5.708686410136359,5.707317552375377,4.32137623882729,15.308552481439289,17.48490581782722,2.25258443911168,8.54349940532785,18.679799281635034,11.82667645079205,19.87152928272223,10.087713921674176,0.6963695490538724,11.14979304043092,1.9234916621799591,19.96200084729437,6.644208844642812,4.03207514287752,19.777384538664556,11.17514451334836,0.24224424868816818,13.931003979092447,9.417587763029749,3.7054682232343206,7.133198307862889,9.943688845726921,18.89983691135238,13.19032572440776,18.560782254526636,5.372135224254189,3.3700120474929474,14.000668270273735,1.5648988432275424,18.51427334732973,19.857305143130617,12.032125792642582,10.431389879645248,2.1467886389726143,7.231489981193255,4.4457102875858245,12.060850230506745,18.025989509717366,19.455646465783932,7.835034131292646,11.587953142480556,8.558352656743725,11.46474222787997,6.270515297234409,3.3973097240570027,0.3176837632668539,1.4605612909908805,9.36332146983462,14.452496885188548,17.169067033251032,10.21571508897579,2.2063479667480967,17.05447945965021,11.81268762720725,12.691422878581186,3.082364461791509,1.2674125661108127,10.398206763898155,5.526418580617998,5.264038931592467,2.373695245474976,3.0697532471966893,4.898317870460667,18.71577251210183,12.660398201663874,16.789203441644954,6.371379446588197,3.1464622297072165,14.969473019844322,18.701099894007385,8.862578033235934,6.494497197793017,1.198780394190071,6.595118681049592,1.4854384074419968,10.32034968906327,15.638632432456392,3.396998256131587,9.72698347370308,18.49558148254667,17.63448014095479,9.835505849501542,11.77871079290603,9.786628084876657,5.37517640616584,0.6967664449108613,4.342439583639113,12.909149787755009,8.818619723838852,19.795786332792265,7.406115676232177,1.2724015161900004,13.868699745990059,18.567817517181812,2.941856899017865,9.726872090467866,4.320949443313888,2.42748948309516,9.972446068134847,10.549659402454488,2.3444362361152127,10.698938783265186,18.561151047548794,9.423752801021227,18.44690896203076,9.39978932390719,0.9095838652116051,16.758944458820476,4.228418223395982,6.080317621810241,16.989846966213783,6.548169865358648,8.92283362964128,15.747283779754323,3.322090407908602,4.293921587751637,12.569342785676106,19.893186891468616,1.628772030530592,0.6248699425080995,4.149234877379713,2.5464397272662698,10.559761406576587,6.670448033226588,3.2757136158666045,18.9571152064541,8.551379564319404,4.1615680308917335,1.7580997542133092,11.961975657066253,10.302296910543793,4.868612946891027,0.8987148666768041,12.341891750977641,1.0561736061354,16.923952550646703,19.8438661783678,5.861173250559184,7.940926066900507,8.182341753339086,1.3012936008068232,11.463241863970662,6.007963832387309,14.185864494235926,15.885435836733803,7.638911506789436,5.86816788692722,1.1806661141738983,11.992221740595514,1.145084571612771,11.598966558590975,8.068740617573562,16.381748503704266,10.902551103801347,13.680504492060365,12.941449785855301,19.398262946834727,13.233837312018228,6.285035864711057,5.504492612969862,13.746071202533606,13.888471672558783,10.158562141930464,0.24951959765552978,12.840623197489087,10.339553284778269,17.915718779062125,8.365272538199115,5.331332151146602,17.53351782542207,0.0882256101958534,3.476705762465202,1.0479385019674536,13.614259126078284,0.19573967522701352,5.261411599358281,7.28442048675666,1.575799433985039,1.4853802184044618,10.870801894750004,13.867664275287215,13.388467028297764,18.307747277683735,3.096935071191278,3.8803865572687446,1.1220480827242874,7.391288360680153,2.541189488484119,11.43168415970539,5.6227911953872844,13.490644941213311,1.433694754429622,17.549869141886152,11.07427415545104,17.83488017843098,5.886823097408174,0.7115032114010544,1.1849373966014909,7.934959944729125,11.208322974758008,7.830937899929475,12.335876362103392,16.009460867477664,17.4000992194831,9.995576034685643,8.344317435854931,16.01900743130731,8.278845295584185,12.323859692200866,12.280652125544108,19.009447771010265,12.392574896199138,15.816668494122993,8.774683991668027,2.3572121152885206,13.942602147890447,3.9856317036693545,18.87924572319287,17.47197527981442,2.5414413274747805,15.452211548654503,3.1884938680892816,2.5774542007622214,1.9994331559809142,19.61218942316187,4.942310740683178,5.92373414858522,6.365470062996925,15.869880976298937,13.326031538678356,17.39882792973939,12.77752607157069,10.17670730806186,3.852126752118301,3.9356621422421156,16.561460169628816,3.2992430533269212,18.875939383675284,16.201072941088285,17.57573816085356,0.8193679480138716,18.544173911651352,8.823877207393465,0.37999806994161833,1.3859253254524084,14.935557726674467,11.21189007360027,4.7141653773689685,9.157627067727901,1.7098517535806268,19.50166002924229,12.722142850935434,15.04277432118581,7.366001972330478,12.446183037793745,17.842405286232555,2.2724111143817405,13.093396948023642,18.07661052694735,0.18569571124916084,0.2921311128653592,5.437379655101227,16.493122805217368,9.725299784721425,19.423541301445105,7.4272683660586125,9.635253429260725,0.8319376828709357,16.811271295682584,4.727526643439965,13.44656574344523,19.028896836222778,0.593840480183605,16.516552501877683,11.954301771780717,13.715081198779862,13.751618402717622,7.793813090508777,11.078053664669305,13.254786211762632,5.784290693505181,15.06578995264421,0.5217837391716884,12.7962995911449,18.037414262676528,8.648520516672447,12.806924330456164,15.423077419103596,9.486183313761977,1.541658803461483,16.460059332373508,10.333068880777576,11.776890384087482,15.115059033385915,0.6977153944560444,3.9017090075858185,7.197736154467749,5.991030881794397,14.75148988202199,0.8199616266809961,16.434478209945965,8.065964045275113,1.4920827227986289,9.084213455604399,14.071061611864817,15.995443713939732,1.3461304551189857,16.39606103675963,10.994137679717767,10.126373362549588,8.633529719417483,8.034482458157823,19.44575939928753,3.105952675208332,7.344799267534392,8.233238294715925,8.30520888280358,9.08900134229552,9.649955495624237,12.05011162608879,11.888629056301747,4.953523551430439,11.783531768902948,4.4242970388288505,1.9707927665266523,1.6629368520269727,5.59200102438552,5.367529234444026,6.377905470201224,7.168166574011998,3.145564926128115,14.700912407497997,1.7103353356064854,11.948998198486054,1.9871168711414322,9.346051654612676,13.948691076334075,16.82552449462703,17.695759340820953,14.623070597910637,18.919747746668477,5.159300821956729,10.810453202375388,9.343999506421667,14.932059943344065,16.350793510632762,18.92012680156045,14.570763351665903,6.828520166484786,3.6547320257105476,7.981893576726518,19.139091411080514,1.5893768812528908,9.92806966272244,5.991054856411235,18.104511623904823,1.9183636057127806,0.7643487041827868,10.265368307577116,7.070531472223465,2.1831596939994524,19.946699525055195,0.03990419015868607,15.39118623117426,12.709246309818312,11.437430208520665,18.840268681560435,13.206493187928356,12.853655028438137,0.7378161705129482,5.427709456894103,14.58405584375222,9.35869309571062,10.816718575765144,19.429106130675894,0.958359583690096,0.5759497963507876,15.549567391910148,18.70346629102704,6.588574640271854,1.4168523533461386,0.8809225754840133,6.545669124871805,5.867791839780798,19.914830646405708,9.197826259341998,14.320825453238735,10.69111947925288,12.427020063424536,13.480996948784352,2.841523220729205,14.01444604808123,19.58288182269144,12.119907193195179,1.383330592072487,15.484956025479715,3.097263839552453,19.03894457817637,10.894719522357414,14.522559020922321,0.6128679035863982,8.871010387493147,17.183217262913733,10.913501862887983,12.120274547296352,9.75303774498952,1.7601244509654101,1.5406127984994367,19.877390130718823,8.445346804776035,1.3941265294239802,17.317087986994075,17.10515725070711,2.755115826068648,13.885857610748689,14.657205874734203,14.955504970356092,1.8008725984185237,16.358912213488395,13.429540587787944,11.209464085230213,15.160022409365883,18.825920240413186,2.383561086128916,4.609613092621951,3.113151806739949,14.940533543837544,4.036232704241534,3.4601189562531465,10.956915393796947,6.9016949161879015,7.22172935478723,7.688380841424074,10.306573615488164,7.9894355454712285,5.76783607964138,13.417145619734253,11.083567564616814,8.867561107269427,5.369389371376014,5.231440199337376,0.5893217960574892,17.644064790730233,0.7100762792720117,4.141527075652736,13.123125751115513,1.6435530815336152,15.274656367396272,13.585415248655401,19.0247261978088,14.780528137954994,9.71565028436789,7.707179823089638,0.3321855572282173,14.336690798976054,3.5809643843532513,4.470903971873588,2.6476342896663274,19.5376581378085,13.401383576447383,13.765507291490744,13.758343326785681,13.952193513454056,3.4631479651147323,2.482238271825703,4.727655942650846,4.32034865635937,6.966805188703349,1.1227384285376374,5.904731930423623,2.3609599258529856,11.75610368039029,19.01278320893582,4.045317096006995,8.817005339889734,18.012144564700026,13.475925332902111,4.028191132757497,11.909148264897178,17.00286463635844,4.16501726088212,0.06258026631484892,4.301127194055909,18.154879731586195,8.187974349466987,9.090849851659378,2.273461068791809,16.62048566878681,8.614715320344981,10.516118759613025,7.109732877027799,19.835076124815558,8.92432944499756,12.982289115866518,15.381988328268005,1.3989655366933151,11.180959263008061,5.656179847018561,15.847746266404496,17.565544624434636,13.304372843774956,10.275763154830976,0.33741138536281134,0.3537187611321402,3.2327407980723555,5.786845931825808,0.45657429499621927,3.3422331297276964,12.63884783290241,11.912808133838716,5.484575682610191,15.324733344497092,6.412677986752371,6.720914987853299,5.780274223770796,2.7970757940836544,8.625944718928151,6.355878112682083,2.0344179056306455,11.016350466956366,8.22846083796315,4.820329989685455,2.9110889855456534,17.912821719785082,7.720056458740365,17.612265997370542,8.166286458427772,19.30403754044272,4.897216030539027,14.737795563884287,14.802335810246042,3.556483534163468,6.690837141026718,17.12602109954343,6.027110447269277,16.400235198787204,2.5567693743899422,0.9332997987852076,19.378977296657133,11.252229159749398,7.197923594640017,2.4751556559077903,2.592337688514359,2.0013042221328314,4.866948439089955,17.734504145628822,12.501818575022728,8.68105405563885,13.639673209811791,12.031814061066072,10.981381351894349,19.331610115504745,1.2084605982790197,16.58227392182696,17.89219350970189,17.777282726579866,19.25054754595069,6.4565747015785036,11.640536689812446,11.256340327697476,10.948509711284192,0.7927992137086592,9.11491926473753,7.288350241771475,18.610466830487212,5.181791145477392,8.472726945217929,8.39978113157529,17.622136934074867,5.710111364997927,2.5358370608386815,7.906048404277355,18.58872390078985,6.730749535857092,13.535316532208546,5.2290835603481955,3.4126961842687686,2.998916006685315,8.811575922624248,0.9925233372310682,17.148168405902222,9.841282549129659,4.552166935209221,2.0233326213593017,4.132198985684177,7.849190506405166,7.70604203179956,12.059346767912729,16.36542806310817,12.338905193167022,2.9342645074679785,10.3333323243675,11.31598496192106,11.3455653127052,17.475364814319544,10.700287823033428,15.524128481615804,3.461579505714041,19.469369042894954,1.9641066202967794,19.944858998312643,13.468854946296798,10.030744994662593,0.13646389260524305,2.567537374172808,19.26960327395235,14.23271750339051,17.548348362843797,19.254629927928182,17.441559608222104,9.075506162460405,3.3569494879500095,15.441571832534793,8.624621993908232,11.819425422992108,7.6724766178049375,3.800325959596229,18.014643520101586,8.653540045995554,1.1556290826880256,15.304082064846645,12.725452824095186,19.0834527688465,16.598374722276258,7.945849312700846,16.68749139953386,1.8468669009929117,15.184553916127555,10.426161457519498,13.841271817802522,18.395825258763953,4.09573839124227,13.38204043034815,12.236319646595772,12.708233204911688,19.046539011177543,7.918975316246515,6.934101416138327,14.852266760017216,8.93742252607209,12.988023272103892,19.053214209685535,11.029943456367391,7.553612231524078,18.37359056240363,0.976656116491923,1.360391326832211,8.797875650916458,15.193340207243784,13.304372197537933,10.549799867370249,0.4048909503273723,4.375296346536812,17.081924417224513,14.374749944472196,10.849470750070385,5.23651848016526,14.441161212674833,0.18697395059760868,6.8542486062715025,3.6621752705669053,2.543352159093053,6.599871039796197,5.273158749420572,7.059019708556882,2.663002266972758,19.361776814783905,0.5958615337185513,16.53679189016647,9.05220527491677,1.234330865741038,17.172774231239956,18.871691353806032,11.299121413166322,19.32960291034795,12.427397811551977,10.592607479921208,18.555724241658012,19.143343286010758,0.6740423232093695,19.46358540076016,0.7883639654023344,8.29094850893159,0.9442663018732045,14.700796418950276,6.649197055006275,14.032521515707423,3.461203535189763,2.6817747780457823,6.921810746940786,4.197563020663457,19.21881074566147,2.293163833225136,4.784824561519239,19.45971648697111,18.542856701241043,17.89303216116076,7.314172144032862,10.633895213845332,13.758242314418974,10.394372674307416,7.052462663893433,4.84262224012757,0.8890034497515664,9.67605192815232,13.381263612393962,13.337605099365426,5.048358442993526,6.075671470264439,3.9475544427030274,14.32083418737539,5.743129532034685,4.067804711755856,11.37670048977129,1.6630195818271831,0.8441025505180955,2.4057969739589824,14.082893546679639,16.16850318943937,13.143453442580721,9.356730539774492,16.041044090156756,14.488554054489873,17.33588359333284,2.8186276921026687,9.23859556836906,15.345022305407742,6.584369926227636,14.348879773869978,7.793139868854997,9.445847625861589,13.100296734603084,8.654246160630557,1.4399324611016606,7.702290449199181,4.793501853662292,2.564761914154685,1.3799264950157042,1.3224380236726274,7.0845803530746565,4.363212599286994,5.00427461021447,8.391316321858419,15.461932171055274,18.80805565488243,2.5982328674854838,10.394376860470116,14.419234030138712,7.17190362569299,16.088374058045694,9.572061108942659,4.404079715161164,0.04320314663388558,10.42583607529831,10.311205636482574,15.35344713498841,3.1542286575852696,8.252027177326259,13.736514476861794,14.946540071918974,8.197274708102471,17.390270914710975],"mu":[0.0012002535702606565,0.45970136520284366,0.27871190299128923,0.28254444992515015,0.5903243260588822,0.4545202093741263,0.31448347182187475,0.2996704620315267,0.12682045886834725,0.14656609029596646,0.5980978789840519,0.5791716693554412,0.3467125861583473,0.8616098614560042,0.848217740000845,0.34430051733335176,0.04438887113879719,0.7000188318588625,0.9448363387517824,0.8257675900109329,0.536943736221501,0.5727998552039049,0.8853874767195669,0.6404455066887276,0.3708291030153843,0.18569435420209324,0.04250455547106324,0.34115337754155006,0.8661006016186399,0.5655403240490553,0.3485085837676736,0.9935723683687936,0.6785071287698381,0.8509772646473113,0.7666351979944563,0.7129508642060629,0.6289156688042568,0.1465730118669386,0.5097100323324248,0.8237491998405799,0.09916015953473623,0.20730787379150306,0.31821695593139365,0.017883138952801803,0.24317001623708512,0.6312531170959528,0.29001536471650957,0.1785681644303012,0.1931086005701772,0.4764374993704059,0.45770302110033034,0.12117567768691484,0.2949394144869264,0.9791015897369713,0.33313732395647966,0.6085182910585416,0.939925819471572,0.6854811045680105,0.13627647745947757,0.6536628505891677,0.5042569117805049,0.1287579034387556,0.616300972353276,0.36254524423215706,0.13865760260007365,0.10613615971499235,0.1335913520578902,0.8427985427524729,0.8177852436276742,0.5409748189508286,0.4500004407847531,0.8116551737128366,0.4708141285390308,0.5930258799661268,0.575719340815634,0.37142879995853884,0.9404776172292746,0.42046116947294365,0.7963093344869396,0.8702590158814705,0.5205202190053866,0.3248674984742468,0.3017218163813111,0.8323961773089119,0.35005117638842487,0.9304714098628306,0.03114171577243252,0.51682418448769,0.09800287893368309,0.5537083146206723,0.4497339224063246,0.8261867150173181,0.2022354982738388,0.6828297770181668,0.6898281751319577,0.21716271925803077,0.9688231966471077,0.24068570588521454,0.262477573889794,0.7071445555992337,0.16179730573982942,0.7515915821546164,0.016576055524359923,0.04947315715413514,0.9129956431582495,0.4098790309178153,0.5780008656085815,0.574273274766236,0.39289339197436846,0.1084481989387982,0.48210259627486995,0.12350554723826179,0.21929975045224315,0.25493267379429163,0.1031442826294886,0.4835423679896156,0.32815626487055605,0.8174287985789348,0.4035156682704184,0.7869897158946542,0.8619521090395079,0.7469056735578137,0.38417278769421803,0.3741301246676856,0.7852998252614605,0.4726756294615133,0.4781350826491373,0.648273722616227,0.4737513690578221,0.7395862632328658,0.5351752304822648,0.8248566194458113,0.9782698274451254,0.2759954874638324,0.1687508274682472,0.5032425314080922,0.9225436307263339,0.5712150966930807,0.18010903959131652,0.5464206064862789,0.9770633278169409,0.780043554503471,0.9049450751666692,0.3494116739841351,0.8321008524202393,0.7350506309004017,0.8573259468300545,0.7145819345031115,0.4209425908813955,0.25402269974728564,0.5602186768259345,0.37528384993723685,0.8029234849538844,0.7361928428406705,0.21319384376257688,0.8680686602482568,0.5784282526419664,0.9460839417172779,0.5378811037447806,0.15631911964123124,0.016402446717745933,0.07233534960353771,0.014868230279011074,0.3895262153653474,0.3871553355931723,0.43844682453684314,0.23195574026936683,0.653690648416412,0.9722558372475267,0.7711589865743882,0.5529603854008369,0.5401212383820766,0.8419214343500387,0.5799989399371226,0.8047997821617481,0.518943721428152,0.8850177259291963,0.9529727362448832,0.9212770632499199,0.6839557099736924,0.3989255040706603,0.0886319901580852,0.25846939169861716,0.3142526562892083,0.38335588280134036,0.3752483215382745,0.9062735478646966,0.6712362685368789,0.379363176787189,0.6191472194315248,0.8196268149258026,0.9062299971743282,0.8612883560736349,0.053934828375205246,0.8597569756908781,0.7021270839563298,0.6284994617987751,0.8260116143903933,0.5897237124169439,0.20045447491549484,0.6079647883684263,0.7399681557870534,0.12939317211416634,0.9440742691439032,0.7020739236381068,0.9454549518997806,0.8780160697515274,0.9074766057995471,0.585825063185706,0.4753856116858626,0.4078300526177372,0.6707651668154919,0.02251034486546466,0.7370030344264689,0.5228481462523422,0.558554552014547,0.05085809126930685,0.28413979094251895,0.9835171698299363,0.04056486344183141,0.8202242793416326,0.4551233917776698,0.3948418686480337,0.32749333653294577,0.49787156257564713,0.5333279888450322,0.3670616356704737,0.9715646799179802,0.40135662277051876,0.0016503640430827193,0.6592001856881751,0.20214717578648944,0.05186228944380922,0.7007203439628382,0.8586656904045944,0.32716070047172097,0.5251321935317681,0.19714617675845791,0.433112837769396,0.29251154324531914,0.1955861799663876,0.6887938368035391,0.3264750147144184,0.8098529344593135,0.9852958052810261,0.06096774872729771,0.8354592197914095,0.2670048000599572,0.31412722155217354,0.0851872083438745,0.6152876959308635,0.4980345653218361,0.5613423038272487,0.2533199966582731,0.5468578966003854,0.3150434818459569,0.38713010875275544,0.6409555500690296,0.9727768077473977,0.3442826153651224,0.122654091735521,0.5409519993152845,0.744026245334994,0.2434690329598299,0.494300117069012,0.6241764738730038,0.2539925036892976,0.12006570913483139,0.50932005516292,0.3228024653515966,0.5118420695314054,0.2465024745466291,0.995572656223112,0.09704488423993629,0.09548248657525282,0.17350676964910816,0.6495768852553319,0.5268968934600788,0.38581867719880547,0.6860655825306878,0.07110054407753585,0.6407743494251188,0.4822536229864143,0.05392210198295189,0.16343744086916678,0.8659730331848929,0.07562295494164029,0.9784033893986268,0.893963087764639,0.7512449989738568,0.4424035083421509,0.9032138677966357,0.7694802953434265,0.41361667789552126,0.38761945796478603,0.34413410336542594,0.9158370931453577,0.4397554603238776,0.4617508572031923,0.6382104527639971,0.8909749103582048,0.11203226241474384,0.16897855872922896,0.10237424373075688,0.6502573835390613,0.026159620127209404,0.26379239706358626,0.3863117924201336,0.027175651889268293,0.42672397089393455,0.3740973961458849,0.1683305149301899,0.39234246684494956,0.7156154743666554,0.1645972897292971,0.09451242023267659,0.8442293534537977,0.7048077151332746,0.6964642829996177,0.95516317876738,0.6395224277793103,0.950838391139808,0.0032715973051753444,0.8504536650725809,0.425963223413796,0.6738697513843181,0.1412328223958097,0.4740976704230788,0.20178489866777927,0.5804114530730486,0.5588574098618073,0.7878176307855254,0.2809428289885587,0.5454507213760598,0.10520103298422612,0.9332565291059312,0.603093674604199,0.6925175680171551,0.20158707359421602,0.19499442631477493,0.2390668250053054,0.075850626428416,0.08618232969925432,0.2550976992387828,0.12751549877460722,0.8779226492904106,0.18514034163347248,0.8993403008216407,0.28489540891602205,0.17492533271655164,0.7314233027401884,0.06469876949964726,0.8816207368260627,0.39504117545159856,0.14337306438102604,0.5931660369091591,0.4300456889943731,0.21367776330948196,0.6391383906090382,0.1980651619793552,0.02922657539484419,0.2507009062159493,0.3829143102793704,0.49249966303698933,0.3647113879824735,0.4484754651146452,0.23614774152652873,0.9725204669899978,0.3760593513266315,0.11523268005324239,0.49379551003547517,0.19404116814518324,0.2650466588688245,0.6436081207744389,0.10625333859505837,0.3236161425904971,0.44703041040105296,0.5996117259736455,0.43043385000739476,0.7069280804386997,0.9456394591948458,0.9483288101607801,0.39437894549246266,0.6627011753368728,0.13588490289278843,0.05556857369613777,0.9451783538905445,0.9790288330462471,0.4397088636607105,0.5788324035072505,0.3555770522669417,0.45699498168645847,0.747195966035928,0.7329901180410934,0.9919770624083313,0.5023181918855195,0.7408439319270528,0.01996051511434871,0.10598253032495819,0.19270738752934613,0.19931428359699854,0.49509071267508853,0.12610406605248015,0.08323663131029924,0.9469553706679745,0.4261184380934768,0.7982268076132564,0.8468847958151899,0.7585224126682113,0.4430330359052015,0.7567245098475779,0.9350677274857444,0.9120108426905462,0.4890852504896426,0.2898590093715401,0.3867625296104198,0.5349856544240363,0.5921574275052357,0.3817369715890899,0.32407448107024384,0.1121239450591831,0.523170790310592,0.14164287185221736,0.7789616077948021,0.8329295951170339,0.04665544727465121,0.5877466058464227,0.7094878128436124,0.5229791673411377,0.1290020066803308,0.3011644635630446,0.2102705932863047,0.30156929169263513,0.2101056778541266,0.4359674175225332,0.9944591972666592,0.6026562435260254,0.7088934687628259,0.5034230222968887,0.6046559534470513,0.7540707779552656,0.3379139826556603,0.1323463728619041,0.8046817260103394,0.6529549717467267,0.6417256773854665,0.6980728293061689,0.3190327826130215,0.7385544270068538,0.6535905127977708,0.974734834267662,0.3463596303832639,0.41935503706561006,0.9695572575698086,0.0029062431763688945,0.748428025472822,0.5809905948946856,0.8536516196692927,0.8959305530177104,0.1915321831655732,0.1738410009313438,0.27120082553516767,0.6925119843264287,0.41664510625738616,0.5299480534917818,0.7940139264287742,0.7048392027289554,0.28895642632893215,0.22603754844105395,0.9502877313120885,0.5947267982402491,0.858616821632963,0.7981836513949017,0.8416976242716756,0.4469982197436373,0.6636506284547163,0.10688129575893912,0.6237001362344741,0.5878559668464216,0.49261919682152766,0.7296171790922661,0.5503378995344057,0.20056280285259542,0.3151763581260145,0.04739243403608229,0.2889433782089732,0.17226043123943535,0.6426684407775842,0.26729412208127856,0.9702242948551298,0.9565073675630358,0.5461962822146025,0.5195029400235527,0.2449703838686672,0.218362681594495,0.8745158811550233,0.14790306718271284,0.8194260348286277,0.05865676754881943,0.4272217081597005,0.03289284800588832,0.7305088737073979,0.8554122421627004,0.9507194034195738,0.7391392255693452,0.9999951271788852,0.21167472680045019,0.9669758967416675,0.23759696739939984,0.9401488678171117,0.9534666173019437,0.9470981951181798,0.4896260717622307,0.8036995781308298,0.5897382291769127,0.23904961527566848,0.9961530457467302,0.7630172916079743,0.9440205620791695,0.83026164994853,0.7362485209681211,0.8676483462203337,0.3933041819209737,0.5001544370080431,0.38536587190365634,0.7367520653829627,0.8350130921618715,0.3080310318126207,0.3445859977143175,0.22057600703669555,0.7127048900961217,0.16944859924422562,0.7920513163827085,0.45580737757069145,0.5765410016970538,0.3645215291842223,0.05142216322493276,0.5818997495729501,0.5045955954643448,0.1620408457966791,0.9136061302279146,0.5288386373842207,0.8142124577997938,0.09635144711433807,0.03859356077869558,0.429381832894534,0.650586238771792,0.6415478490753161,0.7201885429678254,0.48210634666913443,0.6305097754715674,0.6801653092179798,0.8930618227622786,0.7850899957215438,0.8653141539040978,0.38903713220062297,0.3586662366602349,0.7989469947543477,0.19601429119587754,0.40360554049534203,0.17430093109415323,0.6263480805507315,0.2249597384380133,0.1365829543746624,0.5292557343005049,0.12697025137211004,0.5403536212442452,0.3828975426057557,0.6415351738855317,0.2380646930153969,0.9988859989192105,0.055787280508318826,0.17435459466636893,0.9935324611445142,0.2833229311073666,0.9801885290268562,0.43833829157212434,0.1741108793664261,0.07416659729159636,0.3883537670286801,0.30487528419679655,0.3492236241590374,0.9653881902050969,0.8668393999738637,0.5336995401173785,0.6641149596589584,0.7384766248480594,0.765451998152088,0.36861113193012063,0.258716328419075,0.4377817623514304,0.8086053902408683,0.05611159541754507,0.31916633346271395,0.30575030853450613,0.2000681435766618,0.19439773170484909,0.9812543131522995,0.9527604133423426,0.6211470560983072,0.5885657258910106,0.815781677909079,0.8057137091725806,0.2847575429920406,0.7283656700564636,0.4517008998223908,0.20627987733838915,0.18793274705391294,0.9681844919198495,0.30782714495057983,0.818916730553287,0.7470572727585099,0.20662189710201684,0.26916132182226127,0.6060881961448572,0.5470427457278817,0.3407546112754323,0.9506822260818308,0.31608110699971737,0.6644887411404008,0.7173397398173491,0.6252571834508354,0.0998434206562715,0.2964268438799744,0.8095675774974578,0.10739987457781064,0.22990969149702245,0.26316439548734905,0.4251676890090934,0.13102225798078515,0.8545472923815516,0.5205617075215163,0.05633435336819992,0.8083459280106573,0.7589363749387223,0.9132448244264939,0.5691017862851844,0.5932218199513446,0.8153473102617608,0.07268437816144524,0.2933178813929662,0.38065561585116514,0.157315135703346,0.5504616327399772,0.9443402535130201,0.65214588237692,0.08083254757955016,0.1349000965731737,0.5352086644870557,0.69078186320751,0.7398043893513686,0.9886178475894718,0.31807028817620364,0.5811641301537618,0.14051923913522746,0.11643956451794502,0.42564111096790525,0.6105839111847275,0.38501985619726886,0.8249798142452383,0.8341392735778703,0.7330506211354735,0.048743217595930144,0.49006312993385714,0.2164649140185666,0.32129580107129185,0.28491796477945597,0.7563596959769117,0.06051285345342383,0.7378235356355367,0.4727037068310169,0.2150827269394664,0.46471543487706124,0.5304166285464547,0.9306788609599912,0.8832465142644368,0.5231244470398593,0.744062491340368,0.392542547668532,0.16295481356612807,0.7386494161111301,0.311972211171345,0.48702375305337786,0.9882707618291147,0.6088552941851633,0.04298589613906989,0.6651734147514814,0.5919086599755035,0.6649687410941101,0.7704969017426002,0.8553320916722231,0.10910978264892268,0.3871536101732782,0.7130044506028936,0.9434536186792009,0.8793279690676046,0.6210474960352022,0.5831101829958913,0.004222365062444888,0.9645872080024653,0.45511384292570223,0.391335050952341,0.7383223598156297,0.19117339041062342,0.28908304985980515,0.3495990388883643,0.5006657785745381,0.9377752059167475,0.9560674593166119,0.10051889521728885,0.7588645078796274,0.7767642489876978,0.8835452473922112,0.746178905175436,0.5531861612576607,0.17875589515034696,0.2702079177551786,0.0822092674946715,0.7122610848656561,0.30785864770884785,0.4816945289492538,0.33739510201050105,0.023535784692383377,0.9233103792815296,0.9209731001188894,0.134058284745449,0.4761134768365607,0.6263461497025449,0.2974980533098779,0.01634321632562319,0.15718078226840526,0.027816181520892602,0.5405918707297463,0.4402745180164822,0.14362754959982937,0.8479852599780808,0.38447374610135765,0.6334985327621929,0.1616536513826643,0.22555400986056395,0.20728872993861058,0.7696717225988987,0.896719456266343,0.5101049727973068,0.16034358220448564,0.24260531862826484,0.8237630616836198,0.5963847465935828,0.46922243547599574,0.9206068637810285,0.3317887019965964,0.7620221705295382,0.19704580452387832,0.8258458877808637,0.2554517308663915,0.4569013241315658,0.6773606069331213,0.2764209979150034,0.3773996077770667,0.8509558276980189,0.0285690898735127,0.29039188469682164,0.4682022231438887,0.22137578013081072,0.33783787376670005,0.6791864579293492,0.8650246154257546,0.35175805430967366,0.7570565286958202,0.6582833388228846,0.9474988253569454,0.2088948907771233,0.2421347905412945,0.08534170382466666,0.18830945507258834,0.8165904740921106,0.8442898396722032,0.4400675503782465,0.048752628274145504,0.9325708345394437,0.2812518725238695,0.3456365284990752,0.5538448695935738,0.21030011411298188,0.5338974287303435,0.7157309738749817,0.8391016038772976,0.27322522296570684,0.47583434755310394,0.06005750802866072,0.36433887859289205,0.8752402747303054,0.6821078162369032,0.5351879889411097,0.9048008848407028,0.5340435844828477,0.6186920212058487,0.635750723950739,0.278917402738629,0.2719670043202733,0.23755768517081077,0.27558227954786263,0.43074110208339356,0.3941035001753008,0.15840462263622523,0.7101453092302501,0.019347585120733424,0.4192558431663307,0.4960554043498695,0.6865751250528724,0.5583304804065317,0.03659138622787883,0.08416413299680503,0.40593965006736465,0.20060113698529425,0.7593733025622795,0.23899926615906986,0.6003061265647791,0.09764785955935862,0.8618347117913767,0.8872722923384202,0.3904100206077723,0.1817407608616326,0.09749041309551476,0.3778340967337346,0.14560534554314475,0.00028590529186356406,0.3878469749482749,0.5076388849307312,0.4447644225188989,0.15528876672440406,0.5356969567016847,0.3426784734702637,0.7513511957676495,0.7067775752911194,0.6122598754547037,0.47246185779777194,0.6716783133171733,0.34517168930431086,0.2920017194347184,0.585987230065538,0.43795473197607904,0.6496417552113156,0.7825498690655874,0.996795477023481,0.5971755240035908,0.26344020845108584,0.0065178782157775395,0.035717056756884746,0.37897597421795326,0.38542711750653447,0.17943629878606293,0.3315255493570999,0.6996261290580494,0.2958855008478005,0.4193402200570624,0.40434324272538347,0.01543618410809433,0.1000285230810507,0.22999935085588086,0.830361708919495,0.24857464429429355,0.896633854730192,0.5802624733855573,0.9724047347205664,0.26268255031862764,0.16968609698609627,0.3651272791393563,0.9282491060612628,0.6923965307865139,0.2295805446536474,0.42603927710371936,0.6757270782710985,0.5114593262959299,0.4053574800138935,0.8150025685536222,0.8300555123816284,0.43812452617624076,0.08526386917324813,0.630438353548894,0.8909948851266689,0.6109382864427162,0.8730239420305184,0.12400249149324716,0.7596173902831276,0.7875338554269924,0.6455848807306621,0.3960172535144866,0.16995852981992488,0.5876214511172269,0.11518659800083908,0.38271330899578193,0.1509841827674081,0.2366727865555316,0.2783774178021996,0.6822040392819693,0.8569653403060511,0.6997842595802553,0.9330384624623222,0.7093198367721956,0.14329217420732654,0.1358738392215182,0.9858528214679094,0.09406241550155436,0.33267520392344996,0.5736046947999194,0.5185821129803003,0.8867017926582597,0.7094078960735422,0.9670257369669302,0.4641807014022994,0.9043272680747954,0.10690246247780322,0.9598342360645815,0.47060170809804336,0.5535223578874782,0.8618233433481259,0.025911241062305246,0.6172110608251147,0.3761094966468619,0.09679437955815517,0.009833586348355405,0.596488246984979,0.5125072203508529,0.05596889309444286,0.07822142749971661,0.11298728851578366,0.6516923588271981,0.5383198387584667,0.3900023935687129,0.894752783430911,0.8418419723528001,0.7655010215756459,0.48477478979971567,0.8148126100065685,0.25570294781650627,0.17349554526745004,0.6800697300098486,0.10017043656523228,0.15185725907344794,0.8178282438751521,0.25821821276895807,0.32485217036381564,0.9977419769986493,0.9270845171143722,0.002469365536552859,0.6140639552609084,0.7522929226014581,0.5335582514241006,0.9775389560345238,0.7792025347078226,0.5516696967532106,0.9070256037772602,0.6861004831441768,0.5480114452097247,0.699001236487566,0.7210600473715698,0.9568768325495074,0.28063634286324146,0.8295293715866461,0.21287415531037723,0.9966857196527741,0.9414733062694669,0.23717443730206345,0.678860885698318,0.44368963650426685,0.8975870860994519,0.696179874005062,0.31355353497677685,0.515386162457173,0.7387810039794518,0.4576568991119623,0.14913573476512387,0.14158564319836464,0.7150529643237877,0.6790583519080873,0.5180481753740891,0.14887155793221307,0.95239688315314,0.08808438653143669,0.22342179050192024,0.9433437859845648,0.9836142986184355,0.7615179184744729,0.05568241579829114,0.08682845271758421,0.3732886300163556,0.5552424406676295,0.7544405575082103,0.10817188764295049,0.08500656456130318,0.43786438492419966,0.5107419112446272,0.34512140496919996,0.5388145837010085,0.6466801754815268,0.5158087941043503,0.06144624549705657,0.09840215061861368,0.05345410405178819]}

},{}],97:[function(require,module,exports){
module.exports={"expected":[0.023842659598596574,0.00213958228675902,0.017306712898213734,3.1096257357443308e-6,0.0066183365267965125,0.012329270366971014,0.0028599652214716964,0.004580396155212759,0.0005038262705936081,1.0727935948272461e-5,0.02845174003956287,0.00021895149163585884,0.0003566029211484516,2.146073963929861e-6,2.1131795995034249e-16,0.019977142472834622,0.0025294858683853837,1.1781415682399056e-10,0.0029511300643141956,3.489862344486569e-5,0.0033418587800494873,0.0005667071288614835,0.012516948659220926,0.0386632509210549,0.005786303030927519,3.144575272247018e-9,3.431638864193426e-7,0.025509731621725387,0.003401030635092022,0.00013015764147536254,0.007927252123552907,0.00021202604630174364,0.0004863663482177469,0.01576637556993484,0.027579857100209798,0.008419419308228628,0.006314610447855387,0.011079826199587353,0.003433980153581142,4.902818053011784e-66,0.0014469126709112407,0.00038263106305690483,0.03480247997936202,0.00031809918564966287,0.0023495353478738654,0.001491721487746101,3.362613110689127e-28,0.03312004240852108,0.0024637189129381436,0.0011835919666348036,0.0014995730490947425,0.001437965815535221,0.003275323093215554,0.023290135699131933,0.0005031237299452511,0.019672901234781454,0.007897046261621486,0.011212919601869912,0.004816956052111726,0.0013526582005262114,0.03537531943421431,0.006082708710190238,3.5521792076211865e-10,0.014685444864710483,0.02898732667922749,0.0010934429055671564,6.239455469265044e-9,1.295697371399255e-6,0.00647582704309367,7.124625404702733e-7,0.00010021855095822834,0.0032312974684327368,0.008368387399003535,0.05542501176789339,0.04094594168028723,2.3630186211690523e-7,0.0033289591787615943,3.604121466011961e-8,0.0023742196577216743,9.838033681052198e-20,3.0324230117646224e-5,0.34275277256511777,4.303493158103521e-10,0.02623186120166037,0.036357211535499895,0.022080836470589428,0.00021665418992332987,2.7453434519588637e-6,2.0043701077371037e-5,0.005355962019263096,0.010410958688630264,0.08396371227350462,4.904680855865161e-5,1.9895785013413804e-12,0.011075902629507164,0.01626247876195063,0.02703667985356085,0.0009472315027986073,0.01006148320310541,0.013354259179336596,0.0111135403576168,0.00346549836631646,0.009544129669840607,0.00023080545419794442,0.0015543297493562176,1.8704654120536917e-29,0.0537144691402217,7.797462012754324e-15,0.0542855173492797,2.472769320276752e-5,0.0054309394544358345,0.032579282865228966,0.010674836801244092,0.023125216481205097,0.013879216407060736,0.022428507163140866,0.0018649559282439747,0.00200982322495641,0.0070172811288917525,0.0005313492200886907,0.015411467606362193,0.0014519944994129887,0.0018899930337446045,0.02644144871486178,0.010695831509588109,0.015341509738722772,0.005422803659868186,0.00849593654402572,1.5235380942663546e-11,0.006135539688491058,0.004694945938487759,0.006657118748149099,0.04286073628141463,5.8511901749159334e-5,0.0001219283228060076,0.015073566741318378,1.1804242735078552e-5,0.02305484119829094,0.03161292839854716,0.024051630540475905,0.006536280708736641,0.006408064352836748,4.855866792181814e-5,0.0006232750137848028,0.0030445305863961145,9.880188674617677e-7,0.0004548138010988742,1.6506143743272673e-8,5.441964767654038e-9,3.623332282643901e-14,1.325740590568427e-14,0.0015860928518708116,0.0007530827253312135,0.004011249711256866,4.1059849121577683e-11,0.051216109903115745,0.011214895492569111,0.000127798162398821,4.1506139547751215e-8,0.0029223020878127327,0.03950529285814053,0.0276981450379338,0.0003772469998678161,0.003971469135725184,2.9968830377465245e-8,0.005004316505849203,1.685224609370027e-5,0.014943523542812425,0.020743565331436866,0.0018400708462266693,0.00032585171126598426,0.008267307107020625,0.07620569834658834,2.1731137423177658e-5,0.00472380171135252,0.00322492480602861,0.0068264428839045375,0.00851074420001155,0.008629637632324305,0.014364937346792584,1.146225095308555e-6,0.024150790102106634,1.0127584979239048e-14,0.004136711832165826,4.781281740050773e-6,0.0024781689121693693,0.0010152015269430448,0.01853133623744742,0.00852961784957128,0.022227537687396708,6.140565203959384e-115,0.005024951058253591,0.014388669233459111,2.3418101284088983e-16,0.08834511506483987,0.0002852791816950088,0.008374598785026256,0.004205681512467226,0.013970540830390359,0.0022000199686635358,0.0030032751272841486,0.04821461290198452,0.004972844913647506,0.01152802769824234,0.0008394049826139105,0.006857769323091639,0.008170913348075187,0.048264061296532094,1.0473610784939699e-6,4.69590897969173e-16,0.0010396707885230976,0.008187540573094215,0.0008984496906339229,2.9920186927720515e-21,0.002726025506606474,0.0029956675958757793,5.921830087996853e-9,3.672387694936079e-81,0.014434277945534606,0.010080836924483541,2.4516833215514994e-8,0.07756938677093536,0.002909500754568681,0.0286499535136952,0.008118121309577737,0.017840496500212178,2.3035544937431502e-5,0.010942048478933519,0.0012772379968420044,0.017068183285844953,7.1492555318112094e-6,0.03040222716931725,0.005612367650779883,0.0004331976607289158,0.0012603484525509714,0.00014410850240910702,0.0170220532201098,3.694065701986821e-28,0.00133640023235114,0.0023908785229606296,0.0059035149908366075,0.0005987668255669496,0.004271310197991783,1.0739460263028213e-5,0.010625502269000872,0.07326348452670833,2.8217523026743898e-5,0.017661139486348544,0.02204387886692842,8.253346761014898e-6,0.0034160132903231517,0.001134965541028678,0.01331613693759831,0.0020064097976978876,0.001626146472154652,0.0018519815224134193,0.044743457963308496,0.005305910256695927,0.015055772600982764,0.004295645223787325,0.00028250034067871,9.88665036948717e-7,0.0041439586865557486,0.0091945283514933,6.631988758715618e-5,3.485721836400683e-9,0.0009499138134636028,0.0033242403647493596,0.004781748002980344,0.002964947975497706,5.894712877898871e-6,0.0029250585424616016,0.0037801668044140048,0.011991797552031287,4.602833877197777e-20,0.014656551615601235,0.00012302470477937492,0.0011756436062951502,3.1537688924600996e-47,1.5865069486410232e-5,0.011888966808217605,0.00516044631619487,0.02419634773279213,0.0008021948030703275,0.0069747313591599445,0.00021776441355908627,0.000789501251177584,0.00894403952402325,0.026459603042200443,0.00015490435444742189,7.428674080831903e-6,5.04229150844966e-6,1.0455132705841453e-6,0.007298638547146867,0.060928202159623,0.00047705097444710544,0.00418287934356086,0.015085743896441371,6.239990890477016e-5,0.0197276747916516,0.01180705520335171,0.057159329253963734,0.009091523850470002,5.34896625663508e-10,0.0020561961532971746,0.003225527445019369,0.004589664430318333,0.002491818965015336,0.006269916352536556,8.804814954497925e-5,7.328128428741434e-14,1.1472659560476895e-8,0.004979653038016608,0.040596246184886296,0.0035373887874590344,0.07060996415092878,0.006694715183917894,0.0009334115097119717,0.012444620132149899,0.0003858095647322392,0.0005907492465675115,0.010517433510221231,6.903287532540261e-12,5.446107842664112e-5,0.01712038869297331,0.00535225586949887,0.00961821529134933,4.76583528299817e-5,0.03090213406168942,0.0010318332465417714,0.0034329381077349338,0.003982970243057081,0.03402748464581556,0.0044421368279881045,0.023840155319620162,0.009752981160791398,0.0015781032745869924,3.516873407195269e-9,0.0033135516314810364,0.004333994968684828,0.011504592844288782,0.0012408486271816785,0.16177125861312108,0.033063792392180415,0.0005136434941394098,1.0515344479906352e-6,0.002416609797210477,4.655223797181816e-11,0.0023610864801962153,8.386952333721321e-10,7.808067593945132e-6,0.0007877770562770318,1.9629774348395534e-6,0.008874029581648622,0.0007123785958012521,0.02125527188954427,0.0027215571957115285,0.00024398203701291545,0.011130309326058262,0.0020129210135377954,0.004887563316100423,0.013281484043230169,0.0030064933674973883,6.5351969689071755e-19,0.03878040525194527,0.032896270561365355,0.0051352549094541115,0.0002627181736459134,0.055175400563600784,6.661962774230437e-22,8.26595086835174e-6,1.0727749166749053e-49,0.0014082821915174628,0.004233433724364262,1.6064943338273477e-5,0.015754592597226155,0.001811747719125006,3.0985924158130657e-37,0.00015138813813638842,0.004772841423073587,0.008228932022337808,5.457208303579554e-6,0.0007573943318029694,0.004823299061834758,3.467302334253098e-5,0.08512017269615012,3.975156139409815e-7,0.06635444643476937,0.0064588180859937346,0.012332158671209365,0.01905749015287994,0.035301132994192325,0.007032405259822442,0.018145246398578077,0.004996581300251943,0.001974536046309653,0.00032967400485890566,0.03234126086002165,5.457309628006264e-6,0.002168212473953435,0.004691897455444405,0.008118761492376097,0.000500052630115894,4.895686658321744e-16,1.1571988633389078e-7,0.001945044643164594,0.0017803347525472497,0.0006833659679825385,0.03153131479087387,0.014731121635714241,0.012709786934438255,0.05151800406010626,6.24000862530187e-5,8.104447340683239e-8,0.0019757115732665907,0.037006577920909854,0.0027837925121940105,7.089947729088091e-28,0.004823958949337262,0.0003232920404725123,7.936032597332442e-5,0.004264415828627742,0.005297713306556045,0.012805377359502754,0.00048055659293208883,0.016699839232961113,1.2336185379192048e-6,0.003227278722831962,6.165039069985417e-8,0.6053799860423168,0.0022070198640436237,0.0001366002896155731,9.464158673504075e-5,0.01794744542335402,0.0025780223173699213,0.0074887966455403215,0.0059822516321951565,0.01649766484652284,0.04187819209534815,2.8480763215818975e-6,2.511502320080713e-9,1.9913920280386178e-7,0.018598781556460033,0.0013217672459936106,0.0003049604510995801,0.0022749753467975788,3.63921701181184e-12,0.0032106415791580602,3.3916937613582536e-8,0.0010622203638714287,0.002046978438646003,0.00446020980611853,8.278862930221512e-6,0.008681317680068525,0.00014723298425655277,0.0005847383656337966,0.0005146825995897587,0.0027831339996683877,0.0038970342207189246,0.0164911940382641,0.01206868517968726,1.2836852354828854e-6,7.800357347091206e-7,0.02500741020780941,0.013262199553309918,0.01642893981342485,0.006323262769359765,3.0156199940491985e-9,1.4548150163526913e-9,0.022433500620222913,0.0007967111928785416,1.008728485897357e-27,0.0033739331119066874,2.8917320335699504e-12,0.012392941264591666,0.0066613412299057675,0.013022995888920957,0.002062214928641071,0.00206474045049597,0.0025767257625854377,1.4687325484116794e-5,1.5305152334376003e-50,0.0001767149278979122,0.08213907979846806,0.013458692713698964,0.008765882501172188,8.733703653619555e-10,0.00014735631260194679,0.08651466509633629,9.87594537660603e-10,0.030215839097191142,0.0013509872084331081,0.0006305706696439728,7.925571557211024e-21,0.0007516763229933051,5.804291469052564e-7,0.004099230958966823,3.677889375503437e-13,1.7703852033145796e-5,0.080330794488381,0.075653827024869,0.00855905100693951,1.1836658867138183e-33,6.209563901403862e-7,4.360810255189864e-9,0.0015047249997093611,3.5198087391528143e-29,1.1973770466928021e-6,0.0017709108782856878,0.01741602551661757,0.005341993739151407,0.00402216338610024,0.011852554430073567,0.010832333271113968,2.985997649780253e-6,0.002204992464315024,5.280952186348745e-7,0.011156757402453102,0.04819571597674705,0.0032359232814538562,0.009127423337786782,0.06992559752453906,0.004586782410425656,0.0006159002550729368,0.004294101191751463,0.007342499153837699,0.013497202013763948,0.023379089189007964,0.0558218759107789,3.303331821202543e-10,0.00940365904918652,0.01263856605731587,0.0010066049322359784,0.0012545415351201503,4.5559359016769874e-5,0.0022751164946512733,0.008238424742607215,1.9329276949156775e-5,0.0048376016178965815,0.00011901707361026098,0.0005380847593325262,6.635891945288489e-6,0.025292094614973917,2.7710325501469207e-5,2.31003843321504e-5,0.03790071805706846,0.00701524631207125,3.258318465144497e-15,0.0009898269817403308,0.010133288160269382,0.00923020566160291,0.0021543315713696224,0.013662989726743737,0.006663456994599998,4.126647161572097e-8,0.021328699108664202,9.015219660668374e-26,0.022451010684436307,0.005160720554409798,0.013385338331086745,0.0006366529323241501,0.014607761052281776,1.6705769792947734e-6,0.010090968280002685,6.3516248735857575e-43,0.013288268904383465,0.021374842258759092,0.08725541445466352,7.132771767740371e-5,0.012517438353343352,0.0061658948406280506,0.0625064749512362,0.00021057916169345053,0.008446986409036943,0.003309649806818101,0.008829736032497993,0.00011288929666594465,0.017500031437722385,0.0052700332887135075,0.04040241322774791,0.004649867988871874,0.04126253910791379,0.025222241893898358,1.1354224166866684e-14,2.9624716542495295e-8,0.00814343360772943,0.003184654317256016,0.03047472173488717,0.031206122257888515,2.315862700310114e-9,0.005277355459754137,0.006756921587293886,0.018717390229339513,0.008342826066925754,0.020266293489436673,0.0015490972143176829,0.0017056027080415074,0.00016775438472562017,9.894682509902118e-7,0.010276608774236383,0.11427343183300374,0.02519066262976904,7.287549139224418e-9,0.00014859898459431713,0.04132797052906754,0.023300122619885354,0.014301575171638483,0.013654086086755106,0.0002472131325705181,0.0008962806203142974,8.669434140356879e-7,0.04413403709533824,0.00011623852648144378,5.783447583129915e-5,0.018591571334904463,0.01743678585293096,0.005175658425082566,0.0003132891319567518,0.00012026574983568519,3.5047264523477116e-5,0.007538512474012803,0.001159678777890572,0.001907188791444142,0.016694995343256504,0.004164518994861823,0.01757168613314126,0.040230731949036265,6.548712126859228e-95,0.00028516451556628256,0.00031517899537794966,0.016360501993152764,4.988495308389429e-6,1.8406894461741022e-6,0.016889773859171172,0.0005730690102973086,0.00047984800943018006,0.005659077705270727,0.000473109063116694,0.00595083222422151,3.212691810406528e-7,0.01382713536246748,0.002727721360917981,0.00037844332158868256,5.136538821870871e-140,0.0001127688186905873,0.0033083461864937182,0.05568979147012888,0.0016802251266900582,3.8577830126645036e-5,0.01964156698285986,0.005159976694236205,0.08243286261072653,0.007922329349609552,4.369908649581126e-6,0.007723927164745255,0.0005184989237063797,0.0022616697812456385,0.03351883792234546,0.03102682511743056,0.0003659336480127048,1.9060825187852072e-14,0.06112620690229515,0.001086257659894798,4.095036955090091e-6,0.024629222826739634,1.759859159405674e-8,1.780948216046369e-5,0.0001764055341904033,0.019232758460671275,0.04159470036291287,0.12600764767247633,0.0029826985913163333,0.04854694170984973,8.655643500227693e-15,0.019403364783084978,0.005440524166770349,0.013069193080072728,0.002976489889244121,0.022726571196253223,0.00015601956083829887,0.012564519658859984,0.01139166878634282,0.0020805890600496873,0.030970869794353866,0.052230119136757854,0.019313786926247686,2.4655507318491935e-21,0.045384616364357595,0.02573337640213529,0.011324692431635976,0.0002054238128958388,0.03499712589509375,0.020247491058750917,0.0001974442860815916,0.0004909851278089635,1.9595348312924124e-10,0.0018698382484992932,0.027344322145988965,0.01017353196288092,0.010198740792770312,0.013240161464462082,0.004203532416649848,0.021362695506598552,0.0027203946505735426,1.9994335245755425e-19,0.07298362370187969,0.001555188151439892,0.0028248505757446,7.422734133845456e-210,0.0007408891059961809,0.03827073680032973,0.005894845919626565,0.013015770138531307,8.96327392723016e-5,0.003520389640087018,0.03586638744242692,0.0017053107033937532,0.023896891991538407,0.01724230187530421,0.0004929924460619291,6.533909101692519e-7,0.0012628005411034115,0.000874350705506224,6.074470349844236e-5,1.7657932161422205e-8,0.008612603568687226,2.783484668252243e-22,0.06751298645898628,0.012103066413529508,9.178816255448126e-36,0.002243897943865537,0.0019341628614285352,0.04993069588368317,0.014855872761844078,0.016455999262378902,0.009567729260028008,0.0002799368656713559,8.2414552906266e-5,0.005462007481116626,0.0004276466681194516,0.004831822447802251,6.634553110525631e-5,8.548797145156442e-9,0.0017010625154349564,0.040674006256025054,0.10016343214733894,0.0003856517440223587,1.7208696387129144e-5,3.883757139100451e-8,0.007006777600776141,3.60194826905612e-18,0.005990676530837853,0.005474402584469736,1.773191223561755e-39,0.01764218668309733,0.003457554309958816,0.0036070488987351807,0.0050260527388478185,0.000268523757241967,0.004980657208934807,0.004467858496364707,0.019021038646451875,0.059465697594386774,0.011337628775927776,0.07321154176839012,0.0001907085652038769,0.006952984620405779,0.008373722853469956,0.000301470010163006,0.043288683439308806,3.1207586368244797e-9,0.00028873407249799786,0.000201106051107536,0.0002749368241245169,0.08956654890248228,0.0008093472455550972,0.0001497252778900875,0.000571249299616084,0.04147558103697124,0.0005420546208184523,0.007166044880826262,0.03632543553888561,0.01654459186880873,0.015263777511101776,5.04507430102785e-5,3.590967126949183e-6,0.0001232786542980825,0.006098876925761039,0.006759444215979302,0.008190007101204825,2.934342700675342e-37,0.004865047885485452,0.013411383080081852,0.01048953417273182,1.8470098263939287e-15,0.019434776348645207,0.011034003995754034,2.4228695701373918e-6,0.0001521116580431247,0.0043392180354560345,0.00724314966601749,0.007710364455206058,0.005600387673796985,0.00815565197861097,1.8802145748812052e-15,0.0005676890664348845,5.775020495656487e-10,0.0036970951927251207,0.004902890892861518,7.5442776920843135e-6,0.003229874241637054,0.01868142720682397,0.0021975146556311043,0.0014604762995170772,2.7274651875000547e-10,0.005597845923150053,0.03742332101356918,0.016800938485251597,0.00010243997336602176,0.010579515400027106,0.02635883818178146,0.005004603932520558,0.009663582203636474,0.03727622680978868,0.0006700254759999587,0.004214643822149084,0.012795785606309368,0.03026946800512006,0.008953990856475883,0.0,0.0016932052861122445,8.792364759529616e-10,1.3104292733699562e-6,0.004212810786067568,0.003882938743534291,0.006434301755172949,0.00723440764359774,0.01373937260400468,0.0035585492666634472,0.004315709802766506,0.021628953830125242,0.010488673797718014,2.049465392227349e-5,0.0019391508261752128,2.647723447139933e-5,0.0029794554104278807,1.291139726815298e-9,9.862273966447697e-135,0.0002955126848142749,0.0013472924165213276,0.004501758057087622,0.0038651098222050847,0.004268309478441183,1.400926591331603e-10,0.022373640987958462,0.0013745695418268256,0.0010622406389450927,0.034056112800276185,0.034329289765843714,6.70061250789246e-5,0.0016596251780977309,1.0551675854334947e-62,0.038603150971652275,0.005363835183329667,0.019757410918838335,0.007035998793387905,0.010505817623525286,2.480715195261987e-6,0.012814567037809234,2.8471790538310056e-15,0.018845818531746078,5.514887658557687e-10,0.013596217575180399,0.0004535985874073171,0.016577626230703392,2.199546980234271e-115,1.8182114117958084e-23,3.629639244642478e-22,0.001510798892868273,0.0,0.010618996572347215,6.165440261946044e-65,2.883503883691029e-5,2.8824727784483796e-105,0.00048791672774372056,0.0023418642106118152,0.000116467227342687,0.001970309969562126,0.006268447701339196,1.3469426786425215e-10,0.0022238617161674076,0.008086954673931234,0.0027569254867216898,0.006196250802871586,0.03838532619701579,0.01257408327372894,0.001599106844481802,0.005652618707941887,0.02253077892730854,0.0034608746624023683,3.214264078738804e-8,0.00046853640912059567,0.016965545553513643,0.005578651519941844,2.68845616071057e-7,0.015299628766170357,3.841364028297592e-6,0.027612779590049888,0.04204517088922155,5.61499540837717e-9,1.207688203689252e-5,0.011573819188359143,0.01311220970040641,0.003619055176127415,0.0028322139779246853,5.270287382812751e-11,0.007959121787919394,0.001498515640068047,0.004071681994920785,0.007704873382201329,0.0006174268884654522,3.3867785705893455e-6,0.0029431958750542656,0.007067787000235155,0.010259921109417026,2.8715874696195127e-9,0.01743613948219267,0.03574345382343265,4.726490576276974e-9,0.021698874748388254,2.3891609437489452e-17,0.002261449075272549,0.022012028360221085,0.0017516919822331322,0.003886417161844928,0.014777198568884382,2.4032066378134288e-5,0.010594211588646311,0.018809764297181123,0.01084364148867846,0.00364206355450989,0.0007550126587621711,0.013127211572215195,0.001605397568893122,0.04333406557733082,0.013351851001276694,0.032552393451482246,0.002421048095279629,3.711068094517412e-5,0.022357120495162988,0.011734073326987683,1.4217022958380874e-14,0.011877377427250334,0.0004488916819268546,3.627007858597016e-12,8.814431282900981e-7,2.8176387867278696e-5,0.0019464350797125506,2.3502442219485144e-5,0.1142473764020216,0.07304427761144953,0.08647915543177258,1.4909524713571164e-31,0.004724551301713621,0.010088515143237843,0.05309119573873211,2.725216840844215e-7,1.354204035055679e-6,0.033345615425875524,0.007505228059513294,0.0026361090289743075,0.0010057938471007125,0.003091229947809795,0.0018041939965086709,3.4968266453034107e-6,0.05634742947389785,3.6306512090072286e-5,0.03294227929720885,6.112065484384399e-6,0.00041909244348738986,0.0030801056933042947,0.030488761094637766,0.01276097245213019,0.010584031212369357,0.0050236043193355685,3.639519387606986e-7,0.0053621073751833025,0.005765710307807996,0.05103700703190789,2.8189640203688928e-27,4.1937703981459745e-9,0.001504555138165677,0.02530604100064684,0.021411431465872842,0.007124615067285192,0.00019885312919626336,0.05764125308783102,0.027559089621281892,0.0055784968883617145,0.0006429851912128308],"x":[-12.747801341680303,-18.104380912216552,-14.693639402679807,-18.321110770578287,-15.563410411261415,-14.33813326471517,-16.89121890552348,-16.209379687182157,-17.049647166100893,-19.948972120705207,-14.679336785088681,-13.729336707151006,-14.705121957459221,-18.006185901438343,-16.67367414163379,-15.194143318739176,-18.56925128244438,-11.647209107984978,-16.83018507960869,-19.640062881884983,-17.893010891996223,-15.623502865320173,-10.971943433202087,-12.592714358718368,-19.878584150514726,-18.721226487888615,-17.32525183554989,-12.242012534527568,-18.19313438880409,-16.04267303533351,-15.640201711392159,-14.769470183779799,-16.969786052905977,-14.752637213683805,-15.572101921041996,-19.558529416109113,-14.961253099608054,-19.984309666080918,-12.623080635290513,-16.099777755801515,-12.827271886733547,-12.921830961259179,-11.68086218169465,-17.12051382712467,-15.767611933604897,-14.39651539140291,-14.443311078350456,-15.321926627048475,-13.968568624514097,-14.31090497594968,-18.455805822038222,-18.784174750641895,-12.248947841407814,-11.197403694688004,-18.843694081565335,-12.722325292116256,-18.674622913183637,-12.378588954430727,-17.44231554557715,-15.254178222232223,-12.453183558367687,-11.39673135059007,-14.014031639633757,-12.037558724763187,-11.071531013664138,-12.833259668148214,-11.65892647886389,-18.950608455056994,-18.589980135744973,-14.459714202205943,-16.986051763893457,-16.03003181275603,-19.93944389587881,-11.772371310800269,-11.402081312147107,-13.743421441903704,-14.796230690311434,-19.057957564083257,-12.583920201774145,-15.208530836178715,-12.343526327949686,-10.361222929596849,-11.53758092846656,-13.968935684730539,-13.465315157682207,-12.15312392452441,-18.735533223473787,-15.882904673539947,-11.335965838903395,-11.906363085769003,-13.179717521373904,-10.684105416985721,-18.37245628404507,-17.860106022578435,-12.97825263812248,-14.504695956837905,-12.953040593102399,-14.254990146873109,-15.371068867531717,-12.553157760361508,-11.912919929727174,-19.026633873400417,-12.260158540329167,-19.666212487338864,-15.0775301605244,-17.98888365945396,-10.14945891533237,-12.406801491781255,-11.036831168835867,-19.394163128845822,-14.968414803220533,-12.117735624087388,-16.12748564484115,-13.77867198245648,-16.060805608836567,-15.414832768186272,-13.913705336316015,-14.887305346971658,-14.536743810873347,-19.352100692269715,-13.095304899972515,-19.808918029018322,-13.571035054608409,-16.07950834315726,-15.771290825185744,-11.718917576524479,-11.85984750230318,-13.395641777500757,-15.816631446374586,-15.165930777777408,-17.945972324703625,-15.311714767325684,-13.9492729757112,-19.523718630344185,-18.532091465732137,-16.68898187733731,-12.956021885389672,-13.986075428260081,-12.107025136964184,-12.83732516369536,-13.401132725322695,-14.586737116946098,-18.50999451406722,-12.411223337953817,-18.263444664850674,-18.991447684589996,-19.185673110878312,-15.320703907719587,-13.259432061826535,-16.53683749215609,-17.94440770015678,-16.82297926140745,-19.898769368468987,-16.729574458521775,-17.822337245677726,-11.422019183800385,-10.375355871601585,-18.73126567747996,-18.45755846182427,-16.699077930858756,-11.387460157633619,-14.878109552403703,-17.996467421285736,-12.382719139713494,-14.851297211432385,-10.74840366261757,-13.702105933012698,-18.682255680171693,-11.074671574640547,-12.476577277731,-12.992670805392851,-16.00901283121469,-10.353706606271897,-16.963525873290806,-18.200731410990926,-18.058107370723317,-10.548444976709515,-12.919034132695423,-14.997715179720723,-11.85278210360494,-17.22364998672552,-10.359636049669128,-17.775664356882576,-13.613660899404147,-15.506779039486137,-19.262774500434034,-18.882424169361535,-13.651956947276151,-13.541963365243827,-10.97551652263052,-14.537373174428645,-14.108973680598911,-12.458307581867246,-15.63899002338358,-11.757757438918116,-11.7578538832953,-14.372972467656894,-16.23161738722574,-10.541233916293892,-17.58291421869468,-18.523216153922696,-10.611499263271122,-15.133238960051646,-16.97821859415024,-15.190782578279975,-17.655859421462807,-10.80958341548667,-12.808714970998764,-18.0884756496877,-18.527955952475228,-18.875158970424177,-14.086636357683702,-17.27703668979897,-10.251025916753758,-19.671912106977643,-18.73697125781312,-19.74028980538985,-19.336567958560856,-10.944493078296848,-14.794989187510705,-17.771090433529537,-11.416698432783924,-18.471798492439945,-12.183044681162567,-14.653980241166582,-17.440813103029356,-18.772493752327858,-13.771945089189694,-12.578000921694395,-14.427010585642062,-19.761507797371713,-14.481711400509287,-11.98901134392491,-13.77640352091679,-19.128186676788694,-19.81001660078991,-15.393470258069202,-16.672527447963237,-18.959263463331432,-15.200981156212318,-18.943121750060254,-11.557227846465533,-13.507003612951138,-17.268420077131307,-14.239260797700421,-12.018630148855063,-14.170533917089212,-11.89667613662067,-15.00902982850523,-19.293562042416216,-18.92581453372953,-11.943626415567616,-14.463936393855956,-18.903501647776366,-15.274300928184099,-13.878501577493612,-11.690416371006565,-14.211599995635261,-16.43509346471113,-19.95347510184591,-11.472994848391814,-16.7544729206341,-18.79337747605506,-15.604274171277705,-19.834313761208403,-15.898118070677894,-19.167076910843086,-14.403866269578733,-10.102204177848023,-17.435381401673077,-16.181612140398286,-14.991293296152179,-11.115154615858913,-16.29094651110541,-12.916500033033284,-11.56948908325563,-16.69306906254605,-15.683980339695811,-14.098393783999663,-13.508469907251543,-14.502936581101642,-12.055993007156328,-11.633485246564952,-11.440985586456476,-16.175840560901197,-19.741373429180214,-16.828115656166972,-14.043643040904621,-11.244659306914496,-18.842783611801714,-11.886367850578939,-11.225312086014249,-11.003890677532498,-12.76183861816326,-10.7620380601756,-14.159238240657698,-17.810194211402933,-10.675729869654344,-16.205124791529915,-10.338985079063894,-18.598081666651616,-10.663988992745256,-19.031866745281526,-18.849166775458844,-15.52639201656181,-15.93683599782316,-19.57775984599726,-19.899698155340403,-18.92489076048912,-17.292349437169484,-12.386715182051173,-11.641693791319923,-11.189718373749022,-11.617153550615747,-14.02370470175735,-10.72387746550352,-11.435611251056104,-15.746987236747529,-14.456863607040106,-19.997612387812076,-18.20449808065504,-13.462821032811775,-15.383192258070233,-17.402531361656642,-14.446793417440961,-12.594659107845164,-11.465649892650344,-19.790143044443724,-14.4096296835928,-19.44423789749341,-18.548768200185307,-15.83415000259977,-14.629865607321562,-18.280987762636897,-14.784610769918686,-11.013636956205557,-15.43952074765354,-14.534040261964314,-15.27197155649188,-16.68546272185518,-13.868352437625415,-15.347006923727006,-10.87882095759786,-13.993656458087965,-13.507533306759736,-11.919431480349907,-17.20056363389477,-18.20777821136693,-14.715070620863255,-19.636272577432862,-16.396768949972763,-10.936520127966125,-15.422167879087105,-11.605838702886189,-10.292255640217991,-13.501823655738637,-14.52518466351031,-14.573154288875592,-16.670564035908445,-13.613811810698504,-10.767620185156531,-15.047442303713815,-18.79371958245621,-17.040704063064464,-11.165879541305848,-11.456622312869778,-17.207773101901704,-12.179106296945504,-12.839391534475318,-14.619785460330842,-11.39848433267474,-11.402338171500816,-19.753214285098764,-18.690525904119,-19.324178709367985,-12.722382689562801,-18.52565373940141,-11.193885411630458,-10.340547681084367,-11.101416666368722,-10.394987184192725,-13.893114746438895,-18.701048680025913,-13.859282801206469,-18.32817268775385,-11.014319794622079,-15.890552801651056,-10.091078482120938,-17.548660076127184,-15.297366564908476,-12.221744972138907,-10.98777980796395,-18.810655437389695,-15.629932052305097,-17.77410073919151,-19.038527089198055,-10.873648364320088,-14.363622512673192,-18.81094282811963,-15.347023750815506,-16.903371025998137,-19.25309990881821,-10.460181403112166,-19.631135645818066,-16.704974870967174,-12.7577029666489,-18.88195387042588,-19.843637352404755,-15.442955976058702,-15.897391590335443,-11.203142871442937,-13.532721687804393,-18.28083327806733,-10.840345150605703,-19.168784198698173,-10.844057903056097,-18.313400239362092,-19.146985422073975,-18.760681232897806,-14.361560052194305,-19.31818515786009,-15.602606452247759,-18.310273998992027,-16.165908399163627,-17.488351673162924,-15.715743560739192,-18.256937780660216,-19.243445815087306,-10.164791690064375,-10.010359938870987,-14.148497157590388,-14.750047327886008,-12.561659483786816,-15.917453729388535,-12.300780224408967,-15.416045215095572,-12.055808409326556,-15.19980462893903,-10.389937766038216,-18.805829543526606,-15.32667590344537,-19.75257940090358,-16.517366544708356,-17.918333376392724,-14.489684737387654,-18.140369644906784,-18.473927391509054,-17.37129516147241,-19.86708375180628,-15.013494236751939,-17.342222863801943,-14.586147647648598,-15.292883753926205,-19.087311588829486,-16.696672429653834,-19.24373125047215,-19.547936162408398,-12.217724230707912,-17.376893859511714,-12.222782524234216,-15.596876802021391,-13.894257433244096,-18.838543567562375,-14.870264865111718,-17.920309646343643,-13.393819909167707,-13.828920212004725,-19.392860904675523,-11.863697186428032,-13.284942371947297,-18.10990417817714,-12.408144234477218,-14.282451072468213,-18.06978665611942,-18.610713784593404,-16.964578967541986,-13.0408394547694,-15.694561988056773,-18.140812179193485,-17.211466072589673,-18.186344274430386,-13.704511228906082,-18.153743716093796,-10.652181115783579,-13.880949941647769,-18.133849881775998,-16.280641215887215,-16.725518126229723,-11.155086281113796,-14.259484511153083,-11.871914605129714,-16.540345871506258,-17.51036947151808,-13.66692170479935,-14.718980126241778,-13.071652649554466,-18.321619860692405,-17.262603819737162,-15.68198546623982,-11.927763418249723,-11.419426132571646,-11.669581786418801,-13.78519066636568,-12.139395912436905,-16.824260579293334,-10.87959996275331,-14.446492909263966,-19.782656771714365,-17.54579987649552,-12.734970274613303,-10.477813643561591,-15.085676478789365,-11.110194473611452,-15.562193254971353,-16.81099071365253,-15.693846266726856,-17.376782934709176,-12.971941183741546,-10.655621948792742,-18.979059560943323,-17.170456916202703,-11.902288534484152,-12.529191571575968,-19.044002018466514,-18.000898855547614,-12.721625563711832,-11.946561239528457,-10.288011695571015,-10.627691416030702,-16.91250606113535,-18.50736391183154,-10.455646811470213,-18.236010741928016,-19.43606533858953,-12.761555326088006,-15.236022424457614,-12.893629208039687,-14.146354934522185,-17.659968434225192,-13.264063759765119,-12.71498538652358,-17.74251235106193,-11.305788537957168,-19.06892349640513,-17.553322515531928,-12.93582653400797,-14.29187642057471,-19.193493826858898,-16.782153127976528,-12.053030600089619,-12.582932165640567,-15.118343092479645,-17.236722796491627,-19.76364666204693,-18.308205279669124,-13.415314184816765,-19.85751740870394,-15.519314815613921,-12.169313199312308,-16.373161080427323,-10.851430578622585,-11.25348137579115,-18.92332435592554,-18.504771023875527,-19.737362161412978,-17.712245128233008,-11.217364213696715,-10.404410691314428,-12.328628952875647,-15.068177972219104,-19.23772484011056,-10.622586808945906,-14.31375934049634,-13.34436621104021,-10.427223168717186,-15.380041879286427,-15.713993561921672,-12.53385616294138,-14.445947168390823,-13.833435444394498,-15.075849898138895,-12.34479318748881,-11.858046294992226,-14.577900274470299,-16.561249320442126,-19.08472340924097,-15.232232100562005,-12.234670721634352,-10.465826538962784,-18.72153318920124,-15.772380129832397,-17.737914221809937,-17.787365004715223,-14.962919106623856,-15.40688332283274,-14.41158436359764,-17.745509571853255,-16.849427664264695,-16.38331552820171,-10.441991085375752,-10.295107437200075,-11.800638405994427,-15.240852894383814,-15.490915166957791,-12.327132899407928,-15.165059722769278,-11.241950461991003,-14.086141184068072,-17.242608574604578,-19.954700362394306,-10.660269914404223,-11.35180890294599,-16.1811970051785,-13.601356541034315,-14.046973778580224,-11.06375778495698,-19.58089384936265,-14.245013685463165,-17.461124399241005,-15.525142969327463,-17.99443105623793,-17.490266962787395,-11.899794215551914,-16.55965687852564,-17.85970995953797,-10.259648169332092,-13.56654718133572,-15.404211563342615,-14.321049624591689,-12.996214745713354,-14.30268781804201,-16.5112550091174,-15.23160071724062,-13.44231347063319,-17.345804385736052,-14.426922219968148,-10.108835528722889,-19.854612182967287,-12.511701452010257,-19.537663437065845,-11.132549273705559,-15.994082154350583,-15.915242125382283,-13.392561330522714,-16.575667484171035,-16.675168292409655,-12.261906566289456,-11.267018070177992,-17.697054874858477,-10.203581482116553,-14.778329893540407,-10.16137125210424,-15.694836617732426,-18.292829911868292,-17.56708284212371,-17.62783698313981,-10.08956653448012,-11.049334147779714,-12.051404915764595,-18.84948818646999,-12.694501355387498,-10.750209374438434,-17.7805079684912,-18.38170057183872,-10.877321787131773,-17.736884955428003,-18.43136848492264,-17.125755523007815,-14.268664579002191,-11.73901371413049,-10.036968925451944,-16.66695131610291,-12.12007241667208,-18.00486036698031,-15.706539336857912,-19.00623001642758,-17.05825938766704,-16.06431645723608,-12.002141690865052,-18.08344373280045,-19.04025537597803,-17.575686565206674,-14.471421069863338,-10.622854416894434,-11.432803535511376,-17.479242628932138,-12.653124346127385,-12.166235921995643,-15.42024645060853,-14.88161794215361,-17.857253458348374,-10.540636596530895,-12.40339441011204,-19.95524899784906,-13.36161493656098,-18.85141832032126,-14.296953529908354,-13.83619851422621,-15.105759185162356,-19.14148796993082,-13.535979939876563,-15.213776462038517,-14.358942973046583,-14.563128159855918,-16.972546253690336,-11.842175544528288,-16.62016944677997,-16.15944363019342,-11.13024271656432,-10.485228342363822,-13.204140009805919,-18.092671020068916,-15.912887688598987,-19.817717889140546,-19.34160586366472,-10.57922517202474,-17.123097396903532,-10.904661635341322,-11.079432345209806,-14.752069064773536,-18.27115034527013,-17.78142639178482,-14.79306235347379,-17.671914043691153,-10.2705482287578,-10.887780765109937,-19.861965708259525,-12.417957170355542,-16.93150262189426,-19.986561389497354,-16.82698601735141,-14.65710322122879,-10.959386837311962,-14.05755932471029,-13.637328919484888,-13.8578590019409,-19.883841869319625,-19.379151461362067,-19.732652294979918,-14.0684805164349,-18.213480863385588,-16.4132073054973,-11.168437780433768,-15.439520901064476,-14.421924276911827,-11.005899578256003,-18.46539840488587,-14.102523289111215,-19.282385044976515,-13.82288898773531,-15.80393079130193,-15.84440816035256,-19.37246099581546,-18.14713574477488,-16.720352715186984,-18.35119735252833,-19.201598869651164,-15.23060768153851,-19.711312733088544,-12.069662783136936,-12.19543483201732,-13.15551072903177,-12.503529377697626,-10.759452212845911,-10.908647939653646,-18.02603025429069,-14.424459910200085,-14.061494240452042,-15.56599005031633,-12.149790289755094,-19.276036233394482,-19.87076266706705,-18.55012954821056,-10.500740006819926,-10.69226568971313,-12.962390658394636,-14.688427638651335,-17.21976885478031,-13.03760943096744,-14.785093946870322,-19.369964064888833,-12.683017258891816,-18.247525282392974,-17.890152562284353,-16.750647950761262,-16.04667658757881,-18.992494513867907,-10.660611870546575,-16.10301681096663,-17.598045649071658,-17.19466496752907,-16.011849956260896,-13.820893210331867,-13.701771023798965,-18.704076282895812,-10.238139235305681,-11.356402655241025,-10.932746107008684,-19.208234286354433,-15.59998975294884,-12.745177549152478,-12.345751489622426,-13.698516904907887,-17.702651701601336,-18.287828159224762,-16.033853488356883,-16.19573630550835,-14.395570993920849,-10.544033507698977,-16.997047243536272,-16.5718073280523,-10.440806525868435,-17.413398517373018,-19.855543814725806,-17.21884765148481,-12.454596768449601,-10.485367442298944,-16.12839768886267,-18.92717103778995,-10.743886279607404,-15.130918952642645,-14.792291295157495,-11.181544072084314,-12.524956685177258,-13.558776503209703,-15.057261453716805,-13.717752697337424,-11.727229822585203,-10.366450983482004,-16.131506886510643,-16.12061635140218,-14.25194322306542,-16.528669702134742,-15.361799451284206,-15.940361698688854,-18.238171516888734,-15.971407188997908,-19.4405538357866,-10.403013102510254,-14.889722574807752,-11.446483480689649,-10.435831831829317,-19.76797699712673,-15.138066953292329,-19.333935906744028,-18.11025112504,-11.413393292697542,-13.907908557547923,-14.02437822942041,-17.452454472871185,-18.152232356574753,-17.33451196600044,-13.079493260707824,-15.104792173578488,-12.946752183683188,-12.912247289533859,-17.188022878359966,-12.734684924238032,-14.066617037145102,-19.791449559068276,-15.065067622234181,-17.37959684439865,-11.901118919654598,-13.645282219572941,-13.946703011232183,-11.323073407760742,-11.063456298303468,-15.063795454039733,-10.7860304528514,-19.737124241220492,-15.733449015365075,-16.069748087652385,-16.49073151693522,-19.506194548300794,-13.495170968290555,-17.51739366451264,-12.143766952435795,-14.508996060620783,-15.28094943005284,-12.443714506248805,-12.226992785434984,-11.596444227757301,-18.369325189516687,-16.87649665692947,-17.470554411987308,-15.75926187984319,-18.681688904157838,-15.022686583249039,-18.290083674293452,-13.675586748219873,-18.505866841688782,-17.13794804793436,-17.24044436154536,-14.12661900774156,-11.564817973832524,-14.279355111533551,-19.02208538533626,-18.585722541758653,-12.617852004963957,-16.63145175978186,-18.571583404265404,-15.73150209602299,-10.02183560226106,-17.06054113183197,-18.626401879581643,-16.904708004058133,-10.121940050220012,-10.63101041863165,-13.403801640732649,-17.042666316282013,-19.03517112509177,-18.036803804638573,-14.599631332024838,-11.578539672124187,-15.365703688447214,-18.324503181837084,-12.274859928767478,-15.006384997617356,-15.530023029785783,-17.029291518259193,-18.64157041795562,-17.905764748348567,-15.954495568000944,-17.450295175755073,-15.121382528692099,-19.407112705683076,-12.023642922546378,-12.23215381599507,-11.699026668580103,-10.62405684228217,-18.307770399322354,-12.776956783722923,-10.042987510659495,-10.874881293294843,-18.035306731472506,-12.562381178635691,-12.997265661368658,-16.757363855357326,-16.83007137240754,-12.735026879399578,-18.721735861567247,-19.97680522496204,-14.323533630478018,-10.173978998650332,-12.701161718778993,-12.75765415976471,-14.201224056046284,-16.774860064055456,-14.878902339294697,-12.38889994569018,-10.232607396929922,-14.015305081894923,-11.628584363658799,-11.336255403430755,-19.559093690105602,-18.941556939739954,-16.398095912594428,-18.327795728218373,-18.231298022247028,-10.36541421965614,-10.029462152352933,-10.115660635157155,-19.48980186855929,-16.63624879477903,-16.2065026738127,-12.886573545421777,-19.64475996823785,-18.29005459431702,-12.82140562224955,-10.990664183672722,-19.47035844711855,-14.198519792225937,-19.24601824136867,-11.443441981204739,-12.36311031726709,-12.873455569132934,-10.860046030237324,-10.061252906556774,-16.459016945856135,-18.61873626106691,-17.080339984525384,-14.789402754001769,-13.864797432231633,-19.308318173323254,-15.579067122935227,-14.983581740555982,-12.273062124478344,-11.929607110371458,-10.959728372188177,-15.772256393301944,-19.74542219770307,-17.522981390564055,-12.82298380601464,-12.34210079003379,-13.890170613037863,-16.71647959450064,-10.436847011091285,-11.769087658455417,-17.036606191530673,-15.478951788184556],"b":[1.5565989428587435,3.618294836430198,3.3821054427773314,1.4214827676270814,2.274261355621948,4.384302209304539,4.1304099595805255,4.626363580727712,1.7419883014378157,1.726241827361027,3.1192011804371136,0.6285320207843104,1.6492374789847608,1.3252359334817099,0.3631078408648236,2.511782887438673,2.784202775092026,0.44787085835187534,2.8368078762142392,1.8205234128904912,4.677942176324362,1.5234584805406926,4.808052853130635,4.018993342271743,3.8784064324843035,0.6816006619703452,1.134667941121803,3.7859910500899607,4.695337689608995,0.8513469634042048,4.111943454086639,1.1764422115636752,1.3733785814579413,1.7686754999533971,4.045738194540433,4.002722294121437,3.7509193299143573,4.391639843804599,3.253237258540125,0.05495104871918177,1.7224364312897211,1.0558975432174078,4.449329609188018,1.6995815503594147,2.199031394893657,1.222696705486892,0.13660752416084776,4.684034131958374,2.081394722400841,2.6580151952656417,3.814765940232341,1.8878834144651102,3.122801610333057,4.674828638434159,3.0027148247987947,2.315049883513418,4.20027860154933,2.9554104827932717,3.7777878819973907,2.942686845634137,2.2159095137359417,2.355414442422793,0.6085189011196757,1.0428464977660712,4.087980065153763,1.7593491548890916,0.34528451285446127,0.9000225849687449,2.7844807497824817,1.0573736300132486,1.4500471276230698,2.3944447062266505,3.683523441051577,2.399200811965949,3.2621547931463866,0.5956135843983446,2.0579013926828624,0.7611000116906785,2.072153267890513,0.1824962906833849,1.1313318462871413,0.4364414620601942,0.3592072276349745,4.380797914060574,4.902530265893526,4.119016227602165,1.9090858238438335,1.2979448814083039,0.9226255285546237,0.890108925720835,3.687881306627887,2.1053782768323384,1.1005075773844775,0.6182690655750267,4.366884292171701,4.685355886766857,1.6502142752719828,2.5289563092085166,4.446494311001704,3.040500243216119,3.875901919026399,3.904877367556546,4.240685326525449,2.9810198162451,1.4274826884840552,0.1409672336522272,3.0931692739822925,0.3584240594281418,4.963247200286497,0.9519867501583501,1.9990819736123677,3.558101005575617,3.6461062959300863,1.787799080740704,3.3592535703616564,4.164421635625529,1.3136577538335814,3.252085528861046,2.8185111254185493,1.5248298420472262,2.218202424020037,4.527644971394872,2.656601062549895,4.256129587804196,2.3385155809038793,3.8450762318337883,3.0843428092463987,4.867780308856649,0.572931367687165,3.288302416450324,2.2152904586234867,3.0828610813350723,4.479160158531558,2.0138767935755997,1.9377179120285626,3.8315833093917018,0.7271910231021816,4.004410343306434,2.7372078852209327,2.925009001117973,1.0593667914404126,3.585229364057608,1.8419847801802458,1.763097827053699,3.6098885320663285,1.4367930042308186,2.130245502562085,0.8216015855226111,0.6027050713320514,0.47001982310544754,0.4630795680297872,2.515981427249118,1.720161991503052,3.413650073902904,0.45018634603530394,1.9984428446972302,1.7738969441029862,2.347347462684033,0.9162095254716596,4.525851180878102,2.829525501946075,4.012963833834323,2.2745830098225426,1.6053224798809007,0.42460241532718435,1.1066152266107465,1.1119483656766482,4.846934795014848,2.683740387721393,1.7307572560456497,1.5186101847628164,4.77381549178951,2.3787246529818917,1.5390919950811321,4.360397955221749,3.9315432355018998,1.160265480774395,4.505383133581564,3.916762127827388,2.708736470622599,1.3184849685979272,4.968126695946136,0.4886392498487935,3.6898911706514337,1.0534081990224053,4.704175148976708,3.2598090224207823,3.898278099213427,3.0208753764351504,3.3807633903110004,0.051249581755135054,2.53155036172228,3.9601628538100297,0.36836562740856005,1.7798578129540699,0.6747200578972601,4.794741046413389,2.1892978075029546,3.2692757165287265,4.09360823259144,2.1404491038644444,2.752392673673704,4.728924191055817,3.4055861475504488,0.8888385622945982,4.992903789450452,3.552858569204936,1.6169102803922308,1.1521813455138574,0.4382120525772104,3.63564230415784,3.7672318446954476,1.7336431092526772,0.1401718392308371,2.209417748017213,2.1467800491881848,0.9740777661232314,0.08542010066509675,4.401147554215608,4.108736261378092,0.6418526615170306,4.2967999319629,1.9019127285674664,2.0201818869594925,3.9210870037838874,4.137958774266208,0.9356799729100973,4.88005781966914,1.0623059597307027,2.9748509387445754,1.4400831369226896,4.95870342156406,2.972719771802902,1.9641494757722788,4.066043302436392,2.574933135151769,4.4704474587814635,0.1928095579522715,3.710633779897882,3.2499645736328207,3.9739469664596117,1.437536615915972,3.867795825401088,1.4769654217536976,3.21319373615042,2.9063835441805486,1.001806047182735,1.0168272707458026,3.5244014589049555,1.0476876577432914,3.928764673208256,0.8927336553285703,4.161922213804812,3.15016931837142,3.177743599352041,2.8545072884554132,3.7009125283826307,3.4263272672836798,2.5068537684172885,3.669199706013794,1.083456802371835,1.1823791359361502,3.6664584184291305,3.7024011246678157,2.1633781515218597,0.8291087657497997,3.089628024709529,3.227913847175606,2.742837465475324,3.643562798726542,1.356236858510148,3.4312843603572762,2.12335419777248,3.818629763545025,0.28344322396268273,2.7948841038843164,2.191250091913176,2.863626814878292,0.11381653987331708,0.5354717326421765,2.8500191257559693,3.6841151115772117,3.6494868525926805,1.976808069632191,2.8340637905846444,1.403354650948181,3.050566001360764,1.5451991565463719,4.88461668755238,1.9682287675363375,0.5393789245548131,0.6874073897334132,0.7020119581076656,4.597178898028222,3.654574250349565,1.6544289498738873,2.937682404296064,1.5613645404897525,1.2024734510828161,4.376252761050694,4.5796600543601755,1.7448296629686944,4.105663866528851,0.7818295047461699,3.687828216831023,3.7973631917882122,3.968612655580679,2.8938931352238284,3.5840140072982205,1.6865682591259068,0.1040806704143249,0.35593409373886553,2.831462175193119,1.6336321968658152,3.487645531692536,4.5349749936931385,2.7458008568778602,2.404291588698493,4.324681501614282,3.123354912803805,3.2171109667160347,2.57449089329603,0.40853602109542697,1.2212531682483696,1.9344778905871751,2.2928100448495172,3.403164743067334,1.7112699126457431,2.4977482139191687,2.716302560771735,3.6383257280225187,3.1675788486042764,4.185602026322917,3.7473902458867636,2.85631457399365,3.4220259448797172,2.480676129821895,0.7187428840875132,3.446323604009871,3.8366983220187745,2.661483050497689,1.3335897099967287,1.6501039396496597,2.6900682620684635,2.148318749011259,0.373378544069336,1.9008507105249905,0.6951681067234528,1.203742278780806,0.8714749313534942,0.6329749048137179,1.4447584197821561,0.788089921785079,1.5522859422278878,1.637574145733116,1.357812076098469,1.1206442043175224,1.8802713386506065,4.609864270235795,1.5004696739711698,1.0696909796750698,2.072872062833383,4.663353649669046,0.34119414926391256,4.278635631207565,3.9668624993306456,4.697786946539118,1.7044282977653358,2.8099822082144774,0.23012616919582451,0.9029364496028103,0.08737630708046673,4.501378971607926,3.2205108394507196,1.6038813139162256,4.397038805521136,3.1973587389071723,0.04835708167376662,1.1862387449847345,2.8309440669091535,3.5891103042327845,0.7850214862502203,1.7981853669311076,3.620921194988709,1.6015837993135928,1.3374486539019526,0.6036385761368068,2.4663207796176003,4.750947760156582,4.818204211157079,3.7118932684964356,2.1787791949764177,4.916600045864783,4.151143285386527,2.747224407152312,3.1360757546454723,1.3552946116367393,4.658445127318381,1.1256606817100412,1.1857174473176357,4.968374950607552,4.131462352340208,1.5791297333675447,0.3269324481791036,0.6894892130932251,2.7047970842693703,3.1047437560789417,3.6325575918670605,4.990927511026638,3.425495213301666,3.8039693188034462,3.914508122733815,1.742837978514118,0.5861788235335397,3.9748149302493543,3.796775396178292,3.3884168359209177,0.2449695553992548,4.471081411760772,2.070651908074459,2.312807198572205,3.6835195939312717,2.9141191666915836,4.25539504801332,2.6325405306509078,3.3420152660986457,1.0178581531606867,3.35303526707037,0.5025497466149353,0.8067118625150815,2.5128374759700014,1.1323498496103535,1.5262366528897597,3.9482312274811915,2.337542519549446,2.2540336902283853,3.940812552450782,3.7416750733743678,1.049248615389805,1.3712816779453019,0.41445757707253894,1.217431937294322,4.613909339055347,2.3060890213695053,2.1666196172513708,2.417182507863802,0.4609847003882095,3.6173499430740996,1.0384190924627745,1.67232324525596,4.177837747673847,4.196444261918119,0.5880334583037516,4.991336335833365,1.486771858017114,3.0383598337540585,2.3522473573687295,0.6928570629145103,3.857921490043472,1.202017472685346,4.264400880353502,0.7228556952681864,1.0289618465144634,4.599190518291145,4.386100663245694,3.6869572480968604,2.1941992350731674,0.9567131225464232,0.26707722685903934,1.6486281712592343,2.7563112082426136,0.16983345897574442,2.034119880431896,0.5238053370146356,4.763957409664812,3.280447035095527,3.9113832347218125,2.738327570621607,3.8128929072809417,4.548033617491429,1.6775977143116605,0.06937700157248372,1.419120108934635,4.836759191032392,4.776919003666244,4.13122586159433,0.41031931488320184,1.8547289539915812,2.555600170510025,0.428016156638672,1.5059205669449682,2.878465113413591,2.1441300542292097,0.13196068417617113,1.6777048315538912,0.8638185955361299,4.268878268044164,0.5089883365343173,1.172591064038705,2.8292524107993278,3.103260098721327,3.4412387903316244,0.07610180487577223,0.5562313338191438,0.8754052448962191,0.2990980703307744,0.09760931069719536,1.3091681444619974,1.4298149970694474,3.6519304742237244,2.137486953837925,3.0626130098497972,4.812158801003516,4.881728908224767,1.070221901451146,1.6890825216999572,1.1715920539171498,3.0056940486932193,4.736466251785664,3.4594109968954734,3.8514271360700434,4.630041572289693,3.316000765967008,3.4869710610564884,3.2200744826502703,2.007120519544215,3.404246664439099,0.6487986695777481,3.9293267176207247,0.6948773281056786,4.528376929414319,4.9687558256794615,2.073092681838201,1.9629972373246796,0.569211928181993,3.409534732627675,3.3751164534263447,0.9315387281998144,3.6733876603653117,0.7307644213267817,0.5941230662509922,0.9264786033764005,2.5110350721911123,1.6687529097786036,1.6534868833300453,3.7946553896998636,4.121628991022337,0.4015693598246606,1.9045870560816025,4.9339326030386825,4.765105064892468,2.6421166122607023,4.518014286765951,3.6592426914702036,0.9484721713696032,4.9669115715761905,0.21934972030514088,3.0186974466203953,3.00826658620843,4.402527914833694,0.8230771485951194,2.9798580482324857,1.1845716637702897,4.991948594269113,0.17098779118033924,4.641308917490077,1.5160664176850513,4.715110296823885,1.4503196233552795,3.915405272981156,4.336615691099482,4.0054791106701675,1.7613048457114944,1.5076392213244993,1.9851136238995382,3.0303143316681203,1.946015748702884,2.806535811270483,3.106286209881631,4.97628513768515,4.702237654969172,4.316017497053819,4.782740204284497,0.4154311434933311,0.48645775670651537,4.513591020696629,3.28849577118386,3.21441482663419,4.772841603396348,0.7270634848136726,2.953861484968898,3.7644718313445633,4.369013557262605,2.2843013730269037,2.8337539220070784,2.9929307836193697,4.021307648315682,1.6626174771848623,1.1495015911408812,1.4575625246643908,1.8802567734122322,4.988744316284781,0.809271722594026,1.59051050132338,3.8901604411103596,4.051808096257147,4.745685159558127,3.6380046483006567,1.6279931540054948,2.030745763624334,0.5458651522666014,3.013917675115355,1.9907734853253423,1.3983776561849692,2.904601529571056,4.164737336202025,3.4163991472726982,1.0288060632900153,2.1181986544270917,1.3834900529267402,4.702467758207993,2.3398158325545593,1.2952610233188222,3.483624365293565,3.0838327736058355,3.1834695034745963,4.319354424961258,0.05328068362550065,2.088167475147652,1.9202285983044598,3.859815530433645,0.5442099022411251,1.1314401265043805,1.9652548732966657,2.3115344267379956,2.2744418434017932,0.8950442962146932,2.2015662391376365,4.06822019162494,1.2136188758184319,3.1900849230039974,4.185188298903998,2.1509572137142485,0.02140152169791354,1.9176665240570079,3.679053286999988,4.076278357446396,0.8851677494955768,1.2474762406213968,3.8749802996629477,1.7204019314497643,1.1472894680483015,4.476433496288896,1.3450640799241431,2.8231594083130385,2.0665404159106684,1.1291646868065996,0.7560731867346204,4.103135909958206,1.6742599998866714,0.39740518611688147,3.120378085759005,2.1832557379797635,1.1085785661953929,0.830940769475984,0.9433154396552113,0.8172514034885237,1.970817675847265,4.515435191553129,4.92797421810129,1.2465711500597676,4.0441741832392815,1.0458267837438118,0.5406914986559375,4.621102453970433,4.547112987178123,3.2570222482905664,2.107314199578455,4.768951735696453,2.202787961608077,3.9389765953799305,3.2224291105157308,3.0355670921454445,4.000701420741576,3.068395501993648,4.605272528216568,0.23478413387197916,4.905979035023021,3.7047261378385974,2.989618400573768,1.807720827886331,4.1499599013356665,4.525043743592747,1.632829706520501,1.145200021891991,0.6434141600567833,2.59018665531603,3.0122607896495857,1.8264261906802748,3.9943787675077402,2.861167972238181,3.698345576538263,2.6661399347681147,2.8979859269592936,0.2920016028159045,4.366600294757311,3.2864409465941655,2.6132252447728535,0.021289326931908104,1.4297135113185044,1.7988657869659852,2.4849672222128483,4.369878564647306,1.71079894332551,2.7548407534042907,2.805496509459333,1.6450391306379397,2.7382011347146182,3.70767432822578,1.0483435728405444,1.324026348942564,1.718260693964101,2.1995986964568415,2.0728862622056687,0.40272898426399917,3.892194648015117,0.34122955407516087,3.5865500742913845,2.5419846615913766,0.14927691588257908,3.8017131183997166,2.427141382739836,2.6901062172364876,4.825237649286653,4.718563099449739,3.3097084675605846,3.0658364707172914,1.7816926020367274,3.3357991119966037,2.2251612659114386,2.726446833679618,1.1130687635023284,0.1364816926885004,3.397549197921629,4.2015781643677546,3.699573193835967,1.5272356960187339,0.6237814244034989,1.0671787882192152,2.4982515801355465,0.21156167793327518,4.087315874873605,3.876035895558143,0.10345352015601161,3.9984822059589122,4.87393356021456,3.572578012800829,3.0935324794257912,2.115609792202393,2.624593480299314,1.6168809690916275,1.3909135983738408,1.9874086858201945,3.101912270338971,2.453232544098163,1.6779625459767955,3.0257080825494933,2.4705348915293754,2.364687530336215,3.987279624800899,1.0157551523405506,2.2821577980152927,2.501701358372056,1.2765089105997196,4.135838752482734,0.40883006544113476,1.1791051845498568,2.560936581031462,3.7133440253100525,1.9771317743629546,4.427196215019235,2.1571629237564727,4.451901463871081,4.774140469479871,1.5193263576930538,1.253639487712599,1.5813495270689404,3.217721949608221,2.0104329758595174,3.146562456715486,0.16160393735069722,2.784192291686046,2.827487686880713,4.58412021150608,0.36098873491028804,2.007795374626511,2.311328569497003,0.45201257474331347,1.9751532147346829,2.3486500828005696,3.741183607068428,3.812153748824417,2.535820932539167,3.815931392170615,0.4061983035946215,2.6146364345750195,0.5512007863093338,2.9158726333594807,2.8546691080919375,0.8573681864467009,3.844110828812266,3.3466494146340953,4.396597208685147,2.9318263675609257,0.3259147939028806,2.92230599389859,4.289811128003963,3.333149383057814,1.3222255070176936,1.7699513834269942,2.794914393768224,1.687794868406881,2.8337943908387118,3.960111048532362,0.9401506152136752,2.4683803279327385,1.7402331051632691,2.965851156963258,0.5290289697714545,0.00039063848002118817,3.052547339761613,0.20268679434182646,0.6729800175312839,4.531714806759274,3.5055964899711745,2.8518403641899717,3.8653701854358324,4.540364695320474,2.2354097537091624,4.192557120810426,0.9563390260333937,1.44292409315267,1.281466366458326,2.438296125546673,1.2739029942784064,3.719128647363318,0.44299144287087033,0.033685958643011604,1.6042088374899355,3.075654659104876,3.9752801694850137,2.4742636153131645,1.5288002022932867,0.312464894250587,4.943249438884773,2.0307489754328523,3.217855617448344,1.5900722145361001,3.4259156172967034,2.007954045430468,1.1406856622695416,0.10442049172835755,3.603923380176619,4.240747154392274,4.053071966788744,3.267142024094233,2.5836090399416523,0.9716638043213977,3.81156188982834,0.44942033886480326,4.322850433420649,0.38318493101847095,3.297049022423566,2.7921488983491036,3.9523081804024516,0.0467609878276698,0.11091574073483379,0.23576382643413996,2.382764101450887,0.006704901280736308,3.8873284617407187,0.06486970054358498,0.8616301801944748,0.05507963768632829,2.370245542176784,3.256393999609325,1.0930575877395976,3.4223177463415624,4.830111878012026,0.5311627191196555,2.3691858697353774,4.5175271790652864,3.4723619040200093,3.2147611260853126,3.9879145930474955,3.7161456912146615,3.9961392282450237,4.982224310374459,3.5264065635433894,2.349144274240417,1.0412551382485558,1.0671868322154854,4.446906343501969,3.6815249738101716,1.1590934958991284,4.918791552946306,0.47759881845991115,1.7003932540049038,4.862754602131676,0.8766508884866453,1.0928552680762316,4.001962352354895,3.6940431309400648,1.0765976780788933,4.038320563555389,0.5096454410020268,2.6057044390480133,2.6630297245555723,2.153343150195448,3.1760232638897925,2.9328914093208027,1.1886530048818367,3.5803192632620506,3.044905080490019,2.233370866913736,0.5959574298273274,4.695189088697662,3.5975073171856153,0.5302013516999271,4.269832101432867,0.3756347318190667,2.774567105090171,4.385011128612005,1.614552013649324,2.5124705984005393,1.2210239512955778,0.7178390987043837,3.609303051486944,4.271546717903246,3.932408631661227,4.188385766474384,1.8548798562183277,3.108066633530747,1.8205254921532676,4.505538768634909,1.738530534592564,4.890801713813499,3.530869435589856,1.593479133882243,4.021502834768199,4.462986664651014,0.3437340088813634,1.6128277272923508,1.4237034831195072,0.5779297764687763,0.8095322834016938,1.5372810905269685,3.1685577035176604,1.9073792330512562,1.7900897328344567,1.678278988524804,3.280551139091389,0.2289597269964594,1.833268217775077,4.93140425530313,4.681109665199852,1.1750755063896179,0.8817692616975004,3.045434694393474,2.039245487542165,3.9271791207699214,2.6462929485971163,3.0793411807502102,1.887588910600887,0.5772414313274343,4.585367411066868,0.21546091248417,2.7087180031822045,0.8950192258182388,2.8427406814132237,4.471230385648059,3.9999479860388965,2.238458777986694,4.325576783698764,2.9507009123165884,0.872308395735587,3.8360828483454146,2.8242899069633465,4.342244740127134,0.21987851254693047,0.9597052322071398,2.512418992770209,3.4265968786460643,4.052634071229024,3.9615643184798435,1.3914113312185183,2.7427537296517936,4.212800803568855,3.3763235450330997,2.0110266801612853],"mu":[-8.699665883474264,-3.023347549824489,-7.438971766639211,-1.7805091792931504,-7.596425626747985,-4.584808096250288,-1.4210907055632194,-1.5852063752076417,-5.996548994858026,-2.3351505481536083,-9.28679365702955,-8.576705697012825,-3.580310222862406,-2.001135592804233,-3.45180074274837,-9.419487797556718,-6.701223741249183,-1.3587126532650995,-5.22837702888933,-3.308526118264523,-1.6828998571624765,-5.931964355250178,-0.7921786812550757,-7.895768768084881,-7.841212253561245,-5.588314545148996,-1.3654999438419035,-6.016933103500284,-2.0225813153800054,-8.878969268568762,-4.412927196926488,-5.824792475751368,-7.8805916148902,-9.647359639911135,-9.504067595035304,-8.76281699635703,-3.5219203811311006,-9.752757603298939,-0.25675305716021946,-7.7148537589112065,-3.6958850616292627,-5.40288911393406,-6.465509223392704,-5.513020968219953,-5.712819001280849,-7.532762605785715,-5.624317244046015,-9.8401557858183,-4.435993247661911,-0.8388225599075683,-1.4017102254834612,-8.937121555693729,-0.10293267718560095,-4.071161857799941,-1.4219113422237117,-7.175616836964158,-7.279399615345728,-4.35788892920341,-4.925267926848232,-1.0315448824570006,-8.347256619862485,-3.0292598206506405,-0.8932263361541182,-8.4024072717339,-5.186072660539198,-3.0506928398904454,-5.007844785181337,-7.278530794283111,-9.338625377564412,-0.28498289001330335,-5.177717671282087,-6.048614259694909,-9.67612671546783,-8.594770323639704,-7.096143198409082,-4.75967944438896,-5.96729520385696,-6.333548095617485,-3.0077726510737923,-7.037565239249258,-1.4974244459841057,-9.83456914343035,-3.6719726644550232,-7.527399610795347,-8.408531336991851,-5.133151959218356,-5.185918028384342,-0.5000837218209453,-1.9205905217896535,-7.764856089698052,-3.714043615085152,-8.495084177812856,-8.320621738896472,-1.3332900037306605,-2.778143234866546,-5.690109292185621,-8.965283773411617,-0.7478012098831077,-4.638220863506774,-4.9192197398901305,-2.4105049426839065,-4.931880344357666,-1.5992582444140613,-0.025695612332317097,-7.343926946291363,-8.485597192445757,-6.741623173724552,-0.644087524447241,-7.968102980083316,-9.908906303433918,-7.312314856762998,-6.9168432665673985,-6.818761160502936,-9.322226725958693,-8.09098725556882,-8.428191316686195,-6.926943990660483,-0.7821491380863588,-5.432886688203016,-9.5549758166514,-7.144313505555859,-0.19756853958667442,-1.3480469180490817,-9.73227805298325,-8.766880911064854,-3.5010189414973714,-1.380310017470403,-1.2632734713831462,-1.6244093921878933,-4.610024240640744,-9.36673284422169,-5.467944375845171,-9.661747568134063,-2.7016616249019743,-3.6941733609681604,-8.418941042776687,-4.9769398820579696,-7.221280951851066,-7.305679057163774,-7.101067347921106,-8.867500048216744,-3.5434118260860115,-2.615973891095711,-1.6205301876101474,-4.482390253267072,-0.6407226749777362,-5.87965262235604,-1.006033402672697,-1.9030788039683877,-1.9612264737671836,-3.111538811021959,-4.66909954845212,-9.653880481675072,-4.4482066120384856,-7.008439444225127,-8.252117781901529,-4.655981364368918,-1.3171744899527904,-3.439246614771765,-0.2592369732216593,-7.148648709821508,-8.84376537397882,-3.5126814127178907,-5.38006593121035,-7.426460392304797,-5.765313918295183,-2.369388753837711,-9.318057164540717,-5.183430640851585,-3.7254445709315975,-2.486735100597195,-3.887563062607313,-7.94023503476536,-2.169120099480639,-4.293543661420822,-3.6109974062010552,-5.7389641069114266,-1.3491842232126494,-4.4454086469076675,-4.936469144558462,-0.4664891713668218,-3.2688863855720807,-2.0187601941653632,-0.7392250673923084,-3.386660478913779,-1.581484396376256,-2.5251838208431265,-6.11030913038904,-4.583506415219154,-4.568379607354698,-0.9428953039959231,-4.814739734704212,-3.8573015140993205,-2.2688024832497455,-9.698775718408164,-6.452966952730628,-2.281185859415056,-7.486268310690143,-2.7175669939727554,-1.1400571513630786,-9.203938286673111,-6.9605182156658625,-0.6773041936718838,-8.313011930940927,-9.406656972169817,-4.268844745116507,-0.6971712727737178,-9.80545968256658,-3.1856636154093554,-3.0036038256711506,-1.1153437479768846,-3.5924316409346235,-7.271371607044255,-3.448475674453624,-9.908419096566687,-9.391024594759037,-1.9363523299709673,-3.365095337478994,-1.8643227477434055,-4.560717549827373,-6.683627939379299,-9.674068033060703,-9.906027631208987,-7.826989654626324,-3.854756015722607,-9.525168903298745,-9.367219538482374,-2.856046295626957,-6.300339771469008,-7.622937285384966,-4.222068501204747,-8.53648419316125,-1.8812939992355937,-1.2527705102484732,-0.5034740567182316,-1.2551171647712134,-6.977361880404802,-4.309856222573574,-1.8405298455797259,-1.6671435380195865,-6.785624345736016,-2.4079395685108618,-0.3178094451793756,-1.9693491516051709,-5.614773322053375,-9.53763583290571,-4.372253873224077,-8.514145188723479,-8.447078866049313,-7.805500202461588,-4.712294780363178,-6.407362926206696,-5.309145647005524,-5.13472602763299,-0.7449465687334378,-0.8920557165289833,-7.6005992355206615,-2.855730946672339,-9.957839245915313,-7.268931540812709,-3.4570104987500017,-1.423467840946251,-5.9837603293319415,-5.6558558026473715,-2.1893632514405947,-0.17088038343620493,-3.292749121774017,-2.003735640248687,-0.11605692519123245,-3.4630955373472316,-1.2038833113916847,-1.5806023108942813,-2.3417885339307642,-7.1625366454767025,-0.13530075701110533,-4.576884659662721,-0.2028033677755703,-1.3638319552458245,-1.7432758765438106,-7.627463786873559,-6.8316210912752995,-0.01057726499195999,-5.30593258169854,-0.06736412834683403,-7.0201066077963254,-9.356431100763514,-0.5514095050815726,-8.498745380440768,-4.6362705399336495,-4.273124698567747,-5.557105186603204,-3.0593722412061353,-1.574704540006473,-0.34266355712909924,-7.805734763769849,-3.4860470226080387,-6.923180593598008,-5.905296272495207,-5.618044791341086,-2.6525661836935566,-8.411607576761055,-7.851134186261768,-8.378087326670059,-2.507429782129451,-0.07913940802665387,-1.851638661028776,-6.432188365405434,-7.632507017351875,-7.805983038724273,-3.594406824224561,-9.075501791438645,-5.013075653096594,-1.0857740565539609,-8.317009667001836,-1.1124674553733427,-8.703014338648318,-2.365635516318765,-2.748757198892342,-4.817229885583549,-1.169679880357315,-0.2771858393749671,-5.955806190858876,-4.80167978800737,-6.502847360743083,-9.195652104292103,-4.094497351831281,-2.1877939073798514,-4.8660388037445195,-9.742853800830009,-5.362926986134131,-5.1245541816317,-4.17868651845515,-9.373632701852358,-5.530818822810948,-9.08996338525429,-1.750889111356999,-3.4086054936801724,-0.8040402156680826,-2.2473516059283205,-3.6272363049575795,-6.434888138731061,-7.730958452890409,-9.843238058912958,-9.348977251096464,-0.36809706010631604,-6.670746453630283,-8.285686099340534,-1.8985084714668665,-8.491661717860094,-1.9073397617433274,-9.102030433601833,-2.144867339819092,-5.4244244245408035,-6.030414946469618,-0.3676754589030895,-9.62916912474192,-8.810459340614988,-1.4228135514547025,-6.175112134073826,-5.947547608783294,-5.889246961195722,-9.037559989737883,-2.1264327295951135,-2.6238623541844386,-6.446292780919753,-6.128041737290076,-2.966962450772852,-0.21734028611137157,-9.54914758259249,-3.220154685173253,-1.3647640208580758,-1.3976806882629766,-0.09184970183199859,-7.090069741228062,-3.4885815044010826,-4.031438210412865,-4.2718570866461425,-7.015799902734625,-0.9316236586975668,-0.8787190056364813,-0.24122360444512436,-4.733899942447499,-8.081502987083466,-1.7131869506593356,-3.7450981019712604,-9.035189711878331,-7.107814289063256,-7.3365191683214315,-4.289631309803134,-5.034608779195528,-4.962744860249275,-6.909261327227723,-5.676144926761417,-7.77258290334424,-7.897106298816534,-5.267070156830853,-1.359154623104799,-8.775433127466352,-6.08305549566068,-9.097869522598982,-1.6719322101126455,-8.090718822555555,-0.273569011882977,-7.966885048450527,-5.913951303739012,-0.4392556827415639,-4.895469781152137,-0.5714813211011105,-9.673418022064679,-8.041361980029517,-2.3163451340008057,-9.978398903289472,-3.5829892764334503,-1.362272637056039,-2.6585903109043563,-6.0245819721833875,-4.859924704620164,-3.6582515434950613,-4.706360634531361,-0.6622433504008729,-1.0241050620207792,-2.8560293134713666,-8.175651710984205,-6.733589915540699,-1.747157138066413,-8.387923892027045,-5.131950999133775,-6.390916838865486,-1.8241244435354997,-9.991369551498819,-2.836827618097526,-5.599517635564995,-0.12365280830016534,-8.203033865051355,-1.97238281196767,-7.778300262981297,-0.018895415652755432,-7.372759699567859,-7.838407952174327,-2.679593004215699,-7.0416597346220104,-2.051884926530567,-8.385644238936873,-6.157082406219323,-0.12713490140838113,-7.238788854288625,-6.2944830473879865,-3.7613935994368886,-2.765874068888501,-5.581536158037721,-0.3449009786687829,-0.800095005253687,-8.507195701708055,-6.879845091060686,-5.198365608427511,-2.1077432708953214,-5.37931114194472,-8.366850984776127,-3.857719522497043,-8.34293434714526,-5.900941336516761,-4.354605035601445,-5.1098994461747065,-8.111498704477755,-8.48471213923199,-5.61153001986876,-5.963691065804097,-1.243472512423558,-6.261630212339764,-8.991734645353045,-3.1487079507087823,-1.667724000448425,-5.559197725564113,-4.177079226633542,-8.432984077726502,-6.695770865966601,-4.107238937233786,-3.417324744491619,-2.312672517466925,-0.1409056993391844,-1.5479039240860137,-5.609692674865898,-7.371569297726541,-9.539971798207752,-4.08259518924202,-7.288693242387094,-7.640820744518198,-2.7932184757826595,-9.069698489978952,-5.3177150729038765,-8.262467786746523,-2.561036000902832,-4.832119365014853,-7.383442629866231,-4.681891393451856,-1.1399480374231463,-4.010386376787125,-2.698691421742403,-3.8512859350449657,-9.697060441327354,-9.073402252263758,-1.9247256280119296,-7.872139187310916,-4.249015927224178,-0.4624733395862757,-8.782030667129275,-7.892008539414657,-3.1917808625809063,-9.988414051558067,-5.204830657736443,-2.399441753757412,-3.743228837506263,-0.6633880224380029,-4.595032047706629,-4.010533751634469,-7.417851148300969,-1.4402272141434125,-4.850392856121156,-6.942011591935364,-5.836080990409136,-6.945376580144565,-9.890024003613746,-0.9474956677106205,-0.03915583925971022,-6.4473960907052525,-5.648075807483597,-3.820277145164823,-8.020201522250552,-7.390027687682341,-1.9713982152682719,-7.353312009316209,-0.14704020736125756,-6.877570472369465,-9.00594374667467,-7.145226746353266,-1.031897315562147,-3.1416719634516577,-4.615167386881545,-5.40159930122557,-6.9380111392394195,-8.345200678810723,-7.267527894698931,-6.124465611812586,-3.5687426570842096,-1.8788822868654953,-8.207517283594987,-2.5441052863185165,-5.71008256930935,-6.153475551787397,-0.6919310281755586,-0.9998805502796926,-3.29342533928896,-7.785738010688261,-8.71012297693765,-2.7883825114387495,-5.707877743725236,-7.027261156913919,-9.486607848975677,-1.7241066490135304,-6.959371049394358,-5.204426613149014,-3.979113092497324,-4.1874742906135936,-7.0475452803029786,-2.94029710961923,-7.999238397367099,-7.068990537929631,-9.484982223848014,-0.02514059027862281,-5.974388788771556,-6.538030029299129,-7.85209806114997,-1.6210096607981739,-7.81094829204231,-1.8275331643704873,-6.507837201015256,-0.670957814546369,-6.021417494504464,-3.8251087052411092,-9.299865884744868,-0.359111990983525,-7.889282211777131,-5.057619938532103,-1.1617684482769142,-8.115313885001694,-7.302882702024183,-2.519453003759853,-6.994964889536821,-4.685667431359821,-4.537195053033001,-5.528182634339114,-6.525686598577547,-9.876751311801408,-7.499773356150818,-9.274507485798512,-0.40262509114035616,-0.4977896308004204,-4.393979860627879,-1.4471257571819862,-5.328902208306989,-8.707031946820145,-4.911429622359158,-0.467134771521136,-3.312285529917407,-7.913286163590946,-8.410751337876238,-1.764804870920913,-5.685501261314661,-5.643540800817764,-8.550627722233122,-3.0888318960655914,-7.360971972796342,-0.8956484204059212,-1.3942669456073364,-7.582482272093587,-3.028426910744755,-8.16310197882993,-6.686542306964,-1.4007442238383638,-2.740233248612045,-5.5493699098118014,-5.284868441963038,-5.021614237765837,-9.064897305127843,-6.567225991980492,-3.286743403866026,-9.001546897326003,-3.730128747057224,-0.26139662977073375,-0.09846473496096353,-6.316271359249983,-9.913445002577754,-1.2144923206810287,-8.111996280298372,-3.630440443165721,-0.4910547452269709,-5.998586942306319,-6.26243193955113,-0.19365382560353694,-2.4690452653217676,-3.3872541440241455,-0.17578711780522838,-2.1052706267775467,-6.461107544207973,-1.721586718537016,-3.0056302961682224,-9.04316776607214,-6.117414464093409,-6.159692132604173,-2.9092432574702,-7.843186543953877,-8.250879879906226,-3.8497629928563892,-3.0247659435802476,-8.72373771524268,-4.927810536382504,-4.130934477435635,-8.794634997357143,-6.438296919487714,-7.6243449238143395,-0.04875322196350895,-7.743059730007779,-6.097792049362766,-5.511647717082619,-8.22174211007848,-1.4923758484020389,-9.895634523343235,-2.795685294697403,-6.36443350724349,-7.344702933052831,-8.593603089707184,-1.604415398927621,-9.727985083155753,-0.5392683479652827,-7.76504398355539,-5.336516320736302,-9.034464719548449,-6.837548420392863,-4.710668183967471,-2.0412919771176585,-9.930150071679433,-9.16002176083347,-1.2012610807082624,-5.041510595556518,-7.941601581196924,-9.5278386733272,-1.3346946463122311,-8.197395898871683,-9.280737554103869,-6.832139662851125,-4.832224823689137,-5.410275702503591,-4.724621580190085,-7.959514681031356,-5.58528280474154,-4.63134558765706,-2.2861900721830097,-8.4038624009479,-9.092328575191544,-9.125759870527245,-6.153813419202736,-2.3775686321398326,-8.567206704321734,-2.5370222592915503,-4.24299869237111,-9.875509976526477,-1.5577323909642238,-5.143216363590719,-0.8114182689389016,-1.68242744458184,-9.637409731697776,-9.320065205417825,-6.414033848657265,-5.977898042669922,-8.48015918282779,-6.081377440905424,-8.596700668732094,-5.336369428026377,-3.4533487183509637,-7.545065370389397,-0.704940966050418,-8.43415069692247,-2.561958699195279,-0.4944413914914758,-2.9938697818199578,-0.3694817935206518,-2.7952941174374635,-9.817359148796296,-9.843930524204783,-7.7630255926729745,-1.3504331508283896,-3.326674935318703,-7.423534204195423,-4.685245215726967,-4.849412520468743,-4.725208028752297,-0.36219302512655593,-4.888578660938343,-8.68422063600072,-0.12954371229987105,-8.299070090070446,-6.595533294964298,-8.455742279074398,-0.2854298830098667,-9.911283615898087,-9.897553823416064,-8.16576780887692,-7.397556784162451,-1.8812750465838524,-5.448402259625727,-7.124581577379974,-3.514957451406935,-7.12530390023834,-8.753191604450008,-8.889724150227485,-1.8278544862493629,-6.131569888242394,-4.494009697458845,-5.367307194936323,-2.5053285938621084,-5.344386915116406,-9.067474293150948,-9.636937115894453,-2.52554352364458,-8.396909590131838,-5.68623217019322,-4.838133354421079,-6.19265570380271,-0.07008165559182933,-7.90888917837872,-0.10222531203267993,-4.736094915923257,-1.2844876532199834,-1.2311240606491336,-9.451778607977541,-9.969512952003825,-5.315949968009628,-2.278843265547088,-8.664885317997273,-2.634928365856384,-7.162024773097954,-8.685155836948477,-9.72116557861332,-8.695580011316297,-3.406254362447334,-1.4820297845372954,-6.5794739833922655,-0.24217580698612462,-8.854767985276851,-8.267283586261726,-3.4181515861156164,-5.964886794322095,-6.528475341776669,-2.967448992149122,-6.339862054465383,-5.117243579153861,-4.4783422597835365,-5.042364106896457,-4.558320318138975,-6.4565230301788334,-1.8390664710976856,-1.542685978903029,-4.667812305786876,-7.10690866893092,-4.43030921242147,-0.8175467288155103,-4.5241599316795345,-3.2076839683527125,-0.33623020146417604,-7.3469723267722875,-2.3654245717746614,-3.482725496914072,-0.06244659010448128,-5.899405535293791,-9.901913744675369,-2.460739255915232,-5.611836026009693,-8.83128129094029,-8.066714743790715,-4.930062549149525,-9.778649540124931,-7.904692496902106,-2.950428081156844,-7.6936993845832085,-7.281613821453017,-5.498505989368299,-8.303064101123399,-6.633960310615699,-7.901588179850179,-5.11230199511282,-2.1643445430917962,-9.84250956039533,-7.61299796149824,-0.5640393594070936,-3.307400907231459,-8.812838420483171,-4.824830839666328,-9.990533262954845,-1.1465599914336222,-0.9744768576257101,-8.400335176673558,-5.389002179732582,-7.140158447842722,-3.773026185253414,-7.099380876487733,-3.942683694501923,-2.2927318957502463,-3.4228912538070833,-2.8574469580844997,-2.710862109704666,-4.914371021063884,-7.544654531353158,-6.446171346094001,-7.868469858252367,-5.488863460629096,-2.3765940772330696,-1.1453636979130088,-9.200241996345222,-9.108493514191425,-3.2851375681346195,-8.70416317713804,-2.3145644772129192,-7.290795920665305,-0.5405703550853236,-6.523078818086249,-1.2614101977235825,-3.536132904714029,-3.168141195017846,-1.9203890493063858,-4.637006601771143,-7.8900604115465995,-7.798896766442979,-8.538946168611204,-2.8137812662974704,-5.4630753895962325,-5.061267514554082,-6.169019816947268,-2.6926271153832593,-3.5250863618953576,-3.77364857808133,-2.5310571197087417,-1.8730405511140447,-9.830827533776443,-3.4966273974616424,-3.085000740832742,-2.1376343287690314,-9.635790728289331,-0.28584688060253827,-4.745437000049781,-1.6354275157566645,-7.719398273356692,-5.318330100745978,-3.504971802946979,-3.7657311585424846,-6.844465414834344,-5.471037191100896,-1.5995811292328743,-4.253792654256463,-6.13121618237744,-6.9552428048003145,-1.3705605210239735,-8.359670528732195,-1.6117801002842502,-5.307883959388969,-2.0648762916634755,-7.589910527843246,-4.144542462408875,-6.608781436264857,-9.055242039374207,-0.8804462150251702,-7.5139886659768536,-8.515824461098841,-5.9764686920388215,-6.352100063565606,-0.11005745202691264,-6.2727931062657705,-3.9819804809263593,-2.142170967011945,-6.822914691625748,-7.446831709748389,-2.156333471767924,-3.9632650486322873,-2.1356801658587177,-7.872269305518859,-8.236233132254682,-7.7902100609185965,-3.527582398301261,-7.3467397349546,-1.566118467869102,-3.4260883676848253,-3.823672566405114,-0.6296035374661946,-2.8304033059782485,-2.5196256371324433,-8.14658969870261,-8.506343606675337,-5.621839204180967,-7.478619436911909,-9.020590476462264,-3.0543133361260133,-4.105349027152691,-9.07417583217611,-6.5349675042644995,-0.8126339755144318,-8.464326247141663,-7.420516956993611,-8.604185873564203,-2.408234593956309,-0.46980545555268316,-5.4887749573194355,-0.16280164264343533,-2.92676345611137,-6.367566810553857,-1.8510869311267886,-4.418623011944076,-8.045368330506994,-2.0185780779382467,-4.400932463673084,-0.4554221997270491,-8.76511645245159,-7.670182122405452,-8.25659443949623,-3.0592432349731857,-9.200998317665203,-4.826860049451427,-9.61418859946372,-2.8869281906432076,-6.8755740846947795,-7.966866510351924,-3.8809808712221416,-4.243181931171605,-0.34340002035853523,-7.047752046785208,-2.0258950165292267,-5.193770488855027,-9.846190316893344,-8.475897341168286,-5.3931140696096325,-6.235204550627234,-1.4499947123839663,-1.0197673545967767,-9.145601688577159,-7.457368046094852,-8.967091549332872,-5.197268832407522,-2.5359946996082816,-0.03289173694129621,-2.258044445914298,-7.426592917533514,-2.1496917276014793,-1.8587743162511439,-5.250154284921569,-6.819595150091593,-5.244657571880786,-2.5029969631330617,-6.281620521924413,-7.278820725661914,-5.617775054224065,-5.965974448720058,-3.4980666664017535]}

},{}],98:[function(require,module,exports){
module.exports={"expected":[0.00036627157904754173,0.0005519577566133567,2.3176606560756868e-8,8.2632669627144e-8,3.240555656264655e-6,2.8872567223025036e-19,0.0010206060591840462,4.3502451940814973e-7,7.843201535818931e-225,2.7242826212586397e-16,4.733085897196596e-49,4.986940155268949e-11,0.00016058807405445964,7.954753381637727e-14,7.790966846484801e-5,2.279320801569965e-6,0.0014129165003771696,0.0005374937899203761,5.209846603080226e-6,5.0735332252803654e-5,0.00024732177688653037,0.0018353692774937147,2.320500821505766e-5,2.4549287117325818e-45,6.190528029853935e-29,0.0005612382041043748,1.1885431967520488e-5,1.0466941662230448e-5,0.0002937160516818525,0.0002917524424635272,0.0027858455518284075,0.00019975022732235325,0.0001671664873678309,0.0006714255457008491,0.0011371846825349108,3.4144478411471057e-28,8.748763118662545e-5,0.001006667604275289,0.000747329527252176,0.0086456090498475,1.3592193089447646e-14,0.00021482572870776343,0.003657862333221216,0.00036376553201700933,0.0008682977322391301,0.00015669494215260076,0.0004382902963115791,6.479896487678996e-12,0.0016908259539508406,0.00021554513393536053,1.2923254340619073e-5,1.3307772489484558e-5,4.145648420610175e-7,0.00042624611295289885,0.001142466942984863,0.007895704944841174,0.0002733008809495964,2.5846645557340206e-5,5.264953062117344e-6,9.74642338602562e-135,0.00020824466993693254,0.00015471255278994388,0.00027370918113841543,0.0005194940081697121,0.0009952174250456405,2.4591428844145627e-9,4.70955790335809e-6,0.0005210750828387663,1.1581291013148552e-7,0.001518886901009773,0.0019595962516475857,1.5345602485420273e-6,3.5626496935711366e-7,7.498322483833977e-6,0.0005278181022430233,3.734866704216663e-87,4.438282513370266e-8,3.0611662782061293e-12,0.004480013654586504,0.00033649698381655333,2.0609288758248773e-63,0.0010422581429581491,0.00018057305190101694,4.558225611356254e-6,7.512289433000191e-6,3.7256385604305306e-5,1.295943321457924e-8,0.0009906173532907953,9.056542835113983e-7,0.0017297027495701916,0.00374465972311274,8.933942160648606e-25,6.709431659925913e-7,7.343678662092623e-29,0.0005436434498545714,0.0001508696008672022,4.2650348955259425e-45,0.00010528106401734546,1.0394166298768701e-7,7.99221104616154e-8,2.0470834270331225e-8,0.0002674078374723213,0.0006894513598739424,1.9876374880316033e-10,1.5603446570656417e-13,3.0356560943386247e-7,0.0019320055014085261,4.926647373070364e-11,0.0002557476658606173,1.9913643074751863e-8,4.216545333371447e-5,0.0005635809623461994,6.0690696141344016e-5,0.0002809625409995308,0.0005160300888948317,4.107841527042935e-5,1.4594666315198384e-45,1.8004760745509714e-85,6.000690383955051e-283,6.212927685554685e-66,0.0012391426937706116,8.016916804595536e-5,0.0008456856494818286,1.3824077897095617e-6,7.255189986786336e-7,0.0003897274535365579,8.999504024075544e-10,1.564641981554848e-45,0.0003410546458682978,0.004818694814854853,0.0004963095488940837,0.0013944205641908058,1.7152312380327968e-23,1.6454089915932174e-12,0.0008656321939013301,3.6385816249039667e-6,1.2077437536328372e-5,0.004216134287635609,0.0030994036157780567,0.0008967026027954964,0.0005457954542631655,6.238804457680882e-9,0.0005736700903838418,0.0012564107832167455,0.005016082649003734,0.0006743591354106843,4.876771969577666e-9,0.00014740427788504705,7.998107357698769e-18,0.0018109907539739813,0.0012402566359397166,0.00014382823843370052,0.00025468868125872986,8.121343879358015e-16,4.986333652868997e-7,0.0007924366313307943,0.0001961578837826907,4.077660021369507e-7,0.0003791878897629652,8.015057171289904e-6,5.267134838759691e-6,5.2304332611605185e-12,0.00015234289873564154,8.14134557669703e-21,0.0009420676508326703,0.0031479344329370593,0.0005510886553000674,1.957919857678452e-5,1.0012001481077376e-19,1.506164059353961e-19,1.0842130529061573e-5,0.002988481967916417,5.329241946854789e-5,0.00027961057605460936,0.0037602707959946344,0.000912599550890289,8.471466644791013e-6,2.0776500363856532e-7,0.00030899200509357916,0.0009280962421937305,8.282209891833895e-6,1.6585235057473678e-13,1.4128618293247415e-12,0.0020044359560953367,4.441182312989778e-7,0.0005877074743755768,0.0010762676019979427,0.0013913841254959139,0.0006336738336192668,0.00011370098227352165,0.0062707961448647065,1.141376742241089e-8,0.000126011260678784,0.00016702790425837655,1.612262391185339e-5,0.0003325376991342659,9.812169912561586e-10,0.0030737986955783683,9.847817944532714e-7,0.00024543182576978616,5.473097356074528e-20,4.1959580282497916e-7,0.0015617044722192604,2.718710153990021e-9,6.56369278908963e-29,8.690124231079923e-16,0.0009272696882399748,0.00100865459351821,0.00017595763913228052,0.0001312037666453733,1.7582872392468777e-8,4.9547217528676956e-14,0.0007461838278815605,4.649485854173821e-5,9.774607416600553e-5,0.00012076670132672897,0.0005919743039491987,0.0006969849361788094,0.004945430680286978,0.0007277847674770725,4.017906626237418e-8,1.7542966355989895e-8,0.0011179089055157075,0.0024893534369823263,0.00018291006737959116,3.603993624103535e-6,0.0036543915140651024,9.928074987007158e-5,0.0005523816098998298,5.050713448512661e-19,0.0006344404406686741,0.0003793678495439999,0.0002960546606806072,6.805977185071783e-10,0.00039170515078730685,0.000802444083702193,0.0011407056362689953,0.0022210682199288677,1.4660252782074519e-5,0.0005722221716235498,0.0036436878923325625,3.1875407372963182e-6,2.662843840738761e-50,0.0005295397226006365,0.0034038623226740534,1.0324720556085564e-5,1.9153482456556866e-6,0.004113413588476511,0.00014315845304532955,0.0006858995752355577,2.2612325026455048e-6,0.002856103265418326,5.680641705507347e-13,2.3290303220389095e-6,0.0008206921591954888,0.0012700725019595509,0.0013652975750778754,0.0008105544762483024,0.0005219046499674427,1.3787655449390143e-80,0.0031277619006474825,0.0002779512353847549,6.533033214289304e-13,0.0012071436774903908,1.1793712181001476e-5,0.0007987404884037458,9.526498526475885e-5,0.0018669785860826787,0.0018553738476943164,1.1934858696929176e-5,0.00022355020468954256,0.0020726144653437813,0.0003628670601226946,7.055572801233784e-5,0.0012694972051771238,1.461835372884348e-10,0.0014051245783946653,2.716221818239431e-6,0.0007817836201075368,0.00035843961920154697,0.00035297312927148514,8.352436516148764e-7,0.001581300424156131,3.7721031513473255e-5,9.232992020580307e-5,8.61855315045341e-11,2.4617504559623314e-26,3.8841085640346114e-11,0.00012952131892645202,0.0004794078330941546,1.0205649351762144e-21,1.1164278677928676e-5,0.002225065076560913,0.0002972395053843658,0.0001933351172468241,4.2143057543757224e-45,0.00029031569442783905,2.9015075773136156e-19,0.00016267392865085265,2.0405250481626927e-9,4.8430100933223255e-5,3.58941392410656e-10,2.2525893928947257e-197,2.990771926247317e-20,0.0003515771116541031,2.473613058073726e-33,0.0008220421171046396,1.0970422693000198e-15,3.0394187604848876e-24,0.007170131081272552,0.0007931087433148125,2.259420766967174e-6,0.00147765574690612,8.40605477814903e-6,0.00018654717954776846,1.9862976623132806e-13,1.6771207195379252e-19,1.6902800610078381e-220,0.00035240804018593847,1.2197261522628252e-59,6.810362790300521e-191,0.0025777500027573483,0.00744729174835764,0.0025295429057058103,0.00394681097879936,0.0007249648859187495,0.00030288361967749106,5.97384487797247e-8,0.00025174425524547193,0.0007394826538814582,0.0001842906822431458,2.751397252833329e-32,9.34959277374184e-7,1.25666372501135e-7,0.0011406119188100403,0.004061269992552915,4.3342339052184605e-152,0.00010343499284116491,0.0003866375476752462,1.4818344217234774e-10,0.000269947209026024,0.0012599472070265708,0.0006918924188789051,4.835543525329158e-18,3.68792197237264e-35,2.295012031877192e-5,1.0488461306083031e-6,4.893408433490923e-5,2.8582887759238316e-6,0.002593170657281611,0.0009698697071505946,2.10079724216674e-5,0.0004948754833466511,8.196374393692146e-7,4.00141751406196e-8,0.0012791904125235903,6.678256829963436e-10,6.417590176027666e-8,2.7708779610178826e-5,0.00026583751521426735,0.0007380960669943874,0.00014850754350643127,0.0003384708406914416,0.00028839792262239474,0.0003675373777443557,2.956360563681504e-5,7.83988752878939e-8,3.683456639960946e-5,0.0027314272566810235,0.00011733816622254064,1.3011274803928063e-6,2.206538352147911e-6,3.209067358915281e-14,0.0018624216606540904,1.0188417323047139e-11,0.0015757417277788574,3.044782254702335e-12,0.0005168781916155218,1.1230316053909382e-6,3.1211572119308677e-30,8.668376820136469e-35,3.6196786930445993e-8,6.112310081648799e-18,0.0062903051274924016,7.514679231455554e-132,0.0013704491497727707,1.8094359692193904e-10,4.329051160117406e-9,0.00014506191178685258,3.1798771012709996e-8,0.00019179271750741325,0.0022240996374389642,0.00023294508760714406,1.8551321807309513e-171,7.413486412156671e-43,6.28137199232246e-15,0.00046691653728212444,0.0004022356168956079,0.0005597056977797341,0.002692593290521919,0.0025254495516871347,5.09395970521823e-25,0.0014330032769460928,1.341556099709547e-5,2.2506660170494743e-15,2.018787844247619e-8,0.0005725998541621487,7.157396738113538e-5,4.504852743794757e-8,5.169570579861412e-8,0.00014128632852455935,8.331609178047905e-12,7.244858420144543e-9,5.037564106393527e-14,0.00044355659975291314,0.0001745405953188713,0.004488818285287795,0.0004821307743001436,1.2798082233960815e-5,1.1897517814995469e-12,2.3066471912665196e-7,0.010304576056219159,0.005589497804987222,9.66983507409645e-9,2.5187961208922534e-31,1.0327857332261957e-15,0.00040206464833730614,3.1303701516560976e-14,0.0013687252350464301,0.0006556504868362622,9.048521400533179e-5,0.0005289953161619728,8.961477147254466e-8,0.00021246896819804737,0.00014940576812918374,2.0867147379744376e-5,1.0302444507323623e-13,2.6793837913063043e-9,2.7640879120988505e-17,0.00042387828472376267,0.0011344321326211978,0.002276397514430793,4.922625242227606e-16,0.002353074834286025,0.000281299688058881,0.001927445958143837,0.00017495318031211733,0.0015180054933353424,1.9041375765060035e-5,0.000471722932292151,6.24588820243824e-6,2.002640057620431e-53,3.488622423071524e-10,3.6860709756889264e-11,4.648255713728476e-13,1.8301956519604313e-5,1.0294845996974784e-86,1.8534329666751408e-6,0.0018278167204762302,2.0331421899746222e-35,1.3085115821517554e-5,0.0002591335372386511,1.8775183228088968e-6,4.2881492671696147e-7,1.4568172675667312e-5,0.0002978185770504754,5.912412284707529e-6,0.0016453812608267365,0.0005138056359590537,0.00040935652138578523,1.1300539928580898e-5,0.00044932340062661533,0.0005396574380246917,1.220324613654526e-8,1.0203020238037006e-30,2.4544137468884407e-8,1.8688413714963287e-5,4.984732884152336e-5,4.7346905455473134e-8,2.8724602194716934e-6,0.0005656916133352252,0.0009837735681338404,7.010378524072375e-6,3.5417131504489044e-132,0.0009206339612008595,0.00035847915210702775,0.0004278021829304462,1.8593074121366717e-7,0.0013408645508513652,6.66539305940025e-76,8.136312588197646e-25,0.0003125084718408799,0.000257349481375971,8.080940572022107e-5,0.0006443675802505279,1.4442524100718402e-5,0.0012214372632678137,0.00041479008490637957,0.0014263821045832365,3.2694569235935985e-6,0.0014676851566646438,0.00010714979804678809,0.0026915661369128646,0.00010768643246986458,0.00015018572015857438,0.00011778038065989533,0.00039504123203313744,6.075723403217351e-11,3.2059135983050794e-5,0.001161679074809574,0.00020914310753639945,2.4237133459606533e-7,1.1703471894556532e-25,0.0005713540982556331,4.651780662289907e-33,6.280610177540808e-5,1.619209054358995e-96,6.095062993911973e-5,6.90194586259873e-5,8.235807810779255e-9,1.1557496498183393e-6,0.0004365573825179557,0.0015889493328688814,0.005225399148784642,0.0003457816588147538,0.0022953999843243916,1.8048852709731055e-8,6.834943508210728e-5,9.394240415518909e-8,2.1789565876668133e-10,0.0015939024886852894,0.0016736030886994034,0.0005817536040470307,4.9117771527832854e-21,0.0015255598950274004,2.835682057023715e-17,2.042644778143973e-5,0.0004468118725297631,3.2739446074458954e-31,5.655516538404859e-7,0.0004812201177031896,1.6699530505107597e-8,0.007684013167102188,0.0070317519802189,1.5995517651343142e-12,1.1786400593293955e-5,5.8512028618941166e-5,0.0008304942139477238,5.315559953308154e-5,0.0,6.616117336667447e-5,5.676488550229916e-6,0.0003078887503426202,2.1856351038201625e-5,2.2413759108756885e-7,0.0012705778904850084,1.8646776529452645e-31,0.0011792679618075565,2.4102892965593312e-9,0.00017650270340298366,0.0008603361600680943,1.8177197753187667e-8,0.0004493807833975425,4.331335291351435e-6,6.0454598334140095e-5,0.0008298108772228567,0.00025280555342504146,1.43005907576152e-6,0.007161488720099534,0.00025729927601180283,0.00208076073243365,0.0014973051139293373,7.287699430068825e-5,2.8623163144049834e-8,0.0002767438070235463,3.826809805020927e-6,7.6026502979095355e-25,0.0013163071760525034,1.993910794532867e-5,0.0006313631474734073,0.00042221911463582654,1.107248874526153e-13,2.6098541313088348e-5,8.368553822087488e-9,3.890493414935706e-8,8.215256523943176e-7,3.908853178679686e-6,0.00013198595435230196,1.4683529308500863e-18,3.0474188854704522e-5,0.00048128219019394125,0.0004729340941588342,7.653907601026004e-10,7.238174119400059e-46,8.930248807537404e-6,8.941146679651706e-11,1.2559436585551148e-30,0.0,0.00027308196719394006,0.0034630553144225245,1.279633870673128e-13,1.751598567570126e-6,0.00047284244457721354,8.700893920376064e-5,0.00040295660891458764,0.009735128456503686,0.00012501698717474203,1.1343238993819954e-16,6.0845108704151886e-5,0.0022608363502500334,0.002120909620757623,0.0006532163584141044,0.0001383734737327232,0.0003926226732348154,0.0035651780036628253,0.0015948753955712708,0.0,3.489952694250391e-5,0.0006024693645059648,0.0001390520731156904,9.331264708795523e-32,3.4790809744644594e-10,0.008055234828188894,5.944529275805609e-5,0.0023115189749400335,1.044723626908847e-6,0.0017905708376887031,0.001682025556578892,0.005193068092880696,0.00062236844177334,1.4133962278783803e-76,1.4608577127097036e-7,0.0021525396277037308,0.0017507224965255862,0.0015403182721005367,0.0008570437227791945,8.57327806469448e-238,1.756110826268574e-5,7.208385227655001e-8,2.8192908188114428e-21,0.0011405508795731165,4.9751056330010736e-5,3.081578309155771e-10,0.006871430715992135,0.0016578714497863304,0.002536976710539688,8.480097842501525e-12,2.4738113154622157e-6,0.0051433943594335185,0.0014493449010213862,0.000700522595985291,0.00013814401185407684,0.0006891831244815873,3.2602113247379702e-195,0.0001961324491032025,0.0015345278304554363,0.0008655173328222961,7.281469182317626e-10,0.00038998020407232756,4.217934073952229e-10,0.0017920662453346954,0.0036420932446131113,1.1768102549672756e-217,1.8410390229182564e-5,4.343410157050505e-6,0.00046001036445480066,2.3815999415902273e-6,0.00014090583643954117,3.4631371459136897e-6,0.0002062347092306309,1.0564107512425025e-6,8.594442743235549e-5,4.41818260856109e-9,2.3100267761484388e-5,0.00015798598710511737,9.016525978553176e-7,1.2779417762938091e-14,0.0020563798634319497,0.00015119368667794607,2.9225008295599836e-6,5.0152176834572875e-8,4.166742968622505e-5,4.770556874611637e-7,1.8671934490861715e-5,7.686770060020909e-6,0.0007441318011125216,0.00099992089857456,3.240381513921209e-18,0.0019711499163939357,8.475559935325343e-18,0.0006050122941170505,6.341758315349127e-6,0.00016196117493083543,0.0005721050306664635,4.9862800520838126e-5,2.3073072031761014e-6,0.0014093997318402097,7.711134692340945e-11,0.0,5.91133246081392e-12,0.0002884923139208304,0.00020224479109386711,0.0005954132373527475,3.1888323896204636e-7,1.6509768058516922e-69,3.215859386658141e-5,6.43683154114011e-5,0.0002139132752714519,0.0021446462874166023,1.6788945224311166e-6,0.00034756863318186195,0.0026945182589031016,0.0025773283732806666,4.8293968468371345e-14,0.008253107247688175,0.0012090183524335182,0.0037045572462585745,0.00020984310166114953,2.6015533078945336e-5,3.8228990232098474e-10,6.789784369576094e-9,0.00018712808395726757,6.902456163096664e-13,0.0017181449131668774,1.563705070328545e-13,2.911909943358401e-6,1.522467122035362e-5,6.081283975461055e-10,0.0015509130113778302,3.448040467912001e-21,1.1852932826696759e-5,4.8924972166258404e-60,4.523805124420038e-6,3.1729446880446516e-7,1.451323645364027e-7,0.0012465906282390672,1.0104469867462956e-13,1.1926166251859313e-7,8.850014462511243e-8,3.457570103979246e-5,5.358670619278089e-11,7.973029584738552e-6,0.00013058335133852347,4.6045710606848596e-6,1.1151086137420132e-5,4.5890978093747685e-278,0.0005204141627124899,0.0008326683447153389,0.0006301821872444846,8.666967131390149e-5,2.3189249927888255e-5,0.0006860821611186696,2.53226630686987e-6,4.937415344739275e-13,2.5770349312362577e-8,7.802008737258654e-5,0.007286307399786114,0.0013177019407222134,0.0004870115872858276,2.2070196938856726e-14,0.0019254548379062408,8.18232996013368e-176,0.0020565231606552324,0.0011204257907168984,2.810152112962125e-5,0.00048779167933916707,0.0002292691104942063,3.422502822662754e-5,4.9316077878151377e-5,0.004950708042632281,7.666031597835596e-6,0.00047483645714267855,0.0001759699127781705,0.0015871608278344564,1.6170873785826302e-15,4.5876691058774556e-8,0.0010873829444790976,3.260930859969599e-33,0.0007778881373466034,0.00036550270581405236,0.001892281655824912,5.1303946981464395e-12,1.4146100343308867e-10,0.00023573022563376175,1.520693187045603e-18,1.8777804324458203e-6,0.0010022091735519883,7.915581786450863e-5,1.8616347389483598e-11,0.0002012393789828786,1.3271656970727462e-19,0.007041189458843587,2.181985931207926e-11,0.0015114609547469602,0.0004048405694812023,0.0002997253923759764,3.628300904115996e-28,0.0,0.00030871426753212414,1.6903559390475597e-18,0.001436003925200118,0.0019305701242676597,9.513365698173666e-6,8.027494648475506e-7,0.0018268276988954145,1.1820005102623004e-5,5.3389974522628205e-6,4.663114085653303e-10,1.1506616092663883e-16,0.001113574435643939,5.0977992856352656e-82,4.556667974080614e-8,9.949451425648244e-31,4.588672288184931e-13,3.6870990736488366e-13,3.2468263437771505e-6,7.330056014678352e-5,0.00019463289147116832,1.4427009407906383e-6,0.0005212740838729414,0.0012744152447958402,0.00010162653378732545,1.0592404094648849e-19,2.1730542878115692e-6,0.0013720694041248094,1.3470176043479304e-230,2.3642526917346657e-9,1.1831923618743045e-9,5.666669386762138e-6,8.906078206467085e-12,3.5657504419824746e-25,3.181434140686828e-5,0.0037190870938574256,1.6453630644993238e-5,0.0014166604872364308,0.000384382862211666,0.0003901077431587712,0.0010346829393960435,0.0005142735727964675,1.3719824407491411e-6,0.0002187749962500708,1.596639954727684e-5,0.0007558999350958186,1.3226881149379657e-8,1.2158738082689748e-8,0.00015038869392756764,0.00140798277234244,1.657480310829714e-5,1.7610002975030663e-13,3.6126640439851905e-12,0.0013082245586909975,0.0001760833511658573,2.1363048889028532e-5,0.0009746378461346528,2.714980074472059e-115,1.5287802840596077e-8,3.8626730513068304e-7,0.0025578392448622374,1.0080623283267809e-24,0.003371280240795685,9.889152039397397e-6,1.0421559222148013e-6,6.612733553726022e-5,0.0029858102793968205,6.707665408947528e-8,6.900203359968948e-7,0.00037800938828017776,0.00017014670471404011,0.0006566670506029898,1.2514356356957764e-6,0.0009349264255681848,8.32541143777417e-5,1.584114208008465e-5,1.0957383692340284e-42,4.2180493244735297e-16,0.0002321606888353583,7.192582303607779e-10,4.035183677014917e-16,0.0025944264515457955,2.536772048114463e-47,0.00028780771334308973,9.696184440141056e-5,0.0003058549100612228,0.002620980110662431,0.0007856651188312692,2.7922195344375985e-6,1.1540354412477737e-9,6.513842875898716e-5,0.000810002701010746,9.108827777202075e-5,0.00047229328225677436,1.8884393538698292e-8,0.0010573080125909702,1.1616754114757387e-5,0.002683439753137022,0.0017815509280211831,0.00018418150316694643,0.0026549854109558855,3.19949176132419e-12,0.003280489264877994,0.001384341712977026,0.0008821489924845873,0.001740234675042359,1.4362267970611927e-166,9.755225724093875e-6,3.060623758128079e-7,2.1391103607066586e-5,3.5540827554162454e-20,0.0004679409232123372,2.089696135200324e-17,0.0033977918082641677,0.00010541212709926538,0.0004655355143377828,2.3420566411189517e-16,0.00017544709224255194,0.0021380615264184194,9.880421597590777e-5,0.0006336543912405983,1.0505553834349163e-12,1.161011682667854e-5,0.0014184492218462378,0.005596603642900792,3.277944820690428e-6,1.9642039259334268e-5,2.7804331200163954e-22,1.4946938157515153e-5,1.5059716988210614e-42,0.002698456251604596,1.2723341630272943e-7,5.57084839159262e-5,0.0007502894342235601,0.0006135433528034356,0.0003697213332003883,0.0003569241909083246,1.631152294994425e-7,2.77537630675144e-19,0.004851736287283728,0.0005558434368178208,0.0033798891057855622,2.4053612911456947e-5,2.3075417696107517e-20,0.0003750369676917681,0.005867192968206584,0.00043389406438448694,0.0011723583665337292,0.006348873235575311,0.0003091086677930315,2.0669139538184355e-31,7.366245023523877e-10,5.920779109693037e-8,1.3302569763235268e-6,1.57528329502102e-6,1.7349884456491258e-7,4.369739602983242e-5,0.0005160718423734061,2.0376920563903647e-38,0.0019678832137577,3.295622325947361e-5,7.64512570576486e-5,0.0022667075304899417,1.0769948785978251e-16,0.0002719828074592107,1.6307922930842496e-14,0.003325003187652317,7.939587378943543e-8,7.51743439380622e-11,2.527752059273789e-10,0.0010115389438806934,3.3115526176549e-5,0.00016652108773696972,5.9534466454560635e-5,5.892995026127802e-11,0.0005836816835829053,5.8360948118940106e-5,0.0004524530412302828,0.001181988353073847,0.0019332043566881794,0.0037700563359204706,1.2708965930237998e-8,4.670525766393824e-5,0.00040616183839377735,0.0024119597187469543,2.336667058313386e-8,0.0012720433714305584,0.0010313296264117498,0.00013765887499022635,0.0005093317581162778,5.912993907664557e-13,0.0013509625638391811,3.30249604804527e-28,2.289593892896509e-20,0.00018626001665399358,0.00034720646062616717,0.00011538268515484462,0.0008159503156805361,0.0004810075941175599,3.2423509828282235e-108,0.0011139131082883458,2.9189987484404234e-16,1.5905989659804152e-6],"x":[-17.58635550575321,-14.46779200534265,-17.940881892721723,-16.4793304469556,-15.382055249291387,-18.18142802975565,-16.82082967024333,-19.447848449411783,-11.150339628164616,-10.303500277685384,-15.859680794705096,-14.594198481787723,-18.820762090536252,-19.46832740514434,-11.954455586571559,-12.980543323063147,-17.131781647782287,-10.22302447711178,-16.766378045195584,-11.993835041098674,-13.39868518576331,-11.166999315707717,-12.372840571944167,-16.64807865119642,-19.370788725894485,-16.902522573847772,-13.77506778611117,-10.56109623429415,-13.837497157588949,-16.25667470036904,-11.246952987688383,-12.177196652409275,-15.210320232602248,-11.713024836032325,-18.71198399211259,-18.514781058315712,-13.348735321999632,-12.042207258823204,-13.029869358196631,-11.205130082996897,-10.457973092819959,-18.158020349442648,-15.697518685645598,-12.495711345565311,-19.162365446118848,-11.625979247285088,-16.9888411057137,-14.950084788665794,-11.521309364144187,-16.75406359342241,-17.478560767268,-12.586844156677783,-17.597361852164063,-13.865210421158702,-16.63220614380565,-10.057314402384668,-11.389834629365632,-16.271790771563964,-18.92285483164669,-15.343284159197975,-17.455125522851787,-11.320843001472271,-16.79842669850366,-10.07808316380067,-13.303590435271191,-15.467329406884584,-16.864175776555744,-13.683620778534838,-15.061789328533372,-12.00077711641774,-14.806661628422912,-17.059936611229848,-14.114634846337431,-13.8431776701763,-18.9864060849689,-16.022874828153654,-11.826211861307536,-19.32936681857127,-11.93726738199028,-17.89724752016165,-15.51449902726715,-19.468333312225145,-11.955111638317135,-15.365739073264022,-18.397821847393352,-16.094968348139084,-10.414415382878214,-10.671699303011184,-12.584251294528915,-12.215320538976737,-11.175255979396056,-10.86063700287577,-16.466072797278926,-13.658920153915986,-11.174741760376708,-14.172891080285627,-15.562027827680616,-16.138615338097235,-15.265109659571728,-14.054271859483178,-19.09768168742901,-10.109712798736926,-18.732431186675264,-17.173302272902802,-16.62200700973173,-18.94211717918842,-11.440477917577716,-16.017918996592837,-12.299943788064724,-15.25163937265061,-19.674147011638233,-16.09134785458635,-14.471218185305677,-12.662405739041711,-11.386848206801254,-19.2909207283664,-12.443448109277831,-15.224162906171557,-11.492636641788907,-16.057860296937804,-10.059530354997438,-13.871593328062659,-18.281865217980332,-13.263379559967747,-17.200710621119274,-13.687757787692698,-10.443391501101736,-13.35603037163554,-18.143631754755006,-10.51134721556327,-12.21362312250571,-10.799486440861399,-16.010890118920447,-18.91925713665614,-17.651715795632033,-16.79263610754583,-17.840491599761428,-14.297510564867578,-13.86741357692835,-15.79010634679956,-16.63997813313326,-16.115635607184768,-14.05062440447298,-13.95425593311555,-12.082774721169823,-13.117676400905793,-16.96664094111454,-19.380939682573093,-13.404715217359271,-13.228048691616902,-15.291321384681458,-11.757145337196725,-18.230127222155687,-19.85028549657247,-14.848693769452018,-12.196228174423407,-18.343288155365155,-13.124371161520397,-10.956161122011492,-12.767447498561879,-13.53783698332867,-19.694249656954774,-11.04861233603799,-11.90784379199519,-10.071840558905425,-10.53068917301749,-19.19996768810394,-15.316561563489248,-16.107552747949146,-11.652326792428093,-15.16237501004838,-17.037064105521033,-19.436744346046943,-11.202875367739393,-10.402043977768427,-13.779960710131858,-11.879536073586827,-17.122175792380844,-18.81442187161903,-13.407048029055002,-12.014256934687673,-15.78745771842363,-12.095410232231764,-17.858253873349938,-18.124891234256463,-13.623926031361309,-11.965416674606065,-16.20703326532841,-19.097601675576897,-11.95259801224699,-11.920866435991336,-15.941795087641477,-19.316185199726938,-17.751065980415493,-17.923587117862645,-16.87557673953814,-13.231905568534636,-10.125528790355903,-18.107502263453945,-18.386304460603974,-14.241738777051902,-10.62497346143257,-12.78967729188363,-16.639133589101164,-19.43951577729081,-15.001713530363931,-18.105206786933582,-12.526478548017412,-10.093002415315858,-10.408016005349186,-13.678442404416547,-16.68308753825717,-15.177665140703475,-18.395412701274047,-19.372492036660116,-17.64121110432341,-15.55661675235127,-15.899274249437765,-10.46692051882832,-12.190331465892779,-17.304669293103178,-13.925668712976211,-17.524493176125088,-12.382952285288379,-18.93876614860679,-10.136940228270937,-10.643675860643675,-16.39529839399216,-14.968925931188723,-17.16858535247899,-16.037385997376063,-10.114535131781807,-18.55150721687441,-13.963200649954432,-17.22922819035366,-19.564751139066058,-14.061639790677251,-10.152653065438766,-16.26906610724746,-18.86426184698412,-11.026890509479493,-18.44980006929846,-11.554250789548068,-18.968430101468815,-12.668878975522603,-16.78843056853949,-16.49979680635756,-12.055236394696099,-12.45049928978875,-10.603819873277022,-19.25965550924893,-12.145220431484853,-16.19859978453167,-15.65848270577326,-15.624753322992513,-13.751511210604717,-16.083128219603154,-18.539067652155822,-19.716467538888345,-17.17204925401151,-12.297358048600483,-16.348510341963948,-18.719796896199025,-12.547398357120665,-11.398621046740512,-17.378812606421455,-13.764946550323259,-13.362541789025528,-10.672124089968698,-15.108997723395621,-12.208490023691816,-13.01824163776404,-18.08714142407439,-15.48919688197481,-13.699829126332796,-17.620736542129755,-10.750384396113013,-14.161053288789269,-10.61467215833333,-17.637385025814428,-18.805853871935554,-17.679414035944514,-15.340648735902976,-18.68660559685072,-16.8662020715732,-19.852282788995797,-18.87486740755335,-15.885485976327079,-13.11849865668262,-14.46961880802472,-11.525165649469066,-15.340113990235517,-12.914836090752868,-19.621093416254055,-15.111307860042958,-10.167444244504221,-10.025388228406129,-16.54882399558489,-13.078415346221187,-16.273753383939606,-17.750310150654236,-18.03618683627775,-10.389701739581053,-19.319088915909916,-16.79439707034955,-13.395769400366998,-12.293945046202408,-19.108303014056325,-12.660188797652127,-10.381818866330983,-19.671574055610886,-17.342828107459866,-14.593238465280082,-11.22084182654265,-18.351924177806445,-15.192865580820559,-18.420781464435912,-14.5088138115222,-17.88977530311093,-19.58966651684982,-19.63137390072486,-13.554290770373079,-10.418371860159066,-13.040403909545192,-10.804243631187944,-19.91177043557453,-13.135106740684673,-18.44993198553143,-15.340319295047705,-12.837405584339862,-16.931889115018432,-19.494763662895487,-12.366995501702846,-11.938056592125704,-12.700232475080144,-10.389715767307157,-11.87734155879381,-16.888346849618586,-15.880818811997601,-10.139911129265581,-10.055704443023073,-11.275101174666416,-11.128503761055883,-18.437043746075606,-15.770721891899022,-19.63575067642281,-12.399038534808884,-13.967876469029605,-15.349718843877465,-10.66903036320096,-18.602008616232403,-16.375724861728724,-15.271516796251728,-18.470834205062,-10.086977751404993,-17.112147932512094,-15.739306964792936,-19.264710480692113,-19.790137079923763,-10.955675624788512,-14.065926792881358,-16.670566134124954,-10.955809317568441,-14.972936783701787,-16.343610371732392,-18.659944077932625,-18.39753064396553,-13.668050185749623,-10.053638308849578,-12.517782382180037,-19.15478552990432,-18.948034632513465,-12.948450346011517,-13.896941689662476,-19.292498104961066,-14.673789745820896,-17.07863965402554,-16.264225900407144,-18.688490727873045,-14.35463334266456,-16.577406846391742,-15.454182231248513,-13.385486649829685,-12.568494206842242,-15.26208125130831,-14.572416167636344,-18.171289827043182,-14.867043972753953,-16.972417838289534,-10.657292488392995,-14.314280782971107,-15.749615546074695,-16.505686381384965,-13.869056293675703,-15.101826971882659,-14.555389311142335,-11.265486101777949,-19.575671562283492,-11.441968394868134,-12.967916600635622,-10.138079868268301,-17.49237217058702,-15.053408333825463,-14.223232224502254,-14.304782689233548,-19.312787344430646,-15.444304351341795,-13.037902628851088,-17.666400500686873,-15.408947454821805,-19.974637734509987,-12.221796721124667,-12.504219689691631,-17.24861550764617,-15.500031063500355,-12.809467161570412,-11.729480535675066,-17.971100413573694,-10.770728305511533,-19.11568422845291,-17.93371510780443,-10.019206485410102,-11.065821272022882,-16.11986781132935,-18.52916785306671,-14.45634689699469,-14.827584413456542,-15.84265070010688,-18.30196766343168,-18.43415033207583,-10.894000699912016,-16.06399461489807,-13.981630767488912,-10.134831160992697,-18.448293927362908,-16.312238332464478,-18.57775963581557,-14.51460888814222,-11.295883261825761,-19.584668593517605,-15.729367250035434,-12.236025716414883,-14.16361188044364,-12.860411324410517,-18.39051460538942,-14.861552770117285,-18.012931232385114,-13.394328959561015,-16.132169417411056,-15.868205112798965,-18.672979064478653,-16.013482021486823,-13.301836780352554,-19.3405272091318,-19.86305960813763,-11.78063988667949,-13.446356811030707,-18.374656181631778,-12.644017388200695,-14.834024904800431,-17.21494506365317,-19.560378231611686,-14.818497193418336,-11.408411543854626,-11.329674160139868,-14.138333861053052,-13.126426865813933,-18.31205446558362,-10.607213563131383,-14.798739032742454,-16.39765821942413,-13.528571582905503,-10.892756724713148,-11.421292001315564,-16.03712386077451,-13.543644343904027,-14.111191941300108,-15.539852059280024,-11.540923061576205,-17.433972445777318,-12.756875703688653,-15.208231633888204,-19.76504011162461,-18.13657055031458,-18.094872689049904,-13.664899982275383,-16.024659209992066,-14.385869707806462,-11.247315767109797,-15.493453832903498,-15.802057001816124,-19.005423577201633,-13.696414720478433,-13.624361966156357,-17.560833505180504,-18.23643190767016,-13.797166979215623,-14.346535163533527,-15.129625047906785,-17.316935562028334,-11.974628596637153,-15.888879023011413,-12.749421412584761,-11.65713149379695,-11.309068408922622,-16.211070896217436,-14.146788004497912,-14.272537647211848,-17.215283970636424,-17.218174342999497,-17.981557792531692,-12.899110686165931,-18.41746225634124,-15.856443630557155,-15.095703138627325,-16.81059811877162,-17.618703724271835,-11.213806965616476,-18.01436868552311,-12.950278125367214,-17.32855981934864,-17.862630042463707,-10.397084716059313,-13.472273843049415,-17.50820885155132,-13.627932207559162,-16.24375614875953,-14.177803801964611,-19.413830562957006,-16.95894939711863,-10.997137896536437,-14.661533070727302,-14.343837423057472,-14.683275191874545,-13.213769628058072,-10.853569612210324,-15.834778848319722,-15.171134012719943,-10.056196658603474,-13.8939944274612,-13.279753861247217,-17.23105616394857,-11.737631124601258,-11.603767665381728,-11.14006649993627,-19.26762695829367,-12.465895900305577,-18.930592757315633,-15.975850874534549,-16.512223602281942,-16.856871813038772,-13.959244282335597,-11.606525392418433,-17.379020160950752,-12.164826772150693,-13.823831336650406,-16.593391541887858,-19.903835733270306,-14.07858800950369,-19.208945072446767,-14.585864660298537,-14.400198218778424,-16.047768076641184,-16.303238024971417,-19.877109469517308,-17.98842548895739,-13.07509546074471,-18.995386428108244,-11.453664762173172,-15.101859604184863,-12.349843180062416,-15.603717698957722,-16.39048761997192,-12.435179258101861,-19.52829926704514,-16.317161039838574,-15.595852199071043,-18.885213405884702,-14.165572699535751,-15.643140722642165,-13.137890101161398,-19.999932278647684,-16.759876246385375,-11.325297392469167,-16.353456552820692,-19.487724850120866,-18.220737836080893,-19.43138456065396,-14.078088805653069,-19.612142433395775,-15.999041822189461,-17.59386368923313,-11.820987296743626,-17.297834374032625,-17.89532760118505,-14.984267109940532,-18.624280317139643,-19.268618652437514,-12.991836068741808,-12.384392990480457,-16.088720886162186,-16.783536263269983,-16.534093818209634,-14.523070785177215,-15.069222560859675,-11.232878625591887,-15.331524056110146,-14.360013286195958,-11.756051056071431,-10.280134954078095,-14.150725323881373,-12.663352267078764,-19.8734861127013,-11.80788784906591,-11.399684667146989,-10.114733004060124,-17.43927609600516,-15.070443547279726,-17.81320790759091,-16.163192138129197,-13.892337004220014,-19.7790894305244,-10.562060931534026,-19.364880704847785,-10.035797612555726,-19.392195796054242,-10.791367685992064,-18.775599911526953,-13.254128288815695,-10.350359886804743,-14.581287559274045,-19.493575563957243,-15.510316051235796,-12.58600706947653,-11.825627916118593,-13.461627576660415,-17.907121101012432,-19.277332706610412,-17.957015767011832,-17.76298163257646,-17.460253518110946,-12.871788335824332,-15.740084491643866,-10.076551941127533,-19.395690396553988,-11.773664781715855,-16.644278993369962,-19.12339733728289,-10.524083235441058,-17.211978833055348,-13.743272380978794,-12.518783840039747,-15.015091073810467,-13.698369818531262,-19.94753331886734,-12.393614952971445,-11.151786282702007,-13.575613337654806,-15.608219024571277,-19.27282384683576,-12.127545581016017,-12.773797155662042,-16.0549099915932,-13.120859648299119,-13.465564697896431,-12.580973380246935,-15.701545073119519,-17.678413768927047,-17.134445747472878,-11.744497128043939,-19.43748139987751,-12.385539422478704,-19.840695928624925,-11.747533597663203,-14.420378069944446,-17.72904210974621,-18.934313352098155,-13.540641432559962,-17.118614961552993,-10.813992356548338,-18.25312835095707,-13.14711935414062,-11.176475752139709,-13.621022643054857,-15.82324754176334,-16.72094519381758,-17.581208263432963,-18.850169277443293,-13.872879007389434,-17.40679116232928,-14.059986106372468,-17.305153254385875,-19.187291205483042,-16.160468335476413,-13.975350948056292,-15.197310885915318,-15.42178378118383,-10.470445926033758,-11.850856400188592,-14.49521521395388,-19.351835016804504,-19.46746564410698,-17.122474236105255,-12.203260050981893,-16.32841114734958,-18.570131045755968,-18.347653393319984,-18.51977248077739,-12.197648179426393,-16.760881078091693,-18.78264907543392,-13.105395088637286,-16.13451325223538,-12.772648223968051,-10.421807870281874,-14.93196038040475,-14.269972625064568,-18.513660006781432,-19.64395378365441,-18.140559908849593,-19.477607475427156,-18.08010227697928,-13.124853702667224,-11.653936740132982,-13.618001077118748,-17.59011745851957,-14.15204077605496,-18.18441011052527,-14.419473908069758,-19.095157657484666,-16.061217753957052,-18.986550453918206,-15.003607835001736,-16.194308544904125,-11.707632008881266,-18.309482981648905,-13.854076583570077,-17.560763960299017,-16.725962341869426,-13.634152144805887,-13.21667528011049,-10.238872482787396,-19.429192988991137,-14.051731578586075,-15.906621897794652,-11.983786409897917,-13.76031057222474,-15.769084776964867,-13.913866509944146,-11.959732435225668,-12.623895513059596,-18.393715159624072,-18.272956148439114,-15.834919443113469,-11.265700733627337,-14.879796939301874,-11.67342341927183,-10.740536412528288,-13.709238553751735,-19.029925740790723,-11.26298521497482,-12.503190564843077,-10.199462418752823,-12.13635232179385,-15.030882601695872,-17.482710387945726,-13.126742614706664,-17.4278446953041,-12.969065866716159,-13.06403098088462,-18.268079941840018,-17.044022694990307,-17.248710341456075,-16.829108404166025,-17.520847193501705,-16.043360173095838,-15.638872103393195,-16.20233691024377,-19.93142997603669,-18.023840656799567,-10.194518472388165,-16.179059584897825,-13.149153957710311,-16.32272171178013,-11.293458417150465,-17.47123357363236,-16.069617166266703,-11.38018978777598,-12.080514669007078,-18.12321563586728,-12.10361745837017,-10.329721723021612,-19.445944119679147,-19.260133687089976,-15.038842259094311,-19.001061120436123,-13.182158371274625,-15.961520101513395,-18.642534024953385,-15.074260737253184,-12.294161791061937,-14.265782751311178,-19.451401693071478,-19.572092266529996,-18.288522327068495,-11.86632654726964,-19.663769693250316,-16.373489309186336,-16.42685952910878,-11.888884912046791,-19.811751273190993,-19.05686348555354,-14.498369997653988,-17.23282352882147,-16.978296776597645,-19.28027716467749,-13.40533423463377,-12.037789067569445,-17.817248832614393,-17.231352391836566,-19.625101894261658,-19.134775317681992,-19.825680852600307,-17.7336856050754,-14.199490093406094,-14.752697941453924,-10.571499551366372,-10.625365288912604,-16.851566439925165,-17.75154421253312,-12.779286813668119,-16.325848980991765,-14.22814992216126,-16.194010715727117,-15.521601541269048,-11.491952611803917,-11.954244949153177,-16.31141049849893,-10.026319173737443,-12.812149234391443,-15.61254507121941,-15.515571971504894,-13.353421336433966,-11.596128502482642,-17.321273842425917,-13.192687380574792,-15.142749247435212,-12.238590558858045,-10.833506827941953,-13.251291557721657,-17.953309648984195,-13.097874089281724,-13.828172909351196,-16.01412413728568,-14.87951663049432,-10.738759603779853,-11.718622124957887,-11.785034660462895,-13.61826168591687,-13.25159484846317,-15.305509774461939,-11.472223239480776,-14.625147641032843,-17.255609825269534,-12.912977412320032,-13.323474061908962,-19.681124223737104,-12.973757196593578,-18.716406586937524,-12.050761626223679,-16.291780568014666,-13.371552590114044,-14.94982512890954,-17.469760386490492,-13.304059499658527,-10.83117391445593,-11.232046742187869,-16.08665505307986,-11.343796734764375,-15.36926442859585,-15.41136186130399,-19.305923250696758,-18.418438565659887,-10.165285371541437,-11.090039025932388,-13.273894839554083,-19.382048466247554,-12.712229073040863,-16.36960421248141,-13.487215788808522,-19.260318364914625,-11.180448625038,-15.29518369877199,-10.34856866732866,-17.057512029048056,-12.422230748051906,-16.90570867073189,-12.330819543482521,-18.03170427828136,-13.528494416506762,-16.40882200771925,-16.57207812536552,-11.602147707390817,-12.863178935235869,-14.471674411561786,-13.865015646527985,-10.067764964910253,-13.583067161665582,-13.917687312934408,-15.15739859321334,-13.186751590736527,-17.730469992958238,-12.844673876538295,-17.46782481900209,-14.078289068456282,-17.559017869529075,-16.254442657150094,-15.459082740021394,-14.6697516315507,-18.672913747288828,-13.562149675004129,-11.857053839725918,-15.688818592673437,-11.355664275497688,-16.909168841159993,-19.63641363397151,-17.871330693370876,-10.130851414091158,-10.405564221236945,-19.33773166070706,-10.42006661974143,-15.760926034248328,-10.720279108561146,-15.575910371228602,-14.983544898554673,-14.773393610707895,-14.417164782155567,-18.22382621015836,-10.577567171477968,-10.326786394731641,-19.80535606448086,-16.0016108200351,-13.17455407833224,-11.769637490348046,-14.832412185839988,-10.424228717368527,-13.439008671838366,-19.251935933512353,-19.078906429690253,-16.810263240024682,-14.833461190835742,-18.99208766460838,-14.652405188515074,-17.43433705628111,-19.038720347655705,-11.462911277788292,-11.401900705512842,-18.9113989888688,-15.713039501822665,-15.361574356509397,-17.611198405052303,-10.080852224321186,-12.878454512513503,-13.001936212349403,-15.205902002247864,-17.69718858983625,-10.043824186147853,-12.278600093882975,-11.158875415650778,-19.830112942817742,-16.98087194825935,-16.04711708409783,-16.75432649719156,-18.842507696293126,-16.02308547600465,-18.640715076184243,-13.45592572406266,-10.099146520892752,-11.27250139409391,-13.113602404556566,-13.648975568937251,-12.959965152233611,-14.941340351089353,-10.50429447386646,-10.01580024274363,-14.558034478092775,-12.168047225088563,-12.533850078943923,-16.153400815295626,-18.910349612453402,-11.815284153819583,-16.780999829090945,-14.400304129143047,-13.293174442055363,-14.359254666028708,-12.098966340442011,-18.7416988255262,-11.100285069813914,-17.202263143743924,-11.320019224061733],"b":[4.592185343837752,4.402944373841914,1.3267204658596388,1.124599221551924,2.1024798897352537,0.6645362115969755,4.099240969279606,2.0521185496377345,0.024147211921726752,0.33281293418578994,0.16322881783689347,1.0564998843601825,4.310003874440498,0.6938968670783663,2.6972351363460545,1.4635761170249717,4.202960240083405,2.470003724815162,1.9940818941916072,2.5023835017278593,2.1929126980969404,3.223025943204385,2.123408114186489,0.23832456415105008,0.4317001334438486,3.1762420230202593,1.9930847756444114,1.0463569436016684,3.781246790532251,3.63006594467378,4.307360372119805,2.5483235350678157,2.458236975107843,2.1548946274349055,3.9969807922743583,0.34435106629216894,2.3377479974935387,3.738826005789978,4.080812143650983,4.898512964621967,0.6170758792813869,2.9060855794966622,4.64357140224508,3.8003185875730394,4.701353255041871,2.1903243038729525,4.94499879637281,0.8156091988490277,3.7888700433437164,3.8802357874382256,2.3939757247789863,1.7836466968478826,1.5865373243806002,3.2050862308693704,3.5676768293236427,3.634934662873184,3.2008908730106302,2.345539040191471,2.4394339630653894,0.0547754040169135,2.9431453908030414,2.2473628032521473,3.5424002066783067,3.040904782491769,3.4173098837161806,1.0787243177589256,2.387135984809862,4.093293565009314,1.5682395507060531,3.3283052956498214,4.4244644915597595,1.897403494665476,1.139583855225934,2.06520903908518,3.8167615797828205,0.12106164639068884,0.7995680067728483,1.0922929385520286,4.255192832836054,3.621379902303914,0.1409643857879972,4.244935609092984,2.748806198025032,2.0229229928827106,2.68986529548879,3.044412630012654,1.006158006077268,3.6826474677418086,1.618275090532224,4.301641975005742,3.868692446354708,0.35963124900991295,1.7238164678090084,0.3181588026021742,3.641094163634855,3.2992927553364195,0.20787958171516796,3.4859842441908464,1.1633429038838983,1.4141701531559425,1.685659012264925,2.3438514733829576,4.62735314190832,1.0381954459801956,0.8607901687736474,1.6147341765523615,4.760866402797498,0.9182557103062672,2.6141947391151077,1.411529896835353,2.5181252537751586,4.2025404880598565,2.9789226171242476,3.2173572212028576,3.4901364157339,3.0531514220317346,0.18551225695430107,0.11696037751360633,0.023343270390895343,0.1480595757334402,2.916356939556609,2.4056005004923584,3.8675625602494423,1.4914985393897762,1.7812985218635935,3.7668592573263404,0.9261600389215607,0.22390551054128238,4.609288246767429,3.7085977696511496,3.3210891030874103,3.037918990384539,0.4110380673170344,0.9228140314624866,4.185436993051916,2.114363394658003,2.463959176393847,4.657739338423418,4.358537126730088,4.994715503040873,4.333487914895404,1.2950993420757917,3.4898459350169864,3.067992952547247,4.529419518307913,3.370899298990895,1.0681547748615594,3.6900914208588844,0.46428384421491664,4.499186762344893,3.3350975340800035,2.808375165573217,4.544015887385566,0.6977354434156025,1.3394093531995144,3.6627498664198512,3.5645903501252283,1.5349095752764663,3.4065130884598083,2.14454539418841,1.8248854036011297,0.9946557580841608,2.6461846556737347,0.27390526817274274,3.2592136814698627,3.2579318499608565,4.373832417502971,2.1834255914218548,0.4981481967665857,0.3054947593861923,1.992527469961759,4.8451523937482275,2.9865055805939553,3.3637734020536634,2.6997584291642296,4.097540622781596,1.5898435664086097,1.4679809118571618,3.231598174462933,4.341547338944637,1.7277449279695323,0.5629516206816154,0.45907761320588936,4.948420167272129,1.9719086826854892,4.096300152607658,3.61821786672344,4.1186426047589215,3.897078832296631,1.8097993352019104,4.884285605346338,1.0450906575990415,3.6415984562495995,4.197209996846169,2.5162465485237018,4.646314989860829,0.8763552565360577,3.8129061927985495,2.025435506310278,3.1091867566750198,0.363062816966534,1.4745963015721264,2.8722105477779944,1.4184325554811894,0.4316177091057416,0.626837701867965,4.2139100326706815,3.5115286642943144,2.7924840418427586,2.4535005684573874,1.177952865951667,0.8784827855128186,3.8638461091019205,3.518654809231483,3.383953901725749,3.3914830386255277,4.107076864930379,3.972754118865962,4.252298898043694,3.6863908641017784,1.4939843024432164,1.1457944624300542,3.8158600834636847,4.120805229914798,4.379950659215456,1.3651348158182752,4.314701546792032,3.41437422918877,4.424234505758866,0.5603394113448668,4.036226458324334,3.0758672905727016,3.8906090361085544,0.8005937446498768,3.9977153072622773,4.089236450264249,3.3203238621606834,2.9409494041401363,2.0698256621665942,4.834825206179747,3.4712890644688743,1.8749731740380338,0.16872738779989738,3.6093058648827894,4.564256119273197,1.6982892983350528,2.2722797469092617,4.9918469015599864,2.08376766358401,3.7623676178422527,1.9218436412481155,3.180606367042854,0.8589955435854091,1.6964483790166207,4.778893309851613,3.019429903412071,3.834714443186029,4.140265567934934,3.697810421045442,0.09284576006427958,4.020009419708769,3.3791235897709972,0.6772049320430407,3.671802052991099,1.1862888692484819,4.1686636633652405,3.0422405189785087,4.18808362576341,4.008984738167467,1.9081812372338935,3.2444212859480714,4.724953596704882,3.5428839368708607,2.73532278486302,4.054332291705498,1.2015268045559235,4.413146208343654,2.0614425055820074,3.7473713848655255,3.4993421647228287,4.551569527126724,1.888521953184995,4.263085883767755,3.3111696181632766,3.049858741377017,1.0624665115605703,0.33727796618389316,0.7970702701705867,2.715449666819607,3.617565074070934,0.3719678965563822,1.6234165658550548,3.0300262026018387,4.174965938298176,2.6654962158995943,0.18680231355685528,1.816834378937171,0.5339955129582186,2.9530807919701174,0.8517930891870706,2.9759202898869885,0.9868073805852151,0.0401510647461234,0.5334998605306807,2.928484060796628,0.27828274894721505,2.287028356033166,0.8255266761956748,0.3196609220386415,3.9037007419446734,4.346879592791782,1.5311477163062204,4.3948672873142876,1.5969424617845362,4.027085376069718,0.6032316693673245,0.587048554051216,0.045543678632399276,4.598719852542067,0.20583228425700595,0.04783689381976042,4.5302073056121035,4.961095593027007,3.716617297272826,3.8473589356924265,4.590239891029527,2.4773477937289154,1.2259857669470786,3.4589312602944577,3.0335832301627477,2.5978822639473442,0.312071398491508,1.3418154469973032,1.32028312711728,4.750615150784833,4.321364315502718,0.05120135865371411,2.4078097781390992,3.4073984414334255,0.9016033243558297,2.519473127798817,3.1774488777038092,2.9535020647173207,0.6306376035642591,0.31664048172960646,3.0583215791830156,1.6365346098545919,2.3035691771127764,1.809478778622653,3.996658906696491,4.187532246014843,2.500900007234812,4.6891880228557525,2.1058668426865825,1.016458530551586,3.829456666242633,1.0860334928319593,1.91775452320878,2.201834842864888,2.3694089464476176,3.887340996709522,2.6276256344381146,2.8770020790773145,3.4483990483814786,4.240238438975399,3.2696195974754283,1.221055871766803,2.62224361066807,4.788931072601418,2.8444713199832874,2.3124765972263406,2.480001986778879,0.7089442992689798,3.441190295816159,1.013107292283486,3.592458350792472,0.892730445339297,4.044460834567676,2.2018752010262412,0.21203491209953906,0.30150609047514876,1.5548653226018172,0.4470904445167223,4.7217261100801835,0.054627922583470045,4.150061418457941,0.9945444064132847,0.8021202831802321,3.615600520667371,0.77707752705787,3.1262194263699206,4.898219998754958,2.9471935887598932,0.038336702414115686,0.1938736488600068,0.5940073591041151,3.59527270970308,4.280999129288395,2.624619967093208,4.197974039747577,2.8563868594541364,0.44961992971646936,4.2976934877605775,1.53827905195427,0.6412768711993355,1.231321516955478,3.9637076012494488,1.9284976913412566,1.7628555897693554,1.3528529900594521,3.521926754426279,0.5418504217927045,0.874547083078272,0.7444488214958167,4.380582937833962,2.6726095133487417,3.476551728822972,3.09514949394622,1.6514143133059067,0.7857263129698744,1.4102711331298767,4.571587960239754,4.716377243942072,1.467440428510699,0.34977508366847543,0.620831312990795,3.7107102267747196,0.56492891489059,4.546170086879781,4.767313693327492,1.830982175568664,4.671090682931439,1.4667173063023087,1.6973646846060109,3.526034698451176,2.8865371332609713,0.7853067719224227,1.2071977540167467,0.5522164228366877,4.3963731762222205,3.962805460251393,4.081223251106061,0.5106181863905424,3.7652863161135643,3.1690269324995004,4.7526632629903895,4.0948300647080895,3.193933643321346,1.8622751435303608,4.070090387821951,1.8331503265983518,0.1899370807638745,0.9495577374812381,0.8524065350697307,0.9022048272433125,2.0464314211004075,0.11286923876137389,2.197088122052453,4.380963408173766,0.2314598117118738,2.429542553945543,3.977208957018984,1.455148600068945,1.0282135078055743,1.1196314133994556,2.69736420547381,1.8015431425817574,4.556796594449969,2.1694558532943664,3.5302079155387145,2.10911992843097,3.6849171779722956,1.9005055099832135,0.7629934189936183,0.3607408612182128,1.3819648224043912,2.2187122618788093,1.9722513650658424,1.2456165686013831,2.0033540235589964,3.4421236172994165,3.054562772919003,2.2597626797161996,0.06580406297616692,4.502022025738369,2.7841613623978665,3.7313731196318587,1.0517751918225537,2.6647486817342303,0.11490471536312441,0.42298930004386004,4.751202500753642,2.6612159354761946,1.7958091827124678,3.5298045729140606,2.8015446270795543,4.6955827702813,2.943648947121803,3.965603135780489,2.23855078066437,3.878895337066175,2.6973350734840764,4.425889404423677,2.6606650264534872,2.6597402761217506,2.6071319354809477,3.619307101412026,0.8401439292144874,2.015849030315625,4.448659149445278,4.11140290823675,1.071615636386014,0.44884354864410336,4.517186612383939,0.3350209191385045,3.049088546803498,0.11219928783662403,2.5479887895774067,2.8536095723812216,1.2854433885511518,1.4851573058069933,3.888731547603248,4.041503010424293,4.831339060822609,4.3398166144753025,3.2714203564389654,1.3736285311431429,2.629373460560985,1.3540816797449418,1.068025225550484,3.4547577676758925,4.758183413889166,3.501958164522617,0.37456078432430817,3.830303287083604,0.3651965580626615,2.7395976275636214,4.181497350510592,0.2062287978739774,1.6386120201725318,3.2114915515016804,1.6251589186364346,4.731180488730792,4.924430892692026,0.6187731564998655,2.572018349903009,2.4321798338614666,4.471061392442764,3.1847334733056942,0.006034493731826851,3.3996617396455653,1.3804053806544303,3.3160026311005075,3.000553739735855,1.2650414783178576,4.65373201518023,0.36471152892543324,4.643734103859676,1.1688211296370643,3.9508808818342187,4.269631043987101,1.2466983881956417,4.555365250218229,1.7247378654056877,3.650498211488155,4.876067036105169,2.607738445185246,1.7011831447851555,4.639439364939781,3.5287546369566183,3.1044408325530704,4.474893082783926,3.2571943132770578,0.8073036501876563,4.861701751003937,2.2490512613239066,0.3294133836644375,4.501152930963823,2.2115516951605327,3.213382540362173,3.917499959043921,0.8958392649833435,2.8277794120591206,1.058230565436311,1.6128188022833645,1.9281813793671987,2.5438891126178556,3.541862392081204,0.34753097804410604,3.0129521894589595,4.216337885969351,4.242790617044832,0.6323679894381518,0.22878727035465785,2.7914992920983206,0.8604286977456288,0.3756105889681205,0.02397848911236511,3.2971825973638302,3.9242150259270057,0.6217196247887691,2.0887114992495937,3.034303798760487,3.2154069939696517,2.584513633849893,4.726780257877525,2.9510845418598697,0.5443709905693617,2.5819846417232895,3.880952414477278,3.9683553142024577,2.2229481680926355,4.411848292159506,1.8544053023622498,3.2781838925010787,3.2854008776479593,0.011512996557008215,2.909857992259818,4.462553146541705,3.3481831771862867,0.2842432728755018,1.0119846924197728,4.56220074968518,3.4826236576039227,3.40217544527302,2.3230714070256364,3.3761166648812346,4.768019106809314,4.736415243507065,3.5093336210383885,0.10600596731420331,1.5733259058989302,4.354464946317083,3.4776562573290515,4.387600439608513,4.61550659710375,0.034506205506729115,3.1242811672703175,1.4258018607690315,0.4829914845108818,3.982252386244629,2.6837593911861477,0.9570930820476875,4.811421983335171,4.959744912851681,2.895113262057073,0.9057817440629901,2.0233886572485424,4.233416574745219,3.947635822562691,4.570681538802054,3.017848666252915,3.1191625512586905,0.030869906986370488,4.522834795383048,4.022884515716246,3.1447920024081135,0.7996327942814796,3.91066209406414,0.937255568717793,4.251447305838619,4.4709391942374275,0.034848325707552696,2.055094288555633,2.0593118308884604,3.151917471884466,1.7305289564478843,4.049420830543098,2.0367092483877034,2.8035013111333216,2.0155776969847605,2.9424528803497765,1.5023332278024737,2.3762533256767937,3.067061192030036,2.2075338247063114,0.7053156694348628,3.6389025948602374,3.443446752536612,1.515546053941882,1.41495390533111,1.5436050269433266,0.910446122823918,2.0585089421187974,2.0275128639587825,3.475268524762374,4.490118193622256,0.4837447543359119,4.331608688097264,0.5016231662417614,2.579077813264521,2.1496781612655846,4.004128960278398,4.150755541574784,2.4854885143902896,2.0643894052365583,3.5842347765309923,0.654209343223916,0.016448375707071028,0.6526038576083093,3.4890874802794114,4.6898036449866165,3.6851597084521592,1.27456626040095,0.12804110676922775,2.896790760923069,2.2781392316830718,3.9951772754464407,3.43975212674948,2.1334341091069597,4.583613972000439,3.9456695669905226,4.724332474917934,0.667334828216265,3.9089784524977658,4.16693434073518,4.0991013400080245,3.2729573122386624,3.207465054425164,1.1889758572971532,1.1174008059917506,3.34304886811759,0.8245113363629475,3.175629353795535,0.7105340452650677,2.031347461481988,1.4869078091706345,1.067345411232472,3.2792768383533453,0.4839417497403853,1.685774441197111,0.18619489012026258,1.6042928378040877,1.5392465009352507,1.3278143411198362,4.848649404760494,0.5732795951536618,1.5920371428596825,1.5182108489910673,2.2497449185691543,0.8995110314224908,1.345176488914459,3.829810995138291,2.186881475179775,2.4481170896630564,0.030363819936315428,3.25846729455479,4.948718319084563,4.255534202625797,1.6593569973058087,2.4873835908360773,4.600512296958856,1.5919702716461215,0.6565677476362208,1.086567967112183,2.4825844825106502,4.303753938138842,2.7552219725905767,2.808155617806105,0.783884792531514,4.507635800878175,0.04940758291969827,4.555863081654447,3.293039079468849,2.6025328353917154,4.42685999545054,3.3574073528939277,2.2145293395420653,2.657836513063685,4.773558970802166,1.74258714073809,2.9021051332974315,3.338505278606343,4.670901581834634,0.8167374240512271,1.273096253480569,4.519455173210751,0.31782320580285517,4.556292539712273,4.048661537738004,3.871489719536342,0.8458628166496196,1.0429108618577387,3.594609326547423,0.4443582914096911,1.7628809463242212,3.990536566238224,2.731323144251224,0.798797941148911,4.151194527900866,0.30099210047171976,3.9213876455091636,1.0299097426123094,4.971998975960652,3.8758843186785317,3.7558843361139016,0.27734473111055924,0.02496103047255005,4.263359840448441,0.45487825715373353,4.962378304271752,4.440995413200165,2.307515090683674,1.5811589874093046,4.654394397062469,2.1216045768375635,2.681176334637365,1.2052638679231864,0.4989750988246522,3.810121836510688,0.15109836659077946,1.325152442030575,0.33857029459943955,0.8751501781716664,0.6044334343368607,2.188214431212373,2.956188146283991,3.043426529885256,1.713695481896369,3.0316967332942046,4.975697877250677,2.5278178319046507,0.5379618724064272,1.9983023194047245,4.110466126215309,0.032211942106694647,0.5997796636293662,0.5404651611659772,1.9920104984107134,0.798187302998562,0.39295372889248115,2.729712028650458,4.843701584527951,1.9756630731633784,3.646337489596739,3.6159416929104236,2.9609856863564996,4.819410859946499,3.55591745570064,1.6539749079448995,2.512401867948133,2.1811043151076426,3.9088654346987095,1.0910480542033485,1.127535880519659,3.0376629408437705,4.976523434423914,1.3313037265616678,0.40945374850964833,0.8221886404682099,4.51408517086141,2.9199973566244406,1.9721976550077402,4.262226559216873,0.0719910924087741,0.6795143218155386,1.591014921409769,3.575671834579879,0.3844228272849881,4.310182273223173,2.0764776758540715,0.9320816747969862,1.840012525686946,4.881723033337991,0.8360720554826384,1.7158447514186281,3.816595677787725,3.0842463124393147,4.731540011529656,1.1567309875215537,4.88920584407409,2.6869707769254347,2.572738988015658,0.2548774584818536,0.5656017224964083,2.2968043584577513,0.7761224154356994,0.543714075757703,4.1811157892107484,0.23142221413489095,4.09488415781593,2.9690845376117716,3.4905960995902663,2.5035394440094496,2.7678189636558423,1.2478362695939393,1.3446173345067869,1.9236199342742444,4.275679330117908,2.568994022357959,4.812498987872653,0.9064836388351416,3.1951047321901713,1.6946584712186719,4.961741266511495,4.847223608763147,3.0249119148159407,3.4878583237992586,0.701577154194879,4.19514318434262,4.2763082005684625,3.8833089407989285,3.0417128615819733,0.0518797361662382,1.969247516377739,1.1425161153953445,1.8241172002606587,0.3409517411220009,3.712507388934089,0.5982987765415382,4.07290971292507,3.5375817441752733,2.250381652425366,0.6236405840327885,2.412298729491835,4.66435291577361,3.266454086975431,4.076939907454532,0.737498725718081,2.9370827526318886,4.449422780736505,4.845958374819793,2.0123063752887282,1.6091215441813234,0.4940243771353059,2.5313350312068152,0.23872659767498972,3.5761698179094434,1.1773089521314783,2.974470887258481,2.707208344412886,4.20841246192047,1.6257144207276641,4.308654242512679,1.1218210466384115,0.4530814811163153,4.8771342952059555,3.564496627672169,2.667369662947717,2.1624238152412256,0.5013620411571307,3.2599098888894074,4.926494237339485,3.628864001935322,4.675318432895849,3.985530957161271,3.828542079678492,0.3440288377150491,1.1465407767654257,1.0597940504177916,1.6948689088232327,2.321663306065722,1.0435716653824834,2.5705762129721843,4.614748194536135,0.20256350156131253,4.28322488535027,2.618714716306375,3.313563186576862,3.955808920884849,0.5994003418152138,2.4004587451987716,0.7113572117460198,4.345430419434058,1.4725444282815436,1.0620209016968862,0.6730475362161759,3.1422779634550113,1.7197360756829339,4.042678077305792,2.543119061939473,0.8120210411989004,4.2159182844812895,2.5685800118251945,2.707428921736439,4.186369655958301,4.427062841999641,4.846557147647416,1.046290226328137,2.5586867752655316,3.9257723545779255,4.164143225636376,0.8810103829197957,4.320922598187208,3.1477400895823706,3.393648512557552,2.8438948263126806,0.7625643466496523,4.259049132254656,0.30273830047580774,0.3014487700070223,3.9826305958815675,2.686194796194876,2.3794827367024176,4.69345001921373,3.1021193124047053,0.11462148075441547,2.546982314008229,0.6934217597295322,0.9432814270534795],"mu":[8.56445138611889,8.985012373744897,4.088336492214719,0.9500308386841017,8.173080330568245,9.99778390248153,2.7875191184866965,7.713671644401112,1.3833295903929588,1.7596985318530933,2.485858597604178,9.67730675397985,9.550191981037955,1.2338818944648655,9.01543119581428,4.461775853784101,1.5006261548026778,4.427127101349029,4.733073579983569,8.722139627490451,1.5711072309325314,3.133701335716934,7.215541634680392,8.008791550176815,8.732382366912617,1.0004266094428682,6.070807500796988,0.6650863377065641,9.264771586538503,6.094392453562687,4.818344191704758,5.380395608920219,2.2528200031977463,0.882804932539416,0.0758769541081672,3.391908587120387,4.889621519439777,6.237627065965778,7.7804816362024525,0.8874607407371782,9.11499310504077,1.2712809489181853,0.008179397287140233,9.89108742090174,3.441639070267135,4.328371213221571,9.917417499531506,5.6627978165574095,4.988021695933027,8.053436729460149,5.719972662690913,5.169992155627979,3.88647218448694,5.0531555164665365,0.5265482431752355,0.3302312166716481,8.930575809119166,4.879499948874515,6.860803711974204,1.6800050957371848,2.276223927985608,5.019815181008829,5.325607916885724,7.4294791199977706,3.750660240112591,5.087251834870587,8.684564903461487,8.653970594934052,8.192363010659228,3.2900135036221534,3.1333047522689284,5.810669052230681,1.8666392855343994,7.59875728686805,2.0600162946555667,8.240966079931976,1.3354369373121955,8.776203074326087,1.9637749589688491,3.892302201559461,5.0107338262004415,0.5995649577408546,7.053051597001776,6.685914785958835,8.813748491462155,9.451404442542785,7.155272254108249,7.44841080679141,8.032735486775561,5.884533737859094,2.525179667552173,9.172369433360227,5.903709943284065,7.095591958543411,8.967010275091287,8.63261014733973,5.85861765944416,9.019661057225452,2.458409212377255,7.58609974672626,8.6970838721207,5.551417330402799,4.656442891566579,5.260308299195378,8.293957641395727,3.39829619303037,7.582134365791571,5.217579464515549,4.998747436184507,8.312496379668195,1.6222613829041066,6.402175015632745,9.13677712758714,7.657076775667511,8.249557904106794,6.021860877324983,6.892447179380719,7.768429124567393,3.7482781131281095,6.352581780660625,4.317681002499674,5.037448538654711,1.1703933244709508,5.229345827051537,5.717278067213658,8.275571124475418,8.276379811484896,9.923885935087464,8.416226582426294,1.843665077222687,6.765971959133097,3.694292600591087,5.616219571803816,5.553967077954097,2.971155086572017,6.638772150228071,6.1319951781214606,0.7803333061882234,1.872405522464251,7.761269196547342,6.560417003975485,7.1194084359056315,5.214900163388593,0.972528230885723,1.9193143772367094,5.0630026788919436,2.665726030610742,5.798521427389083,4.907307582445721,5.294371479440461,0.6997637543283752,8.241680354981362,9.34527980365121,4.16132663551998,3.268182368355055,6.663405092342791,5.0846054090954045,7.736513809741117,9.342031965901503,9.274434253400834,6.279249923533858,5.459339599989626,7.800453725885035,0.9271262465763641,6.526683937180233,2.1321393586872706,4.133676284158216,5.135587384004944,5.687241756275991,1.738188597934136,4.861569528667169,0.12380597809857452,4.611988145453855,9.907837398461037,0.11879265929934935,6.280283914998797,4.848836248435189,3.884371338605954,1.2734223691718416,7.523539216359505,6.0604369193818215,0.7121436089421773,0.46990791211809935,1.5404291931868541,8.012809416406423,8.234135911963849,5.601491899958393,2.198296793185961,1.5982320232085079,2.1558290970704763,1.7193888001623647,2.400794549848906,6.151586266861857,9.82369067763326,5.777874043114446,9.977966677069707,4.45387597891421,4.185460651556873,7.072537411013449,1.7767186920828615,1.9769632237656132,9.433137977149286,0.7492003070721198,9.85776621651894,8.633108132464582,6.5947851691446235,2.3395383512862145,4.855375126007788,9.245476127437671,7.620541668177179,6.346067585608308,9.7348770176738,4.7432755937922195,9.841591156604846,5.4012501271726565,6.462857480741516,6.318449219065878,4.74371230740158,3.007272192246855,7.081051390821083,6.502457540292701,5.586486054312411,0.6541960328294572,3.6327076382481893,9.252047464328877,5.601791369413165,4.270738724473726,8.51740130941491,8.572545227643726,6.374440728116994,5.2509225741674515,8.526051614790035,5.07714798456983,2.5588959759995067,5.822121821063771,0.9891536096568609,2.1511653501911443,2.6048542468240377,3.8284423594059325,6.262281589184782,1.7373370753481265,2.8021196235661283,7.889249476443084,1.1239971612069977,3.1756704415303605,0.6329621626579707,9.97608035331079,3.8814789198290423,3.0198787492040857,9.21100412391339,3.135912085467354,0.6028980931250327,7.55725386395536,4.272028154545091,7.543351560010376,0.9545196894230945,1.3998745420902337,2.1783446751043978,0.8327737996317652,0.05727227452702932,2.508361373338448,4.863266589620315,0.07492149456787889,4.80432117191971,1.0383923311874832,3.513411471419632,8.90919692876588,4.051691869251906,6.197618986283537,3.966611915941771,8.996367357245001,5.564715098844681,3.040442225784956,6.009649870027072,4.853611037263592,8.535802600220705,8.622860859439854,9.338804829379653,8.645807763720903,3.3167743975744424,7.322427903079143,6.24173943555043,3.017764709577304,8.779030133035075,5.952535589899668,3.9690435484054887,1.1459663033148204,2.8498163364755835,6.594472001191787,6.020307930022259,6.563533163320072,1.2595008873063795,0.1332162686584315,5.423353866598677,3.2207705693500555,9.103531028276384,2.427737494233677,6.209053898729378,7.438900913285602,0.3168958624130158,6.508465066981817,2.753866348440386,7.891846613548221,4.630423843379752,1.3195929288218156,7.660661386985952,0.4752625298093882,8.91398966770473,4.792569746458531,0.8716101689993705,1.9626056580020301,0.8491012501126383,4.496807601396311,5.587489059887787,7.82669325870115,2.336829902417581,6.864303148577868,8.647403335251711,8.46914735596391,8.514970083961543,1.4274848289929243,3.4653513830385507,2.5059323300848635,1.7285247242088442,2.6396337544005877,3.095925097213177,2.9721780244475493,0.8426674730481065,6.634236441006644,3.5641719342382183,1.1263866067488282,3.330759506241019,4.93650927478376,7.758774580833084,8.79520413691635,4.084872054176265,6.084362906296392,1.4223302426522122,4.355470472317641,9.734134180919916,6.573037788292022,4.06390504827618,5.115584197974707,6.560431209208679,9.4789045260055,7.495152005702231,8.191990123083546,5.376183216557977,5.421471583302731,4.823090826258943,1.552961128368393,6.534546690720376,9.922542096315755,8.01366200581728,6.506260853110277,0.6016080899522636,6.3629024094330315,9.918404264453905,0.051307945081668915,4.864483037983927,5.994945263700928,2.1317953136070056,7.000068806294307,6.476491848066159,8.126461574868571,9.299049368498448,0.49048581543642555,8.757105449218184,7.394719958689233,8.2807816444817,8.643063503539476,9.380232192848732,8.831057308989216,1.0960252578636687,5.633588756992831,1.4241786943245804,6.07692688230113,5.888126881404789,8.211867477909658,0.2327762082205842,7.222463211384367,9.423288779562384,4.38549745821299,0.7629410147442894,1.3523697332549012,4.0046964554633435,3.4552365239878435,0.2009996915106882,7.8304021065106415,2.4154098368281285,6.7130579839729565,2.99285532306395,2.9184037282096686,1.3004814797774222,3.889116634745502,4.767019261251364,9.215319286732269,4.702469237835061,3.859608428132071,2.940311410086367,1.9690915103126216,7.705577434422466,3.8425063754409616,1.3061313423139698,7.16433138330472,1.3942829623384778,5.9398838454301135,2.7659250744676966,9.931885357489938,5.9424930786473045,4.370915635809536,1.5577751922085592,3.398435822718666,5.2495455151035415,8.813764415867919,5.837732132403788,0.32364677904943573,0.025063742040336567,5.861385199058344,2.103071703150059,2.1561210340061177,0.7796130111426325,2.812956781575342,9.380706965519181,6.239691102866669,6.831999390096907,6.748441097561788,1.654863337019974,1.6395489172779465,5.7597404318253975,3.7764224437203864,8.739455826237869,8.241441678897896,2.144737641870551,5.724520064102134,9.736247404533165,4.551365374773139,8.248589676159293,9.703749813279094,5.000452971892388,2.941484484981083,4.030167799359871,3.823682465967011,2.325219126234821,1.667899012984102,4.147708520363942,8.800506436958502,1.4126117533243,1.6599144851158831,6.7708845555262,0.9131396928562996,7.217809474579293,6.7670239877041745,0.6828598330122637,5.22444238814211,7.6589399643387335,9.068983798614989,7.371241851176505,5.467837045614495,3.833462964938217,6.2621740999186,5.03643015895697,2.813981468326603,2.9261909962739296,0.23670575042481268,3.2154387470286316,6.252170751673245,0.8265645778517006,2.6395748778669192,5.840339629533615,4.590704820222187,7.513677878254121,0.8700589512839674,2.1591687589673314,8.99248482346167,9.267259604492683,6.739229019791142,1.2917804115980958,8.330381304310519,5.348914172416244,6.340802974272668,0.41381392561627317,3.6454501703327957,1.9142267311267092,3.4823024205569353,3.6429676738895833,5.419266671923777,1.1323002091657797,1.919697131349285,4.565467270958563,7.7311859684654465,8.643410935942196,3.84936842946489,1.0021703321509934,1.4748784854455743,8.15976511137617,7.182497829018066,3.3593391495045655,2.643450373264069,7.602412052121743,5.384868099948486,4.2221040420603355,3.7901875439521127,8.203572013735155,7.660896723494782,3.069428249396371,7.051821720715541,5.055116133604088,0.8341055753274085,3.121713320747155,8.189907665137792,2.607682178878614,7.3978914091136305,7.933160901341337,9.980101118040245,7.178009787190119,7.296333254711045,9.36628536102753,4.35619021354114,9.764179472834586,1.3578282645648665,4.246210794862646,7.2033312793796656,0.9538786978523373,7.700587000338677,0.10705004810348973,6.86009982927213,6.675716330738259,1.1469698774146253,5.9908260531332225,4.579226016310969,5.036219992808542,4.927417668261986,2.9403734738834797,3.828408838560693,3.1757616390707777,9.089318205703904,8.20158100509978,4.602497665448064,7.733173014728701,5.280429217340359,9.956442628048263,0.6641715729931863,1.5442830550056597,5.5347358771540645,5.708538663584342,7.391254794515039,2.989754092518364,9.472626029291394,6.81581031614148,9.342939772824142,1.3130823161042215,8.93234667767974,9.443154703627673,6.029953150259793,6.826949920771488,9.327587224915968,1.058887478237578,8.122440256816649,6.768446861794677,6.393021970984599,6.680788273798712,8.998482218410429,2.8610357220530225,8.325205359666413,5.498743921957143,4.217494611672237,1.8157375627513583,1.125231807524274,7.1687406415858845,1.151497039998155,3.6940740753008106,8.535922067839062,1.2001453070492074,9.242681186499013,8.354534125067847,2.835954879538265,1.0793997297698232,6.481442870001269,2.0534647576633036,9.236461516296428,6.2020895211405325,8.183943917364429,7.563101592845749,9.275869799090792,4.927637061658194,9.3179437097868,5.273159384765298,0.31877976061078783,6.306968373066917,7.22008912390149,5.818644592315827,1.3042980232807566,6.661079905187806,9.758214302121646,4.457075886049342,7.3438284687338795,0.5234198379675159,7.844785308254176,1.7635422500121445,2.2328286672315456,7.916077032562447,1.2275649602344907,9.555178359010615,0.8875572501250084,0.043437074588654756,5.950933352025327,5.580460397073727,9.068877906952707,5.409751120506692,2.0576699838714996,0.3222676657767698,9.721692097257739,0.3049954086681361,0.9135167251193699,4.861188041507516,6.595902171189469,9.66854587785627,5.506334376875626,7.204103110065083,6.5771950143341185,1.5474983763796701,1.347476537992478,7.763089421335437,4.091015211250464,9.032257353564813,4.115360564348293,0.9290896894835243,1.0119679204095178,8.717270752940944,4.097131826486287,3.465549212537402,1.8063372077620676,2.744270145887624,7.0578872332229885,8.87489878462979,1.0209153137687133,9.20821475585998,3.9968457129503854,5.10782948609714,1.261307086488621,9.21048749965394,4.59921207088515,2.992439760750274,0.9775493436661797,0.44548141562233523,5.908879246536401,4.169508330906401,2.742959531835154,0.43545166905724075,9.34266612282634,8.876322050745134,1.982135858278573,0.2118302913939374,8.702066186245855,5.284493168507649,5.242920832311279,2.873611891635517,7.044528552724378,0.37032605412210096,5.660422153269005,2.536715118284183,1.4445865989890483,6.3801899356135605,9.045456046736927,5.8360062149898155,4.556310272551625,9.759237520282182,5.613260691244379,7.214122702004642,5.488322335461982,9.945968186292372,7.407678941155438,9.916754081358262,6.862380344897323,9.719463005672806,3.386743323898571,1.7499503379172743,6.528665875107298,6.8180945441429985,4.057807921152355,0.6813017967806334,1.5299889179810244,5.879973431374967,5.214333085879883,1.5745137103369844,3.579857478857398,0.6466267171426887,3.7569936728099718,2.3100611181932806,0.8204745358225951,5.2877259761994555,7.430879455997768,6.0450378122196895,6.660712986401691,8.670019359621726,1.0474137510742554,4.58745871680059,1.7436467715168957,2.2034737169587038,2.308610907840345,9.925849913638382,2.8834980572782065,5.669584584137168,4.124780630674712,6.307740236213126,0.18360336836537483,6.936317533081482,2.3051518540534333,8.512835180192592,7.568150995181366,2.088470903231261,1.4169888479614778,7.496169640804553,0.2916945615992761,4.22601508168624,0.05342120349767887,3.0561410322278593,8.255182409493344,6.612255722107525,0.6397349266885666,4.263789410534329,9.550482826048881,2.693102864225825,7.083507375322114,5.455224594397288,0.7211225815871547,3.6559460440373215,0.6263118482653174,3.722272110266589,1.0115690647657472,6.625528043210682,2.8687387188439906,5.107316667816974,7.90277598079153,3.0997070243041036,3.2218862473835896,5.975569780267939,6.2439330419303225,6.0925008140799,7.528277084082465,4.221470238949394,7.025365074215928,9.594662036227476,8.1228892145691,7.491456223647837,4.768903372004001,7.977831695222735,8.334637021903967,1.570381086606747,9.930313863696938,4.908792008456695,0.3981110405136712,2.591225287245915,6.877669929591724,4.62362733231406,0.24420300526748928,2.8295402185074825,2.8632253731298274,5.266500538070296,7.009496666371138,7.529978740828391,7.920008414225439,4.029467769914945,7.94962425485938,6.620587950097869,8.61682741933362,2.0475374729622176,8.949050782626786,1.5048010700830639,0.08169969646663056,0.06085886920235595,5.274606200000762,2.8415024462585747,9.8949374669754,4.278705563298262,5.252050957264764,7.715896001455165,2.618898347081897,5.550314454986111,6.15550038251887,5.365141998751753,9.736309018991477,6.611748584168476,6.989815585703303,3.5516920860833823,3.1985915217035554,9.777073375366847,7.281134133137266,8.4214819829658,1.1320873357160055,1.0281282126934,5.092255145264839,1.6108732900762024,7.302127795861944,3.895459238443033,4.504937454609519,7.489356849356841,6.681353112566906,3.5831035669646605,8.800207552292695,3.790923536812212,3.701038104362684,0.7994302755158511,0.6744826713610452,9.138401582441054,8.384203239710759,8.462565741108328,1.887061597159525,6.28300302627125,8.652135715363896,2.052038921289412,9.022953720266592,7.1403085402454085,0.2112356916351854,5.143695903181415,9.487074823448458,8.469622879971814,3.1193017175495963,0.22201947262748156,2.106532342259102,0.010164418663325403,3.6393472781087666,5.5543931687206545,4.234929235384477,2.3853098907362047,1.2326737953360278,0.44186281541573447,4.46019176438292,2.1844224192343265,9.436025713423232,7.3086804149701585,1.8696532404571342,2.853185369289608,1.151577561408479,9.789209261475323,6.020176441990113,5.895766605200478,9.925915556518216,7.5365803746595095,1.5046507894959293,5.3620579398249335,6.703777162016332,7.345260759685653,2.3114214399958666,8.065034901606126,6.0956520515438095,1.1121505763688777,1.2730203034252918,8.001638470543233,2.083516534290022,6.991191460845347,4.6741022478308025,4.40409659609305,4.251149105215162,1.2814684348266558,9.93384502894447,2.5222730074840305,7.723693236002318,1.9992754055323303,5.667437902479106,0.785961889386082,0.6856127566719405,0.0024463642854732903,0.46695380882868065,8.902707303498108,2.638653633857899,8.182306609377347,5.324243151848691,2.700420291184027,6.662384025743943,7.350504081868118,9.271951089917383,7.327514954594272,6.6496377493227214,4.886811194322529,4.766241062554339,3.1404308256591262,4.6726550086518,9.638444796062542,9.364048244783001,2.842830317728484,3.045865207652143,0.6834379290994974,3.9607324828432167,1.5430571490433231,6.960005934524238,3.237734736928457,4.890710137369396,6.209312412187529,6.6961198372012,4.401973500950498,0.6715922894917159,6.839392643941212,0.9325307753004486,7.251281588064302,3.6623604926531717,1.5818324350912993,0.3000201214167597,1.5433463680263393,2.562135419136744,2.7796727921342046,2.232071343274684,7.065528648327117,5.549485424878158,2.3279758338112577,7.185268370782691,1.8165201064116343,7.103694610103794,7.714035434266466,1.4232833792547095,7.743805855366885,1.035849306865002,4.839403434583945,2.9873873684540886,0.7008015264916478,7.739354903615556,6.008097389791754,5.385085062960844,9.502725788206632,5.891926043384938,2.26553788891239,6.921184612972649,4.202936509231474,7.61730794560669,4.383703076330283,5.294322282082149,3.98656495495592,7.278633491429698,4.494219154226147,4.485785599064769,6.400687456955973,0.21048239343212094,9.3462693444304,1.6426377964607952,4.630666513687527,0.46157537230566703,1.4908837425494803,0.1337154486683212,9.504474673285257,2.862624974292207,3.6023111487245663,0.8689308471043211,9.134953653304676,6.268671668786268,1.4672413840539766,9.709070435541529,5.183731913525847,4.080123780729544,0.030914391811243114,6.0293341571726655,8.463076963900253,0.8251177845083957,4.1609317702593485,5.635692590523798,6.299876175074443,6.086264243879384,3.778453710526002,9.429237169351989,0.5451076739687766,4.3183817123825,5.860509465664146,9.454291244732602,2.3983241679559586,7.277908319806972,6.259762438372332,4.629495595533751,3.6156301345541486,4.45665541997486,6.893339645811514,3.6245383065331294,2.6860081787765844,5.649654240148145,1.9947462324811371,0.2531106854568699,0.6817926756214754,4.552006078460204,5.939320623573892,6.977478805733625,8.223318564180413,8.91655460144432,3.3120823271486066,0.04067629844397569,8.985289961341888,5.83960098735512,9.114968431437534,4.451927982237674,8.615395569410943,2.862166748057333,0.3981306889624481,1.9697677591065998,9.158977172112621,2.480598633366504,4.570140106568601,8.506492206809666,5.9379800342775475,9.796283405230326,2.072248256630216,7.374747047434516,0.6753542405693547]}

},{}],99:[function(require,module,exports){
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
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `b`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `b`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `b`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, 0.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var b;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	b = positiveMean.b;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], b[i] );
		y = pdf( x[i] );
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

tape( 'the created function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var b;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	b = negativeMean.b;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], b[i] );
		y = pdf( x[i] );
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

tape( 'the created function evaluates the pdf for `x` given large variance (large `b`)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var b;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	b = largeVariance.b;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], b[i] );
		y = pdf( x[i] );
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/pdf/test/test.factory.js")
},{"./../lib/factory.js":93,"./fixtures/julia/large_variance.json":96,"./fixtures/julia/negative_mean.json":97,"./fixtures/julia/positive_mean.json":98,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":254}],100:[function(require,module,exports){
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
var pdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pdf` functions', function test( t ) {
	t.equal( typeof pdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/pdf/test/test.js")
},{"./../lib":94,"tape":254}],101:[function(require,module,exports){
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
var pdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `b`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `b`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `b`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given positive `mu`', function test( t ) {
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
		y = pdf( x[i], mu[i], b[i] );
		if ( expected[i] !== null) {
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

tape( 'the function evaluates the pdf for `x` given negative `mu`', function test( t ) {
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
		y = pdf( x[i], mu[i], b[i] );
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

tape( 'the function evaluates the pdf for `x` given large variance (large `b` )', function test( t ) {
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
		y = pdf( x[i], mu[i], b[i] );
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/pdf/test/test.pdf.js")
},{"./../lib":94,"./fixtures/julia/large_variance.json":96,"./fixtures/julia/negative_mean.json":97,"./fixtures/julia/positive_mean.json":98,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":254}],102:[function(require,module,exports){
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

},{"./main.js":127,"./polyfill.js":128,"@stdlib/assert/has-tostringtag-support":20}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":129}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":129,"./tostringtag.js":130,"@stdlib/assert/has-own-property":16}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":115}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){

},{}],133:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"dup":132}],134:[function(require,module,exports){
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
},{"base64-js":131,"buffer":134,"ieee754":237}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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
},{"_process":244}],137:[function(require,module,exports){
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

},{"events":135,"inherits":238,"readable-stream/lib/_stream_duplex.js":139,"readable-stream/lib/_stream_passthrough.js":140,"readable-stream/lib/_stream_readable.js":141,"readable-stream/lib/_stream_transform.js":142,"readable-stream/lib/_stream_writable.js":143,"readable-stream/lib/internal/streams/end-of-stream.js":147,"readable-stream/lib/internal/streams/pipeline.js":149}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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
},{"./_stream_readable":141,"./_stream_writable":143,"_process":244,"inherits":238}],140:[function(require,module,exports){
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
},{"./_stream_transform":142,"inherits":238}],141:[function(require,module,exports){
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
},{"../errors":138,"./_stream_duplex":139,"./internal/streams/async_iterator":144,"./internal/streams/buffer_list":145,"./internal/streams/destroy":146,"./internal/streams/from":148,"./internal/streams/state":150,"./internal/streams/stream":151,"_process":244,"buffer":134,"events":135,"inherits":238,"string_decoder/":253,"util":132}],142:[function(require,module,exports){
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
},{"../errors":138,"./_stream_duplex":139,"inherits":238}],143:[function(require,module,exports){
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
},{"../errors":138,"./_stream_duplex":139,"./internal/streams/destroy":146,"./internal/streams/state":150,"./internal/streams/stream":151,"_process":244,"buffer":134,"inherits":238,"util-deprecate":262}],144:[function(require,module,exports){
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
},{"./end-of-stream":147,"_process":244}],145:[function(require,module,exports){
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
},{"buffer":134,"util":132}],146:[function(require,module,exports){
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
},{"_process":244}],147:[function(require,module,exports){
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
},{"../../../errors":138}],148:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],149:[function(require,module,exports){
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
},{"../../../errors":138,"./end-of-stream":147}],150:[function(require,module,exports){
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
},{"../../../errors":138}],151:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":135}],152:[function(require,module,exports){
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

},{"./":153,"get-intrinsic":228}],153:[function(require,module,exports){
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

},{"es-define-property":213,"es-errors/type":219,"function-bind":227,"get-intrinsic":228,"set-function-length":248}],154:[function(require,module,exports){
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

},{"./lib/is_arguments.js":155,"./lib/keys.js":156}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],157:[function(require,module,exports){
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

},{"es-define-property":213,"es-errors/syntax":218,"es-errors/type":219,"gopd":229}],158:[function(require,module,exports){
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

},{"define-data-property":157,"has-property-descriptors":230,"object-keys":242}],159:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],160:[function(require,module,exports){
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

},{"./ToNumber":191,"./ToPrimitive":193,"./Type":198}],161:[function(require,module,exports){
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

},{"../helpers/isFinite":206,"../helpers/isNaN":207,"../helpers/isPrefixOf":208,"./ToNumber":191,"./ToPrimitive":193,"es-errors/type":219,"get-intrinsic":228}],162:[function(require,module,exports){
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

},{"call-bind/callBound":152,"es-errors/type":219}],163:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":221}],164:[function(require,module,exports){
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

},{"./DayWithinYear":167,"./InLeapYear":171,"./MonthFromTime":181,"es-errors/eval":214}],165:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":212,"./floor":202}],166:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":202}],167:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":165,"./DayFromYear":166,"./YearFromTime":200}],168:[function(require,module,exports){
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

},{"./modulo":203}],169:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":210,"./IsAccessorDescriptor":172,"./IsDataDescriptor":174,"es-errors/type":219}],170:[function(require,module,exports){
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

},{"../helpers/timeConstants":212,"./floor":202,"./modulo":203}],171:[function(require,module,exports){
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

},{"./DaysInYear":168,"./YearFromTime":200,"es-errors/eval":214}],172:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":210,"es-errors/type":219,"hasown":236}],173:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":239}],174:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":210,"es-errors/type":219,"hasown":236}],175:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":172,"./IsDataDescriptor":174,"./IsPropertyDescriptor":176,"es-errors/type":219}],176:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":210}],177:[function(require,module,exports){
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

},{"../helpers/isFinite":206,"../helpers/timeConstants":212}],178:[function(require,module,exports){
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

},{"../helpers/isFinite":206,"./DateFromTime":164,"./Day":165,"./MonthFromTime":181,"./ToInteger":190,"./YearFromTime":200,"./floor":202,"./modulo":203,"get-intrinsic":228}],179:[function(require,module,exports){
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

},{"../helpers/isFinite":206,"../helpers/timeConstants":212,"./ToInteger":190}],180:[function(require,module,exports){
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

},{"../helpers/timeConstants":212,"./floor":202,"./modulo":203}],181:[function(require,module,exports){
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

},{"./DayWithinYear":167,"./InLeapYear":171}],182:[function(require,module,exports){
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

},{"../helpers/isNaN":207}],183:[function(require,module,exports){
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

},{"../helpers/timeConstants":212,"./floor":202,"./modulo":203}],184:[function(require,module,exports){
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

},{"./Type":198}],185:[function(require,module,exports){
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


},{"../helpers/isFinite":206,"./ToNumber":191,"./abs":201,"get-intrinsic":228}],186:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":212,"./DayFromYear":166}],187:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":212,"./modulo":203}],188:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],189:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":191}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":206,"../helpers/isNaN":207,"../helpers/sign":211,"./ToNumber":191,"./abs":201,"./floor":202}],191:[function(require,module,exports){
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

},{"./ToPrimitive":193,"call-bind/callBound":152,"safe-regex-test":247}],192:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":222}],193:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":224}],194:[function(require,module,exports){
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

},{"./IsCallable":173,"./ToBoolean":188,"./Type":198,"es-errors/type":219,"hasown":236}],195:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":228}],196:[function(require,module,exports){
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

},{"../helpers/isFinite":206,"../helpers/isNaN":207,"../helpers/sign":211,"./ToNumber":191,"./abs":201,"./floor":202,"./modulo":203}],197:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":191}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":165,"./modulo":203}],200:[function(require,module,exports){
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

},{"call-bind/callBound":152,"get-intrinsic":228}],201:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":228}],202:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],203:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":209}],204:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":212,"./modulo":203}],205:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":160,"./5/AbstractRelationalComparison":161,"./5/Canonicalize":162,"./5/CheckObjectCoercible":163,"./5/DateFromTime":164,"./5/Day":165,"./5/DayFromYear":166,"./5/DayWithinYear":167,"./5/DaysInYear":168,"./5/FromPropertyDescriptor":169,"./5/HourFromTime":170,"./5/InLeapYear":171,"./5/IsAccessorDescriptor":172,"./5/IsCallable":173,"./5/IsDataDescriptor":174,"./5/IsGenericDescriptor":175,"./5/IsPropertyDescriptor":176,"./5/MakeDate":177,"./5/MakeDay":178,"./5/MakeTime":179,"./5/MinFromTime":180,"./5/MonthFromTime":181,"./5/SameValue":182,"./5/SecFromTime":183,"./5/StrictEqualityComparison":184,"./5/TimeClip":185,"./5/TimeFromYear":186,"./5/TimeWithinDay":187,"./5/ToBoolean":188,"./5/ToInt32":189,"./5/ToInteger":190,"./5/ToNumber":191,"./5/ToObject":192,"./5/ToPrimitive":193,"./5/ToPropertyDescriptor":194,"./5/ToString":195,"./5/ToUint16":196,"./5/ToUint32":197,"./5/Type":198,"./5/WeekDay":199,"./5/YearFromTime":200,"./5/abs":201,"./5/floor":202,"./5/modulo":203,"./5/msFromTime":204}],206:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":207}],207:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],208:[function(require,module,exports){
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

},{"call-bind/callBound":152}],209:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],210:[function(require,module,exports){
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

},{"es-errors/type":219,"hasown":236}],211:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{"get-intrinsic":228}],214:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],215:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],216:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],217:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],218:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],219:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],220:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],221:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":219}],222:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":223,"./RequireObjectCoercible":221}],223:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],224:[function(require,module,exports){
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

},{"./helpers/isPrimitive":225,"is-callable":239}],225:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":226}],228:[function(require,module,exports){
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

},{"es-errors":215,"es-errors/eval":214,"es-errors/range":216,"es-errors/ref":217,"es-errors/syntax":218,"es-errors/type":219,"es-errors/uri":220,"function-bind":227,"has-proto":231,"has-symbols":232,"hasown":236}],229:[function(require,module,exports){
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

},{"get-intrinsic":228}],230:[function(require,module,exports){
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

},{"es-define-property":213}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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

},{"./shams":233}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":233}],235:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":227}],236:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":227}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{"call-bind/callBound":152,"has-tostringtag/shams":234}],241:[function(require,module,exports){
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

},{"./isArguments":243}],242:[function(require,module,exports){
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

},{"./implementation":241,"./isArguments":243}],243:[function(require,module,exports){
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

},{}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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
},{"_process":244,"through":260,"timers":261}],246:[function(require,module,exports){
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

},{"buffer":134}],247:[function(require,module,exports){
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

},{"call-bind/callBound":152,"es-errors/type":219,"is-regex":240}],248:[function(require,module,exports){
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

},{"define-data-property":157,"es-errors/type":219,"get-intrinsic":228,"gopd":229,"has-property-descriptors":230}],249:[function(require,module,exports){
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

},{"es-abstract/es5":205,"function-bind":227}],250:[function(require,module,exports){
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

},{"./implementation":249,"./polyfill":251,"./shim":252,"define-properties":158,"function-bind":227}],251:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":249}],252:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":251,"define-properties":158}],253:[function(require,module,exports){
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
},{"safe-buffer":246}],254:[function(require,module,exports){
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
},{"./lib/default_stream":255,"./lib/results":257,"./lib/test":258,"_process":244,"defined":159,"through":260,"timers":261}],255:[function(require,module,exports){
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
},{"_process":244,"fs":133,"through":260}],256:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":244,"timers":261}],257:[function(require,module,exports){
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
},{"_process":244,"events":135,"function-bind":227,"has":235,"inherits":238,"object-inspect":259,"resumer":245,"through":260,"timers":261}],258:[function(require,module,exports){
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
},{"./next_tick":256,"deep-equal":154,"defined":159,"events":135,"has":235,"inherits":238,"path":136,"string.prototype.trim":250}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
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
},{"_process":244,"stream":137}],261:[function(require,module,exports){
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
},{"process/browser.js":244,"timers":261}],262:[function(require,module,exports){
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
},{}]},{},[99,100,101]);
