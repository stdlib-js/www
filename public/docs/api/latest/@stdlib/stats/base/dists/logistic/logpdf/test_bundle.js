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

},{"@stdlib/utils/native-class":139}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":139}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":139}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":139}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":83}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":87,"@stdlib/number/float64/base/get-high-word":91,"@stdlib/number/float64/base/to-words":100}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":66,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/trunc":81}],69:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":48,"@stdlib/constants/float64/max-base2-exponent-subnormal":47,"@stdlib/constants/float64/min-base2-exponent-subnormal":49,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/copysign":64,"@stdlib/number/float64/base/exponent":85,"@stdlib/number/float64/base/from-words":87,"@stdlib/number/float64/base/normalize":94,"@stdlib/number/float64/base/to-words":100}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_p.js":76,"./polyval_q.js":77,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58,"@stdlib/number/float64/base/get-high-word":91,"@stdlib/number/float64/base/set-high-word":97}],76:[function(require,module,exports){
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

},{"./polyval_lp.js":80,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/number/float64/base/get-high-word":91,"@stdlib/number/float64/base/set-high-word":97}],80:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":70}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":84}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":91}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":89}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":88,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":90,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":93,"./main.js":95,"@stdlib/utils/define-nonenumerable-read-only-property":132}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":93}],96:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":90}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":96,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":101,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":99,"./main.js":102,"@stdlib/utils/define-nonenumerable-read-only-property":132}],101:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":88}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":99}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the natural logarithm of the probability density function
*
* @example
* var logpdf = factory( 5.0 );
*
* var y = logpdf( 0.0 );
* // returns -Infinity
*
* y = logpdf( 5.0 );
* // returns Infinity
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (logPDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of the probability density function
	*
	* @example
	* var y = logpdf( 10.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/utils/constant-function":130}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution logarithm of probability density function (logPDF).
*
* @module @stdlib/stats/base/dists/degenerate/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/degenerate/logpdf' );
*
* var y = logpdf( 2.0, 0.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/logpdf' ).factory;
*
* var logPDF = factory( 10.0 );
*
* var y = logPDF( 10.0 );
* // returns Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":103,"./main.js":105,"@stdlib/utils/define-nonenumerable-read-only-property":132}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} natural logarithm of probability density function
*
* @example
* var y = logpdf( 2.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 3.0, 3.0 );
* // returns Infinity
*
* @example
* var y = logpdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*/
function logpdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : NINF;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/logpdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a logistic distribution.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 10.0, 2.0 );
* var y = logpdf( 10.0 );
* // returns ~-2.079
*
* y = logpdf( 5.0 );
* // returns ~-3.351
*/
function factory( mu, s ) {
	var ls;
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	ls = ln( s );
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a logistic distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( -1.2 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var az;
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x === NINF ) {
			return NINF;
		}
		z = ( x - mu ) / s;
		az = -abs( z );
		return az - (2.0 * log1p( exp( az ) )) - ls;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"@stdlib/math/base/special/exp":67,"@stdlib/math/base/special/ln":74,"@stdlib/math/base/special/log1p":78,"@stdlib/stats/base/dists/degenerate/logpdf":104,"@stdlib/utils/constant-function":130}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Logistic distribution logarithm of probability density function (PDF).
*
* @module @stdlib/stats/base/dists/logistic/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/logistic/logpdf' );
*
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.254
*
* var mylogpdf = logpdf.factory( 10.0, 2.0 );
* y = mylogpdf( 10.0 );
* // returns -2.079
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":106,"./main.js":108,"@stdlib/utils/define-nonenumerable-read-only-property":132}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a logistic distribution with location parameter `mu` and scale parameter `s` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.254
*
* @example
* var y = logpdf( -1.0, 4.0, 2.0 );
* // returns ~-3.351
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
*
* @example
* var y = logpdf( 2.0, 8.0, 0.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 8.0, 8.0, 0.0 );
* // returns Infinity
*/
function logpdf( x, mu, s ) {
	var az;
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( s ) ||
		s < 0.0
	) {
		return NaN;
	}
	if ( x === NINF ) {
		return NINF;
	}
	if ( s === 0.0 ) {
		return ( x === mu ) ? PINF : NINF;
	}
	z = ( x - mu ) / s;
	az = -abs( z );
	return az - (2.0 * log1p( exp( az ) )) - ln( s );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"@stdlib/math/base/special/exp":67,"@stdlib/math/base/special/ln":74,"@stdlib/math/base/special/log1p":78}],109:[function(require,module,exports){
module.exports={"expected":[-3.207407604770377,-4.353498850642301,-3.097480206032412,-3.787015748477468,-4.088104639445388,-4.1669907089950735,-1.9508227612934586,-3.6283301366246152,-4.1860076127877885,-4.032285495187271,-2.6689027840768413,-3.2207247171045728,-3.6165791941144305,-4.279208059658468,-3.5484997844439046,-4.362461256444691,-3.0618589363858244,-3.7894210081031683,-3.625663248172807,-3.560842385818291,-4.25089013938155,-2.8016929085232265,-4.0887902663972,-4.017028450657199,-4.299938479679486,-3.5522412122780715,-2.1685018021213516,-4.114812490494738,-4.012247568985995,-4.338685724027937,-3.768583853678228,-4.168127688831475,-1.8819633272845724,-3.2071847278322125,-4.286540161219746,-2.9241240896220018,-3.399350595477374,-3.705287487383385,-3.58596612362585,-3.859861479274858,-2.064890469862994,-13.02963725005977,-3.806003346856706,-3.352697206217379,-1.8105303976278975,-3.0812934130265024,-4.309595696811298,-2.2092356965065503,-3.7980601220536965,-4.251329492010954,-3.3702536138622294,-4.361238935768989,-4.042025154211793,-3.18364734818791,-2.4311358853963263,-4.275273162805082,-3.8677145371985877,-3.4012845477613407,-3.875294310211886,-4.04548021993783,-3.4270375387927126,-3.913569666252978,-3.7526957818250337,-4.262445410031916,-2.2939871729027668,-2.9826987606399937,-3.172626727895225,-3.8059971459366784,-4.354908529948943,-3.5072673568706247,-4.121801653184692,-3.742590770224768,-4.129394941158897,-3.5200655957492173,-3.941682182026807,-3.5836432327352656,-3.3717623926001563,-4.360831276890906,-2.249837650193608,-4.061612742850494,-4.246745464345626,-0.6354984637445265,-2.860607096975092,-3.917616914456806,-3.7369717733930914,-3.633508482544455,-2.9400480368730637,-2.839314865150431,-3.5697650666270335,-3.0554979256567165,-0.6420347445753346,-1.108440122037004,-3.6853665142864367,-4.2087773750981485,-4.103568293289965,-3.479202144587304,-4.060449336865512,-2.498760549326556,-4.016435028676397,-4.113565230927362,-2.9559052569918602,-3.605963446494237,-4.221123574274308,-3.066199997793107,-3.377735622978364,-4.287255249271982,-4.343264911094188,-24.909512959413636,-3.6910201872866097,-3.713969016817215,-2.4484970585450894,-2.8281359460504882,-3.4200816198534314,-4.1876319891399385,-2.243629892487991,-3.0390534447505972,-2.530155180887617,-4.129997895357686,-4.156156065826083,-3.473504178798141,-3.6881385577713646,-3.9316545784650883,-4.211218975879438,-3.517874131260368,-3.1476697186761373,-4.04538413971402,-4.300686567620869,-4.3309355355332775,-2.6506691971675194,-3.5303619024003012,-4.282451841745044,-3.083841881356455,-1.8874374413730077,-2.9684471762007325,-3.879076703899967,-3.9803568938947125,-3.8106902537568015,-2.357036040621715,-4.288990924882947,-2.1164223853362616,-3.1214240086299307,-1.1882026790848084,-4.0706778420333904,-2.9091246842825376,-4.079327858093788,-2.4518897982840366,-7.809250580394157,-3.5112665627929984,-4.3343247213713525,-3.657018262097995,-3.53364257081674,-4.136881108690406,-4.298794748060257,-3.6115743015326163,-3.203962631182509,-3.5524910018319558,-2.913073857419998,-3.885158781751075,-4.056614008119776,-4.235246981705423,-2.8410470432410486,-4.0585411340891815,-2.8419134841273967,-3.3568962453825284,-3.8048048909200443,-4.3168049330055345,-4.0743290678722355,-4.005730399116016,-4.3166319586842,-4.058914351789671,-4.251042780310439,-3.4113296787083645,-4.014672510919519,-2.2067216391631734,-3.635840035821591,-2.876138227139215,-4.214768651551597,-4.228071352234174,-4.2195347770147,-3.414960082133435,-4.29629888201406,-4.311987124671502,-4.026731437225395,-3.9672069324490113,-2.8355198049644263,-2.8791756934834285,-2.7183116274025583,-3.0200964686212632,-4.146915198385344,-1.310723019207881,-4.19632285730873,-3.9106936406894217,-3.5882897417174417,-3.059494018708026,-3.549303251439398,-4.100221169840942,-3.6976364876960925,-4.171043917551694,-3.1427251022560707,-4.450936512498197,-3.9186054692067653,-2.561663020937064,-3.791289577842926,-3.6186552235081484,-2.403205118184985,-8.479954863474699,-4.054739840794489,-4.090028586186327,-4.175704491318589,-3.764814831129235,-2.5357365545341373,-4.280538465543765,-3.6539440978971163,-2.683619018141235,-3.9584260901629316,-1.9689323349614796,-3.2640303329581513,-3.5711140539195965,-3.725968757872216,-3.8239275392227574,-2.5593513495689018,-4.094959209216516,-3.352923279103138,-3.9214861661472993,-4.3210872848622,-4.064875238764845,-3.5278257663139234,-4.292965096698334,-2.5735991849624544,-3.032509039481175,-3.8941751792089856,-3.0971312908857405,-4.039762874692715,-2.7636072394499114,-3.0226002257333313,-3.911100310219006,-3.6541700575810196,-3.7295421352686624,-3.5504056163361866,-4.069730404890996,-2.5659301397123366,-3.7866921651156464,-3.1327713756831033,-4.36131324354202,-3.899966560253269,-4.292284391271226,-3.7277284959933303,-3.313979806711506,-3.9604361244956943,-3.3220623707629113,-3.7179559862257126,-3.9753683835340716,-3.8741306454790623,-2.734077302070287,-3.3716937122443587,-4.371082980248235,-2.5761643541689736,-3.2024645333518285,-3.7699704925353172,-4.29402997768245,-3.7869177614272997,-3.9909373143837126,-3.615362076177255,-6.908727689943441,-3.5264238713883715,-3.457444703226556,-3.942660341782217,-3.8082264945296993,-3.989871943457479,-1.7479796406899386,-4.364281032291741,-4.160960146127732,-1.0394877861427083,-3.935913271007929,-3.0420782851784978,-3.928723168488041,-4.188742069437787,-2.918718032267913,-1.5517998669070208,-4.106736914864161,-4.102343348954909,-4.340406837960138,-3.9693754126237843,-3.392710158913714,-4.310204025508278,-4.320162769549977,-4.081937650171731,-3.5065900447754963,-1.830450727455453,-4.291501073064485,-4.084198271003124,-3.0775083824874985,-3.0854814923357523,-2.4905908578089537,-4.188269903547232,-3.9469745175321505,-3.8035324497085856,-3.9267943668723526,-4.183822392676383,-3.8288521776863234,-3.2210784341907264,-4.160546503235205,-4.093433748564975,-3.2529854835421377,-3.7895168053818153,-3.9639052023380072,-3.09483235263641,-3.1761939423861953,-4.188616687837889,-4.251581429452292,-4.080955844905507,-4.233303018686675,-3.258403536161852,-4.341081408914046,-4.378290460979211,-2.819300368941417,-2.2786934980024194,-2.8233813508707106,-3.4658510884627094,-3.338957629251472,-3.8305279021599796,-2.941377112684515,-2.0003765520063785,-4.269438142526187,-3.7367005303884997,-4.3801466669791775,-3.9752569207168555,-3.7090704810034096,-1.9392770529487344,-3.396181356214874,-3.146395425250957,-4.229696723028283,-4.040025409510726,-3.363541366791961,-3.7791093036753898,-3.5700505990042157,-2.183824456368894,-4.295159646040791,-4.018793352765035,-4.392400613419365,-4.155522820792478,-4.2787268047811144,-3.6590238344731536,-3.0211787164449415,-2.747517938415493,-3.3242122474314044,-3.9135012916101655,-3.3902605006357556,-4.382669369280945,-3.7946432280235154,-3.7332129943323134,-4.208092616178654,-3.0944755029298747,-4.242575596864702,-4.254928747200372,-4.136119263906101,-3.7812288069414492,-3.844924570200644,-2.2380162619485118,-3.2386108750977742,-4.352326753109975,-2.143546422014456,-3.353398724418869,-3.465762797611168,-3.2486576873340627,-2.7413944605444978,-3.5415563294059926,-2.637255320034127,-4.139650440549996,-3.0939007468220154,-3.4843908662183227,-2.4653030770897795,-3.063896570059085,-3.938965665969553,-4.039240321183092,-3.9393912235341624,-4.108498458998434,-5.417352503019004,-3.7871786828183676,-4.295413972658207,-3.016746363064823,-3.058541088484235,-1.199654970952946,-4.205501230945171,-2.8641931587516822,-4.367970700507859,-2.8440491764723044,-3.5407424916921326,-2.9308638894234957,-4.311275657075867,-2.741190750707211,-2.5514238851872397,-2.919379668501253,-3.4787634506230245,-1.5809799698266378,-3.4918893190180107,-2.3526472294054797,-3.923486863089673,-3.7744066111348538,-4.096783566671009,-3.480959753241489,-4.119742485997794,-3.767853598179582,-4.123557277389827,-4.38109293944506,-2.620777302818906,-4.3540508149678185,-3.971329078344069,-3.463630644821284,-3.4637681602961976,-4.375826273097344,-2.902631436793139,-4.005977730736405,-4.36049537571217,-2.6344900915615823,-4.238672975573966,-3.938181582966102,-2.7566355973890326,-4.196394115742468,-1.6537430388749215,-4.3544839909611515,-2.9548293521528026,-4.295530714250971,-4.112361888025026,-3.8810922576545837,-4.156348950009818,-2.5437985762185527,-3.6218607208750644,-3.6255604686645855,-4.327932861047613,-4.244161456204401,-4.050667867227649,-4.38583499941625,-2.309869990476368,-2.4045812472420556,-3.439115460562837,-3.7218565454848527,-3.9599755924497266,-3.8239046226158337,-3.1005631506601103,-4.24930786535225,-3.3222841143159374,-3.960608627088649,-3.016499611920014,-4.292098751225415,-2.8188539389461535,-4.1680157685726895,-3.943160672246507,-3.898860208076623,-2.5931176302606245,-4.219254047753077,-4.043887598560166,-3.3059172691309695,-3.700050166740928,-3.8078288604637467,-3.4876073096032725,-3.7757242425786868,-2.5804211941808637,-3.791693935713724,-3.7753063365916337,-3.391296054325143,-4.253144187412974,-3.1713294696313685,-4.335001759194334,-3.1035828297891532,-4.313004154069057,-3.6492860580091664,-3.8526651906838776,-3.8148165982526447,-3.7716359323637105,-2.985424344115994,-2.8846147404530162,-3.8987872755103705,-3.5049237007419194,-3.0094014137100613,-3.355336168908247,-3.994342879571871,-3.956002025593243,-1.9363362990681692,-2.825378292885868,-3.6102818933274685,-3.8320663052914083,-4.104720512905876,-3.989796463648269,-2.8721962759856083,-4.0425181648599375,-3.5170031185316044,-3.4227098610740283,-2.4569930663966035,-2.0558527114276206,-3.5461878848323747,-2.5415040968818245,-2.8961679774629356,-4.344364237067153,-3.86517098466561,-4.11151006992389,-4.253244726461394,-3.531927908488152,-4.0582665492988985,-4.3641984131639155,-3.7259301327436334,-3.203496615793875,-3.883763673877164,-2.472823172824626,-3.664096603255091,-3.686066566143281,-3.57461350205456,-3.9680253269941614,-14.673448992652958,-3.4750901931088842,-4.022019893771084,-4.189182553601822,-2.308334664568887,-4.037098903612096,-4.082474549686623,-3.5565222624560575,-3.809535698846983,-4.25427191453352,-4.376873072510467,-4.129124100134451,-4.261350845789786,-2.897824742731233,-3.2393733176805113,-3.7551238774384057,-4.211404845465175,-2.506054364096398,-4.0850117790928335,-3.966583383041235,-2.9018378005421823,-3.773186465168581,-3.8737954066396942,-2.832226101660866,-4.020496179578444,-1.7959235186355023,-3.715109340452069,-4.171614237293804,-2.2121850814095536,-4.272768257912661,-3.3830792842679793,-3.7336719510413987,-4.351531979740718,-3.998616493835292,-10.07210931358364,-3.5047066852258575,-4.310087115249305,-4.3872006821675775,-3.6830139812103964,-3.5569096032232155,-3.7808183875064802,-4.136069894955076,-4.3582507711798035,-3.8853782501604575,-3.2178904059854365,-3.1861684251513536,-3.602567977676511,-4.342396478257912,-136.90839205698177,-8.331985514546654,-2.6320874675692756,-3.6342112577696297,-3.3833338829767916,-3.692715808945659,-3.3223912117009893,-4.3717657384124315,-4.168831238009419,-4.26983293881712,-3.1349228889781693,-4.115722290510317,-3.1868829718751077,-4.01623870205579,-3.319698239161079,-2.180419627363297,-3.735874161692654,-4.15684042374135,-4.3560011889645525,-2.740121204775387,-3.0389061666621995,-1.4686303019419114,-2.5086046377224984,-3.865404266462326,-4.348394993312426,-3.995461987208431,-3.9918168014714004,-4.029218953837148,-4.332073125751581,-3.53069537214259,-4.339584921651192,-3.860871558458003,-4.34804580212388,-8.99629976779932,-3.747885430968167,-3.3937930987367064,-4.151782634834154,-3.746718435565054,-2.9946868399897513,-3.7255848876628814,-3.8599968233345128,-4.087278651503881,-4.373007803049383,-3.6812326370301003,-1.516990861921892,-4.263146540186664,-3.7724007795201335,-2.6930249930844474,-4.0512113839042,-4.366272949756938,-4.013747452620908,-3.867205407630615,-2.860203439745418,-4.3802826109041675,-3.6216173401542733,-3.985750118236342,-3.221817430388916,-4.161015289478591,-3.5585081559577083,-29.67706697346827,-3.713353538200481,-2.8814150137530685,-2.5461133255284745,-4.229551253798034,-3.9886872041439614,-3.4768030506680008,-2.381487197485656,-1.7370843152824391,-3.4023503485278996,-4.21711390035887,-4.240752612592524,-4.3891857348313374,-3.448585272677106,-3.4336038761917984,-3.3374868225988523,-2.59528200034663,-3.888530566302521,-3.4831138240052546,-4.172505940850439,-2.87272431804338,-2.637748968170726,-2.247427103671257,-3.196125626950643,-4.206000893341978,-3.8051070492355823,-4.07096359732149,-3.131035691325364,-3.652588937688395,-3.7284803425018036,-0.7421132018899506,-4.102279247306582,-3.8159161737608427,-3.1405333509897457,-3.5389828839370425,-4.110388159837515,-3.1740954283783913,-3.9058290630477037,-3.9576932548451094,-2.93027021737909,-4.256234839595047,-2.8005766828698686,-3.8766536486434777,-2.786471850490731,-3.778008675799429,-3.908475756185892,-2.9440888510817853,-3.8466180083726194,-3.3927128016917756,-4.325964154025415,-3.354660659541751,-4.309189819803554,-4.224579159682281,-3.99431435308249,-2.6642909473907532,-1.8894726700615831,-4.130678689646664,-1.6014964708166088,-2.5579809434100227,-2.2052078029816666,-3.846908679052461,-4.020234494324944,-3.3986318816929586,-4.268612872797311,-1.206343252946329,-4.258424949635824,-3.6352759696615853,-3.7914941097076227,-4.2097185473956324,-3.9134897953484593,-3.117022619226095,-3.7186875744626597,-4.290772760996649,-3.5044704441749928,-3.6798795075770387,-4.240577391125383,-3.7792112104811237,-4.321937911072027,-3.94916046280494,-2.270073534441942,-4.059327698318386,-3.9418317756876307,-2.8863077866783553,-3.5813532568865662,0.22057841337936512,-4.034248526413401,-3.8450769559891365,-3.9405840646964645,-3.1839433701234015,-4.3278777160326705,-3.56652044972326,-4.2855971878186185,-4.375723977033212,-3.1182255034076007,-4.086053729695124,-3.5163564023090244,-2.7602043006437107,-2.0326588946500714,-4.272252909163535,-4.29616468870857,-2.1808214857319097,-4.0535800913551165,-4.071608707038668,-2.1186816783192026,-4.276978272072197,-4.140825422441326,-2.9393912730152905,-4.373165364740235,-2.411055530789427,-2.8494226226900103,-3.5206208760792954,-3.935482771036014,-3.555617660653272,-2.542513255510792,-4.281770678269709,-2.7699625180633842,-3.767250370792617,-3.785273107108693,-3.4587445537475148,-4.039799723481894,-4.383420469433421,-4.297231491194982,-3.398522034266961,-3.4458154603647024,-2.875484825438785,-4.296327174271173,-3.99781695293149,-3.4174129865603593,-4.384404554714995,-2.1695649556159102,-3.983875907934138,-3.570730420882858,-3.7975655805746165,-4.158409547306372,-3.02890665921291,-4.37125209090225,-3.292756567357406,-4.258830237621108,-4.053018752046996,-3.7228405080546905,-4.145388418847487,-4.119409896633874,-3.8214703616185766,-4.037903725547543,-3.091571626166844,-3.889415929528369,-3.9726391210507077,-4.198423524009096,-3.072934104077904,-2.6720359839143204,-4.276120746423937,-4.197218517376498,-3.321393118524973,-4.319073846667525,-3.997541198419967,-3.76408802247545,-4.205521015658133,-3.799789678587148,-2.985319994900159,-3.7712408989259805,-3.07913679784323,-3.806624410617095,-3.60405072581489,-3.616435026381188,-3.279300486006716,-4.320644378251777,-4.022394662212683,-3.5903619142993275,-2.8986850649176166,-4.353419685761404,-3.8956308807680164,-4.282047207705943,-4.273667554971729,-4.268800570077399,-3.522538808637541,-3.5794422984973684,-4.278406605848561,-3.926791723319685,-0.9935004726320094,-3.555306314221677,-3.824894105260774,-2.9016204834821595,-4.000805014696977,-3.9396219536812858,-3.913170224765217,-4.277911335042981,-4.129410378580023,-3.1563503196288165,-3.7171903293046804,-4.373283291081806,-3.771889963279377,-3.3970991459461946,-3.383023565624665,-2.661292711108061,-4.093600099335463,-4.215369089041344,-4.328123314486438,-3.749091326087127,-4.273301465567243,-4.182153785376396,-2.8500635781159382,-2.5234004934181273,-2.3997648906165803,-3.895014728828073,-3.9248109399951776,-3.1819347235585944,-3.6636857451244103,-4.053431571991174,-3.768930742184878,-3.35250346417648,-3.942619057295446,-4.364896613944849,-3.7761958885048728,-4.265899029177078,-4.144267031217854,-4.1858160696868465,-3.8104814335989317,-4.232602034671947,-4.191599613979996,-4.06465190719778,-4.372595072731319,-3.094943842294884,-3.5969425106309134,-3.794858283520647,-3.827938056160296,-4.306348132139323,-2.8892987331273616,-11.202250708381605,-2.817669803739885,-4.133649106757739,-4.211522444732058,-3.4101159636088614,-4.095700545591403,-2.865258793494372,-7.314820998565986,-3.592080629729088,-4.104032286558496,-3.5622289996574423,-3.2327204196578996,-4.220151752773162,-2.139977940651364,-12.089052340739089,-4.365883042750721,-4.301424924150241,-1.9775881478316708,-2.6544227386957244,-3.812614981343411,-3.933196262740184,-4.028062467263938,-3.7600949300651054,-3.1550738764337636,-4.237664386815406,-4.316354007015176,-2.4666505420238662,-3.862043502785861,-1.4784214198127288,-4.264103401725878,-3.291970247547649,-3.278848444728293,-3.6453633387502444,-3.6717636743057174,-3.822362520852734,-2.7516055110977957,-3.050639961458235,-3.903096153074369,-4.373235548062663,-2.7227899140206104,-4.019967653103473,-3.0031917425998493,-4.106691169399399,-2.348799145517473,-3.8830948435419828,-4.181050164218178,-2.8512960912332703,-3.715400743076615,-3.75917600417882,-3.6613716735780697,-3.7995618765588555,-3.886970986248656,-3.8298276860099048,-3.9831221467239484,-1.956839554950911,-3.5020533270175083,-3.8935187335537624,-4.025089249703603,-3.8635435508554448,-4.028167520163676,-3.5477319672470946,-3.9727180418583528,-4.143866778113445,-3.3594513491129505,-4.241799768396646,-3.926179481778261,-3.171143520044525,-4.104976811242182,-1.4469117275941372,-2.918523101993034,-3.5899686842359455,-3.2013167916510934,-4.088868806338514,-176.29803979731466,-3.9596028308645703,-2.208921484662877,-2.9279846255603195,-3.7877037861497302,-3.7574846917243434,-4.12319592660991,-4.289226104293685,-3.8453348599677675,-3.4976266207581785,-2.699725543343329,-3.6032760101337513,-4.218056483047438,-3.946208870842219,-3.376997548773309,-4.179080546330516,-4.3270087087673685,-3.154998561157076,-4.364661871616919,-3.791804942425885,-3.1149485323236066,-3.8347526737932762,-2.8128264317879905,-3.25127814060232,-4.260921263493945,-4.089111362809219,-3.531095838672883,-3.2986302850407236,-3.396512257566669,-4.306571676805998,-4.026716637851565,-3.2531395174827296,-3.781255719179339,-4.024381986687288,-76.15848297163379,-4.342827769339506,-2.486363086959273,-3.5618452739767372,-2.5319657023699653,-3.67588372183476,-2.5810124117003013,-3.3597832975923296,-4.307642502819863,-4.197595812571192,-4.221419870449777,-2.9493000632628927,-3.922087621909049,-3.762068586306354,-4.150698731939182,-3.5967564515445902,-3.6439505320756176,-4.088144386680572,-5.073739366009409,-3.8965193390036164,-4.378314194308391,-3.4992532601716713,-3.693074337809667,-4.303499142986107,-2.9373339022407956,-2.5856480522237377,-3.2249435255989907,-4.127170324752781,-4.187815057714161,-3.658459658993581,-4.293902885994491,-3.692298067523975,-2.8942648463779337,-4.239879527565147,-4.225287244008445,-4.136398825243479,-4.330313568236595,-4.3028181672034895,-3.62616533612836,-0.07833806324741088,-3.6664472372397956,-3.9281467409409156,-4.131769542035779,-4.21272890880122,-4.246507618585854,-2.018287214676146,-3.800734877339587,-4.346472772128584,-2.814444354606752,-3.3711425404904833,-2.738589103041147],"x":[3.7537208270134736,1.2234278023547474,4.066219785999884,1.7170985272410688,0.10793223471308955,1.2056932544579357,0.48953768069611714,3.3738010314997458,0.3322463064540915,2.1605884597621428,0.061930790917321676,3.5787124120525906,4.535777060376352,2.6520403954869076,2.9315125388536445,3.4513537509521743,2.9987040557259794,1.6703527324004763,3.2094021381956894,1.1442940620252928,1.0971396735959715,1.2674701760153995,1.8326662291708562,0.6456823831473124,1.8231044111369143,4.588652586386414,0.3509907071356688,3.768591658583129,2.1904843159568435,1.10345244961907,0.3681024585464876,3.510278854761797,1.4435000281705668,1.219711362947431,1.7104427643627296,3.060699449393506,3.1516303406908563,4.851344349877759,2.7601398511591455,3.85923902664133,1.7925346798216746,3.3997133171557614,2.082011199549326,3.54475817437798,1.4516221344300984,0.6520912150428504,1.3554488207511295,1.0128828612044016,4.519121933576504,3.4385953657569965,4.213994589021635,2.0492221472639205,2.5965760241209823,1.688358057168362,3.2250746161604305,1.7689375946807406,1.5607720530687896,0.11552905623843368,3.9235252639753404,1.2230480526215048,4.809562463517327,2.6855357352476283,4.281372726003293,4.8194998225470265,2.113339435090973,2.2811668748259573,3.8291857207544755,1.53047339408806,2.1483767866838077,0.04354927555133559,1.1293189869139975,1.8679631642126104,2.362481546649783,3.3991243612534925,2.233558224556842,3.186815323346346,1.4763506077796162,4.569654663875955,1.4980856242009677,3.7220002371268732,1.6094216839754416,0.731319445176416,3.2617285515095187,1.5966593572863175,0.9620813182339039,1.65932024272069,2.6012133356150304,3.1738694942049506,0.6745558499192117,3.9114659497921913,0.5934014371204488,0.327435729894916,4.9484489174092765,3.5805608592843163,2.4232029849873804,0.12222405344327503,0.2173059548098344,1.115056502070041,1.360786927948262,4.179037158925437,4.579621022598831,0.9941330579528773,2.55473229954424,2.6416588973511654,1.8557427931230686,4.274673731867252,4.757419783313885,4.463843166922535,3.503409599746931,0.32697884394137566,1.5489079326457056,1.4725319042390794,2.6271371123599687,4.1922778280203365,1.5779569357196854,2.1787727732026307,2.163470694408909,4.537498757124744,0.9671397222367295,0.07057169262244645,3.0695665287000717,4.738784011042777,3.4820975081432826,0.7379936202839121,3.30861071841575,0.8596374194239598,0.04792519883944135,3.4046008293057914,0.007269644844950518,3.9143089789937746,1.6583044231339028,4.93250956803215,1.2230683321656943,4.372545790157309,4.5063355082415155,3.1752358344172626,3.7174579905156158,2.4801109956171006,3.0606583200364734,2.475021858066524,0.8517517477227832,0.491067025299996,4.9231314513638615,0.17361889903820926,0.45992709265631593,0.8119310455363482,2.7789223220116255,4.325208625606468,4.656908618676954,4.266518144660395,2.19840136656127,3.002907839061648,4.956949194673471,2.9908558137238073,2.935425863241896,4.336179415980873,0.7008281422521379,1.8047010228387805,1.4196451527927512,3.760654158630498,4.0637708127135586,0.4205910469184415,3.6514957223198907,0.7145172818585344,3.176337881806266,4.062672445478729,2.5191514549851224,4.404295765896221,3.1588769823314813,2.217002126461681,1.9810434204525484,3.8119233338661473,4.098433739805211,1.5733788131664772,2.4966838760593713,2.990027146135823,1.8524814534607659,3.5159849048963787,0.7274652676255633,1.780422234269129,3.1755787938722078,3.7781682019472216,2.2650981898024325,4.972738332792988,1.2338903197474005,2.0452465482661717,3.555147256489909,3.9027021660838823,4.699320577227998,1.1493346938772786,2.1400497737233284,3.8674224567497664,3.359481229462621,4.098091605359086,3.922593554152458,2.2801673634726614,4.386273674061788,3.998885986378383,0.38944735593193225,2.5357268533760124,1.222643494661958,2.107570529500966,0.6788917411015516,2.3094464817938363,2.7070640832078285,3.3510222490988872,4.387855798412201,2.767634758781382,3.9932378985813335,3.695060102877088,2.671020136855403,2.087260001371077,3.3776299242717975,2.724691288396852,1.3098274581342095,0.5385348788606392,1.1570830783113428,3.8343674931073544,1.1071882649831366,4.605374573996798,3.5539679137813884,4.677047953082175,1.1881472908863377,4.287872923183392,0.1191774077014951,0.8237982050215487,4.185142051529828,1.6392594262935345,3.122588134056501,3.691856343164744,1.398773683448421,2.9581504704970794,4.134308467438329,3.546919894568199,4.655119790373128,0.9895035697177734,2.8666583252688205,0.01604710133024656,2.157626130684873,4.4748887383441,3.144245410899659,3.1291971701974095,0.22296347041239395,4.120430056078428,0.9908038132792962,2.3669792082927366,3.0516475277210753,4.485390270647907,1.3331767375119485,0.5954286891803418,4.383285446782263,0.8113679380141336,0.6858469238892728,3.798938739397686,0.4520200954693143,4.487243038704296,3.6825846400936624,4.4535924715117226,1.0970500447296339,2.910587110597703,2.61205173150873,0.47105068021899177,0.3204676730062783,2.196395974792064,4.174502007779265,0.9262583812141911,4.09142195910825,4.927184766541707,3.830064713845106,1.2232904246702148,3.7148683102849467,4.3331664753311845,0.525843489262956,0.09276396753613803,4.960532993698687,2.560382250356361,1.998173481956943,2.4747861868524734,0.6081472385586562,4.087240478288001,0.6441479429416141,4.046139048546364,0.19811961398970568,4.097512142694497,2.047244615651782,0.4510615914507554,3.8914264833627765,3.4391545511477952,2.1644294923873,2.3845672917954,4.480056415097171,3.5801349023952858,1.733842050156813,2.7278318532874968,2.062955555104986,4.0964677940164105,2.412817134150332,3.247402118975441,1.7644370389897979,1.8053318395445694,2.9614567270435046,0.6357726466476599,1.8701246057220378,4.8883409795402795,4.81801035766931,4.297205369864786,3.670417835821491,4.247498694735673,4.4845653679435316,1.4535410951543692,4.519463979688237,2.2421466365279494,2.486419879642124,1.8422964889599769,1.8428433147666612,0.9738884636764,1.0519433178893356,3.498583360586305,0.7467039848105506,3.124100151602404,4.942355922897056,3.2041938682136752,2.4921652410885695,4.622499081022515,1.5722439978347769,4.122468617890725,0.5671469148581354,3.689575234865874,1.9578436685758827,4.798501890097089,1.9463925301753315,0.5308656556919333,0.5304025136641588,4.551057083056605,1.9716537347265028,2.6095270124072814,2.74999451684797,2.609537313965049,2.3569112032081643,4.690778002664061,4.386501790615519,0.7194814654754966,3.6176191796662103,2.9666616805343504,1.1097635160780894,0.8713324383460153,4.234756342273558,0.5661855834668983,3.965380529844358,1.0395736499599706,3.913205226180901,0.6744894469041751,4.726670167914606,2.1632200220687725,4.906002752570941,0.709745913694334,0.9866635270324853,2.9581565859012104,1.891381246660837,4.432184452517958,4.09883438923424,1.800593602886854,2.7351659808684814,0.39378478150347673,4.0992162246687105,0.8043525646741834,4.199322279370014,1.5785917877943323,2.367076989568381,1.2522080315199746,4.674545449749469,2.114319359509933,2.975961342937039,2.8053099076229007,0.2388350407559503,0.6148512406052509,1.2729788950585674,4.596903918799647,3.2075400164189336,2.7789461886137112,4.47951154990072,4.281307769862214,0.4662032817809125,0.7065674770987973,3.437663785070143,4.632452784640003,4.254976510019547,3.6144372191429177,4.3439124930450586,1.5585706783724151,4.207663683520776,3.469231339000489,2.8883585135849366,4.43586028347804,0.4156177223705737,2.5536524373645797,0.8860565505911511,0.8535725029827845,0.25174403105278853,3.3711393399672374,1.2556226038672291,2.5385603695650505,4.6012755914619365,1.8122079475113162,4.959459797815926,3.4632740907788504,2.6226238850565275,3.0609837668239037,4.549103399519575,1.4589977699824286,2.0575676700335563,4.573574153056976,1.9775158673463078,3.081023149102932,3.0831634778128834,2.241303070085787,4.108768971486479,3.871113598409469,3.974602873452071,1.451361950908019,0.29916312033420156,4.722950743029257,1.3572054460347727,4.281212658142816,2.5615474139259566,0.8487286882679179,3.284790414034806,1.815975622565692,4.584026919391297,2.8391994284975155,3.7854255778431067,1.2703750397939473,3.577849868416111,1.6195166128955907,2.0306553224283097,0.7791421884939898,2.3563955450867846,0.1848472602732154,1.4180970366829715,1.6334656183112228,2.2398090637715273,3.7765592255126412,0.014383898035923437,2.1110544735389727,4.7531323579028095,3.5144476317582085,0.8626037178093571,4.749595057145385,4.947621733481148,0.3461539634541344,2.7264601283451153,1.0385513786296863,4.157737868596982,4.452639759985666,4.511114047039516,1.9705936142692093,3.4180250565692383,3.065076365550298,4.817836936607234,0.021328757516264618,2.446164125298277,0.2527492956037203,3.7660379020247703,3.538988188979235,4.385322877370922,2.765077453057695,1.9036091787073162,2.853536420993935,3.483186971421862,4.260950318155745,4.637022557725173,0.27359702225176585,1.9656587272430648,1.5531755484919496,4.818231677374846,0.21498026726477715,4.149271102753334,0.17467126855123416,1.8346960230248477,2.135960566872007,2.3710850094710603,2.570476874061484,4.982314326941069,3.6877316734160983,4.277729231216378,0.5785648582422975,3.227299587091835,4.915179075375856,3.1271524155311314,0.7940754557012453,4.643848823280653,2.587887602472505,4.04970779091812,1.9097439233990932,2.425291847780078,2.735714647279328,1.4942224229056966,1.6622302662202548,1.8424184681618827,2.8952294022966663,0.43357396409726134,2.8013504552700708,3.809954825476872,2.6598297414327665,1.8297545374227464,0.03618097045517632,3.6146818845523185,0.7849229328626339,2.418430921399409,1.9375052409735183,4.333935878501661,2.7316300215100178,1.4722291746703997,4.1548729524163726,0.08188129459427151,1.8497951334402118,3.635522633408578,0.3010223987766303,0.8718755796234678,2.3667098313382295,4.9000492215166656,4.322490534505514,0.27710890221743334,2.424498365532133,2.553953169280577,3.5448695478221417,0.36895680047748125,2.3093153966718005,1.8839299687788358,1.9621556688394848,1.9923743627519264,4.308425236380825,1.8284622408383355,1.4451978847320879,3.6776813880645998,3.390515644836504,1.7362141772763706,1.9501367188842578,0.8658686213622124,0.2741655644823926,1.4176319260386605,0.073838010386017,4.179917108098809,4.39536398141151,1.1217813453104741,4.975863300378672,1.3938089923375563,4.149416289950341,2.3297707017487657,2.0015778012598995,3.6787471977033404,4.891404712851254,4.348542584086711,0.7045454225322245,2.6351867740894352,1.4457365559224344,1.5021672620568138,3.5708492200806665,3.3693858845065536,1.8031820991422742,4.53998413501707,0.6345626427900608,2.729399974846408,4.454366820500174,2.599155174098473,4.086249835185335,4.3890352051855706,1.901673750438525,0.33858941680601995,1.9058705684164967,0.5375825849293914,2.4474951487079477,3.1815544719213107,4.029851007688081,0.9541326750115275,4.115382360145809,3.5240128874622343,0.13999845874324124,0.143045322644344,0.3452318974871371,1.77753879480968,4.989271365562816,1.9404978028307474,0.23397884479372189,2.8419410538811474,3.6789659291115173,1.496266617318659,2.5676377987675414,0.9120676910241521,1.2809473097826996,1.5472793100931326,0.21541713240373794,3.1740023246474234,3.1078506677079734,2.3970938608123706,3.6328124257590053,4.627615696786764,2.806903704666577,4.756206233477177,2.346353331682712,1.2103891005804257,2.358343275741832,1.24135196331846,4.000309356093888,4.801101493534671,2.632317681529176,0.4500755101505016,0.39626130821718397,2.192415742922116,3.5636268980373753,4.518451591229443,2.9154625808247814,3.5873791068603778,2.1385606568617854,4.184464513215169,4.251436215219186,0.03739182896389859,3.610874511052585,2.6903906579868684,3.9380581183881755,2.6483399892117507,3.7853950199973765,2.3456532130535113,1.3669563354930592,0.3902373056546282,2.251669732984584,0.1614306781260233,4.374625864059761,4.588825464209525,3.1659637446839586,2.468435608679931,3.2871180353127993,4.197927661545853,4.447060236550687,2.4172657513511844,1.225760598831176,2.4830389344167845,2.6782293364249474,2.6620823756344194,3.3828359373071546,0.24983750476570643,0.8521202600770406,3.852215203948556,1.0957450251883172,4.597000192197206,0.10712311709004552,0.8070125410811713,4.983828559350201,0.13131235442634726,4.7796774620882125,3.726403952090158,3.5638008543542785,1.547164000104766,4.025697000638989,4.686471797667523,2.376151984720507,1.8166536537137479,4.389348394999033,1.5683851940487614,0.7106634660665267,4.409239121408085,3.9644583315279327,0.07732770712800652,0.7319496232774969,4.5624318466793765,1.6255916919810753,4.5272062416870416,1.1034607221855464,4.987967028912338,0.36589457951248905,0.7404629076183211,2.8557078696726066,0.2631609082322661,2.2135731175859097,0.36253242800375896,2.3565313472673246,1.5380049902125659,3.2272781224724065,3.3477517611281673,0.43388135101876557,0.6005942207775006,2.1878230668971357,1.1299457383730782,2.543369137770184,1.5860163510343361,2.6806593956804337,3.017806798016469,3.8792340522726265,1.407563301465109,4.477098111903058,2.179503002150364,3.357102838495419,4.006553256373029,2.5964835301272804,1.276398012128026,4.236873809355068,3.5554105501630184,3.4794186456381615,4.265403483716213,0.004840266515661051,1.2136839615334871,0.05631312767629848,0.885496319495821,1.6705147031967815,2.2216652174045928,1.2963822341260367,3.9572291843767458,0.24473681551933413,4.75475163438107,1.589705525067726,2.9829751752037046,4.142838868714669,2.6126455732227525,0.8492194250489637,0.9867710949978004,1.0529566203987895,1.0836444439604032,0.09708866379054881,1.6894235889615405,1.274278278072054,4.1761484059456775,4.364398551872933,1.7140479681300158,2.979262163080553,4.60950427189967,4.13191318482847,4.564568296656031,0.5096054017667073,3.2506681809736593,0.1888546908210731,3.409558916047305,2.555627406840336,4.253545039751722,2.370186360831603,4.083827877840754,4.868204163259061,4.6751017758487246,3.3086108355726562,2.1566732504397903,4.392944625064415,3.7233683653326075,4.556872004440807,4.114713051412217,2.837643984710904,1.9503610871586174,4.77956220259922,4.050492225225532,0.42616530879022285,4.481230266022092,4.72872526446447,4.139006796895499,3.0053822097672365,1.093614181639303,4.553384756881934,3.4099674469493726,3.112701022387776,4.49145452644908,2.8411220078053567,1.2104798112777237,4.800018084700952,4.677376211390824,3.5870163171099243,2.6691164285073032,4.844625990122312,1.1113205531654935,1.9760463855451105,3.245110216462943,4.509320002898911,3.8251205358902176,4.538255372804727,0.4183162892087877,4.918680785697992,2.442621336131955,4.476612134474963,4.508035218441387,2.6245651308428153,3.1860673865984035,0.6102259583754355,1.986856175795133,1.6836073322079836,4.9148913126041975,3.6001201989213394,3.4775192403928266,0.010128506859791164,3.746446510767727,0.1545239489346828,0.9933759704288014,4.527379507446709,1.5270819444224715,4.360622477728154,1.6465802439260069,3.9643176461217178,3.93213588567892,1.1361619347444585,1.2623368782744682,0.696844006248164,1.1795133229922405,1.5135005851552008,0.4343080342611261,2.8292762310363093,3.854307071262996,3.1870829615606864,0.8352811037105101,4.234997730061565,2.4276241911377583,0.11307862070952024,4.696493432543905,1.7156855386763792,3.8265744945424753,1.440914911022071,2.7715584601749965,0.27128692073915994,1.5887531484318596,1.4726850206642184,1.7021378985474866,4.653021220157076,1.3849036336562703,2.3528195761412096,2.4519758681483483,2.6901484891788074,0.8241904596208938,4.293023783059411,0.5123703434901394,0.9600691026991781,1.7811976690379039,4.897292278152641,0.725645642036683,2.5651156054562008,0.5127013618515808,0.5417419075137409,3.7724240211423465,2.810262393761791,1.613466323255598,4.040350086902067,4.7690867995542074,3.3670058637296476,1.620295318689694,1.9927208514180283,2.172237182924568,1.6421540159110548,2.766414740053229,1.3664651174462883,4.485479661615614,0.44429973644639076,1.7127564249287242,0.5906286038603425,1.6597275348901797,4.349688246117936,3.331697743625812,4.9021505779176024,2.248141663691917,0.26209121334044627,3.8428002403818953,0.6360399558005447,4.428110853964162,1.3152532901870118,4.170570327902302,0.7794203600220251,0.9079159463499575,0.25163172429731095,0.5496181210083151,3.602329420213205,4.577756068114059,0.8254672710237632,2.464832516005999,1.6408045030473606,2.3043890387135635,2.5059833895433603,1.7670331858251975,1.4850049610698512,1.2398748537079318,4.447456268435637,0.8870176147993691,3.3296560868722027,1.874807371603724,2.286952029467625,3.917250009832307,3.3611421320116586,0.46915473688265985,2.653664208168883,4.737499414194701,2.7104263914729456,1.4132011488352902,3.102520455284762,0.8982264417655694,0.20457921294183445,4.52386427586727,1.8652476578546784,1.1282554191714866,0.4111085439378026,4.9761574528319645,4.86504270829275,0.6603048862484939,2.05956343718713,1.6930218026791455,3.876495405700646,0.7310903365990562,2.0528220901116354,4.856212139546283,0.7118373044576021,1.3848610689223972,1.2109931625890724,2.201796871325353,0.5212305955761964,1.4199902287764976,0.8049189014091285,3.3832470116469127,3.043051105424995,2.0089244084610525,4.887613353314641,1.5162742040515165,3.8446234013131497,2.492246127123873,2.7184612297620205,1.6809477141167772,3.106187656943884,3.729575506464929,0.2263681979946197,4.534842423531964,0.4496143349964121,2.157548903504617,4.2582614549000075,2.5478128445219292,1.9782160304208174,0.8296751104567357,3.229676622491077,1.8918599677662495,0.5773249328612928,2.9143103253800495,4.717198825072022,3.43640691538356,3.08707556139753,1.1786093230493755,1.350991987861041,4.352262340092995,2.955714705081478,3.3170554797695964,3.982407707492669,2.7728673959725727,4.326227633489996,3.890282773188396,4.020463101838338,3.4099786603021154,1.9006706857664246,3.1822112715595896,1.3979053646241124,0.2371905075978764,1.809047155671839,3.6818806695655137,3.7952836196844086,0.08116708697006647,2.7079159808934405,0.5264177983084839,1.1813433564162878,0.14686108279452936,3.6601620723326955,4.824237284198366,0.3202268150918841,4.981030688461882,2.7541250334553133,2.62026381772398,2.5476316595252326,2.2571116732808383,4.270260107774098,1.217970130072995,4.913362523891907,1.7648174586121856,3.4191599316768118,0.7181687875934839,3.0551362745760304,0.46808219913045845,4.064600445894754,1.8596640101715223,4.182682259837512,0.5845397071416725,2.8065203234130642,0.7808030249230247,4.1500582039376805,1.4095537016290627,0.4810579106511603,4.16660983336187,1.541150780024747,2.9798662956333644,1.5451236523457457,1.4429551189208856,2.085196193465814,2.7160385966696596,0.34556525864781973,0.8017280006131144,4.204587722232845,4.267596104202981,0.9499545313999347,3.704156021509213,2.467340910833673,1.589975618197107,3.1886524979536524,3.8344587760332383,2.662949608473353,3.828682727719872,2.683429153819744],"s":[5.576135449645521,19.429288630295463,4.889955988268864,10.99703854787409,14.899501316865852,16.12830297266139,1.7512043010393086,9.167987281822846,16.43976597183906,14.039588749501334,0.21040663755667044,5.681605427014271,8.92823771939257,18.002206118226297,8.502780401862736,19.49456746767543,5.133175516106285,11.037030261762224,9.21809786797069,8.778934527362704,17.53321038089121,4.060469645516207,14.902231157277384,13.883475090581964,18.390249212579896,8.095851828049199,2.1861591824787485,15.170778810141448,13.74506678434595,19.14142822043946,10.829649759138151,16.02328618227393,1.4272755755103672,6.129558384546652,18.162605779031974,4.391740050350239,7.274820644799074,9.5770493256616,8.808359751875404,11.571162805578767,1.785466066193262,0.21182038259203395,11.215215444164581,6.864376191622439,0.62210199822057,5.44594479687571,18.590455433940853,2.207845363792411,10.826502017913402,17.45596960433492,1.408071961347428,19.56003916501402,14.13528082040957,5.977154560244129,1.8370804743191016,17.95392254922728,11.93172580029593,7.481221176432258,11.811686015660964,14.275429013032422,7.096267269673571,12.419304888241566,10.356621189748898,17.476518009607595,2.3211847301519795,4.7917658253343465,5.526458036856665,11.230660759608453,19.444074500834137,8.336913640947202,15.402767826646073,10.521991366706285,15.469754808540266,8.268953592724056,12.793125537009505,8.80260845023011,7.268943845399289,19.38085416657237,2.2787463328638413,14.331278653962421,17.44697171206827,0.4628649912957705,3.9994155251749053,12.559437370009935,10.48401845003987,9.4036211520178,4.500306369506903,3.964446532097652,8.874710261808229,1.3437644232115131,0.4682061845160401,0.07051728013282688,9.311244784621344,16.716101303972568,15.056336434724944,8.102102902000667,14.49674171172357,3.01606278463471,13.872089321918084,15.001422523626724,3.762068830769807,9.201152520917883,16.947340757994258,5.229942819497371,7.287870462322381,17.992188478206526,19.003686884666404,0.14675933040952494,9.832289341304001,10.251846073190132,2.8578203024627102,4.201645911003609,7.437616787721786,16.241793795137376,0.41510332431180075,5.0937907805162785,2.9768668130806164,15.259312291577181,15.950796968663848,8.05851868266235,9.795164077573446,12.375220206730283,16.753531803953457,8.427606273607712,5.565714786829048,14.283043820227004,18.43218946692616,18.910207640711064,3.4733168837421102,8.190734435499007,18.091521939723098,2.961645493337195,1.5745063391563052,2.9754838625778213,11.792584036656063,13.271947333173246,11.033561078514271,2.349571351638966,18.115877431476015,1.1860030736136506,5.669233595707839,0.8191153370114179,14.299401769625199,4.567798927056104,14.772976357869968,2.863461214735481,0.2791676149580846,7.951832749905492,18.88358267933638,9.183167647493713,8.430439500849198,15.578275106177482,18.148705978512893,9.119855187925495,0.6978130601751475,8.306939516153001,4.598705725358143,12.155237796644741,14.43493724775438,17.070151706584213,2.992452518644919,14.471426108645922,3.454156917840039,7.173401572890459,11.104030472507795,18.584029714718582,14.627302637159438,13.477417210874618,18.635999911542775,14.410438187668436,17.50803000770095,7.186748370578515,13.661228517438463,2.2344405116235233,9.406239928997365,3.8702429776312153,16.8754389055556,16.99602158118084,16.99636230349612,7.5625658651822825,18.254407934930292,18.45681490510286,13.972142681360879,12.76655557763371,4.25454067872534,4.313015736070769,3.088472895348584,4.328947785010193,15.512908867645558,0.7324357270616755,16.559080431595945,12.17886332800882,8.723331413640455,4.61699413140888,8.384523212257493,15.010282432463855,9.756525566158235,16.0207291388297,5.784583611550289,0.4336447344021144,12.564734289246111,2.9722528813350335,11.078376368337675,9.25743932194063,1.9165898124140668,0.26166897365794917,14.104728626335369,14.850569358253187,16.085798976373763,10.611291173546679,2.4658176086834027,18.051640968632213,9.4632044599931,1.0456424871170045,13.071588371659395,1.7779137245568544,6.507431532352674,8.65296822947359,10.370112578739189,11.104632298985685,1.9553139233983918,14.731024736537996,7.142944247998355,12.274501679762814,18.815077479684355,14.56423532047014,8.155315173490663,18.27799968519556,1.198500564722238,4.438795146832892,12.275274713089491,5.187012363065984,14.023277099531661,3.422044976024825,3.3709787459917395,12.478013182284968,9.44842077999052,10.399610567892692,8.62722573268127,14.357912960615504,2.0761557959233867,10.86068195369251,5.7089369382158806,19.429056850866758,12.340843601566043,18.219010336320537,10.270388948832675,6.321954818214945,13.102755482596535,6.922769018432122,9.831510348264372,13.31739507145221,12.034868429397111,2.680096133462393,7.280502172286472,19.593794261336967,1.7302511558501044,5.42362735243886,10.823538105634753,18.2225890999092,10.908088133455692,13.524637097056566,9.291178334419348,0.17051369279595274,8.101548058281004,7.933645154611364,12.558330956504618,10.722976496222426,13.29593763068722,1.215626050570613,19.48694603135864,15.745628646793183,0.6952115048876095,12.800974579308209,2.9300482984148024,12.588222904707123,16.459150003241994,4.475035329272643,1.1724680869416515,14.953957276366058,15.11433726822915,19.055290356442683,13.23785738681086,7.015780819928201,18.596942753454154,18.79990275496963,14.614644781345337,8.056146690892728,1.2293104247995368,18.236208070391516,14.565386774138616,5.02526126740126,5.328113207949645,2.642943830229889,16.423948859465614,12.703226366025785,11.135748470797203,12.502390496548529,16.37134674736188,11.447993943354419,6.00019582357175,16.025953394444276,14.928660552807367,1.4754949809132922,10.684568788480778,12.883926740109878,4.93129696315779,1.4065223369588775,16.221492744654125,17.540915485345,14.512887503878208,17.199599390504716,6.38594302791212,19.163509056508286,19.88868629999378,4.187462164645206,2.4383617030880966,3.5357811320566634,8.000155810660798,6.707013140075793,11.06649925269149,1.108325892643247,1.1312887649850767,17.671671542604646,10.473713676850736,19.789122060584003,13.31336935909392,9.96260593092015,0.9307946880107254,6.570076794422306,5.726103226980395,17.172071143007564,14.203976501566755,6.6022748968884715,10.906661540916689,8.723211915873863,1.617792334462993,18.287587024056478,13.810681997528569,19.95160674966531,15.746855490666075,18.036779232471332,9.414956902932744,4.640213476725039,3.8789939317461686,6.937081743037412,12.266051754108865,7.416992971966767,19.87258049875962,11.113594417330614,10.120758646598564,16.80551319943314,2.4001485873960915,17.345429407946117,17.284324756374183,15.63931112075775,10.951541072071427,11.543407125513706,1.8244744838540106,5.430453563063167,19.207913767529252,1.8536509372381804,7.030967335269684,7.998363886638171,5.970545192118295,3.8464591777757517,8.248855698919977,3.3598606312084334,15.63454788036816,5.503922241580579,7.492608047952554,2.5133063027080427,5.156367484438067,12.754316258673576,14.194528275609152,12.845486985706165,15.198506745532239,0.7603612205018484,10.874265841013573,18.259413913103252,1.867047543065814,1.90199630065091,0.8281390455678261,16.763543097266083,3.7610012232228573,19.512557854733377,3.288320125642028,8.280768234452749,3.8437582310167606,18.62253335115318,2.124585851098577,1.5474019954214269,4.377581945364031,7.612108443926364,1.204508009076064,8.08821843166687,2.6264000994243153,12.641802085373289,10.881887573459572,14.927267400935346,8.11179719747619,15.340722774168887,10.48110449246121,15.403687205374062,19.677756413765373,2.0178102474235837,19.384379840171874,13.173571948014438,7.377410166882026,7.976358405331072,19.854296432871898,3.540811649605149,13.71015814389338,19.45451661756524,2.9951106437559982,17.302089457649462,12.535829817981142,1.7200246699216404,16.434596388502797,0.23310791802454656,19.454129114490357,3.3165183288974376,18.32963026561422,15.081089319459116,12.051104385284841,15.955012525380162,2.3767431152454632,9.288339474341875,8.96914071489341,18.843158191888744,17.218833558372303,14.33791777721976,19.94986161375243,2.4548803404975006,0.7942334240630444,7.788526453283744,10.268276850168988,13.11161990121997,11.439516324130361,5.5320208027973905,17.485695127334463,6.627960130419166,13.110816980394468,5.03437224871742,18.016111452704088,1.6602270786647289,16.137539881998258,12.614221257472398,11.982425586752985,3.3426003510462143,16.944508425011268,14.249096430146393,6.219904754737695,9.722856192595959,10.881494009041193,8.122867389229999,10.754635712046468,1.9200317791252752,10.705938429539522,10.896824061321965,7.340326120437233,17.5804814389307,5.340841150621443,18.99004978899701,1.6494520279178149,18.605150534294353,9.560001114769904,11.69341309061872,11.103277310709515,10.43704347874938,2.0878171199989337,4.473636898314077,12.294579456337269,8.255930893827102,4.096200494289248,7.163012784615415,13.265819930351528,13.054717612996773,1.1374343091322725,4.043680239620451,9.184900181722316,11.441617354085194,14.775970923469991,13.311298473153009,1.7731027504583707,14.242392897225887,8.16254015861118,6.890461254546212,2.078314048243368,1.9490592943736829,1.4925999039846705,2.8662116913157654,3.4862160945361786,19.24550545899967,11.860399388286824,15.154221427218788,17.574358604921237,8.474402852974755,14.442163352885263,19.594238256554664,10.369953797134235,5.958674335830363,11.871423276181119,2.0103737067009586,9.726482056548317,9.971909381555024,8.667544915505566,13.219764060281282,0.10538345599540921,7.998419100104739,13.678708228325128,0.32854482791175865,2.4850476608231054,13.879295258349963,14.82046569377979,8.73295087099493,10.980301741302213,17.598775375860875,19.889107741271324,15.446464249986814,17.418719375977744,1.525513631954234,6.379407403887507,10.581010197071095,16.792441510010452,1.585839976314758,14.85879137993602,13.135654301245623,4.500260086163772,10.796452724779368,11.992512188881093,2.4292856865895107,13.88094169263752,0.8977446262554034,10.060680429540941,16.059303853761232,2.1471888951517037,17.9012042916923,7.363582441650589,10.456781689296996,19.386839709109296,13.622211149130123,0.3653250431902144,7.937470070436858,18.596064965706347,19.82178203730157,9.929180564923175,8.332727420739069,0.3821011205486391,15.596236748819582,19.43382971889823,11.695021930334937,5.4516996289578845,6.044648458252491,9.023512978866997,19.2062023149711,0.008990519502316552,0.33325242831513613,2.5778182881333978,9.419538942516642,6.735125931560155,10.03829686244693,6.793396329447545,19.558496831301383,16.095419064479763,17.70508861439014,1.4549459998778014,15.30084361124652,6.052667121617472,13.856085378649512,6.906728168649434,1.4027647512266173,10.35192517142898,15.788470950018144,19.484436452313197,2.1478391251267936,4.538451782090811,1.034534190569345,3.0600097754799993,11.93058351571608,19.327221628011625,13.11396156917147,13.521116577607177,14.051420710492156,18.968252392994223,8.318440819782715,19.150929852215263,11.79711426752711,19.331794728553504,0.08589715684768073,10.566437554340396,7.443942344858683,15.809508136406976,10.484936378280914,4.858410235652557,0.7014022445873147,1.2926406436991789,14.798238891436299,19.52987919047908,9.843239505488572,0.9843797950001099,17.721094721284576,10.851077357178983,1.9518663479541898,13.989791870368752,19.62910208583623,13.837421576618665,11.950343144969327,4.22216117150314,19.871725444708726,8.952296341223853,13.308592974271424,5.925885241709885,15.993134547051962,8.252475844695514,0.11482983034122984,10.231908532499538,3.6752052013727665,1.1593888468064995,16.962141692035715,13.440145183789912,7.683218371367637,2.004777723036404,1.3799863045084004,7.502072862543265,16.898676420730055,17.362463563189156,19.90757195547532,7.183472342819819,7.5219543299470715,6.949102118358197,1.608588636305539,0.8438922908003743,7.5311040587470846,16.144214705175877,4.360679303305615,3.201479243381229,1.6929444752749978,5.942873746686348,16.683458416761688,11.23127391592465,14.653353272029651,5.141271112632024,9.636097505547664,10.062023155403551,0.17937020493889122,15.118611150028304,10.908564106404675,5.777360777288902,7.986265431210913,15.088999543537005,5.6737228054254185,12.410943656159873,12.827400411826027,2.58295913964679,17.588746785730844,4.037745132402839,11.650676825029578,3.926855481791258,10.931199562822037,12.082533750131258,4.1873699448155355,11.69246526037825,7.435911631416552,18.662590197924843,7.122782748732623,18.315336259291453,17.086076944996126,13.2594395687236,3.566805068357115,1.6494654950885579,15.481192380815806,1.1808528683420638,2.8413959549824996,2.258354944995107,11.65225374777033,13.915255521445498,7.305113560316552,17.704489069246023,0.7395969659147861,17.673725635544997,9.397524808942514,11.059636559217516,16.784350740181452,12.490617994824484,5.495624468280589,10.193771706884075,18.06586844831386,8.27136332543211,9.51893188382341,17.32873853301751,10.715611652251438,18.702810838279692,12.878532909820208,2.410600884132439,14.217043545572565,12.69580998791541,3.8489514070314668,8.524185859323472,0.11500175470070317,14.123497116284591,11.688945964578878,12.860735544953119,5.956506471778944,18.912909261157775,8.804550729827891,17.984648800862487,19.87413061612557,4.88906725681749,14.858226304819029,8.168928882685744,1.771520261947881,1.378065761917684,17.920427299938225,18.354084650431616,2.1761165634191793,14.389482486910579,14.662804868888536,1.8995094283615943,18.00264703746595,15.542732273772266,2.247651181618675,19.80534667576917,2.018027012322081,2.8379312439091064,7.922384287702453,12.422540004865121,8.745904371583958,1.9708542345481073,18.09177135570993,3.2844770114416866,10.666909143338081,10.644338100305632,7.812523192478946,14.017509170691746,19.804215316485955,18.130715388417016,7.164642478213694,7.721677505263482,2.9007388007437207,18.24897594917833,13.236042937247813,7.280766228046209,19.99305072972262,1.467451042466923,12.988750259360845,8.402170488172459,11.14419609873012,15.71630780525863,3.6326697442824774,19.62001863471879,6.507288305839887,17.668512909179057,14.102849112626213,10.180584583128912,15.650862485310313,15.148448787380776,11.259396543299744,14.174592504070729,4.665517342245988,1.1574487821865942,13.116840851060836,16.585530614015834,3.259886533611853,3.530171250684706,17.94874681666144,16.474008488254015,6.370734903979782,18.601873174138596,13.351028535498251,10.774987553158883,16.39370020116704,11.03981766346758,3.7328348969462866,10.521004403977559,5.101757932651312,11.054680613475497,9.186449229442047,9.22840580886406,6.574324682693744,18.578212300100404,13.80775230590936,8.791215308931758,4.491882881638647,19.289778211864267,12.296466136809556,18.09036439060941,17.72576345880678,17.850428446833114,8.0349627753804,8.93445637183714,17.87855003227936,12.511472814112388,0.6304062996189108,8.718823916158653,11.45663966419892,4.497962401700262,13.620732026295865,12.846657909611675,12.446411276549338,17.832960573411555,15.411561655213957,5.870997617614764,9.853383991046577,19.76041620947745,10.865339212617773,6.733268738174583,7.3023615076012005,1.8512062466782675,14.971973654433356,16.864287216225947,18.949595826166448,10.599783258704196,17.930522345045876,16.357222034742577,2.3222214967911237,2.9754383873268075,1.1394016802360962,12.218813822643222,12.533852790310451,6.006452438105816,9.346490180999133,14.398624549106431,10.827557209055815,7.063990423506499,12.55650025450812,19.659521641080275,10.848711564842791,17.807010220837697,15.76653013458392,16.248114419767084,11.204905420513374,17.206792767007542,16.315565550032346,14.282667674056801,19.730844104221465,5.451145055918207,9.041248624623105,11.053237999123944,11.465712622441039,18.471259560841347,4.47215397211663,0.30349347317979447,4.17943478697917,15.590789752981058,16.863295685699807,7.5117345756580445,14.822146814366421,3.9327071877175834,0.6064712019945029,9.01155590238384,15.14600395733677,8.42886023988369,6.32806812399755,0.7969229797484312,1.9831529325184194,0.30835858331209387,19.67578975656659,18.450501509471845,1.804445922664275,3.551060389331999,11.160635666613508,12.38850087058787,14.029515970928706,10.64989054712151,0.38710361257629167,17.27179985005254,18.69136542364491,2.859166117297951,11.867854416182126,0.8194759957613806,17.560116077096808,6.709386605061076,6.316019946743614,9.512175590351104,9.70103558193873,11.165474302160163,2.8681252542517433,5.272303200558808,12.270533750623184,19.587270484785854,3.2365536742360312,13.911570472411636,0.8488467966468738,15.184842197094518,2.6174864439793,11.81712804797765,16.332646919570244,4.302139483895853,10.268595162226388,10.167718442924777,9.26772740141061,11.168603401267632,12.164491306912906,11.452903707967735,13.182256221777973,0.12304534482832086,8.203046294221409,11.833775053240334,13.996280026133885,11.8815169397066,14.024883820404806,8.615547981882115,13.282167857782836,15.748001104834021,7.171101733685741,17.24848541229434,12.553879858153444,5.910845168748002,14.814740828283895,0.8719881002910723,3.671266715725623,8.928958365680613,0.7328579561973747,14.873535055087327,0.012816187430244597,12.891897220537704,2.210041756977783,3.502832091749788,11.036611568537067,10.650445020326362,15.189162060500836,18.189042834004233,0.19446066936385176,8.251659079275907,3.295787825052825,9.146183820255814,16.975337382729393,12.842117804154052,6.579274556536787,16.175182216051113,18.83609319810086,5.850986937301599,19.652995622882656,10.63603863486314,5.436556320944015,11.330700045645354,3.4605494841045026,6.269135916300836,17.487191328943553,14.662841705196072,8.1677228670019,6.447706884649835,7.343363389067528,18.477797275130904,13.997999242616856,6.453235174492793,10.895647024358093,13.791138403704956,0.03926892810514726,19.22650327822064,2.362453730536247,8.806936185016632,3.0967545417013964,9.867497293762977,2.2866893261714827,6.3311851867519175,18.563698866273427,16.339706910119975,16.973310484909476,4.604552274330129,12.534590480678357,10.704060444603858,15.626929663314165,9.082949815469611,9.032889700043118,14.896770475413454,0.5737449514508297,12.301004267392734,19.827954149100933,8.267865016630079,9.798625021754393,18.458657100446807,3.8506768956376014,3.3128269112624764,6.143565435043947,15.499921450477864,16.24354448638867,9.693419394477027,18.312039369212705,9.770668245211809,4.47721196095535,17.255631375792948,17.066866049088134,15.639116626298284,18.974397459432222,18.380476825449655,9.385723552084713,0.2677167015390669,9.492990760575712,12.422696081765201,15.571705237481845,16.775329781485947,17.421854343729514,1.6168169264098164,11.03611139791032,19.190665011792618,3.9124615438687593,6.936915141060891,3.4224155345708818],"mu":[0.1505829220801016,0.4243490596702286,0.5866265623005702,0.49311856345211047,0.7625434206547126,0.8513502430356092,0.26180967328395277,0.3926600028343663,0.22776672254934627,0.3598299771636584,0.9451719686852131,0.007314511491813169,0.9048202314715359,0.8807251248367272,0.4154010113384432,0.42193944281397,0.9427320059264241,0.7154809128504602,0.7184373586679296,0.32192233063598086,0.3138142259109804,0.3020318894441205,0.8972033654266585,0.4818826978343884,0.2522357248806897,0.13881880167102034,0.3167759659771341,0.86451439802208,0.19335618177772473,0.21680302416586072,0.3392708038269858,0.6799301706418048,0.3633102912827133,0.13856274117506895,0.6322039273269136,0.9331913161565524,0.6835884398982512,0.15103505775584014,0.027194534739333198,0.18872847797087444,0.6601601133164547,0.31102201346824243,0.9743479935991992,0.7878473707591032,0.18197208988681912,0.5289613626923526,0.4052554020165171,0.23436819660876385,0.7739201029489293,0.8830458659395282,0.09776151510596676,0.556361281849971,0.2202946292709329,0.5279202906860605,0.707932128575645,0.5404838501493934,0.43637268484804714,0.8777727469659509,0.5846203249984463,0.49731700451050354,0.7385457029546907,0.4591964405889726,0.759290333668732,0.4915410615465381,0.9176630900965248,0.6309398347719597,0.7467706695727667,0.8007864708180881,0.8751301100194773,0.3225198782958101,0.17473331203874953,0.7484192576604907,0.35338375942653455,0.9833031730628212,0.172814369745375,0.5528613000832105,0.849769157202044,0.641740771948694,0.5844915772673962,0.4663625142794616,0.3584430430615513,0.6017583200936452,0.869187516499458,0.8641914371778496,0.35964493938025344,0.18735813051656436,0.5882183888422423,0.9792273368787374,0.385600440064243,0.39162173671728917,0.7066353222046313,0.0656705809405087,0.07020664659690112,0.9658217096885453,0.1940511218448271,0.5760113836550365,0.6580355184009046,0.5580717974246368,0.9118624933228259,0.023141414083625023,0.781771967795742,0.6546344897895442,0.22560022316660122,0.9676230362227323,0.8011966148421492,0.49315149311254936,0.5314282640115955,0.5265142572157337,0.7846714039713762,0.6289262326790699,0.9184208930003777,0.8017403022304757,0.16661654161028716,0.3788952082905295,0.320885162696674,0.5731720261028106,0.7868944998314218,0.3785848679600212,0.3678219457935221,0.42371607449269444,0.2975626391578756,0.4654024530657377,0.8178802752918373,0.8759517647796127,0.9450569113053529,0.9763457636799509,0.6796489832519577,0.7454789785059062,0.9729956413739873,0.5833564027267562,0.6913717662104206,0.06001819733363223,0.5362240823497553,0.02652848559361054,0.7461141453632427,0.7393012124200378,0.3313169118375301,0.8605171790304069,0.27443326904159115,0.6169320244100962,0.7530952454637996,0.428921237858193,0.46839006555241447,0.7368694666294076,0.9118122430367253,0.14418510265846907,0.24269381240093613,0.6981084047738637,0.9270744883227306,0.005378701082176196,0.0965737260754278,0.863942495711584,0.6724150132185223,0.7672049812523349,0.48991845580452553,0.6395038889607525,0.40928838263095746,0.9967835557182727,0.6733404488440207,0.0767077637049205,0.371494625083133,0.17726136885546584,0.3823900670391873,0.9282475467725726,0.823612830990013,0.6930209942369341,0.41988250287356443,0.7403043281321633,0.45903820052716626,0.24728886804775807,0.3804175322682761,0.49470519721864936,0.8831703526539287,0.9996627790366692,0.7948540015700467,0.09730808013362635,0.12616950549035577,0.32532750622919226,0.19966150152421225,0.6627834902475287,0.442737452789582,0.036094028394564326,0.6420590136579025,0.24547599169591328,0.934388548999382,0.5165394532052174,0.7151372205600401,0.2988830139707417,0.4217789018275171,0.4239343306466814,0.29745520133945935,0.03162790011602867,0.03954034588154043,0.558710502403678,0.7037479329457721,0.11621970163049933,0.8098885037657515,0.655840089653003,0.7959540956978703,0.24770046023537584,0.27655356686871446,0.35127777870197896,0.6852863793855033,0.7668783093200731,0.31547836379979577,0.7812965330122146,0.20222577591336166,0.524966809547839,0.5439302305385714,0.9567861709482697,0.1697233583662059,0.9411979638230865,0.6805646832506389,0.1337919471366198,0.2347237808028011,0.8403825262272515,0.2558602040688698,0.9886981024206629,0.5404784492608883,0.7315375773985846,0.6644034607342151,0.6409124598827924,0.8674587554217565,0.1950638864826031,0.5554028443091084,0.7229370951805296,0.7962742338051614,0.49911090436868566,0.5123614021011842,0.14169965866444945,0.9779775834898037,0.30557746046546597,0.9640513455294999,0.8899063849199342,0.1250785614930281,0.26710701330868636,0.05686423961483533,0.8161493467087941,0.5024260218251304,0.4963290248623682,0.2562997746183522,0.4435115165041439,0.9844146601316912,0.5887194240008775,0.31131040246070296,0.2031227543481986,0.7834079054653564,0.8027795991021651,0.38126243221069633,0.16815888628296793,0.14665198321329598,0.7656860889729058,0.8135428257238371,0.4761295420239746,0.2463445718560986,0.6494565177255329,0.7604125964859485,0.5720296860029368,0.14027122871872155,0.3135198510907715,0.3094914448028263,0.16268454485566708,0.34884010301271573,0.7167929755697318,0.6075836433113426,0.8287734063838799,0.03413505608198042,0.13394002489999113,0.44940315801909514,0.21764142969255418,0.17420407933307835,0.08970463719048372,0.3457351511361819,0.3456983204881676,0.2757310035302034,0.08300128212018887,0.6952725757836642,0.8220132309936476,0.42053299071454187,0.3629546732853366,0.03563196295924165,0.9091632054132583,0.18261647296823513,0.6944155685451123,0.923641990986632,0.29735580268900597,0.47645740749372756,0.46593051285622056,0.9418544507552307,0.8379568881513682,0.4312097429184323,0.7781653187153015,0.005545721303573448,0.7831528308124587,0.19416678741326998,0.6052030597889264,0.5380484918817368,0.22444876091766375,0.30159037726116367,0.22782413183737282,0.46431102768018495,0.8450870302452982,0.015368577524821792,0.8474169861873646,0.8419813316755251,0.5006300940179405,0.324720450431657,0.4418670734729915,0.377241819497385,0.4921564459606502,0.4466702804576064,0.6570502736367418,0.7698419462857105,0.22542557287290754,0.13397809068634214,0.7210705414041279,0.8922019221443818,0.5044976161337538,0.9032382698804384,0.12705032078007572,0.4836339021413141,0.2010195967313262,0.8416499473124563,0.8818185665926543,0.7507670904975534,0.4239478430183361,0.1964509246185453,0.600647114131645,0.4088246234869255,0.059152277197946024,0.5389495445503727,0.9040506170746889,0.11962022161653674,0.5636820437471091,0.6916811812996906,0.2804841630352497,0.8814407827604009,0.7288746707967815,0.03524652114946858,0.17203396259418313,0.8493505157807906,0.5602674135366217,0.32456219631678795,0.005552491371150214,0.526464381986155,0.42457629857947365,0.7273720497095473,0.3604095428286629,0.6300199441483518,0.7415377537279766,0.2638562964223614,0.9955710617652516,0.03710743659131177,0.27785829597025935,0.15440698020374133,0.900557962152994,0.15129283802419802,0.3726523295735742,0.02700290192170729,0.025523464712378763,0.11966045055765973,0.3967231286872235,0.9110643678996844,0.6371448177729344,0.7968941848766626,0.11810285410869237,0.679125750139866,0.2461805949403928,0.420464201810018,0.7422489146510565,0.29621494951662153,0.09375681671969738,0.976163191175113,0.7003802514176345,0.507263668460554,0.8772539648267541,0.3083421029259805,0.2746081843110264,0.5868410402272695,0.3449948072076996,0.41357741804001114,0.08392802560582768,0.3933375281290965,0.685492595787228,0.45563110699881815,0.6075853207137565,0.778033001198654,0.2697175789635746,0.8653936452141247,0.6394096729661429,0.7453272177138568,0.664740364731683,0.7958097339453267,0.602879871604332,0.6393683892351965,0.5576514237785679,0.743277538433059,0.5110202689003069,0.9443329827880651,0.8188781006428394,0.660358640424394,0.8753398248768327,0.8423099175600133,0.22415352881739414,0.08369438867954337,0.38621894249674704,0.3986759749672468,0.8835903907064533,0.37693248006713254,0.9565515069240218,0.7336036270201542,0.9436664033153432,0.8991128779659052,0.0351631958930414,0.7243261782708885,0.8781691786018213,0.2746173873297466,0.5210644333066967,0.5697858894032586,0.7487383705996999,0.7432823248673273,0.5650241622530816,0.3752104760070103,0.8884673154637652,0.7503667088310972,0.3132889963682586,0.6542837847220118,0.2824945382231574,0.7441469808530992,0.04592504381686924,0.03080200693926005,0.17233259810935264,0.4046079972354768,0.833860563237256,0.06648614159151589,0.9818959440315966,0.6994111922151216,0.5389915767373843,0.8881108844162127,0.9588387472304571,0.82754414776451,0.9637240039243076,0.7908192245220373,0.9218885348608381,0.4033383903882364,0.06874024777614718,0.08986345187642764,0.9972043185493116,0.8478488703138474,0.2885611382044333,0.8649045473733841,0.18366445442515977,0.3583273593064271,0.586210017336305,0.45890377047236464,0.6470837344918725,0.8615756254239015,0.10938410257480258,0.8234462010061048,0.5280711113004954,0.8622220020042095,0.52634907563197,0.1965261343884983,0.9087243213532679,0.3685199071120304,0.6362305948685374,0.49744747819989565,0.8479710246086414,0.2378744845915406,0.07324571045376138,0.47387397267890075,0.17612507345890016,0.5453719543350959,0.10357121964158389,0.9693839473335244,0.36600770151993167,0.13036841155030765,0.7915091113742265,0.30585297611666973,0.47416001139943154,0.8976520612481906,0.4574383110593985,0.26030719385973966,0.43520617662580174,0.6261884267477782,0.6051541210720714,0.33838606599078713,0.38267490929348735,0.6375472263331605,0.9774247603359716,0.08629179284117194,0.7394871931849747,0.4092510687418085,0.8262170028948905,0.6380404877391366,0.2099833973264793,0.7008680629146311,0.09086093820385899,0.609899662409072,0.8704011515714536,0.9913548769348406,0.6519593374312112,0.175972554794964,0.07287276707276691,0.7729341755473673,0.02908219579066129,0.6691738072739064,0.8970304100304884,0.6349636212231657,0.37282649374297283,0.4697511588809107,0.9928956570284191,0.9329913059315604,0.18278836479095606,0.4696575742884981,0.873233927458926,0.009602086957410716,0.7295637738408021,0.06986671588293158,0.0851118688708834,0.28330695540812467,0.8429626272753334,0.2524117009276816,0.3312196671033163,0.3814176124503146,0.8274986881300705,0.03575071597051038,0.4585607061981545,0.9216756381586475,0.06931899532644903,0.6312793519099953,0.5069789714688011,0.14267706536361446,0.09721521042091896,0.8144927377115394,0.3358489390264099,0.6637458229075732,0.5152070847596926,0.63849077731241,0.03861236062048756,0.4342644524361752,0.7525269154330578,0.132464061390966,0.9470220142781152,0.04200781512829277,0.2587508438091579,0.6939817583134162,0.3913798598502396,0.5242553260705196,0.366681618030674,0.9455096414430839,0.20247799216811457,0.2869144502026775,0.3845059437954297,0.3180591782563247,0.31339850961052274,0.22893009959570532,0.42805217445129173,0.4802594612096265,0.4531754696387613,0.47535682529684853,0.5594879958936918,0.7977053309091258,0.15401754397641043,0.5619949640243589,0.5983680136463723,0.5780789493878884,0.7084631431850721,0.22400960100969614,0.9378961867522435,0.9538198692266149,0.48098051937411546,0.8730083797538799,0.6750709273879627,0.5827755177508838,0.6534875319034825,0.08766344645539137,0.5969587038259854,0.5249802205051026,0.3972842828481269,0.8417018454791934,0.03360842614469384,0.9767713451206337,0.6324951749812819,0.7593609523297782,0.9943692767854868,0.3223056290014714,0.6320790825954623,0.9334308004973133,0.297349013534862,0.2256875296357328,0.06792510838823107,0.9650346338809292,0.9587904698637417,0.7767095222323643,0.795246439008962,0.04330091046886486,0.42386273832586707,0.0036965768094319174,0.5675313391222294,0.4477677587302442,0.7352652910036257,0.3097723815735385,0.7142460893407643,0.22858772011784922,0.49399240426290114,0.20807976025507968,0.6900135661379048,0.6410921561660403,0.8406847538916007,0.7743822215301133,0.1154418619681099,0.7647355035946777,0.5193846730882221,0.06358976493018198,0.595096990493337,0.8426506109214176,0.3250457889035956,0.15706662617811773,0.17596121035819046,0.9167876538299307,0.2842336458014394,0.09557722006896574,0.89813389422992,0.8345098997558915,0.2276681078712368,0.5833715799027526,0.04695517389078141,0.23392210584328654,0.5764577631076526,0.9079698922194241,0.36038978573978486,0.8031420899053143,0.21913155560146924,0.21467854520194019,0.19997580324529296,0.5714027500322503,0.664433047900439,0.6815443934538987,0.9551820595370017,0.0137250386401504,0.8466656172088942,0.4515274650243264,0.5580286916930941,0.9079673904203471,0.5129203117078558,0.5759887269817128,0.6017891137445224,0.3287725743073646,0.3790617733510453,0.6868135545556324,0.9660773893832137,0.7796023792723745,0.40838088057287925,0.5013194678540747,0.5542544651743069,0.7137170629034035,0.01765198383169464,0.15225008916076477,0.9218030771666923,0.18380423300177395,0.9637999991197921,0.9458267475561204,0.5852858114396728,0.2777291695997026,0.6110417835273381,0.011812148946051648,0.9473103502329547,0.9312740522192742,0.9335884768520761,0.5681508161804392,0.7190316031182105,0.787895903486304,0.16367789996575044,0.06704695293735652,0.6891490605420478,0.6781695671188837,0.9706155429376635,0.08083764893803336,0.9551521960290368,0.8542096637999332,0.45017820441526224,0.1662422119374949,0.7112697478080525,0.40938902019066936,0.8781033004614938,0.9153089135329191,0.18173908208735234,0.19400398065214497,0.6423060474585682,0.6619438336541772,0.2300341288483383,0.8819353486537664,0.393811838793529,0.9750953843230246,0.3538222396531916,0.5190837634384964,0.4378887839729333,0.35518020055900834,0.18437755558778401,0.9116986950710402,0.3319267072205163,0.6147576974265434,0.3021365858829428,0.644215119506556,0.05603761697526011,0.39640627470992995,0.11472333585700678,0.9871358962424996,0.5577531601431018,0.15922842851064511,0.7540244718850699,0.9967413085860086,0.7001629667430247,0.8302497665364768,0.48493822770314066,0.2756384680294355,0.07999574980492286,0.5360361934891913,0.8116266768053992,0.922127675242916,0.2451337899067525,0.5131127359376468,0.624616379278295,0.8008758939306315,0.08192193716864993,0.2739940994254255,0.034461646751209773,0.41652222445969267,0.3470042675899201,0.4656388396522475,0.0457077810533455,0.31985096443937855,0.3468263359209529,0.8595306017960205,0.6666591764603407,0.48391926489658643,0.3241416538763955,0.2321626549398388,0.4794024057964037,0.9128606385529134,0.07101766788120667,0.9836633475155496,0.7496640419581304,0.032373913078366456,0.011762670129575659,0.05722082280187668,0.007756304130065672,0.32701886471721453,0.2864497971852886,0.5385087462268487,0.6152567196117626,0.12467900514481678,0.5231619128771132,0.8258819038613952,0.21322956151647987,0.7493236742565068,0.1761350487769524,0.8538352220319823,0.9564694325547312,0.4016854657690043,0.6570957151069603,0.6786713983017423,0.014512979688532823,0.006324187308780926,0.25185478426586094,0.09272476875470503,0.80443972054359,0.19278722306788154,0.7887434341244035,0.9311124051270319,0.010115383855709092,0.022834421311074715,0.41934896645654485,0.7592875419806415,0.04473001761191986,0.25901106139590824,0.5149763417427675,0.35005462290126244,0.37861522282560656,0.7796651312933531,0.7183244859567959,0.4084878578618436,0.9145852146891347,0.39213199718844494,0.03253556434588911,0.2942097958549881,0.58292785695277,0.7459454093575126,0.6644682445875869,0.6303471662123248,0.6632863178899249,0.9837447654842828,0.8040516151814459,0.22634822039455682,0.5707188912557437,0.20543838632270583,0.04169823409944251,0.033039785841535885,0.9918429851301089,0.18450388487656832,0.4286803440264768,0.9010649755559583,0.12996700090538327,0.15388830028718758,0.20467882424291495,0.3214181535502627,0.3657514521664844,0.6531201356833434,0.43615422577758145,0.6708802392074245,0.013263673541177523,0.6492382199628755,0.6686240104969365,0.5735389937406268,0.8001844534595264,0.09369241884021462,0.05103190169680438,0.5990642017180938,0.1708342146462598,0.18769043019223264,0.43072514983409294,0.5736366380619455,0.45594090580486224,0.28470408055085383,0.8324113544584655,0.9757786049615222,0.9040336184806315,0.6383925462603424,0.829581932464063,0.2774439258168402,0.825299094523501,0.523252184876839,0.28923708237329704,0.7931629733363903,0.8339354537067369,0.38437638441217103,0.290282165589163,0.48196711846959595,0.546355075730864,0.47709914932441566,0.7253010047493984,0.7237880473381366,0.15478060919499548,0.9029461348521131,0.27302902685578334,0.3704884191695774,0.9292516737799528,0.7034917759546881,0.16311716090755368,0.7095801160057953,0.2289984193726211,0.28263783456075053,0.15720896076780688,0.9030793515202185,0.26742276015260646,0.08002695500909884,0.22324640408629737,0.6774365184524831,0.3680368346131555,0.338666343186415,0.9650104565230639,0.26592791028085205,0.13543574274536452,0.5287413798025049,0.06518451146778337,0.6492499949444177,0.8347469735239905,0.7770062662017259,0.44595605004691174,0.3338097620732279,0.5677302676175175,0.26205153732235265,0.5086083026570274,0.34061459859275467,0.05226634080587922,0.5062413787645064,0.07505252049276034,0.9262219344158784,0.24708663762266703,0.4308715820472102,0.06985329832831644,0.5544881420889565,0.4906789424832674,0.595893986710957,0.11538263463425391,0.6135222688077313,0.5626266867336669,0.4676249749647199,0.32855554755376626,0.24426772054129997,0.7648483560321195,0.9436844783431872,0.9298389792740389,0.026288819816707942,0.3383535696304403,0.23690029297082416,0.3107991386283593,0.33537689696832196,0.6609347209832552,0.2536680866751235,0.30634067041120594,0.6722562160364165,0.5516082824251562,0.49683131726012997,0.006470776640650655,0.33828283363822553,0.5484527818579257,0.9468677258626268,0.37959461251255733,0.7282181088219373,0.24172188488631519,0.3486227967097697,0.1904012718826349,0.053678671496717456,0.7908782137543882,0.3919866186923906,0.9889086218542233,0.6835318990511601,0.14426854201474404,0.5644102352102076,0.3722278365215559,0.8755615597729876,0.9136424512914452,0.3296165508013067,0.9156957546643258,0.7871553780143128,0.5516161980980032,0.7360064708998231,0.3790174660277139,0.3128743374249283,0.4383336781872442,0.6430504153977028,0.8896897323504735,0.01635649832376651,0.9007546020097559,0.03188299997165078,0.9585503745319484,0.6197481624926915,0.30994166008614865,0.005145745833050164,0.5573483612772805,0.555267914885011,0.016075667496893153,0.9313324741012987,0.31064820519004255,0.8513578810649434,0.038008352111564614,0.40732083380667183,0.6774954739371288,0.6814674862058128,0.34475216574047907,0.5856250949210957,0.41385185962260485,0.5124254438766884,0.8015976173214492,0.2455093126953969,0.7597517122054089,0.6264947854734018,0.7500109369084031,0.8686857756033419,0.40424033577419793,0.7199700295475875,0.3856811995905345,0.05964176974876034,0.5880031299228725,0.9733708447794132,0.19351499382278714,0.1442927682222248,0.27042373956444155,0.867220585826554,0.9884925600981993,0.35021643172643,0.6556929424215812,0.32350106597482475,0.9295997683140005,0.9793175375411489,0.3258139011039145,0.8900220614069865,0.7394919186364148,0.971308616481922,0.6924442284142811,0.4317369037514378,0.07517995386626386,0.8754207688335813,0.9286712447625085,0.05516620526368343,0.8355283045900508,0.8549649706617592,0.9300991648401957,0.5482102785384619,0.8117942057196141,0.9925018452892709,0.7290364004395906,0.31525512580942383,0.6434341771230769,0.9215285831767983,0.6730718189561404,0.7771940763937994,0.2687772304965046]}

},{}],110:[function(require,module,exports){
module.exports={"expected":[-5.342261925554924,-3.4101705663914386,-252.03975990231663,-7.309043160182997,-4.860688547228846,-6.652044497622457,-3.4704435644193365,-2.515009029282851,-3.5075361893123675,-3.858921147890678,-7.17774995727695,-3.1976811972565344,-5.43980078447924,-6.285676016364686,-8.34286936816346,-4.995512171819854,-4.910586803233131,-4.405887842610501,-6.061300861557895,-6.723431837392247,-2.3318784281967333,-4.420240506293652,-4.2863681984255315,-5.305765559933377,-9.294081173272524,-3.529049564499415,-9.131695401386061,-3.9303348620871033,-5.448005187245068,-10.093442930792005,-6.163496224657891,-3.7928963375488194,-5.904116452026362,-138.16332229763452,-9.473435079301677,-3.466277015174824,-136.0504147077074,-3.4185961357433157,-16.590790028651824,-4.184021164267518,-4.24438495291839,-3.1353305696572944,-11.225536837025635,-3.2723564233379134,-4.914913976673069,-5.812011312672594,-10.491903735026202,-13.15956615678797,-3.144018924910174,-5.098296441118854,-12.242325791864323,-16.342558271758772,-3.757252818567763,-7.428166686613095,-3.405770659800819,-7.3240458914574,-6.153440130568093,-16.018963144489724,-4.373977033088314,-4.073977186109095,-4.124605065501951,-9.413560421811228,-5.667722432161597,-3.6973325428800012,-16.18612472193152,-5.442194617644243,-4.160580350168008,-6.562834069551311,-6.804192004482305,-5.946854273513593,-10.263230933251313,-34.09071547182398,-3.116939454018355,-4.039254842196553,-5.970321148328998,-21.44287107250702,-4.988047684944133,-3.6252579652619863,-4.106105053485412,-4.784683664713611,-4.31713806886499,-22.82809680088294,-3.660603437089024,-4.474200271396235,-24.221786318347448,-5.397245158605376,-6.666494012272785,-4.8961123672722024,-3.444432181951581,-3.569587296779293,-2.580393096114226,-6.542409093387269,-3.890066404082809,-5.4535510021102045,-3.2922986668201286,-6.358974682529877,-18.412094518955836,-6.509888855081964,-4.833675134447718,-10.412093345350542,-4.068538365063337,-6.690472382444575,-3.795863248408863,-3.504704860819672,-8.355925366723365,-5.422262150565674,-3.5011445249565067,-3.320865869739767,-3.5406220439487743,-4.271706550097769,-3.9078528256499396,-4.495068481041576,-5.471816275882197,-4.061869438211493,-3.7749507380710985,-4.983628984569177,-5.280069600431687,-26.211597584325222,-6.786056105266174,-4.377680371305252,-4.637761639557736,-7.389763373868905,-5.311184311865108,-4.148799815788143,-7.829383176906081,-3.83519105146339,-6.089179738964806,-5.706887858612607,-3.760010313028319,-20.24987257819915,-4.401452422953432,-3.455821600077645,-5.500906230194653,-7.463107240531431,-3.276921577897685,-61.48874595718871,-7.208999748182686,-9.886917819436876,-3.412420799244839,-11.154352306381732,-16.525755970111877,-17.03864195891764,-4.460615226463818,-5.1269038975838255,-17.96975170372063,-5.985248559185163,-12.203184237906624,-3.50699430929962,-9.780636801297797,-3.7361464926657106,-22.49018438651327,-5.668562049594268,-7.218061246070667,-4.343159127228488,-3.0513607685174247,-18.30185869289242,-2.9798786518385323,-3.7993432618191,-4.566137076595276,-3.3338118354892345,-16.966496256515697,-7.109938957740685,-3.6954475809008596,-3.907988856427287,-3.104885517898491,-3.2577416791834355,-8.89360709649383,-4.783746751512277,-13.662753734318622,-5.705245255902861,-16.010103436823936,-6.008771762310783,-3.877893590686836,-4.834619185586347,-122.7371208882424,-33.93889804625305,-3.729625414208159,-4.9851029880619215,-80.81218893509195,-6.447071525532698,-2.891334631066316,-17.007454539488688,-3.270994634544186,-3.1218537529450745,-3.164997572146542,-5.860160468403992,-6.00428317192625,-4.084457634573984,-3.47866996637713,-4.4567560383412985,-5.494921459609348,-6.959776641876393,-5.1085879407477925,-8.665851448293575,-14.007415446637872,-4.6694159823386,-3.6190982238012954,-7.014319484874591,-195.3817521974151,-3.891562199820496,-3.220189822078421,-4.736615016921881,-5.240657617511948,-29.171276440822304,-6.573808654937244,-4.427354128969032,-6.873617933382524,-6.568694794579587,-3.4362802652331568,-53.84341032346504,-3.4463271452189086,-3.6723767299223056,-11.840983508739532,-3.4909092533367305,-26.564195800738574,-21.136229343593243,-8.373718244745687,-11.643989997971866,-5.374901788680727,-3.574242897242039,-11.965193152110734,-6.2154500520754015,-6.046239334794708,-14.629945019100685,-3.38575472684359,-5.768993910881966,-59.692997892745694,-6.3408108226922195,-6.452339815401932,-2.96531668461887,-8.298548905159109,-9.605672126048566,-6.028221864769885,-4.833946458286759,-6.449476471992354,-3.8581382345959074,-3.5803663557427443,-6.211992433652923,-6.7788282468604395,-10.438557852143347,-3.873566616219258,-2.4718081138709334,-26.10224683317226,-4.524036875357944,-3.6981807773028184,-14.646442290332935,-18.963280046920723,-4.7207577401773095,-4.173197828715839,-7.215494120749567,-55.662942595538944,-5.286000999208726,-4.874535437665086,-3.9259275454728684,-4.894743491556337,-4.7215157958885055,-5.678909723853753,-5.881725438062884,-2.0729879193359273,-3.8975485151603,-4.49104977202231,-2446.9840571951504,-6.411566409901062,-79.68497382900942,-21.583059314814665,-5.216400680924343,-12.600287160326856,-5.174335524873538,-8.561352770034894,-6.1394890577045285,-27.742491834070517,-5.475479903641646,-6.800809267058447,-27.276707397572633,-4.543634602757383,-9.20339441850558,-9.36884439530067,-16.372287993680025,-14.821933150463362,-41.7207649530052,-3.6685820616208127,-7.887016333836129,-5.927595099095454,-13.97566896714164,-10.877695720363356,-5.928718930316643,-7.1063262017841184,-4.376966630632964,-5.214652461969262,-36.927023821043925,-7.948203475081403,-3.278690281273863,-8.236706619359662,-4.356987010705154,-4.011438696007725,-6.898181096216112,-2.796515302797415,-3.1514020360391197,-9.009057398046407,-14.501226002032642,-87.74107715703505,-5.0042541634454505,-5.092193455814136,-11.515672137521374,-40.843212885008654,-6.9433334791549,-6.14708152283863,-5.289177615751141,-458.0830358868964,-4.807142227746899,-5.724575670293602,-6.612562873057577,-5.241110957416864,-3.4213315591112066,-4.871776442659134,-4.898192495027853,-3.2020285655262217,-3.6685253945417675,-2.755055168491881,-3.784611174547809,-3.573971325547438,-5.593288208385245,-4.343796644209473,-3.589781460017785,-5.130444932779538,-28.513252108741025,-4.976204052908503,-6.445425480096919,-14.269536412921008,-8.638674721425572,-4.7213999347470335,-3.0494180204136794,-57.15058759857373,-7.941885125505059,-3.9763484432351106,-3.643646664418262,-4.415045896883604,-4.5906177796747905,-23.66314241264319,-4.758845946560781,-2.8771181382693696,-7.2066252399762725,-4.253288002852201,-3.2825039510280427,-6.826200592729142,-4.6744924114427775,-5.190473464253999,-4.510031823235146,-3.2580617952312636,-4.7740204575848875,-9.922082482766381,-3.832503077838676,-5.367344562744889,-66.2733714801654,-3.3328447917796638,-4.06993221647773,-4.02004713200757,-5.942096150726054,-8.560903583715675,-165.14267061058905,-4.296106425123444,-4.183750212611939,-49.83710707717594,-4.591674626441529,-4.46731957291389,-6.072169561268776,-6.142427197560469,-2.6971356531700765,-167.52063789317802,-2.907890621025741,-3.700159466190293,-3.7944783579903687,-18.436673931351006,-11.393835402024294,-5.067468749385737,-2.6823049700027175,-54.66195776216659,-4.65138812478267,-3.925394734052865,-9.22702476230465,-15.150616603809386,-2.832391448472454,-6.0674094385786645,-3.5542475015969357,-5.2565365253026,-85.45845986455174,-247.4961595057383,-8.810757745515641,-6.391554699838294,-27.27397650487073,-3.2309474872251824,-6.6124929008570685,-5.935570814561647,-1.787602482615768,-4.180135051909585,-3.182328856585472,-2.4777337072218844,-4.349512105237185,-7.25793336909804,-172.64878106779514,-3.574720275032327,-4.268769850877854,-15.69959895921598,-2.824594858259685,-25.50481453990658,-4.377849320313844,-6.835459767709427,-3.252906091904127,-3.060271671673342,-3.5013570919916637,-3.795201926704912,-3.0967171356910477,-17.346791947344556,-3.591440646337599,-3.4065204014685855,-6.617423145492093,-242.3874384108895,-3.5309529619597657,-5.022335086782416,-7.623597410753601,-10.05118496682615,-3.1197678134803066,-35.395651218213544,-128.05434249386747,-4.2000924624513125,-5.134554072041224,-4.2871129936126895,-3.8636049978079727,-5.338412069397235,-5.803614026534664,-2.7165495079685287,-4.236431645731327,-2.6536370759496677,-5.0976751983372255,-7.215716182188892,-5.009861512708643,-5.608509631270977,-10.378572709606576,-14.801104373462547,-4.551261812824147,-2.8115882798352096,-7.843410386450672,-7.016086663945716,-8.23662037735068,-3.6707231731156353,-8.171317298914875,-4.3613675480277605,-5.716976181091268,-2.954018736916307,-5.933419567394966,-16.888067425641456,-4.34191707105371,-8.324014510464995,-5.263641929540507,-3.090517927888554,-3.7538798989379956,-3.3778249810267704,-5.050633701580915,-3.3974056487086686,-8.151869815669613,-8.300486466974043,-5.634032869993028,-3.6141182089830117,-3.6287393607016805,-5.857163914581417,-4.034441362841948,-3.9391624496537463,-3.2119841770950663,-5.0377073340133585,-471.8457754124434,-5.168274599136213,-7.248079306036461,-16.866520743775812,-5.623005599416295,-5.380322440672534,-28.017304661811757,-4.644342742322738,-7.249036410300614,-4.791528699699471,-6.339094414136735,-8.414142525586334,-4.030909883099173,-4.578974507188327,-5.514064203143556,-28.174902747646463,-7.868748314101039,-6.933444879331704,-14.712411141689072,-20.512299849835326,-3.2574179503977554,-4.461505169248568,-5.941148894396403,-4.733419433063447,-5.675387841724126,-4.108539187359369,-5.7260176108426615,-4.77007101404174,-4.731861094973656,-28.879233459492152,-11.969651694447366,-132.16131076379727,-6.016039243200804,-7.380715678838735,-3.629671835302441,-4.751241199850459,-8.826506006254554,-6.2999219744636505,-4.29024036911774,-5.528823744444238,-4.605855083346402,-4.5383425026704565,-3.757226261978923,-19.358921476471615,-3.305980937946499,-110.20390547502726,-2.809385785863248,-355.59875452453423,-4.894274169746413,-5.162063852310875,-16.41416740428937,-15.9038378067383,-7.131047348079669,-4.871630091055188,-9.032642331945326,-3.1405849144146494,-4.403193651881512,-7.804342569256648,-13.191740602658681,-6.126640438998685,-4.2059851122671,-10.36781659386554,-5.162445380760371,-11.423596505304038,-4.682788947766532,-5.216646447899493,-12.129948966227632,-6.630651638220076,-21.519776245797726,-4.501403933576501,-3.8312987854880474,-32.52409556735727,-6.46855059731444,-26.375253220549382,-19.25073239429994,-5.447488784751041,-4.600320512766755,-3.840418989386428,-1.9550869275178369,-3.4057114546488236,-4.222676011884387,-4.754329636928296,-7.869320806387808,-4.083858467995626,-12.833398496063753,-3.4618445734778467,-4.724064148682911,-5.3129530245060455,-5.509786758934252,-5.28246711988573,-86.2133135440148,-10.493926121856507,-4.301206708081117,-5.839861820028012,-4.385445633695236,-3.7154623081405664,-6.285896797914624,-2.873714961396802,-5.113620601181897,-5.095532784446414,-42.99718615531159,-51.882951332607576,-5.146472484805695,-3.036371484756385,-2.682307737236816,-4.567189098314101,-3.069318271162701,-5.160683617395946,-5.7061739406166225,-8.212502938449337,-69.35402416386738,-3.7232793629951897,-4.341080986056678,-3.8649257823845415,-4.726118410938935,-2.7925346716406425,-4.178586673743194,-4.167400887181421,-17.984709162508125,-8.138180008941308,-3.2203695474508667,-3.303070656856943,-61.13991933131552,-4572.655809366308,-5.686039210655055,-6.075002162717125,-24.515487251809702,-7.276441018080454,-15.538108726998795,-8.493157320659815,-7.264905550982358,-141.8192201030749,-6.010330878345795,-3.139686828218586,-4.509173475730091,-3.510649779090489,-13.01284753750833,-48.36075809012037,-2.888365226452967,-3.589045743945344,-3.6425339313259237,-3.182121532558835,-2.515257198093556,-52.25849104063062,-5.111495964850207,-24.027350450136716,-2.7560488410200743,-5.225235157907175,-4.941523510578356,-7.183485682535954,-7.344395713190019,-3.8687986671178862,-14.632470097229508,-3.7349816852959643,-3.4822756059576374,-3.1819693120515495,-3.1232810637633595,-54.84789703345115,-20.028708665131095,-10.163406454781036,-6.549130411813579,-4.494054577685371,-4.947601588429855,-3.5393280675363767,-3.2490910703504357,-10.950937016081742,-3.7349923109243894,-4.47724397706906,-4.3255295993500535,-14.174372890160983,-3.0310941778016414,-6.3351732297749885,-3.6955770413905515,-30.91010424635945,-5.986179939684783,-3.9408685930851934,-7.525797981075264,-6.8809250280284475,-11.785133772348994,-4.773875258493991,-3.993941020731012,-12.084399365457909,-4.2373453711250555,-5.124514159398951,-4.6739675893157635,-5.2712423367915875,-4.703038999922451,-4.12342272263097,-3.136207903380051,-5.735430963471404,-3.463457891184617,-3.186254386401022,-9.668837759890852,-17.25756121929105,-7.716403896874048,-5.709029606236963,-3.7049138331682867,-19.299056914671944,-4.07202322053372,-4.184795551761624,-6.803411979851189,-18.29931701652808,-8.981583359530605,-4.252448986785588,-58.107637096407096,-4.009723471586632,-7.623264209710637,-3.329532021329875,-6.078004302043483,-4.819826064390704,-3.394960532229391,-2.972444437304118,-6.9921023503462125,-3.036306709745131,-3.331794506911046,-3.7475033584859427,-8.601491900092537,-4.915851258299292,-14.199393736079564,-4.552766526800129,-4.811110694045568,-3.8025020570260715,-74.02070432298662,-10.309475307624295,-3.5991386063174446,-6.450080700984797,-7.798789528526653,-6.141402375206293,-4.810195439361606,-3.715580231326503,-10.141292973422036,-7.900522157676657,-2.420300897309663,-5.577380129382407,-8.255292554217714,-4.227798279190974,-3.5103582976405114,-3.6324570170460673,-9.40589353949921,-236.21294784804348,-5.550178561048523,-26.289515292460898,-9.264192539524723,-3.5290347796447525,-21.06821629208552,-3.7670057556438845,-12.425890726250678,-2.783144368118682,-5.577828422795143,-4.252140036232505,-4.3102334456464675,-4.839173783633654,-4.398979214341718,-4.440188918834364,-5.10215065932205,-7.09781296429199,-3.4384249522206654,-4.081124363681348,-196.44653732842764,-3.019032648014151,-2.9650262627837427,-27.980081511514285,-248.51383147701813,-36.99325836687862,-13.637205407748262,-44.48539734485995,-3.958481518581433,-3.8872858711474247,-12.217364694389516,-7.078215682711767,-6.847784810707702,-4.949017162590498,-3.096078592907795,-3.9588397528208668,-139.25125346087114,-3.3734379472809337,-4.1479346934871115,-8.030695991092836,-5.422841151179404,-2.8124282135614598,-3.519801197538841,-18.85287288661127,-3.0140286553233215,-16.795456096197633,-5.07910160170438,-14.334270556783952,-1691.8254367387274,-115.66015269661459,-4.033102787797991,-1.1656065920836607,-11.198626270473637,-45.57872029290536,-5.602420338032447,-14.377224188425455,-7.454616053851755,-10.511845217490096,-10.868602316879027,-3.7294975492244546,-3.4641985190648215,-3.0355470217722376,-7.314506787321989,-13.737640393550679,-1.6797186367887784,-4.365195964379923,-2.77793196293092,-42.11176287314108,-2.726015127833767,-45.05644832482309,-3.143189834653053,-12.834141572389697,-11.952764810181499,-8.387958612722883,-5.161297994624426,-5.184163719023868,-4.404629361585062,-22.851701196616226,-5.458422749731681,-47.37417804822657,-2.277851277367165,-5.516808837708047,-4.974550679301164,-20.794295805951514,-5.140909424321881,-2320.601096575139,-5.373507865656989,-4.579854148864619,-6.806571633352585,-3.521751629775981,-13.03152279745206,-4.554361208036817,-4.990783551938881,-4.290647853766606,-7.9859080100293705,-17.394669102984864,-14.43632205538784,-3.8052882652539584,-3.9558756697012445,-2.3128207860246603,-3.4331449737585036,-3.754970361689853,-9.064523124173958,-9.974826884398356,-3.642433384852697,-3.6466035172449183,-10.224213693852283,-9.834492009382682,-3.8053640789563454,-4.767882445532342,-14.948612426377661,-3.119325127679458,-4.3034405960629245,-58.25907976444888,-6.345080577222382,-3.60602678591076,-8.353581958819722,-4.574894505087644,-6.965623881290728,-25.22301803566091,-3.963290701571872,-5.815398917786644,-4.952959544314904,-3.794327175092361,-3.5526528338452357,-6.544109627408803,-5.062553631782457,-45.67248291905485,-3.688975331546322,-2.6959614275495927,-5.592516280848081,-6.455709024298577,-1.3303773697330783,-4.331104504958344,-4.543467282374975,-4.141192640698829,-63.8550224402024,-68.42136446798678,-13.409468214198245,-9.438115188724224,-4.8992461225801645,-3.678331837554247,-2.9308743766568752,-8.590830351001788,-7.260384286139591,-4.346675406667721,-9.20284921554951,-3.5631168793075596,-5.538155198983116,-3.6592724922462025,-30.468104435187264,-4.5855694118415125,-3.9259547656765106,-3.436591277681183,-5.917666585915928,-3.7809467143989934,-3.344640641663506,-3.7225839868645445,-8.971230137949885,-6.469678895867174,-39.08333973055618,-5.2638244938167364,-3.242403535256726,-2.516277888854216,-5.4431210095319855,-6.494487642083315,-3.3935071791922264,-3.2194295883253305,-3.8951528563153577,-4.710116541686893,-5.369954948511879,-4.751165503167612,-3.9039701658903105,-6.610551128472919,-4.24973741852919,-9.83088430159897,-7.618891210375912,-5.754925958381549,-3.9466948850209036,-3.011237432557729,-17.11159096052366,-5.069328617070983,-27.32226774403037,-8.261833494351531,-4.52145379942063,-8.11152319336158,-4.9470012737211615,-2.9073447888559927,-6.2537759011703615,-5.100145599464774,-7.21439367856238,-5.6171135024449645,-4.1813689979276845,-5.0300766924641795,-12.58218745704351,-4.842050850436379,-5.772342386864803,-3.4353296089961787,-7.403883227366004,-3.995851245867895,-4.160721885408696,-43.39882521687184,-3.6152669716224284,-3.835309431090175,-5.070168936403963,-5.471144216115226,-4.309599452174227,-4.847251503094837,-5.368153088004844,-214.51076184016435,-8.395872740296666,-3.3497450708058487,-3.3752950862441553,-3.8565152782078114,-5.0133862850032305,-10.300032152013076,-5.037692341658532,-3.7789278658592123,-4.256607438696361,-45.42297349845608,-5.86689331660866,-5.792158073192313,-4.705250534837187,-7.744091136849349,-3.1540217241375426,-6.880923942639911,-3.1942009263275475,-4.134261622564171,-7.020308525807429,-2.969069454266484,-18.82481584260131,-10.57061519586805,-3.8729441123540687,-2.663065793046129,-3.786854365237446,-3.043233019454222,-7.023999687555609,-7.316165483976334,-5.098835467037425,-18.138981211365234,-15.829361098551441,-8.240465958070764,-6.457841983117453,-4.916266709074416,-7.296782008140465,-3.471536104226959,-3.6422615545897266,-3.185920775185666,-60.702263070890844,-4.138669648410705,-6.7839988563385765,-2.776561526686119,-17.71806951969748,-4.276132257561539,-7.1288515332487,-6.667925196387197,-3.79976957034265,-6.359285820978383,-5.997242317914695,-3.4464544616527037,-4.449622221638005,-13.499857595515314,-11.11294337354986,-14.034487749588877,-61.211823531756934,-9.048145416270325,-11.928139333186632,-9.594510575166456,-8.459885461730606,-12.230375985146896,-4.551576791799566,-27.37270776742025,-7.185873826346054,-23.53808394222506,-41.598968193152075,-12.142819298281083,-7.5874231102351795,-4.313489297650287,-19.389338647410103,-3.560758056845719,-2.8593467636979093,-20.93237127676648,-10.03691597153889,-7.011733755155718,-6.031259001253498,-24.095562547271907,-5.959673447985489,-3.6994566740049084,-5.117804748879822,-3.8721822742547065,-4.047047765962847,-3.8544805730190963,-3.0392233628231047],"x":[-19.14078675760127,-15.815771476147615,-13.232475097045347,-15.734987774196963,-13.321552947765898,-14.478339283793979,-12.341148571466483,-12.147855892041523,-10.637720279564586,-12.201612000815288,-13.937434361562905,-11.187419205768656,-10.008957914627736,-19.6639154502382,-15.82023648181651,-19.844965391187316,-15.934062784527125,-13.353746377481297,-13.110899381236226,-10.474312358620114,-10.810512199729754,-11.038538026945304,-10.252454021180892,-18.886679607860728,-18.029674298365023,-15.211164754862423,-18.913577450299634,-11.160672876319868,-17.93440007147752,-17.410086227009977,-19.153296098873263,-13.761318022117585,-15.296916841951306,-12.837103723743313,-17.380773358075828,-12.40027652453734,-15.889353795506683,-11.621522381199531,-10.654607138289062,-16.019453502429332,-15.638892575971944,-14.180622708652015,-10.492561991204688,-12.39256594972463,-18.323385750126583,-12.770229313887732,-17.072945478875013,-18.955707836764446,-13.17625962171805,-10.608306218667817,-13.936304797787765,-16.928832411807655,-10.267452578865226,-13.089971233631733,-14.746837365184025,-18.437615291504407,-19.36760238197622,-19.725927840040143,-16.78368944491295,-18.99673865667681,-14.913882818134114,-10.811692220474423,-15.1987761741871,-12.802577327967482,-11.057399375792707,-17.37635282429869,-17.48447748465267,-10.739814597180953,-11.552368462138077,-10.318216441100127,-16.033314945196352,-19.80694692146233,-12.706077295865427,-11.909585409701208,-19.248787743090393,-10.052543379729194,-15.420038689267358,-15.259987142774118,-11.9480861822736,-14.787558888516923,-13.88705699908444,-14.347824427343188,-11.198606860907176,-16.284482785882847,-13.256674536949628,-16.160998161203068,-12.601235684007104,-14.564136380029769,-10.969563687572109,-10.55897593935297,-10.15578243138836,-16.84541279357279,-15.935855228686702,-16.096574248546858,-15.719774373658574,-18.263672983058918,-16.361242203172946,-18.960531511432656,-12.18624031115581,-14.897925942587033,-12.30105693424537,-13.366905456742373,-13.290044996328064,-13.120922559597044,-14.167873354815693,-15.677703453171025,-10.573685436137328,-14.354792472853841,-10.965548455101219,-12.702992128054465,-19.212020749015842,-14.766248958987077,-19.531069234008513,-11.703501807211826,-16.402157564499525,-13.818243647453075,-10.143427326910023,-15.34445170852736,-14.870485498013277,-12.585081265995957,-10.98250848570424,-18.50263524351337,-19.935492204792077,-16.06500769628073,-15.723890071419754,-13.181511726607438,-15.47543924174912,-14.143157813124015,-17.706204850347035,-12.075999308008535,-16.98432012920527,-10.533921982817436,-15.633596386419342,-17.69072578903202,-13.412016380961852,-19.180647898408267,-19.458321034670444,-18.558532482605113,-10.870404929585526,-19.307578751800985,-12.650459829330334,-17.19873763957988,-15.200264684427102,-14.971083329530785,-17.37208779463544,-18.665306285493635,-19.3356997807302,-12.457438606249525,-19.994363827611185,-13.302189138594706,-15.83278862922146,-16.727103061225176,-15.347446822438908,-13.365015550081434,-10.863499329109011,-10.231590136764222,-12.86131790716034,-10.087045182299512,-13.733142888282542,-11.837290803207017,-18.71836640504037,-17.652737910689556,-12.359033827069384,-15.796631641855681,-12.956946450081194,-15.080600957228938,-10.707515650014228,-18.344638072042756,-14.56121067372668,-15.149857447736386,-13.456587044565435,-18.39011443778192,-12.403019320872502,-12.968294969720041,-12.966443091787756,-14.16738476296227,-13.017975293367417,-19.42305347598413,-18.726660255910666,-16.251360548318875,-11.425664668885144,-18.111770065325466,-11.068931776329693,-10.87092264621791,-11.979681074325983,-18.187421785611868,-19.973465863155738,-13.473658286005373,-14.03376958116998,-13.512660004738443,-17.372052938459333,-15.988899382078722,-18.9429626788382,-15.242051639152256,-13.503872589438146,-14.001695794581295,-12.523179830718822,-13.201655205870589,-17.28123018885724,-13.361004263633268,-12.86307598776586,-15.200520130737651,-15.447815822383708,-16.238529169764778,-18.439558112525,-11.399902283556017,-14.067664896968438,-19.05746753589684,-11.680979678875289,-12.659996355334764,-11.105470357159398,-15.584773136510838,-15.303637745684824,-10.425569491918976,-17.19977346709586,-16.674770040806457,-12.584378478721934,-17.45389744278112,-17.927715918486836,-16.260326345371542,-16.26272284414857,-18.954194887268454,-14.985087682596298,-14.978599938507461,-14.956044027357219,-18.034203964427043,-11.370636202073388,-12.72691539256233,-17.858937377690193,-12.939606323193528,-19.509297098793414,-12.275136319336452,-19.545213351826717,-16.546933658274664,-17.511484001351462,-17.195963431757338,-14.590930439351972,-13.222476626033203,-18.831879587586776,-11.690440389563438,-15.745844381040328,-10.438350167011507,-18.9837189346081,-16.29130357809887,-12.895424821636146,-17.83249651488595,-11.764807359391607,-16.025261063840688,-18.35848126727503,-12.640988593339506,-15.154846609126018,-18.10827753166504,-19.54265183502291,-13.722720494387573,-11.630670211082634,-13.441668904836106,-17.330957087226807,-17.73496205650767,-10.251098235661614,-12.214055385830438,-12.614559374010543,-14.164269500130285,-19.16037088329354,-12.115473690082087,-19.920020918850632,-17.238360128724974,-18.62488402401432,-10.913794782919508,-18.786259944933246,-12.619703189782305,-19.38857053302722,-16.553538783265317,-19.80908108388882,-15.32723676414303,-14.665428523303113,-17.791541277655288,-17.840820694509233,-19.39798420766756,-13.675691534785372,-18.336380726426537,-13.169377189090039,-19.796496822247775,-19.404681537654373,-18.160057133305475,-13.976785326517057,-18.207372534068966,-17.513668355797613,-13.304110222223285,-17.929277249503087,-15.489580677485206,-12.657184792952483,-14.651981559275706,-16.268849818649496,-12.676199251178256,-17.22363891171941,-16.38182288876266,-12.464265172922302,-13.513289923714197,-14.32760874668324,-13.157192916696312,-18.513494152644718,-18.609111402087308,-16.023703526202592,-14.88422777237853,-19.890185946028886,-18.256561799285425,-19.926274154610166,-11.869112570161562,-14.262434011344434,-16.01045172722645,-13.95832637791564,-18.14320249247627,-18.621990385464954,-10.84345856901008,-19.447083393860925,-15.520172503581362,-13.474310748358992,-14.25310693259879,-10.891999512583084,-11.658611015651761,-13.007364838995679,-17.254308081427922,-16.314091916408678,-17.013416374979187,-18.13332049838159,-12.40702949788906,-10.87142927205229,-15.1359213110927,-15.235680433521704,-17.72774455703965,-15.11747880038299,-11.858104677648013,-15.250209411649585,-19.537425754841188,-17.93963051918026,-12.713941973952261,-19.436995532570375,-10.12399100181449,-16.06845361687071,-14.023530559178765,-10.780978860972477,-16.449608836214658,-12.432243049338158,-13.642463892146656,-16.19987515181592,-16.831207340057944,-19.554746833236386,-12.844017880471766,-10.845177149423087,-16.602730717383814,-17.934848064368744,-16.635414744366017,-13.911829014342125,-18.751737833139376,-10.967554749617012,-12.51190039415717,-11.056621144810599,-15.531823917234933,-17.40043898433745,-13.000741366531614,-11.571107190044076,-18.427733531036775,-19.48820844989725,-12.835795043909721,-15.404114442524673,-15.845422083639317,-10.382033309406456,-10.172494920311784,-18.87882120881354,-13.270400749690172,-14.62168638815471,-16.432202820911456,-14.081197845340878,-19.551502208709557,-13.305974474672425,-10.543907948872581,-14.551206863100312,-14.366894042087697,-15.981125945947934,-16.57221972398144,-13.039718803804284,-11.548750090395593,-16.816216005730368,-10.967791164607334,-19.546701795986873,-10.273845664246323,-18.729018806629803,-13.485562278873001,-18.51517659331287,-13.138365045641109,-11.585138974842028,-16.864360129465666,-12.876395626087476,-10.534563322583729,-12.410712618371576,-13.61539733261636,-11.83626510654192,-13.330761062849799,-19.47087467193471,-18.209995029605516,-17.676554827315577,-11.246667465749985,-16.020278094212095,-11.986032064560547,-15.199532479005715,-10.116396795498714,-19.725487861164638,-15.210613806761637,-11.151061341650877,-10.286375462824997,-14.01350663146405,-12.552629875756205,-11.271504865160999,-11.540175660174759,-15.314992272976335,-19.76010839280994,-17.525672701205572,-11.022528469421273,-13.857889580213813,-19.553265056065825,-15.36532315740759,-11.060425200655885,-14.818851041681482,-16.74410611521877,-15.173963585198836,-19.065443933885952,-17.921693410538698,-13.52926730917434,-17.71797774970391,-11.52007794978144,-10.759697485272286,-13.547506418044481,-11.425707090418179,-17.760792096342357,-18.125411101653334,-17.709699343010094,-18.728765852484553,-17.391663767446126,-13.894628831431334,-18.418175582478863,-10.462401530786384,-11.543294515514527,-19.72203558185991,-10.735899786359937,-13.330497851466252,-17.0734489590489,-15.166819004852796,-15.48246329557166,-10.935180783542025,-11.7925225960228,-13.3554332912877,-13.86704467629404,-19.62073748979064,-14.803582854318496,-10.02074429321118,-12.686667201407998,-10.344851207883929,-17.046401808018693,-16.123505976965784,-15.199738083869258,-17.63386056131083,-15.516325059918621,-14.336949613464911,-17.442201258669833,-18.198812657298742,-10.804186394138197,-16.47703982255206,-11.645341836044228,-19.6391101494495,-19.24202165089922,-13.140453480460728,-14.080111949721722,-14.986349949130062,-16.58024080972978,-15.182719486130615,-17.5668325697264,-16.632262412525066,-17.76067550058753,-19.317358477251116,-18.713655311615508,-17.456699817445156,-15.62513291218388,-17.560816035952882,-19.16277033472213,-17.834124910512216,-11.669464093427758,-10.656435306693536,-17.818266159858386,-18.228116969909536,-10.629063903832561,-18.607104231782774,-10.908759417034538,-17.0031741888005,-19.877415650038465,-13.225081823043105,-17.42579002680243,-14.415031208336346,-10.65942364567256,-16.114505451785543,-18.77257676388198,-16.680498090491035,-17.48903345183701,-14.862337697398262,-14.703543445229775,-17.714473312315977,-11.892881751054405,-19.931570462242078,-13.985081600163202,-12.580471829196822,-16.863535527389843,-11.9944104037031,-10.433654576058952,-16.709197026766184,-14.176521513479813,-17.212303983050884,-12.027900654293093,-18.108874765459092,-18.84000143956548,-10.81212481597994,-18.263031358902342,-19.860002724569263,-13.079362801218553,-14.505382488523072,-18.735592061268665,-11.220057566729606,-13.363479484287964,-19.38826667504394,-10.72019161409834,-19.98935399980385,-17.147951754490705,-19.185697379778514,-19.79875217676508,-16.04969461192212,-13.166766087107584,-19.580302724673416,-12.013192913747892,-14.833208059248522,-17.36575001767642,-17.702548912686613,-19.270425464228012,-15.612234390565629,-14.71262061606213,-19.816014276554412,-16.73516860763381,-11.609353839845642,-13.29463628718084,-14.06737637277778,-10.70120248104738,-10.284067240957773,-13.493001390851887,-15.36390310889119,-14.162553228982537,-18.173094998440757,-15.945346710753919,-10.937692620256465,-14.104693410057463,-15.989675084579273,-17.449549086796914,-19.500951288764604,-17.87242942941066,-16.592462687870572,-10.354570133572134,-17.088053165208173,-11.933518764793794,-11.88836383843524,-19.960405386773438,-10.62334301105286,-13.936661811927822,-16.34941701004393,-19.450340335760806,-16.62752964520709,-18.803556550271818,-10.472093335340517,-12.063600318118814,-14.371339029590413,-14.020532877228698,-18.01899044106994,-19.51909116191888,-13.005106964145588,-19.82731031600903,-13.258025890252224,-14.388610906831625,-11.32790949421832,-13.217281485064895,-11.64321833703404,-10.559181651915651,-12.152206418421077,-10.252588046980355,-12.822217525198116,-14.496420633488027,-12.102301311028034,-18.820038994724282,-17.04545020591918,-13.217198031448214,-11.486021086462605,-12.376850678161464,-10.930794497825886,-10.295098534001097,-15.293511299785937,-18.322676865011008,-12.362991666740133,-16.777899838265697,-14.591082057094194,-15.714554015538447,-10.687476204771366,-16.12180887152022,-15.773324999081808,-11.405058029913523,-11.372063592624889,-15.596657723676257,-13.585389065703984,-10.458926164597022,-11.834984847241296,-15.722116447441618,-12.7023727224774,-10.996370996614118,-13.295527012584895,-16.96251597003268,-17.15239626386627,-13.881145939409762,-14.239791791984969,-15.211549772282547,-10.192831597207343,-14.836982310134132,-10.345388242851904,-14.379370656979955,-14.793178117203505,-12.611499751509125,-17.446700249722817,-19.078717307264895,-15.192117230963472,-18.24120091891674,-12.293474723817273,-14.972350217314258,-13.133443740781656,-12.97192937115562,-11.864095910562579,-17.505140582628687,-17.29514414826265,-13.742806448807679,-13.94042032352235,-14.746592724174011,-19.143698478362126,-17.936420542760494,-17.261486515849253,-18.375941673800433,-15.800150169536264,-14.267656082903173,-16.18173816348111,-17.806580929739326,-18.698874893687186,-16.145161391059197,-19.98944324514547,-13.262641388933933,-18.025628132146586,-13.849625642597506,-15.487661731871105,-14.234756454548156,-12.990402002593694,-14.595290649171355,-11.487894016391966,-13.643856197942817,-19.113670945461976,-17.644700841773265,-16.034376729889193,-16.731491623795783,-19.124615229060527,-15.551599496759525,-16.593564269284855,-16.641901635269235,-10.946616197120864,-19.769960205135803,-16.780707799155255,-17.345468947142667,-16.05872951915012,-16.468170876748673,-14.543367736987014,-13.668741056684151,-18.04223583118842,-10.423833345881146,-10.990254866530517,-19.6537160981652,-10.167215035284036,-14.127046898634056,-11.11110636480523,-14.798957251824856,-14.729656739127,-15.611629371187302,-18.35025931684106,-13.07238802810014,-12.154023417649157,-17.454965279079463,-14.914957970193512,-14.568395506400208,-17.419004575408216,-18.527337381771382,-12.491796976550054,-15.489025927645255,-17.265596796603973,-13.398001604496896,-15.231908310358275,-10.296771696960922,-19.4941813607904,-17.837379223370185,-10.661791893266049,-16.6241183750864,-16.515086451880084,-19.723514016706822,-13.96640557852608,-12.06152595482229,-14.151559643162638,-18.25879479943072,-13.894483613882818,-19.88082327011291,-11.194543236931235,-16.48675467685526,-10.981676744227025,-18.32857120704427,-12.607768883844376,-10.783653078240276,-16.79692184581745,-16.493985376551286,-17.96569751329205,-17.55798810299792,-16.053792625586002,-16.80482985860491,-13.418847863502304,-19.403014308363925,-13.411365647982652,-10.776022327476444,-18.272494799959297,-17.794744215581392,-13.631603257478812,-19.65538613064819,-13.62826808663343,-19.42339724661245,-12.994357579840777,-10.069667061311712,-18.502553591873,-18.808524618813735,-17.464657873560483,-10.976531564947683,-10.08835934397421,-11.493502691794397,-12.139682306658088,-11.647321239459878,-14.524879026434753,-17.96945952596169,-12.535170642875864,-11.77794938582075,-16.224337531150013,-10.963065265045946,-19.561668576206664,-14.253929087537145,-16.268780737961823,-15.8299796062052,-18.41453412931003,-11.269497897313705,-10.687442509854373,-18.933880759751187,-14.905681455686079,-18.443977014457328,-13.137982201450535,-15.239968843561712,-19.891809805957006,-11.066025317772684,-16.676317182024103,-15.54216204576762,-10.810941484314364,-19.90922463025723,-10.972864609752904,-10.556471148796785,-15.935794201947168,-10.944792594343756,-17.177291193449463,-11.750893495163574,-11.945969531097028,-12.893154528178707,-17.00332389001401,-11.982549022681525,-16.69520240986026,-16.992764859337516,-12.071798248665011,-11.487406857622817,-13.182571446019127,-17.590046224319632,-11.65792240533329,-11.130118285614945,-15.74555655194314,-16.240230915941936,-11.945971495942217,-11.131565929361058,-15.712927617170457,-10.044271430622844,-15.820451863742083,-17.739884418080486,-15.19997180232658,-18.222455086334918,-16.67777195766388,-16.64924026615021,-14.415824905190778,-19.67264260324882,-15.910421604684187,-13.79417036381473,-11.792855882842128,-16.626853831874552,-10.522426800956275,-15.442418852222701,-12.082289004197701,-12.91302695011937,-18.97119835640893,-13.43337661623594,-17.68151096761002,-19.211258515201777,-17.577839411960962,-12.934491712186787,-15.79278731725887,-11.42502261553717,-12.273743786471893,-17.598567211035515,-12.58251558462713,-16.00433961633914,-13.600321440819556,-11.927771980053416,-15.804005450358705,-18.466843130813576,-16.829469976288152,-14.44774059147404,-10.768061473196191,-19.915009244625764,-11.840432446402664,-13.777563605242653,-12.91343617417412,-19.957485711411557,-16.67223411835269,-10.925191552653239,-11.072872314962787,-18.31187511901671,-10.860458179322574,-10.272445797486402,-12.469437493930698,-17.434280035869712,-10.162768162764008,-10.768992061349916,-19.645310808553482,-17.80099175807784,-13.357772685192465,-11.152781939921963,-12.39026388969721,-12.530882693029586,-19.432853578886238,-14.57856270361673,-12.340811177321235,-19.827280906208422,-15.604495021163023,-16.22866221899176,-11.31036994308247,-14.39796425671527,-11.911472758527825,-17.5072881172634,-15.325514166997943,-15.635505776897613,-11.336439971367254,-13.382712755691372,-12.323333157977064,-15.430608333750598,-16.072281289100122,-18.00544200630475,-16.79731618067303,-13.532921398703536,-10.167782285613091,-17.50481474366213,-12.80024556671281,-13.19341031894146,-12.885220154353764,-17.051490709429217,-16.83991218541683,-17.02210289371688,-18.48822120058129,-14.942574067561619,-12.055706848957435,-19.7087895151699,-14.129643056607357,-13.391783242613169,-15.031222960420124,-13.87342072674667,-13.402883780716007,-19.48013509519493,-15.98501379401269,-15.325461797900237,-15.875074970601343,-10.517412062364215,-19.851886809532306,-18.770763510105056,-13.76899720190048,-18.52411850185138,-12.202687877754759,-13.924799337354777,-16.072860204543467,-19.844554027665694,-14.871261305465733,-17.56779232118582,-18.277934003826058,-19.94813314140274,-12.846797765556506,-10.187302531554824,-11.428491542807134,-10.29856496956809,-16.097948733518418,-17.71973076331743,-14.118939692957479,-18.651536896697,-19.523045729905363,-16.743123881750897,-18.67899070434862,-12.982555738669618,-19.304820322663694,-18.52857487466633,-10.050159270819494,-16.22157098710772,-14.194576873324369,-19.951211573752204,-16.321501596806463,-14.934077364867663,-10.412740236818955,-13.728954921710685,-10.224349918024133,-17.5403694144905,-11.030929169118629,-12.778368547072631,-19.35641240563729,-14.119993890424361,-17.644272230376735,-14.859935252729441,-13.508101989367095,-10.597936141055971,-10.562172065731462,-16.009236497945018,-16.080761941845903,-16.36376843520827,-10.338485891946554,-15.23320407930406,-12.047484657373058,-11.843901847166254,-13.231260159356367,-17.555651703132924,-16.890472845483554,-16.832802060016196,-12.482052437944171,-11.70327790201921,-19.64967557429609,-17.754715324426307,-16.133216013540252,-16.9556235437215,-13.486499038329994,-12.983805678100445,-12.695864399007723,-10.149365241552779,-13.13516629695706,-17.718965966422143,-17.487374127670485,-13.979169284158734,-19.275497905941485,-13.728592212919722,-18.437445811478764,-14.955216126365421,-12.294450960675828,-18.13419683362278,-18.99123682461387,-15.91414030493242,-12.574840949516403,-18.989268023520413,-18.122697301368603,-13.435125031253104,-17.76230601846612,-18.399844295567547,-17.425664695309017,-10.82732163169992,-11.96940181080234,-17.100800526347438,-13.981450059546077,-11.453710170633775,-18.764585165884743,-13.90052050159943,-14.26340237673945,-14.59801237220727,-14.696467609784944,-10.385726867919116,-16.150656563103006,-15.772212534817108,-16.92062880846368,-12.94339744711031,-12.373392932781986,-19.624138871159257,-10.996332909002318,-14.881943961923966,-17.894721327739582,-10.774307327878237,-16.621829436816064,-14.14982857375376],"s":[4.487634595620731,4.779100972602494,0.032905458682129796,1.8601317313335897,1.7661824081964994,2.428510918918434,4.2624215808802814,2.3082783410001984,2.159684075367739,3.108147883168991,1.663055383165667,2.1905774492131433,1.2547391748298686,3.077420813747056,0.9904179115749945,2.9403740082990923,4.513563059571918,0.8433004193496896,1.2617325135054513,1.2060776600121204,1.7032371228635534,3.4003560779705855,2.2544727783448213,3.7306700408733584,2.0163344563831123,3.6947011191013535,1.7778354133965646,3.20735526037756,1.736907805549739,1.2451418413554072,3.34596341322265,4.1813890014985775,2.006084228540649,0.0750419481797282,1.5933557980918933,4.176990942982044,0.09436003163380446,2.7362759777334658,0.43121369504958484,2.584571363107427,3.0163336053358547,2.9309154883856348,0.7317557768223526,4.03832598518473,2.838676470986986,1.4857863554546913,0.8326148904919861,1.3581472418472673,3.4067664245341645,2.266175301052379,0.33820162222921835,0.6420226608163149,3.897118015544411,0.6235597487546618,3.2208397501744312,2.844496682073184,3.35856263988493,0.9610098762253971,2.7992891021889523,4.706402758772253,3.8005754770070443,0.8299071909014311,3.333566146597758,2.2602057862384903,0.6206143744154835,3.4689284024282174,3.9603564236584896,1.3208935101601371,1.760076076986894,1.0940393496637058,1.3024698043077898,0.383832503044802,4.889638556470437,4.5028834370086965,3.884166058041103,0.2760107473180029,3.734862587987381,3.4260185360390425,3.053315788543085,3.9015778272250747,3.860567658667221,0.1887731746282295,2.5737499731499835,4.629288322885241,0.3651298339977205,3.47743389369376,0.6206396180365725,3.6418736203557045,3.6158732203757014,4.882667949015527,1.2481988325324744,3.0561843551592194,4.491462023794738,3.1012718249183315,3.5493417651091184,2.362552027724866,0.792793838566167,3.134274657136822,3.3655156811885445,1.4293121154463018,3.602693415659205,2.191955967752306,2.7956166508558136,3.6502474613354305,0.9896784672270675,1.4947675708082098,4.804679566920691,4.76098811522232,4.616856915009276,2.3563694819655545,4.528411190250468,3.0505128492013798,3.051418627538671,4.049412492626933,3.5395220776814673,2.499469487897893,1.5949001277979302,0.30514419927311076,2.170325614167731,0.7324891946702139,3.1705858583742863,2.8505158548634513,3.343140555616343,4.4474658409064,2.060189831604078,1.8170543150082452,2.551988799167071,1.7822613035229395,4.576772906248295,0.2134623832481608,4.767913625836347,4.878855153536993,3.5499820317207176,2.024462356284414,3.0341509741420847,0.23171064244412065,2.945493765886018,1.4499527148848668,4.637398366515123,1.405343592516265,0.649036485379253,0.5842720910541721,3.956967522509757,3.5328087894320492,0.7358225424211884,3.0213784293322252,1.5504830151992843,3.803517342737325,1.1854905679988492,3.343728191601091,0.6274993490524294,2.817594968394549,1.5915662766445515,1.9478500694029344,1.804663437773364,0.4587395131476224,4.1162510612948005,4.945593141439778,4.31570253886905,1.4157716735422665,0.8221466450657933,1.9281251397240529,2.3628344245033484,4.474780688320527,1.6462282496099034,4.7316875193501575,0.7921696506510822,2.2088915384106067,1.0375268349461886,3.0899187941641983,0.43450138282704276,1.6622269403159429,2.2429951107753854,1.7718352778302593,0.09585081230205517,0.3377529744301955,2.550143389728232,3.3298570769455624,0.20449606394731257,1.856440231079669,4.24713563869917,0.9616122457510323,1.9689524184739182,4.906290140834911,4.889286690347153,3.633562160594561,3.669940737763979,3.8047797985677057,4.659567024207419,4.911786646040297,2.1847187315073544,1.6011239786438014,2.310122214504177,1.896812353721079,0.22845465320713632,4.389237349458867,4.811767768533638,0.4686937507348099,0.060611640998188276,4.28856870844731,4.64081203871295,3.6388937346362162,1.930437211656163,0.3997618154753457,2.402433746658467,2.4312393670751007,0.9407056706398342,2.963776282563332,4.057038830095475,0.15983650002138305,3.0167561780123386,3.441932411218338,0.9324961343983895,3.3354965594218946,0.26660756640743744,0.7105366789222312,1.465453743593722,1.4837890467032389,3.2413377648938813,4.061341685328262,1.0580692837991246,3.7268726678972963,2.434302142113883,0.8553660012631004,2.1815574727017992,2.7599188456514048,0.08967370488458082,0.4654438497355484,2.960770905209076,2.1362008393631626,1.9401216381374065,0.31749464918595316,4.086350632563568,2.218898855924303,2.7497987287124017,3.7905290763800945,3.575370499331271,1.6620091986119923,3.248654446068009,0.2783624597291612,4.796330639531777,1.994349348306611,0.6815402765574752,2.5807753370099604,3.318677868638394,1.2079269728353514,0.2491615544429826,4.212181258949518,3.632543382130453,1.7935275333204248,0.10233316621221511,4.843804201420772,3.3217157532523944,1.7077434511062117,1.3689130903120916,4.110850183317148,3.2877985208208016,2.5766273681321126,1.2859920566795624,4.693241195946749,3.987788062875034,0.005503579020477156,3.228186585194226,0.14550198258394542,0.5166198347123119,4.588952893541166,1.4057393580239086,0.4499365306929237,2.3771153181709073,1.2898393506770978,0.5084272223532382,3.1238683890098775,3.3904882409597894,0.19975954550354946,3.8826895595994246,0.9202914060396394,1.039221453996697,0.8463814131026626,0.5813815508151632,0.4178680338556917,4.855812474804541,2.5768771397390386,3.2192078479135655,1.216829647267852,1.2165308195510383,2.9395042086509426,2.030815292642707,2.450623600202598,3.0428110285030616,0.4061044098335709,0.7654600042843396,4.50598480781287,1.9950943377662367,2.729638149833362,4.423229091207244,1.941622658782971,2.9658668989821724,4.053215619796297,0.8749521322170661,0.46037416090208616,0.15834592818005255,2.9351736916531523,4.130027364792211,1.2740177399992092,0.3566250752896194,2.51947260884441,3.9536192606475185,1.6889516846997532,0.014367969781735601,4.530552744142567,2.9620984365866065,2.9091132269624795,2.3518424203654664,3.894424066269535,4.179754298014318,2.0787466403791353,1.6269299464391351,2.95871119399981,1.1929509951009754,3.5242737986380113,3.068328541477341,4.09693968391931,3.8863082283047223,3.9996131375298116,2.5631670962791633,0.18573293771737887,2.7114385657457563,2.5425709048936476,0.6021531850743345,2.1880766221197834,2.2041433678206888,3.446511160750292,0.2222976354241124,1.398588956797,3.9769359614719315,3.7851233348552493,3.64508342163542,2.9252172874491555,0.41840382711521684,3.9531014344000104,1.2509507777553286,2.5840846772604786,3.4483963676168203,2.097356552283922,2.396400794557959,4.172135450154139,4.84373810094066,2.346481314932485,3.975304145023383,4.708273963034694,1.930773957614188,4.4520058112931595,2.6239193958779428,0.20968414794325207,4.1543881486154035,3.9798725781140085,3.4417850468457747,3.231852010439286,2.0277649826769295,0.04274499315018998,2.8248147245969504,3.283505037180685,0.37806720786546677,3.1069423252897597,3.0458457415289084,1.422771294751931,0.9908024482867206,3.636306895087996,0.09050852461235714,2.9449097832881455,3.2446649315356724,4.869635136027411,0.4988786418994329,1.5663183576555262,1.614853513224358,2.1844119773094803,0.18485694471816028,1.6284730428248595,3.4679352142851725,1.348942831418436,0.41740136423804697,4.051142828260735,1.1871589670081584,3.1531433601469483,4.192765065712365,0.06980092391430603,0.05773783180271108,0.5078890453864604,1.7984986309328799,0.12148797339808226,3.288206175544924,1.6770092922048885,2.290415515674188,0.9604395545894295,4.917323617492656,4.78883117359466,1.9568398337377346,0.7648659684314352,2.291161936750843,0.08033341187858256,4.078246065602967,3.230015844575095,0.8058094092128254,1.9188691453720652,0.5259161261215661,2.3579476296157864,2.345333523540216,2.4419119365333195,4.592867018854969,4.2569567895531915,1.3090159149303038,4.948531608955977,0.5281238114495868,3.6071529964973346,3.8204638681259553,2.33981001889223,0.06930096227474425,1.3984332957651702,3.095737011345511,2.6293883115066286,1.281138891173419,3.5402332213628975,0.23232969523588443,0.11307410900707193,1.346303427044001,3.63590806359104,2.8414595292713676,2.3843080404819084,1.672066305266603,1.7069831949647052,2.0831006491052664,3.279124977065649,2.693922308423251,4.052376248553246,2.806000110224182,3.534863450180615,2.6019885780770435,1.6418785754920884,0.6370107906048783,3.7237380361359094,2.2761365460742935,1.5256370015601328,2.4245455267727944,1.123763742810262,4.418503316206646,2.0470359089272696,3.330856283275838,2.389156116719561,0.5570649945356854,0.3856288594875579,0.5921694788516041,3.483201859535453,1.2253943334215112,2.4962666629361605,3.3220499622343302,3.297722754436576,4.940684569108463,2.349885063698726,4.260367133817726,1.1736873330188158,1.3980395045613558,1.9307282437162299,4.3370371343872645,4.381472579791379,4.095500418541316,4.692494268841726,4.779374526585399,1.3235661227800921,3.3479003352249914,0.026324710972618348,2.130067886862018,1.4182835802943916,0.3217578124581377,1.5912169840827561,1.412533081992502,0.48748537374540213,3.1873239957061985,1.2464211920130541,4.1551949352606465,2.8076692032960926,0.9096742396353641,1.8573804555669016,2.7986206004485306,2.781676508738644,0.44057382265425993,1.525385392777604,1.4618211105966572,0.9437125277233249,0.51261241079406,4.5818508083798335,3.6050031399868887,0.9862467507036443,3.7212651724944634,3.7496015382943515,4.6399654647722945,2.176122515012866,1.62891111285685,1.9454292510657434,0.27283425055530275,1.5587895251083894,0.09689873742261157,3.29757591087359,1.767306624835242,3.084659924450841,2.98914431315904,1.0405195468686912,3.9007476745111456,4.9708828610874525,1.7057523590313206,3.1967905108701444,3.321930944273541,4.846650492964501,0.44010933562044885,4.369064395360091,0.09674721718623824,1.4943253270988133,0.047055733422770585,2.9645146654826773,2.568616847539331,0.7121194417251564,1.1337259064013039,0.5902782610118085,3.0965683415304754,2.254577824181694,1.5476004278404998,3.1081935190980445,1.9701434022065079,0.761727665869133,4.166586943709719,4.446213561280976,1.5824803102676765,2.5235287606567693,1.3719814750197812,3.709820198085686,4.449426724287626,0.8579001541585229,2.47642525579192,0.5599804850550394,4.462568311023927,4.958950212711275,0.3734191972566514,2.0166544114861162,0.4149239855836151,0.648435502588327,0.9150692138571637,2.5039415941786967,2.8218702227566625,1.0308066014556738,4.419230015340921,3.66734204377218,4.120789586363298,1.1969256146427787,4.940537955003529,0.7309496146320793,4.33003355187803,3.6947997764680207,4.025095486217193,3.2678879793625395,3.031477485936238,0.13720173405884162,1.1472813351214584,2.153305331534925,3.637502414562878,1.7687336079894067,4.547012408564247,3.762888219628212,4.249186335480149,3.5639681508211654,2.1375327777988664,0.21822260286471162,0.1810442708218063,3.830509679616921,3.6666810031363593,0.7108229323367021,4.8266623595723015,3.712824692535035,2.698859611639265,3.2044093986909647,0.5129857595815313,0.23748703682076933,3.2593482393386752,3.1216483311938648,3.194969795648923,1.4988559321037942,3.5024475446366745,1.108690960960561,3.0736966004124744,0.33697910557168864,0.9000718536569308,2.919502184038101,4.349095439044274,0.28816948449280066,0.0030154668173554278,2.0563174836436326,2.0419977758301764,0.18245772997230958,1.0146990855042681,0.5791625107086773,1.1537702907669212,2.5405267753051,0.06629015128389426,1.4992384416891402,3.9550018697522304,4.597744361834239,3.8921113987517844,1.2061467263454317,0.17477368328036036,2.9145352415259818,4.943604877274543,4.366911667125589,3.797968871638435,2.4644324202562307,0.140521012982866,2.4509394477943234,0.20068183767084524,2.946522486511433,1.0856756785381716,2.8736058176572943,2.737988095238517,1.8039956987186068,3.346715740929543,0.6822962792549014,2.793462142057016,4.960288218771383,2.268428559782889,2.290263141560799,0.20015453061859367,0.1951530330730833,0.9069439100529397,3.420196964422997,4.5845337147947305,4.574710608703539,2.582234393428249,4.225910807884211,1.151759196249772,2.231473468020625,3.079660060768241,3.182457725616814,0.7853631734416,2.636478131706561,0.6591265051121931,4.056155397483111,0.33702638553571473,2.716513684188361,4.742038937447796,2.1944785674109846,1.5715537899452448,1.230203773529066,4.178705317640815,4.808921027518869,1.0262181622055933,3.565993957326711,4.854854180509522,0.686691459186437,4.248108144938385,2.7754683894751695,2.799085843076776,3.497261143112164,2.70911430477909,4.958915438006285,3.0933299055720873,1.3945615281818136,0.7755720755350504,1.7966913631734194,2.8264980441318333,2.936279119247623,0.9632600097765887,4.496494143210748,3.933088680794188,1.9170496256477554,0.28363881254781287,2.0182367130950682,4.4782111268628375,0.24660990726026122,2.320409767594731,0.8614990579654014,4.641457871753602,1.4131646608991733,4.497391641383385,4.275543320434489,4.457039448706576,3.040090619059658,3.862528969013379,2.5174290789091747,4.992772170116746,1.494585947528424,1.6056415161993598,0.9203247873262976,3.4568504581243733,2.0802521558329756,3.5241741042349037,0.14344076129937822,0.949313034687298,2.4513480900649895,1.9000013510482006,2.6425799557908967,1.321090273863087,2.9532731674610515,3.423830419310383,1.1988451160342173,0.7146178400898096,2.412691013082541,3.6275982901321147,2.3311408501164,0.5923800677404922,4.8512551022967045,2.6883242417305664,2.2402832948821025,0.03416409212360971,2.3437491415363754,0.19502634977253797,1.0130227945126102,4.480230875737906,0.900354526949041,0.8925044381877534,1.3222164957106985,3.025143835725178,2.641030704532729,3.236690764071909,1.3750227434934226,3.2078867183258475,4.9643048036081625,4.661189717604604,4.510996968415528,1.1949363428923976,4.291236471355066,4.4460315037168385,0.06848757131781902,3.3113200549973687,3.06814833971927,0.5628420658225852,0.05098250368700041,0.23608641428123245,1.3349399329080425,0.18174306132652362,4.518901046173012,2.7998179847333393,0.18770998610833867,2.7183992831292745,1.9483679461753467,3.756828652756613,4.570364926628326,1.778314893501619,0.05770466538169594,3.6391712744603186,3.6731753206003956,0.6232449019587782,4.401467371665847,1.177511080807223,1.2882305240276715,0.6860039086728664,4.7138928958325685,0.8795189403353754,1.2448814615055948,0.8635079262614465,0.00877934999335972,0.12783885391692618,3.2227948955212007,0.3980942272575583,1.5827492976094515,0.10533362963613069,1.8226387981255732,0.5531556662175219,0.83728610494612,1.8971083763600938,0.9520869082120342,3.4338301106473423,3.0874872197511505,4.604058585668817,1.9769550204431707,0.5292087964294334,1.0731120043757403,3.3620767856116416,0.8756841443123353,0.3951844756429146,2.888449515762975,0.08904872632417238,3.661134924736462,1.2937997150973235,0.6424615015402557,1.9541019363641232,1.6680483449664751,1.9895861291539008,3.6720578703474596,0.36894666922947406,3.9565390655642565,0.21376178689970327,2.176158720317658,1.6001154653669591,3.1867025845222874,0.2500038143140937,1.1080108013731527,0.006216353934431762,1.7066073732794018,4.825983470075937,1.2254985798508666,2.5574802494567206,0.8369787617524282,4.358957531671969,4.29805374083185,4.3521437979548825,1.8892019379550573,0.7393761008359789,0.7917143002942428,2.859545174080772,3.042489023632923,1.3341753585793426,3.687779068896381,4.799885657974312,1.3541314908698976,1.2444843225528912,2.7132635429107177,4.906261648377084,1.956470181564861,1.8124585869738286,3.16438133271852,4.415815824014957,0.39155825525452603,1.4348758511147086,2.981550204949661,0.1759508370481644,1.2882038334406887,3.8306811829410634,1.4546390274744991,2.9159935614699872,3.090652984363076,0.5177596830138353,4.843241545218783,1.9525187581891246,4.621440175877072,1.0778703360441955,2.797976103387263,2.0824493613165362,4.482428738938115,0.24951148091699182,1.8971013197048148,2.518161041365208,3.1041396051593475,1.1244981762857198,0.8064417326015416,4.2889327888333995,4.508719119840498,3.276222635631475,0.07413304984851043,0.25949207211165337,0.8774011761052325,1.4722855709162974,2.0867429139252347,1.4160247618862232,3.79433435854845,1.4260543002079462,1.8023614971627844,2.8583348304170784,1.7718825551511985,3.1450529488644086,2.163407480431083,4.133850027118599,0.33336326089195345,3.677353554928602,3.304338094676388,3.4895551559223117,2.3927145812068162,4.754074099593748,3.5978209727825794,0.6487410853009046,0.8606040275099269,2.8683460642478122,0.44826725748320806,2.53399962713675,3.320717829068216,2.5735587914791456,1.5564610882271235,2.1384407656333373,4.295901147926456,4.62083559722704,2.4428058970065303,3.924174999491311,2.8531085858750838,4.721497555830625,4.671744373135082,0.6107270955930177,3.2797950292760403,1.033397946910104,0.8532833368496895,1.999179424768578,4.182790912712038,4.27157749555856,0.8839805030045922,4.445400849686872,0.3108717703311048,1.6136207210294606,2.7578982332132327,2.752698406997136,4.246786484778892,2.3958875629622254,2.6977334985152535,1.2624323059407183,0.5649277578064715,2.369188018195696,4.522846535989903,1.9672151187801068,1.1105761621426602,4.341610278892034,4.723949137994521,3.6553073723397667,0.8107287074892422,1.909441657169214,3.5459964278884426,0.34252398854814015,4.562293527353905,2.74609697556781,2.696826652111649,3.4610298921504934,3.7109184901952164,4.767671907909898,2.9229678905569556,0.0663639751697831,2.2002294057583702,4.7871157697023285,3.579960036841304,4.072772348234725,4.796443860561062,1.0041255158775886,2.331679616409794,2.8731104989645253,4.971049528388921,0.1684789582175672,1.5211082895270922,0.9959412584654892,3.147373157172363,1.9956379111151656,3.729262080033929,1.8945615948254357,3.277439587849138,2.546664696430204,0.9681019405642377,4.809223756928955,0.7175871012924206,1.1955480811902208,3.7955549162357793,2.909998236563067,4.996630347058302,3.640353631279858,1.270175586336435,1.80219506254787,4.60673083476598,0.6028357826282682,0.5446194679950322,1.1441680995494652,0.39065999008754404,3.646626287410346,1.9142083569858237,4.537519678486736,3.0990947900944876,1.9530590562190764,0.06376460032570308,4.590920277684887,1.123050172567297,1.5935293805248374,0.8286785773663241,2.270294398534125,1.4458278467535735,2.834832224337689,2.757359832200504,2.025074201341287,0.8662459753004137,2.829820786336535,3.89598182682699,0.7028458604903121,1.2058150298054593,0.5028038101689403,0.2896297363732625,1.884999090503201,0.7545113732603659,1.8916760300327085,1.355831062902041,1.3228050812991432,2.996129874586184,0.4134883840140413,2.1017326889960266,0.4051040821666263,0.1616567195068308,0.8817846116078354,0.7853677190572106,2.932970328936697,0.5947109342971946,2.051252886677398,3.8574005992737623,0.3637170748591845,0.7888484748758151,1.922049827237905,1.3229168013207337,0.2612599036709229,3.3569055837259154,1.1009643811074499,3.330855165662018,4.02580117404034,1.9767620752160964,2.3537014362538535,3.9097967146145383],"mu":[-2.1033209519918517,-9.084921633281485,-4.826648114739336,-3.298331861599997,-5.7906740984608085,-0.49384598002835123,-5.187722593983139,-9.591107398761773,-5.036872315680587,-4.186884075893604,-2.85059331641508,-6.358987501311233,-3.4819415138022425,-3.8151395343937877,-7.548240452673327,-8.448283449158751,-0.8885532007758368,-9.51216792592521,-5.76394977988258,-2.594824128147455,-8.54511843130167,-0.4668123375627764,-2.568464425521071,-4.146522671595097,-0.7044637216154603,-7.976480288284346,-3.7025704292380746,-2.741306831394128,-9.456945893852595,-5.1154430027757725,-2.6192022768780387,-4.814270311957387,-4.871508060142533,-2.274722117052641,-3.028863635559953,-5.292661656799778,-2.828882512866635,-5.595455925917657,-3.137715243195791,-7.876525481612098,-6.446373211464758,-9.095075978091094,-2.049691318946718,-6.503970188650863,-7.4553419964245045,-4.736407006183705,-8.18474691423331,-1.498844467171856,-7.98381853324276,-0.9726869108685965,-9.429282667408891,-6.152039152044617,-1.7579363481559107,-8.164013943265466,-8.380372311497357,-0.5886906698711747,-2.8183187717403,-4.293326322561731,-7.629991163809329,-7.977355554195329,-4.829582739001519,-2.8446941020481953,-0.3969712200322606,-6.566622100929611,-0.7159965684109437,-2.9192196885555544,-6.9999731326088614,-2.4435660555881444,-0.5784362807092891,-3.916737120922591,-3.0100786353332265,-6.354283837436339,-8.956738866843232,-1.3149781047962783,-1.407743933646859,-3.7787676042959872,-1.9097822321326663,-7.79270112056865,-3.152332057791687,-1.6991254313900317,-2.867722693354877,-9.723767765384316,-4.590841569343294,-3.198590150196521,-4.044708579503354,-1.8385595527822463,-8.168679131467346,-1.647156529768714,-4.195966747936339,-2.628962099332617,-7.490606821507216,-0.29197184413697785,-6.180035283756076,-2.7777277086149077,-9.737578859587796,-5.290895506887104,-1.580166685461859,-2.166795043878207,-0.19072028220249448,-0.5264583307325199,-2.752580972645109,-0.4339096752580729,-5.942056753799976,-6.032785664470783,-5.888386372439252,-8.193471753075613,-3.151591088673973,-8.347512778794464,-3.2828027874846977,-4.820231116071312,-9.321403332068389,-4.675522728254961,-6.318281050364416,-1.5536428974172423,-8.175469988381803,-3.739388631988496,-2.492987654878358,-6.983937488631343,-1.834949092972391,-9.164110569594726,-0.1409067053869495,-0.4339750880487414,-6.327501376341824,-4.953233738027015,-1.0863574118423847,-7.449763074742393,-2.3566015792653783,-5.023231603008929,-8.642080663864677,-7.423764430135575,-4.059406226425479,-3.4637922989346093,-0.7083265848077525,-4.014520019027568,-7.695577597997247,-4.594228494625252,-1.4190855790870183,-4.76188522403074,-4.095293778340235,-4.1101506257942315,-1.6440846823307065,-6.929553600846548,-3.382020353397579,-1.4704793149461493,-3.923813867407573,-3.9688441735240443,-1.094883915489775,-5.270435981970973,-8.601389203823057,-5.457075903253534,-1.4277899351466505,-3.729732445218974,-4.602775576683539,-6.306457764850826,-6.779461251030274,-1.4783211979033495,-9.329745292161052,-0.5435196754176874,-0.7540910517099486,-7.764771541645359,-4.608412166040329,-5.215881422130073,-5.9645229574271745,-5.955664787863286,-8.941601250494307,-9.609155309659323,-3.477882875011842,-9.612371632031778,-0.42396186366938426,-1.0715499105010107,-6.137993703543292,-9.260508339391757,-5.741273558166773,-5.466667648953754,-0.977223810425405,-2.3378102430088643,-6.239713042503647,-6.986078229528498,-1.8763082073902382,-5.442239019932213,-9.355886194536048,-1.7195522560825416,-6.2967335154929955,-7.088542774681567,-7.630067540648746,-1.6587092064775044,-2.777076085921517,-3.5595602273388804,-6.777117954798282,-0.05450038168040017,-7.114274097658495,-5.6039709948906165,-9.141677521765175,-0.020089933664264592,-9.966518979725832,-0.38481764872360547,-4.256699483145276,-9.559303885409376,-5.268910874723513,-3.7903266736829067,-7.660392048112703,-2.9089521570252797,-6.640891095949719,-4.210430579975554,-4.768310668749452,-2.9436676436666875,-7.545946916692734,-2.8341767695315623,-4.782517625709812,-3.7607772764354275,-4.727502962921333,-7.900373954505482,-4.196806514226658,-3.6133533268985873,-9.765108669498519,-1.413888793762268,-0.874118791107088,-0.762212896861767,-4.417196439894095,-8.576999830783619,-3.6624573246984826,-0.7491059756872809,-2.460711268251621,-2.3310127534102487,-9.636742779466632,-4.9623243828658055,-5.801488818567413,-9.420434131466198,-1.996646305919354,-8.801817519059899,-4.696794666286435,-8.861140589528901,-0.7456395495968571,-7.66987543100992,-2.5822913587033858,-8.318307162559247,-7.196253100446133,-3.753567821505117,-0.6616528539748212,-8.428763688531546,-5.829544809720475,-7.847533802968076,-0.9326839150219857,-7.213526484898132,-5.231962052273447,-0.36884931119609776,-6.693638730352063,-2.53316427478413,-8.330493953123074,-0.7522906525060358,-9.225410804884211,-0.39277261608488434,-7.513858636720851,-8.05351644533312,-5.388550913962873,-0.16230734130395996,-2.648199884302944,-5.056128196681115,-8.492296482318443,-2.2362615069503877,-0.6043533964385617,-0.6684677984973408,-2.28032447859402,-0.24068740433138336,-8.428583844434051,-0.5301150775551067,-1.390921135757075,-8.228631408583617,-0.49541615690954943,-5.036239530867091,-4.939615417748245,-3.090565937114842,-0.9164469315054857,-9.556713195774137,-2.6334311893099516,-9.245463153589473,-8.1446817117285,-5.399620196272221,-4.743182165684992,-0.5379794020452167,-4.548386638715689,-1.916835891746358,-4.142169057182472,-1.3928527072501518,-0.9822330604735052,-3.9959226419174576,-4.527517651264958,-4.932799210746676,-5.551320210908932,-0.12739450927404805,-6.36897624934206,-8.863350149274849,-1.2159467870559681,-3.7260977411203777,-6.869867303459081,-4.284106302269364,-9.001355229362316,-8.461159511462162,-6.328420600803433,-6.124083900633355,-4.328224545504515,-7.200431169177284,-1.0684345078661628,-0.5216254150390132,-4.956766567336386,-3.1034376034277766,-1.1255809804268524,-3.8503028903834235,-7.61975103479184,-1.4321664724323857,-0.27624550995890784,-2.0358724243388626,-8.36670991265697,-4.0762492617620705,-5.343847665163781,-6.925251825367562,-9.297202647939386,-7.116396203932354,-8.021833562041277,-3.407515521320148,-6.0944336518309905,-0.24454572329554614,-5.134113927515775,-9.280691052004572,-7.475233408025441,-6.798508149869578,-0.1877927541504909,-1.1412897253588095,-6.337795861080546,-0.5406734505607647,-6.542023135795125,-7.199233687885826,-2.2114915025863557,-8.900560874912667,-8.289502968217624,-4.854875657346767,-8.403246595066932,-0.01720436439678119,-5.803145576336446,-0.927645067740106,-7.660337169614819,-0.290268351006322,-2.4001352549863753,-8.689213458304783,-1.9484504064392438,-3.6338013182333317,-2.3279465656876663,-4.3887534348545,-5.039323850365339,-1.8189839683626907,-0.04821218526406268,-7.240083309632319,-2.425034353234774,-4.527703695252083,-4.697771007151799,-2.4176618150421536,-1.9457153262563764,-0.17456918276106403,-1.4760101849188612,-5.806965314371095,-2.5999403379777375,-8.950645185926716,-0.2786928695490398,-2.2975123159023125,-5.414837981194902,-7.717174990237192,-4.291180503352954,-9.145571397051642,-3.4993457851608967,-9.21134607725152,-7.032259979722455,-6.966160790215006,-4.536618574434776,-2.4080346295641197,-5.930025844978397,-7.273719773571974,-4.134493851348049,-7.638213700725254,-7.213170726532512,-4.529615978694483,-6.35114435562217,-9.783475497336118,-9.823467575302669,-4.047898459407639,-3.706635305700061,-4.122948609164343,-4.2744679656419375,-8.666660976423428,-8.086496418538102,-9.568815554247141,-5.971272392059386,-6.6497644175301,-1.2076088688502074,-9.21051360320655,-0.5284565818861875,-8.936250174186316,-9.209914350158607,-9.81427912339865,-4.748697685846992,-4.13796309596151,-9.981581218279503,-1.5598028100674521,-3.195413007719079,-8.355541203715946,-1.4481783978123919,-1.9625038842346454,-5.705152935898832,-9.99216407000651,-7.555301675713886,-2.9439025173214417,-9.478688539801315,-9.219611732883115,-1.7730838049957587,-4.069423423797951,-8.652543110722842,-6.280304239021746,-0.5430051608580011,-6.6759537572053524,-1.9386685831419337,-2.0566031485079272,-2.805902245087133,-6.018296583650264,-6.25628226572738,-2.018006458663544,-9.97578383029228,-5.251096952583247,-8.943626997868655,-6.647886458504728,-9.678530247457896,-2.543894401517175,-7.380241762285564,-3.885658123047444,-8.527746637812609,-2.9821971212329657,-0.7848387621920994,-4.636865948983693,-6.674080319955753,-1.1655860473882695,-4.17889401773367,-6.677792485024925,-6.748030814386183,-0.22337281842569778,-4.869082839675145,-1.6116782150586562,-4.898664078793784,-1.8153217397249222,-4.950644976073113,-3.9425324703416575,-8.997538283720061,-9.13775599044536,-3.0445606942526293,-3.4297924193425766,-9.670343191506973,-4.013504139902322,-5.1054179247581395,-4.823728561121509,-3.93663034436867,-7.258048059389983,-9.434448135408406,-5.820752596653174,-6.498866423458276,-5.935686289141433,-6.2845427569645285,-9.280736665338985,-0.08264634372649793,-0.026453328449147495,-6.174323691070878,-7.91906084338617,-6.969184430997581,-6.725068508233896,-3.794976093275242,-4.298762490255608,-9.194555889848566,-8.390397474037314,-8.089266851391578,-3.558550535825966,-5.72894822677422,-9.00209174224196,-5.628791450669204,-3.842136155659013,-9.71682045911651,-9.417303984119998,-7.794350268317414,-6.7336690302106454,-5.059871960584552,-0.3124615282806942,-1.0801822068225975,-3.879307434608672,-7.370711809131754,-5.0565896139302176,-7.4669009580807355,-5.0407967742453526,-4.535379560909208,-3.650976556665284,-2.088274417037619,-6.688516241065101,-7.4857361352939495,-2.81704168457795,-7.880879533825407,-0.8064014576158818,-3.6480636845915115,-1.639016106683231,-2.8286537279965995,-7.5631024667110625,-6.94616718424739,-2.7503772431005213,-0.7232347692119667,-1.389205179990336,-4.08389447240565,-6.069519214880074,-1.1561045965579742,-1.223938348587208,-7.827943102818717,-8.128086239459943,-6.324414808493017,-8.744970622032358,-1.2320923617647939,-7.688683151159957,-0.053245323527340016,-6.332412300390498,-1.9717034491015917,-8.559446560445023,-3.0725190558188142,-0.2048995388263064,-7.267321167550751,-3.4535462806478345,-5.351730158088845,-0.4643634916261363,-0.4851821622235497,-5.739660991616448,-3.5053372471259037,-9.181682314880186,-0.8106704043120327,-0.9268875990393588,-3.234256565655129,-1.4754275072797385,-0.674818766561105,-4.990388720740924,-4.768306157520703,-9.507852430946656,-3.0992747938638154,-3.0950303938676726,-8.507297080084602,-3.971412726216461,-6.550563215500089,-4.205030108433081,-6.535900616589276,-9.11970147158759,-3.5382237997343347,-3.20314682422681,-1.917025741343259,-4.959812608476948,-6.838310197269168,-6.335694413187351,-3.825637126806991,-1.7343601737110093,-0.374303817531878,-3.4020356044815436,-6.944932028037767,-5.77128910655663,-4.710680870224799,-2.8759160278661966,-0.6208772430825049,-5.266131984153947,-3.1130941308506377,-1.347111663695184,-8.903187114386121,-0.39918261081935746,-7.138424283878912,-9.735195364349764,-6.9250114162434,-4.41111043739665,-6.000712143987115,-9.989121436548352,-0.4500209405858313,-9.355002305720463,-6.8561341337369575,-5.035207145269309,-8.449931007929067,-3.015207230434105,-5.560833763913308,-4.6616884282846875,-3.169599459452659,-6.78073120258661,-8.870236244287224,-6.079475517698376,-3.1104528445664803,-3.82557309396671,-5.40298415637494,-9.06777969462324,-6.069396957382079,-0.8428376179576436,-3.2392565742824075,-3.0363292119727903,-0.5580352504684916,-7.593406729595886,-3.563628794725653,-0.979686148889376,-5.659933971163396,-2.2437602988546335,-2.7818816034812133,-8.385198133792587,-9.570437511511617,-2.501993616031626,-3.4357271213719787,-0.6524808974106455,-7.016285845835501,-7.43272956726546,-3.2911901700993207,-7.3604306922555995,-8.225498493438694,-8.065920678692386,-4.215810560302618,-5.465416085919537,-7.558217920509939,-7.750768644390565,-7.724654717460315,-5.917598507864894,-0.25327931236576173,-1.7004657940877155,-5.861013483240336,-4.967034356272853,-3.045563287150186,-7.569911058574541,-5.489753615492812,-9.67715551817534,-3.4931413314356208,-8.383962063057389,-8.140538642377175,-0.9189471904681779,-2.080411004295062,-2.8762204437152716,-6.0435500600357965,-9.290111704854425,-0.6833805094164536,-6.6878858914446,-1.7676272849865904,-7.710125200909799,-5.973363703262999,-9.161997384977774,-9.49153269291213,-6.4149484168742665,-8.359629873942247,-4.4271054038276265,-6.982190349014584,-3.5906781651995057,-5.701936737721789,-0.02443650271883646,-2.520664086608122,-7.147194087707518,-6.324215572728276,-5.96832363737378,-3.074672130732754,-9.803850686144418,-1.9693965850484374,-3.7750323554117893,-7.099821728160364,-9.09199204148643,-0.20046508696786036,-7.478520745909714,-6.1338426016579595,-0.624116323438213,-5.532073385981715,-4.836349670899642,-2.8883986438082343,-9.49497595255828,-0.49854882838694436,-4.7867113040974285,-6.040522862735722,-4.85519959765492,-5.398819532579305,-3.0612780626985514,-5.085767933739951,-2.670309025178763,-8.9166738383676,-9.773028755092534,-8.408733307862267,-5.57743942651201,-3.4731404491905438,-3.750162819280971,-8.270740714425957,-1.7943903572471753,-5.839443022450879,-8.593768200907007,-1.8920302074915685,-2.54470813172885,-7.635347819601936,-2.4671631879725053,-7.166607726165546,-4.660126683523,-3.826726121312032,-6.558841074832227,-5.078718621190821,-8.311341679148867,-6.394829336397443,-0.49209343489429624,-4.753860923114328,-4.628867349343963,-9.417061602626953,-1.4576963457943504,-9.346315984853495,-8.383469385946194,-4.037768116404914,-0.5689357758189839,-7.857525250440047,-9.133318882558418,-9.839468957274793,-0.45949128092402036,-5.781046873023675,-1.092889183729373,-8.705617349014732,-8.887258320121632,-6.3184316439100785,-0.8174521374735355,-7.7690053909628,-0.42635863492131554,-7.644871739078718,-6.215792889697602,-2.9678102246571214,-5.347140839972826,-5.182000119948594,-3.280452270618832,-5.004751620204431,-1.5965567832106742,-7.787532611889187,-9.848463696211272,-2.666165409551564,-5.7652458406523515,-8.881328562375908,-6.464811097820475,-2.2006309460264872,-4.9731490485596535,-4.557193251700465,-1.8361861720169093,-5.233454546806787,-9.25698907695486,-5.346483639946715,-7.46233406319933,-1.992160080471399,-6.7741528130060225,-4.053143346799359,-6.926704813113947,-4.199376559982713,-3.293457923745444,-5.713219396139062,-1.6592748113048983,-9.225361502599325,-0.7999618325521429,-9.603555163237674,-7.674317376940996,-3.0326574141619433,-8.326331854474525,-4.6768341070130415,-8.223252829316545,-3.7643036929010365,-0.9352786488970577,-3.3657101902214515,-2.4474357935390256,-9.981639031779096,-1.936072046264643,-9.867643171873013,-9.351651942802473,-4.857607303549807,-8.850441302264846,-1.1646730442533393,-0.6714593979227446,-8.758656403236358,-9.03554720727003,-7.557618988245802,-6.801397556064453,-3.366011297643565,-9.52435992470498,-5.6441695846238975,-8.500183964225755,-0.16848597087941064,-8.628089390251375,-7.718379477045456,-7.739864821944387,-0.7317854478191022,-4.019107059666396,-1.61512844315294,-9.269311973288177,-3.171279703887293,-0.44405247623354516,-4.383634508695067,-1.572174074503252,-1.2013218819024463,-9.64663630049494,-7.690980796957552,-4.2264181926398825,-6.40074316489631,-5.563538942908051,-1.2556672281766823,-1.813339533516325,-1.8320290106967962,-9.650973251902759,-9.034262193995952,-7.166404459645026,-3.6734195395923197,-1.728883799175649,-2.7154056654383063,-5.789904916754251,-2.82596547296319,-2.1798198393630175,-4.320456764671237,-8.366535770841068,-8.275755353788973,-8.690890262853639,-2.9132420247846613,-1.0494140293824894,-6.830022062390788,-6.693449556990256,-9.195992809686205,-0.5212362323013475,-0.8314225298023259,-5.039857927485691,-1.6488438112355852,-5.204636881277307,-8.518192671178824,-8.281225850406997,-2.026058241742159,-8.162664456195614,-5.8931216537545765,-0.32246028817093153,-5.7681337621779605,-0.4440648132305003,-3.4291959089595903,-3.9411150682814,-0.7427881738386111,-4.416889786717501,-7.885753889669487,-7.230895842237635,-0.825762501385614,-4.255236086455749,-4.930040867563383,-5.33587240779897,-7.841692497280075,-4.541173029596219,-3.736955202283385,-9.620322738314126,-0.6693575289554343,-4.206608419251849,-0.8548476893510526,-5.842338174767054,-1.5404468024221663,-5.920754753646264,-0.03202077489081301,-2.5308017473285926,-7.781458201964286,-8.982826263930344,-7.688741947427955,-2.559067759442304,-3.1429146640529937,-4.535137981856945,-8.657434707931726,-5.954145809947229,-3.117723955544207,-3.8748105629003615,-0.13010101360559467,-8.964265534033881,-8.657480954746122,-3.5948109589518085,-2.0286672134218486,-7.117937965978887,-9.648457486606643,-7.580925169342301,-0.5631537369747353,-0.1259862347105689,-5.8827090194380744,-7.855801962628055,-7.921558295690687,-9.742584786862906,-0.55144175271159,-6.528862518694654,-7.672713144727843,-9.981321789694178,-4.014819601487507,-4.769593733145843,-3.795229484685594,-4.945204219164152,-7.718316920066304,-9.99726899786644,-4.004491796689898,-6.75604086510428,-4.936558793254438,-4.127422839370977,-9.798493870761849,-4.244809652487202,-0.34135863619252804,-6.468525322975398,-3.3170407305693583,-1.018886290113068,-0.315194770489835,-4.172161071872928,-9.702860131648638,-4.358574076980053,-6.077955442190952,-9.527051924737197,-4.849744618784868,-8.460512161198828,-6.358684219102704,-3.7107993882204826,-3.9442307816336575,-0.15657909700480976,-6.099151934572207,-4.0154543068352355,-5.175478550819486,-0.46269669890294685,-0.8658251676952822,-9.561938828823441,-6.720061850824955,-7.747406694282494,-4.987399567148882,-6.0179620125894795,-3.394065387407097,-0.5081449307310759,-4.889014470658846,-1.7929330765872042,-3.811849085589838,-9.807732010684138,-5.021892337647429,-3.7466759961553064,-5.983178336356132,-5.233978770766603,-3.0086387833938755,-1.3294906122455474,-2.271483004340147,-9.26739089936516,-5.26431059805782,-1.7652990836662252,-5.284379752027442,-8.917707985880387,-5.825934667945125,-9.4242118010116,-5.5818296961558245,-3.7718551001585143,-9.496979890226417,-2.2626523397104825,-3.656687118462183,-7.412388081287089,-7.633766887247059,-5.744219543826192,-7.514831582786474,-3.228835427607273,-1.1119310600759813,-1.3742918047721853,-5.650544429275833,-7.880876122236497,-3.2083591349222718,-8.813748277870626,-6.643061761866869,-5.035033907915041,-8.93242736631561,-9.7518674480044,-8.93390969291815,-8.937634431390666,-1.4533166815398957,-2.66378253087886,-9.830531045133984,-2.880653650941416,-9.791278285523537,-4.208485379077085,-3.3474350272480913,-6.424886937479812,-7.002594702374485,-9.639490387470813,-6.082730020212095,-6.478538859597807,-9.255083280801468,-2.7397047120296847,-5.172542054915099,-0.9016084605438945,-2.262739936689182,-4.2226812783605165,-0.8189617339038846,-7.343182581035046,-1.6173390056963854,-0.6770143838133391,-0.28594282656366543,-3.5658075982132775,-4.080019561357875,-4.434373597304539,-7.946307170441644,-7.752481481700908,-5.013187889740392,-2.7579014034597904,-9.129433102129425,-7.651557430512197,-8.169339908324487,-7.667561247544869,-4.706255849468843,-5.343196825917936,-5.727515202646507,-3.7422910552669997,-7.091838851269879,-1.9801166625652789,-8.692728928899712,-4.265576396839441,-9.818796200648368,-9.840721409549026]}

},{}],111:[function(require,module,exports){
module.exports={"expected":[-42.2362442254669,-8.853970368761889,-9.97271968548411,-6.999254116087,-7.2030454306751315,-11.100237331503369,-21.65255104557563,-9.040055597995396,-6.627004702819444,-13.416079579881714,-34.04383403774559,-13.059046464290176,-7.980421142658685,-4.883034333466916,-5.166067160255256,-53.60103806522744,-7.107409350121754,-6.820465880642315,-4.008037088594524,-9.855107194273138,-12.29293986975138,-8.522855266989751,-7.045662211936857,-34.70873303444246,-6.4865955770877415,-5.870926169476677,-11.912895861754913,-6.254911673179954,-6.436011159610876,-5.6616220579039105,-13.69189567964996,-4.857965527208306,-5.9831425239479765,-9.523075093175082,-6.395917127126355,-29.81524838564086,-14.169512905945341,-8.130126423168225,-7.408896092949631,-6.927496274714061,-9.35291554816855,-7.450562952644949,-5.587152510997779,-10.485427210941905,-9.667692481875033,-17.546079480962643,-14.636384098409199,-490.31720256667353,-31.940029020314086,-8.185102831309733,-10.024365192410203,-13.567838760387087,-7.700035043470022,-14.89777378687346,-90.09653189795777,-5.782233148469523,-9.899074617898698,-1209.1054945000242,-23.086710286770995,-5.078685815560469,-42.68363338523491,-11.414084388309758,-19.661543242102663,-12.110929971243218,-5.061402895672502,-6.746956647536678,-7.7716877063477305,-4.8153685202867855,-25.793152368685156,-7.619954539949005,-11.945832583883718,-5.294119089315423,-8.03290309040454,-6.422196597167929,-13.754601962057137,-5.60061519228371,-6.968245675947295,-6.329299919398311,-14.291147868567311,-9.091687372702992,-5.092367426354297,-7.4399326451290495,-137.77222482031897,-5.472071647706112,-7.736605230691592,-8.402182604315684,-40.41178225923279,-47.718663900715775,-13.674058049325307,-11.928455951865057,-188.8344339339849,-157.08708615693536,-9.19674763464624,-8.52633567216796,-8.92390123560767,-7.6076829574310985,-11.800189416123539,-46.759959680753305,-4.763303093079648,-4.27634898109311,-6.367080849501098,-9.995482197881296,-11.598065858095428,-5.938503090091799,-25.317199744342414,-5.809110855413684,-6.09513095304147,-6.817509929918211,-13.764711110724916,-7.795344803315149,-25.26785857799432,-36.84471713048222,-72.50140276389719,-18.791053696224033,-10.110387655109756,-90.93873048177433,-4.045161561833928,-9.696293383407623,-5.485296107158242,-31.47245145489553,-8.347837685347956,-6.476284572430117,-21.177916798826644,-4.234719522384994,-7.7044601606615934,-8.491570320143651,-6.122314240184998,-29.77558840888633,-95.7144973986394,-17.18203453946242,-6.686475202128704,-5.806524222344862,-16.41365599980893,-7.723259817939038,-7.0550712947122545,-7.5887233985466995,-5.603143698078647,-9.794810697824953,-6.764552989725927,-178.4997840523731,-66.00198235391223,-29.38847583991545,-5.2462624639724105,-49.55757849497663,-7.032429583566584,-8.240056323949496,-5.924527494647785,-7.300143441170149,-6.044291096035236,-9.94265787180638,-5.180706773981002,-6.826400864450038,-9.459555951349992,-6.183981145558301,-8.49463221940209,-92.98960590104673,-7.216655057071194,-4.593854241420738,-10.930207405463435,-9.486767831418549,-7.206155785726689,-63.205154033088036,-4.35197915958627,-6.353133677351678,-14.9617730177502,-18.842547188832416,-9.221647976264048,-11.946294104198987,-11.014244689735532,-10.180988690044503,-9.057696015143824,-13.23838158458915,-5.575323692709927,-10.63026578995043,-53.32237673976634,-10.125285023931934,-27.31762494395641,-7.775207936869895,-10.619470283075369,-8.076061695302437,-50.68006784486257,-6.416710870061943,-11.626849158838327,-7.389411266260066,-4.988114533811998,-11.419571382781307,-6.823057361091593,-6.615681081054255,-13.482698406545678,-12.577917420619386,-35.3228798957893,-62.91030771645196,-6.721089924238865,-7.278885050725398,-6.638315401920985,-8.137761864487583,-27.07650317156092,-25.782850374532817,-6.408539747864065,-5.90223966015954,-6.488170177641273,-12.090105875953803,-33.771275321015096,-83.42793511487291,-7.107714021496869,-7.177166821465627,-27.828729234579562,-4.553896682320563,-7.355341805770028,-6.974678769546867,-17.57039911858552,-7.892300753685404,-10.422431826696286,-7.610353117390088,-125.98131327357777,-16.068276360245004,-6.692365094583587,-6.008027360230769,-4.750684356839386,-5.322149760976768,-9.184607468343504,-7.4040836618185555,-9.612674982446958,-7.919562371805214,-7.163772530583733,-47.02034052440084,-6.783469333484522,-30.7000444246553,-12.518455731004517,-9.412607225826125,-7.136841455044285,-35.27123590948679,-29.591410896482635,-6.863644685006193,-13.813790852425871,-10.133330640905925,-7.693997026183732,-15.890307859116849,-5.31559144404784,-127.76338080941062,-8.94198367605083,-103.30943083844137,-7.61567314431444,-148.97578454509076,-7.5986201985471435,-7.910890442876216,-21.8267246057676,-107.06852555979965,-44.13573018532061,-6.155515992576531,-10.690911984653358,-4.569912743120373,-8.160791816030931,-12.45879116196025,-18.354570854251726,-13.086517301906976,-9.41868027729001,-31.034216356866132,-8.471023894224484,-5.77246065546006,-56.897260010271594,-12.565353222317587,-16.14896581866119,-10.510961917059278,-9.222568718129384,-8.842169779627827,-5.5123138694356895,-23.456961415458256,-6.721777833767661,-7.9617362065910235,-11.13719094306456,-10.189434661974119,-8.53554276735872,-5.565189969935179,-9.846083307978965,-59.14283668368826,-4.318822096153825,-8.90725348683922,-4.155999502928841,-4.631865555619049,-834.6344204397083,-5.666742199746746,-5.721287335321784,-19.746059265107945,-7.7020917791338395,-29.928944201816574,-153.49580344137647,-12.989870743462546,-9.525039672126715,-65.72880029139444,-7.979838066559736,-37.46405963069865,-5.162657712724201,-24.891940127538792,-14.528847537562282,-8.622696922311032,-15.078878845852351,-8.379887600826999,-17.313128087134878,-5.456334334121497,-6.046426130023509,-12.236350431647445,-40.588509109354746,-6.17683500281534,-8.648519254359503,-6.240785487422929,-16.47853013572864,-21.579983898978586,-7.884764180658566,-4.814943489807186,-22.868966340059075,-6.129835118167734,-22.480583645687332,-60.85580697811849,-6.8283118638947435,-11.015471496646146,-5.0247891369247535,-53.810151389558754,-5.629172295964489,-5.758342987403102,-9.047944786627571,-4.676243471598316,-11.893961614527703,-105.89553841116108,-199.8787397317152,-10.882638678360536,-7.883016819884558,-5.677901677385992,-8.156702611899425,-7.7579051705201,-11.7433433343474,-29.8157507691328,-20.637375967232,-7.027677379195397,-22.93424459946474,-6.932550313460426,-5.860088105889576,-204.14339795766253,-6.7463597028410955,-13.688111057151943,-269.99920185669106,-5.033452597798847,-6.640231336375556,-9.41015540804539,-716.8144848648283,-6.99186591498995,-12.233427652436667,-7.388237412046167,-8.346736075201669,-245.29921687158438,-11.032796324846615,-21.57224335796446,-6.275313885126903,-21.89842803876011,-7.933391636309567,-4.978808625792706,-6.146277333167163,-6.781146944454645,-8.271029627231673,-147.30321634914608,-8.609536093130803,-15.353635424509662,-11.27136588420565,-9.881916917359288,-5.199049513954531,-9.912433383188619,-313.63990296612246,-10.044084887505091,-12.763864076555597,-9.095035600144385,-6.1212312560038935,-10.686533145338839,-25.95495937882621,-10.204519915657496,-8.990664616812033,-5.439878795308198,-13.742593759167432,-9.210164943636286,-15.46162981965646,-8.971824443681287,-14.20658868891885,-5.038088163096589,-10.04959036744135,-7.764411062679669,-10.438332205582283,-22.328705838100824,-28.137586450495288,-15.062899984427002,-6.537675246697915,-7.037196380694039,-47.76176475612061,-10.950473939580652,-7.861500289053597,-7.14729237313899,-28.062624942544435,-23.490274424794645,-10.333694097190225,-5.653054702969679,-11.561440511796633,-10.900768034359167,-8.128831471417591,-22.747561405430325,-10.240229433997936,-7.42962165163692,-18.447837412372678,-98.67196494880342,-4.330903173588042,-15.04146642655527,-16.235276751231975,-22.51002520200671,-15.6173745377293,-9.41477623803278,-8.8469658096816,-6.433306022723869,-19.622190321280385,-8.402146901049687,-7.6681095214494945,-7.124539966893549,-8.200251345861895,-5.469302895310962,-4.700023668354908,-45.00092327608658,-8.484914205979134,-8.179857565371591,-6.599119186405219,-4.8740897994962715,-12.150393122950991,-6.812903551465392,-12.974639085335433,-9.195677331689984,-8.652072072278248,-58.97872369104902,-7.735356660522661,-8.245334743086387,-8.47356528548578,-6.40261807372561,-9.15387359425289,-30.17697322161026,-6.218484683179414,-6.2983535490589855,-386.94197178183924,-12.050261015870799,-4.8911918717425635,-5.960623927322057,-11.520924554897622,-11.261669567643597,-12.000053193884433,-7.308355553771669,-40.12257574886886,-4.265858259778664,-14.131243817437404,-9.196800300956252,-7.8026901430971956,-13.527073940851611,-38.28772047085043,-7.007359791228693,-7.438626909696536,-40.23850818464777,-60.01503730587683,-12.871780814139592,-6.241138869324992,-172.6935607131916,-97.87625561878461,-13.6549573104673,-564.9570701937989,-6.90977600436112,-13.821691427625042,-9973.048745314614,-24.188309606823903,-9.134455768594584,-9.47187321993281,-9.338001526938314,-60.74587326295806,-32.07186218044119,-6.79792564549532,-52.61684714201643,-6.1329209905026465,-7.614001649183083,-6.5061748827735375,-7.505728761382302,-10.794547099843644,-7.490474738235717,-7.76591287139661,-6.887399594615042,-9.571804550106277,-19.257199997382198,-8.037882159318224,-14.486122455028513,-4.5247549877278415,-8.833112103779323,-6.182084096631557,-7.491144538714341,-8.61439557631911,-9.868447489374642,-34.30436158499655,-9.462358825462456,-25.632169764734336,-9.963860284283992,-20.74199422330282,-50.11529205452475,-10.272826790062766,-6.361122530514579,-12.190688894611124,-6.6282375501522806,-29.12351006550371,-5.510634275264369,-5.111121230540898,-4.518051651563315,-7.280426500699969,-21.50564914625149,-8.2258980886839,-7.034623836070585,-7.008941383383574,-6.525083241877903,-6.52328585211489,-30.148513447298953,-10.591669855226137,-7.48900547489468,-6.81042597964149,-5.072332985512208,-10.678804414873976,-6.561809976871806,-13.575324298739678,-15.946746463712964,-7.378282384273851,-10.512480783599269,-5.614166103158812,-7.010354473472351,-14.830723838747447,-5.032536349701609,-111.79502178729217,-8.718152016496663,-19.38524007515981,-5.19260340264209,-82.56211346768828,-8.077502997189205,-6.805350253051203,-5.1130087709805245,-6.6049394768922625,-6.200456198044284,-6.383677692911096,-9.897525360162014,-6.143761268407046,-9.653112227943286,-6.32645527948328,-6.333483707588936,-43.74356377692499,-19.762131781783584,-8.23117671469086,-8.377298441374046,-6.773556355192138,-9.25879745794944,-117.18315377879136,-6.894824616080094,-30.959575138520318,-36.01777310540332,-35.73322075595516,-7.586727885367162,-27.548159492790084,-7.896341050384722,-12.492511866100845,-6.573805764047684,-6.271958291192149,-9.368302339139852,-4.744154299090861,-8.842701310124104,-5.098990175405713,-7.430178725325352,-5.60069067868629,-5.3902866537258305,-12.69143731452537,-8.38247633329283,-8.52669571175163,-181.60858991649883,-14.761111562170237,-8.364845531248546,-4.5647095141418,-6.118412679316972,-23.69043254245158,-86.25922302691073,-12.279133557960739,-43.185748000612016,-7.341478633031417,-13.84092490142228,-6.920588618268824,-9.266421775901582,-6.276349648130749,-7.514628467353209,-5.991590600386042,-72.85632143555375,-11.205013695085011,-13.5739290306349,-5.598353531006533,-12.347621023008738,-5.256517106371766,-12.094843821167112,-52.75679348711532,-5.745816445775101,-9.649304021455901,-11.21283100127847,-150.56049671804126,-15.142791616417503,-25.820035025224918,-4.654975184007458,-5.501417956456093,-7.599447143955802,-6.471450868155493,-7.2616133572366826,-322.4413345624047,-64.28876484404013,-168.4263344743431,-36.775241316417144,-7.2284298432679295,-7.637222335082024,-5.365322976876536,-7.571720448693781,-5.435782284269382,-25.149951941321195,-9.177589904398845,-19.78808849303411,-7.574755226041837,-5.395987656051105,-6.064467683425343,-19.773062440499483,-6.005920514889924,-17.624163367883195,-7.998811491038583,-6.667885800913673,-7.229734087123369,-7.527718929295858,-7.084340339079124,-8.00914858440715,-154.53528899966557,-6.740253109309101,-6.549911948618378,-17.387078522491798,-8.408127662855213,-7.2576711054553735,-11.097796351042811,-6.2769552898108225,-6.979746699717646,-11.473439919905424,-11.73892709120217,-6.042503889318913,-5.408876924293203,-8.497594181859426,-5.71075957523367,-10.835105875661279,-33.818329236326456,-6.766207381309475,-7.892672734690607,-12.143000122132108,-47.59349181007096,-11.887131778047253,-140.95703052096474,-6.546295963334494,-145.63071059917564,-49.86762235182701,-6.860060658066219,-6.15747203941456,-13.933384022092953,-7.4065187272977155,-6.903986492905193,-6.915791326633375,-8.104043007205199,-21.211253021125884,-14.13414820833593,-11.486282528087296,-6.111839015925019,-11.472142642325045,-6.048607787093158,-62.91460177643906,-25.569311523430322,-18.383164075016317,-8.0456296336834,-16.31419890862005,-7.216677831918608,-7.242757412192185,-13.898814428883172,-4.915719589437923,-11.082490748989605,-10.795835640195895,-6.775041700747157,-8.097620495584685,-11.949581962153754,-14.176331928262536,-19.336956633156014,-9.018710875943624,-7.869434825461432,-7.011042337794814,-4.930018897860217,-14.691733531111177,-8.748781096671962,-7.014495285967675,-107.0843581384253,-64.74558471415871,-8.098749882193635,-11.100662479889497,-7.683121324292187,-12.607171219602671,-5.757279055912949,-12.124165269338015,-9.49453494504473,-12.343047944891023,-13.945755051402264,-6.471224980835064,-8.107591762076956,-8.402540575806553,-6.453107099795644,-5.880884189727294,-8.608068207729053,-10.87721235796369,-5.786055767854406,-16.155767926279545,-8.738619300869251,-6.226547902031902,-212.46764340008747,-7.692925191226635,-7.966261453121627,-35.07839516232621,-137.10930666489597,-6.643216955989896,-6.304580558509888,-4.885390378772525,-9.544183138124815,-22.71622074860383,-9.856266877474694,-13.484524927573496,-10.87042058733384,-5.386853217881479,-9.911318893311057,-8.122112481333625,-17.4412369926604,-42.20389644124394,-6.010951557390886,-12.303307827445417,-18.247984077943144,-8.48524079233756,-5.3849934162065765,-7.264320603953475,-5.619415715290125,-7.789685242766087,-6.749193488323266,-9.60086601043382,-58.68038854834444,-6.290160388932549,-4.288911490354767,-9.444482967291707,-16.211079423117496,-23.705097795572524,-29.234453673213622,-8.656150715766524,-8.869319867252866,-7.073251753314607,-22.837890281916906,-7.114607652446428,-18.320729092398484,-6.503999398956991,-6.661545926624106,-8.628176031767786,-38.24057640961905,-6.33848211902227,-8.330151504527164,-12.86147972327769,-16.1250281587523,-4.76315383114807,-28.699314326893926,-5.236013793705304,-13.754304514155555,-6.769436437019296,-8.454863261634962,-188.69220133395675,-11.060340489606707,-6.473189752916821,-15.783659894069682,-5.958490046291148,-6.6796113833082185,-36.80788738004831,-6.1153259411200676,-8.562864970663354,-5.804563823619423,-13.622778535943846,-15.145590029087952,-5.60949977113251,-11.494346737758931,-25.30275004797322,-8.810462780495588,-6.783726586395959,-7.702220958864836,-11.015865119900637,-27.056823030281585,-6.88744536629058,-18.27222191455711,-32.288946527408775,-24.899400311240846,-11.604731031624034,-5.080523491907133,-5.165046356172872,-8.37294225510772,-5.4814439472992165,-21.673854265256754,-16.896597488483188,-19.749038024162914,-4.963089673296378,-5.678616339974244,-5.163760733614308,-8.567324497829501,-4.739197318253483,-5.603678336569109,-7.41700150112338,-5.343292717558409,-6.035758914341578,-13.014586760631158,-19.74511027047229,-8.040475670894185,-10.659965506820136,-32.887950908973465,-5.193674467923605,-4.922486895107926,-6.0189761687009415,-11.931671917199882,-13.242065644225358,-9.7611700884176,-7.7358896602413045,-8.43490644326088,-6.375134216741099,-105.12302305865731,-5.85647950828606,-26.279324194036597,-7.829791128857597,-42.84222673904236,-11.850009515647011,-9.430173436903658,-55.16796216664913,-13.377261606347046,-7.658743561438735,-54.617482269955524,-45.10370419433075,-7.4287743267911965,-11.74999595612652,-5.495350506017303,-17.032797545304483,-13.534317093836489,-6.058078461107731,-391.88323842908625,-18.747343498023113,-5.117604368839961,-409.25181124292305,-20.67494005303869,-6.319588893005054,-68.4373258203801,-6.18353306511147,-8.648550759953748,-6.066087273604296,-7.206982229121955,-11.207573456406921,-188.98377791890474,-20.81285401635093,-6.541283212578113,-6.130419095116724,-6.625839101470425,-42.65192817241239,-5.829790314846958,-9.244446334282767,-6.644832890898191,-18.864409627467854,-10.240122961664751,-5.503447375143131,-21.10046789912397,-6.993157564137781,-8.249552595434652,-215.8423456947645,-6.887168452664157,-6.507459554165443,-7.743258210549481,-7.527859172087892,-9.599168872717756,-6.17560258130495,-11.62322049080724,-17.10441036494621,-15.194554556554952,-6.945788008352629,-8.050693197712041,-12.602753083270308,-6.495475349796301,-16.74566003897011,-10.4470584162975,-21.883024651877125,-8.224533544460602,-11.250874925475223,-29.524956841949404,-15.173555530903567,-8.130899692800943,-13.254419479407042,-6.931321336009627,-90.89945077672363,-7.609830589248199,-10.970497926386773,-7.59175127240142,-117.00738687230387,-13.639327376501619,-18.20969569541767,-7.038273344733032,-14.206955807682764,-9.867399774860456,-9.066455303490091,-8.603959352241304,-12.449728265052622,-11.409592370286827,-7.919667372525693,-18.28679008388394,-36.338413268826145,-7.0097383739317625,-7.949700865649685,-8.011456601167033,-20.24812179084854,-5.766896238921485,-6.0678865974452485,-15.593613965352013,-7.952029141034512,-27.889477169765403,-16.23666985423522,-11.34975232747656,-6.9507827408414755,-6.789308260040155,-8.922691229456508,-13.515395750881556,-16.000404101220983,-33.04450903942248,-12.852305615148321,-15.915673102489738,-11.79405346970172,-34.784272496163695,-6.081746787650829,-8.121736521055693,-14.170201889789334,-5.2998293639794465,-31.501544010306887,-19.117948919697568,-5.03086949388731,-5.926616572579803,-6.757061227427955,-7.512978270731173,-9.158533575733685,-67.8805699066382,-29.814032372588052,-6.715152626682938,-20.026440408615404,-9.306260773502476,-8.031736167383206,-7.119695356656328,-6.350320908272675,-6.990117862273336,-5.827806850422689,-9.839835991754352,-7.232256601474758,-4083.8163172792656,-8.84988416180677,-5.518205062057568,-8.366801810067521,-14.962953212898622,-10.230079237122196,-7.261149347663192,-9.99284076970904,-13.308255035809768,-8.564927591296765,-4.129316474207775,-6.91203661157392,-106.98964920950343,-9.249453822384336,-6.547715366254712,-5.26733674964305,-156.85356020787174,-38.117974563314114,-7.923791625386567,-6.589121184436718,-22.459937165081026,-6.7785576167897865,-9.274966667123643,-58.72417510863535,-20.42630827990898,-15.199040476303816,-8.552048866552992,-44.9563229004445,-5.559287032994389,-5.062483127298662,-4.675519353738621,-7.773088912083841,-5.679374457242734,-8.364558618629708,-12.70946754116475,-42.56976460624289,-6.952347120076878,-76.13811520276748,-7.652122848526322,-45.27927126166762,-17.395559530491816,-162.24411972581265,-7.234363624511232,-45.202295791459036],"x":[-12.532369687870819,-15.523547815157619,-15.141635433049625,-10.248654125051768,-19.425396486963336,-15.647027649565242,-15.757980112299599,-18.336082674823306,-12.670769469276944,-18.936140215992907,-13.40888985371855,-18.783962024802438,-15.217296682676924,-11.223056718674185,-12.454047067210428,-17.547465352552624,-16.81234110302045,-18.51103974083153,-10.001591205925182,-15.54092660863979,-16.2970022154756,-18.133586851361258,-19.51773158481388,-18.081708761638243,-10.653884718216208,-10.827293492086561,-11.691786975248686,-11.003309931443662,-13.928408588482576,-15.015545064610338,-11.716442747487699,-11.744043795142629,-11.82495279875382,-18.596728835239333,-15.103943847738012,-19.940894571362527,-14.371159654249603,-18.32208661774438,-18.758968417971357,-11.451245071670764,-16.32651241018383,-16.54250400819012,-16.836085935363478,-10.72687183904133,-13.152851261276787,-15.979191624591888,-16.367326502111588,-15.703309189917602,-19.903565200470442,-17.401907583728352,-19.437964217323188,-17.916932848587052,-14.272809269726237,-10.116534967675065,-11.36985496484684,-13.852070312950424,-17.04236171103807,-15.931929955711464,-10.331475494040323,-11.551669573118948,-18.590159155233824,-14.827993257874885,-18.7081719455401,-10.517730158941143,-15.02329107531291,-14.62905575903634,-14.894670335421168,-13.380091808628174,-14.189738217106436,-19.00237357407635,-17.15631445339209,-11.291325445595888,-17.681396031523132,-18.442439421105863,-11.190613077812792,-10.45247324233696,-15.961233286086138,-10.37969759243935,-18.02534575096502,-14.309741851125635,-10.856065846255241,-13.485871839575601,-14.66305860657384,-11.074058260738834,-16.63990464968225,-16.52444637586936,-16.941136818660347,-15.263508820603688,-10.983943921368153,-12.69614091902756,-15.665032392670913,-15.449134697716797,-14.704318592286949,-14.930224435393074,-10.517317488014104,-18.92846041397062,-15.474121273013075,-15.72779881563119,-10.497608073463597,-10.158821186242688,-18.73225080613017,-19.83091904780888,-17.32583452270816,-10.030104674462603,-17.243396459508148,-10.644597774669284,-10.219373955749125,-16.252872973215876,-13.23062776810996,-18.517270209539895,-17.63346304511306,-15.265276647478572,-18.93730010487709,-14.926403694755843,-17.591287164547214,-12.834425542470079,-10.251291741336605,-16.989243571391047,-12.756622213747917,-19.227886029269946,-17.271813585867978,-12.670860176448508,-11.709814558315463,-10.293458410781636,-11.23072557773778,-13.469390592353271,-18.523713513479578,-17.272925500154006,-16.14793728292711,-12.730474411098893,-13.402380168457226,-13.280038103532997,-14.25461402414409,-10.941021451984703,-17.055840399696432,-16.042217573938476,-15.432685682034872,-18.973990136409014,-12.557393144442884,-11.549883855899543,-18.460123205801256,-16.506754108306854,-11.806838900236048,-17.040918566281533,-12.603811085673705,-11.714569646538816,-12.243231751192177,-19.98788297366894,-13.580934943612803,-12.588348440664742,-11.813499270503138,-16.997691110746945,-19.34447892747764,-17.14974629936036,-13.691841335654216,-13.683298296395483,-18.527733124169067,-12.005526198774847,-14.863382083074265,-11.907434246858909,-16.864018508399216,-17.16601575775202,-10.304506333425616,-15.951039885514726,-17.973711677886605,-18.958851466708083,-14.770908333657026,-12.616016589244845,-17.207795496190144,-13.131609151495006,-14.286797638709391,-15.302408769629336,-11.964110500569934,-15.642345757792029,-19.61633020292966,-17.510984814659324,-13.529878628358647,-17.968614208255406,-14.306345257880892,-17.78392260777941,-13.778062310861433,-10.278027138970067,-16.907314659139587,-15.640647503326917,-13.526096041401871,-18.07034222519836,-11.648639477987135,-11.98519946793965,-19.84087697946315,-15.755516452862588,-17.713317063023347,-14.297778776976838,-16.300311211497323,-18.186316016247062,-10.404872893098954,-12.177619443933674,-13.944464513214257,-15.760466427189577,-11.985324033459344,-16.352547744392663,-13.643247582914919,-18.208215658255483,-11.563784419114311,-14.811825213638503,-17.900318075571803,-10.396445509757363,-19.097026691538275,-10.52895688116875,-12.883711052312828,-12.310745760351043,-16.54132370806279,-11.328459282444818,-16.155541958305534,-18.063707060516126,-15.005937339207687,-15.328761130547727,-13.410738894072352,-19.731040476212023,-10.187751659870461,-15.903759612784556,-10.941708510784911,-16.829719777327934,-10.803592811424052,-19.234782812432755,-16.09515706341048,-10.795524565759651,-11.145002941816127,-15.535210203047221,-18.065459577660658,-19.142893066747902,-13.369042820999855,-19.816523491348043,-18.77982142329811,-16.915743401643894,-12.824491444847228,-12.106461653806162,-17.385409364600818,-18.364371872156713,-13.773877752668726,-16.360767769663237,-18.48598048058289,-17.94973903888997,-16.951961047757585,-16.688353316552547,-14.790556132261198,-16.827764544809387,-19.50073593568653,-10.339458071357829,-16.011030362502787,-19.41596076640192,-12.776831405572324,-13.167795555560177,-14.123870352061548,-12.85311032701391,-17.57284900161466,-18.898833393335607,-11.170339938236049,-15.928152958795891,-18.77677773711627,-11.221078407343866,-14.316221572817758,-16.958012789064203,-12.184450632464081,-15.34138950252352,-15.74133076922938,-17.811927800494992,-17.012470033401325,-14.61368032202601,-10.07510484703019,-17.91282549667652,-10.362155650446807,-18.153322755923117,-19.999213879368735,-14.736699783480201,-19.592200863526266,-13.676204392129128,-10.396121347580278,-13.075165559007448,-10.796053122754202,-12.7949012159894,-19.49806402794679,-10.832258245309934,-14.318020407033567,-13.290556951243744,-14.114688835995002,-12.455708320562822,-10.5837855683159,-17.42748986789947,-10.233664975688331,-10.3328870114491,-15.743983030538477,-14.988117738818334,-10.63594733072144,-16.67039315306984,-18.56658659196499,-10.593437230547721,-15.845922327168715,-15.136000706095432,-14.19539366044341,-11.276587390149274,-18.906392750389408,-15.960179511244682,-11.818055102928984,-17.625096377641988,-14.022886611665664,-12.003620145382916,-13.256913685641738,-18.19488751665736,-16.368467082278702,-13.178342670376503,-13.30158369427038,-14.166013536674528,-16.07646302958512,-17.79539904978241,-15.20017252106657,-12.72408746598603,-11.649175998063043,-10.647635634655012,-14.681134338248562,-18.292415027385434,-14.036561787124697,-12.772501499674348,-15.469463819819538,-13.032338147079763,-19.869801805975957,-10.882721319492074,-19.244362925448208,-13.437580378255696,-19.64846589938744,-17.25505397396447,-18.79608002166313,-13.465550947493893,-13.961543225452349,-10.808720856875645,-10.602264069870635,-18.99906086553847,-11.74441344743846,-14.175090584009961,-18.161332144707654,-13.050206539690553,-19.449907910392806,-13.635041509388676,-10.732653165382684,-13.819015933400337,-15.703722584698198,-15.507563521909663,-10.667874072569223,-12.333452769268302,-16.253801565074003,-12.309221691070311,-13.337518058700322,-10.702592680632684,-19.681096409563473,-19.292693467102442,-15.122934396027315,-14.272841024161327,-16.09099629726235,-19.523211770961638,-13.056002052462652,-18.567023015493984,-17.25429212572872,-13.06922735513097,-19.571414680795115,-14.792683430352472,-11.757843252839287,-16.369510378499584,-14.499600109638912,-14.909566181967085,-10.820786172691463,-19.285360468647553,-14.035412273450959,-18.458531707948723,-19.88062357105656,-18.32302118538745,-19.03065377449754,-13.218533227961043,-19.668949999234798,-19.351040458542,-16.46268107034092,-16.243599888464377,-15.885430803328415,-10.557452111577492,-19.471595253142485,-10.786867325329574,-17.72516182408798,-18.439113275418755,-12.19212177059073,-10.076263769208369,-15.069204063019527,-16.785384493196737,-19.863221326966578,-11.155496812003436,-18.571171134884214,-16.514034219407783,-19.91993939352374,-19.297990983211875,-19.1741766733325,-11.868675898246597,-16.218349305835044,-14.972607643500425,-13.48764790360848,-12.395576799842845,-19.810376090400574,-19.696028334235777,-19.737064139805312,-15.478986141675852,-10.666065499699883,-13.022767462707169,-14.740330477973142,-12.24854846923225,-16.91718034881865,-14.685426988221836,-15.945085974848155,-19.450780304627227,-19.354494180305565,-17.3025117204659,-10.669649650534026,-18.557509672579023,-19.541174014539898,-10.328702947101473,-12.202176582916245,-17.646711480452865,-11.53659123490461,-12.81858075419982,-14.934944500979533,-12.200690043719355,-10.40736933612443,-11.755865999989485,-19.851399615635138,-18.411011726544093,-19.02389146950025,-16.253089550820846,-18.106634157030726,-17.27404271649571,-17.32346369563667,-11.514265904503468,-18.69666362429607,-16.06991994887416,-15.075421087035444,-12.544285905613297,-19.834874468775894,-10.375999956071436,-13.037298038456086,-13.902869739506453,-17.852735906690008,-16.6431480057869,-15.911651912406636,-11.954057610451152,-19.104868417759477,-11.285856003903849,-15.748899018948268,-11.805918445033448,-12.73715097047075,-16.296515225451415,-16.691033041842495,-16.710085004968963,-12.69020823930914,-16.32692221307327,-18.652250207620884,-19.522856467855338,-11.433763425873744,-18.100056851525814,-17.64386597517181,-18.04258370318685,-17.24140933247933,-14.959690618409685,-19.53209589613325,-13.702201157934537,-14.483899667548565,-13.40286963746374,-18.86422755392109,-14.046521370828263,-18.857760765507045,-19.5746652001978,-11.67396270666961,-18.543736357986894,-11.382722965789903,-12.361540424323646,-15.380693446882216,-12.46104088633474,-13.153206177454733,-13.071421286977326,-18.95065927887495,-15.843877561978738,-13.379541878122874,-18.723405746739893,-17.0161959837448,-15.354072211448715,-10.211807316123245,-13.51709221841896,-16.215461264106963,-11.491871068168525,-15.793568679093287,-16.056783436562764,-13.335537550876262,-18.75812051670661,-17.601726827663274,-15.117306078210282,-17.726123151624083,-18.498383021056185,-17.2032800360048,-11.62857711152375,-13.319487239575407,-14.368829373292488,-12.764591315822056,-13.948139142246605,-13.582621390594214,-10.019123109967884,-16.451188385439465,-19.11769631642066,-15.12529763090516,-19.428709924732765,-19.56895448341498,-17.65933676900296,-15.459043936298283,-14.156365049805919,-13.506754980503926,-16.314285439663973,-10.159045689364,-12.07416944266595,-11.96188003136822,-14.698201445231176,-19.174934631292913,-16.994492356670115,-13.696767752195854,-18.960499292776113,-14.334380768601767,-14.14661229686592,-12.964667186726363,-14.309507209531525,-15.622032560973677,-13.96160260017579,-15.56132835544899,-11.274722768226262,-13.321924972750146,-13.480720691060725,-11.729018723498575,-10.671496133957126,-11.628409103184353,-18.930214967091345,-12.003883947847777,-17.44366958988844,-17.232658700956044,-18.567891124333165,-15.045995101558805,-16.254907713131107,-14.41048363837754,-17.87872275825758,-10.980644283934502,-15.636240063089337,-15.558568742603022,-16.2671276402476,-17.145356255844323,-19.44596020242537,-10.211475793920847,-16.916225123449642,-13.215450650659253,-15.013338794202893,-18.63404937472445,-11.802207224437979,-10.479206507206067,-15.3821331398386,-15.817133255729903,-12.483142808292682,-10.308805417764171,-16.240871315943142,-11.090237675166453,-14.755987165620274,-16.502562036450403,-10.378225892930818,-18.827690876003594,-18.52516257627115,-17.361021314346644,-17.97363766203813,-13.886003525097294,-16.430738466407153,-12.204426661218735,-19.56814333276339,-19.20177047679138,-17.533339986778184,-13.399064656345196,-17.552439885745997,-19.095693022787895,-17.877311583036278,-17.013110807043958,-17.81474111912004,-12.229519236859774,-15.474831037192445,-15.10128525398347,-11.248139450445283,-14.89824646810247,-18.951050320817465,-13.774094067554575,-10.337407560665856,-15.778049267567425,-16.210693202088464,-19.801064448637177,-11.968757465175102,-13.989472066660657,-18.278790896619917,-11.147536847415981,-16.213170085896298,-13.326684663632093,-12.746632768578692,-14.656500747398287,-17.62440593964939,-16.623327466826765,-13.76366951821047,-19.296591100927657,-10.26941653010783,-15.759724542180617,-16.691852133196242,-19.507538843238656,-14.690677704678809,-10.71505325425745,-17.40605546324366,-13.699186281049098,-18.895574829460255,-17.40242034009588,-11.537261656089727,-19.627476190909743,-14.959844217896121,-18.797912133670902,-17.10018973927631,-14.079573082697014,-19.75334758142718,-14.661686183305632,-17.95739580590496,-15.520168133631708,-13.62725730298185,-15.305379492768285,-17.019996697060908,-17.97235443945162,-11.74915931129579,-17.119709974265884,-10.586019410333057,-19.504589936919473,-16.145484049870817,-19.68646547708123,-15.332403114131818,-15.519997613863081,-14.911440627094183,-11.605065368749287,-17.859256517212117,-13.237015937616778,-13.606154684624986,-16.243773791149472,-13.877208935569307,-10.96904708229996,-14.300066250079361,-11.608422169200242,-16.924527956422892,-15.267611098920039,-15.834684253142813,-15.715103838689542,-18.417592136467206,-16.9466755560283,-13.01803886796592,-11.078870302933922,-14.814885956948183,-19.137710167622018,-13.677707807494553,-15.548560365262043,-16.11178775082321,-10.211832748682879,-15.573800761199436,-19.17986054270391,-15.656611333406955,-18.162184504047104,-13.207689198610762,-12.609144955858632,-13.941866874867713,-19.498724656197314,-19.516201225805357,-16.482525034624576,-16.2316229471122,-19.292571013709537,-13.741833206165804,-18.41292345549673,-11.344769888843631,-16.784514594988373,-19.053538972994065,-18.82451816488175,-17.181746829240527,-19.569252724008628,-18.883800485775456,-10.832888642912229,-15.36699692952465,-15.606755493093345,-13.401612989063818,-10.427207167512693,-12.03783337613768,-18.513283767355407,-14.038287813499796,-19.783079524456998,-14.359295096343768,-19.94750692300435,-19.948423653224005,-19.8658407842502,-17.714763016038425,-13.840587297809066,-17.273195183542768,-18.89933654036809,-15.949281307236214,-10.263863881466511,-18.251426716962598,-19.048288521035524,-18.188589432655967,-14.210914588318225,-10.767369731667106,-16.604127950943536,-16.43530770269416,-13.693006260345443,-12.892591912196211,-18.763699477380513,-11.082084025859375,-13.527455735503517,-18.24152451199573,-17.65544775633482,-15.833718197628242,-12.098153152503011,-16.451373365566326,-18.34517359693637,-10.159088171838857,-18.19667347314823,-15.299712348039929,-17.4528361574368,-11.532876398166216,-18.815234646918547,-17.073465840235997,-10.994979526493317,-14.585595107456307,-17.499684166819623,-15.667883797167935,-15.061440392515603,-10.31767452034159,-18.957714666740358,-15.697374670214959,-12.011970506636079,-16.30648933704859,-17.88713318011563,-10.604649846815368,-13.382197768891713,-13.502323147877728,-14.85055400106516,-14.895724745341543,-11.03770648477829,-17.767381467231925,-19.026858133664287,-11.160801776305124,-17.495977964744366,-16.208355370948272,-13.799919383440892,-19.071126236175356,-12.536914079679955,-10.953928791467986,-15.508699755755558,-11.3151647704321,-12.814563032793869,-18.47239947092262,-15.583820961200852,-12.479521616099943,-18.209192298702845,-14.525798219432865,-17.205844918684225,-10.233403349247611,-17.86480936342579,-14.161853539289538,-12.180201064498297,-17.319168662233153,-14.25414884525088,-18.555955654645636,-16.16151670982782,-13.451709169955308,-17.922706637273798,-13.005890487549479,-15.046198273244567,-19.961246389684494,-11.66014152376928,-17.67839914377237,-14.62110128983175,-12.113366077235092,-17.01588563030509,-10.762631553225223,-12.409089550493714,-14.448409316683609,-10.14674949488371,-19.661285076835018,-17.39920356643164,-17.478164785361464,-15.073752869945487,-19.588554862405168,-15.04211752783866,-16.937345013802947,-14.0529119502399,-10.682693154541887,-10.62312105132623,-11.190686789678656,-19.8627707953497,-18.979922608808142,-16.253220225383362,-14.222448632508279,-11.616396291081353,-13.254470017887632,-15.026104579321789,-15.184011560718503,-19.20025144024022,-12.969325312686873,-16.60568565978711,-17.535864180777853,-13.239470232221304,-13.593757511684272,-19.283375534339438,-16.03229143697748,-12.927764917747421,-14.144552494414075,-17.295563740542107,-12.745451311710854,-14.493985384956002,-16.56430685970943,-16.512355820807134,-16.1202301371494,-18.462727959865838,-15.06019223679722,-14.088188362746592,-18.210134670008287,-19.876951247152785,-15.973506100992116,-11.482775157662283,-17.036315343577996,-19.480174169101772,-18.523554078904986,-17.443048382785115,-12.6930063136057,-14.876146181051947,-10.840171234482519,-16.968547567367494,-15.23945552033271,-13.910362264685004,-14.822087260205489,-12.321324321819723,-18.651518809396816,-11.710547671550495,-17.76734419887062,-19.688352084868335,-16.81269178714945,-10.16524620532315,-18.618986629905834,-18.75195097665968,-15.48729496062747,-14.083110020976076,-13.497930370912057,-15.197900015168347,-14.653520209931001,-17.995643027881112,-17.715160326940442,-18.532666678767256,-13.36940829129279,-14.54837459246275,-14.102580833082317,-14.930581840321882,-15.797414747274212,-14.258347843402994,-11.907151763965462,-18.110888844833376,-19.51644941080896,-10.690546750924472,-15.954085304849626,-14.660108011776593,-19.209975580463087,-16.484656147120607,-15.711487486372262,-15.772992354743122,-11.702354930581926,-11.504730362995781,-16.416885708559473,-12.622895004572637,-15.160901405723004,-15.99105919594313,-15.104347376783732,-14.589010473982995,-19.88365748849912,-19.240581322012282,-18.732355678428153,-14.878130949704818,-11.156276453698554,-18.140260095541798,-15.704441401902669,-18.9715141638376,-15.956518605023264,-17.821088099114505,-14.304099304530327,-13.514892080948893,-19.936737713221767,-13.339164082465665,-10.158402142924984,-12.338197311700513,-19.15993423476967,-15.196873781607374,-16.87429200437068,-10.88018890857304,-13.594764176223773,-12.796315694117697,-12.91987068882802,-17.26033709777155,-18.449292736676423,-11.75719742761731,-13.280036536433393,-10.089545176564133,-16.660068237240363,-17.833404229952816,-12.1368079887248,-15.17788939592499,-14.246905989202446,-16.64285452523685,-15.917026885449875,-13.348607671942332,-15.174224782959108,-16.573485509549062,-12.322271249774086,-19.627949698289402,-10.079110798389014,-14.003474806295804,-16.900220581423426,-19.342410631988045,-12.544459734467265,-14.963395923204176,-16.32769525729104,-17.32661445727014,-10.868990096864394,-19.04466797835883,-19.764014578349062,-19.365947087184953,-10.581183073536263,-19.290168502053017,-17.989437176563413,-13.847864342404087,-15.527774687068181,-10.579820789629888,-11.624091251209087,-11.667763873157497,-15.102108901819484,-13.157689851715922,-15.882479462325744,-13.491272861267285,-18.487736997168366,-12.650160352047415,-17.864729822455637,-19.00116182399699,-16.05861266927024,-11.59661373596412,-13.523842734291556,-18.84072116536026,-11.251690167269818,-18.635915003989247,-19.192133172221727,-18.73594721717588,-12.676903754219381,-10.15875843054429,-18.43333513746343,-19.82662443342875,-11.083586743022686,-19.164713311164498,-19.743586514461967,-13.727064264892451,-11.305440764221723,-10.653580918479467,-16.444612690175184,-11.869214149726183,-19.05051168339481,-12.414714303012426,-11.520459500513052,-18.78093027469062,-19.31178633402066,-19.34141242967011,-18.672865252612777,-13.463909003477683,-19.37648213305399,-11.423047232245263,-18.09744390874272,-10.79509207252553,-16.70142015877946,-19.047986049914588,-13.427844474152673,-13.470798738311291,-14.100993633190512,-11.974680384449252,-18.711547821427978,-19.360055091483947,-17.480878470249984,-19.71108289837998,-18.92984757628195,-11.967725939066693,-13.439777584487064,-12.075789073847613,-11.39780262379591,-13.471342530967478,-16.160541276719524,-10.663119033371931,-15.06904784463991],"s":[0.3886106166312997,2.4538916753368403,2.7312208682483927,3.4442533580036763,3.3086713025112715,2.253248474587688,0.9342952544128913,3.4972658089248254,2.5171306578906902,1.518339531067806,0.653006660065153,2.2128428324649096,2.8888835440348117,3.9220626941539005,3.9805911255989637,0.4033431112659813,4.491174322020598,4.8316881685379665,4.420067096477035,2.311137589867526,1.4954039629569116,3.5097571098445557,4.901977049476571,0.7640731358769759,3.950563477265341,2.742319689869175,1.081390227929817,3.216180340433824,3.672900860293172,3.866689295928969,0.9462282420465151,3.416282698917732,3.3510379124438083,2.1501128212804863,4.868276575127675,0.875458125734162,1.4640678627576564,3.420467550993661,4.453140454154479,3.0857870808912082,2.399151811206882,3.9966774128102243,4.923196924861407,1.7099004110774285,1.7059354712311836,1.1165379320525748,1.7802209880564834,0.041506779883199174,0.6457745434307594,3.2303437850595342,2.3500593040489557,1.9839383967267077,2.5136199967489747,1.0070539013136703,0.18382586035746828,4.899854389161696,1.9786102575743914,0.015516890781993586,0.7766095892341751,4.666403580395925,0.5615697496657324,2.0459924970641286,1.09486706901595,1.7263642080164188,4.855116187339574,4.239880745696519,2.9119003258244023,4.5413763340009075,0.9025745171476374,4.411656702615993,2.3790878949602967,4.65958877491482,2.5790756044400895,3.9046230897029233,1.544449249367813,4.6713676943247195,3.6366206031737747,3.1494272168270285,1.9140735434611467,1.9399205634952588,3.6812147269452833,3.5086476296178337,0.13987108661162928,4.732997695781864,3.9956394027675692,3.4431671369782224,0.4698934167248603,0.5148388977582508,1.2325898426184456,1.8550771793150433,0.11906385250277429,0.15300760810113445,2.595048258563942,2.3701982840643177,2.1036285390612495,4.099813528455191,1.7556045616329774,0.47734310008535896,4.785454917181245,4.423363127398582,4.878492478468024,2.7844970284772783,2.244799611454024,2.5884664364977263,0.8247734270218121,4.861437217486152,2.483499912091095,3.8779327238050265,1.5018408799239136,3.909152955745623,0.8085770097793465,0.6613873018237326,0.39094275318860894,1.2806869901015738,3.039452974007182,0.15916656182594302,4.2114632081930425,2.6807121236814946,4.820080527717127,0.7427599368118099,3.4077364535718058,3.168111332341157,0.6056869379779051,4.642212227197504,3.195005925139218,2.8295816971981247,4.5451938855452765,0.7086483977557412,0.2517102685442185,0.8156716082094528,4.337619681548639,3.1297279035225554,1.1295197765279141,2.3813591435231176,3.468108083121394,3.907409830946462,3.836694563892089,2.903264357367945,3.919355311865581,0.06769341082382141,0.3838542552749158,0.8807715041168673,3.991247730457479,0.4572896702187512,3.2520661656085483,2.742196381108476,4.140159252221888,4.063025473927771,2.7003550988388945,2.494770246999564,4.57745198534682,4.672679577550239,2.8277998979394026,4.738234215164065,2.7622186954760064,0.185501425980088,3.252024781550178,4.801024263078803,1.8363178678216807,2.560294023701737,4.712258250506585,0.3939087117580975,4.240364432221453,4.703577825812738,1.4997075320236908,1.4844140079097112,1.8937234028200811,1.533962858522988,2.403098822066041,2.4625360749244307,2.1145890098208966,2.005903904967602,4.153720570097674,2.133624360467622,0.42772657234183664,2.750737747910489,0.6292896474703891,3.297739056463106,2.4063177356757026,3.572015977928923,0.29692973228757746,2.162579366553774,2.1768781319625194,2.79663908400516,4.990686805449913,2.4814234663076604,3.8825169271208804,3.255430385347328,2.1940663304980514,1.9690220087010513,0.6913285275501257,0.35370421057023815,4.565127735661113,3.826847514986249,1.8073453423443997,2.212308567093247,0.600331571788153,0.9691199013148188,3.398911739848145,4.937284556385534,4.187743431208472,2.4601418295356705,0.5641240090918331,0.24943241766670732,4.772427242808442,3.0048283028819367,0.7906005243848979,4.400129447651534,3.303509522698632,3.0397273951916457,1.2558733104890019,2.2389614029785267,1.6409895803185093,3.9642192730412527,0.13293161310864554,1.0879924915294037,4.311359954256799,4.69531050609055,4.192353163214465,4.809693767174563,2.291767864901365,2.6721057755932476,2.3038186283848514,3.0443526653434985,3.1008792248645225,0.3950728367567413,1.815690012103881,0.6576597929984662,1.6156048107402432,2.7944732924827975,2.3535960770650255,0.589890154628534,0.9660114771113104,3.947179805116121,1.2498191952683246,1.703421255927161,3.552989196050693,1.1703856897426312,4.267032685795825,0.18220255546326558,3.586182869678555,0.2644437736271499,2.8005684851403645,0.16911549781340907,2.595903401932289,2.895154788658729,1.185214025107264,0.17668474371259624,0.36950447810881526,4.927947925080362,1.4280194139852198,4.894216829905406,2.93770228801443,1.427574609877763,1.3128889615522843,1.560993336939972,2.2744491194210226,0.7179280414326339,2.5247057309772436,4.4856231425514235,0.33670293524396877,1.5192807475918935,1.3214452654024023,2.6500934232437268,2.6312691595344315,3.389766918727186,4.416005143551464,0.7451618411509464,2.63652905259074,3.920514029039155,1.8004203953613696,2.358432862912758,3.2818033703614438,3.88466421824858,2.7603190960488977,0.2855400200080549,3.5318482720056013,1.9109153696363168,4.876016188588753,4.17736922018163,0.03244538965194277,2.962300069682169,4.9861102389699425,1.000432831044079,3.428557850684361,0.5222413037268214,0.09301124599261468,2.1957323867351075,2.323466913208556,0.2496410264962956,3.71226846715647,0.6457168603348462,2.645252648574151,0.9505543007708983,1.4440136463950404,1.4880911543711661,1.0796767498245419,2.9623950391173146,0.8581518381497288,4.215010560031839,4.852514278179745,2.224963485512218,0.3624891734384328,3.6157349073517753,1.8056425224463035,2.5188476343828947,0.99488408313119,0.9111496395822061,3.3763637209030692,4.7466281053664225,0.8616763495248625,2.8613707818957144,0.721063501888245,0.3523188089377771,3.7535107474070917,2.171289773529965,3.2835935046723197,0.24561182115412805,4.091587043521589,4.936786839693383,2.1498423532735353,4.783371952873851,1.7157039550675968,0.1356411519479339,0.13051344729887893,1.1227437077734792,4.2999293835397125,4.357800564876314,3.4003413351062117,3.4214130221289905,1.9043878889749932,0.7227632703692111,1.1692315550228771,3.550317405540371,0.7174680440940384,4.985125783120493,3.745501793489976,0.11440222757310825,4.888027998938911,1.4839407033627727,0.08878768118550817,4.994414922233644,2.715575617300665,2.8355365770970886,0.03368135344960388,4.541659069457751,1.538009111284,3.049747581178832,3.695565836195148,0.05884284456486033,1.675119460121618,0.6754524967996867,4.797307604871776,1.176437834882481,2.8415084989341444,4.841704672352317,4.986611479719166,4.944604226856482,3.123088426938714,0.15227822984189343,2.215230643120538,0.9632941079655255,2.2375777333308386,1.6489732707399718,4.955975482330396,2.57083589845963,0.06777762220337213,2.6331106381384983,1.4476732715814566,2.9729015475645317,4.593913471996787,2.049099318891362,1.0762908527148773,2.8994823402238024,2.4301073076078206,4.1004813787243934,1.979209286678103,2.8848228800272557,1.6302871445321676,2.866655066123739,1.8091731753480067,3.705585110993245,3.2250079854074807,2.879683120764913,2.893422569114994,1.0479775894298982,0.7203819268832223,1.0865093067157006,3.1962378591402163,4.040363657776094,0.4159243076855057,1.7235307413742618,4.40525758012755,4.244095080492282,0.9330389486801527,0.8172088901405505,2.13165421320915,3.6752094621912557,2.088082149709589,2.2821785264148753,2.771166863505247,0.5577560624306299,2.58868960818217,3.3599234799767874,1.1340078617285465,0.19602116050501328,4.384956700362598,0.8626928002864742,0.9455506010172621,0.8609285238452591,1.5456101878578765,2.439478074362049,2.885187561214141,4.449424096849162,1.3295854190425038,3.2671051511592806,2.582519929225783,4.828783349978193,4.037465815603833,2.9277243157098534,4.095265358877556,0.43385282712911866,2.2737533031694914,1.8627345390307715,3.448924994514332,4.8427890005076515,1.3799312199605307,2.4022435075894255,2.1201749992593086,2.3887468055254235,3.612354409183778,0.34714873446373473,2.929910974152359,3.364601538683718,3.100718088002364,3.8692645880794596,2.890903646422985,0.841897427170627,3.1651057939267266,3.480880035672694,0.06602580836210792,1.602166479825592,4.173053276311547,3.1852639619493575,1.7735564877659105,1.5544362154373292,1.8327841713729753,2.38304337455666,0.704559294855952,4.832971573639886,1.4417666867426104,2.254805678084354,2.6961165911688068,1.9158601097919858,0.507518754124825,4.537751925412391,3.378868855035323,0.5431461116342706,0.43150948853885596,2.2029785991310336,3.5049011072449354,0.13012576745309978,0.2452294596554272,2.052172427607417,0.04424427279254406,3.435758526940308,1.535546141695352,0.0019138718310662828,0.9601554960281289,2.236441155780412,3.2639418919623164,2.218932413375807,0.396495351933982,0.6451856633673814,3.3931971913832593,0.42258422502042703,3.2131728087859024,2.0330725823102256,3.5198333912609114,2.867371729996192,2.124688963370641,3.017362961517014,2.8421990772256986,4.136272226117448,1.6125701694811667,1.484146305768137,3.6004883962472336,1.1927924879019092,3.3406856598774937,2.9709499604975456,4.352707961299192,2.0904724516041515,3.3271932121723733,2.0652985229304752,0.5287234713361266,2.5040219079234562,0.7556821558476634,2.618573240047253,1.136720551319187,0.3683681483245371,1.7903854512850348,4.2695650228437065,2.0106473789163526,3.8346909349739597,0.700570633843024,3.5762808578991367,4.945853892522393,3.8304479245124323,3.092893061109602,1.1794897273014393,2.6019257030714504,4.8569443768861635,4.916504352886423,3.9594699659092103,3.641094226822146,0.6059580732140901,2.103302064408875,4.010701809098338,3.1046051751399997,4.916925206276068,1.466297602514146,3.6592367585109153,2.256792184930574,1.132161286528427,3.5730601861280387,2.2586640853135176,4.331239825853077,2.6368904074371633,1.5402990238411385,4.030128967061332,0.1968440300740637,2.9103616425690406,1.2653715885008665,3.588248976556321,0.20060285643054954,3.2240020660744872,3.2739191806731673,3.4351059920674887,3.7777502838576793,4.9018271946853185,3.6887857825962023,2.3221550153694848,4.265678259726835,3.1039705265330433,3.801680183739211,4.627561936400648,0.48869793972246445,1.1383797537304896,2.8670173971229342,2.6389096741885067,4.46637794756608,2.427532028665574,0.18060787706924097,4.986085753158752,0.5125821643759876,0.519684573154956,0.6119288144164647,3.6081887396167236,0.9346554390868356,1.9717284010821134,1.6004001879730756,3.9114654415835295,4.927666938741792,2.08130121694723,4.316203613870561,3.0709907478026066,3.3527217252346864,2.4922842600378137,4.735144957177474,4.81711298766948,2.2138236878659976,3.5362108808845094,2.5928609603070196,0.14231699398715714,1.5760933076757022,3.372682491267731,4.094979862995769,4.728695912825954,0.9504186983241691,0.2786265190863124,1.6060778596497616,0.5553827415747359,3.500502129515274,1.9739456890385798,3.811519838159736,2.593586573436202,4.608513025121001,2.6237223077066463,4.740898749428305,0.15671744663789622,2.3199090851539026,2.008384194245144,4.333396496273705,1.2468643100708388,4.334782706300332,1.5645286010751758,0.4562185380704342,3.5441984363065915,2.709283922876243,2.330445336514738,0.09308279924878482,1.5958927098165787,0.5548243547611209,4.014011656292077,4.818819608181175,3.0018823551746223,4.1290161986207705,3.3744401928716883,0.0745651403780101,0.16542674824822634,0.0960788087282205,0.5060801774396173,4.622442828402342,3.448703417710517,3.749742163690767,4.512557206248099,3.3290486649936435,1.1325883674275905,2.4757912245025016,0.855853571401779,3.8381962122193625,4.262794725527704,4.596102268771355,1.0229052451845844,4.215518770107144,1.1810584153588366,3.3174953318865574,3.4692597554398032,3.7124611325528734,2.040567291074289,4.4682641145655335,3.9327005428564044,0.17280116652387822,3.2044231139905808,4.2744628314822695,1.1776716042260804,3.8089599486767165,3.449458637150229,2.2849101542845043,3.803445858520776,3.7524667763344013,2.2752755011957726,1.6304634895243042,4.219760533066507,4.671442308895867,1.8815437070022223,4.2289836002965755,1.911606373511393,0.4431643693385401,4.502194911492197,2.520181455488438,1.746830186848214,0.41203940099124203,1.9569515631736345,0.152005749838674,4.0668995365834615,0.133700895545793,0.3671737466130687,3.0459142291195054,3.72858527184883,1.7222187887822782,3.3276843302342893,3.074854906768606,4.307206095892408,2.29007143412989,1.110615574210444,1.5695985226217846,1.8113922198906984,4.184233467491429,1.2845906872536383,3.9377179097105133,0.2233895653148521,0.8855607119971343,1.1676843980277096,3.747654772181166,1.4575873520947358,4.739689590285757,3.2229411933187055,1.8566237798472007,3.890909023064204,1.9144378127811879,2.1813854204738936,3.987647077558767,2.733240555059926,2.33319535048068,2.041181456460184,0.9881975727501913,2.299521793950884,2.2544107731893104,4.042796566195759,3.0943131034951357,1.2726335745099526,2.725949286717274,3.8471515034983095,0.23145457013215687,0.2326370266876432,4.344076174441678,2.1176299767701003,3.27629675914198,1.588201178609614,3.285798161709291,2.117248139167549,2.249381530443265,1.4764950197919136,0.7993829057598456,4.232495134357007,3.7955967853986583,3.974899966216907,3.7825907666732994,4.367214971872277,2.349423900719141,1.7282118039845507,3.4007709241817063,1.3222424778513386,3.095796008300998,3.1504888545669707,0.09018845940207743,4.07003563885015,3.145526118092169,0.7183332721749724,0.1524791404279746,4.125729327679657,4.39732387782633,4.2245167195914535,2.4614575225170174,0.8043638590849378,2.300154084957906,0.8719617298030979,2.1056832147734927,4.800742651145448,1.632507552579926,3.3979242790980644,1.146099426854541,0.4664185131865439,4.778758578008495,1.0909899127538192,1.4573887829688592,2.4019242580191724,4.976292967680612,3.308627203388057,4.522705110943203,2.8095938678843657,2.7891358991950312,1.4935710113897038,0.32972908083957697,3.6791336255517337,4.989999967469752,2.1047205342981954,1.4140792675223768,0.474552418824542,0.9047737991927973,2.889813952993756,2.118747020044899,4.026214256831503,0.8183402970499243,2.6452688756132234,1.0690031794976174,2.5278982457855315,4.150289192200459,2.9776925879607976,0.4410066560185355,3.3075942044526627,3.2801447241078616,1.3660615099386475,1.476002631506269,2.963443646717454,0.8856976213348433,4.747974802857138,1.0754694349196514,4.3108463639730585,3.1543083309537456,0.12686318389290796,2.3289963173188144,2.868214612849597,1.7627807581960253,3.4306055801348045,4.816149770196191,0.7289770546667651,2.23857997971895,3.8185527314601595,3.9165941949908065,1.6783013085715348,1.765897767139022,3.2708216071875285,2.0161162422107126,0.9199587499247441,1.1739148445257153,4.4749021897961345,3.4829260370615547,2.0886612955316366,0.7161016066584314,4.647585836170935,0.9806586387128335,0.6845576078717941,0.8131829114445133,1.2427870714936584,2.6378242080286753,3.2568905217630597,4.257951889152938,4.976214619384885,0.9510090780357405,1.0138825589616463,0.6206075358783725,4.105618659079529,4.456840511695135,4.846091343942245,4.062792675859753,3.9772884955710053,4.074447326689294,3.833431684041045,4.761902213948578,2.8653872806255576,1.794961537685017,1.3231553082694625,3.1089538211160974,1.4418537363872552,0.8116070406963116,4.5135149110399215,4.745329669906342,3.936611532688832,1.8731698071141312,1.6699234453713119,2.0771383154505862,2.8299257987046955,1.9967649363981899,3.8918591157743734,0.2605396932190618,4.312849775562377,0.46115686896941566,3.981878818057739,0.4972112376277449,2.482719853509159,2.3659986063635596,0.28331245366876256,1.9445101088953476,2.823305703725908,0.4443393659458217,0.5300300864626706,3.497098995498653,1.4064613119750846,2.9529709486634417,1.6431858503953167,0.9036405467770348,4.572397248961866,0.06800153937820408,0.9670486935934264,4.1349621708269595,0.06595785627701467,0.9252166042195775,4.221889311054748,0.2277928494626158,3.8697623951472626,2.6191502004569056,4.627880096760798,4.876033856729945,2.244140944124189,0.12425834033656935,0.640268355002781,3.4396153271473953,3.397256807528964,4.63631492761664,0.4531422198012125,4.609382888674403,1.367732370008663,4.906091319240142,1.3365760890485912,1.781776005971637,3.922807892959954,0.7934167545629622,4.790058396386732,3.815752976255833,0.08796030749550376,2.879919489913423,2.5091132928569007,3.2763521732514955,4.091650175328972,2.6149281148549877,4.724502544371011,1.4432287445653358,1.1211794431888977,1.053144545575938,3.964538765280893,3.4780999144623803,2.188106467451223,3.773594089452368,1.1048391393302104,2.480675155214932,0.830990453847088,3.900968828883772,2.4913146970828337,0.8021649200712166,1.5649513055127995,2.699660158262771,1.864865804045216,3.344792948599263,0.1370506255860504,3.22357300726185,2.746943794877319,2.8291558917113644,0.22085320763045257,1.4177116669528922,0.806754821997161,2.2085682135036597,1.252741034538214,2.653439069273639,3.1238702518210504,2.622202356475083,1.7837361606936886,1.3492894342176376,3.4433606565026587,1.2650456070305316,0.4028198556911644,4.174546805318984,2.560016903346527,3.4461075123315545,1.12771522171618,3.8927133386637927,4.389518299826914,1.4666302408620469,2.4927805554950377,1.0198689554184426,0.8610282276111703,1.7187457231717729,3.431245850949466,4.4558220205666395,2.739862962940114,1.2558601508063771,1.2654984519477441,0.5665701535346013,1.479964669669559,1.5606233095682176,2.549403367539842,0.5979367490352172,4.298121326907561,3.9241205806687973,1.654515542521613,4.543130449201317,0.6195644175948523,0.7545197085632682,3.0983866618245814,4.0829487001920315,4.354971199723233,3.6048997138655636,2.2666497648401727,0.2283445341369783,0.6597306542187242,4.10599064227335,1.255507907165443,2.511654267176493,2.824775796913558,1.9195279106694496,3.010647616039356,4.9195322978132205,4.7305059695989,2.9949791768913068,3.8450936133350733,0.005815102775195147,2.5631600366216456,3.00653744334204,3.6057757217048114,1.5476096660964944,1.2143079014094393,4.389065208498981,2.710583791749274,1.5111925250939728,2.443617344932477,4.240044284315706,4.265320508094516,0.14415652758414277,3.020802023321151,4.237068401178337,4.294222600102604,0.1799456631282237,0.5128730692753369,4.313112389973525,3.5126726780498982,0.8182086850732051,3.6870123304231504,2.1008592593484754,0.39908513580146354,0.9540258401253521,1.7322139765989486,3.3056087045011315,0.3220170634076702,4.278603259104496,4.591275786571173,4.247468388357588,3.462638799528026,4.944785749820882,3.331429178484251,2.0797899184018176,0.46811850779050923,2.8157499937065844,0.27206599166023193,2.9884634603130236,0.3818146606702666,0.8421387362831567,0.1361694166026417,1.725286204861417,0.5072684604639222],"mu":[4.248389205648246,3.998617825109676,9.351177838069873,9.57726358240485,0.43177649379172456,7.5339336681948605,4.535392870642287,8.897980612394923,1.6697908659349414,0.7999319957720741,9.10025101711502,8.356022011106724,4.766761928535946,2.324407868987388,2.4236959138059277,4.438366619382581,8.328792612562168,6.7811121583617435,0.33037048332733576,5.2988892696036505,1.4841431393224314,7.367995909661589,7.185432339914781,8.643907520409835,9.496311974824053,2.463280181962597,1.106070477707961,5.316375792166356,4.88841448272651,1.5407539376897228,1.2915130297831867,0.4661033187428587,4.115126939611942,0.23232552423728903,8.247872041357681,6.277549795698487,5.81583566525566,5.273431585098383,7.558507345775148,6.4296904935415045,4.012018968620521,7.679112711837101,2.6363830940243083,6.284750415203931,2.428076423848613,3.4885925505604964,8.661948655044906,4.780249370381435,1.0048927907390381,5.245098296520698,2.1114130007477416,7.641648974391842,2.7595572781136535,4.879246836250912,5.503575588678348,6.541705197870775,1.1934624192507193,2.8942686152824693,7.794225604159413,4.6755640163321015,5.703714739252512,7.060354091115872,2.7193732285420746,9.44748787805377,1.5656143079857765,7.810035002973574,4.616292224993814,1.2617489215118516,9.183021348370385,8.047089503421457,9.20180147209245,5.980217835802353,0.5882483434010188,1.2650607088046617,9.381344828234921,8.343738676307346,4.6595295585696235,5.905205894210567,8.086276656269506,2.0410790933644596,2.920061135234713,8.199562521863328,4.882423379585601,7.273358141950618,8.724030094575863,8.143242947245541,2.4029803360916047,9.64571769083701,5.612801507640029,8.285719096252999,7.071702028044999,8.873620848973962,6.685668226535415,3.231234905022431,6.689684489118437,6.460277972953177,4.254221284875306,6.945749952708537,4.3875221586511515,1.5779397951057672,4.515110893364767,5.149251864339943,6.894225189170708,2.8440199288740153,3.796446903239674,9.76346053583172,2.630682389028578,4.89607228160242,6.830987248362296,6.613884146064808,2.969352408342998,9.376779281419289,9.77376904493758,8.822216617039992,9.75911770283947,1.9324964796910127,0.025743147611614337,6.3594401225784125,5.903209491681354,4.369473747154384,6.991858856528861,4.162335669218093,1.421059623467793,1.5396335258055505,9.664562948853487,7.611783095778398,2.329637344495896,4.071553041647684,8.29161298149167,1.4506110323063215,9.188969698360328,1.2621768234778141,4.147367731108962,5.379571009626217,3.0780839036161756,8.269223823067959,0.795100245101974,6.3675918336361725,8.566043781749483,0.7156579023122034,7.242556087195469,9.489598109608048,3.434626614168612,5.979051083984173,6.412230902493022,8.111094442059015,6.309991980991933,3.9543240832575544,0.023389189287617018,9.934989429921188,4.692639445738522,7.6481367182793125,4.464510375531397,4.6863179849986025,6.962557613903975,3.8789190995701217,1.0903809129777642,2.0132822272224904,4.091787319183036,9.973497045037629,9.75533297619518,8.098024616947496,1.517057477904935,6.570747751573148,3.856783942477253,8.424916145780045,1.4824053722183783,5.052811455337311,7.153394046679509,9.719766072313977,3.2819325235934804,9.856198968057438,5.145318916125213,5.42152046524275,3.5543230616027865,7.557026008372311,3.9522840257414904,3.7278535449010874,9.1342094274586,6.508310816773526,1.630906492033668,1.915252856242362,6.709458794465892,2.1390654777117524,2.9866904910990444,8.011116994787775,9.542402992096813,5.680652819020269,8.017042121757926,7.676567821136169,6.961594586940829,8.321464712923943,7.399766199977238,4.512790559469895,0.5145780121221488,4.066103036835493,2.6167482805318443,9.256605306831771,5.5999324431246915,4.768516198906982,7.476140332970031,9.320425140535713,7.810353184032099,6.344160034643029,8.524601041611284,7.849894063627547,3.0901426822019995,2.5501604994760396,7.453089895127505,5.493547415168445,5.238744408042624,4.533717031986715,0.13461853766926657,6.629833566470871,2.0092072790170157,2.0616476246012483,9.0959816420273,1.106567825972895,3.3981443896183317,1.9056026620804745,8.205584557849415,0.3197361867934445,9.418863471622089,1.4791655817150517,2.5946746109404195,8.14783302091643,0.0811888338492106,4.930578512352115,1.3843778395749462,4.287387476604416,1.4048164493417858,1.300986508198072,9.839225382098366,4.724043979185888,4.161538090379613,4.247330410176485,5.435307742345983,0.0492760135640391,2.5319430870670456,7.228271387612093,8.99836951574245,9.721540407777134,1.484420689311854,8.80630820953421,2.4516385198636614,2.991668993573493,6.167208626755998,8.884180184407064,0.6651954428755391,2.953699029414285,1.98111883219509,0.8871522180066926,6.679420606429258,4.424544153696326,6.167256637618435,0.833977558969401,8.382127856156727,6.590092463534432,0.26920071682113855,7.811691773590981,5.2077722861338955,1.4968508643553236,8.787202250947727,9.930491426966608,5.97869721306526,8.019547594077537,0.6093015662253953,3.084744456823012,5.074215032191485,7.934240763027889,8.630692125907105,3.8538276962116313,4.108452872260628,1.4923368190741515,4.782644034869907,3.569330553504342,0.04231303092210981,2.7073776502192004,0.8946774306176941,0.21915575139451304,7.693204145060304,2.6757113795555987,6.030977426400814,6.463616091291788,8.057267582465993,3.513683802405978,3.9139553167979635,9.36779011544785,9.937838145595737,6.422152826656924,9.000694420820059,9.485490010187377,0.3653482770152916,7.03895018879706,1.8826966083502739,1.645616796336753,0.3516220720689156,6.467350369324012,0.7931741016843796,5.502024173018594,2.6560366338074526,9.48581194577784,3.262679772272863,0.006485672632079442,0.5251193731130255,1.364145715212437,3.1424163299337993,1.5524878105213036,6.136408596614709,1.895402872617642,6.532346273645089,0.32957126455273045,0.36927334425814085,4.012791988915064,5.434537102243642,9.510090741444088,0.7996370397328167,2.9136133666928576,2.463348871866402,2.0950793043745874,3.768527812952027,1.6511363132285228,4.010835688443342,1.6024307589574138,6.482823351826623,1.205659294909729,8.366203243571855,4.758114619528532,3.9188695906446624,5.069395081877457,2.34101147339437,8.31884069454949,9.985522420529653,9.620913976982845,6.090542214709382,7.503332803708622,5.177109225941036,9.427396889078754,7.002148762291755,6.676420451071374,4.737695168223556,3.1292783864563067,4.567150495505839,9.907222001369282,8.553766538397074,9.33608450414926,7.48513041314919,6.78662074709994,9.755025877726753,2.291577013285795,4.279474918977353,4.133461905736753,2.813241153258008,6.27828513664274,4.446579227661331,1.8563126674284791,6.437582990084236,6.047959104958944,9.213515421374726,4.150644649253302,0.05412706076504792,1.7568626201846316,3.8468836617391466,0.67731689996124,5.792899468162043,6.685610841206726,6.940591783730596,8.987730163279629,7.121528926631897,4.51220980998113,6.986393344376336,1.9690196294261808,7.97533209699904,8.177589471500013,0.6583757551946556,3.1513783281448537,6.1793097014471865,4.160624087274146,7.9474013462589905,6.454432774960955,8.744139561556093,3.0729692952247656,9.161238953636442,8.519337495207967,9.40276559898799,4.911759506438756,8.313953339051343,6.199568800680604,2.0830245648527046,5.9769090424131495,0.36692803881693603,6.779630436159274,9.513659720977747,7.6562990099600885,6.328250054572882,0.06343233415072591,1.2399448700423754,4.027175138770636,6.385463019676816,8.021603883150041,6.209602420687674,0.6176501960917902,4.235684035077886,1.1815410784299774,1.0403177754907489,4.182229820741171,1.2866831533253253,0.08081370179929381,0.663884421255645,7.259893002305173,6.548204359854585,6.105254991492631,6.520558251414014,2.467411474094132,6.356128702836221,6.275450367258091,6.6769426054790415,8.204208106795182,7.9233366486934,2.4652532107731995,0.9483535047523239,2.239355070714162,5.886139634648762,1.2576703714972393,3.522315124502875,3.383878102985407,5.914933038767261,2.492313221586009,6.0637763426479925,1.4739282448173419,7.586331259394581,4.588583780735849,1.4001809799581455,6.379969366998493,5.437775104391984,7.973687933105058,4.695639474132863,9.480884265699135,0.9196492336172057,4.992870405981391,5.892720979102528,8.175302312799671,1.137193650699948,1.3400755822620236,1.5639876345704051,0.1766549915012816,4.97144733367358,3.3850602071082347,9.410589795959886,0.9818245895668576,4.097556463713592,7.096747186320426,5.619818807942711,8.373827965803635,3.084913338771178,8.187025530582977,8.316556791856645,5.859990892333622,7.607476803325966,7.093440951764929,5.996747905261639,4.637184743302695,6.702960252344646,8.504428690503145,7.892660338136905,4.516405095344447,1.0331699484589985,5.39691411539883,8.779678694792509,5.224643788153356,8.188742118241894,4.904458688875771,5.594489898466202,1.4003719009490334,7.2211761059899064,4.055313110623366,4.527518375137262,1.6716287591210532,3.0532326337654236,6.031131902304234,8.180444096376814,6.187541342433658,0.14585056802546736,6.736479285461656,1.284768981616542,9.271096545040052,7.303240707697833,1.7145784167646583,0.6183221917879811,9.488052721008666,4.212023166983439,2.621780949839776,8.864452563128955,2.826155828991612,5.138933622531048,2.636421123789996,1.9797390616140276,8.452430067480439,5.706060163271536,0.33037343251758555,0.14604214398774573,9.269636938737815,9.787298146952644,5.855054432396935,7.8877897156847325,1.096347785237377,3.480929124236629,1.8004926883252592,2.5609630846839337,6.053283511708041,3.7861542964459938,7.0202780962305695,7.016536666486422,2.6814895697271712,3.5482632487578436,4.415921421737878,7.20668077101454,8.13310188527442,7.446114987344541,4.716891376756034,3.1351146500604687,4.527907219127241,9.624834801245633,0.9192629069590996,8.100260550765876,2.9430863015923037,3.4928062184399766,1.7695989227562947,9.213707458302093,0.1343302488326792,6.704089252234748,8.299525952144899,8.670378431994584,2.6254602108763803,3.5625249001844717,8.780609825281827,6.644440861615286,2.5065050724092774,8.263349497368628,3.572397556318063,6.6827755000055085,3.5829705279077295,2.707628983711272,7.878034898578314,3.8760080511537254,5.8871042886200575,7.316818804813902,4.470547119133057,9.594151066155842,3.906779347094087,7.964431308411299,4.0548587652710255,4.327941577775947,6.870570830189213,6.000405957017794,2.141806747071191,8.951279063338543,7.717716937399512,7.177149252914297,2.4257090919097535,8.76119846328018,4.953100632087493,7.1370001608320965,5.488796469340107,3.5118092939363343,7.466604184366716,1.8076111897998537,1.4787929547316025,2.4840751748706302,7.795057346344613,7.509510910273431,6.644879630783029,2.2744702306407105,8.149826146524696,8.661841310369214,7.675726079573089,0.3410719302015286,1.9171856280340904,3.362390898355474,6.8568191661996,5.561204097230843,6.758798592303807,2.201429840026805,8.10156383452023,4.236081523842374,3.745457403569621,9.5728230252175,1.703120069713684,5.8119076080898635,0.4601633524516746,9.14395169636898,6.910096341264262,3.9889262882830745,4.783288935808381,0.4471874284491184,2.0117496702858784,4.625595454731261,3.8293443454306386,9.451984557535278,5.880257039111685,3.088058956487141,7.207125958510268,1.3257486856296552,0.03404305047320255,4.080728814575432,1.879407723730715,4.189030387624088,6.620073289936331,4.939869505691408,0.6633050243191518,0.6475499528413575,2.2640395686788595,6.797691847007867,7.366849912656662,4.312446153469587,9.940916599953473,0.29423118096021383,9.447954581882543,3.0736556280209926,5.531663273624083,4.26837014353805,1.691610622925619,1.965190392942091,3.1026139489938487,5.0843496836247475,0.8652777056743854,7.888554535792231,0.8288754543778953,6.430264187298946,0.2736828249165302,9.62667622157737,9.082133462986487,9.034895859267948,6.093389399008915,4.615560815199862,9.697653610839964,7.421215199983278,4.601540127297272,3.782761665763683,3.4056452433274087,5.682613337892837,9.323181832107766,6.737708814342875,1.4772399067669828,4.627549058203108,1.1916854509164931,1.6879363456571927,5.5964908290048605,4.378685073564097,9.34180175163247,5.948312921929368,3.312811903850945,4.708111847833605,6.113930503119835,5.997529325947728,2.452255997892332,2.793307139956136,5.659921629519524,6.404187920188527,3.1772586626136956,3.922399011503006,6.954560894310992,2.2072725321786812,7.349137922113627,6.446316128939924,7.867227587854188,2.2974678210975408,4.0733436902590325,1.3434714711444173,1.2075709578264648,5.737259883403074,0.4474234600035265,3.252079029095458,1.7685151037462932,8.709558127451245,6.9985531834831765,7.504256825860304,5.814445560523209,6.243135671528646,2.2633917484876265,3.1888301377975936,2.794750746744048,2.6396714670827426,2.1982058161879836,6.334612544174667,8.596217832257212,8.287577461504972,3.4556292836165703,0.2977077410816453,9.265430937007096,1.189315994072957,6.352541399026219,2.599462882132373,7.737400713614477,5.340788616257837,1.042174184142688,8.841950126193414,1.9696839849038006,1.4084089728780547,1.5732391765898956,1.0985377556637044,6.808438275962239,0.6332601363254331,1.699801138995165,1.0631271892095406,2.975402322143166,6.653440927872774,9.71821132755461,5.120658934909401,8.369376673457973,1.611048052700026,1.4172236661859738,1.7493422481846044,8.099909508584686,4.78781984597088,4.879615564809551,5.851653943727779,7.340891420706437,3.791044611331442,9.601900380503858,9.094927781411963,5.064866906320182,2.7941307407404437,4.108580829026689,3.077892980471595,3.147507505477125,3.3015681980274403,0.3445784192806145,2.506283001967309,1.0379106741113575,4.384938917007433,8.84964056045862,2.3334203527582553,4.3725191490412545,6.074603526512594,3.0100900536704644,7.087772453826302,2.576411999701762,6.564685158205055,3.7541755688436806,0.5504068544652174,8.372232110143468,2.562992663131416,0.2377743129696297,4.863905694356507,3.4031661756946696,1.5763672416762775,0.5436179715245526,3.4069445780990493,0.44223311932718445,9.045130749020506,5.736752702656068,3.399854426431468,3.7718652749109682,6.316310259774076,5.281459311866852,4.004886915171218,2.7626931749856665,8.881756507528554,3.967374306754683,1.6415778466684605,4.489985516099715,5.213272057974912,2.6176464906655084,6.020075456153016,0.5065837889926206,7.661610756439123,3.0530367557141047,2.533882381327317,5.52110586061697,8.787284290475391,5.644065355810552,7.628784357839615,2.0670007202112095,8.90111719085954,3.14466200967384,9.49412938137603,7.101298081248483,0.2032603154051249,9.89740410598667,2.671855297425867,9.88075966516309,8.725482303730445,3.6291624972449132,9.351120488810608,8.905825876967485,0.007341904819042622,3.9439699237736447,5.069825960823231,3.9917551136825513,4.540811683705838,5.23672641842637,2.8958478183016,5.425734319773062,6.363020472878045,3.4693605156431206,0.13111611531623657,1.6609309929104876,9.611553975515726,0.09882957919968183,4.406582711044164,2.89473829364163,0.9360703180645591,1.0769463611759833,3.4830911220146477,1.9114918346744303,9.905215249488066,0.09642578527735202,0.377510641312635,5.7277672110541005,4.548533025673292,0.6449425392378316,3.027269723803012,9.723047037958342,8.537021956855938,0.6978440633963046,9.565942810065858,3.658865258657402,1.129255866905301,1.6591571781429604,4.661984133781476,5.136696206836422,0.2937052095873982,3.8809595472034353,1.3717847856179688,1.2602710485639212,7.862194832830703,2.8724834359382356,0.9930589690450242,8.626346335387085,2.168883948727396,8.638938901810826,2.8302315112021503,3.2940794704451903,9.84294371030137,7.844932184455029,7.66058315819754,9.003339211891033,7.676088380171695,1.2240848723815123,0.6358301284492307,8.520466085721683,0.611167997955353,2.882976508495503,7.143114818678214,1.349304586322928,4.9134612389723165,8.55370773199069,0.4487615329392769,5.047658909999997,1.843401640507638,5.131793279302657,4.929697029331866,6.228208081505073,9.385142183099306,5.622087172307857,5.209271325829414,0.2418786097222947,3.6675690100927505,2.5185033925151434,8.619635105996784,3.88865904860608,5.442327833755005,0.3081039783096684,6.623015708776134,5.309513733249083,6.52565914067567,0.14469721977341532,2.26495866380777,6.741413332840218,9.876156194331557,3.487891650522039,0.9982198622544192,2.2984952178647,9.9674328640162,8.60148683044677,9.963749675233808,6.585485524840291,0.2543736276522024,3.944523962217066,1.3585188763104283,2.162037420278209,4.417402669503638,7.13041032586492,4.578333670566979,7.234831855939152,5.521371101983936,2.6339902408458427,7.793869415037047,9.798691753164787,6.039626628386403,8.740904161957967,5.750376468565593,3.6187997025443885,5.784189585206176,2.571799535138317,8.40916216451404,8.199391012555244,3.3310179947841356,9.30070980939069,7.961595998461153,1.2692344937661515,0.9896574863303376,4.595478584325521,6.332100955987949,6.312566994312143,8.273760194134343,7.894702835922454,4.901039304046392,6.344030025296332,5.002796632410538,2.867296728755133,8.087486008794016,3.693381095237973,6.693915348618555,6.781544047274551,3.7130303280497845,4.8771695999183144,5.734907975682284,5.219109923999403,8.795597201352257,4.02995406019965,4.572930174048835,2.696493259957744,4.2065557394678255,9.138959095937167,1.7239358043104547,3.622809046188562,1.7173174109752454,7.571783550761266,5.099091364284316,7.917803918946649,1.7403488389124755,9.205810438364558,7.2065105539394425,4.622316037875334,3.1399195474073727,4.286070482976534,4.057576945583953,0.33015370880713046,6.695910081831209,7.872711105489298,9.289070553249699,3.020819948235738,2.3461262194945465,1.4558916513939213,9.081510366064911,6.992945939304316,2.0587141671104225,3.6907186888518217,0.812180151604085,2.2446273647444492,7.664641592802351,8.8308011345629,7.547928416597356,3.41654120400676,5.0417964428390105,7.592329399253302,3.048468825658126,7.104882914488395,2.6543259940711095,1.102985559530829,6.185822862928932,4.639276995054393,5.760293662306468,7.438364186491732,0.08095352808930922,6.81405403615337,3.833252541546235,5.54893712727047,9.158679027357671,4.643958168839843,9.752812499881431,0.5803554157427127,8.51698732457044,0.025132253324589016,5.077170289488593,0.774134687518766,6.501959271160889,5.705093317658934,8.737034612389374,8.674889723367674,5.2652620077491985,1.413752482479913,3.9510588087948206,1.8651229788202617,1.3829851897214551,3.8930313807386563,0.6483857493475287,6.3708322098207,5.198952124099982,1.3531648748889924,4.678173375622398,7.62896542353462,7.512148988119844,6.258105748356197,1.3228202338501327,6.2036479880846995,0.8729672969392088,8.204941817257508]}

},{}],112:[function(require,module,exports){
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

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `-Infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, -1.0 );

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

tape( 'if `s` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 2.0, 0.0 );

	y = logpdf( 2.0 );
	t.equal( y, PINF, 'returns +Infinity for x equal to mu' );

	y = logpdf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var tol;
	var mu;
	var s;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], s[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var s;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], s[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var tol;
	var mu;
	var s;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], s[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/logpdf/test/test.factory.js")
},{"./../lib/factory.js":106,"./fixtures/julia/large_variance.json":109,"./fixtures/julia/negative_mean.json":110,"./fixtures/julia/positive_mean.json":111,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":267}],113:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/logpdf/test/test.js")
},{"./../lib":107,"tape":267}],114:[function(require,module,exports){
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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `s`, the function returns `-infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `s`, the function returns `-infinity`', function test( t ) {
	var y = logpdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0 );
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

tape( 'if provided `s` equal to `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to mu' );

	y = logpdf( 1.0, 2.0, 0.0 );
	t.equal( y, NINF, 'returns -infinity ' );

	y = logpdf( PINF, 2.0, 0.0 );
	t.equal( y, NINF, 'returns -infinity ' );

	y = logpdf( NINF, 2.0, 0.0 );
	t.equal( y, NINF, 'returns -infinity ' );

	y = logpdf( NaN, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
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
		y = logpdf( x[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large variance ( = large `s` )', function test( t ) {
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
		y = logpdf( x[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/logpdf/test/test.logpdf.js")
},{"./../lib":107,"./fixtures/julia/large_variance.json":109,"./fixtures/julia/negative_mean.json":110,"./fixtures/julia/positive_mean.json":111,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":267}],115:[function(require,module,exports){
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

},{"./is_number.js":118}],116:[function(require,module,exports){
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

},{"./is_number.js":118,"./zero_pad.js":122}],117:[function(require,module,exports){
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

},{"./main.js":120}],118:[function(require,module,exports){
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

},{"./format_double.js":115,"./format_integer.js":116,"./is_string.js":119,"./space_pad.js":121,"./zero_pad.js":122}],121:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{"./main.js":124}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{"./main.js":127}],126:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"dup":119}],127:[function(require,module,exports){
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

},{"./is_string.js":126,"@stdlib/string/base/format-interpolate":117,"@stdlib/string/base/format-tokenize":123}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":129}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":131}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":133}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":137}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"./define_property.js":135}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":134,"./has_define_property_support.js":136,"./polyfill.js":138}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":125}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":140,"./polyfill.js":141,"@stdlib/assert/has-tostringtag-support":20}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":142}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":142,"./tostringtag.js":143,"@stdlib/assert/has-own-property":16}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":128}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){

},{}],146:[function(require,module,exports){
arguments[4][145][0].apply(exports,arguments)
},{"dup":145}],147:[function(require,module,exports){
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
},{"base64-js":144,"buffer":147,"ieee754":250}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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
},{"_process":257}],150:[function(require,module,exports){
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

},{"events":148,"inherits":251,"readable-stream/lib/_stream_duplex.js":152,"readable-stream/lib/_stream_passthrough.js":153,"readable-stream/lib/_stream_readable.js":154,"readable-stream/lib/_stream_transform.js":155,"readable-stream/lib/_stream_writable.js":156,"readable-stream/lib/internal/streams/end-of-stream.js":160,"readable-stream/lib/internal/streams/pipeline.js":162}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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
},{"./_stream_readable":154,"./_stream_writable":156,"_process":257,"inherits":251}],153:[function(require,module,exports){
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
},{"./_stream_transform":155,"inherits":251}],154:[function(require,module,exports){
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
},{"../errors":151,"./_stream_duplex":152,"./internal/streams/async_iterator":157,"./internal/streams/buffer_list":158,"./internal/streams/destroy":159,"./internal/streams/from":161,"./internal/streams/state":163,"./internal/streams/stream":164,"_process":257,"buffer":147,"events":148,"inherits":251,"string_decoder/":266,"util":145}],155:[function(require,module,exports){
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
},{"../errors":151,"./_stream_duplex":152,"inherits":251}],156:[function(require,module,exports){
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
},{"../errors":151,"./_stream_duplex":152,"./internal/streams/destroy":159,"./internal/streams/state":163,"./internal/streams/stream":164,"_process":257,"buffer":147,"inherits":251,"util-deprecate":275}],157:[function(require,module,exports){
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
},{"./end-of-stream":160,"_process":257}],158:[function(require,module,exports){
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
},{"buffer":147,"util":145}],159:[function(require,module,exports){
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
},{"_process":257}],160:[function(require,module,exports){
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
},{"../../../errors":151}],161:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],162:[function(require,module,exports){
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
},{"../../../errors":151,"./end-of-stream":160}],163:[function(require,module,exports){
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
},{"../../../errors":151}],164:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":148}],165:[function(require,module,exports){
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

},{"./":166,"get-intrinsic":241}],166:[function(require,module,exports){
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

},{"es-define-property":226,"es-errors/type":232,"function-bind":240,"get-intrinsic":241,"set-function-length":261}],167:[function(require,module,exports){
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

},{"./lib/is_arguments.js":168,"./lib/keys.js":169}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],170:[function(require,module,exports){
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

},{"es-define-property":226,"es-errors/syntax":231,"es-errors/type":232,"gopd":242}],171:[function(require,module,exports){
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

},{"define-data-property":170,"has-property-descriptors":243,"object-keys":255}],172:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],173:[function(require,module,exports){
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

},{"./ToNumber":204,"./ToPrimitive":206,"./Type":211}],174:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/isNaN":220,"../helpers/isPrefixOf":221,"./ToNumber":204,"./ToPrimitive":206,"es-errors/type":232,"get-intrinsic":241}],175:[function(require,module,exports){
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

},{"call-bind/callBound":165,"es-errors/type":232}],176:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":234}],177:[function(require,module,exports){
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

},{"./DayWithinYear":180,"./InLeapYear":184,"./MonthFromTime":194,"es-errors/eval":227}],178:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":225,"./floor":215}],179:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":215}],180:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":178,"./DayFromYear":179,"./YearFromTime":213}],181:[function(require,module,exports){
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

},{"./modulo":216}],182:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":223,"./IsAccessorDescriptor":185,"./IsDataDescriptor":187,"es-errors/type":232}],183:[function(require,module,exports){
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

},{"../helpers/timeConstants":225,"./floor":215,"./modulo":216}],184:[function(require,module,exports){
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

},{"./DaysInYear":181,"./YearFromTime":213,"es-errors/eval":227}],185:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":223,"es-errors/type":232,"hasown":249}],186:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":252}],187:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":223,"es-errors/type":232,"hasown":249}],188:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":185,"./IsDataDescriptor":187,"./IsPropertyDescriptor":189,"es-errors/type":232}],189:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":223}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/timeConstants":225}],191:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"./DateFromTime":177,"./Day":178,"./MonthFromTime":194,"./ToInteger":203,"./YearFromTime":213,"./floor":215,"./modulo":216,"get-intrinsic":241}],192:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/timeConstants":225,"./ToInteger":203}],193:[function(require,module,exports){
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

},{"../helpers/timeConstants":225,"./floor":215,"./modulo":216}],194:[function(require,module,exports){
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

},{"./DayWithinYear":180,"./InLeapYear":184}],195:[function(require,module,exports){
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

},{"../helpers/isNaN":220}],196:[function(require,module,exports){
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

},{"../helpers/timeConstants":225,"./floor":215,"./modulo":216}],197:[function(require,module,exports){
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

},{"./Type":211}],198:[function(require,module,exports){
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


},{"../helpers/isFinite":219,"./ToNumber":204,"./abs":214,"get-intrinsic":241}],199:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":225,"./DayFromYear":179}],200:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":225,"./modulo":216}],201:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],202:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":204}],203:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/isNaN":220,"../helpers/sign":224,"./ToNumber":204,"./abs":214,"./floor":215}],204:[function(require,module,exports){
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

},{"./ToPrimitive":206,"call-bind/callBound":165,"safe-regex-test":260}],205:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":235}],206:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":237}],207:[function(require,module,exports){
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

},{"./IsCallable":186,"./ToBoolean":201,"./Type":211,"es-errors/type":232,"hasown":249}],208:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":241}],209:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/isNaN":220,"../helpers/sign":224,"./ToNumber":204,"./abs":214,"./floor":215,"./modulo":216}],210:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":204}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":178,"./modulo":216}],213:[function(require,module,exports){
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

},{"call-bind/callBound":165,"get-intrinsic":241}],214:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":241}],215:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],216:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":222}],217:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":225,"./modulo":216}],218:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":173,"./5/AbstractRelationalComparison":174,"./5/Canonicalize":175,"./5/CheckObjectCoercible":176,"./5/DateFromTime":177,"./5/Day":178,"./5/DayFromYear":179,"./5/DayWithinYear":180,"./5/DaysInYear":181,"./5/FromPropertyDescriptor":182,"./5/HourFromTime":183,"./5/InLeapYear":184,"./5/IsAccessorDescriptor":185,"./5/IsCallable":186,"./5/IsDataDescriptor":187,"./5/IsGenericDescriptor":188,"./5/IsPropertyDescriptor":189,"./5/MakeDate":190,"./5/MakeDay":191,"./5/MakeTime":192,"./5/MinFromTime":193,"./5/MonthFromTime":194,"./5/SameValue":195,"./5/SecFromTime":196,"./5/StrictEqualityComparison":197,"./5/TimeClip":198,"./5/TimeFromYear":199,"./5/TimeWithinDay":200,"./5/ToBoolean":201,"./5/ToInt32":202,"./5/ToInteger":203,"./5/ToNumber":204,"./5/ToObject":205,"./5/ToPrimitive":206,"./5/ToPropertyDescriptor":207,"./5/ToString":208,"./5/ToUint16":209,"./5/ToUint32":210,"./5/Type":211,"./5/WeekDay":212,"./5/YearFromTime":213,"./5/abs":214,"./5/floor":215,"./5/modulo":216,"./5/msFromTime":217}],219:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":220}],220:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],221:[function(require,module,exports){
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

},{"call-bind/callBound":165}],222:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],223:[function(require,module,exports){
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

},{"es-errors/type":232,"hasown":249}],224:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
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

},{"get-intrinsic":241}],227:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],228:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],229:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],230:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],231:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],232:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],233:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],234:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":232}],235:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":236,"./RequireObjectCoercible":234}],236:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],237:[function(require,module,exports){
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

},{"./helpers/isPrimitive":238,"is-callable":252}],238:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":239}],241:[function(require,module,exports){
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

},{"es-errors":228,"es-errors/eval":227,"es-errors/range":229,"es-errors/ref":230,"es-errors/syntax":231,"es-errors/type":232,"es-errors/uri":233,"function-bind":240,"has-proto":244,"has-symbols":245,"hasown":249}],242:[function(require,module,exports){
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

},{"get-intrinsic":241}],243:[function(require,module,exports){
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

},{"es-define-property":226}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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

},{"./shams":246}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":246}],248:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":240}],249:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":240}],250:[function(require,module,exports){
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

},{}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{}],253:[function(require,module,exports){
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

},{"call-bind/callBound":165,"has-tostringtag/shams":247}],254:[function(require,module,exports){
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

},{"./isArguments":256}],255:[function(require,module,exports){
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

},{"./implementation":254,"./isArguments":256}],256:[function(require,module,exports){
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

},{}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){
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
},{"_process":257,"through":273,"timers":274}],259:[function(require,module,exports){
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

},{"buffer":147}],260:[function(require,module,exports){
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

},{"call-bind/callBound":165,"es-errors/type":232,"is-regex":253}],261:[function(require,module,exports){
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

},{"define-data-property":170,"es-errors/type":232,"get-intrinsic":241,"gopd":242,"has-property-descriptors":243}],262:[function(require,module,exports){
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

},{"es-abstract/es5":218,"function-bind":240}],263:[function(require,module,exports){
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

},{"./implementation":262,"./polyfill":264,"./shim":265,"define-properties":171,"function-bind":240}],264:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":262}],265:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":264,"define-properties":171}],266:[function(require,module,exports){
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
},{"safe-buffer":259}],267:[function(require,module,exports){
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
},{"./lib/default_stream":268,"./lib/results":270,"./lib/test":271,"_process":257,"defined":172,"through":273,"timers":274}],268:[function(require,module,exports){
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
},{"_process":257,"fs":146,"through":273}],269:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":257,"timers":274}],270:[function(require,module,exports){
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
},{"_process":257,"events":148,"function-bind":240,"has":248,"inherits":251,"object-inspect":272,"resumer":258,"through":273,"timers":274}],271:[function(require,module,exports){
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
},{"./next_tick":269,"deep-equal":167,"defined":172,"events":148,"has":248,"inherits":251,"path":149,"string.prototype.trim":263}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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
},{"_process":257,"stream":150}],274:[function(require,module,exports){
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
},{"process/browser.js":257,"timers":274}],275:[function(require,module,exports){
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
},{}]},{},[112,113,114]);
