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

},{"@stdlib/utils/native-class":136}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":136}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":136}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":136}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":79}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":83,"@stdlib/number/float64/base/get-high-word":87,"@stdlib/number/float64/base/to-words":96}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":66,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/trunc":77}],69:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":48,"@stdlib/constants/float64/max-base2-exponent-subnormal":47,"@stdlib/constants/float64/min-base2-exponent-subnormal":49,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/copysign":64,"@stdlib/number/float64/base/exponent":81,"@stdlib/number/float64/base/from-words":83,"@stdlib/number/float64/base/normalize":90,"@stdlib/number/float64/base/to-words":96}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_lp.js":76,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/number/float64/base/get-high-word":87,"@stdlib/number/float64/base/set-high-word":93}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":70}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":87}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":85}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":84,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":86,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":89,"./main.js":91,"@stdlib/utils/define-nonenumerable-read-only-property":129}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":89}],92:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":86}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":92,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":97,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":95,"./main.js":98,"@stdlib/utils/define-nonenumerable-read-only-property":129}],97:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":84}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":95}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (logCDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 5.0 );
*
* var y = logcdf( 3.0 );
* // returns -Infinity
*
* y = logcdf( 6.0 );
* // returns 0.0
*
* y = logcdf( NaN );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (logCDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of cumulative distribution function
	*
	* @example
	* var y = logcdf( 10.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x < mu ) ? NINF : 0.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58,"@stdlib/utils/constant-function":127}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/degenerate/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/degenerate/logcdf' );
*
* var y = logcdf( 2.0, 5.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/logcdf' ).factory;
*
* var logcdf = factory( 5.0 );
*
* var y = logcdf( 3.0 );
* // returns -Infinity
*
* y = logcdf( 6.0 );
* // returns 0.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":99,"./main.js":101,"@stdlib/utils/define-nonenumerable-read-only-property":129}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (logCDF) for a degenerate distribution with mean `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {number} natural logarithm of cumulative distribution function
*
* @example
* var y = logcdf( 2.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logcdf( 4.0, 3.0 );
* // returns 0.0
*
* @example
* var y = logcdf( 3.0, 3.0 );
* // returns 0.0
*
* @example
* var y = logcdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN );
* // returns NaN
*/
function logcdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x < mu ) ? NINF : 0.0;
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/logcdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1pexp = require( './log1pexp.js' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the cumulative distribution function (CDF) for a logistic distribution with location parameter `mu` and scale parameter `s`.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 3.0, 1.5 );
*
* var y = logcdf( 1.0 );
* // returns ~-1.567
*
* y = logcdf( 4.0 );
* // returns ~-0.414
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return logcdf;

	/**
	* Evaluates the logarithm of the cumulative distribution function (CDF) for a logistic distribution.
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
		z = ( x - mu ) / s;
		return -log1pexp( -z );
	}
}


// EXPORTS //

module.exports = factory;

},{"./log1pexp.js":104,"@stdlib/math/base/assert/is-nan":58,"@stdlib/stats/base/dists/degenerate/logcdf":100,"@stdlib/utils/constant-function":127}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Logistic distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/logistic/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/logistic/logcdf' );
*
* var y = logcdf( 2.0, 0.0, 1.0 );
* // returns ~-0.127
*
* var mylogcdf = logcdf.factory( 3.0, 1.5 );
*
* var y = mylogcdf( 1.0 );
* // returns ~-1.565
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":102,"./main.js":105,"@stdlib/utils/define-nonenumerable-read-only-property":129}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of the [StatsFuns.jl]{@link https://github.com/JuliaStats/StatsFuns.jl/blob/master/src/basicfuns.jl} Julia package. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2015: Dahua Lin.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
* CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* ```
*/

'use strict';

// MODULES //

var log1p = require( '@stdlib/math/base/special/log1p' );
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Compute ln( 1 + exp(x) ) without overflow.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function log1pexp( x ) {
	if ( x <= 18.0 ) {
		return log1p( exp(x) );
	}
	if ( x > 33.3 ) {
		return x;
	}
	// Case: 18.0 < x <= 33.3
	return x + exp( -x );
}


// EXPORTS //

module.exports = log1pexp;

},{"@stdlib/math/base/special/exp":67,"@stdlib/math/base/special/log1p":74}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );
var log1pexp = require( './log1pexp.js' );


// MAIN //

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for a logistic distribution with location parameter `mu` and scale parameter `s` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 2.0, 0.0, 1.0 );
* // returns ~-0.127
*
* @example
* var y = logcdf( 5.0, 10.0, 3.0 );
* // returns ~-1.84
*
* @example
* var y = logcdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 2, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( NaN, 0.0, 1.0 );
* // returns NaN
*/
function logcdf( x, mu, s ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( s ) ||
		s < 0.0
	) {
		return NaN;
	}
	if ( s === 0.0 ) {
		return ( x < mu ) ? NINF : 0.0;
	}
	z = ( x - mu ) / s;
	return -log1pexp( -z );
}


// EXPORTS //

module.exports = logcdf;

},{"./log1pexp.js":104,"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58}],106:[function(require,module,exports){
module.exports={"expected":[-0.657664702856908,-0.5528041417895623,-0.4269105919168919,-0.6820994607839524,-0.5374252747945593,-0.585576750403381,-0.622917204888504,-0.05239451446155378,-0.638228607855291,-0.6021292271548828,-0.5377424174757875,-0.5257446052355805,-0.024926568418225218,-0.6368459013392017,-0.6085838119556766,-0.5915821436765765,-0.6846313899393202,-0.5304543329333206,-0.5926440991342221,-0.6828888015884789,-0.6743091397653034,-0.5896808070262961,-0.7331230646417354,-0.19434054169172094,-0.6164461752555638,-0.6876047044901558,-0.6091044420331804,-0.6239075617976627,-0.6052551342330013,-0.5273707144371502,-0.4395764826329522,-0.5470554130355848,-0.6555548082642151,-1.275906022623243,-0.10408914907572536,-0.6567985858867357,-0.5307456566927214,-0.6014266027615853,-0.7103459144814022,-0.6567693008416549,-0.5848014200405426,-0.6238097883326006,-0.49618339137666284,-0.21183741855318827,-0.6730919026871583,-0.3115812020491408,-0.3228426879488746,-0.5293170562587972,-0.36766483243044124,-0.5672173286744817,-0.4788869352555164,-0.5865780581514958,-0.6787642463423257,-0.6305912597780186,-0.6198956129415113,-0.6477502575523013,-0.6195360672633748,-0.6301237453448779,-0.6863011972577959,-0.6790495425603831,-0.6828163938680287,-0.7094410389571293,-0.5870616538571395,-0.49926770897358863,-0.4371474972039507,-0.6970589518880883,-0.2917918613106406,-0.3812040074548786,-0.6416904028433605,-0.6312359978431827,-0.5820449270170205,-0.6429588911010174,-0.3041432832256554,-0.6811304329176118,-0.5998852587934774,-0.021065125278377925,-0.6986771712338147,-0.6295158317357974,-0.6813249273869306,-0.5775396988037859,-0.64794311245181,-0.1396341623194572,-0.6994080989061383,-0.6529673775286763,-0.733868372218487,-0.6848550666301869,-0.5915015276005451,-0.5965359261389551,-0.4995967826290577,-0.260850616514536,-0.6508908114619131,-0.5760077353091879,-0.5250580538361196,-0.6812212043472917,-0.6035265946766398,-0.5362108765743518,-0.5175636943148108,-0.037427599391816516,-0.5899168826231128,-0.5562260006766738,-0.21795885407864812,-0.671138153240946,-0.5187022136632504,-0.6517398787875599,-0.17012516110368245,-0.6038087344194432,-0.6514886433069064,-0.49623293204943486,-0.6265935631194475,-0.41351779243685627,-0.31634322586454144,-0.5715843170708667,-0.6196047087423666,-0.5786408952709665,-0.49168265698290703,-0.5114471474788762,-0.6235655498579009,-0.7062368234219908,-0.47420990880405145,-0.5860241336156292,-0.5771076150182762,-0.6888635477094032,-0.6262409645998398,-0.5720395316409379,-0.7290432367292707,-0.6425084322497219,-0.5320092378680792,-0.5431827759792269,-0.6318297805109176,-0.37059986033656456,-0.638030754812835,-0.3909572761621286,-0.7209778100107291,-0.4174485852735182,-0.6755389410236953,-0.5908587573632375,-0.7089803082426632,-0.5672105810334322,-0.6080597399138195,-0.6285704873541047,-0.6061277510062707,-0.6386546818868846,-0.5925054794972608,-0.6769805510440658,-0.6041825852750968,-0.7061375193264035,-0.37822029046584615,-0.6697025767517024,-0.27302217655352895,-0.6449858637884005,-0.042559327449409184,-0.6851614036579056,-0.665690440248818,-0.5943732387852427,-0.6375553041719111,-0.6335469369837488,-0.5228859777341857,-0.06564951900399173,-0.5529517912102291,-0.6744142922686817,-0.6225968852076366,-0.6323982759977061,-0.6722274201469052,-0.5679300645026675,-0.5723018961782167,-0.5322688174867962,-0.6406726931204187,-0.5714690056296485,-0.38898609308611787,-0.2521089670256009,-0.5594468827871912,-0.5411377640460965,-0.8443656605375528,-0.7232524077882236,-0.6187073955976548,-0.7230261140957185,-0.6978582935271707,-0.6613032265125834,-0.545251353845415,-0.5780075086816067,-0.06917457127249417,-0.6047853352881274,-0.685325337336823,-0.5642909236661048,-0.5499542778414611,-0.6633518686268836,-0.849168499076802,-0.5158508195617433,-0.5364926835145319,-0.04218439668081173,-0.556177662465079,-0.5790008672691924,-0.6624544456095063,-0.7355518639133061,-0.6012479104511461,-0.8434709582845903,-0.42157415964129585,-0.6635151503827986,-0.5395579605948613,-0.6648432613055411,-0.5758218974573944,-0.7146275621462836,-0.6093397203787022,-0.6814593216660106,-0.5105962421841167,-0.6379549237522473,-0.4489210180871239,-1.5008341243354103e-5,-0.6501720272406967,-0.4645342582972711,-0.6124337781775551,-0.22188542240453088,-0.690395202210931,-3.140597232406639e-11,-0.08753145106531258,-0.6386966611579316,-0.5438698868367591,-0.6084879236933761,-0.5809932833341738,-0.6815053791174238,-0.5229075861228842,-0.4869869537277922,-0.6545310743171386,-0.695144527918405,-0.6288318453221772,-0.2678311616299279,-0.5883586933268385,-0.6922777342252353,-0.6745884321047474,-9.11746880352635e-8,-0.07807510507395517,-0.446780306846966,-0.6584774944326597,-0.8674227202302471,-0.5743313622898197,-0.6615036572541815,-0.7094391762576364,-0.5958189107623504,-0.669009680975242,-0.60243615571322,-0.6548621770326482,-0.5437863276400358,-0.15890535018591914,-0.6659431447616259,-0.5504088429319893,-0.4038600312094723,-0.6750953377899173,-0.16041017137240168,-0.67215962992813,-0.6720918337403995,-0.6549841561161002,-0.6499495694727331,-0.6330380252374573,-0.5587989783274353,-0.5269568607137098,-0.6401245201780557,-0.6674388836912933,-0.37974020505441336,-0.6179984089394632,-0.45466247730114967,-0.5143285432792232,-0.6608404006639211,-0.10038837178162019,-0.6094510725244835,-0.5566239304736321,-0.5821510775927994,-0.5610487804437788,-0.4385928087944475,-0.6176328572159008,-0.6563624623235319,-0.6322383081653009,-0.6081168945535672,-0.5662324422407978,-0.6983993376514165,-0.5733750988069414,-0.5128779962440198,-0.5882277404388608,-0.5817410326039627,-0.38596052936022623,-0.6038618178410895,-0.6874074595599374,-0.6253593962602901,-0.6516453937700694,-0.6918313916595273,-0.4094845665186329,-0.10297393751858427,-0.5283730332059331,-0.6448614928381216,-0.6748776360488555,-0.0005211231180152275,-0.5873919136895617,-0.6791486507865122,-0.41273356043244586,-0.5901309362638936,-0.6019131740510937,-0.4782990622791615,-0.6486143541759408,-0.6524121016061617,-0.7297088511665907,-0.6010961050951326,-0.5856770699543488,-0.5289906907027895,-0.6012318866651951,-0.7188257299887449,-0.6599869917888229,-0.5275040218914401,-0.7247178332479701,-0.6294489533189179,-0.5922328255098599,-0.48090872210555774,-0.48980283074165715,-0.6841248571016134,-0.5492671523041364,-0.5728000628904105,-0.6532620255204109,-0.6274512282821167,-0.5852489215585339,-0.6054134930796055,-0.6608501047118559,-0.6907592323624319,-8.681898734535337e-30,-0.44899483451962835,-0.4919134743565779,-0.5909017849081223,-0.6807361656902983,-0.665933432697153,-0.6847316584219896,-0.7022256821778204,-0.08231751363805953,-0.6012900124736358,-0.6660182229718736,-0.27490972051443757,-0.6269482704982358,-0.7200578062435629,-0.5453088007204034,-0.45544966812354615,-0.7285901794132194,-0.6150383308835095,-0.407064104176204,-0.5582419331099127,-0.67071220685808,-0.5762737646948288,-0.5943210325718945,-0.6531784282343152,-0.6306158353026518,-0.5903293147233135,-0.4853520846441966,-0.6073639295349412,-0.6246516680530612,-0.6471290227716359,-0.6246890556537747,-0.5925546499448834,-0.658087093217831,-0.2904702264287459,-0.5671478273746832,-0.5850183961302368,-0.16745392409467513,-0.6583129523860777,-0.6366486126023142,-0.5326625454301349,-0.5482652562415034,-0.7017378205207061,-0.6292833513882506,-0.7197786427161272,-0.5747414778160649,-0.5063664524877334,-0.6998783114177592,-0.636881046268301,-0.43443409768865177,-0.5632135326815736,-0.610824932001595,-0.38803095831915,-0.5908189809079941,-0.668755421709729,-0.5370690165144304,-0.6898914693689016,-0.5907308087799958,-0.5705812121992343,-0.6440981686170183,-0.6014643564162999,-0.4601971280844832,-0.4643594226372222,-0.49476804232331056,-0.7080550774441268,-0.5672650785572839,-0.620240987908617,-0.6149347225888633,-0.42632819131980443,-0.11940957687199326,-0.6526732462243733,-0.7363441490859677,-0.6405935745313577,-0.6179992593155518,-0.5478367418640553,-0.5924046422973833,-0.7444626740741959,-0.5862830543991889,-0.5893835383587853,-0.6800408874507854,-0.5154399989071063,-0.4599653338346033,-0.5685032987409427,-0.5834858134926993,-0.645144405424272,-0.32933288102378505,-0.5170752469231614,-0.7066074079931971,-0.6914569948963984,-0.526458142246308,-0.2336589426783507,-0.47858957753716563,-0.6368111646136831,-0.6326631791360406,-0.6571626810793736,-0.09161942556949598,-0.10126339534437444,-0.48997490499119517,-0.1065524198184783,-0.5680455033557856,-0.4707418433048459,-0.6737880460508197,-0.5545760939930818,-0.4108893813919681,-0.48466465621375115,-0.6304859305475494,-0.6446742521830994,-0.6206015148502807,-0.6968011745648318,-0.5632774925843828,-0.5490811565994198,-0.02962651357016978,-0.6755188799116021,-0.8848464326405485,-0.6347083404879336,-0.6004690257447236,-0.6992924091852837,-0.5760451079413665,-0.00024899081854565984,-0.3211431628174965,-0.8393449947475417,-0.19298366859152288,-0.5657389038107729,-0.637530203450016,-1.8553641709051496,-0.591580335698394,-0.6695853936680023,-0.6077410503323571,-0.5512979618136147,-0.31423672730713387,-0.5002745933684412,-0.45384044649583277,-0.6910812738622981,-0.47536672334335084,-0.5075999014261354,-0.22172523191723903,-0.6877100694669128,-0.6634563723310776,-0.5589488273787638,-0.5122710460697069,-0.6811820510565769,-0.597127448396955,-0.5672355278736494,-0.6150320691165597,-0.7081243485281075,-0.5987658185315269,-0.6691286750125818,-2.2798512205808442e-11,-0.5928080537252229,-0.6537265898778928,-0.5979019355478881,-0.6661281999506564,-0.5120299723906455,-0.4928971790695742,-0.5236417548173093,-0.6963019270572098,-0.5822613528616601,-0.2064795552282774,-0.5186562966485561,-0.18255351941062634,-0.5670820110531746,-0.44517991120038974,-0.007593366710840227,-4.006101649869611e-15,-0.6707930162741385,-0.7150128668821113,-0.5417030922930836,-0.5720075205312747,-0.5516883283449476,-0.46247042105419567,-0.033160071434925345,-0.05267676816171001,-0.5025390059810355,-0.3719482122088589,-0.6051006999828099,-0.24062368821463734,-0.6826261123168068,-0.641396394858082,-0.6418539452295643,-0.23820123905146842,-8.240521082394876e-5,-0.4912624373419243,-0.7193165522901873,-0.6431871328486377,-0.5830869543745159,-0.6208952277847586,-0.9217376959252761,-0.6969824941591394,-0.6036846508437224,-0.25793108137438353,-0.8092346167239503,-0.7191679510132586,-0.3530006900434861,-0.610795101389471,-0.6138739286951151,-0.5417891324133188,-0.17661500467184021,-0.545171218090724,-0.4105427556236843,-0.6980711514664809,-0.6332030211615141,-0.19066054280514147,-0.4673708918662054,-0.5117463800244934,-0.5551586243193529,-0.6960715296112465,-0.6161332008880619,-0.6327342149491492,-0.6414877733900383,-0.2855970509093338,-0.5718237370380915,-0.6070098938502827,-0.6870491664329138,-0.36924056124978205,-0.6880661256995241,-0.6574169002390896,-0.4472657498351303,-0.00024892518868833676,-0.6880424521749147,-0.6793261928618864,-0.30682844619931804,-0.6936881538064067,-0.6785277635342813,-0.5161246500638585,-0.687597867085016,-0.6392879344066505,-0.6258910574524017,-0.6315035405449761,-0.45588800353443376,-0.648929552128936,-0.0009943190133006848,-0.5679867560091922,-0.5559611470484236,-0.5304402559851515,-0.5348081181911499,-0.5533269946844237,-0.42687636877137225,-0.7150497630963288,-0.5315166814196242,-0.47197083083862545,-0.6670258682713063,-0.5562809886563108,-0.6757444743156148,-0.38503910084107484,-0.6232786948423322,-0.582676086682688,-0.6116640630037886,-0.6563273458201382,-0.656779659502704,-0.3442747087666241,-0.5922462402589864,-0.4846069510824924,-0.6451080464745642,-0.013032917033395963,-0.6474147781496428,-0.5610693874670426,-0.8944950841331331,-0.6302184465345325,-0.6548303387258263,-0.6614708311727373,-0.5821250212230794,-0.6637162125537543,-0.3388210755533353,-0.5574078916774338,-0.6487192897213556,-0.6568664380707576,-0.6315642145795097,-0.6560242785730552,-0.608858703359836,-0.5556724458739501,-0.055941040103089264,-0.5723984025628827,-0.6913599260233833,-0.605007680634232,-0.36715352338940704,-0.5518628629104576,-0.6869635398891274,-0.265887735163681,-0.5646344465893882,-0.6469350544837341,-0.6322073826960103,-0.6793245796402804,-0.6186235871968498,-0.6755010682733469,-0.51731811084208,-0.6405069777691165,-0.5964957545105453,-0.6554022415530759,-0.5900704099870884,-0.3040191918479379,-0.6861788972037313,-0.7196277850510769,-0.15889833135824738,-0.5986290439906008,-0.5797467663540213,-0.598897867376428,-0.5370047624897081,-0.5594538308288866,-0.6990806090282194,-0.5688768071384334,-0.5438509572025458,-0.5002249872124377,-0.7075448049011721,-0.6005265636725658,-0.6481006768592653,-0.5081126957363671,-0.6429386378046735,-0.4021270868466441,-0.6756443630508017,-0.08627312455848861,-0.5507482455862538,-0.6240462186838835,-0.6984747592773405,-0.5621160732552204,-0.6033919166757992,-0.5639210407002968,-0.6214423345001108,-0.3386335689211888,-0.6990288531687894,-0.6539620224655165,-0.6091761945755414,-0.6255624989177984,-0.4500739299523237,-0.48902585871589277,-0.6057136841979824,-0.5849236452984534,-0.546606079835349,-0.723364276656348,-0.6813505702229297,-0.4479094799569213,-0.6286530871494926,-0.5963909896971319,-0.5979921699506735,-0.6620987333149388,-0.13936574001070093,-0.6334927985277371,-0.5712648908622382,-0.656965858629797,-0.6739441902944912,-0.4607669709138008,-0.6809513783387826,-0.7112002488500707,-0.5696110248901719,-0.5186315784575513,-0.5713311406166883,-0.6043127704705458,-0.6771984446013883,-0.6264479177504636,-3.945794833926083e-5,-0.7890924011335677,-0.6824004129509041,-0.7998414170040238,-0.31720926957452306,-0.22918449743752678,-0.6882917030422686,-0.7135345687436616,-0.007874955595038514,-0.5366321285593427,-0.7178690389427609,-0.6491116066576103,-0.4644464927475031,-0.6556484325787417,-0.263654588927613,-0.675427223622806,-0.44765797414993136,-0.43298124272266064,-0.6678070719631763,-0.11308352459137946,-0.40327744556733086,-0.0022524362449966927,-0.6157834959877682,-0.6170270472832332,-0.6285599685038632,-0.6441144780156839,-0.6019241318453178,-0.68749166331567,-0.4015149064941385,-0.5555359402733764,-0.6486990500835508,-0.526431205189619,-0.07509853217859332,-0.580064402135145,-0.5325243549944226,-0.5853400722249175,-0.04458770937682212,-8.301321915138925e-13,-0.7699399147085526,-0.6478759866810396,-0.7247485959782907,-0.6388485571041019,-0.46414640685743924,-0.602698127476267,-0.5491628739094129,-0.4612140671567799,-0.6037536769683334,-0.6254979397170773,-0.645018355473999,-0.5980246395536742,-0.668603629073887,-0.5328674205515863,-0.7057965354804553,-0.6303503771551169,-0.08978389156925773,-0.7118132967659802,-0.6029235841364678,-0.2331619309951512,-0.6057520450120276,-0.6570136848507688,-0.5510519904218125,-0.5874363157356464,-0.5276422233134791,-0.3522301929862154,-0.5606380290879253,-0.45683160253460037,-0.6075847234483803,-0.6795746565197555,-0.7163140794252097,-0.6374288851371724,-0.5271842248624055,-0.6677089362938886,-0.7034268798132792,-0.636436384320238,-0.29526462432654477,-0.503921178819358,-0.667363322758375,-0.33765415590602665,-0.6127385662272712,-0.39094904352700816,-0.6545002198097349,-0.5714167711570493,-0.23490492961207454,-0.7094275737606557,-0.622319913648045,-0.4475934792654393,-0.6860698179065556,-0.45091504439246083,-0.5923143915178637,-0.5314598892254946,-0.695292847924781,-0.5562527848849996,-0.5974021097178099,-0.46123066013922975,-0.6418067977673314,-0.610591070805286,-0.6588045555256182,-0.5974723241286902,-0.6391582979785103,-0.36250623099786855,-0.6839154177434122,-0.7007945577623448,-0.6093610375092167,-0.7100707614952649,-0.7391652525609108,-0.6399073597256216,-0.6111677067731479,-0.6392114659941486,-0.32028962343763634,-0.5858247543044348,-0.713956410626588,-0.5996022993300698,-0.6083871055684598,-0.5037338580298502,-0.5026932724938682,-0.464566846984519,-3.072354827578473e-16,-0.6076324791075204,-0.5800842910762027,-0.5066461126623016,-0.5321383797226311,-0.6733473385527456,-0.2665675439024172,-0.5558626918355942,-0.655838025177144,-0.7088360382320292,-0.5402796894363875,-0.19792272650285717,-0.6063672473923454,-0.6745213553638123,-0.7022627302130613,-0.5285331760754756,-0.6827954736355056,-0.25895690591740844,-0.18975340421564246,-0.3392990793091923,-0.6061060578969033,-0.6843352535372299,-0.6148997393212065,-0.6757095325461342,-0.6540240980480764,-0.6905602111558379,-0.6868472159934592,-0.5927729101531337,-0.2542203887479618,-0.6346116031012764,-0.4624318399221653,-0.7049652999045144,-0.6969560438033993,-0.6316005947802282,-0.4724124431174984,-0.4189790438199007,-0.4382764382880587,-0.4305362981801596,-0.6273170629253242,-0.25664997610013496,-0.6271227532495229,-0.5745624909497112,-0.6605271651918566,-0.7199725344993941,-0.2092855359499621,-0.6512238119361854,-0.47824796311321527,-0.4081540785140209,-0.42724676203438167,-0.5840421849200916,-0.6723357900085186,-0.6377236207424763,-0.5760088978038505,-0.5509989601123104,-0.530841832860346,-0.4396713746297627,-0.5989014677149722,-0.5588627212766066,-0.6245428290397841,-0.4081456839597376,-0.7039337186996595,-0.44659749938770077,-0.6491364835026575,-0.6213509282847348,-0.3478101577310302,-0.702077937738883,-0.6180426128064036,-0.5175686577490275,-0.7568826243825084,-0.614433953266918,-0.2895715729673342,-0.39606605218355617,-0.6556040372571584,-0.6645265558915918,-0.16783431168762505,-0.6858538955041028,-0.5956827695203152,-0.7040197056351908,-0.5730095065785683,-0.15384259586584292,-0.6379745981271474,-0.6750562197770238,-0.15019154585119968,-0.7440715123264978,-0.6948207363791019,-0.6271828268735646,-0.5763208143766468,-0.5210094883256067,-0.644324691013408,-0.42268193118792563,-0.5975388894078093,-0.5693163389913689,-0.615559118821717,-0.7201834296182569,-0.4735148007277858,-0.35480688558223883,-0.576396239561327,-0.5852834921892192,-0.5807410123729928,-0.5391599197859851,-0.588309144069454,-0.38472433512664456,-0.2637106369659699,-0.5690613407919721,-3.2794495925944937e-19,-0.5855938648334305,-0.6655778348421583,-0.5819136398178173,-0.4743802472544845,-0.571906002616188,-0.682727138893121,-0.10755919163871706,-0.5642776337312079,-0.3194730191332181,-0.690566287807711,-0.591141057162061,-0.6455506563256446,-0.6833259760576375,-0.6935848422283812,-0.642980749108473,-0.4230085846392721,-0.43595028997297014,-0.5089270738168908,-0.6071206099201188,-0.7545618147678708,-0.713156064170548,-0.615166405341139,-0.6500757697720404,-0.5782296731604288,-0.6093003542044353,-0.5732199979814759,-0.0002536293088732376,-0.6974015764128575,-0.5865538994880373,-0.5917992871695253,-0.6514602641034065,-0.40514629220062803,-0.5081189677270488,-0.6635682998294385,-0.5906424797740819,-0.5868907886677194,-0.4973421147557735,-0.6836432683786605,-0.6973802248108931,-0.00019952376802465338,-0.5067095128315751,-0.45282469271673265,-0.5740922428557377,-0.6735322899889891,-0.7085854651142122,-0.5814334771814643,-0.6829856434988981,-0.38859167356363217,-0.640807825817444,-0.6847981525479,-0.6610257169261046,-0.1983797096162344,-0.5690036387824027,-0.6631130534120716,-0.6142274234954829,-0.6514817713489263,-0.6744760185129115,-0.6828724805776484,-0.36435846845173,-0.6975216231252758,-2.10030632441695,-0.7128657703464669,-0.659110407927485,-0.5424827295082016,-0.6927120304315936,-0.5604521752756523,-0.5746701241633088,-0.638301860765106,-0.6245763630394643,-0.5873382094724745,-0.5603610524003644,-0.6577767864169578,-0.35867412118736564,-0.07359697879771827,-0.7591154594430612,-0.6400213563130988,-0.4892163257962139,-0.3023102414616203,-0.3905666796878689,-0.6622220029433213,-0.7200017152171083,-0.6472875823652741,-0.6791663265098532,-0.38882980434618536,-0.1841729063854548,-0.605949700037796,-0.6958412575700201,-0.6193195921273233,-0.528447782750888,-0.5926768615663093,-0.565807194413564,-0.7129753265017512,-0.6076157486669664,-0.5646502020332097,-0.49651826032678015,-0.7060928790834758,-0.6017736493799244,-0.6652145992925302,-0.18648826934274293,-0.5466103331675906,-0.7348019048007903,-0.6304245985779443,-0.529537251184769,-0.6520375248913192,-0.6501073247581458,-0.7202003357808036,-0.5245697109300439,-0.6428498783691661,-0.6994075311726299,-0.6962266028538162,-0.44053209488219713,-0.6852139889991772],"x":[1.0971812480971754,4.423500998398168,2.4146112443549472,0.3369596727532098,3.9812856066494695,3.3182766918498774,1.6425023004670691,4.607156155221807,1.3276916151321116,1.528937361437187,3.613500411749749,4.2031384077971286,4.529969858505677,0.8598752860704306,2.9752624798793024,4.846405506016036,0.489729828354325,1.2497619049904407,3.7978564844162364,0.522066583569003,0.9497307443840819,3.6533310788666515,0.2343501929771885,2.6062687728626677,2.581613972873955,0.8746591763277523,3.0886891269257646,2.125689121731166,4.106130537659075,3.7540924951920873,4.21005563273242,4.2467381485503015,1.471283542734928,0.3187321526944231,4.63789893752408,0.9901350210333293,4.511945554092293,2.707736971289182,0.605739224418983,1.636821680161361,2.35049133322053,2.468613608566957,3.2515042697188026,4.293133761480853,1.066476030533593,1.1830281706880352,1.8374421731717827,2.706797990199675,4.892514695198295,4.016834038096585,3.9575644913489283,3.849518945151882,1.165656869320849,2.997498777122801,2.7862549563139183,1.607007877894675,1.7393133947666939,2.7450397961526996,0.42521450652461046,1.0708428891700716,0.8626578472384239,0.21638727871169494,4.176895634365499,3.3278071240815033,2.3310470278874416,0.741727829690606,2.33808561843329,1.9352991159952426,1.6129015569893446,1.6493674244972079,4.408854439986949,1.7675578645229173,2.7296695260445922,0.6542550734634778,4.135731763406217,2.393015135635838,0.04562386106871319,2.392717304620734,0.45794003408056283,2.63938280417947,1.1836354165226737,2.3052698130761664,0.3942545390542018,1.8627862992209665,0.4266824617695353,0.8859938866303974,2.5416163892123365,1.0197673395139983,2.983835029417048,4.466057201701225,1.966872049188435,0.9145177866792453,4.12003552386755,1.1213556968087834,3.1092470110395762,4.929362429824071,2.2880112199335265,1.64897464238,3.4311015728228433,2.5227844545551683,2.404368511616352,1.4066433596917083,4.450819606790178,1.7186134861554014,3.5371913631329477,2.250999228471029,2.6317586612681976,2.685289535206319,2.5633102363090843,2.622490724299773,4.273654658613506,3.9836210411174533,2.4589636691993357,4.730347715007347,4.804299881023583,2.024169688064197,3.7743720161621064,0.3978042461248832,2.6945645346851355,4.911594279522468,4.631765774435723,1.0352352081841554,2.828942164706932,4.698067837293745,0.01162858000286593,1.4362689754075453,1.957942848387061,4.657343608166968,2.6818357803858883,4.989770933681741,2.6602148790476274,3.369621629700662,0.32865328838751373,2.3326811465026287,0.6463292691329448,1.7824497259084193,0.013866022158763869,4.593591449326592,3.0827806400634006,1.8300671985492456,1.4399543299932083,2.4464433042491684,2.198330924021116,0.9086670280070275,2.5824461090839943,0.3277371410227292,4.0602355960308145,1.2161579014959,4.277501484664235,2.9193742476888875,4.049136649281749,1.2240990929414597,1.663813173312676,1.2334158867688272,2.4372835787909306,2.8007323860600852,2.681677663173121,3.8161752347537825,3.081221875061262,0.8069971993264646,0.836177409123714,1.390604828865073,0.7811900186465326,4.277047546808392,4.439285484309298,4.658557506168293,1.7717333922768919,4.358173194137835,4.79076105455203,3.345700771090363,3.2929009857478073,3.5003730724404702,0.32461817695955797,0.22952594290041817,1.596898975808364,0.05020420300258954,0.1387447192329727,1.4147946519177146,4.502608836265464,3.293502325833675,3.906585892046879,4.200175505916568,0.9082225754757411,4.784769800009656,4.791782056650775,0.9512259606998374,0.18285405053619863,2.961518751686313,3.904180150368651,2.242071939907171,4.470578889142799,3.856140965051693,1.0547734078286453,0.17508167270408603,2.9500771383019853,0.054119489693159606,4.3196925270627595,2.0620076468610113,1.2155018617154256,1.5418864341559468,3.0892361509085067,0.3814721202126259,4.1203743178349175,0.3462516979860153,4.352718468636915,2.448517510333572,2.449130012215681,4.069292825197122,2.156666253133678,4.222313753108308,3.4467879082713573,3.679918223637012,0.3012475763539435,3.06143085555022,4.224050427830441,1.243626535691782,3.436940025618711,4.163253581842756,1.9042302492458252,0.8656399778075741,4.5921708219217825,4.331742029184512,2.242500442817991,0.14932691271363652,1.5309836583713743,4.726048280755631,4.5197380412790125,0.9165284945865448,1.6101255171656204,4.167360030392459,4.981403056177567,3.8273493719271823,0.4656307892014844,0.6863913940959765,4.703609044801926,1.106531036583417,0.6583627987636453,3.147443057944166,1.5363995494233595,3.513964152594178,0.9159536258482304,4.725174497772034,3.5379176605194527,1.0532862446975721,3.6222674718454693,4.489947530746389,1.1159505631330124,3.347349783239287,1.4180219023387253,1.1306582451757252,1.704618420138484,1.9658888002302521,2.397866513963862,1.9558273829634543,4.990616336396952,1.4422127250655559,1.8708343468078703,2.820101656659059,2.9997154592199404,4.904962078050955,4.8228155054062025,1.7791070261246822,3.2547200104025564,2.741773946452155,4.205385431969879,3.393137138335025,1.81085642186537,3.770609451365007,2.8984805466401644,1.6505843380998664,2.7357319630305788,2.387414947134875,3.052885728019671,0.6529997424026912,4.936186067545053,2.29654575519357,4.561989515480783,1.5527843703199884,4.151368002643973,1.5399923283480221,1.1863404817561352,2.852490886668156,1.4183593701066521,0.2995714433770136,4.348502559891844,3.0779668815860326,4.461475543341252,1.88333060719029,0.8112306316725959,3.9388685343898167,2.915387767142621,1.5161532004751943,2.4658556138864896,4.759947987047825,2.3592436857311427,4.561685842538528,2.01429305171147,2.0694498222776603,0.4636818379741581,0.9419347467527273,2.554252267162329,1.6187876221661457,2.2245873841581734,0.7184543410172006,1.398357770766463,1.7037080265463722,0.22009755066628167,2.6676270526225077,0.7410164338616754,4.677999834410621,3.671321997643955,0.8987279552174487,4.604872099244379,1.6929297768048723,2.449685449916669,2.1273843288689287,2.906362292386074,3.342931047894384,2.2360077548591004,0.410880936027217,4.805660341475633,4.7931072322365615,3.6470571187672074,3.04580421416723,0.6042167577879154,1.7065553609454631,0.7251986137503708,0.5265849840880454,3.932558039764187,1.6371676048233619,0.22323951561850852,3.7811068145388327,3.2638604716425315,0.013780527330662373,2.58414551105415,2.766393351570989,0.20377746083464765,3.2763623321885857,2.995184637918463,3.7872206727855904,0.6561047061880676,4.729286674572071,2.6465920992838923,0.9226048339651771,0.24086301403145383,4.505980893213268,4.147902868404492,3.7416768711354473,1.4777343652082553,1.360375741466493,1.8873671608540576,4.14849352838778,1.0120191829315317,1.7724883020127224,2.5507860973328214,4.1642895445158175,4.214584130025783,1.1104102727747678,2.6136300077562358,4.743168807519065,4.535135102022285,0.1528236185556131,2.6514452974973057,0.3518227852229505,3.7433382486873166,4.701682475926072,0.6196099377918018,1.4931178972888803,4.113903776030118,3.8916180813213974,3.121076697698344,4.340221226332174,1.8323242498119452,1.5970827560279377,1.1164753423732432,0.4018927296948993,1.3834096246303818,4.258295417903262,1.4826654415203044,2.3111617532605875,3.885294658977535,4.412278423461874,4.834248201869203,0.3002296803608595,4.087231364616432,3.8647255179031625,3.4203322658660884,1.423417355565807,3.937862248143488,2.347334042282948,0.07126262876787526,1.9396472431303957,2.5970904416414085,1.5933031738211734,4.3748029725312945,0.6029864467824453,1.9573794395768418,4.864723928292545,0.46092142065111585,3.9120718316536376,3.38572494091391,1.986356956545594,3.095511834205716,0.9649554113156178,2.6353682145117405,3.054140154807415,0.14571282851876366,0.3458917155849539,3.350921098120411,3.5165147780535078,3.8216343302979605,1.6564829765732736,3.148014797349812,2.1684794320187417,1.7434769372049341,3.6474923782708712,4.132280664553312,3.3275956261698916,3.3078758747664527,4.985323729956908,1.0226270864105524,4.475580763840199,2.6239041664095253,1.5462607240194703,2.3818550716569185,1.7369347159157134,3.737633478594471,0.41220906366242094,2.7308940870058507,1.7885613466743633,3.854445832374236,1.6062596725555311,0.14819640259375322,1.653168540866785,3.4557352318212087,0.3628339188500218,2.7827742496415855,4.006476440369498,3.2532234360591095,0.3030186347342312,2.761232330634573,4.655956832505384,2.9241392510535267,0.20688356930663954,4.539062595061681,0.8761702438696428,2.7605414666113823,3.6428084374003324,3.2487579419158696,4.815516655133008,4.59908924732734,0.8224041402160742,4.520049913653608,3.1198197670720895,3.983127960714017,0.6509845350017907,1.046816782551665,4.766148631567175,3.4255536002939566,1.3911230118455453,2.6638992745434074,4.076169420725046,3.6525934104728632,0.5876190726318264,2.944470818752114,1.2652000989209777,2.899089206353441,3.970504779702374,1.1962423377052644,2.7191332790959963,1.7826153254979915,2.7342866563091572,2.503433691664476,1.4496257017184178,0.5554672341544786,4.888163095929548,3.6409295541896713,4.3920654929102545,4.249766904948156,4.595338847044252,2.677621056151268,0.9898866251047411,3.0818478120885473,1.6271607566922008,0.3835535468235196,3.5655329701759317,1.1363620017547726,4.915349636216025,3.9299056921224738,4.575027906366293,3.740298199172133,1.7164774020240858,1.820112056120824,2.2018767015210394,1.5703272484111985,0.5212016434188882,2.3372980865901614,0.9355469081667867,4.662054993306189,1.8272740436347013,4.610396641621831,0.17963625691841512,0.7324565440350128,4.060018729041967,2.1718584737175153,0.5635843609703806,0.732717999632303,1.1892947413110977,2.5442777136830275,0.10525834708183357,0.17941248770608653,1.105090301951488,3.693239068652867,1.2365183712892025,4.8621504785077105,4.921929321734419,3.5155045668877904,4.262399766627041,0.628279183757563,2.37838552259925,4.791326449329523,3.412785189996704,2.7334474128675446,4.70565043824568,0.6277798733912776,2.9358518364196238,3.318661245312274,2.0933830918163867,3.9303377472665035,4.1196359308624135,3.1346822454526957,0.5886626832755126,3.026904665452612,0.26454099059186387,1.9311830033807176,3.781751719497005,4.731913171963438,0.9586033004591188,0.5655012784396451,2.7041999194588606,0.303208410672654,0.7385868544345708,3.4688726955018456,0.24137217291414714,1.5940072575888087,2.5446381685409234,1.084233866884432,1.0268073717204618,2.279268804210864,4.665511622191678,2.4823188554306883,4.352601132126045,4.423795687179894,0.9579270441652565,2.8461510156969116,4.315267658459996,0.3427819984121139,1.6666125927906061,2.122776054367633,1.3613650173172631,4.131082734414351,1.4463203510501599,1.2885683322461516,2.1953859193239103,3.8657219840462167,1.6753463321154094,2.150601194267936,1.7546789453464684,4.482849780612272,2.6569550489763163,4.43702078131655,1.6958616920954217,2.590469295843426,2.2385465640485194,4.027127584707304,0.05753626218678032,3.040129925869104,0.9609569780678129,1.4010802211526763,2.476081063795549,1.069388473656101,2.9634017201496854,2.8960581202422353,1.712431537580802,1.7761553329387925,2.1277508034385995,1.532188769905093,3.549442937969177,3.4379605360086716,3.694232123767719,4.173613778190303,0.1485632339151055,3.023230088273934,1.5741303591378986,4.39976368678902,0.07364929728086556,4.675506652777452,4.287053013837909,0.7583471314570189,2.096811006736697,1.4384284513004497,1.7557095850852333,1.2526164841370013,4.637946013368543,1.2447387845582247,1.8074500547437033,0.5588367348183332,3.0123278827885924,4.25593972676428,0.5419018500050721,0.323225006990977,4.0500554999512985,1.87013481302576,2.7292236593488486,1.377942208987909,3.985024463551432,3.5882612949529102,0.33483248415239086,1.1576668383067812,2.6727106420898217,4.205483378788655,0.18402021156548098,3.83622174144464,1.1855516354017792,4.299273179398869,2.2782757048745284,3.7934987947173617,0.7601315135277964,4.45824644780684,4.592089408956,2.9641263563945364,0.4617005897242765,4.193406420338292,3.1459832797054075,2.6476548392670054,2.164999875063902,1.9845999385767021,0.6445828142038035,1.0055070980619185,4.141259445908355,1.1878333515369965,4.491811578675739,4.804241703251865,2.034616440354954,2.407649175103156,4.5591367206984,0.1414021284090372,0.7271375878594066,1.5121564667773857,2.1844057063571896,1.8735338926986533,2.411373909569873,1.3557149819091519,3.023277868991978,1.3788300340069004,3.9174538669503667,0.5433505167363384,1.2819114332523485,3.0210084580696916,0.9607046919372286,0.3900773589775419,4.139275965761354,1.7371505840924961,4.992309734918225,3.8046613281823474,1.2861536157228315,1.1621372473093272,4.9695508436223745,0.505508335682967,0.6967276644964471,0.17298677086840852,2.1521798645676515,4.213158631166605,0.8911590486702081,0.22719165428699784,2.3993713571951867,4.97418756732764,0.056230603319072925,2.0313344601620864,3.1340672575953734,0.976463567316258,4.77121462733945,1.1324046024876588,2.2600353763656624,3.2501556485496463,1.1787208251379433,3.570189976741368,4.192179845368271,2.9916027569930215,2.705353350222265,3.2122112814404957,2.0498393976789453,1.4731362373142287,2.1346311249689376,0.9585389253925103,1.4912893769849622,4.387516561537355,1.7450345472464213,1.3619035340776109,2.677333948987094,3.415825139776624,2.7791222577817987,4.105093378876623,4.541883806646028,4.827636626478982,0.5317874286300872,2.4193732067471307,0.04697516092945109,1.655871549882667,2.208736107801623,2.3832565761210334,3.9234725459322526,3.05219725034372,3.8729877401474946,1.1592770442643474,1.115438223738603,3.7641382612357113,1.0995484654480148,3.6381566636798937,0.5539481864551876,2.645934606251361,4.875574705763805,0.09510291080421784,1.655901459723188,3.1290207466542617,4.405363041077943,2.13090885275228,4.011396437435454,2.1551359780979773,3.297136276739935,4.543534123848096,3.8824760322194187,2.396662271510955,2.6632996017214836,0.6832983097037015,0.11708258366420088,1.5078492449700198,3.3212144047003536,1.5042094791530536,0.46719055330587067,2.4018562472265925,2.9363321776527727,2.5046254952447935,1.366682957513785,3.3375936586602286,3.383150922019728,2.694781783895305,1.8918609134049036,3.1327299465038005,3.544296752359537,0.12673420455156847,3.201488658541475,3.00368131882406,0.7863318712410872,2.638806624248909,4.006222289361645,3.8303111334580087,0.36932347204505556,3.356349163550998,3.3031477810148346,2.7044642033783504,2.7371184924955982,3.3391172563630214,0.9013179268050853,3.4604961912883114,1.3387644799369125,4.975182308994775,0.6961799343960884,0.08473935200364102,3.088496396303848,0.3363406654032286,0.2466437586915471,2.062325878159185,2.672593921170491,1.5192458049176871,3.1246232246400565,3.8674828915526396,0.44013058509211334,2.340249060674089,3.8855642966827055,4.961960274102698,3.868350684915126,2.501642069695438,3.6333869809384947,3.9556548209644804,3.4610122979969304,2.5399671577805414,4.6110496399141745,1.4087739179947867,3.5499657214168034,3.470828533045954,1.104823163042341,0.6730267294658832,1.2752626420668056,3.4923717816232536,0.9046451354628471,1.3777424663004179,0.6254795215591435,4.263598297335715,0.6453695254926262,3.848191976662514,3.40140728354964,3.9793019667349916,4.3496590964346975,0.34891002025065343,1.9268707971812948,1.0980302017755128,1.6194255732921259,0.6783139179622133,0.9420507248173249,4.414970566144745,1.2108155659757713,1.0771530904603588,4.285284466814538,0.0403215314970784,0.4042828987798608,0.699923816109751,4.700257297913327,2.2762247772803876,3.3565898503758973,4.736636471146792,2.966289296701131,4.96261031839933,1.7454706340623771,2.587584338783472,1.9598908272669413,0.28534740760691846,2.885599703024316,0.5829404237726221,3.2020767048440413,1.4035428814800543,3.9849289548441735,4.691694502172597,1.0124613317225706,1.7642054183458211,0.8907374593878281,2.5215673702539942,2.7782732771218166,4.094087368486932,4.265997656323376,3.2782310240447354,2.619435809406143,4.640629064069817,0.02858942247169982,1.9066395357137078,2.19297936131021,2.7042905788057703,3.774760677533988,0.19896585587589555,3.1413048914937933,2.170399685877793,0.6682883600599032,2.4187918526481154,1.8151264314197069,4.760147313318201,1.9943575334807373,1.1279684189200212,4.004865165486907,0.6578824370937619,4.748125719255022,0.3036379484835561,2.880261199719202,4.233631569064185,2.774812961254345,1.0477444962979066,4.197524191040586,0.4327353616042162,0.1226233174549185,2.618970376516593,4.910745775899993,2.3778460147887523,1.9498222531333542,4.138059970391501,3.5474246070662927,2.79122619021431,2.5295917267365917,0.1829393673094415,3.0583108407337956,2.692568798971876,4.127916407405847,3.493260957554236,4.548822157239506,2.2616090191327665,4.670854762546677,3.309515842326338,3.426782515675668,3.125401010077841,2.9492454794180736,4.353758065552893,1.3130254020422494,3.2028162697478657,4.012414084859484,4.937593663915903,1.0829133716409978,4.792354637602118,2.871464428675319,3.4613131481452553,0.7257922502213421,4.454673851085209,2.701625664002937,0.8091160945049602,0.2662236438374732,2.0370496774249505,4.903650602311407,4.668917487108088,3.627203874596032,3.1571077722726626,0.15851721689660647,0.7278907543750712,1.2407635290838648,1.970578129093843,2.9075716113709795,3.588057412226997,1.7124584864568215,4.937078160697692,0.6934793482868495,2.2104779618757497,2.4814144100415225,2.017378204729444,3.8970136567083413,4.11856047984233,1.5380274535070082,4.782877643598406,3.8300732236994763,0.7630175161688624,1.0865020201410491,0.6254584709621114,1.9941396474880835,3.055730025460899,3.3521835763091987,3.880240923320147,1.4669761382122726,0.4554265748454178,3.1262757185864185,1.2948422409801963,0.30290692696074206,1.8649597449767241,0.6089638433267852,1.781775412879314,4.94883487080728,1.5667418979676073,2.0511597553621175,1.2598076099370281,1.9676275196320736,0.5995893389573503,1.0514418438322393,4.229947301957473,0.5486528616976583,0.09718038518483518,0.2087273550443558,1.501148040317567,2.6321292186691037,0.5502069762647988,2.1419620694698915,2.022774649904837,1.9328713919452734,2.569398763067503,3.7144642406965698,3.080774562015666,0.6846887242728239,4.6766434331518365,2.0607249842077593,0.04524381079004103,2.7961111984292453,4.319700648410739,2.640093630993403,3.241724973924062,1.1124818134570968,0.0400103249527084,2.30339573804362,0.9679301389231076,4.6455457992722335,3.155443251762332,1.5130685240388742,0.730918232332558,3.320534198759,1.8269756918928914,2.4684955055894306,3.7506599278693487,0.2822967857669545,1.3070168257661785,4.000950991880535,3.8429566501216392,0.538760325726898,4.452508472876842,1.3462146088075744,2.5063130251177936,4.277311321106914,0.5499421186500597,1.6995360875738508,2.687397094221735,1.8458933406915157,1.0869895673894092,0.15783235177579957,4.581481310682232,1.1932679893754505,0.3629614400531289,0.8208350917740115,1.7474201183217297,0.5326780165865563],"s":[13.895088327014008,12.998133482074742,3.067815635029225,2.671413126712827,10.064275792235202,12.370507425179454,11.156576793344248,1.521174663184084,11.023835754417446,7.936434220865003,9.105499522875643,11.083742202610253,0.9615309415248507,7.017843516465541,12.91474654913905,19.488821684822767,17.982566974899633,2.899856600189521,14.354602625325775,2.646806179812655,9.417092271604886,16.577051461584137,7.699009336728735,1.4632738241662224,14.605653761478026,2.573763942291043,16.476288230136614,10.205103982049234,17.20438651813774,7.955178883178924,5.6709914695035435,11.61665399740662,8.714871067423665,0.3009154583585838,2.071240472679907,3.7256013470050764,10.230803783737645,13.622703017938274,10.69688234353813,15.2217729795932,9.521966989030602,10.401001787457504,6.832396730234405,2.3832471330423743,11.43007475030075,1.1271040541290533,1.801950232589764,6.6058843541593815,4.919842677725064,11.283566098442762,7.182992280656149,15.727078404967836,13.187830505389812,19.74960647987937,13.716521951030924,11.461103881151104,7.710714043698399,18.984796853588858,18.54922512136403,11.719662873812101,15.727616431224103,7.953864170520966,15.780965461340424,5.5513505077348135,3.693555085881739,12.268847502007292,1.8025892371196939,1.9608488522176515,9.817068127656619,8.903775418172888,18.569741898402,12.8539603758408,1.9971640561765103,15.067002585194471,17.321250535261363,0.45078800052469337,18.205823667905968,15.646684611915438,17.41699078445439,8.236531232732208,8.513046218879126,0.8854237533982046,8.854690088226418,19.572138024231226,6.376487167694447,16.759029405501863,10.569806863154017,4.9679825126759125,4.762128847297902,3.463547521411261,17.748092067643924,3.0333307598197523,9.849386731545945,9.24868421594988,13.483972770463218,14.283382263291053,5.569985491178322,0.4758226054144288,15.336173138200827,6.511778313101888,1.1737171000873747,13.63467134049371,9.637794801919778,19.766007502868565,2.072651920980566,8.176819338697872,19.44482715416706,4.834671998018618,18.046070720796386,3.5474831272677143,3.4763129229645306,13.301380505454915,15.153021180898225,17.538596643319025,10.384710647631072,4.700467291391592,19.606032592860913,15.029568769501104,5.185130566175831,17.832269726029125,17.88975698874841,18.426217984652517,14.767931034138178,15.954488617517711,10.192284984418961,10.16385627048663,4.137223643087782,13.646265048488203,18.939133219786044,6.11305903623804,19.837466416121803,3.21546413149425,11.800862783134605,2.9581946777661283,15.394757846983534,5.773209232661554,4.633704691304974,15.952022503073433,13.61090499420274,6.5901513856972205,6.389381631128299,19.72682529496014,8.853586626634712,11.345255427325975,10.679462770672226,14.761953724519778,4.262212858018133,19.12319673412433,3.0921426483364556,19.88158855175756,1.230128951526246,16.650572720458822,15.554261002678217,2.648585503671357,13.41012430818552,18.066188579404134,6.281239374146281,1.2348885781924235,7.948696336901131,16.74435099856666,2.774301938553778,10.618914615475044,9.964574900115707,14.98195736101884,13.788352650893593,12.088509203898381,9.445122074757935,16.692610823420864,6.206660428698694,2.2118533201974966,8.976446049798582,8.13253107750825,0.9429276778744411,11.611417055920041,5.596382306916974,15.006330839438867,10.68597438043414,19.2410348457624,11.82437443215964,10.507000755399648,1.3551099328972827,18.03644125048022,18.72778275701503,16.198335266272053,13.720695415626164,15.265508620833256,2.391533394450689,7.507237168447789,8.940098151666325,0.7012461647871504,13.356309301914546,14.50503869441285,10.969946396295086,2.317613444402351,11.479926297411915,2.1458889321920305,6.4762742301420095,17.724794975147432,1.7129688828811318,10.720421279085608,10.751979605266513,12.797472856086728,18.018217746502604,6.262520388540089,10.701450857816557,18.037624066009123,4.0412497155976945,0.2863156218146612,18.696234862139395,7.306634956068003,19.828582906447878,2.339393912951655,6.509313932874927,0.12363068672496258,1.6238988169999846,10.635537209123678,8.809552761534189,18.826394140789695,6.102942146423902,17.737846942720367,9.806724359154511,8.253226840811191,17.1967921653616,14.877867794852513,9.867008455794037,3.6448196289830648,16.860382965395623,16.324572540319863,17.868040976685144,0.21553493578585492,1.7034164824508347,5.89790686514664,3.7339241328681005,0.73400670181345,14.678493052027477,13.629317776022054,7.676712830587107,15.286944317882556,18.35000637372536,15.479700625243243,9.284823341149746,14.226919568763279,1.6280156577677163,13.114438945987711,10.346935016604672,5.6456284779827515,19.971932813874336,1.5818936731155242,13.770759059468567,18.9009264977054,12.146980099077197,12.10291858675192,14.55424660737127,4.069645339452221,13.086544359828896,8.214460290837987,18.273496688455396,3.5238415133064294,15.05359312667518,8.41258606667604,10.547754202747255,19.323508509493834,1.048294096104474,12.699860899300269,13.928043650213677,11.065957608654937,6.0532576771763935,6.077601197076157,17.471811746327166,14.437778925164775,18.06939699385453,8.276601299019358,9.982100505910312,15.278841609250659,16.23906556323185,5.405460229554757,16.653467918117197,5.210112866218384,4.3600712909275385,3.7369461319577324,16.859839173858646,18.91531124732088,13.940242674881954,14.69651441113979,5.800973940669643,1.0533608810347506,12.121974123827242,11.150721450009634,7.208194643044381,0.47647889475926686,9.036856032420918,19.49728389627191,2.356299072744439,18.876360573982822,9.645798723557615,8.70907119255076,19.11788468083412,17.702421775417566,6.329620357818304,4.76190290081687,8.904123499993531,4.075212440533367,8.32350240821535,3.4896544404343155,18.020640914163426,3.755674055224265,9.37321173991287,15.206502738564978,3.1721125995784982,9.319596648696415,6.388041143585226,3.930652588660939,12.271085946065167,3.1224020735152624,18.20627378651835,15.429112673835107,11.969897278158857,14.305280013873162,19.524720236956988,11.641585394743625,0.06890013046780386,7.975318435470804,6.37672493720514,12.883709302090303,3.4387437958623623,13.479391473748969,13.614743628052114,8.787680156496194,1.5613044218036753,6.530648963814705,2.860119878622638,2.8088416920223835,19.807720603867317,14.44329749515434,7.895537632068712,4.994127265547883,7.7220032149946105,19.635162681658507,4.091733316738075,11.947128920261019,12.00326296394319,18.941730786003777,10.122301845199697,11.239556338424821,1.6597616872339893,16.838599505336674,7.705442087986341,19.109889311897188,5.58037070483103,11.460614395358384,7.2847906707926,17.548484362476984,11.893878995112551,1.1080539005383372,8.603769205527009,17.316562920939226,2.2858368797495965,12.436628738927254,19.18926566803404,10.93723306556158,14.14683383161853,11.327303461762156,16.440216691141977,11.872181709135319,10.870566631989146,9.456821989882314,19.251712542773095,4.884717112060883,6.622176529829722,13.633380940309404,14.319363331665942,5.383073464678425,6.414074073198992,17.880642274635278,1.6592683818532894,9.83492983950005,4.244117513741044,13.512685219767778,14.446860487609708,9.59895989337058,5.806624731691246,7.510925901930374,9.761284853931045,12.382981128497331,15.108409244974768,19.388944595519433,18.77087874896935,1.665624320386745,1.7991159205629348,19.76250592615758,10.475165725573582,16.1563776863688,10.537828077549221,4.1883659938740525,18.88579823474266,2.2742385787016373,7.200038881387725,19.257328310549134,10.844082037338975,8.95353590264181,4.529871347873486,4.370848458752303,11.944471041892042,8.899747394891492,2.552690711965715,7.469412895375811,18.56552556011776,4.459448696719046,7.60534047220625,2.1464581568835817,7.6367039660508995,8.660445119101707,19.02033897595457,17.540022823145932,0.4821086870985436,1.580791256975571,8.608127440095004,1.1084389979619802,10.148453499572824,9.274006571483412,5.915137733301408,12.266004702434259,3.510108231953306,2.126604626044619,17.347600885262757,15.0107906634871,19.589812301669937,6.902940981658059,9.237959575061856,4.654414357920373,0.9807106722625081,19.724333281876,2.412845778623538,11.945504550818423,13.22626223453874,17.570110464904904,7.434258540389749,0.47641146245176014,3.0383007282869734,0.9502689819675991,1.58854723925272,16.221251814394687,18.45246808792638,0.29018664986218745,16.99628756924249,18.228619769237966,13.780585058930583,10.079750844064247,3.146317852523537,9.913420480117257,7.211823737899499,6.544624877598557,8.79792175717316,5.685962114032823,2.1456971764929866,14.05351916400674,13.530202680252668,15.30208338551597,7.848496741026887,16.785014375788215,9.219483666810856,14.83526403779389,16.540510909218938,11.001991551626409,13.482255764015033,12.860331390536913,0.08825424643681412,14.519582160157798,14.263323496225887,9.23122706841514,16.925515876745617,4.727350855175487,3.614194907920374,3.7338765138580143,12.772521783622812,18.605363165151644,1.9824766730966914,9.904527113207045,2.270372696619769,16.044854645873716,3.0013566327444963,0.09073776370378539,0.07425222165409195,18.760064911372154,9.699035066419759,8.31033911285144,4.353647361786073,13.21868835373838,6.4837934915414985,1.1933074451212722,1.0108229336316477,2.6614169323173886,1.6061754176823761,11.711604041428414,0.6391415950505541,18.113327195752937,17.91126613712359,7.7497815271013915,3.465236240623324,0.11805326244326064,8.38095473666133,8.471902444792065,2.554347078087207,13.657474519520573,7.963409258454339,0.7555890503996832,17.19211701351966,3.569336959374736,1.6883255957707055,1.3480499706634053,4.836433513265308,1.1239201820681632,17.3406444955673,6.31345572563438,12.422430234526232,2.9247476433800834,8.660493812303955,5.135205785504238,16.900289409649748,14.851018905817055,2.5234396306828133,6.058832777930423,6.7009137776345495,14.178339479530088,11.252471651808854,14.505877657435784,18.600920143127727,15.177852851319805,3.2027855963441,12.049648338126463,16.6622046445627,12.982319841122948,2.9078613009866627,6.261706929189295,14.997360374607984,5.859007033152301,0.48110053948103637,16.001599320418208,19.3747822221549,2.4945072107369004,17.64688835590734,19.63794042396479,6.860149477257562,14.034692857241131,10.945631680721931,16.527347561026563,3.8762409884941817,1.8263615512901055,14.801670887476215,0.5695893405790953,8.45269401837248,12.267727937508393,11.245928309961911,2.435898160934311,8.416289127542775,5.533461041358354,8.775435823458801,4.6261891231492225,2.8283751805302026,18.027313021518037,12.752108072856725,13.644437149308303,1.4813605167823152,13.70702682556483,14.249456932894194,8.163581095036129,19.552746645178406,17.018627298849623,4.037383931097831,9.103728902766521,7.306776040335157,9.425215214796223,0.46117423650465117,16.744236965188314,11.964134781632051,0.28454575671375437,16.974842573556955,10.181269310471652,11.242983751330948,10.071440123078577,8.209363858438369,2.672598342760968,8.15478497860643,12.63346244948119,18.750643849361246,12.52992584563113,13.47795412890759,18.164187264807833,11.103318008472257,1.0340200246339037,13.999273024934876,13.744173641551205,15.544431263780139,0.9850414856620526,14.218386558122997,5.2757742355898385,3.3115840518462836,12.495380395798378,5.140066670124179,15.384066090438782,18.441413914342633,7.968607104239265,17.87328803155951,10.765341962047605,8.196405584653634,6.96408764951876,4.862524643574044,11.09053477482853,3.9713468515367767,13.728206038402696,7.395920069309687,2.292858544399672,6.11779927776861,10.522334382921045,4.068004498701385,10.669206287664919,9.590812967865894,9.122391338869091,4.128858303058216,6.351267557817963,8.482313011532131,13.542273372552028,19.374135877163646,7.714595749575666,9.17343110292884,17.288977940113405,4.345206201410918,18.943884285253706,1.6845515691565538,13.166952379476964,18.778295381242355,18.967800108743237,12.214879510313384,16.008988025722147,8.772076073906927,9.983497268691327,2.1835936796624145,19.93795560621181,10.493688567669457,17.973631095377492,5.727065105171842,6.676624374080209,9.116871070440737,10.934861396015831,10.289396644496694,12.574777447293819,9.11447030163349,15.705608850182173,1.6149706747080161,12.861445391349498,9.18379739413532,10.97230955179137,10.724386612262048,1.3355656064924926,5.893914808805385,12.37296634889693,4.903403616525579,10.778851918014901,5.00963595894703,17.45646176899084,12.598487943138021,12.64058894687384,3.5199656477853614,18.901148133306634,16.213372043976435,17.614685597499566,3.331088918165599,0.47853223668670175,2.290908895396737,19.150209501916088,2.430959108517996,1.8608957524756553,2.609795044751424,12.292152492985323,15.436943393794138,0.3107761968875522,12.366667726246622,18.511073217792106,11.627212762000948,5.25454534058698,9.321883911687472,3.839530991046516,4.379853562674061,3.495830184008515,4.542277490248252,10.351287375604086,1.3409721533441088,5.775571109135194,0.47766128780589057,16.776935664953548,14.013819771451788,11.427264184555197,5.646226638235956,9.321851902684326,18.53966177861612,1.6196101531580132,13.574589532805685,9.304798715337558,2.598697142683317,0.9943235790117111,13.729754840696895,6.839243476271877,16.58305735399246,1.3065310544655473,0.17164640458223523,2.242901457805919,16.98630394912793,13.11122231617951,12.844747415798148,3.5488088102254833,12.307617453913021,10.60075290291997,3.937443315255873,16.396350950580466,2.8827650764536505,3.7971777347597913,17.17626727113437,16.528882394135525,8.169537091949902,9.383510093313973,17.253777102356047,2.0568170557269116,16.061328173700588,5.223149112521224,2.289678502710535,18.872123187538982,19.32324526261764,9.975681819408887,8.651266258718206,7.5553740887704635,4.913543428575244,10.192815059641664,3.982654381482984,14.01331817492978,12.600082970847124,14.035362753497079,12.061093690600115,9.036399361870814,18.228106603439777,11.605764941921501,14.87028647454402,2.0958030864553345,5.147175858735693,10.992133218722158,3.2112368109781775,14.80787483408712,3.3926741335746557,13.400378035959246,11.295734581009786,2.3021773839749704,7.431891060729985,18.376148710972107,3.8082552651592394,15.03187738352787,3.333037010239903,18.336278166623924,8.63674264595723,19.698704243808784,11.067284413635083,14.112997576369931,4.394885264287929,16.787338534818446,16.64179177330424,7.882340238016852,15.25327017930036,9.209287102163382,5.143249844219926,8.515852873866795,14.695456049155947,12.746774025091717,17.78644332393389,7.49077293793007,10.415324713139151,12.439443917011248,13.040233204803453,2.884689332630739,16.725623092720685,13.530115169950822,10.766083982067375,19.713884944797734,11.104481913542008,8.31146962602066,4.321515415269523,0.10124671306718458,16.70746823948853,12.133015008799344,4.543876098555497,12.798911219528337,11.823933809465267,2.8834037729802775,8.792817131490146,13.210056193077042,7.70383625015115,2.3227517998620195,2.172275428039425,4.439235192411233,16.51210828876421,19.56534990783056,11.415724080617533,18.266015068020046,2.886287560610583,1.565885152492421,4.1966631646185615,19.68388873830203,9.095652845708916,8.09126327967765,15.935069324431716,12.303512739880468,18.664568821500964,13.320114464398838,19.40567052500169,0.8212242481772813,8.645541382049974,6.498913872259835,12.637783757799625,5.032406699031613,3.0377181596998515,8.125880289473333,2.7413167384271286,4.454085358913913,7.181475464639244,19.091722621372135,3.4648665830655245,10.874648502828999,9.023765181644903,17.95511690736437,2.6822772434841546,1.8934981890587999,2.8940105582844655,5.297378305587728,1.8984512487224947,4.915639452480178,15.962809853635274,15.637248146603188,14.39624492849613,1.742279134725182,5.911398346445251,7.755844420577742,6.469562714696084,19.46229983603525,8.801474148662853,18.35836638956429,5.6763861532136906,18.125249447002624,2.5382239167736387,18.261465464623132,16.683552604081644,3.6937364640923143,16.62495478676856,19.09614463780747,4.886276542928001,1.840902628170511,11.56894871595794,1.5927419561905554,5.409097574151729,17.384095890364357,16.563301473128085,2.332321136712441,5.094691123536164,19.216522292689927,10.061969440213524,11.060904946741047,2.0018568582068097,17.02504920636879,12.783047125387906,1.98073994482856,3.0927725719529864,19.343357064370373,16.482582023885072,16.159288934215468,6.123816828064195,11.583040895561654,5.879470468532739,14.82761415616257,8.193198651709451,11.708739460871968,14.625662473197512,4.80766197434126,2.3189886537083293,16.021861358933236,13.15861318111434,16.253909174201603,5.022938251522335,18.851317248122676,3.638811293082558,2.7137357657119976,10.647069855788649,0.06656309576904107,16.418625386787745,17.124888979180962,12.471425297197873,6.995221541592809,18.28288857741851,17.87902691220168,2.1107545722896415,9.167494359976555,2.6547513498241804,16.697196189906414,19.804829441496032,19.52968070908058,15.157896471018603,19.934428056204062,18.73482547383039,7.456409594422961,6.174832388257054,8.673448796256729,14.857984422857179,3.0446098912372976,6.314759130564864,7.606341887044703,15.295611419168353,9.100703757296582,15.6096117526895,4.728420784371501,0.5749567834482994,12.36031234188157,7.036359417558038,11.5341039466482,13.445537042785336,5.414328955706091,8.477144873704368,13.226191440546774,18.786672627234566,15.104761997225866,1.6354017526871267,9.386976542728313,19.546645462595137,0.12128199989863031,6.578037103335381,5.287536576921141,12.488497790657803,14.751044582790653,10.279301810446553,12.859224842489269,16.36398586460463,0.3017142353799507,14.396118987388036,7.161917981858363,16.356429495558427,2.760769731252304,5.628210127960291,19.32469499669078,5.108267090406886,19.125034625340753,15.62774308891845,8.655782067376666,4.4448971714665175,11.610966068136808,0.38559821546474193,17.912088833476012,13.93807223645727,7.66867533322237,10.358863404569991,6.692564929241951,6.972196413078011,13.99142144509284,16.400004814052508,12.420255773456956,10.417839238450153,7.498215396930821,5.253537856785768,0.5958114580247686,4.584536008606888,18.910610565298306,8.62038212844038,2.29560336305513,3.038144238902567,11.251544959878569,12.50431993683927,18.29754416597102,15.434599275088647,5.497683322920577,1.363899003059541,5.564321288986367,19.071424744966112,19.202747655472084,3.3783260444929297,9.570296926254901,12.019066079306665,2.8103396162741445,6.954678474444123,14.195752859700285,6.906989386863045,14.167856646344234,19.773477216260925,19.611138171838093,1.5498754952162797,11.649653077569893,4.902878985049046,12.805298939893985,6.099924441966933,16.29354004990573,9.402844758176458,14.213174661388127,12.053362803719887,4.154527108254258,10.45190777275585,14.970543741555273,2.1903595012687793,4.587939810854671],"mu":[0.0929773104157785,0.47663472435356624,0.48144864185547886,0.2776039280833462,0.5569425931906362,0.4962825880596935,0.01623844672324548,0.16130758825249814,0.08167456488771174,0.011829935984473572,0.5223227943094166,0.11792750209348557,0.9921784246078444,0.046068593622556886,0.6900778021706822,0.6636387307358154,0.18214299712385662,0.21423074252955931,0.7511305845592153,0.46748127750564805,0.5915254798855099,0.024833899263984494,0.8380675195951315,0.3537052872436419,0.24795999008142267,0.8460496217928728,0.19212229638097167,0.6599057998088071,0.9360493466814435,0.8535977637004399,0.8408226655298394,0.5614841348824615,0.8032597604251754,0.6041634323154785,0.06043352664121504,0.7141856596049425,0.8657910316970963,0.08248913314646722,0.9705742153437174,0.5084433590578239,0.1616488999334067,0.9725019354883921,0.22830057880927646,0.8513712606262147,0.6033177904496128,0.048865241987110064,0.09886703115808948,0.3295895069514565,0.9019070111587393,0.9698852630925872,0.45722087130887257,0.29732279710098464,0.7835294608924686,0.4441162765219091,0.6972826684281794,0.5416622798237989,0.558999974345151,0.2715564419539649,0.17036378396791751,0.7380412081268661,0.5360044769398835,0.4735076928479254,0.6297201911780475,0.9151108404247623,0.11136410876868341,0.837526675402013,0.3871910306698949,0.42981612950738746,0.5751817098515541,0.5104872023376301,0.024368742649889308,0.44322515187495704,0.6639360574230513,0.28994013910813465,0.7386067856246432,0.6576682372525036,0.24642624314766004,0.33379419338640637,0.0436604349966907,0.6103242866673393,0.3957641637939662,0.6246469429234054,0.5047865849362903,0.25705187420219056,0.9358376099991972,0.6068963456180498,0.2711750183162047,0.008463582671328629,0.9181320035047225,0.2732647482761261,0.43383758549189233,0.15665837924273673,0.4732333390866037,0.8994251973281042,0.5733050665760746,0.027722467898262382,0.12293389510554009,0.09466454436501026,0.08234193525721833,0.5978407617842407,0.7465037727196717,0.7997181368602213,0.7317029995403832,0.04633990175035185,0.044871035466069076,0.7182685405666946,0.9764549102648552,0.5466527895142408,0.07557927534082975,0.24858209089676864,0.8370076966001938,0.5255930084504297,0.14167528226520898,0.45372878849468434,0.08935389559086149,0.1255944375937892,0.9438614146058597,0.7887257105995611,0.10382463380754303,0.8616428734240067,0.20702400118948594,0.8770333356624225,0.781931086017926,0.5669744912697465,0.7306750352993554,0.3794393488822658,0.49616069909725713,0.20245948461404484,0.28335269068818114,0.08944335056865249,0.4096784350518594,0.9988026977775424,0.9766108290526383,0.3873156999574323,0.09932127216457909,0.534024590955487,0.15945456652070011,0.2857511241784185,0.6587632261711547,0.949536038133517,0.27491913151776126,0.2345446769410291,0.31643592072851945,0.5388239578128444,0.5894054226167489,0.7088035481084742,0.7475799277079704,0.30872244443551144,0.6949845499720881,0.9558679843972366,0.19206596467183568,0.9570931702623893,0.7976167860297865,0.6814922440664242,0.9024000160398371,0.5789693189495542,0.32255321741304654,0.49380547339644876,0.6703739592848246,0.17366878299514488,0.4298578239853399,0.05869244040704635,0.3598227722844647,0.25606181983436405,0.877372286643326,0.3949962770426987,0.7530223470731152,0.014088130376416652,0.17659327221475496,0.5826701812099839,0.7070002592297469,0.8057330144823016,0.5910377404925886,0.9184377590468535,0.7301886650278884,0.9339413745201999,0.23919432507086658,0.16921869969113046,0.7007673891708803,0.716316928362172,0.3340617496339864,0.8581131591336615,0.6140961865661629,0.30095350117594766,0.5332550227999939,0.02757537312163083,0.8786788164653312,0.011556270188767481,0.8422683800452384,0.03697635630297791,0.5208132959024403,0.331108039686016,0.3707158032116977,0.36763854644169336,0.7332272101361343,0.6570613880231706,0.1387508550422598,0.9955244397260945,0.6414427157438027,0.9261875143506455,0.3983549403048947,0.9254804378539732,0.9620250609655547,0.19899516331901523,0.007515694270003204,0.39927092352602456,0.1534384037496126,0.8892147258709107,0.5136331300878856,0.3828406181881432,0.10531479470836591,0.42207616775586887,0.26537116072259836,0.07154347938211103,0.3402168292233969,0.05204754408782408,0.5754584047573763,0.828079241317879,0.44871469389407936,0.450206610716982,0.9094558325463544,0.48439789903306796,0.8876765856136963,0.20870021717354637,0.21814662760621473,0.4233540255752344,0.7791449479541839,0.8881294639781478,0.9406377615075474,0.6734334376013817,0.7044777243390004,0.44198189351944617,0.2020730147910843,0.9232107061864283,0.9800181958366234,0.22987734852282182,0.9064957422556008,0.011160054919130857,0.6395969497970273,0.5654074097551969,0.19086184935699357,0.1012127598511745,0.6743326072177576,0.32977738407959367,0.4219779824427834,0.5494673141023949,0.388262114763398,0.5810224376943243,0.8337969191373893,0.3261672632109178,0.7590920164150485,0.8966463570101981,0.5922113427339311,0.7773028571018743,0.2059837294824156,0.5467140464260822,0.9188767378273652,0.09829848945873265,0.6452263721072271,0.25894110806700366,0.6381974968811466,0.5097025982560017,0.8980554649511234,0.518759574475345,0.10111063880848081,0.7830254217850425,0.08966337630001697,0.14297990273214434,0.15190688758160942,0.5681205615543039,0.4631503738722549,0.9144420717940618,0.334652264010163,0.8130742269203581,0.7811508194996015,0.1325127078522117,0.86239822270528,0.3190401299833281,0.8689288997160802,0.8399458418038224,0.992240290582068,0.19475586094061725,0.23621521574959314,0.26087094469443106,0.39724485613370053,0.7380830471566406,0.07137230415045792,0.7791672262739326,0.5453989978448672,0.33703894034389004,0.8908431909372694,0.9664116090723995,0.8836045088763247,0.6472298210927554,0.510771130706847,0.3042077841987991,0.2718578083279308,0.5966042855914657,0.91836126684152,0.020779810423109613,0.5250344538958234,0.14903561248759667,0.6169686881504586,0.8954293239717619,0.18272496893158685,0.33559349297099916,0.8028772482715025,0.6644497111225718,0.06482561044795321,0.18590249274894477,0.7400113347980242,0.8274778375266842,0.776322528857144,0.8898951827410784,0.9671948166077966,0.028820651613420845,0.16690099204617193,0.7120279870430966,0.9537770794275657,0.35521538760308746,0.19511767726214657,0.2642373501121631,0.7556363700031401,0.26101456535357426,0.518323812449035,0.9626432273842014,0.4950758619753832,0.6854251589491813,0.09841544783142275,0.3766644242352619,0.06589154296693422,0.5489427043436286,0.5483655664451101,0.78095081419379,0.04660557291075662,0.01903892260937523,0.7417900638367814,0.07898089869204417,0.17860792057832287,0.3119122801324379,0.11133842483026335,0.008315766054052709,0.5360839239056658,0.005437316208501519,0.026363340922009426,0.8447363544765849,0.5231967924462833,0.3091266804634234,0.6851547820617709,0.28013754911811817,0.853295227256399,0.42036404736828437,0.16286536638902938,0.5674730209856287,0.22609275332171075,0.1921649546144386,0.32374233845753997,0.2283322997784074,0.3803567263399683,0.8960881312117208,0.08779666211713222,0.34661236046768695,0.4799198580820212,0.9759677012681538,0.9959303978906202,0.7614924651757546,0.8779151003692387,0.9270383263942414,0.08336617666601209,0.08371415197234477,0.6576544067925323,0.32235516388706853,0.4447437123714728,0.7138973570741007,0.5504915043650467,0.33774875994566744,0.46442502274791986,0.7141795165647,0.028899841260045633,0.4621361912303785,0.7660160679304817,0.4619203351828931,0.47970853232802946,0.6667264074900661,0.009110565865522613,0.9263571936878339,0.3594566230303011,0.37104257451128597,0.22287310055690357,0.7138570039791003,0.957513713527411,0.19438622600106337,0.9489185819764157,0.2723532816471854,0.3562274729444097,0.8306962723766411,0.32635564088772817,0.6366972848937915,0.17478247837829097,0.3846575918944397,0.9494621088102801,0.8190515126040245,0.31428224283960704,0.08898426296310014,0.2319978921594894,0.14171389372160137,0.6421861873028134,0.33080436207434305,0.5610336722715583,0.6514450855207243,0.09422345350673944,0.6515574202560979,0.7730748511999426,0.8825787151361624,0.613437066630528,0.10814602869217826,0.18605296583901465,0.9052474173651304,0.586850720977351,0.2661688579636028,0.7913425032048096,0.8021440341100858,0.2476948430788648,0.5420837091622941,0.13511566817943765,0.24462629277814796,0.784101728322552,0.46256384322920985,0.15203583194825754,0.33434651937352244,0.41780442320020916,0.9046070852700652,0.9987121124926266,0.2136647183070639,0.8788476084150616,0.5781191461545439,0.9260040798405844,0.05322839942440338,0.30302381120276967,0.563128896523569,0.3035804435684957,0.22021187407376286,0.8111412630464572,0.6959328404113791,0.8911843802207822,0.006808078551296726,0.2966636839772723,0.5463184238377794,0.11383189391571147,0.5323797197180862,0.599974971924075,0.7953349813789212,0.15111224356868846,0.7683957742794085,0.9933002966186428,0.49774572024349073,0.23107807441085826,0.34018923908185994,0.27159231523933536,0.9870211248602283,0.7992756413701267,0.07076439622880337,0.9589182755069192,0.9147448785146803,0.2667893080636077,0.639826276862093,0.7364783952359455,0.8940858711446895,0.04862724927307238,0.8680285322572461,0.8552949651023658,0.8317314410869026,0.8737798473948732,0.05417303215143887,0.6359286529578303,0.5043913604033059,0.7216566803618389,0.5688961079409689,0.5989010303418383,0.2576634904959847,0.9415081960525207,0.5473874852366769,0.6203155466964836,0.7788402736366193,0.8031675275568588,0.8232151200736124,0.008752817851420236,0.8667536424392224,0.4867411212218089,0.5299746832517127,0.791599577277297,0.5818838386521641,0.5395585416981372,0.0399122455658496,0.7382940913140208,0.13803218574069742,0.43285448195031595,0.11902689644952935,0.11159076613226637,0.7171223326925764,0.7961408029730066,0.6173907743851581,0.47051344778687865,0.8675959206769535,0.9762827800559792,0.8767963991143712,0.864340396206045,0.5192515056882427,0.4789037107807095,0.4019498551353966,0.4279161624315686,0.13897049027690378,0.708920964195408,0.1924240984351855,0.7654444617541796,0.11312896339944123,0.7292810532685488,0.7807767842106752,0.7943045016223751,0.5411355420636788,0.8537102723289092,0.2751476354977169,0.031874815560262615,0.47890037894696325,0.6934962344271434,0.6082715281476019,0.9989095449533354,0.48250326708147684,0.38492267553891923,0.99365247506116,0.12882776389132045,0.4298442226000516,0.6831326760270384,0.2007463525604538,0.8396050706162745,0.4266028153769188,0.7396284676856826,0.794816549861469,0.026191130560074827,0.1494935381757856,0.32229623803438057,0.16013685962466617,0.7778430767269446,0.0851717429464176,0.38139251414256803,0.2413226265150521,0.590639909069423,0.024282252019471873,0.9399947602530445,0.7279659923944217,0.21481848626648925,0.7185267151365391,0.40751971295540845,0.11375683315643315,0.30091435686764845,0.8278508101270114,0.7230717048693767,0.026542062015010304,0.692782575236609,0.4069397423901433,0.3630816701090167,0.9672145166669159,0.16907284934434874,0.20803513795538975,0.52166938876015,0.2859091043074691,0.6832190611671172,0.4934673390097062,0.8926289803141716,0.7166105838609396,0.9856828914134126,0.76744973386605,0.5918538313014081,0.670333104446839,0.6258003831497523,0.16249681370502755,0.8319572514778129,0.1651832317218791,0.6771556752913324,0.09995010785082248,0.5788424360940583,0.536431682059195,0.5079991936155599,0.563774872817348,0.3899672505740446,0.5338349506654549,0.512214630155498,0.34635319253965013,0.14130203408923503,0.7417367493778395,0.5603140842179328,0.0993905791910199,0.15053976929778523,0.7735004649963697,0.050833745328977775,0.008199325207098651,0.7387177368820022,0.8381929509979824,0.27176929332661426,0.16094722522253102,0.92503890064571,0.5201658108734788,0.6161627847443722,0.4468665291104015,0.3578375402818803,0.38918791127408037,0.1845651394493546,0.5944533392425622,0.14636354918337013,0.34990651017156815,0.7098692007241083,0.016940858918126578,0.6532344845510809,0.18992042542673837,0.5711969520844897,0.3440608362870272,0.825531585046573,0.4427673314807221,0.05854431791293657,0.6094322122670244,0.5395937362845293,0.5712059386141488,0.06400614369610502,0.4741246639447121,0.5174227468810637,0.49626854108497187,0.737972134215533,0.09108183939769465,0.4038837715120889,0.5301285150378339,0.27256439630858376,0.6632699729308451,0.7505477427774636,0.13040098833385372,0.2119548944541072,0.6779461147825832,0.00026700361335474376,0.8784341649703391,0.16634113605880407,0.9842835869763429,0.38564174084566205,0.7203174293799837,0.6024368774019577,0.030798117130370617,0.04523549019402151,0.5565146343644378,0.6841491195224616,0.3543799830384915,0.5902278083220998,0.46822339982995653,0.0010779333457189288,0.21333603881490526,0.6790933150755811,0.48548744858851456,0.6533219213503909,0.691710623962777,0.18186653196266644,0.8638863515571016,0.337602613423279,0.5322850595037811,0.8409267768905269,0.79567097144489,0.37822104785778476,0.06748821542853567,0.7835162910763505,0.7197364504649413,0.701889739330775,0.11711178327923655,0.9258568776320752,0.28288619772635615,0.666700759935511,0.3184534320511292,0.6731071569887757,0.7714992983522679,0.8503412601537255,0.895174887070741,0.7428561536619669,0.9604458522868926,0.9837230262329437,0.371680068226133,0.2637251851395457,0.16994609241218894,0.9757828619778037,0.26195588309717976,0.4667794908102578,0.6472953593563244,0.7239041102678379,0.15087078631713124,0.0804404179205922,0.0006065033742850279,0.9908037602440336,0.5227485697889305,0.9051589576037662,0.34846398486015406,0.7482398084979784,0.3493914853178546,0.3527720029705679,0.8986312725981787,0.40844547002830756,0.14064544500920984,0.11240129785851316,0.37118643582963107,0.3132641107563654,0.5074199846235083,0.05291573024149021,0.8639758999120084,0.8449219850799778,0.8629481177579716,0.2209112586818336,0.3402110029107168,0.046038735596409586,0.6134471042991847,0.9478765511432861,0.7975283574124634,0.7550871186890604,0.7406883957060721,0.32452601728782726,0.2779856856906837,0.7686424325851686,0.7898562014670971,0.4063452020685836,0.010951649971211896,0.6892143870966845,0.6666259992756789,0.06731541410649577,0.9486313459038307,0.7082982018172816,0.9410855070211306,0.21784053903533374,0.5474164131085872,0.3071203360468584,0.9744815254934245,0.22076261747464798,0.15300003220581648,0.33891537358014867,0.7600316372448483,0.12413714548394128,0.022389391606757236,0.5647233611359463,0.7045841611554202,0.6645296346837173,0.6967128483119196,0.32831494539558315,0.7923422631129315,0.4084315309410551,0.8976106432111484,0.19321644809250693,0.8352711030056263,0.19177248375791223,0.48510862324100246,0.3667841047143152,0.4991650167345565,0.826351256931912,0.5728014734215514,0.7637691044624597,0.10087295220725401,0.7672346494322457,0.4537667092000097,0.08544927671911284,0.45743996863836367,0.35586635074627915,0.9667269941814824,0.467642011990983,0.3502892216863869,0.38724796458560307,0.31598336886703704,0.7166175453570742,0.5382147313817083,0.30864983630056164,0.8547552475766222,0.9333517805890672,0.9208981041905477,0.9221154706294588,0.5419087109062977,0.07246882444274694,0.3146067804887678,0.06134531802378307,0.9974935129535754,0.22200014796068546,0.38880674697391826,0.2615471992141687,0.3283183169637429,0.23116144895988922,0.01696402259805785,0.9644863334299159,0.5423175326637526,0.6499563322767912,0.09288759948192538,0.9358206997516008,0.13058090491890395,0.8640984578686393,0.1000080214582797,0.9128885391055712,0.5008680032707178,0.19206513780852452,0.09753690423487904,0.756801881475013,0.9805662850341612,0.13372474265291112,0.2652228176670419,0.3303194310100108,0.949773862141366,0.17531408284540628,0.7595737117610901,0.18789700038706814,0.6068516953710779,0.5373584190087028,0.6371214670370693,0.5816193459888406,0.7736862036304721,0.3017589924467834,0.19270104953683642,0.033534412069567754,0.8334131593730929,0.33728670821641615,0.44254566618227287,0.313735583636612,0.601441638700986,0.48575783671748796,0.6940427824430015,0.2859601951131674,0.36406564303745603,0.7043792026239886,0.25870842541163475,0.3032387087028805,0.7687469242654354,0.4273736325834503,0.1256582560955235,0.33497724005253393,0.6117116849533122,0.1029103917068741,0.8921272448712707,0.9948923493591313,0.35467865873755566,0.12159298425687748,0.4554441445124233,0.7014198334011736,0.015980235700481682,0.2521353908697652,0.4064922241056528,0.7307313697388507,0.0076971548537903,0.7515841383193347,0.4175204341605354,0.4484243889444053,0.548573401854572,0.21596055656579916,0.5347703046455707,0.4945984729133519,0.15636309250918856,0.27114299773621986,0.8959176858037148,0.5196832603262307,0.07732452378632271,0.8568689383805368,0.6635886404702571,0.16589591728042996,0.04064816688293993,0.5832953787715716,0.7998184584245247,0.5212593168569077,0.04087570556248554,0.6424644118988927,0.841314768530709,0.5809684139347036,0.5929571299336887,0.740096817124112,0.18731360684949494,0.3676270021172381,0.8849966916769871,0.049587369983724594,0.7897631800060165,0.36131604482985713,0.5621323276390668,0.6184544788838622,0.636215489228583,0.9633755457168343,0.6473176010572519,0.7132230718938875,0.1391631816259078,0.48277386338381567,0.6630544359390458,0.5734995510748999,0.48645884874362166,0.5560039221406379,0.1753157461063386,0.2956264972575253,0.11622419503665582,0.6089301687396391,0.3553954231460059,0.25448780104348945,0.5204208870878262,0.19800348011694036,0.7083512458749379,0.20050859475029248,0.33355319031038566,0.8673637489493458,0.6394933969634156,0.18451634947556905,0.7960719882744354,0.5099019076048841,0.28366889719806876,0.10767982882472316,0.12100568396784817,0.9371849847049001,0.06919681369180086,0.48034884387685794,0.5216623240120934,0.9781146808920063,0.004270570284599984,0.6233132109658026,0.679931615373212,0.8505573853970116,0.5009325449291377,0.1767177493180463,0.7984278986314033,0.6208277679083241,0.01152805798460621,0.8719863473109879,0.13890663196427688,0.6238953628810504,0.7436702107604671,0.7112533814843223,0.42907893015836773,0.04422407389130534,0.9072200042053062,0.7905933274552575,0.9608803870236307,0.32066555616814596,0.4053936136805385,0.7053648905616274,0.8825067704999487,0.7704033742032326,0.07226886419480882,0.9605686887879434,0.07823650212498867,0.3163670644975447,0.48887029888977884,0.7135524427452347,0.7614559585619036,0.07012975480430472,0.8723860476883696,0.4189580651515501,0.3392726091001128,0.010461244542046888,0.8726474352461819,0.5766311135360598,0.6500146529164581,0.8567010534586992,0.9082994548425678,0.535616069136555,0.11584039952501879,0.5411896924215429,0.2296848573549357,0.259495929727646,0.35360242526295993,0.23744885920390635,0.930428399650693,0.10185609265978379,0.1445332463285116,0.2602598780723191,0.5282221652707031,0.6313893757260818,0.7304458996153949,0.35096324900118714,0.24958704960375244,0.9979784080222294,0.4054648234563789,0.7028233525620884,0.5848207389118825,0.5332926381756884,0.555780460634375,0.9754131617262887,0.4962943620227074,0.833539956702722,0.37208131770626673,0.6040938326853571,0.4379268734237163,0.465913593900128,0.39266098180580533,0.06165253927769232,0.0832881567302044,0.7926587770417253,0.9032418342432156,0.657117290776172,0.23489324062828731,0.050234398034578964,0.5692791732481912,0.9502302994052636,0.039404319588405734,0.49553208949910466,0.47752862261510187,0.2593908401968754,0.9167259658979621,0.10422697002619019,0.7642755597119646,0.49341957061482056,0.9128948164880164,0.451969715326745,0.4595929508596559]}

},{}],107:[function(require,module,exports){
module.exports={"expected":[-3.9283778242797625,-2.247871531741981,-4.2596842407277125,-37.042008066575775,-2.122328213950451,-2.3938483644316233,-4.720839569712038,-3.1438219152211015,-6.7309181517088525,-3.6433314506095313,-5.488651508429773,-13.77830492018292,-3.3521073445734624,-11.25987680094819,-5.024694174984145,-2.9438156811161473,-1.8144126545954986,-1.9206721025830347,-2.523348736906223,-3.376607567536936,-6.591154501649068,-79.88968013840386,-103.4046527137925,-24.765656857579344,-0.7609040059663422,-14.98281021765308,-4.3363327302817245,-2.3172441625799065,-3.618226905854175,-10.614607944384332,-14.065220858647184,-505.9148626164077,-2.475338107429226,-1.571820617703647,-7.759962887369284,-3.361501634600827,-3.8298765638757812,-4.142710284160331,-2.3604640167684505,-3.0663589269853695,-2.1604628430912776,-2.181338067506562,-4.756969535030965,-1.7970120464302515,-2.8310044970827986,-4.478396223885205,-4.29864146780996,-532.462670670557,-1.1001265714223996,-2.59205881369881,-2.420933932381021,-79.63302398430747,-23.07096956444356,-5.3475870624480555,-37.483449607983665,-14.308187162418333,-2.9566808088470697,-9.54610031152401,-2.9006748523621217,-7.033870836325231,-3.6623381352022575,-15.223483625711816,-7.983961539183008,-22.293635345210824,-3.332915407149573,-8.262930809158224,-2.7214298872335956,-3.1005572518388274,-17.19275490662217,-2.6676413677555235,-19.871177121178366,-4.147898183787583,-2.729551375403947,-2.8013153969612126,-6.2822760451182695,-2.523824359384351,-10.059519660776491,-5.0128442588833755,-5.646515593482995,-29.403300183757537,-2.5032584176118995,-4.036856091273224,-3.0398291888178104,-6.11659267207292,-52.432973376006885,-33.09212491519705,-2.4752253080027913,-4.355388259501828,-7.84179110063035,-4.034475830664483,-6.761229112456583,-30.03651778032389,-1.8576324110534976,-24.071644220371866,-7.1543704619012205,-33.89329821918083,-2.2890469395592565,-21.24396369028878,-4.895259387073475,-3.01723832364975,-2.6668218589149553,-3.3675026494962914,-1.2276009991271892,-7.557543976818854,-6.001980921766989,-5.629082484459916,-36.35365343970744,-2.0767332888531063,-2.537027189700677,-3.4289549743214414,-3.2725539987503787,-3.003823518559248,-1.047822440751419,-9.299138086132324,-2.696979130056528,-12.80525662286335,-2.5454298019853363,-19.578765300574037,-3.6654707422295743,-3.661678410081013,-83.55023687048043,-4.101492533350997,-3.3733160995154226,-1.9769401389845258,-3.765210161166456,-3.3050713658568527,-10.434294563104878,-3.835714808205368,-2.5603122961079325,-4.04502234012715,-1.7855909488726263,-4.0087310137630565,-2.422525800954301,-6.840980982918416,-1.7201496366399087,-3.9623715420198304,-12.850868488457236,-1.6387692123438198,-75.96267985877435,-5.158699725531131,-2.3747415600420134,-3.771570305303059,-144.71758206661607,-3.385087308109565,-13.398527277051075,-2.8260731739192084,-14.412612486300528,-3.465643594577768,-4.341662623436799,-4.737185027249306,-13.491575445243555,-4.502411673952875,-4.538346008302381,-1.5798621319561745,-3.7153010616359037,-4.194271522150767,-7.9968305343181125,-2.7225216915973185,-10.833751237270013,-1.4123337882304732,-2.5333193948776604,-2.006205047065138,-3.536985644970929,-3.0428914131803584,-4.713688605984474,-4.872927651665222,-2.0960659636271157,-20.236450643963305,-2.8619339108901434,-3.6176957054728214,-4.712890252459382,-2.8661138393029555,-1.5618257685228738,-4.658671470917864,-2.0619195985728136,-4.128142827574358,-2.66855546574666,-3.091158422163022,-3.907404930050837,-0.9707432883674536,-28.252795355389463,-6.579641419591736,-2.1077276541650813,-15.116896125117663,-3.082289286182283,-3.520419073581844,-2.211517920262973,-35.946822128884115,-5.4895779502228805,-1.3330041320387092,-8.89193624615186,-4.1902457766596015,-2.032382101784186,-15.807938837237304,-2.4805570396703356,-4.680173511142143,-2.38596706579359,-1.2477262739269446,-1.6985917543425733,-2.197056089750853,-1.0542900688079615,-9.912513136964112,-4.998755402581338,-6.094450481517082,-2.6156129387509335,-10.98777431334097,-1.2252122095867164,-1.8658027769850802,-8.908360428129221,-2.043465831203266,-12.950517938539999,-3.688787388165297,-1.982173556549749,-3.4917225277959787,-3.2727972375154364,-1.3451354288123105,-5.761939008484313,-9.17741794741218,-190.68664785944833,-1.8512640546758217,-3.1056290268239484,-1.9931825022642804,-23.637009846153415,-2.9688929679443183,-5.199429665952535,-1.157763493109002,-2.155502246594051,-1.0964336165555906,-68.01393357908117,-3.681645763690043,-3.5801168554144884,-7.205522733733327,-2.8785807997812465,-1.9621282625830296,-7.191415137316098,-5.505668597038819,-1.7302777847050006,-43.058514111866764,-3.1203581769029607,-2.00619049190624,-6.63153670171121,-3.5102167533776756,-1.8438522473344432,-3.700840662227035,-19.032156469432636,-6.41110923767154,-1.5519465014674987,-4.739480775252104,-6.308868907684142,-5.305022152947739,-11.85751647535349,-12.355902730315707,-1.4340532437605968,-4.563396200004913,-2.6447913057802666,-2.003958520948839,-1.347399328871613,-4.109018711448974,-3.17897217201019,-2.8581312737186404,-3.2149057310556524,-3.326632525736815,-3.058331798533866,-14.746655895420767,-4.375454279944852,-4.382281533742042,-2.217721818761569,-2.213106024390048,-3.228484239824101,-3.562732405284255,-5.3153677657311365,-9.50305086463962,-5.027169317455094,-3.938716315262262,-1.6020818728371098,-13.38220021913637,-10.046145596236064,-0.9795250913000528,-6.006376377430465,-3.461741531433231,-0.778246573425106,-2.3340203014765972,-5.921169993105671,-4.264043350456112,-16.7760000770786,-2.4523851557878,-0.8013659814484448,-97.32962316962923,-2.5408155317510666,-47.07170223477346,-4.291818273953257,-43.22854575319252,-0.7720292294539735,-3.764850444418527,-7.136691387138218,-2.741349597055546,-3.6584350931041896,-6.293711712326443,-6.722998507762583,-12.741147144619879,-2.7868182399585684,-3.5559688314082307,-35.6669095698408,-6.955592692383278,-21.667936673603243,-0.9248939874428941,-23.998806646013996,-13.046034879099425,-213.56439368998784,-18.833388201200616,-3.6239544016513854,-3.8950382401004955,-9.558881788032574,-6.996170495094732,-11.462886299999465,-1.5093678036490912,-4.999916610864978,-3.8635199954126604,-1.4104563444414924,-1.3469083990975528,-2.0876932560435257,-9.973344650885986,-36.60022797112308,-2.0924136548670864,-4.000464773718604,-5.18686514285054,-2.1632258855302466,-71.71803757762929,-2.463033139666352,-6.934028321319304,-11.491107267939736,-7.485812618538857,-3.9398788153391293,-6.298402398948418,-2.3824778138666787,-2.7529738862403645,-4.268235543909366,-2.857726974031456,-3.141224570674566,-16.18219425357296,-2.047325116260696,-6.594703623622481,-2.929136411143832,-3.4767254521336097,-9.008081605628922,-8.670322997526597,-15.472348001610166,-20.56734260378397,-6.211892030438172,-8.630951009199281,-9.700789719128633,-6.735067974281813,-22.763119149102177,-1.445539907402489,-4.999682631941594,-3.3755892766071587,-3.975565893891583,-2.9005876898198877,-3.432876486528521,-1.7192328779793216,-7.297971280213293,-3.8996781164397514,-3.490892987033867,-3.0960953855426956,-2.715306668847578,-9.572433928835434,-6.626959702830025,-2.586120879297558,-14.299249399688302,-3.795433233098858,-2.8867517383602,-1.3654748451002867,-1.452609467012227,-3.756473466408556,-51.486927712698375,-11.307536807081743,-1.2365080275457117,-4.301896898277245,-2.030581556593052,-1.6823931615815761,-12.758733808235885,-8.155000507373288,-2.1893758160411565,-3.1874241385386926,-6.690173079224685,-3.5484001081891376,-2.9673462566516826,-13.543962557530325,-27.88304386925839,-543.4011879892977,-4.019511216967658,-2.8322032754838995,-6.230791441188934,-60.16540417092663,-1.201249220647743,-4.238486462423485,-1.536136536537746,-17.808198184783866,-5.5067243089483675,-5.984813592595401,-3.647401550566582,-4.817188432475913,-19.692759995754653,-4.302879881199841,-9.431148003598844,-9.608979585224265,-16.949753982988533,-14.267792500997265,-4.518010041420481,-2.3842695348854845,-1.9072573657503973,-11.533716632745167,-102.31275247074728,-8.310199618769039,-13.351992028113385,-3.924076294804138,-5.676164602205494,-2.295294385081152,-3.258414963595884,-4.128886220723206,-4.819323701169142,-2.4319023408756495,-2.242590563058335,-10.802079451965747,-2.052746586901842,-3.4435706072038905,-6.614096497766503,-10.355887945663177,-3.3830060189080435,-3.263449462199519,-3.977611763121494,-1.171531401714751,-3.294928547420845,-10.501838086798491,-8.72710314032952,-3.0707809948288234,-2.4041152563867274,-4.2709412322479325,-4.1619693428231175,-5.906912796332897,-1.159444633119993,-1.4114181628652498,-3.2236020988903644,-2.047983226939715,-1.791532620326422,-10.259176125679401,-1.2067694831378626,-2.1130080135133276,-4.7707598543815,-11.382141447537887,-36.92428780113183,-1.8553852336588113,-4.991871503021407,-13.574251815053547,-3.6072237262985154,-4.364860876581948,-10.07367505823816,-4.741055273665357,-48.32703631613778,-3.465194658751813,-46.37558024859085,-2.4462990773460804,-3.818180948963538,-1.958230957236892,-1.368440133398564,-3.7605065104423283,-2.7289083196551394,-1.7826513828994528,-6.259196588571648,-2.2217284667580275,-3.438420147934356,-21.52195021735378,-1.6015812577209738,-1.8350616348994444,-1.8131891211407334,-25.29265739386095,-3.6638546970767645,-0.7646256809649818,-3.4166609224266717,-36.08458307580383,-14.615090287876125,-2.0055580767769983,-5.347912660160268,-2.9720105543839583,-14.056301033613208,-8.09115308990339,-2.126248431070014,-7.793810906477511,-6.354248671487264,-2.8902208276381685,-2.6758415342452206,-1.982343544472692,-1.3706069298000425,-1.402544025664365,-10.329248046126924,-1.7587923442156244,-6.406602013270774,-4.280270204201397,-2.4686364003786654,-22.72028420938524,-1.7344151356003383,-5.831172879035209,-46.019340227471154,-256.85933726269064,-2.9483417363199136,-3.5837804593749554,-2.570019719283933,-4.696134603863278,-18.930320201077905,-11.887468311692402,-5.025835218278854,-2.0533030040700373,-1.3854340787586914,-2.201034803972437,-4.014365617772611,-1.9222768880458934,-5.355757003177837,-5.905562792702043,-5.408283041571091,-2.376507828826446,-4.115282552134127,-1.6523311890015826,-3.1313880594441663,-2.9274570881792084,-1.2872104793258095,-1.7658319791698143,-161.59895978091998,-55.468094527294575,-93.96333312406566,-2.8395998746228917,-5.008768472945847,-1.3123710775666315,-3.66345757740515,-10.091003843283085,-4.185576087995426,-9.515988169230244,-2.464953099919817,-4.6331911381924415,-10.892599700617087,-7.851410491096749,-16.474510400411017,-4.86602649836071,-1.5714271824931205,-3.1691215397381156,-2.879052114696393,-5.993390233391993,-2.9031566721862507,-5.323055993415057,-6.616934685791966,-1.9845750411437526,-1.6156335822807768,-6.720275217930057,-3.3771131452193006,-4.2270788088317985,-2.6308681842042048,-5.150141376470232,-2.188277824976774,-3.6606940204853,-3.0041766837929478,-14.001299211809556,-2.489612371346497,-3.508415411297763,-4.55964676487866,-9.051602762138101,-2.193725787583481,-1.10794174497279,-2.042394835605936,-4.118399116977473,-4.8441994129923405,-30.319279623066244,-4.388112583414743,-66.60337945295015,-2.4324915482327194,-2.633090801849157,-13.059431876480664,-1.6812573660579613,-2.008609027561924,-2.9691829797868476,-2.56322494145039,-1.7493997107695742,-2.447811805809392,-4.3913503062185075,-2.9601688792363356,-16.148058664047905,-8.363292408873743,-9.865132699641249,-2.67080203664855,-2.7395673090167834,-7.53984241245514,-8.23035705999126,-1.9513884930225984,-17.564631503450777,-93.97490338827917,-5.393673106510438,-3.663542058987547,-2.1199120096478303,-9.427276546141753,-2.9145682815253178,-2.223983617929279,-5.7742666192833205,-32.72004417219086,-3.3708628191601653,-3.0558593087673778,-10.942021261511726,-7.524841475064406,-51.65777416729494,-10.603809448017696,-177.89283512988152,-3.180560396746948,-10.505947441961196,-7.3111542679942225,-4.334329462268178,-18.388366653100604,-2.611437933295285,-4.561354113307557,-0.8862351528119939,-2.2450272621234055,-78.86555590640222,-18.241606792560773,-3.4359044064793296,-2.8255406058887536,-3.7578983130436363,-1.4030557125759728,-2.815999091333201,-2.260054242054288,-4.9408161911086745,-4.206216927046308,-3.082026472758815,-4.207848730709583,-3.1688342562501184,-10.114675956375496,-25.76633459615139,-2.9400538142235093,-0.9659180406111869,-36.33820680234102,-1.031908682592129,-4.061380465444868,-1.7115795960472289,-3.407948574391612,-1.7691657652094912,-1.2864728953292204,-5.761709196852666,-2.882453374722241,-2.8828670086948116,-2.08283612267316,-2.773584848320548,-2.609735713331444,-4.085707005613816,-5.166801790669607,-3.2375437187678315,-4.773450021897283,-8.384711450870148,-5.2345280392675795,-5.748316070549691,-2.159434823860935,-2.3703250751000384,-2.7936443404640228,-16.278616138302077,-2.5766080144409167,-3.48748801555239,-3.832804251544875,-7.09450551294032,-3.510273232740494,-3.3223267622846686,-17.22196023631792,-3.213856078720175,-15.81626150510257,-22.71733629582196,-5.340917494217566,-2.4397680935859323,-11.901027074862522,-1.045341460924213,-10.66628875558255,-2.3727238906709025,-2.4068033810772627,-21.170643580240707,-5.769431008582155,-5.798362279317298,-2.6805318085003162,-1.9918154224740066,-0.8083168003426191,-9.984018182403245,-1.9281085318226447,-4.731900202351181,-27.359459282243368,-3.2998974776090573,-2.2235241403773776,-13.656103721478326,-4.795749840686064,-8.1326836455063,-1.9463113956172775,-2.938586277939178,-1.9241288748906795,-14.160630757256255,-11.912446345482206,-1.9601800633951467,-2.7564462653883086,-3.2664537749639537,-3.9203148312644083,-3.7419583146695294,-3.511640728637493,-2.7736561208708634,-54.343205690247,-3.2368750731856712,-5.42865948811152,-3.4287189977462655,-4.188417152945876,-3.636978402382304,-10.957585599627983,-8.822913424109508,-2.83116459808509,-2.3823060450905653,-3.8027350112870333,-2.338679696143539,-7.467567862724216,-12.045277951662584,-3.212186459086807,-2.6726997215005537,-86.18378752639211,-52.09294361664044,-55.8651656456258,-2.5804990914612187,-18.142974399167503,-4.292454683609228,-2.9096272906825016,-12.967170171691585,-3.408506805876056,-2.6373143428191685,-30.981423082737322,-3.6120675332512997,-2.00295310020397,-6.4183500942834515,-1.5900286459901916,-1.9201498265711139,-2.471162114698152,-5.735401674787677,-2.7449479966103807,-12.381388617460019,-7.203746280692864,-2.045991737646157,-39.27448536573265,-10.216826527538052,-7.014556536183784,-2.3125060931320394,-7.021392457132442,-5.6095566957179575,-5.045091958389751,-2.336863123892144,-17.039672613216595,-2.3198708216914947,-3.4954481239955664,-4.9808606148326176,-8.809618770299686,-2.9444288917308845,-1.5056547969340754,-4.839025106612047,-6.851632920455217,-7.145496495516471,-3.5243053246806495,-3.4273476668986924,-14.605169635619905,-1.006976205584447,-2.609403301713904,-1.636466300390267,-4.742924257163838,-1.4969271052934756,-2.202928806508938,-92.3296805394438,-5.510322930772861,-6.7956853125511705,-30.585150323260347,-3.5156602024424903,-3.1632727104954523,-21.655329393721445,-2.1125705414752325,-9.13281261009841,-1.5468932768718353,-7.290267657449146,-1.8344819916437616,-5.712782243446282,-2.809323173257745,-2.555355173902274,-3.675661554927665,-1.023908515269859,-3.3044171406668834,-4.416939759948437,-3.154347340396738,-5.127722153137807,-1.6262136440194686,-2.0659950458977696,-2.7023635913657817,-15.403075226012575,-3.768579817499692,-10.119143409467295,-1.1725957089912682,-13.483071522130045,-13.80156704691404,-2.868020042406729,-2.5550339352757563,-0.8655987381131756,-1.6888693584913295,-12.719727482302096,-35.34640312373349,-7.428609324643984,-14.28295250446878,-7.7511786169349675,-1.506257847270055,-36.221950939399,-2.102652695709552,-6.749894816805306,-3.894414263161217,-1.957545915179157,-3.2996370731795537,-7.409052198257017,-1.2144331078697672,-2.164145307608775,-3.9336512385231988,-36.349597901575976,-3.4137109513004584,-1.2779070367557634,-2.529717507096929,-9.57415045124992,-14.301505465488122,-3.639661422842578,-5.412434227234828,-1.0939346020373137,-5.323780821814725,-33.02542028333929,-2.2948022670048016,-7.943850923182033,-3.7464414523419802,-20.261100153957152,-2.44535319498793,-6.423497056618891,-9.580703400267298,-122.48097541346833,-3.6057976505366067,-147.5569788143634,-19.549846892932536,-1.5758496183550819,-8.206798268796131,-5.244070424535423,-7.882538523061892,-2.3522969565788987,-12.93505762057605,-4.25196862556773,-244.74104088109215,-5.9574111595202055,-4.0736480388644045,-10.613084306575145,-2.26294770883181,-4.680693949352622,-1.8034824305418602,-18.870279382833008,-9.06199545127344,-4.155350369292521,-4.799100458090889,-1.7067314155163582,-163.51792212549557,-3.7928553571230403,-35.29885289952209,-143.65394284218297,-7.8737831319511535,-3.20626039115068,-9.088618252958872,-2.3284843475642085,-8.845151435309486,-5.052355122087126,-3.0628242738447224,-3.0418040343002253,-4.119789980320418,-3.3720332379697107,-17.22033071957232,-3.304753153439834,-346.2879260717513,-3.182306170573612,-10.490329949533008,-2.8508231745637373,-6.681673680576615,-0.8834941339826131,-1.4688256282751457,-7.883816678869458,-3.83214194973516,-2.1839800865540027,-2.805295502933959,-20435.535862808527,-8.750174158215788,-3.6227673014235453,-2.431055706163692,-13.907412385717608,-3.6941429063046263,-10.584698939914283,-4.463650751283054,-1.2358283595682482,-16.95263039293423,-2.884633771491507,-2.540665842958332,-16.741071428805753,-2.2533688990843443,-6.919185984142912,-1.473519910990689,-12.058258804640966,-2.838795264078846,-4.578354029761432,-1.7042803885726008,-1.147188016155954,-2.0508426002674303,-4.981172056397265,-2.026451850722484,-7.370684667258512,-1.250314364066837,-2.6015623962826675,-4.925241985956166,-25.880472045588856,-4.234705030780497,-0.805923239524461,-2.5171572851101733,-459.8639727065854,-0.9671364181631426,-1.2964023324102143,-1.5861748356233143,-36.55122218760151,-12.586032298127165,-67.05670663542752,-2.1059013320070954,-3.383110483602769,-0.8271071604440253,-3.9192221908089846,-5.375860480907116,-5.281799953139896,-158.63963462108245,-2.3738839669938554,-9.333765169829299,-1.1931025057999523,-2.268599685693789,-5.202711352960329,-1229.201235649854,-2.3575220781448927,-11.045063642683786,-29.572078530498437,-6.5014605472843225,-2.9317488055431897,-21.332636789390573,-43.757989743338044,-0.9708613745337619,-3.057284445322487,-2.9198410885405015,-64.24769974475358,-7.446014952476799,-4.531169514930279,-4.351400809432252,-2.11307951820577,-11.736862495739226,-10.718393401245834,-6.8087270964260265,-2.6861489484011063,-2.1107244099386904,-3.364526054986034,-2.999435765455975,-56.72137787725646,-7.609478050715486,-3.345695770879932,-11.035406689009209,-3.3345308248688093,-4.222509131947813,-3.3974486348501065,-9.014038381406943,-11.913379325530501,-4.591113420535878,-28.34236922137749,-1.6418715287810417,-10.703277894049844,-2.720979567499705,-1.5507256485650553,-2.101238556041585,-4.535506352731007,-2.9527828922652013,-2.3638531514865115,-305.7049696558149,-7.2521123348691185,-2.3349787007582914,-9.239585311354805,-326.8112619680547,-2.970789858743416,-2.9538181914327497,-2.8531035696940834,-38.77837516677034,-1.9986402713338132,-2.7195267672558825,-10.046407189647669,-8.919911452401806,-21.449329377390328,-13.856874399281455,-7.3441376253012285,-3.0036377976184045,-17.395744735473087,-13.748625234121631,-25.026406827987255,-5.872469710825326,-0.9716419345893891],"x":[-14.497098639067325,-15.898946824846155,-16.60766747368769,-13.999663309917281,-16.57960732093497,-13.15696463197831,-17.340887709682505,-12.352784423733134,-15.123387244396723,-17.55348273943998,-19.230249015828644,-13.512965457652422,-19.36299219395116,-11.77489522386383,-16.316540390213184,-12.329805250575275,-12.846179756776483,-10.304392214840918,-13.208186071122878,-12.531840804383862,-19.721182260436112,-13.935221851699058,-17.23718091442847,-14.15773881328622,-10.18118535792137,-15.603106117554777,-12.401395415417083,-11.440933663583554,-15.024586368801597,-18.832116408204495,-14.88226915477421,-19.247786447287524,-13.685559764895977,-13.742644078173765,-15.460007766552149,-14.68905971251483,-19.89201149384585,-16.86049916923089,-15.496272534125332,-13.116868769582604,-10.779734933716734,-16.138691016106435,-19.343018308650315,-11.897388161250237,-17.275639508637603,-19.101198003334908,-13.282232190928863,-18.35094695299581,-11.419238958109545,-13.608622268553754,-11.609474381918831,-12.168950498193654,-16.57476445625947,-14.957571285456122,-18.98612741633295,-18.312840486881623,-19.114672453191414,-13.703587613777586,-15.885008448368602,-17.951948887503324,-14.46530168440255,-19.278266424220725,-15.403917819552005,-18.89871043514757,-16.60101646015498,-18.3158655069588,-15.119363020269398,-16.53964660002469,-15.231536191396343,-17.073669014261952,-18.937755097904997,-19.96924723751966,-17.897520795819837,-12.494586325051557,-14.128245887391378,-13.754168229536699,-12.336111471269923,-13.18939736151292,-12.29637086689281,-19.296891028772386,-12.525856192888263,-19.168422104650162,-16.140299749978293,-17.714663888099384,-18.625975349569494,-15.224248021553489,-18.50825433624008,-15.022988592047914,-14.45298970013596,-15.591137964979257,-16.10257527890346,-17.533729557061356,-15.171667615395341,-12.125408548723094,-19.053610116206105,-13.20899910090592,-13.971230528942339,-12.52756312871886,-15.681193184581744,-17.568940363268066,-14.371392877932433,-12.571622206964863,-11.325613316294106,-10.599916071335699,-15.257138383804676,-18.418382172786618,-16.932801235770906,-11.258718740909606,-11.501942277214653,-16.326551978201834,-14.603720786425853,-13.030682207704734,-10.356354468955555,-19.57868125486199,-13.68570662734892,-12.910214288902019,-17.273122787640723,-19.273936833288555,-17.565557412764402,-17.70435617866212,-16.178217930750392,-17.710396938204973,-12.25337139124629,-15.25660843608973,-13.335527087749295,-14.26195494445979,-15.281200972757071,-15.695126677129409,-10.808822191558214,-11.004007375654536,-16.132464482955168,-13.903265958191312,-13.496216422477955,-16.016831982806526,-10.398779971826265,-15.171508532030213,-11.621328132947555,-12.411112610791452,-16.992194772258884,-14.791593974783472,-15.254983699257632,-15.246503224724663,-13.031411983697023,-15.496973857323011,-11.125395190690423,-14.944178784572477,-17.94932049048925,-13.92831250086208,-11.566770614055661,-12.28145114486906,-18.17889318402283,-18.748147629703517,-14.886700246032166,-12.876822090544335,-13.133814264411338,-10.901335758153435,-15.281738179858891,-17.743139782718153,-19.881770129362874,-11.868796304177764,-17.062764048535634,-12.93168564328604,-14.283593550935695,-14.533916715503183,-14.605751838623451,-17.86626483777573,-17.629848937044322,-12.596978299683062,-18.196872113362826,-11.602257567148088,-15.594035885577249,-19.535414244283714,-13.551642510475112,-16.621028644148623,-15.022934949909367,-10.217258574074293,-14.164360630255297,-13.951898459917675,-19.81852216354492,-10.01249000907525,-11.081098921268726,-10.502163578503719,-11.752647969172596,-17.55455154430419,-12.962947576236264,-19.24791669296518,-11.38653575063789,-18.70428544276708,-16.33385273941461,-11.455460450038679,-14.341430051099682,-15.680728539291016,-13.386157217134693,-19.89011963065039,-19.80819399803131,-18.425517505972977,-16.27394348648836,-11.750681785146435,-13.203948460209281,-18.23451443224059,-10.628850805985035,-17.881166830124265,-14.85943786892804,-12.226569187851686,-10.583769022965605,-10.32024300583403,-10.500217331378439,-12.509370457239372,-16.615256958235953,-10.82349257374705,-17.705519855469095,-18.316621270482802,-10.353795691458426,-17.941912860468285,-15.20367545816557,-12.706253151028244,-11.606598727151754,-14.823488124330895,-12.052773734095277,-10.141944330890569,-14.628098606721615,-14.374369425772155,-12.662235487392074,-15.442751541441908,-12.003765539295099,-10.002183361682173,-14.818190603169484,-11.696556636912646,-13.674927791011966,-17.166915789350668,-15.498076711532452,-17.067234750873208,-14.978113414277164,-13.888921648569356,-15.165764720067633,-18.856789161100146,-12.036595136642052,-17.381916901157187,-19.44589999099023,-13.872028788377474,-11.962703445331943,-18.07432694040856,-11.520171039162243,-11.98171555778311,-18.1958375660182,-19.162116711548258,-10.727766171066115,-18.293931578683814,-19.018263107109266,-13.93940460699695,-16.819504977839564,-15.292999401201762,-14.45252437849736,-14.483362714733751,-14.980827150120149,-10.15117978883912,-13.994127059935337,-11.526686714014085,-10.571697968295856,-16.166258601017145,-16.134396255377954,-18.314946458068917,-14.536264157836772,-19.803734963001702,-18.253191431088798,-19.455297183823493,-15.90260838437162,-16.75764590947376,-15.33631829751906,-16.233744553540475,-13.772709921881427,-18.77652428859694,-13.021310360205351,-14.790934591046167,-11.391933406258838,-12.78239472227851,-13.847078569234572,-11.875296988401026,-17.391466842866915,-16.182117301869955,-10.340848097775627,-17.337517126886016,-14.399112073191993,-12.326273215400185,-18.020737133642328,-16.145738445378345,-10.336118025461168,-13.912819389064532,-18.717149417345297,-15.35595449599634,-13.390241844683304,-13.361257228897284,-10.565552677775731,-19.983360575786687,-14.100840760294878,-12.72245872025352,-13.097865812767655,-16.193732049960467,-14.514284228741985,-19.222444977252696,-11.88615004346852,-16.158365680991544,-13.422025656960706,-19.875002699763794,-18.007540988723704,-10.228339909243198,-13.52030928420832,-16.002180983240898,-14.909536416109985,-12.287811240953083,-12.875133937078925,-15.46771896364733,-13.89135296972831,-13.148088151913484,-17.66787062674422,-15.115785773982754,-19.43289792154881,-17.46809737449727,-11.93281004480304,-14.347639231712257,-14.983407455052633,-16.243008904616268,-13.173067045187484,-14.11419086290788,-11.658812659589797,-16.544591358893616,-14.619693899313585,-14.410882518926787,-16.669827984528233,-14.519144019398091,-12.769993022229599,-17.080547495026522,-10.885630120614909,-12.579646391080018,-18.035692821503766,-14.810482516680112,-19.361859748016315,-15.189912647909264,-11.122186123829835,-16.119015013771627,-13.749557269182986,-17.353890820479695,-18.824437883324958,-17.520282698995448,-18.661405186987,-17.606303980921766,-12.850461553891169,-16.394830784736705,-14.907162585342792,-17.99447993135609,-18.48075502197233,-19.830642513942383,-10.146378155828103,-10.12807129824489,-15.375400069086123,-15.830163695175601,-16.73839067667284,-11.239985452685627,-13.154767622288588,-14.947605224746049,-15.68238668822828,-19.114216000458164,-14.875342127313363,-18.48319691863071,-19.190730195837943,-19.554280937719923,-18.646333817138125,-15.049515389458763,-11.99636483902459,-17.568293247892402,-14.76856010326582,-12.383389176608265,-12.40637946122672,-15.317328832004673,-18.991120296031344,-17.787578059563714,-11.944214598411042,-15.859749062055952,-12.90767212366305,-10.403204623325397,-18.0453783386122,-14.064652828163705,-14.647831983996616,-13.624141288152371,-19.34111233474286,-13.312813443615186,-12.262604086236237,-19.054356728428765,-16.635012011940514,-15.368636480804192,-10.10946295962994,-17.61085642288227,-18.201359662801423,-17.862502488221224,-11.244766159342328,-19.27944765547006,-14.390213867395094,-17.134515408667596,-17.721335490558253,-19.983583447747645,-12.450658997017277,-18.100280019656285,-13.844598032411605,-19.053343685000623,-16.930476796867353,-17.931071829348934,-13.93384902503202,-18.60695571396058,-17.86582229755402,-14.917939761276134,-11.182732048645265,-16.008330336367095,-18.935627337555047,-17.731939020193398,-12.253608857666606,-18.958939196202053,-14.460173881119845,-10.401110412200673,-12.896145457540342,-18.21638446292123,-10.50711165815386,-10.636759748868553,-12.689552613053594,-13.78873840700626,-16.575395506872287,-18.496523323524087,-11.175097026891832,-10.16795849188294,-18.995382340612025,-18.618244156849617,-19.295272202042387,-11.674025474201745,-11.621405677579988,-13.230094321863504,-13.877213962242894,-16.46931773716346,-14.784331442773803,-18.695622068260942,-19.733688505610957,-18.867869676847235,-12.321675903132608,-10.006495034537705,-14.496832187346522,-13.62618379417709,-15.45024708836298,-17.852231069485068,-10.60905498175613,-11.261148598732568,-14.487157744304785,-19.941463342310758,-19.06634878938938,-13.082970655428909,-14.74106264130615,-15.118146557044126,-13.943291046959327,-13.897954472184278,-18.41783232601974,-13.481620151233253,-16.86552125318987,-12.886539633560766,-14.61443630226774,-14.508011859976879,-17.43665602770985,-11.865375478356444,-13.617071496930803,-18.215927072706428,-13.4295452417987,-11.949939537854778,-16.0995145230647,-17.888178422012942,-11.723656653812345,-18.469947545205144,-14.051161084014435,-13.018731248720485,-15.484273744339207,-19.183865217706348,-17.970965397144603,-10.196659859683994,-11.1358154316321,-13.529529434499935,-19.16783764930604,-11.729888486300919,-13.587483990530039,-18.80774825290041,-15.14272007587148,-17.09270404778138,-13.86373016222415,-11.369453500656427,-12.652093387030945,-10.05087859514314,-12.298528404461758,-12.061286204333008,-12.064793183188993,-10.412524874209563,-19.461298943821124,-14.619525362862984,-11.757881845207365,-18.19160498130907,-13.87104350240322,-12.475769229671833,-12.699677648964165,-15.76086756764304,-17.528042196996317,-16.754162889442817,-11.855982036076567,-13.454184287568303,-19.925741624643226,-18.644136870566467,-18.053510345137664,-19.720152721757408,-19.708638383158984,-11.18072285929615,-13.075739126352932,-13.43750390985785,-17.606379041243628,-15.671876505834996,-15.20225723128595,-14.179661701208794,-19.4233468976704,-14.815792246588263,-16.9042031480279,-12.19153981477026,-16.585237630272907,-15.155399132178877,-11.131162703590626,-10.048619951135422,-17.05910364077328,-14.01068049554188,-19.60790887499369,-12.778845092425078,-14.418832123878753,-10.158462028862568,-18.112511324026887,-13.016474693633338,-16.185813521443404,-11.361207751104699,-14.157871440379605,-14.375275276492038,-11.897529930002053,-13.691253413541002,-10.88268439163918,-19.1068546561561,-11.184441670529665,-13.78309283701999,-14.640121189341928,-19.636098146664978,-15.637620519379713,-12.537691059419204,-17.290862553458656,-17.550967917754605,-11.258149883385007,-16.119253123674703,-11.46097164314176,-12.503354714099977,-10.763738464442511,-12.757452330556774,-13.68007034264069,-16.832706796644022,-12.678777921796119,-17.673386337552554,-17.125171797472206,-18.38784396904792,-15.99926354717356,-19.5649078450405,-13.306009081529997,-11.311069217952356,-15.942777909382029,-18.758542851630434,-14.246216373816678,-14.4128178539464,-13.244302550385026,-17.919872562699823,-10.499452884772957,-15.94351143648822,-19.017784337856625,-15.673331912291253,-15.828443695605745,-11.454452377616866,-16.104314622776112,-10.617597779583486,-10.821507458451476,-13.506864086674799,-15.245701220914237,-16.067529732672305,-19.873037346767994,-17.303240723415236,-17.860984367246783,-10.292130295821105,-14.731654842837909,-17.866805288380643,-14.458309931530987,-17.9418171316438,-19.92557773499882,-19.50389525089237,-17.589562066629124,-11.767439840023211,-17.56803671720559,-16.000231076388275,-11.71290552010543,-13.714410379359837,-15.166845415964554,-15.074906915784458,-14.597792921396977,-11.54135316157857,-17.4712389133732,-15.716938235692266,-19.452169001677206,-19.301091628844958,-11.794009388088512,-15.990005828980895,-17.505684730947277,-15.30783783087146,-19.504222035314772,-19.095647609598572,-19.12878147406869,-10.85069766788225,-11.237916052182701,-12.495100770163985,-16.617178071340124,-11.028700866325579,-13.397463617300751,-18.344443543393737,-11.27358371028848,-11.696399665176425,-10.331538778551261,-18.61960490324168,-19.194513805749512,-11.294462448252451,-14.339027635739512,-18.29290119728357,-14.653182024403089,-12.32664917157482,-16.002346290761352,-11.998294854531808,-15.17596845104935,-10.917732646931332,-11.275252344141496,-12.31870204016479,-18.25645589509066,-15.918217066508182,-10.057530809679475,-19.275099786071898,-14.656956055788594,-15.579951584209029,-14.998917533795673,-15.145166859380598,-17.217322802103837,-17.582764903946963,-15.314488424464582,-13.377475789493172,-11.870917898222368,-14.741004343409488,-18.508047399658377,-18.040459713200327,-11.699934759193853,-15.193754214472264,-17.960058006150796,-12.052371202025133,-19.96234934419277,-16.35088931706226,-18.978030300909637,-16.75653786900644,-13.40713794597441,-17.431064188794487,-15.368348775692496,-17.4306176675726,-14.51200076094895,-11.655053783650791,-18.800158318453246,-17.654223218266964,-13.630232365235225,-10.53857059885553,-16.543677165016145,-16.208163694232333,-12.546442106107268,-12.33856027849486,-19.749597599334233,-10.683499960062655,-17.381917310128312,-10.679342076426968,-10.229723157533359,-14.00064696903197,-13.807768326076681,-14.41473922322471,-17.559350218641896,-15.467351546436541,-13.23369462704117,-14.161966612063061,-13.148252866824121,-13.575396941707956,-13.38215166556649,-11.179520664279147,-13.900117000599208,-14.899997857521345,-14.515867987518638,-10.770449605868833,-13.682880556980276,-17.37361637597588,-11.419911967215237,-15.104834357986519,-17.871098506684348,-10.046229969174302,-15.270204794645664,-13.267978800539023,-16.429524638954515,-10.750800902997902,-15.046251085260947,-15.669633356375964,-19.323902327938136,-18.465545368487422,-19.515007090094823,-16.429512581694475,-10.671000921836677,-14.01544333547787,-18.20183323082029,-18.363175746171237,-15.766965880185815,-16.507343304995217,-13.041963225647129,-16.365906406361674,-12.700514807329492,-13.078412043905324,-13.76164625788159,-17.05076807797321,-17.66342299135576,-11.320436883570943,-15.35244889483685,-10.806376811327333,-17.30145679309799,-15.579256685514487,-11.468722767213304,-19.45712168573224,-12.267227007443449,-16.801494985936497,-15.313331435961764,-14.569884716902576,-16.56171548290995,-14.396946160697897,-16.295811614308867,-17.17994594023581,-15.242721807559718,-19.72477924023324,-18.533588779877988,-11.340937582154435,-13.680103396971008,-16.218405085345662,-19.415331776497247,-15.885576863769693,-14.348721810784484,-18.11505268886636,-15.328912771830732,-16.283494336785125,-14.162982566810369,-14.476776029778689,-11.320570665255902,-10.692027290438128,-18.604957212368014,-12.79774395486752,-17.357285637753247,-18.39643507048422,-19.39211617899946,-10.583603898515612,-12.485092101805439,-13.74633916619163,-11.031992284610205,-10.568180859974829,-10.354186550502414,-18.186393323025285,-19.972299737583604,-16.058815057552476,-15.8901877188328,-14.687235249106678,-14.355379093604501,-16.2831432616871,-14.028169098789586,-19.171975154513426,-11.616592952240538,-12.169831129692017,-14.212485649779863,-15.735058380758566,-12.795830962786695,-18.167846021451346,-14.434406264771425,-11.181761964876904,-14.520668028683732,-19.599980980540206,-10.994699276643168,-19.264966527701755,-10.379862397270958,-10.790199140038863,-13.56944881437131,-17.534105089131664,-15.11055353068609,-19.202385307880505,-10.95262830736792,-14.590477744973407,-17.344086170230312,-13.711977308488247,-14.005285711660239,-10.174346095347166,-13.327562774744905,-19.966738453837817,-18.046523909856475,-17.560742926091994,-11.33536878315528,-17.45012452687846,-11.400568255355473,-17.168040134142586,-12.551297947011435,-18.314154463147332,-12.198817778967385,-17.209677210294284,-18.766298007331038,-18.550250607988684,-13.524932383348995,-12.700038744002608,-17.017709716481026,-16.78355842318629,-13.73308918736363,-13.96506125167364,-17.047775277256658,-12.59790856086739,-14.194275974620801,-19.806085376000787,-19.154071079244975,-11.449395265249052,-18.554998825850298,-16.197989131559503,-14.602558600689592,-17.29301354533507,-18.765906116474937,-19.679848015137548,-13.121925625712388,-13.822225301414939,-18.462500268799534,-18.52902221757097,-15.199227942025624,-19.793700704622598,-14.101689862890424,-11.930115996799827,-10.12786394996147,-13.763050454151093,-12.797338984006025,-18.630312901591623,-15.650130783307306,-11.483549871699022,-19.801639471686812,-17.284180839664455,-18.349852392854828,-16.239912532240368,-12.239440001839725,-10.896323966018187,-14.6608068018479,-14.347518577211453,-16.668638548927103,-17.494579090333676,-11.217602573889106,-14.796314424051673,-19.169549812046107,-13.543906030320779,-16.8231642557624,-18.388647942224168,-19.917580684343463,-19.185735601987314,-19.925142638968754,-10.32679957933059,-19.60420523228333,-17.688528921092693,-13.700528041214067,-16.20108387641068,-18.472025363922036,-15.884992835642183,-15.468722500295886,-17.584008462117012,-17.968420590901715,-18.545733817891513,-11.476552956864133,-15.86863871188016,-16.63931755939625,-10.75663503768924,-11.650901098440807,-14.948017843313533,-17.20892114336941,-10.102592082744286,-13.457687238764258,-19.945754623773933,-16.45778566206666,-12.671424495880764,-11.440190020248945,-10.997961512148148,-18.430166897706904,-15.684746659017957,-10.75691994258181,-12.236567784696966,-16.29854819856304,-17.3844411587802,-14.764316171663525,-19.66060019089238,-10.179615366820867,-11.141363586295741,-10.354769534153544,-16.017524411808942,-17.168070289874798,-19.08176737042329,-15.451505253938478,-10.138751856329405,-13.279658392751795,-17.37418233863541,-15.008367370384818,-18.99634252792416,-12.796901061008262,-13.89888538377632,-19.8619407070521,-15.997061190665589,-18.50477286562043,-10.551086750708645,-13.538766412175738,-11.793579284308674,-10.232698692762604,-10.658449740789033,-10.539062138660622,-17.759957389939967,-18.982243974783643,-19.959638289584472,-16.488174022924717,-11.493158414012177,-10.303722467212124,-19.253159829697857,-12.873748856172032,-16.570258850054824,-14.26251161463695,-11.940848865438515,-14.657353130332558,-10.686838033392894,-10.602291121515456,-18.38459993226717,-14.896504508285169,-10.081815955820426,-14.042795309401333,-12.406502519140625,-18.94237092442749,-16.8736183517063,-12.066871908130306,-19.507746144324326,-10.506007594782341,-14.65652326986432,-19.9136578462297,-14.882895319723723,-13.967078839890464,-19.97774102721988,-10.255780187845016,-16.62449960393877,-10.141443767847742,-10.882910887512887,-13.006059848616577,-13.748086584146929,-14.374060874358118,-15.59462179491328,-13.473088654075172,-11.96762351082456,-14.897804250671896,-14.743715815918673,-17.114187903736358,-16.18255228531369,-16.81271786901157,-17.674884993827614,-19.60324053509141,-19.81464096683668,-16.15624312770769,-19.650473313553615,-15.065979477144502,-17.208500389164904,-12.323185792624944,-12.796736741654362,-16.272931102160474,-18.294183126461046,-10.607444822759035,-15.27759690343619,-17.817705484532347,-19.636222619493864,-18.683980706581373,-14.879135635823953,-16.901282254108843,-17.047945852600925,-15.177655488551988,-12.58318999702383,-19.638094414790007,-11.969280360512254,-16.30867441232767,-16.950331529902222,-19.71683321631491,-10.806630492454417,-19.265859140861213,-14.548883660578225,-19.903548670751263,-16.69458390802206,-18.990731871409032,-16.792780495891012,-10.266098451808336,-10.25073578281633],"s":[3.0695408034374507,4.680174296520098,3.2956044937725038,0.26718600975909945,4.075322410056758,2.63694324403571,2.456125419996371,2.717360386211224,1.3808379319101427,2.25897320912694,1.9328520516563419,0.6534023407619527,3.0401633553059213,1.032985411483377,2.1370000179574165,3.8532039343622815,4.681842145548487,1.5082915656978635,2.7520625935831724,2.9334788342952245,2.368216032864999,0.09873074504527457,0.10825817451943442,0.5047836927153804,3.837599952675684,0.9936392575805297,1.3187955454500833,1.6043700355274682,4.076084210836543,1.391340511989787,0.6032559584391906,0.03415280955066713,3.872296996828047,4.1497924113562,1.9764067240862104,3.609277931142818,4.581493848063987,3.7911852000287016,4.4419161381756425,3.4982067333901146,3.7554474069312827,3.6588796886886286,2.268377088256414,3.8603316921880926,3.5425624371438893,3.648728243403002,2.9951888294363025,0.024489664485324303,2.122585198635243,3.8558075978795294,4.862711124988265,0.07205987041321915,0.47112978325517196,2.2666530945409846,0.39600871950563943,0.9193762882075951,4.805613252021988,0.8309191293897977,4.556535812583746,2.1358323759086706,3.8516614706343066,1.0910824751147197,1.6879606682104542,0.7717441381382273,2.5315018126935076,1.59032857410365,3.61248429422373,4.465037138581599,0.7197542814047186,4.591563875646215,0.6803995735814472,4.45159369309787,4.564793797987948,3.746939558919834,0.9793032384861644,3.4350785500876535,0.8204795361802919,1.4806698653925399,2.0683707218532197,0.362604918714744,3.593112772899457,4.5476147436648695,2.4190362751587413,2.1274737961060106,0.33925155239136306,0.2924372881441717,3.805505085488854,2.6552291460717248,1.1273191014693351,3.2551927585184703,1.832802104210669,0.4856467546927834,4.692773904734335,0.5014653090191712,1.9078006085213317,0.21870584962729978,2.7881375798243413,0.3279742340503644,1.3835298121018702,3.4875848625892103,3.735105255494877,2.8539778504376323,2.5836876593023406,0.8718698926578028,0.8781217727593793,2.88672221570905,0.45174284470889337,4.531711864421984,4.268783400671435,2.315184448895966,3.4581931758866435,3.3936494538375817,4.118690822616696,1.9317282062719432,2.5156084496732865,0.49024615470384614,4.606773258235157,0.8112940320713136,3.808424995912495,2.934209807041915,0.09332093959362298,3.838013991078774,0.7987777648474226,3.7639750721091603,3.247398989457937,2.396728311712306,0.6922587841812522,3.89289608104412,0.6072540841006657,0.6152946555024907,4.228175000694211,2.227179468544546,4.101510260368887,1.2845366305161698,2.472223204222387,2.5138151142463574,0.7019670340434814,4.56460318838385,0.14029927728892666,2.8680792036837244,4.137138965157556,3.6996932982720656,0.03453470638941969,3.4642749842096707,0.7862592078743402,4.83014996248079,0.733015032823009,3.5026976194018244,2.4602971088281036,2.430836643398032,1.2643892603262419,3.7651392243019055,2.411690150466889,4.835157445488423,2.2905693640467217,1.5666537111038703,1.6861249190635264,3.349252558122381,1.344959744640254,2.876016168349258,2.961516790357779,3.204223525261912,3.9718586647544782,4.533462607900681,2.299057531867649,2.9967978800946726,4.7424101296981735,0.6077432207556055,3.964380899640434,2.662273540857647,2.0393319815936026,4.021681484467525,4.935190840592435,3.48067471227268,3.357855325513046,0.6651210839164867,3.8103357007133685,4.126881247718988,4.562256564948609,3.46688579028553,0.19333522143978876,0.900669346289017,4.825925018857601,1.0125028984859552,2.2327348424444846,4.669266788266589,4.492990004844924,0.4438261896496576,2.459937452533134,2.8583598733281743,1.0257842614754453,3.372377741074498,3.0792036665931444,1.0110828967704133,4.469337756199732,3.9380034016318644,4.470378080829432,4.097622046233072,4.291075919693579,4.324699174023086,4.751443478072587,1.1266766690578545,1.6958913654059027,0.5724539848049315,2.675952205802845,0.7610776027192401,2.422703905194706,2.848308446983122,0.8521935073901543,4.686108449905579,0.8180892864611777,3.7133154285487526,4.361294900542965,4.318304678724908,4.1714618900066895,4.628369543021313,1.8068953985981273,1.0423110997224516,0.06119522689061574,4.8813096793602595,1.6028130686575037,3.599423558650229,0.4381817960634604,4.931246163535182,1.4452455146288568,4.939219339911531,3.1819475681603304,4.0830260436014685,0.18247937160102645,3.1780130998408476,3.7977364172008334,2.020569072924119,3.7744577889781805,2.8359756315972016,1.7991391462813655,2.728372512775157,4.414458814649373,0.22219845171154495,3.2590622098150277,2.619823120483007,1.0161230078648553,2.3886723033265067,2.091254256811524,2.0061460457478217,0.8145114964267286,2.817397508105489,2.6405653497472894,2.2697477619842643,2.1263132982453836,1.6464255251798499,0.8147783209013015,1.0127705423191957,4.226952072000736,2.7893176853109836,4.8036000609871445,0.864755475225889,4.03178870161061,2.436343423790257,1.623673054768291,3.7504237595207535,3.930273834634451,4.22163413319484,3.5269180472191985,0.8654499147917916,3.456311438654928,3.4144974090704605,3.1960052117619453,3.854797619612833,1.8885601045988476,3.5870398087186572,2.061179784743431,1.6699862327090598,1.7560730993461249,2.1833866493462195,2.549215332167786,0.6570635323023932,1.2186085115276701,4.994436577328986,1.8100230940684958,4.120431017252653,3.8257911551866264,3.36468378998605,2.1571402027843045,2.058894385019947,0.4814079066918975,2.8597956033046024,4.838310125428688,0.12923635042860537,4.591169699987687,0.11506252266238692,1.6833428540740203,0.1787583019105432,4.911333507726408,3.1156874678315005,1.6445025405767688,2.332223151227768,3.3680005420008174,1.2202138895393366,0.8277199338857899,1.004870966560395,2.1745770678660525,1.8542871496795688,0.3599885448323703,2.026065463817649,0.6692739676202797,1.8155831432647762,0.45030843319546876,1.1797612984528172,0.06677149253765502,0.44386515447777497,2.331659860538171,2.7210301043503593,1.0788379715303442,1.384455853962775,1.5317188528087322,4.671836947927065,2.3881217603342506,2.394692770291711,2.305316459554061,4.408164363892034,4.4041002290411875,0.7316806528278763,0.21284655941370745,3.335977703534969,1.0852528773005676,2.9606294062705873,3.6486445785006594,0.07931530816821852,4.835118233817867,1.9552847010272956,0.400234502416571,2.0596594939157997,2.6364301471557408,1.6438636851843946,4.598954024368517,3.613086989388222,2.817119604572631,3.401415901359781,1.1594735763179043,0.6437859970967619,2.970500403644385,2.258848960259765,4.435191443174917,2.8311574116764247,1.199310537813103,1.543561671669278,0.4315564582061182,0.5718614106544317,1.6634933451646716,1.9569622402467801,1.5458070228558773,1.5855853082305837,0.21094085823113784,1.3523072398534575,2.8331434130332624,3.7533745569980246,2.2865705165984096,3.623021611029081,3.211403437239139,3.560286221188962,1.5740672453020876,3.9659827236015865,3.1315725854241903,4.400370521326855,3.9779279006061055,1.7391838745218757,2.16021961374694,4.915303218620229,0.5194371079965554,3.19306609126469,4.626175565570195,3.3302417832368536,4.588111091441651,2.678396249633652,0.36528795203785047,0.8896233566110145,4.400985156086409,2.385546291935193,3.1866045851575118,1.7698493197608511,1.3358293084088102,0.8455999852670648,3.1513655094106485,2.0906541345284166,2.2816797313377135,1.6026953094686125,2.543779359996093,1.2907401982925115,0.47312433388855824,0.025962669272726613,0.9194619600861731,2.7754113408924495,2.7103854145608866,0.24960819974564674,3.709431363675076,3.3907751431792876,3.594541535558217,0.5075946209975635,3.128743454373609,2.0895690542969425,3.230005826965959,2.0595673112173407,0.3524090194988616,2.541062726188359,1.5901924792758382,1.8079054454685461,0.5462040908306842,1.2935298439750476,3.014606185890135,4.788591942509225,3.3108245306485893,1.339087793754633,0.1729254443927486,1.3052846544616004,0.8169853725757792,2.403601261003747,1.7243488357776848,2.3993289420170463,2.9408555850089635,3.9789386001630076,1.8778247054089392,3.789988059462738,1.6098855353723862,0.6578216316721175,4.6108842001493215,4.163498737132114,1.0354651597124376,0.5551555875277392,4.277187881180935,4.45216952127997,4.378272698375589,3.275862871775279,1.2575180423911037,1.0819521997043469,0.8554441046532424,4.438559450539991,2.5264492715052023,4.081824849177203,3.38947825073461,2.9718927127580996,3.4750349449312568,3.5212888973199274,1.9667800908295108,2.083657815178653,4.447723162472707,1.2017305161579006,3.779386033886072,1.9942778574418396,1.2614686143764908,1.0773162929041635,0.49669417643630753,4.552478337157674,1.2089825544134636,0.744241295501793,3.3788435733597924,3.1106117721726867,1.6678911476848368,1.828382748628673,0.33449249572394035,2.81239541250459,0.24287242476134563,3.834656700625756,4.012679951606981,3.3438789078242537,4.630049084969022,3.9348637814354213,3.3753604941379334,3.8960409600014465,2.5361253385997653,4.997463552103217,2.83556678382285,0.7674885260491104,4.834287394905293,4.471821290856541,3.60283618024544,0.5671288907432048,3.566974795637355,4.931108516334519,1.515748436771056,0.23444406211755142,0.7140761040924959,3.8986823573230334,2.336387467199932,3.184585088453372,0.6955925054795287,1.805141373245357,4.742819335596748,0.7203738220535805,0.5345281935535251,2.9435072182844957,2.992513585980945,4.671070863630842,2.2383018469944505,4.172165344454076,1.556889012499184,3.233198117626915,1.6251854481213701,3.454182080913726,3.9087003459306024,0.5233684051177856,3.772190399181298,1.0179681889906955,0.2809983884681122,0.05894672610809781,2.0166542312279834,2.252311719375999,4.836997681056604,3.944431181388591,0.6819479638809445,1.495828527977091,3.834260293764753,2.52469444871682,4.88955677408792,3.8936276567266512,3.654268371017676,3.3847133159853273,2.261311893326136,2.383153430965985,2.230097499626206,2.4123331853966024,2.962216452954199,4.710651289475106,2.582012292415893,3.6708778455924005,1.9798009344439482,3.9334178991346,0.05755509837179984,0.1881158310470421,0.1340465511272848,3.687547509036632,1.2127394097913746,3.535369273528234,4.185112215301203,0.8965575510349078,3.839793225622609,1.1369722902821489,4.03135873320219,1.7661467075965953,1.0297907674370954,1.2406705272342111,0.4590427641170214,2.097881188122974,1.617117093880428,1.7065359464967678,4.0153148813809425,3.1181204941958187,3.492232292676306,0.8422215565322377,1.1086100895668227,4.398476870862918,4.682880459116565,2.247760072946056,2.949312681970402,2.7729070494862884,2.2937223517643215,1.3681567133308126,3.8743134976754723,2.2726414999662223,3.065499357933196,1.1705955142907876,3.9332162477695,3.736999848816894,2.7023065125759937,2.135600211340618,4.009727124992452,3.3348317199376964,4.559004460321189,3.947418423886593,1.9465405761871524,0.3814701573370538,2.118394716434943,0.2303124391237532,2.463984002317774,4.125428609822702,1.2438398821244467,4.76209305855982,3.813021056420376,2.43201831946934,4.94028698330651,3.6285314307538172,4.566210414371527,1.8543538504695878,4.517222810873855,0.5168856470109451,1.5258842473191525,1.6625948303560012,3.2732683845654265,3.354556738241036,1.7642486635076948,1.8723792302773923,4.888190399608929,0.6406933478059851,0.18669520837760412,3.426418179231022,4.645815203875206,4.233873700965807,1.3504578975076986,4.106669595680317,3.187306728388548,1.3270583487819387,0.3276535558365534,2.5026306113349372,2.202710217412236,0.8868525047126885,1.2072385117990114,0.18456563929631686,1.818625680947732,0.09233820299381579,1.7296430512065464,1.4144095939419854,2.347232360012722,2.880249721263566,0.9533324929938292,4.692609869167187,3.8754781565754346,3.159225065724259,2.8586708592978716,0.07081089490748038,0.5590582896825413,2.1334288023545387,4.047472836240601,2.6218355744413335,3.178418685325161,3.959448277316823,3.271728218937758,1.919827812572581,4.048669873203261,2.2088129116841895,2.0944333935288917,2.8064931419413552,1.0119282554533726,0.4007973284553945,4.192756959406373,4.828889512021492,0.29404310554527857,3.3314365315689654,1.1617427006088166,4.234927836629241,4.656837017609437,4.8014084533981825,3.264738882027425,2.0159832679604195,4.695343903428203,2.3443219851692754,3.496262186549557,4.554047688447421,3.615217965388655,3.533439768406572,2.236401356591066,3.302118775254881,1.3121306079683837,0.9404104237917732,2.4359376349772366,2.865169388229545,0.8964262573715831,4.7105670374691435,4.239305802041655,0.34961004036694665,4.336296806810003,4.151778977061577,4.1717868274399095,1.7464205024641188,2.938550758833939,2.697365331153301,0.4572066670441344,4.673165293858026,0.7327626229916107,0.4077106245896811,3.4846602285089654,3.3389030967219036,1.0942763636035935,4.3015546172734656,1.5046118127277086,4.992793271479982,2.822702160762156,0.3300460428384844,3.0804003035142316,1.7568470538430792,4.326145965381995,3.336614843639402,3.8455104862386813,0.7165196162033682,2.3681965887676917,2.7650958997956163,0.5794938000712657,2.7272812956850254,3.7091290892651765,0.5367177008113189,1.0800209175687592,1.008212726538671,2.6885399063067252,3.7791529004792155,4.81667667127377,0.7287718068713467,0.5882946652243293,2.0362967612477134,3.7475198060837025,3.179334171830118,2.7928027775127884,2.6544979695680526,2.536852255974927,1.827538782104846,0.27905682092671524,1.6274361708929586,2.6053883252932177,3.007586299888698,2.598671646677966,1.9569283827744877,0.97244011126007,1.9618957097825307,4.892174617943957,3.264457311322899,0.40087359915221277,4.542082239833175,2.410108663402072,1.0702444198728966,4.327403262533055,2.870056589305927,0.07751905080281785,0.18244323024764197,0.11263962828239937,4.594011891125607,0.6170894143561734,3.9778786411757916,2.8111545347387423,0.3660810109469137,2.6226545876193716,3.713948119862321,0.42614233753100583,4.26145473563563,2.327056929974339,2.4000563744033965,4.500594716995413,4.469327854201049,4.47563385964573,1.3906218967994866,2.871780044422565,0.73126985760397,1.3742092188877664,4.666309983810156,0.342987441423086,1.4603901032437805,1.5679568165651847,2.2029202728057395,0.8577357796380347,1.6184509217066745,2.8591837098695727,2.6725132900426174,0.45941954038348776,4.086953689601625,3.290252958021177,3.1979628492223746,1.048084577472903,3.8594416968506042,3.2262619756809565,1.3192891109135474,2.479969163205044,1.214579702248435,4.438739157131896,4.30365072876962,1.2398094063235765,4.726740606371505,3.1595530409923134,3.1160775121922137,2.0967671180869143,2.9974063781809224,2.8649317954005604,0.1581910431914757,2.1518385934878537,1.927854652938511,0.3656815178709105,4.088612482445978,3.2211932454405834,0.4162241727115856,2.729816815568906,1.9829296643669403,3.782535983275599,1.1898980952993732,4.0474340120999495,2.620696491539649,3.386940034230197,4.368621318060507,2.2428108143803307,3.8656104336980324,2.2283438251849352,2.9906237462192067,2.379386405476759,1.9980954408946805,1.114578908394065,4.0431933708219265,3.9001445936126156,0.585098875541048,2.4650737175678925,1.1574577542668485,2.058856297480167,0.3790456427178235,1.0964949642127109,4.526152978174299,2.062211036981859,3.877248468186354,4.504758433514788,1.390019828898924,0.4393692364547952,1.6565611006030412,0.6538116701321584,2.220380080291312,4.09925042244062,0.40526059066557374,2.716863290223086,2.300677430458867,2.235339819856504,4.287780259884392,4.885387787184333,1.7422687259535352,4.335833220154443,4.391208862013053,2.914909925840269,0.3503634085155094,2.3694161242183687,4.864058376981692,4.419014868064245,0.9284944442986798,0.9796951626295691,4.46109144863911,2.7868066626580323,3.0263003119714584,1.637855442195667,0.20845232155958016,2.437513405555254,1.6284359352710054,2.7782435513219585,0.9345781460166258,4.194227106165155,1.241029186620688,1.9080433272396724,0.09288732506415598,1.512856893499237,0.1043282857218164,0.3627171536608409,3.3460961119889285,0.5673765639107076,2.159695190102029,1.2533276631289658,4.536523573996641,1.045954572701484,0.7634784903356984,0.0671413767241813,1.5023736525237263,3.658356013235297,0.7935136154918498,2.7382435284661333,1.7175680843217411,4.842464599113505,0.35273552896285865,1.5133577080882243,4.091078181788916,0.816903124301882,3.528524658328951,0.07153144975693526,2.994915618627231,0.4605612056691244,0.0861977663976643,2.367867668888123,3.6124168572661643,1.1365883300233526,1.901611776518618,1.2599476119354225,3.2455386502166417,4.453421748717067,3.8553335973739546,3.0586226934330565,2.0208474951854747,0.3664156313719835,3.851166610483092,0.04767717110299996,4.89676678985313,0.8581794380124153,2.6924089860053635,1.6429628936046325,4.296772738364181,2.937563354473739,1.2315930705603217,3.1273558530302403,3.3286576101386736,3.1363608200203785,0.0006397951734349316,0.9177421078583825,3.1495542977512967,3.7895933651565414,0.7520539181052099,4.547908713323933,1.0649201686628895,1.3091348640731926,3.10087336284419,0.5351683338828328,4.596330402365606,3.2074117099187482,1.1701240100910293,2.957888548880001,1.5272789259343045,3.3742069273459476,0.7135539700681037,4.249426979400491,2.8331441767317314,4.447328703255885,1.373206178019063,3.207359344234093,3.0092006299933405,4.071233292151186,2.4918318820788943,4.5929556484725875,3.8616469413598775,2.476232546620606,0.2789224228502418,2.520177284772104,2.788893648859556,3.6975067840225218,0.020475496678490357,3.55049051689352,3.959602403312835,3.9453674454959597,0.48362812521805076,0.8022711597819887,0.23751296119634224,3.4206167372350227,3.2800930522122007,4.279742311648703,2.5980044815781236,2.369776815300755,2.041489067942228,0.06871794222072736,1.4423623279021103,1.5160739961112402,3.6979698550442777,4.516152851478674,2.547234342896724,0.005242557569645756,3.943112039346163,0.9067273093021322,0.23091704846217698,2.1153915572907387,2.7726513794437024,0.3603428896215044,0.42436286026935166,4.496859507008536,3.7899873066046794,3.8149207168708053,0.14854002824995716,1.3700299298336183,4.032110830143837,2.0457262588408645,4.781953366375763,0.6706119642390984,0.193624868527571,0.8619848333759728,2.295748921347026,2.8294758478439572,3.3590724887787715,4.029659864142998,0.20417045571185732,1.6338587448320518,2.4369780111842654,1.0417331624156145,3.9707596305841197,2.1820082862754853,2.923316893932623,2.0087753556322783,1.0647400683583852,2.5858867641355476,0.3777129273019253,4.207135247851278,1.412538835907916,4.60244885207833,4.824748439301352,3.750759124869383,2.4169883855709537,1.3148527859656123,2.8651982557825075,0.05725928496235211,1.6568595101382744,4.584932421739378,1.192329608512045,0.047388636884660995,2.4878840654773002,3.004306537366772,4.324834219451912,0.42703007502062795,2.39840171115571,4.691097497129931,1.6307970786513215,1.4038015421110794,0.4924340508114178,1.1450718496919254,0.8159535883175639,4.653776287318935,0.7662947667847653,0.9345171195174073,0.5288428738362261,1.6551708070117466,4.425560182730846],"mu":[-2.499779625027807,-5.900958452035474,-2.6163211439479195,-4.1025569811445255,-8.450251742979216,-7.096919420740157,-5.76789008499679,-3.9296546055557346,-5.8307290707386645,-9.38318771987941,-8.629503522367642,-4.510189449243816,-9.280383792473941,-0.14362005776370257,-5.592862999557351,-1.1951485871548417,-5.184060431975839,-7.646401702917165,-6.493814081153464,-2.7286027421877135,-4.115156995870439,-6.047654210205771,-6.042781974817213,-1.656439092204196,-9.677644076417149,-0.7155980056427103,-6.700028692624505,-7.889661798790215,-0.38724487549351094,-4.063616520639424,-6.397341334984629,-1.9693724954974279,-4.440635371203896,-8.185875320911606,-0.12400800001494794,-2.683869507062333,-2.446026129283667,-1.2154034686777315,-5.451623288518855,-2.557013415550229,-3.1261778341727275,-8.595722638259636,-8.571990812866009,-5.660104702314102,-7.461885461408915,-2.802403014129471,-0.44796392597800105,-5.311114797314138,-9.943155544294932,-3.9141873181143616,-0.28957551184431995,-6.430605109271685,-5.705343565921542,-2.8472606897074537,-4.142354534421175,-5.158233044246705,-5.162586846759343,-5.771609649638442,-2.9256774139979824,-2.930663421601596,-0.4593878691372,-2.668190496931644,-1.9278802656847782,-1.6937280398504218,-8.255733193885233,-5.175500737164445,-5.534048157901363,-2.9012439213546393,-2.8569772627864753,-5.155352657864805,-5.417414659689051,-1.5753756721998102,-5.745689330622243,-2.2329817348748593,-7.9778247804915114,-5.371625088526026,-4.0825165438636475,-5.776912183726393,-0.6245971724563248,-8.63510975569583,-3.8380731204604612,-0.8913513675208651,-8.905436906997917,-4.706471562097363,-0.838007735264148,-5.5468767524250895,-9.423261139683861,-3.4927418078085726,-5.61323188619383,-2.51625765053876,-3.712703591793871,-2.9465921747750157,-7.250357740434326,-0.054314041172391914,-5.405989212485913,-5.796336517208531,-7.887038092868581,-5.560090409397496,-8.918846329860324,-7.221052118690265,-4.679474423693161,-3.0609730051004536,-9.049684242605506,-4.011176386588717,-9.988843286928567,-2.1791721063367464,-0.5102984153562207,-2.4544436580792617,-1.0236923870932357,-8.464192596454623,-3.420244771964698,-3.00939055858215,-7.81940108453899,-1.6154506870021024,-7.076723358113409,-6.632487815911336,-5.923216799160249,-3.389801392156091,-3.70462156241119,-7.036586561182783,-8.381231322727396,-2.032853868727189,-9.586700452536876,-8.376555884232248,-1.1844909115656344,-6.430202957021518,-8.057989261925517,-0.8480394265317481,-9.302903600974746,-8.525995568321425,-9.358796598600392,-5.015911763218308,-3.9411509538128287,-7.230715295370511,-6.633906581658686,-5.259107142924426,-2.6004439370798416,-5.916476494899914,-6.334685687142738,-0.012571231502844782,-5.834361453609951,-1.3789968089993931,-8.033632777639689,-3.8894854758595865,-0.5906809402061586,-1.5888112684121047,-7.384659279233197,-1.9004274528705545,-0.917221261325154,-0.7875241830006585,-1.1202918342678236,-1.8378999315931854,-3.9675382556772676,-6.35329579612862,-4.680120694445429,-4.35417253955825,-1.7986504654071855,-8.852366238121391,-5.3108373579972135,-8.6097436869854,-9.805285406207108,-6.966192653574559,-0.3524863611185136,-0.9606406850494831,-3.7894299079328886,-3.286102043218251,-8.311548510938962,-0.298412609647829,-7.08440628818736,-2.0434060856462133,-6.0012814992147945,-8.244503272316642,-7.005524707439752,-0.4388595111658966,-8.556176300486467,-7.482347967257946,-4.270134523258868,-1.387014525340553,-2.0845392947384522,-8.297633478505869,-5.6188384749415725,-4.577333552752214,-2.206135310884807,-2.248650677068651,-6.185814675845309,-2.950375533110998,-1.9714425190693108,-2.7501443472904508,-2.8400138992226753,-8.520186903122067,-5.220362843790378,-1.6010939803355928,-7.56047805278935,-3.906983177002188,-9.112401458193373,-0.03168327537882876,-6.039208662798369,-8.024991734581263,-6.782148140648749,-9.242375063527799,-7.6548998783351285,-6.713025376035818,-6.3935715677778475,-8.7390692662375,-3.7877105276544243,-1.9577069399737157,-8.374286019874342,-7.673928186914585,-9.02372530976619,-1.897919231323788,-7.110841818781227,-4.713011922686592,-2.355438343266798,-2.9971198514032227,-1.712499934382734,-7.877250974833727,-1.2010693001203787,-5.257871256280968,-0.38366105332539036,-1.9392450072735157,-9.72381385445994,-7.727321979353894,-2.304928059458653,-1.0624145785390549,-4.497312572041176,-6.146571272671957,-8.351266035041053,-8.879769287376005,-1.2637879313872813,-5.547649296452109,-2.0090919128954243,-2.5094791380113146,-4.331408037633899,-8.753947588110584,-2.2287635323945088,-3.8463840925636616,-5.259549225790414,-7.814381732500683,-9.423589714429475,-8.994592752554462,-5.225586697010707,-9.762056674033293,-8.024364867011155,-4.607468395755512,-2.693927324292107,-1.104106878764921,-7.2583316263662905,-7.5564377824463635,-5.6075048612442036,-5.213278214003436,-7.158263386798409,-2.7793094514251337,-9.541663995984964,-1.7838367359850982,-2.630180310895325,-8.543458210115027,-9.775228530584986,-1.5560524551560806,-5.479124611097015,-5.668658988127211,-3.660029491171899,-4.425525666696184,-3.919439795684969,-7.0412432159216,-3.1740234475005624,-4.534947444603771,-9.183098040393245,-8.673015281832427,-9.315474238540435,-3.5572849330898326,-2.826937986342637,-2.906684801308741,-4.2047866554040425,-6.234130919233369,-7.881432360048393,-3.9894399897407817,-1.604812868516936,-9.33443657452832,-6.524250468654964,-2.0496004598145334,-9.71524934296111,-9.827232142006025,-1.632111586285876,-3.57622289318122,-9.944638078806637,-9.38985982249269,-9.340096167118153,-1.3342941020302201,-7.428679176992508,-9.939765690850589,-6.188827365171923,-5.633795795994365,-9.819058974564875,-8.32630661664545,-2.3658421666511775,-6.484476953044416,-0.8641954606557012,-8.516314506778247,-8.950520633410022,-6.419239073345723,-5.964295687305516,-9.61829574472877,-0.5823467822459749,-5.784448911978957,-3.5057550412965166,-9.466225244863033,-2.7134442648977752,-0.6109764812895824,-0.6495230965301424,-3.928326480625015,-4.488351289765005,-4.92512623612946,-3.5789444695113715,-3.463466839237288,-0.10996767666499929,-9.23132779179625,-7.508635107138836,-8.266963314215865,-9.32618814440755,-9.737822333605129,-6.371915513075841,-8.945739695974739,-5.382834447776597,-7.573266787158303,-7.337348729238586,-1.2048007554538764,-7.1724068750758185,-8.722544267237243,-5.191212181011227,-0.9630500368244554,-8.170859513279769,-1.663478232233473,-0.5502001854045502,-2.2289576577872316,-7.52426494160741,-5.101706145630942,-7.377466577011775,-5.670660160795662,-7.531258774873497,-5.701145011403166,-8.078514682514786,-2.460542695495964,-6.076756785011954,-7.7660132501566554,-7.858064816230142,-4.223390624521088,-6.173269932499403,-4.633161230592164,-4.577060916710069,-1.104384047723257,-3.4853008074680414,-9.153503263985526,-5.3447062665262735,-8.536606890829873,-1.2297424264065882,-3.2909166880181506,-7.691302669936652,-0.9360142586297693,-2.235836590595328,-9.529729952980777,-4.195955002551699,-3.7292890473535922,-4.040272078476033,-5.062879356809247,-8.661830864513252,-2.906179297956284,-4.333507909010632,-2.722807885913352,-4.568804404548681,-5.521801004961815,-1.6793516039442657,-8.817514523380293,-6.96446721791069,-5.319330539029325,-0.18356591513890574,-7.728140134906929,-8.012114346997576,-5.629902712643677,-6.885400129526342,-7.789692734732578,-1.0018916226809704,-7.169027490946269,-8.122591430600572,-7.04846967588818,-4.079118067201552,-7.6725961108964995,-4.848666533844801,-1.5726215047000291,-3.442865454512558,-1.2604911546313158,-6.43034055683573,-9.918760899106811,-1.318852425129382,-2.844724266147003,-8.11621412023147,-4.956976441077128,-9.73960967291003,-8.095169809777882,-0.5049344702282621,-7.4831675798966035,-0.7548167742362732,-8.195684815310738,-6.904691792068922,-8.154070099853579,-1.9332636886304955,-0.5590666684476453,-4.675824084727727,-0.15114112918856115,-4.278873535391787,-3.9636214123933855,-5.400321494658254,-0.5636842922377316,-1.2431491495057867,-6.885084115213138,-1.3452279746774454,-9.574996088292306,-4.678404989219178,-5.148690239328797,-3.4289226153539043,-1.8523851498138844,-1.4724863208076888,-1.7684525469467682,-9.259955086279263,-6.682910267957565,-7.743971727420931,-4.294418382045249,-4.327820369279609,-4.418847092025267,-4.673341740769317,-4.262480554059305,-1.9629873866345204,-9.051290326087145,-7.525476676707095,-1.8676372417315878,-6.41180373578371,-3.05028383702024,-8.949686454254643,-1.3198074909377366,-5.6799968667430045,-1.321254851545648,-9.600508066723377,-6.02049335137351,-8.23661728213584,-9.646655946876345,-8.293123587473836,-5.52350815143093,-7.391698702416825,-7.304140043713884,-8.47972907809607,-7.679309191214818,-0.7262700695090052,-5.410601173972022,-8.714217646356515,-5.015628748049494,-1.8479705729983897,-0.36037636166667,-1.6161092170770597,-4.829187288823162,-0.7004902648634426,-3.230381082041005,-3.3510866775781123,-5.474700061822848,-2.2046499708090606,-5.825932024207157,-8.640995214190902,-3.5115005119681197,-4.446398635380133,-5.722125031399852,-0.23026315566132993,-7.358689503138898,-2.0663463871807264,-1.9520976955312674,-7.396939196799939,-5.590231314710632,-9.593280149748207,-4.839668485983948,-4.99471443920005,-9.515245308637743,-6.007601396774929,-5.069713198390238,-8.731551236569405,-4.474394744360293,-1.1038311074951301,-9.510501688015472,-5.3652629688662845,-2.487581732655204,-4.381750986930848,-5.7552932056384964,-9.256498859849373,-1.711765065560198,-4.504503262960742,-3.4938971449868683,-9.65270836110311,-5.738780331094762,-3.379857007919167,-9.544229084574013,-1.3486502674802425,-3.4549083465490926,-4.567818000240218,-0.5846903192541131,-6.889677280734805,-9.8279108273133,-4.596681754711154,-1.613145887511469,-6.0187947376584505,-5.44582632851556,-7.879690418309382,-0.15673716738444865,-5.144017032494819,-1.938548781109628,-0.4635371176390035,-6.343455936058362,-7.709621305333442,-5.324246726596074,-3.003388215575058,-9.70079389809312,-3.101920915258851,-0.11230063076432595,-7.372360179356008,-9.318004032643927,-4.762591662653097,-5.409947140399787,-8.615213117522337,-4.611030411234918,-9.222255040438519,-3.8407296276778435,-7.758259613801903,-3.5762537969439734,-7.01244813728853,-2.529774888624825,-8.35262841045897,-6.627400414419875,-2.889252054207896,-3.9693461641962324,-0.1729321904639325,-0.5418766457337165,-4.578928248074792,-6.2096374871780995,-0.6804504744030471,-3.950722786224161,-3.320179632101248,-8.91473368150371,-9.019848248610156,-8.4481683722597,-3.3120191519494946,-0.9557752574348188,-5.696124842226451,-8.058616816195558,-9.956745784574517,-9.472172740904771,-4.730060133067435,-1.0163997082225285,-1.603275445610639,-0.8228268001387895,-4.9006917036983815,-5.719208295047609,-5.6626791355951855,-8.572466370258184,-3.6253593853496224,-1.2835292580855295,-7.673544238534817,-5.390507680152035,-3.7061311130488184,-0.23455338674819082,-4.983802224559062,-8.952979938085955,-7.264907978867612,-2.5662531717005943,-4.832173219529574,-2.8469174857892154,-3.9750321707010805,-2.5802857870060047,-4.732310900570658,-5.3885099777601635,-2.7739447812697327,-8.647860240199137,-8.718927326600292,-4.3615374979550765,-3.837392345458799,-4.962943223935468,-0.05731057199012124,-5.386854427694083,-2.114277577001784,-7.720830032298,-7.111977196562844,-0.9016084785654566,-9.353449761280281,-1.326110960580733,-1.4304358581662124,-2.456954616886229,-5.668620337585062,-6.688274585800363,-2.3809135646588264,-1.0385250857089523,-0.690102373323489,-3.3334334768914453,-4.837005367196685,-4.2600219308335285,-4.989295773757016,-6.055750544273182,-4.446006595817124,-6.726384820964039,-7.972849800696751,-1.837409895433002,-8.387611987560495,-6.182688121880715,-0.16785396480267778,-2.874786907476554,-6.3661998880586035,-1.1303316910163574,-0.3462754260899259,-2.8618983142253307,-1.973994621676196,-7.199067625401215,-1.492056864353053,-9.729619506366271,-5.140193768887076,-6.910560179055718,-6.419056583516618,-3.7682619903358594,-2.208490161643777,-8.553751618991072,-7.71089769718492,-0.7909361126783288,-3.2977992982198545,-9.147862244637688,-2.2257200200697813,-4.590549400572701,-5.557364576485848,-9.520163270420962,-4.417896594165462,-1.9995711013521245,-3.903129726864194,-9.647302778135117,-4.490969272942429,-8.94770270023244,-6.577158866581094,-5.913709536102518,-2.542988486682305,-8.321123442394951,-6.913023263799715,-7.66594218574056,-1.3934208124607306,-8.956619839573982,-8.18194492222629,-2.807738428740092,-8.05876020336133,-3.2060718002066646,-3.772236096459991,-2.8189772867049245,-5.618664185144229,-6.856149044491664,-5.77008020118865,-1.5797096413347722,-9.874070401985884,-4.490330289773425,-6.384659421763324,-6.361203586571616,-9.132314711772695,-2.0005427004572707,-3.0796942224254287,-4.367997507136588,-3.181190786392172,-8.568623867090766,-7.494353751239354,-2.6034848900977203,-2.9224355936429536,-2.392954413522894,-0.20561232543290453,-9.812641166327847,-0.6072271575835653,-7.905427544551696,-0.49508819021616857,-4.850251148606855,-6.019283034535217,-5.3512731407034515,-1.9870711799756413,-0.5020000357482468,-6.092648828471178,-4.522904482477694,-9.389731097141937,-6.846935147575799,-9.613787224961062,-1.3550490173872087,-1.7047131912803826,-6.570106325798619,-5.411213909537649,-6.832494650101255,-7.977705970445587,-5.376218024379944,-8.563676310159414,-0.2797147004935008,-5.392414215894819,-4.580129910186912,-7.507843298060539,-7.088034917190136,-3.598970848062315,-7.112105809034237,-0.5271973877561043,-5.235503453521149,-9.039457558631788,-5.095082516889464,-0.10536257575875618,-8.065397258041237,-2.297218739334057,-0.5377804342664949,-4.20165484175631,-8.604547097143607,-8.66832351353272,-1.1561984188335717,-5.961668848958528,-8.968845152478572,-9.155629480139236,-3.8536678525553203,-0.20556055775694526,-5.471790517314517,-2.04440331129246,-9.041943405751752,-6.36107782200948,-6.861901499833511,-6.407883315071534,-1.585382550508383,-2.5658088193664574,-0.030662312970015648,-9.641540266917307,-6.5734029730784265,-6.50136639846095,-1.287259748795515,-4.098960740583262,-0.3032178742799818,-7.145048509893773,-4.056638147256148,-6.137536993156627,-8.928146043161675,-4.648380140344837,-6.598607960330631,-8.869539745694468,-5.342812937853337,-6.397379573905391,-8.278543704247996,-1.7720665587586426,-4.804280271243737,-7.536476806842048,-6.4763568223841155,-7.658369804790526,-7.145551651745299,-5.008962221464146,-9.911868927691614,-6.5203632688153075,-9.056676923519538,-3.929359774514787,-0.37692699278084607,-4.929913480637397,-3.3215958427173975,-7.272287472212026,-4.318437566704021,-1.6157433708812308,-4.119926909371127,-1.846599840069385,-3.7883994811276445,-1.284490046679454,-7.972841862224842,-4.48201563027447,-9.321611234422475,-1.1055341191774537,-6.840725253101412,-4.378349894073404,-3.580664840954977,-8.123695601516964,-2.959879195954067,-4.7057635243130065,-0.43645333626944893,-4.305045321623691,-7.269671700152394,-8.613076455953099,-1.0624644002282446,-6.670992828663229,-3.4959674904078564,-7.491761134927133,-0.7722617185197533,-3.491275720915956,-7.357654211581581,-6.248141143922337,-8.9440030310016,-7.240656813405277,-6.426895870061305,-3.5930369346722735,-9.031172354462978,-8.811404198997954,-2.984701613650509,-3.3005112605222853,-8.52178321412512,-5.878299381605503,-7.489950949273155,-9.301083617654625,-9.479778762585546,-2.210738516936579,-0.995609604181158,-8.90304464729055,-8.935595784555453,-6.6396382538805305,-2.286069193531708,-2.5164017579583042,-5.255781998542806,-1.9970081614708035,-0.24051741819107963,-6.253690715483269,-2.488710901382314,-7.192574084474018,-2.787519478460141,-3.5394489751808944,-9.46885560096284,-2.8299548351940484,-5.6427463635619635,-9.786542852062432,-3.73253441598292,-5.609087220879443,-4.047989404221923,-5.723898478535663,-9.337794792935556,-6.235851119626286,-3.7084275927610943,-0.18316085435766905,-3.687942467522607,-4.083122422160079,-9.37298277257752,-9.843418336339848,-9.313763603016582,-9.267881984325543,-4.357539170092652,-8.4237364434188,-0.7442665984787511,-3.245916432586009,-5.852493764187356,-0.18223482747213415,-7.152092040165239,-9.78583857690152,-4.399334058629685,-7.010625044553375,-7.432528808409056,-5.4716737448221675,-2.448887417931793,-2.918408334684488,-8.412653360233914,-2.1206506397456515,-8.24821041101506,-3.3693890460211495,-8.337814349944285,-3.5097809277306813,-7.818305147035726,-6.343770391157877,-2.872914006857521,-6.799118480283129,-7.69130059968097,-2.954773428576747,-0.5593734350693436,-7.303959239026481,-9.480588762812339,-7.472875781167767,-2.2528750564746325,-0.5658820056214409,-6.005998935010261,-1.274405536929113,-7.752763952714634,-9.595253574724389,-6.0938867755535675,-8.459959348749804,-1.3117345377522494,-0.27372659199304206,-4.662541711695556,-5.921246672461178,-9.141201042613918,-9.158924159419117,-5.00088315100834,-1.4583918886758251,-3.170223823072289,-2.4739913573789196,-8.353347291901564,-5.663636673611155,-9.25194440701371,-8.1046548599504,-5.238827994177926,-5.29294260728999,-3.2304816253662305,-4.854963571954336,-6.871197412192586,-8.427527798802695,-1.3465863403817702,-2.576323999516663,-0.5388382227842059,-1.744073131899606,-4.412914221694219,-4.928568200730428,-9.469034722670742,-7.226037259475351,-4.389986326335917,-6.87866150360771,-0.07147062015697703,-3.84267237078467,-0.5753473154158417,-6.260842660041672,-7.4133101057658095,-5.360958898674923,-6.139882265934444,-8.764921068737713,-9.088038134548178,-7.143473044642176,-2.4055687078765686,-7.333620467852462,-0.6314044265024643,-8.604170954494787,-4.150114750029259,-7.683941642504788,-8.778417223203597,-7.86933482652133,-9.953948743297227,-4.5426331031604095,-2.3776360385976036,-8.49712598439432,-6.790447932405684,-5.184685765117711,-0.08275832892182589,-8.884835989238397,-4.032801328529672,-9.728715870335993,-0.5095064771208446,-9.224901141775737,-9.123109431946643,-0.14514957625170188,-5.7979258981377635,-3.3611223688281067,-8.657829353804438,-0.5068084804458772,-7.611116524553825,-0.8501525746463257,-5.146127523593935,-8.45234626571111,-1.1779398753428505,-4.027948948313065,-5.577805427986247,-5.192414279695647,-8.896778437301299,-4.37980792439121,-0.9384804572044403,-8.28083121527851,-3.2519658677865015,-8.986239329185208,-5.339540184643261,-3.7666155037419835,-1.7512168821510787,-1.380543525905793,-7.135848876920992,-2.2705687162377464,-8.807567660119872,-7.137992597908173,-7.743387247653011,-8.767219155418735,-4.411141931132145,-1.5922933297547326,-0.38679394102064446,-2.4658021484018233,-6.677746716521076,-5.6182555886506265,-3.0859973647842764,-7.631396994571333,-7.842549604544007,-1.496306841408328,-7.129995783343435,-4.310502514170795,-8.94519406827532,-9.06376630892921,-2.0897364340461944,-0.11333148218893196,-6.464982240778219,-8.881000291720245,-7.357970552089494,-6.795453621868559,-8.787710417751299,-0.31325751260283585,-7.621665921441774,-8.44512261299364,-3.862620300840638,-1.4141420308868802,-9.787886133867023,-6.46435696845124,-0.5008615048785892,-3.0785619581460133,-7.525008833028021,-3.870939478551707,-0.5667507162949592,-7.195235464869891,-0.24425034019599723,-3.3987434402013372,-8.5569357910023,-6.162069518721216,-3.364315774261404,-6.142407219454224,-3.5577435871908336,-0.5508254083989139,-8.0552812103123]}

},{}],108:[function(require,module,exports){
module.exports={"expected":[-52.49573901901901,-10.66260636879548,-5.01856651889015,-9.503385201876872,-5.252828775081095,-67.9242477563811,-8.364165227504586,-7.128476448868234,-36.33235380103191,-13.951846907393646,-8.907918035901723,-4.185689531073649,-39.41604716584529,-7.272487394771316,-4.838179281695452,-7.558560607676966,-6.537840414049633,-10.461094529179876,-2.5829620939835327,-4.921252488939185,-71.62732394784224,-5.990705748318854,-8.617100324611938,-26.87399085526324,-10.782304916223804,-4.904728591719735,-5.881302289104633,-7.1099573220256325,-7.460561345256737,-4.869547654701192,-6.867914657225078,-10.252425526289366,-3.670324514513822,-37.67882756980183,-9.525693975551354,-4.571878791912637,-51.352323031244126,-8.505266583031409,-19.846102255835984,-11.859055275724867,-32.554814695933864,-6.471245280249007,-12.984287358437134,-6.128383408285352,-7.62408016962746,-27.02511511413636,-27.349449415453407,-4.856470225486367,-7.197751865350736,-8.601238879343367,-14.477761628187197,-6.217616455626139,-5.4983485872944655,-4.026602592260111,-19.852205372834728,-6.409804407131437,-8.123913214582448,-80.92514881629566,-6.083139084649543,-3.9152856888239334,-5.149839174904269,-5.014631808758013,-6.732091932833772,-23.15172511612768,-4.611379758899925,-4.597813469429032,-2.677454445435497,-3.9428246989615965,-4.320620899287569,-11.218035399022858,-39.18104469614067,-7.489563887545154,-347.3412280538319,-18.805845960274684,-25.76543273110024,-17.677383195230398,-6.767774240098113,-12.91895275204063,-68.57743398549346,-5.591065195871769,-7.256669703558301,-7.941323727965527,-188.37020197615638,-5.257214926554189,-12.989785957135679,-15.463470515301811,-3.5183614373704115,-7.657259792459077,-60.837137876309896,-4.358197326448725,-3.2091965331843015,-12.549949886431861,-2.5888179261661985,-7.680581167733972,-28.024537959052456,-114.9514485300648,-7.032612580186008,-7.74661420051809,-9.959734115156285,-9.958155509637038,-35.9442528370898,-3.351554288318899,-6.539763970895544,-4.155413780818524,-11.531723872118313,-25.891552657661986,-5.305481499668363,-5.837851910331926,-17.842093736052497,-4.581516644322169,-13.749818239300762,-5.339222607153646,-4.575916497828115,-4.439960173543394,-5.409008896970959,-4.191994021419934,-6.628806807508829,-19.615346489439034,-6.0814786997831645,-18.3796851801656,-4.409538571423563,-11.91327623681716,-26.309358867299526,-35.52193589793749,-6.8773678964080025,-14.809251896004957,-5.604853834660266,-5.766310280094368,-11.563387224369663,-82.92823836670381,-10.413257946930663,-4.9689980764084885,-3.9189604622651055,-8.361820635231002,-8.734728309293565,-10.24010228523038,-6.4421202215462525,-35.49067165364702,-4.8619730356156765,-4.392654532138857,-4.099811316231628,-10.317707533330147,-30.356119020793802,-6.634711476253264,-15.02594865941592,-3.7290413835360012,-8.21114545608955,-44.86301713431102,-7.671190246999091,-7.9532252844310545,-5.681838973329146,-5.952265450734855,-5.553214186964751,-6.575798238037639,-7.104746986199044,-5.938613646311756,-8.39704135754898,-19.357789397775395,-2.8815110597332967,-7.751929702811831,-5.636686077815792,-4.6470738176314,-7.454355006108483,-9.642001749716602,-11.384485619374583,-4.122330061921688,-3.875253638360144,-9.918997045094342,-20.659261030008473,-9.076163693148459,-14.226712356269138,-10.596688539968378,-8.887796107461366,-16.63941567374742,-9.621452595866756,-28.36571416919915,-3.116023606309886,-5.409214198082012,-6.065678327818716,-8.52738068931743,-46.49847091560414,-5.89618672856963,-4.611032685272183,-26.004316684458168,-17.155093393314,-9.529584019260863,-4.001560259950033,-21.929728396214816,-42.34288864847061,-9.642036066872526,-2.341872348813821,-26.028679891647904,-48.23712175112408,-45.88934076815951,-24.32535745259711,-167.97358914470576,-9.331542526727706,-3.976139299326566,-3.804496229266668,-56.25110507076552,-4.153195991788696,-3.0928266151309836,-7.6408845300373756,-4.260641280792996,-3.8295190730411033,-6.94477196786543,-13.62100849332974,-17.6006713836553,-218.34826175351068,-6.413598670331592,-26.84058630032423,-3.7527674338102286,-5.347163480241734,-5.704381935067653,-5.738490641082637,-9.618996616036616,-5.038456633830258,-4.640812049363198,-6.562637751931934,-5.430829864831343,-3.499516394843709,-4.919483209183886,-8.537144354542933,-5.600338560717898,-6.477107382745716,-3.9786716606472017,-3.327961782734542,-107.95547270649533,-6.509687368845074,-5.652643808917727,-5.606895203517048,-11.140566700423824,-5.216899144806744,-6.586255066901011,-14.606296330642472,-19.886024323650116,-12.982177156595151,-6.353401131952474,-5.114152377076114,-7.3505333577724405,-7.996319106720118,-807.81911845291,-5.549580041209207,-5.531171849349829,-5.094282030981567,-8.704454579229614,-132.9249768615056,-4.698816008291672,-92.3103790735443,-6.040627659878168,-10.547362829659592,-136.10297765654715,-30.678100844944428,-7.271800278482245,-6.950839585982961,-5.550138550578863,-3.3601466512122107,-11.44465937463419,-11.824870126217919,-6.369756791888975,-9.78885043980769,-24.181176391032025,-26.54099325047717,-11.499039866548761,-11.636696696534628,-3.9778576100504015,-11.903657658826589,-136.33245269894257,-3.9754837529642644,-12.635214482944802,-25.926241451195793,-3.53856303659831,-6.874926819098187,-24.80453627248113,-9.80435188074018,-9.315547776599693,-3.7263172222072023,-4.270454166763066,-4.213951525955219,-26.31328466563913,-10.138025123085884,-8.93130993236181,-25.748245644546568,-6.884047393019415,-4.398161205170788,-19.053673258288704,-9.07777082428315,-6.717097065174905,-9.502302493980038,-5.294613234824723,-6.339750135887226,-8.1204587690407,-2.708883707921462,-8.362546863988193,-6.428377326948011,-13.920825546419184,-15.265706749057664,-9.133382108008622,-7.463263957084147,-5.778078940013779,-18.257215012354983,-21.71001553565032,-14.236698143463183,-6.151370328252637,-10.593315847112311,-5.445405952867168,-21.746454019681426,-7.376721460428202,-17.410667170600192,-3.57177217136468,-37.9441052128504,-5.880364572955025,-47.69373431938649,-5.853432274729775,-11.368121334100982,-5.947350412196081,-14.401414646466622,-30.526754840494657,-11.41419925093425,-23.266994006727376,-3.19594826431838,-50.35530452180815,-3.396934934113267,-19.37117820702001,-5.623655948974939,-5.094868724332574,-4.769526177346131,-4.01607132275708,-4.164300736810837,-61.70502188067583,-13.129322009651661,-2.923577853042992,-6.195367637658382,-16.33795057966264,-7.014270459525263,-31.144203589382798,-3.2011725762125676,-3.5922279124665977,-29.728019520986404,-7.85589043001502,-6.708691897646362,-81.19748040662674,-4.600206737856505,-23.521332022385767,-19.28956762670028,-6.816514411566059,-25.823724357564735,-3.9640154521826085,-7.817187692943532,-6.423469748054612,-3.8843398232851163,-16.578238671531217,-17.529322382703423,-3.0137216031101723,-6.162714346308018,-6.351845743018583,-221.7593098706948,-8.058117293391659,-7.972254312647937,-11.98694568075578,-5.61442154486935,-49.42804394516379,-2.958796448178728,-6.5606282366397295,-2.3384909068156716,-4.587911226854157,-236.54826241954385,-3.4062072504838605,-4.011386875556319,-32.27819583941542,-9.098999468563761,-8.605915937642495,-6.542368411566916,-13.071723924152566,-11.140579855981606,-5.212672411370286,-13.094755903919966,-11.589368723252418,-26.887324425640735,-11.851606882083061,-8.451378971813792,-21.880496933371127,-17.20261145307511,-3.9523445136104645,-20.666605882408486,-4.517086905232275,-6.310120486592628,-15.924190510634599,-867.2431107202617,-9.485136126480736,-4.190772300826638,-179.28104992103638,-30.347229739068144,-5.547570938216046,-4.513575650695503,-9.483577008371224,-8.042859602769719,-8.201642266832922,-5.856322551158682,-9.847992419261814,-3.343288906361547,-4.093429745357766,-92.4454617074365,-5.4523436768447135,-4.882536123073277,-7.770840841066996,-26.822896737170456,-14.405277871570867,-5.632795782832695,-8.75266954331676,-6.088223139532969,-13.867706102929251,-5.217579782360397,-5.052192340520342,-33.87247052922716,-7.123695078119552,-5.086448962371909,-6.2640875732103645,-7.739193664375271,-2.87430707930077,-9.431123736864219,-7.61374730275769,-5.587196725524334,-7.53288568435407,-5.985952790234102,-8.892150455545835,-2.412786386998609,-9.09569866276286,-8.046925561390498,-6.912622306802008,-8.275607910520193,-18.84221800649577,-12.192787716094626,-5.220758463497086,-96.64589438710392,-38.98759335827758,-20.605380869632892,-4.4386824878286,-7.231122843236397,-15.208266506410757,-3.7024607308839435,-37.06909264303679,-9.16948513197432,-5.936607408787233,-4.189425854030152,-5.558535724384907,-6.052608373017668,-7.270987410998305,-9.007388835504388,-10.244844543029455,-5.6462147600187595,-8.327911961781886,-83.4646764966487,-5.7396280781014655,-5.681732616037233,-13.88923953071927,-28.972946224945478,-22.027791831196886,-15.957292108871973,-3.9862685558345072,-34.615702003884515,-7.573044109038748,-12.797887490670915,-146.36170249371722,-4.0222885141311835,-8.933018711681557,-5.3437950879807525,-36.93328419033699,-25.950252371638918,-3.7881834812413913,-10.76425776783949,-513.9997105706102,-24.040346467341536,-7.606316727955141,-12.517213189576948,-3.6615545576688646,-4.550174860931436,-5.733555178627656,-6.494234440436095,-7.557465493222701,-10.604106433602688,-13.978905615261475,-5.9884056485358315,-14.091772852188893,-8.206168843484337,-13.409396094650894,-5.055783055266868,-17.558681441541616,-6.248233157615187,-4.894172872854847,-8.151367037648777,-4.5528530221919254,-7.440617362166377,-24.598911830305312,-6.30339769113947,-18.24346159433945,-3.730397533232023,-165.20609700099132,-17.25827990806229,-6.969851589821827,-3.9464687450622162,-7.977876799279008,-11.52532219347517,-5.346892999820104,-4.326187049841593,-73.29273382570594,-5.705244696141288,-5.370612155230417,-13.164396598825865,-19.05530528557021,-8.51713703281866,-24.698701308025832,-6.159672998391124,-3.866723207917815,-12.5816240369547,-8.069852459686206,-32.73677054941694,-4.942005717661523,-5.090625119861974,-6.876155318565053,-55.75752727240403,-12.004470974205416,-12.600618934322508,-17.17228050667528,-10.238559322280738,-4.214489971256511,-4.757243519868306,-4.086205957579102,-4.495270346328454,-54.938206962307774,-4.525928636640634,-4.652620405480186,-6.899023388357578,-8.110472780562866,-14.529070269820552,-37.68792503515699,-4.052141075100685,-3.120239877930716,-4.581366416782508,-79.34260655239027,-9.69552105365182,-7.467831702019275,-6.020337392387214,-5.125731387196231,-52.66253300884663,-6.433398369931018,-44.1387590775028,-6.008895947617584,-21.888687780997646,-4.539067106379833,-135.8884486481324,-7.657496245162788,-3.040126144839336,-3.695335012952472,-13.763225428575646,-5.731590279425149,-6.019295864375318,-4.495118694466516,-42.650313403234165,-87.53971378922748,-8.148846542996946,-6.4265580432653415,-11.872197691826607,-9.249271818312915,-22.49540773787408,-7.906983538086211,-4.391385386811551,-10.377757653498225,-13.324574164425968,-43.96632497808441,-26.940669406873056,-5.683268585262403,-4.653237673071552,-4.822557694003255,-7.47245020781372,-14.873620442458309,-19.514143733841497,-20.337440042216514,-1221.874406064329,-6.278848437089045,-19.69253517941046,-7.3593650402081705,-21.405861815902565,-30.31933050141959,-8.785130816632046,-6.704609586985349,-19.993581042262466,-24.703072242295452,-14.816998771402774,-12.506946623101628,-23.522650637004546,-17.307434191471806,-44.209750910788784,-3.910336641725686,-5.148866356510167,-51.21983596031287,-5.918663768575993,-9.38116786336466,-8.544685661419384,-86.38189715472271,-4.0290044396658145,-37.33106123877591,-20.01783955665137,-31.89214350201957,-11.076766613927203,-60.06940705134854,-2.763823975114974,-8.763278326009392,-11.930872610535719,-9.76095444302401,-255.4776036419468,-17.477235208773383,-4.066357481738062,-6.568939030600492,-4.218123932300742,-80.88947936588166,-7.738933478813853,-11.978365626595474,-83.57873853769958,-4.274944976531893,-8.609352346792843,-5.453408216902379,-8.796977774321142,-6.320711671008844,-4.665522106283535,-16.744604283505947,-7.962481748616792,-14.311354658547556,-17.235335476133624,-12.881753949891081,-10.318881098940242,-6.474036482292773,-4.333900195151096,-46.15465725058404,-10.978892278814337,-4.641863943130205,-14.206886497193594,-4.805735864909552,-6.546884867797,-17.952276153633523,-12.462872471091217,-4.816790033978505,-26.579310471671693,-9.509991175507528,-6.677819815673157,-26.28069220084536,-5.449173489797187,-11.483870898357804,-451.07308068081755,-10.15039271344754,-5.087931165007472,-4.81584710262714,-5.117085039918175,-53.94367963859404,-9.275311550556763,-19.946805626153548,-30.057066587472303,-9.562013842551758,-6.887217963930216,-17.553406040304395,-7.73070263091871,-9.018023936017697,-7.587838960025511,-5.22418497337982,-13.65170695145418,-7.240304171075539,-7.522692495423114,-4.157686324695912,-2.7753386279435235,-7.088105665585921,-6.396516948274049,-37.7125406778152,-4.642021468868422,-8.31441569877331,-6.750002974945207,-12.349384617019725,-7.043284722816861,-4.233161771668097,-8.985536122883,-11.668491747158447,-3.964917863685107,-3.0692368115572135,-20.45538896269925,-36.82569467747554,-92.5017067661697,-8.650829251076482,-72.08581032356737,-18.905948181802263,-9.965579184067442,-6.267369951277634,-3.454098611494532,-3.5892572552644033,-24.249325681456423,-7.141688785203825,-9.398886583659921,-6.62123205192437,-18.98982990480643,-13.412227207503046,-59.3495211148216,-72.15509407764222,-17.33152314758989,-24.37067078867994,-65.23401287854115,-32.287457499506225,-119.53014359515961,-3.953627724978684,-2.4363439092704744,-6.743544759360787,-13.61508637498109,-83.14177467765961,-7.49026685931103,-7.651839249653065,-4.648777829339255,-31.032423144290302,-8.844224117994205,-5.511227648510493,-4.019797999384303,-6.2476009208446674,-7.595918434414216,-6.375599940114539,-4.472013063883751,-8.214704291545148,-15.245734430337789,-13.29968208816628,-5.239267165825216,-121.46954616897716,-13.30270162803578,-6.1967325427209206,-5.99528630713336,-9.206378111813631,-8.449826957104731,-43.72173823528823,-7.685534173032606,-25.464236711406073,-9.433684559903048,-4.06966459381967,-5.4649750116965485,-8.04848087438554,-7.063000835405042,-4.506254964620904,-5.076355165701378,-4.592801971619886,-80.64499666882074,-3.5603387011497847,-19.24647955977779,-5.882880149013527,-3.9621937016593254,-5.102522811175079,-4.397018965421288,-24.543127171592566,-28.27432117136262,-5.413422283703046,-71.72904633898008,-8.989233496904918,-4.7143465754605405,-18.44670704593303,-6.901195092234564,-10.584677474001191,-3.084973108975216,-3.7876776515593917,-2.5206228183376567,-4.040545461558397,-4.181723798881069,-482.8588316291051,-4.4925026117669,-4.780667497401256,-4.137223356274994,-6.290725602960772,-67.14166296863647,-4.176780371315854,-4.4535583479483085,-6.609138058230077,-7.640821524799234,-4.505958105402894,-34.75666813515394,-43.80034025480979,-65.98644624315591,-14.504751081360798,-17.582161143484274,-4.485037671297581,-4.257862998215046,-6.007259726202159,-6.149253163684824,-10.573489420450422,-32.265945689055755,-10.556349790265998,-33.81300897451242,-6.077879308150011,-4.328650072437582,-6.520914183729474,-3.8966355396515477,-7.653241679170468,-15.545583359632104,-4.775601959055604,-7.811317414994392,-12.083499623270788,-8.972750328701228,-7.120243893989343,-5.161830796504905,-5.585486755342644,-7.19301915059759,-18.86125220090903,-6.189781501358621,-8.155799542253183,-5.3564523918031925,-4.923888543040141,-9.999564540982112,-5.589788156168017,-12.894480600951795,-5.9754506240087695,-10.186879272552257,-3.76600803442574,-2.500948930743161,-5.531311900765219,-146.271244397683,-5.2633493689947155,-5.45336760151565,-10.953634274623282,-38.608500494903545,-9.239913609268962,-7.614790745821026,-6.380957269768861,-20.191646620111943,-137.03777675625085,-5.283367916840588,-4.484909811034096,-187.45947243812668,-6.220553016899587,-16.429461413941574,-6.592770360937746,-4.845737219505438,-3.9441837145644136,-9.279127326687131,-5.8937745717150065,-8.300552475160412,-4.332046201386517,-10.25301524600662,-42.15446999389929,-5.1171021525124205,-64.92787031967963,-4.777953661435777,-6.968389949762043,-11.649522635063276,-20.97655942765306,-3.9759022530417383,-4.376460022208236,-6.73304296114645,-22.66291719332555,-29.68110963456024,-7.725324026758684,-56.26396725324317,-35.51257137483656,-79.41910024586834,-28.482281485474317,-13.252986358156209,-10.832157321524438,-19.152715741655435,-6.068258200681017,-4.369944646375332,-7.165293392768324,-4.8203575589907866,-5.06465697705865,-4.87635450695193,-6.576325280096703,-32.250043718624056,-6.076051942832816,-9.678905695312336,-28.036788593887007,-4.188305050274575,-26.72636979702514,-5.279371411729504,-5.212142923752479,-5.012089017327984,-11.965666190287742,-16.84127420116666,-5.756795388467532,-8.391753656483203,-2.9272215601121987,-19.189728564943593,-26.136874804406105,-10.016257013777523,-8.75015331919573,-16.030520360784905,-35.93181455216064,-15.36889320043888,-19.44017764036674,-14.45850991328759,-6.145575177343858,-16.24734927463875,-511.8759323149897,-5.018136606525031,-4.984402769091977,-5.696274757166888,-3.4579720007246864,-6.049956414401174,-9.469356369055468,-20.293296690411797,-20.196362046003742,-9.448580131250138,-6.854954134517371,-6.042177266063346,-9.85095067587958,-6.004638504230467,-6.52779031887307,-6.046406203932927,-8.585650733215695,-25.924193962767436,-62.49239515615372,-21.45673950748786,-5.49676541711147,-6.6512749106946165,-19.38122968220408,-6.406874832678088,-10.888060027714412,-94.91281499865589,-4.823779955643642,-37.24582736226341,-7.523445978685068,-5.700625916477684,-3.0492950246482375,-5.378383477012473,-113.72024298740007,-3.4272222477109713,-15.915735993332172,-41.522647807866434,-9.502075423003925,-6.260066293687547,-4.589510364089723,-9.883883764594122,-414.3222261086365,-7.514204739466107,-9.711076325020445,-11.039939565292949,-4.828580586529355,-9.464357004831493,-4.312623952792531,-49.642967782269494,-4.825959785989186,-100.41297839477915,-7.3453005478770645,-18.047694629720162,-6.638803145600269,-43.84722010972266,-741.3528844482568,-5.573528306948856,-7.152421577695029,-8.31931366038011,-6.5118390731439515,-11.989305510542254,-11.904777721255908,-6.171444431850773,-7.364278220954636,-21.618335177365232,-22.4911455718374,-10.744847031407804,-5.370292068103229,-47.852603408311914,-7.889362337882554,-10.073387664695332,-6.648848363434208,-58.43460172077136,-4.439949408306647,-3.60348528505455,-4.061845563682484,-3.7436071316502266,-5.838899582285202,-19.621276235327556,-5.838687749630727,-119.1835376504455,-5.542327895613554,-3.8549975139687573,-17.661872754418642,-5.527324081734715,-5.581222333777602,-30.16283356739764,-4.615587988028808,-5.707635345528443,-7.860279821778843,-4.9368850637881945,-12.523683738757835,-122.1807330087571,-4.04699741590011,-7.252205449159986,-4.495077188636897,-9.99358574380173,-4.048437253687704,-38.83129194044018,-4.479766312110484,-12.795139022890991,-5.781548935451476,-19.603163410032273,-10.290366826320584,-88.07116582709557,-7.516047712749108,-9.876192769913267,-7.270881147749434,-5.358442987935695,-473.0960976588083,-7.062728178867511,-10.375144567457747],"x":[-18.343304392628024,-16.377156831835308,-13.840706720789246,-14.410849486277108,-15.020256649777249,-18.626530302656587,-11.959504251275895,-14.119481532556984,-18.57971111146901,-16.721782313189994,-11.839879633687744,-10.0903165405756,-16.420787668455983,-19.954178229769283,-13.22409684861688,-13.991007128389388,-11.148608198722602,-17.967474977355085,-10.742392363331616,-17.373401376206566,-15.349989619864619,-19.649999550032867,-17.36358973243709,-19.67751840553267,-13.641602499444632,-15.555526478550147,-13.111253402077562,-16.108012315711935,-10.626493066965459,-15.062286304489765,-12.234305622039173,-12.786949925141354,-15.048354956729831,-17.71867646261399,-10.475165035137907,-15.057992138076067,-17.114360214117596,-18.6219954056706,-16.568522922360383,-18.75158825709006,-15.025342012548776,-14.01648019316627,-15.941737561372992,-16.67784115612219,-18.13000008995473,-17.417867725820024,-11.86909923511785,-14.68778867030105,-10.319392883901113,-12.620100347132183,-16.8924779268403,-15.280512551099655,-10.046545542723088,-10.023017691795378,-16.390442501024218,-17.210587681111626,-11.904056252564626,-18.616422290675104,-15.622403602013632,-12.6487013620258,-10.855163812117725,-13.022518623592777,-18.426191769816313,-13.802199016056178,-17.29504340451814,-15.791583154926496,-10.967137486589827,-13.544257025986168,-13.117365938696894,-18.008131023050016,-16.10470738376312,-11.417552953057315,-16.306268747787986,-14.661372298548862,-10.849399606437737,-18.57757369552558,-13.700040248542496,-11.979795502389718,-12.917072472484591,-17.23275978657869,-14.571574877176879,-16.081561520393322,-16.973295526366034,-17.622470072271128,-11.551951783961776,-18.731704598049944,-13.689900288233904,-13.833839368312146,-19.460583587782423,-16.554064981384446,-11.664202487661484,-10.46711859140409,-10.56462004862251,-10.883837860973722,-18.891275682571578,-17.010415061587693,-18.554923172079576,-19.409397662523077,-15.651550736777471,-11.268017440811374,-18.8278666629962,-13.19708710859286,-14.064498766111042,-18.42833697258747,-19.947099923850878,-11.788474598380878,-18.895950263939252,-19.712347622599545,-17.046343933168593,-17.490433153617907,-12.235448503628463,-15.451533075422564,-10.115076299126782,-11.76852986022082,-17.000074895907513,-10.2573953172256,-15.75679197687638,-18.06332490233584,-13.23836532212788,-18.223302019859133,-12.567641993089644,-19.61159279948563,-12.34859471416952,-19.71223351113781,-17.297471408320632,-10.649178621969085,-18.199487932514455,-16.640957481871666,-16.445223743697678,-13.830942718661321,-19.13998014427438,-16.864772217710193,-12.837910491466268,-19.091598914550822,-17.95857876263757,-18.9987988004036,-19.861579685119448,-13.523206623103352,-12.291865212430986,-13.528244330029223,-13.627919516049287,-12.97828769880718,-12.714988426796552,-17.90046829307902,-18.659529034406944,-13.855917091016536,-11.39383214848146,-16.20229278821688,-11.19702289454776,-17.50399779268654,-19.451957767567627,-16.71887091404206,-10.069637261002269,-11.377563094101774,-13.866695275139698,-10.634825960758445,-13.274140442507766,-15.710003524694978,-13.564110052792104,-17.03069667245137,-13.593253270186343,-13.402440375300662,-15.785096850164983,-12.460430046362202,-18.37681132488341,-13.475274238982013,-16.776965406753217,-14.574463262126196,-19.017193879575803,-15.898894687129982,-17.385533213827408,-18.34622800910067,-18.713511910181264,-10.452271825286081,-15.402887181413474,-14.739496453481378,-10.33082740798071,-19.275659209951343,-14.054959664854515,-19.257252595433666,-18.47597587838002,-19.6042711363157,-10.209176952647681,-16.140127792322605,-15.30174014219935,-17.289255586030073,-11.285954008684325,-19.410363055630548,-18.79739511003973,-18.32140731713135,-10.569827438213954,-14.58650469715362,-12.26930715725165,-12.18723591451414,-15.685137476147064,-13.423513461715075,-15.526910476341634,-13.18416851730399,-12.359195293711924,-19.19627103699128,-14.788454282411996,-10.211438067618005,-13.415162357551573,-11.834193460100353,-17.12340039678168,-10.384764339109054,-19.87868754560925,-18.082998305735057,-13.042779299571698,-18.503263583346108,-19.73232569664776,-14.782740461872555,-16.189288933723553,-17.49296397240648,-18.035664988803013,-12.753101175875752,-11.918795449887972,-18.601921688748362,-13.79225573643967,-15.88873451311092,-10.50574983441087,-19.030162311515852,-19.95255770650431,-13.558201103127727,-13.592957060217604,-11.893361600477864,-11.3362344088921,-19.49998595736839,-16.293551414518078,-12.156397516862539,-18.31335863478055,-19.742800363444303,-15.0605342865945,-13.52093780401097,-14.486817947002141,-17.86613341271911,-13.14514212872205,-13.455198636759045,-15.448308413119927,-13.767802278370095,-13.261602552182776,-14.479357878024334,-17.879656240605893,-10.675430546070587,-19.198547681924122,-17.360422500565477,-15.133679571500178,-11.952453188159469,-19.013721163408412,-12.263886247417023,-15.347512405005334,-17.428960456397657,-14.473718622685434,-14.776675889375417,-13.870454763389537,-14.971104269551343,-13.876118731701164,-11.02865024702313,-16.135425304475355,-16.267470080770114,-17.960559877647416,-18.45702783467403,-13.350040408442245,-15.392529899358616,-18.377191467512876,-14.612325177345628,-14.318952230377224,-14.97676499867952,-10.72294774127674,-12.608074656162977,-16.92645051568266,-10.90903110744824,-15.338325195104591,-19.935635630971152,-11.211707193878919,-15.095373634908618,-11.330543218730993,-17.143362325176568,-12.862391374234033,-14.726130871951753,-19.40512931634479,-19.49936671735293,-15.510577662048666,-16.318461495796377,-12.508378759867767,-19.88445939111152,-14.039139574091612,-13.573956990515166,-10.140620870347458,-11.582144321401465,-19.838053989960102,-19.712888546239476,-10.219146874960252,-17.712570919735906,-13.391740805990597,-15.39842794934766,-18.075962837088074,-16.9825471737416,-12.69759627550864,-18.199741983628194,-14.166673677973314,-18.693328692002282,-11.745859972537547,-10.542266991009894,-16.424479305155312,-12.624070557697472,-11.703333759084057,-12.544654738386484,-14.42394318461071,-13.434247335240343,-15.789671689853193,-14.562848636249047,-19.441469857796058,-19.250172455171757,-15.41882968908326,-11.551663670837815,-17.618432120233965,-11.366062083450183,-17.990764666396387,-12.500164019947457,-11.073291991922767,-16.34936955342038,-12.89418882920793,-19.58709286499942,-19.308298274742825,-17.546207712617427,-12.91724826422076,-12.16768744412458,-11.365266245131123,-16.4028219263449,-14.433874856616118,-12.41804087577985,-19.460506849477103,-15.513761423842528,-18.657926510747544,-11.233649453940028,-11.931536048182508,-11.959481260346136,-10.310288877715783,-15.036462994229948,-14.864132331633712,-11.121422799032034,-19.73709936393853,-19.418126547780005,-15.724968342622327,-16.520117363359873,-12.188600686759873,-12.377013013238864,-19.478907600369403,-16.03983474245566,-14.170239092985568,-18.19618682904307,-18.341729955790562,-10.318609150279485,-15.775292637926597,-16.609201204248198,-11.802595457228154,-12.50160949682153,-15.562064639835395,-10.648935692132007,-15.544500625042016,-15.392535034140732,-10.920206150978899,-17.338176510454126,-10.192699085548186,-13.146009994496342,-12.909502785965522,-12.329054835970322,-18.375377787230093,-17.339842276173897,-14.188588446653572,-18.839521312899976,-16.93531234328364,-12.58977227000827,-19.384185643764667,-14.465446424005519,-11.095839872641339,-15.877462791498537,-11.745354078321984,-10.726469859824041,-13.30593894817735,-19.706350624832993,-19.161504632482636,-10.382738769173487,-16.974979040957727,-14.81228861144893,-11.199287916789416,-12.742552368299684,-16.618808463462535,-18.1547127081342,-13.08827798256057,-19.031465779718403,-18.033914156274868,-17.28810234654447,-19.51146594417601,-14.969413798446254,-19.197054379684108,-15.451996506160002,-17.3293545026176,-10.422419884047896,-12.280898340108699,-19.555731741861003,-19.530245915281018,-16.640208793734097,-17.772267252580328,-16.02610369294336,-15.53701608197546,-18.502807520288272,-16.29059256664289,-16.086101070333196,-18.590993691803586,-11.557569102201615,-15.253243317480774,-19.134010271362378,-19.621382365283925,-14.629615944886151,-13.433876272994084,-10.660957200367815,-11.045075199674145,-10.567364641938342,-18.03684041620644,-17.687784374493205,-10.212110814192396,-10.877118307486962,-12.580584621623434,-10.934324064919362,-11.107116792474322,-16.317696451314546,-12.931415761843137,-15.251325313780391,-12.180550813235255,-10.789620336053705,-18.94689388371584,-18.43097590616541,-12.91878554866873,-13.277847227101914,-17.08267452435764,-15.013130380071818,-15.737737930380414,-19.19005457463514,-14.641165965651041,-15.603459535527765,-18.075200250414134,-19.70435375722821,-14.24395864955699,-19.80531991796112,-14.906832771195354,-19.443088301143142,-16.780724664557493,-13.388356958822214,-17.852646574513635,-11.103926821751797,-18.256124287680205,-18.028807785474726,-18.325799458179308,-17.36948648766342,-14.364524527617055,-18.242223396235666,-12.96924965320293,-13.289435782651944,-12.932143654099974,-16.361163621541657,-15.738898385906367,-15.451465835748664,-12.64107126920619,-18.56762937116237,-14.809434586515184,-15.351448634502933,-15.135162640521958,-11.155659237060789,-13.85247464974194,-19.849297947799663,-11.973162281563107,-14.00987136662245,-17.174978740044583,-10.547872532066357,-17.489157084843857,-13.470927348221373,-14.828131736201339,-18.285175058798416,-10.83993138363808,-13.204796904409875,-15.353886917118727,-18.26996716346481,-18.665450936050743,-17.705894844036628,-18.051525569770426,-10.778519540903297,-15.430089507385716,-10.147046732260208,-17.215797537482903,-18.35696466189486,-10.37146199742729,-13.748988920130177,-19.360973753911864,-19.71432134949939,-17.514395856339885,-19.615636531607667,-16.595272393868978,-10.640241445720271,-11.630121349698674,-14.42048667970036,-16.159323583718663,-13.124521033782013,-14.925745160993875,-15.3001075733755,-18.51016110324158,-16.935364647718593,-17.520058731094565,-15.003971008957876,-13.449005937305273,-16.463500692055913,-14.460042917100582,-11.282830340142073,-10.071648687875358,-15.197707480426752,-19.068667669870006,-14.305092240554163,-18.08653292071775,-17.75827633833992,-13.951001827693679,-13.68066180206252,-10.058854890086906,-11.3617815354315,-17.96452887809808,-11.057507644133448,-13.151381702039458,-12.058486384107532,-13.40288587450713,-16.00881961278964,-17.015172438178862,-16.9679485215686,-12.196591469785652,-19.388273999839537,-13.70106168320463,-10.337291359671841,-10.378736139429279,-11.612169338538248,-13.183045549182834,-13.051764696988803,-13.547733977075538,-10.558612489280463,-19.42561285015629,-15.234923401561858,-12.22042704786958,-18.569369239193858,-17.319255508111958,-14.227171139337154,-12.70176413402446,-10.265385544771991,-16.0566207826964,-18.793013561221855,-13.457338363008212,-10.358404497552957,-12.129237089153488,-14.421141513731627,-17.569041891179367,-10.057306591764307,-18.51564874295207,-17.26432343953705,-18.551262540904442,-13.16636066816544,-12.233582215274195,-12.146169525408608,-14.52502209286342,-14.858788889651603,-11.35137669279861,-15.156817721647178,-15.708437656489435,-18.0405275803695,-14.159647311389099,-13.34100661084567,-10.9157289014062,-17.395436735472845,-18.381557493406117,-19.472396398760825,-17.335526787008654,-13.135717956748591,-12.481522201451012,-18.564952593873755,-13.079019153202626,-16.73665874914641,-18.91425333107628,-18.67039459495369,-18.441798400545043,-12.35641617226168,-14.292553855651368,-10.651057735866322,-19.628197346111367,-17.490692344490448,-15.497017822256602,-13.606879093779183,-10.678043014813204,-10.900993643780918,-13.340959584833332,-10.218509744507012,-14.402055991091745,-18.575972090986724,-16.27255786562265,-11.204783832206921,-17.32912627446153,-13.069773304620254,-17.04081613934177,-16.878824997497755,-10.395775363632726,-16.039322807758328,-11.434977669711747,-14.776905138804262,-18.534292741825563,-10.664701900992267,-13.482886757015024,-12.282382369654323,-13.433305089965879,-16.79459228746599,-12.563432479930494,-19.60274646142222,-12.405429436448385,-18.94168235758134,-14.352095758188526,-10.251398532896875,-14.948773802638948,-17.633224595902682,-16.701474741639018,-12.205313810734552,-17.01612869013417,-12.609793703027227,-13.994734307496568,-19.202279301975864,-19.993900054878733,-13.64568100716113,-13.94832811662113,-12.72864140424485,-13.882950405599717,-16.069181978784002,-16.586768079853716,-19.750456497327026,-17.01467846771251,-13.904603609584115,-18.772834503581052,-11.405332545541683,-11.87504730340083,-17.317500337727267,-11.402748811062434,-13.155482694882606,-10.609964895143914,-15.796004949209353,-19.7344788225486,-18.342894231171886,-14.326697387775337,-15.558735251481558,-19.57316144901566,-16.722514726588606,-15.18154787580209,-13.70745985627276,-16.045896421688724,-10.078215404296797,-15.693137375272679,-18.85956937994125,-18.94515360285969,-15.061200351115367,-18.267033524355313,-15.151844290979529,-14.338376657688796,-13.818750310140961,-17.178212283344582,-11.277944117113188,-15.349060657132796,-12.279921833994534,-12.719196399559909,-13.79619146216137,-14.250842989075434,-18.739671571464356,-13.31106744063945,-13.26636490365978,-19.139680592008165,-11.964177532713052,-13.717331771247983,-10.64578743623393,-15.029261492051686,-14.57064650670635,-15.389032639148994,-14.438799010104379,-13.567655045403777,-17.44610042810796,-14.480999004186575,-18.293136338633328,-15.308805299869423,-16.79471702757934,-16.270602402035152,-17.436596027212197,-12.27116550781977,-11.631728800577676,-18.898945578952187,-18.8058696827054,-13.772012229424808,-13.942838873948553,-15.907443415559735,-19.0139491353889,-11.381443556665904,-14.959395470311545,-10.035293706743973,-19.624973357832054,-16.35290666169437,-11.358703950713593,-14.880061145604888,-15.534245672031178,-10.414742903105997,-10.264507410146075,-18.566648951488403,-19.987935742824067,-12.644651749019914,-12.698769890729517,-19.351061411047972,-19.767524962055603,-14.361316763471573,-17.07941902253328,-14.996578279835129,-15.267104423370315,-18.897137029106418,-19.137105147746194,-11.049185821455582,-12.417434957546554,-15.432102712267557,-15.824341498844843,-11.338715672531762,-19.870532154102527,-13.789711793478567,-15.316088640874082,-16.838979411726037,-15.942332511996955,-16.75303506640232,-19.989950750784132,-15.160906412350679,-15.914893083616233,-10.665810320621214,-14.430267116782026,-15.982491128865888,-12.23803982952834,-18.578461490177506,-14.643189859084927,-12.415466401651646,-18.0761209881429,-19.252811835172647,-12.19177657581725,-19.56676595962472,-19.512177867449733,-13.06888786137584,-16.69072316270408,-17.171344074267353,-10.167346232323773,-15.085970707712661,-17.876523674140877,-11.672144688484725,-19.103260979056287,-14.67024092989081,-11.109422534843725,-14.012520950833856,-15.653211836007326,-12.473272652191355,-11.421426085400803,-11.67888161262869,-11.986264481157116,-12.234755359858438,-10.026992874152352,-10.561668579487621,-17.48990468450171,-17.233667865691313,-14.922688839845836,-14.972542061307397,-16.565575950725556,-10.106453717537393,-17.256480541224,-13.521124818987635,-14.714704204831236,-18.408065934147096,-14.497600284069803,-10.306559420548103,-18.929360757550285,-19.371363447610626,-13.178444662122997,-13.03634230382088,-14.268593955963674,-15.281582405715756,-15.419925709609391,-18.29364945502535,-11.541906286186748,-11.189681381230876,-17.384203261492427,-11.37542412213543,-15.307205385152695,-13.252440930628673,-16.33760586087903,-17.93392784513736,-15.79748405957484,-17.172274803857213,-18.674710530698068,-10.007142161838846,-18.982579242406114,-12.195131419099534,-10.006219707515942,-14.070908035572522,-14.904112508571322,-15.62342571624866,-16.056637901113646,-15.156995943626706,-10.986818453174731,-15.459937923255476,-15.230859353350573,-16.102456711538352,-16.700081279518223,-13.407474618063521,-12.259389016598005,-10.647328341455255,-13.72427728842823,-15.837293884777367,-15.917561603061563,-16.217254839898164,-15.203129430397777,-13.787607521490383,-15.072218565910546,-13.851609941442433,-11.435600995470235,-13.839215527471424,-15.077533948752821,-11.038921470609008,-10.027625177853661,-18.145622989470308,-14.977336291650241,-18.13020815778613,-13.28536990558594,-11.231499719155433,-13.568314494757178,-19.098527864101328,-19.691738399754236,-19.564948025488412,-11.176656814698639,-19.236882109754617,-17.677624553802033,-19.87106853919754,-11.083870336751625,-16.77518206779902,-16.43588611965791,-14.936839925676331,-17.352828210248063,-15.206074686158697,-11.262321547348204,-11.117665861150401,-17.967665942151108,-13.206834221647503,-11.372119940602609,-17.446202388576104,-13.339077410815669,-11.438477556829374,-17.220623927063837,-19.759135134079827,-18.802771056820458,-16.042404080463662,-13.406552765052526,-11.052378170138113,-15.368464395035751,-11.506604042409583,-11.758689288194404,-15.690245579366941,-12.79099785599917,-19.921609358407302,-15.754165367562027,-17.36758081028433,-18.643304140705656,-10.074534819222954,-13.69989188655601,-13.592729753985427,-13.348774369827547,-13.347656155658871,-17.752512866580037,-15.512206959370975,-14.58879365031015,-12.606654557662655,-12.361795359202164,-17.726605755118634,-10.565925782126428,-14.674548485008135,-19.270145446123124,-11.05450977814813,-18.00010488505498,-19.95548109568572,-11.702761255144921,-14.910996516042141,-13.190460495779483,-10.122559359050998,-14.095725779873487,-12.12315406871057,-15.85969240095592,-12.781771800366995,-11.778376591411037,-11.71658045357314,-18.158330225991282,-11.820028909640076,-14.551968249694829,-18.64490462247406,-17.67407510857528,-13.285417970615281,-17.204684099160634,-18.64258889135748,-18.08860355831301,-12.939554360089417,-11.909612523521227,-11.467723843252749,-13.697490695071767,-19.755966346394416,-12.166247547726323,-11.21615805289143,-18.79917372933867,-17.24821104300576,-19.755221621510415,-18.34177620423097,-12.229140095325867,-11.308312160579483,-17.260755775892317,-10.046973719527552,-13.14967717013202,-16.23936087388807,-10.808115031944363,-14.158990499286162,-13.180754480890531,-15.662760182028192,-11.533066480035664,-13.032644066779387,-14.152608798013622,-12.217369802008983,-15.03276264563938,-18.078388010786284,-13.764495624775941,-17.265777101170194,-10.341059752375308,-17.36158664004235,-12.233023065331643,-15.635321545961851,-11.158462362424652,-10.07022281972416,-12.089023358560276,-10.62299986407249,-17.870556587707306,-18.89390623836849,-11.005338467808068,-16.946720318740184,-15.287810495633057,-18.150344844685616,-14.258744100117474,-15.627779206110334,-13.616308769191301,-19.595362680583154,-16.53066688828982,-15.903155701283435,-15.488083998826248,-18.10106898089056,-10.502141554386185,-14.24802277208219,-10.71685917237932,-18.30817106798155,-18.441270934407857,-17.759551885733984,-15.172573988676522,-13.523525762176378,-17.848521833269952,-10.555795171106752,-11.583180762310734,-15.086943442909229,-15.729584836646278,-16.332310063882705,-10.856272386747596,-12.831640258331891,-19.978198472974753,-16.329916215182003,-16.338054955918466,-17.186469596131055,-10.219935304687482,-17.680746176262748,-18.82846833180225,-16.91343138462621,-15.898638425157333,-18.34316587376474,-16.308794708742536,-14.579783706615935,-15.784302576850527,-19.738363521774055,-17.614901718553007,-15.756232934017088,-17.019510034304783,-18.183265710211657,-19.483407015613995,-15.257056376372466,-16.323666293950023,-16.795312175582005,-15.81637262562236,-17.88501426441136,-17.41036674909539,-10.508699312892471,-11.886340822314732,-18.789689645052313,-14.313156725500205],"s":[0.4582571213858999,2.2607362581145676,4.119974711652606,2.366302234712021,3.498277496116746,0.3373908901827183,1.9070491069470108,2.466836818274877,0.6760652701246295,1.2653793491164111,1.4593913846445994,4.4490929443194736,0.5113593678868533,4.08887851364195,4.102837656450077,2.331014854800195,2.46098969070796,2.2293862062936443,4.79246860249145,4.673637431948359,0.28424693723722694,4.065680547706846,2.183055258148449,1.0627280826226049,1.3169906490521854,3.2407068534265013,2.589761517520881,3.029177957223035,2.403444733723439,3.2704677946045457,2.6194749699392803,1.610082051888696,4.987236637130601,0.5663068467083521,1.4189217798843723,3.9928510795911922,0.36676809810514466,2.398481265708139,0.8420923381650147,2.3806036376891515,0.700983196039271,2.3970904635864967,1.69499665031684,4.019505269051821,3.599768687625077,0.8828496612505143,0.6836869612045615,3.4985043477169633,1.6300848474910523,1.561207312534505,1.51040425542586,3.646231748626546,2.861507092457205,3.918863469089061,1.2166140146934001,4.102516377300277,2.2343262704516462,0.26562257190982264,3.2655982919368256,3.5915304285626926,2.9442159738714735,3.996406609752008,2.926254016457813,0.9271010503096511,4.035907242475149,4.157063015452946,4.461910255871022,4.266356993690802,3.619906952253291,1.9704568735721584,0.5208011126528311,2.6944874966383745,0.06165635458116325,0.8307331340308555,0.7136332428527492,1.4989474554098081,2.8426334084561935,1.5986251760561654,0.24501992501523961,3.639690503627598,3.204071811380694,2.580965939982124,0.13729529204105417,3.5344141473891555,0.8935056783661277,1.2806159393108296,3.926102040120041,2.411111248809299,0.4256817830688542,4.924166300693516,3.7548765493819625,0.8428488938125178,4.881636342535267,1.7750465202643628,0.9341892942490837,0.23110440930676268,3.870769647027875,3.791406204260687,2.0279355507845787,1.9212364826565753,0.7256024725467369,4.195504408617906,2.7625639366635477,4.756890758551001,1.8682306375721414,0.684522194285595,4.48866399647179,3.382248036420151,1.410680748933768,4.506331567046105,1.4813810109536285,4.685604074791319,4.050467386064743,4.066737999433629,4.065461045268949,2.9662930163762513,3.8350564099198325,1.0900435669517483,2.699613954174218,1.175030895688679,3.9196312848217216,2.396083210730524,0.715905401113881,0.5849332344774716,3.763970135640516,1.1040625288443329,4.704088678489616,3.3498557710861396,1.7877743930740708,0.23702196193891245,2.6255734957862553,4.093753227572811,4.573114578634168,2.9928091858266246,2.628059022298306,2.4841863364695516,3.280029187585103,0.5839018240079286,4.098786417000247,4.573582589513086,4.864996645534889,1.7228876450945785,0.4681095718928363,3.924054559576382,1.8736884566442868,4.70590141890487,1.4724839453737393,0.45820671224972687,2.087750425623419,2.902816781554284,4.044637809050276,4.458736119172557,3.217181080840076,3.239022030239087,2.2875944764111056,2.1160565605233614,2.4864671979944983,0.8140444468889885,4.838164707083088,3.0234391904150737,3.951074597862685,2.919446704904578,2.311274220420887,1.7121826741349588,1.7484093669135625,3.742786309130798,4.988644907717075,1.8712860413274324,1.172370772880722,2.7657981844231005,1.68603641098644,2.2804442323429175,2.9888596678566524,1.2054998765885316,2.599675043839361,0.8108551175096879,3.409417237570022,4.330973143871221,2.822281565266298,3.37649686499238,0.4016985114423477,3.4908698465173527,2.272906959743607,0.7287886211587424,1.4498444267692234,2.31015464523038,3.8899328186933446,1.2663995888731439,0.48439451054492766,2.029135335538068,4.7180961112015,0.6590654725211975,0.38869781336147047,0.3226634944902629,1.0183831904510254,0.12847209453235808,2.6843978078763273,4.8469594889035275,4.004244077617283,0.5017574156282523,3.9481701346804043,4.247011072481371,2.3107641279551014,4.551909789969057,4.961348404850767,2.833674573688306,1.8872887599140897,1.1278755917890426,0.08497793827594302,3.7830509465836215,0.7712376311031188,4.157039633050147,3.0349323907219516,4.171094429187809,3.5673665107125685,1.9218150666739786,4.282337960648185,4.864676062190095,3.184258542743905,4.581887269303126,4.090089280784282,4.303563477600702,2.544577637170786,3.4516135750164603,2.242817661521018,4.17573240099626,3.937195016657741,0.18231047921036359,3.896294940807566,3.5035995953092334,4.29472356312727,2.650909537031837,3.3172937371941336,3.5116059567196087,1.5234229736744498,1.3881829330145778,1.0512097286801614,2.9142738045575447,4.395979103899721,1.9248883671289552,2.5849314513724284,0.03004105417116376,3.255984297099105,2.5092214242528965,4.905286344306107,3.0130869860261003,0.15810138998178846,2.6285635905183966,0.2207672818353379,2.1326542486331035,2.388129392100643,0.13135889397992817,0.7759646691082489,2.0707309166239716,3.042403110274333,4.360914120450124,4.545110002235936,1.4230090509678883,1.5821359049264605,3.7518534263724455,2.4259363185193585,1.124056919344384,0.8295637349200191,1.4710392229279956,2.0639636311108878,4.492987594136326,1.7456572816714944,0.14699848330235632,3.039944997612307,1.5991782373798702,0.6618658992417048,4.571345074709842,2.6409868059407495,1.0921132988482685,1.8885351443248266,2.352918119730756,3.847442374187746,4.656333957028424,3.8481266477166933,0.918346554323356,2.4853716237454027,3.2423062092910038,0.9066161165632369,2.8378772036333535,3.1333631894441205,1.4097793991353447,1.9302431036018397,2.3848944195500454,1.413954399539441,3.5266633653313573,3.924240573096973,2.597986105321125,4.142969506173973,2.249046570285813,2.140312357511369,1.2032305525455023,1.6363905547743618,2.149572651950198,1.9188230733624934,4.6623113027965335,1.2613269747353928,1.062193503782588,1.0188652372710505,2.1023317150046372,2.2206195566450546,3.439110743738003,0.910904566972125,2.7373855243606826,1.3199048502598032,4.961316705082104,0.6406009765296372,3.0106346324267355,0.48424400394931455,4.483377203478104,1.973979481839595,2.5398924142148527,1.2390143461691727,0.5247493960025584,2.4078493785783097,0.9297161300158252,4.616761744573406,0.5194445733208675,4.198916208066565,1.1440444757183899,4.107757245810216,4.959553643576981,3.273730084068298,4.7158728491697035,3.3597950159223258,0.2880514450021532,1.8576269516187294,4.596061921465298,4.106873085573282,0.9574946833916009,3.8412384232063945,0.6094653546026663,4.0615117252416155,4.513964460131693,0.3772041063517917,2.6592936637441755,3.2199515847440296,0.21795000802368958,4.711647752272526,1.022402267141942,0.9698866621033919,3.6680180111840865,0.5098081716398395,4.788158285765066,3.4238437782466713,3.3351932578260346,4.392401535885348,1.5643501369360024,1.2574810816831783,3.5127725232826146,3.1993710597018765,2.898080193197141,0.09060788998132674,2.3222609258167672,2.815798318912485,0.9049270842397505,4.177557958250455,0.47591667383343195,3.9927835634724818,3.9295930442992786,4.6046818743843385,3.850313548456852,0.07575520629519716,4.6060148873027345,4.6662733670173555,0.6351968093573401,2.1995282643163705,2.497564714978374,3.5858558155604205,1.7157861700775112,2.037130045497543,4.500157765934112,1.5859104141917146,2.119450531183078,0.6498404659997414,1.7317907812206745,1.9980189731762976,1.0228627697845394,1.64460803909952,4.349911257064206,0.9377176003612553,4.604570629400558,2.0162669303324177,1.109193557290058,0.02027437209792149,2.367673335300041,3.8625607422144883,0.1529863034437806,0.7864111062592827,3.7931386894817933,4.396672595980261,2.157196716284978,3.0182566889576643,2.3183189251271905,4.204147106488473,1.313616463995122,4.2007984728302885,4.975673240870952,0.2858539613368394,3.893786842451472,4.201193467656756,2.9919026190119835,0.8384223228794729,1.5070963735144716,3.0205300871691665,2.4656717176765075,3.4123838878704604,1.48789856487467,3.0839392575831734,4.028167605459676,0.6328124599430829,3.334789438627931,3.0405759822059455,2.016785090822818,2.462577925899514,4.217172674704734,2.652520373536399,3.3726620126087745,3.172292684146285,2.5390638359660667,3.0619196585548627,2.0140433476877706,4.982459465441588,2.1248554794389696,2.045401434360783,3.261845085948721,2.1022946477662408,1.1029591973568786,2.237503316088053,4.201819816503303,0.2280683657604632,0.5485650673980003,0.9378693302994945,3.952395934914522,3.1015674215122324,1.2810856849244634,4.329007832330691,0.49038978576338543,2.708311047842006,4.742694649286814,4.792224458985258,3.876781500222577,3.2246867616883037,3.0053072946276216,2.0490744722217036,2.103207452037558,3.393369317900995,2.3445183149343274,0.2725712855150497,4.346382172477561,3.4383878097181633,1.559264111977936,0.6561656573598407,0.8371169490362895,0.9987196444102264,4.165300641457092,0.6415619645182102,3.132461466384161,1.8413122319269437,0.16907938014149582,4.300731528802589,3.050519983060289,2.950806556050214,0.5223469366587974,0.6983463666063627,3.9479587439301844,2.079100494427287,0.041061769491912425,0.6290173252286502,2.6347537529553056,2.014752225315238,4.515109845615958,4.4568290901877194,3.901510914087992,2.858275851377762,2.745141735685351,1.9307952743798784,1.5134969972815226,4.07413478509855,2.005838681710302,2.936232906450593,1.9035267403287848,4.629174593022082,0.8435806147407554,3.471191367133053,2.1887598785138005,3.299877858798992,4.195682043578467,2.5465890810139733,0.9118963168564864,3.7921985679892822,1.2805184015547943,4.805490457283045,0.1232121508738282,1.4681336794190591,2.1217485149454216,4.167515548843502,1.8233326020708118,1.812942262271855,3.0665919097126215,4.972751622768742,0.269729218748217,4.05558141710679,4.590674700563959,1.8508415437341574,1.0156446203673986,2.2462733570892404,0.6754103908686382,3.26206415671476,3.6154083965035246,0.8476665614777357,2.6077600661085554,0.7812370128667712,4.792095359648803,3.9304345872156867,2.749134532064067,0.30479041126354356,1.6842231595183255,1.3768266911468419,0.78228069681059,2.365091928363736,3.4407531132551084,3.8667704328796413,3.8771908333812224,3.3268121798710117,0.4468098931137665,4.782430932321037,4.846333787052055,2.347128617820373,3.575489167576799,1.1661511471873298,0.29349837754478303,4.226677849625866,3.7915895108631856,4.635844415185249,0.21677994164816417,1.7923224359634626,2.618312789224847,4.305365493440637,4.9028555362054735,0.250039709247194,3.191561162979114,0.5179607196580549,2.8042054328264934,0.6252638621898532,2.6680358704554106,0.17594764730930357,3.2895473703920897,4.604473407227012,3.785425225645931,0.9513916371845854,3.0729707169935283,3.3069958395067065,3.2226874432494634,0.46503747484816893,0.20641478571255312,2.9721530872839597,3.0084690310233277,1.6594413485615667,1.9495904003123399,0.6514436092883491,1.9211553794956548,3.8246456921167993,1.736533535997129,1.4587976822171111,0.5717669797326985,0.7046598571543239,3.8459052116639714,2.4411791883645817,4.275465564402542,2.5964765774170653,1.6678439678500234,1.0540246559107092,0.9116839196375193,0.012617224482542877,3.3868143792694227,1.0729072681930696,3.3552504417570383,1.1436058711731156,0.6755094191620237,2.997612909552192,2.8060050917981627,0.908121286615976,0.5365628120165911,1.7092714612822857,1.7646620360137233,0.8182206351706545,0.9082054566425157,0.34053728779215864,2.9825785681838966,3.5948018929185475,0.29893193291257947,3.7822094562118647,2.2527572275673444,2.5408865937807534,0.1299117360909785,4.364179737640504,0.39729442750918165,1.1897631137885212,0.775261479641074,1.7457242645466142,0.3706390451623476,4.578748870110391,2.821144475731322,2.2271354134525536,1.5184575914775122,0.059605632548629384,0.9604647916809828,4.0697825900716715,3.816481611264957,4.041838264802786,0.3363071184344657,1.8084515953807356,1.8454022571008133,0.2687711297324369,3.7239165995064694,2.460425369813283,4.543707987828192,2.9624294345925395,2.9485930365975497,4.850412237232203,1.0564765301802836,1.864940734191557,1.7513647427916423,1.4968184914470728,1.6411600888968614,1.9926963466533476,2.7516451188777213,4.630631210473533,0.44794259659912794,2.129548652067077,4.564005715823219,1.5979407672932222,3.5914170658956026,4.117017266172258,0.9122997077502937,1.0359782736727685,3.9067645898421723,0.5046458813921306,2.3568972073239634,1.6730372869111354,0.7551332061619487,4.002570149252581,2.0343417857546395,0.03551215256062945,1.7717491675152808,4.579028868821705,4.042002839196614,4.90547484841464,0.38458598401346245,2.1333196779323993,0.802554836435313,0.7358082459544679,2.8070500488111714,3.572451890062085,0.975583777869512,2.705467000266312,2.412058818091356,2.2277025936958395,3.4098117398642946,1.5675441993753703,2.4641255688227712,2.089642429322515,3.0985469364592335,4.777700746290726,2.759942581779742,3.3674434697430944,0.684459793877209,3.4649766648401714,2.131307311898152,3.448214376053248,1.39977424947612,2.5292130190333104,2.555721190753447,2.1543309269895405,1.6312935739489387,4.1254794824404915,4.88280376088489,0.7338018372480282,0.6960702300135835,0.21796685267009508,2.7459480797123836,0.22348452668361274,1.0027501045926968,2.2676237113546405,3.350233321732138,4.707826938362185,4.944658980767378,0.9183983199496171,3.7937321608316976,1.6782690659304522,3.4895958971560903,0.9561667003185603,1.5709961935405958,0.31128659596763475,0.3392797488266408,1.0155674147770055,1.132438151650833,0.3660106386647921,0.5047059199065551,0.2017327958347992,4.730671750166907,4.935841830268575,2.8088381126659137,1.8239637922628726,0.31247591515233486,2.848359074994323,1.6942336415434944,4.8559398995575,0.8211935879001553,2.304421761457008,3.1862103107495896,4.680032516511865,3.2236126077232994,2.8902430498046074,3.3978593688012584,3.0359225480054963,2.144451595466178,1.4255356877134062,1.2383063896359026,2.725896882618354,0.2076712263312297,1.6866279921492688,2.537634247731969,4.332194154016481,2.774556716715092,2.62117497511552,0.6267635554083739,2.629778480364261,0.9545905717630021,2.1761194188291033,4.239022255672131,3.3727560489758868,2.3281022258695816,2.838987994441584,4.920475344190663,4.144508454456577,4.857588194373232,0.26919647996778817,4.255700249279646,1.3782325284631014,3.5897832661656026,3.7228343745001258,4.93414801682457,4.103144313168294,0.7973436525425803,0.6176003251738105,4.131657691900204,0.2638206494272699,3.2213760548105697,4.661120444386095,0.9713009327488265,3.363661830173077,2.0400807711522417,4.698510843554011,4.172112360903909,4.844003145163636,3.14061379296093,4.290747265549556,0.032812937889930005,4.273011642086944,4.273873329239525,4.635308506415531,2.9770001164831172,0.25430715099037715,4.980463142234235,3.831990674153354,3.6677970436132945,2.859325363090907,4.842615442332683,0.7109254127385878,0.4704769393078234,0.2895982741714598,1.3647412796372216,1.4494684277720538,3.607068913974256,4.564018968723929,3.2092744048192037,3.242895979682646,1.861441333412479,0.7794103249031792,1.0983184998082518,0.5774225223365104,3.3013564261664365,4.658775135817179,3.7637895100063434,4.296036830633421,3.268531866985367,1.6456533827575914,4.767527883429455,3.4628913235118617,2.035155595655611,2.0025196142300192,2.8424625264072914,3.351287024874595,2.4856638140319087,2.89944388634931,1.1358378880930031,3.109636858121434,2.4342723245241737,4.438954698742862,4.056471574839144,2.4474304665487523,2.971439196326874,1.5834201426743222,3.212333446901803,1.369737000978155,3.6678798489663644,4.450552831667895,3.8632582711790464,0.11418279556891786,4.351088528890604,3.740079123801795,2.1133381485935443,0.40722559726252494,2.2750331645520916,2.4666487328285003,2.2391116956052883,0.7872970854939354,0.16459521806459376,3.912823673508318,3.0660136976237706,0.1355085903410702,2.7457855140340603,1.35123673489427,2.236585815728973,3.4433491989671183,3.4721050691159547,2.600410429120563,4.77917086912695,2.8640114352671366,3.78554411740034,2.5558726060564716,0.54407281501895,4.438684597482786,0.3118145229988889,4.554916670706804,2.6297039799252153,2.117328524669614,0.9386477557958517,4.686623555859265,4.595267734855669,2.276469823110604,1.0840975914865947,0.5535661365971611,1.6050487122614343,0.3264020213120744,0.45027148411899365,0.16381219776321676,0.8257775598426775,1.9559991944858868,1.8900216009311432,1.3489042810844964,2.809147734624146,4.20850290984304,3.1631344288566545,3.340030332911721,2.7527283801538482,4.642029883971847,3.3320114899024644,0.6899344002604668,3.950534982518432,2.715780393052097,0.6653512716544918,3.325104974419202,0.6770257356944454,3.217198833829932,3.2903459281800798,4.603659767427702,2.0004759066697386,1.2179283647117267,4.038106067748579,2.6212216905211996,4.958672361386767,1.0525101399195513,0.6766314569289222,1.9798452717456372,3.2153884664768118,1.298734161171211,0.6844086064622712,1.570026393184707,0.6020394023249642,1.1764054298956983,3.4454689881818448,0.9191864132242322,0.04053738606788815,4.160900694311149,4.652070350732319,2.4625322877512557,4.202036089546365,2.6148849400521055,2.8915291852799374,0.9574309427407413,0.8917350808064062,2.6600184204625563,3.700400937178243,3.052810575080959,2.2946042550159507,4.5023492894081985,3.9890358426658445,3.550104530860374,2.4171608373298312,0.4867856853389507,0.22615802930330053,1.0134610185759307,2.9413006665668915,2.816720513024512,1.2339015999690806,2.7924341088769236,2.65799428262837,0.19365189219553547,3.0303350484140945,0.5154026318341309,3.0866236059215835,2.123346182889403,4.561992238193184,4.446605222631856,0.17476122951441408,4.1868437088051005,1.1240311925735846,0.6000548907744041,1.940743788905055,3.284730301637068,4.440479707715118,1.9063589551816273,0.05314920554140068,3.204394234360335,1.8749521471851516,2.1457189611782743,2.297116091628484,2.1818897238707216,4.8451017626611055,0.47387088757285034,3.799733027907571,0.157528722011121,2.11185701557579,1.0167357793496323,3.952362933489757,0.4981442234728428,0.024192357213991267,3.624671508554961,2.4905526680345336,2.6237438766657037,2.4459972146472317,1.3999676343860934,1.6073425213770198,4.077799312446947,3.423078572401701,0.9383487823698211,0.7017320477728939,2.5001099281084063,3.7620524112750067,0.4642053779316191,2.146633089487384,2.735904107533942,3.307069772685246,0.3936409513809691,3.811843866163831,4.8278331457663946,4.444703847737452,3.815789860084917,2.963887150533754,1.1784779342061968,3.2776444149405037,0.19223688686286766,2.9245025157264983,4.98280538765031,1.4719203287050298,3.645903439516285,3.657721249427801,0.8584264826833088,4.194511068695228,4.284505621276743,3.327746545615505,4.766493395949487,1.7172729737346615,0.2009834453901993,4.377683451761914,2.5599529748517993,3.939728753798591,2.552836019754535,4.922297440728248,0.5713755864276648,4.086529316301013,1.4294714942454723,4.113707617853681,0.9692737055575273,1.740138650583175,0.1957188415550304,3.364514943686878,2.1725181391464576,3.1960460183357533,2.635419009336374,0.03929173057454549,3.182112588316648,2.0157764076429463],"mu":[5.713241855253095,7.728131081359361,6.808320395586238,8.076855624196572,3.3372425636664804,4.29049211286034,3.9909250455669665,3.463327580325588,5.9833314752892335,0.9325955413534959,1.1600617146624193,8.464006860471793,3.734977294869062,9.77929898696745,6.593537407938792,3.626893694922866,4.937384522007255,5.354281042986695,1.2598942993296558,5.592552882234529,5.009857834808216,4.6961116152514375,1.447621306735567,8.882226368496385,0.5585649045860586,0.3151532842715121,2.1126784248185326,5.426838043702675,7.303170629621771,0.8382087593915366,5.753297555605988,3.720239611497771,3.1277605413814125,3.6191015661082093,3.0409460967860236,3.155344000990825,1.7200336373328295,1.7772416527939816,0.14372772769406295,9.48010503091598,7.795036039473169,1.4919682706178095,6.066582125999497,7.946455745017451,9.31316589999768,6.441245997949796,6.829362726350454,2.275276173280354,1.412333173968603,0.8079295903144179,4.974794066515546,7.383080153690045,5.675280242350658,5.686165121149374,7.762028775231098,9.078984255149408,6.24675418372882,2.879123870094489,4.2352276475911825,1.3408464335970005,4.289947783377275,6.991364143198274,1.2701290049714986,7.66178965550438,1.2757476907888066,3.2797272282055645,0.6616711463958969,3.1936889001011037,2.474442613586858,4.096497473936336,4.300824288887249,8.761476963156829,5.109525169755762,0.9612670484798347,7.537669706957084,7.919894831748389,5.534989280560241,8.672763696825639,3.8857652603785597,3.1033818426873627,8.677054843178274,4.413806235896391,8.889046365782713,0.9402430370084991,0.054493689145882485,1.0710619744641603,0.005384342943524079,4.627526090221375,6.436677740210898,4.842980032175865,0.2311307500910953,0.11058979980564931,1.6918936591761358,2.74873127466452,7.288947655051661,9.555371549909665,8.663282204303869,9.959524466387382,4.546052298459433,7.86386327083346,7.253372069441224,0.7147698565286698,3.9980230141078366,1.2633368095967223,1.5968015835834715,5.9348678402990345,4.896234926109861,0.022841555418997572,8.123154195792711,3.1090201398735906,8.133269558170738,9.54340695903316,8.377600938515833,6.23936679245822,4.971801914499128,2.1321061042251266,9.659983762989597,3.3182573487060307,3.173104314526254,3.3733959076247566,4.668165338327668,8.933592320499915,6.486417398770907,1.065727348544172,8.584853861401989,5.701161067914898,8.148898755150002,2.6648444615508105,4.227486835164173,5.824871039152608,8.200715074422128,3.4485283353841356,4.992200615038557,5.933035435191982,4.996379889547409,6.43943467073335,1.263533334907978,7.199861290727627,7.604495606194661,6.505005847273379,6.236331735100977,4.79790620613207,1.495001452355189,8.129342094314989,9.494416960386207,3.5781886226576898,0.6965477138955523,4.354242794498935,4.817534559114359,5.581737433846994,3.51521819621476,9.809102482688814,7.783567623096735,9.917074914426692,2.384205348292714,1.9260317927713655,7.604266608067187,0.048097435421528,0.09803963410943695,6.405491299686437,8.663604500447843,0.13631247717416084,1.442623286698288,4.048327095719624,1.5279100890693176,1.892571123103075,2.450700202339171,3.986725325696705,5.203119940069949,9.203626063563624,6.601220709878124,5.818872245053635,7.850450730328136,9.606541644346809,9.609590676115564,8.260988042430428,0.13839422423248537,4.132076935412057,3.0575338138555264,9.534753047780162,0.20239067276346168,0.9689365192208266,0.24856204838509477,2.811522308315235,9.570476353402963,4.725389318493924,4.208052573495122,8.361435969056629,1.7132677118945683,1.2434569949513996,0.00240358599279622,2.568099514735025,6.480356590261307,2.619579137594692,9.087397655262642,8.156405361823042,9.522424017292675,5.996235177788116,2.784752040423033,9.028138069549305,1.546535465199197,2.7266202800394446,4.240009154784261,7.495161417077199,1.7672296561710543,9.291727390726546,5.828086390043965,1.768369321380976,5.512005810377585,5.753500993478551,0.9681444990314247,0.7190070275297789,0.024504945083039242,6.286633226493013,2.4241302373551066,5.732703730061155,9.629722655097815,3.926954195821808,7.1003797406787434,8.974605446339073,3.6821098077084624,2.109602124002823,1.7703699917701088,5.759220580326703,0.9305610942859177,4.641636450588775,1.6227935840286767,0.18142800513409663,9.06430485427978,7.635890002190299,5.750905105069284,9.789795681602595,2.2274101900592247,9.602548188040753,7.76474875254074,9.739306155678067,0.5018463789289385,5.055274215665393,7.0068942894470565,0.3799172180208221,7.407463709774687,9.78838001992129,0.17700172513479995,3.1935447298218933,5.760194025195093,8.866356564533701,5.881944033600927,0.37463800585173956,1.3653903098476206,0.613602090975085,9.840892058227668,0.44937615594125235,9.331403748331322,0.27982639872419446,7.273885708618197,9.215589759347061,1.2354587126073646,5.257188392795569,2.573114711680442,7.6244929228534435,5.786431886719052,8.723990805517177,8.667405080908146,1.5229938541921206,5.640509063512065,3.175207601800125,6.460742629796179,5.063898772955273,1.3047014574314386,7.5978801637153275,0.23324459636696604,5.132173185629014,2.815535289724451,7.153728303951303,7.304051629802045,6.823135719281089,2.912462092036132,2.675765130806731,3.296097439463046,9.438583433664116,5.791532354888476,9.458246321656015,7.8331968125204625,3.2147122195823097,1.233878511927342,6.977016638793982,3.482944555844907,2.44272273690612,3.2950959491618836,7.072430893146029,5.033719322136852,1.3831777688629288,0.7180869065802931,1.094661324574553,0.36353507808624563,1.3515335818025531,6.904695115251767,2.6500890597061577,1.621985509044852,8.725010151792016,8.861644085800798,4.366908776588581,2.7594161907105574,2.385470018199427,7.099189333917096,6.088407930449056,8.10561052256566,7.646562626842943,8.556480823883794,4.145005735054728,8.517359163042071,3.1323578169026267,3.6539350123184966,6.980086433291701,7.021585755848562,3.5473217271196833,0.2251265422304538,4.652834081017538,9.492881329811842,9.13153560501547,3.4887107016936003,9.807420118352603,1.226288025153044,2.5743965464759966,3.7774535344088633,7.691580830069862,2.6689989355193244,6.685821786856174,2.5733074942585366,1.3713987902732527,9.955503875499565,0.7650219572918826,5.974699896679705,0.1297393168472749,8.282104011022781,7.747663630480773,0.9012411794041286,4.129663716458827,0.9032421593064655,5.853626072047997,6.733599200610094,6.57556870709564,1.8898639145605123,4.630136638043267,2.983726012187775,8.478959634756329,0.9765450128982867,6.511534857496802,7.284542605218853,5.378260786914013,2.800085777479673,7.737983008183777,3.701061284521563,0.09102224934371295,3.934770618708874,1.7938998454473354,8.290547693870707,6.21070626586498,6.8852243136284885,0.19837047855420842,7.894816108619793,8.131095234334325,0.6809097499665784,8.436858276499404,0.1081653319701581,4.479512695243137,5.010259632397456,3.2046290669684674,0.2575774251807572,3.163164732834145,5.82467218974279,2.653853527270238,6.519506271667441,9.83850724829985,3.3105947434104,8.967822006691451,9.671266626073699,8.685611270278565,5.727117355921257,9.798021338538023,3.579649753267653,2.6743950723755794,9.130048401151651,6.72523600887176,2.4044610337137806,5.936394936254197,1.5199308127080813,4.920457016501681,0.964001062638975,4.302811294790192,3.0399294198490767,8.39607932522085,5.831484354730261,3.7397932095127984,0.2847984239862744,5.488363232563365,5.077390225545888,3.561390201252681,7.2794385466492395,2.5139956645334127,1.6125261423998172,0.7281331910820255,6.8956555214028,4.573329671525954,2.708254694632315,7.222232945812028,6.951899306757348,3.2073336838051603,0.7126080460018214,5.494718974024839,2.176607861485962,9.076169494220972,0.8206940510982186,1.1912231928866213,1.8135390346658897,9.123718963095103,2.0130094393939313,1.9685187183818065,8.012219787055017,1.3090184853159093,6.979194729583167,7.989146707225487,7.500208312468171,8.248000064642637,5.740215104144289,6.974575529769316,0.4469735033527389,3.0091103817223197,3.5271225175393806,7.2933301643190624,5.216679979812318,9.992577305578367,8.334497726241265,3.482945508815438,9.123085641656385,8.109384551167453,2.2424802313557635,2.483338663595913,6.687831660010954,0.2930376210351904,1.2787116228716822,2.5748448641341337,6.758335495726026,8.43862053234105,5.7595283667805885,1.7289369452984271,4.603340831924092,2.40637251145301,1.6758348299664827,8.158601679184871,1.2950426513831403,8.420448615172962,4.493949880109089,6.903809036258717,1.1984638786143242,4.287504806814779,4.646527777725438,0.19761449527526453,2.967611330224744,3.236499128869854,9.275974126689121,7.359494342327202,7.82600329928928,9.295280098343067,4.5799791073628215,8.682320147512591,0.9449391257779927,3.9405392230683844,2.9871018157264806,3.709537130672269,8.527455041095113,1.2564396865604355,3.148632150871289,6.029589589100226,8.044097008240055,5.86692760172252,2.742856094667574,8.885956743051581,3.7298563754812064,2.4597050032338075,9.634379296221047,7.952233484223809,9.033455471031132,9.995854395673051,5.428970461350229,7.8192463366447695,5.322983671554433,4.033643723614411,6.252004164157066,0.5486667509617371,9.681766441986701,0.7009141202893332,8.57523784322894,8.682668176583775,4.535815573536677,3.64676691482243,0.2953378146158192,0.7397620173547703,8.742189541053474,4.146035873746374,4.7355321905240455,0.12521073385281856,4.735402200979388,3.257576935475335,6.521141158961172,4.469084261353178,4.61440189931372,7.697966359194252,6.845149842887452,4.349447288405681,5.682362733355248,0.2182588123328788,5.626305736767976,2.620491302858734,0.5933703859757022,5.84571559160171,6.506509165061363,9.343130863732963,1.8975728149760673,1.1423608362795257,3.0433578407005935,6.537535928366875,7.290008943842827,2.071761997896713,6.250520545642988,3.3922784520999927,5.210430755373984,3.7188124441543735,1.5146927233742646,8.538114767901078,4.577718268956643,5.533763711230943,3.993934851768879,9.609559415563522,3.2420297082176153,0.7240534911761443,6.674231277776032,0.047306528603756615,8.007736412793792,4.1481209216516035,3.829655599491595,8.993010846943704,6.483670211051491,9.866578083186429,0.9472973938831886,1.9580822425775568,5.542887908484895,2.6161096760405145,0.9844413259950247,1.816351353012371,7.852632053453609,6.3951284338271925,0.3151741415612941,3.5347957296652055,0.9649794818204227,3.18188907547182,2.32869413145679,4.39287766164417,1.3183453035709602,0.8051678236045712,5.667497589346842,6.162868504668295,7.467621946841305,5.885934497585996,0.12946751619960173,0.3310476406849161,5.396458071443126,2.864452435623661,3.7294178676532974,7.097965262296125,4.824360944498527,8.503197967354962,0.4202803504452368,3.188702301317894,1.0190078432271643,5.334481157356521,3.2328618439141965,5.405599094991469,2.935141469336373,2.693983442933039,8.04924496692709,7.9537174119143135,5.565615918532436,1.810598741441638,7.892164504318371,6.453312298927385,3.8640426826249774,2.6036921718986905,5.6980751678312425,4.57983501697623,3.7497003228008707,2.111827051748938,4.377025654313725,0.701533720792995,5.147262756649404,5.092734822574561,7.973386816752499,2.557331708230415,5.438024934872841,0.017238393995462342,0.17582657003219815,1.7616492985494214,6.77567098048987,7.845925362803388,8.941177884742755,6.224744865221883,0.9216845664463214,9.945127919863639,8.037361499048037,4.156805916958142,1.745017410071239,4.503886679627154,3.045526205820901,8.270283353920622,4.425578518648205,7.600961255781611,1.5892693428073357,3.1632090195620277,8.11145622020095,5.615966076591857,6.2334463262399975,7.125973376448817,9.358503230932328,6.4265843082084695,5.567697133992033,5.080487673189181,0.8541726017322482,5.862121601910695,5.804268743118664,7.495335275193864,6.614002782706272,5.081360455848438,6.124604554534134,4.605455035185377,6.793280847571417,1.3908279403180468,5.687083562051192,3.3252898886088333,8.174893115771296,4.972523728297271,1.0362137974310626,1.4688194149793987,2.0103907487079686,9.258414277653298,0.5601697768458602,4.049418412567409,2.0589727384328937,5.019203256303819,1.6918786693549759,2.42514538133886,3.696278548958678,2.710277937908223,9.890694817284553,7.038523258842908,3.741108306492691,5.93018992066328,6.423100068991894,7.981284557857866,5.655452788221815,2.063617804939366,2.646939005038067,6.599867493379605,2.5639430906256133,3.9763263573928476,4.221439913438418,6.561306874335626,0.3695466414218629,0.5540084705957438,0.23306989229153086,5.764267735588929,7.283446828874762,7.073046247458894,2.739870526465862,4.453687920339988,4.131736907157196,5.322166986646626,4.094426037547844,0.1356478224708635,4.32828711721974,4.464075135313024,0.8891441932861399,0.3154054269589346,1.4425469560887527,8.187169336452435,5.681306886247475,5.461111098616631,0.8012579008977161,2.1632244829747327,6.327474695363096,3.554193483961645,3.838887645225264,5.977437239824617,3.3715943867814757,8.284781141262084,2.001709384459327,9.157934825349557,2.2499995787177807,2.0566064031396447,7.093266843476178,9.521366724913545,7.566036420221398,7.973304024562098,7.523436054647754,4.936966988018492,9.233088908381678,3.07742959476188,1.1588117192875425,8.673706062418338,6.266773396267713,5.99186638696684,8.688726598266756,0.2644283464563535,3.1764130405701163,5.716101941039941,6.019173407336154,0.46760931675410955,3.7314059648262154,4.866496645985823,3.055460725794501,2.5204967213020946,2.492616561915142,5.1980203040907575,6.301235462512893,0.644737736860943,2.928489335349229,5.355197460706885,8.646994326946524,0.4037800089639676,9.122962249459217,9.601007143566209,5.394879070179637,7.413241354199361,5.049137501577066,8.393027198224987,9.862839779702659,2.7480902759727366,2.4352310941422384,6.498902258765713,1.47088128961532,7.475103816246986,8.59757681117383,4.184388583097909,2.456537395087899,2.8372185191824584,6.959358222026141,1.5960690639367292,1.6102076001113352,8.45578158106214,0.8194195287894379,9.401960431473405,2.3762592417893202,4.471430828810772,7.25145889946374,9.85403868117859,7.261917494590728,6.807881215551901,9.197378057688555,5.94033353137357,1.8015698810721514,4.2856136353621155,0.12496582729515371,0.6478000795563954,5.641930083999512,5.8170239776976445,8.586751617919742,2.9060518521550427,1.8690289501955704,3.799279277863532,2.102062961002653,4.159692716619954,6.91468564154251,6.979548987510709,8.325095915643534,7.052143608052899,6.301332705255341,6.109449739654358,8.803001530177653,0.8658711090036109,6.113423988345081,2.9584892481949177,6.331571412814673,5.002443739405589,4.652874726370846,4.261956909721405,6.8547617577899285,0.05229939184971277,8.334711548619145,2.673463833779195,8.728947130897282,9.230597419732604,3.3994975563826246,8.675707155521328,7.648713705853856,6.929956366101829,9.876065313158676,5.917079839955102,7.960712391498086,1.2541479468927452,5.084383015845351,3.8680790454812297,6.782666697331889,6.519212350787664,3.618164829536754,3.796100312617481,8.599062748205375,8.95719390934768,9.013189822473146,1.3677347264734485,4.31491962397168,2.4868877634240683,0.5458192590918176,1.4679877727766133,0.1024624736940849,7.6292772264448505,0.8643657118944925,6.961149285129313,4.162722598709687,7.945566776167161,1.9347621519572034,5.948670448232072,4.930187388507637,2.848279903979598,2.0576090065264485,7.478228799529405,9.61405623609425,3.6883950619422468,7.256745866700944,2.0975036166306515,4.06988354028889,1.456860012153156,5.426887689730149,0.05840175702806594,5.030768843066338,8.46242511757071,4.2072177321311095,5.172421030248888,6.968428588212349,5.257476601410613,2.8154512695692757,9.161582576312991,4.949515189755873,1.886440508841838,9.729008178333851,2.3367722201081853,3.3387149517769665,8.790556400781735,4.207190585991459,6.601148003037416,3.223622968672717,1.0266926488324146,0.9184702499188302,2.651220807013679,1.5713397988235456,6.299404976763063,6.163692074034577,1.6702029297929677,9.792776171362503,3.6335697267731115,7.284961160787762,7.293875931479395,4.566493555810959,2.1654941242792902,6.910407779007787,9.116748948832695,2.3288052129754133,8.24040466720403,8.918031517342522,0.011008803344771945,3.801184098864332,4.3945482877150654,3.37562222067068,3.782997505762684,9.695547461447799,6.184501333617005,4.999258529022919,8.644971153495964,9.389397773015615,1.8804491886854424,2.4707781369104564,7.119105896344697,5.156002166942198,8.864487139356786,9.764874493993858,6.591938240250039,4.17408653093066,0.000991670380590115,2.0980724356980707,7.976536826299652,4.8117832643319165,6.6543865072394315,8.729190495094683,7.296152352041423,1.2372044906464108,2.6176807539502045,4.097186375005199,9.222366901026733,7.609401270506684,3.457836289883436,6.488282952503466,7.688100500757833,5.1529414144165075,5.399228315554588,8.381268723459883,7.945148827134039,8.517408951449529,8.84283470467371,1.1518026817702043,0.43566623988708253,1.9896027296959429,3.9893080804667957,7.514981816865092,5.115356580179251,0.6379529640572468,9.18513002941615,0.038270013863543895,2.364078147710056,7.888285286770767,5.959622126415434,2.050316465240032,0.5396886163568282,7.655617366966634,9.065774453211603,0.05202010870423601,4.70902909076713,9.253107712985148,6.907882406408454,7.523701861355034,6.181682549547722,6.624763317144384,6.988134510179229,5.998338552340106,4.443194140922873,6.422796120022793,0.7323045245613957,3.2884274006969183,8.59672368647301,7.88903565877261,7.148304101867968,5.747705340135703,3.4218372390138208,7.726736985976556,8.363227468203242,2.9483331746321206,6.929735334386948,3.241699647935752,2.523721366315095,3.6767637798632213,1.6655593049728212,1.1568517732058003,5.518735807204152,5.562024945071897,8.675666943644302,4.382382788876513,0.2946736399376837,8.762175864885116,9.683633849101454,7.965413078085122,6.217902564808688,9.251536197375005,3.54264738128905,5.242700329198469,1.7065860494822593,3.7402216808907696,0.1279869160413205,3.637622684737556,5.714015117803413,8.036297637841336,3.3979968551489903,6.579162179342315,5.3408005513123324,6.270424940449681,6.018671045819319,3.8076464040636604,4.062692405071429,8.706105530892073,9.098482430237787,6.759399107556689,7.327266713843694,6.583866583142628,5.607938941107211,6.213138806635314,1.3305036256241909,3.983706556259652,1.8808525070937132,5.77350548447503,2.226060154188123,6.431019270195777,1.2405966070750352,0.10701682223740239,4.287488874355841,3.7437744597482636,1.582939655439275,0.44187437449811906,9.469650486444603,3.571082039402622,5.825480373162826,3.6006057337580932,6.702423582764023,3.681980149723725,6.600752029537917]}

},{}],109:[function(require,module,exports){
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

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, -1.0 );

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

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 2.0, 0.0 );

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to mu' );

	y = logcdf( 3.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x greater than mu' );

	y = logcdf( 1.0, 2.0, 0.0 );
	t.equal( y, NINF, 'returns -Infinity for x smaller than mu' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], s[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var x;
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], s[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], s[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/logcdf/test/test.factory.js")
},{"./../lib/factory.js":102,"./fixtures/julia/large_variance.json":106,"./fixtures/julia/negative_mean.json":107,"./fixtures/julia/positive_mean.json":108,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":264}],110:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/logcdf/test/test.js")
},{"./../lib":103,"tape":264}],111:[function(require,module,exports){
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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `s`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `s`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
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

tape( 'if provided `s=0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to mu' );

	y = logcdf( 3.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x greater than mu' );

	y = logcdf( 1.0, 2.0, 0.0 );
	t.equal( y, NINF, 'returns -Infinity for x smaller than mu' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large variance ( = large `s` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/logcdf/test/test.logcdf.js")
},{"./../lib":103,"./fixtures/julia/large_variance.json":106,"./fixtures/julia/negative_mean.json":107,"./fixtures/julia/positive_mean.json":108,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":264}],112:[function(require,module,exports){
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

},{"./is_number.js":115}],113:[function(require,module,exports){
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

},{"./is_number.js":115,"./zero_pad.js":119}],114:[function(require,module,exports){
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

},{"./main.js":117}],115:[function(require,module,exports){
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

},{"./format_double.js":112,"./format_integer.js":113,"./is_string.js":116,"./space_pad.js":118,"./zero_pad.js":119}],118:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{"./main.js":121}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{"./main.js":124}],123:[function(require,module,exports){
arguments[4][116][0].apply(exports,arguments)
},{"dup":116}],124:[function(require,module,exports){
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

},{"./is_string.js":123,"@stdlib/string/base/format-interpolate":114,"@stdlib/string/base/format-tokenize":120}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":126}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":128}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":130}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":134}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{"./define_property.js":132}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":131,"./has_define_property_support.js":133,"./polyfill.js":135}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":122}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":137,"./polyfill.js":138,"@stdlib/assert/has-tostringtag-support":20}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":139}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":139,"./tostringtag.js":140,"@stdlib/assert/has-own-property":16}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":125}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){

},{}],143:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"dup":142}],144:[function(require,module,exports){
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
},{"base64-js":141,"buffer":144,"ieee754":247}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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
},{"_process":254}],147:[function(require,module,exports){
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

},{"events":145,"inherits":248,"readable-stream/lib/_stream_duplex.js":149,"readable-stream/lib/_stream_passthrough.js":150,"readable-stream/lib/_stream_readable.js":151,"readable-stream/lib/_stream_transform.js":152,"readable-stream/lib/_stream_writable.js":153,"readable-stream/lib/internal/streams/end-of-stream.js":157,"readable-stream/lib/internal/streams/pipeline.js":159}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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
},{"./_stream_readable":151,"./_stream_writable":153,"_process":254,"inherits":248}],150:[function(require,module,exports){
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
},{"./_stream_transform":152,"inherits":248}],151:[function(require,module,exports){
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
},{"../errors":148,"./_stream_duplex":149,"./internal/streams/async_iterator":154,"./internal/streams/buffer_list":155,"./internal/streams/destroy":156,"./internal/streams/from":158,"./internal/streams/state":160,"./internal/streams/stream":161,"_process":254,"buffer":144,"events":145,"inherits":248,"string_decoder/":263,"util":142}],152:[function(require,module,exports){
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
},{"../errors":148,"./_stream_duplex":149,"inherits":248}],153:[function(require,module,exports){
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
},{"../errors":148,"./_stream_duplex":149,"./internal/streams/destroy":156,"./internal/streams/state":160,"./internal/streams/stream":161,"_process":254,"buffer":144,"inherits":248,"util-deprecate":272}],154:[function(require,module,exports){
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
},{"./end-of-stream":157,"_process":254}],155:[function(require,module,exports){
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
},{"buffer":144,"util":142}],156:[function(require,module,exports){
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
},{"_process":254}],157:[function(require,module,exports){
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
},{"../../../errors":148}],158:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],159:[function(require,module,exports){
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
},{"../../../errors":148,"./end-of-stream":157}],160:[function(require,module,exports){
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
},{"../../../errors":148}],161:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":145}],162:[function(require,module,exports){
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

},{"./":163,"get-intrinsic":238}],163:[function(require,module,exports){
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

},{"es-define-property":223,"es-errors/type":229,"function-bind":237,"get-intrinsic":238,"set-function-length":258}],164:[function(require,module,exports){
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

},{"./lib/is_arguments.js":165,"./lib/keys.js":166}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],167:[function(require,module,exports){
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

},{"es-define-property":223,"es-errors/syntax":228,"es-errors/type":229,"gopd":239}],168:[function(require,module,exports){
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

},{"define-data-property":167,"has-property-descriptors":240,"object-keys":252}],169:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],170:[function(require,module,exports){
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

},{"./ToNumber":201,"./ToPrimitive":203,"./Type":208}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":216,"../helpers/isNaN":217,"../helpers/isPrefixOf":218,"./ToNumber":201,"./ToPrimitive":203,"es-errors/type":229,"get-intrinsic":238}],172:[function(require,module,exports){
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

},{"call-bind/callBound":162,"es-errors/type":229}],173:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":231}],174:[function(require,module,exports){
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

},{"./DayWithinYear":177,"./InLeapYear":181,"./MonthFromTime":191,"es-errors/eval":224}],175:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":222,"./floor":212}],176:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":212}],177:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":175,"./DayFromYear":176,"./YearFromTime":210}],178:[function(require,module,exports){
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

},{"./modulo":213}],179:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":220,"./IsAccessorDescriptor":182,"./IsDataDescriptor":184,"es-errors/type":229}],180:[function(require,module,exports){
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

},{"../helpers/timeConstants":222,"./floor":212,"./modulo":213}],181:[function(require,module,exports){
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

},{"./DaysInYear":178,"./YearFromTime":210,"es-errors/eval":224}],182:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":220,"es-errors/type":229,"hasown":246}],183:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":249}],184:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":220,"es-errors/type":229,"hasown":246}],185:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":182,"./IsDataDescriptor":184,"./IsPropertyDescriptor":186,"es-errors/type":229}],186:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":220}],187:[function(require,module,exports){
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

},{"../helpers/isFinite":216,"../helpers/timeConstants":222}],188:[function(require,module,exports){
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

},{"../helpers/isFinite":216,"./DateFromTime":174,"./Day":175,"./MonthFromTime":191,"./ToInteger":200,"./YearFromTime":210,"./floor":212,"./modulo":213,"get-intrinsic":238}],189:[function(require,module,exports){
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

},{"../helpers/isFinite":216,"../helpers/timeConstants":222,"./ToInteger":200}],190:[function(require,module,exports){
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

},{"../helpers/timeConstants":222,"./floor":212,"./modulo":213}],191:[function(require,module,exports){
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

},{"./DayWithinYear":177,"./InLeapYear":181}],192:[function(require,module,exports){
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

},{"../helpers/isNaN":217}],193:[function(require,module,exports){
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

},{"../helpers/timeConstants":222,"./floor":212,"./modulo":213}],194:[function(require,module,exports){
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

},{"./Type":208}],195:[function(require,module,exports){
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


},{"../helpers/isFinite":216,"./ToNumber":201,"./abs":211,"get-intrinsic":238}],196:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":222,"./DayFromYear":176}],197:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":222,"./modulo":213}],198:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],199:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":201}],200:[function(require,module,exports){
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

},{"../helpers/isFinite":216,"../helpers/isNaN":217,"../helpers/sign":221,"./ToNumber":201,"./abs":211,"./floor":212}],201:[function(require,module,exports){
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

},{"./ToPrimitive":203,"call-bind/callBound":162,"safe-regex-test":257}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":232}],203:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":234}],204:[function(require,module,exports){
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

},{"./IsCallable":183,"./ToBoolean":198,"./Type":208,"es-errors/type":229,"hasown":246}],205:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":238}],206:[function(require,module,exports){
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

},{"../helpers/isFinite":216,"../helpers/isNaN":217,"../helpers/sign":221,"./ToNumber":201,"./abs":211,"./floor":212,"./modulo":213}],207:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":201}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":175,"./modulo":213}],210:[function(require,module,exports){
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

},{"call-bind/callBound":162,"get-intrinsic":238}],211:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":238}],212:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],213:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":219}],214:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":222,"./modulo":213}],215:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":170,"./5/AbstractRelationalComparison":171,"./5/Canonicalize":172,"./5/CheckObjectCoercible":173,"./5/DateFromTime":174,"./5/Day":175,"./5/DayFromYear":176,"./5/DayWithinYear":177,"./5/DaysInYear":178,"./5/FromPropertyDescriptor":179,"./5/HourFromTime":180,"./5/InLeapYear":181,"./5/IsAccessorDescriptor":182,"./5/IsCallable":183,"./5/IsDataDescriptor":184,"./5/IsGenericDescriptor":185,"./5/IsPropertyDescriptor":186,"./5/MakeDate":187,"./5/MakeDay":188,"./5/MakeTime":189,"./5/MinFromTime":190,"./5/MonthFromTime":191,"./5/SameValue":192,"./5/SecFromTime":193,"./5/StrictEqualityComparison":194,"./5/TimeClip":195,"./5/TimeFromYear":196,"./5/TimeWithinDay":197,"./5/ToBoolean":198,"./5/ToInt32":199,"./5/ToInteger":200,"./5/ToNumber":201,"./5/ToObject":202,"./5/ToPrimitive":203,"./5/ToPropertyDescriptor":204,"./5/ToString":205,"./5/ToUint16":206,"./5/ToUint32":207,"./5/Type":208,"./5/WeekDay":209,"./5/YearFromTime":210,"./5/abs":211,"./5/floor":212,"./5/modulo":213,"./5/msFromTime":214}],216:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":217}],217:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],218:[function(require,module,exports){
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

},{"call-bind/callBound":162}],219:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],220:[function(require,module,exports){
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

},{"es-errors/type":229,"hasown":246}],221:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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

},{"get-intrinsic":238}],224:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],225:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],226:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],227:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],228:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],229:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],230:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],231:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":229}],232:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":233,"./RequireObjectCoercible":231}],233:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],234:[function(require,module,exports){
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

},{"./helpers/isPrimitive":235,"is-callable":249}],235:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":236}],238:[function(require,module,exports){
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

},{"es-errors":225,"es-errors/eval":224,"es-errors/range":226,"es-errors/ref":227,"es-errors/syntax":228,"es-errors/type":229,"es-errors/uri":230,"function-bind":237,"has-proto":241,"has-symbols":242,"hasown":246}],239:[function(require,module,exports){
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

},{"get-intrinsic":238}],240:[function(require,module,exports){
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

},{"es-define-property":223}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{"./shams":243}],243:[function(require,module,exports){
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

},{}],244:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":243}],245:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":237}],246:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":237}],247:[function(require,module,exports){
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

},{}],248:[function(require,module,exports){
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

},{}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
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

},{"call-bind/callBound":162,"has-tostringtag/shams":244}],251:[function(require,module,exports){
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

},{"./isArguments":253}],252:[function(require,module,exports){
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

},{"./implementation":251,"./isArguments":253}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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

},{}],255:[function(require,module,exports){
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
},{"_process":254,"through":270,"timers":271}],256:[function(require,module,exports){
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

},{"buffer":144}],257:[function(require,module,exports){
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

},{"call-bind/callBound":162,"es-errors/type":229,"is-regex":250}],258:[function(require,module,exports){
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

},{"define-data-property":167,"es-errors/type":229,"get-intrinsic":238,"gopd":239,"has-property-descriptors":240}],259:[function(require,module,exports){
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

},{"es-abstract/es5":215,"function-bind":237}],260:[function(require,module,exports){
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

},{"./implementation":259,"./polyfill":261,"./shim":262,"define-properties":168,"function-bind":237}],261:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":259}],262:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":261,"define-properties":168}],263:[function(require,module,exports){
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
},{"safe-buffer":256}],264:[function(require,module,exports){
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
},{"./lib/default_stream":265,"./lib/results":267,"./lib/test":268,"_process":254,"defined":169,"through":270,"timers":271}],265:[function(require,module,exports){
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
},{"_process":254,"fs":143,"through":270}],266:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":254,"timers":271}],267:[function(require,module,exports){
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
},{"_process":254,"events":145,"function-bind":237,"has":245,"inherits":248,"object-inspect":269,"resumer":255,"through":270,"timers":271}],268:[function(require,module,exports){
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
},{"./next_tick":266,"deep-equal":164,"defined":169,"events":145,"has":245,"inherits":248,"path":146,"string.prototype.trim":260}],269:[function(require,module,exports){
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

},{}],270:[function(require,module,exports){
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
},{"_process":254,"stream":147}],271:[function(require,module,exports){
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
},{"process/browser.js":254,"timers":271}],272:[function(require,module,exports){
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
},{}]},{},[109,110,111]);
