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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":57}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":58}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":59}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":153}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":153}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":153}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":153}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":95}],53:[function(require,module,exports){
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
* The mathematical constant `π`.
*
* @module @stdlib/constants/float64/pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

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

},{"@stdlib/math/base/assert/is-integer":64}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":55}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":74}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":69}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":60}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":71}],71:[function(require,module,exports){
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":99,"@stdlib/number/float64/base/get-high-word":103,"@stdlib/number/float64/base/to-words":115}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/copysign":72,"@stdlib/number/float64/base/exponent":97,"@stdlib/number/float64/base/from-words":99,"@stdlib/number/float64/base/normalize":106,"@stdlib/number/float64/base/to-words":115}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_p.js":80,"./polyval_q.js":81,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":52,"@stdlib/math/base/assert/is-nan":66,"@stdlib/number/float64/base/get-high-word":103,"@stdlib/number/float64/base/set-high-word":109}],80:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":85}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":86,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/number/float64/base/get-high-word":103,"@stdlib/number/float64/base/set-high-word":109,"@stdlib/number/float64/base/set-low-word":111}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":88,"@stdlib/number/float64/base/set-low-word":111}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":83,"./logx.js":84,"./pow2.js":89,"./x_is_zero.js":90,"./y_is_huge.js":91,"./y_is_infinite.js":92,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-odd":68,"@stdlib/math/base/special/abs":70,"@stdlib/math/base/special/sqrt":93,"@stdlib/number/float64/base/set-low-word":111,"@stdlib/number/float64/base/to-words":115,"@stdlib/number/uint32/base/to-int32":118}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25)));
}


// EXPORTS //

module.exports = evalpoly;

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

},{"./polyval_p.js":87,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-significand-mask":47,"@stdlib/constants/float64/ln-two":48,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/math/base/special/ldexp":76,"@stdlib/number/float64/base/get-high-word":103,"@stdlib/number/float64/base/set-high-word":109,"@stdlib/number/float64/base/set-low-word":111,"@stdlib/number/uint32/base/to-int32":118}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-odd":68,"@stdlib/math/base/special/copysign":72}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/number/float64/base/get-high-word":103}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/special/abs":70}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":103}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":101}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":100,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":104}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":102,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":56,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":70}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":105,"./main.js":107,"@stdlib/utils/define-nonenumerable-read-only-property":146}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":105}],108:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":102}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":110}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":108,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":113}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":112,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":116,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":114,"./main.js":117,"@stdlib/utils/define-nonenumerable-read-only-property":146}],116:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":100}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":114}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for a lognormal distribution with location parameter `mu` and scale parameter `sigma`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 4.0, 2.0 );
* var y = logpdf( 10.0 );
* // returns ~-4.275
*
* y = logpdf( 2.0 );
* // returns ~-3.672
*/
function factory( mu, sigma ) {
	var s2;
	var A;
	var B;
	if (
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma <= 0.0
	) {
		return constantFunction( NaN );
	}
	s2 = pow( sigma, 2.0 );
	A = -0.5 * ln( 2.0 * s2 * PI );
	B = -1.0 / ( 2.0 * s2 );
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for a lognormal distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 2.5 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			return NINF;
		}
		return A - ln( x ) + ( B * pow( ln(x) - mu, 2.0 ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pi":54,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/ln":78,"@stdlib/math/base/special/pow":82,"@stdlib/utils/constant-function":144}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm of the probability density function (PDF) for a lognormal distribution.
*
* @module @stdlib/stats/base/dists/lognormal/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/lognormal/logpdf' );
*
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-1.852
*
* y = logpdf( 1.0, 0.0, 1.0 );
* // returns ~-0.919
*
* y = logpdf( 1.0, 3.0, 1.0 );
* // returns ~-5.419
*
* var mylogpdf = logpdf.factory( 4.0, 2.0 );
* y = mylogpdf( 10.0 );
* // returns ~-4.269
*
* y = mylogpdf( 2.0 );
* // returns ~-3.689
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":120,"./main.js":122,"@stdlib/utils/define-nonenumerable-read-only-property":146}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for a lognormal distribution with location parameter `mu` and scale parameter `sigma` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-1.852
*
* @example
* var y = logpdf( 1.0, 0.0, 1.0 );
* // returns ~-0.919
*
* @example
* var y = logpdf( 1.0, 3.0, 1.0 );
* // returns ~-5.419
*
* @example
* var y = logpdf( -1.0, 4.0, 2.0 );
* // returns -Infinity
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
function logpdf( x, mu, sigma ) {
	var s2;
	var A;
	var B;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return NINF;
	}
	s2 = pow( sigma, 2.0 );
	A = -0.5 * ln( 2.0 * s2 * PI );
	B = -1.0 / ( 2.0 * s2 );
	return A - ln( x ) + ( B * pow( ln(x) - mu, 2.0 ) );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pi":54,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/ln":78,"@stdlib/math/base/special/pow":82}],123:[function(require,module,exports){
module.exports={"sigma":[3.443056895624359,17.850637111485092,10.84562241107372,1.380157976168146,13.892889004922417,8.93161606411712,14.357500571887453,2.038885530845418,13.743612251625255,16.213985746885452,17.874234980907424,8.74784901153809,17.10331343652934,2.3446597785004197,19.769061593730818,11.816604890395475,3.689663495122044,1.3237920686111915,4.170314483982005,10.757397228724255,3.6537568872041204,18.943114747515022,15.09579741324794,0.36991054288192604,14.890648398478454,16.96785822888891,8.968204679359992,1.8110361913826711,15.611539383532627,17.453516853643492,2.8992334249861207,14.798775921802743,12.185863502460919,1.2619133233106394,2.3843997837841924,16.505241192607937,17.161058754379983,3.767727467410422,18.509567687793883,10.753042155754384,7.904871935011508,13.853003753357655,12.6154467673864,3.1582064542051658,3.0197280203950116,10.690269964634581,8.735623911301115,16.01484854322767,18.983896182956343,9.588964120834508,15.24649324643752,5.009994791648045,17.451482686244685,8.899017230347358,14.845122399422937,6.9609978113064575,15.251295848935698,1.6119586818686704,2.9882865477055764,11.404619496995373,3.3558439737763868,5.871042489472678,18.21491679680144,7.0449623562911246,3.0858497329994394,7.608642286746865,6.452350963935176,19.952591927525557,14.246319360702087,15.228053265089137,15.340061418465574,18.2587355787564,5.062640024914713,3.6791369564566967,5.441071432373423,15.613895536888421,6.460215864891667,17.901600074300394,14.11623694279275,0.0801900017259971,11.875905848931914,10.915348356960317,1.3045954526201742,2.5618203451931754,11.3068091768398,14.995287704204724,19.534740057672167,5.0677727339166045,13.990968826175125,11.524951414831222,12.034082690059819,13.082394392214521,17.237394551116463,10.396464528858811,14.593331947713398,13.745906801393657,17.77740246896652,18.08298151873247,13.936092546597383,4.739015918759497,13.234777255407089,4.177795006405485,12.612360764991713,14.933998047075164,0.7237979814348883,7.255577502003057,7.119982835037759,6.732674560894276,8.234971044544395,15.155361740329116,13.869926217610464,18.282767427304123,1.5354615402880523,0.46751689900988325,2.112760214553573,19.68259292521949,5.332075161830612,16.584620572968394,8.167689319730197,16.783633364155584,12.466134968672486,15.356196008007142,17.103634380819077,6.73310860028979,11.062437463471877,10.431745899706005,5.2946945503282805,6.2007123771655825,15.830114313049126,1.1947664394795243,7.394862017112849,13.95553162578298,3.6841574099696572,3.945977530542728,5.758899663479573,15.111089346603674,5.743153700369739,4.892082155454274,7.443887637880695,14.761008858980027,13.117933314775087,19.03463405829074,15.177659058517063,13.060558790418337,15.734294962928338,17.02794967392667,5.330108863550964,9.65194462980119,13.955257980424957,11.164669102509993,8.197390375891938,6.231308099478312,12.304374652060673,10.764762342453743,18.873794579926518,13.819278658758606,9.09222266264219,8.38532040193973,11.948820858717276,16.124285959340064,0.7720700189190888,6.330298635160978,9.632346659943508,19.36338351224935,19.58799558913922,7.811281327950561,14.495949373908012,16.7157593638047,14.89136605791995,19.201351963519215,7.84651581938737,3.9435994454845957,7.114286887401322,2.544754955859716,4.017125324457971,17.653974453684626,2.702218070099982,0.21678150208518154,8.650447249573618,18.271270179643345,10.727651674755595,11.096998811808438,1.234694886112524,14.420466231591682,0.7331476262997461,4.774117967041751,6.610938533016113,10.115058802813568,6.906145540362889,7.459255970798533,15.91240659714758,14.519944737991327,6.284341619767404,10.06835702216636,8.825029917410308,18.94726475413913,0.7663290719349325,16.44701494916682,19.216673082164263,9.203513087924389,5.245640790700139,14.373594005375194,18.243923641803743,16.466120179657086,13.529151241672682,0.7261018119914908,7.308036918962206,19.49800000566477,13.015664878182523,3.3009804615597904,2.377455258508343,12.70271049759113,19.599329015728543,1.8617008832370807,18.307916800106092,18.963147394459096,6.27343292417367,16.14375631998868,15.962848400814602,18.697974884823182,7.786434818018826,10.154551599965691,17.589320274154126,14.509707505600238,3.011952716200108,18.110513176703556,14.87045855184129,0.30135695753855885,0.7164800319018294,9.188035875747227,5.370886833148409,6.594293537463849,2.372094995448899,13.916592667708532,11.446890698084133,2.475908648782421,3.2065298019228194,14.71847071777895,9.649884182391322,14.490767493948695,12.525708528651185,16.41958181217435,8.236312997562374,9.359452207549177,12.024863357447195,1.6371663321174657,6.14782393422169,4.004852982760911,14.49928627011742,3.714292428778294,16.65474543380784,18.983873531710245,0.6027039686655788,2.7344995166380004,10.378529497430407,19.529424307421866,10.16069595404051,12.598362704650299,16.626796806065904,17.973416641316113,0.45913563078049613,16.177731328872436,19.377984044405018,19.453229304605312,18.377450108966972,8.112013782736923,17.775938382110578,18.943789859654352,15.35523210563992,17.22254421927167,2.387125144550266,8.229975302145105,15.227789331202084,9.800754890944594,1.3239706030623832,14.092109789316517,2.8737437433574087,14.762958362424614,13.753452662301303,11.552373424552695,18.065553992844073,18.188955894041356,10.7040836481737,17.850518913111696,14.865319788777548,19.35560368305598,16.82589590871595,4.772195256011371,14.56895620837181,12.134058929302807,3.4708799596553552,4.048548464265647,17.93531755123687,11.116007462567325,1.6572569330542741,5.153302827545203,10.61581667165556,1.669684148598125,19.56976491806291,6.902079263341054,10.40177104068038,16.39604041479814,11.04737624893998,14.813369265104782,15.272695122948253,7.291056099907811,9.953530191479768,18.17551912725293,17.139993703273134,10.259686083229163,14.18544687607421,18.82324141464538,14.915258729086602,8.176760989022892,13.799429922480302,12.236562974820488,0.0964347026990886,1.4825371842970902,1.4692096851824532,18.13385781599213,18.509318220186973,17.4969392732419,0.10774033127245009,4.965805162080508,4.520998648848291,11.206647125124798,5.071763901220625,17.607367228069307,16.01326330611424,5.697974189904613,4.096757101623587,8.603504821557152,13.75643526654805,17.93157667683877,18.690595616157495,3.6481644997160823,5.566295231699918,2.0181285526264547,3.3542551374208296,18.369974896587564,12.208037846973001,16.81014619812487,4.198589377206723,11.288114638746132,10.558578644306182,13.460395900475298,13.744564639592154,5.635966310525307,18.610986388189993,13.068545824397194,14.399709247044402,6.807391417300224,13.884402213194198,16.51679661687439,12.937013174483912,5.725201985127648,10.75184933278706,8.514324768237502,6.52318886539176,14.480197391080933,18.810259847493583,4.953879478978851,1.1749835233145856,4.741125050811208,10.558357637063466,3.9059157475707185,9.648684693797094,15.602282232667637,15.593631749932037,1.842271356825318,8.87739212336069,3.060765088310924,5.596852674659942,15.991644124353668,6.839274179362449,14.113973804230042,18.990878158313503,12.436074673241535,15.462636767310096,2.148274743410661,8.989369420122003,6.935443793928218,19.462947686413543,18.916618905953793,4.053341074098773,12.782145483847316,6.761850773909668,11.102626188269369,10.697487953433482,5.193973028099554,19.596822358381274,13.8291881535979,14.400692289532753,17.69036387479808,7.416064938733085,16.535806232413336,13.029810697398041,18.556932927593195,10.942444050056057,15.500877194761117,19.743717425756007,8.437688707291597,16.7735889527836,0.7164078989062928,2.143813711805058,13.175862239690407,12.017667337755555,8.95216178548154,12.743814510599446,6.755623135343374,7.390605127014611,13.763791026115832,18.692948377382606,3.4462688032310895,7.144499203128518,18.08639423268348,10.07762495040156,11.872347126642794,16.293081115244867,9.88835677950937,14.365690997229233,3.011666399943125,14.049705904035017,5.557778263042894,4.653597950888546,16.34198797368619,6.465408535726067,13.284528326735806,11.23343275616401,10.853217607084588,9.136371680730488,0.04930132757025252,12.83157701355968,18.69152951725222,15.917334856108628,1.120554090549084,5.409085466866634,9.28492662937109,15.18026459824438,6.61396929799599,14.10874780824495,10.892091623481353,7.837077182912053,17.754937560334028,14.001919264430871,2.7872711896707125,2.9109954659045822,5.367786370362615,8.538169272141474,10.834651004755255,9.463999456461373,9.967704278775882,3.323160403430254,0.27087136334285944,4.30741074168536,4.618475900687882,14.0273844947682,16.77014814396959,6.664080002977499,9.926996881544937,9.912231127803363,5.034673403852028,11.266347565959487,1.4811756630774031,15.7252833575131,7.558549738926654,14.724709489325738,16.129225348663596,11.47540676231365,9.41833383961885,14.269813019082346,5.976779589149865,19.937731489555773,0.738140395362108,5.527285840400253,9.765154530445713,14.099142761717665,16.519982759605348,3.981273143584678,8.065221311379691,5.436297043605087,4.213893429930029,5.06427703175099,5.035500444205616,9.235375831169437,13.110094095086712,0.13009637673680352,19.494073285263525,8.394069289388387,8.792820430428726,10.070901536430409,19.20389521495874,4.207649410376844,5.299368803521101,19.748766118787046,10.324324397512225,16.365656430463904,18.055497938700764,2.3711612694717887,7.520027870370218,10.470933267053333,0.4152427969368011,4.636582004477936,2.462684003132267,14.73594056228119,3.3618005614337187,15.01010612414412,16.675796240417906,1.6775396199794779,6.051165278101371,6.635469893843888,4.335149420257789,12.557657600559473,4.8251169548706585,13.517976407904575,11.077512530492616,2.732586945921378,0.6949830678585656,4.304673599997431,2.3658236890469864,19.242867083586997,12.624687287969817,15.909730118143678,11.76250059411891,0.7962107902563975,10.552145753719175,19.52538490717263,1.0136083165169918,16.64603202607053,5.059146670911581,17.30746817514847,10.911211995749731,11.813622298647143,18.29048620746171,18.237032685777876,4.026482513148348,3.091442162297109,17.19067470164898,10.890969387641887,16.073553617753657,16.935832630686456,9.734477146925302,12.184260645537863,10.033685190801034,12.119147767845494,6.088619204382697,16.181625187334316,18.369722157472566,8.708962113582848,6.566401772292836,7.225306318324729,8.900154550705977,1.6674269389899088,1.7358609916559598,4.068842179805392,1.937615007921929,2.1496726545201517,7.092839072574875,9.414196876875716,16.600973145711567,9.715151864829927,12.720724835428898,3.2060592025147283,2.098698612886043,2.012670695839005,19.456109496057707,9.350092268017157,5.997666099846652,19.73366335129899,14.446394226077421,2.33190167049524,10.561480291874613,1.1589507008777478,6.893419530445524,18.19053747588065,13.299915942719043,5.138489921557241,7.360873069232725,3.9369740706951406,3.640529866776676,15.39150801173118,4.469731263095951,5.163060271844011,5.493495109230424,4.42503837006428,1.5358331034453876,18.703259515018846,3.6123697731862814,4.674313396637553,17.180051586262017,2.1836984170834217,13.52312526670576,17.18927106948504,0.8332585114960134,4.333580255648961,14.485622940820694,7.8354091417873395,8.944493635346431,9.628683960505295,4.2601322305863265,16.663155097242246,17.478357840362975,12.871589225775253,3.1805275059837568,8.074425140158441,12.24851396976593,5.244050570283121,3.597687279787305,4.156512606619076,4.439205484910502,9.07620094137252,1.5221224515537912,4.649439411109877,16.183008720371994,9.977595749961331,5.550530507301712,12.445494829684076,8.20757902409387,8.195053551941843,12.923556705339347,10.413154149735009,18.414232494865725,10.651022108587632,5.435734209467702,13.849951104033625,3.1674430575724344,9.512275968893103,8.821438624686767,3.088980935692609,7.94717094778326,8.078927675919797,5.221442278802679,13.61672973893089,4.104792163566904,18.610777581461583,8.680175108580972,8.774456958114364,11.621000108399976,4.497122619683229,1.8406599530539403,6.105111253871107,9.176348780921423,6.19271614838901,4.847960700456153,11.160162697601006,9.772815438175861,10.793369181412684,17.381583069524147,8.942443011634174,12.254361400658418,4.399949089648452,2.8153063591596617,10.465349197576707,18.772746796404313,18.41633664917441,12.978776989275588,0.3781117660185629,12.876712711825991,0.5708737704431899,13.456647308992968,5.279234169064253,19.932756990286315,6.735054576445778,0.34565160293598574,12.15896545958875,5.307608326070721,12.211401218141372,10.326098794483936,11.461516399374077,5.677315708982462,13.177669514863766,17.242578781737844,1.4093090465331226,10.061049178613185,6.891867645905472,1.520206307454588,11.599833337420264,6.531598396411145,13.034797406243754,11.134476348439009,9.299868007981802,5.000767676266871,7.724709685421183,6.506208260851061,12.751443282705605,9.621373716433741,13.073502678430087,13.17730325515695,7.810941327805119,9.238064447804222,19.463187657745024,4.700893274190849,10.443669530148942,3.869977148475625,0.062205127607755095,11.16093075450813,19.685410905440648,5.256344198970129,13.003875814483026,13.18688827754102,13.711895563504957,8.96443791292108,19.999705715848734,2.7420955318371076,4.198866032509017,13.426290987441064,12.237364298313476,16.55559242471616,3.4139110125854533,17.403279632186667,2.7071791469923534,1.6838694931830211,2.113393057622859,0.027523280323502597,15.88889556765459,1.2523728727373395,5.332459903546987,16.79760095929842,13.427603708686036,7.222010262328111,5.282592562377331,7.207546224469059,11.304652549309878,9.694216458242003,2.6085615349879676,9.806478164833079,5.34353855403332,11.07820029012502,15.83005740202517,17.965464019913128,11.102688318770134,11.316990446040606,2.437298984712073,4.908763688607274,8.957327972074838,10.42363210643924,4.01935898456625,16.078290243255154,1.6483386970971825,11.157054272212603,13.731240481364582,11.53872228999607,9.490895676320221,17.840832155399788,16.304757716422777,16.67808869407068,5.003225026595461,14.445807278714566,2.1956112705808373,3.954564547546564,13.33065570408623,12.662898360578838,11.135710212129762,13.865149232545155,16.020110746291017,0.12448713090256636,10.611212824917637,19.651203713634267,19.41428452882515,15.417359976402043,16.721373470583355,2.6014966012444596,13.13141994375112,9.86069973640685,18.98293858091115,10.40756492098263,7.421286601661823,3.7553735956744783,8.62476084336048,3.9875533090295834,0.28943562924913735,14.339080562616155,18.192878410820256,11.745167704646224,15.539305805027531,17.134048006747914,1.1798894513255886,10.898338340525825,0.3358221790190541,0.7106049819339821,17.183681329596702,18.557993439357432,9.818200297297558,12.719659745034564,2.093175005982868,7.28565418995315,1.6145942750447206,4.313420744145997,17.80728938698139,11.697118203160763,7.858767153984019,16.34225497352061,15.326939579098532,14.723982291891824,3.4847730651061415,0.821920033705883,19.21997911966763,5.484124872892426,4.1263406956509785,7.246451760126629,2.0656090134431793,9.545496412723482,13.12760521798284,0.06383329803616,9.200211249132959,3.9719722325891382,4.856582230138082,17.774358969683103,5.439156407739372,10.96411346470374,0.7061823208087104,18.225560822083654,9.050937744375656,11.655217983446263,13.788521153337111,18.20733808586834,13.106560366450463,3.9429293270469623,17.40722468414484,14.192637706214839,15.469568646759884,3.904188345575692,2.7487335072222097,1.1059880021569057,17.969682491727887,18.08657587297872,13.097057110752806,2.9491717821975705,10.231077505217655,1.066214853277625,4.7792233019687025,0.9511955978895914,9.241518590335573,2.2057662410957413,0.325139360390998,12.511384134930887,17.456654146524944,0.9525716476303003,7.518728835518664,5.848042766033297,19.111050193090932,17.224940587238045,14.840967314079293,2.6758078474175573,5.240415154210352,14.820588762882366,19.52553072457483,5.26544712014128,12.52722813329104,13.79076972260043,10.78748974283505,4.966729492058115,16.961966013254116,2.895578825216898,17.018296979481853,6.0991208603300695,0.8286960913629837,9.566122167146034,15.450017671357177,13.107876049937754,7.255445122416946,1.3834012431708942,0.24155443506328478,16.67745686289086,15.733771116659781,6.522886314439678,11.690552224953535,7.920720731836077,6.768202038655167,16.42617893674368,8.695766811640713,13.926305299446504,15.54426590360964,6.71739055527131,18.037550496304476,1.107753672621019,14.759366632529556,3.0463288575575698,3.3552435414836435,16.217591187251045,8.321044653930842,2.2752076503692065,10.445288250888698,16.824355741233074,8.853150285871658,7.369987179642332,9.03605338617037,1.0416912504154485,7.577815569434483,6.8808143898091645,9.087051700232305,8.643625096899044,19.636539925505474,0.7050658043868818,5.997469930248496,17.877067590371773,9.710024790194694,4.448772538268426,5.486135008477553,13.43368275210597,15.500481423632833,9.481475239795763,16.87145291318878,0.586425102898045,6.954806517331971,7.156403220487144,19.753466133045002,10.096657565698607,17.950353499543084,5.541675340071404,9.58752018790939,7.7388023184156385,18.730350307934238,16.50947836662892,6.708202653140485,5.594660300062908,4.844938917628796,6.621449391673755,5.021507349268743,8.018487951440928,4.112050241158172,0.5319845578069815,15.14999031745484,19.383730716951916,13.191543256540129,11.661499534228433,7.199360278821705,12.007566151807785,4.958065833138354,0.508515753326102,15.246397861761727,8.979207546051583,5.919726704100299,15.87150966094196,8.608605746926514,5.141646926008074,10.377174934534978,8.77870090953337,6.394253598991071,10.357324385633543,1.4438401975474902,18.923378001082064,19.5411211866471,11.828787299903873,16.047394920897425,17.748135872545472,17.872879782937137,10.247816370763218,15.930109623353719,4.1288221508581024,14.47287887489697,10.606901417151281,14.971715497172644,12.69130442137869,15.000641465538749,11.988535237876668,12.038454698160788,2.447362197743419,18.702460384911802,13.362963850157584,11.905662828447534,16.3389896421431,13.226447290055262,11.552710382656288,17.608564079050865,4.579282481915716,8.524938407795947,8.858239693322162,17.163664317361693,2.1763275752753186,13.129191960817149,15.124329812077919,1.3660116253733845,12.724272828358778,1.3902242889733962,10.836234518028913,18.16106137335887,6.438832020607164,17.247424445998018,12.55566609543504,17.413650530942224,18.707141667677053,19.37573673352096,4.016605659867487,5.187388386738423,0.31689997115741164,16.28965678984722,15.398003877825532,10.824848194764458,14.083016930193487,5.494501454906335,14.589332981833891,19.828052211394485,19.21267578694886,2.409338148206923,13.557807353879024,16.123217264100305,15.632908330438475,19.078273948662833,8.010326207006973],"expected":[-4.76510980685696,-6.512667475311069,-5.989499801480739,-3.6998111590237053,-4.608798811560353,-0.44759382522314217,-6.326360872010627,-5.235492749691114,-6.332435288170105,-6.129987443197135,-6.391838229613923,-2.2066499361915284,-6.424690146325146,-4.316341914584958,-6.541388707680916,-5.498380734450478,-3.904886139977534,-5.506440280547024,-2.86847798937941,-5.541403059571557,-5.173032025145808,-6.328200365179541,-3.8005482768220857,-19.22801910947068,-5.85349603803421,-6.315267742878008,-2.733684600460482,-4.180901781289129,-5.308199339633842,-5.519206605821768,-2.2642255159019014,-5.640192570597176,-6.1396485864852774,-4.245607886652559,-1.1845271124203514,-6.672384930985153,-5.542160817993327,-4.549506361401129,-6.566948665472655,-4.359473622605968,-5.061168906894347,-6.500759048821956,-3.725273141082791,-3.9201166480592478,-5.124205431282638,-5.907908475403511,-5.859920336688642,-6.538135919213793,-5.466417390953193,-5.501672168320921,-5.981582245977875,-4.96137393088121,-5.411865347691715,-6.103850486489651,-6.6212452602906255,-1.5034431572716471,-4.307226944512276,-4.029319832916794,-5.196895302166726,-1.7027511783457598,-5.342341502726649,-4.848869742047027,-6.4509969085299295,-3.650007995747721,-4.603619954361536,-5.871017851657253,-5.398592526993225,-6.088284743534459,-6.021777443881008,-5.885321614027979,-6.638801824207695,-5.9892161826366,-4.870639406056455,-5.188966112499305,-4.595405565204323,-6.1216257418921725,-5.630960489515765,-6.667575398247035,-5.866882324141422,-193.175572747376,-5.768088994763637,-6.1252604610059525,-1.5675102214126737,-5.42194774700997,-4.203251189500764,-5.389567559757034,-6.363431243371232,-5.544309744642227,-5.22001337601008,-4.691907420776515,-6.174644273966368,-6.235925062830926,-5.212299059871601,-5.8446333707913904,-6.258538561793123,-6.326821425306301,-2.9602661695511396,-6.039586161969975,-6.238702871662384,-3.8190606228223576,-5.083813951557566,-5.030089883541741,-5.717738954657726,-6.4636658761746295,-9.496038697702916,-4.862979659439916,-5.5734613121577095,-5.807871750034413,-5.165636219513459,-4.052015482122744,-6.378705459933586,-6.712728268371761,-2.0474044021090836,-6.098961825189935,-2.6379769529758277,-6.380458004319874,-5.21081195545891,-6.46541221301002,-5.507262677453011,-5.847942645134269,-5.190874247735921,-6.462974550279055,-3.641235549870923,-4.880834620599862,-5.058559492779029,-5.324622731638289,-5.619945891997405,-5.684555469954972,-6.504235809453285,-1.0394854018367088,-4.912378553523184,-6.217284133071084,-5.122163889874526,-3.060140319745021,-5.305055306292078,-5.9868410247527795,-4.497951610175171,-4.257846325821718,-4.690616833341279,-4.341015370943734,-5.667258464493884,-6.765015571525938,-6.0943092827351535,-6.108494582003976,-4.418466545678735,-6.620147134382062,-4.701322807957604,-5.458915684476373,-5.714676813868573,-4.891890292980321,-5.16038097586326,-5.042857414704427,-4.890065242851282,-5.800019895732595,-5.9464479760472395,-5.827842144639451,-3.5196903621158713,-5.6852160335273725,-4.714303901532245,-6.563691806763416,-5.127965399792526,-5.684485025454825,-6.093448162385468,-6.385470539195245,-6.371742820099495,-4.01733639014554,-6.507286722833177,-4.96985317917193,-0.060790968794421474,-5.473283458422142,-5.236855885240546,-4.013183234272733,-4.557059196360217,-3.8863399190281225,-4.660766162704093,-6.315728371973439,-1.6284905837888504,-42.12093155781924,-3.805453773735541,-4.291761829576659,-5.226186434208536,-6.007858831654302,-0.9311726755910016,-5.992659240783322,-1.8176732440496481,-5.495605040785948,-5.831838140902068,-5.591199822049734,-3.9084049085943,-4.127288732137392,-5.421562057061227,-6.527610070205598,-5.3811106163019335,-4.094654975377132,-4.627847232204251,-5.084702044816339,-6.742469931017234,-6.608247288173221,-6.804387413039757,-4.967668014805542,-3.547704091419976,-6.11422816853378,-5.275256389254027,-5.14998502880901,-6.43482896666722,-1.7190279342644081,-3.3143306513174107,-6.046130536149046,-5.705631002612122,-2.5435488998624214,-5.269487851589686,-4.744033469537584,-5.49809700581115,-5.131038849117276,-6.171018920060465,-6.164486023202219,-5.834247395617769,-5.526502517758582,-6.249496209607074,-6.536893645091229,-5.451897905417802,-4.680931332307849,-5.231801719650351,-6.471708209679241,-4.593696922733864,-6.024373239962191,-6.586820538492013,-22.32736282350041,-10.087395352498692,-5.58123198502939,-2.945569024468892,-4.486597650129546,-4.593383773503854,-4.959124172338687,-5.835863028679295,-4.780718469776897,-5.35709045196176,-6.37714797928891,-4.349572331568407,-6.387158594297616,-1.6321236979948923,-5.895999480779622,-5.236869680816184,-5.072292554119459,-5.955502122562866,-3.003440132338059,-5.659565596424244,-4.2919628859772345,-4.894202855947626,-4.641040265722237,-6.70430602206083,-6.140581867556263,-3.606123491343359,-4.988567662783472,-4.033499304795083,-4.917428029580429,-6.243336761529716,-4.87786045312465,-6.2553000920792545,-6.717305503942546,-9.942301716839152,-6.49468577236293,-5.998385814301934,-4.896709281352379,-4.9254400817039174,-4.750918967048992,-2.6743695911070353,-4.898939403379627,-6.40935104858799,-6.019696252361512,-4.0245286448512045,-5.289328485933424,-6.005759152568763,-5.809985878198507,-1.8180281597423313,-5.076789930025528,-5.421273841960208,-5.750736571364914,-5.733423352171599,-5.529742758479893,-6.044175397703162,-4.340674191017807,-6.253616701949816,-3.142975639133487,-6.55193850048148,-5.3914231560140395,-4.828364032970169,-2.6146693579162408,-5.3399040386246925,-5.196255209862935,-2.6668404630499594,-2.359969575719325,-6.57302151718457,-0.7555886703254346,-3.172207752013069,-4.312883982687877,-5.466640640447839,-1.7670166296077923,-6.2436899331335365,-2.9554745918912095,-6.246162622493223,-6.099922069488673,-5.515419717205549,-4.620123783485786,-4.892146503495503,-5.610598827585385,-5.67268520387209,-6.803856059294656,-6.4063562973219526,-6.220552096132664,-6.577369380547706,-6.202504147402962,-4.039826896501487,-2.0178681544670023,-6.405375124572755,-5.239315856510563,-197.27757475096695,-1.4462351335023778,-4.830465444082302,-6.774467988033482,-6.77007634925545,-6.226582530977109,0.3177998732805313,-5.239096366118053,-4.880096770992678,-5.973721080115411,-5.299382556820745,-5.485560120310222,-5.326342589169072,-4.905236811627302,-4.49487125074313,-5.20583776289178,-5.047477259367064,-6.7284166033220885,-6.750450066368799,-2.2373199134098707,-5.074041611115719,-5.063369923426391,-3.0841039121475435,-6.780189050988362,-6.086387471742922,-4.588226338864009,-4.985547187575114,-6.078702489575072,-5.544724744121788,-4.359124912684201,-6.101016629722615,-4.455434529350777,-6.6427378159920165,-6.33423415724997,-6.006043465792217,-3.1895850596471527,-5.707818263444727,-5.897915443082943,-6.028863698531785,-4.1766475161990915,-5.39299324085737,-5.208192203540977,-5.783935352804266,-3.323536677744181,-6.504740971481448,-4.473575018590745,-4.897245587314231,-5.4990485818517225,-5.96162826630335,-4.701176531957612,-4.854641114562296,-5.634045825621522,-5.559767812931147,-3.0340808715874097,-4.516067908815621,-2.0480823539743502,-5.435155429015148,-5.426801515870043,-5.430561433967094,-6.4376825657997365,-5.744857641193265,-5.735838124358226,-6.581422966212834,-4.767102598244614,-5.604894766002321,-5.447226925171588,-5.155943203975498,-6.238319585524009,-5.222313838038843,-6.432987237891407,-5.403430623908345,-5.504740065425986,-6.257778268463236,-4.985763588704058,-5.484910653653674,-5.884579110487863,-6.517491402488635,-5.8312834626751275,-5.76411388080367,-6.281673636775842,-6.471251359591874,-4.689075216888804,-3.4199050572965093,-4.168442521685389,-6.737190720517743,-5.872129324648842,-6.347606565635178,-5.45584928520408,-2.244833875685881,-5.34658694971932,-4.7979636361553,-4.421550844017675,-6.2069162850631034,-5.480774545018086,-5.877190100917934,-5.834332845611247,-6.631481324657655,-1.3143197230821144,-1.889785897859191,-5.769563549039842,-5.091959490118892,-5.446762917458454,-5.376025144214633,-5.327195228247694,-5.828882615124822,-2.6385680818404156,-2.987767084707958,-4.985316536052639,-5.440220176400004,-5.926080682542807,-5.781070011087804,-5.689623367649469,-3.5101995720608086,-4.750913140350568,-5.999407454883594,-1004.2794786573714,-6.198660130690612,-5.733742764589595,-6.139028268175547,-4.242206404291634,-5.153139460313604,-5.849590294076444,-6.26293241574138,-5.820772819364512,-4.665730304958402,-5.530769026276742,-4.862934138267337,-4.282450742698562,-4.717680099023448,-3.3886354234038754,-4.963098647227401,-2.5323838072192704,-5.7127679322145735,-5.653269623082963,-4.940250494668339,-5.198116709772218,-3.4811319833359127,-0.8036731582394663,-5.493872857175775,-3.8863538263530897,-4.7956533737305795,-5.3116541602473735,-5.590592401181604,-5.906055461873599,-6.244161598410839,-4.800992005765936,-5.511283860886985,-4.413883495764036,-6.446128579652015,-5.842597576042273,-6.303875351202229,-6.295424711622138,-5.994904951293982,-5.409443621315702,-5.787562594861771,-5.5865455461849205,-6.62530591435278,-9.639195369520262,-4.501484089013831,-6.009392293274724,-5.967695174616386,-4.31672219774252,-5.354946996105401,-6.011227465291848,-4.353773233235728,-5.454491102806702,-5.139252875639846,-4.52141804889572,-5.394842659996845,-5.483504320365389,-58.67709890174821,-6.385345341422152,-4.547308737816497,-0.1839823331111008,-5.680117072559643,-5.670113665100679,-3.320274468612187,-5.67465958629119,-6.854578642047911,-4.636029253830348,-6.1770591274780795,-6.74387725147799,-4.71875336603177,-6.009691028079382,-5.116322368440387,-8.325316509210412,-5.272991140468967,-4.298762207082566,-6.206047180104421,-5.182638680858116,-6.5803944737801,-5.559557305008106,-1.2615407582934393,-5.1898074698688905,-5.721768627232825,-4.652715209517176,-6.130587368843479,-5.014327850881832,-5.364086621693166,-5.551614742453204,-4.437151994579637,-4.09833013117033,-5.541902652791813,-4.952278363906767,-6.381477962016097,-6.224544888801187,-6.032522233487814,-6.074967090643067,-2.3651357895112337,-5.811637559280554,-6.34108788128359,-2.7652036650245266,-4.710047783341304,-2.9557098395762234,-4.407338631310399,-6.291364543144526,-5.058843286068278,-5.429631996558387,-6.200862943019494,-3.766130629392236,-4.483353201478255,-4.769993840901055,-3.6350631891935317,-5.78658710233033,-6.530186147737833,-4.949863577443435,-4.562071227369597,-6.252427978232527,-4.956582512968303,-4.423901875587083,-5.375832240636773,-6.57232965364865,-4.167676639044136,-3.832154935585554,-4.606664116427518,-5.47206440035694,-3.9557660487630004,-5.067192228616266,-3.6490366991105425,-1.6705396858563832,-5.031012251781,-5.549708381991955,-4.684838685358967,-4.770502684806964,-6.183179931963167,-5.790722244897515,-3.393670682433408,-3.499915715252805,-4.361460914214956,-6.593956446097076,-6.1267290513952,-5.294519803072909,-6.846019228308702,-6.455916930581321,-0.12769732826418245,-4.117258967111159,-3.5291435803844475,-4.136433101340953,-6.408501489012513,-6.387356222957886,-3.226123221688469,-5.309380504990058,-4.980494892076225,-4.901449798269225,-6.425150399701532,-5.158133643445358,-5.183938462636142,-5.38379165279173,-3.6868785977653564,-4.83295582064123,-6.541171283549745,-4.369189798368268,-5.3825512540857545,-6.660233754470841,-3.545507393591331,-5.8663453295440116,-6.691712658556075,-6.606986055770976,-3.80278459386684,-6.03035446378818,-5.272204883115255,-4.615921901849606,-4.985654920562746,-5.119115396275527,-4.487853917059986,-6.284153538555759,-6.378302482509673,-4.823022000618209,-4.959765843793166,-1.7032512689722004,-5.026688019851658,-5.095634453150881,-5.472578753008806,-4.49656418712917,-5.651183631608991,-3.6604863221562725,-5.539073185171439,-4.525953397549784,-5.722623584165089,-3.616226067351952,-5.225279295149463,-4.980009367692469,-5.629755273121065,-4.397866980819444,-5.064057817543406,-4.9901745552662575,-3.4622993697291538,-5.475000404304154,-6.508761786359123,-2.506695134712994,-5.3726753682564095,-4.121107855711516,-3.0726196282621347,-5.913221441585187,-3.39879338384425,-5.182367990046238,-1.8197128392693198,-4.674635905384593,-5.839947982381506,-4.829759352662808,-5.749061211292837,-5.632206458164241,-5.395929584410393,-3.95457237868089,-4.622363033351315,-4.983792467758872,1.3529694206107616,-3.380253580753311,-3.7064491106233595,-6.0377741220098,-5.33277874820608,-6.526346438947471,-3.0229580774437426,-6.062012617354263,-3.8832026625600866,-2.386026578151813,-6.26833094874533,-5.685521621574377,-6.145788145467778,-6.105760795429705,-15.351471906927445,-5.152179672126467,-3.2172919130831086,-5.736369083878838,-5.005250234310452,-3.0824445352024483,-5.870233793150147,-13.79998792404678,-6.242878235462129,-5.055744925444966,-4.19601804800352,-2.7777292743913677,-6.0933232195982985,-5.5920888409610345,-6.459807561983485,-6.632719930842115,-5.266765287075213,-5.2659364236286645,-5.74692730789323,-5.16646257893791,-6.173177577097137,-4.848079769839716,-5.990241409181159,-6.047365883197187,-5.412305155922933,-4.39597683318665,-1.743689029766728,-5.542726831332656,-6.372879479105029,-3.966819015044367,-5.075059015531611,-6.343955993468514,-5.225389047123958,-4.304778798254498,-6.673878626346379,-2.858512747241204,-5.818324033225984,-4.510114393968266,-4.675753216540595,-6.104393931616659,-5.548003649626271,-4.019334544588787,-4.8779631648901685,-5.778039549136864,-5.2479780073195155,-6.054998831464145,-6.189692013107672,-0.06684387083591092,-4.644770262436008,-5.897087291787066,-6.4153371104168535,-6.457700850674055,-4.100024855107331,-6.175060421813665,-4.257798729396045,-5.228916509948971,-4.715954847006263,-544.2882539485103,-5.52770019123556,-5.663758600746059,-5.008812700957165,-2.055820462879314,-6.135921978071426,-4.5026467820568055,-5.531896077717956,-5.206095568159972,-6.258630636690343,-6.2021369317856765,-5.2195802500170645,-5.916846155045702,-2.849894825016407,-6.079208473031766,-5.915462632608344,-6.5929764182372095,-5.991884412284963,-3.741009023702313,-3.7288011166915807,-4.379979105575762,-5.0604525853036435,-6.0901955487510975,-0.7234231855211191,-5.267860966614977,-4.220259653651553,-5.009731787719738,-6.461151784063619,-4.112100737545537,-4.230718953363937,-6.489630998087943,-6.508606339204142,-6.313673841269079,-5.444991020784659,-6.075907860288515,-2.4105003681617676,-4.479122649839594,-6.313398698809299,-6.446444305919558,-5.498458319529663,-6.166524936352262,-5.571983211558195,-66.1064215581131,-5.848830576352616,-5.772011553504335,-5.709344411637355,-5.325664781879505,-6.288724722287101,-4.6231784768837105,-6.345173532110881,-3.6448684050627276,-6.632257193221314,-5.62746250821777,-4.3364021335812115,-3.8949594808655075,-3.843418780687939,-5.230898234910472,-3.923788975638647,-6.465547886940463,-6.665011197602839,-2.5512965077521574,-5.698250175849126,-6.132665095364338,-1.9974233066265432,-5.453841080232836,-33.81642314500564,-5.605283192980448,-6.187605978408495,-5.519327555894471,-5.56549899123934,-4.420545527923345,-3.951419097286987,-5.552286812773916,-4.605193084614942,-3.599084452285791,-6.7692722526739075,-5.204176555136763,-6.006867550141779,-6.169350969040157,-6.027516875631946,-6.57469199050184,-5.388141110389553,-5.473144416975444,-5.556689732179973,-5.2991958508583386,-5.0526734919392675,-5.5394010202599215,-5.206617060653794,-5.786122018270419,-4.830539907074097,-161.02630522659237,-4.089273767046107,-5.2969221009586045,-5.668684401002449,-5.8443524778145335,-5.444495226503275,-6.157560569959226,-0.9621678200577944,-4.1814068276005125,-5.315352398966289,-4.993312076712528,-6.302966527422565,-6.476510040860465,-5.523915202819627,-4.176808547116536,-6.134961962786528,-6.498146123321892,-3.762483801623424,-5.306607489657258,-1.021682194509297,-6.298252758386431,-5.789606034433097,-6.711141217381561,-6.1103054068902445,-5.082652663177347,-5.05997258186215,-4.218194670024982,-4.794213942475096,-6.190123655511485,-4.952227447457052,-2.938883121478738,-24.201394257223054,-1.0132191344127661,-4.583193737954831,-6.124648526635084,-5.457729218966453,-4.329116678702576,-6.53100037413,-6.712351871015038,-5.956709739808238,-3.970284122353293,-3.407564164252006,-6.464756855038204,-6.5124794752722845,-5.721592422570508,-5.4249375235790485,-6.2205379060475074,-2.79036347430946,-5.24521825147769,-6.373849466361159,-5.032594896039795,-6.521686521506648,-3.4800574074325286,-5.478139489782862,-3.6813257952589873,-6.447653050461195,-5.366131773027499,-5.600937710724075,-4.6313375625738615,-21.481688118087444,-2.5568512608315137,-6.488445323190627,-5.565594748918344,-5.001573687528039,-5.195933434610591,-3.978554317668098,-3.0067188705402232,-5.776666418035834,-2.57668973893713,-6.291421454627255,-5.754120981141936,-4.467526901302766,-3.0198975753011363,-5.483478694727284,-3.2453122174894427,-4.205401542506257,-6.683202612380153,-4.177775237141752,-3.149640789437415,-5.838331687314893,-5.267421992919762,-5.165249876796494,-5.211672459897319,-4.174622928453296,-7.542481757466074,-5.220132930394316,-5.492644481074329,-5.854149217204655,-5.231296913167952,-6.836041957059445,-1.9256620930277004,-4.525065225607298,-5.198616473056923,-5.012566864575016,-5.522763773773044,-4.905558523009642,-4.170913566396258,-4.97911330752371,-5.105132227597432,-6.5381160331792465,-9.483793719186659,-5.78769146059643,-5.719732072626351,-6.795414583918232,-6.236936914398177,-4.143693908849789,-5.030735308312561,-3.696653131102197,-4.9133272358658715,-6.744969149727741,-5.98724536609835,-4.98907056556036,-1.4628978402424613,-5.469212257192423,-5.611472452784375,-4.772305411800623,-5.919840116459506,-5.3404715626626125,-3.7094464471864708,-5.013071689587861,-6.751518506432324,-6.102084230904849,-4.021439221219758,-5.849311702764797,-4.312703726676224,-4.721398995521742,-20.235338336370816,-5.424425991956974,-5.306888415539273,0.8777140146713305,-5.316960227326669,-3.2297119681363893,-5.047798808046843,-6.036664283538837,-5.123384693311115,-3.9858521975936094,-5.3659773917242255,-5.3034951256511285,-4.200348574712097,-6.048751473262611,-3.3772423058682834,-4.283993505448903,-4.830904291021186,-5.316338372627466,-6.185605745798112,-6.10729680907459,-3.2685974312338617,-5.021640470944994,-5.652551042673796,-5.423161613992773,-6.121350317758946,-6.076536364156409,-6.335117004642016,-5.969564640148162,-5.049911059164437,-6.24369772302025,-2.5791343373374858,-6.24527101160179,-6.181978514773593,-6.362003509640359,-5.77317407335021,-6.535865951923106,-4.774670615974695,-5.135898834255281,-3.594550564847686,-5.402180757042298,-4.830112454921948,-6.113192336709727,-4.0735623438776525,-1.8823787070844888,-5.380209032351577,-5.992792489759178,-6.136245627686193,-6.702121170458565,-5.662659074067805,-6.583002318945833,-6.1970461242979304,-4.135891845858426,-4.47813156174924,-5.299683456636572,-3.884625021706849,-5.158812292273148,-2.121243713489395,-6.233105694490842,-6.316658702010168,-5.465913322368525,-6.132171596541518,-4.904108402881538,-5.39184174346584,-6.908854963033111,-4.902969873096748,-4.892488654215482,-4.993566356539052,-2.7323508716308327,-3.5806273733770513,-6.5184183424694755,1.8960146097863984],"x":[11.51236021437442,14.967876798435205,14.480703449366574,7.9229796338243075,2.881359457852861,0.06435095023294757,15.347102772660183,16.132513321510448,16.026256481542703,11.25006061231343,13.215227493607102,0.41126060120763697,14.218170646275127,10.316853575977397,13.901091881950741,8.164425109598575,5.067593636338263,19.160990551074896,1.6828842690496648,9.288306561902054,16.118613870390025,11.74697466348611,1.1811138681838784,14.457837359656072,9.287882300754156,12.907674895928993,0.6839556098228616,10.617060741160431,5.1516654580398,5.678129197738304,1.3231057768645504,7.5334294554552494,14.883681132109903,6.911508459603906,0.49747306761894095,18.944908384463535,5.9158274937170585,9.31835121441492,15.255228576557037,2.8941852679075586,7.799972639816399,18.774530589660312,1.311522125614153,5.571646956997425,15.481604689544376,13.4457063451581,15.459405887615336,16.998911717669376,4.959706448049537,10.055766946022388,10.315704285270645,10.53992797218132,5.117629287251919,19.108961911376262,19.87330789007947,0.2521693806827896,1.941271019849462,7.124458024168145,16.48224584974679,0.18955424783975605,18.934509117742373,8.210780968763789,13.801278899855344,2.1774233405023224,11.189900961568245,17.57080261414595,12.675303252879653,8.781423900833989,11.430271259144504,9.382716544970222,19.68824666087318,8.668249819331844,9.821962736637033,14.86616440431523,7.1407640925341775,11.52319120398321,16.497671809646235,17.32562011344301,9.891760649349624,6.944068465760989,10.586304545958608,16.484732087640023,1.4612196399981414,19.506080792603576,2.3588157177077917,5.801201846664403,11.756993497537236,17.613120277211948,5.239799842683093,3.75436900129154,15.66423087507166,15.357679338947857,4.240380740741774,13.05138735091155,14.05166559852348,16.051371532528588,0.43233021543804817,9.21971179291305,14.405626717571636,3.800476108467268,4.85774556037645,13.049681406430636,9.514335008638941,16.9072128419123,19.798069002993643,6.998004789318153,13.792489475022718,18.6459086922218,8.230550699569275,1.513364726745423,16.778415275109456,17.85737984561798,1.8794497605616778,7.497658768545286,2.638214916254795,11.926931744741402,12.691273658291152,15.361729714894118,11.67098714915944,8.208458156557823,5.71124390243237,16.43885298299647,0.8895158432683647,7.582728922896105,5.636673599740303,7.781855867255594,18.552402201934864,17.811885008598885,16.642921596012314,0.39948292311475786,7.2617181328591185,14.21413680353185,16.09763253798553,2.1547512211254727,13.31996342756355,10.402442982118822,6.087492777439674,5.608816798095617,5.726376298618501,2.075058743984126,8.726584205072268,18.061952880360778,11.588795556998086,13.470545763273059,2.1034800649277496,17.340670395384983,7.983478977060097,9.559662868457938,8.583079260369333,4.742529765205381,8.234090627860429,9.419229981973448,4.28864402517342,12.113918951431227,8.058692788736366,9.704977079362124,1.4809327767955072,13.446418772046474,3.713420967889265,17.36542106409495,8.321879886585087,16.861311880571183,17.90458926826936,12.121697308872083,11.857916044721462,2.8340748987684306,18.223426488115702,3.4288760360766712,0.027577454596747764,4.939214161056484,9.371365911382004,5.299312303368713,5.224567598734278,6.401074437055874,9.50434986094383,12.414427892335077,0.6883238523300994,17.62848731316207,2.072771347288982,1.5956107712559442,6.830993416120359,14.441638608837643,0.5967657296922324,11.01938455525219,2.423600495981364,17.276112444725854,19.37986693458265,10.337892978040157,2.877414998850809,3.3088728253016653,5.644754567089008,18.595982236301467,12.73019436613826,2.377988894547096,4.608452309922635,3.399104993224391,17.88796008375947,17.727608217461174,18.598873178954946,6.176826905740813,2.641555913794975,12.46285319938368,4.265158199024812,4.165943290679914,18.131053752470617,2.6028657451070947,1.4994278456337806,8.609592911060604,9.136719630249166,1.5361094107649942,16.734035151944173,3.6020935915606023,4.96479070437716,18.8361465484857,10.355277871890314,9.966253178641807,19.512184052612138,6.184233418075626,12.815116083202582,14.601250486618111,11.678054157967765,4.228962481521075,4.239438821201924,17.534246248762084,10.584756271609223,9.054170910254582,19.158491392072087,7.642545941014127,15.35553915735063,11.289793656223722,1.4106310761144325,5.210076144221829,13.104149497888642,4.065776388285527,11.773443774088337,13.387892043550224,18.45047111610864,15.780603058461939,3.1975056424436943,16.212857696726918,0.1597897045344565,8.799171689117804,8.848164610980827,6.754334441080472,12.568404824498153,4.052983105796106,17.231875506423325,7.067191473937737,3.6704569424190403,10.121161807345857,19.335733531467515,9.697862423397288,6.366064879134683,15.876519485827046,2.1696750191341474,2.7890933616434177,19.51924474616094,4.146508081517286,12.418445601622366,18.214951837302987,14.322749686882306,16.1200436933305,8.272149716994143,2.7430525554096086,2.9892131698987834,5.594029340500741,0.3243373700176244,2.8241704025603642,15.534185420143425,9.45762440435297,8.057040736999323,9.421079354607587,10.516576794588559,13.335942373642325,1.8538140922191548,4.5215374599350655,19.766970840652682,8.41155405756794,8.876648435205485,8.596630488317745,9.273929434339156,1.6833741712700512,18.904231920528808,0.5162705328752759,18.575412494721476,4.522888340005742,2.959432103709565,1.1418333039152673,5.685106751042408,5.8971029861373925,1.6544323185776344,1.025137798147715,15.775905962715925,0.07315214215763977,4.5093246388011465,5.60728458475666,8.788575466812123,1.3803969109828795,10.463107943328813,1.1013097508129155,19.23767411409826,10.798390072014396,8.80497948528912,2.73291940320211,3.474983240689893,14.52904917054266,11.348378383951756,19.543052510501845,13.957993397476915,19.159240010300245,19.888552938880558,10.421670415379069,1.5196848203222224,0.3608019848283295,17.13334889524645,6.126888264014108,8.227944485064715,1.1395044033186696,13.47835773073042,19.073593962238455,18.658323358930478,11.47461105517583,2.324238573411921,13.976052103010762,10.827392480508816,13.753979668972276,13.926223587135445,5.456214435531135,5.115617713075964,8.809595654571648,8.313827223829652,8.246899661211886,4.4976167042031445,18.453505683803773,18.128089736239698,0.9977262967448031,10.759193394365433,15.098504102127048,2.511467227999664,18.949331154751437,14.062464415298287,2.330490990884484,12.389470816558092,15.133047268564006,9.526809934857674,2.3167273131449484,12.857260742422465,5.979359550935093,16.336916964590227,16.952426721161626,11.164717744698503,1.421679351354923,8.616231158444156,8.769208976941606,12.621648320912144,4.51558947275811,8.037588581556218,8.450493988450699,18.74974924476534,0.7621869302563766,14.086422999050491,6.615025558679264,12.678033800894163,18.232692146522062,14.21820326310447,9.980452426296985,5.262983090983799,7.130890737471667,6.631101023658608,4.000145513947921,4.104785694640705,1.0083323123060062,15.14169987321042,5.657555516034796,12.684725477133538,17.41727144571414,6.542704619178936,9.813529513967794,18.394357765605463,14.880355967071353,11.807590550992657,12.86527021489707,3.5545037034534044,10.744055051047795,16.343346610574088,19.166284139454874,12.57684135763979,8.693486921977268,19.079006780899135,10.758983392268586,4.8988885687992445,10.259510790605688,18.496263045033356,7.649343746693118,16.334450974655933,12.818046585108217,19.394282844322873,2.337680282161738,1.1142098415338486,1.6623911322908302,16.927476470036122,16.029380784780063,13.443323720411886,10.990015392675968,1.7562680033932487,6.333900674382793,4.021847482176906,3.688159085245628,15.316433238049472,13.379322981663343,18.31288313207611,9.81841533521331,16.11013152237141,0.3904331280652862,0.3604512234587798,7.056820936352768,6.398614839609906,7.758149773782046,5.270688802718615,8.162331350239857,9.373536338816614,1.8186268640341918,0.5628931117274494,10.02012526585367,17.488673484202756,9.066475172198398,18.748166629900204,8.770595586897688,1.1869822571488298,4.222512104582723,16.808758004772244,18.021770839324198,15.047152061448159,6.584669589617018,11.490816330731878,7.768042010254179,11.780228097556854,14.408785958507643,13.694287293312449,18.856722187328273,3.003109080272024,9.121125761619183,6.5002475976207075,1.6268294943591366,3.1862085465048073,3.9884499048935718,13.969797987762206,0.9174102992824285,13.707616266851161,10.37794545415522,5.860569064628396,7.182813304996052,3.7019104407865644,1.8003147767371974,19.990774632930524,4.029707622447942,3.435456868229214,4.8041312763349,15.26098085948358,14.477512764345493,19.944994321928817,9.197990424135355,8.69046172805568,12.104506961327903,15.78273516266548,17.0445695554533,14.632340668993656,13.340418380438596,13.626097070149573,9.268743032134621,9.07964390104237,16.97623968025205,14.957824678192466,19.32842700703647,6.4131110116701295,16.0914641108285,10.915025771226006,1.8097898831032433,17.33694652868082,19.289751728394297,5.533387765106279,19.65458573717057,12.218740496523885,6.9603914504074105,9.399454812445146,7.285581326324548,9.199985364707235,12.056980237691386,4.456977423761712,0.049193187077500866,11.318562674082418,5.9998863361411825,2.6183771435496928,19.31191686901425,18.983468251919305,3.9813405633135446,11.614288885621553,18.59791766126346,13.009550549241187,19.999841386103455,6.301057542802937,0.24235044941815165,15.138432894799227,9.536741732729501,13.309634843462606,15.822287211015599,18.803048061452706,6.199407700284092,0.8184345574149754,11.375952439422594,17.34271323176536,9.164451726017244,14.40185881644716,11.869547222628324,6.267301105808101,9.18017341395441,9.12700753571051,6.789759542797356,19.83497999217624,17.011829709020937,12.15529733450333,15.620483366798892,10.399692483875885,14.59129166771719,3.869706448250665,12.470613567792753,11.52716483153486,4.60395425982802,2.6602986875583756,1.5069038689842795,1.8906662551911646,19.316806533315646,5.290611961796183,4.964558677554294,10.735434835342069,4.21165326299513,8.979288607280274,2.735464741371292,1.3879879086867941,8.054984933553403,15.97002226331304,5.705286058867904,3.135649235332374,19.967069993212483,4.644258756838404,5.304071076542258,5.30136299983428,15.364139743348222,2.951755511991623,2.7894262707543183,5.4047256667867005,10.323820659490268,7.406763944331147,18.192828077283778,3.7455774311175016,1.0924034805636174,16.294281480314197,14.006772098973412,4.579043629924553,2.8342631056751033,19.31357365776143,10.15001261601515,3.6245206392414886,5.775977015959395,10.641305110351267,14.874349331044598,19.005987809539597,12.534794485114391,18.888138986776937,17.281330810801762,0.12331453076698029,2.3146648126699265,6.7701746884464375,3.615332239467728,13.25659418774633,17.429713623984767,1.9433623021931723,10.628369570866475,12.709228602628833,12.436658450430853,15.763351720712869,14.04321084251582,13.021476180429863,14.996345856077449,3.5755939567103034,13.436461974293664,14.661485477828883,8.271387709869629,16.872219130096077,17.95444299801806,5.650656527303495,10.303376871602236,18.524002339620154,17.82411916037002,3.9747027644445776,11.332000406231701,9.546703528415236,4.461148178530725,5.9903309891444145,14.080422660575591,2.129006709948187,12.181325909264693,17.804663568352463,11.834982641327025,6.8498542062228385,0.17679946799313395,10.55583262473375,16.01913499825305,18.277615930168718,7.689613979559371,12.208369082343804,6.809621268060337,19.640956477000884,2.277396636368163,12.012958262922488,2.6726512741940667,5.899789535749944,7.0072644205331835,13.300469137100874,2.5055777671224844,6.031274852548063,3.1833102217311104,1.1941223092247188,15.826065643653845,18.923270078891605,1.5368865202562931,8.817945734452305,2.784301211941722,2.7784711394964745,17.6088022560053,1.4762009245018382,12.983654053436972,0.17871832362715168,9.398100619503538,7.3542145864676245,5.719634807567666,14.001265620430612,9.51800910185234,16.975963761596212,8.176996815668165,6.419357401267347,6.289765330491641,0.012916263188547106,2.4174391098115278,1.455171925660883,16.443117867851914,7.552522146366769,15.514348254519494,0.9131556446734734,13.688795974030725,4.290983816638332,1.5383272547524607,19.462877893572937,6.236156533898294,10.068660944991606,13.596662536411097,17.552713130812776,5.3145641217464545,3.1699976479562553,9.112126083157147,10.409099628245478,0.4356845531610398,19.248879749168854,6.638914148453794,16.503652112370034,11.010792427769346,2.168980611606348,0.6184013507905917,15.232182790844941,17.151953640195764,18.872021675992052,17.411633286830046,15.18353700192462,7.631368595594958,16.69864131040815,15.977584232810912,16.15691045997588,7.625810439094596,12.048719241674192,14.791297287009485,9.421177683286652,6.309124442811096,0.2851621574056473,14.608026391688306,18.07461016383245,2.1864296327002375,4.864095959190298,16.83860391033914,9.224990496137039,3.176564860184481,16.1525353371754,1.4782580398196332,12.527572627276262,8.350840700347861,1.541785731953369,15.588729649331468,5.199073395437419,4.121395860765293,4.012743624927264,9.639051153157467,5.499819805990129,18.027215160927362,9.705611347049183,0.1041970333680009,8.709836123576151,10.737610168263796,19.485740083100414,15.262153671715527,6.792311122580736,10.975230546429614,7.952772947914926,15.058105503342798,12.231034495178763,5.8240622099688855,6.300155306172304,16.817791734502126,10.708322066554148,0.18405269774607103,13.59726147495902,4.8937588504069796,17.722783582053026,9.839327619798386,18.065668795789158,19.86217994801738,18.93462098498494,14.596508197042436,1.2891091376969088,15.511164454285291,9.29906854279752,16.04309651316589,14.171645742297617,1.4852481672169082,6.3587920380440766,6.06607985617301,6.939097364898434,16.352815016575477,0.18254878871572622,4.795371749072008,10.357664622123695,5.340178336489054,18.30298416905633,2.111270007076489,2.8828399770875768,14.653994629315207,16.279458639644137,13.136131231235684,16.995814093840135,11.848316797764777,2.0236360389991415,7.8431841375572775,16.251026944311317,19.455704840611453,8.690413108244769,13.519760971828134,6.514290775712239,5.802637150267054,12.813476777810507,6.508532052924689,6.182858403623559,5.312763155743405,12.69939837569201,12.194945998450537,17.017216064569915,1.5472325707621737,15.849139211356187,10.407121774748305,4.091249301152775,4.882981198326477,2.159101957989984,15.300755292775623,4.618116365098621,17.54977038699707,17.101347681774534,0.43050597648509825,7.600269791096541,10.681197710164415,2.1632251034672434,8.502501621884392,18.828844425346905,11.234833223835775,11.22372834053353,5.35648055803061,10.461476965488767,2.6068872657947484,8.030018474338139,13.605710569401563,10.177537834177638,3.285978100993514,19.3660103860015,6.189773714063591,19.391416218583576,11.578976821383392,10.740462791784871,19.049463131602998,19.637902841078766,12.65823720534656,5.364207572620585,13.577021283101063,13.82663866902362,13.477724303207687,16.46143421462375,13.411732574738346,3.7936287361061583,0.7600813376314708,2.588573378222754,16.452719622766434,19.91952447730862,7.729587568652763,15.10190958190849,16.679847587707055,1.2502190071816877,1.4326053361571267,8.819319880807793,5.027374677775107,15.633720354970894,14.13487153594402,7.580751469745399,6.32742131888524,10.54847179283219,18.361424953506354,1.1103439778744084,17.839921444627986,0.3221409014781784,19.621587831978637,7.224589322356674,17.968921249633922,13.612615879646516,16.627299494115434,6.0682521820312285,8.456230851535915,9.101166571858638,15.936342243241853,6.0382517857434115,3.3956843149359273,10.682232658067345,0.08486335191903116,2.2351629753473867,15.075722159437252,11.802985301425117,5.140600206019643,14.25021266594285,18.926763872117842,10.34148335815004,7.3183488612169345,2.2945327039896,17.03835516213712,13.660017722200477,19.739409969415235,7.196348626065161,14.42841130266999,0.6003981946447379,14.260596577870977,13.699480085811565,15.709691761999217,15.836335053311661,2.112455531260067,8.48316039732309,1.6546123516980416,16.154790571024662,6.495417552921849,14.157593633829574,9.835419354751949,9.762047529496156,0.3075043896458274,16.41371480718256,15.032993642810911,5.052019583803067,8.884004623016999,3.143006010320777,0.4899613322717222,14.457179617951393,0.3758499110283253,13.678343267377944,17.764994035900266,1.927092573101521,4.06459578594212,6.464092573843581,3.3250860549847783,6.994475801872597,19.35230384031744,3.1106377460584156,3.8000020532279155,12.772787693759003,4.5890623115225715,7.824980081247852,9.514373123888253,2.8596360520196162,19.276798213613326,9.506547339398349,13.277969916150845,14.919234868456135,8.394047525249038,18.701606007598393,3.1539641616478242,6.034192462753287,4.029190399009637,6.074459965647887,19.385569433987875,9.099802881752304,1.9235055834180015,3.7305147080534073,6.850822763590263,16.177417084946143,11.275406384527052,17.30003107869402,16.319083892425333,17.94392628379379,19.640174322132292,1.400942876986755,10.435299216129824,1.6769948083939967,6.869605212299188,17.896335235472037,9.540479044481987,8.309009026797604,0.29819621847914757,17.025890100189525,15.15515669273434,8.769448819084506,17.951813744358237,17.91941853232359,3.430955791856105,3.943508469407959,17.51446989052568,13.37247982060445,1.907893946458299,18.51875068670784,2.479905645340623,8.38721450780163,19.871403748962404,5.921479738181392,8.719476758398716,0.02071966970330852,5.101559941697453,1.1711743186265844,11.436081979936748,15.776564150212211,7.53044292326897,3.3388425183736103,8.10137521722535,16.65691888089536,1.4063340571575278,8.617654562690898,0.9872188223984368,1.8030226400812932,2.8165949655305944,4.537648144066599,18.318975291845298,11.128837050694367,2.5015851513815157,4.171927439131231,10.607018891970664,5.997206487988929,14.124933789229384,11.492549403222672,18.47900788375243,12.698501973999896,14.771179042030433,10.919116572343954,0.39132309982258473,16.943486473844004,11.724318760698056,17.232696905919653,10.966962160292052,15.532400735464694,9.238186247793063,7.882043880136869,1.6371458226193258,5.142207051657146,15.335284317600522,13.612570746740275,1.5500835510438016,1.9039296921913174,6.782678689635699,17.666038721637687,16.70147121828917,17.74920185527452,16.919736551498957,16.517879588140836,15.399377527866118,1.4327394673209604,1.8777909850152685,4.117538075357685,4.65279170500859,12.082736288563275,2.292431462262927,12.367058451145315,14.189846774272894,8.609984561991064,12.891513882507471,9.234058877138342,5.986668553604275,19.92955083323732,2.7929924781698734,15.534139283919304,4.3237704075667205,0.37829260177063784,0.9150791288616977,14.054967402047836,0.00565015670597635],"mu":[0.45722021424941506,0.7860897878789599,0.8591144823906336,0.8525536045451112,0.7662240733460008,0.8837898533126956,0.48608813591072475,0.16451804866640884,0.1167528667217601,0.8315342697142838,0.29659162201448397,0.17797483244698098,0.009458028771237359,0.8089052396862559,0.401544992786,0.4161668326291721,0.3711369868365202,0.7743435280830497,0.7106004096865959,0.18119403865194128,0.5977131227029227,0.7221531549151963,0.7453994807478745,0.5377577142944476,0.7228336412912102,0.5236228442338942,0.005419959575839295,0.9466027942248383,0.6692894830840983,0.15515721482665001,0.4001362704857334,0.2239726741289474,0.25287093025365714,0.010392766764048877,0.34032847865590643,0.823556999820515,0.4598881103598358,0.8011409339838822,0.9113511593872996,0.2809434971969964,0.4484043976787866,0.1058614781170426,0.5383382800034526,0.08588400321389189,0.17573589661374633,0.4090514278564026,0.4153029449326662,0.2977671602448593,0.24795261086987375,0.705069178778635,0.8670268461779547,0.40410334611756404,0.9298926548538096,0.16962618055167278,0.3961207861351459,0.07704665011103184,0.3017779953937745,0.09839557646653097,0.19382349615421934,0.16693891545680883,0.46714164114481016,0.16798709198249084,0.7930521761871112,0.5311790241251559,0.7656390482872479,0.307290485504899,0.03145868031299881,0.5397936699175712,0.4139784164408291,0.8145109384645699,0.8796486932342171,0.16501090233851712,0.7625955616875804,0.004203006523825881,0.9722840267556885,0.21815518145127033,0.9056315038336691,0.13015057559011978,0.406674726602543,0.3630488783045509,0.2972738780791313,0.9944760555645387,0.48696558041945903,0.18418895237365485,0.42087653203172004,0.2845666366193145,0.01674712993380001,0.24683003437491857,0.07592232567434842,0.1104114800940399,0.5597841921071829,0.534434504710724,0.46156577272131316,0.7482007032880622,0.008300251600114494,0.7049927324912817,0.27592440465755463,0.5380518349557604,0.04827083278530542,0.6934756019057504,0.8671330530196102,0.5861454797121959,0.3547783727642877,0.387810684426549,0.49614888851164496,0.621782810507975,0.008206051863991481,0.6657336632943625,0.07546898924594969,0.8360259425905063,0.8634249852322109,0.9799668465524711,0.06200486805028005,0.7045833844981386,0.8784638383327605,0.9577995970852862,0.4454934988845469,0.8972645928281038,0.42231612755888226,0.7140864371012801,0.32292741145153014,0.3360084869036961,0.10460975737641531,0.40471740054882477,0.44190981467294077,0.649456355486363,0.39571506975843773,0.7125094741382529,0.4218805014498104,0.6495015810177929,0.9348333983166472,0.8635058593182761,0.9699700573738479,0.928427147363954,0.8404836377084497,0.1592394823067551,0.5279932149555344,0.5885758636690994,0.2863037569623976,0.5231178478804956,0.5106372788508309,0.8070702869046158,0.8571116908690111,0.02432010686650088,0.9571892999906912,0.07610181786131798,0.736593183901773,0.5710686131352434,0.1674396239495266,0.6056957005383732,0.12242704989823938,0.24136309702322611,0.20101573520625515,0.9382462021498876,0.6287816419999037,0.29883800037813635,0.062262866860440136,0.1951199553197076,0.42110949584599067,0.5803552129990621,0.4455010020110408,0.06313459637935237,0.7604449160565527,0.022670015461476734,0.535523458939053,0.6731299308985397,0.6785363919025749,0.0911016455787701,0.16632948247834567,0.33575134387889594,0.6609619685006265,0.36471096910894096,0.13939478570462716,0.34281288926773024,0.45962984948152164,0.43455911267628844,0.7664107221263765,0.93392704577331,0.6774344813995592,0.8648942390101719,0.19481050694027435,0.9416890245755902,0.46787757887626746,0.8987784602953888,0.2951831958097917,0.1140217503141856,0.6752983631119795,0.19390942276466827,0.9324356395035014,0.6921357063927429,0.17200743234032378,0.848799527373975,0.028130636821428245,0.9799663075017757,0.797530339574253,0.5716761484166848,0.9437720212402803,0.1189307371671442,0.7203654494392944,0.6321953602796462,0.9697552963316352,0.8045955639081952,0.29475588213663206,0.19499128943427957,0.6813562779362325,0.5413470604140769,0.7825390940508625,0.40825376951255765,0.5416833303147564,0.586732092470466,0.07135738269843439,0.5269462130044864,0.6060778728694052,0.8052368101902865,0.13285831359780675,0.6362109844529846,0.05613929342338442,0.373095907355226,0.3309041405910689,0.2528579672784259,0.7926187021947619,0.7816649976798262,0.604418229652185,0.45398291159281867,0.3946846239257624,0.26674277976656624,0.3127160135243703,0.10061794204970309,0.09498834199156025,0.5638193697785712,0.6478864837729141,0.012340833479927316,0.9372399113042169,0.08249642315652994,0.5947164468007147,0.49107613737622113,0.20230990071648436,0.6437523133587777,0.6671399786278343,0.8520903789677365,0.6269269358121803,0.7191894680473079,0.1908955460152122,0.8200739078919417,0.2243530815088659,0.38472296227619607,0.4221791648388753,0.973590712071011,0.7029401157408537,0.6931785690038188,0.5235909620888344,0.16683708065024705,0.8633806486953364,0.6508080209973037,0.5452258731072435,0.22019175670618862,0.3035496083108209,0.43211145121719463,0.6732364588866881,0.740888596022161,0.9268359789863749,0.2688017315062037,0.7660797285666365,0.2883618170091935,0.5971378836658288,0.22880504965387893,0.37319111459365395,0.5664834139106434,0.0036818084384164784,0.10716679832239606,0.7836307616455853,0.6111186025544084,0.12055046202988962,0.7244491131714796,0.6823539693725542,0.3494793049291667,0.2195148870292778,0.03445540769403155,0.26080487194786883,0.3216410058414514,0.6068051756899688,0.803581382900562,0.5618720767586023,0.7509610701392102,0.6064536122914681,0.9957008131510323,0.16064940284774543,0.24742051860931236,0.39899170305176446,0.3553282035455365,0.47407317775233393,0.7896832215884235,0.37540308012050705,0.6627013358834621,0.3532919106731629,0.4567093362797696,0.5354184463216751,0.5923497179073678,0.8548761517548238,0.9811084973992339,0.4788265546278012,0.8158967224562754,0.02344188800536684,0.6518722330172058,0.39477234702556596,0.9244185294213316,0.12705209082043267,0.13094414732087856,0.2180528930681298,0.8699822320212507,0.44703439664976696,0.5411886622574329,0.4016247145544216,0.490930701835276,0.027667330605490426,0.8243405640303276,0.19535502873221544,0.24443515844710562,0.6019696883111778,0.4561291336584632,0.8043810046661299,0.6081863602113848,0.7847951416308692,0.648082179219374,0.6863001652731553,0.5581337319910313,0.11844764370722616,0.7167481828435258,0.7017185679681361,0.03859181755819008,0.8510089592950782,0.19018578661479357,0.3551766075803784,0.695720794818943,0.845172339860832,0.8365399117217427,0.40600315516293684,0.27998458235560975,0.04530356471066632,0.5096575707993829,0.09175388252014116,0.013615104499088426,0.5031598888388586,0.508752980278075,0.4413758585029268,0.5221403809127014,0.8676394354961947,0.6892591093931759,0.6519798100677836,0.5914238907896658,0.6922117351293573,0.07976162447483426,0.8414586843069474,0.8187914027482306,0.3384615044095436,0.9183450876782102,0.23132456268604562,0.7466898964250441,0.7008011839819119,0.9189102560903872,0.5525237135231422,0.10152402231653412,0.6619677759495559,0.5745627521542191,0.014978839282064671,0.39417888285717373,0.42634625200753007,0.7057782489220557,0.8583911883304651,0.492070300395993,0.9311322365823718,0.21045278468656936,0.5273738191596553,0.5352769580575296,0.409380419869674,0.48594927834020196,0.2647492934125506,0.3146087725231188,0.5151980295450804,0.8187197648043687,0.6189873336677061,0.6650360695604451,0.8103742118372679,0.48503282259260194,0.8925236780222894,0.9042827813475347,0.5875852785101745,0.17363894382913414,0.7961762540216533,0.8422419266054382,0.481714976892631,0.3095247087067956,0.5331450592956286,0.31856473201756264,0.48950886683819395,0.6869332127373138,0.3528577757986877,0.5452370336145458,0.3110124530795808,0.0979280408935661,0.5814953690917233,0.21350397444525315,0.18170422880730008,0.8035861072548087,0.5961090988000859,0.7681319533438049,0.8802098106464393,0.3585806365958353,0.5960659566184823,0.2977854688598529,0.5602959583718179,0.4281096582887465,0.9198861735363166,0.5897970708548042,0.5740666470934501,0.9731842261492996,0.6963394187752916,0.8772151419062588,0.1715430209106672,0.25653111313714017,0.5127088677116904,0.010162256633611255,0.018961316977230247,0.608171379744864,0.562021177114058,0.034008190735885346,0.6076956974671441,0.05586335990023383,0.6617047071911417,0.14868931425560872,0.04151357862372862,0.6829264228109331,0.3714908801815435,0.7056598919218675,0.06641287061215095,0.3436630025626317,0.3068713019619691,0.23167045178719503,0.8183998922738804,0.3619899959601329,0.7270902270234367,0.44081965167599657,0.5941620583495362,0.11800129895370182,0.6291633677030626,0.4080076247056599,0.24078488358746397,0.966491887322017,0.4806387505762706,0.6682828436913384,0.7693411049667374,0.7001346902485224,0.23275888744408757,0.2905244553842341,0.8910096445405835,0.028987553444575154,0.4522656141068917,0.13879739286679538,0.6258992172824973,0.7241557863526698,0.24332448177151322,0.6799917536029598,0.7107404304903371,0.859537021932955,0.22294048974216052,0.10745582832411782,0.3854599599638431,0.9690434793296365,0.10975032914624028,0.2873346291401624,0.8609191578324897,0.9817060825984161,0.10279351496007605,0.3913425581511678,0.9169460720736835,0.25651766609287296,0.16066578656687835,0.5586512233563248,0.3250170321702186,0.5358756871564436,0.3585642662810504,0.9238065351901266,0.2939697684711129,0.4173670774208582,0.797382052424304,0.6379043941033662,0.8231224267314681,0.24104523242632792,0.5467245342047462,0.9809165435009999,0.17073222623874473,0.006403520515648742,0.7047481200381767,0.28560672401545006,0.2968527492967663,0.927012888485014,0.058210242840194715,0.5773820359318174,0.5238639437443582,0.03588287247218824,0.5110166546334924,0.4118332390588557,0.614472270545235,0.6089439855566507,0.686352392672106,0.20201425176054433,0.030175393906755943,0.7166296869647282,0.1794877849145351,0.7389834526845684,0.6083001591502362,0.821481517952128,0.5689951651480059,0.9855501783537837,0.381690398905304,0.5955646927838665,0.08850206776436664,0.6614211320703889,0.434839059644736,0.8878708717030945,0.12005852897964786,0.1386561887002078,0.7705610193833219,0.9607559620037434,0.7153050498920521,0.8222305678171007,0.3549374055721166,0.7341818022113002,0.4525851056124166,0.941453068154787,0.19046342358292057,0.689995839551695,0.5184263433350538,0.4490048325520206,0.5644614305343201,0.7076583059358132,0.04928916357940505,0.5281074136522403,0.04571556882088057,0.6162622467304493,0.2470348272375813,0.12078588433395399,0.9307873274946872,0.3985937611028405,0.07875727897061235,0.1754001016486315,0.04118350287647954,0.050920012437932316,0.5336110373986773,0.3425225008321575,0.14226534866388674,0.061747039521084846,0.2967989174264185,0.8534137437010081,0.8688100140146444,0.2034366677606223,0.5240683934821091,0.8411678188628067,0.8982825162400652,0.62124371967922,0.5911658205650219,0.42416070316998367,0.6157089834068266,0.8835579463631085,0.6140280385879597,0.36189597701849285,0.7459817470163952,0.5266436558535827,0.7374459280054846,0.19315731181101814,0.13169958757634537,0.19820850976722348,0.6968288926112836,0.8781163153529001,0.9240043624221501,0.037870042308833396,0.10125315403224722,0.5384867721584385,0.3944895232703436,0.39953696767842106,0.11785766645162621,0.6459372804386503,0.8253325140167787,0.911141825973534,0.7684436632815088,0.552403490287767,0.2738934797781125,0.9357575611140203,0.778959526128757,0.4938608257941819,0.6900896303364423,0.3696236668883779,0.5595123767235461,0.8429308963335056,0.19311782099095254,0.31564104566785045,0.08429339829132809,0.19681539970888462,0.3095090406913992,0.6824286734831932,0.9379566434089466,0.8701058324954913,0.008142002279584393,0.10813278137441462,0.0169440331850903,0.13669490401687723,0.08319405885118303,0.9921420891881694,0.12804004559673499,0.674792827796407,0.49434440516380196,0.5516339964662593,0.8391680687739542,0.9255175925550283,0.6269922593734092,0.8419831321761946,0.009113028590119088,0.841788378073048,0.9699585374090287,0.24516686285024236,0.7462047350124283,0.7984470324067992,0.43547851418151984,0.3136584545471943,0.09193418034936185,0.7488167173322995,0.07697774907190791,0.631978341794744,0.7477278410417294,0.27932834570190646,0.7724940809484031,0.9634301409468926,0.3358913667818957,0.377143061465814,0.8196867368623488,0.8030637722436309,0.9228465058164472,0.8520563697388988,0.4372773968798036,0.619199943766946,0.24451551767814528,0.5873839152824636,0.06441685257654584,0.8351372548291933,0.2804449230713779,0.05919521854571341,0.27971893470127074,0.2553585649754966,0.7149303521818069,0.12833923354880383,0.45018458562357777,0.5754215680718755,0.2875104049303361,0.19102782873648394,0.6248096009608868,0.4628335664130243,0.97163550735665,0.10714428543503551,0.09947993806229083,0.4704907156403182,0.2329637976869512,0.4229773681011597,0.15585663504944658,0.19605426409124038,0.23627091085422425,0.4302018374101533,0.4070287887242754,0.5241266313563402,0.9493406800059665,0.37316906870817923,0.01088215068320264,0.5105002700966452,0.46134347804862297,0.9247070259342938,0.01890498484937697,0.5603538658768643,0.41073005632584203,0.694523699960373,0.25228408173747163,0.237273298635309,0.3641881095848498,0.7137733112848834,0.7897560468501033,0.2565731674860685,0.7769789453017815,0.23401694082488667,0.4645553735184591,0.006845059056057368,0.34050475353118914,0.08581902505507655,0.9691356836423619,0.5965541909961616,0.17138717775697088,0.2618323788534367,0.650235694510066,0.1776981149527257,0.9082976151810889,0.24629597780300405,0.18326832202682786,0.05487919159059773,0.19511103066707203,0.03133277203562046,0.9069386607440688,0.19313901547865586,0.051924592585155915,0.764678652282089,0.3898481030295544,0.8143394897592113,0.9816450344239653,0.8740228938826156,0.08625075444697328,0.24062105781710064,0.2980455680113412,0.8531460684239478,0.7021263469262806,0.5149814393111123,0.7705668285604297,0.4558550591218935,0.729767180717656,0.1944975958081514,0.8468647418910553,0.6541974002554012,0.6069870718247354,0.916361987420494,0.605343849683341,0.12048077606283991,0.5064943763185936,0.9057415886650424,0.6952375812690488,0.1957479807576219,0.7595184553427681,0.1788146995644706,0.9435452437391225,0.0017128894508011694,0.5570230966651382,0.12540408938924208,0.21932159389965844,0.16574424277875432,0.7501337541107809,0.7468422565556871,0.4913356752575273,0.9562673546214637,0.3650285059798366,0.9941165992505132,0.6883290655565244,0.8626378308217344,0.7944651501825915,0.02241427643953897,0.6603914199882912,0.0770805907972969,0.38584476995701933,0.3922995843347017,0.8313070394902069,0.27946918763977147,0.24002883190191215,0.3333537777114466,0.566268948892573,0.687350967978898,0.4174747521312099,0.9404181013467305,0.0008059873257946215,0.6720697841807957,0.41279525328163524,0.8559457404035284,0.5717796060895097,0.086151442859286,0.723773907178312,0.21027131622914141,0.6199896791854211,0.20041190646613427,0.8555725904709619,0.10092348080159108,0.8653899682261204,0.9546502820014022,0.0929037646083446,0.8029927737827132,0.14400590335275387,0.9533130779649466,0.288852608361168,0.7957993633007863,0.43227265519793345,0.7762793983960679,0.668645493650839,0.6459180585376467,0.7246801902149036,0.629878244606495,0.1696941841607511,0.15533702928844906,0.8257037954838617,0.9172985192665211,0.20935424060784702,0.4520576534860794,0.849295507322029,0.058966267328015354,0.5464076214331954,0.8095346680164137,0.44840339552547337,0.556098852963544,0.8784022831318421,0.5794917546314315,0.25230136717345264,0.943676118190635,0.2254462879929391,0.8786811120712972,0.9332506623018078,0.2995355659756731,0.09634191623642674,0.7629520175653832,0.08245472284119759,0.13782320567832906,0.6324078808107925,0.6736357517240934,0.5277486933924906,0.6093486611557166,0.7265637643240177,0.4786997939057043,0.5600855136607619,0.7150759229624288,0.9727686743880226,0.35303662171755046,0.0873034338288845,0.7849199653682593,0.7085555118736822,0.6035477243253167,0.27442740610027294,0.5458885552607724,0.9561678160650142,0.6392702716284182,0.18322729366999413,0.5532804697038742,0.043517151626891515,0.6193974532766757,0.39851029886220424,0.9736477149604883,0.21002010575409447,0.8128251939289735,0.4380093828713134,0.5655850438099046,0.019482568851884263,0.9501173541976882,0.7412193990477391,0.9799622763320397,0.9733016730741839,0.942304459872348,0.5253498181148144,0.32610133357172066,0.24794767182578603,0.014560863303600291,0.7824059882454282,0.881647884588763,0.35283991693546524,0.8527531994847208,0.6716042279547036,0.5256469088662261,0.8745883578647513,0.13047025353280572,0.2450902543619271,0.8328951742979358,0.7223480290459146,0.8757561408506649,0.3559741473748912,0.23233683536679184,0.7620901483165698,0.13830070347404644,0.020751692693528057,0.4301857286022246,0.5655543384167723,0.4758621462752053,0.6961625928635491,0.40856538285095634,0.7779727157350118,0.013447978681401684,0.11156508747342264,0.6849966412023645,0.376324291406533,0.19256766490124488,0.19648157152249102,0.7508670680610039,0.22890139683384958,0.12069757388336178,0.2845220899629173,0.4619067101660397,0.16885274514751192,0.46490017287619256,0.9224044698356915,0.10373900129623581,0.26632263270743173,0.15452873595259708,0.5921565520532985,0.22522138261769165,0.6421190014780493,0.08157523126463273,0.0025793498875983367,0.6944230747382907,0.6803352561677467,0.10598802982469913,0.04679828499258898,0.5550508145283104,0.06734894820470161,0.5063837481287756,0.1654383193866087,0.42611459024405196,0.4050141794419957,0.2798131882771244,0.09303106623327939,0.756824304240151,0.7423153545418333,0.5790411060087866,0.3302472315900782,0.5188662217752573,0.303075542453338,0.3397982136992146,0.07012279021933798,0.0617735624670801,0.007493261230282711,0.20866462531433738,0.2930674923761296,0.00631315106579855,0.31450053323477456,0.8763270192558918,0.8569614989481262,0.11978024897180717,0.006475515860789427,0.9018206992260822,0.6933523140418691,0.4081954458920882,0.944603442496923,0.9553920744550612,0.20983676717833233,0.02385629640612441,0.6881084139714249,0.060551860699983084,0.721923182495283,0.21891402988513664,0.18273979908716087,0.7359310941234352,0.7043944235288702,0.5945376192481586,0.5116336693000452,0.16484261806470535,0.5719182026101837,0.4763735053903362,0.5238067838231826,0.4074064668782973,0.7399083436064893,0.7214595745808077,0.46825216440780193,0.3290222437692645,0.08924952133467912,0.20796522085894953,0.5022682451202141,0.8177324342419041,0.04961051743096223,0.5584481207172038,0.5674086880268918,0.7995607763601862,0.07222171887637341,0.14158293479458184,0.41317120283417963,0.5171189793119846,0.48263488290235323,0.4182439560208493,0.6305984877030506,0.5735006023402036,0.8771136862176114,0.06724559837660404,0.8971214783245607,0.9463012837606648,0.3157153995977573,0.7753859215814047,0.9070316247174617,0.5069016474134314,0.47523120186521184,0.8671138133568856,0.181105847779655,0.7078720102704652,0.6428591221541589,0.734274120440535,0.13721352816615928,0.6629498298675769,0.10062482082715096,0.9962902005267653,0.36542168006139186,0.43334788398436763,0.15036606350834014,0.2767408601735055,0.37861244006886374,0.37324831686677196,0.46147194380686707,0.40281515348945485,0.343115597034505,0.6449506620927119,0.10313735484929132,0.029723064383159414,0.7239115482543343,0.32374737475289694,0.6783731643154762,0.6294771648847224,0.23673336496596686,0.8224523221544942]}

},{}],124:[function(require,module,exports){
module.exports={"sigma":[0.45375214396797037,2.7430618947385565,1.5428427358052044,3.006567233918317,0.5938291181063415,2.2164640886688325,4.017088910373424,3.111999121889765,3.235912353766465,4.823636863236542,3.3782028021731025,3.116452167438424,2.894343673955646,0.9009732619677469,3.5945444014220342,4.770325510211871,0.98148057067729,4.314388037306401,3.9825240076354107,3.4041149468892815,2.840769830284099,2.8436919794843707,0.7299350850986164,1.8505987143707348,3.5091704384842224,1.4520555997750528,4.2757831793918015,2.9391741725191913,0.6183367483028834,3.917135208921035,3.0148169470007327,2.185621132830672,3.167717675206373,3.911350757910462,2.554863619940848,2.0626578387510963,0.3872812727308472,3.970605173221793,3.102788977419263,1.1678452874646317,4.130482776475671,0.8883090418199568,2.549813320847878,4.847771703963629,3.86450491345961,1.0229518819505623,1.287525005836575,4.834839689139976,1.1048770764427374,3.0667312615851436,3.2343190123636365,4.154526080435652,2.264401157631161,4.989208312599627,0.2796677849810647,4.222240052889784,1.5619411481089052,4.281012156028479,2.3612521783478657,4.051928427599391,4.180399829255021,2.9368749217203884,2.072708205461322,4.238468960258675,0.5883544045172684,1.9695814101690368,2.9256567441924544,0.9584731599299967,1.2009356712853403,4.529685143787714,4.536920586974421,3.170838879249369,4.691625985262804,3.7795513092316724,1.2104532437126525,0.5487408551058959,4.595819129655636,0.1153928335217258,4.313447856687162,3.1459216717976646,1.4070141233090272,0.3871491581431119,0.6438108843460943,2.375649682496963,3.723553582936292,4.272414310796261,0.8761808509763114,3.8428777799902036,0.7398382352103372,0.7597108419382437,3.060127438793989,0.23974508899639257,1.4839017657105513,4.2189299724606695,0.01515360297414503,3.905316432555387,2.2052070206311747,3.7262455579659393,1.9745527345738012,3.4375926641936982,1.7048689964656205,4.3927441964500105,0.6080470474381483,3.0440394958965786,3.9727472459430935,1.7874525980047162,3.527462437332157,0.9003582504160457,0.8963589009486883,4.063312217852513,4.753391958029907,1.6297667609799837,4.882585654474015,3.0731896463071506,4.950049949264248,4.212074715571312,0.8071508022923324,0.5175310377386244,0.45667004936910005,3.787996441666517,4.910095101020369,2.6556971414934507,4.7940101228147425,0.3758138231371877,0.4913351251267528,4.830188564438811,1.6784105468698274,4.889717541162918,1.474751026890777,2.5773674968978897,1.8922344791524737,0.045397867926756375,1.813212780805632,1.6209320706692332,3.4097924243352096,3.1191325369376144,2.642161588136421,0.32867141406337175,2.557711302355804,3.1258215382550913,0.1431666322165237,2.275676811674546,4.447818165375004,3.3057429403812586,0.6556509634670094,4.313940549049763,1.9787803978987217,4.031373916363069,2.127469025157808,1.0965154188122928,3.4367851805842253,3.0259193171511054,1.2920223029830102,4.650368415414504,2.0769597759264613,4.753603452762983,3.0185201271059547,2.5147790857982324,4.094985997733104,2.2030265111272316,2.465879613762012,3.6814220639685127,4.119500535560658,2.8414808346758527,0.9555702927606091,1.6399890163103081,3.1069916941006714,0.8970947874098678,0.027046312919182247,4.283337301305281,3.348213077853597,0.9196108597385355,4.686170320788317,2.539131412769663,1.273206435662112,0.9794610930879777,0.5331033273329322,3.43782255407878,4.175165511577123,3.1581192543887537,0.4142196126518627,0.19324048803643468,1.3132913835624016,4.449445060262159,0.2963920653205365,1.6505437401889889,2.741222232889827,1.5192455750680522,3.1435091314683747,0.09112258823594455,1.321702251464466,2.0093859946848758,3.9386718379918806,0.4539382452067797,3.116814441471616,3.0877730939980497,4.202599046923331,4.839097216398274,4.276639215169103,0.7782615755142896,0.028423805121902124,3.7272092709702087,2.911960517947656,4.933032966578188,1.9493003687379207,0.076715123618456,0.5810501268832691,3.4651453624616635,0.9957507409701527,3.3363105099121926,1.3027562355678202,1.0474818830836374,3.375220497519651,2.95508178475407,2.3573944698270077,4.917588005131584,3.8831786602707874,2.1454837756942,0.2081128890713524,4.488481361800102,2.5104833926178696,2.7591487008547477,1.1197867652269622,0.5558692098572793,0.3625584168319351,4.0506365776668805,0.13555888422634776,0.9018348228443462,0.6864465631131833,0.9918029888066093,3.836042822100547,2.0130879470277208,2.4026801153332378,4.480745679364783,3.2730588730789787,3.4720720445933315,3.4795132488440017,3.507791088754292,4.0923436574662535,4.647844638032069,1.7395488954778293,3.48257050327609,1.836736659274537,2.676356450460214,4.463307393037956,4.645270807405594,3.628388276996711,0.10063458744014375,1.165387026668715,1.2377211419336864,0.954431949091219,1.50472502800032,1.9287204665220137,2.3152937319045575,4.254576002715571,4.825071593642658,2.785774398308012,3.191191827281207,2.32104930213074,1.1008905050204598,4.078585958442439,4.65338485417222,1.8932449729225764,1.5813530084186223,0.8496906029145646,4.429565957809153,3.354075744202689,0.17923370265271465,0.4188090912324671,0.7585419881634725,1.0081736898503135,2.6746140904863527,2.5775501143395863,3.198800593387263,2.835459690490494,4.34332220583948,0.9796766946316293,3.8563693062453543,0.7011246728428344,3.9673276424065937,4.635792538923212,0.5119650762098771,4.027225154599913,0.20846672911636666,4.0399651204495015,1.0316113772331414,3.7653913613228007,4.403409506587419,3.6013827844337887,1.1725638878567468,0.6279810601028923,0.4965447627587616,1.229550115127973,1.2431452352937422,3.215129870948709,1.8988489062179714,4.093716388468223,1.2175944625327662,4.694269270746173,1.9616840662036583,1.8090982436353076,3.944400797349786,1.3870066193840802,4.274978935395147,2.0085879419514088,0.011636369470747754,2.043555009476261,2.396014534221742,0.01484768253801505,1.6474692108864908,2.673097703552595,1.383633081452813,0.6025926222862688,3.226187095742865,0.07463484164397793,1.1717069272726588,4.888641933017757,2.3660287191124105,0.47319608980166183,1.125383446780992,3.7698655854098337,4.829680673623705,1.6432712543924854,2.935199286098374,1.7444646382279327,0.6366337248319565,3.719854397030613,3.684440293981419,1.695963832155556,3.8680814644827,1.5732084255534695,4.291354440927265,2.2583563894190064,4.922663941739568,0.6789604285536943,1.780742765513793,1.9973481676400828,4.622615394850625,0.5342500101311842,0.7230605605745244,4.928239989387534,4.907114936727165,3.992036471573156,2.816577449181328,4.014138819811438,3.058385535117867,3.2783459544415736,4.654417291429247,0.5562866990686921,3.707476212198494,3.3864360116943946,1.5920673402206331,1.3066716093795072,1.1484876165419522,3.257793125036664,1.1177575174801146,1.3465926309853793,4.921617396694843,4.877276216818707,3.6284121659361865,0.00022517240727659704,3.7696354122502687,2.498600769093333,1.357266350718861,2.965322860746611,0.05990805926497145,4.016457939825811,1.9116619786951627,2.6247803150825533,1.5698134031033917,4.1902641762069255,3.5837074983853023,2.019019157316577,1.4299411170932386,4.617735241072217,2.841649890063911,3.3991160502297078,2.343155074042441,4.777203841549119,3.3454782090009583,2.0651635897820775,1.8510164301933874,0.7247569905276285,1.6171303451381747,3.477970162764956,0.4199789937128995,0.9722480841447267,3.71697854293222,4.886055667001682,0.9332849619785533,2.0308269273168102,4.781776404101335,0.18229111440563717,0.01405119697752033,3.2293113392511064,4.918785382391748,3.958081919567417,3.4704562751231673,1.1898512914194548,4.969050081205463,0.6971758092625702,3.2076662531185707,2.6557950987213905,3.0034591777150856,2.748373694191817,2.4362727430120112,0.05910842337363498,2.2524436045069995,0.7906373884955631,0.8193147526013622,4.3017036776411715,4.263615909553705,2.209398967488474,1.856970691467219,3.537920913022865,4.8601158701769664,0.014274123343714917,0.174389851081872,0.45486403565427436,3.8109378901097655,0.4078491127049788,1.885265998968536,4.053280422067665,1.3212836865230693,1.6452148514719944,0.7216969193493328,0.8355085939108953,0.4931242928386126,1.1634331601429893,1.4709141537709391,2.5317677171447173,2.044885760093006,1.825798824703414,4.870067954096643,1.3812952509100118,1.7596894637861005,1.8334401508101006,2.847390432203931,1.5203485793867677,3.1615330697573185,3.2900414909884432,2.740233529457493,4.076672835741869,3.628056946551829,1.8869303566592266,4.684372579170098,1.6526419788310187,3.8441784374590915,2.1762627143716715,1.9424672305201118,3.914818656639137,0.5468226782391494,3.1717948885296945,3.5022555440280523,0.6239912674913861,4.327325123829463,3.485453232279788,4.234098495124861,3.8371420069479054,3.6809528172117334,1.1525167376642764,2.78034690889728,1.10416857448283,1.5142206458741625,1.7934044207913968,3.664225788646549,1.421945094583218,0.8399834030325259,0.8009876313840003,3.5107825048654098,0.5007047426327405,4.292021911246795,1.0951489070508003,0.786031341251302,2.357763556444329,3.643717389397044,2.234005800324387,1.726611137240831,1.8741261493188999,2.6873951033343446,3.4360463135795505,4.22015419557288,4.221875820317892,2.08454153301457,1.0691672052648837,4.9303813259513385,0.2921870581987607,3.7835023572056103,0.9727551220933606,0.21510862097478545,1.9357023297635778,0.7341381011089498,0.1818690337781914,0.5795735190494067,4.390273936297872,0.9118696323096975,4.977794981576157,3.8882495567305906,3.306940282542803,0.3854589169557654,3.526226081985965,1.8765428534415929,4.524492339490954,0.14815434158718888,4.567339139241563,3.279639832340091,1.0022452000539062,2.2717829973549817,2.3978448618472203,3.6809504612079555,0.9689557622960177,2.7776080212900633,4.58394763927688,1.359260977492902,2.995782601534427,4.0763895627266855,0.3302148298629759,4.200022443362792,4.221485722535805,0.0694821198131812,3.9979774515093656,2.176678537684383,3.2986116559253444,1.3887193032700906,2.533341470260347,1.3277883823828185,2.187595813149933,1.5464462589134442,4.554512762039148,1.68798439943585,4.3222959559655925,0.8789231249490703,4.09723635293893,3.775469643124781,3.1482717524165658,0.9227414723828409,3.9313367465784554,1.7633770521737846,3.2116410415455943,0.8574915044232811,2.245730574662963,1.898739886801425,4.687051462596209,0.006179109338562139,1.6327517983821727,1.6869758977911098,4.090890038738767,1.8634985747512511,2.8239473630123655,3.308190557493136,4.923233772791059,1.6548073420762976,3.4958198797763593,3.8041127953946976,0.5742770692523247,1.5981569209004898,4.91753144557045,3.8834526194134398,4.742245432930768,4.133932772304304,4.2667517740408725,1.7304267250274563,3.726917158253374,4.622521605470869,2.1346246376108424,0.19109231432872908,2.1376720176120125,4.564623734345,1.7049778898818135,4.7849748051908865,2.2875872374086823,4.724303169320444,3.86456301763479,4.941256175199829,1.2278748063319112,3.2191218569932554,2.391700068223014,0.020308101587706018,0.9077176378777807,1.963409351706631,4.769378228790959,4.51532681090298,2.794000800372695,1.30676694224785,4.999471841488033,4.0395678685348155,0.26575768501809094,1.670016584563352,3.706242580902633,2.7839503466588225,1.0165588498114086,2.63437201148756,4.84453672570421,3.8878540518225266,4.704129072235121,2.2246335167004103,2.8122115324280794,4.043204088551615,2.321825918276926,2.6829388356202055,2.425332587791079,3.9891676841675805,4.571148767149161,1.409476612578583,4.6487398469420445,2.1686867171390114,1.9434127727713113,4.803588494546943,4.482762474063428,1.271585143498497,2.41845556637875,2.712328654848384,1.74996345799459,4.191832107560978,2.268262636236016,1.815684820732656,4.406783314397379,0.6667030957681985,4.627566167169677,3.5543915231681824,1.4947949817190553,3.6473739717361098,2.5541037329339744,1.4008812572369878,0.852407856344708,3.2190414781965684,3.1525660947165846,4.982842132306418,3.3262151845361054,1.058222563150002,2.3501723357994098,3.6391291275945914,4.746231875813461,4.857039083425016,0.06912361036232717,1.393653612030613,2.6438653768210885,1.7252883043131118,3.5044352877315132,0.28418244057256237,1.4052512392262118,0.7250888127358568,3.3587923563277053,0.5955394526525026,0.9417682817246398,3.775860993968273,0.1904195332146652,2.4725838324546845,3.2111595156842676,2.227530533673441,0.35398133001860344,0.39191700751194936,4.575430694159081,4.263790507946298,4.028643048177257,3.001668045017485,1.882626748103915,0.42661566926768146,0.8176437597575503,0.7066592047099118,3.3939323152650536,0.36245657122666475,2.7279408554546802,1.446510647644642,3.8156691645106946,0.8016117704689907,3.7090174485396155,1.9653991452049124,4.256186477778422,2.4692712290983154,1.106015277473562,1.3296506544084663,4.890043688571806,2.06794645041098,3.056375350248115,0.8571107794857036,2.2070941284101053,1.0929415886069571,0.5624478052354354,3.5201597122502837,1.6184295384599312,2.7405762354976595,2.6710125050725617,3.60207252374975,0.5349862618466628,4.084820486672336,0.43556744380281676,0.8325199354295276,3.1380998977646346,1.226029749737082,2.2224099146223217,1.029775608196063,1.3723615288232704,1.41354123511792,3.586454511125309,3.1905065317073724,2.534373141156281,4.662313372534816,0.9917070107211368,1.0852884906627813,2.199859666963593,2.374915504588835,2.950823876160448,2.9789447528657087,2.005521533557145,2.6935834781367562,4.043982423871367,3.908931474696372,1.257430505277417,0.8250882328982478,4.266400274129261,4.893080881189508,0.853769991173774,0.08495159999289403,2.619118770664619,0.011997257868002764,0.6348441356239931,3.6747805604579877,3.6414106836140236,0.575290682405909,2.525364488409554,3.8059440535002818,2.8929111166862045,1.5820071297614746,3.9281599305044668,1.2295908717628667,3.166614024432061,2.4592589064691337,2.8031817594194752,1.6147010159838804,4.081792963508734,3.4616609262128994,2.79634911136439,3.6644494412111173,0.5112260081312447,4.212762681168837,4.716569789799218,3.2116119896261344,4.726256969179056,4.230664577590129,2.2852611085566368,0.1885334628804436,3.5235067009118204,3.8689162685714686,2.4014820922683953,3.0796502403343484,4.037043644489094,2.5954779626889266,0.6771363918140716,4.873462423994026,0.3265512287231509,0.8985088082030179,2.5120563979233435,1.275471708707867,1.3294066844082009,2.230076789473725,0.4334407253961059,1.8955281556891401,0.4921460634871788,4.174947696718392,2.7665298273247574,2.540575691822334,0.18851524454354562,0.03686351481290706,3.4879809419042163,2.688730588908861,1.4722533412232508,0.4111706876744947,2.236828666790336,0.3380594823309646,3.928027133431087,3.309852849392534,0.308188098794977,2.773914578865695,1.1767291410709413,2.6527926864554097,1.9948851778508936,2.538779669922885,1.0953419909994144,4.197225818002148,4.085148712599511,3.1199206963776414,1.881291421950123,3.3352584249674133,4.975596821530277,3.8321676558405504,0.4772452022059437,0.8738057330369953,1.069057970536097,2.70160653274228,3.1058540556597602,3.366589616713819,1.8206822829905311,4.090402273741418,4.379636266339561,1.0649652174005042,2.057687451083141,2.106047291851163,2.0341544000710865,3.566516356980097,0.8939656978756694,1.790108170903476,3.543999324889391,3.609859604629657,1.031656170146199,1.2922726008586871,1.3892731547217674,3.715813246575074,3.172137867098326,4.569853517725219,0.8730276572540419,4.309682740450333,3.42186927611287,2.351419101268962,0.15910726126971309,4.917670157924397,3.278378241865415,1.3724672712936126,2.405060097077535,3.8058602233166816,4.410859160399623,4.446474740816239,1.3340670893287232,3.2863900077038166,2.5143511048406797,2.9312438207396108,3.5179475584178954,3.0566637679345945,0.6791536879590854,1.9928384386889997,4.468933665282632,3.2383319978054805,2.0113987183019457,3.7314889997397427,2.752273566680603,4.038517455998378,4.507297840737687,2.0434338061288795,0.9919178506227855,1.7976966980007647,1.7206724124298312,1.5542134742336222,0.8460519999936611,4.69277151655894,2.6554233400820335,3.500162096923548,1.4151523186291903,1.5291428462111833,2.968028814801922,0.4886948451887385,0.03285254360945955,4.8819060154016105,3.4732127176401506,3.8733524600629012,0.6575814127190105,3.3068970540021105,1.5604797561669714,4.8151389903836055,3.465833933025797,2.2580485469605183,0.36426299460523004,4.303076123567183,4.21948939511705,4.452783692416298,4.138328789790794,4.993661210611955,3.9344758794434034,1.807489139908136,4.870603835501503,4.106109097114486,2.8676088066773797,4.768064891610361,4.72313683735033,0.7940089654777038,1.2147585093145086,0.9517191287982196,4.941670595951782,0.5828595346247867,2.21115268930307,1.6885951628409135,2.6256308183120005,0.2181133231444754,3.2881324999712835,4.273050415565955,3.9978215745742918,0.9011044729106998,0.8242866752635114,4.175812114907175,4.569947787322157,4.298902512956312,1.231174329457897,3.488083739415908,2.011902120975202,4.292551242660853,4.49387798954349,2.739398954175126,0.6693592981407881,0.6454091399534689,2.2213833948524,0.40037201505664255,1.9379808593846282,2.3128395300104474,0.20168727066143477,1.6767272824295165,2.1525869936733444,4.928432347240724,2.3713279878608375,4.571276633505078,0.5819435112453042,0.9340135136781813,1.6593912914243492,3.570744723707179,0.8106751689315594,0.7527718289237595,3.127829910629447,3.1556633401257694,3.9864341076874785,3.328968515961316,2.07890346291816,2.5355754928381105,0.45099416718142327,0.7174794271930163,0.7946495388474162,1.5450107140936942,1.1793202454098317,2.5086453537414743,2.0023131924912727,4.859125194565859,0.8545336175641904,2.017913363356263,2.690764684941512,4.112895531449374,0.6431790701727469,3.6778814779111837,0.8295491092310758,1.2434669091111061,2.2449510602220624,1.356362485522028,1.1179866136360828,0.29734141122415125,3.9731764990193916,0.5509742392621053,1.5333513236760887,1.5891038139698876,2.3997972579975713,1.029275369035032,4.240809904736431,4.729426405250944,0.35960163097188635,1.3539089904487445,0.8776023200365701,0.37500342271346243,1.4233245023262198,3.2641411934906426,1.7592253204554764,4.231926535640382,0.8102977630850372,0.8026057999783287,0.4671290947084772,1.0843407953996664,4.405570393977737,0.156518302365366,1.046051982125219,0.7381558727953896,3.919291572483891,2.004211561670235,1.814880865727807,4.010977048100867,3.9384684769310585,0.2858743603011027,0.7632327848719234,4.30847929551534,0.3255907594267493,2.731439785385751,2.343672992645484,3.4475106294331246,2.7368268783340346,2.2728311670018266,4.026832522877951,1.291276813625798,4.79222072953484,2.1435620358967555,3.252787820587033,0.8458668037712691,4.517587159165278,0.6148621449326341,0.9701383468398816,4.153575311849567,2.244860040361225,3.755343837942058,4.735447870546981,2.2944194116214356,2.851662604015255,1.810212626232539,3.826087211263233,4.054441869076049,0.41220763711477093,4.1993880242931425,2.721895169474945,3.086875355353156],"expected":[-220.35360120845075,-2.9449129916598147,-23.077273277438255,-4.80074354523644,-117.35272236356933,-6.680126673210735,-5.882914906944075,-6.8009917608788975,-6.253548700999547,-5.9373578087210825,-8.275646661058214,-11.369335455194555,-5.736741473356662,-65.07034196758615,-8.007276683835563,-1.8799770413057142,-14.63600326303669,-6.487323137582826,-5.477135623396244,-4.487929876000017,-12.423836715913843,-3.3875234910721517,-43.772094436762565,-11.825489333290273,-10.635259136984756,-10.773291423585873,-6.782057055148923,-5.447504670169634,-87.83120220045159,-8.034217115249673,-7.768761826879638,-13.015309431891943,-4.097280653692821,-4.2089643435246495,-9.489133738729247,-10.97674921040297,-147.69902051034623,-3.0481690242967514,-12.21688153364076,-22.432572148296956,-8.899056551891887,-9.867629330109278,-2.3393095860276847,-0.9818330158093611,-5.716433795965397,-35.27576531311163,-15.9796747027859,-5.90610560033349,-31.197335076892344,-5.873752663464454,-3.5153643787132514,-1.6574209598095466,-11.516117045818387,-6.2180007182037444,-142.33606313909522,-7.417788399592231,-19.60381023323902,-5.784661803357934,-5.542914860208516,-6.139257029925563,-5.352350788236629,-9.101093303192856,-17.551134143639732,-6.276047953448637,-21.8111087584935,-4.115765519217779,-12.363274963516243,-13.012993367277813,-43.13500475524236,-6.052008371106344,-7.046269201945889,-8.233647464415055,-5.495757239772686,-7.710402559718732,-27.467322998867864,-35.16544688130737,-4.250571004088304,-555.5423787283182,-2.450728109485469,-6.0667471249349045,-10.144590239577905,-470.026391470601,-49.023644076921805,-7.029973046620956,-4.560541324578545,-7.058332622731253,-42.70387673948429,-7.377289267709715,-46.672579024389684,-3.762294273385963,-5.49998640896721,-892.1608688012964,-7.330159982728493,-7.776254763208788,-179482.15916118235,-3.7442834270860628,-10.68383049816447,-7.131576081039011,-25.40671169689721,-8.346739799698854,-5.612673389252327,-7.270197509256244,-178.13387141741146,-2.8721826769849685,-2.61489209207652,-15.594406491718033,-7.1230802698184466,-103.80494906655069,-7.801457457144221,-3.3698557651161742,-7.979684150472655,-7.559341790713396,-4.96234385423045,-8.48380176288272,-7.8307082299458575,-7.785179160728296,-29.607905331139897,-52.95715865491281,-59.36070082058197,-6.730797596441329,-6.765994889023845,-5.902977498633099,-5.484496784748795,-303.4782609229828,-27.60339680878597,-6.749363804417136,-31.958539055784357,-7.7382742253179435,-23.443661912595122,-8.842570684258211,-6.959629847042416,-5066.712434328273,-7.511784015695554,-10.6229056802517,-7.165348246067582,-9.588113316821488,-6.797796335621992,-152.36303536387678,-9.067291321280829,-6.421244970728985,-1915.8366483771936,-10.782941481840101,-3.7922950692084205,-1.9781730725433566,-5.997398246319568,-5.149931698448195,-9.31082947333445,-8.75691333316325,-10.22895850253552,-10.820434094103891,-4.163599065237247,-2.3452084920473517,-2.001600176955504,-8.931483633786234,-2.847712936027933,-3.093935938698029,-5.392008622310485,-10.703938862426176,-6.624696746894184,-10.45312510625692,-14.083675525492525,-4.901224104112275,-9.015485502692107,-9.268212703611923,-48.95623317627812,-5.7611299996566805,-7.3931026712780055,-26.038887094479357,-9584.981752614318,-5.440723181567323,-6.180159006749994,-23.072317102178086,-7.115178265787071,-12.443526435482951,-6.881309782538601,-9.011856087947612,-50.8613094087656,-5.5641548655476,-4.567199187643302,-5.7220200529881735,-72.67826891223818,-902.0317185304731,-25.64195703201088,-8.123313954464972,-674.4790439801301,-23.682789880310246,-11.380858315726577,-26.675288796185708,-1.5602595480283663,-3318.877209216829,-13.119439453801231,-19.726369106457216,-3.1663616641007337,-289.67012815142135,-9.677954380276912,-6.267778668335947,-6.842243158388632,-6.607012929738586,-5.809815655196316,-35.01900165301063,-48939.41065112311,-7.015454413730673,-6.297859021330648,-5.801047881654405,-5.764309831959817,-10147.743789024711,-147.43289291746424,-7.840073628306836,-15.532343685791002,-4.215573691439015,-7.553478185515254,-46.44020044733304,-10.286436728470111,-3.8269225210237545,-4.668044395424815,-7.161202445257393,-2.9794632077127177,-3.3089323416974983,-1521.9357644487757,-8.66068549738717,-14.101111873092528,-4.470654351527435,-27.61468195067182,-73.28247524855372,-231.65981043416787,-5.594334280021828,-1083.1343136316043,-48.17737040578063,-98.29956821843469,-2.618441027698947,-5.744234378385849,-6.718762393709639,-2.3050186155369805,-8.941685710514266,-11.182519725469227,-3.142553307651547,-5.915852492653846,-9.064318326279293,-6.509187882578834,-2.0977332750041686,-29.672635398562594,-5.903439396395926,-20.07066180541297,-3.7671529418058527,-6.525205563889305,-4.937252530672053,-8.069587961664904,-1992.4120262144797,-7.074024527167121,-27.262460353079458,-18.989116968575654,-6.97179511141497,-4.98820747946825,-9.018724490902828,-5.432052520489505,-3.961206483829659,-4.442716335836675,-5.431426223324347,-17.34155803275753,-28.54350579506533,-8.521683491221786,-3.1175753965682214,-16.295869505461727,-6.672314196946266,-41.14590314229452,-6.750157126910878,-8.944870418837366,-2050.824894964638,-279.05741400590654,-30.493505103475567,-53.52844417658883,-11.518139843484532,0.7548239817111768,-6.116236004356071,-11.843500862038253,-7.897264945431118,-36.24285911585322,-5.703398111580961,-31.320936333034016,-5.51876656080435,-7.047131947921153,-31.145620876303404,-5.745740540819372,-1524.757283531779,-8.432049397060332,-11.203726845488978,-9.107569260680297,-4.063454032554174,-5.397507842586151,-18.221013643146012,-115.91562136989091,-94.26884994395446,-48.836744859642,-3.042060425125241,-3.9727191792735406,-15.643280876919551,-5.496142078640716,-20.502809842264746,-5.488995145739457,-17.318235514241387,-12.655315101875651,-9.27003195781888,-6.393796061843461,-7.039008313808343,-6.959423246048801,-416018.0525782883,-14.882185566843349,-7.56898966383091,-39776.25070843864,-27.183398729967248,-11.204032634900743,-35.28919218109663,-25.36314719939082,-9.125046676493254,-1447.1206308648902,-43.995394422809994,-5.778473202132163,-7.711283661399528,-22.897924570795624,-6.439194955763329,-7.828562736890101,-4.48646194420299,-2.1773378231933647,-6.404367344776949,-6.2580571554298485,-15.37943388172493,-3.254748701121763,-10.962889438524805,-5.599129587430335,-5.689818836662829,-23.046825444136314,-3.4886560757636675,-15.725088388708702,-2.440063978410468,-9.81104450907154,-26.457813438088213,-6.130815482014565,-5.283085377199393,-125.55868746025627,-23.217391171895233,-7.943936637088527,-2.8374284440772377,-5.483178253480729,-3.4467814917860533,-8.644835025333197,-7.3572264382935115,-4.572227265950582,-2.187389197333414,-224.57753729005663,-6.352522792660818,-9.783235291910048,-10.372177860926213,-44.140703206245945,-16.042275351865932,-9.4724667472262,-5.870109017092215,-20.981539749857845,-6.175581252976082,-6.022293888109702,-9.923462275107278,-1.2005485148305523e9,-5.368373101747716,-5.526311055746508,-18.409273247241416,-4.583905335588739,-13009.80362107458,-4.719283621060738,-12.566505518642042,-7.538569525249071,-10.56160315412924,-7.044260346477006,-9.765751495843563,-7.813339621739325,-17.8139181281815,-6.697492244496584,-3.5674163894197988,-5.8060466212009985,-12.53368249442238,-6.643024832995833,-3.2261945552975475,-3.962070631542564,-5.079795057291198,-26.23807696423623,-15.222763064513291,-4.409642206753986,-190.36636442171437,-32.895568708677956,-5.438607717251051,-6.514418402425797,-69.37245339779577,-3.985259595050696,-6.217493342823461,-292.83662619388264,-227353.5992231948,-6.145050329781853,-5.415850227565183,-9.147546523235613,-5.913884521284553,-11.29132096713825,-5.508548903584524,-91.94764987054444,-5.515169213547152,-11.63201932273575,-8.297021575329346,-5.977115086564523,-3.039112510997223,-16728.95964664786,-4.209584324423807,-8.153004370422401,-29.686001870517504,-6.121773897143914,-5.906206129037092,-2.6832798614958504,-0.5377489031658897,-5.031552648926027,-2.371756366906723,-256991.19030500247,-819.5653215530332,-60.565882628447355,-0.3515844148626277,-404.47048484214133,-6.102865515434592,-6.144582875555543,-33.30631748999585,-4.049809257421064,-5.872822602037181,-59.898379719881326,-332.7404894167788,-59.26405839908081,-10.448585676009863,-7.856560729111781,-16.021530206192843,-5.277178351918032,-2.263723503430791,-13.273036844878627,-4.113353085044633,-19.795066485763346,-5.714142302084403,-5.246084385800895,-6.838165488738701,-10.591956853440063,-6.0911301593651554,-5.598058751442977,-5.157245116724239,-6.488689427948801,-5.759178254710056,-26.98242952864591,-4.333870354920837,-12.333823435621003,-20.89298757089538,-3.7043358461283273,-109.03702736013126,-8.423943463497945,-11.103235726739472,-129.92106089096703,-3.2655295182197834,-10.897571929695339,-3.352848584210054,-5.991263024188663,-8.627072362218563,-55.567097601204935,-7.672227047175392,-7.597440962939,-12.02624261962034,-6.639176319941942,-5.275763486706552,-19.696099579045697,-11.853547900673698,-83.9538671866412,-7.737266091439992,-149.240513196024,-4.264517179247459,-35.3594260285165,-36.44604323197232,-13.41431127625988,-9.289466639613053,-5.831711913248677,-10.673418612450387,-1.5268822447548633,-10.577327885628382,-7.199133469806688,-6.341828826154896,-4.972161269846509,-3.531177060626029,-16.904897131502118,-4.6945267490365605,-825.6385382516788,-5.837358061173603,-57.356153721044564,-901.7764678845949,-10.56018209835462,-116.61011072286347,-322.93087037508536,-72.82773240502081,-7.5261947890842915,-28.571063512103752,-4.286767567192471,1.3041165728660666,-5.701895811541842,-40.88243867850523,-4.269783652095123,-9.787207614204084,-5.6316664053290015,-790.436213529566,-4.48358641451218,-9.905363393301736,-45.945780259882525,-5.865035609043587,-12.062681510740303,-5.929656820435229,-52.03777281966785,-8.933221307580821,-5.493952249250539,-8.173371022687967,-4.400367862884835,-4.578322844975596,-657.9281074753858,-7.462714567278421,-5.763949435946156,-1138.2642582050294,-4.807107506985165,-3.723485989268316,-4.017626156145968,-36.24168641482493,-3.1871797388154657,-21.203774458840343,-5.298080539469633,-17.558879126073347,-5.512596986331115,-12.246231993757355,-8.26232756426403,-83.50118030344656,-7.585052627021641,-7.188591229129933,-9.027096023597796,-76.82577161640246,-5.742296471799142,-6.866506913836281,-5.427115315342066,-48.93973429622657,-14.213939830975493,-6.655379719895558,-6.781606082854873,-1.87181421784497e6,-29.49416724124245,-21.89783311913269,-3.9971453454973966,-13.112934846146192,-11.857938717352567,-5.210069916740904,-8.194199072331552,-12.559723025597696,-4.0196157966331745,-5.816756305012591,-134.65077836927827,-5.491802273816557,-1.924522278075254,-7.26375300569088,-3.4621265170760345,-7.120744605199726,-5.450077474752044,-20.621382872984483,-8.030873971550697,-4.074737912363947,-7.528524829711926,-967.6024122696394,-7.768125070322631,-6.930994664038018,-9.706531136694661,-7.278546423462426,-7.861101572379359,-4.5251966475225585,-8.078426826095614,-6.280231960687033,-48.775546276475964,-6.145395461031123,-17.605079877386416,-33773.37447267385,-13.645683667443139,-21.333312042759186,-6.722864438487825,-6.948225435519468,-5.2547676442834685,-19.61952333025102,-4.874474090464341,-8.802156273132299,-297.32394158957067,-3.3956012165736875,-5.555318404532481,-12.580239052116069,-26.013907327191323,-7.911549945163952,-4.9516530197510455,-6.406777453510003,-5.227449879729633,-14.881432380384316,-7.554343297204442,-5.998379788348677,-13.063528345968589,-5.1385510557008836,-8.515614114615884,-7.667518992062032,-5.25627610457685,-27.571398649939216,-7.886981223773567,-5.065058989651363,-20.163363731402004,-7.153294789327994,-5.053222947000048,-7.7866401897464375,-5.583275380576016,-4.988330572416245,-12.77983370865416,2.4275779765648964,-5.332307619878192,-19.385008136949775,-3.1789162542904004,-78.24273491098336,-3.8443684511809435,-5.250441063518021,-18.383010771954023,-7.517066182956304,-12.594624735748168,-30.89123195786014,-27.19729222727098,-5.032268201709799,-7.775967239421842,-4.765607110551823,-2.675566225780875,-16.369364820150498,-6.058151668941017,-1.392063398045236,-5.768550692317817,-5.551385667235167,-11244.38406858177,-9.064401838458945,-4.8435400692586645,-11.325121722247943,-7.083526632985439,-19.735092918111466,-29.10978188905983,-23.47484618230338,-7.381317263283407,-148.26337389310092,-25.78678670428086,-5.270468733486592,-556.8283124829295,-5.53887782794877,-5.188928570537727,-3.085593964214839,1.2644435145261885,-152.68747488145914,-6.7373715126792835,-8.874800844765225,-5.519297509710569,3.9153047533863363,-12.435151892299537,-52.81646007189322,-17.74759871320567,-128.4026892922577,-4.288648045663457,-279.783557353647,-4.488003523071038,-14.62519611241188,-6.697163737202796,-29.07753222279841,0.9712365956376527,-10.211928958942798,-5.8570071275936915,-3.3907091785312087,-7.039808374029711,-30.872813608012343,-4.3816576602839925,-6.1430352450595445,-10.341440326409135,-42.38755344084083,-8.775184981345078,-12.496669856048335,-219.80045394030333,-5.582417833975734,-19.466425874865617,-12.544501900299846,-2.429258391922381,-5.94678443062947,-55.38836002314193,-7.871107578868788,-20.476505203508626,-16.780549632735962,-9.563178226617714,-20.697377309731987,-11.643337868709782,-54.435247852735024,-17.79068256656994,-33.48306645078945,1.5266931093526286,-11.120667669734969,-8.477031408518164,-5.987933577202514,-59.000305584921676,-53.971691453967885,-7.725031638170554,-11.579153359039276,-7.6533451963016725,-7.408984019841896,-5.913131647647132,-5.743009919719328,-6.213507902618238,-2.9659799590110807,-10.249992081868212,-99.27441801216737,-6.3084282817106,-7.360376999869393,-21.572592210579632,-3413.1959700533716,-1.643902601128293,-136986.92801846433,-85.54862585634075,-5.093194972189831,-7.908234578649691,-51.661457778498985,-3.829279332455746,-7.869414169446535,-5.602030455957078,-8.809707641581316,-7.902831113604703,-10.962066289362731,-8.137870757669862,-3.4158948494931587,-8.368568040739818,-7.395365485982532,-3.264607233262142,-6.970989579983812,-11.300525277328235,-6.468481346457373,-63.04815251735033,-4.682333462412331,-7.556936118944775,-5.218953340634291,-6.398171601148308,-6.0799926931011825,-13.067857729058389,-1737.2765198862928,-6.782890778739878,-6.337775062043239,-13.488043557263968,-4.1408371296522315,-5.300200417368223,-5.156678916969835,-58.68195076689633,1.114669070481015,-174.48615279125542,-40.21626024035185,-13.92453908268409,-24.98563238347245,-8.019185268086819,-13.404318407459284,-29.954037455917113,-26.91060942762326,-5.706801696831279,-8.504756981831697,-7.029547170519388,-6.6113542999476795,-195.13645832544904,-48691.588052640305,-9.750344983506961,-6.32177885899878,-18.254332427756825,-15.245338700779897,-7.805006527890075,-157.76361319059447,-5.328671263138171,-1.9845648992720608,-137.5630041179838,-11.47095601769374,-11.497379856361258,-9.070928429453145,-13.65057837793933,-12.299934772491307,-27.711351495635277,-6.62807958695992,-4.553189028034863,-6.488607406536161,-16.630255291986394,-7.860013328815116,-4.33511067633885,-4.699100053237119,-55.96335833243865,-56.86394933108651,-10.902671825496942,-4.51015012803183,-6.12028948711016,-10.475391177112218,-7.979199366574443,-4.793115642391058,-5.281928030215955,-6.43565119860912,-16.19243164578293,-17.321635684556437,-7.1674178544278435,-10.922786887165831,-91.77941306425316,-27.81793725034686,-6.416234761556487,-7.267185800242827,-36.92712043189536,-38.80462693364101,-10.28805663839169,-6.765911954517902,-9.293954207354878,-4.056041715669879,-29.398681305229697,-5.774005106297189,-8.851199424252684,-15.272598601127934,-2709.25059023561,-5.1757660281200515,-8.580701625175081,-42.027840252957624,-17.36858541564534,-1.9771677899098101,-5.592061826708373,-8.684668356483577,-42.97926489535446,-10.575151704524213,-14.959147059722868,-8.094499662527724,-2.089351963545485,-1.3196782795887652,-166.66331341946662,-3.5977619007417525,-7.069887038287947,-6.156784425139557,1.4704068414945717,-6.671155112515567,-7.053366072410596,-5.138883505444535,-6.841400875152307,-10.582509949635247,-40.094180205261324,-18.929179399377027,-8.00421291199324,-31.713146195958483,-11.37176359824392,-4.68816617327935,-7.660542391495012,-6.824759228506547,-9.199689264304304,-12.906263264549475,-13.423275662741949,-10.918160451297418,-68287.17551275088,-7.89480629123412,-8.582086598806683,-4.966921672018534,-157.7025556404593,-8.860396048463173,-24.517305299348575,-8.911133412194165,-9.297011142292979,-7.8722429071375695,-465.4711286088342,-4.504067458043451,-5.444698240193265,-6.595145804608844,-4.4921437064716585,-5.478508813211299,-5.4693153401076575,-8.815594845310095,-5.230636647606786,-5.802725761594503,-12.517104574952603,-6.787260449257438,-4.717225296232771,-46.59665505847883,-12.95672857571346,-18.51760602848423,-4.186756577299482,-229.07195037531287,-11.264054285570968,-13.604039382048876,-5.908829786199672,-494.3186629956695,-3.3415328249478575,-3.997090279370309,-6.631656881402385,-8.876630323159583,-14.18471669876932,-7.458968462244339,-6.294180010202495,-6.327137528258369,-30.93724577480376,-4.859755352968326,-14.133649558366418,-2.88156264836853,-5.847038435437469,-7.663589358224505,-54.81078287203637,-46.92875449465667,-4.154361165180388,-246.4201546405503,-11.988616702916941,-3.555400233005745,-877.815322029824,-12.501923082660053,-15.874643492105626,-3.344486227785619,-2.931506588769952,-3.4381315734659856,-168.43982164258728,-38.084940868168836,-11.494614527309917,-7.991553069861696,-27.069782467835378,-126.70027215403007,-6.101252248919721,-2.0987160129698137,-6.212142796415795,-4.107918532597041,-14.853423536765824,-5.04864505587612,-28.769163932434424,-110.304647675857,-2.3381529757479256,0.1771554957191126,-29.006199100443585,-9.044581393997218,-3.076896853838897,-5.942241932976712,-10.283810801699325,-22.15302232790407,-15.141369602056628,-6.473350648602255,-60.10366820753956,-7.033712213283303,-75.32093543878162,-8.302477895350844,-10.68241735008594,-17.22927001969498,-13.09035116044695,-582.9890724814286,-5.475890914828788,-66.84896571385818,-23.80863315279977,-3.901548901333862,-7.1883141977914615,-24.19805702179466,-5.5252165545534435,-5.19535820808274,-459.33832193360377,-10.507203157150455,-82.6835425889756,-86.48825944042956,-13.436025633306102,-5.453904214873676,-6.379723277958897,-6.6416970216334725,-35.81084733024927,-74.94865803670776,-6.385182488238302,-48.24509307336743,-3.2420498776841895,-287.60729663227096,-57.470416628882894,-65.17427490983863,-5.501584791153286,-16.526369196490567,-9.128464347952702,-8.033329358183135,-6.071471385022061,-481.5862026611741,-36.3542552847615,-5.133473588084337,-551.7896550575484,-11.130981777050783,-11.720962472029582,-6.591743238603797,-7.833178494439371,-12.448605486526235,-5.8490463779367285,-23.701214679889656,-6.054366040690573,-8.064248396389596,-6.146604770208854,-98.14306721003005,-5.514254045892205,-43.826851979837166,-73.40962667913301,-3.2696598086348163,-9.18594984020131,-8.109238735741268,-8.004528511112943,-8.700444997955742,-12.057408795989778,-11.978077759460543,-7.4911077655985325,-5.499135990648234,-264.30376223993494,-8.92258364501625,-8.605190871356431,-8.760738160165774],"x":[10.94717000363592,2.067422658394027,7.63292494028502,7.7210734728603825,19.12351604616862,14.321921196538089,15.02372742341683,15.223947547828258,10.626712460673442,5.185925620320839,6.55622094287621,13.455020526239894,4.708629492012322,8.987105092932977,16.683307317467673,0.27022894757345206,13.529808494328446,3.1343928122614395,8.837389626810923,7.684866941716759,9.929136177180563,2.8793993075585433,0.9633604504145543,4.103612949867093,16.810072009119676,2.722142302234225,18.478049808418334,14.82855136968321,4.429925689011727,18.88339685690852,5.590366142836332,14.402103179885536,5.952539195366668,5.014138282541221,5.4527574714021165,1.674301663328417,2.971798320095118,2.0206624724527567,11.840782574967248,3.2190565399910165,17.95546394746107,6.801544829827413,0.8725041309028247,0.21473049242030307,13.781194827176947,5.625428128153009,12.459491463965815,7.44005181088554,11.437143864524035,14.341702444918699,1.3665003354303895,0.4755458552441194,4.283306950918329,16.121976979809737,9.72144324713251,7.415541775362984,10.345031180581422,14.668248303194904,5.707484365086426,15.584924249663125,1.7099317033294525,6.658895249111416,12.800228581758049,3.992183240455698,10.824954370683875,6.906498430208963,14.403177680749263,14.768526872133938,14.50893746030195,6.371700565972032,6.999209463571359,18.22113457093414,13.142563630740591,3.604019737917623,10.391237996345133,9.966258206012748,3.3425881575753014,6.792822133049268,0.9156343300526615,17.287077553704407,14.98752284025501,15.883264746541252,16.070533437579474,13.406927742866127,3.826672712692054,9.620525323119487,10.6542027743565,13.729897154738362,18.949814965996893,1.6982164259258692,8.53289863997642,2.6136053365768985,4.2534035234198875,18.583476509146415,18.229011264372353,1.3046442102928557,14.46982013756676,12.904712720500093,19.834643852905742,14.92037462270632,10.288938721171462,13.743402047616925,8.990986145142505,1.6081797381905183,1.3579907360990928,19.23202079617232,19.73480551060097,18.256879800853216,3.6920737711582774,0.7428150665247468,9.454462487351872,8.990906577024877,5.487156341753234,7.073868449242253,10.201233465067418,16.09769429082563,14.716297527398027,1.9208010953383958,19.834925028041713,17.69058978137998,5.555054808273026,18.802300823046878,16.751755640916155,10.76471223646851,11.800161832929263,14.28057976444666,18.886655908854294,10.47682677471958,4.5095662071852605,16.405279849515924,8.728321422827232,4.663677899366188,17.92887116664291,12.859493129296528,19.071237023399323,4.774493577158658,12.912788560259116,14.68247567531872,3.301383675177889,1.6091760473761285,16.688132441008076,4.75202529315097,3.027344387729487,0.5548929519263179,5.604227640253088,12.343859422768553,14.710353900782591,19.9924719388545,16.4220601145524,1.2797993547629805,4.597345848450205,1.35275539722024,0.9235741085953819,19.10319063844262,2.2511822271233495,1.5616867353337582,3.47460944660976,5.284249911718617,11.949414664174117,13.36775830068146,4.7524145919388605,10.994498738186195,11.989042030480732,19.98742380034043,14.90664639742552,5.73999937881398,15.167231818180031,1.5380561880661903,9.243873376076941,14.614620586187655,15.153940404825011,11.262701106091967,19.086512044343216,11.66151145358099,2.2328095992623487,1.430930659909091,16.18535412652298,4.052018530525112,3.712995835375459,4.9937492973530695,2.1004749363835673,13.858575469608429,13.47248663660405,18.492940736163014,7.329852860531814,6.046729426581368,9.79743735620453,1.9915478395310204,0.49312758766109077,14.864838238683141,6.858895052924594,16.645324236702265,1.5508827666947322,4.520983725517742,18.842239114977453,11.429257648895724,12.99802368723396,8.579289810383885,17.995591874931897,8.78557616556838,17.420498812696273,4.73177524841407,6.651051490122759,10.236165073006088,0.9590953498119559,13.111671192482879,1.3954995427320416,11.25688417109334,16.002650349112464,3.1403528881386356,0.9767565261804068,4.861451273529074,16.577963248415518,4.1671790597812075,5.424135144539357,11.705870365481585,0.9887253708987265,0.7681693113433985,6.726802682089268,13.150661462795878,7.080754159680871,5.580701547349722,2.9693852700245094,3.5498253850345174,10.99084765196685,17.122278278869082,13.349870091514259,14.75745988848212,12.975250274210644,1.4754338502282183,6.814386066130704,8.881430900594696,1.476528968953339,16.492139805968087,9.531633365297157,2.56062165910234,18.700158320586286,14.407926037654754,19.51613839431242,0.48428021837909174,19.058685060633586,12.401043233875836,16.4956325747503,4.544858396673255,19.769435135021194,8.36832991621538,19.75354125650818,10.183647660348875,12.823236872341766,10.551650200671997,8.045899838785608,1.5466040417972238,7.26817689279422,13.712171199787008,3.947679089629057,2.1612976417798357,4.642049471137266,16.98325417404737,13.81302824343637,5.175100453968606,19.390076543754194,1.7873556685849046,19.79533515010879,14.363743054817641,10.041836774164036,18.552136699220792,6.25403354529344,11.80905882492167,10.16683110604179,8.410340918056187,1.6827713318697546,14.146969592183908,0.017418645383862064,0.7668158243825163,14.399098909414349,17.24682737383681,1.6049461757670258,16.193880575124034,12.636461383913268,15.570458879107271,10.860390116045098,4.37456670806895,16.829175528394472,18.922706700905962,17.526120452351005,15.707731023455267,7.815482454128753,2.551438583034944,9.798497514977518,19.499397587922694,9.372528327638857,12.101682157229735,11.140292788968281,3.0166041102556784,4.628641595324332,10.232405411941512,13.531054854981415,8.045930125962979,3.3342394605061765,8.04307993092153,2.3169859938455817,13.71146207380118,0.8413238225948483,17.38927002528741,6.618107380000904,6.961175914052342,12.214197260038905,2.663395987732873,18.354828271001402,6.787807462892466,4.901671148775728,10.028660378944089,4.3249953306620315,11.478838605481506,12.260313362122556,6.740284873001228,17.436296400445887,2.9787436539619527,15.402428545990144,9.013560855216095,3.6962240589036277,6.563533990977537,1.571469423363041,12.590028384320782,5.978464782216029,6.1085688964899765,1.232207721277896,18.974879389955657,4.23377447203515,11.4365558587992,18.41170173633865,1.2057665526289618,10.255971136827192,0.7438811310206539,8.508186528197541,8.547231995336197,19.414359463425,7.6444605182025205,2.191348624919751,1.9391396317285325,11.67668238438441,0.8592922568651629,16.966168710955074,3.3568041268545157,8.052866205248241,3.9845648686182855,7.750338304991593,0.7164310291914333,14.572252746205283,14.074036101090432,6.092500717325406,2.167895897037817,19.949660050682077,19.04483613125299,9.590449059953738,0.3505117938222746,2.478734582624482,19.680504838811554,10.436322037913435,19.505733756956513,12.509461414550366,13.099720596307893,17.872344257303663,9.297646002859686,9.724905936110972,3.156949198491139,0.8624865554743932,8.782479603404099,6.391534698306187,7.8322278959280345,7.263731360848409,11.708536676932276,6.328100551027593,10.770986747737785,9.88910727905802,2.992205641611063,18.10754809853949,9.74874158084372,6.851992166277596,1.4266782536514322,2.3060058481393675,4.430469644514674,12.573681315464844,15.620717978604244,7.601774075717822,14.171082045248182,18.38003340967422,8.936463631307046,13.750067629220673,4.822542268933847,4.9133900026594635,14.399477432840833,19.705268425148226,4.800759623358624,6.123331121885598,2.914751218935292,8.853100843193161,14.133483735413574,9.683887863319583,13.500237199169568,9.76384397753785,5.8516302414298815,17.80745258376917,19.331865237792137,6.747188741780801,2.680931811430929,12.097532174218198,7.246045176453415,10.418506584191576,5.622623939373237,19.407445969370155,17.015830107957676,1.4139115698771088,0.2781486665534949,8.321355708982878,0.866150348378576,19.73502217170718,16.788001076072504,1.9696766035478541,0.13488987715322143,18.999348463510678,3.5496987200248897,8.714448005397987,9.49768036270953,6.295483946956528,1.2663904141268167,18.98214845013416,16.753088636740188,16.648588004237837,12.085118538409816,5.528680399230685,13.687210919975481,7.388073637470316,0.2070347679521234,9.100739450365118,3.135813845645945,4.91379729581261,17.308862902532244,2.5017263322029626,5.6048363395578615,19.61464091917209,15.08217969712268,15.274896832081279,10.789004377670759,14.26086901307134,6.15874094656812,16.98251529722421,6.592785355272679,16.98414053469278,17.284362326385345,1.9331025666305912,14.979134598633316,13.735623318764203,14.331789562524865,13.887312166632256,1.5190292001153693,17.729602558815586,2.480672540700035,4.7332390311945005,13.165408183365601,7.257988218083229,13.508586396840814,19.016171615344476,19.121858135077105,12.801699895262807,11.313538083852134,7.7957416165571525,18.542441339240167,5.596410020588634,4.746001311102068,4.248338614292084,6.028793177202352,9.816755928883175,6.15758354989612,12.793190612380139,16.124488937667678,1.838672243855064,9.671493224518052,0.979981941131709,9.642793209294055,1.6895587551110935,5.315859574195421,3.598516009947348,3.149013130592886,9.12783819731121,5.4726141142921,9.260684088000325,14.197487589903876,15.80582941415306,1.0097430051961176,9.500865155432052,7.279997668651963,17.00389056505148,11.104325221921298,9.329843702383101,4.0530653480107,4.523295597325547,0.01618903009811934,1.6447294739473861,5.831708594330185,4.938052189594382,17.390150030742305,3.6123888898115064,3.033652202549364,6.084764348066076,14.474870034167925,5.353239984992184,7.169772865572326,10.807366531342648,9.89577295297238,15.068552276796723,8.0636760398516,15.418622684976174,17.114124530374276,5.069906029476483,6.490017341834631,19.96300513182757,13.612231604026096,7.2072171658009765,7.301871981562473,9.222067318301473,4.1363939472043,5.459208468595138,6.033979906712421,0.6557666461232659,1.94347521703786,15.528509878987716,8.449319173453954,13.968334483911807,7.343941661112239,10.309711057702176,5.02054551677332,14.166044538330102,11.61699264423461,18.73414640049909,5.032235968380641,6.362687187616705,14.446577661969782,7.480019330807344,0.5527617498414017,11.714412879419452,18.414459950587787,8.243940614194734,19.634670397432757,10.640320711965202,17.275891362219774,0.6667979134943725,10.158086661483763,7.514594304062832,7.967237913816385,16.724687677254934,18.162312386138773,1.7313725574357708,19.996817892688927,7.130380537121939,9.165756567302111,0.39046869877453094,5.221581312426378,2.346242167644248,16.234413346783697,2.5319953825397468,7.349848543821675,19.809098793147697,4.585681423785237,2.440285641729618,2.351810661916476,5.921952714939973,11.819751560166996,16.932011885741467,9.758963841665956,17.238152383183944,6.2026559184913355,11.488602378941524,3.58202892413781,11.116655715264411,12.114133481572914,13.117060687914716,18.93675507122864,9.125180939254705,6.296964266000797,10.58237217143442,13.594624734896481,15.529170341871428,19.94955699522479,8.750794791240924,11.84275139332112,12.018409075815839,0.6680836474047025,15.028469443427808,12.148341512391486,4.36121293936937,9.907771827616788,6.739418623062181,17.75096172407057,12.746631872519334,2.7540114861876663,13.88030687965811,16.91765543880557,13.133894172425308,11.3976768995879,11.824581753792494,18.01555104445706,11.70081864595991,4.922821387362513,15.389342985497812,7.730561232127506,10.460396861432454,16.3219982756744,2.3424104976144955,10.747220059671893,1.5903731722550862,5.643381320744787,10.823160010645449,0.00838117662365967,3.3395869330183414,11.388169746622125,2.0988773343700062,4.4738741670272075,3.730394609318477,14.324843878218685,19.15641483510225,15.30807020397717,16.571132155877613,19.836372833749863,0.049083675072938426,10.813274775038959,11.662243009406158,3.689572179807472,1.2711158390246702,10.907059030255395,2.9663547727613615,0.35002924618444897,14.161575525305574,16.95876187204762,6.514952219338426,0.36430410679164194,6.801511518965286,19.305406651557696,7.627002046748648,5.518510761140578,19.11578266310107,3.195952319677482,10.92648863107926,18.552268349449474,18.41132030621668,2.186690862271421,12.849919369171463,14.10603071136395,10.868379277921584,0.138326205411623,0.2461412465127255,2.4575632887884646,17.29554165507462,17.730744523358556,11.3360714722673,0.0026416590248912186,6.300600409733645,14.352225966457102,7.553852390188758,13.999988422988029,4.694210094787481,16.61403613001713,6.783672330828736,18.74527824642009,8.222315985591813,19.90530466686757,0.036954825365609345,19.011443183502692,9.024879778827328,3.626035997361554,10.215112821042474,7.6687607746383435,6.017998927153445,17.393135002938614,14.132322068333103,16.547329527726767,10.76211616827749,1.4944587406684562,12.073749710865883,8.10191175629245,7.694293488270838,9.87442907988678,1.1012850141570807,15.921625361155387,4.001690511212845,17.342303339606985,3.586740069734975,9.765207004135924,17.91087064738238,14.01631822179738,8.822538636162523,19.13027685812628,13.002986958702095,19.77340057327542,0.02259745023316828,12.27491949913393,8.701064675043098,16.53845313695875,7.952797500828437,11.570415114642142,6.723020733208256,15.056662093777184,9.140782530546335,16.217147308845902,17.95456159759874,14.805695523493254,16.856144742400335,1.9499370952140582,7.9807718192623245,5.841741637099318,16.607224749598156,18.73170481350016,14.624644898952038,18.898319265013157,0.4313730666344773,15.20386113312333,3.392996116260729,13.673877886634642,13.982701760252404,18.347751772878954,5.144050080399056,18.334153104165978,2.6849814171695208,17.092536262919072,14.503815167772544,10.726263513281328,19.808988513073654,2.2292459778634877,11.581957009523428,15.29490440072748,2.0980331707283906,6.355957736290412,12.227247520721342,9.835702862628066,15.066293871557278,6.764675794448047,18.378655872470254,7.051791632132418,16.925403596579102,8.221856148147557,7.568520817980624,9.859138752383721,17.148464817275034,10.907118523171363,10.288719808692019,4.832297219815098,7.548606965863578,12.369805979208465,2.1618870944724478,0.021053490004585562,9.248274723448926,9.662607305609576,14.271863898659278,9.295492778838025,15.691523817803233,10.747352046184439,4.368427505195487,17.354469675904415,3.4467045815705832,19.416500968231528,11.05176296590094,18.338615816432625,0.23353126897622367,11.826096142283573,7.414831127376149,14.464346577929831,6.174560394987005,4.495035566933319,10.206052188766375,16.23043516950272,10.013448430327552,0.3443542520750187,19.115205235217154,12.767348296196515,1.238121400085661,4.543211244038727,16.328866784937865,8.418203893639129,7.422113712397991,13.06182116373285,5.566125900990615,16.75586243541124,10.985372758016387,19.139714009721036,2.70055173406746,8.705057123076765,17.942940093065065,2.1264780150845652,1.3740038399862087,6.694672240389128,12.28075895344642,10.41596284769902,0.44589077844141567,10.034900619389969,12.922332002252492,12.352396635054816,5.812676605947171,7.048437986715519,5.667611775291568,14.257475639052416,17.68685242362684,14.210467107475626,4.096084956424999,4.428295920101761,0.829234223758526,8.774678095720443,17.15857095096352,18.90337021651939,14.494266442804555,1.4160597700448907,3.3420110517352075,13.50831470892874,14.056402201188725,6.3825010942997595,8.291986628363727,5.472054179810191,9.036345148126497,12.116505560639176,16.99837549367128,0.7570260020413411,15.00910385329937,13.28971978807087,12.922900059755843,9.503135588134665,10.23928775863196,3.3441128133521447,0.7884066871362183,0.12869942998544825,12.925984498415875,4.89435328121373,19.27689357509638,14.204388756622649,0.045328342793333753,8.890271413073751,13.990022247846706,7.2192560314707155,5.35839555717029,7.188445569139361,5.22550619560461,19.492783993031072,10.455528442425276,12.788432723327352,15.260900152851221,1.2150713313773442,10.985626987998952,16.33487278835789,16.2703185449443,1.3026387574927467,14.563088114759392,3.014885725847365,16.619536428275573,12.091757090796587,11.452988369298115,9.354711607333645,9.34857494634619,13.971376811791046,5.715428230167148,18.334262479968444,17.708921804364003,3.756788311417223,10.899858092613183,1.6133282359633672,13.184390068553844,4.529028986368928,5.755022895769528,2.281430794660495,17.98644004129838,5.779177940564244,8.490510419322558,7.099015243997475,12.486580189743076,7.444070024430274,4.000428626380588,19.296146663133406,11.173238169174509,16.76002196686222,1.535277712508809,17.40874898342009,4.555045001395843,14.819802092960987,0.8423114036278223,5.94034778600288,1.7120169925993967,3.0925848343823725,4.180467173029325,17.40640540251472,7.1311640110861685,17.3134637529381,10.02735865762543,15.27137720543044,19.350238465460862,10.925549616380984,19.971069425473182,0.5996105839954824,9.801600000140201,5.777872469431236,0.7594924926523294,8.277899348849873,7.264166964330725,16.674753574479013,14.629390955261691,3.331633040316917,17.760994293184893,7.10281231633918,5.97789278295382,2.1838969941347397,0.977421213888432,0.8991886835887364,9.185242810915874,18.289236309743366,2.731092603145129,6.637751532864566,15.200085880044728,14.02223724966456,4.188285074044975,0.8214781989375997,17.670509767830257,3.9792027902801363,7.822764329235832,1.8226854887587463,8.778128026838203,18.59408431308502,1.5862470048832478,0.2161959526873769,3.902719369857013,2.0142077577135042,2.827867446024599,8.631005853835845,2.3537934360445734,9.804316768169471,12.39388094546879,18.376174513368344,7.89144558454888,17.85297155821855,13.004042250948778,19.941128932894646,13.799798157582007,15.518075822445372,0.2400576589323844,7.087548750257016,18.25697026640875,16.74044909763944,5.795314550689286,3.466555523408017,18.67933731363667,13.953561039252879,1.9299239423746606,11.20067813762141,8.500242699499449,18.530460681258024,6.203887838428677,10.405380099080155,13.50941812609268,17.338258838956605,10.938788475114393,4.860131888486694,7.842422951883807,16.80638396387603,0.2786394185324248,17.958160351633104,1.6100795148084668,11.911293253941565,4.842791941024509,1.0551364452430123,16.92737998836752,14.974954158058381,12.688585926967946,13.92794140199543,18.113356073289026,17.24061459093395,9.055083491618504,6.953342189713303,5.405667405283241,16.856743042370415,5.8995008535487825,2.5204831035483233,13.97620906287493,3.65284229149899,17.74611772747271,4.295049160400897,10.865297165736347,14.787446418296408,13.080579051867192,10.126043293230849,14.196591571961413,0.5105627642755373,16.444362931473883,2.3490464833159885,14.892668544156455,11.275820585011417,18.66296727956194,17.974394410154527,5.875276645771077,19.186536796976466,7.914992365555631,16.520066469874607,19.306310471348326,15.846915665089911,15.173422574456644,2.3677473012708727],"mu":[-7.07788581767939,-1.3648999363089453,-7.649954839246689,-1.6064021567009212,-6.015862702277499,-2.095593306368222,-2.57032215987254,-3.538234687910098,-3.7711003222579498,-7.503570894847346,-7.979019590737602,-8.82094555799442,-4.529617429956955,-7.8418675647591325,-5.98233419427012,-6.981402430043023,-2.0259589753253304,-9.362002823221633,-3.4455105109882034,-0.6183702454461959,-9.184435298249037,-1.375063604821285,-6.822605936175585,-6.386676303426064,-8.962736418397537,-4.978495383388648,-4.473394198680916,-0.9124905652915483,-6.616528615307333,-6.350589969528642,-6.83300557933263,-6.421812655263306,-0.41774765105616174,-1.4867599285708444,-7.106913122271807,-8.146990358387434,-5.543176191048891,-0.5124690291232126,-9.700001256853541,-6.251901815408072,-8.308425406960831,-1.4420156527996242,-2.9774310255685665,-0.5043772774576927,-2.3327827337845886,-6.533549237867906,-3.859676727437167,-6.096178736826198,-5.793065750410166,-2.0300903378911506,-4.507543228253734,-2.1530914520703703,-7.785109559687051,-3.9565470324515206,-2.4123663770720305,-8.4329692791499,-6.472187040136845,-2.472352237596276,-3.0078097048361907,-3.1944960607712947,-8.748461966861832,-7.583244244976983,-8.162198532795461,-8.147165288488292,-1.2488925508666715,-0.2007733492587893,-8.816168364810029,-1.473050743867692,-7.980208298937961,-6.672011786677093,-8.53691457628833,-5.191608237430685,-1.9005717351165075,-9.645768274581503,-6.048172594218004,-2.128112194479135,-3.826631547730792,-1.928176881784025,-2.514353671394449,-1.9246802259795692,-2.23817694360257,-9.07024697640076,-3.3826423281220674,-2.873376456291501,-3.8840714849749536,-7.141850372259688,-5.4267535708480885,-5.960553208441281,-3.9282060129906227,-1.1990247769226148,-2.825669211160786,-9.163834653446713,-3.0379007906874778,-6.5029751183054785,-6.1760687198015525,-5.776783588572707,-5.15688908098479,-5.5028955235616035,-9.754174079441551,-6.379678547348786,-0.9298036890922701,-6.699403396977621,-9.19606144164661,-2.125568017036772,-0.2694114904418843,-5.479782985507189,-4.0037359135775,-9.83394794469634,-1.7164809168874284,-6.9646746946683535,-9.882396658801243,-2.3878961858456327,-4.298683867466265,-7.248541692539005,-9.78208603757368,-6.9175332011828665,-3.1554244840344414,-4.627300125516189,-1.8557611945491792,-3.9179246048539462,-9.354381578484649,-0.9570521439687174,-0.055408534776506535,-6.8470540116796546,-1.001072790606199,-5.972523986086813,-9.527807527304295,-9.392338709657311,-7.9667146567619795,-4.653851396624407,-2.6475628867229184,-3.030453783756284,-1.6366961933665447,-3.3648210155480807,-3.992362219640304,-9.213151997409405,-3.1686842854543906,-3.0036364720257747,-7.676823464516948,-8.239533468484215,-6.043249181804526,-7.245183913233582,-2.1804346779875994,-3.7339679324563746,-0.0785208821759964,-0.5735413821143376,-3.581940073753531,-7.591912891492001,-4.420025373360081,-4.548632021025545,-1.858122315848616,-0.2543535315604073,-1.8186614848409621,-9.399028367042368,-1.0144123648857883,-2.3287093166056905,-4.974165737934831,-7.876915619166471,-5.321985779520255,-5.134414635644968,-9.850423792218585,-0.3653469370296336,-9.450935802746319,-5.3472885471391525,-6.401817709419639,-1.992322040754586,-4.394953573427758,-5.887222203420319,-1.5208447815464554,-1.0767360634419343,-2.751807839185141,-3.3677715040878886,-5.698601416581129,-7.7864956266220275,-3.1896462514091017,-3.49914672211459,-2.4276322087800706,-5.495591249693772,-4.312304471688757,-4.778585654650609,-4.224967923243375,-5.570176958251441,-6.080957936024127,-7.601021802419203,-8.880295552074058,-8.759636327856459,-8.099402046438467,-9.978144609299914,-2.709817739611289,-4.7236114555081254,-3.984113590018461,-8.30232643615814,-3.2465405177361273,-9.38639831684155,-6.605733239171148,-3.398347764554943,-5.676592951815616,-7.436447505298283,-1.5853830288567639,-4.070239108837336,-6.034888222105048,-7.913919897916168,-4.505339262403314,-4.510296661291657,-5.704585057695992,-8.355006980179155,-9.620311598542555,-6.423494847558457,-2.073782307084877,-3.448237532550693,-4.682060247547913,-8.233018859467546,-8.2252971886159,-1.2066598619624136,-1.9622518052149585,-7.830143783438029,-4.655624514408993,-4.435454857792678,-9.571020790161773,-9.57357503555783,-9.439394426892713,-1.8086844204775243,-6.907620457284334,-5.388871643737152,-5.368095064023319,-0.9427547824427629,-3.713430807133282,-5.832380206537566,-6.908616149825368,-1.2217928914785325,-4.860714851418995,-2.677710432506022,-0.7863986640882747,-9.419082093414808,-9.836437389847974,-0.024625738979995315,-1.5314644862371596,-7.526099979620787,-3.3946610246459707,-4.709694637257016,-9.414918383056559,-2.919826049947438,-7.502498755782621,-0.7244408337884289,-3.714512398091685,-1.8062792580436526,-5.722573541018658,-4.030317395859093,-0.5103056811274476,-6.178425221002078,-3.3192579935189515,-4.42034831589571,-1.2770096032986178,-4.4363105698261185,-6.453421261027231,-4.929143090880599,-2.333152233328877,-0.42174091053412965,-9.188956405591547,-6.27713665842699,-7.405171821715079,-1.2841584530999173,-6.193645900219494,-0.962344179392336,-5.108764705995014,-4.55037939592851,-8.754745326220979,-9.005327419622631,-7.5329415608803725,-3.5186420088539494,-9.768949515017859,-7.33358095395152,-8.408655713658304,-9.646266308370306,-8.10399346326861,-7.174174694779714,-7.70839662005309,-1.6126423081753538,-2.7307669622894815,-1.1270283322029906,-7.359450424800825,-2.451360041328945,-1.6273265539997062,-8.563019480936003,-7.4412798018788155,-1.2411310242833329,-9.618637506124244,-4.3675012618459474,-2.589690828183926,-3.2723489518507742,-7.212201012064288,-4.225867583293914,-9.292861412117864,-0.46965823393052997,-1.171695045003922,-6.882402835252595,-1.7380692172732792,-5.077317437094013,-7.750545095072107,-8.161370668456986,-7.372034935903001,-9.030197494900435,-4.69726493566089,-5.281077487915368,-3.3887988999632968,-8.673904229982046,-6.971193811492265,-6.441580585181561,-1.2779241274600617,-9.463170789314269,-8.908778035208073,-8.718574138756342,-2.665552466816117,-7.338942178031845,-1.5076972829678703,-8.703435200744229,-1.5901965824357855,-6.269571249798682,-0.2576838928624192,-0.6498028854606019,-9.716271667419672,-0.39625680889293635,-0.841274149725173,-3.1522180699220503,-2.48097073277878,-1.4492707247444647,-4.535482024021471,-9.60208273432469,-2.5044206224777654,-2.9821085061526587,-6.72393504480924,-5.652910629821369,-8.579628374336576,-3.584490883020055,-0.42437616202414263,-9.883632652359779,-0.5552655043429766,-3.81030976877907,-7.645200524138318,-4.1296859103672245,-9.558466446904683,-4.956861493678755,-0.5026284477477083,-0.901748309564574,-9.617159856552401,-7.2006600746095035,-0.9505191534581248,-2.0000827704122837,-9.031104287614905,-3.7318832802389323,-9.763913140707851,-5.679302096555958,-8.688325302875594,-2.6885449336388367,-8.155727646091666,-4.884144806219808,-7.3619699225178685,-2.7741482877404433,-5.126581022506187,-8.206945040344447,-8.50718564878557,-1.380552184187791,-0.2937773103406949,-5.193158283027087,-0.03480202371256347,-8.514197078722198,-9.232379431329944,-5.859332015438503,-5.380721237316106,-3.871186076137796,-7.771811621363511,-8.996449828830386,-4.108052539558795,-5.232927306983896,-6.844718730317707,-1.7685139212346668,-1.3143618626154119,-7.376039291464281,-8.177166091886981,-3.7264020202976234,-2.7204113384008877,-2.2655601926822277,-2.3956172779943863,-4.86208298321263,-0.256902458113093,-5.485205902507719,-4.505083921158479,-3.1099589764579227,-5.519924913683196,-9.226161525273236,-0.9215300090954681,-4.31666015688926,-1.414099068386645,-7.906263270843308,-5.025706607882421,-8.35085326903701,-9.918384503344921,-2.5039138444983244,-2.467503060173859,-1.75010360298816,-7.028584394536632,-4.084904787725225,-6.955233375044094,-4.773611706259338,-3.7741510458838157,-0.714138391579282,-8.318630771157745,-0.26787170944440275,-0.1877892871651765,-4.320560560068447,-2.4008539968349063,-2.2214541688535383,-2.1243384067342053,-2.6678969730233937,-2.156791937464313,-0.9980915278370261,-7.251097182139814,-4.231123749996035,-4.294809098712178,-0.3155447979103698,-8.612977035472902,-3.5639785067310203,-5.222971525121167,-7.959274592769827,-0.23231173846654185,-2.0560240616237024,-5.915702196087242,-9.844441375089906,-9.432101866955211,-2.8730474867613065,-5.7135765400467236,-7.305254643535388,-1.422086399274889,-9.537230425038373,-3.913984001420281,-1.8911225588599812,-8.996887122416798,-0.9638215715401799,-2.8016468887159696,-6.077788568870146,-7.941350406930228,-1.953956668721477,-1.540211111830514,-1.4988516680599795,-1.3694572147551387,-6.236348462007721,-8.310332243595482,-0.43583140618461025,-5.766021260438503,-8.295386176876605,-4.172153474774807,-5.255765791025119,-6.043960657340013,-9.738086288715639,-7.307650670609835,-3.7486278371892645,-9.051738365019926,-0.8083427396801901,-6.444679954931014,-7.606572469574482,-9.83039083800806,-4.350196254937209,-0.03151269887967878,-3.007417824383467,-1.5294170730261136,-1.6942839621393646,-6.083019743117202,-0.4793123650859221,-8.506377782326078,-8.379125281784688,-7.155305095579935,-0.04726361631332443,-6.486063370646972,-4.6593453663323565,-7.503428493764965,-7.9016389553725075,-5.3015238167936225,-4.163057560091252,-0.0076912692814201655,-7.351214588961228,-9.80815984357146,-7.404744471805427,-5.611415394427137,-1.3727077157391765,-3.3868105236603774,-3.1331012564759453,-9.633735796855253,-2.5199786600716467,-7.321087372972828,-9.128671548180838,-4.849975595521654,-9.100845808593643,-1.7738641035936809,-4.452569653354725,-8.330197527579786,-5.219583333926778,-2.035852155668747,-0.07363733574413,-7.722493179867178,-1.6476642924168639,-1.9067776960047689,-3.3012924876371175,-7.579140518893399,-4.780432806303732,-1.3580898928215146,-7.828864877851059,-7.65415319026864,-2.747190195070268,-7.144345413113415,-3.9011712571073276,-6.824372347405965,-6.612640725421697,-0.9136442700679059,-1.0560267667077183,-2.0723165806099453,-1.701672975941324,-8.959013897678755,-6.776278504862532,-5.1634503513960395,-1.3267182052629312,-0.7743835125006826,-0.9783241554758004,-0.42963394224822204,-9.518220153138842,-5.175800896187002,-7.592795475554565,-0.11573446815676292,-6.069340057656851,-1.6393437443850978,-5.091591406447929,-9.178375132657877,-9.580075259921143,-6.7011845953412985,-5.970567485255891,-6.008699479426407,-9.637903209079703,-5.190764562509664,-1.434750950857815,-3.2241370320167806,-9.061386513431927,-7.595014130497124,-1.0534713860919598,-7.740882668191789,-8.978330916457063,-9.345791139168158,-7.161335802469509,-8.73846751775416,-5.698357182433487,-9.19676132393456,-2.6482951916489816,-8.966849208030078,-3.8175186649962822,-5.088348122586792,-1.0524097791641718,-7.3779114468527585,-0.8904959750951069,-5.073384497362856,-8.37717312032315,-1.6009226236081053,-5.471308985679744,-7.921347236207352,-8.142548365901238,-5.84942374344198,-0.564070213456993,-5.830549867831609,-7.550631916132553,-4.498088407865772,-6.713969753086477,-2.7867926080126715,-8.455400522596548,-3.000818017403466,-1.3691577744897443,-7.5861009643456505,-9.745939804483385,-9.271592001449502,-3.1971502216002534,-9.733572733183225,-2.3369244549399193,-1.9708774889845815,-9.907495818313759,-6.895174907332439,-6.220381297082199,-0.2290102225251256,-4.268425768043926,-0.8059298268441117,-8.975829274670822,-3.9714583345623233,-4.037054698600704,-1.4052011855996849,-8.735787877099181,-5.512095891823046,-4.9025650528028315,-3.1586299022006092,-3.2795002519082272,-0.5380276062499711,-9.953208248458768,-4.22459379181205,-2.4558671495950812,-7.1249465714398745,-0.9587635967237751,-4.592932904686833,-5.981883392443759,-1.4078367936332992,-8.315723118623275,-8.064560420849936,-1.4876048141325215,-8.725553881051908,-6.50334030264867,-7.6136814870751905,-1.3338455548715533,-5.765363530164387,-2.711613879239778,-5.009545838775922,-4.5092939782191355,-3.751754971300043,-7.65617492624658,-0.4316646748321906,-6.733892729772258,-0.49811549721109794,-0.5224033369615189,-4.987930975766803,-5.550017950902417,-7.364164698973131,-7.2394291705968605,-9.556399121323654,-1.036481752802394,-5.584177136212221,-5.508997969873819,-2.399776702271328,-3.00740565066852,-4.855759561008773,-3.523913012012916,-2.7264636567548495,-0.4000299994560108,-8.491797541806001,-6.864206652539135,-1.8871094512111997,-3.4489639449214704,-6.377290700432459,-0.014243186458471335,-6.966241817102348,-3.6166079092083647,-5.641321371793493,-7.219055413572879,-3.336130394240766,-7.210515968387989,-3.790889012242873,-0.9672176892027196,-1.4608390506652147,-7.738710615895963,-1.1480775620814732,-5.9297756746002905,-4.933926561175241,-8.613860840929313,-2.600362147361459,-5.7063057798603545,-6.165677881907429,-1.6058971472421968,-2.45754542233527,-8.542779932278785,-2.175842100554688,-5.722032481622607,-1.1982025772905303,-3.668115613832783,-6.134034612483152,-2.7211642559089766,-1.6634220782323572,-3.6747395291122587,-4.635693700903221,-0.5587280880603185,-0.6832885622463536,-7.84740100020281,-0.17056938649506304,-0.8908072038033321,-7.631873382076579,-4.745750893531541,-4.382533630504453,-4.744840740892499,-9.225334351927026,-3.612020633525499,-7.122048628754727,-8.89445471240229,-2.3845020177167675,-2.271769868711717,-4.1579824493280215,-6.624589804323331,-1.415636169479424,-2.0894981968177517,-6.648648249578408,-4.494899175983969,-6.571478750669748,-7.401501536864599,-4.694089834144446,-7.824159585980492,-2.4758611880762293,-9.026016054033562,-5.409795172130176,-2.8038135548545706,-8.4232319636338,-8.460987647716875,-4.403238048129197,-6.227099178639664,-5.526715742438169,-4.023158943144929,-0.48053026808259736,-1.3689744640139168,-3.098370796799619,-0.0310222376333269,-2.6362156631521283,-9.714241599880653,-3.6007930359733,-6.666706606525383,-2.4582406510547727,-4.078364848373495,-3.7168275438540777,-3.558134656761165,-7.0000623369132375,-0.020515212416352124,-6.369212450786977,-2.7497798873270662,-0.46327064363357096,-5.943873277322549,-5.65110631722275,-1.9563968420297795,-6.852991362380156,-2.377967465230715,-4.873363896520628,-2.300188202092903,-5.448787570034142,-1.4016704263960889,-1.8284683192804851,-6.574486449565744,-7.846304735611245,-4.978184012311225,-2.891831476642326,-1.9196396140198435,-6.92763746671482,-2.980406828376101,-4.1726960968485605,-5.489336223016585,-7.830985874625953,-8.819847102298743,-3.7736323489973644,-4.6949206670473504,-8.060445879122183,-1.5706295961974615,-3.5852932700662143,-0.7029482900493544,-6.4830371132516085,-0.4612843307682013,-3.8403137866887915,-5.475201633970532,-8.248900785608331,-6.152531984515745,-1.036221638169632,-7.24764229807475,-1.7920664796296726,-9.861265543114763,-0.19901141724126825,-7.580216640547841,-4.014834905061607,-1.9792277504077305,-5.199592816063863,-9.033411655331731,-9.64721082037687,-2.347078448799562,-6.277802080428909,-0.6502557799407138,-3.8093802608658867,-3.1679951841286225,-2.4671814977451145,-5.59177284386331,-2.1111360289892733,-7.820921877789826,-5.1018108929996515,-7.413904396464368,-5.7865185467826,-8.225158641868422,-5.693676066495506,-5.181035297553677,-2.40987959307454,-2.785159350681836,-7.078420476817417,-4.919386759491628,-5.371305564430891,-0.6668554907323587,-2.0215641454034317,-8.437158574548553,-4.366459603066497,-1.286247031618457,-2.978048437046963,-9.318104018534779,-7.7495828830141145,-0.003938008240200741,-0.983228518623489,-0.0685183576773829,-8.64781813051152,-9.07334347334588,-3.8756876230305393,-9.774448385390658,-8.99369277179196,-9.660805902960014,-7.009497559766629,-8.166674012248173,-8.961094917799858,-8.710479553844003,-2.0487853749954277,-3.6973885777050164,-6.892077502078089,-6.93453525079029,-5.257247402513999,-2.8169559799237986,-7.1065427614127525,-9.494360772119402,-9.594085056428742,-5.12984979339409,-7.382784928019575,-9.517103581284616,-9.306578433697961,-0.24229579475808283,-1.6148709952566431,-9.486850240521917,-9.255305167978175,-9.334757339568817,-9.355066338791417,-7.962423466897759,-2.166378207700266,-7.0424566097938595,-9.724697976195342,-0.19699668357307853,-5.269009048529667,-2.7830607042161204,-2.8800641929264326,-5.7315203794122205,-3.4957761419349165,-3.280508805760889,-8.868990046932412,-5.66049014063114,-6.940121988308157,-6.695376994736568,-2.6371366869930424,-9.04149402022652,-0.636569065943402,-9.257146216698828,-4.4956677093676145,-3.9570380889663137,-1.7498216251098642,-7.00449923531232,-9.729112138986821,-1.0390935238244414,-9.330368442707046,-9.26021846766194,-7.360663426677691,-1.4711533445582825,-9.341480692493693,-6.842238941808008,-8.468189702609767,-9.85208878896237,-7.243615200584328,-5.683840214283662,-8.697938046274661,-7.332701371747321,-1.6699399825566852,-8.783361958035483,-1.9644781777466402,-9.473763949676346,-0.1118531240381837,-4.267936606935756,-3.1497779539658333,-5.178902252211184,-8.960133498230094,-8.216637926491803,-4.805816735015118,-4.399017615375378,-2.861866708622889,-2.3640132649023293,-7.3578416361477395,-9.530289676667923,-7.347903906453476,-4.65097324850432,-7.777941121258458,-5.068106823413547,-3.337869553081494,-3.130418324771287,-8.19187051415145,-0.05052964701058871,-1.9877270942134628,-6.024914375110459,-5.742002633391959,-3.9997318228029344,-6.058978178651479,-0.31237578994216975,-5.785240179027891,-6.634096832738285,-4.51150308157533,-5.977552724019397,-7.267803973662068,-3.9638278943087424,-0.1345709410924134,-6.023407149791291,-4.934489039319992,-1.3185361803032936,-5.563169788161531,-5.194892488953156,-8.932146393983283,-0.7682654365531727,-3.653302040362021,-6.9039917746176656,-8.380955020383617,-4.832816857166618,-6.060690727868547,-8.088805399672863,-2.852871047401546,-9.186485403521775,-5.713527401470378,-2.32399128324956,-2.8730233167200048,-2.281498026981932,-7.758207642565413,-5.180550868664698,-1.1094291624034858,-7.562910398342241,-0.7633682631107508,-1.577673599061331,-7.233726403761405,-8.348770469257914,-0.804633310033187,-5.64072313345144,-2.701550980214096,-9.908178994103027,-9.939266561085061,-3.5377497829727256,-4.835162381021889,-4.344220082017434,-7.390961037213093,-0.5994585678217157,-5.363171593030622,-4.243858966031633,-7.23325548075497,-8.180302086907034,-0.03044228726147402,-3.4015104793705864,-8.110203409962093,-1.2957059916724356,-2.402697014128854,-3.9732276837472202,-8.832923583136713,-1.2877519305302632,-8.735129594397797,-1.9115365704952847,-9.280567535223254,-2.524285804570565,-3.6205311084697778,-0.4081344525636377,-1.5442606032152484,-8.251286526305758,-4.527601303904909,-6.771167038313523,-3.087650674621414,-7.325172196029694,-3.2824608980269465,-1.2663147049390222,-9.386507089832053,-8.330511274053535,-0.6227283294706232,-7.19604908024932,-3.240086244434912,-7.339587521250179,-2.3434123444450905,-6.001660631546553,-4.044206793838545,-3.5605563986782696,-9.114173423627365,-6.934147783574753,-7.702058420336932,-8.210739240535874,-4.361736972088588,-8.566138415818115,-1.75367848725688,-6.924740190151635,-4.985290317549975,-3.1287153973351245,-3.019552042463687,-9.34904670310637,-1.5575035738780518,-6.444517765128468,-8.655952277546577,-0.7302655932494084,-4.223713929617272,-7.433896803355369,-7.88018757839819,-3.6508140045438253,-9.861664079686578,-4.062081015920591,-7.552261225370101,-0.7104575521195944,-6.463009985803252,-8.822666221563962,-4.945746909775015,-9.699236753849874]}

},{}],125:[function(require,module,exports){
module.exports={"sigma":[0.7487754114976097,3.3585429362320065,0.5401254747601658,4.413861990914053,1.8295263080017732,4.065883160687544,2.811280471240524,3.3019756012979764,3.828329976000556,4.916695819458168,4.951270252446576,0.582593644244549,3.657806922216066,4.551851860399659,3.6664923821991935,0.07350882348579724,3.094721782103711,0.3478087666030094,2.4093250397809407,1.1724320604034888,4.955913652595117,2.2947728529257105,2.407632089839429,0.9340012605551762,0.12047786720178921,0.4177970089158456,4.527100736774115,0.11957917780534122,3.709993919573166,0.43907088007523964,4.263679019423828,2.049412227084143,2.3216559901285425,2.5313265531488027,0.3047681720566764,1.4076976197353575,2.554018332152209,0.5456474449933724,3.8670425019771293,0.022170362324833714,2.619743217900452,4.017664937646388,0.23042847226332985,0.20753667522392383,0.2580440143022089,2.9360807976646317,1.0069820779571748,2.4949875788108167,2.1558254926060094,2.3859578106575707,3.2066989718974903,4.467753646255699,4.7881370763527755,4.381625999775497,0.39687021156466273,4.250406072925887,1.2562452818335046,3.9980418101485107,1.7157586868236352,0.8722356372400797,3.81209489581709,4.6346229657584495,0.31133177911685017,3.0393484816858694,3.2150090988609312,4.952498886410339,2.197300803211537,4.343279578521869,3.2563042012322274,1.5363634043198715,4.55744344371599,2.6079306606348807,2.4566259948016933,1.5320848830650335,3.0628440306457874,3.5259138993542125,3.041872717109645,3.4813295723132764,2.2105435417037658,3.1560052646630297,4.6150758674421555,0.3023783128611801,3.456996682237994,0.7112634941141838,0.9210910939804728,3.8139556950108844,3.308350253378256,2.7921730401216047,4.295725901458946,0.44827322837446837,3.689239789875293,4.350953839239086,3.7957563102646272,2.5118139430965747,4.92087252275614,2.54324876242085,1.529008407758713,1.4355614248522852,1.1662219459927725,3.999838685409526,3.50339388276385,4.098958783785136,4.793289205227604,3.831619123641248,2.9041460206745153,0.02380102029272191,4.928190572111215,4.370003295554325,2.504112822273994,4.305040564984566,0.5962783782073622,0.6992969998371301,0.6902234667343665,2.8631921935069227,2.2767927647641573,0.9578757599444465,2.3096686235933395,3.0848269176296803,4.657502160368418,3.20839804901356,2.9843764600664113,0.52445108735379,0.5286540332551737,3.500482115963013,4.766966695117558,3.596068440902415,2.663833680249361,3.1663680166166763,0.5329213203123095,3.0684954221334824,1.065720400804876,3.486190236617146,0.8778882832956114,0.4304527585579143,4.248724541629667,1.4927210150348535,0.7714153186175199,0.09609483263647522,1.8112359874573836,4.637075576318899,1.2358818446668907,4.860561513723159,3.0190865882049547,0.7569382138957992,1.6861973514684092,0.6563720734817446,4.42548356335029,2.065601070249862,2.077836983730905,3.366000541537474,0.6867286398086869,2.974338680751435,1.3619312997143762,0.07045162340911015,2.7553778775171347,1.7836538580676276,2.4821885657524145,3.7854402996551295,4.2712069944543885,1.0928691784178268,0.3148864479092961,0.5452100432110019,0.011958271256096165,0.9585161369456752,4.268283660811534,2.3102626862535747,3.2646964472013664,3.135982592198797,2.000652378244453,0.28216939200508384,4.29076574077102,4.148453220226927,1.868847983239974,3.777575989070341,4.394142951231369,3.7740093009426188,1.851926164616584,2.82963849387364,4.616982548532645,1.7078087933777808,3.486128432137774,3.0640687401419764,1.5398203628465923,2.1714758536041643,3.4957584445832923,4.193222369105829,4.029958975526054,4.337077291915218,1.5336218166040971,2.66857122944109,4.03123408230007,2.72989493502354,4.885265296715916,3.4931952374843456,1.129896091752396,1.3904958859998517,4.07957687514629,2.4534963627793696,0.978405103309703,2.3843174906950813,2.3343804215317263,1.4949205756971784,2.5153222803338107,3.0848966326098823,3.7639986287316574,0.2548615133381116,1.3013595790513421,2.860213019791784,2.086452940909723,4.388520265050718,4.097758096242475,0.5258287952553498,2.353249727659159,0.39315979762049924,4.18946284534999,1.2384637546720711,2.228331658654511,4.389549432838175,2.8831597830672506,0.5238636446814648,1.5319131106254824,3.3759649495452884,0.4320927189521506,0.8702688086956845,0.6685700732743038,2.236967329484092,2.5009198663447876,0.1316652788450312,2.0044476087277383,4.290947433846128,2.0670701795892823,1.1680560660469474,0.4917572113491042,2.8289263108496963,4.851898290239932,1.0257613279004674,0.3621724228788403,1.7551619133361196,0.9461910392728001,3.306933417799346,0.07432775961092708,1.1677748507844532,4.220218737999939,0.9346743074244901,1.7252576429459388,4.899839107961082,1.5381030693515174,3.183874292788118,0.5152537814840352,3.152294994242234,3.799777843290663,1.686160774329849,3.713735789814623,0.30639003554339017,2.5351660032349796,4.272483937919967,3.4081870793799993,3.47469676932737,4.4374497791037735,2.8146866889512676,3.4907797528827746,4.727333428110974,1.0809805636315117,1.6473070420597558,3.4945045029555732,2.8886253081290434,1.1569737193812646,3.32004064555784,2.4469684412734507,0.16286900252217462,2.317756995465997,4.226393931974437,4.325038374935298,0.05361667210365462,2.9431388468829334,2.8775511365418693,1.2146661554460692,3.205588863572024,4.045894977219207,2.2243051136345326,3.6398635102470367,4.011223311018835,1.532292372782783,4.341195859506232,0.5559108416229408,3.991707005805998,2.0905444175185495,0.6020512040523396,3.1613503068304016,2.535291428578883,1.0205417117431925,4.450848964788507,4.1701615201604,0.6134671068937547,0.742082592775104,1.9043351656380259,0.5629282133471014,4.15306310865923,0.3160204276255263,2.141436899859235,4.705930487480174,4.846449891110023,4.67462886908471,2.6103595797592627,4.616774151559294,2.3410178780806046,4.300697735729333,3.7983087100182154,0.040416388234630896,0.5574631347029757,2.39933564694349,2.781319816905877,0.7042244443318901,2.9297334766820224,0.11751052562404496,1.3489651458937624,2.4559997727726146,0.15041303182529941,3.890724424044991,1.1708572887218605,2.7007170188854266,4.373179219907941,0.10162053140427063,4.498789037283075,3.0964940657916573,1.5069133003536983,2.7671897718686953,4.155845224543562,3.333923955072764,2.541389956104707,1.7994822435744207,3.456756756222603,0.8266742868446708,2.879643262403526,2.739097502767928,0.46076311254978686,4.158074060397004,3.356579758780968,3.3325632135314276,2.694511254086943,4.193725273317521,4.995907760452823,0.7572294595674489,1.8828682422262266,4.9428164428871995,4.2059027044494,1.5400541813270308,1.745308711495459,4.43199136397455,3.31198751585175,4.274163628204883,4.537393924272392,1.5693023468876044,1.8812244471807738,4.887014497288773,1.4482810880373176,3.1705890289542737,3.6616072982991508,1.314973267051197,4.4675237093932365,1.7769090819128341,4.324372689979543,4.11311490331604,2.9452959599003736,2.8825474148020005,2.078265002809397,4.7115034088409145,3.2198062271992223,0.1031788221020058,0.33788838842747415,4.671087074963902,3.02078937593064,0.04185632212346024,1.562494100579045,0.21026173482450727,3.5382962915053264,0.2726400911619875,1.215542219103104,3.2670501087711634,1.5447371909943186,0.0366917559127633,2.549938911889088,3.5581651509334677,1.6847031342025809,3.2170485104915567,0.11256472847278598,3.518199009268179,0.4492909008397794,3.9763216728476234,1.0234544329741746,1.44249602670942,3.6490944268420877,2.9920807038875763,3.659239722829554,4.261951973002556,0.8760165438303313,4.302701479545403,2.5267056547639486,0.7592403594905206,3.4084403152411733,1.251875878783144,2.405679222229906,1.5780570790035275,3.2880903310801646,3.5672127283855835,2.546645104612214,0.5132642026483492,0.9140197746934364,4.708966338881586,0.001480983101644906,4.55286202525789,0.584137088713258,4.694510837263728,0.05641913271039134,2.007394623102776,2.5622334742281074,1.8185703112498675,4.745200752795649,2.1542171859844803,2.05001535606209,4.866036477671739,3.051074686640823,1.8770125386281156,0.6519747305304924,0.11051157160248515,2.4268265506697686,1.1425475234678217,3.8226709738775333,0.08037759766116759,1.1315155214396477,3.3902296171065305,2.951767869204552,4.136190126182491,3.4477507851643385,2.3168312445591424,1.1967021564987101,1.3313894533566373,3.6605082233249053,4.521684247930376,3.4103202936301957,2.8275221115160285,1.9864562480881676,1.5212966101913927,1.9481349302826656,2.9284534116780057,2.5943927313256845,4.157310962878079,2.8448634224052083,4.244660138941851,1.2307493338942643,3.5023308253925025,4.908479051659114,2.354494615147643,3.2470555872402462,2.7243190937734663,3.8317703627056874,3.2274792866881796,1.974058932034256,3.582041558469493,4.560666837011789,4.0102409087987425,0.49819998401966603,2.366512265437305,2.556580058896679,4.9556485338968805,3.5153970552967495,1.5356213161712662,2.0974597226053957,3.7801249074774725,4.616206464713085,0.9637973433318914,2.227168943707963,3.4087952005831545,2.0614000578677514,4.348813336903713,0.30090071866288093,3.39689270311193,1.2527165682699848,4.497509863249051,2.676175544448717,2.4884339528077906,0.5690708215116325,3.303088313945781,1.992169896727617,2.111084092678869,3.614273045853019,2.1465890707221416,3.391465796033668,0.394203375527411,3.970282623087394,3.3023255682859842,2.510465544215592,1.8905175828066978,2.96298823841017,0.5209940159347803,1.6032800906886424,4.916043503063134,0.4862962288362538,2.9241345304780184,3.015012770784553,2.29124692001498,0.7043785880775189,2.8108610911841936,4.686808927449608,1.496196091366886,2.4381074838920656,3.6406105842115766,4.4456918689364935,3.1813212802033073,2.7816607037423005,2.198691149666466,1.8151950040699205,2.0562740409901057,1.9915044003733062,2.1381895353759486,3.0906788771383678,4.735060978169416,1.7191214670824806,0.6673644898216502,2.6696707711227075,2.3936878177650134,0.4952442609331442,1.3492748982382985,1.6407586383260109,3.05873661715479,0.7925249395574685,3.029361834550499,2.78333459328164,2.090521694741886,2.2720453043900957,3.091989034902447,4.953264216755534,3.1776443492523176,0.8501264003599018,1.4510451696910698,4.868746886991646,4.394067317491244,3.774322093873873,1.6443191653093636,4.546093482248658,3.6156115376485563,1.395838292479099,0.08479883368301633,2.157674681164057,2.636599897972869,4.60103712232522,2.4605684440684614,2.2356360699421463,4.325443288122999,3.821236604053888,3.59564153449476,4.7309765449438395,0.05369326898798876,1.4627617464655152,3.043691890940725,2.4341255923177805,0.49814986920896365,0.49850395238439704,2.099260525253209,1.963265557085685,1.900447468551677,1.9458166848173697,1.688410946969191,4.063867258465724,0.29997085797342726,1.4819146552300655,4.532864155616963,0.4433746418357998,4.813626059130605,1.0171659240922992,4.673246009114381,1.211492913745571,2.678191872295529,1.3909206871949464,0.9806226602053547,3.941303474926585,0.10938406905057874,2.746615030299168,2.636903236116346,0.5043813966581712,1.325917405417456,1.881229766641983,3.0965109784012124,1.291742413772109,4.953514589634132,2.887736343182332,3.90408941513827,0.8314879000029529,2.349933485954817,4.275657844450826,3.468117900823604,4.120094189161056,0.3262695805021487,1.6347653588286826,2.2678918497747533,4.853299988201682,1.281717483416891,0.329343304266142,2.759280623720052,3.100796909751111,0.6402418968528623,2.9418007129754087,1.7659403177933564,2.004796853503188,3.3789112681754463,1.0947117554142227,3.563635802059072,0.8446925682515616,1.2882891131452545,1.9094415916178353,1.1045216652638556,0.6379735915902252,1.3476988630691245,4.577889298224402,1.855158094098912,1.9170629947008766,2.1245837539661228,4.827772231080914,1.2975638563691494,3.8066390258643867,3.1191002822996783,2.9312225012777002,1.4397085119165876,0.17894213937726722,2.9896920175291597,3.650863936247516,4.966659068511747,1.1906471729885504,2.2802221302716355,1.227569720156897,4.1066075130869395,0.4536670230620421,3.1339863252964117,0.5951377377130163,2.6893263042885995,2.238323018403212,3.674682226916871,2.7161427833750205,2.495255701671958,4.621586107610217,3.107411385097576,1.6095681463954348,1.596204812132469,1.7975530756612867,0.05310417214988039,4.393267426521459,3.0864106071056585,3.505407957647023,0.9801247351097653,4.804549374502159,2.884263543440404,1.1840585589144004,3.3203852874755357,3.4363769124721735,3.3969571697242387,2.300149657927025,1.7469315546488418,3.475970178519332,2.9299831446238658,2.148362164686924,4.546632479677366,4.975212673026067,0.8990375778764403,3.0391848269149,2.996632880271143,3.3784242151474952,4.890706570475734,2.846571356399057,4.057693998930446,3.924782178618478,0.5418976000541986,3.956277869823915,3.7268513036879236,3.059899139130721,2.5108741648799193,4.2015384203612625,3.955996043801994,3.9151529270974947,2.300995911072281,0.7002524109382546,3.392283814200966,1.3834201478612462,2.1129051396890084,1.841712716325965,3.899957475596374,2.3271122340801895,4.5072671530439035,3.826689426271641,2.159801947770191,2.8253577596128663,1.6369264918989002,2.631282688693396,3.3781679246899046,2.2848348951975597,0.6308798636772439,1.4986587712955068,0.9275498803646876,0.06402200536165026,2.252625586040926,1.6760164006366918,4.273558336998686,0.20853546603863182,4.46662220062377,1.4697151769153527,0.9701829041581767,2.5195895938773827,3.951941942384223,4.526227596716314,3.423250328926688,1.5184105809368953,3.024381721274634,3.928104946673596,2.856695935775788,4.3615627754316435,0.48423656649270286,2.9137118756609715,2.4929549110324487,1.5490331493939713,3.104836782628666,4.8269906534051845,3.4125755744333555,0.4960737375163371,0.8110275230247166,3.5295041874213675,1.3648596878433794,0.6055115804464206,3.6578209085147906,4.754812329082718,0.8651628303323777,2.0501828565891875,4.695228033492991,4.500217208161471,3.479363371705161,2.7206816837912884,0.33489298850330806,3.278469699914328,1.751356238033538,0.7949901924407088,3.903446089389778,3.368948551145988,1.25258334144705,2.663482137242222,0.021803720998768705,4.791561785122605,4.618638625673123,1.0994905249620734,4.8765210653550914,0.6292303970217417,0.8025349042989616,3.3487267375159977,1.3098643564842105,2.028569189677026,0.5822422202793132,2.6876502394375046,1.5130950475783145,3.0051805721636438,4.152122851378444,4.1572049711073324,4.762782288089901,0.7731300138259767,0.553366903824366,2.0314316218978212,1.302121840136088,1.8199647094658522,0.00683368741465018,3.845409991443235,3.1390983986901277,4.690466791923833,4.193654888605894,3.049035313600564,0.6858504736275295,3.0478763041731707,2.572977812929226,2.1651850561410715,3.7734226126380124,0.8186717116186848,4.245924771619677,3.648129267305016,2.0215427451669212,1.968635699259097,4.607430409794652,1.7021225042021726,3.9332937409925184,1.9693504939685735,0.41614928850774446,2.340802625969131,1.1915581485372695,2.7432806828576686,1.5376149142346063,1.665235160136137,3.5925813450853505,4.116184077437584,2.71764159475964,3.1873667451490038,0.06296142358637513,0.1854715377932803,0.9461745576719083,0.8090319404315738,4.511856563524438,4.319852157896024,4.940342849679329,3.3813940180061755,2.7584516600693973,4.747443258542488,1.961738639096181,2.9301337809613717,2.375865035308892,0.5342518832194243,2.091025696088804,3.3935380250903426,3.3951528218826033,4.459059692999308,0.7865054273949734,2.7441857252762136,1.914995532599697,0.09559487398679956,0.6435419273404563,3.6667023060398876,3.646668811406941,2.71583832377242,4.3911426854658515,2.7065135147831763,1.1967164503280692,4.6748767373480105,2.5197621169699023,1.791156586048821,0.33819900604760034,3.2489543006256696,2.998341097868822,3.120996231637135,4.983584431145427,3.917164082031218,2.109086874201177,0.4632802025723415,0.7770925543466134,0.4084360940690457,4.3116454820689185,0.013924663309382579,0.342923595061414,2.148801250403416,3.5594758885034694,0.7893193245679597,2.903263443041494,2.799962815560837,2.88984216444635,2.5975425882964664,4.088448637188234,2.492760537018751,4.994598308015164,1.5756246356925019,1.8195118789073117,2.1120753460589956,0.9724023633824452,3.908599867312873,4.820513908673267,1.0103986027066658,1.004483623366954,4.709521767885599,0.4788291482356688,2.718392709793261,4.717490403890642,1.414364568399421,0.2717366776143437,3.4406567602175087,0.5977349008505339,1.9420629255744637,0.5294112557065489,4.781707260392228,4.8484392295459875,0.6560772950736782,4.904984518611628,2.3507227090833096,0.33585690604263085,1.764937422244891,1.231438192274853,3.088326199443009,3.9101592916238137,3.2189721451585207,3.3470457735930537,2.466311631719673,2.3841018477714284,2.1825527587373017,3.2124483060873055,0.2269720042142387,2.9379573104362997,3.9947910970593647,3.9855043773685916,2.55453746685802,0.07955425248271086,4.3869397180385,0.0054321910869903345,4.669360111503806,0.08685840932609268,0.2448698868504473,1.4640015576378562,4.980706662341959,4.639218296348635,4.738879586284721,2.2885320045102198,3.879845089834304,3.507800489898232,0.2789198172614826,2.901208755214647,3.232993768031318,1.1030907003885149,4.686966025567622,1.4986371666889498,2.742813370341912,3.1731904970342786,1.168125211736507,3.2821958686354966,4.253399248866346,0.09626563840693936,1.5457032647617852,2.633921353897933,1.466106093181897,4.803829565235192,1.3315102972053428,1.243284205085018,3.8363908151109882,1.4959119427892453,3.4603455115182467,1.2395887001825834,0.5021199905325402,4.585177948328178,0.4381433079371977,3.407955927955406,1.6963865155337376,3.014825484546032,4.8223029527023575,3.2688349770051186,2.452975288042325,3.2866733875295506,3.4101707819286475,1.1054303439494217,2.7481258655028276,3.305501860354436,0.14882940101537456,3.1997568577296254,2.8546025569169475,4.452050183314232,1.901497562511214,3.4969326719241822,0.19510129870692894,0.31196616340478656,4.535363693791496,4.21875161681704,2.444345852780121,2.20383432140429,3.91163573659807,1.679055079891818,1.319214983800877,4.379634851149352,1.124226152582789,4.879385492973832,3.735513036168191,0.9991921361954581,2.6642569567287455,4.4035075729515905,0.08504611187625355,4.904810256783817,0.37486491146934586,4.239106143665062,0.648698308435528,4.329373085137159,0.778024520636319,4.482263785043016,2.6569557741730954,0.5981154808830835,1.4711516578586803,0.4483976135287482,0.4341273150122571,1.6734780083356304,0.7431290793041334,1.1758137071397734,1.511177411926451,0.7893777465267748,1.110104143884949,2.6845598031827844,2.895926536005815,4.761022300384869,3.8908200877526546,4.152048003727261,0.7571469748312643,0.6340371663077604,4.59489638948579,2.490561027388262,1.7733856691510808,4.176496609583939,0.5444093285974416,3.647006109725417,3.5710077040461066,4.144739497767257,2.6054588324566543,4.506806680941367,1.5145655723170137,4.45638336538094,0.4558411250620009,1.6118090368211058,4.836230998745872],"expected":[-6.640297161058946,-3.9263774079038245,-5.54802680728964,-4.081684676621328,-5.200051343967783,-5.226062980097598,-4.800908524945537,-5.041860947333384,-4.1575385695250775,-3.7978794313958257,-5.0952207085628896,-18.598270155192452,-4.697884561134284,-3.892788710503825,-4.909940331652215,-2001.1114908722557,-4.270132276484297,-14.470757461197836,-4.1857913989851125,-4.880151030349379,-4.435466851085199,-6.971068226784364,-6.310616391259428,-3.886102192399658,-474.7244669038822,-20.9107585413051,-3.8953684896800658,-14.640334105662228,-4.525639032422002,-88.39908499423223,-6.521206347230573,-8.583388726963305,-3.3162044112296365,-6.2504742691469115,-8.855413798342893,-1.6113087710476681,-3.185644675004399,-1.3906794860943386,-4.7784576291169705,-7096.428933811065,-4.1492078375415575,-3.6747041768067854,-240.7784595396923,-8.517720896501121,-230.52925590064675,-3.80922306890051,-3.441275186238067,-3.4029256016925826,-2.556439862323144,-4.275581836393565,-5.545135547221828,-4.612400709755606,-5.085709260536883,-5.493750233024961,-7.03185365453161,-5.833122535044805,-8.0215675144405,-4.8961277390731075,-5.279973143404302,-3.1696849040463153,-5.013853729549969,-4.790021431310036,-136.4089076993122,-7.195960713570464,-5.8506295819096295,-5.147627510930746,-4.155624336931722,-4.110845201164929,-5.621214151656211,-5.581408506258009,-4.730000354901022,-4.346691903303374,-3.615941648379967,-4.454571027358853,-5.96185993226149,-5.4833798203094855,-4.794206048470219,-4.281357635402188,-5.166464097427211,-5.057707525948832,-4.7014960890926,-97.62197879729395,-3.6849093787989973,-56.10598948926569,-21.55545117810063,-2.7752982028189743,-4.138908350897108,-3.8038559367152613,-5.29783778868662,-11.835431627098862,-6.205012514438266,-6.321939240126123,-5.145002530369444,-4.475422892431143,-5.637072824733375,-6.22447725588098,-12.396286701164174,-10.123024925001367,-4.300139968388239,-5.191870933557125,-4.239595386299829,-6.1333613216852365,-5.013478733045243,-3.8813306930824294,-6.755720014721603,-24652.101238347328,-5.788547780933051,-4.385101370705913,-4.417112319529705,-5.183479513718623,-56.04432977092699,-17.06753987346373,-26.697115391675503,-7.344288994871272,-3.0620710041017434,-3.760599328196874,-8.236645285601325,-3.279521375601628,-5.503637999083871,-5.153925333881416,-5.305169467100647,-12.482786838071506,-8.399894667613776,-5.288865570889689,-5.496190653328092,-5.957585217645494,-6.735031732889632,-4.697857973141581,-43.344453757768726,-4.511568532857435,-6.038711419057492,-3.975470242081625,-5.486437913965792,-77.53427918739925,-4.398466074734161,-4.552168148041712,-32.16566302389707,-16.485571348277944,-4.619064877696164,-4.613426924975428,-5.848278542023186,-5.9515492410251705,-4.898512126629863,-7.005448839837454,-10.603154676682845,-13.795735579301395,-3.477686285150978,-6.378001205605282,-9.738635281923667,-6.4045746101658505,-1.5726183048644722,-4.67909137950118,-6.7926910718180125,-2682.2391740248568,-6.015370336412949,-14.543909880783607,-6.738546908622654,-6.1642470332097865,-5.998936367074442,-3.882225315105111,-3.144119672888111,-4.883920827221861,-20372.243185332518,-4.229053275501631,-4.045868238735703,-4.441138830835646,-5.155166543855097,-5.158011150221023,-9.754665992391374,-22.337990906499996,-5.343717803623198,-5.020585055384855,-8.072633192799039,-6.1213465335687935,-3.245777643823523,-4.794618659950917,-7.807295027024845,-4.82578927445677,-3.5932226537502574,-8.971897936525231,-3.8066782379948516,-6.684673114342475,-2.9753143062065486,-7.911645683058636,-3.513277668878712,-5.052114523295757,-6.377350019394304,-6.490088246231103,-9.326379518746887,-4.258378571381433,-4.905146220920944,-6.1001613531241325,-3.8803123745510324,-4.52668050099179,-4.777402951215804,-10.366332537568308,-6.055854554596326,-2.121064846530167,-24.10334759521033,-5.311679059561442,-7.075272370605545,-13.201234415687113,-3.4803483644494784,-1.6539420387482022,-5.001777323790377,-371.04243101145863,-3.994082155079168,-5.135270113018698,-3.7642267818950232,-5.397939264476896,-2.514451215020844,-2.787366003126239,-8.141402268117162,-10.63493575250155,-5.460199945352313,-4.689297805078885,-8.96444603883345,-5.217770223445059,-6.215885951267312,-1.726071549027648,-4.9771469370945916,-5.354983186804443,-6.2154609174994775,-21.773578432253043,-17.12123887294863,-2.828992675677924,-4.855853554845009,-1018.4024324080491,-8.35608822922878,-5.143163914810586,-3.069487256330542,-3.789383391341879,-50.80373207223288,-5.374860385050813,-4.974200700598311,-21.511719940640187,-3.7109627349316407,-11.528939313570362,-9.743289282793015,-6.114799160936922,-1161.2019411027534,-15.253144398387658,-6.468107411910696,-5.363983302194794,-4.935282329896571,-4.58152938943076,-7.7420986311997355,-3.1477743578015094,-47.839516727887585,-7.462903543584502,-5.176736174487978,-10.63378689737003,-5.139452890153048,-1.5067275371118625,-7.3142319423827615,-3.747149614112417,-4.615914454706553,-3.7097181915485713,-5.195412133466286,-5.521305460061494,-4.533364971558115,-6.15159340042866,-5.500849866789485,-4.309851049138082,-6.188501736524155,-7.756752056647159,-20.983304256683006,-5.1025375369999715,-3.886675399740618,-21.88967057129431,-8.155854578216914,-4.825087158902395,-5.048188531967191,-1580.2066866694604,-6.580788284242586,-6.044479161284601,-17.522101130651038,-5.917929530998876,-4.270050908011949,-4.7964943330902265,-3.859831025398082,-4.206148436201376,-8.340577718736121,-4.077008405167216,-65.93409896150375,-4.897107447126357,-4.573755730346163,-16.497499439812444,-5.161920659258753,-4.949178913936391,-23.691154440664853,-5.396755949912624,-5.229267585236244,-27.516975068876288,-9.797256115740261,-4.091469726280255,-5.784428883045619,-5.052543451632021,-39.98284274819665,-7.587238960270577,-4.497140708761617,-5.372645157238409,-4.93228595757337,-4.762518416342021,-5.6886299224663075,-5.93887509099187,-4.235785029475551,-6.223807521385156,-19427.396915015073,-33.13965308380476,-8.61928100036727,-4.542783006028444,-20.592610289904446,-4.745969755649475,-764.980186531574,-3.5254439660601977,-5.329483782964608,-4.205023858064138,-4.9802692622052005,-20.359434230103922,-2.270792417552639,-4.657955889214139,-2864.8053478019333,-5.196361899188648,-6.947572472639744,-4.313592256937051,-7.1784715088120565,-4.456713830720497,-6.039495487699547,-3.8956338316434036,-4.6220921273307685,-4.569719671450161,-14.648065197695935,-5.1633551181725785,-4.679626280277923,-4.5529653186719425,-4.834100296553331,-3.9442061221718605,-6.158247011183541,-7.824968431744519,-5.665777808579739,-4.610095211640125,-3.4322892514388066,-12.324925588301847,-5.120267777013845,-4.395125771176449,-3.7689846299833913,-7.3002159698911635,-4.47957818347061,-5.435515138953072,-3.6406925953177356,-4.94748986413231,-4.567830094904462,-3.4867688402659582,-2.499348767914411,-5.479843745851167,-4.427139647155448,-5.130995195364463,-9.863436949326797,-4.790945128169115,-10.677686505504019,-5.04543355605654,-4.092390288770879,-3.4902526095951867,-4.805239176157972,-3.7535284779707396,-6.17493776822184,-6.204986332289462,-2191.3431515329958,-6.985804726415717,-5.161574761092348,-4.668062808611618,-3163.9787620853804,-13.236008780282841,-16.22131319397256,-5.858199971481583,-30.980130889214895,-8.780645975295572,-7.203291967089002,-13.221694438872044,-1423.274355904877,-6.028399283104329,-6.469146733177622,-4.891541635313844,-4.889905758190375,-1533.3629864143807,-3.4629991286416173,-15.112271450440517,-5.170642340918349,-25.054209789380096,-4.480516111542969,-5.80307538371221,-5.390423084914869,-5.496397519282037,-3.7016737196096425,-19.221789750885044,-4.297395640971255,-3.8276868120802643,-29.875187118043506,-6.227246132498349,-4.774146510665097,-6.151742603434467,-14.080254957999276,-3.1920536346755775,-4.110982890339213,-4.222437880111385,-7.50614765231748,-37.60816311513513,-4.958533877062219,-1.0778948616009288e7,-5.470679897053772,-44.98368998328717,-5.318463791327545,-114.25358490164457,-7.286530661762084,-6.377359331277917,-7.223014544341407,-5.21167620016097,-10.030007702799786,-7.023841200431404,-5.775064317450621,-4.244958324287889,-3.7938593423755584,-3.724017916281956,-340.3753847091457,-7.350356863576929,-3.3754910889615526,-4.615341358838723,-385.85469883267024,-3.768985730193809,-3.850219053797006,-5.200340071238912,-3.8044423537450793,-5.113975753906095,-3.0633253170664974,-2.805911858462779,-6.211253610051654,-3.8733327271184357,-4.983173915985821,-5.154263078497149,-6.386391468243758,-9.30695471648918,-3.7368464199341593,-7.717800279243821,-2.2522050121693056,-7.595896551318673,-4.449659993338916,-2.950763374769195,-5.4227895720953345,-14.490440178119558,-6.36457560497127,-4.177636794721453,-2.9209860647129418,-6.661996835252156,-5.3010005188636535,-4.949549556244925,-4.899252663640347,-3.7828942974969055,-5.56528214148929,-4.911688353809232,-5.679353705117792,-4.384459566547642,-7.659916503526343,-4.281712959948122,-5.1769555236638904,-5.318184260633388,-13.433756268851038,-6.626455089319868,-5.118091763067011,-5.007807791483977,-26.817336901609067,-4.782185875534157,-4.888920668433627,-4.817979049560128,-4.4703560504702455,-209.36530144994566,-4.525451162044327,-4.093886405700707,-4.679086711291963,-1.8573765371938393,-4.346475056089242,-2.0263637072990996,-5.975888620907621,-4.938709299622921,-4.192656888936183,-3.701003081995892,-6.050471165677681,-5.093241943622761,-23.353804698557365,-3.3050470567871626,-5.8518536970546,-3.62167708742008,-5.3225712374458585,-5.182074858761566,-9.329105744868015,-3.675387409525989,-5.330318526526338,-8.474903995629651,-4.666923601738802,-4.662119856227244,-5.586539406613637,-45.1086781689762,-2.446166615182031,-5.276600086643231,-12.308824356630629,-4.920567235582384,-6.449018473690884,-5.291507663981765,-4.218128957584813,-4.263107480963708,-7.994682263561323,-12.197487700717398,-6.295846227425788,-2.2827473624312837,-3.4296830729437877,-4.515319117214383,-5.891942126484683,-6.299205755362601,-44.377909343353025,-5.095623974464872,-7.279399246906074,-16.24052661940638,-20.325764713241924,-4.227263515679566,-4.955203935305331,-11.746260915254627,-4.242544465133239,-3.618538175489821,-5.4894244183280385,-4.412484770279409,-4.93831584810662,-6.149316013137961,-5.487099977836049,-35.80745512119711,-8.592510585701918,-4.857482962592464,-5.137445964027281,-4.812869555218379,-7.410943364021557,-6.270091675580797,-1.3875876288586388,-5.6243263675029285,-580.8252752792131,-4.4132644157103345,-8.157222115492992,-5.007374709207444,-7.123762221782463,-0.92215164292932,-4.599266480888211,-5.32252327090664,-3.8085214464454604,-4.162795102857539,-11.227863008549306,-19.852178736326074,-4.9054569392047025,-7.596179977397872,-22.049205074233413,-7.767107474284579,-9.997521055450626,-3.8963932538959067,-6.5891063365941545,-3.579152029624672,-11.234029331714485,-4.648017088903577,-58.46882130655398,-6.56342743786952,-5.550758498713861,-5.791065333532423,-4.7779770831654425,-6.442639085364908,-5.008791809067084,-3.442031137202442,-4.528271293190665,-10.565890593944859,-21.3119199264065,-4.835960224099105,-491.642386420173,-4.660234268750676,-4.692510355181757,-124.34763721554586,-9.613706568449235,-9.939207659208309,-5.020155297094014,-12.456159184474451,-3.8896730356336997,-7.104320885318508,-5.828693659964783,-31.273274164657774,-7.613424632992275,-5.326306838500329,-5.121632946397481,-2.635289808319769,-36.55319219423988,-1.192148899530163,-7.6121400938099235,-5.126659975039503,-19.122672755070894,-5.433335307991561,-7.098748396205938,-6.2608303232798885,-6.3805190811032855,-3.8923606413573326,-5.473327173271296,-4.770083866419434,-5.035403549618984,-4.20916569775618,-6.668034650792006,-6.214354709588178,-19.342862366378164,-4.195191770998926,-13.5978072231259,-55.90517120632299,-8.851219860909435,-4.797680610452311,-8.880125349228518,-8.245799176337558,-3.899907474244637,-5.3499137112213955,-20.16069512518692,-4.865848587240297,-6.620994687916827,-4.936010212613038,-15.705154653985739,-34.229851027376235,-4.299907142199112,-5.2677882297134,-5.519940659763643,-2.4691995243485843,-6.992148032987064,-3.7910081455921247,-4.957554107015284,-17.46059055694949,-4.789674548848783,-56.26242228011599,-4.870455802541024,-3.22196794893739,-4.878127606085057,-5.675063047019178,-4.539663923219841,-4.913591334004696,-5.056776577390422,-4.231266507941118,-12.8291559135514,-4.543805063450181,-330.53440352996284,-5.998377674010387,-1.9290070202917584,-2.603366239531399,-5.981995102345131,-5.730333922670118,-7.54141463561233,-10.887328935878328,-6.253288134762164,-3.82001562452911,-3.7180268017105567,-7.327960785757342,-6.634771533619003,-4.950399200943645,-4.121758847862936,-2.4966061032215805,-5.4007378859851745,-5.892777973904405,-27.019481531372413,-6.269908494077281,-2.989255318765169,-6.052808061533472,-5.7237820092980325,-5.446407270189568,-4.838484584576409,-4.453449861212683,-2.5874873800964275,-3.8316876242479365,-5.298413730504587,-6.332254715085616,-8.300257645107324,-5.533910473141655,-4.655815138851842,-3.670176142849951,-5.298159776044976,-3.401001348453003,-4.939286502315124,-5.828741078031878,-4.678814972455875,-10.015014243694925,-5.060876627696259,-4.977868869929836,-5.161280606080333,-3.269995132764662,-6.15101814124824,-7.010869999275709,-4.911004072919911,-4.789469336137623,-5.181515941238388,-4.9946017995820515,-4.474754991293161,-14.972198045514062,-4.9488421168223695,-2650.836935919852,-4.3799438957618975,-4.237518334429027,-4.940738087109997,-7.274499478547751,-2.672345464716938,-5.301674478767627,-5.122467155272948,-4.8330763979933575,-5.635294897189483,-4.919252291133359,-1.7677929906268652,-11.707694275329528,-4.471310476921489,-4.699604969016603,-3.3702180279099707,-4.948375481192473,-122.60740261819491,-3.7307788915887747,-2.891732891284133,-11.018079386214314,-4.665822056451018,-5.207295715827578,-7.0739938334564645,-38.14411208210195,-5.35954591281949,-4.511244787716558,-11.473520204268123,-10.900229452196394,-4.646623809961367,-5.192317417542616,-41.310126371773805,-6.666156688556084,-4.9982546678899755,-5.585356539969776,-3.4163582454928254,-4.273872803122538,-1.57641147800679,-2.429056269468773,-11.732350746598664,-3.268733599080103,-4.882515826100954,-4.798810136588664,-2.4957173551837917,-5.734200349474819,-34494.48542844422,-3.297672381939754,-5.906387368536597,-2.8739988370378735,-5.253365154588447,-2.422387819564962,-15.328406581286538,-6.703498985194344,-5.173180589210425,-4.013977599446998,-25.92742753317528,-3.9996446385018176,-13.393541030095207,-6.395143127875416,-4.294251200338073,-4.986046392682589,-5.621622385407422,-45.2224458140013,-7.294061011811606,-10.285807604262374,-8.55232231219086,-4.161425061625367,-577776.9253780171,-5.496855232624473,-5.648175081438613,-5.060653234652051,-5.935486205660356,-3.0821075241138414,-4.40467002031845,-4.721486986829628,-4.857753524524326,-4.001820984687604,-3.933348138791305,-3.1433830140935184,-4.050483306857644,-5.455087578495679,-3.449592494414995,-8.516373656328037,-5.360477722511056,-10.340901988814071,-3.64357143855608,-4.804784989990505,-49.161002581773246,-3.545611339178689,-2.867408490350751,-4.702244887085463,-4.130651330310507,-5.35841677770725,-4.735465361745488,-5.249965042870549,-8.583971418258926,-5.130414541973899,-6503.993446565478,-492.03271428434823,-5.482859748331647,-23.41368139966295,-1.9178783372540074,-6.063825374768192,-3.5755575213701354,-6.374139379166436,-4.280314391251334,-5.386060899839201,-5.305397686048368,-4.988422405187018,-4.474928024845566,-103.47163984324372,-5.101131657767919,-5.262294009077046,-5.774074898310636,-5.4967860786584986,-36.68172597056016,-6.544969814749557,-4.934114175045894,-22.050466748456067,-5.6103512126278785,-4.36394772098722,-3.822912997416542,-3.633015947374473,-6.256152846347616,-7.856408039955124,-17.96162908947044,-2.123791955304725,-5.007515173839456,-6.195406036576834,-6.63913475927906,-6.688293830651603,-4.013844391084099,-5.9592889867096765,-4.498597722281876,-5.2862967185052465,-9.630740823796582,-2.6611978297703986,-3.7570117585811986,-5.885586403365966,-4.9019117619371215,-49409.669412378236,-33.2532560863134,-3.7589310397138638,-4.411353300109383,-38.55845780359055,-4.377150822133819,-6.178492691605951,-4.5529914034974075,-4.476642101554821,-3.7320986512805985,-6.107087629700342,-5.442095182853966,-13.648229438735067,-3.7847423637689954,-2.8641777930993246,-9.616062309024901,-5.783415678982046,-5.121104046371697,-10.65881494659861,-3.916854578541419,-5.066817758942276,-97.70769707937986,-4.954506540016052,-5.03781421749243,-4.216989770228671,-314.14357653699676,-5.409321325130776,-63.035327838868554,-7.073807829244101,-9.968523474546274,-3.3547245809259065,-6.001311241445379,-3.5865435393521876,-5.2990350077753,-8.852025587215218,-136.92672102651292,-10.645637861339061,-18.244706486466104,-5.131399449926462,-4.736683850928479,-5.0490785622592576,-6.189706671103758,-0.8877858322475323,-3.9105887901696166,-4.468825724290321,-5.7506947342723596,-61.12981343545528,-3.759374835609644,-4.7923350386712045,-3.190671043951963,-6.222436913478252,-3581.204335238663,-5.376377163232021,-5483.053474323624,-4.53513007226531,-1456.833632286603,-107.28250548268056,-3.6991045263738447,-4.593398544170363,-5.159217778642782,-5.003890046123906,-6.35416220812501,-3.7333830368798115,-4.852196414716926,-20.85022194357926,-5.422537583750273,-6.6562058114816685,-8.31584114118317,-5.010210376228472,-14.949936973118039,-5.0287222895965815,-5.335200983350825,-4.659304987885127,-2.3183888679423537,-5.2202914996201955,-310.770518974563,-4.419859256604536,-3.8185661144052183,-3.2373471591294005,-4.2468726814606566,-3.097226200114406,-5.44815816881159,-5.543473109477572,-15.539637581251672,-5.996020917710633,-17.673023977645364,-30.5803131154267,-5.265025190644893,-10.972183402952856,-3.66200869604251,-1.5058390625263471,-4.5348785393874245,-4.127457987201699,-5.478123318491076,-5.38644387184769,-5.318855903846174,-6.652198921104697,-3.704292497342843,-3.233520871982097,-6.202410549101879,-491.8647445367856,-7.2730373964507,-5.353282187400248,-3.2186781426909006,-4.551939788788273,-4.233872009811016,-1.0550904688115763,-42.954147336036044,-5.059042544497467,-5.841313366472765,-5.188089976239404,-7.805781982706332,-6.1249201131094555,-12.267987982884458,-10.101041310252214,-5.214892164136991,-5.161889127342631,-4.686654004385694,-4.763079967192807,-3.65888260594418,-4.710159533472992,-4.778958499565647,-2624.8333960117025,-4.038373905802005,-42.66954601043068,-4.153231834903286,-26.7294961432717,-4.591245832176354,-4.67393639131822,-4.648172513958813,-4.322553002957787,-15.589228040984612,-4.943975015829775,-142.44188398572106,-67.84498328072156,-4.091659278947027,-2.6096043072636768,-12.091416784907976,-8.247016101298408,-50.41586294748128,-21.335835865555552,-7.390469310006232,-6.3889210572073525,-5.504851393609648,-4.074554169957013,-4.821004878773017,-4.706115537554587,-64.77244249024386,-3.1135800810501326,-4.844500771814174,-4.69704816908391,-5.2522915399470165,-81.57800182444973,-4.835731515295725,-4.53847819750651,-4.320545933401425,-8.204770587691831,-4.895474232659774,-7.766622417698491,-5.169640470873155,-6.310070477632122,-4.022410653620889,-3.9620561118785185],"x":[13.742610874858464,5.986006091433613,17.654783799204267,2.1884661752117074,16.731791620110954,15.706534649461723,14.959018481418012,18.28597704131826,3.096269203540376,3.038719122736828,8.795171600801815,1.702374235311086,4.114872856833651,4.2372486190865155,14.735642776748294,4.875520346764262,9.008723827213556,7.3705248100762955,10.140876050975338,16.562622873665156,5.077861899434701,11.648941213252172,19.243338088799153,15.888548999107481,10.87721728500997,3.932071168900655,4.097503762805426,6.568327825195692,6.458453576843084,11.207792217302543,19.170560779884646,17.81835870800945,4.718577363783201,7.34627858223925,17.61730043199041,1.4191401359541267,3.6438874745280447,2.361049817267351,12.258003472089008,19.797246944731228,5.779523231312602,2.153438551714091,2.9684135838030334,15.20660854610103,19.50348757230802,0.6908424652398182,0.3145338086766758,4.601847573020552,0.8118476485313719,8.469704488689995,5.508893667836445,5.07601023516937,12.631422265237088,12.873699569515749,3.853708948630472,9.179266156752778,3.701737260282889,13.180479423468917,14.369720352223258,7.604341339684386,13.322489374069733,10.273632073566517,13.570693416856212,16.12091864729535,19.805252935135222,13.434009614307708,9.0948094057328,5.525239502686996,8.707143829820371,15.346657123294047,1.8372455196599136,6.50947925054338,6.033901876469749,19.131793338980398,19.114547154505118,3.8110740918335484,13.739310634257627,3.3373770177194384,15.049789047361916,5.640536715449556,9.332951941348666,17.737725210301445,3.289812132241856,10.481311000659034,17.218876171133942,0.5016608659621724,6.384633650125164,4.551399708171875,18.55955740433856,1.7536978688010008,19.767336885363093,14.078055200137287,17.98385808218164,3.9738472771972555,12.946231211703175,12.055842073889703,6.501715876880376,18.76493638735441,13.278045123979272,16.567985988035915,7.846639312724757,18.377576056538594,10.952256755287317,3.743656470780752,1.2541420047489282,1.1492466776917754,18.40830907837539,7.313470358383896,9.079650311081263,13.250353187629266,17.61812549828511,19.854651428810154,7.347626631528255,18.121105531338316,1.913350264208229,0.05696561659447763,15.652957698818199,3.1754997864784773,14.115276205483603,5.5124226392521125,12.803092337191742,8.093494083588585,6.15770290058006,18.799146410813204,13.814289694210412,13.194467092674728,2.1559089773774964,12.81835802641488,17.946711572405064,10.50471015546838,17.461520215913893,2.72502662392871,18.679259705082988,18.25733838140046,2.1387342862523173,13.62956281261916,16.305784412327387,16.067675539075154,19.854127684656852,5.332743307726462,12.367814891518808,8.720461606589232,9.631291532821482,12.668198470525759,19.13424150088183,15.370269204241911,2.8583034068042013,3.2700693153465066,12.235538062366004,5.892398717817131,0.992380343186845,6.312368899555483,15.484215504578591,15.923957983865034,6.356399551860119,3.770328565615726,7.0542971786357,9.398378294301342,17.176025836734347,15.000308365318723,7.9910423321846435,9.713029031988398,18.76707088738405,17.53653633042745,4.995677732924171,14.383606407899038,19.988995205985205,17.2558285233619,5.413030853097003,12.856259746258086,17.50557301830876,14.186488249467505,1.2269645499529647,17.820599771623016,1.5260883692038174,12.379491074252101,10.205856734929558,16.077289047195805,3.1409992913982787,9.311965004125202,1.0418869598608982,3.7026737283504874,4.019204909269174,18.747494665259016,2.9945941029585432,9.815357631401934,15.676293326339268,15.463212460380715,4.726579760817962,7.557008910469505,9.81666694154967,18.254469880873604,2.207976300227239,9.100123896592965,7.869680046361562,1.103417735369363,16.722788815312995,1.0043390713869549,19.05889758182902,18.082905904332833,2.0622899811960105,5.862676597913379,5.111517273091888,0.5841602432694826,15.150190614656665,7.495201923749364,9.621351068266065,19.127626296230073,8.185817855563249,17.23498924944785,1.188327077805833,9.43910957472687,18.198567726360157,0.3804299891924723,9.569593916039963,16.042721552228198,1.8659130066938134,8.717512504354445,4.380320745815385,3.2322693792052526,13.595887186260427,14.95384389140861,13.702034550566244,17.67608144145688,8.315705677016286,2.3572555516075777,18.22076637093437,11.930182783177061,14.490072582791003,15.095245880347502,0.4190028888549957,11.886246432226276,8.935913796912565,14.946544372748614,11.636613410188797,14.065263651678638,10.247126181024564,0.5543664255814695,15.344379421339816,7.027304869464488,17.83359939778354,12.845949346079788,13.33215890972209,9.663491553657684,7.358524935195074,4.910223107026694,3.8949685580451154,2.8895721898300186,3.2290686796301005,18.861612461701345,16.637555830398906,5.3506222183943475,11.013277701270813,5.8500141912116055,2.1992049659217905,3.5574030889018715,8.855121796414869,0.2160551400623545,16.014150085426806,10.449031280894943,3.1320228518937254,18.582893963813802,19.757901427950944,17.36793135767677,11.768237016880128,13.800849103992654,2.3362219021467734,16.24965241957817,5.049485430662166,19.88334450773804,14.559360094060718,11.683232043593899,9.36533213871661,18.348734043347118,19.450700336353314,17.23084045921885,5.457473517519866,6.179482001111358,4.575628835555179,16.97293555440399,4.349087822763367,6.619882617602366,5.254904945992549,0.9448223994868954,9.665980782289768,12.917091693816465,6.376929720529945,3.818799671467743,4.1975193863736715,13.773253377082106,5.951665119398859,19.14219124447483,17.4227244862757,7.282209375118556,5.116441983732876,8.771886241367426,7.583935837401152,15.020856481938072,5.779963604425498,4.954998816093026,4.692123060040245,17.455599861973944,7.405538266100202,13.114837349794989,14.389063614133741,19.465972844895756,1.1975830016119682,14.720689165261852,7.592177876245736,0.9276107117308641,16.968317967444648,7.288554037627821,0.4165705778849693,13.875409456436149,8.967463735034823,8.333551139553768,7.075125673808946,16.216485699564878,0.9104254618387353,19.92757892009874,1.2474385814534816,1.585189528139681,5.130750408784994,15.756447966319694,8.026744432681884,16.173297520518556,0.129099445624834,7.09570878826673,13.461575789059083,5.979799081215531,12.65926849579067,3.7174069190404735,2.6376153296836113,17.67270526479889,6.994560088702211,8.502409345263956,6.942970875815551,6.136918632015287,18.422455230700713,6.124091943537144,10.648439665385796,7.1215841186020645,9.885246101221682,4.147763144440719,10.899296392055046,1.0955252139914773,7.0230671852585,10.821463649689974,7.542388700009983,15.507282870639498,2.434564856403676,5.304373628655936,14.207292924211515,3.500890356160764,0.8251433423696541,16.28992778770677,10.379172955776955,16.14342100677057,14.374990264777976,10.409751179561496,8.739005643728706,13.787105671400873,5.289851772654557,0.7952287163588467,16.39453749709663,7.24623368805533,19.695533969841698,12.128391588744321,19.16596940274684,4.070338418848292,14.660538883772173,13.806685058770691,19.02862516935429,10.096918787672756,5.099640466862128,15.088333601902072,19.17664873892846,0.3906865003457938,13.888334990959791,2.3843531921153405,19.810923305388442,14.900006306624313,10.228974833835768,1.975126388027797,13.402022813592733,2.995442632384231,3.4198848192409947,14.293270489209835,2.439882398467228,14.36230576624883,19.952866089447042,13.081756044155268,13.623746041265768,18.84487071105621,1.0621141700798642,9.576470356434923,6.785819961671673,1.2230335718987728,9.450904201706702,17.60958783105682,2.8535403345012966,9.95602607468113,4.701422752752462,2.82893712456342,2.690406661047806,8.173835649547208,10.37582060942404,10.566937897437247,11.74300915626426,11.985491294190718,4.294149085371819,13.16584686889569,13.797629636857902,9.88210419560033,19.913189059909442,10.439562802519532,7.256247961823021,13.889266710669649,8.020844844604632,14.848997438006277,11.326468236579036,8.941759152603929,8.859751073701823,13.935417428801387,13.816726319015737,7.27984721329515,1.7827993845393308,6.1570850923846665,1.8102352640635244,2.0682692756023124,5.468837194045837,12.00625076967552,4.329954542492036,1.0059253424020076,3.6605171999231834,3.5991354522971397,15.123787865318725,4.8651494139293705,12.659441235480347,18.61855305144225,1.0725405869406357,12.393457973121356,10.085120598779804,8.286194900783993,1.071916495144114,8.368993472468066,7.591330229416986,2.6070578700294256,16.087651510253078,0.44801172980778237,14.80078265098931,5.297337012634493,2.932330112779211,13.437888634456204,17.78652555891916,13.579084620273427,13.598969337659916,8.780577974555165,18.517583135266477,3.518979338717143,18.513781600109244,17.585045960576373,0.5278617001681463,10.256783605349465,14.254274024251906,19.94443440792798,10.496901193746769,14.17488867312445,17.09151902785594,12.8341218879826,18.292151012673074,17.674912937756616,8.037978615297,15.294350366051649,4.912492190867006,5.573856716917303,7.162239972695339,11.167255760735557,9.549693321116415,0.9459120430863344,12.23764108654807,4.358730489647233,0.007352552949480007,5.13421454830389,5.234516825873707,3.9420268825571814,7.021624615420952,2.872692860818171,13.48064137374001,1.411256505411158,7.233320426318928,5.505310958471439,6.107843182164521,19.572651330140122,3.886747955525487,0.7675557350775586,16.639992367288666,8.390894985268762,14.461346856002844,9.68532050732489,19.141583992728602,19.004525892226418,1.111929561193623,12.413451032894178,8.694869612626226,15.58501820803178,14.307429643193572,16.052783725968087,8.054592590161826,7.179431675700365,7.492158782595566,9.316024330818188,0.6885891937796762,1.6480096852681214,1.7834390542231926,11.751526821483349,10.275606561716192,12.086107895508697,0.99321930622708,3.496477269788878,16.261241081705794,15.246518543395013,0.194477543378353,16.29137143576598,18.400335146328104,15.610562504223427,9.097243301005232,4.879617289552223,12.107962199699127,14.250326375273762,17.699903306263195,13.544157213720593,11.055822149215665,13.574108794921521,16.438120101584598,6.218182374662917,14.821870234923127,12.322185830074869,4.480141104236348,17.698303998861164,0.3923432973577867,15.21986706973868,5.011929847839975,11.649913616638731,8.881948403211295,12.354787228419234,11.860086303814779,0.1023618072611221,8.9548297631808,16.578606023947927,4.879199140952251,1.568606438480069,6.017037773241665,4.040015000566357,17.297152722227555,3.3514911635850186,1.2754409808813572,17.687351678094302,18.815667770404243,2.136010184162056,3.1141610525423458,6.951930696299904,10.630116100274044,1.4416434877566964,3.8384127193913242,0.9727152714079024,17.2396702808591,9.86705525039175,2.55847360693636,18.777030029963843,10.497141421352985,5.775357291638246,8.07649395491346,6.414876541142709,18.519451599593978,3.168201797442425,16.184843111737564,14.344368629845793,8.480650803202344,7.254013060992035,4.738372428956135,9.8870030014763,19.306047814543014,3.360724213434092,3.928599926883609,0.8131098728257902,15.028551860328218,0.451989201746148,5.882653152246626,14.283371887086481,16.548694376200856,1.2993595344313258,15.909389701989888,0.6317107883237938,11.292747967903939,8.967629454484465,9.770188076625992,16.120801703160407,13.960666084688631,19.852257462022173,11.40541453092293,3.355793821031239,13.480657910262943,10.454844292987335,6.030879811882626,14.534297487705379,18.996477357206313,16.422329882855365,17.562413540229898,13.648770650942414,17.63043355405847,0.8364674430396102,14.799386978369728,1.6774971927786408,11.28605843249623,14.009662720816056,8.348430172635183,16.47052466461939,10.953837852559346,13.237343756413882,2.729447004222525,11.378065028430711,8.029041422699228,7.329447780333891,2.42350988954823,19.056239381819033,17.545407146488664,3.3099992167701586,14.940872672077067,8.52591308258145,13.818396745631372,3.273561758290535,10.601060843734649,12.590250165189204,15.368939786636368,4.014092368570568,8.323751398312726,9.389872375539374,14.93851026573346,7.153178329195651,16.19512861600431,9.175809837063138,18.521405357069966,17.283640310149863,8.547185048791306,10.32703222392685,0.2312391255519186,0.9104401154556907,13.02224953330304,19.718000320693267,15.752877775781773,18.584014093096886,5.336539045565076,3.539099150293068,4.7245167671330135,9.477040233824287,17.707520935454276,9.069869823572132,0.9554858304323499,2.251098394800759,17.27982412340783,9.887954127358679,19.51108162659788,4.217516524643101,1.5286563107051832,16.63594147128238,14.672983742617177,11.861169604458173,11.929007564852117,8.720272067472376,9.785482080985567,4.623889496851179,1.9532334783536998,7.051367122773993,14.509714145968786,16.1513419491257,5.6420644650316865,2.5370113420786256,14.784600383906072,12.686767860920266,14.980833631030755,4.306166840974424,11.769879029713714,4.228401775924744,9.460820376274942,8.654157643221176,15.34199996858936,2.3515072307263196,13.055505323141263,6.952886336382211,18.937357224485844,0.8170708276766891,16.366305663106342,18.545675756982764,9.411981889028972,16.951353366461326,18.660061165676552,10.116974275367529,5.746338043249852,14.472028323228772,12.751945273681757,13.130553003865376,1.271787341599584,6.851200606330892,5.310334563392476,7.6933446344602,6.994683561136759,7.494027745534608,0.28333976243500647,8.875318849098544,3.88916697634639,11.104230131841382,4.056042432778111,11.18404070153186,9.467094019968197,1.4769662587115429,1.1286040609376746,8.858979941195958,12.905657161045925,15.078657224909403,19.300919854422084,1.9612570993163647,12.312288731548522,8.577902346740608,9.310554608128339,18.9167855463514,0.8925989680930924,9.905396725526106,7.162761780239988,17.259884606949342,10.416137985828309,16.904897753663963,1.1130950330038702,10.298808781455296,5.121731835349603,1.379485581105988,10.006082954331044,11.749750243837909,9.836557103825845,13.25182264647314,3.335508462129293,4.400662967944506,0.6663461272746884,1.7496181745633743,18.8000774858613,6.423889138721792,12.357968879451926,6.552012796363846,0.7368283546195808,13.180400281489089,16.36645281624139,6.253515065503685,2.6049407692924964,5.753042360339893,1.6472883683327,12.786314110678422,5.272560621633047,13.330558001483194,10.57527605600689,13.968984065202346,6.091590889975889,5.372714395554059,5.69929687958564,8.329252798620788,8.254413952376446,19.113597291304245,19.65349863180524,12.659603740255974,19.635359012443057,2.224581695662753,7.832682745656676,11.79167029653074,17.135439594742913,8.800973995011617,3.0226987399569127,6.607636805505903,5.254169424726816,8.855264112707522,5.967316310290047,15.909040538028867,18.280138764824535,8.976261985103996,3.867353662295625,16.98222982390396,10.25387960863904,4.3576793982680995,1.7673459674706304,15.160629229208595,14.30883256326624,1.6583800091628298,6.778493012919244,15.317822680661113,0.1712710099274828,17.63988184887086,11.605340063769827,0.13990730553484543,5.313910592832323,9.03133668822143,0.31765757395796346,7.204410833862598,2.7079466290251553,17.101791054045485,7.895725897780426,18.303181942345788,16.658317116018434,19.657087418041193,4.688133341568719,7.046965049058489,16.451427327493985,16.864704905286445,18.061123553859932,18.792163583335327,9.271825154104896,9.101563548103343,2.718800527889016,3.0486907666079466,19.63154149081531,8.120348338285623,3.455156079667807,5.488854079119183,17.69449808959495,0.41675879647357306,1.7946560921518095,0.4623455021459044,15.31196505141985,16.089389755881825,18.245301750636294,11.379466987991687,2.917068248582231,5.025767069942657,6.7869297007829,10.11894301801921,13.561414122619396,9.577319048254228,14.56713910758808,10.554233215618481,12.399367177629767,6.090999661022254,12.961129157619498,6.376522247946954,8.060647231145843,2.597224118432244,10.654095141597395,12.993653468778508,11.33250098216859,0.26494106712710686,4.0552699223743005,5.980370748540476,6.294926180716649,1.3219624157443155,7.515576748251429,3.3057973376932015,15.247937163263812,10.353112545723363,11.067281190794747,13.834412374542646,19.091534114139243,10.459442539769427,14.17942109025435,4.032235837494462,8.71705261842556,14.168980127966195,18.840077652334692,17.295947196839894,16.466236289491384,7.274474235516202,8.981991152723513,0.45743115131505085,19.541942636893417,18.005150099709443,14.845282792123031,6.985202064394933,5.101686257606395,3.860067988974696,0.5019223742240353,12.248903159986742,3.1011093020208236,15.9461615261174,6.92845734064059,0.16747524079476772,7.750159446961407,14.026696085689526,4.443329022699101,6.18372905457417,4.785232321101298,11.631310480765418,1.0677742871521145,3.0425791430582816,14.901710864971536,3.7765982574818135,0.9503857170180385,7.094393698830874,12.436061140081982,1.2215523542711715,6.32048887648307,7.531716882260895,14.890857385773653,11.969583516417085,18.69800861998861,3.7826870633111698,13.94587972917245,8.405735445370563,2.4643567208965944,19.259473027008333,6.173664581539824,9.04459444701243,19.291783900036357,19.908216394952486,4.840939956901691,13.375896829422285,0.8721235569691377,16.519383348866352,4.044657381220191,11.066314016213695,6.518989973847398,2.012941168991711,4.952185790218886,6.583188143901952,19.641273090204713,15.938734083581846,17.242620069670487,1.1637503535789895,6.248497863864126,11.099494180756743,14.610733089341693,2.42039805444366,3.7292301115694393,0.7994674774068811,10.569324977097239,1.1250115443903308,19.81653105156756,17.79873109867674,17.915929251564542,17.83533623838199,5.859078444718171,3.466720770875815,17.263133582860494,12.944125155104306,11.079106310328836,11.402965017363535,2.236364766860137,15.845392767515785,7.5925788927641635,4.877332450128922,18.566699112874616,12.622430498220982,18.772760566604138,7.632237875739443,3.6770481115279807,15.980709319158866,0.6011782879899297,2.9736443585571237,8.953847712185908,15.664301562528511,3.7362988280247,10.725017213186248,11.952372339091081,12.389048946075349,10.227450928438792,19.733360827035686,4.613350304906008,17.23464800299731,5.967762310970164,13.625357936388603,4.421381606050745,10.79801719149553,3.9659201808559708,10.791070498903466,16.894162888883926,19.983078538925128,7.616365521364941,14.958928403087924,8.965994781184609,1.5564298565306078,11.66630893701079,10.793448170829558,2.221998378732395,7.614368164904666,6.291985236156856,3.1197347444662205,19.590675333003947,5.2567065791523415,2.9848962325237283,16.608017999256646,15.32069211494643,1.1770380456504848,16.155257325223907,16.4393624822613,11.414116399134038,4.622782373722303,8.334997978292197,0.8018464327884223,2.8745958826935913,16.727891693116803,11.774497953787462,9.473702429248352,15.581355001993211,12.268678550771766,13.779748967071125,4.325129223727053],"mu":[4.570245037897678,1.406279067816829,1.6940697062445698,6.6878700384232665,5.216356282392576,4.984143317173439,4.208839973170313,3.60295263392042,5.868592489480793,4.019096077776874,6.616213277162375,3.9971166359719756,6.759199163224052,2.2164393631467427,2.8908977369100253,6.234749265298993,2.8662851813314005,0.2507800942478644,1.4091070856615473,4.461053927629437,5.406070466342491,7.852841576570704,7.2042568710300525,3.4517463856327124,6.094317437843091,3.978000912976143,2.9250336338162097,2.5141741522452787,5.307018137407518,8.171173184027262,9.555224233545536,8.724948792616436,1.357880405240457,7.54997805056327,1.7908635339416956,0.31208965375442155,1.9782434033226504,0.4984694626307573,2.3467345619922986,5.626764214314379,4.407570964260281,5.16085186434466,6.138978862716042,3.4671017352715117,8.480837280733828,5.765163747883085,1.5722549525659302,0.7926986197866936,2.956688399208518,4.134290572560417,7.713412577522874,6.4033551131335305,0.8172293805194886,7.117994620593569,2.6876157975675663,8.938026677333017,5.500107717425111,1.9428695358249648,0.056203965592342975,1.2899169625452855,4.794431832020312,1.7452714623360288,7.705564333031951,9.418518597619144,6.996118300495226,3.8310946097471676,3.7355857108614754,2.4348063253612318,7.529716886293524,0.06792815280694864,8.977184505902642,4.720414779965411,1.8969023740764612,3.8116454770443564,7.223370279336507,8.330235822161306,4.244365075850713,5.901290104858852,0.01681538311026909,6.738953712113521,1.3179991298636184,7.044204937311294,4.019406679482032,9.684797973239345,8.35297606393835,5.237217520148603,3.7808543773152747,3.826917113736017,3.0251193695396084,2.6792773866887143,8.192585944351674,9.627832785681376,2.610248645503457,5.360376534239617,7.786408585923692,7.424431220026686,8.423885034227903,7.867708406638991,3.906901494834192,1.2154953749699082,1.6503425844638442,8.38767940172621,4.872911715689002,4.283279076930652,8.981563712845972,5.424303289836166,7.105155716545464,2.2431156946499153,0.03971438421521922,5.444400278830335,8.994858545515974,6.624492590951907,6.79175711316004,9.26899686975614,3.2874001097669625,0.38300885848584265,9.059009563369996,2.3787244171691935,6.807648433380238,7.002728979000583,6.188064832546322,4.450296731878252,3.6943397522143706,5.052773696216397,6.834902142132706,8.101860033105687,8.366551765032987,3.7809288428502374,7.663969116813036,0.8509630267794255,0.6264966414683282,5.426628033736742,1.27552684490706,8.160805670221,7.538746328663546,4.274984717802999,8.637477331754855,3.305457636288338,3.8672065218401452,6.248094376052322,5.108952799487576,9.960123434660398,5.5986192190766015,4.632925773532499,8.89410438212105,5.749661115313516,1.9601998880561666,6.687868797956393,9.448191507105738,9.297630882959957,0.9814047615330601,5.669180317429515,5.977110720379795,7.926890156819426,7.672919324690735,9.962384865072693,7.989828358873896,9.166153324053383,8.193912935366116,3.3385521150508968,1.5701129897190191,3.442329922537579,5.345946433419371,1.9171511649143214,3.172709226602033,3.113468944069029,1.884423509855706,0.6396517650873901,8.876384975255354,4.34423817196908,4.836222750337955,1.695066503474647,6.850829488140748,8.203844021186647,4.468464546822326,1.568756438951593,7.527611348823379,3.973204452031376,1.1532078895382614,7.784409550439766,6.273143944361069,9.224720469698536,0.33852725207780043,8.49803984478899,3.5487291728459547,6.107643913613543,9.281443551448657,9.905765092358596,7.0514475963552865,4.208168446056564,5.448297329601337,7.259511772063238,6.067592276888623,4.112877772466539,4.130030267270232,6.00411580110862,8.332958820202228,1.9056944986547086,9.175404411113622,0.22099875771416144,7.792612575018598,8.491301332809385,1.939817961368786,1.1297791454526407,3.7738643036149577,8.9423372252464,0.9019026898465632,1.0786145397382674,2.356567950702415,0.4188002074511421,0.8211366283372024,1.8610819664623302,9.09653693275468,0.9285599367691777,7.72129727139391,4.323317424389799,8.73224728172238,7.186606930350832,8.252165414684596,0.7808302831600211,0.41969544949691073,6.129185770077155,3.7637052918939085,8.111401297617489,5.716862927661282,2.4311374596848268,4.115930633368398,8.417254207552073,8.39110790811758,1.3129013178454052,3.5579913961179255,3.284166128316539,7.028553826046384,6.079199462256679,3.4657669670561853,8.78520743611315,2.9502415857533726,7.505675378848311,6.048876041476028,8.645891989087886,6.461185108266552,8.184095832643726,9.94621001401474,0.2881479045902968,4.959195193697415,6.402497856315819,6.239582534666437,1.5029351977270333,6.136389474164621,9.927417349378512,1.0197741742208022,8.214291515045137,6.147489873838296,1.7382253168593453,8.541675052287063,3.2453480942742963,4.775696075341768,7.088239954891051,3.4868140166398787,6.745004047977168,6.600308220260893,8.739175232483941,1.0984961400388005,2.405631242758246,8.62400109355633,9.877771676953742,7.99373028261048,4.864360593064873,3.9499531630044538,1.96508408256449,8.998602344882416,1.9709322894903214,6.237683173688058,5.922897771574814,8.256516097575599,7.3450784510744676,8.285742606574424,8.252992271019133,5.284363667784087,1.2698752769177624,3.6476887770420774,2.3986021974932603,6.664723891160127,8.057163972274047,8.525200559345379,3.620654246447592,4.903314619658532,4.609471932967885,7.190390110352983,5.099549297403669,8.392529479983686,4.092349602101,1.9328090167193346,6.332075463956959,4.514980320296629,0.562763072312622,0.5550628140593994,2.6045239719661706,4.52607689080184,7.885013650747319,6.1734852905198885,3.721175072872911,6.529477761829952,4.630295724436769,7.611060362079103,6.596388867130822,8.058366301753077,8.769061747045491,9.993896918321568,4.445481902656461,9.612434752723043,5.069969211577934,3.6773204448320085,4.077309226976897,6.787073768576574,2.944987478122141,6.288381394160085,3.1151839851390783,9.107664260610338,9.675362737448314,1.6360426274621753,8.764732527145453,9.326976563954009,3.571155889499993,9.430785398027977,3.739340433174696,8.518183653374065,4.2641622101355985,8.009777132646734,3.6054263026429534,4.4719163128736295,6.434218160999294,5.176923893916358,5.156683197154647,5.426969651540228,3.1217962984084346,6.308180113330324,1.791907625788538,7.9057375998501245,9.530566214358965,8.139478579681452,4.404564013407746,1.5335138474666254,9.5650204781823,5.6276252580101165,8.393955139342033,0.45760616099474793,6.961305699642663,0.6015856448229484,6.301406313652755,4.612942806465488,7.576444458162914,4.291410937389677,3.451540384894083,2.7886948861779426,5.213968181593122,1.800194666762267,0.8955761048946842,7.222661449851502,3.4805036473511297,8.824011584719099,1.423860198977327,3.444263296696788,5.233950378510577,3.5109595681848194,0.9514795944212562,8.656141502338846,8.293306237745178,9.781270888721178,2.5493800340891593,1.8473546944874064,3.2054778463397593,6.275186607870335,9.14394219157578,2.789716034824623,7.621053469506274,0.898663265005688,4.103219944299199,9.891573565400245,8.114049718522516,4.94343816768378,7.076613535443053,9.362369839318056,4.6462255677014745,0.5249793838366767,7.3310465603549275,0.04690044689633188,0.42833421851664166,8.803524625040849,9.367644640460975,3.9098513076353036,7.779178811296951,6.309670704430223,5.971261135418682,6.860035834422331,7.2419742036033945,2.317495177361195,4.9693793575237315,7.823874258903376,8.178634438836971,3.893380223156957,7.177372049904371,9.002329167464785,2.003116079580234,5.8562059106533,3.96463789503829,3.9486568815592116,9.94149458040413,3.5548615570887088,9.359973879338552,9.547349478892823,7.9329078432537825,5.799003537469534,3.142332486192978,7.638292435580736,7.685802267197726,6.94503578362448,4.800327832613382,9.705415105132351,7.4521323574164295,8.759363776816835,2.797789841140863,2.8515921797111554,3.347680408135143,5.503568986464497,8.460439764536694,2.712705359111829,5.782323199809516,2.8292354364307237,2.9896171103484726,1.1890228353320342,6.01169647603828,1.3889153071022142,8.382462711133204,1.0317855287069455,0.1751713126733878,5.565456672824314,2.9969183778020136,3.370873658010829,1.5233529770309828,8.417708733147132,8.913739955341107,1.6754439878970828,7.636719041193141,1.871548429546659,9.085122439439798,3.677895499674877,1.6324903577054473,5.955243436987592,5.74826187104901,8.755895008143039,1.8269960536834118,0.19530414062206347,9.03876905300529,5.60657786502275,4.129250042973062,0.5758179987911061,1.8754908258686087,6.323318780651852,8.373717436370043,6.735828525414725,2.0652019678940925,7.905782239386712,1.2067416568137501,2.8027483476307458,4.912904888665295,9.126913252385666,7.164976857316563,3.7769948531763897,1.9986011238636614,9.447355076809423,1.4978916924028596,5.99893986834126,0.7758446366045835,5.895714385275898,7.854237922012088,5.062900722473415,3.7107996892378936,2.1882246976750808,0.31627595958419574,2.1293252553409614,1.8311871592146378,8.924669964293578,5.303488872706669,4.441973049817283,3.1822891194916725,6.670180885668504,7.662590060276688,0.060889959324197385,4.915621840488377,8.173688509278916,2.6880535617460777,5.549940984787776,1.0870806191797433,3.4027130505016934,3.3554204636024387,3.396259179412522,3.832620106007425,2.4265784999182882,4.860596396132728,6.002994695316993,9.36925103073122,2.5810607837250132,6.1134681113366955,8.448262271345921,4.826850224818675,9.126629570537286,0.7410240062640638,3.1475970157040223,4.298194033146181,8.442180561902259,9.694205646187013,6.1483084728593,1.678936432680156,3.85247626111338,2.7406512974569397,9.315347758932322,6.216165161729474,6.244388632113029,6.514427133596319,8.350018362248633,5.278577105410431,7.0535462332812475,3.1389301023501126,3.2444795843064855,5.979254943581658,2.573572024073869,2.7717152892302788,5.915184488298317,2.249253333467778,2.3033649795456324,9.695789292533263,6.917145433974419,9.45606008207045,7.153553429430122,6.831783060726149,1.420335293967292,3.7553124507657842,6.429883835892816,9.183918316118376,0.8283124250093721,0.1874802388504082,4.501861806791922,0.869749874620751,9.720060406023867,1.0868197201038576,8.328352034487072,1.5643999629775562,3.132323782569324,5.536473751044184,0.7829129811886193,7.8991468323320095,1.5377773335364986,9.964753014303247,3.5019955636792055,8.574997403292407,3.5162411729779253,4.39658694065705,9.835037787102037,4.208823359256034,6.438254985976104,2.5873724239780915,8.871244772470675,8.414210520432794,4.559338529922218,4.787449629761962,6.198179204588536,3.4447459330351204,8.843663486135238,0.6247451377751423,5.283700900375066,3.055759538910241,4.859904286992151,7.23065955877539,8.719223687664117,7.730173577282693,6.208870177447081,3.673044239022194,5.181507880935059,9.864491217104543,6.4658756578142,8.860524093540585,3.4096232662022463,7.008920813976127,1.0283947559967865,9.223061162416426,7.763534958307612,5.788112812529318,8.47495676727111,5.94515136853325,0.8892494011592356,1.4066909838366914,5.456897819938476,0.6757138618472025,8.381589419896398,6.717569660330181,9.456083271465376,1.994512303688627,8.841369697356267,7.835717115536475,4.121560241625097,4.650738775433658,5.539782109567522,4.896450060670647,6.813224535773341,1.5566634806390955,9.186338297180153,4.7489698986742805,9.993353180950997,2.953003411966195,7.737004245460303,6.549816425373544,6.930434363297461,9.299697178707117,8.24276398512204,8.086581097948375,1.1469866883054802,1.2001245502429647,9.86738244522828,1.696470989324368,9.32737887253046,5.391974614934072,9.235014889349408,3.4465072801025265,5.888967085626029,4.632269566705187,5.430806107889579,1.9089829084974541,7.848350492032836,3.3997040126984546,2.6017010153787234,3.76390231263269,5.047700498710781,8.679259297735664,0.9088426468757693,0.3519859540914494,5.933034446697977,6.971149362808693,2.5313645375691896,6.572280594233371,0.7265927495118851,0.4245329540134235,9.509401996436864,3.9539900640952785,3.510710537972508,9.321582315372616,3.602230905991022,3.494546339514195,4.765493433538063,6.4481412920459436,9.58996872922502,7.313591894470286,9.03908627761603,4.3481508869783525,2.288312860100228,8.182345181897144,6.607671161336846,5.950722237401873,6.063123250759186,0.6920524602166345,0.6419828479793677,9.596766339144692,9.099754250213838,8.631442738188362,3.562819201664167,7.833714706296684,7.728412902311092,6.515167773439597,1.3318840473845994,2.3841756253652213,2.2670373448561376,1.9721156562804865,8.82511981959169,8.575217544923843,9.583939100070554,6.528296346717841,6.175755258220949,4.667431435225433,5.697761811368808,2.000122823815431,4.1624761221497515,4.918706750761423,4.674047978427705,8.354287731067863,6.276830034733976,5.5403873999226345,3.226675882873231,2.9787833016591447,6.771513167350333,8.99026677872766,1.2117043728150856,6.355186999090671,5.184041818302736,1.06646841034296,3.4304757286560883,9.801396051891063,4.3505457027295,6.9753967937843475,4.771358217848521,3.526632088710815,3.4754928506611815,3.2569685344801313,1.0481585532862159,4.917193784359977,3.8667044255073213,5.512796584419801,8.55092247185896,6.431846084959361,3.278726753310579,8.327798937380788,5.818456261531388,2.0073841057744457,1.5516975865176375,0.08916780070043595,9.75476405001711,5.182000815054897,3.536137071453369,8.172838048971593,1.5162105572307305,2.5138318781855085,9.729511006424731,4.955516368492557,0.832941662232336,0.01999161987548348,7.6948104902894165,0.5882122956948987,8.137887075126198,6.656857414801394,9.567284394573237,7.130180158189026,5.233215757539376,6.509479438312537,5.368756239715213,1.7610276582069129,1.4708542038715944,0.4705340695176674,9.286616576312952,2.081924484268136,5.387377124055006,3.941247012583191,0.5255779929286275,7.260802287795731,5.321240156022633,3.9643062042755295,7.659736587181176,1.8814381881583508,5.862404443372144,2.142146715549864,4.08070783390587,9.271577214799922,0.775250588727896,3.9695355515327857,5.040746301325505,3.9735380842436774,7.774998657714136,8.293682639060258,4.8201874179469595,1.246749062838608,8.31992814921277,9.716277119352677,3.5845779068810835,9.269645424843223,6.109362624495138,3.9827201849105,9.456748339900333,0.06948979941931999,6.437096132330888,4.13271231492555,7.592803302012092,2.950273101329335,0.7553617123898726,0.442401129749157,4.262598646381202,3.3020662245016763,5.171221321793292,1.0403647108619585,2.6376719613591515,7.495079204723549,2.3616079689233294,8.440662851905376,2.321062514709178,8.423283990746771,1.6353993661916966,1.1244438203784268,6.353397502256984,3.2978835483282465,2.4182989708406954,3.6322591251734337,1.9057113531482517,4.863332850349805,5.926850011285591,0.21118428372845166,9.394233213656806,0.9465208904836531,9.632042922691184,3.8675674927637105,3.9681578470072076,7.381785318890248,3.9538615547183364,9.956424816242059,2.74974946154964,8.492747783189298,4.1319755142698895,2.575348975610552,5.4444463939195415,3.502560754924029,5.141302220982356,9.554270770632659,0.42707288395654297,0.21303856148525036,7.021423833069649,0.49543357527146004,8.69126666671306,8.23079381106691,5.16526826946331,1.754047615023211,4.313178697651468,0.9193859580425845,4.37809147043313,1.2774981635669702,9.034548275061598,9.118390598818614,7.413084026089313,3.5844459320417354,5.081011886308964,6.283930673961208,1.9593196132285229,9.183402660708255,5.151557265283095,8.29033009167873,3.6198089891863394,6.9079619219861765,9.511593438453085,2.5884798282979693,3.383742223448132,3.4380023602241616,2.903684750247293,6.184174377523126,5.255274648643207,3.2859217043799216,3.942075767183477,7.737232816925275,3.033474256974946,7.674660863528073,0.8705019375779233,5.95542606812341,0.992102519818352,7.347143817314357,9.16345244675409,7.996629653855074,3.304230142112752,1.325549664747696,6.093131533162972,8.30097227441534,5.639788745862719,6.435268866164696,3.247890822636248,5.682882080056602,9.247595976209464,6.31934975438633,6.396938659671476,1.5549165178203594,9.719522031660226,5.944187908221659,9.339869859781459,7.127537181344614,0.1461397076290072,7.912475312498872,7.969762622965046,3.303959287508731,0.5918222334004586,9.47680235269379,7.157846833916636,8.325158017951617,6.659579669480092,5.829931001893833,7.49080739806481,4.763213739658383,8.839080935178957,1.4345086482939418,1.123650977648043,3.747108159017012,8.188906319635871,4.305619254933957,3.410549213569023,1.4012482680494642,5.180369225870671,7.628450503403701,9.433209306278501,9.298054557609767,0.5181927147082233,4.207053968689056,7.207474975414183,3.791796522752795,3.386490177937569,3.590458356014259,2.2374784389708813,1.0328283522074755,7.121987018988179,3.2951435501058812,1.6054839028472356,3.851871312180817,7.4364690162427305,8.75193137796196,5.471670794240588,6.091609782012652,9.881619130037437,1.7065874644828294,7.401302754566917,4.238406948257696,2.600463567315876,4.137417569443784,3.7974628428618673,4.181848854532082,0.9898286166925319,3.0048842909557716,4.306152205943743,1.7219367925676998,0.9469803506454144,6.648063489934,9.981042702548429,9.544514764104978,8.555202089909734,6.160621188353117,0.24253361283914865,2.8428316987560054,3.4756504823424583,1.0506489598728996,0.6823956466669112,8.518778056599317,5.8669319987356054,5.762967603483375,0.23853554355195872,9.02955285146587,3.265127804288983,2.1987830192397717,8.052635264504817,7.22111830933877,9.958063893712353,6.371854531987591,0.5591220245342354,1.4803029355863528,1.0904636901822973,1.4656698780500887,0.12135555293240952,4.488562328722687,7.358794857651554,6.0384138433765955,8.126552515501416,8.495332829132673,7.487276069509026,6.3053702788313455,7.096120393401986,4.615344058169885,7.734443565923142,0.30162737974006815,3.2012114610648323,0.4721528407570208,3.752561782258579,9.14260473908339,1.6417913390068128,6.194986984426032,1.4282322871795872,7.071601383162232,6.683259437955571,0.9760544797350379,7.226595290963369,3.199494397842637,5.8004254911567905,4.6646333894549326,9.541319928860126,7.657220862606595,0.5806757709792953,1.7487625788181926,7.320031142031153,6.930694557064719,8.607665413742351,8.742708626684408,9.087326974716653,8.542411211136635,4.486582559515913,3.699801023988034,8.003699748464504,4.009665810990781,9.765585720314437,4.788554375360377,4.474393298006911,1.2025668495744712,6.47993121174607,8.405924016449484,5.776295840858731,7.871304834794806,6.689878193211003,9.721440916604818,2.9171052752548365,6.629797240150133,3.3853570781648212,1.2721165787132227,2.500133417008188,1.1197532583915892]}

},{}],126:[function(require,module,exports){
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

var positiveLocation = require( './fixtures/julia/positive_location.json' );
var negativeLocation = require( './fixtures/julia/negative_location.json' );
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

tape( 'if provided a finite `mu` and `sigma`, the function returns a function which returns `-Infinity` when provided `Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `mu` and `sigma`, the function returns a function which returns `-Infinity` when provided `-Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `sigma`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 0.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

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

tape( 'the created function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveLocation.expected;
	x = positiveLocation.x;
	mu = positiveLocation.mu;
	sigma = positiveLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], sigma[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeLocation.expected;
	x = negativeLocation.x;
	mu = negativeLocation.mu;
	sigma = negativeLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], sigma[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large variance ( = large `sigma`)', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( mu[i], sigma[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/logpdf/test/test.factory.js")
},{"./../lib/factory.js":120,"./fixtures/julia/large_variance.json":123,"./fixtures/julia/negative_location.json":124,"./fixtures/julia/positive_location.json":125,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":70,"tape":281}],127:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/logpdf/test/test.js")
},{"./../lib":121,"tape":281}],128:[function(require,module,exports){
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

var positiveLocation = require( './fixtures/julia/positive_location.json' );
var negativeLocation = require( './fixtures/julia/negative_location.json' );
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

tape( 'if provided `Infinity` for `x` and a finite `mu` and `sigma`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-Infinity` for `x` and a finite `mu` and `sigma`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a nonpositive `sigma`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

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

tape( 'the function evaluates the logpdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveLocation.expected;
	x = positiveLocation.x;
	mu = positiveLocation.mu;
	sigma = positiveLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeLocation.expected;
	x = negativeLocation.x;
	mu = negativeLocation.mu;
	sigma = negativeLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large variance ( = large `sigma` )', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], mu[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 20.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/logpdf/test/test.logpdf.js")
},{"./../lib":121,"./fixtures/julia/large_variance.json":123,"./fixtures/julia/negative_location.json":124,"./fixtures/julia/positive_location.json":125,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":70,"tape":281}],129:[function(require,module,exports){
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

},{"./is_number.js":132}],130:[function(require,module,exports){
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

},{"./is_number.js":132,"./zero_pad.js":136}],131:[function(require,module,exports){
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

},{"./main.js":134}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"./format_double.js":129,"./format_integer.js":130,"./is_string.js":133,"./space_pad.js":135,"./zero_pad.js":136}],135:[function(require,module,exports){
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

},{"./main.js":138}],138:[function(require,module,exports){
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

},{"./main.js":141}],140:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"dup":133}],141:[function(require,module,exports){
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

},{"./is_string.js":140,"@stdlib/string/base/format-interpolate":131,"@stdlib/string/base/format-tokenize":137}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":143}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":145}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":147}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":151}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"./define_property.js":149}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":148,"./has_define_property_support.js":150,"./polyfill.js":152}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":139}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":154,"./polyfill.js":155,"@stdlib/assert/has-tostringtag-support":20}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":156}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":156,"./tostringtag.js":157,"@stdlib/assert/has-own-property":16}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":142}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){

},{}],160:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"dup":159}],161:[function(require,module,exports){
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
},{"base64-js":158,"buffer":161,"ieee754":264}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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
},{"_process":271}],164:[function(require,module,exports){
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

},{"events":162,"inherits":265,"readable-stream/lib/_stream_duplex.js":166,"readable-stream/lib/_stream_passthrough.js":167,"readable-stream/lib/_stream_readable.js":168,"readable-stream/lib/_stream_transform.js":169,"readable-stream/lib/_stream_writable.js":170,"readable-stream/lib/internal/streams/end-of-stream.js":174,"readable-stream/lib/internal/streams/pipeline.js":176}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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
},{"./_stream_readable":168,"./_stream_writable":170,"_process":271,"inherits":265}],167:[function(require,module,exports){
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
},{"./_stream_transform":169,"inherits":265}],168:[function(require,module,exports){
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
},{"../errors":165,"./_stream_duplex":166,"./internal/streams/async_iterator":171,"./internal/streams/buffer_list":172,"./internal/streams/destroy":173,"./internal/streams/from":175,"./internal/streams/state":177,"./internal/streams/stream":178,"_process":271,"buffer":161,"events":162,"inherits":265,"string_decoder/":280,"util":159}],169:[function(require,module,exports){
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
},{"../errors":165,"./_stream_duplex":166,"inherits":265}],170:[function(require,module,exports){
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
},{"../errors":165,"./_stream_duplex":166,"./internal/streams/destroy":173,"./internal/streams/state":177,"./internal/streams/stream":178,"_process":271,"buffer":161,"inherits":265,"util-deprecate":289}],171:[function(require,module,exports){
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
},{"./end-of-stream":174,"_process":271}],172:[function(require,module,exports){
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
},{"buffer":161,"util":159}],173:[function(require,module,exports){
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
},{"_process":271}],174:[function(require,module,exports){
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
},{"../../../errors":165}],175:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],176:[function(require,module,exports){
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
},{"../../../errors":165,"./end-of-stream":174}],177:[function(require,module,exports){
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
},{"../../../errors":165}],178:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":162}],179:[function(require,module,exports){
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

},{"./":180,"get-intrinsic":255}],180:[function(require,module,exports){
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

},{"es-define-property":240,"es-errors/type":246,"function-bind":254,"get-intrinsic":255,"set-function-length":275}],181:[function(require,module,exports){
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

},{"./lib/is_arguments.js":182,"./lib/keys.js":183}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],184:[function(require,module,exports){
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

},{"es-define-property":240,"es-errors/syntax":245,"es-errors/type":246,"gopd":256}],185:[function(require,module,exports){
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

},{"define-data-property":184,"has-property-descriptors":257,"object-keys":269}],186:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],187:[function(require,module,exports){
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

},{"./ToNumber":218,"./ToPrimitive":220,"./Type":225}],188:[function(require,module,exports){
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

},{"../helpers/isFinite":233,"../helpers/isNaN":234,"../helpers/isPrefixOf":235,"./ToNumber":218,"./ToPrimitive":220,"es-errors/type":246,"get-intrinsic":255}],189:[function(require,module,exports){
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

},{"call-bind/callBound":179,"es-errors/type":246}],190:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":248}],191:[function(require,module,exports){
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

},{"./DayWithinYear":194,"./InLeapYear":198,"./MonthFromTime":208,"es-errors/eval":241}],192:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":239,"./floor":229}],193:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":229}],194:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":192,"./DayFromYear":193,"./YearFromTime":227}],195:[function(require,module,exports){
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

},{"./modulo":230}],196:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":237,"./IsAccessorDescriptor":199,"./IsDataDescriptor":201,"es-errors/type":246}],197:[function(require,module,exports){
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

},{"../helpers/timeConstants":239,"./floor":229,"./modulo":230}],198:[function(require,module,exports){
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

},{"./DaysInYear":195,"./YearFromTime":227,"es-errors/eval":241}],199:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":237,"es-errors/type":246,"hasown":263}],200:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":266}],201:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":237,"es-errors/type":246,"hasown":263}],202:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":199,"./IsDataDescriptor":201,"./IsPropertyDescriptor":203,"es-errors/type":246}],203:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":237}],204:[function(require,module,exports){
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

},{"../helpers/isFinite":233,"../helpers/timeConstants":239}],205:[function(require,module,exports){
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

},{"../helpers/isFinite":233,"./DateFromTime":191,"./Day":192,"./MonthFromTime":208,"./ToInteger":217,"./YearFromTime":227,"./floor":229,"./modulo":230,"get-intrinsic":255}],206:[function(require,module,exports){
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

},{"../helpers/isFinite":233,"../helpers/timeConstants":239,"./ToInteger":217}],207:[function(require,module,exports){
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

},{"../helpers/timeConstants":239,"./floor":229,"./modulo":230}],208:[function(require,module,exports){
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

},{"./DayWithinYear":194,"./InLeapYear":198}],209:[function(require,module,exports){
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

},{"../helpers/isNaN":234}],210:[function(require,module,exports){
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

},{"../helpers/timeConstants":239,"./floor":229,"./modulo":230}],211:[function(require,module,exports){
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

},{"./Type":225}],212:[function(require,module,exports){
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


},{"../helpers/isFinite":233,"./ToNumber":218,"./abs":228,"get-intrinsic":255}],213:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":239,"./DayFromYear":193}],214:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":239,"./modulo":230}],215:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],216:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":218}],217:[function(require,module,exports){
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

},{"../helpers/isFinite":233,"../helpers/isNaN":234,"../helpers/sign":238,"./ToNumber":218,"./abs":228,"./floor":229}],218:[function(require,module,exports){
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

},{"./ToPrimitive":220,"call-bind/callBound":179,"safe-regex-test":274}],219:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":249}],220:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":251}],221:[function(require,module,exports){
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

},{"./IsCallable":200,"./ToBoolean":215,"./Type":225,"es-errors/type":246,"hasown":263}],222:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":255}],223:[function(require,module,exports){
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

},{"../helpers/isFinite":233,"../helpers/isNaN":234,"../helpers/sign":238,"./ToNumber":218,"./abs":228,"./floor":229,"./modulo":230}],224:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":218}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":192,"./modulo":230}],227:[function(require,module,exports){
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

},{"call-bind/callBound":179,"get-intrinsic":255}],228:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":255}],229:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],230:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":236}],231:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":239,"./modulo":230}],232:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":187,"./5/AbstractRelationalComparison":188,"./5/Canonicalize":189,"./5/CheckObjectCoercible":190,"./5/DateFromTime":191,"./5/Day":192,"./5/DayFromYear":193,"./5/DayWithinYear":194,"./5/DaysInYear":195,"./5/FromPropertyDescriptor":196,"./5/HourFromTime":197,"./5/InLeapYear":198,"./5/IsAccessorDescriptor":199,"./5/IsCallable":200,"./5/IsDataDescriptor":201,"./5/IsGenericDescriptor":202,"./5/IsPropertyDescriptor":203,"./5/MakeDate":204,"./5/MakeDay":205,"./5/MakeTime":206,"./5/MinFromTime":207,"./5/MonthFromTime":208,"./5/SameValue":209,"./5/SecFromTime":210,"./5/StrictEqualityComparison":211,"./5/TimeClip":212,"./5/TimeFromYear":213,"./5/TimeWithinDay":214,"./5/ToBoolean":215,"./5/ToInt32":216,"./5/ToInteger":217,"./5/ToNumber":218,"./5/ToObject":219,"./5/ToPrimitive":220,"./5/ToPropertyDescriptor":221,"./5/ToString":222,"./5/ToUint16":223,"./5/ToUint32":224,"./5/Type":225,"./5/WeekDay":226,"./5/YearFromTime":227,"./5/abs":228,"./5/floor":229,"./5/modulo":230,"./5/msFromTime":231}],233:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":234}],234:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],235:[function(require,module,exports){
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

},{"call-bind/callBound":179}],236:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],237:[function(require,module,exports){
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

},{"es-errors/type":246,"hasown":263}],238:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{"get-intrinsic":255}],241:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],242:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],243:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],244:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],245:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],246:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],247:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],248:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":246}],249:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":250,"./RequireObjectCoercible":248}],250:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],251:[function(require,module,exports){
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

},{"./helpers/isPrimitive":252,"is-callable":266}],252:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":253}],255:[function(require,module,exports){
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

},{"es-errors":242,"es-errors/eval":241,"es-errors/range":243,"es-errors/ref":244,"es-errors/syntax":245,"es-errors/type":246,"es-errors/uri":247,"function-bind":254,"has-proto":258,"has-symbols":259,"hasown":263}],256:[function(require,module,exports){
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

},{"get-intrinsic":255}],257:[function(require,module,exports){
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

},{"es-define-property":240}],258:[function(require,module,exports){
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

},{}],259:[function(require,module,exports){
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

},{"./shams":260}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":260}],262:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":254}],263:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":254}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
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

},{"call-bind/callBound":179,"has-tostringtag/shams":261}],268:[function(require,module,exports){
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

},{"./isArguments":270}],269:[function(require,module,exports){
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

},{"./implementation":268,"./isArguments":270}],270:[function(require,module,exports){
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

},{}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
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
},{"_process":271,"through":287,"timers":288}],273:[function(require,module,exports){
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

},{"buffer":161}],274:[function(require,module,exports){
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

},{"call-bind/callBound":179,"es-errors/type":246,"is-regex":267}],275:[function(require,module,exports){
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

},{"define-data-property":184,"es-errors/type":246,"get-intrinsic":255,"gopd":256,"has-property-descriptors":257}],276:[function(require,module,exports){
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

},{"es-abstract/es5":232,"function-bind":254}],277:[function(require,module,exports){
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

},{"./implementation":276,"./polyfill":278,"./shim":279,"define-properties":185,"function-bind":254}],278:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":276}],279:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":278,"define-properties":185}],280:[function(require,module,exports){
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
},{"safe-buffer":273}],281:[function(require,module,exports){
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
},{"./lib/default_stream":282,"./lib/results":284,"./lib/test":285,"_process":271,"defined":186,"through":287,"timers":288}],282:[function(require,module,exports){
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
},{"_process":271,"fs":160,"through":287}],283:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":271,"timers":288}],284:[function(require,module,exports){
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
},{"_process":271,"events":162,"function-bind":254,"has":262,"inherits":265,"object-inspect":286,"resumer":272,"through":287,"timers":288}],285:[function(require,module,exports){
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
},{"./next_tick":283,"deep-equal":181,"defined":186,"events":162,"has":262,"inherits":265,"path":163,"string.prototype.trim":277}],286:[function(require,module,exports){
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

},{}],287:[function(require,module,exports){
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
},{"_process":271,"stream":164}],288:[function(require,module,exports){
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
},{"process/browser.js":271,"timers":288}],289:[function(require,module,exports){
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
},{}]},{},[126,127,128]);
