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
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a uniform distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.0, 10.0 );
* var y = logpdf( 2.0 );
* // returns ~-2.303
*
* y = logpdf( 12.0 );
* // returns -Infinity
*/
function factory( a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a uniform distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 2.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a || x > b ) {
			return NINF;
		}
		return -ln( b - a );
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
* Uniform distribution logarithm of probability density function (PDF).
*
* @module @stdlib/stats/base/dists/uniform/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/uniform/logpdf' );
*
* var y = logpdf( 3.0, 2.0, 6.0 );
* // returns ~-1.386
*
* var mylogPDF = logpdf.factory( 6.0, 7.0 );
* y = mylogPDF( 7.0 );
* // returns 0.0
*
* y = mylogPDF( 5.0 );
* // returns -Infinity
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
* Evaluates the logarithm of the probability density function (PDF) for a uniform distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.0, 4.0 );
* // returns ~-1.386
*
* @example
* var y = logpdf( 5.0, 0.0, 4.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 0.25, 0.0, 1.0 );
* // returns 0.0
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
* var y = logpdf( 2.0, 3.0, 1.0 );
* // returns NaN
*/
function logpdf( x, a, b ) {
	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return NaN;
	}
	if ( x < a || x > b ) {
		return NINF;
	}
	return -ln( b - a );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":53}],68:[function(require,module,exports){
module.exports={"expected":[null,null,-4.311524401172825,null,-4.129298064702753,null,null,null,null,null,-4.237304210325203,null,-4.288848433133095,null,-3.9399246790329148,null,null,null,-4.176392721718748,-4.3411808517576755,null,-3.9127947177826057,-4.131164816643848,-3.997651839415215,-4.259034566252183,null,null,-3.950755251550623,null,null,-3.930054997414561,-4.05971129355015,null,-3.395358662352135,null,-4.019732248273111,null,-4.35850787886093,null,null,-4.360744756020307,null,-3.3530652720182577,null,null,null,-2.874588053932259,null,null,-4.22548753251788,-4.049995911965464,-3.9286841458639543,null,null,null,null,null,null,null,null,null,-4.019644142119219,-4.047316639638366,null,-2.3847670793454165,null,-3.99624705165643,-4.337841742989945,null,null,null,-4.3016357993483645,-2.589993865839588,-4.031905854576506,null,null,null,null,-3.2446642096240406,null,null,null,-3.88183811453396,null,-3.96452822050712,null,-3.990859968237699,-3.5406142836778245,-4.27213058615674,null,-3.9464872706590093,-4.325834512769368,null,-4.3048396932194,null,null,null,null,null,null,null,-3.0395062870478973,-4.354932884033251,null,null,null,null,-3.340079325348671,null,null,null,-4.246741461269849,-4.18832892009335,null,null,null,null,null,-4.095833047938132,-2.823180034515123,-4.277082816906618,null,null,null,null,null,-2.928976307049377,-3.496995501519947,null,null,null,-4.276993894358197,null,-4.051048090253061,null,null,null,null,-4.112869913530254,-3.3727276604163356,null,-4.138363725484204,null,null,null,-3.7048793052891513,-4.342020071678066,-4.087945742471709,-4.367681631407727,-3.4455741662507924,null,null,-4.01569644791868,null,null,null,-4.12073999195127,null,null,null,null,null,null,-4.325128616341179,null,null,null,-3.9814033171834873,null,null,null,null,null,null,null,null,-3.6559356298390053,null,null,-3.3714655528782775,null,-3.426556672982874,-3.0102280921517846,-4.018288318920165,-4.2714949362001144,-4.280134818166228,-4.082611669624929,-4.010690019643261,null,-2.634498359768089,-4.217780323854876,-4.227233523088934,null,null,-4.291731437455889,null,null,-4.156271098404494,-4.032463463163029,-3.95940087881457,null,-3.147159678275909,-4.006315419609358,null,null,null,-4.374423012622676,null,null,null,-4.275623796183832,null,null,null,-3.8140952696482366,-3.825820902309994,-4.283012489713805,null,null,null,null,-4.235831280721427,null,-4.377980905726965,-3.845838082348081,null,-4.379922100215547,null,null,-3.7907456596818445,-4.23708387983921,null,null,-2.5409208864655266,null,null,-3.6567524097635853,null,null,null,-3.6934541095181865,null,null,null,null,null,null,null,null,null,-3.386949332409871,null,null,null,null,null,-3.5203676557186885,-4.219874215298184,null,-3.317883368954278,null,null,null,-3.616484615739557,-3.911536459399068,null,-3.9902855647051108,null,-4.231549200353351,null,null,null,null,-4.222518609728839,null,null,-3.834141942839678,-4.352235346353481,null,-3.9798729560032164,null,null,null,null,-3.88744291756347,null,null,null,null,-4.005683027778121,-4.2851615682615485,null,-3.233733260174671,null,null,null,null,null,-3.370354222323663,null,null,-3.4614896085733164,null,null,-4.346050874937541,-3.023680033204992,-3.942701818231173,-4.35375166233708,-4.217495398904084,null,-3.592659081314469,null,-4.297722123505549,-4.110865285191638,-2.4788249264534787,-3.4737284473568155,-4.035915888754478,null,null,-4.061611105265717,-3.847595004306995,-4.195371626914229,-4.324186909655529,null,null,null,null,null,null,null,null,-4.133238673445337,-3.9321265937571495,null,null,-4.047912322693432,-4.126201408387108,null,null,null,-2.807973084119346,-4.077905061755128,null,null,-3.0924804591560666,-4.134609032474822,null,null,-3.6622902721352326,null,-2.7776715025852723,-4.265661342884741,null,null,-4.315184993446624,-4.037077206905214,-4.051736356374723,null,null,-3.3065092146991315,null,-3.6824203212030313,null,null,-4.37670555751145,null,null,null,null,null,null,null,-4.376191435104223,null,null,null,null,null,null,null,null,null,null,null,-4.319427490280173,null,null,-3.6770103224428956,null,-4.152219605488063,-4.338941632066982,-4.246506134678369,-3.9341903299430436,-4.0737932516193816,null,null,null,null,-3.8896338452573738,null,null,-4.034609192515403,-4.229546052191282,-4.109778917819065,-4.302550820581094,-4.196901819987876,null,null,null,-4.361404558643211,-4.14075890774979,-3.2646897834600006,-4.344282426966975,-4.212516177168199,null,null,-3.440055200859679,null,-3.847171851816461,null,null,null,-3.586064603717009,-3.7082364990524987,-4.319170882968314,-3.2855230276559935,null,-3.9673013185541817,null,null,-4.136581980058437,null,null,null,null,-4.116218725262353,-2.8979662259524113,-3.131697615755653,null,-4.295842072977152,null,-3.955781325202641,null,null,-4.272800037493754,-4.323130968233309,null,-3.8151207759408283,null,null,-3.8299360052602722,null,null,-4.070970038391335,null,-4.307592925798984,null,null,null,-3.765771941719374,-4.084152906816424,null,-1.431066697613744,null,null,null,-3.6728270361260686,null,-4.3723258740593725,-3.980388833026728,null,-4.042486407608573,null,null,null,null,-3.3025557277997333,null,null,null,-4.1451677027581635,null,null,-3.946030588651586,-3.8046472231769997,null,null,null,null,null,-2.5529360610438547,-3.9463915834323875,null,null,null,-4.06948558410793,-3.802493057764739,null,-3.8579634089010595,-4.116514475203328,null,null,-3.8859918760489194,-3.608197381647897,-3.9513159057499583,-4.062621539319679,-4.269362091276456,-3.341279666639087,-4.2621768547684695,null,null,null,null,-4.142632955505739,-3.9175666382850456,-4.146183844584976,-3.925598013483787,-4.326721947475177,null,null,-4.118876938057511,-4.175707079835164,-4.153576850255225,-3.877845096379273,-4.11681054805438,null,-4.25334392285095,null,null,null,null,null,-3.803280351263267,null,null,null,-3.9824175720966024,null,-4.271759803015036,-4.287316181181734,null,-3.9807171901454077,null,-4.268543070183689,null,null,null,-3.260916920988554,null,-4.229938134561987,null,null,null,null,null,null,null,-3.9230765537307013,null,null,-4.266432408672442,null,null,null,-4.3587201400326805,null,null,-2.7868630859668295,-4.193970798806907,null,null,-3.6991456456264027,null,null,null,null,null,null,-3.866955308473617,null,-3.8325379321395068,null,-4.2527070369127875,-3.294294599094098,null,null,-3.992948121795677,null,null,null,-3.894110928595172,null,-2.4068751796500774,null,null,null,null,-3.8472197046707604,null,null,-4.357542753095734,null,-4.250850794489299,-4.028723449671775,null,null,null,-4.370241972586023,null,null,null,-4.316174908092033,-3.897755551899918,null,null,-3.255321069337735,null,null,null,null,null,null,null,-3.6589472540911547,null,-3.6881751766684103,null,-4.302727523151915,null,null,-3.753010745077089,null,null,-4.126601228892644,-4.09729645025681,null,-4.08275280093682,-4.050274724703127,-4.380765109352198,null,null,null,null,null,null,null,null,null,-3.870515722763796,-4.316421207685416,-3.49026504841755,null,null,null,null,null,-4.342223720420148,null,null,null,-4.072566302210304,-3.407877082156731,-3.8556791487158946,null,-3.1662817722421295,null,null,null,null,-4.1273787444118835,-3.632348971793517,null,null,-4.063089083587537,null,-3.550121774606637,null,null,null,null,null,-4.101562868507297,-3.9823915687515608,null,null,null,-4.216001238874075,-3.8816757385275484,null,null,null,null,-3.945474158484143,null,-3.527635299232484,-3.6817665140721574,null,-4.272404995643274,-4.247486465462655,null,null,-4.327941803161387,-2.766007506969557,null,-3.662470343614525,null,-3.0719706346345714,null,null,null,null,null,null,null,null,null,null,-4.377320101018005,null,-3.781004639299829,null,null,null,-3.8255608911436387,null,null,null,null,null,-4.051366139534311,null,-4.122526728237671,null,-3.291493279637757,null,-4.0004849310990185,-3.6867129387736006,null,null,-4.366686390123494,null,null,null,null,null,-3.7514682585028574,null,-3.440096730656108,-4.247362927761298,null,-4.14869959661187,-3.082750775229553,null,null,null,null,-4.030086864989556,null,null,null,null,null,-4.344855344132424,null,null,-4.06172493371416,-3.8790844136116993,null,null,-3.7871282199351657,null,null,-4.361861488183709,null,null,null,null,-3.8154712722299813,-4.306078725511026,-3.227579850805757,null,null,-3.19492785293563,-4.119475808161397,-4.335559217172752,null,-4.237612039191035,null,null,-3.131337934001725,null,null,-3.8871763170392986,null,-4.285614460573735,null,-4.326352178839104,null,null,-4.211685384809739,null,null,null,-3.8046426598845624,null,null,-4.041919400935019,-4.001017881148037,-4.1063774332334715,-3.309898492101639,-3.816214979579867,null,null,-4.183772219285995,null,null,null,null,-4.194205321806401,null,null,null,null,null,null,-4.219933491437981,-3.6857090895494937,null,null,-3.987695908937678,-4.244133267570891,-4.0687429275265155,null,null,null,-3.295129646379806,null,-4.086673727884791,null,null,null,null,null,null,null,-4.349340879357537,-4.288225889908333,null,null,null,-3.7368497151355577,-3.2956369742398683,-3.1996644508446512,null,null,null,null,null,null,null,null,-4.369953309721654,null,null,null,-4.099241011389349,-4.381115320390781,null,null,null,-3.3974581929444416,null,null,-3.0100807999770653,null,-4.292239644892437,null,null,null,-4.354719796513685,null,-4.010435572905587,null,-3.992984854200527,null,null,null,-4.320110108043042,-3.9357212251834124,null,null,-4.057894451196683,null,-4.158188966975252,null,null,-4.293910603336446,null,null,-4.311539372061528,null,null,null,null,null,-4.312934181140625,null,null,null,-3.6202621917699846,null,null,-4.107451051997392,null,-3.8744727536790955,-2.6329959052232605,null,null,null,-3.884231689914711,null,-4.046325538817525,-3.930275938985067,-4.316804774876965,null,null,null,null,-4.173198581163422,null,null,null,-3.738755956331572,-3.850086055807984,null,null,-4.291257493835851,null,null,-3.774196579061088,null,null,null,null,null,null,-3.5947129708633083,null,null,null,null,null,null,null,-4.142445722736119,null,null,null,-3.790850625071216,-4.079126423659608,-3.8986014042576467,null,null,null,-4.142725573409506,-4.085444988454652,null,null,null,null,null,null,null,-4.184568469890551,-4.232023746993914,null,-4.348073124787126,null,null,null,null,null,-3.7451370950420966,-4.377438387588737,-2.4257526187106593,null,null,null,null,-4.209540523633972,null,-3.3493261241289716,null,null,null,-4.021228628243138,null,null,-3.2307478260891025,null],"x":[50.15815410422284,40.78533186001398,61.19602413891736,81.07936537208514,69.95296578883104,88.90019055466594,24.74185398533928,63.56736411910455,79.20051587566445,97.37917893583948,17.610980279745192,52.275030771196704,38.18237066249242,64.42795287442236,43.80044953331288,97.12037739025897,98.04776238228965,90.0013064625812,69.03530454808964,7.046327185949353,25.446515938711322,12.61200244972931,27.914868436305728,59.04159037546375,55.605237280141175,9.016630601888199,48.54293966386185,54.39163360773247,75.2930449141229,73.04682572886905,56.07932584489288,71.9360205500328,86.09040086397408,11.996089692171763,50.49859964985784,26.828525047354624,84.50649001710656,78.65799385906244,60.498406507511504,60.13789560586482,30.255572541124742,84.22215766290108,10.038462262370862,8.699152120350684,90.19086229323841,0.5009227686382456,21.942612305430732,89.48917427190206,48.05159267043593,25.389281605412073,57.93194283956857,43.05738232632586,88.84644630458519,95.0659702240382,81.5707193455399,3.7495386185415036,73.86139380434844,28.66174955557923,14.717010316063428,98.86022791040503,10.321631686637867,37.10499104711688,28.751437923284872,9.775401067519528,15.0225134353827,76.47692214063507,29.054227144282496,73.29787377602834,79.27516617339538,0.5380365528677045,38.640078523492626,46.078189379557145,11.638697038044077,59.056645490191826,52.18425788874315,92.56026277192913,1.0214109535239713,4.293572671224477,22.103502018585065,74.42951083358449,36.47150329976774,77.00270086717786,47.41298909643823,6.265049978777326,15.039261111135517,90.64647338131596,33.65298988987347,45.905163716159024,68.02354111598845,10.08982855758902,49.28759945818686,22.738482895923127,14.450791366687966,78.3999679901108,87.47769577594013,88.26908022331268,81.13930185664584,14.125833158916269,42.602069872001614,64.36831936506483,80.77205402542882,23.516996111478996,13.68539946025713,77.0115206336454,66.39755418180695,61.83438043102956,89.90284029751379,28.03760141058145,56.687133270754316,63.63499671135446,39.82957013332311,67.56890755278792,67.1518957219232,81.921219721548,91.11137843227542,74.30182562309406,52.49088622879987,0.6783126118934169,15.389377894324863,28.978065762485716,16.88207885666366,48.10080204645206,85.07538176746698,15.62399964915544,7.302925378797287,78.57854567095836,19.158817361606474,4.073055406490433,88.02189846567883,6.9641303463485515,51.310268441884844,45.33376776188274,41.07387846921837,45.764482778072036,69.48501305452149,37.89436286551524,64.21748043411635,59.77489031260925,58.120289720409545,4.550923684375441,47.80400821789965,55.68959810425389,89.1276181112136,63.40052880587477,63.08152994667999,13.472022688012707,55.21602414027067,56.76438480210702,80.43567431944523,19.247631979238534,9.72693506316078,79.75732459178863,19.370278959029275,56.20287566688735,72.72337020129494,82.34700421801992,44.557791937027936,59.333039264195975,47.30778137497034,1.7611124240167308,79.71077333691422,69.72739858425494,80.78698434748397,25.199707053320818,58.15559930337451,0.1797057653760037,0.23545049172692956,46.12620612404166,82.982122400208,37.9271234765038,41.10663388637372,96.77631086348397,56.60079234345545,78.07848731647486,20.12597709525894,60.52585753740287,36.67873228349443,46.37470056347459,5.311074088514878,28.387574476818234,56.07649888807356,41.5655767519004,2.8918716166041136,21.420361114956332,87.20792740257792,69.71471888909974,28.99164315923446,44.780039532164075,58.37724794893584,20.594595737960518,54.91991588192688,5.138681649459054,63.16906267280524,33.629730400016044,60.67742257518742,27.067913528631582,51.78192384559877,6.876062463084964,14.19263785733409,33.64989469419992,79.22279440978286,29.373590935923488,37.445205925597215,58.271744228549174,84.81861598080565,59.161749734669435,25.780413765165513,74.07927602640044,29.670445725348937,77.9352034124442,30.090588572521114,72.89486616838714,65.04012585275487,78.50997597190236,11.185164641329614,16.17099895024865,36.21336027584763,35.112148633980645,38.56589642395849,31.474391004221648,98.75928947219317,55.79449746267979,92.61942677334902,68.92110331532297,19.72169252096265,24.210912727346546,21.148980913542736,88.43466133378199,76.27015210336702,55.9285473883798,70.01302300119828,47.46109082956409,86.55094520304434,23.28520821379434,63.3656024383987,52.23452128794759,54.9784914341908,89.46141169678752,67.97941529551233,76.01682170337807,21.69344720202824,93.6655058788216,79.16313093000444,91.70277085613085,98.80359321244792,35.98545114364278,46.09897203748938,52.893265529550916,44.76285929083925,16.396882521243317,19.98067528835621,1.3745394256771126,69.07516636783112,64.05753999791301,32.35508002918286,90.27592652956389,22.08295287828146,32.674042411382295,69.07191340859843,12.839032313217992,52.934479286405804,59.944555023539706,89.98501146895606,30.186318205172125,61.15271940572959,88.56480414332356,48.29630249068886,84.98816894841607,28.611508338888324,66.61546727793777,57.65859845809986,80.81524569378232,32.252288287603804,72.55682546853772,56.10284187041428,46.27106173131639,34.95447468434585,44.47453943736548,24.884168438279563,7.4574055235193,67.98502239742209,64.62342399851362,57.72878807658692,93.63504585956002,36.22517716105731,2.582084625745784,41.67512360608059,34.081643769707924,66.73112797663256,69.16253905101952,80.67214087472733,79.56787125008427,6.2536693885553385,90.97444001382355,79.33637210703132,70.54166948802076,91.41571400892828,74.57960789562637,25.598727253709686,11.047002665346483,42.48235403563141,12.225322069180788,82.83606523259135,71.96063560085109,22.74993165320005,29.783880704815104,27.44701563671159,64.07349389820207,40.18937866791388,31.970717963911998,23.831067509574332,98.97424722262261,14.072161757280055,26.196851024175928,12.615854134248416,26.626633689861578,47.02636651117147,68.43639376365196,67.55647160694484,49.51463580834663,50.419699800608896,66.53404273873913,32.279640472921756,33.291794148360566,86.95521520969696,10.761368532038329,5.460251540512995,2.4620538024656025,94.64072080828142,80.91033711923585,90.99242249909085,36.84862815066003,18.121699139817316,8.217781900486521,54.734525566488365,20.273828096441736,38.67335834770027,33.433391221256706,46.178577943463914,46.40208643273063,23.15036606998262,33.63946346586897,70.62719119499215,49.035659876968495,30.99304105493863,58.82739872799456,96.87200256395239,81.08263114085325,25.44936950052188,22.98498193777345,14.634899095557996,69.35825111893783,44.70891277025648,72.30477644901431,14.911783644394404,63.49477968865516,57.4394557307631,91.32162474334275,75.63042648086311,9.084170342363308,66.85830239200925,32.840667143488524,86.25174386868683,8.541942512854073,44.90230102347989,5.981345741011368,31.550880772879776,85.04891116899024,55.57879450937582,83.95414422386914,67.09925785312907,5.4644917249502045,52.57642119717618,73.25659777897913,77.02395729701877,13.911971285348512,7.048213828728178,90.89064588532676,59.95850038274304,48.44871268136184,62.507034465341135,43.574948860753416,60.29921615460261,92.00473644992833,53.958620540088106,15.366509462711564,70.70566842608052,47.8362585959887,41.59515556826332,28.06611869570188,9.23553050413155,65.80250300071495,16.218017698814368,39.81298232803579,39.19411649613096,81.66034548321386,81.25594886115026,47.25888891788621,12.882689276980997,71.07145103390087,48.18249099279159,4.301999322438266,76.6167763693725,41.58356565466603,76.40436130067437,29.248741918189292,75.51141195018205,2.14811883324475,47.23586887496769,46.00147559499459,19.766450700377124,21.565504336711538,38.038960018073695,54.24415265581579,48.35490979741901,95.41090939061938,4.102755581529349,93.55313885189551,28.01903009053952,41.65523908663638,80.3340199161293,7.6515741962800865,23.242125058108478,8.337842263762486,33.270670396616595,9.831533843032547,6.614860138504386,31.13582397890038,90.89740028445219,7.356183335593425,25.90327376703625,32.16254096767235,76.01607532171751,49.274058481834885,15.508019833585895,42.724490661970016,11.675386073962635,27.673632630867683,61.18024980374217,50.77099874984541,6.115934478354701,2.1755108614095686,99.72323510410047,11.87541525756506,60.961524692318726,23.112397413246644,94.47875622518407,7.225951078809012,55.91987686742201,13.157657051482063,34.63168202227433,44.63621556007773,87.32412530939465,50.129147125461195,96.38867954386332,28.658639078911463,98.24479022973853,63.82744141599519,66.29584576012498,52.35949317851838,60.525744616281266,6.678912251082814,1.080958209515126,82.56478372624065,82.88340972490198,88.84542533124483,36.69317570339332,97.76758397546604,35.9672580086547,47.67832869006785,86.71499882298666,1.525251030153707,47.611759776382655,53.183416020164145,69.10590296971041,94.01801056941328,20.55643706294181,80.83595806120876,92.71215552712742,56.402791089959756,62.34012436857168,3.691470125451679,27.36921385451121,38.28145295205161,34.31224758288993,62.27537488034809,9.926380853306394,86.788875070238,66.90606185003884,16.434381229905682,14.873557216048528,25.7600872639423,68.15250311009224,99.66278017604657,94.98655195288666,26.34951599459694,34.29376571546958,19.337885582762237,27.291755464177548,54.74117464960773,17.422554808016777,2.6626495843923736,21.8351649939996,45.218515601984734,44.26316325854651,55.161000719146244,64.05535467161585,41.77391053834021,42.79472695751188,5.174392946859174,8.190613954783377,6.231393612134939,49.07404840032994,10.689064816258597,49.59047915036541,22.573374891411202,8.447513225459868,57.20244304383042,43.17210333896253,68.81337644848473,26.680203331172734,23.45418747659074,48.71485336234234,47.71384975163044,38.981922231284585,9.943753376204235,78.72240007996281,83.83864758617949,50.636794121535566,73.11535774765316,56.34754319550939,97.89558513591243,4.283536294391799,84.5154925802353,69.70982102423868,98.90194038014022,18.527030714539517,76.43538855681598,46.45594388009195,34.77719419186811,72.07286752783179,38.991584992954074,87.22243731548778,40.19824506574787,71.78279824167291,0.048098821570508044,97.23874458952734,9.436400864027705,8.036983714381641,59.30600056801998,9.723636385895995,39.121559722190845,12.228936230830678,58.17272432276675,51.2531877107808,4.2010973490764325,0.10721255838652688,37.221990561823624,39.454103725038216,70.07814166149404,42.75131649417503,80.02377309144318,82.50391084689966,88.61687480279335,22.890605338542457,84.63112556568284,49.75718924880563,20.90699378070966,16.936938266410074,50.002480897666565,79.55616446400226,51.25107934265858,56.37811824142673,86.52954654448253,59.93244429510782,2.7173047895378444,2.27577304330846,78.46412048496434,40.82620716015597,71.78969954159528,43.870485564910645,53.26717131317731,53.693284482582285,26.82470086344544,2.0607017311316866,95.80385189968734,57.236560940451774,37.67107519657156,83.28754054114378,37.61377941062101,54.829512953028804,82.24440986791362,17.744252982320006,38.06250021319062,36.20338276824848,15.11596787204137,75.12074826697845,28.463021357183436,85.92145730566327,90.3217825761651,30.415870890653075,95.83586978381453,20.432797972642014,8.24890657461237,85.7734909081753,1.8450657955340066,6.62585477142128,11.492423541571961,1.51003525382718,82.2637187709613,5.351518141764933,74.76764899822834,15.170405974594336,86.39187654890843,3.0971918891080197,17.943572744843415,55.037229747391095,17.581613144410824,25.333697002610165,79.44379890084876,96.3716886342453,89.63438145429143,37.06002032903986,25.22203637353806,43.03752460905772,32.54328850425847,49.607259967846005,51.37269117962611,41.45081281589653,74.3671379916479,11.622759785426261,97.14709059113412,93.12335847497006,4.734250116336014,22.965224300735066,4.159185253294084,56.88074003157768,66.50813085268688,77.40935409795009,15.36931315744765,47.70073267133594,62.39210896882796,7.4136051025518235,95.94194987547932,90.63971758436817,92.60772679566864,15.852760869074078,14.716013118203207,52.27730599048621,17.46680732421457,23.883486321417415,90.2992052459249,72.67143663793946,2.0222823504349785,91.3837936485199,68.85405083904827,26.696514792505077,77.84401316735669,82.76455245948576,96.85121533129926,31.961255810892997,4.204053137367603,11.240857582376652,97.5064787937133,21.847888309751152,0.5156934444602301,15.967820457294813,78.5776481501983,97.69391694398718,27.687329085721025,49.62966655534802,3.5818780189103228,59.07257999543132,54.42567472454165,50.22075902939787,34.958125578282086,92.22372495234971,92.73687402960276,81.08676279738047,92.9522390264247,75.54342819214897,36.46838604045788,65.85276754620588,0.7420098660692931,97.0839936119114,35.17739734102163,84.77654345168789,22.946024971058442,77.06054289312958,92.02074047596034,30.626480331985604,45.90315956824442,3.547626840061624,9.73728882035303,32.27135934589984,36.15903388960617,86.06125863481411,46.37452562021809,15.365336231826653,40.75553985513272,55.608900454106646,79.46495358531371,24.010447979168624,26.917396414808927,13.569915133838295,18.787904323478077,35.66947164949221,26.11623612656324,98.01742722723206,99.62345458246362,4.0200913066997135,53.633033651495474,60.24381615892938,94.62020861199139,10.381201552808594,54.80218136416644,66.99657134497545,34.110061472388665,0.009413026317295348,40.223269970448136,2.1303886979852527,28.684965976272547,95.723364505763,48.69075274119097,66.89814124876045,87.97716998678015,81.04036902171944,0.2546278199642149,7.72681145404539,38.366883822723594,4.341991711845772,28.534933610141433,95.60043363767204,31.932609267285716,41.93491964689209,28.434587289516244,45.251869481002885,66.8246391456076,73.34449864390713,49.26748860973183,70.3080341008122,33.99376084020504,33.99721276466367,82.62042010596741,65.96498531734395,25.840254416791897,77.51449676219676,34.767894925578815,48.127060309633606,46.781169604107944,45.309049945455726,7.113095374390621,35.42675468456864,61.686295217842726,47.86728701793817,79.26214306380237,33.21112106543511,99.8651628471186,73.1001057940901,9.526019738075364,5.513006883110938,51.534721758543725,16.017615035681377,73.01059105960546,79.32286680385003,41.57766623765846,58.46252627146351,34.00230340001651,96.16114264453373,5.719855289281961,25.11871945189419,77.01491534142843,35.63836158258895,60.94087282822429,55.63358352061854,57.356885763646325,77.49596478206982,27.376810873773707,34.81838553985979,2.95157282492593,30.243287529608388,13.629900411428775,19.473438583198632,53.58530480853692,87.13797249936341,40.273016979188256,67.77207037805131,90.69294665193162,98.80816369360706,33.36055399413161,62.314500253662345,0.03939568993120979,48.95875393995715,50.128622041519286,32.013807416005214,0.8031409763876951,56.94472247431857,5.776888543085024,91.96605665436599,71.65596740790556,3.759498080348389,64.55639427764059,5.0111599248636285,12.036391963001858,7.398334018118069,8.717773892537895,35.513975848183854,41.79834926207868,38.13608791460214,25.91164920435962,18.03057641686303,31.628662866055922,31.7344947086754,32.638132617619206,67.3663311149302,78.82772870890385,66.79019055396087,97.14967329706367,74.53278380112877,69.66905720716295,21.919820546116387,3.4722942661606693,52.75143696076039,22.04584234416178,89.8655366843903,55.45913249157457,14.794557929539899,22.397662594730726,76.07222933852506,50.208074318191585,61.584368502211696,17.06427203884575,32.243718520430754,57.30145578825119,75.53286891804021,16.84561580273627,18.66514346675634,69.30034340531448,7.458170906686434,8.137876477061479,60.42432581784336,9.443774001828498,89.48926971437253,96.7845949064817,76.55000308603918,20.074960586052892,35.85352325949942,87.41589340590632,88.72381278437764,58.00669083153149,51.14013543078979,30.764642797816634,22.66672651963779,8.62365754756742,60.96414582407761,60.00952159161754,54.470226436718285,36.735552002232396,74.39442242460603,61.89098502127885,82.24074824349526,26.392000961277738,12.485827699522979,66.33561385877114,93.65266456211481,64.4288362065893,25.447775847312258,86.95977486454034,73.50598406636229,6.627675424198021,15.407557477488321,5.7487925386610295,81.82861107010713,15.911395348372892,20.07565944608094,73.15513934699187,99.33498165375308,67.4568236156814,40.2096768515267,79.79005828939809,74.69277798716338,3.5993817435632236,95.05450154404313,37.23093407721405,90.9728242993705,83.91616822509435,92.36335422540232,70.62459927542541,11.295254207613059,73.01580748676855,54.67012289012692,53.972629689573814,87.23344333837997,8.406129330411115,79.79057159850953,58.283588291777356,3.097367773819548,2.8975753264830706,1.2140676862131272,56.47241229126658,82.65329760087843,3.7531624842064293,57.22132484470497,82.53938503821774,7.2926258809415945,66.4455655008856,75.75349865205006,80.06173726477377,25.96580660107368,29.932082371486125,95.69071855572827,1.8521118665383085,53.911841923478846,16.67612870027053,31.632792927642804,10.629809136821788,60.48060565635438,67.2973873270857,8.086958441244807,20.803507704855928,84.82436688185481,56.06449596990804,49.31456108878925,22.866633602859523,20.94234159736008,53.871059430496146,59.324610223073115,98.58832894573119,56.00368934822513,83.84472479614537,74.30434031633555,81.44693783199688,36.616490890368624,55.18679929789565,87.49745245249,77.83231805363427,24.690048412530818,68.8160616568964,94.24101983777082,31.517512643717893,64.70208726449947,83.34043029808942,84.85911841680607,65.69140816132273,31.241645553601714,72.59839006032904,15.521975919889108,37.479903249057564,65.30125856015133,90.59001278290424,69.9025733663895,5.349785880077462,95.68016503803285,16.83789919856973,5.380462271182118,77.3928368370906,1.2352216407585992,98.24272575129243,54.5504154019266,58.16180473705985,26.57908903324504,31.60044430674047,4.736415059031551,2.755795133601957,22.112290132917558,20.494237562300842,42.19537592126341,96.321801260646,85.7801235895835,84.20841631613713,80.31421120652699,81.9590546644864,99.78212632472317,3.7403260897343804,31.400312962365607,77.25487758910892,86.39114694752865,89.72088850497815,43.6565687593188,99.60823556043992,87.8843629280033,77.28770750867639,38.67950084217669,20.945605117332654,21.15971940398289,95.11527231033826,6.785442561199084,75.27255008384547,82.91613951155145,16.487701435278268,72.48760821495446,23.405547213994883,63.96229639990927,98.66022834490768,76.19646896483154,71.44229374062185,96.94829490490737,46.11633237038335,13.911018826353615,8.094036551530092],"b":[25.352529577845285,38.60129396272573,87.18198317128561,10.871415138504275,70.17406854137005,34.602576476965424,17.699020391444947,35.46015897780374,30.584517091001363,38.54250672715491,78.9995837832938,44.529046263990764,75.50352691355951,32.10053511777973,64.44636043734528,67.32836806588728,63.29219287308436,36.00569708909264,71.1240986540759,80.27205682129862,23.719313164047175,56.635081311562665,69.36020917153843,62.320572546954246,81.62468592116723,19.726445710034888,47.21627561354123,56.73742445486615,33.245730509215534,14.177516760739586,57.16149263863826,75.53082450693196,37.29596913917353,30.78582805178349,41.306053603731925,66.75984106447001,19.962533646942294,85.1919909573261,10.474477833656461,23.888211936960346,89.87772982017043,60.67448248210619,31.565940531066698,60.18850641850627,54.6670397561373,47.328971628988874,26.62744055867471,22.60602325036393,32.80545260246989,72.40705456513574,72.44410190665815,63.992137605594,66.9700095045835,24.76704835533925,33.73374906795424,43.761576469180554,54.63133438740482,12.200009325859039,12.536348159581152,27.67058239942449,52.834144837240046,74.83113351961703,67.94824345416525,56.393677365676766,22.37947982627012,68.53248544849501,65.46276827602584,96.22430999365314,72.47454010960556,89.14192064645205,17.717409061860838,91.42187216649691,23.787939983901488,75.90160821798442,27.7438915414786,56.28902928357097,47.912035696985456,14.793553890624885,39.97720361580067,16.46844795004509,24.067338049420698,47.87537259576422,54.057065793489734,31.006494475278032,61.46527153963747,51.2443948540055,68.27239532239395,51.59464085642206,84.92501705296789,34.04454932813053,66.1166727358482,78.5570846040736,31.632516916298687,89.6424766202961,38.735423841496015,30.63112354395088,29.06455850301787,73.7496598364167,38.484690155607346,12.952336272545661,48.4269625207435,34.15847546395275,89.37736587538538,21.17306296614734,25.856663573238414,16.390305252093214,78.3921443933147,32.343758627276614,30.763443056879428,56.97310707827366,26.599276316431038,76.60897582929566,72.30555939497863,74.48049746893943,79.62291531368075,34.22219527762423,51.73607320951152,14.293939069760064,62.55571648886081,36.044948153140155,78.8270131781783,27.74269590196885,73.1672099907428,46.06283265081373,53.79372448585639,36.30051408751528,24.366980084755816,34.92231738752574,41.75554046812116,34.544512658296874,35.2088292658477,90.91284665756409,36.58080636413072,59.94328374700383,44.87250899850997,25.48781726671634,45.303015342011506,54.6808800731415,74.35109326742459,29.960198277939305,4.807605835367679,70.45096676026282,41.906298198350925,34.1104886337894,41.739314133947204,42.64911032461503,91.35323258172156,65.87913660673334,91.40093894443919,45.7466271566589,57.06678063072515,39.392915659771035,72.51005529024302,11.011366891927391,51.05525761688947,18.2961407072672,68.7194484110738,36.130605623702515,38.59747660312925,72.09823757161908,75.11195673225335,40.679720896622925,76.36400027090941,86.67439875096781,20.333255341512707,57.512504929014256,59.65895928412449,55.40117991687192,19.2949149323846,26.094616747795293,31.089815918313697,74.84850084559545,13.747585683784695,19.23434906920204,16.106554619749367,41.27156914320446,44.001283937050395,24.62596813093245,74.37954475724997,47.839163422821144,43.98608599593807,44.668809140219686,20.463773057265424,66.12747841547377,87.89877935170183,88.39133266844111,69.50878912276389,71.64855191226545,44.332757887545135,28.701229203498677,73.09610328685028,72.3618633386307,43.63345029993419,21.705525345830704,77.33482946295085,16.103796675700398,12.94704920632432,67.17342856130614,58.8103371589498,70.60843451405772,70.7363093128044,42.96124315495172,72.6542036030508,19.946229010403993,52.95258137370162,32.748264939045185,98.51580636118797,65.60276558169107,12.273001738616006,41.72407982038366,72.78871749833719,19.714790447168582,54.833585691195644,73.16489098914899,52.783770501910126,51.560824811032965,81.06873576360734,9.950189100094175,26.476912402329166,22.472925577810194,47.722151981213194,70.08613553717271,50.64339047523805,94.45352103234309,59.84058285418877,21.7019091079495,82.56520246496754,44.46062422098572,34.51093358004021,59.915922610635164,79.56772241706416,17.26800193512332,29.98879217632925,26.495829747468935,25.078583162722058,17.528063772843314,55.96600734471167,41.788300108394054,48.460210532411466,15.508088817186785,48.763080798214816,70.56382086397927,54.530351847586836,42.10330594829334,1.3476008677504758,16.572715853080492,38.288286568168736,25.132813087334142,44.15070696608302,40.70300874824777,49.508955024556954,39.72476270911656,54.08207971182823,16.058541561361054,32.16733679793478,44.24153723776433,36.81352391065109,85.80806843508313,3.2221684273837603,30.46916702316535,45.54108075607367,18.029422817940734,17.34044397307607,46.02393094479467,62.87727590613797,47.56290582876841,58.07235008168396,56.45347945896884,74.87077422631961,19.205891777439778,22.164600305057157,30.021930978590618,21.536900954567578,84.54046375067344,34.44920514569108,30.066402817335472,55.68486906091192,78.63008631710422,23.549583729290042,55.372835096665725,67.7859615385292,49.344210293092345,29.99715381171188,39.49719859686928,66.28828396295296,42.73095211816592,15.542841429264872,21.080974270396936,32.492768947992424,70.55315977098452,90.43828863477844,44.19383360184763,28.609518756556085,31.050264031177427,68.76582351906546,24.032255869419682,71.754155111562,66.00449103610157,34.868233020241234,96.59366740258602,15.487606313391789,36.24761989827766,30.12025982264744,44.84122060830947,87.74106376677011,36.540207399707654,51.9454291656217,81.38368912846013,79.64842524579532,8.758874586984966,39.07951012840914,17.49251187787148,86.63158633579673,69.92874713136071,18.71222137934414,42.480839073039974,61.947568157281225,33.85996514937992,12.224300316531203,62.567965610852305,52.69384411723247,84.67251531884527,77.09826673909876,28.69637714029517,71.86735460628186,81.32778573594611,26.236560100262594,58.76538458281439,36.523132960671916,63.53294445052008,28.86566295520662,71.10757697039114,57.92440702041162,33.27991246709536,23.47147503743507,58.5707994861551,64.18612214025107,26.887913067238287,34.350018698935244,42.503225963563835,23.583526551540107,60.51182963034596,45.38329080827822,13.834747575437563,38.48333193440138,79.00230395587141,51.385652676762135,70.31254429966631,52.77877762597802,10.40814884539634,21.602120919447948,72.38173491376591,6.081971832831243,45.154790200847195,85.73491459132653,66.04345030524085,61.22206635989684,84.89612237349822,27.622365470134312,28.3061306723955,29.00123679923164,55.38330653660714,81.69118556008854,69.49050895307313,82.83324443896268,20.30663123328036,29.041279028783755,27.666530822888433,26.108381655065692,46.39808286438931,48.58079070083549,20.91034391356972,83.90448808861694,52.92994205858034,27.639785604779536,72.76728813261468,88.6354378377625,28.474043645479266,23.794397537141272,47.346329982555694,29.84322174006115,38.30480562250239,44.574163817943415,43.409526264158764,80.01023842696719,9.975389440424674,30.210349060104615,47.950361669269924,17.95671905246088,71.90667862040848,80.07368667437194,83.41610657804453,63.00304156796024,59.12181654304628,25.458601815281344,71.06599839845431,72.69804093105552,19.10599872306844,58.87328205629788,69.29056160827682,47.214871541675485,57.0009556945411,81.6070451937008,64.4652069510799,79.22940877799455,73.49538595258046,49.49398164557893,78.55659910989743,1.8414644001452984,83.41579951315241,67.52341928960449,28.355793310196404,93.48507292812225,79.16983217394917,20.730728879348472,64.96052749622562,34.39844340411861,85.2324596141032,58.558359173660946,21.060649403240177,13.772035599942605,98.63958474503175,46.071747524314894,45.300134683889596,92.16119397164974,28.83234136480595,57.2790616123866,55.9064714026818,63.76033698316567,56.72834476504059,66.8306727033053,24.78885131911909,64.041027218494,32.923555866872064,12.586924846051698,78.86705769949263,25.07004286571148,32.13993426417675,58.86985210005484,91.51598267648552,66.0889859481282,52.479835230939685,90.58607916216549,35.09636471664142,85.01496154030143,87.92230656922243,57.75842077383285,49.09321069800056,48.63824277135704,73.21575306982565,63.809126232520065,5.0690214985354,29.492849822180926,76.8692023925054,59.8847039884228,86.63891644048672,83.4688003869758,24.89500213337038,9.627007549444215,59.5814952004535,63.3872440888905,81.20649370237543,5.188711775484864,71.20089864132936,58.25171111328936,46.05781554620438,57.93563352233843,80.22290053955142,89.25121459896835,72.86011201010041,50.896860775299,57.352640132293956,17.82014298125358,22.491846341023997,40.98030186084006,91.3741828361487,39.648963532206636,16.221272156420707,35.05763646133755,23.795206020510697,65.2941351664842,54.84044964595929,12.201198251823744,67.31960453747782,60.97098067796842,45.265538678522994,82.39859001136838,61.34900931205155,47.74873333026936,63.95607752499664,21.432101678321814,64.59340584963583,63.37814099504449,38.999471679985874,53.451572775708,75.39134915519645,47.46097545182674,4.989250911134264,61.619033444850835,69.90765712377001,41.378115666373354,42.50334869631283,55.85123023067985,50.338012569497366,64.26018118138937,69.11848011775047,82.63104771240482,46.75595576906801,87.05147944324021,31.95014650089771,21.40362788330922,39.95132800882358,32.98326840052547,65.77696059465701,55.79189912831711,63.47641487984629,57.5286078417668,87.25151511794911,17.132117992865044,57.765554802918615,68.50861324432208,83.952128172661,79.85616717304957,50.651756412520335,61.58118367160803,54.62264999569538,87.22839704167546,42.33559543113424,49.71941550493772,25.856512459224177,47.11840099441757,11.45159597984053,47.00811296703977,35.30723447445336,27.1971194903424,34.86466531196832,62.50990157204944,46.606012611320914,86.42363747687722,90.4906135158682,22.07881052324769,70.94708550712159,60.05810482233466,75.26638663554756,13.095483044477007,81.14378765868722,20.85498760465944,31.05642975028418,58.70848333818874,80.49776439786113,63.32644232044835,21.495864196511484,84.29872644200114,57.903895043272016,15.249807255664546,68.44108739767971,39.35425477944791,59.253501376115686,27.202396926609364,52.912712531616634,82.09054357004747,78.99499479924572,29.742211736891296,35.574247787352,96.12131686764843,69.19937878417366,42.29107533834965,33.01159245681862,78.7800166383928,24.959509779435436,75.68411376784938,53.37112199110234,36.00099459363809,72.88554659872604,38.96410434722169,85.59972064677382,32.70248668514762,74.6152822859283,49.61869737565334,51.97019586013853,61.328520438034374,44.51451289721451,71.55650782510119,33.8475799552814,71.4160772642171,39.66431382854363,60.271098108229175,7.986705588337513,41.97965424908995,29.602908689249794,66.02937408784402,30.637062214752273,20.79201015585383,16.416864891848697,26.376602751420684,20.040154779638755,49.92736220943079,53.18826252305586,65.7968597784332,44.119022378115616,93.03084939091175,85.38449908811057,85.41096700951886,61.80535405137088,28.717219540634392,74.9560182262697,94.29844021516057,82.22757910916181,39.15161804256974,75.91304685855287,48.47262952450715,75.93611807911745,52.63341877806077,43.58359053981236,44.690132483024456,31.425751411791254,13.79071914728331,9.77102912485254,22.62249964338318,33.407870049118756,48.23583003429543,81.98647770561112,20.361460014363377,39.40675506858275,31.876298978702508,58.865813743880935,40.7871653987563,76.41524738790244,21.888391823266367,34.52042432897825,47.68574098918067,47.0754303404002,16.48821002101733,66.06316623482607,73.19025028282672,42.14773442823761,76.57191870153879,74.26353588717934,81.33641250985653,25.55308746956769,29.581351882938172,58.80080637649624,69.87060436719777,14.187227078298923,25.888731469357253,43.95600955837397,25.231855327697502,85.60192366338009,65.05455966595972,82.0965811664757,51.77039113205927,48.1668901763534,38.50809619642659,47.5288876851536,30.430348175045822,54.20689816231207,90.43639122998198,31.01136616541889,28.715268266299635,77.44794356797821,62.720215753283156,32.94458400418983,49.59174830753402,39.52396750978714,35.58036343493377,57.00866685938614,74.16751323120859,54.67954775127204,78.61107624820659,78.84602357652086,53.354879421717214,89.24082677461638,27.62421219538733,59.298565183828174,18.115514375897803,46.667709626634334,21.041311199536814,34.436276126432745,71.52991871246266,83.71083039573053,44.45176538637504,65.10005003581001,70.77048685409883,20.8045676364327,59.378966580847454,25.730440203129113,85.0014563506956,61.886037101146094,59.24716711985755,84.71274294111414,18.379555888670225,41.23789346459868,54.46328115915248,71.74225116047008,44.92453344518862,41.639919795354004,49.092107073832366,90.22207039934865,77.54152589847027,20.84243578112,21.835842440113076,88.35619537871355,29.30874469678974,13.213372063812056,44.72441988449971,43.61461364358135,36.025150552362916,14.065207311981286,17.165281625698654,77.12033176559872,80.24848478879163,29.681176283747792,34.35426661064729,32.952337522756764,45.87569883867175,33.290585559561215,32.754394061775805,88.69737801373337,42.63492736970488,48.17510837420438,36.4786786529814,9.920731638695326,33.04680457338088,52.17771942907417,29.724176966131033,64.1765315205915,13.347282811658854,58.39301313581467,22.419439334817767,67.47532185439978,80.25172732414713,62.12540546803085,54.536808074028,44.15666894988666,16.02396796616587,67.9097563850356,51.21891432121055,25.879898065520898,46.87434262653299,87.40275476510166,3.0227439809891576,20.328311347729727,25.531730464268538,53.49598728571976,29.644171843721058,48.548008968272825,49.27903194897994,41.69803163466752,71.2725095946731,39.00570646178849,74.50152454684141,25.003252396604587,16.657597367064092,35.78726373228529,43.162864333363835,72.3290986419579,72.13594263576613,77.55945604259247,18.925218444763857,92.47443342405465,39.47114012821065,37.528024913192034,92.5099860779913,10.100896626566733,26.34884771180845,75.29532279529815,60.44890983877876,14.449271272267069,73.56778133617597,48.48670006667514,22.91112568021722,59.14292609477665,93.64060850464446,39.72768818793625,23.261379222009637,37.15142380590487,54.17443485110976,52.572694957630006,78.4701944742809,25.70269076594411,23.69309614672336,28.587731635150465,39.18064709258182,63.9354373104125,91.64754792242762,20.399877654704383,86.51695129817563,54.35048440148139,45.370719028619895,39.64682548090377,8.760177965301361,52.3974747748536,62.177248486131504,47.89814590062397,72.75863312915033,15.424448426192754,78.70942763863508,69.256134577196,37.38211355970433,77.33296415001246,22.99311249802887,27.533261813540683,39.20142464740985,48.3028363031441,61.7436029732345,38.85603487618938,75.70137435753259,65.7392017824116,64.0417308619298,35.07561248732579,57.77623654994398,17.437561250489267,8.201161062554526,83.5613691785358,29.362907145259282,40.52239536975643,44.047035886915374,29.462911163675653,75.6607638038619,48.09379586404903,15.53928548026143,34.96045818677533,32.09063158689682,8.844222105888635,15.258485608284463,74.97787009481286,53.593440314887644,15.69475061646405,16.794617389892053,62.508949257417456,89.50866747482678,66.06222435924163,21.07877809502398,20.362809060144023,75.30566137307716,41.456604115963486,18.09146585538061,74.44109851697232,27.17031955641687,33.05777822901801,17.830637743918384,4.836768027202565,64.41984397942609,23.1116662317579,23.661750118472966,84.05519063034595,90.78337855245717,79.958304825243,52.50268611852876,43.835207214825076,58.31041053885026,42.91545291073387,40.119296553723444,36.519958662051536,56.88604336400883,34.65242912691349,38.32510676565466,16.564502835755214,70.13623974810793,59.055645648934636,41.78333830234406,91.12325470059984,75.56333892226965,54.21153330090679,68.51344476452027,68.73343139895945,94.21405563802314,41.1347238904421,51.56677431253637,38.493410168216734,42.743394818103155,69.97390287244161,77.0329674687183,28.684338928046408,16.338125868891915,90.26429925583113,28.892246913865847,22.485558903802545,24.317849919020283,97.23585572779567,71.13475653430072,56.512166678790656,14.676946446038595,72.69431683519403,82.83872378422905,49.85019680533192,53.89430429907423,77.48695031399807,51.733727311301166,30.43638174738797,36.57635019919944,59.100971116194046,54.21307625895379,69.326890801746,8.574038594827812,20.943736122922,73.93381469982762,48.211293449162454,43.64041062904251,84.01663940603541,68.36957046345978,85.2374896957204,43.522606770695425,78.45834058918764,30.432251095808045,82.15126312375534,73.17457675273695,64.68404005136773,9.093234180982858,54.135217791194606,37.20573415968917,68.74300534593327,73.53023148327723,75.28217725193308,50.320687870770456,17.026064555076466,41.02911834690998,20.218720430896223,56.95206390386582,54.95112776867472,84.19675462458812,71.02343889805098,65.88101402840522,83.61569485244068,7.91119070367182,53.0132688962271,18.24047599828118,76.42385575374759,71.1229861967747,41.04639683228281,20.507694120598842,57.125582480581805,58.241185283645834,63.40924232463992,31.82044039047176,14.830721022206998,88.31035103721838,57.63953435235193,7.403198488518692,55.90071410637967,38.61445727527649,20.54478464405516,39.25450995562596,6.996480787465229,7.293390940623579,28.056321696928066,40.65036490459406,25.336873359863926,62.537182763736254,51.97918571229558,15.613318501367758,37.297385923739114,78.56241937349336,23.026275994185454,68.28279709875467,49.5149229430203,45.47573942898336,82.34438073999303,64.11102228244712,75.19063668920818,57.593614045093474,27.41697345718796,72.47633377981606,24.92884203147728,68.39102866672914,71.86161003480171,20.900747267280142,75.28333171069288,32.17164439615037,9.62731237291698,67.79974041302994,25.216320786950877,63.322246893296764,66.31166556534428,73.34129326753879,66.74453455633622,88.20034975675894,79.68952989223887,32.48182388426777,21.685588135471463,73.0583539585073,11.534073516863884,56.71021235020794,86.25691948360446,29.116147197249227,70.31656961769588,88.29004472860025,51.740255364268485,65.463337781894,80.05843692491311,22.786400082137412,36.91769845227742,33.59978400714472,21.70157268519903,18.975345656391852,75.06476847686946,85.97326850081913,12.796413924939216,30.395604929030018,86.11612518647445],"a":[5.601697035568338,2.336302096818579,12.62793052596287,3.0736260405614457,8.039775171069593,16.670272553273463,8.944363395973829,7.245621657177801,13.48491230306109,13.201190393406055,9.778588938136474,12.382893412930112,2.6210358193668526,8.254704525202428,13.031631889742897,13.095023369337223,13.05180650290312,13.326290330147707,5.993613488449583,3.473883748377755,19.047167690494256,6.596480801510118,7.109818159445722,7.850477332241672,10.883031825558147,17.009871321866523,11.323751664729741,4.762818537876892,4.888220527220688,6.940666210368995,6.251715140290943,17.57324856961889,9.376849003424589,0.9604792652138539,0.26029381642497906,11.073647308493726,3.818654649773765,7.051538585271486,2.9794845896183553,9.206688476655467,11.562291216592797,12.340867006977646,2.97570421418341,18.856327305170637,12.919193616918916,6.72865731251453,8.90931685218709,9.307068490712371,17.07399393970573,3.999208095485094,15.046879503519008,13.152102040830641,8.073413407132893,14.829896753417668,5.889919696824086,4.356297499641828,8.1774483115022,10.22844689329666,1.277408896851,5.004743365238533,12.254033533147005,19.14984584386636,10.704598011541924,15.387967136235886,11.522946166793444,16.450201085604846,11.069138263026188,19.68214671364545,3.3763321965731086,13.532921984540485,6.756930418836422,17.601421734195185,10.458250147412201,19.53336961299671,1.846951389012812,8.90549894306707,12.04254089531052,5.708824869928644,14.32410906425789,7.059196933922065,13.188811755172146,18.965551064547014,5.543759613879908,8.106540007565028,8.769868625739413,5.995793658147219,14.17100047737009,17.10654269539898,13.25083597907934,12.911461849299517,14.363420740598762,2.9284850392724193,17.749982175839563,15.58513401324404,7.053822357185187,11.395682746740817,6.003462297535402,15.52587860033379,15.37103429465649,6.915226510724661,18.741003534593062,13.263550870778836,11.515766470443811,14.980767389595261,14.040165155958348,5.5339493290063935,14.104535766943073,4.122393341015975,8.873822888517498,9.460722610003852,16.43118190980978,6.731632895620168,6.393005660663671,8.116425862826908,13.001100294514508,16.111381261417577,10.179475827666874,5.967484184219831,2.466340845216064,19.21466159786284,6.797004678252709,12.550676360035805,13.092931277520044,19.41828882202376,8.776924224604098,9.51888268673775,5.658511121967278,1.9062114367116356,2.9776390596130176,12.822791195500148,14.608332133318651,18.889242964786934,0.9370914007122355,2.485637449903626,16.992041763157694,19.13091546035225,13.218046962188268,5.728389165964876,13.229212657260847,0.8022466004698803,2.588974325564224,7.7508239391980105,0.731324309234469,12.859737204909392,7.150862164344818,2.0039689573761077,14.49058190044588,6.261840060734989,12.540347258932197,14.385342287035204,16.15970115999499,13.578698685109574,17.048147004649408,3.760443572817853,3.06652443641632,16.509274159858354,7.114635944131278,6.279341174513062,11.939174407101948,19.26457434204044,0.8223331135925216,9.876906632590924,12.05750573270997,11.099166306422514,2.5162293478286424,8.680808358060816,2.9309555369690266,1.8089915954577496,17.981567897365466,5.9113222827725975,2.079983373525014,16.945372463398463,7.727854799563509,13.193725155498717,4.841832073293331,8.847436526369119,5.2975674052178245,9.648188872333963,17.13640699556441,18.717989002649432,17.669623054264637,13.898301934162017,0.17174520754487332,10.521633566182986,16.270143490964134,16.14115268091801,10.208648959858166,16.46361579336835,5.824083719216877,14.764909512758813,5.213463824311706,3.834473083265544,11.823148321689887,13.484943331744223,4.2419146513827455,1.6942523813026034,5.949331360384829,3.340377469502389,2.4106583752665944,18.182527447466907,19.33995149892949,19.69136646324605,17.71015223619478,11.917646580263117,5.48819538957364,0.9738251667763231,19.121789372813133,11.695396158611903,5.363680885424,6.793296940901894,0.8637256441148322,12.853314623097347,3.9071958928848627,17.306109795131913,7.448049282049265,5.690384745861148,8.610344050030246,3.4104100997533005,12.970434000818138,12.18242186259074,8.17456379889125,0.967023293156295,5.061862955616774,14.776525513231329,13.04269444948456,4.373684080031928,2.733388183239107,7.238202709139925,17.014374316161685,15.626509814779478,10.361977387280765,14.190395924347957,1.5704253588728134,13.804476861217339,16.49386405317982,12.345851179182272,17.23066548049916,1.1682345146671658,6.79082536551856,14.486121984485365,8.579675393633043,4.488201633255406,18.108022927077194,15.488306605330893,0.6857044160014425,2.2125060206591174,7.033844558980973,11.732280443497691,3.221925407002826,19.585546402210486,19.93336580940683,16.69507489804031,2.6525097009139653,14.803100330562021,8.439647404523694,15.570714000239164,3.0166721248614348,17.783141179015075,0.5378730884091176,2.867301304127885,19.81610480397435,4.546077093498608,4.518012043998985,8.817388583630873,12.90159729037562,15.00812550828253,4.002022345594263,0.95603061392036,6.047002788083176,8.383083061676299,12.412455492844083,1.2702940881754587,5.028130961373196,16.335413702934062,19.723187078555902,9.874130291761013,9.4311467628732,0.9782384767983432,19.055490952066584,1.8625994552298986,19.780751334425887,3.267826291291356,16.991135717142896,9.886259707871194,17.502306838229053,11.930644721037957,4.517214314423135,18.604589900812044,19.560295785922946,15.643843589106762,17.824010700096032,13.355745651226671,3.235309865350988,15.148033659234702,12.652368565743739,16.221518876593336,5.286901264180788,1.6914951527846789,5.779403874514015,17.276539144106064,8.734028798583315,4.383213225201783,19.557314309227735,18.931814040620782,10.56796961464352,15.973368158203435,0.38771630823347447,3.614007235866721,11.785124485794928,7.726417328483599,2.748956633687114,8.573905091963185,13.099480605166507,8.929270446998006,6.7849805844166555,10.224052826428046,5.352837171347842,3.9535826629486914,2.874687356675203,4.500176532808857,5.813663205170814,18.294120326526237,1.5941704962406877,12.606083002408713,6.0115646871452855,18.127547581053616,10.332857926672716,17.882541839938074,8.285063051456287,12.916972621461568,8.459779576279193,8.727953603121001,6.909055697778528,11.424228558770512,7.888249396827813,1.2930448157955254,2.2439397176270592,0.9940346564615155,16.48945598634612,14.239834532805741,7.007241142814293,1.490136190027238,11.055271867279174,4.779202650558405,16.451673049476334,16.537139510856285,18.265192112546988,1.147440169927978,13.82832970547291,4.747261738849589,5.520589406061345,1.1697349606145613,0.02709637954046329,2.7629227404463474,10.907449837091875,9.382956652679283,3.724860299159012,5.536924035858228,18.66054752989244,1.0164341360844764,12.200675351583804,15.640839238704185,9.691956121155778,15.979254551925886,3.257800063604326,8.660142640264713,3.643878241297749,12.084637924321529,17.961754824024144,4.916102786530718,10.13998741039099,17.49880293913042,4.3699447173147155,13.724480407646569,10.996620250463156,14.675630684902746,15.629540179591789,12.374339437826244,11.496233287364515,1.2960062156547236,11.569034260619606,19.261599828920687,18.711675636054284,9.112287699141275,4.864644035623105,0.16779807819538473,17.899483366211015,8.42232052457518,8.471881620341662,8.331723492906796,3.4472891893907276,13.555205706600173,11.882299306624663,0.3423108438181943,16.121393753337546,11.99661527750071,5.444269209114316,2.1258097622839944,9.980301207308804,8.952816256712822,6.740017633932021,0.48012853529667776,12.920999977659658,3.5319621253521483,5.341380153112154,7.0153414481489484,7.320086597284909,18.72273492201277,1.5157939465851022,5.0486711271185,4.672918202561389,2.183802563239725,16.448334772951444,11.643597975190358,5.977153279924199,15.549136061779008,3.20976364139117,8.789184789189296,11.698011530364436,12.297139915096231,6.845503681751044,18.7315686027331,9.979986828468581,4.5183103943916825,17.034880015424328,2.1093838585947733,19.55453024030655,3.0647361667113238,0.12010353657837314,10.929287333492233,4.242146109527445,6.643940228746743,14.64599365377178,4.856465074283154,1.255721568155166,17.540148308669114,6.932822040640478,9.227090514758721,15.54342693538933,18.121991148566998,9.989710218245499,0.243343539281331,15.464950130179016,15.316308583497044,13.292782025545943,12.497896149949362,12.107649187890136,3.710973563644626,13.988601304829892,19.158245078323546,17.749535664132537,2.9155645399356844,2.402378085060737,18.255409739604737,8.102554959882081,12.377395799180949,12.805680211443299,1.940149921797274,9.02023019811022,16.384456611470583,3.9956378771725376,15.082981014873681,1.0055527969060263,1.6376662676647058,7.972530653620722,6.356572283574233,18.57260410500423,19.178031683348486,10.02352340024343,19.32226454603442,15.256148760231966,0.38482807347493875,13.746880502991313,18.497501712182,9.145575945053817,13.218752301844363,12.466943464637117,4.909756986889566,10.124495041020838,10.216325317000816,2.165927377841128,15.28205985351942,0.9372612942829583,15.58998192527254,16.06157635678398,3.5318418549584463,17.32606377209442,15.341461597974488,10.27896181825216,16.458504113801673,8.587340201565784,12.845105742618488,4.894870485148264,10.773239082132879,18.37386379046277,16.864501449000695,2.6482092914542488,3.0819580627862964,14.250251218796537,8.56260762077769,19.24543784421493,9.500074484054398,7.135992248963352,13.43853541660092,12.256427313136836,10.991987715259839,11.155021819501476,18.500694873702557,16.087185043503283,16.431785930945342,9.627070065052745,9.251560288810982,0.2253579917682158,2.8085642309066117,5.513947767152905,0.2840272764427443,6.845229500167855,11.555770320043987,5.284536084403597,17.462906292803915,7.01846701526295,18.86628388998399,16.194866687740834,2.331778506704163,0.2179688759191123,14.343238741865685,16.888165214361713,1.8814137807027853,14.475718437592327,2.4186391233212934,19.351167024593963,3.0031892470398702,2.160052115400739,8.01277400133742,14.621049781436835,16.968125422201183,8.863329535512658,14.904980533354447,14.776027054746974,17.71971124794396,17.139851283535723,17.391655623223585,11.682129287395151,3.848877149120966,7.138114609244401,18.824000929868827,3.101488586453076,4.982996286572745,8.922544269955338,11.78478331418303,19.634974612205877,5.127116580623521,19.911474527399925,13.42976298198218,2.4433697777190178,7.204263811845117,18.21269409113789,8.697758152126646,13.797147767947461,6.798185987242453,10.823613305338032,19.16728750051447,17.452798446120575,5.814461213616919,17.964276551186238,2.8522910397234824,1.090670609205806,16.781564793728492,12.494541270092508,18.94438963917409,6.806077689092778,12.958359204941775,0.15502932537530878,13.85092063297634,18.50178950081137,7.733945141786691,3.569241981252609,5.8992807955322935,1.8220590803732062,16.316286805432583,15.148930135333387,17.852966351232027,1.261060439520958,6.8891890674316425,2.623685691152029,11.983819842618267,6.056613209462065,3.2501146179190687,16.187301597207906,16.54640959562525,16.917004544684232,14.492544552806201,9.692786336932002,11.62307492697173,3.7012262936215645,15.357463327550427,3.8456703503836343,6.325672424717639,3.7006342343150456,3.9971304715327527,14.965776001795126,16.078816650559173,15.245883984193505,5.616216867612924,13.265069257514938,10.084748829005736,18.535778991078786,3.1648187034084474,6.6534761563259615,18.227402006047694,9.58530630300752,1.03454384666668,3.3417265650212036,8.560279457234268,17.072776898937093,5.497813548207988,0.1981742101092987,4.88830358018868,18.636030662464616,18.201945273285705,14.79752398768072,6.982031904374297,12.589698093665227,0.5863017900181644,17.108705139049686,18.893974923896,12.433225732517933,2.5141614048087613,10.35470190264222,17.546198998631333,5.036445939259195,17.165801088815087,3.653639128071662,4.096213105923656,13.01287533404819,5.783260684999023,17.26340884145728,16.85030817618957,1.4372709045059517,16.88722703801313,8.40777148434623,3.2810303717616884,12.898491181114649,13.775581685762281,3.658403482867101,6.928175142165984,15.99975624416173,14.945857132483816,17.08744222857426,7.176556434665797,18.975752410550918,11.198955688741258,7.055000122868713,16.254048195536935,18.73084170084184,13.214453236203214,13.55808597261866,12.916522999439009,0.053041557150286245,7.133669621480521,4.01278530845135,2.7435222206925802,2.3310452173100105,15.53086662032003,11.86123635964005,18.643636849334722,17.976807767767315,9.23242344708106,19.56610500652989,16.830871444572463,15.553372337124841,17.24442399819727,5.122777089052617,1.1448897188566853,9.337913150194224,11.850152502854762,16.365972058200207,16.204140567211777,17.67254766720969,16.547621483645134,5.783672505156052,4.665384772510217,17.12530978974797,0.8324429232648267,6.037938967538543,18.274411845413812,17.23947850701908,13.380607678936038,3.55306003495254,10.415655804739812,11.527165962698236,15.285139209320352,2.762434462882757,14.356910825153468,10.881163470635506,1.923427913587501,7.423460072606631,18.528218551433795,7.612104654455956,14.454883439609514,7.155142997816144,12.568056353740381,13.41369840083738,8.076935598561409,5.766957467682037,19.077247740375235,14.440754802443463,0.44261963254634384,15.57436073786878,9.922673964402335,12.259221567789647,17.62004623678461,14.196879735875715,5.767371521909408,11.736755887464572,4.056767316531107,6.302710789654511,9.07301603629512,15.62359916332933,4.315025201965104,6.425215220428266,2.633829998099735,19.738986973371226,6.3192046401052515,15.0870273227709,5.91880067978086,7.716998374388879,8.954138956731367,9.08851232053632,9.999398287810276,9.642596313596146,0.41042305422498426,0.8647910028649353,17.2736914491319,0.5191542184967313,13.285123590353063,11.305481126807306,14.969038641564655,10.437330956403574,8.620609353179027,2.08916826846385,10.66499000889429,16.98493376397756,4.777352233728638,7.307313947277758,5.964449172459365,2.390199323634623,10.508056585522345,1.3517267370224095,9.793132365481227,11.14996042586943,3.184915130175945,2.4130362966706365,8.612830039401075,18.13602806936716,19.600607805576338,15.870144072905124,15.758893682506741,13.9862555414947,13.292003507030085,17.722625095398413,2.408041803015082,15.429099607705105,7.501871994440368,12.960990612939103,17.22092357471542,12.069011028838336,13.571346660065991,19.10310592195468,4.357212119376155,18.89598279258431,17.350106577310264,15.237663680475816,9.265866364060141,8.5748222744105,19.469455389270745,2.5423512579431895,7.174548729688768,4.321035558367359,0.48414036309872177,1.7567382999693715,16.807548664504374,14.772234459130992,2.4084554423126336,15.279894868396905,1.0513363743086312,17.274644952704186,3.237111620946971,0.9010266056538452,16.742221581362344,5.9267352203653,12.504600039395593,13.40427599488319,17.319893685605784,0.11146129810220451,12.234994367694156,3.0416675787822367,15.644483724884527,6.81031079288045,9.862806933232097,8.498199618947684,0.8629578692124351,9.680197755118552,3.3936369162371616,8.816877554247906,14.631589313552649,18.765854272581237,11.085449027950776,3.3153974267754416,7.6932666808742,12.344314828997405,14.042940002717202,6.411600030947944,17.94847598083177,12.198665308858047,1.5924200032404068,5.941866165499512,18.32027146765171,9.359741144027875,14.817756893757181,10.71994007425847,4.8995675573232855,1.2544767211767605,6.183571888464252,4.962744635057326,6.948910464136455,13.720054085507671,3.8295960619779112,1.5043017661152858,8.578463907423405,19.813340716786524,7.578825865765433,7.7679750386221125,14.308830268585805,8.83408559853686,14.475692295262515,16.801992416089426,14.899587831234665,14.603734978063638,14.475958001616913,8.0894520722978,4.591873353680738,19.645041520365712,12.749635555449021,6.337302417489692,6.627778533169959,17.946245839057685,9.866929098142982,12.952705323686713,7.267441586915058,16.34483235785111,15.920849448994563,15.594996845456293,15.865696867194945,13.57645289640605,12.862356811848311,7.391032854690316,11.145901911625057,2.3826738438123396,4.462545805525728,18.391575225349932,12.08331348404538,16.71398459252721,15.574530763088696,8.913897024867765,8.438924017118516,14.286927571011239,17.66253941305573,10.001586297821458,12.350466992112313,12.855361017804334,10.150913292705269,15.412398638854183,8.395299715130488,12.032886125628943,17.13422864076869,6.093539935499317,8.317926036901184,14.137796355378507,19.39084589036308,13.654083177484836,1.341270400586132,9.06721254068049,18.47784047144345,15.33788887065446,10.714347459539066,12.922542722424106,2.290042693452765,0.5346646140585598,17.059253550778163,18.710572930232413,1.2485993589039435,6.191455186828478,5.37129883639369,5.318255892559907,17.719334216861302,0.681444625558929,14.00574720577119,6.0388076484598585,9.46147061193332,2.368364622063037,17.432623143346927,1.2337743379339727,15.744078761068598,9.56467787449613,7.492031546339226,3.7274643611712754,14.354211057726163,5.857877446534041,16.787859082657928,12.98064020537601,10.133468478661992,12.738666106230196,17.375181074639997,2.1633870341313077,3.1106678293562906,19.49934415660938,17.168666526976942,16.110311064606226,6.32156225151661,11.951248747478495,13.836499574031663,14.95998720118687,8.666927745189884,7.692055952219152,2.0140258419261814,12.030972376823037,4.548160143005151,6.200205060679611,10.493392917380424,12.508676610558055,10.909457740125186,16.195534293907244,16.41213489302364,19.81247580326189,1.4421980870647433,15.252069938433252,4.790102155565066,6.570700920001142,12.338218874715619,3.831782519352882,18.66823447983229,7.860053012802752,6.413635769774588,1.2046138077353286,2.977425380842309,4.245115783721141,3.527874201067571,5.160740472909602,19.6925501324261,0.6711255998344923,9.701344185707747,1.459923062347137,17.28615622714485,5.326189378609394,0.3747693473289715,10.302418847559952,6.107914517807584,19.816960387139304,16.09681236099085,8.260210699736152,13.766191982950637,6.601647697269644,19.998825921001355,5.4168000320217935,12.393215421473855,7.2523869653302775,1.4543156728989093,2.0106268276153028,9.270160530310898,1.4553310060800673,19.110002675959393,8.054121669328271,0.6465072564630914,4.484853989181636,4.832698303331995,10.871034420697159,16.064661670126092,9.365437479215739,0.691843461286199,12.41223469357056,6.076616644259105,14.395404378626274,6.623138456378621,17.805408306844612,7.409971849518553,12.980396338353435,17.043069840684723,18.751020116931052,12.732838743918684,1.3167520618102824,8.434165642754978,9.009937379315813,17.077415865308172,8.717854353660798,19.29518463988647,14.742144493510487,11.898393256427173,5.097036100551815,16.17595928117806]}

},{}],69:[function(require,module,exports){
module.exports={"expected":[null,null,null,-3.1777619111321984,-3.609597501564185,null,null,-3.5793598310946075,null,null,null,null,null,null,null,null,-2.624474025582184,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.134977091207927,null,null,null,null,-3.6874466864674513,null,null,-2.9970730499852816,null,null,null,null,null,null,null,null,-2.93168382705741,-1.5561891770683527,null,null,null,null,null,null,null,-2.8676957608273748,null,null,-2.5477424937672857,-2.508854362149669,null,null,null,null,null,null,null,-3.671065889323396,null,null,null,null,null,null,null,null,-2.485578810415154,null,null,null,null,null,null,null,-3.5394066760182086,null,null,null,null,null,null,null,null,null,-2.85216224205176,null,null,-3.290207003264692,-3.0888757433045715,-3.6723085085145124,null,null,null,null,-3.0050400072437298,null,-3.1268870244360714,null,-2.3174847121163107,null,null,null,null,null,null,null,null,-3.515274310439444,null,null,null,-2.7927732143502144,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.4294523100284597,null,null,null,null,null,null,null,null,null,-3.1483948199237997,null,null,null,null,null,-2.9832770346182262,null,null,-3.67024531558881,null,null,-3.1768077992025083,null,null,null,-3.2195969847718575,null,null,null,-0.9329538071097488,null,null,null,null,null,-2.8162709322518915,null,null,null,null,null,-1.6169164795045048,null,null,-2.9817920829129894,-3.6146697575684272,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.4723866509840637,null,null,null,null,-2.9853382641235666,null,null,null,-3.1676261951027156,null,null,null,null,null,null,-2.780340816003888,null,null,null,-3.012490613321203,null,null,null,null,null,null,null,null,null,null,-2.9116240701491396,null,null,null,-3.0466125094047274,null,null,null,-3.629203589698442,-2.8761030817611606,-3.5621805706681378,null,-3.5267965711074583,-3.683141033223031,null,null,null,null,null,-3.005223948578427,null,null,null,-2.9394022707515797,null,null,-3.4854823233619103,null,null,null,null,null,null,null,-3.4353946779845366,null,null,null,null,null,null,null,-3.1213872663494886,-2.4828617933889534,null,null,null,null,null,null,null,-3.4049141162107412,-3.450541571071452,null,null,-3.114601155899365,null,null,-3.0705597462113174,null,null,null,null,-3.6788093023829873,-3.552065719792299,null,-3.5784578153287465,null,null,-3.205461406711342,null,null,null,-2.530928450701737,null,null,null,null,null,null,-3.3510974676488954,null,null,null,null,null,null,null,-3.4089955812412454,-3.6867369265164207,null,null,null,null,null,null,-3.053642693757488,null,null,null,-3.0517822546525224,null,-3.63338517755888,null,null,null,null,-3.0208282690557184,null,null,null,null,-3.3420076695687446,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.6467831962460235,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.836187973764309,null,-3.4682738375123354,-3.60434964530933,null,null,null,null,null,null,null,-3.5483994059203376,null,null,null,null,-3.295151359742983,null,null,null,null,-3.2842105289331562,-3.1242842153364725,null,null,null,-3.2170383896386614,-3.203395037929626,-3.445344281378126,null,-3.555805862068221,null,null,null,-3.0254241816732526,-3.5580857824519536,null,null,null,null,-2.9461852717899806,null,-3.5522159491663094,null,null,null,null,null,null,-3.6008028178830007,null,null,null,null,null,null,null,-3.6496602437565935,null,null,null,null,null,-3.2680698531957018,null,null,-3.4026249926059693,null,null,null,null,null,null,null,-3.4181360944210346,null,null,null,-3.5377282611414826,null,null,-3.5606552015207322,null,null,null,-3.5543429554614137,null,-3.103642751988049,null,null,null,null,null,-3.5066941520350206,null,null,null,null,null,null,null,null,null,null,-3.275200296603831,null,null,null,null,null,null,null,-3.248080277615812,null,null,null,null,null,null,null,null,null,null,null,null,-3.4282265896020023,null,null,null,-2.8567134050855434,null,-3.5471542414730206,-2.848810381770919,null,null,null,-3.2776996452834206,null,null,null,-2.4350089358531983,null,-3.537135976350529,null,null,null,null,null,null,null,-2.6847662139424404,null,null,null,null,null,null,null,null,-3.238209585896528,null,null,null,null,null,-3.6846573867465526,-3.27540416821265,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.3964686901265253,null,null,null,-3.55080604704449,-2.0460899691421757,-2.733767750521793,null,null,-2.892189117633733,null,-3.3506629754864172,null,null,null,null,null,null,null,-3.1734501137115907,null,null,-3.454932193924427,null,null,null,-3.217727797519085,null,-2.7182697483032934,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.9228589259031725,null,null,null,null,null,null,null,null,null,-2.8808886691497264,null,null,null,null,-2.3327046739026907,-3.5726562949875245,null,-2.805700228631389,null,-3.3872870387927203,null,null,-3.4274678354979136,null,null,null,null,null,-3.6222542746513047,null,null,null,null,null,-3.3568698694155734,null,null,null,null,null,null,-3.3625716062600857,null,null,-3.033604878643532,null,null,-3.182951066278303,null,null,-3.2811896238285074,null,null,null,null,null,null,null,null,null,null,null,-3.373023501401317,null,null,null,null,null,null,null,null,null,-2.7919510844013335,-3.3521224814190687,-3.423991728261365,null,null,null,-2.7808581588059402,null,null,null,null,null,null,null,null,null,null,null,null,-2.273539035045087,-2.7654953084028002,-3.4450979283917373,-3.3716169504126574,null,-1.4347492513953564,null,null,-3.356888529059046,-2.7599521751060223,null,-3.513586020112046,-3.1855252981190434,null,null,null,null,null,null,null,null,null,null,null,-1.944295256313766,null,null,null,-3.5911961682164515,null,null,null,-2.764146122566504,null,null,null,null,null,null,null,-3.4035330725397435,null,null,null,null,-3.5099210757330495,null,null,null,null,-3.230720002860788,null,-3.6114800579404522,null,null,null,null,null,null,-2.7490665994539727,null,null,-3.6803238817044273,null,null,null,null,null,null,null,null,null,null,-3.2488037006924344,-2.913518450153448,-3.193174061441171,null,-2.81250030254259,null,null,null,null,-2.645216270156077,null,null,-3.6638777942033762,null,-3.5948079341482244,null,null,-2.1603920514653296,-3.502438191361212,null,null,null,null,null,null,null,null,-3.473402808183252,null,null,-3.6105855273326193,null,null,null,null,null,null,null,null,null,null,-3.63687726545635,null,null,null,null,null,null,-3.549935731117948,null,null,null,null,null,null,null,null,-3.3730683256970546,null,null,null,null,null,null,-3.356392093148964,null,null,-3.1747556161110575,null,null,null,null,-3.4360395188854778,null,null,null,null,null,null,null,null,-3.1353704715121586,null,-3.6042589587316765,null,null,-2.8793576876192857,null,null,null,null,null,-3.4528087374464387,null,null,-2.4939510734013783,null,null,-3.034373409414637,null,null,null,null,null,null,null,null,-3.636320432276766,null,null,null,-3.309485437267831,-2.9860019517629928,null,null,null,-3.1901830294413256,-2.828772763105542,null,null,null,null,null,-3.4490182457131,null,null,null,null,-3.1238983021190876,-3.3997730133077337,null,null,-2.7354966927050044,null,null,null,null,null,-3.161827688870672,null,null,null,null,null,null,null,null,null,-2.0891026173839897,null,null,null,null,null,null,-3.658350696230526,null,-3.581762583419585,null,null,null,null,null,null,null,-3.6412958886634996,-2.339727471898679,-2.649137619134836,null,-3.290014839900659,null,null,-3.590622060867883,-2.888817749575741,null,null,null,null,-3.2901873419267553,null,null,null,null,null,-3.0966595257680436,null,null,-3.0410463035980912,null,null,null,null,null,null,null,null,-3.44675554732165,null,null,null,null,null,-2.3209578102271125,null,null,null,null,null,null,null,-3.507107184585318,null,null,null,null,-2.501724430464778,null,null,null,null,null,null,null,null,null,null,null,-2.9768330582111227,null,null,null,null,null,null,null],"x":[91.0611743415932,8.600280498868562,31.170779404200765,13.431425617103354,45.19027080374831,99.60457985679653,95.74986555959943,18.211177529597023,74.65952721655351,28.5293921214153,67.34227042484136,11.658652729177987,46.16807508428342,71.26494659728199,53.86681333460983,72.62775758331455,17.315441534317454,92.82906914569449,8.959625906422808,22.658763190856888,63.442240423315475,84.08417034945165,74.78178217910781,37.456724335113776,40.91792602608149,56.282210883012574,84.46085632540223,92.36858608532683,67.03469624542015,43.39580867179767,13.670315654050835,6.831572180164858,26.924321001376228,15.992137402751316,99.71654883278494,11.414344267272035,50.772446016794646,30.545897139860976,16.287237448979795,70.08156047262268,38.052075781562465,61.15785671969387,95.63346116937102,97.98967573567843,65.63864369076737,97.58687761203058,42.95969582528918,31.819900668654412,17.429277269163478,91.12639994229552,56.205951066591766,47.44317350544489,59.338067264400316,16.054937710242445,83.37362263139008,18.504743336115958,23.51265780627365,84.23081311491067,66.85928837903374,4.502613483885098,22.935579533651506,52.714100294544174,93.91135612662882,60.2659587475203,0.5405009499468871,6.730766585092418,49.9487999525182,41.968926946852214,39.91922638958305,13.358828600759743,10.309107252319127,57.421739612669874,83.55926282623282,25.215070527273497,40.58937504331481,20.562089182223907,97.55336246456423,7.782680153576793,69.20427234640927,54.313935357624985,57.03556188843501,78.58979022349092,87.60905339067119,70.45687369073089,57.71689948839922,47.81198417948676,70.58316980308605,71.60646364350663,78.35692574557899,47.016276591534734,77.48792517719087,37.75132037960696,25.701768222791046,67.209327658207,95.33627324198244,36.17808714280943,85.98218193188833,44.925149393620444,23.4552963497068,5.039095157996187,14.19413418165838,50.54090229441102,93.23047492874217,78.35371451076527,4.495795344361553,8.275667247830953,81.44788771046225,12.94684190193911,94.05221746860788,4.458808050749319,33.391500262393635,40.778778741585995,62.596943848695744,84.32959122976844,36.843639748327405,87.29513594862517,34.6282557307634,89.47871572322579,32.428371355783135,63.0327460478967,99.05975587754286,56.7589190441083,17.974450022264186,40.24323316540062,3.7269397196392218,0.5922019662165434,75.96375134313666,97.38857290338136,0.17634881147285952,45.41522853556283,43.323161711225545,2.8216563679240636,59.08691880490571,6.964764353573516,46.22762092611019,67.76591937457222,42.59028863091907,65.05177608349675,67.59786292797494,1.1403659025042812,43.52986421801206,44.22411337620951,27.32763709751218,73.98897535809093,38.540859221597,47.49069271439059,16.498943795816356,74.43278478449761,99.02109888217656,43.524425670862435,51.955066297263365,91.49084284963816,32.71833452201092,35.43521325525158,64.60366803622581,44.87644135654496,37.95242644262438,66.0008175481864,28.979219987734407,51.95140023560334,96.49724715910979,18.465610824309685,20.991235466788403,93.72101830224844,48.92070120732623,15.373320748226194,17.862804427467815,50.10191897255829,55.587381586317754,1.4523552615476332,4.259190908520827,42.83245101081352,15.11846389501683,84.88811584988444,24.531174604924022,63.12690018385108,62.660467672009766,8.62780714079252,7.55774086557528,72.02852539837892,7.450628961934247,30.518500189383914,34.504981390069986,87.21371610256435,4.0278747549427285,94.44370494759524,71.44465526681962,55.29883489094915,99.33317805591612,78.33716573582315,86.48112825769086,82.4543169675894,19.135411542583224,36.895771882214845,26.42229096973747,34.58788775930444,9.795707276612763,14.89065037745425,47.31333323795324,94.44999022577404,86.64151879114313,52.17171061643573,16.731539743953007,52.925104435295346,70.77063371617702,70.08620742008411,39.03430233492464,61.994734252764914,84.04372468232076,73.85536209425095,89.33277210007486,75.66195063254142,26.46769189254774,20.521662920207184,78.80420070556613,48.477127937971765,77.84826445637616,10.110287001652107,95.6257323282163,80.03635914526836,95.5095850695566,97.12644293717344,48.98277785335667,59.37952303892919,3.3674863564781443,72.35039314154537,82.42384907388467,84.82458069536835,10.084454431106638,95.03844071628001,82.00944655248495,72.72985823529908,15.857267373889883,85.64953000654003,57.735340342571526,28.71104372592295,12.446868366080377,7.73488566060474,9.298473935751762,88.84947012549284,29.319723135835396,49.50459002729026,80.53686575929045,57.837641349358535,93.49493955919668,76.82145743156974,91.18384506733845,37.91176060192931,59.7377767971135,42.29372648174945,79.4944178906714,29.508256699534073,53.321599065828764,58.97748119953727,22.509140601273714,85.93263689201277,68.4160120221315,47.8575353931016,4.9943146038930575,99.17949380004818,65.03312683749394,64.31209527308704,50.20271593894676,73.99268370303878,58.680301952723354,37.426127415171486,49.30365057635107,57.2046393556765,52.01206741378874,80.40625873779452,14.19275808548468,17.58641285514613,81.30809972508253,91.02174106863397,30.536114763157364,41.62740433668861,38.55644061465695,37.56724593373728,45.2928255916849,31.38128811885914,27.910376547839988,75.36210654911852,70.60257679993904,30.358122430696643,11.185591882012735,60.45052742175982,3.8051255002692796,36.72689084947014,50.70692575379676,38.31542348773731,70.06178720383633,31.21181849955581,16.33270544339982,67.09051114010248,34.18956885226483,5.676566839653963,50.76587654969848,27.57438890357289,25.85990169462469,94.44268913830405,63.029424444511164,4.687082291089761,91.97984768186606,79.42920326647409,63.94006915796455,4.226374428887669,94.15146744456271,4.293863470052961,27.23081576596997,17.996270134992052,15.909853343377378,91.54276884281447,51.422091549873585,52.416987675639824,94.12512104434505,6.201312764720912,20.795145353538146,15.696384983210066,52.88809124822307,81.4102850876859,54.93536652841004,83.70255706644862,63.56807412294305,75.33534437128364,27.31878783355175,85.7679239361532,12.651626752551316,97.21861125408644,19.515212611369904,31.108847020369,24.86044421796938,48.70329867613463,24.18461718702538,58.02055814430991,42.57531412130269,19.18687353781301,7.4842400254599095,0.3368779362025176,79.10231360194011,54.933679143418665,26.496119161259337,75.65068014444363,85.32562743356846,64.15242725399561,87.481230364382,3.445701650994648,44.56849740807958,98.83076508133473,61.55222052906253,77.31477182910447,3.6270505982393786,63.027461397930516,32.40170865217351,55.1044598987062,8.736516127021776,92.05654705801236,28.693896530510266,95.81488804169882,42.40570336638074,92.6438401384817,78.02993943639845,38.205906319470714,4.429020801314554,98.61361532180347,78.25220216973622,46.643504259000345,64.6538892026307,42.454515765658506,76.89675511156642,11.371696925689513,57.5211598946491,3.632788996903513,53.69151294933767,18.16665365307628,34.421251859389045,52.20208289580355,88.14070150516602,84.5593766829175,62.00017999388676,35.47822942645838,63.29087349433591,47.34222437186486,19.736474633275904,62.575123707984524,45.692158089453216,84.36626053378626,79.06905158567044,8.902889414709358,47.07874463373625,2.4848065519940565,95.93308285152602,58.79620136186021,29.599712993212492,15.762165709420639,33.854177819112884,64.59466713504895,58.021648939488266,23.344647366249283,13.815762118155916,44.94279216481469,27.472700594539347,10.395750717722674,48.220112331997456,99.97240858772187,67.92198921568469,18.816023842797748,24.579190087984415,83.61563031544985,68.48996207969455,77.56741427293328,51.259855371499754,15.347432148203977,76.69889518708945,29.373974801899607,55.53868717641317,7.0570243146509615,45.00333923961715,5.344339869809844,48.867189146698855,37.0414455828421,46.00947821177457,46.95772664472382,52.56150163326665,33.943716135343834,52.55561837771181,99.71542124962384,15.850017629554225,99.8064654771316,9.799776631516522,40.69731103340133,53.83135198828055,71.49511811384066,81.7561631342312,98.57083670088005,20.282550777465435,48.400907754983116,80.33600850057682,25.4020684451151,57.866407272554746,98.57567977251938,97.68901667423245,49.86498019583194,11.298027949842094,73.39200456129815,1.3255724637717625,40.49053033865457,39.01396239381265,78.49334179777583,2.9030962608271205,32.773418925964435,82.4921618241272,24.314175116327785,42.26615863354311,69.44143382246165,60.71245177595179,79.72868729865739,18.618293175925427,68.0699866308599,17.936890936121497,62.60542523375674,86.34983570172288,39.5879822286751,74.55818671167363,53.38374587762069,20.0559065025683,56.50147409007431,5.060653946032234,61.38856065358145,76.59482599137426,33.79601139033286,71.0519953138277,37.28670043379283,88.67221808807908,48.49398427682292,3.8148105608493355,17.205225578933913,52.860842708443066,41.89249507713346,0.5391195606142984,85.90653052842671,90.03161349517424,3.0697389952895726,68.47601123355678,9.346322968893372,40.42680401273895,72.45674177068643,72.47371918297549,34.12679714119555,30.86085175904949,33.923158210037215,44.832040617896254,97.02073754078529,98.82185593188015,53.350879559535855,61.237373703508766,45.119096212010334,9.985356149018344,57.77532755017742,40.32214494673121,98.91307251293149,7.883245582911336,93.5079857656052,21.38491360883421,17.58736455349663,65.45171692855982,90.88855395840723,2.7307714562561536,11.826414302580535,27.858466657209945,46.35706268741397,54.73154813139007,9.960198592472768,77.42071641088401,35.03326712575161,7.455982047956877,99.49709200001948,61.67179198573982,79.51214874979084,78.57744326793481,65.67091577038184,20.658142809570833,21.509555222184563,85.30761496650787,76.78042129809579,41.926991736308224,34.6322462908424,58.66961909659509,54.314726341816936,32.41456295065046,36.84665962105396,28.82194661676687,97.52013648052295,48.81821231301087,97.11582387089581,18.33623429474962,97.81903322976821,48.26354199417868,19.893623375179082,18.933121728301884,50.66540689877779,69.82620905582975,94.2286485193917,83.89255489514281,4.547139770019326,40.635216247197484,56.40993019283296,28.10837872755174,58.26409750585766,43.25301630800873,75.72970484903354,56.8041441308287,15.068682498137797,61.315637748851735,19.936495881546932,74.57780665424023,56.72066125163104,42.61631114264644,48.244848355841974,20.583701931001297,27.640014712821316,72.27640977658676,13.287841959916658,15.74391333112204,47.22710916614863,25.52528656409805,68.41379891268589,55.462440572178664,38.42394776735099,99.47558104587304,45.37706672864048,49.753645512652156,64.84476972962594,31.781307795006807,30.31908124015534,75.26019273706117,33.86592698440898,64.42945656565335,17.301473075959816,70.35713605312186,21.977475212499886,3.956059410586499,19.891116721504233,79.64619580626024,81.30295050557412,86.86030861135714,4.004899228659786,49.01407800340532,27.83629616802845,43.59937837139503,56.951382588144696,86.2085378504562,69.79987943058545,60.67815267780088,73.94390925001204,57.47896974672013,0.09226815547780376,40.124395864674156,64.88064891811618,73.41612646035148,85.26492084971169,9.591741936351905,65.55449276813657,97.82554477575094,34.15670941750098,72.03985229027205,71.34788329226964,33.67469635073761,36.71225570732821,42.41936141426439,96.84759186549046,8.815777616246233,97.06261440761665,98.89058037548122,67.35862574671378,37.93307261509009,6.938566969081705,37.39939699301795,99.5452042119791,24.47107451288486,70.53521592551566,42.909095297762256,98.18748185593753,95.7685723492334,19.56830630994839,48.3082950854999,81.34347332095797,59.776503877446615,38.31239207124144,85.89550102751711,31.83990692328258,49.36300594069425,71.46686532241074,71.09558523777466,51.97643966910239,45.54488370696674,3.355303465510784,93.57312082777516,43.555354951322364,60.50882596638696,64.56105285330493,88.3965967958791,46.19296483255826,16.617259858454993,92.66872758080227,66.95402221458599,20.206654116214786,97.19970347144313,97.72263164755873,15.81243003448185,55.27310922213993,1.6304549885641118,23.1723156301888,34.63672660058445,90.14161777698733,64.85955368943851,56.36938760510579,44.61425782945847,42.871332235716466,42.4527972950008,45.3982645961605,67.74494996899598,65.18857225587882,91.06126688354239,28.341222321852744,0.572900401897658,55.950763401893134,71.31238592597482,90.54330610255033,3.5150012866008717,29.895751250801972,49.61405193321684,75.22511281013735,55.00622952103606,14.192747093104385,41.66629113176994,33.459580991480806,55.78680439454471,42.20385203636114,78.98995168156972,11.961487159385985,51.06226122946678,95.34020833974914,85.49653505900854,8.756384681196327,49.22694083710893,91.4867661211687,94.24393750757251,61.48321963587935,69.92070341059767,72.07525956941826,89.64179512401438,71.62053077969728,22.065024088584707,13.954651451546418,23.212838044016237,28.088391507310707,79.68960827596882,21.196521342958775,73.92358138548165,54.2629530434632,11.406977960814956,17.857531576280007,86.72237288134588,35.519304248866845,18.417806771271295,2.3449637281105717,39.001664985911844,70.41527817000528,92.4218344903361,0.7152142820135321,3.5284773397047386,98.71963907112612,64.74183552064416,59.98667032498859,42.46888579688761,88.8707026632544,17.284643331999394,65.60338941508599,49.856280773318694,22.55257695154398,7.379970189698071,35.87043380580121,91.01301693375403,51.074866795451214,25.270362838164996,9.356594427644072,26.43974796841986,10.214423857247269,31.479905864719314,55.10154727916419,48.701825900180104,51.50399547070377,23.491366194127437,4.054328907885307,60.95278266100963,1.7421439589712095,53.71363339357191,26.245595908989895,80.52049133060697,87.90138262019617,43.69580279357492,65.60719703139,27.540104098848573,80.72819893154598,34.34125036063038,68.90038744072002,86.94414370190844,59.731090207538614,94.81045939910446,7.201044862800621,89.82255923680893,19.544880997325386,53.25590181519133,48.4427026727043,12.227080133059598,49.277586884153514,41.34402014874172,76.33391572727926,80.06804251729551,53.514034656496975,81.03074437524171,5.9595896148122,89.74619340307069,97.78060431025153,54.24186390136671,35.47698040905469,20.384835697135806,13.95874334290188,54.5190387767766,24.59936607964417,76.44598665108977,99.1554449638622,12.006052249084131,93.96976214913069,15.257350071856601,35.42937402947865,6.86176571911401,39.723420120956845,55.528360828224386,26.971704577254553,29.97976872802719,98.18352294713723,8.311408929835062,17.364032462310842,66.77040079690819,55.00438914604238,54.94242361807715,97.89045592516426,60.75449414167604,69.72359836273789,58.23749357432631,13.653497274253134,36.73705791837543,41.56126725398759,51.259012221348414,10.840704624711005,54.768395740704314,4.798418594984888,85.4538076297216,14.250137745828884,69.07986369673881,64.8257548824785,61.53605729391802,76.27326053312622,63.507252469808286,90.14273755640336,40.40681629382672,68.41146112668521,78.24737778603932,31.26234901515199,16.236597577023026,42.40994366371802,58.628264461819235,35.21898918628097,36.161702996136434,13.414882299290575,52.79429331022716,57.21141840489954,49.589752251237115,72.26911243932659,12.103793294592657,89.94511007943899,39.85214474060215,94.12163492239745,61.80120094835826,79.72716412915297,79.91920208272165,64.55460286572622,67.16267805536111,19.06455962794933,89.67902632305052,73.238890275149,9.086465797077503,69.76153499628866,50.167165376039826,68.65162015097668,99.0297358927952,10.936389415538406,59.666325063880144,29.389721872685914,65.03410292055433,91.00119319375067,40.19040246469521,70.34290020426172,3.374684629475122,20.239147619580965,30.831959159720633,91.02496936417643,36.426356869861976,32.87068292143391,28.39951329206656,25.787324904798847,68.42599801025011,69.18421322149852,73.20405876539189,64.42730958134355,0.4647287109254883,17.614982485974863,37.51333217086994,73.51072172020712,26.84055638739109,99.2735196434178,86.5305733419754,26.65186434930591,81.26314930924725,40.106492155394456,90.80463144213691,62.16087520401301,8.01604136315377,70.8933143432512,44.93248105930698,42.85801662912119,27.435169953662086,48.45437733543652,70.19594967485394,7.2725955269942855,13.954312429253868,21.035634769707112,78.1130029298078,55.76597384933555,57.36006081927496,19.85962318453329,11.693046509446269,89.43484819802265,64.14661014649323,47.306079427071325,4.210193953342634,15.012486127144541,23.21935836101474,47.5942977343383,28.67972169261721,36.730983338908274,13.324638581064786,34.883983697276875,33.69116857304928,58.42650061291393,51.65297493926071,18.54169632933973,30.60274723929737,14.150759764041187,84.25193644832854,37.652285386967854,68.73872479894949,17.680122105724916,75.37356924734556,60.52704337299575,86.57657358019736,76.10444937974898,86.35049786957147,65.99890361830623,66.28301089951181,63.98851413651243,56.986961409635995,24.676990624868612,43.48007298706074,95.14908923072298,90.53703661325352,97.68731297806899,62.662944577153,43.2880215141453,13.52052939852133,95.5878229304177,26.624476762805994,78.85632343045286,70.68936535506849,83.40150381635158,76.85815625095289,89.8507553804061,13.98158064118482,34.9496360715817,25.547431145098855,20.331491325233554,26.93765196158784,77.77002505454757,34.091625421106045,91.87154864758278,65.69280444880899,24.754168976204728,8.60756188218903,42.19575263548012,69.16882395202705,69.48162376094062,90.79795138684365,44.4515191509123,37.9661432105552,3.498744750222116,53.646968738469724,68.49559658264477,15.812028016435908,29.92185253357802,35.959318620407664,12.101870789273828,38.47935434466532,83.91598305317112,68.44807938397048,84.67684908168225,29.665143600780276,86.27356009159088,82.22774295315504,84.30318850887228,62.57816782534784,31.318749434852087,99.7651384955135,54.88601587548909,38.15209748661037,14.219900766527438,16.442771183523377,19.87799926948903,74.8995082026701,55.95124343722044,52.841009516266624,48.869849155606396,69.05109560086984,66.98456459760219,57.80426370895788,9.18490376258978,60.59769205133991,48.09370846722909,81.35133018580211,33.27512613724677,12.610152503858952,52.62873847763212,71.75629375986108,98.24430845829394,86.23750866848712,79.20322974411818,34.54206095820906,50.05764842753566,56.271359671034205,95.31762419868998,97.54625160132564,43.09253559170838,13.05487615389489,25.200596490869763,46.625499384209746,64.77297467608373,69.77953717148257,36.3238513068993,73.97558299188644,73.49150706540546],"b":[35.2155288573084,34.829954044953375,19.176715150173948,31.29108391209376,53.817774664629724,18.441828223504835,44.60674601349365,53.061991485360466,36.29256961354881,14.790173333957274,23.30776070928565,49.98809378843859,38.93924880580623,15.538421630358986,49.60464738764062,20.97412376946851,28.689123385074463,52.40375554740748,44.30404773695864,20.3026758859896,10.011815985330635,23.492053842937402,10.076649699275704,35.454118238784304,21.472393432035922,37.313703690147854,45.09007269902251,40.80267830538847,54.020848485290415,22.55407311465717,34.01778252880234,39.544636339576485,15.675606087989534,7.668308479920847,6.674738437933563,43.86237122435206,45.80972863160638,22.82866060925229,33.31971594319785,46.583958923976276,37.522323276817005,17.313002944573267,39.748675088384104,24.64327510421478,31.51353131753987,40.22795421121888,39.271998975078496,36.56414296263645,21.324412959723404,30.45130932487452,28.926452978749968,38.02878335284793,45.54691539012969,50.47523077629723,35.450033844321275,15.336723607888626,37.04396490465807,23.181435340408314,20.444974506497378,14.002581656246932,23.324529140090497,20.142535790760057,36.65214021186693,18.881148946463156,33.30412246840376,53.64880481338628,31.4173194716238,23.166390983106517,56.44930075440782,18.955149528493315,49.29347901972767,39.795486444491004,25.81560955107996,16.513614299109214,33.50703196777317,7.725190891178322,20.288348233464887,18.820410498779836,43.74841143180776,27.90003573839687,28.43473661635973,51.38894168466241,44.78674259950897,5.7588767523884865,35.41994351341873,53.477944643538706,38.486329683509474,47.349611248856824,7.270915316003945,12.587537880674526,47.74844645411214,27.4928666833588,14.51339854462406,33.917682507752865,18.16762004409352,37.02484807781357,18.150316713854483,38.74545262844408,35.38085764587491,23.301055813495097,46.2715180543078,40.1397001081547,11.127462261264318,28.993636846051775,35.9547340271055,22.88198533384177,24.925383990372907,33.01001720498106,37.17465248833524,14.322577493100654,19.20297534890998,26.638917955930165,51.52093149833516,21.495064003041136,27.028507598529508,14.614124019301983,33.96125780686818,38.23712458864894,46.639889483047796,15.0584093290529,52.539413584203416,41.18741985106226,31.35554895557344,35.89150175114302,25.73626542695122,23.05438831808326,36.99516975748284,27.905320134402515,9.66297232665369,20.072147362159548,22.470863963226346,53.232457163571496,42.59377360565334,44.76975478304264,23.797567161057472,14.019746233051848,49.65416098827304,34.270439246239185,28.720676317487975,36.54093412164676,19.891276589741558,14.924124478802018,14.251114893997663,53.87120286781281,36.58850431991082,26.449404679792217,31.770553255882263,44.54625045615836,26.07180729786556,6.8576911925372785,50.88458245947819,33.397946826255335,38.44696137497179,7.8308572448008285,9.5805898373154,47.0070525231955,12.914333729965577,47.99388757722469,38.22422783777668,46.97536652594141,50.648122456498854,15.702198083826083,34.78310048333384,21.844619006653126,36.30871402711188,12.444474038630098,18.794680513325446,49.62406331407695,12.287131686346049,26.52412899249253,15.936814477876972,17.979124648760376,25.156490762550725,44.81502716240831,4.057166087060566,16.857821874025568,36.54432117029206,51.75284762537349,9.290688839048222,10.701453140355618,32.648658177097374,31.258947658037602,55.39915635704986,24.66371967362454,31.791527815693016,17.787221737477388,7.981799597151791,20.04819799626061,34.53356866345631,41.52871739008984,26.141582693090676,35.78910912103599,47.59265303695449,22.942657450618274,12.974966064937398,33.42827222634378,47.206359021916704,40.6463065262518,32.18371332286257,42.535841153578446,17.487458084166995,23.982161070540904,31.78326765890952,27.26360944663551,45.07811844264466,43.43654190353698,39.3568782508243,32.58758398868042,39.858433790771656,26.115866861788415,32.63098151728831,17.148362980410923,15.569969988075826,34.6769131430426,47.67697305263976,19.123895943640242,31.026018293914234,25.65766049864008,38.087909057626526,38.544955247031,40.95131555392463,26.978938911106233,37.65932563698195,10.376774716427084,57.758685789345776,33.78232532693529,23.786950982025537,27.191618659379806,18.798956505488448,7.651399481445242,18.848384018223943,23.75690223936209,32.50516701085545,11.32713211857864,14.07993472654899,27.142679651780725,45.53238961604839,18.962687228061622,37.09469757336189,13.03399746623963,41.33376640745967,53.411091659283876,14.546373140110433,34.13500520645262,3.150403752148474,4.176366343083067,27.208746961207623,38.323508673325705,17.198298987840634,3.7964922184567573,50.270262191429445,33.556670195283175,25.55170787754013,34.46650731965312,35.49117268698599,34.90016377369149,40.65693151407259,38.88936532138264,13.09637296108186,36.23031692191077,23.7225677088343,34.13075935991468,50.999153531416695,35.80565578797352,9.941112406814568,27.704504146142657,9.53219261401788,19.6611430707799,38.40634569945873,31.75480716394156,23.538453916498273,26.48227903055714,39.884337515147415,37.96304087631458,3.8795057220648443,41.46321427103477,32.173586718624,23.671339524499608,36.99728966874862,43.43432908606558,51.49859438146641,37.385126444360594,48.92842742114382,32.36312597235378,28.381893546768225,16.557582601957584,24.602145769398053,13.373894915713302,22.174810710742985,13.472550978665021,38.931018220524564,48.848582312510615,37.923469249459195,37.443929498142765,43.54114474495513,52.36985377700343,50.470774787483776,29.756274561906263,25.46333218238047,26.412196552779132,19.46808650169733,15.487948118439823,28.34901586702895,29.58692868221061,23.256511182582372,42.70223711790729,30.509432553851376,29.069290978875124,29.130693525182746,7.364395966366626,11.189534597330052,39.99893455634748,36.49279981562789,43.77005844129983,36.16126340212915,16.43071675751683,37.53688454715754,41.37831368500565,25.704536569606812,30.745732080347643,42.395483116111,37.40900757069853,46.96149959953614,34.93476783997891,34.52041786583234,24.081938534841925,32.97815056415219,19.535291731849476,27.04758894447081,24.972708408421614,38.506089197723746,8.440840232042014,7.621239273709461,40.444558867644304,33.402734825798305,22.178215100503,9.644676728497968,39.01629797025337,26.538508819474842,21.07526810579332,41.98446785050679,12.939136336727305,53.81309534151543,5.286554521734419,41.83400677077892,18.80666347497136,17.727033455842825,37.4257090097661,53.58910947961173,19.26346664731183,15.003068355457945,22.40001607798733,30.015332978474053,25.612328420973093,19.654826337490245,15.079240789609045,40.12986459941309,39.89101565453234,23.53331680855939,46.790992619357496,36.37389709776512,10.928521829092137,22.852974403432697,11.30092158800518,36.762589204712086,34.56900773299018,38.29113369815541,36.4265173283393,19.833521025331578,51.668633145286485,17.939764357575186,19.651200118145812,6.0978943829452215,36.047246293399816,52.97983985839342,44.12207576983822,30.098730157198666,45.913537099370494,39.20874755914655,19.7902248395184,10.423591820650376,35.04360471904219,36.08695962229436,37.85496706165074,25.28139996765004,7.592100768530088,29.395633033282117,30.178561526063177,20.53731024544996,31.72309953578961,23.32018498993038,17.342795792288705,42.035967873786106,27.9968936128218,29.04811148573311,38.31933242187075,28.44166931264777,39.95190935912,34.5624659188621,47.087269901420974,25.638287143316187,38.84062884846075,12.080981147247405,23.159398148813672,39.28518553453994,24.104699225903264,48.46445945209568,22.500405731909012,15.497866064313852,22.054550431669313,24.823400342748187,23.290193099449894,19.180391116532366,36.45374894820662,13.133047926064041,29.73055283304977,0.25430584199830797,33.453771291939546,41.494722230378,24.326021530640162,48.61129218901734,44.48135751771915,27.702839717161403,21.217817280955018,41.16932088306379,36.89594773793391,59.33136217073452,2.8554982835367815,41.1651450840461,27.669785202150024,18.90526900190974,13.23546149425848,42.91592102739651,47.801152380833756,39.91207888761821,29.41215737854781,38.46878021214095,38.49330717200965,20.202933999699887,21.68563498194633,43.08636524167795,19.101563931254095,40.74512888258734,40.55397578445122,55.46626038337678,44.38859130886547,21.45207776879308,47.24426057582776,23.891864023757613,39.47736896028903,18.992634403259302,6.887728868269787,44.540213014689215,23.429918877279203,48.439009840033684,40.60908890261112,38.617347231740965,20.636350137168556,37.99865252050907,50.54773701082968,28.425102816311423,36.03122781012492,35.72534080194538,19.163188077766378,33.44066326192455,34.89962770620436,18.565731233265158,38.67033986995694,38.69071764893763,12.057249900352028,3.7489464189452804,18.795680275212394,36.80079054998116,41.82058079827166,51.521943480908405,30.17829485372301,31.07540165610066,39.50265637809562,21.993935969237562,42.603695961390194,25.453000251147014,37.19209964411948,37.42476454926258,28.707382521598706,17.88170888743884,46.18026616154596,29.980847432237994,30.25619600104808,14.839029455292678,33.01109638635293,43.6978153085709,18.157537391291605,25.3875582250572,21.574711264732898,43.14170785156347,30.937395096757932,31.801680760857106,33.02029922667256,22.74407535526653,15.695502339012034,24.56759208439102,48.19227044086775,49.33978731006746,20.47477267231915,18.091746466573632,33.28215850517421,21.316020499778695,33.71397037210982,20.940851156204822,28.604696606576073,16.13640868000887,13.620906138321732,26.97975481374674,51.348298168095916,43.73198914985582,16.51972384769694,46.8291356227334,41.78392493492069,4.717524425059745,31.830773985465367,16.1904909061537,31.112293939186138,41.82790797083328,16.28048349790874,41.67211533770224,26.071227875413026,23.289477595842385,8.201925778570857,12.647309755430998,19.753553729557837,35.9077032428845,48.84447878476638,43.804283085744295,13.230705349214528,14.104797198443597,43.16161032547052,57.12413382038733,41.784439003282955,18.892030491919154,26.136819930664124,37.7672138620252,29.633620019833636,13.759628139785072,39.15729769009904,25.29097091010008,43.600007424160864,5.300094598760388,34.48247081870854,36.35031845070008,52.085999132214845,39.51091832756895,13.4386097072136,47.92169380761685,28.623904293155096,25.841855076320613,40.22791190735753,24.973775484845312,50.95039241012093,25.09714619367084,30.450015637630912,47.0790453253733,40.15282450720137,27.501747718077173,14.546540369908115,36.89146575934004,25.09888973823095,40.33952442935038,6.188080465157362,32.730860875760214,41.537391671612255,28.81766584143355,23.334004211856495,40.067741199363915,4.477400494778823,48.33829434835671,48.51165817370139,24.157410956508322,7.658227528832007,32.055249657530815,38.715975163494925,16.578925368069996,34.44173531860882,15.056236828353677,41.48815765270112,13.407109691666314,46.25026515648365,35.3422253861463,20.268997859250277,36.200144094999175,31.710983826385032,22.778094695086654,32.73557862235197,19.038516599722588,32.198381774291796,30.964281368512957,17.274003754269188,18.6107534439804,29.062039574397346,36.321460276315236,12.473375469733421,23.11780064317927,20.063193401504016,26.794625129886995,31.921952485241704,33.086915347882154,37.589980576125,10.834463107891409,20.409057970217184,33.13751309869551,33.70781812685853,23.96239012163218,50.10047645938719,9.820523779341176,19.988671641155026,21.562606851043007,11.519088769908468,52.334065266625565,48.88898691170741,25.72690511477138,25.272446852863048,47.734191888362865,13.200541259059095,27.133017067464408,32.83494987131494,16.44588002082502,33.11125228510048,39.85464512807331,32.92293498697727,27.91144517142697,55.51859273199602,21.326008972833257,44.89111791971233,40.95851267122876,41.20930025160099,44.14236386662714,28.863637713790006,27.119749613455532,33.9368406642456,17.25789250898202,39.59554247532131,40.434902556601884,12.680088624184833,37.64657626620915,12.243792416471813,16.749454803096576,40.62410794645153,40.53998143971606,30.65664848260209,35.78041724386584,23.209711441175877,13.989940975258065,38.382948470329666,12.215837309359202,31.40801447307359,31.202140773484448,42.910508987585956,38.85326836571199,22.886120549392515,37.55733709223455,27.32350518131224,31.817804622941694,34.9017500116657,30.465813272223055,29.742885085146156,44.373910122025414,5.38801791275616,4.4147586395025895,7.358329084635606,30.401243428682605,17.03122039189697,32.344753582403186,34.55430675436521,52.45930400709272,23.831772931510667,44.7583654689827,39.69418496610177,34.134155467075814,38.8418051170879,10.478569849640982,22.168321047266122,24.692386251908246,58.26401955815079,56.760773442112,13.95535260909595,20.048878863687023,17.4089899665142,23.237806814184182,53.615859379249756,41.523202283095586,29.13702802851023,50.915941924238986,41.06652611257877,24.88992487495077,29.688067873914804,48.52595452397617,36.84045003365591,18.016235221397896,22.631250831308467,32.42671794915739,22.604203181756333,35.98004426045263,27.69008051191024,21.939959148494495,36.41935440258598,27.491728422332663,34.83032886527117,30.819683458209546,3.686126616100567,40.69639876610209,49.97510832465426,37.14821395210677,49.870649401402574,40.88516607491485,38.03492082816624,23.957173925985984,20.83629007660219,22.108699492536164,23.440916565598506,33.418852872255236,14.037239048308013,36.438292795464356,30.505949416395005,38.34766335166539,14.878268150980126,31.79412539648206,4.123187065566194,12.050657742046962,41.54363376109468,23.735624716876615,27.452613631522333,29.679006969670617,32.16845039189639,32.67853120510313,42.4662241843847,40.8101876298908,53.48206724484495,34.51709922242122,50.45222131608554,43.94038209716615,38.05250968136384,7.921554645933089,42.98478720872467,38.58254006309967,13.909293192392287,43.07891597950022,56.06839967636287,28.144755310782465,55.056629310961696,24.573335132255835,34.2232933378055,41.79485348215829,30.261922962816357,20.495560001323696,32.36982805244307,46.50388879308857,16.02311769824858,5.6917555087864535,24.10489630949418,35.35472879242604,13.802150787809419,16.808803069800167,11.264809923820813,33.9816549392914,45.457983025612165,44.16819290256527,43.08623036664299,32.82790617659647,36.78709071256098,41.57825360099943,34.70123954094839,39.73408715926968,48.303849198677824,48.39898554706015,30.44016022443428,28.086411509296898,27.26289782766195,50.13679659874177,57.586734573531565,34.278459294838925,41.204598869706224,6.469004613444449,32.3824354676153,14.71621039358447,46.11969905868233,48.10393781784713,21.632903152176873,16.42562243583923,36.54898982929285,39.04480180771918,14.87372841640331,5.2462770263579594,10.541631847469603,47.36582877628929,31.57744713999395,18.454845846729743,46.175605857161514,25.101016877698996,49.58161214373747,39.07996224806696,13.502870842333511,54.21280433724716,37.35821648638882,43.407047295732724,43.980703137247666,27.11551793463095,27.574690015214163,45.6746760883175,45.79233832733388,16.481324351354665,15.469013031040939,9.146960356108647,30.560298264036234,21.946874849321915,46.60245385496975,34.42751211229494,30.003094963549547,39.960935537883394,32.546733999142084,43.556209439499874,34.38592470534936,15.471500805174156,29.58061322261561,42.340639767158834,47.29134374861931,13.773171592707794,23.359596821851568,23.827993650482973,13.933527154498089,21.229169936033607,46.49872104790434,46.37501713067571,25.574134923335713,32.63783566060722,25.923606848259688,23.87006077188173,20.076505220680268,40.340464518229815,41.690565631861666,36.94914110644364,19.992102770141955,33.790468590995054,24.299961931150367,34.18907394157099,19.47931000400854,16.455319791104884,12.780830211351137,42.01180014430101,47.11523076356091,52.28752016922999,19.293783626191395,22.99693991246555,35.63765468727111,47.461531359634925,34.01651272419049,19.583851636338267,29.082902632839236,56.74672125589959,40.26833663738579,35.415477192712714,27.196794152652636,28.271121133573832,41.55032460222671,19.78713096985419,40.415133764100375,21.671659983192857,9.190783022126755,13.836423823665918,38.370225247202185,32.321736723878374,39.43257507348221,43.348173452284755,11.354349693833532,49.57726572040755,28.87009278784116,10.697138432843868,49.67127692934281,28.36981946271813,28.54194972119512,35.3658028265944,41.196905979787914,50.99743281996808,34.34215888002065,24.635479552899113,48.15857864915155,36.554448985768076,45.70107369555707,38.34107468235605,15.002971270520069,37.972783874550885,33.10570118239689,23.579643145419116,20.058646498089697,32.74347482729256,36.497158123963516,39.22001972537443,16.849597296471508,35.20360651561086,30.32328560488134,29.783242079115066,24.636598649855166,54.923266297458,19.638607418821366,31.094767839003666,26.91250121397493,43.2834126985034,23.33129524823782,28.149280789483463,16.782224823549633,23.418528261319118,45.49403270215803,21.505717167662418,19.710569392722782,17.421767639362443,26.964697401103383,42.57472595788868,45.477001770629215,8.997107804702651,39.565344453196985,19.340957767909288,29.968619885309295,40.554434077973674,11.79639766361047,54.554976957308895,14.766783816265825,27.501807855584495,41.47331606249093,56.6596555044671,34.01791595583254,13.134935882281532,32.78363924300744,49.63597878517849,22.874763838576367,31.970219200963466,40.49924827068622,45.35770945584821,29.344163299828168,48.0815251694055,43.7023942271638,23.50796254483805,21.156582350169764,42.51433688808098,26.62186494876194,39.24288567949525,45.16865288225094,28.74545506790196,52.498764976092986,23.29451258750908,46.6917612005417,19.940577881959314,32.81031621347417,34.19357355766553,5.582262062540946,40.02406921124415,15.397940266912386,49.59684103542422,42.637271573253834,27.653195838640954,10.662317077871428,9.489336771370947,45.982180599539774,43.2113342420874,46.23911612300107,41.422192761362915,13.32777381528322,25.746606285769914,8.446968130781798,4.108521449561433,29.48697540240022,14.200250452548374,54.62961414197522,32.36246839518884,38.357037581759904,50.81190627489103,37.44886785040403,40.652835074788456,36.633905963425605,47.442962132288315,37.95982297577087,41.930580283884716,16.668076744771653,22.229128773269462,39.975439718299526,42.24693629560858,19.346854766440625,19.719325073908742,15.60328043625503,26.755705142575962,34.89781871401078,7.849389484999136,45.946508588326544,21.252994822699804,27.739784423348915,20.52987844566252,16.31973600565052,11.497029531589199,11.243772444164005,38.24798461269008,28.105105657081502,26.082452972538945,12.142474444891494],"a":[12.355869925879439,12.013179597010675,6.3502824995670215,7.298088950769257,16.866597634302618,7.758809212830915,6.6730133000626335,17.21140841446307,10.342113191060132,1.8871999887232294,10.670787214970407,12.029134011069601,5.5004582246015765,11.717707764605084,12.993666064229728,2.1103540793776965,14.89180814270139,18.39725785130895,11.96109724462399,18.669788760123947,2.6901564156700752,15.803777324056894,0.1844529307757714,13.432666453108233,11.388938592787042,8.058903056851513,6.973180563186996,16.035814161735868,15.773262237860205,5.072426019386258,11.029673322613757,14.400770479044954,8.354410146751597,0.7424014069025509,6.607861869355833,3.919640893349987,7.732717549271477,19.819103819274243,13.292882429720665,16.455018449381512,13.03602117539032,12.83079468601954,8.905050532017974,7.542319533429853,18.0881112651264,11.899044189837538,10.829699617717786,17.804951811126703,16.58369222888146,19.763016691184426,8.29383085762004,9.138275116717779,18.11934229449214,16.458480833810924,6.129910294911953,6.998763712519307,19.44753982695321,17.351222679619074,3.0819119628645453,1.2243573800983354,11.033688001261153,12.911457083731449,2.414780870569553,4.128586204145859,10.797574994660991,17.771413686046845,19.81058887534351,15.453679627239518,17.15553440136096,15.65407237436447,12.745836880033373,18.809711554381717,3.0584617877446973,9.36226626680611,15.166771747141862,1.1198414433502446,11.688235084939569,6.812341859847075,14.97123774664419,6.549127598650704,12.86616005462462,12.818179922727072,16.38069676580177,2.4521902795846273,16.353247502934597,19.031469436862917,12.067970093456374,16.411476864621086,2.2215284699290194,12.429729090100272,7.968605669801758,18.751156428635806,4.019270333995517,4.133110985734296,9.57833178073534,19.699645426522757,15.674002358501443,11.139824297079812,8.532436854413131,1.3486718309972456,6.928894163729247,0.15592175471415004,5.290709990707798,12.820139990288858,9.884033487123087,2.694961626831982,19.682478829552874,10.207133085335535,14.353946903396174,4.172465775206415,17.63093618369707,1.0926498510355875,16.16832593504981,5.120438388270343,0.8096903752520745,11.957226059109068,0.35266013143492536,10.627357400183728,13.014739094312532,13.875916370701535,16.191634678149853,12.256495655053644,15.029315731756142,14.83192555665445,10.066168473637727,11.546728300131361,3.143886196131662,13.419182143982189,2.4427910211064985,9.218564365225404,16.83774767851677,19.299526458338683,13.721182318261116,19.97038070194983,4.311145627606239,3.4806655878499493,18.794424436084817,16.49260518595096,1.7037185115671916,19.398260743425052,15.890801268791694,2.543468613349815,5.038638287073107,15.72350450619172,0.2066127591808664,0.13858518417172228,8.471917213053434,19.488704618349715,12.144627389958833,3.8251608961790273,15.16082330188933,16.214205039173063,18.69452124463992,0.9372144088247936,0.4165826643094661,7.7455163773116675,11.894704314017268,10.221353039860324,14.254113961879703,15.344711570617813,14.555098380439082,3.0360593032103855,9.76506498328433,13.519291705127912,3.4424470810064856,3.6201599501345605,16.252673816818024,10.857403891464802,2.2782907619074244,17.661358734722086,5.626414743368273,15.12958190921153,8.442085599037403,9.183673327288734,0.8377690489857992,16.671670302726525,2.457178942083109,15.46645621853234,4.253155832072881,3.8353061393563292,15.408710908754335,11.535817180264733,18.260077356576936,1.8997271403485305,9.657922644761804,13.34906853433293,5.756432040727062,14.114224994963092,11.029051230500606,5.266430992378841,13.83960200694101,6.6311522358587816,19.72457269334765,1.948501964925522,12.81178045501257,7.77744541578183,16.694639114553116,8.432773293564155,16.710935883554008,15.212657964730152,2.0890675583280682,15.366558566169122,11.99007122656241,16.957262567368726,6.938720512618515,13.361495667116117,15.605841193409052,12.600629885564008,14.932006089357923,8.714304691596407,12.25346751500139,12.33400544273696,2.7644793786024513,18.55239763844574,11.109730321393293,15.396252668679576,4.795660919711069,5.319669529681068,6.739177877530453,9.340003654602924,9.32288491575048,18.881972685683856,3.4164459769435274,2.891718227966402,18.077750879567343,7.544075574472995,9.83509203318382,14.582187828251625,0.4123209877917633,1.7414970692091103,17.37215643918109,9.689121785178788,11.461229605379266,9.809656561189112,10.627860347910904,10.230708579663247,7.849595917653542,1.217699726522592,1.8547409326256181,11.53654122335945,7.318937593964487,13.639971163383038,2.623539413446596,15.8195436525472,0.3089181799164997,2.369071565055303,17.640206066559003,18.13277139670268,4.6619820252434385,2.1193091792509478,12.31217968180465,14.652127059171569,0.3289888274311492,6.156596520383704,2.853007223226487,4.53806910489392,5.098999495904408,4.634304234125355,8.645540478226149,19.36796636080495,8.175905881473104,15.964743181644959,19.95549113330934,19.992464017136015,3.06262830498071,2.14631956041337,0.3009681796627284,8.024821799351258,1.8866789238310622,5.20792249704682,0.8606359112572148,14.506792235811687,9.67626041687371,15.837354263490703,3.2227619243760985,19.40025354395083,1.617574022438868,1.3682257278335985,19.749370944633576,13.322619580916717,19.981137751150285,7.288817230868512,19.598597799559414,9.83868115259002,13.395187815725237,12.053881435084492,3.048181720649521,13.110556945991965,0.9179529004361653,3.1608128661037416,15.080521199472763,9.24936701348274,3.038162874051502,1.8388993604420145,7.7228848849884635,15.619349594848941,16.19084801441552,5.089395707336668,8.342665960936406,17.269908515602506,7.159960241796295,2.9227812578237256,5.430197088732478,0.6145233330290489,5.031585744187987,9.654140952482738,14.993372809186628,17.810206251663864,0.5966618822069192,4.031633377156192,7.446511010112098,10.496338744668602,12.14384992801007,17.63422951064964,11.506320889115154,9.727059359810442,7.302024005287562,1.4639230459484631,3.6631250584309116,17.41242941378816,5.02256487136056,2.5417062718952765,19.05050660938886,2.2416608890394096,13.328016447665224,7.223754558279056,17.66523495906077,10.943887219144944,5.89457804543744,7.942136497748482,0.6653916723772157,1.732573389093317,3.2060164048526474,4.938360894568765,17.74251831395105,1.6699440827387457,9.607246357045348,8.200126758431532,17.139184145412088,18.18604087109881,13.708629553135609,0.7978769314447787,14.955085943092863,4.663774079916654,17.924927471752703,15.761321464748077,17.048389738144763,15.366711280590089,14.885953853655586,7.136845792561668,5.381950333590595,1.6780189525524625,7.916760193619896,6.5290074760635575,9.604950158801753,11.554474069155685,1.778765149257131,5.094325780882634,18.345711591263353,11.391540919149081,7.4492449862058585,0.22710636329355438,12.270310584904646,3.944653602175059,19.567469371888414,8.441421490001204,19.841604815136897,10.844871007298714,17.597513509192922,12.733961707225255,16.572956437032765,2.600556126891047,5.93534521050016,3.9659292375546418,16.222069364849546,12.913237530168583,4.281302443387873,12.094815060701949,2.148243591367067,6.984644214473015,3.5112659663850687,12.653046607069935,1.329319554195716,19.159042396611664,15.718703074461203,1.3299990211917567,9.552062428993992,3.1970638526645967,3.5449806198684275,9.411462570076186,5.463530439214406,0.7735939097529654,15.348061208048884,5.253283874047616,16.54326457896891,17.32931532776488,4.444421180651967,14.997803063591713,9.946505306648849,15.733193688163901,5.085736091950679,3.8246021599687685,7.5046969409485875,11.45873669727575,8.199404881136214,3.501957062327299,13.36850793409631,14.427715120668445,10.979033616542901,11.44969072607584,3.360174689588935,4.256984552121237,15.090054668066365,1.5632013813793888,11.667010433974756,18.885001772145813,0.2502431459431609,9.74134771734418,17.050904285119085,7.997997067984448,11.983664231000951,14.547167567677155,2.835468794367868,5.16073949699166,15.101670754657373,10.916763096918785,19.866174279505053,2.359292996843494,2.7035488226204185,10.675860953196903,6.763332972211589,12.830850285787863,15.7337349851898,16.680694951516447,13.651475312411034,18.921899741744465,12.458435676848287,8.450448258047057,13.347432343493203,17.331114102020535,15.543620231195735,0.8322556495010902,13.973996462394531,2.953832432827146,17.45414795661756,13.876101722720255,15.040518592030065,13.132688445200046,8.16711072499048,5.088660738006734,16.686174968159794,2.7622750929333195,9.353969340103209,5.298142089304836,19.497272806549432,12.668538830359491,3.652508269475394,3.481652112252709,15.719692149475385,14.083202108773033,14.189439817412888,14.152527878293402,2.3679202114859654,2.7384534488615397,0.10278779532007398,13.226540523895656,12.883113683838886,1.8916001455464437,5.30467841509501,11.168060520882094,0.5530148319061734,14.646616368580156,18.166386771738114,6.9012196076021,11.739190279047325,3.7297723544324013,7.7062900992714445,14.76812158028379,9.553177453044581,3.8794375639368806,5.124405383432578,17.24364690702015,18.95396093757856,2.9665054046275285,6.248597471786619,17.765032444708794,5.982174929838537,9.506664475813205,11.10199368045679,18.05238976826935,4.461245022589573,1.5880062417996754,19.63496577182688,6.283478008820014,13.604080060519843,9.320825248249749,0.9797464458960148,9.602369110739088,19.38619431532135,6.695095485969227,7.1633599095297695,13.028632919744476,14.625399286112142,3.207544464257528,8.033909082866227,10.55488313217015,13.852221025857624,7.199261115595688,16.92902088640755,2.2585073360189734,7.632120056893856,2.2049854144188563,5.692136877527698,16.979951824063583,12.262854721910369,5.253232344821166,11.084738671114733,16.192351421771694,4.003129637643932,16.665213048757202,7.001082271611692,16.45751904148751,19.071011735395604,12.892825835343103,14.901619831998708,7.976662434572024,3.5922309500856464,6.682460599643822,2.4841838679476247,15.164177312319204,10.419656530249135,9.177772159313928,17.820857614189833,4.018531470434952,7.066968569473051,10.10866940701682,17.292660499242768,15.330523851473838,1.6963812541745282,15.83701487557288,2.6619820266924332,14.659355224025559,6.675571675580549,9.130761703101541,13.062780958545751,8.262271542476842,1.4295985633888142,7.8136498013648525,0.04893649388056254,18.538819944120768,16.909206992256834,8.397301044994204,12.786117523028722,17.639585514606544,19.138427359077458,13.544323221184676,8.679861028059982,16.109002438497658,17.359558518544432,15.059249155437868,19.826274962530807,19.53913626247177,9.469005499617907,7.914224541968413,8.369829236490718,5.104254783128566,10.283945410153041,1.0529421421125518,5.610123142562404,5.239060244349671,1.3020172627394722,4.646675168128018,16.177976457993726,3.3786827486275994,10.500042724759911,16.855516042966002,2.774221963845407,4.719553659458735,7.352331010472071,13.744659378940502,7.652080863314947,19.287656141872013,5.572374448780311,14.887419639876418,12.645594434319833,11.011800504572836,3.707601319420095,6.35936070409433,18.00304241238381,11.075417808555073,5.380598413417719,1.5689518844403194,2.3214943771002616,7.190695697202636,13.356486267315141,11.897151037563813,16.915317360029277,15.113923496045786,1.3017047684280136,7.677161351334316,4.523429170963067,10.512111367638175,6.9215684752332685,13.332176767755733,1.926630056583245,1.8125313517187713,6.468903947457769,0.7199859931101038,10.605005184388538,5.890301860427174,6.132278910677855,12.596213382664985,2.937032289382615,2.324279821004791,10.050668455814096,1.213311129800081,16.72300415479628,19.64235934046802,9.18825242424122,15.367851523833158,18.14861312128547,8.855616602164469,5.920672861093856,2.036392955540949,4.988287201024324,12.610339214334898,9.451092293721262,8.060248262606425,14.272088629950348,18.09676083576063,18.478378054695096,18.5403408072662,8.197599378711349,17.05351167888211,11.038879775502162,0.1644198742767733,13.770554807410793,11.461574175688746,10.04414443440266,11.058762655250245,9.386248314182989,4.128663394477101,8.78325564808096,1.3266208546678637,4.6176017141681,19.852129701756297,15.066424710628947,9.194366856302235,11.662595316124364,15.507442822508292,13.45970783953604,11.775541785450482,4.704676037743076,19.853682660456773,5.120340964592671,18.291535080299816,3.8958011224534816,5.752600983830534,17.526181266971523,0.04875844829341336,17.970313049355788,8.963284861582164,9.71662977546712,0.5763060144270948,15.230096764171414,2.8135331292667587,2.370143873214965,2.4348704740801708,16.371389028224268,5.013446963195851,7.903896620038582,1.8384119236738572,18.472239871146748,7.518956477059429,16.19507105584517,9.002501277882832,6.441423009234466,1.163868188625563,5.410616086807893,6.035461482452735,11.062485959670717,19.794580234007984,17.221240017682597,10.220339832326255,6.572712870060746,2.1553107073233857,3.065689781474452,14.491844448020679,18.698352994528978,2.5892618723175165,13.398997876788812,19.31278191963447,15.176207634480763,13.801160913237883,17.179601529671604,7.71486640571557,17.490268798774686,18.43265874563148,6.410154659939891,9.636358579757802,7.280290898770252,11.890993171395131,16.26930557916594,2.850925135675868,3.3117416504236896,15.834157969641577,16.212614252534824,1.8560709318583735,13.525418196979224,16.952672999156437,19.10991739547697,18.844493340719378,14.244896451669415,9.104901659472254,4.311920563272453,12.007694734376472,15.11999461906338,2.9825194207263994,2.2904050956614785,1.2510414707218986,0.16084888648198792,17.212527591579608,12.015192624689854,5.441062303487567,15.928638372672093,3.499894616408783,9.28800382836469,13.726374385106599,3.0567652320512817,12.088158244686142,10.87590778049815,15.19179784335246,2.608378583248885,5.440660665984307,3.3611357795520025,18.557902227166238,15.964679117118656,17.006593307983692,16.36724659520844,2.67905447588503,6.938482703400242,16.195820726585563,13.284675112685896,5.895923242848502,6.058110756308506,16.958914681706343,14.925910186363872,19.448311526342415,11.542908380927951,17.336184834730254,6.554060941835731,14.633885107673281,14.99398376835388,0.29126035420840246,6.844651899164185,15.561490248397295,2.016982583127236,3.7659018118043353,17.698308984574282,9.14597652591413,5.947543688167665,6.111227106876482,2.144967420457866,10.081557200177006,13.979097611019746,17.32672496790085,14.406406371550528,12.421447830004722,15.61135400665493,18.049739539551073,9.477265396220265,11.899749224964328,12.920201359583512,18.182754848360275,13.99992026792157,3.307161219066539,18.710657637807486,18.574402849433405,14.943877498054992,4.795892422631667,2.543635472672987,17.168333167110596,6.0416725364130475,12.923406779063784,19.335657798985217,16.622921688666597,9.6684155890039,10.795044808306354,6.482618423135542,9.693844479058772,1.7216997276132906,8.379713840443785,15.119544892809301,11.279177842074674,17.857714249463225,9.18790207003742,10.299535683614426,14.854852755838497,0.7361267792792647,11.687002249141777,17.946885996057738,9.967094064714033,14.283438905884832,5.155040274619216,11.384923446059322,13.357857324978202,7.701604524744021,8.47575208687616,15.485718047801305,8.801736500704722,2.4972661953767172,9.263064053409211,12.809817804243554,11.791373708466711,1.933863259208759,17.961818505250214,12.883127376106195,5.538151240705145,7.710804937519478,15.830942907539063,14.359949875753312,13.018405890827252,13.17275329577241,7.9902576699987105,13.312277355512192,11.6007535556149,9.283167764790608,9.589197770204292,9.900671702161684,17.813211738479133,6.5308419396129125,5.7292895477733685,8.716862407083209,16.32901546187762,1.0731299368717773,10.51654062475739,4.003805014071489,10.626878554852892,5.473663034408518,4.698294150060809,9.39452576437211,19.386887835863156,0.7038047217440324,15.555366729108613,14.111069419713417,11.114004580804684,19.014646089803243,10.92314391100154,15.53308296094996,9.01418545485306,9.604234046336565,17.83482016188772,9.343431770508609,5.388491437442666,3.3102878615681686,10.360926020433654,16.994904498990667,8.679343627376666,17.011240523041447,1.4735836889107201,16.162095757573876,9.598248594204627,8.33281024421165,19.627185478999685,3.843698504431856,7.575708465913524,5.839531059233627,12.154303196950313,10.23093318419149,14.683669198328516,5.563518321657801,0.875844128891945,11.625332937078081,9.22582402035129,8.20871269175312,10.116615062720893,0.9987817309746516,8.735612428800298,4.009855341639228,14.211093577620035,19.669241064766155,10.04928553276724,7.710802067426821,14.328857528989305,4.269790530736879,17.49708142243506,15.956107159791593,5.385161672350778,6.503302035265417,13.489753688557293,12.346289460801794,11.200994954604685,16.870857801313633,13.762323751424749,9.262720358072766,4.699143715563245,10.177048186816634,14.905886360666734,18.341718623932152,19.964000531468763,15.144483756361806,0.7632889276380617,5.295066815891332,3.298786176898325,9.8108446821748,0.6634534688886307,5.220599632407921,15.36013483622176,10.25983919766665,16.23563743412056,0.39150503262713965,19.057289720144816,17.23059965111727,18.8870342447191,3.22110977736513,9.85036740870019,6.328491801595799,2.756420457118698,14.099622037466748,8.418844605299164,1.757132539602666,0.6350794305941543,18.618150245023113,14.435454057512942,8.232703483093822,7.031621677551789,17.59135480793362,9.466496689038193,10.484693891090139,13.571707234669837,11.494747282241535,12.496356069053999,17.828381466008235,13.111129477556531,18.514447451563868,18.40477637421305,9.684384977012733,7.445771487951687,5.535912971383086,10.926591837643693,13.93296154878167,1.2645611752961416,8.267372195120126,18.320759961474074,0.45609694599282324,14.417668867235061,9.600924413951976,14.947712821648484,18.465389040105897,10.686392903186967,19.111370646457612,3.684130949664186,19.096941297923273,10.528705913360351,13.729573475324784,14.329736927201488,18.62630673233143,7.429728618420093,0.1575950247950475,9.155565499247613,3.920918511205924,14.84075973158918,4.4581317796897,4.163128889660586,19.788559720121125,3.9942720761903416,1.6470723076466953,19.301550062334186,9.319989747813654,17.465020104712778,7.65775555501607,14.836909628861129,13.804756035656393,11.447212355577832,1.9366540472343852,3.282258025051883,13.927296940870564,5.512241804221931,7.269924184375114,2.592019515578574,10.025608825126877,8.78035237105324,11.235243282018912,17.762504853765414,10.73639750320595,9.762362297201609,6.85253211775426,13.040424001910553,3.0571230610359823,8.294824510469923,8.20906156483666,2.6391710749588837,0.9043133446271279,4.8392878633329905,0.31562801789695616,5.46958994207738,2.591823291275852,10.145328579466542,10.285641551446316,8.340404442291153]}

},{}],70:[function(require,module,exports){
module.exports={"expected":[null,null,null,null,null,null,-2.281391620905432,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.7851077048785315,null,null,null,null,null,null,-2.882586465964394,-2.3873969230096215,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.518593716565786,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.8876213581273635,null,null,null,null,null,null,null,null,null,-2.9428264018027845,null,null,null,null,null,null,-2.8209052471827536,null,-2.5288366481559645,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.1470410424419826,null,null,null,null,-2.8862485345548805,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.7314188365229306,null,null,-2.5896226835589813,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.622515385356098,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.8198816065650725,null,null,null,null,-2.471541587559675,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.4829393930429005,null,-2.8791154999946555,null,-1.577009813061924,null,null,null,null,null,null,null,null,-2.329873199114839,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.7978831286656725,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.228130818629977,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.812908939342458,-2.7096061585637408,null,null,null,null,null,null,null,null,null,null,-2.422823201818632,null,null,null,-1.760482420441524,null,null,null,null,null,null,-1.576989330131084,null,null,-2.6597320076922584,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.6148712423633165,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-1.5315575108944492,-2.651025450472276,null,null,null,-1.4173599156695675,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.3892048944513427,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.505231420544356,null,null,null,null,null,null,null,null,null,null,null,-1.7382543859000275,null,null,null,null,-2.8632784333938157,null,null,null,null,null,null,-2.721162398686373,-1.7917153007891247,null,null,null,null,null,null,null,null,null,null,null,-2.183427513305291,null,null,-2.5547546867706536,-2.927283977250933,null,null,null,null,null,null,-2.8803883252898563,null,null,null,null,-2.7056374137820285,null,null,null,null,null,null,null,null,null,null,-2.921528785258469,null,null,-2.7830440061348445,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.0767932156253326,null,null,null,null,null,null,null,null,-2.4161099889549096,null,null,null,null,null,null,null,-2.948924614464713,-1.064088017535271,null,null,null,null,null,null,null,null,null,null,-1.9628973158342167,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.5661227841558785,null,null,null,-2.953927415904276,null,null,null,null,null,null,null,null,-2.951016831473363,null,null,null,null,null,null,null,null,-1.6485858273916396,-2.6799073483542197,null,null,null,null,-2.6605516904503195,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.24540839199344,null,null,-2.7445616586133945,null,null,null,null,null,-2.909830704704805,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.9663084192403977,null,null,null,null,null,-2.927368302236254,null,null,null,null,null,null,null,null,null,-2.9544813815016493,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.560532531247009,-2.5819907952147894,-2.793164529525555,null,-2.6840752367319842,null,null,null,null,null,null,-2.8854779172256175,null,null,-2.743993242941327,null,-2.901103612392748,null,null,null,null,null,-2.5924257081936752,null,null,null,null,null,null,-2.551973470160004,-2.9544102519486044,null,null,null,null,null,-2.721536704668871,null,null,null,-2.642845392201088,null,-2.381263047603518,null,null,null,-2.970582975338271,-2.7875184985028123,null,null,-2.357939655769844,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.9833136316561704,null,-2.499711107445327,null,null,null,null,null,null,null,null,null,-2.760320339776693,null,-2.9785646323522696,null,null,null,null,null,null,null,null,null,-2.96071104813539,-2.0501876250597357,null,-2.24944905125818,null,null,null,null,null,null,null,null,null,null,null,null,-2.794149790250068,-2.9336435786884163,null,null,null,-2.9769935012275712,-2.617879245822518,null,null,null,null,-2.8263264834247708,-2.5304453098867024,-2.700378106450514,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.4696565930299688,null,null,null,-2.527475044972132,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.4961768982224104,null,null,null,null,null,null,null,null,-2.797001645943089,null,null,null,null,null,null,null,-2.7235567977329667,null,null,null,null,null,null,null,null,null,null,null,null,-2.841287951469751,null,null,null,null,null,null,-2.6055426472366086,null,null,-1.638855580547139,null,null,null,null,null,-2.992569197064514,null,null,null,null,null,null,-2.9470992374141143,-1.301261524538821,null,-2.7976202261874423,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.885248772323088,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.7474183168279116,null,null,null,null,-2.678637950703913,null,null,null,-2.8118054999891635,null,null,null,null,null,null,null,null,null,null,null,null],"x":[71.86748645721617,36.74212678529698,92.89526769225802,78.89882526326069,93.29325949317517,49.37088553950828,15.040785395620858,92.80516488798382,34.3060136848399,84.79712228022143,86.82718960946431,33.527526809537164,31.92811158096438,55.13488433283684,47.095413163164146,17.598079713302294,37.57319938724357,1.9226931123191848,40.72521092403982,64.816039075034,97.24443660468931,41.279975468524334,23.803651235035428,2.220661370793353,99.07950723386894,86.42045158568403,80.82283151395622,59.45082103845114,78.1525082503359,32.73361169991054,85.0901549961114,91.31771224734126,32.43553654999067,63.728294795636266,93.48310884367793,67.450159689319,3.7270505170659662,51.19259741436768,5.014518676727886,33.08696554554038,59.75644305828918,3.553708373110953,15.023004176022493,22.104410081029858,86.39506488407318,48.620339367393804,45.2324273864783,18.620643116462034,36.50132669736521,52.2985844188818,60.404777560317456,75.58755685847214,53.47670356515641,72.85719106935917,13.606131939589773,19.955599696157922,25.201123133740367,88.12611912345054,4.292860433128176,41.787209678874305,26.63622980712532,38.30578329982002,68.21486050355894,23.904131718470502,56.33109258431925,57.76073424065207,90.95127142893642,55.17731462953528,19.660212946190224,43.24429497226967,33.34832708322484,23.620297105477682,41.39502294163646,67.22060331499576,37.706151816001125,24.112541979032322,32.416230148230404,6.842946857039456,27.995434109752935,85.85377068226742,78.87133036099128,60.304053985490924,75.55091811502047,97.54021823182822,86.86448466590258,62.3838153334368,76.07542998853766,81.9135755095154,55.69684229424332,8.84372829510105,90.72802753524228,81.58799561837928,83.9619010187509,90.41031925510875,64.70053501127883,25.400084218245933,77.92321649670795,38.89583883181948,2.5180297463760493,81.05675581368774,49.76192710196832,59.87257717893595,2.642841908666149,23.197119415946908,79.39908184205402,23.533818979455347,95.88422977929494,11.810359552319415,52.56437979697408,91.89007949971035,54.35723124526213,1.8569699627565273,34.789250945869796,83.21872526878225,8.724036108366162,10.724026374677953,10.01258636768172,96.81167277124057,0.9623948489852152,0.7918422685976978,10.387601026633252,80.11329962396555,82.57395078276788,92.41479730336486,60.12898925823158,85.24010689160306,55.4121287872249,64.04429067041471,10.148197211490029,73.84081840773437,84.53501546079603,26.992961454866915,29.012618947541036,22.88920185212795,98.10341680328636,54.7693994241631,97.27200767923718,98.49318816567451,22.896185695771297,47.81427383012045,96.02987969550527,77.68495526979535,5.296094775755789,2.8321279625453943,84.02089876908612,79.47970995793776,34.45145369695091,46.392148224383604,97.0443208360831,17.260661971805934,48.06500977945114,97.16711285931554,5.104856914119615,98.48309134591295,14.905162835647179,33.85010607042116,23.13506032252759,17.844339452567137,5.1135373149045815,59.30902381013645,97.17860127787652,42.4802751199914,94.24487843764386,46.03614901599713,18.653330741087704,48.63932884052535,72.60130658593712,44.69080964062433,79.78733625494459,67.27467482289813,66.80409752651212,57.26906577001694,43.37572851096545,39.858053106185196,42.77202922355134,71.18732064795077,63.665279669849895,62.47225523056377,80.81112932450851,39.69237927645488,63.70142433025312,28.389296610649883,65.68287055590143,96.5796828224093,78.95184011053303,75.19611431936563,40.47624690667182,36.1036521606936,46.418091996469045,11.60053964686847,0.7272013665907684,66.68152128841763,55.956586949428285,29.86542481640275,41.543990075476685,33.361879502586,50.928522192796265,47.27712942209086,94.42710684083457,89.04493170937529,48.167655632083296,39.99692272282853,80.22906422762077,67.2829770609455,65.33589598770621,79.30958023879724,89.1554458539936,41.52201019350081,99.66848029100817,42.931132659936424,34.99537775648651,59.19805632485311,78.07935248321243,15.145720281991238,24.620073561833443,23.521723082530222,77.59895381419162,60.47247889508955,85.3607019532459,9.543096993280775,79.59909925834711,91.44220993916952,66.32853581777567,79.6819363550167,80.4060496438612,23.397339234703907,86.05809218102026,50.9118062647812,87.81257673065497,49.57508405368045,12.516940843418745,29.953246827005486,65.3766387339727,42.20761632594792,61.663935986322116,82.4211612543134,72.83532247388867,23.231749590285354,39.31708762483095,82.09544278386372,66.60092820406189,90.96739404587339,43.423377669733476,57.735752451293564,83.98665584736595,50.895469638336486,95.385309733788,80.54404193574834,32.6944069741252,77.79227044202794,20.706070355118978,18.28479789640984,93.21376185889845,18.669781634088434,51.94570349087,17.62408900100898,67.630468932679,44.37014828405752,75.41543323040057,43.16270565187514,54.28432015755289,55.295524605393155,25.660928264769154,74.30050698983794,14.927308927234773,89.94149045461121,73.67068967396769,66.21956551596907,56.39805955915727,96.769096714693,1.7719509246020726,49.73226126795791,53.76647626964417,77.67511111109538,53.30358108440727,52.38300317903948,55.77892518583765,99.25170874860649,52.847079300077816,56.751783725515835,84.92262304635348,16.940239432711437,54.804614739456504,46.81313474842275,58.33992242514865,43.116293080160936,68.10457135744055,27.99000828464755,11.973934338312887,92.73045120685887,0.4249392359174431,54.23953153033991,34.71011869878622,66.55394145235805,39.445259156290845,60.38808552417145,52.91560310019972,55.46004164088616,69.5363531810108,76.94041305738703,26.265149520870267,35.03869523791205,55.259317774046465,16.178633948830743,76.38066400769603,32.16197163889731,50.56354339411482,85.83037271314082,1.881931204077003,93.5064026583476,22.678263373622464,49.2788476158166,8.63164661553184,20.7606259550553,29.635050678452714,36.063564435035865,96.86783103215697,50.44379827795722,51.49106378931445,86.93694120477802,61.84654866675887,94.79877780800543,77.37264600021909,52.11072350043704,80.30597325850255,53.54497918948133,28.887228921199526,95.17047921452544,75.90901791744709,74.01318773630838,46.820334502887476,54.305683005384275,35.26140429363047,90.29414708212127,51.59844437271648,39.172372186966165,90.54923921827331,13.168794057745181,35.22047572947245,79.42789494770375,21.328088694003178,31.696451003758554,1.02320851673936,62.00958854852108,52.9960148363197,67.5028845974188,51.23327576003949,94.43483970611035,29.713212750146866,8.50437329784941,30.490425755689653,40.957052489275966,84.57517518840969,93.50150321631278,5.594629637478499,46.29275822002585,39.23476273722191,68.25207453349584,87.34517232961375,51.75484875892682,24.659863816099925,65.13729706405688,23.71275561146757,7.184535915162926,17.777066729635216,84.93615251444744,76.14790971229613,89.79372614784144,53.13240453432253,87.13182577227904,27.744192500910447,15.887462990565403,11.198775772379266,55.2521060757099,21.82325414230064,9.894177836100049,52.183550060433205,19.792381167880336,58.40099988837591,93.79788088939827,58.082673423010704,24.69019079187302,85.42086745036947,72.54571259795092,81.90017321697465,10.375502119265745,81.16132787274941,88.20394384600445,15.210409402683078,12.333614722601016,61.839999028046066,49.53483174961377,47.04968033458281,51.72828930975633,71.53219642876145,52.51209856267067,15.951527067268634,83.50367467129978,2.2698160075983687,58.94488604609298,83.38282748335327,49.432274739309754,93.3153450452717,81.69297066616198,20.221290885231614,70.67642634518295,77.5249723824973,53.73334383449504,95.29788809095376,1.5146262842869795,84.64683403164896,12.872629812411995,9.799697101154536,51.99847250938443,29.864805627467604,75.98420574890572,18.6836018927635,53.65148859510642,83.86883522905335,98.6748387327315,36.31182824359056,27.733844111826112,63.3146673606505,2.1613245477159593,83.05128920518953,35.86493972290204,27.09333323551053,4.518301548310322,61.539611588166075,87.2458355954783,99.82995560832062,67.44040673748488,1.9292503235077696,57.4101912544005,94.75530874939508,11.616803175412693,59.19201118366946,63.555631843039166,43.1349477255768,7.796454067752445,32.67721832064241,95.53452014564321,19.596274876104825,84.46508272294986,36.11819439212254,35.22302440149294,59.551259887479915,69.33526800563263,98.33094095926921,24.15024192254387,8.430070582790972,63.92608628233689,44.413333748283094,85.70377311964108,25.26826759217624,74.12721632120028,56.14194171809637,75.10085114458687,90.65317602042684,12.419572564711313,91.68828913257998,60.62110110264997,3.1964759864237635,75.11876495251227,68.82310345364078,90.35565975918387,43.966121679770275,81.2244420242936,58.893484767264766,51.64556033251699,19.518354191289532,6.528943561781575,2.9951638563547656,31.3026929343144,92.70563356808745,0.3238086248018801,7.59945094272898,25.564704389439964,86.13808815478991,56.82487083158183,6.923390944352503,17.375448673700355,74.31514348554089,8.050169088801894,11.900089873444264,42.491663925204314,49.27941693772002,75.65476181885205,51.52269844956179,43.844550354972434,45.034187041301045,10.267772834548893,44.880356366890254,96.93503398684177,98.98406659766339,88.87035043125702,25.621078240294537,48.088841230307786,46.86285239126964,26.20213269894198,17.511673899476897,55.23572915670143,71.32527314140668,58.64177142232474,70.05423460558231,36.23653855129019,43.435408680388754,23.18879515886716,42.59047592413303,99.17783285786604,31.15070613008404,82.54317313654039,32.28065363844448,41.44238838593737,14.961113778311264,98.18183490962858,59.84839258268766,44.698954223442946,76.40542005461488,37.63358326176003,70.3235644377257,80.87536121432572,98.26283319793234,23.209914218985105,46.83570577826668,61.710419449698264,22.167567863120084,71.96757720687987,78.2835870296449,60.485721162826046,84.22530325751711,38.05629731874882,80.98290377073916,32.87947621258298,59.41748591824187,74.37183278069452,72.46910680209797,60.37371564309644,73.78817344749793,93.61960633065208,6.218900182879983,99.86859098151102,58.13394294984402,15.699897187613377,89.02561326501032,47.468361624083435,78.8941796072826,48.112096432562915,5.3744664699327815,93.37286016853965,52.321025149311495,18.884976644343453,19.43968994473071,89.48371753627617,93.49303263054284,62.06983916338462,2.974393308754042,46.65336054397255,94.06291290267615,87.08239800768864,36.212033943201675,12.200982601345922,11.094419191894156,34.44600762632874,4.492223337987045,60.3362804849852,2.24637711439013,24.37260724473269,21.921291810076493,19.029741693617908,4.187748357660093,57.048786515067974,17.80302023907352,40.89473528042484,27.284466068475965,73.52041311694151,43.02968185891909,74.2045740536644,78.52434969446777,38.049375392786786,38.773771309544024,7.308717339708193,3.999044241826133,7.049789626912406,67.56100577454053,30.574829542385974,41.10190103829516,32.96385236667725,1.9109587631784386,96.55239091263002,9.295864616471006,35.957540076525454,56.9796243465029,72.368311913109,36.501094060695195,16.96532293154609,77.82759732084857,20.430532079369137,63.76328522220716,9.480113444081839,37.24128044175274,97.58146835535126,88.9534319159017,97.62428040205427,41.85667089375911,39.75866928493203,54.95908552485069,77.63261709609046,7.534579627610016,23.87021128551725,24.471299536528957,60.88127223043014,27.326929410758495,87.18403220703404,58.83222647527715,45.05538517616803,62.040744701992764,7.353127159964257,11.849092198328037,75.96850694416948,59.4274166203886,86.2315987448566,38.233421528087,4.575165207599574,33.321709792772225,38.701492144979774,44.121072572539745,45.32842224553475,84.21328691674606,49.457747535854615,52.25817145572689,26.49461156542774,28.118164446094696,68.78526107008922,91.22869183002973,38.741698657549264,90.99555728160212,54.427626582267386,95.05131832982359,31.666608239738416,56.10586993553226,6.3548159329254394,83.59135448532943,89.71107081093174,94.21557597227465,71.43427719164379,53.87170003641264,65.09876948123706,96.87601589191914,13.161467058413368,78.24538730362676,27.176528896110796,17.940680929348375,2.3547276522566163,70.18111806556928,78.78162248473987,96.51424180620974,59.38170494897144,13.75753615602866,46.62901702367601,86.7871593549256,76.45454143680428,25.345499002450268,35.511376819803985,38.605146980024706,88.47860202417064,29.57775920912642,7.048425851740925,54.866121415985056,38.32042073181982,16.292208497287696,48.78735133054801,97.82307034260937,24.252564534937605,88.36825502675272,32.933497279074665,87.36380652761957,99.19606857304115,98.70712263430723,4.131232850372446,9.619571087535395,85.84253881788426,79.94278191742796,37.713830650848344,89.38270534884312,42.422423366710625,98.67781517647407,57.464162088745915,11.15352527038922,22.94398772122488,79.77192020256241,37.06511696330927,19.99604398558059,58.796771606262396,58.4545113622527,2.0478233823593373,74.6950395378151,37.865139745758384,44.614766637346335,93.99323356025593,3.684904719732085,86.86804516864728,90.13687565172926,11.513856031532764,7.831741126743075,16.7957563751723,79.9501380418486,86.26964656423515,67.56406169088014,28.91520553672311,42.66943701334891,74.67665669851283,85.22242449551331,84.94086918635848,12.706215692603017,13.986697222656908,28.999271393945335,30.941207010643424,22.39599288516856,25.057960914329325,22.274725907304394,90.13896190795496,42.5799044964367,11.522756536097845,54.463015697378815,10.149595191103856,63.587361883312575,64.38317437697813,18.577748055462486,58.105462287606734,21.781473684435014,44.87324888964701,96.65947425546875,98.51431838126857,29.279278632077176,37.11992852977233,16.788850975771517,74.92046217729356,94.91104837269913,46.03957365936768,31.310319873928492,57.83874727467961,36.921537383404115,19.081879967458804,28.857761394483262,42.46470155242166,49.54799423094938,47.361530809319284,73.69082661226436,27.16953219613716,18.78705553805835,71.84764763508076,20.58996306749803,27.146003328567915,14.808346395611881,56.91276209640159,25.093611672995706,44.41436742647205,49.17178509879159,24.69749999524302,23.14745037723762,19.272140748350818,63.527591304651175,42.80598015661363,9.071024126754267,41.22407910575128,1.087242214116868,46.98462328325497,92.0610869987303,85.22221558377451,31.67034665831432,60.00481860224802,24.789444625845537,53.00513738580932,68.83028261448149,36.301911885137315,18.8446800721894,40.06531390897592,19.757664418711872,43.032637727028344,9.822146331976512,37.532150243345086,83.91072282057583,58.75418081005122,39.22729837159329,61.39573819269799,42.93124491152622,35.40929959131227,86.14942844215821,96.4843266260362,31.80590175945863,43.340536589155796,8.21656324907205,97.07008295456252,4.540589944652584,96.70879916446138,38.78709925340003,24.14515754163642,32.283169352869145,72.0308032515147,79.38756335683709,5.151345558524234,11.594602983901758,14.033215444286707,47.67149027823934,6.588826293611572,66.96573929486765,16.166433185032993,43.407512789757654,68.41682233983543,23.168096682061524,92.09611979363119,46.58516554262668,51.34975310818408,95.16866773054986,34.24985866715693,32.071234822212325,48.70979814406582,30.072293635379932,24.336381359744898,45.951438068545094,82.17417033232981,54.88339964997411,19.346444558750363,20.5056292410841,71.20381342118219,7.42812235183079,97.6959464360574,73.63122498850645,17.336941798595305,3.347025934331316,22.749091432101597,88.64177811945639,65.3559048655633,96.82504374037522,0.2184239384926734,43.157073395614965,19.76276217121584,82.0995998063675,34.79585479446072,37.7212173005137,94.59633392113463,73.43475487596069,46.924245095679275,40.072987941224845,25.93551219734527,36.05310498047161,78.49468712327538,18.05149879909871,68.30722374203972,30.894126634509146,40.841728969379346,27.747339809269732,27.1837255057072,26.612461008896492,54.558590448459874,26.85682550390314,27.522728190040624,22.830262447078354,73.31132487511947,30.67317639084932,16.471337152008523,88.00069963193273,42.961646383480165,79.12143819274891,62.26240319748408,40.60862336556674,92.29366440750859,57.29263518114185,69.70197385134986,65.83694486321114,82.41104225472786,83.05289079278792,28.309060852442425,75.37422366849592,18.40055591992529,53.89368540445805,47.254097092866786,41.98907555816833,59.48452473799048,42.34330123881591,97.69952102036127,69.92929700146904,49.28001047934556,25.175828642635878,63.691418303922575,39.88700377536125,14.01123414834009,24.964774775133414,40.63209410192443,54.065973163714354,81.90490096302902,94.5477139420037,34.37036691816255,34.44686665305379,44.31436483673505,81.26367705700852,20.101441392502295,7.448251911360093,28.658977729314095,42.299159108300046,25.748538097652318,58.628903747046145,67.44020553796435,64.08850472677648,0.2617723350196499,2.2630673150281666,28.610515934766244,55.29845214550737,87.64021750866489,14.357893790943965,6.915167284508095,86.68973830261658,62.82223625026597,15.581436791708537,92.18081288549389,23.92759739708026,80.97471715629956,78.36714799502293,97.58312507850466,11.913424736183753,20.94659396010796,91.68739705937108,88.93266294415112,7.57510013645315,51.11421204328781,62.071972425678965,92.04306608309932,46.36863660584207,13.533236479700372,30.197012478029528,21.594867979912323,63.994259894381436,43.488013090516134,39.81668036938717,69.32147831637229,31.63665703606162,20.83499729459748,8.984982605975,82.69751209348006,6.251300699772533,34.96308963275521,67.68194897869826,45.399981623379595,31.029526497870986,96.99164205291578,76.7133892326286,6.8213278819787115,25.662978214422495,57.15131974369743,65.57165656584196,76.75872519984344,2.536340025052919,63.084586015968426,4.80160883496461,90.4346571880903,53.83309909737983,31.635481972691547,39.611033348745806,12.220743277000224,38.90561506797903,62.71724301620534,90.88060901109698,14.915765240589597,11.321613839655043,12.97055580472044,24.46204649179924,84.65477079366168,97.9779361957687,6.9640110261334875,31.99832113347034,68.82633057053123,93.20387970644161,85.41406489751691,95.62453137064686,42.14752552603787,88.30563817450276,91.96133705498983,14.767340200836166,29.80818044397262,18.605984537133537,58.702853184172696,89.22493083105061,11.702984229619817,96.0681356596912,89.81230463114515,17.96719038460848,3.522947963415457,64.85570360765544,22.086803759776274,93.33335715818478,63.789340819976694,42.54898821792341,91.31321185306878,78.16855711534696,39.90772755755489,53.38860672835786,34.8259508775361,60.69462860769301,90.01273051542799],"b":[19.780153182640298,29.970188766162725,38.11008591120947,15.752993437741601,11.49478170695232,24.600782622378354,21.748953531727505,11.158618365399043,18.28689341879891,25.047632233840073,25.70634060943474,13.250983362727478,19.628551841207038,4.0531132151798355,14.580929285145142,16.781056144821065,21.127020227432645,28.336282516822806,36.22840107457414,25.264341006178444,25.848890426889874,8.336014221302426,11.04821306951008,15.864539122587091,18.190528138955653,11.818181346960156,24.09031670555073,19.13335368783727,29.23666204682082,25.007312321629957,16.698677745609068,32.1597818507704,21.188435016840515,15.761417292653643,25.305287655491064,28.53695346662431,18.83248474954959,16.28168649029095,17.051973281415624,24.493371159174927,31.611545062887135,13.199209114748246,29.865504267535215,18.097641495115333,32.49246575953323,8.899002934445509,28.77267442808305,27.37417900610415,35.7606369442165,23.82097503853017,4.449145901258675,17.09266658698919,17.12474234049175,11.386281149020858,21.297542433427374,28.903006088199888,20.360252630923757,24.57046439387151,20.905557425688436,37.31741706448604,19.156907378056175,19.89397926194819,21.78966004924665,4.082741392909255,5.553551621529058,39.03220372734148,21.514121428,32.65031051885309,25.812419366092158,20.86705970237191,18.488314971749304,29.09298085625284,30.02989688543995,26.385438096759813,6.25871244365277,9.280891288280504,4.143546479621212,20.39075681223552,19.86931033490383,12.241744816201003,18.696323620015658,7.132607116635543,7.857067161461275,7.204661280630691,32.52693585550766,11.823368918072212,5.523250491503231,19.525980433364452,20.366793307296525,26.38053164523183,15.804451580499673,25.022846642861808,30.74762302411566,13.124002946778184,7.208941943616551,34.971318791217776,12.21536692387971,13.331671344126214,17.66821249698561,20.5117656661964,18.312773590715036,17.648038155090113,24.39316775852361,11.146963799305606,30.035796953052788,35.47371847685193,27.473607101276105,6.1622232474434835,16.173024449910557,20.91183542940729,26.19302801825246,12.710071157153653,36.241391393521155,36.520375875700765,20.904279728738445,15.91239992622305,29.145047199302724,19.37952884901913,22.14406480924497,28.68097273265693,28.043262254470825,11.603469534987024,21.643805344482402,19.692720537285396,15.271428319354602,20.471534276512095,19.112863781428054,12.095484380852518,14.905428155946217,20.01296240211364,4.4401768880834425,6.159114971805937,19.3405666406233,28.73416605585841,2.5436151412775,15.6819586432897,6.187674190338588,20.04897167870765,21.535000066697705,16.467141746259948,26.403739838334836,26.004971146254444,14.668409228806322,23.356218207864945,15.045373429156808,11.96856755955596,10.158735283879086,7.957664375016136,17.950643249978306,11.49677012982082,11.264823421353825,23.231495431611926,21.374495266705708,26.30853464986812,22.615595412966954,22.828963538612076,18.22701528533806,30.695514011373625,10.789195847268406,5.122144610111654,28.565842449820344,7.567355859017373,18.944963874160987,9.9454067053769,17.885490155351125,8.302995255959464,10.721291504047752,3.3303418890662106,24.504934920591307,18.611123648708077,16.389811993029575,26.59584123801755,19.79985604355972,20.994438444005272,3.5408332772135998,18.77815673040301,18.936559160509375,20.821999591576876,13.587576974067828,26.66377054049077,17.822780315685975,13.354579699413218,25.741984179423532,16.04130448758658,18.423769687825583,23.063087832737622,20.556606854284468,18.608083574809935,29.86258795312818,22.836647285623066,22.69830682689394,8.757962683668467,37.5514147146318,26.646482679270164,9.73576613777956,18.79341582201534,2.621921899178319,17.090378508731266,11.50601606414796,19.83508304941809,20.071566876646447,30.095189296481422,14.643316089873291,12.778974832970619,15.488075211445341,12.861698183703924,13.431676296422452,28.609882061792803,4.720292308502558,3.56576167308865,30.08158652078012,26.018679008809706,32.590775580682084,7.8560343217419115,17.649305667043855,15.225247984513608,11.37874182429934,15.1425622007658,27.355228920101055,27.347540185796152,22.31244409957671,28.423119837854777,4.640127728337751,26.674580003701927,11.388697124812413,28.49975469132928,20.61618733158643,19.279440857055246,6.777696098266355,24.45465177754757,24.233050517527445,21.15087918775238,5.344652821364697,24.729450880586782,20.523330739459425,25.05443150056969,23.62163478656984,7.955694122459125,19.921608645257596,17.241101243277946,19.200083657782915,20.256767529721387,6.684578176578402,32.97476737075243,13.710631574498132,36.79942517436616,17.745213156902047,18.13803580123919,26.009486785230642,23.438497610384374,17.022772531782618,21.660159935516305,20.232495487416926,33.97363522802108,29.29917525075558,18.307612078093655,29.456591995841073,35.943191730967015,20.716386918194267,3.0934274277256613,22.23313170564343,27.612615644396364,22.178652148854873,6.026237396876235,24.834615759993802,11.728915274511635,10.52935694255309,9.574541540716716,22.303419246799297,25.96616033600338,6.761437821913097,22.27899097306213,9.245328864616136,16.091075338662577,10.433151480808952,18.92266783440441,14.074131319492768,36.14399231778431,26.35801888655047,30.06505556509584,37.76792431360789,22.475792582644964,23.644371579846116,24.47668006628058,11.40137640661493,31.86723870085948,19.237573567344644,14.721185533834383,20.373139220919192,5.198023159803453,19.887318795354822,14.145550572024051,29.35125956214592,14.247470939264172,8.827121605705504,13.907502734446684,30.448265962690403,2.7900803850891265,14.651510001628996,12.723678032989675,8.95141603372602,22.29316470807139,8.941491727774217,27.117408363994965,29.550579780329603,14.644235532331088,13.358382929728924,17.928589096853937,24.40537553178777,9.721739855655484,22.595400414540272,16.173752183583296,16.11507311319093,24.899757248950742,20.63812909111265,20.962224717386132,30.808112112388272,21.021470707891996,33.33529315333186,33.657416073576385,18.89723812243197,13.720307268817468,14.696666271671095,18.93237051566315,26.41042246628419,12.569237105909119,10.457071643357658,33.71363066691439,19.533602805521625,25.33145490284936,24.435403161794067,21.291646008445507,24.487795857455296,17.370999473635464,15.998941260172721,5.655267323951079,6.083002762356817,5.9984437968869075,12.286790807653896,23.56568210833987,9.028348595232764,7.823377075818039,25.641282344366594,22.029755204682086,16.10452011486982,23.236855581578688,29.560955528264977,10.016128128523881,34.64521338343286,19.49896377789876,11.90186241745365,18.096702637715143,18.943988545922934,22.120081729377482,16.811784086065387,25.59591904520738,27.93653632478744,17.718088561344715,16.76496709496389,4.7982491528714455,29.445873446500546,30.13877343636601,11.72973648485122,23.027381937360296,20.88480022498914,33.087101745355845,18.536978365243634,22.009807767216554,9.719585037531072,21.922183433754277,20.378182751773195,19.771690404847888,30.525161962434773,13.491239662341854,31.850616826638163,24.000161429332234,19.625230368452,18.159596624972593,32.86670458237669,17.510304450929276,10.90971361334812,20.035640923999154,32.81620283141574,8.256535159387145,27.204859852196822,9.753813755238072,19.908863803934842,22.186678465974545,5.290932631481162,4.994812981150987,26.959488208620563,24.551228907261823,17.639058268468144,27.254771647601483,32.260079179229606,16.473236739192764,26.75306883007168,10.751910574859869,18.59566410681095,17.161202952518536,18.898550370667024,12.755063139178237,24.39046206425614,28.734573942844968,17.713158113361057,19.141129084580946,8.205631780196203,14.635608817419108,23.270547794878993,24.631061278053455,14.729178845515577,15.274999857895256,23.636579076061878,21.432782225564576,22.021008607597352,20.56506324314349,22.674694143550237,22.953992028046617,31.20848610439613,10.00708078674269,22.97238406901556,6.116222825392312,14.234393483335515,23.63086506753498,18.338593780908127,23.462308766253873,13.542434403420097,35.266498056126395,29.26320519128186,20.51489268505396,22.440289122570366,5.271424893153984,29.521057238217047,35.585429209586295,24.501554551140195,21.966823453424304,21.26981369039433,23.05113563315176,24.85283560275953,13.993694592468247,8.732093820300282,23.948588207789886,12.660359036254864,31.173449356534235,14.488607529863655,29.966746077034813,3.160204811795233,3.418762774490083,29.902704620952157,10.448383270693867,30.663083189912516,23.438104452678143,17.112478632717103,23.008997600624934,21.670836487717104,20.84595931659734,18.2566623136042,33.82789062452965,12.401917975118703,18.694281927962486,29.319661746175655,28.750199933268064,22.34758538322978,23.003875153453652,33.29002754768724,17.059487549287432,28.813617873217254,39.39432858061595,16.948801254150464,14.492686663418448,8.775641165783634,9.715956205086034,21.982604076001838,16.364783272290914,17.035641791139213,4.426714578674953,19.690660106843517,15.265630002089981,14.874028525755332,21.735065886162133,36.490146338106754,13.16070439837096,23.604957129084767,18.978728661037184,16.22288493295795,15.68250012045381,27.32398090507397,27.53648747390147,30.813367241494355,17.957587688689483,8.154893604310022,20.11084900078902,18.038383011735185,13.06385101553171,12.07959830519576,29.395462544364058,27.59023149264855,26.115922128227304,27.470286124782085,30.84336442732461,22.54830549400762,23.666789549301715,20.746893174139437,13.945112780727298,19.39657730402404,31.94953992130724,37.391987842150684,30.59608105249823,34.21199377660051,25.811089573695963,14.914058231365365,13.288195055805314,33.8011982512418,14.118578122346364,9.438671214030169,12.515990621906987,12.706150185858757,20.371868203170123,22.218738071580056,25.68845091300919,10.817815557033166,30.977868086077386,3.994111480783351,37.16971099947659,22.136532628562982,0.4186451608877251,34.480358505108384,20.72842194260564,8.451362932106852,14.267618482780179,11.867026189290456,4.234337084459097,6.034823282147337,23.322422220477286,4.931291008170979,9.98391956647557,21.815573469424667,24.035309084787993,5.7274676521962675,30.140261061942116,3.7058510305743875,25.400013464630586,27.606885036007977,14.324286308154765,13.89002163503513,23.73355727615119,20.26388790349147,26.33729098407295,10.651067416361574,23.225041658691495,28.162593175814564,16.190940868976803,26.25540396874955,13.435395649851447,14.800452495904779,13.111234475567603,22.531928730310533,20.333982132749355,20.204783277610204,10.41622297440702,23.067961997670903,22.767386859006017,9.436599874082825,15.666422471718601,17.652530142679826,25.940478504285867,6.774260461904054,17.52212869062552,20.464053572176727,37.93560510149342,6.522761381441322,16.346321152870917,22.350093488826815,24.570779899498945,12.899455364900284,28.26339886879567,31.475377889725358,9.014478317763587,16.380851176409834,13.718339914907066,24.948163180117085,10.39050972675739,32.712758402472154,23.942981106778998,25.914641792074697,11.111233461191699,10.291069537522981,6.308037923762968,24.188209724228642,32.80657326980868,26.198534713220912,19.267363029213897,22.345317637572414,17.494229103619055,1.9054626062455515,25.376982922965304,19.36874007187447,12.304423334457933,12.959804892302952,21.717682697716988,19.985317940967917,7.463702503331642,26.595901723073254,33.82847376517054,24.164653407688988,6.822949334813946,31.623379646706187,24.031081933680632,23.35652408991278,11.248209936109102,13.210845870918426,16.172233720112843,20.901731473678247,9.41778178545792,12.68137499798527,18.087302513052478,24.31568033027416,11.81451299442298,25.538847522949297,35.761116725694805,30.45930452314485,18.49126545059723,19.561672274337,15.972530852315057,31.602850197737975,31.32590155624782,27.824691435037163,12.847426981906885,27.771089584391007,19.364800508358343,19.82422149488487,23.907002385725423,8.868990138498068,20.129736671803357,6.81271043095744,10.659743764582743,18.82399446639655,22.290800152627543,16.326953257936907,20.423723537682783,21.362216641650974,18.137205321837225,18.908747122700817,17.775730848605424,16.965775132572873,23.873725554120526,25.93401989729417,21.872566418398513,7.148180943535332,15.854870622948695,33.747587216100825,6.491164052488743,25.169907291666377,27.925391052431937,27.65168952468823,9.13033747548106,35.26010723186934,32.97571304891517,20.27897869139157,21.880834723850683,27.27565758853861,12.497853807824487,11.196956445519053,29.719201308453318,28.33811949738684,23.569736480787,22.25342737883089,29.569002021885794,31.123547968304326,27.41911946164462,32.44955772594097,12.911466183198677,21.01647665998276,31.1233446558557,27.97356557162027,24.930948338008992,25.89850087851,26.078524072351307,19.566441248343352,22.06801612930201,36.85440510009483,13.36684220240301,15.96639653759804,5.457692185458236,23.74956671159503,28.544369214158714,23.659364994103278,9.334664737537995,8.658114700349099,31.285657932298182,28.066557313764214,26.488518011788095,17.38027794898544,7.428839594073544,27.722652281127147,20.691427604720865,4.34481708167453,12.83481141044589,8.263087029151684,35.873413706192544,13.422476487205376,11.844566861311122,28.712650902300062,31.916047618325642,12.397379188934881,8.758677031167892,17.50067156972242,11.803189173164107,7.5249351195401415,28.561364764288307,30.51446577681175,0.9472791589051077,27.408806775649055,21.06646527399963,18.116192160086474,27.150556448714102,34.71772078674743,16.807216317473944,29.17441083087878,18.45738498530799,22.181795781606777,15.687229673799404,17.56103953223877,20.109611876519608,22.866462726453307,26.024329052053048,9.460627689107532,12.083623907111063,31.13366455672154,19.515298555552803,34.28427268142691,15.070925347290101,10.700104086816928,18.891533742619607,17.811270786352225,9.387027969717508,20.94375714429849,18.540372505828493,24.51448986685552,29.96035626806043,11.319293740165973,24.30389211151675,2.6012330470514033,28.584910516972677,32.04687334143989,14.16671216046171,34.72327991631813,4.079694223450119,26.618309043385953,0.6380365110457475,20.197522745403372,28.682929736180203,8.9571604668678,22.55186653113029,20.013004031415797,32.150765198643604,28.25828001190866,14.52176477758604,24.373386254064087,18.18575122804189,32.50016153127208,20.055776023842352,18.52680330026662,13.77541395256407,18.020711462523977,18.824119704880495,12.667909383792718,21.84034130802133,5.659559431208163,14.024953127570802,22.590794705060738,15.94030447385072,22.161558300970547,10.688089990387809,6.970277181670417,20.836347313221093,8.304897823940692,28.954086675519424,23.700308771387732,17.701388018494637,14.219109772186961,34.53713168064069,35.73059450964758,18.28557852145638,22.65936132466064,33.33037424062923,27.034395304128125,24.654278294013196,25.528639654885144,36.130639075016575,35.063481942310624,23.762024139252116,23.20161358697241,6.8056497596970145,28.94940916992487,20.951002253989422,20.672743219542934,19.322049129023135,25.147453361476963,31.326739927479107,18.598161846445116,33.169379899609595,25.596495276626978,20.03437561623044,16.770751486949035,15.635649205308303,21.47803490447054,4.497519661948917,24.789676588552084,18.250262501754733,17.302247001111624,21.15843789515218,16.627824063592353,18.586037154108226,22.892907927125968,26.160554107209887,16.096908451818003,26.634536204276124,34.904594301629544,35.40045630876243,25.63766886433679,22.454547265324926,28.157882556009127,34.44440125528543,22.641302766585262,10.978980355944232,15.243246055178592,18.179333941620833,36.649854275833526,30.328818007945756,15.797450621768949,22.84469164886108,21.194292360588886,28.999040770481326,25.740849717718383,20.42750827124469,15.785920975700453,17.725855241346505,21.59633129713145,32.72213314554964,23.54837343974969,28.21385972826744,22.19114852196965,23.884388187634986,16.808138758408727,13.434391329486072,21.461728400948097,20.156517812637986,27.23066797557342,4.008858717554986,7.184382688699542,26.42630159989448,29.206823378792013,26.990701758500535,23.4231809041731,13.646041966555945,16.40321286061952,23.83395789577084,11.681537007700403,30.4664961106361,18.567977483961723,15.6361090171559,6.640099249555456,21.848876646452837,28.34639652812439,5.408052917386246,13.804133334857621,12.750337826586794,8.029235926843912,24.9870783912663,21.15460693627329,5.307734507753823,25.7262390772774,9.876126885712479,35.60496194099254,9.474267256712485,8.381156031374681,12.727753284681413,9.018236551561802,13.962918783512105,31.53391803663809,15.679953976568658,21.751716456226255,15.352652240519017,26.954958331306674,6.721401553989148,22.518302862863962,10.806298848575292,20.872942158042335,9.35412657184957,15.25936990556507,26.317458129007655,10.804582235371157,35.55517682672541,27.735485656501467,27.904317038674286,31.18289880481465,14.042303885624765,22.934377690227663,19.872536500341678,25.680898391689656,28.327691258687928,33.8015401402377,14.84949450530371,19.679240604347996,20.08606530387421,16.827722091600226,24.577844166828967,2.9058887670585953,32.71606147071148,21.23548670315708,24.187055098937705,19.160202827292228,23.6947928383806,29.285610081232836,31.179719054426023,23.070459603811052,13.190787700942614,32.258178382802356,23.146937875581017,34.12939093948613,21.57054288675124,11.285557617690168,0.8012201624307869,7.631728960127542,24.167359261600645,19.762846751748377,17.73993375272312,17.06545825743431,7.694399214157244,34.14032401958252,6.203819859031889,28.470225996358167,7.81531622820371,21.20713972509228,9.141966108963464,14.739520237219175,34.36916796353529,12.505043231537947,18.83056596853467,22.57350842205036,3.359548805306205,31.477630271450785,8.995986285584658,26.957687029689637,30.821925051992956,21.143404334416594,31.722430255096526,10.006157956449888,8.086118171956196,20.848014355153555,21.534486696331697,23.29608504147375,21.735478146927516,18.29201112130174,35.65467989408124,13.95773829542626,28.229383753377952,19.808678048437592,6.074175385819163,11.242324313775557,31.794235011008034,20.136070937944403,14.834620075874483,11.108435237966395,32.33254642194481,11.012353633397804,22.51049992391209,13.73137036431821,23.713067387585802,10.722575792759788,31.846324291245878,19.524074853819815,8.753596273003282,26.484769328598922,7.992178326516224,22.82226265408363,30.883184668418806,23.238572015211407,14.73936048501615,19.795135752532524,22.14786264091454,21.13387575514414,25.215433132014702,2.4728403104273022,28.945318593032145,36.392072560599786,17.792536004319523,26.80612775781386,13.50059135234373,19.071571321067466,30.588209684955004,25.982773506962495,31.113139671959306,16.03280029634626,18.74090222784364,14.063702316855005,21.311586335949023,6.396855910041284,24.27641664731574],"a":[6.3867330275133805,10.62992183625349,18.57569388031328,3.134781615227049,4.184266154456413,19.9773721598105,11.958658218159655,4.8775690145313,12.264797378195723,15.236812152951117,11.1505046510407,8.947015692414983,3.428264546209596,3.7158891924128223,4.78145351562306,15.796077391779866,2.9451791127812488,13.46150226012445,17.21881497357795,16.239746132129067,10.220456409388836,2.8979215296294836,8.13373544406006,9.264792688578112,15.401405260842873,2.5472225025766093,16.350095105402566,2.2467770423733358,13.01422036933741,8.867284370902194,16.3641988664636,16.559424013645717,10.085164110719944,13.097509201497592,7.46218194869825,8.863789302322903,8.418877972953593,16.088982876695045,5.820085789064913,4.682323994639823,13.024899590825392,12.740425792171992,15.056868905376263,9.175493774494349,15.852091748629547,8.168821830682372,11.60262970325662,11.172616235959767,16.6571677718658,13.35997868150988,0.20272491561380335,8.370959210592765,9.530164683352144,8.054070277750549,3.4371336041317457,18.01788386721666,13.72017953920475,10.149489130608952,14.231936702735224,19.883445131784484,1.297892983236033,5.178049054639691,2.5728240496311594,2.6134762894866626,4.9698329427041665,19.084801397971518,18.528803643573255,16.942566576029222,19.7062591159883,10.91164486995722,3.357407112603883,16.681850038430618,18.921444362988105,11.17165248308098,1.3652414872437468,3.674970824864636,3.6315139836986887,19.83645207438085,14.939003020932336,11.687105184300988,7.67715457643829,2.430117177023172,4.45715815803811,2.262224590685862,14.628821867524309,2.8774441624771363,1.1460262934471777,1.2380135178205753,7.357987335719716,15.93735662180666,0.2806066376555494,9.887794250866895,16.403037977270756,8.479623310980294,0.5553002309618238,17.020757967141144,5.850973350539617,13.136168462580748,12.823531431085655,19.66308848612249,13.2391595828238,17.336657391756155,6.25078665196471,7.337953323915896,10.571813302853542,16.50433275618034,11.77767441719852,5.92739943114323,15.628799066047293,5.534460499485299,7.453007455573424,4.242766645014688,19.449346648416572,18.36082418193984,8.36536924499741,15.181101230699294,14.959468326517156,10.445886564543802,15.622904713414098,19.488746197266302,16.797212971929383,4.615024400608969,14.65650514490024,18.18673732200338,14.863146155641251,8.159276643168587,2.224595653242738,7.384215708993973,6.3459344453850175,1.6325413601954564,0.9614963994367143,2.9325525352768222,9.955809145651973,10.808231277344822,2.004523446963127,2.9388114736043613,1.9877873729082651,14.110345400888624,15.935447960141222,2.823896127482559,19.882414889842646,8.676446706697106,7.443506862744642,14.095116011235147,14.998015549770507,0.5746014677945022,5.231914678166958,5.597135077191959,8.778542104450295,4.201817947600257,9.380417123360601,19.00202385696781,5.337774371749622,11.52908553780792,7.260938092357212,14.594828682337045,1.4727486004724533,17.37077100141365,10.563811870813087,5.032117463620498,17.01859755756894,2.6617875791264067,18.687653660152353,4.288256572146274,9.589953619348769,5.685028335027593,2.756211465045464,0.08514122019356751,7.030490617571701,14.518106217462986,5.924005296520534,15.135672053225552,17.505426358870032,10.644419085419766,2.440544111360503,7.268960401054447,0.2798722201573245,9.412706563840679,6.243121032673038,15.586875400381942,14.08456598755738,0.47975819813127707,18.791261128889296,14.328130731123277,1.5039902355934975,14.773409703856508,7.447293894106473,16.197317353530167,18.304138792812246,9.066329572041925,18.21437256233413,7.769811266922164,19.302798814507355,14.32193153827714,9.443450551143911,16.160314036545298,1.2355831987473964,5.67176749921789,11.372020210628557,5.754752539675163,17.318268825248325,18.851766755754582,12.704017182926002,1.3347200070416454,6.6594512811786855,1.2216644813381183,2.4643630946348427,11.81424179712982,0.8470279726143826,2.33156617116125,10.250175727815778,7.818205707661141,18.54994659645874,2.5135840051026292,16.887299607917893,4.781455152112928,8.058788227001754,14.311018315993621,9.43737440694807,17.077263225463373,15.985939161787623,11.039987866631972,4.4505838885131555,7.7385244954694565,5.824946068568875,11.724890170591786,16.425169870748164,9.526250718137629,0.43589026011919607,17.570996757555445,12.392364273691769,17.04675353993572,1.7118679539459913,14.530558892914174,14.62888519114573,8.386497449730005,5.9334098793721735,7.554692679492092,13.096269890313813,10.047529370782868,0.7425287676735115,10.395469055414654,5.233764214294556,13.934770355197642,10.904609111836901,17.429636757738457,9.55363379264995,3.029887262833464,19.286170753059952,5.294256090613656,15.498740355609723,9.683743811082369,6.538113711547884,16.17511180677397,12.146458790655807,13.467151809316409,13.291612062950374,17.76873061265907,8.458417335499352,2.9573751663125503,6.69603353801703,11.911838471836877,5.150318943837084,3.006019242388085,14.557977396411111,4.4452028641419306,2.274015345103253,4.065742616971262,9.267949386268658,19.441718572013514,5.227994698344718,19.99899141244493,2.1196731410252267,15.03987983068825,6.134471864160651,16.983122067140716,2.5753815270489655,18.799671550367982,12.032264903408048,13.818218275053983,17.768227408214173,6.065920193468912,8.58568745216238,7.079769140010046,1.4339206444964647,17.94640103676666,5.490655149721815,13.645263587497851,18.254930344852514,4.529948706859721,5.082422061890832,11.528628499288352,14.258246753991513,10.554335506479271,6.451567596009085,3.885153522213969,19.56017922156893,1.504341906317621,7.035869985090537,1.9823309907626552,5.487516085457189,16.48859046202181,1.8358473148785226,17.5025938302338,19.873309846960304,0.18906051387160172,8.97494699893571,10.637090675987292,10.61270079855742,8.449388717379932,2.736667298095674,14.53756636748533,12.364532432415647,15.617258069886848,3.3216584191061793,13.413354218269472,14.119935846715554,8.843819660478477,19.486141267836285,16.743803122357612,18.37560245672298,0.40187521463700193,7.65457793651104,16.784940947587916,14.92944079112756,6.431158650620077,1.2906958713007688,16.015592533217415,1.4785472127829413,17.70939342296108,8.304947406666354,7.717694529967147,13.648767672404919,8.447648014728069,12.867460444692957,1.2850868378367553,3.880223364443016,0.08274989363549867,5.733673033974638,19.23363330621543,4.368297854948189,2.3877239813741147,11.903058071888335,5.740540394008575,2.8866624836951527,12.62701561098574,17.368253881439752,9.142455192627672,17.98690757590526,4.4756062490275195,9.818810990282106,9.033607775835385,13.653604831145,16.14660843628136,5.845517104106688,16.1891280543111,15.26087218624252,4.861000685922825,8.427921127618285,1.412696802636857,18.168219941559126,13.77880263917772,6.477090963959653,13.54465445273573,15.069558115500863,17.160198090111017,8.145318813503684,4.824174247575459,3.947578861594745,11.49315200402231,19.24381804714193,14.931329281868159,17.635029038636823,4.377617960822815,17.55815851013525,10.962377127343977,10.621149478953459,0.6928792995755817,16.029437100136356,11.338661110925056,1.3583199374367583,9.775985589113647,17.452720353600846,1.8943607799272533,11.0679650040592,2.6478144702815243,7.95911608964655,16.45596796174931,0.3366549675957087,4.372761332518378,7.7195203919229005,8.138501960662783,8.209619552560724,16.53638091466354,12.52743312234228,4.628239181695757,13.087612097372446,6.474158916195267,8.255554769238248,3.742439542754803,0.30113276807568923,6.70858097863797,5.0693531070766085,13.57649897302759,11.990258896241247,2.6240699469318463,7.684986613054967,14.033597990090275,6.443078972513598,19.493840880216066,0.08343132151718446,10.649624570493534,9.468018720697899,17.129751400089006,10.19912981269341,16.961011081871675,18.54848164486772,15.920529026757958,17.997546649906297,8.51697668559192,8.288986581892992,4.826749940340407,7.295635583499633,3.6959812397326353,0.2840373431906107,9.435993291702687,8.727664896510067,18.52218213029852,10.718597050367013,14.039333959202018,12.49644712209735,4.88565401485328,9.558460429818174,19.799173498273788,18.74546226268988,11.062003441169468,13.833922936985221,17.551552386859186,18.421494864127247,9.323403508020123,8.255976839028092,7.70809317939408,3.4201460958155083,15.487743640396614,10.788137884515177,12.779471807677618,2.2015994737262545,1.565766898157137,11.212887979015465,5.504335470933661,18.608044237514598,14.790594251715202,13.591930633122331,15.109585985745092,15.09245299503544,19.546620981392323,8.477552997063281,15.339934837340694,9.697137361150233,6.447889223200676,16.447917413019603,17.634278359526164,14.12027746268581,12.966066711504265,15.755215367302222,16.043676755649937,9.112102619787294,19.646593110262312,8.409211674486059,8.43904392454733,4.29449128191159,4.0285494700907565,19.077277711276103,3.4607626442271755,13.529457333435314,2.8417006599132,2.1717927752732225,14.734290247519542,11.331572690938296,12.463703224272095,19.52128484345316,1.9428533974542583,16.31724641233822,3.780750569868818,10.223149937739064,4.110544034380266,13.682282860235851,11.348898001354527,18.031625305653456,10.698784187056436,1.2967339446178405,19.539529390098895,16.68916116732539,0.9784504063199995,11.71999080737914,12.700013220123765,18.713552379576647,18.736854771871766,9.588855973205686,17.97522188263073,3.8714706554925415,11.434018277973323,0.79365226355955,6.908307658114383,5.032779969484182,17.409256049245442,18.10945567709213,12.774888796750808,16.240774246823634,19.691799761565342,4.498052601486213,11.577393607773425,18.837346434568822,13.590648376865055,0.8992979507160825,12.247534043421023,10.731673207584045,5.167322304794357,18.687174644153536,16.451342781470967,2.703910305395265,19.52977028536975,0.2829385474913604,18.600056214538917,17.493482896432365,0.293449879779506,18.312196403385745,7.289370395059218,0.8352350222110294,6.730561775361719,7.2840977289930775,0.1668273932501707,5.9301612833437956,15.992720386840702,3.881279427122921,5.285618472319835,5.988617918775225,4.42182262400316,3.305100516613284,14.099129961203936,0.9432960057678264,13.746923055890111,17.219271092020062,10.689813642618402,11.652746094208304,12.07312921321098,9.20095953230848,19.967178030881193,7.9923182061858355,8.215615042887944,19.295569608142774,2.8251865160327094,18.27656254741147,8.134510648382074,8.642173070910172,6.445621985043641,15.387822946198506,10.883536775624867,7.123216214845374,2.6610955099866596,11.59915667615952,11.5651890840764,4.167153838056805,2.5253471623462564,7.964551765659782,10.058147301582942,5.117431551435483,11.10500603847922,15.288788117217504,18.85018659591927,3.624566705703467,0.2325474894547419,18.94332546933038,11.420075944187857,7.762862684666794,18.455164036976903,14.729601714610862,0.6278244592256188,7.919946567088436,6.0633439713959225,7.817546675733191,3.2705838426500655,16.452641619944476,15.950674029102352,10.380413287846743,5.260068515324292,4.226244239768979,5.836114187402317,15.355025428460642,13.882855097186567,16.94635783316201,8.930407234952966,2.6441810462957616,11.289709262673128,0.3758345350922898,12.361719422390745,18.752588177758007,5.659269587396789,9.181424409317245,2.5365443990488146,2.2532486612586355,3.8988014081027433,7.197609786837664,17.24499456031127,16.897585790271677,2.554452024847591,16.237261708323846,19.156001474600046,4.231132945988398,6.778275810723291,9.98496516977073,0.3593681337613175,18.952429482708904,0.5838980233745428,12.353300372540996,15.005776245406416,7.608001418289212,6.6148915312622725,10.955105497366553,16.6409539715084,18.50380465903497,13.064652128163448,18.30952355930417,1.6683524514404668,19.10794987044444,14.325954340613855,9.635941210965427,1.6295191299270684,10.644511583932626,1.9901523116945086,17.02443115129817,8.851150197152865,8.540473328890773,2.254393750376069,0.10310247952839635,1.3859067055906804,7.799412980148581,18.321980970205622,14.448443182130717,10.46938482643261,11.425579494284154,9.737019841721072,18.634878207544844,7.002267502032962,5.026004145597449,10.672346586134346,17.472505124223332,2.2530382458083054,2.9398555116806158,6.410598888997927,15.36307586706554,0.8811877129652013,9.612114478836137,8.724372556533009,7.9131003049750115,6.124683113798208,16.66891350325386,19.897274318198743,1.9252875809595738,9.559479330635256,12.49763821338664,8.515014558977647,7.9723650592896345,14.901071896652338,12.530514552262071,16.48345833388729,3.15069492602436,15.885100570269906,16.628433328418787,13.207317322147825,18.086744621375633,11.670379889156806,19.129446223644436,11.703248402771575,16.06507968852363,19.226275425841216,15.112347693308799,7.078577071126793,12.319499011010148,3.389606300558743,17.714811603294336,1.9016301500029131,4.9246797176012125,2.0788760557212305,14.731131932234991,14.003801421756833,19.70402578674381,7.0956432128652835,1.337168630535146,12.093890999216995,11.996434262081927,10.110340622005252,16.676522121948434,3.5311921093875,17.908498508770833,10.125366325770937,1.7494043876565524,10.451627892553091,5.103791763180192,18.51538584512712,6.583666924122995,3.5931495850693906,14.623473653910315,15.075228474945582,10.317704472792236,4.812398591906901,8.780595775198394,10.97191502927625,3.0803694919792513,15.856851426729763,18.731023427322317,0.34556851335866057,9.187178878011224,4.356061907306987,5.173484283060463,13.927119320313835,18.385097609952258,1.5889684462219966,14.52975855100696,5.8043057139325915,4.951871855544927,4.793910957887668,15.684242426527572,13.778844548073828,6.259120004019687,8.112202988222252,0.9662306162195344,7.2746097186494385,15.584712524291792,17.166751393700473,16.09005902816003,4.647047936020394,7.749851850447538,3.5295760128969977,7.949582525068677,8.277140993760067,7.581612156586899,12.387676074157197,18.683910160903793,18.788429796037263,10.989251156240517,4.793025162244127,1.5552857767475015,15.75250734157105,12.856471461614403,1.6020035409511069,15.372325730094595,1.078836969541448,6.992199253027862,0.2438334371449713,4.993854895324632,17.798754969246744,5.131448207088254,7.0395731219863755,5.959870582335083,18.811102302287868,17.43972141920652,3.1824384099571157,15.613252384865493,11.425716959455045,12.996875313912879,3.8151075104700682,4.069620642402443,6.08466550609581,7.451558551845947,16.581255999233022,8.340299210053113,17.506206392180125,3.5958002821888524,6.014360388328344,5.77542221022314,11.226429562707136,12.95933698017918,7.748607753850041,5.277630579513941,4.2310223685762915,5.672175381342099,8.978333006008693,3.9471457470271165,8.200336434449525,2.0401347349662124,18.81627162809889,17.26303411256235,10.297448878782669,11.177849266303475,19.839763986864256,12.123206536893449,10.434627987356592,19.78805296938507,18.17981500432222,19.25857686513106,7.737454986854222,3.542035925766296,2.914043343062316,15.085683377322848,14.961779524685745,3.292958365664309,10.250636621936797,7.899164915777526,16.239115793980613,1.2295526688995784,17.5736801260518,6.284796854708716,12.265016920278683,15.014296542804782,6.153139185360859,17.10451071310723,3.96136587054869,8.783816871669984,9.288210197405373,0.24443737288210254,14.297615540000654,13.197650336629088,8.86420267504401,11.00334455704167,8.968237186198792,11.03387312944668,12.772183153865292,18.5558713027312,16.60446575473032,15.730245488041339,16.575441621205677,12.32230524535986,14.815687116771938,8.934678407622068,6.856019438195564,10.630224551253416,3.274403443818956,16.90602082780662,13.445492417337901,3.2383530398347515,7.95933273767047,13.487802186971827,15.808275532637719,15.440597214441869,18.187139308032915,4.171284736534484,1.3058594272062907,15.336243373191788,13.625681892377631,7.769641733987944,10.54650064076537,15.813664889897439,9.818720824389127,11.211626660748028,2.1005715918883894,13.202558638667753,8.210312910402955,15.412280337557721,1.5857625775177464,2.8649965646724107,15.150435200815174,16.6849742974216,15.751694083822949,15.270856998269672,0.0456990044758987,16.00358956686361,13.206481201641736,0.312543792735096,15.709070041119112,1.2928061676620084,11.620804866579642,6.14103897455577,4.492530470770961,16.76133228955799,3.2960715085310266,1.616114341419923,8.006599266838395,6.31240189321844,13.00957930180826,15.436918655062112,4.605582616178268,5.929713361891831,1.1763973904909708,19.685567938679714,6.072480186033995,7.071038101047806,6.597105373195986,1.1400045419184535,12.394609836421298,19.26187495689049,9.328456815457006,19.32798240351953,8.876588834004608,14.818950367949949,5.5270694748253835,11.013741993852202,0.7751722760854518,8.618912679453752,3.93136897362937,13.579396380377414,18.501934836083418,5.620564323860795,19.15976308308089,14.441588399521411,18.546081088757518,11.270374978800298,1.563629568629592,12.814609481288404,16.217490991146057,8.966905036971408,13.093279542355848,14.948576478429132,8.689777668325647,6.3129543458479365,16.372608847720606,5.513567141851263,8.130747434623927,1.7404738060098124,15.885869185854599,16.40857301243606,15.254531870278276,4.74324236240407,12.358893271583709,12.147786066632499,13.578131641747566,10.283351963487956,11.622694140022404,13.70718114517356,4.149856132696779,17.13549109867909,8.031972909381665,9.093307241970457,0.55696061441874,2.4824557496007404,14.372438883895544,3.8647502117224164,14.597680969352007,14.133919841351194,1.8259528793080992,14.203485604249074,3.2562975647545755,12.5298079659773,3.0852930439603155,11.745588966389832,5.421180378112265,7.393430127065788,15.31855576591985,8.831114735163744,6.690942028819338,6.167949661936127,0.09365191780589033,19.175511097396395,4.898574313933524,18.090091298082413,17.33343717681006,14.659972703415782,13.372346301685894,0.7265832421580143,5.834915128466935,7.748330534986234,2.7871712831987683,4.898001579620481,14.541500959007054,0.38398905962838903,16.540059141728143,2.3375143812260957,9.178647055468376,17.31551018921082,3.5117660639020176,1.22905176253437,13.76940000442675,13.538741155987331,4.483956898515746,1.2563114350514315,18.942000286308605,2.8248087651043807,6.670795617212075,0.6987391089935135,8.553347275724938,6.61707330039333,19.174697113301214,17.990915303202332,5.437366546764331,18.496034379566556,6.350253638552998,15.795825729882345,14.450668973596223,7.6362723655986775,10.127803755707792,19.57122611958072,6.08263206873791,11.54654782795188,10.650191929357028,1.2967344081438892,17.49691623885088,19.86272517775224,1.1526014893115466,15.709093702316324,2.737625718373229,13.24529808166985,12.894886898983593,16.57018492329028,15.553926159243257,5.280747500590897,2.0735604015886633,2.856219380696343,5.235360040422465,4.795581655915111,5.398312967520766]}

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

tape( 'if provided a valid `a` and `b`, the function returns a function which returns `-Infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.5, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a valid `a` and `b`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.5, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `a >= b`, the created function always returns `NaN`', function test( t ) {
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

tape( 'the created function evaluates the logpdf for `x` given small range `b - a`', function test( t ) {
	var expected;
	var logpdf;
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
		logpdf = factory( a[i], b[i] );
		y = logpdf( x[i] );
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

tape( 'the created function evaluates the logpdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var logpdf;
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
		logpdf = factory( a[i], b[i] );
		y = logpdf( x[i] );
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

tape( 'the created function evaluates the logpdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var logpdf;
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
		logpdf = factory( a[i], b[i] );
		y = logpdf( x[i] );
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/logpdf/test/test.factory.js")
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/logpdf/test/test.js")
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
var logpdf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


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

tape( 'if provided `+infinity` for `x` and a finite `a` and `b`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `a` and `b`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given a small range `b - a`', function test( t ) {
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
		y = logpdf( x[i], a[i], b[i] );
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

tape( 'the function evaluates the logpdf for `x` given a medium range `b - a`', function test( t ) {
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
		y = logpdf( x[i], a[i], b[i] );
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

tape( 'the function evaluates the logpdf for `x` given a large range `b - a`', function test( t ) {
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
		y = logpdf( x[i], a[i], b[i] );
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/logpdf/test/test.logpdf.js")
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
