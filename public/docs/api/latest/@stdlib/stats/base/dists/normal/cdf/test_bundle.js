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

},{"@stdlib/utils/native-class":144}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":144}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":144}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":144}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":88}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":92,"@stdlib/number/float64/base/get-high-word":96,"@stdlib/number/float64/base/to-words":105}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Infinity );
* // returns 0.0
*
* y = erfc( -Infinity );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c}. The implementation follows the original, but has been modified for JavaScript.
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
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalPP = require( './polyval_pp.js' );
var polyvalQQ = require( './polyval_qq.js' );
var polyvalPA = require( './polyval_pa.js' );
var polyvalQA = require( './polyval_qa.js' );
var polyvalRA = require( './polyval_ra.js' );
var polyvalSA = require( './polyval_sa.js' );
var polyvalRB = require( './polyval_rb.js' );
var polyvalSB = require( './polyval_sb.js' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1;  // 0x3FEB0AC1, 0x60000000

var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var QQC = 1.0;

var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var QAC = 1.0;

var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var SAC = 1.0;

var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var SBC = 1.0;


// MAIN //

/**
* Evaluates the complementary error function.
*
* ```tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ```tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* ## Method
*
* 1.  For \\(|x| \in [0, 0.84375)\\),
*
*     ```tex
*     \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*     0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*     \end{cases}
*     ```
*
*     where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*     ```tex
*     \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*     ```
*
*     <!-- <note> -->
*
*     The formula is derived by noting
*
*     ```tex
*     \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*     ```
*
*     and that
*
*     ```tex
*     \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*     ```
*
*     is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*
*     <!-- </note> -->
*
* 2.  For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*     ```tex
*     \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*     1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*     where
*
*     ```tex
*     \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*     ```
*
*     <!-- <note> -->
*
*     Here, we use the Taylor series expansion at \\(x = 1\\)
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*     &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*     \end{align*}
*     ```
*
*     using a rational approximation to approximate
*
*     ```tex
*     \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*     ```
*
*     <!-- </note> -->
*
*     Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*     -   \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*     -   \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3.  For \\(x \in [1.25,1/0.35)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*     \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*     \end{align*}
*     ```
*
*     where
*
*     -   \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4.  For \\(x \in [1/0.35,28)\\),
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*     2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*     2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*     \end{cases}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erf}(x) = \begin{cases}
*     \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*     \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*     \end{cases}
*     ```
*
*     where
*
*     -   \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5.  For \\(x \in [28, \infty)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*     \end{align*}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*     2 - \mathrm{tiny} & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
* ## Notes
*
* -   To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*     ```tex
*     -x^2 = -s^2 + (s-x)(s+x)
*     ```
*
*     and
*
*     ```tex
*     e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*     ```
*
* -   `#4` and `#5` make use of the asymptotic series
*
*     ```tex
*     \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*     ```
*
*     We use a rational approximation to approximate
*
*     ```tex
*     g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*     ```
*
* -   The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*     ```tex
*     |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*     ```
*
*     and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*     ```tex
*     |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*     ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* @example
* var y = erfc( -1.0 );
* // returns ~1.8427
*
* @example
* var y = erfc( 0.0 );
* // returns 1.0
*
* @example
* var y = erfc( Infinity );
* // returns 0.0
*
* @example
* var y = erfc( -Infinity );
* // returns 2.0
*
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
}


// EXPORTS //

module.exports = erfc;

},{"./polyval_pa.js":68,"./polyval_pp.js":69,"./polyval_qa.js":70,"./polyval_qq.js":71,"./polyval_ra.js":72,"./polyval_rb.js":73,"./polyval_sa.js":74,"./polyval_sb.js":75,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/exp":77,"@stdlib/number/float64/base/set-low-word":101}],68:[function(require,module,exports){
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
		return 0.41485611868374833;
	}
	return 0.41485611868374833 + (x * (-0.3722078760357013 + (x * (0.31834661990116175 + (x * (-0.11089469428239668 + (x * (0.035478304325618236 + (x * -0.002166375594868791))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],69:[function(require,module,exports){
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
		return -0.3250421072470015;
	}
	return -0.3250421072470015 + (x * (-0.02848174957559851 + (x * (-0.005770270296489442 + (x * -0.000023763016656650163))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],70:[function(require,module,exports){
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
		return 0.10642088040084423;
	}
	return 0.10642088040084423 + (x * (0.540397917702171 + (x * (0.07182865441419627 + (x * (0.12617121980876164 + (x * (0.01363708391202905 + (x * 0.011984499846799107))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],71:[function(require,module,exports){
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
		return 0.39791722395915535;
	}
	return 0.39791722395915535 + (x * (0.0650222499887673 + (x * (0.005081306281875766 + (x * (0.00013249473800432164 + (x * -0.000003960228278775368))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],72:[function(require,module,exports){
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
		return -0.6938585727071818;
	}
	return -0.6938585727071818 + (x * (-10.558626225323291 + (x * (-62.375332450326006 + (x * (-162.39666946257347 + (x * (-184.60509290671104 + (x * (-81.2874355063066 + (x * -9.814329344169145))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],73:[function(require,module,exports){
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
		return -0.799283237680523;
	}
	return -0.799283237680523 + (x * (-17.757954917754752 + (x * (-160.63638485582192 + (x * (-637.5664433683896 + (x * (-1025.0951316110772 + (x * -483.5191916086514))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],74:[function(require,module,exports){
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
		return 19.651271667439257;
	}
	return 19.651271667439257 + (x * (137.65775414351904 + (x * (434.56587747522923 + (x * (645.3872717332679 + (x * (429.00814002756783 + (x * (108.63500554177944 + (x * (6.570249770319282 + (x * -0.0604244152148581))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],75:[function(require,module,exports){
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
		return 30.33806074348246;
	}
	return 30.33806074348246 + (x * (325.7925129965739 + (x * (1536.729586084437 + (x * (3199.8582195085955 + (x * (2553.0504064331644 + (x * (474.52854120695537 + (x * -22.44095244658582))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

},{"./polyval_p.js":79,"@stdlib/math/base/special/ldexp":82}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":76,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/trunc":86}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":48,"@stdlib/constants/float64/max-base2-exponent-subnormal":47,"@stdlib/constants/float64/min-base2-exponent-subnormal":49,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/copysign":64,"@stdlib/number/float64/base/exponent":90,"@stdlib/number/float64/base/from-words":92,"@stdlib/number/float64/base/normalize":99,"@stdlib/number/float64/base/to-words":105}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":62,"@stdlib/math/base/special/floor":80}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":89}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":96}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":94}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":93,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":95,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":98,"./main.js":100,"@stdlib/utils/define-nonenumerable-read-only-property":137}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":98}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":103}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":102,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":106,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":104,"./main.js":107,"@stdlib/utils/define-nonenumerable-read-only-property":137}],106:[function(require,module,exports){
arguments[4][93][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":93}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":104}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a function for evaluating the cumulative distribution function (CDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - constant value of distribution
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*
* y = cdf( NaN );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated cumulative distribution function
	*
	* @example
	* var y = cdf( 10.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return (x < mu) ? 0.0 : 1.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/utils/constant-function":135}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/degenerate/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/degenerate/cdf' );
*
* var y = cdf( 2.0, 5.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
*
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":108,"./main.js":110,"@stdlib/utils/define-nonenumerable-read-only-property":137}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the cumulative distribution function (CDF) for a degenerate distribution with mean value `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 3.0 );
* // returns 0.0
*
* @example
* var y = cdf( 4.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( 3.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN );
* // returns NaN
*/
function cdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return (x < mu) ? 0.0 : 1.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":58}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var erfc = require( '@stdlib/math/base/special/erfc' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Normal distribution.
*
* @param {number} mu - mean
* @param {NonNegativeNumber} sigma - standard deviation
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 10.0, 2.0 );
* var y = cdf( 10.0 );
* // returns 0.5
*
* y = cdf( 12.0 );
* // returns ~0.841
*/
function factory( mu, sigma ) {
	var denom;
	if (
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma < 0.0
	) {
		return constantFunction( NaN );
	}
	if ( sigma === 0.0 ) {
		return degenerate( mu );
	}
	denom = sigma * sqrt( 2.0 );
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Normal distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		var xc;
		if ( isnan( x ) ) {
			return NaN;
		}
		xc = x - mu;
		return 0.5 * erfc( -xc / denom );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/erfc":66,"@stdlib/math/base/special/sqrt":84,"@stdlib/stats/base/dists/degenerate/cdf":109,"@stdlib/utils/constant-function":135}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Normal distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/normal/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/normal/cdf' );
*
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.977
*
* var myCDF = cdf.factory( 10.0, 2.0 );
* y = myCDF( 10.0 );
* // returns 0.5
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":111,"./main.js":113,"@stdlib/utils/define-nonenumerable-read-only-property":137}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - mean
* @param {NonNegativeNumber} sigma - standard deviation
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.977
*
* @example
* var y = cdf( -1.0, -1.0, 2.0 );
* // returns 0.5
*
* @example
* var y = cdf( -1.0, 4.0, 2.0 );
* // returns ~0.006
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative standard deviation:
* var y = cdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function cdf( x, mu, sigma ) {
	var denom;
	var xc;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma < 0.0
	) {
		return NaN;
	}
	if ( sigma === 0.0 ) {
		return (x < mu) ? 0.0 : 1.0;
	}
	denom = sigma * sqrt( 2.0 );
	xc = x - mu;
	return 0.5 * erfc( -xc/denom );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/erfc":66,"@stdlib/math/base/special/sqrt":84}],114:[function(require,module,exports){
module.exports={"sigma":[3.675443621236334,1.5945730658986346,2.026168704882818,10.816618809607359,1.5408351541873655,2.9572512542824425,1.9954279647394246,16.187967206194216,1.058156001356112,5.153496602326055,10.190546167442553,12.639890162476512,16.608887397499036,15.351983324210408,3.4435676966486772,17.785842035657886,10.068926573919539,1.6027660927229403,11.353442650469137,9.282038792885,3.990224159107667,5.569058049558389,0.5929814089046115,13.067736728889816,7.51892789701222,7.652216647620489,6.774678268534666,6.625513332395343,6.249728074196543,11.056164985083017,10.149136007590904,16.686563679986048,16.812342876411392,15.348927501692486,13.81453094994653,11.976418462780627,1.208428700515678,17.868487608630808,11.096900726729215,3.0454929068536973,9.24617698003078,2.733616948988642,5.24038918365235,12.76899235915491,14.295734540148043,17.350676556835115,19.80112997002372,9.90955118010167,10.515497758954936,8.54177447297686,15.36414315911307,6.137058696270672,16.882213677006227,0.6883925277295688,8.13496313214172,0.7240632853663298,18.330470441772245,5.408237267455651,0.18226071885429462,14.712792394091231,15.979662434081732,3.080251929750033,0.02169794027811811,12.011883168998562,2.539842393003844,1.538432434997481,12.061505103635985,11.541615909226795,16.5411026660706,10.3065504717109,0.37262075529306493,15.406262269300196,6.395065737395016,18.89708785717968,16.535576043144587,14.31039769276456,4.471154387471263,8.223552143585152,15.88325619365441,13.95484645765614,18.670792747800974,14.767913392411586,0.7184659639740731,1.1014699991047383,16.261765661135506,3.836644235594089,9.94470120626534,6.700246991628336,2.7265977069860403,12.343178966128455,7.973983450067839,16.23989293286213,18.851276621297934,6.2118659845402835,15.95056495336773,2.192433886921057,14.333779846983713,17.786079307613974,5.078158929504641,11.506346713730444,13.25804404857394,13.356897952607012,1.7670921934092698,18.656061766967525,3.9460802599953215,2.9391209524037754,17.903596495201782,1.1631470391583276,12.641099417728508,16.774716403215628,10.792999677744252,12.480295969078314,2.165668945311028,14.203830421013821,2.880786984731243,7.210878215976284,5.759582968382264,16.25580704615303,10.273759125034392,7.586059284117694,3.0579549582305487,13.488391883685846,2.089443095520247,19.066114121116126,5.970323527538541,4.667168524140237,12.413340538841595,2.472568917440512,15.57421217767466,17.258978967933302,13.571899117239496,17.74691187716146,12.873975513827034,7.39424839083203,19.79663633525736,15.973859023916962,0.3037732029262852,0.47979263510357306,5.447873539205128,0.5334731620440536,4.158570023058998,18.972293155603623,11.23687354721136,4.837677466932049,0.5340313979590894,14.470367074283189,14.977197639470834,17.373247445666312,4.960919159353674,19.888285160828957,9.670179844995133,18.90103496664799,10.242416075736344,12.952809711199414,11.983329675780432,17.82120693366018,16.16262976813878,1.5435146399719413,19.672698628119857,17.641396506243808,11.449620895154276,2.2008315005493984,1.1818052177881988,18.574220021705212,4.169345187174001,8.403587761318967,12.31600375837889,6.999812580726021,12.429612725708523,3.633044283483211,0.9081239959278031,17.38596073680675,1.772052045243222,17.565367990084653,11.269988145112343,17.207562895558937,15.753091811789574,3.4457318460060504,16.800525418978655,15.086058915181857,4.8444443425124994,5.330734548265621,0.9165802684567925,1.7906805070306664,1.3620569564880913,11.45321379327022,15.05371404339253,1.4884352717846694,4.40098026450507,11.452480678240864,17.181702838389516,5.908493687850207,3.464469484730457,13.65298106143257,9.325030367304112,13.367439780999844,9.836713552334668,3.608891234399758,19.91887910194331,6.320334645785506,16.691052061176773,14.882476070254045,0.397085529109078,13.717535669853472,3.018439992320472,5.9571533984884795,1.0690994824746758,9.647800924920617,19.13607321512358,11.3135463470072,11.887173470356469,3.224703783716585,18.13924051394331,12.935353625178351,13.214564626184684,13.318508291039599,0.8343319001587979,15.12415516738454,16.198369561809326,12.593715620049867,9.622040533125205,14.073545407760705,9.97763213361987,19.292965148848,7.651526654518381,19.478458941898815,14.074771524605865,6.206293772708831,13.760601030386827,18.488693581383426,3.2665437585108403,9.192160074311149,4.593137077545113,1.6243143710214936,13.352824841205377,0.02478438484715184,7.124029483166674,3.4022155398035236,14.182976916561936,2.4428938875927653,9.486357130911411,13.926890845650085,18.09160311649736,1.6047436398917236,11.044180661134181,14.649633795024819,15.160925866124888,15.194300203230057,16.28291906654036,11.821811598474472,1.9977649911577178,2.99800649663323,17.843240507306852,16.059146014150684,11.614972393379785,8.334948466930921,15.478834513358898,0.46405972754391733,1.4233255081023843,2.304191535165123,2.7542889373974955,4.197568875305029,10.207203754480023,2.8632952771126696,18.71232263206851,5.4762198958519015,2.2243616544912426,12.943495313255458,18.701891032995697,2.4174407250550622,15.428164918868301,10.101243642793474,3.4546021407938765,5.657614788235437,18.721948700188044,0.8815203607860678,19.86201427573963,11.021206757361796,12.836657903941848,10.741173460907397,12.173283955316005,17.984445519245384,14.00541673501186,2.411497343477347,6.200888245315963,14.145247854773162,5.313156662894332,14.427582281442547,19.419417837770247,17.687783411975747,7.184216036230011,18.661964403919367,8.436381334899554,6.552055625917719,19.74218339670903,13.94777353800761,12.061602438506487,4.332760825219135,18.079666377552176,2.430042113048878,0.9566830047587382,4.86231136015097,10.422028961357084,8.383054909898524,5.446291905187413,16.979803156436564,11.531891958330158,12.914791521236303,6.3505464502737485,18.21662181750702,17.005615148345818,18.24612281681794,8.509779142360646,6.663324797488781,14.042190434351895,6.897941109485486,0.242900184894137,7.456723550798525,12.509736512170267,13.944325056741423,2.743676829384434,17.378018080834376,8.094677510060698,4.235581335951291,19.822476795315815,19.436646647258904,13.703383599301851,14.043107189101107,1.7852998686846089,8.63697681096053,5.002237656979962,13.257678001346523,16.21717217268182,16.853585954295127,16.789934854874055,5.343070925126376,14.69603547328985,0.44919573243846767,12.737739958022857,3.0907992218341773,8.715098432244396,8.16529945245447,6.505761475310621,0.8378382837929177,14.836083317895747,8.1640196596924,5.0449650198410545,2.0050374336569687,2.7785158402986765,18.465163240102815,15.028936306883956,18.018676243827045,5.8670284249089555,19.533414063392232,10.42714499680352,11.346999894028528,8.869278189013414,3.2336463680065375,15.375401676980935,13.85364216740681,13.28053534728069,6.646801329304455,17.153782432657483,2.6540959874075876,6.563173211480642,16.529685364711607,8.115765305664526,13.415322072862349,8.92407391687736,5.097036074232073,15.900221657511704,12.331706415521877,14.657688622025077,9.523024106426327,17.6123077709604,12.194914334361169,11.357056641773555,7.2753938037015375,9.538931561832342,12.951067670969598,18.11165411653004,1.9950583142612066,10.418977878305427,10.888510934158852,4.205865605912136,6.901130121124055,13.361830231112823,3.0907648155704903,18.793154065902797,1.5702469243751516,2.254113957811521,16.637950369159054,4.519847569047335,12.490451476026543,8.9437317688102,0.6376055500952216,3.68604135478122,19.95680215189408,12.968978925072756,13.223977445566405,4.654684368605935,13.937714338238653,12.763236008618485,18.516188843104114,3.693940530542874,18.51658806826688,7.778495648844244,11.230636197981706,15.3319310156684,4.776231944118612,7.679738753410343,1.1303991333453522,11.500290118545813,2.841021356983724,15.69315154123454,17.883477288881036,1.220383283763522,12.704164720844883,3.482548166911843,15.878369526308775,11.292061600691135,13.735324193703589,0.67216474365277,17.030642440563007,15.13960102465472,7.495509649117649,0.12135932172709918,3.6712242683532237,16.137378293270586,15.356586791263481,17.61523285637523,9.53670827517088,4.892109738660637,9.709804925530516,17.38243305326295,1.2850712933577313,12.479080357386398,13.504516434073643,7.211801283415706,1.8872300015986188,9.73600427390608,9.814766098657653,1.9495910303020159,4.919007679028424,13.524368466670161,3.862333462685865,12.680134417964624,17.856593904335764,1.9667666104785697,15.808941651288446,15.292850446280926,13.372032226532141,17.46306401433131,13.649824376358177,1.0866477813002584,16.28810444144097,4.420055057560339,5.899194979878102,0.8985490973098553,15.547688808130067,10.091666292590684,6.743447232633071,9.850870085189737,12.306856280888434,12.086906200192304,14.434887783123829,8.9737817740953,9.084099979354384,5.149203308957815,16.544810488387004,8.550376466559712,10.936771436513798,19.66256161167614,9.97913331288963,3.147018909251682,8.620755700401181,9.094505122614386,0.19690343117546583,11.205754434185824,2.8904054208045693,13.434132748320152,14.732623009819111,15.684737498327586,15.080520617467377,3.1692755844451703,3.7738030592654326,16.478321830301294,1.9125625870207275,11.533944273911754,12.110012532824088,19.038884674369363,9.866574798755167,7.449383964778669,4.610230891164759,13.823897601381066,13.857175956495569,10.402996597074136,15.803709827137755,1.89072180582035,5.750960553789186,8.061048227592735,12.709394762025848,18.749524416620144,5.6890000086390735,8.345915828440521,10.997076360325666,12.194574423695785,12.48060946609665,8.741281627549085,9.45859325254348,12.966078659453824,17.41647014365639,0.005767870470143599,19.22836350785537,14.555074536616663,4.422744578258695,1.5198981116969001,19.858187210061473,16.493531043291636,7.568412825772999,5.2796986752628605,6.044245631076728,17.683527969202856,9.795801943879447,14.433780622217762,9.153671509050367,11.377116937722892,9.406722427870555,1.533506423613944,9.954558436749835,19.960445194287683,15.779839983347177,11.89211109357827,8.478394914648245,7.585967278147261,3.7246617853886654,13.184915755328376,5.936080321023129,13.717574781908661,11.81237302782797,14.944208459382274,15.402874376926823,8.93083216793686,3.9139991238069705,10.37558944439937,5.925296126592392,13.657280823307527,4.591305491690303,12.193603996356842,13.37483124631655,15.675293509634143,8.127350608057501,10.876547577999652,15.860005054238858,5.053502049433165,10.99888452062257,6.8330114976562095,14.891280331665957,18.701038993894343,8.151671409296162,1.1888927470039956,8.907424407652949,13.435125904728768,6.6908628786977875,9.767888903627266,7.827314256948692,10.241072608310446,5.914072177596679,17.398293334990292,3.7918707165431043,15.927547157292366,16.599355383568227,6.2701693788140345,9.539373772993912,1.389232041449997,8.958956003953332,8.099414601038282,3.812709338757152,15.050912301191591,18.108651155434842,8.354032875360225,11.63305466120165,9.392924588903075,3.935274631668242,4.370829268277734,15.328114635802583,9.77694033889723,6.975981890487071,12.424418160141514,15.675992310752251,6.663956290263662,19.796853844852826,16.371721550139753,17.70112963231346,7.377840962464046,4.932751996815763,16.66910257678905,13.917336931865103,3.4872079353895513,3.9001784193106515,8.222389161430543,11.15679553473393,11.06162899047428,4.7071783449600435,4.367102282804418,5.622630503355026,3.786186671062204,16.682365874835977,17.14385039932729,17.71836605269491,18.804414530112634,8.224852027066758,2.1899245689757407,9.741615892895439,14.18181217075395,17.362364341372206,12.289945687164344,6.585668030232457,17.24861171083878,10.048254515283958,10.070094754604174,14.334191822589766,7.290250542912333,18.213440126870847,5.713147130278355,17.46813344723913,11.44673912296858,15.897473897179797,18.356654401608377,8.910359339705675,1.3328185004698545,1.9308834097879801,16.548159849251256,16.21254766249997,14.939639130085833,15.453605519479625,11.900216120087288,9.673289475216134,5.909227177780063,11.457911240899325,1.2370332221517932,3.8450559844500276,10.154274329921567,0.1403002358806571,0.34566571413892966,9.501779024796217,15.172217105107713,9.461440271463161,2.415972042706649,9.218778026787895,2.648838323267153,5.566618082714885,1.6832643249890245,1.8097653306479211,5.064085183236888,5.576637173411179,9.449160725365315,17.9087403294426,0.3807125732052796,0.8443775514590701,12.784514517222663,5.066529508382067,7.707970189049855,10.154767035572497,16.44679732553812,17.956844914976514,6.469071434174323,14.234341296562555,14.853101282409886,5.908693448526816,3.074280587663254,17.591441385622232,11.152328899330675,17.245331962276545,8.80861417165657,4.999655306915609,15.075771598485188,16.115722413672927,18.43596083740758,2.127817607112612,9.934229901518684,0.7061564602908188,8.504367012107679,19.056325087234953,10.335997326220511,2.3298125093613686,0.6269072921033825,14.676748222807108,18.41658015008506,9.541067723087995,13.31472648150989,16.802483473245534,18.76660402031312,1.5035023051090857,4.87341344210785,5.833372091890889,16.448575430677117,10.323732899810265,15.005930913473001,15.22756746341123,2.2742491957757904,1.9977106461614635,4.002221476131345,17.967724793905408,2.8425023520957904,12.708273202130481,9.717595662422358,2.389871283632994,11.966341349956693,17.638744305148258,9.604892052723377,16.226116526158144,13.296522561317063,2.881632655905526,2.811392402446775,8.067084604126311,15.095282793737606,17.543847257132047,11.09696851774939,7.251492733335616,18.672561479533062,6.67514519706609,0.9184776515992432,8.295802141520156,11.788018184608816,11.93057199926348,5.421687931666823,11.688221836712467,13.800081782404718,19.392388648085692,4.975386983576193,9.636484791871203,8.892053611978973,4.68135542039926,8.202537423369517,6.329267267742016,17.934913210747826,13.218782724044535,19.076932446981782,1.1626482443831154,13.511026944628757,5.0574104545464715,18.052067894161027,6.37598863881828,2.6352747606487847,2.5212118105344317,12.698235868656603,19.277264080873206,9.941192625408943,18.454279117464175,5.2724107792929065,8.140349764735948,15.012697238511837,3.2624620840719842,16.528363706439514,17.541985939471743,19.96345220862684,10.427010433578708,18.636530916584974,4.163675622192482,9.510686454634513,6.326777956144918,19.616314330247512,18.178157792467758,8.788946536771935,0.2727687351030772,8.828969891560728,8.057590012169236,16.552480387480273,10.604480674523513,11.144110530530105,12.453268734093403,11.364188961641473,3.6732923023293695,19.01666514246214,7.708480171806773,13.71739349893653,18.80993238323928,1.5297474118432453,5.033590207268537,19.880833088854782,12.444678211476955,11.670250328645121,6.547444685942945,7.033711735436352,17.269728163552344,9.651656128367412,4.8511903801028256,0.2583100360542723,14.150830320032588,8.653617511702588,9.080022332072314,11.146145830712385,2.582544148386492,19.293954565144134,8.947322666548567,19.347280844721773,14.138686974211963,4.617597962056035,3.263840495176722,9.62623049880226,13.377225637936796,4.721997278679466,11.923992091179256,0.5657305831060766,4.481594782723728,15.241242400569384,18.36528232612004,0.4456844050955189,1.2598637156627523,9.56874217600764,6.658734985936778,14.589853043457076,7.769579402173901,5.173881025537965,17.477648566772416,5.529509806408641,3.2723694594500152,1.7477929491366195,13.234589399937748,12.466485040064143,6.863969329447608,1.191065466014929,6.365922721001813,14.18372720350607,16.420334717593516,7.781777370671237,2.284849141085421,18.15918419226591,15.189791779847873,10.193064282641169,1.8003442820090232,5.607585900163672,12.818606186134733,15.790083499393695,9.11479493056917,19.88930920996602,14.703713711981994,9.75168681926947,5.909292048117618,4.772822631515923,13.327387112748642,11.186936991067991,13.164874309136083,7.76082741865169,14.762938409245375,17.59086003720237,15.90307151451717,9.21727665538127,17.13897026877379,8.963947184408202,0.358295571479319,8.336834014139388,11.326315662203426,18.291022065924338,15.487541774734282,10.743602236255128,12.753810814942938,6.3773342638393915,10.741706280028573,17.359785326032735,3.7530378264509423,12.372496174228026,8.642310495415494,19.157497043847357,10.98195209405902,16.589038157146717,5.686654247146099,4.499940502617701,8.051667782074343,11.708622745730977,18.701833894115335,3.097049976860742,12.050900797688398,11.804686735880278,3.473099266206039,2.994956124278101,17.615886024796442,0.19381266745386316,4.256646839659819,14.010584349761883,3.5209145580637413,13.178801146854227,12.888249606309582,14.561815499572429,3.9482049579524903,10.908393043189095,3.4554970830186527,15.352495086027043,15.380321732273288,10.232364721730306,9.96626663325113,5.379543344697728,2.8255181883047875,17.5991503260193,8.325432819239689,11.161429898503009,12.248986280483894,15.695972525917439,0.5684570490908358,16.755008207301717,12.881675551391595,0.8801529429035426,11.318702554950164,11.398217099900947,0.13342199783668462,19.41643326322678,9.212814760799022,15.519685314331637,14.32104988787794,15.265883717203321,3.6204269595026473,13.82648813342723,12.49889698953313,18.828109723988952,16.05730433894676,12.158074980716682,7.064932913256952,17.438990075863913,11.198103872997262,15.093036481593405,13.653212345608857,7.244242276198758,4.25532984454692,9.173842481997658,4.0851203727338525,16.338556645135135,7.667778797092759,19.84136596997316,1.323483532700278,2.521121483534081,8.382034118728345,3.4296622386361753,3.0067995355902077,14.389311116747304,13.41734238094003,13.052283993231955,13.359011978728379,14.778044543211006,11.315066562584274,8.599099329759436,2.6120268661254498,14.477288108962982,17.00584640156206,10.398765456960497,10.957357891849288,15.167216830696844,0.9958930224297946,6.110666883665741,14.052411117481881,12.389612314045074,4.576781700224757,3.2118884480150767,15.582750097046292,7.528197280137907,4.570258184837437,16.45470505890897,8.812657362439031,17.906074464484117,6.238097227490362,10.124006433246699,8.120185539384025,12.317473333263083,2.910482241303809,9.65422652936125,8.110696312351271,8.347356384088357,12.630073878618045,13.558682830416643,9.190942655873755,17.161642878417346,7.839012884161161,14.383500797350145,1.721867289954142,5.592188358515133,16.090989692464728,4.7183313560986395,1.1098135558598576,7.405100730836223,1.6150201566557687,14.569682233581247,13.04570187608757,9.66345900841346,11.82865198966561,10.97614525196914,3.7662773899365387,3.2176461358232844,4.767497160201928,17.1036635192756,14.623422044866459,0.32852187408799693,18.701583115198464,9.05446023363369,2.8916830952542094,17.452074122674382,5.069565538597418,16.700593091964766,17.300900262604067,18.88939711019955,0.20518401892847926],"expected":[0.6767461798980541,0.5492819974860369,0.8854032062326798,0.5039337109255372,0.9399462396631669,0.9091611007540075,0.9203216816773356,0.5665908575045675,0.9495208338780909,0.5432029901361716,0.5431519935088687,0.5630669487464368,0.5013223479521159,0.5474291618847967,0.5154559863447784,0.573043453321986,0.658630078401708,0.9690137311254357,0.5529792484183151,0.566410030898477,0.5785278133036371,0.5943212907254449,0.9999999999984593,0.5910615054748951,0.5973194328464531,0.5475255865482341,0.7261628322967424,0.7227427860844702,0.6602263282959299,0.5730639336750488,0.6540536871210985,0.6150506321325635,0.5650778442889053,0.6195291050509673,0.6197888248741195,0.5962474028626426,0.34877726800455283,0.5651450794621378,0.529408300181511,0.6800561038117712,0.6078746001490049,0.7361956884115087,0.6411965736111065,0.5562742471507476,0.5276374798448439,0.5831089773750587,0.5632331452080899,0.5753253118786836,0.6255698573402135,0.5492372391524545,0.566184689094591,0.6549719998758481,0.5108333933142823,0.9999999999451961,0.6166331043778364,0.3825811188311798,0.5431716353481438,0.6938748439943847,0.999896062757687,0.598528682045298,0.5058101632574643,0.8023315509374092,1.0,0.6218124109752186,0.43164013175063654,0.7961723505942471,0.5611186975149629,0.5253821368501873,0.535187419948413,0.6489616838645069,1.0,0.5325763175365568,0.75703799750454,0.5399304084971824,0.5614855081867415,0.5090487203877371,0.4807100890078146,0.5043199292927931,0.5970300083146507,0.5838000292754122,0.5077059864549258,0.5828372632222354,0.8617167628604028,0.9996876898107852,0.5860029171372949,0.833390506222148,0.5510325756829816,0.6335287283986802,0.6153146995671753,0.4839810659441243,0.5796933387472285,0.5073367776328488,0.5412480085235455,0.5184792618071139,0.5507865998839437,0.9467398435490599,0.6159292891333035,0.5907040960741708,0.7735712750544834,0.5154404665778599,0.5496074874962459,0.5714352363720291,0.8343364538126297,0.5519712092466159,0.6874402705039037,0.6985804497158961,0.55298198645247,0.5997738946578639,0.5076878553424184,0.5112079438726476,0.5994747201091923,0.5014415656107366,0.950099002408334,0.5134819530564914,0.8716248087117244,0.6131188502205672,0.5916087826159864,0.5119374232370666,0.5814982286332298,0.5245528676504507,0.8691693179158656,0.5715425228381035,0.9475841987840242,0.5313131932572019,0.6753826301433952,0.6584799969535593,0.6348741869955452,0.6494434536383609,0.5821067406075171,0.513099520769007,0.49548313256731086,0.5358675473650618,0.5428879440174129,0.5858319570417221,0.5719363975063596,0.5771018672960295,0.9999999999988394,0.9999995965392191,0.5187565174869221,0.4215321539558664,0.4467147832367533,0.5216410026915587,0.5542257994897187,0.6320769873740327,0.9230043705040889,0.48064065178968246,0.5445357976656117,0.5842432396463558,0.588230412286388,0.5444400985577179,0.5013560607734515,0.49149946891354285,0.5209446109761707,0.6236387360962978,0.5654530432245941,0.5558251461740754,0.5784468145156102,0.9899002367773287,0.5051798844901437,0.5883497482494493,0.5233330969698279,0.3766089273051225,0.8988877317551816,0.5475397882494167,0.6629479418272963,0.6253472663732811,0.5471551833035995,0.5474657736918499,0.5550094179045293,0.734824812992027,0.634012330084196,0.5180345438273943,0.9867487069846244,0.5255592336853747,0.49726872004370676,0.5452599076405522,0.5167250912260258,0.6159567354827987,0.5136112538348895,0.590038349292396,0.6814229448701835,0.5703484114480948,0.8229873390221106,0.9962217020324391,0.5091537212064948,0.5506670987067784,0.5397900969995255,0.9866108772681017,0.5805095063424685,0.6073735583560128,0.5254248982428148,0.5216992438205028,0.8874080016914636,0.581552127226497,0.6245406577608035,0.6069697383675169,0.6799080942501147,0.571638313713882,0.5213940562057275,0.7062186192116293,0.5032130065723766,0.535295650273726,1.0,0.5326474061500256,0.8452976678432376,0.5459158155197714,0.6190058737605724,0.6570878420199917,0.5469407945565257,0.47690522569858695,0.5695781302950813,0.6349567644001607,0.5276381498741225,0.557625553087731,0.5895869173724595,0.5073164512614975,0.9999999869200575,0.5490940376720547,0.5553528560924551,0.5719604795979738,0.47320791875321566,0.5330207078078921,0.6397793925866571,0.4879881738811048,0.5664948537448832,0.5656794371135859,0.5041817673507889,0.6689653300849052,0.5182463674385231,0.58764212742034,0.8142840532987161,0.540229937069022,0.548289113532262,0.9200266322913124,0.5836762032843515,1.0,0.4979673720667069,0.7908750805617878,0.624347110700455,0.7550018824518215,0.5328719112160907,0.540171799800959,0.5828816001309545,0.98041656499474,0.5580013283565677,0.5016816741392157,0.48545348847887687,0.5554118711643976,0.5885560123897802,0.5971269523758936,0.6151867271071542,0.8962053505600762,0.5819942547056923,0.4967854743998376,0.5364109120381422,0.7035187810795215,0.6056776892108513,0.9527127788469727,0.9982478769666676,0.9485216201606108,0.4840699130933635,0.8257868513372616,0.6067287493002517,0.47796039652453953,0.5056899280731891,0.4707758889418748,0.9557334682430971,0.6222083196956728,0.4990880491816654,0.44102149906210986,0.5097486302913519,0.5354201686198076,0.676878953635035,0.6829521767245719,0.5471190607747334,0.9930943628677189,0.5170660306803514,0.5906145029101232,0.5244487880186983,0.5725221956134285,0.5568917123191195,0.535182095676024,0.4911150949959945,0.5432782710313317,0.6694488055762191,0.5182174733426472,0.5913906916155738,0.5014393165354714,0.5384225971304811,0.5446503438191242,0.5765011252956939,0.48717941180694785,0.6740392091635435,0.5948564439191536,0.49825282446067737,0.578478893885373,0.5556969268195433,0.8569490233607546,0.5195074625628691,0.8674439073458043,0.9992429796889005,0.5452476118809377,0.5537777371669071,0.4869733904735323,0.7689789848812119,0.5460642831997948,0.5828086465573353,0.5562232589470449,0.778080867924773,0.5308953149128272,0.5489525376008719,0.56594922890766,0.5755774885277395,0.6876458962955224,0.5896332031646542,0.5415297091694786,1.0,0.6584992609215045,0.6106083990500368,0.5196067168242259,0.5656353555602203,0.5330860145394819,0.5941501033803184,0.7178288176457523,0.5817125527525223,0.5097169567277359,0.5431628962857595,0.4945267802579141,0.9840962305902379,0.6649721198523891,0.6022457196023456,0.5322395723919727,0.5274272461118303,0.5074485300689223,0.5565757057620438,0.5850434070848262,0.5953672857886885,0.034434628402118105,0.5477163589840017,0.5339337423839345,0.5755255487495006,0.6514874555435346,0.5596075709994466,0.9999983670532377,0.5447854182122334,0.5985628499243767,0.4815757233820325,0.9460504980507509,0.805938691993751,0.5718185834563058,0.546697898849663,0.5059979967621605,0.49874925213558974,0.49043214931772317,0.6102154877447231,0.6439049197048017,0.6388649112728066,0.8535497639558929,0.5856236066378454,0.5206996830520539,0.5600604099149573,0.5798081174427653,0.5010359209223857,0.5237175804481797,0.527824094028333,0.5238963803177722,0.7066304270359606,0.5037978775359093,0.6261203579429441,0.5302422277549488,0.5675600366424172,0.626075673329219,0.5764604346117062,0.5046438516723465,0.5670004031294631,0.5817839454719695,0.4961965603967435,0.5927051848028223,0.5547037127663262,0.500356632968406,0.5202680774041915,0.8442599095788046,0.5746194698423281,0.5746920434468454,0.7320035271163976,0.639818760522796,0.5935933258779644,0.8264637764769127,0.48219532589798597,0.5204917964473735,0.7927678271711344,0.579065830233297,0.5402494281062603,0.5410474570039348,0.6347539322748336,0.9999823535298219,0.7523365210327386,0.5495667073582245,0.5221920432353901,0.5572155101709014,0.5337784905138735,0.5470286603994283,0.541654519100589,0.5470989511438129,0.8254090650025627,0.555363293224299,0.5333347571425584,0.5341714383958415,0.5862010766636465,0.7928207463007505,0.51920778693183,0.9997001582462859,0.6170455717906783,0.7778362800463963,0.5571540488141853,0.5869236734872681,0.3866389789384642,0.4831801305984225,0.8691634468581426,0.5193792124088259,0.5601165563182362,0.6014638532202455,0.7652050825593155,0.5356029112862599,0.5524525905365594,0.5706092355220893,1.0,0.8364381136643079,0.4998817689381763,0.518088095124291,0.5832374663396874,0.6128054337688227,0.8141522069307806,0.6143230959067103,0.5138566595424687,0.713991777008939,0.5421538670480515,0.4848239711829952,0.6075950519056568,0.5084858964903518,0.6243279859654719,0.6530428142675202,0.43498342526600614,0.6528578286887512,0.5327183845979524,0.8702450921248195,0.5792358823263973,0.4914949848352008,0.9841735404545676,0.571431249029944,0.49835808741396664,0.5988270174963136,0.5454673509644627,0.49018063191413835,0.2912254317566779,0.5585319372153668,0.5740649786523093,0.551672354946568,0.9998182695683516,0.6014772848734887,0.4905258648671276,0.6245356388093897,0.6506283813842215,0.6348827588569568,0.5975028411360938,0.5392592019154049,0.48709942391965233,0.6608069452390519,0.812351421265337,0.6076461975194805,0.4906699401996458,0.5649516181366232,0.5138852274312088,0.542289134970722,0.48004597593798537,0.6610722408697951,0.6638808375414336,0.9985434070718738,0.5410011399582768,0.6903933340730705,0.49648438848996385,0.5585230385963026,0.5468992004019565,0.5722936844496692,0.8515062829278615,0.8324555123609914,0.5248410549146263,0.9697766022684808,0.5329774188424707,0.5567840820864156,0.5549072067746188,0.5127465116547172,0.6495176935940785,0.6586279912616977,0.5449466461304948,0.5496096717488569,0.6359999127226525,0.5632056824320676,0.6198924260187368,0.5489962588083226,0.5724827735486108,0.6292371617575923,0.5175718757531855,0.5895804490084899,0.5916783078032355,0.5024068463132719,0.5856248638501789,0.6296082892898662,0.6151512148535991,0.5327488226707109,0.579081089364628,0.566627134642151,1.0,0.5205633207205648,0.5771104459632095,0.8239963328706194,0.9607146973564862,0.5490842954841918,0.5194081597090469,0.5935839703661587,0.7540031758712382,0.49008779516423173,0.558657236156058,0.5583407449645462,0.5672696708759574,0.578335653726066,0.5205354022064965,0.6569636661584717,0.33867601672545955,0.5504559759630913,0.5819071358521635,0.5840854666930703,0.5239577536670922,0.4756614374971403,0.5568425428255857,0.7073457326821523,0.5175504706188162,0.5005645544944382,0.5668124909117416,0.5278300246021946,0.5340231023426196,0.5559333502980129,0.6703824351115496,0.6351145874295351,0.6094310647371015,0.7053648465312301,0.5849302989866241,0.5190166019966963,0.5822334346670966,0.5519328303731983,0.5815246075378071,0.6384819063764264,0.6396417359622897,0.5140289611925953,0.4944790167861554,0.5011557030760962,0.49188419397536115,0.5169117489050268,0.5076150792106883,0.5340886123524271,0.4905970753898625,0.5228034092833701,0.5886821005840084,0.7252042812284665,0.6450640875702081,0.5090332447100705,0.5363852051138777,0.6361256042546837,0.525041844278859,0.8128221730789731,0.49873902450011576,0.5336753820345236,0.7242230876567818,0.5788364525870172,0.9910356734442378,0.6725546630901521,0.631405622991827,0.5128081059215852,0.6080646303645052,0.5238685297181874,0.5990925145084424,0.5966275897308123,0.6377726894532356,0.4665481853100855,0.7854914962581461,0.4822933534672751,0.5057830230796899,0.7082960710590052,0.6429629890490258,0.5274619163929375,0.6627687449207588,0.5726344930469944,0.5826843350673303,0.5387616975417662,0.6506516939662537,0.5167679747952315,0.5073428956088503,0.5818075542151379,0.7549002384896333,0.8145974528055802,0.613435477669694,0.494330800626826,0.5399682111608195,0.727146115370471,0.8430400826487943,0.7344082352555539,0.4590752260454497,0.48544992935006614,0.5879492745746744,0.5372431009788772,0.5618191290111783,0.5790669722591633,0.9050899987082011,0.4917011904271536,0.6177242285314785,0.5807394038824525,0.4808621681463509,0.7086832907724177,0.541975155130372,0.6137590012886637,0.6650449132550802,0.5891978928458814,0.7261405585817209,0.5141545606625094,0.6186791847613556,0.5752428904686508,0.5938202233056191,0.5261229363945268,0.551191597710551,0.6827112896198069,0.4231536347065377,0.8887064490122012,0.5849392234874746,0.5699414042437765,0.4868565683533036,0.6150116283634877,0.5606806781649054,0.5176173552488538,0.4536726830938284,0.5433856361091305,0.9863395743308627,0.5379294799401815,0.5587742376581502,1.0,0.3668846685781757,0.6079956271999416,0.6012513579841574,0.5961779120906047,0.7825075231832079,0.6602768833860516,0.5135048084463214,0.5376299101603317,0.3988014284710337,0.9439180209703624,0.6192056350531806,0.5742534222241865,0.5763686075242871,0.5131141573279274,0.9999812406830395,0.9999989459134327,0.525519917387312,0.7961196389783598,0.6900695768703099,0.6072441592479829,0.5733971926949035,0.580605418886456,0.5858929120451405,0.5870461705932415,0.5082818034343513,0.5125672981551378,0.4987469700985299,0.5222928540138349,0.6035230485793461,0.4988714511099449,0.4895642553249152,0.7645733720591434,0.4819666790828813,0.6024728991279564,0.5172341895574618,0.8202176092876976,0.6751305546453547,0.9999579517173364,0.5045514940541497,0.5557354689770789,0.5774778847249711,0.9567902734534512,0.5095776629938439,0.5375632975246775,0.5172225494662711,0.5144707551770155,0.6367327451949715,0.5384585802135534,0.5236853422007968,0.9993309174481549,0.8337839921820972,0.7332261822971604,0.5838566976417595,0.5377486334463487,0.5995064004909024,0.5317128269095347,0.9126778885401678,0.7880778095391614,0.7601120440189029,0.5401930112678078,0.9257422743124021,0.48758692641805923,0.6070029469727235,0.6237308611696286,0.49684281658062796,0.5371343501066111,0.5233409442074187,0.5860098130575033,0.6167605672140948,0.8938374263482729,0.593656539734287,0.5111477587587715,0.6194602782553306,0.5519353925625656,0.5204277980659139,0.5373361499362957,0.5575426906882421,0.6847578590040294,0.9973225794668186,0.4728314303784306,0.6200570915759916,0.6159256142131667,0.775541629737707,0.5359810578641376,0.5137646368312534,0.4882208110160378,0.7643362436743493,0.6381944240611237,0.5850287991337512,0.4584814780239263,0.7137284740230383,0.7789522384063081,0.5420605859879178,0.5176261961920057,0.5274345300874065,0.7578124614720505,0.5998671106988522,0.7892012864857361,0.5640513421200617,0.6594080620631227,0.6521844243002586,0.7812990163361975,0.5017445684840087,0.5821001796555805,0.5314076942085497,0.49919841901840306,0.6053805224251775,0.6562194821481585,0.6067380992061596,0.7546172538617109,0.5016917043383429,0.6058881591974623,0.5309610810608464,0.5869602228760488,0.49600912897484234,0.4345657461290426,0.633976137899354,0.633203891870533,0.52226950072261,0.5693663173556214,0.551011151546212,1.0,0.6806768628321822,0.4703000702017576,0.592251116799545,0.6470596971106131,0.6331271865854524,0.6175318451641582,0.6035563575330909,0.6908738553452459,0.5805287735862396,0.6167204304665707,0.4997410409291368,0.5887156804429781,0.8200113775362682,0.5637926620842362,0.5462374233648425,0.5210905279208798,0.5739105769853758,0.4562303214357123,0.6143818215811565,0.5635749526823566,0.5775211061198465,0.7708450665451613,1.0,0.49737093991790343,0.47035378661626126,0.5971215910932631,0.6188623229077432,0.6936811647858346,0.5303071784652087,0.5983481296128201,0.5718231505792375,0.5928420676750528,0.7326579190485858,0.8334664347013607,0.6477277348776811,0.5042391447226422,0.8346071203086534,0.6017491567978115,0.99999999999969,0.6169767998816255,0.5795224436752213,0.5890114656216645,0.5508560667485694,0.9978809998004544,0.629993678743497,0.5492603815754572,0.5322864700979668,0.6596717957528079,0.6643611332134935,0.517364939249092,0.6652184211863742,0.6961710433316615,0.7825728050352347,0.5406184947141401,0.48440834159764984,0.5694080834672999,0.9908111959464353,0.6534850552654088,0.571397673877262,0.5868922090993955,0.5530205922947645,0.44490798151488864,0.5336712755078811,0.5918564946754699,0.4941588163806911,0.9827765573683604,0.6844411433210185,0.5859634336753053,0.5292101989506346,0.5173722966366683,0.5388353700165714,0.5269733097592979,0.618417963549937,0.7117265464546986,0.6371267190283744,0.6142667567250311,0.547253173195346,0.6157922060473633,0.5746821535956641,0.6059318962215837,0.5781969300844163,0.5798057601931851,0.6501793524776001,0.5215654571360443,0.5811081256937883,1.0,0.6448638475569881,0.6146047565759709,0.5830561300509807,0.5941636212670229,0.5650934130621563,0.5939055183010874,0.724475507357659,0.5641240710123295,0.5019264892756985,0.6690208301840894,0.6201720913332236,0.6312707375675513,0.5488643005312243,0.546732907035859,0.4840457832085644,0.6550985403230142,0.8141938031046281,0.6431081881009195,0.6573293449436772,0.5425958912109855,0.6597373459503744,0.6009315796129973,0.6000622099450281,0.5550364276716624,0.7389667083629705,0.543960191403754,0.9999999984549833,0.7261048134061383,0.5024172279122794,0.8383763911813154,0.5388061772248622,0.4917773664861601,0.5041409931566053,0.5154348916410003,0.507208798257679,0.7168704803662027,0.525917487496803,0.6234574808780543,0.6555729875633769,0.5798414088348998,0.5447876388359557,0.91287609761388,0.5345517692204244,0.620529459932272,0.5879304243019405,0.5005827602253019,0.5801652886713639,0.8258582470559055,0.5651116178658279,0.565679280323656,0.99999945804927,0.5007552148354998,0.5298312172860227,1.0,0.5255862075358945,0.5049058956920489,0.5642922356496287,0.6155403049963138,0.5649932037569779,0.5382492986399124,0.6332846315782331,0.6084782937210216,0.5731256171468824,0.60362980991229,0.5207388888740436,0.6818810793308953,0.5000585172886066,0.602500800528605,0.5708680868553795,0.5727245192510536,0.605781493513272,0.6275803007511561,0.5341655817739802,0.5484925947925917,0.5905706856482621,0.6376029014022266,0.5230800653838955,0.9940605484799897,0.7119727378674057,0.5257611831125446,0.8847926759264224,0.8064561950262653,0.5843951017837418,0.5954726439133475,0.5993373758998605,0.5382429927473649,0.5390528038659045,0.5773640124910099,0.7019247404775271,0.7850173611073739,0.5977650528567657,0.5095183361870371,0.6371588956477106,0.6114527062408751,0.5191946322583118,0.4597571579289212,0.5404377359555279,0.5164191706058353,0.5199761248967084,0.8026065158135705,0.4812747383170584,0.5700101966826691,0.7394798684773691,0.7092343024870447,0.5857517619948952,0.5109731251638371,0.5767001611557417,0.5726471737877034,0.4849929356526604,0.5199590624058094,0.542077241070398,0.5514345581901782,0.5829888161156835,0.7035558978760921,0.6814369523463212,0.6094758795025726,0.6159517749436907,0.5908565920196028,0.5530940153743957,0.5109337919583448,0.4958066286312838,0.9081963656651018,0.6609540118509641,0.6160018191478304,0.7598883612202825,0.7479208004408009,0.5166763401158584,0.3926058476593533,0.5612582872521884,0.6354524134884129,0.49789593865536425,0.5502288067685328,0.5142824388171031,0.8538531731509333,0.498056213074049,0.7459486254149974,0.5969059053414291,0.5135192125534642,0.970273651842726,0.5060250948134447,0.6272626701571609,0.7492817641224101,0.5410363027890023,0.7837994772717913,0.4872946115582053,0.5368673410785789,0.5819174723663075,0.9931456750045816],"x":[2.579745411561455,0.7382672480315988,2.5172281283741347,1.0779911194961889,2.623619004167239,4.445207726336742,3.144708699865336,3.672420474016862,1.7902812437125593,1.5322258393736443,1.9108079872724493,2.7404475176393897,0.9853223462855099,2.510437810931995,0.35973100298323346,4.035334369503387,4.511791157568384,3.2918646731657644,1.8077888123937846,1.7514414297862724,0.8446556139968275,2.082526204638926,4.224279539404079,3.088726755487082,1.904767223063828,0.9333469925297189,4.538686588083669,4.081249265926779,2.9232617538085393,2.6778887674532115,4.507045347209882,4.916733541958285,3.7317523911654993,4.889932286844051,4.736196347680515,3.046824805195183,0.2533930315779187,3.3247459758044418,0.9753715810265962,2.0374509609158875,3.5109790118025552,2.05966452769725,2.772380581184659,2.5230622931231075,1.7418988979666417,4.240529285545218,4.139127160702301,2.09141195416744,3.642773757151976,2.0390626487194883,2.69158867692594,3.1532103583511994,1.2986612863410107,4.8005227553737,2.7661246469449763,0.7026207054759248,2.0700447366828922,3.664925465484159,1.3585227575312486,3.869976747082079,1.1640771964769014,2.759504191820674,2.157447217835765,3.83917907579691,0.010468836751187371,1.2788112663164408,1.91276119344568,1.6430227349191995,2.2343280294819348,4.182311952984355,4.5887437401944595,1.8870381237191491,4.696074987755084,1.9012272506767025,3.1138594002471653,1.082935006906277,0.3143634813257268,0.2819207067392393,4.337587012880335,3.710963457366898,1.1913230989792478,3.517608348583937,1.7400748021950918,3.993248548402514,4.4152472486341665,3.934931599632161,2.2115586729195327,3.2159178512621764,1.4340317586174955,0.12970650019807572,1.6404271178211727,0.6808672822531925,2.6945546460867433,0.400036832178603,2.6433864721401923,3.785372515461196,4.669892049579536,4.802106260832593,4.253202982923625,0.6552657731761935,1.896779005023046,2.8652615917434843,2.691229215724743,2.463127943629131,2.6100986976572305,1.9075820694982626,3.2169282692887102,0.8297618987151001,0.43962701266342163,1.1617604207892351,3.6028044814200753,0.42508687107251864,4.23900297758164,1.4543852041804406,3.4265110478268577,2.554111916812114,2.2878138710082285,0.5977338514045083,2.747452663920491,0.7447567756166273,3.6073773435515744,2.5445378708906796,3.9546658640618784,1.654576315099202,2.812799336839266,2.5474149776811803,4.953685533687332,1.4351805557524178,3.651715176376442,0.8229249921018489,0.015370685374761495,2.314617820536955,1.928807577197087,2.084681482703099,4.423465927719005,3.1771296568213425,2.9172707015175723,2.9543336062638073,0.35364990342066305,0.7092907840608931,0.19789438555161465,1.624408076216265,2.104815082789856,2.4204466678870395,1.7374190160887815,0.12510181789527675,1.8696992381152433,4.21439542178539,1.2406624328728966,2.8047805510134225,0.29860042053757807,0.04726345628867423,1.3367064648337168,4.778826027171109,2.902078460389493,2.593842178095016,3.2984359591460652,3.8516415797636636,1.0603607668725368,4.92878939558358,0.7177806903559003,0.14792963055044184,1.880648505460214,2.2559313691485148,2.23503444552973,2.806009479156307,2.1056604476864904,1.6206348631265355,1.7833425248052437,2.8264698546181077,0.9587956675810472,0.9379721054661172,4.045142461725667,1.5382542178461733,0.32314952469457037,2.573877543649333,0.6997287512451988,1.7584688625495992,1.3358658062969009,3.756055411528637,3.251490108148473,1.894741114087224,0.9168982115933433,4.952904464248307,1.0264182871873584,2.4499628320301756,2.498340308221506,3.3861571104254526,1.1748310140238882,3.263930731973451,1.2692800691554817,0.40839726005828414,4.293804579157364,3.0841763197408256,3.9142236092470704,4.319890779878649,4.8000544530459415,0.9868995379122381,1.3417402359845632,4.4233162758487845,0.2601346770893409,2.2462557126655747,4.021530559499339,1.55382366942318,3.6833327772836135,1.1026051655189095,1.2239797960489818,3.95633886672621,2.6048812434870383,0.22418475696430407,2.7046888169949304,1.2569825647194144,1.2785416473576294,2.0565891513821324,3.7387533821300467,0.39974262967478524,4.963302707834217,2.6105029961707835,3.2424079538129646,2.655581758943759,0.13062718342602309,1.3439106268788648,4.14989813256989,0.4106217186089878,1.4380908866065312,3.79431171552014,0.8971100917797248,3.505192963382523,1.0992986909337887,4.89265159180471,3.057156534730654,1.3727360289211221,1.3528181249448645,3.004980688037693,2.9313284608318977,4.511693239076653,0.40673086505815803,3.6923501730830175,4.953293607350188,2.2020193091425666,1.5637216336577475,2.1862592305540884,4.382303016424256,3.8845944399553103,2.443826327352646,0.46799137278662584,0.06293475396349946,2.891853150384738,3.7158705430187258,3.1485259948498836,1.3484999294484834,4.71768382547697,4.034655545369033,0.4996590858857053,1.300646327504329,4.623141952991978,4.28169093250972,1.4843299417158018,4.3725677868011195,4.582428583029474,0.254133369377314,4.159744552699152,3.597617928140593,0.800086873896021,0.818206744007064,0.35315167299838635,4.100515415512489,4.93067194428264,0.2879143263213768,0.11317368893387192,0.9864998384123547,1.2938700977912354,2.5472811810276355,3.0266623627925715,3.1799108334738624,2.9566611834402625,1.5978730114899686,2.794911218958732,1.7572664452045739,2.591346517107549,2.5785106382501954,1.7919035304216369,0.11647072369383338,1.0557208190386014,3.6901225059893417,0.9503789968168952,1.9511540813617279,0.119540923907967,2.2648651840607448,2.342984823003623,2.19412957389432,0.3665901100400215,4.088664867217666,2.4223972304093877,0.705267069484462,3.5074087870938877,2.271702717717158,4.933409221212123,1.4436290458941825,3.7078805348362187,3.9994466931479957,1.0944576652851756,2.1410047757008277,0.5865962532054758,4.55897985450029,2.1599837322015403,2.562585003501072,2.7755755028130746,4.940541217443702,1.565575425156882,3.055282282129256,3.54263975774733,2.30527674176475,4.058791405277818,3.9031633312974168,0.964761686417257,4.404512651250102,3.237882547213582,3.7859913668600464,1.6623791678496602,0.7897739617912258,2.3795013981480984,2.7784614904415896,3.160021373089795,4.714708254829297,0.49254674191630876,1.7308686643275717,0.7956014239927689,4.041193069922665,4.2422654872418075,2.199082239350484,1.9029746484825494,1.4626200192264527,0.6731673622019718,3.1938288239337167,1.8133267497113426,4.381102229133873,0.13065963316572393,2.286008142259649,1.2094574326097085,2.0610945511668644,4.023641166973249,1.3144288230317303,3.9915877585229618,2.614805030235342,2.5429522419760553,0.6510889234255601,3.8550930503825533,3.1062313147298006,3.9553209393882405,1.9389585283924804,0.895214956757332,0.2001700245072946,0.3248670166448775,3.5468995178792473,4.651340644288861,3.2912532208400256,4.092093902724679,3.4512187124669715,0.9186508651758096,2.3228997164514875,1.6201993983884888,0.09822866083706194,0.6020014078400648,1.2112180184020027,1.9595082385453844,4.416284913269345,0.9586505477796803,3.422070483477142,0.9859695192550266,3.3230168766102453,4.806140840587426,3.2453690178606287,0.3415979319193374,3.122014772064068,3.1330727159582796,0.47472263759169797,2.3895848407675304,1.9225511461095535,0.3118705982770198,1.6780564187254798,2.4640032745051488,2.633289721401404,2.593347673044181,3.038416740713382,2.8281932183313616,3.553923717699894,3.7151415902305507,0.060020887754819174,0.6534685968280529,2.2641454231143685,3.466945984925923,1.2098044802170516,1.959235555835105,3.412217676253105,3.2184893319434025,2.590282643257135,2.7133546758241653,0.8089865295775633,2.8060620106130294,0.7142685881681676,2.5804284531878063,1.670995370639733,2.295996954215489,4.352697016252086,2.6809659523408946,1.5075513922132566,1.9085116168957095,3.8485848513686314,4.872939078087423,0.6650604220220768,4.598681806025603,4.0809216454228565,2.9938165163772092,2.32965788766223,4.850936608903505,0.5501366188582524,0.3806270590571603,4.688145552902214,1.4125755534343776,2.0865799139762453,4.091665825592722,0.9149923968963469,1.5895535433902652,2.899004862515102,1.3876599352426278,3.3472569545762,4.491826197280608,0.8060687408950373,1.1652344855136787,4.071589843381855,3.339669630805381,4.929637037124089,3.662061019202607,0.941087394216521,0.842536567388612,1.5174874419103912,0.27009978612882013,2.591523670129222,0.14297493737898015,3.8302357213733416,4.412541102595751,0.6359234713582451,2.012525491175415,1.5314215431837375,4.385363101001023,3.3277769000275406,0.08880034804042203,4.3141113725375835,3.44149733174116,0.8160480033099371,3.679566338106428,2.530957023861183,0.04444071003063654,0.15468010489496864,3.0816747892773035,1.2176488495222981,0.8972659789080384,3.3050989431889133,4.01628821436895,0.432098748209474,2.6364697449213805,4.0128853516545595,4.859145680620422,3.9825210524542753,1.8691620798243314,0.47802986633083466,4.186364231285458,4.929059888993694,4.791104306236948,0.7447807791662442,2.3241489578973082,1.5741068785239687,1.695819343521855,0.724605303914525,4.43715751586848,4.7135813439262115,0.9653178176110466,1.4624417819957314,2.1958995140482895,0.42342895356124455,2.840088005158241,2.7342735753489302,3.378203478801308,4.102412421003905,4.253877366379754,1.6441467421108535,4.268231364860671,1.4614432738526673,1.9970180450404196,3.2874740392334747,0.9025236961418692,3.603936388297293,2.4808795911208703,2.120609034076999,2.0137829909049154,4.112472242510031,2.8511114957659522,0.7850872440725831,0.9163573332422636,2.1775243186502005,4.660374078157687,1.072118257670226,2.1624176278217644,2.3200089461626217,0.9130577432285569,2.6809935007700325,4.697952242812946,3.1440902018040617,1.2032516213697664,2.8835265469085636,3.906272552331822,1.2686954023640995,1.5243854092899467,3.1082952401753925,4.4174015791932275,2.769239862880666,2.635421416042992,0.9341033011332567,2.0246052212268904,4.581098584920031,0.4541182969112134,3.166568054258981,1.6813669439716639,2.739948869907385,2.6392532857479525,1.063055718440853,4.342606767734479,0.1296307821149656,1.3455709294026619,4.422769322532101,3.5155287614379294,1.2918327834045906,0.08841138804323245,1.5820410298293852,2.138142754456771,0.8734244812781011,0.22081321630020412,2.811831685729743,1.2499086867866893,2.1258397012746153,3.0237727744189504,4.51126054757297,1.5510446564649427,3.1991156395333453,3.4626308641933026,3.3950219475597168,0.8300296662182904,2.541880823208611,2.28160420304523,3.928748906458389,3.4652463093223576,4.358512155954858,0.8560940593377542,0.3550392311950812,0.9868350076068566,0.3040635882551168,1.305387109253443,1.3123910281892581,0.8279859062738604,0.16853659765673545,0.5857057183629577,3.1918017544307076,4.243516717436588,3.815709107583567,0.7292210812652511,1.669507720983937,2.955400387409334,1.5059099781335206,4.114507035665717,0.9018503404624933,2.278683223561835,4.073077663164888,2.545816295503671,3.498297943403683,4.157446222165446,3.1379911047448674,0.27335294295255497,4.226868610565266,1.2176365682558543,2.576032833431907,3.315936337589147,3.799279605350482,0.6367413132742339,4.186283260307103,0.15801822156707113,0.5059776020828011,4.1015133115453395,4.842942149310653,1.8900032779790321,3.403772200517291,4.420180788352251,4.145065714872155,1.9171620577985804,3.374704842431756,0.21954621718405787,0.9280517356109474,3.3163371862836577,2.8280400283289997,3.6293048646674353,3.3437652657760664,0.31754670841044996,1.4079825308425231,3.6548479557155877,4.590869287857205,3.9835466400984396,0.3774396312723871,0.2936532605555231,4.210987743749836,2.404983425639794,3.128202952187631,2.1090591346357836,2.9266874158890674,0.2879271433801045,4.9734087347291975,3.8968202815801645,0.22464260187208818,4.361379790358594,1.8694582629771117,3.6957267248690417,4.451726122859865,3.346296713475574,4.465888197366905,1.1020600708241812,2.6070007202391485,4.245666183966455,3.6963030039349376,1.702711944441756,2.9725465724073494,4.707793153063831,0.3935457392241315,2.931932663462878,3.8015318998077907,3.1052200320020864,0.11355964116545159,4.918853954078497,1.8756024673901506,0.52905113526866,0.01896596497019787,1.892062553851116,2.871616635315255,0.6152218331543546,1.5538433384908446,4.688426784185559,0.3772417057271149,3.1304101039581522,4.687879230845025,2.867786105700204,1.9692551040409478,3.9303235433738317,0.5829117363994385,1.0558063473885004,0.33540873956898865,2.916354124852444,1.58074512183772,1.9424513535208254,1.8380927053205087,0.8682480789940361,2.179588886929975,4.211622792960866,1.3158816040684718,4.320174819415832,4.773351515978593,2.8937901002385558,3.964621416733486,4.3044687487940365,2.0317280987900976,3.5152451293433318,0.970817630713624,0.44312839458077513,0.6062773338074368,1.1545953388438979,3.7597492279771694,0.8285429414999201,0.14198179983407444,4.065038729572221,0.13372577658295248,4.261601875073062,1.7479663660024691,2.7428719050750896,4.937309477400027,2.8323627261477826,0.5832474773244645,2.903104101541103,2.7887349104682055,4.79220479013218,0.548055202873764,2.052777746959297,1.2070103415558442,0.7418493318427544,4.881185223886223,2.4273909386522363,2.0210537904073766,4.963685575628213,4.827010166881106,4.391949631492168,4.167676770429098,1.6651685412637363,4.353545954502338,1.3059211570411355,3.333658910816981,2.5824067702256928,2.9213999154474,2.1990786648996377,4.452449854064632,0.15181898704960117,3.140297397114493,0.949847424381004,0.09099680555215595,2.2006063367049022,1.5604945682321425,3.7837546934237265,4.351959113022549,3.7764761372972275,1.5766526800698155,0.417158342220465,4.781269350120262,3.0920799369056806,1.2414763041219334,1.5431626466046922,2.874265815598196,3.363052553839274,2.8196805320111364,0.14720847671322201,3.668092346695475,3.599912489056295,4.422279014445396,1.7281165189863557,1.4398871986884554,0.17710096858099433,3.7626345338171374,4.331936058630345,2.532028976249906,0.36267197239379656,4.905398739746564,4.981577594972888,1.9495340222610746,1.1438731122161516,2.0684236322164717,1.1068329453408643,4.196069840031587,4.2378336747283445,3.734284347330962,2.7703116011582796,1.0347743417698285,1.96996683099533,0.6908867626951343,4.3992154779309285,1.5419663830110408,0.40555175270177823,1.732852951204712,3.9182294827235853,4.746358599024507,2.546185991169214,0.19007914351358401,4.872052681343164,1.6651954858347784,3.248443741717466,0.7093262287146596,0.12402461317169822,3.828571846454236,2.5400652917606994,1.5483636868539552,3.5961882757756456,1.6727866653149093,2.8885041103083395,4.181837297101465,0.03579345896872921,4.3401693303791085,4.282283240216334,4.3559093477971045,4.219824924568794,3.4029502272065795,2.076644852064682,4.142601609558768,3.0747375988932912,0.2648208565274046,4.292584447689379,1.6939958456401383,1.7107237387422891,3.223587108895274,1.532847100620227,2.5298919957345145,0.16898149356671,2.9462588551571556,3.2057468161084923,2.1944837862215074,4.279280465989128,4.4733463855540005,0.31939415657363246,0.05648772668111812,2.6463719503951832,3.9937057848288973,1.5517084348491128,1.5269447707171258,3.211583813388658,3.618961721721705,3.866141382316901,3.438359993531266,3.2498955343514444,4.427757759167217,0.4492147516640277,4.652800227548866,3.8110054209304556,4.998314783890967,2.1681207804313662,3.846312229499169,4.330892198212926,0.7747628290105912,4.363849947810579,3.551306685372565,1.3739716224282794,1.7629996375766,3.925350388196416,2.320019050192099,0.7790524030801094,2.8630632204729336,2.5852970104424378,2.0800661563344924,1.9449718009899164,0.041814762009037,1.3247829625828789,3.673862320781651,2.8234215246297234,3.023354940602406,3.8936186582884638,1.5416222130853319,0.41965120446215254,1.6866358977483964,4.015114028921188,0.5862055496169349,4.3161874649752825,3.4532124310756265,3.1527160035228663,1.589985221183552,1.1867980462093741,2.084994732128258,1.8278015746786447,3.0542786036190552,3.6882956332632846,2.3694851587914325,3.9147485187228783,1.8391119993128513,4.445083751322516,1.6510363425120655,4.87858726120092,3.4763812021123117,3.3485282969553087,4.49750466749327,1.2292163710141868,2.1590891094937525,4.0141398845272045,3.402947696977253,4.289929203973278,3.99978738156062,4.231228985329162,2.706405639798677,3.8089099093343446,4.510487229414829,2.631876543869267,0.3642233103747583,2.1985402685395083,4.14320987633627,3.7034053237855313,2.4357344481878695,2.1690242303277696,0.17527848888403308,3.212022139077355,4.2149460283413855,3.007951331175974,4.786256032801667,2.7533588696349174,1.7088827680274576,3.833501091266598,3.452079675341441,1.045108988438317,2.0237657862927594,2.605583077066558,1.4021127971401215,2.842481933879136,0.20530716082906242,3.9378218516781107,2.2206343478342063,0.24362435852531283,0.5938817841900279,1.0209053790695044,0.5458778519768115,2.6300512490528916,1.1608241189132629,4.845103354765378,4.925286329119466,2.1425732373723196,1.569759485400457,4.15678491379058,2.134472558417646,3.4999125855228073,2.511538793528989,0.6424209669487768,3.453998707025546,1.4446187237750274,3.1493323136832574,2.202529169996932,4.637950374501413,0.5911942691436756,0.9656811916591079,2.2086628099538554,2.2305095021666634,0.5329974708134233,3.1287158362946577,4.282835885505096,2.6373736108097967,0.37036248184827536,4.8263046164520755,4.302295558084591,4.3975071612489725,4.266414510820713,1.5164674526490285,3.414712085394551,0.8650151895703495,3.1098661542734285,2.6980870215436337,2.7967643511756854,2.0118729389192955,2.1259153835004776,1.3327123141703001,1.1002786817287602,4.606779893713064,2.932332377803686,1.7242613228206616,3.5617023568166473,1.5177360775785564,0.846399461849755,4.7335711075151,3.3457080462876707,3.1650449008676285,3.385876945389991,3.4651959496655205,1.8120513875740207,1.4829363848651234,2.854551684924301,4.896117193645124,2.7050649105191904,3.63833601328953,1.170817901068345,4.137581166873446,3.5902127250316918,1.3241298934681156,0.43097754719281123,0.9387364932248099,0.7599333953913057,1.5832850508996599,4.07905588188088,0.07178941675445749,3.3038404532499035,4.981750461571398,3.421798338393912,4.004109476397137,0.8783200026049642,3.633283584688826,1.1564543657556436,0.07908469088531933,1.1418899566008944,1.8441803992968486,0.5520437102824138,2.3043567889131467,4.752881233075801,4.8873725545721625,3.969555701524099,4.530059508098016,2.4756117043718193,2.3421774510204973,0.43732411234332247,0.6387534998799693,2.5523509923659393,2.6469136694668007,4.805511940982695,3.3431895589276728,1.6648725812864018,0.9252423638418306,0.513762519980524,2.4457641748941947,4.914911538500588,0.9381767448215939,1.7093755456922022,1.2111934362265808,4.265676590531533,0.1546738421953664,3.510381017026626,4.886242540492866,1.034614671238081,1.2399793445369134,0.7127154798680146,3.841780503899469,2.938510186750137,2.448330859215927,4.670779600313732,0.19266308270638355,1.9752718759796795,4.39689298414509,0.8705475262220397],"mu":[0.8941163664271288,0.5407833266144872,0.08088438494606476,0.9713337327219096,0.22866432973360196,0.4954825898295645,0.3366653596695228,0.9576775671899134,0.05466700663624646,0.9730385776648307,0.8063790456254525,0.7338691120977212,0.9302698498898936,0.6809613836529396,0.22628549096383654,0.7604640302536094,0.3963466194334577,0.30031430181824725,0.29560058519429955,0.19909823314151587,0.05407770311257076,0.7533299452009974,0.08884939780889445,0.07953523584182065,0.05199195033518267,0.01957926383846087,0.46541991472042143,0.16551162405936615,0.34161846244885696,0.6415626639947771,0.48506518354861283,0.03579090407047247,0.9769449866342024,0.22010884415428245,0.523783730546193,0.1288213750041698,0.7230170581547679,0.393830476835922,0.15661377230916185,0.6125997758293087,0.9795258538114828,0.33294617283619754,0.877146554623276,0.7158707439566203,0.7507413843860569,0.5994297404258233,0.9873504029997464,0.20910617446237612,0.2763156829630564,0.9821507485308434,0.13086470401153782,0.7058797984521703,0.8401635204963958,0.35827861075845324,0.35288844720584467,0.918904784708787,0.08252092106228281,0.9236851944449551,0.6824722720644201,0.1985376334753206,0.9313424513338084,0.1413554925676057,0.6505431634087864,0.11256068378452544,0.4478298078996732,0.004947915810365799,0.057627842714931043,0.9082076711005977,0.7734764644752841,0.23986326555912196,0.6523119270681286,0.6276119813841301,0.2399527098566192,0.006635457063559835,0.5552007682079951,0.7583219018061651,0.5306398943476887,0.1928705864010769,0.4355943700727567,0.757775113701254,0.8306548238254918,0.4287920004548804,0.9583372319955676,0.2254589815785235,0.8819747625841163,0.22240119586843243,0.9359461079920925,0.9297002960817966,0.6345980083589531,0.6254617551741988,0.03678705296028295,0.38218948813639053,0.7419708394476432,0.11219625091826013,0.6073137805793491,0.246712319808718,0.44419534653425274,0.7227525582604937,0.4412334506960587,0.20981852591292904,0.24390227752838345,0.4606279454414637,0.9745976298915686,0.02584067909504717,0.6820134888818818,0.37829250678581405,0.8321876949747244,0.5357626423119473,0.19601041909025585,0.690427027123,0.8831011587900932,0.3799896088440968,0.6747140365879156,0.9742860807621663,0.15939527300699718,0.4812933428362651,0.9534030526715864,0.11124388679752695,0.6338548140412705,0.2775782894590513,0.17490534478258923,0.11254470845756592,0.5658648510476381,0.15652687695232625,0.09734359096147549,0.6417246619696877,0.6736795226377659,0.48616325429446783,0.4233992640994957,0.25611368520659106,0.1690364709314347,0.7168975178075396,0.5421253049299677,0.48134157941771294,0.8342121433399787,0.07045624810700879,0.7867013895443078,0.5871874341584582,0.09742033110288717,0.8149053486319786,0.7550008178746235,0.5947327610169812,0.5727214248094394,0.7884109482346155,0.9761175797139425,0.8275766510567288,0.19423642163964683,0.5180489506983881,0.13440084650587858,0.5847269952607606,0.2657300594437182,0.45003098144977205,0.798728732429725,0.6980234855034233,0.9271116928716441,0.09187442160805004,0.09950173062632106,0.26664220312252884,0.8049223867221089,0.989431014468158,0.047739876571994966,0.8398693199310459,0.37356398484941833,0.037277667021840655,0.4817328122026727,0.12059850397633975,0.6464959541285891,0.7858290857501902,0.06397853302612488,0.5468390053135646,0.6477640387953232,0.15175626484998928,0.1133720139996417,0.41211406085129276,0.4003078874676156,0.6174768880256518,0.03910906453915319,0.7423958687334429,0.7625482841659756,0.3218102543662167,0.9664551053608696,0.949808379068593,0.06740268239307934,0.16952226508264623,0.9951631797187899,0.9914309956295939,0.9944001294763043,0.08966712488968676,0.28056463157672207,0.1433575439480772,0.1735346360241874,0.08686420938146355,0.09189396910539505,0.27349453315850347,0.9541956632601754,0.6915699400151147,0.20196321361026848,0.33532602987495563,0.27303907053760024,0.995348294221621,0.12570660972530612,0.9278348304501058,0.43269796981013897,0.42999443848302255,0.615172976849802,0.4154524846701402,0.9001806787266255,0.05353094179128992,0.3480503386562588,0.8794923584709875,0.6208646999927503,0.14442587508840354,0.020874121090129316,0.18158580336821117,0.7458856919087538,0.15547250679028202,0.3199381508925989,0.7445941927340025,0.9876395851301221,0.3714896574239748,0.7773086550572472,0.17770097930665152,0.5792110858791952,0.9916049340599129,0.1567873763549703,0.5728709018343208,0.7495737167384133,0.7926830835328653,0.4697124154471415,0.7977053861629355,0.13753793926290658,0.44420819435379943,0.7954870707919679,0.7224117415655924,0.10978091838005444,0.6419988762479785,0.44302825615464614,0.9383882666917285,0.4584520898053901,0.5156534742441905,0.7811813863665018,0.7815018604707387,0.5962577025940217,0.5749239329646421,0.8324385627074835,0.4062381205690815,0.615865553946904,0.7745788871585209,0.07123107251958372,0.241335618756519,0.7634276304372352,0.9395301673473271,0.3411420494804638,0.6290589944163596,0.23908775960420026,0.16771178055607172,0.1322633569667917,0.708540002834323,0.2169553419157617,0.8250175337653605,0.36414359051737843,0.22391034820396705,0.8334758530003739,0.958350437461621,0.5513125462933812,0.7546660439692119,0.3120113815943293,0.9015456377973943,0.3306654222149912,0.47187319116149773,0.6094567052863948,0.39584766639286806,0.9616569309196161,0.33380662390761606,0.9634956395290548,0.7862392161113787,0.747952581867416,0.26966631741529734,0.9700913266563373,0.6278690453273841,0.8365964836554183,0.20382199753825625,0.4284133078631116,0.79360022750838,0.9717047951936377,0.3042196107503008,0.7231570609958891,0.0674885248153414,0.3916574935756545,0.35918478457093084,0.8079316317186294,0.9664226406371224,0.28306128763958194,0.8495392329247486,0.7917286251598881,0.7456987928844034,0.5822563974787369,0.31160170302145285,0.5592176986505759,0.9998674561644831,0.9648684894241322,0.5417917395498815,0.7318249031247284,0.860375697183299,0.5532946927779283,0.19501617978558783,0.15145152668661166,0.9494162623345854,0.07775106437649737,0.15341119378641355,0.9633301972258415,0.5124987073313316,0.6833783584609583,0.7991691376112287,0.7211813354045895,0.24538730089874772,0.8438684842682442,0.1927744923592749,0.27194279366909146,0.9767847795879159,0.3363188867189082,0.9366107967092516,0.8500360224133177,0.7186167486189583,0.6257961156416336,0.01908543759254333,0.2453494322865244,0.9882694528573142,0.2084739100788906,0.5622959838026673,0.9026813764644008,0.8304180832637542,0.3468111314960256,0.3584808968877551,0.8047389003537986,0.6655661270174682,0.8338645170560361,0.9478708729947534,0.7588321933700863,0.9462384581677115,0.40121932516410674,0.8445683207427253,0.3387315232753525,0.09283517449669021,0.9457867086374125,0.5049765000405197,0.8841624823954282,0.6315770309330013,0.7082970935957682,0.6130148161783193,0.175720583238681,0.6242984882649951,0.21856412725061936,0.7933826847759136,0.6285427362706681,0.4652481460604372,0.13887764486715826,0.6910091498010105,0.1254971901023212,0.19951225954769636,0.3159136342135147,0.281516182371099,0.05368592129148242,0.44411926408756774,0.7530999919106083,0.9687981289155831,0.004818849409282899,0.8309365338913477,0.5521300101687734,0.5992126736617827,0.6173465703991696,0.8417762025550826,0.4186840500999731,0.23074352427602896,0.15007005825699693,0.6153185414945213,0.5830002895768618,0.6834374852330491,0.6104288742062702,0.3002930379390849,0.757506043950039,0.44476276719963037,0.6729855328393026,0.5426858436268085,0.4354748716388501,0.35776537163037614,0.3898663737722945,0.8089481568407026,0.8990323338566002,0.5727768668092676,0.4246473754315421,0.14760460839290435,0.7530190793759242,0.6718080731037532,0.33136185171077015,0.5811526631055224,0.07691543945529955,0.22740150583116825,0.08718603935880354,0.9029565563458244,0.31968382080687063,0.9335797191345918,0.33592464815190715,0.10488074414297621,0.894513466262395,0.1030188130911125,0.8568388855498013,0.9453711058843175,0.5095441497276951,0.9743509659391967,0.2951627443269156,0.7194260938082808,0.6569344209364103,0.8207018481828252,0.07364842479536526,0.9230352933567683,0.9017166625088378,0.9164081658600092,0.7791753498890805,0.6409566327197365,0.378489220204135,0.5597929190124495,0.4289187618176975,0.06766031378388648,0.9026930759273442,0.05401805973829377,0.25678797319486213,0.8943064504681415,0.8108512357378337,0.4687261051423304,0.36917232296386837,0.6060818805529165,0.55950670979632,0.8403478885388145,0.337213302215309,0.11636299152933649,0.19643366964671705,0.7839445068162423,0.6222955016180676,0.10282866286612657,0.745210906412652,0.5499541159659138,0.9550726795411935,0.07912144621728201,0.4210035028549979,0.030387202025290216,0.7925226408968657,0.46951233405024384,0.08798928782383109,0.5955844422762078,0.8789884228771969,0.3323842682921323,0.5363677115720844,0.38044467024035766,0.7521280768732865,0.6832809036530614,0.3922790567664216,0.13103321760997666,0.10151522838852345,0.017846553064103654,0.6717795329999872,0.49599840142087803,0.20042603613453114,0.6155738390508712,0.9983998058187418,0.44634983485868074,0.7682651795877984,0.41949290998907673,0.3638036132590885,0.27123696517199103,0.9447665948658952,0.5355977297128542,0.8896111531904525,0.6360109737346289,0.8820764471806508,0.8561711141940285,0.8658959552582981,0.3791849336397144,0.30873969804352974,0.7594675399200141,0.5418165132037664,0.6710681441408346,0.8861259244244231,0.6302800745730048,0.7971258171524005,0.6162552451597154,0.6174223435737525,0.6773559715607738,0.5069344713768953,0.2674583047282244,0.6587870667458009,0.5872254129312127,0.7432338958708005,0.5965788774667105,0.5598364432914484,0.28613619074058727,0.49444555766452103,0.336712114425084,0.20804221499313735,0.2082657223453841,0.7047814620922292,0.4683882942387976,0.24600648062528085,0.8740532950459992,0.38488870291974275,0.8467112200296345,0.04325015434455093,0.5691660648530761,0.5849007174531269,0.4259298845765094,0.2962331766124602,0.9839019467877761,0.07962601833378713,0.5328277983764858,0.2772349430597456,0.30114093057567404,0.09567730889537729,0.18595064346480417,0.13139204770387236,0.23260122046743503,0.9531992185134974,0.6043103655811748,0.5570859062075131,0.2436984650346501,0.2944743472645597,0.8301445309364264,0.4771640905290264,0.5404992921359433,0.7676909421938518,0.08319900499571387,0.2954520239849936,0.16458014232466955,0.5772438646600455,0.6059802864648316,0.4974852781301635,0.10579181556990092,0.29319977545137177,0.2124128984904845,0.503647644122077,0.4252136576830916,0.8497998405687219,0.8571021696568879,0.5730365950496594,0.19903036821978182,0.3163981781185681,0.2636005063375235,0.46522405373201714,0.6110904250936462,0.010360998595983828,0.5355713950687309,0.7028466190976399,0.5848812862760713,0.47013189288743873,0.29825578670702413,0.4249771445001278,0.9549720964089523,0.4430792408837738,0.673934689717065,0.9554006829714448,0.13059635287455684,0.19656096275253931,0.07628270797947789,0.18023559338998618,0.23988863723603537,0.18177860758543596,0.5519721619289963,0.7341803610511191,0.8965835532788329,0.4130905908944693,0.746020839515027,0.9521941650400885,0.8758358618368494,0.33960957550069093,0.6482656543712026,0.20986298507473822,0.152986626626179,0.4200018607069058,0.1509242618660087,0.09872957698859253,0.13355727240010684,0.4791798936611136,0.4701705309512043,0.48816473665651827,0.967106702750266,0.7295041804946107,0.8385644877100753,0.3642471947179722,0.2757891328167157,0.29075860215327776,0.8100642527354036,0.6047012630031561,0.7956659502006727,0.7272156033728208,0.19458466675765185,0.5188864614204716,0.01215624200374088,0.6212244125132054,0.44213139767494725,0.42189614049030566,0.13877655217341012,0.9733787092687629,0.4760965295305255,0.2979078511038489,0.8107501821942473,0.19306152223629525,0.4626533806440847,0.7665224868454832,0.902221094507413,0.4003744805333862,0.7484823272535488,0.20255611260867834,0.46814239585723216,0.055451523535456015,0.4905871536080575,0.7258253214989658,0.358623690211773,0.8144351828509528,0.7422773497810788,0.05126489269079215,0.7904762176245315,0.15913381267749171,0.11419240052514334,0.08312200888448706,0.45570753121086605,0.8815521010332845,0.93129251125685,0.9790399080722925,0.6609925331003534,0.6105501508332076,0.47275264202790424,0.6518888877817155,0.5768773470903181,0.25119578450045266,0.24816403777120422,0.6058455448854065,0.40013753051392054,0.05849654840455698,0.10173818173581939,0.7067267055926036,0.6435292520532219,0.1416045636039085,0.24910022861865655,0.05241005361566242,0.97020220451225,0.49480807041887753,0.525984488720451,0.7948791232034813,0.5642440954867376,0.08313034216537774,0.12095011632624453,0.4932273617825145,0.5299585428331866,0.7670830245790434,0.04146689978784934,0.044326161954215904,0.8984289858119032,0.01807021989630697,0.2794402155959905,0.6101956975853011,0.20693568429406684,0.4975111275010984,0.1258954871559681,0.9498316035078274,0.13023623595917,0.9214728011529183,0.6512828243867874,0.6279880000545981,0.3843572298535056,0.662453970425259,0.25696462720613544,0.6159332966491822,0.1710752412301657,0.8325221092089883,0.8773275079854661,0.3724285059629191,0.45983007323559355,0.8154255883176151,0.07549242584159566,0.9512903830347028,0.7933766770439672,0.42592774148972246,0.05546215701597723,0.4862198682040175,0.23206072195250282,0.768611154936415,0.797519237603989,0.5330031916830162,0.6688075977455408,0.4117097083792316,0.3956921258248891,0.22450481380639542,0.8050915774375305,0.906218611048635,0.1409513869113852,0.10356699086272791,0.7600941568073358,0.6843647026634414,0.6868561800345105,0.5710056300647939,0.09416961196473261,0.24652197150155342,0.9846988070835769,0.09317797702920494,0.3857761278045224,0.3456164197293734,0.5473002397710449,0.5018135626638838,0.19633483632244908,0.18569804611296847,0.5563784094435344,0.998219483041302,0.25794069096802796,0.40310711342911487,0.1825115483554327,0.9104618698257481,0.19170813561169098,0.19134343628509476,0.8016844750494769,0.6730086484786935,0.8635173077734757,0.17156290374289518,0.15200512984543457,0.2618353538542284,0.7126024903456232,0.0653116917481682,0.08281273926411892,0.3168564455941425,0.6725092326871256,0.9636508428354527,0.7497647898953863,0.1787598956532741,0.9241211859724976,0.6222342450870197,0.8507504671986899,0.27662333895397007,0.11652671111230362,0.05513484190355711,0.5596464567447168,0.7555022082843508,0.2938125848818729,0.777737455892227,0.1734307837359923,0.8234070508742333,0.15074839338635493,0.0037897605312011695,0.012024351084711116,0.6353573946816744,0.4036327197692542,0.7585117611770571,0.44263132498498825,0.3235428120425745,0.6444484314019685,0.6805091626938442,0.2980500815855702,0.1199908381127639,0.15996001183343522,0.11431491446615438,0.9572915070847654,0.8957623009030176,0.8100391973658554,0.5720854487983185,0.3867401013993019,0.4527850390313757,0.4193536486935008,0.5458993033766295,0.35475440223630095,0.03582036844931724,0.636209494463559,0.47782136309833034,0.2802127301331152,0.5652705946790002,0.49623659833688416,0.41913266926622383,0.2461373895972181,0.2775330054165841,0.7862542353637954,0.2737250110858811,0.0745987640510315,0.2936521412058799,0.9023689066456286,0.9142148823534484,0.8746385747856178,0.3552680381042237,0.8887771524410093,0.9011504159389567,0.44191113550937944,0.3070455760009623,0.681478736200466,0.4207795604639355,0.41264988362899113,0.7001486822667369,0.41356131134885654,0.6220613180867147,0.2441354531577491,0.0597928913147141,0.9830406808929482,0.11676183415815466,0.5455014536007865,0.57142493307783,0.0906466794923253,0.777558290491132,0.3070662117513663,0.06050492910659799,0.7360798012308571,0.9272939908540403,0.8346208392940397,0.7878227562287545,0.19865160826416806,0.7177934459203685,0.7607896795568068,0.3760477724016682,0.5496673677254815,0.5809483230053081,0.7276435043832661,0.1242495781473254,0.018054582836228406,0.503358038932211,0.9051987436161513,0.7151940734630124,0.5951493175835416,0.52916016135625,0.12449854898631463,0.8654241577233801,0.3104950152399262,0.47122504047678127,0.28840654932217524,0.504337737744966,0.7361875428410454,0.15215162655798808,0.48617331423164445,0.7354544273077064,0.5088170205365414,0.7607062134912603,0.36885438148346394,0.4328143935378783,0.7897606656496547,0.14578522410072736,0.8328945332624307,0.11581824121883733,0.38833604803424726,0.6952309193055732,0.04371292362668244,0.5109488935112114,0.5687127538216761,0.1896151890933524,0.9113187196041321,0.006004862514664033,0.1457038876091159,0.9414357743074429,0.3022905018645614,0.3239078705980709,0.9596272834738113,0.3058938940337612,0.9901083848284657,0.1638299706640125,0.5410337658055429,0.9455743614472945,0.778565210356601,0.7083908066406273,0.8978035910389104,0.28039271160917134,0.5576708816922786,0.35805756994223503,0.8063229954831412,0.08333714140428805,0.8796197348836188,0.838872472964689,0.9423502872951697,0.19444188065684243,0.05476598200671168,0.042094222194836384,0.7527161516386425,0.43368357404083113,0.7513732932862154,0.4594956252388618,0.5644445647257601,0.1065054523658806,0.6605107964464834,0.2534350657123716,0.2839201041897572,0.1204152242084664,0.45983808496018286,0.9366689597862816,0.5092839860519576,0.4427284365549855,0.8681130328851665,0.34875488840974533,0.6480829189864934,0.16273887578713264,0.00685231696739752,0.828137734966401,0.13449228173886896,0.9645456102737533,0.3178080113069863,0.6083270015986655,0.9450734052167578,0.031196027034134932,0.6245280914782239,0.2784469130456859,0.9114492559107434,0.4024819303865059,0.07210111495464644,0.34653557160764104,0.5697674672890445,0.11257487183734716,0.03674923268568997,0.9843794625805897,0.4197022658071301,0.6166882581261905,0.07547362477898556,0.13924576081566098,0.022714108104637587,0.11748035022800307,0.8606601433786267,0.9267821288834182,0.04729747282710406,0.8841488133640396,0.0732430354240079,0.8624572194852771,0.20031348929685944,0.002701962005044134,0.29392740011308804,0.06794725978898852,0.7410119859976949,0.5460978144970752,0.6024912680950565,0.86503416593004,0.2328236985373089,0.5757348335231216,0.23218646636007678,0.10803315895690724,0.3047637179411775,0.6204065934531695,0.745093890733836,0.0979601034654427,0.14363392984362422,0.18081900266292816,0.529475928613033,0.033982652482355435,0.6463651971254427,0.33907313301125486,0.6435199084451968,0.05424561195439992,0.7650380894618749,0.4889154603629513,0.4881047412236601,0.5940955521580742,0.5316080873946119,0.3182803312646991,0.18141834860680084,0.9626439964714253,0.1843597891495492,0.2226020917520508,0.5550413915835577,0.15058485367619467,0.9029041585747182,0.4395219009691751,0.6358924793959888,0.1691960970681874,0.014148225247721857,0.4600106367917738,0.7354678554190737,0.5426137055798905,0.1757573919788169,0.28135641993018234,0.4164540845872624,0.9497510025079645,0.45898553368307726,0.5320685625136423,0.3640018114587167,0.05140205484158522,0.22245375857606242,0.7899444718497888,0.2627325155622935,0.3257741012759452,0.0587222623612198,0.012314231749621651,0.9235602548700985,0.6156086901297111,0.953909912346457,0.1996990978510511,0.39680138081623473,0.9891430269551471,0.2161330527507348,0.8181550608459334,0.2993974680505278,0.17035140645731928,0.35527626186122174,0.6899194287495509,0.5389665182813483,0.6207712247926727,0.4302608471879126,0.9025930500750277,0.9946303642621721,0.6499849209943453,0.6907164932464871,0.7246282692173731,0.37416611666896915,0.4905414543484721,0.3648082143005906]}

},{}],115:[function(require,module,exports){
module.exports={"sigma":[0.37370285362489764,2.9053949546183344,1.7338508128361885,0.42060728055742347,3.6582992375909154,4.35092426595017,1.84200296613941,3.0184847889911737,1.156489731475412,3.2320941709849405,1.508715683337143,2.1994227092255247,2.0420624841173343,2.676260456084126,4.499847292266579,1.4731328807471689,4.160924082056612,0.3365720081552426,1.115923764315505,1.1894611071538674,1.620530808128231,1.053868303010611,4.799591553246614,0.6776710587751311,1.7702344549502003,3.481245568413285,0.22866614584266864,0.4287284241315281,0.7705559671038475,0.18249563316445117,2.564673910661881,1.342640951270555,1.7804231944669358,2.545021379034329,3.0832922790313244,4.72807326829191,0.9020480682446896,2.2209506176607032,0.4448074638009325,0.7963843851071262,1.1786829111982877,1.7956180699050017,4.8301291710454555,2.5264424093439564,1.806907973749401,2.8257505249909087,4.555324400339343,1.7638006741590462,4.046347828031768,3.4097551709809295,2.740551995826052,3.76850948448618,3.253797491150955,2.9916676468399652,2.270846507761294,0.6104767225489194,1.860884602484466,2.4918826255387003,0.26877115792156236,3.7954341025693097,4.099585578818148,2.2171334289567444,1.2656914471355618,3.2619303855971626,2.999290709547049,0.22588361294004655,4.60878831612429,3.0258993801836676,2.736282470684148,2.6210152816085532,4.149674133901491,4.040925122451035,2.8060898031904227,3.8683874818777775,1.7869135011548498,2.4831720972677918,3.4120477433831575,1.691477854033182,0.046028703674619864,1.416893748755761,1.6435885713684184,4.863421533997955,2.8202471938300597,2.9704709816939587,0.6616613830603502,2.864680065682985,2.478078081305446,2.464797917367254,4.656314884486086,3.0983679259284913,4.2358556739287,0.4828001258882453,0.16904827026881564,0.7912433631075055,1.2772270212387304,2.4550036120381558,2.9863276202087796,1.2972346100832144,3.061570897271124,4.9894455756484675,2.552626445869184,2.710177597705794,3.8046500806320536,3.8315502555316217,4.872483052770201,2.9118704780376503,2.5528744825208927,3.615062796967999,2.251059028136577,0.722005177115228,0.3155331897394553,0.1319055832770133,0.8251155231426033,4.287713185446468,3.183825108862889,0.09140850558942093,4.92615209574628,3.9423053615750514,1.995262900561835,3.234455653279623,2.999579717706171,3.1661047415588484,3.784732647492335,4.661937793450182,3.064060037278613,3.3873710565101502,2.1217542341071525,1.6834416008821929,1.6569895666934453,3.617840551864997,1.9765677428645134,3.750547465697455,0.21965453941019897,2.2600116931913905,4.421317995403278,2.1960250114294464,2.7963701806239447,2.6734748119624374,4.608361133631784,2.857107617455512,4.084963302632632,0.9144783194548034,0.039326368759076136,3.722139849638486,4.516741201871767,0.19145831605422936,3.136824908641842,4.37027997481305,4.479758171662222,1.2957265193265244,4.10828942269705,4.727091950412163,1.6654002916102384,4.710128581490966,4.795165293053091,2.621827994339776,2.3474024134534943,2.304645151402047,1.1548084895849942,4.740776547386339,1.6138290227775187,3.8839849193417653,0.9756696037839108,4.530414538206608,2.327354473900228,2.269395064493913,3.419258105181806,3.912341597879853,4.431371782589929,1.935233777433707,2.8473232939893247,1.7470862244768848,3.5389236309104533,0.41652062215597807,2.687855195877895,0.6722633002941736,0.40991680768308614,1.6237162444507902,2.006696959623746,3.738729749770714,0.2809952702697327,1.3467522466809823,0.459088853276467,0.43696616266060584,2.5144828801491323,3.4125163383676425,4.456265374452125,3.7698573712492225,2.256708613916414,1.105354482967501,4.68277971625226,0.21650274248307788,2.7426242327717345,1.517156164533815,0.5605800970445562,1.564995816476955,0.444955052029512,0.5010766670036348,1.5086853068591988,0.8593946234861194,2.489466541983405,0.5656283403122142,4.329301042353281,3.142214574566986,4.521347571306142,2.684902825398444,1.0824433636554376,0.8913438111912542,4.072144368896979,0.9910783460649886,2.9395936925825517,0.3654158240923122,4.237112339674826,2.7787555063027303,4.349717984684563,1.5726641129609786,1.3793653232634873,3.9040267261625927,0.7029906681563003,2.2139121374918993,2.045419669589019,4.037514629146396,4.435666993718886,0.9468964764217458,0.5309232165318489,0.168175486498241,4.905500840667699,4.971726571144445,2.6274569572813378,0.4011929454575325,3.046282029061368,1.2420195350434993,0.41590982734573845,1.7076433622128995,2.007759699415285,0.6314197398137966,0.9234222090683775,2.4009152522737187,3.8925866416495003,1.369862463900835,3.8797794913138506,3.9195943831932025,1.1016271756958795,4.860820994394564,1.614770267634622,4.996324220890823,0.526332378375598,0.5254617001832806,0.27430696852152603,2.096419820421337,4.170846544620602,2.6641325057936815,0.33863033482966265,2.091206818063319,0.723359867366602,3.7400903811310537,0.0719015565418113,0.19710325502373394,1.9504240801721084,1.9793546481114621,1.5990466971771244,3.8727795952307376,3.8498018319860003,3.1644747299205767,4.525801577926555,0.371916790325022,2.41966584007556,4.148971887901899,2.026777864542616,3.2286637710200905,4.991991060939092,3.012935496676569,0.5447941380706456,1.9681542724709156,1.1161616989349354,3.5884164572218182,2.998711503312327,0.3648525860293228,1.4453327879326827,2.8541445083786776,1.8456835039981967,3.555582130071022,1.0435048262022606,4.17216930815246,0.49298113993411996,4.116287437010629,3.4579189607296126,0.06998667227904098,3.2921072985746545,2.2146524855395064,4.357830876347391,4.613542487775225,4.066502913446884,1.856563147848449,4.997749536643571,1.659077847611674,2.101258323562881,1.5708248942684633,1.204116757830741,2.6419563395276144,0.8243417209258508,2.283004082092673,4.955740705069125,4.796246651815387,0.8066680668929427,0.6614943493801206,0.4289792694829131,4.924416299254607,2.2976785365687755,2.6230540506838884,4.448115756114621,1.5327334169923124,3.6364867796094167,1.7545347555324087,0.6665024159174981,1.5380154469277385,3.8920827181705464,1.9058847443646987,1.2642474648259239,4.422343989156033,0.3793770644867178,1.9195114230119747,1.2808034118800204,4.43830335859034,0.059759925011526605,0.18046158276577184,2.5740015774575564,0.2320978000606566,0.3795818447562149,0.7468225135537687,0.49387284076835236,4.686327621878171,3.9089250127643513,2.4116065725550504,1.7789728203632538,2.308130502010038,4.929357651387722,2.9754336415276716,3.6589953286444987,2.890039115819399,0.9518251433468683,2.13569825265267,3.1027569886711936,0.4429872641802479,1.52136944194728,3.683460387356864,3.9379889281887124,4.900823963925359,3.3176423147679666,4.5780744167519805,2.0432564908533193,2.057115042320169,4.245282154707191,1.7727059673089596,2.9691682547260037,2.159959507950818,3.932360866233373,3.0273852182892034,0.7408391189117791,3.029697617927496,0.31066177231437675,1.4545276562106602,3.864998840334727,4.5452635202019875,1.7999851160897729,4.675479229367577,4.233610835961211,4.426512174091419,1.781619211927139,3.1787247502533167,3.9501604626960676,3.056222984948901,1.1539180994483988,1.079739634675868,4.100930048998235,4.29211397100632,0.7132761988825143,0.9749310685955825,3.1523865329700707,1.3942816825918747,3.6428915538223516,0.9209105097998826,0.8774025377557615,1.8412870902680856,0.6603759195428838,3.6774173361454476,0.11201039109626554,1.4173938966955657,2.53779699900932,2.6830325938444743,4.173138787046909,0.8648014764122836,4.288556947334418,1.270851311159732,0.10263325428841563,4.949329829470384,1.2174340544623952,2.640240623969907,3.2250412876915857,3.2756570744384437,3.6112161944483145,1.9160052325534438,0.7481773376857226,0.5647529698945641,0.9661048489564961,1.2913538069789,4.723144556960008,4.022463649114577,3.0145341822484486,1.2385442219529164,4.962247721565205,3.70863115495075,2.996481393195607,1.8247582479938962,2.1068424623842774,4.850620073118152,1.7544627602327068,2.1121610079502307,3.4041799372488315,2.743641253196054,4.776797919497854,2.126397822071937,4.295431596673676,4.088207338696675,0.17815637665797635,2.3914649518846787,1.8609325442565239,1.3990590815027137,2.830903602966367,1.40567885479165,1.5377104000719999,1.5405750957604525,3.5188768594429423,3.3523143426223045,3.526147830866705,4.277935099338533,0.783583213973108,2.3480132374320073,3.444128555023167,1.1565644832662036,2.102235292441809,0.6978138105737586,2.142999354618614,4.21170101662486,3.022027150933485,2.2997695668484273,0.6184350270618755,3.739060837390069,1.4351076515586314,3.7222687500197216,2.523049932635799,2.6269991406756796,4.69195622713519,3.0889825054580977,3.1102103213861723,4.744370175563455,3.6177618548123904,0.9494145840584178,2.50251355795019,3.6566539979194115,3.2393031154504524,3.2227083007028345,4.315915141012031,1.572910855355475,3.417962280145038,1.3445945303426377,3.217093560269979,4.360880194959925,0.9279781633336415,1.7316473446650094,4.7402873284586855,4.0684883332716995,2.8382546703524616,1.5866934459634197,0.6663400532991115,4.257197365597618,2.87192307590448,1.9603584826180065,1.6566329801588275,4.38695568050126,3.1349339505670293,3.7703612366076635,1.632393311812842,1.0983237486356467,2.9052359543800765,0.7724120488687936,2.5101916333343564,4.960599857481506,3.6197456263442795,2.8909388914174983,1.1464050207805643,2.9539947657038903,1.7750694651572008,3.30053177633281,4.162355299549637,3.0237668160085907,2.016343542912362,1.192369909651858,0.4615301936251226,3.709923754915445,3.8911939001090836,2.5979841383083837,4.57144713928329,2.515094712236492,3.7473107415294358,4.590887075711725,3.0939461127705115,3.51031006471905,0.08570358252290577,4.932468889460457,4.92211790119411,0.35061921048492595,3.666510278246692,1.1992603958863723,2.5930515277333708,3.75926701260148,3.102905560228563,0.6527852774533172,4.381588510889607,3.2199934896280826,3.5973293385393665,3.259413500250865,1.454172537851398,3.3724839377740534,3.127155623257237,3.8979150912593328,3.5316179972979613,2.600155748244082,0.3380969920378363,1.9383937282255803,1.9290210497648408,1.8047974534631661,4.254244743115826,4.366181994577062,4.568420001850187,1.913707017822297,0.7024214278440477,3.7375990902085365,0.6039970503459802,2.727805045534455,1.2474820480279114,2.3811376659190397,1.0479522072990632,3.3478372320293106,3.0147847800725183,2.699217971679244,0.8775274451808701,3.1815644751539276,2.2117530497864033,2.776000304158317,3.2532609947827194,3.627312593046075,4.831489619967293,3.9110716525218683,4.5966836633723105,2.0667992914079214,4.241203435043506,3.359195438069894,0.11962114690760473,4.425921868286979,2.498588449456187,0.20063651590758735,4.1693081584754506,2.290021574665716,3.3357613063551583,4.611280905331368,0.45813889199252555,3.749068899411067,4.922770615048796,4.1332171947434,4.513216405592452,0.8991944893658166,4.613793174093556,3.8689783541111957,0.677933817087093,1.222886183994344,3.4672443834890165,4.2157682715773,3.8707333829869195,2.1175240325162035,2.609933222765396,3.2923675429816592,1.3300318525415322,1.016776162931784,3.5249259429272604,0.8175538863827825,0.4395132846110028,0.7976440957150555,1.7339193691537091,4.998977612719298,0.9644144753202111,0.8309280581894529,4.723359233133879,0.8733720164496583,2.236300452592345,3.024659607657453,4.817914576387428,1.9526480399376311,0.7891052744997562,2.427122482420386,1.1358700791662601,0.3802057343729248,1.4749149172694964,0.4287592507077309,2.436186392516687,4.867375433906094,3.693254097763159,4.4345553296976705,1.949936845523701,0.013962726437921624,2.9649738931363223,0.23985245323470794,4.730496515157317,4.8867285914684055,3.9874365690189695,4.938941143472132,4.569715275829374,3.9094750102045195,2.4744418925956424,4.932961857303728,1.0745267949957893,0.13778576421327182,3.1306078494913923,0.3610476386186112,4.475304757350138,4.6721768742041405,3.366080136436298,1.519863627262631,2.9611798445298154,1.9816008902643334,2.873022871545352,4.341478765948734,0.38357024426608044,0.7423027724087194,3.5599777461563287,0.5536518007416669,1.862093751593833,0.6452931265823292,3.9069350726505547,4.082322395289558,3.0758872991619954,0.36467743719991397,4.251863809678573,3.2761938543659284,0.8106764266669386,3.186718357543552,2.453583678304253,3.550381218004355,2.640842528870487,1.018385949933781,0.37442056062929163,1.6188226956607021,2.0689924288037984,1.0695466087214323,1.0748705683018334,3.22317981118571,1.655208776592877,2.728506739503561,0.6428546090105436,2.6165443859279716,2.5367819408390755,1.1441007374931078,3.9186606043281724,0.7858673173308928,1.407189999061832,4.64078704659207,0.4913060208127218,2.4714984938772133,3.3507275228813427,0.38650366527284374,4.517088939356356,2.298573823082938,1.5388239859133213,0.24964075033329536,2.179825500384416,2.266824793796646,3.8327423047908926,4.603295940368467,2.9092390422041534,3.8983640298943225,4.5492749132949815,2.207711417226217,4.672480773395643,2.628012676309468,0.9968529386631253,3.320452933771467,0.780695301183888,4.737938428245617,2.7450423974697493,3.7376598280650786,2.9484263286756374,0.8315277024023526,0.24438807163041698,2.3862109451037017,1.8516540952450666,0.9099443814103758,3.037185812756481,2.9987529120330603,2.5137239309013837,4.801967205800816,0.4616695191515052,0.9656113825308132,4.007938019223056,0.32909052805789374,1.1384007190531154,3.3950575955049542,1.1190171992682774,1.258233629883615,4.593145472701444,3.33186709906378,1.9912933549197576,1.3088883662031114,4.6437355992606735,0.2369128685872779,1.0837746887716337,4.378749906803929,0.7770784494241123,0.542963729586956,1.2816686393076482,4.548688360012405,2.1709610412097247,2.9893323554232945,0.7309414058887798,4.659699032518169,0.0804628978873434,4.478903377939889,1.7479330916490732,1.4671994132802468,4.635186083098142,3.915096304173147,2.2187844631577303,0.2988343334801957,1.0527700894681757,2.817144396504961,4.696427523767349,1.961114988002417,2.3604445206320914,0.33774147488654704,0.08275750712428476,1.3059968676072076,1.5600012788307716,3.9506327347510384,0.38342090150461083,1.11364095388924,4.004017003212118,2.222187404009758,0.5041826361996382,2.405821829800776,4.452266332837768,0.9875357870117063,1.134297322223785,4.993299482426686,0.10867367925844862,0.3542069336982845,3.3442790034638192,1.00171844105312,1.1044873646643816,2.9441266730283475,0.2412201859486529,3.2084717886123384,1.1340784536567527,3.46633031834896,3.5365213011484196,1.5631016321289415,3.8079481747995594,1.0925171503272424,3.848664650012008,1.7208243311975746,1.683854923146697,1.2338604591458058,3.496113005727528,1.1219888318672977,3.031663654070682,3.610888526343725,0.03606054479583509,4.685392979062746,1.8855565597079982,4.905207167920161,4.321610131477849,0.760108724020192,2.2411380060986055,0.07058692766347074,2.0580281411860546,1.7413210400178125,0.7413553474870871,1.137473200294944,0.15035822419942502,4.584735021936036,4.218075179909231,3.8120937958160694,4.112534887414158,2.0644869346048313,1.4368747863192233,4.5925531245275,4.24460164480992,1.3779272970945322,0.25682663577210163,0.8643330361808499,3.89590976999438,3.580929316285558,3.406432288096063,2.0182801027778794,4.255119839058883,3.8788476953761863,0.5680631653954638,1.422772502411973,4.654272423552367,1.1252162136702148,4.37640898079564,0.02928968915866359,2.7649994583379964,2.478146846214675,1.5310894165433298,0.48143521766697117,2.3363337733986187,0.4109159197264778,1.240177248351535,1.6296407096184085,3.243504749139942,1.7104045060520645,4.666778894714787,4.676646897807887,0.05821789282226986,4.352155232384048,0.3331060636655303,3.8045303271236444,3.4312476532078517,1.3303622915447244,2.6978838999719446,2.943309638741801,1.5459593368435531,2.6796645220381787,2.7743700077151576,4.493226596477352,4.853207788512911,1.636871414895934,0.08257827658257999,4.013372677498266,4.191430570821279,2.585790346634659,2.0844554817934857,3.2891328014144126,2.397823142225839,1.5069929907811719,4.18688172565454,4.661505210246055,3.0365198364598633,1.5378100816406837,2.087411707905188,1.0023432997468262,1.3412191146626473,0.4407143400630231,0.9684180178331458,3.8581070188889477,0.6197609214555189,3.2260292308779204,3.3674228398673067,1.9724862266827292,0.8833824196882911,4.498620584102167,0.22771696222329219,3.8016178164265835,0.7551526343580306,3.850371016703477,0.6192299775736188,2.61034853255252,4.610031553902391,3.6139602638198443,4.336519006039595,2.5325355058027474,3.018295784852578,0.38502697086101545,1.9942467253905694,4.969701225863561,2.0849940555281354,0.6352728158729082,3.35633592759518,4.74152189610188,1.7494617798939927,0.094105460032613,3.699217248061805,2.6604914181991024,4.428828182544197,2.8047511408218484,1.4938194591894527,0.36840755363834576,0.820026069944465,1.9590228130202059,4.7110282106267345,4.053846404465819,0.15214024929960268,2.8633270739882546,3.69171682649727,1.9947511814901475,3.097833029080702,4.934577694725889,0.9245006357304142,4.689685916844689,4.631878394513089,2.6383661470167343,4.385696324768766,1.8737245084472431,3.1539467104253713,1.8190630389060858,3.3596959630335888,1.5093562631381585,3.2902606879220473,0.7411933983568797,0.8807556189345356,1.0799326475004078,3.5738328691631427,0.009370542183754216,4.658538011917428,2.571215356232981,0.4949593847846867,4.389888089628111,1.3653955851188382,0.32652530589761253,0.7851353220388257,0.5742214075612717,4.412618311900048,4.498040136903886,0.9377502648634695,2.4379511758568926,1.167110127989609,3.400791305578408,3.8070110407889945,2.699216543486581,1.5159037634771477,0.05635195105520241,1.9587423163579842,2.3037863748947593,1.7283995375388739,0.2762498385298984,1.7152308756998913,3.184877915994634,0.9774597712800503,1.8787058336680251,0.6876780030646057,4.22944540344183,4.0649277712745,2.7579997288223534,1.6075851499523708,2.2136031974876227,1.1142219047590463,2.065217516014155,1.8669613482382297,2.4562372868071303,0.5872952216649652,2.0419406429677736,0.2342350952338934,2.4622499542764453,2.363789525865002,4.941662566126038,2.1787919179806767,4.930293601095207,2.9294827281488467,2.5449357320380974,4.680904687650589,4.241917894410055,3.979497778652823,0.22133195567858532,2.279525408762205,2.534701564409305,0.7073564208029959,2.875022354546978,3.8846069197161057,0.15263079357506704,0.3348659809557508,0.6672430346481684,3.157553397962479,3.812276039288874,3.6469678772122514,2.568615314622819,3.0634867326636863,2.797486645056212,2.972363972423806,4.130203277185519,2.3666679300380524,4.610926073921741,3.806955706978922,3.1875081305923403,1.35019288315952,0.489566753465851,2.190699746811533,2.4859562425633017,4.478560788422005,4.000055077145578,2.8469258919674023,1.6582643087923776,1.3347841230305002,0.354532728258502,3.303918443926009,3.3622544635693394,0.04893816262875772,3.8351126777614217,2.2505287584278655,4.060271112420972,1.69790269608048,1.3808190801444875],"expected":[1.3315721980068054e-96,2.0625916530927035e-9,0.0005774142372719572,8.582746605880855e-231,0.06392613309422086,0.0017453027128057294,0.015663189457307842,0.000541614743258147,3.2414702952234537e-57,1.5616938088963474e-5,3.324394496871692e-8,1.5020369171871327e-10,0.0013741561825052796,0.010601257881400341,0.08421248603180852,5.440688256601092e-25,0.033315452739344185,0.0,9.093129595177774e-8,1.3191240592990093e-6,1.1958048493427752e-11,3.512840201262924e-19,0.026086489389837673,0.03066874228197285,1.416964381168545e-12,1.9889735379488058e-8,0.0,5.685786157359697e-118,4.621277711816771e-52,0.0,0.2328061855365145,3.2242896501329604e-12,0.00019167901853818918,4.392727814819072e-11,0.06436354102203333,0.03505428707710947,4.268233652468516e-13,4.297547904051052e-7,1.0590255352215511e-94,5.058722404775015e-22,2.2137877370797003e-22,7.166184945767663e-9,0.030341148423002836,3.9917577677096585e-5,8.125433116750403e-13,0.001119768631875146,0.005366282431982037,2.5767987864374964e-6,0.010785098018469262,0.014692076311080784,0.0007601369701730708,0.3413777738484137,0.00051772668600691,9.727222128372786e-7,1.3598369364928252e-5,2.6372680458215573e-18,2.2323449172039755e-13,3.880368035731598e-9,0.0,0.07587122209898658,0.024476391958440657,1.9229625205715975e-7,1.0177693999218232e-10,3.22536823377015e-5,0.0014101144444483306,0.0,0.006339840732590334,0.015596361629326823,2.00946532519139e-5,1.6564256884073837e-11,4.43708328345357e-6,0.019748954897365088,1.203473131957073e-6,4.738585581530511e-5,6.116891637226955e-5,2.0260086224789502e-11,2.3945170630283274e-5,1.0442949503476387e-23,0.0,0.0033776957585577244,1.7335548418389597e-20,0.10649621782557323,0.00047892518533067724,2.712161422022123e-7,2.5588528741897297e-69,0.03240592529531576,0.02917759743568859,0.005995027160102381,0.004193143330722226,0.05927888059804624,0.17189940473327742,9.967463393508888e-271,0.0,1.3784392334394095e-29,0.00015751213442194185,5.305071808929313e-13,0.0056430720864958,0.009536778099677333,1.623086704883956e-8,0.0081272525537757,0.1950597939095233,8.63765174211324e-5,0.0002251472966619081,0.04093221759492902,0.009337434210014855,1.762604787829484e-5,1.6900035009379057e-5,0.000328680731901555,9.086566099516243e-6,6.021200753712412e-32,1.8376227682769336e-11,0.0,4.485171981729234e-5,0.015644872618035228,0.013912071768373897,0.0,0.09326194385667433,0.007070342855475851,1.0342100360305805e-13,0.009111845507520885,2.350766653260265e-8,6.741672152616411e-5,0.1779626176250885,0.0009864229463485137,0.00018691525921928252,0.0063252443498347955,6.890897488892407e-16,1.5277223624999273e-16,9.308720992014396e-13,0.13868466816974362,1.03476754718431e-13,3.8995515358806403e-7,1.2886376103243406e-10,2.5650743081694484e-15,0.12244117145020206,0.2377848043081101,0.00012641622428167805,0.00017464366736099753,0.00119806487272651,0.009530693142049957,0.00044225378476158686,1.810656729966266e-16,0.0,0.045287746894569866,0.036472684885188254,0.0,1.437774610291017e-9,4.8276943758161135e-5,0.302623255399478,1.099362574317372e-19,0.24152373905758873,0.0008281910857776246,0.00027105707624755444,0.018733125389651318,0.0008185279056732752,0.0012449759661314285,2.480952582802574e-7,4.582119035570669e-5,4.5945087705848765e-15,0.00895968303325831,0.002196458605271149,0.00019649311070692543,3.381520411176016e-28,0.24688474018774811,1.2099230374221388e-9,2.077527883147414e-5,8.462254798051275e-5,0.18235290474682725,0.003210117366567096,6.5889848667458476e-21,3.945569278928729e-6,8.031956138949473e-9,0.028953087838983795,1.7594435959291884e-111,8.058178525633189e-5,0.0029674509968424523,8.372415784643001e-19,8.861155422956707e-11,9.256287784027742e-5,0.0015194046558509792,2.033493056106433e-243,2.174075380734721e-14,1.848092018419761e-263,2.1256882656774177e-251,1.8388745106036838e-5,0.05235357528298353,0.008481889232767301,0.22925292422005938,3.426680143075776e-5,8.943393400602364e-43,0.0015393649810891605,0.0,1.5116394119408727e-5,0.00011601965899828274,1.8236071600467118e-117,3.506483228044235e-24,2.9840462434945114e-61,1.717696306819878e-40,1.2601081893639247e-6,3.384709417629416e-31,1.399298757469137e-11,5.590206620868624e-7,0.003399461957854052,8.489983112571046e-7,0.03294560213405001,0.0011602956432061968,2.3307818379316892e-7,2.1910349141127865e-28,0.025761816354432577,8.235816310660433e-60,1.294246055254256e-7,6.18782426749038e-171,0.00908094936988169,1.0034703105157615e-7,0.049688593079281154,0.1147253338832509,0.1502630934616956,0.007921225192191069,9.565115390918527e-59,2.778465934223504e-5,9.80890638909772e-15,0.037032689917891194,0.00022815895341577754,4.425037718150506e-48,7.944313188692891e-111,1.918815833761938e-204,0.01116726234220425,0.16079789605303002,8.748967449488906e-7,2.214618809610527e-26,0.0010038135440138946,1.7510952435085447e-42,1.5533836448671713e-102,2.542703923564314e-14,2.020647775360378e-9,2.0338059825170473e-12,7.335387158557994e-35,0.00020279790757342562,0.003502664124723803,0.19684437804208157,0.0003733476244376498,0.07572987489824268,1.532748913437249e-43,0.025332475294821546,1.6381352934174864e-9,0.11671944064572368,1.0828514461812198e-90,5.952438480771631e-90,0.0,3.5475334548857494e-7,0.010013463029519006,0.04946357067092335,1.3111915175161612e-223,5.5184821774482656e-5,2.1247261695343097e-42,0.27460082339053754,0.0,4.8389494190756327e-104,0.0029308716852834292,2.1929730100975665e-9,6.5097129630570696e-15,0.00013623948083568878,0.0031120913631452226,0.0013260079322211804,0.0019276884575035336,7.425093335743414e-13,9.432722775871489e-7,0.023168600306574073,3.3454650398695476e-18,7.956281931536285e-5,0.007695778322232216,0.06939717672602762,2.421726541861663e-125,0.00953310516062154,0.0032194615245449967,0.0014494887129881725,0.0032611027718687647,8.625886047902758e-174,9.069369406386259e-13,5.49044300811885e-7,0.0010777328223916607,2.373262612752931e-5,1.5067816531211986e-19,0.38984533905664137,1.9534389569734922e-128,0.0004097471288109608,1.0045849970573623e-5,0.0,6.805023865009946e-6,0.00026387033974088536,0.00044243815396955376,0.0040313145220737924,0.00970334108161047,3.3889516897309234e-17,0.02191046580680469,1.4751348677404338e-11,1.0378618090278196e-5,3.6390868597903496e-17,5.4390972084752626e-8,2.4957324835769803e-10,8.369291186124327e-27,0.05099780424117685,0.031634465743953975,0.006001560152087223,1.949424631889116e-6,5.624335198670973e-20,2.0196799658578223e-140,0.047002676812710135,0.011726354325047875,1.623020124576885e-6,0.00023494880327344403,2.4204182834560504e-5,0.004301483474242536,7.203042538699767e-11,1.5946949355484214e-24,1.2128127285966646e-11,0.0034592329263560292,1.1568251956180437e-9,0.10129828984695338,0.020922344810631155,2.174017814484875e-220,3.8925508811434056e-7,3.0449838628994842e-22,0.11479794364307297,0.0,0.0,7.866735406635295e-6,0.0,1.4710778123873384e-250,4.19857017361318e-110,4.658267728353407e-165,0.009626977368710533,0.0001549883391158788,3.706478215420862e-10,0.023911630476427203,5.630218768169746e-6,0.0594758488362873,0.07306782810682383,0.0039700162446097515,3.9268986358316994e-8,1.1831780164735437e-69,3.6535504518956454e-6,1.0748711410786459e-5,1.8975828082279466e-121,2.1500800262827893e-6,0.12100697803091146,0.05322611184539444,0.14476013848422495,0.015422578034498808,0.0143758499378178,0.00016697632881793143,3.617760613420718e-15,0.029994337542087614,5.823872501644853e-8,0.009158091589908386,0.0002664830695940757,0.30796400918662087,0.04969768023418275,7.22953510987673e-57,0.0043199762965092595,3.4190140817298016e-275,6.615851700483482e-31,0.00234778238846118,2.9078332576996635e-5,8.098127360237409e-6,0.039065624561318624,0.0287045720204955,0.013362764287764204,1.1318920337037465e-5,0.004389257766956169,0.009249417550468028,0.022601066885899683,1.1542835338889766e-23,1.1973601326615463e-10,0.03417355871150939,0.17537668976088577,6.817380347946804e-112,3.755295412457826e-30,0.06990297267795405,2.7642961149312844e-6,2.0865277138361485e-6,5.971841729528078e-15,1.4152841192921455e-72,1.54338163776124e-6,2.0441979340959498e-87,0.013049481929617244,0.0,7.848969161315605e-24,1.0723137923621213e-5,1.1244568590302999e-5,0.11887012980631695,1.6082931493572995e-32,0.00015259270550356974,1.7549867512350578e-6,0.0,0.007829658663300517,1.1314459746531315e-12,0.008320831302452395,0.08093929101785863,0.02024694601084163,7.5862054507655e-7,0.0007802889771984057,1.2875474368849798e-37,1.279858870140847e-34,4.3149664972085553e-41,3.178667239282131e-19,0.10979534475760847,0.12197092881882629,9.494909292761718e-7,0.0026687491767917004,0.07625524975262189,0.003527427681766372,1.92208448271057e-6,4.9710837824896545e-24,0.06842901569136606,0.04600544727711928,1.0616886568044572e-5,1.9960919118692768e-5,0.0007001473374700168,0.0005075466684095408,0.0003167018321587989,3.1748860804595994e-5,0.3880782643640391,0.12049234671409895,0.0,5.1407762754700124e-5,0.03296423105827016,1.7545430630034053e-14,8.444253729152742e-5,1.0297292847402127e-13,2.810299091454401e-16,4.584016129051482e-12,2.0294346373457315e-6,0.0014812790376937466,0.03615279036531291,5.3887155876034635e-5,2.669294473738408e-27,8.48213468137589e-7,0.09409969614460384,1.9882976348865304e-14,5.315847322672203e-7,3.488118231464401e-61,0.15710203628114744,0.019622619295123944,0.18910921739720443,6.991153491066347e-8,6.53724894135019e-11,1.2143553132949747e-6,1.6004296517212915e-16,0.14102606651481345,0.009875113655340486,0.032921410948914806,0.007532640603790582,0.018126258585880947,0.001410642089339368,0.31902118165276255,8.314732986600292e-5,1.6855787233380662e-24,1.5020518742242655e-5,0.05186112897532548,0.06190177114647954,0.09870212197548212,0.3212131455522344,0.01610877100209642,0.0001898671245159505,4.749855363827984e-19,0.06085817099198759,4.9013480348587995e-6,1.4204786032352624e-28,5.721701941306692e-12,0.017716788929358507,8.056058549240888e-5,0.2724661333565302,1.4063697624487985e-6,5.1461273614769745e-18,0.013025381769043396,5.7673377621909126e-5,0.0001025819192660758,5.614121103945567e-7,0.0024764713799736464,0.0016553789584413806,0.12202324567460798,2.3041551538870033e-7,6.84158218178519e-56,0.0005749669980872935,2.089732693668902e-89,2.6699726345251353e-5,0.10057702447590217,0.0008893763145704274,0.014399904331052876,0.00021787650651037115,0.07550230268788335,7.361044908160854e-5,0.03149841066688292,0.06138017033949985,0.0006718337137182507,0.0014641256869041101,6.582599513579801e-42,8.111080551904597e-118,0.007990276235902965,0.016413125140536056,0.0005404678587405622,0.005904570119027996,0.0001183054096332086,0.04022083765807461,0.002066587800262833,0.07286982473622128,2.1297656519145037e-6,0.0,0.012396750050887957,0.0017343385968714153,0.0,4.295230160301545e-7,5.76985766033868e-16,0.005616196463622414,1.3617610849621203e-6,6.652774588637989e-7,1.710668343875502e-82,0.07221012042985563,0.01087610355887758,0.00469433529182686,0.07424789598783471,9.583151548473587e-14,0.004063010610630634,0.0013403423915844285,0.0005777307503513834,0.0011630320834062893,7.620077139262702e-10,9.476786291290931e-166,0.00018622496627866618,1.31007288130858e-7,5.0976479978158865e-9,0.009756774560226448,0.02375793729186753,0.0004434997795695447,7.269471597439504e-12,2.186490684453025e-65,2.1768399454632904e-5,2.0133907418898186e-103,0.0027727195034906614,6.773715840115176e-16,0.025595730515677678,7.518828193605379e-25,0.01297801680399197,0.00867888679025971,1.122075805455101e-8,6.17553887426056e-6,0.0008592320377707102,3.847692366496539e-12,0.0005440986602862419,0.0028246622069747116,0.024834638142342463,9.574328021678667e-5,0.00013222643575414906,0.00388669937442167,0.028068283763828188,0.008750868643970572,0.05518156876653936,0.0,0.002650579449901182,0.027719756470383855,0.0,0.009426587747736467,0.013062242250521019,0.027491547738940462,0.12140718651414606,2.220170188449794e-46,2.8806785308363403e-7,0.004352619359510928,0.10790042471693401,2.6834915360568533e-5,7.532062997094712e-55,0.0626627016035628,0.004521888816194405,1.0087964601744303e-19,8.176698355328966e-28,0.001926311741438882,0.005480158837911229,2.3896313686428957e-6,4.307931780975371e-6,1.1680371578105683e-6,1.657290176585179e-5,3.7833394943318706e-17,6.716383386523941e-19,0.0022839223164806393,9.415232490522815e-18,3.566993737950628e-17,2.833671396056472e-13,7.344158448961947e-9,0.0001432696562151133,1.1549807860173501e-17,6.204026934893168e-34,0.013390714682446549,1.0193937799719167e-25,3.5200353533775084e-8,0.05266920538609971,0.04361751970192465,4.241014322102683e-15,5.979936717672204e-56,5.867695955071512e-6,8.362178626831867e-17,7.195690143860025e-68,2.0672953825542225e-18,1.498281815107904e-176,2.857739984653811e-13,0.00035466964425881297,2.712012361122337e-5,0.010143255225970855,0.08415016711464057,0.0,1.542848045013441e-10,1.293875033868777e-264,0.051039019443828215,0.00553906639786071,0.04491782357678699,0.06839388884276598,0.13015930904939577,0.3556880069432957,2.2480336900102156e-10,0.07638368017928641,3.068618568670927e-35,0.0,1.9203554721804713e-9,0.0,0.08431415033708588,0.03150011485926871,0.015935202789856145,2.2820083934889337e-28,3.895632730468031e-6,1.4482991805672662e-15,0.05029688225201551,0.02042169732009725,8.001663208236176e-252,4.9733358141427895e-57,1.0492818916469402e-6,6.362368727082796e-46,0.03137360983547468,9.042235664217625e-38,0.007724068433210548,0.005875779183766317,0.11272742615742198,1.7313427791454152e-27,0.00482900483694285,0.00030790259287129674,1.0647094165513097e-25,0.009511299452798553,9.856080854756231e-5,1.5137525533301173e-5,2.75775640543605e-6,0.0020052143573307296,7.153340513300689e-165,5.354022468373042e-17,1.7559136559571998e-6,7.431456291692293e-36,1.9755601475242823e-55,2.145884399566104e-7,7.394357825735202e-22,0.005624084692539813,1.0458902038258114e-77,9.279170660783413e-6,2.2526068855662323e-14,1.6719332076342038e-13,1.2185053420262614e-6,1.8030663795286185e-16,9.373367721586859e-10,0.0018274473758063006,1.160358e-317,2.4223154956539125e-5,0.01710914916720042,4.09563410624602e-101,0.0012826564035368939,0.0002753748139022394,8.788758934761807e-13,0.0,0.0004261968647435921,0.00022127053389043422,0.000566429177508408,0.01818181773313912,0.010473332861017785,3.5969983771167875e-5,0.12932289869986263,1.5297222508578025e-11,0.05126227726847482,0.22147897925168825,4.454177426927655e-22,0.007066191494287701,0.0026324917562916654,0.1548561511151027,8.54074683516158e-5,0.001196979504960161,0.01490342133481125,9.666257122924917e-8,1.75863726936551e-257,0.0009556621988227852,2.9087032676947737e-8,6.631783468774856e-12,1.0488365082645583e-5,6.686163161547898e-6,5.865769037788266e-5,0.009412580281663483,6.844729826486917e-36,3.9698522457331843e-7,0.006102635204490262,3.08035296577722e-37,1.1141886662781597e-34,0.013241396724912731,2.470579958346097e-50,1.1734420497047825e-8,0.004263937349930683,0.051379659143513744,1.5558744267236888e-18,2.6571956210596864e-6,0.1649786532808553,0.0,1.4812100699013922e-28,0.01710522669839587,1.3463255789403873e-52,1.2545623524512093e-19,4.393921164562866e-43,0.00023526338740080578,8.843531475724063e-9,1.0262061600991543e-5,8.890652016131692e-22,0.01873918607021175,0.0,0.00864458192786641,9.073182289981742e-8,3.300965290419825e-14,0.4508755522005373,0.08050972127369165,2.1643648495948057e-7,0.0,9.455045303038896e-44,0.00028679245700127267,0.015146241953968752,5.539562213521565e-7,0.002810649229253026,8.783699135406416e-69,0.0,9.087170756836758e-9,5.26166222579486e-34,0.293640665901259,3.3118333381808e-51,3.0043842573759445e-30,0.10659632999622681,4.764080938720697e-5,2.302349838156406e-13,0.3112327025603919,0.0007406076161859746,9.964716146952478e-20,4.3377573188508674e-29,0.02693358391495376,0.0,2.1165740532205176e-205,0.0022240873622446705,3.144580259207868e-13,3.1880465980720054e-5,0.001190159419692191,0.0,2.3769451183677114e-6,1.9288887687798397e-28,0.0055522853095360475,0.056663677207656984,0.00014898493801301254,0.3143331892572062,5.602837769523508e-15,0.00595680914820533,0.008042060542870029,1.3936151024768008e-15,2.87464793282325e-25,4.1198648686839115e-6,8.135325011991898e-24,0.005511969464585567,0.003527644479944579,0.0,0.05194812824778493,0.013728651303176688,0.00651760598554034,9.929591037931163e-5,1.970844234478095e-55,0.00016642278719074374,0.0,0.0010640203544481236,8.693995066102575e-26,3.962405537686142e-74,2.7465080740161272e-40,1.8572401768924294e-65,0.20703019791697713,0.3643832552935289,0.013939189232601457,0.0979744663493888,8.279078892205674e-13,8.660517728506099e-28,3.939840996301924e-5,0.00466357958888848,1.0195219732270002e-11,4.406710428741381e-227,9.097265850927982e-13,0.030373478959858733,0.0012129238731791497,0.0709072587216572,4.932832667768537e-7,0.024337152022515147,0.31050284189166677,3.698131342390242e-100,0.08086921173548649,0.0137947276963482,1.4739391805090413e-34,0.008024782043271292,0.0,7.358257293469373e-7,4.723954115017005e-6,6.686530386648076e-25,1.8518932020320346e-146,0.0031880878213556094,3.900831068486009e-82,1.7532119256717253e-16,3.32643770751466e-14,0.00010795236195628367,8.946294999273613e-11,0.007921747655231374,0.00181739137874815,0.0,0.03560750495636094,2.598834146823368e-220,0.0174518174964515,6.665853373544736e-6,9.05420273424233e-10,0.0003101274933901191,1.338977495769724e-5,2.8364147093188135e-13,9.9795026940734e-11,2.77339697332877e-7,0.007869939502946134,0.00803861588588891,2.5083981697953737e-15,0.0,0.00270072508640711,0.011288968441870372,0.00016009594530203843,0.0067698593609126076,0.00019051301110868042,9.718891069876536e-8,4.400404864359442e-25,5.8423051763711643e-5,0.0021238142200485596,0.21523113639345479,0.0001132382967091316,1.613302340650366e-10,8.447595914429367e-26,1.0921211175452715e-26,9.835852394045341e-77,3.648096537716457e-54,0.09471865728547074,1.1145213292520684e-69,0.028253121611325167,0.002922540968826872,1.1063758852733286e-7,0.048559819662394414,0.0011446835692454737,0.0,0.000616521164682808,1.4074575528868127e-24,2.8152821913644906e-5,3.9748069169126004e-69,3.206932834075841e-5,0.010934970873141419,2.0885104271711776e-5,0.0009180365458292191,0.01764024888467846,7.590946388729453e-8,6.139055976828292e-185,1.027987346501129e-14,0.00456827941222544,0.00014116129940237523,1.7799690850903785e-142,0.14098077917609853,0.0007964856764119082,0.06871357960233447,0.0,0.08713309993462554,0.06886012551330181,0.06220454302967161,0.18126722817630087,0.00020410577999433293,1.4759161251227912e-253,1.583480658477567e-31,1.346634053142583e-7,0.002963504815678449,9.186315652900158e-5,0.0,8.755987166897422e-5,0.021778310154166886,2.68231552325248e-7,0.000223216798803567,0.08069918842239363,1.7274798607112285e-38,0.04695133018759911,0.002669818126549108,1.4638323986211158e-7,0.10985056855061087,1.5221544411096932e-22,0.058025776904610714,5.976297592212417e-17,1.039121647609961e-5,1.994058154572341e-17,0.0013355210216561336,1.056243965830442e-59,3.900265175981852e-21,4.328935400248429e-24,0.014819505657713178,0.0,0.006603394276421928,0.004862139698308852,4.956748173130306e-161,0.2583954500019975,2.701988129019991e-19,4.439315486622614e-92,1.3004872465642662e-41,3.1025241702192875e-86,0.11873620227724097,0.00037321872217516275,2.7936919087478137e-26,1.4721500007438762e-6,9.057675376292763e-38,0.01591816403301058,5.019486167899393e-6,0.02063818652724667,7.280828370389906e-15,0.0,1.7377767554472255e-6,0.0001890021939147493,6.913588428744657e-7,0.0,8.886087635607751e-8,4.428628363462113e-5,4.058670643447672e-50,2.1953415354302818e-7,1.865722973096676e-68,0.0008307872823388251,0.014038522298394062,0.0013060419528240243,4.574639681606482e-13,8.786679825082194e-5,3.27173029032674e-50,2.526648516216237e-5,1.1057039209466051e-21,0.0001893528079422304,2.5934544333479305e-161,6.411985369434684e-11,1.308751759486349e-73,6.200291513366891e-6,5.841807546807788e-10,0.003125613861698806,0.0011278553584109458,0.00356267430104606,2.486994104178237e-7,1.2161468982073987e-5,0.0009119561464871478,0.00011655239808325107,0.16426743355089496,0.0,0.009333607246744676,1.6554907728189456e-5,8.81035950580196e-34,0.11689287530253736,3.529076911958678e-5,0.0,0.0,3.0437589257129936e-15,0.00024157316256172298,0.24797105593762547,0.03944357676803742,0.0010986418604455664,0.10166466591498893,0.006244701477099889,0.0038839885968947573,8.376495380427387e-6,2.0465567467538634e-7,0.011518816616571973,0.0044861476602805995,3.662938901763939e-7,2.061607708898933e-16,1.0281965542200488e-83,0.00020163031038067405,6.817782986458213e-9,0.001152413477387928,0.0005913079464520667,0.0031762616349114816,8.277619699597361e-6,2.3668963895123827e-27,6.181778376539522e-43,1.282799732375086e-6,0.0019040389013673796,0.0,0.0018192418908858118,0.00022847623423249508,0.0118808161196237,1.5451531225163023e-12,3.6233484969291104e-20],"x":[-17.16818432610143,-18.606289283220562,-13.304735689171622,-15.619291627954228,-14.449436955105398,-18.70861601200438,-10.833043701182879,-16.871680531203545,-19.696540676851242,-15.247662992975348,-15.046161112604127,-19.83780258867092,-10.968066052101797,-15.818018784872915,-14.49023747593533,-17.543527152858086,-11.521159606492246,-19.86174279993433,-13.122758749981875,-11.332394876684502,-16.50760982129943,-17.824541829694354,-16.36880350358458,-10.132872563335479,-16.46562063834803,-19.250391984653767,-16.939874472148034,-12.225864216034898,-19.038167517804997,-14.941320650631376,-10.897593599670802,-14.288902188572198,-10.650856616083155,-19.373618595529983,-13.423220173358194,-14.464630141719152,-11.72772815351257,-18.769947859827127,-14.332042142923374,-16.218010494139985,-13.152435424463587,-14.295866775537817,-16.0761662923317,-14.12642998870651,-18.52329513186026,-14.45706466853771,-14.491233952610616,-12.674609999196795,-11.350306669261801,-17.210491939944347,-11.647779139801957,-10.283161071840803,-19.53205795694258,-14.254751966432087,-17.14285355031982,-12.451500096865814,-14.841524215607597,-19.99187334273275,-19.627756548846172,-12.455396920922228,-17.73364000787552,-14.424233566855316,-12.994247734511156,-16.30576113015473,-15.67222115924173,-16.440672717665233,-19.71545924904831,-14.285363328653213,-16.99406978608097,-18.862328580507977,-19.76795359235655,-18.29722653246499,-18.211936560636115,-15.254854529090274,-14.435253573748541,-19.58516816311616,-15.636551469275151,-18.27793592701951,-12.101018309247866,-10.78834667714604,-15.388492690751113,-12.016772484448481,-12.702524001262066,-18.41483172638175,-19.47531572253359,-13.49417831187629,-12.196150819466729,-15.845875108031283,-18.775597802093106,-14.007932018969445,-13.835120919919799,-18.71543939172582,-18.241939885488037,-13.857476775527713,-10.739853137388828,-19.03682255862515,-16.55552285387375,-10.744806528970583,-17.827871969217227,-13.924714010199079,-10.107700942722971,-18.56800097398266,-19.154948904756136,-14.210967469696882,-14.00623641381598,-12.761845719590388,-15.312431450074557,-16.587148565130267,-12.511649775990781,-13.648302512080981,-10.131756568590863,-17.74155656236023,-11.193055547940272,-14.922628177286413,-12.410808605652946,-16.729989044842245,-10.394873494292343,-19.060325134388936,-16.736659609727056,-11.165837089458144,-17.077545758279513,-17.118563324693017,-11.282008746590453,-18.408861468430565,-14.978741931732172,-10.482302992272228,-18.42887573913099,-16.91948575490381,-15.388890315241266,-11.09044504281969,-18.61422094978672,-19.755452802367742,-10.346436685070849,-19.921591606634156,-11.446435469600772,-10.452207372859698,-13.012491492865264,-10.429451873406157,-19.07540045386481,-11.980316695529982,-15.427422457388726,-14.133193083918972,-10.132000028915662,-11.404147581023791,-12.654853595805564,-10.424791396803405,-19.9527215630858,-18.086661470912002,-10.94559337709958,-17.633035113460323,-10.626761835458037,-19.85024921478328,-13.081137756486578,-17.130374336260278,-16.432343399599265,-12.617151450670354,-18.13001868436275,-14.18268123174222,-12.9144174016471,-18.596272524408977,-14.190504314929415,-16.913213597287356,-12.353098300526415,-11.177660195668075,-13.907034312016982,-15.071615274728911,-17.129217905361415,-10.795841966913994,-16.480409554035283,-19.429234712487542,-14.946837681659051,-10.750339906446582,-15.386281425738558,-17.630545710744336,-12.709000938006646,-11.743556733084201,-13.31392546989963,-12.720976128231204,-10.872920365049454,-11.434993374270066,-12.709601279526508,-17.23956120707825,-16.481923368508035,-16.38837148643038,-17.54571906721905,-10.621028250772603,-18.85641282734846,-10.352340789132668,-18.160665408510603,-16.414679925061918,-18.859702567153064,-19.49656068232794,-15.602074090271598,-15.44613178200173,-13.3723810063535,-19.429504814795557,-12.425827135264454,-14.956060919908111,-14.723056715070719,-14.88253019441952,-19.325729470455016,-12.522015640411341,-19.377253948556465,-19.995855696490324,-17.495127113515668,-17.799776906655502,-12.617828923701985,-15.49126191469827,-17.114925599197097,-16.494851411108588,-19.69646941838077,-15.46562320489022,-18.016717941160604,-15.767502199639784,-12.174147377977345,-10.200414646299818,-10.059793625744467,-11.449276744715885,-11.593568231795818,-12.573923153603815,-18.50550098414875,-10.43328915996564,-18.18075610479216,-18.98543355046844,-19.912959933271097,-10.645862140010824,-12.720718466172716,-13.171698280391551,-16.22102345710981,-11.31079048678618,-13.425970801615914,-19.308558243943555,-12.800138248577404,-18.72620484479087,-13.5980181223145,-14.019213132707563,-16.651361601015775,-16.202933574016196,-17.497714981839934,-11.15086155880974,-19.744338047962792,-10.817866411152878,-16.418418378480823,-15.264556799388991,-16.16504562153969,-10.887707315077982,-16.46131701100783,-19.49801039262937,-16.993938862107083,-19.824550760902603,-14.295248195919255,-12.817855885320649,-15.61991013796413,-13.420107993037728,-14.42961932985823,-10.450670275183786,-16.754212157380362,-10.296941426282668,-11.349992041103143,-14.803383216490415,-14.742730855249711,-19.498214648593947,-12.389649949657182,-19.12786796788211,-19.953888897502463,-11.790690014129932,-18.41694804317606,-10.155082244113746,-17.99563859098015,-16.97343955693294,-16.747666259801534,-10.496161780828677,-13.592072404505855,-10.788448220552056,-11.875576117664025,-18.085102576293714,-12.02448398886466,-11.087238329662659,-13.27145991633939,-14.45267500998674,-12.807951207086036,-15.5881769034339,-16.182686755414753,-10.53430946234231,-19.602633086232988,-15.911099635977076,-19.78772638374137,-12.122384997515995,-14.587395642259917,-10.101259365908973,-14.894721363995203,-12.899900823878813,-18.62541538215015,-18.02124429232509,-17.522454995862336,-11.72935788499414,-14.929490339864655,-13.285481065696764,-11.762636465354909,-16.46069359113359,-15.028338753413413,-11.110368337868898,-18.112253287889086,-12.530466103107592,-12.972681134962961,-11.814669462217275,-17.5554795797336,-12.0852547429457,-13.721393802455903,-17.085202265199225,-19.20653051704303,-12.390184961898207,-15.824477447126654,-15.029610981835756,-11.27455508526323,-12.702935355387515,-17.056698165636174,-19.290591505092117,-10.443510624627763,-15.055523401730897,-12.234582735345027,-18.297620531463124,-12.39234419722224,-12.522527241341022,-15.043963681925586,-15.47071524285844,-18.10243140203996,-17.668397159221726,-14.631807904413147,-18.584287478618393,-16.30663803325151,-13.056765852481227,-15.39744088649833,-18.70233836110711,-13.436267386303326,-13.1065149472189,-15.138173987316392,-13.859780989547932,-16.37233185659965,-19.744969522281334,-18.105499474826093,-16.374529960674234,-14.5564356473143,-14.034524043723682,-10.513551147206684,-10.304786605038734,-14.631172332058679,-12.163098882952452,-14.250660383650304,-17.795863635378257,-13.77725151786385,-16.710219888095107,-16.819245920663132,-13.387332076508777,-15.10738454684208,-13.939473556821744,-10.634929226830073,-10.712911627853163,-14.401704388281653,-11.288426728538468,-16.279408990802267,-17.175236594458536,-15.595413572132234,-19.86661543454502,-12.298821458166158,-13.626865372115105,-15.02642126413917,-18.471285035550295,-12.835282399668062,-14.601125617480339,-17.700614717779157,-12.434159702084495,-17.679652585434575,-11.908457593764851,-13.67360470905066,-11.365461948793602,-17.065961822164418,-13.38067774638423,-13.912317362961435,-16.028834055921184,-18.855124379347522,-13.287794556605704,-16.375306941710203,-15.098146188091189,-16.759432098506526,-11.00344521305006,-14.693831664913938,-17.50607721571772,-15.921907403351131,-18.757118743401307,-13.608968466710609,-17.23094743763497,-17.24417627549076,-13.913009709643047,-18.30481727628583,-14.853285014546277,-13.809137018760723,-11.050981267513203,-10.34459413750241,-12.055488396190455,-19.756640708934036,-13.028207370663115,-11.469310101750256,-13.695592485110463,-16.946250132405527,-15.794547341934235,-13.392187662519852,-13.479170606018355,-16.03379121537853,-11.610041100282377,-10.360209148095475,-14.232507126924997,-15.323452319947116,-19.61918744647442,-11.635929571328617,-12.998760605792414,-12.494310311324138,-16.259479321935395,-12.013060671849985,-17.535898154591646,-17.62163782566178,-15.696570479171708,-10.8772365135021,-11.98606908640839,-19.31411405102947,-10.678353392390383,-12.956372121495152,-12.671439216921685,-17.758511196579196,-15.234218407754533,-16.637856596286365,-17.02934269641609,-16.551390216268732,-17.939755767151606,-12.436397960991536,-19.691131414981736,-13.118755424231283,-12.915475995614774,-10.608915815961444,-15.14996249865442,-12.103177293792267,-16.976218686109146,-11.906192263737605,-10.748222049013833,-12.579081236098897,-19.533492621250254,-12.393329503152291,-18.736130699228713,-19.116572322071516,-11.116748192738727,-14.760064382874685,-11.566578438438391,-12.069259989798596,-12.23273672239449,-14.03231336262367,-10.217906962055272,-18.97436048004822,-14.230436623792963,-14.55534752533161,-13.32425025784058,-13.48371547216654,-12.765325339636906,-10.137124076189117,-10.686367582543166,-19.797434986080386,-16.702450600620804,-14.681228898380311,-19.803709695470378,-13.815352264731775,-19.750850978540434,-12.694788866674873,-19.129775202456084,-11.529868273786462,-13.797547377512924,-14.660106887767643,-10.653328275073804,-15.294316838192204,-10.857797762454481,-13.57768662424018,-18.478992377099285,-10.453294650048191,-14.002437271961469,-15.251556718020314,-17.555145110072928,-17.347220844527797,-17.87302358768516,-13.676585174057356,-10.180597099281147,-13.64021356983753,-12.151673893142053,-10.149672233343725,-11.02853440528773,-10.418236664145786,-15.963658159730993,-15.290238385477316,-18.312732062638172,-15.951773409041955,-19.96595502120188,-17.959886147289804,-18.630003157314164,-10.889336983052011,-13.089029281529058,-16.176343975999842,-17.61143427109602,-11.94540212734395,-14.613183585022483,-10.808505631123094,-18.440770641805887,-17.400778137823266,-13.716544840955724,-15.204577452987184,-19.468571803706592,-19.951666037384317,-15.288131706700288,-13.739544293190322,-18.861822473249507,-17.249007586550277,-16.00734171333091,-11.830998391553418,-16.84095865985278,-10.243137651355596,-10.41218783755956,-11.579516696374421,-15.678425870446757,-11.49571722389693,-13.89366243400439,-13.592828850951983,-18.54646929554891,-16.502167157771574,-16.464881954236574,-15.354653377604116,-15.339249474732126,-10.444388795079968,-16.340497041866385,-19.680382199849166,-16.998123344269047,-15.05004345225866,-17.75095483050298,-13.43499863683504,-16.933100868885333,-18.290559463646293,-10.262272160044922,-16.66537472193546,-15.513965274104812,-14.111940186681792,-16.08339282006839,-13.482740526952341,-18.182497736639885,-17.865668285582625,-15.668548279051222,-10.782014669720555,-15.955720793563632,-18.36483200497482,-14.984098900787593,-14.666451549003641,-12.632178203974519,-18.107100874999404,-11.867777801084875,-18.766701441108125,-17.369507461571004,-11.722454921641603,-15.92644898793576,-17.361316051200617,-13.49753181239304,-11.818015790810817,-12.23206094256091,-12.675797722560498,-19.395298335276394,-15.379953204167975,-11.432760810126293,-19.209590001527957,-14.674103848255363,-13.335922762704444,-11.552267048565154,-10.292885785390611,-15.321658608192092,-15.416256971025234,-18.681820728485416,-19.677593318102165,-16.467670045000435,-18.779817952431046,-15.928713966037282,-12.838475491474025,-16.70463379479855,-13.977217195278083,-11.787903771999382,-13.0754780958126,-14.248237683548506,-16.433627158908912,-18.494717896403486,-12.901332595048896,-12.697918554651109,-19.783444939977247,-14.023824966053791,-13.957976894803117,-12.968189662859924,-12.264965436205621,-17.895686239938946,-14.604699964226874,-15.828088291886273,-17.973908816671628,-11.275057076731624,-18.1687917945852,-15.048390545793069,-18.112589874585325,-19.575709285741368,-19.741637577482997,-10.889769225463112,-10.382393328774617,-16.237977349024625,-19.21475664503467,-13.450722871208743,-11.786034475984906,-16.555227015214715,-11.458291664532823,-17.251747409674792,-12.917507007811288,-11.324753610035383,-16.757327133988454,-14.22751916859122,-19.968691311260145,-16.65043568562931,-19.722819007612635,-17.91784696463358,-10.729307009125007,-16.268620215908523,-16.004750856751677,-17.14113996157068,-15.212868151398345,-18.10048358483293,-12.210245370080122,-16.790567804990623,-14.0780083943799,-17.542398953727634,-18.420030395028192,-11.30426366897324,-12.57312538280863,-10.332369550726877,-14.755926964187404,-10.656501733073974,-11.466244131072232,-10.497762397222779,-16.37015493034327,-12.491691724925658,-12.008128584764746,-12.247721072045225,-16.120668707607933,-18.823661125584124,-17.018466183447913,-10.646965787892197,-14.219598914172558,-17.308804880144777,-16.330279865344178,-19.610923758533897,-17.517799158755462,-18.945890451075872,-18.71719924568425,-13.283752220283631,-15.353671667634575,-17.13923962507054,-19.212109886278704,-13.81502684399842,-19.91356278641547,-15.347295081258084,-15.172029545944774,-15.799619926041133,-19.012214612485046,-14.779798480480553,-13.979216077087779,-13.693909513535429,-16.186337893948828,-15.092413419613495,-13.25206187274025,-17.187569621197134,-10.450392735824888,-16.3457130685252,-15.614661160972156,-12.583791670652328,-10.24410456942954,-19.97235758488162,-11.608646580404756,-18.03543972520512,-10.879927601163065,-10.81932315160023,-12.553408795941682,-14.801303771806097,-11.510543914692736,-14.441576302439179,-12.022164624015737,-19.9677271182549,-12.436721640727878,-13.583650986626612,-16.26635186347508,-14.353306760110536,-11.988939441981728,-14.285769619870914,-15.446042999320673,-17.3297218432015,-11.614473278760357,-13.984521912428228,-12.439645493542171,-11.490147706086782,-11.199897407172443,-11.463202207673133,-17.188148534200145,-10.663973277557828,-18.00316070670221,-13.99597455064966,-17.67838640992131,-10.553292795294864,-19.906842507467328,-10.629641677675426,-10.090665756208242,-15.533152060644479,-17.18575291210483,-14.369023191700357,-12.649952112020575,-11.965421726220395,-18.65740310329952,-18.54933352392288,-12.647482967883484,-17.085359896001123,-13.313806316842305,-16.973417276838404,-19.750103057652716,-12.129749690406262,-18.992488005261265,-17.408791962210653,-10.264830080784373,-14.471439133697787,-17.875675440983382,-19.328319840540058,-16.798341851430468,-12.690242077348987,-12.5331550362202,-12.845553996989716,-11.503427846173722,-11.760572465133702,-14.643045128829502,-11.104975561790232,-19.48803403424448,-10.799918544432161,-11.187363564232802,-15.193208914615735,-14.44363345310395,-15.124459684434896,-12.100533459245675,-10.530699213241341,-14.949204116456055,-10.302564294900108,-14.03021033562495,-10.026024373299666,-14.442440737582787,-18.406770853483014,-14.02320930731131,-16.497748329652172,-11.198924763015992,-16.06716613926517,-15.614689662006286,-17.913505831483604,-19.268480507967563,-17.96873790159986,-12.633421374532134,-11.368924708454795,-11.375975188668514,-16.62922853569811,-14.129125631709147,-11.329459006203912,-13.700618202073843,-15.345299024903198,-17.070001133020796,-18.193470734577275,-16.12159943100129,-19.36980607769963,-10.204551613623776,-12.670791608155351,-10.476820335788764,-14.104763873780586,-17.606860179548075,-14.359924896119933,-14.777039407718389,-12.067054712002292,-15.428615317296055,-19.710749952298602,-19.109786495374138,-19.65103637025843,-10.728746634653263,-11.284201315364403,-11.086902374589647,-11.875621957306885,-12.986264717979596,-16.98520971521149,-17.040435022519695,-19.465996252847255,-17.727947245866396,-17.104276627165444,-10.957304902749886,-15.704756593146126,-14.278832359006026,-14.480768300069983,-13.897541866582564,-14.787194554605595,-10.984380270072961,-11.33463392890289,-13.38104644777208,-10.377569788188147,-14.775069101184119,-18.556827223746104,-19.96860729223558,-10.838004783613622,-14.667826185916581,-19.964529238933086,-18.315960516968786,-13.172738420402448,-15.81074263977908,-11.310486164722949,-18.150586280124767,-13.930040380163254,-16.991482076639034,-11.756315370396182,-17.394038790195225,-15.721170158311361,-17.997196150001205,-12.473515836027769,-16.198312317508414,-14.623767884191102,-18.946813920912188,-14.555271296255615,-16.953985976917775,-17.50908848017352,-16.994053290855348,-19.66046209300591,-14.852706033161201,-11.40209036846706,-19.18388632763251,-14.809472797147155,-17.895853501357763,-16.048601847833247,-15.812736746658135,-16.459463824863562,-13.162343368689369,-18.621841625150537,-17.107838913913845,-18.327845863798654,-16.39627759061318,-18.95979667050497,-10.792071319314203,-12.332640465489376,-13.251515549377793,-13.750725626934837,-19.90316535878112,-13.420123753920308,-19.45788948497723,-14.877763173039845,-15.153508671370888,-10.113133708146922,-17.760129151927572,-16.68124613085837,-10.29139977117049,-15.885431526796507,-14.113921919869528,-17.163300197145222,-11.473741300318622,-17.72063244616166,-12.571344625116838,-17.828486288417977,-18.293254110711796,-16.39746558979558,-14.484918187704046,-13.37775580924321,-18.43604507516418,-11.211056976221238,-19.474082549194712,-18.331697428593593,-16.28787257776469,-16.7604505356509,-13.077102830966433,-16.620263136223308,-10.06664451530308,-15.29283209507124,-10.843143422340528,-12.717953320532299,-10.794674531021514,-10.695629441368135,-13.827684885380949,-15.607385170168914,-17.239670226937235,-16.787510991352757,-13.862021562297215,-18.378774827939875,-17.55133211994191,-17.401206249751937,-14.287558143317211,-12.935203091079593,-12.273882614192889,-10.960697637922054,-12.299958441273311,-15.872535362740779,-16.10113270767378,-16.674636013496468,-10.429022406056426,-18.791472446180787,-14.178284410164167,-19.108209722962577,-15.96579867519358,-19.381401999214752,-18.10807732541415,-16.905091886749403,-16.207367593436498,-11.222379629174444,-14.475472039100891,-12.163123541961074,-17.30501870400888,-13.790554697147424,-19.00392243718497,-10.839547735730088,-16.27721687563624,-11.357494465594293,-16.196251341273314,-16.74211446215873,-10.45581374939174,-17.75164188087117,-14.183047570335303,-13.598695666400765,-19.565768774983376,-11.79365312530148,-16.824624873317667,-12.516144553642139,-18.947628441631835,-17.342674162946484,-15.95733150039658,-10.485781359978883,-11.845650321231357,-15.367628026321478,-13.885728973697935,-18.39913078466717,-19.10019775954179,-14.120103139192574,-16.46973605191112,-16.319528045427262,-13.090165563443712,-12.769715558733347,-18.71592814363122,-16.097541638294707,-17.51450829976204,-10.559835950949294,-19.655954546404484,-15.987332502225168,-15.970093265482149,-13.92408760193025,-13.092086825590506,-14.730712229688825,-15.92042631905818,-13.764507972915887,-12.82343986847214,-18.685696007006026,-16.78118055614869,-10.751502526222579,-16.103988968851812,-19.744330915742626,-11.190020115999815,-17.82437667137741,-14.467736467386274,-16.956455112084598,-15.403061165899437,-12.557039719078567,-17.619193823463522,-17.025512246260732,-16.844615166614968,-12.694734510818728,-17.774244156940373,-12.100362174246,-12.048803014369323,-14.103262794457816,-11.640236726988423,-12.842908218695035,-11.568598597747426,-18.481562791616092,-19.955158273606628,-13.46183073841245,-18.675005597052934,-19.095760135932945,-15.438569688339838,-11.292735351745538,-14.6011012782904,-14.988211188792695,-15.49800684946282,-19.10116120674492,-14.953318737741611,-14.387320830416105,-17.686353310270942,-10.170050586838872,-15.970360442167074,-14.78784096773757,-19.901040624757748,-14.382163186856307,-12.594347317061313,-12.268476223722285,-15.116163449766958,-17.281936839108734],"mu":[-9.386464982089109,-1.5251995353941061,-7.670053016474339,-1.9855298505730534,-8.879214909181133,-6.000151648306753,-6.867391775824522,-7.007371484884681,-1.3100096329973265,-1.7883229234899467,-6.898474300340376,-5.984588467423428,-4.852965301819124,-9.650954691256752,-8.292677253394032,-2.431965602644144,-3.8893775520182827,-1.3797647351132336,-7.301005316538436,-5.745325098730287,-5.682681314330374,-8.472001794818132,-7.049418756483274,-8.864912870253496,-4.099253220397903,-0.1319900964606635,-4.89067151239889,-2.338897570091407,-7.374314011903742,-3.3285117415085463,-9.026313760677118,-5.065803947986931,-4.328070074928001,-2.865342995077189,-8.739265358827065,-5.90110338089068,-5.276051611822233,-7.839881103038615,-5.163429020919441,-8.592076461833777,-1.7655143065458057,-4.115843876430006,-7.015794129465149,-4.159881494062496,-5.760430035358219,-5.820219643180369,-2.8692902399700926,-4.6344375938599525,-2.052396942918886,-9.783042573655171,-2.958076802365406,-8.74294923843947,-8.857284789699364,-0.017374614098588648,-7.61494416575482,-7.172542111973847,-1.3674703150554324,-5.604803855568727,-3.658903455331781,-7.015006871944092,-9.661545037289304,-3.169111036141592,-4.946177260886142,-3.2721136786886373,-6.714293507837499,-4.009393850469179,-8.227402456441153,-7.7657440738610735,-5.757830512947663,-1.4798913368338495,-1.3312380907272203,-9.977116564163014,-4.978816367277206,-0.15421069629522055,-7.571015733908773,-3.1908613107261763,-1.7642194553322121,-1.4160308935550159,-5.8277440281783015,-6.950452017507704,-0.26184476619802277,-5.959968998717526,-3.388310484798671,-3.5308068685986282,-7.857509655754448,-8.204392753552874,-7.505099171634926,-9.653225854507939,-6.501045712773017,-9.171826248972712,-9.82509568042415,-1.7524193037794666,-4.196474144770052,-4.968160906611622,-6.138487816440261,-1.551425144906966,-8.989028670966771,-7.703971546667383,-0.9046932093068327,-1.9343263715905934,-7.913972470379369,-8.388976081889892,-5.805555342963737,-7.544188229909228,-2.5463594607577145,-0.7166614257475001,-4.727637726871112,-4.271455827369756,-2.8630943725340985,-5.197366718354235,-8.043995892291719,-4.952928544039549,-7.96117942681936,-5.689602543639165,-5.407167181355885,-6.17676581781109,-3.8877593234533148,-9.387210487011522,-2.0828545250928343,-3.529153053964169,-0.693109534638976,-5.032089779533235,-7.788105158604011,-3.983474292471587,-4.077120460647549,-2.0360292322328233,-1.4815827757567157,-3.1638857034943335,-3.7162840476482417,-7.160573389377676,-4.097861161541783,-1.2265159556542327,-8.957718618334809,-2.239985380199885,-6.305018415102966,-8.88546137292048,-2.7795280926945343,-0.8698986029523015,-5.083683339442155,-5.282318537458925,-1.8453344537289484,-6.679648626452783,-5.972878694034616,-5.104910645053522,-4.555558159142046,-2.1745746340836436,-1.32453172825316,-1.04653560963198,-8.630138203002886,-5.967764679794203,-7.745168494425155,-4.979805003994633,-7.320459609233405,-7.330260576371328,-1.3313016429492142,-4.687275740651431,-6.3277956438728955,-5.16756233700664,-3.9646478200178237,-7.373526621915049,-9.593551140539438,-3.145459594536555,-1.6710755563688062,-8.077380797453094,-0.020227342897458644,-5.770081683607977,-4.269437014492787,-7.249559756828345,-4.40266408411309,-1.418460371744319,-2.224665929201506,-0.8796605777679223,-8.675039970082427,-8.298406176199268,-2.5671715016705976,-9.893920746671965,-9.715963335448459,-2.361856155342388,-3.3708954003005887,-0.3542037779578022,-3.3528969601361047,-7.071403068326441,-0.5719873545584542,-1.5991078908615464,-7.168839232745938,-5.084393029250068,-8.217115524474794,-7.557709989501793,-9.175986212335129,-1.3168462001635284,-4.999771339325152,-8.581337026621549,-4.1606527881359545,-9.861010697708824,-0.4730720682985301,-3.6597105286717135,-5.09715287898747,-8.30655107580871,-7.622448429364363,-4.95012537316418,-2.753856658255849,-9.767611632670729,-7.659845431340491,-4.955960527877918,-9.179631620797222,-9.622089397997653,-7.16259209847558,-5.697491809479914,-9.186083387628601,-0.37133223802064075,-4.554085970208974,-5.29061201673692,-8.007384042356442,-1.3216038264417085,-5.006331729240534,-8.310426044502028,-8.631728897977437,-2.030714618468712,-0.2629059525086075,-3.6499175010686935,-2.851682159155031,-3.221443079940962,-2.6329946574553276,-5.235039473409213,-8.053336004656746,-5.518642333389914,-1.5134634431849192,-8.24380296251378,-3.660826594515858,-7.07304279855915,-4.015695837623023,-2.4049254968500966,-3.8714233504158746,-5.868149666598046,-1.787383377214784,-9.640435826490716,-5.329296803949917,-7.712299012492554,-7.001001406584397,-9.982441628004693,-6.66236687526373,-5.195622246013216,-1.2306379526991096,-5.765021499899349,-6.610255683582911,-4.9343517213884525,-5.850061024570321,-8.948709713072368,-3.4505419810168814,-9.428943172768964,-4.594513823202016,-8.421831501219781,-4.817411414044885,-5.334277398241007,-4.595068873019368,-8.210517450621996,-1.8441316314842693,-6.0338839529342785,-5.975761015518016,-3.186672911291064,-2.421060658979428,-5.400714913841236,-1.857626591697239,-9.617245999213148,-6.875414615184187,-9.159050928281747,-6.886725455686098,-1.8890495651101435,-0.5246580175988713,-4.7807857014903465,-4.651910506021273,-6.036126356387679,-0.6344687453492992,-6.174634255718868,-8.834538049509069,-7.397894902577196,-3.8670790818904988,-0.8422221194254442,-3.0846211060103146,-0.5438780123130993,-7.145522037471624,-1.1248875614987974,-6.824310347265554,-9.367261265671784,-7.730910218513609,-2.1374870887463016,-5.043611899971577,-7.207163516410149,-0.26653237555990916,-2.4246845203745404,-0.4058828240921586,-0.6766162170917078,-9.119454337099938,-2.5173820031782124,-7.447993297323531,-0.6980962818771697,-5.985303913705,-0.18099068653226524,-5.367082014890434,-0.029382541748059765,-6.24596525987529,-7.377074560366566,-8.907971657486778,-0.4820423254398176,-9.248534378833678,-5.810849701385621,-6.745344369916253,-3.838641957356572,-8.514903976173517,-4.875924491376978,-3.649894494492727,-6.162410943179997,-6.26982169509218,-3.7803484569765655,-4.507070235483686,-2.432382133360811,-6.545180807100808,-7.90464704029012,-8.832620900643589,-6.055781602434724,-0.22063990373274667,-8.81393091055222,-0.06076114720889425,-7.190347424520178,-8.636012879718265,-2.6026815362898836,-6.987478395498918,-5.962029440448367,-1.8064304487421579,-1.9576051281069828,-2.7965532928462866,-2.0880540310819273,-1.2986655585046258,-3.8540443026873716,-9.915794795938922,-2.9705070920363896,-7.4523746786394724,-9.53553158973956,-6.65912902735225,-4.224142793694529,-1.3512139077472152,-6.796903292708278,-1.3736213803710284,-3.6663788352133753,-3.5208487933517985,-5.995256823070838,-8.273892498200686,-6.972270691209664,-7.087656328708462,-7.784190245496396,-6.447210785654452,-0.705256522861859,-8.83439305883941,-3.9938710500569075,-8.102631133299315,-6.458202587783035,-8.662340195796762,-5.724410472796391,-2.6607137952494297,-3.332496986347002,-5.273960856108257,-0.4485501831934391,-4.6682534620242455,-1.5938926843500623,-4.537723452522922,-5.390384783318643,-6.981787074631425,-8.66433209207598,-5.286300738646103,-6.271082664863674,-8.396094105460856,-6.313252333088162,-6.188025303299622,-5.069795055976172,-6.198792883783797,-7.360366030540895,-1.0549215888233032,-2.3162874882319584,-9.25777434488622,-9.69369276570897,-2.088454284937926,-6.181460131018747,-0.6002258028394847,-6.508614643213882,-3.6945476230054908,-2.822162359220084,-0.42389017295151543,-3.3362971046797485,-5.1381080873350555,-7.384745481186599,-8.681936066938569,-7.012221362006768,-1.7588049596735011,-8.018203638475505,-0.737649503564608,-2.891940248120146,-5.26610667224368,-4.728844758247684,-5.833466761631117,-5.34473119182983,-2.3904776484814017,-6.96754503510382,-1.918907624658508,-6.796683281017151,-4.025980891494947,-4.320086351061098,-7.593974009647377,-8.792233851722369,-1.672888804655075,-8.159548012750522,-3.260622444801766,-4.240550865665438,-1.480803944609741,-1.2945825984874215,-8.501803642046273,-4.826026957617991,-5.035201194347034,-7.582866489790971,-1.1381004401557449,-8.519443266952539,-1.2998345034209957,-7.192211032685383,-9.65591101555747,-7.192526989507126,-9.854609011479535,-1.390263223108621,-9.534285129602173,-2.0693623638473335,-7.11001553992793,-4.909677793547081,-4.186599467567158,-6.524170586077373,-0.3351918945949839,-7.9780303805480095,-6.099242989104159,-3.1253079076821177,-4.687692427206674,-1.6765098960290858,-6.076702747471345,-6.40430245024179,-1.845171320235448,-5.489400877816997,-9.749392493802848,-2.0653529131418424,-9.916120362937269,-7.424100536177138,-8.419078856253206,-1.110105115535951,-7.39818964039701,-7.112626199363692,-8.878685100169978,-6.734233970146006,-0.6640249286160693,-5.764148542702491,-4.743459861939414,-7.9859765587848415,-5.352105190111118,-4.595473384787203,-4.111970477411482,-7.3746186893637455,-8.49841797348168,-8.61131141768065,-8.133205316665752,-7.3176626704765635,-7.650743124825339,-4.815098351491878,-9.702424331521357,-0.5221634155147314,-3.5828144248228244,-7.99803998587304,-2.7242182573268003,-3.778266550051048,-9.811670143035286,-6.365410505409357,-8.949154417408124,-1.179130584594441,-4.220725302408543,-3.579826158715733,-5.5118849507205265,-6.151302818484458,-1.2450300820691829,-9.610222556658538,-7.021124354140554,-0.30448692503192154,-7.902252371257948,-2.414157966127426,-3.534840737125655,-3.839608404430246,-2.3289288209671577,-5.831457129921547,-6.117276835334831,-6.7866214258306385,-3.6805859038984545,-9.827263510347041,-8.866515562230555,-8.61706545073427,-9.952806301672972,-3.8538496166998315,-7.323572302675645,-9.691463506746842,-2.584743236751974,-4.597343990760607,-4.66636864868444,-8.365109109311446,-5.394619178520532,-1.4473702616877948,-6.307600533866151,-2.299313219958463,-5.061094509082162,-2.645100402230174,-0.8180718891154126,-2.9596775588051205,-1.9071127845188296,-5.68293884708252,-7.16516137541956,-1.228455431969604,-2.246041176224558,-3.471201208996799,-5.435953664256328,-9.452145395782296,-0.8988324076980936,-5.702775152518331,-0.8848249620972681,-6.752174928757131,-2.1074858944603703,-1.226793326362885,-2.8387146871968483,-2.8368406764796994,-7.233757723206617,-9.566385355180465,-5.422311449483823,-5.002366769664106,-0.5082930604176816,-7.688152989774036,-4.494433697241722,-4.07595108012446,-3.0829591608636076,-2.4721675203962024,-0.41120860516344226,-9.367494358958712,-8.323787098514456,-5.6193601716250114,-5.948156305963321,-8.05877049508759,-6.939645404992625,-0.9892539043855719,-9.646807635431188,-8.20825126644108,-2.7281915295103576,-6.600266185164498,-1.778712454802689,-8.83602721931775,-0.3434188887851608,-0.7171301142749154,-2.431196899201411,-8.684645398283124,-8.030026056425818,-6.504610436359071,-5.308453012604697,-5.029416573028249,-6.936619425615962,-7.459184939465011,-7.5700233535032835,-8.403707995626522,-5.416657202626025,-6.84617181977025,-6.147013948195421,-0.65351680430072,-2.465467968213144,-6.316782926979707,-0.9805169260204827,-0.6884815566702729,-6.263905500435869,-1.4527059714984158,-4.183135409168162,-2.0311835192777106,-5.3959787639232415,-7.9570687190583245,-1.971886693517264,-7.046212731821731,-6.455874020549319,-2.263079568534747,-1.7488971327615221,-7.754909288930487,-3.9804286510047637,-4.838049817804519,-9.407831550327728,-8.498615644646643,-6.610687923967927,-0.36255224037714084,-4.725952808230982,-2.6546884885694233,-9.322673957156987,-4.924489213217136,-1.9039923376969137,-8.069734917212795,-4.025528047249336,-2.742819128962375,-2.204001624017169,-5.191353546079293,-8.610362721313509,-4.671606003729732,-5.373867785969805,-2.9123459817991515,-0.5547437794265342,-3.0950499878926085,-4.833589242356647,-0.5971389110831771,-7.695993131862422,-5.4401335445127526,-0.5519928840897714,-5.120157227898532,-4.052326809886355,-4.141839236560816,-4.694541341170226,-9.903293677132298,-7.773660132671909,-9.878213874353943,-1.3273158274549468,-7.174248843757067,-6.718273412567832,-6.236013482338714,-1.280685066066951,-3.3201319875776125,-4.568491801304228,-7.582156285399111,-8.781034318807393,-0.44699946276518077,-1.9739042702448906,-2.455185986911923,-7.49279394570495,-7.911738857706161,-1.0848888455428973,-5.7607723885783475,-1.5325873874649387,-3.455166395952456,-9.107809034894114,-2.077533375335554,-5.2945058937929845,-0.3710163889166429,-7.73780641932988,-6.559446362068755,-5.367015738335765,-1.272182792597798,-3.5653492541350307,-4.774586695277159,-6.9867691440455415,-4.013645274718936,-5.018058979808366,-7.716722871445398,-3.983042840929434,-3.8779854889930943,-6.733545751209807,-6.300269681177991,-0.7079384807253808,-2.650979169616694,-2.932478483508838,-6.367279724404719,-3.3817930211128,-5.936334499454341,-0.07079670476425548,-5.486235168055533,-1.4436222693065726,-8.94160791453065,-6.717196066919948,-2.311142884432049,-0.30111246884734433,-4.738103436829341,-6.884084656404292,-5.455474936773943,-2.5649245320155845,-7.151355110251347,-2.399559014049457,-2.376466060874476,-3.180247989094418,-8.38162799235465,-3.138061873167859,-2.9498398826823613,-3.526833320875966,-4.4967222104961095,-6.469796282891682,-3.3681094256718125,-3.251000522032046,-8.803091250143943,-2.9947485575472887,-6.653308162420355,-9.332124753907271,-9.62865575526095,-1.7044399427128143,-8.618576274176906,-6.030829950997017,-9.255013936440566,-7.8945269990895355,-6.9472808387828655,-1.9449664866408933,-8.129328611001625,-2.525148546265521,-4.273385371490219,-1.9324399823342109,-2.704820030085513,-6.6910742832088115,-6.723075218936685,-1.1553904859785624,-7.284809691099747,-3.268845582833617,-3.1301442854218364,-1.3601092443501606,-6.969662469479432,-5.596472039512104,-5.1169479416256936,-2.5680366316540515,-4.6716107261433,-5.56673911425796,-0.033861089936706446,-5.239375809372191,-5.096659629055688,-0.8244946082471105,-7.085060074235654,-1.0851149320513787,-2.6425830753347523,-0.41797132311949703,-4.353460579515856,-6.35725023203549,-7.278846132093902,-3.7294893048864908,-1.4677204681378897,-9.872842448671427,-6.411320662385547,-9.69261834232374,-8.983839868069962,-6.66215540936844,-1.1858342743724304,-2.247485158550826,-2.988540383785099,-2.3595432440059816,-3.2921120147113014,-4.967142883356939,-5.854020484138314,-9.331802449824036,-3.7541225007634327,-0.6115594704495431,-8.655594376424439,-5.433430554834116,-2.5329075311175187,-9.459295693443291,-6.4528102090965955,-8.452024474769393,-9.346170594433103,-0.7983929841175197,-1.401253812298826,-1.4021791332577682,-0.39942632975890957,-2.207251915904691,-7.582396300451133,-4.510421128535853,-9.291323737968556,-6.782696634351466,-7.122454446322712,-4.488046182346023,-3.233574310974101,-6.794588630662213,-9.166370592046542,-7.0336474558015745,-5.715094524781399,-9.534433231847261,-8.189786405755648,-4.450916809441965,-7.187432935127429,-0.39802850286660973,-2.612416348179414,-1.4813279918598332,-6.980857769145031,-8.4152951447453,-9.641266243352094,-2.807577668333112,-5.0511662729581985,-6.319254319646658,-1.9260869268801484,-1.527008524526221,-2.4724972547439994,-6.7351716256458865,-7.064249917320939,-9.106856388783548,-1.542234576379955,-5.634549269654072,-4.596319795349175,-8.16567340570497,-7.539531433295217,-9.624213883681387,-3.4928521558843917,-7.668018297185353,-2.408340754255962,-1.4318451466752813,-1.3344571739522149,-6.692730149045733,-7.867754683558397,-2.700311631625323,-9.613227101721332,-6.972705101978402,-3.6218125833884107,-8.893263348771745,-4.909127879708306,-2.5956941612911244,-9.416832580714372,-1.331277388554204,-8.386757243094454,-4.521357384680571,-4.824336905965443,-9.431148863294217,-1.757440613672867,-1.3542234538250786,-8.987732070809617,-2.6403940940065374,-0.7783750797958899,-9.437733733631902,-3.4368341204616426,-8.037567307470495,-1.7166247912268617,-4.9916791597235965,-0.8466394526030196,-6.13543018270412,-2.120394798363636,-6.472516730223932,-4.6217753149080165,-5.651534565987317,-6.598207740492197,-4.005142090708977,-6.554571941910002,-7.720211149038015,-5.149382982644227,-5.850587925613446,-2.613358208446701,-0.9632010557224135,-0.55143372432503,-7.501450489417323,-1.9985152173643739,-8.740126516979155,-4.883144963310572,-6.25417127083205,-7.154778896843553,-8.015304963858368,-6.935919731893867,-4.6280436240062865,-2.838086866586198,-0.26568552582028726,-5.631801726929213,-8.398076494016253,-6.661980480591987,-0.12695608813021897,-3.2897852612543876,-5.647337151258524,-5.265758689626527,-4.493743530118435,-9.814979602001817,-4.242210193041364,-3.960738576133036,-8.47834082551323,-6.462753382796517,-8.825885201534508,-2.1652015770747335,-5.070528002344563,-4.879799854309972,-3.7969302984770414,-2.212179466040669,-1.7140650606575636,-7.394810987243144,-7.724207556392749,-1.5893954792113063,-0.9743118535797213,-8.046454015999515,-2.5889667277210426,-0.053550776615309825,-4.22392209480768,-5.3761749052522205,-8.71725423430801,-0.633132316609839,-9.465942788039584,-1.6503743352208056,-7.467923036928211,-2.701980354340092,-5.817303149535222,-8.76889461332567,-3.989658734170207,-8.141773563955748,-8.54745532621195,-3.084575336487876,-7.708909710088525,-6.710813276553289,-0.8982503363809147,-3.2157604152759878,-7.045554423161137,-6.656734968139448,-6.836445247193222,-2.9359334231671053,-1.3974078183949667,-4.050394286949183,-0.35507224375502133,-8.016556727895313,-3.1976615471703207,-3.1449756979674826,-5.046355534545032,-0.61819513084308,-9.221653302947587,-4.039854310290059,-1.6658760899543856,-6.682813926181219,-8.22656928944908,-4.858165265487855,-7.961452328634251,-0.3627482759795564,-6.702809701956351,-3.454735353529592,-5.760491355677894,-7.142722251951641,-5.632711002473092,-7.993583056220032,-4.1202127538159905,-4.723090570693196,-5.62639568448142,-5.4607257937068425,-5.243063698750001,-2.584570831777886,-4.298178717849237,-2.2020841156423465,-4.635804903023235,-4.4939919539482105,-0.011599091885003965,-7.007737129355396,-7.288316675759936,-5.419817331297652,-6.867774010972029,-2.2958613381475512,-3.501836616047409,-0.06916688680143279,-4.930083916873524,-5.914613883721788,-4.595032842997258,-4.6304048570297995,-4.472923192948204,-3.0184483111441374,-4.162737852439145,-4.4680103538595795,-7.233375560433983,-7.793063521097419,-0.9637375457345643,-2.1892033187711135,-1.9299757827468866,-7.256649182999935,-0.09039418312915659,-0.7959519388506431,-8.849893780807513,-3.96963732309078,-1.5378865456459945,-0.25249966095185483,-6.168711382571028,-5.418628946312722,-2.0537524705731713,-0.009348712465913067,-1.5112631777508367,-4.133473895263764,-7.301775183375268,-6.38223894879514,-9.10604017881097,-6.435035751228058,-6.873824295603743,-9.133855820334011,-2.1805349262731233,-7.296290364821607,-2.3735922185374436,-7.4888235404585,-6.754602501898828,-9.504627661338008,-5.640424436616689,-6.237690189266751,-7.743104030591743,-5.854769394554751,-3.6561900910132716,-0.7040126994613449,-7.968989805757984,-2.982071929957788,-8.727019309594386,-3.3095645174654376,-4.454902671117329,-1.8198401690013677,-6.850535493351333,-0.8731917323763771,-1.8480122109547703,-6.128822420934239,-7.184036235925484,-7.2453289455015675,-3.3097916323393495,-5.318027152782257,-0.4325408406808351,-5.058696094759229,-9.037602652774257,-3.2299853253178035,-4.706696815034068,-3.088358969537912,-3.275745678919184,-4.683478617612229]}

},{}],116:[function(require,module,exports){
module.exports={"sigma":[1.8684765889637744,4.014908529024476,3.893346992135356,2.9625551595546695,0.31917508049600585,1.5822305542613968,2.6819997299352236,0.754665116023685,0.983948885518926,2.816381847995811,2.747201856976554,4.391248784513743,4.724116859847147,0.7168582692014946,1.0619778425569681,3.851048969330896,0.2190144907695779,2.2181741459366466,4.4508133103482646,2.571975335805994,1.4637580999757704,3.0970763989726677,4.361940238249619,4.119268110003819,1.7952956631266903,0.28346325940941,1.361595164590551,0.6113555568222506,3.8923242831646423,4.350959291240919,3.2761876932276324,1.5157481343281387,4.38098053495347,4.42901597566488,3.1973261802287234,2.8093459253916797,0.2815612011309887,2.536085531828837,1.9389941440186442,4.225100897636077,0.9368593733720987,0.8148328922818227,4.499874926813661,1.275534432295753,2.7235795694890563,1.7049228102156722,4.60665955606152,0.6860661462219653,2.0547130631354706,0.5303995684028506,4.43262997882923,2.496091125417971,4.385015351096246,4.027939146084297,2.151306690851773,2.4021361600148525,1.162184436020468,0.8908580853104997,3.344741457699709,2.6719349128051952,3.764491238478931,1.8083345284621155,4.496079155781127,0.4128087401603153,1.8676692692441776,3.8529998306726743,0.16718241589672167,4.311065894231251,3.8766494359581936,0.40312698167942584,4.598231616644119,0.26444217353754684,3.2152224915556293,2.1625680780550227,1.2290211857983047,0.7558024916039208,0.50027949213582,1.5298219115147926,4.768654865638537,3.832244724443635,1.560508671064721,3.028397925003473,3.1108372132882165,1.573405273898305,1.483115647298432,0.49514039182123937,1.183594074252018,0.8276133890044068,1.4970038068063252,2.0068278954141308,0.4189006626740044,0.791236737566664,1.4464402512675845,3.29976382928606,4.64560626916523,1.0162353257501278,2.2679740551211136,2.691606822614858,2.5131052267496976,2.459986246358347,2.106835599843847,1.5748547399903778,4.312267233629353,1.1911480179251333,4.843922525106255,4.23725274278695,1.2299187268619172,0.211873037532202,2.040960388794045,1.3649054410317485,1.9094586704340333,0.6245555228939315,4.502371421532336,4.1440966377487705,3.5855774604642,0.73581112963369,2.873938410248952,4.103137133268024,0.3311588886940209,1.721135124389247,1.2384717555189495,0.03763425072761173,3.8742768214745427,1.0436106881211271,1.449042344078325,1.932756962751665,1.480239028603002,1.8267489362336953,0.7459979983750586,0.1344235461810206,4.202233291861105,0.7487591235062441,2.1832496930755974,0.8202309272516362,3.251407683845123,4.65877481274461,3.754477633452944,0.35873763141552995,4.366399709526405,3.4220963190992837,2.805955822070223,4.68406764412204,0.231122043118287,4.0637239141507635,0.08623825486158032,4.0912033893017234,0.23803432994822238,2.4283452343641154,0.4444954971038928,4.298071783058509,0.291960946112525,4.18208354139821,0.8562994853414285,1.9183062078890867,4.765625259380537,0.5917868884991062,2.2895075740701767,2.9407798183521527,4.635675269174855,1.9990477233589632,0.4983908113375002,2.244380205308527,0.4361206630058878,3.6987066640530966,1.6069130904918671,0.9871266823298053,0.7306934984223667,3.1406817737464454,0.7933001546900609,2.400708619018468,4.4259164784449805,1.067463720511087,2.616486387465078,0.439718811463925,2.476219859507337,3.5261733114599014,0.3590229790841859,1.8445959115655786,4.4675082375536235,2.757480267326361,2.958082947482159,4.866559718519,3.272007086322759,0.2677564035883495,4.164019558095438,3.5111821698449166,2.737409189845603,3.027048878576779,1.9217109689187106,2.3205412611129104,4.029207920476661,4.105232920656,1.380682695290193,1.1794284416956013,2.8473436496667173,4.809785565508159,3.0409832988492025,0.9896747988658661,0.5133050285958085,0.34624141585518964,2.5463588477968035,2.0275143995614178,1.197454485045556,0.3693936659205366,0.6981835293261596,0.47190270993460515,1.5944719763504223,2.8869046946067254,4.215448565647799,3.393733505489606,0.6887569828092233,0.6276214637939326,2.687052534993297,3.6261151647595637,0.4532178059975389,3.549210997982467,1.3086366745311917,3.53367838812805,1.8760449029404913,0.9714783988911235,1.9740149527285222,0.31547375859844573,2.505632555881382,4.083932073520435,3.8323467078673525,4.938529437562384,0.9102040862359617,4.679018966346927,4.266006465929698,0.7915586734717472,4.2146115837282245,0.200697144744173,3.794007576925318,1.179336693126739,0.6184228166730421,2.9559586679785808,3.1001202658452254,3.2859887152132217,3.8412354595377165,4.552151953455121,1.8785384503203595,1.227940605929837,4.912097436911211,2.520264908292642,4.570326988565059,1.9490469914381936,3.8094956885203466,1.4063550877939024,4.999009377163478,1.2380386625772966,0.7463826038752341,4.802451273717395,3.297274447663414,4.051426362751736,0.5499362153961973,4.205470938929934,2.283577687926539,4.577682893044766,0.9239953893236308,0.15898996297379564,2.6895809439710225,0.11366536030814167,2.7111100577819824,2.205266158455208,1.4156924758446665,2.8690425423749155,3.36041534117151,3.1218997473556174,4.903681711997399,1.610151365783895,1.2068864007576718,2.329187822645924,2.0263600006162106,0.6627303143028773,2.3010811862694758,4.290769545953127,0.6694722507583883,0.9082073487680886,3.653974025655249,4.733458147102767,3.8585929608789127,1.8679301120623037,2.250114793599197,3.381135264848342,0.5342873920731606,1.57724620083469,0.9883892899236579,0.9126580315736321,3.257933577611621,3.3963715092405278,3.6963838007366236,0.2806964066644213,3.1089398806100155,4.8652675118888595,1.4557201480062243,2.087049394292946,0.09430306882048045,1.9163309451874144,2.6280918371884834,4.597453165788538,1.3319858318015565,1.0882747285149186,1.1720509255529554,2.5508496297428964,3.7238772786654426,3.073198171801411,3.9882606264272247,2.6462950019168496,0.1703308891406563,3.7508555721692782,2.7955550788513452,4.171614865585501,1.5662966416805002,2.491443419731576,4.034813055895582,3.5927082374405463,1.0156483376186365,1.346255943681136,0.3313386781005101,4.638934234743816,1.8257665687406421,2.1718218312560547,2.4435012918896426,3.852660708950899,2.2582598185699823,3.921394750030227,4.277660889687791,2.3763469700894513,3.3166888028146726,1.1223583706107787,2.958837558060594,0.9227118513031529,2.9500292261878904,0.23769602352400443,4.46153854271547,4.3962913930188465,2.657478857424047,3.2589821025940644,0.777910913898231,3.450912449837076,1.2572546247786232,1.9303053783738156,4.778560535956947,0.7922898585818561,3.321824930194265,0.6357108374986853,2.67357351288122,0.9030207146016578,2.104365357118849,1.2716400090797897,0.7821703644359146,3.1332833276299366,0.21386137891556745,1.4765605479868005,4.720048472609562,0.6216673995993183,4.361256969366874,4.627569684325431,1.9132719357451744,1.9002612809463537,0.7421625452465985,4.5359914619159225,1.7669581312008675,4.895736981924468,0.31020416578300347,0.45511068016040324,4.096092301746992,3.2810686296930647,1.7364727862416418,4.868390436823823,4.516759150389955,2.318244986663033,1.6796956524476825,2.7484648374364165,1.1423187328126005,0.5919859409188055,2.5090724086810035,4.729493603964649,1.833778808880252,3.50597547880756,1.1165944412377582,4.9360846719187155,1.4451353638249098,3.496393420850681,2.576243042014882,0.04062724400503148,2.1929774425057214,0.7313720536867363,1.3535556666206683,0.5488788923466947,1.6701551065208076,4.381009522836374,0.4212582298015133,2.987591644913814,0.6073818896927075,1.0700886518379382,4.701439162133695,4.731023880475618,1.2421136389603415,2.87826684597699,0.33654264488967245,4.766546234676045,2.9914290815988585,3.8894589939346744,2.698143294886494,2.9988893487635773,1.6977176998675036,2.0186750553274067,2.3097243943825663,4.704514433853392,1.9705152796774195,4.8347529927759245,4.308876545973662,3.570105128254416,2.2531393546868452,1.143822598809885,1.422950185380636,2.2572668921688264,3.082867397340585,1.5256368301825907,1.2558314551971916,4.220361315370523,1.0868235096389067,2.633983350759853,1.6084329133328235,2.241806275422036,3.4532940092628204,1.9995783607353879,2.838872466089448,2.6414839151490255,4.470351590503375,3.837309824772267,4.007559957892418,3.6779932590299316,2.8879927332292654,1.1463008245376116,3.3132945293911975,3.5757405191079297,1.8294677662337833,4.479402853822096,1.2782123721325356,2.068275183249141,0.04334255716564428,0.5599987519082228,3.578337575138535,4.811382881290241,4.815247550899073,4.461942709284909,4.010426084431148,0.31746753952544116,1.1512363375196222,2.73013977348186,0.44809454253165737,1.7706969921034055,3.6949069902899057,2.7768061128478596,4.404778898129141,1.2188289974597777,4.436077121023886,3.1109347825739864,2.765902068901319,2.8506007963002187,4.6073727519299545,0.648916189242914,0.10591715227728393,2.924525836077186,0.34025522775639194,2.506505229693646,2.2485546500174483,2.5997078301594434,4.7612361774219085,4.024915589709051,2.6896087237844037,4.306778054005344,1.1588331583854705,0.08482905471226987,2.1575690280972095,1.9410316206040645,3.50744284959689,3.8196891289546455,1.199974767024088,1.855152465846337,3.227011390309922,3.604917079192128,2.3839847003225123,4.330928810090352,2.2067985133862345,1.9490767814360188,3.3868331517006176,2.222774681470133,4.587368863154715,0.47386903247519374,4.247624147877391,2.8092904665368135,4.734759350766601,2.4491737910685316,4.121353098347134,0.6909111416271063,4.276073903433392,0.8891067914348494,0.5418959807078738,3.3600685877376426,3.510779710977082,1.5088438467890875,2.678038307454036,4.313810443693226,2.3051227593273973,1.6986384381707442,0.30942384419074376,2.7223061855442032,4.168456117016795,1.2354662523750304,4.8622921029940045,1.968545081659856,3.8668544058600283,3.443237735861915,0.20988775012559024,4.711038853531521,2.6315301326083818,0.9810615597741923,1.233270758510705,0.1937688898605694,4.128579012127576,2.333076629388878,3.689644101557489,2.5108001232403767,0.764014841711218,2.316968463111685,1.5366568781288026,4.852264565108241,2.9894598115608098,0.31177147942673233,0.9199415494549401,4.092938995584731,0.9928294170719887,1.2839287768707108,3.766666772591315,0.5144022200363607,2.6888391841082946,2.319747350543282,3.2539228404865628,3.164217986727962,2.196147154480955,4.204001815902981,4.725123933574845,2.1142763604276285,1.4463587537600364,1.5479724705020736,0.630950143189053,1.4286279113738065,1.2464936325732567,3.66582653007266,3.008536756103105,0.9978120861866024,1.2020590198115755,1.9994983753807738,4.511023324440281,1.5799107302368076,2.9726849456053617,2.1363681720476855,0.41135420191012906,1.9897979869975724,1.8704115270754074,2.763023490014447,1.38157271325971,3.703745774870405,1.0716552302749682,2.5044665565614963,3.8248981404231595,0.7791856041236422,0.8132548095589731,1.4559950732502869,0.9678874439497065,2.7495391394367665,4.730455443691607,3.5784113000596984,3.174145228758446,3.3302481001848516,4.749450576364733,1.6617286100427942,1.2186259862424897,3.10795350006696,3.0080838259583897,2.6929509000896,3.733650115515693,1.9682163756781623,2.1369628571151122,0.9541067981006113,0.5450757011543439,0.3937493920396107,2.553780255057818,0.9562098537412733,0.20278217521450315,0.9677822079017295,3.984711899218448,0.56875765118653,4.444498468416114,4.194620518633519,2.60463463224606,1.3414302282950774,1.1439331503731343,1.2194442229767843,4.158363186555678,1.3440338110096939,0.3507040817100626,4.829629717805428,0.4234787955657182,2.765059563602578,0.021095172491801817,3.960115514527777,2.807262119771682,0.8028384584297144,4.835658985876289,0.5123388288964181,0.874267060960835,2.16176396750273,0.5982025365493371,2.278386098192046,1.269670454103634,0.07400136610586583,3.891846513378531,1.4503508525181263,1.830706841559362,1.3153086889378285,0.8848160290822782,2.6240848244757267,1.9236913862143723,3.9149309760515063,1.93880319198669,4.984456768946032,1.3728723399854348,0.4546956732144225,4.365552369057779,1.5356531297711729,3.6585308896790094,4.502738033319194,3.8164799266454006,3.09083257276898,2.3016528061277475,0.043487860474411555,1.3985113288769468,3.564738416012011,3.250226921831525,4.361626665159966,2.4447593940719115,4.571713969273825,2.610359333713056,0.09859774979729008,2.560027755714096,0.6802872078900668,0.03428406234443404,1.3802111895171876,1.006821438412332,4.587729711958684,3.4079668973157085,4.425074858218815,1.434430774014377,0.1231991854618697,0.27348130941529214,2.599487372562166,4.246130416848526,0.3049155320046526,2.8087265214076753,1.5422140952493701,1.547734326272322,4.248940967474342,4.739335037263427,2.57596661962984,1.8490282353712073,2.740030425050745,3.7299146839857134,2.2880777954504925,2.4253123042950495,4.998139839685588,2.588446657689162,0.42420238688505973,4.128010855028167,0.9602288370294731,1.9271481966835657,4.533618802161526,2.540578821222963,3.8279164586572234,2.417607311524467,0.7198386362443376,2.7645438345448725,4.113579125483709,3.175848662187859,1.134021928531671,3.874622392970469,2.622493594676861,3.6331627664031965,1.7581605530835187,2.268352298537426,4.680786810901671,0.19502391722085788,0.07845446451301585,4.122472721885976,4.4157742994711855,4.308362134900942,1.6331625733933586,0.6993278414756332,3.7553447083551705,3.652743000009091,1.3390163481890316,1.334404127480554,2.4548174722516167,4.357700950233517,4.283595445930185,0.5657067597653231,3.931767918315754,3.8030526547911814,1.9328757451168554,1.5636443061121064,4.0495185058529595,0.43820111973827736,4.229292708784183,0.8075614508068463,4.830253047350677,3.7311957441377066,3.654178160359245,0.22485017797820306,2.3672450302561296,4.361651291097765,2.4662415914817073,1.6689858367694177,0.31060471664225653,3.289483014264498,3.116739886351394,1.6777522202049722,3.8806226156173063,2.7971043654670016,2.2901359297656776,0.12436895266914272,2.304711500157942,3.5935831509606464,3.9260748306978,1.0876532082293056,1.2297212217136422,3.697478345872951,4.500221863015277,1.2508535673022092,0.860362184986595,1.317463020153593,1.1589968616923174,3.28290129635893,2.321037713586062,2.4831246961864304,3.7272693632499854,2.1396752369935736,3.3166456712425028,3.3316561450009416,2.6347094463059104,1.14906528209209,4.13478507099204,0.4130266824066431,2.3859346012543945,3.646984880414952,3.648549213675988,1.4301499213154834,2.256370346114407,0.5295131853559154,4.229244072717435,4.612198213051189,3.595628857021137,3.50425889014112,0.0971156406076279,4.270857019828782,4.717008251721392,2.6495104496761512,1.6113965209784475,4.410081580329694,1.9095131594659687,2.60929435259476,0.5252013359492358,2.3601293361976863,4.941374740423685,1.311065704446116,4.362518918023268,1.3355659852178747,3.7557120419166057,0.2549095757176578,4.114990734741859,2.744730275763778,4.9195843413725555,0.09310293736619846,1.0808815411603356,0.5687742239582994,4.0021253325870285,2.93620687860784,1.3822981130711187,1.7720430139659116,1.1809716251928837,0.18608687836196292,1.2887593921973572,4.239701595437632,2.086961869929671,3.860614161228204,0.5601348094087777,0.9072605214691187,4.9980463733840015,1.574192527070627,3.4742886461861557,2.5121439809956203,1.7392013698373887,0.7615206223390236,0.5495773348408017,1.3784022157919518,2.1904455718716864,3.5888847471117833,0.09657651270474688,4.878888100295656,4.714668159417732,2.4784796828880795,2.6972723418570856,4.541470221847139,2.1664406282753843,1.3011037922871482,0.3664098281782091,0.9605996881876455,3.6491675583889727,1.1152199652466954,4.098882924069422,0.1899969517443345,1.762423452118782,2.8147548382871257,2.9218655673634695,3.92670393518212,1.537502822183805,3.098561159257618,4.544590459642164,2.7772609086061397,4.152947856448602,0.6709949473059551,3.6101584417732644,1.152041018584845,0.20160738368260045,1.8710496154240108,2.7061845376804063,1.4530957481633733,2.1421236704770017,4.100862060902282,1.2390809745119535,0.38501973882023144,2.0597440114964316,2.323005873014623,0.5755483288175789,4.980936616754587,2.462943977595873,2.2296769184254126,1.0323366821150526,3.6776034403480917,2.4133217302156575,0.08681377050921979,3.5609084321918694,3.0783249099143415,0.08563924173033088,3.256269332503275,1.26798331644695,1.8043631007553618,1.1837110070482249,2.114210040493462,4.666085455095366,0.4724587650409884,2.091740082150232,3.8866438679610136,1.084700408424708,1.177230230330587,2.820533890436845,0.08816716444999706,4.849924026678148,0.9315489713794123,1.7158346850482398,3.0502330036042857,0.8967000218555898,1.6762303324965833,4.754590472200707,1.12783387346865,4.266531364192446,1.4725062234574426,4.3932850080370205,2.0607126684406496,0.6298673665010512,4.805474110633226,2.612749112876994,4.012040122154134,4.06072282858389,3.2509769654703122,1.0376873629216676,1.3479217224129247,4.087960545424718,3.3237669211423784,3.66587329446205,3.0027212378988177,3.694737690840811,1.724815224459535,1.0172684572653223,0.8456108898553572,3.5204126992882134,3.1162551367193467,4.030776049558897,1.160225537338574,0.7053639827946179,0.6293764493609555,3.7810763812228574,1.2059389978476798,0.06740593009731177,3.480278021949168,3.100079277342741,3.635370527133915,0.3123201921579344,1.7980421745504604,3.908441185708825,3.9819167434839766,1.276295222671936,4.480612446159831,0.26240609368096246,1.1134578335348633,4.523098731698637,2.2218498419108013,4.071211848062549,2.01918337111741,0.9394871643765357,0.1605192755153595,2.023400757444932,4.78629258502796,0.719835532516041,4.5652888978898085,1.1507926924944878,3.594858025748912,4.137999871641192,2.356982862487036,3.077001875509604,2.406372124582946,4.542381697127756,0.8785181475136916,1.859184061873096,3.856260486998655,2.0500863926782342,4.796686727013125,1.8395372229020757,1.0373402051026248,2.344643820054632,3.880497157340238,0.5481151463715295,3.200013899659988,1.6626906182074874,0.31576429972766773,3.2156284017229675,0.9301315404894583,1.5135511641204369,1.216501937482527,0.3182154105350987,4.493716332403327,4.169368802438943,0.9429944521873013,3.303745311437969,3.82432165927733,2.114071921301223,1.8694730359686962,4.661747063412115,2.241552540996241,3.525589996959945,1.3078694153038872,0.5270037989506116,4.652969577929219,1.6640176329852652,4.528945870220177,2.583367032751147,0.3711567950700856,1.706618510462764,1.1314393693273417,1.9731184639307642,2.5934771072605756,2.701508417699947,4.8253106063321125,1.1631709648731159,2.6921940846361925,3.0992695819289673,0.7356468389955573,0.8507019140444794,0.4766907143947985,2.5407555477607033,2.6022330063465593,4.05978596169107,4.183768670046,3.0446106799527373,4.866675716245781,1.191961469724384,2.414228478080389,3.8839231205932934,3.8449802467883987,4.514846525818001,4.37945239347433,3.715754548611081,0.6153046056911782,0.693260035310852,3.9594314732407176,0.8810395353395306,2.4594009206928313,3.3465526711007354],"expected":[1.4057763508761063e-27,2.178879151425347e-9,3.519061471542025e-11,1.5664952413496747e-15,4.944855577445902e-225,1.1708640469528291e-37,7.109665585465081e-8,5.301277229280368e-134,1.146002810182913e-73,7.1829007267207154e-12,1.831255917374155e-15,0.0005848978322932036,0.0002026310465905094,1.3142353152686766e-170,1.3228048993562213e-93,4.968325571467458e-12,0.0,2.1570382407106066e-13,0.0005580461527932752,4.019081168335834e-24,1.201707481941792e-37,3.9325428144783706e-12,0.0037960485222728506,2.3297840465660167e-7,1.081979543339214e-39,0.0,2.3774993481816905e-31,1.0637074960922297e-88,2.002412658651238e-6,7.825611579907775e-9,0.0003138355336495984,1.0917296887846379e-41,5.952760959492718e-7,0.0008791649679067659,4.6225134918736194e-11,9.50464541919302e-18,0.0,1.0030845194754534e-17,3.5413318930490086e-49,3.3638327425394014e-5,1.9371210449400428e-104,6.396573460873972e-89,7.206466289337158e-5,2.305008232891721e-21,8.943348000404626e-14,1.9681186087929555e-27,7.9457542969419e-9,2.7974789661084976e-191,4.879298938237826e-23,3.343914650254503e-152,4.885057871017002e-6,1.115113838686743e-10,2.5057439454008198e-5,1.5591215094936922e-10,3.710312353536713e-24,1.9909403118926643e-24,2.128493551419008e-51,5.220634325924953e-103,1.1900340542210916e-5,4.911838313478706e-12,6.778493106029982e-9,6.372086589110441e-21,0.00010084887305998732,9.80808823755599e-294,1.3620882256337472e-10,1.1335648687333764e-6,0.0,7.365930764853324e-7,9.087306794955413e-9,0.0,0.007623845819454753,0.0,4.041000677079689e-11,5.735539646050163e-32,1.8341694867203099e-34,3.693789259881219e-257,0.0,1.3588280023286922e-31,4.417457835254527e-5,6.122590520612022e-8,1.1272508697059197e-71,1.565402817434185e-12,4.242211959491366e-7,3.444456134020357e-30,1.96556105800184e-60,7.5e-322,7.376044222785014e-80,1.1617771022489923e-125,3.2975897425578654e-83,8.166184493267374e-26,6.33363750814e-313,1.3025588669714432e-144,5.4851459329523e-28,6.710480694142597e-8,3.1370954532727306e-8,9.36938884507775e-149,6.705995741387361e-18,2.1231222699251985e-14,7.059012745882978e-31,5.072651847095082e-15,4.28182822941222e-17,5.6592161565785125e-67,1.5190302835725277e-5,3.2825499519153807e-63,5.906775992002904e-5,2.848461503920897e-9,1.8746471941930924e-64,0.0,2.9390297240516503e-34,1.0781266231297374e-95,1.369248698255244e-45,1.1202670773833481e-188,1.5784860324281542e-5,5.219945840012154e-11,5.592657313912658e-14,0.0,9.211133963505496e-11,1.0943085247086808e-7,0.0,1.4734846953760512e-18,2.0396018605993288e-46,0.0,1.5205971658934745e-7,5.808788370999475e-67,1.5903904094193175e-59,1.0616171697135596e-28,1.7571619383728742e-37,2.923910438111466e-17,2.541320718372759e-69,0.0,2.941368999230009e-8,1.450523741963402e-118,7.058945099413766e-20,3.5343376431511475e-247,2.561127841592911e-10,0.0025024457802778842,1.7947025715108966e-9,0.0,0.0005315788412623449,1.053036523043957e-8,3.1140859636735166e-13,0.0008423753848852207,0.0,1.5376468769792466e-6,0.0,0.00010053847674477458,0.0,2.0651219098865995e-19,4.852161154675235e-259,3.3569069196771476e-6,0.0,6.525104118068245e-9,6.955863521694007e-78,1.7101540464806508e-35,4.937507109121637e-7,2.6788295688631303e-183,1.2367446413308131e-16,3.3196191226706764e-16,5.289695128356096e-7,6.81720907768445e-18,0.0,1.9967559533565624e-17,0.0,1.6306403010252936e-12,3.0320097800367147e-43,5.190046595756773e-122,0.0,1.2488405766468068e-13,6.454910433366656e-218,2.4897510707269124e-10,1.8273899729871561e-7,8.533321478198115e-97,1.9742285329581445e-13,0.0,2.6449866696427763e-17,5.602077433016995e-12,0.0,9.208203043021874e-30,1.714190547186351e-5,2.524476190240817e-19,1.3442349062146254e-14,4.8694170867394064e-5,2.153653781588115e-18,0.0,8.403267725820149e-9,5.676038625220803e-9,2.450774457152083e-14,2.6969005492719802e-11,2.9768197682321274e-15,4.9511036640667987e-14,3.49583971284523e-6,5.1452200100510226e-5,3.4921315153835106e-69,1.993699740395544e-51,1.8618431655931415e-7,2.6149311742954537e-5,1.2499244555830113e-6,8.873135323118065e-93,0.0,0.0,5.408171324386303e-7,1.0479313391235906e-24,1.7375461087810974e-63,0.0,2.4727365606556416e-55,0.0,5.153273404333961e-39,2.826816951586139e-12,0.0018482218874223408,1.1396083626977638e-5,1.475716726675375e-140,1.3978768068760623e-190,2.7307622070586227e-15,0.00037854090983694907,0.0,3.3007056647560267e-9,6.708535639304565e-67,2.087902348468401e-5,4.463580088374428e-31,7.77552498767415e-92,5.996510777181905e-35,0.0,8.901897578048e-12,5.292357065278391e-6,6.310826918900116e-9,8.761829620634446e-5,7.332751855404002e-105,6.2456137509498256e-6,3.960606114279305e-11,3.2215762733840547e-113,2.6419926854934196e-9,0.0,4.062909825941138e-8,7.400013467624476e-40,2.6321356001999356e-176,8.735088286327739e-10,1.4543105468767546e-12,3.0034247390338466e-12,5.20277982571044e-6,8.267239390763614e-8,2.4109916214809497e-11,1.7632467290682445e-55,6.473979852795443e-6,6.686210736785284e-18,1.5102036398756859e-6,8.10805454199175e-22,8.277245900562532e-7,3.908478061123696e-18,0.0003594995963597861,2.5018363221348384e-34,1.7705070923318663e-93,0.000328978945988786,4.9403321295778226e-14,8.353931562798467e-7,6.712034375306289e-106,3.8217188889247454e-5,8.114343172082054e-19,0.001742602651164212,8.030547940672057e-42,0.0,2.8876954675074883e-15,0.0,7.959567036771979e-15,1.0690132032304063e-11,6.451604149555878e-77,2.149868750255778e-8,1.3550597776391228e-6,1.2287684161353205e-13,0.00010935020806479672,3.079018318445991e-49,1.421971228023156e-66,5.88964651849243e-22,1.121814755074226e-16,3.140000141506898e-244,1.3891048003970937e-21,1.8964489159573107e-5,1.4083334295197926e-272,1.3606407182144488e-127,3.1183671029546944e-10,2.3737844476343042e-7,5.016043242013626e-5,2.5486878734019923e-31,9.54587547533159e-23,4.378918489826395e-7,1.15e-321,5.406877464294287e-22,1.8526522792570344e-158,6.178029815254639e-105,4.7518874702649865e-5,3.392465660077439e-13,2.2281988300650588e-9,0.0,1.1116296988378064e-14,0.0002705887286292882,1.769103676274737e-42,5.06553260373281e-25,0.0,9.134669373563191e-19,1.133989373687221e-12,0.0024572669890801663,4.1903991706080184e-61,1.0176173664453684e-117,5.1300822421651305e-87,7.698740003651457e-11,4.2894778296272694e-7,5.6960700153256663e-11,2.959028983725059e-5,4.880178331605209e-12,0.0,2.81568819662535e-8,1.1949200425144337e-9,4.318878639952342e-5,7.612008251076277e-23,3.0483053726474123e-9,1.6186685469801265e-5,6.01746992551284e-10,2.4822198412417103e-68,3.375385397713348e-16,0.0,1.0670644430599551e-6,2.926747403165783e-15,6.448168442979777e-15,8.416523579642353e-20,0.00031594232153713713,5.60276406397991e-11,3.2290886442356953e-11,0.0002097939906894036,1.8799573428895616e-16,8.442258718497856e-10,8.765860447939317e-115,4.441009241901443e-13,3.213544794108693e-89,8.129738254292955e-15,0.0,1.1145062726002881e-7,5.84533608368845e-7,2.238093420603278e-16,5.005461754021722e-6,5.535817894920257e-204,4.523106730439828e-7,2.7674398507520977e-76,1.4043495652441947e-18,2.0677314724867564e-7,3.925018956417696e-69,1.9001507766109024e-11,2.0023438236950955e-155,4.902507700712464e-15,1.6499705442652113e-168,1.0684430786343072e-18,7.230033151941142e-54,1.8542436351256656e-246,3.1888928380210435e-11,0.0,1.7856938379801246e-47,1.6331453078723421e-7,9.981966204395686e-179,1.799621655818824e-5,2.0180664016844998e-5,3.4654868129354335e-14,2.111884029910011e-18,4.131173570247871e-191,8.625708487904301e-8,7.132333880945783e-25,1.1572307314916413e-5,0.0,0.0,1.9135529952978435e-6,1.2243238996418904e-5,5.67765491729874e-44,2.07521210807972e-5,6.654215061476884e-8,1.18909532621717e-26,4.589996701456094e-32,2.2796938854502595e-9,8.89795323752788e-97,8.221203809085957e-261,1.3409892070810169e-16,0.0009596380735110558,1.962800719175841e-16,1.6199409142103576e-15,2.473194906859701e-127,8.721631662178245e-5,5.452375222170344e-39,0.00018194993854733874,5.631256907267347e-13,0.0,6.718485921254954e-10,6.87817356685501e-147,5.427525805566449e-94,2.252154941868994e-177,1.6163857753998885e-38,5.210263643714907e-8,0.0,1.327496325379894e-10,0.0,5.219081465376271e-90,3.596029162905897e-7,3.4570926787839275e-6,4.5596340612709294e-86,9.304954158458531e-9,0.0,0.003531887880152645,4.128940140806803e-18,1.7293469543067821e-9,2.7583965882176486e-22,1.0015639396646629e-13,1.1823755639868797e-37,7.251319020356833e-23,2.2074916552399097e-36,1.427621619434945e-6,1.3727060375381857e-26,1.225859535910966e-5,4.893987533232315e-7,9.240359664030664e-11,7.208180061089373e-8,1.7870487506386046e-112,3.878026044970333e-62,2.3211416669909248e-8,4.155935513463007e-13,8.929158202467744e-56,2.548176245764339e-66,1.2093255931445847e-5,8.106305026844446e-83,2.5185899377156873e-17,7.163013189156165e-41,5.993745330402714e-12,0.0014723830595911476,1.9410426403660205e-38,4.565873800619533e-13,1.7684144227768606e-6,5.896500154977319e-6,3.3005225743126456e-5,2.6114156920818476e-5,1.8129329774147493e-9,3.568846050971996e-18,2.4091766525086142e-57,7.143712178782039e-10,2.182098937710151e-9,2.1215712829939563e-45,7.423434682423465e-5,1.780819047845232e-91,2.925299110565731e-22,0.0,0.0,1.5304099547759992e-8,7.256105409895631e-8,5.97131934444288e-7,1.770451285973614e-9,1.677499700720837e-7,0.0,2.4962865785017467e-71,9.85991603079822e-12,1.500049273719804e-277,1.985639679323581e-35,6.79435428812777e-8,1.3724667851740134e-19,4.1216071374074294e-5,3.9955495763454967e-39,1.940272289574764e-5,1.2909456670088715e-5,1.8467317679240813e-24,6.149746079096486e-12,1.1474218714329323e-10,7.58616760499721e-193,0.0,1.587986025939551e-17,0.0,4.89687963507206e-18,5.730190459470773e-17,2.6862832744747646e-12,1.958582408025157e-5,0.0002772569234856614,5.289303073410345e-24,0.0010473506597548892,3.8246712167507094e-44,0.0,2.8567466112681713e-18,4.935607518461979e-34,3.4672508043396672e-12,5.296715078318279e-11,1.4521874190507975e-94,1.1921636038574149e-24,2.6986139950051165e-15,4.480044824992433e-10,3.207325243052473e-19,3.310139844848047e-6,8.709253794848566e-39,4.941887268618853e-25,1.4307227377222374e-6,1.1458567013633935e-33,9.527551750224396e-5,5.35709223037573e-138,4.2558963927426825e-8,4.011970324102806e-12,4.9012509147380816e-5,4.431271179421225e-18,3.6242413227734797e-12,3.0e-323,1.2758063306016663e-7,3.419208923864873e-88,7.273968660195584e-270,5.692896160606209e-6,8.531721965897979e-17,3.9455232643139653e-38,2.7092298635797528e-18,2.5109359074416377e-7,2.9787475302476877e-21,1.16305877145284e-31,0.0,8.075451148087124e-12,7.555118738253366e-9,6.48823765455906e-66,2.1061197984517157e-9,6.3469661237632725e-21,1.2788699239495298e-9,1.087674904016003e-11,0.0,8.060785997064276e-6,2.503275295087653e-5,2.0510397685654742e-92,2.7182109039293616e-52,0.0,1.1808900686360494e-5,2.616836633894763e-14,8.767827842371801e-11,1.413447714975548e-17,7.874639594860269e-259,8.35547838228536e-32,4.956530513373028e-43,3.718137440563757e-7,3.778812501356828e-13,0.0,1.7286117614781837e-46,5.930992374084461e-9,2.9278883823049333e-38,3.604735050259339e-38,1.0423774347335082e-9,1.5974046866518231e-142,1.7804837228149344e-15,4.4242576557945067e-16,9.103621625175345e-8,5.372181417059628e-5,3.650697208089106e-29,0.00010690984619575977,4.6119986528289394e-8,3.230323717342001e-16,1.601029828384415e-28,1.2950310640038687e-81,5.312833539559209e-102,9.042348960327451e-36,3.3871284828626244e-85,0.000133057207831433,5.926709394853942e-14,1.7287850641087298e-123,3.709594673366171e-36,2.7918575589364568e-34,3.033718993552784e-5,1.3537567359184649e-61,2.2552033153749336e-15,5.960338012709755e-26,0.0,3.703377264236985e-15,9.653360972817582e-48,2.996129227469509e-20,3.5659593866036267e-56,1.2481468692471179e-6,5.949263951790917e-84,9.21956486367757e-16,4.64605965317382e-8,1.6690631758708285e-158,1.2757736975024916e-244,2.2633608064735745e-40,1.4928781519243257e-164,5.844305060916993e-18,0.00030956165567126373,1.2111237127128873e-6,1.0692598123507018e-9,1.0556770667313254e-12,4.184493488597035e-5,2.7462127871916156e-35,7.087875405268454e-71,9.126770416878858e-13,4.9405776701378466e-11,3.8211433352982777e-10,0.0001284284408862617,4.736049261143761e-15,3.471445526158493e-7,8.844150418296745e-66,1.48454875333015e-106,0.0,4.843688597407406e-15,2.4651616761020615e-144,0.0,9.829931697587647e-55,2.8647181064534455e-7,6.970249701855884e-231,0.00017264421992662905,1.7289528600418053e-9,1.1722857794344811e-9,6.129220258370098e-72,3.66802020269888e-75,1.685753744796922e-69,1.4652382118701654e-6,9.96831912164287e-39,1.0799842181757683e-194,1.0787483056454502e-8,0.0,3.4465379409346744e-5,0.0,1.3500829135427022e-9,1.1285485399555377e-15,1.2751570242270504e-198,0.0006034853989210084,0.0,4.839199892506952e-100,1.5240628275956278e-23,4.908590840009024e-71,2.7669754783338825e-18,1.0996158037423744e-78,0.0,1.7714532690000065e-9,2.0340822336791196e-43,1.1686233648286546e-39,1.158118539749496e-34,1.458600871910564e-113,1.7345115349207107e-28,1.761247202977439e-17,0.00012089961637536378,1.4391365127709652e-26,3.755488885709661e-6,3.057138061714697e-49,0.0,5.94208020934648e-5,3.094294713373813e-48,1.6413231054915787e-7,2.3470878600922753e-5,4.9036199058030975e-11,7.438372810938136e-15,1.8433384289473765e-20,0.0,1.1008003636146648e-27,2.441860865346155e-6,1.4468315157733477e-8,3.512829196509339e-8,1.9854513319202995e-14,3.4183177099666635e-7,6.027355187351271e-15,0.0,4.8340123862874854e-14,6.001403446269181e-185,0.0,2.830281763463911e-33,1.473716298942615e-88,7.561060562484772e-5,1.6083552005886753e-8,0.0017419458750266318,7.4330273059592e-63,0.0,0.0,7.489098505459656e-17,0.0007475897158724977,0.0,1.197366009171419e-13,6.169719283589145e-60,5.882705177697646e-34,1.6382406226063956e-6,7.555075699977585e-5,3.47311410837492e-22,2.6929381289452467e-20,9.128581036705038e-18,4.4538247231471827e-7,2.0413385344574475e-15,4.607169320251174e-17,0.0001617547091465424,4.818532690123211e-7,7.084794877589426e-291,1.5198590846738836e-8,1.1065430521613178e-114,7.782174873855535e-24,0.00016687416955183035,2.907712359249226e-20,3.716610247303128e-5,4.351102400352428e-12,9.703391650843234e-131,4.098342161788523e-17,8.95303054774067e-8,1.8411080985612993e-9,5.808951155238613e-133,3.777628616169302e-12,1.0596453466951694e-8,1.0592552436044216e-10,8.156397905302183e-31,4.984231438389621e-32,8.68222558683269e-10,0.0,0.0,6.394533959647746e-8,0.0027022620332358355,3.2167077446743834e-5,5.217223102882715e-31,4.329972683801446e-280,1.264116806384506e-11,4.4044257073639795e-7,2.8899924125097808e-55,5.738703347623732e-58,4.946945322170098e-28,5.7372833873392105e-6,0.0007225554635225625,1.6010535679666887e-247,2.325857416448232e-9,0.0020770854643188674,7.890246352511134e-44,3.407174390014928e-37,4.6485946591025194e-9,2.2672963509889915e-257,7.677369541572306e-9,1.536913476430598e-141,1.0826745889023595e-5,1.5544943527285508e-12,0.0006407452771018645,0.0,1.1166493773224537e-15,0.0001350354280559524,7.22893856010263e-9,2.4009888183683627e-19,0.0,2.3435771392054915e-14,9.952151380619135e-14,2.112784251970412e-45,1.5615757493908777e-8,3.6628671376578873e-26,9.33828914687339e-19,0.0,1.9204358817137018e-15,4.610846366013436e-9,7.637711113501506e-8,6.092524635017122e-119,1.5888442071692042e-47,2.507302092497392e-9,7.145173989217326e-6,5.788620722956972e-80,8.84915824093866e-168,5.10250087497138e-39,1.7161020895011284e-54,1.4381836658435967e-6,4.648889191624764e-11,4.147287122046178e-10,7.973029226953175e-7,9.101390294950516e-26,4.066227014899056e-7,3.5927554579968315e-8,5.73415437834874e-10,2.1821813803282764e-106,1.3080494098850918e-6,0.0,9.139571075461357e-20,2.2249938058054166e-11,6.981063497839556e-7,5.992871230677534e-42,1.8616521298091331e-22,0.0,6.271786780897651e-11,3.840353617525956e-6,0.00012921830746551695,1.6132701027117452e-8,0.0,0.00021608265245447902,1.6154958683240745e-8,1.2234866201709547e-22,1.8731580121101157e-25,0.00398980136668731,6.6631038300039425e-40,1.6885686123791134e-13,0.0,1.286802947254399e-29,0.004004811114555511,1.075121285706893e-47,0.0002115668912930059,5.325155404374679e-26,4.143320502414774e-7,0.0,3.320438293155047e-5,2.0735295652155688e-5,0.00045425728968329196,0.0,2.786116076045173e-82,4.551368668417434e-83,1.9713129567535164e-8,2.5531271968597194e-24,3.183071481198379e-35,2.050376020341432e-28,5.296995268060767e-84,0.0,7.915870704658486e-78,0.0010199804765217762,1.3117093881922012e-20,8.177351800772622e-11,9.522737980541804e-169,1.1888558772279578e-89,3.9624246652898987e-7,3.0242403239349835e-28,2.3714536161616806e-14,9.404525586566302e-10,2.769394498550878e-26,2.1974202837546764e-161,0.0,2.3650526287278263e-28,1.8857578346247465e-18,9.282048589833219e-10,0.0,2.15595850758628e-5,0.00026827628294327647,1.6324471363959088e-14,3.2817246896436456e-14,2.44827189520874e-8,1.1413503455856407e-15,7.25128126435284e-67,0.0,1.1358456015371294e-72,5.09704299485663e-8,9.483092136769343e-101,4.020614305044509e-6,0.0,5.434066696165096e-42,4.39765567560793e-15,3.0965276501567815e-14,8.321866052891469e-7,5.804767350081038e-54,1.0664161808068944e-13,2.8730651938716712e-8,8.044889657062988e-9,1.0967653798475264e-5,2.108655838315308e-126,7.781415973622505e-12,9.119466435767134e-72,0.0,4.20399060577053e-24,9.07823404821484e-12,9.712753521001656e-33,5.030409580021834e-27,4.5753371857071234e-10,5.613480838114023e-45,4.2955772e-314,9.55231712274945e-37,5.092984491578224e-19,4.0698042290506945e-244,0.00031244246355754686,2.883126433061896e-23,6.877690871372662e-17,9.254564693834085e-57,1.1352677848846322e-5,1.3810167010703162e-16,0.0,2.5545221258951668e-5,1.1583664338938852e-16,0.0,3.491671887660258e-7,6.696810211057732e-18,2.4925243302552835e-39,3.7354085030717514e-121,1.567418278003101e-8,3.609840717049781e-7,3.4917283301002244e-301,6.212136509835253e-31,1.8404389111423136e-10,6.480523050414451e-75,3.5923984244032446e-127,1.4079516770957186e-5,0.0,9.992151196241555e-6,3.992897701734069e-146,7.383528488545869e-23,2.253330289699614e-10,5.123591735839739e-60,1.8003762349126007e-31,0.00179893070733882,2.1566174498243207e-132,1.3943787028016793e-5,1.8161774942784922e-27,0.0001267361973033715,2.7633396337877036e-16,2.4737718179614792e-295,0.0005074370660410877,2.0357816195725336e-8,3.3374724748397156e-8,1.2679901361306701e-10,1.9135195157391732e-7,9.625027553216605e-167,1.0769453825989404e-58,2.0929300533018285e-9,4.208030948931712e-9,1.4564620372432148e-9,8.38256188612977e-20,7.930035620034614e-6,7.118147839479718e-29,1.1400253318193503e-81,1.2845487475563722e-94,1.745053055933404e-5,7.711884745607018e-9,1.742575482118476e-7,1.174806706318748e-74,3.242433042898537e-79,8.143144643924897e-212,2.3055939088820945e-8,2.392623579143107e-66,0.0,2.1018119392921005e-14,0.00015903619284469474,4.0167191108671735e-7,0.0,3.803836827774855e-26,0.0004411349988522901,1.0977256760103171e-6,1.0577734262809844e-59,9.59251275616617e-9,0.0,2.4449786859964005e-78,0.0004877319246065462,9.82756098795172e-17,1.0800955164324836e-8,7.25778926672156e-23,1.0905676945621943e-130,0.0,7.416154865925455e-26,8.852749313619116e-5,2.417266049261001e-139,2.5549671504495576e-5,4.008210304396716e-59,7.392786485112072e-9,4.458202413112023e-9,5.831701355371262e-13,3.916648749100842e-8,5.701176538053099e-21,7.731631096963684e-9,6.592518020631702e-103,4.009009916904855e-25,3.704504399922385e-11,3.175725495562343e-16,1.3889973690607448e-7,1.614337802466184e-15,2.1706457071328132e-83,3.913735839519544e-18,5.861509362478393e-7,0.0,6.262493979650984e-13,8.475039217633339e-43,0.0,7.149724496648814e-6,2.409687421767254e-151,1.4797867520853856e-32,1.8700630228755645e-36,0.0,3.4830718592824856e-5,1.2721450508544429e-7,1.108531885892422e-147,6.844586804973695e-7,2.2764022911620364e-6,6.696824395098197e-9,8.69296814154713e-37,2.06973296429559e-7,3.4839903569756557e-16,0.00046764018328132194,1.5049184678006185e-59,1.1605688150974068e-213,1.3383916177783836e-5,1.1773325411531873e-29,3.4694525123955404e-7,1.3095793120344674e-16,0.0,1.6322441886656768e-35,7.857738767370906e-124,3.79200424405631e-28,3.153610839140473e-15,1.5096459815537895e-15,7.619933428683077e-6,2.6457969178734273e-91,8.142509718760302e-11,6.422941118054067e-13,9.90164300568166e-204,1.3969329871212555e-134,0.0,2.405067319783866e-13,2.3344212466185284e-8,2.602709459240986e-8,3.446334657774504e-6,7.488724728843047e-14,6.395729129385474e-8,8.920040837851645e-51,4.990320449133318e-27,3.1249511131669124e-7,2.6653216906543366e-9,1.373100555355259e-6,2.9706644716245844e-8,6.109725670830907e-13,1.7086288381314165e-290,1.5706853428507452e-111,0.0010342017784401975,5.5445310115178184e-70,5.780533903286824e-15,8.020081205844245e-5],"x":[-15.97956392511209,-18.47902778416205,-15.863117425284727,-18.500074478371257,-10.056158256440774,-14.768000430627675,-13.315436150232486,-12.20521870045436,-11.098207156964893,-13.667375026002844,-17.439001792895876,-12.031156174149569,-13.669215387894065,-10.739595820896717,-18.201243333106778,-19.38465320503709,-17.274180134060096,-12.712583477950075,-13.472749912018774,-19.74063578734446,-12.4436077692963,-13.595082326135975,-11.561671141331884,-12.880633014530677,-14.52377303794696,-14.36276699985109,-13.604722231840721,-10.632970326368547,-14.747163938325347,-19.480119013125154,-10.613533018699087,-19.986731311897564,-16.782893145424254,-13.615806734581643,-10.7604140764693,-19.30276621528276,-18.279141839259577,-14.584974740171221,-19.552979545977653,-15.679007121099044,-16.643362392313968,-10.735579601020477,-13.914433553399391,-10.3333085968109,-15.507710811037791,-11.59299160330791,-18.567028528917124,-16.40960629039984,-13.69661493259591,-11.722825314634331,-13.152520730563555,-10.821705587076574,-16.376467209937136,-18.71131977234289,-14.097750036159187,-15.989550110859263,-11.009273838178835,-14.993846054901772,-11.202616456332022,-17.003007880330685,-14.80088598796561,-14.299157635898075,-16.255935114490605,-11.938410269066251,-10.385932635533662,-17.329965388633788,-16.067757706411463,-16.428072491366397,-19.528806447105097,-12.99924697927787,-11.112798971409507,-16.521338844623557,-19.91426895712516,-19.266399534362204,-13.50567261524285,-18.71571685220478,-19.051442117111744,-15.449947421494192,-11.301498246551345,-16.96759335191197,-19.114903064145253,-18.8543683704664,-10.975884827511393,-17.81933057033565,-18.013350054554408,-16.477093079321754,-19.508996391252154,-13.368443693847212,-19.16446858967665,-15.087270938374429,-14.279613895054117,-17.81282521679297,-11.138014853762916,-12.457406994424094,-18.37987034724651,-16.60316384846245,-19.289263672033762,-19.054745285008906,-19.16166038115662,-10.948992082003809,-16.03109678638613,-19.24878001469573,-11.102427463550747,-11.38235906518942,-17.435289267305954,-18.537097368331036,-16.132104121862874,-16.34283599272418,-14.824397253268803,-19.839814781399355,-18.23776707500174,-16.13602579456056,-13.564772926009283,-19.0011974306326,-19.46332107453272,-19.77203703359294,-10.136485307210197,-11.517333233934103,-12.590287878192578,-14.474951851860007,-12.05951844821412,-14.07663636982843,-17.507578537677116,-11.641928788055198,-17.188836960707825,-19.439981609865548,-11.776527519919417,-14.833842165848207,-11.7809286475263,-11.533943978564555,-13.53944130182919,-12.85238835302744,-15.838101889423443,-19.441337936851856,-13.914985018334283,-11.212190625378362,-13.077792215965925,-18.87733018259681,-12.20934573660955,-17.22594658827468,-14.979931938428766,-11.94136668276688,-11.275622517155806,-16.003479230948024,-19.77165732715065,-12.639573787246867,-18.496226876380746,-15.898703865245158,-14.937376509405752,-12.294550241813127,-12.951711811651665,-14.754875469987557,-13.669514905721229,-14.020517774040353,-19.54265459068236,-14.625155898631945,-14.624684289408005,-16.330392745871794,-18.90623472605284,-10.7409008866574,-14.784256797877324,-10.234094378298895,-10.091348220906653,-16.955078251039676,-17.065170979815523,-18.745326265772306,-19.34747713217365,-18.10027682518562,-15.164654000980695,-14.158413569215815,-17.74637693618002,-19.477220763278027,-11.522060099646755,-16.974178143290924,-12.1301905179486,-17.348948576530667,-11.504378832749989,-17.119481123568622,-10.348775541803532,-15.185417213138571,-13.47598300701916,-11.841711222119134,-18.95068036682456,-14.839369541292868,-19.904452705764747,-12.833606421913991,-10.824190753200046,-12.791044803770488,-11.795914781155147,-17.23462740598647,-16.428023645185824,-11.181008438166767,-16.383791748920366,-11.483556305919782,-13.83920509588372,-12.481155759690033,-11.308908642690756,-10.893332546563512,-15.739037700843433,-18.096177002375164,-10.410978204471583,-15.358949138327937,-15.629455725737433,-14.783107717664484,-10.158271696822656,-18.308710002121412,-17.196548238485498,-14.432927014598963,-11.502230446622718,-10.648977298908612,-13.471431869216303,-11.463665259157924,-12.121896356035418,-10.514601333026011,-16.367390938525638,-19.45442854874488,-18.424334406548684,-12.451143057479806,-11.670434819364209,-10.861849266394149,-16.25304474927242,-14.216189381997024,-10.26520279789321,-17.591786876683216,-13.51674796492423,-11.430938960849108,-12.843271178924914,-11.010638218067594,-18.84965813816337,-14.260642895525866,-16.20742719576853,-16.59993144359649,-14.706849623873923,-12.433906835393127,-11.823519279128059,-13.908245406604996,-17.421266324912093,-19.485100227007457,-14.701912627126664,-15.349149680619156,-11.941162535929779,-12.031881180970075,-11.48445498229437,-11.586678524073633,-14.62745123796148,-14.227689602720933,-15.911208818077968,-11.672933207213356,-15.269466157948061,-13.71287903902708,-13.290704982280781,-10.288859375621701,-16.903564569194813,-16.256601764827938,-10.940545248255924,-12.680021532435351,-14.746364642126089,-12.246174732741327,-11.971224755473568,-14.84727702397718,-13.713863467175564,-18.08386834338568,-19.705809484953804,-10.060836261711524,-18.170955494159443,-11.863619860150523,-13.762746686908383,-17.711153993369336,-13.513958744955444,-14.329684234141393,-18.99925865073857,-15.233937748301393,-14.463503918139548,-15.24910248119728,-12.34268990284704,-15.771218600817589,-13.850795811839163,-19.730091341709713,-19.65290835616917,-14.822030915398383,-13.310881372084452,-13.007086497591967,-17.42537352029981,-10.860141502537067,-19.108347544875592,-14.947556866059937,-18.693863903873922,-17.154508160445317,-12.60063305633636,-17.513148097820388,-18.343531192230696,-19.539423658140432,-19.39838037361126,-16.595333797657148,-14.737003228180372,-11.63522720664102,-12.865929716777615,-16.64413404367354,-10.761245300043312,-11.746304414641035,-13.88932325545097,-15.86844704706423,-18.066240483631745,-11.49733990430406,-13.285540683876757,-17.774682528463664,-10.356506420026726,-11.167645334415887,-16.36288555088528,-11.815809558569729,-14.865819562461823,-12.84347378028323,-12.048654951237094,-12.781253634438748,-10.950842956700523,-12.279717055290726,-10.164941960412277,-10.856109177248596,-13.08390981796995,-15.522575897286048,-13.047960033969128,-15.711122812073972,-19.233763546447697,-12.494321214995976,-10.971998891104933,-19.100019724471956,-10.808136413385757,-17.584868921600027,-19.653836547890254,-19.250547561110512,-11.362330919232395,-11.359844701265349,-14.852763857153718,-16.21069881597819,-16.625745634644634,-12.646848602531628,-18.39983119209155,-13.769912358827609,-15.27827253728285,-12.615893185131759,-16.52285861954534,-16.577041489073675,-19.407905145970716,-10.313130347612432,-19.45350806161841,-13.802618539813825,-17.667590094603117,-16.302227116486474,-10.279557337984691,-10.517049102335037,-18.466283862104707,-15.256729721837752,-18.44208043816713,-15.955818753149726,-17.529918250083274,-15.948780342981749,-17.440740219397327,-12.217513715319479,-11.949378527424573,-12.004860837491986,-18.387697396504414,-14.290193048566904,-15.628301555756408,-14.392294248905952,-11.86508501922203,-18.187549125057036,-15.27198631419834,-13.78370832432296,-16.217424664504733,-11.702467910844515,-14.816722541542182,-18.824575225345065,-11.060948498347535,-12.807299484957916,-17.886150295039936,-19.902090846903192,-12.394285870209465,-10.266220070876514,-13.19095891479654,-18.613720378935056,-18.189874958278892,-11.375981777457726,-16.251739935875776,-10.949689687709363,-18.11225909658696,-10.767545698889379,-11.981963732136876,-14.46916939500936,-18.874766012577837,-13.374817159364847,-14.933588916851324,-16.906901490495677,-11.073932673656866,-18.44327147576142,-19.957658057379785,-12.350635805098069,-19.932739131548814,-12.232586787022504,-14.612503282022097,-15.180504011986963,-13.744822175446366,-10.748381201937242,-19.683495856516238,-16.304607307716132,-16.72004989479704,-13.764914290175223,-16.04656301823873,-18.6925465115618,-19.363077699585645,-12.353996143192107,-19.986653955087995,-14.37356729267366,-15.020766330173052,-16.70947952614615,-10.467537728914913,-15.812935875194643,-14.474384042593634,-11.649659922599477,-13.888661799083515,-15.054192613099776,-12.948143403354324,-10.074795887570353,-18.43276802914168,-14.140723076725962,-17.345618765464547,-14.836842934409304,-10.114060098074845,-16.217575375068115,-17.087289226660722,-11.269740771997617,-10.916811323225435,-12.708359838952127,-15.209433806099073,-19.746012799587053,-19.29238609870074,-11.873317290578857,-16.33161226710724,-13.598033311084308,-16.676216267129348,-10.854740487441694,-17.56501998384377,-11.453794403825237,-16.393590520556977,-17.01700465557575,-13.08087210001858,-19.175893074259633,-16.423231220449612,-17.928850253827,-16.13867855334162,-19.950083420344335,-13.038487598969226,-14.527052974682217,-10.868789856141268,-15.415744352367213,-10.43933823084904,-16.0124384992095,-13.492115359996983,-10.57716410525414,-12.391674883828045,-12.484775503855785,-19.548343782546958,-12.373649333030787,-19.433934233258345,-14.3635623071107,-10.615910392012733,-17.98315844964299,-12.997538197401449,-18.064944596946777,-16.492210652472068,-13.631490861517385,-18.08359134989509,-11.750424365145689,-17.801125524580634,-10.90434819631555,-12.830012458955697,-13.09111563661734,-12.56886254995819,-17.506003771083915,-17.375551985552164,-19.25283514844549,-15.106892415319157,-16.675074901703496,-17.70942150773263,-18.46621057054328,-12.843318600824444,-13.3565297507835,-19.226143918304178,-16.863151112493586,-10.135168064187546,-19.634441528088413,-13.972806087838984,-10.201416367697737,-13.8573458017574,-13.152710308235054,-17.814113024405216,-14.185030390615578,-19.93845746351929,-17.76031260720908,-18.560375774190877,-15.52028840106598,-18.36492109856152,-10.41830310877489,-19.480123782342737,-14.341847884090766,-16.749171518285536,-12.285388184415947,-15.155134979764576,-15.274810057857247,-12.10471461040039,-17.127945406055666,-13.630269662500897,-18.263490129329078,-19.286479040412303,-17.85166034176577,-14.989128103083676,-14.100614033901875,-10.788021343145445,-15.147607312912339,-10.400598979147581,-18.344747732689672,-17.948780075077387,-17.43854245248778,-11.074993365920363,-16.909196718353726,-16.406641301134453,-16.24665820025166,-16.66482198619644,-18.974817883433495,-14.822896446312905,-17.335456879267433,-12.55252853980278,-15.171103673170741,-12.159456878553478,-15.200081614690594,-12.427598949363524,-15.661235168342229,-15.505035637985634,-12.403527333782947,-11.587649170290245,-15.580356915861572,-10.310176503358191,-11.47429368553423,-16.270578299089394,-14.001658566347274,-18.640309067607365,-12.991833899950798,-10.160862026142865,-19.803356453709053,-10.028981723646563,-17.257737862478738,-19.834783018701707,-13.223085191474414,-19.79738529776669,-14.061982277740043,-12.594350632427982,-14.433190311586856,-12.416602077001176,-17.616586839001368,-16.896315394215275,-18.197206985663172,-12.945653747837028,-11.509133848605874,-19.607131501909603,-19.68591080871456,-15.897191019158887,-14.63499820422001,-18.631552985517864,-14.122331013132028,-15.638935308964772,-11.348825005911385,-17.319897805987456,-19.255533520166104,-19.242696793707246,-19.154535109766208,-11.56803139008167,-14.021571152350685,-11.946009859571625,-14.432151407717749,-16.06131204565259,-11.263987129242864,-19.83537452460132,-13.745653893903423,-10.032841971868098,-16.17973748086532,-11.54244924515655,-10.21336346660245,-10.253040059008189,-10.898032091848819,-10.408144489904563,-17.638593626587465,-15.129448369521018,-14.864768546149115,-12.30885323735961,-12.186006868915026,-17.401645019286608,-12.140352635505515,-14.490852689951693,-15.976686363139972,-12.996468120792589,-19.473250992509342,-14.68252003700953,-14.906663284674233,-13.921115978198703,-17.264192521344956,-10.078217241721388,-17.224297181906124,-18.367001856165498,-10.271273585240316,-15.735448304003013,-15.11456872459731,-19.925062464082256,-17.57915966509397,-15.369754823614745,-16.85228330735501,-14.657013136311583,-14.097971158967713,-10.183035601898778,-15.606946785494282,-19.327186924590094,-18.09976970380761,-15.712387458413751,-11.58847420767053,-16.70253133167473,-10.049740324894183,-15.024105247499818,-19.45418906458979,-14.389737213701421,-12.23461158559421,-10.951271019195449,-17.849215866525817,-16.4937523659427,-19.0205193505152,-14.206886967976114,-12.423424561422866,-10.570143947012681,-17.19341859527467,-17.39244391675298,-17.74841608741034,-14.390053438145149,-18.424270142412094,-14.572651202773821,-12.128756142221517,-10.983902775757091,-13.813468947424735,-11.475094620675543,-14.131469541735393,-16.438313178564467,-13.94063374213413,-13.065829779507956,-10.924959216284096,-12.596913734055942,-10.784296157421524,-14.829669058522432,-16.8067351889073,-17.043821036870945,-11.688696712434883,-19.912367580640773,-14.630367380990988,-18.073377784390132,-16.451084668811,-10.445556279027336,-12.026158729830955,-19.318630195440978,-18.66024226941325,-14.206381434715656,-13.312358411444576,-17.539809941849644,-19.082338354384895,-15.942116303419018,-13.604860245072736,-10.640426207675183,-17.224044822403243,-17.44144739953254,-10.656164942952625,-11.082736064079846,-14.962239532549546,-16.055185694364976,-12.11916901229144,-18.07831896291691,-13.692754225905308,-14.430066763641168,-12.085159456792818,-11.342631534591632,-13.42606823713252,-15.850112438941927,-19.482865852070226,-14.800819092821122,-19.75169150065701,-18.923404394611648,-12.572962591552844,-14.60730138348757,-10.958614261976296,-19.415621983765476,-18.57920107781565,-10.363804291097276,-18.97968498452525,-13.81046211206787,-11.522319474990802,-10.197884616264385,-15.833798832625611,-17.00372987543288,-15.325987690394387,-10.50186438899262,-18.545649928843535,-16.698390016790853,-18.44947084146243,-18.706455195091365,-12.951786067654554,-17.699920978642897,-19.580430817363283,-10.668902509491907,-17.152399883945687,-18.43743137937227,-16.3752961963981,-13.44375366702971,-19.342361850736893,-12.41769362196258,-19.771410575981648,-19.657376094707583,-10.207047916473694,-14.79555512447808,-11.992886615455163,-13.934959941987842,-13.86647059599267,-13.330680542470683,-12.312199939184827,-15.55275100348574,-13.385814085581703,-19.717428419945186,-13.125107940442554,-19.518988301045894,-14.697028243690504,-14.599729688232506,-10.519273805048142,-17.18558738680499,-16.11901619516766,-19.20151771292012,-10.035771679689422,-11.848344236963444,-19.27942142637406,-15.526111879709381,-18.92322237901172,-12.867190675839943,-11.574854124883796,-12.913098930345878,-13.87123167803801,-13.229452283779917,-17.362675545501077,-19.383303871768753,-16.124929655014345,-10.878782894130069,-14.553040414459105,-18.056485575237303,-14.382618740412527,-11.021498595299564,-13.813694699095251,-19.06107062421445,-10.845045138945693,-10.27158279191482,-19.11579626262896,-17.557145698110435,-19.910453385830646,-15.731939841607046,-12.737799236884623,-12.317223483126217,-12.087422484280815,-13.683427258094392,-17.090298891625824,-19.35150311767441,-11.661182761332423,-11.590001084494904,-19.73366634819499,-16.168014233686243,-18.873335414908677,-18.546728110872245,-11.254438234170063,-18.550500083950915,-13.85706435040574,-13.839790525959334,-17.903350948755026,-18.46203575049217,-14.122369478330727,-10.029797567467973,-12.219364791730287,-15.269648047927975,-13.982194178621924,-10.809736035528028,-14.580750040105222,-19.85849158364546,-11.64615610164847,-14.953394684762785,-18.643739323780594,-15.61626623256065,-16.857725752764498,-11.767360201456746,-11.985698084979692,-15.47788867122999,-10.470948480765896,-17.289453422506543,-17.362391568966967,-12.641160477555882,-18.259392573575038,-10.021981204442218,-11.459704461201703,-19.350398536164246,-16.978568912446303,-12.025957932567248,-14.130259078753918,-19.050932521623597,-10.115842441487153,-19.80776507595879,-12.739218874939596,-10.742833309095605,-11.832403785077005,-16.9161289082161,-17.166078276491973,-15.087311564282173,-18.32183806346611,-17.128153396267546,-14.740146535465637,-16.47903912589338,-11.599219331527156,-11.04441977231704,-18.90309509363402,-12.093567811360872,-13.427892048421917,-15.71383186570555,-17.51738622043363,-15.07213297961851,-18.134998372393255,-11.874488383778722,-16.566513611117053,-14.347087129517666,-14.967747482485185,-18.16371981181067,-18.69747543602394,-10.223528981691032,-13.959370451538122,-16.468178892905534,-14.910683001310582,-18.514272343805153,-13.714170667372192,-12.639959991390441,-16.518820879692246,-13.309784107985767,-11.522530612302225,-10.84502430124635,-16.293942402766895,-10.097018599569106,-11.663081221647051,-14.747357917338672,-10.771434249112042,-14.496322189548314,-13.357900238688313,-19.891211273140573,-14.83045247128889,-14.714597541202341,-10.314237330415574,-15.832383683070644,-19.185137446109103,-10.329415628124616,-16.958413287415176,-10.247436952513793,-18.772215167960837,-15.016677971449976,-18.167182734299228,-19.12014473151681,-11.625305409364746,-15.069089454565303,-16.67543350888669,-19.59007700866917,-12.554036276364137,-15.085971277005727,-12.224287213136085,-11.748329438646383,-10.7221263834146,-18.122933472522018,-15.87470179112368,-15.612877492505437,-12.919116628585874,-15.108507565115406,-15.194513577443676,-13.077543575905873,-13.688424948294639,-19.187578296058362,-18.712573942942843,-11.943484959582072,-18.693693768161832,-14.209067089924874,-14.042541094588088,-13.719087179980543,-12.648383607057518,-17.542709423143734,-13.930249059356125,-15.635132003410003,-10.94148069352769,-13.815518245670496,-10.09486534734375,-16.924897807214116,-18.82741783087487,-14.284652457673719,-10.898131195619964,-14.847196410928094,-15.784759169174599,-15.976440849767812,-12.775555070131318,-18.138020830661773,-10.860684282189743,-10.547267109759577,-14.662165184801118,-11.444368581885218,-12.766394808365844,-14.758632666435823,-11.506211837340679,-15.73482439053587,-18.857872209218467,-18.792032328848894,-13.326303802629502,-10.838950622956036,-15.233203630906404,-14.314537919858857,-16.6178735960068,-18.235733299113456,-13.636490153403287,-13.743053852045307,-18.018982337836782,-14.536540401648882,-13.004698899125675,-19.232167898642782,-14.368095385749006,-11.205883197738613,-14.183411795955056,-17.678964317853534,-19.690088678604425,-14.785856166832366,-10.931136560923083,-18.52558629599883,-10.17865185509353,-18.559468824645794,-12.42478311993629,-18.75060576563759,-14.621246511584449,-13.200043082994233,-18.200096341894707,-18.741711657272038,-19.23407444732108,-12.271126614406814,-11.97048821097297,-18.65736407522948,-15.4520667561942,-14.418787958790773,-11.260166903926478,-12.942546196205548,-18.534034160038665,-17.03192921216802,-14.940898943249847,-12.000513145265755,-10.33716724669182,-13.964984828694362,-17.177811307372853,-10.462360024497109,-10.849142724184482,-17.19002553680603,-11.269878573085865,-10.010517520008593,-18.27977283148847,-13.51296775297863,-15.796405227778703,-15.144894184721549,-14.699545888358529,-18.70821109157594,-18.700098535596773,-12.350002212166816,-17.04276724239798,-13.991389944206343,-15.394960349706201,-11.132210424628974,-13.399360719770304,-19.30695386190933,-19.003493468744953,-19.927220188236603,-14.188823866712681,-10.985693462712048,-12.344311238056328,-18.518675812419467,-17.024875295677674,-16.123459520721077,-17.141726783004266,-17.974180714997004,-10.824780418101788,-13.86154444308817,-17.011644380869356,-14.102739767847128,-17.558908128633277,-13.918109041137754,-13.153941917984252,-12.157763543878007,-13.68777281396321,-16.835025519048745,-11.440525746491108],"mu":[4.234665089364089,5.088514774575941,9.520891969988732,4.8611300755136355,0.15841730290821587,5.440701541217299,0.7982973577241359,6.364905905132265,6.729119620565629,5.354938855959615,4.170402902137873,2.2234706403274607,3.038253110381135,9.201960791687506,3.558649874138271,6.831043524303835,5.225357882664559,3.3588062057964208,1.0346709824071842,6.141546414565859,6.248967902672506,7.5919688122442,0.08336355571311183,7.8797589308904925,9.051724291562024,0.10187269462760051,2.1730919929068193,1.552863852732873,3.2008562901253335,5.121369015602955,0.5889536639448645,0.43855709001048293,4.496420850156733,0.23939236140306797,9.95444723640556,4.575811423490695,9.158128385789002,6.955104035333893,8.937863734599894,1.1610494251446313,3.6590795903171647,5.526788687145519,3.1894670904156874,1.6793138905575011,4.547941521835446,6.79916077572442,7.468198131771874,3.813904295515087,6.469226750340759,2.201504855750762,6.449453565719194,5.014961990766864,1.405167234238156,6.635626838840438,7.568097644306857,8.349027634608834,6.465486491862775,4.176113600076354,2.9318658964588162,1.190364060315281,6.577254035152011,2.5370246166642163,0.4554540405365892,3.174638892376478,1.4059964828551852,0.8871186304340961,2.2292003332889854,4.329015709590374,2.291052393222861,4.9847977401317145,0.04454287754203978,3.2518960644342054,0.9816753456397187,6.054970518544554,1.4717959867435115,7.158896127292856,8.278609984199345,2.3504039262705723,7.394224870001411,3.3042054735131354,8.761821481092182,2.258785795483651,4.341508884838115,0.04896433126451161,6.244735451089558,2.5049261236296694,2.8448567767620014,6.3413448268667905,9.71181579718515,5.863412975066087,1.5536274783333548,2.426314093990478,4.634682964120882,4.942256470776989,6.756601331191636,9.766965477216186,0.07943383541022087,1.2755551550413435,9.724322634567562,8.08495914708601,1.5044684007671139,7.916425309122239,6.882290483960507,8.558888386162211,1.2136347320005214,6.146678441087716,4.666739485426207,4.719242545479709,9.969205145289514,8.444890449209325,8.729626304934746,2.1470440315983264,5.173364552795299,7.771490637536682,7.163507303960102,9.385299499582134,8.181849622541993,9.747418427550995,0.6771938932240262,0.5221171891405829,5.596862286598753,5.573591274953951,2.332113013953423,6.358094010631334,6.326676804091895,1.922524373012946,7.082687095656304,0.45285702151177,1.3179961823403064,9.55219012122318,9.246451426792815,4.459065382658986,3.9233103251431767,8.083317291033445,6.293530284638256,1.8636800683855737,9.08144636218302,5.219011411731205,2.0830026099630516,1.9482446429941458,5.210019209275918,2.770450453352038,5.8574481242501815,2.9567428213835556,3.442247965603862,2.570127778319633,0.6983081640087074,5.79473289440214,0.33585892710108256,7.057798330968151,7.705389773240244,9.021968310387846,2.2960363639638404,9.725072555904472,3.7808534478754696,2.446752477585652,4.1414185107564965,7.422216481057095,3.718379833899641,6.32734233290887,8.556228343295093,8.64807638741082,7.448882557021892,8.810034271562595,5.00958603740327,4.412951076368832,9.33166894157366,4.8864700745156515,9.814330399735669,0.7733919133276834,4.764330622964367,2.773622208316353,7.46660917728194,6.660762381859826,8.620685963787897,6.594185736849363,3.9675863696434965,3.6694723111524974,8.159973170354323,9.387002390610327,9.042419469456767,7.123311678911812,9.4188210760808,2.3177425315525424,3.5890341081951482,7.212369909964453,9.800858590225213,7.065304617243564,3.2028974217299244,0.0353050051266357,1.6790016377683292,4.762236745600143,7.834591978592467,6.255595770052778,0.6326087093188382,6.974954602448847,3.008472664009143,9.293154611398533,9.673945978662935,9.986317644355392,2.005509589403478,5.310767318771226,4.462660026525295,5.400795462807189,0.7506090371876772,3.6846576434241296,3.552485404881145,5.452405692592304,0.7350819429865441,3.7255891164379773,3.893576595138235,7.002795935204736,8.879567546131879,1.6982524403517174,1.1810732937128776,1.1337008896401612,4.135919779892713,2.02821326984002,9.967219696025138,8.850083485049318,7.982534555566789,2.9509629315305386,6.580129273001802,0.3974046122003094,8.293556748378741,7.09978506643658,6.922204566376198,9.431213947340112,8.888296287476404,3.614714281104723,8.397359624148223,9.09314297832495,5.645391983746364,3.0868152550567673,5.6686585753969805,3.885845413272393,4.223990410165632,3.120816298973439,2.2324411255765186,8.479533485611599,0.4127282036032298,7.180725115650228,9.937117025765014,9.937465466673734,6.71335785199058,4.340547474026682,2.3419625497642493,0.4248822240104855,1.6383333117622745,1.343119878834289,1.9920541729443508,6.070805673907502,7.636360035010982,3.148282523242456,1.061830811334712,3.9539341499791747,5.305320352441411,1.1268290604789555,0.5008938664051477,5.924429898519669,7.2884253653765825,6.082899842915211,1.1152915142632458,4.706227223852222,8.055201624975446,3.853215253930975,2.003142169580341,5.144914710789143,4.611884591358503,9.344522894179583,1.754387530440007,7.033023690655469,2.1694442698966387,6.855899590880767,9.450292536188492,1.9056633788247912,9.751844507680701,2.067702125477182,2.944467644849078,9.016816275168098,1.6983296007486537,8.626877534604793,4.505394709143086,5.767181228704816,1.3685158457255686,0.14482087193018023,7.789926634191808,2.671441170523532,0.114832451581528,6.885368286290956,3.3405478140592737,2.288421326977512,4.34462152044786,0.23606356625715197,5.073962712911804,9.788355350868317,7.6752973260859125,0.1572781960367875,7.679888376506097,1.1844141569433386,8.021901662746007,9.200977524241159,5.06719276623026,4.831628035961765,5.042317973858614,2.038897965113089,5.660565549309238,6.853604823879169,5.331534043283163,8.55181491808269,1.8203294001535575,3.534199961538431,3.2532396133146446,1.704212397931193,5.818222118120129,9.56314980450924,7.536866870405743,0.014831964745025683,5.456620896582276,6.467316141031983,1.2059187837076135,1.0267776643470228,2.836308248086028,0.6723231617267555,3.5931498317139154,6.517391002662811,4.281085043327502,1.7729824395039628,0.3300529858997181,6.273242957361149,9.783907452120559,7.087282692663881,7.795220746412992,5.807198706956395,6.481224000214221,8.72268629922607,3.1919999303505553,0.6248073811013222,8.411124879205353,4.332665899109811,6.66943761491032,0.25313513074992633,4.784103047651776,3.5790653829007746,2.5092740080664555,3.0648785434896486,3.0305736517160775,8.660829190378859,8.133265987178984,9.076390454709768,7.742536405889766,5.218037567953098,2.368717330628025,5.344456417496848,6.577237623193133,1.7571221552201632,0.5791269559618595,6.780517702804067,2.3794430908904785,4.475338371241138,3.4795883335073152,9.418306831241015,2.451091642176455,6.327302697802944,4.230685989172651,5.049113220153496,3.6542429278136,0.06070016202187167,7.846887164376344,8.252783739822533,9.007136557545683,5.797667280547618,8.638208034699847,3.3055864651763223,5.922726760419474,0.5091149607045886,8.147061986206264,4.406785337911991,1.7375323183618119,9.017929835448138,8.581629816364053,7.151256763122262,2.547730323441826,1.5148427552135302,0.21545563873681006,0.18840967563593214,1.312047854375955,4.38779508835033,8.91819635406881,2.197876275566726,6.653965790592107,6.396711552453056,7.25358033474107,0.4314110007084282,5.932670293356342,9.139721571176604,3.3680841641110426,9.039578544318177,9.766277240523138,1.0081662523147172,7.912686511194005,2.0918486056414887,6.030678758925141,6.6750879728868995,9.28508691117151,8.272685554185053,5.635881198489836,1.0387734892844946,9.604761607433154,9.66768262692838,0.9159003799435572,6.025217236238387,6.074863862790885,6.044452481629343,1.3836642061427673,9.930658929489375,9.137449173992039,0.6851621117034568,8.172064696105934,8.88221726326359,8.604663073912613,7.744665937026962,2.480786806812343,7.947396821133297,4.104161732417497,0.3634157596334031,0.1541217397265826,9.59976879623248,3.1907688969230086,0.9785413618299366,8.669497607047687,2.603372426671391,1.0028489196299595,1.9556767868249958,5.5809488452744915,6.372524068093169,3.7211338188804954,7.390714395601579,9.104956188524564,6.138397807718277,8.318617007369316,8.468093786129419,9.12294147548746,5.3692767282103375,6.735681304260934,6.125453073174114,6.962436921077035,8.415916395828908,4.323832289436941,3.574675792331814,7.475909740566163,3.7869501044160025,5.07379560151608,6.481439290828224,9.035494672950852,8.91910380148559,3.8504539183642073,5.307263963645044,5.8604723934484575,0.6045432476936341,8.496254520988,6.9438726648717815,9.777677004228531,4.844022847990457,3.6181621423182575,6.699560142702223,8.151060369977206,3.4317028282842976,2.145125318739003,4.294450460519266,1.4960971601886963,2.147364692906939,9.19202578973152,2.3453084156939785,3.262112120695857,3.704836068726438,6.068523554905694,5.991240929896923,6.681992905378829,5.41559771735864,9.60929567125903,2.2142187150526227,7.5170652595892555,3.620799771047878,8.337451109664162,6.156665036326814,9.402552263243907,3.1487895760720974,5.716981084766058,7.119402640809169,3.143698723970614,1.634686370951428,8.892627578525085,6.057553851036079,0.6298065149110088,6.848063644668674,8.303809911658709,8.78458117344162,3.4779645443427576,2.149787579572895,0.6437571638654971,4.329135133817223,9.452563129617783,5.05684880070101,6.400321453671943,9.39355968398798,6.491694804917949,4.512352158415601,8.619856454672956,1.212674964802949,9.964471974684823,2.8726448800356663,9.282577612799761,0.47696008682373225,8.048525708193914,8.94753062174406,1.1324206988419383,5.170059068698554,0.27110035934528653,1.6258087142656752,0.7621586900173272,6.6119479339985965,6.379062787898819,0.6494308623183609,7.138839173552709,4.978399343109359,9.576604379811348,8.080398694572414,6.231964816226814,6.681355144052567,8.878753418706884,1.3352603043637812,0.9663892999902557,8.136620460552702,0.3597526145906116,0.8547693873985107,7.0612975011979024,0.6575053784938434,9.572137409803329,3.0747258692786072,6.664782848174113,0.7811543640126173,8.212658125457136,1.5619895823323304,6.598389144091881,4.092158008574156,5.772127414875028,9.760857291801361,3.4800883324028686,0.4993387145108641,4.502603846051237,0.14336641145414886,2.5211755180349593,9.490964876690754,2.4319769866306373,9.865129245166976,5.673380035935995,8.480914555995035,6.409125326831333,4.169609078062875,6.79004093443317,3.9661941768581843,7.4539396149383474,5.58047651722889,5.859286167198987,2.8038376462820636,2.1346906066469473,5.791724995060735,4.7862101945676265,9.532404238560439,9.827697103459798,0.036046043229640556,7.193058222145055,4.370427328648434,4.624769153958366,2.849090330926174,7.057343541479016,8.969250827929699,2.621033077880297,9.24230696457164,1.8086078691106278,8.156759706632924,9.425724989888577,0.38779347673691955,2.10525346868083,5.032734820882441,0.35260901543781475,5.407429572645066,1.5256948230585943,9.20279887016992,4.645222668281848,9.570415329373688,8.004347659947992,2.8498856110558046,2.5223964193176274,6.299272414749462,1.4147383305500472,8.806121264123165,2.55823841438489,4.535452940548572,6.2589608424432335,6.5338659087650015,5.521866012473389,0.1579837802175721,0.35264326107123267,9.816186684444189,5.926366564922844,0.7335157422408689,9.37313615166503,8.443603765258878,2.3262351965551664,6.541989081873066,0.28437422301951454,5.9025446339314165,3.8768974727185435,7.370766051376931,0.4539513737621115,4.082385375532476,4.470521081838568,1.4214013162398964,7.265982050719531,8.377410601603003,7.327298720635833,6.028495261266933,4.988196959951212,9.433622434363027,1.8227330363860461,2.136289131190967,9.606327586898226,4.474517788665353,3.692381757098502,6.57227126340147,2.593956561081343,9.914242635045854,8.111967008980352,1.1343190654450375,7.299772498096324,6.015722733877951,6.777854379236308,2.173944666266312,0.5885475395517004,4.161106543965349,7.0475493831826626,9.697939068897114,7.01203827571703,8.571423250445013,3.7018086305696207,9.02113352221315,5.994499040556889,8.789279122927278,1.2191171729604022,5.724949618520738,5.2223483506328705,0.576426696620358,1.799552993963569,1.239005568238376,4.031841933316958,5.582532920724372,5.7519654720394335,5.012047230401116,3.038529884012917,9.79298175883189,1.2543868656690482,6.456782393192977,4.507478877677591,6.45660527688126,0.4187252961319432,5.684230262213752,0.9875784185802061,9.69739448230502,7.689688219136768,0.7427747470422075,2.7238008805959413,7.315690891061406,1.5978264925488816,0.49153228628813883,6.810417640933338,9.707779403728418,1.1891398619394056,2.5720119944718522,8.810406413967504,3.0809513323253057,5.161121898798273,4.06630843440976,7.174016177174116,1.9894320242492114,3.929926695222128,8.042940685648377,7.605122409602583,2.1181682206077257,8.472344987818312,9.2279784185951,7.17136091482534,9.602498720892832,8.068864797944554,4.13926468394034,7.963792139328394,0.7618288623371616,7.019718702680948,2.9805930125806057,7.991976953988256,9.728619031206652,7.4569820552058825,2.3627131293958614,4.660988971045052,8.342117826963138,0.41225782921695986,0.6935472815440158,1.2969479827639319,3.456486617896848,0.23144933505247822,9.587991755715308,1.4034813993159845,6.881396934185173,1.5641368302791925,4.585081157761477,8.014835573079743,0.743259134007308,6.359160003266098,1.5597452790362643,1.7541426565447216,6.773805825769523,1.9520727506027158,0.11188023257758806,1.5512390055872816,9.03046173739683,9.251098884268231,9.520470219375763,3.9262342965409203,8.351767155954688,9.89408380401066,5.376028207031858,3.927147280006462,7.595793371867363,3.457593187523633,4.489768631694919,5.985930862860151,7.713604357040678,9.769653564321157,0.24862524141408882,8.114032701207943,4.808321607519415,4.2780924958468685,6.390389619450612,2.4490940427387686,1.1643321935245177,2.0149104725488476,0.5244864299544783,2.9322320741697183,0.23330316731188905,7.067081371742383,1.4857691192659894,7.080864870476398,5.0461827041565055,8.069545021359994,7.714902001969222,4.966228716879824,6.761191527829329,9.063444096327126,2.722363391581659,3.6092576063613513,7.294601062542503,4.902555781080813,0.3997343323720859,7.056693493703072,0.7293262437868719,1.3483670070349718,8.987376978533156,6.405117366751833,5.033840979535147,0.10964391925162298,5.411710139626322,2.823566312667314,8.499609855844415,7.982755942399235,1.8484269019021848,0.4082512651825221,1.5217676121924018,0.1572260597122388,0.6066486119024406,0.49324197591208874,2.2914999016800786,1.2212088794464337,4.100984957008009,9.480388884602043,6.747743648796948,0.15208924026981263,7.404535668436079,9.819843583307746,5.395433653578605,4.527797761298185,4.247865239441257,8.767647787675594,7.162050876104297,1.3093717906894708,7.283913338215278,9.199816537145418,5.0245071893151465,0.8937245404730598,7.314008408758335,4.6096492836332,7.932598585143107,5.070406150438229,6.874726076431195,1.2447889155281078,4.339807279086059,3.10992430648116,4.894808715299661,2.5178959681735646,7.148075191660377,0.1473634382819644,3.5820741515222077,8.06228394122656,8.387212543951728,7.857713225124292,0.0028177345637070417,7.337226681801914,1.8384982001709282,0.15446574755305198,4.6852107638285005,7.248317082560858,6.698535391817426,2.572058131667747,4.936818568513173,9.736437774713039,8.497593966464581,3.0967067137258786,6.1942780265194886,7.671909454569892,6.526342096058384,3.8156987269942477,1.059519208726809,1.6807243353646428,9.373934198592265,2.4298136559233585,5.3952413197093385,8.596845344485928,4.226536715886673,0.7634646916243937,8.012335228848375,6.597607035612636,3.661834086206235,1.9400455110706627,9.450199083920634,7.20944234247233,7.6700925788283065,6.192651855069187,8.008811225438636,8.335368680388989,4.681600478747228,0.8327266911654396,8.977471077927461,7.828632067253833,1.0658506953224256,5.364712598575907,9.538138239210825,1.4424452343247451,0.5146523194949237,7.747902727772058,8.485482164392902,1.3700610920650758,6.1637158686052835,7.269192009095738,5.293612346066359,9.340890152221098,1.656298562210352,9.086861914034216,0.18671109226626958,2.965753033133578,4.0098130716515845,4.364515767831927,4.21406357626831,3.9334082419872973,2.3898631806005755,7.715284618507421,3.1204994578367296,9.459705255181515,2.0023378393006586,0.2829117049547736,3.1547084125590263,1.581865764341317,7.928296009988527,2.715024958537715,0.6496088502564468,2.4762668798514476,6.97059369509428,4.562913865104732,9.839237817852688,7.506582093759535,9.981079060643193,5.425499002819965,9.113822360643958,9.579649418280665,2.0176846371851997,3.490803042852517,8.49376345686534,3.6067695487887663,4.475688369175844,0.7030773604573715,1.709881511442486,6.881403290391219,2.368408382321656,4.687733275249557,4.881418813810172,4.7245128625573996,0.4662756114308908,8.153857557773438,0.2999679809493516,7.391662732096325,1.3756484934731628,7.456620362076791,0.23153504411886683,4.093938417464502,9.23783556929741,9.442606526787573,1.8325311129254285,2.030359407287037,1.5886571014932493,7.433914682207559,7.560113818199068,5.421568183320913,6.2075443906321714,0.5165880690443192,7.505707340128689,4.204048205696229,0.04969993136758388,3.9553497055651654,5.605309157041852,1.1292275186425305,9.426026597769702,5.550612144068756,2.3429402445627234,4.753558974887985,6.003178586820588,4.109058775810482,8.195336108695718,6.586902558675978,6.390926649260189,6.085512856056779,2.073960824171832,1.2814655928959273,5.547599766773493,5.660191854925376,6.852946170316301,3.9766428072993376,3.482823487440325,9.683500572201007,1.9828053258245526,5.690970044166239,2.4430484325854684,0.854179593834119,6.233493415464039,4.930937138636686,2.9566073401833126,7.347864026125894,1.0144649194755528,5.531727182995619,1.6728024213934423,9.619007860227327,6.421955765671812,7.629386847875084,0.8181083423938307,4.038924431716704,5.159495606659901,9.5289458784257,0.4379902809480729,8.964488739743254,5.360550943474363,0.10985740561178403,6.432072729848057,8.036654999644693,2.881905904436506,7.873016405174433,4.272421401676225,6.879007661619871,8.136406246346617,6.078511210546818,8.592924950587516,3.0813575412165206,1.9757994960237224,1.2610479827473786,4.182256511631168,3.2315601052838194,9.757760760092712,0.2956324140155653,5.466754985725181,9.581391615290585,0.6673155706730594,7.862440185568566,8.530092624598428,8.579710765311129,4.158212798677814,9.636335972922181,8.833604236612038,8.482689729829582,2.382044990851784,0.03819858458941949,1.858296931093033,2.153493099905399,1.1906589915614596]}

},{}],117:[function(require,module,exports){
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
var cdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `mu` and `sigma`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `mu` and `sigma`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `sigma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 0.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `sigma` equals `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to mu' );

	y = cdf( 3.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than mu' );

	y = cdf( 1.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than mu' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` (given positive `mu`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	sigma = positiveMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` (given large `sigma`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	sigma = negativeMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` (given negative `mu`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 250.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/normal/cdf/test/test.cdf.js")
},{"./../lib":112,"./fixtures/julia/large_variance.json":114,"./fixtures/julia/negative_mean.json":115,"./fixtures/julia/positive_mean.json":116,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":272}],118:[function(require,module,exports){
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
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `mu` and `sigma`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `mu` and `sigma`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `sigma`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 2.0, 0.0 );

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to mu' );

	y = cdf( 3.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than mu' );

	y = cdf( 1.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than mu' );

	t.end();
});

tape( 'the created function evaluates the cdf (given positive `mu`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var cdf;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	sigma = positiveMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], sigma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf (given negative `mu`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var cdf;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	sigma = negativeMean.sigma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], sigma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf (given large `sigma`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var cdf;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], sigma[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 250.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/normal/cdf/test/test.factory.js")
},{"./../lib/factory.js":111,"./fixtures/julia/large_variance.json":114,"./fixtures/julia/negative_mean.json":115,"./fixtures/julia/positive_mean.json":116,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":272}],119:[function(require,module,exports){
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
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/normal/cdf/test/test.js")
},{"./../lib":112,"tape":272}],120:[function(require,module,exports){
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

},{"./is_number.js":123}],121:[function(require,module,exports){
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

},{"./is_number.js":123,"./zero_pad.js":127}],122:[function(require,module,exports){
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

},{"./main.js":125}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{"./format_double.js":120,"./format_integer.js":121,"./is_string.js":124,"./space_pad.js":126,"./zero_pad.js":127}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{"./main.js":129}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{"./main.js":132}],131:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124}],132:[function(require,module,exports){
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

},{"./is_string.js":131,"@stdlib/string/base/format-interpolate":122,"@stdlib/string/base/format-tokenize":128}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":136}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":138}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":142}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{"./define_property.js":140}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":139,"./has_define_property_support.js":141,"./polyfill.js":143}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":130}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":145,"./polyfill.js":146,"@stdlib/assert/has-tostringtag-support":20}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":147}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":147,"./tostringtag.js":148,"@stdlib/assert/has-own-property":16}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":133}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){

},{}],151:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"dup":150}],152:[function(require,module,exports){
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
},{"base64-js":149,"buffer":152,"ieee754":255}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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
},{"_process":262}],155:[function(require,module,exports){
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

},{"events":153,"inherits":256,"readable-stream/lib/_stream_duplex.js":157,"readable-stream/lib/_stream_passthrough.js":158,"readable-stream/lib/_stream_readable.js":159,"readable-stream/lib/_stream_transform.js":160,"readable-stream/lib/_stream_writable.js":161,"readable-stream/lib/internal/streams/end-of-stream.js":165,"readable-stream/lib/internal/streams/pipeline.js":167}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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
},{"./_stream_readable":159,"./_stream_writable":161,"_process":262,"inherits":256}],158:[function(require,module,exports){
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
},{"./_stream_transform":160,"inherits":256}],159:[function(require,module,exports){
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
},{"../errors":156,"./_stream_duplex":157,"./internal/streams/async_iterator":162,"./internal/streams/buffer_list":163,"./internal/streams/destroy":164,"./internal/streams/from":166,"./internal/streams/state":168,"./internal/streams/stream":169,"_process":262,"buffer":152,"events":153,"inherits":256,"string_decoder/":271,"util":150}],160:[function(require,module,exports){
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
},{"../errors":156,"./_stream_duplex":157,"inherits":256}],161:[function(require,module,exports){
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
},{"../errors":156,"./_stream_duplex":157,"./internal/streams/destroy":164,"./internal/streams/state":168,"./internal/streams/stream":169,"_process":262,"buffer":152,"inherits":256,"util-deprecate":280}],162:[function(require,module,exports){
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
},{"./end-of-stream":165,"_process":262}],163:[function(require,module,exports){
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
},{"buffer":152,"util":150}],164:[function(require,module,exports){
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
},{"_process":262}],165:[function(require,module,exports){
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
},{"../../../errors":156}],166:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],167:[function(require,module,exports){
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
},{"../../../errors":156,"./end-of-stream":165}],168:[function(require,module,exports){
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
},{"../../../errors":156}],169:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":153}],170:[function(require,module,exports){
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

},{"./":171,"get-intrinsic":246}],171:[function(require,module,exports){
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

},{"es-define-property":231,"es-errors/type":237,"function-bind":245,"get-intrinsic":246,"set-function-length":266}],172:[function(require,module,exports){
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

},{"./lib/is_arguments.js":173,"./lib/keys.js":174}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],175:[function(require,module,exports){
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

},{"es-define-property":231,"es-errors/syntax":236,"es-errors/type":237,"gopd":247}],176:[function(require,module,exports){
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

},{"define-data-property":175,"has-property-descriptors":248,"object-keys":260}],177:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],178:[function(require,module,exports){
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

},{"./ToNumber":209,"./ToPrimitive":211,"./Type":216}],179:[function(require,module,exports){
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

},{"../helpers/isFinite":224,"../helpers/isNaN":225,"../helpers/isPrefixOf":226,"./ToNumber":209,"./ToPrimitive":211,"es-errors/type":237,"get-intrinsic":246}],180:[function(require,module,exports){
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

},{"call-bind/callBound":170,"es-errors/type":237}],181:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":239}],182:[function(require,module,exports){
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

},{"./DayWithinYear":185,"./InLeapYear":189,"./MonthFromTime":199,"es-errors/eval":232}],183:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":230,"./floor":220}],184:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":220}],185:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":183,"./DayFromYear":184,"./YearFromTime":218}],186:[function(require,module,exports){
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

},{"./modulo":221}],187:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":228,"./IsAccessorDescriptor":190,"./IsDataDescriptor":192,"es-errors/type":237}],188:[function(require,module,exports){
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

},{"../helpers/timeConstants":230,"./floor":220,"./modulo":221}],189:[function(require,module,exports){
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

},{"./DaysInYear":186,"./YearFromTime":218,"es-errors/eval":232}],190:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":228,"es-errors/type":237,"hasown":254}],191:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":257}],192:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":228,"es-errors/type":237,"hasown":254}],193:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":190,"./IsDataDescriptor":192,"./IsPropertyDescriptor":194,"es-errors/type":237}],194:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":228}],195:[function(require,module,exports){
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

},{"../helpers/isFinite":224,"../helpers/timeConstants":230}],196:[function(require,module,exports){
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

},{"../helpers/isFinite":224,"./DateFromTime":182,"./Day":183,"./MonthFromTime":199,"./ToInteger":208,"./YearFromTime":218,"./floor":220,"./modulo":221,"get-intrinsic":246}],197:[function(require,module,exports){
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

},{"../helpers/isFinite":224,"../helpers/timeConstants":230,"./ToInteger":208}],198:[function(require,module,exports){
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

},{"../helpers/timeConstants":230,"./floor":220,"./modulo":221}],199:[function(require,module,exports){
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

},{"./DayWithinYear":185,"./InLeapYear":189}],200:[function(require,module,exports){
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

},{"../helpers/isNaN":225}],201:[function(require,module,exports){
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

},{"../helpers/timeConstants":230,"./floor":220,"./modulo":221}],202:[function(require,module,exports){
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

},{"./Type":216}],203:[function(require,module,exports){
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


},{"../helpers/isFinite":224,"./ToNumber":209,"./abs":219,"get-intrinsic":246}],204:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":230,"./DayFromYear":184}],205:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":230,"./modulo":221}],206:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],207:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":209}],208:[function(require,module,exports){
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

},{"../helpers/isFinite":224,"../helpers/isNaN":225,"../helpers/sign":229,"./ToNumber":209,"./abs":219,"./floor":220}],209:[function(require,module,exports){
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

},{"./ToPrimitive":211,"call-bind/callBound":170,"safe-regex-test":265}],210:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":240}],211:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":242}],212:[function(require,module,exports){
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

},{"./IsCallable":191,"./ToBoolean":206,"./Type":216,"es-errors/type":237,"hasown":254}],213:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":246}],214:[function(require,module,exports){
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

},{"../helpers/isFinite":224,"../helpers/isNaN":225,"../helpers/sign":229,"./ToNumber":209,"./abs":219,"./floor":220,"./modulo":221}],215:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":209}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":183,"./modulo":221}],218:[function(require,module,exports){
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

},{"call-bind/callBound":170,"get-intrinsic":246}],219:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":246}],220:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],221:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":227}],222:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":230,"./modulo":221}],223:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":178,"./5/AbstractRelationalComparison":179,"./5/Canonicalize":180,"./5/CheckObjectCoercible":181,"./5/DateFromTime":182,"./5/Day":183,"./5/DayFromYear":184,"./5/DayWithinYear":185,"./5/DaysInYear":186,"./5/FromPropertyDescriptor":187,"./5/HourFromTime":188,"./5/InLeapYear":189,"./5/IsAccessorDescriptor":190,"./5/IsCallable":191,"./5/IsDataDescriptor":192,"./5/IsGenericDescriptor":193,"./5/IsPropertyDescriptor":194,"./5/MakeDate":195,"./5/MakeDay":196,"./5/MakeTime":197,"./5/MinFromTime":198,"./5/MonthFromTime":199,"./5/SameValue":200,"./5/SecFromTime":201,"./5/StrictEqualityComparison":202,"./5/TimeClip":203,"./5/TimeFromYear":204,"./5/TimeWithinDay":205,"./5/ToBoolean":206,"./5/ToInt32":207,"./5/ToInteger":208,"./5/ToNumber":209,"./5/ToObject":210,"./5/ToPrimitive":211,"./5/ToPropertyDescriptor":212,"./5/ToString":213,"./5/ToUint16":214,"./5/ToUint32":215,"./5/Type":216,"./5/WeekDay":217,"./5/YearFromTime":218,"./5/abs":219,"./5/floor":220,"./5/modulo":221,"./5/msFromTime":222}],224:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":225}],225:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],226:[function(require,module,exports){
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

},{"call-bind/callBound":170}],227:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],228:[function(require,module,exports){
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

},{"es-errors/type":237,"hasown":254}],229:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
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

},{"get-intrinsic":246}],232:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],233:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],234:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],235:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],236:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],237:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],238:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],239:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":237}],240:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":241,"./RequireObjectCoercible":239}],241:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],242:[function(require,module,exports){
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

},{"./helpers/isPrimitive":243,"is-callable":257}],243:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":244}],246:[function(require,module,exports){
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

},{"es-errors":233,"es-errors/eval":232,"es-errors/range":234,"es-errors/ref":235,"es-errors/syntax":236,"es-errors/type":237,"es-errors/uri":238,"function-bind":245,"has-proto":249,"has-symbols":250,"hasown":254}],247:[function(require,module,exports){
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

},{"get-intrinsic":246}],248:[function(require,module,exports){
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

},{"es-define-property":231}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
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

},{"./shams":251}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":251}],253:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":245}],254:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":245}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
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

},{}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){
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

},{"call-bind/callBound":170,"has-tostringtag/shams":252}],259:[function(require,module,exports){
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

},{"./isArguments":261}],260:[function(require,module,exports){
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

},{"./implementation":259,"./isArguments":261}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
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
},{"_process":262,"through":278,"timers":279}],264:[function(require,module,exports){
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

},{"buffer":152}],265:[function(require,module,exports){
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

},{"call-bind/callBound":170,"es-errors/type":237,"is-regex":258}],266:[function(require,module,exports){
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

},{"define-data-property":175,"es-errors/type":237,"get-intrinsic":246,"gopd":247,"has-property-descriptors":248}],267:[function(require,module,exports){
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

},{"es-abstract/es5":223,"function-bind":245}],268:[function(require,module,exports){
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

},{"./implementation":267,"./polyfill":269,"./shim":270,"define-properties":176,"function-bind":245}],269:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":267}],270:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":269,"define-properties":176}],271:[function(require,module,exports){
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
},{"safe-buffer":264}],272:[function(require,module,exports){
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
},{"./lib/default_stream":273,"./lib/results":275,"./lib/test":276,"_process":262,"defined":177,"through":278,"timers":279}],273:[function(require,module,exports){
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
},{"_process":262,"fs":151,"through":278}],274:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":262,"timers":279}],275:[function(require,module,exports){
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
},{"_process":262,"events":153,"function-bind":245,"has":253,"inherits":256,"object-inspect":277,"resumer":263,"through":278,"timers":279}],276:[function(require,module,exports){
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
},{"./next_tick":274,"deep-equal":172,"defined":177,"events":153,"has":253,"inherits":256,"path":154,"string.prototype.trim":268}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
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
},{"_process":262,"stream":155}],279:[function(require,module,exports){
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
},{"process/browser.js":262,"timers":279}],280:[function(require,module,exports){
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
},{}]},{},[117,118,119]);
