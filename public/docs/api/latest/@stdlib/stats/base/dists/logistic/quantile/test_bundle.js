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

},{"@stdlib/utils/native-class":101}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":101}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":101}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":101}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns a function for evaluating the quantile function of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the quantile function
*
* @example
* var quantile = factory( 5.0 );
*
* var y = quantile( 0.3 );
* // returns 5.0
*
* y = quantile( 0.1 );
* // returns 5.0
*
* y = quantile( 1.1 );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function of a degenerate distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.5 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return mu;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/utils/constant-function":92}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution quantile function.
*
* @module @stdlib/stats/base/dists/degenerate/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/degenerate/quantile' );
*
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
*
* var quantile = factory( 10.0 );
*
* var y = quantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":65,"./main.js":67,"@stdlib/utils/define-nonenumerable-read-only-property":94}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the quantile function for a degenerate distribution centered at `mu`.
*
* @param {Probability} p - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var y = quantile( 0.9, 4.0 );
* // returns 4.0
*
* @example
* var y = quantile( 1.1, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN );
* // returns NaN
*/
function quantile( p, mu ) {
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return mu;
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":49}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a logistic distribution.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0, 2.0 );
* var y = quantile( 0.5 );
* // returns 10.0
*
* y = quantile( 0.8 );
* // returns ~12.773
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a logistic distribution.
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
		return mu + (s * ln( p / ( 1.0 - p ) ));
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":53,"@stdlib/stats/base/dists/degenerate/quantile":66,"@stdlib/utils/constant-function":92}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Logistic distribution quantile function.
*
* @module @stdlib/stats/base/dists/logistic/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/logistic/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~1.386
*
* var myQuantile = quantile.factory( 10.0, 2.0 );
* y = myQuantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":68,"./main.js":70,"@stdlib/utils/define-nonenumerable-read-only-property":94}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the quantile function for a logistic distribution with location parameter `mu` and scale parameter `s` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~1.386
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
function quantile( p, mu, s ) {
	if (
		isnan( mu ) ||
		isnan( s ) ||
		isnan( p ) ||
		s < 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	if ( s === 0.0 ) {
		return mu;
	}
	return mu + ( s * ln( p / ( 1.0-p ) ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":53}],71:[function(require,module,exports){
module.exports={"expected":[-3.1022937335773406,12.826176121827888,-2.211475273290813,-4.482625080233461,-72.7385524496412,-0.9335931325743079,-23.450164011982064,-9.189691255729757,-3.593235031815726,-40.07827835153435,-2.321985718011235,1.525746225128155,0.5350155827410626,-69.04621724874093,10.665571408986398,1.792947845818644,2.851115099678898,0.7473957702533625,-17.02545800891736,1.4167131466607314,-1.843892486554999,33.094352387468945,-11.92109525534783,0.8841654607922604,14.641437976236432,-8.661758902669558,-2.5091844635445204,13.815841576926415,-15.326924440125612,-5.354553618963161,-1.2047549252313747,-0.6219116212713927,-1.0077887125684701,-12.470612823861492,20.762161922194718,-39.83262682396949,-10.467036768752846,4.72574600247718,-0.3905298982454759,11.590444362560968,1.6870173175138619,-37.124688827834724,-43.80240783636519,-6.116522533209457,1.3970012435848422,101.40542084435332,0.23094757315504205,-2.802896260466035,-36.99325173074925,-6.320696578037358,-4.721220298117565,-8.937934913734676,20.7119962251433,1.6119053855016712,-13.87677039350657,7.670547881470281,8.405863725711521,-25.418165171175943,-8.098180948167736,29.785826755417634,5.115626478780394,18.077717263033446,-23.93819668441867,7.5576714062461505,28.82456751492231,16.780942158457314,11.860674678392453,-0.11140204527227526,14.613715696486485,-22.863887844097608,-42.667033248617386,18.14654237021436,20.052039854958135,-19.047517007864208,23.929472775171416,6.366489441486886,23.60395983159922,24.4468639236346,7.1489561757309,9.282461384505236,7.504799383429952,-2.532891682548197,5.528499213582727,-12.319302279020496,17.42312720388779,-36.115900818422105,2.690987199730152,-10.898177157781404,-59.499533497682336,2.586506419321694,12.321403248520477,18.997929725935453,65.44486086413445,-60.24769512385279,-70.58432761652564,-5.2955865614708735,5.50181200217292,-70.96053745346413,5.849493360004097,21.937467579677904,43.21711501053977,-29.74049959613881,-17.84357846410565,-33.77416546983386,32.160063775200435,1.4408206270577377,58.22827897750779,-13.732755441948369,26.05110839710503,-5.549214281394562,-0.1373293258237847,3.6079902490809697,18.348113479757984,-38.15657805214887,-10.876216681195663,58.57678166844575,-29.071737120236214,1.5771246048469985,-22.622148158354435,-5.43764739718714,2.840104863622503,-5.645700418118098,-33.570886988223485,-15.24134103018166,-1.3146670574672021,28.223956310881402,-1.3943180785573899,6.928830776325416,7.132903447541754,-8.712496657900935,-9.388034516920788,-4.600693657510774,-8.911098598686323,4.039240235636974,3.4906767435514183,-1.3450640984172288,1.3185704281747574,-0.023712614808946375,24.283410980477502,4.449024530280383,43.88042120657976,36.43843565338486,-3.015712812677214,-1.7035421047929158,-2.267998798649238,24.812497990451288,20.134410335671312,0.00235807578395833,1.1951240735062525,-3.400965968318017,-2.6346082258116947,8.160691812312335,79.75361183706016,40.114611642999144,1.449632596366864,19.963427394421267,2.729160391712524,-2.6522202459665287,-0.0808145685325527,-5.097167644865509,32.10284563098621,-26.394598299398826,-29.903986233220326,-3.6564233357007403,4.041164572825501,-11.2181971943261,-1.050386388251366,-9.104368297029296,-29.208527496644987,-24.974880762285057,1.6180466851017279,22.98504762917176,6.151285827559782,-9.591759400617667,1.7332835237036897,40.2257184996889,1.2043285331166458,-25.374235727518446,3.0883188314387793,-12.594533827360902,-36.742184459544795,-6.6030432556909595,-22.12053349308337,0.7854890377543466,-32.59124199968827,2.047818657073676,-12.614833994795266,-0.2565379129521148,56.97604586399467,-17.26280854785879,20.121735409110375,5.780499559868597,-1.8585846633605403,-4.567139420311074,5.461231815054432,-12.115298683345987,0.07476126085297954,19.99206601268543,-5.523010978621903,-0.5133204373193678,-4.5502935053470335,-10.806414429684047,31.177007370962247,38.82940809649192,-63.84033496898225,8.60514166476864,21.29377377261186,-11.207300614395507,-3.0352938372507903,16.0385784281127,-8.665934921495914,0.26753741457818436,-15.858881538122615,53.021107338196856,2.306665091580873,27.05802739807228,-22.53761654911441,-15.368259777705626,5.766912766846311,-17.14978976177457,0.9829436234077902,-2.9942377037769052,38.08661316926308,-27.09180234682014,-11.858807097085704,2.22698828663627,7.539010695255505,-0.18323639524396151,-60.822478690647955,-38.8667178280438,9.554990824466255,-8.89832154168852,-5.671633842114737,-14.60577678803799,2.436688111186846,-38.57525148801953,-40.26075470227284,-11.825887350506946,-15.990335967324196,45.25456423436615,-11.48700995237894,-19.52743736995544,10.340952012059153,-2.5590003543425723,1.252567052269532,-2.0031637958901047,-68.46264434108411,11.896756187229695,-51.16594768553843,4.18143559061838,4.678959562417873,1.819823650990347,14.34167341296374,11.874045873405485,20.392768314185574,3.307796857257011,-19.65053320304059,43.543566724624135,14.632254577119557,-19.66132326063168,8.66698423985092,3.0223378367426914,-26.1572532495819,27.32707076525126,-8.572128044982769,-13.449917720630216,23.84315541895916,1.0120381691590652,24.43220587345754,19.00546655019438,14.878529379262242,13.572315862174863,29.961234674166587,18.912179666277112,-22.145839232030372,-4.201517585085484,16.081136018396663,-38.26365179567755,-3.9331545190038746,1.693695843892232,13.252122598166654,2.593534091807392,-0.041592515896063664,20.813224734625344,1.960946039803426,3.0478478549694303,-7.231408258818267,-0.5119393764744278,15.133742613781802,37.93705963810742,4.5600234167222915,-10.61090140643812,-0.2998292595262013,14.306921156544286,-1.140777167112149,22.82694123570504,-25.230613242924292,60.972788464774915,4.547580617112855,14.376319579101978,25.224217173818456,4.663612117911617,-11.129828131285082,10.474600950870348,2.5191624690465626,-47.50332172702119,0.7491284822172894,12.041076414239413,52.30201352655849,27.8640144464067,1.167996382900529,-45.836842029157765,12.018905882068648,-45.82441722543773,5.416592609087501,-75.72336259585614,1.4079983657664341,1.9001962914018626,2.7239092004647834,-3.8700670133949258,0.8657662947913493,-3.914918409175743,-9.28525307467859,-1.7023588002103172,-6.588192878772183,-0.2899978486087548,-37.24783972193389,-46.72467584483491,-28.652194558300327,-28.27803123098173,-67.85647837782199,-106.89395039591263,20.245597735951215,-7.316192814077375,12.38529415594556,2.74645908184394,0.050397725646895375,31.57897948906249,20.970290217527317,9.871762482069641,40.280567736025596,18.70019063490431,0.0699231891166896,4.103671363977154,12.346526031913791,-14.270443396936507,38.21722208973869,-35.84794833123778,26.3823151225493,1.8002571666901426,4.54447052184,1.898934687987393,12.225014533795887,34.0222862959123,2.623923329199416,-7.965694997933635,2.4746801164650645,64.12441126354844,-20.94037489290666,-19.974508525252492,3.806383141247225,-11.289693824991076,-1.9315160464894912,-15.098621341568823,-4.660668999320411,-4.44080939252568,10.302574238867955,-11.758058684596715,-7.471455669484127,-3.3687117076981834,15.342809431669759,51.06548302219331,22.310295781688897,1.6460286868640355,2.253266128574832,15.109776216023914,-5.0712781050730475,-45.36305702470843,-11.895882575712442,-11.080500156217658,-49.877011257058705,-23.011804836212786,-13.532099741113141,6.990874532090403,2.0066647661720927,-3.0178060302504592,16.996475655379133,-21.350913033051974,-5.627640670525878,-11.181264465066,16.845791136952904,-20.647899492424102,21.689630966498232,-7.638218104171111,0.5096663381957476,-45.97741966653381,-0.5814209430596933,28.949594299969515,4.942265453080359,0.6248561872692561,1.0783704228464641,17.614844957176096,29.170499990598163,-1.8978014634362055,-8.754812052454726,7.518934763309761,-13.508779396254505,17.379583311080733,-12.325403676894839,-1.53807255485572,5.181015277806626,6.079993330411258,2.831836493999724,-33.589886728214644,-1.380763970144956,18.708927531377494,9.461414036577077,9.13226907996784,-0.19754347875316003,-21.632383210196284,8.659401646610362,-10.322363831597034,20.74678777906285,-1.2595530540112825,-34.44486279208528,-4.131199315983428,-1.2786343448365638,1.9438909323704838,-3.401595327421731,16.533773886811233,-1.2259333868856848,-7.402643051354785,11.93851817188783,23.40917783837193,-44.48917534675416,-1.6145282118186066,-17.056465367666128,0.43866700683244914,-48.04443532991585,7.6652591341889265,-6.080848918734168,0.543160808709872,-1.4511403429654495,-29.607242396479396,1.805557029981467,6.363784578405497,2.0846853763214295,11.126371528057742,26.17593746058694,13.157799547275866,41.517825810110374,14.904984564396871,-24.27142070697866,19.038618175751154,-4.099182361125722,-11.156719186882222,-34.805369666505115,0.4997131409870599,22.94965216021689,13.52648843497538,-3.428346653820075,-12.042594736133292,-4.92159447128076,-29.237255662725367,-35.2817035221166,-2.2069529529375953,7.382468068055357,69.84199365779989,-0.28086862378668564,3.019921760097435,-11.178464764688695,-22.15548947920395,-6.3166953965900685,6.15906746142731,-5.733720298728988,15.219700835560914,7.119964174868215,-0.4493780497867659,21.37857506946885,-9.672936456171128,0.991177691101346,-11.837356419289794,-25.650812509078264,-0.46157104778694125,-5.04830976849081,-9.58867734678493,14.029323142514205,0.7861577852387895,23.326981988094975,18.085514333569847,-33.67977323575866,25.767370366908207,-43.10514551582359,14.385667928488,-1.6160677052843113,-18.36381453482974,-18.6532448323983,-7.838233791725951,40.08889691128456,16.850943219608094,-2.365363386676542,64.04600516303634,13.452093475019245,0.06658350582982242,1.840828774100138,-2.2840489398550936,0.8105346486938991,-14.737839826873056,-0.9971536801923349,-21.19884534186069,8.44906614256939,3.4517269725268065,0.6827353042546149,7.657273422346986,3.4552836795195483,-2.468281539464541,-17.585257205513436,19.53212075489191,1.4423502259126622,3.5314335915609805,0.7095068864540603,4.671463169479061,15.38631211287332,35.58781670787308,37.25340154435047,-18.92913944495216,-7.419865736920331,-4.4100355671641935,-13.41028664992311,-5.080423388541194,-7.03969944399028,-21.350370558922737,-44.14080379600775,14.713840910871495,-3.995440532852592,-26.080132664559642,62.21386256013888,-34.045173143828244,-28.633941554665217,10.682138548720017,-22.56783956740824,-12.046217036404279,6.8150424372714244,-14.661067791984317,16.091729490947852,-0.6919709544024042,6.70339849014989,1.0745695218498346,0.454713458218301,-17.631015842455763,3.8784860042570752,-13.456566015613847,44.37460780618603,0.16646871824214896,0.9510207037120583,7.264971659712937,1.3197641044293937,17.091095637575595,14.169098241893133,21.37793433010797,11.25815717521594,-6.21233189292543,42.80345604496418,20.437317365282915,24.661959398440686,-11.120148747268146,-1.2124184564083371,-10.127018612266372,-0.5185916379191421,9.997848120299492,-4.481685993828822,12.130625035579643,11.029080630981312,4.31247089850744,-14.288496907130098,-0.9056929657037702,-6.443789290303052,2.9718717828668266,19.099867262756316,5.8261264613611035,-6.569644325096551,-3.0549754943934753,15.989583650841716,-11.77767201278512,10.677322953922207,-12.86268194348343,-4.905431723800019,6.869494214015912,6.971815458119803,9.34013966025382,-0.054006924688650204,-7.208639861592036,-33.67716413980776,15.070418286117958,58.24019114622259,-0.09425952381498182,-11.60478806403146,-6.8652379344560766,-1.5742495048692038,2.8885252104863985,12.944285722681542,12.568843323647021,-1.9653803703792416,8.460224515485024,18.42133712540877,-7.020293189117035,81.18256400246672,-7.425737802546499,17.258133335004196,-23.98603815887986,1.577126328476967,-27.489168746931608,11.599829312318317,0.3044426845831905,-30.491624856651924,12.576975707464106,29.321066229710162,-15.773297947174354,-8.948976570316631,-1.4745423818430858,1.589542251808756,-1.4287764552757436,0.3667392939401205,22.791982769782784,14.959543494957734,-17.189953073165757,-0.018846155034432266,-3.0094010950248133,28.13959174890825,35.97764136387535,-18.114089589887563,-4.99679168419353,28.722889449235826,1.8914215027428656,-17.154424589807626,14.969466339477911,0.164618837751735,-7.962843179881298,12.517670150300852,4.078084208819526,6.82415674731001,3.2081142267791316,-33.63577238370936,-3.4412704715717854,28.49994004338282,-1.2742048572973963,0.642982098798692,-7.509829715622423,-0.9274470005922959,-2.575996186577468,-7.195553724396679,23.548024372985704,-17.418320912290348,-1.8328648462800305,-2.83234932145122,-23.217091977797672,10.284341939242157,-7.858035278312014,-4.552256180586488,31.06483987464129,1.3849908966067872,-1.8262657927874693,1.014369078352075,15.19806443390828,0.8728257831926043,8.724459237970315,-11.99801654995822,9.11350082433902,-7.419581820721765,22.367826254950096,2.288044478357677,8.677117997287395,-9.602350898266254,-49.954232582521804,26.88423897117151,21.815300276308957,-18.340185739088138,-1.3833901159456614,19.395727206403908,25.552755184543813,-6.641847383021202,-38.98217858664951,-1.136589167836412,2.9306837311825045,2.6435752471015843,1.7698853567360953,30.675231860401418,-5.214983661001455,12.16727970930693,-3.118919560106078,26.76102009047901,0.4624385773325721,-3.2588031776824806,20.878054889240513,-20.86327958318284,12.696235668644773,-8.72041463268905,-4.904256406606507,0.7449826937980786,-3.6722150082933602,-31.28797559808162,53.285984774266076,20.49612874522645,-4.402248738799834,-2.654531612289312,9.027141836842794,-6.585948691618655,-29.24529205403829,-2.5096226452438293,27.210043461649374,-4.183514629067116,-11.339016266212035,0.8155742080553465,19.681286542294274,8.55570975760032,-27.694663953927503,-14.42535323989707,2.3282510970594936,-3.1715999873031957,0.9921507788642028,0.807421345589935,7.250306395134279,22.057778333295662,30.77998560848719,23.024248199080176,0.7270231940625272,0.26026468763253796,9.62620299655758,15.84674989340633,-1.005324380489015,24.68658688817266,-0.3494844426857606,-0.1868503408443591,-7.915210215721515,-17.418695567069264,3.1886466392662998,10.624423406288615,1.8240953189304319,-0.3448580807157664,3.15285639225927,1.6949106796148168,-10.239905117618997,36.23075774373209,-1.6084105323959417,-2.0683094466531844,-21.696255585484963,0.20117144971669565,2.0026749010466665,1.8254890630659424,2.059090973309049,68.25005377349426,-14.222504342679834,-3.2675546015956956,0.30267524430818576,-17.516661231842217,-38.01441880372119,0.4292473620497576,4.190985417572916,-3.871788085601782,24.071364984791444,29.411487036306603,-12.87183617489315,29.504003032510692,10.787808995363342,24.512255475287137,-18.524252994626742,-4.875294107598016,21.741390059760235,-5.98422006198113,0.9440832983463372,10.445821139659667,-11.833798924358188,3.6207082516799662,7.990503295013283,24.690603187763955,64.54364221987804,-22.61903319683724,42.808536844458935,-1.0131402181588594,-11.498436333987945,0.650197452119396,18.54668731141263,-1.867522134993663,0.39517888170212406,2.0340903910517163,26.984827023546483,3.0776111784884046,4.429166915515954,-26.112431419838952,-15.142104959711801,0.2506180548023773,-12.751469435381185,-14.330295788191979,3.570617189584463,-10.96177080189347,-0.03672824050063095,25.17974231005918,31.011422016111077,42.47355622578596,-6.54494811810894,2.5118585332897307,18.905783443510327,3.4726359900745685,50.425928808510996,21.008036366049716,0.6222569449402634,41.01164001386251,22.518680942908382,15.559156878280257,7.131054322166599,6.854255377468359,2.7902899723024577,1.1255398722674665,-20.515883986872183,8.891579556733552,4.16407255979228,7.2350743486320015,-1.4968512397277738,-35.40762939011604,34.75020020788537,-1.8302211968492246,-2.305677327267955,-2.0289238009123594,8.487094283759475,5.9619100233257525,-14.65987477102546,0.0268166507432162,38.900742440621045,2.674906636601674,-5.119267191266742,5.702250126170433,8.992640473454744,3.8866611415850394,24.210713946749493,-3.3693201285751773,-18.42963359558103,-4.944450574786819,11.428554446307073,4.78531826524232,-93.37201713213462,6.466041656851717,-5.684841825148331,7.2555471860278615,26.78266684335139,11.82586575202675,25.9647753599944,-15.149944230057212,-0.03527073431235139,2.0286761199936905,0.07823742443485866,-1.7795531702844938,16.145654087933725,-27.34273609469594,-3.431822062824032,7.043578036170602,-2.247264902829264,-3.1051729690456042,-14.976617834014801,-39.36822104766581,-32.75569684282983,-9.78571437003817,-17.522934814754404,1.6641217162866078,1.0497697172709646,64.95870576679192,3.900574898630348,8.856050820073083,5.81688591630573,20.153170966549716,1.4712538000411683,0.7411243143638484,-13.774330452699687,35.53280152729242,0.6312848617466866,-25.438604072220752,2.536152962512582,-24.321920424265016,-6.96782379878278,-13.426673684655935,0.7383395673192938,9.793626761650955,10.080953241107567,-5.003686550937063,28.04658469902194,-14.700668201691443,9.226766412186016,60.689921490592525,2.181435481196986,9.631536436196928,16.43179223321762,15.872769455879256,-43.339621079672334,-54.82730722754294,2.8188520902295022,-3.566196884228906,-27.12525938404116,-9.451169440127146,-22.4830187916622,4.549717583720178,-0.935027175309803,-24.841649279440787,50.24116638668921,-15.120971267334834,-1.0182039157465612,14.852471327257433,20.17067149376649,0.6914164310034507,-15.766085932990269,-32.185925853825644,25.907744478451338,3.161278068283421,-6.599920672274681,-9.885147796979656,15.485330093338662,-4.298790579555209,3.466823016006014,32.240291191378766,20.812102912866944,8.062403837743442,10.790662734121971,-15.503782683847676,-3.031050791874099,-7.914029122458784,3.528821059532695,-5.873321519633456,13.449049115114619,9.343770556094933,5.765497991444839,-15.266472535719178,-1.449127790638454,1.389680652151399,7.535257822846965,-25.437044094641287,-13.248175729735411,-31.940902397823855,-3.4228628454956733,34.34526034574703,2.0015616478116574,19.224825739545853,-0.09469911374339582,92.68857060962856,0.920162332256647,-20.808801708656667,-4.290566909475465,27.734242332091327,-33.719920988225475,3.942962070237376,-20.50110409677435,7.794230604685141,0.4080466399957066,6.352463236589363,-4.226634520619316,0.49580277845131876,-0.74209595480763,18.18894550980502,-14.464174820592874,40.62113309303625,-25.777488781122354,-8.910826209259062,-2.590334627859857,-31.572066492780248,5.902474525466829,-0.11434335182990141,49.98722209153438,19.287230846043492,-13.143315278786755,-2.0833671785623995,0.5196915870539571,-4.217312801230694,-5.594115192785667,-1.8403186912260734,-5.506139662915516,49.483990532850406,6.5500406155395865,1.5025965014874374,1.0091802463192292,-45.1534098610964,-5.898398499918396,8.899920670119357,-15.719709064068354,30.25759370244045,-22.65131616091459,11.062830667784194,-5.226937025685465,-21.045143764330373,8.398603831917555,-2.248959086666033,-0.6888589851878407,2.6080003262441154,-5.4155833950452745,69.28729759787201,18.55936437700893,-8.406465549155378,8.749116595410273,4.667130169596425,10.679631937104585,-24.41901424707803,33.13596762797842,-15.699192468752196,47.0741721942776],"s":[16.21172811601602,15.26371501877719,2.733329369457249,9.57329339019996,18.167206013569498,9.933202001951278,18.69427361642467,7.4302353038471125,1.738216725687165,13.388219300181103,6.659230200819932,8.616432489864284,0.02092403452645275,14.125512924740736,12.021196744822497,2.4440546562280963,7.298004533635276,5.716474011772195,5.664939333457326,3.896037924899991,1.1646623574280968,19.035111572188043,6.689297360509174,0.5730289971100477,18.039453798424105,3.9390688201476154,1.3877022467167865,7.823872509458449,15.79815626266328,8.295929239911125,3.1705892794647683,9.351095506483675,3.5460035424133407,10.345519933910996,18.24524451323125,17.56795415049001,11.207256604137896,5.087618833736731,15.101959844438548,14.230468888187433,1.2496258939783056,15.16848544934788,16.620777646158654,4.129639626442301,1.046094448132182,15.354740231307474,0.3022580378834139,2.3834487181374797,18.9958405715507,15.236403880329839,7.008994694977995,3.3656204241980436,15.13075057268685,4.3551931240861474,7.671182861411738,3.010621478850304,14.468355700697085,16.245158265948373,4.3292098307004645,13.902413551532003,11.156168776185451,10.89397880785886,18.119675232905045,2.9933584152538817,13.15771703990273,5.440447227792133,18.06154823809066,3.8614046239439226,15.944905969059239,19.749387040012266,12.084219285682693,17.755052838961838,6.363175485066144,9.042870089059956,10.73591466100412,3.6967488265296433,15.75722102849098,17.100810637880073,10.188173362040702,11.062055819773601,16.73992165399548,1.1157733784047341,3.563540013227997,18.119663495139456,13.207839377444701,13.275272432894756,1.0571177322479963,3.6157341554862388,12.459752674137516,0.8695506633103278,4.946300727239059,14.562188302643651,15.416167831372732,18.500594526442164,17.241811057452693,11.36829381036942,4.091682533376675,14.139191798235856,14.962192149488779,17.282219506616116,19.607570676299872,9.97525255768998,13.236522441971363,17.490037194389455,18.5727348985422,3.8534398689388016,18.32157462485787,16.07262829125728,14.509568709382123,6.677907615448624,0.3526252931682805,16.568620098959364,3.62101874410242,16.228875281764395,5.47968255154506,17.4725914749674,6.704625992702566,6.115832564313011,13.465211220229012,7.145604493503641,3.667858402674855,17.545090423651928,13.418159402502878,18.923277949089346,1.5459097889577977,19.305129289652925,1.8759400326845421,2.8736923263953518,14.184826232438903,15.068129834389232,10.101561205572395,6.607030407492975,14.562069997143539,9.398363053779072,12.486310733541242,1.0549608367531738,19.521902988351044,19.445932389923556,11.810610166482153,11.132895741831002,12.342274529850311,15.449230960593958,2.434563844145883,8.652490438033142,6.156493671061458,17.06120376699705,10.992735927658511,0.07129114422503857,17.314379979436765,10.947607672174309,6.113733184228378,3.9779452662111447,19.224775985769575,16.547349989308845,19.62156328145945,6.976436758104154,1.4776844009243328,7.350915658614885,0.849637353145396,3.817537953736956,10.983909576006493,15.448877007613358,18.96189276823549,6.563780260173742,15.713441889277867,16.2668176296056,4.088380094122681,18.760536499084658,14.536774391487679,18.478083760860287,3.2674491615411094,6.61602111185982,7.803626574423608,14.43226604514322,2.7147415178781387,17.74544390536444,2.306800312999493,10.246519767264228,3.4584758545678973,11.150646423844282,17.487835251711125,3.573729084277444,14.510625671822979,5.030316362620941,14.201596675500987,0.5739667435716322,19.528401242715894,6.912864641484964,16.335809837532928,14.451742988802025,11.782195613892558,10.804114002059366,12.212621787107349,17.079034897914656,16.6977727782573,19.901961877616685,15.288617472195396,19.44287628179922,13.894102519132478,11.631206281842736,9.388264229586888,5.986111851919111,14.219042615061559,10.9088679511395,19.82262703144231,8.369481110677665,17.089291904529638,11.300321028154428,6.773614311933618,12.632512276458527,5.643009664454306,7.584822391429937,9.796794291136216,17.850282920428505,5.400659492504527,16.219345867551105,18.007343482984368,14.380374786299214,2.088868634972161,19.37772864876347,2.242720010329937,5.845733373475843,18.20630864083935,18.860595276986217,7.111621447713659,9.156506478887888,18.665091203939745,1.6192128461877076,16.506471919908282,12.728647391736253,10.7012753139011,14.193498414988067,3.9895028883976513,9.044375381136543,4.083355588591604,18.27522228655344,13.361262330067598,4.4158781028110505,7.441947907383728,17.52429535209233,7.297155183811683,5.171425279630899,17.5065810586829,3.4342627779602974,7.676672600603869,12.84430205673642,14.260310054843943,11.247790672375647,17.400641902835044,3.431004755875202,2.117425609729713,8.023193205541222,5.606472569299004,8.014147188150332,11.761652772565402,3.6182761105736327,11.022291893196549,17.834749312848885,9.712285559014763,16.917560470388647,11.030389967265979,1.5661024839996474,17.10850432019494,13.12960818902254,3.3832376566241473,12.528815966761728,15.930496823125132,1.3325575451987426,19.9872969936947,10.8340822991129,13.911708224380828,14.41876202125945,14.593200288286607,7.806853540659451,14.715187294090297,2.439175701724343,13.327431576525854,17.258249975025713,9.979070477764186,8.382405970112341,15.13156716375191,2.3157808884953734,2.915480260166907,5.035879277776862,7.392055079216844,11.216776112932116,4.421542855187526,5.021722536207305,4.021810468982263,15.000114399107783,15.709372967015867,8.151331181280268,13.582033087050274,8.883427398490383,1.5691053543069122,15.554855333232126,16.326608916892027,18.034477270213486,18.930808123148996,9.567533604107087,16.5299622152493,12.576088981331965,14.832717069802497,19.307362663026385,2.0851225323171674,5.362602946331552,2.6514567907012676,7.596781894566935,17.641035683246752,8.522166079770335,16.025837874163223,14.982387656754014,6.103507856979813,13.25147031376575,11.150144775490457,16.805581366116137,17.70097250574251,0.5072759273629046,9.329151564197007,1.608149118703075,9.58521201327066,3.244575155212006,14.189285434972767,4.053209890838709,9.782699289955751,17.50054103609014,11.709565701219526,9.735679100347348,15.646783063148346,15.27725107751448,16.01259179087636,18.078231908617273,13.005198207848867,11.979854814646771,14.571105521957378,2.031118473832856,4.770889808057577,19.41404224324195,15.901659468082482,7.835219277828838,18.669394745235888,5.786486783813949,0.4360613037928829,2.843331497143904,17.68246702081235,13.28188629240783,11.284409055111544,11.252586528331165,10.256879174753553,2.5663013333553097,8.585050810649491,6.357918671692726,5.236409704465279,11.220080188227355,2.6193486459216064,8.535903519554683,13.857869014921462,17.258541714314237,17.98497817063531,7.095398151658059,5.334911016780781,8.595328145022044,13.107624705829757,3.9213846968804766,10.64737185282513,3.401859334323847,10.371297048134341,7.177546836677515,12.315972032878303,6.005599560139285,14.113354074391996,19.69509484244929,16.834040412839006,3.363847993297213,7.661430444229267,8.130191152104732,3.7062991999057937,19.348982216606846,4.093984221806761,18.27117437583926,19.69495230713557,14.377429160543244,15.250682155012306,14.241383265476916,2.564412592880174,14.807172277318404,5.992694288826694,13.646500626191912,3.888155775155222,12.952944662709896,11.657629464015024,14.990740712138813,18.857512889632012,2.3670829879137756,0.16272237715133642,19.278132915562942,4.8153968859556695,11.995440922029843,1.6011361215032638,11.766481426829634,0.19651814339940454,15.041051474218099,12.13013570309271,5.768655902734894,13.67575619736764,3.53249435704178,16.9128978039532,13.64503571177313,18.848859079786585,4.366726368823173,5.004467832142057,17.36563720265311,12.50491679529636,11.068300644821036,7.3737853515698415,11.059594354293267,17.5220554162361,14.248835310082937,1.0516484030708861,13.450430809944542,19.693041634662638,10.903668805765827,10.836663677717402,8.51843213924862,15.393506451103365,5.429276762853874,11.462871620579115,5.5016921168932775,5.619102289292499,11.829168461464384,2.3322304970806496,4.280467585305496,15.751445175700134,10.113436905437151,17.326303616001614,5.392064137476269,15.016341615019556,0.12237764620015135,15.09848078459974,19.424277703570922,15.475258927140265,1.0232795046310539,3.391721256988709,12.834117699608694,3.037619546166246,2.1022207093255885,5.079370701379453,5.919307537875742,17.977122992273287,19.640232915465692,15.570172506239675,10.089197960604007,15.938143650199038,16.85534426784304,6.721715283423966,4.11351843162278,13.781458385102061,5.485192445056386,15.720628468457658,10.11345272776284,4.063593716670453,7.7760132624696965,16.02258540092695,10.55204472979793,19.13231846545831,11.779368387179364,10.874650206039306,16.162489016503486,13.080495567617746,1.0286114165797144,15.259278013740873,12.944955634989977,12.561168662589303,14.980644604533175,16.245020506399985,10.915830916768625,7.972785780311136,1.046190994174081,9.652366564143113,10.28321946220955,0.6089296341494421,13.14638169848644,7.646734139040743,1.8300004186795782,4.277002481582541,3.1078402707320008,9.06545054203319,9.507995897530556,16.00273259547192,8.39277201784402,6.383372080556837,13.657530045414404,18.9547944678163,7.045599817394552,14.099201609195408,10.800102738485693,10.17112171080842,3.1689591954524943,11.746707381437762,18.10140844870525,6.199868297000677,11.995055781825258,16.60890844955864,0.4350537216137518,14.097074369444877,10.569962272348805,11.517377077709323,7.772643000307591,1.223005242869979,9.400247087077162,8.953596593297224,3.6287162044538546,8.811518512368428,5.056727126764176,1.9791497528740631,9.182892110309213,12.081665661824763,9.23682041943113,7.775471723749616,14.564109666848498,0.012277150706330175,5.451778647784948,11.140518599841243,12.540222317711201,13.295610787284726,9.616062254785787,8.631153771856583,2.1245496631268024,19.02868897825265,4.823015576657297,11.54629097831926,11.928475036351,11.725811327946234,13.93264199227104,5.858122739456171,19.961821352367657,14.313770349172735,18.75819491687226,17.563325442850175,2.083438966885711,8.387033902587856,10.992201818734436,19.65711695126762,10.122212794347817,5.011961055972276,0.5413755713014679,7.167182669835466,19.06307627841465,3.7925982050881535,12.56217388924265,1.9411837858846104,4.975337001125815,18.932992999561105,16.686682377421164,2.1724705531715838,13.387490973554602,1.856983395953935,16.539033210256907,8.019830810551479,15.261002556744527,11.479601532911126,5.796605452397445,9.457543035034917,12.596209207518804,18.16292721626077,14.955363004373815,4.040154802356621,12.089924488957763,3.5611483311610437,11.230126539966555,17.427855875944797,14.34857050367314,12.553262349882331,11.829374595017285,4.5266407273181875,1.7672185529322393,5.3555348390169355,9.800068841901442,14.3923241429273,8.180673715258933,5.176929905179142,3.3898123937026226,5.203595305351549,13.091047388135308,6.925823726911595,9.026667892618786,1.5302032060133675,9.063338016769574,5.1332065045908015,11.714502286781375,3.5222982239610356,5.4212695876902295,14.35062868151379,19.320645772623642,12.785826202480695,1.3742631173300701,5.1255950611921985,9.48522258301038,3.4384758523192938,4.086220400655867,4.228257145503442,9.984342161931107,3.5071032322437645,2.1750941695234305,19.136354913416245,13.664833461732147,16.67882372270418,5.81050557871837,5.373797889896799,7.555464218464643,4.302285083901403,15.893787689377735,5.466239001153244,0.004545289006760989,17.03654584566315,5.858969361893855,14.070054187659178,5.478933143363496,15.86632497904752,10.47286627132542,3.0175457605024336,1.071154319398504,2.337379330532392,18.607627772900198,6.418925372621089,10.991260927790023,19.02544996471217,12.170051275973899,10.036551032229468,7.891004107408501,16.088234634782246,19.676156465087207,11.976699575634559,7.002192353777779,18.55102829332894,13.929062671411234,2.6890516294970412,8.217827553602142,9.295225328936553,2.2993365196890547,12.773885966625249,19.179660706147885,10.877627012540799,19.2489041988326,18.545478400393677,4.910065746834502,1.3805389447691052,4.3143528026341915,17.72413961401763,11.393052780486235,2.9331000071319036,14.898730249202515,8.741775329054349,1.210105675145372,7.9897890459398635,13.542153724802333,8.470522060684885,18.5976294250735,4.0791505956301854,14.765078756623943,5.59591942220937,3.2924536885949696,2.5892602122224773,7.652209418564815,7.216313363991871,7.931698614844911,5.013763981452937,9.576988906040583,8.67920880868577,3.7387024860553275,1.0680918135866557,15.605758823551836,5.68524843694675,11.678287101546378,13.669423854302828,16.574573762770378,18.720561664093893,1.9951360002042628,17.112207722716242,12.75144407846716,9.41927407601221,16.876663132944167,2.878020773968726,1.9015276730223318,2.081127033257233,14.679313249488462,13.362860433588398,5.8086636521901935,7.857631315229847,5.645979042630764,18.202164692620407,2.534290184415471,14.690687512124176,19.72278593512236,6.731236525933322,19.405176963002738,5.094852504807745,3.6946363614500077,9.274746333462204,5.800381459712511,16.71174000774294,18.727529169130747,10.814491075084845,3.1414262692523964,11.540934693244731,15.056428520094475,8.513911160253492,5.517294396991552,6.8120165543766475,16.676564439527652,16.271972281189072,13.991471941773543,10.0865729877899,11.38384939765901,10.73227096744072,19.97990893160921,11.794784814406611,0.8927935889168381,4.688637376862728,1.4939615393365457,0.5181571642642435,5.189981873067699,16.10987564198006,18.771636244879147,6.7656834927063025,0.7725588654569826,0.396566299481127,8.999258804309061,14.126740254134088,6.04206028170529,19.54392580842464,1.167671151481926,6.566466454285602,3.9885508698773364,11.841807778030855,9.758135190154142,4.258921707218071,2.4831884841563268,3.0932105623980677,7.558046196507857,2.4138715789364396,13.830246151332442,8.332670141348864,8.599107195378895,9.742440239889874,12.775182094581528,6.632094691165027,0.5111414398968828,3.4441625620327265,1.148563805393641,19.81852947503111,10.889604686091467,15.155709959560406,0.16620152740568273,15.483862447558355,19.64307175147235,5.338376650038699,18.599819835738195,4.27150541683357,10.527173392380451,14.97860593559853,4.593294473562017,11.227749601096605,17.66638052684968,8.39584032403987,5.526260040567572,8.735747672067365,10.714053237947287,7.0688601312786625,0.49135066838362107,10.746764268513896,5.835481630804833,1.266818372710743,19.474958070706588,16.790504575984503,18.429778116601867,14.291763905346034,12.440079132047831,0.6206332771969558,9.903144029080888,1.1909894587091774,10.843101214217095,9.557757663930108,0.6185368001401415,18.629684485611826,13.081486817504064,6.011289330519687,12.577158995835834,14.194018173984606,10.382995262098822,6.4522264632263004,13.81155970908749,2.2226524266294545,15.693247868493891,15.034991834433074,0.756541120890879,17.764027009302733,15.98684344823669,19.393698416032766,11.022245977689508,11.743835157199536,13.046671349057837,3.1376478028837163,8.241910203229663,16.421904802454,13.266615890278622,17.396715619429138,16.706077340181665,11.51257961552222,3.183112820221363,5.933699370481786,11.143909865557617,0.5104470124592675,13.16320898302176,4.997690566752211,9.379184477066861,13.895109036278782,2.9549539348746734,14.062232650308587,18.5783451728628,8.538139974543913,15.492604601397924,0.8346181860257573,5.1416374184219915,19.20545607703707,15.887060522894707,0.9392180394391758,10.43099379949819,9.64478979968488,1.4848148238557934,8.361317278393138,10.173609538329732,17.940325523884155,13.711668016936297,10.734729180619635,12.87813829907806,3.6101617578131506,13.906622219067692,15.54156023618743,13.056248339083396,10.955736193032038,0.6690729591303457,6.627545392246859,9.786848607010427,19.93062338879758,16.891742362262036,6.104612773411722,1.6375721157626133,12.062675185514582,0.3475202294107538,6.7207225521867064,6.759185886101031,11.589270045646028,1.0283345703060753,8.544171232230212,5.559368453540396,3.232197546826754,14.84337833343341,11.062232542242722,9.317156124929902,11.454983878998277,16.493378365218963,2.170344492031786,0.2997760385184822,14.870692978322651,5.658803593769641,7.93309769442581,2.605318036931279,19.169760270255274,3.9836923821427916,1.590158620304818,17.43501221179259,12.362355790862182,5.7927993629333585,17.48356563917039,4.281429123710119,13.736895599147939,3.0701809024347426,6.779176809158991,17.17601241519898,8.070883444526231,7.097053063408771,5.195425557605486,18.156802799910693,15.174274998524364,8.680825910796056,13.256867451240266,1.8267498136137794,14.22173820986397,14.069485654422692,10.026697368926968,15.107199430548466,17.915702218874003,5.87325365458033,2.34892742124416,19.23305996577101,6.304629590802793,16.346899668606213,6.81294270109436,4.929786694212535,12.383085229861784,13.889187156629728,8.425028504699927,1.0727667501884586,3.467513806975351,11.977764099819833,2.5722789398006363,13.350951513307944,15.112469131371306,19.556996424997163,2.223523955263591,11.35706310474433,16.58926198245676,5.334355730463329,3.436566864919568,1.8674443259721007,19.564381926620378,5.703200628600968,7.1641021783626435,6.542983796462294,18.314244433156503,1.895795067733279,11.790626558626442,2.878256432315922,5.416212637667819,2.6370020489146073,6.408027114795525,5.792842950161035,9.668405981781225,1.5506505456596686,3.2385479907427817,9.568105029586725,11.900099168231097,14.81425060582701,12.736962680520957,5.173329889470009,9.74571658531441,18.79080218520612,9.495806981046414,1.134115091865291,17.871419172591622,10.469491971199174,16.73735795806945,12.213146971106749,17.69503256460083,18.779236300806488,1.9347782007766545,19.795426208976096,7.585533477529731,0.9580674043543524,6.719550321396315,4.247229511711912,1.6820442849564188,10.361468810164208,10.182715349544761,17.362827299300182,17.53546597953962,17.44363797642962,7.703950380887918,14.884067734181826,15.942324500099208,6.453340005796999,3.8827023229362245,17.842732302002226,15.939901796292446,11.189638333583055,1.217617589809068,19.84442962517226,3.550608037381946,1.9258084624921379,1.6100236639012566,18.400459086595852,15.076771882093723,5.153594038639819,1.1322318252285424,0.30378135924867156,15.846861934947283,13.9770299388511,6.228638450371209,4.933764452588565,15.321007281257707,9.019449022477621,16.235725234229868,10.402270844579693,17.504354074815396,2.790262113796227,11.794880493927241,1.736124596088886,8.875106795462937,6.126497277295653,18.13729918896668,8.924061256098303,9.555969064975303,13.253911996484518,4.077739375250502,8.233369136489852,7.375905876361228,12.756505008531441,11.666221149806386,14.388520317326972],"p":[0.44939003758012475,0.6869683001710349,0.27197174967641136,0.36556169582940057,0.01742481854552902,0.47076949472367735,0.21290418200545225,0.21247608256385275,0.08582605326231452,0.045135154573574754,0.39426160490901263,0.5202320751590426,0.4292262849083235,0.007468938738835362,0.6981703891600826,0.665388110995019,0.5651550389567241,0.4934036678506126,0.0456657754533174,0.5458818413520259,0.13411027915073204,0.8483090371285209,0.12949418985598338,0.4657604931438162,0.6836281062406304,0.08944885274159908,0.0777089273176188,0.8524591055178141,0.26596771038411715,0.33727247152224393,0.3787089267317649,0.459382312784127,0.4159337861784793,0.21712364563710618,0.753109552004136,0.08980840195131279,0.2688136057963131,0.6791313711218094,0.47886838582299296,0.6822454382444705,0.6828709206158781,0.0758391096657074,0.06484795416756217,0.15454716321240292,0.7730848646763508,0.9986241270192939,0.17712824818876927,0.17894987759122283,0.12460501729156892,0.38885604452334355,0.3081229744188754,0.058641947421757434,0.7888864791385926,0.535548066846647,0.12846100424536067,0.9123648698180937,0.6281718072255034,0.16821737778797052,0.11876212190778612,0.8920803636653434,0.6020098858195042,0.838003055985975,0.2064435895569272,0.9222730514652364,0.8966788428397734,0.9529447785598248,0.6475837210343647,0.46541859624178006,0.7049051931282642,0.23704014396421336,0.027510679969188434,0.7339263312801092,0.9529641987337374,0.10001165613097829,0.8975771482196331,0.8432445458276687,0.8149272223363189,0.8004837093795294,0.6477531576409523,0.6819629602870982,0.603970657408113,0.08147558767780039,0.7831748137945018,0.3355303067846638,0.7862080375642353,0.05929667695548879,0.9166993966779053,0.04634147431682134,0.007756696094776361,0.8942357142058577,0.915058766412141,0.7850207549863608,0.9850665154597071,0.035349652738668524,0.01593744826763044,0.3748211556071941,0.7778501065598065,0.006220657873365898,0.5916534795659638,0.7739481768287988,0.8962007368371885,0.045308364460900696,0.19995555301918588,0.12539758619886654,0.8447983167856894,0.5520930681099392,0.958844415484615,0.29373939367618385,0.8512704166236733,0.2737247374984815,0.30995178361868425,0.5420926190309534,0.9924628550884667,0.08610802010491181,0.11991344761486511,0.9645648465957037,0.011532559445641688,0.5442931644928306,0.15292519026444196,0.3029427703015797,0.6799606908362363,0.4070667970708557,0.07461166474079661,0.30085379388829714,0.21708300025580085,0.8071434879747621,0.2298668220909421,0.9131933691153451,0.6137470648794199,0.34596731379864387,0.27616336605791325,0.3272554557748837,0.3484794970128866,0.6008599400380024,0.5520611351892277,0.19896902996876076,0.5156644059235067,0.49695669522306796,0.8854892089134567,0.5953732755798877,0.9706361753012698,0.9099749917603464,0.16505086233859467,0.4500651485307705,0.3919862397222158,0.8079012707415529,0.8514188769824298,0.31547689883117025,0.5089314189689569,0.41485532114060186,0.36773205600734293,0.8797148021426258,0.9837396156477927,0.9141318801258087,0.5180728992026353,0.9405214106626318,0.8144462194894768,0.3920361242112771,0.37368975227594614,0.20324477711364786,0.9469265053627587,0.15265946341746872,0.16673000482217137,0.34331900676057514,0.5494479639411032,0.3215612496075415,0.4226697050491752,0.3702415456677568,0.11199402804484726,0.20220632925776583,0.6085577137343063,0.9689634270108956,0.6697901435048066,0.3295053475960317,0.6300308555367922,0.9016706765519236,0.5931726600890486,0.07227243161544994,0.6899829380775151,0.24413801691770676,0.10508976441443973,0.11920071960469225,0.17776183044358462,0.4909756938512182,0.08660623730682082,0.9548132049649714,0.33511605656271226,0.4731746532510843,0.9696660467605669,0.22066893242692442,0.835228214495795,0.6122445408942985,0.4495915626026974,0.43300242618005047,0.5737220684759834,0.34212747759574547,0.4967901410868185,0.7335602055905142,0.39305694202259867,0.46962740527535574,0.37717982228110314,0.12879318848763255,0.8945841727447412,0.9712687616315716,0.03824049733581214,0.735703199802475,0.7750832854311351,0.26200367426584004,0.3848765010061397,0.7759478266720523,0.16607335003675594,0.4961964924636193,0.15250622422611637,0.9500194106622655,0.5907728675470498,0.8356210337877392,0.21770852987567046,0.2523678778474374,0.9190559189241974,0.2893381896819056,0.49889758189460864,0.34498362818953976,0.884929752614356,0.19143739384254976,0.1552389455948533,0.537180836842349,0.5954423776092004,0.34774692639201943,0.024237673641505086,0.04216301703048275,0.6935296949548915,0.34140909532563657,0.17300374865851587,0.1634710643223658,0.5997157022306219,0.10483951751695075,0.04485477424929396,0.05684977198767638,0.09846411091198237,0.9284019428863575,0.1557737343295864,0.02205747940882019,0.6333840400953448,0.2983637803197361,0.5093896366203601,0.4602647056470319,0.007632183932584802,0.7265914918514922,0.049714916860952085,0.7353338484220899,0.8554508996150763,0.532748032052127,0.9190201941644791,0.8023332802733181,0.843356443365745,0.6947043895724336,0.1359795964246493,0.9168565611366828,0.8085732176549709,0.22968028369031268,0.6729476509093022,0.8643912403828176,0.17689732433458016,0.8866028937725792,0.06854954033128657,0.2442293439110821,0.8138323546453272,0.5765633036222659,0.7721831249103388,0.8466515558322616,0.7408380745909797,0.7119347951773638,0.8815542830111682,0.9167828532004476,0.17645363484188947,0.14865295367289222,0.766098206782516,0.09685972584829572,0.40133147637610467,0.5393362714367842,0.7032978822050346,0.7535867256974951,0.4656041566147866,0.9827996040327502,0.5372502395193215,0.5565168004543173,0.1531369127118487,0.43926015510352534,0.97284451526613,0.9219888745820681,0.5619325837633582,0.21158418325063444,0.4902305433631946,0.8220147811120617,0.2733413634131081,0.8114128439884192,0.17541205995766984,0.9657099546814487,0.5530224576526996,0.8090312424693458,0.8182187313267859,0.5909387307538982,0.312570287619675,0.6273731695488893,0.7261041550348974,0.00013376573795831348,0.5347726918444251,0.8167569915022477,0.9504718509015837,0.9610796318829256,0.5140620132894391,0.043851897267160656,0.8744218160238835,0.028917328813572896,0.6003351312420995,0.010379992508437574,0.5063657364815723,0.9011389285211506,0.5575797055442568,0.06599970228406682,0.5177703416978638,0.1970033119840513,0.32780429183797843,0.3554513308782745,0.32648745678900926,0.49314880721191856,0.038552200942754355,0.00762148887058367,0.13710334255626133,0.13402861428585378,0.014083703918360557,0.002589141855923849,0.8199356024358484,0.34072692913710356,0.698224760929193,0.7039582900894374,0.48153111320459563,0.8321646714139947,0.7869885400079808,0.7644930070926563,0.8950929401350698,0.9575023191897716,0.11607134624447024,0.7838269063620893,0.667094647012999,0.24671530362024652,0.9647518590210016,0.037535160251366495,0.9260704400453856,0.6373900541402893,0.6195380415053555,0.5677905339373646,0.9087860026268173,0.9507153045093908,0.6672662577235511,0.2626652770384583,0.533610611000942,0.9750779794716204,0.2317071694511994,0.05441753577960795,0.64205982972602,0.2087322631583448,0.4467055472879471,0.0171056635220177,0.3891492057500885,0.19159786894104913,0.7107476220093631,0.16066740875122942,0.350511629445023,0.33509125209218116,0.7362855372904091,0.9281630347315415,0.7861358289227363,0.5908663558307865,0.5656608344764569,0.8628513879900821,0.1857395521153724,0.08570290799300095,0.041459809425689054,0.34870763936337923,0.0705433830259552,0.16306038595769,0.29035448417362697,0.6065330644404172,0.6316915925735134,0.4451238457606237,0.9386365851598499,0.16457329727581405,0.15623759425524764,0.29226004490944746,0.807011622434654,0.19309782666638342,0.7515918960825843,0.030056769912605974,0.23827087778330047,0.08360661339143283,0.46708286798965193,0.9148690383675768,0.9540570060107367,0.5115298246177535,0.6873980461391835,0.7587354939937847,0.9166863720110487,0.3874098919992195,0.33777227721702796,0.8906756369835487,0.30561916454230253,0.7730901800080632,0.3417386430538736,0.38483426066877113,0.7019327809000098,0.5846418964717581,0.5475795610863954,0.04442630196497288,0.4297205080913151,0.834720346307201,0.6280649324523131,0.6440344109986267,0.26738243944320605,0.15802039396713696,0.6043350278436983,0.2631906607894723,0.8663641290768009,0.43649535301300557,0.09635608897476589,0.3171705870187196,0.46433115085005006,0.5464618470320237,0.3328303110037516,0.7959985701232113,0.28615107567404663,0.14403416022357218,0.6694537077650546,0.9084563525006091,0.06831684557620066,0.4130171210712592,0.24112641355541076,0.6784891338149484,0.03894027558122426,0.5902475066738939,0.38761571634175795,0.4457641211677119,0.3610237112764336,0.08571862448526568,0.5795216064989521,0.9283436118153334,0.5639279402135617,0.8537746495282215,0.8074858503432081,0.6571193213211124,0.9342226253838268,0.804743191582586,0.17297578070153152,0.7543951240656925,0.33307114764243195,0.05376888393557411,0.0699992867776762,0.5084725903738538,0.8053323939694992,0.7787667935139959,0.2787906595229921,0.17289411245897002,0.4132632347196372,0.05585665018585528,0.13059927186880316,0.43783289589221663,0.6495252455277996,0.9868068268514818,0.4814542255211933,0.9096488760714345,0.3110588485399346,0.15053428052135542,0.3583621819750322,0.5854964744801678,0.41104162219456586,0.7944218903931715,0.7094293070949467,0.3351822127549231,0.8944803696589627,0.2632720602917493,0.7686714031666304,0.2806603055258523,0.029981636879457207,0.34900666475313225,0.2210414697759695,0.03872569819966576,0.8227393144614428,0.4977226842512108,0.8021094655933001,0.8877311274584856,0.004486688614601775,0.8603216694406945,0.08956115218205873,0.8766997778158938,0.4637988225610248,0.143553796527901,0.1278886012121241,0.07019970468815862,0.9654854981523977,0.7144516504823397,0.3730173308735547,0.9949136750158689,0.690591998343824,0.15755135808410792,0.5196014430552582,0.4398513562294051,0.510348877834186,0.12361332156760674,0.1702542869144037,0.0906101815675131,0.7072677539605168,0.7062896843891442,0.5157170387063084,0.8105547140895308,0.781657684625005,0.41361633399444875,0.1781859553488787,0.8857072119207328,0.5331004575148746,0.5475642258505926,0.18813443423414467,0.6901719453169812,0.7941372383263636,0.942613184914429,0.9387176199354812,0.11404812811324971,0.2967016195878933,0.08927237353527628,0.3214109443449733,0.24028398552937413,0.3434736384099979,0.13456496422715913,0.021324470542891216,0.7405514012808398,0.3099392054562282,0.210026725013869,0.9866558165308006,0.13419559821885518,0.16333205554156494,0.9908742189008626,0.057944691926244074,0.24101487081059347,0.5767954409388423,0.17730208415734583,0.959635280545905,0.0830762130928524,0.7054588948672482,0.5104806208660009,0.5172517664992935,0.18600279468329584,0.820219248638381,0.06034196882267229,0.9106838166718589,0.4986129808325368,0.4964656040514781,0.6162305256156515,0.6699294475013924,0.7336118238289189,0.8471570865625031,0.7972863370390331,0.710843566617233,0.24250954797744528,0.9889402523481186,0.8240303974023471,0.7938050033349633,0.31751943467307875,0.37243284289663814,0.3014206890008728,0.4512020963525851,0.6949058532614889,0.4268375615789368,0.6944483937660662,0.7009474981771882,0.5789517549001211,0.0388264850189044,0.3483379149089365,0.22874823542518685,0.5531174854958114,0.7878684746161104,0.6550448673174003,0.20681088825945682,0.2785353881200603,0.9549738357193136,0.2809905161198025,0.8182001103951619,0.17794376034103965,0.026804452581527194,0.6676924933014601,0.7812286387659395,0.6852999041980488,0.436295042408007,0.20370742352692095,0.08666734374889784,0.6821893443224682,0.9894573324257638,0.40540110558812215,0.09149189138074454,0.31967557551678927,0.35130675674386436,0.6290536967696836,0.9451017187727735,0.765276635051819,0.3408034351439697,0.9711620717799798,0.7145320443201548,0.3637932614269457,0.9923375354101158,0.20589683171302764,0.955316194231705,0.03641183941384174,0.5794289113081168,0.14503963655122254,0.8844764073551763,0.9114282280376351,0.13669842461377524,0.8862512817373143,0.8843733133967275,0.047696812599977045,0.3538671676175458,0.44649670768895877,0.5993428657939317,0.1191502701565117,0.44191533774374747,0.7665629836653707,0.9058996871575886,0.16631412481651298,0.4953298436525322,0.41977829691990043,0.9388912381819794,0.9889462395705646,0.2429844519204789,0.4332907428929902,0.9106419878368057,0.5495104669649467,0.2763209356083236,0.7318238392256504,0.5147225811035048,0.25818662572140694,0.7759714517791809,0.7973667934438338,0.6290710242123059,0.5412820025524567,0.041103191914674486,0.45152415069424423,0.8157274391469833,0.4104876161005404,0.527001449178832,0.14366445534237515,0.4841847912494144,0.4246335116384099,0.06592420142262978,0.8267165304599344,0.11276800452214797,0.14161102633623712,0.40878225716170746,0.15144184554569895,0.750770759905564,0.38677137310617016,0.21215350810056832,0.8895941375408489,0.5297170669385305,0.3587114344504323,0.506618188041458,0.8719906638053347,0.5230374913960267,0.7341694488593566,0.08269652617806278,0.7209076644512886,0.2814260883944084,0.9973735127369707,0.8684948732041857,0.6240060042507956,0.1528495905621463,0.01271501921528606,0.8751867988816451,0.78682685873165,0.271662014815528,0.23987009217133504,0.7544679598336042,0.8774025054583994,0.3124457370613414,0.08914556823381448,0.3321108234338046,0.7919014286271178,0.7668562428163745,0.5295293874668756,0.9044843024343139,0.2564088538239391,0.8169705387288737,0.33545434196792834,0.8111654893465212,0.5081113039417839,0.4360916373819701,0.7357665783346983,0.04076999584048879,0.6526122243375729,0.13273590054827222,0.17283953004367136,0.5032990726266056,0.3221606540832882,0.12901085144819735,0.9424526389951544,0.862559498452367,0.166562252639616,0.43994822830242075,0.644034991764542,0.31531852262720883,0.004565105254599855,0.3913601632293797,0.8281262317338169,0.4294310894091773,0.2935550288421809,0.5101798785023457,0.8438846275838594,0.6800967842225731,0.19429223350818403,0.21424222481186783,0.8251868994307643,0.2926231705935034,0.6386027928284459,0.7701880488548014,0.7848230759648274,0.7969499836407921,0.8358637310079462,0.9661271719453439,0.6804677718082539,0.44891630408294714,0.7339869108440282,0.7464367020012914,0.4211662424332201,0.7707243590206441,0.35703182832975666,0.482983756347086,0.11534070257858442,0.18003592216385655,0.5665645685058951,0.9123472610109649,0.5974551921071833,0.4000377255152523,0.5816828829219476,0.6572100954220161,0.31580080852163994,0.9863230661825924,0.44572521740400606,0.43259823257766783,0.14640145116309689,0.47675708019630014,0.9312926510716675,0.6221313146330272,0.8493492081025329,0.9685943643338137,0.2015682649733601,0.44370530363686966,0.3046984615849939,0.24018295269256762,0.12096598493494715,0.48786130236562597,0.5452977268593382,0.24572430177272286,0.9000192253502868,0.869864907703612,0.04780067787603515,0.9297891894897325,0.6387338531118978,0.945487418203989,0.032331783208306764,0.3555651919904077,0.8750297395818911,0.2820844118793324,0.6507110656881698,0.7139446922531394,0.10285224180332397,0.8946918083357924,0.5892564401468074,0.8093158635306086,0.9707165381150986,0.1688023172126074,0.9669825376504579,0.0762007545899337,0.23226222779400052,0.6189021616495884,0.8431431692198483,0.4292754346262311,0.32078990412582287,0.5270291821704052,0.8800677898122149,0.6005526209276717,0.5865134182327698,0.1340100910556814,0.18344925140969637,0.4919252131545868,0.2772840260376481,0.0015442213441383412,0.5473881630763573,0.3141590467565214,0.3035462583187858,0.8032825198895226,0.8737770971994978,0.896443769877465,0.34207774017451764,0.5339073420757725,0.8038144821863991,0.7153337356292953,0.997690062726379,0.7751056548830275,0.5015798084208678,0.9098890012716814,0.7925678191600758,0.788516200925484,0.9035225877440054,0.7344756078426249,0.542946893460436,0.7184038611146943,0.16729309504955014,0.8347489558601049,0.5885987997038167,0.623637553357572,0.36059617492372853,0.07130891261098804,0.8644688653601458,0.4263829841522577,0.4613806872657704,0.05917743606226411,0.8226052822875947,0.5706950094187795,0.27706188411756094,0.4846564671740359,0.9758599148098368,0.5589222891002146,0.021764944276995823,0.6445375533453375,0.7010943246263484,0.5490661297188546,0.8467891869049198,0.41452355340405544,0.18719761779000432,0.18189714392468237,0.6932870096704926,0.5636280911383185,0.0007717429443645507,0.6354678565897567,0.00017525878954804952,0.7327058292052409,0.9336144957874752,0.6339464299891338,0.8196587311870696,0.07544221505559423,0.3956923864897126,0.5250185408954833,0.43580048649684033,0.4149430034559436,0.9083690397954971,0.08098542000893039,0.02406052503242262,0.6883358556442531,0.3909793248211275,0.23170514064015113,0.25454284989745246,0.027328261171952084,0.02630384011973308,0.2970407442546876,0.2547413286140139,0.6508629748752122,0.8124643744409261,0.9873604797837745,0.6438825508316923,0.7498758721784407,0.885145072573317,0.7368255610634042,0.5833111482099889,0.5367568286679432,0.3054006257528272,0.9453088485177714,0.5033681775794812,0.1864963190531117,0.6355940184455682,0.13773571349898872,0.0705431515692172,0.1184861904448602,0.49797548069988795,0.7503711715747861,0.7940818649437926,0.25762196575007423,0.8198180760992311,0.27449093973515337,0.7383225679729364,0.9892480444323883,0.6834275411255504,0.6484569783240592,0.7539477560488153,0.8198379886217644,0.05345913239899791,0.04341695951449709,0.58649192620402,0.17813387428801208,0.18889519987283876,0.1657636343367448,0.19317127844526993,0.6380902863147366,0.43606122748700904,0.11443368316210445,0.9719969128305377,0.13013180850814376,0.15616118436206894,0.9846108149085795,0.8324795849388136,0.49579746419006265,0.22443025449435705,0.10325482673186115,0.7842410348695394,0.7576157941070369,0.35151454304993757,0.35141364119987095,0.9434873556009973,0.21607274617230554,0.8083300943321043,0.8360353726786971,0.9715485164108508,0.7475898141796964,0.8287172994052483,0.30000452984026116,0.15317888016930037,0.32501263875684416,0.7157531915401121,0.2257063280614926,0.9912232983796487,0.7920378793087484,0.7242522679704912,0.15984655126485214,0.23433749257862302,0.5699804579735179,0.669756610864066,0.10119409670767743,0.28978812925838304,0.07233475782381937,0.32104716386919807,0.969256659343837,0.5178779290741495,0.8782074521276579,0.4636343116877013,0.9941741089923157,0.5105609843750332,0.21368064740640058,0.3934295566844863,0.8195641606497035,0.14019203243160794,0.8683954725718979,0.2598989823932798,0.7139885842931344,0.38620278944963804,0.7032951740183031,0.23529708499658541,0.4409563191975894,0.4664590985675334,0.8473915124158591,0.29602195978738566,0.9066610806662967,0.1790684118449375,0.2253558784391827,0.4494991248557241,0.12114439683175804,0.7005093481045999,0.4886281570906694,0.9424349223045769,0.7634700976175721,0.2327265684470572,0.07417481370789236,0.5016407325874432,0.21190532695999886,0.032427415763404355,0.14804316473967005,0.42379461652856487,0.9621395985534202,0.7630060101096194,0.647769280299604,0.8870947286106039,0.05228622435245911,0.3878254732093782,0.7971067393169471,0.035931566050415586,0.8749656419281022,0.07256983085657076,0.660492548675625,0.3600817987522136,0.2253622674995326,0.945478860993533,0.43948625619534076,0.39235311491360547,0.5703322160903914,0.27808557222574093,0.9782826096983681,0.8832612751902857,0.284624585025933,0.6544707124296472,0.7287678631064234,0.7751764113567516,0.03517596887283014,0.9259114686257062,0.20485586635954012,0.9620653480749197],"mu":[0.19088368304569725,0.8291451302814312,0.47987467637957915,0.7951792761411576,0.5167329635625475,0.2291427544571294,0.9927441305119895,0.544394847065254,0.5188612439745233,0.7813403763568647,0.5377110859851986,0.8280520304992103,0.540979112209452,0.020554315897805653,0.5845894730185262,0.1129066888958512,0.9382311716670175,0.8982355669202755,0.194058841073818,0.6996663830395882,0.3283135893508635,0.32731727045142556,0.8249489349626831,0.9627694037150156,0.742117028430543,0.47838977135073923,0.9238392541150833,0.09261389255987562,0.7110179297886392,0.2491210461241975,0.36478753725459456,0.9007231664323809,0.19603791843764506,0.797597020895207,0.41386111422114147,0.8543437366644862,0.7475066625889333,0.9111368944254707,0.8867461011352271,0.7167978371228505,0.7285580414784096,0.8006515637865919,0.552859277438807,0.9012758453278313,0.11468534777602701,0.25929354550409944,0.6951936496286781,0.8282363906912542,0.039639445082345626,0.5680370530843644,0.9484204156692972,0.40460096851545413,0.7662409339232268,0.9915840164924747,0.8107464931359465,0.6170891455695457,0.8189212157536907,0.546699966488333,0.5784433944713618,0.4215745411188414,0.4986828397808445,0.1740701451979192,0.45989939623756615,0.15318237409348545,0.3926410281906516,0.4147977347280227,0.8713966385098333,0.42358324805817404,0.7294236282159825,0.22266976340007427,0.4166501105969773,0.13163657468469947,0.9073555160781812,0.8205282968312804,0.6262120800842215,0.14645065154826553,0.24624842397738367,0.6883607044986195,0.9425501192372978,0.8442423187764749,0.43992787325959726,0.17003032487760028,0.9519712899923409,0.06144673033258918,0.22364060012016762,0.5779417901063688,0.15567656731287527,0.03677315328526043,0.9478584069522875,0.73022748544603,0.563904753019459,0.13743969507288,0.8649430070431263,0.9240976147171465,0.5039677759843024,0.5203048405428532,0.37419118503752036,0.7766248861185314,0.301437756783147,0.6675377302562817,0.9489660336100292,0.6630400776685421,0.5098152861401799,0.19638431604134254,0.6909331194323216,0.6349462611036818,0.5451977987126355,0.3676222008228305,0.7377139406201647,0.9671286960158159,0.14489246756912721,0.811705362373639,0.6762886475961178,0.17780769523525053,0.046160811000596436,0.8478164012714529,0.7704285529075445,0.4907184509539386,0.4281412337689674,0.5169535008044388,0.07603919699822503,0.953086297357906,0.21491948064432131,0.7154381998710029,0.6683439589326434,0.5876018491847104,0.8738122643570556,0.16627223249549394,0.5640456060456311,0.8830847177496681,0.34555839728320303,0.16049501139336475,0.20081774467456004,0.19484471802152425,0.8810124321565604,0.12423305661008333,0.09497395439282963,0.21300990422839972,0.12514794943488572,0.14923758373142526,0.7048215537007987,0.6992721202483763,0.9310003318874578,0.030481635052870715,0.4345220137084189,0.3052661258831306,0.9435872970497146,0.05758282921393709,0.5764903426848635,0.3642370230963683,0.6787826752134822,0.2456460476186515,0.8814787074793509,0.9774445971763195,0.030540215763618983,0.7027551543437585,0.5434233617413853,0.5730783600869052,0.3579551006461623,0.11811013076412924,0.45222867434241154,0.08312313027718465,0.6053569121728541,0.6004394648233076,0.9229813935127438,0.9267091424192413,0.2244666132623243,0.8608670120769095,0.8903424213522009,0.38742371664490105,0.17627276338824327,0.218918150202436,0.6322796876077867,0.6612564170316659,0.28809308534618805,0.9031091323666434,0.33444186016006805,0.7779092345508463,0.32140141542872414,0.007091454456855439,0.7151591017781098,0.5444898784539716,0.10373000396932874,0.9670892178921666,0.8648117743697941,0.2968120989591114,0.7647688090209497,0.48593497604348257,0.37762564440384194,0.9720020468818786,0.9975400053181087,0.845645957912599,0.6122862166145233,0.037568103013451815,0.5010995876577058,0.8971566396405604,0.2710611778242431,0.3010720284035906,0.5137054323863288,0.901501156798239,0.15825693592390433,0.6370647675830667,0.7703495766161905,0.423448579865773,0.08504695378928973,0.03685138566210577,0.15021291719974572,0.49508943317067655,0.1408576580567491,0.3463915518356493,0.44027944345250014,0.38293535702272274,0.9433856557781204,0.454742738241388,0.32375200331793086,0.6853601544634838,0.4950407055526096,0.24916066315601326,0.6918217435923901,0.2630459726915839,0.9928333000122265,0.7538318160787048,0.946372067846786,0.080605984980477,0.1889075711478203,0.8626835608922772,0.32475805631035715,0.8351799018124468,0.17406615577357187,0.8865553520455709,0.8155461644523336,0.4271065203124851,0.5698911617592743,0.1602975918806342,0.7858663606874678,0.6172828323024249,0.603775815465396,0.5774901011181597,0.48917098051555663,0.3503653970439373,0.8452991543071058,0.08156860609580074,0.7690175627420863,0.37764318280898945,0.9642084867718987,0.04263877962823437,0.9525490795112799,0.903195204038064,0.173898038133661,0.6754449040758774,0.914156812270029,0.767341816678452,0.722944455003339,0.646692853756488,0.5930043050181322,0.33282891085658317,0.7306934393923872,0.7333244162118087,0.6391253454758963,0.8109105850261191,0.7080361973772253,0.12152213268961831,0.14726846175147346,0.3260142786157021,0.25536931471795166,0.7030117582755702,0.3439711419703637,0.6007028205301586,0.034120103624527554,0.4946083638580796,0.2666585465170799,0.5262276666896,0.669298859307637,0.18028080798168378,0.5238147339753767,0.05534510948985161,0.2693508672783822,0.26736004525466717,0.057678857008393924,0.3720341920574166,0.19279530715995863,0.004875465597642181,0.36016363856410827,0.44071192689842653,0.8574781866404704,0.5012197185007587,0.33034378721940194,0.7141905982446668,0.7411097704612262,0.8915515068982292,0.6482470937544011,0.11138154071139361,0.2309946312118798,0.7147631538522135,0.3933926637032008,0.1290363507761776,0.0388297566080964,0.7735509982293842,0.5173959771713175,0.5634063572142334,0.35777259463503563,0.037530557108302,0.5602844881676139,0.4161587935157922,0.4862815088667931,0.3272716103876889,0.37973902769835366,0.6874699467099443,0.18303128186361017,0.5373518299134188,0.26633642617947717,0.3402975857446082,0.17422892956045266,0.7408595534538285,0.8800259341776984,0.8670809783310247,0.9572551052381815,0.7791449535318731,0.5656553257502461,0.39124917880838894,0.18414923453712917,0.644131636764633,0.9045377993190729,0.7099576946838926,0.495607286327048,0.18963049262922094,0.41512450418060864,0.6796391546280205,0.13100121110552254,0.22624167001723405,0.17386779518252649,0.7408827726479452,0.5308714328972488,0.5911877232456937,0.1621975720082265,0.9870661740760867,0.4030102472214958,0.4961847784948008,0.18892476976703887,0.6460090420577649,0.2561346093820094,0.6759865634429754,0.9552023309762065,0.4411511348169721,0.05590805831868839,0.5549067849811808,0.8719427134058766,0.6579115775718694,0.4545907623313412,0.3527244526268567,0.3585035282968103,0.16422600137066423,0.18702555878652438,0.8153251131605965,0.801258595376924,0.8447355381737283,0.6087804670949322,0.8413828959799556,0.6181568681846956,0.28366669268728817,0.6891111866754982,0.1643029033399892,0.8733934430891317,0.787268890573201,0.14012340585091243,0.45671440571073063,0.978593401930576,0.10836846369983033,0.12492559348446286,0.7466068997148212,0.851908110751286,0.6695124229225262,0.3959357502334777,0.4096530895366026,0.22935409309683275,0.15691259298178917,0.406390611339976,0.44118503023315614,0.9620403737806089,0.3339551357334327,0.9039072354147266,0.504368657067455,0.09687117682876667,0.8277420949800014,0.6232138250857862,0.24558212823075332,0.6507153817541556,0.8190085904664193,0.9297070468075419,0.27474413887068994,0.16712620137748657,0.7889422331752323,0.8120916549118065,0.585382359320963,0.6987794928339683,0.1806594779380133,0.053533669066382794,0.46533866129271684,0.08550393862577166,0.08209810134180118,0.9235174954074548,0.3814194920513978,0.08057549298626054,0.7454702892000908,0.4522206335333778,0.10895895309444881,0.3713110654759533,0.6529113302577507,0.03107536993725546,0.5102669809601486,0.8945954103037512,0.14340318660845242,0.44469982182173085,0.3729747631306466,0.7059550581506879,0.7983807022060923,0.2811839908017941,0.6838768370723363,0.8624590396327083,0.870613814591626,0.31819915383582575,0.9024228696762178,0.4910415412662894,0.9160362073107153,0.011727909416069604,0.03199892690752426,0.35961825048934415,0.9184575199068741,0.5059937901919553,0.42871132966035974,0.9060784836899356,0.22592055564139057,0.8224822907780642,0.1995383436535818,0.7816217081888337,0.28081794628237433,0.1599786788350812,0.34727083767000577,0.3614069756589795,0.5756182540365895,0.9966922410567902,0.7660315293174684,0.4852737351306897,0.7719901382691565,0.8310587541788719,0.9789049709495143,0.77868279644899,0.6816447320652161,0.4011317294448178,0.3821598314157415,0.20332536169422588,0.6165862241438214,0.6667120168337026,0.1236819941572278,0.5678877158302766,0.6399957078089036,0.8431328719264697,0.3138001904938936,0.6269636538017249,0.7987662641570292,0.4339702224240607,0.1288363414029705,0.6941857820798578,0.5985391442346111,0.986868467158114,0.7374394383718208,0.6733196968357762,0.10449346185321495,0.6899284251638871,0.6444926180263846,0.9553123721028352,0.24467858907854523,0.9999321366901224,0.9850721780772087,0.10898059628105239,0.46380492152235764,0.003344301316703824,0.26709402678688,0.7481284671950119,0.9088123858850106,0.25996014237547893,0.5358686831817812,0.9348168022947729,0.6792665590637745,0.33903454871265026,0.3929484898065878,0.11369382269740069,0.8727692193380647,0.9306605472593741,0.7311730806462367,0.804119188963017,0.9384695005996224,0.8511190894650209,0.5654252024586601,0.4291418326351615,0.9260508106925918,0.8728432168052835,0.34917069939709555,0.9576602963815992,0.2500698320962367,0.8541911278293062,0.7588864120972958,0.11699356568205554,0.7959777010727898,0.7349700207330563,0.27140159039579737,0.33369883583203896,0.4860403000497846,0.9398740163612045,0.48007272997793105,0.5506423347025002,0.2677770316115755,0.1285888284530401,0.30672085946060923,0.9311694688696344,0.7368736236049784,0.883821366546867,0.6185951588269583,0.41135564360123156,0.7521070911094954,0.7274582659237803,0.30500672556839237,0.3460934203833128,0.489722973637466,0.9693826036312121,0.7841929436224211,0.029288247270966572,0.5243410695117707,0.8097616581524236,0.47146174253330875,0.4405938362139372,0.8507309259100861,0.7261944825428179,0.10077827338120038,0.6934216158570403,0.36457624816914325,0.6182638937947678,0.9268662965540866,0.05824439927210512,0.916051503217604,0.8200336500843899,0.5631965183299841,0.7285694398963642,0.8738374812317844,0.21084385489384694,0.6080157662279642,0.4433665865957708,0.2752809459617507,0.19289345221064313,0.9132053808382179,0.9320919906038345,0.20316276542746836,0.4119506360377887,0.25904794891268534,0.9817346997749903,0.9249360246798517,0.005268737569944282,0.3366335079917626,0.4353348228189684,0.47922095647669716,0.932432920338881,0.3898269497477884,0.307672336969921,0.9900784441373303,0.1780513219890425,0.3236205895517108,0.8957098947522992,0.03506816046017991,0.17873430266831303,0.7537024527099707,0.6554471178727235,0.35046064441407165,0.336038033458401,0.5451495575461187,0.2377300750988216,0.20120989692296432,0.06528958425255693,0.8817650294097246,0.21534354527893118,0.5799473304364013,0.389479302419514,0.17123848838813838,0.09551299849554096,0.522069077429943,0.2594963696692554,0.9512004050813312,0.591084237610394,0.5453963718791495,0.4380613670172051,0.22348698352611374,0.8484491077797189,0.1820789003057477,0.11889667882951627,0.3123146647850039,0.17047131202267707,0.43209711645523097,0.16128943125899942,0.2986009074234184,0.5345682570167738,0.7303498851274162,0.9114670570590673,0.7690508961744835,0.3483113701464373,0.8108492209276263,0.863768588916882,0.6174991459243191,0.061274921326046616,0.4175043638491458,0.8012468521864651,0.7639248915254033,0.19854744168681204,0.7071742903584508,0.47318467699833544,0.2938467084662455,0.9065052907294047,0.5484604332298897,0.6953652337429246,0.6307313503701568,0.6038758342928621,0.7754028981498486,0.3742926962443527,0.7140694453564491,0.9122657608448941,0.6674284596606133,0.4234555843872241,0.5277217420837899,0.3365714845862684,0.929844546158676,0.7192888259882542,0.5165003277051703,0.16836040132618635,0.28502526498819813,0.918994287305255,0.5001350433748173,0.7062274180010104,0.9861395596621956,0.006213924387181491,0.7103754145809773,0.9698190992971405,0.9281833087404436,0.07656146196999503,0.03378892969022074,0.6254642336412819,0.3029183285757544,0.9104937527644668,0.50299327589669,0.49373068922363417,0.19207473798231312,0.1941710243085193,0.8849937891719142,0.5802468306097677,0.26826577699315357,0.6139846202107924,0.34771326830869653,0.11589677907538953,0.12060160465187564,0.9436665020126402,0.7136879843572377,0.7995614839503702,0.25599554825614934,0.7190287565408537,0.08652229797215338,0.9458202309835777,0.5159575721183001,0.20737158971541225,0.6667990725469084,0.06640699591365928,0.025241135914588764,0.7162974060548528,0.16188499903770315,0.2717906382354298,0.7714463234498379,0.1332043359304993,0.8717145047532489,0.26140772030911164,0.17050610196236993,0.12215394707210381,0.9177834980041792,0.18581328287201182,0.4571576255110563,0.7872277237759098,0.24108453890080228,0.8741502274416237,0.3894345023999568,0.1656936048927271,0.03398071822600457,0.634528166213975,0.969605627548068,0.41260975602950745,0.7407718082507022,0.22952549057351956,0.3802057711580671,0.5172817666456904,0.6803435991239317,0.39520706895059377,0.46046723689377567,0.8425323181784146,0.8801960468799896,0.6225886706252035,0.6424565128384254,0.6269857418316391,0.9261094140834785,0.6330121526819306,0.6560440546949005,0.13112886009287594,0.09987482665345437,0.015486203653794384,0.46389357664800746,0.49855311681980563,0.9877252410928259,0.4405351318132309,0.9480173091315061,0.40479709329416735,0.4719458431901393,0.4612526404571451,0.7239137645815648,0.9024568019104253,0.9427314232815958,0.9669563605319946,0.14163099976981752,0.18077588854784188,0.5344816885626507,0.030107637032398937,0.22410542117552135,0.3545921857439869,0.14302870264056966,0.34158069880021213,0.49244414188026764,0.5941461277421685,0.9159763844378217,0.9914169740300571,0.3374218047890414,0.26026870428015836,0.21071319833979052,0.5347181500662805,0.5749475590686299,0.6473123160846799,0.8435515452981004,0.9088446613340038,0.6610771980635124,0.12375543675833489,0.45277583132318777,0.5813183656656222,0.2658328445040803,0.574407447905918,0.8277763774719888,0.8182131482582289,0.6702736139428467,0.10821429973109753,0.07264309925112267,0.2951194362089571,0.7672691585523184,0.15972084675641285,0.439795324171919,0.3157430137474002,0.943964422121778,0.6885020643195117,0.8116013882663151,0.9189092710008682,0.9385519228227464,0.9556581472816597,0.8700816640683735,0.49761059123023754,0.7202170217968236,0.556664152521585,0.25861256137388877,0.31954973991954905,0.8898916274754571,0.6191247938212809,0.6383815002416566,0.6166121476408781,0.8054292353631414,0.9102387352380048,0.9621390664369465,0.4187374613047852,0.020775579904421138,0.16402991637804942,0.796600067844196,0.5354164043782297,0.34157655561593914,0.07269730420546927,0.31072398157264414,0.8546034157272393,0.8591706096696867,0.017944382926361024,0.9124783929281588,0.6263983883760704,0.032563373549658214,0.37301250869890934,0.3612747378820691,0.45903758874961453,0.4796450521357911,0.05402183954944806,0.5869653298095576,0.776744619970432,0.5915544672999213,0.18685955593536563,0.08046272707302293,0.6157331991841581,0.6641381574395788,0.9166011433214727,0.5059614936031887,0.5815078253422696,0.4121855203285487,0.6880864483258515,0.5384218199596549,0.7855557092603394,0.12462478433679669,0.4085496382836955,0.01045577501859185,0.8170124968596408,0.8711758353175922,0.6474766500291764,0.6102028082007143,0.7969939118542517,0.8046747019985292,0.21781192136334404,0.19567993414970553,0.6866743361612002,0.3261261983015413,0.7023959293503876,0.09235398095830805,0.27980890939731085,0.5993125160480668,0.4943599585498608,0.5771306922576591,0.084478446526975,0.311851438713173,0.3911229297245882,0.5311204442112922,0.7263175056087663,0.31949205995577534,0.35424352772556933,0.7687398859044858,0.3373406121787845,0.4796352452040067,0.48359617054189963,0.08726397342570524,0.8082370511111532,0.1901943086492457,0.37742657644842725,0.10201810721769689,0.5723669850005393,0.910301793884351,0.8802709952427259,0.39005110418492395,0.14790131705921206,0.6581530447216797,0.8205050129776832,0.16797527875584795,0.5294727260604037,0.640882497271624,0.8079815387500744,0.3759240176116392,0.27359769330939976,0.21663349545156607,0.7692880010005658,0.9730146830393238,0.14745947636386614,0.8921350985830654,0.08194800566575844,0.18242210729870334,0.31235592360444553,0.6102670971067472,0.1491509529250472,0.5491159595422124,0.1459031669636277,0.49661356782459465,0.4172491158500353,0.13121552669629066,0.5069050255962033,0.5522073394723983,0.30243926277198985,0.553238973451126,0.31362073503416665,0.15443057424884832,0.8746381581032783,0.9482562803268777,0.17807831612541447,0.877433001989097,0.9108701395855421,0.5020048446865917,0.4949717451746225,0.5369326464196242,0.04804890655453131,0.22242136922721722,0.7442566140434477,0.775626393473283,0.9240843280298987,0.6770749921444015,0.6798138953192814,0.07690899208594115,0.5773147845697408,0.7662564660980493,0.0254121439168713,0.9012499528453237,0.7368212730637151,0.8854326351977477,0.6861998567701282,0.33273167236434253,0.4970144602338964,0.9756935835308231,0.8848460529525584,0.7916316814132947,0.4325327132157013,0.9666806998881861,0.7346578267193735,0.7895335401394661,0.48076057140953,0.6683740882072291,0.6272338911392241,0.3550140894199705,0.28126898859935,0.4684862957093905,0.1299168807998985,0.7792048797098927,0.36951770501491366,0.6758643480064894,0.2836291067632193,0.47523217610425195,0.013442390193667775,0.21053713617585434,0.7029132657222854,0.8707728359630367,0.8033331761666151,0.9843645445708924,0.7746153616488407,0.17161987891729358,0.7769927324599837,0.38681009267042743,0.47715038037563207,0.7697995062559069,0.5530900552591209,0.03151506597608833,0.5557534109700277,0.4517730571256733,0.7141953995733095,0.6572260348194401,0.4652544154598448,0.07056420846432743,0.8366174668981996,0.4778239786875189,0.997974129063772,0.996734441510079,0.9546254607437685,0.33990341812007085,0.292333941952887,0.21468394571350835,0.8547171989090083,0.8519211892030207,0.5532299947221571,0.7793137205987513,0.8949212571946239,0.6501268928605397,0.7328480959423189,0.5774772619393547,0.7536979996806876,0.7834478426058367,0.6014176793760633,0.4265861069756667,0.01984020043342971,0.4189133776880134,0.0623010338156984,0.10695797366715687,0.6088647293298199,0.20568820615667027,0.9902171465680951,0.38945351012317264,0.44633495135142764,0.9455186349832541,0.9772742056448982,0.14676147448430577,0.7068069522023035,0.5242980522277105,0.8127863345682613,0.3829645587691193,0.7600137037919055,0.48158438964371464,0.37722133093233534,0.5101365262632704,0.4491023757192212,0.32905136346375796,0.2581187280964228,0.7544637163724486,0.5672422785935738,0.4376985343731148,0.6201139554328683,0.07057693870415283,0.09451051409699929,0.42895857464610376,0.22617083297779694,0.4998956838476427,0.40066332482014655,0.2831878879408751,0.636773304508375,0.4885768561680015,0.006907213238909193,0.9191861962888994,0.12273215100264467,0.5529581661462573]}

},{}],72:[function(require,module,exports){
module.exports={"expected":[-5.6459488573615415,-8.467163263523727,-0.6750375357203551,-2.994500443943675,-7.357768793579063,-3.648482870298903,-5.277096694180534,-7.558444887457193,-0.43130030032184585,-3.413935840710889,-1.8177425451077478,-4.340033734189985,-7.371531126026182,-0.022209086677740325,-11.426573658917114,11.79027007366566,-0.13601319486471708,4.270379071784051,-3.6701372154374248,-17.102927644395287,-15.260355849635465,-6.621621286833775,11.86710556116691,-3.32816855313258,-11.494574675575128,-9.433135768635635,-15.40530326871949,-5.443162810668479,4.977888800224511,-6.462495079543117,5.1433620455010445,-11.510086022806561,2.8634077830927644,0.11583698263406506,-0.6409717866572255,-13.78289097844174,-2.3355002791241954,-31.8146585454337,-1.3315756659458207,1.1919658362358838,-10.695701270122214,-10.06399718766652,-17.8557366729547,-1.5065119942643674,-9.495522638302862,-5.100522269896641,4.764692522780935,-6.918817043635081,-10.581285554015269,-1.7187823842470007,-6.253305195780198,3.361195961136552,-1.7999162990267263,3.8382188196757614,-4.981377371299443,-11.931490381194406,-6.2232474985195765,-2.468754086826009,0.1550537341355288,-6.721529970256608,-5.435397229665792,1.9083390359345875,-4.814748004014795,-4.648780791543574,-1.031315287325472,-2.044203306362511,-4.389473258923464,-5.49554174342992,1.7749127262492759,-0.5680931298351322,-0.7823461067186251,-3.9576623119963408,-8.318751742855282,-7.2383059734926825,-4.239266015504259,-8.999717565189359,-1.8233161091570809,-5.369341474641869,-4.357676577063222,-2.841142343377049,-6.052147960545351,-10.605548094204554,-17.174208621277028,-3.933791888480283,2.976905392292828,-7.004550908686995,-3.039624327171637,-8.982745121598846,-9.992220296795232,-8.156714802195904,-7.080507679944116,-7.9365228410466635,-0.5731659965610086,-4.310561098509424,-1.5024292208259897,3.530512473007689,-4.382015257121705,-8.629304497506222,-3.5380712778227865,-2.124678760794084,-6.911528434015322,3.1669663012051696,-7.449951181802102,-2.10800931849064,5.1027151157602315,-6.627380105812042,-1.331101058965916,-6.317137477585474,-8.647704528031818,-4.670259085987479,-8.692732704988895,-11.856600915225778,-4.993050272911908,-1.7859617971109614,-7.108970994483848,-3.178288630658733,-1.441133689199714,-4.683339852399862,-2.9729293056961104,-16.640137897714823,-1.3037370973753877,-8.747528021153961,-7.87237681458496,-2.3506933598958075,9.849742938387644,-5.316975933761934,-7.873149036971917,-11.214122716739528,-8.81158627095317,-4.4273528703103455,4.0373049781313455,-7.444541121819746,-9.844576187412654,-11.380736993400953,-11.231026005495742,6.268831034133277,-7.586587602267224,-1.0495165427485775,2.7961408434875166,-9.45695656898914,-0.5853464119529944,-2.1812182556466557,-7.322380363453984,-14.474277283645398,-4.557294797127578,-7.103062010339162,-0.01963659368051829,0.2585376655509486,-3.5161753650759797,-12.896850623183571,-7.591239041557309,-11.053508007331475,-1.736327251834815,-6.280564142988809,-4.366973999177306,-2.682952414434819,-1.9179865597453793,-10.88461167351169,-6.243571776775203,-7.866098104069111,-6.555297379645558,-17.095052949371585,-8.851251557519785,-8.778371617842657,-4.746403904387791,-5.714780000409535,11.396219922813941,-4.256990575535754,-6.285094742883239,0.06133970394003996,-9.587751419751193,-0.4713264832723001,1.7551367986679915,-9.384096783558867,-0.9652126678561279,-9.919870281545348,-2.6918997900997925,-8.587752353927707,10.485825891379955,-0.855177894748568,-9.52879225393642,-7.89681327154825,0.2856362092232416,-0.17019623775980097,15.846835246081621,-7.474493535041287,-9.122268132820528,-3.293527600697591,0.09669585137580428,-6.9292568218443815,-9.30692385081188,-7.216540206010533,-2.124556550863513,-9.203126997603071,-8.289009604995488,-11.223300584398732,3.763192623771433,-0.5496133711163268,-8.279850383104698,-4.803555602312209,-1.9176094954669645,-2.1870367912400486,-1.9022341326078092,-0.635641238918845,-14.53726440833299,-4.162864106159349,-11.246620456995311,-11.002506605733473,-13.287796478940173,-8.987439082963789,-12.668905487960028,-6.270979285976598,-2.739181494771569,-5.809742236236643,-3.5862415723022654,-10.003409827359466,-5.5862509418055915,-15.84861847000834,-3.8303606399185797,-0.6379621168873477,-7.197673661458012,-11.852104647400596,0.34463614345646,1.4044317813052534,-3.6620840855946457,-3.1403896396235376,-7.805741114956474,-4.211490257186971,-6.271944248651609,-4.414375832204529,1.525400789503636,-8.41685735014606,-7.369426075868447,-3.8715159080641874,-8.21459181069257,-6.618206233891064,-4.882313919452697,0.10880293023261078,-8.819274016999698,-5.208367269318593,-6.1133010734900655,-7.143771004082794,-4.643257440990753,-0.9640941380394943,-4.6070010286585985,7.473215353746847,4.05694586383666,-1.7649700123118448,-2.3647450172801605,-8.484144930582982,-4.275108047353964,-10.247394079593878,4.179957758738565,-8.563377259510764,-7.554676892699121,-9.096123693039768,-0.0947266036874792,-0.23525574037890618,-10.02620401234805,-14.525547245951511,-2.214347097839245,-11.672879096482012,8.268232801111754,4.992961463392652,0.5754528376504322,-17.273217913203663,-1.9442537582421657,-3.3890851965990394,-5.808618509193963,-0.11747305300473943,-5.203804033235976,-0.5573130768312885,0.3543093309674159,-7.007706533606877,-1.3421496034334504,-3.081903994843196,-3.63967778951407,3.3859272541221817,-10.338129626953371,-10.695165862540224,-6.255954250748791,-2.2193017013652607,-6.142289843355938,-1.9766355962647024,-2.951022983241106,1.2147807006641513,-1.0676857600586216,-8.741959700561155,-18.650989067644286,-3.5759681001457815,-5.511998155466117,-8.835163540558009,-9.014819497011151,-7.733835200322566,-15.149387100846214,-6.394877986927382,-4.022391576796249,-0.057122361371545693,-7.3887627954270965,8.734701177900517,-7.832615886766349,-9.96886629083374,-7.876587656987455,4.290599677114788,4.241320874892844,-2.545044692797891,-18.491995188171416,-4.319481927054577,-3.320701867000363,-1.454655005640981,-5.073285311951354,-4.069318395641413,-1.5034956336058254,-15.03652797780342,-5.34512865988394,-3.241922935810209,0.1458597479260525,-1.7934121623702186,-16.349020066950498,-15.888104765987565,-6.981970634385428,-0.742880487430098,-8.186004706345514,-7.185947507173872,1.3949126917149393,-5.694154136914541,1.525855156839671,2.362867678080222,-4.1690195498028935,-8.354770957679495,-5.425411749978586,-27.4232396613102,-9.044737553229862,7.565991473119743,-13.756952141984456,-4.456465059586432,-2.866870845547031,-0.6965693832277846,2.5694033192273373,-10.419014987860606,-1.5121133377364369,-4.751668602236217,-17.780398285425438,-12.118103816461085,-0.5210865484771278,-8.596109798808342,-0.9824124180239746,-6.173500769566276,-0.1312558922420205,-10.067738256756307,-7.698929657170907,-25.707114697856614,-7.8599833263449215,-9.262473359436978,-5.800208667166467,-7.851090128504583,-4.802612403717724,-8.73699401872662,-8.907626976342062,-4.5540785254861404,-1.782220957415261,2.452233528961882,-5.804441445739656,-21.96146251331636,-2.9936864350450696,-9.04152517766641,4.017992012498075,-10.481598201379594,3.4633050491948256,-5.821202169931386,-0.385085669258439,-3.223482311787389,-2.6427404241880943,-14.386166988513342,-5.211319770165453,-8.720062069196727,-5.142002474813977,-14.220278571058667,9.923591649398,-2.925287833118482,-0.624594500007416,-5.353077080675286,-2.5229871248276314,-2.601557773124794,-7.683216575010519,0.5799608881808657,-5.659936128372818,-7.189327389650666,-6.7511525441253255,-2.9310374955023315,3.2751945876953084,-5.492548131726848,2.0721659004521005,-7.372337959266969,7.192289238832746,-1.1858873377962842,-7.881307917332672,-5.731444739118323,-3.1000151330804635,-0.755885111695364,-9.907663953458945,-5.031940208510484,-2.9139732047757994,-6.612411370974441,-13.830553532664208,-10.111083836592238,-17.374236085852665,5.625233928772602,-1.5720121622041352,2.602544855292231,-3.821402451903369,-5.4595320174827355,3.1808692980285134,-8.055420620101064,2.0911589769810366,-9.745701071895548,-5.299233024781561,-8.640726876044706,-7.400538098764736,-2.680294861024813,-8.18197058785353,-18.9800923744371,-5.0935128850803295,-8.31219986984999,-9.70372798584147,-0.7755294491242004,-0.225672013040233,-2.1655490589058983,-3.3643692263597353,-9.107824459069576,2.5364404034118424,-6.126883617596513,-2.532218742945891,1.1724728111948552,-2.858543408409128,-6.2790393969072635,2.3775605227485044,1.4663094697223247,-1.1882410470196598,-15.232085947873188,3.571440658036331,-9.65905242816974,-9.516966798752957,-10.507611605790618,-2.858855171117668,-8.4143234258619,-3.628949226230311,-6.722680428100906,0.7130868442280391,-4.791806788130771,-6.6537705273982235,-8.558172149060162,-10.532037617825754,-1.6434987756790387,-4.51786639169514,-6.955465963692672,-5.404743890685776,-12.8575732450592,-8.87327207140503,-3.463922008103925,-6.501449027539879,-6.542402450191901,-14.170984174991705,-2.789637897713289,-8.662939666260828,-8.0038283672336,-8.858361265710421,-9.461512288348708,-10.677253994257361,-13.468729957103463,-7.9309160103072,-6.843230813169879,-14.689610377596942,0.5850113515562971,-17.922600725241132,-7.957192585953279,-15.053143076182021,0.25330590373265327,-4.734836555201138,-14.367697266252549,-8.87398992409209,-6.293529652075288,-10.16186938445259,-2.774101375208168,0.7906484230088009,-4.562101367278492,-3.665458076965184,8.843528080562557,-15.727384114035072,-0.6824349194414057,-4.445010838067282,-7.15456615537785,2.4276905250477205,9.958438713163577,-10.87345381546357,-11.833656919197333,1.633174540776157,-1.8508567651683208,-0.8779426987475553,-6.383546536679745,-8.088933326047085,1.6572455618875943,4.007809420010352,11.446089773744973,-5.109609703893257,-2.738799071383651,-11.213126744874096,-7.475178090031686,-17.504914609704105,-3.400523629206782,1.3654213887869995,-12.3894009617079,-3.37490900232079,1.303983613334648,-10.293945498604149,-2.2706239655645484,-9.402743933669816,-2.736843599162883,1.4448135683274153,3.469100829663714,-3.5037545327810085,-0.04152110334135428,-6.33547260094855,-2.995127904593205,-9.918255896982194,-13.213395776002175,-3.325856694673261,4.918766005882059,-9.005902406171383,-7.663839556779553,-19.50291543600551,-8.589006128944446,-5.046143374479019,-2.0565980500103285,-5.79214769653995,-2.1095250260689937,-6.535237567490984,-2.050174967510902,-7.669897464668029,-5.163096644386918,-6.754732052592747,-8.160163562980145,-2.876019136502109,-6.434785195895888,-5.6919083829619765,-2.366034723929043,-5.940425563917609,-10.715142088333534,-3.7050357406179044,-8.085210432231223,-4.685805553081021,-1.7542525767212087,-17.406144127831084,0.761825281988765,-7.5500751080357995,-2.0180311660138073,-3.971472592387395,-4.395831940616752,1.87694663029511,-26.672867751746402,-9.249294390892755,-6.266023173763127,-6.565442992897326,-5.023085265413526,-1.9026197423957636,-2.9089515787061084,-2.405861268428402,-18.171042655917987,-3.983218945160403,1.5038840346714026,4.0012714663428675,1.5472990413406444,-1.8535390557404883,-9.328023606260698,-3.347141239716623,-8.458889852665605,-3.1239590156033934,-6.052399968029854,-5.368009322529075,2.106948127993146,-10.498242569627175,-19.394420253407063,0.5901854168860223,-2.2452660514916687,0.10649842901418127,-0.5370915080347469,3.4575569320123005,-1.3745977397379328,9.980082772259435,10.29627844039485,-11.009141684050789,-4.770437440702015,-6.483336514867695,-4.0204629027610554,-6.678217109407611,-1.2115768950838133,1.3000053844895931,3.401589389169875,-14.410522647972993,-2.898359432573772,-6.482553931294442,-12.338433598574063,-2.793411512327566,-5.822030139136057,-12.412494189029694,0.7516706269517188,-3.6362625156415818,-3.5697284354042282,-6.8694541705912515,-3.683987272501012,-8.79056733960216,2.5200721237807704,-3.456060640766969,-5.983799723142891,-3.381372411362796,0.4824555255234957,-12.14052478764243,-3.689279519860362,-4.029207467993988,6.15540870806934,-7.327842179412553,-1.9266709362524657,-4.9428122199531295,-5.607859517863724,-7.551609317299236,-0.056000827518476015,-9.764007094179158,-8.823171557287306,-9.841094362481135,-0.2864955227432331,-7.385352728856865,16.24536842538345,3.7428112239019784,1.686074038686907,-18.95650193340032,-10.279088165131654,-6.18527623908865,-15.76734048274109,-4.837739647081945,-1.8772340600815196,-2.5703973610287445,1.2769484167782492,-8.306907609633475,-10.800959716378479,-9.043223353479306,-9.166952829395566,-4.673959423942846,-6.904851401229862,-9.367461940481729,-1.9051620235568287,-5.153836084585143,-10.503717097672295,1.4094022921049052,-7.7263582612784365,-10.289188332028466,-7.078432002650269,-2.2713366977887226,1.054218043678187,-6.5358016437956366,-6.419783019993665,-6.274745051080367,-0.3062756902235524,-0.24946006993837644,-15.119725681762008,-9.567938517990466,-4.028434287542228,-0.0545803254633217,-6.054693553908171,-4.6697257110779535,-15.082916982907365,-9.258731108430645,-4.35056428975404,-7.022810726820959,-1.700252993570135,9.538754351089034,-2.429352098613828,-5.635875008725089,-13.722545517963303,-7.202450894621737,11.345652724292348,-9.256891288441196,5.998438797206754,-1.1263955265229602,1.6992957486936682,-23.877873215377676,-12.541139908529335,-8.36467911031328,1.1041266954471753,1.4994085986943273,-12.360419054587759,-11.290755403973384,-5.220442572164021,-5.867847774088618,-4.262642662831382,-9.237507316581652,-5.662954417705115,-2.12953431321645,-10.211466216502679,-6.87502778009807,10.516306428369804,-4.580318479962593,-3.9591910823509684,0.6844148442484719,-5.631698299428111,-5.689961760740087,-4.549088011758556,-19.499481828936506,-8.868393239250194,-7.554816454943939,-7.382190314192302,-1.9334236936805789,-3.0720446083771913,0.2226559789728681,-6.10342959308916,-6.676160973236676,-12.905474864912293,-2.1008991851125733,-8.759216139161412,-11.42220653399552,-10.075057998136899,-4.08179426194879,-10.688836394949943,-11.584952378197235,-0.08105093068100544,-5.332871421327083,-7.068882404820735,-0.9787027729555278,-5.862068406215934,-3.1106536346947884,-5.39615021456971,-6.923278467926343,-5.09390454639233,-9.517332014160347,-9.483510738593568,-10.409903120187066,-10.909557325495115,-18.23109091038733,-3.635405089647906,-6.713473444212875,-7.353664415216386,-7.4875932724859915,-3.8462742363372944,-7.252539926057827,-7.230904530847024,-4.540941028445254,-8.448346510988067,-7.382994978696644,-0.14315227276696163,0.7786564781878047,-2.1345098404050376,-7.867537455377576,-3.9287587857203414,-0.9621048210456467,-10.191734591908666,-12.166935790077599,-1.71712608902062,-4.271049095776075,-4.02911613923564,-8.741585895605983,11.49184509521307,-7.364605781779391,-8.081323810547817,-6.65763894573412,-18.32709609541677,-9.711857005289083,-5.988205648881137,-8.416030956591893,-4.5754410893888515,-7.162548922863675,0.3988840843625794,-2.754231301210952,-7.124340998654738,-2.584397950829802,-4.349470183807975,-4.166112480219631,-7.714645287948176,-7.533754169015553,2.971620236284287,-5.703136764728698,-7.639422902042577,-3.496127594034601,-6.332690949115044,-6.972519524633666,-3.182523616145634,-0.03201977365937925,-6.060388568734652,-1.352171801609787,0.21142816291504962,-10.506353692633756,-9.407026779676237,0.11873396082075921,-9.105247179288959,0.6473634031376745,-6.999941335280713,-11.770420443072062,0.8647076557242661,-6.367161829289626,-7.305539786884488,-7.369522890386963,-3.338227683505993,-4.96010741329811,-1.8769555620023617,-9.67333004054766,-5.120434195310382,-7.9037831908138045,-8.89830670257895,8.21978623385904,16.109631349129117,-4.722534527000393,-4.271153985029166,-28.440516198614766,4.924134037092726,-0.5222383275426754,-9.92411442402934,4.47540209831405,-4.571222853966325,-9.120664262633749,-5.144879721742852,-7.986181440058669,-3.768907260123685,-2.8775629227821486,-3.020266256759201,-7.1193496411166795,-6.1238869798616715,1.0812419727235763,-7.704007680027486,-5.9363689426735835,-1.4465264642922482,-9.666120686841474,-0.6398596632256159,-8.271308158527791,-9.595463086732023,-7.498914028689359,-9.921614088487324,4.18672363144165,-9.936335187695452,-5.790688388410107,-2.9080845669991415,-4.767135989169003,-5.849654803420615,-8.875306049161573,-12.56979839573837,-8.325600166332865,-20.379068624554186,-7.292144979796713,-5.179415140809232,-1.2795828504192246,-9.453805208067816,-6.530465106206677,-6.449648081637206,-8.895315457426943,-1.7811246909562881,-0.12250052195347905,-3.9191390012902527,-4.807427093160007,-1.8865352440821477,6.454607169464359,-17.859168759520863,-7.8317674071276,-11.1003030930484,8.048326125277057,-3.9459333468300954,-8.66720233669509,-7.332149925278127,-8.431643566027763,-10.476708883012623,-1.619917614496951,-3.1563081781977673,-9.852429558940651,-12.78865912259738,-6.187320218440944,-2.546069026113264,0.04204080441585312,-4.958465587665344,-6.299643952833538,-16.328446204287623,-2.0042224543879334,-4.539451378175309,-4.591779011949693,-3.8153835518129693,-6.827820371044277,6.644716134709241,-1.208376163480499,-2.006220541688288,10.670088238461068,-1.310853992349763,-4.736730844990252,-3.32298899576747,2.6737769257604693,4.143380869462762,-1.0556632280255034,-2.215836544359975,-0.2460599577710858,-4.662510064449219,-6.177028998427064,-1.2395838261682268,-7.897388682710275,-5.323892432096693,-4.89041016492429,0.09290402111969615,-3.6851747960636994,-16.062758308896058,-5.134846652080412,-10.794717868785746,5.436084887278724,-8.874865857299861,4.229937415751191,-1.6223806047557288,-13.025575458339702,8.119773200403163,-1.823362148802453,-7.471105906567422,4.613409163384167,-9.835099968348576,-6.04012826927105,-5.600441008376206,-12.93735900987796,-19.199074563942787,-4.5211629866903476,-4.754490197240382,-1.3853961769492606,-2.6819237448173796,-1.0718116582984882,-6.9584049848769105,-2.6123839558299182,-3.744196331420026,-4.839543481363412,-14.070063283477069,-3.552448666712946,-5.744170417337413,9.32584222963599,-5.5758377232655585,-5.884182863117161,-1.2791052921663935,-5.811874005689831,-0.2838293504370242,9.553309270006833,-12.674807145039797,-10.808527636756475,9.61333123217964,-2.3027312689917947,3.2703312138756915,-15.924908191018234,-1.746203839686003,-2.649600920074841,-11.682100996743376,1.7252034029387513,-12.073693157454802,-3.449089265577866,-6.7383881782738975,-0.6657678210106032,-17.540457434841414,-4.4837627320054265,-0.47121591561638443,-7.630047978827099,-8.620541044518863,-7.939824962982293,-13.282976796622949,-5.9400455383034,-17.772039511330703,-2.6042590561449486,-0.30497057482440376,-21.426687157190074,-5.149785787136857,-6.21170928236955,0.76703146272818,-9.22854930336625,-5.59768648430483,-3.4777674474106792,-6.413718510944374,-3.129319544968806,2.1198087628468207,-6.2511386443343,-4.849097543851805,-10.280754824082397,-3.2392703373797564,-6.879607351851442,-5.145531717734434,-10.552692290675358,-17.692544162214226,1.3866358628344626,-18.316259507939023,-10.953146928241058,-2.8540935168301553,0.39841529405734377,-9.37225139375199,-6.083928418469167,0.603918010318413,-1.692507840801912,-18.321594896524296,-9.659206139671682,-1.7849045880160377,-9.299156361202678,-3.948015464303501,-4.000098722164287,-1.8809039164332448,-1.3103237552334743,-3.558741505238682,-3.4946651765422487,-0.24122154688423691],"s":[0.07577962584928599,0.6573919364763781,2.1303299217851315,1.2261613606188537,1.941196210197239,2.119164643327526,1.721801762966465,2.3772937091767576,2.9978577458203572,0.31712889704612723,1.7190569458752758,2.439982677220347,0.3039865466951186,0.16415264754338077,4.500307655693149,4.970636583198573,0.822652395753114,1.2718310400946153,1.548172520825436,4.765506498631656,4.4416967852533205,0.2454064004747769,4.980597608013336,0.29195471549421037,4.30427876651329,1.4232958325460343,4.057815021540653,4.886359029458331,4.500254697262216,0.2233539984504329,4.210076489569417,4.790058024642947,4.40896271489888,1.5681781191490785,2.398562910539761,4.555927128560759,4.124007411633625,4.887860050411561,1.2641105020911136,3.112689979786766,2.552854004565688,4.228748572779031,3.9084181758812253,0.14552189200511156,4.53044421124729,0.9833820312976338,4.247426938641377,2.315242220022551,2.314436422424916,1.566811117625424,1.964415866679533,2.449377365277219,0.9866100786387899,4.187216141104784,0.9162575286459673,4.2547767325736086,3.0705049153439203,1.7723700261389075,0.9993019998000718,0.09837222418929925,3.4616069010467365,2.7630457547973974,1.9958949415345206,3.845894092164147,3.0825404742464304,0.3723030869989774,1.996394883348479,4.877360383296278,3.1569615005496687,4.724039306257582,0.08031531683886706,0.7958796760487219,0.7699544384306867,0.2686677874374188,0.23836714281822213,3.7504618834520453,2.4601031396810558,0.33037112099158716,1.0292514449887125,2.288612495923086,3.711295282150103,1.7878730420719058,1.681325958483093,1.2736178212866744,3.7246843678178463,2.7692672456430314,2.2325014962076803,3.9597076042425297,3.8885648706741485,2.3659585769744176,1.2699616307440886,1.4017736128673364,3.018888261493963,3.205891453868681,3.673979702048803,2.5303419210071345,4.954674145353902,4.873094616416523,0.678336439548638,1.2893461038737941,0.2849056126220628,2.830770707377023,2.2065315167165886,1.697478166654225,3.5402100328259536,0.47132773316636456,2.4845577569454025,3.285609772523567,0.7900870529602622,2.6040258620744283,1.7154566691260476,1.9126246355177179,2.4761946978125904,3.966808227337629,1.0969081881550025,3.0083345099964296,1.986757631566558,1.5654281671520132,0.46214759633502966,4.875166290843989,2.381122020776144,1.312855137568103,0.06804521975835032,2.4003632696820896,3.606109417683051,0.39749201273587054,3.244676260270091,1.7119270193551483,1.1393638018597618,0.924101777996641,2.796055249822045,0.2610613020748276,1.3361034581573372,2.431164622109925,4.988715131892781,3.058452906041466,1.3613788205616906,0.7365128798040765,4.783438982963854,0.327415589573381,0.1664848057270818,2.0424498420049653,1.0271726027558437,3.51696350199859,2.0869688309744805,0.9120085828256053,2.089381536587368,0.5656663630251024,3.1576604134279194,3.326777034255104,0.20396271660864884,2.5071647651982376,2.6954776325431484,2.4239686322437692,1.1652215776123442,1.531955270848796,4.339529226293561,4.452848048508758,2.6724461936239496,0.8827549306259941,0.22830995913613483,3.127720690675985,0.8708015521218104,0.9617827767745191,2.602436109490789,2.326787558930723,4.615989543495677,2.866485396627895,0.3328831094928697,0.8584655504805561,2.087969950867828,0.9288245760920777,4.6818629185872425,2.601526054865234,4.070108827367309,2.6358475571859783,1.5759056640534197,4.467320320199293,4.728575547628159,2.704479120013008,4.351012151796062,1.1221852775982188,4.095620300612792,4.707024903126957,4.454861307946877,1.1357579352503566,3.877951579382538,3.9488402897632255,1.1817036309866547,1.761612468423016,1.4210792462230892,3.6740119380335834,0.5155532647463268,0.7183322911240642,1.1435272718688927,4.140176308982922,2.560865223001855,0.22442060079113757,3.6077237281346433,3.4558345629642018,0.23307720856980074,2.2890912903854,1.783684867686658,3.4413192791491487,4.427398517823131,4.725011959795568,1.1420073026175115,2.970714154494758,3.3424712836648354,1.526712994806907,3.5589447189706336,0.6739216597094178,4.805243157839364,4.380771524824084,1.166194476335194,1.2656538062976441,0.4878153431816734,4.767515554198497,1.69894321382424,4.117984931132091,3.5920433697477074,4.636258119154881,2.2279471227606895,3.8656510728726436,2.368025787322882,0.3544927284192656,1.3019318502633126,0.5398530453215222,0.639497712637006,4.208696917174599,2.30515598140578,0.5021854502567458,0.67731152735791,0.16681719308854648,0.8422833009605779,1.9614347536592869,1.27729751900857,4.6865449588853085,1.4314480706456145,1.7511364186925638,1.5432965895134765,2.065541034745282,4.3155537067168,1.7554110391494737,1.0872437800022317,4.74976309059461,4.333890545991746,3.621170734416582,2.931069633759502,0.9732712570394497,0.749010772355515,1.5926410465960272,2.945754439419125,0.12707598822855992,0.28340490159708964,3.943875538728495,2.8728692736344854,1.763457605643759,1.127324247728001,1.672951628368815,3.1952545490337405,4.3741379432680585,3.5695702681720656,3.125148399131066,0.8213971006062892,4.769856662116618,2.3462921540854955,1.4517359752544412,2.132221162250726,0.6581210503224078,1.442562711623071,2.2966192218956083,2.787504855527876,4.263089463534172,3.307175100705214,0.04259712716645936,1.744391199198575,3.677280786734809,1.8340707475534601,4.009781865915309,0.8179710080691893,3.202608786572375,2.661588621435902,2.837014528989401,0.030990334575992096,2.5762432063294582,2.973649436679934,4.424504189093338,4.6497312841153455,1.2177572908470202,0.647224369693008,1.3972854128307677,0.9409828062078573,0.9944688683898839,4.451153561677039,0.8041846679625142,2.888006648078356,3.1683294525766548,0.020617381549906666,2.751732108379076,0.3258043302673208,4.192526974767276,0.21994162020911867,3.2409233075160238,3.0899092159531536,2.536028492403907,1.9260310402365632,0.9176796547148258,2.0835307214922993,0.0447488032355825,3.087445267287542,0.26203201128465525,0.8427683746091619,3.8847801339174746,1.4255935300081812,0.37109093018473205,3.4597796237863,0.9271230773279271,4.0520188201034335,4.369095143479202,0.6879338296844928,2.3711854044858685,0.0026419224670570784,0.22372320679677538,1.7486554579597091,0.10595561781863938,4.870557727712717,3.2964918524682196,2.0240385154587495,2.176497202106985,0.09441631927868177,4.701705700649391,2.4997294267428383,2.098490577116514,3.1549198510635024,0.5955444449764324,2.927479514563526,0.07372501643470697,4.790666551775564,2.931966976974183,0.34591652781721605,3.3726495149018554,4.069278988594319,3.741271033848741,2.950055158819734,1.811294954720023,1.1383614385681617,2.8690459325261886,2.2609636759402596,3.1794248864978236,0.07079815132565503,3.404471982082864,2.4721568951755915,2.8909562352411413,2.222492193684414,4.6381471231874,1.205067758814402,0.8328815786817767,3.42991388282867,2.826659291552186,2.0069930116135426,3.1438187609394608,4.324774841130823,4.7999321666058865,0.40922656656222745,3.5776884386556187,4.884533283383244,1.2547997212862894,2.4116373339882924,1.1070965130161492,1.9839770566052917,0.6087989874844091,1.2292156014211841,4.729164616667983,1.8547456649705452,1.1967923769119337,0.5162536155001485,4.481364796687588,4.372741269836281,1.2924085740629065,1.2423199829417164,2.8060911853185235,3.8287815090545827,4.52143117665673,1.13868094662948,4.087612950384106,0.42762334214704545,1.4744440042939533,4.3657347948211385,4.192019689859704,2.9123868763535645,1.238683576962465,1.6731641886046944,1.4777012698551262,4.515215310682309,1.4081957536944856,1.9096590148015113,1.266851182469042,0.42813781174579235,0.6736564107525567,2.5046570427792316,2.15328078559304,3.78611232955661,1.7208785931817272,4.143996725219768,0.37532992302965473,4.621653977354373,4.83792545012598,4.467411883229984,4.1788134997420245,0.44120905273328126,1.9637345810844387,4.724079711921209,3.6959640104217986,2.3499202670815467,1.9973404775565973,2.860532022720582,0.7760482739915608,0.08405048414675487,0.8659169039832137,0.7924438534082545,3.4448380593537498,0.020119320136058327,0.4177106566377409,1.9684467978748654,2.4719499784477437,0.8799833428461457,1.0562066227138622,4.773014010220588,0.6148254113098617,4.886937946365753,0.7307967697715445,0.1282656971915841,1.424593654536357,1.3527521089282402,0.4704749627656202,2.647663170773793,3.448364537628702,3.4015555025568056,4.275225577779976,4.836087422215154,4.5794865424633135,1.3869130254893436,0.6680972492530657,0.048749046080374114,0.5036758656487716,2.628027155369356,1.7155424009341935,3.6806618700018268,2.9318042869059857,0.34015455659250127,4.785175691614373,1.4908313168490395,0.32253881071035106,0.47879952620792143,0.1378955260917003,4.461188492202099,3.3186306605966887,4.007978026452193,0.736729116156517,1.2143176667343147,4.145889469820119,4.669104850235598,3.195136294801512,1.0458953853074737,1.9563378484567584,0.2482528563711328,4.310131434405717,1.1979792427949432,4.6570147173553895,2.6583707307971647,1.6459464283744663,4.144598467709098,2.298709482165232,3.2921767523359593,4.061767029137913,2.7724265474835708,4.5252188499165165,0.7159505473567973,4.272497583683828,3.160522975716619,3.4852235042044044,2.618604489374775,2.0927877227987013,3.7165090295549232,1.316230918082758,0.7742578703827574,4.85431310967416,4.9032695693234905,0.015733968578253155,2.576399756285983,3.9972980345303344,2.196130836654868,2.823448837183522,2.4136295643446792,2.443948855838708,4.055539021812653,0.8712103852419295,2.6622156678335274,2.0978994365044046,1.4136848462606366,2.76016139898823,2.3285795424014877,4.958244434495544,2.94171974105758,0.18260100979935912,3.4586234395596636,2.2890513700355983,3.367079307692383,0.26237915807742374,2.041858677506755,2.2675364584450897,2.636019719218158,2.7600336329207775,1.7360905414945016,0.6395692308237766,4.17809069133145,1.2165773422000081,4.609809061517919,4.709818596922931,1.080346170045814,4.491011411474589,0.8738417350674732,0.71602520306699,1.7201862915240718,4.304894331391569,0.5701421802725304,1.0728435387028579,0.6777750724414122,1.4635685281307953,4.409289021513837,1.1172649928319434,2.190689295525996,3.5578346272643313,3.3767956019938907,0.27445745330752946,2.3120715281987367,1.767795106495893,0.31916010725687505,3.5253242560471576,4.531459763426026,3.2593695727271155,3.4151893937578426,2.592351111453972,0.937391746526216,1.5860925484364141,2.602552521748507,4.0642875592715155,1.958937415364549,0.07848348479424616,2.9643715851197183,1.4807598394933097,4.31472772996389,2.159329511335227,3.645496684464291,3.0185912310173855,1.1928391533252425,0.6694119408562105,2.6377259493732685,4.904828635386246,0.5592127892573839,0.40511493526821707,0.11756807774354505,2.6192120593929946,1.84371449934568,1.3055525842772486,2.7883862065122624,4.475965829403931,1.7178121448973427,2.7708720469130146,3.281427977738307,1.5218326938397808,2.8713323080759636,4.642374322953696,0.6205707496389579,2.6224921883340424,4.055172378238443,1.8279801306701116,2.2785000653062646,3.7076358209136107,1.731499312678142,3.3297246747785394,3.8918404599487433,2.3326423227064774,1.4204535644991512,3.1682669664503083,1.6926347049154011,0.43819089884781226,4.016741626111471,4.833022498262266,2.3377366429228563,1.8270083539097781,3.1676264229699624,0.8551552212034552,2.6225412407222057,1.7357811861361327,4.778916755838285,4.146864503408106,3.6496305526540707,0.30887055014007125,1.5499109749833673,3.6833330334915013,0.6543429669675926,1.9478385905334306,3.0634392459170767,1.0665396616231915,4.661073121482454,1.7538779482290123,1.8269863516566653,0.6703036839673226,2.6168890577272985,2.5598208120415675,2.4978083624979663,0.9657418179704402,3.1122422712320374,2.1146078293154313,1.8949129971841672,2.123832107039849,1.3815259450223893,3.176679794857382,1.852183938761911,0.21763738019247358,1.7320843359044802,3.3283072609834,0.4076598032280998,4.644371770067032,0.5972582907207769,0.7109208842359616,1.841539980878738,2.4948256371330713,3.0713240526777117,4.512897757760577,4.7835213905952685,4.425222773879849,2.8003643118655064,1.3901955405892752,2.6360210786941196,3.9265249060210317,4.906364269891061,1.495083268789662,0.6880673871278364,4.405038604867481,2.7261681773008437,3.871931999226531,0.9270340817477063,4.341989489419801,2.5314248595671307,0.8803581227948265,1.2676136081767697,1.8492034557147197,3.0685283135848396,1.4177504868113078,0.6350102249144085,1.232077498808718,1.4134661350746114,2.992541315961559,4.6943957962224845,0.9527529353405806,1.397363681361169,1.0207470074367608,3.24535759976916,4.046406969399338,2.1517533983827852,3.5131608931855,0.24806154036604577,0.0487654004252025,4.17670563660276,1.5846017254302258,0.3510421608111014,4.80363224301957,4.245390088714741,0.452961748696592,2.131575001497128,2.4427976469338475,3.0200559452460976,4.833281230156273,2.283809750929583,3.5800908826584177,4.030024928746839,3.288367413654847,2.9298039625434846,2.918826285443541,0.11993384351091096,2.9608040350144824,3.6639630202443807,4.821764303257384,2.75381624318366,1.0098515752718318,1.5496269935277351,4.282206364316412,1.3437451909550324,3.6077247551412417,1.364845102387423,3.975273043960276,3.9265788956416783,0.5440854737066803,3.4913732952150878,4.568374469890053,2.0412602140789438,4.689905451000396,3.1339094036585537,4.7486014975620785,3.489667062627336,4.0998995273850225,2.559792887895788,0.6706980621779501,3.4230763423232116,3.48404037187537,0.7759900014754106,2.283247294445431,1.0384868060752306,1.4483545754248595,0.5580815168489872,1.621790122495106,2.727556084067262,3.6300803209714028,2.913059562960525,1.4451453691421234,4.691905999919478,3.607633179462457,3.702759847781758,3.1362780718091465,1.334909335041714,3.6319391672889765,3.6002873334816234,0.45724588213535866,2.944061607338715,4.482491101950902,1.0549252149759125,3.352560616066156,3.6154420137382193,0.6555241554077618,0.6525291759904195,0.6824737460531172,3.4894059194220697,4.716103653085284,3.34164132917931,1.0158239338454988,2.5031093745808297,1.6154898805231677,0.9409454946855167,3.5555959714716234,0.9328760840099826,2.0501234257158774,0.6828657855641052,2.0538805056813225,4.0665027547554,2.654407642679172,0.9110105523848433,3.4518526018152276,1.5122234306967197,0.6481546208859756,4.533855815822074,3.6392381457981116,1.5718151474779762,1.008597118500334,0.8354331653057956,0.41139172743620334,1.773387167098781,4.376597572292282,1.4787490617431653,3.4250322569073175,0.05939654932267446,3.454936888890101,3.2029032403950697,3.331552546198745,4.031233339431054,3.2997633682047836,0.7288396043746392,1.1011713512212806,3.4359540861893945,0.5710445713949508,1.039788950631828,1.3309054775398188,2.1676947056459337,1.433534720562697,2.1620790421692804,3.1053119689340694,2.9355210874553617,3.459576347158203,0.9618626858660106,1.4954324756801418,1.8901918499375159,4.696453294732715,1.4645896066154662,1.9216309790300945,1.851813234734252,1.6823550487964811,2.5016182370903293,0.37280953808638717,1.0303069864946701,3.2053085215009802,1.6316279885755758,4.308732419971797,4.578588316397106,3.1382116544135954,1.8235732471606503,0.366629139899074,3.3523646039590673,3.6757354724890803,2.6411360292760433,0.29576107312152544,0.07002593460766926,1.4836160559718137,3.4964490054830732,3.002003503823112,4.217867558496286,3.8396403193173754,1.8518602981364984,0.7984528821653358,4.161964568829038,4.795087665419987,2.035458416352661,1.5065718170625642,2.529247184015361,1.440416306253135,1.7162836314878183,0.32474273027365164,2.4253446957519897,0.2529967228585295,1.4478112750043548,0.7463968255682485,2.538884878593508,1.3765067840625933,3.279402236245066,0.9559994104701386,0.49822714086129927,0.276626050879456,2.0567266766581263,1.0341414611673727,2.5917574725059622,1.6953029590425284,1.2384303048956158,4.246029189112104,2.617745842625948,1.6888443656393692,2.830906292200633,1.7364139081030605,1.8366967565725567,3.1931805927577486,3.2102040447704097,3.9578340658105313,2.0907019253717474,3.254413409861734,1.7808107037011178,4.821864737023941,2.117919312738791,2.4263209221880233,3.4405993513269073,2.23038235724492,1.8831366881593525,0.1429676282070036,0.5539276444892771,3.3767552642922762,1.7444528233535417,2.9484524125796394,4.599210834544842,3.6517047873441566,1.8911718609535644,1.5373919211843268,3.600428055223912,3.4251200059079476,0.8993427167804191,3.3417359279816705,0.7063137674974729,3.6956061236046,4.19874517040936,1.5665928142004437,1.7815111018855,4.787792607140542,2.6298902622980593,1.6783427687801589,4.647310012234089,3.1423634318299,4.038485817083326,2.849024623971721,0.8814477686511568,0.8766571643868992,4.657041024042834,0.8081393197418296,3.1134657084339565,4.162450315439424,3.0749547093616334,1.7093716926051261,3.8938482093143865,2.023619502450058,0.6439226919882424,0.6101643422118153,3.4436987963044006,4.691859537992823,4.845386440720214,2.802676930888799,1.7717649472290753,1.4508628567609205,4.916498270395682,1.9450320764471807,0.35929737243513116,0.3161671035848357,0.48812438468459174,0.15673553995368739,3.476379990963548,4.153384194645967,1.126542468569166,1.6227545281004885,3.5451512314184463,1.4653525102405063,4.875768946755656,3.4575676455448576,3.9276663385018207,4.059181986905935,0.006178510298791018,4.3888396205052,1.7017671994442862,2.064830647725749,1.7059421502688599,1.9037601227295442,2.377997261606718,4.252855063740269,2.0022391984711643,1.9848244059915021,2.386057750220172,0.8467934274473299,1.2297608253442915,0.9244750003596514,1.646249988607753,4.98198757911149,0.8396110773896648,4.219377820595801,0.9617013333637381,3.0954668286784024,3.3886071499997272,0.7594406056064507,0.47519695874176593,2.193266646897677,0.42047736947252834,2.381393714174509,2.5199640875290186,2.833874003796235,2.4028974469213127,2.836894190785367,4.183999556235546,3.0138104394768703,4.438975848495653,0.03921332911540176,0.49446592061750616,4.0255253974558585,3.5619102195250862,4.3791142654139055,0.7567181442939597,0.2622530136090806,1.5050976389383952,3.1017835700611007,2.2134078331935947,2.1922932297159026,1.2752849617966777,0.07280093849266422,4.942597102665303,2.8173725782924377,4.587197182842137,2.6732843336892187,3.6079413519204104,0.7134261734420322,3.4447651838551896,2.683128069755374,4.015093255339238,4.7596278597688055,2.2598674504201055,2.010175866775381,2.890198533261168,0.23522595833652904,2.4270705488790956,3.102700446457849,1.6018463375970793,2.516702385623052,1.837151237119996,1.288699976971578,2.3716334794178073,1.8644465351694273,4.189354368474554,4.45440001334847,0.8184636102556953,4.769116772352984,2.375477993850242,0.5479685530587808,4.4626222265103905,3.0759193780254557,3.022529634557154,4.628238790788217,1.557311559689174,2.8261856917735386,3.7327819065665127,2.4452453180583964,3.542451876941487,0.8254186166621313,4.24081536626855,1.5162365172013625,2.273902894098815,1.3344377718676315,0.46668424355746585,4.960089014710208],"p":[0.5569206269028935,0.07296653709579992,0.45374259037757936,0.12365968782074255,0.495459895154885,0.15763112248179456,0.8218120060867644,0.3556237744265591,0.885570533385168,0.5919396869721358,0.8620974081164463,0.18721941299957923,0.8601958717722562,0.7554987154728434,0.19539163332994858,0.943579933118482,0.6031670285324338,0.9800446871156809,0.5989427723443379,0.06810581683723926,0.06482551656102808,0.5676498466008915,0.9434530851853589,0.30686439636726703,0.06665653681058448,0.033346600926533077,0.12310307700760847,0.47974890095488676,0.8295668299806289,0.31613377157474365,0.9285737084799528,0.1738893231634302,0.7081054064569863,0.8781011942776107,0.729760974258074,0.05260112752672974,0.5455754825388779,0.0018627752468707293,0.3852316233744584,0.9394008710539901,0.2860132494127896,0.35400469565803694,0.05287778601308202,0.9357467798889167,0.5077977978822616,0.5684064847724848,0.9344486144857764,0.525401398178553,0.3636828219075199,0.25299715727046235,0.8001890507842915,0.8290364108440218,0.7618184579051719,0.8690712353676098,0.8501920431714178,0.31278745252993057,0.34222155908468377,0.3801323727750976,0.6897462478193948,0.6186531081700377,0.2883423294540155,0.9030196079988484,0.6846202341141525,0.31974396806544547,0.5661804040940039,0.7611307126938247,0.10806028927884559,0.2857218989307515,0.8198825780583028,0.8501872013610776,0.7979183579747466,0.8391015646337163,0.22939187578162024,0.11513693667067315,0.655300867603775,0.08338148721040639,0.7154270883632712,0.7632921241504185,0.1684456297890531,0.8832057562030144,0.5537664601853831,0.1294548392913779,0.012279654289498732,0.9533263747600824,0.9268269279737227,0.6354121577841032,0.48599215446476673,0.4165398778826894,0.3236647885770978,0.5084032863335068,0.7591554891572976,0.7605692383080547,0.5038827414128106,0.8544580105381763,0.8783087352352696,0.9102439641216482,0.4820565976907336,0.43706998478092896,0.46363683249962695,0.9115200380244879,0.2835809751149576,0.9007640911731911,0.4651072164321195,0.46987534714806345,0.8240457735952336,0.30535204651024594,0.9457364306169735,0.5510533247674434,0.518719239314515,0.8702348796782402,0.09562376402981188,0.12529140130557037,0.6202625902837984,0.46354576491675803,0.6651411040541362,0.6441996903115617,0.9818396197660784,0.21251036729273287,0.11798796006878876,0.13782403576256286,0.7608194366047876,0.6759637889212393,0.4901310419782665,0.41566758391699654,0.9721947888346498,0.9566139758023073,0.6056705842021148,0.32185809727649106,0.5163538776168088,0.3525313237136425,0.8958644437067842,0.18029776858274738,0.4338435131681875,0.1943546058044865,0.2088635428316079,0.9296470018643554,0.7493278661187361,0.25312016763745593,0.7967314082695787,0.5014320235352192,0.663773523836626,0.5692194370670889,0.04620762772438325,0.15885882341729984,0.3537975728649967,0.2139923683163969,0.932622602408858,0.8579205937226304,0.8514813631343967,0.12913717477790443,0.2071216685565267,0.38868926444923724,0.4615561435987714,0.7441456031883722,0.438786155778234,0.1823987566012808,0.5613508579372541,0.376037392542081,0.5715064825501615,0.5428090256284694,0.4050453151834148,0.013721442975400677,0.02753534024318527,0.11560048336915285,0.8527402913806135,0.3285170335699117,0.9359348908706653,0.31782260535737916,0.9483498075767456,0.6139876207891275,0.1999427772555593,0.6883633757252299,0.8306833123526502,0.35604969488811156,0.4764086192528896,0.36535254836014586,0.6224867409464341,0.16427956609573746,0.9733618184342663,0.6782795533722452,0.3196889153812579,0.8504929651590849,0.8564125793634338,0.7637035912985168,0.9828814392174023,0.28849305053462193,0.5559658502520044,0.561157324656028,0.8127797001408641,0.26086686579805374,0.27703882126387613,0.193725198849644,0.7144700474310492,0.5819206121873672,0.2560964522418183,0.08546446476502845,0.9643118054934832,0.6664441764750777,0.4985720228647954,0.5975626736757331,0.6906236634513685,0.3834257754733077,0.7693637782967446,0.6346579046825505,0.11356595163767103,0.5758864603724785,0.2374021067438441,0.34193048681853644,0.21134657037125693,0.4850981108867063,0.11248204112154747,0.8789365348061622,0.8093520576720545,0.6376982434443095,0.4870498741168561,0.3230409798367926,0.39711673111718815,0.17467156066675105,0.832166002058188,0.734567792480046,0.3825976425875641,0.3864559074553664,0.8562904850577118,0.603230599334097,0.27410657551694495,0.8752232412846641,0.8367900638376098,0.891165643861944,0.8747453962152836,0.3273206461696203,0.6794673936228053,0.8077063307486625,0.34198021832248315,0.4591596694286011,0.2847227756356421,0.044578902289238,0.7489285799678649,0.6014347770090804,0.5430906128742536,0.2107984751578278,0.12603333786854143,0.48399067787849326,0.2627429257396203,0.6843092469722185,0.7248554852544189,0.9166807571449094,0.8293068532126389,0.6880363311710906,0.6172533998562375,0.0899557438818186,0.4488640266061834,0.4202259408397089,0.866775610435466,0.561215114096193,0.527915850779298,0.1852088951728854,0.6420968618023513,0.5617026445846696,0.037347723155763735,0.04521359426937699,0.8295425935083875,0.402184639774845,0.9453807413357789,0.8930680170456131,0.7094456347415046,0.07454322780551181,0.32661533772198514,0.7454950550883395,0.360253999496869,0.7564487399568443,0.8221241608581018,0.5879405399436555,0.710079392697837,0.33819736414563994,0.6884642281179989,0.11344502875591966,0.9637721766209653,0.828984230852537,0.3404839762179044,0.34811679234568027,0.7459241389879216,0.3888800952448339,0.6225530844659422,0.8797380790263043,0.9688534547427732,0.8010892179941709,0.6584751440266272,0.12870321499698334,0.10831897865061801,0.14950693488437117,0.6512466668579664,0.37685138232651316,0.48437927616292087,0.8174774608598447,0.13767208502783124,0.6601848116769806,0.4444072344615493,0.7225782796617108,0.5879711536285146,0.9827940018230739,0.47188819788655834,0.448455243086022,0.4583108856269422,0.8707568485134267,0.8266095635259123,0.8164237112377044,0.006669077017920522,0.13503850377664284,0.33302518122225955,0.054653010890912235,0.7465081250486056,0.5632858490917503,0.5226949842961193,0.153523143982371,0.9551615923072689,0.8910490105753066,0.5420396004392132,0.9778633776679444,0.04066665075624032,0.1553549860271124,0.9065363115309613,0.6598186013505216,0.7101153079593678,0.9427180114351965,0.8487714900071177,0.6980657334727987,0.6148808134247727,0.7917856449839629,0.7467531829866172,0.24786643951294018,0.7535570456931344,0.012792909714723466,0.060933969256321996,0.9985889709702565,0.20737185235134037,0.2838673413407866,0.6300869276598475,0.08959649318191465,0.913640096167301,0.3935397268190308,0.7666914020128881,0.7808846871880979,0.12414234076718822,0.24506839521548707,0.5726069954031221,0.11502440962787652,0.942817642536389,0.7787238693987997,0.5727220667799624,0.20436066963801314,0.1515417110981916,0.0029088127479948156,0.5722327281445465,0.22053772916412995,0.6379115403009747,0.18539785384561758,0.4876408903854028,0.6291296710866487,0.539684321788082,0.8633926695784835,0.5189993898322156,0.9148197859618104,0.3687059511422528,0.06624063435004413,0.8986325799827841,0.23581746562364447,0.7396624048855118,0.07049943987108764,0.8141963183730494,0.5157968811522871,0.9553008273758066,0.7457024264515903,0.17768318107482295,0.2555563943291588,0.7954731150142738,0.241913668164629,0.10131818694976591,0.0525680712676051,0.981639846274523,0.5343432200870506,0.5165210869520835,0.6846920770994145,0.394020516346655,0.700366773603712,0.5382474216138471,0.541290320943365,0.1158600014801292,0.5687261355694826,0.25930725523551024,0.7029898784417958,0.8771126310160104,0.3606515101408796,0.8825616065263175,0.7806141554990265,0.9735867060711922,0.48547623138169027,0.47370527934300877,0.7002889956176632,0.9575952086644612,0.872154890363966,0.48568586607724784,0.5584731527147286,0.7834609058886597,0.6378948679624499,0.23986331692250618,0.017596541765529272,0.08007686533450431,0.8674356127576051,0.588146732949941,0.693035347374592,0.9345129658269387,0.3291168789335863,0.8396554549858186,0.13012974105304198,0.8891127097794291,0.14813326677679695,0.17114419182245877,0.2658779453271922,0.3880573642083065,0.6553897160115898,0.8234027854566901,0.00952767084639694,0.22566512460405885,0.492506525648134,0.44870740994655667,0.4794550349435456,0.8356514379287889,0.16019358821419716,0.33530715584558624,0.12486195574255676,0.8292284458890589,0.8481849436573512,0.005283890245265654,0.8449190603146568,0.8305621781283352,0.07351636494913838,0.8906045837263037,0.6249780311371782,0.5623515919498607,0.22510555999096749,0.8268564061879551,0.12559001170862105,0.4687102371922973,0.26280790725721137,0.1884425377555543,0.8249021515437585,0.7451607349171403,0.7439099196985215,0.7219107935830513,0.5205609492074916,0.6916869891485717,0.4830496514074232,0.3375769841392806,0.6027054888459302,0.03594826837661014,0.9571492253393492,0.41609702763427725,0.09199922583151188,0.49866054552624295,0.9736017997990212,0.9099221333328587,0.24112591330907374,0.24046964222478273,0.49362592040646147,0.23834782672056543,0.7042416477433306,0.3033319054911694,0.3340838673563029,0.3392504931201359,0.16074462588284444,0.3338155700686247,0.44426433586378766,0.1840090289380889,0.8730982771807547,0.05812706219251562,0.5725838593898775,0.10881629463175013,0.8359176842131382,0.13341205961299818,0.2259267039246482,0.06445308835806052,0.5329422552270477,0.037135353234049706,0.25493664435201646,0.6704749840213875,0.23780932361792018,0.04741157268539453,0.9563758280108012,0.05431023279797609,0.5228234040778164,0.46406704551158606,0.6175013174369723,0.7612311159035281,0.9796582535733185,0.33736991996988586,0.1047918794620295,0.636592089652608,0.1836597472393242,0.5098614077119537,0.2813494293018819,0.6831945869204985,0.6801246846542075,0.8970846951654643,0.9781519421614102,0.407913167086283,0.36023849811347475,0.20393385612501502,0.42757379725032685,0.06993152059743002,0.10812375250776673,0.8363643784417667,0.23206745921943162,0.7154600424137416,0.7440728220203983,0.024179275572425274,0.6589628870807016,0.3568045651510019,0.11084791501407554,0.7616462440866489,0.8160142215547745,0.5259118119533879,0.5840413947020615,0.5798642186099872,0.47500201724047364,0.35473376218302666,0.319729670773901,0.8739889378381234,0.9951427717156567,0.8046996257124133,0.17534879031190687,0.09710087954913504,0.4169828298406395,0.8774339393707582,0.7839396140341188,0.5843598171584241,0.5545352165286825,0.5919967050605099,0.29699161232666516,0.5689953878367835,0.329087546222683,0.43912896508454535,0.4503450567850258,0.306941578639393,0.7494044334918735,0.5130134557252819,0.7397030324383096,0.24040561938015403,0.3540002476691215,0.7549848064853617,0.6584643340380263,0.23729414332417198,0.42473041486942353,0.07905770264936907,0.5880524228894108,0.5144804405748193,0.7450246212564458,0.5668430343989579,0.7039958890536369,0.8791577598729037,0.019263281118076403,0.24523255979772451,0.5829061153828887,0.2959266100983158,0.22291438191351132,0.4433307311163215,0.8063333114691125,0.8191261036616024,0.024701262863185525,0.38335862463156833,0.6459265373757817,0.8769878574598036,0.819696467979796,0.703767031666247,0.25413753968071373,0.7828619787523472,0.05821650213233465,0.3746921039240323,0.5547774051438767,0.8662065526693876,0.7539911320065327,0.2063508107363332,0.02312366945044375,0.6097631044811962,0.6614103509549367,0.7491400403404498,0.921235503380418,0.9882143943957296,0.6242225356775857,0.9838191295451326,0.8976196801202114,0.201664385684436,0.9265610630344416,0.61078638550692,0.9690849582196914,0.3635116618245666,0.5728976287099019,0.7164240022012749,0.8341418812624222,0.13576578456011923,0.3555695528270615,0.8607449368359008,0.2719792868753701,0.7577504058516271,0.6572210058605912,0.18920562543490727,0.8021654544540782,0.4378859155865096,0.4367089423525621,0.6468425094466599,0.12500894973639332,0.4933013486298896,0.8058139581513868,0.24627824028370093,0.9735893891530978,0.5594737568685613,0.8093451190448002,0.012695660117516994,0.6796810618514768,0.05364370479299141,0.9253408139943731,0.12872563823724414,0.5403539217948501,0.697186340596007,0.7861880686576503,0.17743805775546906,0.719095752572789,0.3225812082100714,0.435399696416658,0.3109580788940185,0.7825785565165653,0.6027315100188027,0.9951938958363626,0.8265605050338236,0.7375412916190005,0.014216323422687749,0.11739764923069251,0.5285046841917056,0.05438702957238206,0.7096065591239369,0.494398376804041,0.7695435821157861,0.8047527575809394,0.11052096882463225,0.17943619277069822,0.34452458128934005,0.1339062118567269,0.8355859119182281,0.940502114258738,0.45284294894871624,0.4414999683210983,0.575295051348411,0.2424497860456576,0.9450123801647439,0.6244583869879086,0.16003639663454172,0.6406150156227215,0.8025672315646317,0.8999124376133967,0.22970873296048855,0.8842215596936973,0.21302339169273998,0.9110131560490176,0.7287879588394284,0.15688553712821673,0.38642772272373116,0.9083609344050592,0.7750921169978817,0.3027275498695503,0.23345557259105143,0.1520010627167674,0.1416448391902485,0.4703084282625838,0.13072253376255571,0.7106361461605131,0.967057941952369,0.721775646218773,0.5494617115916736,0.23761074213417488,0.4036902715753081,0.9792267769259195,0.19747655802383468,0.8971051724368444,0.6133570433518354,0.713119086870958,0.01828194663241911,0.22406773130631352,0.2683672700001296,0.8207485375056276,0.822455988882949,0.15442133514882395,0.19019737526538427,0.565434040825699,0.054544724272542755,0.6138016794134011,0.4856002671084274,0.06442419943214373,0.7443381092120442,0.30644225264753455,0.5220705702069575,0.9167516993565537,0.6858809003342807,0.5892659958688256,0.6499709664553572,0.3082677222217287,0.2359969759780931,0.5098699963922451,0.024327582669235515,0.4829744981841084,0.7513120199790801,0.12560839191188644,0.17841387071257153,0.6075172511848266,0.7027756997508459,0.7302311233807992,0.3394142753699416,0.09058379560569096,0.35677237786450844,0.0762225168844557,0.19354820689191343,0.17300476200498238,0.3497552091583638,0.30851257864456727,0.15874928076310035,0.8163905995576679,0.4285479871532698,0.35559563338674005,0.6508283527082921,0.5138264894489091,0.35345451283973994,0.26081598692893815,0.24150452443190584,0.8672335946884882,0.44450781510157933,0.2685917412509624,0.14852499696683252,0.38651811470066333,0.021923077417977943,0.09387037500273165,0.7469594641740431,0.04326749791931794,0.029386299966689178,0.5235929805052824,0.7625093915097207,0.14935823586473673,0.7563132138967981,0.24795133201641217,0.48382906024221617,0.956662003394489,0.9636811310154298,0.8191502603332628,0.030491908357128006,0.37822460984607553,0.7170576401684601,0.16445570100451312,0.15943463154276816,0.20634661861691383,0.20829444859826496,0.16937446197530748,0.03769156612848401,0.9631300187743437,0.6521361100147804,0.23747775845183883,0.8446005193426898,0.07980241027594293,0.5131121233492659,0.5170499422432631,0.3301116080285773,0.29671538113598706,0.6897192434978583,0.8685442122404718,0.5802670913585719,0.9295231091439251,0.8842662208611265,0.24550802416848683,0.7720293322449279,0.30873459864870045,0.4773650984734774,0.7663928566997731,0.4850501350063734,0.6075023897609866,0.09621714089194233,0.8290142790505417,0.2163047921144332,0.38227635308278085,0.9464044494357959,0.372257992189442,0.6799581213346213,0.7627165349304106,0.019558356135805477,0.2963257048255743,0.5875809008963562,0.23197530101449026,0.6788842198518619,0.19051248983036206,0.10747546661001728,0.8238765223260813,0.39188510801666343,0.7806668536089525,0.39119412683882504,0.6141137339838569,0.5743513496468062,0.9889473620551665,0.3516820776618508,0.5106877287958138,0.1610612795991606,0.19702864082092586,0.9205348151664912,0.9947001891328733,0.8983317011329548,0.14415391555614865,0.002200019973734202,0.7597483698034111,0.7188696756551696,0.006586833673206449,0.8764757746348382,0.40619483119294775,0.3791403032055971,0.8534559100870216,0.40329688316338297,0.8526824563277364,0.328127830820222,0.2548532663599339,0.24190901861582725,0.8866966264392118,0.769093014048946,0.4552384539707306,0.11093320656937111,0.16417971163533696,0.13377873317207323,0.7618580287761259,0.5346246568174726,0.07212905562869731,0.23721644843506895,0.18806507839484987,0.9273461006491104,0.4980685934689437,0.40908067042465923,0.16537476914969962,0.27825067003835313,0.5353177221703576,0.12669062322504487,0.2255375184510915,0.06429681488866201,0.008468079282431873,0.2531141468154141,0.7199333621688166,0.5949968420234226,0.5282923079059696,0.37482759508225016,0.4634764613363622,0.4086309755529245,0.8736006676031951,0.6322941154266928,0.37299616420636106,0.43002560697585324,0.7952754089744207,0.9034865037571671,0.054320207231549844,0.6012616720924275,0.1893871610693565,0.9327348584614501,0.694882346158405,0.7291957566895979,0.677283299944738,0.046712266575802186,0.21553187572261745,0.596965590414972,0.146268572844785,0.40776083490209136,0.1981431900947217,0.2540365333453758,0.8301191959837328,0.8542187618240344,0.46401781228040484,0.2365757682844929,0.01785432290984512,0.8552551762870919,0.3736069252802252,0.4477233942702987,0.8547735319269671,0.28466862061312215,0.9128722495542452,0.5936047607035928,0.9301154608048412,0.9463708704788674,0.88525994184084,0.5172579955148422,0.17984032835783714,0.938225164123454,0.7935330923383395,0.613979663085779,0.5155915996933205,0.7348333830297786,0.06540699650173387,0.2404942273793127,0.8375012095682353,0.18515109368073168,0.9384711560714754,0.9697999804141819,0.7116758126170926,0.8151178611401177,0.16305517001794656,0.11677145018824198,0.22060818840771845,0.8683294593234892,0.23065535083629585,0.7697692844729354,0.9044309636331407,0.1330005416304132,0.9333247262598026,0.787236928106251,0.5055078964704596,0.9664850462007619,0.4545716957506307,0.4636705294899306,0.3434470722018974,0.13750487711500559,0.029462814120420955,0.8056438206467631,0.29592988094402917,0.9282642241307622,0.6013310853850422,0.5193386138868232,0.7500979172612108,0.8526997028192,0.6024074907477144,0.021925480583556922,0.22175602524843274,0.6497056919880528,0.3561684678962531,0.9807831610383626,0.3229470022631531,0.8088769489106649,0.6664935670245054,0.7985163758757996,0.906649149868854,0.9928023646325457,0.2083316672073241,0.20430184170350096,0.9815483764228601,0.7947618831459378,0.9117742193280887,0.029487993389059497,0.872608339198788,0.4518570536666857,0.09844370721680473,0.6911339383400692,0.17363311740544507,0.7731111446998606,0.35132606965289725,0.4191680463790819,0.07752301843735987,0.7156911471950447,0.8949094128759896,0.03346864186483112,0.7443394157385488,0.40258086456857134,0.07330474328254533,0.44983571300373737,0.027425766200284585,0.51595009941327,0.49136740629032905,0.02037165367873084,0.799028718214593,0.2604785795800917,0.6656361773335593,0.24293012398351355,0.7896610607087422,0.24198460976244096,0.7479885996859594,0.3899360357122972,0.6664851691537452,0.4807935959483214,0.6191863819539445,0.17756852132049428,0.5443858838796956,0.6635322458779578,0.14914094129461164,0.16970139101867532,0.04013767280440694,0.8469557514982127,0.04221400803463404,0.025491663264615605,0.9284053885278634,0.8875859219478655,0.33830088481238385,0.13408637062996376,0.8762303954025181,0.28284782541972353,0.039911805267757616,0.36344525563821883,0.570598389437821,0.5214008486381325,0.616257887807351,0.5157686268538038,0.5833456153258152,0.9401882172460934,0.9298768848378411,0.04697755290828742,0.7395310385831833],"mu":[-5.663277672588995,-6.796080374493647,-0.27973297189167523,-0.5934053218972268,-7.322514887383518,-0.09684689040887262,-7.909167746683192,-6.1453591646694665,-6.565737122508876,-3.531904543028501,-4.96846567717024,-0.7577001334394717,-7.923849682216659,-0.2073991302488376,-5.057064399835866,-2.211298354013347,-0.4804402213422465,-0.6822616813367044,-4.291050267509242,-4.63561615006173,-3.405316888322123,-6.6884378325544525,-2.150666847514755,-3.090278095959005,-0.1346354566605079,-4.641063580462392,-7.438321447108351,-5.0471295984901765,-2.1440361535851715,-6.290155832489557,-5.655415660608096,-4.0456919822706805,-1.0438158818050058,-2.9806414319990737,-3.0237286475861835,-0.6117847179872027,-3.089407381861109,-1.1002095625421537,-0.7407294047778001,-7.339798436620761,-8.36028336530823,-7.520480796225899,-6.578211723580085,-1.8962942831839125,-9.63684404967147,-5.371299065727917,-6.52124027727038,-7.15426129585667,-9.286555039509366,-0.022410498881839658,-8.978885747723437,-0.5059140178860444,-2.9470232888952452,-4.087225402345169,-6.572099461978671,-8.582471647540565,-4.216949502641887,-1.602089231795465,-0.6433218653946726,-6.769125921969392,-2.3080133980120054,-4.256666612403963,-6.361739753772371,-1.7453281651323649,-1.8521464719116576,-2.475661117154946,-0.17566413996620067,-1.02664357551278,-3.009627063969098,-8.769356315255386,-0.892645902189757,-5.272104095339262,-7.385760848890534,-6.6904088721159605,-4.392398434526177,-0.008866332076273853,-4.091261060256642,-5.75614461856116,-2.714287614100128,-7.471335912742365,-6.853418835076564,-7.1982419133449955,-9.797465231201768,-7.7760142150636336,-6.479842360657049,-8.542896419600044,-2.9145014404132064,-7.648347794999242,-7.126424004819949,-8.236249600752028,-8.538493575072632,-9.556696807111846,-0.6200531889454997,-9.984997723253045,-8.764090316801898,-2.3313215954741695,-4.026247632006248,-7.39610951049851,-3.4392309255785847,-5.131868989917329,-6.647487166776507,-3.076987674474605,-7.1414816717836915,-1.903217519558844,-0.36337694525817144,-6.23997707663931,-8.432242485992775,-6.990449160381802,-8.706891505808825,-9.625816916928933,-4.838403323168114,-8.139895834699903,-6.208027229243003,-1.2065057715422212,-7.86176807953985,-4.964153653355499,-9.368665508672692,-2.6328490035350804,-2.0432625157396966,-7.701610126922002,-4.059117439839062,-9.712849707680466,-7.86969032400677,-1.5331676452575493,-2.9675697903129983,-6.546523100563187,-9.265600579436237,-9.93831628646548,-8.886144930798661,-3.8655628113533735,-1.9800733194130182,-7.049207797923174,-9.488923326389227,-7.923719769903668,-4.58710841497523,-1.6258908950364415,-9.077339314667059,-0.25258017696540236,-3.7379861127993363,-9.45883204143744,-0.6985820587413794,-2.7503820096536713,-4.2128195907276105,-8.612400844876644,-3.300130050959942,-5.916514995432387,-5.509885664690765,-0.758601416119693,-9.030294052581878,-6.547333157805559,-7.31744695780165,-9.918200670344987,-1.321009322986595,-8.868461407482307,-4.080224808545814,-0.38474455359370996,-2.9883151811805675,-8.62968115756005,-7.013236859828562,-8.017628606733878,-6.467515329920126,-3.724112563148967,-5.747398327830783,-6.82136606513043,-9.3169512749774,-4.051359667505965,-0.9822300493835301,-2.0675794890275045,-7.2538609909925045,-0.33707873101323393,-6.692463624470313,-1.2074004708776376,-5.6912621292556365,-7.842559284336343,-0.5808493253306346,-8.464337133442346,-3.4800364310899723,-1.320652939196021,-6.529529006236155,-2.8723854051197195,-6.242900099841813,-9.847701732991354,-7.028356077016102,-5.691973065000542,-2.1968017762672676,-6.4492287333971365,-9.994052583502565,-4.264390753702221,-1.6382508178978328,-5.094594028126345,-7.94382764954422,-1.977458059698498,-2.59741898373532,-9.440652689439526,-7.069601012378013,-1.409775877735151,-4.678942210440919,-0.7049452240618526,-8.259243339101985,-6.169715422790696,-2.1047790236325747,-1.0996436781012386,-4.05107896177213,-2.5361165518752804,-5.439744159732108,-5.608289312789632,-9.913925881511098,-9.057570817614042,-8.886337799665064,-8.896408492448876,-5.317424065396259,-7.606960087853995,-9.686628507340133,-8.286576803157772,-3.525818597752217,-9.067039207768321,-5.382591292908623,-8.445267516299293,-6.550464816137085,-4.829752949217587,-5.47874787798481,-9.709066879277744,-3.631838783043677,-0.2150606495334162,-1.3558964185501932,-3.830924734148453,-9.933795457337439,-5.346641015560563,-7.514862008995868,-1.3827314389893086,-0.20652108019377113,-9.137581258086975,-6.926137805098717,-3.8442035822191967,-7.43871900694693,-0.606621570702377,-6.278280277429646,-1.8194616501791283,-9.066615485024345,-2.8966585956027213,-3.124713751873791,-7.01145412778885,-0.19063934199550436,-2.322162317063121,-5.66018780673261,-3.9170953033030442,-2.7937335354809534,-4.629152779236576,-3.7655222017431367,-6.231824513778541,-4.121364936327341,-9.734809003431186,-1.3366899802379062,-8.594650024320691,-7.586355792143511,-3.2534794666062328,-1.7738519898168725,-0.6727255459139014,-6.363053702081669,-9.42289445342544,-7.270482769227811,-9.939099161663679,-1.9093302448656213,-1.6400715901163454,-0.1578027409507632,-5.258386723979296,-0.24663257585857856,-4.949306839636673,-4.584165162033718,-0.8633264683412256,-7.412087192665123,-1.3736651214563778,-2.142652964977143,-4.145733706174298,-3.9645714254441944,-2.994323247474846,-9.363073302520757,-2.418459554266672,-9.125555387255346,-8.179719898764814,-7.13690167847441,-0.7716516698024734,-7.474146030132138,-7.622158861956912,-3.0575494702865424,-2.374224753658274,-3.019905388068649,-0.2802124028846631,-8.849224913853174,-1.4589293461855557,-5.916205038802341,-8.132420998104351,-8.956005026965887,-9.22489176404422,-6.982584372098353,-6.9289514258141445,-3.377516289634539,-3.090122815938383,-7.396094017270345,-2.3964445244501675,-7.795941422891244,-9.101373319098851,-7.839825624026422,-1.8920035727296836,-0.5844578159962088,-6.329568001756682,-8.854940188662034,-2.615236059776045,-1.8736185536791283,-1.3270964058369117,-8.407956925614373,-4.13600773309839,-1.5800546995502396,-8.404308847561987,-9.70575616928298,-4.021771004081563,-0.4373080626521375,-5.305481032205488,-3.5412764046142065,-8.49033667493114,-8.54499625337353,-2.313757502815601,-8.188371721277514,-7.812547206384101,-1.62151446550437,-5.782955957586662,-0.7529599030078771,-2.040330999541813,-6.357754372841922,-5.938807122395879,-5.530938432094898,-6.98967959726337,-2.207740120924211,-6.204354072330169,-9.526707442354239,-3.905373001174537,-4.426016433798843,-0.5256326439821657,-8.731363409220496,-9.151064746467677,-1.9236579600721404,-9.03773061843445,-9.829943658909162,-7.908837863443479,-1.3839648027677276,-4.900315136494191,-4.172815455340895,-9.783463852437759,-0.7936410392666216,-5.746074586427763,-7.576975592419856,-5.834880756137548,-8.57929813016444,-5.6125384892621195,-7.058830613623908,-0.9857244569996526,-4.743026008071871,-9.177159361583907,-9.453229785582948,-9.765756988428564,-1.9348210029604784,-5.011059896794086,-3.4786972782338976,-9.261203531501106,-3.886668939445521,-4.8350629153831,-1.08250915633066,-7.245416209149322,-0.0999153337546499,-5.89118014750138,-6.460164877011398,-3.8784413503472748,-0.759430114981059,-9.329772580905733,-7.73050510249176,-7.35306624393165,-4.01519475449385,-1.2617572381244635,-7.475728327967461,-3.103109718514383,-0.7067223031977732,-7.528974961639294,-0.8749143504488144,-6.440456361200317,-7.857764001369441,-0.096695488340941,-4.790905928874314,-7.597240735616671,-2.16899859394716,-6.542782210905777,-2.448714980549558,-4.783355299782706,-1.3024635641964255,-9.24790876230588,-9.094631710556488,-1.1040550798521642,-7.68026664251396,-6.806588917799285,-4.434590817711184,-2.04940484157637,-9.764216770821836,-5.537891684283953,-7.782724579817422,-7.586839766335611,-9.050747471815615,-8.601394405256045,-6.091377778056168,-3.4626775277718203,-3.1637926731325394,-0.8004652374338206,-4.994212588799849,-4.060995610166557,-4.640632304921675,-1.033783427571211,-2.8006929032829486,-6.251717864998653,-0.7866299751531014,-7.852542797568855,-7.362254332796989,-3.2369199959917205,-9.401996522671187,-2.9823276603161974,-5.0687067233516565,-8.299678515957716,-9.298435306501053,-0.5722705009201512,-1.6567203155909738,-0.41563818587303514,-0.09830050397259482,-7.91065310097178,-5.185747262210983,-7.384172440898826,-1.8603893457539544,-1.2426317851386348,-5.0089008432376385,-5.0869083704611455,-3.174407912037427,-0.29488027160866626,-2.041049775833017,-9.947234358863943,-3.98982930183708,-0.7724368244845659,-9.343154949089927,-9.818519316957772,-2.7876736629147847,-9.194980634603759,-6.448735463673327,-8.552118878016374,-2.7981159842777203,-5.033065555997888,-6.928621528351218,-8.233606190137666,-9.527052181053397,-1.7779170895842644,-2.943064087090257,-7.383801954034766,-3.893220274619731,-5.259684270476283,-8.851798003641996,-6.121824470937318,-9.309782730083889,-1.7890713055589136,-8.80101662632999,-2.7081692719944206,-7.447861370514179,-9.701105617042538,-8.651943607778668,-6.488505712282462,-9.878637837980273,-5.772090543504471,-6.094040588029463,-6.474747814405896,-8.516568896797093,-3.848360607727146,-8.7531015144259,-9.14485772170594,-9.223036413710195,-7.114483093545676,-3.3952064067569965,-9.106304741924031,-0.41897894895212673,-6.753440368266908,-1.6374125035762988,-0.529682402366165,-1.8493147498256102,-3.0290509356673234,-1.3424393424452497,-6.144355687910814,-1.7177529102308497,-0.6838723292310744,-4.074060718938108,-9.069096004903354,-0.11859347677847465,-0.9810943916411019,-9.24416486395187,-6.591191241147845,-0.6403734727046029,-0.5512318106183001,-0.9829690946843495,-4.416182958341173,-9.175338782442072,-0.42486800449289763,-1.034133256073586,-7.402939164334157,-4.013527942571738,-2.633925989231378,-6.502873927959623,-6.807331501143445,-8.791782973068882,-2.8468902350117564,-1.9657122713951058,-9.675899514319502,-5.805456413550234,-1.6416511477203954,-3.8742594067649994,-2.691892810039491,-6.940760437419524,-0.20379676102647792,-3.9105226802462356,-3.5465192925856925,-3.6158298450572435,-1.5657080090044317,-6.617038408884001,-2.923471417915353,-8.889076246672866,-9.963138555788056,-4.430049926671284,-0.791356026766159,-9.965584679801632,-5.397966993908274,-9.670816464740948,-8.214530642838884,-9.358189967486357,-6.6418430316614385,-6.942611751721204,-2.1696345350026003,-7.395850285404042,-0.5269279280366312,-7.758545313403642,-2.6519558473145888,-5.64589356958898,-7.510647399506343,-0.09449468655205129,-9.274546283430134,-5.740714229278101,-4.022590442563285,-2.946300788080396,-8.27046699398995,-5.909579640229894,-8.136731562889265,-1.2246883954239496,-1.3050135485932457,-6.812540972884211,-0.006723271785162854,-7.761287763985225,-5.254716458526472,-4.292325164443255,-4.975809893353185,-3.357563709663427,-7.39638458440397,-8.620625868034677,-6.401621137034043,-6.463538379296045,-1.7523107464542242,-1.4828884967491063,-4.7711377529887855,-6.61754564630201,-1.7178870817388048,-3.166714131769457,-0.16191260457152135,-2.4441424324970185,-0.7572006273603571,-4.338106291592032,-4.329738877881226,-4.142975575069309,-1.1589033952203764,-1.0471449412144973,-6.4545420536776055,-9.623851488410192,-2.045652274628087,-8.165802436863476,-6.929584882827671,-1.1468073876470708,-3.8071696467125493,-1.4475219210849932,-8.328662699342658,-4.039157297883531,-1.5969839215322645,-6.519134779433154,-0.19646449980166292,-7.792593217749695,-9.401950534397766,-7.9107290173199445,-6.96656621923897,-5.209188261515527,-1.7213468634335594,-3.1290565121255187,-3.2967197249708957,-7.655375523770056,-2.714690788911751,-9.305702794416282,-8.711810679165739,-3.539614728253031,-7.089945362781331,-7.954638399085314,-0.7413610059083009,-2.472176205491019,-3.123314699516815,-7.975125742283058,-2.3796913776142747,-8.720444634125258,-1.122645599691665,-0.662108806397923,-9.467446581629238,-4.125281108096641,-2.5747610274943056,-3.89060772028464,-5.287052177062563,-0.06387570589202696,-1.8410203545419668,-3.7859596949125707,-1.9618775993057014,-6.387258127870861,-9.941645852187992,-6.9263398094035145,-4.4216205097630805,-9.320880402750218,-8.638436204805064,-8.375884118518888,-3.4817601807882093,-8.665663310983776,-7.822144470943351,-3.726391054884526,-2.886191396198703,-7.085628534358754,-7.474635750966496,-6.486158277931113,-4.554333212927835,-9.221448449713032,-1.8437330859616652,-3.400024856584223,-4.961768698911095,-2.6216728891999153,-4.914957101073723,-8.446959332603345,-1.0610942948347923,-8.789410724215704,-9.335056333941107,-9.12764148770952,-1.4704573277421384,-6.0850986874033675,-8.888480768781664,-0.39662391441821043,-8.352888653128463,-7.9457218446316595,-8.808224075243402,-8.854839588244278,-1.038267534495223,-4.845052256942521,-8.494991590933665,-2.033722950679433,-9.718496695677803,-2.3764292913781992,-9.212042620598854,-9.453246465389466,-4.140291589784657,-5.222380508340199,-4.73259219898579,-4.252371381982889,-6.825512209688343,-1.6098323243881008,-4.2967043352644785,-2.9843599481094585,-3.8950471809553466,-0.6675495149749988,-7.036854015603344,-6.089202173973353,-9.548791560560277,-5.630288676256939,-1.3247506667076103,-5.148892497323995,-0.32217949381373456,-1.1817384642203743,-0.9967568487975287,-9.282879185206152,-6.5519451931945465,-5.602815664550242,-0.4322888945737313,-0.8762880422474706,-5.079227725026456,-9.3440338594025,-6.1701613659865195,-1.9744284107154098,-6.104469575763531,-9.011278008083561,-4.207159693548064,-5.860553889973737,-6.47999429866823,-7.055352065507934,-0.7348186982078375,-7.02768794674842,-5.673112722193075,-1.4753805490978578,-2.318035005773611,-2.6828380108666994,-4.575570601731902,-6.8631404127132845,-8.631031330084847,-8.412768087682434,-2.95187025365377,-0.34751849825978454,-3.704813324209675,-0.2576014643107216,-7.718400917688982,-4.859866401216153,-4.532594706942561,-0.383939896672445,-5.153846796114885,-4.7263053255183785,-4.430988702883685,-1.7856559100272618,-8.15760173579564,-9.35890612335702,-5.500202854674374,-4.296788681102502,-6.797035002961209,-2.8119178641722,-6.110040089741435,-2.473596160709004,-1.9036813267029506,-2.78559082229503,-6.324137962045633,-9.371891806477638,-8.799822693535301,-4.316643639294879,-8.730849482042753,-5.5393751577478305,-1.332260469766131,-9.422992277331325,-2.351910481693402,-4.196730524143146,-4.182072029838173,-8.34072751338539,-3.6644208577169213,-5.314335599485213,-6.169425286400417,-7.119866524931497,-8.357005367427881,-2.2080215155268457,-7.3488818883984415,-2.636261397462294,-3.6065671558227774,-5.17819640548423,-4.2763635943158285,-9.553886286970382,-0.35845555226446946,-3.1555479500574446,-3.374975703817802,-2.995991194046619,-2.7880768223406016,-8.293913822259068,-4.085826035097231,-6.758189265094135,-9.87965547962012,-9.879882979587391,-6.215504891535872,-5.563206473343232,-1.7277838885083763,-7.744751149955274,-1.680290301541596,-3.8670334855171107,-8.59728582943771,-4.6987730402371986,-2.8552426254646956,-6.810278564805037,-6.55915633949901,-7.33786649649497,-0.7176583067165687,-5.527541849549646,-9.150654624348558,-1.3415728664569215,-8.693466387796441,-4.539215652907469,-0.9287078920432745,-4.237155253876668,-5.056255433127204,-2.7476600189561906,-1.752941689256573,-0.7135176703592161,-9.084600065917257,-0.2459677977265362,-5.26788070386581,-0.5741530197155975,-0.7665688577959417,-2.0785040811882016,-3.9770361903422913,-5.565892632299583,-7.770996269551709,-5.886787015292086,-5.046112103076005,-5.751463276220994,-3.206097537175845,-9.63049842429718,-5.183869802119537,-2.1334089462716377,-4.680582010961731,-2.112453233490741,-3.9900035260672606,-8.757411884619128,-2.8489425529475354,-2.981419353513801,-0.596452563552321,-2.43325234578198,-2.367038857280752,-0.4805863621469131,-4.024270361449782,-8.274195242698564,-5.7170658729292505,-7.036060599824879,-4.213118094822517,-1.8399674907619223,-2.219462175572038,-4.219329442712352,-8.955958781763261,-2.864524781086044,-7.532380153243238,-4.899436651107932,-0.9963308463676412,-5.824251529832704,-1.8424557474374925,-8.630838452739361,-5.264920684569018,-6.0524258209042925,-3.7112353862704173,-2.479679736098621,-9.923287742649205,-4.749574091554411,-0.09723230413425155,-3.016478388516046,-6.30151075753683,-2.677872955347098,-7.687087009031881,-2.7271431760812526,-4.878468650945214,-5.36517992494333,-9.73188754152963,-2.0942643056233634,-9.728683703784291,-4.770387678262036,-6.123220836443988,-8.199255897588209,-2.057506445735049,-0.42276878174627885,-2.1653045812680483,-4.315933306509702,-5.8876525800955815,-3.831888054628183,-7.4262199615208075,-8.608518690409818,-8.86493960307478,-1.4189232342993519,-6.764961559279485,-9.558042679306816,-9.809428227611557,-6.301464822675793,-5.702365954357315,-3.269342306199692,-0.3925687111690701,-9.187516642778316,-6.095611851187925,-3.354406272930748,-5.208713274603401,-8.174775978934894,-4.505405948527832,-1.5683746658373776,-4.910997157851056,-3.570050528573787,-4.086417883596218,-3.614389978856154,-5.247844588325101,-3.9590103810157395,-3.1337975158589026,-2.373438158197858,-6.430868125800164,-0.507367176863418,-5.445537876763071,-4.781199769730071,-2.3971075313513457,-6.694784547158703,-2.1735281351525293,-3.3042701988366407,-2.3906861002664948,-2.0519941220908544,-0.8039665411801677,-0.523194456300049,-4.4289543547842065,-7.364970881009636,-6.18536749861851,-6.583834354672183,-0.04871233698003463,-8.842781455712625,-9.269194275482274,-2.8554396071785004,-8.74659773594345,-1.2510215184594098,-7.109681065544189,-1.655159205881065,-9.393115545523433,-5.662437693740134,-2.592079309643871,-1.8314458030439162,-7.567802915034441,-1.1073775639210903,-9.458855369788395,-5.791786727186512,-4.366860998689979,-8.570951521546245,-4.336533563596754,-7.368245579753683,-3.0341328963744196,-7.494483846270725,-3.0299680281624752,-1.1669866146354035,-7.97452742820874,-5.503090441766371,-5.814244436644103,-1.6507540041648006,-8.772793605466076,-4.146535623964212,-3.9115511229794198,-4.00007385976523,-5.013653215831358,-6.569763455697748,-2.7976536648396633,-6.390891260420979,-5.69766737219947,-2.861997040418165,-8.89155369914956,-7.541496847535843,-1.6604265239079363,-7.967329865337305,-3.7684024974493657,-0.41583416080675173,-1.8216589327447208,-2.5540848259248206,-2.7670210930473815,-1.1436513843954876,-5.241861995845358,-4.376797370233021,-6.577570589987845,-0.17482066378634809,-9.858929136906001,-6.5271533046225105,-5.166888314664051,-3.341130994211694,-8.698339506280943,-5.988868434105519,-6.135304107231838,-5.016484471675408,-8.232522043715498,-2.8345252783574226,-0.28033325342184945,-8.085012210803292,-8.853132700714628,-2.0220292603590018,-2.5100368185486244,-6.65979930701533,-8.256915151618827,-0.1776533247767409,-6.669623985626294,-2.043008647467879,-0.02828555263415966,-6.128015230535535,-6.072457173901354,-7.464569892205675,-3.4686745601606317,-8.490124677148659,-1.8988689382426926,-3.9010656846854963,-3.552164905750237,-0.013691015548684682,-3.4276861865716213,-2.2978990046648873,-4.2582348046910585,-8.822773088103324,-7.308693204083118,-0.4460008105774893,-8.454504528490492,-0.24361783442998552,-9.333326758086715,-7.567199350816207,-2.480070666401555,-9.60258765140303,-4.339011955007235,-4.267674796213592,-2.3911520268423336,-7.574647467916873,-7.00799587132961,-2.0899602724471045,-5.41723588263787]}

},{}],73:[function(require,module,exports){
module.exports={"expected":[4.595110539791397,5.503349621341311,-3.991702929315275,4.448644267320558,-5.661996280963464,8.72134855408345,9.612550177124524,7.964463352541897,2.572257792632039,22.7866717242168,4.381087368348027,4.355095342472508,1.4580687134046808,7.025214387975675,-1.3103512999100762,9.603856365703265,6.2685747488129175,12.428764369449171,-0.15317621545939009,4.757631332156132,0.5216736042049648,10.08936646327156,5.099007221850751,10.930322847520198,10.693804594208736,2.8475891187741134,-1.1617247462281535,11.963482615816734,2.9136882796043384,4.629638198377961,2.7678665556171413,4.376317116953287,12.243979153561902,6.593839870644352,0.8857646853495058,6.585332928179191,10.474885186490972,12.631322757995637,4.024382209565128,-16.056801202659905,15.201885787472909,3.7616154972179854,6.289736312986287,1.9641080746646689,2.7384498426273045,3.965813517837154,-0.15400856986637923,10.902980517794965,-3.4591350793176763,12.195058720539365,2.2602575661278648,2.1677687879001564,5.768933868417751,7.483835367618744,7.74620997925028,10.001733878805393,2.6843742223412317,5.988026706779569,-9.636729698687525,-0.1036560539355767,6.4428025584801,6.4124486573149575,2.1769875914136025,0.9804070132875242,3.7124561620291767,7.752491138138093,7.108260135994808,11.06668394346241,7.692106913686249,2.2034137657125097,-2.227720379932831,3.0159752921985548,1.1452564465083412,1.090484225297351,4.065025445007539,-14.63744287959815,0.941019006459711,-4.498884915875111,0.02983321120066318,6.96086094046869,6.62330417572659,3.102701016629235,8.719664204261187,7.2812857727797144,-1.0155480608645404,5.475171879479618,6.082947472024504,8.021799577987052,-0.8322930891431333,-4.048671598375069,14.420608845232863,18.47601529899866,5.098559128300673,14.431703898031277,14.07841175319281,6.833356541480441,-10.738710785783265,6.736715743289036,0.27096598746052036,-4.851444854877246,11.149922008807643,13.856115854620517,18.170220828321373,9.046360017746393,20.914839120213074,-0.8349628341648307,-6.36905772214924,4.971595634443791,-4.533780338399714,1.2838607347421163,5.370509199869234,1.1313549925405408,1.7657966906449967,6.393349660576959,8.365561825563585,8.232689440397646,-5.066301499067261,1.345920345713544,-3.3432240397710964,5.886421752050004,1.9462051338733768,8.179973404599902,10.599650481241177,5.772993165207225,15.551981222867457,7.5669758823526125,2.973667960911111,6.6373398801289785,7.529339326362071,10.71518070973898,5.254674422262518,-3.1189353836068396,7.39142065771908,-4.004351036995011,25.97866686591678,4.30203395482233,11.06750503422501,5.751304538696098,3.8439266249786908,0.4953624991141097,17.496990322503407,15.631211682695033,1.722026146088653,12.26217078521089,4.184432331562156,1.511691348237747,7.845981676269662,-17.415098727599535,7.338858784066853,14.340011003197459,10.36614371974717,9.952478563702437,8.196361712011942,3.578082203646291,3.148945902874985,25.149887062142984,4.925421684843534,13.679990944029411,1.3047275548005803,-5.89713925007584,8.477887042120244,2.249309182054042,2.6518351141957455,12.775021038546415,3.122975947508618,-1.6053582472442591,13.791153811321863,-0.5975225693887134,6.9123761599077005,12.138934587030374,8.510702256901396,0.6127446091557407,0.3724274384101749,-5.432249547152683,4.761455998690363,6.115488710410006,3.2916753764353133,13.001187422162266,16.686288476435628,2.9216102944817997,7.393698282968978,0.7074704014346462,-4.871706833299935,9.629415082784181,16.88770318713243,-1.0076969460800091,5.511071295818561,6.060444919863603,1.1336486538718684,3.4303492127565036,1.7267194652132136,2.7010655227002465,-4.820175894626064,-1.0566526840142645,3.4398228040542898,8.11273734431099,17.677705349709942,7.639768430363343,0.786787170355701,6.607539371970986,16.15818960073991,10.949026521950277,4.693982648310465,16.586379511267708,21.972881644050144,7.5725359059726784,0.8161661172833713,12.088264796794473,5.901405829696378,9.227507890596366,3.323613349156427,8.77928041472842,7.788482093936002,-0.3038590477418439,7.5712688641091646,-7.396591760943961,5.269577343077878,3.9187398183783495,7.7072932425572835,12.92088268198719,-15.844251289650328,5.107252124272378,1.9296111826710307,21.78585991035084,0.49807355142342236,2.7655717583812285,5.1891289285617646,5.56752513885098,10.530211495162673,9.856342934737368,10.244497896003882,-4.769919425069608,3.504597820088496,11.862757290310352,26.250034549341503,8.814052400617062,7.238967818389492,4.336619452172487,1.1563479329828743,9.21239476076175,3.624080613924268,0.14912199887086697,6.036124543897251,8.617164867444762,9.480823342969153,3.8331988198040334,10.102649083491851,2.1480342897338094,1.9734603561752782,-2.5885561234996093,3.415241349645056,9.546599099697254,7.478483506396275,0.8836625200324295,4.145393165667021,1.6602892948811458,8.179929781329179,13.662376586005765,-2.47883772900647,3.6211666385287944,9.003954727053667,3.5614987199117,8.587734794685552,-0.3984908791031039,11.133351038532664,10.616030179522875,6.936240946404198,-3.1324071308409653,-1.016368621303787,-0.20992760797544374,0.4217279513892511,-6.1396508920838215,30.906333288393277,8.682866137836397,4.749976469194623,3.712351276686717,7.494972988505694,4.43252509087514,13.34074358522355,5.888824456497623,3.253192796103173,-3.4730076798327882,4.622662921556702,-1.8892665708426701,2.927217749349291,16.23235793758692,4.7938326098235375,4.112767185551684,1.613042688803497,-0.3216825900992353,9.508725836337504,6.398718859589306,2.9268138724370303,5.477677491762892,9.723289789172231,2.194450408829303,2.677704926426312,5.06004228310222,-15.356903228589477,3.3735782983045177,11.774301554803037,2.6089137538451777,10.006768780458366,7.3248198162670315,6.464510925818532,-3.3899557455550102,7.704230912906123,-3.3778696068385923,8.100447271629097,4.749996304551311,1.0351387626423643,7.543128749238042,2.411075451522644,6.80964409782411,3.8958168646942726,1.7767643943935472,8.117898140788299,4.1881237499957855,4.7509007206444895,5.650809767424811,-0.07749399606725405,4.70839922546952,4.766525337999455,7.294183716593,2.118947194716667,10.112002320805368,2.414990971103596,5.9264052202376245,5.040309533366045,13.745708074543664,1.2332760174662627,2.64455678966834,6.235301535636629,13.265927336287618,15.873630151963347,2.474528831136802,-7.329959844875884,-0.048916781772597506,7.56028235504985,3.689232986037023,8.693546594786719,-9.089446513833613,5.404429881153095,-1.0443605196156467,-3.8676804916558787,2.435944642638998,0.7068643737467895,3.6698475271301367,2.5494974474369485,6.584947171573973,4.376406308693038,1.3859372683398334,2.8524365629062767,5.882566586265392,10.355948284868896,-0.8621346577035545,8.686302954147926,3.016511117184117,-4.3764240529105445,7.090202504678481,11.16816160129644,-0.5545032381693318,-15.901625205862892,-7.397088900974362,-1.389511928326316,10.661230671262865,1.6041917743896026,11.241376029464224,5.389720300697278,15.565488246657242,0.41115840920888913,9.432298556915772,4.798646567271739,2.3985161819704617,4.911019524714145,4.90521935706549,8.205957696514902,0.8340604214541747,2.7851169803255873,-0.277761362800792,1.1828922707814642,6.922404184098905,13.307736543552666,0.3985020590482844,16.599007345398654,1.732869792665131,7.108989348165363,-5.373001038881426,9.02161499843304,5.66695126085738,1.4989400821492262,1.9737075810675249,4.7034411844546105,7.354445378442302,4.319476399737231,12.099414108927258,10.41775711119752,24.02597227749446,6.434483449207521,-2.6014570737815275,3.6791923077286737,2.3799719035155413,-1.5492721440277872,5.2541191953860835,19.16484563753174,1.7797262833113985,-4.615794072032141,16.96564875806284,11.737276769981172,3.5254969560502216,18.961250511021696,3.0256370459233337,4.042067438875982,7.268963177509614,-1.398239040304908,9.123034740479866,2.010183231258117,7.638748872779152,-3.0961849857261226,7.791935315472304,10.891944735853755,-9.38267945141164,6.742507839297867,1.4060725866634574,5.945675953056624,9.087640961972044,-6.839847314352929,-4.574388774251225,0.7595597474354618,1.1095660292643466,-0.2904520879958903,-3.83435593686105,4.114503232072364,5.163724406367155,-3.0036303068588692,5.738613783062889,-6.505309030456493,3.0855253647025322,5.923324750864375,-7.284388057599069,13.499176478445126,8.934697105931804,6.453960536772217,4.802399425743102,13.294783072341602,2.7362164937845024,9.532857041495998,7.631865964862622,0.1452241709266302,1.7280705861123693,13.923553964027398,9.145190443174084,14.93072829084467,5.928631342720629,3.7566268557859495,5.810531736485349,6.57223105186522,5.8010094866510284,6.480720615587838,10.49202834720473,5.184031551763352,8.335569117519643,-5.912871247808409,8.327443172253979,2.9629046944806383,8.743274853823907,-6.403675621593108,8.716297440410887,0.5588525519042471,11.563841817787813,2.9267830677897004,4.160160141613957,6.8089010265715,15.074587545381274,9.155119074180256,-0.25676389859672655,9.693371654687382,8.280962794164745,10.748383884816395,6.4866670054007844,10.725485969744879,5.494997542072133,6.5178081944080315,11.052528351074352,10.31325184031143,9.06397819120576,5.498601868309855,1.5008582152102998,9.836141296479811,0.2897485499814063,10.875973807790457,3.7086202028741115,7.6915261976209255,5.996625201577403,5.731802064521883,2.485978928452348,9.890020281739465,7.8059252793320475,5.814478617367142,1.4183604051619216,12.021575800956718,6.700034241222525,3.680449738039643,8.224214365435685,3.4600829897542913,6.313638694808999,5.652120222880221,14.675743447041526,4.6589116288099675,-2.703321158950479,-3.83161652751908,9.385494826872687,11.882813355173086,9.777322047167537,8.686940614388988,2.8528238165966693,8.303656956110945,2.650121246103083,-2.323101629911209,7.259811238851924,6.839680228634411,6.466607971162613,11.657421403511082,6.531760202564831,1.1254267615452616,12.64610240114855,3.588499660560368,-15.432274002720359,2.3035333844307444,-5.24899070206458,11.795819814183416,-13.385968103603544,-11.25030173595935,12.760374267753914,2.2945048188312804,6.0073232633071285,3.873284128851282,5.8872760974136185,7.9765293625816955,7.304573681556803,4.023040520608193,10.001867928599818,11.201703553744812,9.53313704789715,6.366423471518396,5.9247522779207324,2.8401102344687903,-0.4595048470574059,13.154385781608813,5.211964251070814,4.106430699231705,8.514822377314896,18.836961423447345,3.3745832608562694,5.916656292947308,7.003895328300018,1.3394073584331603,-0.464632974176558,-6.0056134336269755,6.576044120526838,7.8168245150392,0.34138481052874914,9.472240313610465,9.15599745317676,2.0001346915449503,2.7367353003929535,7.035148645240138,12.241388545018795,11.163056271237533,9.985493891421466,2.532553691832153,4.158557895748559,2.2842281932180066,16.880533905796575,8.844970445020378,3.5047453701915847,12.243339547151502,0.8112577492667625,0.4102174956948348,6.419378341305874,8.121552300121836,10.587575095182267,1.1242140045306679,5.194552714972267,10.035208294151111,13.671873157847948,0.9580032683043418,4.939701172178321,7.147376767558258,-4.120642978473249,7.335666892453517,7.975096188264256,-20.297678906966695,10.26998273529736,9.893977440560116,8.608659906008489,11.481841328326357,2.8815107270033256,10.812008472178178,3.284179975981163,-1.7895838461645583,1.4685454686992923,0.045443627520962426,4.351164956143631,-14.689679619110176,13.01234668573007,8.497674244476459,-1.9475675761080562,12.014245765641409,10.163878146367285,6.686908697319555,-4.762628032774428,9.302508301209055,0.9671814027132557,4.339390874192783,-0.43263728344320573,4.086848420069891,7.8015528416841065,0.032072821134399465,6.1045383290143995,-0.5751078333051294,11.109998155943968,7.862802090560781,7.179845596615765,13.24380057650285,6.803623085834769,0.5803183456713829,4.822502967567054,-0.12526102212107537,7.630620055486897,8.959972455572634,2.7583730793442287,20.04846474009429,11.79346062304273,8.23471896156758,12.033343688817416,2.720499846450764,8.946591832429304,3.4405598595900844,-0.3036062584217669,1.9484164370077015,-0.01175531642420452,2.0425295289343257,13.829236156434277,5.2184738781290125,10.238050281712953,11.370750498150535,1.108502913281351,-7.984155835289524,2.9246717629010663,-0.43285677530510736,9.82323989927844,7.601322824535391,14.288962218187493,-7.903610605204138,-10.723918963129385,10.93067839217752,0.5715696877378358,5.922923525616748,9.7925119157522,6.424817447115489,2.070929902136031,6.781975028533897,0.3282164685884639,5.949781265732345,11.505185606980026,8.215464432397514,4.823444033201476,8.622189410760365,3.777347152873894,9.033901511431434,15.2271542549882,1.2597296676909129,10.5757640482325,6.630494884357555,11.141459669301483,8.793172255490822,10.737351716451906,1.347102175586335,7.306271229118382,9.470019087106133,6.223143068588818,13.964890343722633,5.444991073041527,4.394234188490046,12.087356139731423,1.705656113926599,2.695501313383532,0.3981536252147242,2.381565168654935,8.70132646238498,2.545560974368667,-0.5492285187654087,11.17609869096999,12.231960838149469,5.486829623146078,3.131060639503205,15.300668478922645,7.3142131978620375,0.5984971943528594,3.5835783137097916,1.0027574721059411,-10.392025093151515,-2.0091573438386905,21.362914052944916,24.44491884565759,0.15573171121286444,0.3846690934778483,12.928617403388126,5.203969686710938,3.3725177312735015,-8.045725180059378,0.6369238168412701,2.4930864779222417,6.8862361886853165,1.112828831024707,-1.9627553344399091,-4.353371208774236,13.654260202596271,2.6588072088442543,5.767818882299584,7.154573001388039,-3.256340882176635,7.219225737047101,2.6802470570545234,1.827084378442869,7.225663776157216,-7.304836603305912,8.662713646748578,11.654030820006156,7.5379894368209035,1.8712416441881017,8.617555547289834,2.029882759954071,2.9788985092853295,8.357486974046603,4.5537910879451164,-3.907980898017214,-0.5571812183065923,3.1859879890793983,-2.085454380877124,3.3811880235948175,-4.325412087213174,3.7324807575653947,11.977852280499835,12.320016077844516,2.770481026995615,3.0914777620644127,10.096878336282074,7.618606206537531,1.5419514261696454,1.72663764027337,11.300819777375978,7.414409730025534,5.5584271407276615,10.52759544255979,2.782262146768665,1.1651117772266437,12.431802602660877,-2.593551840267132,5.206447821820099,6.199793695816253,4.195095579666608,1.7763326936469879,8.048782166883317,-11.705703364361245,6.404762767972143,1.492075885110544,7.149232510992884,4.721116951366363,5.984781485375055,7.945533839715501,2.309543043639141,3.089626242356845,5.1850548064653985,2.1049443203826455,6.935644014390302,6.149246801794016,7.26673390748924,1.141237502098719,-9.21359920479548,13.556320670266214,8.703861584548692,-2.3404485534942685,3.9050051242903745,27.391196713367243,-0.8654162081216654,2.599167409766385,3.322524030920127,5.9936247404284,11.332424808204308,-0.05944728456671444,3.470031801115925,0.058793132322876085,3.45457843964564,9.64543157397651,4.424709742284394,5.924337424024132,2.615301653908945,15.312965212175474,11.315523412587684,5.352686815790968,-7.685935952871997,-4.408720889506135,9.975234733178956,7.90805398439392,0.5765455911242761,8.481629249935558,11.317968255515456,0.9916982007395978,11.035268576430909,10.041819047867717,4.324375325541318,-4.116571342953213,-0.9626322975911235,13.323500219815458,14.79146121281868,3.4325561042283033,-0.15975634494679158,1.1044729008249567,6.5412996567358705,13.130938877058995,11.49341517310253,2.171550617294887,-8.630375666674567,-1.0230722089328426,-0.20596235758808312,4.220278976940279,-6.849230159506105,8.469140080971265,4.785525504661745,8.692060021068778,1.499724825820226,9.216981895669047,14.472338327848746,3.7563291857009973,6.072305036925965,8.826379590159384,9.162943003066136,7.453791901096128,0.27152736083396006,7.967051104094338,7.151758784402011,7.291583397342272,-0.912805164491769,5.377617828653788,15.827584105942403,-1.7179595653906423,8.541273002573739,3.7342461059478422,10.834431378247368,24.480493437107132,8.923386120301807,7.938616016641114,7.704086926557814,2.5547141134074156,4.426814817233556,1.497612986719067,0.2600069922289978,1.8430937623665073,7.642173022170586,7.942928093473211,22.916355641596667,13.149639278048248,4.116693804610213,1.2499948979302264,20.13618235602999,9.919749337504758,1.935631443267241,-4.881369650757861,6.892944772625758,3.3642258520693638,8.037406657723063,3.9934137358005533,-1.2309049753699943,29.58583503114003,3.8036887788620906,11.417661171552506,1.5849283231156859,0.7562636623586637,6.963713326541977,0.9750586917886108,6.743132602431091,2.817538610279517,0.28467481917329795,-5.636418242918008,-5.456471509789517,8.330152205669387,0.7861744925689695,25.903695191807614,4.29112367703686,8.173746949895001,9.42102723700529,4.478440440100201,4.3505512765556125,6.496682592275281,5.80935250910922,12.685720436430929,5.384957501538002,-7.622989843842541,10.602919443101351,4.0190397163920935,6.713815548855629,7.033810727735544,2.6349758189223422,12.012618357716155,3.2232314097333727,5.724922015304636,2.034872387425181,-7.387453805592147,10.54275565890258,0.3534207939595486,-1.230410847373907,2.159634844375238,6.26161922897269,3.9708708519618705,3.250204337790168,4.562906253295463,2.0283547423203467,17.84651460709495,8.426213250735836,10.209498577340558,3.039103071426686,11.143280314579098,17.10858653907236,2.07815646148552,4.129273556360266,0.7524522742405355,-0.19724934671301642,3.2649851513496286,-3.563066160566973,-10.62002292915972,11.868792470447337,23.57838540643507,-9.867973129194326,9.683268361156934,10.735219030245446,-1.0909971997690295,4.785099938067132,3.950298442680105,4.134070685843956,4.983060647073802,5.684837440377644,11.944206556726144,8.920135552713376,4.471075933189116,8.673798963028286,7.322453357366701,-0.7630578248106481,5.992036408470058,-0.09108971969990587,8.632327366148948,10.323786775040231,-0.06739126057861555,11.344288127667836,3.544311699609284,1.7659937153892795,4.846987931253903,9.945260766216421,1.0154567858111272,14.660887996982467,2.7791337834003587,7.958011303073246,-3.9129431872548963,9.568018126965065,12.051753991125809,1.2361451572319417,1.2830094442166067,-6.107493337383963,0.9359253511492499,6.319962348871189,0.3327605573944359,0.20029450130178272,8.232253407307276,5.107084601373902,8.903722101536706,-34.837429967828385,9.413891289234272,4.0787704331703125,3.552015253252608,-0.6006134983396676,1.6975133548436694,7.404110382898483,6.073974000103444,8.392319140240593,7.416106286205933,1.6278899131912086,11.176332136907561,-7.746692232150541,4.960128017899015,3.4268291144600456,6.797256387328736,5.740735763920418,3.3929218161194123,6.769672224979775,10.387610543541845,-4.072819782676772,1.0317921533025314,-4.664262652657101,6.85771231040533],"s":[2.571225689481701,3.029148244208164,3.5587679135191106,2.1160135072201145,3.3774630695532037,2.515526846189753,2.8167406023401864,1.5810224077659274,2.7710166019698548,4.9934633448183074,0.013983448000036702,1.1179469770600114,0.08507476713840667,3.464526908510747,3.269847556249249,4.529780856624548,1.5510980531490404,2.5840354685953293,3.6715261271967705,1.8211093834273118,0.258979323596773,4.7444354849129935,3.3961305799478048,2.2005754950833802,2.7883518758603776,2.8585533463178345,3.9968805672739673,0.4168168264749239,2.515240430611013,1.0190089317556816,4.234525258891565,4.34734722545384,1.5343790653956824,0.44569714500902746,0.9019508736626303,1.6992438626612816,0.8914820850337268,1.8797058921765941,3.6502237329059684,3.930547359618096,2.4771865223828895,4.241512395241845,1.9960514723518863,0.38169649379678816,2.8753691268398818,0.6252060629511746,0.7580767818845291,1.252173674713677,3.5285841822361705,4.087924938862814,0.7349820565661069,0.8951609388915049,2.009961293444036,0.885357756010624,3.665072466068675,2.32426017335856,0.03188400707521355,3.312179429137453,4.489411034730737,2.951155611368601,1.0335008702648918,0.3447841679994046,0.13475010688636324,2.757212192914201,1.1617468910452955,0.62479479660558,4.695704784796119,3.2754601778075876,0.9311147353938609,2.092047994962157,3.6172752359179228,4.511870882446951,2.5440787870378454,0.512209318549125,0.7732859157411209,4.839108252095608,0.966740815739513,4.125296897442967,1.8885044498907166,3.1631713266275794,0.7386713979526038,1.4315119749801608,2.5820902542371496,2.988772363681359,1.6171526404542969,1.2806794232071483,2.0720412439827074,3.9208453403167964,3.592330062239373,2.537747440276681,4.046386657720788,4.237596191109593,4.141029224186986,3.305824555353689,1.2946885366637984,3.701143003845236,4.923116728199183,2.3056160986875387,1.1515622992852592,4.87299059986861,2.2294630154269535,4.754582428411252,4.102063505279928,0.8247721143434161,4.9724615555806775,1.2518540693573788,2.591678880574506,1.2529386740300563,4.5154835958273125,2.021687624623522,0.7816495066159102,3.334763073594331,0.6730400956136007,0.3149854304215227,0.5357699953627859,1.3724139032194471,4.324354530530751,4.1768963536926575,2.0702320405207963,3.3779616124988285,4.62630060058625,4.999631134198755,4.472556963586889,1.7263506917109117,2.055875668449192,0.1813940907222633,0.16901541258172115,2.740592186515445,3.2550229228095198,0.7351483302253536,3.9912165196454397,1.9463371136530416,1.103740419921646,4.563849498925897,4.466918081336132,1.1852363281188727,4.784843424203372,4.074120944948371,4.711749743662713,0.7133068147147303,3.2107219011752797,4.139641427575233,3.973537650254091,2.919514986027555,1.0217277607319863,1.6100447517775152,1.1222041710890729,3.9473891480354295,2.377557461166627,3.0197333854363317,1.7481709401735246,0.9748125713014322,3.3141196362143024,0.15070476339391625,3.7039839660279315,4.5173306580704375,2.4491423731353046,2.8621057368021017,3.2931338651050845,3.3173028488231004,0.10294064049040208,2.148909540353051,4.535666965420874,3.7557844286025324,2.170911378991167,3.6779358058146947,4.4437255644365505,3.1769550120090893,1.05899342801686,3.1039736644937754,2.059130962439606,3.206243351435244,4.264886857107532,2.566280446504896,0.2690876216625715,3.0435533559245407,1.3113931192341621,3.0247389141504755,4.376973692239891,4.241313207797108,4.991119678098305,2.494876866082474,4.094231091178505,2.1295389955203814,3.076498696830672,1.8921501164870613,3.4410915550414787,0.686229387250541,2.6875151709554466,1.6271588866119724,2.3377824266449565,1.4756361578788868,3.930146549202733,3.6709235102886497,0.5645038236138455,1.0761504796017962,4.237057879869358,0.2902158581786518,1.5075288037655787,2.010568958165674,2.812122512585119,2.326317393072438,4.709535474674648,4.815192761546702,4.3499403079408125,4.5260213293385885,3.0151591858711635,1.818269806572238,1.6932526010638338,3.0825056446604018,2.890796809927015,3.133257962849365,1.8499188867616845,2.5961573510558997,1.0824185668055375,3.707482575281783,2.664446871708769,0.8643744580026191,0.1627557505663113,4.776486562649353,4.581627504152204,1.3785777940403487,1.5106831854369873,3.841447676533093,3.993432671035486,3.5391877003761643,2.7173372643201663,4.697457749663329,0.8882230948592973,2.1551388857195484,2.575712536713266,2.422700282733924,4.112678620181628,3.3648198935570983,4.895180359259184,2.856044676659918,3.5298990482088675,0.2594161865746991,4.0652262879967935,2.3778641503617317,0.24814664692997757,1.4690467368171756,0.047943330257984584,1.0809275336134083,3.9483603016223237,3.677029273530313,2.831807086924977,2.5375891866003633,2.206667200815513,3.793422030757363,0.294595734862122,2.4158465598522616,1.7381149243468619,1.1561793277021204,1.8315676290718053,2.89920092107,1.4597937364155478,4.366213036625326,0.7537227495114118,2.398286288722946,1.9749489281745347,1.9120991218419903,0.3816748743609255,2.7362216297205944,2.775553466951073,1.9910709027653806,0.9396803785186125,3.5701179100247336,3.116690693588129,3.4778908203807446,0.6153746223274503,4.988503901629753,4.800638903067556,3.402150558147002,1.6560092915555602,2.6961057115806675,2.4081783931575407,4.8628070239815795,4.575979930217601,3.6630895307364164,0.8076792821663881,2.0709073265685216,1.8442234173521266,2.3742706139323633,1.2150214725582797,3.962355698796891,3.5344735006386907,3.6055370145080667,3.1741279878202597,2.485718856087705,2.2216087024057307,4.297934148778642,0.9032223090907354,4.848766237737603,1.2264499919704408,2.0678287860904354,2.327093613456046,1.5818809179886117,4.970959774649795,2.1582147274905292,3.3585141564146292,1.952616912999705,3.6082074495575,1.772692216907129,2.154677874305616,3.552461200932658,0.46175318292574596,4.598004378237015,1.3809899864548358,2.6450623932996953,1.4900027537696958,0.170034170812714,3.0169687088147548,2.5200538170336797,4.618252812506972,2.893048684939651,2.0541858663758203,4.295047517506685,0.1905573055264942,2.1016884816411316,4.7678778973041,3.8162768077988996,1.4707657281193254,3.229300789392945,2.461792081383085,1.0356161902688144,0.27269224194973796,4.5195909667918945,0.07243717279211248,3.2959899318275463,2.761472575711493,2.2969299279418163,3.477762012219432,4.622773738720667,3.6247221531694884,2.3085292588900073,3.734741442385907,0.35366365556797397,1.7948449140384681,1.6048774043340197,0.7623286283439246,4.9070831820074385,0.2146547802728127,4.724506589910669,4.309863028952377,3.619128882720183,2.3292422645009925,0.2509019243599864,0.08735602625704053,0.27548775042822604,2.971283014093009,2.5221187637342557,2.8922733881353357,4.489440173362583,4.908295491511322,1.312891892096767,0.2256903739409999,1.5091646883666332,3.9443278633623455,2.5872792461817795,4.11478441483248,3.00478722292411,3.5646897007673095,4.19883402713353,4.690035931416095,4.606163708795954,1.7903076810104945,4.4640462578582,4.153939356007675,2.3998800705933254,0.23898644918511458,3.8460767485915257,3.4848916665106824,1.7634242821544743,4.1290172012529816,1.3980604871025304,1.420462233024189,2.14986635641385,4.262809094914889,3.0744020746999556,1.9831997852625116,0.45299945024054433,4.2033512382913525,0.6674699308013332,3.2604040237723098,1.9074317199952695,1.2767278130377924,4.919154282630764,2.867247171543954,2.8427736291632346,0.155277873682228,1.8473275389232746,0.6408226050678834,3.3617206804639976,0.3379197866133321,1.737501214752365,3.7850432453726848,4.734420962151762,0.09335960443236035,4.088298610881606,1.7162519687820776,1.7874883113828444,3.6104212925225654,1.1873052476250723,3.598681428038246,4.527646358075538,3.6763948956975447,1.873193204005097,1.0585271084273595,0.3358795738494458,4.992107602011783,3.7304268871481074,2.557822460099788,1.852466921823246,1.1476068785464821,2.4579052739950393,2.3253904866670227,2.590539653915689,1.7997985640323033,0.3171060245896118,2.306198009155429,2.1221942894228443,0.9832955485425976,1.9599954395920949,2.3910570413265466,2.8107664214915973,3.4530264768411234,4.194779844257678,0.5965852914635494,1.3696985889188795,3.2716926439162144,3.8097981397578695,0.6835953949137386,1.1575854950711129,4.786111657086223,3.700055436048062,4.987484122336424,3.7516168733198327,2.3260812560552777,2.588964664989163,2.274886360014474,3.8938989249043754,1.6307995057112945,2.4041607173245403,3.559469710546892,4.343339360125827,2.88297006893796,0.9042988304542254,0.030725661121054904,0.8472877228519349,4.62422434646153,1.0593654437157407,2.8695955271012785,0.35948680728326465,2.237913549596886,1.4824442011232852,0.186692164437412,2.2526858971201436,1.435080435215783,1.5780158079396722,1.3940810927942626,1.7194637297111448,4.375606427133864,3.794622616747535,1.5487621918476602,0.7566046767414447,2.068265865732509,4.8349606393200855,1.7291527881781288,0.7374968132614068,3.876246979477047,0.973426907111048,2.954545024680982,4.341906613128844,3.7531520432509446,2.3526787869261003,1.77206567188689,0.21461084590637558,0.7684892224204887,3.6426889111406133,1.9121148429448342,2.1128844018199686,3.7741295645650186,3.47053059812089,3.434676175571707,1.8936171983682148,1.8480878832450864,1.3142903921273463,1.2137560511010625,1.6809638424569495,4.847508879474448,0.31530431583006946,0.34782333729119874,0.6922982555630086,2.601671865931353,2.8066715825398845,1.998842033836029,2.0767069813363914,1.3336998295528146,2.377770975310971,3.3887186493518806,0.5949262274469858,2.2657643573206157,0.7296473800434655,4.135256903958662,4.104045233576642,4.961954885586474,2.979273877962094,1.1049015799979356,1.7576551944699004,4.194042885622034,1.577368254578454,2.3407701616404806,1.2302718540377233,2.2081513263970356,1.8667394406984694,3.5192213732884836,1.0488088208757085,4.855464238751429,2.0930899149618423,0.24253928044815742,2.4988769168435687,3.648425990165154,1.2490374320328812,0.8284656460939765,3.328791371508528,0.9345665912671108,4.7747490411227105,3.5447813443243814,3.5817952929706944,3.0171715618344894,4.922530084077853,3.986469493616789,4.9881205220616565,0.759402919453902,4.675052989860012,1.2173201317438231,3.293918831379762,1.5277106495569215,0.4732960629274263,2.2938271216494166,0.4162438605729746,4.6004830284514675,0.47579840766894477,2.4089815873642317,4.504683932677247,1.9283673813024904,2.3049387950021627,4.108396412177804,0.10576517626146864,2.748601955170865,1.7467041956655949,4.695463248428954,4.936682971592408,3.3249215583094593,1.8071417130217904,0.7593759863016958,2.015997034287702,4.821080446633866,0.3676780793348178,0.6869352832579145,4.775097714974731,1.662145429083448,3.1340664832559764,3.4733121833753486,1.4663040618556333,2.169293398942622,4.669490084996978,2.9788814217380155,3.346047907775822,0.7650019018971466,0.5902187265714476,0.4968481795950852,4.05508996909469,0.846950764434975,2.038372877962422,4.401405196371211,4.064029585495849,4.5165723222036025,0.5587659451288374,0.7145408738185755,3.6725525412211937,1.5211027342448757,2.3987117051342888,0.8661314752525662,2.3587043971888813,0.5319404034637587,3.353335261229804,2.3020483947543458,2.1432998367732328,3.9342691403786234,4.1291271052645655,3.0152396571369247,4.251091955577209,2.0710646388867984,3.9677933681725275,2.0169666361087426,1.8152958347290016,1.7173459492327359,4.5581377189636925,1.6293777949754007,3.9182941518982584,1.8177293424914553,2.4940456426883184,4.924652810875919,1.9115664529231147,1.6956297465800818,2.876221671924477,3.756206236498768,1.6808474246793181,0.24497364532647947,4.884727016178525,1.0206624486348304,0.6550220937594431,3.820574288940226,0.20784039879381044,2.446027817867326,2.3792889545862996,1.1078776675643742,3.7800329779984363,1.6634188808464556,1.9377882966788207,0.8060331362187145,0.6313381681151498,4.354825913093775,2.925896648402866,0.9254260589334751,1.1232061872941657,4.197286106099014,2.954291493327262,0.5418835668792443,2.8979763909952627,3.1192799807542793,3.026297723888179,1.434691743451585,1.6663516403882062,1.8148213208460773,1.4095411453069095,1.3579069158853485,4.4771015428471035,2.6625306753430467,0.7480472170769381,3.717939849647751,4.17586109232971,0.5149031091025458,2.2343413525818723,3.0699734525807196,2.4111829237430618,3.8336335384748454,2.008930248662012,2.016298454150073,2.793444680102455,3.9715883498528326,4.398963381526354,4.147934728305743,4.518028084082445,3.1953193205872497,3.7308711611309886,4.101870586428273,0.3041478694373123,2.9860849214788665,4.044856152712449,4.322589525603638,0.010204853945277037,0.9362065107829054,0.7275415960160714,2.905875177473527,0.5507947903859045,2.2588332468089636,1.3301347116207718,4.874671992157696,4.753941871071008,1.0489135147361894,2.2248334999291943,2.6648553710319933,3.8834760240504815,4.320671546380119,1.3776530389241248,0.14112748585738188,1.3030760205621283,1.801475652361585,2.443255009939561,3.8994694359975712,4.395269450666755,0.6802200413931869,4.03819724813811,3.392010486068507,0.8137696636918246,0.8245814753621405,1.9662563761229512,4.515058585504381,4.9757850142468865,3.3236350147794114,3.208768364238208,4.146747419200834,1.7828044753903916,0.9667703653143678,4.737258636308658,0.6547934066716543,3.3724526528011154,0.8828204914574878,0.6267688292959883,4.654264017107959,2.20951815868889,3.970420566633932,4.785165539115512,4.13203387807444,4.290642398265173,4.969008127690079,1.5223935914008824,1.435746927894287,3.1221465467704466,3.125874364116693,3.797206004055945,1.8347981046106498,4.287081349347987,2.6545646784280796,4.28472241279893,3.3469972934070666,1.7662549308634767,3.622625970433726,0.30018954697021094,3.6154698270137784,0.31335102513900703,0.8393811923089323,1.6459410669165375,0.588633619876543,4.113904480718798,0.4692492681092364,3.279804800431747,0.3221724085609734,3.417851679271232,0.13739012073386125,3.0009234269817533,3.9708850989253897,4.539821939591791,0.20285851716572045,3.328051557864921,2.6464125510446737,0.08922108988134392,2.453455500572127,0.18905952352326283,4.564045619855499,3.598602037929588,1.2258170099987309,3.941607761876953,0.2398515889378916,1.7313112381402396,1.6513170124290921,0.41048880183254477,4.489109819798072,3.448586653812823,2.9582533534663935,4.385117329878076,4.101925859167414,1.3525350599310237,2.2107423145484417,0.1576828855334489,3.2357876857299894,2.8438892058697784,3.889013881508866,0.17182702779835468,1.200296443668759,2.3468637894293476,0.5427455476336907,4.300669383278766,0.5650214669843867,4.874360547371844,2.359432800123348,1.410319343488039,4.238310277514998,0.26737608318031514,2.679017959570796,4.325869296312729,2.290867618079825,4.129636192193592,2.4733405928048082,0.9327020028604827,1.7307256103845536,2.9370005246450592,2.8453833646827578,3.1014244619829725,2.0728791104597044,4.581170735060743,3.7651927850069855,3.9420162228331512,4.580141394579931,1.1963565605395787,2.2607666093570122,2.246290412741141,2.16352684181472,0.09433581280977155,2.926397421504008,2.397047901357543,2.3270302205716775,3.0759497835034564,4.305191705178996,0.4184791021023726,1.5783547491382977,3.0937760211978182,1.375497199389345,3.87324759547641,3.625796662633981,4.352158769273064,2.5043083717446524,1.406607805502994,4.940394065867264,4.948807351610811,4.8922167179520155,3.3039005191389883,1.5700847071981727,3.1110777024169223,1.3470336142813422,4.750845921867015,4.765952511695613,1.4025582725423602,3.5981132972240584,0.2993789053908247,3.009299200173561,1.1392838037431652,2.8204709675481956,1.7218509429361573,4.705024364872933,0.24231124510642799,2.8675887340731085,2.1467292962413973,1.7618859059556524,0.7315908458000631,4.889798965994895,1.6840196667205354,1.642548191104788,0.41287373541085803,2.141843552888142,0.7796716459762354,2.3991584595207427,0.9187702676346676,0.7189874969820242,2.135506338293296,2.059236800887726,1.7418239344799114,0.2889937587968272,2.9520146381718626,2.1412521310407673,0.7787696792382948,1.503385908028274,2.1101592783416323,3.5214673000123398,2.4392799474768467,4.137572781156215,3.289464466444346,4.587966681511226,4.223944993958869,1.8047946030860207,1.7059388281721632,2.8093320628372274,0.7839785255106191,3.7991765327893843,4.346486645129105,2.9677306414196325,3.9605046459346402,0.9099553114777736,1.6393976948864275,4.600652852640139,1.829693495986694,3.694464803459687,0.8761679483383666,4.477833780395275,0.31447333039429926,1.2162886341281443,2.325173554040003,3.406722468233422,0.793845839375279,2.2059782663443253,0.3915800438820649,2.7121536437463045,3.754445856052376,1.6553724160228056,4.779331260556891,1.408248787273424,2.0112063667971656,0.6799925483559999,1.8989802885056328,0.07307344162083784,0.9917548188796543,3.531185719456108,3.5932350253547285,2.6097032288582556,2.840345917339542,2.181630434852181,4.965010067770717,3.7912172189412474,4.299153153677899,0.0646634157343795,4.811909027684468,0.7771494898702702,0.26363227983496995,0.40553788104634503,3.2335709885668216,1.4881442013041724,4.8947947678541315,2.749993570650444,0.7510197070846469,1.7178288711793999,3.474703537190851,0.6708812724170521,1.2443009120192594,1.3464432463155718,0.8531120863638719,4.675364157121211,3.4199914329139935,3.9642556731777323,2.376188452465663,0.8069593797589458,1.9082188991624327,1.387378665026866,1.0971059703213693,2.255817613961588,0.01061577120860413,0.8014795873206348,3.0134331554940195,1.6144993769107918,2.7385519090647614,0.6746622881209918,0.7846748735630416,4.4470089650189575,2.8201735991126817,2.9581016376584968,0.8532243682240459,4.9733309001358785,0.2274599524253884,3.498379595390583,4.750805583204002,2.0851107268442783,3.9905583986276394,3.775223581353704,1.7930267581916715,4.295192399371297,4.683199320052274,2.4126586261505913,3.6766087384010424,0.03416263742463621,2.555155270911432,1.0497838873001852,4.184137774015893,1.531768216193966,4.778035649302072,0.8254378756056968,0.4392779395058455,3.809337959240988,1.2723819926982871,2.433453573882711,2.31556252868676,2.8111419231188552,3.214983419536642,4.7281023334929575,0.40189573147385693,0.9288450839144646,3.313270324383377,3.333582712969567,1.3053987379923704,2.6184510389264846,3.0185066289190976,0.050056759826118125,3.1539892923041157,2.0304977081968465,3.485548027183042,4.809950887543257,1.0161678018455234,1.3990459066277083,4.031964121200607,2.200403694149827,2.1342492268895863,3.459266047239246,2.0815214967058235,3.717500601609396,1.1559186568095048,4.221257760147809,1.3974395494353187,2.3683741605518582,2.1159508373438705,0.5190007103379335,0.885005809255528,3.377553763659411,2.1577880395314852,3.379396395416009,0.9573332958811653,2.237120880673693,4.114337080173518,4.50209559473884,2.626173626929873,1.1369489942831168,4.743745526327272,0.2447890535512809,1.924278592229699,0.6348361044701356,1.489451753563421,1.879150202478873,1.8910767830739272,1.5525738308392356,4.251911132857317],"p":[0.6979577668819881,0.46369758339519374,0.24308543028211838,0.5514783658152491,0.014937327288314428,0.568384832632038,0.4919852769033102,0.7662182424435366,0.24436574773552922,0.9299781083746581,0.7611380617290933,0.7134792852177239,0.11903950244569339,0.6579690466884605,0.1525720668546755,0.7619530374405266,0.7308860211033197,0.7523230272165391,0.4097426836530009,0.26133779967647786,0.23877571780602613,0.5319420546941147,0.6618072857605994,0.6447484152296166,0.5693720412122489,0.6120248821080807,0.26635455912925377,0.9936898347518706,0.349986647401064,0.08362145733733994,0.5481384181098885,0.25618470442621066,0.8738985177964353,0.7991167211717853,0.6449285252672277,0.4380976460122241,0.9162654890154838,0.871233305367638,0.6072115425513898,0.0096114636166158,0.893829748032271,0.3374483436689919,0.8810077318235303,0.31566528679336137,0.24364683304668455,0.363389612532546,0.27072894003858416,0.6859121349104154,0.19779408216651162,0.9065518613464361,0.18697994117902028,0.2283312394953525,0.6502381861959525,0.7438876758913713,0.8505599878563914,0.8450294458860534,0.6484100331043905,0.28499351581567867,0.0646721746346417,0.47280322345283765,0.19783853128976459,0.08047403944841469,0.3767841865624153,0.3597807817995946,0.2515565376549478,0.7147818297430708,0.4428622324002498,0.7141333034644626,0.6299689852732144,0.7054647729151391,0.32097202428244076,0.4859721709143763,0.20045529976974863,0.21570499300049906,0.7391097095475798,0.03823291699626896,0.19644013924716952,0.0392787834162549,0.10106371962356908,0.3646442698196568,0.7001180327989327,0.18766369620278733,0.44896938359404404,0.5457551359430566,0.3316929189069955,0.7963205349459359,0.547990229885188,0.40427631968093314,0.3453027534446833,0.10415887795911716,0.9070984601027405,0.8858429499344422,0.3747426958698552,0.9367272011878955,0.9685736643848446,0.8338298161353372,0.08476704391993284,0.6397546304642916,0.16231528304713483,0.13085971811078534,0.8443335446510394,0.9195336551879825,0.9683546378246923,0.5424122809289149,0.983146453902946,0.24057830213223297,0.04355844143090892,0.040902928677459593,0.16280066050448516,0.6409441852896605,0.8227612956057588,0.42628336711831016,0.6889333885352646,0.6197419417267773,0.43551362704657914,0.9100767352284937,0.07131567242092052,0.2808351346551079,0.08614833456576942,0.5912584427296126,0.5915829674923594,0.6179241662390946,0.8579225335985314,0.32584793698369796,0.9834410023964606,0.6757497363274656,0.7455200036892273,0.7763355983781781,0.6480532133007777,0.9330122870753512,0.3694130629337702,0.06803302133903055,0.834700156195815,0.08070988918621902,0.9953201140909811,0.9584181439617254,0.7501419987081095,0.2775206714267193,0.5839339097255523,0.18125165861673853,0.9603612255489451,0.8512713584716167,0.5955032632544293,0.9677135551657974,0.5887969241137021,0.6511775308017516,0.14810683594791696,0.00991952192346135,0.37007996385525055,0.8573979658754647,0.822804578608008,0.4917976164276183,0.7593831646127465,0.5146989141489549,0.28208610578042514,0.9683271000174611,0.3393902738779049,0.8288130439549513,0.07755779753972081,0.09417283456516712,0.826381538908572,0.6971051851068177,0.35908182937278954,0.8606711039770207,0.16004904261867492,0.2805169520701536,0.7301175168598593,0.40113871492524833,0.6315529968719269,0.8917358870492003,0.441652039199798,0.33007199169275214,0.16091163915090934,0.0409574963051913,0.8029287330241837,0.2476510292497942,0.8342001212960941,0.917953204828436,0.8526304360481629,0.6185402358655565,0.45588287968148666,0.09542391530535888,0.20891582738528003,0.5042142559131948,0.9889166840120829,0.17646108747622558,0.7960161008345599,0.6710944575323767,0.44387212166354173,0.1640053705064637,0.6157022188459906,0.5747395340161041,0.18383063176461012,0.38013927170384676,0.43461450014296243,0.8584159001266141,0.9288567103815606,0.9769116774608564,0.22277277043482346,0.8434806377095099,0.989484074131733,0.809016375614976,0.33573181360631765,0.9188400954109799,0.9794655827828558,0.45894766107957663,0.47234907569712203,0.9430705017752152,0.5383365359903856,0.6042650838681058,0.7589486493112394,0.4614635456406786,0.7787484092031856,0.26259860461385864,0.2875148626472783,0.08399228338342013,0.18898441700030832,0.0897156987933998,0.4060653642841128,0.9361897524463514,0.01972086892043734,0.09744311095544878,0.08254265116585291,0.9964563629689542,0.45187254249824527,0.4528806792160014,0.6748057874271511,0.7052874716654729,0.8992260842111677,0.5051583755581532,0.858931674623594,0.05305173404761199,0.4913650066490942,0.8357189559298792,0.9750638153760849,0.7255260233282965,0.5859429495029074,0.9318915957734273,0.37203680160493624,0.5256379752029416,0.439689910008886,0.028548794894882157,0.7054228089395655,0.25331235975586575,0.8271200677586978,0.7170341683741526,0.9460388284609491,0.4528098303921093,0.3719990412475236,0.1493226727961905,0.7793601864206923,0.9651702248834371,0.6751066353903188,0.3388465502578597,0.4689341770849691,0.2295070358721243,0.8643641938510815,0.8084092785590338,0.007094405825385008,0.7507623280501474,0.8177402781400127,0.14543197588554335,0.3763551445628506,0.11229580222178637,0.6830682473774539,0.8517073635780155,0.2621896437828546,0.19373960710065918,0.029276271679044896,0.13268738422537685,0.554310581452838,0.19172979740210327,0.9874751870212648,0.8199707730691483,0.5340035639175593,0.580140118780446,0.8694697762031685,0.34907596430075305,0.7231765745343632,0.6765576180908919,0.6284163817561834,0.05806375553061871,0.19560533141322556,0.08593107679492906,0.8280551299411774,0.9614462787178029,0.20722795917401537,0.38600111777311374,0.16551146372680914,0.05357995808218452,0.4634691514307048,0.7352224334188873,0.8910491348557623,0.39293044889105566,0.867118633616172,0.3272377683295009,0.37338221076774736,0.7031123429937067,0.043426488145151376,0.4070950196996628,0.6556197878583778,0.0679176750953785,0.7840557768920242,0.3100752235774564,0.8944606914219213,0.08032970241955395,0.4991586627012701,0.09519855709833669,0.9529174492161119,0.19253283475077843,0.5868354665974655,0.6739171770398336,0.5358674538148533,0.45313287301647587,0.4727702162135179,0.12556683033392746,0.8034918700523657,0.6798798123599616,0.10703255661265576,0.7510324526537058,0.34213948741061384,0.3071658570883746,0.7065830957318548,0.40075937471342526,0.06595506567349418,0.6189492921878885,0.23801080336592784,0.48187227625594886,0.1233684697590538,0.8753239202647793,0.3573878325795503,0.31152651462969905,0.5101821475557937,0.6854399536065483,0.9039812974453554,0.31564237619303936,0.08828903190601833,0.08392097094109441,0.680693171431126,0.16381411967348858,0.5277495234613163,0.09734946913774745,0.20087634926919828,0.21099054833863895,0.2348590824598784,0.1996816706042721,0.02647835937386822,0.6284813224221757,0.8204977597929386,0.10183995206320562,0.5968686282727045,0.35226652042385376,0.21657295578470825,0.5968948407288182,0.7588117940162542,0.07058024518254213,0.9629382007825582,0.533682062783134,0.2353745924531252,0.7678720947190703,0.9323340244618161,0.12751325395071667,0.005231209222777089,0.02297191149633293,0.18354837621743303,0.648134542932564,0.4556499822721205,0.7275345550921577,0.38871075980280057,0.9803504742229812,0.6388244005093382,0.8279938074735513,0.7861227907907289,0.7842801393441676,0.5438561014974952,0.2601300789364136,0.33418854524198505,0.16708395607147386,0.27598248997808517,0.07323428836422252,0.21900390805146208,0.5139268471768856,0.8940167530367558,0.6066584340437513,0.9112613779808321,0.339749441743149,0.6334017946586137,0.04507365149791309,0.5456621552588563,0.5634756990415712,0.7814568890000508,0.17957280991801472,0.6296460527791956,0.47321104776727374,0.8860755575831594,0.9737576361333609,0.5878236268041988,0.9905654560797028,0.8999925675132845,0.2164755752805254,0.18643132257227069,0.7476139118514264,0.23023034475664672,0.2210354974613471,0.9324733768836184,0.2527298244005953,0.04075821037219107,0.9821014513003983,0.861537371282266,0.6522931405843073,0.8761092561290249,0.3196617001083304,0.6228589139485563,0.6790325170815541,0.0573719268525974,0.8655372941428758,0.34619670280319426,0.33000444855532374,0.027820806772731466,0.7411794532436118,0.8275292113988466,0.002104921965796258,0.4762635428032056,0.6280292034730175,0.3770334292229114,0.7034980536211255,0.014522032524361128,0.1644242920048602,0.3077934859777234,0.6388846451913641,0.26405451057230356,0.19292599060237214,0.03294652915968377,0.8976513784876696,0.16563271568158955,0.6717995702890804,0.2038117547516367,0.3668153193848893,0.9074596725065012,0.04688627213949359,0.9861604132503106,0.9016960041846969,0.8456632420852408,0.15545221485120608,0.7376794855556297,0.5390766430384386,0.9096886403777447,0.62045889350709,0.41383504478721145,0.8142765735454709,0.8239519341499271,0.7264124337016342,0.8980227205149824,0.6085541079244954,0.07590014038856951,0.5722819198731481,0.5191584258896205,0.5224480882457783,0.8309149863423062,0.9431150630221594,0.46441763050770324,0.5620657164685152,0.127557369711363,0.8414878121936715,0.5359646240678109,0.43495792441440617,0.03258180815874745,0.7934068040987996,0.1156578390061771,0.9123793432260436,0.4006558799762223,0.7731954542561157,0.3311960610101372,0.7715854088441492,0.6267891663429246,0.40553112582949047,0.8893892768152873,0.5158920833080642,0.7857738818358955,0.5207877160662708,0.6262258286544298,0.735960043066864,0.39628724196519904,0.9311362201804363,0.6704177270999576,0.8249329224485504,0.15669138869871357,0.3711312580053736,0.731352087521427,0.30027033760437294,0.8732782328675701,0.32300889228897556,0.6136787420799601,0.41912858562544364,0.4200481652882042,0.3767282080293486,0.9670672937234519,0.7123274970262448,0.79282428468915,0.12382758470051769,0.6618156323630591,0.6291814616701885,0.14544091902614187,0.9763437735417904,0.35889934724082617,0.5589313621883876,0.4024811422008512,0.9107003207860378,0.08864777779431754,0.13927370851422638,0.2426696287931558,0.7342391582692951,0.7102771575234079,0.548096175735429,0.4583830719301434,0.31551965027426854,0.7212762940431043,0.5853142300588945,0.14004411514461212,0.7136428118315294,0.42740132546980814,0.7422695387741003,0.7541958509198448,0.41412657231530936,0.04685059191880825,0.7835907481822075,0.5393929177581878,0.011392013108418642,0.339369534055473,0.18198973328191514,0.652922412900399,0.020376751311125707,0.038055348542089806,0.8882126715157841,0.7055975990656658,0.3242727994382244,0.39264824143001276,0.8427115362937281,0.6219210456229016,0.33792874535896655,0.27400346058765934,0.7297499188868828,0.5831791599576155,0.3789664508921047,0.8915292035312099,0.6530183789756314,0.5204933877994551,0.14539517794586376,0.6861000103865016,0.15430328119641,0.6799553094882953,0.9086242236214879,0.8765986189580035,0.38724787281496753,0.7665159492639739,0.7553106308410387,0.2434493444858894,0.13575706488012385,0.05925027237498792,0.7071580558505302,0.42062532783259265,0.4429908363558186,0.9294447517834028,0.8688907804478228,0.18686510569140458,0.29652246720506525,0.22610275807899938,0.8695190014331837,0.7229917485184538,0.5274846128151154,0.16898121737887095,0.25920480237558463,0.4992357014073181,0.8855874928986809,0.9188869528917354,0.15349145548713494,0.6620613504904833,0.5396409585707813,0.2724152229009462,0.8445854469908634,0.29987963466249035,0.7063656627853345,0.39200575331100573,0.6772532287926998,0.6626946142311232,0.8608774121011089,0.6351988049114015,0.7877908269363934,0.6369527599111113,0.013024540322088107,0.6719320348165299,0.7064195560046478,0.00047509922835264895,0.9043437947448187,0.5459679757251159,0.7100764733904308,0.6919224551880399,0.18356845845944725,0.7199976901715128,0.499308507124709,0.19026051864088322,0.5638377516353485,0.15927556185198477,0.4027901897080748,0.02212736841179086,0.9087188388626672,0.7367084083839568,0.2888199151451334,0.8289683744927743,0.8096686820319619,0.350837324881315,0.25830841122339754,0.5749501575864215,0.020834883348782585,0.3593507782686123,0.10161004034584753,0.5713405871258039,0.6556705848075173,0.3181856452204539,0.8154534018020789,0.1324084873276281,0.6992178477250395,0.5870472887341076,0.21824259366656285,0.8475285052852786,0.7265515166962211,0.3487083312268915,0.24143058520385008,0.4698523062692148,0.3224386184639243,0.6576594373038083,0.3873330214850732,0.9616341616201323,0.8385945126261904,0.2313707878519249,0.88920733331462,0.11747405689601798,0.6394954123753149,0.5841033615100832,0.38985930541756497,0.5883919424496069,0.4021219870211703,0.616415745816512,0.8371987735125521,0.9863004046327954,0.6370137010214361,0.8818875571994451,0.4539104924986359,0.10574368144858548,0.7401165442259499,0.13331315015617795,0.5393163777106702,0.47187444779911947,0.811241327920935,0.07229249310939934,0.07276578738275585,0.8867961731145688,0.19880720277989306,0.5007874489492972,0.3856706846080009,0.3497368150888711,0.33875454293668583,0.4725313079470712,0.9615459479091253,0.5130533083708742,0.9385136747158755,0.5923363389673257,0.037508566081014605,0.5285367875821654,0.1993026168922063,0.7741173452785142,0.7901912305712897,0.6728559540098396,0.9419361508486805,0.5744302721682966,0.8422605795047398,0.8341735022146555,0.9208918870974276,0.48443061603549653,0.22671841824771777,0.6068869077973085,0.5529049504620316,0.7465401091759407,0.6295589300345796,0.6146121105000069,0.7886076639370319,0.2069976144894059,0.48770272322547625,0.06864786937605638,0.39996829202822926,0.4397500113455166,0.33100312119526265,0.10417000619499572,0.7818077347438259,0.8811925183782385,0.6938364812554483,0.5626435889849233,0.8055613382817244,0.5359973973212115,0.4803175574864138,0.781162791404145,0.7124590423860895,0.061935000008283225,0.07298552776099898,0.97349605841899,0.9732713564112061,0.42493555953462847,0.12651894502316496,0.7976533268439154,0.2930882330194813,0.858497360929368,0.011180390742161928,0.22879938980504888,0.35595061129964645,0.9046118764498579,0.402749757145511,0.29051400256401116,0.13156674805065527,0.8560938329475476,0.6440651056514894,0.6058920985957745,0.7086643499131731,0.16417353703854243,0.9165510606981786,0.21234118016914505,0.6171901972002996,0.0921297922315163,0.13603029706464054,0.29749456092674365,0.643067900977363,0.13942931824633353,0.576878873061103,0.2601566402718869,0.5391611235224958,0.340171548802642,0.47810455753615066,0.9366187302641216,0.18111455805919685,0.038136047013052066,0.021959770216434915,0.022269944892309157,0.6128802153460275,0.14156901735771887,0.28770743692654754,0.8813770707177799,0.6821408790219305,0.25801594350786416,0.5650188841403598,0.5811526677930832,0.5361819763789937,0.32354055917152413,0.29964653159961707,0.9137155003169659,0.6811462128727368,0.429066271645415,0.817078370276038,0.5619479484299066,0.45057180854348977,0.8878929086954939,0.05487347322278491,0.2355864826593601,0.1166870447018018,0.7444379499328917,0.11125509415993196,0.3755604486008215,0.01185590525610225,0.2410438370566017,0.4854679329278848,0.3537280504509348,0.339873857549714,0.3597025919097636,0.12387976495906727,0.5406195474256155,0.5028712821721513,0.6206867495122119,0.55718538453594,0.7182501440873208,0.7932750518283218,0.3523482896442387,0.33605008605673103,0.026091778769880003,0.7602249272568662,0.9744935348200476,0.29710626503661963,0.3510055244764094,0.9952320728171236,0.25622979521901756,0.3864417014197117,0.18818321541360072,0.7035505615413107,0.6712275851298395,0.0396500155684405,0.6494355564704548,0.32283975677515087,0.6323940757512183,0.7471423484318072,0.4601103698162172,0.6281476480233774,0.36714823564877075,0.8758732311663722,0.8582643344857506,0.5544045725768172,0.0566262147344232,0.19006868169589408,0.8196261041531823,0.945635264762174,0.21801614597254781,0.6554697135341463,0.8576335383831348,0.09146372871920705,0.9085388466645445,0.6751427828388894,0.5656819647109088,0.1439308691934975,0.13309188130437732,0.9666469476595303,0.8384896948789902,0.9687702353110574,0.3810365202209589,0.049661870297116106,0.4921510651877423,0.9634005303684166,0.8813191928104813,0.46693687756886715,0.029848515843206025,0.36450684382709886,0.140925560117255,0.6708351614912367,0.08268372040071448,0.8556820690084597,0.3928173566941229,0.8920891462933622,0.06002322419732509,0.9032431838512158,0.9548069246784714,0.9205184352214208,0.03093007862491315,0.8163985486538674,0.5407868365952593,0.8804037833390894,0.7030943251103658,0.6997531145725993,0.6697911150976399,0.9914138700290573,0.299480776957155,0.6751549875666634,0.9132746866617947,0.21598372699315505,0.8832682403785677,0.19946596940373684,0.6339885824472808,0.9968183993362201,0.7883722306222007,0.29253020956115683,0.7797028501704537,0.0452517656243443,0.49856267959410205,0.4365891860792934,0.3032374774001074,0.5165392054465134,0.33305438833031964,0.5304315495054268,0.9455530675504089,0.944162851919927,0.5254625022278812,0.42651433889091117,0.9510241449846124,0.9627998260510251,0.7970680596417019,0.09889318542217307,0.6660779249152811,0.04211090494946812,0.5225690685337785,0.8514339998720939,0.10899903697259106,0.9995977696103042,0.24642718858590484,0.7327967195166993,0.009625951275463285,0.5608432611159206,0.46320674515278326,0.3584417160330171,0.04172656607508629,0.6520318180468887,0.3609995209265513,0.07085154632289004,0.013019652786749214,0.781853561890737,0.35790545067342383,0.9853494668091611,0.5429016687477393,0.7476541861628552,0.5720466642130746,0.362734506891774,0.5886371075148218,0.7756896960898949,0.03218139797799413,0.9767433570839565,0.3459457086641371,0.09024551798697544,0.9144066374479514,0.5612371881759259,0.7995426339255829,0.8121315365236199,0.7367709882685107,0.921949910872075,0.6151161761721233,0.7185001426592561,0.15735270389370304,0.09102658105895034,0.699533530276659,0.06570122166181847,0.030564506078247122,0.07804957558266001,0.6943841961191526,0.07489722003573851,0.6037245258483563,0.6948293314619967,0.21950527236957718,0.94507588958864,0.6826930502644055,0.6976932828567535,0.6858833001752103,0.9411608910759222,0.8599985030266808,0.5739001129999795,0.4434701594184507,0.2897009742378365,0.46744059345664457,0.35232413319150835,0.10816600039641822,0.08519531567275096,0.8482046168859738,0.9784872412724737,0.024294686908029384,0.9361572853123734,0.8753157709696628,0.18751758351949266,0.43135201943188584,0.7033121096238677,0.04884367768030318,0.42642396365094437,0.10474890679671067,0.8921443148070634,0.6830086542840057,0.40003214602079473,0.9565919513344991,0.10232173903469599,0.0831772352595408,0.42341791123536243,0.4207015789653634,0.61224052308927,0.6099763381626417,0.46845562346752434,0.7816961461393024,0.2374885607850783,0.6560403301939519,0.5389224681038756,0.7481494135813813,0.13493402229652496,0.972673205732115,0.29846290290582256,0.39110776624494403,0.0247020392780386,0.8133972878616491,0.7518855978435746,0.1472822817265902,0.2264938023767975,0.0010961610378317221,0.5001546139211908,0.3795861606103783,0.2463423291710476,0.12773733350516503,0.788288039404587,0.7333424427436073,0.38623147481394704,0.0001437841671823037,0.8745675183410515,0.6127130827693539,0.10826799866993109,0.1977351767586264,0.057488684592899464,0.6874461612458758,0.23108744454225394,0.5104280178986311,0.06711765399944158,0.38721646377909846,0.8965007025209475,0.044987039394376094,0.14883911632929192,0.2037779683298777,0.49690944265709125,0.9815949953290704,0.5121230062108617,0.4902045407917619,0.5706840246248504,0.001864058284510195,0.37258991864682733,0.036472865453391456,0.4779207109829309],"mu":[2.44147313373295,5.943986585813921,0.05047893141788107,4.011379189856719,8.485662874616436,8.028913725586532,9.702859496293247,6.087664820832699,5.700434594760562,9.871812243582577,4.36488154435372,3.335144727184036,1.628350742731488,4.758524622491855,4.296027127625455,4.3338325497896495,4.718837749339658,9.55779651416075,1.1870380640298772,6.649812952174292,0.821935097668407,9.48235171292639,2.818986052675796,9.618705123481908,9.915047029054636,1.5445698007591258,2.8879046964797883,9.854696561155261,4.470868352379962,7.069277422024669,1.949959767114544,9.010128698657898,9.273609613471695,5.978428837632905,0.34746201260009935,7.008251387864832,8.341876164933769,9.037498773210643,2.434322687229098,2.1618392865508684,9.924310842399693,6.62330488471553,2.2936255276812934,2.2594513520736736,5.995635348059752,4.31635546641528,0.5971904756603186,9.924936755468988,1.4813726485945788,2.9063055207678357,3.3405007049997626,3.257858193073855,4.522584315891615,6.539801468462514,1.3726493783319738,6.059471715310707,2.6648593724231207,9.034652756169857,2.3570283688019478,0.2177088116906667,7.889557764571517,7.252316561426035,2.244796579913677,2.569431797527104,4.97914121043782,7.178477809574262,8.186177079113806,8.067855904949807,7.196675881737531,0.3760972365024129,0.4827341965603127,3.2692087622376875,4.66486520280162,1.7516816779638789,3.2597669475688273,0.969046382147889,2.3028609277778633,8.689688270068658,4.157085937215646,8.717252219383685,5.997014255679161,5.20024241981071,9.248568405285706,6.7327444096582045,0.11732909420860249,3.7290240405455166,5.683968340161954,9.541826360175685,1.465904850824351,1.4121692475649006,5.200063954412126,9.793330947392995,7.21844973925368,5.522716373481364,9.639988625976928,0.8633504863076946,0.9747219912762417,5.412601958842231,2.160796214278462,4.374971489206936,7.380274599256276,2.273821714355142,4.137033771067844,8.906101106118191,0.695830809547815,0.6040579433551874,1.6369394157056072,8.924354816810604,2.8604852115032386,0.11236446641435194,4.170545358257868,2.121883994554108,1.2306372622957062,6.239494067825242,8.504535288716768,5.056138335530069,6.032815035911008,5.273551394970079,1.5458310523592744,4.639379149572635,0.23209993028731501,5.776417560721727,2.5573608140545545,7.028093063946221,7.155521773615585,7.43377690300912,2.7920000995891447,3.2268423343922836,5.542171195721794,8.77886679115306,7.388919991000728,1.9752208956121664,5.604121096012744,7.09831112832182,2.0369209790783227,0.5832124631307933,5.807192874208438,9.649396514893148,2.2469087821476763,1.5709509376974773,7.262808809758614,8.40916220037256,0.18520801094911832,2.334977109369605,3.8176380435597546,0.5066704992855309,9.809308450066563,0.755844726149304,8.603419267043417,8.923079152152582,7.681887512382753,9.984464579712691,4.387441678928104,3.569218864213617,6.608975385592033,9.70012599839734,6.556581218662454,9.165768042053529,9.458531245299097,1.612294812227999,8.317279421386443,0.4580841070290309,5.279580530377672,5.93620653466755,6.722050079719986,1.85888509982018,9.368674202885076,0.6755554328638036,6.341700510785355,5.593907308563734,8.993486150302147,2.8823143254246575,7.415720168403022,2.6602606018537656,4.383468472716958,9.497423287750735,1.1728682460686124,5.696876520024996,9.003024450645569,0.8715424344769596,8.276770023511768,6.31879073961521,0.5796510909235253,9.593516543475918,3.070627082276385,1.9071800181404108,0.8257555418518159,5.571067779276682,1.7395805493339922,6.080540340011373,0.6248157431328649,2.256581612858284,1.0381282134462433,0.7382715435771248,3.588314613308796,6.17330451560699,6.791608464639163,6.552889936997901,2.6705657170657227,3.2210230229588332,3.3790814785670475,7.59068152297403,7.907643891105998,4.901395684009038,5.16077676308835,8.317427788154934,1.1499944640375714,6.983786122582982,5.641241456244628,7.922780661981741,0.008088717893781627,9.263218782896347,5.4605671919642145,2.376688293157523,8.553546932754214,1.4616958325028029,9.150671156814887,5.921591557268622,7.769181951648488,0.09169647614293064,2.0523185620513917,8.17591527655473,5.5677758249425136,0.12373771058120875,1.2692361182535539,3.4346135222197494,3.2054663503447967,1.4684996437639009,8.586197633666345,9.811873293968521,5.591614790312008,2.2122468513626314,3.646663755208015,6.389158553833116,8.303407660707094,6.037861341117718,6.013320995371538,3.6579566472696645,3.2844483034144822,8.968326218540808,3.6842364814286843,5.33070885656326,5.994257729932495,9.785673035389387,3.300247480684182,0.4143067819867219,1.9923001482423208,2.628461241990807,3.1289825542193794,4.01170738361694,3.0434786953613413,1.5215630358699483,6.207272072384466,1.6564974227345641,4.373283335258522,5.17150235942286,5.476361413609581,7.37630900234719,1.2455543711909356,0.9766190838053657,6.039335063617082,6.947611437882442,8.780498863047923,5.2586530751368565,9.001980443526062,7.135527929795462,7.908451883644101,1.9581944808305174,9.895990040366447,6.319477196663017,0.287513018576413,1.037855094893152,9.939832576821974,3.5246973127819192,4.524387387181714,2.840569218178013,2.928395419256984,7.462556610530287,8.946551013231431,3.185476744844098,2.8288146353834343,2.2973601100979035,7.23037826541052,3.7243649298060255,1.0173184109915945,3.487892285646177,9.536093235013524,5.786287439294037,6.748078850131078,6.816087461416547,9.833934322254114,2.009311856516365,1.0286898689743729,7.586942904435663,7.422814173348029,3.6847448385031445,3.882520828909093,3.6962032811245904,0.014736329888069832,4.185040120200525,9.611973552205376,7.723061195829326,5.354129552655181,8.742561699839515,1.859668082114423,5.270503403699111,7.705784875075161,6.975690128480023,3.94694613509716,8.542052134616284,0.5122989038873604,7.41969145446467,1.9774867506229876,7.28346577634333,4.3993311429063375,7.391413163477763,5.225063650360118,0.9530101017335091,5.155152240839261,3.330280224905271,3.0396225635273133,7.812569412016586,3.4739482724544724,8.593338028010862,8.644052312174864,9.60963433850408,2.732300112266348,6.254268510672065,5.1823523960510265,7.322235694019643,2.8534867191201108,4.466004657689647,6.093637606690785,9.665313979778645,7.746040065690676,4.261032148618476,1.3895676404792767,0.7964196732376405,6.201658050907475,6.3053734371681,8.608842531699413,1.8387660672197637,5.700830814902851,5.18709813614506,1.222588130504212,7.460327377032641,9.102833063996263,3.5379465863086645,2.41674044215598,7.184669071712864,3.2103722176096627,2.9221377776424173,6.571178440699685,4.120266105387927,4.730176738688918,2.522251426735689,7.951138573148282,2.812875596811535,0.2708137820071954,3.9949507182653154,0.3746390455520632,5.224084654524939,2.8053953726186265,8.349559735691196,5.610316980317647,7.847558220631843,1.9226293667662109,6.857014345713179,7.2703528569219795,6.182300521597717,0.27487271864988116,3.3882843436899224,0.26232495674908707,0.12231341912065208,4.184822984481354,6.366601609077556,9.18508400278249,4.2876840612525635,6.896503233907383,7.525185051799559,3.704492266707271,6.897162238483821,4.3443276000138376,0.10929563996746827,9.005087680694109,3.0001883840208876,6.410825390873505,9.646831611068787,8.49645302209284,4.941247549742243,1.3010886358859453,4.780249629377014,4.363357475090293,7.7150185613440865,3.626312765946058,5.820454124184256,9.074159112394518,1.9924595130552158,6.229359141497232,2.65742163501844,6.207862038874623,0.43889066812735633,2.808546122524902,6.749698949480425,9.71716011800801,6.688173825587526,6.996047254944491,9.46355683846548,9.802164337225188,3.3141835967423328,9.19623513066593,5.843328915093906,2.7588061718852996,5.880855625776851,1.8140465295808994,4.546258840104991,3.488665150870045,9.473278225890276,3.2998598822935388,7.458305586850392,7.275326903999792,3.6929442321799,6.835937879390796,0.37948318709287276,7.146366774691115,6.6591069365019955,7.723153002178962,2.244942014846898,1.2430654491087822,0.32811673599688396,3.063034479844322,1.617879426673896,6.424623546201939,2.650146816930694,4.735038003042915,3.088132538783488,0.29083059783336473,5.133546632922066,0.6128705323146244,0.513597605031193,3.7938607818051295,0.30498860856362553,3.6799962354569304,8.871352327674309,9.614496647809725,2.055936708376065,2.8736599474095548,7.187406303024093,0.15592081183271267,0.47574419752814734,6.786733565699157,8.110724108608958,8.688080099843908,5.770011912510951,9.350071573327552,5.378892239247857,6.5579171319919505,5.5985994491845625,4.195891945008762,6.060711081530801,5.382786366242806,7.906477090345561,2.5002414590083966,1.9929276822354836,2.7397166506338055,8.941241146553821,0.6095590451577149,2.210449532384684,4.076308777891324,9.8358579688066,4.4878757193568415,2.966307278543161,8.885297425941324,9.789249707653811,7.209234612318946,0.6430668714349297,5.999468895802376,8.267315743590158,9.749626868955026,6.183599574605143,9.738721399653338,3.3291317520416386,8.106562801299495,2.0143114628216208,7.874374228863646,6.128619917211009,8.609035021771849,2.1939712842267545,8.620572684069929,1.7118622321688015,1.5190196659800548,3.9419385497023285,7.530552766822667,6.2225578829020955,6.571038116382071,3.8990221350959353,3.1343303628466868,5.922943736910284,4.024607680632652,6.070880055974421,9.746404322117204,6.385492651989235,7.692700815920537,5.509788649092151,5.859129496511056,5.341693363392508,7.612775169622266,7.757226005569593,7.233617916226535,0.49795852903037785,0.9416178671918174,7.782513280567898,9.783773343280107,9.539902467684957,9.055378923137818,4.298499593454124,4.957576757641102,2.288672573885062,6.4891950550100415,5.348521604129339,6.9106136628342725,3.8233006611131803,7.567108978553216,6.96509140083061,3.62143470853594,8.362894681480109,3.4409326075819435,5.879271034308797,4.664730124301258,0.13417760095479236,9.889239062489727,5.677875704381536,1.6256569690629386,2.421930848618865,1.6307125800065614,9.439767318052716,4.404271836613041,0.3582908953032016,7.21617234156022,7.622883328213426,6.258156017630537,9.58839036565006,9.656686733128817,9.768151687587354,1.2920068266589402,3.076289895479085,2.681946505250432,3.6229653263664274,9.941829422008974,5.391896282319902,2.0351765342439765,4.502728081310239,9.631003735116355,5.640004899519204,1.9641832662302283,4.966994392982132,2.200433870894145,3.2669511336102253,7.324224497722223,6.251891339946683,8.036785926195746,1.435037889693802,5.186911427030756,3.228892539468924,7.1076750626791245,4.003494367231646,9.70435467690115,3.38470797947666,8.305264845853234,9.617263383575825,3.7510983147597465,4.778349949863021,2.285747155858846,8.58203211109581,6.789150526304,6.985216904239813,9.283421588580818,0.16549435189779915,4.847311998586356,5.473527382990686,8.727390852791823,7.363816564766934,1.7918091145216697,3.4166822350934356,9.450287568153348,9.37290643937307,0.6629968367169847,0.5412649305811645,5.853251420604256,5.155151232051667,4.515046142653865,4.349484561899544,2.773462492822063,0.7201213622978742,9.512088472082187,5.05448722765816,9.849868503090295,5.590577262304315,9.190060830441201,3.2967876630482307,0.5702738062463597,0.462514698377281,3.0694693325386946,5.333451534944773,3.96768369779829,8.619392427829741,6.752989868581791,0.6442599660927395,6.085699548776644,7.730248415898555,6.837655847802262,0.3896806407205511,8.994189736176457,3.4890633768544044,6.548382213123485,0.02034294181070928,3.384048828155841,6.269148701751595,0.8764112205393482,0.48800549753970524,2.551835635971984,9.475326273991172,7.579261967797524,7.985393458216992,5.773763818463673,3.9444481514520158,1.158452112471824,6.108408166342636,0.3815076834138309,9.824439578925519,8.606186869803793,4.087201551292616,9.999808307450824,6.806704423309,9.95719138776334,8.562883380920976,6.380215291233835,8.138678417916296,2.979358736278528,1.7017039031370773,0.9970364106614249,0.2849435852807636,0.27887883263542745,6.991131918031519,3.0164419804819875,8.981398446096414,5.198791488154084,1.5542893321843732,0.20055354255067215,0.822176828432224,3.3416072539550457,9.383018581472939,8.048607449106806,7.874850223867959,2.681903069797895,0.7742831405926887,4.353352610224057,5.771531394207196,5.910003460201104,9.934107126656444,8.276776165584607,4.77632922956569,7.257397229433302,0.2953662449511585,5.900887786704345,9.522283624612458,7.1297360727686705,6.610748799717512,8.364069522732914,5.6271105873899145,3.0297298331720413,8.923054215585971,0.5033259415080193,4.376500800474612,5.831171752174695,4.6360741898688,1.8131300975571119,7.355864848842673,1.3558940899962435,8.90506009540207,8.68773707003484,5.704159309415655,9.75251283274436,3.11406942153293,4.076747591254428,6.770854952405811,6.261529713157765,2.7355379904493593,2.5483713147810905,3.179073301207427,9.794768374230147,6.046780009788404,6.6023247411698875,7.080965111590107,3.922825533918357,4.028287008472238,2.8875331931621173,8.567021992939267,7.219766357463515,0.8641468893809012,2.4602285643108623,0.43405431553218854,2.2570255162127406,3.6067926488565916,7.0551052479824765,7.242597352496192,1.4058561327107277,8.674595160845666,6.112670468732732,6.544333962717865,0.7840595034038733,5.948829956977968,4.435182952869945,4.744766698760117,2.7587626147947297,2.8020279414701155,0.4074762238674645,3.7326558766793205,7.685832647376083,1.611326218476603,4.209810114015808,6.887732723399025,2.6278253798014872,6.468316717822951,3.780567272254105,1.0409187821211652,8.57240043478818,0.300374336571434,9.065919459628557,9.723194141587657,8.124355449740964,0.8117970724043566,8.761149460611104,1.5588398627457,5.609728351293162,8.755347062211637,4.007471211377121,1.113431382925072,7.984679158607737,3.5247014610876692,7.193503546519668,3.2943273964878883,3.9004537344707857,6.9947740400096015,9.519432460324172,9.310094281413184,3.023837789726358,2.63864199271701,9.556060458185629,7.5590929954140895,4.852885436806926,4.654424291423327,4.319728560332143,4.085911257443557,6.73019047699611,8.503287047410064,2.231629276337652,1.1963898527537964,5.735674727374265,5.50097804424732,9.783937018929587,6.5476032233217225,2.9117815129251223,6.653079363398149,8.324733048137603,7.316167874706643,7.052822731215205,1.7754938440345458,8.571243762681478,5.657366473753685,8.428825197508239,8.468572762099228,1.8732996555021186,3.0399425306531347,4.056884647289856,1.156173602890147,4.621096198800354,4.894967005561243,8.320283565850097,3.141177733742524,1.0858258421364653,9.977546480792077,1.1523921545507965,1.6044701847575293,6.219176354569791,6.33663462956787,4.015445559759431,3.1522361882774907,6.6274452354942675,4.052238893423715,9.788223774561642,0.24122042595945192,1.665734958638685,1.8344107995239223,2.1921616803230926,6.312858256742673,5.113102727940452,5.704937880421477,3.4746693114746052,9.267980573409886,8.8383240396832,4.506447020675639,2.5133957848969857,1.9000116210879048,6.184171724295286,3.890583415369584,6.886737865340537,5.298704342259484,2.5326602641456764,8.577098045683492,7.430474486529228,7.7659461042513716,3.9684150190415224,4.354272564559034,7.968254031857378,8.601529674788491,8.865248644665034,2.4042926008433674,1.300208315977518,4.46716065266231,6.6298577025202565,7.499736435576416,2.059924737311889,2.2036437150370247,1.3526100589338763,0.17020013823599411,2.978864483335779,3.6994120528511587,4.917726752947898,5.471786866100787,5.500830403700778,7.819963092960512,7.392201195411701,7.475358356271835,7.153548847581095,1.5058823379525976,8.548934861266432,5.639915263260065,8.826235807327215,3.976659430479166,0.02239261465596387,5.4692851228424555,5.637378649760548,3.5932186754047124,0.3647294472718521,3.8338377675196678,7.537025718181988,1.4268252952584937,0.16785889665088094,8.30540237838668,8.313956560638502,0.20470357913147996,6.549825973098242,9.4451766351475,4.153272205146856,4.945226127929363,4.448657413224302,2.6060382504766966,2.7289463570358796,1.580983735785635,8.274048443612184,7.743123487660011,9.78359193527509,7.975523546216651,3.7400867472704213,1.5094167913006706,6.853977931003783,8.896600266270854,0.2716641615581561,0.2562953972396076,4.540606279444146,5.844537854704221,7.83812374231503,3.309757002824243,4.4673473539970665,0.23326490791484078,5.653996320171178,6.595991641718348,8.11021805424027,0.26435257413835345,7.063971109543767,2.080519618824541,6.972144414560066,2.194734121227344,2.3010827609951656,3.6114251088142435,5.838820322891487,4.704448113488433,2.0612648742122097,5.0083528246434605,3.6389217917868644,3.5042641882063785,9.4022614994127,7.190024196530544,4.072072111602687,6.169588173871912,7.189663988486199,0.5998183980786109,6.332769208819227,3.687122797986533,4.08909868575972,3.8341502028741714,4.337305346322539,1.9471218143548175,1.9444694656015105,8.940265071191087,2.5919250739878197,4.925527015902671,9.880407755158148,0.48250834594322667,7.192652141606056,6.661437804587669,1.5591464820255685,6.871308278881976,5.123002228755434,6.72876275240341,2.3004861742117355,4.554171649186056,3.0450730615243815,9.272354650709186,7.1892229902259945,7.919145025021336,2.512230331066405,8.967920393491198,9.036031074219895,1.2383607487679837,4.801029673601153,1.5176552664635645,0.4513833365603759,3.4034715914749847,3.8171606622097354,0.6572689565644496,8.281175036966976,8.34498117508393,4.073561083842225,4.868344184907036,2.364746669385067,5.7756110482824985,5.451806958996204,0.7769437269007851,4.235501383335647,5.7405528812475115,7.937188775275688,3.103818751630114,7.744299633453602,6.4077627043767045,6.120940797823222,8.276428675576309,8.379126547796771,6.384894604160438,0.6873574989855125,7.574717396182116,9.06660824287594,0.338806818019457,5.313223921631005,4.013122288050884,1.1662404375947966,4.330099518590675,6.315766889399937,3.440913544785491,5.307308341039767,5.358834470948133,7.980169336122234,7.680671134006392,6.578642574369349,8.187346959574642,9.682791856794456,2.5310830992003908,3.426786834058242,0.9334317599382524,7.401031971899645,2.719312397628302,6.845940761117221,5.495808479332878,1.346284432338527,9.439121657264526,2.508262966510224,6.70011695411767,2.992323867540043,8.013616125058142,0.1262522449182102,4.172839013918493,4.741899615995353,8.66802592206334,8.251337072288367,9.93564667057804,2.6547907616305078,2.293748891766445,6.0087876901727855,9.53947940405218,4.97631672077577,6.855900404468072,4.767318341623978,3.2995913592535864,6.7945494526271215,9.96364927664815,7.734131800206489,2.017273798795236,0.4189138730518338,7.233473378840021]}

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

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
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

tape( 'if `s` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 2.0, 0.0 );

	y = quantile( 0.3, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 0.9, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 1.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	y = quantile( -0.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given positive `mu`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var s;
	var p;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], s[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var s;
	var p;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], s[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var s;
	var p;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], s[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/quantile/test/test.factory.js")
},{"./../lib/factory.js":68,"./fixtures/julia/large_variance.json":71,"./fixtures/julia/negative_mean.json":72,"./fixtures/julia/positive_mean.json":73,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":229}],75:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/quantile/test/test.js")
},{"./../lib":69,"tape":229}],76:[function(require,module,exports){
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

tape( 'if provided a number outside `[0,1]` for `p` and a finite `mu` and `s`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
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

tape( 'if provided `s` equals `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = quantile( 0.3, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 0.9, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 1.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	y = quantile( -0.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	t.end();
});

tape( 'the function evaluates the quantile function at `p` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var p;
	var s;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], s[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given large variance ( = large `s` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var p;
	var s;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/quantile/test/test.quantile.js")
},{"./../lib":69,"./fixtures/julia/large_variance.json":71,"./fixtures/julia/negative_mean.json":72,"./fixtures/julia/positive_mean.json":73,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":229}],77:[function(require,module,exports){
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

},{"./is_number.js":80}],78:[function(require,module,exports){
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

},{"./is_number.js":80,"./zero_pad.js":84}],79:[function(require,module,exports){
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

},{"./main.js":82}],80:[function(require,module,exports){
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

},{"./format_double.js":77,"./format_integer.js":78,"./is_string.js":81,"./space_pad.js":83,"./zero_pad.js":84}],83:[function(require,module,exports){
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

},{"./main.js":86}],86:[function(require,module,exports){
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

},{"./main.js":89}],88:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"dup":81}],89:[function(require,module,exports){
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

},{"./is_string.js":88,"@stdlib/string/base/format-interpolate":79,"@stdlib/string/base/format-tokenize":85}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":91}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":93}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":99}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],98:[function(require,module,exports){
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

},{"./define_property.js":97}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":96,"./has_define_property_support.js":98,"./polyfill.js":100}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":87}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":102,"./polyfill.js":103,"@stdlib/assert/has-tostringtag-support":20}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":104}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":104,"./tostringtag.js":105,"@stdlib/assert/has-own-property":16}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":90}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){

},{}],108:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"dup":107}],109:[function(require,module,exports){
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
},{"base64-js":106,"buffer":109,"ieee754":212}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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
},{"_process":219}],112:[function(require,module,exports){
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

},{"events":110,"inherits":213,"readable-stream/lib/_stream_duplex.js":114,"readable-stream/lib/_stream_passthrough.js":115,"readable-stream/lib/_stream_readable.js":116,"readable-stream/lib/_stream_transform.js":117,"readable-stream/lib/_stream_writable.js":118,"readable-stream/lib/internal/streams/end-of-stream.js":122,"readable-stream/lib/internal/streams/pipeline.js":124}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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
},{"./_stream_readable":116,"./_stream_writable":118,"_process":219,"inherits":213}],115:[function(require,module,exports){
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
},{"./_stream_transform":117,"inherits":213}],116:[function(require,module,exports){
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
},{"../errors":113,"./_stream_duplex":114,"./internal/streams/async_iterator":119,"./internal/streams/buffer_list":120,"./internal/streams/destroy":121,"./internal/streams/from":123,"./internal/streams/state":125,"./internal/streams/stream":126,"_process":219,"buffer":109,"events":110,"inherits":213,"string_decoder/":228,"util":107}],117:[function(require,module,exports){
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
},{"../errors":113,"./_stream_duplex":114,"inherits":213}],118:[function(require,module,exports){
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
},{"../errors":113,"./_stream_duplex":114,"./internal/streams/destroy":121,"./internal/streams/state":125,"./internal/streams/stream":126,"_process":219,"buffer":109,"inherits":213,"util-deprecate":237}],119:[function(require,module,exports){
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
},{"./end-of-stream":122,"_process":219}],120:[function(require,module,exports){
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
},{"buffer":109,"util":107}],121:[function(require,module,exports){
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
},{"_process":219}],122:[function(require,module,exports){
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
},{"../../../errors":113}],123:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],124:[function(require,module,exports){
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
},{"../../../errors":113,"./end-of-stream":122}],125:[function(require,module,exports){
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
},{"../../../errors":113}],126:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":110}],127:[function(require,module,exports){
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

},{"./":128,"get-intrinsic":203}],128:[function(require,module,exports){
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

},{"es-define-property":188,"es-errors/type":194,"function-bind":202,"get-intrinsic":203,"set-function-length":223}],129:[function(require,module,exports){
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

},{"./lib/is_arguments.js":130,"./lib/keys.js":131}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],132:[function(require,module,exports){
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

},{"es-define-property":188,"es-errors/syntax":193,"es-errors/type":194,"gopd":204}],133:[function(require,module,exports){
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

},{"define-data-property":132,"has-property-descriptors":205,"object-keys":217}],134:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],135:[function(require,module,exports){
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

},{"./ToNumber":166,"./ToPrimitive":168,"./Type":173}],136:[function(require,module,exports){
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

},{"../helpers/isFinite":181,"../helpers/isNaN":182,"../helpers/isPrefixOf":183,"./ToNumber":166,"./ToPrimitive":168,"es-errors/type":194,"get-intrinsic":203}],137:[function(require,module,exports){
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

},{"call-bind/callBound":127,"es-errors/type":194}],138:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":196}],139:[function(require,module,exports){
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

},{"./DayWithinYear":142,"./InLeapYear":146,"./MonthFromTime":156,"es-errors/eval":189}],140:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":187,"./floor":177}],141:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":177}],142:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":140,"./DayFromYear":141,"./YearFromTime":175}],143:[function(require,module,exports){
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

},{"./modulo":178}],144:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":185,"./IsAccessorDescriptor":147,"./IsDataDescriptor":149,"es-errors/type":194}],145:[function(require,module,exports){
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

},{"../helpers/timeConstants":187,"./floor":177,"./modulo":178}],146:[function(require,module,exports){
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

},{"./DaysInYear":143,"./YearFromTime":175,"es-errors/eval":189}],147:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":185,"es-errors/type":194,"hasown":211}],148:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":214}],149:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":185,"es-errors/type":194,"hasown":211}],150:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":147,"./IsDataDescriptor":149,"./IsPropertyDescriptor":151,"es-errors/type":194}],151:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":185}],152:[function(require,module,exports){
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

},{"../helpers/isFinite":181,"../helpers/timeConstants":187}],153:[function(require,module,exports){
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

},{"../helpers/isFinite":181,"./DateFromTime":139,"./Day":140,"./MonthFromTime":156,"./ToInteger":165,"./YearFromTime":175,"./floor":177,"./modulo":178,"get-intrinsic":203}],154:[function(require,module,exports){
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

},{"../helpers/isFinite":181,"../helpers/timeConstants":187,"./ToInteger":165}],155:[function(require,module,exports){
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

},{"../helpers/timeConstants":187,"./floor":177,"./modulo":178}],156:[function(require,module,exports){
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

},{"./DayWithinYear":142,"./InLeapYear":146}],157:[function(require,module,exports){
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

},{"../helpers/isNaN":182}],158:[function(require,module,exports){
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

},{"../helpers/timeConstants":187,"./floor":177,"./modulo":178}],159:[function(require,module,exports){
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

},{"./Type":173}],160:[function(require,module,exports){
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


},{"../helpers/isFinite":181,"./ToNumber":166,"./abs":176,"get-intrinsic":203}],161:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":187,"./DayFromYear":141}],162:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":187,"./modulo":178}],163:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],164:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":166}],165:[function(require,module,exports){
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

},{"../helpers/isFinite":181,"../helpers/isNaN":182,"../helpers/sign":186,"./ToNumber":166,"./abs":176,"./floor":177}],166:[function(require,module,exports){
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

},{"./ToPrimitive":168,"call-bind/callBound":127,"safe-regex-test":222}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":197}],168:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":199}],169:[function(require,module,exports){
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

},{"./IsCallable":148,"./ToBoolean":163,"./Type":173,"es-errors/type":194,"hasown":211}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":203}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":181,"../helpers/isNaN":182,"../helpers/sign":186,"./ToNumber":166,"./abs":176,"./floor":177,"./modulo":178}],172:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":166}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":140,"./modulo":178}],175:[function(require,module,exports){
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

},{"call-bind/callBound":127,"get-intrinsic":203}],176:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":203}],177:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],178:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":184}],179:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":187,"./modulo":178}],180:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":135,"./5/AbstractRelationalComparison":136,"./5/Canonicalize":137,"./5/CheckObjectCoercible":138,"./5/DateFromTime":139,"./5/Day":140,"./5/DayFromYear":141,"./5/DayWithinYear":142,"./5/DaysInYear":143,"./5/FromPropertyDescriptor":144,"./5/HourFromTime":145,"./5/InLeapYear":146,"./5/IsAccessorDescriptor":147,"./5/IsCallable":148,"./5/IsDataDescriptor":149,"./5/IsGenericDescriptor":150,"./5/IsPropertyDescriptor":151,"./5/MakeDate":152,"./5/MakeDay":153,"./5/MakeTime":154,"./5/MinFromTime":155,"./5/MonthFromTime":156,"./5/SameValue":157,"./5/SecFromTime":158,"./5/StrictEqualityComparison":159,"./5/TimeClip":160,"./5/TimeFromYear":161,"./5/TimeWithinDay":162,"./5/ToBoolean":163,"./5/ToInt32":164,"./5/ToInteger":165,"./5/ToNumber":166,"./5/ToObject":167,"./5/ToPrimitive":168,"./5/ToPropertyDescriptor":169,"./5/ToString":170,"./5/ToUint16":171,"./5/ToUint32":172,"./5/Type":173,"./5/WeekDay":174,"./5/YearFromTime":175,"./5/abs":176,"./5/floor":177,"./5/modulo":178,"./5/msFromTime":179}],181:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":182}],182:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],183:[function(require,module,exports){
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

},{"call-bind/callBound":127}],184:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],185:[function(require,module,exports){
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

},{"es-errors/type":194,"hasown":211}],186:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"get-intrinsic":203}],189:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],190:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],191:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],192:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],193:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],194:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],195:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],196:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":194}],197:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":198,"./RequireObjectCoercible":196}],198:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],199:[function(require,module,exports){
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

},{"./helpers/isPrimitive":200,"is-callable":214}],200:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],201:[function(require,module,exports){
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

},{}],202:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":201}],203:[function(require,module,exports){
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

},{"es-errors":190,"es-errors/eval":189,"es-errors/range":191,"es-errors/ref":192,"es-errors/syntax":193,"es-errors/type":194,"es-errors/uri":195,"function-bind":202,"has-proto":206,"has-symbols":207,"hasown":211}],204:[function(require,module,exports){
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

},{"get-intrinsic":203}],205:[function(require,module,exports){
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

},{"es-define-property":188}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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

},{"./shams":208}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":208}],210:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":202}],211:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":202}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
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

},{"call-bind/callBound":127,"has-tostringtag/shams":209}],216:[function(require,module,exports){
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

},{"./isArguments":218}],217:[function(require,module,exports){
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

},{"./implementation":216,"./isArguments":218}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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
},{"_process":219,"through":235,"timers":236}],221:[function(require,module,exports){
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

},{"buffer":109}],222:[function(require,module,exports){
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

},{"call-bind/callBound":127,"es-errors/type":194,"is-regex":215}],223:[function(require,module,exports){
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

},{"define-data-property":132,"es-errors/type":194,"get-intrinsic":203,"gopd":204,"has-property-descriptors":205}],224:[function(require,module,exports){
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

},{"es-abstract/es5":180,"function-bind":202}],225:[function(require,module,exports){
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

},{"./implementation":224,"./polyfill":226,"./shim":227,"define-properties":133,"function-bind":202}],226:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":224}],227:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":226,"define-properties":133}],228:[function(require,module,exports){
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
},{"safe-buffer":221}],229:[function(require,module,exports){
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
},{"./lib/default_stream":230,"./lib/results":232,"./lib/test":233,"_process":219,"defined":134,"through":235,"timers":236}],230:[function(require,module,exports){
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
},{"_process":219,"fs":108,"through":235}],231:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":219,"timers":236}],232:[function(require,module,exports){
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
},{"_process":219,"events":110,"function-bind":202,"has":210,"inherits":213,"object-inspect":234,"resumer":220,"through":235,"timers":236}],233:[function(require,module,exports){
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
},{"./next_tick":231,"deep-equal":129,"defined":134,"events":110,"has":210,"inherits":213,"path":111,"string.prototype.trim":225}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
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
},{"_process":219,"stream":112}],236:[function(require,module,exports){
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
},{"process/browser.js":219,"timers":236}],237:[function(require,module,exports){
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
},{}]},{},[74,75,76]);
