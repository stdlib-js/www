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

},{"@stdlib/utils/native-class":148}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":148}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":148}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":148}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":90}],53:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":73}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-sign-mask":46,"@stdlib/number/float64/base/from-words":94,"@stdlib/number/float64/base/get-high-word":98,"@stdlib/number/float64/base/to-words":110}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":76}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/copysign":71,"@stdlib/number/float64/base/exponent":92,"@stdlib/number/float64/base/from-words":94,"@stdlib/number/float64/base/normalize":101,"@stdlib/number/float64/base/to-words":110}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":80}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":81,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/number/float64/base/get-high-word":98,"@stdlib/number/float64/base/set-high-word":104,"@stdlib/number/float64/base/set-low-word":106}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":83,"@stdlib/number/float64/base/set-low-word":106}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":78,"./logx.js":79,"./pow2.js":84,"./x_is_zero.js":85,"./y_is_huge.js":86,"./y_is_infinite.js":87,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-integer":63,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/assert/is-odd":67,"@stdlib/math/base/special/abs":69,"@stdlib/math/base/special/sqrt":88,"@stdlib/number/float64/base/set-low-word":106,"@stdlib/number/float64/base/to-words":110,"@stdlib/number/uint32/base/to-int32":113}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":82,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/constants/float64/high-word-significand-mask":47,"@stdlib/constants/float64/ln-two":48,"@stdlib/constants/float64/num-high-word-significand-bits":53,"@stdlib/math/base/special/ldexp":75,"@stdlib/number/float64/base/get-high-word":98,"@stdlib/number/float64/base/set-high-word":104,"@stdlib/number/float64/base/set-low-word":106,"@stdlib/number/uint32/base/to-int32":113}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-odd":67,"@stdlib/math/base/special/copysign":71}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":44,"@stdlib/number/float64/base/get-high-word":98}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/special/abs":69}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":45,"@stdlib/number/float64/base/get-high-word":98}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":96}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":95,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":97,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":61,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":100,"./main.js":102,"@stdlib/utils/define-nonenumerable-read-only-property":141}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":100}],103:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":97}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":103,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":108}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":107,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":111,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":109,"./main.js":112,"@stdlib/utils/define-nonenumerable-read-only-property":141}],111:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":95}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":109}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":114}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 10.0, 2.0 );
* var y = cdf( 3.0 );
* // returns ~0.983
*
* y = cdf( 2.5 );
* // returns ~0.893
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Pareto (Type I) distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < beta ) {
			return 0.0;
		}
		return 1.0 - pow( beta / x, alpha );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/pow":77,"@stdlib/utils/constant-function":139}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Pareto (Type I) distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/pareto-type1/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/pareto-type1/cdf' );
*
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns 0.5
*
* y = cdf( 5.0, 2.0, 4.0 );
* // returns ~0.36
*
* y = cdf( 4.0, 2.0, 2.0 );
* // returns 0.75
*
* y = cdf( 1.9, 2.0, 2.0 );
* // returns 0.0
*
* y = cdf( +Infinity, 4.0, 2.0 );
* // returns 1.0
*
* var mycdf = cdf.factory( 10.0, 2.0 );
* y = mycdf( 3.0 );
* // returns ~0.983
*
* y = mycdf( 2.5 );
* // returns ~0.893
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":115,"./main.js":117,"@stdlib/utils/define-nonenumerable-read-only-property":141}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns 0.5
*
* @example
* var y = cdf( 5.0, 2.0, 4.0 );
* // returns ~0.36
*
* @example
* var y = cdf( 4.0, 2.0, 2.0 );
* // returns 0.75
*
* @example
* var y = cdf( 1.9, 2.0, 2.0 );
* // returns 0.0
*
* @example
* var y = cdf( +Infinity, 4.0, 2.0 );
* // returns 1.0
*
* @example
* var y = cdf( 2.0, -1.0, 0.5 );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 0.5, -1.0 );
* // returns NaN
*
* @example
* var y = cdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 1.0, NaN );
* // returns NaN
*/
function cdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x < beta ) {
		return 0.0;
	}
	return 1.0 - pow( beta / x, alpha );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/pow":77}],118:[function(require,module,exports){
module.exports={"expected":[0.6416716225361978,0.9999957036742704,0.9999999892620162,0.9999996520914716,0.9999999986688375,0.9911573406070928,0.8149384296661808,0.9997180104978953,0.9999846619007229,0.9980881844897354,0.9948798015837523,0.9999999956802624,0.992725005848949,0.8773055504795827,0.9999866032932775,0.9999999411950884,0.9876435532465836,0.9999516486176963,0.9827889893142635,0.9999999362706236,0.9999918871507338,0.9868678195868542,0.9999968826838004,0.8598248632596801,0.9999964404573964,0.9999651115089033,0.9988594469672673,0.9999999999396841,0.9999999935775227,0.9999930957036425,0.990987851445027,0.799970914291873,0.9998337975448213,0.1688215689480813,0.9999993167629845,0.9999959198534549,0.9994212582163888,0.11469004799782989,0.9999868037905688,0.7683988978603162,0.9961150206618916,0.9996298730083479,0.9999888552611009,0.9999915990987008,0.9999999924702021,0.9999887453578092,0.9999999985129954,0.9999442060724628,0.9999998992893,0.9992325454191734,0.9749543981504656,0.999634651777655,0.9961979288195368,0.9999799630536389,0.9990764472139049,0.9828017424036388,0.802046020105476,0.9439435977402919,0.9946931440019965,0.7790546849160983,0.999099482841558,0.9939544105836269,0.8116176014389161,0.9991520950374088,0.9740154703618907,0.9478896178996501,0.9996638860298352,0.990703911567992,0.9999533316187684,0.9999999674793931,0.999973893911009,0.9994609579869115,0.9240612689997998,0.985017272952582,0.9343633339592681,0.9998497062563907,0.9999999992191314,0.9998786412804169,0.4871690337533868,0.9731322700954192,0.9517638832206512,0.9371528547774418,0.4595343588377646,0.999999939219631,0.9996368603039408,0.9536334136533033,0.5508437091104375,0.9940261895679173,0.888065681769723,0.9999972961213923,0.9954235300903781,0.9983619482633214,0.9995632050332234,0.9999882760514196,0.9999692510897309,0.999999594185704,0.9986468534126167,0.9588240698283497,0.9923411078790715,0.9993065747910588,0.8994026900733082,0.9101655474779247,0.9922674513102001,0.8838934558239688,0.9997510590972016,0.9997971385011377,0.9414654781565042,0.999827612625229,0.9998763019443493,0.9982189826498835,0.9932419043980847,0.7713710253055415,0.9661288816269721,0.9999973493416833,0.999814035849599,0.9999933968212035,0.9714461492371598,0.9999669475374345,0.9999530681632155,0.9807276949723062,0.9990913822696633,0.9999992910588552,0.9988243701942398,0.9999945714871573,0.9979659592543498,0.9999998693631711,0.9902718557215596,0.999997953150404,0.9998392771934715,0.9999998249875455,0.9999971969901,0.9752829341701065,0.7134786694532302,0.5237673431223053,0.9905171113924517,0.9999799965967016,0.998148702782013,0.9999976868334046,0.99959243221766,0.9962953809479791,0.998530618908626,0.9999953961314058,0.9913032056636153,0.5980022522553682,0.9994731080424808,0.9469722742994369,0.9999774817220979,0.9999441140870968,0.9999928141229409,0.48115246759871844,0.9998264762760445,0.9999907656422945,0.9990141486405332,0.9998751337929799,0.5644428348348494,0.9999064690446567,0.997883749984308,0.9999993016918526,0.8085937566038836,0.9999969874929336,0.9999994408613161,0.9999867366758293,0.9998389388644255,0.9973780332367645,0.9957644637825109,0.9494677609863196,0.9999995021929406,0.9999575548879762,0.2264361066208398,0.9994238690215548,0.9999988452222102,0.999767933262186,0.9999921419124268,0.9997296190557255,0.9999976487793186,0.9777795039572874,0.999561875497248,0.9262971870570906,0.9999995951102453,0.9999985502327358,0.6440835699720309,0.9999957157827827,0.9941489010383318,0.700100352105289,0.9959620287415937,0.9999586531167582,0.9932170443764684,0.9999999828701253,0.9916758972347645,0.9999791362188042,0.9491959713463047,0.4060915481597659,0.9999544702588721,0.9995096065372671,0.9999987145337409,0.998374787941085,0.9049525879894151,0.9999945094874038,0.9603132938374646,0.9969849689653173,0.9919339907373131,0.7537951182022885,0.9972546100977073,0.9598114693317237,0.9968198797332307,0.9996278480124098,0.9999644846686985,0.9982940966002704,0.9822379686367443,0.9923016285716021,0.9999282970248269,0.9905613753721008,0.642143481281221,0.07984048245299169,0.9999514258344862,0.9874329933533933,0.999487794287577,0.999975196167339,0.9999905941786551,0.9994022341747596,0.99999909430538,0.9999912566359902,0.9959866934632985,0.9999956014835293,0.9941521403612039,0.8323260969932044,0.9999979914429683,0.9998510311870094,0.9999994229222195,0.94901857746084,0.9995413165979007,0.9999617177200045,0.9968820487598706,0.6831980543641905,0.999436312845322,0.9999640483403934,0.9962868278392742,0.9995206357133376,0.9999999935807458,0.9971450792779195,0.9999705690068437,0.9999996360379403,0.9967194954398351,0.9999986002806197,0.9999999999862856,0.999998542318236,0.9792719333532464,0.7126867240852961,0.9960412124477401,0.9271014981597778,0.9990438660830889,0.999609453405688,0.9984386055388756,0.9999999985505786,0.959487769698454,0.9517179146525474,0.46911261583969,0.9968832554084209,0.9999995311787344,0.8196539308909578,0.9999999997687813,0.9999956527920937,0.999992860982561,0.9965553078586714,0.9999916326147922,0.9999993621540069,0.99986927640692,0.99733128613397,0.9823399205999188,0.9999901906983507,0.9999823941190409,0.9999820875749634,0.9999999814909662,0.9946625430194626,0.9464162649556199,0.9992263217806706,0.9999999807606221,0.9999997654795361,0.9997136501786756,0.98284613242766,0.9999999998242776,0.9989723699624699,0.9497841955940692,0.9999258138390682,0.9995701284187268,0.7581959982805154,0.9985904528376834,0.9966397464534951,0.9965954059216342,0.8582640132553004,0.9999997307212276,0.9671966039344106,0.9999979060368155,0.22874840768110627,0.9927993588397799,0.9998915444696397,0.9999999790057983,0.9999997154760227,0.99999106303673,0.8228923754756478,0.9999784984108091,0.999999901961627,0.9999990088844157,0.9984077598777532,0.9420677361220675,0.9999959018546752,0.9983206024685433,0.9999902029867694,0.2903499640079218,0.9517279072404445,0.9968918576584218,0.9999999885940966,0.9965598700708973,0.9999878042062535,0.9998941358437784,0.9952073014132399,0.9999991588591516,0.9999157465604361,0.9999411914317874,0.9999999966062423,0.9999218904871344,0.9992271415078061,0.9999999948431175,0.9999992425972684,0.9792364548445424,0.9219888754864896,0.9999969519796733,0.9736169967959293,0.9994791622167308,0.9998821177178883,0.9999586563982039,0.9999999533674566,0.99279550252529,0.9999999990963421,0.9999995451864467,0.9999995706993049,0.9885492229529014,0.9972808377925669,0.9999763865469746,0.9999943345975315,0.9980384507543966,0.742735255322733,0.9994356329001581,0.9998740322672015,0.9999999923907834,0.9999997799847028,0.9997721667427876,0.9833384119208897,0.9999303133940469,0.9999963640870796,0.9989334713889453,0.7970280606702804,0.999999664988123,0.9999993808024277,0.9999764023491391,0.6276552991478616,0.9999763578458084,0.999563091200864,0.999899867548492,0.9979361126037272,0.9999999297275077,0.9964963116395185,0.999999999996952,0.9999972372765693,0.9997183931583465,0.9959817126994677,0.9999992272035515,0.9999114036470514,0.999989401899553,0.9942690058204148,0.998119416423702,0.9999999978127386,0.9999934274148171,0.9999999896695905,0.9977587191570753,0.9999890039246506,0.7115969514242955,0.982907049238889,0.9975074699788012,0.6857506538654281,0.9999335047919581,0.9999999911563923,0.9999999992994505,0.6299220339428487,0.7338662340222374,0.20233138751198898,0.6462366387227882,0.999650322301368,0.9958186161298866,0.9997891189199604,0.7524536407196574,0.9976019698415082,0.9999999944629997,0.9792122220924411,0.9805331419480235,0.8687509513192954,0.9999937604244834,0.8620855677490628,0.9998925453596483,0.9999794086574766,0.9997544425450836,0.9999657168125236,0.9999550605031357,0.9999799547697504,0.9021945203818227,0.9999961947794602,0.9999345887328474,0.9994774783565197,0.8504021921424627,0.7913322310178287,0.8103767339529666,0.9999984080463431,0.9731341068325143,0.8419685662282838,0.9999936854063192,0.9350168722501201,0.9956065588935296,0.9999968446533232,0.9875823847450127,0.9999998885429415,0.9999983049314368,0.9961538679149899,0.3067597697903929,0.9999999999995126,0.9937928014877954,0.9946486831066738,0.9999999999997377,0.9995017126942992,0.9997775442867878,0.9996424831608601,0.9999488744029209,0.9999999843865149,0.9999928963572241,0.9993511778936569,0.6425636795057268,0.999996895399858,0.5245040430847343,0.9999709571771129,0.9982946568497245,0.9999999906853873,0.9995504608985831,0.9999032183288741,0.8644252620556954,0.9959063836111804,0.9815870141889508,0.9999999983479101,0.9999996660666001,0.9999919889203172,0.9993975916912662,0.891886471378872,0.9999882116804762,0.9999971080506573,0.9988048728463227,0.9999999990369961,0.9999999668960227,0.9671920718135955,0.2923281100541085,0.9992638145121846,0.9930820216827023,0.9999990412380508,0.230145157455925,0.9695620767015161,0.5477410705666617,0.9999923054929132,0.9951745511796254,0.8950895791051292,0.9491578010039899,0.48195249713901467,0.9954738721664492,0.9998565677540151,0.669730333963225,0.9554865812869268,0.9418337129873676,0.8039032393768584,0.999999743777647,0.9999996690313638,0.9999998042937881,0.9982806106203919,0.9999986929026357,0.9999999457646135,0.9995308913957337,0.6865882567048252,0.9999566062070672,0.9989825815160082,0.9999999155504457,0.9999741500313682,0.9240405123002142,0.9999997031694675,0.9999982798133431,0.9862491559223528,0.9998316197342508,0.9999823259236881,0.9999999999549514,0.9413671751811357,0.9999998756968178,0.9999965484337499,0.9402702097690777,0.9954830451505788,0.9983208700055707,0.9999997260485339,0.9997330893737416,0.9990871147982988,0.999378279231489,0.9279976544608292,0.9912146767841735,0.9991747119936172,0.9999995380954735,0.9989067575030046,0.9999921453248432,0.9997888784002424,0.9999875809442345,0.9989723558123756,0.9987227047594833,0.9999799701980187,0.9999837884090417,0.9999874429675389,0.999999212539117,0.9999702261517628,0.5415861308445896,0.9978449554666599,0.9999978068506316,0.999939883457093,0.9914517224833466,0.0938328466434386,0.9996996792265583,0.9389980438854055,0.999022035987694,0.7346513440080064,0.9999971617164974,0.9999997350941914,0.7239501159735893,0.9099591024002821,0.15390864354993272,0.9999995979231944,0.9381111242986062,0.9948357535524283,0.9982118535410922,0.999999937299616,0.8799528821412456,0.9999999972225749,0.9998053223307636,0.9994475144280904,0.9999999991839734,0.3516883425943075,0.9999932549679236,0.9999979502816051,0.999408151268746,0.9984827487290909,0.9999999946881588,0.3805877451357722,0.9999935288676617,0.9996793734052517,0.9477462615960098,0.9998903885054832,0.9997104677198286,0.9999445091645146,0.9999992594905633,0.9996187323185947,0.14086368249638304,0.9999812890992731,0.9877779906759904,0.9999993154018305,0.9760061032070786,0.9999999592272426,0.9999984122502146,0.9999999990063152,0.9980208054439373,0.9875686121134545,0.9999928061366447,0.9641488649491213,0.9626226122896501,0.9999636420725698,0.9996161327837584,0.9997827724713695,0.9999999952964789,0.8761247002696397,0.9999974959991694,0.5795702477794638,0.9997257674512875,0.6686460778898029,0.9998699549062652,0.9987428284968072,0.999999511221497,0.9995207205075783,0.9999999999801347,0.6837922258252989,0.7481591390305002,0.9963906086251034,0.9991124800606572,0.9999994548826954,0.9986122307453812,0.34479163274551483,0.9915370997253057,0.6456116356924262,0.9999999953460954,0.991125675846887,0.9817123850701075,0.9999971747899795,0.9999557746908149,0.9906882168638984,0.999999912310726,0.9999999882503209,0.5959561887341662,0.7271828560735258,0.9999509205929578,0.9903339616166991,0.9979980214581098,0.999948036299363,0.9999997715296095,0.9999995765863604,0.9367258826823325,0.9977380104530511,0.9981967925917097,0.9998424188945045,0.9992328611095103,0.9998898691234742,0.880109653216252,0.999999935994229,0.9999852077316423,0.5176383286887034,0.9999999992422357,0.8085833161449211,0.9999999835024922,0.2390663180588437,0.9999773318771347,0.9618960056223556,0.9796640483869992,0.9896318179252509,0.995415768080408,0.9883398031923218,0.5403157648031562,0.9999965482916062,0.3282546313970909,0.9998458403622436,0.9983820708271955,0.9781108310559578,0.9964941420692704,0.9982694175185496,0.9970661220373005,0.720893730647905,0.9997772876001377,0.999996155318629,0.9999989623462391,0.8542385168947931,0.9999948209330842,0.9999995640646653,0.9999670160695708,0.9999617758013557,0.9979243725287681,0.9990324962439291,0.99955763901342,0.9997158107890312,0.9999970857546165,0.9999806088883205,0.9999338308875267,0.9995434291740082,0.9996297596682716,0.9993685053706929,0.9999984501331274,0.9999999888209583,0.9999999998917237,0.9793533783571322,0.9999999783152401,0.47166055985062605,0.9999068592148179,0.999450048118928,0.11141439571794454,0.9977033640851325,0.9523643786716678,0.982921730822356,0.9999952322365996,0.9999424346812531,0.9999999988524231,0.9559175324725053,0.9994275754295274,0.9998659277218512,0.9999974983912884,0.9999779386795151,0.9603529174316052,0.9262281140434327,0.999879072745741,0.9643161064920588,0.882375192517845,0.9999677858193229,0.9999940267090187,0.6729584872881815,0.938851882375843,0.999962693917481,0.5098493288258864,0.9999449028244585,0.9997901655915272,0.8403638158332511,0.9946711420187708,0.7319783973702936,0.9946461840582159,0.9999985588741014,0.3841422745235591,0.3589934677020452,0.8921553080154626,0.9903190742558765,0.9999999927573133,0.9999999408130635,0.9824863491467024,0.9999999292920423,0.907416090842915,0.9999999918210799,0.9994184240665239,0.9999913544428146,0.9999919643688411,0.9999408981945923,0.9943979538160944,0.9860425102033931,0.9988409757454527,0.9957907912947822,0.8777455670773512,0.9999958411032671,0.9312512114293139,0.9980578655482355,0.9999993514222468,0.9989327886064235,0.999999999889258,0.834361455475701,0.994914676034701,0.9996907466758022,0.9942521061497132,0.9999958645565199,0.9134510715140953,0.9995562338763004,0.9999999079346938,0.9991371352286058,0.999683797695029,0.9999952124149526,0.9999937873699879,0.9998717576039756,0.9984537325285027,0.9999694754369011,0.999999999846894,0.9592721401513481,0.9999998547837081,0.9995883756213134,0.9999250925520591,0.9999968714283941,0.9998820905830341,0.9964945564650752,0.9999981629283944,0.99984886170091,0.9999742768139005,0.9284269133274803,0.9999588839970736,0.9988078954650972,0.9999397104857757,0.9371040228374604,0.9999770418404073,0.833310830848782,0.9748325578953865,0.9999904049071815,0.9999900141862632,0.9949673397729597,0.9789313572576055,0.99763895237402,0.9992382956765987,0.08778984353181507,0.9876254022698265,0.7538035663654317,0.9707508066429108,0.9999922582935895,0.6707459904991443,0.9967969032025422,0.9999980337753408,0.9784894454926392,0.9999999884978901,0.9927714522816681,0.9423529278690878,0.9650404147663708,0.9999999905643887,0.5856912036564821,0.9999999775889455,0.990862727278602,0.9999999999892598,0.8287713013437088,0.8207567649657631,0.9998400526444462,0.9999999395547791,0.9999912714582743,0.9999688219487447,0.9998411138254791,0.9935110758473462,0.9438743370085322,0.49555928669051275,0.9998480641115757,0.9999991807530973,0.9967304566706245,0.999999978187308,0.9999803406560842,0.9999990903793567,0.9999999100423415,0.9997430987589966,0.9778087973918178,0.9999999817955696,0.5761082781762776,0.9992715101686424,0.9999999967422248,0.9999998859126652,0.9971723405115821,0.9987822019433616,0.9999861583603697,0.9667104993481637,0.9996978361128437,0.9998941204306331,0.9999893511229376,0.9999822821734666,0.980281582400248,0.9999999722680282,0.32407118422598424,0.9998648373946465,0.9952036202958695,0.999999441390181,0.9991985082054269,0.9994704555222123,0.9999995194136718,0.9977485699307491,0.9999987010765853,0.9999810436823506,0.9999948588351034,0.9998388193060215,0.9999998748002895,0.9999938963813715,0.9999999999964145,0.6388125207251786,0.9942387205559841,0.9917402179680463,0.9503480997242834,0.9987200034841458,0.9809414653278783,0.9922130867025813,0.9999690593245157,0.9995644375271571,0.999819702307867,0.9999009479588136,0.9999897977846889,0.9147450125582346,0.913113225451545,0.782508108232292,0.999999971337066,0.9994769928515441,0.9976686799790623,0.9999999969970985,0.9999999746082677,0.9970102820534793,0.8580586324133672,0.9831663577585489,0.9999999779309706,0.9996416898402938,0.9999997262795717,0.999999981493264,0.9997841400520663,0.9999968917457294,0.9999999837035703,0.9999995429238956,0.9997918814917609,0.999977288656595,0.9894263982806399,0.9996084327785628,0.9995698954490606,0.9996597526823578,0.9928431117525752,0.950829791236099,0.9999999963341406,0.48315930801174956,0.9597093015296467,0.9999920424209433,0.999976560292242,0.6331376899271246,0.9999941027158629,0.9218034063055249,0.49994263044384846,0.9999999748533841,0.8502670655347072,0.9997619343594495,0.9999999999917061,0.9999928719943655,0.8755752992715822,0.8486284826955598,0.9969333349772558,0.9585688593428612,0.9997765443475481,0.9999989738078346,0.9989181526696942,0.8407916516205549,0.4815287110684735,0.9682778367590882,0.9999999170466971,0.9999999998790992,0.998068001424089,0.999999979542456,0.9695777493593405,0.9704348529286492,0.9999984368173334,0.9999999988019714,0.9987900814258666,0.9999479314377143,0.9998718781959797,0.9999997575210211,0.9998595259650327,0.9999998367770063,0.999998999788257,0.9988100373725811,0.999999999816972,0.9951325400386393,0.9999807500883504,0.9999736957770555,0.9999404402309494,0.9609021465350434,0.5684484275167635,0.9998401987450275,0.11987524297103525,0.9966442593820309,0.9994949035009114,0.5048778678140062,0.9999993613706005,0.9499311360763913,0.9965660933446583,0.9935692497760394,0.023498372835408454,0.999999819459048,0.9999999999998724,0.9999999771532232,0.9999620547194542,0.9999080438870078,0.9999817606265327,0.9896197627358232,0.999864596461721,0.9998398135319045,0.9996341451028732,0.9970988779762981,0.9999991933493468,0.9999976730992218,0.9544505206224039,0.9959561603789713,0.9999303989485996,0.9701568346212777,0.9964930007027675,0.9999993516446704,0.9999999951561117,0.15251195896156877,0.9028045215950269,0.9484240338261387,0.999917144353634,0.9996672425503792,0.9999117978057014,0.9999839037522493,0.9994246560249127,0.9993686882346499,0.9964924312752557,0.993201939537115,0.9999758164727759,0.999990378668267,0.9910523974962979,0.9922214385703882,0.9998950425898889,0.48931028493300666,0.995766614980804,0.999993843229396,0.997844422342373,0.9985359101906439,0.9964800723644907,0.9983725559608165,0.9995894303342412,0.9998540997493724,0.9978987824354404,0.9837132814771979,0.9982478379342256,0.9971925556676936,0.9916464411232262,0.2990816945513506,0.9994386285053473,0.9999982290793699,0.999999506115686,0.9998840152566177,0.9999999999100936,0.9999808936548956,0.999998071584162,0.9997909192170495,0.9998886691319744,0.9998632972668399,0.17597678781360615,0.9997120170804507,0.995602425257289,0.9700741259657505,0.942647314703951,0.9999971785026378,0.9999999783474599,0.9999998528437949,0.999999956722471,0.9999988788943475,0.998881265312805,0.9992296399040518,0.9999215868775926,0.9999940199094871,0.9863077714692104],"alpha":[11.839365327571656,17.662379196867533,24.08839164772366,26.352932001737543,20.1573738765261,16.438736061314852,12.184520184680792,21.955866137325444,28.82278686203181,24.76897454713785,16.24584571949507,27.494660453845924,13.483405816928515,16.323141852762355,25.524427167214494,21.029133720638328,22.47256501239288,28.97530249539185,21.36864911175632,28.25633015003274,16.935388164665873,27.512355937811172,23.950911870367975,26.012693173918002,25.9601259300373,22.074084901732117,23.69065621077363,24.230425255429957,26.472405130463464,12.246883159128984,16.4177802433204,15.83332698795385,14.807161060462892,10.120052696278785,27.88188578984151,27.611730678019537,19.92269825358031,16.05388165825139,19.53075156623875,20.020652490237694,24.928013795632637,20.8320933569711,27.92851603740128,22.293533691593996,20.873358933342647,21.21426669987594,29.03705256157799,23.396087369192564,29.223946373881972,18.886179891348508,10.499182991244238,19.731310586063827,21.74653091042277,17.2053589694918,25.316957364217302,11.193015103874234,13.651209053108717,24.12738617295542,17.566738257522022,14.485800055498972,15.727288310681136,24.3726852415339,17.38632484419255,29.395410853616482,21.53758591986547,25.966843780900906,13.810212288635118,19.733453341540695,11.354405059665371,28.116182975118207,25.264738212099566,18.12585611336582,11.736914224168874,14.257025667946458,23.57478102937186,21.518508133958623,27.203805924927984,23.66499624055329,12.4848075088136,14.057243887443676,10.576557417356526,17.73266160547393,12.166093094837084,18.30358856160196,23.087066607522427,10.776881757228903,15.872411066767441,12.882655085358849,27.42628936820323,18.182997851654186,14.326109590694536,17.757377008819752,15.962866093678425,13.38393600544666,11.032355099153296,27.32294336857965,14.598316828251438,25.112202533893115,10.67456494851777,15.109693554511793,15.141351796898274,11.67182619570255,15.160771381700213,20.94756627479128,10.727159521895162,16.48245041398916,11.22935768073647,18.49026219370783,15.331740367165052,19.618090561194595,11.984886060772372,12.11581362292987,18.25992211132359,29.397187589232768,11.450395758498422,28.04017536781061,12.119381452228954,21.239939671803356,27.124231677078065,17.836595287550576,19.483799038533913,17.999332108422628,26.520736161854547,19.360080383391324,12.811524908334802,27.72443685607714,15.729496067533063,25.97443504175116,18.826645929586867,27.671614055435892,19.221290224195386,14.31163412442106,13.363480698947704,16.079655798293114,16.68863304784743,15.512349958922096,20.428939378578868,26.197625843092283,23.410465974663182,20.07921231913832,15.293907914624253,23.480485607687367,28.209281418271782,12.611929441687547,12.73518233056814,13.55010658044083,26.75980974463975,22.12334874084668,25.771558324883294,16.98027700403191,17.33820494840653,21.40607958776635,22.138270178340086,16.933625872727596,14.270125669549468,20.137804360085973,10.515035072646203,24.152134170345697,19.12621704690693,15.993293577063415,28.12291777971525,11.555439302508583,29.52122545724613,15.457938861110696,28.719443592511674,11.120975080918928,23.838235146433494,21.704279657995272,25.963516526098314,22.2184319385241,17.520280076746936,19.259238107565388,22.417367739028847,25.47697135734293,22.11446411732144,16.18397425431738,13.706610693912982,21.827782483897565,24.766680127543076,17.699552196936654,19.683420469937968,17.09714677324326,19.584245984622974,19.91775160481786,20.270131078283526,16.016105659015704,26.65269070153736,26.23635445412281,26.746030373650235,14.398174017264399,21.43431856215429,20.78557413051498,18.69633954629302,18.35769261749956,17.889731438707205,12.120811893398727,26.057854488153886,16.36868763124834,13.956776480712447,26.15230587819139,12.405415777638176,11.18496609505463,27.416549591672762,14.195909380278952,15.384840411524197,18.73054805634801,17.341267369943004,11.993340311924454,20.749397812696024,10.514911518923395,24.375118757139912,10.924262393294008,11.717862786604506,16.669683931120936,18.15116539761181,29.225275794239565,10.398913270286974,25.348650232525006,13.570725797784377,24.569212132548056,15.461444059388171,17.55273595599144,19.993187152220308,13.055934843719154,14.914783406546261,21.570394297072024,24.535848530678784,14.6867130175206,21.60592180327373,21.458765180477283,16.99660827922679,18.32487460028886,19.015724374125714,14.819930004876687,28.042794344124808,14.375015346491566,24.64482968093413,21.828799603621324,23.450458260980618,18.95919751411157,23.916737725019004,24.795043369460036,18.02305464181451,16.07296843098996,27.46380504722637,20.750966105814946,15.001131818543886,18.629619186452032,19.675103657081902,26.1654592447721,15.590525915902816,25.320011988194608,12.49012231880355,27.135320100728638,13.63974576737753,12.145526994282996,19.91111642447393,15.52776335280658,25.147220110386467,24.084634639201262,27.95718671629244,14.440031807855828,28.65950807023145,14.153026644702447,28.204223047697642,28.486413574265818,11.601454960419964,20.495387139886084,13.55434148728663,28.62978947412243,24.93971698563858,18.535667707091896,29.227991161475906,10.336677493055092,23.85632350153026,11.190430258843037,26.49797666072116,22.642140000382177,18.62184285374452,10.985367658641074,29.524794813580222,10.367571905696312,15.23458099531322,27.882726954148453,19.783860587654182,17.88780200120673,24.25374759710847,23.839658230682083,13.525610867704337,12.492297901200239,28.30210298664126,26.077171427498094,18.635862340235427,13.637273596156959,15.652329526205527,10.991364593043414,23.337094614465247,29.88131569042561,28.29524700683968,27.404439886433188,10.976763728494209,18.842889225411746,21.874562530454927,10.431081170602159,26.4205903562142,15.704858724129288,11.548212308838671,22.957537889402907,20.83491637572746,19.429138996242074,19.15657774292271,27.38701492970804,11.220343099198473,14.842692455117156,21.507723424689086,25.373392248384988,26.23817305716516,21.391236863870798,12.186902667644578,26.515701155723423,23.27661804460948,19.7348525803526,26.44859362319714,25.804744987522863,14.841841926143765,18.492136731914,28.405559622256785,25.943156488627068,20.79590487047366,12.138911184985567,28.86903859916336,28.407177496934487,25.294394998348096,27.793351712727365,26.746996811090664,16.122135220512682,16.122525184639468,28.79979667480751,14.957937479398922,22.90647298905286,23.163739284935353,20.71091986935262,29.428429460297462,15.665063876220895,26.31839115036189,15.986202542610144,14.358420136843751,27.117384525358457,25.32919746878171,22.168228022863712,17.115491882589428,29.610310868399207,21.929191949295124,15.545468845523619,25.272987924808245,13.111195172315227,18.816088213970332,27.723516527898507,16.266701196381224,13.51145196306625,29.989396344907618,15.937941555883341,29.33556145954128,22.643471121821108,14.66771669480381,16.979570669007554,19.251684560814756,17.860429437946244,28.761485904171252,11.41455362003937,15.111051913522658,25.417605195282036,25.449348261099143,17.98087234627723,16.52893105576233,16.69659534459185,10.846604999512358,15.758307066852906,11.448662419619367,23.100206601999155,18.067297705950665,24.848768860957943,28.321667999590467,29.08709719698254,22.852692281907036,21.43249120647007,14.306843818206758,17.79164001509106,12.320382921548791,20.711492367921206,20.70294108932761,11.298740366714757,21.839181264419434,19.569649964367688,11.50904669719198,14.959289833843226,20.53858521672612,15.887856263412562,22.351574225743008,16.739275016286236,16.611437309425334,21.022437739611775,18.101332448089234,23.03013240614471,12.061797626567783,22.03296495860442,24.825693955196307,25.675562070762822,15.235005514109673,13.782610398241445,15.759785757606593,16.565987827396583,21.202153446034167,29.562999933439528,23.562711569099868,15.039968487695376,21.935554360750057,26.511275446374988,16.434075921536376,17.065010870229248,13.786395285094063,20.36863314405448,10.243238584938016,27.9174232164433,20.122828455664575,14.934094162096038,28.659297335070555,18.72427299473017,29.965061468210227,22.2549370212924,19.240831885166738,28.938284648023735,18.03287695945165,18.117705796947234,25.420383863035507,16.54562552467891,15.25712531894921,22.182951320193496,18.30628030460194,24.468743838981734,11.861259750452504,17.043884403730406,13.939371507764555,17.95870680068419,27.96585493027448,25.240703100581392,20.45254799005957,20.735874538089057,12.115024398253095,10.542521312864434,25.41420371316768,19.912758374741703,23.305944590444344,22.596802849929603,26.659819192347793,10.144688461379019,12.787928508128825,24.965211731981928,16.931729656407768,15.767515526913991,26.34549684845416,24.183076815928956,26.389956819696543,22.64347556095148,20.811188330890555,25.94638208477791,15.523455755683031,27.87541995643039,13.750489077667233,18.31946674386621,20.09275275490818,10.49430222976171,24.367575833366473,15.47293700093839,24.392186164596012,19.706941458749906,19.5468009322291,13.164808714517982,27.54567145742425,27.141786876723124,14.805117351269569,27.33041977722295,12.268631759889072,15.160756727361125,28.117131188829557,15.666699998879299,16.0368306423341,25.009835495423125,18.404939882942312,28.745604610588906,18.661946828381005,16.308718341289023,24.976731728937814,13.151054969525603,21.029552901820875,21.401616253276735,20.48685721959768,20.33382634880344,20.531245344014508,17.292254908797723,11.798718673560655,13.851319010932993,24.696716178076255,10.576663462651673,19.545726564655137,12.438894862411978,20.594340109477912,19.917663042316555,22.5848446529143,24.092651679628002,28.38360554942842,19.979516223318768,15.830305737186002,29.80430486048981,22.12267783732873,27.229420957756815,22.469574791139838,18.48149885530269,14.899110405210658,19.26724749711532,17.677405421011283,20.17300093654709,10.819758605586376,10.413450639907516,20.696068281332508,25.969613557410756,19.123860256668948,11.368371986111265,25.103408443671146,29.988189840681997,27.0931479303528,26.475545955732528,10.798497873858896,20.436524423245153,20.22757390683884,14.576100326776093,10.043952172855356,23.933823752763367,25.256206165453236,29.589535450089762,22.74569578434467,19.176155675696616,24.757745608873076,15.01312757218308,20.289759608129625,18.933757849012668,23.33997833684199,13.214398220967567,29.814140085737115,17.233566780901093,16.77997000319092,26.686889366744943,20.706888433546343,14.210524927607771,22.491419439644012,27.06788392744597,17.466720885469677,17.33107361510726,25.32569983592936,19.6759735770752,15.179941590067365,22.191376722806503,12.520975560962547,28.464463054929872,28.859294017084064,29.895111864461676,21.39467206306722,15.916431877043685,25.4321887741061,19.47222159206165,18.125467165579096,21.557718625601524,21.860852559644144,19.83884068428708,25.92244323698589,12.511511348091995,14.939455657942165,18.262212762703847,14.385605410016527,23.334565682067804,18.528236183503722,14.54276485173239,22.079333237782336,26.19750648508044,28.989067145200593,13.529125134654162,11.20434323325786,27.036176118117417,15.222338077552365,21.31264891539878,10.52411715636691,26.92360859557568,20.024676133956092,18.886538773670484,29.127489403187617,10.25233144595607,10.610135967345041,22.1525361856428,20.757162416722778,10.3598419153878,19.18403435821341,22.628379964717602,12.267188631048809,28.87656720615412,17.450960638312093,16.296057972149537,16.2183029126539,16.19378790749955,26.377468535862057,22.933292816191695,17.9956212348595,23.736955584308433,15.425192925856592,25.735952498494854,17.156771826899806,14.839917641475173,13.595565432913578,26.038122515455967,24.245022386520034,11.718490922043676,23.925475030427933,18.37161427189917,28.29580642416042,27.686677922473194,11.204856315803248,14.639941147885303,13.815620013639268,13.088958520006141,28.551880751893894,16.220417102269934,13.626093147836883,16.865657574845926,10.608896440745985,28.731165224435852,12.779880658534877,21.927918752443937,15.674146485506215,12.2630976532853,16.04948287666104,10.476297128842127,26.12489587489077,17.610435492726747,20.169583150558168,18.92046637314094,26.64627398423179,29.69974967217854,14.005021609259103,26.13322797418428,18.480864672162397,20.35703706351601,23.117156884268788,16.24955750046044,22.509629147705013,18.14858408932844,14.808298522064618,13.289436254972955,17.695523002046578,14.1618658639198,14.638880179827387,29.67700303165028,24.61640365056877,13.241547179790416,19.69516888871007,15.073193097566051,15.0650947823359,14.63854458671368,22.828863856168415,21.37373804580786,13.908404422041922,14.036673081056929,21.499661400357375,21.44494221423181,29.15664947508973,10.44857826389257,19.974044906946027,23.502917914421353,18.39223536525463,21.464253527135885,16.724312491736985,15.716108321601215,20.5470447021913,16.851270872222702,12.847665199062837,29.16881758479024,19.34120627375714,15.065097665165329,25.894116597806793,26.37900220565701,15.054680179080592,15.928573988258389,28.510074208415176,25.297658060332772,15.130686017254543,10.349227169262495,23.177818528105014,18.01687656235498,10.083535355403894,10.187102918894237,29.39724273722746,11.256554278471933,28.77646900528081,19.31341216569907,19.97461625453484,25.422660702699456,12.6997321396765,18.28455630724498,10.318342202605448,20.503498795054945,12.70314500061447,11.901504781115708,16.201402855879095,21.697579733021723,23.746148699535187,15.458716458502956,19.90888274155441,19.711178214862393,20.76353097013029,10.14963659117694,25.026713185587877,17.478399985306893,23.86733472060982,14.52092512873536,11.143888233558737,16.711973764002085,26.588429812210922,22.73981930475836,23.644457647218488,27.307831700274583,23.977698756032453,15.210930856322697,11.137221454290454,24.459069342942115,22.91803172314094,15.345800805364767,21.741964491354587,21.22050633082415,26.40792838516965,11.031297419196292,17.729083414577914,14.98279409871377,12.585150687652135,26.211563099101284,10.347597801367371,21.29356710507271,21.384108957655737,29.317706841749512,18.38101122825671,14.487687555218262,14.858416835390692,28.2125297427498,27.82040590032294,20.248125184550986,22.039267101500343,15.819610383991908,12.281856230739345,17.883089143204423,16.19015558069694,13.094328266982146,12.696018869569734,15.107394730886966,15.815215482342836,19.628121544236766,29.244001065885072,13.553578674515911,14.109286404412291,15.979069222043062,11.2614242644457,28.96913526377,23.103407348825815,10.8826971139016,23.168905984872733,22.382690421448736,14.592374134994813,20.066344530692405,23.970239880269677,21.01035087286414,16.645134550568752,10.043038257526668,28.38553621190264,13.715471011325366,17.176957764097228,15.640509104173624,24.519597709269206,21.090884646092118,27.99933292167699,15.700350963950541,20.072693754853425,26.543969287182207,11.44691692095989,21.742998744018212,13.512608765966295,24.09590786944211,28.385452165553154,21.214322652309818,14.967449013339573,26.50164848877035,11.65440647194545,11.628716397444453,20.341933843339742,10.448229849917642,12.26462429861555,19.255135275713535,28.006920055256806,21.26604162415168,17.61954657120043,14.801779281217522,24.95955965808449,26.232771148216194,12.29509055491269,20.85854095013812,20.747129617590705,27.974613225976906,24.71445831293878,25.0248975852157,18.240230844522728,26.309692904540846,29.188992402631957,27.468701466270144,27.762393766579706,24.972157811616796,14.952822363768693,28.685255442042017,16.054776068464427,26.396549078552297,17.791502427442296,21.272399150439174,28.440577513580774,27.336763421791957,13.741530154539095,16.734098848102423,24.47493246161393,14.39995461030282,14.895372017986897,25.18593483204348,27.047326702619152,22.107160814261437,16.099041720268357,10.049631770870686,16.775833132110446,22.72841605687894,14.47846638666675,17.910889729074853,16.019893248242482,17.032404306234113,29.199880019302995,11.200392442431717,29.33325095648503,21.851611940419517,11.99064097862208,11.672825604555182,16.18874553297153,29.492704651926317,22.017650904827025,16.497049049885618,17.298919592446445,25.437194310365193,29.214104737209414,29.006172168015866,25.222749794557757,22.165398270721333,28.31395598383409,27.206245336931325,20.80816336698222,24.570593124315483,11.709237280594472,10.690511294978805,11.12913483549239,22.1529949104237,10.688094152264975,13.001364969486374,29.27048591049102,24.47431034085294,11.721390236726528,27.454636869204727,17.37674451536964,10.584631423875512,23.2932794135907,19.749709468596613,13.876037504028602,28.682584697289514,19.97066620849108,24.011880119570645,29.11310620568484,28.862135170677746,14.366784559590453,18.540565771538418,22.298854226056392,12.365720074359338,10.337257720819713,10.164626741762088,14.22072953102148,28.18343325803673,27.105672100677157,12.17333151208737,21.95988403814054,11.129222191042967,11.985074828211285,22.141278487432704,20.084073914636477,13.914225790069326,18.00141506456256,21.23033742408704,20.92173616690777,21.470407107156735,23.6156968955175,18.371803145137054,12.716045287100005,23.14710420093382,10.008078929524338,20.94207533467056,28.476613393901694,15.767312736486168,11.512094378449724,11.548734284846685,21.021791843606564,27.180877833032046,16.753313882105715,27.46364310528088,12.134088304057169,22.34923463995488,23.18559482022372,11.493869781219686,17.20087255983379,21.08200680706046,16.406530557691717,29.810047343597166,26.20329992693833,24.418499387698983,26.33008503898113,27.731638650255746,20.529391799774473,17.35384618340396,14.818296351399173,22.513319595117643,21.996547833997752,15.681140248548857,26.850467023637687,23.908223548288912,10.735597364867115,16.243451771608086,16.904954235631617,12.710062672668162,22.113652937955944,27.974802333865142,13.323696413501196,13.531536445349852,17.521108195201386,19.181833670120735,12.801667643118929,19.813754022261435,16.747408592775116,14.515829124961567,13.72715996293904,23.144817111455755,25.044149289478778,17.23470140888882,16.22676696021678,23.543878289316492,10.9315112093189,26.465752748847613,24.289628031963186,26.633794599209093,20.351584956476415,12.376274337096614,13.046060638777721,12.183554783291854,26.53157969840757,13.488908670643575,25.805690531999986,18.22551842738195,24.984509240762783,12.324118653185021,10.543982169901259,16.944298918376518,25.638319197539353,14.379815378075161,20.588370471143303,26.143936839921132,15.726266826565984,23.128396821808295,23.23536273473784,22.215081125168208,17.004304036647568,20.081698848495453,17.706782500559925,14.72506049427064,15.72724315629953,11.216035742458264,11.1711763689926,14.816673943052606,23.08125324152613,29.337058912080572,21.352447000148675,29.793038994380254,26.26081615907793,12.885415997669302,12.592273896499592,21.494746191942564,24.46794776813533,16.112478180694367],"x":[17.698803538624244,24.58637013868661,24.66425449437251,41.967617956278545,29.996841686890598,18.33578088621957,20.261709547050945,20.245932646652662,18.49591683250068,31.619231808252685,32.65836952795934,36.04506980974426,14.71695818458408,32.97788621969763,40.75926778567321,34.78953393785431,23.82191936344281,32.462065239269045,20.811134481969578,39.43770840114509,25.458348778606748,31.105325844092324,40.91141864832541,23.50327385246149,17.11211332279096,41.75672781987805,26.612898161034344,26.982482310485622,37.739150170084216,28.628408077273004,26.296924111973183,27.598793566706043,19.178889118708064,21.001952472762383,48.161368438149154,24.505921353209743,21.015991531274945,28.688516839588665,27.336772709388903,31.32716514289669,31.640343119569646,34.02079932272531,43.59754347780862,44.072478591275605,32.430858114233295,42.92626057449574,31.911031868582576,33.82489821908841,23.59898853901004,34.04029593584043,37.86585606024811,43.06152050951743,36.77214998957106,29.29478704819396,23.89990289789417,41.12691500425595,28.09591671050665,16.28960599089456,40.33874725522689,21.079625305258165,20.550693299433206,33.51785153941941,31.210450438836773,25.249874185765297,32.265838494778436,27.092891672557535,32.21012999810321,27.40780500498012,27.516565356177203,38.647796739511335,34.723345633638004,35.3680920355893,17.24597777768443,20.23053604032497,15.691641337106992,15.517153345442587,22.88211561921218,35.011749348193874,17.778706029916982,36.62467787878522,31.249803754714367,25.110311471082312,29.055128655103445,25.447622065582664,37.619295928777774,26.87337149236631,29.60230374925006,19.99182501170036,24.183307437253887,36.85992465006022,39.24359485277742,36.33340874715137,44.62513086815767,30.440733489888657,28.960982313634275,32.959349903372356,40.898637810973426,14.698306357014033,42.577068872175204,45.59224917998419,18.476760559948282,24.943000360933105,18.315784706350215,22.186709244336313,30.188344678372104,41.482113136522784,38.27938708483222,46.825898969191556,40.88450649259735,40.95993558812959,38.308243362067735,23.665560377840443,24.23630075110175,36.5006912612966,30.996980121951392,44.51213887558656,20.101584485593055,24.782542350725244,16.47067703015372,23.832837355184793,34.241647008520374,28.086945747219787,24.84210423127671,21.76387843472955,33.865233460545696,39.02684998476553,33.61465957826957,36.425916387658944,34.76917383709537,44.30588458572379,20.187665348058946,33.92983045113956,22.442170303141186,23.906608165724936,29.078123124784153,35.50822351038555,40.01003996942877,41.663860428990645,25.164496756367498,36.27169699375367,39.41517985961079,29.817644687985915,23.93152937054111,19.62244550905732,36.80803051349331,33.65177742680486,30.80731758850274,28.876518633832774,37.16441404809758,16.62756325536811,38.578223625976165,33.64669470397813,28.740663120789257,40.84197640620511,24.552443047194455,34.75510944260694,39.92752264057478,43.85317659107102,22.239979239583025,25.53863717428311,20.509195328592057,29.843556843243753,34.93078822740358,43.00492407147169,17.646166698050582,20.24640704998253,40.23833766308042,26.287145395195957,24.030841714220358,15.704170792167297,32.045259396748015,36.442669561341916,37.5883265849146,37.38384359392701,26.21807990752638,25.132676901332438,31.498859709412457,22.773362712578145,31.51060913079554,27.98050367095322,21.665473158116242,38.59760562861719,27.8962247293822,28.353155099252685,23.15193558296827,20.965690809950555,33.56822259196441,24.404489994431255,35.21470462442328,32.33331752348428,28.83997353544821,21.452013766499967,33.04907110649171,19.376010640447575,30.71964497421029,47.07142842761897,26.368084653346767,26.342316378358728,15.712334667822425,22.438735998504637,40.70459442386371,27.015123328041916,32.988739709454045,33.14106406698532,37.00035265455338,45.19447974692115,38.52271242483083,40.19806091702553,25.91011101333845,37.10053893022531,37.52479337578711,40.17812282186046,23.726593873275327,25.114315041185602,43.98787787036984,30.912643911764455,33.90654481066923,33.76401418747542,34.02939907396129,16.89542008600271,30.269070369574692,28.68797111494077,26.329424933461997,32.54222112346385,31.45778722875638,12.438927807747486,29.155147361759212,42.7459192170857,23.23293023822051,27.19712391882402,27.890313787398853,36.801279937313424,33.1663048563595,18.789467000244223,28.18375241585928,38.76497315122857,36.35371413500762,31.846482007276403,24.27537323292708,19.566694401171684,15.80110539258638,41.64443139808894,40.178947002063225,34.603499496942185,29.47884673953844,39.513420455437924,35.64588976499597,25.05281558104347,38.908700807371915,21.936495046037052,40.52426488556864,18.368415341041946,45.44819099237745,36.44668524574449,35.194523467828006,13.789770113887101,11.823739177792621,27.121320571086734,31.76055767885545,12.345670115367628,33.72070533066776,31.588310247818928,40.150847679106356,33.06344909671115,38.381138472595616,28.82943874308282,22.61570660062845,36.95844976892937,30.616087397290055,39.63063950055486,44.117100407875185,36.818388649137724,26.659910212082778,20.27593433891541,33.45492886915204,30.741823752278528,38.75855366056152,21.891611762316977,32.08306843853398,27.29088747475288,29.672762304035246,39.41834394575649,29.937475027128386,32.91744444447797,23.20353734338382,12.096315876675163,33.25326763553068,34.37649114577073,33.26621801247991,27.82038042866522,31.20002078501835,31.193719395605136,32.18487081261188,28.940244431210896,16.346232700936962,31.55679329511119,26.346381793390115,48.96911836778965,42.49888588198957,31.650938275985894,29.34387674415007,29.695561092190534,40.96997792963596,41.853751052268905,33.059313285879746,36.13987119458871,36.73541032962145,20.408453356362884,27.039606586054298,32.20380023501278,37.79214757420313,31.476978237618916,47.31487577352472,26.999956016331126,18.24219515780932,30.30348530682893,17.71166670565272,40.54649079385753,28.5601965506663,36.36011871580262,43.07210514566503,20.117943328602372,29.33789838005799,30.24953602649734,16.70810942208321,33.82016885675479,37.297541699793776,23.306448414651975,32.49550598067375,34.910732767680386,27.75813244770114,41.085489180572694,17.271981608894833,29.560490718568243,22.183726174867303,27.800727484860065,15.602277415333932,13.088872010590173,35.413195516595266,38.29864238126646,35.59142160258525,24.135406007701288,20.70317007472333,32.835586787549886,25.220858629330234,28.919432462486128,39.03279157937026,15.677280612393524,33.12912852873711,28.255088206547303,39.83892855907679,26.39234032724244,38.67608620905949,26.704453290924736,40.927441394185806,23.76724581229835,32.87937918217412,37.33335485462959,26.6456881995707,40.20950208519783,46.08539787062145,35.61496245713968,32.444464699563085,35.08038690195825,39.40018182561514,30.010890566554707,37.4561086280577,32.459823451097265,31.139673361147263,37.45386863487428,19.30040873550504,25.4768391340132,38.47312865179242,31.161551127891286,42.343083642950276,31.014478175364854,24.65101140534003,19.786204617002813,37.533785222357224,25.080582786028977,36.41258882198089,22.441866535514738,30.209549799067585,25.076733466996796,24.806682254612667,22.956100976123906,20.157104007983893,39.20448677721506,35.3982327334195,26.066609967205707,20.14327701803582,18.209849039714204,23.91271644610294,33.411097522584086,31.17150892651523,21.289051708230662,43.91013872114564,30.64243448643398,33.770924032908965,33.061098655382864,40.45319764371949,47.97552618475402,32.55874097991655,22.354497965522675,16.282496717030646,38.149053482943884,30.11106864657246,38.09743608941573,26.204472766740583,28.92591055719165,19.639241728177137,26.419602215034438,28.479911157161155,22.469121044902128,28.01218484471558,31.561938054512225,28.68795023865191,21.876199561178794,26.700629515926195,30.42272040701592,27.57090877114737,24.446342712326512,14.921130466186554,28.484445940904827,34.54644926175602,20.919984876631833,28.95077823463698,30.63809725750913,39.32219841823064,36.917692987063106,44.63112043408575,26.04120596077868,38.22306239180769,35.89804492505517,28.200275953414675,36.40997803359484,19.24959799821963,16.681092674607157,30.119764571432533,25.962365599363025,28.325158341467713,19.616199326426,15.35107666457792,31.179946279191594,33.1331474206537,27.54131414047402,26.204468188281655,38.732753736485805,37.71185810815816,33.90385482646382,36.656282224217904,28.148283698452573,16.82125039650665,29.72834729560111,34.651491510782456,33.56019745303753,15.60163609199114,23.559132068117005,37.01316453863016,28.26357348290628,17.19077136488904,26.010321702290533,22.222030169934886,33.714948219298606,34.19775921109551,28.99271099295666,32.18803998451878,28.53185860979022,43.75511178797938,38.3184510053689,29.682203303312725,32.749625569581795,28.369400551164773,15.45490015497533,39.224852152486584,30.675336469453068,34.917754910180754,21.35957864077225,31.500881279059538,39.56667009301489,38.73900344689804,16.88255677093782,26.26540594742763,28.613869421125184,41.44855075135115,40.02246198393748,18.57212075338504,20.443996221396088,35.796584940838194,33.053626476661755,25.08256617318783,40.780029895995426,27.05299626250565,25.305029562103314,29.22917528151362,23.82152801361086,24.033453530354663,37.69868569560862,27.8699103988126,28.68739419408854,38.58432154166125,34.63497610874746,30.22298642869538,35.002859631813934,32.77096680530468,25.353051483750058,37.04544450900991,23.141371959353958,36.48561098273397,16.8468988442006,42.89368107935415,20.914284480928924,23.21491717469163,28.678144013344756,22.880901194303746,44.21907707792421,28.587324703047237,41.616690997078436,27.79121814846564,35.75062012935532,25.76169956742719,35.54433470914179,38.4275167852003,23.95142959437562,34.198740582773475,31.238101416626648,38.0045057728029,33.61589378252623,35.005581875804474,32.316286558627795,18.47341403659361,19.37605555678347,13.4757481533523,35.523865576330245,29.288188782538196,38.594656463882444,30.444311113558285,32.473823801807846,31.45507160486547,35.20691430277611,30.36286392346053,24.22443376260237,32.52595172166693,29.840832515187863,32.06735900687103,36.690573926439875,38.8493867263872,35.66444635809937,26.30891655046471,15.404439710727065,38.23394644580614,27.58498643292551,31.11920993171522,20.193837443833978,25.37248044602725,33.003933636708595,27.726165174568514,35.69077299269838,20.52339813649788,45.53947167896839,26.313122803829188,37.34705161225935,30.732618588170304,37.46680586394089,34.04633932253947,21.084915717694948,14.82759829389345,24.957822162536846,40.33085327464403,16.40035636680662,28.08725536824611,30.236429668724718,37.64677690722799,31.127176171678713,27.7950411727226,15.312297761303299,31.80352874555938,26.59590061610021,35.795935100682584,17.071578928973725,31.693721964851196,34.34012994466781,37.27941518451156,26.974748298222863,32.639874621877276,28.367949282082492,12.694226619000467,33.509879424114224,35.15397559783237,33.51384646482417,36.91238452398649,23.743005359745695,22.759278753803784,27.062815116865632,36.13331216544081,29.9767620561743,14.745517010284406,21.562789497273652,35.92915212961254,25.652157951640405,27.28262904652329,36.10545668017154,27.963709151674003,24.625467135089945,25.2943161738298,27.446181143641457,37.06711161962385,28.383416855157922,40.015651957464165,20.825469522970398,32.00136987367932,24.847926064870638,25.297058287816867,16.9801593511664,27.47080784281168,38.258562015850295,19.845643457943492,35.20028074789296,35.575282502012726,27.433259656984024,31.045659606456365,29.968645602846404,42.13289329202622,24.46150683286846,30.52754442310076,27.901844739882925,39.53750749631284,28.776606885204806,20.695625122729478,37.58961589685039,17.227751558344394,37.04932276489697,14.906305907573042,28.97362081024162,30.36947179881321,21.061508451744807,29.572686849675264,48.434820721425666,36.52558752126042,31.33257970253529,41.186988728782765,38.669577533069415,32.980338129965254,32.83629025812303,25.29062070993911,19.239277130528762,21.002758127169308,37.09941625860272,41.14278058676476,38.990169069417924,41.74785904189794,18.84361433252984,33.53745284144585,37.13204482478605,20.82402359008948,27.315453877780445,32.16106221873886,33.731840808917546,30.71535943405744,29.672586354773063,32.35148504388114,38.95499249730884,24.73885625489961,29.982466157425186,36.96930626998086,40.923741500074804,23.28606002882879,28.749817472425583,27.76406268389568,35.61854064503539,32.23007707289829,35.17841833728373,39.26632426034078,18.91176172359923,15.627858619831773,16.39522993576375,24.31117505826907,37.117337753795766,16.03107002891343,26.093877079356403,28.149336892702603,34.71121695279132,13.367499678022678,40.544927894933885,36.43563431880209,29.81064564801648,25.32785966374714,40.77771745549309,21.32141087543436,42.69683768780636,25.823206349083296,29.92406705954371,36.706600029150366,13.887363935763505,15.158533386552506,34.349131871611256,31.277634619209117,25.31982361618651,10.918144290641997,18.36335401344933,30.729949208128524,27.327682971904203,22.1022168668471,40.602824918628954,27.42201249820897,30.662430691095587,29.899509972857324,23.183567544962763,32.67619493891916,25.77844510103182,18.22036018370127,30.59894377060804,23.80062487498748,14.652951888282338,18.252058584942663,20.08930337555536,21.230184010508545,40.0261606289954,40.46341798668725,20.23067025984703,27.369745985658227,26.06781933826592,31.768199025794466,27.155359255016783,29.46447354311234,36.58184774208067,14.190220911096864,34.27123853604425,39.99922496323468,19.509462996706397,23.479249511648515,34.639199351384136,41.06303256227798,39.905673563766484,16.77502549190638,40.634071717294475,31.831551493898864,38.783991505947085,25.45027916633392,37.659682535003455,33.194288189760314,36.87029985675538,24.76322742806063,35.99117337597869,36.323585344497815,23.490391519762248,37.11276576111045,21.625997949957444,38.216693740410406,35.12912614298658,25.006761819722197,19.58549215928366,35.986708054918765,33.08837926031376,39.37149729106563,37.75017098811894,27.936398014452113,25.961744788719336,32.40374409633492,36.32473814794713,37.946923451437264,25.12186087741647,29.272307255241927,21.439903259580227,23.746989854788936,26.060134234475775,23.99229011317421,30.027870605810804,22.591899213927995,22.25871779073501,22.71692412353728,25.464015076483133,31.85143174636981,29.10942366253842,23.000793381248396,13.910242611897011,29.938740847279877,16.33819397790839,29.648439923438886,26.02916719807662,28.86258892785435,21.78054510168826,29.179100826795672,35.0175343572013,20.192958648736592,45.77612330023588,17.175324941640696,25.296835289337377,12.61487283381243,43.126179121986375,29.803674727991776,34.49975309981387,34.699617022900924,43.355965277043836,29.025577375115866,29.773983220759927,35.132093395755476,25.480228150235014,31.818061290925982,26.57150230638741,35.60157313459574,27.807314086631603,32.77106819828552,38.3080054923324,34.25679968750161,27.256855073099263,31.07676619778771,20.779136351465638,23.227426138247967,22.384259794767583,46.53782412485167,34.19974576203847,31.84998356090802,21.74760786959712,23.31070454692812,18.81458307093538,46.39134828216764,32.92770761209951,25.75051225053736,44.45812538108903,28.303849690414406,42.20544209403498,35.305669929046616,15.91547121375389,22.26338185506192,30.897041084322566,43.93540497690848,31.459971192703932,12.675708022752588,20.43420012480883,12.787743669310721,30.058637050357405,34.557501663177774,26.781532834515083,28.553184676394014,35.51202016564313,47.94020280736675,28.506715993952177,45.38942079917179,28.171571593412082,18.679954723354587,17.105739932514727,22.732878932082357,27.864124096279475,32.81379494205121,23.606702392619347,20.886716116029863,24.53159490881758,48.4072201134133,34.40024101116342,30.786807298541753,26.78569394616651,41.23119277056929,25.34580620851933,28.035092976642225,34.7794691489901,23.92930959849623,32.199486161975514,41.818889775875064,40.61476768688179,16.004805835192432,19.133197873955226,27.54061693723463,38.11356481859534,38.600492560283215,19.647776672654068,25.521639193680933,27.356464899450412,25.94928931092005,37.31774651032467,36.41871091791998,39.930464262622756,11.607461994408274,29.280624574512814,20.686885782753432,31.688069479823753,29.11665053533126,27.55986369199217,20.84749477054575,32.75887094915212,37.595760748309715,29.949510776636007,12.522930669167813,20.397987561101274,15.562106954451682,37.289381298114726,38.937433684606134,43.72447887435689,27.995281164344632,12.951006580136823,27.79357640102817,45.50215587245589,25.014528825130444,29.657794704249728,27.60304077992478,27.64846289505634,35.011792857078675,32.62805355053274,30.759635932808806,41.88468246228156,38.194078271415606,35.93237861991633,28.241761263171703,18.38210356266881,29.29879092623279,25.508368167640846,27.308349429276724,28.562445227277703,46.25399941370454,47.50822213354543,21.120492960880828,42.45686686328408,35.80402605636799,26.172757734599283,37.03312439247419,24.5295791515664,18.43065251759638,26.946765750299345,18.551938652157087,36.085524611280334,30.476315655480562,19.388054210918654,16.889245064992856,22.03375089164841,31.28182182374531,31.61962918448103,39.40308263828881,20.048859760881506,40.16793660481564,40.72046539551879,21.49459106836652,41.054633592116915,21.348061970399172,34.132834113364254,28.898559100403453,26.311854733218652,27.72966413634156,21.162076542102497,49.64761085045578,29.769320214360963,30.657751294282843,27.857190963313993,38.15259915234522,21.564129281033072,13.355470638466521,32.11580668693972,30.453213597331356,28.606598708090008,42.71256290136412,28.640227488268973,24.395350326325385,32.552952361743756,37.61746008374967,31.41422364409084,20.057666561178706,31.41290413405528,22.27308938912003,24.498874072036088,24.019404827494412,27.644306815013067,26.59213585096337,13.987783107023592,23.842310106593914,46.46903984526036,36.698819384172886,46.74712915086516,32.394623584304405,38.139170382706325,25.973128261136292,31.034879284201658,20.237276689268157,45.83640514780816,38.462713498320156,34.460578212420046,12.965037560116578,46.64525935445078,29.434987706126382,35.0977188380361,30.35816653362527,28.423818240374278,47.617951864189195,26.96631766815637,37.261590480206976,33.95088265056425,48.732779000216034,27.128318382336023,42.64332392260753,42.96291647143869,25.469247826654428,17.32652200453752,26.430908699136467,37.292358034603325,37.52414599930265,41.82114102994004,43.28119612250812,25.168569523688678,32.754855140323414,28.436692500171084,44.306735063429144,33.520432494431915],"beta":[16.229185407240504,12.213319588498406,11.51440593832589,23.8690920998274,10.88308088632623,13.75264048955653,17.64183441926385,13.952768899482614,12.590625560671755,24.558107304730576,23.604319523264202,17.89046440634499,10.215046916546132,29.000250888018325,26.260992820930614,15.762023987663634,19.591536156649376,23.037524843429097,17.208216103187233,21.94093313722469,12.741699073485515,26.573047869812882,24.096198186830765,21.79335178924674,10.554070832350995,26.23016885747399,19.992672644656363,10.21682484529312,18.506596924156362,10.849097330407794,19.739421408553,24.931510708576813,10.65576444678011,20.621695194189552,28.944906187345598,15.634666497835843,14.455929951765967,28.47165111161674,15.378283575099069,29.11996797144566,25.324348536388097,23.281745904866277,28.98136936272097,26.091121790401356,13.237065503173158,25.087205567941325,15.846240971400562,22.255446469737453,13.597812195038479,23.28416655527461,26.65226654906716,28.8326366295912,28.460192721116407,15.621620893241737,18.135696934668978,28.607623876370347,24.952497199149484,14.455903904591203,29.93691412649131,18.993142185960007,13.157750649316483,27.180010936329655,28.353254511791505,19.850201535129955,27.23563083633799,24.179275368406667,18.049897241880842,21.62305854399623,11.432951561862247,20.931815200587756,22.867162325919136,23.350483605382045,13.845284245977538,15.067519771310929,13.979571058289997,10.307380072824394,10.585498800597799,23.91885257221852,16.852714137701767,28.31606611888446,23.461827098772336,21.482443616156218,27.62215136041305,10.265843638684,26.693940234956415,20.209599295481322,28.14658551915851,13.434971170501724,22.327474262134103,18.21099213047919,26.944348562799853,25.318154931820477,27.485799768909548,13.032684688288985,11.29325138862769,19.233044327264935,26.01374983206182,12.944957397806366,26.975101495284314,28.1721446428213,15.876411409688673,20.29006577620869,13.290457067555437,20.01938788243941,13.927675071088048,24.76375464671046,29.73036218053715,29.305345754893768,22.734551019203856,29.66310314182579,25.24737327200836,20.951810817042688,20.135055024683453,23.58311111870149,14.63917507990923,29.089397123390647,14.990060400724321,15.24702055507321,11.405903633209068,19.099473380984527,23.902564333455963,12.789662107969386,19.26278133577999,11.635055447979244,20.87655517865377,22.032565041847164,25.039062939655587,21.998382245298274,21.861280839525303,25.251004171294138,10.380545902694745,26.19963281602216,20.43823896873331,22.828712223342166,21.995942765843072,17.67729094524016,29.40434337028965,25.388287476704,18.029752224534814,27.446351241210714,25.729725206109283,17.66783934331352,20.226564654082708,18.254587304192505,20.348084789998065,27.094187279592465,20.6528776501766,18.548900160902072,23.471779934067328,15.99730302745106,23.412248275309352,19.577077280631713,21.023513602837856,24.020709236276375,23.163291483868733,21.92527151457778,22.229446806097982,24.38477207180536,20.39820666199439,11.534161467415975,12.291977173372048,11.291929994828047,25.985091265683657,29.276883641040378,14.5888224591293,15.480059419185705,21.889479463256922,16.531054605758232,23.79437755976457,11.225704265001566,14.684890656753367,23.59942463550407,22.25060921516182,27.079146285019988,14.59065738565085,19.86485758902859,17.917367315702602,20.208915753296015,17.39167180687479,13.091126784300489,20.557712297792317,18.73192158845991,21.455435738822842,26.689608453651953,17.639673682156545,11.163807895126524,27.83324964519247,12.344084255892543,29.442054762626118,15.295613245000656,25.09687401689405,20.920961814249715,19.3614140508206,12.793463959656211,14.392112155231732,27.710850650751784,24.09105798853095,12.568546704778885,12.46906657795591,17.972673822801966,27.599377482321266,23.833366487755892,26.603608513458607,26.42624486759781,25.46050821290703,29.648350579411115,21.33671377426473,23.62688965594261,21.335608055199575,23.35448714777451,25.36821407331609,26.218876603782412,21.734467715960974,24.989267019639243,25.449816343785535,26.613233800056367,16.362546572563534,22.221256523738475,14.502865036984648,12.490202263115604,12.307071472842823,14.774789993777482,19.979087962537836,12.651999395441873,22.284902554114787,11.450627628735969,17.081250061280016,23.459863949872247,11.949546102435168,23.674841452199455,17.743227670161374,21.12634262624954,24.485250128216162,17.38718481958958,21.58447727761706,19.022712301326848,28.969275981661283,22.438783498775372,10.859547870970188,14.365248925557307,10.214812484374946,22.90183073651277,29.253092445757865,14.959207242399074,11.85708817241962,20.67704411689362,27.528878163935232,23.430533574927743,29.37252339279795,19.847337252596336,25.94424474389454,13.472918351448957,27.090689188370746,17.215807175998226,27.822109778522012,10.744513628380993,11.453641393966993,18.702654320509758,17.791415077247933,11.498151672518508,15.2485165952399,13.434210354465801,26.553736212045557,22.147892318433705,25.356820916572943,17.472462552000323,10.46297235500074,27.678289440244434,22.730965953786328,26.490840756089863,28.442881572202715,20.416075854898214,14.497618487130728,12.221278714940166,29.59267431683609,16.206339994487905,19.823609167812872,11.154982033721756,20.701886485343785,18.849130354213507,13.866021300212426,20.299076852527705,24.600172618414746,23.4054672681493,15.68130093229945,11.173423268979125,25.36814818288125,27.07076297763258,21.854436190814468,23.79247505863812,18.282003935111895,27.36251640692887,15.955671367724591,28.394253734547338,11.926935283435963,13.752385164938353,12.351540614664716,29.57056373702414,28.180221085492402,29.713542871387663,11.022964373665932,12.610781459179226,21.776964948770665,22.568276383417924,29.680504235239425,16.403837561902627,21.125220717520058,12.348913724030531,26.598125740293938,27.55231966392476,27.95803417993345,16.14246345640186,28.539595189947402,12.598104356863757,11.919227122385895,24.55167234552499,10.392536040866798,26.150631177992075,12.841665578375743,17.42679774293332,28.690638969376614,13.992589211073142,14.25873650161154,17.519711405130334,12.869213222341088,29.462315607505122,23.85028094298218,20.259315162243286,22.591308044956705,16.5701343153679,19.567988992129127,22.678218558598225,14.211623934738412,13.97366169650526,12.85042628845778,11.197433644177295,11.824619882906058,10.661528643234428,17.37167472780749,22.601203383665485,27.193452214787253,22.6040147764462,16.05655943388188,18.50971342569318,12.39599188185688,11.0849552356673,21.764759406373365,13.480111305979587,22.70371924945219,16.05935476415732,26.70928044618842,25.008556093205968,19.596420381601,10.647019393850758,26.849027346986226,22.042180138965218,18.666097811769944,28.24323034190116,15.127291064006743,25.44398552940537,26.60961219868939,24.97858135506958,13.139537274464548,19.933246899921944,22.565542222811917,21.685555129032178,18.032142354579616,19.250552648061756,20.909690655349536,23.828730979193296,12.740547952039766,11.626069291127493,24.072821432096745,11.206938145972117,29.274370162781473,15.652079904825595,21.98110725212421,15.283384922305974,22.234540035942892,23.854746441409933,21.38202171524465,10.640538847493865,14.351887184327147,24.234222946726884,23.410565774586445,22.715240944445817,18.74496747560635,25.065049942293953,22.694097114901503,17.322093032504498,18.829653669640148,10.67601621477895,10.012892337610841,27.411418971372594,22.136954616800942,18.58671873818738,24.49891877910828,27.050127052700045,22.43787027206867,17.352338224672486,24.526858590702755,29.41924307269806,18.72832753352189,13.97564254493937,13.428133928396191,21.652396473071004,20.42570741575159,28.384025090201767,23.132305188013923,25.817250585527205,17.672786597381368,11.8012457318705,24.01330166366108,21.109732382288232,16.852873816453506,26.316453884008602,22.399560400457673,13.566787862048884,20.44303128183785,11.905906747953491,10.516314888650573,18.605889046832917,14.396865423504543,10.317860905701766,26.836248174111038,14.73862967942621,10.53584842547146,20.411991261007127,29.698688754160024,25.84406925426677,26.705683055552512,13.992565343072387,19.80697397046399,23.93962057094571,27.081758463759247,16.91699032867797,18.3341530134604,10.41597210753119,21.26357836579711,12.193723828591324,14.790185084523264,11.4049407557548,13.300929767199761,22.95670830699114,28.722827715253672,12.361065479100937,12.639309669932995,21.994080769499345,20.44952619191777,27.45419830301987,23.45414112772808,14.835361181612123,12.602520102441748,11.862051579784714,18.161235617035988,23.9628776781549,15.185433345617628,17.646726163481794,27.59204263231218,11.736482223993576,17.02094889345847,22.51298424979805,21.563797662186456,20.04387845671307,26.466050926773768,26.579706361486597,26.56753461461875,27.86656167998003,29.548964522685242,23.638059208194917,28.089927634797345,24.345646227463895,25.24379055362845,13.910389631489796,21.054073353340684,14.386672926755537,15.84344877980386,13.170172736341774,19.263047883173897,21.361641696936424,23.084061665202533,16.180854257875005,11.582347578659169,18.16318304276377,23.224170199137895,20.393075305091315,15.814612531057595,11.209050253608549,17.403706287293485,28.47445708711976,15.745551082582807,20.846299651428666,10.422624101816984,20.395617539031413,13.72285563955125,13.235976991588911,20.94497681190955,28.906369577367556,20.416431285105116,11.97280694999684,19.21001165923912,20.8963894900228,22.413318512821803,27.294063255547197,25.720986770805496,14.326725025914882,18.24333694250424,16.432848475721713,21.681572006262332,11.856716468048209,28.810459266685868,14.821152327793087,15.239532173892538,19.948578607605523,13.89777715840947,29.215706089067737,15.29422498694792,23.679092772814165,26.373747655713302,25.994760887994246,12.326852663277506,21.954827474237955,24.74567451006657,23.725871285270568,23.110685529773246,28.048679487373178,26.45190605738767,29.913117071801317,21.046191261846523,19.503152998695136,17.616279089951696,17.691873571906314,13.26879018567103,17.280896580068628,25.524244945228926,26.89224013619466,16.216189248228744,16.240144290013827,28.922665870804263,18.090875970433057,20.85474506185104,16.382186857973657,13.968218760362547,28.991732064529366,17.832193931712126,18.370566739135974,28.25463657148171,21.822872996791087,13.885397558533965,14.98218879011656,18.75902285160504,20.405490809184407,26.985002703606717,10.630214690171837,17.662209037723752,22.979446911584816,12.356908276096373,22.661753230574003,20.40072834925564,26.18784341459838,19.686124256601545,19.6999599292052,22.8152234106077,20.608088021117315,21.434946559982574,10.539676328598496,11.084268500081219,18.944749838036486,25.31697903232585,13.8235465896586,23.42926813868567,18.81913188268779,26.270904206312355,20.346870784480913,13.265316916981558,12.958236559046714,13.41336008975405,25.3634865670365,20.241064904020874,16.282304290223273,19.554394574570043,21.694439083674595,19.30373117767018,20.14884981585397,13.950125766149512,26.053651980675163,11.22421815472482,27.216263770281696,22.155998326063802,17.034810058279994,19.75311196010043,23.37306316888336,17.933379984568212,25.616448301143336,18.700305578637288,18.908118708654,10.11274784967041,12.112024133895499,22.16522741053521,16.333588652821188,11.695679390260562,16.11124520272344,25.972365452201633,23.542285692093884,14.325067220582923,20.646557013844443,25.269703959992338,15.434773704900596,22.41070629692394,10.982257311161,27.450724689820966,19.22379219390283,16.79508387876494,12.083463003582766,18.08435921119257,20.70186377606656,16.978786052575558,18.632337478472692,22.4871099086412,25.778518912485463,12.90618145614095,27.38949246433506,22.365450027548427,24.221310457775502,11.753753166104186,22.32051875354989,29.82348276277502,20.29732112180851,17.138264357319322,28.567942324721834,16.272601195999115,17.576359549572388,14.357613379074724,21.346345122768263,18.36724098573654,17.692831828147916,20.618179372664617,28.836649833505877,25.39804880138824,27.73913281534434,29.85109222439688,19.049051709932815,16.656100727827152,29.658572796027286,16.017407475356066,11.74968090680573,10.052402192018,25.137565825889364,29.45266070301169,27.72561231114439,29.89079790383706,11.400364337579143,19.03769024031103,20.421723669756613,10.872633320947758,15.312424862583498,20.578340955914957,20.04966953014111,12.316503389672988,16.010962856812448,12.736904739037772,29.060342637053594,10.09849155114777,28.739855949493972,19.965418772305345,24.50743042369225,23.165881242661772,21.6356588781459,22.306306859436873,26.65336031162912,18.227923578866722,22.3135255704249,19.381758210267662,14.0274591743926,10.754116311766651,11.218734897904866,12.056821313936359,22.52375820116299,13.217371255899902,22.105668851144827,18.147187392486742,28.48194389034569,11.316244518097488,28.440555521070845,19.56322612174159,27.67906427056601,22.73683703256062,27.704720598664764,20.335096131217917,23.06867801242749,19.186634876787977,27.830494203611348,25.971406087913035,12.228308772910626,12.096536845949913,16.281828762858193,29.809613335522126,24.238271754839722,10.121566737616622,12.162606027131933,16.020953118556513,11.544278878271683,18.05065868809325,21.246636444268987,22.736439293190283,11.07399009047243,14.524679959029054,13.12915289002699,12.976311815558255,11.375591187915198,13.230554545434163,25.13067472326704,17.904044703099732,10.285807599311454,16.42351904474772,10.714488962834823,18.661856933863326,21.635640986220388,22.898405845511544,13.67685218593949,10.474774578070125,23.031984834264634,19.77736552716486,16.743463995050433,24.267947010648903,21.20915193424573,12.795066365115368,25.831531524211076,20.35242880769615,12.268951847240007,11.387268581169025,20.992607063477617,24.336719031071166,22.254448522549318,12.456244795944365,24.89475919365116,13.526605331726035,29.016000591672896,10.471272891708514,22.382961027337128,15.60480642866322,22.733591968553203,10.33138626337161,27.598844471942108,19.586554139095476,17.40092105019626,20.88462888413954,18.027116171642326,19.367234815864474,27.671748067653862,17.63514072595177,17.084478647189584,22.164162326425775,29.545420392513385,29.172710493494126,19.784331630159446,13.718375413012808,17.330958833485038,23.908739582431203,24.340027918228735,24.099673159851335,25.004533060111815,25.190162286379106,19.333515349062612,18.488169690943877,12.477009379135149,21.73847547323692,24.627371808342772,12.792643752588786,15.641888668006008,10.320064197726811,20.430306861007203,26.19427194612376,24.629335110292878,10.640035618806817,13.338930902815548,10.391244001127387,10.236690545127928,12.177917230536126,22.886535740367812,26.1139500240858,12.455586470858364,14.813889895442571,20.156547277059698,13.939980178514539,26.222577736437103,13.363178226296135,22.695665781941223,11.882845187665874,28.782506289976048,10.56409634548228,27.20602900615285,18.63900250253796,26.013409685395953,11.459412228980552,16.14240075945087,17.284068265555007,18.36473916119857,13.24913796325319,24.476013385479675,19.753583900572092,10.078349399662084,18.518084339293065,29.070142999656504,23.40659158295715,12.800209256261933,27.116419459131546,15.256447950516915,11.03280739105848,12.928310607926697,27.46515947261009,29.721463269131142,15.752010860837217,21.40988336829311,14.303225712952873,15.358503227309122,28.328013563421024,25.400819358916596,19.623705010449456,24.82791373052903,18.827205210324102,26.312457428248457,17.93539919084766,10.03355260831404,13.627527451750879,14.636601435320937,28.805174832817386,11.997055085615159,11.770299289053089,15.01516936617822,10.511995144323567,24.401076714046205,22.097083408645922,22.884788289017987,23.86127397538974,22.20204849742794,29.643727400185412,12.089135545679067,26.198102035587,16.99044213172779,15.75878314328385,14.924561284243874,20.667885790621554,10.050843097814646,25.332387472624013,13.7406733336128,10.69869916612575,11.018946945108201,29.81136072720539,29.10204171265058,23.92177231635919,14.733500162065578,28.755894037693807,10.141355490202706,10.016106428128806,24.95801522507786,15.502751461777159,17.352320060809802,23.442917678240974,27.706599218471556,10.970866505804961,16.18696305101709,18.889938362897837,27.801562493349753,19.51636322869401,12.377769671297258,19.469394326499334,11.383127818038133,24.395320784534093,29.14974337992614,24.38452537044558,25.830002636196355,10.655730763676136,18.88461050828387,17.864879544460955,29.679747262599957,13.736865127973669,25.033430428689204,11.427057786344568,13.458251467577407,20.7686979193419,27.45972390659029,11.736577870061812,16.691934304051387,12.46887978272165,23.69604909031239,20.979675099628242,25.16989651738982,23.43608367601206,12.140540674558391,21.80521861583722,25.51403700056092,10.772261464219408,17.749783052041437,12.325705719030676,20.201348731189444,26.098807103140828,17.83883379493544,11.06042639881684,25.846166737127906,22.082422610065642,23.558391926169673,13.63634094085099,12.160926451892466,15.116346759067625,12.025419906013507,16.080999789358597,10.842193965343444,27.168534936411028,28.287636975936643,14.583817248515345,22.907913779837827,27.01711630799434,24.335883735839264,24.43407272442871,24.414613193276352,13.117642884404667,20.439518233940714,17.507728133671957,19.061341421300504,26.783943648303563,11.834248324853842,12.594764539112827,22.008912546568233,12.141470852620579,11.678961660973982,20.13348823367034,13.214321911523616,28.22142010297967,27.474211951249,17.20669085930416,24.57258181586356,11.836706770262907,24.01711784862065,22.157470438520473,10.754134857544795,17.105856606559446,18.597183945638946,29.71500898767485,16.513029373971793,24.906968977456792,17.85575494796976,20.03035049940702,10.876949104754306,13.190623266403936,27.0336336095584,25.712679117053206,17.525785855218608,22.849792448782612,17.87906658998075,12.621096480746044,19.470664855868915,21.99341846463256,24.60681107757605,16.433446533836893,16.953074923149227,10.929856224727343,20.05151302506812,15.403681642808703,19.555141267742727,25.866525534556498,11.393045608247473,13.222598847795242,28.295429009420005,22.253003303408548,29.402191732212508,25.43150132306698,21.394627923269717,18.444931544645208,22.127842380861207,17.162520364764582,27.38731559577529,22.031072354959015,25.982315970294003,12.786573299496968,27.716866744223722,15.470078104017393,20.14008980456138,17.061575232591856,10.454795572586075,29.832026297519665,14.913274461961485,22.639355800810744,21.576750098023272,29.484049453692727,26.774058059058966,25.393563796137816,26.483002177465856,18.603634367847857,14.286448750086972,15.19420544929702,20.43447836583738,17.96127322738458,23.671885746781815,25.686946813958667,14.853156220072176,18.536864902402684,18.317818190636117,27.10159600669727,25.683387535223027]}

},{}],119:[function(require,module,exports){
module.exports={"expected":[0.9999999999507126,0.9999407091144215,0.9999998436285475,0.9940187243419103,0.9999995218429789,0.9999999639944163,0.9970199143131658,0.9999172062291602,0.9999614813154498,0.9999999998993366,0.9999989149178012,0.9999989714772184,0.9999999629451382,0.9999999999236361,0.9817686117569336,0.9999999913153041,1.0,0.999999999681768,0.999923412273508,0.999999999999999,1.0,0.9999996993476777,0.268563530266248,0.999990603356842,0.9999991423972793,0.99999989955737,1.0,0.9997453993217303,0.9999999999932239,0.9299209296071353,0.9999998808447763,1.0,1.0,0.9999999996850021,1.0,0.999999186262049,0.999918858878211,0.9999999972242992,1.0,0.9999999901623688,0.9999757587680662,0.999095652607881,0.999013141547606,0.9999993089214038,0.9999999424135846,0.9999999879895602,1.0,1.0,0.9999996809435155,0.9999988239526337,0.9996221780800414,0.9999571185994595,0.9999999811420566,1.0,0.9714052425035823,0.9933194319789217,0.999999502125607,0.9999999994566187,0.997472945172677,0.9998687516211542,0.9999155243889606,0.9999999999646967,0.7064317253767038,0.9999999991947177,0.9999912004606625,0.9999996609535204,0.999999999674822,0.9957388368965719,0.9999994862201413,0.999999999554665,0.9999999594352065,0.9999999835696591,0.999957117552641,0.9999713570972607,0.9999999920746244,0.5505618852455249,0.9999994596868607,0.9999999999999583,0.9828989539970922,1.0,0.9999999986157176,0.9999988533675149,0.9997913530542892,0.9999969755158862,1.0,0.9999947140689568,0.9999997676822711,0.9999994224259027,0.999999999997793,0.9999999999949507,0.999996525032055,0.9999269520096398,0.9959518192996298,0.9999999955293374,0.9999999999999809,0.9999971293329034,0.9999999460176459,0.9999773456722633,0.9999999782045907,0.9999998135141401,0.9991172147248966,0.9999378459349771,0.9999999970669877,0.9999998286975786,0.9999997791122643,0.9999956756392777,0.9999988638551075,0.9999999998168029,0.9999999826652178,0.9999068528687699,0.9999972655227009,0.9999999999999948,0.9999407750533138,0.9999965368816791,0.9986663856437169,0.9999958988867692,0.9998081254268805,0.9999988443102255,0.9999694543291918,0.9999999999999918,0.9981313717112966,0.9999981333863187,1.0,0.936719249525601,0.9998832358476761,0.999885513607161,1.0,0.9987398005545981,0.9999999999999426,0.999990946174038,0.9999999984833048,1.0,1.0,0.9999999433247772,0.9999999999684367,0.9999998175307641,0.9997048365717518,0.9999999954967628,0.9999085722304331,0.9975920247431458,1.0,0.9999956408942055,0.9999999920355532,0.9999957160457177,0.9999999999999999,0.9999999999970496,0.9968974586281552,0.9999828957509406,0.9999773896013622,0.9999999999999999,0.9999999999995804,0.9992768605139811,0.9999998740401361,1.0,1.0,1.0,0.9998827252998861,0.9999964800509006,0.9999571638119534,0.9996370034346024,1.0,0.9999999980272498,0.9999999780056891,0.9999999217619855,0.9999998488853211,0.999999999187125,0.9999868428751901,0.9999995099351457,0.9976126351053223,0.9999999971361574,0.9999999995768182,0.9999999923093084,0.9999988707760566,0.9999999962842356,0.9999999999997646,0.9996226102474273,0.9999999438052112,0.9999925628193782,0.9999999999938853,0.9999999999999641,0.9999999999999999,0.9996446852095568,0.9999999999991913,0.9999425441823904,0.9999999793725612,0.9999999988297911,0.9999999999745294,0.9333875694381617,0.9999974400139889,0.9999999988080355,0.9999754575982213,0.9999999444917658,0.9999999999999537,0.9999997710092436,1.0,0.9999999957671253,0.997628092541451,0.9999999782132405,0.999999997870306,0.9998848383115542,0.9999982180272186,1.0,0.9999999996597597,0.9999999789475896,0.9999999989585427,0.9999999999996829,0.9841280937090986,0.999999998195657,0.9999999985102181,0.9999999985628422,0.9999999749751508,0.981796293042029,0.99349048777808,1.0,0.9999999975957778,0.9999999548209269,0.9999930202634512,0.9614939749476972,0.9987484996562636,0.9999848073123244,0.9999733590894577,0.999988014513278,0.9999999999997027,0.9999999976641294,0.999999999990883,0.9988773753849369,0.9999999262745715,0.9999998553564904,0.9610281517550607,0.999999999999999,0.9999786217425994,0.9996234899215583,1.0,0.986839396909161,1.0,0.9999999952062124,1.0,0.9999999798567484,0.9999674789863356,1.0,0.9999887932013926,0.9999999984351193,0.9999997332359282,0.35214542960979456,0.9999999999982918,0.9999999999998986,0.9999999999970083,0.9999999999999998,0.9999999999999268,0.9999999998968998,0.999999999999849,0.9994833429526493,0.9963078506677664,0.999987109158248,0.9999999985998069,0.9999999998627861,0.9999999999922502,0.9999991563326758,0.9999999828899044,0.9998644694706544,1.0,0.9999999999999911,0.9999958808613167,0.9999999998571775,0.9999993727488368,0.9994358954970226,1.0,0.9999981419125991,1.0,0.9999994697276777,0.9999777987580301,0.9999991709149653,0.9927174028382033,0.9999999999988298,0.9901849448917059,0.9999771225153219,0.9999999999999745,0.9999857635165365,1.0,0.9999844492117985,0.960416758535157,0.9990841954946429,0.9966310098776296,0.9999990733393951,0.9912260647540856,0.9999999775704146,0.9999999925656459,0.9999999621084713,0.9999999994674755,0.9999999999999938,0.9999995338536756,0.9999995750660066,0.9999999160256343,0.9999999999999961,0.9999999999669427,0.9978786178022981,0.9997250990613699,0.9999999449203406,0.999445889129546,0.9999999975982953,0.9991958898920207,0.9999989133164134,0.9999776712756152,0.9154246727239616,0.9999638524868049,0.999999987220216,0.9999999995228334,0.9999996045239717,0.9999999994635781,0.9998923800464017,0.9999970525229377,1.0,0.9999999999622203,0.9999755355444873,0.9999999999976401,0.999980868145372,0.9999988972539784,0.9999999629996623,0.9999999605786709,0.9999999995191549,1.0,0.9999999608399476,0.9999999999993551,0.9999999999998969,0.9999996800189467,0.9999681633500801,0.9968001863588312,0.9999995304666439,0.9999999999371212,0.9999999999969171,0.9999967126135145,0.7891397311746761,0.9995232988926425,0.9991340402248516,0.9999999999999973,0.9994081208432215,0.9997813235420581,0.9765478000390269,0.9999999999372898,0.9999999740660271,0.9999999963877868,0.9999996885958107,0.9999999966651142,0.9999999969570835,0.9999010776397729,0.9999999804131479,0.9963250203475211,0.9999999993896462,0.9999999999999989,0.9999999527386526,1.0,0.9224369122192095,0.99966608006627,0.9999999999999956,0.9999982279087983,0.999999699459084,0.9999999924440912,0.9999996450368913,0.9999999829182848,0.007674445191838353,0.999943256272168,0.9998926775948596,0.9999999993351826,0.9999827227738853,0.9974497773785416,0.9999999999999977,0.9999999999992725,0.9999999783505866,0.9999994080169379,0.9999505588060458,0.9998548877653011,1.0,0.9999999999999972,0.9000255036315428,0.18314263242959528,0.9931645081357932,0.999999999944942,0.9999999999939883,0.9999836518704184,0.999999999999257,0.9999999999978578,0.7472931899659627,0.9943107038608053,0.9999999961677376,1.0,0.9999681301622206,0.9275431547756076,0.9997488479653402,0.9999599057758409,0.9999946655357698,0.9999993476235972,0.9999999999084364,0.9999999999999836,0.9999988627377128,0.999999909196178,0.9994524551254655,0.9999756959239524,0.9999993603319499,0.999999602805674,0.5550580653636377,0.9999988937127238,0.9999990494659486,0.9991524816379184,0.9999982986383829,0.9999999999985404,0.9991184561120894,0.999998813210077,0.9999919821123217,0.9999999999989249,0.9999999977815981,0.9999926737922423,0.9725732814139483,0.9987221500508049,0.9999999996400895,0.9999999861849301,0.999999737659614,0.9999999764054559,1.0,0.9999999919791361,0.9999726076396599,0.9999999999995348,0.9299716065196575,0.9994425422646552,0.9998613032023544,0.9999999999999997,0.9999999862299583,1.0,0.9999999999613266,0.9994494623824162,0.9999999993752678,0.9999425708214376,0.99999999995489,1.0,0.9996238567454216,0.9999998363542946,0.99508366400263,0.9999999999995697,0.9999999999387252,0.9999987818141846,1.0,0.9999999999999662,0.9999999999972649,0.9997948966371748,0.9999999992432078,1.0,0.999914571366715,0.9999999803551183,0.999988097207663,1.0,0.9999999999993024,1.0,0.9999990743229407,0.9999993131133539,0.9999999905899396,0.9999930231162288,0.9999998075739632,0.9998561347107864,0.9999996623820986,0.9998098307410772,0.999999999947299,0.9999999988946601,0.9988143763986563,0.9999999999999983,1.0,0.9999999999548664,0.9996648758202658,0.9798396124788488,0.9999999892567896,0.9999999186966549,0.9999999999995238,0.9998667184475973,1.0,0.9997793464863726,0.9999852108532165,0.9999999995632084,0.9999999996635298,0.9999999787102251,0.9999914893671693,0.9999999999965544,0.9999993953675281,0.9999999999996392,1.0,0.999999999979008,0.9999972354624924,0.9996714912817257,0.9995566084915687,0.9999999993197604,0.9999999999999977,0.9999939439447013,0.999999700270501,0.718118027569077,1.0,0.907985668884322,0.4930895750145513,0.8663809014470423,0.9999999999857858,0.9999999999930591,1.0,1.0,0.9999968907089223,0.9999999999324877,0.9999999999935741,0.9999999999922962,0.9999553881858095,0.9999999999999597,0.9999999999956475,0.9917653226665123,0.999994501996901,0.9999996119462843,0.991430115647011,0.6305763666746085,0.9998991173425658,0.9999999999983052,0.9999999999955855,0.9960834108297947,0.9999999999136133,0.9999999957219025,0.9998758244210759,0.9999999982041251,0.9999816926585582,0.6442356422594744,0.9997558214632967,0.9999994302565494,0.9982353874239753,0.9999036593592759,0.9999998961178127,0.9990469000203782,0.9999988969923733,0.9999999999967122,0.9999999701938753,1.0,0.9999999913334352,0.9999999999998967,0.9999999614774778,0.9983776147986573,0.9999999996131342,0.9999999554314712,0.9999810433083943,0.9998051584189874,0.9927163381597707,0.9974535773247206,0.9999973950006384,0.5135514917270669,0.9999999999998791,0.9999999760066086,0.9991238552470991,0.9883776341370416,0.9936580523282131,0.9999999737172847,0.9999933351803852,0.9996463320931116,0.9999999999999999,0.9999999776449562,0.9999999999992216,0.9371496125818686,1.0,0.9995005582151922,0.9999999782609856,0.9999999999999998,0.9999999810539503,0.9999999999898729,0.9999999999813268,0.9999983331981015,0.9999999999999805,1.0,0.9999524915443962,0.9999951854161095,0.9999991263961873,0.999999999998305,0.9998007167753933,0.9999544875640991,0.999999996384075,1.0,0.9999999957234746,0.9999999999999967,0.9999999986828811,0.9999988359167353,0.9999433099208284,0.999997751762521,0.9999999994316973,0.9999999992715656,0.9999999999829849,0.99977897056884,0.390555142070518,0.9999999738663975,0.9999999999997653,0.9999981923241088,0.9999999106446755,0.999999998857553,0.999999890528358,0.9999999999982172,0.999999999974671,0.9999999696368594,0.9999999997502961,0.9999999994617541,0.9999999997011458,0.9999708629046931,0.9999982612994691,0.9999954382157473,0.9999999996961483,0.9940679008761268,0.9688686565005872,0.9999591963020718,1.0,0.9999999987210343,1.0,0.9997511213758735,0.9999999933655771,0.997059009322095,0.999999999907561,0.16535940860399123,0.9999999996871625,0.9999163590115242,0.9999999966114932,0.774298105935635,0.9999181391856208,0.9999900704169633,0.9999999647116429,0.9999999999999373,0.9999999999999978,0.30431850198959287,0.9999999754543094,0.9999999978854088,0.9999999291084979,0.9999482017952808,0.9999999763612586,0.9999999856193931,0.9994655193419136,0.9999981785278672,0.9997935500912839,0.9999986018088253,0.9999618920439526,0.9960748098202283,0.999999999872997,0.9999999997808751,0.9999999999993725,0.999999999484112,0.9999997923564226,0.9999997374419424,0.9998791348232622,0.9998699822373297,0.9999979213195881,0.9999994688931236,0.9999999999971576,0.9999999998478175,0.9999999449705433,0.99999995020057,0.999999993157486,0.9963240175523949,0.9999999999911592,0.9999999999999988,0.9999999999999951,0.9999999995793437,0.932892881155684,0.9999999999987076,0.9999845274954815,0.999999998504203,0.9994008880847609,0.9999999992636754,0.9999999999994565,0.9999999995924823,0.999999999873181,0.999999999999969,0.999998874740127,0.9999999999991523,0.9999961406715945,0.9999999998863884,0.9782894419739435,0.9999704345110223,0.9999999995617671,0.9999999986171869,0.9999999999905883,1.0,0.9999999999999997,0.9999998179526938,0.9999985512597785,0.9999999999998972,0.9999999619563962,0.9999999999972919,0.9999999999999998,0.9999999999820408,0.9999999950031123,0.9999998718374943,0.9999999999999999,1.0,0.9999999992857463,0.9999999397080944,1.0,0.9999999999823671,0.9999999740912996,0.9999995991167445,0.9999996462670916,0.9999999999938263,0.9945804167710495,0.999999996166656,0.9998864313290985,1.0,0.9999999930003598,0.9999979359180412,0.9999999408195148,0.9999884653852514,1.0,0.9336867317495787,1.0,0.9776199454506045,0.9369306139544541,1.0,0.9999992694736021,0.9999999947579189,0.9653063381703877,0.9999995902322903,0.9999953629486273,0.9988705838955694,0.9999999999997571,0.9882282325353852,0.9657688376115589,0.9999997452206443,0.9999999956543176,0.5416558336761668,0.9999999996440846,0.9999998362245748,0.9999995224014651,0.9999999999999999,0.9999999992351668,0.9988329760284993,0.9318513549486195,0.9999992437582472,0.9972678247870203,0.9999999925918874,0.9999998784771956,0.9999997915930526,0.9963443883009233,0.999999999819189,0.9999999884946447,0.9999999999027246,0.9999960879573937,0.9999999850752862,0.9999999977993146,0.9999994119095836,0.9999893721591055,1.0,0.9825947001519624,0.9997787849794818,0.9999999986081194,0.9990359012604757,0.9999952079759773,0.9999487610583394,0.7739382939461926,0.9996848570881197,0.9999999955916943,0.9999999999967428,0.9999999744690777,0.9999999817101121,0.9999999962877446,0.9999999842158098,0.9999991227333258,0.9999982286474022,0.999977954590502,1.0,0.9999996028719131,0.9999999999702692,1.0,0.9973972759151799,0.9999999999999688,1.0,0.9931870421663817,0.9999999880414444,0.9999889668450961,0.8971855956346863,0.9999999999347032,0.9999763719213248,1.0,0.9999055178108011,0.999999919212577,0.9999727416072746,0.999999999904076,0.9999534418447941,0.9999937656309654,0.9999999814470331,0.9999932992045406,0.9999999681417009,0.9999995959232177,0.9997747972964962,0.9999748277546707,0.9979716986693227,0.5723454039849672,0.9999999999375092,0.9952629052936808,0.9999999998571545,0.9999999999999943,0.9999999997329816,0.999999999998582,0.9999999062157052,0.9999999952520641,0.9999999999954423,0.9999999992245278,0.9999997690992715,0.9999999906808538,0.9999999999290741,0.9999999998955683,0.9999714709434054,0.9999878449859301,0.999999999999999,0.9999435102526079,0.9999999999994569,0.9999999999952339,0.9999998953649626,0.9999983968104548,0.9999999983923319,0.999972810399458,0.9999994690003492,0.9999998441093843,0.9999604453558006,0.9999995566149522,0.999999999943819,0.9999074570823339,0.9999556626827795,0.9999999830708833,1.0,0.9973286878591714,0.9999999999999994,0.995835393187944,0.9999999999999291,0.9999408674034811,0.9999999999999667,0.5999363912103846,1.0,0.999993938402665,0.9999999811509179,0.9999982759386311,0.999999952008721,0.9999999999691116,0.9999998228177519,1.0,0.9998192830340527,0.8714018011879867,0.9999999796891849,0.9998855601266771,0.9999999998291781,0.9999618626199526,0.9999936153704628,0.9999999982232797,0.9814583420711404,0.9999999999678955,0.9999952798518111,0.9999999998944689,0.9999997561020324,0.8632462727056567,0.9988458444192563,0.7449947538961355,1.0,0.9999981838548727,0.999999999999999,0.9999999999999998,0.9999999966808626,0.9999999032630231,0.9999996902410779,0.9999950509921048,0.9999275101625837,0.9999857306029223,1.0,0.9761773716825994,1.0,0.9999945103146589,0.9999934050803084,0.9999999999989571,0.9999999999357798,0.9999999968757877,0.9999999665386802,0.9999999999461175,0.9999999999999986,0.9983345376402728,0.9999526473901889,0.9999999962749632,0.9999995250725463,0.9999999995341535,0.9999999997391243,0.9995103913385047,0.9903179038443853,0.9999999999956888,0.9990343699196701,0.9813991154590346,1.0,0.9999999999570299,0.9999999267387533,0.9996036779727278,0.9999999999999997,0.9999999999991086,0.9997762529987921,0.9999999999991513,0.9999999999999999,0.9999999998726723,1.0,0.9818737806138876,0.9999999915303872,0.9999999999860196,0.9999984488601378,0.9999999867606427,0.9999999585383941,0.9999900966402472,0.9999999999792089,0.9999025045196295,0.9999999941251357,0.9999999784981405,0.9996468450871392,0.9999999999998777,0.9998030764369025,0.9999999999670346,0.9999999634103189,0.9999999999999509,0.999999922924397,0.9999999852956157,0.9999999993721174,0.9999999863434144,0.9999999999998139,0.9999787312570984,0.9999997154421824,0.9999999499618302,0.9999995406338122,0.999999999044632,0.9999999954175431,1.0,0.9999998874755349,0.9997994202614452,0.9999910642516154,0.9999999999825852,1.0,1.0,0.9999999999759654,0.9999999999521316,0.999999999991839,0.9999998320144471,0.9495677998457941,0.9999989762681792,0.9999909493587722,0.9999999998181293,1.0,0.9999999999999527,0.999998919273923,0.9976787321228723,0.9999970598814771,0.9999999999999996,0.9995078686659512,0.9991052136157585,0.9992968240142031,0.9670964989132278,0.9981286844949523,0.999999999928554,0.9992579170204776,0.9999999999866922,0.9999999993375818,0.9934099479752282,0.9999989346750269,0.9999968653188633,0.7700243898673178,0.9999999992619685,0.996711852893265,0.9999999995450946,0.9999999873637297,0.9985424768949902,0.9999929608813554,0.9826540110301243,0.9999999999882785,0.9999999997078981,0.9999999962992528,0.9999935392956664,0.9999974081231955,0.9999999849128445,0.25210347928225996,0.9999911633755533,0.9999999999999993,0.9999999679449307,0.9999999940749112,0.9623709533503265,1.0,0.999999994960447,0.9999941160120365,0.9999991294326649,0.9999999843192722,0.9999520694259847,0.9999483750287763,0.9999630945870069,1.0,0.9999999444851488,0.9972225446217481,0.9999999999999903,0.9940616302681334,0.9999999999999996,0.9999999659397254,0.998993094385025,0.9999799057449769,0.9999999999999266,0.9999984990167033,0.9990331141536363,0.9999949727941178,1.0,0.9508248270251588,0.9999998076144053,0.29834891888114,0.9999999999997333],"alpha":[19.879013985235556,13.820364198104635,13.836390112933298,14.987476720481734,18.64857513356787,14.260819793668812,18.77827578957791,19.0782296072229,14.793670189084464,19.411335103714602,13.744845497790902,13.273901988290074,19.38647600930849,15.236033468199903,11.19962503093735,16.62399662945248,12.520382486336281,18.462187762328373,11.817655126302366,15.804989103012781,18.487010909690937,15.925098092320397,17.45038652188775,11.708571505520077,12.503843731551232,18.015225299345545,13.107825657690952,10.936838847948298,13.174033651778789,18.11908111516054,15.035362149408027,16.94376394729971,18.822006003335083,11.563099693329189,18.3847214615869,17.693267042272115,10.00168045161323,10.990643714691606,15.175051819599965,14.428941033481706,11.003196066129664,16.02184856135694,13.342082536879063,13.65975072662982,14.678473696003188,11.309620449519915,19.508434576551593,14.84795266052798,14.312991111827532,17.960615082382795,10.79344171471195,14.54121654166003,16.688186806056187,14.015442847435438,13.541437975221866,10.730561434845548,15.51320899523773,13.597430618269515,12.744826753552074,12.270539653336153,10.40725691375166,16.94572889762872,16.203430048571978,12.05526617152086,16.806110977591477,13.12703663953143,15.708523688342952,19.940192709591166,12.991274297906905,14.036451074024537,10.235075515963924,17.200312796123335,12.468809809155834,14.769076041846944,11.328391730738447,13.334641120274501,16.174879195737255,18.365285104806116,15.151590785236754,15.664570573987115,14.041474793922342,12.126163446686213,15.069114796736223,14.809776647466087,15.54606602462372,11.054797171694723,17.508851464932,14.605090439231116,17.972627785452524,13.874543255824607,17.41115575064672,10.169833779347975,19.83121754842399,12.875859360985489,19.900474107769277,11.052265750643615,17.462425815633523,10.70437238390147,17.08134684149656,17.383010104883432,13.640050543125389,13.291894728105841,19.239529785338867,18.973063962517855,17.379726444639033,15.006925524990942,13.13917225286449,19.127587160257036,10.328243403831765,10.836808249235181,19.969030615420518,19.163097566754026,12.301907929293485,18.455211641257815,17.50500789455963,15.689072188169495,18.42588127119127,11.10588177890843,10.745853908862763,17.92447853565181,12.301024891947796,19.14182453178747,14.036531987056392,13.181747141866067,18.768673446912246,19.44808196254334,18.57077755117136,14.780498989883737,14.594655951409809,17.55644841867638,14.921015274760803,10.817090462059586,16.37819539527335,13.172452424558907,13.15120851330178,14.572935567547274,13.752951661429742,13.622749591213841,12.806533875516228,14.655743228702288,19.8374409147059,10.04806636582832,11.753483757699573,16.663409419243443,13.663091482446742,13.83005240862187,14.948336496865828,10.566671608264107,10.808763914249592,12.171787416021097,11.043794080075614,18.14603416230414,17.85670028183506,15.407243670346077,13.486364171768038,16.804784229590275,10.225780229646961,13.190570827541315,19.085792761865363,16.85847270500922,12.091752363982696,15.310580599140826,15.843532967020836,15.119782307955056,14.76401088909375,15.239964526119088,16.382502575891515,11.810780261043835,18.52063795218648,11.710901473769738,14.874431284464183,16.587974300144843,19.457112059031722,14.443882736761665,18.482552331104515,18.455535790233004,18.149533636167604,10.513418134032275,14.532232027280747,13.766771863364403,14.753391706648262,11.922865404481435,18.071370064276387,10.235744118443781,18.806922891794862,12.623398763708657,19.0257551783907,10.312664302331696,17.05381445967743,10.219760585050883,19.09902425913478,14.302915944451692,18.13914977830731,18.35313765744676,19.617035291369525,19.03122751480441,12.108423126823794,13.784362875236344,16.902453951569978,11.08798705213686,14.799471346084482,18.469117605461182,17.12441547032177,13.84067416215302,14.643276725470551,18.265018085323227,19.961859278368657,14.261517065532196,13.203154367514376,12.79888205633942,17.95869144186228,17.475762203622082,17.622448542984326,13.348974302621572,10.784725965862176,13.66001403170505,15.480678190539688,10.176872110959598,18.27757372455256,10.134961543453862,17.623013587794865,17.688154608319003,19.294273249627558,17.584236078936662,18.73732365357788,17.89589200927429,10.936206549377602,15.922523613562207,16.970270871071925,18.640687916831236,13.256282181513708,16.803540573611414,18.333967879602305,10.056388898936522,19.67828317428451,11.43812166482676,13.854726056693266,16.95090439778974,13.233768878304073,15.15435544707072,14.420945795195273,12.564402164125028,14.251783879515134,12.217953205516148,14.972507756768502,18.776802338348194,19.64364359695003,17.16162926326647,15.482716296431336,10.946702824705044,16.901348893027915,15.320164828045842,17.39857488699151,11.565027949000374,14.552450917157163,13.352782020605812,15.37224569985579,10.84133887010871,12.212560614858486,16.515830135571093,15.18314002306732,19.292406773372665,13.208544367155916,16.28123452662084,14.095042199593902,10.132122466514616,14.87322546259243,18.641512984955117,15.19302280115043,19.064943169400152,18.874101909743146,13.298368984428791,11.402390246009134,19.6032949299375,15.144433573588627,16.76490170757546,18.487427540307245,13.26491017667048,17.757885274439126,15.309900649819976,12.38634882193611,12.299575995004036,16.108107621701407,15.52756666753644,14.671998171986239,15.546901991601354,16.293978435871438,12.972009509663282,18.67925058629309,14.740318232679112,16.547569444644992,13.634460589331873,10.201763389039266,17.262366212759012,14.49059094320624,12.594627024953972,11.129328587596074,14.393973791024603,16.001382524942308,15.869170498303388,15.975455661596826,12.657243420891692,17.92792799736598,14.195693381645372,19.59400482060178,19.013558894902374,12.474790166926857,15.209430316929598,11.501233986806783,11.151378991023037,19.05453829035691,18.622189393656473,10.070394993802726,16.361541636602826,14.840200101983314,13.769393038816863,11.870139274104417,10.109812059344982,10.678611963211422,19.222463640796917,16.976136116035683,16.053051353710316,15.203309185225438,13.057074633528158,16.09050074163382,16.70255971464602,15.414752865182484,19.07842558557801,11.942701740062983,19.601687868315423,11.132562039820776,11.042519149243146,11.928521864218498,11.273830694536166,17.7653656725168,12.539296941037215,16.840799946462862,15.02487378348544,16.09737767058185,11.394077233716164,15.93366006744813,14.633103130949387,14.547057687758914,15.74994697155752,12.579891643533198,13.568465381963097,19.513519285791592,17.68749696171836,15.185738853651682,10.831386313905792,14.246755296343721,11.349087192035913,11.358346524576001,16.58825906323303,12.20504518522867,17.79402476102965,16.277741257139073,10.308977636671425,13.925132426324417,17.480988966689154,10.76118512577646,15.91514006957003,16.322424268045406,16.941760475172,16.678878176018713,14.67137781972385,15.096810688475529,11.935192929594766,15.2271659511341,14.196342743106847,10.733234576382378,17.670079479193028,12.307124773805437,10.100378507436504,19.3382709112041,11.27331193523987,12.461093998067925,18.369717342890283,13.713662344561232,13.655087678718488,18.776732917408054,13.092845596340158,15.36565886899025,15.60577746123598,13.770087597359648,14.761928243238076,11.930002553181387,13.322733209659194,17.48420984565591,11.790660077607074,12.128073634285037,19.958134632876963,10.426339307211961,10.637178995624442,10.4224721981714,19.581942374796334,11.666005048769952,14.675388840356831,16.78768661129407,11.223336703494127,12.095169726889177,14.49942011392717,15.654437857332152,10.498974701341815,11.341456015398085,12.350336112802907,12.429434592721464,15.1804470290425,15.902318895270792,10.881853684635882,15.338553219425249,16.410033536482597,13.77041634568527,17.802028901329972,15.55078609063655,15.53697652858058,12.95870582951477,19.79425507940373,19.505734738054024,13.966922483349741,14.39254123332957,10.7493411575968,17.382973192621876,10.374650056480109,16.694546867950482,17.78368189933877,14.381904118509043,18.51899101083498,10.27369251696891,15.093567359622464,17.375687390590215,11.591822384912717,12.885550563247747,19.385471867625057,17.969566240035057,12.007982892294986,18.265527869263998,12.010337056037258,15.233990408442084,19.94569729909307,12.210523083399472,11.498310728725304,17.409739581834245,19.3168696838731,10.132990540323402,10.76824374463217,17.168977306849705,12.008175408167748,17.45758161659614,11.72886332924099,13.328695296172555,11.294213670064146,11.780637244407487,12.88265034968389,18.380084889690878,14.060446867714155,14.16589336925341,10.60997434229727,17.906464237593735,19.540846021925688,19.50947028034974,16.820333582898552,19.194840993415234,16.891928106019744,15.887692514293775,11.040785727374585,10.248301793543908,11.048533613614705,10.471361078202587,15.149114749020228,14.681543267150737,16.104171371418563,12.141426207169392,10.05938884709103,19.989546550512195,13.371775551066818,16.45278115468004,10.251303242905712,18.52280836319909,13.191126448942834,13.52701939840622,17.99364285532632,19.911952659340244,13.151261111361983,12.785940131799109,15.115438883427498,16.68341194082811,11.971602213797494,11.204274771727473,14.527519484357828,16.69305333140207,14.183912561216083,17.15616873634263,14.036315884574863,14.63157426776788,16.389911295811075,14.657400568973413,18.1090794613338,17.75070014347252,16.92964089503765,11.817725075914638,15.912480315423762,17.591640034095306,10.20777127587122,19.48624678085125,18.73507395985763,16.035202349979567,18.43495334419724,17.839393241832383,16.034939557431493,16.038610543178756,12.625698222733448,17.9614944457566,13.756115995357641,17.15289434698623,19.054487334884605,17.288683831959858,11.179357004076238,13.848777277294808,17.33561475642251,17.50914036413488,17.299867364618308,17.631816858273517,10.284829444996621,13.863412644812366,14.449210240688348,15.751507653637962,13.4070761483153,12.467724913247709,17.22808153590283,14.981794898314133,19.136586397749895,10.505870613959127,14.556834362594408,15.08140615985518,10.855312301108494,15.867002502647932,11.171852751106071,11.843936872993158,10.153355453625565,19.68609459150033,15.01131170907031,16.308542473967883,12.686111667337885,11.676441542318729,11.372657418978152,12.130299271330507,18.37178037521761,12.413297024720274,19.689253567397174,16.473755794740747,18.34297748792901,13.399869382517483,19.298892597688493,15.859277745886903,18.39190409233929,12.06552140400952,11.858696872435093,18.117298601467482,18.097825105036776,19.492998324687832,10.04523864856905,11.644290145292064,15.830519432878926,18.758192540709413,14.114936335434061,16.2891794718252,16.473529284151116,13.596184671924439,13.773623827167045,16.041364334766108,17.516104578359993,12.196382280166794,15.210082298484613,16.773339182220298,16.92140767936011,11.237783325192279,10.82333066473238,15.078926898880539,15.831985571552064,15.989881811076218,15.199588371367167,10.46712566624543,19.78454140442146,10.304603852715424,16.980748734040592,16.01595492851409,13.866091359252303,14.446963688569356,17.545522875826805,14.668505796788203,14.14868182961876,12.468496036603462,15.33912069104127,17.905040133475303,18.59528802900671,16.38856337821632,18.636354820554203,16.852693243306838,13.500794086788584,11.332875521172017,11.888310471870916,14.041580160488621,17.07606101115374,16.68124673085362,14.846114731335728,15.716693125360038,10.007403176020413,14.944164723667425,18.325174391165035,19.19900309177462,14.615153587250616,10.838351568777178,11.057598026525104,16.951739337524256,14.23657984000701,15.834450942780101,15.635698227408007,12.689636598717826,19.139239216826493,10.190602920240012,17.63226091828501,10.962307980480617,11.041709374499156,17.000648412690758,14.712886231822512,13.35327429727272,15.504366690761467,15.121795260584626,11.234124873857464,11.746130774464865,13.599130730035432,13.127698388504474,12.714877797173116,15.592320550111978,18.1145780793727,18.81055860985552,11.605441003885051,18.47997732258083,15.714966336977756,13.287516489527455,11.796662548436368,18.0799061815915,18.801113951992424,16.074745086407546,11.277433023724836,18.61239800811279,15.193015720557877,15.397132131809222,19.88720786705625,12.115099332675905,18.146630885881592,18.82545435087462,19.67623245121922,18.150181500550175,14.81305951261705,19.0489040339306,13.567111940356506,15.156154181309295,12.426241181557792,13.138908865929306,19.999542658070787,18.267776598870608,10.99549090971758,17.08479578105304,11.902508963810845,11.314890313565847,11.581161614947684,11.614562019698734,17.59906463266629,15.996472594010227,15.546740433733978,14.084438210054685,15.478938700133503,13.219079834665717,12.043720214674675,16.319100775143202,11.766934174053574,19.87548647374588,16.484889815685026,18.32074430594985,17.77459801905663,13.695780888658895,18.00098481265365,18.84255096395303,16.862438331543338,18.476220662070933,16.21466732046065,19.661070716828,12.175120703979738,19.43695711749678,18.52851532411303,18.30919913734519,14.51924514365057,17.651144704012236,14.472547591034125,17.851869728652566,18.40220059863256,13.600278019848147,10.198038019126761,14.962533586260175,16.920495098507295,16.40658737130012,12.21851379462233,14.290432498330162,14.545658462524091,19.92185800417785,10.190791160043274,16.953613548583945,14.019003913424664,15.005771639356503,14.542545691199845,12.324024324410859,18.462011727825733,19.515693987029884,14.17847776278019,10.679370846809622,12.39828527812221,13.517469181820857,16.608691093712018,10.89198047946182,13.735820813805937,18.63913620856723,18.16781737748395,16.78870748962828,13.195146821494035,15.679599343309237,12.151597822535095,11.014752009778753,18.46001712470597,15.835435412680607,13.405660193039136,13.388128330875006,13.303598747207783,17.067400060224234,15.234827707984957,17.637049074016076,19.831340569082577,17.30874024826987,13.017447284625277,18.376741072773505,15.970767503507254,14.600506850294487,13.593887557553103,16.0887968001637,11.954964529270267,15.334295330980334,19.813704241212236,12.238434606428083,17.029498413662132,19.939770190969654,15.807363413856779,12.79002181579777,13.24259519529276,12.774219327859615,12.351938761645759,13.01312563592668,10.768632493626026,16.702067541221034,14.718390948971344,14.26140115956775,15.250969547235142,15.281919804883369,19.805167360578334,12.743449459182102,13.902238469673694,13.672536656074925,15.994388700149214,11.10556139750914,15.218283134386919,19.7547987069756,19.056478713203436,14.550610823979984,10.918847083478116,15.277904417074454,18.220354198516972,16.064830972074915,16.763014548117745,17.821888251702845,16.635764744406426,13.93472550292471,12.8259839068584,18.92128079060705,13.694227612499867,11.050305478457773,10.759092890897612,12.875097380384846,16.798138072579334,13.447634770891355,19.169659825182677,15.271529696221002,16.73508916706695,17.551584848445795,19.90851851131697,15.914531086073263,16.242775154736126,11.93313236557814,17.410888715937077,19.42506500990369,10.286237531814892,15.311061423702714,11.964214628577654,18.924646892759633,15.668741550856565,18.504426057799797,17.90061997147671,16.55212977968663,14.7852402536205,13.295874775960755,18.222795818552328,15.497831189249965,11.633883365669975,10.637953656682813,12.861758320402966,14.555267804497971,11.40465465020009,10.493113788385065,11.518374144547748,10.539729065980435,17.15230728651919,19.81413740010889,10.43565700228643,17.672628272550064,17.343947857483183,14.659585226738344,15.346682320713246,12.927619814511594,19.973817308146835,11.183734986468208,17.478446025425875,17.839306760621803,14.850203595970182,15.178354870006093,12.233973080486699,19.216149056560038,10.010643339516443,15.697786621929193,15.720974247078042,16.538872536171198,19.178504046854336,11.042800277021236,17.7546508409528,17.644985591962214,14.28501772646044,16.826043796103523,18.73708700160214,15.997512056044393,10.113782250923508,13.371902293604794,16.76441884699252,18.58961063721051,13.81653624039707,14.661774289232552,11.28807133065595,14.019806230533781,17.058400562666385,16.61184823906237,10.381085315987315,17.30063108071244,10.839874652573995,17.446548905912987,14.248672654090493,17.932893751504054,12.155545597184076,11.626503968063705,15.097250988476848,15.28282752681341,19.065329010457084,10.0409504671523,13.930824041028975,18.627762233483224,15.914974869987656,14.211904365847081,19.694827084125976,13.309127766739383,15.763335184377347,16.877484293884827,19.45327381836481,11.28151253331891,18.605723148489606,16.601685047088917,14.032799775690357,19.05656531085069,15.874068599251824,18.053565684594794,13.547967114377945,14.569990690605433,17.779890450209304,17.263433294133648,16.057428059056843,16.856910793902987,18.146255544519953,17.035790088987532,16.57403738428776,15.315220001878519,18.421864300223234,10.627257997930492,16.8209402182126,14.980535881019222,13.993208268339215,13.539537591041954,11.842934247489776,17.10347493534463,16.5938010063567,16.36060959174472,17.980428935973706,15.120142612319682,14.026759256485118,19.144628573469628,15.09007446288585,19.502826257804813,14.166631241821854,15.35491770963982,13.765571679100946,16.319126572525754,10.863423601223792,13.18637310815852,12.405233481282865,15.643005306033778,17.461097199678715,12.909648035623318,16.116661063842727,10.834325166030458,13.57641429824145,12.610598482699555,17.105762981456643,13.98934567578304,14.310267480674664,19.719248909678893,18.574758933249583,18.920260890179925,15.314348347184257,11.518553441954932,13.377119205499362,13.03627764426626,16.472886394589565,19.8723922768051,16.03081928008705,12.456830306078679,18.278305035196006,12.119429055523288,17.470478089847273,18.307630526812282,15.349373194143674,13.423833757023951,18.983018043431215,18.09377746594599,14.128668485719679,17.65837587318739,18.810858256302566,12.95797540493276,15.0808896895255,12.402149492227936,13.129423722457576,13.52198637835373,18.53050354333724,19.94934402068303,16.557721079637474,17.645788930904125,10.29892358242348,15.992968684664568,13.207682492280746,12.523185272863707,13.758266756706622,15.950784569704695,13.113094588067009,11.53320718888931,19.34907885820259,13.884475864173254,13.143000913052514,13.862266124265066,15.419169850445847,16.458704040183058,14.820066183970324,17.898106323844356,18.124638278040855,13.299593475027265,11.447322160103786,15.318092132105601,15.413970275543342,12.573602896846845,12.68270702344461,14.60499849998257,14.449494582217984,15.496797506900212,11.62138267108762,10.514230833706712,14.379851078266677,14.65897465911939,11.008310645260725,18.460894159937556,19.615360008861614,15.202469839498203,12.112120899859733,13.009456577721624,16.280548499887217,10.580305071156443,10.103742687214796,18.972013202812512,13.00225812119318],"x":[15.149306347861364,16.010415500883525,25.785704908779614,13.518956047083964,21.43373048010184,9.316779728309722,11.605217806601601,2.402187756357137,19.63998693808907,22.213083620774096,23.613014457707195,9.185589705546528,19.52898875439319,23.03910047473611,13.810086295512388,22.064965821662735,7.244941186133323,13.137936912588541,6.326605144278878,21.502347498266413,12.476620183832278,14.652194297984025,3.999638944562669,26.14054506354875,17.71129492837386,6.642085540922757,7.901754538005665,20.16878608336462,9.584859155598988,7.5412969437255795,25.04736080019219,7.138167925715622,17.847218361926778,12.558373861423476,19.002757826452914,19.537006707308187,15.719101644168184,21.45333229441237,2.05054876557464,24.241270799583628,13.019686599097877,12.93070967980965,11.688868367949862,11.397280136325772,14.870035788836507,23.859767344116342,11.485517167838545,14.936760434168974,25.856443932106462,4.181857535950337,9.161650561168287,17.160128106668353,1.286016782614865,12.973415225582523,7.435248934502758,7.138384968254772,15.540983457341845,22.529414964324822,13.640121289227015,12.20562525025465,23.709885763148897,12.746744040925694,1.766331944360211,16.395928239954184,18.86768266902057,27.32709644591695,18.308192369011937,7.956973303818993,25.37687035582091,20.290835629120345,23.914091463181933,23.970226376821433,10.268167312792933,13.536260486008477,21.778372261646226,10.10116934091161,18.15686294522018,11.664323687289718,6.263901943066235,12.97640348650933,15.739084875695827,10.079330718554225,7.427457776489308,17.818570911418337,13.028063803238666,26.31529247986527,22.23026886716729,15.771422749651887,19.891496502964593,16.621386854454517,20.467140964720528,9.991644770842608,3.4275233147282003,25.583807865991865,6.949055197195566,22.08802572110294,20.62629935728678,10.986350707243972,18.126914842471297,22.323138106381638,6.049359215496413,13.719783191132422,27.728502282815587,10.42237007439229,22.058913723955335,14.752601118433773,26.28074664600717,21.85751064600464,16.227710604943507,19.62339439927451,16.571085108052944,17.634537278826354,15.024436277773633,13.577735390689309,13.544930662023809,13.976379739626971,5.127092416992167,19.117008032461335,21.705593797212817,18.233486454708128,12.682660817021747,18.796954958931643,19.2722414079206,10.243882546182558,13.998406352513062,11.657958937751172,7.653770186743474,8.915201581073358,21.45097059502815,15.283274677120648,20.076196667440335,17.466531485896976,20.1384066867736,27.24935847516483,23.625489939177786,3.287539580970378,17.747833285266005,19.144169061566142,18.950050917443676,10.72559355582079,19.342733554861383,25.686378043693594,7.710021468151718,15.028861551291852,12.179809355143421,12.058695032401348,14.584694588324162,12.314014500682617,21.574195235172596,14.51304910313473,1.5255930002684481,14.478244276895062,19.00139628117053,18.552573676351702,18.527279071812394,10.131122173194045,17.066602414797707,24.64653022660519,16.40175935121089,5.536729040160346,12.631291941074084,26.85119565559196,26.034597322256737,21.068860012006596,12.45927679172695,21.55047867435203,14.3479406880365,9.965079588511262,2.481802398064621,15.838536775216197,10.354605516232699,27.72172621650147,15.93726520773758,20.978660313385575,18.997368897079518,10.579248545557885,13.935686730994721,12.3789088225764,20.802047036411807,13.984561638011014,21.338956152039,18.17799792805789,16.9556402598205,24.90660255528247,22.85417901739588,14.598866755040119,7.524304742571024,12.650010722508235,7.887204150565901,15.595286445998987,14.423263897511147,14.026797411119368,21.045937455454087,5.294447644276888,17.750545105252026,21.828449343573695,7.068836289242649,10.45438926239141,24.054865626731925,14.853884629030329,20.70739677066407,16.97837153371232,3.3823381066543345,6.108127274914635,24.236723240781856,12.552866461869254,6.2033484688656415,21.87080174606347,22.24079341465108,21.81850710316876,24.024316570430905,12.48784671502538,7.935465790801722,14.988700224365544,21.82053629112336,23.876921500906835,4.056654214197617,10.064914450398707,12.168498642592356,17.45420726955203,10.686669410825655,17.08728188265275,21.317058574332005,10.692169005964804,10.792717555980357,13.242935745893682,21.397367573979317,25.487753364860684,8.522892081790069,8.91785132151295,8.929845081444942,0.4708558696176701,10.329221439266885,11.295686134096712,17.35175838633799,22.519394386249306,16.424614643932333,22.554122255669675,20.02805707632191,17.71571706527918,20.38378689118138,23.61977619196397,19.487633844535413,4.809619037436697,10.610691978546344,13.60419368339764,26.95906322627257,22.0185336666648,7.077189712875773,18.618710229328357,12.907192297300154,15.427366471401044,11.26479504944006,22.053575221856434,18.74426270877866,24.228848868539938,5.567209086934755,19.86333892083409,5.119239210871427,3.7552909145906876,13.641034871070257,16.43452140800177,12.651047751415279,19.776145544277373,26.68384791276258,19.80617330170088,19.3959841003175,8.135011943717629,11.199014058779856,18.01033639455115,14.153068145696885,20.614764485288752,3.773622281097977,10.957385305880642,12.973003665601679,3.457584716362281,9.82665207070925,22.496744861281407,18.077539051376313,14.189509109786208,9.932189335168875,16.504223359209774,6.976280134020283,7.132482205636517,5.5293298380175075,28.12850960538205,9.116540455909695,23.408892901567533,17.441725764600733,19.838385936730933,13.37228883647753,23.840299457413995,19.624960435390236,19.358907407763688,16.84334898732578,14.407022704297967,17.597543162203486,25.22383154210546,10.336846359609645,24.94154909022421,12.62250806116073,7.9191071743762205,16.749091426186272,6.465813547288786,15.233583479612797,19.989779657597666,18.946613517959833,25.28854478521351,4.5860771159696245,10.577616395281073,11.865085954773297,21.039723787351097,13.2352528818703,18.19497174097294,17.16689859341187,15.662036230536835,11.565841575562024,19.937404682648086,24.85757189771676,29.255823954686925,10.336399406273374,25.644334020546495,11.665242630520302,12.069031259164012,8.173549870373382,11.885041998058899,12.207971262945605,12.017050025178214,19.156293949760396,16.79873389071582,19.080387450353875,10.427379139409368,12.161832177075766,18.044430664846054,10.103943059112474,9.63514236045489,12.157460051928677,9.363792858832394,14.090202296369606,24.072076754474715,21.24098119331445,14.369574065525919,16.954537988563573,11.909743679919575,12.462934080631982,23.604093455432775,10.650703198740207,20.423359582979707,9.759131295378271,5.131398221421337,19.915622492075933,6.5977455059456895,13.035774230754274,16.609912043138195,28.058743200790715,7.996258427847643,23.788056366094438,13.059503260013974,27.303470011220476,6.4569583822799315,19.059840979499135,14.848832645293847,16.544374249022976,15.378361932756253,11.486272821750571,6.857841688410886,11.921834016075346,22.411839024484436,16.253132057996627,14.476896082511765,13.72421261706168,13.358804406783099,18.557033429497007,11.145215221585733,6.831142629916133,5.284674744705327,19.967149150635027,15.989031471706895,4.690980716241642,9.27031259469797,26.237804185624054,8.802580734786925,11.768636892449543,13.245005206214046,17.916604872232256,18.2582017807407,12.311281322589435,15.147813514702854,10.71507096549068,4.330215684729333,26.73111400823347,7.458684229412757,19.242584692540845,21.006885574937538,18.787648774875066,10.951160833919754,22.406178990252503,18.32188450633041,21.973465817484474,10.502102010123295,16.998507689504045,23.880776740615886,13.297897643976905,14.97306512329333,21.658020864550537,8.08509902298505,15.369109529955288,13.465479748879087,22.89981587733703,15.51322876964376,19.94880281587539,11.01739252189682,14.546236833459389,8.143987161871094,10.178950128363567,23.140405026297795,13.722655350376797,15.608126785599284,19.721865888780286,14.94774991837986,17.738090664469688,11.21102145531749,3.1955290481820975,9.913411276388821,20.443281790095465,26.11424781117681,19.50493538597202,24.480839781186766,4.294494229606176,16.037735803858993,12.321006678024752,19.01318865387279,20.078867934262938,7.096180498204314,12.743402580474296,13.908181042447604,3.239455085632066,21.79560063396765,18.144806789878515,17.857366004640166,15.168230342194091,15.040640169302605,3.803277058238337,28.66310366511408,16.160114229729015,22.948940378763503,26.200928744341986,22.64001885524911,18.413206461387286,6.283409934402782,7.394706048589274,13.153465899642994,11.178416743044792,23.07241788394662,9.123614263057496,17.738377520786145,14.544337005270066,25.207106293511625,15.136456495814619,27.050730129397014,20.64944313588617,10.52949555420615,15.417093382143081,3.0473650702238686,25.31881281080077,9.370896768907624,12.575631768359834,17.933788366501766,13.427392876802058,16.489514237786636,14.207741412384172,11.085266069387991,17.74145068426244,24.9618893136462,17.522395297967314,8.358851973746974,9.27920897533792,29.238505489037845,25.61923773975426,24.665102304864,1.0158424148955003,17.411716638456205,17.896885891382567,21.951491205142084,7.387247009358666,14.126258660792546,18.582246747600138,10.557516866336538,5.283625982814717,15.297877171438861,7.087246652934054,8.397378605863972,9.55190361311417,5.798487521494072,11.400409249637733,22.01963141650513,15.211102196856443,19.76869658577258,20.325502377898683,17.505426605700954,5.452737965309562,15.6510904959166,14.406004893575393,26.002770199965774,19.369919558232745,21.456107404202672,8.782123404106102,14.649853367690667,9.372331019623331,10.223757201336785,10.567448527346105,8.245132154343315,2.4919229156428524,20.6055017132739,7.299552288801157,4.855905104739464,25.575540302468205,4.8273745672311,10.742104512488266,17.133899968017232,8.770913730576048,11.043659675273133,15.783590798898992,9.733817548092736,16.68384976426451,18.315752626697098,7.709857392650754,13.898878976625358,20.30951218487411,14.410535198193825,14.819520172792105,24.540608498979026,5.619305348481946,21.44926707350826,9.91767705071213,18.952257737684686,13.452028376725673,20.8408161549774,20.204386102964598,9.538770181486436,5.415015445672083,22.86458697487135,6.7246342906379635,7.480801236708534,3.8244374540550696,10.553239124616526,12.233702345223703,13.099487559462464,24.72199440934604,5.676905524235119,4.802055201659854,14.655792150975346,22.937224616241807,16.46303628711938,11.86663266819804,12.10351889021537,17.446279978404995,21.462349799631802,12.20464742595241,14.814124751101938,20.540285645887025,16.417364642231483,17.81745628807127,12.097632564993551,14.142890315715455,18.14930368912318,9.155419273189384,11.430420885608246,21.59128373603451,11.146942361545504,10.855080612596272,15.340600980491887,13.382311150582531,9.684380170204445,14.63453466958903,11.5604410897346,23.940793379851044,13.899613446367395,22.513101362820642,19.86243811348106,6.356010203854165,20.594036802396484,21.25474720338391,10.207181391980352,24.192319443392815,23.415616987678195,20.00981667760223,23.931486341308872,14.509406395094816,4.2959156773425615,7.055964869094071,20.79371095063883,12.740903983713809,16.95968868844057,27.030612445847588,26.85100777622327,13.224673738959742,18.611751133938718,17.769088424420186,23.000681892473587,12.99230333820541,13.302100408672512,17.644025900669504,18.042957720262315,11.040926043409467,20.852267503660805,13.331604594616493,21.712728932514928,10.818730365406202,7.786069659111641,4.237431908526103,25.570857750771005,12.715469653945693,14.517386571844488,6.604901668850376,15.16061279339663,14.626164211558084,13.965514253496604,15.847752452058984,16.283217879140427,10.047608645466259,9.476575977279438,19.28427672219897,17.543835046713994,15.149856329052458,23.802448610044678,26.391054472757993,13.34730504732869,20.522833243397912,6.480734063976534,27.620097034306667,7.268707485521229,6.035723753031236,19.84774911673585,25.510452869834197,20.405182390004434,29.094612469575637,22.767180173254726,5.300646297198397,15.35820050493912,14.519802306570922,22.68883849362004,17.987128567910165,23.02870027723317,18.067452259543828,20.470096070855234,19.703852483263812,26.21203264226105,5.352414719570362,5.5352391713669284,8.233272614057881,15.649601385165532,3.1493171097806605,0.49262780436307496,20.018456482272505,6.017879529767349,6.53868011627329,14.167235911722887,20.380398802580117,20.75531318377421,22.868913683969758,28.291746872443763,15.83142766330011,13.070173863395329,15.433023466991788,10.20252564702665,17.879890341116138,12.776258774260942,18.446262865638474,10.734340435186947,16.865608482376654,15.559491204125472,10.395746920258969,16.126727629293562,21.86595914735036,28.83054754290997,12.270480532693567,22.43632937410368,10.025251129871844,20.99702921336693,7.829329063567874,17.792319937733772,11.017691796757909,15.432332181057337,18.645161233955854,19.074729657127122,23.718067544130214,5.6590543273535925,25.680723498057468,14.689100145899122,6.164389104596588,6.712632690702753,23.89137394255274,9.114171095636003,26.252473934717685,18.493667535321585,15.365293641665872,26.811931390853637,16.127650905233942,15.142318502593987,14.100149082478715,17.289142651157494,10.918290230569536,16.546188653769033,8.694610359580274,8.169181174938497,12.514918653517123,25.65331942321198,24.5169590772703,12.160590699704423,13.303522151719335,19.519373480948254,15.483968577699859,19.914074857942158,6.38463057512096,12.382493422106073,23.234973031263657,16.42629252331676,8.216212766344801,15.718311152977984,10.682674083080329,19.88560151338838,14.661281415522776,21.833617330608213,10.972623052198227,8.576694532254427,16.54887275669717,10.457588589099263,17.81737269288969,22.922453944272938,19.707592761070178,7.104597017156802,19.31455500739202,21.135457159106668,15.766079777926581,13.329375912594223,27.35417454020761,2.30802841770944,17.289290808254254,22.590996760672475,19.351777889002346,8.47205506848082,8.95225515074708,24.442824770956044,7.926157698591418,16.156811138686606,11.668079827920048,7.6706202814292075,15.165310973567145,25.53061222923322,26.70829282850471,22.545329209272946,23.214212087137454,12.488177655714889,19.679685099238206,3.6504363617539637,23.986713677523667,23.6393445135692,11.756651080094402,22.669131872158232,19.10688541926782,16.094798633648505,11.23926075551596,23.556751912857482,19.118359624954635,11.429181971186189,8.430134784825174,18.801226828444676,9.712818549793361,23.813694400137955,6.830873954876859,21.06779993921518,10.098436845213861,14.623368135773683,16.02448765042017,16.284062887819637,12.014464346168188,10.125350481624992,17.340617234286253,17.877937917603,25.99024714527368,19.36908905079302,10.189030917024027,21.332897375891616,12.717899784379025,7.682327478995627,19.51265898428228,12.911316790482255,17.803043456625176,23.273822589102906,13.24685551053733,14.808456859154894,10.029036253779127,15.907802587007625,22.029206676015498,13.945917157357211,25.03114720686083,21.92081153629605,24.174712512463795,15.794378518490175,15.82205873950028,11.675018904969745,15.8900990794886,9.91085389915531,16.455329480030535,25.10269481081427,13.144618920844257,19.24571343558403,8.159410042376594,16.920399276980838,23.542223581868377,22.508572479354427,22.191274846114137,23.560338993690333,23.824975898159877,8.765047196845677,25.01340655691869,13.11666054948752,5.511955916499058,9.349809027410934,17.514748542451986,13.243141552701328,20.922464037098404,14.773082217698299,17.690072907650393,1.8138666574696005,13.558662902572507,15.363760155866075,23.54810187983423,18.546005027529993,2.8610164399153737,16.591082413400773,23.1260541133783,3.642239586374809,3.209916131716597,8.844635826089018,10.89728837928579,14.40240605420539,20.709744167707864,16.549920374544378,6.618274026175744,28.60591662414145,5.302641717122996,22.31750373079069,19.374933827295358,12.222937869061173,25.72860988062292,8.329517035013092,10.76384485253133,8.92208336532265,5.785575938794065,16.740129050318295,14.653430646225354,12.435823764447187,8.954272541904455,4.7869917924052015,13.776663723953162,25.61303397404214,5.976295250480557,23.017920603604445,1.5216331138967853,8.839676408087747,7.327871527653893,18.0315130968822,23.42987074307604,14.729323436775232,24.68199929826653,21.972267923676576,24.280740414466308,23.0732675600147,11.902147051458284,11.059595679192098,20.11505496689137,10.34136298658346,6.13771936505292,16.615137335463615,19.854449691685655,4.735313166876702,10.301373380748306,25.836472014350544,9.333940316946666,8.018879186677793,16.795129258105536,8.180410686056574,21.05755960390134,14.389217600164653,12.974401508495491,9.82763325714804,13.836574927229924,14.688890475864781,17.729913349116654,19.027798589201648,2.6231841783698906,0.725146967957444,26.592187941484998,20.069825487445,19.547302345262167,25.964168302026927,15.838272437893597,15.701696860505614,19.026787563871995,16.97168813894642,16.861907596436353,15.1482627908104,16.03792764982247,22.50406325699717,12.731909868559875,18.42830449397048,17.08663996430687,7.637874340105446,18.66403312280881,27.515499901629074,16.255643399491895,12.515823514186831,10.885491368667232,9.642397219184137,4.7686418882729775,23.66567094465268,20.844275863909353,19.48619078147088,18.95925260527241,3.172182259590417,25.360167177198143,8.499731540125204,17.31647083641722,21.029431818899113,4.8983075247675885,19.217480245895505,24.01659313452074,18.78808926300827,13.022114873136521,25.441173029753017,8.639771058235638,20.75408721749414,15.603734403434139,5.68273540452068,16.66632791705092,15.473039667936174,17.524089433897725,6.928404589084016,21.912921246633385,21.34097765778477,11.805168871601362,13.145358967061743,15.877891930754899,9.715980456533252,8.025324288418162,17.869056186678627,10.80093402143245,17.1227903143608,15.545509205687818,11.617640942529244,20.437185565250513,22.457716443431416,9.721921363053994,29.06017696654188,12.502184399213437,17.983772571136882,20.506217884944522,12.164311482916032,11.1432540368173,4.174276063178195,13.569480138313528,23.537581225591858,20.76057561104396,23.095515285024973,13.64103715312726,22.69120172697594,8.704655299816118,15.596766467935787,7.310296465776864,27.168198076664872,16.78781706190434,6.63621322574327,9.617000361602802,25.06903299873259,18.592074099833656,10.838426210842433,21.171638678700962,8.760395625249526,16.575969364483306,7.5114231923557595,16.91158765557386,11.342972236583266,7.515389996477855,4.98758138832732,10.121540427143177,7.581197084287037,12.722512603409355,10.06946943502928,11.838041086667868,12.014818784670789,19.164433461933303,7.003172730522305,22.85539860712503,4.680179324655043,12.865323491876577,20.328296529752368,3.2955820325395546,18.577670544895135],"beta":[4.590848518902064,7.916782602401835,8.308049652231816,9.607393208390771,9.821432797965773,2.800929233294611,8.514287972888184,1.4677283190821533,9.879799523076414,6.785687641395568,8.693691452869599,3.250965789593263,8.07910632929481,4.993904270844142,9.658445678411198,7.224154946019845,0.19351043199372198,4.018931053752617,2.8372117807030506,2.4124836205357836,1.2827167470382195,5.706430140241334,3.9285961395236146,9.726771886136811,5.79511957569796,2.7155056384262966,0.2800437763343133,9.463521400122161,1.3607564198583533,6.51228738619861,8.674713592695547,0.651813935133112,0.26750490561778806,1.8932503161779413,0.8500528054373313,8.844772882103529,6.129436563288095,3.5723774952940546,0.036035731016359485,6.754938783654043,4.956059009243856,8.349351155202982,6.958079898455867,4.034657885510422,4.776332187097292,4.7570580398955435,0.09908445155646817,0.7620892910287802,9.092977599970222,1.9553568164865265,4.414314808784747,8.593132343260974,0.44296963921875987,0.07650616598155802,5.718686348053663,4.476004122975792,6.097998368890489,4.692225606800089,8.531375251395364,5.891151402885377,9.628133777744054,3.080319911499141,1.6376527433524823,2.8865068091470825,9.438500015358626,8.784910431483794,4.55669421839342,6.051580531963547,8.323897866351412,4.376063162660024,4.533630784478588,8.454767675401037,4.583542350759191,6.6664968040807455,4.196828751030768,9.51315229155371,7.43988527346332,2.1792963452987646,4.788781582819355,0.7451067770576891,3.68195812201376,3.262378232121752,4.23246198841313,7.554228068705235,0.261155969261353,8.767380669344139,9.290847860509766,5.8983787447942415,4.468015780936561,2.549523505773794,9.943052693220267,3.916566341572514,2.5961225402737287,5.747694336561214,1.420996594896633,6.961770485772285,7.910934943081025,4.045132508637175,6.453358440234977,9.154460597326946,3.612428715430336,6.620242495692688,9.986855563330561,4.585040746843701,9.133117356086583,6.477813273668516,9.272714631065526,6.769258965090099,2.8761709749834075,8.333295440258938,8.724956683579714,3.170006677548589,6.810087381329113,6.869847377266625,9.279825294184828,6.339111915931253,3.222144178282691,5.58243962547091,8.24906903244729,2.9866877708036466,7.6102943572667066,9.436220509660716,0.7105101821071669,8.308566213951528,8.640597674727847,7.310848333590947,0.1937281389004486,5.674876517881852,2.6556378739657416,7.887910474582867,5.147887599180532,0.2330947590918031,0.401432027220876,7.677553072181156,3.7576206493005393,1.1335780754289382,9.828284385018346,4.670356050497418,9.167071067037448,7.108280375267599,0.8157019503671425,7.519811117015662,1.5775986802566644,7.1577053010637925,0.8385992286256028,1.7684825027838613,9.910614423316295,4.3578679702030465,8.019120433893116,0.6781895624103518,0.11553065762169634,9.719243544648183,7.805288157860007,1.3194732225941452,0.20935156378935948,0.1400221905230281,7.0428187060265675,9.513038921729953,9.683206396335661,3.4609536937862195,0.025062937659370288,7.2511564309868355,8.554973432714885,7.138750794151085,4.300428958596094,5.4575836063509815,7.225361354789732,2.9123566978270077,1.7913936010736076,2.9527010491439487,2.4263867245277693,8.988115490539684,7.8841686249937215,5.471961145284785,3.939451626932986,6.901931454309052,5.5545940900772255,4.025950659961898,3.5193946834417367,1.475799411139176,1.8173818382975049,9.337648365184537,3.6322598456960975,9.594332470184437,8.918873559462384,2.8626293484266174,2.087585664580933,9.727768420110419,3.70709600705049,2.0883767161553735,8.273430439628779,4.361886617897657,3.8727512679814446,2.3015464285810494,0.9581743819488109,7.9257910172733625,4.291061719530223,2.9071363826675145,7.381763135958968,6.555691282056888,8.465624447759104,1.1204052301088563,0.9469122207618974,1.7031793069487855,5.902855006738954,2.5968100166529084,5.040640580877769,5.330507704265721,4.770975737091083,4.445746836476867,9.064981930328939,9.92956521945596,5.9634897049059425,0.6567372022222595,3.464792656928486,6.922659605768491,1.8840709290358504,7.308382703356136,8.441741640857359,5.840902196867004,5.878544422458338,9.00419170049798,4.780532947908891,3.453004211909607,2.77923122735233,9.060560795555988,4.766281196267361,9.47916726071735,7.039547887027764,1.4013074507897127,3.9678571939186558,0.2945154713308251,0.15425457160415323,7.343359139113968,1.7323811121049237,4.219139581517903,0.34206944845348364,7.928965013740637,9.17315651136617,0.3178582871658753,9.246943459366516,4.703759169134951,6.7374019376659415,4.641739060247339,1.7370264816940506,2.7647146643448295,6.983087938942321,2.704241024292242,1.003296755660279,2.278472477770408,2.250342441082138,9.413501092616123,8.163949428194341,8.33061092835483,4.618079736317203,4.422980642693797,1.0540475106745495,5.4677058542590995,1.1836996871410022,2.19001093880846,0.011466734529677058,3.0715789420892214,4.94790316830267,4.914114683005069,9.687148537421502,9.466136123923569,0.13172866093954072,4.0080175557598245,0.2420137290986757,8.440290614042807,8.022123018200011,7.192404553074223,2.450637019709203,2.6980285776797808,9.559682928858235,1.8279690459551179,1.8080018884218796,9.699512477209282,0.45260260923620566,6.885033410362751,7.652730393963703,9.344986384635018,4.899251824457376,2.9154177288741656,4.003932181994994,9.060248264792374,2.8903406633530504,6.270001930707414,5.560590370646199,2.1566529748471397,5.540933341561713,8.128119185022712,3.9739060378627244,2.8328230980462643,3.1852977272985306,8.837117391217895,8.423692012220448,7.897728148135183,6.469644804848351,7.141091111214055,8.08036007244068,2.676034586459719,9.216287738315955,5.433179317337697,9.038660692233494,7.685252446637736,3.39092537056924,9.592745608051985,0.7167999693342741,4.6617369977905305,6.081664695804092,1.582520248115158,1.2210791077859828,9.508315627353465,2.826213489176863,7.115191200942952,3.6415437251395533,3.669116951834148,5.035991629341345,9.582244519020094,0.9913928666991922,8.862863385725499,1.8410365969977938,1.2219911804906425,3.2267411530203494,6.393758123257916,8.409954697897504,5.598824213549265,2.6798354404327607,4.3453945025053065,6.138392202107356,9.056424579773193,6.4051229017019935,9.653753033637383,1.527650087842043,5.326550148827387,7.3705814896675115,7.294192971599411,3.274223323158749,5.196579408090598,6.2710256979050065,5.1616596947401465,4.431614773058941,3.428918033634547,5.987954388727086,6.3812063663205265,7.991090801758607,6.154185429354603,1.0107226748406384,1.0812216432377175,1.1184573190475877,5.2669590996344855,6.442803456518053,2.265815770820234,9.48041880389991,3.4383799930342485,7.540723132839398,3.0922612673903616,7.558153631440916,6.4541133636140335,7.683258287360046,8.361567184201206,4.533143374786399,8.05004750305715,8.029485905823744,0.6891350549222519,1.8720685116395885,5.108536685213574,6.337989597938418,7.200525050260527,6.02391635240306,1.0061608339969386,1.218386272722387,8.873016750250901,6.760056923710042,3.3958722917504813,2.9992948622519933,3.9172391834746567,2.100050940844267,1.1990891374320323,6.272771169379244,7.924709274226949,8.406688326387595,3.825866141790848,0.6294041938732975,9.054171887036063,9.879899225260644,8.130745648129494,6.005036831591124,1.5463181085786681,8.260415064558376,2.342585901088914,0.9163395666694019,5.801680354032879,3.964852060234869,7.462761227244384,9.012227606697596,6.9326595045678685,9.132872083982829,9.77102305394226,5.4698056495936935,9.177391625980043,8.463582437485059,4.224828810863121,1.9590061797195268,4.574497619839029,5.127519226914572,6.216283208586972,4.047668138814466,2.485632827417441,9.228510846093217,8.849194666820893,8.966538673536853,2.400748591638795,3.17895957458163,8.72553557438518,3.5388467607313023,1.6570615847330772,7.584062710340634,7.045639708155001,2.466312676196696,8.754316484708307,2.0766355693569882,4.210770415309025,2.406781229153161,9.437119033624006,0.9448985938487864,6.707504028683628,2.0685847070980445,3.9384612294622423,7.02388107682411,2.4353014037232246,0.5488019167092384,4.724590538397921,5.341233905958783,8.933775082202825,0.6814667313576783,3.076390778584883,7.422030213888123,1.9206498035333008,1.1957016983531688,1.4846980922501118,2.335183166718189,9.663713649243522,0.18200994185965547,9.614978805626803,9.320520754963908,8.806301942447805,0.15958454123424337,0.5777497135956411,0.19176112221316322,3.8443685299556507,3.351382273064618,5.496079705203909,4.782197266859054,5.9058266917961655,7.788898064006258,6.188295493415548,9.380586697681554,8.057392870892283,7.17502462470057,7.054208354057156,2.6207766858688952,0.25196460963297973,5.652999005579893,4.540019289895865,8.591869224701586,3.4073126785563956,2.824341414955631,2.5340188974591316,7.7369991722232845,0.1987857063346965,8.868444976010121,8.262725877516484,5.961594844456313,1.6357245200232007,3.171153109533491,9.362248952467507,6.161998951522795,8.330419764432813,0.12217467226161904,2.1239450413518934,5.206182374451986,8.29495922933297,3.944923515511194,8.475921222824317,5.243364123983813,0.6334690285603006,1.8081477079406416,5.440047024282462,6.56952155972268,0.27089025872061967,8.311799616177195,5.524499213322896,9.935223124991925,4.797152868062085,2.6355255769160935,1.887003629891324,2.0937158670106326,8.276852782326014,0.7516067818346661,3.0987951856161344,3.363617174175846,9.745852048472756,3.978518417343231,5.310486344612495,6.510486393198757,7.594808902975587,4.097022481895407,7.598064229855675,9.931286330399692,3.9781920077720367,0.551054344526476,3.0798049151832485,5.2840228817273305,1.4392097814939842,8.39006744941557,2.1593361672412548,2.5094203169867324,9.132340916475668,8.268188469940888,6.82823372920875,6.983209827558687,5.2550070699141305,8.562472077191227,6.018856653147742,4.957514242722185,4.996095464631782,2.43598252652528,5.270513355600885,0.477914058208897,9.302294270813507,0.32628010860371814,6.638635544527542,6.477749651023011,2.5738280307326877,4.629147775496438,7.874520075640142,9.821511734106927,5.874299056126151,3.997864150017485,9.708774148734292,6.433962663071931,0.7172989857622314,0.8510975279113309,5.682584131965742,8.473528219204496,9.945495276556716,6.059285624620694,3.09896305225261,2.964270899046324,1.9624337618359156,6.160176805477702,3.8821589162820036,9.96679026724015,1.4574342149805952,9.291175020221552,4.847357792912311,1.6555152704222298,5.545852280743066,5.605093293480583,1.4036441766603813,5.683644077274719,1.6468207798182966,1.675929596928305,8.96545697072238,4.3175576569440395,4.900937154730089,2.9412583913290313,6.0046535100652605,5.820575552328209,5.057063723598423,0.34218157807743843,2.728039671381799,2.0045340035215364,3.4528141745440943,7.097363346800036,5.631920254527634,9.503036505521061,5.176802189478462,1.7049930209574549,4.029252727761399,9.510752938316191,9.954866668938871,4.444390166068228,4.224260278458929,8.763361100967746,7.423623211465504,3.488869389338005,1.723191533069699,1.1158258920181985,3.7068184456493314,3.1788380199472055,4.012354451246254,8.206903771601525,8.255792275424831,6.992521614942184,9.135366629070429,8.5654563415949,4.537265140676796,8.264119769584646,9.93513307569571,8.590226775152592,0.8872613683870734,3.2350679794075043,1.5352295071188937,7.862692851875684,3.3074990209247734,7.324511230972348,2.206772634778653,4.197724698953655,5.720246285502961,5.347054370603265,2.4882846333396724,6.049657024109241,7.82789012938343,7.065931825828818,4.660491105059008,1.4439358240070277,2.7935378340924255,9.696131760586029,3.507961342533379,3.1179995954447293,3.9503327776838337,8.478499417064045,7.215641733107667,6.82603273218141,8.210164893102768,8.564079658759605,3.045013876491507,8.766200905542272,3.4396250480980584,3.9576933211932874,3.306707557398554,6.126702410003229,4.326332544671187,9.334194855959446,6.046250035504612,2.334671943005331,8.6505361381179,7.4046741788532415,7.483979937727736,8.089124432844148,5.599384173000466,4.427390945999252,4.649530910748016,7.983444926884424,7.604959494957235,3.7190128211763795,1.5393116036196353,0.4819360726425259,2.5467835324730825,1.000376471442339,0.4294297104648037,4.430144632279694,2.849051860757983,2.250101767807129,8.199036042308938,5.08889803484845,2.138553471794744,4.411491649481101,9.053315872136054,2.8844315189540892,3.760662811288915,3.0329912010829574,3.5800460074214624,2.363044417511635,9.178675636308416,7.515335357061163,3.1551920456745552,4.711700044660643,3.039189793406565,0.43247260413626254,1.6007679425781696,6.75948170081236,9.44137240677181,1.9632322363543486,5.25285215753023,2.6248507373597008,2.377204950280505,2.0285791911948103,6.070170604637866,3.4582190645099886,1.998462704491124,1.7682382162289034,5.470924323368913,9.645411546243741,0.4972788218226776,7.288775360219077,3.4984506634778034,2.889187083029676,3.0109900322260486,5.834591106259714,6.362768292095396,8.7568930179793,9.87315301636356,0.27099834590989635,9.664484467104746,6.159491721061679,2.961052447550332,6.594769025200962,0.5945075075739203,9.254007607644603,0.6894795520781538,6.664668331053496,6.75565112428181,1.7563624262744093,6.412030964622122,7.9624345368169225,9.568154245546534,4.992287704453986,8.388738513042565,8.92779064768882,4.129459225999856,5.084920120561545,9.759817468272372,5.606675840229154,3.476130924262133,7.755453539220154,4.2413856158553465,2.5449287300165158,6.892228691592825,1.974078064911191,6.8759935883767564,7.338620829534872,6.99701791306037,6.735454412496504,6.433870929934773,3.256237458172684,9.674960529196895,7.459782282960821,4.674633705587572,3.6154904486449646,5.348700872369834,4.084213989485541,5.8865412036154545,9.84675794223435,0.8446710441015992,7.547642134563515,9.372749636315172,1.1024168479746566,6.5740060748234015,5.030208411090252,5.453217833642398,5.147669136051989,5.79956805083768,6.126441060140035,7.1160377718180285,7.847748642528762,8.248959999510523,7.088483713849643,7.45959120095391,5.764578681323583,2.8832981232890487,4.822521293509996,1.1802855080577546,8.669198336375938,8.733840104882098,0.8354523542848757,8.327834609527445,3.4918704484037133,1.155499492507157,7.613978090890439,4.900201290551389,0.6353995745147922,7.982981379436048,2.2202472826029207,9.209715688363893,7.913811458470407,5.099867224248742,3.983606078392359,2.4567133271075603,5.341429671244258,3.2769377129897337,8.054143674067674,4.591283692192254,6.457237846976223,4.953277699436094,6.386151507926203,8.735914197671397,7.530398127731828,6.1464747926229695,6.5367881065267035,9.844852483804026,7.256441808061139,7.099126283436663,3.1460416173383288,9.388426785902942,3.2990228530349164,4.2037951979831,3.127735597053465,2.900791989014606,3.988842918181581,6.0746753604005495,4.269366096519944,3.8331483610918404,6.955587908979075,7.579056768204029,7.259087003762477,1.6910662090858697,7.98799068081681,4.533449086796986,2.562291740455782,5.308796839949479,3.576719583317045,5.851096370606568,4.977720363386872,7.805272301167783,1.7793663610107724,9.503146606197399,9.267406146461338,5.851014874344123,8.556682629749696,7.554741443097843,4.70751650137907,3.8821215097059003,9.622930994195361,2.7741525585384963,0.03234632856417008,6.61877645742432,2.973679087787069,7.832239832400438,3.7719575507346415,8.427278406399452,2.1301571603046687,1.7087550950450003,0.3954985324210081,8.419473036939127,4.800059308476317,8.679693612502986,1.112386378907555,3.2518205692459268,8.303959614946116,0.034795912219944825,2.0497908260267095,7.206064592609893,3.5261086412634723,8.08581793631912,5.316172042584797,9.736435371440155,2.2403442990077527,9.196144715058379,4.230020822767056,4.1121546627249455,9.347693833763453,3.5869270641405526,9.932362386431645,6.8420434081352965,6.490419393208466,8.223692182049042,0.56477604890802,6.430623892464231,1.384985053542429,0.503491049770981,2.22456378630014,1.857218849538882,5.588776289050619,7.8956709880638325,3.444692299220975,8.2233801510845,0.010539153409105939,6.800334815107902,0.8101946983902009,6.656878626024449,8.397850615081058,2.3689016479510405,5.314550759522092,7.866173963694008,4.372854049735125,4.226675400472102,1.8978322503736478,7.398734385587082,9.982126806582857,3.86014848389719,2.055377225177908,4.251210789220452,5.370644379136986,3.200292250332266,6.829206646456239,6.3296253258680535,6.143919986002649,6.036675578456161,1.420117617372969,1.818477204702551,8.47594812068758,8.071104210150025,1.130502304155827,2.0640589794206643,8.503250675616856,2.6015628664607293,2.014061156480107,5.421166446059685,0.02307603355618415,0.569299010639408,7.90110375385662,5.168044702357113,5.551888551778406,8.831240174895022,5.09227005463968,6.891741775098536,3.0931987290717267,7.7810960241948575,5.56748870632447,5.227466311649338,9.866236986824983,4.3065531273759365,7.24118653579956,3.2976423858666903,6.985722796437457,1.002342517049457,8.059068869266351,7.703532510021387,4.0898691569706225,3.358391591337526,1.806188462528524,3.5817416100471533,1.5204987733090558,6.103812631815049,8.20034012390266,5.931435262005323,4.284279922480588,0.0960514820676428,5.791452166037809,4.539857363524038,6.887986068347683,4.941439574171058,0.0224098289245922,0.8606665357511445,6.95014310874702,5.2274818848011995,3.377766840668406,9.18669524845512,6.6661630480659255,7.401811796644906,6.402659360026391,1.4563588639467628,1.6239879448407457,2.2822689044121924,5.816725880575708,4.971791921373471,7.660784316972475,2.81642559079484,7.787300682369745,8.321072063464213,9.245211952697076,8.116652077870448,5.671535449411693,3.419681296941275,7.181810511791431,4.522758668519,3.0426242772875733,8.327036423320466,6.742949358853114,8.553999771459646,8.720595719155641,9.34314823175754,9.386813958931457,4.9053269413054945,7.316079714316867,6.451810598221243,5.306893150158009,3.0708934521571596,1.8184485770750514,4.772685271240924,6.146551151487469,9.284561915823495,4.471707586532217,8.94606226080449,8.524428645320587,6.434533830816321,0.589832873104954,8.872290508134625,5.310294326735551,5.318659889283596,0.6456429580527745,8.736337119707123,7.517233834026613,3.20307797431314,6.550133857150751,4.5951345223507705,7.559888558864875,3.35890928473781,1.2747759342224407,3.569375958535037,5.140335262052087,0.31041986669429367,6.215869719994802,0.6459377877436734,3.936777014405768,5.379683295918964,6.589523715833632,2.571169976975778,7.932773659262644,3.9482224724705994,8.947358139991376,0.3464301116414181,9.677669114519688,4.399607004282931,3.234605308651912,2.0041207326003185]}

},{}],120:[function(require,module,exports){
module.exports={"expected":[0.787311060156061,0.6217925506193527,0.9845266501607202,0.9730224874939994,0.8744936317588077,0.9990357714586677,0.9003399045368476,0.47209758581830075,0.8985937290632698,0.692095243128348,0.48881812168914973,0.7534751780477194,0.7279009822257357,0.35105073601137116,0.9025475572138516,0.9265773233002543,0.9968190625424459,0.728322688324778,0.9785620227099292,0.9220988056816198,0.14570418775760197,0.9900834069343911,0.5339574690749522,0.9993503822436495,0.9183148659382577,0.9956879502773958,0.9986132940324849,0.3084600546405718,0.15514841201900764,0.5416843332055252,0.36118384171016427,0.9993588087444694,0.8790121478958671,0.9124453121604899,0.601277042032941,0.9253336554445546,0.9824612912941891,0.8874216618952755,0.9989785497221085,0.3076722293504055,0.2439471468315204,0.9631948469441279,0.9646670007885154,0.9816557220110845,0.589092436276923,0.8806783668026991,0.254965204907871,0.4463105431234453,0.9985298208831062,0.9790198596055841,0.9596314783475479,0.03911659907181986,0.9956022663275874,0.8060613667388431,0.9103929809986739,0.9943309393563876,0.8659873899505133,0.6748810884863461,0.8925529925759538,0.9996677517839325,0.9957479776592396,0.9987463283616856,0.7510366414474132,0.8646521638040159,0.9464486624616831,0.7567171731651849,0.9996534950802657,0.681543922959868,0.9280143691651181,0.9967666909477593,0.9765342181625816,0.6605089348455477,0.5475714131180676,0.9874983543402309,0.8672645369739979,0.6680830047904692,0.5726203679627521,0.11276095031234634,0.10151838246085976,0.9822593856419455,0.9724392418475395,0.35464848454966413,0.8035843179511277,0.3954472288178349,0.9893892448029471,0.5587757891899668,0.5453008330440616,0.24710245473333237,0.9357099554596304,0.98702571720401,0.21940199776395064,0.8680041136031084,0.9812538683148471,0.38946971880307435,0.0017064042868085716,0.13840988621127626,0.7320771199552569,0.9714672067169747,0.9285789458003417,0.9973823862279468,0.25834836975724507,0.21671717015513803,0.5287696572181839,0.4172160375972125,0.9976629936089282,0.9988775560707642,0.37590406918277275,0.9146843965094911,0.29794346677454675,0.8185932329062208,0.9947464360605373,0.9156870348720033,0.04186196265776909,0.6732940212387377,0.9975619047910489,0.6209071055908054,0.5711967983873825,0.3665579467796808,0.8438659390183414,0.6894931924269776,0.9985228073131739,0.9080906301560236,0.7627064299456822,0.9599683350234567,0.9570798794592149,0.22633988500269508,0.9475381183117882,0.9944204549261089,0.13456725670132663,0.864928185629803,0.45982118934221616,0.9984593765797728,0.9230522696288472,0.9982437754639808,0.9752486260198872,0.29625264930176143,0.8429141016013568,0.9914428835829074,0.4801307312602203,0.7473669677199863,0.9499660486381064,0.9728769300929191,0.9991804015703765,0.998799862203483,0.8846066064738659,0.4462433857245647,0.6608527498278116,0.37185010417979314,0.9931959508431168,0.9972306515699775,0.9995510231371069,0.061466204053044926,0.4993887321804149,0.8677876389191056,0.5131875669436985,0.9984230093611306,0.9982826178090752,0.19115993604882964,0.4313920414594433,0.9648999046368241,0.9999262713339503,0.99874653758067,0.15919744215348752,0.9800856966101941,0.7968508240312244,0.49353300155628854,0.9991001014001004,0.11575144165168405,0.9299252886970754,0.9983580225779006,0.972176399792825,0.6628016291486548,0.970720923805685,0.3591966262005837,0.9892220837661444,0.9965137058818354,0.9998545231579764,0.946103396764572,0.8677832275936196,0.9995872624232348,0.12550317874262384,0.3705009906564435,0.9949342575195684,0.5328429632794163,0.3377410067105385,0.6321166765162931,0.9796288454155921,0.33260673710818045,0.27223675048377727,0.7080460131499713,0.2105902539304897,0.29098662217801685,0.9984824857553958,0.9834857378540678,0.4648618961921095,0.9724681071986694,0.12969231089778765,0.6742497579443415,0.16277355898640578,0.8100619363617054,0.9985518583025695,0.9716455603067934,0.5357065102788366,0.9130505296786656,0.7781887522547132,0.6094994064862846,0.999298161692603,0.43287312285735247,0.6342699299535236,0.5858024095016963,0.09009611509903659,0.9983652969679279,0.4363128880457279,0.061442661318915626,0.9917433684405725,0.03506281009339007,0.830467605053565,0.9530602709115467,0.7692495000220142,0.7451996538273543,0.9259974205534719,0.5182605541917451,0.6572568796376996,0.9943493939791136,0.991923204612953,0.9704475077901076,0.33310292334011027,0.7933136067251538,0.9359102925651662,0.9125334165818737,0.9800070120311516,0.723619106623914,0.9976209323643418,0.9678568707088057,0.9972510387372764,0.9195973091134966,0.15197920187688618,0.8511066783030281,0.6626959748550285,0.8456685788057137,0.9970820577587152,0.47595906525576337,0.9927287273370602,0.9929968388478247,0.35847800627352333,0.05352875239589139,0.7297187956490284,0.9248422638784299,0.8773601857262825,0.9435543026696068,0.6224466071058047,0.9785325955927446,0.9679524602908942,0.9993389029114935,0.9951378370847316,0.9111853279223734,0.9531113577294702,0.14176673392611083,0.763079906876696,0.07597625875793501,0.9947101182534412,0.8866544726689292,0.9390380876401139,0.9974866375464737,0.998913416193917,0.9748596795531647,0.12919976157829582,0.8549048202685988,0.9615473375958132,0.9539603136024667,0.7135755310419765,0.5115655859017552,0.9918469669042567,0.05695375522038648,0.17448825118874312,0.7967923450049987,0.8016925803347774,0.9897061789424697,0.7178713691703765,0.2102120971955901,0.9891804285747681,0.5115423868999707,0.40800014690217523,0.833529749085686,0.9999619415017433,0.630239649324441,0.7246207859363754,0.7243780507850388,0.963737497948533,0.9983439853632523,0.7672540475737342,0.12401998219768884,0.9676028423778776,0.9369456794398725,0.9256627608175705,0.9815732866591346,0.4300058580007189,0.997261144558521,0.9866563180202191,0.5878446003093809,0.8298761506093951,0.3622226402594835,0.20996314618119594,0.23363389621893416,0.2584476548954098,0.4551753392898107,0.8669925003271703,0.1558686512814882,0.6363126709888756,0.949331744832559,0.7553940840579103,0.668779830569171,0.9613022040212745,0.7997395573145901,0.5867134022659165,0.9578543123443599,0.11710477625460924,0.6941107130387794,0.9551960318719313,0.3004039934112276,0.6122051866945096,0.8235891712839043,0.985140371123344,0.9827728365771046,0.9992704508215423,0.9693857029097601,0.9722196380353075,0.7183012566843122,0.6137073233290218,0.46856090108138315,0.8123848362265644,0.809552570053896,0.8521440125808879,0.08664779242308995,0.9867930021287683,0.9949323479136013,0.3558858270974744,0.9634492161895968,0.9904556145922592,0.6140590087889999,0.11243826437805815,0.3828808278100342,0.20281816927499097,0.9841562829626949,0.9828217395542557,0.9914396465815853,0.983129132746105,0.9999573446067485,0.06614818664506505,0.9968622972047206,0.5557063401395006,0.9996914091229013,0.8637692205204862,0.9960757641210913,0.8523288084413411,0.006450594930714204,0.9934448398211045,0.9998991157588032,0.9801854013782163,0.6409326811363749,0.9534059691676509,0.9953389881292081,0.7728657266301818,0.20560972932613164,0.9989181826678679,0.9917492199335571,0.8689154602505476,0.8943132976797716,0.9920488222757604,0.17687654204069336,0.9406716188918447,0.8364183262584982,0.9794118490165479,0.06845785542219784,0.933377533641191,0.8299239529847868,0.9879430837124694,0.9517807333601501,0.4500963049252773,0.9944918769220672,0.9971952474330399,0.9995847340740704,0.9982510663807436,0.9944472111040447,0.9772134078336892,0.9984858428952689,0.8788492177711756,0.9692421654702488,0.4090854107171019,0.9171608494478989,0.9993049272474605,0.991023407583008,0.8911395707491002,0.9802273245424593,0.9589896626714229,0.7423939816568464,0.9579495144463975,0.7177819345075852,0.14426894267476775,0.9769193617594839,0.555239638622355,0.9668551109372581,0.48580415329266446,0.9987163180103165,0.9872423656973537,0.3765428981011868,0.9670182193665537,0.9603907917536771,0.819020613988952,0.9980615269782356,0.7483546352778603,0.9397114446936049,0.9789189761155906,0.9787400523724662,0.8140198858826829,0.07565380214178219,0.9793817964151368,0.9993753454460862,0.0017970671525594506,0.855312645272836,0.9960373347604603,0.9857890870786598,0.9983367763981513,0.8882508577117855,0.4216252655563225,0.9989206379085754,0.32974581244014645,0.5513424593955494,0.696738039856795,0.6148599503677499,0.5489759671207091,0.1379894847401094,0.18097497296276122,0.9857822615352103,0.7418317279266056,0.18627676712603025,0.7185188449471168,0.5232538094251091,0.9811725464530062,0.11148934327301496,0.871641479587886,0.04833191745804444,0.9780376506006839,0.7843893810648468,0.2365444422509062,0.10016218346209749,0.8745864489194618,0.3760770642557446,0.11101380634255098,0.6961430504536958,0.9825929648435914,0.9738781607878999,0.9805071696966139,0.2764210199997905,0.3745113779720519,0.9541832698335758,0.47439495080505556,0.40058185760368414,0.8087767631422453,0.9981368504869602,0.9848842489142968,0.9959264960398893,0.9826380672399755,0.9316475929705661,0.8829242716939485,0.9988377004104955,0.9384816923667136,0.9971743873374183,0.44315064242488345,0.04131126837731336,0.9702711830119269,0.822564373784027,0.9435952829230765,0.9182486402329526,0.016925001972648457,0.9831087492374463,0.23943088352105568,0.8939399198197602,0.6350914511599568,0.7392284352230841,0.14135213071299346,0.9911436551018128,0.9634681105087824,0.034978323178230464,0.711138982891346,0.9945364015698788,0.9756110037201159,0.9507826311868932,0.9935576728899761,0.887740457790755,0.6962979911100543,0.13678077901203,0.973363790283865,0.9255208032511226,0.9128877780407788,0.07783427594155512,0.9857937972203469,0.9127154466313355,0.9781300633853627,0.9165628695691092,0.9988758668514638,0.6648319251745171,0.9837667186819672,0.962805824138476,0.9414031372259974,0.9007472737501047,0.9856259114669182,0.9377691729536255,0.8214724784035929,0.7980380180010642,0.9721459321658084,0.9483550129483136,0.9794661366832158,0.9639910278780842,0.7906634195728013,0.9982527925678191,0.29134617393344886,0.7104026201970323,0.1409752842843749,0.9831288743597497,0.6093942247083928,0.7332470528529856,0.9722544491211396,0.16908662652367856,0.9993978358264413,0.25230234645374416,0.990535380890417,0.7878461088972007,0.2654059671187362,0.40019652878295964,0.5897196704579225,0.9924019474966905,0.4011234485890258,0.6730476507114961,0.7042018440043543,0.3049927600697515,0.9278317149414047,0.04098831202576303,0.0960299550222935,0.5969234526056582,0.8517090299447653,0.9805455787910946,0.8508131395753487,0.9453046997370298,0.7776803311856675,0.9789864527065426,0.38942076947005055,0.9725563534964283,0.9337096672084512,0.9462484283054097,0.9978327325850127,0.8937476425315694,0.41033718364317173,0.8584357515088266,0.9566220894680489,0.5457594590607444,0.8584031863659325,0.944727453689518,0.24125727627620153,0.7653345256988852,0.9941602193041331,0.5896004348229467,0.20977309454856652,0.9998884755496202,0.2628869468148679,0.15574437638647398,0.16267879077078107,0.8818920096750011,0.769335735185649,0.996978900510348,0.9894375575745399,0.9751116275390019,0.27818828899211656,0.5943588010869334,0.44601854971844423,0.08330536739518757,0.432783507806903,0.9732320332555707,0.9419808869955117,0.4582016781531226,0.30728967371590166,0.9020482993496599,0.8924595510395688,0.9993616043525253,0.9971334169974219,0.9963547073521547,0.9540516118075401,0.4497961751389302,0.9984428367362143,0.93029089978767,0.8271578151525194,0.9316565478356909,0.8503958646917887,0.8668052973156686,0.8965902196558742,0.9067622234821068,0.737189293334148,0.09422708990622664,0.974390377586491,0.8605576327509614,0.21289342984804427,0.06332959627089485,0.9781581044916022,0.2938286336418683,0.9516514984440395,0.6121158053184927,0.937342727423723,0.6884206172439704,0.9878917109818942,0.6926545198785456,0.4666359151208501,0.9203464529584677,0.9897056428267521,0.18972718558572577,0.17276252609144804,0.01364919243818119,0.12323765230251349,0.9788402784715542,0.9998209139786165,0.8840387801835278,0.9812600361721632,0.9999000731610569,0.8775264694621261,0.9249657159536626,0.8303672048700805,0.5917310936696908,0.9332401975192023,0.9985647087983631,0.9580250271301348,0.893774680177254,0.9355557724982952,0.6410001626022503,0.9678732334887669,0.46424188274284583,0.83474740155218,0.9763884288446568,0.9991191967520073,0.9178689457603225,0.004724219306190269,0.9988193472105951,0.343243697908835,0.2964239968190283,0.12713682491371725,0.6274448086640845,0.9983263047239737,0.3518669751969862,0.7151900068397464,0.8581127221627748,0.9860808198891853,0.944066622684242,0.9729854531092423,0.832464999682294,0.9872531930806696,0.9228258127673383,0.9971347086994408,0.9129831000243003,0.9223095515745284,0.7787727422606613,0.6964911599886078,0.6129962702936023,0.7374040056215267,0.9819354317594331,0.07087847176043172,0.48572427231887183,0.9731393399601587,0.9989200880255323,0.9939395890711741,0.09537215026296453,0.9842984876680853,0.9681451162078195,0.7871243329973138,0.9053869069592064,0.9941464513213308,0.9827531880125833,0.41784895873687244,0.9475516800070936,0.19630852476643645,0.8992284021961975,0.996952935133759,0.9997910990879946,0.8845582107086966,0.9920050560243395,0.6823112592536497,0.1527122166475927,0.25107294189373985,0.9879993784733321,0.9524606683855387,0.7415061024010412,0.9662198310773141,0.989110866886807,0.4543606041829701,0.6536343258858461,0.042772602400866555,0.5146036846944095,0.6821696649659199,0.13826493496314907,0.949086143554843,0.985937974075606,0.9996565051661978,0.9800044488127567,0.6274527577353655,0.9158208034021242,0.7463340592980392,0.3736063059368656,0.11627172222299231,0.996068871347634,0.9920455098399708,0.9896120801956808,0.6263211055881165,0.9912229244047498,0.9925851066681882,0.7241180964766845,0.6466701830198445,0.1848440263808966,0.22858978230845173,0.9070220375420932,0.28767237533853685,0.9577570333035224,0.983293101064305,0.9976596598550146,0.8875344503282451,0.9969790336552782,0.5787039971093988,0.470037021723248,0.9839515051098318,0.547164474822315,0.9455620923474556,0.8798133901115922,0.35348577411693083,0.9900321065077468,0.7617738141249626,0.5901427672001122,0.07449889404961474,0.6307530533095305,0.2669446194081877,0.9238355432589307,0.8549036507677076,0.969959458159528,0.8693138934318797,0.913279375162315,0.8660336258933654,0.2697506314796425,0.9762245520655585,0.6177511912469601,0.5020527252238383,0.9288335461642845,0.718601611425813,0.6297074482535627,0.9985357229992887,0.9978901360271772,0.707868513367657,0.9082445741475716,0.9124134647227862,0.26211811538757257,0.9939114455104515,0.585812123138756,0.9964175077684794,0.8685488120682081,0.8276824736377197,0.8152911329384314,0.9161086954554902,0.9250973943757493,0.23805037980669486,0.5949174310015239,0.99536969249085,0.9945253408286099,0.34247650150782727,0.9996560094174856,0.9739385493756186,0.9446999463042823,0.6686027410723177,0.9533573093597562,0.7508760416383277,0.7454656959292982,0.9984534958619821,0.22059653769354093,0.803814385556791,0.9578538855228443,0.3620907816442488,0.7434035287205962,0.9572269293303971,0.7551568346586838,0.30715347153211603,0.9634577767666014,0.765397421345466,0.6816655068274591,0.99283714977862,0.6331071495799782,0.5307990408491319,0.613134510061524,0.8560153810269997,0.38813045940383484,0.9917543762400838,0.9296069708450428,0.15915599953008208,0.6001522198943119,0.7626067630354869,0.2235230660131643,0.9091388978060294,0.19554690729537405,0.9779286342270326,0.9925747616552102,0.9965288035066566,0.7658938942746312,0.9420256660451396,0.7737710323675555,0.9200459522543261,0.9978640407760283,0.9996025885903674,0.9686571674252816,0.9997879588842445,0.9512469016230448,0.7578711453815081,0.5825366968849433,0.8566403302158914,0.42452442092150666,0.3289123020815071,0.9718337371479706,0.7405574446072435,0.9841626393268098,0.9581467912267824,0.9921444591866044,0.9947884278643775,0.9276727551922059,0.2978948511630425,0.875343923351832,0.948962830446292,0.9996757603299933,0.9512473383344292,0.9844444727496607,0.9930432970872028,0.7675812345940501,0.9992441156395444,0.9947602303625381,0.9357858414684604,0.3351057663966328,0.03053062761147396,0.8288151769191983,0.520122102645171,0.016434596856006345,0.9911045969309801,0.520884388552509,0.9580713009796903,0.9992419347553945,0.9018278069164269,0.4091729848392154,0.8261832160483753,0.577891815240509,0.9935415915634865,0.9823603972885764,0.18006012889931566,0.5521678336168607,0.8801290346668879,0.5247481553834181,0.8155652227913976,0.9417358406033441,0.9989019553959287,0.5239446735654891,0.9637512349996852,0.9510052388525619,0.004974159587029292,0.9922299275726483,0.20815249723848095,0.9968649025036039,0.6498089507939546,0.9825700019320331,0.9989095513057549,0.8786837823626297,0.9962772894208853,0.9986373909502297,0.8909351343757308,0.7370052793074715,0.22939800801525467,0.8916291713422612,0.7719646401754505,0.9735109676957774,0.8789926780020048,0.9995962615095161,0.2756053642831877,0.3990143166879321,0.5031706553864836,0.14522265197655426,0.9932286201802126,0.9894086047208577,0.5643984375950742,0.28218848189065127,0.33511389975558736,0.9465584671419248,0.4598703795144764,0.9937410507486201,0.9122956907927952,0.42718802822446034,0.9924881819197137,0.8778684523090762,0.9527288363805086,0.9995030377305697,0.9963648753222538,0.8639833065021605,0.9261287425708893,0.4195190601833604,0.09736124458551221,0.9352237321008102,0.9898612801923904,0.15404396745425153,0.9551185691355172,0.9625020243662658,0.9996936235722507,0.49217909734769094,0.7068530156393766,0.9397857930148761,0.7768373556623266,0.664384287735289,0.9935311563756207,0.9973283131178435,0.9400060487693402,0.9986517847988647,0.10224351068113946,0.2934638292765477,0.9993794435423116,0.8909733241168969,0.7838009101045751,0.9876845061359971,0.8508273210490471,0.9637642423108218,0.22994463365771645,0.790067167011421,0.8881886395763761,0.8509771310825642,0.08637377042569527,0.9999068291364104,0.9207269447161117,0.9486446687591101,0.7684040926071488,0.9976690800688618,0.9505532883888708,0.9347222956054042,0.9209371177575906,0.977477142691592,0.4898267509412517,0.688648617555951,0.6300699652119508,0.9970803435140254,0.5977100662956472,0.9844817546043998,0.3853720395970275,0.060591103644870636,0.9233311871353295,0.9655176292910607,0.855548226572499,0.8405671687677281,0.011863630744015308,0.8895121446162964,0.9354401654690114,0.3379743808128882,0.9286443288997618,0.0944532929379277,0.9534313706752371,0.5550526290378108,0.1076839323147184,0.35969388752240383,0.04504924098210461,0.5367792245912275,0.8370871113605256,0.9044935598451455,0.8762937897863732,0.9939227910001353,0.35888919534470176,0.9877117884994521,0.49936616214811,0.9995784954635831,0.876603435066054,0.26695724142477184,0.9923425000552869,0.2632078521686618,0.856954375032245,0.9307681227834194,0.9492802649440133,0.5800573065154657,0.8423797185723816,0.2605512057117877,0.2599849383667904,0.9626893562527257,0.9469419471783344,0.9676713244137685,0.9392048219106474,0.9948611459678088,0.09686551003608135,0.0078059345465611996,0.9896824331509062,0.9260136411205336,0.7276293716798579,0.681366189597362,0.28225545503562455,0.5807559179513412,0.6644107759711296,0.6909093166489938,0.6044917281771633,0.8459200147847544,0.9780392294480956,0.7201076872285377],"alpha":[2.940181468675398,3.1005365348987324,9.808488790375092,9.27279051158217,3.4328168569336848,7.8941683025817895,3.064317514450232,1.0779306790907661,6.122462730728646,4.682354824142632,1.5256125274463006,6.476157221555394,4.647321977735688,0.7454904972292398,7.873514136181996,5.204676056996263,6.633294163912784,8.101001855029619,5.339122968369825,3.7424996037568636,1.5751206085952618,7.895904696228064,6.058489604169852,8.93377907668443,7.190127050614579,7.76408398040415,9.585345045686015,0.623297683526336,1.8850887263889127,1.755838784217394,0.5697583034471565,7.217346818094028,2.7889600553442895,3.8864635637519873,9.825460925971058,9.28487762578661,5.081426208324937,2.6734079608399686,7.5753286261324915,1.866400423136545,5.501647348343262,4.926247994494746,5.010229217068824,9.790024324154153,8.540722167299775,7.888717263015453,3.7122067024339644,1.6944565115218135,9.44258038106631,4.66825054909354,4.941624204519625,1.7506691436697341,6.837424560310241,2.5145547040623772,8.530142974635213,8.545336772180805,3.663766299689748,6.7227545802274165,4.238613879291904,8.721839625596989,9.25343014616537,8.204249539544588,3.1601227538552035,4.335627382405254,9.955011302435574,2.4681043945772396,9.848472322434233,4.338957640302372,5.419649761818399,7.45724116440832,7.015234337839882,1.4254566102702482,5.709970602819691,7.465101425899063,4.139949865000803,1.6168509538806841,7.758116797862467,0.5738469069656271,0.9639456159180759,4.0578763477728685,5.385302202193227,0.8645851006067962,2.1923241763890577,2.5792507615384563,5.605529606521074,9.586779725279902,3.298296594646284,0.89307618540299,9.406062687659674,5.959052113764369,6.075496421843674,3.357307747825309,8.873881284202426,0.892912575248368,0.22207153905428711,0.22633457966352966,7.315649396549033,7.082431310554094,4.158362993206806,9.322371285584898,1.135924755450688,1.2577333340437025,1.4762311858858213,6.66100352612758,8.399608150932753,8.538289820719811,1.9928736940934355,7.230032867960898,4.08661394331141,2.9422567612153494,8.085279855975447,6.836851176255072,0.05541167704684158,1.9079206671867155,9.097847349353096,2.5660416067956793,3.5080299695874206,4.563807324161431,1.9964148340968602,3.846612163531049,9.456732028284346,3.510967444422257,6.472838799927299,9.057668770538234,4.633236119469439,0.5497008076979815,9.191134298078726,9.42981096949901,0.33823301800930405,4.792003534104241,1.3999922046747892,9.571901509947597,5.330670779318172,8.168595665217168,6.844961189138932,4.693195216128263,8.831944445999866,7.031302379300451,1.016765399951285,5.171897492245314,4.553147056387743,5.708212762111371,7.2794704180508845,7.001817683574341,3.7966192231631646,1.7056413357025413,1.639823058031007,5.435843303080032,7.4838078209413155,8.788697460290456,8.379538892684062,0.5269922537337113,2.0137155367465875,3.5037091894439754,8.112879018404895,9.328138564353793,9.54357515885556,0.5439003385249186,4.041639037103413,4.465604882519816,9.577197199927943,7.811569045185749,0.28001054869400743,4.8065959047297095,2.7102993910637974,2.0612679464376327,9.259175380286692,0.4328613544248028,5.832998826559521,7.726107587467057,3.974819836674699,1.148626971361839,5.607087583105528,0.6292902503819131,8.641665223591378,9.549185535786489,9.604224922445052,4.44616775778893,8.551465986722423,9.729213422864715,0.3978497776765888,2.755049129832463,8.048569766507201,5.314462427853266,1.3819789960153406,3.7350576751956543,6.333863406037075,0.4359181567571735,0.581446087973212,3.322339732882753,0.5270966980854075,1.782476007860525,6.493620342135944,7.091013128140318,0.872337430721144,3.8110350883399002,1.1196713394454916,2.568262884096819,3.1071939142495486,2.008288152984359,7.63218789381793,6.216652764069959,0.9992895136035918,3.619808201206327,7.390612765784899,2.2318246869359815,7.656870507054658,1.7753938184142615,5.32817740452364,6.227720102326519,0.4564943542151467,9.783332947059318,6.6306504338903105,0.909730660634549,8.121058214734893,0.30821357402172067,8.763345195721833,3.8553675547933053,8.191711982617962,7.603238306383348,5.45036503448455,1.7356228118375205,1.6009681758146743,7.418769271554588,9.492792555398319,5.5572640316255555,0.5451779419589098,1.9199231345127554,4.372817269933515,8.387543407210497,7.077447079403245,3.260832654072574,6.080874307189623,5.079489878012005,9.347887310712029,3.5943475840199146,1.286709909190189,2.5205557927800326,9.72753336023567,2.0808874817741208,7.347364116571063,2.1391879754244414,9.576460157719831,8.459370244585603,0.8118515665951742,4.764108060477199,9.349981845412618,4.225905397079508,6.899536648620705,6.147138805866554,8.214735673813344,8.545797501442188,7.921306100355887,9.53884481186446,4.860253189769786,7.404476918235106,5.88628830419662,0.32251223752049585,5.324371692523839,9.063362218863759,8.105044942387526,3.84386678065217,8.570930444879036,8.764817854411222,7.493528928937194,5.553430683347207,2.070308101136291,3.9315840977815752,4.977892999464952,7.788579000109294,6.9343457883431086,3.982541338390786,8.545174078420438,0.17125535590424512,6.007359781325152,7.159339821649513,4.6440081096168235,6.118733689447849,5.246111923495573,1.372571623043204,9.968244628055192,1.1350097476006193,0.5935942045835962,7.2281356870483044,9.81638603279185,5.647922219790253,2.1670239657123025,2.2374596417540538,9.680651226508203,7.695095655054967,7.884051379846295,3.7897160030501675,5.761704159022301,6.58415086276902,2.971076805450863,6.66969584905301,3.389073124555575,7.723589714847412,8.23601808619338,5.07280021186083,8.36394221938991,0.9470876926281657,0.5087408668334636,1.768435480251025,2.1340411006006965,1.2289810428138392,5.155742663780394,0.24389130227634004,1.9028908581871096,9.44294759746076,8.339575242312371,1.504374015257337,5.740708471545686,5.560242480658184,4.352571992325109,3.9965982327418437,9.207032500031938,2.6095159286557856,4.820711071822192,0.670588753481256,3.4193534969792183,5.011198866748279,7.776303029364784,7.29387186401067,7.33708626165082,3.949809398106914,6.182780689504224,4.47360703892397,2.423002784950401,3.481263015504734,2.8042407577841177,6.979178944791455,3.013348600703958,1.2323524312843381,5.224005178398279,7.2265961280032815,6.2256312300714605,5.884539875185109,7.7108040509926035,3.0236261679439647,0.2746207971439807,8.13128807906844,2.5649942494581013,8.567984960711183,6.030205869264453,7.890392376730233,5.3677712593761395,9.803799087184348,1.2032715523356718,9.4146149065213,3.2537774343712456,9.834135832880293,6.704489312981354,9.190236963209104,7.308852089959674,0.8228091836396989,7.050694192858533,9.917740075478903,8.374355501142057,1.6583929863370939,4.305180927006558,7.940317952127378,2.033110173958932,5.460822075298523,8.653579754241893,6.409051854849148,5.653775208419953,3.511661737801779,9.401435416105258,0.4850311000316565,3.881404480743893,3.3324494083429768,4.7814899036734,0.8322367676919296,5.893509386389453,8.899783324420268,5.370826907589841,6.40309611814329,8.023531233627947,8.386105696325835,9.232803434739845,7.584681723919839,9.868153854439814,7.368648432522649,4.282134884252697,9.592543835086493,3.010341948719135,7.213728947464968,1.8473720855685594,9.363394165772988,9.670500506958051,7.026514314592999,7.608085115263528,5.278837200121471,9.773599672519905,3.0049271187311466,9.083650587514642,2.6321140428598366,0.3275832305916593,5.504345942106143,1.4510489314915387,3.9715686380937765,1.672479470304995,8.74399149256637,6.20617037832393,0.9233370058917179,9.466342130348668,4.434271757214063,4.776873405488374,9.394523450489771,5.150614994848242,3.9306674678168774,4.3003141949615316,9.683119134033555,1.7627533479131152,1.0422483923041903,7.6890145864284705,9.543495129099245,9.63089913857358,5.310177566702006,9.949638139091572,9.057468551531384,9.36704064796358,3.6351363256661173,5.826585301524371,9.930247669865281,0.6162879853468706,1.7193262158214662,5.422391338987627,6.17240200385819,3.731483785120331,0.32235448826753776,0.24590616446063418,4.564057833745818,1.5715558806349161,8.155117145334302,2.0242846685550697,0.9326525781406358,6.3040270278305925,2.779102425772555,2.9283794473936986,0.05660721587281481,7.461366657477697,1.8118151638048796,0.46675452134510076,6.888252588435526,8.178028360180152,3.04106430498458,7.253556025764311,3.358262699247727,9.8370250524263,9.092274436847433,5.778042803584484,5.203591501648342,1.1528740819032612,6.189857963990608,4.059596462308097,0.6119779655284807,7.250982056285151,8.8366090139194,8.672003458083982,6.622347580793337,6.159014709496495,6.603363849870627,4.533195251575859,8.11594173769788,6.0440675180958685,9.949380253247778,2.1249995629728624,0.125723847372734,5.171195105114097,7.374920011308063,2.997818079958292,4.28379544371545,0.5902782457899836,7.6630875131661025,3.519376802226626,5.283067322462845,2.3115802261159546,7.9590215742374815,0.8384124597016118,7.694563101044592,7.245018224589992,6.325871552195816,1.2567061828815995,9.748613255208898,4.465623341614277,3.0246498565625113,8.291104461257543,2.877103345109877,7.8515530554072726,0.18448375273180329,6.8860484133068685,3.852659900575368,3.1486992527018876,0.3473471171318021,9.941611488625252,7.234395885078648,5.94071538066832,5.329582278797407,9.075994493579865,9.574554163520885,7.318268579521194,7.327446435904501,9.736008466468117,5.25476275180443,5.221703717564392,2.9103990815766734,9.338420331382757,4.946977815747784,9.4034921465504,7.703164261504531,6.323324293967911,4.535430986269507,8.054037363349135,7.207407854838648,0.5208511744490729,1.5022788621103889,0.2784015537552831,5.6370562056444085,1.2401386532195202,7.116079749950643,6.276971861610896,1.3297445483482595,8.743931532567066,0.9269537150317708,7.925815298451504,4.888480226398464,8.675964087086147,6.442991770050737,8.114562776545554,7.90847511122794,2.336716744169156,3.0648636989491806,5.352711826916541,1.6825037620903993,4.828352571174941,0.10018410656758903,0.6573317348434382,8.526245439179272,3.206673742067363,6.532400206546198,7.445588067701627,8.005503191794297,3.988913040274009,5.755551983676792,2.5862575684119937,7.103087956006471,3.701830753528146,5.246358281210204,9.043087451669336,7.576528870283068,7.171437789271886,6.044875538783185,9.258617337442729,1.3552422509112505,5.06707589968647,8.65002403103028,3.3330437577244276,6.516310801463396,9.061269558753109,2.639083112015599,0.8491746519986587,8.600121584048965,1.8257086411354129,1.2534533460440267,4.663881744276901,5.101957056164141,8.505667188467802,6.85524565971302,9.142625859794881,8.556021932214165,0.8436137337163907,6.69169925903359,3.1054135352991086,5.213407912470698,0.607900479700596,7.2571988029306445,4.422031284960129,2.151102919928709,0.5407846596796473,4.972383331545556,6.10414612084756,8.797309146310798,9.684539200109137,8.867598766685392,8.115737925964421,0.8642037850362416,9.319695540498653,7.074583839158459,9.708225837691591,6.221849881368557,2.8104009564616383,3.709546965024806,9.25306709471202,2.9382074798952718,4.525226796732902,3.1280185000132055,5.554577138742738,3.596121155795251,1.8018794582607667,0.5824167282973147,6.415965040365627,0.5169631546512976,3.3759669236414203,1.7394344701140718,6.956429837821039,6.070756949171221,9.008784689173233,1.6393644240437855,1.1836406479993111,4.8940151792936,7.499492518393367,3.1410803564498724,0.3784148431900092,0.09603165731457697,0.28762833586022163,6.683281819004547,9.192701640248202,2.4488828415847697,4.693769198128028,9.644669650037832,8.503905637121083,9.922312152913769,2.907458884505376,2.5591570338779923,7.508459762220429,7.054431871877174,8.438514214913537,3.399509200829931,6.805162860106362,1.264456738183104,9.433128878692106,0.5870477738568791,3.6642772167628257,5.813673007678677,9.034081359900119,4.142175310053025,1.2093857971060262,9.482401901469013,0.6386732859189026,0.5999562921577639,1.4684131030311853,7.3762370528172845,9.71434030345582,7.796896525248576,2.1075983166318335,6.344332026498691,7.7419671361966085,6.581765818764138,4.195244155476255,1.9544171030281499,7.877372262548525,8.095026006646332,6.7704429022753265,4.343887671726581,6.23289818961013,2.427737299713193,1.765638241707399,1.583981943085364,9.444472603490201,6.0095595346026975,2.9742985127832267,5.65300545921704,5.294813429104388,8.637562302440822,9.957712716506059,5.497999377231519,6.828680223326198,8.577270969786916,1.5634220695847656,3.609895567048953,9.736825222479258,4.753915938347022,1.0023761348974047,5.852894992329074,0.7392840736002526,7.103256095740473,8.402963488799715,9.117735809759067,9.981654054470479,9.423553965769944,2.6355841903086885,1.8227610671713035,7.180036917578758,8.503990514165231,7.311104329368838,2.6917304300532874,5.450691378839401,8.606347915210296,0.9136298019993339,1.9097494138275017,7.619678273301442,1.6816932073349,4.086130733039113,8.418714031357153,5.260064880716062,7.418558275744395,7.94945489051182,8.710339541791253,2.294992873656727,5.575978191500191,5.600147097076336,6.108118910075495,0.40579152838374766,7.642664736927625,6.7919576567199496,6.100499831611361,3.0387628603139705,6.0983506592424135,8.345752618687019,2.0959793988805786,1.9380914634099322,2.1099078095689294,0.8099432008070284,9.337071194772665,0.5677688801347225,6.557729283299436,6.111410883295266,8.591779125175425,6.69007729911505,8.838541587865933,3.591477481815122,0.7223872169126189,7.859293206679712,2.583319943956084,8.669538460136765,3.5468090378041572,5.700361128813967,7.518721620488518,3.8492906851457276,1.3104956435538861,0.5945482739642549,2.1801869355652226,5.367108480518244,8.181070191134598,5.821486608646708,6.579030288335678,9.451213406361052,5.492319759886756,5.568148126525605,0.3945053985308755,5.672062618963425,1.8775030681571203,3.851940144560766,7.856914072314365,1.8383136195142713,2.4605006314071076,9.122564939890863,9.015131888572405,5.099743624405133,2.6987275669500677,3.930641395752408,0.41308166052409945,7.001226962296004,2.087313478666122,6.035181105391862,6.665463001139806,4.204954919355561,6.744267484100963,5.839360304549053,4.356715911424949,0.4743893481641015,2.7007844132684067,7.419098061032939,7.884498104329547,0.9742861323672458,8.279061026282484,4.200988979873575,9.667041376650403,1.6336375500771694,4.451124013489882,4.046290401614172,5.4721387531061065,8.766657143220506,3.1397234666695772,4.32350774788466,8.91194950290388,1.8601966592852404,6.297389417961581,8.279817637835784,1.95105667465723,6.0799553509389925,6.107151909666053,8.881906510539203,3.5279026688866866,9.688131790570031,2.9285312548082,4.468705878829673,1.2620749895768268,2.5336821350260985,1.0041114756813108,6.8203846752213515,4.104479897022413,0.2798941662694254,8.854304734893848,4.360438879217039,9.760607237537982,6.547984992135292,0.8388742588396503,4.18101861670759,5.781249607457999,9.125110171207222,2.178536953701544,3.2219625164521015,7.273869526700539,8.289808729984554,9.188546250002098,9.826333532142279,5.427641923555102,9.258305667240291,6.283105833335531,6.571353012498625,3.792750259607365,7.858141899411311,0.8801674184576358,0.4572397027409658,7.35552544984748,1.956375438747806,7.288208596874835,6.822761103960615,6.925834742141017,7.690198151745829,9.62392172617493,0.7863000821276622,3.4341643937344757,5.0636527237903595,8.956386017017826,7.747141157180019,9.630765343941313,6.715487471745229,5.691680749876,9.701426232683666,6.539938075432796,4.551138569101312,0.534372895390347,0.05844301838722865,3.3657519638003985,4.858197576923802,0.08657597297915709,9.586949009138666,1.5297139930034809,4.754278149023388,9.264548906693506,4.225840805367302,0.6707899657650773,2.554491645544106,1.4274271842114405,7.379568548218856,7.227464137248822,0.24540382341800226,4.011753632108901,2.2253396669547487,2.111868484631445,2.078418610838595,6.717409242057551,9.64912869332876,3.3316651513318596,5.402104993431465,6.693986621029488,3.344382630372511,7.266356425241796,2.3570539613214225,7.879600486759884,1.8733263803087863,5.175043578084186,9.549054877331006,2.801462866497113,8.324307649288063,9.250655021142487,3.1715381384372177,9.38714839932635,0.8208482713296616,7.727307421869851,3.108571974762868,6.202049897720756,2.3134240852725685,9.762953454370432,0.4052934666272745,7.725954318416994,3.095600726096359,0.5092185778595804,7.7289592732952395,5.580453088878525,1.5426924710634649,0.7925224812073117,0.563036334940592,7.04721560050142,2.533465863333111,6.904743801236739,5.908381025070817,2.8092427468340064,6.290242980206607,5.336866590239573,7.413335202429474,9.246925626387405,7.579195046515672,2.059345477252623,4.51725512508502,0.7578312979987478,0.7514852890157009,3.8964885334993515,9.26294619900611,0.5896940654307703,3.5875106952662605,4.793279689664249,9.898779410727487,0.7870465472793375,2.4504231022295464,4.859392697683997,3.071327569597442,4.047652202014797,9.708055364766272,9.442277699246748,9.27239170826892,8.770858025342374,0.363392114149379,0.9018628465301526,8.798197251016473,2.378702136200732,2.3570691800053356,5.988599779706735,3.4685248245372113,5.734717956632247,0.8677779345041103,2.0248929395809023,6.821942417197526,9.238947250227964,2.759179209170921,9.386608660631612,9.979136068422072,4.66112285603632,1.6628846788672291,7.398187389015574,4.0210186187408015,6.178678693123878,9.262270509720471,6.924407206903133,4.295949199973035,7.130402780602076,1.5495262083233419,6.465988884517861,2.156092861215171,7.71238582130422,0.9032225881790179,1.0166073081243354,2.9896542284813066,3.218216066078108,2.9576296533193758,2.8647150478905647,6.120321092928069,2.908508582759548,8.546248277820903,1.7294708628984723,8.668217078116703,0.42345318834706047,5.563450871585696,1.1488443188473085,2.4020449374776587,1.8066345051560129,0.06461129177285807,3.2841324851275555,6.741898538991999,4.466177857123168,2.558447186205006,6.856212011210885,0.7920120340248538,8.557956090099054,1.638189841521367,9.618798873434422,6.066667535270258,1.0212771624589956,8.44081023063876,1.8914023413074577,6.749839328268104,3.668571758663084,7.562539703914332,8.262097205650363,2.8378978109922026,0.38462210474600633,0.4861315591497961,7.097733958662548,8.606203109698283,5.328848365426737,5.6813121359011625,6.730441589052094,0.4475271099545308,0.022419535337141472,8.510793713037847,4.043644343738489,6.677567190870732,9.291436687068533,8.082543870103276,1.3557301853481918,2.138440139538571,2.0908281372881543,8.296069285099117,2.604984445114651,4.858350792586609,6.906766684159182],"x":[20.538268041451495,25.802976538289016,24.55968342358833,22.118513431354923,25.074761550198026,29.138766594996135,35.119715640450536,21.842856619186538,23.29150882023565,23.834648725473322,23.504955222916674,18.742593535627304,20.332091062157147,33.11208539922946,22.730986142075395,17.705864571095397,26.243458269418106,15.354729625949636,36.18961677999637,30.1050947257885,11.736124042989521,27.29692715745091,18.07620537347601,26.738853294941414,26.23165528244712,39.490543042331765,21.04411200008994,34.6895650490665,20.828328608556266,17.60975863074824,29.966789343569694,29.419909912992214,27.88917336327001,36.51936870238987,21.954039457918057,24.965982331238266,32.39286264436096,26.08472823014501,28.465551483193572,21.594886479871317,14.191783535880699,26.322159495981154,28.232177331538274,28.81845766101614,18.27009553696436,22.71061952592388,15.888854903684443,27.07724811206066,39.05317007371644,24.08876329166934,20.398148745372247,12.150429552117824,34.94744822023426,27.502495314658,17.40864873020662,32.06325555280448,25.458853577768004,16.380368573432772,25.51027299060342,31.30259263766505,28.188676481172855,31.491159336473416,28.655242483867884,28.35707486420342,26.2901247409623,31.991425681878074,24.66973646225637,16.553750009265606,19.158633700582115,34.44697965534996,21.848684176250014,27.432445530810238,16.289883799223176,26.987376099519263,20.775460400604214,32.09587917962257,16.962862011980995,24.321300784057158,17.169440388890482,28.176880196706186,35.96607118289955,31.209035914742188,29.78588785365765,14.100975172927354,35.75363941609183,13.939899352998683,16.31907183325773,24.581701000076727,24.206519096885586,22.338489634977265,20.5121878360745,30.42511992552451,21.334746455664572,21.20449532737696,12.703966305924421,20.15805371906164,19.208518782070428,16.775727202012078,24.541869312124028,24.152143946366603,24.775602162953902,14.77571217258613,27.207132797081808,13.609891141062677,24.703576854530898,33.489323172287456,21.47940674721104,26.319889507975113,19.91871110385128,32.87152599943279,30.9568476592991,21.37617254453341,32.712886911454014,22.657777600729816,30.012006899281012,26.154226873093005,21.14511711004183,19.060721010963068,32.20242967750883,20.366446607087475,36.538378042981,37.096423283484526,15.865433615573858,15.712125059062842,22.826691127837133,26.681350600239945,19.38705039604459,33.28757774758387,16.066506319369182,28.743129040929265,18.54064387312043,38.896832303190166,17.472617182707726,31.69623779032498,30.209303053757274,12.731800794863247,13.246826538124887,20.11850015998784,37.51483787529454,19.893619389880545,33.08735066575601,35.05708744452575,31.284841464259756,28.209516957760982,24.286126401784156,26.14161245788464,35.29872653430069,15.140126964212268,26.62938188339031,36.67527819730721,31.688425551557028,11.783592799514725,17.33035248883605,33.7262417420918,13.436418610507737,37.62790427810965,23.537382742409513,20.625056319609488,17.14181946311119,34.613594613330704,29.511353520206978,28.04928450119207,26.261116168356665,28.439275963261117,31.637323455618922,25.63872523446433,36.166589404914134,19.35067812286522,30.77790823602396,27.111367975371486,27.013751304255216,28.455094284723195,22.747897642013704,28.414484484000475,18.942567026891503,19.32921620186584,28.71605326495073,34.03901925968474,14.26772573104218,25.07359837269745,26.993848175828894,19.097865337478222,26.975175185514836,20.092206036372303,14.821150915921777,14.891044007621117,23.18602486184583,32.23817283588532,20.501005084675437,28.66880575554132,26.98641779778758,12.837850714516719,30.22597609492928,30.469400471394103,37.94921766414737,26.546943110777114,14.720281944268983,24.767266306167603,11.590674318845862,23.215036286247955,31.461722218993778,26.64458291078588,33.69799117122903,34.51439214416811,20.666987023757127,23.713773780179725,28.54911819494102,22.845759524351674,20.27000279842987,19.645928379313318,17.457546679663796,22.99386210219346,16.651715032965154,20.633845795279253,23.429682350372033,15.797972632948325,17.944116098912914,35.547564142256405,23.067271762733753,15.339590155388745,26.65000607547875,21.961614644764033,34.956676144987846,37.755447257628816,19.740827861198138,33.95581122193346,31.638981660387127,30.156540312687177,28.34982289245795,20.059560707883165,20.98853668137659,25.32841817569624,27.500271992003704,30.190609719966886,24.01249173848538,35.06647034290195,11.378878610261832,34.943594248481006,14.138940562511578,25.35245018693324,33.37637773273579,25.775081551728086,29.720503022800905,28.231923301265255,21.3894003623672,11.388281135266428,14.936685288319488,32.32407764753193,26.537858560407294,29.862554347532445,21.99232429835208,29.80933566035082,30.660635355312962,31.75520357595811,29.96374528603535,24.7174122714726,26.835219152037,25.201469437924267,23.89871132355535,13.76996659255854,35.576534505935626,24.215637406317263,26.783111631151517,30.515658551318992,31.67077330053441,22.90137960130064,20.976450126662098,18.977893596913418,25.191814829606564,24.998724015056734,16.69168805495436,21.934201649337634,23.12585832830092,18.457474120099654,18.391140203646696,24.238307151911137,21.28522294181177,27.849793949121043,13.752796475455206,20.08435886013817,19.44531903849486,24.61512306605977,33.11143975349459,18.918754322686844,30.487246247867482,21.6542240036057,18.798270935582103,18.552476215729286,25.404380486772965,29.334546653523294,18.403395761603402,15.413637099173986,24.203018565968648,29.42308878861282,27.065876195739236,26.814060514158356,20.304157870727312,35.608780145302006,32.659600478285526,22.460202329379673,16.490945926096938,26.05932005429076,27.141281886012337,18.839258184980967,15.056494581596404,21.9580644623057,17.922638615406605,22.583914802213442,26.921176052855156,26.415599689756124,14.824032713486215,30.64185238503201,23.274026181291678,21.23390850525192,19.132768597244294,28.469145704090487,16.0510368297685,30.446978189290405,29.793424305352524,31.722754846461704,22.153425996582325,14.69669610395253,27.95401003370701,19.36104194248246,28.649682391590332,31.826219338528794,18.60605708079069,25.485811536145984,29.39598570216645,16.762312456930886,33.97678580146442,12.75152399768444,26.193708827407093,14.142956872976763,34.51721776886728,26.90555915843362,15.465839270449015,24.504702374252666,32.989520072479735,18.08121261200745,30.18766617095706,15.750851455931796,11.414799539839336,21.590755718684875,31.57787757249852,36.142996023043736,30.28202895268967,30.193564121485185,20.415247029150827,24.79054297344981,15.530326200066657,29.989758278797765,14.901882211308486,20.192439544520553,25.54918106175338,13.040701097261554,25.004794358658113,27.739126024491217,30.198444883781434,34.704182669145304,37.904984617268084,31.89721893083655,34.15400029218833,20.782122871378835,24.027518944857043,29.80518841266329,15.057627692397308,25.159953373804765,22.90995351851644,16.11310495716956,29.70686208541784,27.40563166654436,24.006248061637677,16.110140233573482,30.47991517019266,24.229010966196512,30.795461403122573,28.2355209725605,19.931150759919177,33.477634545870615,36.69532246860798,30.410852771372895,34.32689795652426,31.22202799652578,32.840278900234324,29.85941248603038,27.33497424278527,29.77773302964168,17.889546205689825,17.29837321136575,32.339542879365354,35.424733830969046,21.412648410359424,27.974083452454323,23.279697262605637,30.005825794888633,23.614537056374232,30.344096544087698,29.395180466866112,23.103445351249743,27.63200475259698,27.9990414464756,22.548157885623993,33.46131385433178,30.102467165300546,25.003773749651167,25.090354491130245,28.022132285780515,24.847635109400315,29.296059163017034,20.942874324756673,21.936910281540964,32.454608503354116,23.89545642504008,27.332678619895812,21.52639366091692,32.788103590325115,33.121910633117196,12.948225340631318,26.088529116392507,25.610561144284542,25.124788917526303,38.80820101496863,21.68085054195862,16.98261555015032,38.59788177753411,20.778768187048517,29.200873551262674,21.696604140215474,12.245567338505822,16.529200021562392,21.60704060753074,30.64591007643812,28.282180064462196,27.225491654826453,13.999721336677332,31.39178991333648,26.14052134345612,28.6942327984711,11.892042335254224,25.964038558299713,30.17526513713181,24.768640330225242,31.291167556160435,23.56449350821064,17.10382469670209,22.960949902453557,19.946389134175213,19.67333844760283,24.836571675519593,17.609058138123856,20.26894543157843,33.53641861530251,15.091200755019212,16.446235572688085,24.316164579538075,22.792075761678984,29.962463744987247,19.70233994599911,33.865964343309216,27.443762883563124,23.25102111920848,37.979964273356956,17.620753580126756,27.533102497843686,29.035401715667085,19.97629281114678,32.43017366644946,23.883232529807614,24.064182666551346,22.173706959812947,17.61796473091462,31.920525804567927,25.202832637706006,19.665040756003254,17.04243281212068,17.704439283252707,20.908284696339354,17.40579589370183,17.685931183538898,20.978004802012222,20.618533229244328,22.795921558125237,15.549238052475694,31.131006796247114,30.24478581574573,33.163115995160474,30.766486499860676,34.64291990222011,22.475616612496662,16.21689117388395,34.41556244722081,33.24331886122505,33.33970777974156,25.77416689120824,16.575922012952812,18.945403087811915,17.521076428552526,22.22021038990991,24.945784464052863,33.22609994556629,17.5873843217557,19.49188683578082,19.780398096824207,25.96791237692777,16.374172941245757,29.36007165213387,27.164376666491933,19.82806447065773,19.80836755699154,17.785481832420487,20.39479552194308,29.898431369307055,30.130379678054553,17.17722932691523,26.80185602871736,35.07246146769812,32.87563354616471,17.762435203714137,29.227822359707417,28.637011130871894,16.025948675125836,29.399847966284483,18.451990582102997,23.940436609571044,27.350658224298,33.186709725201545,25.441064213891977,15.475696472851833,19.253624648077615,21.852956050459248,24.893730647582082,19.000759363091916,21.48461096246893,15.883724502757682,16.57966266534047,28.900643520358557,24.499867757035446,13.589358603689163,12.01477573888464,20.754386877507184,21.9101095988224,17.449397876410845,21.254643777031305,27.744742494180944,38.72898908011298,19.54313383203855,16.777407843390414,35.743579177483056,33.562006748926166,39.030745216265615,19.61434993163521,18.117165474580464,20.381445439479503,16.628221309711435,34.287566471269415,17.04273339575327,16.75240614421243,20.43985017537001,15.77655013138704,29.279782869787212,16.547959483049183,24.160268993275558,30.35365937935888,19.64731180202602,14.982576430225146,16.979973857392423,27.204688558739157,16.10392192919452,34.179452061001115,24.510711423389193,23.09578010937072,29.025961422115035,17.238848889922483,18.457932627993227,15.379006496758514,28.37912747686125,29.890404671862328,28.05887488649134,16.42283025165687,28.042742544255326,24.509426061543007,28.076531087694363,23.84720913249209,29.085940290883972,36.8029593345122,27.154780769913874,20.672215701489385,34.79456459687461,25.17415570682305,21.216360335767533,26.188451875716225,23.004591125392572,31.093059968123068,23.45777620898206,27.268864329871114,22.55835985980646,18.088504508564064,20.152687489927008,21.197243522789364,22.832072527406662,15.851487508159984,23.761062569511438,21.234200441559548,31.370697457637924,33.13241791903897,23.451533250606225,14.847905348013956,24.825543714621716,34.12428515095683,30.424524254558722,18.91445667950266,31.78142742048128,16.54006051500206,23.846738939494905,18.64765714569797,29.9187370989712,34.98797748347617,28.30750774443207,29.903540381549895,29.711192744642467,29.98355093610587,21.90701918757703,19.07033187571012,28.610661689650758,15.481293875152684,17.870435162931518,26.81559573632775,15.398728462769068,20.303401423894297,20.12393588680485,28.670452101353074,23.502474531672505,30.290876718908248,31.62086455214544,30.07739710261795,33.933918068121415,27.998946524466255,10.05399622483604,36.87820492138552,37.830473974583356,28.9683460423512,18.19441484050845,13.527027049941456,30.430307709432306,16.64175639560987,33.89636054717721,23.64913280343501,31.03132268753027,25.622791101374908,31.65202563473354,32.47906225010179,23.231702614963073,26.273559365055128,34.25995512147726,31.908087973506113,26.986053788078294,33.53970319911563,30.492294599485174,35.55126402749162,18.92528427221143,20.9902303417862,14.257461661537665,18.852017325429784,35.721435675840326,34.39755053435875,22.453571046518853,15.929995237789063,22.970309107975197,20.48189898412315,29.94451641921004,25.771010730718142,24.856449416850573,25.110627001210396,23.220397198516032,23.804948147011302,26.44739800294907,23.520135092800906,30.226831463705075,30.760861554038115,22.58708471118015,25.80707230389436,18.179677879650562,14.054183556968795,18.710429967940392,20.034937595247573,21.91778404331545,18.48340980853124,28.00180924349999,23.45628827145675,24.499465817403227,25.04096427243268,17.9142622116867,21.308092765298216,23.725665993776587,17.429997747019947,31.37290304394199,30.72682702933321,30.816447458700246,28.990718647871013,19.7424742377988,24.512056688691075,21.51446707879477,21.590687400409838,24.26211636277103,21.758460430019404,22.971653445298088,33.81299134784393,19.17923386336333,28.54770255767385,20.023202357168373,27.942294204486338,33.47737834425372,13.94917288593296,14.378566308917776,23.592427983092342,21.465878222066685,30.88720964249333,35.71386862497704,36.00520270066134,17.561886905081963,21.690837150714913,21.224569887194857,32.104415294529,31.351778719771822,20.47274388635968,22.089223571587898,29.4981277339338,18.930908015854467,36.747334185594084,24.42019840458368,29.411373589025217,19.02509499162466,20.449806380054312,10.648841052322453,21.475909225513576,25.224769614473452,22.090654619520855,15.270392702130373,29.33340828103985,24.815191436164138,35.54143046531332,22.52882508749594,19.9631038124436,16.376066097909856,23.83262977496173,21.993792956197765,18.507288186380656,26.803212823861347,33.54644470400042,23.16062872069164,30.327724614822355,34.094286178900276,32.811899764408835,34.23402775570184,23.074444428136186,32.471573664377686,22.239162347137555,18.799630690167618,23.66775354091545,28.253672319347807,36.208085295225516,29.16106884973994,21.978816057684597,37.363001168548095,35.892161978332595,27.23668811589643,28.742682978015065,25.44444166701873,19.579896372760068,27.220663606376412,23.0742737773975,23.69937009462367,18.3566809830371,24.41952779130566,16.21259458168525,14.710068998274213,22.813285100743517,17.665249645916045,24.053632338041933,24.07280896526587,21.397344395062625,16.585711744433002,25.463616478722187,16.35920707464084,19.26759946951305,27.056391762844367,19.7393026762901,12.967199215522719,33.267855672249034,25.372489881030926,21.416796564530557,32.89697389905511,22.10293858847193,23.023289890937967,15.263396890371926,27.689571706473835,17.571910184433047,16.352159828169675,23.44428057892832,30.660238689283908,30.599987932882296,36.84839257963014,21.573447207355116,25.999937840674328,20.94141842147091,16.63260570166642,33.72288133069782,35.646193383096964,37.14770606082219,30.28743455294992,24.462001487459503,22.63767046186672,20.865834915761127,22.332708221072046,32.513716132567104,30.30067011569254,30.129068331825067,27.693388460945975,29.046954433671694,27.731442282933944,27.12366100412931,35.42474175767696,17.8061672762229,25.96942536998082,21.879499330714197,34.927605424621945,31.96314521190423,27.967541568767125,27.775637004414193,25.185100002067273,20.004120615780696,28.9007882189982,34.43937007839096,25.02831412846408,34.346806756997935,20.573261969206577,32.86224671905815,13.511601038051069,16.428107082580205,26.307960346432637,28.86150692980835,25.867318586194664,29.34581226281729,29.390557451895283,27.577180780300388,31.26189380924301,30.971197374266737,34.939810833493965,20.687103997994633,31.179786356903175,20.374218853873774,31.037725382005934,20.321711812231335,26.933180462422335,26.353631699981705,24.450126812550867,19.201009828813923,35.47833335152032,25.8163730968855,18.419790362067694,29.17689646500447,14.712909011666092,31.195118568723103,34.80369481088815,33.0138882053986,29.319567230240096,37.35749683019407,27.925796508933534,31.10989750552931,39.7712355800514,21.378341138621675,19.732805803945766,15.093197288838361,29.363088445054892,33.69542129311591,29.737582698332265,35.008149948479435,34.46221132527742,15.191063511173752,20.152072690316142,21.287733674009104,20.68076904864118,31.60990281309519,32.0382061118727,25.796134182678358,22.50395721004128,30.2572730325188,19.744218778679432,22.654214631150772,22.980645832216144,19.66481362933731,25.523987192080337,18.271320441738574,19.557299217978585,28.859342283671545,36.36672611527182,29.167562194306026,33.51644724808184,32.55085488439918,19.28289304601833,35.762589644880165,30.707015168081178,14.277981124165574,34.472209616176514,28.759907698679083,23.541499017969038,29.729172603334106,29.243356478991945,25.526329036057515,24.0616382824154,17.19632097959632,26.599341611093692,29.20848122925852,22.92965889631796,23.781051431426935,17.10675824567023,22.298935443796715,25.270766965590838,32.589744236896465,27.628142278250728,31.36833206283821,32.21636018866325,22.515798772481325,19.261893994102426,27.800082681937475,26.12055415263096,23.22533976194843,20.173604244016047,28.863283883861023,19.773064578186837,29.79079177904014,34.12476639431054,34.531689484423325,25.658589056341704,22.49562226184125,24.662854491899125,31.019890043709555,12.15885398990426,23.494733461706332,29.931094091017783,28.39029347711724,19.100628151870552,25.61364535495506,32.65509113479756,16.846609496076884,28.438827606389975,29.284738736000357,28.22206981986691,30.84471188246473,17.05639540218506,24.590666557482,22.35329992487658,15.756947091042523,20.438255311626833,19.150541092630927,30.64088824182669,35.393702108726345,20.283829221141374,22.07095140013782,24.968952754218083,24.145549893733694,23.999352655431245,18.15801350186785,33.08351690434211,34.85255041244632,24.054246285470533,28.633898842618823,28.61935273180077,23.294317070242563,18.24148885110364,25.230486196848265,26.229351782301755,20.232247597138105,22.85652845280312,38.11565282430848,26.5725282844665,19.191518723914,25.8975226639432,32.80036816597243,27.40125735758565,31.042361614942543,18.08934734913467,29.300712451146815,19.56444625402332,33.73552755654097,23.255275721311083,27.413756266856026,32.1993142458371,23.188728727010144,21.386092374156753,21.759350196948766,13.53820501671359,24.002742379044903,18.307266475431607,28.689583182114955,14.678916342716093,29.10408435673493,36.66983204878197,14.272093835944474],"beta":[12.131646169528059,18.85720296323179,16.056332522972376,14.981365919712195,13.69849258884736,12.090375348611799,16.547465957108777,12.075955380506237,16.027110835517604,18.533224872357046,15.140425737452265,15.098205599255914,15.365542675506845,18.538998351141675,16.911680771156394,10.720215622233962,11.028580421162689,13.073168542094983,17.620582193049934,15.221567214873637,10.619515426349466,15.217987191322319,15.935965133004487,11.758950244308707,18.51513925750414,19.581440814842864,10.591695293056624,19.195813283088388,19.046403170973264,11.29216171805163,13.647388924266577,10.622659917584762,13.078160413807225,19.514985568580975,19.992734503818376,18.879128495756262,14.617617318777112,11.52335196134208,11.468692860065657,17.733376979805513,13.488453654937576,13.465088705831413,14.486827879700348,19.155626745384154,16.463251729995548,17.345660409630675,14.677744429619928,19.10251748205454,19.573639318345755,10.527470387817754,10.653834310948982,11.876622551059466,15.802598704947302,14.32475106235647,13.120389432131429,17.503181438547877,14.709544060716045,13.859279677973406,15.071222431926262,12.495384268924825,15.624339537345053,13.947357201519866,18.455045883890058,17.878586139943803,19.5927404248423,18.042837355652384,10.98528882210071,12.716399708680171,11.789914435763283,15.966149706995186,12.797815077031334,12.856617598553555,14.177305226418127,15.005026107935013,12.755843877471332,16.226043156220364,15.202396039960195,19.74427220809993,15.364783472508545,10.432266815611733,18.461616633985248,18.8055570007669,14.177579771461762,11.601365760529331,15.889956990984292,12.799527622042303,12.850556516339026,17.88916127461869,18.08093339684733,10.774737396880685,19.692733951962722,16.645024234367522,13.62892024896234,12.202109402705323,12.606639998123734,10.437385763010953,16.04377893061497,10.152769827087688,13.009980351463915,12.763723896904722,19.043906808258487,12.167605256596294,16.342961508299318,12.550206904461369,12.008546727084145,15.115524127963301,16.95437863490776,18.72546091404413,18.267043907907496,18.40155808467988,16.174055707471453,14.88759803585916,15.120158156702894,12.60584807664606,15.491369319163171,17.921602229450368,16.610452490559297,17.246075036342447,12.703205070511531,15.026903265836806,18.341381034685703,18.796384795808454,12.703950743758716,11.013748164794961,11.569847090297941,16.728674579717378,14.06792721005296,19.200675671096054,10.479707325831694,18.927769566143255,11.942056927983224,19.77452216005349,10.799791394389985,14.577700720455658,17.597745192209086,11.813490799153687,10.7422239630184,10.221833561638151,19.714321213984746,15.246975368867375,17.138930550724396,18.63453008098437,11.785478645190622,10.795711522489535,13.751307695438857,18.485997697244656,18.254903534679663,13.898899453755897,13.670095020424021,18.765525777201525,12.629400362053818,10.447196382232216,12.290825872983612,18.930784531326076,12.295536190945317,18.841272835970983,12.078709013454459,13.96349033842011,14.90704838297476,16.349031095762534,10.927220203105264,11.924378945381225,14.13752543611068,12.591114785496236,17.57151283788123,18.431593348389505,16.95733039411923,14.563703207355799,19.512996966336395,11.823140200062713,10.970453965161616,11.044216577091825,12.118764754509481,14.009018927470544,11.21416220703062,10.686813076169253,11.444362636339287,17.64773491633315,11.261568117483645,11.255497655262918,19.269633472118155,16.1445548087216,13.988659617570878,17.411326069715667,10.999620266308483,11.393343729676229,12.538659592912714,12.749724495182367,11.869129700177751,19.79124631154345,17.230942879217906,10.585389969751066,11.12454848047333,17.082052173925483,18.532368742538104,10.342699176705565,13.002796463369222,16.003348578746326,10.946542116762075,10.152288358680417,13.359202133010136,15.021047888739822,15.637225483652093,17.577800093710284,16.857156169476887,15.560412703026337,11.058749585538635,16.59834097428352,16.78290648348577,17.05323020495971,14.195754661673437,11.933958913825888,15.272559997160739,19.244577213721094,12.979216126258992,14.070465166420647,14.654493231857,16.07814148873015,19.286442340170563,12.814906924915697,16.528504763342784,14.418254870257243,17.908588728493548,18.792181956703846,11.882490665800386,18.017962727264642,15.048735206820556,13.266575916427678,15.124467991408274,15.002483690828821,12.075540225520044,17.073999097669116,10.183263712754743,15.34483015631568,12.778786645744715,17.39091127895068,10.010568013653947,16.414052912546055,12.644364799459032,10.32809361029784,15.080923871818126,19.055156401694894,17.772957578703092,15.7046455347386,12.380295228380724,11.257528614409997,12.986309642114307,17.520294839114957,19.57828342335107,18.708786449512118,19.533302119017275,19.017036653503713,19.858661428149667,14.739033530145846,10.015205949041714,17.823469874859953,15.956501932558094,15.687681897639337,18.235386410090776,13.650437087572488,18.63298907658197,13.743418279126702,19.32456061921372,15.41385782487369,12.738721077357003,11.798267023691825,19.620562457330557,11.614863389285919,13.091453272831721,16.837330124300642,13.937851907427717,18.322399280545028,13.172546656471251,13.105827642144465,17.81337466484263,19.40157362230108,15.023576571988562,13.182943646154664,10.805296915798571,16.911738876196534,12.348376036653896,13.093116413743594,13.690492214236157,14.762700710505577,10.811766735807055,18.1568378571986,10.367336919425549,10.429375105782569,18.034423884696217,12.76405608420033,15.296580129271781,14.884387166806889,13.34607214560127,19.337000375026413,11.284820667345203,14.73322884472691,17.20087947334833,16.58785630223829,19.33685242207878,18.859523765009612,13.343667296907189,16.20762375126916,17.078203155000114,16.207491532385784,13.087992429295017,13.396485343447974,12.119097947464192,11.273702462237388,15.821569349232583,19.26163414067997,12.520951262535341,14.70019344681199,13.208520930417029,15.90094884654986,15.617512465632679,12.89050941655028,15.835367391143151,19.337744593171223,15.644145108446706,18.621001919381595,16.792924716558016,10.395886522738264,16.26941723552829,11.094587903871371,10.704671112501678,13.166072698079487,10.421860583057382,19.20025913248498,19.851983067179887,13.978799728104354,18.708011628995465,10.054624888529391,13.890006736992046,13.140137454724808,15.07691812054087,12.949064250239747,14.410793868681308,13.964733906681559,18.045678926541743,13.197088945989876,19.552423752297308,14.843053550090984,10.449343803037419,13.309653839380145,16.094827499860827,19.769494770187165,14.154869936680733,10.818477728712573,19.2865088231786,13.439452234330087,12.103117206681217,13.18227018792676,11.069168443566383,11.050007764055898,19.666166325573233,12.938536760329104,12.256015023620147,10.968837175200846,18.907055017408773,18.71353432957985,18.594237752911177,16.22266822691566,16.474966357478287,19.924336042886225,10.913860240167603,14.099509540941327,10.511755845023764,13.267360466446377,13.69934980606396,10.786769512688736,14.348342212393941,15.918335147707982,10.656988631226636,14.794273232048587,19.248985516336546,19.85587327448244,13.52788934049613,17.58524850375462,18.4996458327672,18.004499739957346,19.41750980751536,10.893636569599233,18.039646548724882,15.43009137758162,13.579330903521603,15.174722225607509,13.55846359082554,18.377446378086795,13.456232674671876,13.257878708336532,15.246735502875069,18.113290947377294,15.998432510708987,13.303622124740595,16.79010849105687,19.10642936513642,16.659934122894523,18.76458150101798,18.26942765328109,11.649851936263126,15.809427531121052,11.874062312582181,15.149231418801364,15.6262188982923,14.90681654014649,14.989091119865494,17.49770497180462,13.52949337867228,17.373034821869915,15.068598882050184,16.02132816479116,10.736317809540756,13.228549487210108,16.054562788015634,10.525789476711608,19.961393562084005,19.791333067175223,15.288032298410489,12.945807332890515,18.12774897363356,14.689330809596918,15.708711873837052,19.599260960049268,11.864654684812635,15.459421904136688,19.399753713785834,10.856077507149692,18.320677023286613,17.411187077177242,10.491664132088756,13.35306121341634,13.631510489080092,13.607787344654088,11.137610047945012,11.501710143977647,13.650288540475557,16.781977247874472,11.813277273634146,15.280126271853,11.396823079969371,12.879883687343877,12.577223504405444,14.847311348524176,13.416911213294618,13.216843036129713,16.843759975898543,17.812974181293654,17.080348918606614,19.356755115763985,17.419853132436458,11.665246709590333,13.574621043752458,16.964734531740717,14.18144590556992,10.947318484556757,14.776696818938502,19.452434821245742,12.983087377616137,15.683153402473351,16.628360848703,16.924160434140127,10.128333931875632,19.66660069541767,11.737131317222788,17.15393036398641,12.627956873383654,12.593714997361127,17.97892548493366,18.131771866443515,17.20426078850585,11.235258758600907,13.935727925046852,12.233166847072184,14.047030404278008,19.104504384763537,10.005736706664202,16.37980694487883,13.673226301739149,11.253632602613346,14.937735805397354,17.491354282491706,11.155244025954328,14.43672599219511,15.461966112315332,11.589018685526709,17.72409398457992,14.43759927934012,11.367639586421953,18.852134291580462,10.50983753920239,13.93318519582036,15.50591113280931,19.6358470400979,16.989716676468447,11.873063896265732,13.126954734461169,12.349989110147048,12.507430648529617,11.676021169866937,15.653436716651044,15.72302903891037,15.689822138487536,11.099822360393535,12.622436099203586,19.403656114040366,10.549597732737201,13.029216753223633,10.462259723122438,16.48730040478559,14.335517441077087,12.15317337112824,13.881896867803594,16.172406278802487,14.478150028581265,14.145826937519676,11.105824771955922,18.105462568392014,14.408369322414497,10.290943471759954,14.167595417663412,13.41904110680774,13.309958665591772,16.608344522344645,16.05266732889511,10.252837236353692,19.986791998011086,18.433557572125203,18.526495842758973,14.935188103704075,17.78516305305215,19.580695030998108,13.431111046516,15.257460770878291,14.918119265707725,12.650948501943658,13.355547069954863,16.767165724894728,16.13380341550549,11.654563627041977,10.80024425798674,11.445172456210717,11.98732248488004,13.514689681162013,14.784479104252526,19.0314295004304,19.79604088144812,16.1491405065295,10.113062800481467,17.172305015067764,19.22426754783223,19.806489771645456,14.590282292811668,16.830722757067786,14.749515712229641,11.848424457167656,19.15386105072425,11.58770814951225,11.986792014510055,18.814944632315793,12.62991724005646,16.59845995008162,11.808126731003,18.310190512894508,10.534390788435514,16.624448883218477,13.089640733683844,16.345718964797037,17.898123978607437,13.553083001651418,14.661805814294892,14.900459971047468,14.998986923964441,19.722667023394763,15.064317251695751,15.261029194555835,15.124550638639942,11.166431174831533,18.149568052778484,14.738853489355462,12.35136733393551,14.222443515303505,15.360832434636638,19.48464818790525,10.33400213691255,15.890489230621714,19.539752597182122,18.57867527088619,10.354710086613641,17.388009315387357,17.276375834053486,17.70698687612727,17.014444124043827,11.70151329708306,18.0570707563032,18.35643208771504,12.161140073675725,16.790292799408693,17.525165162154096,10.418257280905621,12.25617377569302,19.991548526684788,14.167232438974033,13.092592708862743,10.833569428433467,12.788611171510668,19.221981985579344,15.74829742975153,12.253037149344072,15.209525284578094,16.615743257499197,17.889555512747677,11.279134954590548,17.265084121652016,15.468520602732658,14.44635755270429,16.161136609234987,18.93913842586548,19.650326337236738,11.073945526770185,12.406098660262446,12.733161241054525,11.537540788324346,17.11368032748028,14.689384453416848,15.542584321503288,10.908953642761025,12.46178887717612,10.601562587676321,10.575559203725824,10.498419843003916,13.450108453613138,12.752028840867773,16.324034791669117,10.462288514178272,19.346500101797687,15.790803534923343,15.576028153485264,15.313804751810615,10.014706244980287,18.113406566559345,19.585887536460117,16.122171052535748,16.58524937966464,11.832280722392724,15.758320580165694,15.741420771831912,18.679010308850483,17.38375906456737,17.865617497146562,16.533086883482493,13.382863773768287,13.01991528763409,13.352713879068205,19.146323385237494,14.428079336572795,18.188148225335375,17.910638365663182,18.01748626312671,15.520611226481858,19.52410974940927,16.426893909291838,10.763428223504318,13.909379494108137,16.759816483426512,18.040372146983263,15.598138981829033,13.446025391790515,15.642213603724153,12.501967885734073,13.70438985824677,11.13195805829668,13.410755009661406,14.660426885442844,10.689174011512225,13.535126104683206,14.38554056518873,19.678913935758786,17.02665160897014,15.16911941451793,12.144593332781204,18.19383078138924,15.459364673118356,11.766152141582388,12.832819438056408,17.971996521155972,11.910171168681764,14.449282691012574,11.181563728802331,15.04007588888048,13.873021419739366,12.623816057640111,14.372694107480083,17.811781851375326,13.863898471843779,17.92216741327351,17.12461568668394,17.81185165104606,17.293383710854954,11.298463461232284,18.501025036070477,12.839612475626414,15.726250611138344,16.840370029369137,19.998942334279672,17.8912601910855,10.54105742396774,11.274393980001046,15.993775172792672,13.872301935447569,13.131798585315554,11.12567742820879,15.115722509274011,19.571555187247956,12.661367290048588,10.436430440988051,18.293052238469016,11.810723692979572,19.06415148079654,18.283203749774266,17.789951955337603,12.668413157367366,11.250657618112083,16.68438279557132,13.330243820448421,18.532132933244416,15.065759722054601,15.789604008338138,16.231766710226896,17.536448161060893,19.90844873908315,16.82280687853209,14.89110212474384,16.702233777218467,12.948746783492421,10.050198091287022,15.677050256990956,18.105841540827996,12.966509476529978,12.312365978803605,18.79420210418137,17.29546544691976,16.01987066853828,11.65321171744571,11.961242810837518,13.664556040248137,17.025256497699274,11.034276182417981,12.359196935254912,13.106517497869898,16.937155142933694,18.195186922050453,12.515500273744937,18.349557756990993,15.719912718744366,16.520207303202955,15.12642740414703,12.771555420528738,16.402469246600404,12.37477332004402,18.42452030343985,18.48245559714595,19.97413886326355,16.4402024109677,15.7286798355636,18.104880708355882,18.541840313165086,17.711681564726028,10.969539212758825,10.67919500999339,14.512844987826462,13.84488852646254,11.589209926469257,16.809970837024917,14.2954530374399,11.671604784115386,14.975415859692871,10.092833223045671,15.990917856431876,13.872749088129728,19.380816197272935,16.451501723880472,10.402526473667608,15.61431399038759,14.811144362287,13.895334302052946,13.928929534385976,16.25076561906148,14.016379625546445,10.947208521643388,15.675797322733791,11.80769652012902,13.130670429171333,16.279239358425524,11.578878294679525,12.393450889814448,13.76224915586313,19.910833910270362,17.122309987009125,11.337046471062816,18.08784401645945,12.315695775016884,13.10423514525591,19.81003649432692,11.078094774820999,10.742812338158936,17.071450004768998,12.263371559744293,17.270353256323205,16.066705492710536,19.627156827829104,12.147166744348986,15.12440907082513,18.243098739271197,16.573248514467327,17.441796059719003,17.354886341621878,12.665203147341902,18.544834089887132,13.895163292412882,16.446853038456066,17.416532118144776,13.472222602690918,17.88262278667933,13.55323861404504,16.56226834025999,11.93209458706658,19.408618998653388,13.034072017325286,18.936568487132448,18.0268711408656,12.018686837799404,15.480196331098002,13.776797398105652,15.428470517813713,13.691088928337862,16.002725534557975,12.102979204729113,19.451441356208154,11.61639881220002,13.566288369128742,16.075621781038528,17.840927065651123,13.274395847282685,13.512846813039685,16.96964231567825,12.584837421478149,15.759267283264979,16.925614751062437,17.642992098652357,11.832647641130727,13.88487701151519,16.676900151187454,11.964428660580573,14.288251358004478,11.941500530296523,17.260350015562477,12.066516730629651,15.366426357190193,19.1986025511045,16.45203228713412,18.39234638318984,14.95265187876582,13.325894586678261,15.008451725070813,19.877918802928324,15.095712403142272,14.352529529104343,17.594493759345607,14.262400397131412,15.244838075214748,19.776383128593597,18.54307514962896,14.365456282287134,11.321086782113907,18.25058292567802,18.763367201257942,11.935540810568565,15.723119544149336,15.554401412748518,14.222164982201175,16.076177328829424,15.642379551701154,10.836575207424914,13.992678474755898,18.69475176898922,16.977332839088955,10.900415993905332,19.96713626911226,15.482909720680812,10.864776453975303,15.22184718076678,16.126864094820995,11.728492039901068,12.321498081208137,12.957536895375503,12.676911517233956,17.3316056963922,11.070829266123958,18.826456317560503,15.88062718993796,16.825761473907864,17.71695821187468,18.705507609163305,10.751364416617498,14.512415494368106,14.497371484164287,10.396008993309096,12.568014038238038,17.72346472196172,14.317468499826202,14.765273580252334,13.130814168589744,15.8259642443905,15.595110412421702,16.92856327215027,11.193956590992553,12.713559447712818,15.170571149878773,10.916591902797775,12.836963601639827,14.42645591935852,15.053155421387391,18.614239903264785,12.625098749056702,14.253793229582406,12.860363958861456,18.945406130268392,18.900665163265458,19.523828239262624,10.73826232782059,15.337563667544957,15.756157705717568,14.159284870168388,15.219175376022118,12.147128397196564,14.463432677539991,18.752668661970546,17.93624730093435,10.395752169373175,19.94810832578692,15.754509104720661,11.512503869019211,12.520802270791014,14.92427413734009,19.050821095509683,15.84202244204246,12.04568032563331,10.285542773847524,14.671818528830006,16.24877637658178,17.02316800804007,11.53038563656147,16.221643803578395,12.413659190428772,15.071996017203865,15.150413231227784,17.656247252480703,17.490401671137455,19.34417866142172,17.24462036902087,12.233831883058667,19.10167369673898,18.336308004570014,10.732291124996404,14.617123666906286,16.556970488633496,13.722211661807535,17.12523762558271,18.760221615982474,10.38374499212885,12.920374302416597,18.615075706198777,14.726889572583344,17.21505180208845,17.135327654783826,18.407188280490118,17.915028743328232,17.278350639360976,13.505727541025252,14.963932722792212,14.74996386251002,19.531707686591016,12.860120735495705,15.38830254089114,11.951143556350402,15.415978043418896,18.520394220080494,19.32700493555121,18.81248715842678,12.179129700109549,17.6012611546137,19.239209333911568,12.993949947637795,12.641212843453394,10.986941874146856,16.362243160068935,13.126094472242302,14.195359907586196,16.70968682437918,11.869159801071916]}

},{}],121:[function(require,module,exports){
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


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

tape( 'the function returns `1.0` if provided `+Infinity` and valid parameters', function test( t ) {
	var y = cdf( PINF, 2.0, 2.0 );
	t.equal( y, 1.0, 'returns 1.0' );
	t.end();
});

tape( 'if provided a number smaller than `beta` for `x` and a valid `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 0.5, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 0.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1/0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `alpha` parameter', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/cdf/test/test.cdf.js")
},{"./../lib":116,"./fixtures/julia/both_large.json":118,"./fixtures/julia/large_alpha.json":119,"./fixtures/julia/large_beta.json":120,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":276}],122:[function(require,module,exports){
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


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

	cdf = factory( 1.0, 1.0 );
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

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `1` when provided `+Infinity`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `0` when provided a number smaller than `beta` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 10.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -100.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -10.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 9.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 10.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -1.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, 1.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, PINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NaN );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NINF );
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

tape( 'the created function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `alpha` parameter', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `beta` parameter', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/cdf/test/test.factory.js")
},{"./../lib/factory.js":115,"./fixtures/julia/both_large.json":118,"./fixtures/julia/large_alpha.json":119,"./fixtures/julia/large_beta.json":120,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":276}],123:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/cdf/test/test.js")
},{"./../lib":116,"tape":276}],124:[function(require,module,exports){
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

},{"./is_number.js":127}],125:[function(require,module,exports){
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

},{"./is_number.js":127,"./zero_pad.js":131}],126:[function(require,module,exports){
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

},{"./main.js":129}],127:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./format_double.js":124,"./format_integer.js":125,"./is_string.js":128,"./space_pad.js":130,"./zero_pad.js":131}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"./main.js":133}],133:[function(require,module,exports){
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

},{"./main.js":136}],135:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],136:[function(require,module,exports){
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

},{"./is_string.js":135,"@stdlib/string/base/format-interpolate":126,"@stdlib/string/base/format-tokenize":132}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":140}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":142}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":146}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{"./define_property.js":144}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":143,"./has_define_property_support.js":145,"./polyfill.js":147}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":134}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":149,"./polyfill.js":150,"@stdlib/assert/has-tostringtag-support":20}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":151}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":151,"./tostringtag.js":152,"@stdlib/assert/has-own-property":16}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":137}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){

},{}],155:[function(require,module,exports){
arguments[4][154][0].apply(exports,arguments)
},{"dup":154}],156:[function(require,module,exports){
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
},{"base64-js":153,"buffer":156,"ieee754":259}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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
},{"_process":266}],159:[function(require,module,exports){
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

},{"events":157,"inherits":260,"readable-stream/lib/_stream_duplex.js":161,"readable-stream/lib/_stream_passthrough.js":162,"readable-stream/lib/_stream_readable.js":163,"readable-stream/lib/_stream_transform.js":164,"readable-stream/lib/_stream_writable.js":165,"readable-stream/lib/internal/streams/end-of-stream.js":169,"readable-stream/lib/internal/streams/pipeline.js":171}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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
},{"./_stream_readable":163,"./_stream_writable":165,"_process":266,"inherits":260}],162:[function(require,module,exports){
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
},{"./_stream_transform":164,"inherits":260}],163:[function(require,module,exports){
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
},{"../errors":160,"./_stream_duplex":161,"./internal/streams/async_iterator":166,"./internal/streams/buffer_list":167,"./internal/streams/destroy":168,"./internal/streams/from":170,"./internal/streams/state":172,"./internal/streams/stream":173,"_process":266,"buffer":156,"events":157,"inherits":260,"string_decoder/":275,"util":154}],164:[function(require,module,exports){
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
},{"../errors":160,"./_stream_duplex":161,"inherits":260}],165:[function(require,module,exports){
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
},{"../errors":160,"./_stream_duplex":161,"./internal/streams/destroy":168,"./internal/streams/state":172,"./internal/streams/stream":173,"_process":266,"buffer":156,"inherits":260,"util-deprecate":284}],166:[function(require,module,exports){
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
},{"./end-of-stream":169,"_process":266}],167:[function(require,module,exports){
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
},{"buffer":156,"util":154}],168:[function(require,module,exports){
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
},{"_process":266}],169:[function(require,module,exports){
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
},{"../../../errors":160}],170:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],171:[function(require,module,exports){
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
},{"../../../errors":160,"./end-of-stream":169}],172:[function(require,module,exports){
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
},{"../../../errors":160}],173:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":157}],174:[function(require,module,exports){
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

},{"./":175,"get-intrinsic":250}],175:[function(require,module,exports){
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

},{"es-define-property":235,"es-errors/type":241,"function-bind":249,"get-intrinsic":250,"set-function-length":270}],176:[function(require,module,exports){
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

},{"./lib/is_arguments.js":177,"./lib/keys.js":178}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],179:[function(require,module,exports){
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

},{"es-define-property":235,"es-errors/syntax":240,"es-errors/type":241,"gopd":251}],180:[function(require,module,exports){
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

},{"define-data-property":179,"has-property-descriptors":252,"object-keys":264}],181:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],182:[function(require,module,exports){
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

},{"./ToNumber":213,"./ToPrimitive":215,"./Type":220}],183:[function(require,module,exports){
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

},{"../helpers/isFinite":228,"../helpers/isNaN":229,"../helpers/isPrefixOf":230,"./ToNumber":213,"./ToPrimitive":215,"es-errors/type":241,"get-intrinsic":250}],184:[function(require,module,exports){
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

},{"call-bind/callBound":174,"es-errors/type":241}],185:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":243}],186:[function(require,module,exports){
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

},{"./DayWithinYear":189,"./InLeapYear":193,"./MonthFromTime":203,"es-errors/eval":236}],187:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":234,"./floor":224}],188:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":224}],189:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":187,"./DayFromYear":188,"./YearFromTime":222}],190:[function(require,module,exports){
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

},{"./modulo":225}],191:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":232,"./IsAccessorDescriptor":194,"./IsDataDescriptor":196,"es-errors/type":241}],192:[function(require,module,exports){
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

},{"../helpers/timeConstants":234,"./floor":224,"./modulo":225}],193:[function(require,module,exports){
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

},{"./DaysInYear":190,"./YearFromTime":222,"es-errors/eval":236}],194:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":232,"es-errors/type":241,"hasown":258}],195:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":261}],196:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":232,"es-errors/type":241,"hasown":258}],197:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":194,"./IsDataDescriptor":196,"./IsPropertyDescriptor":198,"es-errors/type":241}],198:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":232}],199:[function(require,module,exports){
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

},{"../helpers/isFinite":228,"../helpers/timeConstants":234}],200:[function(require,module,exports){
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

},{"../helpers/isFinite":228,"./DateFromTime":186,"./Day":187,"./MonthFromTime":203,"./ToInteger":212,"./YearFromTime":222,"./floor":224,"./modulo":225,"get-intrinsic":250}],201:[function(require,module,exports){
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

},{"../helpers/isFinite":228,"../helpers/timeConstants":234,"./ToInteger":212}],202:[function(require,module,exports){
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

},{"../helpers/timeConstants":234,"./floor":224,"./modulo":225}],203:[function(require,module,exports){
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

},{"./DayWithinYear":189,"./InLeapYear":193}],204:[function(require,module,exports){
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

},{"../helpers/isNaN":229}],205:[function(require,module,exports){
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

},{"../helpers/timeConstants":234,"./floor":224,"./modulo":225}],206:[function(require,module,exports){
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

},{"./Type":220}],207:[function(require,module,exports){
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


},{"../helpers/isFinite":228,"./ToNumber":213,"./abs":223,"get-intrinsic":250}],208:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":234,"./DayFromYear":188}],209:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":234,"./modulo":225}],210:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],211:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":213}],212:[function(require,module,exports){
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

},{"../helpers/isFinite":228,"../helpers/isNaN":229,"../helpers/sign":233,"./ToNumber":213,"./abs":223,"./floor":224}],213:[function(require,module,exports){
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

},{"./ToPrimitive":215,"call-bind/callBound":174,"safe-regex-test":269}],214:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":244}],215:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":246}],216:[function(require,module,exports){
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

},{"./IsCallable":195,"./ToBoolean":210,"./Type":220,"es-errors/type":241,"hasown":258}],217:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":250}],218:[function(require,module,exports){
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

},{"../helpers/isFinite":228,"../helpers/isNaN":229,"../helpers/sign":233,"./ToNumber":213,"./abs":223,"./floor":224,"./modulo":225}],219:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":213}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":187,"./modulo":225}],222:[function(require,module,exports){
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

},{"call-bind/callBound":174,"get-intrinsic":250}],223:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":250}],224:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],225:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":231}],226:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":234,"./modulo":225}],227:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":182,"./5/AbstractRelationalComparison":183,"./5/Canonicalize":184,"./5/CheckObjectCoercible":185,"./5/DateFromTime":186,"./5/Day":187,"./5/DayFromYear":188,"./5/DayWithinYear":189,"./5/DaysInYear":190,"./5/FromPropertyDescriptor":191,"./5/HourFromTime":192,"./5/InLeapYear":193,"./5/IsAccessorDescriptor":194,"./5/IsCallable":195,"./5/IsDataDescriptor":196,"./5/IsGenericDescriptor":197,"./5/IsPropertyDescriptor":198,"./5/MakeDate":199,"./5/MakeDay":200,"./5/MakeTime":201,"./5/MinFromTime":202,"./5/MonthFromTime":203,"./5/SameValue":204,"./5/SecFromTime":205,"./5/StrictEqualityComparison":206,"./5/TimeClip":207,"./5/TimeFromYear":208,"./5/TimeWithinDay":209,"./5/ToBoolean":210,"./5/ToInt32":211,"./5/ToInteger":212,"./5/ToNumber":213,"./5/ToObject":214,"./5/ToPrimitive":215,"./5/ToPropertyDescriptor":216,"./5/ToString":217,"./5/ToUint16":218,"./5/ToUint32":219,"./5/Type":220,"./5/WeekDay":221,"./5/YearFromTime":222,"./5/abs":223,"./5/floor":224,"./5/modulo":225,"./5/msFromTime":226}],228:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":229}],229:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],230:[function(require,module,exports){
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

},{"call-bind/callBound":174}],231:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],232:[function(require,module,exports){
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

},{"es-errors/type":241,"hasown":258}],233:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
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

},{"get-intrinsic":250}],236:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],237:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],238:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],239:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],240:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],241:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],242:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],243:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":241}],244:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":245,"./RequireObjectCoercible":243}],245:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],246:[function(require,module,exports){
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

},{"./helpers/isPrimitive":247,"is-callable":261}],247:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],248:[function(require,module,exports){
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

},{}],249:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":248}],250:[function(require,module,exports){
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

},{"es-errors":237,"es-errors/eval":236,"es-errors/range":238,"es-errors/ref":239,"es-errors/syntax":240,"es-errors/type":241,"es-errors/uri":242,"function-bind":249,"has-proto":253,"has-symbols":254,"hasown":258}],251:[function(require,module,exports){
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

},{"get-intrinsic":250}],252:[function(require,module,exports){
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

},{"es-define-property":235}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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

},{"./shams":255}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":255}],257:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":249}],258:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":249}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
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

},{"call-bind/callBound":174,"has-tostringtag/shams":256}],263:[function(require,module,exports){
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

},{"./isArguments":265}],264:[function(require,module,exports){
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

},{"./implementation":263,"./isArguments":265}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
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
},{"_process":266,"through":282,"timers":283}],268:[function(require,module,exports){
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

},{"buffer":156}],269:[function(require,module,exports){
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

},{"call-bind/callBound":174,"es-errors/type":241,"is-regex":262}],270:[function(require,module,exports){
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

},{"define-data-property":179,"es-errors/type":241,"get-intrinsic":250,"gopd":251,"has-property-descriptors":252}],271:[function(require,module,exports){
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

},{"es-abstract/es5":227,"function-bind":249}],272:[function(require,module,exports){
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

},{"./implementation":271,"./polyfill":273,"./shim":274,"define-properties":180,"function-bind":249}],273:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":271}],274:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":273,"define-properties":180}],275:[function(require,module,exports){
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
},{"safe-buffer":268}],276:[function(require,module,exports){
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
},{"./lib/default_stream":277,"./lib/results":279,"./lib/test":280,"_process":266,"defined":181,"through":282,"timers":283}],277:[function(require,module,exports){
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
},{"_process":266,"fs":155,"through":282}],278:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":266,"timers":283}],279:[function(require,module,exports){
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
},{"_process":266,"events":157,"function-bind":249,"has":257,"inherits":260,"object-inspect":281,"resumer":267,"through":282,"timers":283}],280:[function(require,module,exports){
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
},{"./next_tick":278,"deep-equal":176,"defined":181,"events":157,"has":257,"inherits":260,"path":158,"string.prototype.trim":272}],281:[function(require,module,exports){
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

},{}],282:[function(require,module,exports){
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
},{"_process":266,"stream":159}],283:[function(require,module,exports){
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
},{"process/browser.js":266,"timers":283}],284:[function(require,module,exports){
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
},{}]},{},[121,122,123]);
