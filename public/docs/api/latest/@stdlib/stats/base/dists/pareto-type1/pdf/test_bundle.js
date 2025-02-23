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
* Returns a function for evaluating the probability density function (PDF) for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} PDF
*
* @example
* var mypdf = factory( 0.5, 0.5 );
*
* var y = mypdf( 0.8 );
* // returns ~0.494
*
* y = mypdf( 2.0 );
* // returns ~0.125
*/
function factory( alpha, beta ) {
	var num;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	num = alpha * pow( beta, alpha );
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a Pareto (Type I) distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 4.0 );
	* // returns <number>
	*/
	function pdf( x ) {
		var denom;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x >= beta ) {
			denom = pow( x, alpha + 1.0 );
			return num / denom;
		}
		return 0.0;
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
* Evaluate the probability density function (PDF) for a Pareto (Type I) distribution.
*
* @module @stdlib/stats/base/dists/pareto-type1/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/pareto-type1/pdf' );
*
* var y = pdf( 4.0, 1.0, 1.0 );
* // returns ~0.044
*
* y = pdf( 20.0, 1.0, 10.0 );
* // returns 0.025
*
* y = pdf( 7.0, 2.0, 6.0 );
* // returns ~0.21
*
* var mypdf = pdf.factory( 0.5, 0.5 );
*
* y = mypdf( 0.8 );
* // returns ~0.494
*
* y = mypdf( 2.0 );
* // returns ~0.125
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
* Evaluates the probability density function (PDF) for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 4.0, 1.0, 1.0 );
* // returns ~0.063
*
* @example
* var y = pdf( 20.0, 1.0, 10.0 );
* // returns 0.025
*
* @example
* var y = pdf( 7.0, 2.0, 6.0 );
* // returns ~0.21
*
* @example
* var y = pdf( 7.0, 6.0, 3.0 );
* // returns ~0.005
*
* @example
* var y = pdf( 1.0, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = pdf( 1.5, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = pdf( 0.5, -1.0, 0.5 );
* // returns NaN
*
* @example
* var y = pdf( 0.5, 0.5, -1.0 );
* // returns NaN
*
* @example
* var y = pdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.5, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.5, 1.0, NaN );
* // returns NaN
*/
function pdf( x, alpha, beta ) {
	var denom;
	var num;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x >= beta ) {
		num = alpha * pow( beta, alpha );
		denom = pow( x, alpha + 1.0 );
		return num / denom;
	}
	return 0.0;
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/pow":77}],118:[function(require,module,exports){
module.exports={"expected":[0.0024327260979361926,0.008070146047079204,5.5645663704730925e-5,0.0050016417475532045,0.004682965594128929,4.288961426379325e-9,0.0001542354758775622,0.0015675240587592705,6.139922314543663e-6,0.017990417886666044,0.00038844800530674273,5.726387144389504e-6,0.011480387972792577,0.005129411107054483,8.920448792400585e-5,0.252186160595924,1.0088658521775626,3.6347887605541586e-5,0.002472242726386681,0.00019734578721792017,5.950202630393454e-9,0.0020870416634841136,0.0014372103575060865,2.992073004128869e-9,2.654644273510849e-5,1.140645895611426e-5,0.078460011202995,0.0016178963742966449,0.006240951535338175,1.3833764847319135e-10,2.6728282716365437e-7,0.0017149931372825728,2.678703987072678e-7,0.0015495383258317032,2.8842580937829563e-8,0.122340413888194,6.285880309601024e-5,0.5549133572775111,6.528170097031544e-5,1.2262258839121317e-5,0.10459066618237962,2.960676756976389e-5,5.926197248118925e-7,6.587922013933634e-6,0.00036247674156339,1.201576857290065e-9,0.00591606113177727,0.0011295232960390731,0.00044823677700091144,2.0372860339352393e-5,4.859128917555252e-7,8.151200678619698e-7,0.029221865828851366,2.471675045914227e-5,0.0002104548827892694,0.3102197784107969,0.04719854428645718,0.00024847856070838635,1.765090304726577e-6,6.681104631765954e-5,2.224050523644644e-6,0.5271243807103482,2.7727187066942365e-8,1.7609539047555994e-6,2.2770049908416908e-5,1.1347288667818842e-5,0.0009671525608255381,0.0016558994826319717,0.00029190282796456537,1.2154355862768677e-5,0.0009555190244362708,0.04663103724627905,0.036966163947266394,0.029686614056629024,0.0021394919970702214,0.002619709008607245,5.735415301142854e-5,0.0019916517007892544,0.5281589433789121,0.00017235813439234107,0.0021305306144264726,4.554370038123343e-7,0.0016281879958660922,0.002063748031389274,4.2473803452006295e-8,0.000546035141418815,0.01585874591256911,3.1621039412291957e-6,3.342321311417081e-5,1.7645166234676768e-8,0.04702254142925495,0.0009898819558854914,1.6881779074197048e-5,0.0001045333888660142,0.0018600868314484634,0.0017195931114040966,0.0012792958185948611,8.170608653606125e-7,2.339599320289061e-5,0.0012786307357505464,0.010412200964457425,1.1087586152980167e-6,0.015236703259222582,0.38971012869104454,0.0005338577105462591,0.004430133867012462,0.9200850608759276,0.0033906622087171052,0.0003070114671024732,0.0001525164130695559,2.094529125611776e-5,0.00018117364702937896,0.003761842888583548,0.0017229909839101198,8.067208850742162e-6,0.014341671574758724,0.6070706954346632,3.4761860888185034e-5,0.007297750118455241,3.5814211023076196e-5,3.685343793742843e-5,0.1601564743804785,2.218492076567682e-5,1.6442012226252283e-7,0.0047848583075122565,0.000666248185039152,0.0059449699590765626,5.6906917908028615e-6,0.0016042669458252758,1.3955670155833485e-10,5.587644688194924e-7,0.0007673424625457341,2.418491942688867e-6,1.1459850716370373e-5,0.0018049945880483011,0.0019391632273707117,2.2492233062473527e-6,2.514033822169099e-5,0.04278497951942681,3.987663524078203e-6,0.00015589303516455957,0.40948032585617494,1.8963124921279864e-9,0.024950758229746312,0.030069937642897743,1.8097771781305713e-5,0.011333065717051866,1.588404179994598e-8,1.381862904472521e-5,0.0360049921008299,0.3042958438431477,0.004497890239390314,1.778477621591173e-5,8.748390410931139e-5,0.0038276995806271886,2.1351523691189017e-9,2.3290173722643854e-5,3.409772008923598e-5,0.0007586026913599083,3.4813802074746723e-9,0.29418021456325183,1.5102167824696889e-5,0.10485390056053034,0.027759327628543662,2.736481544727875e-8,1.6289057593220872e-5,0.00017380815022962888,4.2860099261583714e-5,1.2495243764810793e-5,0.0011875375019684844,0.03696722004014262,0.03396291726816343,0.00012374903816669537,0.0948146723597016,1.4391665073212253e-6,0.0012273765817138473,0.00014798530406015658,0.00020618547138302114,2.78796364430999e-5,0.0005523651542332713,0.0008790588597921959,0.0038229272548690966,2.470479355330334e-7,0.001057741532985687,0.0031651070458208444,0.010445091839270514,9.33383214879954e-8,0.1205680937034017,0.03483071696984769,0.1626235589781327,0.04522427266140859,0.026322238382435866,0.003158082024918482,0.05213628809358595,2.3677838120382538e-5,0.012287025880972729,0.04505587294826297,0.022119598760185682,0.05046388145222058,0.17729388303127808,4.0441603156358234e-8,4.1816617446874743e-7,0.0003230179217420697,3.5986644668676926e-7,0.00016258881344509866,0.003122362311106096,0.0015360420674687492,0.021585430808507982,0.0008421850227583841,0.016511062827626825,0.09095136583411366,0.0006654656460216108,8.891824256777514e-6,7.388637384650679e-5,5.8724328404501135e-8,8.633323458878242e-7,0.0009418627611209698,0.0015608700691358334,0.00569962672573019,4.2608917909650215e-5,4.194741580475556e-8,6.0237351829646023e-5,2.0261451889534677e-6,0.0007305743404126088,1.630906546765349e-5,0.006028995357226764,0.03840255867034105,1.542961472331141e-8,6.908141469418424e-7,0.0023553254392535386,0.0017112505218098706,0.0026363341359630704,0.00013252886107964086,2.509783523694869e-7,0.3527491146696321,0.37243069559740205,8.032951312797727e-5,0.035671395982425386,4.8046525839609107e-5,9.546159291669934e-6,0.01733325255610004,0.00012394511888176105,2.321413009617156e-6,5.35119381305594e-5,3.107141991623141e-5,2.0369796933853434e-7,0.1449415258102,0.007261377923441203,1.3873392487037063e-7,0.02057212613651935,0.012963483003494888,0.00015397281793704486,0.11950285675800637,0.0007755189414572879,0.00030529037130468036,0.00037132933556948897,0.0006574636581710312,5.81507164732907e-5,3.312832285106734e-6,1.8210523915048094e-6,3.0092409013191194e-10,0.016001817559206582,0.0010732880133103376,0.00449046285462341,0.000851869411508182,0.00027307017266037914,5.7296041436005434e-6,0.04255807577350881,5.5721476915354624e-5,1.2843116187860696e-8,7.99011725952257e-6,0.7222809780332909,0.0065743684421521904,0.0033246423393245342,3.299575049529842e-6,0.11757312546780709,0.0006703641011285873,7.675239008162737e-8,1.4652302037011798e-5,0.00014232864608508425,0.008330977049684144,4.624654299528925e-6,1.195928728880229e-9,9.518375411051542e-9,0.8321972844217199,9.468158202184136e-5,0.016951228779072073,0.003180486938434005,1.3783260108699184e-7,0.0015814078756225258,0.9116102743833008,0.00029729016795018454,0.00048267107006853556,1.5444381801814436e-8,1.0452367337263334e-6,0.0021753484385236116,0.056412914999291304,1.474954583749183e-5,0.00017402087544947544,0.005057164065912719,0.28232679315612924,0.19192068123841502,1.544067333504649e-5,0.009031906034700573,3.5769111240327765e-8,0.005011334302472458,0.00029256919637700603,7.20519581528774e-8,4.099081808171211e-5,0.006291503612434797,0.009429322309110075,4.431450610607615e-5,0.00017571205843480754,4.9170150600409105e-6,0.01557525792120462,3.588387158224028e-10,0.03670994763036412,0.00015527328485234022,0.004061079020823428,0.6194661308755721,9.271597335046096e-5,0.0025222164134510077,5.907524307609701e-8,0.26025343956902347,0.00030786630735100257,0.0004184524141192877,0.0007231678343090605,0.0010162124209669645,0.03324953146242594,3.4992678458239515e-8,1.4523488208750212e-6,0.004417444720069999,7.268910194468406e-7,8.647350826101654e-5,5.242091838072906e-5,8.813142500688193e-5,0.03600465723791771,3.5111655313310294e-7,0.22486621006335664,0.025696835304015526,0.009027220524088496,0.0012867015075438174,0.005069287279132888,0.00016751518506212824,2.5717850458306365e-6,1.1159916575354517e-10,7.231937700791269e-5,0.038672142691066176,1.0726482659905358e-5,7.184685649174191e-8,0.008844344559713007,0.03569223536032097,6.806858297417411e-6,0.0069602568398743955,8.015101996474919e-5,4.9541165923751225e-5,0.0005446903208701838,0.0014885405091533404,1.8230295273800313e-7,0.07231460888368764,0.1625541407816198,0.0006371708946855986,0.36880777262839887,2.5300514222961874e-6,0.021290645011810858,0.009874875070687154,0.0007845166712841606,4.647919443743612e-5,0.0018213472339519185,3.1035371362514726e-7,0.09260417149166383,0.00011390252123166527,0.057851575625608775,0.00017567590285764528,0.001138581886191727,0.1651598112422522,0.0007808219652124065,0.019833034906039455,3.7862253454534565e-11,0.010660056632456108,3.8371370482404185e-7,5.157772541814073e-5,5.818614631746166e-7,0.00024510920690403847,6.7386595413379034e-9,3.2542222787495194e-7,1.0897410281416912e-7,0.0022669194933281115,4.7147413271521144e-8,0.02260910244537952,0.46932386974885815,0.0032797699258934067,1.9022317768888552e-7,0.002171077620280516,0.01130983240728279,0.0017620900224051639,1.2842037685993098e-7,0.06426976739581076,0.00853954037636375,1.9834538798659343e-6,7.358725272876303e-5,0.001086845622145392,0.8864218361959535,0.015839990063542576,0.004919181115896872,3.338499130525862e-9,0.08613113060069903,1.3670902200727422e-5,7.403704499692598e-5,9.762059251836125e-6,0.023352087039433225,0.0002542067788161567,4.349251162375454e-6,4.865296421482513e-6,0.1918610214462058,1.4391625212837048e-5,0.013119040466523527,2.7272780332744987e-7,2.273282596993893e-5,1.2749837922303931e-6,0.0061789455901594,0.07306260018151399,0.18197829289674225,0.1350220655456179,0.0008615233600080149,0.00833606346860833,5.56476136544266e-6,0.006478531564761776,0.006940053063966542,0.011876223313625109,2.2615997324899233e-5,4.132003260681264e-8,7.699976142687047e-5,0.5591776324881471,0.00037691746918560725,5.318635792667039e-5,0.00019521298856686704,4.038503286323241e-9,0.0006293089285127703,4.500949746046524e-5,0.0533429753126674,0.00013707803274045431,0.0007564960849270538,0.02348659562886835,0.0001290776250373052,0.37972911148422206,0.005248758074442854,0.00016056067433413304,0.002598623372645136,4.40223042745808e-6,2.2949085252283718e-5,0.001327125603718916,1.7559366771379935e-9,0.0005021752246544931,0.0027705637044355977,4.461721481227107e-5,0.03917447639555852,0.3544339042817322,5.4040344860234795e-11,0.2915931455934278,0.06366383939856848,8.752422979215726e-5,4.748505430122181e-5,0.021519627197697375,0.00012865305704086186,0.3859961943658071,0.008073371505917595,1.3664223197229513e-5,0.025166337542975654,1.4077778119246845e-11,6.960244618917719e-8,0.4658668407263811,8.707943223204459e-5,0.02760341409086742,0.0004978799974731568,1.5943754926818994e-10,1.1283252383794364e-8,2.688673892202267e-8,0.05579947408179774,2.6949128790286015e-5,0.185970597542378,0.040541991680174735,0.001377655271836493,0.00014757711642307366,0.0007106323529944859,9.65464326178485e-5,0.005934068310892562,0.0265180709292099,0.0038251602447576675,0.00016230546901301708,0.18066195485530728,0.09238056855475874,0.0012740184151693616,0.0002227567704825737,0.8979655155896831,9.535172477342226e-7,9.557723180808772e-7,5.419645502911634e-5,6.757029953208292e-7,0.006167566304451117,1.3371936181228554e-10,2.6212339818538325e-5,0.013346419245025457,0.0009549695799752354,0.04157575685267098,0.0011121241149524405,3.109509727127866e-5,0.0009126546895397884,0.0002781129279769095,1.7527321097652478e-7,3.165715739085315e-5,1.2444793786149575e-5,0.4904034113636567,0.0006951557361561468,0.9273280857122096,1.341200307407487e-6,3.4432989983315634e-7,0.0009206657484551915,0.1469497016911022,1.9527037089231318e-7,4.035294290688861e-6,6.136460791357586e-9,2.0258479682709604e-6,5.034931975537732e-6,5.8669707847575175e-6,1.2756088912843442e-7,0.00013374790343256943,0.00010029660894526614,0.3218727144243208,0.07131159025741857,7.371481794728429e-5,2.0409013873764002e-5,0.20740332662183844,0.07067320549448157,6.021901687124737e-8,0.0006474598166626705,7.247263895321901e-7,0.000152952334201168,1.4971994633364295e-6,0.0007377043821619627,0.0947596096767542,0.0001679647223652043,0.032134993238449594,2.4229358210786626e-5,0.07424585292896838,0.004292865952942186,0.0012821984868204895,4.687444230195277e-6,0.004499562683193842,0.047762016458055306,0.005920805550141959,0.000695125512547265,7.080587052087591e-5,0.07687616933103283,0.0006465026616675709,0.000598932502758461,8.027866497566339e-7,0.01732242943262962,2.34180447793398e-10,0.0349776089313999,0.006412797181338834,0.03780607858780313,2.0362472766120366e-5,0.38212770950969654,0.006443836604601425,0.00189934387606878,0.00012003159781127622,0.0012397191891416245,1.6338711951354657e-5,1.2346235934003283e-8,2.5783227513606263e-7,0.3067011767035289,0.012915095757262855,0.26510760400119154,0.05427160612197956,7.543658641859504e-8,0.06971922708184634,7.947423705285486e-5,0.029630635040045702,2.11474073020055e-8,0.07165351451339223,2.7086611028058557e-8,2.0796722922907994e-10,1.2327110538945786e-7,9.970100885282415e-6,9.166866147960635e-7,1.8054660149875643e-6,0.21042800191573893,9.65462546708721e-10,0.03201462457902833,0.0005545993611532663,2.4865620007616957e-5,1.3043837922909153e-9,9.105530473018824e-9,0.16405011984335038,0.00631000779700955,7.693527256627598e-10,5.80328271653684e-9,0.10944424289802622,5.761348474656051e-8,5.898683647373658e-7,0.018122335712400846,0.0004762881968929462,1.0681369291577487e-7,1.4835230310976335e-6,0.0072462905706105595,0.03790451684862368,0.004956383121264363,6.791352282230509e-5,4.034181100169077e-5,0.0005901787235264935,0.013013834680339122,0.003757432317851319,1.2814788768016925e-6,0.0002757419174053628,0.11127695520281547,2.640436804010605e-11,0.22915894472854917,0.007810111378217631,0.006025239962387873,1.770695203169936e-8,0.033068267960271194,3.6818378323685933e-7,4.703874142496935e-6,1.7083538119948894e-6,9.951238849812714e-6,0.7322718620210052,2.199485682584379e-9,0.04479603330948371,3.2863547482826604e-7,0.254031288574635,0.00036644095630859947,3.927529843285728e-7,0.15446025533902175,0.0008171148698903837,9.748446023737077e-6,0.08624673381553968,0.0004670520057992461,3.767602572931232e-5,0.09915722870076207,3.231078483088126e-5,6.876885321556157e-7,0.00011665554333530305,0.0004617809368128267,0.00823011694532552,2.7585326498396413e-8,4.397944045759823e-6,0.2976322936906479,0.003931023962788494,0.00028365712719693,6.817535817436326e-8,0.00029314130746572906,1.1985187027059683e-5,4.845290794794242e-6,2.2672480574664302e-7,1.7941455481912197e-5,3.6051792515761573e-6,0.019865618498921447,4.029103743591243e-5,2.410195110391882e-7,0.03968988600990408,7.505797067408076e-6,2.6608286328556276e-5,3.494659556754183e-6,0.0008518735428250766,0.011249925703124226,1.4012112979986497e-7,3.058444495543229e-7,0.16472009457487485,5.890428121941237e-6,0.007415600555409743,0.32207404582850296,1.999008011341581e-10,0.00033105201328859806,0.32154809178159904,1.593201839693857e-5,1.925766357231918e-6,1.0609351534201716e-6,0.00045688556198255747,0.015699265856468116,0.0021357273574778715,3.856349941840807e-5,0.12044358144393837,0.2402397807361599,0.009418681786124488,2.064498747578642e-5,0.05879739472691429,0.0013996386093466926,0.1480009394856505,0.03201714148808077,0.0012159826496878049,3.796201652054541e-5,5.004964661873173e-9,6.734080471690648e-5,0.21600120649547014,4.291298148855322e-6,0.07099907479955457,9.837252387891739e-5,4.821790529769174e-9,5.079911200868156e-5,5.877933224774025e-6,0.27595073967367595,2.885804655327054e-9,5.659158889477351e-7,0.19468186575323382,0.01645455738315957,5.99040096780301e-6,0.013804626645825735,1.9873928351189736e-7,5.797660857276302e-5,1.754084545208175e-6,3.2634727814937647e-6,5.75316045086247e-5,0.01720408470282696,0.5247209545652259,0.05941107263798322,0.19886817322352152,5.569290305215175e-5,0.03502092388455452,0.9271923712621959,7.11333675987778e-5,0.0008921439958208268,0.0068800232943979295,0.00030129482825430414,0.00040005860740761066,1.0726145482198626e-6,0.14047810490754475,0.007223176640961024,1.360151265442884e-7,1.9063787575885337e-5,0.0013651778669954604,1.9747347027849656e-6,0.07138961807293207,8.176578022682298e-6,0.0002416278231922207,0.0017169477355275372,6.208415466436855e-9,0.0378507468121705,0.013027150176512013,3.483928305472976e-5,2.0841303513312714e-6,6.508629015847631e-6,6.5014151756048884e-9,0.0004403294320679737,0.0027467127465964224,0.0007747653788002167,0.014638732606296063,0.0002086884191641863,0.12067511346143188,0.0002742934865440989,9.699318322645107e-8,8.71697499149029e-5,0.03147449781094108,3.9413206453677056e-6,0.09272881189702104,1.5622787090741284e-9,0.1771399849465653,0.06389707181023586,1.144203922192545e-5,1.521763176540734e-8,0.0010555383907893568,2.2890699587128683e-6,8.915681118911608e-5,9.497361021855139e-8,0.00038401307100675115,0.00031037753429985634,3.302815854249701e-5,2.703290064030028e-6,0.00816035948179288,1.1484601839231623e-6,0.003993724467511297,3.208908101182821e-5,1.2337663227275087e-5,0.36861449142022235,0.0017595795972743656,9.609102232610028e-6,7.800756086301627e-5,0.0054528125801246085,0.048847709105370084,0.0002755336238642801,9.109143910894021e-8,8.351489149199614e-5,0.002230387796662791,0.0006151787222709165,3.7738916054385244e-5,0.07678945746576187,0.004268338910027826,1.9420317428348947e-5,0.0889587760800869,0.00045900390292808667,0.011402118460616641,0.03341797965305945,0.0005631064056832109,0.001030235974902086,0.0008941663904390494,0.00019767295288655487,0.004073094410518172,3.218717915599804e-5,2.5079719359847384e-5,0.05944222026037778,3.869979773577929e-5,0.0004361515209928094,5.136183340518062e-9,1.3971901118466487e-8,9.275666098826402e-5,0.05267998289921482,4.428322603365002e-6,1.3658264143610055e-6,0.000700956013962426,0.00930833043744688,0.005680462727664795,0.0030340818731325755,0.0006483068213460909,1.2273370265526336e-7,0.7117012936036186,1.0259856306426907e-8,0.0002706900238765561,0.000352066037034055,4.846253589570899e-5,0.047664735439774154,0.12145600119002238,3.1318670320174034e-6,2.2418566001674628e-5,0.0009940112891863358,0.0006633452514523764,0.07622267859541654,8.230168261395759e-6,6.874473904969605e-5,2.2492176441211245e-5,0.06860183723437391,5.3528617148164316e-8,0.00034298442133680297,0.0001739478079057824,1.043903197445513e-5,4.600912312158058e-6,1.3463260071919917e-5,0.004371329246612674,0.006042543740045757,0.0070116298861259965,0.00021548291909665704,1.585377480405467e-8,0.0009541714029101222,0.0004999680580389741,0.011938757158554905,0.004458573294696599,5.483005974705848e-6,7.440463131062609e-5,0.0574395850783798,2.9802101986895382e-8,0.281589723058228,0.000257354007921121,0.0001909150723855658,4.592723250682587e-7,0.048836131428799265,8.428751166733459e-6,0.018536036523541254,0.010938963796872946,0.00018835253296007945,0.00016323788469463946,0.003938001288217378,0.0018633884562524756,0.01082390616483806,2.17375981092778e-5,6.600567886655842e-7,0.019505482675199456,4.294583241182392e-7,0.00010636273327650714,0.0013663658046384804,1.2640242736062145e-7,0.00010636571279308115,0.042096779741706544,0.0002380027091837645,3.9645089623607994e-7,0.02285464943369846,4.9157735627395584e-5,6.339732462724732e-6,0.0017492247143648342,0.004324374210695042,2.7023770723530887e-6,4.68495939992141e-5,0.22126585215494718,4.738650885379736e-10,0.19284642657699494,0.0064121564720606705,0.22379448595412715,0.26054884327581723,2.3984462930069084e-7,0.001346672909826418,0.00041208551532652133,0.0006362899443777499,0.016852778838957062,3.9250925718048534e-5,0.001538988772451918,5.403954963097171e-7,0.8652739981555793,0.044809902237162656,0.18679966900094186,7.470183406151303e-5,0.039575318741173184,8.547093678704123e-10,0.2124680931814575,0.04177099785729543,0.0006538197842722125,7.744927249134764e-7,8.690371813424759e-8,0.07524520470927995,0.015953277909270182,0.0002930382013552198,0.34747148712814446,0.0006758377104469518,0.003972579925670267,4.269570390823373e-6,1.3105240462114499e-6,0.19885325900398718,1.6124274549303187e-5,6.118392986748977e-8,3.1521360719284186e-7,0.0001392325690941597,1.0723639421107595e-6,0.025919715765058693,5.0278580121139466e-9,1.702307220052377e-8,0.00051318567580068,7.684427513408756e-11,4.040893989712474e-10,0.0001298660198193071,0.0005903019588994045,6.918692940150423e-9,0.0008784204525462404,0.1560176417025241,8.296419058700873e-7,0.09009144328444006,0.0007015889010377741,0.016411159804185192,0.003061126304950372,0.026783948137682864,0.0007975996732086344,0.6696641043727127,0.00047235334368484687,2.2974519900580485e-7,8.507152411097513e-6,0.0003107556412859775,1.6519773050904377e-6,0.0014377844268989798,5.6696535151120374e-8,4.911597935338137e-5,0.03541714709402658,0.007838867991463884,0.00515047236469031,0.47649320119925165,0.0011489073791626885,2.8916923170519696e-5,5.0157710091879124e-5,0.30812156822018627,5.110320034317213e-6,3.864382983490321e-7,0.25839916417181785,0.2870984359983191,0.001431537077271018,0.0007972557039044129,5.546559987823264e-6,0.013344209800456707,1.5777742809731732e-5,0.0014195640160173922,0.00021942474459020136,2.494552358767866e-7,0.00029774793543354026,0.009976076641770106,0.02154720316796453,2.1362414175221317e-5,0.08414341150201424,0.004742971437445767,0.01718504978294274,0.06304088303824938,0.099145183814375,0.0014399575581716694,0.022029406653736885,0.013548383848143827,1.1867479929988708e-5,4.636696320976266e-5,9.676345278166444e-7,7.328103513178891e-5,0.0006676482637045381,0.22690550565524367,0.001199708484744402,0.00024495356660682267,1.1392709244640252e-13,6.806144513690074e-7,0.010442996871987097,1.4330040841760622e-9,3.050793070052303e-8,0.00011676989282360698,0.013243312880954638,0.0023319576156317313,0.00017451944332402456,2.3097669981866305e-8,0.141059531151124,2.7953062451148624e-5,0.0001132035520396702,0.0008349519431444525],"alpha":[15.722603133261611,10.568301092701713,22.599753846914844,13.646803775579821,13.627219778887874,22.187915161281953,17.40533188694913,13.065724238754184,28.658030351352416,17.09345324245135,18.030818218752657,28.926629910916436,20.575167486048883,13.034155709543263,13.034525403805786,27.65170504574477,29.864603968073382,17.978577180379748,20.68184594493794,22.092617126272323,28.956648236135912,12.548957643968786,20.18391857952347,28.785741889818453,13.63940725316121,27.765972923184897,21.55154127224381,17.861048345039713,13.725837826978244,26.55513376497259,29.458011588760073,28.41078495532979,27.84262155087054,10.835576180970241,24.984705710754138,28.389767211103248,29.44196983933704,25.152544170045562,20.37006306140716,27.07063483302951,18.26975516056477,21.007957923497926,19.72425369500762,24.81066985515721,15.834928561356246,27.638751115411296,18.81659380212135,10.086208144486587,16.877388717489637,22.609607727734392,25.925691805623767,18.950445227439698,14.630264110236183,28.74561217945157,29.858843719110766,20.12295022570644,14.99721207634106,19.114902051076477,17.42671823179751,10.672715417959214,17.8593487478414,23.875366693096893,22.751053648197068,24.59970918953244,20.628354962719413,16.90799329455443,10.533259631644349,27.04127164462748,14.7640703870871,17.7281909310696,20.21782087339403,10.860770263256176,12.461642562613552,10.657841514691825,19.337420889071485,24.952060532610204,16.819256496044428,16.98216450520094,22.964342734943987,29.37213657633953,17.796735761738486,20.074963748785912,15.862998871928573,12.552047642384041,28.781794808181456,15.176059375633098,14.315168273310434,21.90660760571969,18.280760522481398,27.673285246953583,18.171040253120946,12.241623965524884,14.5735717334045,28.12809693675611,26.687325065317772,29.83861895403566,11.473307682410056,29.969104803196323,26.1363747524784,12.631594533500028,12.603347233035024,19.408011442647442,11.914853048072738,22.009248638609847,13.052424013918307,12.13170428867739,22.112633076147105,20.846787949649595,21.07166287109433,19.680877835193936,27.416242880350246,10.996107045667252,20.36050956537697,10.189481716123856,19.897272558119457,15.620434999848559,20.01187180964593,13.88787633210776,10.92395620341231,17.21941854365205,18.345830529575032,22.607537459332455,27.475720712576816,19.06580482648846,17.72894169454493,13.448005173975357,13.580569994127831,28.173760435150594,21.29004143875985,23.93624055368314,20.089656273459987,18.510471824971564,21.794421755593785,19.558609447197433,12.52524395011128,14.250246507262915,24.789570708692594,22.0128405045146,17.770711731481725,11.079029928163372,14.563295566872272,28.021207882324294,23.20527423857113,15.616795085359403,20.854991603501396,25.104131193889895,18.233642764600173,16.9957273162413,19.19143675493843,15.09278027780498,22.14615566774298,11.362868081092984,22.52723586496686,21.967350251971567,14.925944542778327,28.73407286682667,17.0331119253431,17.49818523739286,10.569037849147357,24.73124668798217,21.900239273602452,10.245521232554825,19.835989618194716,11.514254682995766,20.74557351135828,18.846257231100317,13.855323562944157,15.719398585410369,26.045073951312098,20.414481837749527,22.025706032297293,16.102499907533687,20.6920635193765,11.759963726494282,28.628973564449886,13.010422989460375,12.864936441020607,13.719588106855195,23.791021317551632,20.532633999936255,26.24556495349324,13.55898064996814,25.149060027074924,22.501551209929307,12.44136281029597,10.483543030697353,19.776502365207325,18.714256367531846,19.399425875943006,15.359971346410966,21.2695746541737,25.212868291947892,11.909821089322218,15.28522724517038,18.287123189130273,23.181504436400196,10.206338616940167,24.41301458453493,26.786011864109977,11.413245909867982,23.505971409627477,27.792509660765475,17.527061896208018,29.69584041559523,14.107793425431257,27.056883845675394,25.584735341364244,29.41121694145491,14.066100767163881,16.015754289888026,11.254284331008183,20.000416314983482,20.947230862518005,25.441767255224562,29.308352625760254,23.85621001538563,26.909518681586043,22.015794551893162,18.21049450827559,10.97798877728787,29.859674215572753,16.844710531126104,20.724607962221885,14.038417807688187,25.527439310453424,10.484770667066181,18.671432655748465,29.911428477238204,25.02362934178005,26.837662432393657,28.32924663501243,11.283081331268887,15.016811558225957,24.67408765225266,18.882455493420444,12.384495016804692,22.653079287158825,11.002078433035729,10.177325365075184,16.062423045255663,19.751501376404494,11.754745413526502,22.53493211859954,28.404573376264125,18.143118509191503,21.641167609968907,15.0399894472055,10.06565511380817,23.02015052084571,10.468150196845825,15.838796507784764,15.594112063299024,16.344697234118136,20.172604214236216,20.461170595075927,14.563451713947897,12.915609320694523,26.017847496327036,23.41792472054471,21.76086946849224,25.789525239151295,17.47792291669946,14.854483262822944,18.09627020312652,15.563792415991422,12.090625799460337,16.417412307063923,18.36154810977261,22.183008495130775,29.678905865928705,25.887057472791856,17.055871542421222,17.434023841819105,24.578248957730544,23.0497701769401,21.985706339625164,13.387431048109114,23.7477112917685,16.216753083381054,23.829026183948013,13.108291150320387,17.260667876205087,29.069220020092907,28.41557959443708,18.01101629730057,21.649501662447335,11.777943315418572,10.800513667808627,28.30865929995545,22.478109556439744,26.658180850028117,27.879648793313855,15.685210531797802,23.467600860846073,25.763808868721764,12.666241075821404,10.07003918761698,18.81398529659225,27.65947618182087,14.498542576452111,22.315069291532676,16.124534929077925,24.46444719764683,21.957490805111924,20.084152027991596,15.204825462090827,24.99972048463194,25.647471332245896,24.059037682775273,29.29723534033325,11.867466094070744,25.126624851224136,21.003750425406437,29.750834154197502,11.46197928732629,25.18757851564573,23.140393033149813,21.752522495698308,21.97167296803926,22.810632665496353,29.755706312985378,10.131954191077659,25.77277777502065,11.861506790614488,21.93582425017642,15.245854087361298,17.353218543885976,12.337763012044224,19.87173798821128,24.907519765286764,23.83963600739625,18.01770193949404,23.03879929852397,23.310245716551062,19.715507063219796,13.215805927263574,12.880795096873152,18.288348244584366,22.80417550098772,12.00328810843942,29.756100623125743,24.0327341513944,14.878674333642955,22.233369884900654,27.58812161321287,27.397707543311533,11.974694109417303,15.606824989601652,19.338958635146064,20.951196362484865,10.928989543667385,19.545675383821525,19.351356316332105,20.57649960852448,23.499888446094293,24.137026878134435,16.42766934827144,19.61517943203651,15.133633282334834,24.23016754089786,11.771833690532102,27.28686422022487,13.801799974095342,12.51761939270473,18.74482882033821,23.056361963757045,19.190827861660864,21.592134301877536,24.705837709949595,28.565100368145657,11.696980335183236,29.585280171379527,18.09385779492593,25.659877499015945,18.700647304169213,15.88252701188729,27.233719599452275,12.835160442697386,28.075041860773233,20.077411275554713,22.9443981179574,19.29664586814923,28.1779831492346,17.62253475370703,27.70045295260417,17.68588473502534,18.193910477981177,15.605145012851214,22.698335620624764,23.814186346602582,26.300388247907254,25.50552179434287,28.640587029107568,25.49592176818439,11.23958906584301,28.972961205515038,26.820415454149916,10.99408785994305,29.33556965321049,29.018012262583824,11.089977094005805,29.671701308931695,28.37985551846449,14.038540675860744,10.630691519480798,27.42023367989956,12.901303247897973,12.369200923791265,17.564407276103033,26.425408400231348,11.643215186003824,20.41322351547965,12.283123394908927,17.14083343825232,29.773140388029308,17.890469069915724,22.45420239053832,23.215079152586505,25.648250985687923,22.657671860505534,12.896517925037884,14.472524826357995,21.72792109494822,11.366652569245698,10.644836842012477,21.64212178817207,29.452647708136695,16.174582660614433,14.112858722523832,11.795771781154913,13.68652691526778,25.60871618468567,24.976857680406237,28.2802315406282,20.693028762182575,29.973764562652722,11.527413304596887,25.914655702195553,14.864386803177737,24.724124281510594,16.165006024661324,16.15051589607814,10.217895721013326,26.57596169279526,13.402491387338742,13.537243872458152,25.13658542741153,16.102764794046735,22.512381708224257,29.903426960071027,19.104358158542215,12.656378234508594,20.793503189973713,11.703138994281353,29.454988929383813,25.16945358095027,15.299901389705003,16.248985287859064,28.951321197296235,12.699534536065658,21.249959950841472,17.99698009770995,19.26034417110128,23.566040761874984,25.230127824890957,12.424909992565318,18.658119174194656,13.846307110779708,14.783387503062123,28.79592180437152,29.587519361057936,24.61654623241424,12.202568530179047,13.534758552757005,29.021873279177782,25.450965744285668,19.866903559473354,27.254178431735873,23.420885736413453,26.447927027439153,12.20814433194883,17.695467707399363,24.99100741658833,17.082335364712968,11.731204003765487,11.190975719669618,10.817118775529405,26.796498349542173,25.041324177273086,13.293122766131166,15.153055261302786,24.043535379314914,10.792832250705878,28.550615223024664,28.946050110057712,21.217681572514167,23.124525795834373,19.79289904030267,16.394335623409543,19.198011152848345,28.649820084017698,25.014646453801358,11.224224422256688,21.48016183322222,12.131662887591927,17.157509875604386,16.00855510506962,10.624443107448919,20.184542052410286,18.306665188369806,21.589471735980243,10.331277353220258,26.276088413290427,13.096805149650388,28.50508319127424,26.067002006763435,28.056943598604246,18.16456286287813,25.84404060947126,26.04979413393954,25.781316764792347,19.891705208252553,20.841572491960036,28.33920976563285,15.704433784685214,26.290227041513305,13.791905838837524,15.087140324920076,10.337933642542927,20.519720797422437,19.352654393176564,20.38204659779285,25.180275092342775,10.066289703617564,27.284849923517967,21.59089589974235,28.288552970399014,18.396169367689698,23.987725760855923,18.58211550043077,15.22727743869671,26.235437983186465,15.496926776178196,22.55877921252972,21.75322419062073,29.352552075493303,12.253313989869783,26.36240515862925,27.016964105506858,17.359838443689164,10.578589451024992,12.85588449761114,13.587489118441347,22.696009459570835,11.278337737128856,29.692498507785427,27.91296395876841,15.899081789650555,27.231567995241875,22.335548586635237,18.8405445028166,14.420124768462301,23.878765048366528,11.020409468172861,29.527642043296897,10.821645482719994,10.992045935142416,18.22945446576767,27.31899787604447,23.23251205870295,15.896305689497098,29.369449228658887,23.645442195593965,25.535661740316293,14.603668292182114,18.470504492893546,18.827252758324427,25.801034756667434,17.303105162549247,24.689330524861973,11.625327768681926,22.50275324377717,28.22210008882913,25.767133880163314,15.47596109985452,23.340225206301245,18.254775346834577,22.07297872670435,29.220764461027414,17.46213268673166,10.715977805998914,11.665161048551639,26.89533319294317,24.21244819670168,20.520333861894166,14.19885134766902,29.288023771011765,25.667741520879808,11.22022593579453,28.43353470723833,24.441999438007702,11.121267304614936,11.18979768859711,20.45612072504596,22.78708353724965,19.42085121594598,13.131824868797128,26.636204570844917,29.492344826901235,29.253438603963286,14.516542177067251,15.84669200979128,14.073185962524217,22.713335434161532,13.022122003472795,12.542888908108608,27.91232526906072,16.508742722739957,21.919086939345277,26.746720136088527,26.31832055621249,27.776906087843038,25.757421610734475,27.08613091307846,29.36486660223187,23.175622963904942,23.30857925936848,29.919775382763234,21.671020626524435,26.26717643311727,11.701608567523909,23.395755952884983,25.457624250299965,17.043661244038347,27.877944610624503,25.406863090607533,10.18615222477656,11.019953680125854,26.371950825093762,18.754028568262058,25.701698785815967,18.00085502955405,16.372335632307824,12.376225642455987,10.060675974798198,25.467374284717703,29.161182741497317,15.99865914720246,10.0776990185811,26.661110079855664,26.48339149366308,11.054258926515521,10.48051369550674,16.70305068403983,27.35059229055772,16.92095329401041,24.097878947174962,14.941538344020149,22.842218849593547,28.035617026727017,14.551576341663694,21.953458873317373,17.850006509977582,19.011457009458983,15.386978005097852,15.864417454441565,14.818851738373787,25.470897063594112,14.96196753332483,21.5796523575596,22.757732151787792,29.423738808548965,23.929881042438378,17.001531491774372,12.242861848299267,17.365322934843682,19.208521588076707,14.50263421852152,13.341293495845882,12.914506308060453,11.462323688370283,27.130789019454937,29.293474758124717,18.944116490273117,10.000784715497065,18.12305689655569,18.67183266293587,11.236778453613546,25.34514873009815,15.533939449664462,13.882985033894872,19.079992813698627,27.58875580653723,14.504196379180394,22.574523634862388,18.03464506169159,11.605792247546699,28.649456109516606,28.833430593338587,27.874367030012486,22.68173876762363,10.178149385453871,19.940698041698568,28.106725529366994,27.953896096599834,20.073458447996934,12.44889717634656,22.157742607664854,22.740362185379517,21.115644146960413,23.715746596635526,17.473643107640928,27.806890036371193,13.55576438158733,12.603554532999217,23.90339143704165,11.544060254242915,24.22698398372399,18.869047349569392,19.8304598411652,21.43183766495907,10.89848559555783,11.91810288153198,27.28410303034955,16.205680733393983,22.638911662786875,25.327005569620443,11.156203878614072,22.96288613870943,24.655715651544927,19.98562632244824,29.744136409094438,13.138188633329575,14.146833166597034,21.175937851396768,12.473140293486807,25.417943834503735,13.317940244576306,15.713530782578049,14.901637166338727,25.66429185848581,23.457621033142566,20.946527910446232,13.850148965631304,20.14088452682787,21.75873192665543,25.302223837494413,14.18417911901695,25.92609969454372,14.170981945221284,28.95338037188901,10.75656254509411,22.664135311114194,25.738738242661142,10.67738360149631,28.630743407956597,25.456168077092826,18.509331277233258,27.29692607667266,21.798568699993417,29.719046364496382,15.483431534295026,16.999669723583434,21.41952977832956,26.095212065885907,20.64245170738686,21.238441186426815,20.839045050975145,10.509248458399934,22.71184498559139,10.84532802576383,18.023376629837013,21.928326740142452,28.362131031608055,23.23798281159256,20.638115291910914,19.545764033077425,26.943798202087027,15.683953962455597,21.955653236356504,22.908976788841784,27.976539369168623,13.692390387986908,12.061533734167327,17.211192231738202,23.49040119870073,11.809245857257245,25.851047502644988,15.143820399210641,22.32027739692342,12.011703807407418,12.290397119769011,10.14502943588424,21.364031008849466,24.85319345760874,13.815470898743843,15.17593047596141,24.78665018934945,10.88398451321346,12.12644971851443,27.201607418306025,19.262370369037036,23.440548360137107,17.877578095637247,29.62621678577395,10.803768907519839,26.10427617317889,22.702739055567648,20.893523009897883,21.229464039013834,28.047466424964806,12.749131359332374,14.734737886153377,23.47709433093268,20.785248291623898,24.19475667530575,22.500388779566435,27.697327704690178,16.51660903234983,15.505337832930612,10.352290704074179,25.53921762704873,16.952851860797328,19.520266734052036,12.463504604157682,13.529628299767973,16.624941981573215,21.096883044395895,25.70725325508193,13.131815688085076,27.62142778493214,20.138455881619784,18.550776765927978,29.97872249173095,19.412573975892965,17.38843024367018,25.43520008728097,26.41167932103769,10.084838443966756,16.188254700600698,26.800346379059473,26.92492451079022,15.392458720349694,10.671113161771624,13.776422769858678,25.023867634588935,29.935358320975137,18.415509548385714,25.405453688286215,10.458984735928025,22.348243953223452,27.08034476159646,23.566273614316174,11.641952050917892,27.17547540628599,26.973238100141295,18.366908722182767,15.289360474737169,12.201260049714406,21.988991422424927,15.873244871262408,13.16625684946656,21.64171133546286,22.392452234885315,22.937736888706937,28.129314405060345,15.160538934692408,10.146636194684753,21.067967889536515,29.538440870279118,15.118536808682617,28.47917947396646,27.9965814022096,24.804761491188692,28.182888236428777,16.37652289440931,13.531795933973196,18.85152166378826,18.144308270102897,25.547156474321948,24.515374033498404,29.24116944106671,20.15299668000523,14.864527207046656,24.050639158121747,18.866793852518875,23.777867304001173,11.063902263083612,25.902893666637155,21.301907188430484,22.29439176040429,21.505837617843525,29.443993969665968,24.01329636221817,20.801925057904597,10.6038942992119,29.3987956411183,14.608947155305088,14.273449773083989,26.833832917315515,19.242082610489156,28.764682397793905,21.58569808621557,24.676040598085777,20.031063750352736,14.0396467361977,10.445682885508859,23.36469454237462,18.340199702368828,17.332229708009095,10.89572909708286,14.876043574757706,14.794311442363494,22.39918040599335,16.525483681939495,20.64851341633632,17.701275645864847,14.105721638824736,29.879644479914962,14.2049268627495,27.283212073420863,19.511664221986898,29.82210812725328,29.669484451934363,24.89647328398163,22.240917737296357,10.872969689733122,21.954153542828504,27.739007664404397,17.583314745154222,25.8515913732841,18.886529866831843,13.129182505410707,27.16198191188621,18.290193523269778,12.392085695570628,11.486873687833743,16.047972243416044,19.000172248144963,27.360077460937205,17.688045899651186,13.163926671405628,25.72576654438482,10.865489257527239,20.193153713818983,13.580444395123674,20.564772981926865,14.631629669965625,13.913240915214683,26.680868147846514,15.282584133551481,27.790782943982926,24.40978712850228,10.812338250911706,12.305822720069415,27.76271495376715,16.663977283079877,10.479974730776433,15.132247661332464,12.127347707808429,22.401304943375344,16.423677828523783,19.725309671436126,17.927181977025505,12.727107489652516,20.27983823201932,10.977119114685436,10.729183864805805,25.87884406441201,13.914664681507594,23.098780556675344,24.187437620102024,19.58135815174538,25.044414753040783,27.45127126714906,20.638630994985935,28.757014268836013,10.15164990817862,11.204638241464547,19.942831167886443,15.096876635692542,16.60542121776503,12.69899065584454,17.84365758102286,10.408618441780032,17.49207606000287,28.688602604299774,21.849049643826817,10.553012860406653,26.312941764844233,29.87617851022049,24.420170898126482,20.6923904419251,17.5573797149506,23.102651178495485,29.477055701209505,22.652614061831883,25.66396780115904,27.853712643557213,29.696385460392342],"x":[31.27689445336356,31.26458705690769,35.507459019899514,39.430849483732175,20.461560313854097,28.593032549325084,26.88293779529023,30.99294764629693,39.04891623325149,15.767002572747817,40.256927545391164,40.36570018411785,21.161810686545405,35.40507779443175,36.015033308250224,12.113485243666538,24.29549180561489,44.503972107323854,35.43467967887989,31.206521238124072,25.111821693069672,42.27350477824942,32.52362065196358,25.814409126254834,36.611790552548655,25.53346869479169,29.974867501643324,27.768754912997444,30.325669358752442,34.096851136788295,19.8173042922428,14.298718560493704,32.50741175022766,44.39945579821555,37.91921175142866,24.42499219899059,36.092494747525436,17.43040435537676,27.2970489908614,20.155759973287612,18.89361272015352,20.57600450711719,32.389983725451486,33.492978176131025,44.098694460180155,36.37427301239525,30.406701493139565,47.715896304384344,32.15257185989505,36.22179752012086,18.739231627576693,27.228262372232216,27.087016286695267,35.506918254050724,35.405267132513174,24.24029683303297,18.288048242547227,41.123823661188375,37.06382394611287,36.54133053803636,40.38621073772201,21.926535269012177,36.15884394286082,39.50223391409153,47.22489903701644,38.79922831595641,41.835210307426735,36.715995970731974,19.042696679566863,23.98946513783533,21.216670349288577,28.599200228160157,17.75402391463139,30.957852677910683,25.567249000808282,24.738758162512426,37.75164621629952,27.611624823490658,25.312777945600715,29.56475740572686,38.92984193928653,36.52937583265368,17.197205478636235,33.86705051054412,39.0797641605774,41.68953425000074,32.56548405554278,38.35845087624551,36.6897083665571,27.752602302473093,29.976377375147955,18.432709661517517,33.68544379610253,31.879734636191984,21.915924151090532,16.33294567389276,37.481176228405985,21.110846877029186,43.13645230837513,37.98882024574456,20.08158668828922,26.093631574842195,22.078900484363025,22.11083970634094,38.91331162909765,22.921763697889087,14.148912463635495,26.82886008616542,37.132055116741526,44.377117250892,43.32780656318466,29.82878418309121,17.742251072796673,45.67516125229035,31.389076487180102,37.075267389921784,26.27483192885081,34.95338730018403,22.42611925668335,38.33039316023139,42.1364433447552,17.64885173370457,33.453456150454585,23.948552989686416,34.400548737715866,19.3895873842316,36.35878198783202,36.536266940729384,37.75077977487378,27.58623645816242,25.299235495799376,31.377885632775058,35.630653859273394,29.53234453917692,27.713621493412916,33.082245277549006,36.986403817944435,18.93594243745948,22.72041715402279,30.0880181682207,30.835834772509628,27.090209333836636,25.707835174777365,33.99085558099685,19.181096621931545,43.97757280422543,34.31604284272838,28.77358288874801,39.348276966199656,31.26223518831931,14.1891556256788,24.728775111488872,42.676816579703925,42.085427391395996,36.89450800284408,31.647630691322497,27.940384321726878,19.43261506710573,30.708913715162943,23.430062261829246,28.54251806336157,30.471288806140624,23.07696885977802,19.33019370428324,25.892222842109792,23.502977174669155,40.40324301873932,36.38491668889506,29.84553606602684,31.783611231875824,33.613363983884085,33.14534363059487,22.311799563551318,32.4857613111485,45.383714124840196,19.62496441268629,36.902268526433005,41.28696930350323,24.541916104423414,33.027508686970776,23.065236482664595,41.44638680974534,38.957499843082715,22.452712978663964,42.36619632686269,40.64116466453842,34.06200493799319,26.7464697267788,18.294845509181286,23.790617878384847,26.95656727656427,26.59992411468471,26.95967439271005,13.976212958656085,18.491638743649617,15.308345584492574,21.59872471084551,32.099219131943606,13.409459037164108,18.241438636440456,38.96571808731056,33.60535261138798,38.78435479672483,35.172143258081995,46.57819208090349,21.152488389900505,35.580709094206725,32.37564812224831,39.122099593229706,34.231539102211926,33.494462234847646,32.653004927762176,49.4982686003637,28.50093869938989,32.87118928174341,20.302375774816078,22.622204454401057,27.981387339820692,32.15353455969714,30.63649587989584,21.925241146772628,35.227418207953264,38.95736798751548,31.02373718284099,25.7203164801173,20.536040713225017,25.58643398598895,28.03581856427666,33.87739294524751,36.892187972855716,37.184800311788415,22.21694291531839,46.67674563931358,26.969902379381473,30.57471866165447,27.62544693014942,34.074886781261654,33.72341970056238,26.81460903569085,28.18586381794705,28.557036267641326,35.00279363815913,41.22442103096596,40.91770205645355,41.53892929759874,25.94266795436619,21.101575361729182,38.703523359061286,34.914040711193415,23.85907127072596,30.16913897297565,48.44821832316033,18.25136850270814,18.215943936892238,22.26669981372174,25.268054208505653,38.31233646658336,16.182610634609674,44.57224522816351,43.009645984665106,25.35754716837043,33.875666253093875,34.3825718419786,30.655923240674767,37.360002697480446,38.87230436834248,33.938686555363546,26.776487647309903,43.11711138164321,33.015198807377026,23.764457632401058,23.06906954248398,13.93980570630001,21.06617509754457,24.837228958495547,27.941348857317948,36.3732528778349,22.76390444689346,32.766047510180606,30.27538776995678,31.122482975036938,40.597306376648575,27.704010181930585,27.203676784379578,11.419515109342116,35.9335858857044,31.898842667559556,23.588829221669947,37.02889107512661,34.347794798702694,15.430817400631591,17.063210445372295,33.00195920837757,29.261501892095794,23.12290713948616,35.13922453055558,33.85546122131872,47.238747924649346,30.146048803748972,30.062985810818553,16.42479657617985,17.734801162873406,41.24313821998933,23.273070023992158,31.306147878981587,18.812417757538874,38.76949939203553,40.259225464786404,40.17921629632105,27.87751067475812,24.3400280010443,25.3025609272714,19.976063944175152,36.93989647496877,33.75293672977072,25.438624347252464,22.227267581852608,41.43644353319165,34.982802625960375,29.167067227181604,23.615048522810888,23.189576046972547,21.956861106983713,26.846390539401575,23.092253472801428,44.4993190399785,31.01065722495324,28.06425375009399,34.07263139938844,30.058255674141495,45.94345743261269,33.23844554776335,39.70211366327045,23.942327739036173,19.738217684150822,35.649443481930305,29.456852993557426,35.695981643406,29.59930352287434,24.17290243595805,13.581487087515004,33.855344865999385,32.16888828706734,40.269501753002,42.852579039143805,31.28763568248271,30.30286358517899,14.040349372610162,30.058563320660383,30.63898730103563,35.826503070728265,22.513094757219395,34.2651993186322,25.5475909858136,40.73361697231868,40.223307205047554,31.077795134344598,38.67403966304556,26.89054027107403,18.04337790665506,26.93926913926813,32.07389711670774,22.281588367972965,30.36142463386794,31.093426119964793,19.069510013634257,39.99527712206718,22.561948077203017,36.87214194504688,24.606438204129397,32.58485311083511,35.61068352080174,31.054531439843295,40.568804794139275,38.98710371473474,16.366740345118004,25.016518074226397,31.752228652415912,27.379598663602955,34.693497973151565,31.774669088501284,29.388421009736774,39.13108695651781,29.289533883596004,37.65074167465622,35.389059107266924,27.375532275245178,18.936329017622292,22.86746925929748,23.13860833407248,28.517373185447237,26.434080097324916,32.5502324451482,25.498111876730768,34.613490549341634,18.524352021213716,30.10483691186713,34.07117354133182,12.991378508710188,33.15393464592661,34.78959160220316,32.667981347305975,17.280651657878572,27.71885180012479,34.59890779785006,29.00271544956077,24.415171111470286,29.447212384731433,39.33978032752236,37.620560030667704,22.30446936297692,37.00423004274267,26.59669523314552,34.226161013627404,31.61162713875326,38.54601725198936,12.964108192945787,31.947257284716272,41.852328326898586,26.0153627635664,30.20843781929132,27.873321914516165,21.638462060585244,23.727535510107522,42.76034258658484,32.89919301992182,25.2691617478106,18.189910968819657,33.809516204358765,34.199781211459,24.357493452271342,33.080730802826906,36.5582906698787,27.959645622858265,29.27308927935409,23.18696291621798,40.3316070442572,26.245511974521193,42.599546450822935,15.881269409312107,30.163944340264166,42.53221993127475,43.89369186968085,27.46730423382423,44.2731961565545,22.380505366565362,30.475588058480238,38.6716801910861,37.880447284140686,27.92750834480839,47.067415233606724,38.78881300424507,30.241887969736528,39.330561359934194,19.63491717595028,22.846728812571385,20.522046371680716,22.07512265738699,31.69745978774082,17.691824040783118,29.765411854666212,25.39842908994111,40.36877717456976,22.617334234892443,25.402243314475765,21.38761718687944,30.54227081481003,37.48229156857903,33.59308190807567,28.318926725356057,37.954673378918606,22.688855593041524,31.407188607512527,23.15038517849262,19.11503244379884,26.49245564745759,28.912999610980876,42.43505838753582,30.692117135098112,26.141900513672336,25.48858042647181,13.620511143152065,23.877122891771887,21.657072124075015,24.183896699536746,22.800567315572096,38.83277963995671,31.899444146714167,27.961230600002796,36.177358519601114,23.242931464689597,21.463069233066484,20.269781004710108,27.69410153944525,28.657623278254004,38.69944930408225,26.427577773371404,42.470553310158316,24.977273713189632,20.505385523549155,31.52599326515201,19.715421415037884,15.7772476075572,38.63500390096218,23.639517937385165,40.45017170212134,25.58647773049863,21.821136373496415,31.34623904805466,23.47077985964784,30.2886499095044,29.74755899326857,19.973314192776776,38.233333546209636,29.44146122767438,43.27207375061983,31.401056819034984,22.01487636548821,15.497768130910341,41.75939530935649,30.686932949057635,26.014694950487893,20.52265519612795,42.728317726903356,30.813773256380163,30.82215018433492,42.67769564732953,43.421196420273944,18.325594829457213,22.886565853135338,18.351828023455184,23.925151395401883,17.119691917773,22.460895386850016,35.05360910042211,28.05747158187615,46.80271444486846,21.187800625939364,24.84036989049565,22.239244328966123,17.768404023795213,18.8765829187474,23.6632711050622,35.5382847462763,13.169616232403396,27.23855461965827,39.243179666641375,16.269556581207585,18.106170932525107,32.48963284254268,32.169123745400825,34.95372732088006,30.908364082595007,29.48879321416907,35.63645507369438,31.67390699756537,34.9011736381719,29.58637178336817,28.690284228988943,32.23475484879647,32.90860734938152,30.064674302307623,18.03987137151717,23.049932114898127,28.84037163772394,21.108212243828422,32.849968229771,36.18086559883011,16.595276577345516,30.642309370800078,26.46446636452792,28.422853493674367,26.84919185905336,20.523507327453544,24.216674648446094,34.33861393984017,22.869561185123178,40.40546561754455,17.875132866959596,32.55091226413835,23.11548549832338,35.89234843367181,31.27435946934223,35.98382253913968,39.33485116099794,38.42901529879174,31.134248778044558,20.856924038842088,31.47451335898029,30.308431390821895,33.18597625913131,35.0545876060699,35.905200268872136,32.59808909213868,27.8467294929374,39.7108164356219,23.46685686790493,22.431625998740728,29.557829397530252,22.444865912427787,37.74424900051592,26.27823189121454,27.351151853249533,32.284733352288335,19.715854225482445,25.526233348217048,35.03937383360477,22.66041957981496,31.9650944654455,27.050885304738745,24.621441089976315,27.066210088034165,30.845150885821546,41.11743599452895,45.3494217181731,28.285910429038445,27.08131716617844,25.1625088256679,23.416830355562603,22.57161975217808,31.150290488965013,30.9334842792613,46.79126715859106,36.23670364529745,39.48083518849368,24.743499480653256,13.20478542549084,33.63063894568782,28.41163804741167,21.673072937648673,24.125479209590328,39.87540823422751,45.218605142582646,26.256459146830355,35.4013768557318,34.39748185243977,26.178650651771893,38.930344166329995,24.23050697798609,31.408462987416208,39.267949030080764,37.632959422947025,33.953247412716834,24.269915015667817,32.394396202839104,30.815392057422972,31.312299601826677,20.631159387749214,36.25950616390223,35.25711588219471,32.70031402433798,39.613989024142356,29.227865068926228,38.47845684894884,29.09664181357996,20.158450155012055,25.489904061312394,25.209640590000706,15.988510804202267,48.39259737436041,25.330723154123817,28.260031619653013,47.8416490870244,34.05161188560658,26.150604017486092,20.660114924415744,28.258190832143814,38.34703866066005,17.89019075154091,25.871794579109817,25.92161771792561,25.80837110522846,31.048974338009472,35.74531607668167,15.81221431638022,37.76441452800759,21.422930374708123,26.834658600977512,32.8500968556952,31.56096564380355,33.81110833010767,30.94241032406049,29.087657580861208,26.989965170720755,31.610107667949755,31.00460407405128,32.48375758570379,30.470116344495374,29.11234492350948,33.881900515583325,39.51304181398495,46.04195952082584,39.35101454005615,37.1801025258455,21.482952808699647,31.886407029030803,28.95296884830468,14.793448567705356,25.198306709475105,38.3023606347858,30.665003787248303,26.441094715572817,32.14404062334917,47.332848149278206,30.493581046679232,28.66988854005358,31.104668090923823,20.339697934363716,39.96900743263464,42.161079438536234,34.335434413973545,24.700737729273897,25.397615602569513,36.15203082219281,20.379508836098733,12.770198874888358,27.013935971563512,31.584928406180865,26.106321196043087,16.315564339481586,24.904586623249422,43.149935943548186,30.72909789956369,37.1493903820452,25.48953930964457,40.594344762039384,29.264491445622156,33.6979101513487,29.14075145732742,36.488115041472525,22.98155340117397,21.136166973338227,33.82506496282536,22.62606855756016,20.68547007306368,29.023025893869978,28.845059440788408,23.648212640141054,23.740778917411674,27.017696560686815,20.463851328780933,32.53891737951858,32.26377596210426,36.128656970171875,18.34293514604543,27.45771524214998,32.71454754193285,35.41202222490004,29.84044130953499,43.1173349986902,26.91263054071979,34.822463003505916,22.169604620017633,25.626053373780234,17.6674944159574,25.492024660678666,20.259112096760404,29.05156771584115,39.460639078965116,31.209338975540994,35.36055381306251,32.55617008610255,47.226728191872716,27.066774537773416,26.708038105163975,33.577138957340566,44.17325864705803,21.92840846230775,34.312174425480976,43.133473253876645,25.394787221608098,23.462736753666732,44.235117320924836,28.60025075559984,30.7128995397747,36.23762038791895,45.36330533396276,28.143500607555026,19.38495186125751,24.229951957655324,31.677717645262852,37.241899124417046,22.430179372060874,39.645876562518225,23.24009353872931,27.58745631433082,42.24862725995361,41.518641369122065,22.42073823256027,20.198277073175195,36.5759611606994,31.775040697416685,26.514981798661495,28.880026768659636,15.21095304333507,42.84147447938285,26.19915129925002,28.003358225418303,26.213162801907153,31.19696099306031,39.99156424573902,16.26370053343258,30.60387327719104,28.495130593311718,23.510800985722476,27.38242154341961,26.306468289951937,46.20311022492841,33.76268629135139,18.567016034776664,20.9109089339698,16.518357733353554,25.10635844797318,27.131546380157914,19.598997538580964,32.60801457059047,31.294601569199667,15.405380872847466,20.35772097037404,28.229487127210827,28.708961347900143,37.805262077038094,41.57333422143958,24.512399925660397,38.61777283296976,33.46008489212328,39.42834701909632,22.732573900054067,32.493256219112986,23.34787928618082,35.04670491876045,38.132241417493745,26.29732226471818,29.085257027657565,40.95066635146855,43.60239705682244,27.795155986987986,31.510539954199373,23.247830698415413,42.3987931960845,27.6870977168783,29.743779511967684,39.536438752181546,36.92369592833016,39.09259626875021,36.830447330877966,30.63014203362744,31.485879443895453,33.304162354632346,18.66557337904856,36.139534242735294,38.45854683338311,41.77955460289053,24.129953943707562,41.142331019797325,22.3991616824855,36.84467022802395,27.89381072202566,41.04829680985469,25.751672406772315,37.354270574133494,27.35581888407059,24.101490749247617,33.64699205710426,33.03766410774928,31.28711499374733,34.28228714677056,36.05067359041078,29.686205080805237,24.403103334867904,28.402565679568315,14.066193010155455,45.93004761586539,23.669200768292768,30.450716102014937,26.03514143314864,27.492874869118634,33.588921847746505,26.82341417619036,35.398165952845616,20.005934485312082,25.044816140875703,30.524963356668696,27.526933362143122,21.520893447789593,19.425894909303935,26.929224684439454,35.045808013162166,19.652364142501252,16.995726927971013,34.562380671801954,21.500864612103555,13.311240171890734,25.659926463942124,12.585127912034508,14.022485438805727,29.74550870914694,33.494338738610566,26.55986234365085,35.46127926593206,24.867023473696378,13.971447280038348,32.47147716999622,44.31781450064694,35.05775407904626,25.195425728417412,19.950360635294672,28.996049219507746,10.954200832421682,39.95330066765019,35.13810456138723,26.09800626199381,26.129392026035628,31.509041510995118,29.309220871505744,32.432422847469596,32.294579442155886,33.829413516143916,40.39207086126146,18.62096891574098,36.529558836073946,30.785220600768902,36.74223858382306,35.47072867996019,24.778629430442308,21.892677422824928,28.648836839183957,31.670171393548053,33.14932020195656,16.652539656504885,22.352413919225768,19.961078055075212,28.819007169694725,20.869697848552207,34.055780068187644,19.596531004174498,39.81960031459015,20.66957849186128,16.3202628683498,32.64675147421546,31.20346131770991,49.48729478852674,18.837606904658067,18.72384368923087,25.671043135415697,38.5221584906439,22.107716918376394,26.00808357662649,35.60077550665328,27.078400343490298,40.2819159128235,40.90916867746656,33.932936442862214,18.734294726030832,27.46381751240466,46.53713962873583,14.768553586630372,27.384802315335723,19.684464503469815,43.86965953426765,40.4206211180954,18.282847561416034,39.82918644886254,27.137563552650512,40.680247141845044,35.725428861525565,26.2354144690547,37.423383285444324,17.78724390007524,30.900964906796478,20.4896795130821,32.98589134358694,19.206340719293525,14.68235439500837,15.359640461037406,22.331801113855256,16.967194914201364,31.442932899445125,30.113413566628537,23.19008349553578,29.980403094890953,35.36315176033459,45.00350061922871,28.846123205364734,29.368919646335158,36.857558346905996,30.329877423930178,42.485432555827146,34.37888905932701,32.72764749943369,43.352914528424876,37.790740387745245,26.450030980986856,16.37950460673825,26.236622721368263,39.35130942098594,16.49797135986188,40.54805400576369,30.009932155352327,35.9159167748443],"beta":[22.282820960110644,21.95675382951821,23.48250948396163,28.906798935400722,14.221650084592863,12.13662635731215,16.646421887273206,20.19790752811427,25.967755023718855,12.40547499119684,27.228833470368844,26.90258939270652,17.0551562422011,25.507875805027275,19.039838265725546,11.185869425195683,24.135305890009118,26.506963401809685,27.20738702834425,21.544782088955476,12.992122236579862,28.477349220178265,24.0788215433665,13.0046508240804,18.17871440946899,16.895868716181912,27.04685172493029,19.86194825122316,22.19549024916539,14.639796289467926,11.69683150857896,11.154585420681485,18.982563371251576,27.83521102988248,19.245441664167746,22.562849426747107,26.16448098051595,16.780549487768898,17.254310198203232,13.129161287062537,16.72803212610694,12.513108002754155,16.055275629703768,20.959193556375375,28.525246835268337,17.472923993104892,23.74880455926732,28.404567084565265,21.15434364717626,22.93753715352649,10.563147040459807,13.24420236627585,22.190888432306775,24.730690068020287,26.816695612900517,23.08310979086258,15.11788442947816,27.728008685655368,18.097476790553067,16.65971541628824,20.39644297570345,21.270303840152238,17.174894397946566,23.49999430838675,29.278418863965214,20.78195620004575,24.67279088792494,29.303927268227625,11.163435653858933,12.887623642582696,15.078278442870495,23.577052886054265,14.01858104051362,24.598381936089233,18.875474158793004,19.487681870858964,22.163338572689675,19.70089405526388,24.723431525774508,22.015928547949606,28.79198054512692,18.18438137949176,11.531752416362933,22.39663287877073,21.899652509989515,27.161285550682422,25.820903293292133,22.074951839859335,21.689498057470363,14.560396832454785,26.0421434504852,10.831360665878481,16.78527826400197,23.116696944244495,17.188622813379524,12.931313733330336,23.25255596287713,13.070557368972375,29.24080687676918,24.460425741781783,14.506217019919724,13.07127066828453,16.36639986986235,21.188551814218734,23.75303178859092,15.453346668216476,13.81394497446015,20.67226299357342,25.984619432068875,29.59188206674863,29.740911537407406,14.919545041879974,13.396434258658093,28.339290743344137,17.81354109487617,29.86099363167345,25.97870173763404,17.835645456203643,15.266576701323459,22.158061490431493,25.274245524271528,16.098090488815515,22.81228196141125,10.681947635772078,26.420224956751454,11.566163341123481,26.80418368672369,24.019858274959716,28.664259242292026,10.75321373469697,12.498229149012552,21.914041810543864,20.13341193904662,16.85899520684314,17.831614357712482,22.64244007809165,22.244138956828795,11.624233909378038,19.293043015383397,10.720486246814014,17.78296763260731,26.208992717591222,10.86714721157791,28.20656542515207,16.149434258033736,29.108655969174336,27.78765108831836,10.317280541358462,22.801309084044124,26.322246595964526,13.17937285631405,16.45789613919402,27.018174861988598,28.330427312656088,26.99952251383635,15.850708648132867,15.376650735325338,10.860114160716865,17.214435715163155,10.636966204662425,27.32004379170395,11.469617208546818,20.75470207767349,14.811159569578143,11.304677270802408,13.247991292749251,23.36641539476737,20.241305800957008,19.44868408121621,23.35196273082584,29.500109102284267,28.09736583995953,14.496992277021219,28.98791160562011,28.829301887893077,12.099978511235152,20.18062947647975,24.10127125104224,15.81353624364799,23.456672687403803,17.554256789480043,29.851949162698943,21.648434360469665,16.557173809897698,29.436138916473972,29.93136645169461,15.443308151668402,24.347782371279205,15.34113631409249,21.748093633766125,23.56591781107406,23.0754011752403,17.805196256031213,11.452957074036716,10.33459213065726,12.437614904232879,17.156257824453725,27.769168948346262,11.68883740946654,16.33333279788338,19.297355616320505,19.94648928435151,25.65503681443876,21.462420884556682,27.313834781075606,16.935893207009652,27.979587047241047,28.509978743531228,25.434508388774294,27.780758205045352,29.822538016338314,23.212757082604583,29.599789279359822,19.697425681138654,18.697680201374464,11.231252968656191,17.349327419310683,21.091940466326324,24.977739832341108,13.450091113252096,12.285321543761537,20.671449845125466,21.33546421431874,19.62520385088501,16.705454599852835,13.447770676824415,21.85343408760073,15.332529000636562,19.45246056750741,29.79636715463537,29.982892135323667,13.937711743810661,27.776366823843187,14.619869103985845,29.681182297080294,27.214938070920116,22.88157161855282,27.57809124830218,11.102031651640957,14.21328458675481,23.69494220468697,17.867367093388875,23.810656126539634,29.316335426844837,24.537732517707585,12.837277440998044,18.981105700635162,27.124199199107682,17.904125928469924,17.811602845802547,23.882267627022582,29.67301183782324,16.135387989507088,12.707655518918624,15.053861348838113,15.256897860714108,23.63319312482861,10.922760174702049,26.730078708643497,24.176965223731976,10.82980981527992,27.77044350230478,22.960624484250168,23.41156292056317,25.09646436928913,21.71892368798863,17.006627524638837,23.01489249455034,28.56890230566765,17.963155273460938,15.05156380579908,23.0375185918863,10.316178922844115,16.59701116643166,14.41109816946781,25.626918032628595,22.706077044720367,11.399060155428845,17.225329552491075,21.08744427057433,23.072639094035413,20.938087934573243,13.642415279776738,14.179840565903806,11.021261481602021,23.977661345343645,24.556407067994826,14.889442782502593,21.394826677571288,26.27136379137238,15.06518274875046,12.528845842341836,21.266888045423528,13.725506670642428,13.492126585937205,23.473415143684857,28.70308179728058,27.463799984896685,22.113875648194696,21.953767777499102,15.308131373750967,16.10390566502762,26.789006408970973,18.832395809827137,13.628984248570482,13.466506766407775,28.49443458098476,21.578373236025968,26.971349449308878,23.408992875633494,17.45540688825993,16.98339387687446,13.20339417108363,24.673453146731656,25.794853175052083,10.731840387413953,19.235716491779307,28.519835537837377,27.8105521810167,28.870549591944254,17.15076476355169,13.942687135031807,11.439210852686337,25.674823404340433,16.010193957264597,28.659924145755017,21.137333981850688,17.159021854426953,29.498637618395517,15.201728273319688,26.871509012717546,25.45103283044993,22.010474484019,16.045704549649717,11.973473791437414,18.96017994285803,24.266055173796826,16.427385572875124,28.04330955457094,18.887907275638923,11.292580249705665,26.034270852067518,23.75153610200929,27.973497081863925,27.308292188838163,13.62143312296566,14.76947168311538,11.321989540061956,17.017736157531385,14.229496405668606,25.91220187651465,19.121512308031065,19.083752263756327,20.280127852932548,27.91360094034564,27.246369909391085,20.44674964023031,28.728624073279235,10.018048710870406,15.993843907760542,24.768732862444462,24.63813065949788,21.46002353762025,11.639744120687707,26.013927793507754,15.480405467780107,28.629254086813567,14.242864609507532,29.030069445113686,14.485891801287023,29.020830746986952,26.363915066740304,27.332966918747662,29.484682469953775,28.22113134249678,14.639992882712857,19.176515531008764,25.105576424948744,11.636624779514136,28.434624870221658,16.928237511719036,18.007486500885726,23.7850778611905,18.80811789699042,19.301574066913886,15.815429793069185,11.599049342546861,12.978155957139084,10.878808164140498,19.71087176505538,27.794223830819405,21.153209597040746,19.04744130495855,20.04696698249901,25.675623847857022,14.654983363227325,16.732549027217534,29.42028601147356,10.741945854311176,21.1841337476897,16.350254300244114,26.04011315074063,16.909217334295448,21.65634644131709,23.45063609252633,14.262516748673896,21.212659210787045,12.77167600444507,23.96646143535179,24.638984168509808,17.080473656120347,25.39830403264159,10.366757439220201,17.455169686451836,29.966658134854782,21.57605357980045,10.430356951555485,16.890700201645114,28.117169474996693,14.378849514150351,21.751955575380578,24.341202095568782,20.002637573346473,21.225975397747696,25.11106767586792,26.885926426570514,16.66959345148507,13.41767237594893,25.291150826812775,25.703587491412385,11.627757878990423,17.20219302121228,25.404874675726088,27.379773119894484,20.337336237994457,16.55487876190875,21.430510690633376,12.45566111073571,27.849081335907844,10.406438133457382,26.15180879404528,26.035560698411008,25.054907692731696,23.88099243821062,24.813077727218506,21.623914608110503,24.921693630904098,23.734929374081975,29.758883638891508,18.4466929729751,28.208578450239898,25.10812636070232,11.677878794558726,22.793412761658132,15.857121928071614,15.28639400102544,16.927583996085435,21.104270511093226,14.05220101637414,16.480308981834607,26.565111514809608,15.404393983605033,25.01830897155646,19.184027139537207,17.814981117151888,20.695348072179435,24.221399530716297,17.936857532754615,27.68146052287124,11.884598113448419,21.928832914411043,21.9228854786582,15.774374355350385,18.475383099639103,14.498393295510077,10.93589234529687,11.728849222936413,22.751381716825616,27.448930066888412,17.553926393418216,23.58799835358756,11.196962641139777,18.311085226809112,13.10288080862847,13.865442767440562,10.635779888494277,27.206287965695175,28.039970442196086,22.48716117309829,20.233055200363225,21.3555139944178,19.347209928305663,11.58757199421784,20.606529401733372,28.541393918111414,20.713281012035168,14.596559938841644,26.87243385885023,10.772932969457782,15.785128585739052,14.304784644605167,12.809155168908969,11.071053665777221,28.724628059045294,19.21640998163994,28.606744056929237,13.777681522766901,12.083523015254185,21.35467253835666,10.170940030918882,19.040461706022196,11.044224704626382,19.237133482226398,23.81479806491808,29.39695187010787,26.264364825892915,18.549552110250602,15.141873980237781,14.107509968163733,23.499717474440253,19.083656938938297,10.19150399020373,10.932950622516572,28.187641142363475,14.93676006273617,16.9532367540177,24.26064142409735,25.298229912950404,17.35743415490257,20.23025739438234,11.193191473629422,14.195693131499176,15.838338695422687,18.69547801965748,19.23513486978131,20.21282243256128,28.90399743867612,13.24393413146829,14.222290891395755,15.23222886077181,15.375998491572545,13.384219196865024,19.48022600586341,22.638114018841083,11.419273379201119,22.564679786156972,25.06096370409044,10.029477322736575,14.605896282368747,28.27054660140233,22.00495490128911,21.460580388933174,16.252591103564924,26.642460268864028,20.578023199650023,24.723689287827714,21.278680563059087,23.8380360694025,12.732593022476122,28.200757998572175,25.928071900588797,25.20820068753877,11.341637979844691,22.585972952273472,24.291688548656516,12.583083385001341,15.962611721166994,26.023187792833014,10.885346431143086,14.160913629778653,10.522313089798917,27.27133535382446,22.458492582172532,19.317728887801074,20.535443653001778,14.613445211345567,20.05902023290158,28.516139771746406,14.613114916856066,16.090633141077465,19.54826011743762,16.893970801740124,14.246364643757964,19.66068154549571,19.851308311160302,21.639730898311665,15.535123869696106,19.385142413213178,15.507462695904728,25.685205296913573,18.319750331823343,15.52369912903336,16.962240850571572,15.361620317177413,25.880919383217574,29.88312250809091,11.375963095571105,10.658551572902905,26.456539087909995,12.384946036675464,21.365518859724265,19.795097624467783,14.954591783230908,15.062203926147607,10.870926167236096,20.08698655662031,29.42932420834864,18.454492565298924,23.149164402382752,19.090023205456337,15.299687818240887,21.28672136270918,21.93216642899097,23.22490712063249,26.597600191555664,25.333817236134276,11.303567532025873,23.60925837574068,18.823302587691416,18.52700272065348,15.911142927509921,27.466849755511028,26.94267894573141,23.287685699916736,25.3722372998508,15.095666755410244,12.715625348059882,17.34079961390635,24.9278992240748,12.187681278395903,22.828228207887953,29.089679485901286,25.911262725633577,24.135319755397774,27.66837531019315,22.10409186739758,22.5793276134417,21.766536723202986,16.41407160551459,28.54107740156695,26.697969944020244,17.82418720385953,20.41743439216583,13.778020714998398,22.5811316250659,15.674529233170173,20.562711391671925,19.432512782108006,23.7631722966081,26.22714955526517,17.677104470803787,21.30077986301604,10.932625034102696,19.441483197739498,16.668150730444353,10.677300333546711,15.1882158703211,20.084770455128783,10.107124957438769,28.653647359651803,21.080994838472623,16.700822717195933,28.021516906207204,18.131583105107477,17.098412534691217,15.831394653279895,10.175985491600311,21.624469886801702,16.049207177251947,14.93228199888069,21.016388893454334,24.723093922909094,12.344029093345984,23.30816414385793,14.717020306209081,20.904033881906663,10.859276990522941,10.84368975865521,19.74715679271036,24.51898041776242,21.73041487016626,21.37822138947165,27.05357456514506,25.50488335009139,22.24416729775397,17.610544517987925,28.74991146933251,18.554232327861943,27.14652538109695,28.546606536973577,26.271594754517654,28.282289341290856,19.937794580214273,20.458556611120976,20.02896034498988,16.584881505801633,24.941422636111756,10.47569152592179,12.90918809547656,27.17212224125901,18.27262625258726,25.590376207267962,12.281257336622907,28.903281789325774,28.849371045379726,23.783652626032655,12.742455763119146,16.700290600548854,20.786823045646873,27.446616398428723,19.944036841184143,12.22745523920588,17.819435041008486,28.800681421569546,20.115505526319303,11.053815885547866,25.281957203951436,21.312604530392306,22.23678301324344,16.09436343918218,16.06135055460705,25.703914057173517,21.90911318233527,27.913526391414347,16.1743727376669,22.697721926667075,27.237260335000467,23.916663562240995,14.790562708320824,23.857668933668492,16.636849437638528,13.435457013117333,29.73339377603047,10.219030201388888,13.94391266574666,18.640236358907924,13.783187294688073,19.30875869508676,18.489731506656042,14.119929971401577,12.184127744480978,19.83171847186147,13.391199888032705,22.16115412284021,13.623508886427075,19.968174714025512,27.967105722451286,20.781875243285235,27.652705515568297,26.146279802249953,15.368585251090634,16.28844772192955,19.013465277204983,15.799300998991637,14.822860319497293,12.50440657146326,18.75841119776898,25.657292956693077,26.363304270253668,13.893221054158325,28.242522537530487,14.763755807153593,28.977460367733222,12.862662779980862,19.775903245548633,23.245166098953668,28.12828306578396,11.881550812272703,24.30166298412012,24.29668665236264,16.506247231637868,13.409446923277063,27.277853780066323,27.619508818421806,23.65891228077585,21.276339370476293,29.190783465860875,23.231463339527675,16.208119492886297,16.75579907713708,15.833311692795524,26.896710987933798,14.887824408676877,23.704265218729688,13.0863859761943,24.901793717106735,29.649817954098072,27.79314383391427,19.611652924020028,14.249913432990734,27.650032037427156,26.03485576134707,13.941931533818156,21.227946529018006,11.243808367480481,25.080219158674527,18.898248152435627,18.539954906553348,10.73718975404978,26.72147487287571,27.919939387593725,10.7882736532616,13.711456095280706,10.634881750694042,17.051416305884768,22.726459445132384,16.40965994618862,26.299199156033414,24.402926678868113,14.80218476083893,17.209230567622242,10.697650628372749,15.81672481532995,13.860446077699994,19.226484843700668,15.434456707199224,22.0436365032009,11.318571203308725,11.297947990501704,24.112234870427194,25.844358019766634,23.37237172026351,23.30989488572577,17.40332790005109,23.506538921645337,29.57774013681332,20.536517919493264,14.48336392219411,21.62454606961349,19.891391518292107,19.281377352843954,26.48592120751761,16.804152766767245,19.818559190238204,22.59578363201529,24.11853251852497,22.52804059611739,26.14272189343112,15.443393906812792,26.710831705147218,14.183024855149412,23.0581550119149,25.653958084992226,27.39140715804497,28.466500190241433,23.050277427609483,22.313689543610124,27.757934295784636,17.01768317628442,17.477109019255273,25.509831029366488,28.39751425521646,23.044919180958694,19.820430582721393,27.176620364535143,19.187955086892885,29.927216434071127,16.55582993457308,22.18635567130842,20.163449036797267,26.533040134440768,20.505912306223337,14.74858705077924,18.148436017118428,28.27318526465249,18.649098885432423,19.786432513756576,21.32421769368853,14.196971504299874,17.78802349264751,24.014487150964673,10.237387322700023,27.61290534284397,20.286421698839078,21.4741981245254,12.895939857695602,18.122478673223632,25.947622782298524,13.520221744383353,24.269570377602733,18.65676879923916,11.954730339942294,28.71669042760029,20.42813454551334,20.128938060200895,18.117302687885996,14.258830336501438,21.40055452089578,14.391425532469091,11.903805266343204,29.349642326668967,13.414351105842272,10.398712659471428,14.107903362206997,12.199578743704041,10.74206236424423,28.106738899465093,18.499608265213716,22.123618964910673,16.456138782142506,23.251531817183327,12.200943623921766,23.560651862011333,25.658754209038925,16.011007587314975,21.846706766681475,14.28255774900288,20.66037637797164,10.054149190736009,27.515254965758793,23.55565093903285,11.804846601249622,10.86937274646267,29.766994893964366,15.561626981292775,14.829805659375657,14.341593701173636,19.179802063027406,25.756544621543643,14.675776004613459,18.32839404047205,12.59860224173973,28.700727686641223,16.277293108349337,10.391809463996694,14.630023616923342,15.806529532153561,13.684102289791586,25.887126146694893,14.936582367547535,12.931521227718768,17.62419257465277,17.598003341572216,17.766054831059353,25.674035758240237,15.183621335984565,23.84405288153415,20.47996218987295,10.819692174703391,18.793182938186305,16.653041734939535,29.629744671980124,11.091996060365975,10.778459740804042,11.369704550889349,20.034308452857545,18.859257250642152,19.42068691441625,26.08120320181605,26.35101168254247,27.56099875208784,28.480058740820688,22.92646460002812,17.677835716155982,10.891535967748496,27.85414650910218,13.518322049970273,26.643992047184803,12.993187053482206,27.08444604278548,24.177838643131796,14.149235575343582,23.56304988616303,19.26453351874465,22.991183291443956,17.358362619081078,13.556020290923275,27.365839122845635,15.11527184325442,15.108853284132543,18.312314947477756,26.78045613462876,15.59145668361011,12.870801431749616,13.82389846010604,16.326644128837987,14.588864690133283,23.007405805276967,11.952882775614144,14.166962369906182,12.537002081032469,20.859606540284,27.955042892130244,27.269560768383137,17.00369750962398,23.911107724275542,10.753381930267803,22.866462875319293,24.9551426573445,15.220065979132823,24.596457473854926,26.55272774634073,21.71802974607662,11.552038888665086,18.139578372608266,21.885289867604577,14.92116295797224,27.433410011194873,21.714700007349357,28.471313432146133]}

},{}],119:[function(require,module,exports){
module.exports={"expected":[0.002841212509483617,2.432487670352651e-11,4.465031496637053e-13,1.2589363150168487e-9,7.341882188268341e-9,5.724473887165891e-17,2.155457368106885e-6,5.518755112080723e-5,1.647991277693223e-9,9.235849446319964e-12,0.0072927052316232605,8.571097567424339e-25,2.4046027760522613e-7,5.072202435218122e-9,0.06625283512047699,0.009605737969244901,2.6228205964059412e-6,4.685697830642706e-9,3.8256502300972226,6.527554241237757e-8,1.6788880740426546e-9,2.0476796732691873e-7,0.0014556728184769079,2.4016801422133784e-8,1.4416288912069082e-5,2.4328596612401946e-20,7.152274698836686e-7,8.103517027091191e-6,7.050381221114022e-6,0.0026649885148884007,4.3209865408473775e-13,3.472629977890041e-8,5.552731901953079e-13,2.778131055146576e-6,8.869407910981281e-7,0.051508694802424614,1.2313152775737254e-31,5.396100855296513e-9,3.560056835780017e-6,7.1856157869540115e-9,9.982075630773291e-10,1.1372552326745983e-12,8.553755579821889e-13,1.2333479193655842e-7,3.4519463960892575e-9,1.0311685518169465e-6,1.1743961812683094e-7,4.452885306671866e-17,4.2616077100152316e-6,8.864860402666217e-8,3.1906353002569976e-6,2.8520503055046743e-6,2.5087146977915037e-18,0.0011335384743231419,4.72825087432239e-6,0.0002803649902484278,0.44707909814430463,1.4249826537029114e-7,3.934921180964639e-7,1.9760443069333968e-13,1.9495390355535628e-7,7.567261085563049e-19,6.80154319158363e-11,1.665945716056009e-6,1.6920477674383194e-13,9.161225378403521e-7,4.799983049478268e-14,1.3106517964054231e-20,1.0494413015258645e-7,0.1363165219044462,5.693782889439472e-7,8.889737755938193e-11,7.071853486243591e-8,6.817718570880668e-7,0.054272566845850446,0.00040609067688400936,0.030912284154894904,0.0005295326012971697,1.8427833740240944e-16,1.7085650756232365e-16,8.194128165882153e-14,0.05986400315636016,0.0005388964601349477,1.191308955257783e-7,9.66638643344421e-13,3.860903333055915e-5,3.1932136903795195e-12,1.0961973997684716e-13,7.755934539173831e-7,1.1538771772274456e-15,1.0748014695286656e-23,1.5041622376481102e-10,0.03774468075684543,1.7612116635467173e-10,1.242134590066145e-14,9.219720362143535e-7,1.6789183003906384e-11,3.20582794957806e-7,4.146762041220786e-6,0.00018770039190714845,0.00026979662987604796,3.4025516795880116e-9,1.5097621824521829e-12,0.0024414648886572367,3.949997920343454e-18,7.641713188147717e-21,0.0002982695133525964,4.2289674961316265e-12,1.5231027986765926,2.305286897080163e-6,0.00021018292089851356,0.0031101826535764373,7.831740449455671e-7,5.115481241326424e-10,0.03348060640711802,8.839432682501827e-12,8.814998326048858e-7,1.6727548583388043e-10,1.200834336133729e-18,2.0927154103748157e-11,0.00031242961364762845,6.104966002993818e-17,2.4331920159481975e-9,5.925837238479087e-7,2.046329750224045e-8,2.865420659996797e-7,4.86561885520228e-7,2.7725897654110905e-6,5.5394302620795665e-8,2.5905981894065575e-10,4.320981411272075e-22,0.004762032813748044,2.306523631379723e-7,1.457917675797357e-10,4.928277073982736e-10,1.0817717968643813e-15,2.6685902597495162e-11,0.004482815143926151,0.00010351970292877084,0.10572193499503531,3.200385465359166e-8,5.240750320777935e-5,9.728814445840468e-6,0.00045699553115699537,3.9022765071740273e-7,1.0378158374698315e-8,0.00031487459807827346,1.3793939340630478e-8,0.02537925281485178,1.8066154272959854e-7,2.1903864213426304e-14,7.505513999173378e-23,2.1578564524654936e-11,1.703812314210034e-5,6.887004368510282e-8,2.259567589288243e-9,1.496744651577231e-8,0.04167634696574262,1.6399694298803495e-13,7.851494080528083e-6,7.752847801235497e-7,1.6369411578202848e-11,8.181512848387003e-11,1.0231840321278644e-6,3.058050675475325e-16,9.831325348236221e-5,0.07297546253545668,0.001586178471065479,9.115287897516307e-8,4.862240937097816e-8,4.531809365910095e-6,0.0018914676180975477,7.45113774723709e-9,0.0002651531614544898,3.9836680507540976e-8,4.457963077134323e-7,0.020733962812286646,3.483906986086935e-10,2.3964825081091723e-6,0.10254735174618648,1.709596087799065e-6,1.324623822763363e-5,4.601919430307947e-24,1.6524649759477773e-8,6.6130340564700185e-6,9.907367795394926e-10,2.2609098979520773e-17,2.096208502599679e-14,8.807713710314905e-26,1.2843090778602157e-15,3.765538154885452e-8,0.00019021300540272515,0.004803184672315534,1.5637693005334013e-12,1.7480142075043413e-13,1.0403939285483841e-20,4.421661055266307e-11,0.1769910732615908,4.025376235312492e-5,1.8411655302151762e-23,0.02744371062262919,6.777945194664726e-5,0.0009334579816680776,0.00033414771636622456,1.3407792218517993e-7,0.1009208315200251,4.178981421469389e-21,1.5675758023383318e-7,1.5379915161909822e-5,2.80865530617897e-6,2.6798625630355123e-12,6.470076771225087e-9,9.82249264682244e-22,0.00040170032683740193,7.296229502555552e-11,6.559971483786076e-11,7.428950959781206e-13,3.2795287928907453e-6,3.459805306638139e-15,0.0012933371813162423,3.967643231946852e-10,3.106537957886214e-6,2.1780137328486134e-16,2.4413911624455857e-5,1.3091853685578972e-6,1.4371386458538963e-5,0.0004045699568652788,1.1343438867017308e-11,2.283913003369654e-10,2.5087284535070995e-14,1.377099091975445e-13,2.5280126193471956e-9,6.416852323632767e-15,1.552500478266817e-24,0.0005917100777730621,9.600318961356947e-12,9.726546608376591e-8,1.149435242569297e-36,1.022887629735964e-5,5.259773912015869e-7,0.0003014344024479805,2.696075622302703e-9,3.8019278503757e-7,0.29801471751814956,0.0001186563025658093,0.01279302856211709,2.380166924022132e-9,5.847222073817355e-23,3.916748049034799e-10,7.784010239071881e-5,2.87545848535045e-6,2.447769907391651e-9,1.3897632379698868e-6,1.5512103518521856e-16,3.3984216589580047e-19,0.005780354233999997,1.1717333507735293e-5,9.639533751136745e-7,0.013783124591586374,2.7372299989869056e-6,0.00903391723966173,1.01396716960614e-8,0.14538705915226136,5.483197559533857e-7,0.003567274542373787,1.6731762484411074e-7,1.5324801932664985e-5,3.364337259291014e-10,5.72961906381062e-6,5.647051419215836e-13,1.477787064890195e-25,5.57708178733269e-11,0.0005459551296493498,7.605338205710232e-12,0.0004187804538048906,1.8238823325292555e-7,2.1576726243133844e-13,9.234662067619649e-6,1.735449593591161e-7,1.4517544463810785e-13,0.6052434237616512,0.0002527369347460696,1.6290440821896773e-9,3.1301970897179084e-18,3.277450561730371e-8,1.3886952660260455e-13,6.848948774650293e-8,4.6762931421670495e-9,0.9161739144754243,1.4712673147758303e-9,0.10719900818228016,1.3860741376571693e-8,5.308764936928524e-6,3.825093652408476e-20,0.35550590640901747,1.8758596631444007e-6,2.624878371704208e-6,5.154072378840878e-7,4.473620395490294e-17,1.310813516904965e-5,6.255720568806233e-7,4.1681733691845795e-10,1.6992295760781146e-11,0.004975572305163558,9.426764567521244e-14,0.00014036646137813029,1.0352963894987194e-19,9.11556588522853e-16,1.5507978578961678e-10,3.3606744952987593e-6,1.1115440250840794e-5,1.5429551213605474e-10,1.5343195919860824e-7,3.136073064605318e-7,5.70498872931857e-10,3.737321023713896e-8,1.0034216362111268e-10,0.3121801562650469,0.0008591295639017324,9.427716211379566e-12,1.3308605993216487e-9,1.3516762636039903e-5,1.6317928351966406e-17,1.6732220526233487e-8,1.3823857955908559e-11,5.7843543996122985e-25,0.00012564350551513297,3.1599819240985995e-13,1.8755135528184656e-7,5.191638371614638e-5,8.096258164749383e-8,6.16656326209235e-14,1.1500552989145044e-7,1.0352720247690549e-7,0.0279097375270045,5.508389228177826e-19,3.2303322016941637e-8,4.882792839266772e-10,0.46905153089180124,1.950643697586561e-5,0.027333268320955492,8.030027212459306e-8,1.3264119800196792e-8,1.3813627972239984e-6,2.0932809433788086e-8,2.25554270008518e-9,0.03510076935403587,3.1793916610019513e-59,0.00017486886806904748,2.1766052371583037e-7,1.1185195733413896e-16,8.92049621215608e-9,9.654520598761328e-6,4.984142028065685e-10,0.21040394469126836,1.9052673390505166,7.021347995689958e-10,8.98257968556913e-5,1.4146924505565696e-5,4.793524052604552e-13,4.749736522555982e-20,0.33333429610940135,4.28785925912121e-8,2.7207431226096477e-6,1.2125805404651844e-10,2.6659392332324607e-6,5.925621298980719e-13,0.0007340388248851105,7.514225439375288e-5,6.5556188466810255e-22,1.4763748785844087e-12,1.2468295293715022e-6,1.1674742679389443e-21,5.299499091645212e-11,0.00039181489578785013,0.005984148574336556,4.1513592602020915e-13,1.0751199023627767e-12,0.019703907600751715,4.992448178835907e-16,1.565495983435048e-15,2.4586275509654927e-21,0.001050710849117874,2.2485094200473395e-8,4.9742341425322304e-8,1.6421850210337935e-5,0.010424717062599214,7.416520867909277e-8,2.161318981167358e-10,5.121513400794142e-9,7.392266580062277e-11,3.1503930197448877e-40,6.706695803031913e-12,0.0021064728258332758,0.000498072963780003,0.055003547768576445,4.449944353723859e-8,1.0489225448425705e-27,2.1130017378716808,1.910843204550739e-8,0.25875491705496656,1.2009017352308056e-15,1.659205228160068e-15,0.00023260939291387886,2.16207942564618e-6,2.6597062531249235e-10,3.2544329070094517e-8,1.4993752222794367e-8,6.702739518203562e-7,0.00011175563693572281,0.00030113616816154494,0.00035330607883814126,4.944146589178671e-6,3.665471514988959e-11,8.183611095738673e-6,0.03086918492545181,8.000605036315541e-7,0.28537656560821145,8.202387134475726e-5,4.489658481326168e-6,1.2352331797533204e-5,8.335196915550891e-7,1.123120052676968e-6,3.9168771534301744e-14,3.994273551163702e-9,7.227453809179479e-5,7.198603230235254e-10,2.5651552828744043e-8,0.005534754752014353,1.282907830753553e-33,3.2906868237569408e-12,8.362902558825228e-11,6.342074366988032e-30,6.004556278002064e-10,3.949891639896877e-31,7.529862096433126e-12,5.292074573895865e-12,1.3758737203893111e-28,7.969010653169164e-14,0.055915167041088926,1.2006846445132846e-11,9.276677891247464e-5,1.3342456116586848e-16,4.470598197714248e-6,0.05445170659778705,1.2291834359727636e-18,0.0024334780237354452,7.130103406467366e-5,4.3654774505027645e-25,7.3081798570201e-10,1.8304233682467084e-6,5.917510021241041e-10,9.151824951743647e-8,0.008441873485514336,1.0135934925105837e-7,5.999903498720991e-7,1.6890907428652132e-6,2.036084311846697e-9,0.00012202043043574751,2.162134566252302,1.7406789493741022e-16,0.000864928403413771,5.9266615004111645e-9,9.518692380475342e-14,4.257731805196639e-17,6.208045119679271e-5,1.1943957597180379e-18,3.868568872630865e-5,1.8158727223131443e-7,7.395928960019375e-5,0.19295779637249272,4.124604864211172e-9,3.973451105307759e-11,4.0162908683691076e-5,9.429451072370088e-10,1.290456477731111e-10,0.004365599674652628,0.00016457717959091948,1.333490419922872e-6,9.389004620664128e-8,0.005081528494814288,2.314444819210625e-5,0.04182161466680434,0.0010125155857279627,1.4182209261267153e-15,0.006672129866402018,1.0517877802613801e-20,1.425972418148204e-9,5.826487073972955e-13,3.6743891931253807e-7,5.722167620318309e-6,0.01583389223003096,1.2314961113096657e-9,3.564828655890836e-8,5.047511876663916e-8,2.1967289697071972e-15,2.5086191967387285e-6,1.5863068679248363e-8,5.853630460009849e-6,5.3434036662403274e-5,1.0032296076543788e-8,6.173498240436737e-6,1.2844544545897071e-13,4.374654485415292e-8,2.7740724320853764e-23,5.761950150173665e-23,1.9341492717078523e-9,3.947945180669584e-6,4.402266127766292e-9,1.650628958606784e-8,1.776298045379958e-11,2.9678320487529584e-11,0.00017621034868975976,2.1302981202820543e-7,7.839463542418761e-29,3.90755131163937e-7,0.10527352101350126,9.302722978761769e-10,0.001627337809449277,2.766706477436058e-5,1.0201479813999805e-7,1.8479052582686347e-5,1.4244219786235215e-6,1.081026954614734e-9,8.673266822527234e-8,1.948833993692193e-11,1.2862886831090445e-6,1.407599891847952e-5,1.0624536074654179e-8,0.00021743857938546753,1.9708177307479757e-12,2.3622859579869992e-6,2.792112403280777e-7,7.280529632642688e-7,1.2656652502706028e-5,7.083670406514889e-15,0.014857917115239884,5.597115626615225e-5,0.3481529586476794,0.01379327220199465,2.8208368545727525e-6,5.0223639825469804e-5,3.5122869140670376e-10,1.5943267165150105e-7,3.8061505887152404e-14,9.363920828407569e-26,9.980582464952817e-9,0.08361517673953206,0.08634944789823658,5.966642824391548e-8,4.235728484029034e-6,0.34003592500181895,8.62297304028235e-21,2.4872252929595937e-9,1.1627109271747927e-10,0.00023079347449286375,1.2395795319172613e-5,1.8762218383164369e-10,1.3745635648827708e-13,3.72037366279272,0.003955819255928939,3.5592573350484743e-7,1.8054102962071562e-18,5.953286434566926e-7,3.310988452820406e-5,8.883277927901998e-10,1.8265643779299877e-7,1.7991891148732215e-11,9.919582021326777e-14,6.1253097737764635e-12,7.163372686381112e-9,0.0011414231067507245,8.63916728008679e-35,1.1711087664611005e-6,5.428416175865344e-10,0.20041452271744858,8.095193096725192e-11,0.004306505320896324,5.831327548770449e-16,0.005519884953341153,0.0003558385279164019,3.816167770267946e-6,0.0015243193606099823,0.0013877985031739873,4.131575852266279e-8,1.1321733168806148e-9,0.00018054150635017242,0.03369189359294751,2.872932176057977e-14,2.0362675133981138e-8,5.699253418073643e-41,1.958768461873812e-8,0.0003975669206100451,4.3238923871303677e-8,1.2929049207099703e-8,1.5444214758701276e-6,2.0038803596518732e-10,4.161588101680698e-9,2.908590308429307e-19,6.234255945074706e-5,3.9571075133884977e-7,9.149126038000067e-7,2.076614700150628e-18,4.562167679823334e-8,7.156787413176704e-7,5.391939012172712e-11,7.064737132609185e-11,0.00772083882569911,2.1639719087746463e-8,2.750970841841009e-7,7.034484889844793e-8,1.363359211946489,4.40924760062494e-7,5.5078083909656535e-15,2.5909957273924135e-6,1.1171709617998492e-9,2.3636695862207376e-5,8.967238372962921e-7,1.0243705707964872e-7,0.002944438082323222,2.905620499542587e-11,1.0478803169821973e-6,9.228542101439138e-11,6.942804523761429e-7,4.211411475547647e-24,0.010402022637892791,7.960454245493113e-13,0.0002018538839431253,3.442308642191617e-8,2.0749685496188855e-9,2.9694985061405096e-12,1.398053206675043,2.5407859024715143e-7,0.053663217816773724,6.842877304552494e-9,7.974375382437142e-8,1.8553009653786489e-31,0.15942197921532283,6.569244076282351e-14,5.013827412585966e-6,0.6030993906680043,2.0552177988187958e-11,0.00012966812464596493,9.524295648137837e-12,7.1012160406672956e-6,0.004672623525638988,9.49710000229634e-10,4.611668202786057e-5,9.479334387727812e-9,1.360900811819234e-13,0.0002551059168886719,3.6796332415939863e-13,1.5138890062612532e-5,0.0025999176447281834,0.01356426242999548,3.151526336296586e-12,4.5860559349563505e-5,5.785610661420479e-7,5.0300280450072416e-8,1.2073449449347755e-7,1.211935221223033,0.0002712408810390405,1.9629428284758714e-6,0.007064086231489877,8.387569022570642e-14,5.95188434808522e-8,9.990818894880542e-7,1.868245271282459e-12,3.0076978938895085e-8,0.00018168716225363195,6.055037939114859e-11,5.8679787187244376e-5,0.009010604966237705,7.5554995031273365e-6,5.162983330538414e-5,8.349231029980133e-8,6.26971081883742e-7,4.522360356212229e-8,3.269003573382289e-18,1.8629975241213012e-5,2.349551863777857e-12,1.1654292928773788e-12,2.3617016354391685e-7,2.2074639285980794e-6,1.1354472646378775e-8,0.003139542498021151,0.0014534449214528354,1.4861616327746835e-17,1.9790317846830085e-6,0.0009450656804448651,1.583046838272209,8.759325697763043e-13,0.0023893973191973453,7.383896517889027e-31,5.756295566755992e-8,3.7007279617819965e-12,1.7920240903909088e-12,2.386511986848969e-19,2.1890633152906103e-8,1.9223883528581103e-14,1.726046053126312e-7,4.345235630171603e-10,2.7777941503106905e-9,4.100846470729637e-11,7.904865198978958e-25,1.0977646363178729e-10,5.6043868917084835e-16,0.016995794504846656,5.348554907430978e-7,0.0003389423584310398,5.114473547392359e-11,1.1719108153495907e-7,3.1455576777908872e-12,5.444713923717383e-6,1.4417429975615688e-6,8.701481825582104e-5,1.0815851833851586e-22,5.747777289291067e-7,6.474818995799233e-13,8.989241530625236e-13,3.077528462109937e-12,1.0939359565277086e-7,8.660264477618406e-8,6.755997130449208e-10,3.2137960511090612e-6,0.10042832056068016,4.2127692281134846e-10,7.648215959712948e-13,8.221820473362386e-10,0.0017905259842054383,4.056863501243006e-6,1.2818135775671113,2.880573250633187e-8,3.3153185382631012e-9,4.8620360200701316e-5,4.464469881077323e-13,1.4093448394830396e-7,6.58415877089427e-8,0.001118667623298424,2.0591937104203712e-10,2.4479757213287628e-8,9.44385237596741e-9,4.0991035715245176e-7,2.907511035006793e-6,9.29665053531054e-6,1.3473732172064432e-19,3.756872205764564e-9,1.2373134747280987e-7,6.657229091834908e-9,2.832552303214504e-13,0.0006652578318702492,0.011888104474046297,2.337931541784613e-8,1.7401398175938712,1.0222833696172694e-9,1.888343083615577e-13,1.4577546044543672,4.333437051801058e-7,1.297625202596452e-9,1.6075456263362026e-6,6.447164630155452e-9,6.374803206235327e-5,2.9199270687666834e-10,1.7389583707997667e-9,1.2815370545054282e-7,1.8387501043974606e-7,5.114815103566584e-7,7.661480443591371e-6,4.618813309121326e-6,2.1784192185743177e-18,1.4331742936742895e-7,6.10545760590113e-10,1.384348316718963e-16,0.0002974603187567397,4.732425867301621e-13,1.5092372524139574e-8,0.10626884887568569,0.043332793624455135,7.204344210275417e-12,1.365819246341898e-9,0.00010485245154954636,1.815110406414573e-12,1.380726229121184e-18,2.0769826813550692e-11,0.0012871428598151542,2.1337897380462292e-14,1.1018746726325745e-11,3.918263525459342e-6,5.613767427216373e-7,0.0003523751401235022,8.112308367232285e-6,3.756870917749555e-15,2.8662888112362617e-8,3.255855951674349e-8,1.4592496303512564e-5,1.995917674043946e-10,1.251157654796162e-10,0.16000834024181163,8.88491893518239,2.615972305153965e-7,3.3652648935073137e-6,6.320836202999311e-10,2.481399823047823e-12,3.220216790401184e-7,1.22572646979663e-8,2.6842700774070703e-23,3.001673453280205e-9,4.077954056429986e-7,2.5729687410608186e-14,0.0002938077875557134,2.576283378664013e-9,1.0837309030460526e-8,3.0162481094662308e-5,0.0005652172847784873,8.633479961668952e-16,3.964424465967517e-9,1.8797747098320967e-7,1.8384733325133496e-5,1.0822758979907977e-26,6.987575046150397e-7,6.288201245885301e-5,8.841863655446934e-8,1.1014325628826613e-5,1.5399807829350644e-7,0.0006673661120981647,0.004984549146990262,1.1080157971621226e-8,4.9323356862421425e-12,0.009177322385178977,0.009391686059351952,2.6008879728106348e-9,2.9028319681043837,3.0072827007985256e-5,0.4009127391578311,5.092392112307516e-15,0.0008593623936365293,7.191766675110937e-10,2.322367915419509e-8,1.0364596780417305e-10,0.002541983003781049,5.032271729838514e-10,0.1798337528085777,7.52096272813029e-12,2.5038832926456913e-7,0.006505926353355344,0.00048342009035766344,1.4070747320141663,0.0016062303096601538,0.000552472800969781,1.3532707662337311e-8,0.00011103562152081564,0.0042685513384505104,3.498553393399492e-7,7.010547093628009e-5,1.6835555606468947e-6,6.58255501753381e-8,0.0001492898476516085,0.014080961658387712,1.4753919411309257e-13,3.5781942823850984e-9,0.26932475121030497,0.6024056385262979,7.54819831485582e-8,9.518966163622814e-15,2.0058143300722404e-8,9.157149857867671e-10,3.150330724901194e-20,0.014518677256320027,5.721937477830212e-7,7.847361665963432e-18,9.71389834308771e-6,1.1920157731640477e-5,1.5732614517978083e-5,0.00523843461370841,4.125572994744526e-12,1.2131417908918665e-5,3.08870941842046e-8,1.613007829309902e-8,0.00036697548987617285,4.275730311325133e-13,0.0013154473624391676,0.010606285068195576,4.591052526148695e-5,0.08433620918038028,0.004775125711894401,4.1160886676993815e-6,9.14305177244241e-6,3.970489677125473e-12,2.757471665457895e-6,0.00045063814391398105,2.2335389795090595e-6,3.328817456379151e-12,8.666137293801602e-10,0.0004971709008503368,1.2613857247429512e-17,0.02758178385709492,2.6450739856648776e-23,0.014804345917977408,3.713283258732065e-5,0.0005214581427403663,1.5939265955090684e-19,0.18499483954770757,2.682618970310742,2.7015598248717147e-11,3.0673076009737266e-13,8.809642232959637e-13,3.6398667295431035e-5,9.441487740073757e-17,7.582432391786445e-8,5.32713382849076e-13,5.24541188185994e-6,6.611721429437401e-12,4.6196780632751646e-5,1.826002435374967e-42,8.4630594627483e-5,0.0027860233736431675,1.7039511561478444e-5,9.645957092179413e-14,4.231588432461682e-9,8.977484184492155e-14,1.452572074542046e-9,0.00215568918654042,4.061700912730828e-30,8.038455605710528e-9,8.266260430566823e-13,1.7911215371697638e-8,9.602072195009368e-9,1.2219955236050086e-11,3.534702606238057e-10,0.013156224966187357,1.9975645250806254e-9,2.3850800011065962e-5,0.0004242854499399775,1.3567387505636098e-17,3.148929057195938e-8,5.403843547315776e-6,3.7521139265769214e-5,2.4009948422647185e-7,1.4579971966794965e-14,0.0069056927255609765,1.4873926906240819e-5,0.028637226491908797,4.3225443787584316e-7,1.0346337058314621e-16,0.004237596493963704,3.174824145099881e-8,3.5808230664406314e-10,1.3992446963188927e-11,2.337476147932973e-7,8.194564970513199e-8,4.6908193087874934e-8,0.0003421533238197201,3.203597845624523,4.551017793497611e-11,4.2164755570773494e-8,0.000635115185997212,2.4915939691592634e-6,1.2691960097337878,9.15890515244377e-13,9.76633702892133e-10,2.9049784696557114e-5,8.436939890374854e-18,0.0014935880666398962,6.5289308009782136e-12,8.134451142691514e-9,8.855729839448918e-8,4.780198990257727e-5,2.707827852318059e-5,0.0001661496716580137,1.5409914880657156e-9,1.748460020899045e-11,0.0499576407592801,0.07675175891246944,1.0931465340743217e-9,1.2577129948339274e-9,1.452435639493341e-6,2.0264610469639484e-6,6.791876075299803e-5,1.5378816796513293e-14,7.210016299884404e-7,0.03810247363852936,1.635680669881104e-5,4.1989166870239334e-5,3.188175270280605e-31,3.3842886758148986e-13,4.294544736933692e-22,3.279130986709495e-12,0.26148463548737083,0.001981540366966639,7.829325380958802e-27,0.9900021215401816,2.0559883651861212e-24,3.6222411775710133,1.535676358608431e-18,1.8542601595319262e-10,0.00823339459288408,4.677449881207244e-5,8.888774360708601e-5,1.0666663574137356e-9,0.9368229116047446],"alpha":[10.414940500031811,19.510438584383024,11.533491999373096,14.715792950791416,16.539774702319374,14.940654659696037,10.221571204578893,11.948394018757256,13.451615646680215,18.507331600150252,17.54891207930214,18.565284633984838,11.560038049981774,18.17129435257231,13.104732644872549,11.812948763876406,16.69694222890559,10.832789076255589,11.239095589479124,12.195545112225387,19.975073545059562,10.678079972158663,10.786304381864385,13.997357001966392,10.432406074764573,18.761246711135882,15.069000644795171,17.105900532502655,11.66764337650891,14.287791515573423,12.6256160361223,15.000696288295652,14.14666041112522,18.756445834107236,18.717660295124254,11.314558283691543,16.246874525043857,14.175155825971512,15.821224902711506,18.957618902749854,14.730851012366132,13.42225847064592,15.288296581362829,16.71753585663443,19.064640686114153,11.368063173980437,11.499522608000605,17.62409811980205,10.227596337868208,17.709132965721345,13.420936463333618,19.290424522337133,17.320917260447544,13.914914634061349,15.00690206094633,16.787688092527503,11.910681834404084,14.071197524634584,14.210522658864331,16.79698770579126,11.7255013930845,19.003398070504463,18.549155041883374,16.15882278348005,10.27989313710316,16.139222120632724,13.531098223193617,14.13013959584081,11.893716351206756,15.223725129553305,13.54895385604145,11.183711599990042,16.40763667575498,10.434650715308528,10.491600704998447,14.854586459236002,16.754881834462214,12.574779447325668,12.212962900947463,11.256827931368791,17.78984500547555,19.426141498249745,12.479582374939893,12.363255627859216,15.88559854119149,11.5291638267391,14.870403164753682,12.926708009151575,15.918330247370701,18.96152409140832,19.55386944344916,19.590331409453437,18.239185639257613,15.997734737912308,17.75169854974286,19.827363919139525,16.8379946594773,15.785893766351,15.854790578910372,19.271228256683344,10.441205869227101,10.795302663996825,18.16355049322072,18.473534303953365,11.947939734982892,13.010963945934622,10.156315491360708,19.084634275219372,12.03809445597074,10.001215912085534,15.48680930906624,13.759429867208992,17.5125793899077,16.465121713072932,18.73244568587904,17.14476315542486,10.240939148112737,17.199237427275897,17.097560089677664,13.334060498378221,10.038062673454608,12.297161806593408,13.629702190892665,15.499273504130333,11.392163338858161,11.879733184066092,13.412707828919427,12.440445921222452,14.336713894581688,15.850013947701518,15.681196670899176,17.30920426312642,12.984456110188171,11.382034558799601,14.52033989207731,19.90070706228878,16.07406786527659,14.9563259130199,14.35057952484317,14.413197280933955,10.130613706479606,10.206047987997486,10.004566079351292,19.384517763986086,10.705040143667324,16.180968510574044,19.70197725767804,13.942048121825136,18.24089549938701,14.823862584814973,17.52808238260705,19.990676605407813,18.90049722028467,17.49820205348276,11.68016876768066,12.494414706534334,18.936151944550502,10.458070937084546,14.695488616918158,15.320506960895345,10.78240858080878,18.44661221754157,13.746590873369025,11.241496069483395,19.679899055169287,11.360449106977132,18.119070094727064,15.172205730859199,12.086079904299842,11.081210336734799,10.504349890345825,12.333019661008235,11.773730756099916,10.384430457047738,14.26817912734733,15.974410218090975,11.59806887141288,10.078964943830826,19.515545574691124,16.550519074365265,10.983474738202334,16.246024414514512,14.482635865651988,13.929400189197697,11.325619782802143,14.06864575032131,12.240936161819732,14.911732248204796,16.49036941279107,19.232011049775082,12.74002847315356,11.213167699833857,12.27437957031132,13.229277548717208,16.066328058825626,18.841682346622868,17.60835511920093,14.972081100223873,17.85361470183757,17.549244575585696,11.232339771973601,13.20488939564145,11.58174685015016,11.77559799146319,12.119104251623039,16.082321837250234,19.521104808728364,13.188529491299395,12.73670974453889,11.834905049979934,13.692560043895178,14.582199305329821,18.56623792348198,10.35043065947656,17.299499894283542,16.153554827450115,18.283893640134107,17.035891217404153,16.578487005139333,15.875339290249322,15.029342938523369,13.634448253268381,11.748236524168966,17.393527768129573,14.816302480141859,19.372727940242942,16.93538045673938,17.34461748518116,14.775504285244178,10.70851824439753,16.720686871717803,13.068235837267043,18.005805656163158,15.206386269428654,19.81451313247699,18.30507012990868,10.731406784083635,19.37481076482519,12.380414148103323,15.41987635466038,10.40132403705513,16.054400623417365,19.22027370734386,14.051002159853905,10.365444148487498,16.580688863593693,14.996700352823238,12.973687571619985,17.481199614576212,16.70762112689003,17.2095970427884,16.964460540552466,10.93412689732273,17.606580978763766,17.979030718872664,19.70392628732211,19.467586214451195,13.301796857341618,10.948401551632605,13.330025014994808,19.819772824096248,16.191539623130943,15.956054549627062,11.01553955471854,16.694028771429135,14.276290306849113,10.858907055913354,16.99640327290486,14.13259941985245,16.43698480790268,11.29787173438389,18.04727794419284,10.395442387095368,17.79435730312958,18.362855146293917,12.76120366174111,15.33046906423078,12.91986410696892,19.49461003562032,19.927200361638533,10.050737398106355,10.388945754462284,12.40624204018664,11.386463977271266,14.390005468446683,11.43632748361275,12.536766932195443,14.461273709909737,11.874134967342894,15.087755805414671,12.717154014149948,18.489150748267086,14.835861228887177,15.006849584272224,19.832810593502074,11.116472460046271,14.409986063690795,10.216453370537952,18.706422485206716,11.576449063480743,15.186007920838323,14.33960231939756,19.90044525301774,13.999123588865618,12.04094946224622,12.737375828633521,14.650916540693757,10.957515291592108,12.236879531818188,14.895501416855808,11.523938571884262,15.193814481882221,16.812197152695898,15.060205868987282,13.035491673561541,14.694973510116986,13.768608693969044,18.59656567244507,19.515965720195336,11.932892024186524,17.175549077079502,15.062311921573077,17.57185372575858,16.217022703818436,16.70739189931823,15.45085199723886,11.156758484026994,16.532017426649638,10.387662563052062,19.095977554764602,11.947313057069637,16.412457834447483,15.72511225476756,17.542798310056114,12.37631654574042,15.973344679338977,14.789017561489715,17.13609714274172,17.481395840663065,12.723901621281676,17.723876546592955,10.50714913283617,17.05700455784814,11.294705319381881,16.35102381602502,19.942570152783986,12.003951911947103,12.553434958231106,11.582827262996599,14.818735692695771,16.109135801272387,13.52271797980115,14.04893850522125,16.12076048867545,12.519063755435294,15.114871644149027,16.68109250466001,12.711545947760637,17.446368379841076,14.010150959733561,13.99033223975201,16.519587564860377,11.316116550453348,11.38890257518418,14.345089663330466,12.045656376054781,15.323942244151683,12.564437646146896,14.80016424841214,17.973006339698088,14.356446661182556,13.175342963886072,17.626045285937796,10.586282737904899,17.194726214248373,14.682350346355069,14.649396762534995,14.049723561358373,11.293414075470663,18.441802578391204,15.648129218255546,13.110069684647632,14.170029641393398,12.088895504708239,18.037133175083476,12.793145141547166,17.26019316986888,19.73256413453428,17.33244563928575,18.744935750771184,15.908237600234518,19.880979004694538,15.045183829690805,13.901670202792735,17.358403584333455,10.666724940894154,15.850755359186145,12.356944273934772,19.55124770040861,11.461622334123291,15.958249278315924,13.544352374336821,16.878022828435483,19.15532006102292,14.457713492448757,14.550790849714017,11.427830552092033,19.527480302749503,17.06417392029406,12.730303937305198,10.60278254237707,12.273979237226103,15.544904938642897,15.792578262673697,18.14746362886538,11.840673331494223,15.633711201801965,16.61896600961093,17.13037119703528,16.583242323577664,13.260425271263154,18.09502399022918,10.173023931318035,18.78358158050264,10.247226026539678,18.40065797294436,13.258557295821129,15.555540039611381,11.344040693836215,13.475257602239596,14.510787396486426,15.335411836157952,18.783180041930457,16.793232993183747,13.237754938374007,11.551527048212296,13.236696388502011,19.11178610194085,11.854598625379358,15.986830806806111,13.725338934570779,15.220693682904379,17.500554845158074,13.088532002341308,11.732945508784587,16.747891397659284,15.326896363900499,18.745245195350762,18.143762424458828,15.817786480346697,19.84695557827004,15.664257722454359,15.275008049863402,10.836413350516187,17.04519076105428,11.52599369191787,17.180635891695964,18.012111786681047,14.686940519748049,14.11517644190594,13.783491944679099,17.541453457772054,15.746440910468891,12.630922599291413,18.65730447040088,13.584571633764284,17.85954638215359,14.890118967235022,19.540380471219674,11.383272808395795,12.422215155889218,16.092814269320222,15.848136995190753,12.131544147502497,13.175718731175461,16.24544709080339,11.66353476231998,15.334736175175891,13.338199988719113,14.863845924593868,11.134288800042441,12.670996749633808,12.91774599365013,14.611281959093088,10.898935850203715,18.819642518172294,15.712389652062143,15.610824366535567,19.412869234808678,15.41965247080909,10.930384352242129,14.428966740229823,15.856960830855325,11.31497227386151,15.132712585054819,15.958659398844864,14.795521913614353,12.832032316022879,12.862151329309889,14.80698892544795,14.963820241945696,12.316356140971044,13.216378720648446,10.800544284373903,18.165011313924595,17.077689260887418,17.861408524006226,13.20659550374841,19.849889453866865,12.285389632392068,16.891139632895722,16.10891257337192,17.546215130830227,15.78370861262149,17.588619049839835,13.331891165792818,11.252822031436532,14.025784229952002,13.737226671488504,13.081820785895955,14.283958305239661,11.987142086652725,19.302385618953075,11.575667902269682,16.064464676923585,16.320259468014612,10.60250775895919,10.087608857385998,17.189195147556607,12.612466851052682,17.794622233867422,11.090399937021097,11.967577710669449,13.388198020338287,13.146944383908288,17.073508365624186,17.228604271787948,19.190680544358294,16.47917069724697,16.360847316402946,14.361935293165402,16.155871714736477,13.73586610007642,16.49166365901986,12.74513026710351,12.575029342064084,16.710728852830933,16.637012135873146,11.63695978816381,18.409553518217425,10.750796169137322,10.120585212890937,19.38576375922366,14.319903356657019,18.148385061888312,10.484081090085713,10.908871696443285,17.781510973521865,10.233937063328009,17.254097312305767,16.6678938402458,13.64047839111771,15.772980708395348,19.11055032868083,19.794176493289747,19.779378434364965,15.021711762724578,14.163803257873253,18.102128351526645,10.796876912843814,18.52239208157383,11.368671868065297,15.09247264322502,12.910664085550446,17.283097362556656,14.932690806768068,11.075084479361008,16.2537005952764,16.567027486020947,13.036557609744717,13.203324247730649,10.116950922829721,17.177286658344684,10.446978718281452,12.16008006164543,17.560876459241612,13.881346940259968,11.462459077472998,19.36585798777861,14.599972819515425,18.836283949020064,18.64458040006059,12.641360169363518,17.24743232790097,19.271703975413512,19.053777480803895,10.827069680753663,18.351927737890485,16.836305767313796,10.28348018654686,11.112683636064526,11.412437961935586,14.71808120118242,16.66151858139567,19.135905649234214,18.82430088981782,19.38060352903134,13.281303517740799,11.470135899973922,16.392640100600204,10.969238317999416,10.83307097943136,15.009732245949273,19.99158536603594,14.998819011216934,11.60378575026174,14.519158789494327,13.395816523043571,17.066166091387473,10.114591517780722,12.621435815091624,15.46160332874744,15.607152828305269,14.547055669942496,15.062824829015415,13.408501992253864,18.836497254460383,15.220633615507822,17.871613080303376,16.948684409003967,12.107214774500337,12.572517441337332,12.368738699555779,17.57133920153026,16.245286746676754,19.015988580005704,19.829217742596164,12.495209628460202,12.590599439106612,17.375584035649545,15.163649268805788,14.966521187583666,12.580306281996872,15.052153555801372,14.950900010719137,11.977397312893697,10.629663430039935,11.164841382830396,10.516722371757616,18.882219363696926,12.322089194294573,17.668805616541057,14.236561672047266,12.450685612416262,13.577197545291309,11.145959109040858,13.552094558012538,13.49374444183784,14.233196856249341,18.476213648676953,11.493948551569634,16.497263324363345,18.171210347616253,13.51814172175748,10.7931128341027,17.590280531836658,11.224668014507753,12.960702938493773,11.307662310717738,18.26977624253389,15.875596547632034,15.986172272109549,10.218911555181187,19.651960219131325,18.33723341253593,13.37593688854572,14.750047068012588,14.050934086837323,15.183769983599735,10.001459965716572,13.589549254688569,11.332349292415753,13.288260354169337,10.164031628508745,14.078753292258078,13.631876935679259,12.749735711778634,15.987881825945662,12.893837719097325,16.97948834621141,16.77083884001162,15.323970174679998,10.145881066920179,19.67093903657494,16.6783665282265,17.99280795992893,15.919322320377038,18.270143548151005,10.247966115994222,19.989462878729327,19.86916903179857,10.184573106750658,10.432174680378152,12.812281983927779,18.08447371671111,15.941677866934434,18.344064884238225,15.545414575555306,13.137385306095835,11.977301678984077,11.738948557312677,17.761014123202358,12.63395966936769,12.798485833869846,13.561865782074207,16.477350101964976,14.260844416247096,11.33119189605852,18.64251490670781,10.012352206493258,17.28930007738614,13.241812783959585,10.060941987353651,11.870396618754908,17.683662865995927,11.85372583353571,16.115152693353828,18.73972627624245,19.916833242057663,10.012127661300859,10.404347050579029,13.790528103639623,15.29297635005143,14.430398283890941,15.835001578192662,15.953759545968847,18.109317362233845,14.639242749616537,11.252571350134799,17.815963801697716,17.623977405415246,12.60250806123918,17.67989180615669,15.335799351199814,17.97835650858363,18.770675230158556,19.32661669550002,13.460739603037572,13.71095516061623,11.294726734137639,13.922872523862413,11.847145740546136,11.795462637511216,18.69215748305054,17.396562143272646,17.09647043193781,15.474585299721744,17.525999490875144,13.627345469874157,19.70194944118761,19.782808585338945,19.296282148191676,15.283627129413746,14.555021920813155,12.351728138295355,17.004841289917437,10.804729731443032,16.07002231408931,19.83567163445811,16.450075097958962,11.049969988807934,18.345462675892943,10.31628499438214,14.004278289479524,17.885476753842156,14.964288235059213,15.747490869614637,15.339143572482714,13.6722346331644,17.513336301152442,15.985963933735633,12.720990067062075,14.30620799138177,11.17222029260333,13.076468267992299,17.520557784747744,15.270584538792068,10.312588048904436,12.038170908583538,19.021648031360588,19.463654484170164,15.910246104292504,11.771747472632686,12.20766885253699,10.97338533405117,18.064529170939124,17.410255087315853,17.420579904569067,15.75236286487354,12.28856741444356,11.295108540847206,18.292111767398076,18.9264453970953,11.421302462722567,11.138314751045497,13.19739942564479,18.987041086133537,16.77110749748511,18.681838283227208,18.71424719838699,18.379167826693827,15.952218987791916,11.128429432733922,11.455077663594661,15.436753928362847,14.05134512618005,12.549563950378776,10.17379891161762,13.61365179652191,12.358455842383764,13.352053793074036,17.48647265542352,11.636700389564181,12.850411012804052,12.42641453608834,11.976621655683093,15.375643256629385,18.60990592067889,11.804785191084688,11.669227379759231,11.360502339097282,13.042998810223555,19.16114739774553,19.939542603694473,19.776486590064778,19.672257929318555,19.654527931522022,12.820737502628772,13.840331314736646,16.90678616102237,17.278716966316573,13.850917988575905,13.232367522143305,13.4041496083412,13.423331723309474,10.405684822383511,18.061420807233382,11.779574639447185,19.78963271936827,13.24198795398247,10.20232241154368,10.342740919935459,11.441087552575626,16.330608651571403,19.8100144442985,16.902828980349867,13.838045215875034,16.258456937496742,18.122463370554218,15.17911026302303,17.596210238594935,18.24855068143764,10.68883406370093,19.78904484155454,16.752142083355608,10.226841904761908,18.06323028105212,19.652512470716758,12.737376581382199,15.454003037809143,17.346789550857732,15.165968884339122,17.69700255875803,11.24288537743524,15.500581209944993,12.694646411616052,13.79843227330422,10.779357774066048,19.060216178757365,18.91249174913849,19.645652741495258,17.30407055861164,12.963800024605252,11.420290000287551,10.583345648679634,10.502563401908176,17.027392289835404,18.831553664277322,17.793127700040912,17.012442713087413,18.92842158427601,14.089252882387512,13.68112859625576,11.985456984875906,16.84273196890047,17.59480922021796,17.570707447940045,12.524313238774667,17.31976980669136,12.85269548156231,12.58937222597269,18.304247698063488,17.328875974496754,12.73626163742602,17.211889472394862,19.82757023304901,10.814871158607236,14.310059045667707,13.659554619043883,18.624128130302104,10.471527156289142,13.660576969336676,13.820224321139438,18.82449572016068,15.597249126055779,11.611874294439515,19.516006748781855,17.229957242604595,17.934286413538175,15.795096857718098,17.910600459961827,11.038667152165262,16.67709044109874,16.419270736750946,18.14114002070216,16.962746989762955,14.488364488139428,18.381845625623313,19.410682677257725,13.431016062261715,11.400536431455603,12.04198557555716,19.624023143753035,11.654908787985846,13.296048873608717,16.273544784664143,13.417236117865453,16.179617101287896,13.382499844281066,17.63525133570409,10.040346043836681,12.324125967673623,11.490911924607413,16.11785966644335,10.614408811671636,17.795634520882405,17.736245597102986,18.041288510155724,15.563407129049555,13.403955909040576,10.393143517470207,12.251145149965492,15.742106615200044,18.463709487465323,12.593545675624295,13.76281656349805,18.8652781403561,18.540034824832798,14.957082312349598,18.517580406297803,17.138706604366334,19.59685544171569,11.165330271418128,19.19862124608379,19.60698757768637,12.632603629856316,16.768199171354134,14.319305391030642,12.336439853025427,16.346805196807907,19.03695834785566,14.259743718100657,16.64382985897825,17.731542171910117,19.218857759174497,11.589715395399372,10.782451579924903,19.70892549578671,18.04359335378976,11.681497162491475,11.765460827317394,12.78550931359549,16.247208050826004,16.24067866535181,12.308792631443083,17.68867180875612,13.757255969908098,14.95391558896122,11.72393453385007,18.458991925398962,15.21502823779484,13.554277251813962,11.95161868415888,16.131108190220083,12.6915912554176,13.14058086631687,15.319850247107233,11.151788869224452,12.554236242538881,17.074186952884318],"x":[6.320829410212843,27.650904838724244,8.518938564346865,24.38820808645015,20.162121716576983,19.38763230037114,18.612708254351084,19.551921230941534,23.767490667981196,13.745038486764415,12.374540832744142,19.30167529812329,14.260862126704664,25.95649510249253,12.016659376071626,4.768360164322676,8.244793983684966,16.796102142062228,1.8906154847612888,23.16516337998486,14.037936179338528,19.871397639065837,13.476948289248664,24.93605271503054,25.009794019414148,8.11505174018576,21.364514985363385,3.156629367049477,17.017149727255745,3.9113772928892354,1.2208841542774285,19.66825095548977,12.548895954951224,14.701982762604036,8.834074289262341,10.393729442882787,16.74465831712696,25.144036141992245,18.590179468387724,12.393450301273262,17.007483591780197,15.897474627723103,17.508439842922623,14.614918449522904,26.114417582185077,26.49978503599597,22.831683652813464,20.657546525790355,6.886673649099628,24.532324379833724,21.699467792268543,1.7551403671651133,15.017871934959118,5.775796856904066,8.326087289654536,14.784757179394997,3.8643674666511507,19.610383902982505,2.9738352370055554,20.790090695701235,8.45900970613732,13.299796901078201,13.046280744323049,8.792107111943029,17.742319788669015,19.05069617200632,13.249468055670288,20.789369951617605,25.38796617678504,3.6817914726843437,15.8133653240271,21.43914339218876,18.012023896856633,13.170090507311738,9.896791547356226,12.20387415666988,4.895964720343439,10.706496154681926,11.177333534648248,18.44683802516695,21.882918209730178,9.495142048385397,16.96828296243612,18.8363302299417,15.009896557279284,11.491430632702684,15.048326049567365,7.017553668532088,21.00667959588767,14.274254540004307,20.736540149888953,28.478757921798895,4.557623332697145,24.81094748289216,11.950186898649651,14.580121725382124,20.224048590272407,19.86140295896884,20.187589523352102,7.123310776553926,9.21916649412476,20.407850577758143,24.11476830939102,3.1766961979102337,11.390061889104373,18.658244739296926,9.418895738137065,24.625422265654237,4.152306835657256,20.844499843337516,9.01485318257902,3.831674215164105,19.71927782500868,20.31107743721666,12.183682335172303,20.035982723057636,24.311576014975127,23.14474896440155,18.963988484352814,22.653682994950444,15.638001160217387,19.503164313973507,25.799902205571648,22.81880914882814,10.468242761364458,26.381075167735403,27.92846556574326,16.24994558887672,22.088742511177344,22.925605415900012,19.636428184075395,10.433881888105102,28.528789456377737,19.140987300479335,25.058573917789996,17.953329115670503,23.488859307368884,12.243820436468368,16.646785737743862,10.933811493963688,24.358322297343104,21.007782218131652,21.021220361105506,12.932538211016958,21.684467113671282,19.93091572684495,13.589954888795642,25.049397062602,10.130738754236518,23.54209310218436,14.248289560856387,19.183795038541934,12.82367394870603,18.435947676803863,26.95041135672526,13.73683365325686,20.570443310123437,12.42663187624095,14.45468571048933,13.046409865632878,12.383035174964583,18.737557789413344,13.343074063142875,25.112149322241418,6.954829505351945,10.008632168237257,4.9411429362520165,14.664302877851256,4.493395449600646,24.36693267529299,14.0460633888655,11.350505187455923,9.616199316557534,15.522128945250262,26.978721480595034,20.40299265109157,5.847565908379719,20.196727543468196,2.5339697642527526,10.65112135987912,18.133922676357024,17.80990535949852,18.812895717684693,26.93031110909234,19.795488146190557,12.601695840894426,10.417390842778083,18.365870006462526,15.837908334652898,21.52548037294606,10.395290827883779,15.31847490047387,11.405007370176772,14.95058673564077,22.849016416366368,18.75731749546452,15.577510389409424,6.373033750850164,17.47578860579487,20.76318721544275,6.811961120135148,14.623473121689962,16.503114503989885,11.068376648822092,15.173792122039963,9.38130538897843,11.059132317804307,13.066251535521134,19.227181523356226,27.146927194873278,13.402102169112307,26.892713570670914,14.03450305392045,14.549121362979553,26.357902853412376,25.153735428040385,19.10464650657638,18.14025294750256,23.039470067344343,7.7360186344139175,17.102583901467654,18.153877219621307,11.882760307719899,13.572586245379581,22.446376342469094,12.375025920033679,14.928259736323435,24.41253992549796,23.644999780533098,17.494734772420582,20.874650339771694,20.235933307596245,16.24274385629026,5.26311962188875,9.110762300730087,18.337965779077713,23.522959019790434,7.171651161516753,21.226087664731903,13.187921814308721,6.0443579474795435,26.296232393494314,18.10993516952297,6.807410964619359,14.736388187803183,13.080641230854923,20.533098750118466,17.53910793733792,17.536765328364837,5.310163120603068,14.301667588440758,24.495351184602097,24.15824930959673,8.718425582902505,4.486423186617737,10.768059100383276,9.047084871072915,20.68322463122907,9.303229839822118,14.70736166784012,2.661442943147987,27.20591435106278,10.302983183497144,11.345363916999737,13.264286061916346,23.615713782215312,15.59690489058101,5.131418864748278,21.048597681274167,13.301282777002381,13.084097305419752,19.641336435529382,5.38962161416239,7.9969234660945325,10.36236958070579,26.767558699141297,13.34468558073831,18.85633314626485,9.096129095893577,18.82105317667127,9.871356762447885,16.084244745912862,5.872255971598863,20.54153578836138,23.730278770553795,21.03195821412676,23.790014145778507,24.102968611969743,5.364746787118017,8.44140914536591,7.738418424699569,21.545000826736512,20.16029635315948,12.427483309557434,10.18162249999264,20.056221750685143,17.55992847657785,21.22053577708891,15.792289041990811,14.190535054064062,10.549011874839493,15.748923152441861,21.549825890575356,11.349967810628286,15.953255319431204,3.3321497624744922,9.50851768371353,20.37317442298038,18.417631516624,14.984499987761485,7.73686975896728,20.849848137950474,20.560540591276506,11.794740252548493,21.0093597377318,20.916738901325914,23.765239884236887,8.685681395033953,11.796127310807595,19.03797766413185,28.102735240211494,14.17170063498517,21.902097727949734,25.515667936256836,23.09962105245284,17.68752636193904,15.28350475548247,17.298443385571428,23.983845616044867,10.247962168784673,22.311150744949256,16.838249946790462,8.192086305225745,12.48782919812995,10.159611903147788,6.2600894096997495,13.971657074857548,17.750158173076287,8.058009579185306,22.020528906835487,9.541092327719106,25.611682378326943,23.440596989227267,27.986929210758916,19.85383611285156,14.24869288157057,4.523573514447956,19.60297123783502,18.656265269794908,6.008129662063584,9.439202104417824,25.429768028494465,6.248048924608791,24.483775350660288,1.5807392601307146,7.323898094688898,17.77263301901056,14.421621499594458,13.367629828430264,15.37358784924752,17.05235842345899,1.9113379127272356,20.842139724606888,22.694816754168222,10.643646414844547,15.772535504084166,22.054276585552145,8.259762270288746,17.756163026335383,11.775197850313452,15.436021261795863,25.890347398296853,20.555397485088704,22.586575380324827,10.899181911005062,9.687550386794861,20.009532408788193,18.68326444678355,4.674915615963626,11.890582013442692,14.753323998172846,12.105603399162504,5.815036624099495,7.375480433025945,2.6876518427643714,10.777142995727868,10.359101644786719,14.042420388937341,7.883071338946765,17.605390640491635,22.89637695432299,7.934419867430389,24.466765908759573,13.954603211008333,6.579111805505065,8.252965823231545,25.085208774436282,12.142004430182254,7.765698945688635,24.64019217166428,10.04596026110251,9.380339400234963,14.259180743422803,7.604708271285998,20.085953642030596,20.43489043346953,18.077979401570058,23.800436676600565,6.660860154941086,17.436490677781038,18.912547119762948,12.108973886709162,12.823822212489645,15.216933746093531,3.4961400596041448,12.589401705853387,20.958779949682025,8.661568338656219,16.266920661732755,15.186219695556073,21.65993249128296,21.29262469026961,21.745522546257945,19.677752617162565,21.40911536467163,10.055074663584453,4.245664537632021,26.242183107665525,14.323577268135196,16.967471934413016,4.865224547048237,24.292995109247165,12.363513649527308,20.15607798083899,19.03097887280051,19.052463446449956,15.437897268964864,13.426905141286978,14.943717348274497,11.568956481847533,22.66662716901843,12.86734398077175,22.653693249951345,21.417454045946858,12.488441099811642,17.270061379999888,12.05347672235353,7.707044509172731,14.462484906246042,15.112036794607919,10.273618319976329,19.714103922067665,19.55894075039939,4.567799146213143,14.627975383519022,22.808906849671075,14.419296968234349,11.969735425703135,16.7019082972604,3.3965080492866284,20.310662606052738,14.347337576574603,19.542016686422393,20.76087460193242,17.06740266475075,18.829436470239287,16.059095160109646,17.42355747773785,19.69439695283311,17.485169670055715,7.559937223006643,6.269941911856063,15.85692073870098,12.870756515495884,18.83304715159931,14.063832673840986,5.987472037826214,15.246042235097462,16.794029289524993,20.7287228870994,10.360657817070415,15.29305314116411,12.625914643363645,5.917924811554491,12.403412660487385,7.624021835146773,18.993844472904847,27.334135653262894,24.086126971277658,20.433576113481852,13.051419872810392,4.414611467028657,15.376729033832547,13.816873479873216,24.763653549314434,13.083090417315486,20.263012309847845,17.16119770767917,20.71442242086001,15.298927257870602,23.440997074348605,15.215992066229447,15.435311606734878,21.956769005057982,17.15502785638119,18.807545845380826,17.06464732317239,15.464453082136815,20.259968042554704,8.177093435001801,12.204093033963469,21.93066356720435,14.545395869607637,24.072753298150253,10.715129835395224,9.458481413424451,6.161866940645604,13.823308016255599,14.970520862406639,14.83386887211435,27.341414422184037,12.255340390744877,7.242454579518065,21.585309402962903,25.384074250044335,8.090113531457462,18.326236153898403,26.76226431872268,10.977013591337354,8.497908572528562,24.668097495518552,14.773130213210257,24.864888920745216,5.85490042046281,18.00650358420817,21.07756263150283,7.95500436250104,12.945867775209205,3.4282765857509934,11.09530961333456,11.939849273530012,10.009072011105982,7.191573186535938,21.1277275682164,9.37671191986994,13.438623499266171,27.557248774826682,3.3365819022803733,6.791627432759291,22.10682409299431,21.08005103926304,5.942576683007317,8.491636069578512,10.3942628465399,26.473427746462125,13.291768110332153,19.66494573348329,18.01245017146172,18.855989800276355,1.5177018895144445,7.7382929539854635,25.43118998711308,16.70137873111978,19.33510419240382,16.418921978695998,28.06134005861802,13.544156238617504,19.17912108319631,20.77512025666414,14.08887023852158,25.79520535369196,16.674691804472964,15.890640639434821,24.736959138179145,3.189544000127864,10.769545167288715,14.20832612886626,12.37622355063122,21.00434351473806,13.146036626727467,10.922764613836161,12.016426648953926,5.604654956607254,10.357321274257751,22.53068831074291,11.677390294865278,13.599363936628402,4.507717328783678,18.671824014648422,27.308935576385604,16.89580069941238,22.206201169415884,11.414418433857488,10.345329266940098,19.549510428411214,17.382513154902036,14.039427207987279,23.095640692060506,13.983464038521586,21.903398050426702,11.83242677993779,8.038887163718563,14.172092709193272,19.262082400594643,5.8528815471677405,16.924919677994147,19.477743964279824,9.03669812519566,25.96787694819152,10.891706865023593,24.8168930640482,5.899198286335781,24.138241812193787,15.126833750089446,5.242770792312901,22.79319453605852,13.729045715036957,25.742830852747527,12.048026967096856,6.084621365389287,15.343091049195774,12.454376568955073,10.117361560972505,4.222781176779593,8.774732056465137,4.497826259629305,23.971278514062277,9.599469607332814,11.874111632110111,26.88223027580242,15.68633325730697,5.726333616063501,13.317861441318751,10.775176349463674,29.496903470904876,2.0702539051151847,13.961342060390658,8.273568170577882,8.870209607537172,11.183417978479703,9.406744387980542,13.589948892832254,13.407714192270678,14.731739990104982,17.99519666995126,13.81868767517289,7.375143023018276,11.17351829400275,22.393388322948383,15.115538308827292,18.078182972860102,23.307131115290584,14.486432427298265,14.538552984522465,13.443928877840282,21.182864677643444,17.234975621228116,27.075960901220604,14.280008144660245,15.657367650808848,7.880070184274725,13.418667843698213,18.220185154338296,14.103704527859094,2.306266740318561,22.341638130139618,22.376105083287698,22.277061099513055,10.359285135514329,5.310047142621892,20.25569590674167,2.1392712678327874,9.253629437147183,11.461543123022832,14.257351482957443,26.971875370356464,16.26422354985669,22.089677060645798,17.218991942389977,11.934724501507024,18.53503591580577,7.637955903477276,26.917492957421,19.411639046297672,11.03404488521131,14.264847409193603,16.267032111505237,14.27139179364998,10.758162179229661,7.212957331315242,7.833798610283586,20.846294479176176,16.272658139017523,4.325471801438359,13.331463806223788,20.667181683546076,19.802459624582763,12.790516061833584,17.358670514546237,20.01035581444067,16.22759579306848,8.786560364191878,11.339176012181085,21.098190725178853,19.122471201096932,16.217263775833693,13.580900495519128,2.5724069163348684,21.6593469313545,9.816021286668263,2.7748974280785133,16.46417733379569,14.737386269241433,11.39545282003709,21.500987525092864,17.17019883879373,17.062085815740758,21.848871495273837,22.16291642808204,19.28199938065072,23.333570978918964,27.20470723583492,10.116670808791678,3.520898730134534,14.018092686882762,2.057901796166699,27.39478237735118,20.26126213897104,27.415511283983086,5.141518788091086,21.444752100972735,9.343783572404856,20.85239312885222,10.228307163985193,2.593499084062707,16.434585264313917,13.312416122328393,29.389612660674167,12.41109528922643,20.776532884435085,21.2813570550112,6.605024505605,17.632706383677366,16.36600263335695,15.296275366230653,15.899381534568162,23.615722503077063,11.263019653511952,13.947170298473896,14.449699849171433,15.115548126815227,12.276190745301818,20.737752787405377,5.670339529875433,14.5731055975962,8.15658673953771,4.525629711959647,19.17713281910448,22.15299534463003,9.372444727455623,18.457717092808295,8.56503038644783,20.392353554648018,19.29207235520868,28.00377115221391,18.188574843713646,21.350402985100008,14.086482809788123,16.555928463278228,7.137520818402594,10.785634570230524,25.54724580289429,20.142002238971514,15.082988252392983,9.31198775611481,5.980420100711603,9.047783062294865,5.30135150077319,16.848526988538637,23.478830341588598,14.640614793209163,21.657314175815877,11.172167035094276,18.75667563591742,11.637224961528116,23.982047319247478,13.624121047972094,16.007940059837544,28.851560495491245,2.872539463626682,6.707586333547049,11.451798843002198,23.076826049214908,20.713973786051028,23.732903073991533,23.608117328757,15.264335227814819,8.034410335592293,1.4417765097102575,26.037281238804514,25.25746727610043,25.78807723081878,6.5865291833486905,2.118910192207919,17.046547850288086,8.053475323257551,19.16819888343869,13.439039143662557,9.103588168024777,10.75452504036445,4.591488518457751,7.7321706630975084,22.285010248092142,11.035667398735516,19.625977495977505,24.945268593288727,23.995278198999973,23.809192101211064,8.38044804694044,18.78424293732453,17.210792264887832,11.15169211208039,21.290226899615252,25.96746903596122,6.323124223616043,6.111727189726834,16.999339774544154,8.394166574953243,14.373434363991068,6.452315808274743,20.777810077315227,4.273588242475648,5.301056802646538,8.776933814354368,18.798190052100388,13.14581831624302,13.893652294747586,26.405531892519644,8.341631765579978,5.553551481351169,28.177397145129163,5.924317723690786,6.0370828712044045,0.42511271760355296,12.548868622764463,6.676875625841882,6.9188283685261505,0.5817839216828946,7.606039215642495,21.767962875808628,9.611189395892389,3.002869312714165,16.380079014413557,10.337519748154936,15.896942251413105,11.96214205680068,5.1028051540595065,9.78212540432426,19.244642528596064,26.722533586456564,8.268475510478384,7.437545063719651,12.604943214060668,21.947472567625887,19.303692119563898,19.560333677387515,17.93341547372201,7.208753542480069,28.253486198079926,8.819529213785477,18.439682722094222,20.666821971480317,12.098028198101503,13.921996187267283,3.245804148254392,17.60980040550168,9.719720600761086,25.081843313027253,8.115258182655264,24.538032822956737,1.0087201258584821,3.600619312136726,9.584289845981257,7.662441409848562,9.60173028029895,27.587779771731277,9.360272845786536,26.245670333001105,18.914988241833843,15.17170342854028,7.104227535392087,16.925552381815372,9.774259154289327,9.060092625842957,3.753528198411671,5.218547615769358,14.39441399356906,9.892539886010997,13.20306773016306,8.358363671225039,11.623744405591571,9.532612774155304,6.3667691337318395,12.460218629462336,17.78127507787127,20.521054557994443,23.49694147332675,17.61513861512791,28.003281496706133,18.117364889082932,26.125295506085926,17.372613764296947,14.88763809165601,19.29632986442832,11.488663021973437,9.742041561400407,13.17418826921131,23.67834652839563,25.562097127755422,18.423726044811918,14.25717432842588,11.288123461828572,15.86418129753822,26.006207445066753,18.73334681671549,16.11902600176135,28.04403520532638,22.716342267150893,27.13379972629513,10.31775305381367,13.675675838195156,18.07180124386955,14.17403972770969,18.767849608395366,27.919744156873783,13.517974976204904,11.08267728906618,22.812237552351533,18.258321050017663,7.907391635336896,23.138488096983938,5.22169729542947,25.00324333462094,3.6845604242827235,15.590450290855076,20.483509523909007,13.928611522606761,16.314189831311445,19.193103615177645,8.107770154153178,5.743388480289786,12.955340950641654,4.773575580333618,22.156312928067116,22.703610946954527,12.69852950698213,13.33504041094552,7.727818150962096,8.53293097956325,14.192416565756822,15.956901784116624,15.094753907339637,13.71449745574862,22.260578058851756,22.471991106139882,11.71595034363751,17.464900754589735,17.313504158061857,18.808641763896603,11.10739320831324,27.1347932751501,11.49790718753112,4.468277954813383,26.912885280050148,16.42195168252457,15.639009312039494,18.88133048993553,4.569768394068028,12.295027071114202,14.080360290715504,12.86034583373332,20.441445151008125,6.2112012563024415,15.690402055973289,19.38762883571196,18.912507121455782,19.451022289309552,8.734246335920432,13.628008896977486,2.549544239466046,6.024949453823605,9.171200849454195,1.2067935979499378,15.945188271706582,20.993637196173115,4.542329561517311,8.123294914516364,14.833515794364232,23.427272730228278,4.382093191826175],"beta":[3.4311975008053186,8.0437319033,0.7049651460576434,6.270419913126313,6.575675437765951,1.6142833164893267,5.506955433290306,8.968308998510032,5.513468458393791,3.427209347654059,9.164382447370045,0.9776033084571134,3.8856317729016987,9.25315612019995,9.704189627478199,2.980109134574729,3.660657040906705,2.977836431016383,1.817905625702323,6.288000375594165,5.015774829970372,4.978403850134039,7.508368439476774,7.419803153199693,9.342430627179983,0.6989474146155539,8.54921620387321,1.4410640197905455,6.359013082464749,2.3592601436172433,0.10641522583834329,6.372981363758341,1.6928140486708898,7.336774717829611,4.0309078093415085,7.937192458924411,0.20998387911390415,6.834803340406241,8.49823807482548,4.507023526504694,4.205923224342349,2.074572317299337,2.86911257518091,5.597975736040417,9.55417433010593,8.49088253749205,6.050480814536872,2.461546863681252,1.9775322171133602,9.988496688377458,8.759479888133052,0.7996603081385389,1.4351157351147004,3.3303115873944367,3.5361888369049033,9.014203866615762,3.2861063992310835,6.549248909673748,0.9436000193047156,3.690052726417967,2.2027358775553374,1.452512139211335,3.623387225970607,3.716541632644834,1.0707350265746785,8.133009207575011,1.3715635862868858,0.8367769158314986,7.006993580891172,2.9425024487195772,5.53460306043484,2.869132284127942,6.640958148163987,3.4540472894086593,7.455311961637568,7.119444585991655,3.6968660873829706,5.801794685778965,0.571269340221483,0.7660970948808865,4.069531303841081,7.916808790932426,9.51531160615625,5.3671346732191,2.62119111428212,4.758336982947979,2.539637005459585,0.6653928434466949,8.83217305727614,2.292198879117655,1.3912492404517263,9.149747677559256,3.5293212258896522,6.263736617864291,1.9246019432364991,7.122562632436436,4.684617411896202,7.815280025779609,9.380547038588405,4.333913806755123,4.146664826401006,3.556171581868668,5.473252868606422,2.0853442244321796,0.3964469761684275,0.5454575216145874,4.204008233100276,6.32731705355255,3.936119096649655,6.1266419888828345,5.0388378902888515,2.2951936187798605,8.895335510946126,5.61021357888947,9.93240215531305,4.581819041108746,6.780229599958223,6.36090938696972,1.707766065398817,3.728190104254643,7.314181301767475,0.972415835222451,6.3090192755617025,9.275858063575612,2.196390884737962,7.9378800227890505,9.980050704128658,5.935813622972792,7.097644530159208,5.829100457331617,0.8647073787845705,7.440213405584437,9.342408189452412,2.739084317676228,5.94693130976032,3.1613377314215763,5.288083227212086,8.415612089408523,8.874312758496341,9.177880461682108,4.835490638287729,8.583825590572582,7.143711568459546,8.517441589415412,5.836137682963112,6.482013273500977,8.857063618650711,7.132876954493046,8.019917124371592,8.521434111325457,2.340661400444428,1.4972438923330245,3.4259170930639016,9.872859601545919,7.05472679082658,2.8131610787344163,7.978464235527529,9.322866998291854,1.9476652509183845,5.994039089266419,3.401639946763928,4.8794267330946095,2.4576532150669195,7.9083075753815635,1.073957305292772,4.393215080419742,3.98053239258104,9.5666967890105,1.082712526540297,5.7243012650467096,4.475602894569393,6.78088059561158,1.9284361453623,7.300485659236711,8.546614187151619,8.294333760734416,3.9463378213858924,2.493719540801078,1.1759116010181003,9.037925525106496,5.6656006543905075,8.971521739059362,0.4687247911387238,7.800648462613555,7.255101519193323,2.864323084569076,0.4489476686118521,2.2530830044292594,0.47780937383941957,3.640807931110348,2.6739867867796896,7.336312420176432,7.338534465611605,1.933179666229281,3.7526517938733672,1.6311868275671437,3.9942544346916287,5.36217489347721,9.902320947805334,1.0616068259351108,4.730553844615679,7.123568079505911,9.316104312889394,5.579659481884505,4.188493411224967,7.866386346553105,0.9708133228901183,3.9799987310913765,8.318991173425971,9.887977542654786,1.9114836737624374,7.69629695482749,1.0212854441532682,7.063373878131105,7.006757671186909,6.055018693612759,4.157261234158726,8.676107015148972,3.1537107289697808,4.863130353129959,4.085592634639421,7.313611559524535,0.5523408065749003,7.2659475952524355,9.252517152928101,6.800391212849412,9.34165926417803,5.822714528464779,5.432987616041627,0.983437333259618,3.5992613859438194,4.60027265549201,2.629941172222754,0.1334196085470607,6.020325226786083,4.586692463788027,5.621334584001283,0.09514391383808496,8.76418990738808,5.111740737363817,2.631418018394578,7.933730302728019,8.36662388043007,5.9315070872785185,6.37385541203932,9.913979545491598,5.578718143562678,0.3470542051720349,5.080460909566762,2.814421730268404,6.741045578248412,7.778290666878089,7.5663176286717215,1.0596926969999432,0.3900603210186593,8.039624662754733,4.8541342178238285,7.546836127094085,6.197652795588963,5.6680432592538565,1.8966449478150316,9.013002452315712,8.88323876620246,3.073305795050021,9.334304526492634,8.20062529297495,5.8095354869778415,1.325185263194717,9.216326642329678,2.361245047095961,0.08406065083199188,5.33403787795309,2.4560803517489505,1.8136264285305237,6.576098201027736,8.40880139896954,1.9732390361001073,7.9156923169861715,3.936243120519145,4.25744328615886,9.373499938797,7.558012650638184,1.0820896739643282,0.6278207476734532,7.417953936076485,1.6663146004513218,6.716097095212072,6.628030460944466,4.98067203197926,2.1100998076223942,6.243497954217299,8.164354606795126,9.076455167599516,0.6237715669016053,9.344791152193775,6.458623944223419,7.297729649682676,5.525433209806485,2.091786621875402,5.468636600580028,4.020466983088422,3.5152306733910343,6.223005844724286,7.655351298855411,1.352753949123724,1.494615193859954,0.46717418313547476,0.9142100805519782,3.0068701302073975,6.432074515005652,2.7775114166474735,4.8126309787219785,8.183286315043084,4.293382052003134,4.257876921659937,6.690937871833135,4.644906797072547,7.8313626612711,8.006388095668076,2.3586068909754077,8.79883753570092,6.705003742675364,2.457969201148764,8.698029288629904,5.272930245394223,0.481689975585744,7.028024865215956,3.0413742720723858,5.852199674852385,5.917055000623959,5.992989129309009,2.6430228574131442,2.8451067114491457,4.896734747604392,7.488059960211839,0.4246409255079575,4.33581292894938,5.090016935006423,7.382101799418221,9.803779005967652,7.520029186448394,5.888223165313984,8.245932645083942,9.184299588739231,6.813265173477429,5.1626326221807695,3.1549273260440414,0.0004444760363941924,9.211122348135037,2.007708058615467,0.9339409577249547,6.766427395137158,2.5924518075301917,6.654131589314849,1.1830403878818974,7.2852779757800175,5.042688875144716,6.998193518635727,6.941744375704879,2.0433293685196396,0.719013029571598,1.5694783532670975,4.912429888532268,7.826333829055667,2.1222079306100983,5.557360985791872,3.5966018843937464,4.497919981579677,9.463223636313886,0.7623030522843677,2.326230158513054,9.711370039402713,1.3462031490135073,2.59579568362023,6.725757766982882,6.6452087545941785,2.9192500092809626,2.6815931718479225,3.053817386839901,1.7184604169279938,1.6638490644360138,0.32234775521307046,3.365547836428535,1.6496179357001162,0.9519900451166952,4.494556393370042,7.7205665938882895,6.006663047124707,2.08599498961058,6.337349855915493,5.4057252978818715,0.07808070008984647,4.570361501789466,8.960029000867431,4.014473125455353,6.138703449092084,8.87547125379443,0.0794961591338117,7.696415730707027,5.587271955101809,8.966150304871261,0.7224985654600058,1.879555122709149,4.682287363397146,8.335426056615516,4.596814438989975,4.16273645811361,9.556857558540884,2.7402625879484432,8.745241251863545,9.297136245713872,6.329878408013505,5.771830695560545,3.315106856729304,1.674399849340087,9.43381541964866,8.700139008526332,7.723224575501673,9.364119094419154,7.188918940808686,9.584834934434456,9.912457385157508,6.094841488252792,3.813167752784865,3.4852361933162856,5.795290768799688,0.7962905137945553,8.822957362317014,9.247608648692118,0.06253749884121751,0.7295825646130205,5.5126483334439325,0.33729405981379523,5.7544703364989225,0.09877570371071176,2.166916048365388,2.1965086660910993,0.4593458320656185,1.1967529297874169,9.465941416199046,3.763653547122099,6.914391410842178,2.847365190083999,8.677243551107171,9.796889548365389,1.474615471581302,8.012527818169925,4.416431329589909,0.6489429087179754,3.985475072726523,5.1077552974301526,5.15287419387456,6.880012216124289,2.7147743192737073,5.635839965076825,6.982512709005504,6.58468705901816,3.8522208105014633,9.122249553300229,3.2428636460516924,1.5017389218746935,9.488089694204142,5.949029539049335,2.0110151308879187,2.2524013938898713,9.453271218901198,1.5834065323959234,8.899909084880722,8.903148592606854,7.8730579758862484,6.362601493871147,1.7815963153280467,3.4990728187808373,5.6149512571789035,3.9965445588676562,3.431692659102643,3.5487781387731276,8.634891979376771,6.197142835718157,7.136852470126218,6.405421268605638,6.684994014379404,9.857647148899904,3.470197951583689,0.5449233112350882,5.568295921027609,1.028892533257717,7.684903097188627,5.706389754220544,7.960883802423506,4.396262450049619,3.051183405870872,4.208725966176239,3.0891407774819624,8.428576628953886,1.5588031801347446,8.657722274194734,4.330746529743461,8.42449412318931,7.890325107315997,7.054623188524136,5.844988435224878,1.6527738284477844,4.883566714727823,0.9800479807573925,0.9430511169154121,5.535383639322515,6.1004699516620775,7.693258336718429,1.8396907379806438,2.7649790659089235,4.964154282363957,8.792969846575588,9.342296000163042,0.2629126294964479,3.047760189251978,4.781742267660749,3.1350781171225295,9.439841951548104,6.714317080609648,9.270597625041043,4.946073808099776,3.4272624891784087,3.827948566066499,9.491557728671031,1.7101207184421185,5.369054670139737,9.740689140324026,3.6751505666089246,4.220025838510971,5.524641769793495,4.713624262578692,7.489818751174353,1.915307016869685,7.8214304286651615,3.1653754899134734,5.957383643940684,7.614738211318494,2.9234265614020116,8.339190621897023,4.84174376967964,5.265289740290782,1.4062521460367439,8.302393901280183,0.8103620915398801,0.1381376270117407,9.42868328535175,2.6096520237803023,5.253715379069579,9.045326119519348,7.100499554627733,5.068014872475127,0.7507491696026114,2.5480900095801373,7.663719953923032,6.116832640272037,7.368170878295858,5.11534656521782,1.1081552051321308,1.4225590423546408,5.302703035759022,8.962773595443343,1.2571926670971534,9.138248412579737,9.658539364660685,9.957917770020615,4.788322714340254,3.415898338051282,4.004114442985274,1.3214530362711119,9.540544376804998,9.502983236767172,0.08823409447124675,9.032347789608048,0.8417318203602631,9.46115527460716,1.7827816396883756,8.704557493655978,2.564358977508423,8.828010307095882,5.900550355919476,3.5611302354262087,3.599489215189966,5.512498251947795,5.85567737979483,3.5303870859441866,7.297996004038579,3.091258392192038,3.724887943015409,8.474978227191809,0.12267261088706904,8.65222269167254,6.094543780053494,3.757548801194297,7.623092309950142,8.570949989822589,1.8282750894498379,8.17151566218661,1.0961061907912617,9.194205833769116,3.1577079854975176,2.30533954334438,0.8889868750274132,7.045274317007459,2.626306342493405,4.792852480798091,5.83290019680847,6.086568619740078,5.986040899017069,4.227209159631446,5.956571756046484,5.739219858902816,9.397620955063292,2.8869507758405577,2.0732922142707633,4.088944679870687,6.566359606178165,9.558693386277948,4.597265437223161,3.2522193291708557,2.279298967186021,5.040833952307768,2.2389231808711085,1.4632680289176125,0.23756503920407734,2.9494521472289636,5.532595375524982,5.325187089404428,4.43677754228762,8.491307764470914,1.789404065183009,5.52440291401598,3.9249020674512813,8.87242715604283,9.61899968824299,0.7800028891552557,0.3867491033940773,6.911028758197288,0.7741807354844532,5.401882738453865,8.816201553921193,2.6082435848565977,6.615542334887254,2.7254269088710426,8.24457820972485,8.934745348669576,1.0093471334204507,4.569255685801139,4.153647197311416,3.1111086541239685,9.52909931535698,4.683377956355419,6.6517194717114485,9.126545354763104,9.787149933311616,2.0850070006014776,8.394118625719003,9.834123634377976,4.385847204994191,6.552259353668268,7.754073288098812,8.05519082752583,8.841863283694394,9.807993559553891,0.12281853099133766,8.795500706871293,6.948709855802562,2.891175490067488,2.2221506116467826,3.0972687555415934,4.67294390189865,1.025481888937716,5.7803205887104125,6.119351709053705,8.208929716615192,8.404207741143457,6.217078607077897,6.846332966757807,1.2246401012537622,4.088617175298874,2.643502697067852,0.6528430634607219,9.003495230296341,5.744150084029592,2.9573594097379097,9.377553798996335,9.932201180167992,1.2555619661305184,3.8308220531152593,4.55078971407654,7.694066595071158,3.474640737802588,9.403267744068117,0.11770784588044592,4.841263288833457,4.822553333176698,3.6710231709401375,1.1998882236398578,3.2689655575684573,4.12200060500793,7.335927046944326,1.0430151104697383,1.729292419529549,3.3918448513035226,0.8915239342989567,3.8521132919480716,1.9696955459964394,1.762969920455446,7.495063742180921,4.954681274216439,0.3259990526089984,6.674879657521302,1.8335251399335517,4.3801694224363015,8.251153499235386,9.759721004495997,0.4979623103868125,6.514152780286253,4.9641015031199025,1.2895464684971492,5.124817907612047,8.56198511635295,2.0105140690920353,0.536602686791996,6.766426747289662,1.4624075480860643,7.41633927346403,4.591041951248382,9.74575989137067,2.557489148269938,6.970827094678862,9.24873913328229,6.837394569094468,2.5812702873065363,1.235615542335362,2.7697491470198465,5.477272931423793,9.961035755643364,6.844070480185335,5.99285506610766,7.957567783644834,1.4482523336942132,7.673223805277987,7.157595973225542,7.958093600836433,1.5567554097559455,8.745182163094476,3.4099123136463882,3.5372369181112906,1.1438935504594294,8.99086097547292,8.470144928173443,4.904315622776756,5.479804607535595,4.388717593555487,1.4075600131229393,4.283041955146032,8.35496305327826,5.114273160745142,4.58565872748763,7.089706115055476,4.9776164914761445,4.941012020022358,4.919848825632281,8.279357652790463,7.3354306733945585,5.950062109812078,6.712819886005887,8.831059235179419,0.5725842249445234,2.585550004166033,8.183111864924076,0.6237567771157093,8.491171695173827,1.83692734294286,1.6883125715673941,7.575892753903588,4.031216882515323,2.6195791300955573,7.443589453661881,8.208027150161286,2.696495908001404,0.6197685394723296,2.173323178953528,6.933308351582923,4.0494230675571625,2.591097553382864,4.995187383663293,9.38554012454015,1.7122842332389898,3.4772737715962254,1.39071708867053,5.588115875126805,5.269183858338639,9.22973787153018,6.95888674994722,4.0889507803570275,6.917916982791377,1.4229760014061221,8.062734986229437,8.887671980839244,8.254035555020954,1.5179471549320667,0.4938953641801125,3.4508320623139377,0.15116644303742488,6.822327155776349,5.516282755994424,1.6408904817420522,6.7609215760527,1.45162971221108,2.340327155681252,9.308889765319442,5.7261254399089845,2.1073928948090237,6.558297196902394,7.3554657052289185,8.862892007094075,0.10010697058502993,6.171810633638312,8.499424421049365,4.293408241132452,8.40728880751158,8.092201107632597,3.3247906387219595,3.7113325806088637,5.198300354596876,1.9852767707615993,9.822507807282953,4.110902664893297,3.8459375489961856,4.257200719933003,2.879046289097662,8.045675134461687,3.5503487789697186,8.995875444822802,4.676898293644662,7.091245733985225,1.5274276203974768,3.651698751400525,8.395769864607805,4.922805727305912,0.8211568075560338,0.10573154636502657,8.58070277223903,3.0719493875027104,6.686087144474675,0.26100814624493873,4.960870973293696,5.753104225929482,3.914036153402578,1.5721256960628316,4.609417736713439,5.595924424911301,8.035852337596697,4.406054371746331,2.5119864002613124,7.294424103447614,3.782058165258424,7.702205202414012,7.352038739287146,6.886637833003178,2.7600884930557723,4.316307738205969,6.7578689690823595,2.7235717206626364,1.4923045490023101,5.5229176239998745,9.730740309033843,0.6650157584607452,9.513023712442033,9.988038186383587,6.338220960472198,8.893890806827866,0.5408271687937094,7.4078805395179685,2.706103468883372,5.134374272119806,5.124004657265586,5.518331725358669,0.6187119298519494,2.528571872914489,4.333219666302426,5.958674122273204,5.741784593798669,9.286902153916207,4.571909989773131,6.626515162690946,9.243723902658061,9.581232191547455,3.392236988637811,2.6275653703072033,2.0750302264124465,4.6921111697146545,0.34070649683064724,3.9712117157888005,0.7384327590700801,6.9349496549537815,7.212377536142731,4.489168893227296,0.37107875005405466,8.388723092286927,6.361448145890487,1.8407355328603603,3.340200482986706,5.069425874698162,9.811282231391893,1.3562933354488327,8.887355202650351,3.9668033540835657,8.927563224344585,2.686067243750969,7.268836428090683,0.11716608898753478,6.175250335835367,5.781606428630504,7.355950440806172,4.236002060220397,8.897740016422738,2.777180353663682,4.5191693902648815,6.485579489908114,0.2733638193721166,8.594749856209425,4.048985869222504,5.614786432939585,8.208291060469477,5.8568052838447855,8.996524284698799,7.328567977545437,2.3977411804087456,7.722841829798847,9.38525210206167,0.6981079407610524,8.05244630670439,6.3429053304046406,5.112150362205856,9.083573715585176,1.728371904987973,5.698405957374564,8.31056171986086,3.650422927360635,7.47356951429998,0.34265002205511985,9.661303556765608,7.824962066406274,4.030952408496116,4.059918192186489,7.293149201317921,2.311679189522189,1.06962649563497,6.784779751712193,4.764799226859919,6.161208472905253,6.177278037090376,7.394527245171181,6.606621100360799,7.466926489309651,1.2881164384687427,4.56287310167633,8.638214686261081,2.003496666437108,7.799995864217948,5.865185342706283,8.751272132627925,3.2202405824182967,9.67290479017777,8.417387685023463,9.612498870321156,3.135220399625751,7.5255019331209105,9.17906821475788,3.538668609950435,8.605802615188232,5.607408757885597,5.031804402642082,5.896395787658872,2.6074062838261947,2.065178073866769,4.263472359945972,9.815804747553273,8.955656131643735,3.148334339561123,0.20745794701837683,1.9517062010571573,1.1760849485441138,2.91808937277936,7.702863770341888,8.118083144826908,0.08822701165129843,5.665318872163949,0.15934738304552498,1.109390077887702,1.253170790790088,3.7369387584122093,2.9076771627459563,4.065447140257643,6.59295482404803,4.749476282528715,4.03114109226369]}

},{}],120:[function(require,module,exports){
module.exports={"expected":[0.004953628870670972,0.10681766244650022,0.000746498131294317,3.559248354698848e-5,0.009415624358220909,0.03295797844113342,0.00017455692006606056,0.0009814259377858084,0.014695308851151176,0.0001824358044157444,0.006896827082412915,0.009744426509587482,0.054862243611472704,0.05900061894954336,0.01629718104645273,0.012133312226934166,0.12829998949036878,0.0011460853901941567,0.004613105646216402,0.004599912799126751,0.012884901841338768,0.0022583685503902184,0.12607386671457002,0.0018627952340211744,0.02443348008148243,0.0002472866824948897,0.04051480232158587,0.12404428675223297,0.00242004557431778,0.007629573002819479,0.000722035319040793,0.002326137199809886,0.07103006824444931,0.011291454484388813,0.2306823191335227,0.05990604017332927,0.05168289882449653,0.06176833322540485,0.010637361444242077,0.0019155276121627606,0.001250071868480737,0.09080678603647903,0.020376296408207,0.047737581408976215,0.0041719602161321085,0.027762737116110513,0.007372735973570345,0.02368032087494427,0.0037636472542222975,0.42103020921697304,0.018435941840144996,0.023954534694886318,0.09590000438385848,0.015318019598321212,0.022145573016072253,0.0006472479347767141,0.08810534054755857,0.005430454222228167,0.08281163214402956,0.013421127010088647,0.011664012168401813,0.010821552341345794,0.07518041098113287,0.001674695123671654,0.08355123484272034,0.015186220237465213,0.044542743152748074,0.021645529991733876,0.0013437671396569519,0.048931135954878725,0.003803256479504706,0.004885289466022438,0.000347855659429478,0.0064490922907550485,0.037450273794169237,0.0014471361841172955,0.09148273377954859,0.1295852464727957,0.461618519241823,0.022902077833222047,0.005748945784558836,0.001070068934730252,0.002835045076493326,0.017552515734859834,0.012138826725800607,0.015961993162916865,0.0008454803152874298,0.0001853938956691687,0.04651756721021854,0.027103542387637562,0.0028694291492107017,0.06898045896282601,0.03319851023351836,0.06808590959737314,0.016833042471688153,0.04025158384212953,0.06854684359517606,0.005878688728336314,0.045621555960932696,0.11309546940664539,0.026738518999090348,0.00029626618613602294,0.015154029767035459,0.018199523865801995,0.0018004115037531401,0.0008485000233701527,0.00041028170769025283,0.013703606495146042,0.019015234048234752,0.013065999384110454,0.24987823463828046,0.039793831252606694,0.0004761459975545165,0.013441769542081143,0.23337135069135406,0.003235895489616542,0.006694559245319544,0.0009739746896838321,0.036513511143485444,0.03191954543067271,0.01336723073536219,0.06810083218863605,0.0042731918021208576,0.013811883517804279,0.008370967893126142,0.009767609813957806,0.022483376510671036,0.019273961425115223,0.0003054693136266241,0.022221335718524856,0.14306848622534918,0.025009448186796877,0.0009611725220583201,0.023765137080017283,0.03465649544021385,0.011487283371747337,0.0169380398078191,0.11947445567584247,0.014642767086122029,0.004701284851328437,0.01249717623456344,0.03644188556557687,0.0008519203860662029,0.153440395016423,0.0038453897347839293,0.0007345697698301959,0.00809744054471408,0.0213710498482654,0.06049149668618126,0.040503331155106105,0.03048397799305303,0.05486291304287677,0.024616432898373716,0.017176989872323578,0.2709070962445334,0.00011082533534842947,0.04322275273082315,0.006486166885458556,0.006926259946846195,0.02200224592686986,0.006223606525420106,0.020462964400705934,0.010523235908299282,0.015023367674299246,0.005244786896623014,0.02376804667039809,0.0018732984595250678,0.004339344170267554,0.07977993370253167,0.0006311712015057036,0.02067494092057005,0.020468654818578583,0.0027651530784325237,0.011343439266476685,0.004115319320957443,0.00012494458236164907,0.0006213546957384357,0.05799801154530236,0.08683406131051437,0.012730232195025866,0.031826776789725446,0.0009321182744606882,0.002616840085189075,0.012527404039741985,0.039761923327617056,0.30234188389042516,0.024904835018778444,0.010888117632028948,0.0312914523050702,0.12624272322724905,0.013404453966745816,0.0020400317137977022,0.07493589857151778,0.015493874136476337,0.023202838887996374,0.07169193339451319,0.008945253423989706,0.0319791533983312,0.06067400099850863,0.002915486701986822,0.000542915688963216,0.11863979019274362,0.08600346038372055,0.036657076604888046,0.07412174284912787,0.004109708728522713,0.02430862230008232,0.04410638444998817,0.00040365626612555124,0.005421836179377284,0.03765833019760923,0.11057689562302937,0.14118714022367998,0.0013423611696469543,0.0003265935796776199,0.026821196391053598,0.140440562464386,0.007389904877871839,0.02246612116688823,0.00289776774740108,0.05601774436929542,0.003161022366457907,0.0032935335445472896,0.026590040056828208,0.0014510328698623559,0.03574796102262615,0.024741543440765734,0.06025445569861473,0.020660966920411045,0.11659449284382985,0.00025288806700673105,0.010805622692475769,0.0013085515305825467,0.3044382169461021,0.003304711074480329,0.30323554981390355,0.0007299377346211471,0.0002453318969285517,0.025572625489812106,0.001207463826868643,0.019054344950409027,0.07314109863142823,0.06080902818901831,0.025671142467227546,0.011341286705498076,0.03304144604818564,0.013646259482387856,0.023831222870477498,0.2821618674462231,0.011649361204895825,0.013180368854234807,0.0013257800813545422,0.17023754988580475,0.006855776143608683,0.009351173790106762,0.32744304258234835,0.014436469063991224,0.10282253739180294,0.03622644925707735,0.0009897546153532217,0.015280788656973772,0.006299223320760833,0.01942369116653733,0.0006376551161912911,0.00027689832910740596,0.031911158893391835,0.0023712111091884424,0.00972545252015224,0.014340968955820379,0.02931848308762118,0.010774374308814652,0.004842272564910983,0.00850717587934628,0.05840220010114648,0.045978492857577005,0.3153651109500005,0.03282850144091716,0.0134618800732338,0.14417062550268314,0.0007765396904586634,0.0019321747149849253,0.0003455039914216748,0.06572252703769899,0.16868124152112215,0.04476853992275499,0.009683074916027379,0.05564162045081548,0.017986453882698164,0.04722907033685575,0.25108550227304766,0.12342207226771465,0.0025360167181541957,0.003429827237541058,0.0010347550000673802,0.05797514154038207,0.029849834963882393,0.00015523089508688264,0.00010371936686577252,0.023976677490464875,0.002235869957120149,0.08143951156720501,0.0005540819091053211,0.013468907648428338,0.04763970374915128,0.07439826592408805,0.019305099628212148,0.007261995644067646,0.018910923873822646,0.002372511738043453,0.0002429825446407253,0.0019198983472082012,0.012574854724737865,0.03623549692809507,0.024505935679369845,0.003708586265431469,0.04141893898242019,0.012026091955744915,0.0062982090414126606,0.34311027203121297,0.00183330610780552,0.028713986235772482,0.0010992181952811841,0.2672573150906908,0.007281711799075211,0.05672788067020026,0.00042031438231444245,0.002385306791861643,0.04917331195570935,0.015941960854490553,0.01546587877146477,0.007747596773708549,0.00621550743502567,0.024839364157406483,0.010545850756683024,0.0017850349056947922,0.02413174622183464,0.04321931217184241,0.03559243787878573,0.002671289140853073,0.0021228118302538722,0.1916082319619861,0.022744316233719048,0.000906164986075903,0.19185060772984303,0.011692920003776315,0.017464450812443726,0.0005756698942230905,3.662473378701793e-5,0.12884749696667275,0.004045850227447528,0.016403043455065092,0.0005015507739222788,0.0624840031549248,0.007377465680025519,0.0014890972467122982,0.0009372794222322119,0.01902757230458503,0.2891928724380495,0.004411633496057976,0.004558690362193301,0.005183576727960607,0.009055176068081495,0.02430982518997714,0.04412385507034817,0.007483134254071368,0.012723099524119933,0.019118951041446605,0.00491056042307818,0.0034333768386183338,0.019055345533078888,0.01651910952447646,0.006419068127047539,0.004475729316609197,0.14588520247630632,0.19583090549067653,0.02002540131173149,0.08784770929266156,0.029225688143885986,0.01404081838120738,0.005776766197142531,0.00023434103559382931,0.13884305149601148,0.169849306398,0.0018631450893033144,0.04706886056665355,0.006034359283633819,0.04052952187873515,0.009874105873647657,0.07315074617194334,0.046926958389238556,0.0019701662439742186,0.011629635274416959,0.0051332104788370915,0.010017551401256502,0.00045572401718532805,0.0008473177425824232,0.02336498763866797,0.19661646842020825,0.029122398404098304,0.02974494671901879,0.018589335599137162,0.06796514619958743,0.01754401796737148,0.0013382135987649135,0.0939240115045036,0.007567068936094464,0.020427228710916946,0.0003910141968087473,0.07919384404647549,0.013733809257283187,0.035893543049699536,0.5247730352256325,0.0021979612511942945,0.028212949233232556,0.01305347560785551,0.0004941292525002066,0.0020483279406987745,0.0019201396915813282,0.001831130199201069,0.000887494157614447,0.022093681715155952,0.004477583800484813,0.12579535585270132,0.012189636780277676,0.02318753926009252,0.00837460730115842,0.004797017061928255,0.015455315245877952,0.004060507694475438,0.005777626593095421,0.0743046310541607,0.001955152938049051,0.004976731923879781,0.06750387394256405,0.0030948444129599807,0.014131257263959801,0.07511438347119131,0.013881289609547426,0.0009350518699016564,0.0790887571260511,0.0022347452139792378,0.009321062548568005,0.06942086475888527,0.00922219556606426,0.08860524632111506,0.001178761741055031,0.0061293401068842615,0.012841685943758896,0.0011430894116391183,0.025499910351901137,0.018535090025701157,0.009112959967657874,0.3839174648603476,0.06602459941944229,0.05703345706404796,0.043480853769620964,0.005007357941166221,0.013136307531466105,0.01527909547258896,0.08263751900708556,0.0018046867285606864,0.029938117541542967,0.11525702131826218,0.07045575754132304,0.007790774545388892,0.01397100885140079,0.0019217814859003731,0.11985032037515299,0.03537060773088573,0.1144297911637353,0.00392804545142647,0.005379472982770771,0.011638990369654484,0.19593131033757497,0.020516455608087066,0.00017703692399791647,0.005895313655613608,0.0226817094777849,0.005754918648349697,0.007405248185795249,0.05595854769748084,0.08047110548802497,0.005722409359427831,0.00887310379616186,0.0009899110292036024,0.02451469801169061,0.225940031771468,0.004111235600856875,0.017967726365587414,0.03731842712441295,0.017555703500915756,0.028908710146337013,0.014783078859249395,0.06524755146985377,0.012098560175619217,0.005258619428772816,0.014123952796712184,0.0065517699415977215,0.04413906192901122,0.016060030848316486,0.004115535229632893,0.003619357482209876,0.006298549441521786,0.00852398191436782,0.01275669368641807,0.05059777839538822,0.010310780855727798,0.0030301541803227252,0.10960979448219647,0.013282079163807602,0.0778976480174569,0.012150844266581584,0.001160598834038311,0.023232564531637526,0.000365899253781197,0.0010236124594678903,0.02712506171649549,0.0036424555614218484,0.013072413706073621,0.047971205597591,0.03497171094007653,0.0321069576623588,0.01865930632548461,0.2185864027465064,0.004240304444251745,0.012674179666784784,0.002347314829237885,0.016605310354853353,0.0013749798220767852,0.0026505972468932977,0.012070157136531626,0.0029062666742307535,0.046856796451911764,0.0008578009960565545,0.0020452846349798214,0.013841089514566245,0.11300753597495702,0.012646386036074075,0.013564612061532276,0.025527630711680314,0.04605566608246888,0.01918231218311606,0.011129252230193738,0.0027598433544446088,0.00396938689165283,0.045329876051252764,0.09825127554345647,0.020674960377829173,0.004621498621324396,0.017538023562302673,0.007013945783537073,0.017046067057934596,0.018791750173168052,0.025132761824861776,0.031556290480733204,0.027527058658802585,0.00016468527265516833,0.01949007288342605,0.0006573941064025434,0.002140572625408591,0.0344164900439699,0.0038305744860171968,1.9456371133916742e-5,0.054079924007820204,0.026005341832764633,0.0038202598318922026,0.02624279314432655,0.009273455840160481,0.02791343458066022,0.05336878963572298,0.015575810976658845,0.020935271705969104,0.09784883864049958,0.21256916524855085,0.27170075405445937,0.003513719666203565,0.00863721665258239,0.020267638336697372,0.009453572813083693,0.06203494887857659,0.10647409439008082,0.0185330316106525,0.01778577950752097,0.010007315922941616,0.05636848797465968,0.006350409332775817,0.05562059219013846,0.03340766789858759,0.009513186029745184,0.00217398396352926,0.002796292918727004,0.028735554483401867,0.006621565826893211,0.00042745582944174297,0.01794013651587426,0.016504137539588862,0.018155895043291143,0.006261636018236114,0.05232479538780817,0.04960080007791614,0.0022299613075702548,0.005588383774721264,0.009359751902458307,0.002927618387997084,0.30312502209560654,0.06483057194779109,0.0016794814380319911,0.02935573456010993,0.004512010073767582,0.08530646299178103,0.00047894804751538646,0.03896880209366432,0.00048812015608884886,0.0035108794208294756,0.327002253739191,1.9724788258915893e-5,0.12960169807732533,0.0694133567798073,0.07283860349889411,0.000823130979470729,0.0002742125398768856,0.055875292961523826,0.020965138993143218,0.00023002930537780857,0.01163841804582698,0.020779583799119695,0.013999554368673539,0.03760735991912134,0.03499461496841857,0.013759494908949333,0.022689024485402793,0.22958046131889495,0.00027432171025479053,0.01406515597834909,0.020493744121595908,0.029424746073257367,0.04416035035701428,0.06294170871574808,0.0017435384988495639,0.017689945038054055,0.11375953429053567,0.0006826874446147632,0.1323079051940811,0.04167202403668961,0.0029810225807483702,0.26102358460677344,0.004383337374558156,0.00048513658124877193,0.013922345258516603,0.00021461311408901555,0.04339055907267721,0.0020530501919372793,0.0012134642592242543,0.002296765410700435,0.06865946414305749,0.014217276329582397,0.12312178480518114,0.00616429639178053,0.039375516747173094,0.007607917174574584,0.08209391316380686,0.09998621017555939,0.005402963530714703,0.00018947525507187002,0.014147557036468129,0.03251717431846773,0.017599935356805933,0.027452316116266445,0.006268217163479476,0.0302122159531293,0.01533417408743855,0.0066601215627213,0.16812235620695476,0.026249086622258055,0.21787682076719814,0.19500847669141672,0.047809023647287126,0.00440877393401838,0.06373475431059146,0.028000505036193998,0.009819530256000873,0.10037884893250136,0.07023432557012352,0.0015779885481870869,0.0016224492895461618,0.005592190989959767,0.000928019761478227,0.013796194061171099,0.0007740018443276525,0.025679805660204006,0.003557469452316354,0.1029641492082801,0.013166516103568662,0.00022435065531474773,0.06818665463724241,0.00584182711976301,0.013634841272166657,0.000290940863080628,0.001413661306096798,0.00422633733687152,0.0024428122871424955,0.03314047788133266,0.0015709079857082295,0.004604706824814016,0.00032845587347250696,0.00293774671722841,0.01614497527405194,0.19209972894706348,0.01277510910181689,0.07090940289490229,0.06702667006442095,0.006200729512737864,0.001932808629844754,0.0022576867298032973,0.05886239837869626,0.3716306485441677,0.07270321938597984,0.0067973188602069865,0.08554318370019381,0.062473992451815,0.022595233116361475,0.09407905086609891,0.1133601142321511,0.019780358857983942,9.23483692461772e-6,0.0020545460609440753,0.003668157193381042,0.04721793679103142,0.05191893675079629,0.0016388526840753134,0.009429624343965876,0.012563641574063752,0.01681022440825959,0.00025932450909558086,0.020534238377679093,0.01149994250096063,0.07550567897688201,0.03659835573574482,0.006028611486356075,7.321896332843509e-5,0.10458477988125252,0.059148072286331156,0.31446231469502856,0.023586979811188215,0.005441929129188424,0.09082594705315089,0.05253099521151061,0.01966414831755868,0.004353753903496659,0.0011070381171856764,0.024942605206436486,0.019344070714085296,0.04924830635298843,0.00302561908494005,0.018948731486200587,0.0006452171907055304,0.007495761416079482,0.00034196220073568086,0.015112484846841754,0.15820531631699888,0.2756893309505314,0.03026387909206307,0.029032965391732658,0.016990500690009586,0.0236963789153156,0.0011593111695671274,0.0006711638896855402,0.005747409703274576,0.010310575316208633,0.015076513601033266,0.05130533229252208,0.06089393947558888,0.0007815192251480014,0.004232365765789112,0.12219794867776017,0.000535583576229229,0.0013946713548576603,0.0254283174657248,0.009328895938380297,0.007871203244068736,0.0064175886962749736,0.0027280847653496886,0.0028612750859720285,0.03949194415662721,0.0038027351782080245,0.05450248880131056,0.014931063316441642,0.013470768038360453,0.002591251685479542,0.056082263302091054,0.0016230110338958921,0.007407813668414227,0.002821014212660195,0.0008365571255448967,0.03052187073016223,0.0007683521219215061,0.09363040641668063,0.20736735195097108,0.007835402892705099,0.0005438777261271017,0.04454206116042383,0.0688714941495389,0.00011720186241476633,0.003516822751418984,0.046871965455570354,0.011649539315162692,0.0665741003843013,0.010223101138094123,0.00484492453036125,0.0017498278419436019,0.012675509656493576,0.2743018856229074,0.006559700724406324,0.0009531475014594585,0.01178542978951938,0.00880254842821883,0.0540912255276835,0.022375083632579798,0.003602012670125514,0.003674288646615584,0.010322894737525155,0.009845483175290576,0.0009675619755355364,0.01192155551362622,0.00028183943466430583,0.02190205683193403,0.020686560057303054,0.00931716768544971,0.0003624348049905158,0.009520194970665384,0.009007646165158546,0.08758253111339671,0.014714525898144894,0.0006957748953646709,0.026316851437250693,0.01219303573674414,0.006693528789717794,0.030098773521684878,0.003984044799166448,0.0065859314966371565,0.003406035879552654,0.014349540008212513,0.023662661980525943,0.007294712148262146,0.23923763860239997,0.0007343459536850043,0.006353864144777388,0.003127791332040028,0.002626902004519045,0.04766797347985252,1.083106182904278e-5,0.02857249152998162,0.01513879677742115,0.011380843291094938,0.0050001086045618984,0.02452106626803088,0.007819742041889033,0.01340883157479843,0.020131738528355092,0.06598619128111097,0.039414508775806385,0.0026664112688061783,0.015053693481473956,0.07510557073609431,0.0032601792549376324,0.012853879849274545,0.027714688352516906,0.09637507358976397,0.001662053690909117,0.2076521147689761,0.014192807884438318,0.11502278265821027,0.014402652681014446,0.06309452991397534,0.3483095024526152,0.008787756457107889,0.0023177264387788587,0.01141480082986622,0.06255609758130491,0.031168865130652014,0.001759890894276876,0.014147004991227058,0.0010373290689316666,0.02872037469116738,0.06043483261891426,0.028155628405606755,0.018619963095094002,0.013510733501135543,0.07804140013733109,0.07052043006781608,0.05529222907458231,0.017945071735457816,0.00023297783530254124,0.012145195602892858,0.007790360669530432,0.01852605425760454,0.01955199263605922,0.24459094417156796,0.12899247877034334,0.0013791911388443584,0.0023151360963149735,0.1820018352589123,0.0024814514044513166,0.022882731329534056,0.015622025485934917,0.019550989642554355,0.32981940204279775,0.001828251280619897,0.33315524541012886,0.1261277514028586,0.050099711289362324,0.03557646706421305,0.00666180068703288,0.005538600391535225,0.05292837133391349,0.02424239138978465,0.0010967672339114187,0.006279746451216589,0.04747055732589553,0.00962134594683608,0.12927410620956997,0.004124554689138993,0.01619166594496966,0.003986534049626331,0.03340029135112008,0.001246815868134099,0.010198204806021545,0.03575039146166372,0.008615630976939462,0.05100393399528572,0.01701472919767671,0.00022084807761922084,0.005572155846233682,0.00021417046800640014,0.007730026102826121,0.04587543372913765,0.04066189829202162,0.008655103741784659,0.03134723351038637,0.00027392781201595885,0.0037378613567781212,0.007309034446846243,0.01919098545177138,0.009575252482524499,0.0076116924031495855,0.5947830175741078,0.08644482509898631,0.004953450749448884,0.00037091859956758425,0.002505571116112168,0.058975659833674095,0.1183299097398654,0.023520026866180637,0.16033188304502033,0.006872181205510501,0.00034687423875945784,0.060078894768487934,0.009723811572559258,0.00558860786969298,0.03737098307629141,0.07132348342548489,0.291023029732818,0.0003229541450986138,0.0005206582332746137,0.009186125581653343,0.01278877561884052,0.001242071277158716,0.007310279779113351,0.02758693634304756,0.16582939748110234,0.01575876559973474,0.010047469851143959,0.014742698779904544,0.03460888420343565,0.0030584662289519903,0.0006518658511935016,0.003094536509066252,0.014969301495625415,0.008419860904673473,0.01095231402780906,0.004213077309206744,0.08115090543556261,0.0026422883228877678,0.003467024431152044,0.009886823776718326,0.009915107117151059,0.17126452051290855,0.01443499914300724,0.2804156471855757,0.032563559203875256,0.09161792262478823,0.03192039320444071,0.00038392940664670625,0.008625647014973249,0.013358739842353928,0.010697363807537693,0.053715152385802906,0.00025982109919169824,0.00020178217079435404,0.051320370860236],"alpha":[4.79845827027366,7.695214489421753,9.960705856054265,9.704414758732467,8.533501497189926,2.55529193554747,9.367472369903993,9.682258973772802,3.426254989037092,7.0778643140417845,0.3190737029903645,9.956586908897464,3.9516735443205064,5.2393721536610505,5.327820194618895,1.5392641912237282,3.6107247961846722,8.069115166091038,7.896503049469947,4.709111378340922,5.218203102271202,7.710466065988808,6.693889151030106,7.849488603324566,6.012145162960705,6.277522134780805,3.9961963943879186,4.3418690835831075,8.369938270945473,7.789854216960183,7.221860728327143,6.513439726618227,8.984180583230339,0.47519660139338615,9.966791790239933,1.893901780713172,1.2511257317414715,8.337449245894923,3.6759654609621006,6.834272166363384,6.362437947872708,2.208338606518876,9.595462242519723,1.0088860845772074,4.193397415464357,5.251702631947859,0.22135873119845773,5.954141690429768,9.248698775672338,5.943512075994173,7.068350374486842,1.4253568796633842,8.637468408000155,6.194568792937463,0.908336127781133,9.352486384151943,8.320953474105039,5.682808318272619,6.323383508329949,1.0933131858832845,5.946879747763337,9.52625725428389,1.7787907615395926,7.684898447344284,5.555626262248947,2.2070962003555694,7.050070809707245,4.493231170756065,9.667814681199314,1.859155801550405,7.5453445031868815,9.164417552736715,9.792876412857455,9.458766927413823,7.0142597823615365,9.868476286088905,7.182809595999204,8.839043160709783,7.053455943671791,4.640664348679895,5.284549432772363,6.067964189909285,5.936208783683123,5.478913759737316,3.6707505990474187,2.3029308065676846,6.053032351098651,9.926319729462556,9.189256379105155,1.0884935384692729,9.414484529386504,9.251011486447101,3.699052076623237,3.2182566514472533,1.5480661156162112,1.2902239834837936,7.072015770257039,0.15058741410107768,7.423163544732363,3.6596035900356094,1.1645296875385491,6.929133992110019,6.574845862182894,1.5404768831394322,7.518279656081734,7.831261693007498,8.587717289358089,0.9902599607698348,9.269249142522188,1.3006834292358227,6.599541911973281,3.9264087736184905,8.407485066539897,2.977699215992946,8.3764973735077,5.038929403132832,7.346442231333079,6.202293405766945,0.5923243540455125,0.8539966407698341,0.3719950670094918,1.9439459902966982,6.406044809380454,2.7411657241824305,8.535047200734747,5.492182070940221,1.9258768145956973,1.3423953878593542,9.109650342824441,8.98306187596515,4.944754273206686,2.746862726296564,5.19797823311233,4.44082174051081,5.192038050510687,2.2625154272643644,1.4685916203119675,7.674562453456549,5.9226565855190945,6.5091962026615295,5.504663554178688,4.686519989928522,7.717138567307464,6.753015705340523,8.135865936451228,8.36786412897921,2.6201124854594893,5.23555225609269,1.2293204712151407,6.055843946324919,1.2517368340714685,1.6018317314371844,0.41873603491339395,1.8716255681763783,6.742694278304007,8.967547003150107,4.100237063994589,6.064828826265423,7.875850529339454,6.616810953005539,3.9163697229786343,9.437553367810798,9.190190030307843,2.8914052836131,5.622634728569242,1.4133244262321187,7.745060357579954,4.456253708103941,1.575255621058449,8.457069884191721,7.2453340277272,0.9244055900178982,6.657442012025685,1.240942838356771,6.277447805387844,9.573499961476085,9.200762042366593,8.657465221960924,6.092875411612928,0.4516480867600836,5.816862316201297,6.8100321092551885,5.70229144682024,3.6142082694419053,3.2923740421878134,5.795893369888539,1.0626752452233523,3.2655828574652968,8.940104559225745,7.433626027214526,1.2554745567617398,0.04973991538446798,3.3167924652607983,3.6153514584460256,9.635124253395567,1.4528085579457062,0.37525219338740756,1.7420939384548983,7.987110687140104,9.839759335572161,7.882921456306846,3.6900807643039357,2.36216918429776,1.2916709926402525,2.611979781716891,6.196594190972453,5.278041367391468,4.368454798418371,8.693246077853402,5.476161968631836,1.1843214919017542,9.327067765572858,4.554937818573428,5.852154234156071,7.3636726126465435,2.341076717143691,9.37706508170584,7.260930892283188,6.236814854861448,6.66409243127319,6.098543048711226,6.271173687884815,5.740828819294059,1.3299831108654692,6.910206552832423,2.0007772629967424,2.160674477860829,9.790239506152922,5.340967808906541,5.479760035433094,9.468436973544406,2.473720119819911,8.417128405631704,5.969075773624805,4.942692423917667,5.770479688234744,7.334211093972329,9.711176830834114,9.068610340843438,6.59073086472185,2.5896507796869495,8.767019720677178,1.9074648098730673,3.4784782163971384,6.589231596052665,2.479909816445429,3.3586946138482987,1.5436481323319007,4.298876474146336,3.608499202215567,1.3016051773246007,8.174914141484841,3.3404383387103542,4.486480474034815,3.8955493204265768,6.94190209310793,7.035898305164574,8.499624960342837,2.7150453476643532,6.388614631281779,2.686111876916626,4.197397430415619,4.941690063806954,8.986391603105211,7.369643633443017,2.257883589732177,5.463839985837746,3.6107292383773504,1.9303563280780733,1.9639174330585418,2.9859335322315106,7.8480875893062185,7.000594696814604,4.156315156564789,3.7148243871416686,8.996129629889932,2.1718112403802547,3.5573455224910155,5.235465313034089,8.214349725813598,8.006064100569589,8.404287910309648,4.370346639719916,6.049436332128105,6.511413384140323,0.4988511919622107,2.3528240455964533,1.7818036620207867,2.203840247016422,8.539941315585688,4.489722846742934,0.0665365133241047,3.2360327180381443,6.2856124209716295,5.948543573045557,9.482003196874656,9.618463781839688,9.356422260058984,7.031500362453825,9.886765419382545,1.4246378670003823,8.846380730685077,0.7995521056735133,9.09645368227505,3.204582590552776,4.710226261872579,0.20644443486961706,3.017653343465221,7.055210935512594,9.311008289101759,4.679339345417201,0.40447208814188285,5.247502702508157,5.818856905293015,4.288478297371312,4.729974893895577,4.68434016039777,4.387347275100386,9.115183400193313,4.988205457693469,1.783315248793742,7.283160275447513,5.78442987774674,4.54160464382621,3.888036972391604,9.511352296890616,8.222310646613636,7.213382660435695,1.0097832214733282,0.7852059601581152,0.3009472674550673,0.24886981599037794,8.14152606841823,7.833787890385393,6.475666996366778,0.8161055506615145,0.5663710660580978,2.645907458680563,5.649875161187989,6.326756831687654,9.17222512580907,2.385992766080498,7.6854761201275075,4.040116829385982,3.8283726615674563,9.449155014375757,9.32280165914801,9.525174780865292,5.940826931797862,5.559718375211286,1.1744282856221533,9.759192435099845,8.212695960764032,2.8680565392026303,5.924213345142315,8.98542919359604,4.986877713919409,8.947162551949162,5.266276479681018,5.406382287347126,0.16478986763079018,0.31849907880186157,1.7165984761452036,0.9082100688594075,3.4344916186815433,2.626533716517223,0.6244307378001146,5.553318072602171,5.92645508549718,0.7101453239061817,4.774823356154291,3.7470691543231482,5.085117875264238,9.119001036118341,5.336793305005363,1.8931893464496552,4.235401886891648,2.441347950551931,2.442272743867848,3.2200204575100178,9.444867322144368,2.379499805543257,3.1541159736095725,7.148716921886368,0.6516320479422832,6.246980202285888,6.4915404599234705,3.1280165139154015,1.9354401148696643,4.403827228985861,8.806027363798432,4.531429851209905,0.12042428480877554,4.870347855377561,8.28925509017105,8.844794442582371,3.379363760968168,5.268112488401768,2.6017969688397047,3.9117183030856695,1.8032730349538406,2.3964950811288954,3.587807113750341,5.690725088550681,1.2611224566544377,0.3742149859047772,3.023763314305854,9.81816988798527,3.483480193927635,6.237919837526871,5.545390936051058,8.106326571039915,9.240609898758432,1.090727384654353,8.716028888714575,9.451618010444196,4.417153109450274,5.625080710598369,5.419165943676115,7.901863241941285,0.7237722760481224,8.747173866062825,6.87135771997279,2.3742264442906436,3.2803084760092616,4.85010919512815,7.921288224141709,5.4484526842348835,0.14510665684849489,3.785017909340933,5.783281168563052,5.439188807182889,6.329414305735344,6.1109065644126215,3.8049632749801376,0.7317382149590634,9.961981272133828,5.280575275835355,9.329344663485394,2.107678933952788,6.154582049653763,4.219734329503004,7.936600712366331,3.503744059312972,7.592159584580768,6.833473312520559,6.878835348048802,2.865406580201353,7.426095151434935,4.359898025035143,2.7549045984606835,4.395795086352834,7.583110428596016,0.9455930545735569,6.448347092614613,7.954356455310096,5.249587974438493,0.44242970680697713,1.1488868784993445,2.9362183858130364,5.8983824806972045,8.79689946458608,1.9365753162995936,1.8090136667663548,6.929173396651991,0.533882350016357,5.945907631648377,5.290572608556672,2.133441086758716,2.5461967781407435,6.457384608259074,6.759416898253969,0.28859643590280815,4.199872961810598,5.956822147023695,9.068597096726092,7.93263744650617,1.2127978774710546,9.602238092696139,4.589889953369566,7.863257421883976,2.683380557974877,0.22060252077326536,0.35466205221845293,4.928112318209026,8.168645882904446,9.033629316548309,4.042015836220885,2.838581118289789,9.461922715656906,3.119146964092079,1.016171198180098,0.7468693083620814,7.244434706459533,2.4949089321734697,7.615555757255292,3.7033989542096113,4.485778923803656,1.111011626956997,6.562109157829619,7.812096826949759,3.4065754961248262,5.251709120498946,3.5213211454178617,1.746856795635221,1.600902750727753,3.7214664691338384,4.552812252179699,4.6897433287036305,4.210646028772884,4.093738291049389,2.3912057187841596,7.722302249364552,4.679440998915174,9.610657223482963,9.478305926880399,1.7896444785620402,4.5382414926327375,8.365514094468104,5.889242998474802,5.8948273293666436,5.485831491392283,4.025996423649514,5.992149050935234,5.902686184606985,0.9421847455124799,5.75024207283672,0.6581529651747897,6.9836595817987,6.4156310160598355,3.2727551970023283,5.168072237000459,4.962158911264238,9.56884666819767,0.0676195913951716,0.34070297738115984,3.7454127720595753,0.4517993059803227,0.24752958821486537,3.76276099517324,5.355196636975414,1.3662634102051818,0.3279509877076392,6.283039804613512,0.1481147146812578,2.7277349109368454,5.75134884514569,4.187602947665383,5.641762567291764,0.7352041934069287,8.472458500940617,7.738621795297211,0.7472348970433029,8.488612496022194,7.011080768911862,3.61608785479808,8.95317458978763,3.6496087363754715,8.327309121854674,0.08763935497464903,4.266149939795156,5.175735952501805,9.456348186496788,5.0451592746122635,2.289119775913888,4.473603851572774,3.525077074188532,2.414389651815685,0.6619174917313075,6.5207930987633915,0.44993231336805994,0.3835936352841096,8.139073071330456,4.6737172123144894,9.699251224345174,0.09196440621232371,4.171377562383453,1.072265127414982,5.95329120570022,8.360203043762413,2.0078063930703283,5.520843077670195,7.431039981091576,6.37798943897085,8.70634537227221,5.993567577178187,1.1037267416185093,4.736969200721797,0.3608804584911196,8.896361187871856,0.10558566805903835,1.4813739812878568,9.076804341128978,9.432459990948672,0.37979189241003297,3.0265397874114663,6.462782024419251,4.027674736356472,6.376616090199234,5.15489952133162,6.371390796781149,9.300638666136747,0.2162706021437133,4.910016285081264,6.814374532512217,5.655098066256759,5.441096101824465,4.261312732016673,4.333568700034811,5.920978444034755,8.502203859140057,3.360770399133699,6.732470109807489,7.438480592116747,3.9694986522858056,9.708370409257538,9.738625252977409,9.83127749481608,8.236673041031462,9.657557068024401,8.83597819802214,3.54475276288307,1.094603679428816,8.925117686452502,2.184467322504269,6.420440612557798,2.7481926269753276,2.36580983096889,5.260396473163413,5.4876732853305725,2.8572283604561854,8.206091838844682,8.455880563122339,4.865202442408007,0.5006537321250093,8.336852517929493,9.117036455468728,2.9675355453210583,0.06693659285966769,3.0583206119953332,7.222932389401739,8.815017363227199,5.422227328644304,4.764247365502059,5.115613054313098,6.357958945643918,7.970420204157365,7.666690045468327,1.5481698246630948,9.093000856985345,1.880486986504617,8.370836782681277,7.526864822180026,4.004421835323373,8.205049052715927,1.8152971395983664,3.415740077895326,0.12302151353747792,4.2718529549976525,2.6697187888677854,5.177872281184889,2.988950247287445,4.082224808798345,8.597717632938124,4.920086528024205,9.716390703466702,7.726196412151419,2.0517008552789306,9.44539136851742,2.834226718747337,3.8692263723807385,6.651100667797756,3.141448057543217,1.9976876640850083,2.875791948784283,4.6111759866410456,2.87063181590252,4.952741551520161,1.5436108654365488,2.3407487562402807,3.476742237813051,9.239966099538064,5.158146210646635,8.496597656457707,4.920406081628521,4.282590493382594,7.071089772946997,2.2954208974797874,7.736297269142449,3.1916524365744414,6.292716718955038,4.499675693089493,4.71578371275585,7.770708534891433,2.486510129648356,7.4486522429084845,2.7939064702080474,6.923083010006246,7.848417318429696,5.8829504751011585,6.713842421573952,0.8141140711894468,7.838447162702391,6.938498076231456,8.970426187146598,3.7882564767642135,9.953813626948582,8.166446967901575,0.7775064747183014,3.079286021891985,3.339047066656895,6.026463484564606,4.7965406659785685,6.88332207100026,5.8472293110508105,8.726111507549277,4.0784804117838735,5.916939295934281,2.4272575199668323,0.9870675440468335,3.0620015005019385,4.507946026702401,1.6671595068534817,1.5785860766407844,9.777411516863273,8.345106555497274,5.429264259662254,2.515967150684968,7.003646792111771,6.690991157646298,7.028392017202054,2.8142004680892097,0.9001752472374291,8.977852170905882,8.145325443345058,4.085380380609176,3.179617068529985,3.3299556445363687,8.648644127568945,9.036070860910787,8.964691436296393,1.139587522848171,6.24847298018614,1.1437852745419752,4.585599049446052,4.947487061777506,2.022204955755982,0.8986830860053496,9.57641815291893,6.08940365344491,1.6302546354824465,1.1258978633334316,2.075802374218294,3.6456027988169715,3.0529160328734273,6.7828753304856315,4.2196664795808925,8.298452148615834,4.674046207955838,4.343932629070779,5.948027760861443,5.503677348000369,0.7643291578341493,2.938058389396687,2.6938196616399,6.586073948029325,8.734995539982858,6.962556902120114,3.01040602185902,1.0267314475441691,1.8869244546871022,1.5468165588491045,8.74134710579954,3.938052534090508,2.5076934058440403,9.31964120040561,5.523275686903737,2.867020157688376,8.26565121119433,9.275411241318317,3.3937808874601116,7.9263361460385795,5.5040110744462005,1.9105222069855876,6.58876592235484,9.338307536312485,3.311554219748607,1.1068919779199038,0.08515932265466875,8.152760306252425,5.673322310250337,6.26043584987348,5.283681685358093,7.27106474802132,1.5115962566092622,9.123724937028294,4.132612071184858,5.880119891458939,8.672110573446258,7.822514202425339,1.5127791567164883,1.3282110911812328,7.187027747709404,4.446307206726274,1.6996599295968595,0.7186517484034805,4.4003795171776305,9.00576584033949,4.285015426217155,7.078320623956209,2.7249923546845123,6.561659236057595,3.3474385015587993,9.921719009878274,5.9676321191414194,3.9549351972614155,3.634482566738937,1.5670180585595284,4.609425596788559,3.3534246462710504,6.687577870528583,2.519794780608682,7.5192913319385735,6.746714293512628,6.810941869628657,2.612167832782162,7.925486642565353,5.360056657990915,8.355840857953662,7.135488206489072,4.185929228531777,5.111018601854762,2.498583258433078,8.927263475781436,6.138646192651443,0.616802129545948,0.2834455496350152,5.2067844367979,5.2622961913013455,9.275754175104463,6.760594038186776,8.204879822934775,2.962786909453463,4.185331374065752,6.1389645949352545,5.71532314949909,0.15834365341653056,8.76722415491773,8.01518148077009,6.917319568965392,9.974190242761896,2.388608473607512,1.2975056014950725,2.836390136237834,9.205937490733593,4.585969137254704,0.3148525008911318,4.212996032943773,8.00444715241309,1.9387044496678674,3.569220193885676,0.06126614485687076,0.9519896100960556,2.8476700604625704,8.238694609184016,2.4795197736176178,1.791263404214427,8.207283535462375,8.509738741228375,6.82080777395398,0.5892386688452089,2.5801896339275454,1.5625990160264114,4.088563772130662,9.935028462332154,3.110040337567994,7.248590724326316,2.0112004980516662,3.0828520026263506,1.4748167677616375,5.215484598585782,7.716404244052109,8.66048164086228,2.3773867733550036,7.51703507008493,4.79765544115256,7.0371162023518625,0.8684232733903063,3.056868413069218,1.122978990933332,2.288405454305864,2.7516855902464643,9.569853034144693,1.439727677613043,3.9003512223626613,9.443408065124363,8.025702456820314,4.3313610978508095,1.643020837403979,9.657033856289312,7.035949272791246,5.03468237995552,5.797340598015093,0.7403804246214674,0.544713054464605,3.211446855596052,7.7374050116077475,9.770863390437377,6.713675111358808,8.272017840290191,1.573086197079816,2.7502211401013366,3.835847831409731,8.952909217895108,1.237871282041394,0.8744944638511298,7.810401759022742,7.397344584144065,1.8015110497839593,5.658658647063566,3.598066718835282,7.328805514566181,8.973629678733971,0.12486898241664379,1.7456141208247056,8.623176163862505,6.995041904199666,1.0253130145275735,3.6566203988716617,2.0292212204708515,3.2676988879345115,8.439095651834855,8.705772745372647,7.773898498985137,3.397457378658988,5.5397451581108115,7.097553199088016,2.973278550039671,9.78829418779528,9.395778191689146,9.347593271192544,5.794983392482149,1.9091558755226568,3.842697494779448,5.190802984759233,9.197822426650271,1.7127929971511957,5.807942595595479,9.047001433238789,8.849373703732885,2.1711969530317354,4.532830614377154,0.683547627483434,7.718423020328777,7.3255412935199775,7.3198099154254255,8.641698623412399,1.9494432460945577,9.295474460517825,2.080894462115248,4.144367355652987,3.4470675341863943,8.912368967327247,9.043197746788845,4.431881054308404,2.8228065640467803,6.291820424232659,3.7683990957022706,1.2375486065950425,3.777495649386362,2.4859264513480817,5.03692088348701,1.7992353338086042,3.295385519356062,5.182016238714223,7.9882607893927275,8.539881232606739,3.4753894919039885,3.9874660422131236,3.3113489341649394,3.444572894711171,5.607875395417501,8.189486585626762,0.13508524604875394,8.675031865532684,7.692672570045671,7.918960266406323,1.0136605302663027,4.598544555779991,2.030127826543988,3.894696616140514,3.0243315340080135,9.250215208914144,5.781409115788419,0.2946231040618952,4.857818536047114,1.7341910893556944,8.976551634840293,9.236397264870275,1.9386764550072644],"x":[29.4420806607678,13.474740506043428,25.51443581776936,31.696825009504103,27.159347047088072,23.95600381420027,25.77015460140752,33.325089027089774,34.67254077611295,29.77320056244669,36.87552899916706,26.057341877424548,23.381673862854903,15.228067087315543,28.452731868975604,28.73286708098974,17.472439344517216,33.787272981054386,30.240323017849544,32.6253230824432,25.807407211462383,28.801589228884346,17.411355363067294,31.83549351986397,23.93819686878121,29.388197918960373,24.115443760216102,20.860977138848984,26.89363374272734,23.804531478202158,23.20216202266817,22.675828969588363,22.304029973054075,31.49451517100194,13.169543111497173,16.461259995509586,15.923471762141514,22.62760546029502,31.54776549059075,37.73631748763274,34.60565249115675,17.11577842797339,22.969590858783164,20.295104804460124,34.775582381752116,27.521996466655388,25.73843701678711,23.72851050961806,20.920384980040318,11.120329342040904,20.906006648384018,21.02069798228956,22.047358677918233,27.871440345344805,23.87328160568454,30.669403563730164,20.014098541769318,28.79821536720349,23.794562259957445,30.764899955889405,25.980539889361484,22.87498915275947,18.82256503006137,35.779676383818995,21.91457555050019,34.521987470171396,18.42620671075709,25.1981205124184,31.895200939606646,18.30557238163454,20.32536375033166,26.350413926470974,22.80518216986534,22.634082895983582,24.095369341010088,23.396695033933426,19.48329864073326,14.169550800759708,11.643398006826803,26.90235328813364,26.254123813930647,35.23707798995675,22.563747680672456,17.56331426940165,26.855946805140903,26.98434415920913,27.75326284683666,28.0987374088879,16.65501645575092,19.979327215439767,21.966640719917145,19.980504252759832,21.53842877198643,21.92775812975655,35.30087873307927,23.01711864590442,22.616677270546226,23.788778878731264,24.26056989647792,15.90227555897292,28.462135515690473,29.1534876138913,29.53485290829042,30.705177752412297,32.358515713086824,36.78146628263188,31.50159962330877,33.48035481868869,19.09376007050112,31.88527952279305,18.86299019843462,27.05925909973597,36.118843526952816,25.788870821225665,14.76264911598356,30.31189499785959,32.201067109917844,25.69169668376304,13.997503384514594,21.59234953712796,24.416925515120468,21.018306824646682,30.24452797477877,31.741426970052935,24.295135672951247,24.616136012507823,26.43353794174582,26.466131397276907,34.26998172374881,19.32141178455163,13.362774912581923,21.59665149831897,31.160194514432867,25.03427406220512,16.310562990752135,31.16909575101847,34.87683993288404,20.845579859829737,18.888125994895656,27.436113285081838,27.409072133667895,21.297661676281642,35.961093274195264,16.833967553046115,23.349581509820375,36.804048402702776,28.123549663616778,19.527867934279712,19.327139174171318,18.224980531991616,20.97626262898808,22.828472557356175,16.70588006018503,33.94543090463735,19.808334412764413,27.411468797917408,23.63518471400291,33.93709714387994,27.312652145870246,21.44607381627291,32.994431458657374,19.769904639076238,20.665534796358195,28.88207415592837,32.91566529516916,24.451423962904087,25.59848824468743,37.48402736425119,17.007692978544267,34.481106723239705,19.686553221813018,23.980895816452236,26.821254135332605,29.783710686410977,20.319160287092036,36.07656599306212,37.31845701877852,23.445910420590714,23.252844450841142,27.07076658748889,22.75636514523182,25.43953788959552,28.953664844347532,35.140475032974905,22.079771917296366,16.993053279418376,26.713837016603033,30.54497666320086,23.36646129286259,16.261617407049542,36.83038699583643,23.830281286869173,19.831441557564123,23.25446354388009,25.002018431748706,16.572085839828915,32.984856903885756,25.346237818015197,21.860887952178956,22.518579373425197,29.620487325196578,17.00309804138665,15.128339903874272,19.437112795612375,17.92193591012534,35.70939007392491,20.99286023380037,26.419404322835014,30.414561038037156,21.433643675419837,24.38235610092977,16.864579100565216,20.82394226357455,24.53488334261027,31.54891965825805,20.90570659873971,13.37402581396153,23.90361313146567,28.053536427577143,35.65510411434888,24.187671693975066,29.072796311304383,25.214822680793645,28.419009879706387,35.803047095435666,24.33124920702794,27.543313329207407,21.690991301514686,22.5949126319738,21.817450227419535,35.38187814449084,36.66121192904362,27.76411080865116,16.601961309310205,35.70205736740949,14.781986182763477,28.00636271709961,30.826305586315165,18.975928984573326,35.52375561417311,22.75294368525011,18.75587893374761,16.662948762051332,30.133473939219208,23.486989358979965,26.732222650028937,28.612321518332436,24.420027138580615,11.326850466568342,33.03229224169965,32.25179603865789,33.690261169870766,15.553247201361067,31.15493526570623,27.11534983512685,11.726799384588404,23.511641124849277,19.42808636749983,26.68104378439658,30.367745856452906,30.98816379562112,26.23850777121053,22.84701152400862,30.435037613358148,26.25075805099182,19.69406165391321,37.34115077856714,36.24254372243301,32.361560061875494,22.927884780521882,25.08741794171259,32.568929582564095,27.650579505365634,22.320579576442558,22.774325577334857,17.952604878204873,26.451748513580583,21.381804846588423,16.7464775286204,29.456178554080267,31.77660478899849,23.70912326713872,24.278439656193065,19.698336133280637,18.560300759173543,34.982177471964185,16.235387842425965,25.54070236501498,19.67147611055478,12.787682014956257,21.608882349525924,25.287680350029763,29.631010697596906,29.2953531987449,22.851337356227127,24.167601338396807,26.21317220080857,31.62146336746205,18.141387317533916,30.768893609323676,16.340958957343304,27.420095875886954,33.00164761964017,21.7847262940139,23.847267731337922,22.75446029546207,25.833078528043032,28.25015580360769,24.55053081424289,27.875117365918456,28.766519282396494,27.46728143912298,22.324264964592704,23.406154824890884,30.59306271634703,25.20782154881257,27.994084551341718,22.421292885759513,12.448360464652303,33.71681991812905,26.743538764485166,31.97895608703641,11.499430868755187,36.098890521678136,19.019368219829882,35.37957016412375,20.496029560480224,15.622111399689928,25.735725870927777,33.67742499123983,29.098017122690386,32.16767793521719,21.667956699366048,28.405650614901997,29.569618575248505,25.433524730787397,12.754291065737503,21.894397019209876,25.897624118617294,27.6229805407227,21.663720054757313,25.07546963056783,35.912057630418175,12.934219995054217,31.516435970446476,24.944930129399765,32.8357009297022,30.898902056908533,21.84348025759916,24.220332807128088,34.733899345830935,31.772036362493875,20.03837290759271,34.52128164959744,31.71860468833313,21.10843257602292,25.636481705595955,16.273066190970905,28.435207938009874,21.502354485006002,28.456179469899993,28.97486117080597,27.560403444081867,16.871397559141823,25.226629041444937,34.77512641374135,24.037684314536314,27.43278574043628,37.43157919346588,28.083577691511742,28.519730581123888,31.527153724886976,28.127544430669168,21.312916947959017,18.007094018916487,23.044584424661508,22.83563783825118,19.441895763552406,29.826978218947666,31.370150788523148,26.550347100843865,11.791580327241757,13.152264265061579,24.42290996911843,13.180906043685084,22.310681845661072,21.063079831373592,30.02208252860438,17.38313448698303,23.463187272776736,30.51058375991669,22.870013563407255,22.969116784465783,24.239610850475017,32.743544810180055,22.60287013502863,24.475471419649473,17.988887676295516,26.193489079053744,19.35553254501271,31.623017333934474,18.112491031156317,27.395550985449564,32.39883286733419,11.939326102696997,37.75220826875271,32.66036792723897,33.47597110804823,18.64247728561467,23.43921597061898,17.135218211304768,15.106876242643157,26.47464323497608,22.551572088856545,23.751097218437067,32.87953093591683,29.20127118083279,24.29394432384116,35.354140608454586,37.346707380352285,26.388178027363516,18.839763165309215,22.215268263482695,26.76229698968737,28.217754082591803,31.89534970323931,26.587795804431366,24.626208410983075,32.80908891655467,31.57416208094427,21.931649581763544,36.249885963590486,26.43853928040351,16.52044978041169,30.261660083375794,30.384504368937918,14.322987728869954,31.599186587683796,31.187410451455218,20.67887095177344,38.53011062110852,23.70760549757796,13.180491544655311,38.220946424093775,15.950913740314459,23.400015205081843,29.756400146317414,36.98631547848038,28.02576711147161,19.97149318431567,33.80631102707629,34.561715963873766,11.795853462054929,13.978174029860291,14.552780921474664,25.42121267957195,31.579598393170585,24.703393025952717,32.215203560647296,20.627037581644053,34.66450101788829,20.517646499241685,13.874502763880923,18.323114862251128,25.94143350645743,29.808757920804844,28.539309796227236,20.602201676317417,24.262609248452243,18.972922116427455,24.54322234941845,23.57810886273475,20.464203029956145,18.00639382153029,26.70321878672759,31.06429736363881,20.65286317575466,25.936434980577044,23.73850535194721,35.55816807261296,16.865411965941057,21.86478092728692,32.35152682676066,33.301664031185666,28.532717153385466,16.143087333604782,12.965347578234297,35.20015053681536,21.572870462495864,24.521073408559843,31.011368914227653,25.587247985912,30.88584281245548,18.524671008606955,25.387413803955102,20.195274765840214,22.61251235649163,32.78111241164186,20.55294413459925,22.32545622684968,26.886656163533054,29.316905764818628,27.58512140650364,37.21954629821976,36.561559044890714,18.836620129782283,23.082742756257105,34.2012043975591,19.563026698467723,23.680432619893125,23.55980164030101,29.14739467097623,38.61310039512941,26.84263553480823,21.170157065521735,26.55927782886342,25.822015234119853,36.957240845814425,26.4111829038248,15.134269343901089,24.296033879562454,19.846973823986445,31.821499837252414,20.825542809696447,33.89105511321668,28.78766185608678,36.956803213925596,28.86312926128071,32.01468720910164,32.543504343590946,31.580097930780717,31.215827537185177,18.7767110218097,21.788899177375747,31.52094613588774,22.584874440670394,20.149360688387894,28.12464134858044,17.154084120941917,28.012549950213035,15.169393925305748,32.93624735632994,23.67423697989674,32.34288506431194,33.21898725189724,22.133769049278612,20.95134676134347,27.49321372903271,33.752244239368395,29.87927964779307,20.027813599020924,21.748904962071975,26.943208671474153,26.515214061392467,15.435856786512854,19.43754814472314,24.222063993081036,31.908217101501904,37.46177288449442,38.496435756104674,17.161330209346353,28.42613776503645,28.68182094966433,24.545774051223848,30.76719851228237,35.542772897140296,25.05839007292061,31.057382195937567,19.42608089043821,14.014081907459246,24.008120737188563,15.68236119374088,22.49371854994102,18.770136390371082,12.101995068085685,25.38991428999892,28.338898153722916,30.111340616188812,29.046741079090573,23.671693437812827,17.185029829649718,17.069336572745165,20.84282261377778,18.368057335359865,19.248424117375777,29.017697253653623,17.68109944768134,21.922199289385663,27.78650530977825,30.08152585016502,34.6294999419865,22.080699806788402,22.35867369602844,30.864631424072027,19.39818200211801,22.555119298193553,25.43295061124188,26.801880071332818,18.271375184013024,20.309836794793185,22.299418804483825,27.337017323167498,20.683034319351002,26.98516839314725,15.39623716200355,21.84391373570058,35.34462219727237,22.14694730812825,28.68347031274462,23.69210752916974,27.801720527610073,19.89590943432783,33.53087478083096,28.21970140345251,11.268808363312711,28.701598235236894,14.229864696530804,19.726750022931803,22.98005084322165,34.50526187467136,33.7978599130285,17.66117096541022,29.842310081078345,27.669442509901657,30.72876657947492,20.636973864131107,27.692079311411952,27.262767213872586,25.01730669675677,31.625444861804528,24.956711701941394,20.138425723785836,36.21543296155885,24.482885254085513,22.48010381247887,22.15957096523629,16.944938598539963,21.687594465543444,36.806447736926415,30.16203063199608,18.258612124803697,37.28790143256908,14.557084180331683,22.006893025468862,31.60020223478669,14.957272768820392,26.368813915419068,29.45577701720849,29.487398872628404,24.512637557670747,20.513244911882545,22.343467005196842,28.141167118902118,30.21798674468555,22.175651038949226,32.310247705930855,16.231636574322977,19.051955085328224,18.36216721641629,33.913228420595885,20.148901317140602,20.451788383747058,26.778427199442728,35.10231069219623,27.295584788765666,19.282393101158725,24.976679606962904,27.564694805242343,28.666068183901366,27.348852640887095,25.060587260408784,31.45961243766141,15.57636209252626,27.565149272266986,13.196437720832805,19.542589069494234,20.320766848185954,29.924999105988153,17.60027432470647,20.79871806859531,25.389304671098575,17.838058871252457,23.28330165426381,34.00036471663605,31.992759778215635,30.97816105720638,37.293055638605885,26.868542886313513,25.184317646714067,22.836644467794606,33.29229588411294,16.783920608413048,31.74050522604381,30.734010704865845,23.14031091599383,29.15751675963502,30.682426823544468,29.18727583515752,22.318124146520987,27.002385012074118,26.472599020369675,21.134142761965382,36.87463367869054,21.486767706483906,33.677857066069436,31.80978147223546,25.835089638304524,21.562502458440555,28.10627540060006,20.625443635189512,17.852027975803416,24.66539203505942,33.482868689830674,34.68784823507636,18.272284178735166,13.836303384936926,19.879450798360494,33.145767799508036,17.188010238671342,12.855163735382092,30.559480964619336,23.287808370873147,11.892062235634985,24.347504185020526,29.416133625607316,29.420348441523515,35.69955374560849,21.049652823208916,22.209051679904892,24.15765616454864,26.15485420387898,31.372414528942105,26.625659323959113,37.27580375478647,27.061220339678954,28.76391295381991,17.060315565113967,25.129764271724692,20.08252753956343,28.96195787101235,15.09233136575692,16.02236071685846,16.927551030185846,25.54537674420112,28.495546396480467,15.794961943600704,21.310151269905944,30.791718281993695,29.67503686368501,33.20989310167147,28.07938460390695,32.13342894101941,22.90182074749198,28.57590099876471,30.863757514108478,31.087890789640284,37.03290687002254,36.25802946829247,24.123956562243464,16.58799297293315,18.284011546286923,20.316734130283617,22.85022872139959,29.70021976754931,21.601438164117305,31.714944491360555,35.497938382445454,27.887670294995207,32.78558019480809,31.982931703758386,17.67260381193572,21.83988961054736,22.612747715152103,31.955419202529633,18.13336545868493,27.60308649163357,30.73288765886723,24.710180161979725,28.25197164651104,26.22156629305341,34.2647140057322,28.72409913137576,23.531637489262536,22.19127738121448,25.723781840945172,21.536061846017788,32.067542497139144,36.109891180185734,30.724879254422387,21.734045553356616,29.552219270752097,31.019472347792938,24.08775357110814,36.67046926791776,19.739173708119505,28.65401949625518,14.960280304646009,15.010931764638817,27.416416679098887,36.06215441144702,20.966215090926568,16.040512764555924,29.597307531196254,33.41412948038554,22.446228341976337,33.042145936807415,21.567904542393936,23.092597259724457,37.504336755292385,37.743445614873245,28.206454295616936,17.575258564740352,24.822032331371098,34.68256404823289,19.544117622753063,25.349762093759665,17.09444215845804,24.653368905298727,25.943141503467118,29.672931825113317,30.148490168166543,36.28206603334105,31.66214937409753,22.406844346228603,27.81309016338467,20.231300219445735,19.722064090432713,26.508264671976193,23.251853218911762,28.056842301949807,33.88325733514078,21.256909914432686,32.912009109360355,33.218656259792695,17.976121647216697,27.611770225518576,35.62994931096459,18.08005969053195,32.5191170612334,16.30960922906206,22.954641752979825,24.428765610669164,23.30988030752468,35.576544701669434,14.650229486344573,28.44251198808982,23.61504658790692,31.09030201270567,30.371769056294646,19.35419260585383,28.92931191562355,29.547251688802785,32.90603180257071,38.545488529380435,29.51465331096665,27.161198459751397,29.369753639362813,32.46515863302041,16.62257110494039,22.17467059178262,27.038325612981964,22.43549340212592,35.07538508852038,18.691418700853234,18.38856579809109,38.04804697405879,23.099481762887734,13.301537740075622,32.23510915500406,21.235868373512723,25.23654743721776,13.545000349527948,29.864629570390896,19.92438387173071,14.343259930973707,29.134165469944186,28.730818711570418,28.82195716084159,23.26333614274922,22.34550261507505,28.99700810795449,17.295189972964614,35.750079652596,24.05361203005812,21.74162467512295,24.156912658319488,20.62676367121623,33.7097545933535,20.550035496574807,14.060342156020686,21.685687547448943,31.139032239741613,22.403498949841968,31.839448628444863,35.84668521177785,24.539416601475722,15.343570754149402,16.949395150918335,12.027459120602238,27.831957655391957,36.63187391512771,18.06142184432326,34.54694296823645,24.997869773691054,27.391179451173507,22.15669398400938,18.83957995340387,26.34368060329974,14.875659686065296,17.70296316711635,23.46832961295379,26.372159910008705,35.95041513087395,29.389296030981534,18.20123725481775,26.436015842486263,24.605808352311744,28.931271272824702,21.611946618108718,28.80874375695396,21.33781845024424,28.918713976845353,23.66664270891617,29.733644214774586,22.61118480835893,31.572191590477768,22.263943025679314,18.468896924695642,32.69720265741769,23.190904384873825,23.153001251739244,25.35530188978472,21.641177276061313,28.26943727197129,38.90885973125029,22.789786593576647,20.34178296086727,34.075273707846755,23.07445782212138,25.98902247390673,25.043499139570006,25.582000292058975,22.11349642043825,33.54213060574183,30.002140442129974,13.946114102126607,14.568797009889046,34.92214161917502,37.43548796037321,19.44932844574435,19.1541273176078,21.681133668227677,21.59613775016642,21.926063115058884,29.342729447916817,25.942301160960664,20.025381010240682,28.72712444640214,16.622492792760426,24.64988317035254,22.756867067211136,10.878646249408748,34.55823692412818,32.96467009151012,34.914748737266336,33.013572497895524,35.505993789321714,33.114911641722166,25.53355424250534,19.658476548897475,35.18174257002961,31.10467071771663,25.939015669062158,23.67484375756468,30.213686266785928,26.23913042599779,27.04811082959054,31.07046429933859,33.617015338163775,33.64513099838457,32.6347030695823,22.67301600272167,26.49718758610252,35.687189082366146,23.085826174343303,26.208915114441698,15.930377643080604,29.6703641520414,13.266428320922557,19.931787981774093,17.315339810907012,27.408626276561424,22.56204115196188,32.86309144383382,19.488112920525467,30.172959679817957,19.360437508561102,28.769913401299956,26.106198514822932,20.114520906122692],"beta":[14.216136166270319,10.836991186948971,13.610247154777554,12.461545597006554,18.0054604000156,15.128744946971619,11.398611357237145,18.515112453882878,19.880303027993467,10.807512038429778,18.114295530648754,18.02573287118929,17.588293733576492,10.876431993802889,17.99324698595008,10.949062340212235,15.311593529623321,17.433271982642392,18.138768131697525,15.694159299771052,15.226674310043173,15.50416416586815,14.739910003753444,17.084626385078934,16.24700672181472,10.009363336522203,16.951777118427273,18.516875184443258,15.053813296647817,14.692947642542505,10.016699810738448,10.825318816487364,18.386398989238565,17.11260529099595,11.689656672746517,11.663055832325703,11.392935678276766,18.26455515115739,16.4500418470924,19.39458764605938,15.793166542952585,14.598803277100394,16.766565867542297,19.496462109722557,15.591257282232247,19.06658800626427,12.835770475404878,15.962258592856065,12.49582672462535,10.682793131807323,13.852662308369439,10.130050795107003,18.73241572372425,18.09807524441488,13.156639583720827,15.881182107843067,16.609461466693045,15.303467286057483,19.787781300601353,12.625526976812889,15.749183084163134,15.593734035168588,16.55126192697344,19.024953924093122,17.945918551842226,17.998918754954314,13.581813246696019,15.759610332362922,18.210069344023687,12.359379139675129,11.075613115556077,16.54454728339126,11.024202216780894,14.562627197199593,17.98724411812912,13.164706423439494,16.046963098049055,11.861580625481885,11.203270639374253,17.411132696927226,13.396241904424514,15.252717265024687,10.518755017073554,10.387354193605487,13.885979600012764,13.030389053932117,11.089437799306847,13.129601576026706,12.7249643838313,10.519941996279961,12.906772732576163,16.263960281499592,13.81201564268357,17.272102083162036,19.018033741087258,17.80628307659979,18.248478800787694,14.553500212106004,18.774047505975687,13.096415611858248,19.752560848235603,11.10570957111036,19.62622238118832,15.897791655640008,16.952683233484258,18.164454724231327,14.779843469990965,15.394988548603543,13.461507064500811,13.287784499367156,17.925088199821932,19.463334003775465,17.293262507319728,12.524777033809052,13.277026356435606,13.8710799957507,19.919019405543708,10.5626374901744,10.912094622286334,16.799006262021376,17.178608867248876,17.956186841707076,16.44459528946279,16.2636730721238,15.680959918766234,13.925961237174228,14.355662495527595,12.872229664030783,16.30124930998181,13.772955262381164,11.026397438133957,11.946475986103842,11.555067080510648,15.920344567448765,10.640852478832482,13.79901726184703,18.759919442138205,18.002286445095663,11.259225722917314,15.020851509052893,16.550187347424295,14.511132524697668,17.56621225974904,14.600955385040578,13.418889991027193,18.54584572693796,11.070394021975948,12.04599853449154,18.553745227617195,12.874657874598437,12.265388198161942,19.57784985420721,16.00045601726929,18.203964881502493,19.14877126172827,11.245274005410925,16.840819948129838,19.643299882916935,17.01153748308034,14.388865431595315,15.541931569083715,14.160017812940202,13.750757907997166,14.988045532960077,17.71518165802405,13.038531972107371,13.277096459692519,17.83286354145792,15.47040326357993,17.036825524370713,13.23072111823633,12.09140070361589,13.649186646306791,10.438956523583471,10.212733785188849,16.206528706768744,19.475779129712265,18.932571447379743,19.397778339535904,14.873854157333287,15.905827957358323,11.080167380724497,13.571044162101646,19.62553596065341,14.778758930521398,16.643284963135812,17.192965103523186,15.175558631031222,17.65914886871728,13.676900663467693,17.51210387498881,15.042176616315782,15.56791329231978,12.288461805341406,18.677537107958315,14.429282450983383,17.38037352429511,16.336956383777736,17.460054866742293,13.533949828253736,13.499017355769611,14.4361610016725,11.752890282634553,12.263374189061295,13.83454014558426,19.518718401234313,13.484457511762749,19.52309047141963,14.296529776107356,10.60589585538992,19.667336001283772,14.191263269816472,18.91571122798151,10.124367103633542,12.923860322980127,11.353823058256005,11.266575335845289,14.328250528206308,19.425820020405148,19.080225324790668,18.900316084882554,14.8262755738979,12.05603572311196,18.578320677189343,17.642654936829828,16.04512664563562,16.146425720050573,17.658475813863355,14.316384468665799,18.96635617049114,16.95679951543383,17.483518087833012,14.538588005656942,16.145652206848872,16.768890622538738,14.148891369815718,12.55784452280767,14.750830355087084,13.740016519953608,16.54851083843983,11.41043906434044,15.179341677536433,11.959678983355852,19.559315416963088,14.43342662086151,17.629724381225664,15.076103043973099,12.98060989636226,10.572070922728967,17.764413616692366,13.651189018644613,17.813209031978527,14.507994017967897,15.804907906850085,13.447455039005282,10.767984692629245,15.281301286621376,16.384783656761236,18.23871931320631,13.124954217585636,16.239538931995448,12.141337230720238,14.028665893782398,15.372506977378125,10.262531754434985,11.177437244050646,17.55969782448938,19.026881071211314,15.464930131409982,13.282437531205016,11.222089716184334,19.796289107534637,17.029479195094137,16.886776451642117,16.19596223046718,17.051861379631816,17.34376991641488,10.545827267597758,14.444954637196785,14.391530050416803,17.294165810426747,10.390351720977545,19.27950122293069,17.84079492739597,13.529121912837008,16.10092340215393,10.8086111147861,11.935694392515694,13.292869161886467,11.403659663356908,19.242071524463128,14.53635601016363,10.169290561591398,12.537907297129621,17.752589953862568,18.418300470902945,11.688981492395401,13.51102330619917,12.2120471578259,18.61621077620505,15.57779901337035,13.350511321447641,15.835566808521053,17.159819416385833,19.829544521404735,13.750833548200433,16.248357924181853,15.916291208844742,12.438957848296264,12.828452390487502,11.139335436275779,18.590295588798153,15.63252129099778,15.71821669124014,13.115456742956752,18.315510568096265,15.95747204495158,10.24514052581377,11.45498295434969,13.982096912941529,16.673638612731125,15.375152235278831,10.308480133917595,19.27600523998867,13.677401155481792,17.936824409273108,10.989291396878798,11.452421858201362,10.548144345753421,19.966537838776656,11.142425288317035,13.347162681716808,15.520761107582594,18.726630960592335,14.069724045727783,17.93785424905101,12.158511131376383,13.793979220501495,11.880510298677605,13.180655451198506,19.869768064831604,13.764192331251445,17.63790630580708,11.464183259327092,17.100367531990784,18.0122067065764,16.884249861222973,11.963570150508593,19.262310540272658,11.714430034611782,18.761300620219483,16.461242670157112,15.93676083214194,14.839856601090492,14.031619425399258,10.683935081414022,16.08457990204122,15.1454838324492,13.984918452994075,10.241222840197587,14.525856633982269,15.764784836159158,15.931472984249078,13.553795856993498,10.8396704040166,17.650864938539122,14.71276527768206,14.041887548606846,19.610605351875495,18.854728676369493,17.558749885982373,14.468085319225867,13.590899760939672,18.940829633930196,16.661874075381697,10.93335474968242,19.14189767864682,10.700495158562923,14.489451388041001,12.835912951813386,12.22486740402852,10.076896190819863,11.789701105684092,12.038813178505507,12.224245530381152,12.070903207612494,15.40984963930632,14.134838977392729,13.991651112972917,17.127066851661784,17.31818243094979,12.23261651620998,19.271164018133526,13.095967997013494,15.27607410809313,11.29575988926435,14.468460196198027,16.678591430073062,16.345246381890405,11.85967307754286,16.984504653422572,13.716874716241737,15.644091665727542,13.750705656959259,10.877748311097369,18.349185350481303,19.813807999949656,17.056820420403966,14.570651071907609,14.573883584253633,11.525766705947849,15.065404605580643,15.29884184141082,13.758077222341713,16.19752671565876,16.765272604291322,11.026246376890914,10.36322255846845,15.618183818995908,18.68089788216828,19.57215703016138,11.082295850298019,19.488952967030983,11.59990413653643,17.26179435099241,17.544188112167774,15.787461669162743,15.10999564411539,18.20672203533603,14.170480202216691,17.61791500958707,16.32070888245698,14.33723299296155,12.50635136337122,11.430668006065412,14.66395283712182,11.455283272480948,19.726214185207624,16.806134641924732,18.33409303947726,19.254560478476705,11.785016472828357,10.039640518468486,19.844286700474072,12.782561558721856,10.444362830758156,17.554809785528462,19.753580222531077,13.46075523054128,12.204589090905722,19.749425225156898,18.974421110866068,11.02061535496176,13.623712815802083,10.589326163333066,19.835476675840553,16.204984806479047,12.26012846311739,15.404495697258206,17.139653222290367,16.037670658142787,15.160731393069128,12.56842991214187,15.205529354748819,15.575837585969033,18.719243161164446,12.977151416993033,17.838527320168723,15.832735174915937,17.82169946597994,12.798601680052125,13.09374197752369,10.521470513591076,17.274324130685265,17.88903207339677,13.724521472100154,12.198699079557985,14.283609152627669,15.244559782054793,19.076209942362894,12.879621533496346,18.68257901853401,14.613821285326676,19.904363414515846,10.010475235127842,11.14390517227282,11.445735253644875,15.444795447739189,10.697537682139014,19.15660310969765,17.720451650364552,18.719909385252613,15.981024724040012,14.467734929611517,10.964653548507656,11.52373358850901,11.667166774347486,16.64917106023489,17.12567237172901,14.335354258805687,15.591130410009503,10.589247033974827,14.414133150707812,18.789902341441046,17.168166412487587,13.624271290591658,11.025793007482093,14.900995119496638,16.556421782800133,12.788147706717282,19.3669020267329,13.114174020732932,19.821703967418383,17.44933787528432,10.088448939264625,14.321381083556584,15.287760108376654,17.023571756684756,18.04284493094775,10.606993870984894,17.491651274121338,13.404929207709785,19.780998965427376,19.891906495843358,18.060240078308993,10.517546244555547,17.8212831138714,17.826504047774485,15.49763892758111,16.625151148425473,16.371635362727467,14.278092301655832,13.250063877037622,11.352832310098812,15.566319998914384,17.54203412121757,17.64232207136056,16.562848982564354,13.362469963040402,18.017722630277994,10.370436907115817,18.728782920593066,12.144911629308366,16.433578244436426,15.15349631104661,15.339676442800718,17.52373761219595,17.065354085133333,17.868555679110923,18.851584729295883,12.345032382305735,14.686415575774877,16.00397307721797,19.647568065012056,10.552117549241224,11.45925933308889,10.230999982226033,19.64824283349907,18.615637193034036,19.06370770865403,10.796037907849085,13.480556774723677,10.24207873819515,18.838329426407434,19.438308052764416,16.273062587648564,15.562913725143401,12.873823883819579,14.372920941613248,10.054063882099628,15.914816748736111,10.452783188761845,19.15488718755277,18.145516480021005,10.824833708137566,18.24822656504807,14.359896155235859,17.801529115668373,17.32499128276107,19.225538964794353,16.408349341969107,10.169030891910918,13.923320235865798,10.533199849376501,15.153621076489397,16.231388170489325,15.925844673831978,14.781758385677836,11.726950278792215,17.31670071812514,15.260323653668408,12.45770365149723,14.207334489107438,15.376589117097765,15.410417654625125,11.28589242895653,16.907248787657913,12.175472447192114,13.568492742854307,14.79661974771329,10.411074108063687,17.574590991440257,12.391398000682196,11.637586870631635,14.564334467648445,17.100009046893604,15.40634825337454,14.246155000533737,12.757446176586523,19.75895846130485,13.005799344117559,12.859865317305193,13.713463709519104,15.791211528393283,11.05959446417434,10.5139062312943,11.994786870406886,16.142662341347517,18.937895610040187,18.869380840145034,15.54939119092583,12.312670340846958,17.90198664100104,12.286240769778606,13.420689391116893,13.539195185694785,13.578483928404976,19.145917079079652,17.79079288501245,19.927411271506394,14.163321267754496,18.77849431646075,16.307548231558773,14.205968178868876,19.03956240504769,16.323378206420124,12.880904070261005,16.694223963468705,19.606902676579654,17.041796108346176,15.364970067539172,19.20824068064886,12.02739703035151,15.57250640194269,14.47314296508851,13.85294493971043,15.502954083933071,12.975982654617733,12.510677956974476,10.797650569574365,13.781341481126539,11.995545789636095,13.74119705835331,10.976459943596037,18.060235989878528,15.155966052273318,13.874293294034372,13.064175106898308,12.115214009867524,14.133272401255063,16.16361516157167,18.01270990720454,11.815961284240057,15.25590305815301,16.27280552533808,14.543323759667896,17.234749257521777,16.951968551712035,18.84489859607919,17.703726931179432,13.796642248730468,18.70585245752636,14.699622381523021,16.579772468987528,13.195489747691838,18.751279510651162,13.932508087006548,14.392315915981502,14.312078548170827,11.479801613760813,11.898252616796164,14.935417859568368,18.634761331685663,18.7325413052467,12.685298632226674,14.647689400506623,17.575312703706246,12.141457243807725,11.620509883352206,13.430619506621968,17.70765995662012,13.568467946500766,18.98601050045265,12.441516576218694,19.272226299481762,17.55787545021215,15.549685340810854,11.083390628040009,11.050994533512636,13.815060015152923,13.258032133384454,17.568040814492033,19.715953741216904,11.6448736976431,15.960906778853703,11.970900479270657,18.784363172624126,19.84263510527184,10.40517065424153,16.195616889526086,13.12835021572498,13.407067293282207,13.645069046704554,18.10347016192541,13.678474601395314,13.022609693531976,15.41475692540854,19.078847720489406,13.980860693211062,10.43119531272791,18.788740913908853,19.84341601595568,10.469301679110835,11.477463896818199,10.059866241244519,16.3005377641341,17.976961679289943,14.552166406483165,17.16580725916716,11.222389323956579,16.239100121110646,15.60258587724649,12.251684553796734,17.411918552127887,19.462008729667993,15.546389782025754,12.840247998846262,17.07583058154502,12.259129777286518,11.485683914479385,12.43408826583018,13.628716304207945,16.498848117725778,14.586298012005475,13.615051487684905,12.298326282455479,15.906881986720663,19.842752343807998,18.92889935677509,14.349613837738985,16.723021281780213,18.958846295409433,17.07044375482737,10.239288029531838,17.962496465863545,13.174172114599616,19.43124391042907,16.55408501926059,13.977013496049967,14.770970997876642,17.782243376478547,13.642735161660662,18.985840356134908,16.30615002486439,11.661577315147793,14.426262281024089,18.0569655810303,16.22446716705717,15.857108475940521,15.318859282806411,11.984443306668247,19.807584141634877,11.120650905769038,13.57525854011036,17.260425972024933,13.82159876931289,12.751512403354312,14.55250634128811,18.621327082768033,17.39742725746848,15.298825450982035,16.043393291899854,10.572657967468917,14.75794482282997,13.578013591593031,17.247083663758453,17.883229868427627,17.179999734387152,13.938717710035924,17.214972120839146,12.741155024006375,18.296684310035815,10.567008497599133,17.28656641379252,10.740924677413428,14.80144865305707,11.51442217094451,13.471914928135833,17.89836003486921,16.77166904708505,15.242036357393385,13.963034709901523,10.228569856560657,14.758667634536256,16.927242517967763,13.860418258320045,16.721579096891617,15.412281272978392,17.93740784005017,19.50011460302062,13.386252581198848,16.768640962955914,10.060040680409628,19.51753954432887,11.328304505344558,12.254001484054346,11.729880667891056,12.662393877348837,11.135623536749836,10.681898309039822,19.057246152961458,16.71027456687944,15.229895142726066,13.884163189928794,10.297792604516545,10.257959461051101,13.564071525520662,14.929186412519744,10.182859716066021,17.70471925570397,18.126509994181554,17.44566479888095,17.066934051637357,17.04552757702566,11.840292213630283,10.346633918101261,19.373878896454414,11.71726412182798,16.085455051139952,10.08547307743891,11.867990391990046,16.63447294167954,13.216538957006401,18.30805905205564,13.371883846796385,10.654675925194546,16.810228208644908,18.605244751752426,17.088115076517326,14.46405997315978,10.2302457513576,19.116995790088648,15.734715158386429,19.96096015788495,18.838629272477796,17.8332342165522,10.78276478565481,18.942243351313053,11.180210191393831,19.178943831512555,19.271094068807876,15.201042532147833,18.88451906833202,14.580529316501602,10.11654794231343,19.769820519844764,13.005977282723782,10.608545431618612,17.77015102591844,19.92038548704931,10.842457270484394,11.1395371749745,13.080404667398922,14.931727715446401,13.384342192539956,13.052628120400868,15.043519833361035,11.716045846195687,18.235689135378195,13.435785331211017,11.941715055159491,11.058253289146808,19.046311107590157,14.302627986322973,17.2395226212936,16.07682869877269,13.644459056169884,16.03209391518341,16.6406413069826,12.585062353689569,16.34983049049339,17.44601501719088,10.216933369625856,12.776887186327547,18.233111507833783,17.797166905869258,10.187723211208077,16.778792751791986,11.614912978499683,15.7018305618795,19.54938191615384,16.595033821981545,16.70044644873287,17.64289710196158,17.586510548971017,11.873824086410245,18.313070031274094,15.29479733711205,14.218018874863606,15.110870512256193,19.50330670651815,17.83691263465432,17.445175201078744,18.784388754372802,14.864098594684151,18.528384820557907,11.909081591058374,17.528851134763087,15.811173261754245,16.90553575966488,19.818697522448716,16.48712967132971,16.653992754716214,19.59614803390454,13.991765344154594,16.899662614085848,13.639077127826155,12.023336349347971,16.220117867354745,17.774665267212157,12.117914123977759,10.65300992042443,13.237362964495645,11.257590569702296,19.060445506876093,16.866219844785086,15.026585607233349,15.664807908197336,17.682630938238333,12.096841352676629,15.303908039177937,14.144855883911646,10.059491425739484,17.58270894636777,16.43634255954987,13.79032598854099,12.174641821643522,19.070184045665393,18.291425959616458,10.804903020082557,14.176454231477923,19.122650094592032,13.986878300304696,19.8020270146107,17.968572294238427,10.385169131039167,15.940131132875663,10.603760402781209,10.127644612871602,16.662626125110783,18.150122987143362,10.613443213107336,16.326870602929613,16.484656952383204,19.30549700661972,16.8412239956521,16.139878903260545,15.982916236859486,16.19359472966199,18.90642334849769,19.238986257475297,17.911787777869996,10.968611298191426,15.519208940943008,13.890905638050752,12.156009282525703,15.736952549370677,17.4189585086865,17.316021939315846,17.336040115398067,12.810770267980068,18.586724731959457,14.813972478402862,18.628673113750878,15.178492555122018,16.872720546415188,13.924745030032255,12.682714798875836,12.668749149208153,11.365758887530808,13.749246107517443,18.187537189792934,10.616422962717644,19.507460147454626,12.805485076639904,17.26694741804235,14.416259640572752,13.058054295710647,11.62887891037357,14.532083338108041]}

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
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0, 1.0 );
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

tape( 'if provided a valid `alpha` and `beta`, the function returns a function which returns `0` when provided a number smaller than `beta` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -100.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, -1.0 );

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

tape( 'if provided `alpha <= 0`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( -1.0, 0.5 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, 1.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, PINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NaN );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var pdf;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var pdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var pdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( alpha[i], beta[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/pdf/test/test.factory.js")
},{"./../lib/factory.js":115,"./fixtures/julia/both_large.json":118,"./fixtures/julia/large_alpha.json":119,"./fixtures/julia/large_beta.json":120,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":276}],122:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/pdf/test/test.js")
},{"./../lib":116,"tape":276}],123:[function(require,module,exports){
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number smaller than `beta` for `x` and a valid `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -100.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -10.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -0.5, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.5, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `alpha <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0 );
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

tape( 'the function evaluates the pdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large parameter `alpha`', function test( t ) {
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
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large parameter `beta`', function test( t ) {
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
		y = pdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/pdf/test/test.pdf.js")
},{"./../lib":116,"./fixtures/julia/both_large.json":118,"./fixtures/julia/large_alpha.json":119,"./fixtures/julia/large_beta.json":120,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":69,"tape":276}],124:[function(require,module,exports){
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
