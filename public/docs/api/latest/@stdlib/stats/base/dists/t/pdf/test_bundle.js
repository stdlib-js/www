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

},{"@stdlib/utils/native-class":164}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":164}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":164}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":164}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Euler's number.
*
* @module @stdlib/constants/float64/e
* @type {number}
*
* @example
* var E = require( '@stdlib/constants/float64/e' );
* // returns 2.718281828459045
*/


// MAIN //

/**
* Euler's number.
*
* @constant
* @type {number}
* @default 2.718281828459045
* @see [OEIS]{@link https://oeis.org/A001113}
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/E_(mathematical_constant)}
*/
var E = 2.718281828459045235360287471352662497757247093699959574966;


// EXPORTS //

module.exports = E;

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

},{}],45:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{"@stdlib/number/ctor":105}],54:[function(require,module,exports){
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

},{"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":83}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluate the beta function.
*
* @module @stdlib/math/base/special/beta
*
* @example
* var beta = require( '@stdlib/math/base/special/beta' );
*
* var v = beta( 0.0, 0.5 );
* // returns Infinity
*
* v = beta( 1.0, 1.0 );
* // returns 1.0
*
* v = beta( -1.0, 2.0 );
* // returns NaN
*
* v = beta( 5.0, 0.2 );
* // returns ~3.382
*
* v = beta( 4.0, 1.0 );
* // returns 0.25
*
* v = beta( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":74}],73:[function(require,module,exports){
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
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 709811.662581658 + (x * (679979.8474157227 + (x * (293136.7857211597 + (x * (74887.54032914672 + (x * (12555.290582413863 + (x * (1443.4299244417066 + (x * (115.24194596137347 + (x * (6.309239205732627 + (x * (0.22668404630224365 + (x * (0.004826466289237662 + (x * 0.00004624429436045379))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.00004624429436045379 + (x * (0.004826466289237662 + (x * (0.22668404630224365 + (x * (6.309239205732627 + (x * (115.24194596137347 + (x * (1443.4299244417066 + (x * (12555.290582413863 + (x * (74887.54032914672 + (x * (293136.7857211597 + (x * (679979.8474157227 + (x * 709811.662581658))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C++ code and copyright notice are from the [Boost library]{http://www.boost.org/doc/libs/1_85_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var E = require( '@stdlib/constants/float64/e' );
var EPSILON = require( '@stdlib/constants/float64/eps' );
var lanczosSumExpGScaled = require( './lanczos_sum_expg_scaled.js' ); // Lanczos approximation scaled by exp(G)


// VARIABLES //

var G = 10.90051099999999983936049829935654997826;


// MAIN //

/**
* Evaluates the beta function.
*
* @param {NonNegativeNumber} a - input value
* @param {NonNegativeNumber} b - input value
* @returns {number} evaluated beta function
*
* @example
* var v = beta( 0.0, 0.5 );
* // returns Infinity
*
* @example
* var v = beta( 1.0, 1.0 );
* // returns 1.0
*
* @example
* var v = beta( -1.0, 2.0 );
* // returns NaN
*
* @example
* var v = beta( 5.0, 0.2 );
* // returns ~3.382
*
* @example
* var v = beta( 4.0, 1.0 );
* // returns 0.25
*
* @example
* var v = beta( NaN, 2.0 );
* // returns NaN
*/
function beta( a, b ) {
	var ambh;
	var agh;
	var bgh;
	var cgh;
	var res;
	var tmp;
	var c;

	if ( isnan( a ) || isnan( b ) ) {
		return NaN;
	}
	if ( a < 0.0 || b < 0.0 ) {
		return NaN;
	}
	if ( b === 1.0 ) {
		return 1.0 / a;
	}
	if ( a === 1.0 ) {
		return 1.0 / b;
	}
	c = a + b;
	if ( c < EPSILON ) {
		res = c / a;
		res /= b;
		return res;
	}

	// Special cases:
	if ( c === a && b < EPSILON ) {
		return 1.0 / b;
	}
	if ( c === b && a < EPSILON ) {
		return 1.0 / a;
	}

	if ( a < b ) {
		// Swap `a` and `b`:
		tmp = b;
		b = a;
		a = tmp;
	}

	// Lanczos calculation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	res = lanczosSumExpGScaled( a ) * ( lanczosSumExpGScaled( b )/lanczosSumExpGScaled( c ) ); // eslint-disable-line max-len
	ambh = a - 0.5 - b;
	if ( ( abs( b*ambh ) < ( cgh*100.0 ) ) && a > 100.0 ) {
		// Special case where the base of the power term is close to 1; compute `(1+x)^y` instead:
		res *= exp( ambh * log1p( -b/cgh ) );
	} else {
		res *= pow( agh/cgh, ambh );
	}
	if ( cgh > 1.0e10 ) {
		// This avoids possible overflow, but appears to be marginally less accurate:
		res *= pow( (agh/cgh)*(bgh/cgh), b );
	} else {
		res *= pow( (agh*bgh)/(cgh*cgh), b );
	}
	res *= sqrt( E/bgh );
	return res;
}


// EXPORTS //

module.exports = beta;

},{"./lanczos_sum_expg_scaled.js":73,"@stdlib/constants/float64/e":42,"@stdlib/constants/float64/eps":43,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":70,"@stdlib/math/base/special/exp":80,"@stdlib/math/base/special/log1p":87,"@stdlib/math/base/special/pow":90,"@stdlib/math/base/special/sqrt":101}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":45,"@stdlib/constants/float64/high-word-sign-mask":47,"@stdlib/number/float64/base/from-words":109,"@stdlib/number/float64/base/get-high-word":113,"@stdlib/number/float64/base/to-words":125}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":82,"@stdlib/math/base/special/ldexp":85}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":79,"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/trunc":103}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/max-base2-exponent":51,"@stdlib/constants/float64/max-base2-exponent-subnormal":50,"@stdlib/constants/float64/min-base2-exponent-subnormal":52,"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/copysign":77,"@stdlib/number/float64/base/exponent":107,"@stdlib/number/float64/base/from-words":109,"@stdlib/number/float64/base/normalize":116,"@stdlib/number/float64/base/to-words":125}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_lp.js":89,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/number/float64/base/get-high-word":113,"@stdlib/number/float64/base/set-high-word":119}],89:[function(require,module,exports){
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

},{"./main.js":93}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":94,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/num-high-word-significand-bits":54,"@stdlib/number/float64/base/get-high-word":113,"@stdlib/number/float64/base/set-high-word":119,"@stdlib/number/float64/base/set-low-word":121}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":96,"@stdlib/number/float64/base/set-low-word":121}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":91,"./logx.js":92,"./pow2.js":97,"./x_is_zero.js":98,"./y_is_huge.js":99,"./y_is_infinite.js":100,"@stdlib/constants/float64/high-word-abs-mask":45,"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-odd":68,"@stdlib/math/base/special/abs":70,"@stdlib/math/base/special/sqrt":101,"@stdlib/number/float64/base/set-low-word":121,"@stdlib/number/float64/base/to-words":125,"@stdlib/number/uint32/base/to-int32":128}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{"./polyval_p.js":95,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/high-word-abs-mask":45,"@stdlib/constants/float64/high-word-significand-mask":48,"@stdlib/constants/float64/ln-two":49,"@stdlib/constants/float64/num-high-word-significand-bits":54,"@stdlib/math/base/special/ldexp":85,"@stdlib/number/float64/base/get-high-word":113,"@stdlib/number/float64/base/set-high-word":119,"@stdlib/number/float64/base/set-low-word":121,"@stdlib/number/uint32/base/to-int32":128}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-odd":68,"@stdlib/math/base/special/copysign":77}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":45,"@stdlib/number/float64/base/get-high-word":113}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/special/abs":70}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":102}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":75,"@stdlib/math/base/special/floor":83}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":108}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/high-word-exponent-mask":46,"@stdlib/number/float64/base/get-high-word":113}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":111}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":110,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":112,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":56,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":70}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":115,"./main.js":117,"@stdlib/utils/define-nonenumerable-read-only-property":157}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":115}],118:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":112}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":118,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":123}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":122,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":126,"@stdlib/array/float64":1,"@stdlib/array/uint32":7}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":124,"./main.js":127,"@stdlib/utils/define-nonenumerable-read-only-property":157}],126:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":110}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":124}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var beta = require( '@stdlib/math/base/special/beta' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a Student's t distribution with `v` degrees of freedom.
*
* @param {PositiveNumber} v - degrees of freedom
* @returns {Function} PDF
*
* @example
* var pdf = factory( 1.0 );
* var y = pdf( 3.0 );
* // returns ~0.032
*
* y = pdf( 1.0 );
* // returns ~0.159
*/
function factory( v ) {
	var exponent;
	var betaTerm;

	if ( isnan( v ) || v <= 0 ) {
		return constantFunction( NaN );
	}
	betaTerm = sqrt( v ) * beta( v/2.0, 0.5 );
	exponent = ( 1.0 + v ) / 2.0;
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a Student's t distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 2.3 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return pow( v / ( v + pow( x, 2.0 ) ), exponent ) / betaTerm;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/beta":72,"@stdlib/math/base/special/pow":90,"@stdlib/math/base/special/sqrt":101,"@stdlib/utils/constant-function":155}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Student's t distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/t/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/t/pdf' );
*
* var y = pdf( 3.0, 1.0 );
* // returns ~0.032
*
* var myPDF = pdf.factory( 3.0 );
* y = myPDF( 1.0 );
* // returns ~0.207
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":130,"./main.js":132,"@stdlib/utils/define-nonenumerable-read-only-property":157}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var beta = require( '@stdlib/math/base/special/beta' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a Student's t distribution with degrees of freedom `v` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} v - degrees of freedom
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 0.3, 4.0 );
* // returns ~0.355
*
* @example
* var y = pdf( 2.0, 0.7 );
* // returns ~0.058
*
* @example
* var y = pdf( -1.0, 0.5 );
* // returns ~0.118
*
* @example
* var y = pdf( 0.0, NaN );
* // returns NaN
*
* @example
* var y = pdf( NaN, 2.0 );
* // returns NaN
*
* @example
* var y = pdf( 2.0, -1.0 );
* // returns NaN
*/
function pdf( x, v ) {
	var betaTerm;
	if (
		isnan( x ) ||
		isnan( v ) ||
		v <= 0.0
	) {
		return NaN;
	}
	betaTerm = sqrt( v ) * beta( v/2.0, 0.5 );
	return pow( v / ( v + pow( x, 2.0 ) ), (1.0+v) / 2.0 ) / betaTerm;
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/beta":72,"@stdlib/math/base/special/pow":90,"@stdlib/math/base/special/sqrt":101}],133:[function(require,module,exports){
module.exports={"v":[0.641898536168779,6.890769800076346,11.897951030254369,12.43433105120857,6.913669654101846,6.652127108409629,16.36602083066116,6.3637785079616105,0.4498613446666999,3.178083358892718,19.578246959945005,12.494694738275896,17.741266048052573,0.10670073213032705,9.899303019647823,14.416538579541868,9.311590493418764,10.668837710774252,18.77740586566716,8.483691102887377,7.7346791261032966,5.5740580588774735,14.231428220489413,0.22372144171079356,11.06530830609714,19.703657236002556,12.541492746317516,15.103270400328107,13.339112748900956,8.533700251700335,13.6002872358516,11.854893549760494,3.1111051077003404,12.731631351941889,9.909894367456928,5.875614854542994,5.706042668796041,5.501277239851716,13.185379700493932,1.418068687349936,9.274908019374056,1.035012817177745,1.245832413603143,1.8855009386767918,4.066449735061322,17.486219958487354,9.833439010347673,4.534565299040247,2.576655291433445,10.81255434843313,0.3814269831965911,11.73170616968832,1.9252590383405854,4.962873680386042,0.40150157620354676,12.818353263330069,14.105578428804662,5.501063827190333,17.065269751808486,14.647645710545127,14.465657630349735,12.207730951606056,9.235828413528665,10.311913824919436,11.381287771218336,2.990637054559029,7.595292550445234,2.377720634279581,12.796214434457749,0.5035615844529939,9.5885128343356,5.259395764150772,14.941413114112972,5.283367691020624,6.3942674454119475,18.73184268371655,9.935440929700864,12.267432745464223,9.838682316966736,4.695199144496605,19.639763267220005,1.139955939744075,15.217180213451176,15.10696198530811,19.90368961036609,18.84282223136582,4.066246853791093,7.889740140253614,13.151661821888245,16.458188491851683,0.005519240401694603,8.313139206154032,3.3889908602383434,9.381469926081166,11.077928551617816,8.723873053190925,4.551429493359231,18.824331110540832,14.571975707302457,14.973073048825194,13.838445740918788,8.29135265068986,8.045460817538931,1.4396318816522191,1.8812318877180179,1.0594459726006633,0.4019392961106316,3.804492645966433,0.6677964270787351,18.926112330902264,15.013409901495024,4.0897349401919,11.927862260715516,9.695208879325957,13.27352556034825,10.72085348165103,10.111472323511613,19.16779892651631,8.890223103790822,1.02611168160756,19.214818579119108,11.164957182772266,11.893110390110767,2.2315293803755765,11.141991783595472,10.025271686754525,16.991149692912447,17.098906293622242,13.930844347991119,2.823620499956041,19.7535022499439,9.995447820221752,12.253670570135418,3.9794927111391853,18.56546221064432,1.081963318257455,1.6233822001951648,12.766821851614747,19.995243983216696,5.998585591789998,16.41311886980045,18.58098802425593,12.881460633941572,0.8956872165777829,8.574415898286375,12.924637746571745,2.4254605543908037,18.5969796770499,8.4028452429582,9.192052351757285,11.792099337727961,7.8049293480267945,3.823527110258693,18.289466568760222,14.622223679288187,17.62566473551539,9.037822829735065,16.008843239270952,12.115681067384156,11.650502735208415,8.385151477801909,7.811905235389909,8.034007397580192,16.85163512975012,2.146827989140614,17.276775193116265,7.19726808337342,11.139757310214403,13.277302067180026,1.7386209562144206,5.078694564793755,9.285665781174162,2.8857328348789046,13.582756580759936,2.4517086519468423,6.145825641323706,0.43404347576062374,7.290386006523328,14.945567918524958,5.2198779257211925,14.572622766366594,15.093946065839589,15.063042060133478,18.92921040639468,13.372884376555042,8.450628796839638,19.399692501684946,0.4796804721967973,16.321848291840134,18.99302875483972,12.087704329285893,10.042920136539347,10.12723759645346,7.992652034655219,13.575695457808848,15.942263903505092,5.125890510387134,16.332675408539767,10.262876634933086,11.638452865990265,19.39392604352549,10.685020290381576,6.6125178263909845,2.475366425974941,2.4631930515561162,0.5656605276325344,7.541598566394976,13.642997982604971,18.996615098275797,3.8895739124147655,10.725767324334496,14.639376427504338,5.780773070299472,3.09843661170774,0.7589564913512348,6.4155761566398395,9.810982772445872,10.000115827114353,13.481486732164655,1.4993991131539675,17.401634580109018,0.6050827699454508,11.960111393785095,10.404463065847382,7.164866921040676,19.4182674616577,2.8775193716570735,0.7857575064972666,1.5088783384694837,1.2120162276317847,16.071210575219613,16.16392476202678,18.27829566014161,11.574875154875643,5.510702021260534,15.531884058358001,0.20222621489471848,1.1916650549656405,5.192453562346411,4.825235246699733,2.445941227920718,9.3984542994769,5.494157026150934,4.190798094664316,18.93396096171784,5.174965236174862,6.432560659885209,4.3993636016474635,10.499916275235623,2.983624706887942,4.262234983345197,3.87332178927295,10.953297002834987,5.16075189307704,8.184298695076508,3.3006766008884503,11.438385761272265,15.663356898740016,8.432398980031506,2.6399440999644153,5.6846784940088435,16.51699633472176,19.207618344226915,16.193478743372015,12.862897145999206,9.891787220879436,3.5599647131556234,12.342773052271326,2.2084291788653765,1.471262236494737,16.54867726769097,3.0816060631386755,11.553493498464142,11.14417747714478,19.227720933416855,11.679528210123378,2.599132028779887,0.36903570606086955,11.00415172642875,0.6914713459091315,7.377195618568297,5.567396390689998,11.858161217988625,11.933308461468751,12.002824687926479,19.524901047762924,17.424003784034085,9.355315436003945,6.312249801312109,1.9714812643446233,19.196463916566678,18.881636514547203,4.207488856550983,18.487702369415718,9.45753788173128,5.008362404912665,12.54269964913238,5.425700370462727,2.8571083673923203,6.0577505699298495,10.784774884091357,8.954555307730043,10.158519453561388,3.783120750488478,8.074825858222145,11.4150355065938,2.7032843759561853,13.210137126650023,4.659680194676978,11.052064061402277,1.6234032746330485,6.337357802530894,5.177492602952096,18.162316401197046,15.44132753390592,19.33609640196229,3.9656169898003757,10.419482256367015,2.3366828572171494,6.874024431640873,18.425946100734173,18.5321748235909,7.772013429676408,8.605699002149056,0.2348738066237921,18.726277116434563,1.6046588741195755,9.503996942023566,7.194472281092925,14.346814854777662,16.224952788359257,17.046237987220337,18.68770289156521,13.806756384306201,8.110833443175025,15.553143204156626,0.3553073093331749,7.120345642701951,16.47398261651364,17.38988014908955,0.7112029728586489,15.270484970050378,7.017485362108213,13.940064875835159,8.78200834241786,10.809794399463243,18.81965834330906,3.5677467928945683,9.984199425138907,16.821200615526916,17.929223462076187,7.397427938279386,13.787776143479181,4.035157067991699,16.00312873819258,11.223474672087157,15.668280644823547,14.649323554105367,19.12196474445959,17.517327455695835,19.400190896858447,10.797868984709877,1.0248020957260318,1.2129841563497656,7.6500216079742955,6.259571056640323,2.558884877475154,14.086699000050293,2.934710700424268,6.740158346981109,4.221933129213382,9.04641992544839,15.387528903374754,1.4998262459303957,8.001435592852989,3.3175829500114595,1.2737528208172222,17.269193194028215,9.680402214497947,8.45984277415993,12.461349507528464,5.457454447143912,2.5585125975070033,9.726521495133444,9.329929970050404,2.1893827475869854,2.3915885393557312,13.986029176414213,10.164704367051932,18.402379803214266,10.50899605709796,3.5526696744911623,5.347151933695193,3.5265757555176336,18.736306322808755,17.897224193056566,11.557361064007651,9.336569002838653,14.986930033968239,3.40848170387245,3.553151371974157,10.703276173993874,3.960703429259982,14.561805538004396,11.793162660506692,6.538033156668339,17.79253952985289,5.115898991549113,15.715766323597883,14.818011730520455,2.9201071744816653,3.3318581196962205,15.993884835907535,11.665777574543341,1.0059197569700107,11.473039755793808,11.97774260332761,4.962836741507974,12.082458433507046,0.8205686649897803,16.68473591171475,13.099279532831627,3.016840343500733,17.405298896963597,6.620903426498317,0.08450899326575279,7.383021852860003,4.221457766887173,8.434785435963793,12.894650044547419,1.0808879851672648,12.110595288161168,7.7659096764799385,15.286634434194873,16.265749403082413,13.623496705274952,16.75599164749263,4.519009891600119,6.919560761952903,14.378470211452715,12.017608369046787,1.1876680553470553,11.243617087365344,10.637437395474677,7.529159346151357,10.709876724865666,7.455362076466243,3.8346298163448944,2.570447425752378,3.1234294108517213,4.655166337393242,14.90033914164,9.085176855124573,2.2221326466336233,9.411274279603044,16.444503314177727,2.011478490538021,11.193097273704357,7.073941144029892,5.035695404307146,15.46446711044907,6.575024488859995,13.500119504961079,18.59333018669597,1.6488511833052488,17.45207332690489,3.360334369878011,12.127913966300547,0.8699454166115617,5.764227963374222,4.681669541135403,5.628583322572194,18.824032794105932,12.802631283571916,17.882594483120812,1.1249250146779088,13.674229673253691,0.3577977518916109,1.688354425424019,0.6643631571427511,5.078420952211413,17.541125762103647,16.970372330853447,2.127673817560445,2.2553307151621915,8.998059124151707,2.8794274871020287,2.3239884000436994,0.42680077319806387,3.789716256189868,19.288462591014074,5.588891116993384,10.952218616161753,1.1376331570364062,14.509624360711392,17.225575338330007,6.832352827525927,2.3817351802337905,17.906196000835884,2.818764770477582,8.236001291950487,13.806510197381506,1.1520704191349918,4.827432097354443,3.3271027160354816,10.879719602815289,12.845355407500097,8.6300427567339,18.310140102930394,14.786600722639204,12.365922305406132,5.092170185512406,13.288480625622157,1.6983830569484093,7.350046582025103,19.543201762777493,12.964992097137443,10.140029777320434,8.610425133687038,4.214523501342846,14.912669489980278,0.6989195931876013,2.524383150148779,10.784114843014514,7.5417096561188,12.85809029718568,12.997614081445427,19.03578983570729,17.890239249996803,4.358751819877766,0.5392187556730521,17.58998129327174,2.2300658236188564,12.712645491158408,2.308278029437809,7.288276968318708,11.48096261860482,2.575840653485799,3.909896905052994,17.797029290711958,9.270310855946647,0.9304712825939987,17.77415353096135,0.510182880910075,11.846881725521875,15.647209250479467,13.786880845291446,19.03868288633364,18.324018821366664,8.298015539747897,16.36673393172744,15.748958287923841,6.141413647667058,5.7933221053689365,9.620077165289986,11.308530042528645,4.243252171694878,5.9979651379463705,8.273594456958353,6.132467831844921,5.652388961544643,9.54369299402349,7.060032753632077,9.91447290312729,16.670299124310766,11.963852201435552,19.24455527599198,12.10627375067764,1.7584770272567152,6.408748126397019,5.081177853596874,4.868053779521668,9.838835817289846,13.018027351339253,4.456035610972751,8.855991144019391,19.60169648885345,10.516256267453766,19.154250947385737,7.828355871151058,12.165214695577076,16.23221608846712,10.921799310327662,3.7801767837362954,19.0551353497769,10.621346323123145,14.138131817127274,8.125085652166817,4.332749000557881,15.250794059431264,2.1407963017467235,6.548907296925699,14.185856218897088,19.528665456191913,13.060853502609572,4.885440587158718,14.748266730745879,10.946029155543746,5.22307505556324,9.940320506964028,3.862979564707043,8.672527100985633,3.329950152023513,17.22060017437289,14.452976510625696,11.049714061889567,2.88882523512334,9.443167134846405,15.90392094808501,8.559719028635286,10.214522882804872,8.048320091634086,1.7373998878247177,7.453951975514697,1.6255305395452924,15.610869446513274,1.3645719417785385,15.544090556025374,13.642995251195549,15.085792676988682,12.728324345076146,4.4862993788394645,19.38688648707439,16.81061034574071,17.871202189507347,2.7609965786619384,3.5199614100480625,11.769464119427298,4.182557986551396,3.5163914246852546,3.536613334726386,11.286149050497368,10.980932867677957,6.47267753542899,12.348746752342205,4.568589802714476,10.587208380589157,11.991244477688197,17.700451049814152,5.3479945296988785,19.287172203983168,9.822911689546139,10.47532429445447,10.460520055132786,5.4742180232318916,17.701055528808972,11.77925277457673,5.294324516179554,10.540465976636346,16.958315486411696,18.79268427709932,8.17341480683908,12.025062768093484,2.098333849384364,7.38326045575906,13.027519833857797,3.5791260494456134,4.596185169378844,18.614817663007315,18.299408438623637,2.939511569031219,19.20996882183331,8.018470976675832,6.864181723003981,15.12775147783174,9.225420045209102,16.07713194513466,9.436000740261395,14.530582132574569,4.261916545272211,12.392359571706955,8.468946128339908,10.846554182496373,9.642068128303132,12.716663487665736,1.6681485225314319,16.527261087604252,1.9678057084732448,2.535288650639851,6.672376386638121,15.065999444732189,11.18740301322148,8.294888723586924,4.161414026039836,5.270108361444077,13.292938755726095,8.736330663654597,11.124151330752984,7.595808907362169,10.147718828486987,4.428437527018878,6.772702127877022,6.355396446547448,17.97932818849879,1.5244499916757315,1.0410380049346957,4.012893407314735,11.988386388381397,10.71279008676074,15.989788192786452,1.0660583880008767,16.978475541351962,15.784560922368067,3.8238221709031572,6.042936845725837,2.381881412373077,18.643889662583405,6.78715371049234,14.97477984069004,2.0080487985776996,16.80246469106104,5.274887218329343,19.24666311675539,9.357298500787206,7.974836382219039,19.013851833597663,9.97873863445557,0.32445066339121365,10.821018128602354,16.23298518500952,19.261076125708318,8.95639943412867,4.735404316408616,5.335028412687186,17.729555843435012,14.385232380548395,1.0792946533091419,4.874028795068948,15.837842809579623,10.112381509334952,3.1036996531175376,16.38492858954757,4.047129893438894,13.066108371571538,7.59410574112203,13.51650208150164,4.537549824220961,0.9652742170303519,3.551157743109652,18.293718521959875,11.464189061466445,16.1135981098623,11.349964512232633,3.7200756000697943,1.6984627347197057,14.675366653080527,9.739569803050511,5.138590499024751,14.24009112658351,8.683565140935134,10.005151661488277,11.017762532505655,0.646813195545386,13.61812928689381,15.421896528578817,2.4068385274995663,10.049747740789341,17.403237789797544,7.367580723846343,18.378395193033924,8.043224227286538,1.2232203933179076,12.41328550719179,1.947644931707888,17.16512899739206,16.261264113946954,13.488423867277536,17.23203266149155,4.492418606754449,11.699098763919341,8.213336089307429,5.689481926068565,11.190610893602265,6.507037661783257,7.959971706646605,9.104503480971617,5.512351544410112,5.100542709604907,14.997149455114034,19.89104833677747,16.10362040854131,1.9290803372978393,3.8523937503392602,15.68680519923559,19.050849927964975,13.095109433504621,4.2280666620579455,11.475972376144789,16.972319009404355,7.291445787152018,17.270071634337015,1.7170602235915666,19.346489031275507,18.557089100662605,0.1733044848307097,15.680070833151088,9.855120117022672,4.237329775841121,19.26927476114392,10.489807720318506,14.520154508910107,0.141155582500736,1.1371061768934698,1.9781962177183132,12.13000523768191,19.220592844316027,4.975960502465724,8.393496323705666,18.540328212826502,7.797531593756255,15.081394912129845,8.161089883267035,10.90181542748561,3.244706972773521,6.294805132455652,12.323057980978028,8.290213329581174,10.46588610756055,18.02755630884869,9.055493724319579,0.9150053584314177,6.084086618926272,18.981707128733326,19.974855668870614,16.63708560926359,14.860013374882675,17.162268118624226,15.36806455624971,10.516868584885945,16.410388033436284,17.458766878335634,10.126017944510505,2.550810757405473,19.102068499370258,10.993863090607213,10.650135865389917,15.245496285686855,12.383982657209609,1.2939112165453004,15.012155027748157,8.195213674543332,5.561421324414466,6.097145341057484,14.095235426113671,4.14043403266799,15.221781789447526,1.071178850381811,7.864924700053897,17.550140151055746,18.901717519079284,18.100681326599712,0.8046479962379571,15.136796394191396,10.826416520368598,10.95672973465312,17.629357463147425,17.296539144649145,5.90904727643649,12.903552020428585,17.81411147861342,16.325699026523242,12.95437924629712,7.464504801457044,5.069213915432269,10.422010915329007,8.38360723373745,11.788249184421176,5.797979373080522,11.000010099558732,8.028456636274335,5.494674074972554,18.336044829032577,3.554447076386009,19.97915244707936,0.19201501196203452,11.829685542569068,3.949557168350122,6.763588419769824,0.3726346686550741,15.719081969898001,5.733233622005844,4.744311680833797,17.49428725498953,14.93546389955549,4.941023301635115,7.605547604831799,17.48033861737442,9.964532319188075,3.8612930752942987,3.838561216843739,12.815660175123167,4.169940250035071,4.578526715116595,6.38285775367645,5.954290788439436,14.158599665473947,11.121887048651558,13.47727557755318,1.305951494814277,12.209692784404243,15.670129610430985,18.479664747419115,9.248307132797606,3.39175944269408,16.76978904151401,7.428696398845918,10.37885896809616,1.1528981686756667,16.561112260179463,5.7048398094815855,0.37111473073249357,10.898651926257443,8.219962075945793,1.3346476804785068,14.720492346396505,15.767812367035962,15.690949660546917,18.19796686745146,9.552727136915443,12.818478480777502,19.089815017814708,14.734371185524875,2.7648486479012657,10.552409192819955,13.363071984560033,11.736201513646108,10.88363338385622,0.582706775055617,7.680735299690249,8.012503760460445,16.299961216520884,16.272054930219944,14.031570142451875,2.0221083519378613,17.815287788387877,17.332304588328537,6.031935903831971,7.742463916871456,16.61769407547652,11.948844129296292,14.250076009922111,8.675838998985386,2.0621577943684732,9.431538636691158,3.1838305486762586,0.7795158724046347,10.980111746585411,17.6599151384992,12.04611958366193,3.0774175761833433,18.811343292291443,1.8872285116756604,9.533164144863683,7.012673435382282,10.130811797077165,6.212417167453612,10.49263622631285,4.291801301704243,19.665688997847717,4.794699158882407,17.979096958552717,8.812665622734581,13.002663142026428,15.366098423495856,13.39252939761014,3.806552130382568,13.211403448496725,4.084236658121769,3.3833107076928126,0.9308345178856436,6.157597536221462,18.423166506860397,6.3170517937154225,7.690405462827994,14.455287099042158,17.742787925519266,5.514865081597353,0.2879048610975099,17.612292151323743,8.096760299728603,0.6377605841893663,5.964452849220581,19.109157152041263,14.980407128058356,14.657009114476796,2.90624011152524,3.3705433816576003,8.17679104450682,18.540871784568573,1.1691660914208368,19.85768631205164,1.564412536682136,10.898786247390198,5.227643361048679,6.694038112976175,19.209061434110303,18.219264460431695,3.7738311712252637,15.620439511238132,4.490941545185723,19.284331716054734],"expected":[0.007473828521254828,3.152203927477198e-5,0.00010674101779028822,0.0020015372999514455,0.000290510041897259,0.2049077363435137,1.3287794421095622e-7,0.009526844121487901,0.005826536837250827,0.040920528595069616,0.00412799956629717,2.227911409601289e-6,4.387644433968253e-8,0.010961943234088936,0.3881420815910357,4.281451013868027e-6,0.005990428969192888,0.2665254612212007,9.785920686834458e-6,3.823142105625382e-6,0.00017317882117421095,3.613437820231377e-5,0.006978075180675078,0.009506871227852546,0.007601335494649215,0.0022156315006879816,0.01055145739475221,1.6351418770469527e-5,0.37890313146318505,4.9668413261789135e-6,3.0140818180724507e-7,8.122981715972988e-7,0.0007638835721769897,2.7735165855991967e-5,0.0005092459193760068,3.601766956008495e-5,0.0011716949318237653,0.0002844827070196944,2.4361852500965586e-7,0.0023148129174257715,0.0001869166781220274,0.004065372363653509,0.005214915910464794,0.02514631162959396,0.0009285083162254591,1.6015773222016285e-7,0.0047009598309814575,8.473925411108342e-5,0.0599606321159412,2.0150147467224023e-6,0.009470429199801777,7.129070443764982e-5,0.004793566892479608,0.005150676341010022,0.022375696799595113,7.210208543062615e-6,8.021187707931585e-6,0.0003128117166957191,0.2567522725050517,0.38304466586936775,7.380139730974609e-8,5.84537861228396e-6,1.5609629880727603e-5,6.127879561964018e-6,0.017496704223864356,0.16783178428676612,0.3136404949287912,0.008703698533960288,0.03872706735467259,0.03584298651277464,0.00016615640114154838,0.01181468372157803,0.03583585370327534,0.0010960222570144571,0.3719708215848791,9.186423576110977e-6,8.008411516559354e-7,0.011028701168638015,0.0008939618326130449,0.00029433663096862096,1.030329967102343e-8,0.0037790438108193576,1.8422097722237817e-5,2.323637640567327e-5,5.637789200743988e-6,1.7388234593445574e-5,0.0002595128892679125,6.401667633884202e-6,1.3160882020373194e-7,9.254933663812743e-6,0.0003583066477113744,0.002425445919315384,0.00028887286224647037,1.9366575738528115e-5,0.00046786445139721926,4.241446794409276e-5,0.0002795649359665153,5.691525322954247e-5,0.0003286845079962853,2.7639562164918936e-5,0.310865151600916,1.7081400910884807e-5,0.002275696769080529,0.0028192195834618413,0.0074222795006845515,0.030616632957482317,0.008811605895177346,0.021113008695340316,0.006497331486407872,4.3712080005065763e-7,8.828324666318322e-8,0.0012309789820507716,2.0160677721357834e-5,0.021673238275580417,0.30347677905643256,0.00010731535330263862,2.1122564763311007e-6,1.81904203470167e-5,2.256588781845077e-6,0.0074106270408691504,0.3635177347242825,7.347973066362727e-7,0.0002523768472888545,0.012273161257386866,0.15755574467044361,0.00011502305112391567,0.3012066916061958,5.278169492236915e-7,0.05395612205195776,0.006118624820782708,1.65140363972111e-5,0.00012014158523793164,5.342674208960569e-6,0.08727414144438585,1.4762643917110154e-6,0.003462476928805315,0.0026912962216835796,5.317139901556262e-7,2.135349392175934e-5,0.004379863693170609,0.02638441128183584,0.3331368442469947,2.1416192243640735e-5,0.02265421935676748,0.00018010158507546093,5.7369254908238395e-6,0.021479206410000284,7.374795903558642e-5,0.16854773579278734,0.023615298955040644,0.3521905913124459,1.9965346309971686e-5,0.0001321770507094244,0.32939426855349135,4.839154926508219e-5,2.2490574335231456e-6,2.7374266334467885e-6,0.007687656324576822,0.0073198925232723895,6.160616318292041e-7,0.016132795305013273,0.0005256043724988317,3.3503508838098725e-5,4.777987697072539e-8,0.0037858050859711635,5.017163725483319e-7,0.03403281442794282,0.0005496556503708939,1.1405442880025403e-5,0.0022076167303129723,0.004624064909175499,0.12335198881203736,0.011764501091368645,6.974489374605291e-7,0.030314488694131007,0.007004498092208787,0.005558296969395527,1.608465353051012e-5,0.015563189296133503,0.0002009376746178554,6.0149090599289535e-5,1.5957901645010585e-6,0.01656058981305653,0.2610904961828822,3.426923582194391e-7,0.36705309911796086,0.0011380262605513339,0.0765688408425269,1.279679731282705e-7,6.338916815573312e-8,1.7098060852173943e-6,0.018553289829631864,0.12946589213055698,3.1372837088774325e-5,7.013840847671896e-6,0.0002722574124583942,0.00021095183009018793,0.0001875917948402563,0.00037937600319070156,0.0021160773136087857,1.3320531319417005e-8,0.01683423808690961,0.0796838196427819,0.3200235380514485,0.00899060621793144,0.007898934219627868,0.3221567068356347,0.029235335129095933,0.03617001377070451,0.01974395690300724,5.593391979971264e-6,0.11593011102200959,5.959751665938357e-5,0.1116821669310444,0.28394172947933893,0.001047204493140943,0.007220807326561126,0.05585348274940613,6.818527124743711e-6,0.00272775659464068,5.773509479345345e-6,0.010460167020063202,0.0001565821850394788,1.426505780007346e-6,0.005901109967864907,9.578314058487964e-5,0.004819429830779577,0.2334029794933345,0.03867914910785326,0.022659885498729503,0.22602276206398175,3.8428288295619526e-5,0.01250806842791467,0.00012661215748560037,0.00016708086089032206,0.05409998621070382,0.013207124057421698,0.14920333870603938,0.0009459549645643499,0.31730063124368446,0.0010173407799374,2.421982451693696e-6,0.26651158691556276,0.00034569461942185085,1.560617904743122e-7,0.37531832688956923,0.3316482957349493,0.3245167207744204,0.1208304983536657,0.000483042349050481,0.0008964251716891039,0.0019396262628327528,0.0005222551902760457,0.36000012672758847,0.28530020588311256,0.003930398875825724,4.188180103928183e-5,0.2495092938874355,3.353209476985906e-6,0.046536853469237346,0.3738267025915958,0.12409328898430375,2.9631330737217983e-8,0.21623767224378132,3.83098871059373e-6,0.26607984899201687,0.000730190151733737,2.8282872217517487e-6,0.0014649359472707628,0.006514881336339558,0.006249035511672375,0.0008395317042630049,0.3114096976421821,1.573165901415103e-6,0.19242874223317707,0.04295581669071904,0.001997779255125977,0.10516130188944188,0.0008819180879127124,0.07050920804515727,0.0005763740742183409,0.0007125523206078413,0.00041380329892974426,0.3898593283885214,0.10686186362479676,0.06058844990577699,3.248859781939335e-5,1.2456463415778222e-6,0.00014332225771902525,0.02658594617518934,0.0370022160533917,4.477116909994344e-7,0.18825320144285657,0.00014899508514490452,0.0014483414828612296,8.46242125101183e-5,0.00012445843231264906,0.002580977459714024,0.0022694954579099594,0.004945560437007747,0.027604337694403288,3.3245963184199495e-6,0.00010199897616644921,0.33386092664703443,0.00036422590849446003,0.004425789302699093,0.011628911793529262,0.20541988986774395,0.010902331971220917,6.89697754267061e-6,0.002036854493711145,0.0002420020817088237,4.865469760616355e-5,0.1967712993342181,1.8544593429157179e-6,7.880093989192331e-9,0.0030783828161639625,5.5836714928805994e-5,0.00890427014639903,0.04793782371778707,0.00010268196831698972,0.0002936709099225619,2.856214504609948e-5,5.546011463061473e-6,0.012356540249564122,0.3423854366681731,0.007733341385793179,0.041373995762146225,0.00393353672490207,5.185272061231185e-7,0.00465305405444649,1.6624135334988224e-6,3.3249555763928256e-6,9.789879471270474e-6,0.10626117242053933,5.079471487694373e-6,0.006612396368582546,4.5409936896366307e-5,0.050590161237403494,3.7003220768133424e-7,0.053063447149114235,9.023367633869098e-8,0.006970987020762101,3.4317331867069095e-7,2.88438262587991e-5,0.00836690134384525,0.11375975924362575,0.3120215867080152,7.349164342706754e-5,2.6056311994567035e-6,4.9055385137155936e-5,0.00041097444589912495,0.09072890241744469,0.0005667190364791063,1.0479788112616746e-6,4.2689961859565234e-7,0.3635730395059292,0.30903437576153375,1.2682344439278362e-7,0.20574880525610945,1.928470808607303e-6,9.87420886788322e-7,0.03587396013964355,0.0037354607340341728,0.1538872911340984,5.4947713665603516e-5,0.0006806556166670587,4.135945514618638e-5,0.0009997551189528588,0.0043325858489634125,0.0010356583453849455,5.393806265147592e-5,0.368879988084342,0.01831121094213783,0.01096893860941119,0.009622116072738362,0.003505180325209683,1.5491410641132634e-5,0.0007418640234180505,0.00011543456294208113,3.827207829065141e-6,0.00031536364375168313,0.12243383531716077,0.009682416594357226,0.08858170742367326,0.1105360247723877,0.000730211635832521,9.577337844572103e-7,1.000749642186146e-6,0.1505431526244752,0.08020579167836371,0.00237809659127377,0.00012188368996368002,0.000967531570695218,0.07350901195575556,7.082497348889322e-8,0.0007097661703757064,0.0006978226225837839,0.006948967114199622,0.001297842244696128,0.00022375696538793092,2.2246661821096234e-5,0.07747027365329637,0.39132150783331504,0.023160073221936014,1.2824281095710827e-5,0.3886232057156062,0.11465995275068742,0.00019438319413443654,0.024646722087403542,0.0008487064837423732,0.29195352462077323,0.004497991090760631,9.161593040763773e-5,0.016319148378265563,2.3327343204100437e-6,0.027885479299342243,0.0028706403711613784,0.17411072617343049,0.10918444634736721,2.3058991554128398e-5,0.025585241165229557,0.0011010670317095764,1.3021308236653013e-5,0.00010997326469711377,0.00750107153916494,0.00010888741351040424,0.005527560633941928,0.0020904823326962584,0.00010395399264732579,0.01021281657842972,0.0011999348188782935,0.00828023523031035,4.7552019451946326e-7,7.968641149852128e-8,0.007182035963794371,8.804181144120144e-5,0.0027233217080414934,6.607442518245614e-5,8.279062454018754e-8,0.21314527023360733,0.005306118702855625,0.01992881504309187,5.229974578852333e-6,1.0109118888517242e-5,0.378533550585522,0.02789659106848895,0.00044920690492576264,0.011018780097936736,0.008425966534414542,0.23168739007107628,0.10387586769039368,0.34422043014646186,0.006499122336699061,9.81839558984632e-6,0.32434165247933067,0.0051566773018096234,3.8472356049901036e-5,0.37930764216735846,9.07246716908329e-5,0.003320965055887885,0.00012070057707774187,1.2529196382886954e-5,0.01665382329557934,0.009680582343070575,1.009420536865067e-6,0.3705772726541939,0.022186455754683785,0.0101126151116098,0.23495566380497115,0.0025654000486844673,0.001380412770799614,1.4529677391339226e-6,3.6785949405521004e-6,5.35613687431613e-5,0.04225005785422607,9.19607380884063e-8,0.018867044171768998,0.006004246120682432,0.008812565236913752,0.00015182719607643305,4.64808670694822e-7,0.008875297768332848,0.01268843264628423,0.29578728349201244,0.0012224183480393034,0.005494830591729409,0.00227554028744444,0.011132642746387386,0.3297543021045355,0.0345841885411208,6.634220813076673e-5,0.05567655521710693,0.003216755117104081,1.1763909866343512e-5,0.07066951629456779,0.34643313510897394,0.0012101937984917335,8.038900678656062e-5,0.300961277233961,0.13630612263665265,0.0008632609471556236,0.07918059458428241,0.016729962114709958,0.23673328089205437,5.630607354218627e-5,0.09202883250102764,0.009582916325809711,1.9800646234560204e-8,1.8634377527068324e-6,7.495796564092015e-5,0.005096709424473077,0.0001726654806080808,0.0016686795047108985,5.7372029840304615e-6,0.017916368152706825,0.01066365157381689,3.770547830581016e-5,0.0187967935033203,0.002217755552642106,0.2734795920735891,0.029167684146251028,0.001055533620015664,1.5006880860499314e-6,0.1308284300528364,1.217394370870928e-7,1.7745832381252316e-7,0.00010003269079577287,2.21392118787648e-5,0.0018096261014738583,0.015653013560301503,0.08284949827432345,0.021261675370444336,3.1544467967909917e-6,0.02264583410413488,5.331993422176545e-5,1.0429961928215904e-6,0.23007271773329657,0.3739966525220676,0.005070441132936417,0.0969514807137802,0.27423389672170156,3.0786835103442083e-6,0.0072714652214883385,4.660525490830547e-5,0.020573836054371162,0.303540363885557,8.761360030416127e-7,0.1439800457068069,0.0031987581274134516,1.6405748434783538e-8,0.00010688247886643423,0.0015630184988461367,0.06722229965834862,0.0006541013880710528,5.409595725652647e-5,0.0017668174286278847,0.0031184432492311113,1.716107596323507e-5,0.001667379118993557,0.0007814150459010913,0.0005495341046432581,0.0009576145393793054,0.0007401384189120644,1.2988874059801238e-5,0.0008095513587389902,0.0003921679174251944,0.055764605434505045,0.2160809910987912,1.6638098542700146e-5,0.001609729923705963,5.346162212152304e-5,2.9707752325990276e-6,0.04860165871732292,0.0008970996532352681,0.0038298870591408265,0.21771008546073334,4.241864474214493e-6,0.34912861178695503,0.0009613232783878969,2.1695940995730783e-5,6.018463998310217e-7,0.02092130171067342,0.004106952558941702,0.1261985754379761,1.63262406999315e-6,0.07992224896052529,2.8272962113694754e-5,0.06445226078200607,0.0031247867136975447,0.05842511171234667,0.0004127773292556854,0.3766453622772692,0.055399129819715474,0.010674392654293001,0.00010971715449730474,2.818837171034467e-5,6.252478118557951e-5,0.062424252521143045,0.017875316286552104,0.000896602523817113,0.00039664691435593316,0.0002586426222540281,0.0779627778040813,1.868790000092524e-5,5.016894867760408e-6,0.0011812465213860755,0.0029563775760367895,6.621080291334291e-6,0.007885073250533246,1.0271222176087684e-6,3.240561083610786e-5,0.0017847118133076164,0.0009933772191908431,0.19678570178131338,8.31838940864036e-6,0.3331597798191,0.0019885174572760993,0.39012562426832104,0.00892118431224687,0.27666113060679576,0.002134123417761445,1.0315692863106386e-7,8.916822831890911e-6,6.135530237730195e-5,0.03603871846382898,0.0009590673028468952,0.0053724908724865315,0.00022840384633682033,0.0002820869245813361,0.005473397466367847,0.02822245918860952,0.2922375529366512,0.15068230040254094,4.056683099566052e-7,0.17778937223694483,0.35751741863494396,0.003179491475804142,0.0007871343534240105,0.010403940819965327,2.295264260947469e-7,0.000661270041951283,0.14368607454887217,0.0039994316715714975,0.01653604126460439,0.07592114433880061,0.01097126597032984,0.0005104481160331679,2.327313539644871e-6,0.00019527719640273213,3.91921959401683e-6,0.005806453127311252,0.0019544613758597663,0.08363425558818163,0.06326612861603527,0.06269111612310853,0.000766477034719602,0.24689462172856366,0.19586050413155037,0.0012012535637508112,0.029875492840752346,7.989928074123078e-7,0.16376782902991405,0.0003193581027909889,7.049887635732513e-5,0.36331199365322164,0.22785102731170448,0.0003586152569432059,0.009160399448180697,0.0040572287325350885,8.376405338145859e-5,3.718080474726879e-5,0.012633312631540914,0.05167927178278057,0.015619194934024073,0.05361884344384554,0.30439895719785715,0.04579015057625638,0.00225588133175959,0.002934076027022503,6.377783952023946e-6,0.13228493906542893,0.11857257728712792,0.13172494507403054,0.2578919620436022,5.855642407918406e-6,0.002183715827116606,2.2012940324342344e-6,0.002006628394325831,0.038993270293264354,0.0011437344430256984,0.001249816368600688,6.124519601926694e-5,1.2212854883996297e-8,0.018108133694493756,0.011138687500076785,0.00028559560075003016,1.2875669937117032e-5,0.12439544665819316,0.06407722376708702,0.004509953628824703,2.765795787023952e-5,0.38419810782277636,0.004310585982157005,0.03037929495918196,0.012819412256581232,0.3854792393318177,0.00021808542342735521,0.2952300826045078,0.020356316100576324,0.004180863537132574,0.07545044677455688,0.0017450231815374527,0.0012910681062776295,0.0004263949259353413,0.04117203510657026,0.2920582438337773,0.11709340052907434,2.080107818332285e-6,4.624464231430855e-6,2.5135149531272976e-5,0.3746888052076077,0.00033658929865318507,9.14518743320918e-5,0.15559347500194706,0.0072886346380188595,0.015745744298426095,0.0005784390376716243,1.6194215808506506e-7,0.12317462521569396,0.0009199951390062621,0.00018699975566360423,0.35889339389860475,0.3413560292886503,0.38582145468372253,2.2776046511979408e-7,0.0020261951268423276,0.003361632938136611,0.0003067828886026672,0.03521580317083019,0.3274619297544638,8.47587662449374e-6,0.00014506003597419972,0.00020172273232038483,0.006602763416072184,3.493875092012137e-5,0.004659235419388577,5.000850027004453e-5,0.0020576624039173245,0.00863048063144251,0.34787562048338455,1.3451108656893242e-5,0.008630693440895494,0.00010344611344681868,5.67710435589376e-7,0.0013271045473199948,0.003107796429181033,1.1603066132003073e-6,0.09545459988172297,0.02488581171281683,2.7900509043848873e-5,0.007731706198541623,5.7322903640624e-6,0.0019867190183463458,0.3542786755164549,0.0329222780651924,0.34230664801126814,0.1499814892426631,0.3475215671982687,5.094525148077379e-7,0.000488321642114258,0.3019433691897169,0.00448451658987971,0.07857345120282248,0.000551597500341645,2.163995215113123e-5,0.0003054353524062857,0.15386963359932365,0.001618974828930251,4.87009722672022e-8,7.4923473038834405e-6,0.006639651291707226,0.0032245935059017658,3.085587400085198e-8,0.057335451569850066,0.011141082863836516,0.009468324796799318,7.055519094907875e-7,0.00102752571738485,0.02207057569730773,0.0017471643229594954,0.007190779677608169,0.03541767714511101,0.024641404959029424,0.005993506848625322,2.3301774376404375e-7,3.1925608502933734e-5,0.2740786670225991,0.04351408555274206,0.0001763030149989763,0.028629279403910628,0.012856584813890189,0.04623029076138046,0.0015427323867553285,0.00020260607398438376,4.260704724585844e-9,0.13259366209399737,0.002988786417021996,6.735705081721094e-6,6.691802060697758e-5,0.00047505571271375834,0.05732534494877886,4.327951352946617e-5,0.0029559925286930583,0.07129073141682998,0.2569871401692642,0.0706872356039494,0.1834764718609222,0.2251293394544642,0.11793842916312713,0.005198342721923081,0.0028364968277977327,0.35302863902315224,0.0024691449672585323,0.1854734434099461,2.421371754744422e-6,6.543716335567463e-8,0.16950444799129374,0.0030955631783605385,0.0001344666172584045,0.0006436826953705224,3.2148365231841953e-5,0.059569592976697464,2.5506838382451487e-7,2.457126519977353e-5,0.00031878058442794664,8.121798043922515e-5,0.02608605115629781,0.002451975582876408,0.0003970931943301482,2.9395388159741746e-6,0.004788412340001506,0.025636697655374917,0.028487548410468248,0.0007377895931433145,7.136219848369607e-7,0.012916472437249442,3.8386084490233814e-5,0.0026641523548827143,1.683788896230958e-6,8.628409400276133e-7,0.03616366752770245,0.01030595919388882,6.271286798821659e-6,1.8820732802927248e-6,0.001318739731066835,0.00013948062626641277,2.074192095879325e-5,1.0633223018305558e-6,0.06718614858778801,5.067395840121426e-7,0.1593772354936157,2.5365048316334666e-5,0.01721397018144318,0.13495757833558253,0.0005249537735289415,1.8401087603182313e-6,0.00014998962124583315,1.5375879568897103e-6,6.6417196605308745e-6,0.00017822025841506255,2.8528862233000813e-8,0.0007323215364238712,7.164566144298797e-9,0.008303251237771394,0.01134763354447019,0.00230624751897188,0.2515121951068714,0.007484573797063102,4.547060776435063e-8,0.003962326862050126,0.1818510615811636,0.0009204845241926342,0.38878049207920945,0.0018846783247829049,0.34647658753236615,0.01372275767395115,0.003935139737580428,0.27827059137385907,0.12718607120440636,6.279859596653111e-6,0.1655725498481965,0.000258892803240523,4.591238375517229e-5,0.0047822349641698635,0.0001219671699619326,0.35003032921170774,5.489128690221079e-5,0.22678703749854282,2.4206679896216385e-5,0.0009786255507578088,0.013132327371062543,0.0012911878488378278,0.18318726492566362,2.2194136924156077e-6,0.10396413956643183,0.00026990273050517824,0.0036644371000873603,0.019888360006845667,9.78676845198748e-5,0.015649131608764917,0.0006789797245886819,3.6546919217794187e-6,0.016584216067722174,0.00021672261061523806,0.29128488131484825,1.484671360439303e-5,2.762403194569388e-5,0.00021579646195092655,0.0005301307331327293,0.0013309505769337222,3.283646904480103e-5,0.014776505316336504,1.3801824795191749e-6,2.862178801392676e-5,0.006893710689534062,3.4805418863611355e-6,0.014910766483821386,1.3200660977887906e-5,0.05032756182298624,0.0021257207654403207,0.23237566529994397,0.06950348022625057,0.00919344426724605,0.3923022885606988,1.658235022045086e-7,0.002331532356740085,0.0017024461214272307,6.136214107874256e-8,2.5115882751699463e-6,0.002750904851597529,0.0007369197912840962,0.006511666516478355,0.0007770069030147798,0.00046729160998620195,0.017287191667036777,4.7089589225111974e-7,0.014655905262628142,2.9520619368014474e-6,0.0008113283971781783,0.00014378140975177,0.014045246850764142,0.0018088306870912662,0.06058732729548388,0.2798009346631467,2.1284981387239196e-5,0.0028376925120186733,0.00013304270451024476,0.018546482484502143,0.15849143157561368,0.0017175597832936903,4.993732824634998e-5,0.018503181209745315,2.677323339445359e-6,4.7206458606702155e-7,0.00019277832434294915,0.013905269099892903,0.0004931928730624214,0.008715896194799053,0.007918893758810074,2.5009734302725308e-5,1.0829786317041308e-7,0.005327566318725244,0.00028473324283895463,0.14449294411738617,1.390446524480644e-6,0.0006570357663861891,0.012998438307994931,2.6511347703194763e-6,3.4182625800368347e-6,0.02099755555975401,0.001488642756190361,0.0013438911225482457,1.1970411743323252e-7,3.4486189050252085e-5,0.013949217122975983,0.0011407954641508302,0.0012107761474182486,0.049283485407532274,0.003613165179146176,0.2053973274380721,0.02211089907624737,8.311574481933977e-7,0.00012043542815244417,0.05751625527775032,7.201956422888264e-5,0.00028296962563110855,0.0009384940027280458,0.3744140834139491,8.889309316269981e-5,0.008857059369232164],"x":[-7.369261530871221,8.242345858013287,5.528781549164918,3.8515269602446356,5.9683729804065955,1.0900672635906261,-8.640675608136279,3.316502209636937,-9.222046091717155,-2.435318379546554,-3.303468151699973,7.894107814556165,8.955081658821715,-3.5070916581159617,0.06370121764334158,-7.003713620118144,-3.406230319092427,-0.8472875609285779,-6.007037356399048,-9.378216884547221,6.120880561991967,-9.370543792098758,-3.149910518593546,5.824899962665015,3.1921022049627226,3.5772725750784105,2.973511536218414,-6.144194583756883,-0.24735970085857595,-9.062405779172323,8.94136135736602,-8.883228444367877,-7.730129345066494,6.201952268300616,-4.853340263393511,9.013915420197605,5.132841679591916,6.701225747633313,9.256718259381294,9.275950525685598,-5.634924179087117,-8.639092716575206,-6.997860928613284,-3.1365137747289484,6.27739352804603,-8.271805783581016,3.5194185861049743,9.482141160923419,-2.115217649374661,8.608575960813447,-6.544808500652701,-5.798838661338812,-5.865052605274639,-4.0035883116583415,3.514793361124875,-7.0199747326387785,-6.6939099655786105,-6.592226409466542,-0.9078793314405367,0.21040542239721205,-9.62803361819101,7.311096386047783,-7.58306132062506,-7.909357436850524,2.722542188774476,-1.1994279269788954,-0.6133301486406761,4.378503123844123,-2.2576635594069483,2.6254774519363764,5.649618534984038,3.269644536801014,2.2874188727312195,5.359704562245939,0.2322565648504682,6.0402901851060165,-9.95015762399487,-2.9560786668897476,4.510895754706983,7.301568155539449,9.326786049774391,-8.506116002187177,-6.066267982795632,-5.95723518531786,-6.161381411632956,5.738292241677225,8.236687519818531,-9.27411038157015,9.74430354390854,-6.271510461176049,-7.47932247236641,-4.049349094144334,-9.221892083483848,-7.340050331582124,4.760519255231422,6.943624328152961,-7.5200277329248255,5.206487224393616,-4.650294978692102,-5.881756068089832,0.6621378904528186,-7.969244280620327,-4.12283222424882,-8.457769218302023,-5.046994527132895,-3.057012032729367,-6.915478808149502,2.963242326802341,7.948913280522589,-7.484394614415137,9.30349999454409,-5.884623217175506,6.557795728203509,2.634318029220717,0.6944466325637464,-5.718552292072383,8.918588456439302,5.693425329801155,9.63703572470503,6.4162942165670955,-0.3907138250754283,9.292700157237622,-5.026768457255271,-3.969974776077767,1.3396220774382073,-5.810253200813902,-0.7145242286788545,7.68659679155034,2.05856791339313,-4.600744988882397,5.694454191622924,-5.786812803893127,7.359757477139684,1.7795208969185072,6.929281648282931,-9.13017835431869,-7.998766625628364,8.837162425982132,-5.565403091557903,-3.939805791487485,-2.4432631322688403,-0.5650703757917874,6.3311194414275285,3.6502482426030802,-5.832934377678196,-7.1417977520154485,3.188756234650022,5.104405467584385,-1.2753614838659608,-2.5943416114704565,0.43853389911518903,-8.103159297926217,9.968308668970462,0.583509533855926,5.626763765141099,-6.841558624024691,-9.32803050436949,3.068341822718752,-3.1789053878676565,9.200404118076126,2.8497822369208947,-5.208511404999645,7.462308472702368,9.136086857590652,6.034780870905948,-7.68183871088628,2.41122763714241,-4.659838073054723,-6.638115475397561,8.259166373741742,-4.072289058962766,1.5231105743370055,-3.74885847698887,8.359622100984478,-2.8019351897147304,3.5624079983582124,-9.566387961956373,-8.703696572069726,2.730814067184241,7.33888268544964,5.5178820204183765,7.4492339886779,-2.6974320952776942,0.8925142455898651,8.931848624814481,0.31105381380063335,3.8748407384842523,-1.4520820134628476,-8.674945780852985,8.47468105652796,-8.220669603645145,2.7174528307658274,1.4884934601039745,-7.546243899367986,-6.874151934678396,4.656488592207957,7.356943379862216,-4.810156980049958,-4.98926709212419,3.864939949402819,-9.240930278582745,2.7586328652097247,-1.8396094627727333,0.42392952513855775,-4.281007414807827,7.290955000093994,0.5709474273848301,2.4090973832547533,2.2635058737297307,3.011616037274134,7.81891006186774,-1.5713338407096735,8.422074840871549,1.565095377970387,0.22334219922043985,5.011682688558974,3.271136978465691,2.057265319039878,6.910544293835258,8.35958765951684,-6.397559136137212,-6.035073450789041,5.294527629410233,-9.112807697337617,-3.5744830347319523,4.945305732339884,4.897487263046401,0.515223860911437,2.6544682180833554,3.5251220310236064,-1.0367974547575542,-5.588677351538718,2.8040395058857737,5.473834676275949,-7.332284839016188,-2.051439777406485,-4.257693712904911,1.1215739129852142,-5.551767065411313,-0.5506548439219117,8.451743752497475,-9.210611927931058,-0.8004141016011665,7.602070946908512,-8.00976767241405,0.14788851883588805,0.5077359342181218,-0.5015537080711407,-1.5397656373844981,-8.968292214195252,6.169578235461131,5.450005678480775,4.70961259185529,0.3036827471496828,0.7494434891341015,-4.90181681547897,-6.187994561209393,0.9359177394989171,9.561890732001071,-2.351423556810106,-0.1904837710245566,1.5242145154750197,-8.841968007265608,1.0791397051812268,7.420190178547031,0.8452593331698246,-7.1591528659082915,-7.773546619666614,8.108651889554295,5.884570926422077,3.1593553372341976,7.59319569088629,-0.6509657619791032,-8.66272644271965,-1.1877453937344526,2.205465466511898,-6.649632049706851,-0.9523029550635052,-4.399849245116814,-1.7452713281654262,5.243484320733369,5.6708018486275655,-4.749455510541862,0.06233544817529335,1.62753674829208,-1.9765920593213604,-5.560837596325414,-9.915977141915246,-6.95301203932436,-3.04416259239487,2.250655695842539,-7.478932104906986,1.1319023079292556,4.797284385013416,4.2544293347741124,-8.790416294921837,5.352982345911039,-4.500687914176025,-6.083879718762941,-3.8364688034311056,2.473457020355255,9.186352594664292,5.863895420865761,0.4272982221330679,-5.424734365428043,3.4748399837940838,-3.8298688761013944,1.1202856130761454,-3.4143261384764845,7.542093895671901,-8.916516924348464,6.394280085495797,-9.440130413946566,-1.1672102211561608,-7.293160433795398,9.550101934870586,-4.844350847884837,-6.2187076514623785,-4.370943235994713,-2.189240073580754,4.966247543279163,4.495075383044828,7.759926205947242,8.898328839718136,-4.779911423578276,0.5165337466704081,-5.288695450932894,-2.248300236285692,3.851310067306347,-8.329329657578747,-3.3062412997167634,-7.07995367371272,6.522131596368148,6.630826073059673,-1.6309988309537324,-6.711094727909388,8.489721338014299,7.6786718336943665,-2.087159436026833,7.826943673261827,-2.1415351004356165,-9.203143850559377,3.4743909312471146,-8.732460194687528,7.249249950527471,-3.147733641058039,-1.5848235642658857,-0.5354280860391114,6.130827779927685,6.877738776157102,5.331251085681421,-5.510181169658366,1.7367659485373856,7.015500684269917,-7.5107195446241715,9.737145307697265,0.3810850812226274,-0.6730757004747279,8.084998583584696,-1.1268204041887628,-6.702814467941929,9.227805199829035,-2.8052598931712103,-8.266358389824028,1.3465991244467546,-8.089065642959516,-9.197327389127882,5.773675408402013,-7.490585650910702,3.839338072996288,6.012406000473668,6.630154128372958,-0.3421735630509737,-3.7490014126572158,3.1074764994303763,-3.831360200942684,8.278566227063688,-5.928371323189201,-4.64642466832673,6.214023960304189,-7.5294597203632385,-6.61104960547819,1.466684261311567,-3.1043845052219066,1.7582359367733869,-1.542061035933191,-9.500444540072582,-8.029548300760293,9.581238952944794,1.3842914086475346,-1.8225160848333601,5.399196251436859,-7.883990483741243,6.736951300111738,-1.863604591880943,8.643079159545046,-4.4739318977265485,-4.73177793588798,-3.1363079281479056,-6.398538297483252,-9.423188859145801,6.792854025123177,-1.8754916855320367,0.06317772028237911,2.5590765677557226,9.704710808311763,0.15181081010057085,1.5665967640741574,-4.832331187274477,-2.4914895920865288,7.852074823178221,0.6223836213888401,3.32726943617363,5.656092704557892,4.297168972472672,-8.213415951783203,-2.4522228794027656,4.53608289295525,1.2607641234294054,-1.3119936059100645,-5.790948090292489,-2.4877393033313044,-7.172682901579868,-5.999136499219535,-7.051050462412345,4.23710663102732,6.670696103935118,4.127524159432184,4.132925352070412,-5.411451646932757,5.367444161924212,4.142927434531828,-3.3009894314197696,-8.133914841180854,-8.9824613506865,3.149082296963389,5.1403091537550605,-4.740725422157941,-7.4077564529814,9.578972132166484,1.0829435201454665,7.100400183882645,2.6521693347384634,-7.9060412363146115,9.045953866110171,-0.23141105662944383,2.534239286574472,-7.62165513502699,3.9531555558649636,-4.0499507073573415,-0.9386440973723822,1.6464524059047356,0.46789794196673284,4.951519856324516,7.905701196140168,0.604702821158849,5.598067514981185,6.295184084974412,0.16358792569493907,8.64844173162172,3.485396189397214,-6.980215137623542,-6.540353253389042,-2.661735795771536,-4.780297964739253,7.2791565692004525,0.02358272399645145,-2.57829809505981,-5.7361563987671405,-0.9440770531616707,4.740369782484581,-5.0070098958276565,-6.904805241591032,-7.462910161012815,5.2940897012806545,2.56082603763549,-9.789430382548465,3.8873653707277267,5.726393376406582,6.612672175191712,7.847589253367197,-7.675945238515434,-2.9844465004718623,-3.976604133883934,-0.53046639994324,4.4141000336047895,-4.713488303362396,6.821605949550424,5.866330530476063,0.4510126995264674,-2.2862154376283916,8.472429204439994,-2.0534637009277423,9.192175297469628,6.4083485091221775,1.889413597784948,0.4301901175387002,-8.17142692779424,5.1068427810247705,0.5502220631418595,-1.4451191295561205,4.212032271073639,-1.77441896943931,-3.042773524722109,0.874655815469989,6.1100874152312485,1.7282440552119773,3.1590022613998325,9.277101350840713,7.421598734253905,-5.669643711218071,3.984729244484914,-5.089220109592167,9.324802953145365,-9.898663971408595,-2.6191720771437277,-2.958822671970789,-6.568908073914632,-2.74823937861723,-5.0964952343268655,-0.8318020019917363,-3.151687693175522,-8.173574821668632,8.871287079875948,1.4745177361766348,-9.944772493785718,-9.579676523707072,-4.945585749102617,-5.702952299948452,5.254480338951662,-4.674421589820481,1.7913572675040612,3.2521417357256777,-7.590392964938588,3.156102728588124,-7.410921502177366,8.847132682476616,-0.8645055336092522,0.04515990633238687,-3.2371272751112157,1.6959657998109723,0.3734199562266163,-6.665107178513536,7.8126030673920965,-6.041683806419704,2.5792101197866124,-0.6958174198737765,-7.124180236306992,1.417639714646075,3.870775173023846,-9.972582807114687,-5.120880788119142,4.746372312946775,1.967250851154855,-4.7341313871742186,6.048891639807415,-5.343558750068458,4.209146000605051,-7.9747380123298495,4.694143295985356,5.541554171019989,4.856722900309499,-4.919828894825766,-4.618744692554171,6.076352033941674,4.367315873031741,-4.341645114398176,-2.0465692485402442,0.8523141266498904,9.491925526469394,5.056206251531279,9.75106565142341,-8.757107445258141,-2.124282533322428,-6.029542135281973,-3.7079038159846878,1.0776602175279635,-8.12433323125493,0.47967779018065926,-4.756573791813308,6.46048748233591,7.781225194325863,-2.6304077112942537,4.6014927094431535,-1.5131658905757384,-8.879778229811217,1.8180022700408074,-7.576061976844386,2.0170996020863576,-3.5205287476562086,2.151326286640586,-5.788689554023847,0.27340234678935005,2.0278620208363307,2.9563231050214114,-8.5432335726138,5.898447668548478,-6.027123296735111,2.028126727898263,-2.741547979090373,-6.506799155261764,-5.228297555803558,-9.602950013624012,-1.8294741911006973,6.159921313851804,7.783371520705039,-7.234622796390369,-3.8201189163882976,-6.517160847799572,-3.2824722738358414,-9.525684577845514,-7.486493083488881,8.94680911788782,4.80535550828769,0.9301373764679752,-6.436567383345451,-0.09842928943784557,-3.7287800189817455,-0.08677531678689476,-3.010381243430773,0.8116791586216898,-5.011190903138485,8.145930015648133,-6.248919930918304,-5.232530946259648,-2.587877722616887,-6.758531459579404,-3.355836959927845,8.289455554854015,9.008708712753922,4.37973872584454,2.453855949651601,0.7360765820294688,1.3567669756670053,9.217715408506479,1.1919418581923722,0.39803066627078465,-3.627545803334895,-4.08702382050282,-3.358315966352947,7.754048313629323,4.700452585126854,1.410222493514027,-3.577406763429143,-2.9928077771878625,-1.84521144121093,2.97043476516361,6.16545100555923,-8.614679879535316,-4.754832423694295,6.432968052344851,-3.4992685393117373,-3.8859892275250862,1.80034771312104,-1.995267020287086,-1.9715929009779956,7.05471047083579,0.8692417741779366,-1.1717903969332113,3.879575794881468,-2.7500567271546528,-7.1469222186121995,-1.2974083523314306,5.901960469508648,-5.38090496453739,0.3475511002577356,1.02897799291339,-5.154725919228795,-3.0068225153227335,-4.425313242235722,-5.60082656305509,7.162214496994984,-2.9165171292598346,-2.108667746950501,2.7607608310083354,-2.2532331529226823,-0.6990470344314801,-2.4133284053968174,6.505773562759536,-4.135987205161187,6.662304214152073,1.4740111825319513,1.5508163182624344,1.4442945758935721,0.8345258339031183,7.044806035656954,-4.071665571197478,8.399094854534098,-4.2695629631775756,2.2772260622200093,5.750967155652615,-4.775528025863509,7.881616031222443,9.653113415969603,-3.7543374979403943,5.194131871218591,-8.148052554083627,-6.837478483252246,-1.5187807542027532,-1.9504685877570758,8.085462088098467,-5.675372794522451,-0.2027648244273692,-4.5282774786653635,2.5231471112342554,-3.83953371588047,0.1994114932453872,-6.284868821810985,0.7367224253068283,3.3756237067655235,3.3452176239276135,1.886855344523731,-3.6913450010293314,4.3369131930556435,5.329084929240576,2.1937998408713675,0.7316503864605384,-0.779683707242329,-8.578186028311507,6.660724428485551,5.542239297731445,0.2508919342683704,-7.080181481976329,8.292533516302143,-1.3586057628432044,3.1247260591471004,-4.318159668177128,6.282749013337522,-8.657889721157815,1.5253087096150164,-7.381412313672149,-4.80846578264523,-0.2686556046823476,-0.5065481366604949,0.03296961629166262,9.175746281871554,5.044201725501779,9.868874081593319,-8.769720847806234,-2.280487776762543,0.5724864802076457,-6.35953896453453,-5.424802549625594,9.29689265719513,-5.503119879221505,-5.792950741936691,-3.5300509770277344,-9.451135694190862,-3.757703607109777,-3.2202543388490446,0.4536301307290316,7.063682703517284,6.733249798613691,-5.331356202342068,-7.993284755326564,-7.8872719975736905,-3.747003442247916,7.213791102563253,1.7085024642100102,-2.461552192150469,-7.631860121930045,-5.8821833040572,7.26951708612205,7.9646762994769205,-0.4449909214367551,-2.3262505347518436,-0.5029390711071322,-1.3862468221173039,-0.3707720324959318,-9.334736307992468,5.173718245162814,-0.6433144651120948,-3.477499008445206,-1.8501157926342202,5.138538376105238,-7.359821906480923,6.612258594213255,-1.326460323835601,3.846555795279274,8.4443472739854,6.425089050929465,-5.205889992623067,4.8455672306156785,-9.785659697371836,-2.009198013731055,2.933184766785523,-3.614764686116212,-9.171559770935245,3.9905380452182584,2.691665967167939,-3.738458927289332,5.298574190532573,-2.273397346057884,-2.4655983821780447,7.789457202373583,8.473852021318674,-6.776467388259171,-0.7383325891890138,-2.1629091941877965,-5.439481759937834,-2.413323920686574,-3.620278087447777,-2.4364385280896173,8.604130469096546,-5.125069487645835,9.935678859837253,1.4488002116683507,3.905212521147586,6.20288979913791,-6.93250564301775,-4.437299511056754,2.0545131608694867,-6.281244660719025,-5.322571781982135,-1.9207988322313376,-0.8950042444198623,1.9143735330399316,-1.211926479680674,-1.0438083808430765,-1.55586918756946,-8.069063783555857,4.268263609762094,-0.4565323272578059,3.5248580271853704,-1.216012698688207,7.2516639632577125,-8.86375927882237,1.2885999190455877,3.719638395521624,-4.963091882251214,-4.186397261424362,6.689730280729055,-2.1220016104331885,7.729604167981577,6.645642856055389,-5.0434659531005055,5.298647029858689,2.4849577150096422,-9.61257837984066,4.528872447783495,9.911244610637418,-3.94462223954557,2.639350486921913,2.419467385954256,-6.5315632471777585,7.901755057899461,-4.7824711461765546,-7.4199926104514935,-3.5385169199332056,-6.824077937734194,-7.261723795571902,2.7787039445345343,-2.937407811958086,7.692815264500549,8.599513933097,3.8564349888015848,4.891017079780164,9.775723092592543,8.284418864018068,-1.9188031304357978,7.860526043292776,-1.3341292352341405,-8.07305181304284,-2.9971783908169725,-1.4578560924965611,5.086064992191716,-8.275189737303613,7.243355846496353,-8.747423347649086,-9.122373066598843,7.265072847441026,-9.05966580306929,-7.161204172441704,-9.449103309312123,-6.156802948170648,-2.9509075915591954,5.1908178753643455,0.884075526060478,-7.764029701976551,9.512742300780065,-4.0667266146916115,1.1747220852463158,4.02325328024936,0.13046784724812,-4.952726016219833,-0.44013766763278284,-2.7664995733377573,3.6151813825764876,0.707336101018603,1.468599514827451,7.109380251291931,-1.2476526566340098,7.603877134268991,8.204900029061367,3.8784777344191212,5.189478650305244,0.44789361071425304,5.695221744712251,0.7207014452770633,6.3824378281303105,-4.061647379148154,2.7786239990600627,4.349214965287436,-1.1337061349658661,-6.969627662021662,-1.6465852202810218,-5.186293521819696,8.577789055916256,-2.5887507722614522,-7.843266934729045,-4.505990619509386,-4.561499118539829,9.638871247758594,-4.022349257582034,-4.848320347866588,0.7562023141959973,-6.120956575433674,-5.575847636846811,5.476824317034087,4.529871333042369,-3.813935616096784,-5.81891905634194,-3.5250484947334026,9.062579156768752,-6.080177799122506,3.2228233406448368,-8.132003838396539,-4.8232878068701135,-8.627261611829077,-2.141316139691125,3.6744506869917526,1.0100047377423937,1.9055003057896869,4.541880101509683,-0.07228114324076529,8.28482650477492,4.438911659088491,4.363295802223334,9.046645342750075,-7.985929839454089,-3.613525186451745,4.795951303470707,-5.1003387336410855,-4.649482182456954,-8.608805508391498,4.317364521919153,-9.789073687750736,-2.732427368303947,7.836453811607637,-7.667428773878613,4.797265643250093,-3.95732573605839,-4.110273485210394,2.028141734502924,0.7868077384982577,-9.371379336662603,-3.7706582777469677,-9.069308149758935,2.601413936993797,1.2970078605524051,-3.727803367853535,-6.774127648873285,2.665228576125971,-7.098065915276508,8.694738551900404,9.220287758423346,2.8143755043876872,7.173549613414313,3.9177493454126697,6.415282870183194,-9.209001058588324,8.297671602933594,3.7435785217690576,5.722916581651422,1.4118828212043297,7.069863298835163,5.778186781033231,4.8985652812099545,6.760352067294889,-9.822193528482334,-3.868948214259831,-4.836196636896806,-3.8092229558510704,9.10830109497833,5.802053943248957,3.548097983525004,6.646988824656688,-4.534313833322177,2.096055341817763,8.567994696537756,1.1312222705395278,-3.4207843934111137,9.325616459520823,8.018840117582911,2.06736720702291,5.080598761614134,-4.524676700518784,6.525152055119378,-0.2991075153570186,-9.468690365448245,2.9580795102097124]}

},{}],134:[function(require,module,exports){
module.exports={"v":[1.8355017027315603,0.7475632217406405,1.4163663647559734,0.9905341972039747,0.18501059158343303,0.4874740484700677,1.8955024265855864,1.3787161232629122,1.5129912651132718,0.5198621051930878,1.8568842209014953,0.6155662758583267,1.9611166246318188,0.3933039180807878,1.0705282915138405,0.8185627179456101,0.9082050110327953,1.0912877432651165,0.7315898563847112,1.8569922638259633,1.3974749807723863,0.7790894610886276,0.9642652961650491,1.0669343096301023,1.6978347017872424,0.13065204293645927,1.6536660958246028,0.15322856048069067,1.788139646227882,1.024309714316705,0.4373229449052718,1.7870025417009319,0.6208277136774183,1.1876081577641018,1.5428092775032956,0.04966282331908367,0.9253371595208542,0.36585056558485984,0.9484080901003873,0.344952926104793,0.6697270807566444,1.1374865779241174,0.10844568880795613,0.3776473158825384,1.8499146135001125,0.7846069535731641,0.5902471484142029,1.4215226245170536,0.20451775768595937,0.08415648477583026,1.3566736843552532,0.4462108245070837,0.7393199313059982,1.7168685494688614,0.6665293466992241,0.4128341973638969,1.1547074369962202,0.20165655645454228,1.453313970465313,0.824140637753521,1.0091746319838046,1.4544610876455435,0.7275840432509928,1.6525796474801377,1.6596575102321638,0.8422669181780726,1.3034646510903407,1.912966732200828,0.053463458763925775,1.5399614188796709,0.49686530679809504,1.7521360775587138,1.853354354827967,0.4214822492710417,0.8389793882432235,1.1024353686200725,0.8193675418492572,0.03518112958966135,1.9737173483600268,1.9624039790393448,1.7722229772123672,1.2034119287276894,1.285800624535797,1.6163635823432632,0.14375245171657003,0.0060303769218541525,0.9438493677980686,0.9985665967523856,0.31262441343657743,0.1597793651651882,1.6599607126928375,1.896479013948427,0.23659097365196669,0.6363945478161912,0.44710520814376675,1.7476766414901488,1.5870879779522102,0.7070002397665438,0.8672878301231424,1.6342281730389745,1.987220680894421,0.7221532232468046,1.1573313904848077,0.4832035574120441,0.06378425786963726,1.2501444929086718,0.03633173132320877,1.4039497628772852,0.46556769637543516,1.4629650611530445,0.7953856285879932,1.1003275927903218,0.6420640246237568,1.3770785540174089,1.9773702433067881,1.8120466549702092,0.28828148443055657,0.5468517365644168,1.845324839915223,1.78766277136496,0.805989275401144,1.430249781227933,1.3748884584110148,1.3290302809906516,1.6610418782622962,1.2975490330741133,0.30099011077083926,1.225938492942917,1.9700792970076257,0.30703267015227453,0.6412337171665374,1.189295398292869,1.4256107629058263,1.179925240656266,0.8336439166721208,0.2948263602863781,1.434824188100369,1.0100716405744459,0.9253580562064028,1.8605611618114133,1.1033441748255863,0.1361332205181851,0.9813834562160277,1.5165017087385744,1.1078022016068965,1.2435593370447084,0.36552428651069624,0.25612108458845295,0.27795999119680825,1.2423610959417872,0.16130891386479274,0.19188532267349423,1.808849778646076,0.7833503239196249,0.11365086629831156,1.8834792360859685,0.6698692481378195,0.21276038605169534,1.2510415564159758,0.8729850451041421,1.0566042477064954,0.018134038226382376,1.542764158812227,1.4904221992587763,0.6316038776800359,1.6665102611698788,0.25420617399947787,1.2995508809011667,0.7742260629205813,1.7482470379235533,1.3558515320602695,0.9637021801643257,1.9876360252991994,1.7114429472315362,1.9441938189396564,1.5358707108479717,0.4352023258490578,0.24200542069007502,1.7132979418272525,0.9851089596701206,0.0876324874572818,1.5156459557548803,1.5283640218447907,0.5868240537609335,1.3410880489112373,0.9915748393565575,0.4438964100407441,1.2411301084957524,0.8050307021596357,1.78126668242417,0.22319073321684657,1.780050622212256,0.036923970467820144,0.6304561196340353,1.7871196088336685,1.95031063837826,0.222654437487249,0.23548913822609574,1.8103526186784773,1.918998477644477,1.9890759150719708,0.19716379027920228,0.6766516878910536,0.8459081464436662,0.2199599832034873,1.1815972195992814,1.1989000644075203,0.7693455666664644,1.5923520765178796,0.06065547874382915,1.1624405114335592,0.2883997578972286,0.6752079823762984,0.6887344108032702,0.21469446503080736,1.5642055328471973,1.5647809958376406,1.8125829200502643,1.520629564659687,0.962599414504361,1.2561801105026076,1.4429740254886787,1.4750275138277984,1.0125318818358386,1.4546046138398432,1.6659339393264148,0.22351331244929584,0.954412581131435,1.1312612602610645,0.5037392974789827,1.893765107933437,1.277960568676081,1.3083101371550505,0.9152663574054891,0.8875510398262012,0.6499328480543851,1.396970714056823,1.7494679444002168,1.4898410036215362,1.7982179230654105,1.1509551108657559,1.4676827841696571,1.4446976827538287,1.2404374409267467,0.6903906732081655,0.620918973845566,0.6277414705401192,0.858112042793644,1.841990854937535,1.1915777350982752,1.266821030091585,0.13833969722221529,1.7256324721158074,0.673484042133889,0.04061517107949264,1.2760712583124283,1.5916578023275845,0.8851263216769869,0.2826312459671185,1.4882884067625568,1.1429548265105107,0.8753342779909787,1.4739248724949858,0.1898081475947091,1.1060373021994168,1.824746219327737,0.7195780273261998,0.5478269902654813,0.13968318031015858,0.28399939341958147,0.12652672848875923,0.3870576333994471,1.6060668226494994,0.8970660287433923,0.9156970348315672,1.3712880672976713,1.4292641499305856,1.8990796087670825,0.3819691717839606,0.9742953332308439,0.14038039541558023,0.17891734708873708,0.7573126830411776,1.8456652169864571,1.934123762472952,1.973798744063516,1.383801163985153,1.6687860170569961,0.959162348759449,0.5698622219373983,1.8435245659644028,1.3035710261919964,0.10402737863628841,1.3174310183974178,0.4376704416606594,1.546689409317771,1.76940326420041,0.8340365134767196,0.1650525033461121,0.9285023993095174,1.4949093555087778,1.0530546855828322,1.1655988868504203,1.2297720990296201,0.6507263663382248,0.5520588715673447,1.6018703565218688,0.3788806138574361,0.985095778099585,1.0651558967039367,1.885029534499718,0.3304144967908882,1.5995907145429102,1.9215461763884716,1.8378360276227914,1.4932261141104184,0.9127253863971849,0.8639750674727988,0.9337652732320123,0.8625225711288862,0.9918861584303453,1.021799679708824,0.07860084862060424,1.1904187220729523,1.1371282598236903,1.7425475984618073,0.6583596532149594,0.4596442007909176,1.3041771488627196,1.3461689442854028,0.9264679545660446,0.0035124627703670974,0.4801637776420944,1.2501059245102355,0.01811785027278079,1.1672152897282375,0.0408613024712694,0.09623098939304198,1.2311483843678594,0.9810124216372227,1.6052470431679189,0.1750367063242999,0.06600684816161762,1.6639432291521157,1.2860886238704947,1.0810086915109385,0.6617646639481212,0.7840969326274747,0.3786639522251405,1.0772439839752912,1.3936361507628776,0.07291876198731595,1.0933277626108469,1.286034486850459,0.7110466353450358,1.3565860676697628,0.3341490645800085,0.03339172881698538,1.0795084534255164,1.1845399140161779,0.3119206617430028,1.041255148672397,0.1252493098953984,0.07569506093531997,0.47831052842882515,0.5857807074112662,0.9366482913794765,1.641612656977415,0.06040295323902001,0.523292283960572,1.1094128610907301,0.8103558396421056,0.4920441007841454,1.1631356131585529,1.7233751738300676,0.25890602781938643,1.9252834124182896,0.3977926983867408,0.9282055170886983,1.5673860716691532,0.8657841720384019,0.366624445917596,0.5485058902227102,1.1482290764382554,0.3399445957022329,0.08402078702245097,1.2967558890200857,0.3427540882722555,1.3065814597127177,0.24612079533537656,0.6078534545427567,0.5683641707671372,0.5832665813230737,0.4787645478298952,0.22125069744257075,0.5397041308987984,1.6745887193482036,0.06969189396466824,0.11247731531021188,1.3226809202612344,1.9718350911461666,0.7711505480714247,0.3752387110846964,1.8290644275252426,1.7391603907550621,0.9360720793642932,1.4277980133319557,1.6797808557434686,0.44404750066829246,0.48685114902381166,0.6489285230837774,0.19130411504965306,1.6909146009465932,0.03436577374918315,1.9087138937199644,0.22184734611496104,0.5176252560368018,1.7361692287806219,1.4905227127903014,1.061368937164938,1.7384404156046545,0.7528489386832455,0.15228773397284856,0.14464588049071958,1.5426087323130013,1.7404987341963292,1.486457260531448,1.2425615696352956,1.0594109919047257,0.061182283479369826,1.6399342439892788,0.9540877185231689,0.7435930808119684,1.1332037595997724,1.8663569975406373,0.042942835705508386,1.5398414839019008,1.4375156719508198,0.37239360705851743,1.3374411828269142,1.4197739993348208,0.3603946612821822,1.4352303660399435,1.970554910326975,1.844665629069496,1.1710371399699584,0.9483631445078808,1.7834470988052895,0.8316676167125983,0.6296833157893293,1.9597280162571633,1.5962885105457567,0.17953257036259185,0.5686981225443923,1.16142794387653,0.8834978195893348,1.417857979761965,0.7070456067878474,1.9950892849928814,0.3727915778104749,1.1328896171211609,1.533583217355884,1.0875552344484638,1.0645958635871278,0.7972753823082255,1.0375943128274105,1.4802126663011927,0.6470466860456194,1.009568863077766,0.10658525189389234,1.3360680148181183,1.5092117309345148,1.724037608516661,0.9356388658668022,1.3573044362582682,1.8329045063967153,1.797954291418602,0.889761000803801,0.9535820198103715,0.5369359031325946,1.5522167022877142,1.523112372502406,1.6803730519006064,1.995917316044094,0.053943896548255044,0.53400037207245,1.0743691934959063,1.7325389371234832,1.3004408151165348,0.9149613403327277,0.48567001876901106,0.4871173656139418,1.776835788888416,1.4216173470494984,0.5025251128757104,1.5496648598866245,0.734412981872123,1.537463010587424,1.9582106898274554,1.143098765893741,1.7285914103119717,0.8501254726680489,0.4896707674803036,1.0857139200457406,0.2225336953757413,1.4801712023678855,1.5824573582415122,0.037960347403538375,0.7421761019535968,0.9168460390466371,0.34320055696293705,1.0342680650137006,1.5419145781437362,1.6140106375404653,1.4110970558491998,1.374056490119366,1.5525594203724005,1.2292017688322088,0.007829860507022168,1.5539214850924905,0.1535911953086888,0.8998316661078021,0.8598605965936037,0.7602851079970732,0.098775978620671,0.2560534346962746,1.2000956507630511,0.27695940315010503,0.30670268560465264,1.821039837002778,1.4145877619437957,0.3279475710820807,1.289101691588678,0.9351503028315751,1.745437364532462,0.5198251056299923,0.8151010756123807,0.4523935814850626,1.9409960470609944,1.0524317529377103,0.007486671993549798,0.3807381977757829,1.9239813087039233,0.21353066859312309,0.5637711058139576,1.8973027785378922,0.5533855190008481,0.9358620823112047,0.6692362710759325,1.838844008393222,0.5171047936544038,1.463669208138155,0.800803252409386,0.9223798453513989,1.7138933284070985,0.2741480556672333,0.8403784418754219,0.864807242492827,1.6010658003079352,1.443248352920977,1.0206144814844316,1.8997108847304998,1.3639425171615454,0.502957346418516,0.10148703503619139,1.8783441046648406,0.0009435123684915503,1.914799942079204,1.7620792526044067,1.1471506038658417,1.9470475998695145,0.15242530319584402,1.4859810251101284,1.8115968403784835,1.3073184680179386,1.4888439484799538,1.5691378754795666,0.3428934601125224,0.1471687912275499,1.3145200971728737,0.394412547234519,0.7867549835596312,0.3267458751894421,1.0704803258272855,1.237068400231835,0.5946879509147069,0.729156729920406,1.6566294060832503,1.5948231154713324,0.8556829091249307,1.9666425844965745,0.6720886961843009,0.6258318189044574,0.46365785114331226,1.3585542256980765,0.8542908688946484,1.3365104178737424,0.20255316629005948,1.1937384682731085,1.2318044450766625,0.4273154819469487,1.8124251651261103,1.0522667455763024,1.1672490215234919,1.062833775532389,0.5887389546255575,0.8755654506990584,1.9458431875264286,0.39928014935410383,1.463408723827106,1.7993207735956767,1.7151380756258567,0.9295735911703207,1.3405924385371142,0.6927331476570799,1.566291417178253,0.7471425720582303,0.1168891431726724,1.541532731348699,1.2711523147531545,1.0429640310605044,1.9027303991432523,0.17804232643760987,1.988060368108811,1.40728510382464,0.12284893232425231,0.5137970572979436,0.32936703954547086,1.6309305948942212,0.17062907038029262,1.3053822135195703,0.5647506562418729,1.838291830811143,0.07403944514160798,0.25107654792912504,1.2029383169157213,1.2072564957964746,0.870011804479438,1.2052934667048167,0.40622583884109487,0.7721801833101924,1.8389179909822273,1.7006568993649407,1.9604398799439213,0.9036760205053205,1.475149571488195,1.5994094535024277,1.552883249269121,0.0308753325787805,1.5269290974354912,0.947215852080487,1.8960381536148359,0.4205686597169582,0.5422491584082518,0.9632338899182686,1.4296837122449668,0.3247469412842743,0.3026664102976695,1.118514830385049,0.802060411872529,1.8970217053397946,1.1263740865167957,0.6025323161893863,1.0160383115243743,0.6091191649264682,1.114660185742483,1.3522648174429661,0.420489097997478,0.09731354122045666,0.6167563821629738,0.28520459935671205,0.7079045838214864,0.025094447087150584,0.574381381057659,0.4837497515350555,1.202727459296384,0.7102964852373197,0.026708035365745175,0.33235461757833784,0.719923341493014,1.1864354723001287,0.0611399971664941,0.5437768288802478,1.483066845079113,0.4155011746432269,0.65610813190471,0.1985223228678774,1.3023813664177952,1.8749588732122113,0.6317896126387961,1.728701984562524,1.0054686777913524,1.1263735343913637,1.7304365070560972,0.2837771302611771,0.9582776027013904,0.8603193964525366,1.3623122514797572,0.7254455131760413,1.424764028830972,1.2184288626696103,0.763706690163116,0.20003133940623075,1.7428950011485513,0.5402641107736934,0.6927169167993368,1.28507750216074,1.790202535958795,1.698250772845629,1.1176283384190473,1.7961397770456058,1.5271803731701676,1.4752090294626323,1.6129670657761448,1.3525405422778052,0.7153866099981103,0.06034143988777352,1.7713118423572451,0.2387017530642792,0.36406674685469076,0.24789372073611515,0.941641165431943,1.3073765770915382,0.986795560494933,0.12382970307172192,0.28399275879715224,0.5879879834446471,1.3528618832334014,0.6516859769116632,0.6357982515956948,0.5686192065306939,0.82545385633507,0.23726039623885642,0.8452517219065356,0.4749721130643807,0.0299217790541495,0.8188998311462954,1.7162859899122807,1.2223810243406708,1.726053951390694,0.21185795396174356,0.13147919905385264,1.1864033798361526,1.8847912067796475,1.1670880085987094,0.550607966385428,1.3134923317281326,1.266299530954261,1.6052099055214084,1.3587240973652532,1.2472763280725472,0.8000196506213659,0.14346934384990728,0.8248160701351339,0.8442506093668025,1.7338707980382724,1.1241024242269178,0.933733204996563,0.9497291260425125,1.5351785198582313,0.17153635006855383,0.10770680911020003,1.408918811189913,1.8197834256157606,0.26590733827998836,1.5500284236732282,0.42403047640882763,1.4997808344250045,1.345936078897974,1.6041560775256802,1.4252986561467633,1.4467123667936463,1.671505118705698,0.6052917417344332,1.2919930729489844,0.42617530764009537,0.02512814984244116,0.9581486706021747,0.6580728883602869,0.9737127015246756,1.5698325417599208,1.9569399243473855,1.0177449412267965,0.016905829947184703,1.8285788030635421,0.26025209261015014,1.878857090683125,1.38053912414405,1.46033476771612,1.4075743776823213,0.27045921848965015,1.565376778824739,1.7077684917517888,0.3314738160404631,1.1536258041364,1.1754565540621478,0.25105685973552294,1.6892945998971216,1.7792259209189218,0.3726077865762374,0.0917213508089767,0.09200434113401235,0.860127526546413,1.3324208562601219,0.5389523512272598,1.4834363438465257,1.0677272644231826,1.247062547876805,1.7438364035951133,1.0123410181806998,0.1782712140637548,0.384149370105797,1.0921609312778449,0.2973592216285077,1.2694927818361639,1.3256689799184747,0.19071011471471166,0.11933671478272201,1.7961431874118996,1.137678588026997,0.9723682084829219,0.4095786160201005,0.18009348623529586,1.2406428971445171,0.13539454303647203,0.6888004587561358,1.3789266119253512,0.533857372791295,0.6429199781301524,1.2029922923537715,0.9448192110855662,0.20301608515450376,1.8265987504020385,1.1590794251969845,0.2864036430556465,1.955037072644104,0.2404217116495233,0.26243305234499914,0.5658915969837182,1.6010025106609804,0.2070731155093375,1.3451659227937145,0.8967612732681038,1.3275289299088961,0.9025275946299871,0.13772606705772006,0.9239963930437427,0.7898262393879243,1.945980000882324,1.3065997687466506,0.4685434868430205,1.7142532381707123,0.7077657743949892,0.736838927733126,0.045796619486436096,0.008284525970450929,1.249690863230113,0.6873359401258607,0.9728843588446896,0.1466417842791481,0.7573288180169531,1.5099998114246813,1.4744354859045092,0.6359404694896296,0.6706584220969325,0.896746332706162,1.3811886073796455,0.2639124275541693,0.9683671318216995,0.601910287952979,1.3357431686961085,0.38961878370906344,0.5230201652134263,1.9401711312273053,0.30442071444239094,0.6735041694705259,0.5694042010044655,0.8448760575450818,0.09366871862755577,0.2292173180869419,1.2237953079134232,0.9179294546318713,0.45689586298983675,1.8941132307589852,0.512026787641513,0.7070720257299925,1.2466265040295865,1.5589441531439037,1.4842665778969848,0.42327101157057845,0.727976941330617,1.1523985247289024,0.7803040275310571,1.3077542733224505,0.5588930763573372,1.408595979457555,0.12431893777379521,0.49465188046982833,1.613147880145569,1.2275269829191746,0.1675593802275399,0.9154800285779938,0.03533872017005413,0.026560765555374122,1.0960966031255368,0.9845402100347762,0.34198236011616245,0.1110848290318569,0.8048271617263545,0.37544901148628984,0.05093041270343468,0.670590386809248,0.8588106116343468,0.037037030938127824,0.3279521993737995,0.9819938668351664,0.3861044202910384,1.5940294069482448,0.025762965715010022,0.06154120244195527,1.6527357220256897,1.5362844933411357,1.8073227831465557,0.4798076162630638,1.1840412654509485,1.7865436276113087,1.9728311653820048,0.41940466719789704,1.4874289175924633,1.82333012196603,0.011597689185216531,1.2078746141839676,1.7558114279372603,0.44899362575926727,0.3478871595534416,0.9843316326929727,1.1063290761309048,1.5856990035475556,1.9801440480376673,1.2533476865289188,0.10847319364265573,1.5109119320014957,1.5426296868021416,0.13748374717359235,1.2055993503209521,0.7693743628216816,1.9005868412239133,1.545093749413915,1.0536036462265224,0.0428398536681196,0.6834802088047236,0.15969253225218605,0.3030720243284284,0.7579727583721985,0.9837486482398878,0.9572423349781047,1.8697331837922428,1.4069089086902764,0.3984153899653817,0.49317457414103094,0.4783833881934152,0.2316748532265569,0.7645777807778926,1.0566295392575946,0.6115542278055193,1.7298464977896875,1.5200547589123214,0.2144671316706388,0.6310807915066872,1.0994987826952198,1.4060734759722786,0.331966114945228,0.04291900328642306,0.6470512364277727,0.5533505304949538,1.8087994370839398,1.2105738451576196,1.9482282094008614,0.8622660082387368,0.7981273167837428,1.105925554489355,1.8729501886603757,1.586271184205597,0.09475131736094555,0.4565178379493635,0.06424762449045396,0.34514877544487454,0.046956249437994924,0.8742425405714882,1.7956694108406799,1.760426326297698,0.4256407714122368,1.6473784149330273,1.1906586643823127,0.44897725005702993,1.125678078438792,1.146792714613428,1.9968448563544077,1.5808075711180822,0.803805240313682,0.4795876419384153],"expected":[0.33288851919537227,0.033000306940037256,0.002070164499054234,0.09934406941913708,0.04678117695037207,0.03409188822473315,0.2502914697502783,0.0449623101503507,0.10860366011271641,0.03645759838288833,0.003997361157906593,0.004827543433841524,0.001270094270736643,0.005343422618852038,0.003031101847389255,0.07643742798924424,0.00773461922805934,0.07769827428166434,0.0048779736776019935,0.10118730756554331,0.006484279575481588,0.011223444311386752,0.008065219232368205,0.002968860663623051,0.34650437357975716,0.005630461906000179,0.04666721955225769,0.014295617134617423,0.1997305435918646,0.0539342997003479,0.1427608058382926,0.011901256044151716,0.027210862965636053,0.019503697328660478,0.012281686213119583,0.005793772583096952,0.03890056172287444,0.014286932002987245,0.013984663626424795,0.01062292758064485,0.014480216225421385,0.012123379332221951,0.007965428164045473,0.010265359185446589,0.008677832725780411,0.042299446907456496,0.006684216785343439,0.01018345591181426,0.013244254598187582,0.04450257089732384,0.0025803088604752175,0.007117393637704538,0.005692057881741315,0.040171770186473506,0.01791646216459435,0.013567594751045985,0.019471278813953247,0.007125814272944386,0.1387901217120804,0.17903545243610236,0.0032765775020081817,0.2569146459856572,0.03512422039758649,0.013536109046641175,0.002716735716681901,0.006535966344311043,0.0024068342424239586,0.33563735783356985,0.004307626643477096,0.31177897090101175,0.012788344245046579,0.004163633458170919,0.0015601098253916427,0.01572124849225118,0.015378965705722308,0.004523031712006071,0.011439864028126691,0.0038715107946237985,0.011246044298784116,0.013300892001465298,0.06874524726933855,0.0026603216903324156,0.06721344134146016,0.004091797365187451,0.0050322717006799165,0.000609618517169008,0.0035251336572378754,0.013800933356938397,0.09782545970969016,0.014481884780461418,0.001564063212514812,0.07031769553184143,0.012872639338934896,0.007764077175684922,0.005921029542094091,0.001767816009706626,0.0644005518772063,0.24898566966724325,0.019815465366138242,0.004073946868768793,0.02663210523218434,0.005180604458997861,0.019857257313157076,0.005363927786102244,0.015814759331155948,0.020847571468435223,0.005789257460343149,0.004781754226983922,0.005198828375854293,0.00558063390905806,0.01610210568315237,0.005190327370480364,0.0068373854152328165,0.02896674268467672,0.00623245577813518,0.10517178794481351,0.0054755154836923755,0.025450260248359148,0.0571196141089283,0.015481493087839186,0.0396925584642705,0.31457824159846587,0.022463551488275963,0.003230865104796683,0.004021714157203228,0.003252858423471225,0.09910472295680545,0.014535364158840726,0.0012875786730725135,0.07218171860766415,0.16172586131460526,0.003207572155135144,0.12886930843045227,0.10811094024056839,0.03716948288858631,0.06537578371717423,0.016749927802363264,0.00399290716828281,0.024247566207553205,0.03394884988967232,0.05908328210474072,0.004900326439389572,0.014794698438561548,0.0020529507969852586,0.017297434018499664,0.0031996487549452034,0.006752819720959317,0.007103150501050017,0.011985130121914019,0.010179512219135678,0.007168793734046073,0.016222641107516853,0.0022162708769298788,0.005164847181311658,0.006840541654758246,0.004324817329683056,0.0053280862719124675,0.1624734195386607,0.007717489739942888,0.004638142935877474,0.011053856645096801,0.006864123947700982,0.00898785748631215,0.004147961331484407,0.009919513217356566,0.005858234184544305,0.016332088064475492,0.08250461686548928,0.004559779269900928,0.0018944650764825587,0.011525626882626339,0.0070515094641642245,0.13802017873051273,0.006956045390322305,0.001712319314608974,0.004413135028874687,0.018615806396692698,0.013857190996528242,0.0037140007661831116,0.00462905451234627,0.003071098358631919,0.04195344780623971,0.00295742336089863,0.0063346449614313915,0.002518392354375226,0.00439141543870157,0.009609759922729723,0.002821350423252237,0.01182459590648389,0.011129874044649504,0.010445773413866469,0.003451158393388622,0.002366000256713424,0.010131748284909816,0.1820537833627749,0.01359234608410106,0.005737172784005245,0.09971964540101806,0.001900162795077508,0.004146517845250208,0.008780767552662482,0.08362100029098495,0.005150621551192815,0.04300257663295723,0.006234959205974156,0.0039057648573193058,0.0709356002840966,0.010955814066295122,0.013986358187154269,0.0026151716332179957,0.11509676946835765,0.019968612356268258,0.028678882797475474,0.00659205622262285,0.0069092808572123075,0.003846781878756282,0.18071749952997557,0.14947441019381244,0.002103725670214597,0.011690747667379322,0.06542808784147489,0.0025700826807215876,0.08070530926553242,0.021498514947915975,0.31370336634401097,0.01896139392248715,0.0696602290577338,0.005157459895335764,0.15285013175274145,0.005194876501212185,0.0049625445399215295,0.002367808626447843,0.0185842789286841,0.04552116820536071,0.02290372982272145,0.014472324689590591,0.003162941077008121,0.32551340446550986,0.022619941628726867,0.23679720516078928,0.008857662602054504,0.015309028388209349,0.2173231487744227,0.015923878095148038,0.0071951583162584475,0.027261757212597323,0.009375072421431764,0.09490700513900434,0.05368308520342368,0.021669888011439906,0.008499418459180529,0.029308544310935967,0.001625741998350816,0.005577130029999069,0.023858897297932172,0.03942015949170197,0.04074490196275464,0.009402746488388871,0.009199268389739307,0.06431073707779028,0.0031853958730118613,0.03764274064215514,0.013539550099946484,0.02034134135434912,0.004884442365241422,0.12404029632421876,0.011363334518454683,0.04406973804354301,0.008306436705345914,0.005908341511719281,0.007414066825496324,0.00975102283859212,0.032407291928873434,0.06785986862684341,0.02506688046613302,0.0027351231409754625,0.029858210393817104,0.2639431942334214,0.007051010668365371,0.06685575439355378,0.005528905494183404,0.005381431765184554,0.2683779072869318,0.001950892325595669,0.002569101512558052,0.0016370240801373782,0.005244732167614479,0.08860472919102938,0.01973262164936505,0.008293436403239214,0.020576111023884052,0.008861205479949999,0.004253664541974622,0.11566970127803478,0.005355127410020774,0.03201616153841166,0.0025012646662159366,0.12593278043209696,0.03699606629304465,0.013897076982973301,0.01570112311717669,0.0034631672612879115,0.02125180991802769,0.004346059789869184,0.02404667439366218,0.2341721771846651,0.008745088703045967,0.01188834277597843,0.31597216305310083,0.0029826937694166565,0.0027776962266071238,0.01354785326719407,0.0017603104999119373,0.013152199005256389,0.056897766241866925,0.06728906812506312,0.009242965093566147,0.005876484396290415,0.005870285336617795,0.043639347016114834,0.004551725714867569,0.05010337842973722,0.007275967678598875,0.023195074682860046,0.2926330042901477,0.01028929845562923,0.02094696010653247,0.011579865194091005,0.30828126956082624,0.01355250526902009,0.00576590123017341,0.00039627895557885776,0.10655924752815424,0.042016269486070505,0.0008464630253930104,0.002809400274017534,0.004020143341534045,0.009376288363247755,0.0028575047558502,0.00997913059676613,0.008024339128906453,0.0062806354401584545,0.0027631361433773675,0.3109837207562993,0.010443092694717594,0.003333996825226512,0.004572144941768583,0.24116856628478417,0.014684453718575555,0.01652068740803974,0.026713607470355574,0.0048938303267295384,0.020215140680791138,0.008270259719943699,0.004528959658581659,0.28632574736472893,0.01659036448395002,0.0025167762959894483,0.019391556559214415,0.003154066535488482,0.23111932044881178,0.005171314817402043,0.010827759375355368,0.005855561571033929,0.09770270909188299,0.030535413435492587,0.008713357545313964,0.0060374996642838475,0.006139161037185217,0.1310976780897726,0.005167205129895479,0.00510189935373046,0.022869977854858344,0.06311950808245687,0.001606931719137813,0.008961039061914967,0.007617258754080992,0.008157103951306118,0.025485110401618227,0.3130133539451638,0.010969596387060207,0.005819412671104577,0.011721429873392622,0.0612356566424819,0.020859561028765548,0.011810137045071847,0.003524075952012119,0.016348806788619274,0.09921193680325945,0.00918250996928251,0.007976838264800832,0.005473742750382569,0.01929651173327858,0.039898905113195014,0.044570781212811834,0.24394274959337234,0.00724332579318679,0.014041249188219343,0.017566278380479614,0.02455190762931878,0.06964704410418525,0.14419907091916828,0.07912170747886889,0.0024095790919276,0.00469997619830893,0.005847367364653099,0.024694322074872415,0.0019426358713906212,0.16806139109520582,0.006236621970165287,0.009067630731970321,0.004967357800643017,0.0014388311822421712,0.0017746833783989012,0.0033955881712840878,0.005303709485648972,0.012200026729368282,0.0032409580531497827,0.045607454338470785,0.022084436712279214,0.0023722935707151034,0.015582203425329358,0.005045721161213827,0.023391266358388625,0.32168571638371524,0.0018464526814228773,0.059829721471116586,0.009764923256037538,0.005214093399374135,0.0029069505811564478,0.022407199321506855,0.008919489831676706,0.007174848785975533,0.0038378963596948797,0.1668528269902667,0.02228727393988618,0.012235513397678517,0.002227544717810818,0.027475388921348598,0.20526593483293423,0.011489344182224427,0.01720248177840309,0.01697387181763884,0.003657042073893136,0.008084147863869604,0.04770186612944697,0.04645834870161084,0.0017142708624960689,0.03544209158923839,0.005357511506765332,0.013450951426100276,0.002304745313849084,0.005472098273661281,0.006841905622210955,0.21236914059421877,0.08272582354538807,0.04399785337165482,0.005522395043039075,0.35325504182053535,0.24662099806147908,0.030748584365477716,0.12102554634203096,0.0250618483035008,0.008707871628552502,0.0066312139761695804,0.0030692332280150415,0.006165386578774376,0.03164691176455722,0.005204712582959876,0.017528338224590545,0.002651009946440609,0.12205410741702731,0.0020244860717289616,0.0035825651977429247,0.31300611693255515,0.04854803771186035,0.001589299646521948,0.00721795186424528,0.11320850378149613,0.2461750096224406,0.008026749709861211,0.005844292375421139,0.010022573250523508,0.16835804527537174,0.0023204018574607584,0.21781258256559713,0.055381419206398004,0.0017817243475231664,0.00521706277113635,0.021636573125666067,0.03007166472343416,0.010544239659226346,0.009644743560929536,0.041417697402197765,0.02311035888375103,0.11509370615610981,0.0061958838261896056,0.04966525301561141,0.002492358380595247,0.0030414307635957595,0.0059721853265583425,0.006574677814830906,0.009047177159131692,0.01891996110260762,0.0092899859661213,0.003418611048984154,0.002969968309600658,0.0034127300688627407,0.039126721669322746,0.03926630519887738,0.009742858996401196,0.011472670107560286,0.006089917070204376,0.02822303956903901,0.13263755156830806,0.002184407694823117,0.04042001330456633,0.3221658042597404,0.001164699533027077,0.020175908269502416,0.09839834908056183,0.012515903959798,0.18825212880890585,0.013573763556184542,0.0036796737483226756,0.06008389800116553,0.015952547022439808,0.00724423571886177,0.008447481278819587,0.006283725376786934,0.011067780438803933,0.006002482208585333,0.03145585491950331,0.030947193444210198,0.004458563832135891,0.005487072181028416,0.005126891828791561,0.02041828148127803,0.003800508620129129,0.006051965644177305,0.0005364909715326406,0.015706896178578317,0.22569955083127177,0.005138753556201676,0.27174531497906557,0.023970098749627147,0.009603484678204889,0.05810718974256886,0.015911819225975524,0.001209925370747934,0.010311311779340965,0.0022876272739069383,0.004873999915796417,0.0042878441026861615,0.008300995369060935,0.005194082664515442,0.004077402963852975,0.04404762308630176,0.010782909687479022,0.08306929333246986,0.004213409463615484,0.33857536444573466,0.015556769782800794,0.01967595520222387,0.0036565969837143207,0.001420135010042435,9.727583245542749e-5,0.09278271171997221,0.28911647792611483,0.03330227491658414,0.3263542365125471,0.012366468609993665,0.08408437039761478,0.0021918817279455924,0.05427640936506861,0.1351149328603582,0.007828318411498614,0.066302538519555,0.17441887147813293,0.046558855441800585,0.006229774370478628,0.004330816042034568,0.005311969418020892,0.0669484511205703,0.05488139493924464,0.005452127084205134,0.026726297088924846,0.006164006718842049,0.008408311052619742,0.03182217467098207,0.0013443003308306791,0.01799235011269323,0.016745868956953226,0.026172615261464686,0.0035333466713115013,0.09964689023864644,0.002876382340147458,0.009344440794947517,0.009663214203489577,0.03186458270867906,0.006009270700725194,0.011211229666874913,0.049849038084183554,0.0060177428174257265,0.006691868586983181,0.05286698316956223,0.017210150155297255,0.276159211915607,0.006541207286855236,0.1503177184023089,0.0022518702092166796,0.0033227969823097837,0.19655416814382598,0.08402341365904913,0.26027163288740196,0.004748364548197245,0.006431023173102841,0.009942502035242055,0.0018841545582484348,0.0038358946661147565,0.0035073477107262444,0.14290538478068615,0.008807986896383551,0.2716673077179268,0.00359320400946326,0.005521637168378158,0.026481526848283775,0.015331297873705256,0.0036456650123606535,0.08510902474298723,0.003150086776529169,0.13160437317213158,0.0031981322614226563,0.007705107668104376,0.012549592857765733,0.0029573833408624212,0.0028133894590921735,0.12427329441361466,0.005959288658788348,0.009470427329976971,0.010960285744196895,0.0055798451581424565,0.007339130090355254,0.0012186334076957936,0.011137034753820843,0.0023094481835926827,0.001663171450553169,0.05090708140793292,0.002944017300246247,0.03116718187416109,0.009707652117896681,0.00543907341652362,0.23238521585989552,0.015146200369995857,0.010622487036763916,0.008576915209151463,0.04593672249921614,0.044394115773769435,0.017962660123102558,0.2253067503641869,0.14281774463310276,0.22862332026432144,0.009693421168264162,0.0032357076629064892,0.04281686575934228,0.003884911666018286,0.002648382767478769,0.018986066238979905,0.02724698439450699,0.005184189344035357,0.011429892827556867,0.004665435104656913,0.003453923458388426,0.006755562996711499,0.00643914734445724,0.00643901125612489,0.16698192953555174,0.0012408945130068494,0.009561118616923547,0.006530638125498297,0.0423144011460464,0.006386294069814842,0.005767719257661408,0.03316926003729938,0.0062992758030202866,0.01852739048069531,0.00687450756850092,0.32847705529085597,0.002179730741747253,0.0869863846400968,0.05951670009381021,0.29114405817826566,0.03457135224032514,0.30388081189808613,0.012273547953808903,0.15737516583225084,0.018017443658154764,0.0068958411867375774,0.005636662188838923,0.010386022690836522,0.02061647434331517,0.013752621127058223,0.01140716960470079,0.01739665806953273,0.019996302286705073,0.01468684967193485,0.004716294545483443,0.1538551549940554,0.003154128046771628,0.0027690716006580534,0.010172687533340637,0.012103496265050825,0.021681263941266175,0.03974333901415647,0.00212871426421862,0.008075615361685924,0.015188483885814489,0.0013049143533516048,0.02357971177476029,0.011407079926575886,0.009336324001269145,0.006766275074779974,0.20925690598353475,0.0178302054011133,0.004530369857709924,0.00945216609353847,0.03264383755513845,0.002935139215249042,0.01972542448942365,0.03463876055459349,0.13029517170337807,0.0043305888345829945,0.012930918045537337,0.004070812672862758,0.006995632218522309,0.001458335218853071,0.04912465058640251,0.02985205128103755,0.3257143837956871,0.0018038731776748634,0.0067270080692270915,0.003954605745859002,0.012351669238622676,0.0994395411092359,0.0029114947469317818,0.06915794751762312,0.005018671553444223,0.05042982389356574,0.003560202437147152,0.07669618176931496,0.07417261113659922,0.004727717903969764,0.00474303309602229,0.0066862780797398115,0.019601727458304935,0.002910283072996429,0.01984198900510916,0.08949831343538395,0.10644675711759703,0.004930987353019863,0.012006234461504941,0.004409427951079117,0.0026263875034265682,0.016065912244341715,0.01937724853143622,0.0030697806400467285,0.128813076455129,0.007717576230315397,0.03298308741911047,0.010212744107277554,0.08311999744799509,0.024011103683213433,0.32263799431175205,0.01619309976880228,0.029924536151775545,0.00933128419591243,0.0017287064429399829,0.004117147195319987,0.015483037436327349,0.0033716994178711744,0.02279497468440529,0.005121865843100786,0.1621872558306496,0.02948542641167395,0.006469841887837743,0.010055077950511276,0.02378511367266837,0.005378861911847878,0.012304753149377682,0.014623617675305617,0.008444057524262244,0.01291918408174428,0.07321587028462574,0.03704419025177945,0.19039660378734727,0.01334723202216064,0.02306701222191449,0.00351720113669242,0.0048952081235777364,0.13451010167924385,0.005311033453109607,0.003277780610405924,0.0931635499347719,0.0078843420294335,0.013934286629107203,0.0159831421496549,0.12398823809406906,0.01707993368500503,0.0981138654213654,0.008614573096803482,0.005690012053931191,0.006026513922127702,0.03816287701405897,0.007255454907946645,0.016067948064011392,0.0077317828181643075,0.02254005157475732,0.05341494343128155,0.0029671444516114276,0.003554424104792569,0.003922487655862275,0.03698839728906926,0.010733606752577418,0.06809232943703321,0.022560167592213583,0.005841297156246602,0.08469952593504469,0.03325720653192794,0.28588038250783354,0.03233885160702018,0.1431422112813051,0.016634264474985134,0.1922805347464868,0.009034890883771154,0.005731378572945813,0.04614605821499714,0.08186928611193382,0.017007287045620895,0.004959325605647865,0.024827842784392984,0.021173410919540628,0.005363643976369469,0.0038641298626668355,0.018795271213419715,0.004268883972166304,0.004671041349347605,0.005025262223270897,0.00503850861604567,0.0011269159124668341,0.003116304654501707,0.00688122489662923,0.17655151140514536,0.0045958936991327675,0.02002456699251142,0.003044513511501,0.001161603697347671,0.012966752933304057,0.008442833547842426,0.054994035378653695,0.007317332102045074,0.13975039341906104,0.061293853054754925,0.0034386383481536708,0.01734979359514841,0.0056932367251562345,0.07447699817888982,0.04671280665039576,0.04464901178723722,0.011092893775479748,0.015454917508716628,0.003043970538376451,0.01175291152137495,0.007431965948757739,0.006251961911114689,0.006498487204351745,0.009199047949719664,0.008793920542067582,0.011832721950586466,0.003928876113685154,0.018050044474255393,0.31807797745214345,0.005793832987701834,0.06351357266494198,0.0037673130933859357,0.013597921947695383,0.021565060467431098,0.007081907477825841,0.017003911110542672,0.010132491061077656,0.00899517464565151,0.013055069161520359,0.004969613126054151,0.011142604834510489,0.0047807897097434365,0.05773077320802358,0.0019626132802950938,0.0044335164351337,0.013793214283358377,0.011263742086779806,0.009213514754554286,0.013926281027591914,0.28444809469065074,0.0017045034053205978,0.001253330239892535,0.005094417960934099,0.04274836185924403,0.007016060384614252,0.013290518688828232,0.011062935834077782,0.009844029273700402,0.0033000041737532852,0.007256153345598504,0.013023801665343235,0.0016563343553946946,0.029320612798896823,0.00976726367069059,0.007907313023938689,0.17371547847024518,0.0013843584353952837,0.004199872377599373,0.005146373770625863,0.1914885658078002,0.001621251507958294,0.06084492359728212,0.302506474643958,0.009237155287362794,0.03366409300918996,0.007823723159335933,0.012515144685672457,0.03580244009449117,0.001266263838576018,0.2819394969608714,0.0018686899195620888,0.13932140582216354,0.015748995107923706,0.006160492774319971,0.007481064231167236,0.011747742072311256,0.0036213524790914596,0.011110745680247626,0.010504916226082517,0.013292159725442771,0.002939843342885469,0.004694450267812997,0.007073540753987049,0.006399421570991243,0.003250698792776253,0.3045141314470782,0.0403333186484557,0.0018323903123456616,0.03714496286980061,0.0057083374157187875,0.022946187158326803,0.16490813721855085,0.11436885369361942,0.009329140914370508,0.01644134113932706,0.004037936682382095,0.02017484249542867,0.07215240369004239,0.03178584964784371,0.025135519744856373,0.005889827532795209,0.008922166432057847,0.005418701291198965,0.07108450882784254,0.002385481816199301,0.015759829110471527,0.00549091935217205,0.010721271015233087,0.021472579631871616,0.033891006195209634,0.002215131393245875,0.021741405021088518,0.006290214604680144,0.03509550330248696,0.10080380539656261,0.0035638154698322036,0.005561415948277187,0.005701938438568726,0.0033283602019285674,0.006235132368300324,0.09581943592754405,0.00763118002695871,0.03431471356028062,0.00269074537451272,0.03614161692970411,0.004049415440435519,0.023608179596597955,0.09019888854397504,0.10751350153982514,0.022549471056851098,0.0035997169707631207,0.07867857942566446,0.010866831030385207,0.12132204040902833,0.008778393170386267,0.01578345805105178,0.011195030215637006,0.04964711704097186,0.01734345331235761],"x":[0.2569637765813848,2.9280699422685696,9.729634212892012,-1.4815435473370684,1.346185818796485,2.701771612942565,0.7073811888804435,-2.4719255351299108,1.499810902470271,2.611817357520877,-6.379399641377592,-9.76907888938439,9.259423271256356,-9.914802207259177,9.801465651994462,1.71379171717183,6.549513858435148,-1.782951598727557,-9.150318053467611,-1.604410041266613,-6.028881500978418,5.548201409486456,-6.279362414245164,-9.921037533179934,0.01500226218373868,7.204312450458026,-2.4126758991893116,3.4563431047701165,-0.9378798926140739,2.21820255424241,0.7522269407425686,4.288540057019304,-3.2697487565634953,-3.8092336145283223,-4.425026803111871,3.6026476804752328,2.6756759002253894,-4.809101279139729,4.717162028454261,5.944128082444383,-4.872775842037935,-4.859211456166226,4.7374148436388985,-6.164758646086224,-4.7894026626999775,-2.516353652174028,8.049348480990428,4.922115513247096,-4.2687821696072525,0.7664856482318108,-9.116821391771648,-8.030715545924298,8.33298911273149,2.584612172449315,-4.272574159879583,-5.080084282107542,3.8307762014422018,7.131552843434207,-1.2480828295444688,0.8115119596941831,-9.755509915562008,0.6079377755151647,-2.8105112050465975,-4.16540294531119,7.861394829961657,-7.364120451664151,-9.645056898665626,-0.2500620984452784,-5.070106531015628,0.34120199970735143,-5.350513953316169,-6.475725057741841,8.976977017011837,-4.580986248790357,-4.575419905240481,7.941144670158966,5.431286183143564,3.979704511558836,-4.25083705218003,-3.9977010604834007,1.985865391924433,9.707674876914606,1.9816075191506766,6.801080664316828,-8.34409765000582,-4.803828183138932,-9.746430789576767,4.698749037969154,-0.9259372678511646,-3.498315297993,9.717911325907028,1.9655084200731174,-4.63493755665636,-7.211491017846017,9.125685975276184,-8.941495772436085,2.04985563884283,-0.39568332036603593,3.948152626152961,6.773269341907408,3.0383080100202875,8.876161132571553,-3.7918691647936376,9.663872823467685,1.691757636240375,3.6547883930856315,-2.770948929127508,6.859151577593124,9.930900810644175,-6.297145393609838,-4.48940847251464,7.435505856803175,-7.783980756978761,3.0761221336084166,-5.271960292873796,1.5634831029544127,9.62918301479683,-3.3769660435686655,2.180900227112801,-3.8624100982261567,-2.624313549198809,0.2973679013395589,3.4719303430084345,-8.373997758416065,-6.7490466767426005,-8.467624009711061,-0.8910841093498867,-4.365589445994291,-9.184584534678152,1.2310811854245873,-0.8099648537287862,8.968850354756789,1.3164538308631322,1.4447094897753932,-2.7377418645306495,1.3169955176304793,3.939188925151651,-8.826986123843504,3.5049562590894787,2.767268151920309,2.113124502681206,8.318745243112481,-4.5465260429625065,-9.313664010425153,4.096110152568926,8.746506608614585,-8.367729976055527,7.675693770312122,-5.171625539292797,5.146005794794766,6.472553039939992,-3.490569514575177,8.037269488872894,8.627376325658108,-5.59545066240466,-6.153788815851664,-8.954177538484696,0.30418529745743683,5.836438782078721,8.753958980120302,-5.19277820896511,-1.2456313081556836,-5.045939780825521,-7.0611562611553325,6.2027158101886535,5.815785612834329,-3.9212369283621573,-1.7545006257842424,9.302990382679475,8.712266104072299,-4.729770957933224,6.7357225996545225,1.3196322630648005,5.374924554663597,-8.399147414684883,-6.776367531694798,4.07648783311644,-4.400764070465537,-6.844443269926503,-8.290584173772473,9.896351822844291,-2.5508333404228356,-7.994508160664884,8.33928205107448,-9.281964041426281,8.489770935260701,-6.513589414958143,9.270245200067588,-5.349677670231698,4.4073979489304715,-5.385807118347032,6.890233520893258,-6.6728546912542175,6.123082294380168,1.0308791360396299,3.971716811515332,8.805657825048652,0.7427361184513295,8.497413179420356,-6.18959537130829,-4.645346507078556,-0.78975532504578,9.108808018686215,2.5071050250901195,8.195513266956116,-8.214044914122898,-1.9080524966032986,-5.640365985696554,-4.151038848646111,8.951293978568678,-1.3758473174061372,-3.4919654417959167,-3.1794086238098673,7.812704650067257,7.474225923973648,7.09462767486427,1.006481639428296,-1.2259816491170383,9.2050026244825,-5.17094572719675,2.0095158438634986,-8.778091759506017,1.7997701474026897,-3.7100940733120913,0.30932166250598137,3.611333411233204,1.0452470248038104,7.955586651254375,1.08135094908031,-9.80050171974562,5.837424012389739,9.842567456825773,-3.829755561431578,2.4357246352535977,-3.630334149761225,4.886749287902621,-8.205415410395457,0.2945202810146519,-3.4149522301658353,-0.7582841436448007,5.639207881033466,-4.077938473315164,0.795703375917185,4.167798076636897,-7.408784175417096,3.2658006938592177,-6.431092204789661,1.481444133002645,2.2474628760449775,-3.6133230642490988,-5.556820533026592,1.7038837165627285,-9.309167209394765,8.695926429242512,0.7572775818061359,2.651831000444247,2.580256118590043,-5.9411871864259735,-6.396660889967958,2.0472944384165537,-9.209825817736515,2.722904629126246,-4.298928679065823,-2.8601074242300406,-7.639016161958132,-1.4059415644519966,5.590174527638601,-2.309484292928037,5.293950390742248,-9.05582673302984,5.542696975470305,-6.413890436009266,2.869905066400449,1.8908110415830404,3.442757609103637,-8.830877155828198,3.0194199906850585,0.6439467198671487,-8.115616068441396,1.9327199090662273,7.594748573908618,8.646511921166425,-0.32064842713351993,-8.307477907091947,7.308764430862787,-8.442855523331222,6.6384170938178855,-1.7207469618624174,-3.9115790217109803,7.057326434810186,3.419127313892524,5.395940801881984,8.15674544350503,-1.4047608879662388,-9.810104661661164,2.897424212287296,-7.795198513942796,1.169382541718944,1.5499152685045203,-4.75348492081388,4.014640699588114,9.26776039872767,3.660875538625824,7.655121556146341,-3.5505919524970775,-0.3662427517456912,-5.03371903756384,5.537389738133154,-0.066579182683002,-9.908282053191563,7.218588363225127,-4.906874283591525,9.537007711733196,4.038632326417147,-2.1851737616460287,-1.9974074950916698,-5.944147212866362,7.733164936509919,-7.504147802605057,2.4883248581060293,8.334941916351355,-2.316831562866928,-4.139201483945918,3.493116437826922,0.34754185791955905,4.5783612180697375,-3.875581014304159,5.721704505076017,-0.3039505767796733,4.4041459881588185,-7.59949861736767,4.354421932168666,-1.0849949273670099,2.566147716143302,9.779320885082772,-9.647553166503258,4.355709608336419,3.7740161199641165,9.262926691631876,-5.589753625343397,-5.209180773421149,-7.514736948692913,-9.0322358483075,-0.3706813380390539,5.029086520333239,9.304320964984214,9.862678054684068,-0.47627539442917666,4.739916542302529,-4.215301414611234,3.193047015429773,-5.6772000950486445,-3.791649067738354,5.5955229145337135,9.66064708393613,0.44262239715160945,-4.21526585819469,5.775664301437043,-3.881317800260038,9.06044304119365,-0.051903229331951906,-7.64050426033525,3.928025257177076,4.93221842796212,-1.1740429905376715,3.0114497130117,6.086395554312844,5.785789265582096,3.9847933586652573,0.9212530523829621,7.42317729695198,8.572370771112624,3.58681081563617,2.04047930046924,-9.35867300706227,-6.391824297943369,4.953758104051333,7.308518379275068,-3.4080101001160568,-0.33946489913509126,5.491637633762814,9.33563655708685,5.657476773009083,2.0752342456949524,3.554128501983932,-2.767558729100257,-8.175056615436095,4.288609586517085,1.5599595931658108,-6.179117226217374,-7.156149280091433,9.223236340292516,4.078479755391413,2.400224327053122,-1.5739681575070197,0.30404379137983106,5.3374641081956575,2.0365015394449983,-2.3626529216443526,3.347868039061055,1.9763775560402674,-1.0008436163623067,-1.2615005366441459,7.740533474477353,-6.207602124858309,7.512080460513012,3.3022364668437056,-8.870627476515383,-0.6087410459042673,8.715975653077237,-6.527521439431148,-9.47617530697113,-9.894044421557041,-8.298287781187978,6.6689248275522885,9.382619939634811,5.521673058831681,-7.154842973912254,2.449036740390156,3.6364468779024683,8.040023936311979,4.606437446934066,8.549140293950966,-2.15513302175272,-0.2765443297989023,8.823017345641855,2.1285296352478422,-5.2465126644909965,7.549482139313941,8.152573665214454,3.372498926417782,5.977449964634193,7.2705171488559905,8.471045014209977,1.1258744083512653,-0.854740398659942,-4.434642080409996,9.340836737326232,2.9568460502055416,0.8341512982880275,-4.670222417161596,4.173884161405418,-3.9155232180973876,6.384535078835782,4.924877467696307,2.3957162610331686,-2.4117618620646564,8.915711552100284,2.8173486497509526,-9.09532158810161,3.9822366141848917,-8.592113883531812,8.535683978812184,-7.990553105719127,-0.7556713136793114,-1.647717057938216,2.4976490777211513,-8.611058334696619,-0.027423463648688085,-0.006435316681457692,3.037694392595075,1.395355888314418,3.3937609199121255,5.840194965164223,7.443237915090236,-9.920898131590953,6.0067357803268,-2.973961943455712,-7.723124673291548,-2.279734382312175,9.099193235043487,1.3834808300927737,8.579749087914731,9.709281140780849,-0.2880521568940111,2.3577173572234322,-9.11357492555279,6.844539784224995,1.3297290615426007,-0.28911734907144293,-5.276553329220457,-6.06362549144535,4.6833442355481125,1.1308675111141042,-9.189634632906426,0.4343817554071592,-2.1912378715905456,8.97002363206575,-6.8548121696709785,3.738336527475944,2.9526090231638022,6.1022250642374765,4.665083377435707,-2.574722304532502,-3.5707701624511756,1.4471287786890663,-7.949059008595225,-2.344530856370599,-7.331940610194354,-9.412721871270357,5.678540832907153,-7.316266844551675,6.770193843746771,-3.92714245320104,5.92559027425461,7.678078689542467,7.815179106542111,-4.795570087334622,2.6293418382521594,-2.6601797746081157,6.33831423527338,-5.12557784500026,5.928870185894134,-3.0538233936433956,1.2854155317593374,9.710553754632237,2.5940473072704506,-0.1673558462837299,3.2489946279927917,3.566149791867076,0.5238439805014963,-5.0641852000208765,-0.7769831389849013,-4.989368677074539,-9.023854877438279,1.3110118439782568,4.194787219353753,-7.684973163205813,-6.945855009717441,5.444113676173949,-4.753104499637111,9.086903970968535,2.973148467695342,3.0534312927555884,-6.322145458502195,9.391910869088434,-8.529124765055695,-3.8385435774010945,-6.348313734093516,7.031883950598875,6.7183965491771325,4.514484358839063,0.8266574552770543,9.529625616396817,-0.1371700987229083,-3.1955746216162284,6.441193286994576,2.1012114193003217,4.597723407390939,-9.891715683339072,6.179595485436707,-9.12730236481699,8.836563019561101,-8.899997331843874,-5.012179794985863,9.967157354065485,9.553377616010827,2.4746871230989687,-4.619384592889704,1.7658667202269385,-8.54646149452671,0.2225304568169264,4.1217542699105,3.9897236904019717,9.222388299534249,-9.193385042867547,-4.823341767472802,1.6921694746490665,0.5040415144815746,2.910330153038334,0.32311150973861835,3.913550950904394,-1.7577144284522195,-8.061930342731657,2.2368109561169405,1.2803456563979587,-5.308855392532412,1.409279635430579,-0.016801789937979095,-2.429027824236707,8.875663695262908,-9.514182999631316,-9.96443119607267,1.953563122051957,2.2193246518753895,9.141023401017371,-3.333117575167912,5.7153414522384125,5.123565665995752,3.006408807869807,-9.060732690611758,-4.259926162912713,-4.467849769976757,3.2304100727086027,-7.952214422828066,1.4261331948251499,-8.779945504773012,5.694933711463417,-5.342942835743449,-2.964474370106185,9.068914425371005,4.370866993782698,2.3276099899444844,6.744804945932621,-6.662361815960276,2.063076289228256,4.268825254281143,-0.5919645409430618,8.566899091456524,1.171419227955365,8.017770702645926,-7.136953691777759,0.7614254019721578,1.7407856476501848,0.3270104747893221,6.51283619536116,-7.736280044473505,4.063855650060692,-9.531285841555777,-7.959529668586289,9.258916501659343,1.2786058865838825,5.671679248339503,-0.6183040785038543,7.73892636212679,7.09130792736401,-3.259605451388965,-4.461663690133313,7.0830626247419985,0.6892271515667261,-8.558215581109913,0.9541676506681682,-6.959763816438755,-3.7555500674663156,4.831538618029111,9.248565295631547,-9.442518594959669,-1.199327740137356,6.680959567691097,-6.568938038905032,5.634830847380963,-5.667185397727872,5.276810297712625,9.39507622619518,-5.390372267463928,-9.044541785475552,-9.752013738425141,-2.3150995611075142,-4.637704592071574,2.9378838509375313,5.7290110471283295,-5.6419920029745585,-0.24878872869441437,-4.778085960166445,5.437796937790186,5.29297937954626,1.8731500966806145,-1.865636167171992,4.011603261364938,0.5626657174701233,1.2786190091722602,0.6660228701958957,-6.336704601080156,9.779853414099826,-2.4092402086718367,-8.496768613808747,-9.033664050646365,3.9976975336739216,1.409227187478809,9.339410406843086,-5.405791946382483,9.508945414585575,3.3049980977052087,8.040277738627385,8.536477950490422,6.449962705493483,0.8217081377922408,9.479750273578425,-6.399810379692017,-7.755568479473216,2.558307207652728,-3.875031171703167,9.005877500432625,2.861377652628633,-8.787502300889827,4.186269120313568,7.307772222663161,0.1314649229281315,7.900492853153121,-1.4491668267734568,-2.1378408306203456,0.30773866564894803,-2.855406458355416,0.4222781627105441,-5.104526880370721,0.9962697457530467,4.169778389343342,-5.9329676612821025,8.43485368366003,4.876235031773408,-3.690445682362813,4.948012394865557,4.7930663970496425,-3.70625230200075,-3.9689253337303576,4.815343796064306,7.213351690860343,1.1955667781798454,7.321756611672285,-9.976926754020749,4.552604527484938,-4.4661400996744005,-3.4871041208315745,2.6087848537650657,-9.925232820812333,6.854109285638149,1.679867195521405,-9.905172842769803,2.8263688734859507,-5.6796464909795885,6.109747243912523,6.941848549534484,-0.8073664660975801,-4.113866714394421,8.496569408690227,6.26878052390331,2.8806014497938026,8.638471488135927,4.025211852500391,-2.797364350374676,0.9673083971145502,-9.317111428201361,4.622648037017925,9.536179745145223,-8.085025962041463,-8.931239813483058,-2.2998309972351993,-2.955051115048124,-0.12097664042600798,8.952141990411079,7.60860006262163,-9.88321483969135,-4.760269293475967,1.6232463449009913,-9.488588411415314,1.6574027460452498,6.940648836332567,-2.326815395343287,-7.213191100096248,-1.8419589830276806,1.8644493209729198,-8.992535569497417,8.780101687424278,-7.324805692683385,-3.9831824726712606,-7.457286582504574,3.811375718942527,-1.5768640327282348,1.3933427925263597,-6.477776918703175,-4.272855828469373,-8.057658671653671,8.83228126761512,3.788675629656254,3.472987259939204,-7.808820733574362,-0.8328412586032385,5.436161943603107,2.8934873303019906,4.721057667452566,1.7631718748514746,-3.338847367041353,0.2987709724965537,4.568859501942587,3.0474714058912156,6.647726249687459,-6.5055895671555675,8.924162295460917,-4.681567150633721,-9.80705614566423,-3.3729374903688125,-5.683078687129353,0.9871866740434765,-0.2476726883299527,5.375193687746659,-5.8377850890123195,-3.2111186860041174,-6.57359642311794,4.4938310617955235,4.205917750166655,6.774791404565029,4.312913676453292,1.9182116766193946,2.250101969435466,0.86693482818173,4.596510651452125,-2.9436367414397058,-7.043374633950608,-6.044845457926602,0.7270312772929586,-6.158734576917744,9.607525306454132,-1.5029406944858525,5.641043365438039,5.0500764139914835,-3.990823675068782,1.2736036563694988,4.02563568138833,1.6255020409656762,5.971664885998553,-8.23456543266293,-9.096518445006897,2.708666503920698,-7.772600038571729,4.1284743732498175,-5.701773197707936,-2.6247236659123274,-0.8525662225154207,-7.2507247998342805,-8.766822506985243,-9.082092505823006,2.4285163445363533,4.81578570658499,-1.9612339190996497,-2.132552534376213,-8.398667554015393,-1.737437848175647,-2.8004148947540264,0.08519348816170336,2.9469799579316316,-1.0862040526457726,-3.5115542515286213,0.9812377640580472,-5.572228605354135,-9.284523539482684,-2.405802696990005,0.9341074930324424,-3.8396205825394913,-9.837465882872468,3.237218855685988,-2.8903713592622937,6.663101442916307,9.533381471837519,-3.7985551215890867,-9.013406511375376,-8.72717383337234,8.179952867604396,8.721048325762126,-9.7076489853929,-8.594259990703348,8.187775015124878,1.0517306734238687,-9.594291788522158,-3.973265782391233,-6.244525614852874,3.439356143576884,-4.586074447614905,6.737908698573914,-2.182782609432743,-6.0705653108308155,1.024826976813472,2.1019814692245333,-7.676633525933263,4.366638332036462,8.599633357022793,-1.7767629041487396,-2.4235165378003076,-1.7341830766150892,-5.30778653918794,4.7083745317077295,8.56898365210374,-5.601868468044291,-7.674927345736484,5.308581510406437,8.491018722291965,-6.424751365047152,-6.796493893293203,5.294681639052627,-8.228770769468845,3.4650466385345258,-0.20389181906763199,7.608571390822732,1.6586521441528532,-6.4508519271998255,-5.133811551322993,-3.803450168750846,-6.080480896730376,-3.839408820957506,-4.861989480348545,6.822160688329841,-5.137888855290718,-7.42831967685766,-5.569603181378557,-7.107340963902513,-1.9086556855391024,-9.988657087075289,-8.679749258797855,5.0816000642503525,-4.525990211834592,-5.413094081289667,3.7136324668186127,0.3088214158004057,-8.831164479154188,9.343322253944592,7.516682542453935,-2.537590830121781,8.104657312763457,-3.022701880584542,-5.556543639894738,-6.353749231455232,-6.2900122776540845,7.426241430179484,5.002342961880299,-9.437171271844026,2.697615791642175,5.650868248304581,7.468634719834377,1.0503784709156818,8.258539255689147,-5.786552879815603,6.143591967480621,0.9435485697753876,9.014009590673204,1.7470483833642003,0.30334777748294073,-4.7349740345497215,2.7595034560995266,7.5319861765097045,-4.436931630257477,-2.709106510276036,4.350956917429386,-0.42750200438750774,8.730766462466043,-0.7878736851587131,4.42644198856771,-7.163999582687537,-6.208933037708602,4.471434579093877,-6.390182046601507,4.926349639615788,3.6855969330734784,4.303792147858676,7.968820537438482,-8.681409708626365,-6.16665680628838,7.685149937405246,6.790112277184374,-0.38504351017737193,2.6270374234846408,-9.63099485818319,2.6951719873719817,-7.845543460959621,3.182428307798375,0.8605115235289507,1.3298195075459809,5.832211665484191,3.7294412012148115,-7.364976831933938,3.786860092480522,-1.5412145465721938,-2.829210056585696,2.642226249378119,-8.076363491610552,5.784050336198279,9.107070267189332,1.9497798964144586,8.751170253148537,3.76806109565587,-8.9523119218218,5.2126848404427015,3.532271164895775,-2.416777775540333,8.040311321180624,-3.7850054376129627,-8.481713205214056,-2.7352445881973475,1.5245949493807487,6.482379023096762,-7.974766276979111,8.101350822125461,9.192083523448584,5.3944172055769855,-1.6341871481900139,4.511813429558149,2.647611214554253,9.083962265012318,2.3310025193755823,4.849310266778177,-3.572195480365097,1.712319411140193,-1.537561419132075,3.5374911607092763,7.078781687151576,-1.78890405784513,5.9777392870093635,-1.3123568023400978,5.670809668542205,3.728749529850365,4.56662086885312,-2.279236744733142,4.333769582740437]}

},{}],135:[function(require,module,exports){
module.exports={"v":[16.723936850502636,12.037302355243739,15.754070812235721,18.729844261798156,17.064484787919532,1.596863048083219,3.7104088092127174,9.714513590606199,12.494794981286894,1.8162108945114364,17.571169718215774,12.853765852539883,15.104988056746173,4.713038951868231,4.135341311158687,9.174490999422499,2.85195695595037,3.530811760582213,0.4779036492430766,3.775512449201339,17.220534934097586,4.3469227474426875,5.545279981412952,2.7447588664484357,7.995443289987443,4.9629059780667095,11.071144143843314,15.932736516355757,2.401484665468967,19.486771027414687,9.96880338232289,1.7641968657845197,14.22875955484518,14.613502556071186,4.462446889913907,10.879468670891267,13.764888211166406,4.378912802045534,8.88036888527569,14.788952154350309,15.978510293627156,8.815576571314487,9.07651954748756,19.0109155947423,12.29987681704117,4.085953877815149,15.927314563642078,17.058211686879954,12.280302431492993,2.817496009745959,17.870502341375577,9.157108654049328,9.72437615863421,18.196824252600344,6.012286793212844,13.395773420937527,9.270050143946897,11.931990647526746,8.153295837896444,13.276086444747875,12.653376989117113,16.57456995913745,5.874989938583828,7.781631743699036,15.93383560338863,15.606434977132292,0.29347769545390534,15.933500169865184,10.083621687924005,14.710002342422674,6.19356195746918,0.8784052061653691,15.280751437777177,18.917312785149292,2.108203035799532,9.359612934407547,8.421422769190432,0.4674155983429662,17.8209478617009,11.401278625237694,2.7869015189494695,8.916476914154398,0.4031587510558188,7.380292977956815,4.528228976033768,5.7542225226695365,11.962680083697492,10.196946645121766,8.719365912703282,2.1030414372206208,4.656602365626816,14.841391747861818,7.511176411815734,7.304206317641033,15.544774308341186,5.660896494028171,1.4488353973306989,13.391927452777551,16.19871468346537,14.407156507512337,10.823792032552202,14.77929244607941,17.65400754016726,11.74910333462524,18.38046876413263,15.724892144577186,1.0730350623462659,14.854378141947668,4.235064141840157,5.398667924090819,17.630331572780314,2.3106361046561075,3.0783657012041576,16.054469793012927,17.954951520889235,6.609037438801635,18.435122264786212,2.310148234834104,10.689618157212774,19.374559230678834,12.753407292260995,18.068218924389477,19.869395125104518,1.0732931558053105,13.083532080662446,5.054227825545028,2.4511016142497066,5.892839729447039,16.823317475034493,15.34521118887772,1.784445191312658,11.780935552629238,13.389229141494337,17.68576910878789,6.609076344491105,13.702686943541686,18.51066754982761,4.111904072090802,6.164103458154311,3.8075760798966662,2.2367680738760454,14.399570951729137,9.034692078922024,8.988348404262755,8.1172957624652,12.223175408260127,3.6678652956998103,7.161730091168748,15.844862891266377,10.231364258808133,12.853108386031721,6.050063634679752,12.150132934332696,2.583053152846171,16.80271648578007,0.47764600211205543,3.1018054765338743,10.528570407690507,13.44700736928572,2.039565697017074,7.076881752709534,0.7040962442492482,2.521439731341295,15.358913144923424,17.533599178752574,8.546543733445645,12.434525141121014,16.794360349272495,14.222846447667305,12.927075351655368,13.872510023820412,16.370225392509006,4.390774725007098,10.097123789739864,4.593496276031068,3.8002469386280646,19.467248854271475,3.45281722892389,3.349478794537162,0.05380972959367458,11.353837690778956,12.154289995724913,16.51472527420761,1.365049745121647,12.210910547800786,2.1574183383417767,1.461297056031725,17.67210587899939,15.030893164704224,15.994007464267996,16.561676913215912,6.913214614766461,0.2192225665772929,3.393883060125824,19.227545855491606,13.791479710652915,0.8872863550733623,11.194522466538345,16.87230118691773,9.187492311735612,4.12757587946778,9.232404496584618,11.910492564184123,13.44479866706941,13.41487323321159,1.245266995541816,17.646766297432475,2.1424525522973026,2.559171533697744,19.495991710931865,19.965018334563823,1.0434104667392896,10.894696109804233,12.310664193751366,14.163565031837152,10.791980636671955,10.138151566874765,13.683302356911566,10.045053553124283,10.176076098058061,12.35498964392332,4.108888410149398,11.140358999034712,12.665711679238143,19.394142033906462,4.949649931434124,18.55726242683594,12.621719131787303,19.014953401556532,14.458890630791421,4.175335096165176,13.098816977449337,3.2268482789488973,17.638761935852205,18.339473751711072,1.11341944124975,13.992997960456472,2.861902330753172,14.788029855419103,2.62098063990158,10.850049672424102,13.976296217281007,14.421125313065616,19.593583371572567,2.968897647387956,19.06657652285746,10.053783258615926,5.248666879780197,19.3839484009491,5.530162169633379,2.4967741475980754,17.610121256810366,2.692460336806919,7.998100411728224,10.178442490064704,7.790736905046467,13.675153844163649,1.9538579374461484,14.982197599297482,18.25874052189526,3.359064337149711,15.071272370700171,16.647812054646018,4.357274321677691,19.363887922417476,10.150497622851177,18.134647861328137,5.759182541243741,6.247786115868417,7.05764794418049,8.053680920778818,2.2598342952163497,4.778731863374737,6.8971159487404865,4.9517214742802285,13.930983166092158,3.47818529097204,9.20028442192066,5.171955373277317,17.13202212152387,11.789479779774439,5.980806071988796,16.847685213843526,4.365621112418121,15.93270618733747,14.664861802912146,18.074322951994017,11.635140506407451,6.555264107524281,11.905337360204197,1.8200910126746939,17.49585446286013,18.656896310892623,18.474541239483887,19.287620252368853,15.293529301591144,15.073001464770659,9.704833249626596,17.937923586455213,12.67448793419572,12.701302206894486,8.154100852638063,0.07489136571622979,18.332638507391998,6.059587115419194,10.119563045197605,8.221667920052308,17.599040257363868,8.33954438240228,3.3053109526282443,11.08615165873266,17.55408909691915,5.42370498620202,5.001210811659185,18.616505364981,11.331924316008832,13.209791568822414,4.961434468171526,6.684084738818146,18.224988758354925,17.87204211646366,12.527066616731375,2.7251297171856415,14.270178921675146,19.824728562430547,17.276143328168338,3.4369603624365075,19.23812547307073,0.134845746633121,11.09182644002891,12.642925856861691,18.658898749623944,6.567534161453916,15.860135941082945,12.807476118935881,2.279185516999256,5.090664553002875,0.45430495402783766,2.9852802915123267,16.34758770446108,4.662884771222218,6.6639090787612965,1.7808753523525045,16.754739428938183,12.103840481383848,15.221355987923681,5.168788790458696,19.891592687502264,18.950819435697937,1.73815157962538,17.503088381764623,1.0289496464365744,19.709548323794223,15.517461126481304,9.611348707911356,18.490327904151652,5.685317572604531,17.50480913008641,11.180360719582204,14.130485782728734,0.13899865561440183,11.252324015456953,3.1070368316979513,11.496854274951387,3.332402509421968,14.995390353786009,8.390134071524162,14.65967113818472,11.373420745257935,11.124569476130727,5.9089894802367615,7.33627129970833,9.449426047131798,18.76806892052697,7.443685510329039,15.726017225668283,13.011064286308255,9.398825184338824,7.035193367674748,15.13531314401705,0.6716301481563747,10.12389016318281,4.796589184841826,12.783631402521314,2.8144646675673934,3.5486707307558696,2.397289992005218,0.6036508247015249,8.779575065274162,1.9016813064780358,14.150696765030183,15.149033823754458,6.204362737043825,5.1980765202709955,2.4472614178610286,18.74953778877085,5.798474545358179,5.487786237718155,5.040566843446892,18.945858069805773,9.45504554766166,0.4423120974092276,16.509460368094405,1.1116942272096253,0.360065284245934,9.011321266366927,10.544280835995083,18.617251023771566,15.902336258059488,0.7481335029304725,0.40356963433610726,19.151425940295006,8.949196458866705,13.75703151658942,8.206247526870962,19.148383389038763,2.388405722643445,19.022853317700765,0.0737617428879167,9.386691069579104,6.882003955497491,6.7243356704080215,13.03778663171078,10.671132548307964,3.063869691902159,1.780718923619995,18.33138047366056,10.999395674683413,19.269947821786854,15.03043873812054,14.393772436339711,7.7901296563781575,5.412515390481878,1.997327013165262,17.150040936264368,12.074650773785386,5.67065593423457,0.7970008647498927,15.372624125779279,8.20927615050682,2.17428170222421,12.08247340489681,8.686511005578126,11.415031483059304,11.855135403716236,19.70116126501071,12.950394139431026,0.5499578912105951,17.80885890655292,7.817575746295109,10.282119820455687,14.502817839870893,10.900388651411482,6.818340943911498,8.192353327046291,0.9068525702140118,15.22243810922939,16.466357974436413,5.950474076962617,10.04900277082192,19.782348279539534,12.282149387653071,5.908602458258647,5.696770568032412,7.546138730087746,13.886902486335586,9.356755401205415,8.544269020238357,18.06243876748768,14.694718401527593,3.7110048009621455,1.9653116415362781,14.197625744648228,11.269909196835881,14.935231505408385,9.31440048451083,12.369592079349792,7.102289282087884,16.215234820096693,4.283546068049104,1.3025945996709831,10.68624208106347,18.868076806047405,2.903564192134329,0.9680798389199685,15.463451182184027,10.482396855329409,1.6720783890207702,19.338938449307385,17.418365578098648,10.623456796566199,0.104994822056792,7.7736785771082895,0.587998077234344,19.060402204404557,3.87475161348779,16.356328862205878,10.513298753092126,5.002828969355955,13.055647650258502,5.30726575137813,5.683174532350335,0.06610051468484812,2.61902503517335,13.01759739714834,7.860108358322435,0.8542816456881797,1.8864562860574186,16.947976460173955,6.2324419065293,11.74348012659121,4.989485982222073,12.27112253837888,2.685935191667177,13.107491143125927,1.0458208000257985,0.3510425793543481,11.873395076132741,6.325798893316148,3.288844920578522,15.696781608929427,4.497792345603395,7.111009467787737,5.1021401676073985,16.02538139981234,12.411827964501953,15.615664956447354,17.62934050664952,3.4128148775639566,9.553890097272877,17.12405078225605,13.31815422942736,13.067552183604402,8.945540853934748,16.274699868384896,10.027782839348536,18.964713293526188,10.275123282352832,7.827885179662046,1.7301445870338972,6.005497496938927,14.450587610188004,18.514595259190834,8.415097897515015,1.555371235707912,17.39374468284284,13.265030072961492,3.7267068753121935,14.809050026643051,0.1269514743721034,1.8061339518229325,15.083006769320422,6.583486815685764,5.694865028532341,13.611291827517276,16.696019282656525,18.566300259656302,15.411056804606131,12.684930617962697,13.451804672157062,7.734220497950108,1.4716245715855436,16.17887840699695,1.5224570027723194,1.1919686032833798,18.41780285389136,12.69804197033693,5.991488911924008,1.0393849262884647,12.846861906896386,19.08982149265494,9.70786361445571,15.201482806828146,16.24780295224447,1.8058502082822248,10.309513745879126,15.098400848105985,13.675175716085185,10.462235546243397,8.32003461301797,4.410764376363705,8.741521557904708,15.368462020968167,3.6471108677601105,14.314419135043966,0.9903681810644205,7.444622435572201,0.23965510369049703,2.216593825360751,6.300623881392982,12.363497934165997,2.978296222927792,10.879084062215467,10.833059381943908,0.2209645025758311,13.54013808700492,9.6335979851311,10.441208385845254,13.150063005353672,1.7113217265902758,0.863588060878242,1.0951568415403967,6.28380024613131,9.089639913133025,11.459292131229692,19.50487594652138,5.764392028688654,11.733653719275292,8.188502612591012,6.21426830024248,8.648100550369389,0.49735384905156277,2.663607521353031,4.262394973009891,8.667690420180293,1.7616539570581846,9.748049998142076,4.830942846429029,16.906480015767087,3.9005103753795556,18.050128312429973,8.093741618422822,10.992933004139829,3.0013861278723564,16.25235209849981,3.26831533317824,4.179761815466785,18.045766108280446,8.575027905342454,16.520523703046507,12.898730936478028,15.378603829245145,1.565813617836489,11.100309690916234,15.793075055393766,7.509179634108727,0.9299950777085941,18.876112037245907,17.81742334788422,6.756824629026266,7.491014498083026,7.8024809147235485,2.5902115386825963,5.151077923559533,4.795185756239628,19.60477035763901,15.318673898853788,18.80746737961683,6.780954640986363,5.815945002446941,18.884522792634336,18.775203567816888,4.823237012661421,14.814319870959721,16.23054995104311,5.229248430494566,14.357972643462361,0.5767068108876927,13.68839709891926,19.280855148047728,18.582486023937122,15.093279282176791,12.441816317406822,14.00571756548732,19.239567833504726,11.142015278205317,6.387297884228431,2.1564304271198553,2.6835437248493177,8.63657594813866,13.652831503643297,11.924050698401928,18.972897329514527,9.0717936643434,12.738459293628676,15.554212862125096,0.7512249636641499,14.256230320237924,5.100395917379514,0.9314014582667385,16.752495061294738,16.054074382959346,10.397553913770068,10.490131083057,13.070298114830496,4.443126833692186,12.667279567558069,17.902229048225593,1.3260749594567223,9.793385072444444,15.916627825524037,0.047022878152609415,16.915468024940665,6.700643318772279,6.619125688647061,7.633733244907495,13.020774301871217,5.85536323695913,11.062276900187245,13.507964702391074,8.396787068457293,12.498048697464172,15.836414815818326,13.787953332557406,5.499012220365511,18.56031246818054,5.055572922073011,11.28644799307709,2.256939983511299,8.18830959149697,19.015713026420073,11.308889011670825,2.357565561020998,19.79657148509775,4.362276780560084,17.87197714181985,14.007471566383396,19.156335587563632,18.545597530922407,17.98713826583459,19.93679291586567,1.000992116213557,12.036562553682435,4.0903605843434265,17.568332137553256,17.900218567297802,13.445008201242068,6.40854934026625,14.774430167707703,1.8062846336302218,8.378395897609114,7.799115189978747,14.41698363102065,2.5604173191141077,4.357216873936585,13.135331871608136,9.752012366194812,14.216493798571364,6.029518446594113,5.162947435853575,15.23531028627566,14.96764839645019,0.7169014152071806,14.411537688056946,6.06573808639868,4.709013851703188,10.85667196422797,17.84863623639819,10.550667969597214,12.47542864874546,19.054245687729853,5.720332506637726,18.203150704257926,6.047790782672209,4.030072240500733,12.240784027949662,10.63407351362609,5.0191182467153705,4.041079594587007,13.581869788432632,18.777530238769195,1.1319755976844181,15.418111702975681,16.733268111075038,0.14640602826861748,17.392602238005797,8.687857313307141,19.236968797916084,12.359196345580052,7.106668845220163,11.6807175638194,11.06174304088344,13.56958324108966,12.153415767021762,2.899025358382974,13.951596693350975,2.7895004594999495,5.032921435219384,14.894257558750459,6.5814407735088,9.50950474326433,2.139263077767799,11.06213545433761,12.159630854081179,8.535428032080121,15.2379857862438,1.682705393368158,16.3393656314646,7.023307393084641,3.5234419402488504,16.94672382168052,15.176862028547644,5.169943937797199,0.39178610441814143,3.555947550813121,11.79624965732085,7.650335663972547,8.051436832903214,6.4652773006940345,12.850831221746919,5.785245484313064,14.369889160159861,10.835107902657533,7.21037712880316,18.234288570118643,16.72645294988888,19.521656816276636,14.713294649438815,17.873807866396575,13.219277955969698,0.586660999679296,12.791962121153894,8.905384742179269,5.622742737574797,10.235654924161434,0.23244043880834564,7.90688869592493,2.8307004874158226,16.115602985559914,1.9608073984386465,3.0408925845212176,5.407333806023886,15.517026414801634,5.575189213648732,13.005182157081814,3.7448819210179973,10.956915374708105,13.302992432856362,19.333142479961907,4.229213229612774,2.9567675938334093,3.303833037527215,14.475251786311647,4.44006359120082,4.653264734991458,13.287042714061435,9.748759865462283,7.281805064976439,0.11811478762983718,0.7304570773079933,0.44434227321476616,11.869810741208235,0.4839650219815006,3.7962633026852544,5.4649397257137755,17.194065805339882,6.484824546749057,18.29220343785682,8.002867419788323,4.659090286255303,9.514457979581522,2.7864457455936043,16.355993530353032,12.74655083735006,4.129625525769991,7.5365578544746725,6.835264138062476,10.511923015709495,7.928526439117962,18.48681141801506,9.363384451350933,6.5103941141538835,14.839321488030803,15.471255892766148,0.0013451698282018754,5.517347762967013,11.735294742289621,18.9694707889759,19.603728007893647,2.5573089136129967,7.304141747371067,17.499261936812456,17.481883728390027,7.549969513417025,7.745089369248541,8.82414789477254,8.487751712623917,3.7600130817294186,2.3597308238804304,11.03420915723035,8.306694702253283,6.249154249684912,9.494048891754145,4.56323941845969,10.706905285355619,4.7459039004791626,6.9852367551715355,4.444227327068249,18.328788127482202,12.142358062639357,19.325264054260938,15.92339816618666,3.2607093321605696,4.18109419256802,18.625936012635957,18.818096237033362,4.665805792412465,9.459771202322873,1.2982785602563185,0.7285992789480922,10.72887882370865,9.284898010733333,18.96943020399942,7.27792348667327,19.712912416404183,6.10040202120826,9.430635823281058,8.346345684042031,8.392204506310943,7.803661598202276,15.529507303049638,13.482757635175759,18.96559722160902,4.024825243195189,9.129595975931801,18.854386601255264,1.921529393533965,15.329067484923735,1.9964513913039905,14.357964171930465,4.452226288810777,1.5244180754378345,0.9475285864238625,2.859139073502428,7.9418600679389595,14.938325246640183,1.8402002298195086,13.080019157252032,14.248135068728152,9.110522827838675,15.878909854543966,17.125880702444455,13.012059722777568,2.9469514559326537,8.809644967691469,5.837368590160721,19.31245285214025,2.7435650291165325,14.169370292420304,10.182325995871615,3.8452751482050207,16.523533262923532,4.242347770623915,11.794195453867298,19.765090844308993,19.231769679027956,15.46661154003763,15.820307582362766,5.6644584936311615,12.437060949259568,15.95101776554609,11.242739530281781,11.89236852859259,4.980233554262727,0.04099506832317967,1.690113980237009,18.112383863896998,19.340589155599403,17.312429955331005,2.1139305411972087,13.812751310354443,4.691377600724689,16.819617386369753,17.68213522205532,0.005949144000640949,13.745127959244488,6.011267113537553,1.9512382045604726,6.330827204576113,15.73634078376136,5.816022334954134,19.83040642986284,4.347909651986717,9.408869916321336,18.07268313767764,18.810833038586367,11.394757617430837,3.1767751155890833,18.318022001365076,9.392408747479655,16.059401028249063,19.98663365230057,15.498616890323857,8.245918321919907,8.295228815589413,9.585452407841512,16.975337454859254,16.958214309667067,12.057978314512475,4.907028606764232,2.177540216633682,4.60402318539781,13.669264502263111,17.990389668505145,8.704947085546678,14.111477626577823,3.598537385483156,0.008424949468106568,2.4385325684323567,9.583407617234796,6.271451613013026],"expected":[0.36215998868309357,0.2811580683043483,0.3815954419523002,0.37479786939247145,0.3518885182142771,0.3049058702125067,0.21487654726151895,0.27969587861131306,0.39011917920655553,0.1953643163787628,0.3932964401152697,0.37858647963302405,0.23513224598778518,0.3315985027549724,0.28987933789459536,0.3237376299301626,0.22825561756949236,0.354990846598551,0.22421713487835299,0.3167915311811094,0.2589911862661043,0.3609483786063713,0.3051723898483102,0.30761674136653977,0.38630881714903686,0.361545318775062,0.2402226440342632,0.266597076449,0.3593431790260108,0.28561660360336555,0.38821063043901866,0.34682420612178605,0.39198048465863156,0.2864924445869186,0.24448104168329776,0.3838670123272173,0.3371265378834387,0.3123065328282531,0.2330406966241066,0.2999021341805725,0.33787521228614653,0.37118406310111296,0.3157008894867204,0.39279073094235456,0.3657014605750532,0.30286184348984124,0.3497879558524051,0.2546072719141258,0.3908441919820804,0.3628396993377357,0.32666880783707514,0.28989223994739166,0.3884708187623156,0.39198719857453274,0.37149466343868115,0.3674702975907159,0.2582794695254092,0.34987176738424575,0.2723021463302452,0.27221616156406014,0.3771581686214047,0.31255082466345185,0.3716799802711076,0.2713805630941221,0.3925464045564436,0.35866611579306634,0.16068031797692142,0.38630736038538005,0.2631822000286691,0.3453696302203521,0.3816245054764876,0.25012736300247324,0.35012170718236824,0.28671493305182577,0.19544140195563495,0.24220479915979232,0.31015799036021935,0.2577151132757332,0.29485608094063526,0.39019633636620926,0.24716773941542863,0.23002179358499036,0.14773354107762066,0.27611056913911874,0.3584386780726475,0.2892507691319376,0.26505154460511227,0.3619563904268114,0.3296491174193873,0.3172725053967619,0.3405954605324812,0.3089998669176198,0.3790552961720108,0.3118098148207386,0.25599896586289356,0.3814242117163503,0.18400188272248374,0.37388919438560136,0.3612630097769643,0.3598582608906897,0.3875261606082551,0.2387456050102867,0.39297572898622585,0.3172899438803092,0.3364906168250176,0.3563269571201413,0.24017567148746646,0.2623983897561057,0.3478574825842931,0.3114815648794873,0.2384801846624408,0.21292446719347458,0.2696611436166992,0.32326409571008935,0.26466774925910735,0.2997370218571094,0.37009920177646033,0.32791856528950125,0.2951112404415624,0.3251492464557531,0.35405182935815543,0.2747846662707263,0.27253461413208036,0.31497824986361594,0.2929313090828131,0.2505809574168896,0.3108289676348985,0.3166523109739034,0.3606098510592704,0.2675951308020748,0.19960780065664693,0.3585294172734579,0.39113752250377404,0.30513376837937384,0.377024150945918,0.33230427058488665,0.2970218141331664,0.3004339417435691,0.3499828839534456,0.3464487050539521,0.249239279140131,0.39139346311338324,0.24252617394993708,0.3852604449637872,0.3810888790298094,0.3542822574985937,0.35617209395292476,0.32909792630749163,0.301040797531361,0.3554759774869104,0.3432995522549514,0.2629646129521058,0.32632364517720064,0.25403296866860076,0.2649215725947399,0.19293412359942297,0.31610086389049824,0.3887321404047487,0.33033923540014015,0.30764870710908276,0.25585576780473823,0.23970196955269724,0.3223638940653672,0.38282736291780933,0.3167009434021445,0.3597895523285371,0.36046599535304075,0.289097781093029,0.36338895735134863,0.3027284791709474,0.34283417055659626,0.3356091478898857,0.36372100372444305,0.29348176222906114,0.2396716444526267,0.3240276856445802,0.3331395153221149,0.35042677330542654,0.23671118951364067,0.02395048305346112,0.2547863299640319,0.3503493650031059,0.32879719763891313,0.3055158558108348,0.35868435376700125,0.25746108151925534,0.20958304271127634,0.38711377664393637,0.3053655052328852,0.389428062777607,0.25482834224417267,0.25058437498799185,0.09487818458860361,0.21803312305846378,0.33936182490296735,0.38145455215339996,0.1728916247118974,0.23193125824314978,0.3852111138759173,0.2871312494430159,0.37388389401209654,0.290159625869153,0.26723838420042373,0.2659724045514549,0.235851126786189,0.19353909723764676,0.29178956755112667,0.3317701722457421,0.21846484130170798,0.33824593686588456,0.2688747313772902,0.2523908762493134,0.3378238052466875,0.37523638987991453,0.2560953071530769,0.35744988513698234,0.36697973065968814,0.30385956415186255,0.35694208286381934,0.33146615611757296,0.27561370731868323,0.3034735304010164,0.3451303336752677,0.27272985889849793,0.38365536582751103,0.29435669362251377,0.2871788408414545,0.30808111441757036,0.3860292617325914,0.29450841457857707,0.36636448619003437,0.267429136378719,0.3654411579824572,0.32665331194579045,0.34568376561279013,0.17655129500794667,0.38919239355201185,0.3448926994456587,0.3856426245614454,0.250249650206215,0.2676471025638161,0.2636386057032064,0.3867523277830359,0.3897965780251523,0.2718761926887846,0.37951218937340475,0.36135095061026584,0.3268223633503217,0.24412916746044125,0.24507887367758233,0.2575398442433967,0.34950510067161095,0.35880552286032097,0.3628731034987938,0.29534037702470606,0.35965244783902206,0.39171284948950846,0.20103570283396938,0.34971632823873783,0.3818659849020163,0.33961286997933926,0.31690760050087413,0.3340401235421522,0.37687235042754774,0.2622003279255707,0.3545752937016237,0.3666163677865789,0.32812401078736697,0.32731774163928146,0.31755368292330305,0.34764369626817204,0.23350407233088855,0.3245608074419389,0.2790726311809733,0.3572292864353761,0.36214523708010754,0.36400638080310505,0.23041176652033551,0.27338463678250285,0.37657242796478557,0.3799688147343669,0.2842699766690563,0.2663207768164028,0.3768275307582543,0.24366784294731358,0.2759458123508724,0.39296997389660693,0.30520879257275313,0.2786580006471736,0.38626794233000616,0.3330060315257091,0.3728992460541832,0.2584393135571644,0.2740803154076652,0.27024393549135955,0.2559018460453573,0.2584280901507181,0.38682289750109633,0.34384115725902187,0.3858933895174274,0.2941564187798202,0.38692207453436367,0.0466001107419242,0.35678799423573626,0.30487609223617146,0.2564136122552514,0.359854752527754,0.303980468695915,0.3868726231578477,0.27846961972502887,0.3419436241701534,0.25924692919893255,0.36818975576264357,0.33813513807451673,0.38992003969885114,0.38275456066804053,0.39063470630452146,0.3698636511128062,0.3070907783500398,0.3713479748878252,0.30906848103616946,0.36625988343824,0.26344498106847214,0.27231039407161367,0.3750470232923271,0.2986782093781919,0.31300490489354277,0.24921814875261672,0.07622280165747902,0.3062442228103625,0.3847152690898144,0.2532412207200438,0.3783512348263096,0.3807283186933374,0.2845157368608882,0.3258020891638975,0.3757259526725178,0.2611073035285603,0.24965429334238376,0.3893768442027331,0.21831766261446178,0.28022491589474025,0.32269161134953733,0.30761452118529425,0.323476420756321,0.36611762776821216,0.2968664673127011,0.38190718973347104,0.3928564611954995,0.22362860659779782,0.3922641278194471,0.31907616538248496,0.3887586294262565,0.2992845096955279,0.27096827093287745,0.2946828179212388,0.34299954150741796,0.3257740963814148,0.3846845710610859,0.2897153971377816,0.16856728722722425,0.3897565029183936,0.23823609758171238,0.3843975352442733,0.36440574043075147,0.37255707151347306,0.3362290002834374,0.27723964264033424,0.3853609142850303,0.3899902352446183,0.37295109466393256,0.370954362264969,0.38836930936078107,0.38028133917486484,0.3500888369522535,0.3270068252224155,0.33399237511184665,0.38297144317835363,0.23123252678993073,0.34805384750102747,0.2874401597013887,0.28959026128038146,0.28289328383404555,0.38765134055933176,0.2400430302363497,0.3340864710873031,0.20420125398198075,0.22818856935120427,0.26317205977499,0.35137260054385017,0.3915892334050848,0.3916333603192084,0.38267023591901134,0.3784720306768642,0.235630084461758,0.3347487144489127,0.2325532683801899,0.3577338965799532,0.2771218520958455,0.2651802678808896,0.2704432038494465,0.125914288149982,0.3225119240911794,0.1897262701931546,0.2363566107032428,0.30398098183963634,0.37417334114198986,0.3708235061969835,0.24492620776655033,0.27218387538340105,0.13041461376784638,0.33366172973421976,0.3841249448289394,0.2890899849239231,0.3755915766084189,0.37511753736823383,0.31694803676349287,0.3657439035958912,0.03429168470908608,0.30036709250568144,0.3111216247210777,0.34884249238316384,0.3866585627968604,0.37849483097077674,0.3412846621637641,0.21213453665822693,0.2600388085077014,0.3566611790036253,0.3011802236711323,0.307468721997471,0.3920314700685643,0.33933078182507087,0.35010232486518106,0.2746285399867624,0.2995033352532328,0.38697846380369844,0.37204808600163675,0.23231222904648463,0.364995164743337,0.3369063188975535,0.35061483550491346,0.30169698738405537,0.38600686940074724,0.3718088633457737,0.3461691414087123,0.3290287474887486,0.3237353489633597,0.26559020520338256,0.37394104479092816,0.35589952048131,0.3550118940292032,0.3858447126216043,0.31818468625625373,0.36641736461273106,0.3730358082836058,0.27395864561467614,0.2935811538761746,0.3732595492054339,0.30243528499135974,0.36687090341460726,0.3503646296338821,0.37133045153006267,0.38219454056397867,0.3817131294118022,0.34938647739656814,0.2461076663198984,0.35219338474641365,0.2604963793534557,0.34399496369629934,0.34289092714978475,0.3359202664606073,0.35280894412978603,0.3538988544034632,0.3673869371134888,0.2672094127648253,0.2931033219031078,0.2860551786077845,0.3347110300415054,0.30753628044379056,0.3745791589242009,0.2127454068855337,0.3819538300918647,0.39369297384352847,0.28878188379993147,0.1944743738577991,0.39098804800364456,0.25283201916849657,0.23776511550717117,0.30520865762690275,0.2518789556423111,0.3602878183559694,0.12662440708859424,0.37924137444707756,0.2280705980340481,0.37464254807236413,0.26975818456267003,0.37724672065326587,0.3762736528425912,0.2865072239732195,0.2950236915520679,0.276005196071407,0.2956882016104062,0.043162347565921126,0.2713590384759238,0.39075115833874957,0.31687014907218825,0.3082655661858154,0.2158599542450275,0.3672778623172122,0.2759680965806398,0.3354210826255546,0.36944401319451214,0.3901918877464611,0.3023631996733069,0.2339160587458157,0.3206888787647973,0.1415049549712754,0.24645398375710767,0.34484048740438034,0.3310792349016858,0.33014352860864726,0.21920526366935109,0.37429208004982994,0.3006958017940696,0.39050393509652126,0.23789610708935016,0.38880362617141667,0.2727733602777364,0.22505966406448366,0.24363341321168744,0.27335572268538805,0.38267790517627176,0.3816341122139996,0.23037748593983332,0.2731018856396141,0.3274081635210706,0.2517204477443911,0.3823335347760971,0.24447931006797297,0.2950979393804393,0.3437112447671424,0.33864356969844805,0.3880341071936233,0.2688865684826417,0.2726591279997795,0.3256041958224003,0.3897843797837159,0.361759168549716,0.35456127836452594,0.15805839638979532,0.25657982857644457,0.25712744906649493,0.38353696380495605,0.25345503866747326,0.31372914463315427,0.2641284330833947,0.39063126111210583,0.30846053265975026,0.3507505034914572,0.3331050128991145,0.3734520866590277,0.33369342146935893,0.38921770182594645,0.18137867895437312,0.31834579075719793,0.26611730795622074,0.3042228148808855,0.22815867012143687,0.16564802570298512,0.39126122134227714,0.3581078890547827,0.2559538722198148,0.3131281955157216,0.2527370568859917,0.3323809136019352,0.24303394169310846,0.39035133049188303,0.3891525183963728,0.3886008415926116,0.3392209146577986,0.32413264595716096,0.3699116966089317,0.38992995343762166,0.2869361993464132,0.3529779982258807,0.27403733139388736,0.3325168057069523,0.19989755567564166,0.2284475825970524,0.3791121275736866,0.3280638028865407,0.32667387995601216,0.3890907998348961,0.34832902323531234,0.20481310388975274,0.3786841671980423,0.3807253374632863,0.37833478550678923,0.2927630516349313,0.1976938578509823,0.23899350613358847,0.3232055978754641,0.2734415767997838,0.3400215050326099,0.38336831799274357,0.34322969009675713,0.28946891955501247,0.37730216224253427,0.25602300153074004,0.23165705225200509,0.3783503852636668,0.21912571693515587,0.25462844678347446,0.24515165200002362,0.34210774687042406,0.3402669098341717,0.3688832054480217,0.3045472688801273,0.269824098703034,0.3738373137714343,0.2387118580083003,0.35404928070164887,0.38805731515054875,0.3670274712663107,0.38716136645974125,0.2820066829371422,0.37543919363851325,0.3098404149796805,0.37622230707366033,0.3928192520960511,0.3784741541627681,0.33520448569208694,0.22764708464382752,0.26293239607637325,0.33149426849266184,0.25230221950393916,0.2742166292062101,0.3720997610478777,0.24717302775761715,0.2650043624140947,0.38569184967166426,0.318845747410645,0.2878998186901364,0.27114728846241587,0.37818914029534795,0.27772500990858895,0.3909913625436402,0.33343822858449135,0.3815796759515939,0.3018444556650212,0.3904834923725206,0.27243888618750944,0.2828062396117839,0.38892215169114425,0.3304885657168154,0.37129479716800873,0.3526894488447961,0.13892024666064606,0.31095949472871803,0.32759960592860465,0.3205567371730548,0.3193345152987985,0.3155943301209627,0.3874183950763212,0.3934958710724702,0.3773779082109243,0.2399797998979133,0.30617904419123476,0.32465729831091494,0.2672695872327942,0.35273543081373887,0.34120081792298157,0.3573170827963306,0.3263429433012569,0.3552358366462875,0.3759152898545403,0.16288132230901053,0.3914984856981507,0.37621476443193635,0.3079625221583627,0.3168032441696017,0.30776637527580664,0.30834777592675466,0.2860090754386577,0.3751573587840476,0.24173314162343437,0.3822887602686715,0.39196755180854476,0.29233297402325814,0.3650470596398136,0.34331348552714713,0.04381967729918858,0.3224346404796048,0.3653345047399703,0.3067196095276131,0.3538768751960344,0.3015646963559956,0.22422884071639512,0.3335761139193486,0.3915148525566948,0.38722044859774896,0.2651685970606607,0.28262274080604105,0.3506170881395356,0.2665445497757502,0.26663580260977,0.3577308544811054,0.35026909693265196,0.2710605279676432,0.3710782358197848,0.37001054195836736,0.367697135849809,0.24695017226731783,0.2932439629207169,0.27385679700764154,0.3581582304190306,0.26878134571288004,0.37550150439450725,0.3903066988754127,0.2979752929528504,0.25954318412039573,0.21112904543421573,0.3197821555573801,0.2644006807283293,0.28731261553324067,0.3927038689394402,0.3838001954926921,0.36745340323371306,0.27288553947270405,0.22299208962525766,0.2858710313118715,0.2317592290168835,0.23864272996169356,0.3623849760339751,0.3519511150167385,0.391113857837773,0.38705018734877433,0.2911465317193912,0.23551868890180327,0.2764570133824299,0.3592045457528423,0.3923156500017821,0.1411003251123662,0.23533272492363436,0.2820483668303991,0.35147571270961947,0.35382271586752206,0.32516491120261504,0.35287249295985446,0.28206985454549016,0.30559622663594127,0.253585974235852,0.38988245047558817,0.35905405730298395,0.3705383299602943,0.3584941205266145,0.32127177785290095,0.37867126852415023,0.25731085711669016,0.3148941826240375,0.3799304739006472,0.22834411123349982,0.3860572079728471,0.29331807563769857,0.13844447437729573,0.2994903876133328,0.38111529237560193,0.24276635612381658,0.37834282475506753,0.37233723968152793,0.37568782738534073,0.277073699607248,0.3039991406317903,0.3127087846849574,0.33405330994882737,0.38627542127322784,0.3591534607105501,0.37961562503730123,0.34547880527029434,0.3015095555875319,0.3455418886827006,0.2231031726500384,0.29334639398855433,0.29382117346281944,0.30387548206749393,0.2850215690795993,0.2915422957524309,0.36253709787062444,0.3835342060443087,0.26196137468669173,0.2793520035038505,0.3537347185162812,0.261493999526564,0.13614182423417895,0.300033177380908,0.3530787060761659,0.37815368082696,0.2772803059895499,0.38027981848229087,0.2956643823117716,0.37951486223054925,0.3920103896105065,0.35018629221637104,0.3104700791344877,0.2946243833001653,0.3927145224490519,0.33523086180942985,0.26602943633443105,0.29554565634074903,0.33115474798086747,0.20825225222439472,0.38436062418794326,0.3878211022698183,0.2484010377341272,0.2903205356043481,0.13516953593207395,0.30475960044393147,0.3396772035831734,0.38833477360760416,0.22015027898095366,0.304118523269154,0.28186011115336473,0.27475185495145965,0.33483376330245,0.36929429525552343,0.2865800034747416,0.37637614468438363,0.3016063743456921,0.3926060499336408,0.30508174462110765,0.23211894180335962,0.35832347348944604,0.2484277963568067,0.32240717833091376,0.37808418477094746,0.26687790116831533,0.27861727431680455,0.3839111589144577,0.12175722415522366,0.2767287141603257,0.11317015413132621,0.2748232454914628,0.2599036247179808,0.35240886267897154,0.3437834994111954,0.27466529004587087,0.36983130435775885,0.31757255408612056,0.23638889022558038,0.2686329883987071,0.3246881949452196,0.22668999532213227,0.2993950038336711,0.3415741538366456,0.34441343065120217,0.37505179544863115,0.3805238383391478,0.3850330102217907,0.38455151290891704,0.38066421019327945,0.2899145174303747,0.38226007368348214,0.3546047914075025,0.2487084983375725,0.0011981929119005779,0.35896349051415016,0.3797380957076684,0.393179657822345,0.2554089574429736,0.24863861429071415,0.3271353623758906,0.31090436188599346,0.3716770647306516,0.36987981760797245,0.3863045727963844,0.35895094815357925,0.283881981583221,0.36523105901709196,0.21973249713639348,0.3877908518808548,0.383816416947671,0.2504368894359343,0.2786519402590542,0.2789004382819521,0.371346428469953,0.36450214914283974,0.3645820748355876,0.24595776629165542,0.3051887744560594,0.2702911552641684,0.3167330608968692,0.39210959484217467,0.33576993483212136,0.28794181423560655,0.3452357606946279,0.3592651357753705,0.36411063836591084,0.32780931108000494,0.3290575801028217,0.2809670612672918,0.3884756880023548,0.28440061552171353,0.3936055858907327,0.29333013402754143,0.3474422352660437,0.38033004324527425,0.2505202616208184,0.3200013200839883,0.3392430718505394,0.3076370649728733,0.3477732723058738,0.3476367507322702,0.34572792705341865,0.3745792690732571,0.23608245655419835,0.25616575040562695,0.25128633369840114,0.24866128783806443,0.34733620297475104,0.34679769847979786,0.30610738341798904,0.33663250857437166,0.2897654250326959,0.30906948431358794,0.2730115224573152,0.36938961168622103,0.33743843238308363,0.2535141741049231,0.3207963070995222,0.250137598500658,0.3038456415921326,0.38909317676761274,0.2648205121019841,0.36411250185440747,0.2556735946753719,0.22286041057517875,0.38034681718649993,0.3246094192611975,0.38624115453562263,0.3892789343949287,0.37276896418797023,0.3602594365013839,0.3629848620567093,0.3901237770108118,0.38869000716128643,0.3150764972749025,0.32656714333217773,0.3851764023649906,0.2902287426931898,0.2617140393570891,0.39026800538910567,0.33664897200014693,0.329082197256454,0.3447524281211248,0.07749528742620633,0.3367095677876342,0.3921267232027579,0.26299176239199246,0.3588017782725724,0.2631626390234217,0.34321036963358764,0.2503004043210646,0.348869785870165,0.24780207445072075,0.013655540147826809,0.38927169119402966,0.26896457053978395,0.3089931276710265,0.3785005555964936,0.2916424035303112,0.3625710951472929,0.38015592931882525,0.26753824052531106,0.38666853952732133,0.38298932602292096,0.39354458199018216,0.3494773825026398,0.2963785188824563,0.38619841620450973,0.31463456747457474,0.3830105773055029,0.3463664374065017,0.2654481090074107,0.3730955826857166,0.2606703541902689,0.33213132512626464,0.358006962612433,0.26188342519699964,0.2609020650173831,0.3651487067205494,0.3560672285688678,0.36894042196881993,0.30102338408574264,0.2762958584526773,0.36817089542382947,0.2415946266524702,0.2218238508843469,0.008625692670496253,0.27469576330202466,0.3185322357823527,0.3539169988818883],"x":[0.39378532299713376,-0.7895708710932126,-0.23210557291280498,0.30566851539652573,0.4590615725880447,0.39301022357311055,-0.9900740695670116,-0.784923802521662,-0.06635592191226936,-0.9639020551885196,-0.007892313762151382,-0.2475362233742322,-0.9959253555138492,-0.4725374010674539,-0.6630967883896366,-0.5775649594532055,-0.890258613883498,-0.27145105116752477,0.35341557167765414,0.5198575230208498,-0.8986440776880076,0.2656354996289405,0.6254580020665332,0.5117805417050487,0.04199353824781449,-0.2849432368952334,-0.9621682505664766,-0.8636982523529877,0.06516298628059891,-0.7880384262467994,-0.06370159249548513,0.07304763498596056,0.009571107317441374,0.7744542838447921,0.8767746249720085,-0.1690047298196058,-0.5319265571900327,-0.5633953011424988,0.9822328801192337,-0.7152481425251507,0.5346080286756036,0.2811818470322409,-0.6162826501397998,-0.0674690402802236,0.35211303048622566,-0.6002925151233858,0.4684254386902631,0.9169759951323391,0.017849368343637373,0.1072286650332348,-0.5962926795377443,0.7362390454550849,-0.04117663555584139,0.08550638555457368,-0.22686581973743447,0.3446084625643495,-0.875396336681491,0.4531327893610828,0.8065485910251642,-0.8327089668466012,0.2601461609557152,-0.6614903540419976,0.22088335456405028,-0.8074212448128364,0.030129227806856562,-0.413367524658002,0.45737559757532065,0.1763179103776933,0.8588184586043006,0.4900840357029157,0.08491928218222489,-0.4752502707356041,-0.46460447671961447,-0.7823607145450984,0.9953126612084744,-0.9453469097030531,-0.6376469338308155,-0.1294399266280597,-0.7446000468157576,0.022165790875702918,0.7992292800277596,-0.9956100239712966,0.6812295197560054,0.7828374694710787,0.2940302508313408,0.703033525946001,0.8590932652543581,0.3653621293289655,-0.5439611710729255,-0.4001821578360323,0.41931830263052916,0.6737676614697645,-0.1781686267666962,0.6190186021414008,0.9080657364355935,0.04047650666727298,-0.9683637146138921,-0.2937151231708963,0.3982485017634909,-0.4016198301174918,-0.10456205511915373,0.9797901910062583,-0.04162499860050772,0.6238698596017715,0.547313762397104,0.42850356116681176,0.5943207150148755,0.8791942999844666,0.3590955477131281,0.5922980296473752,0.986355406953213,-0.9261012857271211,-0.7130606157022443,0.6090551766477379,-0.8757567826503498,-0.6675199747906189,0.3420883801405723,0.3607153839842283,0.7217581188011168,-0.6065539132785056,0.4317631855348578,0.8326560788690802,-0.8450866428556871,-0.15808785738009457,0.7413890439814255,0.8627486602104932,0.47182266437976805,-0.5760187492358857,-0.40429790217775396,-0.8581223438573851,0.9380280071711984,0.3986056151271522,-0.04530934630711858,0.6980608949028562,-0.1810431430056343,-0.5569115185210447,-0.7361716443686221,0.6127697308054638,0.3972448241691944,-0.35001672932959815,-0.7485088939729496,-0.057303071280069506,-0.9420261921086657,0.11339928597548976,-0.16390459746370833,0.4278735685309232,-0.27027302590771995,0.5311389303343361,-0.7127565929703956,-0.4087508329350822,0.4949634865505126,-0.8248366660907558,-0.5813169527928608,0.7543299458609667,-0.8726139430413662,0.5104849726183174,0.4908428931908233,0.06363569798883129,-0.5660846435866951,-0.44575649348538304,-0.8684799011485351,-0.4409210409294362,0.41480853686103014,0.21668629563266517,-0.6439481301678787,0.3656942168289965,0.3892010448716343,0.7680817757906571,0.3772415772375881,-0.6966724480744828,-0.5014161974544393,0.5475213622275223,0.24283133583282668,0.7259339122430872,-0.9014216640094266,-0.48285313898187665,0.5666546832655199,-0.3023772073288695,-0.8757132401708221,-0.9742286989199025,0.9008084199975817,-0.45138091102336686,-0.5827382732551034,0.3379906985420238,0.3998450233112747,0.7028588324885376,0.8372171894347584,0.17388070787186383,0.6910334526036852,-0.12664691603373557,0.9151164323618266,-0.889766241658017,-0.7442140732909568,-0.9637831612978891,-0.5337499465680278,-0.22339517625711247,0.8742647639233003,0.9983761184946638,0.19548452802809058,0.7487630114324095,-0.08849499160326513,-0.7355469188720885,0.8494785448637696,-0.8600965715235547,0.988753025362882,-0.8738340907952908,-0.7578711657437815,0.3151264360887893,0.9181053537032442,-0.5401474257570724,-0.8608630403820885,0.5257912148255346,0.515595004687742,-0.27573045301317745,-0.9043588732807772,0.3998090504428693,0.3282909884932206,-0.6940325723836582,0.3979740294411389,0.5449845594232263,-0.8149137069679204,-0.598105139479284,0.4765211399580904,-0.8284992993349891,-0.2233169493087277,-0.6640042209019468,-0.7797448736087254,-0.6709193462912877,-0.19387237761976284,-0.7385600650689992,0.20474594343838826,-0.852776311551307,0.13188992534307875,0.5959014331550736,-0.4975753832176326,0.9320284974535133,0.11344826690396248,-0.3000484116128126,-0.1786197056946559,0.7743453140067502,-0.8432835325593073,-0.8716236827490045,0.1602043300978626,-0.14096921503992288,0.6969386220224516,-0.26477637092094763,-0.36847894664941805,0.5116086601347583,-0.9649920772517668,-0.8956476017759329,0.7318797801127301,-0.47429019161848185,0.1484827416198251,-0.3374041508389798,-0.7180200096533174,-0.35789070626280894,-0.006484393804783384,0.9510383508292333,0.4660540916714013,-0.23893666273960568,-0.3711343304889949,-0.6372202706861954,-0.5563416899119065,0.004180763144479016,0.8884343362042766,-0.413891128500139,0.36680862719364704,0.5151136806458978,0.5277242491283722,-0.5882794636658901,-0.4382229463466665,0.8238042247634914,0.512148358395605,-0.7645561723957144,0.31831689902293814,-0.3845791023497642,0.1796395714313288,0.9955817711843471,0.7638785117959026,-0.2858001669281349,-0.22560270490855805,-0.7291860352582251,-0.8667255025525105,0.019628072166978594,-0.9612936096647915,-0.8205277188555775,-0.04884420117452093,-0.680211193560222,0.7622806401416553,-0.14452448118884886,-0.252954967146517,0.3177877187510001,0.903358964340105,-0.8363575221700179,0.8540526005159124,-0.9079238367919378,-0.8966571619335113,-0.09650951913410832,0.506963514174875,0.1585731744937835,-0.7345917014911674,0.0041216354006698985,-0.657043617430852,-0.43231121728360344,0.6356290593384513,0.8881960048035413,0.3616761075608128,0.7031518579914087,-0.03813451399991408,0.6839309074460678,0.4941311630263301,0.8981427525355774,0.241579244116906,0.44340792711633625,0.13397763524798112,-0.18891974934839828,0.06303050184065073,-0.20695018257259035,0.6340604093877884,0.332016461167278,0.6803445428936987,-0.3492503789061474,0.7208281478690934,0.8351810758183431,0.30630096372045434,-0.7264869241126566,0.5244648472938027,-0.9432646468173709,-0.640421831312993,-0.6729300892718992,0.17529773750764477,-0.9253978604081206,0.16189844771701933,0.24163833380160593,-0.7776642413439361,-0.3703240161099859,-0.13664766045234256,0.05216631223176327,-0.7992621562269657,0.13017095455521455,0.9994946800655491,0.7566630796230305,-0.319454671588836,0.6848007876639044,-0.5952737358766802,-0.3617954699092132,0.6570945420976253,-0.24344541494871308,0.06445359049081745,-0.8128816407993398,-0.07021960148901263,-0.055708210583224727,0.15843547782346867,-0.7199016035116452,0.8224540911071601,0.7465547408691409,0.43072004875863446,0.5999772455953192,0.16076303076243104,-0.7589186993903305,0.05324491395422237,-0.045071656731391574,-0.8576649319196816,0.16855303737280103,0.1598928145385341,-0.31205141099127953,-0.5062969867802964,-0.8149148507085608,0.152776360868637,0.021514824691615697,-0.20823118890767622,0.26181235226522936,-0.02859670982244822,-0.25651069584790287,0.4162481320608551,-0.589756554413714,0.5456519051959727,0.16092716235798132,-0.9757903925330846,0.47615176716710916,-0.10901589588617089,0.7434990060530664,0.7130278289475491,-0.1304918051571584,-0.8335740031699594,0.4150850698511248,0.9756681010678361,-0.4348187751604464,0.8510271608655051,-0.02085506147596039,0.042148803008454916,-0.06125787132213789,0.05114353069112676,-0.0903652055852886,-0.8292595003445018,0.5570838077956588,-0.9552416038521971,0.3299291626395391,0.7444686855504541,-0.8751464550408121,0.8238060892379067,0.8760993005562416,-0.6138049425001406,0.8586682342278387,-0.130265349855482,0.6711546678926505,0.2722176220151713,0.3370445127949435,-0.9558851422038748,-0.2930177431568346,-0.7959784552478131,0.5634223632609645,0.13399647613492993,0.7605828503057168,0.23134577371892728,0.304072614841564,0.4329664755518481,-0.3750276113433211,0.8945102454357903,-0.6903849925233279,0.6173646720011368,0.41387638565344353,-0.15009864103951598,-0.23144725024025536,-0.3412700393877284,-0.8746793827616894,-0.8960626128130205,0.40620405251028435,-0.718767991255413,0.6813595452187271,0.014974007783025822,-0.4832840500394613,-0.38053940553322496,-0.6053662528959087,-0.7225278032426048,-0.1343606933246293,0.21036518607677124,0.525998196414271,-0.3702594058380031,0.5009152731796598,0.1553324321908769,0.6981946371515098,-0.08726354557376181,-0.2994230611705171,0.4743015496783598,-0.5878620138832082,-0.5973737922245195,-0.17468967826519455,-0.31023428804972886,0.3837415093193983,0.41205242612245874,0.17395893728798884,-0.6154947590353257,0.29177234424416065,-0.2562771072958885,0.36478181633553985,-0.7447026208075895,0.31167675741754897,-0.6453905300902321,0.3283882274689276,0.4737127770116447,0.30889172159186273,-0.03632631588548252,0.028595559161104678,-0.42185727720020916,0.9462135530831848,0.42273176988174965,0.8609755728732873,-0.5063777580441844,-0.5038346003561425,0.41196123108961835,0.011718074866094774,-0.43847709171942517,-0.33349502204419945,-0.8588048298717221,0.7228776306692812,0.7693313741152163,0.5005720386634782,0.6839671085897767,0.09143203018751134,-0.7888351056785465,0.19216284467830258,-0.0017882819463035382,0.6144047877766128,0.7867082706063431,0.08651865636378853,0.9053920493212022,-0.7358338460480391,0.7006139749932991,-0.9291848702681924,0.3798802461125441,-0.19970920295793038,0.1815999909646413,0.4243269749438423,-0.30780613189264683,0.7464048906721383,0.27709351067284116,-0.25232264246641734,0.7012382001477939,-0.7319469537344161,-0.7547887984211266,-0.672328738918925,-0.6366686086333448,0.6771550214986615,-0.053827193171511745,-0.600327116180837,-0.004646595259098163,-0.8697054532760555,0.3589230832491572,-0.7699567244893535,-0.5327554379339103,-0.21270453231553033,-0.05813739709702137,0.5340587199945852,-0.9961877742000227,0.03320743701867723,-0.6520136901724118,-0.9385097033451224,-0.43174153753681344,-0.4189825098878286,-0.5739228401670755,0.9917695327300642,-0.22487038948862859,0.6377592591377232,0.10440673665353462,0.9770147262952884,0.1353708110501599,0.8405359045778584,-0.9318452368540155,-0.9402691467578617,0.8371110934638861,0.2064269000328629,-0.2167459941974359,0.9942346389487198,-0.8365213876825099,0.5648766349777161,0.9322875404670965,0.18243221365215279,-0.9249581484902483,-0.4687474548082,-0.43277692382074173,-0.5261250053900768,-0.16436531641138208,-0.8235341689733846,0.5512619171730617,0.6005847172382333,-0.0904149873011546,-0.2236206502692677,0.4365354826231016,-0.09377776492916112,0.6664466039238035,0.9022234773123383,0.051868483929322196,-0.8613567670154896,0.6479492006041578,-0.8757932459646107,-0.12007175340367349,-0.6777649941098423,0.45142970082152045,0.5518957888002158,-0.24510689983816425,-0.1474140216981752,0.1319282738209786,-0.9958365048067646,0.18744675669635313,-0.870334788755498,-0.6890077997212782,0.9774741403048277,-0.9732226080939119,-0.0012407101258031794,0.4256671603801667,0.8879857330670671,0.6554609408393537,0.923391765162437,-0.2550010294695828,-0.9467224558206282,0.09900177408189625,-0.1107668196110585,-0.06626086201037262,-0.489274485193286,-0.5039348658732554,-0.29117956231864595,-0.11129797246021633,0.6595294314503928,0.44448177220811,-0.39833046824028173,-0.5164798021251875,0.15129908716560392,-0.8437234067050228,-0.14080305064371323,0.5734676462303092,-0.425384550771823,-0.06137441074188166,0.4562762889761087,0.02545252339846238,0.25069706503672107,0.19448135894915497,-0.23087502485159295,-0.7423617454352267,-0.9379971399789913,0.5235474214529874,0.042948170128074725,0.7818655042975999,-0.49156578769418635,-0.1822548728180724,-0.5133744570416168,-0.7022101286779727,-0.2524575663272861,-0.8777171596052966,-0.9648144364989837,-0.20833834593575817,0.3969637598556197,-0.757161304273934,0.8685777191583961,0.47634083861912346,-0.1723139700423233,-0.31004488779179873,-0.6132977305347969,0.8518515506880773,0.04979224955644179,-0.9860273769118164,-0.39900606973652364,-0.0953075868508848,0.046911511221709556,0.16593789285780236,-0.6658479998614104,0.04829651631596121,0.6770998838075468,-0.23040453053012167,0.025458118159001675,-0.24893496338535392,-0.5470501061210382,0.7671898250738121,0.8647387329775675,0.5673058938994906,0.8881656802459768,-0.3733132827296872,-0.32781282405559464,0.9497959515715424,-0.824967621452176,0.029756669624368737,0.5900805831126208,-0.5974773856205511,0.7734451219192509,-0.05221442329913417,-0.8224141838597601,0.08472823336084012,0.5639467237461155,-0.11635262038711414,-0.6459496822680513,-0.12481786878388057,-0.8438791805664798,-0.7140412614162992,-0.12678227904576067,0.5735224289246221,0.20234727234408423,-0.44637401896506335,-0.9108105777740261,-0.6612182370591277,-0.5942831101190782,-0.6275077624072045,-0.6256498353721098,-0.6348875471039426,0.14642477242883967,0.03796118880835886,0.24703842284771182,0.9302203569432739,-0.4671796769068006,-0.4153958144169887,0.8322152882102567,-0.44351516747635955,-0.5024838731565939,0.4303812583212472,0.563686158989126,-0.42436030910518063,0.2859266389639923,-0.8691506957732802,0.04954254232123789,-0.1290396257660511,0.13601420481648763,-0.6418209730445694,-0.682534375752879,0.6595670196236285,0.7613526585209582,-0.28096380407252264,0.8885813288172466,-0.20631667804214926,0.08350044782988197,-0.4033926004687598,-0.33994044570644055,0.505050515592012,-0.4502930328449084,0.6150934622214717,0.29839970087592427,-0.6349650530638602,0.39469790647366976,0.7023058800544444,-0.9931843064788892,0.539051218749464,0.02373376420737161,-0.014553784207026688,-0.8605144515194603,-0.7943741409310796,0.456684500030927,0.800352433353007,-0.8683498602651096,0.31780926113226693,-0.44739414931089305,0.6491213796035229,0.2740547348314313,0.34416035978634074,-0.3313967176331727,-0.7696378444025305,0.7550114208042862,0.7428649394542179,0.4226837290249419,0.849650496970038,0.30086275857604683,0.12635886856504852,0.7309842248066571,-0.9005039906789434,-0.7128399914579493,0.6130749382653096,-0.7774809990351952,-0.7774232059405075,-0.05842409032433782,-0.19365347751754802,-0.27470358764642455,-0.8340168873178806,0.8251317566882452,-0.7484810665077757,0.9802307408072375,-0.9793837899570477,-0.029899532355664782,-0.3357642071471272,0.03864822075351437,0.09206985894352737,0.7528295452956835,-0.945315935239901,0.7499568957860578,-0.40872755016730444,0.010576703406267374,0.9922579333799146,-0.9935052974638308,-0.7404427356362184,0.35158943027617573,0.42325753241447384,-0.6036789354793832,0.4272117313573456,0.787215476755792,0.698382326156676,0.8611797587773791,-0.13241808649994358,-0.3334248313580028,0.14126195183620593,0.4012359038024167,-0.5990346113467213,-0.06654579350353407,-0.8077461144348979,0.6423365181699165,-0.25994452328919415,-0.6689769407599666,0.17680977915299634,-0.7493105495688033,0.26880771542379733,-0.7230654626645925,0.17477663308315705,0.9705592672155192,-0.24669311400152782,0.24449477098024408,0.26735677977635497,0.8033354442539715,-0.6930306952907084,0.647420272821841,0.3759522986063284,0.16379594837585154,-0.1592172340486746,0.02227896119782624,-0.49004754866391886,-0.6589228868963102,-0.4636407119841981,0.8618775587642191,-0.7314970605378299,0.734066901793542,0.6680285551007836,0.782496166783643,0.47939032238673596,0.39016552486903144,0.08275331984519463,0.7685635046166226,0.8109066510703649,-0.4427627925980757,0.816689962532454,0.7414036295687447,0.5939508920826078,0.4331426067387416,-0.19263652451215574,-0.7838414901049147,0.12762111562760659,0.7283676219479185,-0.10866634390038721,0.016459005552415196,0.445285974314634,-0.6243786232365216,-0.7463715345435684,-0.03876591938095553,-0.5559720808175266,0.8633140935784795,0.7416281121522892,0.5610953757363273,-0.5217501474877007,-0.18137615413070263,-0.021531381783070014,0.8824821416631048,0.7408547404271455,0.4893941372610908,0.6584833964919627,-0.334225744344244,-0.14686333539415442,-0.857513621607553,0.5483565970048678,-0.7303883386565397,-0.827757985891707,-0.47527371938094376,0.32893686902369446,0.6649547184549989,-0.25524390703719346,0.7030758694447043,-0.07659477391112057,0.5941972877101884,-0.8781074715436148,0.2251380716922875,0.9378237660136404,0.5138814659986957,-0.024592723116495296,0.8557308303378934,0.7898572143091203,-0.0857470553357933,0.26949838039797536,-0.2532667613607189,-0.9825003018402474,-0.8165209444792816,-0.13527918566545516,-0.3071789987782547,0.421273315075704,0.8316103585515955,-0.25509507058035874,-0.6412665319930677,0.9615869405945379,-0.773923248455938,-0.5752255045228329,0.8937649797132954,0.7213477403871593,-0.5040630550462528,0.3774495739982111,0.2253989455467611,-0.13749393869982107,0.14650406433341878,0.09695081433158048,0.25188785983395245,0.7375017332302987,-0.0879834435920217,-0.4363688871922715,-0.9389139328202214,-0.5575541374228394,-0.3216078680598029,0.2276452949665817,-0.051151470088270035,0.9175697070170274,0.7772742773290835,0.5430111088789267,-0.6711125071592647,-0.32743046284634136,-0.2750421961302334,-0.0004073720597101982,0.3742593200304931,-0.7581821745658437,-0.1890903905982637,0.8973031449519708,0.10248228709335461,-0.1241593227833091,-0.8825682648978006,0.7881848893259997,0.725422400690138,0.2980517285420188,0.25130528039100675,0.3095428609017419,-0.8697237094477916,-0.6989972057000573,0.8371778671500207,0.647062950473472,0.05462465349806234,-0.3893585602067957,-0.6734749143507854,-0.5006507150896518,0.41776445176264687,-0.25157100964225076,0.559068076503328,0.12108399987565033,0.22292531088134515,0.07792211031926843,0.7615261056512295,0.023648962141994634,-0.704797963739956,-0.49032189346313393,-0.10952710113298814,-0.9098526426294411,-0.5894641031943211,-0.4898326041760317,-0.6440135673916845,0.4789286888111808,0.4729160208029115,-0.49856939540954626,0.04898343000323768,0.9705201452558936,-0.9132973890773264,0.7058986487724335,-0.9388065454956007,-0.1533268885397563,0.48085415470058956,0.5958773989961612,-0.13234882420732053,0.2910012746623676,-0.5121987721717867,-0.8016713421544375,0.3366779602113672,-0.21992413799012667,-0.9123176421448864,0.6161420496564953,-0.9095890687404324,0.7000987743224751,0.140283969886974,0.8637090883913547,0.10923542308072642,0.8837162141876256,0.9990739215510156,-0.2574403824979594,-0.42039149127797293,-0.16594153972936,-0.003641487907898089,0.07483290042625335,-0.40576244711593334,-0.2423498983088206,-0.04666451337853861,0.15971697328197276,0.6547351426581187,-0.5912679923441839,0.19076379800017662,0.697058032570931,-0.8751381078086373,-0.1090839045591614,-0.5237586311170368,-0.5662720229816864,0.40334281655720217,0.1547655083098718,0.1894297912273637,0.08070649847091804,0.8850377830176193,-0.41724351858338116,0.6719648870942092,0.49912338043749216,0.8562893522816988,0.47608215162259393,-0.946910260241522,-0.20134508502193516,-0.10897394234570035,-0.7978193749385931,0.42710252692992023,0.1515268229262432,0.7545468844348333,-0.30139179866384636,0.26069561604406655,-0.770853639077866,0.09247003553236821,0.2262965186115129,0.025350984389663545,0.4526898830753052,-0.5935852201528506,-0.18903663065260634,0.6236477615801235,-0.2179679092586979,-0.4968588987969498,0.8676620697467072,0.256492977817834,-0.8583686868247922,-0.5376482576592125,0.42143274243005635,0.8858592464044377,0.8772772560497062,0.2517465032933859,0.05546221529584994,0.20019847488181197,-0.7069113137070593,0.826018475977937,-0.30509456581887795,0.9660396793667747,0.9538636760408892,0.46994396315678744,0.6479227768639482,-0.6060989758114435,0.37366162917386836]}

},{}],136:[function(require,module,exports){
module.exports={"v":[0.45688020997249046,1.9285367963320228,0.2609756191404764,1.794262986088925,0.730146971176425,0.312819175571732,0.8925441835897692,0.2604376870568781,0.4710018417582882,0.9566757969928039,1.8367163953695322,0.03347105044358978,0.22454083829935012,0.9542590720642674,1.6746419212097807,0.386449089292082,0.15699801476770014,0.48528310254635665,0.8237773158476176,0.20365878892514333,1.714348355927597,0.7403544316049779,1.3997391629130789,1.352215218486661,0.5369535136524042,1.5778734250789586,1.5273371676980916,1.8653753413498277,1.1608947358315258,1.100095960934596,0.8642114148710256,0.7703590578088031,1.4653179286365066,0.15063954725905404,0.6176416325114076,1.0985799778988943,0.9867263551852687,1.1749032466214304,0.5828550579945437,0.26324213697026266,0.40966569801107733,0.698765868535828,1.1053413954371747,1.9762664482295365,1.679466880302031,0.7717520281480601,1.7856742833485684,0.4588716592892994,0.1315541555581743,0.5998747995988896,1.1000591759721536,0.7224205225710265,1.2414402563496618,1.806268356355743,0.5898507434415547,0.8444174647049549,0.37460498992705826,1.5390525480052433,0.9399691786845543,0.10658267225619289,1.3921752314354388,1.4603272577861475,0.43273444003700323,0.7149036465508094,1.4169328948209903,0.9438308921480218,0.5976199186766742,1.3758922646701284,1.609046291141063,0.42920862636490087,1.863343469014032,0.3640682563769637,0.04896480658651248,1.887684006847484,1.7617910323637438,1.6806047398107449,1.5372564762180931,0.8136970600977409,0.07515942136144949,0.3957197042054701,1.9056618115964326,0.36508385289926704,0.7480032390739586,0.8535561805121583,1.5831918093550041,0.42025106192782813,1.2585180348877305,0.9392945920409175,1.0768797208814047,0.06834358738112645,0.09254537321144563,0.0900413412358283,1.7261878470143288,0.07175262600606658,0.1848886273854311,0.3730345992333688,1.988012623270559,1.0084971490344583,0.8164333839632065,0.13156384666331133,0.5893692904711405,1.7321830120259256,0.5656262328956925,1.6706321292903143,0.8778821318228682,1.5402009867671906,1.6300891684918049,1.8437839760559758,0.0785407666752489,0.6160863679699191,0.2425284516828743,0.04947798665502434,0.06387074973253526,0.5089367372074953,0.5680641483267568,0.9396561038499454,1.8835410835331046,1.0360322609625054,1.0298908746076734,1.7233948627607831,0.765755769460585,1.3208911271198875,1.9006983629298082,1.1051004778108182,1.686192620535944,1.2017952628215673,1.7331025342096433,1.6184182080822649,1.2321322180428829,0.14440072496217438,1.7501063473829368,1.8318909175753064,1.310778610076755,0.7592270340508045,0.8136872024157782,1.9209172996042665,0.6343952479209669,1.6323609424201408,0.9983095263483532,0.10449687387700557,1.6412327720604831,0.2573655490144193,1.231565561634488,0.5754808258225168,0.4598252654699757,0.8592415869411085,1.5092986138525113,1.3672121530534684,0.053842397560960986,0.4369550402184812,1.7266241188901854,1.5507973737488117,1.026423074467298,0.16188573649135218,0.021947188635636827,1.4932899385926808,1.7454239307834398,0.3562767775122717,1.0898766499589967,0.8543059297326812,0.40420077246588537,1.0871133791250456,1.1606817963080713,0.245940442805908,0.9941428506272545,1.0845063128111585,0.18166375942362212,1.5319716276622528,0.36896192560453134,0.11051051473777829,1.3045046097873643,0.8739589485289407,0.17201321562608074,1.9325025728280263,1.217176069556833,1.7410509688368352,1.6312756673806823,0.8693093205171918,1.383765682512336,1.69971267642807,1.4322561234360527,1.017746324266811,0.18100877762242984,0.8488346792507753,1.6300802564694288,1.343430370665121,1.8762520382285048,0.9051243928198303,0.06582747167179237,0.6532528489011229,1.9326139688356347,1.8869509307498689,0.1309298026237733,0.138128886513341,0.36191108892883994,1.9055116955149645,0.7204805528921603,1.952289694884771,1.978668263322573,0.15182068214334032,1.2162546486209718,0.9338670661284016,0.7854047902646379,0.23615784110472582,1.9621379124637843,0.8833596344988708,1.1185029248099272,1.5580910510602997,1.7312249478236343,0.8358885490443702,1.1088529177180364,0.8931098604005108,1.680111879963552,1.358362447779514,1.005189988523195,0.778748552055188,1.2084380367303242,1.5406329356088495,1.2134314401077582,0.46437003141616406,1.3391912712589185,0.37740387275702547,0.6905862418580346,0.1924951424043928,0.6885208969053593,0.24615882046710347,0.27170598998643136,1.218598733755064,1.8298182679857957,1.5692832579422689,0.37401454270357126,0.5633607120236688,0.8395355251966783,0.9067765598767239,1.1467741348614666,1.1016478799225662,1.4268888078966393,1.5520335008578585,0.3022794896056351,1.0254333993716935,0.9144233792048433,0.4944446559214062,0.39358702852199245,1.2864498915691085,1.380936369567173,0.43355940791894954,0.6299183955184495,0.3584500452488104,1.203493204607398,0.03238206060625837,0.7048223382432863,1.4298577797605718,0.9722914734105039,0.668666674269959,0.09393786089917144,0.42370347441902334,1.161257565973023,1.3325284669297663,1.487638759815722,0.5143910311027793,0.932946848894967,0.07249240993556416,0.12374742922435589,1.6553928079177793,1.0804703361484616,1.82336682369497,1.674420029102531,0.659976202570971,0.6426539096790935,1.668156825690303,0.616078900598406,1.6124196462702924,1.8776143251927349,0.7421013280574167,1.996195868584509,0.19825411658385272,0.8831927591707887,1.6873168849903806,1.1017113626169235,0.7487139292640981,1.1639570248830267,1.8696329866934112,0.5764355011272952,0.3771072521541834,1.0136714737384285,0.04095886640978108,0.9733867567741639,0.8102622720677068,0.33253341125543434,0.3088124721953358,1.5059305608392664,0.9034216383863223,0.37093104782309405,1.2809168660875878,1.1733932903593196,1.8239155921623977,0.47104656090141894,1.7598438719008986,1.1946763150985675,0.19492507801756354,0.5155250882804903,0.40682849802353216,1.7269931007228108,1.3163191332683293,0.6533675206546388,1.2177641789112212,1.9958693150231928,1.8405834835442585,0.041647801995087885,0.6513314546674431,0.41799164661536636,1.2641463034167968,1.9513735235360743,1.1938415508729796,0.17969559720805695,0.5346312298614837,1.199467271248725,1.7817505886983507,1.497807261356758,0.9456054375019267,0.4778139486808777,1.4474727509371026,1.1560032691084268,0.2387268069596491,1.5127818364608498,1.748952956961975,1.6544087895618942,0.7701440146766827,0.4338182971766651,1.9966558675805453,0.36031434722318467,0.8673191000884883,1.834752850162305,1.0036810204831768,0.17618799930772377,0.9202995605826123,0.7429876192495009,0.6196802357037581,1.5466816553329177,1.0899576705062288,1.7047158660636397,0.39100242452956335,1.4814309957549372,0.7244369305441052,1.066325636197941,1.434745978546954,1.4541151818020612,1.8262934439480336,0.09260298722537241,0.011295101093594884,0.0763864581182272,1.7225919451013216,1.806922712629401,1.074738007096649,0.666603636614342,1.2107440950394555,0.1690499953549054,1.3098983711875696,0.5522508365443088,1.022118508084064,1.34044670348043,0.42777982462947817,0.15598484793083234,0.5635486373078744,0.6094342684993284,0.9522896661957767,1.7547261443720883,1.5692826203890795,1.0033507265488892,0.0649462162773542,0.661894147331644,0.5544404173915374,1.5086717669356293,0.16339395571449433,1.284503109120298,1.5405607399076713,1.8062673263411635,0.9354423780077528,1.7907501428660586,1.409921946859722,0.26905039834522304,1.4005150640170783,1.3450067914674992,0.35313526870914735,1.3693990672771874,1.3581738396909628,0.6062498709675994,0.08912407608329476,0.06143310268368385,0.20524285645098495,0.5318226353491817,0.24471994553900833,1.6151195237754683,0.5188831375327925,1.9128748912805227,1.992069602855627,0.4026027284852436,1.5146278494263723,1.275152410040695,1.4344462313574775,1.6019072559279053,1.3397175456218169,0.3161025414840388,1.2009996205629117,1.1665588479634001,0.12891834828146376,1.4225644648470857,1.9795749433958676,0.7848667256385262,0.9988036066251182,1.3301378937686783,0.4948169566075591,1.4206087398647065,1.404646350726007,0.7184807335224157,0.666824017802206,0.8768457321932073,0.9188252106879475,0.2611290569591751,0.12625832472784326,0.6288517908065576,1.6989678113408577,1.7107281296756338,0.9364365938058565,0.40206993573261274,0.10357689922947477,1.7191399354705164,0.38357808544504124,1.8762229579592118,0.017837008054713888,0.9295691737156844,1.359815084165775,0.726360741586638,1.3774554976644748,0.042016670968124004,0.8694061999860678,0.4300911598941073,0.28444375389872834,1.4214469426243874,1.7180965589350334,1.5756711773109804,1.7133286636090581,0.4091562388996173,0.26918842456355163,1.0153953821848245,1.728675004285385,1.4726120958482158,0.4543840888191748,1.4954389082759376,0.1054544110386666,0.4387583887304052,1.3028176838467243,1.8499022318955993,1.3144330766549026,0.14652920039811557,1.6819776784876348,1.8220111755634996,1.8873998446688476,0.9353650990987536,1.8114523175378245,1.5057868859450987,0.015522738813000814,1.3676738206605505,0.3688653181085293,0.08339739424976189,0.18823293480957082,0.5814391632657441,0.479259270220453,0.6552754468709292,1.546228149035469,0.5092816649944383,0.24842960682374393,0.647696609661939,0.7269936647535067,0.27512391489710764,1.879852134183713,1.9275735443625832,0.5358060851243263,0.37914838896921266,1.9088578912376581,1.7803398615046575,0.868800849857573,1.79041599199841,1.7578335856872545,1.3607839835945765,0.9531718323703893,0.9619923415682021,1.3604679573939245,0.8195339753882602,1.9667431279561702,1.4957743418438363,0.2983236330670369,1.934815278345265,1.8135164491628775,1.2296644031182646,1.4951113470081974,0.4587171459452932,1.589935672409279,1.615274637318994,1.9932303653949375,1.269474418191931,0.33955095287698756,0.8235618815317127,1.5358747591968123,1.8798532612051368,0.3335772146887339,1.3608369165551704,1.2163283800871572,1.611572819656934,1.64107884575549,1.422803651854546,1.6517566096501977,1.2361587459203984,0.7537715642162599,0.05420834874416025,1.4443000576074123,0.5738473539008817,0.0742137264215037,0.2989052390717104,0.5313810089302908,1.7299040198419764,1.737621342423402,1.1006419300284476,0.4269077089297104,1.1391526577353814,1.0680587384513407,1.2470334023969056,0.23532701460779748,0.4482673085465323,0.9172815745741127,1.9076608557408523,1.6074942506316332,0.8774106421432939,1.6910186485972702,1.1929413570726632,0.4494438686146305,1.6357012173200762,1.941515161548503,1.5454629526462123,1.1414389526899815,0.9747272384867212,1.7107613799523382,0.17280926307443423,0.128386705908631,1.3337518285903203,0.734377539547852,0.8388148407143605,1.5120907024370935,0.5777622908477471,0.3531751434024306,1.117089586353849,1.7250283664311974,1.1634534830644112,0.5432364495261703,0.1356559085568052,0.4632406767026538,0.26714535072943413,0.6106398447800649,1.513165297629226,1.4769370121346825,1.9385460861543105,1.1473906420408024,1.7177311595207945,1.8686566447631296,1.4247439439175094,1.9250003172540597,0.047797359358870306,0.9385209559591869,1.1047547707892496,1.0246678365053596,1.4308451374006959,0.5867642408419207,1.5459098366578328,1.4963303005995856,1.1440075255493514,0.1968309766826426,0.440231484147243,0.3548741431432214,1.5113941879363546,1.1771508361149339,1.7045150204240018,1.0408494845041951,1.2017364788206368,0.3291821615690993,1.339831783846365,1.0915044004150558,0.48861609768797853,1.4223479802723453,1.4797161756545418,0.753505582026063,1.3551190130431205,1.001471863918241,0.33374070506103637,0.3991244620203509,1.083286903390578,1.5909195568499568,1.0358457716589156,1.6521772339739158,0.7680266859378659,0.842469132082571,1.5647308044214547,1.9772003692407503,0.8928518517802484,0.5897422170044391,0.08953805626385414,1.3677335823415593,0.965321574754034,0.6851503668596415,1.04287080855114,1.3854148290151747,0.4349674763573197,0.7472094034617842,1.5949351658645239,0.8506330499347525,0.0512042111579154,1.4306984223956256,1.6788274829542176,1.9539486393722738,1.4166045221281611,0.14285487303898048,0.35069083896624953,1.9743597028121855,1.9584492291092679,1.5352510206527121,0.6408776495371948,0.6874248047952265,0.7083660350485506,1.652480740140092,0.5876965129579577,1.069398262137867,0.9744814270023743,0.815471180173494,0.810753137251317,0.5696260479648374,1.1903295639782119,0.33650023217927183,1.9166130968331156,1.7499345408098934,0.8587804403256087,0.7885665030364413,0.06279899539618627,0.2582997361317254,0.2738110899672299,0.4203254436125827,1.5866743172408655,1.3823565279475405,0.26253528183924635,0.9049773422331007,0.5739207216556634,0.8933232717834119,0.6820498104832153,1.5100378718840877,1.970095560985213,1.3884586087597204,0.6851312527356495,0.3909689137512631,1.9628187489438376,0.04488619410035133,1.5843374258813139,1.227509840484565,0.6983140903977509,1.1322109980745476,1.5522890079019351,1.1635808321329435,1.2376726214333074,1.7087119675668854,1.6587537075153476,0.32712008323710107,1.738741852202463,1.0569340062323387,1.6240443493949552,0.6546799896794875,1.8931121206972086,0.9756946100600716,1.1213994066151938,1.4472314476083592,0.43834115639411975,1.4296127435411927,1.8737864817808698,0.15140036759978903,0.7556242699338802,0.9556107856705922,1.5265097021987408,0.9510596315069826,0.5113937294035047,1.400821922090071,1.7934241526837815,1.723827150095897,1.7630698877607895,0.5316450227602045,0.7967395999759055,1.5016806368340734,1.35290930387105,0.14150050184809393,0.38438438459747504,0.4245517714004743,1.2242878640451007,1.3189440993252775,0.14264835263452946,1.6467201433688614,1.716080984931378,1.3618784209261783,0.7975311486184253,0.025875782763700617,0.2101126760088614,0.22719926259497036,0.45384546695728556,1.40089399708822,0.7951271425706121,1.8512441544179974,1.905527672930098,1.59475178797845,0.5375922168131155,0.6672723836079859,0.5799366324026285,0.299718145703487,0.008275399442303488,0.005846023632633646,1.2593212520659902,0.7577422612176954,1.6824512343112956,0.9198259874900963,1.7185288541005588,1.2709288592777859,1.3271998197821384,1.6235511999419536,1.6187022582159534,0.7105533608037224,0.5272219274434726,0.4910825502834575,0.6209826170143664,0.8425953027120445,0.9744112249058556,0.21743179340276653,0.5878711599246911,1.0261844639952247,1.6837305781067236,0.9264461712787497,0.4353953783308331,0.9867802553939362,0.6234125918151427,0.053089263816436194,0.46361625397374384,1.4682857684035966,0.4078442291418951,1.4327443655944525,1.7659316436581598,1.229822295164349,0.4616560136764023,0.9923620645561115,0.029837804622278696,1.0726938895353935,0.9580758444854705,0.8328539790619862,0.73016048316719,0.4915412618410704,1.0707062412757344,1.3111140670571566,0.9551420444602878,0.039402206410467766,0.5488742923943359,1.079038100264611,1.788071720947363,1.587479825362922,0.7033858495892553,1.961217981802604,1.7355226030586879,0.8224635991296405,0.018265780149230526,0.9230297005701398,1.0193374838312406,0.7217064443424421,1.5424591625240667,0.28286595200978226,0.43705882921043315,1.413514372678006,0.08403263707834663,0.011874331785658665,0.24541782269108214,0.6562501029441332,1.828465449009439,0.6549119576695968,1.0025977172544844,0.027823828746853962,1.879565722440503,1.187646778562777,0.5096800568657223,1.0465610316178395,1.9048622923555416,0.7015482725265865,0.37260527375466745,0.4734608538235827,0.5204596638429329,1.8781064516735384,1.275818963939289,0.9459788375031226,1.524017749780592,1.135467917837064,1.2384413994622103,1.1185302040053133,0.8220188649701106,1.4659642724021085,1.3900768621412132,0.6280870673670003,0.579764482014931,1.405888767701145,0.31657707074176633,0.8212699469211038,1.9384905008695217,0.5791530593892262,1.9463797650961276,0.3788675012385574,1.1960449359959142,0.9874453718512597,1.6500285161602002,0.6401139760631702,0.6993363939947095,1.5531166340065834,0.8080615992189855,0.15445498822003856,0.38627277874232435,0.45354227372035005,1.894746910040694,1.780888931289021,1.6150572297290826,0.4943880810180299,0.4421287126620186,0.9560397641904919,0.935006807875439,1.5375433873163096,1.0961277506666463,1.5728276782329464,0.7762791470815871,0.33190586110585363,1.2776344306862466,0.9262122814154314,0.5581702801008563,0.40518658264897933,1.8614984312042147,1.6399402211879677,1.0769903531547036,0.5687520445779692,0.34198146917069083,1.078641307378188,0.6604551700643384,1.8828855196816012,0.25769912668236783,1.0219615118790366,0.7502443202852249,0.4465127288418964,1.7518672085435374,1.6878191235473539,1.4184284981060165,0.565635406814271,0.8393794046332621,0.18235007918984403,0.5308719528131158,0.8600174512848415,1.2543828382260407,0.18101460628637778,1.3798699539077095,1.3348030935851143,1.5088439515452867,0.20789481742445082,0.6166721937602837,1.9709442772250152,0.7674106287960396,1.5855224222591002,0.3665420862878688,1.8141599116903055,0.14189773616818302,1.6199515056580664,0.44542048987771965,0.4809710790942745,0.021859307881395118,1.2757615421013702,0.7044871924142253,0.930890425337215,0.9789128559451297,1.1295176912697795,0.4889726859927048,0.3093828683633415,1.5790826327027303,1.5393472862417936,0.6353632403583092,1.148254631009554,0.3974228943067679,1.8797233144462808,0.440556247567494,1.2181361798866615,0.047899408641132624,1.7608170741584335,1.3379044364101342,1.877784234978125,1.6473041747081631,0.28985452486138863,0.9188099019282312,0.5844913030515868,0.24439542402845138,0.37031346861953995,1.6978009951042101,0.06712829690938316,0.5920386101300461,0.6719706945200472,0.44400509171986347,1.3976142892062566,1.0210568846834303,1.5866695532270194,1.7695223202374213,1.3941309414843412,0.5630489011271189,1.4544095028638804,1.948041536667502,0.3281057374959282,1.153785771772844,1.8728612092696157,0.6665055964977271,0.06899293791620797,0.08403253185140613,1.5621544646001615,1.6655580347109717,1.778054321169213,1.6262444396610336,1.5929537867642742,1.3632762751547451,1.8692932684136845,0.3691078636496097,1.3321544160380716,0.8143317797916922,0.00470984075963754,0.045147957515711656,0.39018227570174435,1.0302796515123291,0.594795457272673,0.620844758120024,0.7512190475192191,0.04657686623526258,0.3724605884996466,1.9582963957825368,0.4308538223741487,0.738357997877535,0.8445891814840008,0.2560966384496228,1.054341796365549,0.6045856144671196,0.8817258174979128,1.702488664875856,0.7863925711486841,1.531904405820296,1.6280735569045137,1.695352176197443,1.1775446485724714,0.4384625175086505,0.738728509440417,0.3405684558694282,1.682612722954281,1.0841801961417556,0.9623881864967729,0.4373643188972949,0.5717826126531063,1.8410641850016751,0.007469680589441641,0.8785095407574262,0.9365364519386423,1.2232564062897335,1.2508927495801654,0.6099735278675387,1.015330267430576,0.24128684393147504,0.8027855932634131,0.7555609181714416,0.6224138057310973,1.100455133957564,0.9920234599356705,0.8196135920050494,1.9561772115306417,0.13862071836871825,1.3530323935466857,0.18970580839226692,0.3041979716791565,1.740884864232331,1.250335224043572,1.588277453338299,1.396271832528761,0.0701772120098334,0.19224824915326444,0.7008845278890288,0.8069070537275245,0.841702931205222,1.0274225779446464,1.5348987964581187,0.7905072454166016,0.613522857043503,1.6931451488498017,0.05979922426890294,0.43474587692989974,0.9929637026354596,0.4325115449152799,1.5661003982760757,1.2579477505757053,1.7431447982032102],"expected":[0.14296201834108152,0.272519576747637,0.21609619502299995,0.2776907515537197,0.22137668047310016,0.11315956995714352,0.26367029901447675,0.20362343043821782,0.2635048332427696,0.20169616289240244,0.3486968691727121,0.05428936802454513,0.13479666491510453,0.3153579204100039,0.28679138379595515,0.21390358802338727,0.17106238810040414,0.12678018066367563,0.15544422632659685,0.17314100970790172,0.23342828481355582,0.20871780277163032,0.25882479310699436,0.25233920844608004,0.12488684675872391,0.29007056504470324,0.26863869370197074,0.3274981101579418,0.3148515145686113,0.16930524037814434,0.2627607974360135,0.1831822765047708,0.22988118551501321,0.1183602302240661,0.24136079539471889,0.21600635699953571,0.24761263503013983,0.32708143241026805,0.16351987215997935,0.11373045213439856,0.13311313526106508,0.16103797262583958,0.32410072449616123,0.35273501732107393,0.2501252438627279,0.2945108192681144,0.3179992526594766,0.26292020203021776,0.07396482619358917,0.2584841336453013,0.2903398971067189,0.29629073531097155,0.3213418730505947,0.2542537070523461,0.2126680772299677,0.3073422136045797,0.1524503977136679,0.24139214147807656,0.26687929485803513,0.05550013853760437,0.3368024571309672,0.2761081175580425,0.1273270015115329,0.29281020910922656,0.2653259398531666,0.24881214317142758,0.18359897567182837,0.25775758057548925,0.32425374463263856,0.14375277686558202,0.2590261578981133,0.1629415720084707,0.032282141050517375,0.3427990303762775,0.1927675409419844,0.19886815570775046,0.3120200094768534,0.28876975997168697,0.04175727113939761,0.2497072839779123,0.34914957827706194,0.1784800198208401,0.18667286755387227,0.1885460069297629,0.2882663559707242,0.17708683978296547,0.2657915858412231,0.17226825247390384,0.32248923980755695,0.08290650572855286,0.05585013555028987,0.07944321800007594,0.28553836952572886,0.044067908725058724,0.06663345362134444,0.19307509137436998,0.20567572100991774,0.18852363680398498,0.2830470136917795,0.0913502917507966,0.16818375003948058,0.30636285341438363,0.2683966587855054,0.3326974126492121,0.17388089539990595,0.33914282402865176,0.22921491333731114,0.197571308246752,0.0379253166749364,0.13727943665393946,0.1002061621435183,0.05024904166301547,0.04033900069817478,0.22900958251276254,0.2651575971098158,0.30036558574482874,0.339074792629342,0.2961940129926013,0.2033841358333338,0.21724153553658318,0.22078832433319595,0.29110706028203964,0.34303180755776747,0.1709743977842353,0.23314346833381527,0.2719592861075992,0.2329356343988113,0.34263182191736463,0.32768716101795464,0.07436141562538481,0.332544398443014,0.23441515946543529,0.2548015937358691,0.20582263973518564,0.3035325360396613,0.35167034342644393,0.2845052510368891,0.19998950919076672,0.3034109063530342,0.05374083438203676,0.24744005923449017,0.09172016056267213,0.2511141215983238,0.15721392602850798,0.2313648256260414,0.16191966370766248,0.291914417827931,0.2916670500226855,0.025606088262977632,0.18320818015647214,0.21410614683546247,0.33358732256670115,0.3100208151684893,0.09938343145457258,0.061255483337463446,0.19716973222404968,0.2124495500273724,0.18074121090301012,0.21507605197555132,0.30826368408335375,0.25252001251144335,0.24344074446862707,0.3256256888138612,0.21257252851027755,0.23635797206865067,0.26209071285677965,0.15848578048980858,0.2455516469745573,0.24296197968685027,0.15392863982579666,0.32943960889523927,0.24484611042648471,0.09939628152693673,0.20786943392239088,0.30698558011182486,0.31952287491385134,0.3288603676499473,0.3094180512051082,0.20747208527806152,0.19690591403079072,0.3341907817458293,0.2228794184603611,0.18989096387825372,0.19867552277105482,0.18685474410063577,0.1916507489668886,0.20704322868052344,0.2786132035805391,0.12120467619183714,0.28597761367972085,0.2758346643862774,0.24567452475821785,0.05938268540455656,0.1099829285381021,0.14355466652257085,0.3512903593838636,0.20490173271224066,0.3303873840955282,0.25400645007203326,0.08209499662793779,0.3025636422030041,0.19724085753532622,0.26706294824635834,0.1293176289816871,0.3104041937986398,0.24305981194700838,0.17220672157475114,0.27112662712414937,0.3434785171221694,0.29538738944063464,0.22505481247518705,0.31072577970194376,0.3285911706588431,0.2711025743967785,0.24591124185336344,0.17251585469661823,0.21895844396731926,0.334130881382146,0.32120082948025885,0.24031256954676217,0.29672799434043867,0.18031451584145744,0.16960696814092577,0.07837565088501845,0.2583388209974439,0.16625950609124376,0.14093183314428248,0.31064333844649245,0.31214351438469573,0.22290303905339573,0.14811535448962324,0.20540913347696646,0.29737581684467884,0.304725062680004,0.2846660599350941,0.2190472852178973,0.2864941360185048,0.32817369666169477,0.1854606770638744,0.23968155667819074,0.30579025384450464,0.13215813938140972,0.12041334709728174,0.29697929236675225,0.32731695484187284,0.13241508144045758,0.13480621335464996,0.18158942124681374,0.26419350167797073,0.017517667842633033,0.28812286255184805,0.2736866284396458,0.20387301735397984,0.2910806826172862,0.04235391205799586,0.11880388027950345,0.3250680277123218,0.23906437094285243,0.2591269654826495,0.20949624312922177,0.2659312664036624,0.035103346697046164,0.11734548617919131,0.32462920959220787,0.30886114338538095,0.25691452287924166,0.19446904244747304,0.19944523991661886,0.2249872047593646,0.1920763461933064,0.2472697988270162,0.3296275705176659,0.34445870903219017,0.16560455496376716,0.19941277340815192,0.0791411371326631,0.3094628944921773,0.3058101230482569,0.17895956503139263,0.20374984389001854,0.21563591752805764,0.33210100126883,0.16523665019515452,0.22370432878080182,0.16139397019894447,0.07916546071418627,0.31389212881868156,0.2559662961690626,0.23693391872492367,0.12907980378261255,0.3030643535348074,0.27671645528629935,0.23439814538513082,0.31900023007413875,0.27766380422863407,0.3036362074641627,0.1610498440951053,0.3269401721416567,0.255483085975889,0.08957499768485017,0.2715859819616937,0.13212818274146051,0.2397532349540011,0.29911148324412784,0.28272832383936314,0.31802705146495847,0.3346489435009564,0.23977702818632038,0.03601057132754447,0.28781589711427213,0.1364007538508829,0.17557835145590447,0.2424975498935265,0.3089100002549014,0.07328744340697935,0.20751531688469546,0.32638122056144525,0.2687218974625646,0.32194718268160494,0.2722858832362793,0.15890907828359419,0.33233850040522017,0.29259803295407577,0.08600113481883671,0.19207939388647494,0.33779518999633856,0.31062683319806844,0.3004595704957815,0.22633365604639705,0.3062034265401007,0.1346288363256909,0.3066523697277588,0.2863999263896688,0.2281605544415104,0.09069071741131957,0.194863995719073,0.2253634602556713,0.24195281103017918,0.3310286714770349,0.32189919551129403,0.2258715074166147,0.13103140163906216,0.3362309105391056,0.2078795031263866,0.27869830963008224,0.33827467509886605,0.25303587417280826,0.23730387434571976,0.09669031403669014,0.007472542749236868,0.06355864550696025,0.2114848146386707,0.34727724730309356,0.29855682212897977,0.267612013095348,0.3227912058776076,0.14140205896963207,0.19448534821481597,0.2643133231207885,0.3196222678343345,0.2941386410486853,0.1880425505137507,0.1053651581198717,0.24873276769079775,0.27879090398326,0.2843316008103619,0.27733513524224435,0.31447462382456204,0.29568735636979304,0.058770731480479135,0.1740428425682358,0.1748590252352605,0.3409929814216336,0.15814173108156632,0.21918381502568002,0.3371792349569748,0.34767177368967167,0.29133199643161267,0.34079174183129124,0.27668594276860425,0.12902746377483384,0.30122697973139545,0.21274403284812565,0.16550850242284337,0.29171446598984707,0.18723150161592705,0.14456604642423862,0.050513045331206374,0.04101875439611244,0.14329254279144368,0.16174277825092673,0.07777654366175799,0.29262247714957407,0.12359491625401128,0.33933646062571043,0.2352141665192718,0.11197731499971986,0.2081079113113887,0.19912968849351445,0.3238261630708648,0.2954565632961181,0.2675004572438584,0.17143028148784337,0.2917983602854967,0.23750402392679876,0.05983697917264262,0.26338678020342776,0.29012085531635184,0.17123311305116745,0.2753924708709029,0.2790650646836183,0.12839018651734285,0.3294553602966735,0.2871316890087601,0.18979049173435408,0.2646231111477748,0.24205132939457283,0.18264906873193806,0.1865262144540007,0.09058043588546613,0.20413619702950153,0.26110301983154877,0.1947368342833172,0.178569282735935,0.14027628683109747,0.14903817215912143,0.34675317912938153,0.23758343062609408,0.31866862103383287,0.012654225308417913,0.2896175613037884,0.2055366150972676,0.22884905413296774,0.1909017466970356,0.040064066084792044,0.3085795720899988,0.1702029375402959,0.22496615811739915,0.18174173738831947,0.21538042134729166,0.20031056068138675,0.33911734295664897,0.17854673216426825,0.1535345742993592,0.16058149027521207,0.3448033014295935,0.20910500350507713,0.1886153582436319,0.2763620200167122,0.04419672701897473,0.1552245262998709,0.3308713421495406,0.280848776421105,0.20965121291355077,0.16426454659850775,0.2726773492562636,0.2801419919810415,0.2502628119188048,0.18075494370447506,0.304573872574814,0.31844106396648914,0.05794983085584199,0.28235716654862286,0.23682879431510023,0.07733859706520019,0.0677513787422984,0.2744936549883644,0.21957377073834677,0.17806293100609652,0.293059179927579,0.205938569878322,0.17288217016727214,0.2888110880328645,0.23504171896966397,0.22240622978921706,0.19800704275274364,0.20326909195698897,0.21732892285129987,0.13470913148736197,0.28160602350521474,0.21876510557498027,0.3090353210982266,0.19592120968231228,0.25397491857744914,0.2030424893096498,0.3140499338951916,0.2809133804203837,0.26585166781844716,0.1484066010146288,0.2676784683872018,0.22964661125554656,0.2249302131184232,0.27872930531675777,0.2180813257503238,0.27045965529113625,0.3399355849030123,0.24025144020076455,0.31608707224879407,0.3422680560112302,0.3517615214276298,0.285653688279647,0.09690038083810619,0.22437467798020966,0.33802616018094894,0.34081984913824653,0.14928727452866988,0.32539236008209954,0.293464493508521,0.27247087052152247,0.3400962571381509,0.31460157390848154,0.2546563101318463,0.3090118508055378,0.2933617683966522,0.029414454300346508,0.25590064718117733,0.23113976441347012,0.09262612788320626,0.21713543530356585,0.2414433247032514,0.23721638950734353,0.22142255299869815,0.18949025336638145,0.1670407729839875,0.3239539848638783,0.2085106653502738,0.17671772997634036,0.18627206467850146,0.2298627102747148,0.3117070373327356,0.2665338723774214,0.2785508361293523,0.24906352569527243,0.33568241855020264,0.328643370297403,0.2363188585879057,0.1849130271638157,0.3230713628007631,0.2999582174809391,0.1681920133760637,0.28711813820961146,0.20196695623756727,0.06628604227230857,0.12597598371768162,0.22374853658605962,0.1588812982129084,0.24090669816664548,0.3080198333069822,0.15523387977478031,0.16754644713137293,0.27233322115338016,0.3359579141785593,0.25295314622503395,0.275054141907427,0.07855093788764084,0.25333321010705745,0.18266730228164402,0.2433874858066492,0.29595883047112,0.3227418093644242,0.3449351802617153,0.2310852343615225,0.3255606115877467,0.2334621775335723,0.299357637606023,0.248067570849027,0.03223478181081378,0.17842689211954954,0.3013656238119562,0.19886454283990534,0.22638666038613747,0.26750926375108197,0.3146782252586992,0.2987796310478262,0.24192327808517822,0.19039832375425877,0.13177472039894375,0.16566247738144593,0.2948152984644213,0.28564093643410965,0.24604369836947085,0.1871739419640106,0.21689408678105546,0.1253503621900491,0.20361149482502125,0.24070840701537385,0.1195873855087976,0.25675396854751953,0.21538028989219526,0.2841481518037799,0.3352131870585216,0.21719504609037416,0.09703863502732807,0.25205404708604817,0.2659904072073966,0.20433886725505976,0.24306663415626828,0.336495519543067,0.28434121922295585,0.1934352729360266,0.22339276793867754,0.22821939394468702,0.2391724365808785,0.24488952666626287,0.12274041719970638,0.30860578076884476,0.2983850463182811,0.14530824054829647,0.286502614550636,0.30060971657661184,0.24303430023918526,0.19448128655681002,0.31846665482882325,0.3071593602823612,0.09589037510078462,0.33725826461444014,0.2846292422730101,0.352503227620098,0.325930766372324,0.05344012526651983,0.225175328724921,0.3529244011249801,0.3284523323982794,0.18208462256763683,0.16160855381047626,0.1930536908661462,0.2469444209423515,0.2792161483515346,0.2623548103129028,0.25365255849530904,0.2613352423726203,0.2764671314071649,0.24656939023672067,0.27873455261129326,0.16921509604622553,0.11372630785475006,0.22734291615874264,0.3455621811575681,0.28937736488429944,0.17638489857720244,0.05571868218593108,0.11640415888237239,0.22108161591411532,0.2326902709121501,0.1864364233594039,0.17944691823009828,0.09397326622661312,0.16037436618322415,0.2300612689074665,0.2971246963619042,0.2927622589891679,0.21502593495587005,0.3368761742216123,0.3257108750617236,0.19121316007331318,0.24965500164123686,0.32825961100323486,0.0211175333877445,0.24014237854006396,0.17535449795964977,0.17241179076493615,0.17649235146100034,0.21431745542922467,0.28929143772356886,0.3259523895761333,0.3379328216721154,0.27348234002005656,0.1532486524261959,0.19078314214705117,0.21429540206372832,0.34282978403818504,0.27579435944795416,0.24788188694260993,0.27722736841176276,0.30978119673835736,0.3179872651667775,0.22969066898206023,0.29616140828901727,0.2841382660317747,0.11745836199269176,0.2541187137245581,0.3076424785305427,0.2554290384486231,0.1959132903353943,0.1256960822670303,0.23586414537821282,0.18991675590103885,0.19266391039405534,0.31115458662058026,0.2441012963423337,0.2443842620983717,0.19735959038206807,0.2210869874972277,0.06626358983806274,0.17915669807465187,0.24708794062640116,0.22268603290965217,0.1962118761774609,0.09697572554831818,0.22156535805584096,0.3464756774993044,0.20527465595469865,0.26980958446077263,0.0390092550478542,0.10907988309693706,0.20353598572499815,0.11360260694655047,0.2650135653887864,0.15991650498301235,0.18997942846096455,0.29113875445293225,0.18560557648406498,0.17353269713888902,0.18607416762203263,0.15949900576632162,0.11153372410770618,0.02351254644271011,0.014704176748677689,0.3215053415591818,0.209935708125315,0.3428297010949743,0.2989443247248885,0.29595777315059674,0.1733675640192813,0.3283261268029164,0.3418167568387943,0.20393396877409198,0.20986544353465045,0.13569749203039042,0.15152988926552688,0.2728006659360835,0.15066917246828926,0.1887218440712779,0.0931458853700827,0.19438207720784012,0.22392558302541224,0.31664639873200273,0.15720251187223827,0.17917075313378888,0.21323047337521384,0.28481331111898067,0.10490494217107488,0.12919181626183943,0.29641202977307896,0.11622428128707252,0.3384187211067412,0.21027546915156964,0.17376744391426197,0.21807189704335214,0.16058529914753816,0.07427923709784146,0.18464057840488407,0.27717677789809203,0.29518647177115287,0.16271336643128914,0.24645059196471222,0.3041261057902853,0.1946092997227912,0.3116767506371231,0.021864595524556267,0.22555982428969276,0.23460829279027856,0.29444118704266764,0.31016740389708614,0.25762373192945986,0.2282318285590558,0.34736429406784036,0.16653838107947375,0.011790879688238423,0.2210629738590768,0.2200482432913692,0.22981409404671624,0.2519154158779546,0.16683151012456301,0.12043797037278729,0.17820655418636228,0.044623645843680726,0.01665402158931331,0.07953136592442017,0.15811326456650637,0.32961422232058946,0.25330561416529845,0.30655524091633785,0.05683172241140321,0.3403727405654327,0.19097994447038347,0.2375211699070687,0.31723783150536744,0.3352294417373774,0.18246901933288842,0.1614025009166459,0.15426487510312273,0.21504093787640893,0.35023779493627094,0.2177543316700953,0.3119969107686967,0.24758865185219367,0.3072804502196569,0.2537262756474046,0.1821378599717885,0.24343225249361344,0.28951013989716506,0.2256324992495864,0.24070262648505575,0.19966512230172637,0.23465894512019014,0.09274067207812427,0.25182035297247485,0.23815122905418254,0.1498751421670397,0.3524298258576659,0.15681384207585683,0.284853559088199,0.2468622304991957,0.34306904834062235,0.21925225014865152,0.2689138073136488,0.22212697651900237,0.1484312207281027,0.1571819543297521,0.2103293021511075,0.24234302680258335,0.3510095793620675,0.2853797339689151,0.3422196869315583,0.2606748275220772,0.1935645446716937,0.22949396686037,0.28642321380627317,0.26157573281694235,0.2561578394540145,0.2946237379820639,0.2972278164883442,0.20206020341628142,0.21563925468415188,0.20231586683532846,0.14515844015812415,0.19253489410788466,0.3382000966360448,0.3402009100759426,0.29045153124759815,0.15803587537491726,0.15142065244831376,0.29767827522315804,0.19986451715514075,0.2682447590054898,0.16943589397373854,0.23820664622062485,0.1446948222756895,0.14978734031886146,0.3444160841685361,0.2166524161123861,0.22008479782496224,0.2720276378644332,0.22348187928216667,0.06956095621988437,0.1388950338712872,0.27816477962954417,0.24676212658250685,0.06951389934814954,0.20406400000048683,0.29818771581690756,0.22351521426021279,0.16290475516139094,0.23723665433285704,0.3118384068242609,0.2157005917549592,0.21943769849572378,0.20712760442876174,0.3102421161053626,0.15830120497121364,0.24504766089364804,0.19192820300650215,0.2666802088771432,0.017384005049841323,0.32502215992542416,0.2760134541145929,0.27698508727851384,0.31646014491382535,0.30387412843759576,0.18396628254273062,0.14385529049345527,0.3424330230906242,0.3004687717888297,0.17196634848990958,0.2068618015396085,0.24921237082094888,0.27610896409921365,0.13982497135009048,0.21542144496136062,0.05453632651664338,0.2902549434937003,0.3215401322526091,0.31098057591839917,0.3337628031653832,0.11980995518688296,0.30083017410456003,0.277386663474995,0.08880900094818261,0.10692626688461399,0.2022564500786771,0.03872897398706439,0.1685987242020052,0.15087761912770248,0.13341434047428322,0.3240603373862325,0.2504231626264009,0.2932315157683516,0.20284401033586758,0.27093291241394263,0.2730568526152325,0.2717754781801156,0.35247163851461366,0.14197992263447676,0.19767017122397987,0.24372126467259295,0.28803375655118224,0.03588523539361898,0.06520445369165183,0.2125547571773226,0.20402476853271867,0.18924294686408366,0.3349634062236065,0.3343680415604156,0.1835487059896376,0.28867026110182287,0.12432108402540865,0.32751598024996725,0.24909648115392205,0.002706493058569127,0.03564966157615998,0.20174865243274712,0.29923819113520467,0.2666242221990237,0.28211410231474143,0.21829485155016445,0.03823032504936625,0.14858232221944997,0.2834369087808564,0.24757133835776865,0.1802002261960837,0.2905671462197709,0.19855881999196362,0.2696843129834529,0.18937012688139618,0.25267762533209626,0.20531417215183861,0.29921823295452454,0.3148587283104245,0.25076229121353466,0.2389781705100227,0.31297605520182387,0.11514151721774035,0.18178929668099028,0.12230874896619667,0.28582450400857295,0.19413275343386335,0.19410457085648405,0.20543346063108867,0.24409157943540064,0.19541919736935887,0.004851211590811337,0.3070282381022548,0.16115638736927462,0.1700286252287212,0.3298437828602074,0.21898976075042578,0.31266466327716474,0.1982519896268578,0.25138368212464707,0.26554079296582034,0.1874345467674237,0.17213770460253427,0.22646075846031005,0.2176457268351832,0.27622575072918676,0.15748966392691283,0.1880693504442111,0.06634009685627322,0.1583370534740989,0.24513698829153324,0.31582513858607614,0.2403021219566095,0.2262000140894132,0.12232887045988193,0.10480065504843711,0.23178336360949015,0.3044531046301203,0.1620563662889891,0.17991640326812836,0.33917097730692025,0.27442161433079043,0.19309653838641952,0.2446511415673585,0.09490738060182984,0.22748091525131178,0.16262616968812685,0.1291366016797427,0.2922767819251949,0.31274315248111717,0.18823879416504968],"x":[-0.7722241104806713,-0.6071491573346903,0.06425999393098714,-0.5647711254474408,-0.5456888435162708,0.7906326574562814,0.4130572768138592,-0.17306008065541656,0.061418295874064555,0.7449647275911002,-0.07011940830558938,-0.23332708713686356,0.47524943023288024,0.011343784066318197,0.5020716542729491,0.3099691642569944,0.11539592159745071,0.9166017501695629,0.9521918568325303,0.22961003914311462,0.7626350609258088,-0.6138696254619589,0.5878360235564779,-0.6086837560984963,-0.9817151251491394,0.4688568465002896,-0.5656108382857457,-0.3020029033025038,0.2047196886549867,0.9701920568760549,0.4052982553502744,-0.7624343604166155,-0.7386335265559709,0.3878931043332141,-0.3779623975051276,0.7196951876450672,0.5296643599322466,-0.04977782032551881,0.7575884443637078,0.6922531974924309,-0.7846089011264712,0.8506157854368785,0.026569533964199366,0.03558313049170625,0.6786639446141391,0.14327916761896775,-0.35009260067906833,0.015778202481571135,0.6489920949252865,-0.2706712786614811,0.34824025098293854,-0.04012075332607523,0.18141094987785378,-0.6773695519716707,-0.5020744307613394,-0.022052052676178935,0.6176164986892236,-0.6970762723193236,-0.41614482834187605,0.7442708198401435,0.025631283461717835,-0.5165229465468921,-0.8542272392591865,-0.09718715377370879,0.5601977114037995,-0.508030845404158,-0.6560184729270588,0.5879210030869748,-0.27377930856767474,-0.73667447474664,0.6624926010327266,0.5449996794957066,-0.6576148675014717,0.1784559976457758,-0.9704296320820651,0.9275866466942557,-0.33913563167064487,0.22511704591509796,-0.7415903171289502,-0.06163108100678505,-0.09543058596181941,0.46426928299729386,-0.7319110399525472,-0.772657007406703,0.47902724483546244,0.5351673929776162,0.5220666687312181,0.8986543875125412,-0.030707746570004524,-0.28076872044149903,0.6524346007522519,-0.41144650509016145,0.5164387397608947,-0.6713472603097124,0.9557715151918882,-0.4000305200073764,0.9314429366194248,0.8326312197042594,0.2661120439683189,0.4990851780906618,-0.7353144873011215,0.40892039537649616,0.1698763604697553,-0.22171138907326604,0.8645986038600313,-0.10138285653449097,-0.7700774563188624,-0.9559311192378823,-0.8522176990253274,-0.9529059185288467,-0.7553381995267578,0.40196516507546187,0.6636701452829348,-0.3568635738614194,0.1978589626994549,0.21305063265515756,0.2145653102113254,-0.2886929886021923,-0.7617562142035958,0.8417936339269163,-0.5671164768311368,-0.4087288467527146,-0.17918230969238325,-0.9618352684746312,0.7598752873284735,-0.47678984318756834,0.7676516941565055,0.07912259618096362,0.09714959562870229,-0.6990922064186229,-0.2418433493197485,0.7739459153121477,-0.5876455493752095,0.6382396722374115,0.06658976523158655,0.029773195263954833,-0.09130053265098104,-0.9146662731546007,0.22072998261674703,-0.7574447273283478,-0.6854070347829233,-0.8696562997176964,-0.586205505361479,-0.7898343702820187,0.2979752367301378,-0.9277070479258356,0.4463062170318528,-0.41694862646401365,-0.9113354391562374,-0.5208202379953093,-0.8576109043934026,0.17846226169635626,0.1796827018567626,0.5430468318217399,-0.0946723763427273,0.9063082500554245,-0.8683746722889181,-0.4416832664335275,-0.7217061804533698,-0.005728683123989775,0.034963785837139216,0.5829258348323951,0.07067275916906945,0.042897733806500415,-0.5868059440258016,0.49147732261620725,-0.25617930979566683,0.6761393561027331,-0.07971572527580939,0.031122863011900925,0.11933660918582634,-0.4993587051076571,0.5739683494725356,0.9143919749745852,-0.2852319437430064,-0.3327235734494711,0.24396056348231943,0.000498868697129673,-0.8327076396393185,-0.940431902710468,-0.12225985004577167,-0.660363136213705,0.00032236934505558423,0.7172146796973191,0.9832186500817062,0.9061468229131506,-0.9119480941199734,-0.33811577967390694,0.040067499070723045,-0.10129111858835982,0.5918910170105347,0.7279205445094954,-0.8234096728981313,-0.39874513946382306,0.6543142397899753,0.03248658274211369,-0.6223552439083604,-0.29644621053663833,-0.6999143460491664,-0.6509720112470379,-0.3134976186347589,-0.7594856543028836,-0.3436618739028465,-0.5317765058631911,0.4208011944192518,0.5120574811158658,0.9585323015362319,0.559150031700931,-0.1208224504958868,-0.18799104402174516,-0.6782858780358088,-0.03696918323112808,0.2575458896331133,0.5196193186192146,-0.5443932103289306,-0.8265283861858559,0.735426711227166,-0.16915250621488287,-0.16964716228638954,-0.2519712289234053,-0.38246321115108417,0.4698517645445781,-0.7947032767395545,-0.8318253364448753,-0.3349894974536807,0.3491933208829874,-0.5303784160878613,0.2604215491037114,0.3919586101705508,-0.7906654343176873,-0.642554884079015,-0.5188662969238322,0.17307308803544874,-0.15233161988659205,0.3950578364455697,0.7055853604329778,-0.4574512913736304,-0.22899559092309696,0.34379824429704,0.5813902413115857,0.14689673602332132,0.8856229985873019,0.8576094990046705,-0.3672820946013511,0.180936622387597,0.8181694799156678,0.9810430849988694,-0.44010825770751083,0.5156594025848369,0.8404450040314129,-0.1418767844543516,-0.5222476800386273,-0.73947944597785,-0.028104558996167928,-0.8870944961736722,0.9095853753800758,0.08330971453260805,0.6676441055633062,-0.6037492483239286,-0.4596534878631684,0.41821599376605434,0.8602976650395227,0.31115374346811686,0.28144700577369175,-0.21780320221819283,0.667180438427065,-0.9494656067434653,-0.6147846236595935,-0.4766727019212653,-0.9610919655263874,0.3459450043892285,0.23296990865427958,0.1566633015572534,0.8477958391213032,0.9638368818004328,-0.8418356851989044,0.05474633754893388,0.40439676444952166,0.9149499527457965,-0.6432973924877601,0.7401061787108802,-0.26956431427565697,0.7426265032972226,-0.2444854010253117,-0.9907146622201735,0.14586820500161757,0.09294883932476061,-0.4149942491801193,0.035535167506267396,-0.6676901050286834,-0.38516882234368577,-0.3480341849906168,0.16630370520394733,0.21860282230319372,-0.4398759829873411,-0.4381584178006577,-0.6755287672394128,0.2864917015172481,-0.5556068433503132,0.7245193405867609,-0.03310589777056849,-0.7879687618663795,0.7345042641652455,0.36305391503639317,0.13976252393631095,0.2017940397775284,0.2724956073807925,0.7497660742940688,0.49982517085631883,0.06739582348971451,0.7721253997305872,-0.9769247730643928,-0.7504953037222188,-0.2639085629664466,0.8476709787044863,0.4860881134014985,-0.09347263039520648,0.6058851808949468,-0.26329680321727356,0.3901036732497185,0.6946381299698272,0.15347328940334481,-0.3538879567659383,-0.8830446475535139,-0.936406909624357,-0.19463145045098829,-0.37100989218264946,-0.04926319666842183,0.2978471698331573,0.4481313759478751,0.7092600931796049,-0.089028866666927,-0.5279756016635937,-0.6298429283451683,-0.6569836483868983,-0.766690148634479,0.532934028339541,0.3763235184590856,0.20229983611123892,0.07192430115158821,-0.7973415840109626,-0.7754361243285057,-0.11748676159230387,-0.6095337327743136,-0.4008804816326301,0.02950979833553946,-0.6263033873752195,0.7595770368980341,0.3120103261237217,-0.7259925898057182,-0.46686148967924757,0.8699788762822713,-0.08695310149015523,-0.2890283895698418,0.26636688037663747,0.15102226169855548,-0.31322834480274997,0.8838454708904546,-0.18731064131657682,-0.009003186835885302,0.39711214273292716,-0.48658174951706545,-0.4833200003207785,-0.297510500945386,-0.1259001561896942,0.3260166171836656,0.560815775852292,0.33077271499780814,0.2780782502356254,0.43718253746203173,-0.7516241993687176,-0.6710054753573762,-0.009189139870561025,0.21244817192005794,-0.7528541582874002,0.1320044233946258,0.07768335477903543,0.27528453797843255,-0.17475171288285418,-0.5033052510894089,-0.5980882693888292,-0.37201327384918237,-0.798184902295846,0.5169864891241667,-0.41720899292009506,-0.9329565534222377,-0.8947086254848067,0.7043118376979698,0.6286478707056817,0.38741818998302247,0.7270583850343022,-0.9959566424089861,0.46238521082021844,-0.9751200060616512,-0.2184301866742091,0.7892919897859496,-0.9395263815365351,0.8542426049052709,-0.8516621379583666,0.2307365249849651,-0.4452540774662612,-0.5330282104656905,-0.4352129878151274,0.3723050164964685,0.6344038915344279,-0.806464429248682,-0.5706748100605781,0.5283958057332976,-0.8370318006996595,-0.39431885694016433,0.4735971530284324,0.9140490384607567,0.17452744440536438,0.4493335092684352,-0.699251414799003,0.28469007915295874,0.514255464800466,-0.8318864293637218,0.27196731671806784,-0.4848671220879974,0.5712167678186062,0.6299091102018095,0.9532297672358645,-0.8614882507932164,0.7270301504749739,0.04125685168007154,0.03691723357017995,-0.16341096598001936,-0.36070130689764346,-0.6630408019380241,-0.28350921828146847,0.8375407755589759,0.5069471808720221,-0.9172235734195011,0.4464921563655313,0.0504963053672669,0.5824107459140806,-0.014895819343278216,0.9756243383630863,-0.8501540976460817,0.9040984150584084,-0.17080698304001896,0.5154484001544937,-0.45571931791684506,0.9963452598888951,-0.09714690191497155,-0.8417054431848392,-0.5104585546507221,-0.5221419177413633,-0.9353525685834003,-0.6764953963872786,-0.09511140836690313,0.5571595153942916,-0.8069635267230622,-0.1263461607240215,-0.5722629549088145,-0.5567888221804242,0.7065148760183422,-0.8488260017803286,0.4312425770852779,0.2902824170794416,-0.0447625851571809,-0.4655801566027029,-0.14348103814115554,0.3938556370699393,-0.9521840098589718,-0.1334662090421177,-0.37837304083008094,0.7249711963007481,0.4474937558961729,-0.47306409402532656,-0.3196326052092462,-0.026365460026507304,0.47683616783725746,-0.006930614190692186,-0.958022357315834,-0.9368295448626176,-0.43823898509292825,0.7344963790856398,0.5612064273450752,0.8421657414182238,0.03219614084628164,0.9577502745787152,0.6720174661970315,-0.8504467079751983,-0.06302133775142682,0.3497069219032123,-0.5456595299852571,-0.9964060546822635,-0.6346005694740287,0.7453771339114605,-0.08995966659585486,0.5783201969624416,-0.8498327669346719,-0.49171405014127245,-0.04746916718838756,0.24611392680418298,0.32495896210083997,0.08512675276791892,0.07913728332174852,-0.4246556015350178,0.9844290481721263,-0.5772108471296149,0.11751272517582301,0.19708280062508532,-0.5804230307715144,-0.19193639698003206,-0.367454768230429,0.5618787564114669,-0.13392656610695264,0.2952629603351311,-0.6530620564491278,0.27786549417371065,0.13764374653307776,-0.7960303777146716,0.6107763196013534,0.3985206231050564,-0.2541724087518893,0.1599274269971236,0.3105725586119612,-0.7469051884238129,-0.8234617242355795,0.8566888100869754,-0.596285289394408,-0.0833427164515057,0.7478928698933469,-0.9663748764539131,-0.22501002048581498,0.2941449986042626,0.06036112203933364,0.6328362138256676,0.531667995207032,0.480083366041947,0.1997657440431957,0.012530612983894684,0.25908721065387486,0.9945369256913978,-0.3434428308881121,-0.4104833492413045,-0.988662276801676,-0.3191677398588011,0.9160467550556115,-0.9137304993959567,0.28029756395294525,-0.7416338309359913,-0.8845059464457354,-0.5033268797850083,-0.35782124603464904,-0.8038343985644119,0.5061682008126533,0.45034964734096894,-0.2061027071894621,0.5593137449688093,0.04950394100979638,0.6213660779011114,-0.16205692914312442,0.3022884734845115,-0.36252735848739537,-0.42569462994908003,0.2516865050063286,-0.16737999226361078,0.6600483985410306,-0.2878980806757441,-0.7830943795740377,0.38822740197870287,0.7213474700989262,0.643882618962281,-0.8630880418804168,-0.282309306512567,-0.7833375333578485,0.7488786183954326,-0.19946258679480344,0.3244130919460164,0.40699473105955875,0.6069205064707051,-0.10110608753638228,-0.8304410943660039,-0.5184302322186092,-0.431437939524272,-0.3990193646737832,-0.701606551359709,-0.8506824081380033,0.7438808972674229,0.7264102853955134,-0.8430920846082208,0.597421555279332,-0.9774758913532686,-0.6023446171827662,-0.81181252149067,0.2179449595355587,-0.03625852525343509,0.6828159750434328,-0.9727318150212287,0.002092303285275765,0.47172616969082704,0.8860246843065576,0.5684837122538657,0.180511193541383,0.22677441390777808,-0.7417569755567288,0.7875337539320353,0.8207201689952366,0.5349348599381458,0.33928519720295913,0.1613382433317141,0.31962446244546827,-0.24171016277100676,0.9436749344336253,0.3497216491759656,0.37191625109255044,0.19979678603668116,-0.6901589270925723,-0.31061013532937176,-0.049875011896069577,0.12037899413315278,-0.06262380023370717,-0.5135180799877541,0.019912291327383702,0.20700541699848563,0.9835128889456035,-0.19734923287819273,0.02013799549478934,-0.3108373069008836,-0.994100550138548,-0.8104336369802572,0.6643054079439348,0.40691377813572904,0.5359067628325764,0.23608056597470828,-0.5280373308359048,-0.45762946015319006,-0.3062280962918962,-0.4624772362716536,0.04711530994631996,0.9957159039257006,-0.8262098913248521,-0.8179490562085912,0.09308324804434953,0.24817813182540194,-0.8093615093136086,-0.45150077652116716,-0.662575584275245,-0.04344877758974253,0.24669997015612344,-0.9787678018102834,0.9807102111454413,0.8592478916608477,0.9566620721749586,0.4040177644024432,0.2115034831833209,-0.008398202427581047,0.8190133293676594,0.250587358072929,-0.19917581092841496,-0.6725792852899777,0.04152662606731461,-0.3128317489394741,-0.9396967621876837,-0.7106952883512707,0.9694020938876431,0.7831483638511414,-0.937748959602636,-0.8298004356976367,-0.37494108356689804,0.12737796154073067,-0.18218885769130289,-0.5647266374516766,0.5484676339519097,-0.9777842711247637,0.7154332754990111,-0.07832003871177173,0.2012971223730986,0.7183516373590639,-0.37558591615082637,-0.22892934194225223,0.27847778154774794,-0.2844295362887159,-0.40695746806999233,0.5443479519816754,0.395264110114081,0.39652744473767276,-0.15789749512425466,0.6284334041888489,-0.7729027502177388,-0.951218379660776,-0.6973870454817472,0.9895099872383999,0.9658685092915973,0.38696823974699823,0.29610886528375424,0.4665773287860149,-0.9068084513394825,-0.7587446521074113,-0.7806941790795614,-0.4840770614738181,-0.15471444997180583,-0.7211755561772195,-0.8767841100474327,0.49772263600108646,-0.8095027426922665,0.045650446711263726,-0.839303184815201,0.3348909761662129,-0.2767503151902124,0.6067887159842673,-0.0835165929777193,-0.9899938860667445,-0.558378394230528,0.9100820345124507,-0.9963133161344406,0.5139860968600902,0.984525214060727,-0.664730671994473,0.6889853479138073,0.7793714522360324,-0.7800643310205868,-0.14837273451010402,0.18144307658962155,-0.18771641833812325,0.6168178339366008,0.11022283319036941,-0.21289782107749078,-0.4624531719187863,0.9912024381040689,-0.14639091836819818,0.09880715858555034,0.8924589791468374,0.5919424725359348,-0.8912782870418248,-0.7520552981740347,-0.19302175506193509,-0.9920798696784403,-0.8196462658307335,-0.7551928946004023,0.5926309249468358,0.6580512595248305,-0.3401863829277345,0.9852056523243409,0.5402068344209434,0.6974103374607425,0.06288871317780753,-0.07861250602388337,-0.8753922395935954,-0.4139970534023174,-0.9104304822769698,-0.011121385541633888,0.8819078448892155,-0.9790899923051866,0.3693541101525244,0.988389036798007,-0.09275725246183963,0.8745881162524238,0.36881642546631266,-0.18753376590068305,-0.858593814638307,-0.24386217497514506,0.24943044953864657,0.8834632078496076,0.10887574547133783,-0.8051533314329817,-0.4074847393589809,-0.6230257181807857,0.48096371765978807,0.36080240729304514,0.3481409515858731,-0.818865734800792,0.02605629788427466,-0.882939004689395,0.7290917717237511,-0.635203052511291,0.6747859006907029,0.4996674372585659,0.6478882992153601,-0.4085610254530345,-0.912714843304379,-0.9937971823636733,0.7633022844171222,0.3312864473642074,0.9757267938416208,-0.842004096311042,-0.2803516903118952,0.34044552502825987,0.19726562304753648,-0.1695286223239756,0.20140772655064065,0.8729339744930589,0.3126171644015874,-0.11124992699753378,0.251813420229015,-0.728935209448788,-0.5642577835473355,0.7181024878212323,-0.43712294661484785,0.05210734118650473,-0.7578600964910023,0.09430921990228658,0.6650924748288762,-0.2534759659783994,0.575405297733274,-0.9020893087370947,-0.4832680770745488,-0.45007263185454915,0.7443924064529286,-0.38850551427575253,-0.5598565873449037,-0.7041742434147218,-0.9856863369815079,-0.4412534272302513,-0.7693820831621587,0.8388774219325108,0.008686226341625858,-0.5978308410433204,-0.40876755096194817,0.5335678855464323,-0.08922993980272453,-0.5033525204557341,-0.281371071316745,-0.791717434382841,-0.9906869633565334,-0.19328439114456586,0.3283546189284938,-0.22732252940122954,0.034923900337922476,0.5253819863470479,0.08601686813743248,-0.14404533288010635,0.4732616003759218,0.6064614032071298,0.3058983963224007,-0.6012269838495152,0.5241669413813601,0.4442995533568017,-0.11652856846722148,-0.30139556562413583,-0.7687283397619358,-0.730306762099683,0.8529014204686551,-0.4397007832998683,-0.21774352327933588,-0.13201718145904984,0.339457034943655,-0.7795347832557731,-0.5800116299494231,-0.29618383869108467,-0.6129437407548015,-0.6216572532049414,0.3534461650839642,0.5873575234966668,0.9861516049804919,0.7177461729686221,-0.11447137481001901,-0.8395747729576915,-0.7770728529136699,0.13690742793429012,-0.588694602871815,-0.9052673040416956,-0.8720097325780718,0.31931605839560406,-0.6127179637820932,-0.9009182279709069,0.8491861766352371,0.3731274851324269,0.7773002898154404,-0.2918874568951728,0.39837566915536415,-0.4140127773988116,0.5930460334085161,0.8101862186224262,0.3208479613813484,0.4003467510197898,0.14894373334976585,-0.6933108802329571,0.48480670722699104,-0.0004906225866467828,0.5822122779415588,0.15931566877389214,0.23971623082148552,-0.3585565937286659,0.04081272917799206,-0.2749619122158129,-0.5668901735445289,-0.5759041800864795,-0.05274793423268331,0.4064733381383183,-0.7461098553589194,0.7797578544608887,0.0756998295928546,0.583901642086968,0.7751673696405881,-0.7553540560115639,0.3496336028121294,-0.4981366117244823,-0.21796327314143138,0.4057735970439631,-0.20597635435209272,-0.6990344354235063,0.19691633362731986,-0.10485770008854844,0.8678298606444206,0.9380227841589139,-0.9127412434538296,0.7253735307509528,0.7349041242046628,0.8981672232636093,0.8230575566002951,0.2169974820259064,-0.5279084681771047,0.4541298916704273,-0.9196117346769288,0.5282417845500538,-0.12235634165067122,-0.5365485056095962,0.007061366384407464,0.6158186350871766,-0.8285278075701643,0.7353228778624841,0.09284835645600742,-0.805116888505339,0.4971035506727297,-0.8401721336310954,-0.8990969417762682,0.9911067429100151,0.18836518236045086,-0.1841413213496006,0.9540915494321833,0.5214576297785944,0.7939026943610572,0.15817410772223184,0.4516033710185825,0.8542682038702334,-0.5468491195158509,0.3765681650915216,-0.2661287567768036,0.21361864839930167,0.10249113609567351,0.5719758402586876,0.5215791831811591,0.6377360992705836,-0.5585102836146363,-0.16063742567989703,0.7620140372318263,-0.23141729761512098,0.1958744096400995,-0.4436541334393249,-0.6304281801772409,-0.46401513993600263,0.8979416891526122,0.10160378629573064,0.32013817242632925,-0.6676648087159625,-0.7335684247623093,-0.22732226743758766,0.9583103459217601,0.7534658023445338,0.7662981656757113,-0.5081837856953686,-0.8270021413318096,0.7865889663773213,-0.4089791437984305,0.32969974340256014,-0.96668853397781,0.7486572158894322,0.09683944364268271,-0.9643044154931024,-0.9992497636468882,0.07051301405910726,0.48475905314592227,-0.14558246658892182,0.1662755770117248,0.4345909665684551,0.3355796486729825,0.6528256245226367,-0.9536633901058962,0.6340974977711826,-0.6084854327700748,0.5929006702464346,0.14299934703833594,-0.9273557083047232,-0.9782131294366314,0.486426047603036,-0.7111247535018212,-0.2329951671002699,0.7105904868426829,-0.742906746142824,-0.06661921173628116,0.5916142672855944,0.47831945741642645,-0.006815899476353859,-0.9190066988370105,-0.8863224629963802,0.09782950401271462,0.30456091198156665,-0.6172136089766349,0.7064803126932611,0.17214552148006224,-0.2926301522426842,0.9759699063636038,0.840587296441456,-0.4553098775561981,0.25894284698131687,-0.9918580347933625]}

},{}],137:[function(require,module,exports){
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

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallLarge = require( './fixtures/julia/small_large.json' );
var largeSmall = require( './fixtures/julia/large_small.json' );
var largeLarge = require( './fixtures/julia/large_large.json' );


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

	pdf = factory( 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `v`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `v`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `+infinity` for `v`, the function returns a function which returns `NaN` for any `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( PINF );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `v`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given parameter `v` (when `x` and `v` are small)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	v = smallSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( v[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given parameter `v` (when `x` is large and `v` small)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = largeSmall.expected;
	x = largeSmall.x;
	v = largeSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( v[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given parameter `v` (when `x` is small and `v` large)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = smallLarge.expected;
	x = smallLarge.x;
	v = smallLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( v[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given parameter `v` (when `x` and `v` are large)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = largeLarge.expected;
	x = largeLarge.x;
	v = largeLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( v[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/t/pdf/test/test.factory.js")
},{"./../lib/factory.js":130,"./fixtures/julia/large_large.json":133,"./fixtures/julia/large_small.json":134,"./fixtures/julia/small_large.json":135,"./fixtures/julia/small_small.json":136,"@stdlib/constants/float64/eps":43,"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":70,"tape":292}],138:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/t/pdf/test/test.js")
},{"./../lib":131,"tape":292}],139:[function(require,module,exports){
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

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallLarge = require( './fixtures/julia/small_large.json' );
var largeSmall = require( './fixtures/julia/large_small.json' );
var largeLarge = require( './fixtures/julia/large_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `v`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `v`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `+infinity` for `v`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 0.0, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( PINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `v`, the function always returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given parameter `v` (when `x` and `v` are small)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = smallSmall.expected;
	x = smallSmall.x;
	v = smallSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given parameter `v` (when `x` is large and `v` small)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = largeSmall.expected;
	x = largeSmall.x;
	v = largeSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given parameter `v` (when `x` is small and `v` large)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = smallLarge.expected;
	x = smallLarge.x;
	v = smallLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given parameter `v` (when `x` and `v` are large)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = largeLarge.expected;
	x = largeLarge.x;
	v = largeLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/t/pdf/test/test.pdf.js")
},{"./../lib":131,"./fixtures/julia/large_large.json":133,"./fixtures/julia/large_small.json":134,"./fixtures/julia/small_large.json":135,"./fixtures/julia/small_small.json":136,"@stdlib/constants/float64/eps":43,"@stdlib/constants/float64/ninf":53,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":70,"tape":292}],140:[function(require,module,exports){
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

},{"./is_number.js":143}],141:[function(require,module,exports){
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

},{"./is_number.js":143,"./zero_pad.js":147}],142:[function(require,module,exports){
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

},{"./main.js":145}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{"./format_double.js":140,"./format_integer.js":141,"./is_string.js":144,"./space_pad.js":146,"./zero_pad.js":147}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{"./main.js":149}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"./main.js":152}],151:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"dup":144}],152:[function(require,module,exports){
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

},{"./is_string.js":151,"@stdlib/string/base/format-interpolate":142,"@stdlib/string/base/format-tokenize":148}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":154}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":156}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":158}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":162}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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

},{"./define_property.js":160}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":159,"./has_define_property_support.js":161,"./polyfill.js":163}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":150}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":165,"./polyfill.js":166,"@stdlib/assert/has-tostringtag-support":20}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":167}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":167,"./tostringtag.js":168,"@stdlib/assert/has-own-property":16}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":153}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){

},{}],171:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"dup":170}],172:[function(require,module,exports){
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
},{"base64-js":169,"buffer":172,"ieee754":275}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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
},{"_process":282}],175:[function(require,module,exports){
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

},{"events":173,"inherits":276,"readable-stream/lib/_stream_duplex.js":177,"readable-stream/lib/_stream_passthrough.js":178,"readable-stream/lib/_stream_readable.js":179,"readable-stream/lib/_stream_transform.js":180,"readable-stream/lib/_stream_writable.js":181,"readable-stream/lib/internal/streams/end-of-stream.js":185,"readable-stream/lib/internal/streams/pipeline.js":187}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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
},{"./_stream_readable":179,"./_stream_writable":181,"_process":282,"inherits":276}],178:[function(require,module,exports){
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
},{"./_stream_transform":180,"inherits":276}],179:[function(require,module,exports){
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
},{"../errors":176,"./_stream_duplex":177,"./internal/streams/async_iterator":182,"./internal/streams/buffer_list":183,"./internal/streams/destroy":184,"./internal/streams/from":186,"./internal/streams/state":188,"./internal/streams/stream":189,"_process":282,"buffer":172,"events":173,"inherits":276,"string_decoder/":291,"util":170}],180:[function(require,module,exports){
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
},{"../errors":176,"./_stream_duplex":177,"inherits":276}],181:[function(require,module,exports){
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
},{"../errors":176,"./_stream_duplex":177,"./internal/streams/destroy":184,"./internal/streams/state":188,"./internal/streams/stream":189,"_process":282,"buffer":172,"inherits":276,"util-deprecate":300}],182:[function(require,module,exports){
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
},{"./end-of-stream":185,"_process":282}],183:[function(require,module,exports){
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
},{"buffer":172,"util":170}],184:[function(require,module,exports){
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
},{"_process":282}],185:[function(require,module,exports){
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
},{"../../../errors":176}],186:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],187:[function(require,module,exports){
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
},{"../../../errors":176,"./end-of-stream":185}],188:[function(require,module,exports){
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
},{"../../../errors":176}],189:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":173}],190:[function(require,module,exports){
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

},{"./":191,"get-intrinsic":266}],191:[function(require,module,exports){
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

},{"es-define-property":251,"es-errors/type":257,"function-bind":265,"get-intrinsic":266,"set-function-length":286}],192:[function(require,module,exports){
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

},{"./lib/is_arguments.js":193,"./lib/keys.js":194}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],195:[function(require,module,exports){
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

},{"es-define-property":251,"es-errors/syntax":256,"es-errors/type":257,"gopd":267}],196:[function(require,module,exports){
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

},{"define-data-property":195,"has-property-descriptors":268,"object-keys":280}],197:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],198:[function(require,module,exports){
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

},{"./ToNumber":229,"./ToPrimitive":231,"./Type":236}],199:[function(require,module,exports){
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

},{"../helpers/isFinite":244,"../helpers/isNaN":245,"../helpers/isPrefixOf":246,"./ToNumber":229,"./ToPrimitive":231,"es-errors/type":257,"get-intrinsic":266}],200:[function(require,module,exports){
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

},{"call-bind/callBound":190,"es-errors/type":257}],201:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":259}],202:[function(require,module,exports){
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

},{"./DayWithinYear":205,"./InLeapYear":209,"./MonthFromTime":219,"es-errors/eval":252}],203:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":250,"./floor":240}],204:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":240}],205:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":203,"./DayFromYear":204,"./YearFromTime":238}],206:[function(require,module,exports){
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

},{"./modulo":241}],207:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":248,"./IsAccessorDescriptor":210,"./IsDataDescriptor":212,"es-errors/type":257}],208:[function(require,module,exports){
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

},{"../helpers/timeConstants":250,"./floor":240,"./modulo":241}],209:[function(require,module,exports){
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

},{"./DaysInYear":206,"./YearFromTime":238,"es-errors/eval":252}],210:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":248,"es-errors/type":257,"hasown":274}],211:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":277}],212:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":248,"es-errors/type":257,"hasown":274}],213:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":210,"./IsDataDescriptor":212,"./IsPropertyDescriptor":214,"es-errors/type":257}],214:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":248}],215:[function(require,module,exports){
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

},{"../helpers/isFinite":244,"../helpers/timeConstants":250}],216:[function(require,module,exports){
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

},{"../helpers/isFinite":244,"./DateFromTime":202,"./Day":203,"./MonthFromTime":219,"./ToInteger":228,"./YearFromTime":238,"./floor":240,"./modulo":241,"get-intrinsic":266}],217:[function(require,module,exports){
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

},{"../helpers/isFinite":244,"../helpers/timeConstants":250,"./ToInteger":228}],218:[function(require,module,exports){
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

},{"../helpers/timeConstants":250,"./floor":240,"./modulo":241}],219:[function(require,module,exports){
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

},{"./DayWithinYear":205,"./InLeapYear":209}],220:[function(require,module,exports){
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

},{"../helpers/isNaN":245}],221:[function(require,module,exports){
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

},{"../helpers/timeConstants":250,"./floor":240,"./modulo":241}],222:[function(require,module,exports){
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

},{"./Type":236}],223:[function(require,module,exports){
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


},{"../helpers/isFinite":244,"./ToNumber":229,"./abs":239,"get-intrinsic":266}],224:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":250,"./DayFromYear":204}],225:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":250,"./modulo":241}],226:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],227:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":229}],228:[function(require,module,exports){
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

},{"../helpers/isFinite":244,"../helpers/isNaN":245,"../helpers/sign":249,"./ToNumber":229,"./abs":239,"./floor":240}],229:[function(require,module,exports){
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

},{"./ToPrimitive":231,"call-bind/callBound":190,"safe-regex-test":285}],230:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":260}],231:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":262}],232:[function(require,module,exports){
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

},{"./IsCallable":211,"./ToBoolean":226,"./Type":236,"es-errors/type":257,"hasown":274}],233:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":266}],234:[function(require,module,exports){
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

},{"../helpers/isFinite":244,"../helpers/isNaN":245,"../helpers/sign":249,"./ToNumber":229,"./abs":239,"./floor":240,"./modulo":241}],235:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":229}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":203,"./modulo":241}],238:[function(require,module,exports){
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

},{"call-bind/callBound":190,"get-intrinsic":266}],239:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":266}],240:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],241:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":247}],242:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":250,"./modulo":241}],243:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":198,"./5/AbstractRelationalComparison":199,"./5/Canonicalize":200,"./5/CheckObjectCoercible":201,"./5/DateFromTime":202,"./5/Day":203,"./5/DayFromYear":204,"./5/DayWithinYear":205,"./5/DaysInYear":206,"./5/FromPropertyDescriptor":207,"./5/HourFromTime":208,"./5/InLeapYear":209,"./5/IsAccessorDescriptor":210,"./5/IsCallable":211,"./5/IsDataDescriptor":212,"./5/IsGenericDescriptor":213,"./5/IsPropertyDescriptor":214,"./5/MakeDate":215,"./5/MakeDay":216,"./5/MakeTime":217,"./5/MinFromTime":218,"./5/MonthFromTime":219,"./5/SameValue":220,"./5/SecFromTime":221,"./5/StrictEqualityComparison":222,"./5/TimeClip":223,"./5/TimeFromYear":224,"./5/TimeWithinDay":225,"./5/ToBoolean":226,"./5/ToInt32":227,"./5/ToInteger":228,"./5/ToNumber":229,"./5/ToObject":230,"./5/ToPrimitive":231,"./5/ToPropertyDescriptor":232,"./5/ToString":233,"./5/ToUint16":234,"./5/ToUint32":235,"./5/Type":236,"./5/WeekDay":237,"./5/YearFromTime":238,"./5/abs":239,"./5/floor":240,"./5/modulo":241,"./5/msFromTime":242}],244:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":245}],245:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],246:[function(require,module,exports){
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

},{"call-bind/callBound":190}],247:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],248:[function(require,module,exports){
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

},{"es-errors/type":257,"hasown":274}],249:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],250:[function(require,module,exports){
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

},{}],251:[function(require,module,exports){
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

},{"get-intrinsic":266}],252:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],253:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],254:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],255:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],256:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],257:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],258:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],259:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":257}],260:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":261,"./RequireObjectCoercible":259}],261:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],262:[function(require,module,exports){
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

},{"./helpers/isPrimitive":263,"is-callable":277}],263:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":264}],266:[function(require,module,exports){
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

},{"es-errors":253,"es-errors/eval":252,"es-errors/range":254,"es-errors/ref":255,"es-errors/syntax":256,"es-errors/type":257,"es-errors/uri":258,"function-bind":265,"has-proto":269,"has-symbols":270,"hasown":274}],267:[function(require,module,exports){
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

},{"get-intrinsic":266}],268:[function(require,module,exports){
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

},{"es-define-property":251}],269:[function(require,module,exports){
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

},{}],270:[function(require,module,exports){
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

},{"./shams":271}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":271}],273:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":265}],274:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":265}],275:[function(require,module,exports){
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

},{}],276:[function(require,module,exports){
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

},{}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
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

},{"call-bind/callBound":190,"has-tostringtag/shams":272}],279:[function(require,module,exports){
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

},{"./isArguments":281}],280:[function(require,module,exports){
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

},{"./implementation":279,"./isArguments":281}],281:[function(require,module,exports){
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

},{}],282:[function(require,module,exports){
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

},{}],283:[function(require,module,exports){
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
},{"_process":282,"through":298,"timers":299}],284:[function(require,module,exports){
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

},{"buffer":172}],285:[function(require,module,exports){
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

},{"call-bind/callBound":190,"es-errors/type":257,"is-regex":278}],286:[function(require,module,exports){
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

},{"define-data-property":195,"es-errors/type":257,"get-intrinsic":266,"gopd":267,"has-property-descriptors":268}],287:[function(require,module,exports){
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

},{"es-abstract/es5":243,"function-bind":265}],288:[function(require,module,exports){
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

},{"./implementation":287,"./polyfill":289,"./shim":290,"define-properties":196,"function-bind":265}],289:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":287}],290:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":289,"define-properties":196}],291:[function(require,module,exports){
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
},{"safe-buffer":284}],292:[function(require,module,exports){
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
},{"./lib/default_stream":293,"./lib/results":295,"./lib/test":296,"_process":282,"defined":197,"through":298,"timers":299}],293:[function(require,module,exports){
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
},{"_process":282,"fs":171,"through":298}],294:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":282,"timers":299}],295:[function(require,module,exports){
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
},{"_process":282,"events":173,"function-bind":265,"has":273,"inherits":276,"object-inspect":297,"resumer":283,"through":298,"timers":299}],296:[function(require,module,exports){
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
},{"./next_tick":294,"deep-equal":192,"defined":197,"events":173,"has":273,"inherits":276,"path":174,"string.prototype.trim":288}],297:[function(require,module,exports){
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

},{}],298:[function(require,module,exports){
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
},{"_process":282,"stream":175}],299:[function(require,module,exports){
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
},{"process/browser.js":282,"timers":299}],300:[function(require,module,exports){
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
},{}]},{},[137,138,139]);
