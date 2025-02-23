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

},{"@stdlib/utils/native-class":98}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":98}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":98}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":98}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the cumulative distribution function (CDF) for a uniform distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 0.0, 10.0 );
* var y = logcdf( 0.5 );
* // returns ~-2.996
*
* y = logcdf( 8.0 );
* // returns ~-0.223
*/
function factory( a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the logarithm of the cumulative distribution function (CDF) for a uniform distribution.
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
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a ) {
			return NINF;
		}
		if ( x >= b ) {
			return 0.0;
		}
		return ln( ( x - a ) / ( b - a ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":53,"@stdlib/utils/constant-function":89}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Uniform distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/uniform/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/uniform/logcdf' );
*
* var y = logcdf( 5.0, 0.0, 4.0 );
* // returns 0.0
*
* var mylogcdf = logcdf.factory( 0.0, 10.0 );
* y = mylogcdf( 0.5 );
* // returns ~-2.996
*
* y = mylogcdf( 8.0 );
* // returns ~-0.223
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":65,"./main.js":67,"@stdlib/utils/define-nonenumerable-read-only-property":91}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for a uniform distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 9.0, 0.0, 10.0 );
* // returns ~-0.105
*
* @example
* var y = logcdf( 0.5, 0.0, 2.0 );
* // returns ~-1.386
*
* @example
* var y = logcdf( +Infinity, 2.0, 4.0 );
* // returns 0.0
*
* @example
* var y = logcdf( -Infinity, 2.0, 4.0 );
* // returns -Infinity
*
* @example
* var y = logcdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, 1.0, 0.0 );
* // returns NaN
*/
function logcdf( x, a, b ) {
	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return NaN;
	}
	if ( x < a ) {
		return NINF;
	}
	if ( x >= b ) {
		return 0.0;
	}
	return ln( ( x - a ) / ( b - a ) );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":53}],68:[function(require,module,exports){
module.exports={"expected":[0.0,-1.7860620547157287,0.0,0.0,-0.22879890788225132,0.0,0.0,-1.187067637690717,0.0,-0.4828936462513792,0.0,0.0,0.0,0.0,0.0,-0.04922994638207795,-0.5017403982521226,-0.1441125651551764,0.0,0.0,0.0,0.0,0.0,-2.960173835388569,0.0,-1.2202837668753037,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.32671323911348515,-0.25175964309222787,-2.6665445643717853,0.0,-0.7567638314619045,null,0.0,-2.154867127211519,0.0,0.0,-0.007143861170274576,0.0,-4.418078732210702,-0.06512680976887934,-1.5293621204288976,-0.3878867900533845,null,-1.0807645263887635,0.0,-0.4560397239097961,0.0,0.0,null,0.0,-0.26663674232066603,0.0,0.0,-1.0682484441021873,0.0,-0.402977165141743,0.0,0.0,-0.4753826300433171,-2.5224276870339186,0.0,0.0,-0.15033396106978558,null,-1.0840708883270114,null,0.0,-0.47718318452525765,0.0,-0.677509530307599,null,-0.408580542713564,-0.26913530377964173,-1.3600951389069778,-1.0272016267151232,0.0,-0.14242652692013177,0.0,0.0,0.0,-0.47559770848462934,0.0,0.0,0.0,0.0,0.0,-0.12111921776731359,0.0,-0.08229578220425118,-0.03148234643799517,0.0,-0.09323661913625438,0.0,0.0,0.0,-0.3223516453590239,-1.4042038129000103,0.0,0.0,0.0,-0.5344630094444235,0.0,0.0,0.0,0.0,null,null,0.0,0.0,null,-1.4378749264575363,0.0,0.0,-0.9300524550462506,0.0,-0.6573349863410081,-1.2216072735989705,0.0,0.0,-0.3621537567074559,0.0,-1.9131155932081416,-0.9907941860204548,-1.0155195044931569,-0.5982886504026912,0.0,0.0,0.0,-0.5682844827333038,-1.5783704529339528,0.0,0.0,-0.8035460784940007,0.0,0.0,0.0,0.0,-1.2141217275201202,0.0,null,-0.2732711273841948,0.0,0.0,-0.7741188498984436,0.0,-0.19674657288407546,0.0,-1.7950374957993909,null,-0.06544267555604309,0.0,0.0,0.0,-1.6166542439581608,0.0,0.0,null,null,-0.0913843810139659,0.0,-1.9806996133647177,0.0,0.0,0.0,-0.9236040192719863,0.0,0.0,-0.7991446692060968,0.0,0.0,0.0,-3.5922961454253572,0.0,0.0,null,-0.08398125116064055,0.0,0.0,-0.2857086810537531,0.0,0.0,-0.7027048193165644,0.0,-0.4428794552854065,0.0,-0.17244987646511492,null,-1.9647987080067586,-0.39193874535519835,-3.2645239248551055,0.0,0.0,null,0.0,0.0,0.0,-2.436939455080111,-0.3739128423779463,0.0,-0.6966341649755552,-1.958381102730193,0.0,0.0,-0.8257704289469425,-0.2772291178489134,null,0.0,0.0,-0.5584329943823803,0.0,0.0,0.0,-0.01105948633697201,-2.7625667604827786,-1.0717436357651418,0.0,-0.8754158002654182,-2.3037923492071717,null,-1.0374352060625336,0.0,-1.0413979919862577,0.0,-0.7659852650721101,-0.6174700577245993,-3.896463411921289,-1.007286040140709,-0.38597781386983504,-2.8525509903323636,-0.34468508208498255,0.0,0.0,-1.4314675035017608,0.0,-1.5588084210154134,-2.312475184868492,-0.46132289254272996,-0.913871318229261,0.0,null,0.0,0.0,-0.39099355674823383,-0.5651004904428419,-1.100073559340962,0.0,-0.1302948753306449,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,null,-0.4349660311056851,-0.5486837397305151,-0.13611917796077705,-0.7610724385304617,-1.2928472832006825,0.0,-0.5560056079576933,0.0,0.0,-0.25972581017672264,0.0,null,0.0,-0.7547671415939653,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,-4.377168338448863,0.0,-1.120216624600309,0.0,-0.15214484015877575,-0.1875592757253658,null,-1.8292781395730506,-0.41500179876081567,0.0,0.0,-1.727690277162833,0.0,0.0,-0.693198267911283,0.0,-0.22478732175775873,-1.9119385804557434,-2.033037163933454,0.0,null,-0.07369655224047494,0.0,-1.899871019263616,-0.3899106143456981,-0.20483229488521182,-0.7909165538075824,0.0,0.0,null,-0.10598856586981248,0.0,0.0,0.0,0.0,-0.2606844056911958,-0.6147710441545802,0.0,-0.2835536675909144,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.4590203889042932,-0.005401276527011151,0.0,0.0,null,null,0.0,-0.3824928159247486,0.0,null,-0.3392732983592261,-0.7324476736513191,0.0,0.0,0.0,0.0,-0.5745706458056621,-1.5809065400350593,0.0,0.0,0.0,null,-1.7509455398321323,0.0,0.0,-1.1933453285985824,-0.3955678857456059,0.0,0.0,0.0,-0.41735517500508096,0.0,-1.5594706453281486,0.0,0.0,-1.2164806893602838,-0.10426127402436014,null,0.0,-0.5379650924224957,-0.40685191702388784,0.0,0.0,0.0,0.0,0.0,0.0,null,-0.6530741561801008,0.0,-0.26242302072706863,0.0,-0.6975953641985742,-0.4175625836053572,-2.342120777013275,0.0,-2.544769327245894,0.0,0.0,-0.11850087730047332,0.0,-0.8145735490362245,0.0,null,null,null,0.0,0.0,-2.0588741375261854,-2.8469473141617976,0.0,-5.354217435616288,-1.4366240566920945,-1.8928038376766234,-0.3435000226499874,-0.7557578185475063,-0.4773268727843611,-0.07424780304171771,-2.232793638654311,-0.19034307027285505,-4.404947248670458,null,0.0,-0.03420527797857334,null,null,null,-0.25137547967107415,-0.0976573439864833,-0.2812955767876578,null,-0.028338246022174066,null,-0.029459813838409635,0.0,0.0,0.0,-0.6615188086104247,0.0,-0.786698901784144,0.0,null,-3.0453494100994996,0.0,0.0,-0.3502698146587604,null,-0.1451798660013643,0.0,0.0,0.0,0.0,0.0,0.0,-2.160835605120459,-0.3263192365439869,-0.8897765340947132,0.0,-0.0657573128408755,0.0,0.0,0.0,0.0,0.0,-0.5358431976469958,0.0,null,0.0,-0.6061866393366563,-0.014147244011016764,-0.1915336965301394,-0.4464569421176293,0.0,-0.29574354917173906,null,0.0,-0.6559339402462399,0.0,0.0,-1.7257652976256124,null,-1.7162136597731648,0.0,-0.7351735122284533,-0.41407774121554625,0.0,0.0,-1.7211778650557756,0.0,0.0,-0.24875200384255347,0.0,-2.1961197595558435,-3.556800540111136,0.0,-1.0373763457413419,-0.34311409689466377,-0.16979355195554233,-0.5881500184199339,-0.06753409814341191,-1.492777016667593,-0.35838406121958766,-1.2982420980975775,-0.1440455175249388,-0.14478845265451365,0.0,-0.8410956779920192,-0.374597150676597,null,null,0.0,-4.251619733461729,-0.26734481734103865,0.0,-0.8044484117746361,0.0,-1.3655802948257927,-0.44562334547033267,0.0,0.0,0.0,0.0,-0.8475007965798115,-1.7924037343244381,0.0,0.0,null,0.0,-1.1334183147743444,null,-0.047275798222981065,0.0,0.0,-0.7803386372636203,0.0,0.0,-0.9569968586750713,-1.5798335083286623,0.0,0.0,0.0,null,0.0,-1.2175195875319866,-0.14180412480699284,-0.19716428251791643,0.0,0.0,null,0.0,0.0,-1.200238523132821,0.0,-0.8454491076816766,-0.7155496545864749,null,-1.4514140237464814,0.0,-0.8031188283639217,0.0,-0.10948035009135466,0.0,null,0.0,-1.1302016970735798,null,-0.10153772752833923,null,0.0,0.0,0.0,null,0.0,-0.0265060029026837,null,0.0,0.0,0.0,0.0,-0.2247867952400348,-0.5838926100462565,null,-0.48550933145606834,0.0,-2.538042632406488,0.0,-0.6020965659150557,0.0,0.0,0.0,0.0,-0.6232878275617836,-3.2645139041945526,-1.1663091108224775,0.0,-2.1850754363192864,0.0,-0.3587494048098471,-0.43503203148661984,0.0,0.0,-0.9233977227400556,-0.27368031986988184,0.0,0.0,0.0,-0.912876796524522,0.0,0.0,-0.20369896882050859,null,-0.7259289040016916,-0.01750574851812637,0.0,null,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.8642169430488229,0.0,0.0,-3.1957179426364277,-0.14894234389690542,0.0,-4.374949415379917,-1.0457837247275725,0.0,-0.28118597060942385,null,0.0,0.0,0.0,-1.0043134346279126,0.0,0.0,-1.0539426260450329,null,0.0,0.0,-0.14257337003426662,0.0,-3.898396750349188,-1.2241626829455283,null,-0.03500888292508637,null,-1.7893475999684896,0.0,-0.40295429329487925,0.0,-1.3060294984271237,0.0,-1.7212563042143387,0.0,0.0,0.0,-0.8348623136638339,0.0,0.0,0.0,0.0,0.0,-1.049490316909774,null,null,-0.19154341219513585,-0.32121577799254064,0.0,-1.2317491815372346,0.0,-0.36236497490474634,0.0,0.0,-1.3719572957631294,-0.2002074271341489,0.0,null,0.0,-1.8588164145440706,null,-0.15687863772250063,0.0,0.0,0.0,0.0,0.0,-0.6175131976907886,0.0,-1.0559316933290428,-0.5282520672206642,0.0,0.0,-2.2410427615765545,-0.7047743599397333,0.0,0.0,-4.193093002485957,null,-1.7325549582177802,0.0,-0.08478056201847826,0.0,0.0,null,-2.007781648579287,-0.4849614649053621,-0.3005038121952954,null,0.0,-2.4582899411220978,-0.5478372953876314,0.0,0.0,0.0,0.0,-0.9473702749050128,0.0,-0.24435083549742406,0.0,0.0,null,null,null,0.0,0.0,-4.147065482577019,0.0,0.0,0.0,0.0,-0.01329273713463753,0.0,-2.1977225842283774,0.0,0.0,-0.3148561071027615,0.0,0.0,null,0.0,0.0,0.0,-0.2781177903722395,0.0,-0.17820177973862636,-0.9645684457464752,-1.211403736352355,-0.1069298118672567,0.0,-0.05614107927145822,0.0,0.0,null,-1.1676872498865805,0.0,-0.1101645629611528,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.6941755494084954,0.0,-1.1148753640264852,0.0,null,0.0,-0.23519503764782393,0.0,0.0,null,0.0,-0.7007573374027879,0.0,0.0,-1.0856263005629403,-1.5348198450951327,-1.6435483938058328,0.0,0.0,-0.43159715871815224,0.0,0.0,-0.11200851475456018,-2.106504631605518,0.0,0.0,-0.8318543975986904,-1.1462279724920736,null,0.0,0.0,0.0,0.0,-2.033758961391271,0.0,-1.1024750775591408,-0.001801247566456216,0.0,0.0,-0.12483676352315723,-0.014627212709650618,0.0,0.0,-0.966648171345403,0.0,0.0,-1.957287503752942,0.0,0.0,-0.030614692521885742,0.0,-0.27610479227770296,0.0,null,-0.8895573108144135,-0.2860513662355505,null,-3.589414912794998,-0.8825596171328808,-0.2498004350580617,-0.8266747595851692,null,-0.3980632777212741,0.0,0.0,0.0,-0.11758244186642253,-1.5013734963456278,0.0,0.0,-0.17037355682454047,null,0.0,0.0,0.0,0.0,-0.4258535247086743,-3.3051886393395877,-1.2396833319854972,0.0,0.0,0.0,0.0,0.0,-0.039289862066976274,-0.2052345031280378,-2.38024855686458,0.0,0.0,-0.5080042835409146,0.0,null,0.0,null,0.0,null,-0.5405889186797171,-0.08420939207287323,-1.5332271558368231,0.0,null,-0.8496950869646267,0.0,-0.9875332345086374,0.0,0.0,-2.182288268241638,0.0,null,0.0,0.0,-0.06243941129730012,0.0,-0.7673810888506679,-1.493064207302583,-0.6170987657031604,-3.915813908812639,-0.04930165820738518,-0.047416381191580856,-2.4457711991662827,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,-0.09384108357896455,-0.8075729769397829,null,-0.23462374756317572,0.0,null,-2.4750074058633973,0.0,-0.14753330493072123,-1.176355132056293,null,-0.48208095949538515,0.0,-0.06330865353585209,-0.9955822496736823,0.0,0.0,null,0.0,-1.8185742647308794,0.0,null,null,0.0,0.0,-4.379517416413752,0.0,0.0,0.0,null,-0.6206811482260023,0.0,0.0,0.0,-0.11603182912596742,-1.4822114248598612,0.0,null,0.0,0.0,-1.7227098512491354,-0.45210087208376604,0.0,0.0,0.0,0.0,0.0,0.0,-0.3572165631160118,0.0,-4.969084656251954,0.0,null,null,-0.8825217076152041,0.0,-1.0877327215048531,-1.3154929627292202,-3.8528422710171717,null,0.0,-0.5409745409449009,0.0,0.0,0.0,-0.1340811447868105,-0.2588330583643394,0.0,0.0,-0.8547869807818254,-0.6696973185078707,null,0.0,0.0,0.0,0.0,-0.5092447398074404,0.0,0.0,0.0,null,-0.019912641916374152,0.0,-0.004644637088023507,-2.034714152829334,-0.17369975853008227,-0.3675425731386758,-2.4250391761356433,0.0,-0.9137990796655318,0.0,0.0,-0.7433939676017426,-1.0510759097396494,0.0,0.0,0.0,0.0,-1.8100989380002361,0.0,-0.31741651609525845,0.0,0.0,-1.8935094160426411,null,0.0,0.0,-0.8023139433645834,-1.7332223099181217,0.0],"x":[55.2993539586941,12.310968990064119,44.37668498053063,57.22327046927498,76.5002093507405,96.8862877772149,88.42328155835195,32.541889625356845,62.81777787149893,52.79662392676614,48.12311715862943,82.10980249549462,77.83222091720216,79.09689558451028,74.01666337769251,71.16982379448838,47.81492078325884,63.30013925282532,46.231912716493206,98.23196182870919,94.8286710660905,38.4583404763601,53.65556811600667,16.687280078968136,74.58392356027674,20.52931197625274,84.24644052230195,51.39266283752735,82.03299708938528,52.00385403865584,98.21217137255998,86.66548393854731,57.87324247669328,63.86610618672422,39.83581834194951,11.029286790032454,58.66950502653256,29.00437052042193,0.7605953030606294,40.51659088863193,9.04790101667652,51.77207640891612,76.48479374164496,70.91439261952944,93.89619206627829,12.701326602325814,54.70454462571661,21.02438307628338,36.83746266539647,7.130488289577386,19.995183488210365,54.082878333024745,67.53374103269564,92.61800733734076,81.87752492972015,5.9954452008976755,25.206653252752396,51.96905643218486,58.60606902288037,93.17965570220785,12.93664412748634,71.82575775381275,31.553960213287734,50.7893519140793,41.22267742217747,48.24345453144474,23.23448752403432,54.42251803178726,92.98532348635462,79.18154906176444,14.076763699228746,29.170602962324523,2.6564549883082655,52.27594178978763,31.759905782209618,13.131887534060915,40.98429855078527,11.63926548401648,44.97853340254012,49.01204439958593,33.6973877367603,25.600355591313683,72.8858939924522,79.81409809828392,68.85023503116815,76.76160316497133,48.39324445185864,46.91451053984335,13.259356495263063,67.22293187367323,95.87106976964755,83.65622960413255,95.33285193543513,55.22793237475121,98.9913152885523,56.80666021206786,36.89259255514927,80.52817863459705,81.29163393096282,84.2516659545504,55.40969878064064,87.56170812025714,40.02267376185602,36.15590738294525,77.8885146487533,40.19119581129147,48.17165899598885,53.151360745166286,41.42791896614237,71.1211507778469,50.09628661200474,54.484152694215624,2.703400064585626,4.004220821432214,78.66989154652279,78.31586100333286,16.21437204607792,10.411975156518816,55.70343899396659,99.3627829081222,25.548703427294473,47.65241386777017,55.42470458524531,26.281446038867262,53.36480484621637,45.15793563636193,66.35867262365329,72.19632729077526,24.915177122507124,36.92929523575823,41.32636152247644,41.48256469925278,82.131480927915,98.42921028520337,76.998610497356,47.39190660648922,16.355218712922138,75.30654686486365,72.87438972950466,42.20618091359887,71.66042893172863,82.4704949566281,94.07510690165873,34.361334170551984,40.907791871589616,58.48075315022812,11.6333500990629,77.32826110906721,54.01034269946705,90.94621372097068,38.71819291486271,49.74063424170843,64.95661494571341,56.834002730507805,24.875060936171757,12.566640207516322,29.067471608407725,2.5547530574732136,45.777499485223785,49.917250146250524,22.760041278473686,84.02922003902138,96.18319634369881,8.647906995540344,8.819428213829795,57.56770924619303,59.2578575538782,10.782224010417574,53.01247945203256,92.19681198712864,83.438396713094,38.93788938462428,80.81460229840995,23.53546732914975,43.094753440223265,79.16984722756497,28.389831778940678,76.62984475678675,8.879877328845875,31.19908446429369,82.18080820156746,2.927423063127499,90.35047993695653,84.71430344935051,96.05984674474708,25.08313322118585,67.14565263166814,90.9803620129369,37.96690769209361,97.51113045777558,45.60431557108904,88.71218058315856,68.88793340627262,7.683273912899069,18.263270282831478,19.192663266595478,21.22135122602731,79.19372245361458,38.69969022538269,15.436678692332094,32.62561511122441,44.94739473663329,98.62833538492444,17.345623858814285,41.795863754726966,87.46631170103387,41.474057110073524,18.737407134241924,66.42757491214348,90.28867436515155,39.58546555932789,73.31788941940907,3.3535722381858646,71.15474378636644,73.08060522104569,38.45605486052599,55.714493674712216,92.53433797008242,40.237852621287075,40.47678262606495,8.315130131863736,20.65833045122836,59.30839905713052,18.240511591686758,23.18407732405854,4.72892549984687,27.250458560695524,96.64333637255285,26.57130022832255,80.59375063029914,47.33537045947924,30.734627825012616,15.214832143426271,19.72560983925815,23.89899813887173,20.02587079308369,51.54216357759456,96.55832551062169,80.94721724155691,10.08781553547089,76.28492335647556,24.626946617118172,17.778635608040783,37.55176679394063,36.27250583439836,70.29999198092858,11.813824806624318,18.483791725691056,55.117415272414384,42.72024870541078,37.23811797024241,44.52805361745731,54.07501119009086,47.9491289125203,24.628230360446945,93.24033458278278,15.061428878922257,58.98293332235394,83.94119347321684,70.55000355050795,63.568825855300794,60.074821613580376,1.4547019327724842,55.460867211110276,31.26234819376592,43.055771893217475,25.166213099556735,30.260925768645762,39.89224443562254,25.91625559938646,76.64234104902464,89.13466129070497,51.44499979230544,63.936157574299756,1.7429622774156606,67.89851706789763,52.20835527395244,79.68012511609372,84.70047290060879,26.201876189652506,95.3868001125,87.65341866307803,4.821368822115257,19.491718163051864,57.51039563186726,92.15038932828826,90.19255260903336,18.088797155861492,60.77165155409921,37.569092164840235,67.32662269097038,43.86105144597596,77.01496647365707,3.1999915305989113,23.926718625359644,28.815550019007397,98.51890960830703,77.28107761058078,10.268189823156026,56.513477617740506,64.04418590263312,46.769954343871966,47.8594159896615,46.740340328598215,10.478794108953892,22.57510115663537,57.696082572360766,11.199866877996723,91.17290902130584,37.73109069857705,25.728138576904037,49.142289583056645,20.688431106646753,33.02282530722125,75.16544349496502,99.01581182305266,0.5011006589098255,45.940821755619886,19.79139728961419,30.415789673134384,32.57224816474367,92.85547442805972,21.379686020187428,27.310422396448676,59.60062975505902,65.65604947612972,46.10432820689634,55.59533427048444,67.11188670969723,71.15423840085357,86.93387243248551,54.395395922833686,70.66891262884123,30.85883348289005,88.52912045770867,82.0819134837429,99.32524640099467,2.5866321152604455,5.968719317583782,47.59453146444195,60.46702232311547,83.75643125832272,7.994379660386786,42.0541389006426,54.44263985656317,98.72310302631502,76.17284457321665,47.0100910828698,63.58423401429869,54.96859593720285,9.879464181020413,92.08577707109293,79.45444238779127,33.16909030037376,12.40259354104587,13.498456503116497,72.42655001361402,98.43172845412107,40.228762131505256,67.54208597207254,55.67266036190088,75.90067790404895,73.07133086610212,67.23162640068819,82.47587861627103,21.108340137721584,79.56382939082967,45.46906294991293,22.65398574035369,67.56096600098695,15.599232007306284,65.84069545140943,53.96307782481529,35.458397955040425,60.53946758358346,86.90282468525648,44.89448985607562,96.27003714478887,78.74458368450723,71.1670995011769,5.087554038870201,20.115943224193387,18.055439529198726,30.460935524303668,68.93779763648855,34.7474515244661,44.63662155930965,7.8446812593589765,88.09434635575744,19.896549577792232,89.8979216025641,43.85184196254552,80.21715479681852,66.49362591770742,38.622679772730706,89.67468614034114,4.893806341403817,7.762604292177566,6.087970371486007,68.72624113022232,54.31946411319124,17.26474837450642,17.21340006876877,51.95007892473551,7.3262142068546865,28.63646107827995,12.13330788949989,40.64986289456263,42.44543244637804,28.05432092499547,54.6174813343135,11.446363321644771,45.29563473620273,2.643422380756544,14.223909398219693,44.26604824773905,19.197627789979844,10.170620032056066,3.7899449576770827,6.427373062698338,47.87714602511559,32.408155473221825,27.51258517533921,8.934946165689507,45.85705439063481,8.805646346830741,66.16857967943272,98.12851295006017,77.0751296899703,28.237726235648687,33.24116036773428,90.1329730900004,41.60592444046858,81.41763351401268,6.676759477919991,10.287805348703527,53.99830395497298,52.5482642991425,65.07978749762162,4.146785138303977,20.7147505037101,59.214241630788614,35.82156002457495,43.59880705850547,79.06650070265778,50.775921163013905,86.06044793052445,21.07921671597626,41.039486479789566,40.72009798081029,91.30769311372772,78.42920790012829,89.1277244224417,76.57998375945299,50.87673794980609,59.91411196981296,66.3413719854554,58.05887241483965,35.46237272570989,9.227557262576536,97.929503225287,35.250431308629324,70.18689576544355,64.49185170883412,64.53228444983861,75.14309895887803,43.58706615037753,5.073997429150734,95.26309464127762,24.950244664466624,34.659854065320125,68.85374788373046,28.593261002079107,8.14229065183676,5.026806323101374,91.12481771869419,45.46918711109726,29.292625822855946,17.855575201804786,31.869044002637303,13.75031602169483,63.835358056861494,85.98087097981215,11.301817658341129,54.81686001620017,13.253748971314216,13.690742206736338,62.908219460484084,28.61013316702463,52.88649733319104,60.51826955335056,30.573731814854366,45.79776334328039,26.28381446193615,14.680257885795722,31.953017047686693,74.26928686481651,38.33857201609552,73.23349658670435,28.6818998511124,59.97266572158817,13.701597753330086,6.094162072871789,72.24447688020226,13.32010415895386,42.497716959372276,56.7298720154197,19.605316292922637,91.24790958484546,14.824647692214143,53.925132559495424,60.00138193318809,74.22591917272577,52.542366755180225,91.99083256619036,37.122126920457845,25.773173806383976,80.09543448643657,59.13213061489244,12.416408858709449,62.651907759178705,25.33688990784093,6.625292266027949,79.97432619760386,83.83960351085034,88.43837702863775,37.703257118837044,67.80601024508803,77.77980089596748,35.133658753826126,16.122022904336177,66.13575372395988,72.36361337096353,78.79909842962256,10.35517940087949,91.2618666793054,26.356303728843635,43.02418273441535,47.9945756605364,78.40450933255603,39.02999599422543,3.939335378095965,98.52319021012612,85.29603579651166,25.38889107094684,17.449404799994927,39.800964097306625,36.765595343606996,1.1505151345499565,18.65382794052419,96.21356149752758,47.74842009863076,62.17923743641296,55.3375466034584,40.79124722033658,1.388441843286392,44.54942130917998,26.255325066427826,3.665671684316596,63.24241908551586,11.50189511064279,85.03663813972733,60.15089369176525,53.446843251227705,3.8207671987510627,96.78410982755506,77.68685111777589,10.060309715385763,72.74410164741273,39.831195686887064,84.19329091367713,58.67238245977819,51.92870154729277,56.56654229524128,1.0173275987993113,62.14106631965086,70.39219531961889,10.490557016357016,77.75248349983941,35.49088989819271,97.81203473074255,39.48077285846061,96.45911638341582,98.06946191788582,48.02326195122109,15.66613059022901,36.441029545767975,40.01058460192053,7.481120343634995,56.06909293395104,62.73530115862591,59.530396239364805,44.879677526924496,96.85271555862889,28.12986881866777,55.26969730540352,63.10826469028616,73.47236716494496,60.954339154412686,46.563124394703934,85.61262228592864,87.6832391874776,66.02215385041876,9.891507903741093,38.12632682601858,22.557496531604503,43.38700519156675,2.7132830375470762,95.45053222155622,5.985677804632239,71.9997109385909,83.6680318280479,96.8558209056221,97.73944525745631,86.5498808732867,72.05474040811298,77.1421529750006,13.476336801255284,93.75835233892266,75.04100254161676,6.708269142637824,59.692242960013566,65.33015245127096,5.430169825709186,45.1687475030196,65.81173462713119,19.779804409882097,1.7070680992895104,58.10465563865479,80.69760817614964,93.98755464888657,22.004292276209213,73.9404050240756,56.16130938673187,35.44045862542981,10.6414397018042,38.66120513055169,51.450632794999905,76.88222414233013,88.19424069596624,20.74638663845565,27.751209012684154,17.070593272215916,70.58924433656372,5.407378123622197,18.512640938773785,89.07662679274341,52.292241720322764,61.736142853270046,31.175969120014013,47.32616183015648,12.857261678410659,14.01463671236689,86.50507863787422,71.71058304775005,37.64693749852304,30.52157167423999,70.16319703395123,87.90887153451045,67.23359237367268,86.13183857647356,25.822290609132704,2.515434601366562,2.8312499425358517,73.45018452552878,49.245016738923766,54.7655816266335,30.777005347971674,60.36975471541115,44.210728203855545,55.00018595263503,96.734421414773,12.733978652356658,65.65672685832229,92.60342227232346,14.247641342539708,32.98818400087744,21.27888705567791,2.35522295859536,26.684521179103516,53.59383915986358,55.4318488019464,85.61387373363152,39.05259649359654,84.33040529957626,22.033349849466678,81.79757391350842,26.196035030751563,59.882192567467385,55.16988164090031,54.11142874833963,19.859643485993782,39.768348246800315,80.32572119206354,26.30694622680505,15.326965215903531,4.222660009988122,27.664749503458495,88.87472690365512,72.36092283266314,97.40837594373242,76.89439228192367,3.8073648239045133,29.955907546010828,55.88405770441693,69.45471015568721,6.4821603321676635,42.685319768289595,9.368091084762685,54.767744409683175,47.192234827016556,93.74786767781235,87.39481148865363,56.65361898193299,27.287592980356767,96.69508616878939,33.551136444799276,50.043149719813584,97.54508726271678,14.01950069253406,2.047998430394271,2.367595652299359,71.5617878080329,78.24125271573712,11.944639308890693,22.766304003995263,91.15695680828996,72.68008362555717,54.81239876296187,31.319229762713398,89.08007562136753,4.38050393481153,89.81401835577098,92.21106603143102,68.14502658961585,95.35880896294056,51.70131298990241,2.246045039422695,39.3606619156887,91.68599845640853,98.4712548553282,42.964955984347064,58.476351459762284,68.68360185205762,48.464303527580576,20.586896580107016,66.03647850340523,78.84511670307901,76.25586390939276,75.52886871028674,29.25635671776643,0.4155319320739981,26.74406491773278,98.12773558324848,54.10658577333687,82.33195414359929,81.23532931541722,28.846041819795776,74.97141257674491,37.84497774772244,73.31584055766042,47.08655425222204,15.420690143123306,31.81960193040718,35.324201649593334,99.4152116505171,4.369580710713272,91.90724625260778,38.35327204555834,43.567863250431,69.20212698027832,0.12033118615122351,47.49987400975171,36.58335971789184,38.289084174753604,33.50840211329176,37.3614890116869,19.55721922838254,29.217545896317176,83.96960751076496,59.378310542339264,61.14813968120107,98.53727666204794,84.15557640752354,80.51287232350244,27.86327989975632,96.39388309407512,56.7683357072283,40.927540952123785,27.647236732976445,5.589665173315517,38.254823613321534,82.98651912527212,32.04782819213583,69.31807818169038,29.015546288887318,63.89844023963551,30.319317050756055,76.96448114345338,47.388335195481005,78.4325414924864,69.0703153004641,52.32369127449259,58.8162809589466,78.43946187695134,41.210514854035196,82.94597302264775,39.383964652079825,20.31541839898212,31.069862879104626,98.65618806023812,41.88385635206793,73.26663362208257,52.76495070273695,65.62954028387342,11.774475459603217,26.618561639351412,60.387662772272634,2.891927491399704,13.5170381984145,19.225972593443117,45.07641563112499,25.5064118819567,1.3214160234305883,40.820934817832665,85.91636483452292,86.80066298164246,67.13688594549807,45.302606686382305,19.423727135106738,66.29565056810718,74.79045644018653,34.047533799851834,7.364408774193376,74.49127579015634,17.248359017658153,55.314975288128835,96.59494802154025,54.64175756463072,15.412140933864116,37.42115811854063,94.44626819587694,77.45886778559263,60.084795346956724,97.8233981005606,80.29046827690462,81.361050002759,36.34055684561677,10.164203274239014,88.4928592204901,73.90568864002456,46.20962242926709,73.65748846918471,9.152503625205144,98.65178406319887,10.860707041219108,77.51581511466541,4.633997026885184,36.803914174500484,65.4842828512942,20.509785640929444,98.33076157341429,16.930275359864556,43.02248193026455,67.70717368219206,15.878307733546082,74.91653607373831,81.19448516564456,24.326827443395672,91.22353040603141,0.5859168063454323,79.88303762475117,27.494015328849365,91.73580375643576,45.00514360993826,31.375843882260757,33.804822095957256,47.64887510837647,3.8656189222049164,60.82768847805868,81.63796504119732,25.551080583676168,79.46852701578717,4.098500363434487,85.09702371690524,35.990308548558694,40.99768849470089,80.5453857177576,96.40201420534879,71.4883952109005,59.431469252142264,26.846506910303702,4.1889390838575125,30.72489849200679,70.69426964973866,6.757683058433295,13.708780624915429,98.19271901374536,75.13678058021185,22.821171036703713,3.739188194611387,55.44299090446145,43.37527146666953,78.30728060489764,39.55435804963998,70.45646510775809,83.23236012801914,4.277695977379725,49.75667699893742,16.77023464414016,60.50612478592448,15.828406371036841,4.12656666633151,86.18396178540596,48.72402559047995,1.5200430456078662,59.7932765573606,44.33978659615603,94.60473075374037,5.698952636989829,46.15376413985708,37.14261360783051,51.906874044960524,79.66614006828596,32.428135608915156,8.368526186207026,52.4796728273591,15.802848771298873,43.70906818840452,76.25988694281696,13.415315566592124,51.38062604792098,41.87556242477979,86.88080945352054,65.62109495674218,37.53373751049327,78.22169281479496,70.25795306552011,45.344756475364576,47.289631353987446,4.776436941865048,55.204744127009775,6.812273802244961,1.2145977045848966,28.748906877817305,46.41701467794841,32.25697265429772,14.94945263511951,3.9455163679758876,1.3351210724911855,99.55269439998497,49.83143443216782,68.83089802537405,85.08799848332347,98.30754101413632,66.82133833178641,48.18018023936324,98.72365622370936,69.48564556069434,36.94384246730307,40.700560258959406,12.79950883761234,54.746355745019805,46.08581962613603,60.67768318219948,55.48184869703891,33.07483427399072,57.95709940437463,56.43278547169401,67.54620185698627,2.6002682123370313,60.70369931046786,47.13749345871696,50.60442280902493,12.516817336261333,29.124795487862244,56.22933848199858,11.492151849332966,98.08806398484661,36.883090750369085,46.68257313628936,95.5729231868868,38.21728723405873,44.866149975588044,94.69729610236459,96.4875402477573,55.63667598803927,96.4674330826641,18.041194469807053,78.21030246537684,43.24555864196711,78.4674654799223,90.1380102697365,17.268684925662136,4.295318747546428,94.63303532887619,61.057625079243394,34.648580013992735,15.172453401233653,22.357875062394772],"b":[54.04773615962977,33.46704283596873,40.473712568082895,33.379308022780805,91.10140422198802,65.13182980759505,56.837113840171526,63.41172791980536,45.63088128650708,79.76833107247596,21.63913990197194,24.7419276529725,58.19359588584801,16.91883041428712,11.0717429661175,74.29844099882567,74.09873673155319,72.36747617197854,33.72634353802176,35.69366481020502,76.91989483962391,18.231803603044913,36.47600725179157,88.1470587811102,72.07112454501323,67.99136155163397,76.01535063162007,23.015543700733335,76.21833779122451,22.138900142009454,28.678892627712322,36.07204239530091,17.7039628218106,82.15075212725247,50.58067377308216,83.56996096206463,54.991243207594806,59.74985558494936,31.437301985760087,11.222767363314329,35.472914699361915,33.21293405261453,31.88203257797153,71.41538133155049,8.520979909278843,87.98035471045486,57.134155974375474,65.5945060775894,52.26561998478704,48.806484982453654,57.238173625699055,26.9914009988193,96.61053186114846,72.33399298120337,65.11063037119423,16.283766269025065,6.588831219869191,61.86825023122152,41.2371939402669,18.857949098408238,29.778242848240307,69.15526099792453,38.48378490741307,26.954315298830203,40.6247108114558,66.94692978374863,65.10248519397771,25.148896503370878,61.08871976306472,90.11782732840109,34.93624405529191,80.61426482126214,69.138673284999,24.229265671451824,50.03608772600658,11.66573786083938,76.90680856651319,22.521079362771292,65.81733100313392,59.15784523787977,90.93055838566747,65.08493006300881,67.49620042370915,89.4850807748595,42.45327327369499,42.03449225306539,43.13600452219649,70.41202563409428,4.93540334653118,63.00168012707792,51.205642245670404,77.79180360739504,15.353117893445338,61.59554478439397,52.10162793701022,61.02459200361954,37.90049532746755,57.712557723399875,87.97916390982994,45.49693117979118,37.36941649648083,22.94603558444085,49.95163468957439,87.62640184451811,28.258024491242498,9.350949303931536,24.223522770159462,81.70024224034108,8.129247262060165,24.567940642021693,40.43790451275552,39.17726258502592,35.78987297635889,28.80922637847531,47.0215837509248,45.0115841981286,86.32625804886624,24.248451723784502,22.65956148167639,38.88575289420197,51.041555964435204,43.24670407469395,93.07627863485217,62.209882857459036,12.94582434750627,32.966377999289534,89.81387567206342,30.653851751158257,56.850297242902954,85.36269350502127,79.14120029578272,73.43494892517411,67.74661033489333,86.00549872967422,46.02076180968528,72.65009210045076,74.95242238230468,73.4574793871584,52.38014846847931,85.8623104613858,14.07313196344405,41.6930589373043,65.78565363907667,29.31289443899244,92.48044751019572,41.25199276447944,47.79754638081863,96.00615510709989,44.16054182464709,31.249467014527728,70.94204168561643,32.13758307468485,76.32977292159839,55.092398095680956,77.12434196033954,17.144292371074314,30.582327243661645,1.7757323319337104,17.11331284438164,37.675989870836986,86.08588812470535,71.87344981184728,73.57185454923693,73.169447876978,26.650383435723516,61.452836964587355,48.3622674131464,71.03197146009273,48.17582079376682,38.71657263008926,53.14682412195618,72.55972598629997,16.59265109574424,19.580004804274424,80.51057303516126,53.239825900465256,25.97079884718502,49.918213158097004,35.603503212194354,20.2639534158034,59.95050063567374,43.47247859655728,96.77465683425505,81.46495149493198,14.314259987637236,32.80508259312859,38.38071092668901,36.128210542755845,70.44420998684865,45.110519534627855,70.7637900430783,66.09459159343997,80.9869943775529,20.028090848506977,42.10577543717923,28.233527128790783,81.77144757460978,62.164240442236974,25.872217858138082,98.58060450182535,17.10215644664963,29.31529159686488,66.03956741130094,75.58176600880921,54.99072836170275,43.994634411025274,71.15564813406665,70.85825723933465,37.693131706894455,80.85033664165805,75.58884123136073,91.19993448999823,71.96327602698689,14.174345088874771,53.11525825873889,55.20777216621013,20.120636181348416,70.41843598195449,22.349710731120087,40.76741145819452,45.17802290682915,38.25098260226939,20.638934690145856,43.05810674838333,86.58028791919638,25.69954023561416,60.34676444215129,20.671878611106138,60.510187272285,25.811432974258214,89.25720569499602,55.57247059457648,32.853144710304214,40.28302356288753,33.0345054980653,82.38285536757843,72.01013620007951,52.383235089442884,19.525804546897994,23.16630579232372,33.27296726226926,85.10432338581401,57.14936125582712,57.56989918448518,74.199936073277,43.29395994788965,70.82970611385304,6.370215411821452,48.884903396392176,62.78475930304303,65.1453139243538,93.72333427673604,14.297520019284828,54.25388269508871,9.215178976644879,36.72656054083548,94.22182737878022,53.125547443185326,21.85013228799333,0.1406360060634526,5.413667283564734,26.959829503181652,36.60503011923722,78.86932320722588,54.112049520892896,47.786611936387146,49.668187949997154,85.29127686455081,24.52685959306038,44.769300737466956,31.74303108772344,48.721690269667974,65.16693492672228,48.56992144787357,67.40957895693319,66.09834118976215,90.66376021009124,10.110653525539526,15.3545508718469,17.821868275103604,17.228811496421564,46.776402333822716,55.88749010288118,6.376891527577815,13.745933561398015,12.127759564996929,15.33165768456065,67.44335618883562,55.03229857804451,77.01490122394807,26.608146478662867,47.83996268005948,89.58123654199393,31.14359767570866,60.09351001334718,39.82434154012729,67.35561679342545,30.610698327219712,33.39460377239005,47.91163050145813,48.89483838765494,82.07777700217093,17.461153524286605,54.22147899692175,54.04254252100713,68.12864839948318,48.065462266859235,60.49979802518248,96.7575024619338,31.773992017553432,82.9105265021901,65.25851625454098,24.782013514377574,60.69096165086062,56.02351555840613,39.72488686420135,33.37409083299056,50.58628008601028,7.615181898002961,21.24848285244787,7.569966879694481,86.5129955384653,25.719715835465333,45.598196242546045,8.794491865602904,84.35254171149546,2.942671013173701,47.526133065072344,10.971097515042905,62.26690056671811,60.71789799446387,49.46569181147194,17.107810180954296,77.10651906912794,88.90398418251874,16.558634827999846,19.311863002907938,42.944169072895185,77.4127005751493,24.534283631646193,85.65757876583494,45.84946499540217,85.18629700198862,56.60837128248932,92.96499963031533,65.21253341485686,55.11037108554492,35.08974801588162,31.548217417152188,86.70510710805578,35.8603947683345,83.01843775877356,72.4117490813131,28.70531256017221,60.548014215044866,54.43772828287453,8.9662665933548,68.86415127831515,91.25409685274026,91.46780612277978,34.17758328383711,59.883144604509674,26.065714944946034,93.0228693311823,14.354436175146521,56.750105961892814,27.60308428962938,22.717124825529325,55.5649848602024,73.33683835811978,62.56714304540005,60.7349522042161,86.83009834794926,48.39561771534173,50.522317197914624,32.73809781796555,18.791770716428463,39.26928346555755,73.64295023960693,60.25591455415139,39.67478829370443,31.053041917298,14.659520798730764,38.60125374903055,52.100765555630275,61.51089190431507,59.35938928609988,26.899033346274773,14.949571731522866,91.72023889202502,70.82157296723962,9.801417116455951,88.35575939801186,35.33344665670195,74.72404558479259,71.07720726030755,86.63130915722454,13.100699033395596,53.2025147511224,41.95248106485656,31.520277724516305,48.72019983391901,85.21339586090038,19.350630423613413,69.21104070083398,63.74332024455222,73.707354197391,56.242228427443564,79.43876590346244,38.12648602601327,58.56317555487348,70.85862610757388,52.278052320102645,80.29094551549318,89.63302072932,27.49190987784848,19.57344958856218,96.85832050272136,93.78777888461597,49.97886917808931,59.4958759714449,34.22737826340787,30.498810771864587,24.145571153183322,46.641409122396965,69.5663867691973,68.01517981263142,54.96905062435465,40.28438926780829,6.103725826104922,55.411881997121036,65.48483521457986,75.9395913068254,30.270950270281602,59.44760842977108,44.33072267226177,43.13648513823012,43.03658599830448,88.33251941233975,54.47122276213476,23.48275015186332,24.567394679449745,31.19944773981334,32.7122374819117,57.1100360837791,25.573691559310454,44.570987917164146,82.49584636039455,53.981894486378,73.07399009933349,70.62284215047305,83.28803793021301,23.996874045498522,22.991787447284956,25.3886640875274,39.637926381014225,44.417131239129844,89.07919671663643,27.463966355149946,11.98403327287561,7.852120011522712,48.986475787055156,71.10863159183359,77.43883233048967,90.00910595170829,41.82966427279873,54.780238237015,76.37097227691336,85.04339583371654,33.56126066379699,13.079830039764362,13.01995094852851,86.12748196593382,60.153666765304436,27.143050919011678,34.764711906329765,83.8212339964641,37.006122353983756,17.571040164514567,28.174462171461023,56.08176668173895,25.161871738534668,44.649348237221126,14.117881800082968,28.23252349649216,66.91193376685591,87.4190736143319,29.92771805929577,76.30414296798816,71.32124006189719,70.1944065022098,39.62174769027219,48.428034563072345,77.45395143699449,17.400875721427642,81.30858742808638,84.7918878199084,41.20280105821072,64.79350749640314,58.88871148269034,80.82169677115523,42.13970265388898,21.02748937080275,51.63143389456906,82.88491442221903,53.511283729632545,29.057151102852448,26.672628862998963,30.89350951271346,50.88199091257487,73.72580216277865,46.467984914174366,64.95780794423,36.725889656179376,66.40068343552669,78.66228150534928,84.21914003105681,79.79462848851915,58.00215241053578,24.774726877629508,29.88525642363622,72.91033255593987,13.764623000050022,83.54631583491467,24.27909804782019,46.19335640486487,70.25234324095123,56.07478327853093,22.86137173942323,75.61396916088414,51.37189843292656,15.17105666055623,17.07652953563503,40.891025149738844,26.203885592532828,67.21082614331563,52.03612631207457,48.259186858191946,57.255607073173245,51.32433902982439,16.11388602816611,75.1846406198479,67.78138868009381,60.514259880383975,59.749293285021345,13.953420611236854,70.901224930735,73.41057811170502,92.13983103040789,63.45144926144434,43.78744914942134,88.90561547200886,59.27148948938435,59.46503055794402,29.44276700369649,21.325967631646513,29.700041824758983,70.09115693176707,81.51158488388297,68.06388235422116,66.50923649306027,76.10429614738202,25.952192134966488,50.51626279208346,20.5958369615324,18.799557984498236,79.52255010646886,65.65006365868122,70.80553719632579,24.835310271619974,65.9193339285934,10.596532223756864,61.79736327224641,91.36990497834387,42.47160433828212,89.18224098078021,28.282262749843955,63.12795433242009,55.34227845144813,54.81736358091139,61.73982262096864,16.807086236643187,73.50096318672804,39.09517845185851,84.39768191895519,54.915881353367595,88.87627925586978,23.786456447660314,45.130032878986796,34.615951639939,86.4431989208621,81.25310313989581,24.126951160969803,22.600713895502487,69.69070002824883,68.63952262504915,10.560864795202392,72.69434573525211,25.731557613810242,93.17617604265443,25.02889692109802,59.43651507162857,77.00039573241963,52.55018793842504,62.100105597191444,22.935780772655924,37.17185012437203,64.27742840205455,69.57461124870477,36.934108573238845,44.675890846287274,82.57674959818287,70.14667333082191,29.85594712951826,31.911418176460614,5.740629451301196,18.821222614782766,31.832150259962717,79.82521648860771,16.467909528588862,52.565166885663686,68.73184856893931,55.505773028376055,40.444348802983015,96.24221765013014,58.93151362175638,24.646119235837705,39.54922857156417,29.13402622980914,36.339005895216516,43.92738786638976,32.65277702352521,51.387663873385414,25.22309050339735,79.68832332922615,73.36962372668125,34.19153881248028,37.64918989494579,86.47445215098176,30.864655385689698,61.03360779594479,79.61987009315506,86.39895493777777,72.9417975893742,10.471373564931174,39.11056680909811,77.30869254208872,70.14215927201317,24.366624656935674,61.705013946436694,15.095213147884486,64.86867507525498,6.787546479690092,76.80592962471178,66.90169535076794,68.30055140229194,4.402642819800726,37.583296787504686,57.85748217211164,57.374633995095174,69.39815640284134,67.36306697812108,10.03229527291007,42.93776388232384,86.44062591425339,67.58973362279602,31.6942341048356,77.2521051495003,31.093462013399197,57.59586393732684,52.68241537751768,70.50684570825825,42.0777299726608,79.92186063331202,30.283421768021032,25.45000511694489,26.573574592309285,40.24901555519257,15.270714843416693,29.118914405846095,21.19817922263667,26.398760788300546,18.442476564487592,3.9433450327866737,42.780258939281964,40.43053246295016,42.289688638614344,58.73974315905131,91.80236059395169,34.93755779156186,26.275032748413047,65.46506371117579,68.69246683236055,46.866822714451644,13.99811099822819,91.20812049824728,86.01883994129545,84.88007003086227,52.48876598069189,78.73248018754941,25.839235931746977,24.262022889123998,90.3973024615515,95.55352747318061,82.3161300188847,89.12756244272343,48.78697338878652,16.983969845064124,80.95880897208932,88.27133423543219,32.40883614001332,74.90056084713595,36.662550268125926,43.00325918024327,51.2079062117072,55.290431395118176,42.758177939076354,36.15684206010528,46.67114047085964,71.99375812877075,22.706058280042882,43.44988522764247,70.35679792070924,44.25742003274984,79.75177278463447,19.027031394849114,24.9317997016278,48.60649292225861,24.65582845901235,31.734953111179646,49.992111575767694,34.967810886416764,83.55482274390239,85.46530300541282,88.10680245379326,50.647748427110976,42.00512641886946,10.685522650406213,28.998547871903806,35.9818169225101,29.57950756168063,53.13067118965062,34.90731820405658,80.82844084305583,95.48095833952765,58.392056203260616,73.43465868442998,17.04047252286059,80.18978612081452,60.07371912633022,21.419209199322008,90.08991578919324,48.145005893874725,50.13208151802145,58.663588252658656,72.7185261829358,59.95947915661353,20.053383121668084,26.59581503756117,21.4812943273686,45.7852720819881,40.98108642499796,30.039864750055788,23.090456668013474,83.72695446188752,36.65955913208428,57.2020458002021,37.06484101917495,46.87044619497842,31.305503653805022,53.80609993011293,85.20026230800697,13.179808328102371,56.48963471332205,10.386025283836426,28.919758357628695,85.03988669444607,68.39934441144051,69.88572378197723,61.11643206389688,28.376161375683687,83.58617468637209,86.95665193972226,70.15447080875067,87.73208949781883,94.00434361529221,53.10222102116888,30.722087490917293,81.53604673252373,59.387614332759185,82.47171710786601,33.31468630991129,22.091690382389203,27.605625660498564,65.84221060188207,96.29517084291035,12.600040240216966,52.0664400683649,77.08680833725654,11.29161249912868,29.090986042960886,77.39726804391668,52.95564091978231,16.874085788758876,45.502425305225216,88.36951749508499,27.384128719784012,29.411186656419822,68.76466681431113,8.41099028437033,43.77469972136487,43.08982335757511,48.96966743573944,67.53607746729915,64.76190588898592,42.49167730480153,59.20379451808467,77.33868267368236,48.46105244277108,72.19357180569898,34.95962712125394,52.77028314830661,33.447789747757916,48.34047968840416,52.954008319379795,15.633179742870723,71.04279051918408,27.5477074797428,49.71549626685058,79.90074945006326,12.764321967396398,39.01064777292305,39.133409836914126,83.23931708776921,28.926556406769862,5.466109834046824,23.536173177924177,39.501668403782034,78.24047279674467,75.55630908434296,93.38546575211454,6.48469679168842,35.8502291721998,7.298925379185159,65.88568630902711,24.357113169935204,84.42094370755663,42.48316225987318,58.43627646798924,28.37425488579662,25.578033686764407,70.00644521818191,60.62680520667498,29.110455762410066,66.39234501270049,59.82251853929284,15.588346252460488,84.4511864973543,51.39071303077395,70.95006104604,38.71188845263403,32.680417326216165,29.91210458131752,78.21484230845306,15.001681209581896,35.374502202397096,33.032625180493994,44.250540235359246,66.06681847580269,39.81017917454448,45.2778053363069,57.0495814761137,21.940578281239276,96.40958426038617,20.499906368836964,59.0959331637486,83.41335103677277,74.55569022944508,65.04516061625684,63.624025702401944,84.86101481329308,92.42805511102902,39.62938139362555,80.00930026323775,48.799798057909086,25.096405764261476,27.71456365103157,18.069967208641526,58.26649694504584,22.872703666874898,65.1669641009637,55.55270249465073,28.39092742991474,37.364269492940736,19.598484810086184,20.446077457466544,70.0289788465067,84.19274023658836,84.21513750205045,53.71456505805914,67.57508034810394,84.98585502808693,28.447375308660572,82.19387194399452,74.17228477567781,11.446628514162164,27.69396945632613,10.70628748293338,9.51724427943294,44.875777734114244,19.13255773810957,34.823517827535206,53.41252818713083,23.111343037685906,35.29804590145015,56.030115581447056,16.1440120782526,27.648381022938725,49.01741351232721,19.395259817400166,77.86076750701717,12.407357711848555,9.880788517894956,40.86538174824909,34.5041092129205,32.16411746933638,30.737946456905544,77.72819815565151,31.03775404822791,42.787380108544276,72.98007457478317,78.04077619890914,41.20876948822932,84.7394659407938,11.596082245959183,23.689500844489558,56.82150170863295,49.71219024242215,60.67297538825439,29.711520922236815,67.99972113955131,45.46973916442387,66.58581711849281,48.6938511029139,53.27374492387932,12.689921385582995,61.11132680234115,36.90496741585942,25.441754190299743,76.38800048109243,9.823327417340998,73.92724098729718,54.65054391148483,18.758486483224605,62.97845085559894,76.11229968903872,58.810712391535354,59.31910927774824,16.448324334614956,64.77348212712769,72.66300290446817,30.24465488410318,40.75801270440442,23.561315920077067,18.20354439437713,6.051224127916255,52.80030855296092,43.68242374340852,48.28250637230114,19.263252987382813,36.743122018300056,61.738168767009846,19.98252547653696,50.78914892243782,29.793841716067174,33.79898244359846,79.24154939365175,69.61710656881571,56.63810710719579,69.34818095056525,16.842761851882337,10.26645529997813,79.56541478394013,91.2772294867411,41.56065720949918,27.773640345036416,18.718242500764916,82.33494631933937,62.046070143946565,46.52143104829193,57.093082910433544,72.61433437236062,78.65054832685708,53.17936021842912,51.20912963007484,76.40084794457749,50.24631292256595,71.32094379209926,76.36670661823821,17.41597322110316],"a":[14.454097012278133,8.050710084593472,1.1665875039597795,12.957188916892974,19.705938828677066,9.516847609496688,10.509919474314838,18.9873653239648,12.423560314141895,9.34695770314872,7.333295362493657,3.414788690540078,8.198678291215389,2.141534213747449,9.274260610604772,9.170198613556586,7.47715188345512,4.806518288468036,7.05178851468792,12.197358642057686,19.480708400929608,3.0915319979375733,8.30574419696032,12.782657217187378,7.427383302101123,0.6553222265017622,16.353358838698657,12.545211201408065,12.589454326784676,8.149234584263034,9.589057866024717,9.61074049774016,0.9883318386168671,16.5460658662943,2.3040347509141634,5.6118250089828114,12.262716402950598,1.8288658258699542,12.875894180919047,5.155221896972653,5.58311785028077,2.8404673708254036,6.492334792498502,1.0360265832414495,2.494450354018891,11.782581438282293,18.60030975078618,8.695956027808581,4.2791916886612125,9.970424238696584,0.8661148140891095,5.905734197595116,17.211595631522485,15.55981100754327,0.4618091665431612,12.46062824719218,0.338238669887132,19.57281321951728,2.0149260696596727,9.804605560021518,4.1203341670904825,11.200688972784016,17.59021738071137,11.322073946749942,13.402424212383174,17.512981404332145,19.580703923337946,12.79665900892875,10.669960980754741,11.76617361705636,16.15942293579642,2.8794562545185753,11.466620212278698,17.96680834521492,1.8738444878549343,8.87940239145018,3.911339196622574,12.289906853116683,3.6874589058564755,16.15989940406314,13.938400651148424,3.5817688478010368,12.15101360045503,16.63328934000549,17.443391744130963,6.443591699614237,12.9747505318571,8.329196504337295,1.368113120979535,15.457024509378034,4.3237515166840135,19.738273768792475,8.483892710425023,5.7743870587612545,13.78147792587685,7.633386134335445,5.379044213281063,2.900147488625997,12.857014690028997,12.347241236172897,13.151823673378424,6.210064437379055,13.9192519806118,19.402733299063435,9.341032138313917,5.83287003016753,10.116444535059799,12.744277324037348,7.4833634518126635,4.304776341107761,12.751325376615558,17.206798388361143,13.080398552652714,12.695640870166237,11.16043208027127,6.057442911801978,18.581759322354003,6.10387625123241,1.9533825411840589,13.519735997648752,8.937109064641437,11.526068658323618,14.923591757469579,11.265190709123996,1.831051467005893,17.71705325124909,12.614081063401589,2.402886816373142,19.38448315116631,8.327558976826449,19.850386186861503,2.468816257505333,13.071319378740345,10.836301869485467,16.41207610787137,14.384860105540692,1.1234982138733995,9.77336168216112,18.763791779792008,6.812577642482247,4.612681937156635,17.297142285558394,6.13063354917367,1.4497440640910497,19.122683930004545,11.070874969885672,16.90496697437826,17.893078810338736,6.7228636892730265,3.1534170487332958,11.145342295394066,2.1719846716205993,12.650714935553964,11.60366623421492,14.466216475869524,13.840758789243317,6.668813146386681,1.6787439548257765,8.59654697843884,2.9810048770850095,7.070616556303007,11.004899720324861,12.842017513066164,14.201026106743475,17.44380124788442,16.96655766775477,12.524879418652937,1.1388882910723597,7.586764324172153,6.8917586968960665,15.492396388331011,16.79422596450292,5.789394360341391,3.8094356195344092,12.517234241229676,11.976756762853098,11.601854553820576,16.49356089318452,8.123206441043651,14.671769314285381,4.566311836579251,17.482226982667804,17.022244269552193,1.503022535190106,8.376711129250548,1.7331522417820056,10.877282680602125,19.78949708572354,6.101638990577483,8.241574235450596,0.4496686180808229,5.9516754027487195,4.603806216682198,9.28904584138612,14.375996071787792,0.35152700727145714,18.81548116147385,7.5258432909950645,0.4433684985240838,19.49224987377832,0.03532672997797803,16.858816600087614,16.12373165128004,11.7663701680247,12.694496439321323,6.632739095167208,11.998387301986009,10.175943297081428,14.102105949060565,5.234162723395217,11.537577876344223,17.343554979809493,13.200019236481925,0.04886421460315482,8.109739379977103,16.058654827327274,13.283329858905324,4.9434839956368215,9.400211331338983,14.343137463282073,5.831182937809158,11.497720320865398,5.54900662213937,0.5120491054512,16.14949578090487,15.480954820617194,9.085336890196443,8.555603799273426,8.057581141107057,14.819435941448194,10.916839486797198,1.6583678734703478,14.849104819870025,7.898495149502263,4.505159009679178,16.207770310346596,1.8077329027941946,13.014702756837956,11.359463133514108,5.981327645751562,4.5412459659601545,8.513199357442073,13.45189296870743,3.401092785201456,10.885305849886663,6.379895414350196,12.725380844694518,4.2355772036751915,19.580827207992122,0.7836763067484931,0.499976551314707,19.984250323409434,4.349806694601348,2.6447206441978777,3.093245862455034,4.6561417304952135,18.410121793422817,11.411891647919067,8.755308332447598,0.09739246509933963,3.957800556362936,8.344664645439108,19.63846602133887,12.5025234175645,0.003056817499555997,10.612412973974399,3.684005498813021,9.4408974098422,8.532914712174016,0.5657002660505173,18.624096299621034,7.056266038775063,5.176916296542209,4.27843568846038,3.3184178088658056,11.766970868171907,18.089950549745947,9.433117036419745,14.276239816659452,5.187664379093051,12.74516990647899,15.149892787598258,8.068681223057927,2.819279383758193,10.68550519616219,7.130277980290338,3.841908072721316,17.46097463594841,10.974395603564782,18.471797792509854,10.921463156436296,19.64795160636674,16.102880347452654,10.20736758659929,17.01065322566528,7.4132182951959,18.909839017057948,9.16944477968837,5.270737347906613,19.82821700760305,16.166144682312385,11.465738975424106,15.400761101147346,17.05992520071417,2.9237661811799054,15.711781315647535,12.65501473134902,18.828152503226683,18.15269320836322,14.16868514679435,15.669727919985394,15.344936239591682,2.680352388673146,10.069657217382826,12.130479743387905,11.907744658953415,3.3987818796997837,4.392721672543209,6.443367488988807,13.81640089718899,2.3193427596002403,18.54748435426377,6.806928261333702,5.775966674358535,0.8829486504331507,8.626753998411196,1.7932866936764214,10.390439570993895,8.575313002895735,16.871709071423105,18.129750455402203,7.4103292151029665,3.946613294718744,16.851783391184124,19.313581691865668,8.65273026747214,3.426123425415253,5.850116370685932,11.268117094556116,12.232303478719974,6.4024168168415185,15.085837064183263,11.631358528774784,6.022299067771542,18.779268118814407,2.42531940019004,18.008762926237964,18.4673702064978,13.171823992417423,14.090398267049359,3.1475352616911456,8.072914814025104,13.678729867793301,15.94443553200804,19.598450909528225,4.897853092167677,8.069779789003526,18.37033193119789,18.025453396936413,18.233822264488,3.443563940669989,14.692653269429833,17.13606056302754,17.435963500386897,1.4916203689175767,11.619817073793115,5.131668181230302,5.163021401745143,8.798403820615551,15.00066753859262,17.72492458188229,0.016754685446760398,7.83512374505285,9.69123519656871,14.885179442390886,7.794869846680119,8.809295097028805,14.329680125893645,0.30210097374103295,2.924607824002461,7.736584941989926,8.246352399372597,7.557923185419564,3.3334485866759156,1.4312080201643518,8.220530030693594,16.22835262085177,5.818328778007236,3.2125970408255,13.778839028455923,14.471804102377934,7.21284785122863,15.52640744227483,19.390323211603587,9.930096251522702,8.453104896958209,19.879149520640546,8.484640657421206,9.964645272503866,4.243414575692905,7.190683101828683,12.66407536105277,13.024941392612973,17.100356800893735,7.032222298322237,17.687708060605747,1.2119625967625458,2.607970791816907,9.68548596933962,11.59008358874376,3.423682115855593,4.310511938310038,11.992826181944585,1.6830897927198052,19.83866458701625,1.6540233986222752,8.397221600859975,18.49888739425445,18.044111232953153,16.130863538686274,7.222760584276511,14.674331496505317,18.319818428796403,17.92950833633806,18.56907044651217,18.355064439809205,4.405343647378919,12.252517536819422,0.3622546984198083,5.22351055257805,9.59827036701916,19.597435291564395,12.902080075834302,6.568853286457426,7.70314899472444,8.5871368194891,14.144369443724374,1.046867775134932,9.643609164909606,10.273730492733787,2.9992717096947086,1.2261136258530358,15.830337291338946,11.247237978382536,8.09654816125596,11.212767571285571,16.78764106377759,13.080579114767076,7.49756801123822,18.167318007476247,13.867615782600549,6.941662167392719,10.799109930298298,8.457710936634072,16.545238741424264,11.172416722502309,16.401214560573642,14.299774298940836,18.108649711862043,9.710098965967045,3.930259840145962,18.769021240615473,5.493646100332974,3.1624600937825376,19.26151682710925,0.5633657580366336,11.06063321820439,8.726489882363385,5.081570675680851,15.660534772167992,0.9261550006492225,11.257110198556223,16.131383161728717,11.987667639933752,0.18039123602068052,17.663359709184476,10.149149329315454,14.255829880618052,6.430641360154126,17.889301337887602,4.530007821920314,14.893276218580255,13.109592711809718,1.330765034134176,3.4734485384562452,6.538133508324977,11.525501688083018,5.6039097211249045,2.430580609373987,7.850064954808413,8.231833162422056,19.272952549554077,8.150790825762865,11.449459294806656,8.36814084489843,13.418164536250003,6.353792960446634,19.953974791947232,0.3760939991573675,5.778976226448691,14.090659275540759,17.337321067782305,15.175563225437955,5.285114830962598,12.315109091982347,6.563312803559791,14.856011265530444,13.884941034688985,6.696593017618331,2.467761869637064,18.658940986609558,12.945559421241018,16.535917136383844,0.2777353208163502,7.366436573525226,5.978072551825653,14.093013614415547,17.51012913441757,3.7758393924071276,18.622785134810155,1.9899028091675408,2.7501622936155634,7.028858756250713,6.18983822766221,6.365559312560487,19.90491871670369,10.170876805577883,12.728999309594897,17.79764620742742,9.894432392639896,6.976063934366099,1.8680907892239684,11.72117531331494,5.301920817619781,17.043992640054853,10.334459332980117,15.561003523477641,8.662693578232954,5.501886311021642,16.435787205039535,8.55159760541785,9.382589465490447,4.956961467825773,17.305184950827922,10.584173145976488,8.386837753097009,16.40012928868977,1.7090454536072208,12.599026128764304,4.950674684291578,19.26624039058574,14.354964245680556,2.6549245849799785,19.662956742570913,19.070682957510847,3.6241341617186373,17.60956776530191,5.3440860895526265,8.56237808216925,18.12790981721873,18.773921836595562,4.0551574530041545,3.4687709498911534,8.745942131061355,16.816939589038622,15.28394694203226,9.344674138712715,15.685075464356881,5.522074856331924,12.260149784320022,9.09347627963915,8.91682725078105,12.776006241239566,12.678556657890706,11.143654449697973,18.87535736146087,8.823379542066125,5.974215941266365,7.956148187571808,12.09160728105465,14.417601117166967,15.778213316122995,5.4451053005332195,18.440761187202824,5.974336803642082,14.106582547386717,12.71598771456775,1.5428074206961817,2.7101927823814176,7.948751703174111,7.797157451100358,19.673136049974033,9.43403499745287,0.8665460152580717,0.7481394421807108,12.798089135483096,1.634878243834681,6.987218967004787,9.171960982853399,15.31023424937688,3.3462896321062807,16.1625722043646,17.430608684510723,18.21420541335321,15.650556527297041,1.136942780914536,7.423595691894307,5.870909810878788,15.64079319442913,18.18242449901932,1.1116786101827536,11.490422875317318,5.297863042429918,7.278437027295435,3.956914249389656,3.671895491686854,7.080181539814832,0.10863996701341527,1.818215896836266,10.804923655202021,4.7508901518960345,3.407909882231377,17.82811989719238,4.983764364113297,17.496066655955676,15.347733264871009,4.792690825407706,16.059155539582875,8.637417367092791,11.406920225316114,6.5546591033848145,15.849213640885038,0.4329463063296002,5.6904231631339375,11.76507871183766,19.276268523945568,7.378304357452143,12.042157379139846,14.285170182136016,11.782867791997237,19.912684999687716,6.1511191303763235,17.52158423572846,4.559905424397677,7.5918607716554165,14.38111252561447,14.166683046896239,16.321801134038523,8.048346961167603,19.833154184406865,13.642182469144043,1.5296211927455383,5.116172688049629,4.458938121735576,2.156848642801177,14.148516054730148,2.349562503357636,13.07265459162307,0.06615396701628917,10.567943023843789,16.98550620957658,3.4427579997688795,3.1787737449953335,16.10004814568681,11.918350490581066,0.8169056178918277,14.970144823447331,11.62953764396217,5.974916416950955,13.561714599207964,14.221119696123893,13.987414467895167,2.7634912996434124,1.2996826569754205,19.895134729800745,17.945155412785457,3.946130478115113,17.776367787867894,6.205796904584924,12.352220842452741,18.271489888348547,13.273285475101506,13.820105980601639,0.39031723037442845,13.817730783879298,0.4988236108381505,12.080608591775114,8.836170564801895,14.017594423015547,3.0025056583677534,17.06060342187215,14.43244997343292,11.505304392298425,10.101604565282578,5.538639358820339,14.163631198432768,13.837441304217784,15.373817503228482,12.460449926296908,0.34817518810519754,6.2460094063411775,1.4473695470027792,18.637969619141902,19.780653286246594,13.532597663720942,13.33299690128543,19.81680509299039,0.6989340585808623,2.667859670991204,8.84149771010641,10.993867447931262,1.1259415931577088,12.924611828262758,17.04712860359659,12.137787987445527,16.756350617397647,0.28776547874340697,11.469381696569734,13.464756230201314,19.847097276729848,10.539219526884667,17.447819824415216,4.88269820750634,8.581115724667265,10.855335277677568,13.752289999686855,10.731066882320572,4.794159187613372,4.152015561152784,0.2521579409341479,19.12270839108769,0.5592319962726489,11.57807900631668,12.359717380712496,14.203342420583285,12.22209657553249,7.947880242755994,7.366828039864335,18.890150178746595,3.2084974924512055,3.2575959463493387,11.260677603219662,18.375257449536804,6.4235884357036666,19.507012659723145,4.555502336026485,0.4824021292941394,9.218542763525592,8.132341189458089,8.406315634722446,6.297247156247985,12.13015412151558,17.080275440444176,15.373130775733589,14.977848959575454,17.970934199089466,5.222449545834853,10.840167193086451,5.818618272251896,8.485207997669587,10.937976373007597,7.104488363754027,0.8315370313040971,17.426395062090428,11.703748060448959,15.675503627369839,14.290016330057732,7.065165227833519,6.231840561966782,5.095008714697897,4.803419445719066,14.494400221294272,2.2983108330920565,16.976643492637244,7.706805397574827,3.0590375670930614,13.051823984567328,6.140856982423042,19.473151327964114,1.4719628323856204,9.06984761768574,19.574260414200868,9.02070510956734,14.045851406603997,19.602714281683088,18.701783773959285,1.101684530112883,16.27221302493791,9.631860216336658,12.858838204416854,11.368329536777022,0.04856973473497561,10.519041186333947,18.703324832795904,17.916542498407118,18.887284597331252,4.11412660102767,19.508516440713688,9.113143896305097,7.015942437464284,9.949354095691213,6.444459849780304,9.435200201186005,5.536765464378193,17.609428625928544,12.262935716446481,7.164190606827803,6.5963782823879,12.34691817494205,6.302473933283759,15.078599624437764,3.0919906278974185,19.49728064053454,6.3128173180622715,18.184598577521026,16.957440644641135,3.8960693534008906,9.200993472329987,8.24087431213712,11.85070104508863,8.123091901128152,17.963298241597947,19.32974277691833,16.56431060615535,16.005789629838233,6.7586265197825535,19.21421028301726,16.168494044685474,9.935646913615868,2.0843800645460364,7.568698684027919,8.093935171661801,6.666975720262656,17.712484753898377,17.26878546473864,4.389676723499898,10.433315960143524,6.625811211626438,10.191070218999968,13.121255882188304,14.620642203914812,0.5201759490484781,18.822355275829675,0.22490245766279227,10.528202053430187,16.437343028256507,5.000997710809645,9.377185270293499,5.24229290177145,17.046524841268006,18.082585804773824,10.261188689550508,1.8561834599984683,14.135369621372416,6.091367390928393,13.161952247067967,1.4409803197849325,13.713024659146908,16.460207354789468,3.271830355883081,15.499716993251717,1.3239326166939724,18.480347732294046,16.73860861644473,0.8358187407993611,4.305146111349538,15.91089918035259,12.531761334239793,19.02083263502721,19.376950824684904,10.51439944814538,4.346756341851035,2.8671319495321335,19.19532452758673,19.63012361986972,7.357413132173947,19.428507581266427,16.125184488660473,2.621877105226158,5.49544043353285,15.263415552982984,19.205682688110105,0.5723084079885865,17.77683253034563,2.011847823211874,5.833742469290835,19.68588525928499,17.143604755168734,9.450696426397025,7.733264893252096,1.1351403380938363,3.7421642984086922,19.867742911136283,5.616940419775758,4.53034839152028,10.950201383542947,8.53314575364228,5.2584728281368465,18.030097860432,9.045061683671474,8.32087690499231,7.750201095288687,12.805608802505777,18.83891843470181,19.266053331739492,9.380012672494619,19.098938947369057,4.7913976883504406,1.6772367071294925,11.326657709336905,6.306046341106439,19.953267358547414,7.0063681145830525,14.633853258064748,16.597920219820395,0.8282865911926862,3.5775942279868467,3.0988429290784625,17.494568783759092,14.146377976330605,9.29349965371124,3.2666215026618595,2.249791441854363,17.869259328315756,15.554638697803265,1.3753168558026463,4.895644179370691,19.875625583155628,18.553317941677534,5.888597150714632,0.4655603341470149,4.7402101574861355,2.1698389352740044,4.845822668940869,1.0523707150901362,17.27540671625986,16.62527580000598,9.078236873249054,9.643384961738164,11.463149046196456,4.333991552275078,14.867964323926678,8.746575875929148,11.466155063311025,11.441169618803908,6.102009265182136,17.591766107569555,6.897074354614299,3.4794916624832517,4.082639820694189,1.586197461515657,16.25685149777414,12.275894341584648,3.2688063315181326,16.317049880420278,2.069466974861358,12.195409001975834,13.591068213234184,13.862067045843215,16.34262502361976,7.184511283338697,16.339560807712616,1.3697152665694512,3.2758604440006645,5.784441946994772,2.7158698332729347,3.3693131519257458,17.314293885101364,12.19441479252724,8.408149779246452,19.717463128240965,9.268830324785293,5.436960077009894,10.924798948792823,9.918793976347843,4.484687612610214,4.4211873525297785,5.850416039496729,9.857250321469184,15.14955561301003,4.230188999587594,1.1911852064089246,0.7323952686469326,19.923710354724662,16.0838905805149,11.818530820992898,9.781104711455772,3.4053514474452706,9.431445337395058,5.868238593789257,6.1779276298302,18.764135686693706,8.67650981629518,10.90452244532238,11.427142073928508,16.44306318441719,17.344414945815387,4.850527606410258,2.037423745679896,17.330948041962348]}

},{}],69:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,-2.133345191889622,-1.9683472398795676,0.0,0.0,0.0,0.0,0.0,0.0,-0.05036786979480658,0.0,0.0,0.0,0.0,0.0,0.0,-0.4650276970016083,0.0,0.0,-4.37564554523315,-1.765561594181559,-0.008485471051836103,null,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,-5.290233359113722,-0.46424928223373974,0.0,0.0,0.0,-0.058976025690203784,0.0,0.0,-0.1644282763248745,-1.049338824975749,0.0,0.0,-0.3550510255158379,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.2300985493955265,0.0,-0.027038597290640832,0.0,0.0,-1.0187972254655981,-0.5754435948124565,0.0,-2.609438376011224,0.0,0.0,0.0,-0.6238693979977054,-0.3280063853642006,0.0,0.0,-1.271909733592735,0.0,0.0,0.0,0.0,0.0,-0.4472001131941822,0.0,0.0,0.0,-0.6844451833054435,0.0,0.0,0.0,0.0,null,0.0,-0.7535487365969761,null,null,0.0,0.0,-0.4827753130872129,0.0,0.0,0.0,0.0,-1.4640437811436064,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,null,null,0.0,0.0,-0.22893843221923765,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.2362414539937337,0.0,-0.48813682475449593,-0.3847263123819775,0.0,0.0,0.0,0.0,0.0,null,0.0,-0.3587009679678135,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4971682440775207,null,0.0,-1.3003497142309315,-1.0829855749175685,0.0,-0.8448554522571037,0.0,0.0,0.0,null,0.0,null,0.0,0.0,-0.7493640200744455,-0.10651340185837427,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,null,0.0,0.0,0.0,-0.5247230119527457,0.0,-0.2786665773602134,null,0.0,-0.0034786807529312647,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-2.764838855098416,-0.5899763336288225,0.0,0.0,0.0,0.0,0.0,-3.4135076726290876,-0.7063823337225313,0.0,0.0,0.0,-0.09337750482526778,0.0,-0.1429317084876037,0.0,0.0,0.0,null,0.0,-1.1676789678767383,-0.6634103131720178,0.0,-0.032768822047078164,null,0.0,null,0.0,null,0.0,-0.9277213447130195,-0.8943889930362917,0.0,null,-0.6123115079725839,0.0,-0.8914011007012856,0.0,null,null,-0.5236867679195044,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5433655324984965,0.0,0.0,0.0,0.0,0.0,0.0,-4.1116238528057245,0.0,0.0,0.0,-0.8331970699691837,-1.1432437593696525,0.0,-1.397551797588789,0.0,0.0,0.0,-0.9728763543605583,0.0,-1.563176532209626,0.0,0.0,0.0,-0.19520373673310285,-0.2782423153186135,0.0,0.0,-2.0647044299737143,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,-0.8408693477481186,0.0,0.0,null,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.6774249909793064,0.0,0.0,0.0,0.0,0.0,null,0.0,-0.20907229949147027,null,null,null,null,null,-0.43570289644812893,-1.5571576795158941,-0.9720188928381307,-0.4041284542884471,0.0,0.0,-1.0512876617909863,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.3993732987445109,0.0,0.0,-1.6019084905790966,0.0,0.0,-1.1423943325986765,0.0,null,-0.4817932680597584,0.0,0.0,0.0,0.0,-1.663480369687326,0.0,0.0,-2.6974979533004415,0.0,-1.9679843721190509,null,0.0,0.0,0.0,-0.7182002208534213,0.0,0.0,-0.15310090380679472,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.2590942001026497,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-2.603584671354712,0.0,0.0,-0.8666347743390457,0.0,-0.22589822589752967,0.0,null,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,null,0.0,-0.16629646028094885,0.0,0.0,0.0,-0.7746755378890565,-0.4028388328629761,-1.8314559832933894,0.0,0.0,0.0,0.0,0.0,0.0,null,-4.117292599765761,0.0,0.0,0.0,-0.4785613169138807,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-6.178696884984679,-0.348132561498838,null,null,0.0,0.0,0.0,-2.192958305543451,0.0,0.0,-0.8345090318526437,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,-0.067343313240955,-3.7496349030738485,0.0,0.0,0.0,0.0,0.0,0.0,-0.04011047887993595,-0.2749799469703213,0.0,-0.23678873716654278,0.0,0.0,null,-1.1787895843777756,0.0,0.0,null,-0.05503570134105709,null,0.0,0.0,null,0.0,0.0,-0.49763370473506274,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.387749189900808,0.0,-1.7261935177014156,-0.08006422281531868,-0.41985001529539945,0.0,0.0,0.0,0.0,-0.13779224374789947,0.0,-0.7093541627482434,0.0,0.0,0.0,0.0,null,0.0,0.0,-1.0647860778137486,-1.068206460786825,0.0,0.0,0.0,0.0,-3.472448006266883,0.0,0.0,null,0.0,-3.007590064428359,0.0,null,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,-1.8637925798429318,0.0,-3.205198251145731,-0.1949513805706384,null,-2.7097770410550357,0.0,0.0,-1.2408731239987503,0.0,0.0,0.0,0.0,null,0.0,-0.0554261816461615,0.0,0.0,-0.316086380615507,0.0,0.0,0.0,-2.6565032064289524,-1.3691673231459183,-0.35859882766811235,0.0,0.0,null,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,-0.8257619526117005,null,null,0.0,0.0,-0.3865575557873064,0.0,0.0,-1.5395247058518184,0.0,0.0,0.0,0.0,0.0,-0.8545800834431562,0.0,0.0,0.0,0.0,null,null,0.0,-0.04713495751817523,-1.2931190943899125,0.0,-0.8346093575693064,null,-0.011922312981146944,0.0,null,0.0,null,null,-1.1072139570129416,0.0,0.0,-0.28405476257916734,0.0,0.0,-2.211457820323748,-0.09049932661009717,0.0,null,0.0,null,0.0,0.0,0.0,0.0,-0.3752851106760985,0.0,0.0,0.0,0.0,-0.5905096860369535,0.0,0.0,-0.4363870842342063,null,0.0,-0.8540529155886949,null,-1.7622643200492358,0.0,-1.1990058737283622,-0.36314222342608793,0.0,0.0,0.0,0.0,-0.8655985213413718,0.0,-0.17611859098509935,0.0,-3.233716338960054,0.0,0.0,0.0,0.0,0.0,-1.4211139546445315,0.0,0.0,0.0,0.0,0.0,-0.21086743212018455,0.0,0.0,-1.3287296711585792,-0.431328344487967,0.0,-0.2620846764121935,0.0,-2.0553616462814777,0.0,0.0,0.0,-0.37658350517196104,null,0.0,0.0,null,0.0,null,-0.4921739924425156,-0.2952094355094421,0.0,-0.7112478127994873,-0.70128242666875,0.0,0.0,-1.370007417930713,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.36280313071372244,0.0,null,0.0,-1.9031547415705077,0.0,-1.2629236707251477,0.0,0.0,0.0,null,0.0,null,0.0,-1.5854700707307445,0.0,0.0,0.0,0.0,0.0,null,0.0,null,null,0.0,0.0,0.0,-2.4004069833745305,0.0,0.0,0.0,0.0,0.0,-0.3894652298661759,0.0,0.0,0.0,0.0,0.0,null,0.0,null,0.0,0.0,-0.2275353316940148,null,0.0,0.0,-1.5423128039045702,0.0,0.0,0.0,null,-3.9844007999216604,0.0,-1.4886249220506438,0.0,0.0,0.0,0.0,-2.768356081738068,0.0,0.0,0.0,0.0,0.0,0.0,-0.13977191086097146,0.0,0.0,null,0.0,0.0,-0.2389589637122697,0.0,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,null,null,0.0,0.0,-0.9905816766786096,null,null,-4.7650174683974456,-2.2928566693614387,-3.508404206996227,null,0.0,0.0,0.0,0.0,0.0,-0.9616985150629884,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,-1.0929558174689578,-0.38409861448041377,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,-0.06226042237270728,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.883019133184737,0.0,0.0,0.0,0.0,null,0.0,null,0.0,0.0,0.0,-0.7025561483339914,0.0,-0.7400948713098999,-3.0796596130623746,null,0.0,0.0,0.0,-0.0790821463910406,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,-0.7079587444794805,0.0,-0.9770995019324843,null,0.0,-0.47893659317331605,0.0,0.0,-2.454190134370533,null,0.0,-1.6512831757474145,0.0,0.0,0.0,null,0.0,-2.0484664175506047,0.0,null,0.0,0.0,-0.3064647437936829,-0.7037539331308516,-0.4339610388174213,0.0,0.0,null,null,0.0,-1.3180172345383412,-1.4800956209656504,0.0,0.0,null,0.0,-1.4444569883076441,0.0,0.0,0.0,0.0,0.0,-1.8729851554418993,-1.0929114854695658,-0.21408684588805665,0.0,0.0,0.0,0.0,0.0,-1.5864246961344097,0.0,0.0,-2.005260499595649,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-2.5503700989487097,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.6863246239244325,null,null,0.0,0.0,0.0,-0.3379640421950382,-0.17734784115720117,0.0,0.0,0.0,0.0,-0.22487652518114978,0.0,-0.9800787729677576,0.0,0.0,-1.9780550298141066,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.33280653104921176,0.0,0.0,-0.14284437858865234,0.0,-0.9510506492463338,0.0,0.0,0.0,-0.349267153933244],"x":[59.5488809831106,38.80683158290288,8.846706677340975,17.33019039480006,48.81613754947516,36.82151375293054,50.11964726726761,81.5089664305721,30.274418073969645,73.66848122583536,32.476223045440754,77.44061083948002,48.61464163401315,92.13147823592067,81.79506216555296,91.04650042783713,94.48873649848642,31.234436385171204,69.05550446624329,68.33325448426541,6.788643718937748,9.556839194478028,52.423477348385326,11.386346573794338,53.88615586916148,1.6720894676865106,63.16552085068214,91.3397057834189,77.48889853615609,81.44952528131091,41.520644712101614,68.52198932592334,69.05774886724939,0.1507775682707324,99.69890684823537,11.880183577366887,20.129398807997113,82.04927207887758,98.09654135728385,53.95349942554739,58.43526827250622,81.81909249679768,10.41600347101328,17.588203844787987,89.78120639853526,44.18391897429843,25.43420024390093,31.08305020231952,93.0695608615082,78.84756525126278,41.17746094225059,26.296943033160282,60.49307959456105,79.02555256008121,15.281440679829705,45.60929782361165,21.792081125850558,1.4327501370267282,73.17841551378095,0.2663399573680447,81.15116375760998,44.28718473092306,50.35209269004206,68.11886079402005,72.82448170433015,48.66771738650817,94.0426077316118,94.86964879539256,35.366014187583716,55.604490527738236,73.69341777044684,60.18809609455411,56.43111774933543,27.16787545681192,85.23127287988525,54.02319406582008,67.30447821697125,90.82971901841891,16.850061100329583,40.17165833154868,67.30548079794832,3.4854811609349,95.93929010624103,27.369782444373737,96.80239864130328,7.879126422403004,22.827246458517326,96.46069322446098,43.44291719631601,2.7398536444678934,89.77354692983519,46.91138118894984,52.25887016609714,54.89187032993335,74.86882489287987,33.74921219507072,70.40689271792434,72.22756711039429,22.72880524050582,21.036245506206285,62.93129061974234,47.461154690200225,30.08476070399686,75.56908890962816,13.62949471644943,54.013319288350004,27.424514318908667,7.993450019537818,10.499123461525727,86.35955714687984,75.08032378289506,17.655265878307723,51.121739225343774,24.037791918611106,64.70500453691166,74.75162373053033,16.1202419420446,51.6916767537885,93.64896977830475,79.6169297596113,48.138979775460975,72.05289303246374,45.61575296151557,98.5133191961935,69.26361226136366,3.6410562969356963,75.01556494076556,91.66397503907663,28.400799197109492,90.58395379304245,9.664276434116736,3.6828432903559305,94.36751095373094,30.176803477214655,32.19668831341755,40.480664371663465,91.28939339688758,80.02256017654695,88.79838807617404,96.39045358574383,94.43779278374689,69.87540075769267,34.425852887994154,57.987123520378624,17.47930892146432,13.529115882572661,98.68547644477998,98.27210756226012,42.59088030235214,70.8049436281763,61.67933367135268,11.365051221407185,40.0117916246989,30.453573845094816,75.84019888360199,44.389897249361354,68.26686584050394,47.941141761844804,92.41560043497219,76.12235915744347,75.15038910114684,27.383092392812625,86.31920723011872,38.49704313048174,6.7305094755790495,38.30934523129797,8.718757209879758,30.223552491839566,85.48292423161796,21.268809041552572,90.9275723637422,77.41203873052886,43.80489720964975,14.14619413203091,20.78467902307224,15.77741996003914,49.05695268414865,78.70269018561433,34.88583515528214,33.420032076028306,27.435020106114848,17.077261659387833,57.92553139635823,56.936427850875646,59.72880813725527,96.43726579732792,6.337679122804074,87.51667194688038,79.82256655963096,16.605313741484284,29.148878715336647,66.31365235196832,68.4124442332833,28.150894176072438,96.11133549946808,29.132950254714608,18.049224543029794,69.8214927488487,47.636159156464466,3.132867927644911,51.08071700296597,85.92397608896101,97.25854408888652,82.34998851263417,58.561569703550646,76.84480877397613,31.56614613017279,19.446845390628887,40.589525036244645,47.33734410793782,2.5483689983271107,21.19523994380841,17.120928374253495,64.40293004485673,55.27901278241472,77.07341046471103,41.71351035357458,15.845712796317525,22.549806470934097,98.02159065072102,31.43807827998568,93.45213541990202,48.72981910610677,70.34846861788293,13.490135538796032,66.71407554644037,65.24808870081465,40.383695646694704,14.91175625973935,98.30273549404278,11.520272659910136,20.035229443382384,86.05812849264905,25.771933870183993,1.0215225860809474,47.401582740561544,3.6523371074747457,77.86919742813625,8.025663328198274,75.0998084446451,15.727172086587382,20.651855513657956,83.52287461913559,8.715818850050173,31.46790800786894,74.02504963945829,12.445940461474713,32.572696798815095,10.912411914890164,3.210104729097818,23.43537500265811,28.270544516313876,35.44549923750515,96.85190334364869,90.1630369220577,14.230139667852093,55.09532563101467,90.31505061932153,41.368813879435564,18.11868471109006,51.13934467381378,41.778090607767446,16.495504513435133,29.104328986952076,44.7735961660906,78.02193264971837,30.71222932326332,76.86294641335955,55.42657268771354,52.18951855565479,18.963858818428548,93.00237775390198,65.93005460281374,79.20445771986695,31.099568884813532,20.41532414196943,22.018177350222913,6.449564167104005,91.34818960482957,81.67750001031226,71.74176508805894,16.866799794935904,66.574037632897,13.149768068755385,49.75150961650119,82.13234175855423,67.30276086460051,23.494956869056672,34.93519854644902,35.04400034293076,87.1475028937009,15.938390678381209,56.100952681545266,56.39412732172142,42.18741676646458,81.61807687015951,31.270392602971665,74.13627727513162,76.81456709557364,96.40633126358406,90.25790714314309,78.07346531996006,61.503698772902716,54.955448157334885,4.536869905783281,59.911626482777635,56.83701182036114,98.7172550730134,75.97954487836273,90.81398058293321,17.7698975214166,39.14419209867659,60.135831690345775,10.824122781647304,87.1757991694107,61.7162909161326,11.924135592143381,62.08998111617143,96.94863502079907,48.62647442364305,61.772620691351946,69.80025362400643,84.79233400074881,86.49526731171025,10.577830109172837,21.623923121223566,27.31031694993038,88.97355500213315,66.84396353175165,85.00314460317311,2.0488599137110874,73.28944104241653,14.28673741825406,1.512775857443227,2.835051902811503,10.098683137966692,3.3727291387180447,2.4276470836212427,23.945162074749703,9.985709643882078,15.24262216397192,18.739999090393233,55.28943289131221,50.1142510359867,26.604853926023587,73.2655142313834,96.397722705274,35.22963820866871,85.30125107379953,41.70932937352541,92.68108935921435,45.45332029884417,18.02599518414787,77.51728144460553,38.265890118733424,24.388232606288263,70.84797957756453,57.68910285787492,29.64659460711083,94.07653534969917,12.640712964247246,30.312498331032423,17.4189666607004,83.3532870986605,94.16667266633189,20.89269338403781,3.1613948739794395,59.95268864242351,33.78248925921754,19.039239661623462,98.88966948950898,11.324473603249817,18.263092266189208,50.0053644360426,17.6169045217601,87.264522276902,25.855731465609043,39.65524836566063,92.53332200823814,35.81137688714091,2.414147901593755,55.69586517193412,66.04380745795302,59.95741803018853,49.71209108915371,87.59665495699885,48.69694116024008,71.95578501234436,26.433151879053508,13.286710220967656,40.61415465669778,63.01771827773661,84.3483693333021,83.62227976737748,62.60145636560823,46.23631246099305,54.30400626928182,20.271894946246817,44.93033517762963,78.95509696778929,21.614823814181428,76.51640747050492,16.081946702015525,39.823701288496416,1.7162361604858178,57.208543053679946,38.00214287984509,98.65248353003805,10.38783252271729,60.22608431053491,58.83708410826456,55.10886106261425,88.16601492209597,2.015066888160577,70.21835598056391,14.878543177205694,49.03399967128408,89.21506144531075,97.53918068676315,17.99455649698709,40.159459978179136,18.09679090019227,40.06690360697176,32.40951789743465,93.86520419554635,51.89530385745373,68.36026462020199,78.67888707951442,9.034536591891285,0.4574297953660045,27.154320652923825,90.59260470932927,53.075070591091176,27.745284379444545,35.396571771595944,42.98308069718879,55.238729816529705,95.25892560522095,44.50605838063617,67.09596292856008,37.70401130455734,80.39976199918841,60.13845208268993,53.35325432202913,55.54221799043313,92.91371972714882,2.823611231935863,20.49608455402452,15.33416731628401,12.49462527929035,80.87764044103267,51.202005926772685,62.98815095754256,22.14221159406573,79.10078469955337,84.87219508742645,29.78179069978171,76.74836285705567,47.61163653722167,24.59370946022501,27.51252540223843,44.7056947464243,94.6267500546476,87.58068691246201,99.35459428313425,12.990930267211475,50.19601618543472,53.52573100706641,68.60342877151291,72.27901859800625,35.04483286029662,55.681567025756976,57.10420262573079,55.48892890750039,84.1038429495935,11.544744756172975,34.23450756647617,16.716570539978747,72.03256389862926,85.01035358766661,78.40990016170792,81.9678730028953,49.9051847637227,62.6283565384794,26.621269011793913,39.53543431492168,91.23945886057388,31.882480448887286,56.73827630135288,22.57335154060913,1.0623882940948626,26.348394881604452,57.432246873740866,51.32196924294765,10.870561962073143,49.83796513730088,2.482997790900021,47.55599204703269,52.375394178807966,6.136818607116568,73.25917596020687,54.30192635617204,21.477737490533634,88.92228822878864,49.47170567943127,7.201603854076821,98.4915835938202,75.40799975398204,62.103712923662904,97.61781292001517,88.50423230293222,51.016959699593386,23.423568217028468,67.39181642264542,43.50178522134518,31.327794641561233,22.207904581484385,8.733195374090785,21.322451891527283,74.3627441376407,43.04107150826493,82.22391417261272,98.79032537041314,41.488804804947435,79.2195380926715,8.450397309364543,42.86920932620644,40.47852096846787,50.00807474760916,49.395737843198994,3.153161275086469,56.43584292025021,98.36007967715182,28.802393400582993,19.0270184076776,72.16406310221248,60.436766438584996,54.08874158048243,55.83061310770343,9.266368279577542,92.01620800679235,85.65358340668257,4.7562411591168585,73.31812676535611,6.637449963919284,69.9899325954868,2.4079628325630598,36.110143119613,60.761053495241036,59.26034199665584,65.02024586077127,11.796331652248915,42.09090888102709,42.23612076248606,38.80045803975567,15.154687832697666,66.31874725244896,6.49910933892095,39.70987010358422,2.610269966619061,19.98664869786144,58.9138204339422,68.53289208812569,10.118250936026719,61.168864433600255,45.34949858203661,49.724917137561974,83.01411488099373,0.12745807324991976,31.436302687192487,42.24671403788778,52.29207784708025,99.23138392431841,41.04010638159505,73.22675973660104,40.60404582229693,71.4379035614926,11.323095006792983,21.238732008334726,10.035004512650648,42.97947279722596,67.06670987562656,2.4630223637795767,11.024894447422096,53.53221672953929,74.99051027723962,33.10981958703631,39.640058541090674,54.998593957802576,56.41080323520855,79.19149476032976,1.259458471927699,98.6297302673646,12.304812243499551,1.6971875239796486,2.9242416603051824,30.884673636143113,56.02436088873897,10.38713092667809,37.43795133854635,57.972523206382306,11.601419740605934,83.82386250839401,62.09084942055776,56.9575504414916,71.57028227823665,46.57573342804786,22.820633969756887,92.6120217316404,29.879952874017967,30.8900231138022,98.21550684004643,13.219412773677197,18.291080264089832,73.59521657256008,36.94466560612535,15.333843137053304,89.51615235007857,11.22174525070523,4.44300011670522,44.16350009151038,84.7851594057486,1.7486379577469124,75.8048565962959,5.841308850407856,3.062600562677309,8.401140950946706,69.71509064370855,80.82884349128221,28.13792093223062,76.71332032749048,42.794269281268726,11.677414378340888,38.00022855280909,44.711657469066246,9.3742769326022,99.74216751226473,7.299617504658085,67.904267423802,88.12837254051522,34.147426887290486,74.98454480674242,24.525880173328794,21.119589142801587,53.592216706171,42.27054370208025,99.49626948417499,10.187867058167456,19.046240689785176,62.61358130414776,26.700989681786535,2.440223349023718,64.9349910269253,21.545332886840683,12.558083062071335,16.38615545837734,64.93097082702552,13.988459812595666,42.83438768648236,58.18814320392456,99.20986798645728,34.11240842306831,87.51107694808931,15.072312357429919,90.98678469976691,17.810154894817742,49.03605831589357,5.211829755377262,65.94337790892286,37.43800858770019,69.4652102935975,79.00519031209224,54.71559672960416,11.094807165463116,96.87705892496363,54.22940215873642,46.150138278282846,42.28277067191446,10.250357332561165,33.47580351312509,48.02291216739181,73.8317945366223,6.816290764498856,11.131604364251114,80.07486670793273,28.1008330836775,77.00742910687286,13.628275315196682,81.32692280027085,92.64332188926299,57.887359948431815,20.577065726169018,11.667873993615153,86.74054341956234,87.48201435844985,3.49453970365754,66.22398192709487,2.0571166635435567,30.284339047580076,17.94660233031189,77.88669434288988,20.104340148586996,27.762945267684348,31.550708965706264,66.17670992015705,24.225352222457317,48.33448213734004,47.90016959296046,68.32181711870444,66.28675861343642,48.88933754958937,36.546669621151054,50.96816137647331,45.389126606291086,89.10068370774489,4.519591032741976,54.765085527397076,69.2298547460541,47.40435482103853,43.8924654509554,92.73217287044824,42.04354532822527,23.21451623646904,65.77782630494553,62.322036228725985,24.388804123751527,74.93160663095067,98.45965474957224,25.771947046263797,47.69294198306673,8.951042216188632,25.818834596638386,20.76397738459901,94.9438601630266,25.5811576128653,89.02126308535242,98.42995596562272,67.44188380811644,8.453304421742857,36.12308654751581,6.033344668074325,64.66298934930546,3.8450842868058777,91.69684340742516,25.602904516461344,78.17100263026886,71.68525132388662,65.274083091369,3.472975927063926,42.300765106588955,13.235729228329895,6.796304301155431,37.97577819815465,97.8940573852807,61.33886487255917,8.388534958224824,20.452451491793088,39.304493917148164,75.69944360164254,86.47095255602491,65.69048470536725,23.162439150156565,92.42424983727773,57.60660156822257,32.81072018102549,73.99117331374076,96.29660168808971,4.024847902517803,39.1521572470108,3.6801163495879363,42.68538586083048,94.85445633865288,21.18809521613163,0.10482019149042898,55.079179727540215,89.96278321645097,14.911451691306677,99.81391842875087,36.0118211966367,71.52622704329423,7.184224802366557,14.813944316182571,27.754809087995636,17.120351823938762,91.2961044615334,87.16321161379565,68.90695183709622,73.68756693170204,7.30861678360919,85.39472418800705,95.48435372589823,46.05581857363259,32.219120378266794,74.82968839832635,94.78053691903736,39.448999734180724,37.36122533584154,41.45604795068174,7.127875499095482,59.574055759788756,40.61325048027913,22.866669226440138,72.81890540275509,92.30404124763282,87.7702868984714,3.8533395581388685,40.898889793377435,5.472971051458919,33.87147826347645,41.64079397057607,61.596756975352406,25.513247410029848,68.52051463465705,67.34267965237011,11.736624325485966,14.932003593177878,65.64060723207103,44.01104393435884,20.915275304717017,3.3144737835728133,13.902220153212209,7.5329801760502635,6.453887001799297,4.740190453418336,9.803318838405485,90.49526023391967,42.7670832002196,35.95001250416705,33.150844426290526,77.83485613663012,25.558697650592087,61.9297561273956,87.52065568743134,69.872332567739,4.268949563544555,22.69220511876697,50.81808455118049,29.129486969291296,78.10600501411773,82.73473017093957,72.53652327921871,32.13982476002533,18.835698032181057,78.79239798630577,97.27189855627229,90.72993178768944,19.34847257698513,36.51296213077004,20.745998114278773,2.829136139863131,52.35737654020169,34.919291070587974,82.44834218087307,83.86483174199752,90.95369059056483,54.95007212234715,53.34317906864958,80.92630865565002,81.00563630565736,17.340824548713265,36.66506824558482,51.94011320333804,78.04288053855011,40.94852329773284,6.197763821213997,78.50635685028826,2.463384168139293,56.98203992526896,44.01517347322525,48.929899392646426,17.418884782868904,99.01658576858638,31.29284798675971,21.113956019523037,12.997116346002846,81.84242274852447,79.23789144098083,40.05135310970207,39.36513043148744,75.28046619129019,66.66622514099963,59.457349492773524,60.11600389589684,76.74374459328904,70.94784771242372,44.90112192413187,14.321387456270806,21.173265552658016,16.48226089320426,89.94041182424507,29.57466368276829,5.858825972776804,30.390562917787612,29.519970419444675,69.90603699053482,86.47161328924614,8.501862652745285,7.414731107024819,62.87289673607172,12.400015562078837,42.69776641679297,62.47649371611439,76.14431339313504,6.851180979322646,50.58404281767466,14.860955451167346,77.20683918435527,4.4979659291551455,93.00380657989228,58.32175825007499,24.530923630217917,24.652648002131915,35.06842349448824,89.03911421533397,35.91587251589541,11.729714124078306,6.3502508336078956,50.121439460232196,28.515369251403765,20.151779935109417,44.07923059986467,38.654795213366256,4.700841119963628,38.962197340217465,18.00223243966146,83.17247984081393,45.63226512629805,89.08647298279844,52.1333185153682,99.64355421517628,15.257769520275533,12.604896392366793,24.771686381039014,53.99022825915125,88.62216364330315,80.14032744222648,58.313859681280334,90.73144504679449,6.857528048846984,86.82364014720292,99.45406930328915,10.74840088777831,67.5004171834082,59.23405581120558,89.39217605865221,91.43027363195885,92.76124108385895,95.0969495724697,79.14782163084996,69.7466910886858,11.628582359612638,94.61129924625624,36.69446079404055,56.5288818114613,27.878761046083444,53.57864310663818,38.65335514118395,46.64618515326089,86.95432217313734,22.514210491184272,2.16375842393568,12.692408528973754,84.10295992370472,65.60100327733618,40.27452654127306,43.60920087821039,31.405156649094845,86.96144186067546,68.49115509090413,90.87172946031299,64.34601531321115,30.029110250692526,44.08872169382847,20.081248961170516,42.24864030182871,78.70662572338681,24.249696076518212,84.90480303780485,78.58171368143931,37.093095857418334,1.9887383935239589,94.47793065413188,43.325988760098454,78.88888974257742,34.27872838493753,77.43423878214021,52.71730404940149,77.02565989385141,49.60423689755184,92.16289672167981,5.190065139167177,19.48920548717441,87.48147810202134,32.02846331161364,41.94764557340491,16.11719583499507,30.51589208468051,83.20481502380142,88.37063614787908,46.73098941496223],"b":[45.85375702752975,38.20177875932889,29.828217446387136,45.85277377367974,42.039311615098406,35.129381958582854,43.475073495030045,33.8430794804463,16.62255590594343,19.495953467065256,34.055025835934025,54.536235443788655,36.26897872797915,18.704227583056365,32.970799570781566,16.760631808283026,42.49522321702962,46.04387525474162,50.174013283752956,48.79509454043931,29.576739687457863,35.88618183034518,52.75331052473989,13.443762115838584,29.00713964842708,29.2445841398888,20.974292522493855,23.080533069640015,19.372701889159334,57.19886227035721,22.948456742357262,51.1125410917586,51.24213667587242,49.45266024357406,31.327323519221576,38.89273084182596,7.755213048667322,32.809723544506774,40.002353286494,29.32014134847803,15.457725819912094,15.768237591690388,40.90395501331153,23.149296747099605,41.89837876562715,13.306816262383094,18.169543096087686,32.93340724762863,16.56115239263839,26.7230178014774,46.17264902418892,50.9133474104325,33.1486246164887,34.76105134868871,16.912675780942983,21.5571863977297,14.955404095675497,39.712964772798216,34.20540186582171,55.35240757197399,31.277748489603,38.0610413942909,23.563999398363112,6.939485507053633,38.31402404622196,40.26711810304619,44.627962061649065,34.28372667391342,31.477805295385256,49.12193302131679,16.127386057041736,38.69498969032354,28.62985602871584,49.70704602587206,12.404049823725845,55.0090992425114,26.03160492716171,49.582377649002034,39.74723536748902,56.53238996880887,31.416347206143392,31.792055129959778,38.38850851805554,22.544745665209746,15.19018739028358,10.742602341430029,30.573379336244233,25.185383300288706,21.725125820509177,6.209584449011869,30.03900150194287,26.01320668595151,22.576431804681185,37.403255627058215,41.579318768744535,41.85075998855405,13.039838083476475,26.527203424180907,22.136464846927787,26.12339425541478,50.3361229722878,38.792620191670096,20.1238599684072,46.4212370305007,55.997255368115425,19.793661175415327,43.18783498179215,24.904134055086125,53.889153720456335,34.94821239808384,43.258633256283076,25.623521806086515,16.682777805249213,10.482520162816357,34.44180215571083,56.159940819337436,40.391008133036536,29.892325121240983,32.78195928923178,37.36016272937084,14.412140693469647,37.76850874683643,37.38098299231627,42.661454801536145,38.86752376485244,43.19525734091175,39.45773194017558,4.628274630384741,11.75066117056248,29.18424758212456,13.694861276736003,27.343665996720006,28.199234746555565,29.89409812030211,36.91136281241379,12.938265702797391,18.720472389568812,46.783303416406575,35.16433264042078,31.399540230179262,14.961310090013194,44.870233083420594,42.070202050028115,44.58661633641489,25.28697918308933,17.240487101193924,31.68986523518926,17.522394923785992,27.81257142899075,38.30514497820125,28.586913171462243,20.877722466651583,23.6554231078038,38.79011564910008,38.819257005354814,20.75681571712994,29.98779840007498,46.86206342706106,30.903293460664134,40.870229511247906,32.17669008413344,16.201268288341105,9.637424898873643,52.04115307911273,16.907473996124338,32.11658330437513,26.260706814159626,51.06734210183558,9.046393571122309,36.49342451167102,22.507426469588115,33.748058558625026,31.278188879981442,17.738133054194854,20.628022120614823,42.32295194565938,24.26189681427205,12.744802766124756,53.306284843467736,35.080665991011465,21.46708488243711,14.789832869265034,30.90356912951151,9.35252353215919,37.15508053602738,41.588551815971364,46.375881153619495,26.793134648006905,11.362375520817851,37.89727963292971,18.507102610515147,45.86613737472746,9.49500738674729,39.356114864237604,31.13750121288472,32.79159832704066,31.711884450271533,31.29692450424414,47.7398086847854,29.571527578676744,30.744685573668647,49.092538861712086,37.48135659973674,29.79680856228307,42.33476616753323,33.309102166795896,12.299520506991012,2.3299118355004644,36.18658303289944,13.77102933975675,32.14234227022714,29.22863464608063,16.207718703065,41.535284079325805,49.573549791675624,23.3822354781196,39.75764335407091,49.33519100503213,33.05649152962749,17.706176287794193,16.905176921199953,30.4578341182673,52.08287333174924,24.606667168167682,14.834983844475587,35.871359860747305,45.344051650158825,25.73378742883927,51.97797881357186,17.55623859315985,16.755365519500536,36.01787084382215,39.66261505938651,26.355030515966032,29.079157869126412,29.413612812500908,31.408685932677493,12.331050579404149,57.539225395842244,44.88208385904206,32.88117410654317,31.222320872602836,16.88635889631727,27.027294631814954,49.56933449633709,24.621110118542425,23.52076473727376,21.55073533095984,28.30317286188005,29.269892171662867,33.65428543766535,26.9890639267794,15.683648221839247,46.95357947037769,24.51588407239852,45.17033541448222,43.61685671334601,11.936289041773502,28.98669355560809,15.95082876479582,45.342132345014846,41.19273998334643,10.818953810598844,44.36084929675793,39.825385892763414,37.148906090431396,13.25225446688278,13.907826961230505,23.750555632131807,28.254370713719645,49.4562505909219,29.261193868256264,42.85516906354981,19.692847483825076,52.75178491680968,32.40820756098583,16.524570939087848,23.862126632859308,43.91253071451138,10.364497867267826,26.407732118553092,31.41581885874475,45.16328948689708,40.224258336984526,16.233518368318425,19.334072257671888,32.052544903118665,27.249193848042164,41.5889453352961,22.447071696845384,44.30289204391225,41.93585251427868,31.117795447669003,14.115609295184534,6.747931811540688,46.49490267783319,31.088058880732394,14.202645327938116,9.509897375362852,42.16821888731218,45.08366080833579,39.873187253375036,27.166297246828332,33.76340916689292,32.249997260038505,43.45379984733932,12.862053805040734,19.586450891625994,46.513020380183946,18.900276125987958,40.01438393391395,15.643139395283484,19.927569015676333,30.064352698190827,12.504201235593433,49.69575045689933,25.51365490093073,13.397004828867978,17.615472185868313,22.907529203912205,29.31104626383302,35.346397545692966,33.58980513131602,15.33832571178765,40.67415402758628,19.504279687821914,26.410474473093043,38.403411508168034,21.61254730996283,26.3723541191644,11.308268242156059,47.46078240863257,17.133162950510407,42.56076846865305,4.566059610721607,55.38569221215379,49.98851971100112,36.596275550587606,31.799227787079978,32.69854995192123,30.669762875347644,26.25760940181423,39.98951016349406,10.52246218582805,43.07773175783586,35.34898114636613,46.17824401013666,22.13507290723756,11.231339463605465,19.248648465400215,7.827892532538132,22.788984886707645,26.07234882978595,17.57753965124102,11.785318941666617,46.45677928648762,37.59765595203782,14.053444412188494,52.730474769188206,54.244916192846645,25.422498762170996,44.107803044155844,16.05346549249326,47.92171110813385,34.42993818050414,12.240583038619105,12.942929257335472,18.625808729801136,17.333475373568206,35.65706581082562,28.921860339839174,43.189800300861904,22.939321403893345,14.936679821492689,9.094884396478825,41.61073484788124,45.73070644710617,5.5315776527452165,38.366644604779346,38.506481905722026,8.304246515025785,42.615499384388755,44.16371093487461,29.827652693716566,14.279976595070863,36.088049609973815,31.545681894131555,39.632331195990574,23.745769310994966,22.615501358210594,20.801131526064996,32.334251181395615,52.958797613322574,24.34968390878382,37.38650614268484,33.57016830894306,15.913491499101887,57.11168331027949,32.5843491341177,40.253835788374104,43.6566747416639,35.23776908965824,19.28666792087491,39.34027102435594,47.98719366379435,20.79070539558863,23.906359867606593,38.0756174730875,34.21552849241863,39.95323543498509,11.971978063573024,11.544754375387223,34.87343371871013,31.407872791271476,30.37305066038953,16.013178309519418,36.92838072261161,14.429112880742494,21.060803251122696,35.64881676757621,53.16282863806984,25.889367886944548,16.66411104700233,11.253123770379098,38.47492452223625,11.810123441567,35.74224265591838,21.637727044662537,31.5659189401687,20.65237332581823,18.251447725890543,18.39259155066997,26.25412702082667,37.40231549014797,29.84391634726943,15.083627870913109,38.03421934200357,47.82942811977992,25.534179253613928,20.862746394602606,33.22062447878804,33.35692092069676,31.51089099335037,30.243000937860685,32.070039363059415,39.606799506763714,20.872119761399347,25.09870628529913,21.002959408462615,49.04594460632678,31.749360381591536,32.4654715585856,20.831014428568988,51.45969428255755,26.19771893120388,47.38939993129997,43.44624088127483,25.95926818995668,40.281011856783536,17.485333995046744,5.259401377219466,17.163236619083417,24.707843026807442,48.26205908941981,21.987124849577846,8.659224008062182,40.59706947257265,40.899386848255126,40.37089049447724,25.076205392061198,32.408463959035714,13.252813594604799,31.059531234728567,22.485387269551687,25.123736838201317,22.36371482428399,36.17747626118342,40.606542212284864,24.34762305484564,47.88359437802801,22.409370235656514,16.754584973955026,44.15153684702035,32.1496782853039,27.58068575965516,47.44770961810707,43.65607511724305,35.544705869265975,21.355009663371867,20.33793433927481,24.21063036577148,46.61507630990092,14.963000271590875,45.75508256627149,53.03344122776099,51.80826528833576,34.01212293916583,28.73316231538618,14.107778010839347,40.410607520784936,9.511359922309733,18.118301425936295,27.085906462581196,21.527961047871692,19.99537228334997,21.838534715811505,39.3161213652628,34.657787681070936,23.0504063255597,37.648086424243544,17.53313869817635,10.132202489159376,19.317185673995517,17.395211540379115,54.90604417307241,10.046157302339465,46.460940481917596,9.40288795632188,26.487233425175596,23.15403264944111,26.1076827878806,51.85976689903896,42.60706245558664,46.47837394937545,52.992637807163604,15.27805208199494,27.989056699567534,11.32587834786015,23.050775073007543,21.531372358794464,23.104969290998557,12.698371983790619,15.893868555777813,51.60798002593349,38.87348060476827,47.29311250132489,28.181178678925505,28.233662298452877,2.896568163759161,45.3871973096567,28.89399955014776,55.18760327263921,35.95211974435984,26.002384154086194,29.267342606698406,20.30863493416424,10.990912245022738,36.00796087420347,39.764719104261644,29.98648976569613,40.18084148161959,24.155324446620803,28.597494408495837,22.50672141030645,29.702338717362554,35.06509963641778,45.94993086539955,24.723561672165435,44.45670914272365,54.849704982093684,34.92377972204533,35.34879819534436,45.78286784301235,18.221191044098745,48.528575718009144,28.180756339024754,18.4911330886695,25.499673090826775,15.660886032634554,30.030110166299565,44.372060836840895,23.99024390581714,33.792823949237786,49.35987036075964,23.962139824744963,34.544278294996644,29.31453855345576,48.103692987495386,37.89714099922603,13.245842056586898,33.32402588525912,9.564367871361812,45.05553110977027,49.98946770289002,7.316583712331979,24.6861567918791,24.789650143540168,18.956894771166283,15.323700490957597,34.46679508874327,25.514753446437048,20.323680455861908,19.30960513163533,19.404662337186345,31.716843272578792,30.222571253036804,24.93319819482108,13.085650467859736,13.796026261511036,27.662402353367828,26.456879495137926,39.20737799068794,17.904814666583725,43.96486125185001,29.375390776290757,54.56970214883599,37.16120166514604,37.467032417356144,37.499468308538894,8.55781353395975,15.720434784925951,26.4938668412031,42.005063464691695,52.96027939180289,8.768731874995188,38.25054120329118,18.231443417990548,15.797159771998537,23.728855001255788,16.347836107235736,44.583483483376405,41.309602599022114,47.762646414167264,29.62499854899567,42.9290232676222,26.85725113907229,22.87591951866084,14.227911674152555,41.42543940567952,35.8387959736632,48.30759434831361,29.425377167877794,40.74395216384711,41.112293178745844,30.28564613002259,26.55700643535973,34.97148526648847,48.379065401823425,15.749801196433744,23.933434538333138,13.918757210578251,34.36344142002097,32.02898877522566,15.9207201386783,13.831868260738101,42.047068449029,24.147428260713202,16.214444469271577,18.258876397626075,21.442495220883373,40.410078300645914,24.446573903227584,23.59813882252707,25.59548179715887,51.29939964985816,48.8036825107936,47.681189796073184,32.39391440740002,54.61947092657858,40.5630699948154,17.068645702273106,15.333991276929906,9.119127360516526,34.869359589506345,31.8941252609573,19.63151048214829,42.160290806436265,43.06224981297764,6.38951337754849,22.466415859344387,18.507389967699375,16.222575440477556,32.91633194623214,34.10782745294795,26.75746135206684,22.010029180063775,16.494062899263987,6.790662742050593,9.8999707124453,38.61818362574898,37.358848480757366,43.4133037404715,20.801256963016282,13.26983436099062,39.82527380020543,33.32754101651494,38.898295303267545,24.137983904444866,7.842794393205126,20.823610089617603,45.00702830765858,27.310606385662105,16.964666041963866,27.45283414559786,41.8869636192772,19.626112039685065,43.75410257636916,16.97773602962567,36.92432520221949,22.998661446314745,36.13339463146613,31.84257022183749,46.897120080258404,30.487611284869566,53.09801505195885,48.9650399481945,42.55767380961909,35.558679442004376,16.2135909323667,45.19326609305364,39.946509479893386,27.67818625383034,13.872875377229432,36.32741865572369,47.531300058056466,32.619409684387335,41.548001912284825,29.55133800775436,33.9223248100501,26.59351145102658,18.042529976866287,21.32912420735412,22.886463694298364,21.535239174300735,28.92363467528583,13.490731870032402,28.317207569571046,35.11503447126487,34.316184006438526,14.477949533444336,48.583639615953075,14.421746854475526,51.97595932399959,29.239291997669433,47.451926533669045,35.85838938316209,22.252271636391015,50.92586310679849,16.085682883078682,31.401026085907922,28.900354890927176,11.566772570476372,17.690082630169556,39.33714638545722,24.082857489391905,10.646634661364871,11.739861613862557,43.16224391843393,42.964940544738496,19.995980100479446,32.32898542271725,14.676986727743877,18.704164261607815,47.54699203714508,21.6756929235327,31.272203650834566,12.288732227343457,25.583374584008826,47.13684635170424,20.996055881373437,26.0507218316314,30.058058015620844,17.85246416165746,5.349730045920125,15.351126105634005,34.88851025972909,35.00126251972231,47.788927047550395,17.68816966927888,37.68325002858648,12.070436260600239,47.65851851555786,22.65959555376383,30.54829863709075,30.013574428975204,14.468460884246452,26.404853391818186,14.863608874583978,22.328449447188497,47.831183320680566,46.039210245611145,39.59202940615758,23.330817939341415,39.16076185015393,34.46685442347709,29.452628390007956,32.70649880941329,57.793310207477745,31.04725812512133,53.01614972387519,38.48004631131498,39.4126398290407,23.423950963637417,51.1256470226606,35.90454031658078,43.20162592093163,30.61559012939251,8.710190595034364,41.774927217649925,48.5030199685271,15.982313052530372,28.142568237171567,29.872904669336556,16.129308512592225,28.679600072812057,10.627809714903638,10.74893723332739,28.021343812969935,17.14236675432626,8.351586607612123,27.223268857675407,18.993556749706205,2.9385006628807853,14.512887787541459,20.815854836110248,37.82744730636398,40.65086587096455,31.255024364840054,38.08701639750029,23.30003035121781,38.17233024289666,42.15264655161035,32.380863654577595,28.2088850287493,20.796000778089805,41.66341326913706,13.797798543880697,5.128325871743025,30.13448366668801,27.97379775005333,37.89236261760713,24.490999924188593,21.463085446134254,36.307652618053154,31.234052768703773,12.083445487496975,17.708624806047823,17.265481871396247,43.574436989322734,37.443794872785986,22.250627056986346,58.29745170926604,22.624505131040095,27.354610415592376,36.39795958353433,40.08282444826871,19.337554193345696,20.374668802795878,3.3805928798978613,16.44280245136883,38.32326170802225,35.91891978019832,52.59747144600249,36.3479074104948,38.62910673906181,42.41059827682057,26.428028864434616,33.16524602048182,47.784417775109084,33.79253744590372,15.769381119267681,18.307327668597225,44.607213623139515,25.317393526690196,48.04459147121146,7.528069629173011,20.786904433027907,29.095724702970323,42.499801650607154,41.81601414427572,28.290691272814605,12.277356124951382,47.84955263270688,53.11388936911631,51.67869064550597,41.7874952074437,8.541087535707348,18.24005302774044,41.133384622126165,37.87382187026288,26.890674781960605,54.00666240791682,48.26365705564296,37.521389725575986,33.33070568325011,17.17819234087722,40.397823879810346,12.445797240974619,28.51174956607849,6.86814817875391,53.923286565254486,45.37480743420545,27.861622654804332,38.43333833888295,23.308988499837916,32.87775786266065,29.902063726938884,24.459882919747656,34.78612598525545,42.102887817654484,34.028264127254324,45.62770158022141,4.213148119229531,33.38107785863999,32.03897272077809,40.32746491722172,21.51989696402713,47.20580864263786,34.10553980568716,23.02260048723565,31.953464590884423,43.465616302528446,47.344740543732875,14.562541428913,15.650524752623651,41.775974304260345,48.79279927985354,37.29256359825074,55.13633951404083,49.25199880881162,18.064846950230372,19.43079727051704,33.98739394648374,20.269976220735686,28.779836133854495,43.90573045905322,7.659482047253636,38.640755899893726,25.21438161141087,36.181312819380075,38.375589673626465,23.82532821272479,29.789654158500326,27.4021801011651,42.8697468822329,56.161970566880896,48.51706237901496,30.26762211227218,28.53116761114641,39.943371150225744,19.997717619757623,13.097938853116299,28.169238993091703,14.416872419887001,49.84296218039427,33.49953918423634,41.530195962685546,38.270218435059746,48.43998970231272,34.93167443344596,41.02177464444587,15.139750929490393,8.092678556477729,53.258253769969976,24.122762945412088,13.038855401454796,22.03797325377634,12.520024693874122,16.044206803756637,33.76207709148851,15.912064045157685,49.10174007339822,25.628314466299067,38.71329065556466,23.37860245558685,54.132319638561135,35.44197635969714,49.493458308584536,9.769347073963338,11.467829241132051,17.052573878756313,35.89456132089671,29.269409705482644,38.16922216615804,29.630169108611458,14.771264485617358,52.74926454290277,14.517478849441838,28.3270519973915,27.725914908607933,34.99616898710124,6.484651432437616,33.0973076291573,16.408317992266316,13.613186923705435,14.757189540285411,39.19883350595356,42.678070038838094,33.01659965091192,33.333449731016536,5.751409763195716,14.337253234042468,48.08996404143342,34.330411281577376,8.399164516235738,34.14702782936677,20.950655550798224,22.819475729866245,44.20084470557718,58.32364913198023],"a":[19.981610328075902,6.126346636758244,6.027771791305723,12.699024924790203,7.584911083478536,12.057446126502143,9.676196302068716,1.768843334741601,10.16858670770208,1.5963818799592877,1.913562941635969,18.236586476851528,3.130809216008865,6.934449368542568,7.52941349167803,8.088723099782493,10.075528112684186,6.2209549731881175,13.728046512633018,14.705994286018234,6.498316727701332,4.122342442081224,13.71781699100119,12.346683344314444,16.99456431008803,6.468611828949209,7.153706222676166,4.3558827642201114,16.192689921504293,19.956526013181012,5.222706928247494,11.587954604683436,16.70854464411412,14.915967790691136,14.769722401281808,12.81993375213827,5.838872578449612,10.484202522024596,10.69229855031403,11.851384338346143,7.777635923093511,0.21039366039712348,10.261547848139791,8.175696213547038,14.130043054347375,9.413729708116847,13.770719876010746,0.6244025995018987,7.7274203618865345,8.857204671079653,13.227509351757455,13.032095529200149,8.603966053530364,2.998672161357616,11.454526935685339,11.411768884327147,12.433410756623946,8.620183094829045,4.493012381023878,18.824495517173425,13.877529096277383,19.021938492943555,0.7955361642005032,3.8721130406183812,12.970915442570421,8.614756738636306,19.492610642172615,7.120576643400143,8.992797747467144,15.951893656580882,15.027156088913664,3.914325777306691,2.931503678648806,17.860194422050277,10.078541896084158,18.051043436613693,17.703388147569818,16.0200545489918,3.912790236427073,19.140251391631775,8.32177638765312,1.2373960193359412,7.087910114848293,2.147302133373281,1.8360405518570255,4.573087269371743,2.8731608063033143,13.802258743886728,18.705330903035858,1.3885331047767924,9.08553399094206,2.3163357791370043,15.190965748376843,15.23302651134264,3.6368707760359342,19.382912154822986,0.620656573827234,15.584289611218622,0.5459093127490666,15.859389667922388,17.4876138081399,16.000294385877307,4.4516154777059525,11.752917955976848,18.289057294581163,13.858080319957047,13.406768060445442,19.090278774262703,15.498993391068554,17.581779226080588,11.631408867713823,4.814956849972902,1.165749369390432,3.982914356322058,18.96208104029089,18.23370420579757,8.817264855296454,12.139193906354127,16.389967748180986,12.560482111601363,8.732270380708705,7.0467362951506995,0.004245211464679599,7.591506886384924,0.16080169317290505,14.763155455155621,7.504947927050463,3.4102856441096563,5.3722571873268565,3.1690088959265728,11.572691666459733,5.508920760801601,15.527222814665326,14.105811465254687,13.870521573330365,9.421837139773448,3.6623066094256096,19.031399135969252,0.3029135263776883,13.667286999301362,14.950289235828574,18.722927863364262,5.739470584625561,13.580063224636433,5.071957581892272,5.619322562504792,18.809077106051028,2.2627483270520843,19.280136473217308,6.256027651868963,11.332330719277897,12.455321699321956,14.13336222982647,11.132260061085963,14.978919509246712,13.838748809629093,1.6236123844893502,9.279702356289388,11.62644906601317,10.836254172479265,14.63809137381347,6.793085813584936,2.886992021977237,17.46774632088275,16.01198052963919,18.05299419838686,2.1501657558684695,19.553494816391144,2.972936314565695,9.80139305402493,2.1684819512225273,6.168438342209925,17.0032060609442,14.858703255841416,9.206117254691858,19.64984621638575,4.596554303098546,8.578461970142497,18.374938006577416,18.64476706282295,10.258554864559319,9.791368765090818,12.567776264927941,1.0188460313448555,13.023032209541633,8.83248131194113,6.88151229605702,2.9641177686579345,7.227769439537068,19.161882358034966,0.5259496269624853,16.786585198754757,8.40857859588069,11.91122446367293,8.727012003453956,17.748298054300342,19.94874157493819,8.632963142865941,17.892311306118387,10.406835998330708,19.67552543511246,14.355012124888713,17.54853032434532,14.887008592739633,8.780372841633199,12.147706850079798,1.7651490693546057,0.09115686173041482,1.6938978539963978,9.808419176970876,0.5590563016628414,11.202780898375044,12.510302474550166,10.223704411994635,11.822613350594615,2.2201391910729695,5.229110476437611,14.705513140759345,12.315818815681707,11.820296881580319,9.440814967949681,15.889125015863105,14.471671680371575,19.7517109705897,4.737519678088744,7.849162293961363,8.644245266788367,12.72192844378981,18.4882952821227,6.479174636103244,9.156290461903733,3.05773840933222,5.52869062292233,8.267638899319483,6.06661450021881,4.8645771116106,13.415118636599587,2.9212108607314624,18.159909633673095,6.821327399556805,4.506168753143429,13.340909124026794,16.193013549403055,17.50862141225973,10.038252202507865,1.7165371776472549,4.747305583844481,0.2754625737005867,15.133164594351003,10.401246791623215,8.58749435405799,19.87425544487631,11.53925814434276,17.81182248863495,18.100718915835678,18.400278153455965,17.780405832799083,4.989024170011058,2.6328188641564454,0.6164718461008079,7.348937244194018,15.012428991889424,5.682221775202629,7.967321245888628,8.84175404007241,3.8359918908312807,6.465957976689252,0.582165945333637,10.329474637020315,19.872397952399602,18.456039640377817,8.495508739233548,14.129714140553844,6.549561512719184,14.452500073944563,14.803114815387985,0.8652240096090669,0.7316864406737178,4.293535373388071,2.3416101898408748,14.956899641488736,8.025330040881569,5.726068776351729,5.975744722066358,0.7386038469058231,15.093863118420341,1.0943185883200046,6.078640775988968,14.194494092583593,6.38333282220656,15.810143673966127,12.161319013100197,18.574131818063933,14.035618419484667,1.8595099624772615,6.565611586928215,9.106908115244824,10.488590223320799,8.774924048598267,13.17954915206181,8.612558018838543,13.162764253020836,7.7807558836811985,17.900739348068587,4.897533178812479,7.640318335889815,8.901936202377696,0.7917134191618747,8.438642354852295,2.656808100554615,0.8973268354778163,13.691355595545446,7.035167585806685,12.142888965512274,5.355813504449927,12.09027280647835,12.145882272506366,2.9020677063537814,16.99485504653406,12.466947151227625,8.56882714025045,7.675916751439313,10.796284662576392,1.4577402220485336,3.6619289628140628,3.723212125471247,19.870856251544847,5.452640779230884,5.505244447914239,17.31110924805868,4.365263986644168,9.44831686969248,2.0458426513480843,16.692921732951817,4.127140799692106,15.883054554614695,13.938081717059227,9.397930796191556,9.56172742603163,3.9213748090092615,5.854579751111508,3.6442856765299325,0.951462540465049,5.234608964180318,17.754811364456646,19.42381714150189,12.004406021667391,12.531578365734486,5.5959911289396125,15.315199431394682,0.3280759200529859,10.508403365322788,1.6346394277639886,10.369075001483266,7.597264194978091,18.818875227361396,13.419032882618618,9.473104675968766,18.83074347820079,18.113262746682057,16.607908623163794,8.025162903731973,15.809584884771999,18.670384080814152,15.646832231753063,10.457743380965677,0.8747325571802644,18.38949134105998,15.2287607595588,17.8387507360518,16.93007436732622,6.148369525475483,19.710601243998678,6.839576006791415,5.553846116410708,14.996483473612724,6.9404967659919725,3.1078420470490187,4.075403796945172,19.521101604448113,7.67355037742512,5.418693656349416,5.388019989372794,3.0813467443271714,7.003181733358406,11.557881608633016,19.963057389637218,7.465293889266986,13.981566112116703,9.588081391846618,2.3539133911545873,9.734466862915333,14.754013726695497,4.2540111038004325,0.9247182141228016,15.865395216896685,0.442293287236617,17.32755910127115,2.74505550414466,15.926665300426514,5.629631964027757,16.401600262641626,3.4374591624730977,19.228298847477753,15.882030156496242,8.990996118675314,5.5827747340285505,9.155502725985318,19.249194901615034,15.880032810544416,11.587439354931877,0.3132976998729653,14.143433943694017,2.367463736111457,15.660740143139375,8.607177940766215,9.893775399631632,9.376846325417496,12.28170130585228,2.90400015673979,13.946466008823762,16.61050022401019,10.506260139409406,1.1948582944855746,2.0949483014373227,11.384751742406728,0.8356588406447818,10.414796099393243,9.110876947233608,0.12303657622225739,7.9173048114267575,16.36161198207626,15.321768003626492,12.010841183665821,0.09773872314711607,4.076698099074716,4.765046063439158,8.35227549884129,5.155372961086697,12.742694855729567,0.6716683089577691,6.308869999217186,2.3481698034074405,5.139666549836357,4.448724670382278,3.8117447956511796,2.7861166393473846,9.443249121814299,15.452525458082341,15.862778110060404,3.034796169966376,7.724826696425633,12.609918079107407,18.459890398508918,4.537938166797679,13.195887768776524,19.30036772252832,14.919104580361413,18.906561429680345,9.36045530394885,0.5444752056692304,0.31268242330378726,1.3827247860129566,17.268545866012985,2.303573218535009,4.568811076139174,2.774535966678462,10.0448780838179,11.915383290124133,11.021085445431495,12.131502131997681,2.753624180691827,2.020704184027715,11.770268423917827,13.195178236414499,15.27173197635728,6.343394491035972,16.140985693646286,15.248620836447024,18.72830500721165,11.263289509769798,10.233837657189898,5.775405626633319,0.2561899042174076,3.1784164726855746,14.536481897630082,10.273495697303066,18.17518153596967,13.960462166961625,10.366184290596125,13.476286686829857,17.342731776697924,5.770343677360317,5.934509212002039,17.55029037058467,15.01367874245192,13.140767607054942,4.056945303797632,8.149931235002219,8.95444559319503,6.335876754532781,12.823396460049153,12.780535718446227,18.515725840639558,11.879595116648481,10.97030036157674,17.607318539437568,13.51728672741217,3.840643317229948,5.572198123479408,6.749489268659827,0.2176084094886077,4.773167370965594,7.2983457832173615,19.424903399710736,2.8828570730064573,16.9574474434871,0.6991315137907561,11.423176694779063,12.038191781462517,2.1672872685370015,15.608087283052402,14.948788303013497,7.7155010329515905,17.47907287451122,1.8387967851173848,13.69510164286893,10.37592679308419,15.914266680270526,1.5112483193975823,4.467522418798384,4.703969173406892,11.1951869716032,16.80083322947383,8.637045511733481,15.906229246601775,6.12147822018259,14.406787439645097,1.7798137687445337,8.10922462555947,10.573749108322708,17.534314186856022,6.632692026464233,19.572015039374136,5.4611725365329145,4.80564145512822,3.061251387357946,0.39914816604334824,8.806394548214293,5.9722568752071625,2.915860339957499,13.830254487418134,5.49723969593892,6.899241205995561,12.024211159879098,11.500157759335337,16.243616616187587,5.728857728428505,17.657386317187953,16.475401969020666,18.9216828543477,18.86699099392093,13.317332595565873,6.822540054789545,18.86675871138341,12.900818043620227,8.794106027992195,11.731807326971978,6.935436332831748,9.395595990294506,4.954032483255424,1.5006997437352076,9.927118882513014,18.660033454331398,12.947365460485493,18.226853576070067,5.225080001536266,8.546443313254692,15.557292090930432,2.590835248875365,2.3709519807585044,9.440033525619835,18.43210455797449,19.739092605694566,0.7288590288063235,3.9103889549667414,1.9747894761361229,3.840345346844205,7.502285518861562,12.840412672780111,19.872392709388187,2.6999412357509733,0.6695827474814209,6.773697529486622,5.508718471569125,8.749724428757318,17.041353163417817,4.508201536728804,3.1634428306890783,13.26349042659281,13.671627804892399,4.063696894774238,3.5335928357025415,12.037507971691337,14.798645637151777,14.782059781017791,14.558349234975875,11.974560803765279,15.440424155472243,4.70627793639804,10.810390996090739,12.970614991424153,19.346534512644276,18.822918985693185,0.41133499046289046,9.88744030221698,14.237983807830359,0.08073599574061952,1.6297698318901022,6.0286431998808965,9.146403950058847,19.965532286865137,9.700008641124773,9.2381724772275,19.689212353263766,7.833944851576549,1.256335157222952,4.734108844674938,12.499741799265532,4.695784363148476,9.779015198726482,17.485899735956373,8.101761336720394,5.145083788070979,0.3514380574900766,14.651435981078968,2.24020867323107,9.97119124750971,9.061020400372959,19.356110873470804,10.652823423203696,10.448594304618206,8.050244063642666,14.736030206360478,0.058715214481668276,15.19922827402327,11.561156617121124,2.7005808942587883,14.140221219220606,13.469965243156885,1.643596716682838,2.4718252403440744,5.42256677973461,18.54332906293176,14.72525348520001,9.668351206981193,18.08372389104537,6.044178037732544,15.917993323416892,2.2037440361367766,12.9939637972473,5.226303613434871,3.57190031027681,0.6893971705834723,0.7488310300534406,8.35247231812113,13.471581236707873,3.6589142542223962,5.518702468851493,4.428402171781807,15.045384273171045,10.15724388634795,13.11671252779644,3.769859201038801,3.032651167149103,6.419554512404542,3.056224691339575,5.714221168904716,8.71460224831731,11.569905537495782,10.383211748629284,9.101969798679498,1.7789201721503778,7.166786125474411,7.96380461643635,10.657342631482427,16.82405677722683,12.084922788048864,1.5248180276797862,0.9384514582353143,5.8505918281788505,5.852417786658566,14.743110999785834,9.863353823122885,18.33162642454566,5.291756077956653,9.89605352121854,6.901232158098556,19.84195383195289,3.2350530126009147,17.227666234644396,8.77980533319921,8.936337994753298,1.8648343348867469,18.84544570403154,15.797247966144017,15.38886227337176,4.47128560106294,8.986662478459264,5.93672366866306,0.42005503511833187,7.170001017905165,7.428192123667978,10.484458649327664,8.294875931995245,14.052029154315488,4.923762774907665,0.7854670263623031,11.859108384571734,19.31256947824739,4.983349787634013,4.551223005780329,16.801913012085063,1.251733850704313,16.09962232503744,5.996007215557162,16.469216395384265,11.800493041829947,6.235692166267643,13.838331024893558,16.324837784231487,6.7907227462758435,15.294926663248148,2.451900735728012,16.95616583361122,4.141661884313552,12.678149020588481,14.037108910713547,12.930220267695471,0.795921714240615,15.97222407508001,8.933813767847948,0.2782433046138433,0.05183706433910196,15.016095460655269,5.273215091089591,3.3987746569652355,9.470560279950572,17.602452429205965,16.512263487802976,18.58102140812884,12.643064551180165,6.625958179504168,19.553448608516305,10.07029787450934,6.1064810586277884,1.231606366668565,6.326633597414539,12.305089063675299,17.758331770149816,9.12681769663144,8.681660321637171,16.58876807471755,0.22658720538609511,7.0532673842314075,16.47249679497469,14.42654367637311,11.187392928861692,12.233635999835366,19.893835030715227,9.791313567676614,19.034421466689857,15.428838924043884,6.4174583668152785,16.334295675963084,5.564370498059148,11.784328188202897,0.6304541800232855,6.406065971383024,10.38030237871216,19.81827400605721,14.344244929420782,10.08449207599984,10.696446093026726,3.5585514567910037,8.996688532830017,6.064269571423555,18.914235180358432,5.718878485640486,13.83339512168256,15.614615171617054,0.9166239833816325,3.70257558085604,16.370797900156152,9.295100656895045,14.433403650416054,15.062611629295382,5.178284463199638,7.967688036503131,9.013667401437813,0.1313223450295009,3.320976133952258,8.287390381329466,3.5588946137908994,7.407055471745467,7.329949534332423,8.59850972394323,11.352650990360221,14.327582562277271,0.279983445392209,4.212228770392246,18.53619382402873,0.2472584681392087,3.823281137920973,17.729556128135243,19.938767815140984,13.455735903527763,13.71898019585684,10.77129049789792,15.676438958908395,19.459817511964626,7.235389494902464,3.5417864966867185,4.015734750180271,11.122905159339265,4.9049975618172414,2.181553910391445,2.731859775969605,14.536390319798866,16.41450782941369,17.92712266600926,3.371902817915049,19.364115777945244,3.151669454846191,9.429185239999676,10.179187446661029,16.352454644855634,15.547459811567093,5.5300543871894625,5.005308414807703,11.84254836279026,18.949410418268656,10.744973813649032,5.832988197725184,19.209165896707027,19.076908057542564,17.83410610900944,0.9054500463396442,0.6837663802846805,10.129352077152568,0.6331401605023723,19.358314946931575,15.338927052525957,9.90299298119702,12.915172681816532,9.46689684834781,13.292664371493137,10.323361909802973,16.027081266339117,14.388955476792816,14.70839912156588,10.042339373035292,18.000779161524115,12.793205526100046,15.090591698017235,2.950264485367571,6.829839053673252,4.97306075116577,18.573838258605797,9.02520899220626,6.748814563356431,8.699587214914724,16.188217452249376,19.571864679878892,17.561632932945077,19.2272443014682,6.632696353883638,6.387004903778037,17.87789144235616,2.504826034978298,11.12997373832744,18.90841391161869,18.843723069419525,9.684603370576216,16.057682529187037,4.940095282629189,18.3349240067424,0.6751002469130363,4.801371966949612,0.8279318120990142,14.877949168513375,8.474379577479421,8.3289219323839,15.011514845877194,2.0773905731407805,5.612176085783713,6.489999310716876,11.529215062425934,5.558784025823593,5.350839102918465,7.41964695145287,16.60641556961119,2.2136204323744257,15.548120054450528,18.719426931436054,11.091488486011576,0.7645270390223446,13.696851680796328,3.3713594738478925,9.802713462309868,3.8330425621458053,6.232514959017528,12.475031249246813,10.689360750412504,11.432396509023857,12.244350818710622,17.00111297316817,5.079227452920025,18.78550523418248,11.576158872451128,6.328956089629663,11.552336639617717,11.283905525321423,9.483345195694506,14.675348855720625,17.617399719357923,3.575196618953429,0.3095411008460136,2.4643247718519135,14.020921512239578,11.060401160831749,6.946431449410508,3.752279648356258,19.80319389224308,15.037353168885161,19.521998367607964,13.370536081921651,6.6846123592736095,1.2805189509162984,15.772222143981768,18.621993296929027,10.38288634268962,13.154650689308163,10.592431749306472,17.747253522221676,9.758210583177021,9.227177912609976,14.889521654195406,18.122303166858586,19.29932101444991,9.140131707672246,14.923196170057839,0.5784518772430092,19.615275043804665,19.280679499731576,10.70599352567859,0.5966405779114048,10.730249005716047,4.47293380328289,11.11127917180568,2.7153153705743405,16.40563886409645,15.259226921415268,10.245930931997176,9.391068924896985,17.438153354703523,10.601778921366215,14.909223625436026,8.075335392313917,6.369580506203767,12.76272549859669,6.769026295603386,8.306745282541016,9.215422595478744,1.1646288897175117,5.491994214489648,19.674149518289987,1.2143901241354182,14.729818719439645,3.8017213356247925,7.205623201560267,4.013152518357561,15.576215531742982,0.7130543693253921,2.1769637104898765,1.5569108140862387,9.475867604959443,16.496862354405046,17.885297383570233,19.277133874580322,3.7684983079744105,8.122332423886508,8.790489306187483,17.036969246952175,0.29330890884433636,4.7664549082233565,2.050382627132903,9.582414083945036,11.46515011385386,18.999209468263242]}

},{}],70:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,null,0.0,null,0.0,-2.5438940019026086,0.0,0.0,null,0.0,0.0,0.0,null,null,null,0.0,0.0,0.0,0.0,-0.05558169711944592,0.0,0.0,0.0,0.0,0.0,null,0.0,-0.8511277230892598,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0661467788890189,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.53259139680059,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,null,null,0.0,0.0,null,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-2.7908811500125297,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,null,0.0,0.0,-2.0126047137886864,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,null,0.0,-1.2418902153680857,-0.6060533040261825,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.6484814369059533,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,0.0,-0.9038908881519445,0.0,0.0,0.0,0.0,-0.7032062775375083,0.0,0.0,-0.8023427881162558,0.0,null,0.0,0.0,0.0,0.0,-0.017830142298556468,-2.2549448393472122,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,null,0.0,-3.083474466208626,0.0,0.0,null,0.0,null,0.0,0.0,null,null,-0.22249648743231537,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5430832408543005,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-5.0685597734440355,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,null,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,-0.6484880241064115,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,-0.8268635238375838,0.0,0.0,0.0,null,null,0.0,0.0,-0.563001804805973,0.0,0.0,0.0,0.0,0.0,0.0,-1.7235039579241525,0.0,-0.2292173718620989,-0.6996434659601097,-1.767086350157254,null,0.0,0.0,0.0,0.0,0.0,-1.0437719781064054,0.0,0.0,null,0.0,0.0,-1.3714447705060748,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.3707516506707614,null,0.0,0.0,-0.3468620196432536,0.0,null,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,-1.7785447628825213,0.0,0.0,-2.1854345079699615,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.8539671499897765,0.0,0.0,0.0,-2.087841812808828,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0752353543413695,0.0,0.0,0.0,-1.0356425867601158,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0704247682488557,0.0,0.0,0.0,0.0,null,0.0,0.0,-1.273087119708641,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,-0.09496917888505203,0.0,0.0,0.0,0.0,-2.197806229371761,0.0,0.0,0.0,0.0,0.0,-0.26215143277624836,0.0,0.0,0.0,null,null,0.0,null,0.0,0.0,-3.555793842834498,-0.6843283808521838,0.0,0.0,0.0,0.0,null,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-3.2520132784694353,0.0,0.0,0.0,null,0.0,0.0,0.0,null,0.0,0.0,-0.30664939537661506,0.0,0.0,0.0,0.0,-1.1791861217827846,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,-2.4386487920604125,0.0,0.0,-1.2813610349921196,null,null,0.0,-0.05689693370910953,0.0,0.0,0.0,0.0,0.0,null,null,0.0,0.0,0.0,0.0,0.0,0.0,-1.1447151789910706,0.0,0.0,null,0.0,0.0,null,0.0,-0.8635948921741288,-1.3177878034295734,-0.48337870582176884,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0196451004367517,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5245332628261455,0.0,0.0,0.0,0.0,0.0,0.0,-0.36995712081351817,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,-0.36250135914830817,null,0.0,0.0,0.0,null,0.0,-0.1901338205794515,0.0,0.0,null,0.0,-1.2226544463073765,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.593292578762287,null,-0.7526232239257941,-1.6166064663383588,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.3009222712921508,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,-0.5482122378342815,0.0,0.0,0.0,0.0,0.0,0.0,-2.3789316847513478,0.0,0.0,0.0,0.0,0.0,0.0,-0.8261120945938444,-3.4509988168263837,0.0,-0.738624821450313,0.0,0.0,-0.4848038956549665,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,-1.0741171393810225,0.0,0.0,0.0,-2.092483935963707,0.0,0.0,-1.1951396062406872,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.577863253244456,0.0,0.0,0.0,0.0,-0.168224879532957,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,-0.6210208272502487,0.0,0.0,null,-1.9688667349916946,0.0,-2.070176227752856,0.0,0.0,0.0,0.0,0.0,0.0,-0.0972789784972207,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.2222955912098938,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,-0.3133794121080495,0.0,0.0,0.0,0.0,0.0,0.0,-0.8638239752514717,0.0,0.0,0.0,null,0.0,null,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.8130105569525445,0.0,0.0,0.0,-1.0356094242374494,0.0,-0.784144618770793,0.0,0.0,0.0,0.0,0.0,-0.40166521368709546,0.0,0.0,null,0.0,null,0.0,null,0.0,null,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.27233223408295,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.18951821060985183,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,-3.41331443068476,-1.6841425273657258,-1.2003820121216262,0.0,0.0,-0.13586825424295484,0.0,0.0,0.0,-1.3439270816949849,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.026034948010322995,0.0,0.0,0.0,null,0.0,0.0,0.0,0.0,0.0,0.0,null,0.0,0.0,0.0,-0.38536278542540114,0.0,0.0,0.0,0.0,0.0,0.0],"x":[70.37301942129395,54.90302210333009,89.53885906245648,49.84648145421775,74.91249094692233,87.46120808328364,97.9096194479797,41.12344726254496,28.915720371086138,99.15346391137716,38.01684160237049,0.0018152287976302972,81.65585261716078,95.00484858501628,3.3470592289329693,53.06347694494362,0.5401152789217489,90.44261521167402,4.969236990150705,56.29290245930181,32.69608392304488,12.328472491172814,43.19163895385123,88.08800675271067,28.637027568318985,3.790537098511315,5.034041219393082,2.9987639041197056,40.64459455679519,69.61101677076638,96.0794464964242,43.20073710680718,35.76261635009601,29.33876842882541,57.50859616483381,78.02566171519791,53.25444198494247,58.53772482578985,16.999538966994777,75.98155677781395,17.437465927501748,75.33502988329946,2.0811395472505545,44.16570015721186,30.45582370754596,29.354095971320593,98.25244382837927,73.78481257130795,67.68567576537139,69.00596386077385,89.96240569660073,61.805673384484884,90.70793452717889,13.267559679662376,0.8384078043297993,74.62621947023662,35.8392841413228,49.71755088517551,41.93579763587925,96.9921471324521,50.342866979253344,63.9967685063715,63.37789009832604,89.93552585503461,82.93459879310758,86.86348915462696,27.244245068768503,8.176740547670192,56.33877439294661,85.42177504348582,43.49187372521071,82.55700252347656,5.212303424176978,32.72153833589406,52.731279908636466,60.26113803757853,79.1115712558055,46.4728586576316,79.18507741733517,44.76905589067957,61.28404015934401,3.099130620928481,90.00680934073169,70.80458206024687,6.889429789560908,26.517189909757576,10.802735368119155,92.12566508176711,69.40551714302548,68.28209428224648,29.40278017949305,2.887205861960296,29.58440486570153,39.68379318204936,97.07375022698098,75.43913113497382,31.621530554245837,58.62914003282413,19.7810696854136,25.939833879168006,86.75196459123262,7.657025192864708,1.2969418029326496,13.496191041956983,95.89962922035163,60.57959567654125,1.2783115429529923,11.07381214328209,97.95471476716446,62.74890707620304,87.45912186139213,58.56090249323016,51.31924250667996,93.59946822546164,22.166397515194358,87.87537322249194,11.221130911127686,52.20587570960542,41.15578244922884,91.01955640157064,73.67597753686906,51.90256230612884,5.1948778344866,46.52557205834924,16.89573266449631,31.455930676601106,30.843834827317806,61.8587869185264,14.18815424998665,40.17414028802897,96.91590818239364,11.3794098840454,63.50895258545046,41.10296954308343,16.098384022514733,48.684955132906005,96.97165052307372,70.59442110579808,98.79417679813041,93.52825578487005,26.358449170758114,17.852195069741008,68.73861367883518,1.8291462789766344,90.11848573885635,88.27618387219292,37.277362568182035,37.3021678699349,5.877911139237901,95.70118745894322,10.767689542241143,9.077479972520619,88.57468508497305,61.10340902156468,97.39624622421947,45.42520130306791,60.87355123724549,37.19041469350797,47.57816641916111,92.14892433060488,38.58879619337357,47.619065900196645,67.35221246603255,42.079531562879914,62.16391722320029,9.821506755090038,77.66331897076188,65.05937350183599,84.084382410945,45.709915343173016,46.200032301073435,81.28501225289216,76.31291366506352,51.79540556087954,83.74378898395743,96.06060508956998,59.07499359267503,66.31945576911191,73.54983974919891,89.10932445707375,71.39815163133925,30.482571263097547,23.21061083936451,85.47639365955784,43.84606558196038,44.48918301406617,93.84755413689479,38.69141268175471,32.8883576424998,50.47054896550471,72.62290679855987,89.13458845386084,79.44180719462166,65.09989726184473,17.215778990475417,99.5625168186417,50.183543289357544,70.2142893382109,9.273686805083026,78.90159534820056,16.608013932152588,48.609083582766964,47.83983584923968,72.69192425367999,41.091977530293434,67.69399688845064,74.61623446475801,0.35433590033298046,74.4259897779238,9.632845252205048,70.26499944521525,42.784610843290615,62.70286326431182,83.79124010217227,22.139398200474215,15.426588854471301,33.13426535918818,73.47842947660193,91.51716002534882,60.502421420063904,24.869993020942815,79.07551750110969,33.38314574870318,22.031235806626025,93.88363892251326,1.6419609562369875,38.8924107283116,57.57431504455708,97.97389932120832,71.74296637337589,25.615365003835254,9.109428998048541,59.2550419706358,22.15091758277157,31.719637666958867,51.653088046720306,58.03915498140473,87.57950874769828,50.654937271351194,90.27680550482928,4.948486144274433,83.96210524037333,40.12963932359514,7.79573296233822,88.25882774927018,18.026580544227812,59.42772013412936,70.90262706964133,15.672191997535844,38.92834241176531,0.14603508126116438,68.30990941309749,83.71915572935873,16.48752622091889,0.7626972593257619,22.46030279459108,53.64607517029278,98.91713835073459,73.58238436617597,73.29402969085932,47.31847089813259,88.70425207650202,58.79883416280622,88.94290743003947,19.31382461911202,16.780345349509783,15.800044577318385,64.48626568647471,57.962039041201095,95.75862092661981,73.04918373614497,95.5395375983288,53.58995257123718,48.654877199993905,74.86548386661784,94.98021146992765,52.64265409849289,63.420844952964295,95.43808173287917,28.53845421787742,60.87147008101883,10.076870886388466,16.22978929901786,2.646675418734623,34.07133079528322,98.03134342413173,75.00046501768934,73.43320732675753,48.15176851479972,53.1114719996068,65.59949637737428,28.93221208146175,23.637090801829185,0.1944509425436447,85.0993821963182,83.75782630689197,56.6441255363104,72.54806997453313,33.53860216028155,89.38473030195763,49.380565351237806,24.63796096972184,68.79921081886206,42.70961449905426,68.42082877283211,13.92564131448102,28.25411890529064,58.31992408910318,70.63236133794561,52.38696314812048,10.178072891474809,48.761151958620566,60.31302535114249,81.02830852206793,84.31102580490177,25.08639959194312,90.64904115285603,78.23744957621699,16.43717978951358,2.1541162995894814,15.185379348511896,47.20428097658236,77.86386635274208,85.99635756302095,56.185722483133674,13.107402146202096,78.9429699357734,68.44951023186188,38.85358956936924,83.90128542150927,88.68233989063728,94.93930256484202,30.214830178338037,99.32860539954108,79.00252191476585,95.00316379570432,89.55010410625425,8.41633985315806,24.57878844384147,22.717743531751466,70.96347433518855,6.363850161223117,34.934901319215086,97.30250719440309,32.22771889748213,69.18963756473062,67.3422322522922,99.62198757977933,20.480733619084447,61.19970751134274,14.789671278404736,79.46518947033124,0.44720586550632824,5.1430203727835355,11.535023202744332,81.53047373766196,5.814352397949607,83.94344393855214,73.88682655619448,66.48491787119409,87.04375433484266,31.655398692646976,27.198413940493047,3.206491293675051,13.687252806927708,11.394483791210108,19.51574980408468,7.686126345670252,4.7739686938759185,60.67571181115285,72.93537867337541,50.033351314787055,53.166124305661235,47.63365015058212,18.619732989994088,96.73146670516029,96.33142270062365,0.6826432932217852,81.59112659649435,77.05161184829291,4.24179743919304,61.04456082494685,79.4912757097181,62.70423012336863,77.75129198550268,80.68423150951315,52.856352899399624,39.5805031937146,96.25421512441189,27.58104623536566,41.00102647017412,99.10805122183592,11.34378580867972,16.17433269595827,29.99443348736004,68.86257959542736,26.737646009202987,54.35587468645735,9.084386081028217,90.46273780538357,52.46611310331506,79.19644710302374,94.92445366401392,74.25932382093919,2.1859630879527803,42.74762832036394,20.35960651712585,8.366609463111608,58.06403043940143,24.609831420922013,3.914527678651769,34.19176953259826,55.06899680549675,16.21029684890587,56.80667089949771,76.27642949000344,78.1783325776943,52.49636731350185,14.435608131704658,59.87442556412219,21.513769895183543,22.23990133300422,1.7867105181237797,86.07622132777344,42.90855763751394,65.89326110058799,63.938984451200255,90.89189351363758,71.95391886454807,39.698796261374355,58.811986548105246,72.62193082538977,18.770571750286337,56.60778071105026,45.46620118255549,78.2478045065678,26.152963197714673,51.9855603439106,53.76228288879701,78.44593728314355,46.33471262748034,51.65522311484263,72.44420289869915,4.726483782286239,32.81971689998615,67.65676431089034,16.680174526245107,7.452132233435549,66.17013281604451,13.52670303907615,98.3961326526298,34.106978472853,31.10688140965525,77.8203936274956,88.19350969780606,69.48904841211292,16.687788391760705,19.931506408426912,60.73065886244211,85.1713575352361,44.4103282916281,2.512637639131743,68.33216186112247,59.970779503351814,6.442468199282048,10.054083202813157,77.45582902918761,57.96615891341146,33.441848323366855,47.04100980096846,52.84885761161602,43.97334090767595,70.77969369347801,74.57690964624568,22.703468447618324,91.32589705621747,62.410500878066564,72.07873707584172,51.14046448083662,12.102965562944835,76.7467925743212,41.49281102886739,86.0426279274484,80.25544911910474,97.59587357479388,40.87266205449187,56.251215910274574,59.514727715305526,14.45548585492238,72.32619757348782,55.04782436359959,55.25085548335953,36.89798372482689,58.6518901161998,40.62802121413098,67.01870823646703,97.28701149775503,18.220106817867944,48.31596153379516,40.93688796429824,80.55038131259768,52.46861292963367,22.17198361769668,33.46111828564351,36.752819810473845,59.40014560231439,18.21799543923186,7.87396816520487,1.0925477328235678,66.03004217202162,14.787795434758365,45.32349444326997,73.58304369158009,3.0558528744542235,16.463176317683637,79.7852167288821,59.299901470061236,75.06990081182106,68.21008841461966,1.4946429496262459,9.053504481775354,83.3152424324564,8.487914429472522,63.14660288169518,65.44583344811956,83.23715037455423,89.13277923077254,62.226388516312724,89.85172870866353,31.970402102895747,11.481005259521249,20.068886279536933,25.41713006541848,39.02937536328422,4.259567343926163,61.13211055991998,18.104597601076122,47.09283901006005,3.2032931543195975,20.01490594672155,47.355211639575565,10.964838474308824,76.00431333740474,42.09432353186558,23.10887131472199,89.09977669388883,13.797703448054243,33.34603128448907,70.49956940951793,49.44691404175641,88.92042102511026,82.33539698301561,87.51198335643555,94.12888152888486,4.036100892464489,83.21558708081464,80.85119262366874,93.21066467908521,38.77075709410867,2.587658141446103,20.09324795999341,94.80021757418382,11.028942797998042,15.80299805723242,9.821408778516606,70.87783729903141,23.517380518956355,61.03152919270454,83.15898517538017,95.61150628870729,48.14694399193999,25.728443689149483,15.89481054808295,0.9021886425048198,32.90944989570801,48.10363737622052,37.2023846005183,54.76772461362343,66.74637161652457,45.85935048615677,11.443678693941873,44.69986886696324,35.70090332376488,6.412427869414361,57.35435936625235,77.03685318833395,13.254253433844143,79.88154637951108,11.831150734744167,8.658526532629285,30.754267254505518,67.85851057657351,36.343558834321364,69.94453850501867,44.473781432942005,27.534224764772762,66.48036129297887,28.410665338682286,86.15147386203984,72.44868399439304,38.19047444971855,42.096480141977665,61.701874314866465,61.65502487467687,61.228090147964956,20.366317616766416,61.92297768998705,98.23636503939844,39.90514310135869,34.46285830728617,60.13171239909021,80.47703461122013,82.16906069997421,35.85934713289265,80.67587553158711,53.04095559678086,54.72074446180657,14.89396941903809,94.48453564200369,59.38421192924528,32.51937789157333,32.95951112933027,99.3671293910992,58.33575441144312,72.9617509521653,62.772651110435774,58.15188479038946,12.644639880336083,86.70489598922157,73.83266571774243,72.79642001256599,64.65579792025906,92.2104791987143,81.6226244490333,30.09082075971068,38.54117580222225,94.06359331068712,2.4950523559560622,40.23785883669997,51.821754111791975,13.813689632025984,54.93498303694218,82.88715427857325,46.74617966324806,22.947376631531146,1.8357633564399345,92.55576302888304,45.625640287119815,41.62028964871212,5.8061980925166345,88.4183139788407,28.369574987586677,42.91549133886634,71.49971758842493,5.485120591404891,14.281289087879445,17.644509014387012,26.176607247566473,6.7995201070797595,50.14720485846726,51.06912965426038,88.47594476389582,29.14102451390377,52.900095406866974,62.956475550957535,67.27543961323947,15.113840255200017,9.052761563337919,16.57586675687117,3.3910734895616246,59.508167032222104,58.97517902375198,92.50569176071133,89.90548243243765,90.88108317451817,33.07806608606256,4.726057988020882,51.695748425462384,67.0157007150196,17.59376010139304,18.57087862806872,74.11701841958971,73.80589867391035,23.788182641421464,55.51049134657398,9.960846475066676,76.64016136730964,21.746433685792322,86.73415886601774,43.60217089294747,94.05164636014085,32.50338443845311,61.84908958616519,30.002155960180232,82.38999383178695,20.35869901985712,36.47648562174648,66.3297516291912,7.323222806402274,62.380713197568596,92.04825883553325,89.80835597795817,88.44731430344872,27.620286152421556,10.578730131945612,78.08023902456036,7.3579061884503805,41.03003514447256,59.76348253554331,70.50523150527826,85.93100764820976,10.558409278681724,38.71534815357809,42.30887117114583,46.34473271016324,56.52220992704442,24.68470879542073,43.53642604922343,1.8296596751455452,82.5674096401047,73.3432199466191,24.19826395315081,93.25546908831038,46.11286358493023,78.31637767767961,27.70220714177949,8.468146747856785,73.34914668828536,10.261663089003825,59.26378287662162,56.84332779899861,30.2630026467958,83.52886858941973,94.53143130610277,45.83357792604439,38.84431189149677,31.477274640125287,96.2615979046837,43.639193011284384,1.0935452227428977,60.95968638572955,65.91976508347707,90.53947901070008,49.30184166973524,98.34909751236066,76.71538736159023,11.44520205863162,18.80744583842622,33.79297260355296,27.879803059848097,2.4507397627228533,89.97113336261815,58.69491356440826,7.872505861205115,39.479535367044875,98.0434156612846,65.13422276006149,88.44563356419408,95.38016674980216,63.47497517231033,70.70127239880118,36.928909126675194,64.20076877151118,91.55010753173005,95.52939150447328,46.94161368607761,45.618729578580044,34.92476145517034,84.36139136947622,80.38286989124886,2.696019470652211,60.25021608176093,87.38350677677127,20.44871113898823,53.63748747825865,33.26336560098038,44.60622578361719,13.090777596157066,99.40280110705311,32.721350447071785,44.89182046325866,55.78330253693275,30.324448320511355,99.32694110493966,94.35690398724307,46.8997820537691,81.76072929432567,80.39709680527267,10.256056793760582,63.1242571701246,46.106706604924355,20.372919067454376,85.50900090582856,10.278002911539396,82.8819961146803,89.08159578685566,12.19608788022899,9.103414546488198,90.8505972397973,15.989181485432535,39.31608807386784,69.22433446420249,73.25652885307541,61.2223846286434,33.91745136632325,55.96510955940111,13.416999708346244,53.761406052522446,62.44018216335798,4.999319405150793,68.23078959265342,88.91882086599037,77.3282788746926,42.95717916783628,57.48814106143616,39.15785242289538,19.992660646355386,33.87744622480619,82.77888419297258,44.24594351954318,35.07687792254601,53.356746448155,67.00094760668358,25.237677317368835,66.87104920278438,39.25167999879389,13.724539038956252,95.83104511819181,27.70021259447464,98.07898952855776,68.85225567369386,60.61455783758605,3.7145716273039087,52.84778481958596,84.95524431052874,80.70933278922865,97.28216138874292,65.76160309210708,37.5744851003015,41.31533893669088,31.255351996210145,94.49973162975111,74.06460646403654,97.88046529140834,58.76995104008114,95.35792527538626,37.32993555401465,63.673894716783444,49.53933759699352,49.42385695569198,6.282785252001033,74.07320363395083,1.572227099115242,25.756115760503008,57.36065993858721,34.127924860884804,27.188990145363444,27.35824290846618,90.28471142373466,80.07156251187935,95.51585214982371,25.707065183873667,90.1339878588915,12.746146756494948,38.47569258549508,26.148785300053024,90.10314117205469,80.38734821941134,56.30971927516026,43.26873952230363,77.60174951558496,33.147809215462345,14.059447796003743,95.81395504273095,55.50752851667793,58.730900826340225,7.492095886280747,52.49907666527089,11.260643458935382,91.59503329314278,30.073825648270947,2.8373912268236934,39.43222307865031,96.279678717566,22.290461358227496,58.43134026654268,92.16420695045852,30.96323891858155,24.86114107132209,77.38090117196157,79.82000278906834,54.88647584983644,6.533460935204283,55.349855262632296,46.70590616275418,34.01578265022906,9.616536818123155,79.8546901449345,11.478914418762054,58.90341763644087,69.1646417005097,44.3654100626724,89.89506051198981,93.89190124927708,17.68190077237881,71.78170947913829,38.15434703352689,0.06388488567639072,40.884430648244965,1.5545711632965808,45.407018646019836,8.62454461556663,93.26525363232744,2.1062800943880022,76.28740430828617,53.453033446679086,78.59603540362647,90.03235925752429,4.159063423584142,33.70477145976069,76.88650699833941,70.13999243940646,55.92231447982377,91.28617769283265,70.26040418640194,14.123062114366046,12.251791430334658,34.43030238333289,85.78409512065868,11.377462363154688,19.242536474939055,88.43015959327406,72.4090552603054,11.226838453448696,49.31997622009652,66.90936863604895,30.779814722459452,65.75613708646166,69.53024908831816,72.69748607760289,36.99271947494574,11.067384820701642,83.68790022035968,59.50367360339974,4.365651503654777,73.28681407200963,37.341818647492,96.78539311189995,67.87978691410717,34.64210734648956,4.6122837658211235,20.810970760469093,6.587010941947646,60.7581232220898,82.13200625953374,27.02753200641512,26.394995455550706,92.14714953807355,52.59733341658268,9.910046391479366,79.43498906616844,64.66076320016623,82.32692959473601,84.98884380447336,30.743212975115352,38.597449258483806,94.71214763553854,80.50734424486798,29.286819716347033,80.20530787138229,13.366395764239659,41.76144763496757,12.261962262119486,36.17704323981066,68.83609522265259,60.114107205527986,8.278902621701857,58.16858903466229,29.71357001182362,76.28148614832149,73.45714330758157,79.38690693513115,4.776198662933551,45.57602250815893,82.26519704406931,34.830409346126245,58.14897537145147,51.87784096208843,39.607823964062995,3.905943764728792,51.27926277672896,71.87261349755933,30.197163823185758,17.07312011975608,25.969135977410353,96.64292787824287,67.89702778640473,28.639389252263303,89.16806067581066,28.627224925094154],"b":[33.89818153503518,7.137706696253079,16.320807886661825,26.682227718621988,17.648744254326726,11.201364423275297,20.249982091069597,20.45050903931088,26.626893598395686,24.691402664184608,20.354941159182914,33.1932629637672,12.475652917775397,25.929072138332955,29.248443718831812,21.11789395315376,36.03966959602576,24.30272203043301,12.898712205896192,20.359295785770968,16.723834476192504,18.942472542778088,4.111923705952036,20.55922118709529,17.239542547975418,6.619676413123221,24.401059164530373,15.151272817139363,22.886918826744544,21.11986437093304,25.81734067863347,24.951397755062956,36.77252499994568,12.219706554007427,9.783379258810147,31.270712632958702,20.118797759082806,14.870867831989178,20.341653727773554,24.62820428711531,25.215567187182852,16.44029596194558,30.310065261590115,33.1787581195543,14.237135119226446,15.127260789615615,29.299181036268088,16.711507249285667,37.92366226612285,28.545650342150964,26.529220418347602,21.997744205581178,26.244928100517665,17.836043272156783,10.417397624448185,9.657703439474723,24.074813520943923,17.095256374539456,15.706279616102963,13.731438501071208,17.3470392038641,9.194997956180245,12.354093861303582,24.423678940770998,15.429661138638064,25.859950016084614,35.46415528570958,19.256358396318987,11.773151284347758,16.28245663104222,24.974506649615563,25.391202400367703,4.2718654147405655,15.401624209913013,7.4978075458492555,15.547058355947385,23.551938842530912,13.70344871374197,29.946263278815103,25.626155107006156,13.269798552054755,29.344751755145765,34.27950970505172,5.826095673083733,28.548791977219167,13.197019894552643,14.777296759311955,32.66659590779259,14.326131460245444,25.802924544655326,7.567278243767674,20.560714453823074,13.832102466988822,27.2239750265617,21.51468138487033,38.37397931163497,16.859819223415684,37.36543825677437,5.32018842559407,22.114561848071567,33.864130427542406,23.48913522645968,15.472361691807093,21.222485311218207,21.143758930744486,6.410779916049654,17.854644975944225,33.21131608566568,13.133326390784568,32.528119911160005,12.77640205689854,11.861901717690335,34.92347325058901,13.932903729791214,9.764937225526978,26.112543903592666,20.808823982883908,24.346327563462232,21.810234798091898,7.579696085636427,17.453152195796115,13.548013263439383,22.424313315347614,23.142066589854608,15.834365091379109,22.226498500975232,21.638418653637203,24.68320979438152,23.432529180897163,9.603626108486939,11.722492141744048,29.25949691124625,16.325527069571056,13.08446833945142,32.92526354495714,17.89980253573909,31.16704243568383,16.084477577571647,13.99981960073745,12.981270669007557,14.951518575216248,12.320294854819211,34.50021076290625,18.479808863259876,17.0651880415409,25.415893464862627,31.183647950580742,16.299858408004837,19.62108635569967,29.29496911527273,16.625484959036953,14.857829738804913,14.492283268045743,20.723653641844848,27.321367063102045,12.311738971071179,0.587777543934993,17.089453428187113,12.758324763495693,16.754352288998675,9.710112846871436,33.09688510265876,33.21049146223806,8.845717443189445,16.205602965008048,24.446289979281723,28.184831636895403,38.44005060975042,13.384927872741649,26.366274137190143,21.261565656617258,12.765565734617294,36.78355113793532,16.52691371019684,18.52087971670485,21.196036967497545,28.36853711826353,18.707872960825636,18.641966720448963,21.667822100371904,35.06857720533514,11.170530791407554,8.106142715834089,13.995761568609858,28.16281106827202,14.10292029806059,22.6247850898459,6.888340912517719,31.66280263597761,9.018739315896166,37.12106226739856,12.772694161135494,8.50023021774093,26.841537653049016,13.835345334434077,34.059374791288285,0.8459836038896684,21.03383508488781,17.528251259811306,16.77211281406871,24.440870962548768,16.409411951977905,23.11220924296745,18.310277503035948,13.408751306422673,12.346624172679812,27.454406263990165,31.002340686993477,23.608297670002454,17.56870594399231,15.824589936608016,17.812110319205026,24.62747431527699,25.186208912348715,12.205143047105183,23.88174770697062,29.51672475813279,25.676855380800212,21.426117516009334,16.213565710490624,34.77296143605601,21.027748104842885,23.978300837688447,30.323082142348095,6.128245718924745,14.311448948119882,19.401702756054195,13.133208179040126,10.807149085118816,28.734436335124744,25.962375385361554,26.6845855555404,9.05382724160743,3.7257791059826895,18.588076377016666,29.069817600257156,16.057891248356473,16.13707404513304,8.50252652236557,15.542066048202937,16.16148859108288,19.0787578323149,23.776483082459563,25.702780699543503,31.441342150146376,35.95844319991717,18.232670520212615,10.471045099337104,16.79323690857347,29.1891487495824,21.8044690918472,21.514830082206675,22.009401644609117,31.940240783370307,27.73439137113899,24.15716484088517,26.78098893716632,25.435271716255993,15.302425769227606,31.15419647086519,17.590074090262508,24.56041950150744,28.398604112418955,19.451008228697734,12.788795343498851,10.41212296830114,5.105736949622739,11.714952645568328,32.811347897185776,22.71510942881026,5.140211295620203,14.886650915436569,10.729382561927725,3.6148304356511174,22.69253896421218,28.524734976699254,33.597677959368895,26.870905964259183,25.01690239910259,22.45845518800433,10.781802805872802,16.774832601853966,11.283482750037566,7.579804644329173,28.106551702649433,26.137939663341374,34.51305610030034,5.009812219011041,14.680413900959305,21.616480027208013,3.217450180375949,16.217107980104366,18.09281598588804,17.98086559482929,18.16228082673112,3.544431651101907,18.29752527431271,11.873391253331448,16.590364105542736,34.68442603290449,5.516845478416328,13.298503624527864,23.039176846659053,11.191367050467477,22.381151828541036,11.993198645553766,11.546598388950589,23.96549161066788,30.698873876554174,14.092416929525822,23.184036040817574,3.7510396242458732,30.421997097915458,9.906980985109586,21.0857305993986,24.450487075231237,30.906671345888896,20.07815513006581,36.75925291047907,23.759493508611527,11.486857953157559,8.842231975482754,22.809776684698363,20.04055751828121,24.741387308503608,16.405938528488054,26.004279041700382,27.283098050273956,27.713342259025843,12.572774564351512,19.10740113853137,11.74235784441224,18.106880245527798,9.021702619483719,17.17402334071304,27.241944579143208,33.94743034666054,22.971070182026736,32.347511073048686,8.678056912437766,18.614309021079585,21.50442901485186,20.35498940906522,22.641324832979134,12.530425068298001,17.47579490776387,18.514730539925488,24.842702241265027,25.916771087459683,28.88572486305826,9.547341915921375,28.352402857460344,17.39496724689963,17.615344402597177,8.29879963520507,8.431251549915103,8.739647047484187,22.45892104670029,24.242492110711012,13.663034618097974,28.09939913278523,23.888833684665446,18.73939387967434,15.411160335757096,2.3829865610010836,13.078725130564766,24.660072009186393,20.749063588739943,18.381146187658334,18.517395599684075,30.13926637419277,28.88135727953971,14.383619042341333,12.32419091589625,29.315221675661817,29.01978428955185,33.66087847631545,4.741084451988993,13.70235192930263,24.523090287862836,11.458058431460584,17.645178664640422,27.036050120390456,21.759061316010822,2.29395175064238,4.928119810305178,18.15513555562343,21.403869913487377,14.278918195986229,16.86589340159708,19.721092727195252,30.77187093792359,12.973422839006293,25.759943751944785,9.462158000857475,24.56793566294049,29.69553322103476,26.814254003808074,33.73230014237727,21.905922672024722,28.041611962297527,9.919724300542718,31.41470402687316,23.563580813143872,19.82261342911239,15.44804661541377,18.81888148310795,16.124108374115245,17.58440747275917,12.40195796475999,13.256047029331866,17.008926772388534,12.106433116763835,8.320013407243474,26.143906348416344,32.316866286855074,23.5203031443135,20.86440986644145,25.621124388547365,16.071696663498287,20.749150228517678,13.873900707564193,10.976885388065702,30.852614544027556,14.729557274299978,21.89899473267026,12.482814174601554,17.9519124095477,21.34387994561626,16.81016703244409,12.68927254004248,11.634900176433803,29.065789108557567,34.05362516020546,21.91875238715945,16.860859722197187,38.273788125856235,35.604788457333164,18.71935643993565,16.283212078953596,4.31450772743184,11.62624857763296,19.444685428530907,23.148500103407663,15.533398974614073,12.002947622376018,11.15485181054057,25.718691115439057,6.981854704992196,1.5328468182532884,27.072389317215553,16.641724539792143,27.717651084802057,29.064838325582393,17.964475400168645,22.235979656848805,28.451053581388372,18.55675974148503,35.705685677696636,17.590973574922124,22.567198578297784,29.03948587958997,29.42449766258636,23.51033726733286,17.14484411578337,16.057781499249188,23.102130193855537,31.937266995706437,6.955040789298366,14.164769874306174,25.62731764992754,24.396052321999587,30.650510881588847,17.707101446477694,17.423276361615954,7.6846250163844365,16.004382684112013,17.333691012954393,11.934525407847826,7.3255504557663675,26.525091435998156,18.21276320419566,14.540011438428406,22.85625862942937,20.97040654278497,20.172845043496412,24.210963099120654,5.019610593735426,25.93213431257101,21.01322064124982,24.952484268252153,19.233881732497856,38.5870189782137,13.301892532755769,16.707766621034054,15.393803485655381,1.942142579974151,30.37496282938975,23.58194910745467,14.360180051462459,15.50106022586192,27.788554258811217,13.133285936448257,37.86662272440347,14.11490562565237,16.300733645106078,13.887682179244552,19.617825995389204,20.410368631541505,2.0500011891633507,30.587097071562372,22.726868391160487,19.40905352201466,7.96482311973262,17.92569962409981,11.881270661798489,27.41154469788752,25.30191853659617,20.465521179923417,34.64651034637672,5.896071197878512,15.722372585392206,31.687076264533022,23.303409690161757,25.769094919147328,35.474171599565395,15.440999807050671,4.756812813169589,9.721339130259574,13.332471589697402,30.457960754056742,15.642719848847971,19.996928922531986,22.36229261695668,18.70849046467246,9.150257646434445,11.909399894463476,10.130204016824873,17.55140137325679,12.481092383191497,18.08663344848256,12.334347116568662,8.80323487387011,27.722492843945776,20.132587240646323,18.902561074961927,20.125462100354817,5.319717033658469,22.196790293120877,5.551242270818637,28.34753212222245,26.673476536216903,25.80277693981034,20.99040429075147,18.639245543362797,18.643225848284924,31.36280247095765,16.174370115813534,14.361611570865014,19.491531777984154,17.85943775137533,17.06139388660412,23.460470188771147,25.687636225075423,22.811646778784016,18.645710108980573,24.604112311241177,21.662800624422594,23.522828437791492,16.549861082769908,13.84768123173379,11.418688799830118,35.88690158364214,20.045172127429176,15.98063085453061,13.5425268586737,19.78062546231326,25.3782662197698,13.97337860474976,26.268563514921624,23.006890753972897,14.591414351296175,7.763807642861034,18.98398497137402,10.625729753582089,13.687263260701904,21.691429020427293,28.472127375046163,15.818978865327473,10.822414932937882,37.614697595461436,13.73130502518557,10.599537673241434,16.301593982365034,33.43288178421357,19.89564291578946,12.045336438236527,23.9194256771126,29.053983002693606,11.47039364816246,4.600254364123648,13.527964395846759,16.37131778113617,7.267115636184371,21.105793721412518,29.20573767979,7.812967752446944,19.575615467342807,16.947048136964856,20.51745118901444,8.002256254549165,6.6970738066808755,5.682358347912211,10.989301696909926,35.14215581410906,15.780040327605015,22.09556145885326,20.663005387907173,29.452317532960784,5.571791568209972,13.157458296767256,27.07793632349066,20.181169978159097,32.42205775712734,24.47254084383877,23.937892159363876,22.627426914431847,14.860119804670399,35.2407902540253,3.016701352003861,28.4150011736655,32.31105726631935,36.86565065859724,22.203899487717777,35.45189619478317,14.874629858900231,29.314557870892788,12.917430794799309,16.850287326974556,19.880494373031993,7.542351349928049,10.461499903707598,18.126470437978092,20.447530683080217,27.489565800203074,18.59608721946694,24.5373604682282,21.30008720459618,15.510320047977103,13.691771195693399,21.646491831993124,30.419287036041343,27.783930190954102,12.186156424033111,25.66826210942128,12.303780330754698,28.732560514820573,3.2280835630086724,26.332474275316766,17.994058338533325,20.452829675981977,16.918237271913696,18.194059057721216,14.782683441893756,23.03828543661802,13.339323719049684,22.82811840420899,25.443770233250397,26.7495119396585,5.519961296363065,5.486052930610383,22.584565398617443,21.81167721741835,34.46389016982967,12.60097608143058,8.18631926207134,29.62923177887676,32.391533810268015,31.698874232120975,29.26396483528424,11.43038636573114,12.048221110918828,27.046655629868493,19.914972993291467,34.04696178267215,6.918875829058124,35.23056126819459,10.503200123757338,27.55302276045378,28.540224390123754,15.426690275620007,9.981251379770217,32.23048378863002,17.38004403005298,7.713621636099699,25.290796993392853,23.14587466041535,9.352839304342343,22.833629451044278,29.038268638823766,17.61131966579871,20.855870745197038,17.642093601457304,21.425703090482887,21.011110206405256,12.331378530237567,20.386981181501262,15.098586313682905,7.778063290716384,13.698886394603282,19.06776737236556,11.508544180746023,30.265389901159875,27.040962887699234,18.8841117591647,22.654622216261984,18.332102191299946,25.445878479950643,12.234461421024033,25.665020410914366,14.30380255543476,16.532134343086973,20.482008809247038,23.709579213930553,17.775739142752318,37.9105956657079,22.868636299114172,27.043828206343672,19.074275358297456,13.547345702946695,14.022627369935021,37.3426453100468,22.70996234687278,27.98588756842267,14.799003017403,25.576220343438564,13.455261505510506,28.953633662960016,27.66514253838035,22.68143548058923,21.294121702471863,19.905078846007466,24.331612012112664,24.021907601972387,16.595456021321063,13.900700088072494,13.088998313807515,13.560186624983919,16.380664913853984,18.213578979982586,7.082533476714752,27.810541280994816,30.734068969642877,16.32766140373448,23.474878820864106,19.368478752984064,18.118838220296755,31.650761782118114,20.291394501152826,8.121675437507538,27.266392284301894,16.757811022131477,28.597791833103273,31.43068021746449,16.869238427624143,21.575861012817562,25.979595726083026,3.5648729760513254,23.86724525083719,26.106365372152325,5.028041020506873,14.198333033664973,10.204465941069838,5.108444858719192,16.888165788344327,36.1540208532504,21.459069115001174,15.883790243077637,16.224285394696516,21.404421208735073,10.218081163511714,17.83864037665309,29.104025922276765,24.63866977861194,12.401766114758757,15.363749189777973,18.058258099698882,30.178601737015125,31.075608342223802,17.337040337868572,12.751526333492485,4.899126295432064,19.20465056404103,18.791118700182956,19.36092328970494,12.754934853690427,23.252484042286746,25.498415152390805,7.786798826724466,33.335955560549166,20.775590329133294,24.900140241857045,30.454077906348182,17.501786302531336,19.27702030591021,12.947614509146884,14.08554749626484,29.21216905904121,16.13608696235737,26.727138840046763,19.77467231222856,35.36655074923267,15.921259183300048,34.37079076921715,24.57188069827195,16.653002852720647,12.616347846560148,16.402417504298207,2.60718274380912,19.430689295376602,30.406339327405405,18.75305636160823,19.228156386044436,24.700536684262808,34.78538891637025,38.57068952189546,16.533429641577484,9.891208714677186,17.18689341882991,19.89565333659413,17.581665207813487,14.90060009691275,28.58580533414706,34.83363357914888,16.057235503817004,9.888196583612899,38.797847261291736,15.60442587260535,22.86216726538874,6.431153709029029,18.43526501045874,14.990669403010543,38.752912290449956,20.43686007771968,27.838515145977766,15.152426733572245,25.764238634217673,33.76366355200264,29.974335817132797,16.739120153546303,15.206766580506894,30.418206755854975,28.446890537354296,16.93796276949059,33.54484802856739,18.436291018298405,5.429300874513676,6.527239698383132,19.82984365628372,19.41634629255386,24.747619426121364,20.123067709526516,20.590654914104757,17.547966354469665,12.890421628541034,29.27287124671023,14.013067419970927,22.011525084307006,7.0794559390286915,23.840289232455692,15.22524720181765,22.872694359403116,22.19509419208272,26.5873210036623,33.48778153636969,16.860680211037362,17.91490716993673,27.42647497496131,30.648287037067597,16.520608602320394,22.203841873460387,26.782449147210954,27.870961227869895,24.55380056830049,19.675362273606332,18.92173845611827,28.221183462382083,19.398885689141682,20.54157858201193,33.96967090897566,27.50248148064761,23.384749515996766,22.227762584785488,24.64976006484047,11.113373104723637,22.3127658158846,20.316415285671106,37.17193770984865,16.94940436781204,33.131838858377854,11.735781342526721,29.832528944713697,28.827740956191093,28.646767892752738,22.43965930569141,4.67360331272948,4.281779834422794,4.705793449021485,10.63443530841126,18.018943730769227,30.16768667639277,34.66030993765689,3.7480578357844863,15.337385752869528,34.427734677816915,15.811572805600646,26.221930894971372,21.329423224013922,18.343920244767517,14.30518024785911,23.185641416556578,11.630397320630316,15.586804252622638,19.742169924629277,11.290380007089489,11.483265714964022,25.116248899488763,20.403570693960074,15.011082847503388,18.91623895111718,19.239759850865628,22.88497925623897,16.846265854199856,9.876899189387244,39.64066036161374,27.435124592618934,22.301119368574305,16.355933942717975,26.297416676964875,34.421355643986566,7.267754014387329,13.124302067480752,14.327186676065296,16.31151985470611,14.335452651734984,12.53388942437998,21.18468535708422,26.52884810812273,15.077343359880038,26.531663337574415,19.33718214936947,35.722628408513444,17.279889397159682,18.25951424806825,35.82198223808724,28.587628950711057,12.977308209155751,19.79483918673743,25.489980469064434,21.340785641655007,35.35625816939246,23.818172684580993,30.363683743138537,16.18757887698393,1.5430050148072638,24.60924322405189,14.919718231149037,11.269409692975314,17.090239740529878,10.112750313957392,12.813482314825674,26.16867121387742,6.96117453727342,33.69682653479701,24.582979027878554,20.62252793819911,5.717677818988536,28.47644137751545,30.210873075840066,32.013468331489165,11.336985881388522,33.857613702308385,29.878148224484,26.162652139317537,13.352960616928483,24.196940963999214,32.77909080700519,20.02280945060538,21.039770431578454,30.20248189765269,29.474068044734448,30.70463949460751,17.85766911950826,19.263215003133205,10.505424290413664,16.99035930435383,16.40899822242444,23.52913889043875,27.249872509594553,20.26394555923586],"a":[19.44607270716822,0.9621016491349588,13.039571284122694,7.8653670620550065,10.841125941551649,8.643887949316134,10.157607685847374,1.6034656096168032,9.547739270814294,17.978008578925593,1.8252171742915957,14.986979934402545,5.466200830293797,12.516691040299271,10.714227015901873,10.702209583508457,16.91478718446927,4.407661042288273,4.293187941606242,2.6923448591190535,7.192831128135508,17.225252068007364,3.7772574295017947,18.85908764621163,7.156250459590829,4.701931100247392,18.40984445585811,13.091580352823833,14.376403518239012,4.911909001724228,10.87315220432056,8.981575632170241,18.093087284066414,2.516328243549304,7.726818519301282,13.156195361008777,11.800824675346146,6.942678827179711,19.105462546006247,5.5831935017036916,11.642801792694497,13.7640146222151,12.96230402193714,15.779228970514371,8.46502559975455,6.611937208778289,13.531028351161973,10.314657312288196,19.843590047905025,19.023910684299864,19.41764346968583,16.011133008387766,10.667909001289804,10.868357109008638,6.543644679754759,0.89409316190312,5.365859210006545,0.48506628201599344,2.8175999836914567,9.400809211716673,4.556296621267499,8.174998449111879,1.9305099226984312,10.712858593303869,13.720387239035144,19.970475506981074,15.557290105552127,8.723377772911531,2.939990698114796,3.4501618950858637,15.311009768897481,18.18734347378411,3.0057734517592616,1.690728084432691,4.218746478955175,10.526352665130133,3.597262464321478,0.08920572728972509,12.760947742328144,7.2040569192337545,7.7757685808952814,12.075544619145532,17.683131810336196,1.8470964760806918,13.932437376148883,8.251704766411185,10.960512809056077,19.38741827882663,13.118953445982084,13.893085247476398,4.8064424846686515,9.318708864843654,11.248590613417146,13.082510741330218,19.433981811072535,19.158617731289805,7.871109029762642,17.87373589916411,3.7611801430934566,6.409308109119518,18.651359817822065,18.145507598997206,4.558155395158723,19.287085292225512,6.253258782483848,5.0672671529806745,9.282606370575284,13.498019942727124,0.30143695503277,13.67804193960437,0.28584551958016124,8.83696964638709,18.07417701228504,6.875687686726453,1.8429538503139486,15.555850716643507,10.594294703358504,19.618914484974724,8.945266512730221,6.352785852536957,3.0369255165747067,6.734902791828112,5.369625870387882,12.080467421288459,2.1512301120490207,11.874702836194672,9.28712256802858,6.477060522490836,18.88464170516055,6.2716824453958475,4.635772853275024,18.774511300963947,0.049785281551266714,12.773868368316649,13.502757909506734,15.602344029457687,19.71497903725509,13.31586439959683,9.992093238447213,0.08632801591961226,3.3617090916006953,6.2370132048247395,15.57421021595761,16.89885273557977,16.080770940209828,19.2820328589463,14.220239694960295,9.442019348832979,12.016441202935315,15.488462087287726,8.388552666554503,2.1398011231656877,3.6244569235147273,2.592994791691754,9.872739818695685,6.99829522348459,0.31191792045270894,3.7543549277614208,2.1513582872547587,14.477436534138635,2.81909777640176,13.700073126391,19.233375936407025,7.20972564033624,14.066897928696012,6.338651522460852,11.85852308549999,18.571894975471054,9.464793326364113,16.851784088982377,4.556315284321415,10.98854433703444,19.993410551286978,10.79950913844549,13.147932825153617,18.983040697397776,18.153856868777567,12.939497930888763,16.19568739354269,13.838610458582012,17.384082535528638,0.17965319714369432,7.383029356115314,1.8402072292531946,13.540043392931786,1.856680920089664,7.884103220974854,2.922029849241521,17.12838262116289,7.072259822944846,19.031043043844875,7.515121638116948,1.4873964723640043,15.799973569166257,10.885887927906284,19.956247323621184,0.0003320068129308851,2.024557174181183,15.867619283667892,1.3427789514385546,18.213439643597265,2.84757230839233,12.041288523086475,5.098270482975935,6.859284476216696,9.706632641284125,11.335072217049005,19.77744095992733,6.798014340326852,10.448289135028702,9.168638399214135,11.403173468077199,12.04938603467368,5.727685549265886,10.684782377349396,9.671616026860605,13.064182519809657,13.881515152990227,2.0582693801896967,4.948910047707287,15.163291390267002,15.200843508757323,13.068007703795864,15.294065668174959,3.255333829493745,12.77070801627961,13.130114977272246,1.5519415739761389,2.3537718790311013,15.15881320402948,6.326346062463757,7.050186392672173,1.3588432400329475,2.779376590267,4.3211667882085925,13.676879801162976,1.48163165246181,6.303255729882631,8.04390145072289,6.677403889003437,14.180473432395173,9.618054111225941,18.19136457412249,14.657930974959207,14.570639511198449,17.165884161954846,4.253882676478118,6.218833109373194,16.470047519926215,19.84241277681391,19.11367350398594,5.205230605451052,9.653279464159636,19.363576041123736,9.457168389538054,15.650830919023168,14.254695800879414,18.548098403252716,14.72884276243649,11.458568076757803,13.997411524023772,5.8484915204414545,12.77792737753154,3.1665295327213228,10.596777746217976,4.05200960877818,4.9091990350526205,9.86734760812698,15.131256863070286,8.223787738144882,1.2698008301591468,3.031012146742462,3.651486647449942,0.36902890688773393,2.797670027569228,9.497720072373422,17.75986176128553,18.2214857728515,14.153117413490005,3.6223722751908527,5.475560169790796,0.7909884159968206,5.965712849478657,4.752031183509811,14.448179440321987,12.041155202688998,19.346244937345524,2.0318822663221026,9.556602993632136,9.807648081467182,0.821998044504122,1.0436878309308462,4.017796889725749,5.4204263476444625,3.2281783863106694,0.4900889969380495,2.449782726145182,7.6493845357307055,11.196654523154077,16.563267769071018,0.1880851086101254,0.2783395705608127,19.598025108858558,4.617890635409285,12.79079917688071,2.602691288616663,10.762381694042027,19.201711173039048,16.291864902552888,0.6069079336154104,10.095728132515012,1.7972659756284592,18.499459261026118,4.561338403226833,9.495158824790181,15.112282341261691,18.398342406143446,12.78961947448542,17.694130287110962,5.778234580801582,7.052339420405209,5.747699897976526,3.4030972507177903,13.100463175367626,7.5924111764965785,15.844619918071006,19.846771400663567,14.557193972070408,16.73834980282614,0.6507261437596767,1.9142653227110928,3.8106566044476686,11.606228164848304,8.238139317548892,1.7003998853424651,14.192143633025317,16.069125372546967,9.548594247317116,16.066488921615864,6.794799776337235,0.5388401706964663,13.728185416028253,5.677938760347456,9.62401791749544,7.627850989883682,4.519271378412255,18.293265253432182,8.044796283235144,16.254094329443877,10.409696377049919,1.6785567774914734,17.300742678492703,10.01870394441291,14.581664697199223,7.508212554473683,3.010745747640464,1.9445852449189927,17.325039857674227,17.48224204942136,11.328544288485043,12.733353689454447,12.79904063993014,4.5027825230597385,0.5556827628296057,2.1002314787937504,4.856670161290437,14.437620326392352,4.994830688558496,18.19199703596986,5.582121196965786,18.939926656207653,15.312131100117945,1.214826664473776,12.315960196027586,12.806679625734114,9.339257580594014,18.81842933132672,1.242053918048378,11.45964705237084,19.77496192251341,1.7881552560250658,13.252743912877193,13.365417612478092,7.257689949502248,2.1805404369816372,4.89149615279318,6.347961572141978,16.07415019552455,0.4551330375390883,1.608427037683584,0.3484659270367496,12.11397206484834,7.712875067136413,18.310461296801776,9.353619400109565,5.480363170079556,19.603700819563805,18.701773681616032,18.676931690739444,10.411883586408122,9.094925395349215,4.532260732526745,19.038473374563285,3.7484215511539443,2.761074369610146,6.151486726709514,3.231806295071604,6.790277197679417,12.552424141469324,10.876162120347207,2.73123492823089,6.176695387653606,9.651254190508688,2.478891334826523,19.805277771158494,15.369488245022765,11.42117184345599,12.718502122987942,6.143572852717716,7.254006259131027,9.801849820159202,12.67845868436234,0.4863646971105151,17.998603328009782,6.436579843489549,3.4192739420028184,12.077393520322044,8.271279641668908,19.00741722960104,4.97252881307868,11.398891159866103,1.153473900423454,13.438148115433176,14.918610498992123,4.478230396236684,11.0353630012649,19.48186421302995,19.59424815632424,15.037134935223389,6.979448440491534,1.034643870541343,4.93256657293434,18.590497749594732,17.259990907473327,3.5929812777730064,0.9938307971413263,0.32629393289578257,17.043343839105543,4.248953273830569,1.5123373264269002,16.586083114718466,11.916352660511333,8.050735361689751,9.671579758623938,8.697125138496498,8.99829494967432,10.55027719724098,13.669150340771203,17.595692341020715,6.684074512571647,12.115805230110688,9.936021173512795,16.87946636568117,11.604385796833693,2.2811350639699812,13.311406566663653,14.14872648340304,12.268600598353032,3.674495913085769,9.3245139281388,8.024335870490136,19.258923227633453,11.05245119375979,17.436109405167294,0.003920435149695756,5.119190551702566,12.78141849018434,9.099854765554625,9.395440336596344,2.561665690738546,15.900328287521827,14.59013160939552,7.926997777364511,3.6007001760116975,10.956509031964888,16.947346480782045,8.36493516361327,0.25691953136262935,19.235200447718196,2.4392122518026405,6.320283926886003,7.390075288136302,19.944047646931963,6.4377515349350345,14.855468487729988,5.055928646530186,1.5939101210789186,16.701743659334657,13.35050393538249,7.971198771773187,6.127193977697689,12.831306898344153,1.5577827923788412,18.762548872910653,10.842540144684541,15.668764386331016,6.319953725542513,18.331775799355746,9.264510712396632,0.7363094653138047,17.950391720299216,3.243263478881091,11.32514599667358,2.9115376366041934,14.97451198171548,1.5299142209903227,14.58835324619085,9.849760049592046,19.517074442119235,18.622558676056777,5.2389699158476155,8.237810726126762,14.84066001226832,3.3263312695625435,11.574107475891044,18.975888074096506,15.39854011612293,2.9316456952461234,6.303160609408032,5.052197158699645,10.717108850413876,5.575911307498855,19.818662147628295,4.434133043693271,16.7383888276807,1.4265046419054084,6.392684157738353,2.023707478114063,11.983443188970737,2.2909626505441416,17.141921341081236,7.1486103618800545,8.714443783910571,10.352783342980274,13.51547014160114,0.35966185034236986,10.987522759659134,0.9884180476167526,8.982605413043622,0.7271392551353539,10.86184876310828,17.74134012323431,7.242755416627973,2.6633818768744355,11.413462208392717,16.715193484135273,13.603693067968088,7.695664893899465,12.188881244976413,0.9712302342854029,11.530485456355724,12.917854861012984,6.250413180796732,16.738950064951087,16.863926584039998,5.855503296009386,4.9555877510291735,3.389921659355535,16.60461766784849,11.6937753043605,8.623167594741311,2.409384647284889,15.897420530362702,15.536105887684464,10.345348980075277,2.9121258406923323,0.3379382044298884,14.210924597512031,7.253002917191611,9.312680858701503,6.044210447625908,12.334505104766711,7.290351104039221,10.317228255381172,0.5946683345633508,11.142861170169795,17.705033352879695,11.399276236354968,8.92387392553486,7.8673856747555915,19.716542330429654,13.207833056272381,10.520517747625128,10.099371646923029,15.237828657331276,6.986479377871615,0.6331434459400231,13.051987518589288,13.140929641758877,2.6636427087859893,0.5871872500032849,9.123746411873608,13.275677676957397,5.734615697715837,9.319046322296858,15.378524743985942,2.653959805773698,12.533763359680488,6.177750636981778,15.140341928962044,4.465972822129536,3.935172286061648,1.0951228531189994,7.357038365145003,19.39858604345861,2.2580639505520983,7.0261669394603965,16.24066576560489,11.652235141595062,2.186416541630014,6.052850990412582,7.298826575666717,5.135326725817704,14.529568490250252,17.147225858579077,5.404092614993954,7.054288713064318,9.432263207499737,17.235779793810796,1.816702694552701,8.845818647194776,19.26940274462889,19.54845221693447,16.48219300812064,18.11538117771056,1.9853194525572526,10.108152952454589,12.527647499223624,14.933198216890254,10.533447375031022,1.917759662315568,8.471236513862479,8.141208721935556,15.558939828244437,12.551428274792805,12.336033953605279,17.623892761938503,14.20450841227785,10.134501713380946,9.114056894001799,14.312992865256877,18.581608595361068,19.653003814664434,2.3589141010502557,16.535600168333843,3.4804901758491935,13.01714312676561,1.0583973297359472,18.62978065156996,6.0148842436908145,0.9634371708084899,10.349041915578434,11.057950103523897,4.571769598141162,9.553124791757895,13.102468591082367,5.589310782363461,9.635543086248187,7.512975603557539,2.863595091420441,1.2982886979613806,15.457150928885959,10.796074044104387,15.906394671406133,7.196867194954075,0.05043680536024553,15.900472457157413,17.377154246856577,16.290524944015203,18.57175867992317,8.59515331449832,0.7512981614921488,13.218648719750735,0.8258167441563957,14.725588775693366,5.085291895120263,17.428470461084103,9.208632940757479,7.618583709588171,17.507528584227565,5.150031069935985,9.620352877236481,18.042617143281227,4.89968651154264,3.836880207718232,6.311312751449347,3.5494436929476647,7.276491598319561,19.304957955556475,14.343278359335208,4.683570163478352,12.369575854034224,3.264490736168044,6.631051950212945,16.184231967005488,1.3711918940454382,8.742586844961515,0.5855524160556325,0.02673657150555009,0.6634637504989938,16.868945454969587,9.257134734364403,18.71901132846435,19.115433533768282,3.9397900912757366,10.626188507957316,3.3502346670358296,8.14820448362839,0.767226007113404,9.941730817788903,0.11101547859138083,14.592021857798123,7.082814494122922,16.069495745444293,14.560626925241653,19.75434759242955,7.996492407345741,18.847294631849326,2.1992960741918743,13.037936404753708,6.259374903480026,18.914812322983934,17.313322561396106,19.99952105003001,13.528649048310246,13.832511190841409,7.490942007563133,14.075320483785777,7.813058341907135,8.059904747929183,11.278532640736309,17.483738614064702,4.387637520425569,16.304260944116493,10.64204597888077,1.2789057509412416,10.592348443545818,8.816518335689016,11.935053407992736,12.439566802336124,1.7988356077289414,17.950516901078753,16.753768111672038,4.202763752909888,16.018628106342277,14.04108030805312,9.90177452103017,17.438060302849475,16.381706691596655,7.875224054724277,18.324792024454478,9.24059325071413,13.969151698225906,15.227978257210811,1.7580590061208712,15.752538901040047,6.959147744783087,1.9222453065602885,18.363694503442446,17.77788349913553,2.0894477206294315,0.7624155800229504,8.506994310765815,2.576731297608572,13.101199098044209,17.484908719922366,16.43180710197783,14.468124850219684,5.452261456872636,13.20611626624184,9.383965012983468,17.021888265578205,16.748556708360226,11.44173577507618,8.614320404937065,11.434428557771884,10.357456957735387,10.821476608687881,14.187377476769427,12.899986899625468,8.2765198247764,2.529083378748891,13.432286669737458,0.3885370851681502,6.1470355548782285,11.213285069876662,13.370928613495643,6.442991864744907,2.0150605514124464,13.484673320915403,2.6599884852280864,7.730681601316096,11.203358535109423,0.855263887949298,18.736213191758182,4.432055746701189,6.873375294910313,11.532858728981964,7.560226271974249,18.24686884910107,3.1214320452879907,16.747670201871856,1.9019995480880114,19.438275756997655,5.335159639793212,4.757484936147476,0.5294335012734752,8.769353927457605,0.01525147286400852,9.027380707035846,10.951831884554576,16.318430480631672,3.479871524891247,10.957449585482424,14.998406700962,19.045674795672642,12.551711008642243,0.5476845624244664,0.9785323480404884,6.500554082274195,16.98588097456558,12.932523693093177,11.451593283985346,19.989294001962396,6.8437331853044014,4.418368440919522,19.14410821521967,3.3578101924144477,18.462727534230478,4.102347830466404,9.7378762447549,7.588471038178786,19.91337275467394,14.963242349495406,18.797280974262303,8.659163089668107,16.29552055238967,15.70089845940644,12.60095368992146,8.129237203907982,11.61249901761661,14.691266710432638,17.800077089055932,1.126263944872905,18.63789587737432,13.651814246805515,0.7708620369830355,3.2584302616104965,4.711809351800569,17.451562535381928,16.411349251184696,1.4833914996477926,8.56363458162738,17.500468407009784,12.530445441338829,17.660355127160777,5.988125610004595,12.808672223242375,0.9454512771972423,13.739422759912912,14.271196884120098,15.05815312333105,8.130603991296756,11.252250301512348,16.037489159490633,16.031847129641015,15.19133464270039,9.012141620919154,13.61594545316219,9.530264430200477,16.487652750996972,19.1548763527158,14.238594819940836,19.76811720992011,6.832060301386549,14.791093277035312,12.695968665148921,0.5073922382519847,19.58190995262275,17.899057657925685,15.60007749148664,8.253201544173049,3.473469438679091,16.820070076256357,1.0679158928173127,13.27242759831675,3.727200167768001,17.576671624685055,6.883919814300108,13.630774005447059,8.695100273427347,16.189573562001787,15.722807141840258,9.716595541574723,8.05686960180147,3.1562902736467136,1.5220617812121873,1.710684103372273,4.440796707076351,3.632517055471425,18.079657333010985,15.557068279745279,2.5509658893818665,13.464183862029548,19.47651659375437,4.475802856755946,12.861338126808937,2.6355378223053005,12.77446263249935,7.817239899102546,15.677354341833594,11.562815654928373,13.474212943414328,4.874518280808151,7.370210901429646,6.828764909259086,7.244542975997028,7.726121246093891,7.347422615295769,15.65608887805379,0.46314510589578806,8.825497767565654,16.504388848722517,8.450506365298477,19.751857414154838,14.197344741300316,19.091363289009337,7.198466511914883,16.737606039651816,18.30925815003878,6.324041179256685,1.2099760191640696,4.003016288873362,7.252605679880411,13.407277220316992,5.390835483903529,17.774843417903845,14.717240322286651,10.45341933984341,11.455526666667799,4.110852266387122,17.412557210452878,1.9807624314892847,10.66194746819155,18.05106679856191,16.307497638844467,5.430816300093886,9.69253730221249,11.691097828828386,5.876717478044986,16.20542473057332,15.436018358849877,15.861713712743963,6.598630422875211,0.32674296815994097,12.502298851841672,2.0062558003801056,11.248976410575029,10.77403873068909,6.824615443157582,2.07006680061518,13.962751212880281,1.6266008506262652,15.94907269150494,18.998263134162702,16.128789953097925,5.2190094916479834,17.723753513314307,10.859776875838868,15.473810820287728,10.729075575827046,14.64221048790424,19.17445415752435,12.660825380969358,0.09453885354447245,18.31292797904933,13.886694788228716,18.0532475101446,16.613162692436127,16.670692178272684,18.06754681550295,11.02709255093664,16.340201774693845,12.414806411486294,1.373689685943802,13.829797318008072,8.28257339073482,15.664339541462766,18.20208272575076,18.326876992240834]}

},{}],71:[function(require,module,exports){
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

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


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

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a `a >= b`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 2.0, 1.0 );

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

	logcdf = factory( -1.0, -2.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( a[i], b[i] );
		y = logcdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( a[i], b[i] );
		y = logcdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( a[i], b[i] );
		y = logcdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/logcdf/test/test.factory.js")
},{"./../lib/factory.js":65,"./fixtures/julia/large_range.json":68,"./fixtures/julia/medium_range.json":69,"./fixtures/julia/small_range.json":70,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":226}],72:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/logcdf/test/test.js")
},{"./../lib":66,"tape":226}],73:[function(require,module,exports){
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

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


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

tape( 'if provided `+infinity` for `x` and a valid `a` and `b`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `a` and `b`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 0.5, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, -1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, -0.5, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], a[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], a[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], a[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/logcdf/test/test.logcdf.js")
},{"./../lib":66,"./fixtures/julia/large_range.json":68,"./fixtures/julia/medium_range.json":69,"./fixtures/julia/small_range.json":70,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":51,"tape":226}],74:[function(require,module,exports){
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

},{"./is_number.js":77}],75:[function(require,module,exports){
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

},{"./is_number.js":77,"./zero_pad.js":81}],76:[function(require,module,exports){
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

},{"./main.js":79}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{"./format_double.js":74,"./format_integer.js":75,"./is_string.js":78,"./space_pad.js":80,"./zero_pad.js":81}],80:[function(require,module,exports){
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

},{"./main.js":83}],83:[function(require,module,exports){
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

},{"./main.js":86}],85:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],86:[function(require,module,exports){
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

},{"./is_string.js":85,"@stdlib/string/base/format-interpolate":76,"@stdlib/string/base/format-tokenize":82}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/utils/define-property":96}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./define_property.js":94}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":93,"./has_define_property_support.js":95,"./polyfill.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":84}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":99,"./polyfill.js":100,"@stdlib/assert/has-tostringtag-support":20}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":101}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":101,"./tostringtag.js":102,"@stdlib/assert/has-own-property":16}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":87}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){

},{}],105:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],106:[function(require,module,exports){
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
},{"base64-js":103,"buffer":106,"ieee754":209}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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
},{"_process":216}],109:[function(require,module,exports){
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

},{"events":107,"inherits":210,"readable-stream/lib/_stream_duplex.js":111,"readable-stream/lib/_stream_passthrough.js":112,"readable-stream/lib/_stream_readable.js":113,"readable-stream/lib/_stream_transform.js":114,"readable-stream/lib/_stream_writable.js":115,"readable-stream/lib/internal/streams/end-of-stream.js":119,"readable-stream/lib/internal/streams/pipeline.js":121}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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
},{"./_stream_readable":113,"./_stream_writable":115,"_process":216,"inherits":210}],112:[function(require,module,exports){
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
},{"./_stream_transform":114,"inherits":210}],113:[function(require,module,exports){
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
},{"../errors":110,"./_stream_duplex":111,"./internal/streams/async_iterator":116,"./internal/streams/buffer_list":117,"./internal/streams/destroy":118,"./internal/streams/from":120,"./internal/streams/state":122,"./internal/streams/stream":123,"_process":216,"buffer":106,"events":107,"inherits":210,"string_decoder/":225,"util":104}],114:[function(require,module,exports){
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
},{"../errors":110,"./_stream_duplex":111,"inherits":210}],115:[function(require,module,exports){
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
},{"../errors":110,"./_stream_duplex":111,"./internal/streams/destroy":118,"./internal/streams/state":122,"./internal/streams/stream":123,"_process":216,"buffer":106,"inherits":210,"util-deprecate":234}],116:[function(require,module,exports){
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
},{"./end-of-stream":119,"_process":216}],117:[function(require,module,exports){
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
},{"buffer":106,"util":104}],118:[function(require,module,exports){
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
},{"_process":216}],119:[function(require,module,exports){
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
},{"../../../errors":110}],120:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],121:[function(require,module,exports){
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
},{"../../../errors":110,"./end-of-stream":119}],122:[function(require,module,exports){
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
},{"../../../errors":110}],123:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":107}],124:[function(require,module,exports){
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

},{"./":125,"get-intrinsic":200}],125:[function(require,module,exports){
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

},{"es-define-property":185,"es-errors/type":191,"function-bind":199,"get-intrinsic":200,"set-function-length":220}],126:[function(require,module,exports){
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

},{"./lib/is_arguments.js":127,"./lib/keys.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],129:[function(require,module,exports){
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

},{"es-define-property":185,"es-errors/syntax":190,"es-errors/type":191,"gopd":201}],130:[function(require,module,exports){
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

},{"define-data-property":129,"has-property-descriptors":202,"object-keys":214}],131:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],132:[function(require,module,exports){
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

},{"./ToNumber":163,"./ToPrimitive":165,"./Type":170}],133:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/isNaN":179,"../helpers/isPrefixOf":180,"./ToNumber":163,"./ToPrimitive":165,"es-errors/type":191,"get-intrinsic":200}],134:[function(require,module,exports){
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

},{"call-bind/callBound":124,"es-errors/type":191}],135:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":193}],136:[function(require,module,exports){
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

},{"./DayWithinYear":139,"./InLeapYear":143,"./MonthFromTime":153,"es-errors/eval":186}],137:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":184,"./floor":174}],138:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":174}],139:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":137,"./DayFromYear":138,"./YearFromTime":172}],140:[function(require,module,exports){
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

},{"./modulo":175}],141:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":182,"./IsAccessorDescriptor":144,"./IsDataDescriptor":146,"es-errors/type":191}],142:[function(require,module,exports){
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

},{"../helpers/timeConstants":184,"./floor":174,"./modulo":175}],143:[function(require,module,exports){
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

},{"./DaysInYear":140,"./YearFromTime":172,"es-errors/eval":186}],144:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":182,"es-errors/type":191,"hasown":208}],145:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":211}],146:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":182,"es-errors/type":191,"hasown":208}],147:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":144,"./IsDataDescriptor":146,"./IsPropertyDescriptor":148,"es-errors/type":191}],148:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":182}],149:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/timeConstants":184}],150:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"./DateFromTime":136,"./Day":137,"./MonthFromTime":153,"./ToInteger":162,"./YearFromTime":172,"./floor":174,"./modulo":175,"get-intrinsic":200}],151:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/timeConstants":184,"./ToInteger":162}],152:[function(require,module,exports){
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

},{"../helpers/timeConstants":184,"./floor":174,"./modulo":175}],153:[function(require,module,exports){
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

},{"./DayWithinYear":139,"./InLeapYear":143}],154:[function(require,module,exports){
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

},{"../helpers/isNaN":179}],155:[function(require,module,exports){
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

},{"../helpers/timeConstants":184,"./floor":174,"./modulo":175}],156:[function(require,module,exports){
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

},{"./Type":170}],157:[function(require,module,exports){
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


},{"../helpers/isFinite":178,"./ToNumber":163,"./abs":173,"get-intrinsic":200}],158:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":184,"./DayFromYear":138}],159:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":184,"./modulo":175}],160:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],161:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":163}],162:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/isNaN":179,"../helpers/sign":183,"./ToNumber":163,"./abs":173,"./floor":174}],163:[function(require,module,exports){
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

},{"./ToPrimitive":165,"call-bind/callBound":124,"safe-regex-test":219}],164:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":194}],165:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":196}],166:[function(require,module,exports){
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

},{"./IsCallable":145,"./ToBoolean":160,"./Type":170,"es-errors/type":191,"hasown":208}],167:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":200}],168:[function(require,module,exports){
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

},{"../helpers/isFinite":178,"../helpers/isNaN":179,"../helpers/sign":183,"./ToNumber":163,"./abs":173,"./floor":174,"./modulo":175}],169:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":163}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":137,"./modulo":175}],172:[function(require,module,exports){
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

},{"call-bind/callBound":124,"get-intrinsic":200}],173:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":200}],174:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],175:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":181}],176:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":184,"./modulo":175}],177:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":132,"./5/AbstractRelationalComparison":133,"./5/Canonicalize":134,"./5/CheckObjectCoercible":135,"./5/DateFromTime":136,"./5/Day":137,"./5/DayFromYear":138,"./5/DayWithinYear":139,"./5/DaysInYear":140,"./5/FromPropertyDescriptor":141,"./5/HourFromTime":142,"./5/InLeapYear":143,"./5/IsAccessorDescriptor":144,"./5/IsCallable":145,"./5/IsDataDescriptor":146,"./5/IsGenericDescriptor":147,"./5/IsPropertyDescriptor":148,"./5/MakeDate":149,"./5/MakeDay":150,"./5/MakeTime":151,"./5/MinFromTime":152,"./5/MonthFromTime":153,"./5/SameValue":154,"./5/SecFromTime":155,"./5/StrictEqualityComparison":156,"./5/TimeClip":157,"./5/TimeFromYear":158,"./5/TimeWithinDay":159,"./5/ToBoolean":160,"./5/ToInt32":161,"./5/ToInteger":162,"./5/ToNumber":163,"./5/ToObject":164,"./5/ToPrimitive":165,"./5/ToPropertyDescriptor":166,"./5/ToString":167,"./5/ToUint16":168,"./5/ToUint32":169,"./5/Type":170,"./5/WeekDay":171,"./5/YearFromTime":172,"./5/abs":173,"./5/floor":174,"./5/modulo":175,"./5/msFromTime":176}],178:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":179}],179:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],180:[function(require,module,exports){
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

},{"call-bind/callBound":124}],181:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],182:[function(require,module,exports){
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

},{"es-errors/type":191,"hasown":208}],183:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{"get-intrinsic":200}],186:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],187:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],188:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],189:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],190:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],191:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],192:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],193:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":191}],194:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":195,"./RequireObjectCoercible":193}],195:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],196:[function(require,module,exports){
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

},{"./helpers/isPrimitive":197,"is-callable":211}],197:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":198}],200:[function(require,module,exports){
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

},{"es-errors":187,"es-errors/eval":186,"es-errors/range":188,"es-errors/ref":189,"es-errors/syntax":190,"es-errors/type":191,"es-errors/uri":192,"function-bind":199,"has-proto":203,"has-symbols":204,"hasown":208}],201:[function(require,module,exports){
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

},{"get-intrinsic":200}],202:[function(require,module,exports){
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

},{"es-define-property":185}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{"./shams":205}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":205}],207:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":199}],208:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":199}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{"call-bind/callBound":124,"has-tostringtag/shams":206}],213:[function(require,module,exports){
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

},{"./isArguments":215}],214:[function(require,module,exports){
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

},{"./implementation":213,"./isArguments":215}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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
},{"_process":216,"through":232,"timers":233}],218:[function(require,module,exports){
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

},{"buffer":106}],219:[function(require,module,exports){
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

},{"call-bind/callBound":124,"es-errors/type":191,"is-regex":212}],220:[function(require,module,exports){
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

},{"define-data-property":129,"es-errors/type":191,"get-intrinsic":200,"gopd":201,"has-property-descriptors":202}],221:[function(require,module,exports){
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

},{"es-abstract/es5":177,"function-bind":199}],222:[function(require,module,exports){
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

},{"./implementation":221,"./polyfill":223,"./shim":224,"define-properties":130,"function-bind":199}],223:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":221}],224:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":223,"define-properties":130}],225:[function(require,module,exports){
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
},{"safe-buffer":218}],226:[function(require,module,exports){
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
},{"./lib/default_stream":227,"./lib/results":229,"./lib/test":230,"_process":216,"defined":131,"through":232,"timers":233}],227:[function(require,module,exports){
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
},{"_process":216,"fs":105,"through":232}],228:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":216,"timers":233}],229:[function(require,module,exports){
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
},{"_process":216,"events":107,"function-bind":199,"has":207,"inherits":210,"object-inspect":231,"resumer":217,"through":232,"timers":233}],230:[function(require,module,exports){
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
},{"./next_tick":228,"deep-equal":126,"defined":131,"events":107,"has":207,"inherits":210,"path":108,"string.prototype.trim":222}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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
},{"_process":216,"stream":109}],233:[function(require,module,exports){
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
},{"process/browser.js":216,"timers":233}],234:[function(require,module,exports){
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
},{}]},{},[71,72,73]);
