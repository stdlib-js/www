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

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './float64array.js' );
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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":14}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var builtin = require( './uint16array.js' );
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/assert/has-uint16array-support":22}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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
var builtin = require( './uint32array.js' );
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/assert/has-uint32array-support":25}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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
var builtin = require( './uint8array.js' );
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/assert/has-uint8array-support":28}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

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

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

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

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":52,"@stdlib/constants/uint16/max":62}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":54,"@stdlib/constants/uint32/max":63}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":56,"@stdlib/constants/uint8/max":64}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isArray = require( './main.js' );


// EXPORTS //

module.exports = isArray;

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

},{"@stdlib/utils/native-class":125}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
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
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":34,"./object.js":35,"./primitive.js":36,"@stdlib/utils/define-nonenumerable-read-only-property":106}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
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

},{"./try2serialize.js":38,"@stdlib/assert/has-tostringtag-support":20,"@stdlib/utils/native-class":125}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

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

var isError = require( './main.js' );


// EXPORTS //

module.exports = isError;

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

},{"@stdlib/utils/get-prototype-of":115,"@stdlib/utils/native-class":125}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":125}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

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

},{"@stdlib/utils/type-of":136}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":51,"@stdlib/assert/tools/array-function":59,"@stdlib/utils/define-nonenumerable-read-only-property":106}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":125}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":125}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":125}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":31,"@stdlib/string/format":101}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":58}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":76}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isnan = require( './main.js' );


// EXPORTS //

module.exports = isnan;

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
* Test if a double-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './main.js' );


// EXPORTS //

module.exports = isNegativeZero;

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

var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/float64/ninf":60}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a double-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './main.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./main.js":70}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/float64/pinf":61}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

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
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

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

},{"@stdlib/number/float64/base/from-words":78,"@stdlib/number/float64/base/get-high-word":82,"@stdlib/number/float64/base/to-words":84}],73:[function(require,module,exports){
module.exports={"expected":[0.43497157484184834,-0.15010047715333638,0.2539541709677389,0.06264531226251156,-0.1072681902493254,0.12018580155165533,-0.5305836459406659,-0.34566889007056806,1.0160845681091324,1.6198343038786336,-0.09253445737616475,-1.2080911887972439,-2.3333770505734095,-1.4932202445259446,-1.0170755504207099,-2.7560976653408162,1.9010393668629424,1.6588137440876494,-0.45766005971767,-3.708876365835085,-5.9235032324466905,7.287729651489718,-1.8381778910797664,-9.886606849617834,-5.24326469303108,-13.699310960357996,-12.961964464640436,-7.819796714202524,-7.063414491325447,13.440314118468457,16.389242377998666,-36.806950452274044,44.187531114649026,-43.763179480335786,54.692384038398735,60.377981092799565,-40.43119176281684,-21.8550687186874,11.143304402369338,-121.65855220679707,-50.34244558165493,13.587648309778821,58.605334299712794,92.61334526843277,-178.68046587568273,262.92777753625325,217.22034323718688,387.8377614040917,178.55252717502827,180.95251497554995,-186.7083247141428,-511.0378982291795,-718.6252878147527,323.94259754868233,-1049.9258207543774,941.1572128686671,1219.2105064742805,1182.9524437666553,939.5254711490703,931.3764156196946,2389.4265797439607,-2218.075674240266,1370.7138169670711,758.5742642393506,3849.215625830849,2401.5611869989802,-4629.2041124150355,5325.492678191718,5696.044698080696,1140.181499000982,9023.122002549519,777.6417990509497,-5569.597740395798,3445.321102551342,-17022.591284251885,16053.31613626138,13815.385080560322,9788.443577778942,27252.686860142832,28755.100667510444,-7729.740074287297,15739.736865161674,-48618.41693482534,6993.718148676303,53685.00249284894,-57558.19012345115,6851.614507909886,91964.62243527638,78769.48763327535,-105027.72738288617,60660.24569214542,-58016.392165104975,26461.875523003564,194672.27913522295,81089.2302330641,134147.50296873838,213922.47067219554,-169882.75575374355,73550.71989424543,28719.574023341625,-648699.4200020295,308975.3238651296,-797585.3860973811,109407.08613233859,291540.40064228716,-709325.0217573226,1.662334351466881e6,-950077.4300492245,-300043.7608806616,-1.7468184821626556e6,1.2247988213567787e6,-2.9773314265703047e6,-2.6317345691407453e6,1.2082093049929219e6,-1.314835363159151e6,172887.79681578698,-1.5814734047434167e6,4.219165042572861e6,5.473342201746006e6,9.774663504859472e6,6.961301551054033e6,9.02018932600273e6,-8.488080717183426e6,2.1805085145482537e6,1.525306001867463e7,6.389734311527635e6,1.5317752522751138e7,2.7160459800526205e7,-7.6986701494832225e6,1.270841371921333e7,-4.465572424689666e7,-3.007555990448484e6,-1.912650891542448e6,7.05029910994617e7,2.2633205295803454e7,9.959983544178037e7,-8.056990927080914e7,6.057169871861176e6,-1.2406192265772378e7,1.2060970606025375e8,4.1724061777714275e7,1.827083483291051e8,-1.3382264571051857e8,2.0753351855826718e8,-1.0394662701765661e8,-2.5082669593327653e8,-2.0264328078692898e8,4.1909677133447075e8,1.5646196919092923e8,-4.726079722365258e8,8.348062325298866e8,8.914126219477516e8,8.381863684750868e8,1.0394288686948229e9,-4.3526303861218816e8,-9.274539679770796e8,1.4384467560668278e9,6.429485126873525e8,1.91124753668649e9,2.1185506997685783e9,2.330337115202973e9,1.4518277577043517e9,3.593143540169696e9,-3.381960841841608e9,-1.8667072742097456e9,-5.542988090529959e9,3.6187016226650624e9,1.4622341498631105e9,-1.0175912087294853e10,-2.1437974567316406e9,-1.033060483454764e10,1.2902583860444954e10,-6.26654364769084e9,9.890691213710228e9,-2.0145909583221153e10,-2.3981026097234673e10,-3.3142546281300632e10,-1.638362828303224e10,3.0002735739668518e10,6.786649832714996e9,3.008760186128538e10,6.638298197082925e10,-5.104005323131454e10,-8.085543214013052e10,-9.35035697908772e10,1.105250517642815e11,1.1464573490713794e11,-5.41956069816717e10,1.498785893507134e10,-1.910232244576246e11,-1.3507492398078348e11,1.5095342580566946e11,-2.5239670010676688e11,2.5893894547352982e11,7.84454537417793e10,-2.829580032694481e11,-2.3990547886757233e11,3.905471922282518e11,-7.249309521081073e11,-3.3446876010328296e11,-2.212835056052614e11,-5.200149346222085e11,-1.4372994691313736e11,7.134544080964236e11,2.6068244802723087e11,-8.685519331550907e11,-3.690115619409074e10,-5.308698334544345e11,1.6124251098887317e12,1.3427177254515747e11,2.73906488874049e12,4.589158304515779e12,-4.840320518109329e11,4.934794884509821e12,1.3519962616901892e12,-3.0993091734718184e12,3.6009455041232305e12,-9.147159665838168e12,9.903727106150506e12,-6.993477876102802e11,3.7139843652678193e12,1.2033132442263674e13,5.513546038891137e12,-1.570378050920037e11,-6.372232260162437e12,-2.1669886089428867e13,2.797502328512145e13,-2.1377597380952793e13,-4.027873304529705e13,-5.3245894221167234e13,5.339044156236833e13,-5.295323124023209e13,-7.832143223039848e13,-5.271973109627895e13,4.086978088129459e13,4.938866492925324e13,-3.654831135324417e12,1.97522342281851e14,1.8486718724880494e14,-1.424622354894202e14,1.0426101873595897e14,7.773941033663058e13,-1.8602161491095116e14,3.354977845220704e14,-5.157313545211338e14,2.0026154451238838e14,-3.394874313461453e14,-8.175849331696286e14,7.193331736523336e14,-1.5114038413381034e14,4.208631468819139e14,-1.4770944983522806e14,1.492561769694354e15,1.8173530245987882e15,-1.5579123883445448e15,2.043085178003042e15,2.4620902892975805e15,2.0049716526215392e15,-1.9894582832848715e15,8.044051155771645e14,3.41312309821306e15,6.094651529399894e14,1.4784725129202806e14,3.4447449450103725e15,-3.6663058403771865e15,-3.3966516637518755e15,-2.2068325037466282e15,-4.839691399183597e15,9.83323417643566e15,1.4469147051969624e16,-1.367088048841351e15,-2.2608167789466784e16,6.772833858606839e15,7.928959958613202e15,5.573716058151995e14,-5.89980749513493e15,8.492256626312094e15,-5.448609430537336e16,-4.2221095699638136e16,9.43674277531044e15,3.5044815135508556e16,-6.12656456436862e16,-1.6216405628358402e16,7.138437611700459e16,-3.919280665064737e16,-1.3112356125845123e17,-4.463877586471621e16,-2.2220144501843395e17,1.6940011889748422e17,1.5408791005809603e17,2.656982730306088e17,3.469431265228994e17,2.7172660952427828e16,9.223350294572882e16,-1.0310374479208238e17,-3.0486802574508605e15,7.326459486480188e15,-2.0144871902911293e17,-8.649769005379019e16,3.0813973931292634e17,-9.882047984761686e17,-8.655123193019277e17,-1.4182945229438643e18,-2.3014158745180012e18,5.262997259637612e17,-2.2546365960414996e18,2.3323085520940703e18,6.506380923696004e17,-1.900944451572027e18,3.3102606846739686e18,-5.852156058895301e18,-2.4201671754763095e18,-8.03630505057726e18,7.525361987174911e17,-1.0345600269660703e19,-5.806534237021872e18,-7.462731627861005e18,-1.2735066351828386e19,-3.3010692919368013e18,-2.2087418028492124e19,-2.4348649671069794e19,7.864043861414026e18,-2.9678444978079162e19,-1.8200097732920242e19,3.829316541368753e19,-3.5807872325448184e19,7.736542115430565e18,1.6697436984679047e19,-1.320038953058322e19,-1.0953773043870912e18,-8.318921891295892e19,-1.1967901280157306e20,1.1329571444535896e19,-2.0705571680896725e19,5.271023175672963e19,1.2740831174059611e20,-5.442323916548083e19,1.6199634380939444e20,-1.9529777407872244e20,-1.4676079801686345e20,-3.1271686195163536e20,-2.3965037737059697e20,8.377000258354609e19,-2.6713574843046986e20,-3.5866788817501074e20,4.786210706898456e20,-8.829201656158961e20,-7.172324780024e18,1.3638697648865613e21,1.263513028437273e21,-1.0428161605703255e21,1.3256116637258248e19,9.856422065554264e20,-1.3020359692637623e20,3.001927486645225e21,2.768161125446647e21,-2.4604472034715983e21,-1.5440514462061856e21,-4.158910458889594e21,-3.272896493918402e21,3.642427349767036e20,-3.606159232011188e21,7.560209371164147e21,1.0978378869267421e22,1.0305162643058622e22,1.082847837479616e22,1.65597360452191e22,-7.48869545056121e21,4.586843383736663e21,1.8317561019744072e22,-2.411078526117197e21,1.0557891113099341e22,1.7023257897922755e22,2.588545632779483e22,2.4174352641517788e22,-4.473158057705083e22,3.1871649133593803e22,5.4867341002497585e22,-3.288038260570098e22,4.1168273753754097e18,-1.1760516094255239e22,-3.079705492347503e22,1.2004457702519331e23,9.366138698342023e22,1.866323569660468e23,-8.783472372261424e22,-5.5008861224706656e22,-1.689228933595139e23,-8.40681811842974e21,1.9057955179298664e23,-3.663979587866331e23,-3.22213683132559e23,-2.185701924004878e23,-1.013028754246157e22,-7.32674376009342e23,8.232054791206192e23,-3.471515390931106e23,6.011790972163611e23,9.579664951595475e23,-1.381515865378984e24,8.678461382264928e23,-1.2518338683468338e24,4.067686289696273e23,8.613887373286884e23,-1.918702193704413e24,-2.3766824693865224e24,-1.2132308836825566e24,5.571506424999502e24,5.673885840196479e24,5.735550663752401e24,6.887406803724023e23,9.024728141864521e24,1.233709784478749e24,1.0507001479892047e25,-1.8718065752933465e24,-8.115063106124055e24,-1.7605077172447019e25,-6.56459720362834e24,2.1569848925440793e25,-3.2240269415472387e25,1.3749942816268662e25,-3.9742084370173775e25,9.323129676361521e24,3.0077108808219398e25,-7.377194668244235e24,-4.033463928717066e25,-3.985741261752897e25,8.130532113163474e25,-9.84679252335089e25,1.2840678855192536e26,-1.3358813930973655e26,7.858041742279172e25,9.568083231789229e25,5.586331258811619e25,2.5415635767493888e26,1.669691492403373e26,1.7506002395570906e26,3.218703408472816e26,1.1057000542236281e26,4.903250071576581e25,-4.8050862428931864e26,6.612714926319724e26,3.305369636821056e26,-6.372345679824178e26,-4.203667287823454e26,-7.6907956099215245e25,1.2471673894198196e27,-9.834351082470072e24,-8.977477148570969e26,-6.227368369348516e26,7.775209540510202e26,1.465808378917338e27,-6.752470765729232e25,1.4279347824656203e27,2.5753365697634665e27,-9.358374368604996e26,-4.528731492497845e27,-4.280037063958426e27,-3.281733442693349e26,3.4994800559875665e27,7.951434130174507e27,-1.1720692026749541e28,-6.758890318542801e27,-9.996479139119902e27,-7.264038002905095e27,-9.664722714373229e27,8.670382040892681e27,2.482427510529679e28,-1.5922016057278117e28,-3.503037049604583e28,1.2332681388639902e28,4.699208786542089e26,3.6706783997627137e28,-4.360230885798857e28,6.042121960262415e27,3.487896172047422e28,-5.504265955796888e28,1.1507914305219901e27,-7.802393824067232e28,-1.3729165226455162e29,4.260575569425687e28,1.8458622408806794e29,-2.1985909262139527e29,-2.6807351099611415e29,2.3315537253376978e29,3.6446009508301896e28,2.2644067923785657e29,-1.4484274350053033e29,4.4071369208910276e29,3.7824446307098146e29,-2.617383046576509e29,-6.925725655866124e29,3.23684376637048e29,-8.53550772175778e29,1.3243858199959584e29,6.771180052063082e29,1.3612181900869523e30,1.6869309468582948e30,1.126308641336042e30,-2.728104511449847e30,9.750046887968531e29,-1.3148321989309203e30,1.9474954028925187e30,5.1655848170954876e29,-5.229038271512041e30,1.2996653687262091e30,-5.16011818553472e30,8.471281741358943e30,-1.2348065073081415e30,-4.165095316322187e30,4.3701936450188216e30,-2.2603219303057864e29,-1.2604143305183909e30,1.0050857881767483e31,1.5653565299142068e31,2.0038826897228798e30,3.0161130069868986e31,7.656841246237878e30,-3.9021074980995444e31,2.8602465871165145e31,-2.5168701648828053e31,-2.1330619222891066e31,6.858243777278072e31,-8.088164643182479e31,-7.619341535633862e31,9.57486016854517e31,4.393693703897732e31,-5.0019128930372475e31,5.597084194843198e31,1.5592377921179656e32,3.688070786669254e31,1.687221634097781e32,-2.9293491525331752e32,-1.9318474657255183e32,-8.144249359156685e31,1.5384421869087244e32,1.917637420036449e32,-2.985739437206316e32,6.35827703375524e32,4.947001171028808e32,7.498837506008086e32,-4.877983669698e32,6.723703905988273e32,6.896301801244803e32,1.2503137459269042e33,1.481739660956156e33,-1.7786037017290103e33,-6.49388487989243e32,-3.688944757359986e32,2.19186800169843e33,-2.834252206890038e33,-3.787344073045171e33,-4.1167827057862875e32,3.587834551651104e33,-5.750920567771073e33,-2.3963621219172972e33,-5.728904406118865e33,-7.757115629933355e33,-3.70095586072792e33,1.2761394700621974e34,-1.022641767279895e34,4.709669467499891e33,8.324291346729784e33,-1.106309069925363e33,1.1731611173079483e34,-2.1402865134948156e34,-1.753457794944028e34,2.773701228120251e34,-3.7345241952958336e34,-9.527753099811395e32,-5.207677836748266e34,1.8582714924435668e34,4.384773667116175e34,-3.4472354825628303e33,4.503849576096294e34,1.2345833901816326e35,7.585603066819954e34,1.4055260075208247e35,-1.092209280922554e35,-2.2728168913863686e35,-1.8118987139740435e35,2.0854625111960347e35,2.11197943452663e35,3.628699778701036e35,4.436299436590041e35,-3.877844244583064e35,-5.744910681711726e35,4.47640557106851e35,7.70058695315896e35,-7.826903827148644e35,6.077609380648483e35,1.0571416660818326e36,-4.239844053293536e35,-4.8280098484932795e35,-4.033751055502859e35,-6.206437791185988e35,-5.496876473728024e35,5.248803526794584e35,1.0103180345461527e36,3.68870942618164e36,-2.4857512140432512e36,-1.4414924650671723e36,4.8819424443033706e36,2.5737283195103316e35,-2.1164510505749554e36,4.6587323301932626e36,6.457815392128323e36,-8.591210219175005e36,-6.023710924359552e36,-1.4933736717754512e37,5.610127276218413e36,2.1691518147251804e37,1.5934426563876718e37,-1.451355798635241e37,-2.7614512417695606e37,8.383020121293721e36,-2.7026049672984083e37,2.8136138301682046e37,8.6776428359142e36,6.491831695742858e36,4.3278628409606e36,-1.5189106614879772e37,-3.5324799610183106e37,1.0762383798220355e38,1.0602833961916143e38,7.774581337044785e36,-2.3075926175484907e37,1.9371589319916382e38,1.4176342787229765e38,2.3113431944184724e38,1.1907118185827336e38,-4.524059402877636e37,-1.4270448416191211e38,-3.758735766980782e38,4.394434417167274e38,-2.9822104868013443e37,-2.7472026973628383e38,-7.172459705698075e38,-8.825075691478272e38,-3.930100929337645e36,-1.3010976219854981e39,-1.0979852741725294e39,-9.789979386187166e38,1.826507704994234e39,7.979101613441712e35,-2.7617668452476276e37,-2.0534707220575364e39,-8.616367375299745e38,2.1171054005952972e39,-4.181199465137397e39,-4.6593965556440844e39,9.715031454719559e37,4.329273174322789e39,3.492286034488096e38,1.7211299113368578e39,3.9139880328415305e39,-4.2469247529801014e39,-2.408158369344288e39,8.240740734901941e38,6.835130379700089e39,9.905540048084736e39,-2.356083525591447e40,-1.7114833410738502e40,-6.05382216595332e38,-2.346989003979294e40,7.982876692512124e39,-2.146266626939421e39,-3.353984372418151e40,1.5411005452096164e40,-7.880931622291385e40,-9.085205281917539e39,-9.034059171277544e40,-1.0099179996452712e41,1.195345728109989e41,9.947904403823785e40,-1.7404561121534643e40,-5.286380442252326e40,-5.066778959671406e40,1.2865321664352645e41,2.3941002871829644e41,-4.591326266139375e40,-2.9097525776617986e41,1.3953805054181118e41,2.248048746141688e41,-8.268912525635339e40,-5.865760244887935e41,5.309485137916436e41,1.0243901721611663e41,1.1888532941314279e42,1.0524683479940292e42,8.044258326851778e41,1.4102998058561024e42,-8.079870945668543e41,-1.4453407775172296e42,-2.5840339827242482e42,-2.598190762592955e42,-2.87901823094924e42,-2.2870195168730477e42,1.1606121848082623e42,-1.111483933019914e42,1.0184549326445018e41,-3.084807104417064e42,7.917102114606175e42,-5.629183838129693e42,-9.249988088056305e42,-4.388857575092732e42,1.3255625039566637e43,1.211637051231918e43,1.6436230666340752e43,4.2662392449122003e42,1.8047575655696674e43,1.4353477163983784e43,-3.562622751746606e43,-3.126463710010954e43,1.8430853174599817e43,-4.370731937915365e43,1.2291888890063016e43,-4.973321765652985e43,5.628147257173622e43,7.205384419296031e43,1.097800893596012e43,-6.464231129195661e43,-2.7550987947077666e42,7.271264565334179e43,-1.7519539167536895e44,-1.1068744095743042e44,2.30606328666207e44,1.267685162552547e44,-2.5787838503135815e44,-1.8832903297299458e44,4.468568703145874e44,5.470191329502723e43,2.2891960361260753e44,-4.426742055297781e44,-3.328971805924053e44,7.105436785118046e44,6.254011108429011e44,1.1123477788612663e45,1.4702805776443654e44,-5.032753595179084e44,-5.1830368224368036e42,-7.982713683482407e44,1.9276866134420305e44,2.724915994428185e45,3.070162528759865e45,2.2757915850213298e45,-1.6419520359508182e45,-2.8508504252284582e45,3.885891908350534e45,6.251154702630672e45,-3.3566158084241946e45,6.8284604868974306e44,-8.567335629992558e45,5.025463062753351e45,-3.4375470689974863e45,3.519061001657076e45,1.2898363115437743e46,-7.844822870510422e44,1.814276954579367e46,1.1012062192543531e46,-1.6531866361698985e46,1.0924483742513815e46,-1.8353121293237983e45,1.4377970587887515e46,-5.688382137677118e46,1.4771863792280168e46,-5.660448395798225e46,-6.203313662773536e45,-5.058414524518583e46,1.272765058532275e46,1.3447000181883406e47,-2.0668502767651059e46,1.6535362636702088e47,-6.183893810765969e46,-4.160449966098317e45,-1.0022705575687175e47,9.801539033765765e46,4.233449958365007e45,1.5456728635760825e47,1.3077154990709181e47,1.2885797785727107e47,1.857775894990563e47,4.356047038879209e46,3.04686577069644e47,7.291852241828358e47,8.312206477051855e47,-7.1269982519481494e47,-1.3224700609932805e48,-9.269512765416474e47,-1.603338920674413e47,9.71212246387377e47,-4.626885549921943e46,4.59626270707438e47,1.2905958277235849e48,2.1336286182894664e48,2.4650240498396235e48,-5.3699993324617886e48,-3.59621585651431e48,6.55593968465685e48,7.59882131841325e48,4.776329170703828e48,9.939053182782485e48,1.1115709646737971e49,2.47506498671669e48,-2.2779894726416637e48,1.496246775426603e49,2.156666611174188e49,4.264882428762549e48,1.078025033298243e49,1.2067952755752987e49,-1.8340039116923247e49,2.699084549940132e48,-6.0918335152394e48,-1.5575077234380285e49,4.756438986148461e49,-6.087749324439424e49,5.499158765990068e49,6.49348450085047e49,1.0850689428220471e50,8.179068723001057e49,1.2473264548679887e50,-1.8628499407587565e50,2.06103495244739e50,-2.5416419409505184e49,-1.3594937937155445e49,3.025735541273999e50,4.348606304582945e49,4.678682789175657e49,-2.7758705963658273e49,-3.0354978776918723e50,-1.9219990894263067e50,-7.12128346360559e50,-1.4346684436624674e50,-1.3875124294742149e50,-9.54400322391448e50,9.847240547595353e50,-1.0423992706969562e51,-1.4364971715658686e51,1.861417415395961e50,1.8199353660726506e51,-2.187863815743006e51,3.132346403057123e51,1.6651257304571387e51,3.6001741698894204e51,-1.176900013650108e51,3.203847230757518e51,9.489896645994264e49,-2.7537632662824372e51,-3.355874506130803e51,2.5172936024458192e51,4.855193150871585e51,3.7993790959838455e51,1.562922871752917e51,6.596991654122327e51,-1.1515081731039225e52,9.006149254119004e51,-2.59224711891937e52,-1.782362004291417e52,1.305944140940611e52,1.5899575723797837e52,-1.3387404068467797e50,-4.251720428679879e51,-4.1052360988274e52,-5.72873475479521e52,1.5715733813738592e52,-4.085404136822804e51,7.437067820030638e52,9.919283198806568e52,1.4616120051484196e53,1.0100105320655688e53,1.6164130764862158e53,4.051895493292425e52,-1.8549990812903492e53,-2.5043335228954268e53,5.920502919340741e52,2.4430399562205074e53,-2.738701625903455e53,-4.7273712468895356e51,-4.3042933748549045e53,-5.043985194011316e53,-7.859944480737992e53,5.278603895796669e53,8.728214724252327e53,8.858469089152544e53,1.0219451254080024e54,-1.4966153194863713e54,-1.6541421692623244e54,-1.8438817273521115e54,7.16884121131883e52,-1.2157520056053426e54,-1.8098739695108777e53,-1.345411366424963e53,-1.532001847910237e54,1.0511704831528024e53,5.6406746515526235e54,-5.9565581652330595e54,7.766992350866801e54,-5.645121879980586e54,-4.8337400128229223e54,-1.0900355346583378e55,-4.591149628133182e54,-2.5994895570161294e54,-9.020641904986787e54,1.3114381883616714e55,-1.6080163744744036e55,7.152509666098912e54,-1.6182169862813455e55,5.9568964461361156e54,8.46522500284803e54,4.583960434118509e55,-3.7268898964184235e55,5.520039796223964e55,-3.5428765407003904e55,-1.655494415828475e55,-8.608491583450103e55,7.583975103480334e55,1.299002311859211e56,1.9198812009320105e55,1.6122418913417319e56,1.1101541568560163e56,-2.0184143971608623e56,2.6038108875729773e56,1.6505335293175683e56,-2.3014857486612444e56,2.3327355688549007e56,1.9349006094127487e56,-1.156963455910466e56,-4.731649381009377e56,-6.882064801865376e56,3.8274948290097547e56,-6.538908489972288e56,1.0354868481181882e57,9.937502002933187e56,1.094719546549926e56,-9.588891002478996e56,2.277754305108072e56,-1.457290126458062e57,7.155099892870969e56,2.1181693171433072e57,1.5728327126044796e57,-7.87407736116214e56,2.3508457090681903e57,-1.4452553494533004e57,-4.3833113241094204e57,5.369909323417814e57,-6.0771028241204713e57,1.4248090396391395e57,2.7612936256464383e57,-5.1905815737840666e57,1.0313380773794917e58,6.1346325806754335e56,5.581755216796156e57,-1.0256088169919404e58,1.2377806645495893e57,2.5921967019934843e58,-3.1044205849854313e58,2.5764293070934655e58,1.134778426920984e58,1.5126319581166366e57,-1.859877877488188e58,2.7956348933128917e58,2.1335390416816767e58,-6.956131231245662e58,7.695259314321479e58,-1.1536819492807835e59,-1.351088945475175e59,5.604930939614253e57,-5.091026974300659e57,-1.8752108957814998e59,-3.101727269353852e58,-8.02459770875572e58,2.5887412179081123e59,-3.2174677731802294e59,-4.090044011187263e59,-3.8756195876317815e59,-3.2457900707965105e59,-5.258033902000093e59,-5.739599333948483e59,-5.350582639778269e59,-5.554259232933495e59,-4.124278351092153e59,-9.90603378500528e59,1.4601508938027711e60,1.727353525571628e60,2.0535870978018073e60,-1.5747706254942151e60,-1.2739936333607436e60,5.768690610888403e59,-1.7538376498308408e60,-9.865285725449344e59,2.1663393661996842e60,3.719832316835865e60,-2.668210269330724e60,6.62839961486306e60,-7.849349096734455e60,-9.533523512831634e60,-3.9248878180633964e59,8.537316358445484e60,-8.021386285402868e60,-7.514841290146948e59,-1.5435647777925187e61,-7.470492161615392e60,1.6430857580951789e61,1.4612264896563996e61,-1.9377405482481676e61,1.1460237227280065e60,2.258939893947235e61,-7.854003418037873e60,2.703668707481423e61,6.288102926091292e61,7.118511155923564e61,-3.7866662243989875e61,-4.335159877532545e61,-1.1545265845093464e62,-8.925637868350848e61,-9.208966097215447e61,-1.6211383631330777e62,1.797996940795614e61,1.7005423995782021e62,3.5935665051684166e60,2.8772821789693904e62,-2.8459596249258303e62,2.4812264852875647e62,-1.196669911892154e62,-2.1513332042592163e62,-2.341599401366575e62,-4.850188946786083e61,-8.99396090805453e61,4.5003595926203135e62,-2.163774441535201e62,-8.65007914378513e62,-4.0720196323363364e62,-1.157108885108702e63,1.4315681576900801e63,-8.33018098021736e61,-2.2433263949794377e60,1.9183629201911582e63,1.5691458369098622e63,-3.642435490848347e63,2.6465087507773566e63,1.9923189033554777e63,-3.76251237953472e63,-6.380129225637294e63,7.104428170561318e63,6.434942233027908e63,-3.536780192538433e63,-9.786724617899072e63,1.0460890118768581e64,1.3998509351127062e63,-1.5643495764916438e64,1.4658342411416035e64,-1.9920252432140576e64,1.3635414904735715e64,-3.47669900317651e63,-2.976942735709435e64,-3.430361578112684e62,5.426593839155355e64,1.5591226718428256e64,-6.205284835476547e64,-7.29938873176216e64,-8.884780885553585e64,2.6487117718021702e63,-9.092788797713555e64,-4.645470099825209e64,-6.49480390934728e64,-1.6552129793357897e65,-4.558940923235732e64,-2.6025982895344735e65,1.078179313262988e65,-3.506669297400694e65,-2.0810287080436394e65,1.301418330167259e65,5.195739747687547e65,1.0287637203828229e65,-2.69104623022948e65,-6.100113137244319e65,8.1511004824875705e65,-6.335946780372435e65,5.323707277088486e65,1.3385690633096354e66,-4.500331816409263e65,-5.713360273077035e65,-1.0156839818253174e66,1.1685105862283914e66,7.067477094383367e64,2.640992670520857e66,-3.817871807338737e66,3.433875496469678e66,5.1683026413848606e66,-1.9718426073896844e66,1.4460506075283506e66,5.568678529963959e66,4.995148373738996e65,9.082732448014838e66,1.103161661926648e66,1.3581228631719205e67,-5.784382788004881e66,1.0102329272504386e67,-2.1530445099127967e67,-5.358946244158979e66,-7.288321806209234e66,3.383970597803344e66,-1.8658607883156783e67,1.8826792729007636e67,1.8106378174790277e67,-3.2033992637726025e67,-4.143697354522461e67,-4.3011340254911144e67,-2.33934342036058e67,8.533621278857996e67,-2.1235539091146192e67,-6.97113629263639e67,4.278254177866425e67,1.1078636549416216e67,1.800699489224916e68,-2.1824865449313576e68,2.1534869274832366e68,1.9014201371188717e68,-1.988566708894683e68,-2.5941789822913823e68,-3.783735413938034e68,-2.1992036595831608e67,6.127409769891019e68,2.9322839641331208e68,-3.7686962866402017e68,-1.3060734381128424e68,1.1341343714261776e69,-5.343931558798967e68,1.1648657048110213e69,-8.141462985224124e68,-1.033034342256611e69,-1.3078544857979887e69,1.8494955221589882e69,-2.3238101217086383e69,7.229608866294719e67,9.378574467495493e68,1.2047870966192491e69,-1.4935130332860724e69,-5.1025607822162535e69,-2.8677821536997546e69,-1.2147404243989437e69,-4.239166428888014e69,-6.239648432636151e69,-4.245654959511922e69,8.375767681155337e68,-2.726546726038274e69,-8.536345244540975e69,-1.5283889663212746e68,-1.0289111053971235e70,2.0931346150921405e70,-2.2782428855323573e70,1.997242509353756e70,2.9654356183491653e70,-3.2989113230629623e70,-5.575367644556667e68,2.4308718494283404e70,7.613688095072775e70,7.926506559677562e70,9.475844235352143e70,9.364372343679138e70,-2.1018214071827508e70,1.2859160476332809e71,-7.510399577136013e70,9.463595550190794e70,-2.5997408758499276e69,-2.7501804332437983e71,-3.256163370730465e71,-2.3323540948489684e70,-2.2221670764563824e71,-3.776273843303042e70,-8.945593464870765e70,-4.801292805509055e71,2.6170686849076516e71,-5.598343527703615e71,-4.797854969162482e71,-8.639484632073705e71,6.406029167553075e71,1.2712265559965997e72,1.2030903385161646e72,-2.0263288732549645e72,-2.259084268952694e72,2.6817997441834644e72,3.2364069485976223e71,-2.1506703787082855e72,-1.0137740425977513e72,-3.849469982476873e72,-2.562799853610657e72,-3.105701263022508e70,-2.351164958760541e72,2.3889241199492485e72,-3.1712091513730272e72,2.831248243219701e72,1.2308586729378924e73,1.5140463831446694e73,1.3846518390615615e73,-1.216803260041637e73,3.898535705127883e72,-2.3260977796806565e73,4.150781774136489e72,3.3704992724719865e73,-1.0614075727658972e73,1.1098213618122766e73,-1.2777226235505556e73,-1.4239992529582225e73,7.304890305547695e73,-1.553968711563603e73,-3.4281065922578214e73,-6.203027753189274e73,2.0101732140640195e73,-2.8289733627135183e73,-1.659194902059146e74,-1.6220995194955506e74,2.1894183043270528e74,4.4092552120039583e73,1.425694258120302e74,-1.0195532802826517e74,6.99733111428998e72,-4.235485674274319e74,1.0526032326231472e74,1.003833483506381e74,-1.841746003424811e74,-4.41621047853352e74,-9.031709571129547e74,5.191386997946443e74,-9.828521852174725e74,-1.0535455673426269e75,-9.499696601668613e74,-1.4925238963445705e75,-9.70871753797482e74,-1.3885518282518988e75,-6.619419591375368e74,2.0643665746457676e75,-1.0713952631418342e75,-9.327768180684696e74,1.2041970632270994e75,-5.895618254624968e75,-2.282327601759472e75,-6.648938878832977e75,-4.7885059696686396e75,1.6256032366260982e75,4.616343215382619e75,1.0259141596959878e76,2.297231742830148e75,4.753550454425794e75,8.207002120072242e75,-1.9381563766297916e76,-2.0513019484504814e76,2.954239695628294e76,3.1129449073102485e76,3.727741918521156e76,3.8471872390517126e76,-2.3412707139220568e76,5.769463781263232e76,2.004642903637234e75,3.7363763075958906e76,-4.759388273780727e76,-1.6125284923480265e76,8.51884471747058e75,-3.576772967164552e76,3.648500052565748e75,-2.9107709592389e76,2.584913388539963e75,1.0458371304607612e77,-2.356452904798621e77,3.2859568956055005e77,4.102659291153518e77,-2.2956083005308938e77,3.362440179304624e76,1.5969046291065046e77,4.694164893673317e77,4.733344576767003e77,1.6097547708724547e77,5.297459443143422e77,6.712306188793973e77,-4.632415366463397e77,3.499166122831759e77,1.0666566079316558e78,1.3976712888653658e78,-4.115154836236067e77,-1.1340218676711145e78,6.396000609697659e77,7.840700036923356e77,-4.572286499187805e78,2.888492421051538e78,1.5132023320690528e78,-7.002580397809434e78,1.6299783661747395e78,5.3257664991982e78,-2.330119042055332e78,-7.0082521507692004e78,9.27758396719744e78,-1.2576926078576595e79,-1.2763180338903794e79,-1.4901178167333454e79,-1.8878251001476964e79,2.3704979743149255e79,-1.7371738678909627e79,8.723717691694672e78,2.416062568200984e79,1.3736333170299117e79,-3.7999922252668864e79,-5.016555468626052e79,-3.2343954851944505e78,-1.9330524793080353e78,8.235230960166433e79,9.721190359784764e79,-8.909653199092293e79,6.2093468104499e79,-1.4368888307997585e79,1.6342524443528515e79,4.8966425491046145e79,2.693018164507866e80,-6.32627247229741e79,-1.7677178199985032e80,2.921394373350695e80,4.4765425819929205e80,2.2980617702070515e80,2.4011010812729667e80,4.4470203490448216e80,-4.6129614657296074e80,-1.3441640487505274e80,5.962945020260251e80,4.326491722147496e79,7.219929265288274e80,9.166183504538466e80,6.265304711136849e80,7.046403840106629e80,2.444503662767184e80,-1.469403127705536e80,-1.0289185960544461e81,-9.183766710293168e80,-4.14279852387071e81,-3.4203770849570012e81,-4.918123289958945e81,1.887602585883656e81,-2.54439134749607e81,8.26488405274009e81,-8.029102706191593e79,-7.099372593713798e81,1.3664849603218452e82,2.706836842776383e81,-2.279631896486821e81,7.044090964425274e81,-1.803333918298158e82,5.816452360847372e81,8.533781335081263e80,2.6581989453365843e81,-2.8398956281251522e82,-2.3866013645703126e82,5.6362759466646295e82,4.82605397916836e82,-1.4883438206080034e82,-3.1985485045846816e82,-7.725676713630381e82,-2.8801815015178057e82,1.0897892182778194e83,7.339037486370967e82,-7.934918860252223e82,1.247280973756458e83,-1.2092007350329083e83,-1.1928729950768434e83,-3.4093995687544295e83,-3.831390356612166e83,3.27728373325067e83,-3.807163317158401e83,8.645909783741423e82,4.537536683323411e82,-5.148359693777403e82,2.905521834263008e83,6.556192249663297e83,-7.686745861511824e82,-6.680727669987547e83,1.2143336770986167e83,8.816251202579329e83,2.109412330256318e84,-1.2056115522225203e84,-9.952426995214465e83,-2.501551473726124e84,-6.650585955193698e83,-1.7768528890586188e84,1.9380977319246463e84,-3.005483512746123e84,-3.6648994719060768e84,-3.2940361243989257e84,-2.329355528187341e84,-5.595192467475813e83,-1.0698070866730914e85,-3.8879768492892735e82,-6.075658546453656e84,9.343158972670982e84,-1.58415756126387e85,1.3132879524131461e85,2.775470237881543e85,1.3766929910537505e85,2.5075478776521908e85,2.8482598575001736e85,1.4240179552800166e85,-2.9709135104290546e85,1.335639876857764e85,3.3412799445848345e85,-5.5528987501034334e85,-3.345388972827672e85,8.325089815723698e85,6.1223395487875545e85,-1.4588810137848797e86,-5.8150160381712276e85,-1.886496956631252e86,-6.392023109384047e85,-2.0465614091782803e86,-1.910471326777644e85,-2.7810942221064324e86,2.5326364429000035e86,-2.388215915385769e86,-4.246628136490101e86,4.272053689206199e86,-4.2138470221944327e86,2.4767624874815862e86,-3.727025851860551e86,6.198667155969032e86,1.0280070086995205e87,-6.636289710975292e86,-8.08394465696079e86,-1.618683824237506e87,-8.143497080074626e86,4.876673248327019e86,-7.536297008777263e86,8.61636147087627e86,-2.796410637494001e87,-5.052684999054257e86,-4.869132112647212e87,-4.1152739655451165e87,3.668090281442141e87,3.5536508751814375e87,-6.83698483593885e87,7.703221074633718e87,-9.453816785272106e86,1.1530247994918134e88,1.4760230647347115e88,-1.5436350780527195e88,1.5311576070777505e88,-2.3019712250592924e87,2.5479212250809273e87,-2.4825411546251163e88,5.6048205625528605e87,3.400128192210101e88,1.5271221382243907e88,1.3390192697959755e88,1.1061933038466922e88,2.631839947242671e88,2.5245269707865292e88,-3.6117343046625724e88,-1.0454065871420137e89,-1.4287490821331995e88,-8.412373504641418e88,-1.836540875800465e89,-3.1519895646839628e88,7.467475774652647e88,-6.049503580720589e88,1.9404835550618931e89,-3.0727630739387706e89,2.313124227495536e89,-3.2741016257272275e89,2.377906278197854e89,3.7561209794112356e89,-1.3702828028026104e89,-5.832047743356592e89,2.400442772119424e88,-8.007895753937979e89,-4.3377621730500556e89,9.907661639813856e89,9.438420776599197e89,5.437721146196679e89,-2.163010792153652e90,-1.060794757082483e90,-8.795950875146149e89,5.436690780464074e89,2.567937687249683e90,-3.183756343402917e90,-3.085786058310529e89,4.497880964620906e90,3.109331252712248e90,2.4427314004387935e90,-8.924230843467812e90,-7.610029048643205e90,2.7407698418460686e90,-4.4040826147664907e89,-1.5993526666477347e91,1.579668868492836e91,-6.388068519905444e89,-1.0641008361876816e91,-3.678180378296158e90,6.4073791167879e89,-2.2178809633210284e91,-2.4061388091287545e91,1.1219290252188501e91,-2.9992727285185464e91,6.520072449620402e91,-1.271674987864873e91,4.2313941835946216e91,-2.0608073398661486e91,-1.0480562678989446e91,-7.713370701122371e91,-1.4815877351471977e92,1.2452724983192795e92,2.1650931676827637e92,-1.5005041942893084e92,-1.4659081102168956e92,-2.2371967083207654e92,9.446579886997468e91,-2.9803659966093674e92,1.6410100457526098e92,4.652395485838201e92,-2.761922144627905e92,-6.253548934942669e92,1.4640776623130838e92,8.322432354816737e92,2.947201541247053e92,-5.0609409420345104e92,2.3699614443246618e92,-1.3393859895524515e93,-1.1071569955600408e93,-1.9304262716834579e93,-1.192108772027584e93,-2.5969327726765103e93,-2.540869467593656e93,-1.768207679778065e93,-2.270359963861342e93,-3.659250337554133e93,4.817835631495861e93,-3.620683902271392e93,8.143530454356358e93,-1.4232307473509166e93,8.795130316520181e93,5.15059838236046e93,-1.0192739002557503e94,1.2655032302143304e94,-1.6899580628922484e94,1.805627422946481e94,1.6251610207261669e94,1.8509708491849003e94,3.573343576223528e94,-7.425515563326664e93,2.4901642986595373e94,-4.059631596066247e94,-1.909039186261443e94,-2.4389107307207505e94,-1.0508424381226611e94,5.1138867240412495e94,-3.001376829013219e93,-1.165284386672978e95,5.665107906083944e93,-1.04854040000171e95,-1.669723960050364e95,-9.028328542033323e94,-1.4323599348242166e95,-2.021556885471577e95,-1.861195670163339e95,-2.5932135719102772e95,-2.818674442443083e95,9.301988198955974e94,3.2159333767141763e95,6.096443977739241e95,-3.6759989129036004e95,8.394800256616927e95,1.042754606586204e96,-8.12836486106912e95,1.4265036228278874e96,1.14182630047558e96,-1.6023718454028757e95,-2.1852486664968575e96,1.224048879221989e96,-6.752232576446101e95,3.208818002161773e95,3.4297502832857606e96,-4.539470044314798e95,2.4170488472931663e96,-2.1431439616318074e96,3.5541783060514295e96,-1.3274811721227615e96,-2.8061104636181243e96,7.266869195884644e96,-8.414847720000597e96,4.279414661116868e96,-1.0297360692159073e97,-1.735566472631514e97,6.481716791546795e96,1.5817270318827393e97,2.601810229644365e97,1.0918772009122448e97,2.13177417700467e97,1.6973990700903109e97,-2.129365879534763e97,-3.356422578658246e97,-5.8210100838621434e97,-4.8968557410466905e97,7.365946481009951e97,-6.36692205558862e97,4.35934631066325e97,-9.688702915719266e97,-1.4974433152996518e98,-1.539152424738291e97,2.9918118075847157e97,2.113293211936756e98,2.4913447128862006e98,-5.416855206119126e97,-5.38698560756879e97,2.7549367102252954e98,3.5837026946349614e98,2.6431331094926587e97,-4.8361749228487533e98,-3.622790387369668e98,-1.875198695362827e98,-4.772452922724657e98,-9.077108177149316e98,-4.320202028305828e98,-9.540594982307687e98,1.4551428782949964e99,-1.7294977750835184e99,-6.61431946858438e98,-9.214452197415083e97,2.794093571908875e99,-2.092761174561539e98,1.967357515042755e99,8.254325081486066e98,-3.6593560015439143e98,5.680662108806549e99,-3.8971840591693136e99,1.0662235292388004e99,-5.706187298926555e99,-4.953156341599624e99,-3.1898854943115273e99,-7.859278261587422e99,6.225695228553829e99,-1.929140884372101e99,-8.765865067354381e99,6.835535342346369e99,-2.5839521685191714e100,2.06745704148113e100,-1.2540435922163635e100,-4.859172349780509e99,-4.2508998552223226e100,-2.810626968159141e99,2.3114610966073653e100,-1.0900680370203409e100,-6.219136714530064e100,-2.0672609308928386e100,-4.873576190418757e100,-3.7906588434438036e100,-2.7515446472211432e100,-1.2954995532932853e101,-4.715469322490617e100,-1.9836596741068228e101,-9.30095516758231e100,4.8857597217395854e100,-3.833394882857638e101,-3.3579704486265427e101,-7.12352002285026e100,1.703930860583943e101,2.976493451958613e101,-1.0517174560063647e101,-2.7795354110577396e101,9.594008560761779e101,5.6803933759219554e100,-8.888454222846866e101,-5.75329039275779e101,-5.313099270177156e101,-1.6155115743490501e102,5.5407036448176465e101,-1.470390110360411e102,-3.136291545213849e102,-3.3246698923226595e102,-3.643221004128767e102,2.932730049967263e102,1.4145852839100002e102,5.090860609515407e102,6.811616751676886e102,6.162382163950489e102,-7.892021997974583e102,4.993794638540233e102,6.285921990743101e102,1.2701203151032154e103,-1.0249151314629982e103,-7.866174611621792e102,4.1677833886861037e102,-2.206088026710485e103,-2.9495514943939847e103,2.2313323163784627e103,-2.3531673865591547e103,9.905703221750963e102,1.981914989144841e103,4.002398570798697e103,2.6054407432042886e103,1.4372389752515241e103,-2.0519415964496633e103,-8.013172733122224e103,-7.780433366419552e103,-6.635113279800088e103,-6.308953875819603e103,1.1950671697711399e104,2.8300451542753385e103,-2.254682472307762e104,-1.7561735774552204e103,5.014439511052657e102,2.540610759171946e104,-4.3690907009550966e104,1.2286130241445387e104,-5.4249191798868863e104,-4.8021450986209106e104,1.6472744512888431e103,-9.066268009294674e104,7.034127980549683e103,3.74779811717249e102,-1.2834286477189772e105,1.5030139768094765e105,-1.503377806580761e104,-1.4673815593377537e105,-1.518208308670306e105,-1.354824024876316e105,-2.412876201741997e105,-3.8731339688318437e105,-6.047028650289756e103,2.66208449896293e105,-1.3673722046640455e105,3.742066792707942e105,-1.9333434684261152e105,4.0383313391047463e105,5.549963504028901e105,8.840472802587205e105,6.882192596973595e105,-8.64288546232395e104,-1.4651933498777543e106,2.1256547584459955e106,-2.2812963858765682e106,2.1809996890166703e106,-2.4430700843830785e106,-1.971314237620377e106,6.833808354620725e105,-4.1674273345198145e106,-1.9631784424141677e106,2.5471039860806076e106,-5.261221598788222e106,-3.726825330776672e106,-7.694091272918439e106,-5.525970583671272e105,-1.308068321069553e107,3.34722059099751e106,-1.4396384933594597e107,-1.2384063584861805e107,2.1257443899738648e107,-1.3844547389143443e107,1.4924881408691778e107,-4.907489550449917e106,-1.8225374598081898e107,-4.628686047214863e107,-5.1033920924973064e107,5.6799524476210726e107,-2.3617130846041604e107,4.6808502144078926e107,6.685034467705565e107,-9.925826987296801e107,-2.6572065917019323e107,-9.455183810942714e107,1.2727806973552905e108,6.303563266736399e107,1.5051708117034622e108,-1.4360632393292185e108,-1.6668449765401909e108,3.647533185651428e107,2.6533282627727684e107,1.2610768476742755e108,1.809996862282954e108,-3.7566022750460584e108,-5.637117826611844e108,1.8209664405525986e106,-1.2550883964185047e108,-3.4450253400365216e108,-3.70205139454673e108,1.1353880343959371e108,2.692913099719463e108,-1.2699865269549812e109,1.6347194642690618e109,2.234344641017238e108,-1.9618285955047276e109,3.376772028453112e109,1.6260010792991453e109,-3.7314524289168745e109,3.785244331760656e108,2.068203090430904e109,-6.024907413900342e109,-4.907416668926407e109,-3.346044342972301e109,-4.395445817822654e109,-3.0517244199664534e109,9.12380206192068e109,1.4269522142890562e110,1.0937121468060805e110,9.205919100154065e108,-7.508667152996293e109,-2.492028609073728e110,-3.5269260034842735e109,2.9168557567535972e110,-4.168567478397834e109,1.6285385463455025e110,3.0504042699182696e110,8.857796685847553e107,4.006670964688589e110,-5.981878653096415e110,-7.972448778777902e109,-3.789051870842152e110,2.7004829266361347e110,-6.47974170418688e110,1.7562095298290308e110,-2.0594683006209146e111,-1.5812154700710667e111,-1.132737193061119e111,-1.2957617162442266e110,2.3331841148673314e111,-1.9729214963131376e111,-3.954724109193971e111,-1.7361119295731503e111,-2.5288787540679204e111,1.300614304891693e111,1.850387145735811e111,9.483666580058108e111,3.793475058204841e111,8.795089396866978e111,-1.445173822632258e112,1.3445253446120534e112,-6.295745474361432e111,1.6889387639218143e112,-9.274100928916726e111,-1.0453686618648214e111,2.706907095708319e112,3.8130620789156966e112,2.634844388361618e112,2.4925073076632936e112,5.2916399408991465e112,-3.3905476622592104e111,3.2925703909494642e112,5.397385158403513e112,-8.929608550678595e111,1.1687154789435604e111,-9.07878235696965e112,1.6254852755856728e113,1.2421678058478141e113,1.3781732809414809e112,2.5324989417476604e113,7.033781530521627e112,6.615301956752809e112,-2.7781343827596904e112,2.0042731728137503e113,-1.4255146892102415e113,1.0225449124461063e113,-1.5847939368993475e113,-5.278406668963199e113,-9.231080188734946e113,-1.0053055783661982e114,-7.730479947639179e112,7.923283213226691e113,-8.983238655706036e113,-1.5740003008678575e113,-9.95437435333462e112,1.234805060194054e113,-1.942343227254956e114,2.6761258439958097e114,-1.1404601979724303e114,-4.3773225675039715e114,3.3223053348554055e114,-4.854529910474297e113,4.92598417325624e114,7.567770980361038e114,-8.339786886765759e114,3.7486271687055186e114,-3.537997535110435e114,7.221945972638376e114,-1.3155807158402319e115,-2.9220685418347977e113,1.1364356023340715e115,-4.4121194193878303e114,1.7509984356316568e114,4.2030229620940307e114,3.0150814058212913e115,-1.8256329131893438e115,3.4342857249928853e114,5.620157706801909e115,1.0626441476733116e115,-5.77498038283775e115,6.988520952303428e115,-1.0219375839783663e115,9.939766816225012e115,6.578127368678911e115,4.455002233113071e115,7.290763153169051e115,9.064691325517302e115,1.4210505067664721e116,-2.302321058711171e116,-2.987416102899188e116,-1.2831796153698185e116,-2.1980921801596133e116,2.1472013780236464e116,2.6783068567940678e116,1.8548577133815042e116,-9.082967323930038e115,-1.349542036297046e116,-9.519273820260276e116,7.154478238348076e116,-2.6935068536991698e116,-4.349359420015585e116,4.152258169119353e116,8.552667480075866e116,2.1354728186852598e117,2.3261784246445823e116,2.0036209929806677e117,1.715330222800252e117,1.928544904147476e117,-2.4800680646011556e117,3.6488844844818765e116,-4.227151521643009e117,6.122368701852394e117,6.278465090494685e117,6.737690546370336e117,4.0154459603978006e117,-8.353444756240682e117,7.660622635389219e117,-7.166656185232346e117,-3.8276736884126665e117,-3.87874234454482e117,3.2422526417279323e117,-1.3710292839128587e118,3.0712704678393487e118,-1.6007962099609327e118,-2.0032024659781565e118,-3.0362559682532824e118,-9.922849122718789e117,-5.331519843102476e118,2.4270190402307316e118,-5.253956394193673e118,-2.128925491708761e118,7.538139778360816e118,-8.845934733285717e118,-1.0996833692201848e119,-1.2746779751256333e119,-2.009948121278753e119,9.51475867433885e118,2.7136083549225024e119,-3.145956958647594e119,2.2121030084240736e119,-1.5238326172107105e119,2.523922155324894e118,2.4351534638224287e118,2.8564348332171238e119,-1.8165143000020676e119,5.5084623017586925e119,1.8738039933286324e119,-4.564131903829276e119,-1.1021210349748725e120,1.3200563179281708e120,-6.359291858236735e118,-8.109874994927534e119,1.688094128729649e120,2.5750821781359027e120,-1.6145680754341578e120,-3.4170634463005036e120,8.000584318445151e119,4.604238399382395e120,4.017000569317214e119,2.7925572534298807e120,9.201812903772118e119,-4.565216046768241e120,5.895874721930415e120,6.342472039114082e120,1.2644915904486808e120,8.789319641939369e120,-1.073181250750975e121,4.7623214394505636e120,-1.9483003515127015e120,-8.370287084649347e119,7.841126319126004e120,-1.6301931979671187e121,1.2327131823886354e121,7.50370865797086e120,1.6574962026104283e121,-5.648813918352309e121,5.272793259525712e121,-5.54611705350751e121,2.4714384226572174e120,-2.474901964803847e121,-1.0625302019608983e122,1.0358071690779519e122,1.2942146758036461e122,-1.2950476029321727e122,2.067552959287114e122,-8.041160412309889e121,2.0932209625501555e122,-2.859871514934093e122,-5.175150326210539e121,-3.68084195887179e122,-3.620605832333957e122,-5.353163100958372e122,6.0094528645767645e122,-4.279716552808753e121,-6.475095338830779e122,-3.948453701106572e122,-1.0029539653602834e122,-1.2207469143618156e123,-7.329720162752099e122,-8.919123496303142e122,-8.410856260701346e122,-2.0792998518665872e123,2.789736281803851e123,-2.03144809267001e123,-7.68765686517198e122,3.639126924167667e123,-1.881917505257174e123,-3.2418572464434696e123,-2.8352154696406727e123,4.5342060098721805e123,-1.0563963950118712e123,-9.281870855680897e123,-2.073210237382077e123,-7.026358624154883e123,1.5270327596306427e123,-8.041182723746833e123,-1.909434063839366e124,1.484188142906764e124,1.6504929670464544e124,-1.9916775632286084e124,-1.8811025092263176e124,-2.349643016520308e124,1.9184165698991906e124,-2.3973731580651314e124,1.253997832808244e124,6.878210923996408e124,-7.129710323648937e124,8.307957701573503e124,-3.1348220899149187e124,-9.388370354918282e124,-1.1941365965755814e125,1.5769320744262277e125,1.4714174305419637e125,-1.1257633982102054e125,2.286667887274302e125,2.7925964152093282e125,1.39764614523022e125,-9.285862880821956e124,-3.1505708367812925e125,1.7495985774806865e125,-2.939385865408118e124,6.63634581132525e125,8.218765445512704e125,3.489237714770262e125,-3.949097254506995e125,-6.521039451058732e125,1.3731839787133066e126,1.098905914202445e126,1.0399816395991771e126,-1.6808094894504608e126,-1.1072240123053457e126,-1.35659471143301e126,-7.774611433592613e125,1.8461154628725542e126,-2.0825835353861746e126,-1.4832442175657596e126,5.193143728764467e126,-1.5485745021380548e125,-5.124927147319908e125,5.3915448051950664e126,-6.767168350287551e126,1.0082443342896729e127,2.6473934512861367e126,3.070827885387209e126,-1.7178019801215538e127,-3.7756431242230044e126,-2.1520983639802013e127,-7.860057724938084e126,-8.680720049023323e126,-3.5808133334247956e127,3.9367946915711157e127,1.3889165438085137e126,-7.214005882665997e125,4.2351889991907135e127,-6.093021806929058e127,-5.773733565123936e126,4.691785879101e127,1.1581577241321281e128,-1.0729897170359175e128,3.2208992181969466e127,-8.215289714234557e127,2.032091065632388e128,-1.1533910929922035e128,-2.275840849545319e128,-2.4192041831756727e127,-2.4323009228411324e128,-3.1502933396010348e128,-4.492627551687637e128,-5.228345929533072e128,-1.0156436685516304e128,3.7114235334751815e128,-8.135962558887606e128,1.331985206655564e128,1.0860540628390275e128,3.056174748727125e127,-1.2430320728352066e129,-8.283643269340902e128,-1.2390031936837602e129,-5.72111422869289e128,-1.804553875789185e129,1.6354105977491022e129,-2.0906510977351264e129,2.3341785293004387e129,-3.724351589162335e129,-4.590080112775707e129,-6.282278541755832e129,3.952762101529071e129,-2.9631320735573346e129,3.9991879709611747e129,1.0939254199702846e130,6.693844599786211e129,-1.4204475852025071e130,2.991169901288996e129,-2.1473256300729798e128,-1.7455656166076144e129,-1.409120902853781e130,9.928156840246749e129,-2.859970948478084e130,1.0430868756493784e130,-4.085253697899071e130,-4.066411381713915e130,-2.816487968673633e130,-3.2866016073179327e130,7.932616905539462e130,1.9604617189705585e129,3.7715319825930447e130,-5.847678112450536e130,-4.71994962892013e130,1.1018784925982462e131,1.5791046093736564e131,8.845990088720422e130,1.6167773340672622e131,-3.470122277319661e130,1.4542402799265522e131,1.678722810578809e131,-2.788211876044371e131,2.8761960248788254e131,3.5025526831782382e131,8.755706149961301e130,8.552410474261657e130,-2.262677208059697e130,7.681881597874946e131,-3.3565837901091383e131,-9.330993651438678e131,8.062363623816527e131,1.8016998773246413e132,-1.932364314276442e132,-7.107666124032118e131,-2.750014092279382e132,-3.045683118358902e132,7.46871164551199e131,3.2532242289435694e132,-3.3655249300497754e132,-2.9339523172131694e132,-2.734273262007908e132,-1.6064077942407278e132,5.286095429399772e132,6.950235056817651e132,1.1099013376154884e132,8.317026962727335e132,1.164100867276388e132,-3.1330067540663414e132,-9.114526683262632e132,-3.906732134788214e132,1.5246910465312235e133,-2.600567723831177e133,-4.838727966647445e132,-3.376645700412282e133,-3.874271022488314e133,8.529257050553738e132,4.0471560049410365e132,-4.291101754612287e133,-1.9550858422051828e133,4.1902912994242537e133,-2.3739469694185666e133,1.2102827171247275e134,-5.994658898243884e133,-7.170953175274149e132,6.056696959600502e133,-3.0271424893403614e133,-9.560711250113942e132,-1.7575310924130144e134,-3.3191007872977564e134,-1.254435672886044e134,-7.658660334329753e133,-1.3055468652791666e134,4.654662702443372e134,-2.7825263536438955e134,7.775014338390869e134,-1.7380054104821292e134,9.461725873710306e134,-1.1751347431210442e135,1.03868022955446e135,6.2842667894488606e134,-1.736561959128439e135,2.192669645894998e135,-2.20327687632258e135,3.119733723505088e134,1.308382503482399e135,-4.996218850941418e134,1.526189400663397e135,2.7877711176303403e135,-5.0273403849929636e135,-3.041286578569204e135,4.9052326491882185e135,5.514809733707834e135,7.817795547965161e135,9.345406224724058e135,1.1240405904641641e136,1.4539248332667102e136,-1.2550327182340486e136,-6.03898581887227e135,1.5128129325803507e136,1.2889863093073017e136,2.0739921834665853e136,4.781562917722228e133,-1.8319241131113738e136,-2.1864355078134477e136,-2.0914326175825985e136,-3.152575724773957e136,6.389807950826462e136,-1.634002823768796e135,-9.969334429735427e135,-3.9201362661092275e136,-1.1365866221546512e137,1.3526376474225958e137,9.6272826877784e136,-1.996736642408936e137,7.214172062880281e135,-1.7575309521355252e137,-1.287184861685102e137,-3.3803252613329872e137,-2.6990158944164137e137,-3.9665620269977825e137,1.881817317111351e137,1.5388415041009267e137,-4.914130405679512e137,-1.216212109791871e137,2.0051491389615018e137,1.7626777780987934e137,1.0956773782646497e138,5.254966392250452e137,1.0868352228069227e138,7.672306689194391e137,1.0013913557270801e138,-1.2437129994083496e138,-1.4129047129337977e138,2.2165873778821374e137,4.782761969235059e137,-3.950368006209246e138,-9.919982663093223e137,-3.4759005078639664e138,7.940786612392825e136,7.546018715853791e138,-8.718073024048998e138,4.60773544591315e138,6.777089390781641e138,1.442463745147435e139,4.88536591444192e138,6.514309665014e138,-1.7800501914608833e139,1.4367015642454555e139,-2.1644492068324223e139,-8.831571949271999e138,-9.82383502955177e138,-1.5394054707783334e138,-3.891681111837234e139,-5.458569343226321e139,-6.816122298831374e138,-5.107031050022714e139,-8.863660153210067e139,1.1341919045508706e139,-1.1076503071408027e140,4.620049849771774e139,1.3019572114671732e140,-6.908385664432394e139,-9.062732230027339e139,2.1951337284171663e140,-1.6301007056918944e140,-3.00031521931836e140,1.7575041749685223e140,3.251822984158223e140,-3.175395073148464e140,-5.000587541242572e140,6.584834527051623e140,5.0626885709822525e140,5.012327410171263e140,-1.0017140557680942e141,1.958820182102772e140,-1.0237848732897043e141,-6.711214967137833e140,1.0057924401269774e141,9.366392422574423e140,8.096439738659569e140,2.3275445433742532e141,-3.078511574450577e141,-2.9979943220973446e141,-1.1949480151728699e141,-8.064507399099692e140,-2.528033693274885e141,-2.4855108370524365e141,6.456198169385735e141,3.9066995182537775e141,8.687641058492772e141,-6.598760129630974e141,7.980652662025934e141,-1.1647921539818707e142,1.1351591769579416e142,7.4914394369227686e140,-8.644390219058417e141,-6.416832321399125e141,2.9630202468666276e142,-9.051951445558218e141,2.9646379727033086e141,-2.8179167378711847e142,-2.0482770713844312e142,5.389745365337201e142,6.94465173193848e142,-6.060202057961981e142,7.131984906070426e142,-1.9405522396776394e142,-1.1945789334373586e143,3.7877789788798675e142,-1.6008676328869556e143,1.0871373341168126e143,-2.0231893149607354e143,2.11006819234032e143,-7.796144281545488e142,2.19794783916765e143,1.274696018232515e143,-1.0406493530115913e143,-2.682663935925496e143,3.400167730331047e143,-6.734285757901794e143,3.8834384309600984e143,3.2614102997513836e143,-9.756800768584596e143,-1.1274280302548927e144,-1.5170880470105525e143,1.3457270622196178e144,-1.5697270020729197e144,-1.0356655845358426e143,1.6505283904512847e144,-2.2193917840607585e144,2.533228028630468e144,3.604455459815294e144,1.1379487298878284e144,1.6791612704242443e144,-1.5279824311251783e144,2.185245531267916e144,7.56112573285837e144,-8.048213566441255e144,-4.667369779848582e144,1.0939097651136459e145,-6.321507088621715e144,1.1646077810420392e145,1.352498373354816e145,-1.4414518130865492e145,1.44371498109083e145,-2.6199273354502276e145,-3.110634130516947e145,-1.6278412538514505e144,1.8144355622556433e145,3.7736233545732544e144,-3.481972467258905e145,5.919551695397255e145,-4.8285237563865175e145,5.715796575453236e145,9.364913870151687e145,3.9803402675962625e145,-8.192138582500256e145,8.940049651756206e145,1.3865332222933992e146,-5.147709513939273e145,-1.0995541294425127e146,-2.1499064138445224e146,2.0308744585909853e146,2.6494980202986876e146,3.003406518948071e146,2.3897359441141195e146,-1.5855327099337404e146,6.2088781636342765e146,-1.4356053804724384e145,1.5193592803374717e146,-5.330679591885648e146,8.126893150667988e146,5.843730019143424e146,-1.20226212376971e146,-1.2265171277205247e147,5.7471844219643126e146,-1.3847510182082243e147,5.998557832832924e145,-9.343556396510241e146,-1.5693718779134284e147,-1.1670475330042045e146,-4.022823685386279e147,-2.491287662444679e147,2.4353138013857157e147,-3.508359873193043e147,-6.180743938835709e147,6.423238618449518e146,3.750916220004274e145,3.1974436805638994e147,-6.362575706612805e147,1.2463166561526354e148,6.536344584632536e147,3.5001909672697663e146,1.395184981963375e148,5.011494313388748e147,-1.2365846730055635e148,2.8607386842687933e148,-3.812079075937979e147,-4.489678656485791e148,-4.421675850898013e148,-2.23150952313276e148,6.461939435849028e148,-1.1660800070288251e148,-3.4211061102771545e148,5.852114565757114e148,-1.0078803489229974e149,1.0694757715339359e149,1.770216595302196e149,-7.489077681820395e148,-1.872817758709852e149,2.5471932366034754e149,-9.191996390536543e147,1.08131604932597e149,-3.399277177521241e149,-3.285501751288633e149,-5.538117320405993e149,-3.5894333903040507e149,4.420396365104666e147,6.305633955364329e149,-6.481999843901229e149,1.4594546780037861e149,9.921982870610537e149,-1.5169518520078252e150,2.0497325776330026e149,-9.895115416723248e149,-1.6071662600662206e150,2.7008542043942035e150,2.9871864671844854e150,2.919111583021891e150,-2.310567237615559e150,-2.2880861833727077e150,5.512149276633451e150,6.34905721612512e150,-2.124959036946845e150,-6.206138451155366e150,6.410003863392286e150,-5.746922243067005e150,2.7014864591747977e150,1.4341878940700033e150,1.0086919610207608e151,1.1124783021414015e150,-6.441851241792184e150,2.4861653771132014e151,2.3977179631158258e151,3.322161734210837e151,3.7886087537507727e151,3.3399620381774644e151,1.0130449994101918e151,3.44653447756366e150,6.615915364069995e151,6.521590949194704e151,-3.0186722848246335e151,-9.372375883716126e151,1.8532696822152256e151,7.679589225996816e151,1.6436825636691184e152,1.2359282501285076e152,-3.0107032900798855e151,5.300218429895024e151,-9.679611478156736e151,-2.31216571522879e152,1.293255979246461e152,4.178191622539886e151,2.7587445312686695e152,-2.7288129510640576e152,1.3577251629118213e152,1.5694653277211048e152,2.0145433861290475e152,-1.0156838546614558e153,4.249636926322968e152,5.265500789172975e152,-6.974418470222855e152,8.349705013235302e152,6.937843755322829e152,-2.121286204954452e153,1.1139232241848056e153,2.8281724571977433e153,7.645257365672059e152,-4.072008493438027e153,4.529652447304593e153,9.549037461060589e152,-3.904261552434202e153,-2.467407305121949e153,7.281285185346233e153,-8.600147451115545e153,7.94220982568588e153,6.053885700410187e153,1.839849575924607e153,-1.6414915006977498e153,-1.618565952523881e154,4.19906842386098e153,-3.791752708693132e153,-2.780461824769969e154,-6.891678884171799e153,3.380212785071419e154,1.5104040678919155e154,2.5846767459239925e154,-2.7156840852836374e154,-5.1418537410150555e153,4.8443004953650515e154,-2.713743644159772e154,2.838235504523029e154,6.578768835380423e154,5.384908666445559e154,-5.716095095934046e154,-1.1884054501584192e155,-9.764757651491788e154,-1.197317744749734e155,1.257132017065649e155,1.0099596036416522e155,3.0381325853985293e155,-3.3521910464594653e155,2.7894729598287243e155,-3.0238536686167816e155,6.023851128410132e155,-6.4790205868906e154,-1.3566143432307293e155,-9.01151628411983e155,-3.3961282491831835e155,1.9458555088017294e155,-7.451623912401936e155,-6.098251642283234e155,5.763338310225744e155,-3.389922030279928e154,-2.865731304429754e156,-6.249234345890442e155,-1.0763992958377147e155,-4.409578611220965e156,-1.4895605526978643e156,-1.7011976767280373e155,-1.4845001923285575e156,-7.84893495660573e156,4.2664316847604175e156,5.515466645800872e156,-6.398611483656011e156,-1.1316308465752385e157,-1.5956121272034315e157,3.790821976493248e156,1.0340062037258283e157,-1.920927512136016e157,-3.085577144248725e156,4.493699903276629e156,1.273775319787697e156,2.567452318712296e156,3.991691463385384e157,-2.5343444625283673e157,-2.484747937111045e157,1.981697963523362e157,2.6571874908046852e157,1.914084161042683e157,4.320763741452116e157,4.787759843876756e157,-5.4182850400759845e157,-1.7117814363498457e158,1.2795412231297823e158,-2.0431545857155987e158,-1.3908076621636786e157,-1.0798450490055009e158,-2.8696166994458663e158,1.2797094196755474e158,4.214040956936067e158,-2.9944859646925545e158,-2.8788290850745665e158,6.300624565595058e158,-7.084032688979695e158,8.192707225902232e158,-2.6235805269323475e158,8.963014083203333e158,1.338109342377207e159,-3.7534724244524845e158,1.4938696508807508e159,-2.2998666810271753e159,4.057860896492614e157,-1.4564789136778896e159,4.331612820885582e158,-2.369088792501262e159,3.754304461964718e159,4.466032752342668e159,4.348648185751127e158,-3.3828919652886388e159,6.3033592608276225e159,-1.5977112997562916e159,4.657860004523132e158,8.463993450048386e159,1.0409040107878376e160,5.245369966330843e159,1.4647564737862612e159,5.915965235793744e159,-1.5726651731688947e160,1.1122262520710345e160,-3.0447043728125745e160,-2.6753790709314425e160,-1.597300842925996e160,4.1732211543686724e160,4.968989766637916e160,6.2032621166620196e159,-6.974801432721207e160,7.221795923322963e160,2.1811041634285637e160,3.75291791311556e159,-3.665149642833632e160,-4.112689428371432e160,-1.0562175237456189e161,-1.6339876328428458e161,2.474058862377453e161,5.826906993803619e160,-1.198013769096553e161,2.6253082369130107e161,-4.0405534732232784e161,3.8324506207253934e161,-3.3719438442320417e161,-4.3222590286296835e161,-1.1084134739916254e160,5.663724192454413e160,-2.8247355538759166e161,5.75157795405727e161,9.723335840178448e161,2.8709545395147795e161,4.637132047794227e161,5.065289034953972e161,-3.7820364623328906e161,-1.6060430100733459e162,1.887975892358519e162,6.27370007334347e161,-9.828696458842174e161,-5.924377297867456e161,-1.1448398702204372e162,2.120211307176058e160,-6.440632512378996e162,4.482786445783456e162,5.80475644520906e162,3.099728986167659e162,-9.757559631420147e162,-9.871296097899487e162,-3.4823993843611382e162,2.0267870360905336e163,2.0215636817722513e163,-2.0187804640493446e163,6.881440050622684e162,-3.3245160586892916e163,2.8594044091247705e162,3.6287997158358424e163,-3.078764478701271e163,-6.281071942682251e163,8.941865915908731e162,2.0790917853979595e163,-8.823688150226739e163,-5.973136338750341e163,4.998998637897618e163,1.1125578622878313e164,-5.5030649551936e163,-5.5504348462167497e163,1.4018034833273097e164,1.6921816738053374e164,1.7848304909017203e164,-1.7207787508139505e164,2.8466846845997133e164,-2.1669023147260986e164,-2.6548188717361394e164,-5.796029275613851e164,1.2366390435046705e164,-2.6237326239346504e164,-7.5875992870407e164,1.8680941647518885e164,7.62626187859434e162,2.8757574410866103e164,-1.107655076259217e164,1.0308531813732456e165,1.3440739882512186e164,1.928514945326551e165,2.6849684794347105e165,-2.2110156581920365e165,-9.265834865569112e164,1.7799893320070133e165,-1.5910757905284277e165,1.5053882435508312e164,5.0067774947391205e165,-7.672686463394092e165,-7.104096263371036e165,-1.0071574254498117e166,9.099920549437867e164,4.165818426250801e165,-1.112979394044286e166,3.1428985889494814e165,-7.3591072749365575e165,1.3160262247968493e166,2.0185981198373087e166,2.6002872856595607e166,-3.5595861222912296e166,4.1246221456413315e166,1.362811488274604e166,-5.316322980059266e166,3.253650860558353e166,-6.596857059623495e166,5.0640394033777155e166,-4.214220132885501e166,-5.913901944631075e166,3.32144588412307e166,6.506477218213793e166,9.538031300906565e166,4.8757900380824694e166,-1.789287852776145e167,-5.133694395639105e166,2.894176231577511e167,-1.1143911030841948e167,1.9763427946835692e167,2.627248984912257e167,3.3640246918061254e167,-1.8299768782210789e167,-6.724939490807382e167,-6.342616770863385e167,4.328152116409622e167,-2.9674572903220786e167,1.1133910252135056e168,-1.4463811764629603e168,-1.254658610223843e168,-7.774774396221727e167,-1.1956961886209764e168,-1.8868882080828267e168,9.621935194898383e167,4.653159619976468e167,3.1699788065583395e168,-9.891956767805492e167,-4.7602086696200796e168,-7.786638918009701e167,-3.396873853718792e168,-5.569570820953293e168,-7.426538514285239e167,9.587649233612245e167,1.2481057159618057e169,2.029492730438092e168,-1.2694734425801187e169,-1.3488625845355628e169,-1.2774744886606371e169,-2.5070258141207734e169,-1.2310351838674858e169,7.984204706605799e168,-3.0913816067163055e169,-7.99592029106746e168,1.0150210633584523e168,-1.889949997680704e169,-5.3648407611656946e169,-7.231772992620086e169,4.19758789976417e168,-5.574861974209603e169,1.0815454200609727e170,7.431607689822847e169,-6.16121635516306e169,1.5291483084797036e170,3.0350357698919145e168,-1.411455441796692e170,-3.189485143168346e169,2.7213449784414045e170,-1.786175705079977e170,1.8592895568271464e169,4.034870521133192e170,5.787747046710464e169,4.876475350523993e170,-1.2766485142241497e170,3.8936513797584366e170,8.418060412541531e170,-4.4226549302087667e170,7.26333021351837e169,1.4283167701438884e171,-4.960808066420997e170,-1.321905836453937e170,-1.1508550615548112e171,1.5249991451965707e171,-2.319556269217276e171,-1.1932296425962281e171,3.736087022315906e171,-2.5987491146396537e171,-2.373076403836056e171,4.4504768174936744e171,-7.222908885445441e171,-1.8380137532340342e171,5.427690113498816e171,-6.0522769298271135e171,-3.5868974689861393e171,1.1164215860471947e172,-1.1246725452455876e172,-3.182491511165655e171,4.996910485294014e170,2.1771451172532703e172,-3.001466928355709e172,-1.3164912673063285e172,-1.9803196393698793e172,1.5506932332462156e172,-2.453059923706522e172,-1.7837226042693755e172,7.774071773651658e171,4.239391423542889e172,3.542617640599759e172,-5.809986784862627e171,5.1559514355277685e172,-8.138768002872034e172,1.0379393223326212e173,8.7505250055865e172,1.3063921272938808e173,1.3335926315318593e172,-4.275356343367546e172,1.9707885461561214e173,-1.9125136592917705e173,1.9325644782511752e173,-1.368392928335469e173,-4.342742189512377e173,-1.488407977685585e173,4.2764022452218264e173,8.581072032130463e172,-5.272719207765051e173,8.509695160692197e173,7.580953129931038e173,-8.459879731466136e173,-3.193464368223491e173,-2.144270623028357e174,-1.3207855801984833e174,-1.1531661921626471e174,1.761663400917282e173,-2.9516769627180893e174,-6.153784771491286e173,3.385684261614119e174,-4.123216647633987e174,4.314302352237504e174,6.581487008853307e174,-6.460800395899793e174,5.418201306251561e174,-1.10049320701432e175,3.4314950968873703e174,-8.582777585100133e173,1.623284257290065e175,-1.7512251484242596e175,-9.891661486349224e174,1.7890181591893022e175,-2.7953715292499213e175,2.1578173111962686e175,1.9297169168415147e175,-4.253316462280277e175,-4.053622885245805e175,7.526277560388632e174,3.6948826176089286e175,-1.4906663121605374e175,8.232175403380971e175,5.124466103053952e175,6.19775195438017e175,3.657310003569407e174,-4.7584034810596445e175,1.558717763331716e176,1.1589445112644362e174,-2.8372379724403292e175,1.2858922268561896e176,3.368792186966105e176,2.2754257512642133e176,-1.4518431479589777e176,1.391428040647159e176,7.074287707237224e175,-7.101035925268073e176,4.760224569054245e176,2.5783555708312197e176,-6.030409743860759e176,-6.231875712626897e176,9.643380135330141e176,-1.5620045586954092e177,-1.2141351999499948e177,1.8292305279823053e177,-9.39469184443841e176,-1.849578463877499e177,2.985256312114035e177,5.49812428455653e176,2.4246831189085725e177,-5.176097382948321e177,-4.100674772828799e177,6.307937677189775e177,-3.5710362380711816e177,-3.9897710229284146e176,-5.880911337120282e177,-2.186930859980931e177,8.900302246231369e177,1.4145354802889295e178,-1.4595811569241533e178,1.5534826093449175e178,-1.83379139255814e178,9.139131213416952e177,2.482990108113329e178,-2.5050643198082176e178,-2.6391997047698195e178,-1.4340314914224725e178,3.032003104340486e178,2.0355665625732523e178,-6.808492718193416e178,5.621927237955798e178,-3.1453924928857244e178,9.840930791181109e178,-1.01456105584542e178,-6.148080909604353e177,-5.144588174274351e178,1.647849378248215e179,8.375352466653995e178,-2.5688632625001982e179,2.3014652116858307e179,-2.8720349084771303e179,4.124795329369195e179,1.6280253254151785e179,2.2145171231566873e179,-4.7546442427186086e179,6.265094014130458e179,-8.52116809417457e179,-4.985655917392626e179,7.576676908878577e179,-6.660250364764042e179,3.3833925092618255e178,5.110211054833194e179,-1.0084170632159859e180,-8.452300844843941e179,1.3673463786607834e180,-1.0981448952315395e179,-3.434216417396852e180,4.0701401699048265e180,3.4878782875927126e180,-1.7644845314773945e180,-5.163070909555823e179,-2.195729037790062e180,-6.962547683583046e180,-3.801383560105181e180,-1.0559986902673734e181,6.140807968413987e180,8.221003965195473e180,3.7734213709426613e180,9.222034999903847e180,-7.858029752722093e180,-1.263845962873264e181,-4.510858405776538e180,2.8666941000751623e181,-1.998918767351666e181,1.3965143861318385e181,-1.41508543464203e181,5.350693181895691e181,3.1114774218987946e181,-1.805554541069377e181,5.695232194507013e181,-5.904707645333125e181,-6.810091509752241e181,-3.747970766013364e181,-4.069600410484358e181,-2.407864741585795e181,-9.998209526458971e181,1.5622477011884038e182,8.051948862354783e181,-2.1770197349113838e182,-2.5507226942482045e181,-4.115182245046529e182,1.8724412710984555e182,5.150028152672661e181,-1.9393664505237215e182,-6.256844164464386e182,-5.512987189032883e182,2.879818715280688e182,6.068843951558757e182,-5.936083783498474e182,-1.3739740873235554e183,-1.6942581709347451e183,-2.261654978993713e182,-1.2058342189553722e183,-5.477954971209842e182,2.620765699280108e181,-2.4933677193976723e183,-3.596487799335149e183,2.346492094512267e182,-3.981210043100967e182,-4.532612349856501e183,-5.244655877937268e183,-7.909136554986116e183,6.171883146531646e183,-4.002082608789597e182,5.196986527916539e183,1.2887295261120967e184,3.8211924657787083e183,2.0516375407895946e184,-1.0577438779872708e184,1.0495707805486308e184,1.406865101343959e183,1.3848143981723815e184,2.3523276087435773e184,5.716812034452558e183,-4.703523679799081e184,-2.4870627974144214e184,6.239369525049713e184,7.271552711706983e184,2.739265313574438e184,-2.919121741139075e184,-6.900021354807318e183,-5.71471528714195e184,-1.4486076293372883e185,-5.806169417435558e184,-2.633610858265599e184,-4.303103148468546e184,-2.790432157692644e185,9.448899778655219e184,-3.506783851844508e185,-2.0027586435746357e185,5.420413989622597e184,-5.3127532612430716e185,3.1489670764953837e185,-5.025731935019056e185,7.121770761318763e185,5.3032538129123956e184,-1.2224388816214116e186,-1.0457194654062485e186,1.5582061435726543e186,-1.7571178496699374e186,1.2953555564688368e186,-7.398016183480594e185,2.560028351436814e186,-1.2857940946253157e186,3.4967070667362255e186,-4.478846138084155e186,2.2095551491487547e186,-4.689173210514044e186,2.180279245582109e186,3.732574997052423e186,-8.249280655741772e186,7.233015581561877e186,8.417106919823209e185,7.681740990619063e186,8.278625372537911e186,-1.6443650363483819e187,3.4487508489400454e186,1.2770766774929e187,-2.315787004477316e184,2.546484115997689e187,2.630129656233959e187,2.6347248843631766e187,6.657588171384718e186,-7.88078362925811e186,1.5938841314048672e187,3.797079359078207e187,-4.9384766820674245e187,-7.55709757738465e187,1.1646159215199151e188,-1.2467183044858976e188,-2.8817163110046217e187,-4.636344473466079e187,-1.4521001668153255e188,-7.060204232870108e187,2.683622803924732e188,7.317102929847666e187,3.666172285989087e188,3.65733071515204e188,-4.395504243121384e187,-3.229047206730608e188,-9.230804246157776e186,-6.450665729884345e188,-5.013049305711111e188,7.84961223002389e188,-6.716794438077384e186,-1.0385183439796482e189,8.956414044045623e188,1.6633899574253568e189,-7.661984920885494e188,-1.2364965099228628e189,-6.941173079015558e188,-6.95960411928335e188,-2.805095513320122e189,3.094104416054818e189,-3.040258850068187e189,-3.598887415250695e189,2.751173578109472e189,3.052525069491174e189,-3.2066184159719e189,-5.345880432398176e189,9.14665008604894e189,2.6603837345962965e189,-4.868845107296009e189,-1.1716058366204974e190,1.4037085555877183e190,-9.442690668713129e189,-2.4758303153569047e190,1.6214138784869333e189,2.7245746386643658e190,-2.1648525965303633e189,-7.278442108547061e189,-3.810874788041041e190,3.7951801431493884e190,2.1241401807058646e190,1.188540034105192e189,-8.60772234927135e190,9.485058953960124e190,4.950727533233607e190,4.8301898353972515e190,3.828698613967271e190,3.794657085014375e190,1.8944113948255453e191,2.0602212470070673e191,8.065553103289899e190,-5.4264310728849485e190,-2.6714050272471945e190,1.6322451174019882e191,-7.027064213887993e190,2.4366676827619772e190,3.874174483513933e191,4.195425524879206e191,1.7964334073564545e191,3.384502152371829e191,9.419768167799252e191,-7.514117177913725e191,-1.283661453203808e192,4.2507217689828085e190,-7.518193258454302e191,9.614242364749439e191,1.8669270660266864e192,-2.8069435923395427e192,3.687790804179594e190,3.766056345282972e191,3.4861125701262046e192,-5.650118070183251e192,1.864512469849753e192,2.4504554176753165e192,-3.0853928068932395e192,7.254348285549797e192,-6.943336248097729e192,1.2577001679847304e193,2.802146947102183e191,4.762789272092432e192,1.412614215862803e193,-2.428392634448922e192,-8.558452789513394e192,-2.3324159755319592e193,1.951708151280354e193,-1.6476364108008997e193,-2.212777447284595e193,4.322443152041402e193,4.150171743831509e192,5.926830936509614e193,-7.848009505749752e193,1.0116464000895777e193,5.80646856318528e193,-1.4371790144878985e192,-1.3855866445642018e194,-1.5735098958210707e194,1.328482049402454e193,-1.0823838798461215e194,-1.2716297736149209e194,1.4134670817434039e194,2.0039633925868993e194,2.950432980745857e194,-2.5231596882139792e194,1.9050556817239235e194,4.918254956838533e194,1.730115938543736e194,3.463643279533929e194,2.7515334355772967e194,-1.052592028094911e195,-7.173963915763474e194,4.5088938013755245e194,-2.5286137902178844e194,1.61397389438243e195,2.0618312837851842e195,-1.361155124107049e195,-2.405230888208014e195,-9.287211040732281e193,-2.9016082823960546e195,4.0276543219815945e195,-2.435384239671572e195,-4.80202315828246e195,1.242890413048689e195,-1.4232151740229305e194,1.3049996731468203e195,7.557174766897747e195,-7.287300880468714e195,1.116738880376675e196,-1.3718168203709265e196,1.6408316331993547e196,-1.075540239759283e196,4.836155713152313e195,3.6464692881216286e195,2.1196065996501565e196,6.969643106542646e194,3.5493764857229384e195,-2.1411741452527938e196,-1.8676483204742188e195,4.789567932561505e195,1.7731232413591718e196,-1.575910606222186e196,-4.571025045116851e196,-1.0158008542113544e197,6.383740435551445e196,9.858709670610889e196,4.113395523380252e196,-4.3960968554439645e196,8.776956244724475e196,2.9166476061116216e196,-9.35912430663758e196,-3.367573650718901e197,-1.6152011616436406e197,-4.500025971071396e197,3.3039261305603906e197,-5.8972502990138034e197,-5.636666144943941e197,1.0665193997200202e197,-4.439005145237548e197,6.583385722209089e197,-2.6318670385048078e197,2.222557801994313e197,-3.180905757240268e197,-1.333587050786738e198,-5.330115983487761e197,1.845840382184772e198,-1.2722353319693755e198,1.9228149178446023e198,-3.9799444501401765e198,-3.691304146278032e198,1.8779207657938926e198,-4.493673417401818e198,5.55828675160171e198,-6.339363451682806e198,-4.051229291527947e198,-1.8566487504692738e198,1.217267155342335e199,-1.4666293842987212e198,-1.6496822708368215e199,1.5059866094964907e199,-1.6019439261806936e199,-3.5674022091617646e198,-2.6637507524385068e199,1.3736115661386096e199,6.318061519176919e198,-2.0925387213709877e199,-1.0922988226423504e199,-3.967592544392339e199,-2.8721541993397625e199,-7.276125557130081e199,-5.01909091230797e199,1.0936164802979832e199,-5.684820440456928e199,-1.2953428087805512e200,-1.0703170935260763e199,-1.6873833231812804e200,5.560754416033421e199,1.4042693756326578e200,-2.5922066230467854e200,2.559552265876677e200,-2.45393422248075e200,-6.565795333890629e199,1.2402819481395696e200,1.2513124343973465e200,4.751692760933009e200,-5.65974991545131e199,6.0879023431462696e200,-2.374591280685381e200,4.7972362416837574e200,1.2646816703949855e201,1.8314843587392093e200,-1.677663986908251e201,8.180902094831297e200,8.169599637499515e200,-2.0285483381356872e201,2.78904199940113e201,1.1202811373086981e201,2.755581855120809e201,4.287358207123983e201,-2.093503737405997e201,-4.664385264807605e201,7.330738063526383e201,-7.424201516809735e201,-6.587543186999363e201,-1.1034395152589474e202,-7.881528988441583e201,1.4800550408233423e202,1.1396106500168727e202,-1.8412530748570222e202,-6.825649395502001e201,-1.3893483302391251e201,2.613876817513807e202,-2.832416963985405e201,-2.039445115116263e200,-3.8262881942090004e202,-3.9059632525850884e202,-4.29681547479565e202,-3.7521226230521217e202,4.0698423146539845e202,-1.0519286827582656e202,8.494113794745999e202,-2.608700172985171e201,1.0055007681881548e203,-1.3710003289038758e203,1.176048884514854e203,-5.208599008174569e201,1.799991751095055e203,1.0139671578164521e203,-2.5943694493410804e203,-1.7212054040271283e203,4.002955088057722e203,1.1684382319749733e203,-1.9511945011174852e203,-5.935860815461252e202,-4.707781601828431e203,1.242072968577332e203,-6.546892624664746e203,-1.1755583711405528e204,-7.479509527366916e203,-7.355872993366012e203,1.7529816954266752e204,1.0553206525002463e204,-2.0495172454525494e203,-1.4328740521564805e204,-1.0356028929561231e204,2.5446695062649453e204,1.3014351031895925e204,1.9011305431254834e203,2.4574490349436003e204,2.7326244580480494e204,4.8532017428954765e204,2.3930775645252286e204,2.300700330037672e201,9.508691891264737e204,6.748612471923708e204,-2.9969837634254097e204,8.026544791244869e204,9.730667504495514e204,6.814319254429563e204,-2.0620915591917235e205,-1.8184019561002364e204,-2.0049180624966433e205,1.7084318364212094e205,1.452285195367222e205,-1.633276736253861e205,-6.174615471025774e205,4.283142543926026e205,-1.6033336707125195e205,-5.57871147172283e205,4.481329983901415e204,1.211466425505849e206,4.071998274894013e205,1.1766085451777589e206,-1.8957432660050313e206,-9.893218764990114e205,-1.5471143809987714e206,-3.8434452717887414e205,-3.1632366456303664e206,-4.0670601040483574e206,1.177984230598867e206,-4.9050161436292894e206,1.418140063925403e206,-6.770220596153347e205,-1.887336102415341e206,8.356673110498665e206,-4.117021241576743e206,-2.9288840745487758e206,1.3019321837090046e207,-1.3479404415674386e207,-7.965010980287445e206,-1.3937559916337998e207,-1.3841841717308857e207,-8.927747719788091e206,5.388035535959205e206,-1.0579930304994846e206,-4.2368775291873834e207,-4.835701911624201e207,5.355144798984626e207,-5.662076994597656e207,-2.1426792392074394e207,-8.333496213674664e207,-7.573123247022731e207,-1.0670760539932234e207,-1.4047513514724917e208,-1.0385141250096175e208,3.716458562439015e207,1.4482046614915834e208,-1.0570987674084452e208,2.958670406348877e207,2.8227420508450557e208,-3.0657119057873887e208,-2.0909510087453955e208,3.827428474321039e208,4.2919523330147975e208,-2.776283911531538e208,1.0778380044825165e207,-6.478449580478133e208,-9.437417244059746e208,2.762184209019954e208,-2.0696477634333764e208,-5.66351942081641e208,-3.492595639312902e208,-6.940558744014248e208,1.8379638870553048e209,9.01068398812601e208,5.609646641906311e208,2.5032249523069056e209,-2.521104093489717e209,2.886333472117735e209,-5.419643088154313e209,1.7003032554306267e209,-4.5798659550956964e209,-1.9322155548530477e209,2.8094697029414304e209,2.2196251318781258e209,-1.1310771437060403e210,-1.6434364126953015e209,-5.401801129737813e209,1.3860902596049078e210,7.407274994910839e209,-2.9346283513095606e209,-2.132492001257912e210,-2.0111824847132805e210,-1.1891133050008578e210,-2.3270082126483312e210,-2.8176301836463836e210,5.1958495407044447e210,1.508756318683652e210,-6.880414362376227e210,-8.73463452859483e210,-1.376616484264562e210,6.121163186137939e210,9.720962028316342e210,-2.5923497135554304e209,1.6957036716492513e211,2.139698608415608e211,-9.95180134409452e209,1.566558397938661e211,-8.415561742641456e210,-2.821245091667401e211,2.0822561171780327e211,1.9658884551119092e211,4.875738428779471e211,6.940868711160286e211,-2.5596285110838843e211,7.677412265754677e211,-2.6184348511655273e211,3.6525285101945843e211,-2.1165386474381594e211,6.108026361508786e211,6.960033951377931e211,1.9092299470508605e212,-1.858067618013998e212,9.749010505226456e211,9.554222623396048e211,2.1863607366648935e212,-4.111647181443392e212,-2.1626271400785738e212,-2.4874963198620606e212,-1.7244770115824072e212,-1.9247860164018007e212,2.060682487101063e212,7.501516086845941e212,-1.0239561216346609e213,9.422333627499176e212,-1.1564609269561821e212,1.1816121535135566e213,-1.2056507119413087e213,8.410174484144209e212,-2.308153027135168e213,1.124007209140826e213,-1.9621944038254768e213,2.653203285165416e213,-2.1905393251453713e213,-4.3372463813317616e213,3.456798816222812e212,3.833217245812978e213,8.104215644497966e212,-5.754757729228346e212,-2.6585122873201248e213,-2.453441510918015e213,-3.5586723671417277e213,-9.85970899833997e213,1.199206118435698e214,1.8462005146967147e214,-5.603151452711257e213,-4.3760503574852836e213,3.3412163431009815e214,1.0421688665679638e214,-3.440077189289294e214,-2.6821509487563625e214,3.182845574864421e214,4.472012855580927e214,-2.1597647460993784e214,4.654120548202822e214,-1.925340759991797e214,-8.063592742600075e214,1.154529606287873e215,3.718364051497373e214,-1.8459884906350877e215,-3.465370353299281e214,2.401865051611224e215,-1.8544118077216206e215,2.2135555690486857e215,4.418438646054508e214,-4.3481125983688405e215,-5.0132769828973425e215,2.370042722354922e215,-2.778547853199329e215,-3.725309317895562e215,-5.793585847744623e215,-3.7385480135027334e215,-6.2189655395658115e215,-1.2677585110141588e216,1.6594925060280714e216,1.3881724280020332e216,-1.3374136768267743e216,1.2582053201885975e216,1.9937290150012392e216,-1.947561773288418e216,-1.2436070883486557e216,2.3967135972905565e216,-3.28979296907247e215,3.571207578846165e216,3.1736479754110756e216,-7.710764261545536e215,1.4495414441897568e215,-8.89562041116334e216,-7.134634947787144e216,3.814974513498741e216,-1.4929556972879588e217,3.9709314716109945e216,2.0886089951440996e217,2.052050401872575e217,4.2315971841722457e216,-1.7633763201642405e217,-3.321256718672309e215,2.2855661169881e217,-2.8600838350942433e217,-2.0551234445386997e217,-4.0876597506651617e217,-5.34441224084367e216,-2.9326290704364305e217,-2.9268295625204404e217,1.6332935156866732e217,-8.466190452858278e217,9.804975576247576e217,2.214679268630006e217,1.5347665434873792e217,1.457250895068216e218,1.2936390248788978e218,-1.555646054288672e218,-3.1724872709214924e218,-3.999225867750492e218,-2.9803429125841462e218,-4.539973049190323e217,3.167616942779467e218,3.91709787293003e218,5.939842992579928e218,-6.082956456942381e218,-2.2698470610934773e218,1.131026670000834e219,-8.008728709504999e218,6.4122898931990476e218,-1.1910246345191752e219,-1.3797518968411365e219,2.427829679487852e219,3.3745960301627592e218,2.524991425473991e218,-2.2444402190471942e219,2.7563007009104692e219,5.16773771543158e219,-4.5974162905193195e219,2.061203972128221e219,9.691151980059167e218,-2.894147628894169e219,-6.67845903439298e219,1.8267342978573044e219,5.861096938244372e219,-1.1216614997297243e220,-1.9536219271486162e218,-1.0353380640877812e220,1.7117620088895448e220,-2.6262724000448655e219,1.6668869596949625e220,2.2420980498311259e220,2.259213733474052e220,2.966011006994059e220,2.725296188330447e220,4.428494911059733e220,5.794685041553999e220,-5.508380371338744e220,-3.1346289410157336e220,-4.180383482229301e220,-9.12007564565048e220,1.1217734967306472e221,4.0270689123756433e220,2.0578813407419326e221,2.159289334379384e221,1.947997473579632e221,-7.90309107976775e220,9.867874730242053e220,4.316979527822153e221,-5.0105754309883684e221,5.809036522281141e221,1.4037704715378096e220,-5.821845674621481e221,2.9564403458408843e221,4.969680182578781e221,-8.546004871707732e220,-1.3640685976834861e221,9.652219899770561e221,-1.2701608245323801e222,1.0268902798628864e222,7.1762215265769525e221,4.2419232334504306e221,2.2044491820985677e222,1.1952256494818417e222,-4.168403530596584e222,-1.90035637366915e222,-5.526204171064436e222,4.481835246953328e222,5.637124225969876e222,6.132359202813272e222,7.66539252312431e221,1.5737335198481876e222,8.858096547955799e222,-1.7051402080607445e222,-4.139971353897127e221,-9.202930434545266e220,1.377024121707891e223,1.9606915935357924e223,1.1967379052707337e223,1.7702152934457438e223,3.568418144527549e222,-3.0057199809001875e223,-4.246519813659981e223,6.988097333199741e222,3.1820586337204433e223,3.105633588098851e223,1.1190359771436266e223,5.38504010770803e223,-4.3076388374762107e223,4.5327646753098246e223,-5.751596451029964e223,-1.2956536850526156e224,8.050440998285702e223,7.846829245872054e223,-9.87306392254267e221,-1.867637681901765e224,9.848583082279323e223,-1.5178448775528538e224,-7.479174392374332e223,1.100526517601543e224,1.5327864205002953e224,-4.461887743509869e224,-1.4018612816757527e224,8.94660977619579e224,4.798332316463437e224,-2.985139611189363e224,9.433885351432427e223,-7.986702333702934e224,-1.6698657105822387e225,1.7927459641967002e225,-7.896134715506133e224,2.2211328396522394e225,-2.438976083311711e225,4.254046638996708e225,4.393357545501016e225,-1.7900267344978232e225,-1.5197042238252768e225,1.856444947728683e225,-5.4639284087831795e225,3.363897233318004e225,-1.5513655142123267e225,-1.1868733713236546e225,3.728626649704979e225,2.528337961103206e225,1.86353154018272e225,-4.430548337481358e225,-5.1795042936702764e225,2.2076083293057483e226,-3.07454850631728e226,3.022556668027808e226,-1.1532434415781601e226,2.568591733914815e226,-4.49025092978415e226,-4.3384104155813606e226,-2.9778383434227964e226,6.896040412888866e226,6.398322321082315e226,4.0334219066376316e226,-1.3974385313134102e227,-1.081373747205535e227,1.8316088839734409e227,-1.008548828274776e227,1.7915034708514225e227,5.936529147262669e226,3.4881624940583203e227,1.5536629357583804e227,4.727603318888471e227,5.435100376854966e227,3.8211662779993e227,4.549568750692908e227,6.432584507501803e227,-9.564887980903034e227,7.056769373304867e227,-1.1245053821847445e227,1.4812568214045182e228,-1.1991798295712165e228,1.4489066407607692e228,1.4817987211840133e228,2.501186018446194e227,2.472886157636817e227,1.3370254664881304e228,-1.2332865997888514e228,2.2375715388367714e228,-1.5535741472290696e228,5.486537229837539e228,-1.312154691097137e228,3.597587014677449e227,9.0386428657672e228,-5.568304391510947e228,-4.050907019597741e228,-2.912154423930358e228,9.584367101125001e228,2.6182862360158978e228,6.101225932714713e228,-1.5300980356503133e229,1.0819113059443841e229,-1.916961697401768e229,1.6956837747060347e229,-1.6157021397422128e228,-2.800662015666368e229,-2.2874625726825034e229,2.8914798649333117e229,-5.777290373422982e228,5.244946808832996e229,-6.231129759912634e229,6.000737833710007e229,2.1050846915755733e229,7.774078262950497e229,-1.6015899985241054e230,-1.322629799998174e230,-2.1525566953070683e230,1.0818430880521979e230,-5.229124253458236e229,2.4051669849096996e230,-4.059875755469447e230,-4.824835664480958e230,4.3917721357237974e229,4.67939751891751e230,-1.1222705646844365e230,4.557465095961072e230,5.8655097724321026e230,-1.255729919540628e230,1.2848426067262418e231,1.4009470053575837e231,-2.9688197836722047e230,1.5074790867686085e231,-4.976658512458051e229,4.04380946374992e229,-1.2135554254152896e231,-2.5779264789707586e231,-3.6492451475112273e229,-4.8809138032691685e230,-1.5784876617505262e230,-3.558453721769491e231,6.476221340390281e231,-1.559181963497882e231,-8.078817223877029e231,2.0118535047726098e231,8.353265398795607e231,9.637960598813444e231,9.663882226234582e231,-8.867730133853903e231,1.7049274385697662e232,1.412876204316551e232,2.3910275875180324e232,-1.0808482724577825e232,-2.165252161614714e232,4.629613315645432e232,-5.270076015387523e232,-2.692396108277871e232,-4.574173952697651e232,5.321728369782034e232,1.1084891138367315e231,6.731955509252484e232,-1.7380822018362103e232,-1.6552261778622649e232,4.8162589032177916e232,-1.68141023053815e233,2.000273659588686e233,1.2981111296147018e233,2.5617651565001324e233,-4.051221908977547e232,-5.808767459550593e232,-1.2138171557045418e233,-1.5182853642806333e233,3.7652332773500737e233,5.314082404301201e233,-5.349367109419873e233,6.077089743956264e233,1.0082322364711313e234,4.961945312983476e233,-7.627886112146864e233,-7.213504353736688e233,1.2379128250402525e234,1.443805051880768e234,1.1238328250249287e234,-1.8974790467626243e234,-2.9845543471473165e234,1.913102857297951e234,-9.43007330715789e233,4.1019586419781275e234,2.2685284715175784e234,-4.082578096578064e234,3.726502335366854e234,-6.156103220279987e233,7.6617992667716e234,-7.730172654175434e234,-4.357695358729103e233,-6.451019967318458e234,1.1143802738030913e235,1.627511799712368e235,1.0700489441420421e235,-6.8577876323050515e233,-3.1565327925962553e235,4.052251954340346e234,-1.7150251174768074e235,-2.755529277357322e235,-5.548944937486886e235,-4.5708964089578334e235,-6.546028718826184e235,-5.829477922662487e235,-7.052225062249808e234,-9.012259518803127e235,-1.2482870769341348e236,4.084908920702036e235,-6.771166729013128e234,-1.1999208292298784e236,-1.1164794051299412e236,1.950179672981904e236,3.418712066344381e235,-2.510017529361528e236,-2.5686910135134108e236,2.7865255162537495e236,-4.351046168246982e236,-2.3061762025727093e236,1.9881673406588838e236,2.0003038374519543e236,-6.536360277835444e236,-2.4964799497877728e236,7.117131071935246e236,1.2367313338717509e237,2.4646793217957835e236,5.424253298639201e236,-5.889484167405275e236,1.6509340966430594e237,-1.9555334486062476e236,1.1368565299646443e236,2.9911445469501376e237,3.6909106969954325e237,-1.0811325991405814e237,-3.580091522802615e237,1.1947757849903567e236,-1.523643226313157e237,4.571355973214299e237,-4.904501477052203e237,3.519780336137115e237,-1.226107662486682e238,1.0811063485520819e238,-3.174780365858186e237,-1.9058078935703114e238,-1.7271126568898506e238,1.2907146793150419e238,-1.2308595537070616e238,2.881484667052626e238,-1.8382141441557396e238,-4.150142431694181e238,5.386171349300163e238,6.271370634340585e238,7.448320863164423e238,4.748959550569465e238,-7.004109520616542e238,6.95758000598932e238,1.4501890058643384e238,-9.367521593523441e238,-3.0408041067965153e237,1.093754315453909e239,-2.2033175681840403e239,-2.243047432312177e238,7.980746558541595e238,5.363625526071523e238,2.821180579705701e239,2.361421522692399e239,1.0458867705516199e238,-3.5292057931849655e239,-1.4450941435828641e239,1.0451754518334348e239,-8.340455201950316e239,8.762264957286738e239,-9.316842813771575e239,-7.159248070317355e238,-8.224213487211738e239,-8.917669199360403e239,1.718450115886199e239,-2.2982732213292463e240,1.1707593442244818e240,9.91810298372701e239,-3.888376059133689e240,3.413260497369521e240,2.252440212279462e240,-5.7556698581289296e240,3.9742773288021796e240,-5.2037882901623715e240,-6.140078683272824e239,-9.076235496899506e240,-8.96157382630086e240,-1.459224142787268e241,8.267529167398495e240,-1.582909577439636e239,6.251831582506604e240,6.983006366052447e240,2.693889606262703e241,-2.1655536809349605e241,-2.2517600865315392e241,2.5442008931540265e241,5.0904460730538373e241,2.781483042873759e241,4.1367652844957054e241,-6.668847165656895e241,1.060264631971999e241,-6.564240544796693e241,-5.625465856649165e241,-1.1581130311119326e242,-7.718231037512668e241,-1.3401246876193131e242,1.733880036831755e241,1.726287487736926e242,-2.0733463832479652e242,-1.6595370709486077e242,3.631625483392618e242,-1.7993897214781539e242,2.3084380032480194e240,-2.0451263801640327e242,-6.584347098608256e242,6.365851187587067e242,-6.03545149534466e242,6.631451360628395e242,5.6524591941238565e242,-7.215468105397628e242,-1.5258052314084342e243,-1.019181585267344e242,1.787123325520795e243,1.5994837675856465e243,-1.5671338449436464e243,-1.7739962853055032e243,2.235518362238772e243,-3.008777968144982e243,-4.716358136884502e243,-1.9512856754193323e243,-6.497082164920054e243,-5.377244459680049e243,-3.5687955775984627e242,5.270051252469021e243,3.791016383687403e243,8.687295604529655e243,3.184477800637147e243,-8.394877076282998e243,1.8305208638600158e244,-5.474747208661365e243,-2.3838835925250872e243,-1.5462736395603593e244,9.014934425377465e243,-3.336759931921493e244,3.876872847097271e244,1.2871908680774584e244,2.8378805491383016e244,6.140561699365771e243,4.7565864627874145e244,-8.910951414025606e244,-7.430679820787797e243,-3.3952657005645825e243,-1.0473248080595334e245,1.212656468762698e245,1.5299553805164599e245,2.566615854244196e244,1.1492149468805977e245,-2.933990239649999e245,-3.0230665302508515e245,1.4975839729376083e245,-4.352761828918352e245,-1.6728285975895498e245,-5.492111100661495e245,3.34709095918566e245,-2.3771103709616013e245,-4.0816412914014673e245,-2.6647248979000407e245,7.976305627256914e245,6.411570847747023e245,1.2485528279887866e246,-9.959327780133916e245,1.5139124279626563e246,-2.4383274351067113e246,1.0087350524804168e246,-1.8774066069689774e246,-3.719002317384426e246,1.2033306170110573e246,5.065814050777718e246,-3.879609035109992e246,-3.4938261185326637e246,5.605127787548592e246,-6.052998299026611e246,9.308878561772983e246,6.01262388747074e246,-6.120325788058425e246,2.421608256678391e246,-1.2509497494951049e247,-1.0865201558541948e246,3.3579804224079567e246,-2.613100778939277e247,-1.8574299835435856e246,2.903654026831467e247,5.1166275977249465e246,4.643516707416786e247,3.8111517882199144e247,-5.16807045149037e247,7.469959530713802e247,-2.092735736704132e247,9.742786907052653e247,-1.0109749604832168e248,2.2383696142235517e247,1.171254284710944e248,-1.0193851053561396e248,-1.9525101426846165e248,2.1154615225167238e248,2.1040895942077796e248,-1.0699175291018516e248,2.9819363806027113e248,-2.758420838172704e248,2.588893032261152e248,5.678988753111727e247,-2.3619866966747833e248,2.31305806028462e248,2.0463300307047287e248,8.746990343564618e247,-2.8392089621458357e248,3.617342926188937e248,-4.723423070265679e248,4.983467994331265e248,-1.1319288675698637e248,7.093986135530527e248,-2.6116688722296047e249,1.8582319708646503e249,1.8968805334270553e249,-1.1893859568531537e249,-2.066221738563786e249,2.3708038750660893e249,-2.368516289410135e249,-1.7438232201538774e249,-2.5998138086146868e249,8.353114249231864e249,-2.444426970289818e249,-9.52858811399125e249,-1.9791793836292106e249,-9.94862623682245e248,1.0396572330507089e250,1.9823102034933394e250,1.0767263498849639e250,-6.483937042794973e249,2.964770491952211e250,-1.0893410770939324e250,4.243884304807676e250,3.7189538559753396e250,2.604159514001455e250,-3.12970188257947e250,1.2369908555074831e250,-6.064420586786027e250,-8.143959684831668e250,-8.104756258045444e250,3.140832535746364e250,-1.5008519461426998e251,-1.455705633654086e251,1.0602886855769567e251,-1.9199399608164195e251,-9.685771980190915e250,1.8312046217033738e251,-3.5759865197721124e251,-5.5609206063340524e250,-3.3402442669135557e251,-1.9313139137041205e251,3.331248657784539e250,4.452653683967331e251,-4.160057449217124e251,-8.357213208385349e251,3.306221957885417e251,-2.2747939694619853e251,-1.8016727074511964e251,-5.155780697827414e251,1.939062441746483e252,-1.0398660056061173e252,1.2015555427900697e252,1.3078697148018843e252,-3.8707679253486317e251,2.0138547913378214e251,-2.1024486280480654e252,-8.357125539003812e251,-3.9223466173538516e252,5.400973158832555e252,-6.1599729803900655e252,3.906933739147988e252,9.274499462290974e252,1.045726344561561e253,-4.433488641846871e252,-3.257930034240153e252,9.97239846640554e252,1.930703518356666e253,2.4265272939516204e253,-1.898802875967607e253,6.985996703798813e252,4.138807948496406e251,-3.712364997316101e253,1.401127390351764e253,4.169191717019437e253,2.937518980944012e252,6.419455135797923e251,-1.7439605849191125e253,-3.5731960166811896e253,-2.3399379408214533e253,4.745758133867968e252,9.82879188958586e253,9.636267742410744e253,1.7928452978878468e254,1.585475105187536e253,7.939277199790653e253,-1.556339863876063e254,-1.7854560913033626e253,4.176818042960125e254,-4.529528824008952e254,-5.589321279925575e254,9.296959028124589e252,5.12426337440807e254,-9.269348060355864e253,9.502326114546367e254,1.0254624243655456e255,3.845051471840984e254,6.523710332759781e254,6.539195173574503e254,1.540724716153286e255,1.814482789483687e255,9.051208184252547e253,-1.0681641542395058e254,1.7737838136616194e255,1.789966006018435e255,2.7858143398213722e255,-1.6182463876409038e255,3.946559584314545e255,1.230055309898503e255,-6.610013204933561e255,-3.5265211769391126e254,3.0449786575161232e255,5.8393999842394545e255,-1.3329153501580116e256,-1.4137570952677857e256,6.609988069302809e255,1.7382336694972333e256,-1.722102404633966e256,-2.8469044060996706e256,3.181604592278723e256,-3.049136331589586e256,-3.9706023424829573e256,-5.118447698198453e256,1.2848774684262198e256,-5.596383076653618e256,-6.58424374703426e256,-7.731955424245539e256,1.0544051370084499e256,6.935751929563864e256,-9.504830636123379e256,-1.6904659230335826e257,-7.217293939119535e256,-1.269573299337312e257,-4.757711469947762e256,-1.4278972817141647e256,-1.801035610936509e257,1.0642274353825975e257,4.0339689578419697e257,-2.400396648451064e257,5.210044769549577e257,-4.8758761052775885e255,2.209026105037081e257,-1.7324283851226662e257,8.7030006414195e256,-4.930817118213661e257,7.151635666513927e257,-3.982693381300792e257,-1.8024392022568462e258,-8.993688394447226e257,2.036616755124061e258,2.269563061836162e258,-4.5465611623187453e256,1.1849796431898716e258,-7.330768132101047e256,-1.0082868016592445e258,4.823539515426001e258,-6.68518951424911e258,-4.739102496807339e258,-5.061740525621e258,-2.0134848876676565e258,9.488149438954827e258,-1.4339559282833414e259,-9.188258992544716e258,1.4873089614081716e259,-8.6809591103769e258,-6.7614622356088925e258,-7.154789275896752e258,-6.430235381937258e258,-1.989157453011368e258,-3.192434100046088e259,-3.981990639386185e259,2.0053249720135966e259,4.340426706308035e259,2.407480881619376e259,4.911178686064977e259,-1.4849425625411372e259,1.0532485627858963e260,-8.684650888497666e259,-9.384272786093035e259,1.037904178960708e260,-1.40186777616479e260,-1.3552466239274933e260,-5.653548247700825e259,1.4607023100838617e260,2.554559607030938e260,-3.842754564584648e260,-3.851933495825864e260,-2.5790447928508823e260,8.722324388827135e259,-1.5687777949640311e260,-7.934768039644038e260,-1.6250913586124957e260,6.933910292891964e260,1.1708494403988593e261,-3.7389535219494447e260,1.3561306530212242e261,-9.145425361746121e260,-2.232882009334278e261,1.529188760656699e261,2.1195638325527846e261,2.6508033812989098e261,-1.1764838826818294e261,-3.1273260711366125e261,-1.798218389338027e261,3.3331350314638834e261,4.351506808493466e261,7.6580777727951525e261,4.93316418500549e260,8.547902897335382e261,5.414427181333339e261,-7.40374253235909e260,6.349881194545221e261,8.204279972854527e260,1.3396517489644812e262,-3.1607114605436254e261,2.960725642532934e262,4.5164094286517467e260,1.6788345225141505e262,1.7195853465958547e262,-4.036508597237988e261,3.640373766770554e262,-3.046719291659438e261,-2.726435914523422e260,-7.108247212312397e262,-9.367768934865141e262,2.162842766641308e262,-9.082885062164421e262,-5.809303963146643e261,1.5231401333772078e263,-4.345297682369139e262,-1.487042455549595e263,-1.2285710933287852e263,2.1825070190147074e263,-1.2131870915578735e263,9.176405180853886e262,-5.151514543059867e263,1.4610095440703148e263,3.1829131363703853e263,3.603541684812977e263,-1.1230595328141298e263,-5.827560844490734e263,9.022124266844901e263,6.920507781684176e263,-5.067590413119499e263,1.0630322956230846e264,-1.7423842583344877e264,1.6703811216659683e263,6.197239693359505e263,2.0741616582485574e264,3.5105499275094107e264,-5.849527829169945e263,-3.0096251317924365e264,6.643165607673478e263,-6.629204218757696e264,1.4968879860690997e264,-8.605917884362356e264,2.3251149517148043e264,-9.886458792541379e264,-5.584685506883069e264,1.4206750940955589e265,-1.4296320718366995e265,2.053620814019289e265,-9.634432923137212e264,2.0977556049845176e264,-9.112406402472125e264,3.565336421803876e265,4.118416302687326e265,2.7387998562412527e265,-4.2047860043720416e265,-5.881399944089414e265,5.695012378579509e265,-1.6877903802794976e265,-7.934618266110754e265,1.0508487907583919e266,6.897537239495198e265,-3.599859431010805e265,1.0348387111747402e266,-1.474815754424344e266,-5.614422607905126e265,4.660156389313977e265,-1.8267886278912312e266,-2.823858994640254e266,1.8538992845855643e266,-1.1415167200240892e266,2.1040121968938375e265,-2.693891172594778e266,-5.325025518591794e266,-1.758974210441521e266,8.411323399094196e266,-1.4482016372752505e266,-3.747636443019412e266,1.3756168749150678e267,1.0953405375795378e267,1.7602828397309333e267,-1.8767626430091792e267,-1.318729709069774e267,-8.194523369472263e266,3.0826421751751406e267,3.3012331355170878e267,7.859514260592171e266,1.1346574450455543e266,4.2061728425738015e267,4.797150991200414e266,-1.7025189863544012e267,5.3726036601312e267,5.71413675880372e267,9.272738428164614e267,4.322874499876299e266,-3.530344261449806e267,-1.3626869501879718e268,-5.96915511574822e267,3.0567473571548738e267,2.6731906207499943e268,-2.0969650339421304e268,1.9408031045714925e268,1.9444061615675033e266,-2.3564072245987407e268,1.7285896932374975e268,-1.5558184741919062e268,-4.3641092443885056e268,1.913783994470079e268,1.1061458814995974e268,-4.715380018953284e268,1.3416026443196836e269,6.813714293736937e268,1.0777556762863544e269,1.91609802697851e269,1.7216943264498686e269,-2.135242070054426e269,-9.63172862003594e268,6.846694662386706e268,-6.354392495768503e268,4.023525567134594e269,5.332803826484266e269,-4.9361879740539376e269,-5.218531461905726e269,-7.244775123937316e269,-2.433790130845178e269,9.456617331900928e269,-1.1579638564748948e270,-1.2038524006755563e270,3.89837954569083e269,3.0224612094737307e269,1.4131144912756857e270,-6.970186205096089e269,-2.2593392744515224e270,1.7466377651367374e270,2.1640315956210345e270,2.8562019008176096e270,-2.328364005460939e270,3.18486848060943e270,-5.794520105810448e270,5.900427840702706e270,-6.57108988987902e270,-6.581575359818167e270,9.920518304776372e270,-6.899308115580285e270,-1.123028240079297e271,-1.3594896683723473e271,1.4786204859720139e271,-3.498801036031027e269,-1.3595130515235483e271,-1.653146948684345e271,2.688276610920317e271,3.872544356544671e271,3.2869836237348576e271,2.2958341792347263e271,4.716386002131305e271,3.8520065511190194e271,3.96706370766144e271,-4.150498041709014e271,-6.202873253360665e269,1.1905295944605068e272,-1.1924897747591218e272,2.777936358564926e271,1.529066849826152e272,-1.7920911251877007e272,1.30351647773238e271,-2.3626256916635284e272,-6.0975359814409676e271,-3.0760498399645096e270,-1.144717079774276e272,-1.92506636308014e272,-6.535084470500345e272,-1.727321348433654e272,8.10236872547982e272,8.011734342098595e272,2.9749117327609335e272,3.998501491094915e272,6.869080180432272e272,-2.5858126933153847e272,1.21372537547433e273,-2.227124402316334e273,2.38974209402314e273,-2.1691319157156056e273,2.1747542473869325e273,-2.2896136567302035e273,9.103443129430806e272,2.302793404359698e273,-1.739228455672951e273,-3.455310183887981e273,-3.890547327500177e273,4.796352583073182e273,7.691701832608502e273,-2.2298507942886707e273,9.46075528865986e273,-1.1646398063872137e274,-1.1518211053269988e272,1.5567338504911206e274,2.6500320303551726e274,-3.056528159869745e274,7.314083695239403e273,-3.9781449984689144e274,-3.909168704227516e274,-4.2135011324166925e274,-5.5969188034046975e274,3.8797097998692524e274,8.325772093563523e273,5.833530928840511e274,5.377441982427162e274,-4.49462870524334e274,7.325694146370449e274,3.7806822560467e274,-1.7450241959188108e275,-4.3152754114502435e273,-2.1406186480627838e275,1.7856891356801994e275,-3.389079379507361e275,-3.057420651382793e275,-2.449353696632806e275,2.012936033524312e275,5.819506932344527e275,6.285362994210871e275,1.6987491970131802e275,-6.433986753151061e275,-5.001011802793623e275,-3.9902554388134455e275,8.984705671205337e275,-1.0705952148633509e276,1.4033623142051485e276,1.0399113146403742e276,1.037122037525507e276,2.792453976334987e276,2.9223826359555675e276,3.214962795870846e276,3.701042638911033e276,-4.4213852285535216e276,1.1610826225023956e276,3.760773599080732e275,-1.785531124338962e276,-3.5402301846322764e276,6.593276181952158e276,-9.73015620330978e276,-5.993953643461236e276,-8.459999744298513e276,1.6457029232027248e277,-1.8696928818433185e277,2.535032468827595e276,1.4762054833098271e277,1.7863385329358296e277,1.9587269840902282e277,3.4332566766427464e277,-2.1182020922810113e277,3.95350210337375e277,-4.300731168378889e277,-7.472105950896249e277,7.614015704027304e277,7.030894245527143e277,-6.09406197802543e277,-3.647718818815484e277,-8.559053249761446e277,1.2099926855298574e278,3.1794897541795917e276,1.6961614306483194e278,3.339711638331685e277,1.4352024353971566e278,3.0625358858048193e277,-1.6276100155121492e278,4.5175543060669655e278,2.922105585360681e278,-2.9607864124435076e278,-3.512781525433232e278,7.078167342210009e278,5.905509302966753e278,7.763087094216285e278,-8.250036795056505e278,-9.931604075188756e278,1.3221583474953116e279,1.9410505515147633e279,-2.144541275373069e279,1.874270731444828e278,-2.5603889982623063e279,3.0690275726376647e279,9.642588032426068e278,2.070874745803018e279,-4.5353076232256237e279,9.736941025188188e278,-4.054282745887171e279,-1.8321797544085414e279,5.445323106873965e279,-9.016990084879439e279,1.0709178923672886e280,-1.0226430478210802e280,-6.389809277683333e279,1.3073995255152735e280,6.928342788627604e279,-1.4659752008147096e280,-1.276930566246946e280,1.1006588005499962e279,7.060891218195698e279,-2.781881225222339e280,-3.64172939399499e280,-5.877936646434561e280,-3.1892939490797386e280,8.358727969222567e279,-5.37222355114412e280,-1.0175393728882994e281,1.448188544885867e280,-1.223765021874486e280,-1.307849792280757e281,-1.681621466847752e281,-1.952744206956852e281,2.0179526623931578e281,1.6452726361093437e280,-2.7215061174305162e281,-1.9038731696012947e281,-3.36006460532253e281,-8.193459730645571e280,-4.112597764481278e281,-2.4416289151480196e281,6.449484813714746e281,5.500656301125446e281,-9.037229980740147e281,3.219073081113811e280,5.4424025207845095e281,-4.178941024207341e281,-1.4083939434799387e282,6.613097092472129e281,-1.3945020119664197e282,2.34400928793714e282,-9.919249850248636e281,1.0323180352910688e282,3.3491344208390453e282,-1.8316683068409862e282,3.419095322723118e281,-6.288152973118867e282,-6.121701511685665e282,-8.587449984593687e282,2.4606618376741023e282,-3.619674585263389e282,-7.607925825968391e282,1.6119926534983157e282,1.1427493668167595e283,-1.3043648609405982e283,-1.0923449455835835e283,1.9745544588489194e283,2.686162007289156e283,3.3035921955211756e283,-5.0550290166967776e281,4.283154058970893e283,-8.085727651037199e282,2.0427864027325026e283,6.439290173080331e283,5.123490941475743e283,-5.942595812281367e283,-4.085515243175687e283,8.303735016341571e283,-4.372655478724875e283,6.186822722484858e283,-3.114436406320211e282,-1.1111626618100418e284,2.118636756235969e284,-3.899726178995511e283,-4.43108910767715e283,-3.098891154746426e284,-2.4211513779949334e284,3.7056045205091064e284,5.7597834677607146e284,9.51799210117795e283,3.0904291906889714e284,6.339506573233395e284,6.649761914735397e284,-9.394188851360827e284,-1.3731674064667204e285,9.29182358819931e284,-1.2097510609577267e285,-1.2636007940610178e284,6.642531752566085e283,2.1217537044481256e285,1.0676312037288479e284,2.2723092830815295e285,-2.8956371050657014e285,3.5797763828116825e285,4.225796223895121e285,3.185063930163383e285,-3.3121916628400054e285,-8.807657874136057e285,3.800672491943897e284,-4.841110600062767e285,1.0291749983293597e286,-1.4854328775097406e286,-5.5503597066163404e284,-1.698279812990863e286,2.097437179948978e286,2.7707810926611384e286,-1.3280092739424982e286,-3.5494243193359306e286,-3.029803872731947e286,-3.344461765397667e286,-5.144753839067041e286,-2.9196088432804215e286,-4.843920794712301e286,-8.281831731025028e286,5.209815452835128e286,3.0265824767133577e285,-9.183265977060541e286,-8.468340358473006e286,-1.7637602575858156e287,-4.519825880101892e286,-1.3321697617958802e287,-9.95037078768273e286,-1.812918615004368e287,-2.6802893141899276e287,1.199874020524694e287,4.4545023331447224e287,2.8769878863809394e287,5.001465144365674e287,-5.9329064945550766e287,4.520540578057832e287,-3.595613411781554e287,1.060019581889625e288,-4.763781651827467e287,4.410058544936169e286,-1.1560811798488966e287,1.4291923858450535e288,-8.75230850291628e287,3.420454974742404e287,-1.2665041868033124e288,2.0975400745558777e288,-3.8437393002325106e288,-4.000784142219597e288,-5.28593754888769e288,-1.1126665916609841e288,-1.5570512802999624e288,2.9066647751987596e288,-1.7814875112810832e288,-9.697543478663208e286,-9.511148367993892e288,-2.2876640831551066e288,-1.144014325157343e289,-9.077235756476232e288,-1.3930229023620558e289,1.5118665038200644e289,1.7048619598098533e289,-1.2210094322311007e289,-3.3634868437031743e288,2.896526088840176e289,-3.8069468259444924e288,1.689496032130661e289,-4.374995036809441e289,-7.0055516484140175e289,6.498761699725709e289,-2.075031889937921e289,-1.3436952827590648e289,9.595394152166723e289,7.421575640637688e289,-2.166923140075874e289,-1.1066268713052021e290,-2.159011390312799e290,1.4631263072102127e290,2.4512886461549366e287,-3.3357028949357676e289,6.006872386574524e289,-4.902869128651503e290,-4.609802417068198e290,-1.4044824137758636e290,3.50800377046473e290,1.427680162735118e290,4.974790431089154e290,-9.541312996523199e290,-3.88124051254904e290,7.62581619732938e290,7.348523320557792e290,1.2450777051080424e291,8.536736880836781e290,2.3354502050134823e291,8.057498295900932e290,1.324355885273953e290,-1.585339282331696e291,3.206049142628385e291,3.564722621559503e291,-2.1908801906212729e291,2.708118028368905e291,-1.9801834112648898e290,7.585872180504787e291,8.062485869563587e291,-3.075853133596588e291,4.014943335150131e291,-1.6984215314300197e291,1.0897097702616632e291,-9.07832788927391e291,2.634980336505821e292,1.2560107854881387e292,-1.460632972917899e291,1.1435501135029604e292,-3.534877585220182e292,-3.5835696823905327e292,2.687949179842485e290,2.5673163842370037e292,-2.9252491144657503e292,5.340640813965769e291,6.3164732229720345e292,-6.717476396215373e292,2.4181274097966346e292,-1.5478228637277462e293,-3.6170104176898074e292,-2.376062283373899e292,-2.1463474675863382e293,2.729334551499553e293,-1.3826982449465335e293,-1.7145534455265456e293,4.088057961428972e293,4.467004262754591e293,3.851001579681001e293,-4.605214086367127e293,3.774405669325234e293,-1.678156957686582e293,-6.684755383388774e293,-1.0748399853841466e294,-1.0445530826212124e294,-6.639048188407774e292,9.149947147890008e293,1.4653281326431617e294,-1.876642950435086e294,4.4570551178277846e293,3.258323597914147e294,9.93057695213561e293,-1.7812855165390393e294,7.045669966877516e293,3.082941649476469e294,-1.2560757101792672e294,-2.3973796312744728e294,-4.656333133164859e294,-7.506451377391445e294,2.624655950948174e294,3.516310389521877e294,5.740480347696959e294,-1.2256285547529565e294,-8.049064919394355e294,1.4158434005799556e295,1.5999384098045958e295,-2.850046898526678e295,-2.301310495187747e295,1.813722249353315e295,4.4069326875777515e295,-2.475258450765767e295,-1.9951411285774236e295,-2.71041570412223e295,-3.2688709711442187e295,-4.149229882055329e295,5.507303808819686e295,-4.25013614317525e295,-5.459656035247276e295,9.099692116296825e295,1.482132355096548e296,-1.0749651625287102e296,1.7750698786581792e296,1.7000182998935896e296,-5.453148152476007e295,-3.623399250301369e296,-2.3517416209451668e296,-1.1145057357958528e296,-1.7711054946649693e296,-9.094622063468637e294,5.619328164772309e296,-7.084845816948905e296,-1.8353509881590946e296,-7.474891020993448e296,1.1320002036168141e297,7.697543659738261e296,1.145301897434576e297,-1.4319100248641103e297,1.5854767809557547e297,2.344121193608227e294,3.02874808288955e297,-1.3872514267194603e297,5.528321226224885e296,5.350575397794504e295,9.971541152832153e296,7.750508126660115e296,1.0412915749442522e297,3.0367565670759334e297,8.846567329976731e297,-4.797179156242302e297,-7.747567871376366e296,8.256229762164853e297,3.9764920313102927e297,-3.194702664686787e297,2.5449716347332705e297,-2.3482633060644025e298,1.9915275189620947e298,1.4133645149426119e298,2.184130308654793e298,-7.131998147791419e297,1.4074927534534403e298,4.614655740062032e298,-3.43724941157667e298,7.106396476240421e298,7.256948780224531e298,1.790613061975138e298,-1.0639083908809016e299,-6.91032357913889e298,8.080190373829148e298,-1.2438663920189998e299,-2.2962595394668403e299,-2.0006928415284634e299,1.5179303303134477e299,-2.2260163014024306e299,-8.999510974749957e298,3.145451499807316e299,3.921965951370684e299,5.4629891258853076e299,-1.2270576816062365e298,5.2385071669040735e299,-3.1102856179264152e299,-9.120870323253945e299,-1.2248536406585432e300,-7.286140424871689e299,1.0853462809028205e300,1.9549115369733402e300,1.8201909665217018e300,1.6959515650068464e299,1.4164484889940385e300,-1.080894051188338e300,3.5095765418198125e300,-3.019726716191098e300,-5.425078872451471e300,1.5583941287872844e300,4.9415776868739533e300,4.646540559976625e300,-8.848238004405846e299,1.7256094649586934e300,4.099057879548884e300,1.163095657536704e301,-1.6644738151346363e301,1.1858735174958861e301,-8.307150968785738e300,1.8617396428298607e301,-2.234457112689423e301,9.058617008314078e300,2.2848491112538136e301,6.83232766230885e300,-3.752817374090768e301,-5.247413146497488e301,1.7728140518796942e301,-8.155651375582986e300,-6.961763180159912e301,-5.481447574060207e301,-5.346570036897364e301,-1.1954065150223391e302,8.59080897889152e301,-1.6069187509715383e302,7.892966740895731e301,-1.5637105575327214e302,-8.200812009446239e301,-3.0363403953068796e302,-3.4356900112187295e302,-2.3616252730798866e302,-1.9676702770096506e302,4.2958930330731774e302,-6.262188428335953e302,1.0154919338052641e301,7.81036613340143e302,-3.2187856717828022e302,-5.7593182422466024e302,1.1112950137805625e303,1.2664507093317425e303,-1.4970580872084696e303,-8.742690249316593e302,1.550757548612762e303,7.546583689068563e302,-1.6384632251776825e303,5.59991410387759e302,-2.4324853654448953e303,8.605842312658149e302,1.9264415927954045e303,1.1974647324317199e303,4.6411507252180405e303,-1.3161264620597788e303,-5.995150874677658e303,7.6615246887069e302,8.430079912911765e303,-1.0817876126257964e304,-2.4713864944289092e303,1.289066588247787e302,-2.130148676614837e304,-1.2536702603615427e304,1.0863287886578059e304,-4.2747660976393287e303,-2.2022003369614244e303,1.0904869091348466e304,2.246751601033399e304,-2.571509093890932e304,6.426122612130403e304,-4.173577144423321e304,6.946954999019936e304,6.493654890341454e304,-6.87369127419857e304,6.215442729004629e304,6.392054379472714e304,-1.8873494664118634e305,-1.70436971940643e305,2.124196066596639e305,3.7935794142298514e304,5.799987866773671e304,3.910932884927207e305,1.528844613886744e305,6.466597426713753e303,-6.580102775425682e304,-5.284120636890687e305,-7.306857914615948e305,5.358897335969811e305,4.453194731858307e305,3.845178247975596e305,2.7478012671940017e305,3.7391396551506014e305,1.2314241853517928e306,1.4799514841975892e306,-2.1480184064961317e306,5.5900232020323015e305,-2.006408502595795e305,1.1119495185989439e305,1.8072696549696407e306,-2.2036621954355117e306,1.6182671907806012e306,3.873690713188376e306,-7.588941363721279e306,1.8479456144032752e306,-4.1875807509093857e306,6.337327128725486e306,1.0876909337750737e307,-1.5590302230750874e307,1.2942730060347184e306,-8.824878718182417e306,-7.580897561162124e306,1.8643738153929198e307,-7.791606464377063e306,1.0691084240713453e307,-1.9467034305679964e307,-1.656757436903511e307],"x":[0.43497157484184834,-0.15010047715333638,-0.2539541709677389,0.06264531226251156,0.1072681902493254,0.12018580155165533,-0.5305836459406659,0.34566889007056806,1.0160845681091324,1.6198343038786336,-0.09253445737616475,-1.2080911887972439,-2.3333770505734095,-1.4932202445259446,1.0170755504207099,-2.7560976653408162,-1.9010393668629424,-1.6588137440876494,-0.45766005971767,-3.708876365835085,5.9235032324466905,-7.287729651489718,-1.8381778910797664,9.886606849617834,-5.24326469303108,13.699310960357996,12.961964464640436,-7.819796714202524,7.063414491325447,13.440314118468457,16.389242377998666,-36.806950452274044,-44.187531114649026,43.763179480335786,54.692384038398735,60.377981092799565,-40.43119176281684,21.8550687186874,-11.143304402369338,121.65855220679707,50.34244558165493,-13.587648309778821,58.605334299712794,-92.61334526843277,-178.68046587568273,-262.92777753625325,-217.22034323718688,387.8377614040917,-178.55252717502827,-180.95251497554995,-186.7083247141428,511.0378982291795,718.6252878147527,323.94259754868233,-1049.9258207543774,-941.1572128686671,-1219.2105064742805,-1182.9524437666553,939.5254711490703,-931.3764156196946,-2389.4265797439607,2218.075674240266,1370.7138169670711,-758.5742642393506,3849.215625830849,-2401.5611869989802,4629.2041124150355,5325.492678191718,-5696.044698080696,1140.181499000982,9023.122002549519,-777.6417990509497,5569.597740395798,-3445.321102551342,-17022.591284251885,16053.31613626138,13815.385080560322,9788.443577778942,-27252.686860142832,28755.100667510444,7729.740074287297,-15739.736865161674,48618.41693482534,6993.718148676303,53685.00249284894,-57558.19012345115,-6851.614507909886,-91964.62243527638,-78769.48763327535,105027.72738288617,-60660.24569214542,-58016.392165104975,-26461.875523003564,194672.27913522295,81089.2302330641,134147.50296873838,-213922.47067219554,-169882.75575374355,73550.71989424543,28719.574023341625,-648699.4200020295,308975.3238651296,797585.3860973811,109407.08613233859,-291540.40064228716,709325.0217573226,1.662334351466881e6,950077.4300492245,300043.7608806616,-1.7468184821626556e6,1.2247988213567787e6,-2.9773314265703047e6,-2.6317345691407453e6,-1.2082093049929219e6,-1.314835363159151e6,172887.79681578698,1.5814734047434167e6,4.219165042572861e6,-5.473342201746006e6,9.774663504859472e6,-6.961301551054033e6,-9.02018932600273e6,8.488080717183426e6,-2.1805085145482537e6,1.525306001867463e7,-6.389734311527635e6,-1.5317752522751138e7,2.7160459800526205e7,-7.6986701494832225e6,1.270841371921333e7,-4.465572424689666e7,-3.007555990448484e6,-1.912650891542448e6,-7.05029910994617e7,-2.2633205295803454e7,9.959983544178037e7,8.056990927080914e7,6.057169871861176e6,-1.2406192265772378e7,-1.2060970606025375e8,4.1724061777714275e7,1.827083483291051e8,-1.3382264571051857e8,2.0753351855826718e8,1.0394662701765661e8,-2.5082669593327653e8,-2.0264328078692898e8,4.1909677133447075e8,-1.5646196919092923e8,-4.726079722365258e8,8.348062325298866e8,8.914126219477516e8,8.381863684750868e8,1.0394288686948229e9,-4.3526303861218816e8,-9.274539679770796e8,1.4384467560668278e9,-6.429485126873525e8,1.91124753668649e9,-2.1185506997685783e9,2.330337115202973e9,-1.4518277577043517e9,-3.593143540169696e9,3.381960841841608e9,-1.8667072742097456e9,-5.542988090529959e9,3.6187016226650624e9,-1.4622341498631105e9,1.0175912087294853e10,2.1437974567316406e9,1.033060483454764e10,1.2902583860444954e10,-6.26654364769084e9,-9.890691213710228e9,-2.0145909583221153e10,2.3981026097234673e10,-3.3142546281300632e10,1.638362828303224e10,-3.0002735739668518e10,6.786649832714996e9,3.008760186128538e10,6.638298197082925e10,-5.104005323131454e10,-8.085543214013052e10,9.35035697908772e10,-1.105250517642815e11,1.1464573490713794e11,-5.41956069816717e10,1.498785893507134e10,-1.910232244576246e11,1.3507492398078348e11,1.5095342580566946e11,-2.5239670010676688e11,-2.5893894547352982e11,-7.84454537417793e10,-2.829580032694481e11,-2.3990547886757233e11,-3.905471922282518e11,7.249309521081073e11,3.3446876010328296e11,-2.212835056052614e11,-5.200149346222085e11,1.4372994691313736e11,7.134544080964236e11,2.6068244802723087e11,-8.685519331550907e11,3.690115619409074e10,-5.308698334544345e11,-1.6124251098887317e12,1.3427177254515747e11,-2.73906488874049e12,4.589158304515779e12,4.840320518109329e11,-4.934794884509821e12,-1.3519962616901892e12,3.0993091734718184e12,3.6009455041232305e12,9.147159665838168e12,9.903727106150506e12,6.993477876102802e11,-3.7139843652678193e12,1.2033132442263674e13,5.513546038891137e12,-1.570378050920037e11,6.372232260162437e12,-2.1669886089428867e13,-2.797502328512145e13,2.1377597380952793e13,-4.027873304529705e13,-5.3245894221167234e13,-5.339044156236833e13,-5.295323124023209e13,-7.832143223039848e13,-5.271973109627895e13,4.086978088129459e13,4.938866492925324e13,3.654831135324417e12,1.97522342281851e14,1.8486718724880494e14,1.424622354894202e14,1.0426101873595897e14,-7.773941033663058e13,1.8602161491095116e14,3.354977845220704e14,5.157313545211338e14,-2.0026154451238838e14,-3.394874313461453e14,-8.175849331696286e14,7.193331736523336e14,-1.5114038413381034e14,4.208631468819139e14,-1.4770944983522806e14,1.492561769694354e15,1.8173530245987882e15,-1.5579123883445448e15,-2.043085178003042e15,-2.4620902892975805e15,2.0049716526215392e15,1.9894582832848715e15,8.044051155771645e14,3.41312309821306e15,6.094651529399894e14,-1.4784725129202806e14,-3.4447449450103725e15,3.6663058403771865e15,3.3966516637518755e15,2.2068325037466282e15,-4.839691399183597e15,9.83323417643566e15,-1.4469147051969624e16,1.367088048841351e15,-2.2608167789466784e16,-6.772833858606839e15,7.928959958613202e15,-5.573716058151995e14,-5.89980749513493e15,8.492256626312094e15,-5.448609430537336e16,-4.2221095699638136e16,-9.43674277531044e15,3.5044815135508556e16,6.12656456436862e16,1.6216405628358402e16,-7.138437611700459e16,3.919280665064737e16,1.3112356125845123e17,4.463877586471621e16,-2.2220144501843395e17,1.6940011889748422e17,-1.5408791005809603e17,-2.656982730306088e17,-3.469431265228994e17,2.7172660952427828e16,-9.223350294572882e16,-1.0310374479208238e17,3.0486802574508605e15,7.326459486480188e15,2.0144871902911293e17,8.649769005379019e16,-3.0813973931292634e17,-9.882047984761686e17,-8.655123193019277e17,-1.4182945229438643e18,-2.3014158745180012e18,5.262997259637612e17,-2.2546365960414996e18,2.3323085520940703e18,6.506380923696004e17,1.900944451572027e18,-3.3102606846739686e18,-5.852156058895301e18,2.4201671754763095e18,-8.03630505057726e18,7.525361987174911e17,1.0345600269660703e19,-5.806534237021872e18,7.462731627861005e18,1.2735066351828386e19,3.3010692919368013e18,2.2087418028492124e19,2.4348649671069794e19,-7.864043861414026e18,2.9678444978079162e19,-1.8200097732920242e19,3.829316541368753e19,-3.5807872325448184e19,-7.736542115430565e18,1.6697436984679047e19,1.320038953058322e19,-1.0953773043870912e18,-8.318921891295892e19,-1.1967901280157306e20,-1.1329571444535896e19,2.0705571680896725e19,5.271023175672963e19,1.2740831174059611e20,-5.442323916548083e19,1.6199634380939444e20,-1.9529777407872244e20,-1.4676079801686345e20,3.1271686195163536e20,-2.3965037737059697e20,-8.377000258354609e19,2.6713574843046986e20,3.5866788817501074e20,4.786210706898456e20,8.829201656158961e20,7.172324780024e18,1.3638697648865613e21,1.263513028437273e21,-1.0428161605703255e21,1.3256116637258248e19,-9.856422065554264e20,1.3020359692637623e20,3.001927486645225e21,-2.768161125446647e21,-2.4604472034715983e21,1.5440514462061856e21,-4.158910458889594e21,-3.272896493918402e21,-3.642427349767036e20,-3.606159232011188e21,7.560209371164147e21,1.0978378869267421e22,1.0305162643058622e22,1.082847837479616e22,1.65597360452191e22,-7.48869545056121e21,-4.586843383736663e21,-1.8317561019744072e22,-2.411078526117197e21,-1.0557891113099341e22,1.7023257897922755e22,-2.588545632779483e22,2.4174352641517788e22,-4.473158057705083e22,-3.1871649133593803e22,-5.4867341002497585e22,3.288038260570098e22,-4.1168273753754097e18,-1.1760516094255239e22,3.079705492347503e22,1.2004457702519331e23,-9.366138698342023e22,-1.866323569660468e23,-8.783472372261424e22,5.5008861224706656e22,-1.689228933595139e23,-8.40681811842974e21,-1.9057955179298664e23,3.663979587866331e23,-3.22213683132559e23,-2.185701924004878e23,-1.013028754246157e22,-7.32674376009342e23,-8.232054791206192e23,3.471515390931106e23,-6.011790972163611e23,9.579664951595475e23,1.381515865378984e24,-8.678461382264928e23,-1.2518338683468338e24,4.067686289696273e23,8.613887373286884e23,1.918702193704413e24,-2.3766824693865224e24,-1.2132308836825566e24,-5.571506424999502e24,5.673885840196479e24,5.735550663752401e24,-6.887406803724023e23,-9.024728141864521e24,1.233709784478749e24,-1.0507001479892047e25,-1.8718065752933465e24,8.115063106124055e24,-1.7605077172447019e25,-6.56459720362834e24,2.1569848925440793e25,3.2240269415472387e25,1.3749942816268662e25,3.9742084370173775e25,9.323129676361521e24,-3.0077108808219398e25,7.377194668244235e24,-4.033463928717066e25,-3.985741261752897e25,-8.130532113163474e25,-9.84679252335089e25,1.2840678855192536e26,-1.3358813930973655e26,7.858041742279172e25,-9.568083231789229e25,-5.586331258811619e25,-2.5415635767493888e26,1.669691492403373e26,-1.7506002395570906e26,-3.218703408472816e26,-1.1057000542236281e26,4.903250071576581e25,4.8050862428931864e26,-6.612714926319724e26,-3.305369636821056e26,6.372345679824178e26,4.203667287823454e26,-7.6907956099215245e25,1.2471673894198196e27,9.834351082470072e24,-8.977477148570969e26,-6.227368369348516e26,7.775209540510202e26,1.465808378917338e27,6.752470765729232e25,1.4279347824656203e27,-2.5753365697634665e27,9.358374368604996e26,4.528731492497845e27,-4.280037063958426e27,-3.281733442693349e26,3.4994800559875665e27,-7.951434130174507e27,1.1720692026749541e28,6.758890318542801e27,9.996479139119902e27,-7.264038002905095e27,9.664722714373229e27,8.670382040892681e27,2.482427510529679e28,-1.5922016057278117e28,3.503037049604583e28,1.2332681388639902e28,4.699208786542089e26,-3.6706783997627137e28,4.360230885798857e28,6.042121960262415e27,3.487896172047422e28,-5.504265955796888e28,-1.1507914305219901e27,-7.802393824067232e28,-1.3729165226455162e29,-4.260575569425687e28,-1.8458622408806794e29,2.1985909262139527e29,2.6807351099611415e29,2.3315537253376978e29,-3.6446009508301896e28,-2.2644067923785657e29,1.4484274350053033e29,-4.4071369208910276e29,-3.7824446307098146e29,-2.617383046576509e29,6.925725655866124e29,3.23684376637048e29,-8.53550772175778e29,1.3243858199959584e29,6.771180052063082e29,-1.3612181900869523e30,-1.6869309468582948e30,1.126308641336042e30,2.728104511449847e30,9.750046887968531e29,1.3148321989309203e30,-1.9474954028925187e30,5.1655848170954876e29,5.229038271512041e30,-1.2996653687262091e30,-5.16011818553472e30,8.471281741358943e30,-1.2348065073081415e30,4.165095316322187e30,4.3701936450188216e30,2.2603219303057864e29,-1.2604143305183909e30,-1.0050857881767483e31,1.5653565299142068e31,-2.0038826897228798e30,3.0161130069868986e31,7.656841246237878e30,-3.9021074980995444e31,2.8602465871165145e31,2.5168701648828053e31,2.1330619222891066e31,6.858243777278072e31,8.088164643182479e31,7.619341535633862e31,-9.57486016854517e31,4.393693703897732e31,-5.0019128930372475e31,-5.597084194843198e31,1.5592377921179656e32,3.688070786669254e31,1.687221634097781e32,-2.9293491525331752e32,-1.9318474657255183e32,8.144249359156685e31,1.5384421869087244e32,-1.917637420036449e32,-2.985739437206316e32,-6.35827703375524e32,4.947001171028808e32,-7.498837506008086e32,4.877983669698e32,6.723703905988273e32,-6.896301801244803e32,-1.2503137459269042e33,-1.481739660956156e33,-1.7786037017290103e33,-6.49388487989243e32,-3.688944757359986e32,-2.19186800169843e33,-2.834252206890038e33,3.787344073045171e33,-4.1167827057862875e32,3.587834551651104e33,-5.750920567771073e33,2.3963621219172972e33,-5.728904406118865e33,-7.757115629933355e33,-3.70095586072792e33,-1.2761394700621974e34,-1.022641767279895e34,-4.709669467499891e33,-8.324291346729784e33,1.106309069925363e33,1.1731611173079483e34,2.1402865134948156e34,1.753457794944028e34,-2.773701228120251e34,3.7345241952958336e34,9.527753099811395e32,5.207677836748266e34,1.8582714924435668e34,4.384773667116175e34,-3.4472354825628303e33,4.503849576096294e34,-1.2345833901816326e35,7.585603066819954e34,1.4055260075208247e35,1.092209280922554e35,2.2728168913863686e35,1.8118987139740435e35,2.0854625111960347e35,-2.11197943452663e35,-3.628699778701036e35,-4.436299436590041e35,-3.877844244583064e35,5.744910681711726e35,-4.47640557106851e35,-7.70058695315896e35,-7.826903827148644e35,6.077609380648483e35,-1.0571416660818326e36,-4.239844053293536e35,-4.8280098484932795e35,-4.033751055502859e35,-6.206437791185988e35,5.496876473728024e35,-5.248803526794584e35,1.0103180345461527e36,-3.68870942618164e36,-2.4857512140432512e36,-1.4414924650671723e36,4.8819424443033706e36,2.5737283195103316e35,-2.1164510505749554e36,-4.6587323301932626e36,6.457815392128323e36,8.591210219175005e36,-6.023710924359552e36,-1.4933736717754512e37,-5.610127276218413e36,-2.1691518147251804e37,-1.5934426563876718e37,-1.451355798635241e37,-2.7614512417695606e37,-8.383020121293721e36,-2.7026049672984083e37,2.8136138301682046e37,8.6776428359142e36,6.491831695742858e36,-4.3278628409606e36,-1.5189106614879772e37,-3.5324799610183106e37,-1.0762383798220355e38,-1.0602833961916143e38,-7.774581337044785e36,-2.3075926175484907e37,1.9371589319916382e38,1.4176342787229765e38,2.3113431944184724e38,1.1907118185827336e38,4.524059402877636e37,1.4270448416191211e38,3.758735766980782e38,-4.394434417167274e38,-2.9822104868013443e37,2.7472026973628383e38,-7.172459705698075e38,-8.825075691478272e38,-3.930100929337645e36,1.3010976219854981e39,-1.0979852741725294e39,9.789979386187166e38,-1.826507704994234e39,-7.979101613441712e35,2.7617668452476276e37,2.0534707220575364e39,8.616367375299745e38,-2.1171054005952972e39,4.181199465137397e39,4.6593965556440844e39,-9.715031454719559e37,-4.329273174322789e39,3.492286034488096e38,1.7211299113368578e39,3.9139880328415305e39,4.2469247529801014e39,2.408158369344288e39,8.240740734901941e38,-6.835130379700089e39,9.905540048084736e39,-2.356083525591447e40,1.7114833410738502e40,6.05382216595332e38,-2.346989003979294e40,-7.982876692512124e39,-2.146266626939421e39,-3.353984372418151e40,1.5411005452096164e40,-7.880931622291385e40,-9.085205281917539e39,9.034059171277544e40,-1.0099179996452712e41,-1.195345728109989e41,-9.947904403823785e40,1.7404561121534643e40,-5.286380442252326e40,5.066778959671406e40,-1.2865321664352645e41,2.3941002871829644e41,-4.591326266139375e40,2.9097525776617986e41,1.3953805054181118e41,-2.248048746141688e41,8.268912525635339e40,5.865760244887935e41,-5.309485137916436e41,1.0243901721611663e41,-1.1888532941314279e42,1.0524683479940292e42,-8.044258326851778e41,1.4102998058561024e42,-8.079870945668543e41,-1.4453407775172296e42,-2.5840339827242482e42,-2.598190762592955e42,-2.87901823094924e42,2.2870195168730477e42,-1.1606121848082623e42,1.111483933019914e42,1.0184549326445018e41,-3.084807104417064e42,7.917102114606175e42,5.629183838129693e42,-9.249988088056305e42,4.388857575092732e42,-1.3255625039566637e43,1.211637051231918e43,-1.6436230666340752e43,-4.2662392449122003e42,1.8047575655696674e43,-1.4353477163983784e43,-3.562622751746606e43,-3.126463710010954e43,1.8430853174599817e43,-4.370731937915365e43,1.2291888890063016e43,4.973321765652985e43,-5.628147257173622e43,-7.205384419296031e43,1.097800893596012e43,6.464231129195661e43,2.7550987947077666e42,-7.271264565334179e43,1.7519539167536895e44,-1.1068744095743042e44,2.30606328666207e44,1.267685162552547e44,-2.5787838503135815e44,-1.8832903297299458e44,-4.468568703145874e44,5.470191329502723e43,2.2891960361260753e44,-4.426742055297781e44,3.328971805924053e44,7.105436785118046e44,6.254011108429011e44,-1.1123477788612663e45,1.4702805776443654e44,5.032753595179084e44,-5.1830368224368036e42,-7.982713683482407e44,1.9276866134420305e44,2.724915994428185e45,3.070162528759865e45,2.2757915850213298e45,-1.6419520359508182e45,-2.8508504252284582e45,3.885891908350534e45,-6.251154702630672e45,3.3566158084241946e45,-6.8284604868974306e44,-8.567335629992558e45,5.025463062753351e45,3.4375470689974863e45,3.519061001657076e45,1.2898363115437743e46,-7.844822870510422e44,1.814276954579367e46,1.1012062192543531e46,-1.6531866361698985e46,1.0924483742513815e46,1.8353121293237983e45,-1.4377970587887515e46,-5.688382137677118e46,1.4771863792280168e46,-5.660448395798225e46,6.203313662773536e45,5.058414524518583e46,-1.272765058532275e46,-1.3447000181883406e47,-2.0668502767651059e46,1.6535362636702088e47,-6.183893810765969e46,4.160449966098317e45,-1.0022705575687175e47,9.801539033765765e46,4.233449958365007e45,-1.5456728635760825e47,-1.3077154990709181e47,-1.2885797785727107e47,-1.857775894990563e47,-4.356047038879209e46,-3.04686577069644e47,7.291852241828358e47,-8.312206477051855e47,-7.1269982519481494e47,1.3224700609932805e48,9.269512765416474e47,1.603338920674413e47,9.71212246387377e47,4.626885549921943e46,-4.59626270707438e47,-1.2905958277235849e48,2.1336286182894664e48,-2.4650240498396235e48,5.3699993324617886e48,3.59621585651431e48,6.55593968465685e48,7.59882131841325e48,-4.776329170703828e48,9.939053182782485e48,1.1115709646737971e49,2.47506498671669e48,2.2779894726416637e48,-1.496246775426603e49,2.156666611174188e49,4.264882428762549e48,-1.078025033298243e49,1.2067952755752987e49,-1.8340039116923247e49,-2.699084549940132e48,-6.0918335152394e48,-1.5575077234380285e49,-4.756438986148461e49,-6.087749324439424e49,-5.499158765990068e49,6.49348450085047e49,1.0850689428220471e50,8.179068723001057e49,1.2473264548679887e50,-1.8628499407587565e50,-2.06103495244739e50,2.5416419409505184e49,1.3594937937155445e49,3.025735541273999e50,-4.348606304582945e49,4.678682789175657e49,-2.7758705963658273e49,3.0354978776918723e50,-1.9219990894263067e50,7.12128346360559e50,-1.4346684436624674e50,-1.3875124294742149e50,9.54400322391448e50,-9.847240547595353e50,-1.0423992706969562e51,1.4364971715658686e51,1.861417415395961e50,-1.8199353660726506e51,2.187863815743006e51,3.132346403057123e51,-1.6651257304571387e51,-3.6001741698894204e51,1.176900013650108e51,-3.203847230757518e51,-9.489896645994264e49,2.7537632662824372e51,3.355874506130803e51,2.5172936024458192e51,-4.855193150871585e51,3.7993790959838455e51,-1.562922871752917e51,6.596991654122327e51,-1.1515081731039225e52,9.006149254119004e51,2.59224711891937e52,1.782362004291417e52,-1.305944140940611e52,-1.5899575723797837e52,-1.3387404068467797e50,-4.251720428679879e51,4.1052360988274e52,5.72873475479521e52,-1.5715733813738592e52,4.085404136822804e51,7.437067820030638e52,-9.919283198806568e52,1.4616120051484196e53,1.0100105320655688e53,-1.6164130764862158e53,-4.051895493292425e52,-1.8549990812903492e53,-2.5043335228954268e53,5.920502919340741e52,2.4430399562205074e53,2.738701625903455e53,-4.7273712468895356e51,-4.3042933748549045e53,5.043985194011316e53,7.859944480737992e53,5.278603895796669e53,8.728214724252327e53,8.858469089152544e53,-1.0219451254080024e54,-1.4966153194863713e54,1.6541421692623244e54,1.8438817273521115e54,-7.16884121131883e52,-1.2157520056053426e54,-1.8098739695108777e53,-1.345411366424963e53,-1.532001847910237e54,-1.0511704831528024e53,5.6406746515526235e54,-5.9565581652330595e54,-7.766992350866801e54,5.645121879980586e54,-4.8337400128229223e54,1.0900355346583378e55,4.591149628133182e54,2.5994895570161294e54,9.020641904986787e54,-1.3114381883616714e55,-1.6080163744744036e55,7.152509666098912e54,-1.6182169862813455e55,-5.9568964461361156e54,8.46522500284803e54,-4.583960434118509e55,-3.7268898964184235e55,-5.520039796223964e55,3.5428765407003904e55,1.655494415828475e55,8.608491583450103e55,7.583975103480334e55,1.299002311859211e56,-1.9198812009320105e55,1.6122418913417319e56,1.1101541568560163e56,-2.0184143971608623e56,2.6038108875729773e56,1.6505335293175683e56,-2.3014857486612444e56,-2.3327355688549007e56,-1.9349006094127487e56,1.156963455910466e56,4.731649381009377e56,-6.882064801865376e56,3.8274948290097547e56,6.538908489972288e56,-1.0354868481181882e57,9.937502002933187e56,-1.094719546549926e56,9.588891002478996e56,2.277754305108072e56,1.457290126458062e57,-7.155099892870969e56,2.1181693171433072e57,1.5728327126044796e57,-7.87407736116214e56,2.3508457090681903e57,1.4452553494533004e57,-4.3833113241094204e57,-5.369909323417814e57,-6.0771028241204713e57,-1.4248090396391395e57,-2.7612936256464383e57,-5.1905815737840666e57,1.0313380773794917e58,6.1346325806754335e56,5.581755216796156e57,-1.0256088169919404e58,1.2377806645495893e57,-2.5921967019934843e58,-3.1044205849854313e58,-2.5764293070934655e58,-1.134778426920984e58,-1.5126319581166366e57,-1.859877877488188e58,2.7956348933128917e58,-2.1335390416816767e58,-6.956131231245662e58,7.695259314321479e58,-1.1536819492807835e59,-1.351088945475175e59,5.604930939614253e57,5.091026974300659e57,1.8752108957814998e59,-3.101727269353852e58,8.02459770875572e58,2.5887412179081123e59,3.2174677731802294e59,4.090044011187263e59,3.8756195876317815e59,3.2457900707965105e59,-5.258033902000093e59,-5.739599333948483e59,-5.350582639778269e59,-5.554259232933495e59,-4.124278351092153e59,-9.90603378500528e59,1.4601508938027711e60,1.727353525571628e60,2.0535870978018073e60,1.5747706254942151e60,-1.2739936333607436e60,5.768690610888403e59,1.7538376498308408e60,-9.865285725449344e59,2.1663393661996842e60,3.719832316835865e60,-2.668210269330724e60,6.62839961486306e60,-7.849349096734455e60,-9.533523512831634e60,3.9248878180633964e59,8.537316358445484e60,8.021386285402868e60,-7.514841290146948e59,-1.5435647777925187e61,-7.470492161615392e60,-1.6430857580951789e61,-1.4612264896563996e61,-1.9377405482481676e61,-1.1460237227280065e60,-2.258939893947235e61,-7.854003418037873e60,-2.703668707481423e61,6.288102926091292e61,7.118511155923564e61,-3.7866662243989875e61,-4.335159877532545e61,1.1545265845093464e62,-8.925637868350848e61,9.208966097215447e61,-1.6211383631330777e62,1.797996940795614e61,-1.7005423995782021e62,-3.5935665051684166e60,-2.8772821789693904e62,-2.8459596249258303e62,-2.4812264852875647e62,-1.196669911892154e62,-2.1513332042592163e62,-2.341599401366575e62,4.850188946786083e61,-8.99396090805453e61,4.5003595926203135e62,2.163774441535201e62,-8.65007914378513e62,4.0720196323363364e62,1.157108885108702e63,-1.4315681576900801e63,8.33018098021736e61,-2.2433263949794377e60,-1.9183629201911582e63,1.5691458369098622e63,-3.642435490848347e63,-2.6465087507773566e63,-1.9923189033554777e63,3.76251237953472e63,6.380129225637294e63,7.104428170561318e63,-6.434942233027908e63,-3.536780192538433e63,-9.786724617899072e63,-1.0460890118768581e64,-1.3998509351127062e63,-1.5643495764916438e64,1.4658342411416035e64,1.9920252432140576e64,-1.3635414904735715e64,-3.47669900317651e63,2.976942735709435e64,3.430361578112684e62,5.426593839155355e64,-1.5591226718428256e64,-6.205284835476547e64,7.29938873176216e64,8.884780885553585e64,-2.6487117718021702e63,-9.092788797713555e64,4.645470099825209e64,-6.49480390934728e64,-1.6552129793357897e65,4.558940923235732e64,2.6025982895344735e65,1.078179313262988e65,-3.506669297400694e65,-2.0810287080436394e65,1.301418330167259e65,-5.195739747687547e65,1.0287637203828229e65,2.69104623022948e65,-6.100113137244319e65,-8.1511004824875705e65,6.335946780372435e65,-5.323707277088486e65,-1.3385690633096354e66,4.500331816409263e65,-5.713360273077035e65,-1.0156839818253174e66,1.1685105862283914e66,-7.067477094383367e64,2.640992670520857e66,-3.817871807338737e66,-3.433875496469678e66,5.1683026413848606e66,-1.9718426073896844e66,1.4460506075283506e66,-5.568678529963959e66,-4.995148373738996e65,9.082732448014838e66,1.103161661926648e66,1.3581228631719205e67,5.784382788004881e66,1.0102329272504386e67,-2.1530445099127967e67,5.358946244158979e66,7.288321806209234e66,-3.383970597803344e66,1.8658607883156783e67,-1.8826792729007636e67,-1.8106378174790277e67,3.2033992637726025e67,4.143697354522461e67,-4.3011340254911144e67,-2.33934342036058e67,-8.533621278857996e67,-2.1235539091146192e67,-6.97113629263639e67,-4.278254177866425e67,-1.1078636549416216e67,-1.800699489224916e68,2.1824865449313576e68,2.1534869274832366e68,1.9014201371188717e68,1.988566708894683e68,-2.5941789822913823e68,-3.783735413938034e68,2.1992036595831608e67,6.127409769891019e68,2.9322839641331208e68,-3.7686962866402017e68,-1.3060734381128424e68,1.1341343714261776e69,-5.343931558798967e68,1.1648657048110213e69,8.141462985224124e68,-1.033034342256611e69,-1.3078544857979887e69,1.8494955221589882e69,-2.3238101217086383e69,7.229608866294719e67,-9.378574467495493e68,-1.2047870966192491e69,1.4935130332860724e69,-5.1025607822162535e69,2.8677821536997546e69,-1.2147404243989437e69,4.239166428888014e69,6.239648432636151e69,-4.245654959511922e69,-8.375767681155337e68,2.726546726038274e69,-8.536345244540975e69,-1.5283889663212746e68,-1.0289111053971235e70,-2.0931346150921405e70,2.2782428855323573e70,1.997242509353756e70,2.9654356183491653e70,3.2989113230629623e70,-5.575367644556667e68,2.4308718494283404e70,-7.613688095072775e70,-7.926506559677562e70,-9.475844235352143e70,-9.364372343679138e70,2.1018214071827508e70,1.2859160476332809e71,-7.510399577136013e70,-9.463595550190794e70,2.5997408758499276e69,2.7501804332437983e71,3.256163370730465e71,2.3323540948489684e70,-2.2221670764563824e71,-3.776273843303042e70,-8.945593464870765e70,-4.801292805509055e71,2.6170686849076516e71,5.598343527703615e71,-4.797854969162482e71,-8.639484632073705e71,-6.406029167553075e71,-1.2712265559965997e72,-1.2030903385161646e72,-2.0263288732549645e72,-2.259084268952694e72,2.6817997441834644e72,3.2364069485976223e71,-2.1506703787082855e72,1.0137740425977513e72,3.849469982476873e72,-2.562799853610657e72,3.105701263022508e70,2.351164958760541e72,-2.3889241199492485e72,-3.1712091513730272e72,-2.831248243219701e72,-1.2308586729378924e73,1.5140463831446694e73,1.3846518390615615e73,1.216803260041637e73,3.898535705127883e72,-2.3260977796806565e73,-4.150781774136489e72,3.3704992724719865e73,-1.0614075727658972e73,1.1098213618122766e73,-1.2777226235505556e73,1.4239992529582225e73,-7.304890305547695e73,-1.553968711563603e73,-3.4281065922578214e73,6.203027753189274e73,-2.0101732140640195e73,2.8289733627135183e73,-1.659194902059146e74,1.6220995194955506e74,-2.1894183043270528e74,-4.4092552120039583e73,1.425694258120302e74,1.0195532802826517e74,6.99733111428998e72,-4.235485674274319e74,-1.0526032326231472e74,1.003833483506381e74,-1.841746003424811e74,-4.41621047853352e74,-9.031709571129547e74,-5.191386997946443e74,9.828521852174725e74,-1.0535455673426269e75,-9.499696601668613e74,1.4925238963445705e75,9.70871753797482e74,1.3885518282518988e75,6.619419591375368e74,2.0643665746457676e75,1.0713952631418342e75,9.327768180684696e74,1.2041970632270994e75,-5.895618254624968e75,2.282327601759472e75,6.648938878832977e75,4.7885059696686396e75,-1.6256032366260982e75,-4.616343215382619e75,-1.0259141596959878e76,-2.297231742830148e75,-4.753550454425794e75,8.207002120072242e75,-1.9381563766297916e76,2.0513019484504814e76,2.954239695628294e76,3.1129449073102485e76,3.727741918521156e76,-3.8471872390517126e76,-2.3412707139220568e76,-5.769463781263232e76,2.004642903637234e75,3.7363763075958906e76,-4.759388273780727e76,-1.6125284923480265e76,-8.51884471747058e75,3.576772967164552e76,-3.648500052565748e75,-2.9107709592389e76,2.584913388539963e75,1.0458371304607612e77,2.356452904798621e77,-3.2859568956055005e77,-4.102659291153518e77,-2.2956083005308938e77,3.362440179304624e76,1.5969046291065046e77,-4.694164893673317e77,4.733344576767003e77,1.6097547708724547e77,5.297459443143422e77,6.712306188793973e77,-4.632415366463397e77,-3.499166122831759e77,-1.0666566079316558e78,1.3976712888653658e78,-4.115154836236067e77,1.1340218676711145e78,-6.396000609697659e77,7.840700036923356e77,4.572286499187805e78,2.888492421051538e78,-1.5132023320690528e78,7.002580397809434e78,-1.6299783661747395e78,-5.3257664991982e78,2.330119042055332e78,-7.0082521507692004e78,9.27758396719744e78,1.2576926078576595e79,1.2763180338903794e79,-1.4901178167333454e79,-1.8878251001476964e79,-2.3704979743149255e79,-1.7371738678909627e79,8.723717691694672e78,-2.416062568200984e79,1.3736333170299117e79,-3.7999922252668864e79,-5.016555468626052e79,3.2343954851944505e78,1.9330524793080353e78,-8.235230960166433e79,-9.721190359784764e79,8.909653199092293e79,-6.2093468104499e79,-1.4368888307997585e79,-1.6342524443528515e79,-4.8966425491046145e79,2.693018164507866e80,6.32627247229741e79,-1.7677178199985032e80,2.921394373350695e80,-4.4765425819929205e80,2.2980617702070515e80,2.4011010812729667e80,-4.4470203490448216e80,4.6129614657296074e80,-1.3441640487505274e80,5.962945020260251e80,4.326491722147496e79,7.219929265288274e80,-9.166183504538466e80,-6.265304711136849e80,-7.046403840106629e80,2.444503662767184e80,-1.469403127705536e80,1.0289185960544461e81,-9.183766710293168e80,-4.14279852387071e81,3.4203770849570012e81,-4.918123289958945e81,1.887602585883656e81,2.54439134749607e81,8.26488405274009e81,-8.029102706191593e79,-7.099372593713798e81,-1.3664849603218452e82,-2.706836842776383e81,-2.279631896486821e81,7.044090964425274e81,-1.803333918298158e82,-5.816452360847372e81,8.533781335081263e80,-2.6581989453365843e81,-2.8398956281251522e82,-2.3866013645703126e82,-5.6362759466646295e82,4.82605397916836e82,-1.4883438206080034e82,-3.1985485045846816e82,-7.725676713630381e82,2.8801815015178057e82,1.0897892182778194e83,7.339037486370967e82,-7.934918860252223e82,-1.247280973756458e83,1.2092007350329083e83,-1.1928729950768434e83,3.4093995687544295e83,3.831390356612166e83,-3.27728373325067e83,-3.807163317158401e83,8.645909783741423e82,-4.537536683323411e82,5.148359693777403e82,-2.905521834263008e83,6.556192249663297e83,-7.686745861511824e82,6.680727669987547e83,-1.2143336770986167e83,-8.816251202579329e83,-2.109412330256318e84,-1.2056115522225203e84,9.952426995214465e83,2.501551473726124e84,-6.650585955193698e83,-1.7768528890586188e84,-1.9380977319246463e84,3.005483512746123e84,-3.6648994719060768e84,-3.2940361243989257e84,2.329355528187341e84,5.595192467475813e83,1.0698070866730914e85,-3.8879768492892735e82,6.075658546453656e84,9.343158972670982e84,-1.58415756126387e85,1.3132879524131461e85,-2.775470237881543e85,1.3766929910537505e85,2.5075478776521908e85,-2.8482598575001736e85,1.4240179552800166e85,-2.9709135104290546e85,-1.335639876857764e85,3.3412799445848345e85,-5.5528987501034334e85,-3.345388972827672e85,8.325089815723698e85,-6.1223395487875545e85,1.4588810137848797e86,-5.8150160381712276e85,1.886496956631252e86,6.392023109384047e85,2.0465614091782803e86,-1.910471326777644e85,2.7810942221064324e86,2.5326364429000035e86,-2.388215915385769e86,4.246628136490101e86,-4.272053689206199e86,4.2138470221944327e86,-2.4767624874815862e86,3.727025851860551e86,-6.198667155969032e86,1.0280070086995205e87,-6.636289710975292e86,-8.08394465696079e86,1.618683824237506e87,-8.143497080074626e86,4.876673248327019e86,-7.536297008777263e86,8.61636147087627e86,-2.796410637494001e87,-5.052684999054257e86,4.869132112647212e87,-4.1152739655451165e87,-3.668090281442141e87,3.5536508751814375e87,6.83698483593885e87,7.703221074633718e87,9.453816785272106e86,1.1530247994918134e88,-1.4760230647347115e88,1.5436350780527195e88,-1.5311576070777505e88,-2.3019712250592924e87,-2.5479212250809273e87,-2.4825411546251163e88,5.6048205625528605e87,3.400128192210101e88,-1.5271221382243907e88,1.3390192697959755e88,1.1061933038466922e88,-2.631839947242671e88,2.5245269707865292e88,3.6117343046625724e88,1.0454065871420137e89,-1.4287490821331995e88,-8.412373504641418e88,1.836540875800465e89,-3.1519895646839628e88,-7.467475774652647e88,-6.049503580720589e88,1.9404835550618931e89,3.0727630739387706e89,2.313124227495536e89,-3.2741016257272275e89,-2.377906278197854e89,-3.7561209794112356e89,1.3702828028026104e89,5.832047743356592e89,-2.400442772119424e88,8.007895753937979e89,4.3377621730500556e89,9.907661639813856e89,9.438420776599197e89,-5.437721146196679e89,2.163010792153652e90,-1.060794757082483e90,8.795950875146149e89,5.436690780464074e89,-2.567937687249683e90,-3.183756343402917e90,3.085786058310529e89,-4.497880964620906e90,3.109331252712248e90,-2.4427314004387935e90,8.924230843467812e90,-7.610029048643205e90,2.7407698418460686e90,-4.4040826147664907e89,1.5993526666477347e91,1.579668868492836e91,-6.388068519905444e89,-1.0641008361876816e91,-3.678180378296158e90,6.4073791167879e89,-2.2178809633210284e91,-2.4061388091287545e91,-1.1219290252188501e91,2.9992727285185464e91,-6.520072449620402e91,1.271674987864873e91,4.2313941835946216e91,-2.0608073398661486e91,-1.0480562678989446e91,-7.713370701122371e91,-1.4815877351471977e92,-1.2452724983192795e92,-2.1650931676827637e92,-1.5005041942893084e92,-1.4659081102168956e92,-2.2371967083207654e92,9.446579886997468e91,2.9803659966093674e92,-1.6410100457526098e92,-4.652395485838201e92,2.761922144627905e92,-6.253548934942669e92,1.4640776623130838e92,8.322432354816737e92,-2.947201541247053e92,-5.0609409420345104e92,-2.3699614443246618e92,-1.3393859895524515e93,1.1071569955600408e93,-1.9304262716834579e93,1.192108772027584e93,2.5969327726765103e93,2.540869467593656e93,1.768207679778065e93,2.270359963861342e93,3.659250337554133e93,4.817835631495861e93,3.620683902271392e93,-8.143530454356358e93,1.4232307473509166e93,-8.795130316520181e93,5.15059838236046e93,-1.0192739002557503e94,-1.2655032302143304e94,1.6899580628922484e94,-1.805627422946481e94,1.6251610207261669e94,1.8509708491849003e94,3.573343576223528e94,-7.425515563326664e93,-2.4901642986595373e94,-4.059631596066247e94,1.909039186261443e94,-2.4389107307207505e94,-1.0508424381226611e94,5.1138867240412495e94,3.001376829013219e93,-1.165284386672978e95,5.665107906083944e93,1.04854040000171e95,1.669723960050364e95,-9.028328542033323e94,1.4323599348242166e95,-2.021556885471577e95,-1.861195670163339e95,2.5932135719102772e95,-2.818674442443083e95,9.301988198955974e94,-3.2159333767141763e95,6.096443977739241e95,-3.6759989129036004e95,-8.394800256616927e95,-1.042754606586204e96,8.12836486106912e95,1.4265036228278874e96,1.14182630047558e96,-1.6023718454028757e95,-2.1852486664968575e96,1.224048879221989e96,6.752232576446101e95,3.208818002161773e95,-3.4297502832857606e96,4.539470044314798e95,-2.4170488472931663e96,-2.1431439616318074e96,3.5541783060514295e96,1.3274811721227615e96,-2.8061104636181243e96,-7.266869195884644e96,-8.414847720000597e96,-4.279414661116868e96,1.0297360692159073e97,1.735566472631514e97,-6.481716791546795e96,1.5817270318827393e97,-2.601810229644365e97,-1.0918772009122448e97,2.13177417700467e97,-1.6973990700903109e97,-2.129365879534763e97,3.356422578658246e97,5.8210100838621434e97,-4.8968557410466905e97,7.365946481009951e97,-6.36692205558862e97,-4.35934631066325e97,9.688702915719266e97,1.4974433152996518e98,1.539152424738291e97,-2.9918118075847157e97,2.113293211936756e98,-2.4913447128862006e98,-5.416855206119126e97,-5.38698560756879e97,-2.7549367102252954e98,-3.5837026946349614e98,-2.6431331094926587e97,-4.8361749228487533e98,-3.622790387369668e98,1.875198695362827e98,-4.772452922724657e98,-9.077108177149316e98,-4.320202028305828e98,9.540594982307687e98,-1.4551428782949964e99,1.7294977750835184e99,6.61431946858438e98,9.214452197415083e97,-2.794093571908875e99,2.092761174561539e98,-1.967357515042755e99,8.254325081486066e98,-3.6593560015439143e98,5.680662108806549e99,-3.8971840591693136e99,-1.0662235292388004e99,5.706187298926555e99,-4.953156341599624e99,-3.1898854943115273e99,7.859278261587422e99,6.225695228553829e99,1.929140884372101e99,8.765865067354381e99,-6.835535342346369e99,2.5839521685191714e100,-2.06745704148113e100,1.2540435922163635e100,-4.859172349780509e99,-4.2508998552223226e100,2.810626968159141e99,2.3114610966073653e100,1.0900680370203409e100,6.219136714530064e100,-2.0672609308928386e100,4.873576190418757e100,3.7906588434438036e100,2.7515446472211432e100,1.2954995532932853e101,4.715469322490617e100,1.9836596741068228e101,-9.30095516758231e100,-4.8857597217395854e100,-3.833394882857638e101,-3.3579704486265427e101,-7.12352002285026e100,1.703930860583943e101,2.976493451958613e101,-1.0517174560063647e101,-2.7795354110577396e101,-9.594008560761779e101,5.6803933759219554e100,8.888454222846866e101,-5.75329039275779e101,5.313099270177156e101,1.6155115743490501e102,-5.5407036448176465e101,-1.470390110360411e102,-3.136291545213849e102,-3.3246698923226595e102,-3.643221004128767e102,-2.932730049967263e102,-1.4145852839100002e102,-5.090860609515407e102,-6.811616751676886e102,6.162382163950489e102,7.892021997974583e102,-4.993794638540233e102,-6.285921990743101e102,1.2701203151032154e103,1.0249151314629982e103,7.866174611621792e102,4.1677833886861037e102,-2.206088026710485e103,2.9495514943939847e103,-2.2313323163784627e103,-2.3531673865591547e103,9.905703221750963e102,1.981914989144841e103,4.002398570798697e103,-2.6054407432042886e103,-1.4372389752515241e103,-2.0519415964496633e103,-8.013172733122224e103,7.780433366419552e103,6.635113279800088e103,6.308953875819603e103,-1.1950671697711399e104,-2.8300451542753385e103,2.254682472307762e104,-1.7561735774552204e103,-5.014439511052657e102,2.540610759171946e104,-4.3690907009550966e104,1.2286130241445387e104,5.4249191798868863e104,4.8021450986209106e104,1.6472744512888431e103,-9.066268009294674e104,-7.034127980549683e103,3.74779811717249e102,-1.2834286477189772e105,-1.5030139768094765e105,-1.503377806580761e104,-1.4673815593377537e105,-1.518208308670306e105,1.354824024876316e105,2.412876201741997e105,-3.8731339688318437e105,-6.047028650289756e103,2.66208449896293e105,1.3673722046640455e105,-3.742066792707942e105,-1.9333434684261152e105,4.0383313391047463e105,-5.549963504028901e105,8.840472802587205e105,6.882192596973595e105,-8.64288546232395e104,-1.4651933498777543e106,2.1256547584459955e106,-2.2812963858765682e106,2.1809996890166703e106,-2.4430700843830785e106,1.971314237620377e106,6.833808354620725e105,-4.1674273345198145e106,-1.9631784424141677e106,2.5471039860806076e106,5.261221598788222e106,3.726825330776672e106,7.694091272918439e106,-5.525970583671272e105,-1.308068321069553e107,3.34722059099751e106,-1.4396384933594597e107,1.2384063584861805e107,-2.1257443899738648e107,-1.3844547389143443e107,1.4924881408691778e107,-4.907489550449917e106,-1.8225374598081898e107,-4.628686047214863e107,-5.1033920924973064e107,5.6799524476210726e107,-2.3617130846041604e107,4.6808502144078926e107,-6.685034467705565e107,9.925826987296801e107,-2.6572065917019323e107,9.455183810942714e107,-1.2727806973552905e108,-6.303563266736399e107,1.5051708117034622e108,-1.4360632393292185e108,1.6668449765401909e108,-3.647533185651428e107,-2.6533282627727684e107,1.2610768476742755e108,-1.809996862282954e108,-3.7566022750460584e108,-5.637117826611844e108,-1.8209664405525986e106,1.2550883964185047e108,3.4450253400365216e108,-3.70205139454673e108,-1.1353880343959371e108,2.692913099719463e108,-1.2699865269549812e109,-1.6347194642690618e109,2.234344641017238e108,-1.9618285955047276e109,3.376772028453112e109,-1.6260010792991453e109,-3.7314524289168745e109,-3.785244331760656e108,-2.068203090430904e109,6.024907413900342e109,4.907416668926407e109,-3.346044342972301e109,4.395445817822654e109,3.0517244199664534e109,-9.12380206192068e109,-1.4269522142890562e110,1.0937121468060805e110,9.205919100154065e108,7.508667152996293e109,-2.492028609073728e110,3.5269260034842735e109,2.9168557567535972e110,-4.168567478397834e109,-1.6285385463455025e110,3.0504042699182696e110,-8.857796685847553e107,-4.006670964688589e110,5.981878653096415e110,-7.972448778777902e109,-3.789051870842152e110,-2.7004829266361347e110,6.47974170418688e110,1.7562095298290308e110,2.0594683006209146e111,-1.5812154700710667e111,-1.132737193061119e111,-1.2957617162442266e110,2.3331841148673314e111,-1.9729214963131376e111,3.954724109193971e111,-1.7361119295731503e111,-2.5288787540679204e111,1.300614304891693e111,1.850387145735811e111,9.483666580058108e111,-3.793475058204841e111,-8.795089396866978e111,-1.445173822632258e112,1.3445253446120534e112,-6.295745474361432e111,1.6889387639218143e112,-9.274100928916726e111,-1.0453686618648214e111,-2.706907095708319e112,3.8130620789156966e112,-2.634844388361618e112,-2.4925073076632936e112,-5.2916399408991465e112,-3.3905476622592104e111,-3.2925703909494642e112,-5.397385158403513e112,8.929608550678595e111,1.1687154789435604e111,9.07878235696965e112,-1.6254852755856728e113,-1.2421678058478141e113,1.3781732809414809e112,2.5324989417476604e113,-7.033781530521627e112,6.615301956752809e112,2.7781343827596904e112,-2.0042731728137503e113,-1.4255146892102415e113,-1.0225449124461063e113,1.5847939368993475e113,-5.278406668963199e113,9.231080188734946e113,1.0053055783661982e114,-7.730479947639179e112,-7.923283213226691e113,-8.983238655706036e113,1.5740003008678575e113,9.95437435333462e112,-1.234805060194054e113,1.942343227254956e114,2.6761258439958097e114,1.1404601979724303e114,4.3773225675039715e114,3.3223053348554055e114,4.854529910474297e113,-4.92598417325624e114,-7.567770980361038e114,-8.339786886765759e114,-3.7486271687055186e114,3.537997535110435e114,7.221945972638376e114,1.3155807158402319e115,2.9220685418347977e113,1.1364356023340715e115,-4.4121194193878303e114,1.7509984356316568e114,4.2030229620940307e114,3.0150814058212913e115,1.8256329131893438e115,3.4342857249928853e114,5.620157706801909e115,-1.0626441476733116e115,5.77498038283775e115,6.988520952303428e115,-1.0219375839783663e115,9.939766816225012e115,-6.578127368678911e115,4.455002233113071e115,-7.290763153169051e115,-9.064691325517302e115,-1.4210505067664721e116,-2.302321058711171e116,2.987416102899188e116,-1.2831796153698185e116,-2.1980921801596133e116,2.1472013780236464e116,2.6783068567940678e116,1.8548577133815042e116,-9.082967323930038e115,1.349542036297046e116,-9.519273820260276e116,7.154478238348076e116,-2.6935068536991698e116,4.349359420015585e116,-4.152258169119353e116,8.552667480075866e116,-2.1354728186852598e117,-2.3261784246445823e116,2.0036209929806677e117,1.715330222800252e117,-1.928544904147476e117,-2.4800680646011556e117,-3.6488844844818765e116,-4.227151521643009e117,6.122368701852394e117,6.278465090494685e117,6.737690546370336e117,4.0154459603978006e117,-8.353444756240682e117,7.660622635389219e117,-7.166656185232346e117,-3.8276736884126665e117,3.87874234454482e117,-3.2422526417279323e117,-1.3710292839128587e118,-3.0712704678393487e118,-1.6007962099609327e118,-2.0032024659781565e118,3.0362559682532824e118,9.922849122718789e117,-5.331519843102476e118,2.4270190402307316e118,-5.253956394193673e118,2.128925491708761e118,7.538139778360816e118,8.845934733285717e118,1.0996833692201848e119,-1.2746779751256333e119,-2.009948121278753e119,-9.51475867433885e118,2.7136083549225024e119,3.145956958647594e119,-2.2121030084240736e119,1.5238326172107105e119,-2.523922155324894e118,-2.4351534638224287e118,2.8564348332171238e119,-1.8165143000020676e119,-5.5084623017586925e119,1.8738039933286324e119,4.564131903829276e119,-1.1021210349748725e120,1.3200563179281708e120,6.359291858236735e118,-8.109874994927534e119,-1.688094128729649e120,-2.5750821781359027e120,1.6145680754341578e120,-3.4170634463005036e120,8.000584318445151e119,4.604238399382395e120,-4.017000569317214e119,-2.7925572534298807e120,-9.201812903772118e119,-4.565216046768241e120,5.895874721930415e120,-6.342472039114082e120,-1.2644915904486808e120,8.789319641939369e120,-1.073181250750975e121,4.7623214394505636e120,-1.9483003515127015e120,8.370287084649347e119,-7.841126319126004e120,1.6301931979671187e121,-1.2327131823886354e121,7.50370865797086e120,-1.6574962026104283e121,5.648813918352309e121,-5.272793259525712e121,5.54611705350751e121,-2.4714384226572174e120,-2.474901964803847e121,-1.0625302019608983e122,-1.0358071690779519e122,-1.2942146758036461e122,-1.2950476029321727e122,2.067552959287114e122,8.041160412309889e121,-2.0932209625501555e122,-2.859871514934093e122,-5.175150326210539e121,-3.68084195887179e122,-3.620605832333957e122,-5.353163100958372e122,-6.0094528645767645e122,4.279716552808753e121,6.475095338830779e122,3.948453701106572e122,1.0029539653602834e122,1.2207469143618156e123,7.329720162752099e122,8.919123496303142e122,8.410856260701346e122,2.0792998518665872e123,-2.789736281803851e123,-2.03144809267001e123,-7.68765686517198e122,3.639126924167667e123,-1.881917505257174e123,3.2418572464434696e123,-2.8352154696406727e123,-4.5342060098721805e123,1.0563963950118712e123,9.281870855680897e123,-2.073210237382077e123,-7.026358624154883e123,1.5270327596306427e123,-8.041182723746833e123,-1.909434063839366e124,-1.484188142906764e124,1.6504929670464544e124,1.9916775632286084e124,1.8811025092263176e124,-2.349643016520308e124,-1.9184165698991906e124,2.3973731580651314e124,-1.253997832808244e124,6.878210923996408e124,-7.129710323648937e124,-8.307957701573503e124,3.1348220899149187e124,9.388370354918282e124,1.1941365965755814e125,-1.5769320744262277e125,1.4714174305419637e125,1.1257633982102054e125,2.286667887274302e125,-2.7925964152093282e125,-1.39764614523022e125,-9.285862880821956e124,3.1505708367812925e125,-1.7495985774806865e125,-2.939385865408118e124,6.63634581132525e125,8.218765445512704e125,3.489237714770262e125,3.949097254506995e125,-6.521039451058732e125,-1.3731839787133066e126,-1.098905914202445e126,-1.0399816395991771e126,-1.6808094894504608e126,1.1072240123053457e126,1.35659471143301e126,-7.774611433592613e125,1.8461154628725542e126,2.0825835353861746e126,-1.4832442175657596e126,5.193143728764467e126,-1.5485745021380548e125,5.124927147319908e125,-5.3915448051950664e126,6.767168350287551e126,-1.0082443342896729e127,-2.6473934512861367e126,3.070827885387209e126,1.7178019801215538e127,3.7756431242230044e126,2.1520983639802013e127,7.860057724938084e126,-8.680720049023323e126,-3.5808133334247956e127,3.9367946915711157e127,1.3889165438085137e126,-7.214005882665997e125,4.2351889991907135e127,6.093021806929058e127,5.773733565123936e126,-4.691785879101e127,1.1581577241321281e128,-1.0729897170359175e128,-3.2208992181969466e127,-8.215289714234557e127,-2.032091065632388e128,1.1533910929922035e128,2.275840849545319e128,-2.4192041831756727e127,2.4323009228411324e128,-3.1502933396010348e128,-4.492627551687637e128,5.228345929533072e128,1.0156436685516304e128,-3.7114235334751815e128,8.135962558887606e128,1.331985206655564e128,-1.0860540628390275e128,-3.056174748727125e127,1.2430320728352066e129,-8.283643269340902e128,-1.2390031936837602e129,5.72111422869289e128,1.804553875789185e129,-1.6354105977491022e129,-2.0906510977351264e129,2.3341785293004387e129,-3.724351589162335e129,4.590080112775707e129,6.282278541755832e129,-3.952762101529071e129,-2.9631320735573346e129,-3.9991879709611747e129,-1.0939254199702846e130,6.693844599786211e129,-1.4204475852025071e130,-2.991169901288996e129,-2.1473256300729798e128,-1.7455656166076144e129,1.409120902853781e130,9.928156840246749e129,2.859970948478084e130,1.0430868756493784e130,4.085253697899071e130,4.066411381713915e130,2.816487968673633e130,3.2866016073179327e130,7.932616905539462e130,-1.9604617189705585e129,-3.7715319825930447e130,5.847678112450536e130,4.71994962892013e130,1.1018784925982462e131,1.5791046093736564e131,8.845990088720422e130,1.6167773340672622e131,3.470122277319661e130,-1.4542402799265522e131,1.678722810578809e131,2.788211876044371e131,-2.8761960248788254e131,-3.5025526831782382e131,8.755706149961301e130,8.552410474261657e130,2.262677208059697e130,7.681881597874946e131,-3.3565837901091383e131,-9.330993651438678e131,-8.062363623816527e131,1.8016998773246413e132,-1.932364314276442e132,-7.107666124032118e131,-2.750014092279382e132,-3.045683118358902e132,7.46871164551199e131,-3.2532242289435694e132,-3.3655249300497754e132,-2.9339523172131694e132,-2.734273262007908e132,-1.6064077942407278e132,5.286095429399772e132,-6.950235056817651e132,-1.1099013376154884e132,8.317026962727335e132,1.164100867276388e132,-3.1330067540663414e132,9.114526683262632e132,-3.906732134788214e132,1.5246910465312235e133,2.600567723831177e133,4.838727966647445e132,-3.376645700412282e133,3.874271022488314e133,-8.529257050553738e132,-4.0471560049410365e132,-4.291101754612287e133,1.9550858422051828e133,4.1902912994242537e133,2.3739469694185666e133,1.2102827171247275e134,-5.994658898243884e133,-7.170953175274149e132,-6.056696959600502e133,-3.0271424893403614e133,9.560711250113942e132,-1.7575310924130144e134,3.3191007872977564e134,-1.254435672886044e134,-7.658660334329753e133,-1.3055468652791666e134,4.654662702443372e134,2.7825263536438955e134,7.775014338390869e134,-1.7380054104821292e134,-9.461725873710306e134,1.1751347431210442e135,1.03868022955446e135,-6.2842667894488606e134,1.736561959128439e135,2.192669645894998e135,2.20327687632258e135,3.119733723505088e134,-1.308382503482399e135,-4.996218850941418e134,1.526189400663397e135,-2.7877711176303403e135,-5.0273403849929636e135,3.041286578569204e135,-4.9052326491882185e135,5.514809733707834e135,7.817795547965161e135,9.345406224724058e135,1.1240405904641641e136,1.4539248332667102e136,1.2550327182340486e136,-6.03898581887227e135,1.5128129325803507e136,1.2889863093073017e136,2.0739921834665853e136,4.781562917722228e133,1.8319241131113738e136,-2.1864355078134477e136,2.0914326175825985e136,-3.152575724773957e136,6.389807950826462e136,-1.634002823768796e135,9.969334429735427e135,3.9201362661092275e136,1.1365866221546512e137,1.3526376474225958e137,9.6272826877784e136,1.996736642408936e137,7.214172062880281e135,-1.7575309521355252e137,1.287184861685102e137,3.3803252613329872e137,2.6990158944164137e137,-3.9665620269977825e137,-1.881817317111351e137,1.5388415041009267e137,4.914130405679512e137,1.216212109791871e137,-2.0051491389615018e137,1.7626777780987934e137,-1.0956773782646497e138,-5.254966392250452e137,1.0868352228069227e138,7.672306689194391e137,1.0013913557270801e138,1.2437129994083496e138,-1.4129047129337977e138,2.2165873778821374e137,4.782761969235059e137,-3.950368006209246e138,-9.919982663093223e137,-3.4759005078639664e138,7.940786612392825e136,-7.546018715853791e138,8.718073024048998e138,-4.60773544591315e138,-6.777089390781641e138,1.442463745147435e139,-4.88536591444192e138,-6.514309665014e138,-1.7800501914608833e139,-1.4367015642454555e139,2.1644492068324223e139,-8.831571949271999e138,-9.82383502955177e138,1.5394054707783334e138,-3.891681111837234e139,5.458569343226321e139,6.816122298831374e138,-5.107031050022714e139,-8.863660153210067e139,-1.1341919045508706e139,-1.1076503071408027e140,-4.620049849771774e139,1.3019572114671732e140,6.908385664432394e139,-9.062732230027339e139,2.1951337284171663e140,-1.6301007056918944e140,-3.00031521931836e140,1.7575041749685223e140,3.251822984158223e140,-3.175395073148464e140,-5.000587541242572e140,6.584834527051623e140,5.0626885709822525e140,-5.012327410171263e140,-1.0017140557680942e141,-1.958820182102772e140,1.0237848732897043e141,-6.711214967137833e140,1.0057924401269774e141,-9.366392422574423e140,8.096439738659569e140,-2.3275445433742532e141,-3.078511574450577e141,2.9979943220973446e141,-1.1949480151728699e141,-8.064507399099692e140,2.528033693274885e141,-2.4855108370524365e141,-6.456198169385735e141,-3.9066995182537775e141,8.687641058492772e141,6.598760129630974e141,-7.980652662025934e141,1.1647921539818707e142,1.1351591769579416e142,-7.4914394369227686e140,8.644390219058417e141,6.416832321399125e141,2.9630202468666276e142,-9.051951445558218e141,-2.9646379727033086e141,-2.8179167378711847e142,-2.0482770713844312e142,-5.389745365337201e142,-6.94465173193848e142,6.060202057961981e142,7.131984906070426e142,-1.9405522396776394e142,-1.1945789334373586e143,3.7877789788798675e142,1.6008676328869556e143,-1.0871373341168126e143,-2.0231893149607354e143,2.11006819234032e143,7.796144281545488e142,-2.19794783916765e143,1.274696018232515e143,-1.0406493530115913e143,2.682663935925496e143,3.400167730331047e143,6.734285757901794e143,3.8834384309600984e143,3.2614102997513836e143,9.756800768584596e143,-1.1274280302548927e144,1.5170880470105525e143,1.3457270622196178e144,1.5697270020729197e144,1.0356655845358426e143,-1.6505283904512847e144,-2.2193917840607585e144,-2.533228028630468e144,-3.604455459815294e144,1.1379487298878284e144,1.6791612704242443e144,1.5279824311251783e144,-2.185245531267916e144,-7.56112573285837e144,-8.048213566441255e144,4.667369779848582e144,1.0939097651136459e145,6.321507088621715e144,-1.1646077810420392e145,-1.352498373354816e145,1.4414518130865492e145,1.44371498109083e145,-2.6199273354502276e145,3.110634130516947e145,-1.6278412538514505e144,-1.8144355622556433e145,-3.7736233545732544e144,-3.481972467258905e145,5.919551695397255e145,-4.8285237563865175e145,5.715796575453236e145,-9.364913870151687e145,-3.9803402675962625e145,-8.192138582500256e145,8.940049651756206e145,1.3865332222933992e146,-5.147709513939273e145,-1.0995541294425127e146,2.1499064138445224e146,2.0308744585909853e146,-2.6494980202986876e146,-3.003406518948071e146,2.3897359441141195e146,1.5855327099337404e146,-6.2088781636342765e146,-1.4356053804724384e145,-1.5193592803374717e146,-5.330679591885648e146,8.126893150667988e146,5.843730019143424e146,1.20226212376971e146,-1.2265171277205247e147,5.7471844219643126e146,-1.3847510182082243e147,5.998557832832924e145,-9.343556396510241e146,1.5693718779134284e147,-1.1670475330042045e146,-4.022823685386279e147,2.491287662444679e147,-2.4353138013857157e147,3.508359873193043e147,6.180743938835709e147,-6.423238618449518e146,3.750916220004274e145,3.1974436805638994e147,6.362575706612805e147,1.2463166561526354e148,-6.536344584632536e147,-3.5001909672697663e146,-1.395184981963375e148,-5.011494313388748e147,-1.2365846730055635e148,-2.8607386842687933e148,3.812079075937979e147,-4.489678656485791e148,4.421675850898013e148,-2.23150952313276e148,-6.461939435849028e148,-1.1660800070288251e148,3.4211061102771545e148,-5.852114565757114e148,-1.0078803489229974e149,-1.0694757715339359e149,1.770216595302196e149,-7.489077681820395e148,1.872817758709852e149,2.5471932366034754e149,9.191996390536543e147,-1.08131604932597e149,3.399277177521241e149,-3.285501751288633e149,5.538117320405993e149,3.5894333903040507e149,-4.420396365104666e147,-6.305633955364329e149,6.481999843901229e149,-1.4594546780037861e149,-9.921982870610537e149,1.5169518520078252e150,-2.0497325776330026e149,-9.895115416723248e149,-1.6071662600662206e150,2.7008542043942035e150,-2.9871864671844854e150,2.919111583021891e150,2.310567237615559e150,2.2880861833727077e150,5.512149276633451e150,6.34905721612512e150,2.124959036946845e150,6.206138451155366e150,-6.410003863392286e150,5.746922243067005e150,2.7014864591747977e150,1.4341878940700033e150,1.0086919610207608e151,1.1124783021414015e150,-6.441851241792184e150,-2.4861653771132014e151,-2.3977179631158258e151,3.322161734210837e151,-3.7886087537507727e151,3.3399620381774644e151,1.0130449994101918e151,3.44653447756366e150,6.615915364069995e151,-6.521590949194704e151,-3.0186722848246335e151,-9.372375883716126e151,-1.8532696822152256e151,-7.679589225996816e151,-1.6436825636691184e152,1.2359282501285076e152,-3.0107032900798855e151,-5.300218429895024e151,-9.679611478156736e151,2.31216571522879e152,1.293255979246461e152,4.178191622539886e151,2.7587445312686695e152,-2.7288129510640576e152,1.3577251629118213e152,-1.5694653277211048e152,-2.0145433861290475e152,-1.0156838546614558e153,4.249636926322968e152,5.265500789172975e152,6.974418470222855e152,8.349705013235302e152,-6.937843755322829e152,2.121286204954452e153,1.1139232241848056e153,2.8281724571977433e153,7.645257365672059e152,4.072008493438027e153,-4.529652447304593e153,9.549037461060589e152,3.904261552434202e153,2.467407305121949e153,-7.281285185346233e153,8.600147451115545e153,-7.94220982568588e153,6.053885700410187e153,-1.839849575924607e153,1.6414915006977498e153,-1.618565952523881e154,4.19906842386098e153,3.791752708693132e153,-2.780461824769969e154,-6.891678884171799e153,-3.380212785071419e154,-1.5104040678919155e154,2.5846767459239925e154,-2.7156840852836374e154,-5.1418537410150555e153,-4.8443004953650515e154,-2.713743644159772e154,-2.838235504523029e154,6.578768835380423e154,5.384908666445559e154,5.716095095934046e154,1.1884054501584192e155,-9.764757651491788e154,1.197317744749734e155,-1.257132017065649e155,-1.0099596036416522e155,-3.0381325853985293e155,-3.3521910464594653e155,2.7894729598287243e155,-3.0238536686167816e155,6.023851128410132e155,-6.4790205868906e154,-1.3566143432307293e155,9.01151628411983e155,-3.3961282491831835e155,1.9458555088017294e155,7.451623912401936e155,6.098251642283234e155,-5.763338310225744e155,-3.389922030279928e154,-2.865731304429754e156,-6.249234345890442e155,-1.0763992958377147e155,4.409578611220965e156,-1.4895605526978643e156,1.7011976767280373e155,1.4845001923285575e156,-7.84893495660573e156,4.2664316847604175e156,5.515466645800872e156,6.398611483656011e156,-1.1316308465752385e157,-1.5956121272034315e157,3.790821976493248e156,1.0340062037258283e157,-1.920927512136016e157,-3.085577144248725e156,-4.493699903276629e156,-1.273775319787697e156,2.567452318712296e156,3.991691463385384e157,-2.5343444625283673e157,2.484747937111045e157,-1.981697963523362e157,-2.6571874908046852e157,1.914084161042683e157,-4.320763741452116e157,4.787759843876756e157,-5.4182850400759845e157,-1.7117814363498457e158,-1.2795412231297823e158,2.0431545857155987e158,1.3908076621636786e157,1.0798450490055009e158,2.8696166994458663e158,-1.2797094196755474e158,4.214040956936067e158,-2.9944859646925545e158,-2.8788290850745665e158,-6.300624565595058e158,7.084032688979695e158,8.192707225902232e158,2.6235805269323475e158,8.963014083203333e158,1.338109342377207e159,3.7534724244524845e158,-1.4938696508807508e159,2.2998666810271753e159,4.057860896492614e157,-1.4564789136778896e159,4.331612820885582e158,-2.369088792501262e159,-3.754304461964718e159,-4.466032752342668e159,-4.348648185751127e158,-3.3828919652886388e159,-6.3033592608276225e159,-1.5977112997562916e159,-4.657860004523132e158,-8.463993450048386e159,1.0409040107878376e160,5.245369966330843e159,-1.4647564737862612e159,5.915965235793744e159,-1.5726651731688947e160,-1.1122262520710345e160,-3.0447043728125745e160,-2.6753790709314425e160,1.597300842925996e160,-4.1732211543686724e160,-4.968989766637916e160,-6.2032621166620196e159,6.974801432721207e160,7.221795923322963e160,2.1811041634285637e160,-3.75291791311556e159,3.665149642833632e160,-4.112689428371432e160,-1.0562175237456189e161,-1.6339876328428458e161,-2.474058862377453e161,5.826906993803619e160,-1.198013769096553e161,2.6253082369130107e161,-4.0405534732232784e161,3.8324506207253934e161,-3.3719438442320417e161,4.3222590286296835e161,-1.1084134739916254e160,-5.663724192454413e160,2.8247355538759166e161,5.75157795405727e161,-9.723335840178448e161,2.8709545395147795e161,4.637132047794227e161,5.065289034953972e161,3.7820364623328906e161,1.6060430100733459e162,1.887975892358519e162,6.27370007334347e161,9.828696458842174e161,-5.924377297867456e161,-1.1448398702204372e162,2.120211307176058e160,6.440632512378996e162,4.482786445783456e162,5.80475644520906e162,3.099728986167659e162,9.757559631420147e162,-9.871296097899487e162,-3.4823993843611382e162,2.0267870360905336e163,2.0215636817722513e163,-2.0187804640493446e163,-6.881440050622684e162,3.3245160586892916e163,-2.8594044091247705e162,-3.6287997158358424e163,3.078764478701271e163,6.281071942682251e163,8.941865915908731e162,-2.0790917853979595e163,8.823688150226739e163,5.973136338750341e163,4.998998637897618e163,1.1125578622878313e164,5.5030649551936e163,-5.5504348462167497e163,1.4018034833273097e164,1.6921816738053374e164,-1.7848304909017203e164,1.7207787508139505e164,-2.8466846845997133e164,2.1669023147260986e164,-2.6548188717361394e164,5.796029275613851e164,-1.2366390435046705e164,-2.6237326239346504e164,7.5875992870407e164,1.8680941647518885e164,7.62626187859434e162,2.8757574410866103e164,1.107655076259217e164,1.0308531813732456e165,-1.3440739882512186e164,1.928514945326551e165,2.6849684794347105e165,2.2110156581920365e165,-9.265834865569112e164,-1.7799893320070133e165,1.5910757905284277e165,-1.5053882435508312e164,-5.0067774947391205e165,-7.672686463394092e165,7.104096263371036e165,-1.0071574254498117e166,9.099920549437867e164,4.165818426250801e165,1.112979394044286e166,-3.1428985889494814e165,-7.3591072749365575e165,1.3160262247968493e166,-2.0185981198373087e166,2.6002872856595607e166,3.5595861222912296e166,4.1246221456413315e166,-1.362811488274604e166,-5.316322980059266e166,3.253650860558353e166,-6.596857059623495e166,-5.0640394033777155e166,-4.214220132885501e166,-5.913901944631075e166,-3.32144588412307e166,-6.506477218213793e166,-9.538031300906565e166,-4.8757900380824694e166,-1.789287852776145e167,5.133694395639105e166,2.894176231577511e167,1.1143911030841948e167,-1.9763427946835692e167,2.627248984912257e167,3.3640246918061254e167,1.8299768782210789e167,-6.724939490807382e167,-6.342616770863385e167,4.328152116409622e167,2.9674572903220786e167,-1.1133910252135056e168,1.4463811764629603e168,-1.254658610223843e168,7.774774396221727e167,-1.1956961886209764e168,1.8868882080828267e168,9.621935194898383e167,4.653159619976468e167,-3.1699788065583395e168,9.891956767805492e167,-4.7602086696200796e168,7.786638918009701e167,-3.396873853718792e168,-5.569570820953293e168,-7.426538514285239e167,9.587649233612245e167,-1.2481057159618057e169,2.029492730438092e168,1.2694734425801187e169,-1.3488625845355628e169,1.2774744886606371e169,-2.5070258141207734e169,-1.2310351838674858e169,7.984204706605799e168,-3.0913816067163055e169,-7.99592029106746e168,-1.0150210633584523e168,1.889949997680704e169,-5.3648407611656946e169,-7.231772992620086e169,4.19758789976417e168,5.574861974209603e169,1.0815454200609727e170,-7.431607689822847e169,6.16121635516306e169,1.5291483084797036e170,-3.0350357698919145e168,-1.411455441796692e170,3.189485143168346e169,2.7213449784414045e170,1.786175705079977e170,-1.8592895568271464e169,-4.034870521133192e170,5.787747046710464e169,4.876475350523993e170,1.2766485142241497e170,3.8936513797584366e170,8.418060412541531e170,4.4226549302087667e170,-7.26333021351837e169,1.4283167701438884e171,-4.960808066420997e170,-1.321905836453937e170,-1.1508550615548112e171,1.5249991451965707e171,2.319556269217276e171,1.1932296425962281e171,-3.736087022315906e171,2.5987491146396537e171,2.373076403836056e171,-4.4504768174936744e171,7.222908885445441e171,-1.8380137532340342e171,5.427690113498816e171,-6.0522769298271135e171,3.5868974689861393e171,-1.1164215860471947e172,1.1246725452455876e172,3.182491511165655e171,4.996910485294014e170,2.1771451172532703e172,3.001466928355709e172,1.3164912673063285e172,-1.9803196393698793e172,-1.5506932332462156e172,2.453059923706522e172,-1.7837226042693755e172,7.774071773651658e171,-4.239391423542889e172,3.542617640599759e172,5.809986784862627e171,-5.1559514355277685e172,-8.138768002872034e172,1.0379393223326212e173,-8.7505250055865e172,-1.3063921272938808e173,1.3335926315318593e172,-4.275356343367546e172,1.9707885461561214e173,1.9125136592917705e173,1.9325644782511752e173,-1.368392928335469e173,4.342742189512377e173,-1.488407977685585e173,-4.2764022452218264e173,-8.581072032130463e172,5.272719207765051e173,-8.509695160692197e173,7.580953129931038e173,8.459879731466136e173,3.193464368223491e173,-2.144270623028357e174,1.3207855801984833e174,1.1531661921626471e174,1.761663400917282e173,-2.9516769627180893e174,6.153784771491286e173,-3.385684261614119e174,-4.123216647633987e174,-4.314302352237504e174,-6.581487008853307e174,6.460800395899793e174,-5.418201306251561e174,-1.10049320701432e175,-3.4314950968873703e174,-8.582777585100133e173,-1.623284257290065e175,1.7512251484242596e175,-9.891661486349224e174,1.7890181591893022e175,-2.7953715292499213e175,-2.1578173111962686e175,1.9297169168415147e175,4.253316462280277e175,-4.053622885245805e175,-7.526277560388632e174,-3.6948826176089286e175,1.4906663121605374e175,-8.232175403380971e175,5.124466103053952e175,-6.19775195438017e175,3.657310003569407e174,-4.7584034810596445e175,1.558717763331716e176,1.1589445112644362e174,-2.8372379724403292e175,1.2858922268561896e176,-3.368792186966105e176,-2.2754257512642133e176,1.4518431479589777e176,-1.391428040647159e176,7.074287707237224e175,7.101035925268073e176,4.760224569054245e176,-2.5783555708312197e176,6.030409743860759e176,-6.231875712626897e176,-9.643380135330141e176,-1.5620045586954092e177,-1.2141351999499948e177,-1.8292305279823053e177,-9.39469184443841e176,1.849578463877499e177,2.985256312114035e177,-5.49812428455653e176,-2.4246831189085725e177,-5.176097382948321e177,4.100674772828799e177,6.307937677189775e177,3.5710362380711816e177,-3.9897710229284146e176,5.880911337120282e177,-2.186930859980931e177,-8.900302246231369e177,1.4145354802889295e178,1.4595811569241533e178,1.5534826093449175e178,-1.83379139255814e178,9.139131213416952e177,-2.482990108113329e178,-2.5050643198082176e178,2.6391997047698195e178,-1.4340314914224725e178,3.032003104340486e178,2.0355665625732523e178,-6.808492718193416e178,5.621927237955798e178,3.1453924928857244e178,9.840930791181109e178,1.01456105584542e178,-6.148080909604353e177,5.144588174274351e178,-1.647849378248215e179,8.375352466653995e178,2.5688632625001982e179,2.3014652116858307e179,-2.8720349084771303e179,4.124795329369195e179,1.6280253254151785e179,2.2145171231566873e179,-4.7546442427186086e179,-6.265094014130458e179,-8.52116809417457e179,4.985655917392626e179,7.576676908878577e179,6.660250364764042e179,3.3833925092618255e178,5.110211054833194e179,-1.0084170632159859e180,-8.452300844843941e179,-1.3673463786607834e180,1.0981448952315395e179,3.434216417396852e180,4.0701401699048265e180,-3.4878782875927126e180,1.7644845314773945e180,-5.163070909555823e179,-2.195729037790062e180,-6.962547683583046e180,-3.801383560105181e180,1.0559986902673734e181,6.140807968413987e180,-8.221003965195473e180,-3.7734213709426613e180,9.222034999903847e180,7.858029752722093e180,1.263845962873264e181,4.510858405776538e180,2.8666941000751623e181,1.998918767351666e181,-1.3965143861318385e181,-1.41508543464203e181,-5.350693181895691e181,-3.1114774218987946e181,1.805554541069377e181,-5.695232194507013e181,-5.904707645333125e181,-6.810091509752241e181,-3.747970766013364e181,-4.069600410484358e181,2.407864741585795e181,-9.998209526458971e181,1.5622477011884038e182,-8.051948862354783e181,-2.1770197349113838e182,-2.5507226942482045e181,-4.115182245046529e182,-1.8724412710984555e182,5.150028152672661e181,1.9393664505237215e182,6.256844164464386e182,5.512987189032883e182,2.879818715280688e182,6.068843951558757e182,5.936083783498474e182,1.3739740873235554e183,1.6942581709347451e183,2.261654978993713e182,-1.2058342189553722e183,-5.477954971209842e182,-2.620765699280108e181,2.4933677193976723e183,3.596487799335149e183,2.346492094512267e182,3.981210043100967e182,-4.532612349856501e183,-5.244655877937268e183,-7.909136554986116e183,-6.171883146531646e183,4.002082608789597e182,-5.196986527916539e183,-1.2887295261120967e184,-3.8211924657787083e183,2.0516375407895946e184,-1.0577438779872708e184,-1.0495707805486308e184,-1.406865101343959e183,1.3848143981723815e184,2.3523276087435773e184,-5.716812034452558e183,-4.703523679799081e184,2.4870627974144214e184,-6.239369525049713e184,-7.271552711706983e184,2.739265313574438e184,2.919121741139075e184,-6.900021354807318e183,5.71471528714195e184,1.4486076293372883e185,5.806169417435558e184,2.633610858265599e184,4.303103148468546e184,-2.790432157692644e185,-9.448899778655219e184,3.506783851844508e185,-2.0027586435746357e185,5.420413989622597e184,-5.3127532612430716e185,3.1489670764953837e185,5.025731935019056e185,7.121770761318763e185,-5.3032538129123956e184,1.2224388816214116e186,-1.0457194654062485e186,1.5582061435726543e186,1.7571178496699374e186,1.2953555564688368e186,7.398016183480594e185,2.560028351436814e186,1.2857940946253157e186,3.4967070667362255e186,-4.478846138084155e186,-2.2095551491487547e186,4.689173210514044e186,-2.180279245582109e186,3.732574997052423e186,8.249280655741772e186,-7.233015581561877e186,-8.417106919823209e185,7.681740990619063e186,8.278625372537911e186,-1.6443650363483819e187,-3.4487508489400454e186,1.2770766774929e187,-2.315787004477316e184,2.546484115997689e187,-2.630129656233959e187,2.6347248843631766e187,6.657588171384718e186,7.88078362925811e186,1.5938841314048672e187,-3.797079359078207e187,-4.9384766820674245e187,7.55709757738465e187,-1.1646159215199151e188,-1.2467183044858976e188,2.8817163110046217e187,-4.636344473466079e187,-1.4521001668153255e188,-7.060204232870108e187,-2.683622803924732e188,-7.317102929847666e187,3.666172285989087e188,3.65733071515204e188,4.395504243121384e187,3.229047206730608e188,9.230804246157776e186,-6.450665729884345e188,-5.013049305711111e188,-7.84961223002389e188,-6.716794438077384e186,-1.0385183439796482e189,-8.956414044045623e188,-1.6633899574253568e189,-7.661984920885494e188,-1.2364965099228628e189,-6.941173079015558e188,-6.95960411928335e188,2.805095513320122e189,3.094104416054818e189,3.040258850068187e189,-3.598887415250695e189,2.751173578109472e189,-3.052525069491174e189,3.2066184159719e189,5.345880432398176e189,-9.14665008604894e189,-2.6603837345962965e189,-4.868845107296009e189,1.1716058366204974e190,1.4037085555877183e190,-9.442690668713129e189,-2.4758303153569047e190,1.6214138784869333e189,-2.7245746386643658e190,-2.1648525965303633e189,-7.278442108547061e189,3.810874788041041e190,3.7951801431493884e190,-2.1241401807058646e190,-1.188540034105192e189,8.60772234927135e190,9.485058953960124e190,-4.950727533233607e190,-4.8301898353972515e190,3.828698613967271e190,3.794657085014375e190,-1.8944113948255453e191,-2.0602212470070673e191,-8.065553103289899e190,-5.4264310728849485e190,-2.6714050272471945e190,1.6322451174019882e191,-7.027064213887993e190,-2.4366676827619772e190,3.874174483513933e191,-4.195425524879206e191,-1.7964334073564545e191,3.384502152371829e191,9.419768167799252e191,7.514117177913725e191,-1.283661453203808e192,4.2507217689828085e190,-7.518193258454302e191,-9.614242364749439e191,-1.8669270660266864e192,2.8069435923395427e192,-3.687790804179594e190,3.766056345282972e191,-3.4861125701262046e192,5.650118070183251e192,-1.864512469849753e192,-2.4504554176753165e192,-3.0853928068932395e192,-7.254348285549797e192,-6.943336248097729e192,1.2577001679847304e193,2.802146947102183e191,-4.762789272092432e192,-1.412614215862803e193,2.428392634448922e192,-8.558452789513394e192,-2.3324159755319592e193,-1.951708151280354e193,1.6476364108008997e193,-2.212777447284595e193,4.322443152041402e193,4.150171743831509e192,5.926830936509614e193,-7.848009505749752e193,1.0116464000895777e193,-5.80646856318528e193,1.4371790144878985e192,-1.3855866445642018e194,1.5735098958210707e194,-1.328482049402454e193,1.0823838798461215e194,-1.2716297736149209e194,1.4134670817434039e194,2.0039633925868993e194,2.950432980745857e194,-2.5231596882139792e194,1.9050556817239235e194,4.918254956838533e194,-1.730115938543736e194,-3.463643279533929e194,2.7515334355772967e194,1.052592028094911e195,7.173963915763474e194,-4.5088938013755245e194,-2.5286137902178844e194,1.61397389438243e195,2.0618312837851842e195,-1.361155124107049e195,-2.405230888208014e195,-9.287211040732281e193,-2.9016082823960546e195,4.0276543219815945e195,2.435384239671572e195,4.80202315828246e195,1.242890413048689e195,-1.4232151740229305e194,1.3049996731468203e195,7.557174766897747e195,-7.287300880468714e195,-1.116738880376675e196,1.3718168203709265e196,-1.6408316331993547e196,-1.075540239759283e196,-4.836155713152313e195,-3.6464692881216286e195,-2.1196065996501565e196,-6.969643106542646e194,-3.5493764857229384e195,2.1411741452527938e196,1.8676483204742188e195,4.789567932561505e195,-1.7731232413591718e196,1.575910606222186e196,4.571025045116851e196,1.0158008542113544e197,-6.383740435551445e196,-9.858709670610889e196,4.113395523380252e196,-4.3960968554439645e196,8.776956244724475e196,2.9166476061116216e196,-9.35912430663758e196,-3.367573650718901e197,-1.6152011616436406e197,-4.500025971071396e197,-3.3039261305603906e197,-5.8972502990138034e197,-5.636666144943941e197,1.0665193997200202e197,4.439005145237548e197,6.583385722209089e197,2.6318670385048078e197,-2.222557801994313e197,-3.180905757240268e197,-1.333587050786738e198,-5.330115983487761e197,-1.845840382184772e198,1.2722353319693755e198,1.9228149178446023e198,3.9799444501401765e198,-3.691304146278032e198,1.8779207657938926e198,4.493673417401818e198,5.55828675160171e198,-6.339363451682806e198,-4.051229291527947e198,1.8566487504692738e198,1.217267155342335e199,-1.4666293842987212e198,1.6496822708368215e199,1.5059866094964907e199,-1.6019439261806936e199,-3.5674022091617646e198,-2.6637507524385068e199,1.3736115661386096e199,6.318061519176919e198,2.0925387213709877e199,1.0922988226423504e199,3.967592544392339e199,-2.8721541993397625e199,-7.276125557130081e199,5.01909091230797e199,-1.0936164802979832e199,5.684820440456928e199,1.2953428087805512e200,-1.0703170935260763e199,-1.6873833231812804e200,-5.560754416033421e199,1.4042693756326578e200,2.5922066230467854e200,2.559552265876677e200,-2.45393422248075e200,-6.565795333890629e199,-1.2402819481395696e200,-1.2513124343973465e200,-4.751692760933009e200,5.65974991545131e199,-6.0879023431462696e200,-2.374591280685381e200,4.7972362416837574e200,-1.2646816703949855e201,1.8314843587392093e200,-1.677663986908251e201,8.180902094831297e200,8.169599637499515e200,2.0285483381356872e201,-2.78904199940113e201,-1.1202811373086981e201,2.755581855120809e201,4.287358207123983e201,2.093503737405997e201,4.664385264807605e201,-7.330738063526383e201,7.424201516809735e201,-6.587543186999363e201,-1.1034395152589474e202,-7.881528988441583e201,1.4800550408233423e202,-1.1396106500168727e202,-1.8412530748570222e202,-6.825649395502001e201,1.3893483302391251e201,-2.613876817513807e202,2.832416963985405e201,2.039445115116263e200,3.8262881942090004e202,-3.9059632525850884e202,-4.29681547479565e202,-3.7521226230521217e202,4.0698423146539845e202,1.0519286827582656e202,8.494113794745999e202,-2.608700172985171e201,1.0055007681881548e203,-1.3710003289038758e203,-1.176048884514854e203,5.208599008174569e201,1.799991751095055e203,1.0139671578164521e203,-2.5943694493410804e203,-1.7212054040271283e203,4.002955088057722e203,1.1684382319749733e203,-1.9511945011174852e203,-5.935860815461252e202,-4.707781601828431e203,-1.242072968577332e203,-6.546892624664746e203,-1.1755583711405528e204,-7.479509527366916e203,-7.355872993366012e203,1.7529816954266752e204,-1.0553206525002463e204,2.0495172454525494e203,1.4328740521564805e204,1.0356028929561231e204,-2.5446695062649453e204,1.3014351031895925e204,1.9011305431254834e203,2.4574490349436003e204,2.7326244580480494e204,-4.8532017428954765e204,-2.3930775645252286e204,-2.300700330037672e201,9.508691891264737e204,-6.748612471923708e204,2.9969837634254097e204,8.026544791244869e204,-9.730667504495514e204,6.814319254429563e204,-2.0620915591917235e205,-1.8184019561002364e204,2.0049180624966433e205,-1.7084318364212094e205,1.452285195367222e205,-1.633276736253861e205,-6.174615471025774e205,4.283142543926026e205,1.6033336707125195e205,-5.57871147172283e205,4.481329983901415e204,1.211466425505849e206,-4.071998274894013e205,1.1766085451777589e206,1.8957432660050313e206,9.893218764990114e205,1.5471143809987714e206,3.8434452717887414e205,3.1632366456303664e206,-4.0670601040483574e206,1.177984230598867e206,4.9050161436292894e206,-1.418140063925403e206,-6.770220596153347e205,-1.887336102415341e206,-8.356673110498665e206,-4.117021241576743e206,-2.9288840745487758e206,-1.3019321837090046e207,-1.3479404415674386e207,7.965010980287445e206,-1.3937559916337998e207,1.3841841717308857e207,-8.927747719788091e206,5.388035535959205e206,1.0579930304994846e206,4.2368775291873834e207,4.835701911624201e207,-5.355144798984626e207,5.662076994597656e207,2.1426792392074394e207,8.333496213674664e207,7.573123247022731e207,-1.0670760539932234e207,-1.4047513514724917e208,-1.0385141250096175e208,-3.716458562439015e207,-1.4482046614915834e208,1.0570987674084452e208,-2.958670406348877e207,2.8227420508450557e208,3.0657119057873887e208,2.0909510087453955e208,-3.827428474321039e208,-4.2919523330147975e208,2.776283911531538e208,-1.0778380044825165e207,-6.478449580478133e208,9.437417244059746e208,2.762184209019954e208,-2.0696477634333764e208,5.66351942081641e208,3.492595639312902e208,6.940558744014248e208,-1.8379638870553048e209,9.01068398812601e208,5.609646641906311e208,2.5032249523069056e209,-2.521104093489717e209,-2.886333472117735e209,5.419643088154313e209,-1.7003032554306267e209,-4.5798659550956964e209,-1.9322155548530477e209,-2.8094697029414304e209,-2.2196251318781258e209,-1.1310771437060403e210,1.6434364126953015e209,5.401801129737813e209,1.3860902596049078e210,-7.407274994910839e209,-2.9346283513095606e209,-2.132492001257912e210,-2.0111824847132805e210,1.1891133050008578e210,-2.3270082126483312e210,-2.8176301836463836e210,5.1958495407044447e210,-1.508756318683652e210,6.880414362376227e210,-8.73463452859483e210,1.376616484264562e210,-6.121163186137939e210,9.720962028316342e210,-2.5923497135554304e209,-1.6957036716492513e211,2.139698608415608e211,9.95180134409452e209,-1.566558397938661e211,-8.415561742641456e210,-2.821245091667401e211,2.0822561171780327e211,-1.9658884551119092e211,4.875738428779471e211,-6.940868711160286e211,2.5596285110838843e211,7.677412265754677e211,2.6184348511655273e211,3.6525285101945843e211,-2.1165386474381594e211,-6.108026361508786e211,-6.960033951377931e211,-1.9092299470508605e212,1.858067618013998e212,9.749010505226456e211,9.554222623396048e211,-2.1863607366648935e212,-4.111647181443392e212,2.1626271400785738e212,2.4874963198620606e212,-1.7244770115824072e212,-1.9247860164018007e212,2.060682487101063e212,7.501516086845941e212,-1.0239561216346609e213,-9.422333627499176e212,-1.1564609269561821e212,1.1816121535135566e213,1.2056507119413087e213,-8.410174484144209e212,2.308153027135168e213,-1.124007209140826e213,1.9621944038254768e213,2.653203285165416e213,-2.1905393251453713e213,-4.3372463813317616e213,3.456798816222812e212,3.833217245812978e213,8.104215644497966e212,-5.754757729228346e212,-2.6585122873201248e213,-2.453441510918015e213,3.5586723671417277e213,9.85970899833997e213,1.199206118435698e214,-1.8462005146967147e214,5.603151452711257e213,-4.3760503574852836e213,-3.3412163431009815e214,-1.0421688665679638e214,-3.440077189289294e214,2.6821509487563625e214,3.182845574864421e214,-4.472012855580927e214,2.1597647460993784e214,-4.654120548202822e214,-1.925340759991797e214,8.063592742600075e214,1.154529606287873e215,-3.718364051497373e214,-1.8459884906350877e215,3.465370353299281e214,-2.401865051611224e215,1.8544118077216206e215,2.2135555690486857e215,-4.418438646054508e214,4.3481125983688405e215,-5.0132769828973425e215,2.370042722354922e215,-2.778547853199329e215,3.725309317895562e215,5.793585847744623e215,3.7385480135027334e215,6.2189655395658115e215,1.2677585110141588e216,1.6594925060280714e216,1.3881724280020332e216,-1.3374136768267743e216,1.2582053201885975e216,-1.9937290150012392e216,1.947561773288418e216,-1.2436070883486557e216,2.3967135972905565e216,-3.28979296907247e215,3.571207578846165e216,-3.1736479754110756e216,7.710764261545536e215,1.4495414441897568e215,-8.89562041116334e216,-7.134634947787144e216,3.814974513498741e216,-1.4929556972879588e217,-3.9709314716109945e216,-2.0886089951440996e217,2.052050401872575e217,-4.2315971841722457e216,-1.7633763201642405e217,-3.321256718672309e215,2.2855661169881e217,2.8600838350942433e217,-2.0551234445386997e217,-4.0876597506651617e217,-5.34441224084367e216,-2.9326290704364305e217,-2.9268295625204404e217,1.6332935156866732e217,8.466190452858278e217,-9.804975576247576e217,-2.214679268630006e217,1.5347665434873792e217,-1.457250895068216e218,-1.2936390248788978e218,-1.555646054288672e218,3.1724872709214924e218,3.999225867750492e218,-2.9803429125841462e218,4.539973049190323e217,3.167616942779467e218,-3.91709787293003e218,5.939842992579928e218,-6.082956456942381e218,2.2698470610934773e218,1.131026670000834e219,-8.008728709504999e218,6.4122898931990476e218,-1.1910246345191752e219,-1.3797518968411365e219,2.427829679487852e219,3.3745960301627592e218,2.524991425473991e218,-2.2444402190471942e219,-2.7563007009104692e219,-5.16773771543158e219,-4.5974162905193195e219,-2.061203972128221e219,9.691151980059167e218,-2.894147628894169e219,6.67845903439298e219,1.8267342978573044e219,-5.861096938244372e219,1.1216614997297243e220,1.9536219271486162e218,1.0353380640877812e220,1.7117620088895448e220,2.6262724000448655e219,-1.6668869596949625e220,2.2420980498311259e220,2.259213733474052e220,2.966011006994059e220,2.725296188330447e220,-4.428494911059733e220,-5.794685041553999e220,-5.508380371338744e220,3.1346289410157336e220,-4.180383482229301e220,9.12007564565048e220,1.1217734967306472e221,4.0270689123756433e220,-2.0578813407419326e221,-2.159289334379384e221,1.947997473579632e221,-7.90309107976775e220,9.867874730242053e220,-4.316979527822153e221,5.0105754309883684e221,-5.809036522281141e221,-1.4037704715378096e220,-5.821845674621481e221,-2.9564403458408843e221,-4.969680182578781e221,-8.546004871707732e220,-1.3640685976834861e221,-9.652219899770561e221,1.2701608245323801e222,1.0268902798628864e222,7.1762215265769525e221,4.2419232334504306e221,-2.2044491820985677e222,1.1952256494818417e222,-4.168403530596584e222,-1.90035637366915e222,-5.526204171064436e222,-4.481835246953328e222,-5.637124225969876e222,6.132359202813272e222,-7.66539252312431e221,1.5737335198481876e222,-8.858096547955799e222,-1.7051402080607445e222,4.139971353897127e221,9.202930434545266e220,-1.377024121707891e223,1.9606915935357924e223,-1.1967379052707337e223,-1.7702152934457438e223,-3.568418144527549e222,3.0057199809001875e223,-4.246519813659981e223,6.988097333199741e222,3.1820586337204433e223,-3.105633588098851e223,1.1190359771436266e223,5.38504010770803e223,-4.3076388374762107e223,-4.5327646753098246e223,-5.751596451029964e223,-1.2956536850526156e224,8.050440998285702e223,7.846829245872054e223,9.87306392254267e221,1.867637681901765e224,-9.848583082279323e223,1.5178448775528538e224,7.479174392374332e223,-1.100526517601543e224,-1.5327864205002953e224,-4.461887743509869e224,1.4018612816757527e224,-8.94660977619579e224,-4.798332316463437e224,2.985139611189363e224,9.433885351432427e223,-7.986702333702934e224,1.6698657105822387e225,-1.7927459641967002e225,-7.896134715506133e224,2.2211328396522394e225,2.438976083311711e225,4.254046638996708e225,4.393357545501016e225,-1.7900267344978232e225,1.5197042238252768e225,-1.856444947728683e225,5.4639284087831795e225,3.363897233318004e225,1.5513655142123267e225,-1.1868733713236546e225,-3.728626649704979e225,2.528337961103206e225,1.86353154018272e225,4.430548337481358e225,5.1795042936702764e225,-2.2076083293057483e226,-3.07454850631728e226,-3.022556668027808e226,-1.1532434415781601e226,-2.568591733914815e226,-4.49025092978415e226,-4.3384104155813606e226,-2.9778383434227964e226,-6.896040412888866e226,6.398322321082315e226,-4.0334219066376316e226,1.3974385313134102e227,-1.081373747205535e227,1.8316088839734409e227,-1.008548828274776e227,1.7915034708514225e227,5.936529147262669e226,3.4881624940583203e227,-1.5536629357583804e227,4.727603318888471e227,5.435100376854966e227,-3.8211662779993e227,4.549568750692908e227,-6.432584507501803e227,9.564887980903034e227,7.056769373304867e227,1.1245053821847445e227,-1.4812568214045182e228,-1.1991798295712165e228,-1.4489066407607692e228,1.4817987211840133e228,-2.501186018446194e227,2.472886157636817e227,1.3370254664881304e228,1.2332865997888514e228,-2.2375715388367714e228,1.5535741472290696e228,5.486537229837539e228,-1.312154691097137e228,-3.597587014677449e227,-9.0386428657672e228,5.568304391510947e228,-4.050907019597741e228,2.912154423930358e228,9.584367101125001e228,-2.6182862360158978e228,6.101225932714713e228,1.5300980356503133e229,1.0819113059443841e229,-1.916961697401768e229,1.6956837747060347e229,-1.6157021397422128e228,-2.800662015666368e229,-2.2874625726825034e229,-2.8914798649333117e229,-5.777290373422982e228,5.244946808832996e229,-6.231129759912634e229,-6.000737833710007e229,2.1050846915755733e229,7.774078262950497e229,1.6015899985241054e230,1.322629799998174e230,2.1525566953070683e230,-1.0818430880521979e230,-5.229124253458236e229,2.4051669849096996e230,4.059875755469447e230,4.824835664480958e230,-4.3917721357237974e229,-4.67939751891751e230,1.1222705646844365e230,-4.557465095961072e230,5.8655097724321026e230,1.255729919540628e230,1.2848426067262418e231,1.4009470053575837e231,-2.9688197836722047e230,-1.5074790867686085e231,-4.976658512458051e229,4.04380946374992e229,-1.2135554254152896e231,2.5779264789707586e231,-3.6492451475112273e229,-4.8809138032691685e230,1.5784876617505262e230,-3.558453721769491e231,6.476221340390281e231,-1.559181963497882e231,8.078817223877029e231,2.0118535047726098e231,-8.353265398795607e231,-9.637960598813444e231,9.663882226234582e231,-8.867730133853903e231,-1.7049274385697662e232,1.412876204316551e232,-2.3910275875180324e232,1.0808482724577825e232,-2.165252161614714e232,4.629613315645432e232,-5.270076015387523e232,2.692396108277871e232,4.574173952697651e232,5.321728369782034e232,1.1084891138367315e231,6.731955509252484e232,-1.7380822018362103e232,1.6552261778622649e232,4.8162589032177916e232,1.68141023053815e233,2.000273659588686e233,-1.2981111296147018e233,-2.5617651565001324e233,4.051221908977547e232,-5.808767459550593e232,-1.2138171557045418e233,-1.5182853642806333e233,-3.7652332773500737e233,5.314082404301201e233,5.349367109419873e233,-6.077089743956264e233,-1.0082322364711313e234,-4.961945312983476e233,7.627886112146864e233,-7.213504353736688e233,1.2379128250402525e234,-1.443805051880768e234,-1.1238328250249287e234,1.8974790467626243e234,-2.9845543471473165e234,1.913102857297951e234,-9.43007330715789e233,4.1019586419781275e234,2.2685284715175784e234,4.082578096578064e234,-3.726502335366854e234,6.156103220279987e233,7.6617992667716e234,7.730172654175434e234,-4.357695358729103e233,6.451019967318458e234,-1.1143802738030913e235,-1.627511799712368e235,1.0700489441420421e235,-6.8577876323050515e233,-3.1565327925962553e235,4.052251954340346e234,-1.7150251174768074e235,2.755529277357322e235,-5.548944937486886e235,-4.5708964089578334e235,6.546028718826184e235,5.829477922662487e235,7.052225062249808e234,9.012259518803127e235,1.2482870769341348e236,4.084908920702036e235,-6.771166729013128e234,1.1999208292298784e236,-1.1164794051299412e236,1.950179672981904e236,-3.418712066344381e235,2.510017529361528e236,-2.5686910135134108e236,2.7865255162537495e236,-4.351046168246982e236,-2.3061762025727093e236,1.9881673406588838e236,-2.0003038374519543e236,6.536360277835444e236,2.4964799497877728e236,7.117131071935246e236,1.2367313338717509e237,-2.4646793217957835e236,5.424253298639201e236,5.889484167405275e236,-1.6509340966430594e237,-1.9555334486062476e236,1.1368565299646443e236,-2.9911445469501376e237,-3.6909106969954325e237,1.0811325991405814e237,-3.580091522802615e237,1.1947757849903567e236,-1.523643226313157e237,4.571355973214299e237,-4.904501477052203e237,3.519780336137115e237,1.226107662486682e238,1.0811063485520819e238,3.174780365858186e237,1.9058078935703114e238,1.7271126568898506e238,-1.2907146793150419e238,-1.2308595537070616e238,-2.881484667052626e238,1.8382141441557396e238,-4.150142431694181e238,-5.386171349300163e238,-6.271370634340585e238,7.448320863164423e238,-4.748959550569465e238,-7.004109520616542e238,6.95758000598932e238,-1.4501890058643384e238,9.367521593523441e238,-3.0408041067965153e237,-1.093754315453909e239,-2.2033175681840403e239,-2.243047432312177e238,7.980746558541595e238,5.363625526071523e238,-2.821180579705701e239,2.361421522692399e239,-1.0458867705516199e238,3.5292057931849655e239,1.4450941435828641e239,-1.0451754518334348e239,-8.340455201950316e239,8.762264957286738e239,9.316842813771575e239,-7.159248070317355e238,-8.224213487211738e239,8.917669199360403e239,-1.718450115886199e239,-2.2982732213292463e240,1.1707593442244818e240,9.91810298372701e239,3.888376059133689e240,3.413260497369521e240,2.252440212279462e240,5.7556698581289296e240,-3.9742773288021796e240,5.2037882901623715e240,-6.140078683272824e239,-9.076235496899506e240,8.96157382630086e240,1.459224142787268e241,8.267529167398495e240,-1.582909577439636e239,6.251831582506604e240,-6.983006366052447e240,2.693889606262703e241,-2.1655536809349605e241,2.2517600865315392e241,-2.5442008931540265e241,-5.0904460730538373e241,2.781483042873759e241,4.1367652844957054e241,-6.668847165656895e241,-1.060264631971999e241,-6.564240544796693e241,5.625465856649165e241,-1.1581130311119326e242,7.718231037512668e241,1.3401246876193131e242,1.733880036831755e241,-1.726287487736926e242,2.0733463832479652e242,1.6595370709486077e242,3.631625483392618e242,1.7993897214781539e242,-2.3084380032480194e240,-2.0451263801640327e242,-6.584347098608256e242,-6.365851187587067e242,-6.03545149534466e242,-6.631451360628395e242,5.6524591941238565e242,-7.215468105397628e242,1.5258052314084342e243,-1.019181585267344e242,-1.787123325520795e243,-1.5994837675856465e243,1.5671338449436464e243,1.7739962853055032e243,2.235518362238772e243,-3.008777968144982e243,-4.716358136884502e243,1.9512856754193323e243,-6.497082164920054e243,-5.377244459680049e243,3.5687955775984627e242,5.270051252469021e243,-3.791016383687403e243,8.687295604529655e243,-3.184477800637147e243,8.394877076282998e243,-1.8305208638600158e244,5.474747208661365e243,2.3838835925250872e243,1.5462736395603593e244,-9.014934425377465e243,-3.336759931921493e244,-3.876872847097271e244,-1.2871908680774584e244,2.8378805491383016e244,-6.140561699365771e243,-4.7565864627874145e244,8.910951414025606e244,-7.430679820787797e243,-3.3952657005645825e243,1.0473248080595334e245,-1.212656468762698e245,-1.5299553805164599e245,2.566615854244196e244,1.1492149468805977e245,2.933990239649999e245,-3.0230665302508515e245,-1.4975839729376083e245,4.352761828918352e245,1.6728285975895498e245,5.492111100661495e245,3.34709095918566e245,2.3771103709616013e245,-4.0816412914014673e245,-2.6647248979000407e245,7.976305627256914e245,6.411570847747023e245,1.2485528279887866e246,9.959327780133916e245,1.5139124279626563e246,2.4383274351067113e246,-1.0087350524804168e246,-1.8774066069689774e246,3.719002317384426e246,1.2033306170110573e246,-5.065814050777718e246,3.879609035109992e246,-3.4938261185326637e246,5.605127787548592e246,6.052998299026611e246,9.308878561772983e246,6.01262388747074e246,-6.120325788058425e246,2.421608256678391e246,1.2509497494951049e247,1.0865201558541948e246,-3.3579804224079567e246,2.613100778939277e247,-1.8574299835435856e246,2.903654026831467e247,-5.1166275977249465e246,-4.643516707416786e247,-3.8111517882199144e247,-5.16807045149037e247,-7.469959530713802e247,2.092735736704132e247,-9.742786907052653e247,-1.0109749604832168e248,2.2383696142235517e247,1.171254284710944e248,1.0193851053561396e248,-1.9525101426846165e248,2.1154615225167238e248,-2.1040895942077796e248,-1.0699175291018516e248,-2.9819363806027113e248,-2.758420838172704e248,-2.588893032261152e248,5.678988753111727e247,-2.3619866966747833e248,2.31305806028462e248,2.0463300307047287e248,8.746990343564618e247,2.8392089621458357e248,3.617342926188937e248,4.723423070265679e248,4.983467994331265e248,1.1319288675698637e248,-7.093986135530527e248,2.6116688722296047e249,-1.8582319708646503e249,-1.8968805334270553e249,-1.1893859568531537e249,-2.066221738563786e249,2.3708038750660893e249,2.368516289410135e249,-1.7438232201538774e249,-2.5998138086146868e249,8.353114249231864e249,2.444426970289818e249,9.52858811399125e249,1.9791793836292106e249,9.94862623682245e248,1.0396572330507089e250,-1.9823102034933394e250,1.0767263498849639e250,6.483937042794973e249,-2.964770491952211e250,-1.0893410770939324e250,-4.243884304807676e250,3.7189538559753396e250,-2.604159514001455e250,-3.12970188257947e250,1.2369908555074831e250,6.064420586786027e250,8.143959684831668e250,8.104756258045444e250,-3.140832535746364e250,-1.5008519461426998e251,1.455705633654086e251,1.0602886855769567e251,-1.9199399608164195e251,-9.685771980190915e250,-1.8312046217033738e251,-3.5759865197721124e251,5.5609206063340524e250,-3.3402442669135557e251,1.9313139137041205e251,-3.331248657784539e250,-4.452653683967331e251,4.160057449217124e251,8.357213208385349e251,-3.306221957885417e251,2.2747939694619853e251,-1.8016727074511964e251,5.155780697827414e251,1.939062441746483e252,1.0398660056061173e252,1.2015555427900697e252,-1.3078697148018843e252,-3.8707679253486317e251,2.0138547913378214e251,2.1024486280480654e252,8.357125539003812e251,-3.9223466173538516e252,-5.400973158832555e252,6.1599729803900655e252,-3.906933739147988e252,9.274499462290974e252,-1.045726344561561e253,4.433488641846871e252,-3.257930034240153e252,9.97239846640554e252,-1.930703518356666e253,2.4265272939516204e253,-1.898802875967607e253,-6.985996703798813e252,4.138807948496406e251,-3.712364997316101e253,-1.401127390351764e253,4.169191717019437e253,-2.937518980944012e252,6.419455135797923e251,1.7439605849191125e253,3.5731960166811896e253,-2.3399379408214533e253,4.745758133867968e252,-9.82879188958586e253,-9.636267742410744e253,1.7928452978878468e254,1.585475105187536e253,-7.939277199790653e253,1.556339863876063e254,-1.7854560913033626e253,-4.176818042960125e254,-4.529528824008952e254,5.589321279925575e254,9.296959028124589e252,5.12426337440807e254,9.269348060355864e253,9.502326114546367e254,-1.0254624243655456e255,3.845051471840984e254,-6.523710332759781e254,6.539195173574503e254,-1.540724716153286e255,1.814482789483687e255,9.051208184252547e253,1.0681641542395058e254,1.7737838136616194e255,-1.789966006018435e255,-2.7858143398213722e255,1.6182463876409038e255,-3.946559584314545e255,-1.230055309898503e255,6.610013204933561e255,3.5265211769391126e254,-3.0449786575161232e255,-5.8393999842394545e255,1.3329153501580116e256,1.4137570952677857e256,-6.609988069302809e255,-1.7382336694972333e256,-1.722102404633966e256,2.8469044060996706e256,-3.181604592278723e256,-3.049136331589586e256,-3.9706023424829573e256,-5.118447698198453e256,1.2848774684262198e256,-5.596383076653618e256,6.58424374703426e256,7.731955424245539e256,1.0544051370084499e256,-6.935751929563864e256,-9.504830636123379e256,1.6904659230335826e257,-7.217293939119535e256,-1.269573299337312e257,-4.757711469947762e256,-1.4278972817141647e256,1.801035610936509e257,1.0642274353825975e257,-4.0339689578419697e257,-2.400396648451064e257,-5.210044769549577e257,-4.8758761052775885e255,-2.209026105037081e257,-1.7324283851226662e257,-8.7030006414195e256,-4.930817118213661e257,7.151635666513927e257,3.982693381300792e257,1.8024392022568462e258,-8.993688394447226e257,2.036616755124061e258,-2.269563061836162e258,4.5465611623187453e256,1.1849796431898716e258,7.330768132101047e256,-1.0082868016592445e258,-4.823539515426001e258,6.68518951424911e258,-4.739102496807339e258,5.061740525621e258,-2.0134848876676565e258,-9.488149438954827e258,-1.4339559282833414e259,-9.188258992544716e258,1.4873089614081716e259,8.6809591103769e258,-6.7614622356088925e258,-7.154789275896752e258,6.430235381937258e258,1.989157453011368e258,-3.192434100046088e259,-3.981990639386185e259,2.0053249720135966e259,4.340426706308035e259,2.407480881619376e259,4.911178686064977e259,1.4849425625411372e259,-1.0532485627858963e260,8.684650888497666e259,-9.384272786093035e259,-1.037904178960708e260,-1.40186777616479e260,-1.3552466239274933e260,-5.653548247700825e259,-1.4607023100838617e260,2.554559607030938e260,-3.842754564584648e260,3.851933495825864e260,2.5790447928508823e260,-8.722324388827135e259,-1.5687777949640311e260,7.934768039644038e260,1.6250913586124957e260,6.933910292891964e260,-1.1708494403988593e261,-3.7389535219494447e260,-1.3561306530212242e261,-9.145425361746121e260,2.232882009334278e261,-1.529188760656699e261,-2.1195638325527846e261,-2.6508033812989098e261,1.1764838826818294e261,3.1273260711366125e261,-1.798218389338027e261,3.3331350314638834e261,-4.351506808493466e261,7.6580777727951525e261,-4.93316418500549e260,-8.547902897335382e261,5.414427181333339e261,-7.40374253235909e260,6.349881194545221e261,-8.204279972854527e260,1.3396517489644812e262,-3.1607114605436254e261,-2.960725642532934e262,4.5164094286517467e260,1.6788345225141505e262,1.7195853465958547e262,4.036508597237988e261,-3.640373766770554e262,3.046719291659438e261,-2.726435914523422e260,7.108247212312397e262,9.367768934865141e262,-2.162842766641308e262,-9.082885062164421e262,5.809303963146643e261,-1.5231401333772078e263,4.345297682369139e262,-1.487042455549595e263,1.2285710933287852e263,-2.1825070190147074e263,-1.2131870915578735e263,9.176405180853886e262,5.151514543059867e263,1.4610095440703148e263,-3.1829131363703853e263,-3.603541684812977e263,-1.1230595328141298e263,-5.827560844490734e263,-9.022124266844901e263,6.920507781684176e263,5.067590413119499e263,-1.0630322956230846e264,1.7423842583344877e264,-1.6703811216659683e263,6.197239693359505e263,-2.0741616582485574e264,3.5105499275094107e264,5.849527829169945e263,-3.0096251317924365e264,-6.643165607673478e263,-6.629204218757696e264,1.4968879860690997e264,-8.605917884362356e264,2.3251149517148043e264,9.886458792541379e264,5.584685506883069e264,-1.4206750940955589e265,1.4296320718366995e265,-2.053620814019289e265,-9.634432923137212e264,-2.0977556049845176e264,9.112406402472125e264,3.565336421803876e265,4.118416302687326e265,2.7387998562412527e265,4.2047860043720416e265,-5.881399944089414e265,5.695012378579509e265,1.6877903802794976e265,7.934618266110754e265,1.0508487907583919e266,6.897537239495198e265,-3.599859431010805e265,1.0348387111747402e266,1.474815754424344e266,5.614422607905126e265,4.660156389313977e265,1.8267886278912312e266,2.823858994640254e266,1.8538992845855643e266,1.1415167200240892e266,-2.1040121968938375e265,2.693891172594778e266,-5.325025518591794e266,-1.758974210441521e266,8.411323399094196e266,1.4482016372752505e266,-3.747636443019412e266,1.3756168749150678e267,-1.0953405375795378e267,1.7602828397309333e267,1.8767626430091792e267,-1.318729709069774e267,8.194523369472263e266,3.0826421751751406e267,3.3012331355170878e267,7.859514260592171e266,1.1346574450455543e266,4.2061728425738015e267,4.797150991200414e266,-1.7025189863544012e267,-5.3726036601312e267,5.71413675880372e267,9.272738428164614e267,4.322874499876299e266,3.530344261449806e267,1.3626869501879718e268,-5.96915511574822e267,3.0567473571548738e267,-2.6731906207499943e268,2.0969650339421304e268,1.9408031045714925e268,-1.9444061615675033e266,2.3564072245987407e268,1.7285896932374975e268,1.5558184741919062e268,-4.3641092443885056e268,1.913783994470079e268,1.1061458814995974e268,4.715380018953284e268,1.3416026443196836e269,6.813714293736937e268,-1.0777556762863544e269,-1.91609802697851e269,-1.7216943264498686e269,-2.135242070054426e269,9.63172862003594e268,6.846694662386706e268,-6.354392495768503e268,4.023525567134594e269,5.332803826484266e269,4.9361879740539376e269,5.218531461905726e269,7.244775123937316e269,-2.433790130845178e269,9.456617331900928e269,-1.1579638564748948e270,1.2038524006755563e270,-3.89837954569083e269,-3.0224612094737307e269,1.4131144912756857e270,6.970186205096089e269,-2.2593392744515224e270,1.7466377651367374e270,-2.1640315956210345e270,-2.8562019008176096e270,-2.328364005460939e270,-3.18486848060943e270,5.794520105810448e270,-5.900427840702706e270,6.57108988987902e270,-6.581575359818167e270,-9.920518304776372e270,-6.899308115580285e270,1.123028240079297e271,-1.3594896683723473e271,-1.4786204859720139e271,3.498801036031027e269,-1.3595130515235483e271,1.653146948684345e271,2.688276610920317e271,3.872544356544671e271,3.2869836237348576e271,2.2958341792347263e271,-4.716386002131305e271,-3.8520065511190194e271,-3.96706370766144e271,-4.150498041709014e271,6.202873253360665e269,1.1905295944605068e272,-1.1924897747591218e272,2.777936358564926e271,1.529066849826152e272,-1.7920911251877007e272,1.30351647773238e271,2.3626256916635284e272,6.0975359814409676e271,3.0760498399645096e270,1.144717079774276e272,1.92506636308014e272,6.535084470500345e272,-1.727321348433654e272,-8.10236872547982e272,-8.011734342098595e272,-2.9749117327609335e272,-3.998501491094915e272,-6.869080180432272e272,2.5858126933153847e272,-1.21372537547433e273,2.227124402316334e273,2.38974209402314e273,2.1691319157156056e273,-2.1747542473869325e273,2.2896136567302035e273,-9.103443129430806e272,-2.302793404359698e273,-1.739228455672951e273,-3.455310183887981e273,3.890547327500177e273,4.796352583073182e273,7.691701832608502e273,2.2298507942886707e273,9.46075528865986e273,1.1646398063872137e274,1.1518211053269988e272,-1.5567338504911206e274,-2.6500320303551726e274,3.056528159869745e274,-7.314083695239403e273,-3.9781449984689144e274,-3.909168704227516e274,-4.2135011324166925e274,5.5969188034046975e274,-3.8797097998692524e274,-8.325772093563523e273,-5.833530928840511e274,5.377441982427162e274,-4.49462870524334e274,-7.325694146370449e274,3.7806822560467e274,1.7450241959188108e275,-4.3152754114502435e273,-2.1406186480627838e275,-1.7856891356801994e275,3.389079379507361e275,3.057420651382793e275,-2.449353696632806e275,2.012936033524312e275,5.819506932344527e275,-6.285362994210871e275,1.6987491970131802e275,-6.433986753151061e275,5.001011802793623e275,-3.9902554388134455e275,8.984705671205337e275,-1.0705952148633509e276,1.4033623142051485e276,1.0399113146403742e276,-1.037122037525507e276,-2.792453976334987e276,-2.9223826359555675e276,3.214962795870846e276,3.701042638911033e276,-4.4213852285535216e276,1.1610826225023956e276,-3.760773599080732e275,1.785531124338962e276,3.5402301846322764e276,6.593276181952158e276,-9.73015620330978e276,-5.993953643461236e276,8.459999744298513e276,-1.6457029232027248e277,1.8696928818433185e277,2.535032468827595e276,-1.4762054833098271e277,1.7863385329358296e277,1.9587269840902282e277,-3.4332566766427464e277,2.1182020922810113e277,-3.95350210337375e277,-4.300731168378889e277,-7.472105950896249e277,-7.614015704027304e277,-7.030894245527143e277,6.09406197802543e277,3.647718818815484e277,-8.559053249761446e277,1.2099926855298574e278,-3.1794897541795917e276,1.6961614306483194e278,3.339711638331685e277,1.4352024353971566e278,-3.0625358858048193e277,1.6276100155121492e278,4.5175543060669655e278,-2.922105585360681e278,-2.9607864124435076e278,-3.512781525433232e278,7.078167342210009e278,-5.905509302966753e278,7.763087094216285e278,-8.250036795056505e278,-9.931604075188756e278,-1.3221583474953116e279,-1.9410505515147633e279,-2.144541275373069e279,-1.874270731444828e278,2.5603889982623063e279,-3.0690275726376647e279,-9.642588032426068e278,2.070874745803018e279,-4.5353076232256237e279,9.736941025188188e278,4.054282745887171e279,-1.8321797544085414e279,-5.445323106873965e279,-9.016990084879439e279,-1.0709178923672886e280,1.0226430478210802e280,-6.389809277683333e279,-1.3073995255152735e280,6.928342788627604e279,-1.4659752008147096e280,-1.276930566246946e280,1.1006588005499962e279,7.060891218195698e279,-2.781881225222339e280,-3.64172939399499e280,5.877936646434561e280,3.1892939490797386e280,8.358727969222567e279,5.37222355114412e280,1.0175393728882994e281,-1.448188544885867e280,-1.223765021874486e280,-1.307849792280757e281,-1.681621466847752e281,-1.952744206956852e281,-2.0179526623931578e281,-1.6452726361093437e280,2.7215061174305162e281,1.9038731696012947e281,-3.36006460532253e281,-8.193459730645571e280,4.112597764481278e281,2.4416289151480196e281,-6.449484813714746e281,5.500656301125446e281,9.037229980740147e281,3.219073081113811e280,-5.4424025207845095e281,4.178941024207341e281,-1.4083939434799387e282,-6.613097092472129e281,-1.3945020119664197e282,-2.34400928793714e282,9.919249850248636e281,1.0323180352910688e282,3.3491344208390453e282,1.8316683068409862e282,-3.419095322723118e281,-6.288152973118867e282,-6.121701511685665e282,8.587449984593687e282,-2.4606618376741023e282,3.619674585263389e282,-7.607925825968391e282,1.6119926534983157e282,-1.1427493668167595e283,1.3043648609405982e283,1.0923449455835835e283,1.9745544588489194e283,-2.686162007289156e283,3.3035921955211756e283,5.0550290166967776e281,-4.283154058970893e283,-8.085727651037199e282,2.0427864027325026e283,6.439290173080331e283,-5.123490941475743e283,5.942595812281367e283,-4.085515243175687e283,-8.303735016341571e283,-4.372655478724875e283,-6.186822722484858e283,-3.114436406320211e282,-1.1111626618100418e284,-2.118636756235969e284,-3.899726178995511e283,-4.43108910767715e283,-3.098891154746426e284,2.4211513779949334e284,-3.7056045205091064e284,5.7597834677607146e284,9.51799210117795e283,3.0904291906889714e284,6.339506573233395e284,-6.649761914735397e284,9.394188851360827e284,1.3731674064667204e285,-9.29182358819931e284,-1.2097510609577267e285,-1.2636007940610178e284,6.642531752566085e283,2.1217537044481256e285,-1.0676312037288479e284,2.2723092830815295e285,-2.8956371050657014e285,-3.5797763828116825e285,-4.225796223895121e285,-3.185063930163383e285,3.3121916628400054e285,-8.807657874136057e285,-3.800672491943897e284,-4.841110600062767e285,1.0291749983293597e286,1.4854328775097406e286,-5.5503597066163404e284,-1.698279812990863e286,-2.097437179948978e286,2.7707810926611384e286,-1.3280092739424982e286,-3.5494243193359306e286,-3.029803872731947e286,3.344461765397667e286,-5.144753839067041e286,2.9196088432804215e286,4.843920794712301e286,8.281831731025028e286,-5.209815452835128e286,-3.0265824767133577e285,9.183265977060541e286,8.468340358473006e286,1.7637602575858156e287,4.519825880101892e286,1.3321697617958802e287,9.95037078768273e286,-1.812918615004368e287,-2.6802893141899276e287,1.199874020524694e287,4.4545023331447224e287,2.8769878863809394e287,-5.001465144365674e287,5.9329064945550766e287,4.520540578057832e287,3.595613411781554e287,-1.060019581889625e288,-4.763781651827467e287,-4.410058544936169e286,-1.1560811798488966e287,1.4291923858450535e288,-8.75230850291628e287,3.420454974742404e287,1.2665041868033124e288,-2.0975400745558777e288,3.8437393002325106e288,-4.000784142219597e288,-5.28593754888769e288,1.1126665916609841e288,-1.5570512802999624e288,2.9066647751987596e288,1.7814875112810832e288,9.697543478663208e286,9.511148367993892e288,2.2876640831551066e288,-1.144014325157343e289,-9.077235756476232e288,1.3930229023620558e289,-1.5118665038200644e289,-1.7048619598098533e289,-1.2210094322311007e289,3.3634868437031743e288,-2.896526088840176e289,-3.8069468259444924e288,1.689496032130661e289,4.374995036809441e289,-7.0055516484140175e289,6.498761699725709e289,-2.075031889937921e289,-1.3436952827590648e289,-9.595394152166723e289,7.421575640637688e289,2.166923140075874e289,1.1066268713052021e290,2.159011390312799e290,1.4631263072102127e290,-2.4512886461549366e287,3.3357028949357676e289,6.006872386574524e289,-4.902869128651503e290,4.609802417068198e290,-1.4044824137758636e290,3.50800377046473e290,1.427680162735118e290,4.974790431089154e290,-9.541312996523199e290,3.88124051254904e290,-7.62581619732938e290,-7.348523320557792e290,-1.2450777051080424e291,-8.536736880836781e290,-2.3354502050134823e291,-8.057498295900932e290,1.324355885273953e290,-1.585339282331696e291,3.206049142628385e291,3.564722621559503e291,2.1908801906212729e291,-2.708118028368905e291,-1.9801834112648898e290,-7.585872180504787e291,-8.062485869563587e291,3.075853133596588e291,4.014943335150131e291,-1.6984215314300197e291,1.0897097702616632e291,9.07832788927391e291,-2.634980336505821e292,1.2560107854881387e292,1.460632972917899e291,-1.1435501135029604e292,-3.534877585220182e292,3.5835696823905327e292,2.687949179842485e290,-2.5673163842370037e292,-2.9252491144657503e292,5.340640813965769e291,6.3164732229720345e292,-6.717476396215373e292,2.4181274097966346e292,1.5478228637277462e293,3.6170104176898074e292,2.376062283373899e292,2.1463474675863382e293,2.729334551499553e293,-1.3826982449465335e293,-1.7145534455265456e293,4.088057961428972e293,4.467004262754591e293,3.851001579681001e293,-4.605214086367127e293,3.774405669325234e293,1.678156957686582e293,6.684755383388774e293,-1.0748399853841466e294,1.0445530826212124e294,6.639048188407774e292,9.149947147890008e293,-1.4653281326431617e294,-1.876642950435086e294,-4.4570551178277846e293,-3.258323597914147e294,-9.93057695213561e293,-1.7812855165390393e294,7.045669966877516e293,3.082941649476469e294,-1.2560757101792672e294,-2.3973796312744728e294,-4.656333133164859e294,7.506451377391445e294,-2.624655950948174e294,3.516310389521877e294,-5.740480347696959e294,-1.2256285547529565e294,8.049064919394355e294,-1.4158434005799556e295,1.5999384098045958e295,2.850046898526678e295,2.301310495187747e295,1.813722249353315e295,4.4069326875777515e295,2.475258450765767e295,1.9951411285774236e295,2.71041570412223e295,3.2688709711442187e295,-4.149229882055329e295,-5.507303808819686e295,4.25013614317525e295,5.459656035247276e295,-9.099692116296825e295,1.482132355096548e296,1.0749651625287102e296,1.7750698786581792e296,-1.7000182998935896e296,-5.453148152476007e295,3.623399250301369e296,2.3517416209451668e296,-1.1145057357958528e296,1.7711054946649693e296,-9.094622063468637e294,5.619328164772309e296,-7.084845816948905e296,1.8353509881590946e296,-7.474891020993448e296,-1.1320002036168141e297,-7.697543659738261e296,-1.145301897434576e297,1.4319100248641103e297,1.5854767809557547e297,-2.344121193608227e294,-3.02874808288955e297,1.3872514267194603e297,-5.528321226224885e296,-5.350575397794504e295,-9.971541152832153e296,7.750508126660115e296,-1.0412915749442522e297,3.0367565670759334e297,-8.846567329976731e297,4.797179156242302e297,7.747567871376366e296,8.256229762164853e297,-3.9764920313102927e297,-3.194702664686787e297,-2.5449716347332705e297,-2.3482633060644025e298,-1.9915275189620947e298,-1.4133645149426119e298,2.184130308654793e298,7.131998147791419e297,1.4074927534534403e298,4.614655740062032e298,-3.43724941157667e298,-7.106396476240421e298,7.256948780224531e298,1.790613061975138e298,-1.0639083908809016e299,-6.91032357913889e298,8.080190373829148e298,1.2438663920189998e299,2.2962595394668403e299,-2.0006928415284634e299,-1.5179303303134477e299,2.2260163014024306e299,8.999510974749957e298,3.145451499807316e299,3.921965951370684e299,-5.4629891258853076e299,-1.2270576816062365e298,-5.2385071669040735e299,3.1102856179264152e299,9.120870323253945e299,-1.2248536406585432e300,7.286140424871689e299,-1.0853462809028205e300,1.9549115369733402e300,1.8201909665217018e300,1.6959515650068464e299,1.4164484889940385e300,1.080894051188338e300,-3.5095765418198125e300,-3.019726716191098e300,-5.425078872451471e300,1.5583941287872844e300,4.9415776868739533e300,4.646540559976625e300,8.848238004405846e299,-1.7256094649586934e300,-4.099057879548884e300,-1.163095657536704e301,-1.6644738151346363e301,1.1858735174958861e301,8.307150968785738e300,-1.8617396428298607e301,2.234457112689423e301,9.058617008314078e300,2.2848491112538136e301,-6.83232766230885e300,3.752817374090768e301,5.247413146497488e301,-1.7728140518796942e301,8.155651375582986e300,-6.961763180159912e301,5.481447574060207e301,-5.346570036897364e301,1.1954065150223391e302,-8.59080897889152e301,1.6069187509715383e302,7.892966740895731e301,-1.5637105575327214e302,-8.200812009446239e301,3.0363403953068796e302,-3.4356900112187295e302,-2.3616252730798866e302,-1.9676702770096506e302,-4.2958930330731774e302,6.262188428335953e302,-1.0154919338052641e301,7.81036613340143e302,-3.2187856717828022e302,-5.7593182422466024e302,-1.1112950137805625e303,-1.2664507093317425e303,-1.4970580872084696e303,-8.742690249316593e302,-1.550757548612762e303,7.546583689068563e302,-1.6384632251776825e303,5.59991410387759e302,-2.4324853654448953e303,8.605842312658149e302,-1.9264415927954045e303,1.1974647324317199e303,-4.6411507252180405e303,1.3161264620597788e303,-5.995150874677658e303,-7.6615246887069e302,-8.430079912911765e303,1.0817876126257964e304,-2.4713864944289092e303,1.289066588247787e302,2.130148676614837e304,-1.2536702603615427e304,-1.0863287886578059e304,-4.2747660976393287e303,2.2022003369614244e303,1.0904869091348466e304,2.246751601033399e304,2.571509093890932e304,-6.426122612130403e304,4.173577144423321e304,6.946954999019936e304,6.493654890341454e304,-6.87369127419857e304,-6.215442729004629e304,-6.392054379472714e304,1.8873494664118634e305,1.70436971940643e305,2.124196066596639e305,-3.7935794142298514e304,-5.799987866773671e304,3.910932884927207e305,1.528844613886744e305,-6.466597426713753e303,6.580102775425682e304,-5.284120636890687e305,7.306857914615948e305,-5.358897335969811e305,-4.453194731858307e305,3.845178247975596e305,-2.7478012671940017e305,-3.7391396551506014e305,-1.2314241853517928e306,-1.4799514841975892e306,-2.1480184064961317e306,-5.5900232020323015e305,2.006408502595795e305,-1.1119495185989439e305,-1.8072696549696407e306,-2.2036621954355117e306,-1.6182671907806012e306,-3.873690713188376e306,7.588941363721279e306,1.8479456144032752e306,4.1875807509093857e306,6.337327128725486e306,-1.0876909337750737e307,-1.5590302230750874e307,1.2942730060347184e306,-8.824878718182417e306,7.580897561162124e306,1.8643738153929198e307,7.791606464377063e306,-1.0691084240713453e307,-1.9467034305679964e307,-1.656757436903511e307],"y":[0.42744070101843445,-0.4785522467779699,0.3363799665999172,0.08617974108861182,-0.13990916709340273,0.35027817879305534,-0.451453911728495,-0.3271256062888195,0.3383743584650214,0.2043795043415828,-0.0905136514607996,-0.0029798516747843173,-0.09813715676722579,-0.33630794954540133,-0.4518147615129058,-0.21282313864409685,0.01300292251118984,0.22043194886473527,-0.3977951126340644,-0.2078970932967661,-0.12639441229226134,0.3572469943025176,-0.09017484918912366,-0.06063227096783974,-0.16971436565269737,-0.20181597862542122,-0.19903854025789225,-0.3013332194859517,-0.38624018270916705,0.16710186155669482,0.4253743964314034,-0.05109809134952292,0.34922100195838834,-0.0642510118173425,0.28881252089689524,0.2678342073732387,-0.23100636333654068,-0.4383166754958032,0.4478326257699816,-0.3431505575454523,-0.07210359722979076,0.03740197498223874,0.3150160575817744,0.2832494124198519,-0.3651094360008129,0.24364238284787842,0.013807029039908825,0.3133908688862932,0.2076852149018802,0.43592795400427686,-0.055640933907730616,-0.2628240633443144,-0.4453946260975197,0.30465047098668396,-0.27576529742311284,0.4311935643134539,0.0022529265695052647,0.08666163013638872,0.009103237268175857,0.4624648369427713,0.11817173591433638,-0.09827070079274591,0.46435929890405925,0.09650357947892685,0.31493707438349516,0.15921961706700305,-0.31754942109150996,0.02358877128594128,0.28349576721061176,0.2760677460132195,0.17897056882532447,0.35789087776939765,-0.11210245755039794,0.3791416996491159,-0.3020957899695005,0.2961747253627329,0.08820770536165079,0.23233923886567465,0.010718536172003024,0.32264451547663375,-0.06190555475551718,0.0482645247615876,-0.4021243486347681,0.003740583550717602,0.40578296244651657,-0.3071542249056616,0.22847840061957658,0.23529164032568306,0.3143824956223089,-0.20947014801092712,0.25204095724227416,-0.06566345183777234,0.3957147664927063,0.14888092118545293,0.10663348255497596,0.2440112215772896,0.26157386049575426,-0.34075160383368086,0.44204965128392915,0.20198284465898086,-0.41990984293616007,0.06511321778168333,-0.33527157333251556,0.49102202997060695,0.4633323057483678,-0.4098193979632201,0.3779223693342866,-0.25025116640327627,-0.23284068506318034,-0.44386953049607425,0.08614719614476662,-0.06335693386309704,-0.0011104582366172622,0.05426396199569972,-0.01993608042132644,0.35366519692530574,-0.4120291167993102,0.20475548921236708,0.11190741365547363,0.014170090997064788,0.41191975013109383,0.011435175017482369,-0.2701841493580075,0.4357719542414824,0.22212585041806165,0.27291954170303456,0.07267374683671113,0.055832679645401395,-0.41867339889108224,0.1996541205787734,-0.27737731729694337,-0.11520994620171665,-0.33972571388265127,0.026951797589894744,0.3294496301253176,0.34659913628168226,-0.10458882969116678,0.29615259470647803,-0.40437847310864594,0.2283396853205446,0.42494269448728694,0.34170190345037765,-0.4948184416462271,0.048585970031227665,-0.30612178866821216,-0.25642012872923714,-0.14507019179505054,0.11564208454469393,0.20117593775433895,-0.2564373027023441,0.4641962291874344,0.17506208715232408,0.232425741670643,0.1902060733055837,-0.1274420394236464,-0.10006735623244079,0.29629666121942755,0.05714724318203612,0.3653798751844024,0.032599630864758256,0.36504248689208363,0.4198004853121444,0.16288797964447665,-0.28207910677273484,-0.3542160248036892,-0.3455237149298751,0.35432878959158387,0.0015663113478541213,-0.4917439978549496,-0.0800852476877092,-0.2659100242533534,0.3529836123744121,-0.22511599526449477,0.4412204071616621,-0.4225069756526878,-0.29475743131264487,-0.00836836735122426,-0.1906679710326138,0.048984984047536706,0.06525129496564275,0.2811219027584415,0.1745895464171905,-0.008320429687101782,-0.32182721348839904,-0.2500704204655122,0.449032470551185,0.07833829509059176,-0.11599972087212085,0.4315243981918615,-0.39705034649251547,-0.10675202261976979,0.14151111759799329,-0.34895229668811933,0.1728584794281578,0.45453454532216586,-0.4088372107315008,-0.23933974756030296,0.1585777432266755,-0.1991550479964872,-0.2812862106699574,-0.3550371879028129,-0.4558724533596805,-0.3735981304004834,0.3981953591990086,0.3418162981269042,-0.22873420699980085,-0.2954585784858721,-0.1581488334343779,0.032317016147522803,0.019625382215677334,0.07455728457843147,0.23809044623601894,-0.03445875644259089,0.07974467189246148,0.28868358495003,-0.15175175256044304,0.13786987131614747,-0.09594795429415459,0.22267059291884084,-0.4114147321868691,0.4682440545061497,0.18515575350884506,0.3909218249710009,-0.05455727786252873,-0.45695221920809415,-0.3164407582688238,0.24937960463773723,-0.2913893568594619,-0.05817205694156269,-0.3483043266242334,0.4302734947951796,-0.47214231423043485,-0.16966621378341618,-0.24337204228040998,0.47624191490730516,0.22308321994673141,-0.4157297902872008,0.07711142146471284,0.015795795635983323,-0.3552017580455713,0.04241067509619856,0.3256539454434013,-0.32751744934764093,0.27129235922429396,-0.47768126251198906,0.48817938947511297,-0.40175480596489854,-0.3285210111851289,0.3251558778970127,-0.49033976724561756,0.49161879366389494,-0.04755833187927716,0.38331717143349153,0.2905062149239823,-0.41301861390495187,0.399315240945187,0.2200873256586311,0.06374280814434408,-0.3222727718864715,0.406901652077021,0.30731073765375916,0.3056617508763315,0.06598517726387287,0.11256835442258484,-0.1705450227900429,-0.4842443432921595,-0.0035196104755319535,-0.10605922496544218,0.07306454997384515,0.046561529756312225,-0.2852406955806419,-0.2716114587351426,0.2602887047168081,0.07430528796097002,0.479225428423375,-0.4176001089578105,0.097225185951346,-0.008778578528129133,-0.24770763711176236,0.4974865629498171,0.2462326103431005,-0.0749922935203382,-0.4465906645364379,0.43433130574038725,-0.42076021296391186,-0.2263147541588275,-0.4904224898507117,-0.3222896343756727,0.39392406935322866,0.09322819723871101,0.20923068143414758,0.02676619482581688,0.27993168451943373,0.001162727653661877,-0.43541206022066126,-0.11530549707910742,0.02681978280709174,-0.17363180482833096,-0.2539035155613618,0.12365418612310664,-0.3152312384179572,-0.297051270423234,-0.0326618848777005,-0.29682794436311744,0.4208261686518653,-0.1258712244503304,0.34646292323599126,0.0960930847041721,-0.25298606925251743,0.09465287013901147,-0.3709127914103951,-0.014412793850973715,-0.35684850280880176,0.15097671861928919,-0.19078168335557089,-0.32145739233036874,-0.45837909840438984,-0.3234702711001849,-0.024116866027794392,-0.3347449666617157,-0.4096589003398239,0.2943278465763266,-0.09987217861873576,-0.33290821521086866,0.49484136186412586,-0.34842568032463994,0.13624804747972874,0.23811501096623267,-0.46402987841570775,-0.022875737849343825,-0.30653566062769366,-0.4488448250424657,0.4467889224318784,-0.07346952972744436,0.014053554504890098,0.1520349184283578,-0.42638913595068306,0.44432000759093215,-0.016369184983741514,-0.14115425041737084,-0.3296380526736342,-0.4430202051887564,0.4605729392038793,-0.11669349544605323,-0.11466973653023205,0.10694442306758245,-0.06529019708063344,-0.2868967956013633,0.3326225547670971,0.17905641080718926,-0.09733589511121155,0.10765445712546029,0.03921383527998179,-0.32112416007592093,0.005126768302094797,0.4848823732128249,-0.30485072522854795,-0.3734523002991641,-0.4305617899159564,-0.3881770572038328,0.20293236718782537,-0.3415671901540758,0.36836680827934654,0.4154389304548083,0.40390253570467816,0.31861197848455225,0.10636690970040275,-0.05345372250061775,0.406153968445536,0.17679296944328216,-0.1845405712520618,0.22980629146743414,0.3870648212409078,0.421271781038985,0.04842237394415161,-0.18560166487358476,0.04758578159366489,0.4776432092058813,-0.35187293803955466,0.3200580060948581,-0.4857757770782829,-0.01772802646702587,0.1386804400376236,0.15392049144806674,0.14824881601714268,-0.09141859421495813,-0.14919009711380204,-0.16063518649222686,-0.4666533791645655,0.46115992044458065,-0.4369934488114948,-0.19756811277791608,-0.4850135332453873,-0.307931925804809,-0.27583519451989535,0.23650142517948192,-0.1865676945963468,0.05323597806825098,0.2924095402577669,-0.1708802704282384,0.36548618821334844,-0.17608136409466324,0.08259017281132164,0.28576866052496985,-0.37342841139109395,-0.3580901039565656,-0.2034472349775731,0.12037298384356854,0.19822792163757907,0.14860061965423266,0.48856377103200566,0.05831667732259449,0.25525137417537214,0.08487367373203347,-0.09533544978486597,-0.09270973952595574,-0.03748560515947874,-0.49612646012664796,0.47402067589429664,-0.4171531146481722,0.021538595934616822,-0.4768793055990008,0.3280218651770288,0.3952487354481058,-0.357832429407676,-0.27997413039635344,-0.3591025456257888,0.18594003297854833,-0.36043597229493884,0.2752183182844532,-0.07008674204344145,0.14967034116871392,0.21316257910099456,0.2114301896760853,0.1336126358014924,0.2646059662628448,0.45440961094824606,0.4165518129768524,0.27512036610553237,0.18476386278929557,-0.13085118575760335,0.2053588764623786,0.3346681495261534,-0.16865004419337604,-0.3548130912887051,-0.3141392222873709,0.034708135361290804,-0.13836015447894945,-0.3267771916982649,-0.18905165822381842,0.44434528071294443,0.01991756453616511,-0.4642147713320355,0.3856037136116046,0.15431002901717994,-0.054231137242146676,-0.2500123263504539,-0.21724418992104333,-0.12046009511302258,0.004613868158004575,0.21383168861300828,-0.0678914341065342,-0.08088253618243302,-0.4359973117014053,-0.25811550691726537,-0.08885355915512427,0.052343555547114784,0.1922566283824083,-0.049878249303781264,-0.4859243421971371,0.1652668960222634,0.28921234113147065,0.4525502741755001,-0.2747720258680979,0.26652635487886656,0.17112564391298224,-0.19554475316703224,0.4877774945364346,-0.4809866131659908,-0.02789494014610372,0.04213370709002384,0.40409713269995917,-0.4798758975670665,-0.2984711282970558,0.44071334096852266,0.011022719204125231,0.33424897563496425,-0.003540713052634148,0.21026244649792325,0.3917851706369855,-0.11376399650265112,-0.4606591882206583,0.019258742569348453,-0.10118181197626952,0.4442465356260892,0.4266696016576832,0.48578908281127586,0.21743992277886082,0.3187096161812282,-0.48289729101424905,0.3080151826389932,-0.22210785172597824,0.14716977102586415,0.1695591747892633,-0.17759277715650712,0.3174929462336398,-0.3081647877360796,0.49233693924536515,-0.26356898991198063,-0.39566558818303244,0.17126354799199728,-0.19796254506887778,-0.2927841026765041,0.07558082212099015,0.35118078188952806,0.0025342380356963012,0.15599777022954808,0.13681773468381797,-0.06958115380022578,0.08225817164858262,-0.1975651850205815,-0.10826137346506637,0.038649590868981676,-0.024173902029490657,-0.14513888652067197,0.3017097353967946,0.0713137982451153,-0.17639331343869435,0.21438251931673147,0.44141560040652705,0.21493175676470444,0.14493687109565623,-0.08945578809676036,-0.3404771232673174,-0.023299565002405043,0.14273263292342642,0.37363128436273874,-0.46429306010681404,0.3779892890420544,0.13343793947618665,0.12761099090564088,-0.21971253089411502,0.07789289747368722,0.04306257604267705,0.13865747668857575,0.28582688177676996,-0.3949780657535855,-0.1373827804185319,-0.16928946867845962,0.12641991023230115,-0.2392588071494175,-0.19701537898378718,-0.2000392636140207,0.2937058404441566,-0.4619966870198202,-0.23637508905063198,-0.14842306458625742,-0.2936605396566936,-0.26388816275767035,0.407979363537222,-0.2072344567519202,0.34666276655255635,0.37773037468642756,-0.217601947816215,0.2230567982740015,-0.04311920493178989,-0.033628445183177647,0.3215967711886707,-0.1638971734661896,-0.38380504927931725,-0.17936598073322352,0.34083959901224503,0.4767369861016857,-0.25478366545584485,0.008716045402465511,0.20804075446124237,0.2812772172254916,0.3887911747328572,-0.11407285803302303,-0.44868812782430134,-0.251724718316932,0.2197569364118075,0.42134341806559394,0.4048039618975303,0.4608964433114209,-0.3386879626379873,-0.4754444859117184,0.2655493412951535,0.142563465704326,-0.34279711824262193,0.12124726835590072,0.4303878091107183,-0.3890849219014698,-0.46977472635521766,-0.22882446408368273,-0.44292307048082113,-0.3523258640770284,0.38296224829639214,0.06653748123672032,0.2829530999628167,-0.3798223388844557,-0.39548733533489977,0.4637949520958642,0.2981601674394714,-0.494772746748952,0.17405337822067612,0.42598303810223004,-0.19132529765628936,-0.3095161843110841,-0.2529802772999725,0.29173418929608985,0.13685606376793658,0.02586309425996114,-0.055483980235033314,-0.16035709742900295,0.11415587891773771,-0.2831115610828254,0.11882711908964638,0.056552121144241685,0.1645296001375074,0.18927663330961852,-0.2661512642012851,-0.03998282353721594,0.25448733612933916,0.2514355545065783,0.37666969517525484,-0.3825838632687337,0.3493485843943762,0.4735707221037784,0.19498539569971252,0.4650513356075341,-0.41605935792475335,-0.3164440643582149,-0.16520094412925168,0.43756653674766643,-0.27238772024397484,-0.1548554783300844,-0.016376789217122267,-0.26819506804490656,-0.1899652812533743,-0.0905855127729045,-0.2797488409966935,-0.21361529460158257,0.21810332595651016,0.4797143502375554,-0.07439528383747973,-0.3557180986335289,-0.1692502703000427,0.1503882785251247,-0.2413318230094914,-0.3984262713826965,0.15353171664258514,0.07028650949862891,0.09858394128371106,0.34795621054715853,0.33275891794115897,-0.38073710387830695,-0.49324829322441,0.13192064449820928,0.08328297216993352,0.38558460497835667,-0.464780988811879,-0.05610567583640336,-0.13119126664927894,-0.04435884505262511,0.3233308400359416,-0.2509655958467325,-0.3147161940541996,0.11032050264725757,-0.4123042960475656,-0.3331190779905593,-0.002636367713768406,-0.07275674584184877,0.035532058796367894,0.48165710443785725,-0.19483531714801772,-0.4920771530706467,-0.041229260549259905,0.4086293005541779,0.0013430628051049887,-0.17815998955151313,-0.34723070413001955,0.2137918711193303,0.49630769891772863,-0.418457160828273,-0.11601008532490331,0.48178374505357313,0.45144334450850887,0.3367530995741197,0.2860414667794504,0.12013683165938249,0.0019422332915948193,-0.15558623224588652,-0.41935014017268357,-0.15076890982483104,-0.32688925262764323,-0.3037070229309484,-0.42151312650290174,0.4570732953900387,-0.43319010374698297,0.3897555376380697,-0.0030362583008027855,0.29151704298782666,-0.3659726255180673,-0.18582377539860517,-0.34017748807947723,0.2395569332771217,0.33488536728278784,0.03212408988212467,0.4064543935514797,0.3445346314122604,0.4883512697040129,-0.20972692888222633,-0.16264780100484422,0.33034286782602673,-0.4956682517182709,0.12372533281348552,-0.32592164070069196,0.467590884018134,0.00248737820488798,0.22527232122939989,-0.21006558597906588,-0.3054509866570574,0.09032655280584634,-0.09836668123106374,-0.15848477745670442,0.04223863433728359,0.38237753348894765,-0.2876355535006647,-0.13313194947396134,0.022287957682094017,0.46879203921779267,0.2372110123121558,-0.19509978264260552,-0.4048338352246619,0.14290267936240109,0.13260469466147318,0.0314923679123611,0.30150280579105804,-0.1276031748424331,-0.3388249760545725,-0.10570568064532426,0.13048317498428363,0.08568667704566435,0.14510080075709153,0.36283979543637535,-0.16423705507256736,-0.3900007009045481,0.4572951436323114,0.0876892962238851,-0.3285506114110952,0.11826600102862783,-0.47205176634690305,0.09414132860301283,-0.234954033537063,0.37847836492305675,0.2828698969586336,-0.10700505978338293,0.09765622738330171,0.3365169951203246,-0.24319805102987457,0.08479231410864974,-0.4277485071221858,0.1866997219836195,-0.4687028156144841,0.1339362012902363,-0.1239366614069668,-0.46791720472970466,-0.2822273061975076,0.2863409937936381,0.2861279136865269,-0.22423698301495043,0.21694073836393524,-0.10095048006803942,-0.3533500985442919,-0.4746755310113351,0.476661444443224,0.05449553974943355,0.40617458596777833,0.3645058663659686,0.053616928501253325,0.11570727926741387,0.28848385208739846,0.09589952231858101,0.44483615871826787,0.16637250905544398,-0.29212871907140614,-0.3166079723839983,-0.19258145197514698,-0.38477774511556073,0.2521602167454202,-0.4261501991427279,0.14516822085899506,0.2532347481955215,0.06676557499479396,0.03824122451430867,-0.39443757297372617,-0.387678930104999,0.06897730951660241,0.4794813053745808,0.13369542080431418,0.2788830164723419,0.49358692736993004,0.1216133284409906,-0.3352931151339704,0.04199666312794359,0.17510389483900846,0.45830615751153525,0.2516338650993153,0.4682299029560457,-0.053250141946048046,0.24374947928400514,-0.47855463286335764,-0.1439894987095245,0.40738191448478434,-0.04861936730295535,0.04304366955146577,0.2758068049777147,0.01120521358960569,0.4780703348843707,0.1671793941633486,-0.32108062390411196,0.35636427579223495,-0.3673116145906936,-0.008904277509162783,0.2620404816309154,0.168504909535238,0.24478008149116026,-0.06818678088530117,-0.0474066957239907,-0.20927793852389454,-0.11701169640684395,-0.2557881249976295,-0.4440691767272773,-0.14834623408128733,0.21348591977931375,-0.07163138235957023,-0.35785964821556315,0.30121315872758925,0.2967316499764414,-0.4655038207241218,0.1483919901594053,0.10944280783929328,0.1890490533216742,-0.3884644045588379,0.37082062614405586,0.20192609434655817,-0.22059380477346346,-0.07437410139454226,0.39059682365695836,0.39561542718246323,0.05422607865610507,0.32886302961556413,0.16098596379358354,-0.15610369439788818,0.3609940650490977,-0.39745065018488357,-0.36103965558309126,0.44947605799171253,0.15097493369999726,-0.3740578075014087,-0.31779677169719345,-0.4099918175669779,-0.050548638125039735,0.1049310659066367,-0.3175771302797181,0.2607425059899138,0.40719469486593773,0.32072901049081715,0.11508987902162193,0.008051092398888349,0.33050346269509356,-0.11901721495030904,-0.23389482496989888,0.340836619007546,0.04900448673800861,-0.2619809903425243,-0.2210947539488981,-0.29989733072720415,-0.3163431613518015,-0.02573544271505157,0.2836084079088854,0.3622365033458401,0.07297736871315408,0.4204319119720341,-0.3227345651522484,-0.13520811225907226,-0.2866911847438436,0.1811232480703362,-0.17850247846475842,-0.2236133014544912,-0.21335933809718188,-0.26243705821528795,0.25005474715432663,0.20249925157752746,-0.33707890678334307,0.2874814125777909,-0.3916975208824518,-0.003109621257155304,-0.07341900870331197,-0.4277140028178372,-0.2103560986957791,-0.06345044018503132,0.10399759645774354,-0.36524847003391114,0.3278928971014665,-0.4831050494567801,0.4491358985824727,0.3656815282346213,0.006352652822290805,-0.35799442275785376,0.20342147177876613,-0.004003838989227182,-0.20987572769393692,-0.13003780271386445,0.29957869015629845,0.29929650891783743,0.12863106600499719,0.046029245680651254,0.04736968861961666,-0.049170071666353454,0.26777368801427714,0.24477934364336984,-0.33650957950654603,0.136196877584992,0.15989603421367993,-0.0857509106118215,-0.426274216403159,-0.29755167708010744,0.15273014824591846,-0.23554309117031202,0.226423718556221,0.09228209427374146,0.26573149201043234,-0.16857069554686288,0.35534760343726557,-0.15435648548313585,0.42332389723551334,0.4752975964943229,0.1965430599776694,-0.2961331383657402,0.43200121195278784,-0.040289993797637536,-0.23691011922271588,0.12807676054715356,-0.2055115332761719,0.49726991149349486,0.2591408831776867,-0.33760844108240673,0.28739781999585023,0.30011014410222336,0.46764589276498403,-0.3970866581125492,0.3038773483964765,0.1736813500417438,-0.08388380716064026,0.1741005253714163,0.3518476584311909,0.21734325411971023,-0.03891997460066854,0.4717360182920185,0.18292574592563127,-0.4859446642816754,0.20235253877293946,-0.11688719818276105,-0.4091759916393598,0.38509258686246195,-0.25076038310276516,-0.10294118596565838,-0.35522132691308395,-0.030895111462490688,0.07606979219569499,-0.08921302700193579,-0.21279473217328082,-0.26182639420233356,-0.43683665543394135,-0.11288166035712965,-0.4618057175788757,-0.12043000219029065,-0.03323680378356242,-0.4638723863080383,-0.2190161047737056,0.16116696365336436,0.35937319169576787,0.4871475819957858,-0.4195238968688595,-0.003207044726480923,0.20837189070619333,-0.19804149760906897,-0.32646309376126603,0.03503420955777137,0.12143479149970382,-0.11477997045845867,0.23624504101458754,-0.08064491077654345,-0.4771551254799038,-0.31310278961011373,0.461532244868623,-0.2959942505705111,-0.30160030264396953,-0.11777592935513059,-0.31412283651361506,0.27166391298020187,0.36080825247584136,-0.21705490123706395,0.3161520258383925,0.2764294460019521,-0.09115424991851762,0.06563996862150234,0.1590959958630831,0.2766882197479117,-0.20918662780261976,-0.3406226771583414,-0.06743935995921735,-0.35031543884382144,-0.2140938691176555,-0.42822130159113714,0.16190183341527842,0.31191656095990106,0.24863697689495723,0.20520736893281666,-0.06125101511704445,0.4377318965226109,-0.45746370318392726,-0.16025359978579745,-0.45240546172159957,-0.2916245315951742,-0.07775338661186226,0.22166031891621385,-0.18821544257821432,-0.3077042668752006,-0.27107786402968537,-0.19031381290192861,0.3615489528519693,-0.41496278842472134,-0.006522265886325984,0.12014836680696384,0.1390137150645161,-0.31665163075050007,0.3573074456289691,0.46081738111923887,-0.20662160998554868,-0.021751207343596146,0.4001574381092432,0.43674256401041567,-0.22047772148548028,-0.03200232029790184,0.014070018293425246,0.4987418093596028,-0.34569246327949865,0.1701700172884002,-0.035955541119673695,0.12221078944984498,-0.48471772365112487,-0.2809455664761471,-0.012202031896932697,0.4611691264356297,0.3647907539136266,-0.3757024872635608,-0.2610810141102913,-0.11244561076809334,0.13088464305375158,-0.19384097820472168,-0.0024567014913432494,-0.23808861078380072,-0.14347026097262705,-0.4068255045654079,-0.4874703182621307,0.24045851919831573,-0.1676477974373487,-0.3835812241546692,0.39875325384316374,0.49809474444494484,0.4720637860942538,-0.2808649247449144,-0.38584429629582595,0.003755489795784328,-0.4190834680618445,0.05824706317059669,0.4614067556404011,-0.3594544459365854,-0.17947218789030805,-0.30855652734172256,0.47438916272114695,0.4286799849231504,0.16166345359401824,-0.1956139434375057,0.23570015306141867,0.12264479434050357,-0.3571670903431565,0.05931359928438207,0.47004100781475144,0.46960232841742666,0.41169600398881645,0.4277098329583089,0.3614336975301755,-0.2606018801881904,0.03213528966748469,-0.3721571721394712,-0.4591763858897453,-0.49367292240862803,0.09314048196524571,-0.4394876680143467,0.21704435051396676,0.3574521353602562,-0.12370096981099099,-0.06640995231501368,-0.022672015908142606,-0.4552496581273344,0.2805936047810489,-0.08548510502505646,-0.09167480187004307,0.4393371163315387,0.28381574445114377,0.12273780793962885,-0.46737870660045844,0.29813364800359987,0.4082097372702198,-0.03386560352721735,-0.15966404506357423,-0.2712631475745253,-0.4159263168622336,0.19843262726429423,0.4858659952875459,-0.1150166738129188,-0.11269797160517525,0.05749941123455837,-0.3130494324804569,0.13901952575033727,-0.4584555549026408,-0.4819802438518146,-0.44023713094925787,0.1043848260365352,-0.2963097850733756,0.3039574306427737,0.356543350098695,0.11585222365339432,-0.18232496388964536,-0.12793035154919408,-0.3366525555936297,-0.29741407835515044,-0.4440205186309696,-0.09143964976977537,-0.3492557737482995,0.3476970629684413,-0.37077727780494896,-0.29925539428987347,-0.44913285021224536,-0.18883769955607566,0.15432964805006955,-0.24705428536791696,0.45848512466081903,0.22120665584457755,-0.44716651216148406,-0.35726435867943174,0.22620525558517368,0.3573129120025298,0.4976931158382041,0.25168584044864084,0.06996872097635376,-0.4476275499757172,0.10609266386872007,-0.4603888319016476,0.46190461188358145,-0.48460563591040606,-0.16794933269734935,-0.24113173254750886,-0.43676459750303875,-0.2074599817247902,-0.19147360077124076,-0.2894379977563202,-0.3267553636511846,0.2468316024859034,-0.1443922680415708,-0.15895082478833888,-0.4700701461890575,0.004629603711049812,0.15801256562952104,0.25904516210630013,-0.00760092999617501,-0.3351911194830508,0.1269451204658607,0.04051886153848616,-0.17537710058629652,-0.4604320044619006,-0.3205016576960149,-0.057072715100776605,-0.17896810094707805,-0.20823548534153824,0.039164652951897194,-0.33234932858993016,0.22740124203513878,0.1380338954367586,0.41029119832555083,0.4824855186280548,-0.46779713353715,0.15234941730058416,-0.42811640418854857,0.06544655344199768,0.12444154582306144,-0.27607450561008173,0.3269788070754176,-0.09809607011781885,-0.45206539367327037,0.4147416856279056,-0.185986578682247,-0.13611873491083548,-0.40791972700076373,0.16496109502969736,-0.16912347930892957,-0.307348435283906,-0.4672273708545538,0.08244241206127323,0.2568547050416443,0.04411832708417318,-0.379539806391032,0.48865019654328945,-0.49381859907573356,0.025219327105745704,0.26445296037272636,-0.280387036685507,-0.12133561514720892,-0.0948875697124485,0.19000510757053624,-0.2977613581543861,-0.41444183513905397,-0.38441501993843996,-0.09109981378213705,-0.18635703132735548,-0.2540825943458327,-0.29487391791938133,0.11207848792800279,-0.10900329819622767,-0.25758945947178313,0.3272687437465571,-0.31927909566577006,-0.3635865952157298,-0.24186283023277877,-0.21177692803701476,0.12105179191018767,0.36555289352362297,0.3667970501897093,0.13579389012544474,0.14170385913652517,0.03603204785304093,-0.16588083568390033,-0.2979243943180139,0.0752878188533117,0.3472966971550908,0.2903206209195661,0.3510466097431022,-0.2606168991967388,0.3876802071824865,0.3803113900108275,0.49477242373694863,-0.10396808461656937,-0.13526018326796807,0.056909069276838364,-0.08242438861418311,0.04790850942594149,-0.084990212253224,0.022513152604040076,0.30612305122410666,-0.045701637944050466,0.17253370569431214,0.022691597540539288,-0.03304976351042255,0.45750667004273016,0.4504876583513142,0.09979131543318931,0.18146292548332954,0.07307918582578843,0.4338767236382812,0.02175994114927593,-0.026657296976712264,0.1764673768630265,0.4587535592045586,0.16094558830861105,-0.3371924548176044,-0.4410146615114072,0.04651223797591997,0.08140563745908636,-0.43661352742060777,0.44591575952229334,0.3219278989973451,-0.07374101630968433,0.33005861756773136,0.3218381391307512,-0.02972084776642392,-0.19936460283497137,0.3630683378812407,-0.4379201822708807,-0.12481398894473705,-0.3684688253007353,-0.25157721526423704,0.04096957364344611,-0.4338702998417612,0.4441241956347213,0.23566526689402467,0.27074140607976727,-0.46637086848173803,-0.05239672422572661,-0.32352653407023624,-0.2215982877870455,0.2932315745405618,0.0754947572785527,-0.2578310422536534,0.009835087717639635,-0.30622803515522024,0.4733655113912978,0.09059296669851169,0.270337388496944,-0.2597030924204937,-0.3097498284713991,0.4768820805446483,0.25133824536115745,0.03664737842174515,0.22569101975629535,0.18902854806722402,-0.3011659071682309,-0.33164879520613777,0.301893704984852,0.11463629900090155,0.04574896581447829,0.4723119816957242,0.46772304239417184,0.4436105136995363,0.3280431512185378,-0.12410893840214765,-0.06344253197609095,-0.3517797757215928,-0.3921102284340352,-0.41086341220151645,-0.20201283017472393,0.42224860925678365,-0.37749101683273856,0.3698881757504693,-0.416234592564237,-0.2645640101767639,0.043940141401648036,0.44059226385783123,-0.35397071925385126,0.03171526573993555,-0.10257679512756579,0.11377792562578382,0.19244250094323756,0.40078993131464347,-0.21718172750735487,-0.023318218573574967,0.0931736535166332,0.27562755288622975,-0.04372702807190243,-0.25925461235094316,-0.11506772794365583,-0.27757510392799056,0.3144508819229137,0.4618230384374118,-0.05446351938803362,0.18935031174887018,-0.39339606488573664,-0.16956287753529065,-0.12310510709021583,-0.4448562446604567,0.0698653858032805,-0.26655884708015054,0.1183707618515446,0.49228794030608536,-0.24777773780822865,0.16665800416091514,0.04461745730791433,-0.11985365405133508,-0.05968370239845133,0.0834961777841059,0.48490714083891384,0.39463103892999385,-0.49940978054558816,-0.18700351486282663,-0.2868029989809815,-0.41903798073818943,-0.14670508320366427,0.18093342577499327,-0.0995924603883458,-0.3540411633921321,-0.17099668327862294,-0.20695342535381167,-0.49205423859321606,-0.18301674599501405,-0.2538197818318231,-0.32517841856578045,0.12793569557604778,-0.2649922957702051,0.1830566873003865,0.3372826639813118,0.11293206037899894,0.43912150571261455,0.03835069452866313,0.11284420367667769,-0.16083340385416123,0.41996296344446304,0.08896960260986764,-0.4935174166471441,-0.12006376143370545,0.00554552645678652,0.28343528267081086,-0.36519320628609053,-0.26243631606068774,-0.2440400077213869,-0.33476860084095517,-0.39248165589225614,-0.25684720930988436,-0.41172323039619707,0.2096405326491606,-0.3537902183642656,-0.4525306669351976,0.08573039995012133,-0.486690366388552,0.14675803598148907,-0.42594881494165726,0.3525079493343153,0.13499873217547154,-0.2963986456701013,-0.2555773065914986,-0.39113713876145173,-0.09755673432409284,0.03308044942263444,-0.09439769280697963,0.06766284168055381,-0.27102305033971974,-0.46631019570596255,-0.22625239509968664,-0.41607412233189867,0.4647749764382427,0.28098868308855995,-0.2858638467379402,0.02765665389460903,-0.37168309927505994,0.1618804523476638,0.4734904393803179,-0.22117396827638647,0.0033884430750394934,-0.4008005444903404,0.11435710816182065,-0.433224680557873,0.4654422220041772,0.47119125732601486,0.39977929213122176,0.04480032442407267,0.3627961800144197,0.260179449380161,0.12326187904648944,-0.3190065655795902,-0.025685296529056822,-0.3679719202612426,-0.08142746205102203,-0.23272370856012659,-0.4475057609295261,0.400991605787113,-0.27407368400595167,0.038362492675976245,-0.15824415642545975,0.04521803178834616,-0.22771891062524796,0.3039140748750766,0.09237540754127971,-0.16757923077411085,-0.12059359707474804,0.044834904834747835,-0.06437564976867338,-0.39423412969582716,0.4189400243034238,0.18410099444866224,0.4770586845935194,-0.2738026075125466,-0.37290174274317867,-0.3266815912344072,0.4997346772821478,0.32642329856333085,-0.20768663094462858,-0.21028718424202397,0.3291868377089304,0.38120418015520596,0.178695835633508,-0.1215548394254955,-0.1496287263573226,0.10530070890653542,-0.24838252149385665,-0.368459812745753,0.4505266781961961,-0.215672189908648,-0.3124242195529394,-0.13022187256287698,0.16293396078649525,-0.41608155680683057,-0.0635308385146729,0.48406759198991467,-0.18898390960038336,0.4406186891683561,-0.21450859464285532,0.09799706370371153,-0.008131054314825636,-0.00944808144467868,-0.36849343361370557,-0.3339943506920282,0.1302577274771728,0.07216171304325103,-0.49665234974718686,-0.07796752451753686,-0.37894204070356774,0.31904662722440924,-0.39373570660455615,0.4661371063464135,0.177994768353813,-0.4288955629744764,-0.17375191679583368,0.4113417054997892,0.4791468552126481,0.2732688605403837,-0.2872984140230894,0.4177861657801458,-0.031422001283865963,-0.02427950462660622,-0.10349566642250352,-0.041668275753765416,-0.49607211533177953,-0.4441989581165944,-0.23081240305697093,-0.48960224405929464,-0.046150156765199624,0.2868106903692247,-0.2919792225747657,0.25521635333079495,-0.26778566935862647,0.4777667081813348,0.04197703258014651,-0.14339313716611835,0.4820813567559925,-0.28545765512811627,0.023238825889865256,0.06836540611094022,0.4839747893579742,0.35446700667815323,-0.4161294312615531,0.1702892465334802,-0.4878603205762182,-0.11366269829563125,-0.36300829432175563,-0.4209512782210987,0.315403037090503,-0.14593437810227106,-0.13825251430205276,0.3531525805879554,-0.08531466758145112,-0.09633512457492377,-0.21071715980297068,-0.4281233651145344,-0.484640843863154,-0.17513966016571092,-0.09263467880881104,-0.43068747552272324,0.04684215706515271,0.136429089318296,0.47720010259754564,-0.14215006501224958,0.34558110456100155,0.24939527739570955,-0.1410629378411825,0.06858744604252398,0.02446797087416086,-0.45667420856132046,-0.44390160925929334,0.02000658849199044,-0.2815544153260432,0.3278045309073341,0.09159634866559707,-0.45897518006311144,0.28732775417303213,-0.19579792323881873,0.16628189415598071,-0.12687512627268238,-0.49599329696715566,0.2618615914903146,-0.0783895882091894,0.44893107765469686,-0.33384943007960644,-0.23824320060007387,0.42146482528073737,0.47635238943702585,0.24586153770166308,0.1627457939132433,0.4005936262778671,0.17488278531048018,-0.4193463319937649,-0.3920651317369237,-0.11493567323059861,-0.455880353670598,0.15578246095705195,-0.039836518040330615,0.014511330149911794,-0.372478216628515,-0.0329674816015284,-0.4280135972210135,0.002118153759935515,0.36987331966389436,0.05982055360919558,-0.019839676742888335,-0.3396952851826429,0.4465933027221305,0.3779966869527427,0.4276597624364624,-0.20804128839396663,-0.39485926723508746,-0.15306841402435767,-0.4338002468681583,-0.185178481418262,-0.23998757958068584,-0.354619177782012,0.08426500203732834,-0.24854894282724027,-0.04213576042354239,-0.36282166171959873,0.2664851402247148,-0.20834848728791244,0.4061792553894692,0.0561142786554818,-0.34268193541932956,0.25934374790358006,-0.1700891918252645,0.20792194847556078,-0.41378932036836336,-0.2092182592455778,-0.4478604103320958,-0.28359564038433627,0.011900575729239415,-0.061311008791329114,-0.22200488119678075,0.036743162195441714,-0.1404432190689624,0.057688260257652724,-0.23820132389221094,-0.36248873433513085,-0.19686574400679313,-0.2038449920627805,0.29594760588420677,-0.25092708789438833,-0.1244413369696491,-0.03510261573688678,-0.21385142950042524,-0.3105649838527458,-0.3034969397140279,-0.1530469157037524,-0.37592050289199386,-0.21173886970980682,-0.045239107647028876,0.05109123207170008,-0.03770661007357079,-0.1838519693716958,-0.060838527178911805,0.2662102859535824,0.05600551696622724,-0.177381654630558,-0.11327612423408762,0.3412802996141808,0.045311766913158635,-0.35983183520505624,-0.09418690205520108,-0.14062150496278591,-0.3526445518239403,0.0938102538944694,-0.39793046522910447,-0.03520388407874386,-0.14336702013154246,-0.015984602643441148,0.10689903338156159,0.3208622003262349,0.19499588229350517,0.23294368112156416,0.3374487071250689,-0.19672379253718675,0.2596772759826207,0.47238348150326037,0.3600539844674209,-0.4587843857322518,-0.2656109663733708,0.44647279089944236,-0.2871017470631707,-0.41706504599872307,0.4904523884386067,-0.020349943087786926,0.1915136116153746,0.3502341112905616,0.18301898808287476,0.03644271096262819,0.020977822619445474,-0.14465622947756818,-0.010794011618681765,-0.2331048816276715,-0.1820070309590096,-0.1863055849142945,0.18653963891120462,0.029297641184157897,-0.4604134633607615,-0.3502217707293258,0.22724408575705812,0.1473039952127817,-0.0966705391045859,0.47078673534662485,-0.40370297405867617,-0.3671042563202722,0.27096178123660764,-0.4706310715411719,0.014401705051361846,0.36953755959921075,-0.39385265570227834,0.22095256995495482,-0.12196228978041623,-0.029763954732188402,-0.2438585569363585,-0.46319263260800825,-0.08369133970155884,-0.47292401668166106,-0.04740223660698217,0.4617423182615752,-0.008870564890555599,0.09373560182494978,-0.1680855210961092,0.3734616588899866,0.4864795457086699,0.18805011394944238,0.29551993303329915,-0.019532250470155832,-0.4411232059948158,0.02210518211271517,-0.4115162828358445,0.35784128537674276,-0.2443170881974015,-0.4398921542346843,0.37896113205774973,-0.3151755808473591,-0.4253564490189805,0.4016037591328028,-0.3352958558352266,-0.2804106058895759,-0.014633568748463555,-0.02788522689042372,-0.3968725648255229,0.35247478825971834,-0.2803391838286533,-0.4673081863338855,0.46433428872632,-0.17957362921200892,0.08185904422735213,-0.2429392651615918,-0.2243174019078369,-0.38581651637946424,-0.06526434783349178,0.14994697821710679,-0.0373153591659503,0.05595552905991941,0.11953352612171564,-0.29509416739508354,-0.2724585752091344,-0.13115771002509735,0.4839266303468339,0.399583168358272,0.32715064309927055,-0.25464428549494444,-0.4613565613693382,0.4602532667724937,0.1409734233870641,0.30288706314487523,0.0541932027544465,-0.44221891958219195,-0.0514393565015816,0.2899610427349597,-0.45098464556704765,-0.06717945651240176,-0.42991890203215744,0.37468730151358387,0.057549157167940734,-0.4018198656038994,0.07208525979194191,0.17459577429552642,-0.05171873774416169,0.150440657212765,0.33655765502200774,-0.2667344804788834,0.0656301308601297,0.30219611560250725,-0.057208599995094866,-0.2326599835867933,-0.31968648358739915,-0.35192312222139166,-0.4487243729762751,0.025149899039837775,0.4663293361255163,0.3639410785489001,0.25254202314199525,-0.07609763395645586,-0.4036768737954448,-0.03887264465837603,0.04246414258404907,-0.05403585930990995,0.37148016525838323,0.1424602548435865,0.40761158900721073,0.07041302852937936,-0.43421199456865933,-0.46368363448123673,-0.1820353701594255,0.38817081628145345,-0.37751127807595863,0.10413594043205232,-0.006024203471117984,-0.04091378652847144,-0.06819292543664845,-0.25631380151055705,0.04902251032860194,-0.49752146112619067,-0.2664960220880044,-0.36579941489266465,-0.18802303549632993,0.15849712795245807,0.13149529396004556,0.0844797765406593,0.498858813806218,0.25010379324834764,-0.3018715768152369,0.2806822375337832,-0.41410059104874386,0.164790234293273,-0.4313160625826369,-0.1377844727918407,0.4900154727627495,0.2433742146290634,0.406238652695766,0.11785770523085248,0.37043201131949965,-0.1543180114284004,0.0631275255691297,0.15631980648012478,-0.46810491525288644,0.4081116119026038,-0.2879258769076729,0.35440809923453664,0.297239828070458,0.25730243574631917,0.06064181925537304,0.18807776845047774,0.41156565827068414,-0.4820615146890883,0.32830783062143,-0.23012385785235656,0.21332007677222786,-0.004993624557628307,-0.36392845871306423,-0.06667939539852541,-0.049941645955760006,-0.22432659150356882,0.07114790776662927,-0.26057398128523723,-0.3822664549667436,-0.2860378218081181,0.44744154352285337,-0.22486397983592754,0.045721162422213135,-0.17333243209111227,-0.2266909402533086,0.3887259119284361,-0.16869107746116918,0.01926527135927425,0.4273785093024245,-0.17999134904122216,0.3496430685432852,-0.4027727398008143,0.3616370117215826,-0.4924900381968318,-0.05361029509149762,0.06647610186120878,-0.06638999031166226,0.19588990935260542,0.44191420818242855,0.22060983533195722,-0.13520348363798007,0.41702152359512734,0.3483741797012154,0.3553160462127547,-0.008266410928480461,0.2290840312760063,-0.26714244034767076,0.22090563532801988,0.18952090277710343,0.02742041136383455,0.18316904208609053,0.0016003624903473401,0.317122072601838,-0.4939817619942415,-0.22164568656953065,-0.2661422534344233,-0.35332925877859855,0.4151167078925062,0.014999884582111989,0.15312471906269165,-0.030639613887982087,-0.20236998330475076,-0.03368407699988296,0.18025804063124884,-0.3078215594393967,-0.1841302101718889,0.34390396063567685,0.2815922977897991,0.37738865057006876,0.3221849590933763,0.46675452912948323,0.49899745785985683,0.11944055332954262,-0.27359258691540433,0.49712175859214236,-0.1490757751009093,0.49671268899894305,0.20961154398336257,0.06895813960437347,0.27547632012821377,-0.0682679692110284,0.1449057970626788,-0.2934753764656779,-0.3102253428106345,-0.22743897171339977,0.2841941333982305,-0.049814300632117,0.21829222484124777,-0.2799424249027076,-0.09194236227141683,-0.15469524668660073,-0.47392946277929804,-0.4537661507794515,0.029738790747370514,-0.127400478221799,-0.3124390318412147,0.27253879025504135,-0.19508706412655696,-0.26742488749523585,-0.15068268811422425,-0.015066375188332204,0.009936155762320542,0.21232900522201348,-0.3658669373763239,0.39430853356403217,-0.21445310340039136,0.2698107531515792,0.15899015061898192,0.18015171695065124,-0.2375158508259958,0.15199712896015716,0.3454063769098521,-0.32828002655336364,-0.023187192363101516,0.28487763833012636,-0.42363142391381414,-0.30609753321097655,0.3282899214398278,0.47477239065265975,-0.4575235458365925,-0.04828884786421561,0.2690667950330994,0.03959625304405834,0.24705048972781407,0.026717056548978713,0.026139461674482778,-0.37670505938218257,0.38775868062522534,0.22989530867610974,0.3279056004629861,0.23767079729952045,-0.16256577351623802,0.238833485082649,-0.1272935657736296,-0.23382743846763532,0.28996469224238597,-0.3381913863441741,0.38218282187235686,0.02400107619614067,0.1960004743503998,-0.30163225892509815,0.18208238105930086,-0.4349510238018295,0.23741229902567995,-0.49321094255383224,-0.3964060632651487,0.38183347452915317,0.49924765201790366,-0.15474618823847464,0.3162356921509335,-0.161147636492311,0.4410058497626481,-0.3106324301874843,-0.046032870393637015,-0.10734749019608847,-0.3799003712031588,-0.4854114568484367,0.36337609535786064,-0.3695208202244671,-0.18664859150026314,-0.405130526052464,-0.372589029416845,-0.2604139634994813,-0.4386001504124555,-0.36519288334171796,-0.19819245315828016,-0.00943217690642828,0.4836914749655259,-0.20174202035356958,-0.03860204688021507,0.17095979342280976,-0.42802625514399883,-0.46155069071839794,-0.4652703446306654,0.25035934277863325,-0.39590737763024064,-0.3306471841248504,-0.4377132980035203,-0.15644223940408963,0.06269682006509014,-0.4132495223019508,-0.4114655569448522,0.18148309354092462,0.41049867574824583,-0.2225301378499258,-0.03628959509106422,-0.22660907075802705,0.46582162643423897,-0.2119439817300166,0.2281800354102208,0.12277433333950305,-0.4383908111836603,0.48033790976035307,-0.17738281656470978,-0.025825049556877255,-0.0831157399636131,0.0741129942630041,0.42271724798970145,-0.41805172214660913,0.20617089548869716,0.07520392798268327,0.46744707037379096,-0.10563541170491475,-0.11616543136111712,0.4339924271939213,-0.2927727080428497,0.11471716053101222,0.3831595298112598,0.1604185994859182,-0.042063774308578106,-0.3791974130799418,0.36157902426569666,0.3986825939468157,0.19241497269086416,-0.28019966157873477,-0.3291414761852649,-0.2699067590350672,-0.47159949327497164,0.4912264754202318,-0.1010176900624633,-0.09518112110489119,0.09273848117850347,-0.42048166598424386,-0.13834109977907683,0.37370099041257343,-0.2505622904548708,0.16464624201769262,0.3168488132816196,0.4312940052923706,-0.08183935668320896,-0.45896910206742336,-0.23102571000591543,-0.03919986244168183,-0.1955008886971401,-0.23369382799579808,0.3286094928718337,0.14791267211819714,-0.03540601036862001,0.499121465555183,-0.42580840639605455,-0.09844673987263164,0.10381048180579766,0.4231651969736234,-0.3580307575254269,0.38895751785142063,-0.14948735389369983,0.02944806401342337,-0.15233737595077668,-0.4446754978664431,-0.005219201314805355,-0.13691385012269164,-0.3677908738315645,-0.44461686254928656,-0.34138937722877416,-0.00481223572369438,0.04361987315026483,-0.2098236673428917,0.08027346831872695,0.31851402020089914,0.2679305422243452,-0.4261522050446873,-0.20163756437118496,-0.3167308502502324,-0.48021154362293794,-0.044077893515175326,0.38035939500510185,-0.41057299399953795,0.4150039167987223,-0.21455681280114147,-0.13702362559083414,-0.0793595591028522,0.4738009787042381,-0.09202808021766029,0.4483798637765022,0.43766792505605334,0.3918012863600697,-0.08420571418892031,0.10921323458924537,-0.12232580558302208,-0.3419128028791627,-0.04651192904258994,0.08168954722093691,-0.24410331213142533,0.15704415711587538,-0.17056322160414883,-0.41602773152701666,-0.33510725657845586,-0.07710700453683916,0.451511662357716,0.059004975950908145,0.22961505104266267,-0.41787370603968954,-0.2890302629135133,0.06780882428561097,0.002273501566607994,0.4188468087735129,0.05243171548652281,-0.4267590789938094,0.2577863110035812,0.1156620469114158,-0.016498069641052604,0.3739853783022322,0.008464018076327129,0.29699941888328274,0.243499324857948,-0.12011333857985118,0.3596244961258832,-0.41057287982657864,-0.2695106815212336,0.21248219820333758,0.426272062935215,-0.21081267049730457,-0.3953727207648221,-0.24037170990520718,-0.33212889940093837,0.36330792450596117,0.2119724934293452,-0.36143203913206223,-0.07842211364834517,-0.28154190290305725,-0.017934289255956415,0.31497321543505974,0.3994599065532487,0.025311060399317853,0.08923563141633761,0.47614562163033214,-0.43425193496059933,-0.3931801384358513,-0.481135948507337,0.3094898549757281,-0.10514061729485569,-0.3339534752458335,-0.11403902583606063,-0.4790735572426681,0.0552963649208178,0.28077209929182745,-0.45859333366041266,-0.029798105702332656,0.49799340622886645,-0.2163688777424646,0.1991442721330432,-0.33569446948552994,-0.19626281011011693,0.1541539636643754,-0.061537603353124304,-0.2958185667562039,-0.15009744903062283,-0.22538338432966198,-0.2622898681787067,-0.30779800627886966,-0.4742875330331884,0.25350195482608795,-0.4520787126411756,0.16636846827992735,-0.2354140481993694,0.04384964326895835,-0.2415101726097677,0.45417136968933947,0.26193286870988275,-0.05602581087202374,0.18275050375442392,-0.4418700144331169,0.2838217453116667,0.249906525488524,-0.010577954424180858,0.1969924357679791,0.1401691687850508,-0.46176884573184807,-0.0964663336162539,0.2072480900199849,0.11205906223160378,0.4030539365083252,0.2948745716099255,0.25111393209927235,0.29340916655447136,-0.046234881375074144,-0.34104251656620765,0.3488473239688299,0.2108113616791556,0.02741689336872155,0.3677929740797772,-0.12422316550402157,-0.19369485927100372,-0.2552283137883944,-0.07025280576184545,0.46410012182840665,-0.12797222631528937,-0.4680567845963788,-0.23278467522717783,-0.1798498965831079,0.45933262022437993,0.03540350376930723,-0.4675860908498035,0.43905879136543446,-0.4189063217863649,-0.15164066802276888,-0.29877377654616866,-0.10379837993648788,-0.1824549225349139,0.0430479973713207,0.2202814520280747,-0.30757176486537974,-0.009187571925927118,0.16235428949432373,0.35466473602807613,0.044501046814948486,0.09810171618820918,0.07766759142229107,0.3838643397592736,0.41193099776000897,-0.19820531562926225,-0.12565848291465564,0.0515031290575223,0.18363740737253087,-0.04420579078405096,-0.39263660578110926,-0.40811245622115666,0.47130703221479053,0.2677325092811298,-0.03770965565553763,0.09692091709634698,0.48178814243793777,0.24430493071647996,0.2603843444929941,0.31466861675836677,-0.3680369294516377,0.14238407464226288,-0.10261114126954696,-0.22678855364252493,-0.3827406866386389,-0.11890070562367483,-0.4621341639632113,-0.4726929243700009,-0.3978567198130605,-0.2745318779711228,-0.011775200895695725,0.10997946827353977,-0.09949551598437267,0.15146541269971436,0.25858339270943653,-0.42987215150979563,-0.2893538024190254,0.3825434816945035,-0.32763786445561793,-0.020990787375876785,0.49954408057451083,0.37452880757212736,-0.03691402769027574,-0.4207224492807049,0.062311947056049144,0.27046417458366623,0.41301692285429925,-0.06539316806395634,0.09698642741071506,-0.42840510909613316,-0.2002830202249597,0.028712266849477697,0.268191624285657,0.15567964778690468,0.06854151426170052,-0.1795765670052789,-0.2969165909119542,-0.42092008903554934,-0.10869240450812345,-0.11991859552333706,-0.0352892301517016,0.24694264024290358,0.37373768367936133,0.48124053792625343,-0.3554660183080083,0.05447540901343406,-0.1336261240338037,0.43652368997696644,0.059207348240984725,-0.29555021029520145,-0.380064358758442,0.060115495399095886,-0.3900390332241084,0.37824726238398276,-0.12709853258958326,-0.2780748420936239,0.24604851418449636,0.2575499700177275,-0.3931841655831543,0.3661491598208253,-0.43711019652313476,-0.18877133541573854,0.4607092214962041,-0.37756815312129244,0.012420423339967845,-0.09976741099419106,0.22245116257028852,-0.4944220412070086,0.013608961415091603,0.07173610489946713,-0.18727812129716148,-0.4650053800371341,0.009533082891342026,-0.2442853836495107,0.38536465419943333,0.22698469459963788,-0.2809911139128298,-0.38045355522783497,-0.09460343047390474,0.2369400244464861,-0.0005643617925084055,-0.47651576814715035,0.28660106587280243,-0.30229117014152873,0.06682408391140693,0.37670855371859124,0.2327398276476731,0.27794445963651704,-0.24447218320208108,0.4577722527393264,0.4864735280579784,-0.4563790224796098,-0.21243255055793075,0.31150433185211557,-0.4485167461460229,0.35032627586690657,0.4075622660367615,-0.49167729981707153,0.13889183028194352,-0.2647689508157165,-0.294661279235658,-0.26262582248458033,0.27726310990542324,0.07770326140804706,-0.31832684249210264,0.3670011972717191,-0.3316407750495285,0.23086801377024213,0.320691429436861,0.01467519216659774,-0.026401909990634742,0.4577956258687286,0.2938125338430626,-0.3217406220170842,-0.22502767679276015,-0.11937132517478899,0.47455567738816873,0.0024613410398908186,0.2231874720970921,0.34384314561944507,-0.4923932710976757,0.021886848046755336,-0.05632117783682222,0.2620997938201346,-0.014391054177200102,0.34334701100057163,0.06782526568685232,-0.1586604711693409,-0.1282343185239061,0.19892987574067367,-0.4695167758175336,0.32649585185367314,-0.03714717796286693,-0.4163931578529976,-0.26627409732187446,-0.3232552563294342,-0.3631445256385639,0.42499538000681647,-0.3397734284439238,-0.43011868958613286,0.08671008179200879,0.19634857339281542,0.45442918288832024,-0.47703902008647203,0.4774918436457507,0.4164988280558872,0.1947914290696946,0.319399211226576,0.21230766918710642,-0.07659494589829507,0.49725780180278556,-0.401397693509167,-0.1338437912724042,-0.46289148651023404,-0.1520136716593532,0.0024715338687333333,-0.14849691117313824,-0.15780564572720923,0.4742588062211699,-0.37326690030207565,0.048969176484643384,0.05186535771603751,-0.06743284636006597,-0.4106519365246468,0.2461247467950054,-0.07775195367073762,0.3735183404298301,-0.24637491777892162,-0.12097460219195377,-0.35256087152656024,-0.46652362358274435,0.2444928010490952,0.3524808202228591,-0.3506424012808229,0.3080189985484223,0.3979462069494881,-0.11659565358507251,0.4652934767730834,-0.34487165307598877,-0.35203584340628513,0.4005747150013157,0.17022193861043156,0.27186654189879755,-0.06946122592085424,-0.005426757732182708,0.3215658832454569,0.10121274561693672,-0.1996807496760118,-0.36266664624815803,0.4813433638322093,-0.18557683955330817,0.477489651609853,0.2610566955967071,0.40914008858356454,0.25938430692027103,-0.08405770975692195,0.022422354204583383,0.17882708755273202,0.19384173753523903,0.18376391106759904,0.10212600063296073,0.10359390835670323,0.0019857819321233983,0.34572416337106415,0.31125723200047783,-0.1998426830726192,-0.06427900830194955,0.49156064489487705,0.27190289479644214,0.1590324300353292,0.01159326827046181,-0.41393192309209326,0.3524095695031173,-0.19896097744788044,-0.24266414898811184,0.23161318059336455,0.050670154139358825,0.0208775539044308,-0.3457072517924329,0.01015336197229555,0.38501972987765654,0.020450062699723714,-0.14942977037464833,0.26594439091717526,0.4954299442467962,-0.30465221275204835,0.4657112911904302,0.15439631736179082,-0.21895118917851053,0.09245633607161552,0.46906894962396395,0.36221901156867475,-0.24617403390742387,0.39640400234238893,0.40490067921385076,-0.24938639648923133,-0.31667167090165016,0.10699039735667282,-0.09139647829854147,0.02237348925712257,0.34671011154182874,0.1473465391209008,-0.3922605222682689,-0.27277199917405204,0.37181089442994675,-0.47130798335604873,-0.4058706002884842,-0.06356502744185799,0.4808195170899816,0.4351116224199041,0.05448356997753678,-0.2809315690384533,-0.11775098144335638,0.43448148491660143,-0.002078280488941653,0.22349562716427518,0.131285935565985,0.40407500423099374,-0.33734324263549054,-0.06267447451620112,-0.26579463014569504,-0.08449185558528205,0.2505558021667731,0.036354785539290946,0.08462098023534947,-0.29809492870843424,0.11415121549018248,-0.06707899731531008,0.4208001542915931,-0.36184760032983965,-0.49498912408285456,-0.10247348018263036,-0.4781681952716901,0.30741669171656216,-0.1510261421993715,-0.23024135273060753,0.0658571691257166,-0.3141891226279281,-0.1488076254251356,-0.07357576123301435,-0.38503147584922215,-0.23592171164770948,-0.07676950171177199,-0.016974528026665547,-0.09257715882188466,-0.29566836479807557,0.288800930587386,0.0826315785109939,-0.05860121971268617,-0.4129234624605356,-0.03758663454985389,0.41858689814215144,0.4112228727227001,-0.2816026627591439,-0.44716663055821204,0.053279616737385016,0.32713524275136585,0.10223345620516078,0.0325979837533561,-0.47550598362984986,-0.09849949642372424,0.09173644216498755,0.46109515708260296,0.13366824351870066,0.34532989653003,0.04310582272864538,-0.4957952797573155,-0.049743551371272954,0.44692624140365766,-0.1394481776166112,-0.15110538375236127,-0.20409995414621096,-0.3932142833596157,0.45542357608876727,0.03989831213099637,-0.47927222470513153,-0.06222230954542396,0.30039257622293514,-0.20944982462492945,0.43779153551203076,-0.007964565048672378,0.3532400477147273,0.304040333847414,-0.18990156148115034,0.18957259768405987,-0.48951523294950205,0.1631261477817625,-0.20801754946124196,0.11056670933860002,-0.1743411016554599,0.04487452539594239,0.07570355242177662,0.2990216239006085,-0.4939366145928328,0.29024294216089275,-0.48175204246289005,0.04475710721108106,0.0799674201993057,0.0029676325602818743,0.16198955291156092,0.07740233454613765,0.4577876138668915,-0.0309407847890788,0.45216581431806646,-0.4547584863849661,-0.17697795077100253,-0.4434476390625184,0.29121586414258105,0.20936970208235306,0.12488821400096906,-0.04211353984715749,0.3720041326619379,0.337640191582091,0.24916732817149434,-0.15856875280628713,-0.278580143679817,-0.43195323382383366,-0.07802879089793135,0.3704993188100194,0.46235128077501386,-0.05629989152154491,0.1301738146078204,-0.3464965852348494,0.08873471239278441,-0.25152192886872093,-0.4569901787770039,-0.26689444104894267,0.08732891860668213,-0.02365799969908,0.19798567031596748,0.21887131131351745,0.017418699515130198,0.33715650260495633,0.46430273630568575,-0.04363691108851708,-0.1344860193573465,0.45786038711091037,0.4347229671922508,-0.19870521183702738,-0.0698175582832079,-0.14995913278296258,0.370493102642103,-0.08012293380214963,0.44011311664703023,0.18516839451452594,0.288739251033199,-0.09142313808359348,-0.4623091483488886,-0.43103017517879594,0.4801612949742655,0.24617361733175458,-0.3111325732693526,0.47987664048789513,-0.12468866092245112,0.26055648927835273,0.1395871851049968,-0.10796403541422239,-0.05820607210231388,0.2717727503878664,0.47884714281201446,-0.30408323200899545,-0.018260542746383113,0.2404909449781767,0.42362897147858813,-0.08873347165925871,-0.02190743442900156,0.2904365083945113,0.2333112654088325,0.3233340725563112,-0.33173236690447716,0.46562087677415853,-0.4383265788901738,-0.08647103759089325,-0.036633487898623196,0.34645530734763574,-0.467169328650765,-0.07921886583092386,0.24938694948932993,0.4049383353947562,0.4798085423744851,-0.3491592399796135,0.4096005697241336,0.15594084033673927,0.17806550237823426,0.3763124136314495,-0.2561982120265227,-0.2674075440643391,0.46467005163697106,-0.38523518016156943,0.4981485476373202,0.4182442591136457,-0.07883171030280312,-0.47838143080299456,-0.19496832792395025,0.39885990915613223,0.3791933283724902,-0.3760521926800513,0.29263093571484844,-0.23386754987524183,0.06231282802159388,0.2986542893904107,0.2892305610727177,-0.2235570797773372,0.06922522821598465,0.11383716270322064,-0.4745600031805659,0.04011439817163032,-0.17544074718928182,0.4280690261879452,-0.3674914819305348,-0.4620327852322277,0.29145417443679067,0.43755924186688633,0.18760760695807321,0.06644355798605517,-0.3438443321176212,-0.031702865491842314,0.04016490817460272,-0.39117246973684994,0.026152965346108115,0.3441881462132079,0.19694439112246842,-0.22020915270931285,-0.0979225999718909,-0.21055816461144694,0.032694762056820315,-0.33248961219182926,0.3213882686233911,-0.4111274539899685,-0.02494315217130083,-0.019086657233948312,-0.015068281440098419,-0.4033562640188566,0.06678830039236483,0.20034205488574752,0.36840464838640585,-0.39570467926256203,-0.46985459110802275,-0.34124289474653713,-0.09405307921698691,-0.18054122277164297,-0.44881667887278365,0.10959022853788425,0.35180994136070787,0.1252423840248149,-0.3015575094284786,-0.4831898428963586,-0.13040775540987526,-0.38615134661220996,-0.49165611024691525,0.20137940126630416,-0.16068413145233684,-0.18099199406273225,0.3184259737312902,-0.47791006118261325,-0.30749771507647194,-0.20879869790721783,0.07356608912236595,-0.15780889828558808,0.03167057202514556,0.4140390046550768,-0.10542248963974732,0.37279565184836394,0.3996209428223316,-0.3055115151261134,-0.3147257232103151,0.3798915347360696,-0.08993331247978253,0.1743699466449189,0.10140970123517845,0.3813323635394785,0.12281845356160326,-0.025082520021259214,0.03344087145835073,0.025219250876366228,-0.48584010637858044,0.023702737584102573,0.0577009854411894,-0.29390945873660246,-0.06401191142547247,-0.28041991927062093,0.2924685223728194,-0.4956585365717763,-0.4780221156051425,0.2157419915500467,-0.24561285566896274,-0.2180833478120996,0.16532050076491256,-0.20787112076300596,-0.3681259254359184,0.3926811676902975,-0.16997719998510608,-0.11504425568222243,0.17586241475608877,-0.2856223689594437,-0.33234807428856894,0.23011497686833282,0.23189257153176057,-0.3632251250061638,-0.16159967313908097,-0.051117813624537156,0.32005501623346144,-0.06857694512145862,-0.429516046022018,0.0575540448894889,0.06712805296933788,0.07021400274040723,-0.1670658611578668,0.006151901086619782,-0.3463239983230939,0.32523916723264157,0.052888918106706484,0.131853036746701,0.15180356014901308,-0.3745330398352349,0.15754151252108528,-0.280110735732525,0.06178578694772163,-0.4068977506138012,-0.04689519924932961,-0.11352037681290561,0.09432258507668756,0.4131839251353051,-0.3232580365137685,0.13242742525149076,0.11409654671310387,-0.13454701809943082,-0.22884639388159678,-0.27803243979994896,-0.41555012109844736,-0.12040265360209124,0.21793519084300095,-0.053750252524362274,-0.2924817035495275,0.3408245098069247,-0.044833333934438446,0.013507916615004056,0.13664946481086782,-0.2370912134076495,0.1389494008687664,-0.12759158096101375,0.1049425748197177,-0.42130100055988606,0.45763804478156356,-0.46244312592280146,-0.028186226338450915,0.27902074311155944,-0.24039720981101387,0.12630541293741793,0.0707898759476524,-0.4613310996917759,-0.30279801175949306,0.1658116043120228,0.1115627450495309,-0.13869643474603244,0.3036411030886059,0.025490157931814306,0.07248828041378808,0.33045379421901844,-0.4450214266592598,0.2573625809379847,0.001963766106313214,-0.020911002394853773,0.4309009696273687,0.14293019756093694,0.2334018498832202,-0.07978488576610454,0.0584814609502895,0.2651706597480197,-0.21728167097326123,0.3952984916367053,0.33670873628150266,-0.34210999673585607,-0.48405100931977985,0.4048829607356974,-0.2879299638912518,-0.24423965253011093,0.26212563652015053,-0.16068880183570022,-0.4326010729131573,0.12569084647974815,0.019693843929026178,0.4776519107042907,-0.41057011038841673,-0.23178377494511992,0.10735524624858117,-0.2693674294134867,-0.42923171493691004,-0.08808591984303416,-0.1348654185054663,0.3761216746098559,0.29706534861393896,-0.37414371359013177,0.1458533522670329,-0.18701243097262732,0.09608506064376887,0.4088195696826009,-0.2149450020271133,-0.28943738851700873,-0.1802313617631095,0.2844678967071115,0.2854841461123867,-0.35398401811377256,0.07649397379593825,-0.010167572282271387,0.4530759617757065,-0.1476195223186274,-0.30233208526411737,-0.16855947737664478,0.42310969371232576,0.45740538175312184,-0.12381123855178133,0.3533029190474013,-0.09843034768523151,0.3123309806960515,0.49451866036507464,0.022450412523104868,-0.41806526297806856,0.07110133530222429,-0.2836361146786843,-0.3701821629477282,0.4668137200967375,-0.007883541354279266,0.2877267553851406,0.282692836641639,-0.011359614429254039,-0.2980848037541963,0.11049561933433316,-0.37192049805240135,-0.4082478896375803,0.47759833777996463,0.13103638349489555,-0.48537064580344547,-0.10371559389020724,-0.23957645890974977,-0.32376687235113555,-0.027365592547337725,-0.35166527364580746,0.0033017312373235796,0.44311783253566595,0.12962990369095095,0.0009652185250494938,-0.40582181386481864,-0.06829973116327204,-0.12318741830877755,0.16981728001637042,-0.4909365800487524,0.12922855906431563,-0.3588284533502726,0.1270243574648955,0.02672150837287557,-0.08107506331106573,0.20877632232467302,-0.39787012859647897,-0.19222629461343144,-0.45748193254958935,-0.15927641748026167,-0.33816008512011475,-0.4232037764442509,0.31224406381567626,0.025845211665023626,-0.18392825771270194,-0.01194821371900967,-0.38338452144631074,0.24782251588947912,0.2600897603040677,-0.05274383527289617,-0.023023026615048625,-0.013843285325560117,0.117342058799494,0.0834469690535471,-0.21703002749659395,-0.08013624072437664,-0.04257106299178348,-0.2880255179661837,-0.4973793945370595,-0.0866712697524823,0.33021528913581255,-0.2865988671809654,-0.46081532974347694,0.3967638782948244,-0.3972107845022568,-0.1880022410628177,-0.3489418988178381,-0.3227583686565205,0.34996415789920743,-0.1023914955097498,0.2650016242580866,0.2662476500836657,0.005477145920298021,0.09153744029773803,-0.3325540328980643,0.20679500594053146,0.27464518753245604,0.42390313694576287,0.021528725797674175,0.018711095417815127,-0.1576435647377361,-0.4557545962424452,0.25834059800512277,0.4271239888032037,0.2064858052968268,-0.351099076083049,-0.438603260140237,-0.36103177653788343,-0.4171171181590967,-0.2229843648181915,-0.07099760798624222,-0.2753104047473973,-0.3872575308448638,0.20693290399651754,-0.47122151780754273,-0.28310323909810853,0.19337812474138616,-0.0507484880805984,0.4333881472926522,-0.41745324661837,0.34606698663448787,0.47147090434369554,-0.28538576680006944,-0.30218340999399707,0.2955144718421179,-0.22308737576021787,0.11498215044053395,-0.15577523500920276,0.1793966418494668,-0.3851773355089292,0.12919582662338214,-0.49036816884641765,0.15262329931403817,-0.06299275957646921,0.2789354122817478,0.012920647280588504,-0.23348763992139165,0.28449672913567103,0.2912128533796141,0.4828996092634439,0.19507837063260092,-0.48911532465767604,0.18920965787001287,0.32443394183086705,-0.27723734369216846,0.27729657405029173,0.46182106758788355,0.07614308703485784,0.49814719840328703,-0.3733491720365101,0.20002200458590602,0.43438087498408406,-0.16728421747952793,-0.2647770542500232,0.1322586317347425,-0.3229606742351132,-0.22958589032374843,-0.17305077727776186,-0.43148524404950583,-0.08475843718793774,0.0021863660828573828,0.07124338196849944,0.2728626879148972,0.042822556179963556,-0.0705556518615611,-0.09426730782475512,-0.3025501060928657,-0.11344807979864435,-0.41871879250910693,0.4943707597447673,-0.07830069339151025,-0.2522911521219633,0.25299129488776684,0.07271538814810019,-0.405278914581368,-0.0980054849996812,-0.1865002647839109,-0.32287853789322507,-0.42299714037679625,0.3126808103605967,-0.35629506676187184,-0.1611674226443327,0.08378212710549948,0.33045718043815,-0.21911112376585518,-0.4435384302173533,0.12056217953046744,0.07139788262187796,-0.3777818369757684,-0.2606638967159598,0.06687491166481463,-0.13385777986587288,-0.29036315948606384,0.1598801230748974,0.053982775957049034,-0.3144152550861399,-0.40422303754595834,-0.4697043725220458,0.2347054506956241,0.041264954138976906,0.27151801063601355,-0.3852620566928089,0.4709079006092085,0.3747467304730252,0.29715694603530274,0.07921105162974151,0.45989648675217776,0.369132675314374,0.33282684174832067,0.18294231044440812,-0.3723861002189639,-0.17789811497641472,0.4586212165915493,-0.3708149637927356,0.10689598032936543,0.3756260505150826,0.42965470708327813,0.06846020672202213,0.4442460382474289,0.27988202368701676,-0.1385113280687127,-0.032364266839432165,0.40378793340256247,-0.44712342627752966,0.04918772945315464,0.43833479473980264,-0.04428318023956446,0.41820813321872796,0.07077657383948788,0.4646686231324648,-0.10656430067134637,0.3672958371816111,0.2048022907533784,-0.42791168575549543,0.34264875263769157,-0.3966010710161505,0.16080000291838092,0.2944545864605663,0.36669484798778296,0.026299904295718823,-0.1124241381432276,-0.39821926250878703,-0.04098220031981725,0.3835226851920437,-0.3411967611251159,-0.10960907794795482,0.012395438868054276,0.4776751249556488,0.3281322351710747,-0.337010490994323,0.18559595347078806,0.39085123819056666,-0.42511822766380436,-0.4929008269660138,-0.3279407098472342,0.11651802454770488,-0.009130857122415126,-0.3613969898809013,0.19137126257738224,0.24428527815628742,0.2442499439325243,-0.11254212595474589,0.17978867676634214,0.15738902897470508,0.19878406128530202,0.318870860451097,0.08532285320175448,-0.02878067153681485,-0.49238230273754957,0.17075452206604913,-0.08833466245544819,0.49577455168392226,0.2922561738205205,-0.2817718747044198,-0.31051833520749317,-0.006005409678271789,-0.252939447426336,0.13963991803052145,-0.04669300403584975,-0.041180732466506775,0.15444123386987862,-0.1717913915719036,0.17879676889640717,0.34507988256598576,-0.3547658256206494,0.10223899873808295,-0.07853472903770609,0.0896711300664581,-0.2661708602551085,0.004709955803550381,0.43084379200931355,0.4311153028267347,0.1175455530731313,0.09371706509877908,-0.20944174422841222,-0.43175983804132834,0.03258941292214934,0.3416837212220072,-0.3071023748369661,-0.46348239594541374,-0.18195932939211223,0.12213111102255914,0.11514250913447044,0.057184960224035075,-0.4423135214992939,0.026074274402929642,0.30043827274403556,-0.03786344018740273,-0.4225119160626811,-0.33606102004277183,-0.09998162742505601,0.39541901997130346,-0.10208880605537307,-0.13267346574604377,0.49471723101710996,-0.3006208821307521,0.28925741261461635,-0.27202414805511443,0.4569067523050889,-0.14216848198601095,-0.37490628058141384,-0.03798101387381414,0.0871626743431666,-0.009144572077584678,0.40220284045817145,-0.024034562158794293,-0.29975918646614064,0.24327001561558426,-0.22228772144504338,0.04929978269833102,-0.4379417938304906,-0.4619721904458851,-0.2562114570521872,0.051418726081453814,-0.18507616088956258,-0.365084718692646,0.1790624948397206,-0.2750068129088228,-0.1569648348348287,-0.08238005793632452,0.4194357165197964,0.30653934015064843,-0.03743765746665728,-0.2680193802861759,-0.11318818750762638,-0.3486736198410896,-0.32338595548749427,-0.34722238544730977,0.3131176754102951,-0.13369524106450892,-0.1438425893758859,-0.4486688604484381,-0.08847604950717769,0.10428274545240002,0.035554506371294536,-0.4532682342810248,0.008329861886081646,-0.09323887435059852,-0.20099687728639504,0.39372668486755935,0.05927527929446752,0.387747976129835,-0.40733638941629313,0.1495199813609276,-0.4903554913445689,0.10566351838815313,0.32278811534855234,0.33923902117143134,-0.3799069325070983,0.22726153376792424,0.4889495938360102,-0.3790549399140082,0.28348600149469294,0.369307141447637,0.23592450727552605,0.2466134499657524,-0.10672278957306114,-0.25208647563176445,0.22392554981591384,-0.4693264709117473,-0.4433339500492304,-0.0704768343801132,-0.43582514698875086,0.36245863319658245,0.1030349919026623,-0.009656681303301884,-0.3297053894916748,-0.17698315916819785,0.1934951946184924,-0.074302901099357,-0.08139370823037151,-0.13856738054477136,-0.16536328747009166,-0.18994210744584983,-0.36372152104749467,0.010138493296956819,-0.3853428089621507,0.17505203178931938,-0.2826946756890747,0.2662768640485791,-0.2892378781171445,0.45397664845725516,-0.46197122784301436,0.02009478360191852,0.2232741819434405,-0.3831310460556543,-0.04364977736935183,0.2528793584375435,0.46065103779039673,-0.16116860381851938,-0.46837582495490726,-0.03481884968377846,0.06681941043020823,-0.3016923714636017,-0.0036371531708816462,-0.11557313734348829,-0.10768944102926303,0.4785989330951612,0.3000972458542983,-0.29768938740683293,-0.3086615494152831,-0.26575329655600743,0.055589660515885875,0.1268380558955733,0.12311680193545249,0.1621480210258177,0.11015146930585873,0.28120427352540234,0.16042564342599475,0.3504560645540047,0.03440822413719147,0.22885158275628092,-0.25595890741197813,0.04286001575473164,0.3541302432892137,0.40645853703784396,-0.3781916397649543,-0.30537075259260926,-0.07950284296101784,0.42669756056122776,0.3615081520926082,-0.25448149054950475,-0.4968253481522822,0.462294699304592,-0.0026585409757344802,-0.3070516774255707,0.49366383164120164,0.010683829211042273,0.04951200075628459,0.20972975470677957,-0.4622923689023952,-0.06592585999411193,-0.149856227777579,-0.47436948689190994,-0.16697896303918425,-0.024448376658422255,0.3449342632099126,-0.3991098308640826,0.2542470038649145,-0.47137027763739736,-0.45802888266964903,0.1318648725596958,-0.17296375664795294,-0.24627038662115575,0.09665133881783428,-0.4187406414701882,-0.0771187991317206,-0.009752989731788064,-0.12280766788861652,-0.24516929407576304,0.32638410247707283,-0.02109852713574556,-0.45955508884103025,-0.48033298673819647,0.30991616232218955,-0.006123274752225738,-0.29660763859301587,-0.08365571059566324,-0.440568717846211,-0.27946183095932575,-0.4845560771690518,-0.42740492986963874,0.312149950848126,0.15826629006537596,-0.30555810629428026,0.4147840032482957,0.12750311292311967,-0.177435606270389,-0.3156443144863901,0.21354081352383947,0.025759976220080194,-0.4154570658429053,0.06571642517243448,-0.11599705134946992,-0.1911970548848818,0.3379393045584351,-0.26321280629337407,-0.49569976061236964,-0.22180208211515784,-0.3699791422653438,0.3695566695554535,0.25982417975203664,0.08417926042807622,0.2772977146788631,-0.31543182832078775,0.196215556230245,-0.13434235979071874,0.48494014488287474,-0.2207787185063832,-0.1570273217515472,0.1494518709060466,0.04608557755154963,-0.4171912194707441,-0.1560903773008424,-0.3409220534512154,0.3700775510255607,0.4681815767098476,-0.1476020503334119,-0.19857669243067289,-0.21972804364404763,-0.12496200857115025,-0.08406806618377782,-0.47505699358430586,0.32780765843072857,0.19025774701623854,-0.18078839452276418,-0.42883838119024964,-0.1493394217044859,0.46084347934872927,0.05480423071391538,-0.05082794738187668,0.4498248381731118,0.3260058622779334,-0.11155568722732978,0.369375091088852,-0.25350143638190703,-0.45091785552189423,0.1638174042054965,0.3212212406148347,0.34230635081458693,0.02018195091554964,-0.2491710260811315,0.4781895938271734,-0.4918030734713057,0.35346143544665853,-0.3269752937096,0.3798166152376192,0.48446468836395984,0.47832241976309353,-0.4881872138297765,0.036159879485054836,0.08840876680296117,0.3730236269268583,-0.20182574296006806,-0.33134911511767506,-0.47929904043224214,-0.27897283048790933,-0.3415461246943443,0.01930506176125313,0.43617401716780346,-0.030737371666448077,0.4556217865615628,-0.12373563423227307,0.1475136492985485,-0.3831715494256769,0.4415311509294344,-0.4067670278049922,0.22701543931875068,-0.18790007750492,0.47080108641482,-0.055311296343826255,-0.466595100737498,0.2827798197959104,0.36957160834606495,0.3064262179579902,-0.09726481504552575,-0.09880003665383419,-0.385354253433422,-0.18577797800447104,-0.30371452112028785,0.1654254031443554,0.10892231027314425,-0.30840031637076226,-0.1250976772443746,0.06697470083012225,0.47091950192884524,-0.14022361986783283,-0.3090908587269503,0.014045793229474857,0.24920664909734858,-0.4254304049637212,0.2999592205066217,-0.22592798739797426,-0.2513120002234537,0.39040454196153695,0.45219769842962143,-0.3692984639069483,-0.3376433735694775,0.41378585676408575,-0.22032117679581575,0.1802823859038709,0.2620584206144332,-0.09192113443690486,-0.4923816268511414,0.36154981339418724,-0.01917691678673883,-0.45253467629314414,-0.11162901164650685,-0.36012009171218984,-0.3215431214163351,-0.043248153071416384,0.1880864388524366,0.031234758062059997,-0.25392046822620307,0.3558945185641993,0.19529784271002537,-0.04847486483541008,-0.09181671355201337,0.24778388912543292,-0.009662606831687182,0.3515673601416349,0.15319442169443387,-0.38320530051140755,0.16378713592057204,-0.1770098236743236,-0.28952938302415565,0.15928996356195402,-0.4453582950596846,0.46867779883570737,0.272978485876612,0.09858485499411884,0.2543874410100908,-0.09096454834007384,-0.07154631798255462,0.03206025758748732,-0.3631632903323654,-0.008578982191741025,-0.09027573819242907,-0.3361337222783307,-0.05543445174757955,-0.3608438579263633,0.05346089872066151,-0.12281262985016816,0.022810637949600476,0.19213707635728428,0.38610750003467076,0.3246399716462267,0.12133093682402185,-0.19154639996619838,-0.09166966901264528,-0.2640758874729514,-0.11427066775238282,-0.32563393578261257,0.10748589737354464,0.48504951292100884,0.029731713423202688,-0.03579160793505287,-0.30520259418687146,0.4306342705640387,-0.2032256011037652,0.20558512706214138,-0.2976639210690575,-0.061771904636567676,0.07141472794555104,0.4819414311837844,0.3038140408916521,-0.4009187196890185,0.3341938128012405,0.1122246366303381,-0.08484082296617435,0.2924182964920703,0.15475760109603054,-0.21271197978393075,-0.39140869796227307,0.2609898436817797,0.2104897787309412,-0.30431850845128605,-0.07370175949303825,-0.49462387334755786,0.21238973002619477,-0.29363924501256977,0.31388344118593237,0.4350620123187625,0.040288411158812876,0.2192604837113885,0.005332895808920268,0.12035962013472079,0.06929454706740579,-0.3236576672413378,-0.36825209250535673,-0.06156823086884611,-0.32500304518169476,0.10108310650507546,0.23764141976830389,0.37455900926890284,0.38159034616595355,0.20740681741425204,-0.43029444173208464,0.3397478656336528,0.012536458520085114,-0.44724012690164683,0.14956485303524691,0.15072903603310905,-0.08431747533728373,0.29680522468986625,0.1449677024046767,-0.1487088087240107,-0.13640797731755772,0.13557010815878967,-0.38379324179776053,0.39328997239583297,0.22640687120142156,0.4645602524009791,0.25270972098145106,0.22952990366234283,-0.23506462244788362,-0.13395995231892943,-0.11990879944475985,0.47974518106294806,0.11316221622510736,0.14839622591958768,0.19664068460172968,0.4740736661503846,0.12524974014873425,-0.3751782258893017,-0.28320564805978576,-0.2926024187180547,0.2797663915275541,0.37705502592146956,0.2851712032582896,0.24162664821681545,0.48797019374611317,-0.008253544404859259,-0.16519347058809974,0.10780734051458629,0.0713005956558872,0.012322478945441473,0.20135719361102122,0.48504554796060084,-0.04234155619117286,0.09423701642210291,-0.24055935708411624,-0.4138177033920234,0.48953947098263995,0.46865845452449184,-0.06093607820400648,-0.10557490452235019,0.16201609406496775,-0.3383719418505433,-0.27212005410054263,0.01875858220491855,0.2805882875164809,-0.10126261145212023,-0.09651720583357148,0.19676205326595797,0.37573489662268167,-0.4122202293823065,0.3160557560161892,-0.020537334889800585,-0.49234175678708403,0.2625669293820705,-0.06993633436982027,0.38927566277604164,-0.21252300302680638,0.3596945004923504,0.30131265989435474,-0.12908723819695567,-0.37299399745094863,0.17542543251729592,-0.2316945788377074,0.2805864416512922,-0.26735650390712307,-0.26196745814345523,0.10499658478792795,0.4812341195104559,0.34322612340508285,-0.3282389441101765,-0.41394061945725436,0.12877655213657202,-0.0721170452519968,0.03146770558559853,-0.08614330944624493,0.4717899453012384,-0.47291192171967733,-0.29678169419856903,-0.33533539815899727,0.1505082721488844,0.24412046087700578,0.2832448486360717,-0.10656287620266003,-0.4509405849746526,0.06964943367941712,-0.22791917395220596,0.44528847188293974,0.039071447219301225,0.08428864274915182,0.46582373291039847,0.4347078945610694,0.20540146343634214,0.31840042607143393,0.42917880738899683,0.3200869654389227,-0.13281510975007182,0.04351964249144391,-0.18737439618476892,0.21266401311486272,-0.3210134328345611,0.4383630936314318,0.15900610173020202,0.2000667854226963,0.3212222387317507,0.29236720043076225,-0.3179654941822063,0.30195703652253014,-0.37912128727466676,0.2326110359254332,-0.16957608080885755,0.08542327722026521,0.06243895667643273,-0.21313044525541902,-0.3771976551620402,-0.2381202543447385,0.06543007472133477,0.2863483559122002,0.2067753623061681,-0.018298547836424817,0.04487284883524434,-0.42641642255439427,0.43844970023412655,-0.3988277838333567,-0.32819586064789563,-0.011814479788761156,0.014193513273550229,-0.1613787578353314,0.4287972335778092,-0.34787454589981914,0.44877018056985385,0.4687968094250563,0.22151231390972637,-0.28920766296086486,-0.3010032915041223,-0.30930687025031967,0.4551700985556715,-0.4988526004452256,0.16571125073989257,-0.1633830785299173,-0.069276734527846,0.3005707284450647,0.15699263151281317,-0.27377688493880425,0.49436955264587357,0.473232960084367,-0.3749937923135207,0.12377326873670214,0.35885285758328855,-0.4230222360733684,0.48091463420646985,-0.3965994117338316,0.403013936556895,-0.18820416559745068,-0.24460403111516937,-0.15019061312113546,-0.2079943604286798,-0.20661050393473923,-0.09035328518374053,0.4002472801851724,-0.13971307594473936,-0.23480491762558064,0.07637176577273452,0.2374218578370264,0.15480612145520434,0.4322831353216141,-0.014442977941445667,0.33578450501535206,0.4889852088161746,0.3862850755242666,-0.056466904569528964,-0.37833487580617153,0.10804040768357659,-0.11672734356267211,-0.1438472649858169,-0.2550166855508651,0.23736543815935218,0.47237586976434276,0.0710216941198778,-0.2978681332340507,-0.04748432104541056,0.07988311927590819,-0.1981999893430939,0.40640889379118583,0.4596186124944235,0.03565216884050382,-0.056589760899735886,-0.3416842833991365,-0.46284268214216695,-0.4992358843311122,0.13038920860451686,0.054384450108024396,-0.47280592937503907,0.47318709720223384,0.37372580112700526,0.05338512693293662,-0.33427613520998145,-0.1577167863427733,0.08465230627639908,0.34162409244650815,0.2761037117058882,-0.21434624718481032,-0.4421088400707953,0.38353807301349163,-0.2718307419383108,0.32662998028485,0.45793692730397484,-0.11397684751216519,0.4388715215336265,-0.16042413243676013,0.29332729136752556,-0.39060007920629203,-0.25256203901735264,-0.031241672207557247,0.06788063751324258,0.3238327779710948,0.403091585328613,-0.29716016557655434,-0.023918949460738803,0.2891948081462392,-0.39557045756427445,-0.41892203392788874,-0.44491543262028443,-0.05551124891622372,-0.06255721676830062,-0.05730432758553605,-0.44702514871082055,-0.005480020283000098,-0.1649054573017208,0.3303654757484076,-0.47071180071670726,-0.4693021671779709,-0.2337858253280094,0.1862557184516418,0.4463705606864947,-0.1298738615326971,-0.20338285911751797,0.39324220444900204,-0.16141505408044665,-0.12956298057671467,0.08745361242262484,0.35868535756413844,-0.10260076242935767,-0.4270815505194603,0.3326599390198457,0.49153949881441217,0.24152897045206667,0.4794054561881007,-0.2762456726210718,0.06577469071201625,-0.10895176367993487,0.3084903186201806,0.35441800633367126,0.2661844274168379,-0.029768011669333072,-0.33042891233604754,0.1897527600848321,-0.4641532610042034,0.4862053282294685,-0.19552765155831597,0.07037781667267318,-0.22367857985174067,0.04734751498919554,-0.26378940034319864,-0.42775290053147486,-0.22042171765228624,0.03761579641738555,-0.4532758237972643,0.37695041409855623,-0.00782686206874672,-0.3165218694694645,0.4854702618949167,0.0645423107427694,0.26920979665110845,0.3487742526230482,-0.04172403938775293,0.18669798198493415,0.18055165030797493,-0.23015573973754688,-0.13662401840872085,0.2093768376375711,-0.3739644928756296,-0.16311115989877045,0.20246498442407557,0.1030233982958848,0.08508647635539046,0.3161728381081008,0.17669194343696715,-0.3838788775631572,-0.22913089781711138,0.16186979139921864,-0.2302887229819448,0.12679867019951518,-0.239135488903512,-0.4966132218546291,-0.09332733781138791,-0.07532626338940629,0.45568876012262094,-0.25164145363964074,0.2951632015374168,0.30984371480743533,-0.09528178881203564,0.2468359501817461,0.1845151821714297,-0.28125311481535675,0.047492687276655676,-0.3505954994566196,-0.019156733991672725,-0.4063754512634614,-0.028687513735059955,-0.08695408877135691,0.36867601376080694,-0.18133473872457317,0.3910581868276395,0.16535050561552578,0.11159728583423645,-0.07244919849485698,-0.3331640905561757,0.4547816469873558,0.4388921782820181,0.45631418024057924,0.2017649826725103,-0.05907484204767344,0.3570063193698054,-0.4453141597759016,-0.46505941792639316,-0.2648263230355228,-0.15468350796590236,-0.3930697938835366,0.21816887016412045,0.40238599236810635,-0.48294748007307664,-0.015287430375655164,0.3753246861123438,-0.10259269637222967,0.42349747222573964,-0.07859876566573609,-0.16927667144780978,0.16784528711865687,-0.16531198860753538,0.34548145648812545,0.33775174830988464,-0.3185677529490061,-0.40889750769346467,-0.4677800050724241,0.2900097885304205,0.27653724937251645,-0.18015264362650663,-0.08754009411579866,0.09333380807608105,-0.18006680297501076,-0.33613497126188396,-0.28463134843596016,-0.4376124325033617,-0.20747374198085877,-0.46613117109673996,0.06470783876601671,0.03560168280595155,0.13497840891788981,0.15820398250075063,-0.31979867130046236,0.2598868967122161,-0.04922916956823764,-0.23778653802963312,-0.16751385934130303,0.14455187098951772,-0.17563701138979626,0.4185042306872935,0.025061167179305066,0.09708238627577015,0.07295752016370538,0.2037818562671454,-0.30548519520059725,-0.15430843089558888,-0.12185813875979079,-0.37864134537371874,0.3285526921668436,0.41074034172646057,0.24877777626061004,0.10232998036874119,-0.4882794709300404,-0.2658037194708345,0.4721049820318166,-0.47641689487587,-0.4768345356852708,-0.32948115929741517,0.3549092623025425,-0.25631588306897024,-0.46977583083004326,-0.2694672271744303,0.47590093845602355,0.25301571391516053,0.35371939725682644,-0.35056448941086127,0.0086672234063776,-0.19332361092952755,0.40055345049663726,-0.09044503503350865,-0.36912636879797045,0.2061392181605186,0.404163667345671,-0.28367414635825483,-0.06448357785376979,0.42238466903472704,-0.043630555886522204,0.20419114408037742,0.20382529595604915,-0.07066001194180038,0.4729182409642594,-0.33655106405067436,-0.4188972659011394,0.07015160473502147,-0.48417592171878465,-0.05508552832444935,0.25895533639471635,0.15583574325545224,0.1866325980872996,0.34216729239244326,-0.3643590675430193,0.00039377454988476224,-0.25871299007172976,0.2519080569007768,-0.19613192051951445,0.48960938514398755,0.19848065759497913,-0.12995462448546702,-0.4488654521109219,0.2541319993748343,0.09096165316387705,-0.47759504779803397,0.21506760622981913,-0.2565977919347229,0.19254714803266304,0.2653708661300589,-0.481186879334887,0.4733377178515459,0.4857188521720621,0.07808644723160474,-0.049983008877064306,0.3376693891230522,-0.4767151178927711,0.4747857873561101,-0.03585625957382699,0.00602525382852015,-0.16492974232064395,0.32398880920414275,0.06763184511790965,-0.32103213594856417,-0.45551268680333523,0.14678993232698345,-0.41227583287455594,-0.42296158870603273,-0.2566675288303233,0.10797307511133414,-0.24701622544468305,-0.04432236887456442,-0.06307860563453405,-0.47519449603981423,0.4927251727698143,0.011052064364905023,0.25520909650880896,-0.38201019514401735,0.029357313970439947,-0.28261906567307093,0.1810967527513314,0.24820476088298427,0.4156509525757237,-0.2920505738916521,0.21359391881476664,-0.37179419156258886,-0.4792188824096426,-0.06322563621264643,0.14272098287315438,-0.3028730361134835,-0.411770931346082,0.1061940496060223,-0.44353515555829914,-0.4422049277736295,0.3200369763785258,-0.07014986363573716,-0.0798028118426366,-0.14644610853271645,-0.031174053551209724,0.4820029050348178,0.26200820862616037,-0.2686355362356083,-0.1602844701738375,0.31026910673028696,-0.4526980324036196,-0.11151284085323931,-0.12719230152012795,0.11850599105197013,-0.326375145692823,0.19694930665824684,0.05676182075040437,-0.10590951012358296,0.07342754321906098,-0.35468603255401243,-0.45820902946483466,-0.2077070095165654,0.11333093647860037,-0.48335690451536584,0.18156769156533747,0.2800794391930501,0.06987694250985821,-0.1960811877855928,-0.02825201867432603,0.474587919269994,0.34933041229270545,0.10660877721215023,-0.4448484223865752,0.21470699143321692,0.03548006312112961,-0.4320364879897358,0.14479976020305996,0.2917347052052315,0.155973622159312,0.049296227756043365,-0.44756601431312193,-0.46274540429336253,-0.41233118056156304,0.2548665420568905,0.05796779095157323,0.41068745533509565,0.45720012084099815,0.01917046753502194,0.29192753924854387,-0.37297262307509427,-0.40372346248769886,0.02261437324484805,-0.2688620625578759,-0.22260309251193777,0.39017934062358095,0.2925306446299034,-0.28163576406541124,0.4321479042495926,0.0764071861711364,0.41457905260373873,0.13258121184216898,0.020045509255052885,0.43842438937202766,0.2729064030102224,0.035496078610075976,-0.21181771138047112,0.013470995873272162,0.3602890877332485,0.30036271545780147,-0.4997393760240767,0.18619857577839016,0.39190451868043064,-0.2458011440137271,-0.04820312065834398,0.1300073461489275,0.1459763645326746,-0.12622822178934934,-0.3887090879782944,0.4437341087565039,0.04744795523146261,-0.20701132622641238,-0.13048205452067374,0.2982618494881031,-0.492221136292325,-0.013852867224688481,-0.2178785297744057,0.027567633458459584,-0.42614164170240176,-0.2818217399856884,-0.3028640839419472,0.17591130305297198,0.17614515696717636,-0.2989573394325782,-0.029353088347672696,-0.06386494355276784,-0.26982474918808785,-0.11193697689721893,-0.09820723146683319,-0.2989826617607345,0.20746804372639915,0.2973678879352677,-0.20542383860035596,0.10500903950593177,-0.4047256556248764,0.4307599947856007,-0.24651831225632126,0.1649499170837978,-0.36418988192486323,0.06826843135046712,-0.3855149102208164,-0.2680417048631807,-0.3143686496513163,0.07886753095754484,0.32168389025093047,-0.348949793931701,0.4263428266991993,-0.44701952280961565,-0.1427039848781808,0.4910431464101548,-0.03844034245107153,-0.29849488382376665,-0.047365153393703174,-0.4840421419374612,0.027804863283741543,-0.12654519719679302,-0.2704878634382675,0.29686029912340794,-0.12915216455845258,-0.2674223596227534,-0.2535706926055066,-0.12425603122244433,-0.3845098663684907,-0.2699104324761188,-0.06331437544557694,0.39000112590702773,0.2038747810566377,0.11753403740499335,0.4120950944677517,-0.2868716007666088,0.18935415334628813,-0.31562466048477744,-0.1889647616620176,0.05521843748014921,-0.016869842687507353,-0.15986213956187645,-0.23994987554230662,0.03132378490003851,0.2540853547634079,-0.24946308688585161,-0.07129164314953607,-0.1637650935530266,0.2737437618336349,-0.07290121637058666,-0.4658061980050541,-0.40305475786945744,0.268406406276146,0.3151539642950487,-0.2790379291660463,0.25241342037869074,-0.13171672400970214,-0.35000602845002526,0.3018981780414842,0.3314815928469168,0.057147175090195956,-0.2726726163123725,-0.3738081318150255,-0.44893881797580915,0.42917416633521266,0.3668352467466163,0.4894081163527493,0.07066456449623315,0.11938314171951636,0.25880589748373506,-0.4299753316856514,0.24206220013176982,0.39954541607770033,0.3816995916368855,-0.4956252323243233,0.45916852779121053,0.2986253201224536,0.2848696916032356,0.18595054788448673,-0.14205329224141305,0.054877185450147525,-0.15282518664697808,-0.20297927901186075,-0.45073719757289976,-0.042559384205076656,0.20856983824803788,-0.13943113470049062,-0.2999375675382203,0.4188693181701544,-0.4011984314195063,-0.21422202032588067,-0.02630770464743648,0.48534533427653814,-0.411502190387665,0.20843243718063253,-0.33639351154409547,0.3927757129891407,0.24650100736642333,0.4572741624674599,-0.35528574952283476,-0.15247202102545399,0.2857088548876787,0.25643368929977317,-0.01393002605515492,0.4364824427422884,-0.02182990940334073,0.32234111840663027,0.3589586326847656,0.15031035173371032,0.012646121015884804,-0.07566297621706997,-0.2609187997690243,0.154464653606605,-0.2682514397177451,0.14540403825893855,-0.1885941022564035,0.3265098732820879,-0.3099273152182884,-0.22992729678528678,0.3380673151583473,-0.0320055007238651,0.28357215669629565,-0.1065729666088544,0.0726535835195925,-0.25278212180241333,0.4033834950913062,0.21915238862670794,0.17041136997418316,-0.09779314402786654,-0.49745004248264535,0.4078077601896668,-0.348229420400469,-0.04298873849648577,0.17887022487950688,0.08107476722444273,-0.18302009298368715,0.02300352675639461,-0.30345532089487004,-0.15012867264629426,0.03583849046979326,-0.06407407622469652,-0.40415618533633957,0.45084152276689937,-0.08436737001368844,0.22555784750966756,-0.14914599329514378,-0.061480594817297396,-0.036788421284886574,0.17886970924716272,-0.2964408079180241,-0.20804638898366168,0.1672439963756187,0.3719165868180798,0.4435978732468062,-0.37913367126631714,-0.04621178288199257,-0.06671698177018048,0.3264285392722792,0.3745075994749829,0.3069155363698617,0.1484008673751418,0.482244213639452,0.3165536956320345,-0.015356221332195163,0.4532038492509196,0.14872803373420118,0.005026373135357698,0.1304988252906054,-0.3804375644801765,-0.4415071937089792,-0.47319362587254754,0.2543415989459712,0.3595684626266433,-0.003690043116201247,0.4457125315458623,0.3236645533126672,-0.39728517907745586,0.11341368577518796,-0.4490251594095902,-0.20976741018380674,0.3965384386862323,0.41448575338556437,-0.346575298322076,0.3556572901143582,0.14594394151951628,0.07408837416202707,0.288105283745659,0.22364379590757744,-0.21315943180204222,-0.3903715539268595,0.09216921176500503,-0.02577597812273602,0.4875577265032802,0.10764356826020594,-0.15952814038770669,-0.3677134520527816,-0.1619899682943442,-0.08928916718707813,0.2613403437284403,-0.3837618462980368,-0.15174457176585743,0.489363639785213,0.33313375851787885,0.16981745225220224,-0.08468319238856825,-0.075831514301957,0.3467577419561807,0.2602842005925876,0.15824060410591434,-0.42110294907725354,0.009044614795158612,-0.18365845065051323,0.45745430343526583,-0.009829550809792975,-0.18663126447730027,0.07640514891470906,-0.3030795286919774,-0.12180151903696479,-0.3574741419094525,0.214307710829992,-0.3595164379949496,-0.07805054169260428,-0.3045059914070931,0.14599231597683304,0.12487441818262646,0.020404920924842473,0.46099911623235945,0.33305477737756806,0.38522583942777344,0.1049428244348869,-0.06190439546086046,-0.23592739596950696,0.41756679848563705,-0.15579368428939344,0.17995525424820435,0.14785542901567883,-0.24172682974281656,0.33106039631682926,-0.4805600635871128,-0.42852909092866964,-0.3739467911145864,-0.06799211601198296,-0.13752331655093242,-0.3635414847199825,-0.39241871070139966,0.18830554890591134,0.2052202721146057,0.41911596209422,0.22730101760712462,0.2378500598331834,-0.2619039553434832,0.28113578925167504,-0.130712471937382,0.46739114287235894,-0.4161578618956574,0.010159117320979849,-0.22045832482323902,0.10099910286291802,0.28057350691295957,-0.007867672188952124,-0.4755205179449229,-0.16008689224735062,0.045897166495427744,0.1416580611317526,-0.13353501464507955,0.10503712214910865,-0.0957427826739401,-0.14428105667589364,0.01988314946973002,0.44264489032621523,-0.31821767338782037,0.20961443076878572,-0.15806275342495102,-0.31830631699371037,-0.23215288379567944,-0.33903835520121306,0.0768085972530026,0.22964926020741117,0.254465558539795,0.4530870824471278,-0.49708403105502175,0.10803507072909069,0.4661321059926382,-0.036853492623446726,-0.256617818982082,-0.18433630199995066,0.18433858469470588,-0.27353363972484934,-0.17238405393426737,-0.24407788058611035,0.23668255320896336,0.42059490163304236,0.12440836440939962,0.31250464013199886,-0.3281474793267276,-0.33846307009587373,-0.12680705011609583,0.15345036198588202,-0.15866810929055197,0.247362926740059,0.4968748457919725,0.39855705277020625,0.3847182240844984,0.47886563414113903,0.46321222972009823,0.08063816544663038,-0.31594083524747263,0.28154529095448355,0.15792149512670584,-0.35336039724147716,-0.3659252436546758,0.32390069828133283,-0.35655253375507345,-0.29070237223353024,-0.4934256828601755,0.4763329854535019,-0.3845068262455107,0.06372667885819516,0.11086777479501109,0.048319496218582225,0.1843164484367239,0.32382576605060365,-0.1630956566264965,0.03156887266249586,-0.20629187146645744,-0.3149590520902943,0.41172393404290264,0.08028496936290841,-0.1505686140376694,-0.01483796542466731,-0.43556438410326836,0.4149205854136757,0.23960688127209995,0.18259125516831287,0.4032089463189308,0.16509372414778567,0.2941452201477224,-0.06458049131907595,0.03790849658676532,0.4865969781815773,-0.1729510879894487,-0.2852618065925072,0.23714971708277854,0.41900498349929327,0.23282745416285544,-0.03366928199303665,-0.26661792646483007,0.406311785938662,0.03053370220323126,-0.24187264239936934,0.19090750990607774,-0.4498488994077836,0.26434608583102537,0.3824004863157906,0.03139326341024962,-0.33329345244585196,0.034031548357111197,-0.30636944782479425,-0.41823841900492575,0.04946727172814658,-0.3408399731754914,0.48724325165888716,-0.0527738522889345,-0.19822879569847274,0.12379962767856445,0.07410888755675549,-0.027144891345608935,-0.07989789803463054,0.17552305324373396,0.07772077424024748,-0.02984232294530842,-0.19078944413408205,-0.06961627722009012,-0.03685732845179257,0.1373567893420533,-0.23989207785396105,-0.1996614145472051,0.46558935479007,-0.019684752719070664,-0.09342607437369144,-0.44022319896343776,-0.432113153762802,0.38621575276352593,0.3141848907811542,-0.26701377160205886,-0.42953402692179843,-0.32579038543071204,-0.4361263977745451,-0.448385972527209,-0.1237266381547204,0.09868058765711019,0.42688630847392806,-0.4707035359242093,0.4875615058310019,0.2070505757837353,-0.48672974251546663,-0.32403086274784054,0.34897956541112096,-0.07097142146858704,0.26369840693938773,-0.1799020705095491,0.17371476813578846,0.3465581639374866,-0.07800512853502317,0.31344458231249694,-0.33585678279021103,-0.1566345592429923,-0.41414285698447517,0.0627657413546181,-0.27722993433692755,-0.3558994653597567,0.4099230170987722,0.49055100398554985,-0.1283903415542036,-0.4114233103246414,0.4664097535592773,0.14453044973182227,0.23834523187487222,-0.2441449121296384,0.2310569259085875,-0.007967074226088888,0.386492209958891,0.17665290617408935,0.14897869003324637,-0.013042067892923281,-0.24788027760988696,0.08484810211984906,-0.060811210195857335,0.26780330582976286,-0.07828639728406328,-0.3300064370473912,0.301966952575512,-0.46610769114431827,-0.12175931678324492,-0.1405473419968608,-0.08547681023503673,0.2710248281783969,0.37160461094774533,0.36406506592811794,0.15091677056939612,0.3413049461618778,0.2809690405872045,-0.27155912838701024,-0.22453209505337268,0.019298436893381954,-0.32421091569111704,-0.452841636695692,0.08374843562067702,0.18095520949281685,0.4806900827444074,0.49066424900313677,-0.07207495016848986,0.12823781786283428,0.33425404730166663,0.06689100244737523,-0.23308636437634855,-0.3586968889032811,0.026374962864006646,-0.10489745505556392,0.3958209310089431,-0.4780315960599173,-0.1524374749533839,-0.45741104647040465,0.38562242518221446,0.4060146786775043,-0.41784667198182013,-0.12365864679218452,-0.22627085819165904,-0.20557106476946996,-0.47805723458716365,-0.47869289099440193,-0.25713010513286405,-0.37928981732791933,0.027459634344009887,0.44836409291926027,-0.4586934477283775,-0.24353557487831323,-0.17982305940091714,-0.4601801890407291,-0.07539495546119701,-0.3059430325067958,-0.455263749662423,-0.1587459492485881,0.4738606519540012,0.28685110938498104,0.05876650406725603,0.4280703730517941,-0.41701603188950553,0.3149974037997023,-0.2819048083747393,0.34436153158205385,-0.39265002563458307,0.47715050626709465,-0.4742758321720524,0.12257186193587222,-0.17182902840627445,0.044556113631603944,-0.39444997416761485,0.06889547626314041,-0.18255336359541507,-0.16431146636078897,-0.46211768956883326,-0.1712989951320456,-0.2970993340670338,0.05861178370078646,-0.469066758583766,-0.028324358000833882,-0.2072936989165688,-0.1908812187667257,-0.3817711682095297,-0.2514265378618694,-0.11859579128647546,0.3126494340382868,0.21825039891956188,-0.4068134785410882,-0.2185529219939384,0.05189831013698276,-0.13236052034645107,0.28290283135664507,-0.3228332413830939,-0.13660209835119352,0.09383997108381315,-0.2365723283842427,-0.41064372035895924,0.14181173743216302,0.37981493440412706,-0.3470764234708892,-0.2546089293060283,-0.33283578743854947,0.2488138861646647,0.015354934079789162,-0.2353586319397618,0.24054458825969727,-0.15680683311222654,-0.46899370677757,-0.22602051350019825,0.046994888309270344,0.430175747130066,0.29293384880200835,-0.48987950935302904,-0.0006918102235990986,0.4162211635949855,0.39076982727748,0.18613771864251483,0.33781844430501495,0.2052560224319353,0.1618047920136778,0.053413201038293945,-0.2503312033354317,0.4817833375994649,0.3249477612828833,-0.06559377828073365,0.18950247291648314,-0.2764230054585315,0.22101387173491238,0.3096793112568763,-0.3515513427620818,0.4126987837399021,-0.09629040808208678,0.4467423525480618,-0.3149310641195,0.46787533710663864,0.4107105548578216,-0.21726196968628075,0.1310882610353712,-0.2917244852910532,-0.3464940200228901,0.08325437873332064,0.32934989203656073,-0.2309753291087051,0.12218133749596416,0.08077600330376966,-0.479378888669294,0.487620990931805,-0.058581139962760265,-0.4812083324978831,-0.11640943976121343,-0.07227632239177417,0.05345088968023903,-0.3113728017816906,-0.30359956871551996,0.1849097170527385,0.4917475262480515,0.07961740383172122,-0.23045242220341455,0.3554506859075799,-0.36230339844800286,-0.21504490065994464,-0.15608953505162915,-0.020851062810496312,-0.3540831154054631,0.3085744546858513,0.4818801930367502,-0.3537619009857438,0.19184113199476283,0.424028869861121,0.28993042479617426,-0.030481225131996803,0.43381958270118304,0.032530829007556994,-0.3647073937710208,-0.2285793684580275,-0.25004263926962955,-0.34051139550167275,0.1273005384480177,0.04271422616150988,0.058997056695555994,-0.12673276422527002,-0.1018713614235669,0.15076674059112105,0.057609997202601404,-0.3407448069690868,-0.21048923942858822,0.27538044494056146,0.16309074957092196,-0.4014818452186384,-0.13283495382468113,-0.17482477429276067,-0.3553347523599295,-0.12457739890761044,0.19528146405046098,-0.35202782961872736,-0.436267795965374,0.2936036795510635,0.47329905089792557,-0.030942269508984266,0.0029874964634017953,0.1502528590795773,-0.005305627701024163,-0.010203275517944865,-0.32521565151678256,-0.4531908868108323,-0.0686918488605337,-0.2713723599610409,0.32900955491195116,-0.3837653045627534,-0.17238145640911062,-0.1959596295224959,0.20042449347329905,0.3408294656946369,0.25854843937289806,-0.4943175417922412,0.357806030279185,0.08894382081253216,0.3619541497149703,-0.49725856657249334,0.4994452458527894,0.0332116428016187,0.1642756438549693,0.17851848771106105,0.28404638829862106,0.18045415231210904,0.2740795220612482,-0.41397816872392057,-0.09899335784583285,0.11871972052200519,0.011584313931758183,-0.03279573327924057,0.47986231433649307,-0.3712518763780832,0.303759576840096,0.22202442821692525,0.49017867639031776,-0.0006198768314338299,0.3301924715176492,0.4373762512755348,-0.09545505482971395,0.15556599589462738,0.37978398848587536,0.4768085389101324,-0.411409300265535,-0.33907434606650444,0.1642675700124081,-0.43459379858933733,-0.29577937064606297,-0.4479156497651866,0.0789139370021128,-0.3034458957221886,-0.11840977385804496,0.344782129608205,0.12216196070182206,0.4321387916697499,-0.023162305178701548,0.1968781877949124,-0.1852201817008825,-0.2262445689110706,-0.284310289402778,-0.4498967561145719,0.07520262065522387,0.2824010404956241,0.07451494439959538,0.4657474851008221,0.11412369059305871,-0.058739705157967226,0.19483684988954897,-0.42938380780327723,-0.40313854407989025,0.058140988083682066,0.4726091442154874,0.4652826051236476,-0.12442743532952782,0.4563991923345476,0.1642794459334469,0.25544922462963493,-0.20166398145908015,0.48107892866023994,-0.03649086783701461,0.457762308091451,-0.078825518537319,0.20083951087465146,0.19623136994910473,0.3349856274336256,-0.16748909364815057,-0.37600485049854426,0.23323313567978188,-0.06628101051516033,-0.2599199501660334,-0.4620106670572295,-0.48385688971304464,-0.23018108954555627,0.4773340078645838,-0.018167331693436317,0.4918035275883428,-0.05237603327966878,-0.11852537148260933,-0.07540315967530842,-0.015293151456739595,-0.37806378505887084,-0.1760161729277725,0.1448810070455313,-0.054568623407738714,0.37602895622272814,0.14987428928515967,-0.33264215223872884,-0.27431495853320653,0.169573099606402,0.29993164805100103,-0.10789286551601451,-0.2802244986305378,0.20853840176065397,0.3743194312329261,-0.45165230699694203,0.33118313208424865,-0.3943482561381364,0.462419644894843,0.26432665334702343,0.04530578845657662,0.43990944415010813,-0.0631902915191882,-0.048502203261885146,0.3123160560922278,0.4103699441909219,-0.41133317808747294,-0.1274936322989455,0.33765958662130213,-0.055353412655869016,-0.2502751816280049,0.33339635871299067,-0.36002276953518586,-0.3989737587851434,0.23289803227216832,0.06979378319052976,-0.23559870655141557,0.4617893904955126,-0.39328664523552415,0.2134014828026607,0.16613874819230046,-0.2788501564201349,0.18647838883121204,0.15348621780146576,-0.19162209585992307,-0.17458892020929162,0.03433770209986964,0.3350614660614757,0.2539554851929686,0.10845021447814984,0.21186570926097104,0.48590751499862095,-0.49603740223660986,-0.07305716554549813,-0.04686287081532625,0.4203990378027447,0.08539422206149894,0.1071013647883905,0.3114897499601921,0.18276977339224487,0.12485999267689007,0.25824869282166407,-0.15906702398682704,0.07361490469721343,-0.44486334332690136,0.4146156848069529,0.3326730475230768,-0.4803384953737262,0.36561572509385387,0.16233079671488237,-0.08502069479713326,0.3283164890951431,-0.14866421613256353,0.29119250591306267,0.2013125104884752,-0.46895709073350167,0.09688961656363992,-0.4745293477392236,-0.3310211670545291,0.4059350065602494,-0.22202438076392705,0.1701206040950598,-0.09158390158898655,-0.28326266744749784]}
},{}],74:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var copysign = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof copysign, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`', function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = copysign( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', function test( t ) {
	var z;

	z = copysign( NaN, -1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	z = copysign( NaN, 1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', function test( t ) {
	var z;

	z = copysign( -1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	z = copysign( 1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = copysign( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysign( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns a positive number', function test( t ) {
	var z;

	z = copysign( -1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	z = copysign( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = copysign( NINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysign( NINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns a negative number', function test( t ) {
	var z;

	z = copysign( -1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	z = copysign( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports copying a sign from `0`', function test( t ) {
	var x;
	var z;

	x = 3.14;

	z = copysign( x, 0.0 );
	t.equal( z, 3.14, 'returns +3.14' );

	z = copysign( x, -0.0 );
	t.equal( z, -3.14, 'returns -3.14' );

	t.end();
});

tape( 'the function supports copying a sign to `0`', function test( t ) {
	var z;

	z = copysign( -0.0, 1.0 );
	t.equal( isPositiveZero( z ), true, 'returns +0' );

	z = copysign( 0.0, -1.0 );
	t.equal( isNegativeZero( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/copysign/test/test.js")
},{"./../lib":71,"./fixtures/julia/data.json":73,"@stdlib/constants/float64/ninf":60,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/assert/is-negative-zero":67,"@stdlib/math/base/assert/is-positive-zero":69,"tape":244}],75:[function(require,module,exports){
(function (__filename,__dirname){(function (){
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

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var tryRequire = require( '@stdlib/utils/try-require' );


// VARIABLES //

var copysign = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( copysign instanceof Error )
};


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof copysign, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`', opts, function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = copysign( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', opts, function test( t ) {
	var z;

	z = copysign( NaN, -1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	z = copysign( NaN, 1.0 );
	t.equal( isnan( z ), true, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', opts, function test( t ) {
	var z;

	z = copysign( -1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	z = copysign( 1.0, NaN );
	t.equal( z, z, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = copysign( PINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysign( PINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns a positive number', opts, function test( t ) {
	var z;

	z = copysign( -1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	z = copysign( 1.0, PINF );
	t.equal( z, 1.0, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', opts, function test( t ) {
	var z;

	z = copysign( NINF, -1.0 );
	t.equal( z, NINF, 'returns -infinity' );

	z = copysign( NINF, 1.0 );
	t.equal( z, PINF, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns a negative number', opts, function test( t ) {
	var z;

	z = copysign( -1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	z = copysign( 1.0, NINF );
	t.equal( z, -1.0, 'returns -1' );

	t.end();
});

tape( 'the function supports copying a sign from `0`', opts, function test( t ) {
	var x;
	var z;

	x = 3.14;

	z = copysign( x, 0.0 );
	t.equal( z, 3.14, 'returns +3.14' );

	z = copysign( x, -0.0 );
	t.equal( z, -3.14, 'returns -3.14' );

	t.end();
});

tape( 'the function supports copying a sign to `0`', opts, function test( t ) {
	var z;

	z = copysign( -0.0, 1.0 );
	t.equal( isPositiveZero( z ), true, 'returns +0' );

	z = copysign( 0.0, -1.0 );
	t.equal( isNegativeZero( z ), true, 'returns -0' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/copysign/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/copysign/test")
},{"./fixtures/julia/data.json":73,"@stdlib/constants/float64/ninf":60,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/assert/is-negative-zero":67,"@stdlib/math/base/assert/is-positive-zero":69,"@stdlib/utils/try-require":130,"path":144,"tape":244}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var Number = require( './number.js' );


// EXPORTS //

module.exports = Number;

},{"./number.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fromWords = require( './main.js' );


// EXPORTS //

module.exports = fromWords;

},{"./main.js":80}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
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

},{"./indices.js":79,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":48}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var getHighWord = require( './main.js' );


// EXPORTS //

module.exports = getHighWord;

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

},{"./high.js":81,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = require( './main.js' );


// EXPORTS //

module.exports = toWords;

},{"./main.js":86}],85:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":48,"dup":79}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './to_words.js' );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":85,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],88:[function(require,module,exports){
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
var reFunctionName = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( reFunctionName, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = reFunctionName;

},{"./main.js":89,"./regexp.js":90,"@stdlib/utils/define-nonenumerable-read-only-property":106}],89:[function(require,module,exports){
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

},{"./main.js":89}],91:[function(require,module,exports){
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
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e');
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

},{"./is_number.js":94}],92:[function(require,module,exports){
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

},{"./is_number.js":94,"./zero_pad.js":98}],93:[function(require,module,exports){
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

var formatInterpolate = require( './main.js' );


// EXPORTS //

module.exports = formatInterpolate;

},{"./main.js":96}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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
var isnan = isNaN; // NOTE: We use the global `isNaN` function here instead of `@stdlib/math/base/assert/is-nan` to avoid circular dependencies.
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

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
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ?
						String( token.arg ) :
						fromCharCode( num );
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

},{"./format_double.js":91,"./format_integer.js":92,"./is_string.js":95,"./space_pad.js":97,"./zero_pad.js":98}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

var formatTokenize = require( './main.js' );


// EXPORTS //

module.exports = formatTokenize;

},{"./main.js":100}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

var format = require( './main.js' );


// EXPORTS //

module.exports = format;

},{"./main.js":103}],102:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"dup":95}],103:[function(require,module,exports){
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
	var tokens;
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	tokens = tokenize( str );
	args = new Array( arguments.length );
	args[ 0 ] = tokens;
	for ( i = 1; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":102,"@stdlib/string/base/format-interpolate":93,"@stdlib/string/base/format-tokenize":99}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

},{"./main.js":105}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":39,"@stdlib/regexp/function-name":88,"@stdlib/utils/native-class":125}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var setNonEnumerableReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

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

},{"@stdlib/utils/define-property":111}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{"./define_property.js":109}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":108,"./has_define_property_support.js":110,"./polyfill.js":112}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":101}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":116,"./polyfill.js":117,"@stdlib/assert/is-function":45}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

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

},{"./detect.js":113}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":114}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":118,"@stdlib/utils/native-class":125}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

/**
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],120:[function(require,module,exports){
(function (global){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

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

// MODULES //

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
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
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":119,"./global.js":120,"./self.js":123,"./window.js":124,"@stdlib/assert/is-boolean":33,"@stdlib/string/format":101}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './native_class.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":126,"./polyfill.js":127,"@stdlib/assert/has-tostringtag-support":20}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":128}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":128,"./tostringtag.js":129,"@stdlib/assert/has-own-property":16}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

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

var tryRequire = require( './try_require.js' );


// EXPORTS //

module.exports = tryRequire;

},{"./try_require.js":131}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":41}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":133,"./fixtures/re.js":134,"./fixtures/typedarray.js":135}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":121}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":132,"./polyfill.js":137,"./typeof.js":138}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":104}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":104}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){

},{}],141:[function(require,module,exports){
arguments[4][140][0].apply(exports,arguments)
},{"dup":140}],142:[function(require,module,exports){
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
},{"base64-js":139,"buffer":142,"ieee754":230}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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
},{"_process":236}],145:[function(require,module,exports){
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

},{"events":143,"inherits":231,"readable-stream/lib/_stream_duplex.js":147,"readable-stream/lib/_stream_passthrough.js":148,"readable-stream/lib/_stream_readable.js":149,"readable-stream/lib/_stream_transform.js":150,"readable-stream/lib/_stream_writable.js":151,"readable-stream/lib/internal/streams/end-of-stream.js":155,"readable-stream/lib/internal/streams/pipeline.js":157}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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
},{"./_stream_readable":149,"./_stream_writable":151,"_process":236,"inherits":231}],148:[function(require,module,exports){
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
},{"./_stream_transform":150,"inherits":231}],149:[function(require,module,exports){
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
},{"../errors":146,"./_stream_duplex":147,"./internal/streams/async_iterator":152,"./internal/streams/buffer_list":153,"./internal/streams/destroy":154,"./internal/streams/from":156,"./internal/streams/state":158,"./internal/streams/stream":159,"_process":236,"buffer":142,"events":143,"inherits":231,"string_decoder/":243,"util":140}],150:[function(require,module,exports){
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
},{"../errors":146,"./_stream_duplex":147,"inherits":231}],151:[function(require,module,exports){
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
},{"../errors":146,"./_stream_duplex":147,"./internal/streams/destroy":154,"./internal/streams/state":158,"./internal/streams/stream":159,"_process":236,"buffer":142,"inherits":231,"util-deprecate":252}],152:[function(require,module,exports){
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
},{"./end-of-stream":155,"_process":236}],153:[function(require,module,exports){
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
},{"buffer":142,"util":140}],154:[function(require,module,exports){
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
},{"_process":236}],155:[function(require,module,exports){
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
},{"../../../errors":146}],156:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],157:[function(require,module,exports){
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
},{"../../../errors":146,"./end-of-stream":155}],158:[function(require,module,exports){
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
},{"../../../errors":146}],159:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":143}],160:[function(require,module,exports){
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

},{"./":161,"get-intrinsic":225}],161:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":224,"get-intrinsic":225}],162:[function(require,module,exports){
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

},{"./lib/is_arguments.js":163,"./lib/keys.js":164}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],165:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = require('has-property-descriptors')();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
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

},{"has-property-descriptors":226,"object-keys":234}],166:[function(require,module,exports){
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

},{"./ToNumber":197,"./ToPrimitive":199,"./Type":204}],168:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
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
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
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

},{"../helpers/isFinite":213,"../helpers/isNaN":215,"../helpers/isPrefixOf":216,"./ToNumber":197,"./ToPrimitive":199,"./Type":204,"get-intrinsic":225}],169:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

},{"get-intrinsic":225}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

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

},{"./DayWithinYear":173,"./InLeapYear":177,"./MonthFromTime":187,"get-intrinsic":225}],171:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":220,"./floor":208}],172:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":208}],173:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":171,"./DayFromYear":172,"./YearFromTime":206}],174:[function(require,module,exports){
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

},{"./modulo":209}],175:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

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

},{"../helpers/assertRecord":212,"./IsAccessorDescriptor":178,"./IsDataDescriptor":180,"./Type":204,"get-intrinsic":225}],176:[function(require,module,exports){
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

},{"../helpers/timeConstants":220,"./floor":208,"./modulo":209}],177:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

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

},{"./DaysInYear":174,"./YearFromTime":206,"get-intrinsic":225}],178:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":212,"./Type":204,"has":229}],179:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":232}],180:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":212,"./Type":204,"has":229}],181:[function(require,module,exports){
'use strict';

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"../helpers/assertRecord":212,"./IsAccessorDescriptor":178,"./IsDataDescriptor":180,"./Type":204}],182:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

},{"../helpers/isPropertyDescriptor":217,"./IsAccessorDescriptor":178,"./IsDataDescriptor":180,"./Type":204}],183:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/timeConstants":220}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"./DateFromTime":170,"./Day":171,"./MonthFromTime":187,"./ToInteger":196,"./YearFromTime":206,"./floor":208,"./modulo":209,"get-intrinsic":225}],185:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/timeConstants":220,"./ToInteger":196}],186:[function(require,module,exports){
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

},{"../helpers/timeConstants":220,"./floor":208,"./modulo":209}],187:[function(require,module,exports){
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

},{"./DayWithinYear":173,"./InLeapYear":177}],188:[function(require,module,exports){
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

},{"../helpers/isNaN":215}],189:[function(require,module,exports){
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

},{"../helpers/timeConstants":220,"./floor":208,"./modulo":209}],190:[function(require,module,exports){
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

},{"./Type":204}],191:[function(require,module,exports){
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


},{"../helpers/isFinite":213,"./ToNumber":197,"./abs":207,"get-intrinsic":225}],192:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":220,"./DayFromYear":172}],193:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":220,"./modulo":209}],194:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],195:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":197}],196:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/isNaN":215,"../helpers/sign":219,"./ToNumber":197,"./abs":207,"./floor":208}],197:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	// eslint-disable-next-line no-control-regex
	var trimmed = prim.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, '');
	if ((/^0[ob]|^[+-]0x/).test(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":199}],198:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":169,"get-intrinsic":225}],199:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":221}],200:[function(require,module,exports){
'use strict';

var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":179,"./ToBoolean":194,"./Type":204,"get-intrinsic":225,"has":229}],201:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":225}],202:[function(require,module,exports){
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

},{"../helpers/isFinite":213,"../helpers/isNaN":215,"../helpers/sign":219,"./ToNumber":197,"./abs":207,"./floor":208,"./modulo":209}],203:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":197}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":171,"./modulo":209}],206:[function(require,module,exports){
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

},{"call-bind/callBound":160,"get-intrinsic":225}],207:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":225}],208:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],209:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":218}],210:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":220,"./modulo":209}],211:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
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

},{"./5/AbstractEqualityComparison":167,"./5/AbstractRelationalComparison":168,"./5/CheckObjectCoercible":169,"./5/DateFromTime":170,"./5/Day":171,"./5/DayFromYear":172,"./5/DayWithinYear":173,"./5/DaysInYear":174,"./5/FromPropertyDescriptor":175,"./5/HourFromTime":176,"./5/InLeapYear":177,"./5/IsAccessorDescriptor":178,"./5/IsCallable":179,"./5/IsDataDescriptor":180,"./5/IsGenericDescriptor":181,"./5/IsPropertyDescriptor":182,"./5/MakeDate":183,"./5/MakeDay":184,"./5/MakeTime":185,"./5/MinFromTime":186,"./5/MonthFromTime":187,"./5/SameValue":188,"./5/SecFromTime":189,"./5/StrictEqualityComparison":190,"./5/TimeClip":191,"./5/TimeFromYear":192,"./5/TimeWithinDay":193,"./5/ToBoolean":194,"./5/ToInt32":195,"./5/ToInteger":196,"./5/ToNumber":197,"./5/ToObject":198,"./5/ToPrimitive":199,"./5/ToPropertyDescriptor":200,"./5/ToString":201,"./5/ToUint16":202,"./5/ToUint32":203,"./5/Type":204,"./5/WeekDay":205,"./5/YearFromTime":206,"./5/abs":207,"./5/floor":208,"./5/modulo":209,"./5/msFromTime":210}],212:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var isMatchRecord = require('./isMatchRecord');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Desc) {
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},
	// https://262.ecma-international.org/13.0/#sec-match-records
	'Match Record': isMatchRecord
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (Type(value) !== 'Object' || !predicate(value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"./isMatchRecord":214,"get-intrinsic":225,"has":229}],213:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],214:[function(require,module,exports){
'use strict';

var has = require('has');

// https://262.ecma-international.org/13.0/#sec-match-records

module.exports = function isMatchRecord(record) {
	return (
		has(record, '[[StartIndex]]')
        && has(record, '[[EndIndex]]')
        && record['[[StartIndex]]'] >= 0
        && record['[[EndIndex]]'] >= record['[[StartIndex]]']
        && String(parseInt(record['[[StartIndex]]'], 10)) === String(record['[[StartIndex]]'])
        && String(parseInt(record['[[EndIndex]]'], 10)) === String(record['[[EndIndex]]'])
	);
};

},{"has":229}],215:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],216:[function(require,module,exports){
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

},{"call-bind/callBound":160}],217:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"get-intrinsic":225,"has":229}],218:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],219:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{"./helpers/isPrimitive":222,"is-callable":232}],222:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],223:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],224:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":223}],225:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

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

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
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
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

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
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
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
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

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

},{"function-bind":224,"has":229,"has-symbols":227}],226:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
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

},{"get-intrinsic":225}],227:[function(require,module,exports){
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

},{"./shams":228}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":224}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

module.exports = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

},{}],233:[function(require,module,exports){
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

},{"./isArguments":235}],234:[function(require,module,exports){
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

},{"./implementation":233,"./isArguments":235}],235:[function(require,module,exports){
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

},{}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
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
},{"_process":236,"through":250,"timers":251}],238:[function(require,module,exports){
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

},{"buffer":142}],239:[function(require,module,exports){
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

},{"es-abstract/es5":211,"function-bind":224}],240:[function(require,module,exports){
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

},{"./implementation":239,"./polyfill":241,"./shim":242,"define-properties":165,"function-bind":224}],241:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":239}],242:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":241,"define-properties":165}],243:[function(require,module,exports){
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
},{"safe-buffer":238}],244:[function(require,module,exports){
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
},{"./lib/default_stream":245,"./lib/results":247,"./lib/test":248,"_process":236,"defined":166,"through":250,"timers":251}],245:[function(require,module,exports){
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
},{"_process":236,"fs":141,"through":250}],246:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":236,"timers":251}],247:[function(require,module,exports){
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
},{"_process":236,"events":143,"function-bind":224,"has":229,"inherits":231,"object-inspect":249,"resumer":237,"through":250,"timers":251}],248:[function(require,module,exports){
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
},{"./next_tick":246,"deep-equal":162,"defined":166,"events":143,"has":229,"inherits":231,"path":144,"string.prototype.trim":240}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
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
},{"_process":236,"stream":145}],251:[function(require,module,exports){
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
},{"process/browser.js":236,"timers":251}],252:[function(require,module,exports){
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
},{}]},{},[74,75]);
