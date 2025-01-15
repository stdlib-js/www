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

},{"@stdlib/utils/native-class":100}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":100}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":100}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":100}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":59}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_p.js":55,"./polyval_q.js":56,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":49,"@stdlib/number/float64/base/get-high-word":62,"@stdlib/number/float64/base/set-high-word":65}],55:[function(require,module,exports){
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
* Evaluate the signum function for a double-precision floating-point number.
*
* @module @stdlib/math/base/special/signum
*
* @example
* var signum = require( '@stdlib/math/base/special/signum' );
*
* var sign = signum( -5.0 );
* // returns -1.0
*
* sign = signum( 5.0 );
* // returns 1.0
*
* sign = signum( -0.0 );
* // returns -0.0
*
* sign = signum( 0.0 );
* // returns 0.0
*
* sign = signum( NaN );
* // returns NaN
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

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the signum function for a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var sign = signum( -5.0 );
* // returns -1.0
*
* @example
* var sign = signum( 5.0 );
* // returns 1.0
*
* @example
* var sign = signum( -0.0 );
* // returns -0.0
*
* @example
* var sign = signum( 0.0 );
* // returns 0.0
*
* @example
* var sign = signum( NaN );
* // returns NaN
*/
function signum( x ) {
	if ( x === 0.0 || isnan( x ) ) {
		return x; // addresses both +-0
	}
	return ( x < 0.0 ) ? -1.0 : 1.0;
}


// EXPORTS //

module.exports = signum;

},{"@stdlib/math/base/assert/is-nan":49}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/assert/is-little-endian":34}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":61,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],64:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":61}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":64,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var signum = require( '@stdlib/math/base/special/signum' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a Laplace distribution with location parameter `mu` and scale parameter `b`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0, 2.0 );
* var y = quantile( 0.5 );
* // returns 10.0
*
* y = quantile( 0.8 );
* // returns ~11.833
*/
function factory( mu, b ) {
	if (
		isnan( mu ) ||
		isnan( b ) ||
		b <= 0.0
	) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a Laplace distribution.
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
		return mu - ( b * signum( p-0.5 ) * ln( 1.0 - (2.0 * abs( p-0.5 )) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"@stdlib/math/base/special/ln":53,"@stdlib/math/base/special/signum":57,"@stdlib/utils/constant-function":91}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Laplace distribution quantile function.
*
* @module @stdlib/stats/base/dists/laplace/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/laplace/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~0.916
*
* var myQuantile = quantile.factory( 10.0, 2.0 );
* y = myQuantile( 0.5 );
* // returns 10.0
*
* y = myQuantile( 0.8 );
* // returns ~11.833
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":67,"./main.js":69,"@stdlib/utils/define-nonenumerable-read-only-property":93}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var signum = require( '@stdlib/math/base/special/signum' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Evaluates the quantile function for a Laplace distribution with location parameter `mu` and scale parameter `b` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~0.916
*
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns 4.0
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
function quantile( p, mu, b ) {
	if (
		isnan( mu ) ||
		isnan( b ) ||
		isnan( p ) ||
		b <= 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	return mu - ( b * signum( p-0.5 ) * ln( 1.0 - ( 2.0 * abs( p-0.5 ) ) ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"@stdlib/math/base/special/ln":53,"@stdlib/math/base/special/signum":57}],70:[function(require,module,exports){
module.exports={"expected":[-13.067648164242573,2.4093161944025576,13.444129635398802,-12.911099479894537,12.884266958552253,0.7638759021292502,46.0515572033364,-8.044253264737339,11.795318590302847,39.164505462206364,20.419630101519896,-26.265758568422697,1.6763001250489258,-13.877017753073154,-22.48781600936112,9.703041548494006,0.1525676462711292,19.555718690421674,-4.702057347963664,0.11202956770488061,-7.339506425477775,-22.38861952069082,-5.592587433483092,5.7961156256824395,3.7935783667296485,3.348953151015622,0.35433159049340723,0.24659735063909102,-1.488328908911853,-35.08815406209421,1.2122571629431813,0.5220073821712318,-4.952053971785191,-33.95551178861175,-2.2748575072139046,22.240763687402268,1.8062849187632346,1.7801047912835999,-39.14901308400114,11.708907151007871,3.0744957227778826,2.6381960410367933,-3.899244299216872,21.91549338680353,2.3273052538438765,-2.0189516737659257,46.41184845791761,-8.362859625424974,3.0969313025786085,-22.19540583475145,-8.510360725570893,-6.246560899492199,-0.172537189128746,0.2543161945034871,-36.01671400563179,5.070887713372915,20.217534522318267,0.782295018189543,-2.736396475573932,19.132950127290336,0.032442894290724444,27.107293928041898,8.756113819564838,7.636756275279937,20.566653025879965,-5.034432095482414,-0.5843543174140229,0.625500516916749,0.5238007518857145,-3.6020771287264584,-2.1610400191181873,2.1168918437621906,1.6407990909465022,-2.0194381708720757,0.63887725993201,-27.875200834536606,0.9096461240596004,4.717114276944618,-97.14293570025869,-10.195243085032361,-28.977563462797637,-0.9744713673898018,9.23544820082108,-3.491668572660413,-2.4713434072463243,-22.980645993490963,-10.916992846441836,2.6915132185914166,-1.3364799216620407,-5.085359382114392,19.57232453580424,15.23499974555629,-2.2254756379429343,-0.10116698718792738,0.09117608216405895,-13.334859116995922,-3.7490772856365973,-6.2952703673774835,-1.958203230730351,1.0868037193376092,-9.746078149259233,31.07033114023829,6.522483314888204,0.5124848916090248,-11.384202961214369,-80.84544577630798,17.949239268845663,14.591296770712102,-3.5835119838364067,3.060604554934437,7.180868663493488,-3.442766883654984,-15.127505725343386,14.10958603654691,7.7094536349499645,-13.834756178421415,10.007221054273227,-0.0792223239008475,5.088684589600139,0.8418017294072233,-25.372504485394966,-0.3886490890362555,18.227506254363607,0.8463015521515311,-7.079966375982479,-0.18128903312196565,-2.6792719284895434,-0.3040922505836605,0.025410055879460325,1.0836984365551687,-2.9129466361039533,26.479108912103897,0.5113785281141339,1.9320782293490768,-43.8011636602821,-42.35593376696892,-32.372208006171526,0.22209934999857905,44.792563063002724,7.085024423476642,14.126787496623445,-12.259778247930322,20.78614919516194,36.300659412830825,-9.339001110287992,10.557882148760982,3.8820049061055437,-0.056345026682839805,-2.337909616011821,7.313947175524893,-55.30779505443213,3.4693986594185118,0.1801539643149927,7.653689471398435,3.731980696957306,-7.49501685270451,-33.05774408193701,-4.108496876260878,-30.760743162404047,0.44194163699510697,0.6400346598165016,-0.8370033450329888,1.2256289867788754,43.41529781521106,1.7924945896255842,-6.704761681059284,5.745035319762177,0.39388518846083853,-6.076897792586465,1.9111106454573956,-20.32192370899544,-12.887434230751326,39.49887350021057,-9.73301046623175,6.570205178302845,0.354016370920921,-13.69108186207557,-30.40252849811605,10.080764207181662,-20.672032611716453,1.4909065087323643,0.18879564175518238,0.6932934848477623,-1.190067892218075,19.3025523155897,-18.539994608888538,12.482054431880986,47.17656768920189,12.964987432266428,1.37820854287177,2.883567328824605,2.312727501252774,21.829041877788708,-6.979061727697871,-10.222207749682559,1.5423661633856132,16.45708034850894,1.4968574097918041,15.068579294165122,0.545307241633634,17.016013594363276,53.78501795579133,0.44234556176966716,-0.06545078579841473,0.25042389503881524,-1.7221254387890002,12.57416964564425,-0.6914727891310518,-1.6601829077561248,-14.981183615306936,2.442778855799151,21.583712681790722,0.03630414873771892,8.207050248272274,2.4482850514377237,61.62405831932063,2.129633347583154,-2.584697355550308,3.0499375714355006,-15.816831157989073,10.063522062285802,2.7046543664694305,-3.226864298898354,-21.024748408641834,-27.643623105734896,0.614554762221406,10.70642637269873,-1.8758785437134775,-55.43674442957521,13.437331081019193,10.118634473954765,-17.261104930994982,-0.33580533530736045,9.447134468369837,-14.522950657575246,7.32021801946864,65.7170800296903,-0.24500700924716912,0.6811699438909701,6.232394453284144,4.442992702637857,-6.711480325814445,5.581363781342615,-3.339287467549414,11.361628510105565,7.301063546721926,-15.332367310696783,-17.459589800246302,13.950341191883082,-17.46034190415649,-8.691635932762573,-11.3659685573596,-78.39190871013167,3.401161624055555,-4.619624134600977,-3.732715103461145,-1.727652047713509,-17.616636410924787,2.087470549154738,-8.13230011188932,3.109084620637594,9.104388663254005,-3.710840615329703,0.5781058472325097,1.9291599989920647,-20.28371184513451,0.5663678141586364,-19.024948416381925,0.4555202690228105,15.748873752460181,-8.210744747862114,-11.554241168879216,-2.4744854971620707,0.9108590806241939,22.503703315259735,4.457721210669952,7.414889404266659,-2.1455476540144325,2.530817895082069,5.584261271210416,-10.198543942434755,1.0759214013906606,4.122590568442506,-6.886296503608689,8.558523705429801,13.077534894393889,47.04782407431507,-6.757957820467412,0.9061443039428133,1.0990363519308017,3.0026104392678765,-6.845276796856022,13.206582012194723,7.614170829605438,-8.012748685283247,-4.114489544127509,0.550882830386225,-12.262508932183513,1.00291245384146,0.5743883058109205,10.178171011332326,5.4406826779964454,-3.492280173511534,-0.08181668723383681,-1.8571970996372151,-0.8040333143206073,-0.21175015828604016,3.5886316138209073,8.170178852230466,-0.4276634494632039,5.069323443095435,-4.096472012891328,1.7431826813024869,2.1968605930309204,1.8137741252409636,-1.8024459150515042,0.38233102813399056,1.0442925674991006,-5.9673771995354,82.28418194018303,1.9614410544388345,-23.59096467627002,33.15948927495688,5.42991714122843,36.15818564241029,-3.306737990097898,0.23079518413336844,-6.189835403055859,-0.1441416224197234,-1.461451915253695,0.09900924217896553,-1.946253846070327,1.4583599863645205,0.36857217071326465,-6.214288123847869,16.268438249624136,-14.953105428922298,-3.2368096493991194,-6.382176407468759,-24.378774776845425,-3.558778039813313,3.0235895951723943,-2.7365060711669975,23.034020571813837,0.4410986783334334,0.4120047292820334,-0.7861208308688603,0.8296669443966364,0.6441235903715817,-8.315977909766666,8.33514592707436,-1.6415040953232454,-0.8863870893633079,6.069081789434805,1.9958136051654845,-0.8290704006203766,52.89981511356469,12.470244038399649,-2.590916993027352,-6.284574196788138,-1.0453504413204693,8.692817628615972,11.05232543943005,2.9776823968485444,2.2566634368404035,-2.781243704238813,19.024777219940233,33.18069200075913,1.0849967975784303,2.0132396195913955,0.8531274076560089,-9.484008183666546,-1.3504518478803371,13.583231196820398,9.143028469190856,12.043938199881904,3.1942305486092426,-50.54351636677671,0.4300251123208592,12.036383392401289,-5.22770298824678,-21.300186485585687,0.4367156571041224,5.223035038100785,3.3388255515267717,-5.360789697087497,-0.7992238057499992,8.23928308421539,-1.8189258932836478,-4.259401527731366,7.304718796452388,17.740366149769077,0.39765000344840357,-8.148309240933038,2.063122237125072,3.0245274079878763,13.165540484848,3.477919283104111,-4.320957519382516,2.1731799155565676,-13.902237867237753,-0.3871906108766976,2.2371483184929915,2.708376059844241,14.28990354451209,-2.741049428707812,23.792233571114707,0.2920993329450039,47.51803051688831,-13.557714070025355,14.891985986019511,1.4588834772350792,6.559221292454969,-55.91320030869763,-5.772405536904032,-15.823225402294819,-0.46088430644433387,1.4050680560182314,-0.5940438026861337,-25.135215938832616,-21.26623519374629,-27.821520525833183,-23.552888531505236,-10.69430539442025,0.7174865579003595,-6.328017550089896,8.494142162460891,7.560828063041745,-9.642509509533388,-62.15574462195455,0.6565687014403927,-60.426863169835684,-0.19902772798150026,1.216807123875743,-0.07109977056317351,28.280227202146552,12.314092205927562,36.82731664065514,-5.262364836229718,6.597298970802445,38.97765839100634,15.14004643204238,2.285620252668731,-8.764131763891509,13.703777382845626,1.7441276605443061,15.671869442740766,7.049282792812596,-4.9371393009219675,-23.45024688632505,6.7166701472671155,3.6790123190043067,-0.6369934457482138,-1.6968783167692132,-0.6728960527125754,-22.814528938379766,-6.763367876130732,-0.683731367737896,-17.47102903109264,-2.143625449175681,15.618418079324169,-41.21500206559465,10.235497163184204,-4.1830131632575185,22.498668732421443,-3.4831283025775415,-4.757149842410502,-0.6202004335380893,-8.42798756928201,-7.002194400827129,-4.07876799173626,6.374959681515891,-12.033701639617808,4.602858318912581,-8.20016430541655,-17.967608889437074,2.424335538121017,-19.721950221120526,4.236668180318437,4.448012119427923,15.933194114211489,48.93061570322158,-3.113050241021834,22.265910576792592,-7.2005759130486044,-14.041541305120845,1.059133504556462,17.97031169841593,-0.3236675574377713,3.4181285493764735,-2.1538350107166,-19.078285239695084,-3.531432243201672,-1.5627539233663807,1.6199626796226423,-11.13902940532353,1.5108869943566305,-4.912166375809511,-16.405255840214814,0.30185077881280936,7.489986041685208,3.1753061183488547,-3.340972313009924,0.7746924408058801,11.503878879299723,-31.608430966937792,2.0682968314820713,3.283389679337353,12.123948605530419,-16.89194794051691,3.571151976961615,-0.4188984132652984,-19.81675974105768,11.520388970355324,-1.3055858093286603,-10.293925243114785,4.418113830246797,-0.21608290469625951,8.4122041165044,31.029666289333335,13.209073279965974,0.8867765293405969,14.831186447220716,-3.8110299192332064,-9.522712862719832,-6.404168371503591,0.28990193487311033,-11.1930543814243,0.0824064814792419,12.721722069619476,-4.937242948137797,-0.48690614959139467,13.662799642724853,-0.13200174875835158,0.8048599636677282,-6.9463592836968395,9.325160013936104,-1.605011574961956,0.7124948494345613,-18.522019289912084,-0.3158463114653097,-4.3419597604251665,2.208889965165449,-14.65183012789414,26.351388792911845,-9.2071202090531,0.8218394168860655,16.795763971978733,-0.000421485772687899,4.533652189449071,-0.033458929142881566,-92.56926287804288,-0.38575317911037366,-3.207563718501512,-24.262726467300254,-4.203316197149959,-4.32166575138762,-1.5318848290453406,-3.6226601073849642,-8.4415022604611,1.134804237093805,-0.8526854376258941,-3.7651232573390647,-0.48081502846193347,-17.87404340529263,-8.140901435929333,-0.8538501119622273,28.30194901357517,-32.622186667855225,4.450125453018346,18.19826932229718,11.903273358309436,7.370354048425513,2.594035009739291,6.843556044221747,11.62714662625497,-0.4385968263883824,-3.636689664515207,3.9565201657092564,19.01755749459696,39.300920416751126,0.11917416941025732,5.569212597475396,6.926543155779189,0.34262249017682944,4.387586556803555,0.47186940870284066,3.073562423275052,-19.67845897115868,2.597408868271083,-1.32017859241745,-4.044542788791384,-15.394522767568443,-0.807545674912749,54.451126706172786,2.2621063875409746,-0.5030080547572101,0.06417790745473906,9.333835707513325,9.44619316604554,18.360793047748825,5.840183754717196,-0.5506803512780347,2.2689495148615038,-15.018360566359062,-3.8760856630416853,-39.51419454023434,0.7002349911114572,0.6100591791903547,2.4821807608485136,6.943822382525268,-3.4401081878831183,0.8473323545583038,-1.1405277070167097,1.4487169120316188,-37.837070433301285,0.4312249986737734,-18.044675405300847,0.35772624559740074,17.57559107309611,17.253822734015213,-0.8138258234897597,-39.201030048000355,11.936155985791785,-33.939521362499974,1.2062852753646978,-4.660217071363105,0.520710413437945,0.4034882479868153,1.7745775244711257,0.023505017266560235,-13.15315873359281,-33.32314676657703,-1.084047860324344,-12.346678001298882,-23.850192356934585,-0.13967407248486663,-64.47867537232557,2.036986471235596,13.273337404562682,-5.231309852701416,0.6357520523428911,0.0732118119618671,1.035030932748404,-26.372441082716527,0.41486361919352843,21.699625013356894,-1.8781800930215715,3.8328079291183936,2.631769987424146,2.946348274799478,8.444905402713783,0.7861694090620721,3.0372343841893903,2.0244574426374977,7.797019341247363,-3.4651453556654537,4.707921037398022,-12.131817888305076,0.8989959807801188,5.408820787004906,0.6187366788417614,0.800806334253054,-4.282158647803743,9.265962272192464,0.051650984931619015,0.6245278552217718,-12.970503420545352,-0.5278237196687084,22.233800087212522,2.432203680397534,14.018962161085073,-1.0327465281291304,17.730104014460075,1.5262596609338006,0.04642088320951876,-4.851642318107524,3.081327355103687,-11.844339769208837,-0.5295248427172153,3.0140603790933023,-7.92899027261324,-4.303974234549478,-11.60892835331629,-3.3805870459785234,21.76747000566513,-0.33312884644485424,21.88002622191939,8.296524572546026,-18.993839792407986,-0.09834187109565184,-12.702880157013412,11.68974803665758,-79.69296295770701,-16.869300137987942,4.311903529930552,-4.536770377317059,0.8810339499882384,-8.749480410701864,-23.341693163804152,-2.4956804463805327,-0.5212639698191439,24.78049861902489,-0.6348334280039682,2.3551563143544296,-13.837595471141643,-12.372893025660536,-5.136574633627002,-18.98219050382079,10.376822531820553,28.638254900804117,-7.1896576946871935,0.5457780161643127,-0.9576156975885022,-7.175863997306109,-11.901559204581607,-27.100175272877117,68.88260525247388,0.13008749833540667,-0.25499339543823446,-0.1162970720586578,16.47729194978034,1.1427478386915721,-11.27458643735082,5.9690722835325785,7.309389069292674,-31.255074473477556,2.5826978431021814,0.7359921033955812,-1.1092870989062225,5.811346478548099,34.059124519062586,-25.40947621191032,-5.379969175991009,-0.8976624359884833,3.440407688848892,-11.270636963054534,1.017980247760491,-8.582928889145,-4.520306975428186,4.784448959184534,4.832389335865657,2.8700237383646923,-9.633238442541728,-0.8643258380784778,5.862085732105273,-18.406456260050664,1.1679059372027891,11.423404793944764,41.27310562967528,-18.86243101483377,-20.999944567794955,5.0364530046285,5.969298206202808,36.719801521037894,2.014038513364252,0.021900362253311823,33.8280718576228,-7.574229047906743,-41.90571220722159,3.515974011606919,0.6816234039987488,1.4029410766582038,8.271559202101177,-0.9741556777379625,1.3971281685119423,4.844471091188037,-19.477684793367384,8.581477101865095,-7.656013997285669,12.834456940816825,5.046038979902156,3.3729294727014656,-0.6720080942633159,7.35121919137137,51.87193003317327,5.201696364759414,-2.7194604558637194,0.1928000838779521,1.046833126800455,-28.048527376147767,3.574449567704855,-25.666731075463396,-24.263651262737152,14.518135224433724,-14.502185260393482,-0.9980042197442431,13.710052712099753,-25.217572625684483,-7.373407568882115,1.5900406468336385,-6.589256631768155,-1.7627346612693766,-7.573448552375954,-2.776026720258959,0.18262078748347033,-1.2347370969492661,-6.138174870998174,0.4803606712037801,-17.80546178285758,37.95412189854539,-1.7511281514973334,-13.939949159680236,4.727878342455481,-8.174838298925703,16.29521871078352,-1.9031288235513142,13.239931254664297,5.191592990060798,7.826403340201684,-3.7773056032465675,-21.42428106972612,0.036925630700976764,-0.06795688221591933,2.6480173581618063,-2.0599013205866292,1.5239636696123937,-7.51243946954124,-1.5038670593385035,-8.174451446369387,-2.1861499197175016,25.23517777385862,0.4410421940979717,-10.92335226924045,-3.6766510709097213,-8.295162414487987,6.809721434424573,-1.1836923060628308,-20.91786823522828,-0.07396165770501789,-10.33615392818869,-0.29705610842998154,0.10329023390314304,2.74080723959735,1.6746585391798656,62.92304427627447,-1.352426745411842,-3.3456663289230786,-8.956382774694987,-11.915059621113613,3.0190195163947586,4.676854775668034,-4.951167199147853,-138.14199288933102,-2.8378253870260837,-0.8765018319896272,0.43099473103499036,10.449005590219448,-1.8604107953309696,0.3928325915383304,-9.118406543150927,-3.048431268656872,4.449055219124761,5.1058613609898025,9.711869009478635,22.48086628178428,-9.540047460296488,-11.579665525089943,0.7289758064096012,-5.723230591328138,-13.595388916147796,25.664812643836708,-8.439200338647252,-3.2260925197985886,10.454529898829508,-1.4450019726611771,14.479327194193168,-3.931042448635145,-0.2101816553045166,0.42066349069443065,3.6796039366718745,1.0208464469347653,1.97610811806527,-13.206420749128538,-0.5192847538317062,-16.033651023623865,1.9852727784854423,-0.7060582890903946,6.226801650786359,11.341665898113247,-8.351830984472189,25.362330199675792,3.4718608205608996,2.324403066477326,18.610190527213696,0.4853563282236095,26.94818496177233,-6.513192257609102,-8.867332931894614,-18.489541623606193,-16.14960299736854,-8.841050450932405,-0.5976896618099735,11.192236763234437,0.35227010025282035,16.140881645124818,-12.499926182513436,21.317037269119535,-24.175964728604022,6.718092019663713,0.3402765386065364,-14.652688873009824,-8.458066368822292,-16.150094617190522,4.086358333574685,32.87419953862597,1.6613661201381658,-3.68416322387424,1.102581120828924,-2.0454615136554426,8.947560418334593,-3.795728917537924,-6.277537709087009,-4.7041875662281125,10.635157573705893,-3.790800818028976,-4.279376714368978,-0.2857722947730207,16.836179057922752,37.77190417583474,-5.102948340897763,-21.468763593857147,1.7333303129991453,-38.026734505485955,11.096697518602092,8.066262018336573,1.182139875739244,76.81660466572471,2.198379261738922,-17.5666178508456,1.023382728369592,5.050574553150323,-24.90546593508717,0.5857317356804467,68.4422035018544,10.866409495214006,0.31761785097345574,9.907776488652395,-1.480258337403262,10.370209348382422,4.053532549676967,-22.088843650101524,2.7027431386502236,5.17118510321535,0.20832009263926612,1.4339767943853654,18.111576230726214,2.390188505439836,5.957962338689973,0.32139520364940755,-10.700459873976655,0.8130746658229514,-14.806919082979242,6.067391549720245,16.340018412180157,-7.3871261906905765,0.3921440748053751,-14.717892467461933,11.721114314595031,-27.951962925474497,-12.974751926352448,-14.049990716277115,21.413888019543375,-2.3363502777956753,-12.064749879750696,-1.0632660456304437,-2.9299609024163384,4.808056125054172,0.390589539158735,-8.266674298804036,-3.213651923983286,2.207162019059891,-0.551027599287877,-0.24642699440298627,0.9195470200450395,6.365300621276842,-28.342307851660877,-28.988090163658015,11.2969920388441,-7.868275466982424,0.49214817006340084,22.833391770191927,-16.956327206380863,-6.916933276172048,0.14750934183365338,3.757738796515793,-2.555377356334825,0.6146754669493368,-11.065237080536004,0.06444051110738216,0.04157756929528289,-9.870654552575203,8.942279502118561,2.6664134251666116,0.20596432241473456,3.7514064921878765,-5.51119051685092,4.220483899226398,2.8530734597205383,-2.390159647754729],"b":[11.70798624489581,10.493208018411245,18.30986599865057,9.262874025767097,10.925591528762485,1.9382696766766605,14.107180346845002,7.879593300885004,13.714249137629771,10.561350951846688,10.493658792677202,17.0151976661338,6.827501548125365,18.144250552817738,11.236203105830107,6.695097685645419,0.8124603184352086,17.82620762105033,15.328562422370528,0.009377035837152548,15.304808129308554,10.21103658706808,2.6827734404191528,16.4192002684571,3.209324056284606,5.952098303287636,1.8851776273154375,0.6461151062417869,2.594415894551383,18.624016358136814,13.98991063977951,9.438903832991329,10.826903424730272,11.69794369386953,6.778629777130587,13.592218511554911,4.011773180112885,15.684975108803329,17.452105584029415,7.072044130707913,10.233220880469629,2.8223729998772784,4.872228626348196,18.008646373917916,1.8137122341584355,11.053629107151313,17.92604502460549,7.6463214894339115,5.417459519879535,19.34382313315996,8.869872853827609,6.392830970701584,0.29570526515004136,1.6507278698938377,17.203702897753168,7.747431317035591,15.382612814173712,1.8543364555269948,3.553822724891287,15.207128871108399,1.2176548937609155,8.954888262797711,9.179794253692851,12.116377567475185,9.72064441075367,11.62286487893439,2.1050001689206743,0.07958543092134729,0.2798244809473971,8.254042718047057,7.281625608714051,1.7902855370139648,1.6721742659667749,2.4595274075474283,5.560861021684569,16.45877979663568,1.2796450045559027,11.245544512782919,18.693692761596594,2.309730468626361,9.48252859019453,1.1759030349912747,5.4260537206783965,7.520552153562772,12.59139598703399,15.131183906832986,18.320152844795604,17.899674554233364,2.6838124286009934,11.290545253925956,13.715292619479552,16.1597385780431,13.106580053278831,12.45004875842958,0.11939224467523601,18.561900742085115,3.7230658244654835,15.379951625572694,6.641888705851073,19.692199092548762,10.504178063241532,14.488486415305658,7.383657545079525,1.0578169411968874,13.016672588565118,19.48588357232412,12.8182995654827,19.39043874214907,12.008832927358007,18.44581685349069,8.022482256167045,4.2047485453988775,8.04773852017373,15.01436180050967,11.63259017947777,10.367254351075426,8.926334989548756,2.0180377191435728,4.977952750317476,0.31310585199473273,15.838316193213092,17.315911870385463,10.159544101552648,11.445751390818666,12.037729463808574,4.1635843667025885,2.3441021530155703,12.629085870708527,1.015277654269462,2.7525890325435842,12.531002200219842,12.309679617592014,1.0116757352393568,6.407403672457641,17.976999259977102,9.071726464346188,17.726849398740384,0.1857878132267965,15.782993093109994,13.105277244269526,2.9727382726597806,19.21317940461488,4.9238915327354205,15.599507253563365,12.555611497355454,18.952784922835995,5.637094420645554,2.1786912931858415,3.051200847312523,1.8155288134977843,14.809098867052427,13.290219532939563,11.417307451807677,7.173271025909562,3.4189537604920206,18.276028783564122,19.249153920770414,13.06297659828659,16.334532571124292,2.752641941441558,1.758151407584747,6.632509422629953,5.549645723459915,15.467666377655114,14.189026561649122,4.007466441326546,7.426583414570924,0.7231196062755529,14.296534312000833,4.725733413801323,13.183750240359702,14.089383100754498,13.588481511922508,10.013047420605595,4.860102938762947,4.76123622618339,17.82107251960648,19.156495044769905,5.631786908220042,15.237325166563117,0.6241185819700545,3.4846433131480747,5.652529507640125,2.225022780859973,14.655363844497597,17.300496579672036,2.786928294820208,12.33016078012032,14.258817325959189,3.9550868010289264,1.6582227735857114,9.312007794045094,9.698960409538318,16.628001088529466,3.78442472366757,7.1753186716436534,17.209776831713135,1.708987788695806,3.51401882546174,5.1321709142463545,10.894991290579416,16.549556144020713,3.5027249525306514,15.393666151533797,16.738717465779732,3.257601133180712,11.04877489718946,1.8863530965218533,4.364485541247656,10.277646007701623,6.883439588571552,14.885076876143494,18.326797662641027,8.881283781437936,8.66274025553726,18.628295634398707,11.328395873508548,10.942430463426795,14.742451029409747,3.456572676112599,9.720644851389238,3.3048861528393925,7.335199118694016,10.27885514883324,19.301507543259383,19.194176248439373,3.3818807287179897,2.8016868551410345,10.952924430312777,10.05238722840161,6.145248722475856,11.167347265271811,1.384396372208374,15.628410988267621,8.68726469022568,5.3633087154242975,18.407963683859883,5.511753377097199,0.0668482389887215,6.208657285482344,2.5528345097791405,11.840537833931023,12.120983001934986,12.21677872291027,3.2225901904072574,7.415811832778236,18.702127766651703,19.71989738178413,13.08021526186205,8.173539290979019,19.8913249114025,3.371652990338183,18.697158061532093,17.337101078972577,8.47667822706029,19.4382192381175,5.361112430595254,17.499175652240815,6.508185105620208,5.790421768978433,6.552198073855635,19.629106085407674,4.766953992115064,18.997648418921056,9.484570728700351,17.447063904998537,1.5413191627691436,6.338264088774794,3.7732183298405486,9.596365333920446,5.474314537993692,15.632114612884834,10.201853764222193,8.429453497692165,18.218716005419328,18.66588859964888,7.726739009399322,8.174405584064885,10.81679537440888,1.9558013512688843,17.054810587648763,3.8516979080281333,3.1222574537483094,17.389849075838693,8.495447399959861,16.81715421737315,16.574429572614797,10.979912158737001,2.3926223187618856,2.8928986740703655,3.125168418727031,8.968241636429193,14.519697133390714,13.115232178591762,15.504225408445564,6.2878452247067695,3.355533903860448,7.931036262461761,3.6380197271953385,0.1752477724460455,2.4942039236293168,5.6885142441260905,3.447874017370127,6.110849692827425,0.5008054822632424,1.7126677634187004,3.2415177249242033,16.735766706477392,13.588583990278206,3.001835431551716,7.159297129457576,7.061796931338931,3.5837387580308633,1.7913747727787444,3.683348550428267,8.367215014393206,3.7351049292338923,15.865133816283672,3.5297624851476295,18.943310178123475,6.013885082847565,15.082476376929659,13.955478332495929,3.6596802430471165,14.905092316738045,10.008860865746296,1.099491758501454,12.158040388442245,2.9486737495992665,2.7492185352678256,0.008368743508451182,1.7482174345215773,0.7460462735914275,12.564590317441402,9.634038381664238,11.044474722450097,8.753552390525115,5.282628318392137,5.5538210462120885,19.515263199813447,7.952456435929682,6.373596635700838,12.310618606008141,8.55368726925581,0.3549578103134676,1.3912611919442108,1.7973884779253746,2.3404501463075977,0.5826193851519257,12.875804932793837,4.1493100953628925,11.850484707473763,14.057554616406577,9.101466902643175,5.535289622857076,4.849920863206263,15.740670770081561,19.225949330063948,3.7852244744577135,7.114178144197352,7.453108769791843,13.146708910756807,11.529793685583192,11.606839361446216,3.0171605754115705,13.798459882656937,18.354065238456315,12.257183204072636,19.48618098038072,1.7081107958979347,0.08369578725226035,10.499476693806002,12.005823644901405,10.374330662292813,16.3788142167953,18.026220058543068,10.599509368065165,19.630045145732666,8.145067450405747,19.576660539548755,17.739036496726115,10.647083693764227,6.51935003217293,7.565046283022778,10.75327013148216,3.6172721491700743,6.925658460136597,10.898560866047319,6.69251469366964,6.477424472354634,9.135921125108606,9.445571917044635,10.46306909428154,2.8718827748631126,8.693370252827929,2.9791623425404934,9.458800306858105,8.08669760183995,9.622949210070107,18.07426191042214,6.37555858952124,11.11020090790436,6.405293071133915,1.8528131554547045,12.188227065319408,1.5059901529108721,19.485616433663605,17.693049115218965,18.38583917241416,8.12474475644831,11.545021426588683,8.435237727703392,9.039263638932296,15.34296504723251,9.6090545962385,6.755755098013987,1.5057726623411316,6.405701145252585,1.812085479466834,13.563031246871976,14.835407114583749,17.475948185126292,13.581659627867015,14.263342387901186,9.319168364576758,15.124297707765288,18.39647886959518,13.968169845425905,15.730900623432582,18.145857514032517,15.845071808511237,10.483492613570098,3.1535715524723162,3.640594775965056,2.4487864934604398,12.059615158298712,13.638463986845043,14.970411107938194,7.2989426558929305,11.761530151170255,12.361170822432733,18.014225113950936,5.727001106641625,10.259852219906307,8.382115140748606,6.538894305537366,18.408090645428675,10.215388330148759,8.399239728487512,10.956139201091295,4.246815796532544,7.500472844536934,4.6476882862142155,6.596967117008319,11.766077880592709,7.217163516068474,10.270225167163215,2.934557453187905,13.859969117215023,13.662973320084486,10.21994609629527,11.827576399715491,4.012250421645014,8.503338090972118,5.980218503894883,13.18349920409593,9.30567872263226,4.688876928109886,12.792637974470464,7.971096080371165,6.1966911566295835,3.561246109710199,17.33435462423854,13.947376696473249,4.814705099738648,14.517863628104465,5.631315029443549,10.901187063811943,5.63949796094199,16.92679648283979,12.853316605014221,19.106552750776252,12.500172088795036,12.893544733782631,12.81979731233501,16.414649968184865,0.9580174223840832,17.287769313473902,17.701933940231207,6.9216209559934505,4.404606032010494,19.076320003654153,13.32700461334387,14.932356688516197,1.341095448776537,15.819177098341356,0.38259324431266784,4.808199293491544,12.424844776388042,0.7598375387594736,9.945860417314591,11.942216601261064,5.521733992820685,4.377850662668883,18.868769529664466,18.025561154206496,1.8432733451851835,11.039398424270486,17.287366201115656,11.094538492386041,3.64684660782725,5.502251362790864,5.905237670197607,12.55925176795711,4.521644014197657,8.581998313290168,4.538312080051647,1.6342308222925395,11.06777474902723,18.19278776823785,14.520436959045613,0.22674570762710733,11.816833807673204,7.956128784567187,3.070574119884264,3.40850025797252,4.742519472579723,14.7531818704311,4.6397958657967076,11.527198931757319,14.289529288342763,0.6386794584114952,3.2614701591236583,6.9873962404142365,1.633114983152777,12.642949574382722,7.357611523417424,15.85854852955141,7.954468158500121,9.143650946058033,3.2689163866647064,17.35939944607565,2.2788406814018725,12.595397111372591,7.2238249796576826,16.667989653211993,6.809479154258988,14.110880068274376,2.694902120901812,11.114143465854838,1.8349592416321814,19.416487238848603,4.596310358038953,7.489144342584915,17.52916275566307,15.235081199479872,9.780462041102078,4.101708754853086,12.290584635299382,14.23055985720518,0.7210027840680855,13.043087248046387,10.995096602717279,5.707035677739598,14.717178573222679,5.558108825589958,12.635288619481212,9.623328359661038,12.286313899079975,14.414942008707406,9.744065129190274,16.114349925916542,9.966476250609961,18.05286804861611,18.982312158068257,11.882886317946614,6.809414267676357,18.14173823417795,4.422885682287472,8.560009996261243,18.179139767041587,11.77415339674727,8.05150889042527,18.003507746152398,3.442872849534595,4.1201007219507035,2.7601680394877404,1.7297108598094768,5.502217801088558,17.74586884612338,10.138922789093133,1.5073574518751842,5.95811751344669,3.521833166592354,18.132808743439696,0.7733458173608065,6.656310006798618,0.20581563678248038,11.07992894765093,19.686958082317897,14.146941351674446,12.274652493067615,5.178253248610378,8.824633367138187,9.515932478697824,7.498341417295529,14.352875350171036,0.24212742536581455,8.220659689656902,6.984876951859547,11.357343902361542,6.575587960018048,7.066043818555174,12.43939064639041,2.4207465093266256,9.348561476575856,2.5620110117760264,19.22535737666241,0.5405996125414037,19.001799105374747,10.547013779450541,17.628329531979553,18.63406227622264,17.95598590605898,13.040120558096087,8.99624538704562,12.385865698561531,0.8794370768946314,7.4189408379841515,18.470694202115045,6.552880777329464,9.545539681948544,15.344763006472238,11.27110903277407,7.373740400551134,19.229141913495198,6.535045572064235,17.22652383148632,0.7062707481322761,15.431200416875734,12.338936378654717,1.707064093042998,3.121569858086999,0.2522171830082165,17.591778165438022,0.4944620614968054,12.942725639876386,2.358737026072948,6.299005601387533,5.782621470621407,3.00719558308729,19.327331117031775,0.05324520151354761,17.19681310281341,3.4148319359618506,12.603109041373823,5.754720138815781,12.810318450176892,9.768324255350077,4.42863284386537,16.09642501848065,0.5927893861372979,9.842074440227062,18.241741138799593,5.661605609233593,3.060807010376978,9.663191905866451,3.6120393420146213,7.8516354499805585,16.391141595237922,18.287159344504712,14.00648199884484,5.736526501105583,10.768194570935377,4.423197302189288,2.6172535377521156,2.7667374307594406,15.726387906167862,19.128496940501364,3.225915756236688,5.864877968702573,11.829888013547105,12.616319268471305,5.306471000775099,1.9318129898755343,5.3296499007628295,2.469408930030097,16.192024553075903,8.757018841303585,17.506259522929536,0.6580224096530563,10.835164827002671,4.426917364063563,17.783352729426134,14.151913039074188,11.973192178123169,16.80117435619675,1.7115856184329292,12.135810341465687,19.094872892850812,18.165377682473647,12.413944352651276,18.140837779861986,3.9890378172208107,9.252204228103192,18.346282553940007,15.73314544747079,8.683477348594085,16.92041573401729,5.148701250155505,11.930232335046899,8.954203055740301,0.9422495162222733,10.829602604922233,8.889852475084608,11.553508656267763,18.07201157031677,17.942127425595316,1.2268209202267766,3.6339575203853602,12.800908434782361,12.938940512494618,2.685769107140965,9.707806229031437,1.7068762222448575,19.690446781190683,16.548051569174905,5.205420541871004,0.7409723891716968,9.699361408539549,4.3409415438476495,19.879125553210258,19.830335412198817,8.374306171184243,4.40561858081439,3.6211440463487543,12.400208810302535,19.305797583485344,9.479253342162313,8.435019213779373,4.206544507145575,7.245063474419804,18.884390652484846,14.988105255005557,2.251373833746322,11.695177181944496,16.694187470090775,6.191115628644255,7.231056776620646,16.05348903173546,13.655363082635578,5.600728749254071,18.86689449392762,13.41826023120538,18.586252966031797,1.9238431009254109,13.48677757633672,13.932787913278126,3.41316281325581,8.781261756874109,19.33076931959372,18.79601165491715,0.9629932755802262,11.348039847732082,6.210984966050894,1.8447724853344383,12.019577616576637,18.457112810175644,7.654119091838605,18.45433423852274,12.048483479664785,14.473942960675256,4.683671121438215,0.770238937300709,15.399177353339638,15.61049070486511,14.199083424265687,4.762530382595864,0.9220119113809533,8.737806794638278,14.262821114339651,12.461596830816784,18.796763190538584,15.812140691003584,18.334663520432358,4.315719383737893,19.599603045751856,16.728020900945243,17.459324372800648,10.464915026150727,2.852437110056112,5.4907486862461585,4.549227185161513,15.660929492721106,1.979456925959786,12.98430865134451,2.496067861940343,8.7629085634372,1.1673255715183561,17.68388570616053,18.233299077103354,8.276656666182202,16.061105334764385,15.520430297187895,5.9849305987308465,18.701626248132964,1.8783857288441697,13.798218052086408,7.094299444699392,19.044736173294055,6.80894307220989,13.486219759072453,9.455778067084104,11.09094111303512,4.41797906557293,13.075556815487115,7.4625739481014985,18.134685762966356,19.583846839368263,2.344653171343878,15.92625841585189,12.692098546984996,13.95793001830305,11.920078773783139,2.360702576057516,6.192286269595861,17.466908903635954,10.929043004541086,13.036121411572545,3.473500890176493,7.051433661974964,4.456829452414146,3.381530270295925,6.911042784854224,17.71187611141526,18.47980975047426,19.24295390370684,15.692128051430029,11.511535661696723,14.343509766906596,1.2759758610564864,16.185589557970307,11.24070441051149,17.84086809517462,12.898991164555017,1.820071428789074,0.9927497400370466,12.993614697766525,10.206244665705913,0.6973828219520328,6.8048382886771375,6.763287253283359,15.673288941772281,12.034617628063021,7.838765800126564,19.67581060777047,2.751237419625361,19.06197677120612,1.3235403389074785,4.143962947601572,4.7855097163512195,6.320729694008476,5.975438036259826,19.06842486830594,18.460933466855703,2.4330611271711744,14.844582409064406,10.33595908850935,2.56425700029411,0.37541152161479463,14.480431479748987,2.629707290131127,12.31202938072462,15.06608044985709,7.549000993896651,10.108112329145097,12.466599010479973,14.857240383250145,8.299586969937295,10.226426432294474,9.82405187750798,19.394786132789733,1.515823735002515,1.6878180713080804,11.337265198565163,0.10259843860428663,16.52122797725213,15.727435624122386,19.956967754461644,13.64628696979468,18.13616071994514,15.400959950807746,6.601123991322098,16.700770555145667,0.5568644404969314,15.122868533740883,6.758354771112924,18.847012253096604,18.239170208545097,18.44832705355905,0.17236182417959878,13.397324984552966,19.91905152737236,18.085222262949756,5.200770106713013,17.130364363651253,18.557307007491058,3.7221827465415647,18.491005083185755,2.0787217901450905,12.876742917013795,14.558413677921553,3.844405862279392,17.534828774188927,10.521605873096078,14.304754253054103,8.380199294747946,2.125471505580623,15.812100363933377,8.788759469771197,16.801719754428266,17.245357830996944,1.9780653050333141,18.840235226100948,3.045337337373759,19.0635462877842,12.865909306859766,19.938373993085378,17.27515911300766,13.858489159676012,3.839345136483856,8.238321472435635,13.750261436289755,1.8528213194781218,12.335723996188307,13.560372322468265,3.9528472216373256,4.2123602087809475,11.992699705262734,18.26104284493404,7.419360086565474,13.334990267466367,19.950305623736266,7.212705252657869,2.6938318278961537,1.619575819522714,15.29879358482459,2.685094285353129,6.8794010847754095,13.581479883639581,11.139985278968574,0.3048284101008836,7.701491060181946,11.118399181851295,8.152541525830204,14.2653004144805,4.340375472160294,17.855551856332813,8.988012428967028,19.575880164534112,7.084833601672957,5.578152724426753,14.41211650699508,3.1352068733471894,13.598350624224222,8.759482842210087,15.376905123301853,7.485607268334862,0.7815731856837171,10.003354494715113,2.6954472024802634,1.0994273769632779,4.2590553398065545,1.4960645135709516,4.790957596677736,14.302836344500491,10.796176518539964,16.904180002267882,5.381458503667913,11.273225366947823,0.15328778799948317,15.082577202955196,9.664548283088195,3.4735867178622115,12.185723275081664,18.02369819783594,10.737458449366573,4.807198113738993,3.907909651168988,0.15969267819029742,12.829147108104685,11.422427547548835,16.003953265826976,13.610194191392178,2.2131720105205233,2.4500010247487225,14.844923203135124,12.348367866548955,8.905042204504653,7.039433821169818],"p":[0.15490546816499529,0.5722612811794896,0.7508343701689224,0.11292410662675123,0.8445695314933066,0.6192820751505226,0.979583662790029,0.1666983922249321,0.7786335222743563,0.9873957488292302,0.9255869909720826,0.10509588063586728,0.6060896291010207,0.2238392008497867,0.06254059777236787,0.8796299232656402,0.5435150648534139,0.8283526282212528,0.36649648161952353,0.5117711503603892,0.29854084365530786,0.0545882546834211,0.048421448930189515,0.6367716074783687,0.8318543187037113,0.67558198545479,0.4679116205918017,0.38551082379997514,0.257723618107921,0.07313925483414119,0.5263481438693023,0.5203711179323067,0.30771635953435106,0.02594837799364713,0.3115102073215219,0.8982892664134985,0.6716084370137405,0.5516113852936833,0.052194896777489896,0.8976319908926256,0.6020870906225624,0.7452211291646083,0.22053012171179343,0.8471427121274777,0.7914236771303391,0.39038420667647467,0.9605130806722273,0.166898268665308,0.6688605242866241,0.15456820441779406,0.18676307175360396,0.18578424914687752,0.12108964368478747,0.38081649548115504,0.06107026279646366,0.7362575826167899,0.8597317115442991,0.5753574338972463,0.1779461153653752,0.8575876648279304,0.4301757077036261,0.9750451052247817,0.7976387505623095,0.7218416018126843,0.9359950501319503,0.2980655366234115,0.2756939193134149,0.47008975825339006,0.41038136596409736,0.30708204995181854,0.3418367891806622,0.7368045356383335,0.6676483886383542,0.20915769445787546,0.5445682593932086,0.09118392240942819,0.6095066860283116,0.6480023056587085,0.002763623804091786,0.004738287575054345,0.021577752270535155,0.12043529188983082,0.8949903563331598,0.28428585407473483,0.3868496897209641,0.1089771034909881,0.27128353554413365,0.5588487997358722,0.26661288618237555,0.3136403241471748,0.874617681833795,0.7956654510545944,0.4107832780396208,0.47730365187396906,0.4503259073691448,0.23610909672806057,0.18224082289769683,0.33189674377420486,0.34558853765682573,0.5103499491469403,0.19057967036426793,0.938356456286465,0.7790204298738401,0.6291468445361081,0.20785819655685245,0.007560662153299091,0.8701337136018779,0.7523003244268793,0.365452260533764,0.5588595851133746,0.7885022005686835,0.1825259637948886,0.07293088679269655,0.7933211799599225,0.7193161504281833,0.13066251415792918,0.8331721228952944,0.4711904353176124,0.8015274250885815,0.6789512936000266,0.09650668105662952,0.4797805789877725,0.9129891602961735,0.49994684274934476,0.2668975438658896,0.3921223598440611,0.15324473034087105,0.47454707000261087,0.29353258170915364,0.5640008529774372,0.39595297816747355,0.9369993134841776,0.5774074625700698,0.6295246019967797,0.042140850880387326,0.0044574694044239305,0.07690440492299455,0.13044325175955995,0.9701468449511279,0.6918596416695375,0.9945891250184749,0.2533003313742521,0.9921707359063099,0.9504486950376061,0.22225398450324718,0.7000688107869066,0.7032268009966136,0.3087493153835341,0.17299345781346775,0.9886117499950362,0.01158378353700562,0.6025147747964994,0.4846509272361643,0.8168116891850883,0.8175521921299294,0.323942729112358,0.08934633351462273,0.3494295550452906,0.07213820082321232,0.41949563830153536,0.5157575171217532,0.3936167133676254,0.5599330474993665,0.9679106321416093,0.5581971520105082,0.07463342663054173,0.755983645232184,0.44322984543549326,0.3134669181752163,0.6277099426936263,0.10340131089051408,0.19577092814304087,0.9707230187041123,0.18205194841559558,0.8603317985035337,0.4450133218715515,0.2294143421772865,0.099505483128703,0.9021076209782215,0.12165727879989907,0.8375207713627668,0.4329847467667416,0.5156226471213372,0.19713555045095577,0.8652823275063952,0.16881196153829126,0.9929197560256053,0.9883507188101324,0.7894092259835175,0.6175753980021308,0.8644178477306077,0.585840531320299,0.9430715115478554,0.3234205108295356,0.03018724820080032,0.5906228090348351,0.8075580912559372,0.6828772685017652,0.9916866481518871,0.5493644838568532,0.8911953375231003,0.9799339716762303,0.48894135812033723,0.4890105062285428,0.48799791222213873,0.2868510802445634,0.8355556170303462,0.3441381795461156,0.33075880122386025,0.10887821438117307,0.604448849519756,0.8815717713165883,0.47714882133890346,0.7877943256039537,0.6169802577259762,0.9813552286452882,0.5797528331502457,0.37674518667149104,0.5849990457536505,0.004269427469824283,0.8109486182738932,0.7623322316385837,0.28198112951462107,0.06397455232765692,0.11601795896315403,0.4995510121191187,0.9780665271698312,0.19543769713189807,0.0031504376600013373,0.856958527705677,0.8956936782451748,0.09883184595783967,0.3234885722540366,0.7111672002064857,0.08749892272697779,0.8581455053778262,0.9858527654260933,0.4447263479051864,0.5245481366946769,0.8098961129338706,0.911174749614287,0.2611246156251128,0.6613610741282412,0.3628825086445444,0.9851287384924525,0.8053281407112445,0.20892427010262882,0.20324960348866572,0.8251449038627556,0.05364845543731045,0.310653852104702,0.016320559470585527,0.007435783692092857,0.585576007542026,0.27550899678529994,0.4063050379056852,0.30354604875290514,0.17476859820058777,0.6155205796415633,0.11234785472522302,0.6515924969261844,0.6834174935665742,0.20207249324873344,0.49656222154378593,0.5626892411772506,0.15093787534092518,0.6243839730670961,0.022534177496488006,0.5259697356928104,0.8977713427613843,0.10837632691248089,0.22734040554785073,0.3919309030196725,0.502349949458399,0.8525814680366373,0.5956007721615706,0.799402896762271,0.3740126669254158,0.5728970244736227,0.9556461149136197,0.2711843169085597,0.5285483203463095,0.8377427789574188,0.3321206812806352,0.8032163625368891,0.7640438766211484,0.9696995427625106,0.25802049872789223,0.6047718833854829,0.6150304538322826,0.7910087549585991,0.2148256714215353,0.795785672716264,0.714815209334434,0.281914099038191,0.24877091151631614,0.4645346025982515,0.10292689731385618,0.5632590021179049,0.6314286467585837,0.9909966235696785,0.7859508695665269,0.159396689109649,0.4861682688139184,0.007780402741616177,0.2823009950231645,0.4025924582718332,0.5905663697643673,0.718634242201748,0.40884403624024657,0.7379105859393258,0.2475962249489092,0.6275415944058189,0.816045709368455,0.693270829651593,0.4020146633636177,0.5303420944407793,0.5020134939540051,0.08566168897817095,0.9933081326263755,0.6063494201230648,0.09867465104394979,0.950518905251124,0.886225575857513,0.9540359197138866,0.3281692821808435,0.4078784159139015,0.2999362458859294,0.4349353738074675,0.20613067215362735,0.027339075993349837,0.09304279538591786,0.832369145981414,0.5093435153520576,0.2591350085300743,0.8781625756358533,0.08680280045169875,0.25520393513814366,0.1403974199402549,0.14153615558017973,0.30969721135078476,0.682164871814976,0.37727298888741845,0.9635825369542026,0.44079265918449617,0.6057683093184631,0.26287627678764736,0.6286614145659934,0.4243961845832236,0.2439530469711595,0.9268003931291378,0.4079214326748768,0.45177620577809097,0.741085852865256,0.5989553943857606,0.3823322382561998,0.9815898176030022,0.7382721733883206,0.23589829311141597,0.18114843846782813,0.38007534703949153,0.7364045086844573,0.7962483883174034,0.5884087711543655,0.6977591506999536,0.3856128877035141,0.822585261137821,0.9641352885680265,0.511933405557699,0.7787725076411112,0.20213373570696147,0.1892502745308169,0.42150221546106015,0.8634729818843152,0.7019141546098409,0.7368043296835445,0.6263921008319016,0.036288980439936,0.4784090244408723,0.7281901829176254,0.3708923738409402,0.06312973298018698,0.523285172716137,0.7424334798531413,0.6009437524112737,0.08966383323380045,0.41852188348826824,0.7599542028998862,0.3433699658580036,0.24526766316434268,0.7733547488752115,0.9214421649974851,0.49864088178353216,0.024955144805302476,0.5995147889241028,0.7577141030605252,0.8745438608242704,0.6548552258121403,0.3117373336111151,0.5539721205782309,0.04940902164396044,0.44245207407468023,0.6461898238803738,0.8764823399975052,0.8434575287636548,0.06274564795296245,0.8458496157125703,0.4991403777577801,0.9619536193301377,0.08957621526813297,0.8599321552318386,0.5655436974904351,0.7383150610140885,0.012856654498916376,0.27233171664173916,0.04424984990434,0.3356660336527355,0.5467812594535035,0.26962334656228326,0.07458664250954228,0.11260737422231393,0.0989901382815579,0.08646663064795868,0.23088676829318855,0.5155958788630282,0.31473850363608236,0.6727706325535487,0.696382298028438,0.25528715739605956,0.016092208236778704,0.5065454837396681,0.0015300708166996468,0.4319779667094896,0.6090823522302009,0.35371034926230327,0.9484315879611693,0.7947884954153592,0.9567860861511919,0.23281531753311802,0.7000694333978466,0.9784130038526613,0.7766774628630129,0.6054257653979982,0.20266392845096504,0.9014366112607755,0.5595937105658975,0.7785085165600372,0.7414074271391136,0.2502140453260422,0.05684190416558388,0.8872132116436058,0.6588705261945131,0.3875074651108781,0.377106976944956,0.4377463284153529,0.018527858536365738,0.2500446793612128,0.34425822769985404,0.13753066034759076,0.42356589293124536,0.8915294870861603,0.015174627613851355,0.9559275734249559,0.272261199448264,0.9868236613701817,0.35684954084595377,0.2927429479246393,0.39569996544254304,0.2500405757576283,0.19046654260874618,0.24118175284181387,0.8913241257097406,0.240089815891386,0.632385796984902,0.074385126087267,0.13841924569715114,0.6598363142265653,0.07563506019571009,0.7420740594571482,0.6112300418178762,0.8549190351703477,0.959374979294827,0.36786727053543244,0.9047001790043669,0.27975744613284004,0.2060303364316025,0.8278289720946528,0.8191714738206552,0.4832158283519328,0.6701691269138148,0.26829479557389524,0.18029452175383387,0.3609482218465756,0.4218478803006913,0.8081207428695969,0.23695498501517065,0.8733688811723923,0.1731445475811344,0.12360556810533496,0.4585151994722749,0.7487714829529619,0.5936802814212385,0.25794886630073144,0.5670103030937785,0.7230965296662879,0.08233570779060728,0.7341102993248512,0.6213919923260081,0.7384252309807005,0.10408423875503003,0.785061420677351,0.41500083034436996,0.014860185348570365,0.7919625997519557,0.32842625230514044,0.1397983350329337,0.7862766182473586,0.4245093317500037,0.7477815604476947,0.9071498356160519,0.7847892252763813,0.831339692264137,0.8455810533666552,0.29740965764824456,0.016911024691348198,0.06011550161897494,0.43270415402978646,0.22491075464237653,0.42123189578204157,0.8298207861366493,0.3324037005978302,0.16336408333865737,0.9922836597655353,0.43902950042826916,0.6935591803438992,0.2837037686820776,0.8387334149805497,0.44641557793604014,0.4962580731237842,0.06422958962064684,0.3714237148020516,0.3785284532412754,0.7965112243731038,0.15331755029095873,0.9859977949885104,0.27392528298592556,0.5437853982863214,0.8387310996600219,0.48851786145857035,0.6530460429940763,0.3921137277369042,0.004099004489432234,0.4186616343154106,0.2906803023208331,0.12455642898810626,0.3722169311007051,0.31104642327418097,0.2735740191236231,0.34665898776762316,0.27074077546784325,0.6386814714594078,0.4509009507254045,0.33212546394765874,0.41635554151584464,0.14212538651777518,0.10852313741695374,0.4473553897961571,0.9732990050988115,0.03387821275934755,0.6133109457730594,0.9191241716910408,0.7471931998805335,0.7483666909651949,0.5544764476843547,0.6333306934227185,0.7987868913610954,0.4185096164185933,0.4078206206287309,0.7707376290696915,0.944791821107551,0.9414692271550675,0.48064599283882825,0.7320920696351112,0.6474905530405142,0.5454811439359173,0.7920863899871506,0.4459511254056059,0.8969006547721612,0.013467335455503493,0.5653099913806567,0.4101686971847718,0.034054273492841736,0.03522682183785042,0.34597157750904484,0.9747452060821638,0.9679393706237747,0.457728592372332,0.3983413899803747,0.7816145350706689,0.6867612102960867,0.8633530731090298,0.6767428270144067,0.4495492226284745,0.6085993072129852,0.09622883363130041,0.28156322627513797,0.03083442185481622,0.49452825257577593,0.5195512133110214,0.633997639419654,0.72759267112038,0.2741496140144495,0.5126946381720687,0.43773529509370457,0.5964118815342696,0.008099321079805044,0.5617670511505393,0.18901749908174392,0.2947621714459534,0.7979124314163968,0.90150681958948,0.45200669607106514,0.06099467631279398,0.7337076718753182,0.03471701990988718,0.5215835720221778,0.3425506297624772,0.5099987802223735,0.4840112310531748,0.5346115369104929,0.4925509950463569,0.12006558078588725,0.054900144918687,0.4317847303691955,0.08994768138201503,0.144100750570888,0.43105004245034895,0.011379914551845172,0.9567188341525084,0.77626151596792,0.31599205268661623,0.5936005335436083,0.4652669417528559,0.7752675853527768,0.11119513471093101,0.3676995092273079,0.9019744638723393,0.20823708804429186,0.7104427916490865,0.670071988900812,0.748626635442253,0.6695141488440757,0.21449774885877115,0.5562974838575518,0.6917838202134194,0.7173444343115214,0.27284108952049846,0.6361665884427843,0.13511396505039674,0.5857223146725155,0.629768402259792,0.4270633965399293,0.535468661053871,0.3884787182020506,0.9023851204615063,0.4166622519724579,0.49406991661287636,0.013372117577868714,0.46012942529369183,0.8658880970232732,0.5548471521394212,0.8029182646074662,0.3865626824503725,0.8946539728332361,0.5647426242927012,0.3495976902659754,0.06660579417617085,0.5887301303978274,0.2562598467482673,0.3962105324890688,0.6832954420129183,0.2511270588673111,0.3295626836873442,0.053753758983934086,0.06813901181110427,0.9909081828242279,0.42714475281009867,0.8654369800380863,0.7864648054537466,0.16661279196183054,0.20202854375271162,0.14386783882383547,0.9616527547865259,0.005597782496039594,0.1427238422321817,0.644872582291514,0.3637619842507729,0.5960590890078346,0.24111144991153344,0.14244635904433967,0.42182660005181005,0.4711765565957835,0.8662908258272088,0.3435837963348747,0.5721918612444099,0.23265565537156396,0.2198884997208561,0.2713924892297346,0.15850489958748537,0.9258297264163486,0.9516085700431094,0.21175029268474987,0.5457402960463649,0.4309734640981713,0.20936616881396053,0.17258071665884467,0.10937024761343261,0.9886841972281499,0.26395765150790207,0.4459396467043606,0.47944040547648226,0.8583195248422388,0.635987042442578,0.1497524621027746,0.9833486768349133,0.6431010470488365,0.07315932234049027,0.6843016418198835,0.5877065841055329,0.4181468421146739,0.8390858067571096,0.908958103109371,0.13642117508311746,0.24389267423315264,0.3424887024750678,0.7863608467393566,0.19995401477578767,0.5242766570316097,0.18650136040436238,0.27335801515266356,0.8053075637177127,0.7380779306394374,0.5579800726920545,0.25442519274262865,0.3327800022138976,0.6896903886620234,0.15685417754434416,0.5372776899620335,0.8961774856085134,0.9599268482536862,0.12057137207887436,0.010945249945273572,0.6012044642275636,0.6697268813716135,0.9291835857230237,0.7851895125314883,0.47684368364761154,0.954322585360279,0.04200938772872398,0.003987914380404245,0.5632876678760417,0.4990522845467631,0.8834437463564018,0.754148607290213,0.37742781460462105,0.7515271044594958,0.6455761047706365,0.1692583501979643,0.8257256633661956,0.314820143959214,0.8135906514636357,0.643963539102189,0.7456950569750751,0.1495498496761618,0.6884441965012049,0.9816811275829576,0.6513027035531909,0.25780457298664117,0.2707108509310632,0.5132743220086948,0.06621850196040424,0.597016455897583,0.12312365715041218,0.10254528575807309,0.7614085414677898,0.016867718969864498,0.4739063749694177,0.7745550255341247,0.11386582065312045,0.24062795543864524,0.6687258159095222,0.14031105334040128,0.311635250743842,0.29920892190922466,0.08082082904085652,0.484727153666221,0.2084815808820646,0.24730842911328565,0.6206744989032438,0.1816665729309992,0.9347984148856621,0.39843230964246246,0.20211076674819783,0.6153395730371389,0.1134270490636351,0.7897805409959673,0.1537911126251441,0.8007593444578129,0.7468735687976442,0.6662562895857831,0.2865674261071831,0.09793150697803421,0.4681466997623962,0.45993248388595087,0.6870683897212109,0.42558997651505504,0.5801977413539099,0.3196106841439752,0.45139014070895156,0.010769499217737843,0.41559838213163647,0.929307374834365,0.48827072901599133,0.19004308615359755,0.0989208048717154,0.11920533359793639,0.6495803637934707,0.41502655784396913,0.09639013834982468,0.45935374428294784,0.10695822069060101,0.4206257735846486,0.4702481767191389,0.6139270960118948,0.5375725767480721,0.9827709125819051,0.46439182186349925,0.40157551470844277,0.21572104541674753,0.20537083830650338,0.9432907691039818,0.6129635328529344,0.3041956194831834,0.0002062451281827915,0.4006904882744453,0.29718381325936827,0.5152252493799929,0.7637365351308751,0.4076912112883535,0.5705013937560763,0.11341910607614047,0.29077269728499977,0.601197133172245,0.6488893941547682,0.8381969295034033,0.8337278728084516,0.012141416547295503,0.2603343815210961,0.4518993165830081,0.11317736624677543,0.024986107861892703,0.9909901727160557,0.11821759454804925,0.4202627408688757,0.7156934594937829,0.2158088376628673,0.8020210484305135,0.3383231765393886,0.3495466202906692,0.4249619311227524,0.6015305445715595,0.6057953153883902,0.5687628524553989,0.20074727471985487,0.41612551816171717,0.09701175941182827,0.5730275614804163,0.45054558922129906,0.7392299582479704,0.8233358533543826,0.2084460686270624,0.8615542587854252,0.9469752518310248,0.7820338042019701,0.9000229751462465,0.7500215452710826,0.8995475312876324,0.32307529361211507,0.31289172828778655,0.12456669627751249,0.20236240680554762,0.27453519037480345,0.4341645074638545,0.7440371738798028,0.6904846102334383,0.8210585168299598,0.07760191156876517,0.8361468492881516,0.130823905454432,0.650145764308024,0.6680338789533851,0.16016429911900176,0.32385911955030666,0.19852201518106516,0.7522933751274665,0.9246946108017602,0.5275966309422571,0.18114990962402144,0.5241276110064026,0.18638067371237077,0.7450910894819578,0.36295817626495097,0.07673588693135747,0.3619014682966859,0.8102575879008385,0.37114906945213155,0.2799671446093006,0.3682223429801528,0.8271960093985042,0.9926106995059536,0.3615045906870571,0.1408911993933759,0.6796969531376058,0.06618664541553887,0.982277025498975,0.6630395887331129,0.5180848438271195,0.9888585007868065,0.5576054121391985,0.13270499164473804,0.5431749540492323,0.7291038195629198,0.07832773484066413,0.4371565593566942,0.9979143786891569,0.7678220959551987,0.5216684414732453,0.9520713912161807,0.43865373524511675,0.7035756168282619,0.7030633131227539,0.09031134067925284,0.5610182196052012,0.7503957912414918,0.5018066123343787,0.7790551849468006,0.842429912809596,0.7203764376803772,0.7698328568446655,0.48889067830378896,0.1910435154409582,0.48353402484329355,0.0673375134270906,0.7058540183740019,0.9239320729703815,0.28209155464761504,0.46964534159180205,0.2191845348221395,0.8550127888554886,0.11737068655195348,0.07890903433243635,0.03563401082030948,0.8817201357040285,0.2153040517176903,0.20205673994495532,0.4271337412770577,0.40990259993523503,0.7132987781979647,0.3569405910351602,0.20400226824958012,0.10542905131988078,0.8528214951241992,0.3742150894988505,0.38659777997917577,0.5429100187149762,0.6707893690421094,0.03575583090557832,0.08917763582386629,0.9306235332180794,0.24354989494415658,0.4157021480867018,0.883930483084765,0.08442588453846356,0.055943556388630356,0.48332395454755517,0.5814938000874303,0.3932299639406358,0.4678891086590742,0.02562094867059006,0.14458115887689593,0.48567254310066965,0.20874509097781146,0.7138170810514333,0.5728458712539675,0.42925107983811017,0.888476164110507,0.335749726983283,0.6372917896343129,0.6006303321899527,0.31797134880394995],"mu":[0.651688751278928,0.7713730199316831,0.6914866158372914,0.8710578668261177,0.11870077038638538,0.2356017573249547,0.9329477864819642,0.6108650010816343,0.6211061059404854,0.2926723051526987,0.4294481045529679,0.2734410359221442,0.04804546638392715,0.7051563924985205,0.8699152320397161,0.16897386491034827,0.07859118461179371,0.4965455512808168,0.05928809761963283,0.11180617062545983,0.5532037161176486,0.22667561076052167,0.6707904194572327,0.5489286585530211,0.2961297199829773,0.7742227642518715,0.4793729062296066,0.4146123659493539,0.23104326273706954,0.7117286669476348,0.45490597319881565,0.12939187382088746,0.3036459720554572,0.6528428829254747,0.9326273649914145,0.5954919890240229,0.11972980743082529,0.07126128399663623,0.2861725702525748,0.4924058015053667,0.73748454129853,0.7353180062691083,0.08903443340806438,0.5733858561050198,0.7415710844338876,0.7165639686628213,0.9040979387674499,0.026865081712287076,0.8645672364277841,0.5137134110854988,0.22439984622814935,0.08248271572748211,0.2467956373549185,0.7037936760337828,0.15550006993951593,0.11535821772088317,0.6654466064318894,0.479370050560481,0.9351548599585473,0.03459861718601687,0.2155956644290118,0.2646750707927621,0.45249756171570876,0.5315020162189068,0.5844329301441751,0.9780144742135826,0.6687877231001429,0.6304097002079545,0.5790720219968988,0.42171193208827606,0.6079779739137017,0.968045685581354,0.9578586742758783,0.12408820112217733,0.11970276902023325,0.1331903823192251,0.5933213966769171,0.7701140079332884,0.02810011081842001,0.5656347974084139,0.8255052209194049,0.6994212954710783,0.7677880096956116,0.7546445306646421,0.7592547265818461,0.0712632617571145,0.2847467728499693,0.4501083815226965,0.3511291285549365,0.1801132300631192,0.6007765397826588,0.7744657263837382,0.3505221052576666,0.47720280837121076,0.10366887345347209,0.59239721410475,0.008535176641434106,0.0071906611055641,0.49503965774157566,0.6748991473759229,0.3855983791201212,0.7424576441598434,0.49344750185794806,0.19640715693958088,0.04120741772751502,0.8325449593381633,0.6688544579713989,0.9716257221712885,0.1809261982456467,0.7503605740243158,0.27837703975887584,0.7944241061720114,0.3651623982609771,0.8452666552654227,0.9930385702802096,0.07799888043119263,0.20926967919397277,0.040539668043480415,0.48926945653461384,0.7030910610230672,0.681460061638913,0.32613835294249927,0.4627774319335767,0.8475184661917208,0.4766369741000511,0.8306042163416585,0.09279743236998117,0.35574321245867546,0.5661666861419004,0.7066823409592284,0.01069452170081786,0.9800695048236767,0.34121502140449644,0.0110036809749674,0.6665709007207312,0.4628590973736637,0.8132507548563239,0.47173682730484345,0.3110763627043629,0.7413794530119002,0.6715875992828557,0.8058030492128752,0.31881438170272003,0.24084621843742626,0.8409291873544582,0.8719662830034194,0.9414715866247081,0.9939550467365859,0.9004955867489592,0.4475700429202527,0.4484910478513364,0.4199533444263106,0.5361365256550303,0.4510549918541322,0.2851831460232288,0.437535540536657,0.09099083069669556,0.5720475360551149,0.863309858895418,0.9251816102891468,0.5837345737474333,0.7496950101861501,0.5170434596097375,0.9397968279337334,0.03668256276978776,0.9175180904346807,0.4174060274280831,0.4810352918577627,0.5983580617716002,0.5173272926264523,0.4555408779847805,0.3236569760496457,0.9373921712064697,0.3833317640227769,0.3719288934881868,0.9087188644585908,0.19293036246074546,0.5236280044368078,0.8967874236325286,0.8644057809690866,0.789361068286438,0.6902553212257936,0.5138604882070816,0.8807975961031933,0.08311504419868876,0.24527654735697468,0.6172653502150633,0.8230098143626574,0.6355120314178941,0.3179423856243899,0.7195362788996598,0.5587455680269966,0.7550223066584845,0.2650056104644263,0.40138584481503337,0.10750950824414174,0.024948571516240303,0.7187223991588678,0.6725394689407074,0.011821904413169992,0.40056451340638777,0.5685987523895666,0.5206858904394889,0.27665996030950235,0.6571240247271204,0.08794402196664253,0.2875377083744608,0.013202397849223724,0.14330407215302343,0.6858352904421012,0.8297963037314731,0.14472177362118055,0.8936255447747512,0.5953270501998442,0.1394779685972365,0.35480510755301675,0.1611538712468359,0.5124376243702873,0.3030167882045549,0.6472681915386487,0.6093272861082819,0.24669707381276296,0.9745026362956912,0.10983913694038017,0.5532370511519373,0.6317984106078895,0.13265773927332702,0.755932104117309,0.062454389228981055,0.8570349115959133,0.48733285681270866,0.843266882852747,0.26702218836520575,0.8708856983932629,0.6187919979905565,0.5634881687484234,0.09105247824663332,0.4006891332661684,0.6778046394005008,0.22839064415931754,0.03185514690639102,0.9802556070946593,0.8581358012408249,0.5765442066389059,0.03365196236721868,0.30578215641048656,0.9877874451916193,0.2917353183661424,0.20760662331107094,0.7842681196524675,0.7752188972667016,0.1724431949891816,0.29141856013892453,0.14666680200570603,0.4323727932352166,0.30079112038918177,0.9479439254844655,0.7775397510580233,0.3776542547144519,0.5128470390481901,0.7421992666641726,0.13341202091888182,0.6079319320508547,0.7091763696847686,0.6585686105616146,0.6133304260611108,0.12548782999489738,0.6209761282099362,0.2542683870289615,0.5156412651476752,0.15947352957605077,0.7663603486278108,0.00989586436550649,0.8711481092150113,0.2525951550011172,0.4967166014598281,0.3579839997286436,0.22763296419555057,0.8262753294973564,0.8465128365157135,0.2357490219208409,0.8494743663168158,0.6087232299204355,0.2280593952353427,0.6364913078326262,0.4484872851490549,0.5823174604791297,0.5060123916396355,0.34353115320340777,0.34270573248492897,0.27647684655923,0.7309254018471376,0.2050929835533024,0.25035171346319585,0.8712606498192714,0.2749021580669646,0.7977563340134206,0.27320051209963503,0.5108056700545536,0.5209423312724872,0.158932817699166,0.6145328110929029,0.44937113358435377,0.0896128266238303,0.22765612066944785,0.1749862183694273,0.49063265754667706,0.24426840279438733,0.3573865275766457,0.17652900958915763,0.44497321756284114,0.8666210446283686,0.6878335094071142,0.40562771118676544,0.013931928798914361,0.022607128443179247,0.1485002774469233,0.9802748795470793,0.25983828065326287,0.5681381341133207,0.5232538998442435,0.884576539244257,0.880224702830674,0.012161840327570062,0.5834882986462777,0.9077783197686025,0.45469455186272056,0.023387187035013746,0.26693488493195217,0.974624580270887,0.12333124665930328,0.993458638468925,0.6430479162962361,0.1315557566667538,0.11776938474918852,0.6745176508793491,0.3740953200925823,0.3159962852090561,0.6719037801020664,0.25051969014884157,0.25055210089835556,0.13587029228973146,0.7306450371782551,0.6271262447198078,0.48583525143059947,0.08134463544471493,0.36946445064079403,0.13339748328610246,0.7396386096417269,0.9241158829600087,0.36258662273872244,0.7704666468770289,0.5393464229350589,0.07930111758011216,0.7750860651545961,0.47225131621782457,0.9287763883742917,0.025230044700729426,0.25257144480131744,0.9383889883739958,0.998579551676279,0.27639449623040435,0.7019554394333773,0.7192537184261378,0.7378734257640482,0.8032389832617397,0.007800782880712731,0.8848006833143844,0.6142839748664062,0.6204178088168577,0.9289288879109256,0.7166298371535318,0.6999395103492261,0.11646228155951954,0.6714703808088378,0.47632623006430697,0.10552028094871835,0.9479367326517765,0.7895649417099235,0.10430154114985202,0.07087936798436778,0.733061373502538,0.12581024875539537,0.20491227431914072,0.9139016274460527,0.8556393800408106,0.43270483841671137,0.24215483441606556,0.6961185512063162,0.3541957523485786,0.07617633854260109,0.2587567396407531,0.4261298240636744,0.46024005612151964,0.13379163415140893,0.8661550439701518,0.08731236745478554,0.48063225285495315,0.22537735796733793,0.10861773521761497,0.8538335234131786,0.9713197266721882,0.02189337232284072,0.11772831877365819,0.1359501554509217,0.3846615639618385,0.8639091206629228,0.32254418862990786,0.15974664908489355,0.41293296377808364,0.20116340898418805,0.27362520964528625,0.7065978171417073,0.2535062278938023,0.06593331557427429,0.5578331098525222,0.13915312006113223,0.7758154156411721,0.5250678003838645,0.6704401906686996,0.8489194612255275,0.4823131115498034,0.28088050711423196,0.32670382398770004,0.4221753543612443,0.672504899888805,0.6950148462540706,0.5929637095308204,0.9321020258659127,0.1983738738493659,0.44777170279204626,0.26515854162743424,0.2621301232567488,0.3208160471703547,0.7764980681936129,0.8844141214539369,0.16812731958515714,0.1730798045710895,0.31667386018328614,0.5864855364861083,0.1324690004364164,0.6207428110556237,0.929461797889412,0.5011202876424532,0.09199173222548307,0.914273886999242,0.6835609968955441,0.31372202907181923,0.8775818404617495,0.3720623227357813,0.39269898740930853,0.8112364941122827,0.5475767411649186,0.1639888422034852,0.8916218468212174,0.9684255079560624,0.35357443779989484,0.41149260494539686,0.41888164112505555,0.12304823128086984,0.001014582398497721,0.12217994540216637,0.49064862355426486,0.9857085896488615,0.7534854876065,0.9635850282230713,0.22430267602594656,0.4767709389635264,0.43711725921012334,0.6909619035039234,0.4389748574823842,0.9396495565518588,0.6826944525523917,0.31300688107013785,0.9735441419804625,0.6779883362015524,0.25525903817575335,0.8669927548065155,0.5036836751147196,0.18888656333518306,0.0295781072585235,0.9688894224605682,0.7230763606787483,0.8938265554965683,0.24368981336777318,0.5114358225783395,0.03777219307883395,0.3876323099367396,0.2807595776357408,0.5385398646962405,0.5881279957871979,0.3798731140445586,0.8114864630138481,0.9751990335633096,0.3355395194873634,0.6737498702096916,0.9854602850807332,0.1868391464210437,0.9586201076873582,0.3676638464903148,0.6447958767787543,0.6976811364410742,0.31356925074533315,0.14474527355751365,0.35358452513664784,0.9061341287954319,0.9042208031977639,0.21325891289309706,0.9236726644159494,0.5199044124348242,0.49228061788560074,0.6063227532095739,0.945598760613674,0.5073038491639621,0.5948421066377274,0.6430350117501702,0.5608865385995001,0.05139837066285202,0.838386813890281,0.3999060228315108,0.9684871806522315,0.6403671120407421,0.9471304215093894,0.3221598206187404,0.8762234615679563,0.8161952910318977,0.9754513879997453,0.5933278377433151,0.8777816088935915,0.29821405653438293,0.8965703073631184,0.22753777622000082,0.05833382958680966,0.7766496587458778,0.005313902487657396,0.21811542802992312,0.9996598802466878,0.19267845725403743,0.7722488006677373,0.24207001848305398,0.655886807663391,0.4894536925597477,0.1602184555564785,0.2371489429799929,0.5233735019433616,0.8228878859168667,0.19778618548294502,0.8288101659154079,0.062186652022677924,0.4723661626483553,0.4125392526225402,0.7049004304987463,0.43029901956163275,0.8544287407412352,0.10016707205949249,0.2930326047687746,0.32078632401798,0.9415927051926909,0.878969873715556,0.28818179486614626,0.900587795921054,0.49545333614707077,0.7329190576918041,0.5639636383924902,0.6386723687959348,0.3499140540249335,0.5518859443182362,0.10648927663555474,0.45055517324975036,0.7456697843856313,0.4475730733589103,0.913568108820034,0.5270206994954532,0.5114925144954883,0.956235045323071,0.8108264748236822,0.772854016419539,0.0602460169600747,0.5078147453778252,0.1556012525240964,0.30565756581915293,0.5839833756759487,0.5453551042617348,0.633764911302618,0.014280188532908689,0.7722581558867632,0.7876291454979898,0.3424959002776302,0.20843209261852258,0.1134318484022423,0.6877292845597691,0.005202979134253161,0.4111732903232783,0.4893745751697105,0.31395612399396944,0.1377414198606599,0.08495501094063407,0.11095953352525312,0.15581634856563897,0.2397389591319845,0.009272145650952579,0.4864726636620309,9.287965957738287e-5,0.1080061814534552,0.6627452993987617,0.4298449278934644,0.4725780286655792,0.7028993165962205,0.2821579523247202,0.30312046512029145,0.046398176784933076,0.5113868744888228,0.6656138775829661,0.5138331275822536,0.9301609366296675,0.7054392504817024,0.09340467591445534,0.6571466503139476,0.6434003078991546,0.36172849571044496,0.11892490659677524,0.9650683780128471,0.0017110175499137625,0.6236439825091893,0.8434099105249802,0.809311940895616,0.02397647783283463,0.5029455927862783,0.6446037311451545,0.4495705082514412,0.12186441255674318,0.4642217949386911,0.5748481243016141,0.5692090492162079,0.30208818097049517,0.07269438879790702,0.8300215237835518,0.6850985362425053,0.30881926818985006,0.8646429634555033,0.4309174313863062,0.28192629155503,0.29795481920518574,0.8333334386096607,0.07365673172099241,0.5668326002625297,0.6110056623658893,0.1879103678953118,0.39194330124133514,0.2277398538089117,0.8783938281168393,0.44253507682233395,0.8312312945860572,0.9830102402409335,0.37233894357491226,0.6084703018460422,0.020595453750067882,0.635367128211443,0.6499317401001443,0.06609586316721883,0.572177480020823,0.7122051167223666,0.07663560760456489,0.32150426449103975,0.01728698519357419,0.6097345143459625,0.7398199742012037,0.11026710352420865,0.12464945675317973,0.6641469371174777,0.3074113781185246,0.9790737141968684,0.44334241827613763,0.9601736107277161,0.912892352090612,0.9829397911946003,0.7255927152029036,0.00904408062917228,0.9414563651575876,0.22102439720391232,0.335929817831635,0.2176511859132768,0.9550315136183736,0.2255340831741557,0.4696286523878208,0.4103194412637805,0.05576637223796066,0.6267721585804726,0.8459966024276995,0.24441183028958902,0.49795744779745843,0.7946255924689549,0.321754467421111,0.1940821508817634,0.8729038274542071,0.21549792624525388,0.8078232078099001,0.5158851452145641,0.10175859088378858,0.6346426312373092,0.5926838819954778,0.21581670567466849,0.8538039136718056,0.8617620841517808,0.9124297869956752,0.19820253084613015,0.5516892950694339,0.16939495450387487,0.45636538044110275,0.5518408957667238,0.7777578992751222,0.5037969973327314,0.4553795126997129,0.651247159185111,0.5629603872807674,0.38840531699373004,0.3669185866946678,0.9105084321047572,0.9138045259319563,0.1608202927253517,0.42119382750583956,0.16085125857317673,0.29023467817841686,0.4293818183656779,0.162077254378592,0.6706485758749066,0.5497600018464275,0.18913666674579455,0.5930786631909584,0.6247204140585663,0.8898611441689537,0.19924269978095221,0.34737550146402163,0.6317763111621155,0.7692889408614156,0.3612775466999334,0.09441090286713205,0.05709932216756908,0.7652222555504278,0.5729748408372533,0.8168907184796794,0.14801324150493955,0.542463426525341,0.492744109687705,0.05226806777955395,0.28304702608154275,0.9469738764442444,0.6882121901262634,0.056724065786713185,0.7556802474084225,0.5604961751573292,0.4043746699514106,0.7695302102361306,0.40490464031989304,0.3926488444121068,0.3886759899319032,0.6614348377441579,0.48685281253877366,0.8792024473644819,0.5195464741262179,0.899875294691346,0.7172837519571662,0.0005974518116618199,0.2158031459964298,0.7725519698983154,0.1071261227870719,0.708360660255309,0.514724831383873,0.5142086119834854,0.8810827134122814,0.9466635511358461,0.1310504566939077,0.20642125721606353,0.25765360313943786,0.06695199819504016,0.2530905385337603,0.08429135054079029,0.4352695285817143,0.7585067782861941,0.8117212581091473,0.785879095714344,0.8863289713509224,0.6754082197459574,0.7875799227602811,0.9531356376971998,0.12467859580921381,0.05250152518765172,0.3856490199440652,0.6150229442867721,0.280171987773036,0.41580149357435303,0.38809211466593596,0.3880246864436425,0.46790679597547125,0.8312828903609515,0.5854191735854786,0.9487167416237978,0.03066599336102893,0.15792968285345932,0.09832495905136329,0.8106249472818083,0.128256229795368,0.6080747931362067,0.6576895560910283,0.7034962708135315,0.09108111976285338,0.31151204723738046,0.5442642313385591,0.36236852064448466,0.127859477449209,0.012785288297266106,0.5628393840214603,0.6593653711001739,0.8584516154893689,0.577648858018992,0.04698553566850472,0.21932432264521418,0.602913205789964,0.4990919456618945,0.8240697624573834,0.7584358051610982,0.40604622311945837,0.7723765673125182,0.6076227434191186,0.1483682103450985,0.5830936618063383,0.6006422714716055,0.8520122874149694,0.5422496013457081,0.22054780066833413,0.5383541193845791,0.47337174892507083,0.3107386875458722,0.9537368287157042,0.29103376171992723,0.6828784598155775,0.06923227598829085,0.0942443112425424,0.7204671466923014,0.847663210473532,0.24163973719784293,0.5319004264056242,0.6347560641382104,0.8972082804978747,0.0182540007879215,0.07040352653225379,0.4002951891624882,0.7082053856103323,0.22266379426174354,0.2868376539396098,0.9766951606851251,0.6177184597082706,0.9046839950337415,0.8515420950623072,0.8679530322432563,0.8181464377296315,0.6890137451888598,0.8609660775759513,0.8628501835767997,0.4332558247850873,0.7433769641314822,0.27891529849437746,0.17786621932487257,0.08662697185729118,0.03231623232201275,0.5992927095805356,0.7266027351551134,0.10625052195146223,0.7077483828960907,0.4817085978619129,0.3928753917439385,0.3956655687265138,0.15454419220412507,0.5423015311986745,0.8668715452841294,0.5413879299613622,0.016938489230509335,0.8413059072311475,0.8240266125439384,0.7025249791050443,0.24350466285949257,0.4569110520547428,0.0705807221972179,0.9230615416565584,0.36096104079470326,0.4142316673494757,0.4328790732788377,0.355335816844919,0.48751333974493893,0.4756151261612318,0.2554233749795891,0.3922662401566017,0.3342873005744593,0.009803706355589137,0.0851977570398863,0.6013893393418885,0.09099714601169495,0.29060374559941216,0.2783105709746194,0.1303512370770754,0.2696814134856276,0.5989322717274883,0.19276761837654766,0.5553716182863544,0.4335297520767196,0.44545370598990264,0.6077771983500071,0.09490631151075202,0.188046140821708,0.00585624464023482,0.272475141244928,0.8676292518580939,0.9277962000956039,0.9637022880360133,0.4403457097373624,0.4720776323878966,0.5806012266215903,0.3644543921311676,0.036610677212355114,0.7310180253448519,0.3464098456850564,0.3745539808082172,0.8524176630155285,0.07065879779330175,0.9260433952774862,0.5429736128312936,0.7081594629036163,0.9723998879978457,0.08379817595267847,0.8163844994432019,0.6766606357441192,0.0015342970070961748,0.5834809432893446,0.8345965959893218,0.8480944394327652,0.46419103019380303,0.14249102901650046,0.030231941536524864,0.08955912517665587,0.8230449955002257,0.18738445044122765,0.731926028834778,0.10620709658323646,0.16029084230527868,0.19856904603630698,0.11127710387808842,0.4454818849625468,0.8297088532789025,0.620906851437881,0.6265601329407249,0.01739645886917751,0.8232822761758183,0.6337280344006,0.16872590474912963,0.9889345143845503,0.7779953665855284,0.6639830099427342,0.007475776702014825,0.5942914486532114,0.4187907514693421,0.10606401692883982,0.6836262261135702,0.6380358829414032,0.305239828797502,0.25616556277340163,0.31644818020496013,0.12525374295104652,0.6448049145932988,0.6540099825650021,0.7011027861999335,0.98199998046497,0.8626041928394881,0.6831502161804228,0.13839561802413836,0.48966478495616594,0.387997466922706,0.13686940224795108,0.1543410520177808,0.6682865413116854,0.2404007526901999,0.5204510869476537,0.8065124243528665,0.23433395089481257,0.6911415723618914,0.5608607279018023,0.5510274066756837,0.023905201680574084,0.9337617884214113,0.5459353764900916,0.2625819315838782,0.4145655370866388,0.10677024543348712,0.012443026228854848,0.523308789455905,0.5436193070841395,0.07549905352729658,0.40068252020851935,0.2565415468438659,0.8519268124030908,0.7962176705247099]}

},{}],71:[function(require,module,exports){
module.exports={"expected":[-8.266753732014495,-10.97106348105511,-6.217420473218891,-7.487912487173343,-8.30351127702779,-11.334953327127668,-4.869193522135378,0.7651188697681353,-3.0875266456240658,-1.6954450340596197,-3.0023983623806307,-4.923493683984876,-8.539670181580949,-11.938158660722326,9.540829660253848,2.9537348168404263,-0.27323018806988575,-10.165762951568128,-3.940910228480413,-4.089586570120008,-4.352986430971341,-5.3907418191458225,-13.4823861982891,-4.879018479831335,-3.8956305365025212,-7.843656377730154,-4.803354971528599,-7.028453224234775,-5.165914849106915,-5.738169859382559,-8.43879809897383,0.180007496341956,-9.37510739678349,-10.88603385553927,-4.112191554959667,-3.4854226096621694,-8.535947111798095,-0.8937038529812521,-17.248073301842016,-6.793383969234258,-4.916675781513668,-3.728006182148036,0.07703193570190808,-2.397322898970113,3.2104104073502047,-2.455653276657311,2.1339211497358486,-12.575321993899234,18.3154309137642,1.8644773956264276,-2.9170858843921903,1.6082251366467752,-2.755319704285692,-3.6048238749535617,-8.65180069409013,-1.0463143231141185,-3.8621923259535413,-1.942944439511658,1.5909841398858098,-19.88318506216281,-1.6766794752022203,-7.138958636808616,3.741375233741814,-2.7158783558166677,-4.6634828116407,-6.101790228146127,-3.7616205384156602,-9.34186376502094,-9.869421350771182,0.7133471892538825,-1.6934870101133266,-11.236180575330424,-6.277619565030863,-3.3979827045831508,-8.70377067418507,-1.2303041294091117,-4.900699210850443,-6.421582033360677,-3.925209056804807,-3.070845038870576,-5.050879646088424,-4.937098885585869,-8.158254385472361,-3.246012061319359,-7.883060156352922,-9.278230632138687,-4.5104865136242465,-1.0970373099589787,-5.562412100605033,-8.600377307204687,-16.884539626513202,-11.80951805943874,-2.46538566994214,-4.214204169915469,-5.622438934481564,-4.60067143292112,-9.612598109799757,-4.904342368376377,4.238245421192451,-1.7334533295387131,-22.40981392299779,-12.132853904335185,-6.12229472838473,-3.493636852482953,-5.955199271601403,-6.156825162898712,-5.71617173789002,-1.492713512774753,-4.086055157534338,-5.737627385984341,-0.0898356831027618,-8.516353677381911,-6.621543061380359,-7.5732852668490604,-6.513537663246586,-2.547563964033839,-1.919734493526497,-10.26238792599751,-8.512198804475835,2.3401991079885978,-8.958887315273085,-5.240834635834423,-7.886644775339782,0.7477327865763876,-0.9725023121501699,-3.6430705073655156,1.057443196243764,-1.6260061357481814,-3.3834636676710153,-1.8341100293622912,-8.140989833786117,-6.447353667595793,-1.2145505941040782,-2.2956860335883484,-12.248474601682886,-9.78231935553893,-7.785023991466993,-3.264534821203867,-16.390041636072986,-2.7173165577253897,-4.2927225944656024,-4.413624373079021,-1.4588920533459415,-0.4521113241333439,-8.688854351197634,-8.22973552203449,-3.9878052288683175,-5.795462404948882,-4.952571525255733,-1.1185860608798914,-8.703367933430096,-6.9697170200944285,-3.175821131360104,-7.032166721483375,-8.4652884748429,-10.983305155729557,2.9043218653607914,-0.6429722021175159,-5.608115779056277,-1.0686697626896282,-0.6601096135623026,1.3432383663637542,-5.63678495773176,-7.876289702262607,-7.046748964830492,-7.319852026847241,-5.615727743943852,-2.446085060152148,-12.56394822339854,-9.957117131890053,3.609828982734168,-5.71000356166499,-3.690237676684803,7.274847834721141,-3.9523269676609374,-8.626727019055576,-8.362896479554122,-0.7602157157214111,-6.934987989773939,-1.8904761906155154,-4.534308263859073,-9.950077775072025,-7.729258044385091,-10.921719013708872,-4.134985166535971,0.33980103748406965,-5.268409667502148,-2.2479916203237513,-5.860667059078585,-1.0441405814157778,-16.013072606525316,-3.097430741599734,-8.922814960498782,-1.5516042688361584,-8.613529825161725,-3.007887839513195,-8.188839987638847,-3.4041259673847026,-5.31130514072628,-2.905274541335441,-8.16362975146673,-2.0853974898147674,-8.408647353367654,-4.575726185090295,-4.591852987890437,-9.221224546608394,-5.276602198766266,-2.2508270503676244,-11.896851627682787,-3.278998189186891,-6.8573845905643145,-0.44670907411779925,-7.046608399154167,0.15578411752091015,-0.6713800803667471,-3.3543906824955156,-9.86142315262085,1.8486115030221044,0.6493469128379772,-6.819985571036279,-8.60911965546591,-4.588470632692112,-0.14593257882051702,-3.8039449541122394,-5.3591228188688635,-10.092410840895099,-9.13379205410556,-3.965284771387949,-2.002374465498562,-12.2138010484633,-6.683448822097079,-0.4652154035406426,-26.707143302343326,3.0736087464142496,-6.731998479244529,-11.468533053567363,4.538246594131241,-2.023228305186203,-4.8277647429874015,-7.390732259581313,-12.992370129184646,-2.8459038370865066,-5.8469196150545235,-3.6744232535207417,-3.534811757061881,-3.8113747139579592,11.10744653063454,-3.7196369924501784,-1.693598580075923,-7.074325965115326,5.6552970265812785,0.04497924278493093,1.1526742708193032,-4.844533202540498,0.8348375686065594,-1.5843046286781777,-1.3985478095373016,-8.038372963299501,-8.104817163879819,-5.673930045527733,-8.587432632779151,-6.308912173980705,-4.099219639523202,3.6990941765154552,-6.027287014328765,-4.2697587893605355,-2.4698076591431124,-9.715756076883283,-6.37019440122353,-0.7384914063720438,-4.964574412534917,-0.5288104045225909,-7.996945156130977,-9.716377098639883,-7.203299178387084,-7.179333270121633,-2.2193319459415624,-3.1195722403828543,-5.079561200624909,-9.329343932429778,-3.7664061134740336,-3.8622427081087425,-5.941329608645308,-4.977934825886848,-4.907070796695365,-4.053075563318406,-1.753948467104074,-12.13963787101746,-8.66949296719128,-2.012711698842049,-3.725966994491484,-4.328253533939977,-10.53429522114115,-4.472355253770303,5.458390275349052,-1.7610306423366837,-10.24834407107771,-4.79596439453954,-8.537655453056253,0.2922678656637031,-9.23295213175428,-9.96251294894334,-1.9360037948907944,-5.036662430662927,0.3427055701608688,-10.160602380032453,8.803687469453934,-8.896100271358192,-5.49525967144532,2.612393221752172,4.515624755900365,-6.080934589802883,-5.690237428190832,-2.469761003630471,1.4837058427296572,-8.071675049164677,0.979449146190627,1.8506101661564207,-8.514767851772703,-2.2565709101438647,-1.5763262219625014,10.925012886249197,-1.7218521213775135,-6.782264977931508,-6.57670467161414,-9.115760310472659,-3.514242626100301,-0.8876448114094915,-5.689166803376365,3.149200366855107,-1.6792368245857086,-11.227867209419005,-0.3650636696347602,1.1098485094139772,-2.285808597702613,-13.673553876957731,-10.587562427237492,-5.512478122175657,-11.313336042634766,-6.980839891111424,-7.69722010504937,-3.086061963297768,-1.2286674271496043,1.2851407980232223,-8.534751909590751,-0.45607251255081876,-3.390358405965948,-7.794430465242967,2.229320369274916,-7.522829029579838,-1.7688792723270776,-10.695196891271477,-1.7557214216196493,-8.740870270421132,-7.701393448813818,-5.52210862003131,-4.444869784830589,-5.250789435537272,-2.5986735079749526,-8.398187638551844,-7.879875949091989,-19.695029382800307,-7.6431732213315655,7.706101145223849,-4.8228231735011935,-1.6049244895342714,-11.755467191044088,-8.293751218027964,-3.785191003722631,-1.8040481735581215,-9.306793831471873,-10.367520210205818,-0.6018749095719209,-7.31677804524155,-6.709283919637044,-1.063006509611303,-5.997995290227468,-4.686927994213344,7.7579202862186705,-6.781331707323595,-6.268398218994665,-6.743923572355957,-5.38191182777426,-8.978464559841807,-5.557658715630803,-5.107323378660501,-8.030569059513152,-5.368715814058794,5.253854968811591,-7.172220242201935,-2.464295136520017,9.185790369069322,-8.235505877619563,-0.5310627150791551,-7.727056262150155,-12.417075674331858,-3.5250539759668147,-0.04023130958117194,-7.835420762827575,-2.220667641239127,-6.933943670970471,-8.021947767161295,-1.7538424250725348,-0.47593126547107767,-3.490139887426607,-9.358992777586314,-1.6745467257800162,4.732564983969502,-7.9384473167594445,-2.384024732242721,-19.68886817832582,-3.2399342968484293,3.097494893294018,2.524293358804162,-3.379973364783366,-7.6487533200986,-9.408961450953043,-1.5053846735421699,-6.1790860429957615,-1.8722637840763188,-6.908288045444925,-5.398650699753807,-4.014172547443742,-11.878862910831767,0.3686465681706905,-5.00806997977332,0.6345357628932375,-9.09181060827457,-6.358952815766301,-8.049923690509319,-4.230090100556817,-4.062076078945101,-1.6184314315607278,-6.830185521182142,2.074553897875244,-3.447253177715957,-6.588505554588869,-1.2729076001261133,1.7600898406651462,-3.301884605337838,-4.114047574590892,-8.222761182432977,5.524134854029844,-7.135688303545348,-2.3573694207364557,-5.697604592775393,-2.482178531651165,-13.613277110568777,-0.7481249421652478,-12.002893549656363,-9.1929552748197,-4.398622530482215,-11.748196500375094,-6.746315044190871,-6.9138382213170395,-7.848868455139544,-10.869160029597726,-7.916811560860613,-6.016245941228262,-2.5059579039038162,-4.9256424022889185,-5.313870109951264,-0.4372317651515354,-7.393219457432085,-9.943232136447573,-16.104910571656788,-5.3493111666930595,-2.2378190409017624,-4.782938485809924,-5.859860579985068,1.9569532165666486,-7.169671534659318,-4.620590642051614,-0.1799540228889674,7.50588108450153,-1.4278756921113382,-1.7787523303608874,5.280760711556305,0.5247549013346409,0.0724570726943452,-5.46119122402613,-11.908014423033165,-0.7689250687035991,-8.93053783638216,-8.572430860823093,-7.005729562039848,-2.5754957646772336,-0.6008329280147622,-0.42525996728243876,-9.36642789042003,-3.0490121621820223,-5.08147749270525,-3.6447568848852585,-3.846135691593857,-4.993722966781287,-7.2436582144280575,0.6543995312469444,0.8854830649705122,-2.8272601909979116,-4.086860537837977,-3.7925709143078823,1.6307177797137298,-15.984179907026828,-0.184459464746611,-4.950727736208558,-2.649750224980381,-9.711189730297654,-0.13811434438988934,-4.762394935087159,-1.8215456766469764,-5.5129629577172246,-5.474555450246388,-2.4896711964812863,-8.100543418991395,3.1197140094560742,-5.2511527013137345,0.38109074343193194,-21.773920211690857,-4.931523812335486,-6.100278726414961,-7.801665351138913,-4.382757739762748,-15.427669793326709,-4.575415392811187,-1.4163920984138731,-0.8999503042127933,5.048511968905158,-0.27497623709827634,-0.8271927925102553,0.3946509806146299,-11.775740361992934,-13.94529637021365,-13.628611896871888,-2.2563046140342555,-0.6509512637838579,-19.214796881842872,-5.0129090099966875,-6.308357868074148,-0.41575041224560255,-10.217074474977773,-0.3564403121727109,-4.552446883337907,-8.025871824232201,-0.2825325594069845,-2.809071654325487,-6.748908044886388,-7.014343633269029,-10.75261104765666,-5.33527880987039,-10.290126648605389,-2.962859406988496,-16.907128065352715,-10.447676280456157,-6.179098064986407,-8.053843522358326,-9.370163502466838,-5.303449096822083,-4.185599178054121,-4.494228883923332,-5.717835280145254,-6.483259918554852,-4.111531364599648,-8.696111137128863,-0.3306317283358844,-2.3919385398683772,-2.697095315129004,-7.144297878413531,1.1938895803655252,-2.170139542695998,-2.262547551878769,0.07525432536720622,-9.494526276530388,-2.547887700369972,-6.997418681620248,-9.818096414182186,-3.4243480009719534,-6.445932602587723,-4.629514908773819,-2.743426207808166,-10.719290574453595,-1.7818571346475636,-5.144750373618632,-10.205844133057477,-0.42312404946829313,-13.758391403776493,-8.150280049334855,0.6603044470263999,-6.746944563089441,2.879531712761281,-8.242293099698328,-2.6408215639676564,0.36068541916128327,-8.343589287899277,-1.9117657331316644,-4.438763192921147,0.8808552365447624,-1.1450184053816197,-17.319742366767652,-7.361219165036977,-5.825528825253736,-8.929432062390603,-3.361970161236176,-1.4090480786604642,-3.9213814376295506,-2.7624953029780235,0.9003933525839418,-3.087977300070408,-6.153752088446649,-9.993649947034445,-17.997609792055023,-1.0773394995273526,-1.6314624228363042,-3.994447524329667,-14.459769675731827,-1.246609691259813,-8.339076334924636,-7.023184892114357,-11.18933035417746,-1.5746873152590843,-6.499636092429202,-10.066467652806542,-12.806289683426819,-5.173843575915447,-5.392189309519906,-13.337116595141643,-2.1509456228894717,-1.4459539165200483,-8.440651405114995,-8.330621255236956,0.06618914359630057,-8.361803415265964,-9.967965141258187,-4.073152775477349,-1.7188713936901316,-3.129458253866969,-7.007027648301275,0.1649162623501088,-2.450751658737912,-9.187155225490464,-3.600925678746674,-3.734531717709149,-8.82182698347852,-2.020886897299542,-7.800421955823122,-13.900075782831205,-8.716482715106814,-2.2473929048430348,-7.6715278421453,-5.25829476795443,-3.3703742873918294,0.18055380382739322,-9.140881743136795,-5.5735982665286325,-2.0741900698135276,-7.723695112638291,4.419630043057289,-0.8353025062737518,-15.574115631703739,20.790231375809128,-10.295936061195462,-4.098431259041649,-6.407245167460152,-9.066299536498892,-2.0638059388336654,-6.739280702656891,-9.598287882130059,-0.3508982789249573,-13.322083384282266,-1.728864740764459,-3.849865260552912,-5.932887718058147,-4.875767258401196,-5.8422062394126195,-3.8537196458140732,-18.570948933625523,-9.580668262350512,-9.944322136193758,-4.472545473893337,-6.016306396416592,-3.934819865159506,-6.609953344876243,-6.228199560544194,-3.53749802302269,2.4450233154880388,-4.398740060696374,-9.551686270841811,-7.1349223193399425,-5.780800159475662,-6.315957910525513,-0.5995086227628714,0.02138983856130766,-0.09314458859795494,-2.4933380900536735,-4.3699321983544985,1.79631912612364,-3.1872145604171624,-13.536618968644595,-5.636524120762623,-11.165982789988742,-1.7774760051247824,-5.453897473781517,-1.2551502096729248,-11.42477340038591,4.533906235295257,1.811218984645067,-2.353381712390132,6.554181939042579,-11.327078457851137,-16.6155810122859,-7.3137438344920955,-14.959535881168257,-0.5599122102017943,-2.9825295615761234,-4.167794179651429,-1.0713302077853055,-11.155677042696437,6.747514285587856,-12.801116948354558,-4.046798512169206,-6.483828418787285,-11.980198211726067,20.328956358858445,-3.8345999737571375,-2.0794388408600075,-5.713192965711637,-5.170812204303493,-5.250296335267345,-6.865902940925869,-9.099069437945696,-6.986882106136918,-9.229628604475474,-3.490368389745825,-8.44303936662799,-4.584625752460271,-3.047700593838785,-12.138188154963762,-4.463353397568778,-3.3145913001170313,-6.685295028438591,-7.796552209314239,-8.145713417271846,-9.104665204786452,-5.266634580566484,-0.015405457236431275,-4.069082948068685,-5.349739288959221,-4.143729017281281,-6.598868595313668,-1.78253581523956,-0.5080412174776727,-7.728663184779587,-2.917427709153535,-12.057605454350622,3.040695872729918,-4.771030725012644,-3.9668470220473404,1.8414157435725529,1.8910263211344613,-5.263039637309717,1.1856390389041551,-7.075768346306659,-5.2646917260416455,-1.976000514609733,-0.4857420367368146,-5.30831269496722,-2.185026269043306,-16.03254185928953,-2.769945419176911,-5.440923289308597,-1.9837626620235738,-3.061392712789366,-5.593118837289817,2.148935817948582,-7.884532957418283,-10.838261333364022,-7.541408179125153,1.6174425878491165,-6.9410944420171825,-6.109370312020365,-2.8506497445078702,-4.522314523190657,-5.950529040955999,-0.481629049161032,-6.454715702163483,-9.228910731357182,-11.562476124966967,-3.067067767115992,-7.211687433244526,-8.551726351550078,23.522470370704635,0.742810369232993,-4.980903225087208,-6.14682028831057,-8.652292046895031,-1.3592203821530822,-2.31353526062026,0.6226111051338972,-6.136369759641623,-3.667194508458916,-10.884318843599496,-6.596240934815443,-13.42696718212537,-8.524962700027388,-5.558315107539684,-4.7386307889457155,-1.8176171363162865,-11.973123893692305,5.007749133063546,-4.443160051862304,-8.737751300033663,-13.266141274478382,-0.4117013710489021,-13.816179833115342,-5.700179525175555,-9.724235730257613,-9.54794118548122,-4.451408436537346,-0.3061178405015248,-10.538350597459079,-2.638226717865396,-4.943085154995121,-3.0222729377718522,-9.833878564524667,-1.1919510858192006,2.5419933396716017,-7.990862430530099,-8.95662539048401,-9.976212245575619,-3.658980828069394,-1.462155875910826,-8.940392634653982,-3.8304573229027867,-1.7037726227576409,6.537101349406419,-9.070263981278076,-7.4990543909457825,-4.555722724172263,-3.819233433154075,-8.890268119180828,-8.381182281398722,-3.012302926056338,-7.927012151231327,-5.188249910281785,-3.982390355168546,-0.7819080309477022,-18.60297238514231,-0.35093325172499434,-8.20655990325459,-8.084528042289893,3.8461561099747,-11.656727100649336,-9.660655949690206,2.642489448144815,-7.691921461887691,4.08042769939687,-8.372050094084186,10.970754183734787,-0.4924439037379207,-3.6566334426398903,-1.4303864921611036,-9.02453011225231,-3.3647278079908416,-2.8042007372192272,-9.177000746022337,-5.923878074791334,-5.250003350695178,-8.054939664450623,-4.854397618961373,-9.163133414975757,-0.9935018266065769,-9.060231533352908,-6.68944626490652,-5.6462623545466135,1.1195215662935554,-10.041170441662263,-8.146738424497526,0.1634867433253242,-9.103360556307464,-7.682049747748081,-12.077117957275812,-4.0406689336762565,0.7222103687120571,0.47704152319091975,-8.686283031860219,-4.136290785660336,-2.7517891145072966,-3.562526442765071,-3.006570711889261,-5.196581555035118,-8.123321863477914,-7.361564147280958,-1.8327046627756047,-9.529343531205903,-7.18059207371655,-11.398421931047185,-4.785894695454547,8.070877597148677,-18.248759595558788,-4.189661365738914,-3.7243215180354428,-2.8446408715503053,-0.3524708537582222,-2.891360389633336,2.4459181089886872,1.3310118419018755,-13.932262373980773,-6.7050478917702305,-1.5011127126334205,-3.0374258483640664,-4.7187866739896895,-8.794769519457747,-6.998182749447086,-11.509534576921972,2.9064509534006513,-0.4006358575801532,-9.068301743095851,-1.142400653065133,-2.8600630316760878,-9.633087485134077,-10.92667842173145,-0.9436134979766502,-2.5208725039789295,-12.39113419052839,-2.8098839605177703,-0.9299491557083757,-8.142745869372469,-11.016586180775525,-4.515578720684739,-0.986805296057577,-1.2184272897119595,-2.174826077973366,-8.73197936894328,-2.2497889766637638,-1.4340445162364635,-2.1649501377673928,-8.817617623331072,-1.3956199568440808,-0.38092506134030923,-2.829245581572211,-1.4027283652080262,4.405624346983683,-10.842106964034098,-2.2897475423216225,0.39407676900095967,-0.4780825077683955,-3.477681515803622,-0.30518450723198165,-3.95910053358518,-6.392979890537692,-11.560299809824768,-2.048722682958351,1.1367032127066845,-7.960069240112389,-4.421882268518225,-7.490889195529308,-12.243742960704552,-2.7433282153732392,-12.411692306980585,-0.14547246682708426,2.9254945392312,-8.804875721191936,-7.1284323075763245,-9.011572453644046,-5.00950905713606,-2.5614583193822313,-8.416996508160839,-3.525284419093294,-0.42340036970081196,-15.482225628916293,-2.930171362681307,-0.6450702830108251,-6.904221178594649,-4.109641844189798,-10.060087447814986,0.11213680089043265,-3.240450406267433,-2.011183201426996,-3.8634413167996944,-9.665057872724717,-6.184362645033868,-2.433597459825756,-5.767809265426694,-2.8324732889945508,-11.91607314995397,-11.579594993360994,-8.852502518166046,-6.840014361086581,-6.934152098840874,-10.5363104876024,-4.274366264272457,-8.484048750287533,-1.5821311121163326,-10.98949311072494,5.451242697846553,-1.7497018828069573,-4.81983508566382,-0.5855445807749654,-6.819861744412847,-2.1399552991457593,-3.9099637042130375],"b":[0.400864118923967,1.5918823284701322,2.1623685234605117,3.486071396329986,0.7039987486150145,4.265981938801339,0.5085009088980219,1.0120737044287198,3.3624948322983217,1.5452125828403662,4.116830289170864,1.844117973280619,4.2737541762002795,3.087831563375919,4.868450166255,3.158329185788177,2.4032569074086387,2.7701837668810123,1.9289212219702079,3.880777115504018,2.6866512860849823,0.4603164693332684,4.32135924549117,0.07597682147712836,0.4550453638855567,2.079195397090423,1.3919347897048173,0.6031413963013532,2.5735442027857482,2.87304210408744,0.29242774138018124,3.129854081013251,4.563300790721136,2.6904570917673,4.321131021488799,1.8952624138841312,4.354361940268473,0.3284953952548364,3.6554164241468357,0.2796584604873509,3.055172669357421,0.8720282624272768,2.807760130799962,2.4502372917927673,4.6489957453432105,3.3874502812645426,4.978449383444037,3.904907515279964,4.277426776244094,1.247399079144902,1.0592586785951608,4.144221243629243,1.0280670320211904,2.593838772594185,2.612997967532944,4.24795002460399,2.158539251075057,4.072192210289602,1.1065708421082643,4.326819200412806,2.7947207887344905,3.471136899775089,2.372361662604355,3.2985290820249116,3.980971722498867,4.72517050745245,2.962770791341731,1.0281373252001325,1.9855815606474614,4.103950969726018,1.3028597560065092,2.3059950983226187,1.2847281935765864,0.26040808708770347,4.935944829161448,1.2470553104697368,0.003986986116190083,2.3282988109645055,3.9745128171971777,2.490160981401278,4.797509169525295,1.05949881285066,2.88342462858749,2.089225544287231,3.5009774146241925,4.591559922636478,2.676033446263567,2.6715170144613754,0.5756130421922712,0.9247959299351982,2.5827591585337215,2.34192968634091,4.10717200345336,2.9215244177898447,0.05951652164282395,3.239032473164727,0.7379752305872955,0.4503840044325136,4.33418285555816,1.6808037258536168,4.143321651573847,4.511221703506115,0.08754682115030499,4.237922120081906,2.5518357963160474,2.897855645281635,4.2524611388450495,4.53680242205675,1.9389070477710202,2.144716440545139,2.9748485996295204,1.3201706223055598,0.1924176335168104,3.6215074283332784,2.6038995779672813,2.5431420902048565,2.3769651817739423,1.0773785133028446,4.061440800052748,3.2020137566042397,3.052930922673532,2.985037531042055,0.14872863681993587,4.968753874004369,1.3076804140864784,3.2527679506148632,1.8996117625091202,1.0377243822415216,3.6718581221609394,0.7179433028536819,3.8350993291059754,4.627894052126935,0.6409486486002025,0.13048873363038727,1.9968516907524059,4.19833959615754,4.446813399164508,1.0239008452192022,3.257287475994972,4.724289083415282,4.3622078676054485,3.0250233433834683,0.6287062031942792,1.1160911760675418,1.7529404961402484,3.5311883989019144,0.5302384732006815,3.9355963994085164,4.343846955017677,1.6572308422743698,3.2433673677379735,3.6205440629645516,3.110500592404396,1.455501252291721,4.607954896629599,2.768255271761749,3.442542940357627,4.714981733352436,0.2870318947903472,3.6676406324875654,1.5546351576056994,1.307372197476464,0.1538577186312129,0.8939906286116794,1.619622151424439,0.33624823318188723,2.781248859157964,1.1810119971198063,2.71389367363144,4.604237389865629,2.6121050481127526,3.9785048373880483,2.0026326878519796,3.9247212829656783,3.6796408385259713,0.18446481160102723,2.7804866397002392,1.4055058144827481,2.8612706539684627,0.726939305224904,0.8256557225041505,1.119449536904532,2.3777670512486058,2.4373255344537412,0.8074025733128865,0.5919210332012748,1.280357309241651,2.298218071217021,4.351768003749136,2.2718350111063534,4.955961801021568,0.722170642811979,4.727982724631454,2.499330731135536,3.410151058848979,1.4908373737038083,3.844157118015813,3.497250383966768,1.5554973602318622,2.6485104453207953,0.424486529358602,4.574709769223749,0.7708452000874255,0.5296927504560767,4.485157058027097,2.971366280683363,1.021258713524228,3.430846046600111,3.8403177073663244,4.826053895529482,4.414163353860286,2.752990588393589,2.599989950734165,1.0932366271168625,3.3439713559890185,2.699816634018247,2.175905718622081,3.2511021010966887,2.7011207736797127,3.216878620688397,0.1724912992566885,0.38738387985659983,2.4837955280042623,1.5616439080797684,1.8136335073666754,1.8891175099694169,0.26490527299904754,3.079279917925548,1.2765035062341046,2.181839837080113,1.5248284953298163,2.022454469818189,2.7232707582200777,3.300831102534041,3.471867317704478,3.0469929942471574,2.0451486706096977,3.243445534269874,1.3540445939072376,1.9628164314141483,1.1525568115267382,0.4282395603019318,1.9172638599845193,4.915868804551144,4.65744115824132,1.7840610806230495,2.747577724935443,1.3866566236246303,2.7016210206513156,0.33182719183554976,2.29151129305164,1.1321443544528231,2.5959101914530125,2.582488115164936,4.605965097562795,2.801812132749885,2.100024958665071,0.5428544560717885,1.127042855156325,4.574913897462779,1.1532900902477639,3.569988802869247,3.6922583969489664,4.27029168889518,0.2640358908805296,0.2672838139947753,1.2047324749717325,0.37297113268353055,2.164210671953369,0.5362818979618922,0.521803971355066,0.030093167799646325,2.2525821595403093,0.9431075128223754,2.7501833976844114,4.840130376761427,1.2982106979181485,1.4441330507496497,3.5444689014279565,1.5110120960441442,4.224221390394237,3.5925675491048636,2.7193324248446284,1.2050417717539863,0.9722428411182804,2.5034951756611425,4.641166381137056,4.0827362292479785,1.7978563393156044,2.4292613015943534,3.4634171307846104,0.3195069083591495,1.6303225122494824,3.7720668868201255,4.0003667717371405,4.901953091954296,4.549410354302447,3.129055603598778,3.572575427668503,0.5989714141899716,1.7535438700596495,3.339877012191267,1.7443454056081509,1.8645469065857878,2.0400503159084837,4.80637059293959,4.838501527647251,2.13299784881264,1.751356813722612,4.293829888929465,2.2819205933381648,1.8501399385985262,3.226580474370282,2.7559606004071746,3.6580390490023795,1.6984641082439755,4.230839936611917,4.082547128109956,4.371069190362917,1.9091606910680836,1.8186934214702644,3.795439204655071,4.274687064322256,4.059902532149757,3.4766814187560424,0.21129165997864519,0.18643128195139913,2.446550713941261,4.533742206741053,2.6787856617133823,3.9480040633924163,4.765653148917242,3.7260462224142907,3.555797156994508,4.420342568266666,3.9818392616795952,0.9663039753162228,2.9046378523358296,1.023113264765011,4.289047856202601,4.464960439277469,2.0467530525720647,3.6799437874172436,2.9420193208834,1.4318940964891735,0.9500860620879814,4.458171281714557,2.707623862963957,2.8248287618941212,0.1938109650373665,1.7432101748269802,2.6977032634979192,0.371872388795752,0.24039257661598645,3.7654119334283918,2.8892913267174913,0.26351930662861567,1.7273263873592026,3.9000441289035113,2.21999595745229,1.889852676670094,2.782296313935003,2.7776139596576135,2.2875290273065865,2.853577947903736,0.1472219299657873,3.359669612137648,0.8104439450073908,1.702305806464497,2.8970145175306996,1.1296886862031152,2.7538724351190957,1.7909802808758124,4.091327974810915,0.18520407376964143,4.624592717598111,3.4052777995182915,4.464517303146165,4.051563320775714,3.2197282285983175,4.024770614887875,4.280607754282762,1.9903854833908408,4.680202505277981,1.8667283182476069,3.3231584274031913,1.9464429629811941,2.0027526248868313,3.587600286223611,4.3683235806284895,0.2831737064689366,4.5126062670705105,1.6907642583649607,4.432890931959763,4.192993647167649,2.5934884077583287,1.37913514957405,2.2376375782507516,1.344579018603893,0.7091645152006454,0.031413830171388435,3.6546440694869107,4.156295058321175,2.979449620228849,3.3151483195626827,0.44791191192754876,1.6845619046345972,2.6437511498036406,0.6625811340231624,2.9597034708849366,4.215290542798672,0.5425094016698118,3.62339043241922,3.4913551786229267,1.0175861466232483,0.8500086482412339,0.06763965556755624,4.416558178688883,1.4044459664686426,0.04145150874659831,4.518896724661992,0.793466697903823,2.857313809614844,3.947838774338688,1.3372967946301006,1.595345666728678,0.921958712312394,1.3395960125916562,1.4698486184635184,0.5503195833607522,2.191433853352296,2.600162591147189,0.6013060834465367,0.7657763173724508,4.5153672982219515,2.8597152350743826,0.2046137769741485,4.1228329134359605,4.299813308449918,3.0424505313403003,4.667569261356611,3.191324502764936,2.9109132806353633,4.380195800311043,1.1983543850543399,0.5582719195436803,1.249535041474732,3.586745013189904,4.1760997579741606,3.603738932011006,3.8348480174891053,0.03403287488506823,4.444954562011181,4.585493669978714,4.5163448307028045,3.400790014063465,3.83000903171572,1.1727078034370486,3.1475962528983747,2.7488916161271195,1.8354559458649655,3.442789874602915,4.73470901509348,3.111185649174276,1.0055366908552754,4.678073588702031,3.32213476698504,3.3188263206713553,4.519913404573619,1.844744058832054,4.016540577675929,4.044780580979349,2.959206190893282,0.12853423081058302,3.89814882514953,3.3604923554884625,2.9848608095278193,4.373692532239824,3.1381279874107326,3.6595063618283605,3.1752099960313362,3.1772291747291046,2.310783430970218,1.332746699900098,4.218916905441161,3.072690652927408,1.4011280661816128,2.4242435028952247,3.3999410437540356,0.17237868105718368,2.5725751600633884,2.3366485406531377,1.242057731641315,3.2908771683075155,0.02106864577204881,2.314805650313901,1.763889621810153,0.6599423535621107,2.156271874183182,1.3441527452535462,1.2841910963262104,4.359111261770446,1.8465928729768544,3.558902828550462,2.1604767243817626,2.337144183868396,4.856426505654344,0.5316384708105448,3.118708382921983,1.2509917866691478,0.007022903719657858,4.186808372431399,4.4994844078156895,0.7633428422671196,3.0131375124771242,4.860496071837782,2.7736202687596565,4.3910595367169964,4.287707639999461,0.20209916680689055,2.9097072747456956,4.407478582732006,3.59186244934792,0.7273447143253409,4.424913722075907,2.2586499631449986,3.4581442988323197,1.2137312800771705,0.2465025632400264,4.918107857046858,2.9883099377973177,4.445212617488151,1.5440899798601504,2.767030429737485,3.323135417887535,3.6251717636632907,4.2106476676288915,3.115642020315783,0.09392283566722281,1.0494354600608036,1.2117937801597378,1.0514959199298923,2.7722473187187315,1.8316069086605735,0.2004027656935059,4.831288116149403,4.191967714151418,3.193528953633904,3.7619170526382573,1.3861260978089174,4.669368938551457,4.740113207842297,1.6630155156658721,0.32605339587368887,1.156294880927845,1.2615205840890398,1.2298039180177989,0.0839608184547258,3.7593288625630814,3.692303872520154,3.7379620950670986,0.6524134707235074,3.172790054460972,4.595121261125935,0.5178290541503316,3.826784994026049,3.955532934491642,2.9370771271941356,0.3778605063259466,0.5581901956017221,4.247953841853976,4.937893826652927,3.2501593479949653,0.8837487816609235,4.37167902392747,2.402876551202601,3.8282176392419744,0.1823892740877031,0.6803248524007166,0.8178226961035717,4.281218729970196,4.767838612892469,3.964191910935866,0.03938314990883374,3.436841845000389,2.7019352838598776,4.897199229964507,3.6801321950623214,4.983628333927469,0.21861862122833586,2.8580819105915536,1.0405274877439563,1.0544633306926854,3.8465918232190055,0.286823391795914,3.398685451039273,3.0216138214793666,2.799149714018868,1.8845356589649176,0.22242908658891114,1.6800605713505568,2.8045342630524073,3.328912471249038,2.738392230465343,4.870040314547403,1.6541431211154478,3.509116254834077,2.1121588205344946,1.4681935785588784,2.1845647239691015,2.593037412377278,2.0866358435998578,3.445972904676784,4.847766606209892,4.8398414110393375,4.148255841600632,0.9633525151099509,4.820932065892708,3.7556958496828505,3.9231914222093103,1.6186701110558277,4.392281905340103,4.115276576703576,0.05483576096552478,0.7209805657707624,3.3914305596073033,4.018401843856053,1.6331621019278142,0.31022246145618215,0.6013586561085649,3.8906983735557024,3.0238852950014006,3.3806205998268792,4.700879124461145,2.173922305307565,2.37420491104848,1.3843927088742503,2.4189720265815517,1.0282480765475766,0.6876211152704592,1.1965891171401766,2.6582285355808155,1.9799406103787165,3.8861266163539243,4.401331664589071,4.430867197439886,3.6196610657380477,0.5688223980274787,1.819591289871041,0.5461886873142019,0.3350392633779653,2.1695370699884844,3.4919897784899123,3.3405884996536783,0.3045727545255683,4.958002165933625,1.8857988720209151,3.50622867406737,4.3694759300726975,1.6388534385763442,1.497555171846916,4.330020981014327,1.8025358883972487,1.4122085538039808,0.472923914399086,2.0068583931765427,3.827338420039749,3.170740310121176,1.1048820392322845,4.140903011138891,3.343464488484141,1.3255857254537606,4.561924091171936,2.0885162041342173,4.979341662840479,4.007762865865516,1.8923556224579519,3.1764129283329314,1.7648346046045083,1.819475261445983,1.4216856667728561,0.9592020602341433,0.5702573537926636,3.903925120238859,3.8513161348297045,2.9542070176006807,3.7518026988129973,3.33290151946409,1.2631027957453134,1.3340103640190182,0.6403722802452272,3.205730707953208,1.1046824926243137,2.056854180116333,3.6397809644381485,1.4329634639127198,4.47730487397161,3.82958077843253,2.5774684646040855,2.6999103951940673,2.3791692906444872,2.656349755916483,1.7747564737471577,4.778659637999887,2.9609092347579624,2.2338450926674858,3.0060289530658544,4.878531129831599,2.5153486500815383,0.541040816461752,3.2474995938358173,0.18233003974039486,4.266845845371834,2.142008103128603,1.6219796847608303,2.736980845031012,4.911918091745601,2.755161588198334,2.6665526824897654,0.8051196533557681,3.2103273293293064,4.957039895828331,1.5420811903325216,2.067155770510568,2.89707126537189,0.10112198032789621,1.6086239743585817,3.071297928993799,2.9279549352906775,2.7897483733192074,2.0890276975447284,2.7377361161148417,1.0813095839810105,0.3997659683634136,2.106096607933096,2.35542911604027,0.7443772822323502,2.471632895330221,3.1475875011101295,3.622613001761308,1.6046483501914643,1.8390676823249763,0.47494227565606617,3.6908548835081376,3.068403817203933,4.119957344794102,0.7553305207238015,0.30874320528017307,4.618736733758334,1.6844309230395993,2.965292134769202,0.11117839790347084,2.4048362248033106,3.781281611234183,3.8858324922732357,0.15351705076122157,3.025583927394677,4.116767487270478,3.240190415599943,2.2350950448205764,4.37134061128884,4.64286585775427,4.110684492417168,4.853322685812069,2.496482525700764,0.3489016889887797,3.796920891801326,1.0169879697276363,1.2134597045922357,2.419121308277914,1.9670103672261663,0.24832765638515109,4.685287275436762,1.7133033964394928,3.2443873129950394,0.12052845058152961,4.472707928792326,1.1782147147527022,3.6466295269311066,0.27261187643708884,3.3725598049549865,2.862237261241687,1.8453872875210475,0.8325645615512489,1.7922687861466646,2.417870772061954,4.007921806498992,2.445576609906579,4.687972382094695,4.781938529702476,3.5832789327315764,1.855069123765345,2.7210957278292613,4.89033887997935,2.84733095413231,0.0926615092837102,4.467869002449092,1.3430885102027923,4.386165108140135,3.276184298966769,2.546110908397318,2.2322508991440673,0.4925150490657193,4.701061178599804,1.1268155526565249,1.4861611748981374,4.3156829090561475,4.207709598880175,0.6648488841305489,2.4158482962471997,1.1032062155678146,0.5003202929466266,4.184886048894566,2.9549166220581657,2.339324240991616,1.9656399690670978,3.185685155716247,4.716087769840016,1.433711373938047,3.186592161168016,4.751097104864549,3.1360897161422443,4.449837288560636,4.463675437516468,3.158722001900575,0.9389404255413281,0.32166814877275796,2.2712297030653392,0.21902742745058656,1.691822829228855,0.16260354796992393,1.5719360164893303,3.858028067046495,4.262280727444354,0.7937176375894928,3.9955539430586873,2.8802316413002926,1.999457847496674,4.2594686012109495,1.1468697832892505,2.5594713166248106,1.724214199840498,1.6469240586008027,3.8735936098004,4.7094401771933425,3.488034498210133,1.4607606716303734,2.891968355213405,1.8186168762519717,4.001554240137447,4.809529367854875,4.173314814072224,4.648590835144326,2.7776227700534175,4.979960212276318,2.3407592740877115,4.561368634710291,3.3516963697799462,3.047111883659052,0.10408314973391342,1.1315671142724781,3.906670998055144,1.9599743793304492,2.3458480467291953,2.247711151578354,1.5645298558362675,0.6362750737088152,1.9057306890470582,0.5956114763205089,4.164223620424981,3.8888702439114153,1.1344558817992567,0.36304892790070764,3.5372542307444608,1.775002679636658,4.57538529967869,3.4593900432558633,3.7866748425806573,0.14429959301373918,3.076979735693428,4.65730601869789,4.165335276665405,3.8779365526683107,1.8310466900503275,1.836356087259774,0.5271211863222558,0.6062004646956276,2.3339176941311357,2.417516172063232,2.1698959277930596,4.449724087826831,0.5350703562939552,4.941091760739487,0.5810497273744908,3.3858510534943087,1.359292178714212,3.732309865842395,4.373966093309953,4.25866678197011,4.087599885646503,0.6368623637827142,4.037650315329527,0.8100780990440248,4.759405651907523,4.548509779052927,2.4600747215324903,3.948373729229778,2.3289426040660324,0.16493228193178222,0.7724879704106125,1.876184670068698,4.665742499471386,4.528339529463796,4.899900887291188,2.2256387257581833,0.04586414172754627,3.211347233045867,0.4279831316911753,0.26068818828066553,3.607241110482043,3.893191288489631,0.8272323689906191,4.435747404964859,0.2016945618266064,2.378864751600913,4.125989935632232,2.7546458130828775,4.058555897422165,4.6706106434974615,0.9735830531253342,3.5980355073642887,2.136758077106461,1.6432133455164388,2.5800506998491124,2.530571590230508,1.083722965771532,0.20177281085175913,1.5592190908405812,1.7447374669111848,4.821244452501614,2.751419187441914,1.6852982658862192,2.0088638043962526,1.2625894722657727,0.5002320135987104,1.5925158864833555,1.1620224706575732,0.6329116089544984,1.8910177353930513,4.748339031612007,2.9447846744594175,2.1441344823900854,3.9187918313334325,0.7404501885934345,1.668137943533644,3.3311082234179246,2.916451975161465,3.177051908437668,1.119624655440864,2.976589472637081,3.3396816032208787,3.9628891126093544,4.38653113238194,0.3378090827390434,4.740804661839376,2.032379743619772,3.5096806279245363,0.3523223611442827,3.483317556237042,3.370906969999475,0.15643042067729818,2.295041771622662,4.0840808067102525,2.1346720883364965,4.522291192803433,1.6773250725540712,0.875071628077011,0.1268710475979895,0.09935245619365984,4.70037611177863,2.565531943086051,4.250278151236743,4.541402088083154,4.236051816456644,3.4431282022927165,2.0407290078670726,1.2067088360111555,2.708404887903143,0.40943644545777147,2.6587481798127244,0.21859620487145182,3.4125174359099564,4.558156861170916,4.0563533217775625,1.5255024360663516,0.387535733638964,1.9541473626911487,0.36066827449574457,3.9672370721066894,2.618745507911143],"p":[0.2624739913419307,0.20749123197878827,0.11468771025195479,0.5679967590158794,0.4717887879655305,0.11497123399534015,0.5486333048659842,0.9001184123418249,0.834565460177515,0.8617141634597429,0.5701794583779527,0.8697092125725199,0.571453895367299,0.2562416842333115,0.9621437919810212,0.9463735319770861,0.9366515747829984,0.18436071936428466,0.5613652313551314,0.6241178890347849,0.5507137857387951,0.12192154835764102,0.06170001102566136,0.9755129952449939,0.30219014091357743,0.24492778251712655,0.9225433415101298,0.401689161998241,0.7829282819727708,0.7479962097006312,0.2033977737910091,0.6633298421962937,0.10014058444094798,0.18064156045449042,0.661435433210064,0.5102522121274016,0.5451249718642348,0.7117696337481292,0.018210727164607032,0.7045160223494953,0.8440707727161791,0.7557697258120522,0.5780156507043843,0.5485287998225274,0.7781991933804391,0.7922411542274528,0.7552060785368542,0.21625858499530848,0.9943413307114612,0.915555574898002,0.2608584500497475,0.7929709912825631,0.5782999277060787,0.5257855379102145,0.04570599963103961,0.5080572505326166,0.823492513229487,0.8176740126569935,0.9168827814894704,0.04052704119040751,0.5301194361712986,0.514673071679435,0.9390522509451533,0.27882430087012233,0.8394888672534859,0.46963904412071367,0.6956166553244842,0.5796225128759547,0.4813479633578701,0.9024790473431559,0.3144077253575577,0.11820644598354124,0.8004227142730085,0.9338152776648851,0.5154285824235061,0.30050723193915707,0.3211535364641076,0.7046784289770649,0.5011846158000668,0.5608702881353469,0.821350676656347,0.49261525218206925,0.41956836433643585,0.9460740868579967,0.22484319216747828,0.4923617012736514,0.5272327727468855,0.6224000832380456,0.6008500682790938,0.7980615772062944,0.027024878032551047,0.045242665865165455,0.4916953857094317,0.6566999318786817,0.4686048936419982,0.875267231510497,0.0036185066936049726,0.49682608739752077,0.8742246488880812,0.917689831913626,0.01577200019663194,0.12363753179769943,0.5087958461815136,0.43214542966678193,0.3247088506133502,0.5319995663497039,0.28016076668487955,0.7025882662041358,0.21040147959218714,0.3956851436775257,0.8140616712241926,0.3026176782028356,0.9541774364621587,0.2581543597863738,0.07372283475285135,0.3128672864130777,0.5686470656312299,0.10282474923176932,0.5792378971355578,0.9383685537696658,0.19409657520478296,0.32244578977734584,0.7646528345432795,0.8035714164351964,0.39692046802551695,0.8361870441086019,0.85826053375637,0.8128255739653847,0.4287347930270573,0.9991214756746769,0.5448130324600338,0.5508710393093277,0.21371386731705355,0.8365443978517895,0.020348889125461733,0.49610987020707453,0.2885096297294465,0.7080799411925782,0.01696664531927139,0.7289902068820437,0.3471180641763294,0.5801955541239974,0.12623689762464685,0.7268708302914209,0.17489468358580096,0.24941310563733654,0.3004744721693129,0.4685921594230311,0.6636782745921019,0.3825027614229308,0.5572408038860213,0.18028008730708223,0.7486375235637235,0.5806937269383763,0.24356616363673278,0.06411435135923105,0.8693607231416931,0.9110626169983935,0.586326364458611,0.494737017125384,0.7987891257977751,0.8287136959770562,0.3325245674974504,0.007726544160474358,0.15903195749681576,0.533948848768449,0.5609418393129963,0.1800655416243102,0.06419062260478792,0.40478840291094076,0.9486727875138057,0.5294745655652491,0.7667285570626781,0.9930556716719829,0.8282596396737443,0.3216819276661649,0.6355482126085978,0.9591317774286099,0.37779491321316105,0.1648677462869499,0.2698797961001289,0.13821487187910586,0.13567763058554472,0.01779489899647735,0.6616831559271683,0.8908262167557659,0.15530292018416292,0.5598349469955843,0.6362780607870322,0.6135005574956667,0.06717545926791701,0.9698757492414332,0.16457165163806375,0.8823450427850004,0.47008924071120717,0.3742616600766697,0.11030807673440624,0.8902122088632922,0.837151655851923,0.6187271209031286,0.05087682915549441,0.7772328997522435,0.5815533148516261,0.5216588975191199,0.8367144025408306,0.3225956305339126,0.7699419414264166,0.31615507619220495,0.13159256917989226,0.30249333796868605,0.34824171838361795,0.9415279071423688,0.4831251998344144,0.7107939803840211,0.8934451512589896,0.295792527450532,0.056953303182821324,0.8102837810765997,0.7288278821219074,0.4137512939471133,0.725695368896311,0.2812323695082579,0.5426779585148584,0.23393109722566519,0.8423934588862971,0.037688455812679544,0.4562161266077711,0.7394839466033507,0.48440336590167554,0.1463474132099507,0.4478196929068885,0.4505632851327013,0.0008689791792384494,0.8347478495870571,0.626455369382735,0.2717994563903299,0.9888497937339116,0.7002290635176365,0.5138749545816237,0.7531844155432483,0.008256317269028646,0.16083198462701276,0.030541112345257915,0.5476763938170246,0.3406969098041599,0.4260095020785797,0.9992740281075112,0.3308061630474006,0.9466870041689597,0.9353797070197414,0.9657197662253292,0.8578498311017935,0.944886829258992,0.811416523145595,0.7605646441071967,0.5339967642185728,0.673953642219512,0.19721295571981012,0.7222325810123498,0.2931986961079629,0.48347134835141237,0.8039258072323516,0.7658930122172181,0.9577946892867848,0.09292427338771891,0.3553289910955173,0.798416763455021,0.11989112752230446,0.24900597296692317,0.175607670634907,0.2593050369944361,0.5100460552845354,0.19958906820244837,0.5316776396052874,0.174121336914153,0.4123573180585356,0.24220199118737118,0.7752634650098411,0.4980780787025336,0.4234929683663804,0.32217508717342436,0.7615734687837181,0.7315168810049135,0.38052160678832214,0.8578229720367854,0.3001133287347786,0.7755576159297402,0.21137793811720784,0.11936530778824128,0.6690891170761799,0.8419076164663288,0.7375567367424807,0.02110148301376724,0.2684004212423412,0.9893092824690974,0.3839044202645825,0.1048873472708105,0.729955698594472,0.33196064082344745,0.8334718141656527,0.2682796510847716,0.3539304704643389,0.8894912527415562,0.034169479784591505,0.7745974307116745,0.19695428237022372,0.9877182858533151,0.5577319492383548,0.8597636698336131,0.8732969422521493,0.9642711028214845,0.13129866353699127,0.8458658395090239,0.5106748375410433,0.7834672446196713,0.5280825496741297,0.8182244940476449,0.7613589718981766,0.27310482677911674,0.5597053297171919,0.6279017252151295,0.9918550496595981,0.6830685188954286,0.619512333937345,0.3251778374376322,0.7197817153340176,0.10650125394804988,0.8977815763952859,0.18213613078633384,0.9112251887259446,0.8435168503582218,0.10718675561468705,0.8443216406067369,0.9197697950533399,0.8011332472393138,0.0422639989003315,0.22582770249384754,0.6163568370130859,0.04109888227654146,0.6154796898365948,0.5191554124133924,0.7616265240834434,0.642730755178208,0.7607782771510407,0.5770405470606417,0.6732208866980711,0.5492500425439275,0.5694440448661897,0.9341564599178909,0.6467930374719975,0.44304946826935354,0.3821735524286114,0.2660908515714251,0.8821183027265278,0.6031064861631943,0.1399391563611796,0.08512389913969431,0.7842082484569242,0.5248424779795664,0.738622815563311,0.6437006968238714,0.001416451019925713,0.7221505934394277,0.9922610212164866,0.6706424846279391,0.10210206131714461,0.13302177168352558,0.660059895992928,0.44056213636839336,0.38885264494366023,0.23780601983826521,0.1807243045846385,0.9449752657711528,0.2959426200754236,0.6210895372667131,0.4902403723624178,0.6036573044416129,0.4806415441907388,0.9699754850613078,0.4079006145128694,0.6371055513055921,0.7311995314625264,0.7462199065507911,0.20165552082865834,0.9074397118192961,0.8318406235593323,0.0415090808622427,0.8077806896030251,0.943061336257097,0.6706985200929279,0.4628409032472669,0.9823996849993155,0.058000495212760406,0.6402660877856001,0.4294807233534901,0.07823515184553953,0.7206202618981332,0.6234238657339444,0.7766351613179296,0.4785667813468937,0.5266617832794711,0.6937789815469639,0.3468611707322775,0.7788731661535002,0.4762148742630301,0.3135616870045974,0.3083728591138639,0.9423277832088026,0.3062235654088057,0.5445999714722449,0.00977943469425413,0.9834235298321263,0.9190325853706547,0.7963257588069417,0.7608937901633444,0.5049815917381377,0.8840062860773978,0.5801913892280333,0.877791828488,0.4527743574547207,0.13085043695151466,0.04378662046089432,0.5733065007176761,0.06825589971282264,0.9712290050015802,0.1693715670449787,0.9642645773567153,0.27943983810950757,0.34657378177225406,0.515880381253579,0.185675622063729,0.10802852810359931,0.33985323405302736,0.05804495416275057,0.6919940091616483,0.6414392376844411,0.2235838853805514,0.9120547140103021,0.695659945712227,0.42821094648544045,0.3463260754199289,0.6385983395490282,0.9268871200945443,0.7260466553019167,0.994733946302726,0.9727022409897375,0.19927800417809727,0.05806223415882927,0.8905307868605259,0.08163773916697292,0.5365708875560609,0.20824779998159126,0.05188485432065648,0.6164690728740831,0.4232322210554911,0.5618477010182481,0.29391176460606117,0.2604276660698792,0.24722143433044352,0.8877716691821838,0.25423196118762714,0.2403539037859741,0.5876555301980981,0.45196564336794,0.4021002015885846,0.09031857785187514,0.8121517364723925,0.3316428318294873,0.35015774386382814,0.5512912559467165,0.8721451313828747,0.334980903982802,0.6309508807744988,0.7502657566661226,0.928239858895975,0.5118503528182203,0.847861338031958,0.8725592271424769,0.6355062861393344,0.6693582650998895,0.5846494826738453,0.22893827959547552,0.730418652847012,0.7056223713370213,0.48652383126155874,0.38015141953036813,0.5777975622423377,0.5050486607712825,0.6206029441455698,0.6613278542347758,0.19300676407846096,0.6469482645477618,0.5344468170638432,0.7990523567317376,0.45388418170837297,0.706144034197554,0.8600116788512648,0.8837066668902382,0.6800482741733611,0.27476168690945957,0.32183869884612637,0.9440954105880464,0.014798420189958916,0.5734100203403063,0.6059123029649265,0.26071085203198874,0.4042062550243941,0.8589004173151007,0.20167204366803237,0.21861437540006334,0.3284667841507636,0.2787717791690134,0.5354394495803629,0.20217398965625288,0.9583855993165202,0.33182168850585536,0.8045148087573397,0.0074387705368432755,0.730404626233959,0.3480933058714608,0.7107945480957714,0.5679615095944985,0.01396637579892146,0.9996573873921131,0.4488642191212253,0.3887850241920623,0.8996188823980142,0.4081968660424231,0.19513589503891082,0.7923678474624849,0.02539099611484552,0.20415495102026782,0.009672959880264731,0.8928371628692728,0.6484093388874763,0.038363959533621816,0.4660735355481489,0.37786735633279545,0.8246126685490556,0.047316994374164256,0.964929728726359,0.017160963697916864,0.03292733154655947,0.7229254837834542,0.9284560188047946,0.13860822311052035,0.1695026950305858,0.38446103869696935,0.3822248634310501,0.33235168583010677,0.37301495831841613,0.08574803342396331,0.14476523517470619,0.17943234583121015,0.18735996232246221,0.3390860370763884,0.4504280202395836,0.5469424459956476,0.34827786964980434,0.38372623193406463,0.4501205243466926,0.8286527287103727,0.20672610695969107,0.7544724010955202,0.8106539010401534,0.7832714650789487,0.512559912994307,0.6804122221558724,0.9814502009176183,0.1468351560790806,0.8738019074919869,0.48475056338584843,0.4018593120572749,0.11547989331835762,0.17141184354399597,0.76909744099003,0.12747914988221676,0.4341813789816531,0.8080679329223457,0.021811581864119134,0.3705969875517088,0.4976097347774182,0.23275871819114635,0.9146792745664956,0.15103325356895358,0.19940731056591687,0.8335386171754748,0.789830366310456,0.8917785117802934,0.32146921412665286,0.3164189010669993,0.6970406001388589,0.5570050154335939,0.5688000335515964,0.30086230717687856,0.8103340882823598,0.3986878283721993,0.0040193764991047765,0.6739852432890925,0.14143300359344613,0.6968956279385148,0.5654607146774353,0.7440096897264703,0.31921792181238273,0.5802377328206421,0.9963612087039524,0.7657145077413061,0.8415593958643095,0.2912402079878267,0.010503942686381107,0.49768162321056364,0.7714795342100123,0.8923490124042222,0.0288199098705757,0.6487121233703714,0.30844846487654065,0.08258690607271002,0.3124025465728253,0.5329961896178481,0.5240313839324946,0.2133883304322315,0.161927903971685,0.2413253040224137,0.8769788845240274,0.0022136295408605733,0.5056954491739121,0.44046871620816885,0.10395222403174698,0.04085601278034412,0.775707356997662,0.5634978680996932,0.31242661034438357,0.4753085593823023,0.7304397839528372,0.862410614967164,0.34705187243934343,0.8093516169725394,0.29311157157767864,0.33159318099165236,0.779098747608197,0.07593944930547258,0.01902560486197702,0.7648392098690673,0.7077167314702355,0.10418640940519852,0.3601024102826149,0.6760489873415725,0.257811856704105,0.3253890979039691,0.9010398058961091,0.7701261254284957,0.390086371319899,0.37524927945399456,0.32823968772622747,0.9953420811493963,0.8459138602803831,0.5578125461773975,0.09672025875034929,0.9961357660367687,0.39749509451047205,0.1032458683990558,0.6904441951083102,0.5695838520642063,0.8729105852161936,0.2735012408785116,0.058399677249331594,0.7822064639554971,0.05962122716591134,0.64663082257818,0.7003361651712734,0.4813419750721375,0.6922121018163196,0.3432984861641737,0.717118929421102,0.04120097088738328,0.4763982647167815,0.30081233930785634,0.22430805606334325,0.018560115937029442,0.5309501166417647,0.6696690678282724,0.3565791642174039,0.18906082635148258,0.7990725128062728,0.468591795782451,0.09723693752813944,0.2826336610299496,0.3954381994537026,0.6636858221882722,0.3517536165039632,0.7291427221422804,0.9485589302218838,0.9047865864711895,0.1785554120956434,0.9739326331598592,0.9168134929152876,0.1141116319408686,0.7448041994923451,0.17519355022428895,0.6419215937065199,0.1814690062961577,0.9011584242316235,0.1552625530641183,0.9388462658581682,0.9392233604110725,0.8208285642578252,0.980181931166058,0.13109850756866237,0.013960358835076514,0.6840350083363429,0.07122814250996568,0.7874686428612647,0.5803863253188168,0.41282797822497597,0.2753309510430135,0.14990757940240096,0.9406591217536917,0.006757687254461908,0.42613533084801114,0.47083632420468824,0.24562550256793636,0.9937520266734698,0.21330064614161293,0.18993008007027967,0.5108786092718252,0.6523844539422714,0.9635498824615141,0.5323327775071425,0.4607709713637749,0.7064504032054602,0.6476201393469943,0.5637855331531196,0.5325555967650002,0.560912979370009,0.26655887447073523,0.1448170982247683,0.009615539635273063,0.7534522231842591,0.44796179607386644,0.5439370968024815,0.11292023699741538,0.6058229284352585,0.09727736815666055,0.947484986812664,0.3624499592128796,0.826711704695448,0.16709278577552178,0.15766420824767136,0.7060925901673498,0.5161528336800656,0.6952451006937446,0.6897905450482464,0.11421817367272413,0.980979988465597,0.35309302162656997,0.12205300441955447,0.8349213526060213,0.9555877181615147,0.8365152730031142,0.7593298756579205,0.672358891828565,0.7086745736947608,0.7617054029065051,0.6597543367595522,0.8454812664110212,0.26296554589563725,0.08550247803929567,0.7713207306517491,0.8709330562540056,0.7243067588741536,0.8321806513497001,0.8355966497427896,0.7106823374671913,0.08975990853764126,0.05673756672442476,0.34230717609058803,0.8743992131473994,0.6909414980621411,0.3376537439138385,0.5321734718515505,0.24962455338826217,0.7216656422982528,0.9085291756625113,0.22625015174615437,0.2829872546497214,0.03435986616838527,0.7836700378337398,0.2534048128323607,0.6227491820800206,0.9984716602814099,0.7391167889875845,0.9568683102864461,0.6566807574560916,0.3021062275845503,0.44070817227592496,0.3182185300131706,0.732775165634729,0.07800358326376378,0.6975432769196701,0.16691020386545263,0.14049679761028244,0.023917348186577314,0.21584572823912884,0.35427680851281473,0.5505463945019047,0.6812207865843378,0.2104723896182421,0.861059003327884,0.8523495689733576,0.5624594789859458,0.012858321047148014,0.46906381726865587,0.07840919959250603,0.7932803530538726,0.16290804643040957,0.5495610615158919,0.25748426959981807,0.7864346294696896,0.0035466489706379445,0.768998389850043,0.3562855690845377,0.24921557866473854,0.27429428772077813,0.5751915976557223,0.7881168919018156,0.31243021981091346,0.24306984211669191,0.10706276244843327,0.658738433349364,0.30511067376336265,0.5439778855562201,0.12626651023584934,0.5548274069617007,0.9562496794660078,0.6051220814018328,0.6404939540893526,0.8180627970296948,0.7635478884520595,0.5383893877332528,0.5981144174735469,0.4620556876337856,0.4245349276231849,0.42342330723251465,0.5039546172894822,0.7725844003955145,0.041896451064725726,0.7220830490720731,0.4207189261092177,0.2215222901059739,0.9321895105415208,0.2928582445650796,0.4352605860956862,0.8155225658751488,0.7353580460133309,0.9445941950952452,0.6927383870431021,0.9903081134575611,0.7937913802187948,0.47665845124934836,0.25999378953815855,0.6753984414634564,0.7847511841310266,0.32333214603873794,0.48899498111573303,0.06782643344294326,0.7610495745664712,0.442726334903486,0.44499157007836687,0.06894953630879574,0.5831457062343435,0.40475269357722654,0.301106917143956,0.3046744895803566,0.8039149338177856,0.03188440469408049,0.5006350323987518,0.8402497866730838,0.3701453139162232,0.009304209826280552,0.23870229807120547,0.7919161670685881,0.6850362882766685,0.8824443964879587,0.16801144689043968,0.12868807580438846,0.6385345931804978,0.5946160199724826,0.4454159857119142,0.8555410428844039,0.6815601094633128,0.10906942762312433,0.36552518522969946,0.3414356615927536,0.02908479047178103,0.21903392983007497,0.14152899026620847,0.9923923483163499,0.051690963266970646,0.8541356174254995,0.6545931686901145,0.6129784195327119,0.7706289060007196,0.5423615213102033,0.9144238292264688,0.7928305879503499,0.009853835330072558,0.5261070944289803,0.7516549101488816,0.5739469215427808,0.83884123136635,0.14372095535746765,0.673087274023622,0.34770076739412503,0.8809316891083203,0.7748974100864785,0.7033751654934952,0.9623004088844087,0.8818736682263317,0.3752574840204015,0.3829750409814101,0.6750765786165547,0.3423173082385764,0.10805131239842036,0.16631626761915497,0.9655236195815784,0.2610731428031403,0.33409964506770184,0.20694847643199,0.871543872360258,0.24127351353178228,0.5408569382716684,0.7108050461439077,0.2432623538148151,0.9060425713985798,0.7870835941800878,0.5095904436049956,0.20140618832252266,0.845599427668537,0.28131061802061863,0.838273176945427,0.9492125147473347,0.2852400551865597,0.45562627680392187,0.8714769502652215,0.4552209428173264,0.9279452973168543,0.43211913422907977,0.05487803568956662,0.05986321210709855,0.3596207186456024,0.666486494251739,0.8284444027927067,0.13081123060465494,0.593194546999005,0.42226637465758743,0.2153548761598183,0.9569544639368814,0.19520661464965605,0.7339020856715008,0.845550800811715,0.48564085611661456,0.444640328272498,0.5194569639342133,0.9210330236617288,0.34004995975123764,0.09216564145615602,0.2860093146093652,0.7976572989831328,0.06734590059968015,0.4403067134737628,0.09816292293072548,0.5324527602870834,0.6559600058846955,0.041081843463396606,0.9133888962911325,0.351933815340963,0.8441542544293605,0.5650245611747924,0.6058494767885143,0.7001520426974852,0.22068425078625675,0.39199092001199465,0.5724072737829919,0.12078460898415133,0.0205774315898688,0.04090522947890052,0.8521856191084896,0.086689510786637,0.11107551778016389,0.17926210639459095,0.8195580158562858,0.38166139777493346,0.1487528487822658,0.9063996779986014,0.5882039708234015,0.23139574233462779,0.6807338941205667,0.7675177517779259,0.5996597155989194,0.9139150327585783],"mu":[-8.00841440454058,-9.570972703255492,-3.0335593804434646,-7.997489001170033,-8.262625355641976,-5.064274960297741,-4.9212274123105315,-0.8649500505907937,-6.806555250303987,-3.6814840152739325,-3.625029100573056,-7.403536044384193,-9.198724833392163,-9.873983339829866,-3.023730381629899,-4.097441474073877,-5.238258143151107,-7.401912299523293,-4.193485090062172,-5.196898557242566,-4.640318320081304,-4.741129266912427,-4.440702584669294,-5.1081999436372865,-3.666491682003299,-6.359849609473187,-7.3991596343265424,-6.896407757139267,-7.31322943736977,-7.706674793836901,-8.175775557840812,-1.0578635878273013,-2.037168884033307,-8.146897356173044,-5.7969715040476855,-3.5246878195150178,-8.94780609334543,-1.074654902600527,-5.13915082235894,-6.940482497250593,-8.476580895567523,-4.352811442433493,-0.39927613363726966,-2.647483586360919,-0.5684253046459298,-5.430614030741796,-1.4216444792974037,-9.302489151556655,-0.8535121747772689,-0.3540399184101517,-2.227900224764665,-2.0459385310951927,-2.930413672451475,-3.7421635588560154,-2.4005204676019543,-1.1153254639030008,-6.109760107492111,-6.051020295582563,-0.39459812879833356,-9.011451849674783,-1.8503142356236757,-7.242347683574344,-1.251476183358271,-0.7894507493760106,-9.18684121176949,-5.80578811164727,-5.232103498099299,-9.52019933703731,-9.793934159664904,-5.994728294429965,-1.0890676130048216,-7.910531032751251,-7.457522340112646,-3.9245691163957064,-8.858479341740686,-0.5953830296984797,-4.898934216819217,-7.647532090051056,-3.9346367708006524,-3.3941009482433837,-9.988395972487735,-4.921333913434973,-7.652554704244611,-7.898711023806435,-5.085061981744929,-9.207545923329572,-4.660357635745733,-1.8471268483421932,-5.692081016672739,-9.43883917680482,-9.3484351751549,-6.182873856836091,-2.3965958436671198,-5.312706698502732,-5.6185793993910815,-9.097855870698426,-5.97545274213219,-4.901474296771109,-1.7434067588606639,-4.765813937028609,-8.088953518386022,-5.829531586079848,-6.12384853257991,-2.875553184690547,-4.8536249338245785,-6.348486077803259,-3.2529570402763097,-3.8495397730978453,-2.4077554712097826,-5.235786697777007,-3.0325352290055174,-7.8534460028332465,-7.081388778294491,-5.179286337594535,-1.5289043838226268,-1.3552651937323579,-2.2707682061061996,-8.55842543728863,-9.212961834034106,-4.363011337952072,-6.07004455177147,-3.931379057939366,-7.99871870041406,-3.8946195491660807,-0.6705952969779849,-7.272778427531838,-1.3372405792931708,-2.6456400315223583,-2.818843627790346,-6.3888283383095335,-8.501105070968267,-6.943917602546524,-0.669763441329998,-2.4415811402705545,-5.8553906182906434,-9.749527452832421,-5.3398118652027176,-3.815524642589383,-5.369469644980889,-5.610722246935946,-2.7007647851420225,-4.942456233352884,-0.593510772523349,-1.126970659831903,-6.847523384102338,-5.7738027553936195,-3.7177837789151336,-5.540139390514591,-6.675080077666031,-0.6746599465363712,-9.09770319186897,-3.2764129963579047,-5.314949938141204,-7.288344378718918,-5.151157579895327,-5.2974752843935,-1.716149745208977,-8.784215823617101,-5.662517150909194,-1.0298596860107878,-2.0752234402996272,-0.05731240407573335,-5.574027263006549,-4.148396695013976,-5.191467051599341,-7.343494549246408,-5.977223928727417,-1.23993263192002,-6.993000369361432,-8.984501313218143,-2.336333067352565,-5.951729886992934,-5.2170555155096565,-9.50994032761245,-7.884480564909349,-8.545369765118497,-9.242124798739441,-4.279961089019397,-6.133097982645848,-1.0839628497505105,-4.025182988246698,-8.510691148351002,-4.6278737306774005,-2.791541355178042,-4.450376985291166,-0.5609057506496562,-3.7713767674919785,-2.5409186378586535,-7.245479823415204,-1.6290873730987765,-6.064969952766701,-5.126208535945304,-3.6687871818584084,-5.16776555809815,-8.403172788715054,-2.5760624413350874,-2.379046359709318,-8.70616307365867,-7.056244556304614,-3.623266551965383,-7.193592921743404,-5.783964636666116,-8.545902979541271,-4.5991831078076295,-9.611224989390077,-7.919146653086118,-6.06938122898878,-0.678212109392442,-6.77042094301648,-0.8536703807938917,-5.260731972377055,-6.354787935501502,-6.9573448539935745,-0.44272881988743684,-5.8409866933500005,-1.9371224517233454,-5.134536901807363,-1.3019623837065941,-1.003345603550414,-6.210891979622559,-8.712678052789721,-4.365559553527236,-0.3675374858066882,-2.6177491589232416,-7.452974341810457,-5.208561745456494,-9.109515753600999,-5.972801648995962,-1.9619218930144044,-9.53313860050913,-6.5153861621280935,-0.254658571313795,-9.400637232947302,-0.5808588988582963,-7.744292944090912,-9.61125798460406,-3.2397607800528405,-3.6825408561394024,-4.865870553706452,-8.7764152243499,-8.262704041330629,-2.360174035636129,-0.48714258521347364,-4.1670436062777245,-1.748148194011876,-3.525663670570993,-6.8475674771243655,-3.146843107786399,-7.740982644467296,-7.753270814429653,-0.48604303201400745,-1.37894596496704,-4.571877185402311,-7.362633023523055,-2.5566479811919174,-1.781595688583446,-2.2964523843844997,-7.5333424560039415,-8.767319954979051,-3.2320350953709953,-8.5486635822181,-9.65083215753056,-6.901015616636775,-6.857331803117102,-5.582961291097073,-4.178464260016767,-3.564193527755626,-9.183144333891306,-4.861455587210495,-0.1773497664638901,-4.621956369595985,-0.5294211965850115,-5.928291951079389,-9.77810465043057,-4.302252535261224,-6.246553759394469,-1.278342036678064,-4.274415602276491,-5.065910567803376,-9.078408358422541,-1.909806101674707,-6.522707400533108,-7.632265054719434,-4.64887992881269,-6.129700335452655,-2.775171626500428,-5.471471988587702,-8.624563689600155,-6.0942084989482765,-3.0154111527064065,-7.713844291413798,-4.5341991178046515,-5.373892800580498,-2.1256463583660667,-9.923949062941986,-0.46586364350680975,-3.143433439821779,-6.723531715889475,-7.074358252165165,-0.3662673737566591,-8.141233966983307,-8.808560005738935,-4.569116593575453,-0.033569851185670796,-1.2826435176317075,-5.682812267486237,-9.130201977120112,-9.15780193778546,-7.721722856454356,-3.2820127587670767,-1.5055611208390807,-3.6070505058689717,-9.487227974200499,-2.529237047684292,-1.5775836420819478,-8.169853105010997,-3.3014655585791552,-1.1690362233865081,-5.871353285542973,-2.4993472111603654,-2.11365937431242,-4.701607184413479,-3.6707781166925946,-7.8912449612660485,-5.080911604076612,-9.238106466532452,-3.225935720461155,-4.7715346916594825,-1.1107503722681211,-1.4810944330705245,-6.265474294161308,-3.8885926283781624,-4.712674087123448,-5.396222116620544,-6.36124545924522,-3.8357332547455347,-9.81950946465025,-6.281902865861193,-8.756957438739775,-8.10719313330545,-7.871639244887603,-4.602234051636282,-2.4655642955657298,-0.8837666418938683,-8.774353297392764,-0.8601665845426942,-3.8526499514454504,-8.1993036435966,-3.497530616041402,-7.590188789671009,-1.5580786741063113,-9.970234279171146,-1.5211553631193486,-9.088219884955194,-8.570977985061628,-1.8428839822030119,-3.978308782265272,-6.702251899563301,-2.797426480681837,-9.83817377114307,-8.520227925600079,-3.3728170527888857,-9.275101513810037,-1.8290938480881036,-6.014089993557999,-1.3710425516963887,-7.3069444926470055,-8.60645182459805,-3.5697529614295354,-1.075716615746749,-8.467262521445925,-7.565082112591332,-4.554255507052063,-5.17111171658954,-6.760642521917372,-0.9718452811871692,-6.789139628590075,-4.510640561620769,-3.637481937865197,-6.125844799040441,-7.558321429548207,-9.400634604104399,-6.731671800119621,-4.7286197832116805,-8.706358790214566,-8.728555490163206,-3.1864644785129137,-7.283289517210809,-2.5406855426050012,-8.996582505110647,-2.4424271249437024,-5.9165097597199345,-4.593334976360577,-1.9905631209614971,-7.089590240321724,-7.606442451984654,-4.327760521232418,-0.6745743886500244,-8.918884708762631,-2.189597489117623,-6.935665083508427,-9.813823316480875,-0.23395397228763049,-2.906779751321451,-3.3285631070993182,-9.149991709486978,-0.8604005412649474,-0.9774948095297509,-7.613588651868297,-2.660555398131206,-3.1045392351110723,-5.088059773393436,-3.499109550645738,-0.6112446784225511,-4.130646922171126,-7.657264582611316,-9.507787864495977,-2.2774395855936325,-8.157784943455278,-1.8681512056231475,-0.8504668965093498,-3.46633728104651,-4.4671772026468055,-4.017356964685533,-3.4496571822307054,-3.2810872762816357,-1.7980206493162587,-8.312405413131554,-5.820235117935441,-8.06768584724515,-2.059240572559853,-0.07807378632850082,-1.3862706171334271,-5.181170214887243,-0.11309127888393888,-4.3981369827891275,-6.4238280022731775,-8.43795099820295,-0.3746058909672567,-2.830328629934331,-2.399988471433545,-9.258722961270875,-0.07239735739919873,-9.771034339201407,-7.813868606544632,-7.32094962719507,-1.3327221970129521,-5.8906827479672845,-7.091473255492698,-5.471778188779566,-9.484229870638218,-4.368813837068872,-1.6777911204892826,-7.962332189680932,-6.161021870847105,-8.297913985116704,-8.834167089132771,-7.151874256257469,-3.799319402559602,-6.6130016424207945,-3.6842115555263377,-2.7920414611946542,-1.3498422245898967,-7.078983696904766,-9.72411887077418,-8.099487325707987,-8.601593300797632,-0.8752765001179807,-3.1728352770029633,-6.059524789424204,-3.5204526397873215,-5.54959707882297,-5.519237491885538,-0.26918387057041526,-0.06151303472446523,-1.5084807491285268,-5.330186714090585,-0.6978861486256083,-0.46720356791067896,-1.441014784999819,-6.050146049122276,-9.426103893548133,-2.196383593261686,-9.636553342495265,-8.457160715032936,-6.163694170124046,-2.8124590115452186,-0.6254357153838419,-1.363728017145165,-9.433582415183206,-0.6002219532995134,-5.894615979983467,-3.7334171507651503,-6.845979877635207,-4.991684237376612,-8.47401992519396,-1.5911185636958614,-0.07703781935558762,-3.789901831001803,-3.282110953612174,-3.226810749442084,-7.919927697533677,-9.484011108389822,-0.7495590727703028,-5.464996019504154,-1.1278109261596159,-8.678311253238501,-0.8107126074415572,-1.9307160467453066,-0.7866017182193619,-5.510012127551698,-3.0285606742535753,-2.820456158536253,-7.409352172070889,-4.371433434830974,-3.258298973646485,-2.223681147786891,-3.296769749522579,-7.579980275498633,-6.027091032470451,-9.39464499444747,-5.026661341800098,-2.5761461960780374,-9.874676594569497,-0.9389984947914032,-0.33171565776889844,-0.504002026930157,-0.02876049917027279,-0.5952556010887022,-3.9275793306476414,-2.869938830116976,-9.963591277358262,-7.536754236585708,-6.518246970257362,-1.8211618117246697,-9.907205959495776,-4.717049219499893,-5.435775979602,-0.5141450313075957,-7.742780005294707,-3.576484544118723,-1.006833296239431,-0.48451347256595945,-1.3637697110693803,-3.1987138931821546,-0.5505746657564203,-2.4797275305750732,-9.913461354252915,-4.3248315939837685,-9.724012796291126,-1.5947829775158207,-8.549384411587305,-8.386377303119968,-5.844955328382502,-6.918851756180522,-8.880246651747001,-5.175045501397324,-4.193876785326571,-3.134827517909602,-4.740560951714086,-6.090427316084821,-4.810211242222826,-5.893860648436955,-3.598676171783244,-2.894766887172824,-5.896144139063062,-7.244929460465237,-0.12067602580827952,-3.4148684048633937,-1.5785984850063128,-5.7731384845027005,-9.341581720511055,-1.8377082484132723,-5.702274531011662,-5.138043541993829,-5.280839978275265,-1.2140787623773153,-4.603771441956795,-3.394814535422186,-8.15773332078997,-0.49966246527094915,-5.121902920884089,-7.174800300392857,-0.49276096896645916,-9.644120318009026,-5.666502860423453,-4.725854420115596,-9.936489796296657,-4.747553401060117,-8.145727873835988,-1.3331315471739824,-0.16062852468019084,-8.471231704977047,-2.481200402793209,-4.293069705202042,-2.41363988685636,-0.4608362829785717,-3.818096044175896,-8.167169959618448,-5.54464938592859,-9.770354275384294,-3.7555072967483505,-3.637650134572743,-2.6925714964267478,-3.6143606992806254,-7.242881332762076,-5.748124898347189,-8.581104805819768,-9.200150464368551,-9.558947743411439,-1.0652882630770066,-3.265261409753586,-9.286475325654076,-0.6264658272870571,-2.955083629903319,-6.335247579780039,-5.288421152741433,-8.921971140065313,-1.8310912304613036,-6.692877511355995,-8.688179044857973,-7.854181144877456,-2.1760198761129868,-5.469082869789597,-9.42942023879171,-2.189798772303486,-0.93654644160168,-5.875481762029695,-7.553652318644232,-0.41589390619342526,-8.890217988763167,-8.546017844702032,-3.9019449416174345,-4.623151126368601,-5.9345448124522875,-6.1401250889786425,-1.1698837528627082,-1.1588881057689382,-8.76485452260972,-4.162638085860224,-1.479353958011722,-0.13254999627950959,-3.5144325351613026,-9.88682375673138,-6.996910980363172,-7.262185103401535,-3.818382960227964,-7.294752390055161,-4.476623081939755,-4.25514010342289,-0.07979760615096643,-8.602316036842252,-4.571335922363822,-0.6682566259940592,-9.147889297318152,-1.41641597949141,-1.0670185388995668,-9.814134998988989,-0.45785120594801443,-9.91994128300609,-1.7360456386118717,-8.483359097302323,-9.336419582817205,-3.9981322938307318,-6.453964787846256,-5.2889653996836135,-3.531648315479441,-6.579198369012113,-2.1123635065537116,-5.969787317077784,-5.805735382246599,-5.51893773403378,-4.126887163330483,-5.043299910007091,-6.141783779434597,-9.386877283725063,-8.9827755861164,-1.9263718099497606,-0.20365927685305651,-4.051082468542921,-7.199260708674597,-5.903939554781843,-2.982900333867209,-1.1140447365544848,-4.1488817653522725,-4.714298000462406,-4.994681995516615,-4.998856193184887,-6.816856888557437,-0.13036769853463914,-0.3711686576055606,-7.383525110393407,-4.325439939406319,-2.251970704013657,-8.955316779150186,-5.757267402560508,-6.921710391924394,-8.212212082616864,-8.462948478806636,-2.6788576248336016,-3.0425541450571036,-5.561331637310111,-9.349212522318574,-5.507095459390323,-4.428608836729138,-4.645898767296011,-3.149321634378588,-4.796388407087679,-7.614691870908345,-7.562068950470293,-8.631068153999578,-0.7158989428693219,-3.7303951327600826,-3.7574344579920815,-0.10360154911262409,-7.858739663555712,-3.7213043075543073,-0.9431015277168564,-3.6205470671885087,-6.435442682614772,-9.698297322206278,-1.3945321626733564,-2.520892613105006,-0.07853108495503358,-5.77692099234747,-5.207571154678769,-9.462741085931492,-7.071222642662045,-8.859835061533875,-8.472594655057257,-9.96057595961522,-3.863998406316631,-8.515841432632694,-4.636559541426452,-1.722938528485074,-9.219489860997427,-1.5221493376982087,-5.0621650308486394,-6.339374701686911,-8.129750563481595,-5.758114780353498,-9.542009972863593,-4.489134253658169,-8.332780170535226,-3.0819109256493915,-9.715458038832452,-3.315842325299714,-6.242535529833544,-4.236670694278814,-0.563356267532158,-9.196780073038163,-2.9704998700864427,-8.506870359983056,-9.320753987426107,-3.419240689341767,-3.7503645406333064,-1.5114942704553092,-8.076046710914442,-8.885211322732289,-0.44861972559682384,-8.923487124756713,-7.772615356476093,-5.022430383939622,-2.353981055546228,-8.2399140414563,-1.9608272496523815,-9.326941345613392,-3.5655225451596717,-7.084283717992863,-3.4239122562412683,-5.208817277246672,-5.869330023503869,-0.4143044305309007,-4.941986328906989,-3.7779179506526606,-7.4957399987641775,-4.561601535709199,-7.507907046516793,-4.677750403209302,-2.868781306957058,-2.179565531525187,-7.62718464317061,-3.616181818798292,-5.794519608413868,-8.20874015745285,-5.088097869813206,-6.424917697233905,-5.5496250545584065,-9.872318011180967,-4.1669913168689305,-1.5882389180088285,-9.526472058990706,-7.1698090104151095,-6.188395563116349,-0.9998155117097074,-2.2716643275524873,-2.17658798702715,-3.6411082937640593,-5.871987664501206,-7.289846255087324,-3.3641481617815017,-6.640915436571251,-8.11122830588495,-3.938660634444371,-4.8587216786502445,-2.4865521859853756,-8.23896363553472,-0.3804701682544853,-5.2541165063919255,-9.060119143196186,-9.227725908663839,-0.3797462800240492,-6.062980237015982,-8.310093632844314,-7.1008656188476005,-9.753125638423121,-2.3372301741718693,-4.317929244368335,-3.443479477711151,-5.098860343305153,-3.3330546113037696,-0.8386456604357639,-7.162167218486315,-1.9193955985714872,-0.17000119977799155,-7.549347337258832,-8.72461925301771,-6.475809218845052,-3.7426402940306502,-0.6265078658548084,-8.955363021926726,-1.6671381257951756,-2.1518673123839993,-3.846279769607013,-9.257606304686355,-8.817096153952626,-7.467482848523943,-5.3165522338558935,-9.230541703162862,-8.631705286291071,-2.8103025939472404,-7.6449068853363595,-4.9144723473396645,-4.013149316596452,-4.492141197736437,-9.954715320516634,-1.208817203213426,-7.70728145869334,-6.604019538151508,-4.148513907386269,-9.0840164723577,-9.081970770493868,-1.9925319211216452,-9.459129238634635,-6.8751049384955,-9.511785808072856,-7.016177427946772,-3.46110748965881,-3.51095742507997,-1.3623212795384698,-9.513378016127875,-6.6573226945625885,-1.9497930502024263,-9.12479185083279,-1.4337241690646807,-6.40517708781378,-7.977532810104275,-4.6322794471847235,-7.983088172328337,-1.750854811119491,-8.238389386522421,-6.114115257000217,-5.466420934959954,-2.1915589388848478,-5.155491382592324,-8.152553153625174,-3.7836657755193626,-7.964660364395504,-7.107139804007434,-9.802027025284016,-8.123575694549812,-1.202802108139851,-5.137034253932589,-6.689387484117404,-1.643957748525906,-2.9228092372150605,-3.6896911641984964,-2.736771101802673,-8.198200252152361,-9.102323287218312,-0.586309823744231,-1.6650816123318268,-7.644569827556175,-5.527858456262102,-8.603803279452304,-3.0703272463944575,-7.5505320071651365,-8.322808448805487,-9.436044119547462,-5.236264035062157,-3.007758927998012,-3.498878133171832,-2.963075448445518,-5.955390615358214,-2.676549237311816,-4.272170491685441,-6.916786302652225,-3.1308807283589957,-3.063822297311052,-5.593411519723437,-6.455665383837632,-8.980726052610052,-9.864543458009138,-4.124469400333237,-2.1768109488915433,-9.092249243378458,-9.443601102802862,-3.477579964812787,-9.558271100223621,-9.964849861842604,-2.621651241315346,-2.2074589849141146,-5.595560874250598,-2.5878753484664596,-7.2918271726056005,-5.461646706629439,-9.905998902449653,-0.9353713551995324,-7.334261709237168,-0.5089998110671323,-2.4815451324878413,-9.901869495090299,-1.0659070142290594,-5.747286343901148,-4.325320540022231,-8.838606332069354,-1.2121510891898901,-2.213097544261635,-1.8257622048802014,-6.8444643945444845,-1.8867561258457055,-9.896187853427348,-2.1030533962461173,-1.321150820498409,-0.4311481346832058,-6.562675435431,-0.1356375566206336,-2.560685556086295,-2.379207879273255,-9.99544583259719,-3.2411388424621523,-1.1568789491140863,-2.7055462318576384,-4.574617172271507,-7.209020984692307,-9.437881069747222,-9.895487947532702,-9.423517600732955,-0.8516687299893011,-0.5712327027958941,-8.707561651071732,-6.663417411391414,-9.185679615596188,-5.632962188153843,-0.7338043972225194,-4.980200312512608,-1.564833959449805,-0.7421271373831528,-8.498988800172773,-2.501605919658958,-0.39040476164688087,-7.058236170009591,-5.636476212778694,-4.725452585646237,-7.816254001396262,-2.6514326056984805,-3.031290418202337,-3.8811168048280176,-9.688691360444533,-8.587818001007804,-0.3353126422126529,-4.73342152784843,-3.542916290158087,-5.898341200788333,-0.5945934064099845,-3.743843181997155,-8.310571043388261,-2.188281369187941,-9.920355204698598,-1.5471311719131298,-8.706841737747668,-0.6604979357508767,-5.4635397119741125,-1.345478577455852,-2.0457713139488587,-4.521247063830323,-1.4621421713726646,-7.0960594272598225,-3.021845130842824,-8.517052752453955]}

},{}],72:[function(require,module,exports){
module.exports={"expected":[8.192736605193456,1.5900974124129355,-3.79768552852232,6.565311133198347,3.8444257799871866,0.7426083811306268,4.219159536938078,2.4182074932262045,5.377991207974557,-1.042527543438485,9.962577174735651,3.580007973471117,0.2966074131554725,2.4254481715544705,7.638524011630607,1.674900950818662,6.697893833971007,7.332793864739835,5.936923388211416,10.737195427006796,3.9098135543112416,1.9787895455666769,5.52524333030746,6.48105095644255,3.5595691418621644,1.7225158581707465,6.46537875166048,5.892139125954328,6.131430894227313,2.491280253901637,7.294077451377016,4.26577796607019,10.391533378852806,1.4009346333217456,3.834673750615016,2.5757789644461244,7.035521841449238,-0.1242142961329098,3.550676955301699,7.704134986906132,6.469986694415819,-2.893504578876316,1.323625045062891,8.367646703842501,1.8720265982004411,5.622754354224199,6.113238304590291,2.0509286914935707,9.317671095268935,2.2907463443873834,7.418789264184078,-0.2880507019223111,-3.0360442464391673,8.799719541203677,9.648357697147967,8.199591986877538,5.584655215608181,9.432693508844377,9.531090575804704,1.3247809824334285,14.833982331912171,1.8764053516503334,-0.6567135756063396,-1.2194752353517289,7.295573662232825,3.0880723654111426,1.6898998715562028,0.563579647009052,7.613252932360075,4.876313751507425,1.3322353448946016,9.45505677811594,4.747055403593079,7.145641725202677,7.962124606161552,-1.9254096208614508,5.602550861733177,1.8577069106337882,7.231140004350442,9.380873188691762,6.810292334627003,17.423828728507118,9.489900684345784,9.483098747670859,8.775972402930512,5.62582096802896,2.0891271560447033,7.649517245346393,0.94045625204269,4.618769165268861,-1.5294209578735174,1.913228388290696,5.102418769674909,-1.4110375725290547,17.08391363110396,7.6796269441416944,3.615841398226448,5.316914629543269,4.484004099527876,5.586760761984085,11.07621203964849,2.7679101331393317,1.166007093252397,3.2608947951760623,-3.8699340621499,8.364185791948199,5.965645558071447,4.450147078285053,9.864035894144214,10.789627448831329,6.030542492331876,3.7198317147956868,11.385578952102145,7.819030369871197,8.912297430808579,-4.239598549368102,9.65060646279246,4.666865283315671,7.666157040038299,0.654765786843702,0.35110876343434344,2.3773901851313064,2.0411176440541285,-2.0418468214085386,3.699640990195422,-0.5527264219803633,5.264316065570626,15.892781299167318,11.886480479611585,8.413880776923925,1.116452593521148,7.188073204955527,9.04463532335573,2.69476945283525,2.7102856504436454,6.8133266752601065,4.191058681315704,3.84933781406458,2.8740731937260042,5.670209101126323,0.2919451084415723,9.623562147821639,6.138056749962727,4.752448800654558,6.580409245443483,0.8788466741446141,3.951533205107021,5.899376109620047,3.2944828091590663,1.062748417730336,-3.066617113000257,4.83839999934352,1.7864874236545365,9.12635178461423,15.824471461763313,3.052726087729186,8.842326433227335,5.963177116862203,8.515604253784618,0.4265449855354593,2.807684925781245,-1.2606717230147657,4.294273781477091,15.513545182086247,7.7786502549418435,2.021847428166142,-3.5101949072991268,6.046320468859864,1.3303311138519671,6.889660398377002,4.410680452608321,-2.924213639142951,0.5377920383873104,1.834067919105896,6.773663207056187,5.633724980563841,4.9816253780779185,5.018634659333925,13.263078016988345,5.669610220527146,9.969941098001948,2.8147769328881296,1.0806562454400526,-4.050244791018203,3.960794563420986,3.3442056642738094,-4.312680394712471,9.953951531689489,2.8926762026850277,3.36222339457889,3.6679432691715954,0.7230157558208721,4.641454344096602,-1.9983703788887524,1.6740801857188288,3.082601206196581,4.324924989741642,8.304633403097952,8.160652314928658,5.5262256499667295,6.414350910029974,6.8570234156784355,3.155518624429091,-3.628179703338116,3.151903091723229,0.976638788341945,9.083717214288376,16.90153813025534,2.58128043683348,-0.1337900885586225,9.824309965523277,1.9302475724478063,4.365623698092849,4.092916402914757,6.777740338620024,4.368341562202833,7.7969319599207125,11.019637651464445,-6.177335043226321,8.200855285880335,1.2806918107868368,1.929849447885228,7.090891326113329,6.023916929374194,2.9845557523316124,2.7703688200298413,5.2364499854499575,0.7608963824359805,0.9701793520895386,-0.25101003811473044,8.896059496576118,-1.1394029729966313,14.986082696170534,8.7010231235563,3.0098862571061002,-1.4787401875613657,2.583747639216227,0.8796695612630727,9.699882361247223,4.245565107208964,7.9948346621226545,5.039807300460475,10.488151359216204,4.324936907726097,3.391170658409601,1.5510083244604842,-1.262566490324074,2.417074695881747,14.897098079642696,4.9124130053477195,-1.7316888273479105,7.881864394964689,0.5122085952926776,8.739170204421118,11.718972268308928,8.330550051207668,-0.3741946117396484,8.614551137856305,7.703305399061986,9.299545509226093,2.11696369868132,2.2971341010866198,8.635138536990858,9.70941252406873,-3.4193283112908746,-5.314301622150246,3.7937342420316265,6.7415698510870765,-1.9186685371935077,-0.6167201881292121,4.126997925237704,7.077864961591571,2.2893310624383645,2.703781412719324,11.117182660647888,11.161419690671497,10.328693568802096,14.25490540673367,0.7297570584870474,2.812587571645049,7.4226445859037415,-1.694145531174156,-2.6388279372941406,1.6918169159096883,1.9890014868102703,5.810314742840043,3.832531945207264,6.335097018163393,-0.8613920617465949,2.4085210212192285,0.4523949093448236,9.36255475624176,7.9800524759373275,5.801407413352082,10.237982897985814,2.7382051627218944,3.8427534833466948,1.004574527098728,2.356327508215068,6.2762665587016935,2.8548145215333243,0.8778517463106333,0.22143247415054912,10.521840151207027,4.6698915361917095,3.69964434038926,9.949317446483356,9.608939643355576,4.5383993027448,6.144866189081328,8.301196835612831,4.2285524930235185,4.498468378379392,4.180013265835498,7.28871663435047,2.1813848580140283,0.9071404200198089,4.351571226913769,5.521264579690303,1.222009522265807,7.493574045039672,2.486934521236451,5.838446499038332,5.980069485439601,4.432782681695652,3.4379999102776155,7.370836304548746,2.381352481128851,-5.200098737687431,-1.769112632817457,4.447246427928905,10.700498308669546,-1.859973968428065,3.9383546567742083,6.6392750184854705,5.8740785263809965,0.20690283439677915,4.810509283764178,-0.6698457438089416,5.319697424079944,7.8078928881900795,1.4327494667621974,10.84086591132078,9.78478692942043,9.021296215320794,2.431777969123991,0.3704781407262852,1.350523180003358,5.106604678869386,-7.575603490191564,7.755363529587363,-1.5576578974318154,7.859347966026837,3.4057924286249155,7.695486812442194,19.790641755965005,10.284349031700366,0.5796414754183097,-0.2249485585123554,6.595814275130249,-0.7880821701568137,8.840141925990517,2.5179983168241704,8.170910352234129,2.1037544707962486,8.438789021289466,3.0996049157924546,11.293704305641674,7.722582850541239,7.118629754793467,5.5760301343685885,6.603164469979776,-3.895830953714042,6.862065745795862,7.293635811574501,1.8612209630715744,6.216920489712442,3.371079027932065,8.14503326680089,-6.095561918234782,9.100023832313546,4.209746724094305,6.499766579796264,-1.4780025758276487,7.474053418104762,4.777179945431512,-0.21021597443933326,4.517048182955001,13.31257311276188,-0.6628874060055265,10.79365908761211,0.23372235569097818,5.786039095357828,8.102592728488414,1.5939962442107616,9.789181377692794,3.7194565902740933,1.3703729052588787,0.7885760831954371,0.8923212537069574,2.441766321030599,-2.362200794098902,2.971098699825858,4.158637657126931,4.885481828684227,5.825294252859493,2.9422039271708513,3.015394847693455,6.901367477191079,0.8707444210670157,6.6728900579801795,4.633243364697994,-4.883917282143198,-7.023756344392911,9.94763074697553,4.809706040504464,4.421835246175697,6.9058448497127936,7.904118146914962,9.965420900738952,1.2623900760980076,2.6793459694924797,6.08753212184925,2.757552906449921,5.271955571861717,8.402338781625431,-4.230259985947265,8.3274741269669,-1.9343110062547737,5.0456586356130915,1.6657773358606427,9.903167286032152,17.89802567654373,-0.8605928694285223,0.6669998621691755,12.903346780312777,9.870644964471698,10.373410168781364,9.76149370828895,7.645110518681813,12.477685227322883,4.788311061693339,8.021266355841558,7.117794906628361,8.51388683991754,-5.467280421172496,10.32801883608635,8.634279388540289,4.323715711152696,0.3764450135115163,1.9610298550074712,3.0102032539430663,2.872576561117321,1.187462169671158,9.362811779757005,11.68733241760939,6.336485182385536,17.984041379532293,-7.246050488114836,0.73720133911543,8.96788638789906,2.0219401222978464,13.264997382769986,2.4596991576959386,-1.2595562015258324,-3.831801877927404,2.1012476848876442,5.208232995311603,3.9756781738448277,6.268882537344755,-0.9812040290341533,6.453130980946545,2.7695874991379776,12.08566269094109,-1.510074152142849,0.3999477919343015,7.820412772326475,6.147498307221408,-0.8388261868740792,12.131986975543839,3.386071578330475,2.3701171332751807,5.765199468671302,12.891232458724081,8.593598398556422,6.111828930287503,-1.0406323737848733,12.46455234112073,9.811371000535338,20.16195306592664,8.347855379495671,3.2344716538652105,3.0150989247285023,6.313417024060061,5.2059275279357635,0.07409037953227915,3.299645479359227,0.7596010021607419,9.320481132562236,13.067836133532214,10.62440455067502,3.0639847364485115,8.090953551899748,-1.3156039696724973,5.540265815065614,6.785199533151497,2.8425224965412927,8.040796748470465,6.9887568744624895,-4.154426987165303,3.3550141163488134,-5.243745142816394,7.535741152575456,2.113709378118462,2.1085878595606924,3.381642287967445,3.5189523992518956,22.711033219745797,3.8354734757008937,5.912621820850148,1.8821530165082778,5.577166699871196,9.647472456555027,3.415012815232975,7.419668133122183,5.076844865584109,3.2518006977721323,8.91217023051421,0.9815779071084054,3.934155503591585,4.482582868159474,9.425769400435158,3.3580349861026084,10.382974880824952,6.835724133530929,5.205382424944394,0.34735782883384636,3.1441180166865337,7.653557807739871,12.516730505570775,4.575512239338864,1.865935300074888,1.3956151696070864,3.8920236237898687,3.8760895323068776,4.598903460399271,-8.846779940607062,9.452759960390976,7.057475032490981,-3.854192838654096,2.951871560150927,9.431794984848421,-2.576510040705131,-5.65414840153754,5.878582111668061,1.4282942282070543,11.850058888012724,-7.015973000615647,0.15076114113129302,7.391486552242171,3.2229966079128696,3.3575547743035794,-0.6120690828664928,9.423438773378379,2.243124361569074,6.279960488925601,8.37008386797656,6.290889508948387,0.8719366703219743,8.135680851403336,8.771845896225598,6.956729292911712,4.72186008070995,3.1765226702984237,10.62900381610684,9.099503405559565,8.22126323775069,6.3723702579736745,5.986381556116136,-1.365190730229461,0.14304041569562198,2.30531816113691,-1.5042867808426603,6.331954242117021,6.350065285277473,2.260663271897674,5.482499699634793,9.35033129419994,3.4243250422295652,11.041964459455155,-0.9317212298044739,6.365279997077761,0.05051221316929756,6.1411589284454235,5.7579910450108365,7.8714473654848245,4.844116950590644,8.127315106607917,13.850219457441028,1.3988337553329964,3.4392542524711636,6.729830151075307,2.710175607394954,9.731224822694962,4.603687035036651,13.065334054306621,1.1485807814410576,16.536316401869936,3.575714624076078,-16.492729007966968,7.388929912614905,10.571931006972957,1.1718862949087132,4.277802807624134,6.116075893522593,6.101288590951496,-2.8610474122544702,1.2606250701198458,8.082857785994381,11.418269315804615,1.1307065875083393,3.826515364011575,9.189042166977146,6.845841049021628,19.95239751468023,4.679763383222383,3.614729281731078,1.3122374026948358,6.0140656809663815,0.754343390769123,11.197550047069251,-2.114128235799898,9.357335578954586,6.977452524754625,-2.700584314826614,7.96195804963572,7.7365153976038235,6.329904910025416,4.133813235150212,9.437771441021711,9.914010976027184,15.439322276332252,2.259741424313351,7.937876101720237,-2.3088688244983198,0.8016656986563226,22.8780467851526,-1.8717935118941607,0.11849098354622889,9.13693815927086,8.179826754325653,4.112171984944677,1.022460453839997,5.490764965101499,6.512061480042799,9.712653193640918,5.600454557940223,6.7923637303537,5.5291003181500145,-2.9338530933304985,11.32321664816234,0.6332684327588791,-2.732026914281687,6.18862807006729,2.881306260887933,8.313348480544077,6.311753295593137,1.107620559180075,15.531488919078157,1.208592896589479,3.4891149353347313,9.498839053688254,-0.9668441501304179,7.454353410502906,5.9972495586107035,6.019296477990692,12.550394184470392,8.673253146206001,-15.020283919728318,7.659038149259472,-0.730833885081505,6.101937955005044,1.8157978574684714,4.268705460460632,4.278390180449296,8.234252846062702,-0.03771988068590065,1.3924902279868012,1.0439588502197474,9.04223588197637,16.50599195006299,2.4788748675751564,6.806704734120922,11.97242004866405,6.468857066086301,3.9903312004894076,8.082808360689363,7.805638821501118,9.351391951212825,6.348842082707957,7.136656109755333,7.064523911964777,6.561106800076098,-18.763405290886084,5.1739084916280715,8.863832455710671,5.3829232718883455,11.019436240059525,5.958909431468628,3.8230941935385996,1.6971256613895525,0.646658232394202,2.717617281707835,6.267320287972343,5.375184071959111,11.12478748256052,0.31033511952501147,5.026461529020982,2.1046537676916506,2.078294793238283,2.3019674834848685,3.5583773587192002,19.296340667274734,4.806232466196178,0.8178794956123319,8.375264264883699,9.794142698730553,8.818217352205266,2.518111576195992,-15.15486666241312,6.925019488280464,1.050829060161348,6.596475345516078,5.841886716527009,5.084293567158776,5.503859827670463,9.243654264264652,-1.7019975003689574,6.714292035952742,13.21910577258664,4.972437902639039,-0.05650615605218334,6.299204437477568,1.4417979869846478,-6.942926164000104,5.002369034460662,10.318221295076306,12.20157437958259,7.689538098946328,5.14669923582568,3.9839523470597342,6.84935362096518,8.737944969927243,6.0528185059248205,4.346882135529944,13.942981066775083,1.478761395360284,3.6651357990062725,15.769411645108665,10.836764469974112,5.278230532879444,11.073075707309947,11.334041199517554,8.917091215131489,2.6920322265953063,5.658612508264934,-0.026045510886426648,11.366767995864754,8.259497328772882,3.25838212261855,1.3155276173973431,10.45152275556683,1.9324458510047697,5.2453300506243705,2.109996252414285,10.403383629624742,11.31194494415501,1.7698752629477292,1.0661086992679847,4.903501936562021,6.9089261673641875,4.557014162359177,6.178536803913232,0.9545844611314704,7.9220037439788795,5.768224549356362,4.921034784154749,2.8373002365947855,5.203438867603823,11.326532246048538,14.071055603540204,12.61559578658829,5.768387896755448,5.869446610665171,6.790272748662254,-1.0996147521871982,11.543742182313334,8.583825007740213,7.689399938222301,7.841364617243047,-0.021951936000012107,7.449909178771552,4.567790556565484,9.428906482623082,4.773898490758676,9.57633728404106,5.352119619271297,8.71371968856739,7.539533762173689,1.2575513800661327,9.348040289897504,-1.9617180135276349,9.303697660159784,3.5473709015906287,7.236709583757488,1.9058199554777868,5.594059076001583,1.307338644041613,6.7169325117605965,8.136379332656606,5.187683346842791,9.08993826207588,6.858598122927905,8.243106433820307,9.221555190144871,1.8335780928726504,5.8792460621637,5.883801836026345,4.345653360343617,-0.28788454677067454,3.2506900474146763,3.088554808117859,6.236940225295504,4.919108683654571,8.465720214770371,3.473161215322937,3.8004405992208,12.133954785786406,-0.689651626945881,14.144286270296515,3.7184466536449556,7.522405613658827,2.8550398659973766,7.447295350484526,-0.8142380951530068,9.05974933203774,3.8041277440457595,2.009697159933429,3.7077445959677036,-0.5680644044820995,2.8081914762275964,6.032384851412049,3.4623158540942383,10.14183783690888,-0.24984259747227355,8.44539003312836,4.735342705861521,5.3742693068801035,11.097315458648076,4.596006967707638,3.9284876197030894,8.420811509941794,4.7500775575750085,4.190397259285118,5.30614310465326,9.454187760514172,4.040578587077327,19.41069490111718,7.4101924736908815,5.571921134754578,4.2997401735700524,7.442538350149364,1.9476158970099013,6.93806284448282,2.7659246315294053,1.7208683360920949,9.27643597477035,1.58014426788914,3.237169531886005,6.9431678029450135,4.1485970328127575,11.689291707992085,11.306443133857641,9.377937743625587,8.766891433098259,-1.730658943738769,7.379486241770813,1.1234302477994127,5.02069063116342,6.660189265018845,0.23293941379242056,2.0089054080032938,7.520447175918713,8.114120475363535,7.388575255570359,6.490494432396981,1.780767900628395,8.04857625156128,1.7619776510151572,5.7336105304232525,2.157164050891623,3.613412365264875,-3.492350100581208,5.213275752818725,-1.837555084386242,-3.205102393130922,0.0848281838454038,1.355868708021092,7.422119229330329,4.275209810938957,5.75943698022863,5.244322984190559,9.509995079609086,7.762935915379501,7.544572786627942,3.409621743842274,0.9961694704810561,5.348615090604076,8.996931704045155,0.573794898690581,6.666922014611779,7.274517350541191,0.0032660883781083783,-6.5269363164833125,0.2450925298307373,3.9264153686335783,-2.5193528963480043,6.629896952536338,0.0405975951020513,-3.3220774195232505,7.708115489556627,7.791856580272478,9.700981818773467,5.722891906970586,-0.8474057816395355,4.6090076127506245,6.692678447421539,4.573486277777054,7.535420709126186,21.32002574565285,-0.8907892160248259,9.477700721945014,8.456174752031389,1.950687444065581,15.280156403050977,-5.627973067870249,7.500114473723566,6.086165986191174,10.072443415301578,8.520779102575194,4.165547735853374,6.876740624085163,12.49101468161817,7.251994202510017,6.030390134499792,6.3556231697981715,5.519722732490969,-0.4669683985846578,0.8055152471912268,4.914058181849647,-5.593328074162876,8.350741855703813,7.348202062280453,5.466873245083728,9.903605043633005,5.276071740182921,1.773930735073972,5.373459649013667,10.048852575824023,9.697000451022207,14.80890436513247,5.823139547523318,3.836677392195596,5.566396161029539,5.5635300645362085,18.360294383450167,7.706734884748997,7.090282235319484,10.366136861819893,11.58417998205043,5.876761870873061,12.298712299438465,6.678200776350524,3.673650816002958,2.7589616352859325,2.1115173330188326,8.748889316170457,-0.4240579406548308,7.853150053997614,7.229822196312823,-6.160651821069202,11.355849852057604,7.389002947265389,0.8724840276184906,9.20954220372265,11.862656257218962,7.5165718986748224,1.1797985127914659,6.14901834521226,2.0088304307317144],"b":[4.529001190071355,2.631246301641302,3.4876326068535537,0.5975680217807156,4.496560763578397,0.19416064488384066,2.980618333861107,1.4596381164730687,0.35678423180265484,2.142673987725938,2.319394771741025,3.015863144105224,0.2455714872112813,1.6611360885861826,3.571332180185199,3.24547105409277,3.746744329721082,3.978749627982876,2.3348525983138977,1.4942411872019978,0.8221488835327562,3.800267972004182,2.3989345144401133,1.5427866583685224,2.8130681202316365,0.11205878694351856,0.6856018042592371,3.418744760572668,4.6964938785745876,4.090856705477023,0.35446403687622086,0.17348698154267983,3.9980171938175357,4.637902271863173,4.842762657833045,2.275706431976344,1.1647945841085172,0.973214074820874,0.19002275523135714,1.4860190883943247,0.05652209531396113,4.462051660270648,1.1118430406884339,2.068735243883731,2.9330756849553996,3.9637161030305745,1.0847239016873078,0.9020352611477134,1.3278718591063599,1.3663836228044601,3.6179122309662115,1.399110000131597,3.395010011145173,0.14869237117957734,0.5832510615803554,2.0277614863917757,1.102093746602384,4.109963272102778,2.319809208874284,2.9502356096599613,4.179293006672811,3.693228867368452,3.305952239950364,4.927767925912486,2.201263418881567,0.9924053157218393,2.6836623181025243,0.270114824699792,1.6660510940233464,4.9176095340107775,0.35892562094067215,1.5684866458936497,2.8688657073905945,0.1934457617208707,4.451059448165836,0.9523320331191565,0.4716454993965036,0.9569267122019076,4.0987895164170185,2.914429757162921,3.7709662176448786,2.3096109565048515,4.255226839333672,2.950924720852768,1.0248527833042753,3.243308839411283,4.107687739638941,0.9261472115792013,4.125990420552158,4.569919655588164,4.572138232069247,2.0529931540945023,3.810833860552565,2.3348597609446733,3.8643109501380577,2.0372432337729474,3.7108970206823013,4.206895338574524,1.850517983942187,4.459732998972927,2.212696080185832,1.9139171976646485,1.8428486983210557,3.5402456082608404,2.6149114257520614,2.74180020004426,0.6403566233500857,1.7047760148045266,4.242704078716382,4.230577586865244,0.4744892022216629,2.2544611961232865,1.2696438442270996,1.9898204946185338,4.743007553121802,2.827709094537565,0.6933981914250809,4.467224434540835,2.7588539860539263,3.0398660357730902,0.030892187387506764,3.7222621425241864,3.180963404729966,3.5408873733864876,3.40299221846609,1.5361107054149359,4.8980464863592,2.1138518185337816,1.7450760561672962,4.51328461077062,0.27510844713086735,1.305810168217999,4.48751743348549,2.233852680185555,4.560416448976165,3.9306786429640814,0.22347681336443936,3.201182509909147,1.2751744863490644,0.760704582246643,3.386944141017371,0.9634444900980732,1.2922054513779069,0.33252873872646416,4.270789775799276,2.820547232413413,2.7524910561007077,1.1948714992223342,0.545224011423302,0.37820370462729347,3.7514409482097744,2.6943712969070246,1.786676467982684,2.9310993537917005,3.1420628157589103,4.934573977741499,1.269648221533105,3.709048161110269,1.1079286799872268,3.0281659690633633,0.756817085212036,0.6844216059355968,4.142859929166338,4.397662956151928,4.526749146867427,3.613094461578108,2.1491410573156666,3.11601744133438,0.7400875752662195,1.6673385409043562,1.1099112149646562,4.762153002856808,0.39999914153996174,4.803621064991177,0.6023265680651546,0.9044395491159618,2.730002793788351,1.8384257762944323,4.987173807206103,4.761558880720188,0.25817753834209145,3.1858715781428715,0.3068620326313565,1.784816773316944,0.3353542837329604,4.9951584249803815,3.3913200598837054,0.76554112031195,0.592357501989309,1.7214264072626517,4.2188554455850795,3.438230595613457,0.6859271162043845,4.9442452135135815,3.256850030473678,2.9263897841068753,2.8008285947975056,1.0735876602229277,3.5990986152143867,0.24162363726892178,1.1527874225763868,4.889986117807549,2.885839548190141,4.699174737057018,1.4856472409939903,4.956802978125792,4.862731241683949,4.7454628297149934,4.164534140922976,4.4740989079770515,2.906425575212479,0.21808996250374246,3.2824835995312043,1.1075389294077809,2.9840473947146116,3.3021035211432603,2.353044209580515,3.168286650107559,2.530219943746216,1.598735932512112,2.3379068540754187,3.8621107015296263,2.9645023421073424,0.20059541166625006,3.6974309597543287,0.5070362991276467,1.2908284118709812,0.07970402672179078,2.2547164111790616,1.2660483339341477,0.39534613241564154,2.3852245257646274,3.19329857322848,4.011293276461101,0.7957599356404887,3.5377712925348783,2.4360222776606277,1.7777987300856168,1.0055269802614042,1.8051028863322782,1.2369531212988683,1.9655437651942265,1.5163015935988833,4.00119298981787,2.4651683418457226,0.2078510790076571,2.43310836640675,0.7940613277849351,3.351826707737019,3.240774778761437,4.469477719571245,1.4287040167478104,0.7059796668097196,1.9870136463787558,2.6911535418957544,1.776655980490256,4.906594021299191,3.636569760039415,0.8795797640381331,3.679973693626172,0.7978776833815215,4.384229184495467,2.9448798142020207,0.6992713328498745,3.441150297792903,4.632134899690819,0.9075188209415042,2.090642671410089,3.713288522875746,4.537301909310943,1.2161106601970129,2.4752896573262015,2.4337376260708377,0.33518008285572165,1.6370292544421794,3.5018822260619507,4.8716139240295195,3.210025213282799,0.47971658980621945,2.4420283859892034,3.96677085203484,4.511162552893669,2.2423428703940096,1.8819313674536287,4.326479578718497,4.707700945493317,0.40029187885797457,0.5233172597766811,3.5439099788249786,1.1786804814695395,2.4261232195639915,2.9248519380288074,4.598532136751165,2.601632219264599,0.8607645832960398,1.8612574017369665,0.5438607475631518,4.109082113939293,1.9333946674208646,4.776658670555641,2.8237646557960905,3.000302144677459,4.317027052227508,2.078413701505928,4.1823339702016895,0.3818377735186407,1.9722145593211127,1.5298533079752241,1.0543591120738638,4.090660494224502,0.24728369857871746,0.9172626923494864,0.5652899269690614,3.7195231367782524,1.455282045895816,1.83194752548124,2.6826096191975934,2.0397910322613977,1.8021173987191652,3.243911514732324,3.284210694372418,3.1352440146468883,2.423292022036949,1.046925586657853,1.3951528537422941,4.938597560622167,2.3514838255247494,2.4696692932507593,1.426017572008671,3.192510610838805,2.110262808089841,3.899751728915144,3.9471683051684714,1.6480429914118688,1.9167129883838974,2.0340772074300464,1.5884977858655158,1.760591527193336,3.5886282824638203,3.2796223290655515,0.8022433765063419,3.849530700744009,2.5063173354268233,4.515397328734654,3.3081420620162327,4.576816002601901,0.5252193439897712,3.223746997543415,3.024931571113907,4.197170820037299,0.16562597124386347,1.7123171932927894,3.9747971920467453,2.1139236014096596,4.868872716172509,4.7487527001333065,3.616397140372787,0.22615867790505617,4.8404400376500405,1.4221662817078062,4.037673839440475,0.9260560565364429,2.4689805873545034,4.868600111258097,3.6612178118886263,1.7852294870364027,0.8158882338810269,4.119548821109832,1.0818009258090322,1.8575510475104218,0.7018657747026225,3.1112590236407978,4.537858693232819,4.909193025466414,2.840271343843849,1.3068428583123382,3.4022790441621087,1.5564343215471965,0.9866420186531644,3.016267648599179,3.8801553981300074,0.5615971995838154,3.914623873680009,4.308665163628008,0.13067152028476414,4.855648460519406,1.0888564422563396,4.710627864626372,3.5330360508197742,1.3075348534284215,1.7116030922367276,0.2940911245956068,0.7084280180592983,1.187239138316838,4.636082729614506,2.8831591120990527,1.60961522379524,0.8746333103716808,2.260744775365995,1.173010641873582,2.971192054752799,3.4125772989627388,1.1649845585152097,1.2270104402580584,4.185526333675515,4.881305570306815,1.7501621323018934,2.278076834597842,3.9205069990141794,0.40629981820175853,2.159537628492493,2.5321163506897895,3.3413960149286925,4.298807053507126,2.134022226902573,0.4512843452362014,1.1682368687716138,0.24409203454015205,3.5831458535953944,4.4892139588664755,2.5463034591943257,3.0407138460018803,4.832536370819832,0.4039598215805995,3.542836168250061,1.6895126844187203,2.9520801503569007,0.6570883960782337,1.363853980429669,0.7762610770705003,0.5256677702574342,3.7030945982469765,4.622443772758267,4.782356284321805,2.1487566231512023,2.014187828318402,2.846913990909229,2.2612264382650094,3.2678119177049214,1.5044949762082382,2.7851729467527875,4.976426073697726,3.696487264011954,1.4102076721858148,0.5411254128418286,4.353755056431627,4.2582883224256936,0.3937821425135979,3.5643130201819706,1.3363367164556283,2.5150391386840107,4.425412808247801,1.131201467563978,1.6128401075928345,4.172641309981632,4.356994178375636,0.8382586551959614,4.277674701015321,4.273156312509322,3.8542825075298746,0.38163286085584724,0.2303121914810602,4.522431194355886,0.0028844932032723314,1.480461709840788,4.248544687878368,4.0224762083023595,2.874512017461627,2.323564419736579,3.4192523485608994,3.2648078602950115,2.740920106207485,2.11277710665751,3.657180082143147,2.2953285148101275,2.5771762732560752,0.06773291437472073,0.06941478413702074,2.0198809703617604,2.4913467751536365,0.31870273001492033,0.6719851193123616,1.7115224408800456,4.362282760986335,2.426569767036708,1.083374333623458,2.4427291762567984,3.6011738116625924,2.436552500152275,3.3327419483809595,3.3668742249790053,4.218875423124518,2.2333765016411276,3.5747241907102802,3.523919683768326,1.2153883163122325,0.1988693668362007,2.4647648906390107,0.19091662631720685,4.838328078829459,1.3831898665910747,1.7372667543512998,3.584011232124553,2.8541980933062328,2.354544462574925,0.7927329297552965,4.664983552210227,3.3263467182132525,0.832005966569257,4.004369142558069,0.9444100024938051,2.286991418837591,2.0621300265694886,3.3056190577526445,3.124954081167596,3.4109633303019935,0.47504183113571297,4.445446877891277,4.06682210190205,2.739708140675102,1.5077540021271796,2.62019137146586,1.47743800528502,2.0316109394602924,0.029825595076626854,4.662206309612065,4.314852260162575,2.072133033173519,1.8610918350316519,0.9404809247566293,4.61172908345856,0.7794742167801882,1.4283355860950953,0.9000323387387044,0.26830697822055827,3.502905499295398,1.3550554500320677,3.3258528795664413,1.6593301969645657,4.11026261336752,0.5421043463998021,1.1389006504714683,4.633218596790815,1.7246245574978702,0.5491476584046262,3.3081499043102003,3.877190838954135,2.834335496406828,3.9225581332989847,4.803471082575747,1.3510675272938244,0.33543437992796465,1.7427264123756525,3.478236300080324,2.9638988256036267,4.991771758300294,2.668031389892347,4.1821925434680365,2.99047185307621,2.5948250160544104,3.8162179486064227,2.953095290561498,4.8839229028527145,0.8025901143850944,1.03636256584145,1.0218410761233532,2.255454748003889,0.42354693637485896,1.3415338753776151,4.470283510878793,0.13532121667442554,2.6232331095696813,0.8267060218179856,4.7352338372817115,1.6557493491012532,3.187736403660929,4.496325281630368,4.66850361005201,0.7159619183021992,2.5555208397211726,2.002012658866544,1.974099267791497,2.60268347022797,4.829888493361722,0.4837462132308601,1.3181250165634528,3.677501377522585,1.1826423121859209,0.22181500937000442,1.6304945351960753,4.723107243953799,0.5173575087621085,2.5861398562227245,0.58980516093176,3.127056926256854,1.383328873698757,2.123880575922451,0.6742328998012503,2.208403356943154,1.8317622924621113,3.503606644284827,2.85429015606959,1.0241768781241334,1.8024845001001522,0.8521878414965678,3.630663796988123,3.2883599392769858,4.847826724594345,3.6579127664353397,3.6068682086025405,1.4001764223069557,4.109803462400489,2.978702930260033,2.688672927914919,4.259674187070983,2.013413378010047,3.3838145036542633,0.7924115994666958,3.333094162903433,4.242538676394078,2.469752708333833,0.03378500615661362,4.471362408712674,4.398868220481998,4.586329147986881,3.215525584869474,2.9026779034629167,0.38380382215305264,0.6054980235258423,2.4645759703309533,0.5900121789314516,4.665001931626184,4.506846498405238,2.310045534833951,2.613830854257282,4.344836016755548,1.5004972150801443,0.16321491010826916,0.7891658258273981,3.803417623573624,4.493753944210955,2.944490449628605,2.587741716313282,2.154946814462594,3.5715699882332483,1.2568067750476364,3.4776556189266126,1.4936911634840588,3.013063309715033,3.187086170612795,4.342511056255861,2.7668649173059015,0.28010707316496464,1.5514573862991954,0.7918242615168314,1.277311422959878,0.14524190755883293,1.8277892220189595,0.9191744207976926,3.8309349162939177,3.4966573214961305,2.400585497139831,4.69317547490519,2.289095134702687,1.640524795754994,2.625588977155213,0.9580267704787682,1.1218154773590794,4.6068660293847055,4.440126155515534,2.450545693988807,4.04471531864681,2.9297601910287154,0.12188070669441498,0.09024809521002042,2.110824220216231,2.673938501167923,0.32780147628249323,3.647092054441481,3.7205151490554957,4.082270074358222,1.7442361612043078,1.6507923012891546,2.2369506519896163,4.716369358893119,1.7663524008083709,3.6274721296765575,4.216490929725168,2.6536353192911477,3.0409700237643467,1.357150386765672,0.5981984467111656,2.0161731039759747,3.735487948598466,1.2520817220104352,0.7624120720793115,0.8039803936471268,3.3345774848601293,0.977263004954968,0.7495268336257133,1.5817376921832393,3.4514498335664348,2.387705430889434,4.97758908813207,2.153235522805054,3.4961801200438547,2.171591586477394,3.966665926739762,4.41177086294743,1.630376841981318,2.1048870945438,1.3955506788805727,0.40038143917478397,0.5534568657994932,1.1937990264783205,3.2013312531410754,2.828240059685948,0.2728066648204386,0.13071998663605422,4.552045720231507,4.855638509428609,1.5279608713531279,4.622499664906618,3.3802918340192223,3.3380996533755947,1.281429181740602,1.5074933322193107,0.8468208927257304,0.8129623815778997,2.16162327116983,1.5942545193720348,1.6912076195295211,0.8573695911515111,4.6044392617633285,0.44370477974900346,2.89084157216449,3.301811710277256,3.8078478358076873,2.057962984657662,4.636118891702262,4.349533012138799,3.0445090574606315,3.145657954034488,0.5739863458506311,3.800621077463391,4.622391589548226,1.6253420711983113,2.3065933617663923,2.5150245866784573,0.22250708647719608,1.4367260161489948,0.34852225863515884,2.9916000474078706,2.463874288960323,0.02569217887112396,1.6105992779880274,2.947039179564348,0.2805306516206929,2.6819175810928666,2.3976259792658006,0.6994700509848828,2.6186629299376083,1.916146586834242,3.512175939927479,0.24946225470354744,2.944723443461783,0.5293341936926699,1.6527939920939683,1.7498480957808404,1.8710196943097857,1.905785359405251,0.8477921391524768,1.7624283396373108,1.099444688795298,4.702043509082838,2.720442767360028,1.4223353053937726,3.8832826681343615,1.6075379233985088,2.471768639462325,4.794206614382526,4.57333956396898,0.42790670612788295,2.555155292459811,0.35703201089124614,2.655113289946156,2.101535777585225,4.062428277060157,2.9298479845164946,4.699235952306781,1.7156977434679743,3.5464738135255223,2.5792529272933598,4.766255254529041,3.459574197165338,4.289278694719725,3.039638217325107,0.024219817373720698,1.106207680265504,4.066539983611319,4.941093002295015,2.60580071691587,0.27173107615392933,0.5088811084130096,2.257852801959579,4.483561550586287,1.2570649750309937,2.708815145426491,0.9357686353144867,4.306896344906736,2.935457010695004,1.611251967991203,3.2097097653720064,4.245147381228059,2.7042243242564146,3.8809103272000556,1.1688668751959241,0.6718705137781866,0.9565331060778537,2.1155810484009474,4.489873916812702,4.801212027480387,2.906011058438698,3.9112375247090228,3.570698115572161,0.25023562091093465,0.04321384819243268,3.223212490007584,0.8421477957883217,3.2811818079890043,1.4836248539772645,0.8131503562397613,2.681585437924001,2.4610818660658906,2.5461023260630835,4.01319150526764,4.564640224424849,0.7669491637910664,4.306674576117004,2.314885423041285,0.27178049394955717,0.49794021731448646,4.297517533043873,1.1731518141358488,1.6258465191102867,0.4153860363699968,1.769957696369323,0.12659512689764618,3.4733771321514673,2.5187882819859286,0.508475041181562,0.5557144196519026,4.506730235713915,2.3522123601552556,3.431369351305653,3.1822881475041687,2.3634366809380047,0.33769747730145183,1.195417352034881,4.066659958071028,4.580843442631545,1.2072293718564586,1.332036465596641,0.06216911319468221,4.23295946597439,0.6165613991241736,4.52033367733854,4.926782814174616,1.531945806467071,2.9947429164899586,0.8309477408640886,3.1549519055042943,1.3805134625909443,2.313322652287707,1.3054157863779892,1.866045984821112,0.979045514294512,0.5879575973737494,2.859347275316252,1.430560493149885,4.932077911614953,3.9950950517955364,2.132509701029861,0.01306770570210225,4.843693515194865,3.829963710702624,0.1498345317831462,1.5677034508510457,2.4098703988973904,4.66771333392595,0.77276752630697,1.691619482462453,2.7568005163877416,3.054358275342305,1.7949097652797164,0.8678454898579568,2.6061488556575094,1.4228349927630235,3.931939661504803,1.563518214515841,2.8506719046828257,0.9033183119026789,4.193293600893032,1.0107412744793576,4.447029944944246,3.9041653232689857,0.40679243993711256,1.4293965798692398,3.283289852110763,0.07239991595194617,0.6379567941593833,1.3881962848557317,2.8015182966659777,3.067083683624939,3.1952646432340535,2.9142727317376957,0.23033286817317755,0.9489336874660304,3.7439204679591453,0.07356101141754445,2.76516126847532,2.392706575414908,3.3687297886869794,1.6099138755730424,0.1947083516228576,4.755542985008683,4.82702409738753,0.6633505796930605,1.3894337184713534,4.669097728152757,1.855118360705057,1.567599011996469,3.0425273194594995,4.092316092520596,4.192170417599639,4.727578677164298,3.846291800606245,1.0946373048392566,2.763365513745004,4.565192413959017,3.434751941536774,1.444465157641125,1.0017707609560067,4.406155410196547,3.9303090628707205,3.9734486361382304,1.175058505273181,1.6580008289965953,1.2659009024209444,1.1552548964309606,3.2904471526106827,3.134533170816516,4.462881281102142,1.39560761644835,1.3386240624567503,3.017431801392849,2.4189212604824393,0.913471126565164,1.2761919919553133,4.7672257936467135,3.983127447428144,1.7455944009680868,2.7945514395781244,0.023236623158130465,1.628254855073381,0.12837380263962084,2.9756936025887826,4.422252307751965,4.949431973417706,3.092700424224899,4.096041334485996,0.9644270334889748,1.7859150322797945,0.43381558232139517,2.6687655858102954,4.103135579458921,0.9554722308437213,2.337471637236004,2.4900683281816924,2.679914882907366,2.933427658706038,3.789495961260254,4.937130161793574,1.489703889840659,4.0057739333078715,2.1290221478539095,1.5213467149063409,1.5935481396196327,1.0036128541919676,0.6398664757000028,2.6803546369013787,1.9061454212753226,0.5222151427277899,0.9436725375654986,2.3176529433618187,1.0791148951756213,3.7831605629837926,0.4650160479901555,0.5824314448828316,4.732529194248861],"p":[0.8549951223067402,0.32714610201218597,0.16777972756441928,0.5933700567837088,0.4954485283219421,0.7167435699747793,0.33480223509868945,0.009371745042472401,0.5688114187430329,0.30575638333222543,0.6268030259960795,0.23634092500232495,0.6337122583215309,0.852533351005146,0.6300746830695654,0.12342500966583692,0.47450059176397885,0.338174326898496,0.41357286639021695,0.9989968214611264,0.9762206909751676,0.6983302507492726,0.37312751770768626,0.963147014422941,0.6111028034767501,0.8648754332760225,0.13245030220765686,0.2247833431703421,0.49293622209447774,0.5614960539178997,0.24907567816805054,0.4370100964554997,0.8725657653069325,0.5078947032496934,0.28996364742590663,0.2637284207553041,0.10219948560671899,0.09616264758752036,0.9202004489581719,0.4902294875795843,0.9943779591651807,0.1046179750327807,0.5941428582305859,0.6735671367150367,0.1564626568163332,0.7104520178352252,0.3397678924319423,0.22532308736511486,0.3370359603733777,0.5626971747642069,0.365942309859808,0.041657342557137156,0.052134255837493315,0.8459650937762413,0.7441973382690412,0.3891617109579186,0.9430748860049196,0.5664019834371685,0.5362915756605682,0.5926964816508664,0.8440324984661927,0.24950896249541255,0.2982524068515191,0.2690554274616592,0.6241247457336134,0.6846252400537853,0.09484967732844196,0.42837061158145096,0.3379419575159712,0.37807242337585345,0.13840698589323686,0.732173464389662,0.4740804998909125,0.9740559384123191,0.44756192713381604,0.030543422803448017,0.8656989184265187,0.13461719726721455,0.5909697852581353,0.5605145633485,0.8453467462339326,0.9907851390252904,0.456965722380162,0.4979827723512813,0.28579028330344936,0.5703374061494875,0.26108712621547636,0.6473975571108952,0.18036098518937616,0.16285163593911434,0.21494986287238227,0.3073170903138567,0.7518856275346724,0.033294984229242264,0.949538381251364,0.883485246860084,0.7991729223583612,0.4178394500503879,0.2877966973344852,0.5998654103419545,0.7516378895958118,0.18159226470989887,0.45053164070609,0.582987133898488,0.03097609032766213,0.7313191054464763,0.027769040722084082,0.7625275615346891,0.5435230702427598,0.9336135787564621,0.034664883163286975,0.7361382956306717,0.9308903851878483,0.3263345565628053,0.5012700682681437,0.03174852433849695,0.41761505006760946,0.41217632076629473,0.7203409825115072,0.3542479677299821,0.16012166263951966,0.49283486076494576,0.32275824060246316,0.1266315856728395,0.6814517721151352,0.288396886716924,0.618461851564323,0.9924174169081963,0.9879967600801003,0.6888908100656284,0.2898988783665588,0.17207076769715068,0.637173994366391,0.6354699326748696,0.40760423920314115,0.8372362415504357,0.8977921122955295,0.8142279928886791,0.025184498054362958,0.3317421974352377,0.1592409054774524,0.5666349523170009,0.13636999794845428,0.8303396681341353,0.6675463369088734,0.09325501084342425,0.45096550301170124,0.6919925843383992,0.9760310224510305,0.6888655860309123,0.05684141303799417,0.6444756450427738,0.14596564487475927,0.47468546244329146,0.9324360761752748,0.29867181384351293,0.2232855053379661,0.45036463814856,0.9724056806561487,0.2819881264592512,0.505826479487943,0.07005479354237054,0.6211222836801014,0.8649968967064767,0.39997276926922654,0.06657767141427295,0.061597527678423525,0.471019501687284,0.13056582423613228,0.4855881059439311,0.8422810696700564,0.09460321725176346,0.7195114636602036,0.3951538227356357,0.32519802976802925,0.5960022744166498,0.5960605078821548,0.43282479166013443,0.7805314876327389,0.5510061261296586,0.540508560714617,0.7063651023753903,0.2951322131452345,0.02804067661202847,0.5555558137477361,0.6323816934426085,0.0644079464916183,0.5181655306568231,0.4939532441477914,0.33342565351531306,0.397077484950642,0.5530329625817076,0.33928815715998195,0.1856271689906237,0.4043048680493446,0.5497235417153854,0.8824112777187099,0.3520039594203739,0.5406160523734651,0.3553771112930171,0.886662789349201,0.37152822759647064,0.7969050198095451,0.04050762455875634,0.8669362006974146,0.11849855521447705,0.5341389920647697,0.9297524270614801,0.3876422075902204,0.2357177851034673,0.6348227085515066,0.6859183621056453,0.12101015672448345,0.8515953492880197,0.4419145371265185,0.25978578224249516,0.4850159950688251,0.6743054905387023,0.0021513990526498272,0.9076958719339518,0.12262515978232824,0.3773415476290991,0.7703893942594038,0.409045850052679,0.3602992833394085,0.048299906104987134,0.21286689158968475,0.6854885081484068,0.6719832470948848,0.1975155248258056,0.7115007849943356,0.03481485548248964,0.9747470969227803,0.547505551934304,0.9016408172978183,0.023384580288815515,0.6898102752647055,0.50532148313177,0.47697271442189026,0.8535393986224675,0.9660974375589044,0.4141187033652265,0.9683778125163793,0.7419436158177017,0.1564883237539425,0.8402018186632343,0.2928244133684146,0.34427032760101195,0.9516547112103186,0.4847427076633315,0.32314147046231567,0.5058437559724434,0.0629783326869724,0.7234281553877027,0.7904789790836733,0.7621969551991568,0.16697705877771374,0.440050528007941,0.3336025601466712,0.4273027180474944,0.336877982507892,0.5644794892416984,0.9180901641075698,0.7421239797621602,0.08532732902211548,0.13523362022894436,0.803522486273563,0.8488461997835763,0.2123604486823525,0.27535233904490375,0.5531114608831533,0.4348984313646569,0.7013600640286421,0.17164075090766473,0.8502051228290959,0.6910441609875886,0.8577807289350723,0.9614012181970877,0.46490639328990246,0.6478773284446582,0.5179663054397032,0.04129065152895084,0.07587188533003775,0.28515869641141967,0.5854886391652279,0.6104377534819854,0.9419432296484702,0.09232153263754572,0.19190484322140833,0.17532373753145913,0.5835118353013007,0.5705561261487739,0.7946472237739333,0.3961396118291989,0.6401687420576252,0.04055936374878333,0.49301282353480014,0.10321166088217515,0.8006002040094093,0.8065165722675951,0.1943081264908031,0.4861655273712402,0.0897536276479165,0.9927946595241799,0.8118662292186516,0.23602476614525214,0.7265448498257965,0.3889053990421014,0.12260729887310995,0.6591690410745696,0.47178594164934085,0.7437591407737691,0.7099005990065033,0.652916508196796,0.9228998795752337,0.8316611064168549,0.5965058243501724,0.6800285680280673,0.6165403265308051,0.5749870177136742,0.7682700666131546,0.0675147951665549,0.33344290872107085,0.49680422464256124,0.4986085847888564,0.39123585496578905,0.7338369442326866,0.06707898319731131,0.010543762684306568,0.06127937266479466,0.16230300567196743,0.5957956467387566,0.05090727075769408,0.34153559066410244,0.9252630618068955,0.10106478479628622,0.12096854433389437,0.8560611904752367,0.32008859614039253,0.5450610055365448,0.5230916892342243,0.34923147537257515,0.7853689466155336,0.6924448297518913,0.5504277336722034,0.12202253977148159,0.48188705560602907,0.11224838194085551,0.3918371092039925,0.012456793771483898,0.5445381093572921,0.18967038098913958,0.5121837693891886,0.661403400040967,0.6078120428911122,0.9723587748374001,0.7674830621816211,0.15366046929241572,0.31366979667836414,0.9931482867432992,0.1904877499819848,0.9631305489621393,0.4488235392675515,0.36901354237988326,0.4739990618083494,0.6324674144113542,0.737869675869961,0.9517757929161332,0.7682910862086556,0.17152215775145652,0.13146237905764524,0.7264284495696509,0.13337392492123623,0.6320811934414647,0.7591699548371245,0.21538508896377628,0.21185741668436653,0.49010854031244255,0.6320848788997384,0.053275120301875756,0.5117036212771835,0.9280289234245449,0.7471209147652291,0.049682507160214495,0.6936440002937034,0.5362828763766949,0.09647688479132244,0.37644031858645643,0.9295467057983933,0.10653880414961092,0.8831342641551863,0.4156942648149984,0.5855245438218721,0.689090054775318,0.4565545604589365,0.7067782934237152,0.5182099243219869,0.2579334472760708,0.009872633068610304,0.6341758053537239,0.043693133202993284,0.02144828331190496,0.1611019217721339,0.5213562824616325,0.7099422710268948,0.6351595306651145,0.6855058263045752,0.1447634950105927,0.46695951453667095,0.2265291788952124,0.696855600534527,0.34552101021583237,0.04550737665327298,0.028575228894445193,0.6888303740822366,0.9727674251693701,0.7821038567507963,0.9068488248369557,0.8361042020159133,0.5151843521017252,0.4978995182089976,0.2934825589858492,0.8561087138285961,0.4357635197931098,0.202434797970374,0.706217025890354,0.009609516332279133,0.19592648794246514,0.008160336425945047,0.5999980699162843,0.6314595801630762,0.6705738890066173,0.9597642419543,0.4037282128769655,0.24290915399139945,0.8848727081508552,0.906994358459748,0.9069981798857711,0.6044580443109333,0.11938774049099266,0.8413387124602452,0.7198704781638217,0.7092558988774975,0.1205136706808998,0.598998156968717,0.10083933400149103,0.6214323699106217,0.8489378006869019,0.10808222464383754,0.5833817347515169,0.4988152465269933,0.151170078325507,0.04293715208212889,0.14001839822962658,0.7151667719484434,0.8310829947013998,0.4007371172956582,0.9507020674168378,0.05920382830415716,0.3575698490543264,0.2534770978818661,0.1566897913790677,0.8594351280454269,0.17738253623236333,0.17753549120174106,0.0657922061276639,0.10734878645759682,0.6401088876228969,0.5428775479968542,0.7802602456771099,0.3554873415002153,0.4690126155695509,0.04358108931690663,0.8307378145713888,0.13024943179031379,0.28908310733726816,0.7660428259290037,0.21163488227366845,0.22605802852723378,0.9606019270159196,0.8940513622113284,0.8760773423336548,0.9457225111549588,0.7732144986415153,0.733647562351099,0.4749306064921308,0.12262072929893786,0.952705510519589,0.9170374848310947,0.9965210164052365,0.6711524158854578,0.7041309436190797,0.4206274590034098,0.3162750911223726,0.29925932957988755,0.2771074482106721,0.017772972312017243,0.3802288267233773,0.7897670415579527,0.7675670030237496,0.7305255080605884,0.7737534807637119,0.527957591752725,0.07193439125145384,0.4898082953604066,0.2979536348940486,0.7119719929918771,0.3897492284404356,0.7087268067044366,0.13413448759279234,0.48754642846737317,0.006707186097804296,0.3452539171390112,0.5101312997258864,0.14624346264644217,0.17908215715707088,0.8550873798675211,0.9728487646180999,0.6942974999507292,0.3109712692266733,0.18619196658093728,0.8477346407603421,0.9342063142644821,0.2705489950288906,0.7384239160561625,0.5491060697350814,0.21567524449308784,0.8840809051628942,0.5997981503339416,0.6618510527869466,0.7195909915715901,0.7171102197855244,0.7498786609128221,0.6885682938660096,0.7084622116374435,0.596050477751064,0.4883837057743716,0.13562896764084842,0.8771709039313196,0.7435917836599253,0.6865006281855608,0.3498371684506454,0.24732352632037724,0.9354693178067373,0.14255483409339975,0.6740084218877582,0.029061748540663013,0.7458253526470164,0.2926083178360044,0.06840110636318686,0.03501475947527033,0.6449740638092252,0.0887594566454617,0.03660297517067446,0.45201102424498374,0.2768731148792971,0.8208115051115135,0.08188427580660629,0.19871883644721988,0.5249582232325554,0.16231734939033848,0.7385001886481557,0.336174966186793,0.4469076085518193,0.5041212299983688,0.8683784315104859,0.7148193379688323,0.708996555110915,0.3720817156395255,0.3862679777381346,0.6415811042718154,0.4263963824820409,0.08253083106234316,0.5577286614231669,0.7355088247667732,0.48438467285520903,0.509646994353854,0.6479368671689916,0.02618375842747045,0.06404466389377528,0.11363054957013285,0.7776466001319542,0.17792302612431654,0.37070696215140164,0.44501624325286704,0.9014708067238333,0.6674377792722777,0.6523904020074944,0.2309935201776212,0.756834790491578,0.33808205068048003,0.6228166106612736,0.5035798930498785,0.6807357379677539,0.3634386737145374,0.41804363627518804,0.549197256037516,0.06640587411221044,0.9688800480047748,0.5724251962594074,0.40490554765669073,0.875476519954437,0.7766390757496522,0.8432290728691296,0.7078812125159755,0.8990129328723795,0.06946731285209418,0.982518488913056,0.43353277775396215,0.003893404126837696,0.5551938051013867,0.5991277492453715,0.44740241205182785,0.19110248509382255,0.6365242087972485,0.847026976631051,0.2069256376339912,0.5035128114447898,0.7801574930435553,0.7902361342308466,0.6497823405813801,0.917744795293564,0.7875956884520248,0.7464253672729344,0.969178842281244,0.1314758354186616,0.4577984226559739,0.31808971438771905,0.46167847413489427,0.5884040469323912,0.9825974604753045,0.049959479127423156,0.886020406087173,0.8277634508699525,0.131251160010462,0.4730113523773183,0.28216087105670273,0.7907823181007727,0.062424086110067334,0.686617107849727,0.5192583689934558,0.9318663937931377,0.3528502678340455,0.791163452298911,0.1884452082102468,0.5419990317302359,0.9889066839645813,0.05298617477505574,0.17660157514522634,0.5662381446901239,0.8673012201478831,0.21313483762011276,0.018955711675777698,0.9234702298279334,0.3598870219562742,0.5682296105989191,0.17309827580185733,0.7802423290423204,0.11910975102982868,0.22401985301640148,0.8936883723151483,0.11962276881308398,0.2017241514584418,0.4125986600802476,0.13227541925168929,0.3718476194341698,0.19302030415358806,0.07443897870262917,0.910820054694909,0.6069958284001145,0.7728680018467569,0.4580240213520508,0.19624490055215094,0.027148806862454133,0.7929627311051528,0.6273855078237403,0.8600059271173557,0.5938653714974369,0.006663954119214166,0.35971691767291003,0.3342383275519132,0.10148698246145815,0.7856130570592987,0.6363456930332787,0.7557514287855118,0.383381095652749,0.4542093831881924,0.5002609520371835,0.30160397759526525,0.7562830816529791,0.996568197096654,0.27334379380728535,0.6941608824845229,0.7918996970718661,0.8948552205241422,0.5350002494682253,0.21043823584053345,0.5774215141852599,0.3489058151151416,0.4372516613124404,0.9221195804150162,0.8086022005677675,0.6462352088563696,0.004715936568513879,0.19954246844720025,0.6718126020449433,0.15490090537272105,0.6443696686999889,0.7054283420557703,0.18531459698147446,0.6901394651899935,0.3047147646231405,0.2348758606062431,0.9543844934420915,0.2548533878681374,0.8828854891584001,0.04689872738160861,0.5231167717094103,0.26943136062470074,0.4892834778483466,0.23561455239478568,0.6715025922488058,0.9738649240721682,0.7186951192470479,0.38260653075007545,0.5170684267995362,0.5096840081226599,0.5850149562938012,0.3611469199071471,0.00034811203491846854,0.2742815885443688,0.20407251225681322,0.4014793950529203,0.6081764433692134,0.3641371788309853,0.6111062832516185,0.8022018640575961,0.24589029057163825,0.3369701942014789,0.7660046751036127,0.6791546205614638,0.3354861624660692,0.7343581989271701,0.4187528238254117,0.04407319446721347,0.5729705543645995,0.6699842504831606,0.8863085392008636,0.5288865706839121,0.23347796356115103,0.7554927663659741,0.7752180437709588,0.353377879671001,0.8462439133287072,0.4448022333311026,0.9919962595368061,0.5850773124433872,0.7406352977219774,0.9821014431365784,0.8285765397335307,0.8837786287370435,0.882303531140288,0.9006900297305702,0.8176191020120347,0.8191496945734362,0.24500167730859168,0.21783979310788815,0.8702518179811884,0.21308903163974557,0.7795191709377187,0.49923611422111236,0.7667730868265685,0.6926774832867966,0.8096831650774072,0.5091002368531052,0.6760672395176521,0.9241027705466258,0.0995505788471216,0.06209218105741132,0.7388553200911119,0.6022779691276099,0.21627743555234247,0.7352592311708541,0.2831963326828195,0.4556474211003758,0.7655673407661501,0.16080379230935482,0.5505573425227523,0.6500109965642689,0.6323132950325325,0.9615376941609375,0.8102037107694253,0.515438853561129,0.39392575621307757,0.41847537379220157,0.3050866595873891,0.9167343715026344,0.44469480992539623,0.7936480605980931,0.5765423258454454,0.42759481586958015,0.26578428730179215,0.3513038819994574,0.7289159436414538,0.598195105812102,0.5271701855421698,0.6277962354159499,0.4159721024778358,0.9046849032540063,0.6097831473443098,0.7033771519851457,0.012385706615110292,0.8109548662105999,0.36205312867383976,0.47439856162280614,0.3678765989301449,0.5490555686197689,0.2565756442538967,0.049770411593313746,0.3572603527987366,0.41164226357267153,0.778292780516977,0.3271272324662513,0.855699935393194,0.6556113939249135,0.9702139385104414,0.47690007008604285,0.6799185056258237,0.6975085376695866,0.2560109569788953,0.45251081313424435,0.15383330411805463,0.8093617627894463,0.9146088394084024,0.9360435913826539,0.7622193874839809,0.46483826959174657,0.9794160731557309,0.32978889230307495,0.9452772556974449,0.49021577774240543,0.9233349672347864,0.3293994662817492,0.23825071816639554,0.07525132977411375,0.9462320993501157,0.08326518450488996,0.6020829392132014,0.793793095950527,0.10887968159342098,0.8693723010114713,0.8115310506898952,0.2644769586431355,0.8057417038663413,0.20572659304034024,0.7975991633372106,0.6062447457579727,0.7746619770918914,0.9993067295463995,0.2902039165017978,0.63650686183503,0.4811860861568573,0.23250581825899808,0.06185157450119827,0.3620609640926158,0.73219754790915,0.5406103741941215,0.9567304553535008,0.7867639235486246,0.5972256237760836,0.40489228244813846,0.5517824921994998,0.7256883875013813,0.2589425114494335,0.526352878664375,0.026705560818926388,0.7984339969553729,0.13155065821790735,0.2739193786530374,0.7852735669496023,0.7116252063227939,0.6871318646014513,0.9395855719821928,0.11283423800460257,0.7163434497068986,0.030930184513237924,0.790738159217321,0.39866607266763276,0.2623059057074786,0.3332582201257668,0.0390159707062363,0.3480668917626297,0.22121008868906178,0.6417470227691808,0.5943170335961432,0.3376177245385048,0.035034575464969686,0.2824701153388396,0.09965092588872748,0.8750356187715516,0.22800459862894895,0.5684381074664131,0.1210060466166425,0.03805248382986326,0.24071360867698588,0.09939783593577767,0.18520658955722258,0.08147249162005843,0.269528964111452,0.2289845363302232,0.9240370036751719,0.9122755345620206,0.6856662715869379,0.7580412035971367,0.6662564515157023,0.2562784339822699,0.8393395364256473,0.6405095101504341,0.5721635863073453,0.47592510181150804,0.8007071579364125,0.2927717956582119,0.2189790732065886,0.0012368715666633001,0.20118542783392024,0.4428401284685455,0.2753695707697088,0.019921428427298826,0.3518398806638581,0.1128737777463582,0.7512068997687567,0.17450663112143117,0.8929729202842822,0.32437596001037416,0.213903396946026,0.5703617937037322,0.5256967614510446,0.03978241008584105,0.4322711922682907,0.9605346890748803,0.19750805810891658,0.7852856302799844,0.5495398755635312,0.4026098895877066,0.8849363807830899,0.07521184489709998,0.36877346483171514,0.1939003514017259,0.9983436320176795,0.4638278850750748,0.6905945677819139,0.5505061273575331,0.8929171659913104,0.7116096926314028,0.6101823865258669,0.6445643390001248,0.2685061329667384,0.15452505440500985,0.0855209968072852,0.39194172583036835,0.029842572919660526,0.6921689501737751,0.8403938170246046,0.49545478480579663,0.7271045191806751,0.7460673951174153,0.23122372405211022,0.49024135731206986,0.9244948248116696,0.5112665638025986,0.8663240292069196,0.4118178952619178,0.21896026014463588,0.28183644947683684,0.21046229825519158,0.9452821410317711,0.0588313073187432,0.2924796605666413,0.757420190356447,0.8939171809922748,0.6270337042343377,0.97635927509008,0.6472365803346352,0.023952057613120248,0.7307877698180929,0.46205336322625135,0.7777615218902718,0.02862249537483419,0.41160350158267844,0.8844606321447164,0.010966604759441445,0.8738095322761819,0.5438088910766112,0.38045530472276146,0.3998597026987254,0.9638169725846639,0.7030295012755607,0.491211955681472,0.8707169318476107,0.31829865570826343],"mu":[2.586554523406923,2.706275335695798,0.010656257486247878,6.44179109997455,3.885545156835928,0.6322755272018377,5.414590420958256,8.223055137639353,5.3251648210703095,0.011281191134422386,9.284150173532705,5.839892961751085,0.22018829354208513,0.39719094635761953,6.562456771798926,6.215231663607906,6.894018039805827,8.888670282898964,6.380018594514764,1.455814015441066,1.4057188445227853,0.05860829121082434,6.227382355626688,2.457970213395533,2.8526646290040025,1.575896905442975,7.376132600507899,8.625326689763671,6.1982540166542055,1.9543991341869704,7.541086183277632,4.289138300337978,4.926213197212994,1.3271206235962896,6.473265270838134,4.031521593066422,8.88484460020377,1.4801944038774684,3.201968055594524,7.733460793390561,6.216320427576008,4.086450332224749,1.0916869502999527,7.485571516981184,5.279646743790449,3.457427483556179,6.532316376113103,2.7699164468782667,9.841408277544259,2.1076752887226857,8.548056894641629,3.1889201671435807,4.639346395042525,8.624644852426925,9.257461783599378,8.707775643492289,3.1899471410029467,8.847063927098864,9.356287988592516,0.7198368063425442,9.965271327114426,4.443617717145858,1.0513660490719356,1.8342166708286967,6.667441427242096,2.630725896088968,6.150991471770631,0.6053446290379405,8.265901693347262,6.2508954015146845,1.7932428510837206,8.475899842767936,4.899767879748298,6.57330045182114,8.455271661830023,0.7367952738686889,4.982561560870293,3.113360232296072,6.408024903760987,9.004901496995464,2.3853555019779726,8.199726214016573,9.872869891715194,9.495028202182583,9.349223634832933,5.134109845157049,4.758113407621433,7.326044679568112,5.147513235117758,9.745161178725033,2.330393195662679,2.912477673873586,2.4320978243169633,4.914567612425758,8.22152192636646,4.712198420841911,0.2308952073928383,6.072097905461651,5.506144702162235,4.593100435130973,9.52794368655579,4.7064101203758995,1.35799468216808,2.6183719975697928,3.403160890498671,6.661298410326218,7.81671570280005,3.1808449638508796,9.477653101460097,2.2476024061100786,7.296897678709371,2.278818490025405,8.873062676800934,8.668056919980371,8.900234216430679,3.5557220101334908,9.77545143635833,5.529740406619883,6.063160708118353,1.7023369296475455,0.3862848995960677,2.4311171252604624,3.4334397569303543,2.820946324568261,2.1654556717334184,0.2925499656443864,3.939897731993003,7.038375659363128,5.378338880240888,6.272489008589373,1.266407586614906,8.58098387052573,7.605557130715583,1.9888741031640667,3.642030704792838,2.4018934741623488,3.836267061249168,0.6798856019116295,6.684778423595102,5.982288114076628,4.167252434086748,9.485762937481606,7.816937022864261,4.39304851165657,4.837467449349681,5.615307887517746,4.235637767635357,5.3204797007179945,1.638175296620068,0.8833349793269485,5.09030201098448,3.9195807430676632,3.986309264813901,9.27863909761883,9.535526128789318,5.5953281982700815,9.865862047716082,6.3509600930584265,5.305936897855011,2.16090625027912,2.7988139799788114,0.08444286396112499,3.1450668349419098,9.755639633035383,8.789073312690636,9.306708818305427,0.9900771605567726,6.232373509124813,2.3240693467683204,6.938425636423922,3.130072027826043,5.004374013431942,0.3065624374584397,2.9645184016019366,7.032768303208023,5.4408995085978535,4.399198382041318,5.28387370459761,9.156642456378794,5.157271938306711,9.94812824905694,1.119030048975247,1.2424292024952521,1.091726494471541,3.921295323044318,1.8078802083202539,2.637392859705654,9.92562079321166,2.899883554542233,4.0597250377130045,4.640290983745306,0.33751017296331565,4.907428297852827,2.900723513357535,2.365961762304978,2.7760725501688333,0.2709637629608652,8.681425820439495,7.855730378879939,5.608722867131606,4.703337062181896,8.309267406856469,0.5555666581545804,8.181400355799983,1.1852338914837857,8.112984370327787,8.739821092161659,7.588176586844617,3.6412598617763403,3.2306107504465875,8.911038003258874,1.8288455205614507,9.022593526280358,2.747627153924823,7.146245095901403,6.530396225015796,7.868526220724177,9.661557142601936,7.608542374761447,5.499760178660031,4.566563498082214,3.0168689269880233,4.783846700169255,6.0641926458010005,4.196104305052836,3.9554031478230556,6.338741355075093,0.7239465933125766,0.019718495335292463,0.924884146643068,8.678652438210593,5.216180241957218,5.451956601719587,8.300565267047947,1.7159947739537573,9.35579496987977,1.4207322054087768,0.860647101132177,9.74729176343831,2.0291665701848416,4.666048472373752,5.410224720659538,6.3020231165641505,1.6784278523361773,6.254776023864244,1.313913337333763,0.03923150050594071,2.7134032276443754,7.066428727891458,5.012844122860769,0.21931812063021194,7.8650680536623385,1.9748695225300494,7.562584960344334,9.378249907155853,7.010200958335631,5.007120565468499,9.079008524476656,8.059234170548145,9.877726028993198,2.4320354654689402,1.6918202104515045,3.307883292569511,9.246404576346485,2.6650153254379982,0.7426978695310438,2.946057114473022,4.24051262452261,1.2611059712054873,2.0900371573589505,3.990430050280731,7.4231569421484656,1.0350569719740244,3.062157453354606,9.144003812567473,9.47557945225454,4.203915084167278,6.032787329659377,0.7646670027244484,1.9563428588297316,7.277484251686364,9.556567469849046,1.589248345635632,2.7486385169404004,1.177753184005208,4.635345864389433,2.970628768543375,7.219152928034531,2.5322861064906244,3.6437474078472554,0.009020761636280294,8.917634927001068,3.887916498550037,6.407175086419961,9.954814672672397,7.413388608722487,3.850407188598308,7.487992185682655,0.578965013595556,1.7412292706224752,5.5237321646569555,0.9620370478030749,7.636097616814299,1.7098116383846795,0.581848946523853,3.9862790202229315,8.759144190070936,9.993348904749526,6.020429184369096,4.577237278903481,8.315559747703,3.6153713357469064,4.190733319888973,2.822228359526553,4.568062111259623,0.18707378871131386,0.3318653958596274,3.4410566865059877,5.0430301311643095,0.6949115843175413,4.9678994806778665,8.764512393539729,6.820210392145308,5.986782439440819,4.436670567677008,4.649425598066834,5.8882281373440755,7.342269357656582,0.3030080676500768,4.9324932977589775,6.821594075845878,9.871069771402984,7.157735982292859,4.566516471045143,2.9963058320238223,9.126255452390799,2.461104381821484,2.618185813876106,0.9307193541242942,5.009954258797169,7.769959735417487,2.8142426478681903,8.721304481412728,7.590513288684946,8.669602713635253,8.886929870670986,0.38985786071139117,6.1664594342257395,5.843967693792827,7.921786357500218,7.739911280674338,0.10212603747125737,7.76129234223188,2.5817878198037647,6.512998832576875,6.041579132707319,7.515472551966633,0.8464776580812283,2.031990197494471,0.49456538861058164,3.108354688227899,6.425705631965856,2.7845946340981897,9.649868157438812,2.2992735924004903,7.88930232002558,2.5727317914255665,1.659121933976777,6.890541419144533,9.106015522428565,6.513643764231825,4.726935581870215,2.1007289936515505,5.356191310823362,5.218770388167096,2.961818614574845,9.138439176284283,3.4021784860917625,7.842375069495812,0.6582795896186933,9.008120242949257,3.1211782885915973,3.8311806072802512,8.470512241048953,7.410042631248688,4.411387537382181,1.5812845982090251,5.854153213793129,6.389030392019102,1.3586906898493067,8.305702992117931,0.2880286489018924,5.653142009807244,7.538529722998801,2.015415637911915,8.250499623914811,3.6597404982427806,1.9492983811966913,9.661641011164821,0.5258079521142789,9.68380077224462,8.383880521438323,4.2905262855724775,4.105076709674449,2.6063450018617873,4.286961000898042,2.1307542966252258,5.839086476083672,7.169395044087958,1.1924259381127822,5.5922599325765106,5.568998726356098,3.1245190227646957,5.279721239186257,8.935528209004982,3.496380939475068,3.4515099037305363,6.4956764062123025,3.9075587759389707,9.826976293372118,1.273109536027246,4.299407550304428,0.06836624649513734,2.8131007703375532,8.475353489194541,7.503912049877766,7.435930373676145,8.94307959366271,3.6783882411108593,4.872444727741709,1.5054183321017822,8.358028789045871,6.250151516078621,0.16219143519895507,2.2182314831054195,9.945371572463483,5.082283826772278,6.570052095460586,8.99567795227943,9.799895733587805,9.280762239888016,1.9051886367971194,6.017161832779559,9.124301704171554,8.394491805972217,1.5034279858264776,9.14330612437327,8.162955072151668,9.783230357567355,0.13264678052809176,1.9669963293121406,8.303893335250125,5.649529821995072,3.240340328260898,7.014848763543988,6.959119733969348,6.521993879813017,8.073841378265477,1.871249365300629,2.029455054591467,9.227142803603915,2.289180593300033,7.526308092060434,2.4626883564918134,0.27336945759617315,4.7847001325969245,8.289927405346171,4.263074534443794,3.7673548328365447,3.4576957094079597,0.1324821920005581,6.628490750122729,7.924731469011448,8.124354465983462,1.577502562461206,1.811966907486282,7.76897165472162,6.207177359817604,0.7645883902512773,5.801745897471664,2.891555317375225,1.4327311847230373,1.9647664088914696,9.442396633571676,7.065374574419017,6.167557052361127,2.3926528168862227,3.972212721402899,5.434788576265232,3.6053312623687472,6.937088868314547,1.0208651869007768,3.4011616195585104,7.950625410772069,7.01474696643076,0.7914159277362542,3.9632584774380053,1.4345395295988417,9.155072522224296,9.361647311461477,9.769407364787611,1.6863619065513413,7.884732165905417,4.218268356994197,5.588755345704337,7.195573756660549,0.26954906214748275,8.869404917758146,6.5391853931653054,1.1143824305158634,3.378834568124962,4.616455056621273,8.299405559379338,2.046041035960491,5.950204263551857,6.883894660261491,2.930623942568542,9.760621607416365,1.8346145236900413,7.213729963072629,3.3715574693031813,2.4618028765281585,6.6511037429045095,4.662736606022671,7.400344639933085,4.594884745179555,6.879876563164961,5.883301032095631,0.5672261807513879,3.56631307340596,1.8153486924401507,8.98181927889826,2.368681285269507,9.956874347200266,6.690989028552714,4.458149022957578,0.3792107368015918,7.483308780167692,5.324166561039818,9.77174370085991,4.322452107082492,2.272682603188867,4.656987758748487,0.36091124649082706,4.565204699357357,3.183886828813016,2.184546331406505,7.5350868846446994,9.159076488729038,5.700963580415581,6.544141818555939,9.316936466272931,0.4361029809852801,3.4396258751224473,6.177644034868619,4.37867476714402,9.112205643386586,0.5508726464374658,2.9101208213049223,7.258617636460956,7.516450671511594,1.4434336036193485,1.326732762272007,9.513534503782193,2.2345467856515877,4.916132503966542,7.10367936908765,6.06163499093017,1.2683526896667408,9.2893569885973,8.726796692370481,7.374449547909839,6.21111820627509,2.595582796391338,9.574622280179712,9.20064622923266,8.13366336908266,4.7346704693992026,8.098088886990638,3.8864745786491683,3.1093338952214156,0.7056263808943264,1.184954339588331,7.777038561245833,6.406420420371686,0.11969183877700518,3.9828840476866323,8.920407589471019,3.595614682616952,9.86659473648491,0.9165226357189948,6.219449029087016,0.031929400824939336,5.876578861832504,6.75551446887755,8.119094052152258,4.624129161075732,9.488471709112758,7.718015689206206,1.1122017059509925,4.178355049118496,2.7620420000612245,1.8848742753184888,7.6406628852468605,4.14568074837415,7.257667468247031,7.638987048956891,0.2793026195734405,4.097481836638894,1.0197855873869721,7.225152077114578,9.6638070579477,1.5029681072362222,6.8637637059808565,4.757685377696868,3.7167094826611136,0.12431822393907499,1.2550382364942592,5.344065358533432,7.733091404233175,0.25134310116759817,3.765540812231156,5.361034986370328,3.8592298686422155,7.173019223757365,8.975014306240787,3.8706849124966003,1.4858221361611301,6.062347725856798,0.274820883159681,9.216293897953289,8.631217802487692,2.69356342333809,4.515546257826866,0.7954023214688144,8.203047392849452,8.594995957724032,6.187706719007357,5.775796557614841,7.660881827576615,9.73750475898646,9.570547872778338,3.1617358092000925,6.056486379756516,1.176272050177607,0.6913974937639211,9.63421146036465,1.4809114266084733,3.2542217983325084,8.684013581709527,2.419371404738895,6.471430919241272,1.939111636364892,2.578790720434081,6.772427505823499,9.525253524364548,5.7545197076081696,5.289769914285227,6.847713705539766,0.14190272837805828,5.909574877536075,4.066741609567108,1.5280009463383415,6.628438202535365,5.062747911014305,9.090848268056611,7.2236153543458865,3.244262161752196,7.589473416940827,0.1394643688516517,1.5554462782075484,9.853505851281128,1.7731986185704085,7.809425426193528,5.917676975706794,5.398579600052276,9.146449045514792,8.605095549882995,0.7274769128102299,8.884169246941005,0.913315917793529,8.88343222022833,0.417864723430168,3.556450556730766,0.8994810283780952,8.703358201630177,0.3106981290547939,1.3902890497391218,2.3853536559351673,6.856992641438362,9.745316969416454,2.840113616101556,5.8156570737746165,8.697936477443884,4.516523792406306,3.935002019165792,8.77858578049035,7.244653168826534,9.703017125449707,6.449353020288262,4.195520008692258,3.7502550007380875,5.7350184129210895,4.4503806537360635,7.151829753633505,7.39185910138734,7.927643167047773,9.66792849303864,3.6247040963466515,5.441329934450019,0.6899670973432936,1.3377795266663761,3.020125869085677,4.942145094463233,6.179708715718006,6.4781962925221865,7.003697703182508,5.013547832174796,2.1854772075892615,2.1769197235881155,5.955402733016946,2.9165128520549377,5.653819743364927,2.861993282884321,1.7111582080489707,8.330756224681634,9.764659093213112,8.66039905310982,2.782587134226755,0.5597865193050966,7.88229411714485,2.5663755367193453,6.784626719525068,4.719340675427734,5.224982341444524,4.777385518829169,6.181682513966078,1.0005183002972529,7.5263922519254445,9.698868419884157,3.042772908540705,1.158336338981274,4.309703779486265,1.543581419768889,2.2878563585736433,4.273163056486791,9.642944131686368,8.785233273088549,7.53987098064419,5.316142921375415,2.9561714201162492,6.570718004238816,9.776239997431661,3.147317900213147,4.349887563824484,7.283637668548517,0.9290917581776315,3.481003078777567,6.838926445388786,8.270174845443414,4.257625840411192,7.285182173142301,8.2368544270115,5.3750240160639,2.438344467667628,7.759210486517009,0.41375085103602105,9.137128095340918,9.751939324435352,1.7263961544776452,1.3184414484659768,9.804999655840396,1.0746537207037954,4.183356786491535,2.0236284596784904,9.222515233416424,8.630518718697346,8.037269242525527,4.419413559313812,3.2980053625944605,5.811749201417706,8.389683506993467,5.906449337156046,2.407107678252667,7.955168014505656,3.75713628451537,7.305065637491126,2.4042461044765817,4.158343448355111,9.882095816798191,9.670412009777378,9.180279940956712,5.6874909961736675,7.005939408999515,7.406042547556526,1.0193413910796312,6.094971041152581,8.586664051630946,6.710378548314743,7.165690568230918,0.750993337642798,9.0965747640474,4.6636998031104255,9.117380075897731,4.280238245348085,9.325829155153198,4.981075974513938,9.212114321063114,5.988572215957635,0.1898481684421527,7.815301279025794,3.996796468093351,6.181862337736755,4.917777208670476,7.378844378821084,3.0967182154521167,5.473357232099303,1.7556002824726646,8.923833675913542,8.847517733796284,6.060754678852969,5.185350573193521,8.091499216008645,3.3825599925228467,7.890265353480235,1.1277716207815658,5.88129012584875,4.446144423464018,3.9224277368918647,1.9084987027870715,3.39875052485892,4.047046458059702,3.651273724530444,0.5694774788970225,3.2298991919267483,0.49031791771833255,4.133287594332167,9.687312116342678,1.1025941202847367,9.022998870401985,3.723817699759957,6.5886868456064445,4.64855251503317,8.316934655198152,2.2647486219121316,8.133466945017503,6.976914245342969,1.9807873264646858,0.6312770587993977,3.271487449843322,2.1256873875526616,5.490188279351738,6.332444868480456,7.91801063505795,2.797419369590901,5.567462201725888,4.170768344788653,5.105122222592071,3.230341777268899,6.80836865098321,2.4678963212934835,8.467113621035004,5.770008353807019,4.320322657643705,6.672523336734044,9.069232404784977,3.6576638765356884,7.354073662431844,6.104655685780682,4.9243632208626975,4.475059374448973,7.097609113581691,1.1188337975932705,8.460233833879423,2.695242210079589,7.187890966049837,8.386981728751726,2.3651947106066418,4.957851162098144,5.733996152459517,1.4342422700268997,9.816286119429563,6.799639467263862,9.397391483911646,6.021273203764186,8.927653409733704,7.248977097613762,1.4784899060895063,6.575290065003918,8.55383609586484,2.2039888826129794,2.621632685087385,9.768604822041588,7.095892962828573,7.01337429184586,6.8312920064163185,8.708622136209605,8.861065315193743,8.10393980684912,3.565668457858664,4.39563221457123,3.480446472993177,2.4569589223233357,7.8165831658825695,1.4132247717648028,3.101989843397146,0.48882848023887426,3.9492839027718585,9.45096988331799,4.3317507876854595,4.557295588209431,2.8282960770321264,8.20966238467473,5.536721902202462,6.252934282916767,5.3573573084341675,0.7346691373742376,5.035542532170501,8.413377352726634,0.5774249584774171,4.123436017877713,8.555128956343147,2.7845969631215506,3.1358035300947806,0.4223513310365168,4.503734850322882,0.35993806031906495,8.767751254270998,0.5288889417048015,3.6271177587145975,6.413267973292436,9.44198240158398,5.010846197419118,7.493657070909987,2.7120973744672905,3.8920011674098665,6.489743332228675,7.344213879269741,7.937642230730015,9.728153004172828,2.299507013984674,8.256695094841508,8.351651454113886,2.9052370456154764,9.506049305810429,1.8989281721107543,7.857832316461204,7.656730025682443,2.844173497393423,8.607532451870984,2.586279188018501,6.542957113227487,5.613690466089514,6.484000679142337,5.697167615996683,5.325882784367004,7.023649153495999,0.6056767624349302,3.059073995944519,6.074853484561129,5.633802144415123,7.504029062793327,4.157107479813121,5.467085441937309,8.917665416427809,5.189093456420817,4.068852160658681,5.460623403483256,0.6924122272650179,9.626515093488619,9.405450237910474,6.010264285512406,5.3113393050715025,5.815094462210178,7.872817107939278,9.28244356420694,9.751382347729365,8.343664845830936,8.565126889252815,7.4292721119792615,5.016915430182389,0.734545296382414,4.956078106770936,8.200196328765436,0.27895466617287923,2.2795561739677495,7.515294580425933,4.134151281360956,8.048400513315691,6.292419870227928,4.0776418477448395,8.731438939566079,7.341117762263389,1.130332538607428,9.727524555944488,9.028881177266266,5.545638706649858,1.1880443550570807,5.361219376330353,4.1461257411821]}

},{}],73:[function(require,module,exports){
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

tape( 'if provided a finite `mu` and `b`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `b`, the created function always returns `NaN`', function test( t ) {
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
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var p;
	var y;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	b = positiveMean.b;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], b[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given negative `mu`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var p;
	var y;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	b = negativeMean.b;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], b[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given large variance ( = large `b`)', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var p;
	var y;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	b = largeVariance.b;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], b[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/quantile/test/test.factory.js")
},{"./../lib/factory.js":67,"./fixtures/julia/large_variance.json":70,"./fixtures/julia/negative_mean.json":71,"./fixtures/julia/positive_mean.json":72,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":228}],74:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/quantile/test/test.js")
},{"./../lib":68,"tape":228}],75:[function(require,module,exports){
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

tape( 'if provided a number outside `[0,1]` for `p` and a finite `mu` and `b`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a nonpositive `b`, the function returns `NaN`', function test( t ) {
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
	var tol;
	var mu;
	var b;
	var i;
	var p;
	var y;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	b = positiveMean.b;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var p;
	var y;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	b = negativeMean.b;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given large variance ( = large `b` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var p;
	var y;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	b = largeVariance.b;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/quantile/test/test.quantile.js")
},{"./../lib":68,"./fixtures/julia/large_variance.json":70,"./fixtures/julia/negative_mean.json":71,"./fixtures/julia/positive_mean.json":72,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":228}],76:[function(require,module,exports){
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

},{"./is_number.js":79}],77:[function(require,module,exports){
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

},{"./is_number.js":79,"./zero_pad.js":83}],78:[function(require,module,exports){
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

},{"./main.js":81}],79:[function(require,module,exports){
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

},{"./format_double.js":76,"./format_integer.js":77,"./is_string.js":80,"./space_pad.js":82,"./zero_pad.js":83}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{"./main.js":85}],85:[function(require,module,exports){
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

},{"./main.js":88}],87:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"dup":80}],88:[function(require,module,exports){
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

},{"./is_string.js":87,"@stdlib/string/base/format-interpolate":78,"@stdlib/string/base/format-tokenize":84}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/utils/define-property":98}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{"./define_property.js":96}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":95,"./has_define_property_support.js":97,"./polyfill.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":86}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":101,"./polyfill.js":102,"@stdlib/assert/has-tostringtag-support":20}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":103}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":103,"./tostringtag.js":104,"@stdlib/assert/has-own-property":16}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":89}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){

},{}],107:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],108:[function(require,module,exports){
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
},{"base64-js":105,"buffer":108,"ieee754":211}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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
},{"_process":218}],111:[function(require,module,exports){
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

},{"events":109,"inherits":212,"readable-stream/lib/_stream_duplex.js":113,"readable-stream/lib/_stream_passthrough.js":114,"readable-stream/lib/_stream_readable.js":115,"readable-stream/lib/_stream_transform.js":116,"readable-stream/lib/_stream_writable.js":117,"readable-stream/lib/internal/streams/end-of-stream.js":121,"readable-stream/lib/internal/streams/pipeline.js":123}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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
},{"./_stream_readable":115,"./_stream_writable":117,"_process":218,"inherits":212}],114:[function(require,module,exports){
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
},{"./_stream_transform":116,"inherits":212}],115:[function(require,module,exports){
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
},{"../errors":112,"./_stream_duplex":113,"./internal/streams/async_iterator":118,"./internal/streams/buffer_list":119,"./internal/streams/destroy":120,"./internal/streams/from":122,"./internal/streams/state":124,"./internal/streams/stream":125,"_process":218,"buffer":108,"events":109,"inherits":212,"string_decoder/":227,"util":106}],116:[function(require,module,exports){
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
},{"../errors":112,"./_stream_duplex":113,"inherits":212}],117:[function(require,module,exports){
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
},{"../errors":112,"./_stream_duplex":113,"./internal/streams/destroy":120,"./internal/streams/state":124,"./internal/streams/stream":125,"_process":218,"buffer":108,"inherits":212,"util-deprecate":236}],118:[function(require,module,exports){
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
},{"./end-of-stream":121,"_process":218}],119:[function(require,module,exports){
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
},{"buffer":108,"util":106}],120:[function(require,module,exports){
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
},{"_process":218}],121:[function(require,module,exports){
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
},{"../../../errors":112}],122:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],123:[function(require,module,exports){
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
},{"../../../errors":112,"./end-of-stream":121}],124:[function(require,module,exports){
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
},{"../../../errors":112}],125:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":109}],126:[function(require,module,exports){
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

},{"./":127,"get-intrinsic":202}],127:[function(require,module,exports){
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

},{"es-define-property":187,"es-errors/type":193,"function-bind":201,"get-intrinsic":202,"set-function-length":222}],128:[function(require,module,exports){
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

},{"./lib/is_arguments.js":129,"./lib/keys.js":130}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],131:[function(require,module,exports){
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

},{"es-define-property":187,"es-errors/syntax":192,"es-errors/type":193,"gopd":203}],132:[function(require,module,exports){
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

},{"define-data-property":131,"has-property-descriptors":204,"object-keys":216}],133:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],134:[function(require,module,exports){
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

},{"./ToNumber":165,"./ToPrimitive":167,"./Type":172}],135:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/isNaN":181,"../helpers/isPrefixOf":182,"./ToNumber":165,"./ToPrimitive":167,"es-errors/type":193,"get-intrinsic":202}],136:[function(require,module,exports){
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

},{"call-bind/callBound":126,"es-errors/type":193}],137:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":195}],138:[function(require,module,exports){
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

},{"./DayWithinYear":141,"./InLeapYear":145,"./MonthFromTime":155,"es-errors/eval":188}],139:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":186,"./floor":176}],140:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":176}],141:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":139,"./DayFromYear":140,"./YearFromTime":174}],142:[function(require,module,exports){
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

},{"./modulo":177}],143:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":184,"./IsAccessorDescriptor":146,"./IsDataDescriptor":148,"es-errors/type":193}],144:[function(require,module,exports){
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

},{"../helpers/timeConstants":186,"./floor":176,"./modulo":177}],145:[function(require,module,exports){
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

},{"./DaysInYear":142,"./YearFromTime":174,"es-errors/eval":188}],146:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":184,"es-errors/type":193,"hasown":210}],147:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":213}],148:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":184,"es-errors/type":193,"hasown":210}],149:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":146,"./IsDataDescriptor":148,"./IsPropertyDescriptor":150,"es-errors/type":193}],150:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":184}],151:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/timeConstants":186}],152:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"./DateFromTime":138,"./Day":139,"./MonthFromTime":155,"./ToInteger":164,"./YearFromTime":174,"./floor":176,"./modulo":177,"get-intrinsic":202}],153:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/timeConstants":186,"./ToInteger":164}],154:[function(require,module,exports){
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

},{"../helpers/timeConstants":186,"./floor":176,"./modulo":177}],155:[function(require,module,exports){
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

},{"./DayWithinYear":141,"./InLeapYear":145}],156:[function(require,module,exports){
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

},{"../helpers/isNaN":181}],157:[function(require,module,exports){
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

},{"../helpers/timeConstants":186,"./floor":176,"./modulo":177}],158:[function(require,module,exports){
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

},{"./Type":172}],159:[function(require,module,exports){
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


},{"../helpers/isFinite":180,"./ToNumber":165,"./abs":175,"get-intrinsic":202}],160:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":186,"./DayFromYear":140}],161:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":186,"./modulo":177}],162:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],163:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":165}],164:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/isNaN":181,"../helpers/sign":185,"./ToNumber":165,"./abs":175,"./floor":176}],165:[function(require,module,exports){
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

},{"./ToPrimitive":167,"call-bind/callBound":126,"safe-regex-test":221}],166:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":196}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":198}],168:[function(require,module,exports){
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

},{"./IsCallable":147,"./ToBoolean":162,"./Type":172,"es-errors/type":193,"hasown":210}],169:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":202}],170:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/isNaN":181,"../helpers/sign":185,"./ToNumber":165,"./abs":175,"./floor":176,"./modulo":177}],171:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":165}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":139,"./modulo":177}],174:[function(require,module,exports){
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

},{"call-bind/callBound":126,"get-intrinsic":202}],175:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":202}],176:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],177:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":183}],178:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":186,"./modulo":177}],179:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":134,"./5/AbstractRelationalComparison":135,"./5/Canonicalize":136,"./5/CheckObjectCoercible":137,"./5/DateFromTime":138,"./5/Day":139,"./5/DayFromYear":140,"./5/DayWithinYear":141,"./5/DaysInYear":142,"./5/FromPropertyDescriptor":143,"./5/HourFromTime":144,"./5/InLeapYear":145,"./5/IsAccessorDescriptor":146,"./5/IsCallable":147,"./5/IsDataDescriptor":148,"./5/IsGenericDescriptor":149,"./5/IsPropertyDescriptor":150,"./5/MakeDate":151,"./5/MakeDay":152,"./5/MakeTime":153,"./5/MinFromTime":154,"./5/MonthFromTime":155,"./5/SameValue":156,"./5/SecFromTime":157,"./5/StrictEqualityComparison":158,"./5/TimeClip":159,"./5/TimeFromYear":160,"./5/TimeWithinDay":161,"./5/ToBoolean":162,"./5/ToInt32":163,"./5/ToInteger":164,"./5/ToNumber":165,"./5/ToObject":166,"./5/ToPrimitive":167,"./5/ToPropertyDescriptor":168,"./5/ToString":169,"./5/ToUint16":170,"./5/ToUint32":171,"./5/Type":172,"./5/WeekDay":173,"./5/YearFromTime":174,"./5/abs":175,"./5/floor":176,"./5/modulo":177,"./5/msFromTime":178}],180:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":181}],181:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],182:[function(require,module,exports){
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

},{"call-bind/callBound":126}],183:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],184:[function(require,module,exports){
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

},{"es-errors/type":193,"hasown":210}],185:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{"get-intrinsic":202}],188:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],189:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],190:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],191:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],192:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],193:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],194:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],195:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":193}],196:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":197,"./RequireObjectCoercible":195}],197:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],198:[function(require,module,exports){
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

},{"./helpers/isPrimitive":199,"is-callable":213}],199:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":200}],202:[function(require,module,exports){
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

},{"es-errors":189,"es-errors/eval":188,"es-errors/range":190,"es-errors/ref":191,"es-errors/syntax":192,"es-errors/type":193,"es-errors/uri":194,"function-bind":201,"has-proto":205,"has-symbols":206,"hasown":210}],203:[function(require,module,exports){
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

},{"get-intrinsic":202}],204:[function(require,module,exports){
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

},{"es-define-property":187}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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

},{"./shams":207}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":207}],209:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":201}],210:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":201}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{"call-bind/callBound":126,"has-tostringtag/shams":208}],215:[function(require,module,exports){
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

},{"./isArguments":217}],216:[function(require,module,exports){
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

},{"./implementation":215,"./isArguments":217}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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
},{"_process":218,"through":234,"timers":235}],220:[function(require,module,exports){
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

},{"buffer":108}],221:[function(require,module,exports){
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

},{"call-bind/callBound":126,"es-errors/type":193,"is-regex":214}],222:[function(require,module,exports){
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

},{"define-data-property":131,"es-errors/type":193,"get-intrinsic":202,"gopd":203,"has-property-descriptors":204}],223:[function(require,module,exports){
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

},{"es-abstract/es5":179,"function-bind":201}],224:[function(require,module,exports){
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

},{"./implementation":223,"./polyfill":225,"./shim":226,"define-properties":132,"function-bind":201}],225:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":223}],226:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":225,"define-properties":132}],227:[function(require,module,exports){
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
},{"safe-buffer":220}],228:[function(require,module,exports){
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
},{"./lib/default_stream":229,"./lib/results":231,"./lib/test":232,"_process":218,"defined":133,"through":234,"timers":235}],229:[function(require,module,exports){
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
},{"_process":218,"fs":107,"through":234}],230:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":218,"timers":235}],231:[function(require,module,exports){
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
},{"_process":218,"events":109,"function-bind":201,"has":209,"inherits":212,"object-inspect":233,"resumer":219,"through":234,"timers":235}],232:[function(require,module,exports){
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
},{"./next_tick":230,"deep-equal":128,"defined":133,"events":109,"has":209,"inherits":212,"path":110,"string.prototype.trim":224}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
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
},{"_process":218,"stream":111}],235:[function(require,module,exports){
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
},{"process/browser.js":218,"timers":235}],236:[function(require,module,exports){
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
},{}]},{},[73,74,75]);
