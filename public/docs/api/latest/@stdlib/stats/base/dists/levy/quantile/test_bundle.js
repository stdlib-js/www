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

},{"@stdlib/utils/native-class":107}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":107}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":107}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":107}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":66}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluate the inverse complementary error function.
*
* @module @stdlib/math/base/special/erfcinv
*
* @example
* var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
*
* var y = erfcinv( 0.5 );
* // returns ~0.4769
*
* y = erfcinv( 0.8 );
* // returns ~-0.1791
*
* y = erfcinv( 0.0 );
* // returns Infinity
*
* y = erfcinv( 2.0 );
* // returns -Infinity
*
* y = erfcinv( NaN );
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_81_0/boost/math/special_functions/detail/erf_inv.hpp}. This implementation follows the original, but has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var rationalFcnR1 = require( './rational_p1q1.js' );
var rationalFcnR2 = require( './rational_p2q2.js' );
var rationalFcnR3 = require( './rational_p3q3.js' );
var rationalFcnR4 = require( './rational_p4q4.js' );
var rationalFcnR5 = require( './rational_p5q5.js' );


// VARIABLES //

var Y1 = 8.91314744949340820313e-2;
var Y2 = 2.249481201171875;
var Y3 = 8.07220458984375e-1;
var Y4 = 9.3995571136474609375e-1;
var Y5 = 9.8362827301025390625e-1;


// MAIN //

/**
* Evaluates the inverse complementary error function.
*
* Note that
*
* ```tex
* \operatorname{erfc^{-1}}(1-z) = \operatorname{erf^{-1}}(z)
* ```
*
* ## Method
*
* 1.  For \\(|x| \leq 0.5\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = x(x+10)(\mathrm{Y} + \operatorname{R}(x))
*     ```
*
*     where \\(Y\\) is a constant and \\(\operatorname{R}(x)\\) is optimized for a low absolute error compared to \\(|Y|\\).
*
*     <!-- <note> -->
*
*     Max error \\(2.001849\mbox{e-}18\\). Maximum deviation found (error term at infinite precision) \\(8.030\mbox{e-}21\\).
*
*     <!-- </note> -->
*
* 2.  For \\(0.5 > 1-|x| \geq 0\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}} = \frac{\sqrt{-2 \cdot \ln(1-x)}}{\mathrm{Y} + \operatorname{R}(1-x)}
*     ```
*
*     where \\(Y\\) is a constant, and \\(\operatorname{R}(q)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Max error \\(7.403372\mbox{e-}17\\). Maximum deviation found (error term at infinite precision) \\(4.811\mbox{e-}20\\).
*
*     <!-- </note> -->
*
* 3.  For \\(1-|x| < 0.25\\), we have a series of rational approximations all of the general form
*
*     ```tex
*     p = \sqrt{-\ln(1-x)}
*     ```
*
*     Accordingly, the result is given by
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = p(\mathrm{Y} + \operatorname{R}(p-B))
*     ```
*
*     where \\(Y\\) is a constant, \\(B\\) is the lowest value of \\(p\\) for which the approximation is valid, and \\(\operatorname{R}(x-B)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Almost all code will only go through the first or maybe second approximation.  After that we are dealing with very small input values.
*
*     -   If \\(p < 3\\), max error \\(1.089051\mbox{e-}20\\).
*     -   If \\(p < 6\\), max error \\(8.389174\mbox{e-}21\\).
*     -   If \\(p < 18\\), max error \\(1.481312\mbox{e-}19\\).
*     -   If \\(p < 44\\), max error \\(5.697761\mbox{e-}20\\).
*     -   If \\(p \geq 44\\), max error \\(1.279746\mbox{e-}20\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     The Boost library can accommodate \\(80\\) and \\(128\\) bit long doubles. JavaScript only supports a \\(64\\) bit double (IEEE 754). Accordingly, the smallest \\(p\\) (in JavaScript at the time of this writing) is \\(\sqrt{-\ln(\sim5\mbox{e-}324)} = 27.284429111150214\\).
*
*     <!-- </note> -->
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfcinv( 0.5 );
* // returns ~0.4769
*
* @example
* var y = erfcinv( 0.8 );
* // returns ~0.1791
*
* @example
* var y = erfcinv( 0.0 );
* // returns Infinity
*
* @example
* var y = erfcinv( 2.0 );
* // returns -Infinity
*
* @example
* var y = erfcinv( NaN );
* // returns NaN
*/
function erfcinv( x ) {
	var sign;
	var qs;
	var q;
	var g;
	var r;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	// Special case: 2
	if ( x === 2.0 ) {
		return NINF;
	}
	// Special case: 1
	if ( x === 1.0 ) {
		return 0.0;
	}
	if ( x > 2.0 || x < 0.0 ) {
		return NaN;
	}
	// Argument reduction (reduce to interval [0,1]). If `x` is outside [0,1], we can take advantage of the complementary error function reflection formula: `erfc(-z) = 2 - erfc(z)`, by negating the result once finished.
	if ( x > 1.0 ) {
		sign = -1.0;
		q = 2.0 - x;
	} else {
		sign = 1.0;
		q = x;
	}
	x = 1.0 - q;

	// x = 1-q <= 0.5
	if ( x <= 0.5 ) {
		g = x * ( x + 10.0 );
		r = rationalFcnR1( x );
		return sign * ( (g*Y1) + (g*r) );
	}
	// q >= 0.25
	if ( q >= 0.25 ) {
		g = sqrt( -2.0 * ln(q) );
		q -= 0.25;
		r = rationalFcnR2( q );
		return sign * ( g / (Y2+r) );
	}
	q = sqrt( -ln( q ) );

	// q < 3
	if ( q < 3.0 ) {
		qs = q - 1.125;
		r = rationalFcnR3( qs );
		return sign * ( (Y3*q) + (r*q) );
	}
	// q < 6
	if ( q < 6.0 ) {
		qs = q - 3.0;
		r = rationalFcnR4( qs );
		return sign * ( (Y4*q) + (r*q) );
	}
	// q < 18
	qs = q - 6.0;
	r = rationalFcnR5( qs );
	return sign * ( (Y5*q) + (r*q) );
}


// EXPORTS //

module.exports = erfcinv;

},{"./rational_p1q1.js":55,"./rational_p2q2.js":56,"./rational_p3q3.js":57,"./rational_p4q4.js":58,"./rational_p5q5.js":59,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":60,"@stdlib/math/base/special/sqrt":64}],55:[function(require,module,exports){
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
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.0005087819496582806;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0005087819496582806 + (x * (-0.008368748197417368 + (x * (0.03348066254097446 + (x * (-0.012692614766297404 + (x * (-0.03656379714117627 + (x * (0.02198786811111689 + (x * (0.008226878746769157 + (x * (-0.005387729650712429 + (x * (0.0 + (x * 0.0))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-0.9700050433032906 + (x * (-1.5657455823417585 + (x * (1.5622155839842302 + (x * (0.662328840472003 + (x * (-0.7122890234154284 + (x * (-0.05273963823400997 + (x * (0.07952836873415717 + (x * (-0.0023339375937419 + (x * 0.0008862163904564247))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0 + (x * (-0.005387729650712429 + (x * (0.008226878746769157 + (x * (0.02198786811111689 + (x * (-0.03656379714117627 + (x * (-0.012692614766297404 + (x * (0.03348066254097446 + (x * (-0.008368748197417368 + (x * -0.0005087819496582806))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0008862163904564247 + (x * (-0.0023339375937419 + (x * (0.07952836873415717 + (x * (-0.05273963823400997 + (x * (-0.7122890234154284 + (x * (0.662328840472003 + (x * (1.5622155839842302 + (x * (-1.5657455823417585 + (x * (-0.9700050433032906 + (x * 1.0))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.20243350835593876;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.20243350835593876 + (x * (0.10526468069939171 + (x * (8.3705032834312 + (x * (17.644729840837403 + (x * (-18.851064805871424 + (x * (-44.6382324441787 + (x * (17.445385985570866 + (x * (21.12946554483405 + (x * -3.6719225470772936))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (6.242641248542475 + (x * (3.971343795334387 + (x * (-28.66081804998 + (x * (-20.14326346804852 + (x * (48.560921310873994 + (x * (10.826866735546016 + (x * (-22.643693341313973 + (x * 1.7211476576120028))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -3.6719225470772936 + (x * (21.12946554483405 + (x * (17.445385985570866 + (x * (-44.6382324441787 + (x * (-18.851064805871424 + (x * (17.644729840837403 + (x * (8.3705032834312 + (x * (0.10526468069939171 + (x * -0.20243350835593876))))))))))))))); // eslint-disable-line max-len
		s2 = 1.7211476576120028 + (x * (-22.643693341313973 + (x * (10.826866735546016 + (x * (48.560921310873994 + (x * (-20.14326346804852 + (x * (-28.66081804998 + (x * (3.971343795334387 + (x * (6.242641248542475 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],57:[function(require,module,exports){
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
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.1311027816799519;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.1311027816799519 + (x * (-0.16379404719331705 + (x * (0.11703015634199525 + (x * (0.38707973897260434 + (x * (0.3377855389120359 + (x * (0.14286953440815717 + (x * (0.029015791000532906 + (x * (0.0021455899538880526 + (x * (-6.794655751811263e-7 + (x * (2.8522533178221704e-8 + (x * -6.81149956853777e-10))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (3.4662540724256723 + (x * (5.381683457070069 + (x * (4.778465929458438 + (x * (2.5930192162362027 + (x * (0.848854343457902 + (x * (0.15226433829533179 + (x * (0.011059242293464892 + (x * (0.0 + (x * (0.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -6.81149956853777e-10 + (x * (2.8522533178221704e-8 + (x * (-6.794655751811263e-7 + (x * (0.0021455899538880526 + (x * (0.029015791000532906 + (x * (0.14286953440815717 + (x * (0.3377855389120359 + (x * (0.38707973897260434 + (x * (0.11703015634199525 + (x * (-0.16379404719331705 + (x * -0.1311027816799519))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.0 + (x * (0.011059242293464892 + (x * (0.15226433829533179 + (x * (0.848854343457902 + (x * (2.5930192162362027 + (x * (4.778465929458438 + (x * (5.381683457070069 + (x * (3.4662540724256723 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],58:[function(require,module,exports){
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
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.0350353787183178;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0350353787183178 + (x * (-0.0022242652921344794 + (x * (0.018557330651423107 + (x * (0.009508047013259196 + (x * (0.0018712349281955923 + (x * (0.00015754461742496055 + (x * (0.00000460469890584318 + (x * (-2.304047769118826e-10 + (x * 2.6633922742578204e-12))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (1.3653349817554064 + (x * (0.7620591645536234 + (x * (0.22009110576413124 + (x * (0.03415891436709477 + (x * (0.00263861676657016 + (x * (0.00007646752923027944 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 2.6633922742578204e-12 + (x * (-2.304047769118826e-10 + (x * (0.00000460469890584318 + (x * (0.00015754461742496055 + (x * (0.0018712349281955923 + (x * (0.009508047013259196 + (x * (0.018557330651423107 + (x * (-0.0022242652921344794 + (x * -0.0350353787183178))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.00007646752923027944 + (x * (0.00263861676657016 + (x * (0.03415891436709477 + (x * (0.22009110576413124 + (x * (0.7620591645536234 + (x * (1.3653349817554064 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],59:[function(require,module,exports){
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
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.016743100507663373;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.016743100507663373 + (x * (-0.0011295143874558028 + (x * (0.001056288621524929 + (x * (0.00020938631748758808 + (x * (0.000014962478375834237 + (x * (4.4969678992770644e-7 + (x * (4.625961635228786e-9 + (x * (-2.811287356288318e-14 + (x * 9.905570997331033e-17))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.5914293448864175 + (x * (0.1381518657490833 + (x * (0.016074608709367652 + (x * (0.0009640118070051656 + (x * (0.000027533547476472603 + (x * (2.82243172016108e-7 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 9.905570997331033e-17 + (x * (-2.811287356288318e-14 + (x * (4.625961635228786e-9 + (x * (4.4969678992770644e-7 + (x * (0.000014962478375834237 + (x * (0.00020938631748758808 + (x * (0.001056288621524929 + (x * (-0.0011295143874558028 + (x * -0.016743100507663373))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (2.82243172016108e-7 + (x * (0.000027533547476472603 + (x * (0.0009640118070051656 + (x * (0.016074608709367652 + (x * (0.1381518657490833 + (x * (0.5914293448864175 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

},{"./polyval_p.js":62,"./polyval_q.js":63,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":49,"@stdlib/number/float64/base/get-high-word":69,"@stdlib/number/float64/base/set-high-word":72}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{"./main.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":68,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],71:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":68}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":71,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a Lévy distribution.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} c - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0, 2.0 );
* var y = quantile( 0.5 );
* // returns ~14.396
*
* y = quantile( 0.8 );
* // returns ~41.16
*/
function factory( mu, c ) {
	if ( isnan( mu ) || isnan( c ) || c <= 0.0 ) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a Lévy distribution.
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
		var fval;
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		fval = erfcinv( p );
		return mu + ( c / ( 2.0*fval*fval ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/erfcinv":53,"@stdlib/utils/constant-function":98}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Lévy distribution quantile function.
*
* @module @stdlib/stats/base/dists/levy/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/levy/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~1.386
*
* @example
* var factory = require( '@stdlib/stats/base/dists/levy/quantile' ).factory;
* var quantile = factory( 10.0, 2.0 );
*
* var y = quantile( 0.5 );
* // returns ~14.396
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":74,"./main.js":76,"@stdlib/utils/define-nonenumerable-read-only-property":100}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );


// MAIN //

/**
* Evaluates the quantile function for a Lévy distribution with location parameter `mu` and scale parameter `c` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} c - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~15.58
*
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns ~8.396
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
function quantile( p, mu, c ) {
	var fval;
	if (
		isnan( mu ) ||
		isnan( c ) ||
		isnan( p ) ||
		c <= 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	fval = erfcinv( p );
	return mu + ( c / ( 2.0*fval*fval ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/erfcinv":53}],77:[function(require,module,exports){
module.exports={"expected":[1.4994256816893103,3495.8251876453255,11.453613362709053,7.30304619319476,32089.837899419967,9.406155024262242,16.17741985990959,36.47923300037572,9.820392840989564,33.59221270531671,5.7653170497737225,122.72980250747045,27.656118146056034,309.3020018310549,82.1738505084608,622.4445118881129,161571.99278880967,3.6764684441221913,4.364644491458878,7.508400870804983,0.707487164128104,68.12771768876186,27.06128925438889,2.298590800390528,6.837829081361339,49.99495873624654,1.8052087978933529,2.9098027673947944,17.81744381837126,22.417014575745657,4.036002594258237,69.14712236036708,851.6279704122261,72.71952469783768,23.378923757531922,1044.2879008792702,189550.11860694646,4942.912860688532,8.530890392579455,2.9969592755082104,1.0165560487432934,32.13907042846459,2.529445267061382,16.35562488103018,690804.526905204,35.836256490861494,3317.551270712512,4.443343044848694,660.8339025900817,26.86167223734368,22.871094326659968,5.6032032195150165,8.300568865855324,22.048482334956063,14.195680524733536,0.8467184072979776,1930.849500777463,17268.849870288625,6.864356073770558,12.254640623236144,231.55376415115776,24.36941217358321,15.340416483835329,22.405276459573507,1.0110944907826331,251.10476374618486,1.87907721105408,1.6871935684585997,24.215804878331927,26.506465662025523,9.411997031067058,16.386269695775354,9.356802524686216,123.44252113254845,26.613639180935582,41.14834005912235,10.185534388514043,17.503356059479266,5.452115672932426,11.575287510778583,8.918595503141777,7.550510907469373,7.78042208235477,1.7532682173512537,4.896596056039488,1.6208082600609117,0.370530579654158,29.7327487856175,48.92300060213358,158.279905947025,4.959531577489141,5.392664920074656,208.2114432765073,63.132226444427026,1.0169665481809687,3.4035595984019134,12.951759543147976,42965.75789398479,3.755086830723024,15.36566023852203,32.80862267019652,45.19212725481936,3652.268786110439,4.1922352171020645,17.274230940780143,6.226525688469584,9.872187872843934,105.75348666044268,62.47960769029121,2.099538688737174,231.27146024327635,6.35467123133509,627.2661459741548,9.359362741966411,19.111830982557006,9.090686857308015,11.261456931543108,14.883110368272215,13.319537754671053,52.37855729575164,94.92273149880502,8.971824889451433,163.06151997036505,106.25214025259073,1001.4704306332729,29.767183510395565,155.6172253386125,25.01861776400353,2464.9355876207346,137.18058305112126,38.88095156953408,8.18851800793847,84.54042324745832,14.154294877511688,252.37599278685067,50.007973879689146,24.059443215313372,23.909179604951763,230.00671965845612,4.2847546029133365,2.1898782948545588,11.800195066623363,23.681610258419788,11.460273747915222,1069.1387142308618,3.5759817112209307,97.59393266551383,19.391614342638704,1.862461103757435,15.38011991907143,19.886216451824183,37.29089421964469,9.070932090794143,153.05140103052537,2.1744267219482447,7.574323819986759,28.610278987014304,12.753869524485701,22.91506831010373,7.6982344721194,41.294081881309516,7.460952638747838,215.46672377946706,620.4935979079593,14.79032133331993,144.5644220552669,3.1005943622872367,11.00732207813641,22.93816363432139,1.2760096951980262,707.29855370727,12.350064697980365,27.518117078264428,82.35725806599395,22.271682684064782,99.02289413858905,26.397094205968653,55.844209626835784,32.418594944017194,11.013186633916154,266.27566052052333,116.03083733713817,81.21578031255667,10.846817801644137,5.590797525681267,36.662741183852916,4.946377567444516,88.82770277564093,53.49788858339254,2.9647877703060277,609.0363851195134,5.69016098987497,2.272640722978452,2.005063966604239,16.07555888980952,2.2917744419645025,55.92195079351658,13.129322413616784,10.579607082976949,11.176487612310694,22.263450966819192,17.33182517360273,39.33777532420659,3.702620576913856,51.000340709433715,171.81161593440817,47.13639815554174,81.03344376838562,11.997969983410282,13953.318584832128,41.98898755319698,217.18726966915003,1.8615059844102202,224.47679860039577,3.1570490238817177,222.44347553320821,2.4763441897336333,7.750541853315678,0.5669469051283617,2.3453678916661307,1.6167262272205667,6.247720157116413,5.770927963156815,22.90485565935029,6.6260787691253435,11.381246436844297,9.605143482845783,2.404430839325935,8.41342525845764,37.93489254686301,128.0785943172315,193.5666920416114,2.3071660644421152,3.6816978139223453,6407.344445321245,16.401771807022104,56.913016601283864,217.87150828240308,48.893768367027285,25.298744802408784,267.9398586154155,25.0340252985986,753.99302454377,17.708852853120398,34.076157281284935,41.57673447877682,138.20893569545314,26.91719458704665,2.937397517477863,4.513949714523228,40.29365200657334,5.065957427949111,7.977967169950843,2523.3058583971924,22.014463988240063,329.23943044933554,9.968571437226089,493.064994860627,10.07124621641816,1.1210808023757772,1.7559365707026444,195452.58229784717,1.5611356304478383,24.877611729531072,1.9940637257805645,15.21753172951816,123.98799108925398,1.9064946385730626,14.227514276872036,24.440780899537803,222.45977312618896,4.9705778920665065,104794.32989138577,1.4487998694508328,14.840221773720433,57.54383402201935,61.72601914260744,183.9816027319671,50.01595696635271,16.361667692808282,8.170978309755192,2160.15920294217,40.43794048294277,1.2019687743376088,36.30238103172905,23.78622335433174,40.09865477647116,9.524383497317453,39.52523955642024,246.52687398991404,9.224110994020599,7.978165087773314,3.2790437427880974,3.031659891733602,3.3602258637234215,176.64730534215337,7.3455196701400425,1.341869043579345,3.6842023182310513,7.003512066753268,32.99250927353619,34.94594687055163,212.42307472899617,33.0148720767014,1568.7875679954263,22.08268341216516,17.48713510177982,95.68324163004637,1662.571855428223,4.589380365500956,0.48856845270585125,520.2505573111665,69.84197350991502,3.0770089753984666,0.6876530826986035,238.96068243163296,47.33720456405573,12.9602333021705,1.7259046572413508,39.04782471690276,88.48876056200656,561.8634124804134,37.71394477212048,3.083855413964115,2.455568050945087,5.999320778880759,4.133688689040438,203.64583197951475,17.90983152459517,7.668215250293638,2.7821348024828,77.94035206912963,9.145399589731383,10.345885157360136,64.31432195031601,62.47444684353261,14.97944545912851,34.60866745487543,724.2065460115795,6.031998686637103,14.822852859125987,159.03133442344824,3.11611921222814,1.2089394855289708,1.917887079894255,10.120989993625635,1764.9276739882462,7.853682036320003,1599.4096391910562,91.07450006876535,89.6649586549748,58.46119396221244,71.13763875919258,17.83207471470354,12.028504607585988,7.602091868307399,3.51799959398181,6.430473666222019,30.361122373807834,6.6921897118163045,15.686303600347518,1045.2521206582762,23.198163722420134,320086.72423574113,10.190177008719786,48.08262088247108,4921.4787187855645,119.41531788686127,1.6526850913298197,44.58614421935304,18.42735485397093,566.1076204284574,0.80788094663869,6.73835791967266,861.1307352671042,9.42235610477619,5.962619055658984,3.5267116100857088,23.788356098676854,18.692636706143897,9.417485312756408,7.3404645391213075,198.8890043945068,7.6204824935016955,0.40396955326448164,15.953483017371097,231.8405654293977,2293.732400300347,7.486618208679668,6.952198636368219,3.3834659766415935,5.11625086548414,11.741745405067146,6.114691912471625,6.751617120156486,14.731004631687753,24.74305538595707,193.41110200707595,59.511353450406126,7698.624124248018,4093.4946938586904,84.34298417209827,5.524337974100043,3.5275833352631647,43.2478646391574,189.8558914941247,6.899678555394317,20.2185792565633,23.682725623151693,106.16528724022274,130.45944453444076,1.479629831362578,1233.301368022593,5.241140542196666,1.0863886369319156,11.112710903433074,2.803407511729758,98.9317445444594,10.956344338541879,1276.543767765875,0.3002632865272616,330.4725976832391,152.14653616305858,101.21741020090812,32.591519417164164,5.638062478291804,166409.1668407307,9.667640013205816,54.45351924282082,13.432967159410211,8.451330001427237,230.71374584605508,17.81716063472975,15.463544460081446,32.99314538621952,54.793457464980584,8.010743572954,362.3852446342881,1270.8548939260422,2.3842406951789608,36.73232754569933,5.219340727057946,131.1084403259871,8.12143595439929,6.554278082781945,13.136519388475135,2.520314516338396,15229.691265165817,290.3894116697618,101.16472234774602,350.93396434498106,18.888645540029714,66.81211318420156,2.112925965589894,18.643796243300663,13.267745494027617,206.90634236236147,607238.9861816025,7296.559742036271,3.4057946183146837,8.81740649068941,9.22769155429975,81.43135172592771,21.523636009458617,0.5376227142086238,18.26768386518912,2.562314191808693,17.81002330222772,286.9993597618744,602.8491192006237,186.53216486022382,361.1075911653094,43.511874166751745,202.44665945671068,4.359054756460975,0.814406109774843,23.111366780640253,154.27545354895867,95.54659114847188,26.335398857983275,2.40384521800301,5.596608899341918,151.20232255693813,50.106405849464224,50.746328784434056,26.53132617658349,91.94422616319432,4.45026979782803,2875.8130943154874,1179.5854993773078,1.9833403128456228,3.8362969994946834,9.833397665844807,111.17913268590331,17.754518222420486,105.88777841453843,1.7720782543205724,2.123912974258553,6.325836682546914,9.189062595515459,2.639887389682542,21.809845695944112,3.7235470713031376,229.64665595167173,2.5966171378311307,6.891387909368532,1.5980019087291417,159.77003449188368,26.203241439819756,0.19077109499005476,195.867443891693,4.408332263960172,1.3416051244101834,36.82345826486269,54.26119316330427,73.37733441484403,297.6160206837167,408.18126703776403,27.243974284071186,58.569835167409614,85.97218086235297,46.61874440467801,134.32052270534754,102.384877043078,8.342991164988256,3.0314018222608574,3.559279633971121,1.4882584135988741e6,40.973044350329886,237.66888485234952,49.1863537922047,7.137064079277855,15.471796777378986,9.749605987629474,264.32507400330735,6.157747675789084,1.3134557762799655,26.076120145033222,19.996124921287322,9.875307463865598,146.2488422242969,2164.658804487803,0.5038498585670033,8.260275783924714,163.21622338843704,58.75085708107823,26.789995767689167,6.0494404268601185,6.46836889498543,8.211837299665294,143.4124750149753,8.760980804823081,6.812353667286217,0.47196232133186883,14.48859408139187,7.59877486178281,3.0942350902114155,4.136804827199115,95.72784467024407,85.86983372196919,11.677065790956402,9.147095755800907,86.69647351782808,25131.696531461082,7.236967370799404,23.049378381170865,4.673219680344388,39.80947147917681,8.224502797998259,168.8053906972794,4.077164851293722,8.466697650160109,448.5948751259197,13.408310068862207,58.46235464435331,3.5249132733470976,269.08868355250746,1742.329149567002,1965.1651296807163,12.181764246442114,4.5490135122666135,24.066651879801896,2.2660154861793593,164.45567470478036,2102.265795418194,85110.3626228075,31.62315073421533,12.773012224665786,4.929955099569641,2.2543292117272387,746.5188040975303,0.8099799205953551,202.37573148320106,48.9936068442165,1.4716849976387527,1.2589672592017254,4.1522250969353,8.92230847757824,4.967881628262731,10.553478097847101,5.584635826692738,9.150564094889656,4.073303134613823,32.472434301880035,10847.657039029,2248.339812357499,217.52467842435937,40.58344359491334,48.92370925390105,69.03268339249898,1.8347667185327816,5.721683572999833,22.027528766980865,470.38807222659034,4820.762714225172,117.19713434869115,38.80560890901629,13.08205422544395,0.8631303570960864,2377.0248688948463,0.46244545839127404,49.64724645886502,21.885258062187305,9.903401357146477,1.5410655131998319,0.39452837635553295,111.54949742319491,0.8283192742560819,157.6259681372496,72.86819790510692,44824.69248668438,6.951031377223865,270.3033606796912,6.149134461648293,83.01729330741736,43.99197934641743,3.7482858699338317,6.406327174827339,289.15936572314644,5.827909830629853,12.18361688909713,192.3776774846801,17.040927383934932,40.706830898872724,1676.055343652581,2.674480844819441,12.7280768054969,7.560482307841006,10.036357419979145,4.237961190838797,1264.02014316273,17.055868458479456,19594.291993908064,2.32989151065295,13.166326576373415,7.212078439065457,2.137685513263478,4.066095317329477,11.760080375887666,315556.8005203239,5.444964192495444,1.3766742770320548,36.403486501599744,41.97246900429726,16.897780386173793,335.7702756937959,132.6545277233036,20.48094545325467,11.032043684055965,1.4326490337318833,23.00672003463227,25.898715420444297,1.2589136469008184,3182.174633317346,34.524332325957786,34.034208671153614,10.519324718810681,6.732787289686154,80.4355124150521,8.140486765504477,61.90530140619316,18.63789577604164,48.239838645913004,1.1422275824362111,111.57688256182256,35.25319593639204,11.5886176530322,21.458074024600272,3.634583084352513,48.87910493883805,25.287102568676506,2.4788808657713766,14.203485997239595,3.3470004219931395,398.5792234075792,410.8798133430381,7.323646596506105,591.55993235229,225.48201612204085,12.215425423537132,2040.790104135145,347.77675182279893,37205.139431752934,3738.4997748167125,8.914504491821841,4.326631003391707,14.26378591675717,284.8578128099085,48.8036229114529,94878.67987436964,30717.810538884954,301.3648402522537,15.457632142236047,60.89680095298532,27.477624896936785,18.628668503341952,129.6127791179611,817.7974826977799,103.48153235109295,189.34159748074535,3833.669952894165,22.366130309875278,29.513454161553014,4.522334136488128,5.509575644393807,11.256263990371991,94.55159380972087,3.682091985150282,529.9954309895339,24.064917251095416,690.1505780605828,7.635287459962539,9.654488046145552,2262.2386510820966,9445.482700309141,38.10544898451653,41.00094836209002,251.34781092267815,3.279306970266413,4.883502632577367,4.422356383617089,4.018737443094436,20.003892229196143,62.04818104297124,316.5599102266748,5.196693654454741,2.3363117480189626,9.8910196671596,140.809549185177,2.9102293819409137,6.226331122815167,32.48666416154338,35.95711106912929,4.220467859550423,34.128196334633714,4.73638939886656,10.512314722081552,88.34155130039952,7.106724962014166,42.25416238114853,660.1561817860784,1166.6410321079106,9848.30614279656,417.9375869826825,101.62468907717674,28.644200459842043,11.544931683062963,18.104687291868363,104.17876483298716,21.429418521317185,32.97297593911391,6.554947160877199,4.168873127918552,843.3978314335727,5.011987882893462,21.549012790780157,3.186730391455825,16.398245658283997,86.54332467381451,2640.9799864137403,0.5019570506384055,2.2148594426439105,14.11853206531069,3.7216377030273,313.3641670119297,87.44488500953906,714.7789864981709,5.742681980243525,95.2858358146976,26.165172078422856,16.47514465762081,8.248368234803907,6.947762326954869,1.5209137272682614,19.815405031264394,24.064617215351387,32.331621299177584,17.81309214682263,6.620731220621988,188.26390393169652,6.658486231721215,12.182087852966344,22.17427975675571,29.5587230896117,8.346263648228568,3.168898704686688,0.9459416041414972,8.312332805192902,5.257508111413058,4.832549041881376,20.060966238721786,9.263656568291047,4.914304671121711,3.1587853345368146,8.352890860223866,77.19929515162094,80.24332100657762,18.09556569247472,31.465780534362363,17.36644000378581,3.4999258081676405,3.0685357257292667,150.70442554502472,3.6200873612742646,7.135937316879458,145.00764914996046,16.94395264013411,6.9886403766924765,5.744226566788113,44.486099078148975,7.100228204655758,12188.304428038193,324.91567450690167,95.05117592679491,669.8516123020978,45.20012030294829,41.461276235637335,17.018209849329732,21.19910298862642,11.63030342258768,75.32255964641612,407.5771664163274,2.4880636633896684,5.6409544303046975,2464.1423020688035,13.863047451745155,69.75442691178495,8.112626963094474,51.55781225488611,104.93709802260919,3.6618085173933035,14.08326703311651,349.37298801049053,4.6882465254630725,201.15131317126603,58.03636527735488,22.286039074781772,1.403268517366718,35.73289358730098,2.0361602451791314,14.031377955314895,525618.3755036859,25.021388061056214,443.87661224651544,25.412177463749725,6.858178149337308,1.7020555399040727,82.48063231288774,9.890735497437237,1.3739635882116423,48.191023686263264,8.409204906898724,7.98905922844231,38.610218072749696,2.9329579266417825,81.79853114728984,1779.1516652754767,9.229333484319811,40.996752181880446,4373.531623269459,24.789380332735313,13.972327070269548,33.68642433903463,3.597028770652625,65.1713639855087,883.7905558775291,9.115135587889505,5.798309786403422,72.75302004587688,10.398166501277352,23.215413506317265,13.23701587615347,12.905381209770383,20.18620920285954,12.539811963289631,55.9328893533094,53.71432561268794,10.721148305061218,1.0307168831169486,48.41751667462273,5.727807224874917,9.825628127277195,32.17540908931499,9.76683485020058,119.02169151691913,115.40228318542067,3.1145833910956062,7.292696611380139,3.714440374112084,27.009029374849725,25.63811381889951,4.3264653801269635,14.207616369925045,31.010787407703383,1509.2428058539906,4.9851891903913135,4.572530077823014,30.427735107003205,39.34656908156147,249.36182497635556,7.092792241510902,4.265708537205065,4.405959664380635,7.516110098605406,8.443385927790644,75.76129683405786,0.7762384120665479,3.389245632280711,777.2137228686014,6.14002795625425,24.25974590716967,14.885337128468995,33.195683755990885,10.963675395568727,3.630044082340933,2.2221827176057065,13.162284354679558,8816.507233992212,19.17491424167261,89.34260921728176,8.78543940145066,1.8195119921655716,31.08413574980168,34.81490186063614,98.30842946033977,5.356531768435252,19.30137620886393,108.75316477396132,4.013798265178073,6.355833430905999,5.626547345179397,5.982242029292544,264.48319180918054,8.127691371403923,60.09093042741394,2.0093768424289467,20.032360858714508,9.449540937116835,50.73098883625847,1017.9909903559235,68.37513486401447,1.4917368251386771,43.300230888352125,8.529311331873215,17476.974798108746,4.163205105058062,406.6927675130273,108.21702046664255,1609.7708383041393,8.840497479381098,29.239365062869968,64.17539643438798,15.18096582094902,140.25941540154366,40.08695187433539,160.41294908097964,2084.882474892973,2.974813562542371,27580.958672585082,4.230428907967651,5.803178889345023,7.324191561347263,56.218269668113265,59.7526691503266,12.097313187978008,97.65508496387662,10.026176971568137,25.605371307959288,239.68830955949397,58.933880315309686,435.99303940708916,666.2938657692024,142.1883995347195,8.230542304035659,0.5459527072082245,8.775495487163063,6.427423586830826,229.19963934272573,768.6998956106838,1.4040979488943262],"c":[2.9415163059627814,9.13544658126261,19.69295255026566,1.1940142635159745,12.215202839557735,10.502769699422352,9.55328936178085,15.977153669951324,13.728783844105056,7.487269334295781,15.871704575347207,12.772510818385028,16.194837823476366,19.92110775489971,15.638711770582088,14.455346122854333,9.928186816605894,9.936238510587984,12.199582693227264,11.696954288143345,0.8755706904057936,13.31726108590658,16.807192815038597,6.018677137802184,6.8822265717667985,7.201928532031352,5.769313647627881,11.732606227369086,17.221456224224312,1.8552647050427185,13.118449174943834,6.013612103096357,14.64850690336425,6.3510929420381546,17.389601262873484,7.242321190107344,14.156624989775658,1.9850949582250133,11.814147606717903,6.537406647817896,0.9218465878887061,5.650851422758336,6.624009589237367,7.105344849089645,3.840394405421761,8.804243050039403,1.5871181221778086,3.781723232029033,15.534752411280488,7.07043592481861,2.0555222559108888,3.6546774934226045,4.449912537877845,14.704869773556961,7.361925624748777,0.7694817137324828,17.99963466509055,12.825287276733,15.15392475944632,7.980789441091742,4.3082114477352595,14.499727431169763,12.137542920844915,18.719560557670682,0.3866480975776687,19.699893541847416,1.2163804701132541,6.963242186050671,18.875318917372248,14.252506428190044,15.991129412609117,19.12090148730625,4.994395507085501,12.091044664691077,10.343771067194222,16.950268211776795,18.290049468976445,0.5951575960328537,7.407430525996288,18.080684978248122,16.367020911175857,10.167639282258602,10.858659270449786,7.449100559227326,18.088902276341095,1.2185015144193656,0.30683677666931697,17.391068097340234,10.34998669426965,12.81048263229723,18.423024604405907,0.12807242412078867,6.508995516468592,18.09950338080222,3.958259590165052,9.600532803486965,14.234201505835271,9.02280753013413,7.457139581401115,15.391576252801942,0.6797146022138811,2.1908764479415055,3.2227996029909223,9.978160080048731,12.436192270899369,14.158311941251075,8.486326411411046,4.374437957501285,15.215320547637972,5.757427539306992,4.173942997167446,4.424351119599583,1.8226017496212865,9.341616378845714,3.8129128347363395,13.480270937192543,14.49735195503627,16.39822665789719,6.166984966904181,13.166916337761956,7.4099932189754325,9.341894900236136,18.09332304012844,13.651926215929704,19.6946548843085,8.663489003307658,3.2732598403666557,7.678536564180614,14.758261994983254,17.086820024909844,4.901256836310317,6.378188631872028,12.799860787063215,16.305625517537194,7.551814459137471,18.240099847147732,14.843451965011356,8.201320814634187,18.03395609946826,5.8957621177222785,11.684515356075629,17.307497978886552,12.742151923181035,4.324526314152548,13.664266036701376,8.8703727736248,4.230726232587698,14.194120313175214,2.9939059595143735,9.391349901055236,16.7874518072195,13.859361908209316,8.031401081075726,3.4996395022895,2.8443720528039007,6.547184939468016,15.82114299904815,11.283678313205666,1.273337667366512,12.215167388854638,3.2131108367457406,12.753000066319085,12.371450359383935,16.108283796490145,17.556716014271487,1.4516032497010656,3.882159489568253,16.955162644417147,13.789234791110498,6.198512193978747,10.915169709251451,5.092125363409505,2.136063806722537,4.903473085260148,13.235644047541841,15.472666196973961,17.17463275884984,6.071451123240692,14.304772947477321,8.842689897411535,15.266801878860928,17.09053400533478,16.10207753164036,7.072573250191048,6.997264178924021,3.863418105115768,14.388032382468086,14.59785308752966,2.303024348160694,2.2868290206463016,19.39284364999232,5.481815249101314,5.334841212048205,7.201575921375425,18.060351209799087,2.979631299913126,18.87743549406182,9.37315735691044,16.84342235195591,6.711008857052647,4.945773481758016,6.613893710042316,13.992165533035003,6.195958267543369,4.890496675243914,16.121609886382686,13.706596124002148,5.224965432679287,14.859382154139787,11.43681320055476,12.779987209974731,4.886685596057503,1.930068822631914,8.689672248476272,7.145179320737616,13.34886155407422,1.3951547660509522,0.13637278202605074,0.34582227514487585,6.850197482928917,0.8654613441043857,15.221525247319526,2.0017699973478287,18.419367727843227,12.330764198588033,13.694979992093991,9.079991781994972,1.3284993540707468,0.8764382179449015,13.048390826070513,16.988388850584094,18.564315422329997,5.470764540512669,7.753623542745176,9.738372126747814,18.633914946850783,11.810752108477637,18.580749327897333,16.947613217171643,1.8239431979985632,13.694569769145662,14.723551025017315,13.645274286889709,16.37229106704045,0.060727374165212566,17.864018518238915,15.21724354838264,10.944190832136265,9.438495595346744,4.217896127877938,17.61335594428251,12.253109536863033,3.5882306808891773,19.44979387274796,4.164449603294353,7.4485396266970305,9.995596805692157,3.442604857625944,17.25987300503135,0.21760066631016262,2.245850621472263,5.9902614413169,2.291314550094632,14.162558074910287,0.34729453733354454,2.103256021682074,16.30932915513675,2.1425301122596707,14.699610667162236,5.068261561013259,18.895105628154397,11.111573320979806,10.814396664091998,1.3701638093594637,15.350977032341708,16.889760135015223,15.97161221481604,9.07425583593525,10.752251215795475,2.3073947929034233,12.614239153985594,7.72934563685725,18.143605253620034,0.05371026583487204,2.6463842303095664,17.045276931353364,10.640486652723556,12.3772186616495,11.657777491072792,18.35257068426567,18.86435560232949,13.706722092689777,3.55906555451337,16.082365834018503,1.7815244788862605,19.519361564776446,6.038112110521099,0.8340684229134565,1.9117586161937217,0.9117770509795742,5.7601975526750415,18.496525608480052,16.019382665134906,9.667306996315222,0.7466228941052133,7.982549047733412,8.364483189930025,12.663058590604294,4.390630893470204,7.390980068029909,1.2664706634370004,16.98248778340531,10.279229013431443,6.658749809640692,0.8514892775352711,6.761483066889062,7.599617402933405,10.205024263378434,0.7882580202960998,12.380027776888657,17.83054696989387,7.30248702983034,14.421201869854187,8.036600747541911,8.944124792487461,7.808191078663995,13.815584082372379,10.71410911852967,2.06839145464329,14.750823176309957,10.06904812181968,19.620917519879608,1.1156201808895405,13.025648146666162,19.14855732562991,17.028251393893285,19.53252430583322,4.391787865561225,14.762987422109788,1.3381388278931006,14.079455431391361,12.055691072761574,2.9868632953949303,1.315708396948545,6.874333523389584,12.171218182538617,11.573390357692471,11.23352380379536,16.68993668543026,11.811523753500888,18.752732893316903,9.782397777216389,8.814114051213519,9.27217744756093,11.853939123507669,8.180477594987217,1.1814501020924606,1.9206539471615258,2.271698369101709,11.192001577944456,1.8746909936910594,1.5741640898738574,5.918739809361835,5.960550197047518,14.83979614381533,4.0159066820227585,7.4879349444946275,4.789785511816498,1.253923444147036,12.452348582927746,6.28528909451159,14.237317928930167,1.4394815354701462,13.844425237211414,18.807840395455642,15.018906475829121,8.68632023440448,3.261282280466813,14.856688411186077,5.3471972637786225,9.675820241414975,13.925018013321498,9.546056338382897,5.106088224962044,1.0738333027427904,8.689392465240843,1.8747944377736703,15.268701259697055,16.31389437369942,16.80785062970557,8.200267538319608,14.809297214209103,19.66911437531609,10.262515161878767,12.462332230151429,17.308239525662998,1.7368258121391689,15.583262997980869,6.151929412867738,12.10728217322595,15.480243768870686,12.587912187502294,6.551720147167459,9.7720065511347,4.188756260971096,18.30914680625877,19.76187554138553,4.068876125179446,13.995584767191115,6.602460516238131,8.946785005341278,1.265307705312293,13.56234797844908,11.488595283602772,0.9332708116764099,19.41733095834475,8.43190422707373,12.163591585764255,3.976555695331667,7.30684038997897,1.1155753478403652,2.9613943662648534,15.74485173972314,18.04272634685464,17.072041991989156,9.18835418940052,18.72579767544721,17.352923279106793,13.121971902648003,7.925245157372478,1.3108529084148834,8.21804557818226,19.433510545493387,19.044915069954897,3.62465451892767,17.861372533381804,8.191369281210488,6.626718097491997,4.706890328073854,4.427553748846189,2.5229621475896513,8.823578027107871,8.235047939722545,16.64525294748703,16.580877221009345,12.431251887255556,1.9931492783147986,17.981342122198075,3.756958035167348,15.828234874145206,3.342116403857074,7.517046391281674,16.84841979543036,2.6510986357796895,2.090493317016282,4.699612828592565,10.423032553741036,17.915845712542886,6.72787100016242,4.598088973585606,18.884337333251167,4.3780793955558694,5.8170139613819805,2.494667320236732,1.7566045605935443,11.723906513349558,5.204469790211319,18.13709826612703,6.286382500204275,7.318901966723983,11.717198094982223,9.543436107702616,10.09142432078741,9.988543014988513,7.400154313914635,0.8800704811646298,5.11387895089912,4.199781616931002,10.93847929440825,9.497537116430701,1.790641771896988,8.86825930396537,18.242179227207806,4.420108556793956,9.792448164141954,18.405370288115726,12.88955388639257,16.353381478282962,10.256531569289304,13.788829967016296,1.4630529846202567,4.380516980320315,0.5849243157267203,18.323975077472365,14.22958208764285,18.5737501563109,5.19954738827102,0.5206241441501724,9.942886186412117,19.616443302737284,5.8302914085592406,15.025159429203878,1.6719665563471109,18.296622494058717,1.4945726726389852,16.778881729463976,2.8217329451980167,13.325876905680548,2.5536482747136224,0.11365721151617159,16.584088996510143,5.175465211391872,1.3792316243832525,18.189582709976875,13.37434213243605,13.935122115764722,19.681486711196623,4.298439731628654,19.68422680756627,9.442072330188038,14.43857995877233,12.194921820460515,18.36302971696243,6.895058549274986,8.105753047975366,2.493927495178161,11.166758021379266,5.030822755944673,8.711974760897325,1.3121866152815276,9.896566708996147,16.235796886477605,7.699160784373715,5.47814021233231,11.246017512226839,5.175152396271532,1.229823082929724,13.606247521050022,11.808916236134163,15.913637026485974,19.97368712604731,16.263568148688428,0.1411032568235404,7.4119635615081725,19.730577186343822,8.181469080482234,12.35844506018259,13.077634494792662,10.683165171607602,16.979308952819512,9.685299108541425,17.169198447055834,10.16437157590801,1.508546648707978,10.991984553797295,9.451926959155665,1.3709382246744406,6.065964880394716,9.370497683247244,9.915303532055662,16.199146594302604,6.522617069431762,3.1657264493988313,7.713673214278218,15.045288273733037,12.588748109741047,6.531991826989421,13.54289903057104,1.6911158140868432,19.756074221813286,16.52741667557621,13.697923403531309,18.76189242851925,15.641886640951167,19.95145708827467,8.503280074980829,19.74882729726005,10.51208881315437,16.749228716263108,13.021455060186229,2.2231549898321656,19.181270022593246,4.083771149532116,18.622541712406935,15.628010585261984,12.804224767245064,7.5708203395536255,15.749915188005215,2.3533868459018104,2.8698650086754407,0.7906906155449311,0.3645999866206173,5.75547124790925,1.7023725595415184,13.015411772107095,0.4044918457563629,0.7781481171551174,10.831864285304015,2.5705069796092284,10.048101032201501,13.68178771740443,9.64704759226012,10.853213285788446,6.105062275619608,10.085424648019753,19.716347379071642,2.7582201563006103,9.554605406899647,12.04190345293188,9.154044829158753,2.09740594505905,14.209060778679671,17.025982924197372,15.878993496315804,12.845896552723573,11.864482123644112,7.611093911497577,9.591546912862308,0.3455253842882966,13.598229449406546,0.0255117659941817,9.357251470953232,9.973413316936956,2.238851956111958,4.431707585404623,0.2854678780872755,4.246206890956987,1.8393840576568987,6.422924480080945,11.11048262025793,16.079178134994116,15.185885020704738,7.79077145884262,7.273873075301487,8.661891658309866,4.70362180986613,3.9157413727083368,0.7097315231888679,16.14303520459662,13.455197467006528,8.715475168742595,16.740729799656826,13.009345602620828,7.0036880319862105,12.088024277161743,1.718647978461667,2.6479583777119498,19.791655054218324,17.407553619553262,2.938153827493206,14.101102229549793,8.623341002357567,9.892075642004276,1.5986921859864411,18.09195272516955,10.192460857829225,5.158053860835277,4.865683908982805,11.769687135594813,17.159064679198565,6.74591708797752,4.742998802917331,8.648347030322888,10.829648526361296,16.5327335184817,17.1445703539204,19.10793509968032,3.8056519442638015,5.814647017566328,2.20414052171781,5.120976073460848,18.1967404393627,6.95091715039299,16.625838542937473,15.414846108310236,14.847523883876438,2.889735561994722,0.8692420465099815,19.29903796842971,2.8054484526028434,5.809558374812038,16.237835165509964,13.037736996696697,3.1836997350967655,12.28459461891168,9.121772125119477,9.658009819299682,18.288877814166685,8.31816075527058,9.22949595796232,14.57579145388815,6.254425794116241,7.594252911154049,4.334762464867414,17.64643852921248,19.355164159031194,2.8522081780177233,9.20308572227058,13.371028137327073,1.0338904514221792,14.360773454349234,15.382420456195565,13.469922427795872,10.401342658751297,5.872481224310242,16.027196820146578,15.671819805619908,18.44545950689551,12.734375429684647,19.34387898980507,13.186007961021836,5.683077428529728,8.699771950725808,2.166516323195564,13.507574766662769,3.1487081917397486,14.933580510375833,12.33444949805567,7.837153723072627,7.895698928781316,18.001795104829476,6.9027279606913705,9.625352070338181,1.894431215557142,6.286794122242401,16.522312629656142,16.665506307573462,16.081356172897202,18.31045677469791,11.860262009406263,4.026582888879537,5.510535696010641,6.883432769235296,2.153953572849736,10.456026890433225,9.937059745287687,14.557204934634074,15.634503503624689,3.0212022370086222,6.256215330903823,8.544655945875101,4.558111115701764,19.399653145734316,15.886335157758257,14.677311740200448,4.897467086782168,2.7300908574190252,15.67034550149003,13.064236115125944,4.94005985551643,3.8489773809606076,12.30057905218905,12.854173803355774,6.645721926697226,12.640199952580984,6.5648819325596985,11.056214414150812,7.690759467674186,6.682504615703362,19.124515923010375,17.364179532426036,11.511169816291558,12.320917546312383,18.829318739204,17.36557714664576,14.173794146584466,14.067243970459451,13.737870950068757,16.532912476090242,16.754002968265503,8.920676164607846,12.18442653456584,2.018831147637803,11.740178131949225,6.78773673022425,13.57019350525742,4.247325261776882,2.437534141542179,18.166574538906623,17.16349486214753,0.6399532146904097,10.155989944719979,7.04835882263803,0.17759100839874975,17.73292662977489,4.1494695487327204,12.04043792034366,19.965983600682335,18.177065025167593,14.575600015296427,5.338638337803583,1.9960266538322013,9.45827046168645,0.8387010787329308,16.742893075342103,1.2684806814309901,6.20375006644899,15.230517551767395,17.546451518533903,11.192049827467212,16.485894396160695,11.684187951634982,14.815005074859604,10.796190970394854,15.945365283834105,4.230049266375326,1.8876790583482794,13.014933949551768,18.072842532963644,4.176841830265996,16.327516651385228,14.85176599034757,1.9684054902387738,2.2678331005866736,12.829879045812888,15.282532218286216,10.92930675488548,17.60038086570752,12.08194098783197,9.932484330628565,5.064218562712344,0.9405973328508876,5.443036753035657,3.5986443756714603,10.99203664954937,16.327833934764698,6.032028812960886,11.747612948216979,3.859139549430788,3.8516472130072765,2.9589124115002274,13.37256080494344,13.762395074304749,14.103598113977927,12.68272407250402,14.147327892396152,5.159833727932397,13.623082422805988,16.97725810450717,15.336059843022646,15.868183772581293,18.57501104690447,7.499318406941589,1.4965864810203078,17.620846316461428,3.978275871002026,6.399685714413739,7.801390581288703,19.398371932617803,14.772084647032631,8.433028895844767,19.48120893670388,10.851404640771914,4.081438875703656,6.6280353791444835,7.866319281478105,5.152104880311632,0.1436722742430918,15.077356516469361,2.35552456077341,3.3013053953617133,14.943362934563972,4.354648354282982,4.6642420142152075,14.807205487135104,10.33611120618708,3.594166629667739,4.35143690773331,9.271436616077757,2.8084182127303325,16.49422802860144,19.043653318529124,19.600560492170942,10.287554994708659,6.638154114160444,11.757975258991543,5.705150092585045,4.25200416310533,15.654282053323755,14.66391527156842,8.90913354695272,7.126572674160077,12.852742773412075,3.839872115037548,7.772847904768199,9.770710966081978,12.002018045785817,1.274163064759275,18.01175913811941,2.462641416785263,13.239853890612046,15.975703816915798,17.985565427988462,12.233013532784685,16.400364630388246,11.440358968067583,14.01775969574938,4.611873471465038,0.1336996469628371,19.288355440124924,13.007452989512341,14.826809583990524,0.9870901072422411,10.473000390885087,6.4230850447070065,13.222598395301262,4.533639862307242,17.278465217091895,8.702315063820585,7.341339863480503,5.254245719216546,6.233446290260933,7.534373944607551,7.506835406032337,16.438935591479517,8.791824984084196,9.808700527312695,12.709461925745412,7.93099863340792,16.068778507099562,13.435043141070619,0.37459602529279046,12.057791255811203,13.795613339758255,16.12693340053863,3.56075298058387,0.03471896182837941,4.31977730033132,6.29653144127758,18.153184942788585,7.861771463537375,17.78775188311617,4.36029547768682,5.878350286191787,14.756009597154804,1.9684734310766405,14.083464547079414,15.688699500131316,14.007646861347126,19.471825116520396,12.396880733595328,6.495568341145801,9.278943730964544,5.300237303872137,17.054708504481223,11.484191714216383,5.20512152350562,18.21527770395881,12.623539433646233,3.410904792737459,4.915607040642196,9.854061806940964,5.366434769708905,17.714822839047024,10.971656940261507,1.0894718554631178,19.90597491304541,18.555493582811128,1.389755511318671,2.4833837319500685,15.059180060854587,4.466499013188079,3.2812860254697807,10.117635419168902,16.690448397878313,9.075917641513174,15.768830358291215,13.576816491317931,15.619417746471074,12.996223004388954,15.950306573427216,11.333789780187814,19.65110613412697,3.6185357096504944,8.123351417867353,17.924877597851044,17.535835669379054,11.674795241147052,3.496805855467695,14.604290824766482,12.45418173243074,8.969814326797337,19.225870954522396,14.496804163474568,18.825525809264576,15.832580944741874,17.84310927342467,18.068591390975843,8.211792804833141,12.722651534596219,15.34974860900466,14.848441779202135,17.695437782646056,1.194161038655066,1.7724914376504808,5.398257035332992,16.729253992187868,8.919820584302428,17.016197442473896,0.9752851627253722],"p":[0.04275528144130947,0.959224605060983,0.17374586605669107,0.6827051660202779,0.9844337169192301,0.2867205440570806,0.43693053122485925,0.5062623172398768,0.23340154977653516,0.6360240339351166,0.0927619882025652,0.7466160366208403,0.4387548330261659,0.7993513318694543,0.661417176246254,0.8788742582762092,0.9937455554814232,0.09154995330119542,0.0861541123775027,0.20877178014280884,0.1847695453915812,0.658398144456994,0.42939269043300343,0.09819300009150567,0.2995109814433061,0.701732342705111,0.012889292408596376,0.033161855274535856,0.320489723935762,0.7714964854348862,0.0705893390391854,0.7676731317742358,0.8955991750555368,0.7668551770559695,0.3861728097726307,0.9336118650765199,0.9931047068093193,0.9840100934660532,0.2155443960658212,0.09674870313358519,0.19941653192261222,0.6714259946716672,0.0875254760530777,0.5005835851445692,0.9981187346770346,0.6200508946591115,0.9825473712747741,0.32097280548373286,0.8781281350868135,0.6067254556138455,0.7632688946486799,0.3872721102587924,0.4350004478438598,0.41010456574086085,0.45667790300938527,0.18872408884803993,0.923079279642723,0.9782579998472742,0.13236148015007787,0.40092936504318555,0.8913931283861498,0.4351325722829775,0.3684540534152989,0.3592801832832506,0.4378111479575253,0.7790085000553715,0.2969849736493022,0.009121853702809934,0.3731098943860873,0.4605426917933719,0.16994220415486416,0.2663918990090117,0.4571919491056793,0.7541010054083679,0.531370963940051,0.5165894644652869,0.15840146510106257,0.8534902350913403,0.2252917602272666,0.20462427437417952,0.15856872666979016,0.24334158972598607,0.23309530175174298,0.03486991332471878,0.044936616498276516,0.2948124139805859,0.34487953239785774,0.4439158364675262,0.6441616950176985,0.7759038535183189,0.047889223430545025,0.8766294033934203,0.8595229479198516,0.590446570200297,0.02082910315247455,0.056006254580088344,0.2931639180449046,0.9884379226935489,0.10442881533241599,0.3093975872556436,0.884592206881812,0.8239457471297835,0.9763009277064647,0.1031677014095096,0.3830629907819201,0.10913603001546379,0.3442137449744338,0.8385081253817046,0.6195946992534158,0.045709657591693764,0.8930597933605693,0.37738716930489624,0.9570108225431357,0.31151960599912853,0.6502206390729262,0.20411097097597564,0.24794405622874693,0.2835349227591406,0.48244162158375925,0.6131779687806025,0.7789915298088372,0.30016697284109206,0.7388500472738648,0.7197457967190934,0.8884644829172712,0.5855290235997355,0.8846690072684225,0.5734189244996188,0.9383199804695044,0.7239290187040133,0.7216226390492042,0.356865138866131,0.6955328411905202,0.27231683539532336,0.8624277863717578,0.5443199499002598,0.42762619756926856,0.5578422137545043,0.7792012246023372,0.24042060598270365,0.014921366567940852,0.21447857694250927,0.4554110503930564,0.5336974189310191,0.9099607683375293,0.09570266356060575,0.8347599634977392,0.38002964724657917,0.19895854698938842,0.4249546968340112,0.3547091073149926,0.5377196827336805,0.3443843667127733,0.8795070211831302,0.2362466501828253,0.3390155023548338,0.451027990938879,0.3295205917997148,0.811193104962231,0.19203691881445617,0.779212485603729,0.17923602592903287,0.8106107608158843,0.871991287071046,0.2712426682244282,0.92011634476757,0.2483310670711607,0.2040095128524917,0.43490013515114545,0.0074371666198163044,0.9010863096035122,0.51681010313619,0.7770689524721013,0.8067790972249431,0.4391515983001837,0.6918605171126673,0.41321765090427487,0.7398845840874644,0.5007825026662829,0.3480452676945047,0.8106621317349736,0.7003569619102852,0.6551863138330853,0.4017295551398907,0.25868087927659267,0.7423961543311179,0.05907414353800022,0.6845352336492623,0.8348615461085072,0.34804168099699573,0.8583170087200493,0.3213306182246438,0.11188337934501758,0.03784801385905601,0.28774060202193774,0.2413779040683104,0.5608833461442915,0.3873022051768402,0.2058668005908102,0.42918132145225485,0.6329388760215815,0.5300559656060209,0.5508132944173314,0.15575926083599034,0.7545505948958813,0.7591717344432165,0.5862381244290891,0.7986250963235562,0.2550562812001489,0.9771595361491388,0.5799107179206984,0.8805145857205154,0.17366579536236548,0.8436848450033361,0.06944061639139809,0.8064097184068082,0.3352593836691675,0.8919477200159556,0.37067028414440384,0.049350924967362486,0.37085716514510825,0.11328485722292325,0.521645706400351,0.36615053816505383,0.15387739629368236,0.2568393687713859,0.3173339454697053,0.3820510632736709,0.7362893844371101,0.5567467142111338,0.7154886508804821,0.756637849695847,0.10518676086970236,0.1316005314699209,0.9689011096301992,0.28108866808834043,0.6483638566529963,0.7701669065847712,0.5531017055196759,0.7870977906274235,0.8210388868952261,0.44300236193487197,0.8929634832278908,0.328018313585863,0.9660317967511871,0.510316194893911,0.7398631896985506,0.5233394251321839,0.059425234538359684,0.3333358496658534,0.503869935387316,0.09043083765956816,0.4744277545464397,0.9300378662789923,0.6579665407595068,0.8803104743184145,0.29128770466276044,0.9333988020523662,0.17288495553580785,0.6128568663689951,0.14471015850842806,0.9955828669577029,0.16914055454141685,0.45025214500600597,0.6738044713541322,0.7090438384453053,0.7159678418673749,0.26506647413000595,0.29388413163792015,0.6486424653014358,0.7702756418199275,0.11168395336972137,0.9918947479244391,0.18302996694569584,0.30344754452644396,0.5854065624919567,0.6101205234000633,0.8239120949674457,0.6421050300582833,0.6998538570994897,0.2062681442276022,0.952298637595359,0.5023547526067098,0.8234117456803343,0.7863690093049038,0.3966872911286521,0.6033776026753419,0.25134113374453526,0.582405291945066,0.7846623449319579,0.1354137278948595,0.1891517017024822,0.2802426453420026,0.017332808799504607,0.4653643764439692,0.738964470003421,0.36206593458449876,0.24241348766728987,0.446338329617884,0.7160872557730826,0.6724948574447696,0.4628376073156606,0.7833331694952463,0.5869839047182401,0.9825949515849288,0.5456710652657524,0.48486591614518293,0.7146596558608276,0.9590094260332764,0.19781847721878076,0.037013193040207115,0.8565247806403298,0.6992216976766805,0.1226033890740541,0.19050445400987304,0.8662824282928849,0.6856735057019705,0.3728656948800819,0.48853425912644965,0.5725116299744162,0.6520799585068868,0.9091988445471593,0.534954545157255,0.10138369851648621,0.013447181214099713,0.2191740600939167,0.06551365359855921,0.8183109045916768,0.7294586845799755,0.155665085580323,0.0569615096313445,0.6142124162294293,0.726425759749536,0.24972623143545358,0.5845308208488866,0.6013631287646273,0.2481465112189878,0.7209150438268479,0.8864043492673277,0.6269152786730565,0.32543383887008015,0.7827239940708348,0.28050364413369255,0.03454903219611394,0.04176323348383426,0.2694282193993147,0.9354536272052676,0.2085971184744122,0.9186227710758175,0.7178750087794898,0.6470856057483543,0.6821655466975896,0.7236673245289627,0.45844349962597897,0.3028804413311379,0.28115779614438163,0.5596632166364268,0.5575715176768432,0.7815878533388685,0.16408256317682346,0.7226535140017998,0.9690378339421608,0.6066571646487149,0.9965569123369435,0.21803070234429645,0.7703109912939308,0.9688845831462158,0.8409422464798408,0.36787051147109895,0.593527023497679,0.5551155891428718,0.8739024248442055,0.07244264972181513,0.15123864318279878,0.8824836619250318,0.18496974962083312,0.20117038064568615,0.27453427835859,0.42925710130261674,0.5890806134700601,0.29539241857125265,0.14866394434990182,0.8263266787110601,0.3846023311793838,0.07927443279865498,0.44994427539198445,0.9283421948565738,0.934960452765571,0.12133664691422696,0.10683785685788805,0.0729892662017928,0.07304750916489833,0.17782598677098682,0.17474626161769602,0.14318967791688908,0.2628109623115633,0.7893126537170885,0.7762411625337702,0.746250854386302,0.9683665103847174,0.9509609614165957,0.6987148244780026,0.23929086890819518,0.07145944421212946,0.7535012213496888,0.7557964651278088,0.08045375101339114,0.6496338632472975,0.4358697611387057,0.8027573317558039,0.7928503935357647,0.16608330128407633,0.9164712659148164,0.1063155854474056,0.09646282508120518,0.16742368495034166,0.07972874489551462,0.7254521958618265,0.5435668864737122,0.9396904705185773,0.027863108375199896,0.9245520912613168,0.7469154110335154,0.6718364227611016,0.4646500052002307,0.1818638421784955,0.9915362359581155,0.17446441718033023,0.6225038360604225,0.43903868250407174,0.6858207250641355,0.8501032069948484,0.28279091360976216,0.2545681499583752,0.7387537988700181,0.5647393995450545,0.2809983631672186,0.8923886356422721,0.9514544491988923,0.12141828140007038,0.7929127222873782,0.15444363400208294,0.8017493639949558,0.1498079974076023,0.09066444628157266,0.31810358141055883,0.3650559440493788,0.9725884537979326,0.9093774013621765,0.691472580461775,0.9221509294339456,0.5271182663569853,0.613840967024333,0.1750712915975774,0.7327256818893182,0.544164030249148,0.8220210810344775,0.9956661207937119,0.9757747923576934,0.19231932048173994,0.12890028311509671,0.4688587235109136,0.788909997704603,0.7281598399526219,0.024626198302299063,0.41344323001465466,0.070293156054829,0.3004870002104023,0.882203186585264,0.9121954504369947,0.8018493710926844,0.8706956907810925,0.6285246700325702,0.8237954734284125,0.15794142520575605,0.08075969874517996,0.6323080248384201,0.868740854230305,0.734209035950744,0.5436025092472871,0.38614381209730975,0.17567974515743812,0.7282896271226842,0.7653698357203849,0.6600984766343587,0.40335752846362016,0.7077213110356804,0.049193636006364505,0.9523767528247677,0.9138828901062401,0.2823619147485461,0.2772067302685599,0.8039498033617927,0.6836341931655796,0.3586010693951245,0.6740656026216969,0.07116047020074467,0.5767292179028307,0.1752744418713823,0.12927845136521676,0.13004409673835227,0.40435143803080664,0.48898239067625915,0.777609469517675,0.35899230391091774,0.10131008502367833,0.06634500841284119,0.7726146347351668,0.7531425165618539,0.1988294772736252,0.7705044260137457,0.25200590543432133,0.1306444523871495,0.4776243470493533,0.6171048335343756,0.6626584351646128,0.7968985047155073,0.9182513222016717,0.39341682745998807,0.6867198973827493,0.6816924695682889,0.6084629029632573,0.7112116056124445,0.7948457993996936,0.3103097086129105,0.28800940402439235,0.04902867051737769,0.9985330332998223,0.6438907200540396,0.9407356622886469,0.653591996312922,0.1248471826219304,0.4724772343202608,0.43628110394481356,0.8363346701761254,0.3450398731659201,0.29723736749219176,0.46342407934522045,0.4417670018370945,0.19517937366794347,0.7108858249128378,0.9309207571760569,0.26427659947029714,0.31671481144215785,0.7274290200897988,0.7085219959660367,0.4900133983391617,0.12459348744847354,0.17844380215199251,0.13479746359192624,0.794269416141673,0.1423799825232004,0.19123362124852283,0.012583313975223165,0.37417857054144466,0.23462061582285187,0.43688883576025894,0.1687043189921582,0.7543398881408383,0.7338675609756291,0.22460314267950188,0.3971452083296352,0.847870388747076,0.9860220824338382,0.13551129707685283,0.458495614146905,0.22807810975579978,0.5579068974628305,0.6353169772579572,0.7321881047893293,0.027263994989837004,0.18830845960652565,0.8378074296294995,0.26611692813864396,0.555898259552148,0.09236047145843562,0.7862344635245748,0.9380707706756493,0.9264365247683948,0.28661171944729236,0.4320301319039528,0.36333758251672155,0.14453489164024091,0.7361145968798577,0.9312767513495872,0.9902137670904372,0.6235351765196666,0.2662057236193993,0.47105894882351795,0.1850652446488139,0.974037058359247,0.29889526708273073,0.8659700228078082,0.8516988237556304,0.00122857472955884,0.42663424694492913,0.6435345770302681,0.2653161901097405,0.4456259095072681,0.31511543459313285,0.10221297471012081,0.296792927480624,0.06769565963112179,0.6605810897951874,0.9756747826077901,0.9253864990424805,0.9102814374666881,0.62541490331724,0.617291606144345,0.7153512521618444,0.1762183092625993,0.09629222272572902,0.3788373155824052,0.8540920228436213,0.9588285138719344,0.7501429094843011,0.6572810481150297,0.39157468234739334,0.3193943728442541,0.9397065962601461,0.7010060497684161,0.6618227298376922,0.49525417055221377,0.6279170487273071,0.07159293796842725,0.06691783811624474,0.8450155772135608,0.010932374979550685,0.839547468491209,0.6944495453392006,0.9848891349478535,0.1278153340606849,0.8650803596753971,0.24285790014039033,0.7462416230753497,0.7421514259623514,0.24907199626822174,0.7345910072964195,0.8132107142543394,0.1016273441003952,0.39139128976161164,0.767452565827957,0.37917792375569115,0.6755819518367976,0.9323019996375634,0.380424603090292,0.6465140490021299,0.09776083670078939,0.17212360365738721,0.3706548563840213,0.9158704435736318,0.4656111261724718,0.9820736256393792,0.28265633018916025,0.22967986389356576,0.2034661347219302,0.07577570547224854,0.2694389282050207,0.2973441586446084,0.9941163823647214,0.22625677452056503,0.05796975415308281,0.6249014018085504,0.6103961349885914,0.32004433441733204,0.8212180241559739,0.7033075651638587,0.663003198150717,0.4493604308469039,0.0367263780599727,0.6343012576955973,0.39587636795146963,0.01274153699045999,0.9423699293454968,0.4995944590396333,0.5063081191913894,0.5988132724101356,0.7129721036490673,0.62233219037705,0.5312186592217847,0.7580326997338123,0.34643305017677806,0.6012541292117581,0.08083270498523398,0.7397848442380812,0.6093083686715828,0.3508769926931121,0.3494956722594593,0.08547145874134654,0.6613332432100687,0.44674068764491426,0.08006615753834523,0.4556009176898925,0.23912589369810755,0.8332291519217452,0.8280220598717765,0.5232171443195073,0.9006690416388048,0.8072415793868755,0.7709842609306647,0.9331444999202778,0.8331966095271164,0.9848190880309498,0.9579314172703692,0.40209377705930627,0.05217753601416808,0.2916430697875185,0.7990176292577778,0.608021359453293,0.9886076163460245,0.9834700558991023,0.8907476043005382,0.44193772933473996,0.8495418855776962,0.48097722031792034,0.6788093935426371,0.7341313902732061,0.9022374464121383,0.7826155051770856,0.8381638293167526,0.945366491628935,0.5769683873155838,0.5656250407460826,0.47386473534183016,0.27442511061137864,0.21581216520100854,0.673257707521211,0.02329609102563257,0.8524118452825984,0.4781782717790011,0.9390996810548233,0.39315997513025347,0.394761768680578,0.9753812845586549,0.9734575128604468,0.6058724556097728,0.5466628688218071,0.803003510131828,0.30330262642927974,0.21130807992173928,0.11813666691667835,0.23478077495406846,0.31284627514904506,0.6126202328875718,0.8294649437900015,0.3212736936869751,0.21787096392819927,0.19529328061546414,0.7603503392007445,0.16861612614727783,0.4181278796415615,0.5379358045880627,0.5483608552274857,0.15784999108137532,0.5377990130231372,0.23452754041798318,0.29296711297029376,0.7675044519637013,0.3128799753823934,0.49942981550235244,0.8711154598507795,0.9208410378582259,0.9717837581751958,0.8319053964135528,0.6778807744765596,0.47861783324618945,0.24822126358623575,0.37126002562073657,0.6892341232545973,0.374958138352258,0.5993413725238665,0.1681716498064123,0.4698385994862264,0.9060480935498076,0.1969932149965048,0.41859766354566164,0.23274006165550287,0.6954669168291119,0.6459720570066441,0.9357471552550225,0.15572735583926156,0.017407671577467143,0.47700967435709596,0.7986005161748937,0.8118867001904648,0.8267651830211082,0.8967162445241454,0.04809431117413898,0.6619919078635341,0.44959032949570177,0.5611128819758593,0.607499097644695,0.2409675569083709,0.35054493530453,0.3490553385528612,0.816179648226764,0.6582033792558732,0.3460093746689248,0.09543121306197433,0.8072824066815085,0.09507022198198856,0.31887881994963574,0.4038749227605576,0.5392299483241054,0.16181876180903987,0.22977593287728482,0.03137485518136374,0.19785910579094734,0.0629948604077959,0.31513581880093366,0.36470535905568213,0.18325268800251715,0.4918850860433366,0.37277920998762126,0.19672433639550846,0.6556024693164673,0.7110356026667082,0.3213846843967949,0.532809584623479,0.43678810355672515,0.16055365584563197,0.5114687070764148,0.8491986881639111,0.2577614725305022,0.20552654692419892,0.7365265140488941,0.5456415398239469,0.1897385948849737,0.367794616788629,0.7679348193276601,0.4963422260945789,0.9735751823343841,0.8368364308440828,0.6998883450811952,0.8905530346382029,0.5739149886155173,0.7221650092267167,0.36748485057046776,0.3606920795052271,0.24509782449689665,0.6442444155417051,0.8309151818446097,0.0813930455705858,0.598715621513388,0.9325982271177833,0.5800400431632375,0.7617225068495104,0.3027884944240016,0.5374660183715676,0.7066031122416601,0.09282816324622067,0.23521412988020374,0.8600839897627759,0.3363083803132414,0.8558479421252678,0.7127209760863304,0.6296785863955359,0.5838340439297545,0.5111762040612156,0.1820267869018828,0.6260399485976134,0.9957457098895974,0.6736731867727814,0.9183379214827065,0.4424505869387747,0.21199953439354502,0.045228980744661085,0.8176021245449991,0.32535328674375674,0.12762100886152727,0.556487104474066,0.13005910163156353,0.11012815752393679,0.604796176220677,0.08057364501709019,0.7031450114905629,0.9548329958990223,0.48135426153523286,0.536068988381329,0.9538247954972223,0.5480757036829891,0.4670541759153779,0.5355351733744329,0.2375450258278251,0.7288520191029815,0.9162541623339895,0.2457929945030417,0.638352968199011,0.6179467942962868,0.6184470453489261,0.44158825591327333,0.2620888110084383,0.23129008113809157,0.4269544637475615,0.25189630183289236,0.6488036858570805,0.606403220284814,0.5079033703317131,0.7015109673535178,0.524166215126936,0.1040387256921893,0.20299810837455912,0.8601816351456708,0.28335169779951475,0.8160175659457107,0.7342827008667885,0.14801788365010937,0.1159008561154764,0.12401231317026529,0.5973937852657023,0.6499184006927126,0.20586837097546828,0.46151599080484584,0.6178956503636321,0.91686135677459,0.1438886911035635,0.10949186485435347,0.5125453673788614,0.6509578852266817,0.7994715505031587,0.15280639996325207,0.7423396028571796,0.07641642062268983,0.15620266389990012,0.1655967963456757,0.827893941356465,0.2559607572529632,0.20064441134909194,0.9282349662556115,0.06201084703526494,0.5619059193305889,0.26952015436586096,0.7134306079638111,0.44825850072330287,0.026664398932726652,0.2892636617458728,0.28429075220287414,0.9663513772783876,0.38009868989862183,0.6397958146281548,0.20893818913794848,0.03270153892171157,0.5832422094773793,0.6933555471702677,0.6767653757276715,0.11114092048308577,0.595235628818801,0.6817121834341398,0.0514525495804945,0.44660014098680634,0.33077800116256517,0.19874691862033544,0.8865759813295897,0.13600278033675806,0.666866822263416,0.36010505428361883,0.30763200940411584,0.14125902300923898,0.8677955286758106,0.9606019417902318,0.6372024864534696,0.031024031745235492,0.7813320303319236,0.25062781141331825,0.9753462558448458,0.10206612411393556,0.8438518681194727,0.7219886549899273,0.9215168138611578,0.19899337589696642,0.4589069543421753,0.6733492480809289,0.2514552559387706,0.8719754121953964,0.6499274697797204,0.7380241429839229,0.9269150547150322,0.022890089059063756,0.991016106149724,0.04606421960028051,0.11142159274618857,0.23446972459902793,0.5567106445783832,0.6215059100742586,0.20834488602447987,0.6859465908499403,0.16420497947611934,0.39999064232871695,0.8528991526403786,0.642179017441491,0.8511013612068565,0.8812766706962685,0.7236683009125999,0.6934999720640562,0.031166294497536606,0.4061570158626735,0.09991559781171722,0.8435699254540463,0.8817168563424325,0.3102632802705585],"mu":[0.782865589006557,0.9214892191528434,0.810630679570506,0.15739266712178757,0.8623616447074884,0.15225986639939415,0.3693632686587258,0.31420951595936386,0.15231186669902064,0.16390159271040172,0.14855947003784764,0.38372998645292244,0.6438658889210453,0.9776205138002401,0.6401283075904705,0.03129783895635563,0.8936605759438898,0.1862803066372849,0.2218968693343113,0.10490460241193333,0.2096750887659733,0.00011418490003989312,0.1467648546108864,0.09769609311118144,0.4439077596672387,0.8940269643536374,0.8723032131314112,0.32404948440267134,0.3682212511290548,0.4202471225438864,0.02333977549110111,0.24130133147796973,0.9293645863399995,0.4715654922431469,0.22239487222143373,0.5946105955261551,0.21655562415808438,0.8141810014705317,0.8283098213364726,0.6269064540467959,0.45672194351024875,0.73474257222981,0.2604098974638347,0.6947015127934131,0.2050886542605561,0.01695277378729587,0.9107578963493104,0.6039458748572042,0.17257534707379207,0.1778529071954802,0.21221833419089098,0.7139364662003995,0.9988727638371135,0.375788546537535,0.9075954933741504,0.4013004933413502,0.1782704912917803,0.9023106427098733,0.17266188283831774,0.9429903310969461,0.47132755490155165,0.5636543906921754,0.33489282257770525,0.13089738499276216,0.3688353706098162,0.9243109071804345,0.7607554458924133,0.6630084681131396,0.42181338835139015,0.3346879368804201,0.9216715713827011,0.9066693412613407,0.3214325573465464,0.21175248249775835,0.2109143622904761,0.8574214019561441,0.9918783583701587,0.05102604284054535,0.4142189644443457,0.3384735355194233,0.6849530775719763,0.08051696570504863,0.14355405398204124,0.07988983006369477,0.39800686639945093,0.5105700657964201,0.026623539527688367,0.06222248175888945,0.4090571637703293,0.18805822327524346,0.2524185370623544,0.07857234529969293,0.40529292527670213,0.6441699911463956,0.2758630703903431,0.774624399104263,0.07052993931021345,0.27687899547405825,0.9267375372261555,0.4693216682932586,0.5466634598271545,0.9268128455497704,0.3342256103843866,0.43522692879096425,0.9290772540166801,0.7103454952954971,0.3868073850728593,0.43495192929309034,0.7385468196455081,0.6573920158228648,0.3142600307986023,0.676572804479191,0.027129172247318367,0.2386686647667502,0.5685254194204743,0.7319288284338838,0.4008048140322751,0.6246255077844176,0.819036149433821,0.8593693662417798,0.8337365824581093,0.26915997638645495,0.2638479827179461,0.20656033795994055,0.18377173429069416,0.6345516373169937,0.04684725467820883,0.7957527611918569,0.2595616321309375,0.22216649328778693,0.2711361330527218,0.6749986665313852,0.9690688892066266,0.6230950878623773,0.8796076520831988,0.38742654730617176,0.470770686341889,0.030235503239634642,0.5723317631423115,0.006653854037596663,0.2180506930116497,0.5683846734372922,0.8113525615154642,0.29578779873364325,0.6915126632984208,0.3802983989826083,0.367713572688519,0.9721881394268141,0.04797574688019779,0.6271252160932699,0.28704321645555053,0.7979980339676456,0.08768188589726966,0.7660134884358447,0.14686271313953658,0.41228286334619635,0.7594480881647654,0.8860694135631073,0.6020625066178071,0.5209530237894242,0.4114648127783074,0.3914553312512241,0.035534764711474986,0.055670535560711665,0.2860540569314012,0.23422691176421395,0.18752192018574254,0.498590873440101,0.32180213883469566,0.41080667887923394,0.7145384779599286,0.2332975953766674,0.8734993014224464,0.3881516825328748,0.1569233580702809,0.520213722403676,0.7450852334014297,0.7634224184419394,0.8600788207148236,0.971194069429427,0.2789749052705963,0.632840987468031,0.47278542904071075,0.7883068736198553,0.10620090400541682,0.9008732510874273,0.9084126631823273,0.39084296103504745,0.5060546218997821,0.36784288461085435,0.5055819590187884,0.11650777319279215,0.16185106535974958,0.3348775293467421,0.09525042378651638,0.12086796648207931,0.10079331946993908,0.5882219209266326,0.05415845211926351,0.4395239223911638,0.5806359797740985,0.557395211472347,0.01871970842445192,0.6275844927494105,0.9680073234637938,0.2765228171578298,0.8705971777719563,0.7601740805533279,0.5270335332840428,0.6699910043001296,0.2759886475467721,0.9160794017534468,0.8187956553471474,0.9820432759972639,0.9893429036423547,0.16459536205449132,0.9737145641257059,0.36007351590312964,0.1354329522087392,0.5722562297676426,0.5359673043604853,0.17801791296251412,0.8961513293279213,0.3510945528204332,0.5619272007492262,0.7295903691960985,0.5242721581513203,0.6657660092028101,0.6857045857432831,0.1538202600830314,0.20825381186903713,0.26355252983678845,0.22313410280169155,0.2712959784791795,0.31545613595725097,0.3631986265261513,0.12212613602852684,0.18481907117630647,0.718373149021253,0.29398866921471356,0.3136069350815971,0.014960022835921238,0.32405717479419693,0.5956550692046894,0.5906432928955703,0.36019595993763165,0.1802016562812907,0.047573467885497545,0.28117559289295957,0.007143625795753783,0.8704218584897379,0.7916474975934626,0.9648370428954658,0.09404510251777554,0.767610387287937,0.7195433985117357,0.9931248333176601,0.12656862814952352,0.7804950625974034,0.27119667745173404,0.7001309648745428,0.40936475958727003,0.3491488622043373,0.03176139928036292,0.03398590362852416,0.1116096070752226,0.7954635055198829,0.18157076594588406,0.8853606462793897,0.02906279998398742,0.8744985643165262,0.5790504836547063,0.8103151430524527,0.6759397335849375,0.34424261401109457,0.785877452384131,0.296614629322826,0.7130680887498533,0.2369374467326435,0.8366126919114218,0.2743828912674038,0.21083601613019254,0.11508207118434832,0.12344824987706393,0.2758416488258748,0.05768746101281197,0.6794710739874248,0.11801382017867357,0.9695721639765991,0.7268447840116934,0.7621655905138702,0.028610230719814167,0.22644360933805951,0.19143556879589263,0.017537902313427667,0.8587768336018624,0.07694504774808286,0.731502340316655,0.38768965714605286,0.1103462855506192,0.7581873099281085,0.6310834038285784,0.5625725616684125,0.2531337141168526,0.0075127484246722,0.22045205610973562,0.34326002140877576,0.9475204172792644,0.4735505764258785,0.1327072815611341,0.19741269161967345,0.7263481542885395,0.9845434625713312,0.28360936723072605,0.19078474332360762,0.4826329947658181,0.9440730200672576,0.10904484831799732,0.08285465729477437,0.1778044764726534,0.7779348860311657,0.4447907851765829,0.25349802391742315,0.08919207814038121,0.9915518917996038,0.8275483745892631,0.06069157234959621,0.61312700874232,0.6169249522409956,0.3507583867793618,0.0034821471584356445,0.7188631667253846,0.03225604379102687,0.5139799679056798,0.2652293158469041,0.08730312484846103,0.33417494124938996,0.1950271965194259,0.802942003322513,0.36832990384914077,0.26265917190025356,0.5073181821152943,0.5515134233739669,0.9144213400286683,0.25933253223414465,0.1417658880885253,0.3206729070953025,0.7489656470178858,0.5183011045890704,0.5909962116276957,0.19336245166660082,0.12788214463354874,0.6280710588316982,0.9641295003283346,0.8610167456789168,0.5589718660186782,0.04608396613804522,0.845983404410318,0.8077974363118465,0.9117713802820366,0.8036018528973063,0.4131305636650715,0.8693229050157718,0.03349028331503723,0.40968831657314175,0.9726630397074827,0.28239242312272284,0.4907416508947191,0.1062449290009404,0.8737171618914827,0.3782187268148507,0.8391173750033978,0.3617773970924063,0.01682702481500087,0.4068097914336293,0.8754599856987118,0.6461687905465965,0.7952045947361825,0.011287088027036818,0.3666578010513488,0.5801536566405259,0.6647014344701834,0.6035679919324353,0.8658544165840831,0.05529007437470579,0.730093578493191,0.028191744635431615,0.9461122680089948,0.6891112228458776,0.4885941909412945,0.8324278462244126,0.5073244935513515,0.9089449506433287,0.542530214711521,0.9371770520949563,0.9273609321266512,0.41694310213643493,0.504704827748794,0.7584073742319244,0.14502555777757475,0.6371960875665881,0.3184099743942248,0.7930571760492364,0.5200480600436834,0.7708858994695089,0.5639791274080899,0.4324856913581647,0.5014062531649628,0.6307569661538943,0.3399183852339873,0.7292535856873139,0.8199095376702361,0.33282293532740614,0.8362611371245634,0.748623022960669,0.9244941858645226,0.05723689751757677,0.30411490028461263,0.17885997106460416,0.07701810944329956,0.0696065499845373,0.2669991273711869,0.9591277595025041,0.6792683217125641,0.6614767295684085,0.4828052631626656,0.06946192278289409,0.2579658639710123,0.31195052575041493,0.19761394544077948,0.4410852607634512,0.619443880350433,0.9716037037277445,0.7916989219097121,0.40465245639525116,0.9234520384044165,0.9629190760941897,0.29553097358143066,0.927449384443584,0.538603708929817,0.1263281257093687,0.8680432818041044,0.482647132392787,0.09655200788619767,0.7619051048084775,0.6644564480161281,0.09090372018026427,0.9417746955960116,0.40843531009938916,0.6653374720381264,0.9781680939277722,0.09339027959958424,0.6411406072833286,0.6713073415760336,0.7186700778628874,0.49277175368278603,0.920894507242886,0.12016277905086281,0.48491068551365224,0.7006550607864415,0.6271190982066333,0.883159009006415,0.2758425221589609,0.8737769567440266,0.189778967036083,0.7399508544390303,0.9737264751713541,0.8915874735745384,0.6870780177051594,0.9368653584817399,0.48023817154382065,0.9189390459039903,0.39842346193834444,0.9840888975556583,0.6475198508449884,0.5258154855754542,0.7745448171511804,0.4949371358279848,0.6620054359281609,0.5900897763902224,0.019662580592809897,0.760599067283813,0.05060894003822902,0.47823128259289205,0.1142398485770173,0.17370285952133568,0.24517019642954074,0.22320624939376854,0.22672330576043387,0.522585331893423,0.7173802619880119,0.12630048860997145,0.3413250102801435,0.8360010031422274,0.8705463583739046,0.8820197466681583,0.17518880897378764,0.4528477349275284,0.9139849023304483,0.6644276244016278,0.0961058669706889,0.20171474000262823,0.23129595030225558,0.2791735377361051,0.820356772349744,0.6417992979200158,0.7609929736820626,0.17082449611049477,0.3851493918182727,0.12192763593298173,0.9845789203425359,0.46406636572067117,0.7379577635489407,0.7532509232522981,0.7547805329295731,0.154193533973785,0.47307342399564645,0.13861031693675918,0.21839014011137148,0.5216699907873443,0.1441597956025713,0.14761567718601354,0.3520411555849827,0.40524964570473165,0.4684130811985723,0.822242134211624,0.6770679704929357,0.7102355738551502,0.20376116479569673,0.26435378083170114,0.04784903041682198,0.24415136312512598,0.5560456751322227,0.7104313022272764,0.8103271501010252,0.3535059766034425,0.18159295576530066,0.7674449030651755,0.038123280094106926,0.3920833464890323,0.8733523525799773,0.3784189680426082,0.39062441852701224,0.8665369558848288,0.8051058888217713,0.21048151784916524,0.853948106058048,0.504794600548726,0.5678189245434535,0.619470865247622,0.9843434799121691,0.7829016613885846,0.8616232947212819,0.22969435234208735,0.5701195846587397,0.9077516061287374,0.8261233329184814,0.9347865867067311,0.03260456703168613,0.08991944485393533,0.692475870946561,0.04940424327996884,0.674077640556114,0.5688521049489019,0.4847628192673996,0.1426155768487749,0.17710100364647663,0.3650463785578215,0.7057347093757471,0.11155348362407036,0.6862404718690323,0.5524934514990016,0.8342564197621549,0.7597523980987784,0.9414989006706662,0.5231304120373585,0.5848493779608765,0.9061618181225288,0.3708320597107089,0.7138587202909854,0.9479443538653411,0.8538862555645457,0.3478527364434987,0.48307616187658264,0.9062774508464999,0.3728676337594554,0.1998401694635097,0.03236757714129568,0.3997755685244395,0.620448396297895,0.02606494334981324,0.4721109699315984,0.3339919917912977,0.2859010913995157,0.22581786687351113,0.6189164108169414,0.5185519599901172,0.19259317593851,0.5493298887575491,0.5961183176114415,0.4616566475634327,0.28826428064419485,0.8219192569624789,0.8102106139087792,0.24182623343226273,0.30603450770224705,0.30066712704270837,0.49362566492884175,0.6967968050245197,0.20039418030922662,0.6881619232452905,0.584463979864005,0.0435256883682158,0.861448773513426,0.5553146266571336,0.20309426247398354,0.13984685537812558,0.015380199355981006,0.5146164207429986,0.21210400402105556,0.2893991593855394,0.7375797938870137,0.44126179293305756,0.37215341264429336,0.1758314379914636,0.30949304221873186,0.43075532690056817,0.5443005216536305,0.9503748470308382,0.8674345387646782,0.4057960098116713,0.40211602300591975,0.4430819388426157,0.8161010493649159,0.2996167021156706,0.5383842964062686,0.8007982810553349,0.23141164527229985,0.018787735648387205,0.8069727379639211,0.3196168462555904,0.9317052264274721,0.21919697621295176,0.7181659259076469,0.9597427117684796,0.44052476696172427,0.13813935204081007,0.34172409961410777,0.6992935484781027,0.5719954532432998,0.3848881749939328,0.8579217007850937,0.9037730665594013,0.9448713046551553,0.6272249649472277,0.9100032042049282,0.5018979841346682,0.07652573113732464,0.9231051180354768,0.4096016591209495,0.8378510250928193,0.05717247907412881,0.22376698074650836,0.2555517684838613,0.1771960422395591,0.03901682104667259,0.9246302394568127,0.4402276765091979,0.8712768687195693,0.9274662383400174,0.37486729909225835,0.6540763431351035,0.13863760871341824,0.8419199297606677,0.7048480806635555,0.4189131625976785,0.07913157736910681,0.3094888328844718,0.885725516195192,0.9848223446010769,0.6903148242546655,0.3206862924271332,0.5015374785547349,0.09773371326708236,0.21848855153451696,0.32840631761232375,0.49106598213257335,0.5633630333230497,0.8221720234693484,0.7857943071867748,0.1090212979290599,0.43732486224134237,0.561448598009274,0.21887853692448012,0.5659808284286014,0.7502264186988132,0.3251712585001538,0.8267372193281541,0.8691624244427387,0.013542029841331793,0.1548743558097896,0.9655379275052853,0.5014442726988966,0.3988019378154939,0.5498114954068665,0.07546095794915542,0.1706877494390724,0.3403347370222214,0.39614460506657023,0.8000661849307587,0.12104023147907217,0.15173009881359945,0.7433288236543414,0.6944211169422672,0.28007598398816236,0.26555331430189333,0.1517726151641885,0.325781648922435,0.533852082115073,0.06478673129352752,0.14609682188833917,0.18237506574627527,0.3508306807321284,0.8291236178126884,0.24642760785682616,0.4714816887408335,0.8277752250353456,0.5572476594523261,0.969086155511466,0.48657846308942876,0.33508921222966803,0.07777253123322869,0.14992797555869752,0.4718316522087218,0.4528547617930019,0.7802619401816784,0.9348314232724375,0.1154101732854782,0.42808512837370505,0.8793751797451659,0.9231043438422706,0.789839295860534,0.9588810572821018,0.08342636071471987,0.18347708657666573,0.21834969537641236,0.5382349480350659,0.5480134670140475,0.39076245191060455,0.30361826492771415,0.3551489108757162,0.06372827748421739,0.27702350871465886,0.8887831813894942,0.8324702727568003,0.09095496231486577,0.5151576795970281,0.35006658248886735,0.5454683238544813,0.3280262394455533,0.4829494363494635,0.9840999617584885,0.40379521452017864,0.006607767226578076,0.967057042789164,0.41016985620148194,0.9941335949651453,0.9203789985186519,0.7936036532335056,0.14549415906609786,0.6505617033389481,0.13927645777900932,0.3040129459168024,0.5892714109679804,0.9341104699046685,0.8073759342768632,0.20413581087320787,0.4906351747037012,0.4524369595764417,0.026753626664200558,0.18439913331572289,0.41886451869460917,0.1804884635126789,0.9939153724409648,0.28592832489899633,0.8104095322859883,0.2469595760844605,0.6319622803288334,0.17421397323583965,0.6692895423522465,0.6701159586695427,0.6828703804182161,0.06864327204864695,0.558530548123698,0.7218773225606132,0.5908884819359292,0.6334778703789388,0.6623545039620593,0.30970394686276403,0.17329032528174215,0.7418347516615817,0.42192364278677874,0.9115350685754555,0.9192438673181689,0.19901430261269915,0.23594289043213235,0.538440963515791,0.46306017769595487,0.029198829974394824,0.6930782497978651,0.18875169410946868,0.8777837862684708,0.7474859785373855,0.3039359975879825,0.6543191261036583,0.3677291120811237,0.6096312205348373,0.19632280527298995,0.40922130097261755,0.9411274089537072,0.9279557177994082,0.8864850152016341,0.15122777817805866,0.8102710760468141,0.2773201975262849,0.7727797335637123,0.42614314349131877,0.15722758959287586,0.9863303928772542,0.25020002005309583,0.7060161020252627,0.8817007510414987,0.42268264889433627,0.1337247379247899,0.04789059320994182,0.45498256010817784,0.6487670686396103,0.24414943998740868,0.8787911256227183,0.2789345487910788,0.9057687803311101,0.17852844692255476,0.01863472524739418,0.2368936896599938,0.7747584877482783,0.869361088333171,0.14884283367771545,0.7658029128693766,0.5438933089053735,0.6833826957116063,0.6762767004432804,0.25749349147095923,0.11793385854585714,0.27327100775423285,0.3084758307240614,0.01417955144111871,0.12614979174487906,0.924484101551329,0.8040042663693665,0.713573614311658,0.12934573557505558,0.4747536850558136,0.4653929521853615,0.16616720080745928,0.31175714558912393,0.22276311599752163,0.8057727148429048,0.6717535818433524,0.3059210056036572,0.16406767508482578,0.49546978013029586,0.09972673875589377,0.3097361167782662,0.19838575922648083,0.7588609095620349,0.8323451426217103,0.7071139525728478,0.6531744968746638,0.11052856265227584,0.05172710274984049,0.09500201996721902,0.4989365009159925,0.20508559845559837,0.8446376789830348,0.48835293897545506,0.14049699185082165,0.20533908159572345,0.03032648065911392,0.34798694434662236,0.4704138934592985,0.8565266661674156,0.5345972648857196,0.3536067867022412,0.8023747822185563,0.046731238092384775,0.7751604594497008,0.9059686072296202,0.20098456066190762,0.12060606125417106,0.872725482987506,0.8054310537245346,0.6770716451990593,0.36082551895520165,0.6673447116977076,0.3731485145308864,0.638262227070612,0.9480311770611765,0.30262428663584173,0.036215490699358144,0.690759318655743,0.1324401885801174,0.4311600332943948,0.3120828268609861,0.8430240377963951,0.6514593701600797,0.8689181184152925,0.743310259918234,0.7927693649715828,0.6010505402335236,0.3561928791444038,0.5199058169894466,0.7998249474980677,0.565308339140653,0.6546977977324884,0.05425040756113941,0.4241834403872593,0.7493343579512373,0.7514997464662785,0.9987097402285412,0.9277447822142193,0.8904777983475498,0.29549665123998237,0.8671383138321893,0.7413747594846558,0.6262217260005138,0.46938307737808715,0.8780133964597208,0.439963682202954,0.9922018981801282,0.43394472481970325,0.9331914259490803,0.3954627235810877,0.25936872900096053,0.7246840545844038,0.17434367456596256,0.8314957281072315,0.8593098953701965,0.4609264507771389,0.6861051498965662,0.4675120611891106,0.42951914012775516,0.015719674341593715,0.7197649413276108,0.15741964631490601,0.8771743387286619,0.7085566181248342,0.9069873108106519,0.8756670996170879,0.575045880382421,0.2878273494924606,0.6689493094443622,0.5315364795239126,0.7152446152547798,0.8632788999060461,0.8913543524804957,0.7677475524483628,0.24558061794016783,0.9711598859183075,0.6546138691508165,0.9627905403177917,0.16264343950723736,0.3982708524791252,0.23943544532216565,0.9202255502602668,0.6515952411115129,0.1846708006648059,0.7112482689835098,0.7196106325984049,0.3360401189304012,0.5603124354338593,0.8882341819821342,0.9785499085915059,0.5607383051811745,0.2802311828317834,0.20417822236871563,0.8248032559088989,0.8052587804067339,0.09753149347860401,0.8400824276994534,0.006429763880938744,0.3699136012686095,0.6152834709429658,0.630569103965972,0.5422760100348993,0.1642611363329467,0.9521800698001011,0.24717503230429538,0.12691468597216438,0.10650982042086454,0.4568096030159703]}

},{}],78:[function(require,module,exports){
module.exports={"expected":[8.534809842018838,-9.713279664064762,-5.890829090259171,13.028647862103405,27.585413847696465,-7.985192958864784,-1.8702913472081084,4331.293860378545,-6.66194474348861,-5.723663371580967,-1.473830251780715,-2.9891566941094636,296.49251027612036,87.98979196508694,14.825504158826556,1.3884952933305375,3915.8405244874903,28.938514705653297,276.13409230226256,-0.8981887110712514,8919.046684935161,2.2430726496971296,35.21204348052455,-0.15361566498939017,36.62121447227875,-3.5483788679010084,-0.4863747756880681,-5.911957696917874,-5.728542388135889,-5.711774291639411,0.2043326255309501,-0.7711628619357472,-2.1502562302496164,-5.293383822156914,1.9258982191565073,-5.750307519274751,-0.23383929605972043,-8.617947288168304,-2.2613536787345603,-6.44565138206583,380.3853266324253,30.84688346088031,-2.7077862339779695,-2.6408353580190838,-7.773611026319595,17.494901815890778,28.249050130371756,576.8018952730329,-0.756436768618546,1.6388629032365372,-6.830248504893436,31.961583983025776,16.68621950271291,-3.276144433637698,155.14080221719385,103.87216175313323,5.475241443072997,-1.0228504351624457,-5.513316020611088,-2.898098051210394,1.751987342813944,16999.577968804508,-8.457069625216597,-4.796293366419007,-6.858399459110901,-4.502263560948847,-6.682448358876441,16436.120217376683,7.145910587606976,1673.4519929746086,19.712531706891937,-8.509580589925674,-6.451455185696973,-5.905291356648677,2863.7419095156833,2.7318104682805258,2.776690115924463,85.95009103952027,-8.973550803618933,2.6347867775393943,0.9762052979299414,-0.006069412699578169,-3.2452227020623328,2.8178809966197265,2.755749119210727e10,1.4923729378960529,0.014086377018319496,4.245353213071881,200.41657674513442,-7.15854278411513,-1.5401578427771196,13.181895380633485,-0.9452636570015154,-5.270691600497531,-5.515212493323583,13.516103505513872,2.443963896674058,739.8366109709361,4.85639769554207,30.93120199364254,7.886518698922847,-1.006542096555703,-3.9023176659117675,0.06086560622962223,-1.4504855197521302,-2.014609620071859,24824.717315683167,7.348188866735159,25.677365187474393,-1.0808772674736302,15.784028827532465,11.264131435847228,0.22702874869177192,-2.7884301488992826,136.75988711923307,-2.618920921728188,20.146895086874256,-2.4151133302063816,1.3794767951652878,-2.814290514018144,0.7287073827410406,-6.575575824807799,1.2102615282890978,-3.4406183233383563,-8.46521417081929,-1.309681915201945,-5.064987056276675,10.510594322178521,-3.0869410678795433,27.829409699272095,0.3644834438492559,118.6753902492969,-2.982569944781928,3.21284374753847,5.788704100948792,-1.0825235604332564,7.398273441732577,4.267655344347418,6.345756721222784,-0.19851524856088998,-7.031308684712992,-6.8155903260036865,-0.5541435756332469,3.695380321539366,3.262612474477929,-4.262277994474549,2.0343009611068963,37.11953614290813,-7.475712781039551,-8.635512227049162,0.7113357170072541,3.1173788184773326,-7.939866832726217,-8.171982028555409,35.04674023340103,49.303377919725506,-2.1338621033472127,-3.523861189743589,-4.463010114349499,-7.698102541882391,2.0934026328936715,-3.203733484619061,4.126069214716461,-4.461441558056385,13.58290075280654,-2.867148334852805,2467.246282018004,0.598457712165235,-4.295169141374297,-1.3031807815968612,0.523829016712237,-0.5474176278616145,-3.8763379554413255,5.1299946775995515,0.6807794679944994,-0.5797809401979727,-4.789905472671025,-8.719413641804765,-4.31815169605181,4.756889400508219,0.7977980757941547,-2.103289349046099,549.9961768990347,-7.039342253318767,-1.0377285985754057,13.242671844902839,4.268740061841084,0.7878618632277097,243.4756561562919,1.2388940823911074,150.65024420219174,-8.072726371870955,15.908275088416858,9.251844341783046,-6.165503503001402,22.370508675140936,-4.989581410122504,-3.747436641779412,-0.8641298205625239,35.19917749693359,-2.0964055447822942,-1.7222634959122818,-6.005439118224217,-3.3659881902099773,62.43408165173121,1.0357084890114123,-3.418374427998727,-3.3811964912211203,-7.3361590221590705,-5.349974003319666,-1.3085007831178395,-5.169406100676028,2.3664727909714136,-2.0833177637294815,3.6774615653208897,-9.167200250112963,-5.617449222366087,-1.9923330636406433,22.34688254409597,69.74762119063905,3.498946263978434,166.83582496031156,38.02703087832687,-1.2819997680518878,-4.515390860805681,1.0168049692957473,1.303932426087973,-6.711723876922024,686.3332649421445,0.022852759680300316,3.734012959886905,2.5232349745806038,-9.772973808905379,-2.8355128824328073,-2.9193540801575484,-5.638644619934863,23.703500884540517,-9.232412109791342,-3.567481320307379,-4.673186928348211,646.2212736822709,-2.9814174970956095,-4.147104872418272,-2.838648809537087,-1.3224874806536495,14.153609780744207,59.27035613524822,-5.966279846297504,-3.503947918016766,-1.1540514171391367,1.5079458633105998,-8.443093183684233,16.161690346242068,-2.9176898869222403,-3.2289276981202892,-8.535066450802407,62.639811289373306,403504.54060202243,-1.317992426695271,95.5912795523225,-4.156758711989693,47.5358458333113,6.772446390979444,12.647775781365164,9.127105431555403,31.15549167066701,374.47986207838744,-1.0227474964738867,-3.7529973049602194,-5.787707810786644,-5.019228322801856,-8.066946886966715,104.99044775700571,486.3430725244484,-4.490620717790225,-1.5637339601238813,17.09352195813196,-7.570770785447857,-2.982650206831769,0.6344303122495992,121.3328658249902,1.0394322962884,1.0075890967918064,103.94631113950271,70.90358556367808,87.35988809215297,1.0818486134602638,0.6198231681729052,2471.996148288419,154.13918156736514,-7.676135967070401,25.24211564017643,-8.803369151452157,-0.1994297682842331,78.69908173579947,-3.47708753446722,3.533668015038493,-3.7809656994493865,-6.116740047503531,-1.6647581350470912,-1.7389862015770667,7.283465604190964,8.949052480948193,3.1312025538489565,-2.0990746855720834,11.788215136155921,40.178060800853665,-2.8935407456061197,26.417987178857253,8.265874452617947,-3.8881763367228617,51.10616025178952,-2.7470223569129826,-0.47645518582660934,14.77742745155994,251.1765423412797,0.3933940513479879,-7.142986519419236,-1.8320465013559089,83.9416057648421,41.925865207542735,-7.5592581615034735,63.48621033792701,1.060358243539505,-8.191151775580572,100.15938793363209,616.3860607087364,1377.3761615804715,1.7626716394162378,-5.3467129390673165,10.256945709050736,1622.8664401073706,2.552630500014471,7.315242480732076,-8.95651086715467,13.317736331153291,8.803306651873475,-5.318301793859749,9.141282054040246,5.716998117417949,-6.946771513194359,-4.929301082960849,-1.9345060678857406,43.58590587361336,-5.013222267308044,4.853201811943999,-1.212282060886602,-7.574811951342213,20.203157149366337,1.3242231712727752,58.21737964013878,754930.3469644613,20.046701993344904,-0.08145470157016588,22.21838999879399,-1.9047399974964931,4.43089328142567,7.966409318727879,-2.4964134429203213,-5.214892445677148,-4.951956220817751,-1.2482865353000765,0.7644999009269635,-4.91563357819171,37.892722944447264,47.68232315489837,-7.10434978433865,58.26856603832878,-0.7721436847324676,-3.5815927160816323,-2.933294464463416,4.123967446890175,-6.5440728092083535,-0.9630990040949623,1.530974412076347,-3.0560929191118924,43.912407310363726,-5.142776125247611,-4.2988700392414,0.6536904783197617,328.5211497833753,41.081623641452204,11.186456085057491,0.539844376444312,81.90288079796765,185.84864573168716,-1.478379759906369,-2.9104046780996455,60.609656859831674,-4.7018065109462395,-0.9501394490819295,-4.149607975009809,1.9078158129695213,-7.618872523421015,-1.0545042078655147,189.1981997826939,-8.319884907746316,-1.0805305575363673,13.012260311760208,-4.138942596876616,-4.5902246546546825,2.7434741918114525,22095.51760363655,247.89718295645824,2832.0528853983787,2.3473423848404193,-7.025838117303274,-0.026366532101875784,57209.03409464063,-3.732867371626447,-2.471960511660648,-3.9534617078096295,-1.8573758413322574,-0.2002764851457285,2.2377066143762914,38.70637134031426,-0.0619943192248078,5.565864999007614,13.677104193652891,-7.738327787761468,-2.891584123555506,5.228749719112463,156.391650114463,-9.007218746171246,72.44278973855401,54.125363083959485,-0.05088290834040188,20.753009800309663,-7.898486494363468,49.07366189954931,-3.0891009935716855,-4.99169492913251,-7.371939768262015,7.154950027861731,59.8907342235004,12.40226180193185,-4.544786571234903,-8.538211263010075,-2.66498762901007,39.26789163864097,5.298732924018989,-4.588382906087134,-5.29460631770201,-2.3547566474545385,14.365668770526334,-3.558552335345787,20.150213348458887,1.1794783408515679,-1.2109145650623843,0.7169018088931265,9.275526182352767,87.13211528882918,0.7307442980331991,-0.05961451332369194,2.683252894330576,8.95531860018519,-6.642969221891139,20.936024849587536,16.521099188460983,-1.4235626607500977,2.1947516058737797,-1.6333635185745095,-2.3203816043641066,1.1652031337704414,-8.294360699179489,-2.4051890766383033,7.215611210866415,35.13041616754505,21.60645426353627,92.20152289160399,-3.428476211342623,2.8665326863345317,-5.006735235971972,14.25949221353886,-7.6025263709393816,-9.510730547300014,-1.1711157879210878,10.653986097335348,-1.6783604943814492,-5.6553070913110774,15.813690401095297,697.5227131299202,21.122494876787744,-3.1675971650695995,-0.10178395630812043,-7.470610203391814,10.56741376896617,-4.150131380485648,-5.908170389806471,-3.778130132517208,-6.38703895793863,128.69724459490976,-3.3815953797948604,-3.268357285503086,-8.36793302920183,-7.300540578952292,-5.656315984304027,1.8143069086613628,-5.730842854310519,55.28224149142219,0.5416848069834551,-6.59632538983488,-8.211985508426865,15.139397834246825,42.82081692535704,-6.693888961587639,-0.616079036021866,-5.8950911957592,6169.675724964774,1.5873040722316953,0.2988343353554539,146.3826963336819,-6.94738757928975,3.1503888614503994,-5.398104840817179,1.8562850277952614,-6.277753775470932,-4.863640456297157,-8.963422047889866,-4.7104189251108375,1.2874045548584778,1.7662479610793906,-1.2454924239842529,-4.047404764136477,0.88090360264371,-0.8200234671766977,-3.564897568672961,-4.483269865710463,-4.201377681677426,-6.304674046940234,5.323816507060336,-2.5924392714710676,275.4682691066031,-3.321107856305461,23.316357783836544,-7.743049451883319,7.893556524885427,-3.148072928596377,-4.512695340191232,1.952032246759949,-8.449504032023441,-4.254362377035485,3.102351544483131,-2.4305226196362835,-3.017749083575911,-8.605756513094722,1.2663351001651466,-5.4688122487723785,-2.190475204776369,1.7138425646198217,-1.144681482498934,-0.029371689949894697,-5.029961276059184,58.68359865425251,-6.387085388158739,52.97026523698841,-2.9494716122019926,3.8157721162337084,108.96951139853203,-6.738010879066599,0.9573434149450044,-3.1933862179821104,-1.6407471927802586,125.53153497491137,10.110203688958267,63.97151035061009,-3.56398661482849,0.36297672981472395,-4.883645235503362,7.247045652294429,-2.2668311047133503,173.4237043082681,5.028632671820641,-0.8321549372260162,777.8176078384769,-1.9582097414574742,-3.410725445583138,0.7038509537431779,1.571499019183931,-8.50478434901802,147.36567487514907,-4.761784319541378,-1.2281441085244715,5.0122374172247,469.44717989674615,-5.225708565638314,-1.6412588094386678,1478.5941604937834,0.9442523720368219,-2.4134880240681857,5.689244810551364,336.549724593948,5.130790280974876,-3.0529662279977683,74.6471776514098,-0.44486188069934274,273.0588159312033,-6.870853836704361,-0.23699222299780934,4.216191582474304,3.4005542153355774,-1.9692935766104314,-1.4404879814306624,-1.2157406214655895,-0.8772691961802233,0.06511555134788871,-3.4458348529742864,126.50208527117076,-2.2868628374248026,15.40976345092336,-7.161590324261986,7.9794966384361885,51.13796232893796,37.043739565439516,-0.8590810612869282,177.0125469749395,-1.7832639246574553,-4.712437125817269,-5.922555095789662,1.2553011454420266,-8.070972459936183,-8.99518507687343,-2.557973838974,-0.7235051526647844,-3.56982483930274,19.307717273799543,3.4686475680715256,54.81207472454429,-3.4491923192203195,-3.0269335269554523,-1.3455974178462593,14.825226506112942,-2.1982568204823134,50.930495032658634,51.3730638080535,3.277490017387909,14.037261352742648,-6.326513236435468,-7.497969822615518,76.80271935481281,20.332944466076302,-1.352277817494656,20.220000080145347,-4.088825628873497,-3.1341955527738357,44.44257900246405,33.546008359671625,-1.4317037869556168,-5.412164738793168,-6.058692711902548,1.5890972069836984,5.65829998498231,-7.000828112709041,3.3785379513852174,55.049777324461516,-5.870122794681086,-3.5867765471198325,2.186225435460672,113.82523060992152,37.775017206897495,1.1779574802665262,-3.036352306559455,10.266363233456925,3.1621683968447645,27.646284236618985,9.912636039315716,5.601354877338567,-5.068472609205205,-3.65876097154606,4015.7160841125674,41.36773973732905,-4.500028047772254,-4.078483996905422,-4.539533282319434,25.68132122588596,-6.829425405677882,25.708916561702516,-7.425748740502906,55.912279807743026,0.21918529425084632,1.5273836852722744,24.81538787673108,-7.914666879244628,190.27041437756387,0.365054702353115,-0.35930885219744707,-8.780331948457393,307.96210114534983,5.033722829954417,-0.9415307153248964,-1.264911969394662,-8.491351400649437,27.34632751365741,1.9463059308080957,-5.233936250131165,-0.9931592841671257,3.0491106799555006,2.185674427043821,50.3467779428249,-5.988715085483753,-0.772238789067196,-3.7893916366758638,-9.628992962066992,1.363179770807191,0.5296089740835042,858.6540574722414,-3.411559242543981,2.6661448365462386,5.64909888273768,-5.458190214048873,-5.639032800498614,46.0717951229344,-6.987663357499322,15.492396705310355,135.76984435065307,1.1381281366088398,4.9000712871171945,0.8853933716572513,133.98334431363236,41.56133125848755,-4.7406166743505835,20.684971076093,12.005078592053948,203.40890733880266,19.369981972646116,-1.7687957679924762,2.1023605822156752,-6.763226904149494,233.2533693266472,5.410287530345133,-0.686779848285539,7.096715089079659,-1.178681201811214,-3.2820612938035385,72.95791543468644,-8.65392230012967,9.481482907442043,61.490122742361585,14.06403370563706,-6.846245365579853,-7.290602619873031,-1.2369809618746566,-0.40126440229367955,0.8414952995142935,-5.6842734060424664,4.495661477523951,-0.7027065598681421,0.8820686300300657,9.273509849879282,419.93832757956744,6.652967043550367e6,2.6741489456271124,-7.117998488659093,2.742055444025599,31.02905791066793,25.88335824386385,-4.987297331715339,1263.5188952893632,8.69677014958576,2.5589574935034074,-2.2530783855181875,189.95391542867043,-9.055959963526636,-8.344785040824151,8.824538936823349e7,-0.02940813317386881,-8.156048605906125,-3.8047120516442496,-3.7881908400844804,2860.175838179572,-4.48126409228156,-3.8822059738166113,-1.4731697569318527,4.598727004205151,-0.9368073593640512,1.3140737410310974,-7.277510560236331,-5.931181177317978,690.4972787611135,-6.0207959799053885,-2.5047665813044544,-1.9373963617271848,57.22885121908907,-1.0949618799716043,12.132827280369098,22.18631139482364,241.4206787157382,-7.865124188760085,0.6130706106371391,0.4415399896821146,-2.2440254939460127,8.840286567561183,103.73177696531636,55.33998027136483,-5.1199198522600655,2066.2655032248,1.7077489915101252,156.75591287471892,33.78262792495794,-0.41941568093592796,0.23002175814916992,-5.100735429287354,-3.062740897876845,348.4688521439607,47.569914398273106,-6.4977926463093,44.821012121345845,-3.4079294209379354,3.4345464480300962,-1.7117256774462941,-7.4303164543451725,9.080905100463736,-0.33358014500141786,-8.887889007475728,2.0268648063605164,10.986191933086884,-2.142757589642393,-9.423032177094187,0.3208229288671952,14.246967154211335,1.9850686987024382,-4.211087796853433,63.95905604065852,-5.615854756961625,-5.100723576823343,-4.899566749189603,-2.2616994051402335,-4.945728376499183,60.57978347060538,7.6211672519895455,38.03475166363173,-4.498617563456156,-3.363046701249277,-1.683548014760305,61227.903981507145,-2.2946818959228388,-2.6389188542094524,-7.0209461046636035,23.486771045536045,-1.8812932746037803,1.7538274434676775,3010.3664735635093,-2.0073420540037787,15.853978570843756,27.46030735945032,25.13336229726874,4.146313515352931,-5.626191003144904,-7.030018622910098,-4.293893956228103,-8.554141094423851,152.1411485340474,136.94514541198902,-5.627339536612276,-6.837934301981915,-1.0345874127373709,-6.047313608349386,24.85000188571701,4.539638923556644,-1.619034962557639,-8.74411042004091,-0.3355770224357244,7.825151816759519,2.2754319544710357,415.3713241616942,0.3168846798669209,418.1450959793823,-3.418317161599159,3.9619774365633287,-1.1074036653412536,-6.144227112793296,22.322235054399222,79.32842395121145,-4.292755160503068,5112.407747642574,0.4291200710750136,5491.979762812001,135.80688872711164,8.555459242515552,282.407997222785,-6.46787251124501,2.2056783089973298,-4.023460215638094,-5.558227099030925,-6.191627878880637,11.88685943930416,1.1115155540654724,39.089599072297645,-0.2877611193193992,-6.447177846684645,-7.4564935168016895,48.15482376415699,295.86098631721745,-5.486058411477105,1.5742963385087219,-2.958582344746962,27.392928324982854,16.599819738979058,5.703200844608574,-4.495951095706359,-2.2387241384286565,-3.5756306559311373,-3.2503199243734624,48.793104598024044,-5.176415843853322,19.8277801799279,28.01985616011081,-4.954673540977208,-4.8493646007441855,125.35107399589559,6.806281744300993,11.798247771956465,656.1674850595817,-6.140193379801513,3.6295664797722758,-7.723761633912914,-8.03047813866009,-0.4469428427749603,-0.8436129186278201,-2.0075925398919447,29.843503624979853,29.409493662902378,-8.449603455447592,11.583234444068953,22.27850876687726,35.99607691930711,-2.1915072819511483,1.3444860969457406,35.75228728413443,382.7003477857638,4.603728492041149,-9.03691483030195,-1.3810378431756796,-5.800102178307638,1.5201826917121433,248009.23559501764,-2.369204864287612,3315.801812704636,2.5008203131707933,13.266482384881677,-1.6479338598958742,-7.9059584330848445,6.513237905724621,31.515881183628995,-0.1020273679041992,105.49512662011489,100.47815080939243,4.6855054149761575,9.126655743553549,22.127795767835373,1.1898478901162068,82.40884733226576,-3.0344741874964383,-0.2985719676346572,0.31419138531225066,18.667162678144752,-1.8367579869875628,-1.0424928957798607,11.616905064403326,4.9784050440905805,0.3265791569529217,-1.7082088171360312,5266.269028491253,3.1952290540837693,-7.568955835851096,-1.1181697100364258,-0.36307008041326627,-3.544741706394582,5.899489743563116,3.0413330087909536,72.92209351621703,-4.733194534750837,-1.2778893107097193,112.11812552705275,-4.897797329785622,-7.457169623122846,0.4205549461547238,-3.2097837491024235,1.0727879442191615,1.2834167607343243,3.6651622443214187,-1.2508233403438536,-8.623143368466271,-3.398655002268591,-0.05586456000415807,1.6711251598686605,-3.7746284278611513,64.54812106586886,5798.510928389922,-2.05063277455009,-4.486415796709881,19.70743860608141,-2.4586639499344756,26.965752942590555,32.607650304193484,3.883970194409052,-4.616933904839648,-4.811100587002522,-7.263332673667161,13.297674846105204],"c":[0.9744541276382745,0.39116632327274803,1.8229222493042396,4.6304008997074515,4.787948208627731,4.632671768892288,2.662332007847846,3.1387100896657083,0.4410475299871319,1.4927972965585323,2.0165838973581076,0.6993337078159001,0.7354060677333163,3.6589128802200133,4.697335952289302,0.9693461440070394,2.581403796280436,1.2344434798480186,3.521102292780917,0.11070303931092318,1.0590247078471615,4.677679839668695,0.712021120916978,1.3228237154139921,0.9879110330342744,0.7754568094755143,1.9993580872310879,2.4527631829952634,0.08531318280566746,1.4706608991564396,0.7693783200654536,2.8199812427564064,0.25026209303560476,2.4701939244904283,0.5651295353063324,3.9989518652618727,4.940308991815066,3.6825316307189127,3.514496025116526,1.649772047308593,2.7578327083326504,4.937628455222943,3.503615324314876,1.3324246195624445,1.106275613590767,3.4072513798439505,2.0537377306565787,4.654610042984607,2.331904672206384,0.33269977873618406,1.8696616850262737,1.872506495737104,3.889405668671826,1.8299327701781176,3.972020886183997,2.6288051524930522,3.8754640630524353,0.31539345546093944,0.9292124429831905,2.275357162777193,1.984520287746907,3.872515524441237,1.6018977288111713,4.587725295371994,1.726230981559571,4.905462624934409,1.9905217415676768,2.6882035446335193,1.5545881186498856,3.45968959285866,4.9584561636743185,2.165758511257759,3.1073450363101065,2.706076673968184,2.771657329566307,3.8383622375758675,4.223838976722464,3.439558276950695,0.4518804768830842,1.9387146345357897,3.358771484363544,2.9093608218957554,4.820970684893924,3.1927963203863308,1.8384714142545733,1.3463488969102655,4.827281119649319,3.5206033910577164,1.5682965292394047,0.5896643651820577,0.5406865888326906,2.6954009467424234,0.8801731928504541,3.0714595268658904,2.0904520490857283,0.8815345213637504,1.7355288830708482,4.984974709117401,4.765917448400703,1.2643439757078079,4.834562293766047,2.705701035204041,2.2420520724217896,1.919619798801383,3.5906203795925484,4.491315411404793,0.10557977341819624,2.68505514436137,2.772501089560718,2.5473246146466346,1.2265600005632338,4.2235108845317395,2.374135205053939,1.9769137174693607,3.525647175790949,2.901691365863023,0.5736682147427064,0.0521727110029746,3.739878379976286,3.852528376579979,2.6595196198536297,3.741685279326431,1.4001915935213927,0.8197280369749527,0.8450540469148493,0.506757819298006,0.9619389177906967,2.2289439133511255,1.876472531054666,3.102466076256297,1.8956559433862763,2.223512948128344,0.2003405187021845,1.1628782189940134,3.969148850231743,0.29847928027892046,1.6202336014571606,4.283491184098739,4.438928464199816,0.9045435225230214,4.751542557233583,3.7543587917900534,1.396302995382227,2.8746302442407745,0.4334681305425869,1.1843161771295307,0.5889862540800983,1.384384031978444,0.2660115092959059,3.3672345983724963,3.8626079055778826,4.428966568360697,0.31479245277738044,1.2264104647842622,1.4963855956851047,4.859362429455069,3.8517853191682248,3.389006140797304,1.2870893679283224,2.702482004356165,2.2496579828644725,3.571712170399376,4.892387119636492,1.4088625733503246,2.3902169750668345,1.1156127830697748,0.6353718353587279,1.1341386844527745,3.983143266714957,0.6652072447552071,1.971754120584488,4.198055438428234,4.151438883338945,1.661013989156882,3.691765026719931,0.1006870602165999,3.368951767065668,2.1679317614426,1.5574531279811865,3.5500946762489614,2.3174107491706417,0.08895183378450633,3.512117204870382,3.160001366649472,1.1712054140570272,3.8012747945400194,2.7703089115929034,2.7912021484396075,3.777310844649664,3.1010361472050807,3.515552149218787,0.08896690584042632,2.6911459664665816,4.480767949733078,3.1710579888291113,2.7164669783506836,0.4170101133035653,0.10696062031322451,1.9799181966592105,3.9876000586903917,1.2629938907576277,1.6117165543759093,2.3707322282862995,3.988917675464444,1.3055689216058142,0.6970774254469081,2.9395899823812064,0.9117667728535017,2.8520087455627943,0.6402216946435657,1.3261047049051033,2.3731420960454064,4.973684341736915,3.279603497042335,3.3268493405594723,0.023586024880173362,1.3837354301874472,1.1123848784528734,0.5010440107707936,4.874563405897845,3.5226852161762725,1.1790626274506322,3.331622716104251,2.3602961525575505,0.3453116657913424,4.031719383663828,3.979420835505106,0.8297773003810693,2.9429691236799647,4.199270861015454,4.182169945825543,4.240164619258929,0.28943691902812096,0.5674763241915437,0.7346896373918899,2.8179458463949203,4.413234150342119,1.2254747620135176,0.914455942215453,0.6359402326532282,4.069621542019663,1.5274851333427275,1.3494598294157967,1.128983916366172,2.633728766529164,3.5656590783925735,4.851105108555198,1.197738305535504,2.6371767967698787,2.727641554047666,4.064207022159402,0.9290882020627156,2.2081022957605914,3.504925475904206,0.8159890062139552,1.8854524428383856,3.494172404191601,1.3990748126025643,3.8605197139211866,3.7046590583941743,1.9509660741380497,4.470349657544006,4.754248417813671,2.9791319924763804,4.790762095574646,0.8799277484187751,1.839196300537722,0.7092751405245967,1.4181907522746484,4.6421090059473356,3.611222332951315,0.7356784254909321,4.9953765205657525,3.0130229904755765,3.0325221220771894,1.565893244394565,3.683105421920315,1.7837177397634119,3.2956830446577423,1.7856114745153862,1.3804675423741175,2.573122090848762,0.8515806617222177,4.855395948253979,2.499350631503181,1.0377612367973454,1.6359697028061482,4.323854145106924,2.9358316192647615,4.005566351394271,0.48287846089220765,3.232217076770935,0.25496691409287453,0.9513810985207038,3.5144192748421723,3.2676748177187287,4.464385485028418,1.027756830626837,3.2890450913633207,3.3602894006397035,2.3774127581474747,1.2716245706391505,1.3761347438914862,3.153782012646289,0.32063077865071343,1.0853279485870537,4.5514162179853015,0.9129204309184757,2.008737917645498,4.204567207992116,0.6079156260912277,4.742078669143756,0.8334124179189784,2.6754149450125144,2.171798166407106,3.716295511922929,3.2926412420896845,4.947216309760813,1.2204620901216512,3.6690146027154116,4.515025181025884,1.5852014172578166,2.6609807580007883,0.2916697447525163,0.4482348018768656,4.609925098072197,1.5641584804822084,1.1368021769148007,2.9594966808578094,4.3278744435844345,3.5634833206239325,1.7452212235964504,1.0106624354499683,1.2372177136102191,2.4190109988395267,4.167690895902999,4.37125758947815,1.3686011865687597,3.293721616814711,1.0496977271706665,1.6727015124309208,3.465004517525918,0.03938583237697024,2.2074134534371526,2.1835363883185432,4.779999244119156,2.3767532325479293,4.255257783318002,2.856573992908087,2.526749822999421,1.2070062961750783,4.7367622933426805,3.470886635949931,0.7995584283729973,4.7767707920654985,0.5183074321796421,4.5593824477749525,2.975515395453907,2.294238707442622,4.948489809980005,4.430730145804338,0.9902829672184854,4.022135187975577,4.511101197563474,3.6752128818374663,1.8629082075087244,3.507717628743583,4.675261778731618,1.8877759278061146,1.528570703227582,2.0536140409096326,0.5445574284616639,0.3399529226560938,2.5074840457358794,1.29605542003151,3.097837504374965,2.7759826148153586,2.6967575297321877,0.4008086587543791,3.7030026326102004,3.744363656744584,0.5617540501305285,3.9945246815772792,2.539700316643562,3.3694128065755846,0.7217273764981458,1.7589214638075668,1.3358889334452895,1.168721324381683,2.6693065968411345,2.052212740881836,4.564991761505298,3.370948767738593,0.0194196072976216,0.9839457006095231,3.9686018488055206,0.48459283807209763,0.5399004969638377,1.0477830615760297,3.0427537442363173,0.560111763747736,1.5702837531170333,2.0913286701073353,2.8325095211713625,2.8002311647845435,2.4376983736308544,0.5569828378685027,2.9592759413153438,0.36730021659971634,2.66672115330562,2.19512824749431,3.3233713617374883,0.9336946763995047,2.2672789866473586,3.9627904371995237,3.7296417990784123,4.583302063958107,2.564872142972087,4.216964214101299,2.9951544489696555,1.675544332876322,0.5413047086738076,0.7852737655471809,1.6676720148043866,4.710232553866338,3.326155422878637,2.027683417129438,4.812428171452544,3.5629602070146946,3.8881588731015713,2.569470880972653,4.831250356296646,2.2039258206729198,2.6634759494792295,3.906154342223893,4.445614995996881,1.780535187723733,0.05790593000869704,1.4778538460320811,4.181040070640265,2.456174144160012,4.273143790351098,1.686061428786122,0.40600159829901616,3.8644356479840534,3.7383914038146324,4.769873133190625,3.442037691406563,1.9597767559706125,0.350000900308991,1.7500945062610118,3.623854997147593,3.410933537435752,1.8270846186726741,2.563913781301758,1.691771344306806,0.7340195086755552,3.153156707572644,2.7140082325907655,2.467419036493009,3.0192793258985615,1.0599444550428572,2.771386082050645,2.227123115997559,4.980271151146534,1.4476484704503556,2.489566167247675,4.627586045357832,1.8874616518438525,4.133802704389369,0.14660321127342169,4.65608774366998,3.951445914034384,1.1007526629672693,2.8135292046755667,0.7679916420221355,0.18737026031268478,1.495287290693026,0.7324255309387384,3.09826999225801,4.141145701668219,3.4204942687715576,1.201449317241754,1.9888734196630353,4.776012588708726,4.471643222030036,3.5487300169974523,1.2387502272849082,1.012337962752734,1.5694425884595486,3.678239969458036,4.565980818551214,3.059014378759909,2.895049965601366,2.9760029887292925,1.5177481282525218,0.2107828654755073,2.5781065269077343,4.081074167712776,3.0532307255561597,4.242746528468224,0.1688813525722277,4.351118802341192,0.41562688512546964,1.1332709413985675,3.6734750224748502,1.0858861123165142,0.41182274771295324,2.057823973396855,4.202333491169073,2.983621876475633,4.130840019783722,0.6518471103633183,4.125655173576222,1.7295100740063252,3.7558232236733478,0.18698320078551212,0.39869130207238923,0.9327870314566422,1.433427818412678,3.817474645218113,0.7170242958769912,0.0397670825491081,0.2588725810189807,2.440804996365352,2.1622416869413676,1.43080236250399,2.2855814749809134,0.30854755402958345,0.586205239988713,3.086293512632863,0.36061012745133403,2.3718509456310475,1.8201721133700144,2.0146762539391294,2.2640258930615333,1.304271626508482,1.396872165726033,1.0316455050737383,3.2739793549858573,1.9700249213271226,0.7640040379509039,2.0906848839875702,2.8548496593917108,2.6042918902547574,3.436338568659345,1.6186740955134626,1.8596290877034127,1.4211892348263588,2.1029691319682287,2.041395764871967,1.1260113909546487,1.4188183153423906,2.0841916206579434,4.659352054191551,3.121154502788052,0.695241110471565,1.4753313583202998,2.0824697538021884,1.0656620848135911,0.2689979913151441,1.5161917467465091,4.861093787375564,1.9537599819605034,3.434100809220675,4.5347896707430655,1.6860943797677708,0.2921801636379817,3.2407622052025586,3.770621598833049,2.79609084783617,3.466422819826005,2.5581225096764557,2.355225132033821,1.5955087019992076,0.16132944889284295,0.047345707296002626,0.6876051922617987,1.159951657083349,0.4243280554718454,2.2835367477854573,2.844350658734902,4.913125059467904,4.540983537828495,1.7293985684446733,3.7943281216885074,1.1729914315763235,4.84203187497635,4.8733612214660385,2.072057553384974,1.8845140140440964,1.9335543360859841,1.9721665508900454,0.41254422636793575,4.558611024461321,2.9595472910656895,4.876340908489167,1.110934743521389,0.004252527040558007,3.564951506273877,0.22950023994611102,2.298100662739654,0.4805868120670975,0.9164879296819362,1.3167299542163868,4.217666617972707,0.6304438735754458,1.274528345069631,1.1476210779145934,4.662772304643625,1.1964581733362367,4.529562212784086,4.640107030755761,2.9872477861699576,1.9573109536883482,3.4313344291337335,3.1605118377047523,3.9712711675086707,4.69928702138729,3.601804105473101,4.773627931887063,0.07377924355420618,0.15591290513195633,0.3791449357170895,0.17973882576256206,2.8579053370881056,1.7919412691194148,2.463433379797432,4.819499839166542,1.3026678963548854,0.05799247779268879,3.250493411299813,3.6758367444304465,4.989350248547301,0.5689070937655971,1.4783530428613845,3.082373304326713,2.1339820512236596,0.9562332598987122,3.884047675834278,3.4376217804635765,1.6542963707066116,4.119247988458615,0.10438807808921924,1.2814523198347127,4.515714947219191,4.900833197478863,1.3892104565002483,2.732207390655649,1.0491579958486852,4.099957690144498,4.413860618144161,1.4535168806758791,3.8458213968252943,2.398276219107921,0.625849611458521,1.6183400445556884,2.9989651929020633,4.804657781980084,4.785096407244826,3.7539537412383925,2.4550994462279565,1.8132713947399526,4.428529542543358,1.1946831015538484,4.572053066505544,4.113655727508808,3.0918523467754033,1.1430696949727726,1.8905665889632806,2.289096414567137,0.8383691892037881,2.0354359418208254,0.4885139757523582,2.6115608659495324,2.236828207646957,3.5441324348188283,0.22519811252833088,3.6473466498710705,3.7156677384605885,3.4357127487701797,2.4008969061271976,3.7282340448826643,3.056419378270243,3.8183044910201436,3.056581659581057,0.3289055793098006,2.4041428903225603,1.4531974041225149,0.9833153357793423,4.992351711261589,1.3234506092235654,2.431601545498947,2.6065510755121357,4.452447028971346,2.39305930040973,3.842378652278539,2.5311812653129406,3.8713343562320937,4.084011537672069,0.0742203887919024,0.005385454163797654,0.008857064017628868,0.31871801384939946,2.7515394481818345,1.704721603554139,0.03091420036783865,4.340652585255235,3.716807116011074,0.5798732224818859,2.2456242891233402,4.60276658069948,1.7990888306061048,4.261943642985244,2.6282479865138586,2.1276420345749436,3.9847657391032563,3.019440551008441,0.6685277543796442,0.4092358186303757,1.3951647396617373,4.924805251349611,4.189430106525488,2.9798466567848783,4.793485239487547,4.454843476191144,4.099392236865349,3.267807432375913,4.736441013278131,4.119142478895209,0.6032884068763478,3.657973620893713,0.3084507325606589,4.6694177778763315,4.933692054897417,0.9716876687108589,3.550894345012555,1.4138541229410306,4.029841354638101,1.7256535828402586,1.4074928268340492,0.7035376379680991,2.255870672644579,4.463233750323509,0.236405274778706,2.6454332338820463,0.9017673109236846,4.057169582700806,0.34002550502683526,4.214694969841717,4.150995500330149,1.0805403940493152,2.2230482214372307,2.018639195574284,2.617388660798663,1.9234485142817426,4.016482638958372,4.92843699995086,2.9451352662586627,2.906505996350951,1.4631555655196515,4.989862378397184,1.4473500004427065,0.3756983650750678,1.9482870430882004,0.5626056311827166,0.9541630054979489,4.941745261007603,2.1574800806238015,4.291849025514672,3.414281055576277,4.0793508222790145,3.9677107655920842,1.6509576408338034,0.015898106813648782,3.059321450045874,1.554271977762256,0.9982676646899757,4.590159064365133,1.3461979275116287,2.0164398464682254,4.221448151012438,2.230706239171246,1.435802307690247,4.7892670652688265,3.8328483245921854,4.28954547695796,0.39522212099622034,2.4466497988725666,3.8687271534925136,0.19366753384930546,3.724394772114794,3.2051494542517354,2.837543628879773,2.0457192886058118,0.9162270715791077,2.094241774500424,0.7976601294758412,2.483060126980252,1.7443199795479458,0.1746586506211234,4.38061815037188,4.765489640067035,4.237483326862421,3.7953021454972005,2.1578146092030126,1.4000413066365835,0.19099799130371964,3.0854695707173194,1.1398170334950009,0.4405623472589615,4.915969815596703,0.653341811238255,1.2644561543538302,3.450810510349865,2.8341027462851454,1.5838698946520657,0.7758333904309722,2.8352440818976197,3.4084862174631203,2.164852947044559,3.111223222175019,4.400683106188539,3.3007232883837077,0.4637801586951573,1.7419782895906655,2.8330957755368558,3.6847933109611306,0.5840363290933526,1.258714381268583,3.049906801786153,1.1228457801729186,0.04015534313314695,1.7634461394020207,0.5429697078144458,3.4308947524236433,2.45222672618954,4.436416944852048,0.7858895445798564,1.3821539984402964,4.514843611447057,4.370340953815414,2.8395661574613564,4.4523058285814345,1.3198082617118778,1.550931909973653,3.1846720834094744,0.17608187161827327,2.513742548379221,2.763736085796853,0.37234771724156346,1.497159701143167,0.16750706057640619,1.8644837654753355,1.1601240701427562,1.5471049623618005,0.27535362694151355,4.919067163451459,2.499379567021202,2.2726352568841666,0.9188264883703645,0.699908163876185,0.7655094174698207,2.3055504893028234,4.88191030625937,2.949967163760726,1.68585798401785,0.47625614611623845,1.3843527248961096,2.5393324926896343,0.036163307697025804,4.251157416707263,3.3917104872969475,1.8074805819395723,3.3021276016045045,4.274620608818652,1.3733024379240988,4.290081751295035,0.5408281807294701,3.2467519201294293,2.669567394315954,0.5150619545529322,0.11189444473551635,0.7290460246548369,0.4675615992605775,3.6610971127360417,3.877472335671049,4.8361657073962006,4.702684615198708,2.523601852344184,3.043187374275295,3.952744749377736,3.5775201798765655,4.498009725877532,3.365150345116712,3.9000582550091654,1.2314362480134722,0.17533668199386843,1.282414191119392,3.7129384743369087,1.7498509781154559,0.9913797853125206,3.1370827587697034,1.5607133864081824,2.9544996749831984,2.659841824017437,1.706110874912864,0.923704758502043,4.674998650050467,2.9479044260522103,2.720505624723464,3.856825768341645,3.5393066103852036,0.7406786752418404,1.5025478814189464,0.30007042097549563,1.605212338177926,0.16881402462444184,1.459592849740613,1.696132589256918,3.7153235267159754,3.585179606622728,0.7924946675605415,4.905763903950832,3.842818122891484,0.7618476087587256,1.1046822161933678,4.878128347522504,3.250524831305621,3.6356941751072904,4.597802879389733,0.31558515669153464,0.42544193488818327,4.323331847234819,2.928822239060982,3.4420086305912143,0.31209636125566376,2.085567525300518,2.001114014351467,4.508612256944804,2.556922850869261,0.5836394147923207,0.7802573281654712,1.765525581120777,0.624248633999609,2.864997689992842,4.011988267812285,4.304503801143513,3.3460874729699217,4.041938015844753,0.6274478152065688,0.40208536254927707,2.081954383794825,4.006031189969597,3.859249580208658,4.108030323415216,1.0003686797467704,3.90206885683868,4.309618902193626,2.220128218897659,2.483564478954836,4.720299481304092,2.876723939015763,3.2670953037369355,0.5314900749772722,4.14963712559212,0.8836662439092535,0.23052784111792568,3.496384823147208,2.233842603168623,2.6100336305123673,2.7244525454003607,0.8633704431696232,4.030770300430452,1.2427809132502432,0.7264678209127973,1.6705512122663713,1.0304724403970855,1.2565847543768838,0.8080687354000105,3.9884216118288696,0.5165541187733547,0.9292747936576295,3.1052442269762572,0.1897916796169563,1.5524367056713706,3.496116091177568,2.23523264943473,1.0268041760148139,0.6830634002112534,0.10041691966027222,3.357851188346501,3.2767444693562187,4.254768822070352,1.4026127589302106,3.9560983881124487,2.7914534363288213,2.0761637182206414,1.7791483252871387,3.1797187953437103],"p":[0.7715640116906435,0.10048244281786789,0.3345714769562267,0.5959006967595211,0.7071395471629602,0.03279290635845644,0.49547647544937123,0.9785472208535544,0.10306208708140008,0.436267636410389,0.27781241674535107,0.3091856716643613,0.9605124814817116,0.8441895141604006,0.6230206035286809,0.741757013800491,0.9795365157823004,0.849591154825516,0.9108409802987445,0.6754731549607256,0.9913101876968606,0.38816949695704905,0.8958424036482646,0.21234650959676404,0.8722055885861204,0.5647959899828312,0.4296352582163574,0.07164207722363813,0.009698322035556428,0.21039819141938976,0.6286115774108403,0.017889879434282774,0.43956165751191834,0.4257838091239068,0.6143902094506268,0.1448852595327208,0.41139569406907794,0.05248283632100792,0.19426726178667608,0.26680629714824544,0.9326146692933046,0.7053913710676649,0.31907145768047895,0.46719908752467165,0.00927441000608109,0.6846031105963328,0.8113716081513458,0.9286329483658884,0.34571010760924303,0.7075058405506991,0.2582290533439293,0.8099658232496283,0.6542114907841163,0.1223938565630398,0.8740275932382202,0.8777779723542498,0.5205222073908597,0.7048262722492462,0.32306306469964485,0.4100246930911726,0.6648136978831782,0.9879605369073672,0.20531450834307985,0.09554062888715209,0.006279552288172008,0.07100762840337826,0.21959438855690094,0.9897982754724122,0.6804198957708854,0.9637935055458844,0.6612354570071592,0.17388250214294532,0.1859369553831931,0.1861813421330447,0.9752108264590258,0.4356140439510894,0.33343853503572185,0.8475712841135863,0.316647342229621,0.4117459367259013,0.15512510050549233,0.06435264482147751,0.11109850553900613,0.4425369287280654,0.9999934829858561,0.42586834817916586,0.32446770375374556,0.47647254672709405,0.9310676605717254,0.14146566684530137,0.4303117120940647,0.6735326689000769,0.1372565047881451,0.22744269352476598,0.25740294626683147,0.8113367610554791,0.6870066383341493,0.9346500490051814,0.4947443028084515,0.8597710527125482,0.4432787370036495,0.3836630023788479,0.2884677572996055,0.38597310213479363,0.0723340079727377,0.2967028016261586,0.9983547228300464,0.5876411870907214,0.765845313135918,0.23117827063155305,0.7839746258525813,0.6213374949687911,0.3944996502353737,0.3494669605583811,0.8768029323087176,0.3523823671733264,0.8755340642944052,0.3408936273888945,0.29058479412683935,0.23281476272275525,0.3629015538715956,0.16620813550068303,0.6747975947942455,0.14168718566336636,0.32643970311425163,0.5121753882959044,0.2159809442092131,0.6528056030274183,0.3765043273217197,0.7665210146010522,0.527545225945657,0.8939337795072584,0.39790421183887803,0.6457055096446522,0.5277914728990314,0.8322992356580114,0.6637335948486902,0.5355520574698958,0.4438939279517473,0.2058047228859825,0.1988558636259392,0.2280310283843121,0.3165667161893839,0.5100191323514855,0.716173405396195,0.09580083061930122,0.6086816338065382,0.8597852008861817,0.18932841189271898,0.024531918374021577,0.2047286968660318,0.4499197635270795,0.3193958204575571,0.015144278376994835,0.8475346725303126,0.7709096935665884,0.06030347556253646,0.2665459539087862,0.46255995737187083,0.0927146758650701,0.48031984086042523,0.2217393348940404,0.48594117201883713,0.27323097302806243,0.6802257445169031,0.2575958121941231,0.9871993905172081,0.5857197175283495,0.195652606503546,0.2934697046789154,0.6177441239921952,0.06592582699297034,0.3220669235098188,0.6481224633767861,0.526862842596165,0.7481626218748207,0.011018237163824551,0.15290968765019253,0.21304866784151533,0.4246027212908674,0.1515802628370675,0.8109532814199356,0.9366059554616437,0.004490581926608339,0.46768552284829923,0.600015861757976,0.6153293603146888,0.189170267191493,0.9023905613073635,0.5865063476683503,0.8790409233703667,0.7029567354672188,0.6996641509974428,0.6292342619348985,0.125518599298865,0.7305430969027231,0.20590984416668223,0.010339988719011872,0.29871619521147186,0.7575817547264843,0.44101845033849507,0.020822876726677375,0.26426900195735237,0.28033504532419773,0.8884681652427155,0.48871271934178107,0.09541088452096691,0.05241215059903315,0.1410761637826612,0.15961484692216055,0.5202463426324546,0.22124763074046316,0.4194833352632634,0.2973423208043928,0.5508592676146804,0.22553592007755596,0.5132209271785118,0.6039034742215785,0.9008717838974889,0.8043613585863869,0.6008068578617431,0.9331470636507491,0.7892246726060375,0.3817315643623671,0.6879050951378094,0.20226118323632347,0.09261400295311462,0.46901555788459004,0.9480242007538926,0.2317532206229138,0.5126913138050349,0.4141293888345168,0.061860691290791525,0.7338133958441784,0.3715250598223927,0.20663011472718718,0.6804096454924913,0.13810560911044267,0.09981577593989277,0.4442291620994667,0.9368548391729021,0.41942614054070027,0.22717205926087947,0.39964969192018174,0.12209872085132067,0.6285589054715122,0.7820159506731676,0.2200864776217646,0.04379953537362402,0.09300482325690096,0.3040651769162437,0.38618033652300343,0.7376162723886053,0.34423915339629074,0.6803807434094533,0.09148102976345318,0.8188815220722301,0.9985142834487117,0.30509306077119036,0.8493499358785526,0.38836399174354197,0.7630509918457471,0.560804955161115,0.6331695837296769,0.573613705313011,0.8684312425138663,0.9441724715027939,0.7385549949777395,0.2395645486269462,0.05337448976743775,0.19345302141229648,0.4415264204049585,0.8327064600374618,0.9374144457393634,0.265903533585534,0.194571338835821,0.6784691724003535,0.13926380518707493,0.47984081923264954,0.15648714223279536,0.9172157878599203,0.15879362397737218,0.47073426877040014,0.8360609824306529,0.8599062096004149,0.9171501137654958,0.5717405106675368,0.40699428277264604,0.9725598519074776,0.8755089997369092,0.3775904176310658,0.750607415990052,0.5540279739249134,0.26954924234759026,0.8380928296829369,0.2127334445500193,0.4388184360601828,0.08331509456291375,0.04500178581906522,0.29679104745944396,0.48102035154140155,0.6823088200225691,0.7390972150949942,0.4873682072555723,0.2772451638565361,0.7976587525034129,0.7446771304031974,0.3157746154273495,0.7998380745757758,0.5664504024549972,0.24730072249782853,0.7802610195161095,0.17760834479408727,3.0344661065662137e-5,0.7662283164107688,0.9034246194791999,0.39363838292789843,0.1474706676014126,0.5079740175115923,0.8372912333374452,0.7654312719709806,0.102474915873497,0.8478204394387745,0.7613921828956884,0.2887693635601294,0.834650149588738,0.9600408405319534,0.9771449293299646,0.26217987222588524,0.2890908198312532,0.5942466734873528,0.9738766193893673,0.6549349594004721,0.723663250053088,0.09792912486676575,0.578311194921852,0.5432333046883433,0.14788279637010016,0.651021875156593,0.7614579243165458,0.2602252091500705,0.1830009348655326,0.3556328403141682,0.8257845481235611,0.1676635144073524,0.4601802584627972,0.2251544730100552,0.15437660882154125,0.7464181905678786,0.1747139209551385,0.889924517800402,0.9980014018876808,0.7154212608647514,0.5579530871266747,0.6709221415348243,0.6455412935687623,0.41263605134078607,0.5891817135451163,0.473412847718387,0.02297323759311154,0.10913168746198898,0.45890191050754026,0.19833528620283958,0.061849283711033154,0.7731976428962817,0.8571233709900556,0.1986956278061749,0.7796180673269362,0.2521294851919116,0.13454853876256068,0.37191707824703,0.7269629627113805,0.1758026066731111,0.5119979978838423,0.4161089265553799,0.31409303483187,0.8058823180498649,0.21984420352847378,0.7369434915111386,0.43453688125928625,0.9156747146069097,0.9096835315995535,0.6074329161492422,0.0732054308400325,0.8476563765470784,0.9511322032271357,0.2540345825228145,0.6630761708382549,0.8901270672196675,0.2786105411734019,0.3474044290117426,0.013560510938417147,0.24724620068976622,0.48020451496905636,0.5828162399924866,0.8854268613561858,0.41710491748405865,0.17367369324889825,0.8273221329377249,0.19615511858641965,0.5196909468287487,0.4769058275942213,0.9922388557763577,0.9161622206377891,0.974925217117679,0.35357855502726987,0.3636605626954874,0.3961595576247834,0.9979783986188566,0.07499245721075654,0.3228309378605936,0.4092681998476393,0.6326552110564065,0.10248641726021468,0.28337319755568013,0.7691281905324179,0.3716752530044449,0.5036766439788587,0.6429371728114659,0.10671013507975147,0.0008097202065766584,0.7649532020107028,0.9442550935591518,0.04297513293901867,0.7998767796263033,0.8108551690124348,0.24292158529859864,0.671594981499412,0.08926549576724585,0.7823892615371926,0.21074122246439875,0.07619143986092425,0.1095859057044335,0.5992880795359632,0.802592807414811,0.6421342695436945,0.48007408877808455,0.3637088935377635,0.052129429275000305,0.7487274873808196,0.6663403924352791,0.12384778303037591,0.3709221662855662,0.7186836650233719,0.636288122015128,0.12353043770475014,0.6318687302199582,0.35634550425911016,0.5327419183035229,0.5973163417942207,0.7605549182986744,0.8447314173949529,0.0796292888297574,0.09837267805983418,0.4819067881871293,0.6796992172636265,0.16304164051318049,0.6990765301856057,0.7168650139895585,0.5729281216601618,0.330022233224637,0.09969156703703375,0.05490439594789609,0.2469683097703701,0.017500163280987913,0.461218664409482,0.6310257918691948,0.7178473825877669,0.8062706350579998,0.8361093046216188,0.21398481823036275,0.4572861058253219,0.048452193635169616,0.8118341845619317,0.038704159614104006,0.03143993336474549,0.16158617692216626,0.7276429912003697,0.34997178445816446,0.017590577351004555,0.6684023676852426,0.9445191411086526,0.8180618706272873,0.5527170265782182,0.19201609027483046,0.048120228127689124,0.6084859476439193,0.4964513280237104,0.2231422209226852,0.11160492517700771,0.0205586153052848,0.8526817611374347,0.10158982019897489,0.304153368864301,0.14239663346206854,0.11454955929557675,0.28818815686987564,0.2805358422044637,0.1896088990099436,0.8189889780242161,0.02761036052851673,0.3160928918796364,0.06973815774867531,0.8946458023993147,0.87436592425741,0.0634060965399148,0.47257499735355624,0.23687032243638195,0.9854294131528287,0.19493137638219005,0.5470087675705055,0.8675863651724738,0.1782322841627153,0.3659948380376947,0.018458866918557026,0.32978888360219094,0.532433024178798,0.7079885836122233,0.24354548116308328,0.09917997309110582,0.4180217029617821,0.6370385424723719,0.7515829549116206,0.7666542751688985,0.33846967675121986,0.32804327867819705,0.12514152702221137,0.4305133026049013,0.0008469679902691762,0.5384921911087004,0.564428533054314,0.8007130485715819,0.9271820809659441,0.5493483287160121,0.769818115247821,0.16808968723399542,0.7673757186222445,0.12829741639029435,0.5167675117924113,0.22927882198994265,0.08886830036222637,0.08306304453701219,0.6217230207103244,0.17416694704891666,0.18600677146504108,0.08463924848378679,0.28418466126317043,0.059904785496655455,0.12756454210076562,0.27999356857078794,0.04226104229707239,0.24396372644622044,0.21836419701032916,0.8576616597379865,0.207511469484289,0.8094900904806055,0.08954197711863854,0.6103526627139539,0.8944712970419233,0.4309057798853486,0.6912616758709731,0.2928835933835827,0.07715995519587482,0.9010312528694142,0.600599819168834,0.7994312917966107,0.5638297009894375,0.8122117204291122,0.32333342306049273,0.4707666223248128,0.039225392612189935,0.8886149512765105,0.5800247451583542,0.02987021147743918,0.9640441127702828,0.6760529818011327,0.3999006509488492,0.7344236726827027,0.7267501636318199,0.13905924387479862,0.9039984093176874,0.17717460022699427,0.4357470962997223,0.5163028832860956,0.9516239344243091,0.275214199450071,0.6451546295073811,0.9545083839551758,0.17648612537177044,0.30598224170487365,0.6675159732990474,0.9397364016950052,0.6152519730658284,0.38613217908449027,0.814409506659719,0.26192898328889247,0.8940571346079591,0.05323357662730421,0.6024020269500767,0.5880260481231003,0.8630713372162064,0.05449700382625,0.4207113621843961,0.05992463984712604,0.4229583380517232,0.4324839903104345,0.699520341041258,0.9218745537201574,0.69401286929892,0.6043024622267452,0.4056549242189236,0.5585848152316744,0.778519897735404,0.7770216758410293,0.21091482533700967,0.8905125774265326,0.2988564689834663,0.059847201720532706,0.08874046278447256,0.21282785460516074,0.09608929422888446,0.3816565066042237,0.3226188597346977,0.5970521159484654,0.30747719150701625,0.7167936789682774,0.5609297160210291,0.8345262580664408,0.3193701740120598,0.2098804165327781,0.33436300821631804,0.7130109654166299,0.2682400386523307,0.7583349690938039,0.9220861055012077,0.709381490692828,0.6438374698141438,0.21623168760014555,0.2930260564233378,0.8302590319827039,0.7060832392214957,0.2852664765196533,0.6907884006781044,0.7273244141538502,0.6585537336799776,0.7612441540742858,0.7360097272339134,0.027096933044272964,0.3000130525593654,0.020583829486511496,0.22993926752538463,0.40468088366304,0.06316130218594496,0.4126333080850424,0.841891260098929,0.19186683391429193,0.1255861118806323,0.36685195763842704,0.8395800757961893,0.722864416413189,0.5603353302275487,0.2430342119448523,0.7626619465423794,0.4768211652803378,0.8546288174457555,0.5742326459400551,0.5886270320014657,0.22775907846289378,0.5018662234540727,0.9827007767073621,0.8232327672169844,0.4759815888799679,0.5289149973429024,0.6369739369620866,0.7825303652130753,0.04422648512366245,0.7455607344252455,0.5355132943071852,0.8024153006241128,0.37158800434771355,0.39747782121416475,0.7756882560923415,0.16733085547046156,0.901634776417122,0.1934415217711094,0.013077346085814678,0.41588952240927846,0.9303023251097113,0.7402269861214676,0.0216292949411232,0.43348622147365434,0.05657456472380562,0.7900163274904604,0.3434034557408736,0.10476758853564205,0.37486427736914774,0.5387620606031653,0.501371440181249,0.7823982977348782,0.0025987627206174313,0.26202761904631,0.713215555826729,0.19509592171508494,0.7066621636566524,0.43587923612240553,0.9645748373506917,0.8578378833911953,0.23799516407653365,0.599382345655195,0.2369240191253541,0.28814275213818097,0.7573619218183938,0.27204596575927575,0.6132268311039619,0.8918734180379029,0.5606760114599696,0.4099424617494991,0.30778568160691555,0.9439321476638245,0.9219040570465171,0.5674285860166077,0.6660218832644231,0.5707165468036544,0.9043991728082259,0.6842739143672156,0.14240200613480836,0.1768892582795294,0.2994938125981712,0.8877639561227715,0.4601259462254661,0.18674988220667954,0.6209155756289775,0.6549781324911874,0.1723801616619789,0.8062810370169498,0.3001266990956333,0.5976243323061201,0.8809439806515029,0.6458322545116926,0.3318380505090177,0.11607933840261797,0.2627503697543956,0.49019739709533194,0.17965496311828444,0.11808637788949605,0.5068952109861355,0.40694875855523027,0.4771801814972283,0.8540900633493658,0.9206323002891754,0.9993697565071213,0.6286068701628729,0.34768321099770527,0.6154447093535309,0.7800567027168825,0.7865374546670743,0.3358171215384409,0.9502293508639781,0.5839782829550111,0.3435596501339866,0.01330102142574896,0.8723451571119927,0.014731617871549307,0.3762437317644769,0.9998814448265596,0.24002096407084328,0.0074718146814374276,0.25255942212145643,0.4256366469356625,0.9691069997686763,0.3311845329584886,0.0472119067266672,0.004251712704365973,0.6659296678737663,0.025663898702576793,0.5081896866176137,0.052812970886459754,0.5349432999792474,0.93503009844972,0.04875286874301965,0.2175438033383692,0.07818160302541743,0.8475187570979166,0.046065482542362535,0.6231289035640417,0.681068462521315,0.8946532837611296,0.574602465967162,0.1069831321250414,0.5260584705381186,0.0828280556983576,0.5262833968186271,0.8639853938066566,0.8286474811637241,0.3125842725736474,0.983222194133317,0.5589340953925448,0.9440312829708872,0.8092291344521574,0.4773322607842103,0.8100591908717096,0.1322997660126739,0.18504123024959207,0.9131417960130324,0.7888012866166165,0.16683008644610764,0.8689630251739004,0.7709734312471459,0.37547343554188073,0.6930421587796065,0.2681532915560294,0.5911737010981419,0.13543093726965227,0.2858057980642188,0.4444638688877256,0.69660177194688,0.35578401965403206,0.132784666146744,0.02972511991066007,0.6403281015500522,0.5631019500745575,0.2065792516137981,0.8050677261821717,0.11883328093464107,0.2875256785143614,0.2624864647716383,0.4234202431316558,0.25941314358175926,0.9271738236295963,0.7534606480953248,0.7770921752616786,0.39788869103300106,0.5790120787612103,0.6427212925743944,0.9976241453484296,0.38261857090165496,0.37338170227884104,0.10868777262666107,0.8573719972940392,0.3532996623054907,0.3105318503693766,0.9696528541898977,0.21750875630975952,0.6406287522263079,0.8293608736810938,0.8121066585887082,0.3853284641133039,0.13831593973334644,0.1331821506948565,0.479289886997625,0.038504707379950265,0.9223953341090254,0.9726576304147256,0.08913172211489973,0.1519538672012275,0.2209514365809382,0.07137534875650853,0.6767194210917722,0.4972861064721361,0.4970360135754539,0.29201424681832777,0.19008471699400187,0.7985200686799738,0.38519838628262404,0.9146273683794319,0.29876078939961426,0.9495864997538395,0.4107354032402524,0.7288032884349496,0.23314017067028026,0.8826648712258305,0.6796865276027675,0.837208610436966,0.2019271878629474,0.9797303386834673,0.5164608488078748,0.9873853953765224,0.8598700767011029,0.822503124615563,0.9148307193731309,0.04945761885826183,0.7972500347080378,0.7574628569816209,0.17336710164233704,0.3914329384032147,0.6163815569413036,0.33350975936980887,0.7362881984267913,0.11095984575824214,0.3544715367952589,0.04461130296819138,0.7780067880587684,0.9133982581697684,0.2112212695122977,0.37296269428393614,0.20434325165677847,0.8449618391868379,0.9315877611149632,0.7502409631215763,0.3060863665786293,0.027399520860036386,0.2757320910763066,0.15952216821244525,0.8607836608314545,0.20079639136570626,0.7626167653318461,0.8228058225556587,0.3774022361693661,0.045953407347539166,0.8788011134871809,0.6649845912593388,0.5991562458109494,0.9416133445489634,0.5686231765478835,0.6387119475536331,0.16942382441835924,0.13208900146908498,0.4132206626628221,0.232078338317677,0.09233135121673719,0.7467037228834603,0.7559345266248916,0.3257849433330122,0.630379252945162,0.6936799237765878,0.887348136613779,0.2365373094731973,0.2210108752323059,0.7793143734562795,0.922879130629195,0.5580592455559281,0.5458704387944315,0.39367797865218424,0.265323653148537,0.2953917244812361,0.9970276202538668,0.635619630093831,0.9800040579217064,0.4007068873524535,0.6197582132455666,0.10184171969868161,0.2288921779295523,0.8145191973637353,0.8199279087959781,0.560580174972173,0.8741836070638567,0.8460160272680426,0.5442730268073332,0.6238909689924921,0.6835372502657162,0.7618876885542389,0.9454729930774575,0.01752378127498644,0.2530693448876664,0.5355826945878825,0.7005702680422707,0.24752448853623998,0.007421254537574917,0.6421005895783478,0.5890323765641774,0.214669114436719,0.048818417379920875,0.9813580215943556,0.34305331072473244,0.5792909697158801,0.1488481317200696,0.38536798989066545,0.26404391335869626,0.4666778613451936,0.41015295878482805,0.8584698006045943,0.19840849784136005,0.6794422365805723,0.850389675005963,0.0735684813253128,0.2766436927460092,0.34836671300514666,0.3230845408591829,0.4861393819414801,0.7755434380800257,0.5414805981196695,0.06276178621528716,0.3658876443554866,0.08861275642224009,0.6526398879990547,0.7051661898717771,0.2517796870643496,0.8598121843141577,0.9893846190082329,0.16501476999501108,0.8136059193192251,0.7250566232780395,0.060537836307905435,0.7317012637947979,0.8504399613058551,0.4195427522300159,0.33113430549822676,0.3683394969870013,0.14942997576548023,0.7106981628623235],"mu":[-3.025738606459103,-9.858270491622083,-7.848598046204205,-3.4365767975138217,-6.335366833674421,-9.001897078265175,-7.600519883934984,-9.403728250622178,-6.827907565794325,-8.186700606696016,-3.1860494694713903,-3.6653960487968673,-3.515495655326548,-6.734503365416651,-4.613499587074825,-7.53829983419479,-7.731830284657708,-5.386506663759334,-4.677156538197966,-1.5298158698190556,-8.831415573576574,-4.038487691463639,-6.332390012931752,-1.004111523196638,-1.5586936035122134,-5.887841377655532,-3.691454047218732,-6.6678189815344275,-5.741295714204806,-6.649286651666298,-3.08433598260917,-1.274111186837401,-2.5691565184700904,-9.187769395564786,-0.3005004427696245,-7.631909534959245,-7.555379162407032,-9.597263164642676,-4.347162889202143,-7.783564723766028,-5.344113956180272,-3.7003671251072157,-6.236992351477248,-5.161536892455714,-7.937038709572635,-3.156333724914997,-7.808552040847852,-3.4375507400417837,-3.379084726502175,-0.7243808482534653,-8.292948367188771,-0.4202235209424865,-2.6995850751610684,-4.042956212522362,-2.8777271389644765,-7.280843676640911,-3.9116653084510866,-3.220717927176342,-6.464885092847393,-6.2504769571294965,-8.819222481509126,-7.358456074559148,-9.45565864666457,-6.44747526155818,-7.089541170767479,-6.007203966315795,-8.003281451773534,-6.514941615897132,-2.017399894773466,-5.530015452223114,-6.109221729902517,-9.680800165823875,-8.227567025272972,-7.453762850126031,-6.746459703752881,-3.5832716145540155,-1.7383836146372755,-7.1421799475913055,-9.424194513068604,-0.2426957923461126,-0.6856347770936089,-0.8563875855796566,-5.144345251030078,-2.5964334190683735,-9.796551666900776,-0.6309898513391321,-4.958123093864097,-2.699649574202838,-9.177787786689287,-7.431290142583229,-2.409454032835361,-2.003670030140121,-1.3438115694355268,-7.379076851944593,-7.144976940510086,-1.9552267028349846,-8.246410310770695,-1.6096626240809542,-5.366682783658437,-9.578700105947126,-0.33859882012013953,-4.571685677654176,-5.892142053702032,-2.4932107513482715,-2.5623924316179014,-6.139035577475034,-5.5897432207075575,-1.7833129426790073,-5.582148032313247,-2.8577533847070424,-0.5364932251702093,-6.045893252160022,-3.0475151444000326,-5.046749071492753,-9.9450662853819,-5.97402249555635,-3.2357722649869025,-2.4726313165688407,-1.9689384939625731,-5.520512597835223,-2.4839430828066655,-8.527607799124121,-6.743506238979813,-3.8202030428886347,-9.342763818386366,-2.4892304216620675,-5.693345328740687,-0.5029951494507312,-5.486262489730898,-7.359268762642028,-4.3851319735116645,-6.406733172098256,-3.2629034377034927,-2.289106270970882,-4.167973528392956,-7.739122730358474,-1.1734882506246258,-6.89174400955098,-1.226675251509397,-0.7636094274446426,-9.909710011292281,-9.399277830355725,-1.9461610741400448,-2.927766631571558,-0.016548774477798123,-4.689197929527593,-0.21288737491339305,-7.245525374356534,-7.6301160588110495,-9.301417313992118,-1.6903118169786935,-4.641113996115522,-8.257383918887127,-8.379862116725734,-5.433518834845772,-8.007986176614772,-3.2253228895264474,-6.269248112924015,-6.847864482942557,-8.654193128714635,-2.422740212849599,-5.595912294218326,-5.950920863097275,-5.635049764867537,-0.48780786565891354,-3.737610979093986,-1.1195321185157936,-3.219181108341047,-6.673829706330023,-1.9059227249897681,-7.393242123265007,-1.7888380328299625,-8.110191623670069,-2.8450884604080984,-8.538524583408796,-1.5565525894597187,-5.311223490100481,-9.780574403483396,-5.32257917826059,-0.8115303464306622,-0.32919615949687175,-3.657985661503973,-5.187641813729975,-7.430723994679276,-3.258279720781412,-0.5815543936158729,-6.703347602556318,-0.8311012096027404,-7.6574580257699925,-9.243477846156088,-1.1418371640816205,-8.68454323514946,-2.174773330866757,-9.970621210438226,-7.516573473273784,-0.5313179097726617,-5.250220355852693,-3.7637035175478473,-2.697528847474684,-6.65672742461457,-4.223979485551186,-2.023995145875961,-7.907724487066967,-6.788586060965898,-3.946143886625868,-0.41847750709618436,-4.475542940890951,-3.623522409023998,-8.652765631050874,-5.673666305245733,-4.5162630622855655,-6.755454768196849,-5.264660172539837,-5.102999691273846,-5.673397573345243,-9.18325832882373,-8.854298896037381,-6.125309781371793,-9.946807993481983,-9.696225868695173,-9.36786794710237,-0.7193361645835616,-8.596038222171973,-4.366878068949271,-6.655364295125532,-1.462771036461774,-0.10304828737533134,-8.294379285300874,-6.212492324131544,-2.913559139565791,-6.024409205856638,-3.8346474130353037,-9.85598354208733,-7.742824147829969,-3.839375256248294,-7.405513306489089,-2.3079477066371568,-9.789714418072455,-3.905107746309122,-5.759644122382344,-2.1828708733589064,-5.324464284310979,-5.0723554456480375,-4.430156621873877,-2.4243780496368217,-1.0829434971629825,-4.093961570335159,-6.762750458407867,-4.152815946434394,-2.1207586319314387,-2.339714978172207,-9.680334873376516,-3.5126092840607814,-6.835645870085171,-8.037417863154166,-9.197066112544558,-4.000172811714274,-0.19500058806036336,-4.98838828705594,-7.087129303191895,-6.77881990133044,-1.6492930090245506,-7.280388498652015,-0.4308086025488844,-6.001295586627218,-0.9113689675707515,-0.5810009291459073,-7.389626496315637,-4.778327979502171,-7.031522449696377,-7.154627517943122,-9.308992053947971,-6.966218218315623,-2.3567697277482624,-6.940632380823151,-2.4943396590864664,-4.338051579325352,-8.38671616427675,-9.58424789373392,-0.25488568407375345,-6.442871086036243,-0.25640892869719156,-0.6292732383381483,-9.439493355313111,-9.332451989767439,-8.542265122777833,-4.034090502708871,-5.668836227106122,-9.234232836343217,-9.061083630752378,-8.29637807553783,-6.75327455094302,-9.531533033557633,-0.9798648042477898,-5.4741651340939494,-5.581563529260913,-3.9147932455350287,-4.123663692742507,-6.935201086010105,-4.751677738148981,-6.526856569427856,-0.30658182553388036,-3.4573084876789606,-3.40741877938062,-2.370670347597643,-4.723740205966445,-2.7362282351060574,-3.800684809754009,-4.82648527246853,-4.527265417006827,-4.34235706620097,-9.823119940743556,-3.205565214673507,-0.6302490613214573,-9.791973511860789,-1.246093085267883,-4.131495006942362,-9.500801607414584,-4.616974932906038,-3.058483499955751,-8.795376727054832,-8.153724204618753,-8.772668422267722,-2.1029091673499933,-8.589458782011004,-5.638462967414983,-6.724129542547621,-7.723666065650336,-0.5913478329418131,-9.197646763420321,-2.301100354535477,-4.617179753398206,-2.5073902120799185,-2.5817254071322537,-9.839700206134541,-0.1711233856087624,-3.0243296909626616,-5.9718980734204274,-6.9559449162911635,-5.6738384655814595,-8.266396248515793,-6.883526346391249,-1.9806655196057932,-1.975737528635193,-6.1602116226337555,-3.9101036870697303,-2.827788386549006,-9.672585827382845,-7.115363439916013,-0.04750161825216148,-4.796919258884438,-5.173452529177509,-6.065469361683283,-2.41075823218722,-4.241996264889625,-4.3545800672242185,-2.362061653903995,-2.2368506686114253,-6.959922015497502,-6.171949479580423,-6.678158236978113,-3.053489175359716,-1.6663947113290978,-6.209292059101208,-6.356971274209833,-9.791091335628845,-9.227747726483207,-1.4429893395886562,-2.211583677511413,-4.26422701024276,-5.509169053953908,-0.3426017663147962,-6.729560293481622,-6.794707366338293,-0.4289491373502452,-6.113010679804603,-2.056016277423316,-6.934179879684237,-7.851152862972526,-5.41017773613961,-5.459042623842077,-2.573094381708454,-3.9483288077286383,-0.2514273939605438,-9.394056694418607,-6.311891493123034,-2.830378721651572,-9.948498137374068,-0.6325080749540146,-6.975772579380617,-3.2744990068265745,-4.898645549962635,-0.6100777389107548,-7.657836515112888,-4.315800912361825,-1.9413061688428002,-9.055836125261461,-1.3722198938378782,-9.007444440720604,-5.960108582059505,-5.941498082068655,-0.36027954302733756,-6.7691325634844635,-7.707571180238714,-2.317707511310423,-0.4853052023459581,-7.700795019082212,-4.136744345895426,-5.890096660604054,-4.574046603504504,-4.717747272605899,-8.834129513878127,-5.943973389759238,-1.0505852361077594,-1.2056803718241915,-4.5853829893903,-5.805078147782883,-0.1697799691108859,-5.943863831067937,-8.889301181629252,-3.040935350138436,-0.8267434710684562,-4.222304879188297,-9.414327461310712,-0.8504448065706249,-3.947579852978791,-1.5379348502071122,-6.021065649015589,-9.13238239039822,-1.8917313348085485,-4.729544432948247,-6.5281925005009,-8.232786793993503,-2.492844168618311,-2.6112646828285224,-8.182937982841327,-8.115175646676594,-8.608396338420416,-3.056823952083252,-1.4816178582405581,-7.912701296544267,-6.392940688485849,-7.400675152886993,-5.483683938082089,-2.9148474404865676,-5.1346172555608005,-0.6303658320455208,-2.866496217988548,-6.246845640939855,-0.5373007116750239,-9.568248819393297,-7.34909329156377,-0.3794223329462909,-0.7284524568028461,-2.5011346850459337,-0.9691535311791855,-7.020204638223717,-0.16459462946401882,-4.115184956392024,-9.187436828122294,-0.9874212320826459,-2.0244189991270622,-3.072456441895679,-0.49636730524495354,-9.176526261142406,-5.071524657124229,-3.577043145176104,-0.3124745459587608,-9.776632197898936,-4.3910034841940515,-3.523410488618428,-5.5603302246799196,-6.021427258087304,-5.163454920190446,-8.260845809120436,-9.676647232438532,-1.2667460898112548,-1.6745357088890378,-2.5167986036957024,-6.204989664218468,-6.756738453884705,-8.7652108676386,-1.5816153079756967,-8.810236946493045,-2.907768749089197,-8.615488035092348,-2.957453137796615,-6.828428408738281,-6.590316685638271,-4.398133134638007,-7.07278819015875,-3.71270191331484,-4.5228457318125965,-6.01015515172441,-9.750919472156507,-7.910003445981568,-5.843169228777622,-0.3996250758058961,-8.102658728247818,-3.0185911702721824,-0.33270564796276325,-6.764359050796087,-9.534846717698699,-8.560379727346149,-2.509193434783299,-7.759908789598493,-2.7207188310490515,-6.189434508450926,-0.33582149214820056,-0.9141624954971128,-7.927235593272726,-2.2233465846465372,-7.307066580363093,-1.8980260940863447,-5.709612213052737,-2.0983509583310056,-6.757510521934811,-7.705460949101768,-9.649318143755021,-5.237670221105473,-4.533067917728745,-1.454361248558591,-1.6423470168518484,-6.987034908532066,-1.7830934806535859,-3.0803478941466844,-4.173293593406699,-8.161159428318406,-4.229086452139141,-7.854081875041952,-3.9696110153859165,-8.251903022426726,-8.50832495788179,-8.398496053730092,-0.2134606022198482,-8.934705724142804,-7.01186947112618,-3.7519989551462563,-6.967008182712176,-0.3131805604566007,-9.130053891803902,-4.50869760710537,-5.485270872367389,-3.976436834253565,-4.506795678869122,-9.761416147833534,-0.14492787513521677,-5.9941284238501975,-2.8025568324905703,-0.08800057005373896,-1.6395990364328794,-0.8588196357917632,-5.966420033668173,-6.109283893561999,-9.319886971013956,-0.7302990708103674,-3.1906580020450903,-1.8659719585238554,-9.38188318517809,-8.455765408671907,-0.7481663674514683,-4.563869974384735,-3.1969294468411724,-0.802013141612381,-2.418795874689572,-6.271851885472504,-8.625561895440798,-4.813733567521428,-8.206090105226572,-0.001696547029914619,-2.9245677910447143,-3.2906666993658273,-3.3259305068103595,-1.3314875203888255,-7.318838658240095,-2.882188542012347,-3.4775389310228233,-5.270725740638415,-7.9272271751025825,-8.69868855735156,-9.608201249446056,-6.323614133209981,-9.316172017491018,-5.766975358207549,-0.426853059674539,-8.412687593192747,-7.1725734530789005,-9.306838605691432,-1.7232065050576306,-4.390757350021424,-4.523732191583636,-1.7481670511001868,-2.676754003692141,-3.6022288559136717,-8.08099133744727,-2.796447118737686,-1.8992114496335244,-7.168167781960593,-0.2526617545749965,-7.932736270750434,-4.315177395218575,-2.5908369636224915,-2.1817599275809085,-1.474674351789227,-2.9279925638317295,-6.780150734483616,-7.677816221452662,-6.009273186058404,-9.701609520050237,-1.9526580244363734,-8.891828364824345,-5.258626574142681,-7.52283090441205,-0.20206306468859792,-2.109650489450159,-4.069339379511739,-4.7115892023458255,-5.833753917813729,-7.544635134594964,-1.0653213437384257,-9.794751074672323,-9.091583247462161,-2.717345094077226,-2.0801866369312005,-3.742404809200681,-2.4112672006019564,-1.8314322893832147,-1.637892798553311,-8.309891310956047,-3.8554703864294515,-1.4078260611229187,-9.201230116196319,-5.197165026582377,-1.7778434165962387,-8.098272655983148,-7.366143553025535,-0.38263597727379306,-7.721997173166583,-8.362818204873895,-7.717209302153149,-3.838092080648061,-2.8010923008539557,-5.812766282208026,-4.9474036209670675,-9.696149261402509,-4.469427030312005,-9.570517355966047,-1.7161085652011177,-7.955797021272084,-6.254369485931715,-1.2556518623364532,-0.6983119595013765,-7.421848640709305,-2.3512258991320945,-5.223194054725237,-6.237572678425202,-4.2765373878065915,-1.4966490043611813,-3.423988042055348,-0.27299407650571705,-9.891604890483464,-4.837721326587849,-9.616833732707093,-5.587705643965119,-7.943683839093683,-4.571854252355932,-8.462736562450333,-7.193747050015087,-6.193351981670792,-5.439092319221858,-4.50350545236793,-6.150179018913251,-9.212306912716688,-6.73291671122217,-8.596204299445795,-7.3820160064703515,-7.948813733854124,-8.012325928947101,-2.341537408043002,-4.435015247479983,-3.2714779999856725,-4.755154842262474,-9.870005415904668,-9.808218402673457,-1.8926803842114515,-0.8556186489108941,-9.277242274401287,-6.303558592328271,-8.185906729819457,-1.1279284278556356,-9.402871322828643,-8.85543083906908,-6.945025111228982,-0.9573337224395462,-6.925964538427576,-4.032055538144297,-7.120244533121243,-3.4138843966012833,-0.40240550384730067,-6.439005687266852,-0.8312369186800384,-3.8292583908554922,-9.634269074582644,-0.8871164733974712,-4.002607529277351,-5.566042748870945,-4.375022825908879,-0.45117716649159423,-7.821084631637372,-5.872739687072337,-7.629342380848854,-2.150877384086365,-8.478948647501666,-1.188223800893966,-6.466254929769411,-5.146720966643019,-0.9687888300478131,-2.0174852809903787,-1.17906883756695,-1.0187392334665701,-9.007123239212593,-5.751150646397987,-1.0264140914578257,-3.159760053688654,-9.619173489940852,-3.8390739356216463,-0.14564673432328368,-9.798962340350707,-4.533480395422853,-2.1396226439857435,-1.0328859962766623,-7.85925590087718,-2.723395582751791,-5.789640991668101,-9.08425483043297,-9.558970270176372,-3.264290780192609,-1.5387471106605433,-5.017091355434767,-8.678710404859757,-7.860567192862287,-1.797922902154232,-5.13956317788584,-1.637423511699112,-5.7810608495299824,-1.5102577089233282,-2.0139920013822277,-7.147146937204871,-0.7804454339624689,-4.605440749501564,-2.7939194556505442,-1.9444395146128457,-9.638761749643374,-5.258190416625952,-2.5367391223914026,-0.3438681837891311,-9.323183600307537,-1.4470972108953783,-1.125352982607155,-0.6809218540282225,-2.49181959869476,-3.315424581631139,-9.299282229538502,-8.824641412427127,-3.6466510387838635,-0.4369543259430908,-8.289388107093014,-7.579658018210235,-7.187404678187521,-1.2815012059693531,-8.097089140440925,-4.918147248567091,-1.958631865939997,-4.258328215082545,-0.9400006979946274,-5.673983584437751,-7.6920021870061,-8.52413380538293,-0.2542915761669451,-6.367410977903916,-3.8309352690928877,-3.298142748186861,-3.1035146164017813,-1.4557889080324427,-7.6989714194475685,-0.503257967137094,-3.2117109880135897,-9.119629651867102,-0.3285895763940583,-9.182173048481793,-2.3083985904590087,-0.43446988458986535,-5.4920836810564495,-5.233336639275978,-7.126068068338974,-5.539580479875273,-4.423776666202972,-5.087135633324649,-8.820209180588988,-3.8738423750376505,-2.79342993495725,-7.034518807776222,-5.775548295354875,-7.691387049338985,-5.324060445204843,-7.626829517671718,-6.618913503399262,-5.6618514748969435,-0.4936363449955361,-9.027071635353238,-7.7896161911548045,-7.957963216249409,-0.6266741575922108,-9.997767940188304,-3.8746701978340536,-7.655393504855057,-4.000190303099586,-9.76637551988739,-0.27921356915310724,-1.3658513832278807,-4.4895144623561105,-6.161405989077748,-8.293169572022412,-6.972707869730628,-5.510723582861634,-6.2869390228130335,-6.682865792392656,-7.842837842938755,-9.329725375667707,-5.138753378404671,-0.017011454972852835,-6.069695518375844,-3.4934912889506475,-9.877971777638354,-9.208493945609394,-6.795564310155369,-5.733683326696322,-8.745032647661816,-0.844582276888517,-3.4855201153357473,-2.636282773059031,-9.23924480766698,-3.874578485545752,-4.576865317503456,-0.9535550516803659,-2.314011847068287,-0.07944689317071818,-5.706352273250685,-8.14475283161697,-9.816079839517098,-8.64108567762882,-5.619843373520581,-5.63888483866255,-6.27249284284674,-7.403151944799311,-2.067242896504049,-6.132009019348381,-3.446154274769122,-0.8852642056380056,-6.546057866209621,-9.571649803220152,-0.7432206515405193,-3.9231531497278227,-0.7821424192483728,-9.414608492877584,-2.4152813739660606,-3.5794294748780353,-4.122139433856926,-7.553828129035464,-2.893652852006854,-7.80436160521379,-2.6143227534796853,-1.0134252268579425,-5.402741756598635,-3.0858580614127717,-9.725455886170487,-1.6936793736597577,-1.8447911822938234,-2.1917942016842384,-1.4549777944172848,-7.159514600732287,-5.598106160639804,-5.196773439564923,-5.951544009940459,-6.82821124071558,-2.699990022770564,-3.0345310153443217,-3.5513855304529907,-2.138849461802126,-9.390548749348325,-8.211013997180816,-1.5793342621413653,-6.620041405150349,-8.363797770293942,-2.6651581938997593,-5.379389116629982,-4.80983329354747,-7.191522290587642,-6.9527843918896455,-8.040563528256257,-2.5983718603005945,-4.410121043571653,-4.835706141993228,-1.9502823347045917,-6.98171305464943,-9.326932156172491,-6.001610771355839,-6.140207353576203,-6.0230137890305375,-1.4244069979776808,-7.701149113889878,-2.1620839924686086,-3.6059279241337516,-8.41926325436731,-3.186852139420653,-7.882694369190197,-8.738312407283612,-0.6990864999451118,-1.8656808138675895,-2.606245234668396,-5.77057451146838,-7.699758855810144,-9.270347985455718,-9.603685808435731,-2.4930135308068357,-1.9677738305430292,-2.979939212564955,-1.9123860293184936,-5.645588753688933,-5.242531898701921,-8.797988132045308,-9.90208323974807,-1.965796316106283,-9.28451021009005,-1.1548255701537147,-7.782777167637837,-3.7592846145822323,-4.134111909800007,-0.33280011508349805,-5.045760144584368,-2.603270500703745,-8.309098866742035,-7.66367863077331,-2.5551780851028982,-1.9450960949783513,-8.768029219891316,-5.897592133083163,-7.0217794909237,-4.790059536129334,-2.196143334091034,-5.644296975041696,-3.5514940834370745,-3.403409541594362,-3.3653204098632017,-9.741479052458216,-9.112454189116821,-2.584852740937833,-1.5868609714747262,-8.334533521273649,-2.6284747980489853,-1.2864860628096397,-2.9242837301308167,-2.5741480469182654,-0.4389647954093978,-9.29804066837483,-3.1093432838671187,-1.5358071755106795,-3.7295439417655074,-0.6995652654581996,-0.2516847347760742,-9.157345553033352,-6.380334167631894,-6.334101944596593,-1.1758464152237802,-5.285978248646385,-8.070997278654776,-1.4790990092784662,-4.265142787709005,-1.5177896574675631,-8.65593513456389,-7.033320969735126,-1.3999932676580062,-9.759754860469485,-4.469651977102192,-0.9926999644611989,-9.173455804821419,-6.4365072526767,-7.111772523615598,-2.0628086318389682,-2.404981410021627,-6.29277860729093,-7.4378744096939275,-3.3888732577794123,-9.228018241842797,-6.842804973326803,-2.1874301954553443,-7.5725519307510165,-7.376613482949144,-8.119490920908692,-9.814004102551676]}

},{}],79:[function(require,module,exports){
module.exports={"expected":[3.9976497315756996,5.375036684569845,7.893172476214537,15.754787698888936,10.999790931624256,103.13764350472323,2.5235704358459565,36.20581863139564,24.73407294820798,2.26307768309743,4.6994358750865715,3905.718243131084,27.734996045551814,36.680959259803814,83.91897238432895,10.341638028774232,13.75747775711103,7.60908890641608,24.023171362698253,9.769154466150326,6.060656333736875,12.01227892765446,1.083622952645359,3.46876277455559,22.852951592111314,10.790374837998526,0.5143341016524454,6.556892695589685,6.375753153894207,67.42724150981242,5.598383034440042,5.361091891739503,9.710282983636157,48.51499242981676,7.5815764632807605,7.113926323243257,5.114942785947573,9.572030478761908,10.608648707439652,3239.5090121249004,4.709390631454425,4.756425689252564,3.123972104255422,9.466907804657648,11.347817435232464,124.88954080542135,23.34849551704597,9.51772254190048,14.757785628728413,73.88807216257979,10.354491789325476,264.7435209034179,3.7690921950162046,10.092562710475898,4673.133135710492,5.846137403905706,23.04412164077102,9.445284387498143,6.624646491236812,68.27981425861472,31.53784240899409,6.038483134956803,3.6590829430532876,16.00431765207301,66.84139733629615,4.781694632706393,536.0157222023958,11.940306689066116,46.26101756299868,3.724232915480134,9.619622177638107,17.998097028583082,10.329307782478367,8.53647891058197,7.94040398557328,60650.76698468424,7.2704794793558385,193.44649341726105,3.17275063230766,20.577660207758605,10.28157392963923,14.917366596984508,14.407751945787943,5.984937614945816,4.969437714351518,4.386995121015601,7.8950039093014155,28.834317369690417,9.835143890833795,3.1246815568085733,31.335635081604913,3.9175516451775616,6.1508893345333755,2.6398662176785406,10108.222036356075,34.547818287581094,7.202155951513264,75.86495746563328,9.126231810526388,7.679479881268833,9.190552357925359,74.57057299708573,6.698989319444405,3.2136802232644825,5.915991721884857,5.061556451882726,10.50306016425249,19.448044171494345,4.045551602936111,7.684144006473701,8.439134956452438,9.168559292497177,9.084866723188963,73.18595059121972,9.120493006522517,29.121064118795584,1.9041619308459654,5.003455984155048,8.223613148135422,17.019557445658684,1.7084962275488613,9648.896191143494,13.67701474642661,17.75979440077018,1.196742387723501,4.758198355719992,12.626337504548083,6.088387653846194,231.5224510957293,10.898644908842767,9.462089764564936,10.902762297904388,37.02417450085846,9.562752032689081,9.223650539885387,2734.394129125497,10.592568843914467,11.285292450030934,17.195665634252034,17.226813783787044,6.34914248727506,3.5654334451824963,14.973424840059147,135.75107389997913,11.505576290762036,37.5662289432246,23.09611622212215,24.863034138033566,15.84899845043964,135.07987953133232,2.5504752438341693,6.921890336789312,18.40621750170199,10.116592413538584,9.186026363513909,4.832735961516889,402.5463895255675,10.357886451231359,21.43604134764833,150.3418679629763,15.249786273534337,7.104070435759568,2.231668105019679,14.43760920223971,14.609461939597,7457.60518211245,29.054828227084233,4.339747213907172,2.2985025449581045,2686.2898780048117,1.5234486769765339,6.5759868026423085,5.089977778803497,6.995010191773004,46.18736192671889,32.51693052113667,9.053086634888777,12.21505545891877,272.6532956104954,96051.01657806597,1798.2888956618228,12.735970137847708,10.942458169851193,14.91152472156133,9.880111839325876,7.801024039262986,1.9668510287290144,2.466381566906177,25.311122706394787,6.86476364869702,442.8911850446146,8.924020448662068,456.8376485990016,280.1177117623653,14.452390139400432,11.752137072475879,5.434201335640979,16.382124481198005,13.036816462320544,7.022644639856909e6,1.920081241510002,11.97275713512628,8.73522659294395,1.7701677830486762,2.869609920350455,13.614414091485523,3.6352766131484224,10.802388872523618,2.680374616457057,2.561330793202764,6.355175051223633,18.294424516223994,9.801089013601898,7.584580343083704,131.08215721612189,12.665562891136238,5.132383997504387,10.833864874194857,1.2421577200163338,9.830735329727608,28.843780670053533,8.46063049478949,18.632176152059763,48.25717330164853,66.75326802110132,20.55312763729037,10.335674146587882,26.18402663978601,5.530026785341762,7.79697461647057,16.053273213413334,74.54099022771923,7.3646107654085124,4.974589172643757,13.827427444618142,46.79044282588872,22.844375155680147,12.250118129707175,5.883158462462408,11.701229967503046,18.844411132872885,508.62230523569474,7.399308664711156,8.37038699393376,3.2715310589639532,10.544299653574392,20.635444660913816,39.919058886836034,84.66061257503964,3.823946654517568,4.1807703975676125,117.380777255879,25.085850269524823,331.9971318997354,9.443958015969013,30.781074067803928,12.404914821926315,5.014512946868291,2.3438113746386526,14.86512461827996,2.6285640161425396,45.639328711738,14.352529802238292,16.899393302206175,2.0259760864138654,10.79159889730058,5.570529468695017,569.9023636610474,1.6341091085502681,7.2454529243093875,161.48077954369873,6.600166886859713,19.81930488137197,15.018894392788324,7.433447123097176,3.1356683911134318,11.641511842632932,5.443489607042672,7.964737527403628,188.59482777389707,8.540622672375958,12.588936928901035,214.02979184222548,1577.9170605773313,50.39292118918777,9.519104527743739,71350.50416310709,1.5434293729472943,2.8592880563607933e6,12.898146258693789,80.70644531747385,9.18492446949842,27.54437814340667,17.598360976433845,18.641628965695425,5.175770412998737,8.316855942409441,463.5225554229059,19.977327508327225,9.0869066047855,14.150435497333426,10.815633216354927,8.699659149084466,306.67940843002816,12.099278890106024,4.847113891608136,6.332414365002641,1.9100167218440847,7.644625180203154,5.28794202138233,123.68606767235885,3.2396864984212717,3.4072241541762804,10.394646910186001,46.36283306219608,9.147506083715724,12.566078862790818,8.551410250940302,63.936010601264,47.63503797754359,3.322688472787335,322.1482381363665,25.68879668937761,4.639821142281402,958.83704295987,13.863332611730694,202.6279446951514,9.128540107240577,21.558116762807643,8.964434608104302,8.090187315522023,16981.40997610933,14.665047224398096,8.278899914607358,16174.722677779026,6.689979594410408,3274.040876917163,1.6756161808505705,12.408843286253653,11.521403225551904,11.560397563232447,2.9739743744360343,23.18951594853763,4.075156017076341,7.1766318991089975,2791.6072110768587,5.621339722683184,9.335967531242275,20.9582048026446,12.142074919136551,13.912432665871492,149.91961026003307,2.1084267897586377,604.9159231076205,2.7659509845857517,0.7671262795713939,4.002278786334365,108.23636835144131,3344.8491700846694,742.487452115856,0.9527274338248286,9.528535652719807,2857.861997129456,49.73329947635096,2.0526587038293203,6.901456788873977,3.773342624738768,878.6131382773466,2.7363740567537165,10.673136705414608,8.710550095682468,931.3011115760626,5.3958416749513,13.886456823468611,10.212377821620269,25.41354982776253,5.677115515056105,42.198389822619234,1.828950466945628,8.940636813087774,19.120594501010665,28.04499215324949,9.521591499309958,14.049145379379759,69.96064532081411,10.841542766995168,28.869271065023664,11.01961811315757,45.6303797365812,9.322353827504562,15.241916777937865,3.8582217396415177,6.439586976835151,5.469485816919262,58.05678165000711,68.69746077906987,20.251676721597814,8.249483385915836,9.51229870305516,28.138960427701207,2.2237201077312045,8.729702642480873,10.278708482074734,8.394761596899608,2.883540490853319,9.39968207835716,8.558535071872383,5048.090139756707,60.74764990902982,2.357433352004822,2.6685162499764425,76.77832370743806,79.28202476215483,54.700040033528296,13.773068259946978,4.371092388339299,22.4489836457753,12.49436174722314,5.148466653454323,1.1437919203530071,25.187702655187838,25.99669270922694,8.025218524232205,14.014853239425264,15.362870447186936,10.533006677094868,4.368251678525123,6.98560085775796,19.817776034726332,10.733122768538426,15.134037340198212,9.20190490324286,6.026339543281949,20.25489348104334,8.104718963739135,9.247439948734018,4.219348110397171,4.370382253202127,13.048411233484394,24.227992878026612,9.127883842734681,20.762805171825846,7.932149489132362,12.102744628859798,32.18735883989837,4.047824630639912,8.445345506499166,4.824004220874562,0.9812954748628101,7.084758332382137,28.972337831060088,5.168410264389681,6.0240111986828975,7.982353318151463,2.269611283755568,287.01534321835993,5.776792016598282,64.25391074498543,12.287542599869544,10.191148832346773,8.021850473633034,13.828453527118972,12.204904311696268,5.250661651851199,2.570806409390629,11.212559355686016,88.08509306054776,5.593590482875058,5.808001300178795,29.338308423951066,3.3381236028367023,47.72261581637623,19.777753202024098,3.152103818662445,13.693766898725194,219.3028144450768,47.52010116583598,193.72049048903438,6.768903287838014,72.24609196916974,21.53244607148357,2.83674840226422,67.83718269203486,58.64695458484273,2.723715637268969,3.2923940202365474,4.714000864472192,10.673645553453667,14.628803116864198,11.300667065141837,10.501114717686441,1.2935342314738727,21.030419334592633,8.227517359655659,2.742066308075651,8.49819771201234,6.983624166940296,11.730414124242932,9.605216058118781,2.435447179190562,8.70480665947351,10.353076199282523,21.742704631199075,9.585115570121914,50.83120469418463,10.988402724589914,7.5192855875593585,8.037310967509988,7.747717887005382,4.912068888032945,77.65052291666399,11.332638871785614,9.993900791017296,34.58101654124429,2.869278391415596,14.267497605074112,4.032201912879039,52.78935694168221,11.385116369071035,62.78926935603849,7.543222968402323,6.303417182161625,8.06453401772239,9.893138349059818,8.604042891472849,4.715074171276413,12.35661702707848,9.81082605543843,5.830779954133603,22.239850187379645,64.78079516621638,13.450471752719972,10.579322313455496,33.266069454552266,6.615411231766242,7.191379699259222,3.624246124188307,9.543945037627363,11.252346317212254,68.61479848871235,1.7846665683864447,16.050558935434825,9.17721858786302,306.8296068068121,9.896112871296257,2.101751270972901,5.712458313428816,35.144529703759076,11.52715061875475,8.536186852076106,5.59711645747496,2.7745667729064096,25.54925844393487,17.919525596976538,253.41260029848007,7.528664787790557,303.4290787433197,187.26025867525237,11.972888753196052,8.931396111112834,13.471286920876373,6.862367482271707,103.91445656862237,18.703681487638796,8.697259637547889,97.81949401579327,40.522730258650526,9.977879846673195,1.745711453664032,0.09983820060994357,10.469560967343563,10.106029775292896,31.796628955618523,5.690011329535203,14.783706861077624,6.977809600764705,3.019672025403814,221.94094854649114,3.461953231319456,54.1709928070423,27.235678410722883,24.747138031677892,4.566377094328175,327.9375605693604,2.406633441237295,67.97378084193758,6.812712288502953,6.61939978543365,8.13262080040286,62.9111580268755,46.83710491644061,34.156063502669134,24.824133110144285,13.880225621019404,13.106398035133772,12.134792403004013,7.363779537068472,30.565238850906702,10.960635603221105,119.28878837557173,5.22044616710766,0.2948835878319942,8.901036754508938,126.48842615451096,8.673438247580924,8.492123518225695,11.45439130807984,10.69244180489773,12.048374165922425,7.512867866773914,11.909092605194877,5.211432246394493,11.600190337244289,9.278154792310717,0.9108784115661949,281.60626547977967,381.3215086241501,3.8757585792882425,10.368741207571983,22.10731826583291,362.7823645166049,7.875896261103062,444.3280138356328,8.87242761979941,4.631439380785546,16.29824197240555,5.24959750712587,6.609610740237388,9.285725896389645,25.54182367232746,7.215281286075518,29.59875141811146,3.868703257042226,30.57043487623462,16.528977380125248,9.661761040561126,8.018164266644648,4.100117164463311,40.81448539722878,611.3024237544341,12.438225921286858,6.901510697165595,7.838873463795267,12.486957790044062,4615.523616334238,10.665612851097894,2.3315222898949504,54.79395311429229,10.996790376477723,6.483797830825758,930.8411119175663,33.79827852927206,10.08970157082399,8.516679217925224,11.952284535535318,69.14353136595668,15.113875608810362,2.8195697519986718,14.433285079972135,593.2088469469548,462.500062076907,7.380531368068955,5.660317902021018,44.949057155727154,296.43573289022066,148.84934059782952,95.54677334745102,12.919315956529601,12.243766414979369,5.462688812327313,28.341256145107216,1028.2592712001992,9.98263569402479,8.449303554648054,9.723306443237764,23.180563579279998,5.652291026782013,45.4094731442179,3.733731803807169,12.844644261000893,0.9645607568205808,3.9909840025336303,9.682145574561707,14.617170858340515,5.206502569904591,28.218977583929217,11.43371704545033,4.340338107608844,14.69739739604329,10.678072852799145,6.976345483025835,10.232356319223777,129.17146701257502,2337.7445883957844,3.430361724422575,7.091551110575116,32.11122161394053,8.52762336187601,182.4024743730607,8.17837690941025,170.15575185031958,11.281781496443543,7.333270152321609,6.037118788069895,16.27671089103861,10.90347659603729,9.492572075737874,16.69294315499348,6.900632954242878,6.298402305361789,15.786672473202936,98.4020482468266,11.44785365528582,10.615305053801892,3.8384161109801114,14158.483846168048,4.953112914868623,62.96498151526673,12.978121192937667,1.520243836913668,14.664388036653044,16.591388555116964,22.362667080640694,10.306980644584332,58.24631577037917,5.501297270708229,623.3487267727788,45.81563492938341,58.23710324995468,6.297446981758416,69.65527164616134,4.132853838022477,13.365330740123262,6.486860554879794,19.742608025142896,8.889846928041159,8.378812097107954,11.88360349178044,11.384498688333686,40.49017213223006,1.3436608685900857,57.74463027298923,9.376898826511113,1.8111773832296634,5.670557352580348,34.60342610480875,12.868507986051421,18.980197980483766,162.08190501857783,8.19490959793307,10.562216138226926,15.65756112516048,8055.869621732952,11.26284487046234,3201.5484004280493,4.277443713436079,1.0579247351666128,11.844556572423382,37.11396218094734,10.213956161936451,8.177766560043692,7.57492225235694,8.075274115891672,11.462414906306496,4.320111313854036,58.99758859153914,6.478258023680253,3.9510323521134127,63.090413353795256,89.68756659632251,10.291928792540576,88.97249054684666,15.163022139754313,9.178865531083328,23.6479088508567,101.03528871854655,10.493030925543327,4.60420487347486,12.624558949798532,3.199443655085855,7.915309542901602,114.32769563460577,95.72951299898962,1.5301932148393629,5.861547577478749,11.65037589866811,2.2606989979692296,46.860845869514904,14.74416465322526,311.1563065200938,41.12732323020585,5.163586798249165,4.990028210709692,3.825282942289634,6.208182171916345,55.33647800139206,139.6726603765394,29.73134754371622,8.702149939476561,314.88881306469955,11.57975519892814,17.56820184163481,7.2271517807195655,13.501717528414149,14.312177689211612,9.51359029129179,27.174359552384054,3.5860560507426653,16.350654711370588,1242.8038460072767,36.271720150123244,39857.87801990666,15.045971887536588,7.501730751267443,11.154260354235522,44.335792216376674,2.9079903118878736,8.02152537977509,2.9461825573998004,7.377013624432041,9.219020488710594,4.180695532587155,7.920092047621699,186.2444804885273,12.890078317484893,77.66584823045947,3.347151259404754,302.08143726798846,9.562200498994471,43.985990817871695,35.44022284096421,8.136146278914026,4.775592970484903,11.114313775515292,1.0955489034054111,5.125310707586656,508.9969595316111,15.491524609713812,6.163760659392622,311.49784924184587,12.395645476993192,9.432184417810499,7.817502716197479,1.6107072880744475,9.041782962255004,1462.0860102156523,19.11085859154245,7.586496634181262,8.158724072229564,1.6303053046353337,2345.838784287849,81.95230346737179,74.1986946960826,97.9842884910629,6.132703472657305,12.506988436549243,12.537566175049154,7.424639258945918,472.1014871062029,6.167747744697337,4.483225450638139,1349.6999945115292,5.231355775751522,4.950882351303612,7.525837550928333,12.910129955934105,7.36227851900952,90.55236621416284,225.1002931249322,2419.84188042699,173.65496048367896,77.01270140343205,17991.825391961233,19.76387968552299,63631.07303959974,9.310897104837792,68.75595897151594,6.75071684248592,65.5433183440013,9.730372308674253,12.139133146763314,15.907203166935743,3074.324081097092,20.789046083642717,3.391591104356708,6.462026545262879,173.23249468891046,5.770148488208457,854.6521576189874,180.5642683460345,214526.05376881626,17.35606610562051,38.69245714087448,4.646725648616041,88.63780156980359,35.400527577195064,9.360106723015694,5.632839905999813,19.722802467731647,9.202823787604178,19.705883779230206,28.063322438661316,33.84252547649629,8.068999303440174,12.557121601752382,10.260580995305514,20.048001280562403,666.2400564747215,69.55947247755724,558.4244683887921,4.4332040297531154,4.077212929671242,559.7236096050824,28.7844518567082,18.43906054516498,8.31832692250032,20.19472510420259,7.513097485125517,4.54781649440347,7.057193580191306,5126.028725706002,4.156200455296807,114.14264452079715,10.607302833537126,8.960233859545042,6.576405663423374,22.971121517828035,9.395011389033007,4.91253071961968,2.3270653914369115,535.7496370559758,8.354255735994744,9.420047529814843,4.40846739804503,36.469170511312555,60.31969923115201,57.92103056516875,14.396041037874246,10.884620169727988,6.9381977944976985,40.12286766121387,6.179959385581729,186.45184374510646,13.72329912994376,89.15610119147603,168.08730240229374,7.1643334273499395,10.059740073998153,9.525672241700743,42.208682494531324,11.190677948746002,6.069781699274603,16.871645806016502,7.357905814848977,6.592873506952517,24.17075863707859,10.127275782163986,57.02553068178699,17.458431086463953,29.854290573305462,4.735622845320558,8.562244107521122,12.238690613995047,1.3038078214094388,4.912979866301931,36.634983934096084,13.805032217404154,20.260207733635923,1.152868795033052,11.363458803036695,3.1155077841082153,3.884967097208337,8.589663894661882,28.88669117412082,28.43177313380432,81.63879555728307,17.37548302057354,6.690067380663455,495.0879467767999,6.5781092788202695,216.56613324596205,4.9412967014988,32.934446206717105,24.34353760451115,803.0601465244314,7.826460830977934,6.790084869940889,15.886887856527718,0.8638807454267035,50.93101898939117,22.193187841006893,3.415492503436723,9.491893236582715,11.926762740873396,17.37936617189424,9.317270353599826,8.42077175227438,6.0736692150244025,6.039678006294162,17.78423609821296],"c":[4.852822079696968,4.560907487682737,1.1623409227236725,3.597757033554579,3.844558127838271,3.636768539941154,0.16949180959773047,4.193917190564067,3.9672333526478907,1.5529204196065527,4.510219553507948,0.41062531039014694,2.5552453508511705,1.316264822454265,3.2479608782928473,0.8503060897684966,0.8078894890608246,3.5181429489505622,4.256098738234585,4.905244501434103,2.848901133908038,2.1991142131277197,2.616763663893341,0.5912655444729331,1.9206653093461534,2.8501104979778047,0.517528733215511,0.28886009205808305,0.14489854773072075,1.2074174449915442,0.07611361661141625,0.7063945731553234,3.4090819231597624,1.4833883294188654,4.403185897948138,4.227525868199143,0.4901714005271385,4.225899921307219,4.843399952567399,1.5556967154622903,0.776656278730391,0.5528035406789145,0.741777699970948,3.6564193563557335,0.811138121262801,2.306327539391587,4.7367025534958955,1.8943506618073491,2.316257617170665,0.7778216677431071,1.5811935737087912,3.4699011982696826,3.4353765504111946,2.9433281679938883,2.776908128123937,2.903603658591689,4.896126639801796,0.8600229156061778,1.6573518726083991,2.564804574191557,2.586435935209208,0.061423658831444294,0.42834813317972453,4.4728637305690055,4.498669754574109,1.5327346494149685,2.4664345883541827,2.458603750618612,4.967418530586189,1.5811900024899317,0.054582871014815515,4.806321349262617,3.7369725257712814,1.353968180210069,0.8922347871758063,0.6546452144375703,0.021194371047474903,2.425312942679528,2.024274997155292,4.308104478004175,1.9670575236219556,4.954348960457999,4.344692295987523,1.9705744709789486,4.843936116607431,3.192711985233616,4.868507310456511,1.94905925819298,1.8077028152829322,4.981915639774717,0.8651761288300086,1.2848705510376268,1.0643835748460484,0.3505114233924278,1.2741383798879702,4.890575287390289,3.263506829993461,1.142479930935294,4.000358141578686,1.2355207952379976,1.9274756351303546,4.881338094805963,0.6544060384534933,3.824490030927492,0.2497832851313042,3.8428808574035047,1.1488756444768367,4.333720432145295,2.6679590471181114,4.323532258429529,4.1292215809621835,1.438599103751269,4.293032243106387,4.4920515408618105,0.5638106752533323,3.434401714451323,1.077547751831024,2.6700210251443615,4.577427805651516,4.147782296537951,2.1956477732647017,4.35995285777826,1.3188729524944387,4.215824147389351,0.2721246448516712,0.1547172278391995,0.12963098035604248,3.7549571427401984,0.836335871479853,2.713866661834905,2.199875191177978,3.6734836115220073,2.2894116614027924,0.547195256752665,2.3238732547643384,4.3283060981530594,3.223511517709129,3.6207966044742523,2.455385270676752,0.9088726771506928,2.288893893271191,0.43928706816773855,3.012628813291003,4.403751915038613,1.3506836715590154,1.9687297758333633,4.06323408429539,3.887671318936503,2.5396938633508084,4.057627099214142,0.8521842046465644,0.07905132769330359,4.039791004660287,0.9899661250514613,4.7300336047094795,0.5167482654460887,4.323036446216295,2.9031694500665974,3.784165208733218,4.604194575269975,4.53825987697401,3.9488138702364695,0.7032015869417352,1.088684307272465,1.578912620232208,3.122324996725887,4.69807448157143,1.4324412484345461,0.10857071398872709,1.1443390794199426,0.6657503919789098,0.2954114306756739,0.31374087846729126,2.487031709138612,0.5812031075675628,3.620260734934294,1.8486490549251056,2.710745942230417,0.8980892222777703,1.753870644481017,2.908704819319391,3.400700193829531,1.0537533602277471,2.097223602260322,0.012952249826189144,3.8763894816615894,2.256710093967306,0.8636780390144205,2.769079165118659,1.8835726597901026,2.8897883983779282,0.619259219155851,3.2964464188781095,4.8815957796128115,4.95973450490205,1.5161999759746336,0.3321764266072025,3.5758816811300242,1.7540532351733107,4.262563394846523,2.052862468558648,2.0888931091753027,0.3522897127083524,2.3411278187396025,0.279901613832676,1.1049205749815638,0.7031931431905281,1.604942897750753,0.4003906608262109,3.3926315551902944,2.2027738901790594,4.293894882254054,0.033817638639318526,4.877870150048539,4.170639084395889,2.682488656353933,2.897423182410359,1.0990820080515573,0.5841619034642964,0.322045810666749,3.4961913998919303,2.2975523940934837,1.557848872300197,3.501530560108652,2.156451523457814,4.652995571837815,0.2438488157793095,3.8099645359658405,1.34359880273907,0.7797829044698279,2.966610582710727,1.4247102740234674,0.6408867411875641,4.376569559200161,1.9796179365496813,3.8435671970495,2.4446981915530506,3.874103025470096,1.475813140656368,3.6001950165414076,3.8489028948304393,4.23897941858641,0.1736505514583786,1.2718919066179613,2.122243700534291,0.7010492920683364,2.136998614749187,4.8342816641061255,3.0842891749465773,2.3335036274757313,0.7129582843589399,4.3060158373880775,4.464968280042623,2.644330329977426,4.617112885289907,3.9021941557898945,4.337609096315347,4.006870649749499,3.052740189712483,1.923464351798957,0.13302146730191367,3.44568712654271,4.767513700764367,2.39967609310853,0.09857796347737757,1.852167144798894,3.3744102777730625,3.1599971148001007,0.8774040460637067,0.8686074736588001,0.4772473800930488,1.3460337727097549,3.72592724120358,1.6924209661329759,0.11281658390357885,0.6145804785578579,3.4447999906105387,2.5551576545473766,0.2801835738060754,2.593875346068221,1.103636264288057,2.247380201224669,3.2951214424212614,4.7102918299912275,1.5885271097076181,3.091183291945301,1.3824943249450328,1.56473361103464,3.5785810525174644,1.5405204067437306,3.583082090867209,0.4209357639180866,0.9188220246592782,0.5771913072287838,4.584810608069905,1.3762848634616787,0.1679198138869764,4.274135479862778,3.0800509282106727,4.803541943575954,2.012334773777126,1.07724887217574,0.9537546921695528,1.6701863917620707,0.437069079938176,2.5274519012745564,2.6154230057382657,2.391516193510731,0.02794227722598408,4.172673915679159,2.015444491412579,2.206015358324558,0.951870381325769,3.029313891787578,4.590358326963,1.6320164767131595,0.16445771141706422,0.4615580140668851,1.1461090123859485,2.294812566232116,2.473206225706125,2.6932174995626292,1.317059128902155,1.0185354293664195,2.564826929363858,4.500808984163838,4.547319028810279,2.2086746610330623,4.607249471360715,1.48791663238646,2.2192071746773765,4.866353811288588,2.264401424094322,4.008704144286335,3.0569047851598388,3.885628008042752,4.302767272705208,0.5189804929683939,2.9344505478011342,4.679484608503406,4.577474854236002,4.5751131802117575,2.0272746616491477,1.1534175927949308,4.724261026633318,3.127551510838684,0.28662506856080405,1.9492704155049134,4.652374441587142,3.4069044004398608,0.7403520266501673,1.7708004271697853,0.9229365532406875,3.555867691588437,1.2576029644380349,3.486169799063471,1.0848410259063646,3.80617583055335,4.022649854600141,4.524945440271163,1.8800491054329371,4.999677935712068,4.5855146920181316,3.7855568011153693,3.041082741481712,4.3104480520783675,1.7623042660571264,2.530358828997622,3.977468456419253,3.7936562011912365,2.462307981764474,2.2682158751434187,1.2526289480185748,4.26947809772419,1.2318173541415312,2.932968147734245,2.688320167492334,3.951387959134063,2.0323904424625394,4.69756607156809,1.8305007816111007,1.2758984664118622,0.5063761054540483,4.9260742267627915,1.2964312261030686,0.41431090924994973,2.104058680977119,2.711058419896327,3.9391266995192153,2.8645486359568126,1.964396349732842,2.490479873822,0.4660542065831319,0.5487925981740149,2.346355762354876,2.291292472387312,2.915461082228734,2.1968856482630184,2.438523568326305,1.8513001272948204,0.5439535542768026,2.087891846121175,0.7099907629565261,4.750457180681051,3.787291654668834,4.808003567003908,4.837578754859874,2.3885905714199387,1.296965596514571,0.17966573943329456,1.8703084997274877,2.587699071492092,1.941243546161333,3.9566473295144835,2.8128733344109724,3.2918183675342005,3.1464519812941303,3.968581058230636,0.35832465833349647,1.5647428903257654,4.30628337251807,1.835310838255616,0.03474363470582165,1.3084322170331908,3.24929886396614,1.423890816436073,3.937207265178894,2.057447784182477,3.6577791128782966,3.1879140963352306,3.7214317837536526,0.2257113439052072,2.384401646705548,3.236909336404785,2.487733713540936,4.22622551134838,0.08712087684174641,3.776551950099355,1.0096208481353608,2.273148219444349,1.3777347051139899,2.998899962980696,0.7105895767516368,1.4369365109545096,1.0239496690362804,0.749983763242078,2.089057743986311,3.4586495558955823,3.734151415069804,2.230688765788058,4.837539838657713,1.5005589779437623,3.238460351164835,4.828988122973983,4.134785668191805,4.2876794468040655,0.2641338767069368,2.4311660325065585,1.1720300845457987,2.102670010985146,4.536605779274564,3.919367577366476,0.20381076698325007,0.3331154779246015,1.9473937409960218,4.425676404830342,4.05051664246876,0.9805764665502259,1.7210223805714264,0.8923981176640849,0.09101530794772383,2.3763447002842364,4.671920136945617,3.6385009869158647,4.778914053280832,1.8187513434867475,4.887540413696604,1.2572430127588197,3.105061646804783,4.830483121930995,3.106862641420234,4.1067221714378555,4.892905792924314,0.5733303731454864,0.8515912183314123,0.4082538957959492,4.169359341471334,4.758445382623152,1.1938125900260566,1.1518538344009055,1.3860879986500285,0.5813062089904497,2.3977883968597458,1.774769765530304,0.1460899961415718,0.7860650361425903,4.806550724024353,0.6214700771832715,2.5689681243907247,0.9825350299424573,1.8233060085227348,2.478138067415012,3.7459768146410886,2.769152511681937,0.5680567159582417,0.38129459721381154,0.7969938168725632,3.4304480935625756,0.008651462142215127,1.8690739169163406,1.8388958276981515,4.350367752892921,1.9944965153717542,2.933782038682917,2.688454485778969,2.074333724490438,3.8935422508625317,0.23737535368544393,4.4808475017064255,0.29715365913571934,0.3658428228700761,1.4016155539577246,0.40197019720476845,3.5222393127237117,0.5580770470097407,1.8336106651502526,1.007221505835988,0.22446095089973417,0.8422292024542366,4.812236011813872,4.342806131448425,2.263266585123014,2.663903732482722,2.671919790852617,1.5458585010992676,1.865844654604204,0.11435721109661401,3.5335152311112052,3.526524417808623,2.555387004897015,3.070335777240728,2.0423662609232407,4.011531694436919,1.6475967546434422,1.1531664650195117,4.5509962322973525,4.12724627505869,4.634262747467756,1.7115242745060755,1.4776327419518642,0.763024162925453,2.7146120250515207,4.503838150936167,2.258092075127033,3.9595737865327996,1.969725264212262,2.049867911953116,1.8236897072279445,2.109422724143223,1.511067513582267,2.3460982752437607,4.130365668413251,4.4171585618483125,4.073854303321573,1.6573660983567629,2.88644480615742,0.5346388387582912,2.631139238811521,1.5019544831067067,0.004330010508222237,0.3929576379737698,3.9790540831408605,3.416460892946709,3.142906038091783,4.315871747787058,1.0742465288778125,0.3236433930263527,1.9863135483525929,0.9149229875462894,4.890067254360302,2.9421040289803404,1.510450834635888,1.627753480615115,2.850121842131179,3.4838127934189824,1.3340952794599192,0.3926784528379157,0.036593051220553674,3.566579318593445,3.0006120823470015,2.898531363873297,4.302937011712773,4.402112344321281,3.4578206303948553,3.7869644462899976,3.8285886000909954,0.005238651507145642,4.026429047282135,1.0242848180573194,1.188490492126082,2.3400056014803585,1.200417716900074,0.9760242535700725,2.7692262013437263,1.4635676290976507,0.2419730349360283,4.6822962056135795,2.861684137246987,2.644927776095145,0.3813372180478969,3.1071856102073694,3.273080193594554,1.3523883005654924,3.6251860511827774,4.947303400034739,2.5464241686447755,1.639457600332782,0.054005682404391075,0.930587843710855,4.615887179570528,3.574727108320761,2.1668106751055713,1.5303246392099723,3.163283067309105,2.783150912408705,2.1875532693161936,0.28829639378675664,0.5380388367297118,0.5930874029476552,4.752427536925259,0.22188467800992484,3.7594122577337306,1.4424504905720315,0.7142767463983923,3.5993104954888198,3.5589107353077756,3.5911006748631067,3.9023826479337833,4.0391772797186185,2.3822994073977464,0.8620904464611079,2.489262718237184,0.45361636973437647,4.058479200974281,1.9347662988522363,3.6837605446792034,1.0862236232687916,3.2244467803238406,2.829528160392729,4.842272473144266,4.633140044001101,3.114286913814399,2.4059481229294177,1.1944471583838057,1.676781699419455,2.6616012875262127,2.200922762929576,1.3114673836057178,4.5441535777164885,3.1233952856936655,2.9687844412904765,1.0384705137949257,3.525773911336124,4.291480272017103,4.352778424038357,3.0751011315226098,1.7821760848755286,1.6568574122264623,1.630319371866864,0.5506306770377589,3.3829414370352273,3.6394582367546677,0.04264355804874054,4.688329832143374,3.414576615445152,3.412158383733399,3.469142007695525,3.0080057975004912,0.3563648827451871,4.046898019664512,0.39017424454837357,3.959860488625604,1.8594694789538857,0.8114590876713856,4.2838090062629774,3.8765758081498447,4.354000118303541,2.87486671884062,1.3398492167175102,3.3197407277748594,1.8122658138098924,2.4921045436761133,2.807558455923771,3.0732916709449984,2.382021816599141,0.709364180432549,4.441080957612767,0.1027177358665099,4.925390570860114,4.002216904125255,4.2134635225102555,1.1722966552242997,2.426967971024582,1.0031054546211116,3.438698209821367,2.6127988736735155,0.19577514278311559,4.1841517543634135,0.9117407393682053,0.46823109012546604,4.388453404636524,4.2057215594079285,1.4256523220382122,3.524914241170809,2.3150162585724954,4.420396163818117,0.18333181085749883,1.9446322216801326,0.8263296327979774,0.3466643792482016,3.10699561972009,1.178459112932717,3.4611315893299253,2.119405990037345,2.0461094023985895,3.2318515085609913,1.375491216839757,4.1190796148672435,1.3973330332794232,1.15649082953314,1.769312354360154,0.8868870602721923,2.041896058318743,0.8108139470468501,2.9273692028114997,1.8108541422295699,1.351018192733885,4.104258587000559,1.192175286225008,1.5573510253466816,2.19358845156004,3.845115334283482,1.452265131996957,0.3619260788094436,1.8249918656901298,1.832154075340544,4.243333888053609,2.5259684245870098,1.1105182097726896,3.8467562967393407,0.23570439569427837,4.621768169989443,0.3907409508131865,4.742197882622726,4.726018486690096,0.6985645849089106,1.591130945095981,3.299211050925651,3.5893830044294672,3.9238276552462112,3.948930134433403,4.775617552121596,1.6190622694136902,1.2300201619386741,2.7182274888665936,2.669002434005614,3.362483697515377,0.29728481496095305,3.94225158492737,4.919851165869225,4.2813754234266,3.3223151465536658,4.0036188334373115,2.76015899416464,3.3732481474083764,2.9818807527727675,1.3596094687027072,2.730482794881196,3.518243421273888,4.476581794126226,0.6440358987412576,1.6171094166582078,3.0889246383910374,0.2712350030286548,4.878734532535965,2.258784995287595,0.9047238194125007,4.782955371300776,3.9913835300920155,4.696429637926966,3.567155756499446,2.395331461002362,0.05929627448661989,0.6779035778690479,0.847324283746338,2.8710220994275906,2.8686738414782367,1.7837086851709683,4.384110624084686,3.288123126222154,3.474342934360035,2.8537479932306398,4.30801535818471,1.2236672688193118,4.401662730858825,4.5957455150772795,1.641185068004516,3.8062864189841106,3.733223232539009,0.6975041783798708,4.992858301705569,4.6857115254887205,4.787772902314766,0.8485877271659814,0.6913959380430057,3.666781285893653,3.0849004257328296,3.929416521869069,1.1978268830029437,0.38240358835021304,1.911438170419122,3.954635010357218,0.12118178110695821,1.9024759174262729,2.677974035559644,4.980474521780305,1.2723989031538474,2.267283624106202,3.6578224262126713,2.2337168151346907,3.0151738313666874,0.7301895418335513,2.1622474150899107,2.9603757148060295,2.288388830627884,1.9394826899836293,4.3721929246465185,1.6070360067350264,1.3456008004815534,3.570407593659376,1.7371441880021299,3.9894301183829715,1.5545553663303613,1.5359398590470097,0.1422228144029336,4.484669704959426,4.594660902777063,0.02748121165045081,1.670695444222331,2.271209327221533,3.4065028682324625,4.464661196193268,3.972780855512541,1.7504960402560266,1.566405538987613,2.5656102511070955,3.2212264311195584,4.531050948981833,2.9524282322846673,3.985707617968232,1.5763879259930424,3.4935776608335645,2.671501036669298,3.6344446226194305,3.5623779644722218,3.7892294389174586,1.0017189182876163,4.91571750146647,1.1900530747305726,3.6013261537878094,4.066049530185529,3.0919640214820276,3.0222660797875314,1.7378009983633491,3.037177936002473,0.17589052014222673,3.3617122524457566,4.190488545541297,2.9114799697880764,2.6992539454725906,1.2695752790347758,4.309241856714459,2.6432003306140714,4.547248889630816,2.0496842398075685,0.13021537352480683,1.8728360744347428,2.489843371927878,3.281386073430413,2.0555866039702355,4.559086195200965,3.313379455975891,0.7828916157226862,0.05050944081092301,3.768975687181836,2.0754066470231702,4.148863298892715,0.49225406707434805,1.524256098911605,0.8164965450341855,3.851275268330494,0.16893374850493137,4.46948823035692,0.02636379731903893,3.6722976529817464,3.402958303844822,3.43874922342988,1.5133068592652343,4.703408927104978,4.015639994096737,3.409747132472357,2.097108517478523,1.0261880414453206,4.2258765815484365,4.074719388418188,1.094567465694427,4.035994139367581,1.1027691307781329,4.327391318178116,4.457687321903548,1.8191163403017752,0.23340694741469936,4.586346376428353,1.6432135897891853,1.5214914220067177,0.3049833454014239,4.356295950339727,2.0103913494166505,4.070759242619696,4.773903172570696,1.1618001167028436,0.09456599340106786,4.002582498055922,1.2163537606853603,3.6636028419726263,4.9372454531597745,2.9599871426798394,3.7709033494917343,4.010042369487509,1.0790058064059527,3.657696876898852,0.025356443008747176,4.325932906988649,3.7096361327533236,3.892810048587,2.23256413270113,4.643044825654651,0.15768454235783103,3.376745933425287,2.4470291473186387,3.078608677001544,3.201727477003619,1.7695385451370815,1.0918515046584998,4.435653000108543,2.129149403229744,1.6646994367323087,3.638650147026535,0.055471073843251784,3.9363227988367075,3.052734910778737,1.6429823236215868,0.7336745857148363,3.1810695667465105,0.10179295023727275,0.6127281944956919,3.2453644895109113,1.006460975097473,0.22936795187065595,3.7207426618847697,3.009898444062932,0.21238029985324425,1.590591810342008,3.4994720597594045,3.2135023897648827,1.0744589301649832,0.9291826711592577,2.960507077148433,3.2373196312831753,0.3779473389984722,3.183172719477981,1.3930737994622933,1.254018085858405,3.3120546821508325,3.269183298217998,1.1869587642440438,0.8333151874994149,3.999794805731552,0.019545004578600533,2.694277381485394,4.452625951429814,0.1145926847131129,0.9972828069166362,4.073427398224502,2.697893099919079,3.3436159205970553,4.263776045867143,0.5629118506516617,3.2215960932891363,1.4747479144294018],"p":[0.1260602411978251,0.2725232148388619,0.14314691079026276,0.4452438414107187,0.3073310984276769,0.846212735549007,0.17149246517712613,0.713001660263592,0.648717452197414,0.17510423468497338,0.32616174950192334,0.991818290272785,0.7527569410765471,0.8271660345841605,0.8407001602634072,0.49822877572395874,0.7064866585346596,0.13188400461064997,0.6733557097368505,0.34829672874061623,0.021006809149189287,0.610115629363648,0.012327412982986008,0.31991768620012606,0.7671421227241273,0.28073681116056415,0.03884045148157611,0.29501454725592,0.29222393653223233,0.8911499326330392,0.7215955966072465,0.20664843106803543,0.15316125512525613,0.8532086512090529,0.15402074860800075,0.287826794002114,0.7061948671764589,0.11236690398517846,0.025772542534976406,0.9825029408422083,0.0002755098041309356,0.1403713929632191,0.0031422746834592896,0.48032567367069956,0.5026131819849999,0.8900301119268486,0.6192080243177485,0.5277102236233382,0.6762258152949518,0.9129967780875927,0.4752261622593126,0.9083300512796801,0.14415998587169132,0.49751370580728493,0.9805371343981197,0.35728781753275873,0.6336339899662662,0.7225575133709963,0.19308547926764308,0.8442552322894914,0.7643406468549081,0.4028569879006325,0.6686732451257886,0.538885100413045,0.7879533034663402,0.3722081003207587,0.9456360863681557,0.5728683281178841,0.7217434242708984,0.1798768808864335,0.7693774785918175,0.5080404403177468,0.14480422496730894,0.2900649098505004,0.46918922415254705,0.9973786132782183,0.2712380645570509,0.9098350240919151,0.17224497530539828,0.5511824733612736,0.40263050784294174,0.44455355846129363,0.5559577821868948,0.5303179190312732,0.051944393697596736,0.04011509642856459,0.16845896354180878,0.7919682654700264,0.34192478076508004,0.0013791566562746382,0.8480063483469409,0.12704428212588326,0.07192992487823147,0.6544383558821909,0.9910410425552862,0.6672984433802249,0.14736254095165124,0.8980527208752047,0.43546757146945136,0.553544123233825,0.6218929366611106,0.796677454867198,0.5713305527588772,0.14176392097254165,0.4653802169057688,0.253767734674045,0.724466289096261,0.536583647220628,0.2578335929878719,0.43021712254440914,0.19522552814353955,0.4525251429673878,0.0917163398938845,0.7993891969726235,0.6404265799384967,0.6931713999328803,0.38592860287716135,0.45647825597792346,0.3898172314966586,0.4750526281343821,0.075138286849882,0.9830353416755,0.6656218930877289,0.4988432616213845,0.49440929853791915,0.0933364128878802,0.8409291283194447,0.27887323343588544,0.9515272893069024,0.09316122984827069,0.6111555060013831,0.21087152324288172,0.7998794876049504,0.5983516109362317,0.35482393147908775,0.9682271239597009,0.28038817015723594,0.34130186249019223,0.6466061431373371,0.7609058070361288,0.4430462541404019,0.7109238495863988,0.5378703860728251,0.8531613934567166,0.4836414906261397,0.8056339772735333,0.5845568010496098,0.6408595771421353,0.515897830817643,0.8611280106202166,0.5452807909036261,0.3950053128745885,0.5502457418090241,0.7043730590881558,0.44434949354697006,0.5671318673021046,0.9171820346800204,0.17111264253976222,0.6659560462176579,0.8609483500802539,0.5560472974175588,0.4481260331534933,0.37286344548699213,0.627629396378202,0.6197199695449731,0.9836750203840625,0.6609649118293113,0.020582397598726043,0.7667841126844643,0.9835176726750088,0.4141067665402838,0.06621457521394247,0.08570820887620223,0.2170415528441092,0.9089478723307656,0.7270353557591152,0.27793463319987355,0.3393141381288798,0.9534152817892914,0.9965905304441376,0.9679153622942365,0.5777219037078083,0.4036186226142444,0.6362162690776481,0.20228858109744752,0.2018452630163201,0.08698625727354581,0.3817062337683801,0.7342450950122101,0.5573440673913328,0.9351073504287228,0.7515107128269067,0.931632931102617,0.894000261492685,0.44857262939678955,0.41128315396008075,0.18465909396398272,0.5925042080458092,0.6911265946748413,0.9993783796655238,0.06923334527503044,0.43403707946951586,0.1205625927203886,0.13102249802403465,0.059611692868539734,0.5818561424141613,0.08811002390547706,0.17475679276970535,0.006763944545759237,0.08424989690370865,0.42172201642919904,0.5218077779689911,0.06137644684389376,0.20794298060545802,0.8551328668115776,0.5746638632138299,0.23568909673900684,0.5093270387999216,0.05496948025292281,0.2329169005046241,0.7229593662157816,0.45408764002254665,0.7478204067779033,0.7654466093780541,0.8555798382980089,0.5385224001608413,0.7024573115700643,0.6297999248654869,0.004207080319818868,0.453884615914528,0.5075319923554289,0.8848521011847255,0.2838175652030279,0.2992030516520088,0.5699462320244162,0.7537395682226613,0.7083617898636243,0.2362025033537105,0.3616687236175753,0.16120799223977356,0.6240103545873039,0.9271610563035835,0.8159009241855986,0.046577515497408406,0.27201744021993535,0.6476497170528219,0.7325121157653722,0.7106159435978607,0.8470218012840665,0.18474273407566555,0.2149156423325378,0.8471679554829212,0.6530749115239831,0.9278470942611488,0.16612064484269995,0.6832175615598781,0.20379570104082378,0.3422283526229781,0.25375333839732006,0.5714472636719465,0.44202860296362045,0.7684155603039895,0.5459326514759031,0.6502764539363528,0.6502317287106809,0.45137187713796645,0.06294901809266329,0.9404521880612509,0.3699058783242075,0.2448330964723815,0.9554124052824653,0.29178426398205426,0.5720929400457135,0.5835307939222252,0.7053420340795176,0.21744358217582072,0.5679541779475399,0.17103644935593532,0.46407228442013304,0.9051746374216172,0.0648689500899462,0.5620501173152079,0.8998765409743843,0.9563402772633423,0.8481608440779898,0.2936019392295206,0.9964876465886348,0.22228555677280815,0.9991073801762238,0.5129245528009674,0.8247902988948315,0.06877255333997545,0.8533041215736308,0.7863613217632661,0.5304275921799935,0.023816780037136054,0.5439546748588979,0.9228607523701446,0.5961551178037725,0.23431941171492277,0.5346374658628053,0.7146752953653657,0.17764945283466727,0.9410886328980632,0.7962247572118419,0.14926783607400096,0.059123080621986235,0.06491550943855051,0.4368152719608618,0.24492231097002448,0.8960597538492989,0.3193322290385392,0.20891760069197796,0.47609275132953166,0.7262247921036342,0.2133936735699089,0.9030846352163613,0.19014467137931623,0.8906136578787092,0.8202791236463214,0.013125238051008958,0.9264397516354066,0.7747526554237743,0.5669307075822083,0.9587136217804029,0.4813782249640086,0.8779847616458214,0.2325689081663147,0.5842409452826818,0.4151021044130958,0.0025500379034215648,0.9864926692879987,0.6306306365460352,0.27560833077848,0.9890300622075097,0.33691386743084495,0.9710614768491186,0.5637381261663827,0.3302522060873361,0.2674463400791407,0.24034490000977282,0.16207889091695304,0.7300852303316703,0.36799070324523475,0.2582206580799611,0.973259674937512,0.11828653414440371,0.4658693368244051,0.5959718189071104,0.49232025373091215,0.7387329919687129,0.9126809710103783,0.014261234847427806,0.9384755388031902,0.4433033638748165,3.993970650117973e-5,0.587827782342333,0.84403119327804,0.972311622708321,0.9376673340584585,0.03668263050031162,0.2344736194503383,0.9680388653234127,0.7622116397365559,0.13320941930921615,0.11095479074764492,0.325913364012145,0.9570322876086406,0.07578537147881792,0.23609954529087607,0.14688191308192633,0.9604738324974889,0.10757102614535685,0.40996952109921536,0.043784390715008836,0.6796658048139774,0.2806586673194815,0.7291380826626579,0.02542814025656015,0.46227310516903697,0.7122903852585183,0.8067885125200287,0.1330463040398171,0.47437970982850985,0.8850554351085904,0.4929306974408172,0.7643557977262636,0.11830557452267754,0.7490014185182765,0.3951158286043659,0.5993846363853106,0.24360821299634772,0.07028037473529869,0.5563682832996901,0.8381810610706335,0.8455641298508145,0.6660311691812884,0.3550224296193778,0.49576852627417756,0.7767683910125063,0.34800147078313715,0.09762421300936208,0.11278866600890969,0.2677624485517549,0.07560844686399926,0.36780769081820686,0.30618731772109764,0.982637459263912,0.8821491779251665,0.5698148763746687,0.2919355500534917,0.8522727866579785,0.8734560609912125,0.7743026607598433,0.3984601267401944,0.0025623921105408787,0.629403628346977,0.37615217988075944,0.5434243890809602,0.014285956512402498,0.6098730899713993,0.7511633005600022,0.7194557340984995,0.6426989649572605,0.5172282126444567,0.6852172444451825,0.34040879664866175,0.17357923940714937,0.5595874959738789,0.32222842782699446,0.49719022555197223,0.08719395780802142,0.40805069399652005,0.5861989027182601,0.3367157567434613,0.41357030904195047,0.5494043602793306,0.10988496017700045,0.5682409000114097,0.7369709794697652,0.5697436596913463,0.6066150278374314,0.45518091529161686,0.40899117256732964,0.8560364239638378,0.5773730481952124,0.3406973541551457,0.34617472480803224,0.029274486458759075,0.44816760335828376,0.6254029136661352,0.5076670736924256,0.11909056244891802,0.2541021957372198,0.12047631145246118,0.901445970485119,0.3749698927731422,0.8448243053098983,0.5405114621758647,0.2866397855570033,0.3532688774070094,0.523888716171663,0.7967166273323765,0.47430484056993194,0.11339323208471264,0.15318152280724928,0.8214591075214865,0.048747716733147595,0.4686698027379024,0.8440408512903186,0.2944421800715815,0.8127560058734125,0.5128400005235922,0.03093927260578888,0.4135463035477156,0.926311855371887,0.7334026628188748,0.9342672316203575,0.04230878728729537,0.7880341771967496,0.6810598825566663,0.08295248952353562,0.7831920143281106,0.9162244612564145,0.17895248470845693,0.14066992980042192,0.05965654230153028,0.1974424119605045,0.7256173352745032,0.573442640563343,0.6279371865870167,0.38017785706909013,0.6880369959590213,0.24140193960329204,0.6164827512058042,0.3212760253450624,0.28224734423638176,0.6065240774916034,0.06944880818688581,0.432898544734879,0.03448405793774412,0.02669681505224042,0.6265895389471652,0.07580380976009238,0.9085864325543054,0.6981749811791209,0.6215176348163822,0.23258835533779632,0.6448396499011451,0.4623814318627215,0.8750422817948644,0.2840596200590815,0.6414026243076283,0.7384993505557258,0.28449604688481567,0.6525239868017578,0.31486333119508814,0.942587340567137,0.20650915522974067,0.9426845234011691,0.6442582410105908,0.20216290186035057,0.3721821558073408,0.45660664015543495,0.707920196781396,0.31962668052370025,0.5290252505863939,0.324528585155059,0.2780189835657523,0.5716161591769748,0.7945782251030702,0.5400768355421834,0.5707218390625848,0.7446860589979947,0.4050855412405845,0.0968356821876386,0.7252212955079567,0.3220886289851814,0.19431677076323184,0.8348674096200193,0.16709438925888853,0.6827805471970867,0.2294283715074117,0.9414140524777626,0.20734277355554132,0.04032529514522776,0.09932670809508615,0.685690139016828,0.5327532086360287,0.6493541203776763,0.07608574656436806,0.07091685974275763,0.606814160354771,0.7059416346570289,0.9000532627163487,0.36431394616491475,0.9336931766933165,0.9199385477653141,0.3283420239391561,0.5062052426659689,0.6563741761881743,0.3683708635713363,0.8364224481907228,0.5904853538855797,0.6623255586566485,0.8581770573824061,0.9043853158621684,0.27507100002196183,0.07686873148696827,0.04836459379677649,0.5680760027173308,0.4313005360931954,0.6939970878528394,0.43045263669754963,0.5272024193332034,0.5534232611781948,0.7071672317859654,0.9236877020063048,0.20251506360174032,0.7525654812475837,0.6979307657343596,0.7985160197386985,0.12750256622919065,0.9248139860990605,0.09862819622190067,0.8866928884309233,0.6427535297566711,0.7293917585586194,0.15174167418821005,0.8137839038819832,0.7908376044375727,0.7033057883017375,0.6094782343341985,0.4421118941930666,0.3930690605892406,0.2907164381721543,0.2890236900089975,0.6958817998340465,0.4643083330254585,0.9191013469118641,0.24626424165588867,0.008255791994996597,0.4951801541852272,0.8804132870833652,0.259956984507113,0.2810808039318593,0.20338227896754857,0.4505168199633438,0.30009624695926873,0.3345531517941076,0.23689223260886294,0.2330444039415962,0.6569859514947642,0.21772261105728097,0.001747016125727141,0.9233333528008474,0.9475355004760411,0.44532341137961606,0.37275852166388046,0.5987386394133376,0.9203215949499932,0.1879385332646597,0.9530395487694356,0.03170501732148501,0.16608791381364774,0.7121295495199489,0.14545968454778846,0.48629994088643747,0.3805291926657086,0.6565841566253732,0.7891914958723776,0.7149740870915251,0.4792527066284371,0.8629040390004843,0.522222228148383,0.4421231150135152,0.38916815882260636,0.271780125233519,0.7282987536100041,0.9499575018012709,0.770547503464978,0.21061697482058217,0.030518761591981303,0.20208385788353822,0.983655458576641,0.28612796351932746,0.03608714203801222,0.7890346708719129,0.5380470671088147,0.10721520755358127,0.943558598741975,0.7343828805935757,0.5492707151336571,0.08823833770742562,0.4411002959582382,0.8387848188039215,0.6469921350501322,0.021902190289661227,0.4133914509442338,0.9419589035931206,0.9355880277210815,0.1397566382108295,0.3673840735896212,0.7504947898531067,0.9020540590030863,0.8843116530016379,0.8875078946617736,0.6251604121292582,0.4774469785291968,0.4481082062087738,0.7081047194233716,0.9523475119055704,0.04370235992237914,0.1887717263088664,0.020985236864556223,0.6215214626893817,0.16827022088223753,0.7771300316654326,0.5715843415207547,0.4515244879650109,0.2683874677741369,0.1457284085045507,0.48451105019824037,0.7093669951679553,0.05653583299618892,0.6753959773972114,0.3150931268430752,0.32942024381102075,0.7259170596342441,0.13702499841383853,0.5192940333454963,0.45537694473870305,0.882247744985379,0.9710577839502825,0.015243794919630016,0.04621143838765285,0.6671668780225606,0.38720861348564606,0.866424281050175,0.43555377068624845,0.8711528078281392,0.43913745657615766,0.39458775717962635,0.6312342681427843,0.6100197705694284,0.44126924172043913,0.7169099172850184,0.5065547457703286,0.39280835926080715,0.6439355719454567,0.4718568147897586,0.8315263094552725,0.47886836010883904,0.0411653137122876,0.22217413051659407,0.9858995945563542,0.745104013297897,0.8588931287015993,0.6707452838327057,0.007322721675139476,0.452739623655098,0.7473193933487567,0.6845106011315945,0.5019380335181349,0.843398863425084,0.4008675933153969,0.9624750174419372,0.7428763184896121,0.8725555773695848,0.17619969461556995,0.869787803381662,0.2316998187165915,0.5484319859018743,0.22231140533644878,0.6109831956721088,0.3766795042759252,0.20750435486534125,0.5393160801802124,0.4859547254438257,0.8423084437685326,0.06628441634291016,0.787365295920214,0.3985957638736928,0.6174881208531668,0.10815967618255029,0.788572970962929,0.5348938963307568,0.6012874632193168,0.932879165613882,0.13415564630864685,0.7325760551427751,0.3685016357996971,0.9944404606637034,0.2089048097583075,0.9693252440212916,0.08327549936724776,0.1206845156250762,0.5627765895239039,0.7175080638956886,0.24261614330979908,0.16373982292645595,0.11529063649776417,0.5288726098940006,0.6003074175925476,0.0969655193580592,0.8289008537576741,0.280838414382653,0.661929502060792,0.7940121451007818,0.8112965920068973,0.11136452948249853,0.8388874650171307,0.3816696915164064,0.48346283306051974,0.6459903005061389,0.8602499898733622,0.2893862722421585,0.40646066409278525,0.5439318430651972,0.0051022232715276505,0.41614283821211484,0.9052166562717825,0.8552482708683613,0.19816724944129693,0.2516726825345319,0.4608972588869762,0.11916950677032068,0.7189843016416841,0.4725223310237512,0.9007021296487083,0.7597643620862544,0.030687780108275886,0.06604655609637855,0.4253560267598344,0.42537712017932816,0.8040496911901756,0.883950533379855,0.787734472004459,0.41944906559677686,0.9176829256290941,0.3769720994197274,0.6361724806369993,0.15572283715778812,0.5950392765618386,0.43811860100074607,0.4437700052235152,0.7751341756954886,0.21677928689845904,0.5444100263862639,0.9810643620801969,0.6836760873451337,0.9913489431865861,0.5362411670923546,0.11484075812797756,0.5131241471384405,0.7557500575441769,0.21706364230153308,0.33004193811167837,0.34902650523031764,0.04001276538558929,0.5149834899380303,0.15273382971876015,0.0430103333937808,0.9187226909811474,0.3700167641263512,0.7941470421428312,0.4838671096649909,0.9306945334777914,0.008525192628526357,0.8105406628061913,0.7368300707629114,0.14909336206733226,0.1837289816401355,0.47140995219988646,0.09801457998840712,0.42054593354910463,0.9254736487699675,0.7207131050876414,0.2614005258453369,0.9140479794397134,0.4393003148008814,0.1643796068316714,0.5315683135059246,0.20463511596569672,0.24778889251992942,0.9557592692901613,0.6215176595870271,0.9175243039344922,0.2508282664212429,0.11392323542150051,0.9695766300811532,0.8038831426407975,0.8038189031187484,0.8922074480111344,0.539873791314057,0.4368091035650976,0.4071219018042078,0.16664896229860737,0.9364325235519346,0.16180582901178098,0.34436672073183483,0.9594109398340103,0.3824057496470108,0.32286450854355997,0.38211839142319626,0.5553301454985431,0.12337114102796098,0.8080593892384931,0.9412019263651434,0.9692063813789495,0.875201987786695,0.8338884057182403,0.9896584194136613,0.7334527473819152,0.9944875820906134,0.7306771849239435,0.8137430011078548,0.23086076313288584,0.8192637004047496,0.591920941809108,0.5616648608487049,0.4165121627775572,0.9765913050351342,0.6349711329582728,0.27323162207794915,0.679930087542679,0.9157972460975075,0.005077261549146561,0.9503550895502386,0.9127362448363747,0.9963217335442807,0.6603476210855155,0.8854830504705355,0.3072671689876463,0.8272306274533054,0.7777061507309375,0.21264932980066198,0.5656206916067688,0.7750659500329962,0.22630319405419774,0.5772081558532667,0.9341738423894348,0.6655689019153699,0.2291357012062034,0.5479188010736904,0.435121751891804,0.616589383278709,0.9618940592010816,0.7905439307067927,0.9323407087649849,0.1493245384692925,0.03894578377044211,0.9657979523779756,0.6853805141077018,0.5953278987650983,0.3784160727297674,0.5595514358292084,0.18826098947970094,0.2701379860446078,0.3434109064038324,0.9849611082451375,0.32092017876966783,0.8405895903225957,0.30121796318090555,0.4460071644911223,0.7994365575683142,0.6284144198906616,0.18675906074440607,0.18253531669956824,0.09185883919724991,0.9625542821398543,0.32154734673860164,0.4134659336939337,0.07907565116470683,0.7287229880280068,0.7619904754749502,0.8057821949910324,0.37092382324157214,0.3178993289304268,0.5292713957775679,0.7405055566324454,0.017444515984379905,0.876100578771043,0.3757368361027653,0.8307036482995778,0.9068009539676329,0.17465230588737923,0.7305348947848749,0.02578689476927143,0.7930092422945805,0.31099216642264094,0.30305754689268705,0.7170584105744979,0.4227298410153384,0.33178596702247054,0.7037165784058372,0.3109684625426903,0.7877653041099175,0.9485328336289698,0.6599426371977097,0.10727427628907993,0.46820078888220196,0.7852520969074175,0.10180404765935758,0.04095793073552079,0.8826145284281364,0.60640111210606,0.7565891256578816,0.651456624678588,0.35260710015008856,0.0965361635164983,0.4862441627788934,0.3975960599887778,0.7145453413248419,0.73642251490677,0.9062912989769112,0.778191275428695,0.16339857417162928,0.9350462740999808,0.4387121603630957,0.9026640208982302,0.1167775190826823,0.8260629046157153,0.6367374229746194,0.9488589699622088,0.11419716279718162,0.2671172761508598,0.47947151339095395,0.17107224516393504,0.7994842984848431,0.6130595843753999,0.2657881008194938,0.2279433766020147,0.4574563410837593,0.6484342366412825,0.023294825577526712,0.45599873601181673,0.10633120507499028,0.17079147180865295,0.726395860087395],"mu":[1.924115086956426,1.5869147397731753,7.35098531466029,9.580829194965473,7.310587551955992,6.4606901262809036,2.432925746795782,5.2080223096974665,5.616804290815471,1.4184991828747062,0.021159807389696805,0.7052710480301649,1.9839791432815757,9.069715122140513,3.524268327631419,8.487936907241938,8.060555860576228,6.059373728751732,0.07238810902674198,4.192814337826172,5.525774709515123,3.554361622169151,0.6658204903455278,2.8710919738079133,0.9486024385300929,8.340815222641638,0.3930714300418292,6.293477252275825,6.245137083830015,2.955050117301292,4.998916992388431,4.9181425775133825,8.039557947000326,5.184922574326773,5.41462335634564,3.371954245976856,1.6656410395405774,7.89549381745416,9.634359663523643,5.0227430406101226,4.650686272260707,4.502132558113234,3.0389347199352734,2.1265249242267448,9.54293949292869,4.250042362611701,4.170184472656304,4.767582036280791,1.4769108465964442,8.730826481180705,7.25288587666318,3.0303381008520436,2.158494825674817,3.697304055826327,7.163424722986161,2.41966761641097,1.490943490787493,2.6227056337557975,5.646232396639728,1.823725220456649,2.7585582109926254,5.950707702896166,1.3204017993048645,4.159123998666264,4.65739500759851,2.85682423552182,5.552340384675483,4.206580815599454,7.094556948738562,2.8451302919649057,8.984641945168923,7.027290846359005,8.571682229899766,7.326844392845735,6.237291423659426,1.9453359051556518,7.252970344026983,4.335327534792926,2.08635537721241,8.449092514893536,7.473321203327615,6.4411602562300345,1.8780538021402293,0.9807149205523658,3.6871450042745635,3.6291730281312473,5.328043162937592,0.8173106932103291,7.833704261972036,2.637855464405212,7.783576161255663,3.3656915829827927,5.822215721639045,0.890372108742854,2.5890560470962853,8.080585027948768,5.647618011002629,6.265847361975294,2.548823944608549,4.159539318543017,1.2655983343349364,1.0378890903849314,4.656914224000548,1.442022601840498,5.447288164025046,2.1110355844734596,1.2568333584669156,8.100505883192877,1.9617816702392332,0.7357778471770793,5.977948539907758,6.61929493579332,7.575355209777879,3.634431410534349,6.536394885032919,7.0595050601024205,0.4707407529106522,0.18840932359396323,2.033818376879941,8.889826672524814,1.015216562788317,6.028016738158022,6.6153860455731035,8.542792252979176,0.6139297695497437,4.703253577258275,9.408295198574537,2.8860643472242886,5.198030983231625,9.93589940982734,0.951793272838839,8.556137385374177,1.398964124709987,7.590800650295897,6.509257828771173,6.324971235441145,7.826098825221579,7.286776557228811,5.514802405768848,7.411066788697553,2.4589797313766537,0.36726752829840503,7.035030992885252,7.2003354304870415,8.752680461953927,5.050325924599823,9.50331918689736,6.998517710053871,9.831997665437806,2.492658661966798,0.22108260765739463,6.812624692621498,7.086379861391865,3.240038953232678,1.1008408355669919,3.2549033510282444,2.7344679034529418,8.808015392248056,1.131343953246915,0.28748548552008923,2.155923786360554,0.24119125752520176,1.3461345843396577,9.810604306204123,8.19792943413448,0.12127868866035563,4.630671713663195,4.0725909406853695,1.0642125747130837,5.047961958532927,0.5252910914412556,6.488443289286073,4.983739830632987,5.362912352773465,1.7512503158112835,2.80641759412974,7.482657100915604,9.246070007838656,9.493989617512089,0.12400204114867419,0.44778886128022277,1.7635633623630431,9.431741696830581,5.53740688781313,9.872145018015576,5.421370526025995,1.1964535953231592,1.3376850166618715,1.2842875115333152,1.3944093226380594,6.982139005318466,2.747853976651513,8.95186911108717,5.160425112269502,5.8155898370757235,9.506209117835036,5.245434999659933,3.898702268553964,1.9259642679469735,3.7511900102290707,1.2982097149505,8.55951360923286,8.58904811041902,0.7435138974574595,2.790723400170878,9.970739778909778,3.3935105928434317,9.930922366568925,2.6257853752614735,1.4232259978424366,2.9427279562899766,7.829645233676681,9.791426263631486,4.508399095752742,5.961716190744006,4.148132168856023,3.071913385219942,8.309847317539658,1.083547870475925,9.604414190716081,1.0244355917703052,4.360995404590799,3.5618111032337163,8.916106379037352,1.6535116000616523,8.252896024774092,8.66465471358783,9.785245034879004,5.366017325435893,6.40682093653626,9.2979583929438,6.610818765435214,6.806696254615714,0.9137228188762947,7.694259115631974,7.735912269353216,5.372106223619671,9.489047548815977,4.109537598714937,9.867070260648742,2.825412938318268,1.3922133433313966,4.195737624938776,8.049249604765738,1.5125883313624322,7.188007498718743,2.3419670036564355,4.802150453099594,1.7897963246401205,2.4973782087055296,3.717208655350135,1.459607064900803,2.9870119624105484,9.517896936194516,7.036211481181116,7.348184504802779,9.719025524335997,0.5726308759594634,9.379494831707191e-5,8.859308629227714,2.403489417172515,5.89652546115091,1.2784656081641121,5.225078042800835,1.546530168146265,7.5261684933038335,4.5946829839310315,3.62701080678943,0.5427842825147411,6.603252263409902,8.814495925061689,5.389019044201007,8.146349753924644,9.388025209409816,6.6443772755460095,2.731648256256234,1.078451219533516,4.079891917508003,7.442060593906074,5.815217930540959,8.216814950545778,5.903627627839247,5.872969778309097,6.352636885997629,7.060475323003019,6.716659306777708,8.671912215497134,0.4929586748999837,1.089857554649143,9.29960907325686,7.601219783047634,9.057833261705328,0.6700562421390877,9.741349340372967,6.992408696404162,4.906329359505783,7.860873295132132,7.673443589103622,9.009812321588361,5.690852340810242,8.931313121562138,2.7555229158627825,8.174804542530435,0.8660003596129462,5.545128077911638,3.631827510642067,5.598119226449785,1.2081002365321636,7.598411664008717,2.2017293402131455,5.595393523464716,1.0151620496754865,2.804359090790167,4.429082532337278,8.922999506775044,8.093403495342848,1.4742079302660427,8.282514821529992,3.339832065472712,3.1735350358850356,2.920681715303952,6.188377446486342,9.605471853363357,1.5330634493806383,1.7824188827285492,4.7843497492461,9.69753322492997,7.578681036206818,6.171304738356687,6.724069217596115,7.846434631623326,2.7564187479575386,4.871200477878627,4.906326616289505,4.115061371932058,2.4762695033191506,4.515176146654277,0.1183930611532169,9.313132988611557,7.716319068031757,8.239945738846803,0.6334305033624243,6.158373068556148,2.6519537649925295,3.4808123278852854,8.124152309153505,5.503863850323569,5.670247380677824,4.408441649019029,4.91565659636046,7.257186419135024,2.6569722540363427,1.9547452770852702,8.06213153716699,0.6261399679813029,0.5605292849656807,0.30919545170051244,9.90217314651185,5.798896198243488,2.5804979652208004,0.5220259346082945,5.991484427651388,1.6433759221188926,8.385189418709365,0.7038827673600645,5.204810113887708,1.9472487315906295,6.932054193688105,1.4749054833553954,7.970588406336967,7.540439516181121,7.795374916665154,4.912116746255646,7.597538505898813,9.909337065665174,8.211620184903898,3.367359001466532,9.24393244680115,1.422023977681952,0.24764238802393645,5.661030166749721,6.714263065151622,9.297193196224846,4.423318204965505,7.926393369935713,9.960260382433137,5.454298241246431,9.908351347770452,7.1518493708615765,5.361090091577974,8.122604276934693,2.0264369334099785,6.297343753352047,3.8835241168704626,1.7974617660345693,8.30456929737662,4.60069307313862,5.681300060802183,4.256663664940785,5.110229062001275,1.6061042951385862,7.968790582724267,9.996372988181218,4.5268591357526855,1.6838386475221978,3.4716169607480074,3.9383397131285913,4.65172232563207,1.7320867979773125,1.8011795008407394,0.9845756690057428,2.1567551537938523,2.7556024407197377,6.581085840987642,9.827769616375965,4.009175119443464,8.937379400467085,7.42748181250346,4.178001507057319,0.8831082590352435,8.647961379724915,7.745082996605783,7.755918896335087,7.935615855117868,7.6156863454504915,1.867228917403172,0.036371890554762754,5.874521853802825,9.072842135782597,7.479750912102223,7.060269910197395,9.124749991176763,2.542781337279403,9.331186603109254,5.409145414362451,2.9256158019851553,3.976255346608839,2.8927857678271507,9.947940715867086,4.07718536081755,4.863924581034002,9.45190445064281,6.658048942752373,9.994969352244457,1.0774205978951734,1.6324240663584533,6.144128193513461,0.9266265798253337,0.19538979099757992,3.207201091649907,8.676089701061745,1.7492887453149164,4.690894969577992,4.269483543217902,0.5547279854093357,7.416128297702822,5.441225513064538,0.7916234860125182,9.158730305980665,8.339126169054298,2.7570145678123748,4.180328739556412,9.133480378008974,4.599955709926251,1.7938011277276766,9.043407070627357,8.54835338912414,5.341126135425478,2.5305531015252725,6.279925211412558,3.2553220429288765,5.369869850614091,8.868884793137351,2.370694048735631,6.545935223774977,6.674722718648662,5.389847453346322,8.899543135779556,6.015760934303476,5.423307237635246,3.1415900359840987,1.4706113826667577,3.213619296915451,6.832615928792729,2.252260007055138,3.1043119246755446,3.5385093952004043,7.809169696113905,4.936710840336862,7.666556329329524,4.599565079958339,0.5387153127105071,6.157523111403602,6.934319523623369,2.159668076955499,7.699143881427415,2.826560215171239,9.387610365764985,8.825796116221413,0.8379185822787893,8.296957645897729,9.848395853684833,5.91780199040314,8.706758194250497,7.744468315030282,8.452817934195467,4.249437129778004,5.629915294152927,7.706999041453786,1.4516141173130181,3.29093504138805,7.541680951631406,0.798962303407893,8.257261753869294,0.522279776257466,4.035637476214024,0.1778389744134823,7.022631948551292,8.577095588451778,5.302308599527374,5.827391943336329,5.441775204893888,7.559778304397544,3.5375999687578386,4.628093369486674,2.863827559577261,9.814820031877037,9.579567973593907,5.115054049958461,7.200946830303996,0.7206558077016578,7.42148290755827,2.2928501755991304,8.071307588333084,4.385307832443946,6.51458899655641,2.6986120610213504,5.939958799831713,9.158933727685813,9.811945943074933,0.17616722834787435,3.8217451486383625,6.399922201898194,1.7855869997741847,9.17079781750089,1.0192490982395186,4.193033268426185,6.850736725268558,7.128897970922212,1.3880362078978803,5.354624164201763,1.9422901041803908,8.543391924359199,2.05817966297253,2.3915054425278526,5.135222627519416,7.295304267173726,6.741373496897882,9.765053698563868,5.511943204126515,1.6197907936389822,1.7578112077231811,0.29965199693084976,4.635870355033973,0.006798449420444275,7.425910988065231,3.471337271926276,7.769218935539055,1.2658375621871087,0.0987271642194476,9.263845348798824,3.6811415415357174,9.725371594000144,0.6338715395757388,3.988114810668668,3.91919630307646,0.7263278958066377,5.464144975986958,2.8986266309223696,4.969129824217198,7.704130358808358,1.5671382199078487,3.8655600131259304,7.9147623319331455,1.1293826102326299,2.2659113066835124,4.987650644175108,6.3136189492603485,6.396767221994688,8.829092179421774,5.6315918441658575,4.492035379390538,7.953628121327235,8.027398290925237,7.914698679761072,8.705081109895747,7.359119493293187,4.21280622927674,9.047832317191762,4.075932368261997,3.4798537035740273,0.12283321912452294,6.803191547808041,4.139246704743749,7.520101974208043,8.283859427612333,8.560366396352535,5.666222855997816,9.58514965330439,7.103353111321072,9.688076913191603,2.9099844825020815,4.742431024550915,6.8920946080470795,0.40594857208612334,6.653530968048507,2.6848945743508934,3.783049302442285,9.197377165899196,5.437599317096873,5.514263916907344,6.626080558999381,3.065297195370411,8.186899901706447,3.1802973993785333,0.23209751181665794,5.113559214518957,5.499571526677338,8.514472465193307,1.5031859537079617,4.111205286364945,1.4086554802669449,0.9870488915327025,6.615813973252436,7.739501651377257,3.6375288910546932,3.1754006012130365,0.8689731302597692,7.34418195425425,6.4792175788557715,2.3037189471195996,5.313140353729073,7.741943376116353,9.992885200162396,5.507938908716994,7.427857707283256,2.084258902227667,9.753920236454132,3.5343900598229405,4.617650557006732,6.4950244213243895,6.746989048913616,3.3808935597459433,8.10568273202672,9.126652888068485,4.839857950943638,4.618967708787796,2.5699346862164063,7.641090626284139,4.000717867333625,7.951272231470283,6.90430782537971,1.3208691147048057,2.5077882293613962,9.037908035701701,3.604848585182243,6.484516288855158,5.9775920937697276,9.01342259921307,4.505790076691456,4.20796852985214,9.131006704255004,9.972153072914194,5.7348580809259015,9.082434614377359,9.181100169398682,3.8247788458636522,7.867385912701044,2.620226482406298,5.705018251460561,0.6460433961755507,2.1199510799047294,5.877158196768932,8.775554951987868,4.028402091317411,6.11194306726349,7.119434306654426,1.3179027366678464,3.7948859791046097,9.17664399074128,2.6125439836956765,5.76007805585556,1.2041641160281102,3.0515193585238776,3.0258112236105306,6.913043986355635,8.096812215582181,8.390243229074759,8.310882815324012,1.595441170125118,9.990689294673796,9.32317214891581,3.984608419234126,1.6831870722934128,3.0583784047029594,6.497255927875836,8.003478975658748,7.208884733929488,5.652067937937697,4.1066359555577625,7.308607037869381,5.478856604580624,8.604733579094788,9.769839000779752,2.2849983867126755,5.992427510733482,3.218514150152454,1.4394552588228748,8.405983726259771,1.4720427939729963,9.153419801003583,5.237928168669168,1.3978654105066135,5.605927142066434,5.8157714401681755,0.9218022059730968,1.9411339585544019,7.53944345508253,3.934628866005474,5.665273815774965,3.814018582679135,3.5128248055272016,7.695503109625809,5.94246659730894,8.428915358845448,6.572726913820719,7.528448315799629,0.991451860120558,8.928788427615686,1.1410190345438287,0.6932684894866203,4.895281965883083,7.338799263768276,0.36007068401864073,4.963444728159985,9.125705770893845,1.8493169761553108,9.729547728846136,5.52771005066224,6.480474589489247,8.543498207712277,9.942579502258187,7.935576942011933,8.259552783003347,5.603704955380966,4.044572264885242,0.3972698865659119,1.9937971085067763,9.691667820162325,7.340048696112813,6.141546604769237,5.649393049585962,3.9924784076506303,6.981997450274031,3.3333720040685955,1.8506056497534518,3.5871124244244657,2.3960997009358564,5.265287394302343,3.379412594445912,8.602856671011814,8.602389927239392,9.931701098932578,3.5578419641899695,7.660411806286225,4.832231206560986,9.281769934686032,0.6419841068682297,3.071927597277331,2.6286582376518774,6.941242561929668,0.27518519848839906,2.9113608760812837,1.3663871761026036,2.148644553232706,7.496019587092897,1.8881090003734258,9.917691042862305,7.009995730902531,9.4970763152062,2.97905385584855,4.650705635803696,4.972477869625207,2.758507490385773,4.8746781810514666,8.69741954582822,5.026141456330462,5.127636261274935,1.976592382851634,7.064378052810838,7.128624500837932,4.8158998840471785,5.089472875856009,9.170810995235037,6.990777973821487,1.6779045170561102,7.063003570008572,1.0910548482471394,6.1902108533325295,4.618931742849243,6.1973551642681635,1.271096918363288,2.530585387608686,7.160426557466728,9.53768196488683,6.4410913412137605,0.8833506006213865,3.8797749225685108,1.5803490493225913,7.286339574608675,4.710146748054218,2.246635688598917,7.89049939770835,3.5378507839690676,9.557640867421973,4.514037562164972,0.7511338023449476,2.3332618897859025,9.033589485698542,5.118328567244522,8.741286504722495,7.785347006586109,3.552048707714035,5.406675463452202,0.25962481783324165,2.135922277188471,9.314878041138448,2.9179383845390316,5.096944959711034,5.018954862157495,9.491253060669418,7.368829024779595,3.8456456188298405,0.6561031262854655,8.935307018564613,4.881293134869431,0.26021422856538967,5.023707979547587,6.891783147106965,0.7214347920614328,3.9638914914863976,9.55065464074585,9.8167382150061,2.658889995039724,1.9642227247373367,8.26385964172842,7.85003049596249,5.055874081643921,7.939998395875849,4.1313847526571905,2.720139381667497,0.8686592659290326,1.7298312930091564,1.2320471249278908,2.862279557720262,2.0169862520665305,6.940323197066139,7.256484723659549,6.357899273885987,3.238319012880988,8.81119053679452,6.710915344901272,2.5090836899919378,4.77830483218157,1.4750753449534248,7.826473131744809,8.192646432436927,3.831635124095083,9.777067872976437,0.33690374892044517,8.369943874280585,9.379387561401218,4.375058911858627,0.613092495434211,1.684162146618391,5.69697426758186,5.695690280501613,5.453040131700528,8.15214956879171,9.400852557163757,5.713896935263996,0.19732988282953778,0.9488320595326827,4.5982700531570515,9.516044987708527,9.359866042428857,6.689102721145659,4.141455628966648,1.0559560467240248,8.645087281902368,7.313191193827501,3.299800455772468,9.919661254865781,8.050769832701107,2.3862081300560622,4.673842624556688,6.330884121992009,3.2739098386796073,2.8876458948005768,1.3194953659248276,2.7932224242264825,3.5853070015264143,1.5918657446220519,3.037620042523046,3.994838432190768,6.907513138365912,8.340940368339066,6.876091097050905,0.9892417124821296,2.0912761765562293,6.175671285160433,3.9192854234811736,0.7793036072069581,9.069856645812575,6.3404910868018804,1.8519957964206823,4.371725063837908,8.241603193101328,2.6215465200943844,0.6469966585784515,8.655507626995682,8.258019294473309,3.435436657528337,4.014033782307305,6.012091971282629,6.495447455595105,8.957167721165348,9.685751779201286,6.864807718145441,4.2119916523396945,6.774913480877061,6.175472385965676,8.49777627625556,8.995261419973815,3.9930803161224326,5.203187738124903,4.644432452654515,8.730426914089868,8.846280906275144,6.670514707765792,8.191421926556728,3.0512529417424727,3.3975212487263806,5.659091013447797,1.883684936181944,9.44985262477756,8.505643686405227,6.820612590514575,4.145209253111197,9.52133906320447,3.5587437212568984,5.440003984300379,2.357014731929341,0.11553434473392521,4.888614397374809,8.531013281128423,1.5790872025148617,9.784645332389701,0.028894155750840422,7.057305478003537,2.025697847941985,3.446912952353256,6.366877465608665,2.7281307323485726,0.0679808946598337,4.102350475848818,5.664356740286298,5.165987913912287,7.675644505408917,5.947827835685462,3.7372787055886825,4.375010449806225,6.96689333952861,9.493573849912815,8.393350210443408,7.350755329076257,6.113413088189576,7.888339867909142,0.8534485196018071,9.174428171711915,4.782677205357131,3.32295637357096,8.805838377459041,4.548851514404689,4.401230988960714,8.66756844801278,0.7479442156390648,5.857822087334698,4.3223932356122985,5.740236170007367]}

},{}],80:[function(require,module,exports){
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

tape( 'if provided a finite `mu` and `c`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `c`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, -1.0 );

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
	var c;
	var p;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], c[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var p;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], c[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 350.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given large variance ( = large `c`)', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var c;
	var p;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], c[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 30.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/quantile/test/test.factory.js")
},{"./../lib/factory.js":74,"./fixtures/julia/large_variance.json":77,"./fixtures/julia/negative_mean.json":78,"./fixtures/julia/positive_mean.json":79,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":235}],81:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/quantile/test/test.js")
},{"./../lib":75,"tape":235}],82:[function(require,module,exports){
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

tape( 'if provided a number outside `[0,1]` for `p` and a finite `mu` and `c`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a negative `c`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, 2.0, -1.0 );
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
	var p;
	var c;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], c[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var p;
	var c;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], c[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 350.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given large variance ( = large `c` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var p;
	var c;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], c[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 30.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/quantile/test/test.quantile.js")
},{"./../lib":75,"./fixtures/julia/large_variance.json":77,"./fixtures/julia/negative_mean.json":78,"./fixtures/julia/positive_mean.json":79,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":235}],83:[function(require,module,exports){
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

},{"./is_number.js":86}],84:[function(require,module,exports){
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

},{"./is_number.js":86,"./zero_pad.js":90}],85:[function(require,module,exports){
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

},{"./main.js":88}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{"./format_double.js":83,"./format_integer.js":84,"./is_string.js":87,"./space_pad.js":89,"./zero_pad.js":90}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{"./main.js":92}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{"./main.js":95}],94:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"dup":87}],95:[function(require,module,exports){
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

},{"./is_string.js":94,"@stdlib/string/base/format-interpolate":85,"@stdlib/string/base/format-tokenize":91}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/utils/define-property":105}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{"./define_property.js":103}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":102,"./has_define_property_support.js":104,"./polyfill.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":93}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":108,"./polyfill.js":109,"@stdlib/assert/has-tostringtag-support":20}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":110}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":110,"./tostringtag.js":111,"@stdlib/assert/has-own-property":16}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":96}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){

},{}],114:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"dup":113}],115:[function(require,module,exports){
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
},{"base64-js":112,"buffer":115,"ieee754":218}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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
},{"_process":225}],118:[function(require,module,exports){
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

},{"events":116,"inherits":219,"readable-stream/lib/_stream_duplex.js":120,"readable-stream/lib/_stream_passthrough.js":121,"readable-stream/lib/_stream_readable.js":122,"readable-stream/lib/_stream_transform.js":123,"readable-stream/lib/_stream_writable.js":124,"readable-stream/lib/internal/streams/end-of-stream.js":128,"readable-stream/lib/internal/streams/pipeline.js":130}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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
},{"./_stream_readable":122,"./_stream_writable":124,"_process":225,"inherits":219}],121:[function(require,module,exports){
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
},{"./_stream_transform":123,"inherits":219}],122:[function(require,module,exports){
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
},{"../errors":119,"./_stream_duplex":120,"./internal/streams/async_iterator":125,"./internal/streams/buffer_list":126,"./internal/streams/destroy":127,"./internal/streams/from":129,"./internal/streams/state":131,"./internal/streams/stream":132,"_process":225,"buffer":115,"events":116,"inherits":219,"string_decoder/":234,"util":113}],123:[function(require,module,exports){
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
},{"../errors":119,"./_stream_duplex":120,"inherits":219}],124:[function(require,module,exports){
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
},{"../errors":119,"./_stream_duplex":120,"./internal/streams/destroy":127,"./internal/streams/state":131,"./internal/streams/stream":132,"_process":225,"buffer":115,"inherits":219,"util-deprecate":243}],125:[function(require,module,exports){
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
},{"./end-of-stream":128,"_process":225}],126:[function(require,module,exports){
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
},{"buffer":115,"util":113}],127:[function(require,module,exports){
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
},{"_process":225}],128:[function(require,module,exports){
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
},{"../../../errors":119}],129:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],130:[function(require,module,exports){
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
},{"../../../errors":119,"./end-of-stream":128}],131:[function(require,module,exports){
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
},{"../../../errors":119}],132:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":116}],133:[function(require,module,exports){
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

},{"./":134,"get-intrinsic":209}],134:[function(require,module,exports){
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

},{"es-define-property":194,"es-errors/type":200,"function-bind":208,"get-intrinsic":209,"set-function-length":229}],135:[function(require,module,exports){
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

},{"./lib/is_arguments.js":136,"./lib/keys.js":137}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],138:[function(require,module,exports){
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

},{"es-define-property":194,"es-errors/syntax":199,"es-errors/type":200,"gopd":210}],139:[function(require,module,exports){
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

},{"define-data-property":138,"has-property-descriptors":211,"object-keys":223}],140:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],141:[function(require,module,exports){
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

},{"./ToNumber":172,"./ToPrimitive":174,"./Type":179}],142:[function(require,module,exports){
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

},{"../helpers/isFinite":187,"../helpers/isNaN":188,"../helpers/isPrefixOf":189,"./ToNumber":172,"./ToPrimitive":174,"es-errors/type":200,"get-intrinsic":209}],143:[function(require,module,exports){
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

},{"call-bind/callBound":133,"es-errors/type":200}],144:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":202}],145:[function(require,module,exports){
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

},{"./DayWithinYear":148,"./InLeapYear":152,"./MonthFromTime":162,"es-errors/eval":195}],146:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":193,"./floor":183}],147:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":183}],148:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":146,"./DayFromYear":147,"./YearFromTime":181}],149:[function(require,module,exports){
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

},{"./modulo":184}],150:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":191,"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"es-errors/type":200}],151:[function(require,module,exports){
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

},{"../helpers/timeConstants":193,"./floor":183,"./modulo":184}],152:[function(require,module,exports){
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

},{"./DaysInYear":149,"./YearFromTime":181,"es-errors/eval":195}],153:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":191,"es-errors/type":200,"hasown":217}],154:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":220}],155:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":191,"es-errors/type":200,"hasown":217}],156:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"./IsPropertyDescriptor":157,"es-errors/type":200}],157:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":191}],158:[function(require,module,exports){
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

},{"../helpers/isFinite":187,"../helpers/timeConstants":193}],159:[function(require,module,exports){
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

},{"../helpers/isFinite":187,"./DateFromTime":145,"./Day":146,"./MonthFromTime":162,"./ToInteger":171,"./YearFromTime":181,"./floor":183,"./modulo":184,"get-intrinsic":209}],160:[function(require,module,exports){
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

},{"../helpers/isFinite":187,"../helpers/timeConstants":193,"./ToInteger":171}],161:[function(require,module,exports){
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

},{"../helpers/timeConstants":193,"./floor":183,"./modulo":184}],162:[function(require,module,exports){
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

},{"./DayWithinYear":148,"./InLeapYear":152}],163:[function(require,module,exports){
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

},{"../helpers/isNaN":188}],164:[function(require,module,exports){
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

},{"../helpers/timeConstants":193,"./floor":183,"./modulo":184}],165:[function(require,module,exports){
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

},{"./Type":179}],166:[function(require,module,exports){
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


},{"../helpers/isFinite":187,"./ToNumber":172,"./abs":182,"get-intrinsic":209}],167:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":193,"./DayFromYear":147}],168:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":193,"./modulo":184}],169:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],170:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":172}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":187,"../helpers/isNaN":188,"../helpers/sign":192,"./ToNumber":172,"./abs":182,"./floor":183}],172:[function(require,module,exports){
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

},{"./ToPrimitive":174,"call-bind/callBound":133,"safe-regex-test":228}],173:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":203}],174:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":205}],175:[function(require,module,exports){
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

},{"./IsCallable":154,"./ToBoolean":169,"./Type":179,"es-errors/type":200,"hasown":217}],176:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":209}],177:[function(require,module,exports){
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

},{"../helpers/isFinite":187,"../helpers/isNaN":188,"../helpers/sign":192,"./ToNumber":172,"./abs":182,"./floor":183,"./modulo":184}],178:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":172}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":146,"./modulo":184}],181:[function(require,module,exports){
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

},{"call-bind/callBound":133,"get-intrinsic":209}],182:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":209}],183:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],184:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":190}],185:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":193,"./modulo":184}],186:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":141,"./5/AbstractRelationalComparison":142,"./5/Canonicalize":143,"./5/CheckObjectCoercible":144,"./5/DateFromTime":145,"./5/Day":146,"./5/DayFromYear":147,"./5/DayWithinYear":148,"./5/DaysInYear":149,"./5/FromPropertyDescriptor":150,"./5/HourFromTime":151,"./5/InLeapYear":152,"./5/IsAccessorDescriptor":153,"./5/IsCallable":154,"./5/IsDataDescriptor":155,"./5/IsGenericDescriptor":156,"./5/IsPropertyDescriptor":157,"./5/MakeDate":158,"./5/MakeDay":159,"./5/MakeTime":160,"./5/MinFromTime":161,"./5/MonthFromTime":162,"./5/SameValue":163,"./5/SecFromTime":164,"./5/StrictEqualityComparison":165,"./5/TimeClip":166,"./5/TimeFromYear":167,"./5/TimeWithinDay":168,"./5/ToBoolean":169,"./5/ToInt32":170,"./5/ToInteger":171,"./5/ToNumber":172,"./5/ToObject":173,"./5/ToPrimitive":174,"./5/ToPropertyDescriptor":175,"./5/ToString":176,"./5/ToUint16":177,"./5/ToUint32":178,"./5/Type":179,"./5/WeekDay":180,"./5/YearFromTime":181,"./5/abs":182,"./5/floor":183,"./5/modulo":184,"./5/msFromTime":185}],187:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":188}],188:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],189:[function(require,module,exports){
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

},{"call-bind/callBound":133}],190:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],191:[function(require,module,exports){
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

},{"es-errors/type":200,"hasown":217}],192:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{"get-intrinsic":209}],195:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],196:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],197:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],198:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],199:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],200:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],201:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],202:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":200}],203:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":204,"./RequireObjectCoercible":202}],204:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],205:[function(require,module,exports){
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

},{"./helpers/isPrimitive":206,"is-callable":220}],206:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":207}],209:[function(require,module,exports){
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

},{"es-errors":196,"es-errors/eval":195,"es-errors/range":197,"es-errors/ref":198,"es-errors/syntax":199,"es-errors/type":200,"es-errors/uri":201,"function-bind":208,"has-proto":212,"has-symbols":213,"hasown":217}],210:[function(require,module,exports){
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

},{"get-intrinsic":209}],211:[function(require,module,exports){
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

},{"es-define-property":194}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{"./shams":214}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":214}],216:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":208}],217:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":208}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{"call-bind/callBound":133,"has-tostringtag/shams":215}],222:[function(require,module,exports){
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

},{"./isArguments":224}],223:[function(require,module,exports){
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

},{"./implementation":222,"./isArguments":224}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
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
},{"_process":225,"through":241,"timers":242}],227:[function(require,module,exports){
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

},{"buffer":115}],228:[function(require,module,exports){
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

},{"call-bind/callBound":133,"es-errors/type":200,"is-regex":221}],229:[function(require,module,exports){
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

},{"define-data-property":138,"es-errors/type":200,"get-intrinsic":209,"gopd":210,"has-property-descriptors":211}],230:[function(require,module,exports){
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

},{"es-abstract/es5":186,"function-bind":208}],231:[function(require,module,exports){
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

},{"./implementation":230,"./polyfill":232,"./shim":233,"define-properties":139,"function-bind":208}],232:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":230}],233:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":232,"define-properties":139}],234:[function(require,module,exports){
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
},{"safe-buffer":227}],235:[function(require,module,exports){
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
},{"./lib/default_stream":236,"./lib/results":238,"./lib/test":239,"_process":225,"defined":140,"through":241,"timers":242}],236:[function(require,module,exports){
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
},{"_process":225,"fs":114,"through":241}],237:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":225,"timers":242}],238:[function(require,module,exports){
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
},{"_process":225,"events":116,"function-bind":208,"has":216,"inherits":219,"object-inspect":240,"resumer":226,"through":241,"timers":242}],239:[function(require,module,exports){
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
},{"./next_tick":237,"deep-equal":135,"defined":140,"events":116,"has":216,"inherits":219,"path":117,"string.prototype.trim":231}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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
},{"_process":225,"stream":118}],242:[function(require,module,exports){
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
},{"process/browser.js":225,"timers":242}],243:[function(require,module,exports){
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
},{}]},{},[80,81,82]);
