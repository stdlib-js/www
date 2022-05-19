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

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './float64array.js' );
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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":14}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var builtin = require( './uint16array.js' );
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/assert/has-uint16array-support":22}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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
var builtin = require( './uint32array.js' );
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/assert/has-uint32array-support":25}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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
var builtin = require( './uint8array.js' );
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/assert/has-uint8array-support":28}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

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

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

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

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

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

},{"@stdlib/utils/native-class":84}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":84}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":84}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":84}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":76}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isnan = require( './main.js' );


// EXPORTS //

module.exports = isnan;

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
* Test if a double-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './main.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./main.js":52}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/float64/pinf":45}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var abs = require( './main.js' );


// EXPORTS //

module.exports = abs;

},{"./main.js":54}],54:[function(require,module,exports){
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
*
*
* ## Notice
*
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/detail/erf_inv.hpp}. This implementation follows the original, but has been modified for JavaScript.
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var rationalFcnR1 = require( './rational_p1q1.js' );
var rationalFcnR2 = require( './rational_p2q2.js' );
var rationalFcnR3 = require( './rational_p3q3.js' );
var rationalFcnR4 = require( './rational_p4q4.js' );
var rationalFcnR5 = require( './rational_p5q5.js' );


// VARIABLES //

var Y1 = 8.91314744949340820313e-2;
var Y2 = 2.249481201171875;
var Y3 = 8.07220458984375e-1;
var Y4 = 9.3995571136474609375e-1;
var Y5 = 9.8362827301025390625e-1;


// MAIN //

/**
* Evaluates the inverse complementary error function.
*
* Note that
*
* ```tex
* \operatorname{erfc^{-1}}(1-z) = \operatorname{erf^{-1}}(z)
* ```
*
* ## Method
*
* 1.  For \\(|x| \leq 0.5\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = x(x+10)(\mathrm{Y} + \operatorname{R}(x))
*     ```
*
*     where \\(Y\\) is a constant and \\(\operatorname{R}(x)\\) is optimized for a low absolute error compared to \\(|Y|\\).
*
*     <!-- <note> -->
*
*     Max error \\(2.001849\mbox{e-}18\\). Maximum deviation found (error term at infinite precision) \\(8.030\mbox{e-}21\\).
*
*     <!-- </note> -->
*
* 2.  For \\(0.5 > 1-|x| \geq 0\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}} = \frac{\sqrt{-2 \cdot \ln(1-x)}}{\mathrm{Y} + \operatorname{R}(1-x)}
*     ```
*
*     where \\(Y\\) is a constant, and \\(\operatorname{R}(q)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Max error \\(7.403372\mbox{e-}17\\). Maximum deviation found (error term at infinite precision) \\(4.811\mbox{e-}20\\).
*
*     <!-- </note> -->
*
* 3.  For \\(1-|x| < 0.25\\), we have a series of rational approximations all of the general form
*
*     ```tex
*     p = \sqrt{-\ln(1-x)}
*     ```
*
*     Accordingly, the result is given by
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = p(\mathrm{Y} + \operatorname{R}(p-B))
*     ```
*
*     where \\(Y\\) is a constant, \\(B\\) is the lowest value of \\(p\\) for which the approximation is valid, and \\(\operatorname{R}(x-B)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Almost all code will only go through the first or maybe second approximation.  After that we are dealing with very small input values.
*
*     -   If \\(p < 3\\), max error \\(1.089051\mbox{e-}20\\).
*     -   If \\(p < 6\\), max error \\(8.389174\mbox{e-}21\\).
*     -   If \\(p < 18\\), max error \\(1.481312\mbox{e-}19\\).
*     -   If \\(p < 44\\), max error \\(5.697761\mbox{e-}20\\).
*     -   If \\(p \geq 44\\), max error \\(1.279746\mbox{e-}20\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     The Boost library can accommodate \\(80\\) and \\(128\\) bit long doubles. JavaScript only supports a \\(64\\) bit double (IEEE 754). Accordingly, the smallest \\(p\\) (in JavaScript at the time of this writing) is \\(\sqrt{-\ln(\sim5\mbox{e-}324)} = 27.284429111150214\\).
*
*     <!-- </note> -->
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfcinv( 0.5 );
* // returns ~0.4769
*
* @example
* var y = erfcinv( 0.8 );
* // returns ~0.1791
*
* @example
* var y = erfcinv( 0.0 );
* // returns Infinity
*
* @example
* var y = erfcinv( 2.0 );
* // returns -Infinity
*
* @example
* var y = erfcinv( NaN );
* // returns NaN
*/
function erfcinv( x ) {
	var sign;
	var qs;
	var q;
	var g;
	var r;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	// Special case: 2
	if ( x === 2.0 ) {
		return NINF;
	}
	// Special case: 1
	if ( x === 1.0 ) {
		return 0.0;
	}
	if ( x > 2.0 || x < 0.0 ) {
		return NaN;
	}
	// Argument reduction (reduce to interval [0,1]). If `x` is outside [0,1], we can take advantage of the complementary error function reflection formula: `erfc(-z) = 2 - erfc(z)`, by negating the result once finished.
	if ( x > 1.0 ) {
		sign = -1.0;
		q = 2.0 - x;
	} else {
		sign = 1.0;
		q = x;
	}
	x = 1.0 - q;

	// x = 1-q <= 0.5
	if ( x <= 0.5 ) {
		g = x * ( x + 10.0 );
		r = rationalFcnR1( x );
		return sign * ( (g*Y1) + (g*r) );
	}
	// q >= 0.25
	if ( q >= 0.25 ) {
		g = sqrt( -2.0 * ln(q) );
		q -= 0.25;
		r = rationalFcnR2( q );
		return sign * ( g / (Y2+r) );
	}
	q = sqrt( -ln( q ) );

	// q < 3
	if ( q < 3.0 ) {
		qs = q - 1.125;
		r = rationalFcnR3( qs );
		return sign * ( (Y3*q) + (r*q) );
	}
	// q < 6
	if ( q < 6.0 ) {
		qs = q - 3.0;
		r = rationalFcnR4( qs );
		return sign * ( (Y4*q) + (r*q) );
	}
	// q < 18
	qs = q - 6.0;
	r = rationalFcnR5( qs );
	return sign * ( (Y5*q) + (r*q) );
}


// EXPORTS //

module.exports = erfcinv;

},{"./rational_p1q1.js":57,"./rational_p2q2.js":58,"./rational_p3q3.js":59,"./rational_p4q4.js":60,"./rational_p5q5.js":61,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/ln":70,"@stdlib/math/base/special/sqrt":74}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the inverse complementary error function.
*
* @module @stdlib/math/base/special/erfcinv
*
* @example
* var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
*
* var y = erfcinv( 0.5 );
* // returns ~0.4769
*
* y = erfcinv( 0.8 );
* // returns ~-0.1791
*
* y = erfcinv( 0.0 );
* // returns Infinity
*
* y = erfcinv( 2.0 );
* // returns -Infinity
*
* y = erfcinv( NaN );
* // returns NaN
*/

// MODULES //

var erfcinv = require( './erfcinv.js' );


// EXPORTS //

module.exports = erfcinv;

},{"./erfcinv.js":55}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
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
		return -0.0005087819496582806;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0005087819496582806 + (x * (-0.008368748197417368 + (x * (0.03348066254097446 + (x * (-0.012692614766297404 + (x * (-0.03656379714117627 + (x * (0.02198786811111689 + (x * (0.008226878746769157 + (x * (-0.005387729650712429 + (x * (0.0 + (x * 0.0))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-0.9700050433032906 + (x * (-1.5657455823417585 + (x * (1.5622155839842302 + (x * (0.662328840472003 + (x * (-0.7122890234154284 + (x * (-0.05273963823400997 + (x * (0.07952836873415717 + (x * (-0.0023339375937419 + (x * 0.0008862163904564247))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0 + (x * (-0.005387729650712429 + (x * (0.008226878746769157 + (x * (0.02198786811111689 + (x * (-0.03656379714117627 + (x * (-0.012692614766297404 + (x * (0.03348066254097446 + (x * (-0.008368748197417368 + (x * -0.0005087819496582806))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0008862163904564247 + (x * (-0.0023339375937419 + (x * (0.07952836873415717 + (x * (-0.05273963823400997 + (x * (-0.7122890234154284 + (x * (0.662328840472003 + (x * (1.5622155839842302 + (x * (-1.5657455823417585 + (x * (-0.9700050433032906 + (x * 1.0))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
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
		return -0.20243350835593876;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.20243350835593876 + (x * (0.10526468069939171 + (x * (8.3705032834312 + (x * (17.644729840837403 + (x * (-18.851064805871424 + (x * (-44.6382324441787 + (x * (17.445385985570866 + (x * (21.12946554483405 + (x * -3.6719225470772936))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (6.242641248542475 + (x * (3.971343795334387 + (x * (-28.66081804998 + (x * (-20.14326346804852 + (x * (48.560921310873994 + (x * (10.826866735546016 + (x * (-22.643693341313973 + (x * 1.7211476576120028))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -3.6719225470772936 + (x * (21.12946554483405 + (x * (17.445385985570866 + (x * (-44.6382324441787 + (x * (-18.851064805871424 + (x * (17.644729840837403 + (x * (8.3705032834312 + (x * (0.10526468069939171 + (x * -0.20243350835593876))))))))))))))); // eslint-disable-line max-len
		s2 = 1.7211476576120028 + (x * (-22.643693341313973 + (x * (10.826866735546016 + (x * (48.560921310873994 + (x * (-20.14326346804852 + (x * (-28.66081804998 + (x * (3.971343795334387 + (x * (6.242641248542475 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
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
		return -0.1311027816799519;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.1311027816799519 + (x * (-0.16379404719331705 + (x * (0.11703015634199525 + (x * (0.38707973897260434 + (x * (0.3377855389120359 + (x * (0.14286953440815717 + (x * (0.029015791000532906 + (x * (0.0021455899538880526 + (x * (-6.794655751811263e-7 + (x * (2.8522533178221704e-8 + (x * -6.81149956853777e-10))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (3.4662540724256723 + (x * (5.381683457070069 + (x * (4.778465929458438 + (x * (2.5930192162362027 + (x * (0.848854343457902 + (x * (0.15226433829533179 + (x * (0.011059242293464892 + (x * (0.0 + (x * (0.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -6.81149956853777e-10 + (x * (2.8522533178221704e-8 + (x * (-6.794655751811263e-7 + (x * (0.0021455899538880526 + (x * (0.029015791000532906 + (x * (0.14286953440815717 + (x * (0.3377855389120359 + (x * (0.38707973897260434 + (x * (0.11703015634199525 + (x * (-0.16379404719331705 + (x * -0.1311027816799519))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.0 + (x * (0.011059242293464892 + (x * (0.15226433829533179 + (x * (0.848854343457902 + (x * (2.5930192162362027 + (x * (4.778465929458438 + (x * (5.381683457070069 + (x * (3.4662540724256723 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
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
		return -0.0350353787183178;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0350353787183178 + (x * (-0.0022242652921344794 + (x * (0.018557330651423107 + (x * (0.009508047013259196 + (x * (0.0018712349281955923 + (x * (0.00015754461742496055 + (x * (0.00000460469890584318 + (x * (-2.304047769118826e-10 + (x * 2.6633922742578204e-12))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (1.3653349817554064 + (x * (0.7620591645536234 + (x * (0.22009110576413124 + (x * (0.03415891436709477 + (x * (0.00263861676657016 + (x * (0.00007646752923027944 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 2.6633922742578204e-12 + (x * (-2.304047769118826e-10 + (x * (0.00000460469890584318 + (x * (0.00015754461742496055 + (x * (0.0018712349281955923 + (x * (0.009508047013259196 + (x * (0.018557330651423107 + (x * (-0.0022242652921344794 + (x * -0.0350353787183178))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.00007646752923027944 + (x * (0.00263861676657016 + (x * (0.03415891436709477 + (x * (0.22009110576413124 + (x * (0.7620591645536234 + (x * (1.3653349817554064 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
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
		return -0.016743100507663373;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.016743100507663373 + (x * (-0.0011295143874558028 + (x * (0.001056288621524929 + (x * (0.00020938631748758808 + (x * (0.000014962478375834237 + (x * (4.4969678992770644e-7 + (x * (4.625961635228786e-9 + (x * (-2.811287356288318e-14 + (x * 9.905570997331033e-17))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.5914293448864175 + (x * (0.1381518657490833 + (x * (0.016074608709367652 + (x * (0.0009640118070051656 + (x * (0.000027533547476472603 + (x * (2.82243172016108e-7 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 9.905570997331033e-17 + (x * (-2.811287356288318e-14 + (x * (4.625961635228786e-9 + (x * (4.4969678992770644e-7 + (x * (0.000014962478375834237 + (x * (0.00020938631748758808 + (x * (0.001056288621524929 + (x * (-0.0011295143874558028 + (x * -0.016743100507663373))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (2.82243172016108e-7 + (x * (0.000027533547476472603 + (x * (0.0009640118070051656 + (x * (0.016074608709367652 + (x * (0.1381518657490833 + (x * (0.5914293448864175 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],62:[function(require,module,exports){
module.exports={"expected":[2.6297417762102766,2.3966279587764134,2.2900320985325897,2.2188091258695533,2.1647982898770812,2.1210644069520743,2.0841931639998585,2.0522436451785886,2.0240037715256185,1.998664440077227,1.9756579209741327,1.9545700890679394,1.9350893298670508,1.9169751168928737,1.9000378058568077,1.8841251523072429,1.8691130306211263,1.8548988724815862,1.8413969197069877,1.828534719763203,1.8162504922343428,1.8044911182729035,1.7932105838063153,1.7823687586587735,1.7719304280217876,1.7618645160308972,1.7521434573674632,1.7427426841883664,1.7336402038263374,1.7248162486046317,1.716252983442141,1.7079342601432537,1.6998454096833948,1.6919730656342287,1.684305013276031,1.6768300600288477,1.6695379236782921,1.662419135534455,1.6554649561861088,1.648667301929281,1.6420186802831778,1.6355121332754983,1.6291411873973858,1.6228998093059321,1.6167823664978518,1.610783592297787,1.6048985546038814,1.599122627915647,1.5934514682378635,1.587880990511862,1.5824073482739485,1.5770269152816112,1.5717362688827938,1.5665321749329428,1.5614115740896473,1.5563715693361835,1.5514094146036699,1.546522504377456,1.5417083641869906,1.5369646418903355,1.5322890996746974,1.527679606703345,1.5231341323470466,1.5186507399449722,1.5142275810459904,1.509862890086513,1.5055549794656478,1.50130223498249,1.4971031116039675,1.492956129534822,1.488859870564133,1.4848129746652905,1.480814136828538,1.4768621041071903,1.472955672860426,1.469093686177095,1.4652750314664256,1.4614986382027966,1.4577634758128415,1.4540685516942318,1.4504129093563545,1.4467956266740012,1.4432158142458562,1.4396726138503504,1.4361651969919622,1.4326927635317048,1.4292545403959658,1.4258497803583794,1.422477760889818,1.4191377830719478,1.415829170570191,1.4125512686622046,1.4093034433183151,1.4060850803305949,1.4028955844875104,1.399734378791314,1.3966009037155258,1.3934946165000701,1.3904149904817862,1.3873615144581974,1.3843336920825662,1.3813310412884088,1.3783530937417505,1.3753993943195326,1.3724695006126775,1.3695629824524251,1.3666794214586413,1.3638184106088787,1.3609795538270513,1.3581624655906692,1.3553667705556167,1.3525921031975523,1.349838107469048,1.3471044364716387,1.3443907521420149,1.341696724951625,1.3390220336190073,1.3363663648342012,1.3337294129946464,1.3311108799519726,1.328510474769176,1.3259279134876414,1.3233629189035625,1.32081522035328,1.3182845535071375,1.3157706601714283,1.3132732880980866,1.3107921908017064,1.3083271273836148,1.3058778623626333,1.30344416551223,1.3010258117037876,1.2986225807556968,1.2962342572880268,1.2938606305825213,1.2915014944476901,1.2891566470887728,1.286825890982361,1.2845090327554893,1.2822058830689886,1.279916256504944,1.2776399714580595,1.2753768500307894,1.2731267179320644,1.2708894043794776,1.2686647420047763,1.2664525667625364,1.2642527178418874,1.2620650375811635,1.2598893713853692,1.2577255676463455,1.2555734776655332,1.2534329555792283,1.251303858286238,1.249186045377842,1.2470793790699721,1.2449837241375272,1.2428989478507393,1.2408249199135186,1.2387615124037026,1.2367085997151355,1.2346660585015174,1.2326337676219496,1.230611608088125,1.2285994630130948,1.2265972175615618,1.2246047589016413,1.2226219761580412,1.2206487603666099,1.2186850044302007,1.2167306030758156,1.2147854528129753,1.212849451893277,1.210922500271102,1.2090044995654272,1.2070953530227104,1.205194965480811,1.2033032433339081,1.201420094498387,1.1995454283796607,1.1976791558398963,1.1958211891666144,1.1939714420421381,1.1921298295138576,1.1902962679652893,1.188470675087902,1.186652969853688,1.1848430724884493,1.183040904445786,1.1812463883817554,1.1794594481301899,1.1776800086786432,1.175907996144956,1.1741433377544153,1.1723859618174892,1.1706357977081268,1.1688927758425942,1.1671568276588453,1.165427885596396,1.163705883076699,1.161990754484,1.1602824351466579,1.1585808613189208,1.1568859701631427,1.1551976997324247,1.1535159889536764,1.1518407776110746,1.1501720063299192,1.148509616560864,1.1468535505645263,1.1452037513964433,1.1435601628923922,1.1419227296540368,1.1402913970349147,1.1386661111267387,1.1370468187460143,1.1354334674209592,1.1338260053787197,1.132224381532874,1.1306285454712133,1.1290384474437989,1.1274540383512817,1.12587526973348,1.1243020937582093,1.1227344632103544,1.121172331481183,1.1196156525578886,1.1180643810133573,1.1165184719961618,1.1149778812207611,1.1134425649579132,1.1119124800252933,1.1103875837783037,1.108867834101086,1.1073531893977115,1.105843608583565,1.1043390510769002,1.1028394767905731,1.1013448461239457,1.0998551199549542,1.0983702596323408,1.096890226968042,1.0954149842297327,1.093944494133519,1.0924787198367782,1.0910176249311432,1.0895611734356248,1.088109329789873,1.0866620588475662,1.0852193258699394,1.0837810965194299,1.0823473368534517,1.0809180133182923,1.079493092743124,1.078072542334133,1.0766563296687606,1.0752444226900557,1.0738367897011327,1.0724333993597372,1.0710342206729129,1.0696392229917695,1.068248376006348,1.0668616497405843,1.0654790145473632,1.064100441103668,1.0627259004058163,1.0613553637647855,1.059988802801623,1.0586261894429438,1.0572674959165027,1.0559126947468547,1.0545617587510887,1.0532146610346422,1.051871374987185,1.0505318742785839,1.0491961328549326,1.0478641249346574,1.0465358250046872,1.0452112078166955,1.0438902483834045,1.0425729219749547,1.041259204115341,1.0399490705789056,1.0386424973868966,1.03733946080408,1.0360399373354177,1.0347439037227943,1.0334513369418068,1.032162214198603,1.0308765129267776,1.029594210784319,1.0283152856506081,1.0270397156234656,1.0257674790162525,1.024498554355013,1.023232920375673,1.0219705560212768,1.020711440439273,1.0194555529788467,1.0182028731882917,1.0169533808124294,1.0157070557900656,1.0144638782514916,1.0132238285160244,1.0119868870895885,1.0107530346623326,1.0095222521062872,1.0082945204730607,1.0070698209915676,1.0058481350657986,1.0046294442726214,1.0034137303596171,1.0022009752429524,1.0009911610052822,0.9997842698936883,0.9985802843176459,0.9973791868470271,0.9961809602101297,0.9949855872917388,0.9937930511312201,0.9926033349206376,0.991416422002905,0.9902322958699625,0.9890509401609808,0.9878723386605952,0.9866964752971609,0.985523334141041,0.9843528994029158,0.9831851554321187,0.9820200867149956,0.9808576778732916,0.9796979136625579,0.9785407789705851,0.9773862588158584,0.9762343383460335,0.9750850028364408,0.9739382376886012,0.9727940284287765,0.9716523607065267,0.9705132202933026,0.9693765930810444,0.9682424650808124,0.9671108224214293,0.9659816513481456,0.9648549382213242,0.9637306695151415,0.9626088318163075,0.961489411822806,0.9603723963426495,0.9592577722926546,0.9581455266972309,0.9570356466871911,0.9559281194985733,0.9548229324714833,0.9537200730489506,0.9526195287757999,0.9515212872975427,0.9504253363592743,0.9493316638045991,0.9482402575745573,0.9471511057065767,0.9460641963334329,0.9449795176822239,0.9438970580733617,0.9428168059195737,0.9417387497249217,0.9406628780838273,0.939589179680119,0.9385176432860849,0.9374482577615411,0.9363810120529119,0.9353158951923228,0.9342528962967033,0.9331920045669045,0.9321332092868245,0.9310764998225508,0.9300218656215054,0.9289692962116121,0.9279187812004621,0.9268703102745032,0.9258238731982261,0.9247794598133754,0.9237370600381561,0.9226966638664633,0.9216582613671126,0.920621842683085,0.9195873980307783,0.918554917699272,0.9175243920495976,0.9164958115140188,0.9154691665953227,0.91444444786612,0.9134216459681485,0.9124007516115927,0.9113817555744081,0.9103646487016531,0.9093494219048307,0.9083360661612383,0.907324572513325,0.9063149320680562,0.9053071359962888,0.9043011755321483,0.9032970419724206,0.9022947266759439,0.9012942210630168,0.9002955166148037,0.8992986048727541,0.8983034774380271,0.8973101259709214,0.896318542190315,0.8953287178731082,0.8943406448536761,0.8933543150233262,0.8923697203297616,0.8913868527765527,0.8904057044226141,0.8894262673816863,0.8884485338218262,0.8874724959649012,0.8864981460860897,0.8855254765133889,0.8845544796271272,0.8835851478594812,0.8826174736939995,0.8816514496651331,0.8806870683577688,0.8797243224067687,0.8787632044965178,0.8778037073604711,0.8768458237807114,0.8758895465875086,0.8749348686588866,0.8739817829201914,0.8730302823436692,0.872080359948045,0.8711320087981068,0.8701852220042962,0.8692399927223023,0.8682963141526603,0.8673541795403534,0.8664135821744214,0.865474515387573,0.8645369725558008,0.8636009470980007,0.8626664324756009,0.8617334221921837,0.8608019097931255,0.8598718888652269,0.8589433530363584,0.8580162959751024,0.857090711390403,0.856166593031216,0.855243934686169,0.8543227301832165,0.8534029733893074,0.8524846582100492,0.8515677785893798,0.8506523285092414,0.8497383019892594,0.8488256930864198,0.8479144958947585,0.8470047045450446,0.8460963132044749,0.8451893160763672,0.8442837073998551,0.8433794814495946,0.8424766325354618,0.841575155002264,0.8406750432294476,0.8397762916308126,0.8388788946542278,0.8379828467813495,0.8370881425273448,0.8361947764406146,0.835302743102522,0.8344120371271241,0.8335226531609019,0.8326345858825003,0.8317478300024626,0.8308623802629754,0.8299782314376102,0.8290953783310703,0.8282138157789413,0.8273335386474409,0.8264545418331734,0.8255768202628878,0.8247003688932352,0.8238251827105308,0.8229512567305188,0.822078585998136,0.8212071655872835,0.8203369906005947,0.8194680561692114,0.8186003574525569,0.8177338896381142,0.8168686479412066,0.8160046276047781,0.8151418238991791,0.8142802321219516,0.8134198475976185],"x":[0.0002,0.0007006012024048096,0.0012012024048096192,0.001701803607214429,0.0022024048096192387,0.002703006012024048,0.0032036072144288577,0.0037042084168336675,0.004204809619238477,0.0047054108216432865,0.005206012024048096,0.005706613226452906,0.006207214428857716,0.006707815631262525,0.007208416833667334,0.007709018036072144,0.008209619238476953,0.008710220440881763,0.009210821643286573,0.009711422845691382,0.010212024048096192,0.010712625250501002,0.011213226452905812,0.011713827655310621,0.012214428857715431,0.01271503006012024,0.01321563126252505,0.01371623246492986,0.01421683366733467,0.01471743486973948,0.015218036072144288,0.0157186372745491,0.016219238476953907,0.01671983967935872,0.017220440881763527,0.01772104208416834,0.018221643286573146,0.018722244488977954,0.019222845691382766,0.019723446893787574,0.020224048096192385,0.020724649298597193,0.021225250501002005,0.021725851703406813,0.022226452905811624,0.022727054108216432,0.023227655310621244,0.023728256513026052,0.024228857715430863,0.02472945891783567,0.02523006012024048,0.02573066132264529,0.0262312625250501,0.02673186372745491,0.02723246492985972,0.02773306613226453,0.028233667334669338,0.02873426853707415,0.029234869739478957,0.02973547094188377,0.030236072144288577,0.03073667334669339,0.031237274549098196,0.031737875751503004,0.032238476953907816,0.03273907815631263,0.03323967935871743,0.03374028056112224,0.034240881763527055,0.034741482965931866,0.03524208416833667,0.03574268537074148,0.036243286573146294,0.036743887775551105,0.03724448897795591,0.03774509018036072,0.03824569138276553,0.03874629258517034,0.03924689378757515,0.03974749498997996,0.04024809619238477,0.040748697394789576,0.04124929859719439,0.0417498997995992,0.04225050100200401,0.042751102204408815,0.04325170340681363,0.04375230460921844,0.04425290581162325,0.044753507014028054,0.045254108216432866,0.04575470941883768,0.04625531062124248,0.04675591182364729,0.047256513026052105,0.047757114228456916,0.04825771543086172,0.04875831663326653,0.049258917835671344,0.049759519038076155,0.05026012024048096,0.05076072144288577,0.05126132264529058,0.05176192384769539,0.0522625250501002,0.05276312625250501,0.05326372745490982,0.053764328657314626,0.05426492985971944,0.05476553106212425,0.05526613226452906,0.055766733466933865,0.05626733466933868,0.05676793587174349,0.0572685370741483,0.057769138276553104,0.058269739478957916,0.05877034068136273,0.05927094188376753,0.05977154308617234,0.060272144288577155,0.060772745490981966,0.06127334669338677,0.06177394789579158,0.062274549098196394,0.0627751503006012,0.06327575150300602,0.06377635270541082,0.06427695390781563,0.06477755511022044,0.06527815631262525,0.06577875751503005,0.06627935871743487,0.06677995991983968,0.0672805611222445,0.0677811623246493,0.0682817635270541,0.06878236472945892,0.06928296593186373,0.06978356713426853,0.07028416833667335,0.07078476953907815,0.07128537074148296,0.07178597194388778,0.07228657314629258,0.0727871743486974,0.0732877755511022,0.07378837675350701,0.07428897795591183,0.07478957915831663,0.07529018036072144,0.07579078156312626,0.07629138276553106,0.07679198396793588,0.07729258517034068,0.07779318637274549,0.0782937875751503,0.07879438877755511,0.07929498997995992,0.07979559118236473,0.08029619238476954,0.08079679358717434,0.08129739478957916,0.08179799599198397,0.08229859719438878,0.08279919839679359,0.08329979959919839,0.08380040080160321,0.08430100200400802,0.08480160320641282,0.08530220440881764,0.08580280561122244,0.08630340681362725,0.08680400801603207,0.08730460921843687,0.08780521042084169,0.0883058116232465,0.0888064128256513,0.08930701402805612,0.08980761523046092,0.09030821643286573,0.09080881763527054,0.09130941883767535,0.09181002004008015,0.09231062124248497,0.09281122244488978,0.0933118236472946,0.0938124248496994,0.0943130260521042,0.09481362725450902,0.09531422845691383,0.09581482965931863,0.09631543086172345,0.09681603206412825,0.09731663326653307,0.09781723446893788,0.09831783567134268,0.0988184368737475,0.0993190380761523,0.09981963927855711,0.10032024048096193,0.10082084168336673,0.10132144288577154,0.10182204408817636,0.10232264529058116,0.10282324649298598,0.10332384769539078,0.10382444889779559,0.1043250501002004,0.10482565130260521,0.10532625250501002,0.10582685370741483,0.10632745490981964,0.10682805611222444,0.10732865731462926,0.10782925851703407,0.10832985971943888,0.10883046092184369,0.1093310621242485,0.10983166332665331,0.11033226452905812,0.11083286573146292,0.11133346693386774,0.11183406813627254,0.11233466933867735,0.11283527054108217,0.11333587174348697,0.11383647294589179,0.1143370741482966,0.1148376753507014,0.11533827655310622,0.11583887775551102,0.11633947895791583,0.11684008016032064,0.11734068136272545,0.11784128256513025,0.11834188376753507,0.11884248496993988,0.1193430861723447,0.1198436873747495,0.1203442885771543,0.12084488977955912,0.12134549098196393,0.12184609218436873,0.12234669338677355,0.12284729458917835,0.12334789579158317,0.12384849699398798,0.12434909819639278,0.1248496993987976,0.1253503006012024,0.12585090180360722,0.12635150300601203,0.12685210420841683,0.12735270541082164,0.12785330661322644,0.12835390781563127,0.12885450901803608,0.12935511022044088,0.1298557114228457,0.1303563126252505,0.1308569138276553,0.13135751503006013,0.13185811623246493,0.13235871743486974,0.13285931863727454,0.13335991983967935,0.13386052104208418,0.13436112224448898,0.1348617234468938,0.1353623246492986,0.1358629258517034,0.13636352705410823,0.13686412825651303,0.13736472945891784,0.13786533066132264,0.13836593186372745,0.13886653306613225,0.13936713426853709,0.1398677354709419,0.1403683366733467,0.1408689378757515,0.1413695390781563,0.14187014028056114,0.14237074148296594,0.14287134268537074,0.14337194388777555,0.14387254509018035,0.14437314629258516,0.14487374749499,0.1453743486973948,0.1458749498997996,0.1463755511022044,0.1468761523046092,0.14737675350701404,0.14787735470941885,0.14837795591182365,0.14887855711422845,0.14937915831663326,0.14987975951903806,0.1503803607214429,0.1508809619238477,0.1513815631262525,0.1518821643286573,0.15238276553106211,0.15288336673346695,0.15338396793587175,0.15388456913827656,0.15438517034068136,0.15488577154308616,0.15538637274549097,0.1558869739478958,0.1563875751503006,0.1568881763527054,0.15738877755511022,0.15788937875751502,0.15838997995991985,0.15889058116232466,0.15939118236472946,0.15989178356713427,0.16039238476953907,0.16089298597194387,0.1613935871743487,0.1618941883767535,0.16239478957915832,0.16289539078156312,0.16339599198396793,0.16389659318637276,0.16439719438877756,0.16489779559118237,0.16539839679358717,0.16589899799599198,0.16639959919839678,0.1669002004008016,0.16740080160320642,0.16790140280561122,0.16840200400801603,0.16890260521042083,0.16940320641282566,0.16990380761523047,0.17040440881763527,0.17090501002004008,0.17140561122244488,0.17190621242484969,0.17240681362725452,0.17290741482965932,0.17340801603206413,0.17390861723446893,0.17440921843687374,0.17490981963927857,0.17541042084168337,0.17591102204408818,0.17641162324649298,0.1769122244488978,0.1774128256513026,0.17791342685370742,0.17841402805611223,0.17891462925851703,0.17941523046092184,0.17991583166332664,0.18041643286573147,0.18091703406813628,0.18141763527054108,0.1819182364729459,0.1824188376753507,0.18291943887775552,0.18342004008016033,0.18392064128256513,0.18442124248496994,0.18492184368737474,0.18542244488977955,0.18592304609218438,0.18642364729458918,0.186924248496994,0.1874248496993988,0.1879254509018036,0.18842605210420843,0.18892665330661323,0.18942725450901804,0.18992785571142284,0.19042845691382765,0.19092905811623245,0.19142965931863729,0.1919302605210421,0.1924308617234469,0.1929314629258517,0.1934320641282565,0.19393266533066134,0.19443326653306614,0.19493386773547094,0.19543446893787575,0.19593507014028055,0.19643567134268536,0.1969362725450902,0.197436873747495,0.1979374749498998,0.1984380761523046,0.1989386773547094,0.19943927855711424,0.19993987975951905,0.20044048096192385,0.20094108216432865,0.20144168336673346,0.20194228456913826,0.2024428857715431,0.2029434869739479,0.2034440881763527,0.2039446893787575,0.20444529058116231,0.20494589178356715,0.20544649298597195,0.20594709418837676,0.20644769539078156,0.20694829659318636,0.20744889779559117,0.207949498997996,0.2084501002004008,0.2089507014028056,0.20945130260521042,0.20995190380761522,0.21045250501002005,0.21095310621242486,0.21145370741482966,0.21195430861723447,0.21245490981963927,0.21295551102204408,0.2134561122244489,0.2139567134268537,0.21445731462925852,0.21495791583166332,0.21545851703406813,0.21595911823647296,0.21645971943887776,0.21696032064128257,0.21746092184368737,0.21796152304609218,0.21846212424849698,0.2189627254509018,0.21946332665330662,0.21996392785571142,0.22046452905811623,0.22096513026052103,0.22146573146292586,0.22196633266533067,0.22246693386773547,0.22296753507014028,0.22346813627254508,0.22396873747494989,0.22446933867735472,0.22496993987975952,0.22547054108216433,0.22597114228456913,0.22647174348697394,0.22697234468937877,0.22747294589178357,0.22797354709418838,0.22847414829659318,0.228974749498998,0.22947535070140282,0.22997595190380762,0.23047655310621243,0.23097715430861723,0.23147775551102204,0.23197835671342684,0.23247895791583167,0.23297955911823648,0.23348016032064128,0.2339807615230461,0.2344813627254509,0.23498196392785572,0.23548256513026053,0.23598316633266533,0.23648376753507014,0.23698436873747494,0.23748496993987975,0.23798557114228458,0.23848617234468938,0.2389867735470942,0.239487374749499,0.2399879759519038,0.24048857715430863,0.24098917835671343,0.24148977955911824,0.24199038076152304,0.24249098196392785,0.24299158316633265,0.24349218436873749,0.2439927855711423,0.2444933867735471,0.2449939879759519,0.2454945891783567,0.24599519038076154,0.24649579158316634,0.24699639278557114,0.24749699398797595,0.24799759519038075,0.24849819639278556,0.2489987975951904,0.2494993987975952,0.25]}
},{}],63:[function(require,module,exports){
module.exports={"expected":[0.8134198475976185,0.8125599782621958,0.8117013088241982,0.8108438346768245,0.80998755123951,0.8091324539577259,0.8082785383027781,0.8074257997716089,0.8065742338866002,0.8057238361953798,0.8048746022706266,0.8040265277098823,0.8031796081353599,0.802333839193758,0.8014892165560745,0.8006457359174225,0.7998033929968495,0.7989621835371564,0.7981221033047176,0.7972831480893074,0.7964453137039207,0.7956085959846033,0.7947729907902773,0.7939384940025708,0.7931051015256512,0.792272809286056,0.7914416132325276,0.7906115093358507,0.7897824935886872,0.7889545620054172,0.7881277106219788,0.7873019354957093,0.7864772327051899,0.7856535983500892,0.7848310285510098,0.7840095194493374,0.7831890672070869,0.7823696680067557,0.7815513180511735,0.7807340135633561,0.7799177507863602,0.7791025259831388,0.7782883354363974,0.7774751754484548,0.7766630423410994,0.775851932455453,0.7750418421518316,0.7742327678096081,0.7734247058270787,0.7726176526213273,0.7718116046280925,0.7710065583016371,0.7702025101146155,0.7693994565579455,0.7685973941406805,0.7677963193898801,0.766996228850486,0.7661971190851968,0.7653989866743424,0.7646018282157634,0.7638056403246885,0.7630104196336125,0.7622161627921795,0.7614228664670614,0.7606305273418422,0.759839142116901,0.7590487075092959,0.7582592202526504,0.7574706770970393,0.756683074808876,0.7558964101708013,0.7551106799815727,0.7543258810559543,0.7535420102246089,0.7527590643339886,0.75197704024623,0.7511959348390463,0.7504157450056231,0.7496364676545147,0.7488580997095391,0.7480806381096774,0.747304079808971,0.7465284217764211,0.7457536609958892,0.7449797944659979,0.7442068192000315,0.7434347322258413,0.7426635305857457,0.741893211336437,0.7411237715488853,0.7403552083082439,0.7395875187137565,0.7388206998786653,0.7380547489301167,0.7372896630090731,0.7365254392702201,0.7357620748818785,0.7349995670259144,0.7342379128976515,0.7334771097057831,0.7327171546722864,0.7319580450323347,0.731199778034215,0.7304423509392397,0.7296857610216654,0.7289300055686082,0.7281750818799616,0.727420987268315,0.7266677190588712,0.7259152745893662,0.7251636512099912,0.7244128462833096,0.7236628571841812,0.7229136812996829,0.7221653160290312,0.7214177587835064,0.7206710069863748,0.719925058072814,0.7191799094898378,0.7184355586962221,0.7176920031624296,0.7169492403705391,0.7162072678141695,0.7154660829984106,0.7147256834397505,0.7139860666660035,0.7132472302162414,0.7125091716407225,0.7117718885008225,0.7110353783689667,0.7102996388285598,0.7095646674739192,0.7088304619102085,0.7080970197533691,0.7073643386300557,0.7066324161775693,0.7059012500437931,0.7051708378871274,0.7044411773764244,0.7037122661909265,0.7029841020202019,0.7022566825640812,0.7015300055325971,0.7008040686459214,0.7000788696343023,0.6993544062380077,0.6986306762072604,0.6979076773021804,0.6971854072927255,0.6964638639586312,0.6957430450893533,0.6950229484840094,0.6943035719513199,0.6935849133095536,0.692866970386468,0.6921497410192546,0.691433223054482,0.6907174143480406,0.6900023127650879,0.6892879161799934,0.6885742224762837,0.68786122954659,0.687148935292593,0.6864373376249702,0.6857264344633439,0.6850162237362281,0.6843067033809765,0.6835978713437315,0.6828897255793719,0.6821822640514633,0.6814754847322069,0.680769385602389,0.6800639646513327,0.6793592198768468,0.6786551492851779,0.677951750890961,0.6772490227171721,0.6765469627950793,0.6758455691641959,0.6751448398722318,0.6744447729750491,0.6737453665366124,0.673046618628945,0.6723485273320816,0.671651090734023,0.6709543069306911,0.6702581740258841,0.6695626901312303,0.6688678533661464,0.6681736618577909,0.6674801137410222,0.6667872071583546,0.6660949402599141,0.6654033112033982,0.664712318154031,0.6640219592845215,0.6633322327750238,0.6626431368130918,0.6619546695936411,0.6612668293189068,0.6605796141984023,0.6598930224488795,0.6592070522942892,0.6585217019657389,0.6578369697014569,0.6571528537467491,0.6564693523539625,0.6557864637824458,0.6551041862985096,0.654422518175391,0.6537414576932126,0.653061003138946,0.6523811528063753,0.6517019049960576,0.6510232580152886,0.6503452101780641,0.6496677598050442,0.6489909052235165,0.648314644767362,0.6476389767770163,0.6469638995994373,0.646289411588068,0.6456155111028011,0.644942196509947,0.6442694661821959,0.6435973184985854,0.6429257518444668,0.6422547646114694,0.6415843551974687,0.6409145220065525,0.640245263448987,0.6395765779411855,0.6389084639056731,0.6382409197710572,0.6375739439719932,0.6369075349491525,0.6362416911491917,0.6355764110247207,0.6349116930342701,0.6342475356422617,0.6335839373189758,0.6329208965405219,0.6322584117888069,0.6315964815515057,0.6309351043220295,0.6302742785994982,0.6296140028887075,0.6289542757001025,0.6282950955497453,0.6276364609592878,0.6269783704559423,0.6263208225724517,0.6256638158470615,0.6250073488234922,0.6243514200509086,0.6236960280838945,0.6230411714824227,0.6223868488118282,0.6217330586427801,0.6210797995512551,0.6204270701185092,0.6197748689310512,0.6191231945806155,0.6184720456641367,0.6178214207837205,0.61717131854662,0.6165217375652079,0.6158726764569507,0.6152241338443836,0.614576108355084,0.613928598621646,0.6132816032816556,0.6126351209776653,0.6119891503571683,0.6113436900725745,0.6106987387811855,0.61005429514517,0.6094103578315391,0.6087669255121223,0.6081239968635439,0.6074815705671975,0.6068396453092236,0.6061982197804863,0.605557292676547,0.6049168626976448,0.6042769285486708,0.6036374889391449,0.6029985425831946,0.6023600881995309,0.6017221245114255,0.6010846502466894,0.6004476641376492,0.5998111649211252,0.5991751513384108,0.5985396221352476,0.5979045760618067,0.5972700118726645,0.5966359283267825,0.5960023241874861,0.5953691982224414,0.5947365492036367,0.594104375907359,0.5934726771141747,0.5928414516089077,0.5922106981806204,0.5915804156225907,0.5909506027322937,0.5903212583113804,0.5896923811656576,0.5890639701050686,0.5884360239436718,0.587808541499622,0.587181521595151,0.5865549630565464,0.5859288647141345,0.5853032254022588,0.5846780439592615,0.5840533192274656,0.5834290500531536,0.5828052352865505,0.5821818737818045,0.5815589643969679,0.5809365059939787,0.5803144974386432,0.5796929376006156,0.5790718253533824,0.5784511595742413,0.5778309391442858,0.5772111629483864,0.5765918298751715,0.5759729388170125,0.575354488670003,0.5747364783339443,0.5741189067123259,0.5735017727123081,0.5728850752447076,0.572268813223977,0.57165298556819,0.5710375911990231,0.5704226290417403,0.5698080980251754,0.5691939970817158,0.5685803251472852,0.5679670811613285,0.5673542640667951,0.5667418728101218,0.5661299063412176,0.5655183636134476,0.5649072435836167,0.564296545211954,0.5636862674620969,0.5630764093010758,0.5624669696992984,0.5618579476305334,0.5612493420718965,0.560641152003834,0.5600333764101081,0.5594260142777822,0.5588190645972043,0.5582125263619936,0.5576063985690255,0.5570006802184155,0.5563953703135062,0.5557904678608513,0.5551859718702017,0.5545818813544916,0.5539781953298225,0.5533749128154506,0.5527720328337717,0.5521695544103074,0.5515674765736902,0.5509657983556513,0.5503645187910045,0.5497636369176343,0.5491631517764809,0.5485630624115271,0.5479633678697847,0.5473640672012808,0.5467651594590438,0.546166643699092,0.5455685189804174,0.5449707843649753,0.544373438917669,0.5437764817063382,0.5431799118017452,0.5425837282775618,0.5419879302103575,0.5413925166795857,0.5407974867675707,0.5402028395594971,0.5396085741433942,0.5390146896101259,0.5384211850533778,0.5378280595696431,0.537235312258213,0.5366429422211625,0.5360509485633383,0.5354593303923485,0.5348680868185481,0.5342772169550285,0.5336867199176057,0.5330965948248074,0.5325068407978621,0.5319174569606877,0.5313284424398776,0.5307397963646929,0.5301515178670472,0.5295636060814969,0.5289760601452302,0.5283888791980544,0.5278020623823856,0.5272156088432374,0.5266295177282089,0.5260437881874747,0.5254584193737732,0.5248734104423957,0.5242887605511759,0.523704468860478,0.5231205345331871,0.5225369567346975,0.5219537346329027,0.5213708673981842,0.5207883542034014,0.5202061942238804,0.5196243866374043,0.5190429306242021,0.518461825366939,0.5178810700507055,0.5173006638630072,0.516720605993755,0.5161408956352549,0.5155615319821968,0.5149825142316468,0.5144038415830344,0.5138255132381446,0.5132475284011074,0.5126698862783875,0.5120925860787751,0.511515627013376,0.5109390082956016,0.5103627291411602,0.5097867887680457,0.5092111863965302,0.5086359212491527,0.5080609925507106,0.5074863995282501,0.5069121414110569,0.5063382174306466,0.505764626820756,0.5051913688173334,0.5046184426585297,0.5040458475846894,0.5034735828383413,0.5029016476641893,0.5023300413091041,0.5017587630221136,0.501187812054394,0.5006171876592624,0.5000468890921655,0.49947691561067337,0.4989072664744685,0.49833794094533934,0.4977689382871701,0.4972002577659326,0.496631898649678,0.49606386020852844,0.4954961417146676,0.4949287424423337,0.49436166166781026,0.49379489866941784,0.49322845272750615,0.4926623231244457,0.4920965091446188,0.49153101007441335,0.490965825202212,0.4904009538183871,0.4898363952152903,0.4892721486872453,0.4887082135305407,0.4881445890434209,0.4875812745260788,0.4870182692806485,0.48645557261119576,0.48589318382371277,0.4853311022261083,0.48476932712820087,0.4842078578417114,0.4836466936802548,0.4830858339593334,0.48252527799632844,0.4819650251104933,0.48140507462294574,0.48084542585666057,0.48028607813646207,0.47972703078901724,0.4791682831428273,0.47860983452822164,0.4780516842773507,0.47749383172417675,0.4769362762044699],"x":[0.25,0.250501002004008,0.25100200400801603,0.251503006012024,0.25200400801603207,0.25250501002004005,0.2530060120240481,0.2535070140280561,0.25400801603206413,0.2545090180360721,0.25501002004008017,0.25551102204408815,0.2560120240480962,0.2565130260521042,0.25701402805611223,0.2575150300601202,0.25801603206412826,0.25851703406813625,0.2590180360721443,0.2595190380761523,0.26002004008016033,0.2605210420841683,0.26102204408817636,0.26152304609218435,0.2620240480961924,0.2625250501002004,0.26302605210420843,0.2635270541082164,0.26402805611222446,0.26452905811623245,0.2650300601202405,0.2655310621242485,0.26603206412825653,0.2665330661322645,0.26703406813627256,0.26753507014028055,0.2680360721442886,0.2685370741482966,0.26903807615230463,0.2695390781563126,0.27004008016032066,0.27054108216432865,0.2710420841683367,0.2715430861723447,0.2720440881763527,0.2725450901803607,0.27304609218436876,0.27354709418837675,0.2740480961923848,0.2745490981963928,0.2750501002004008,0.2755511022044088,0.27605210420841686,0.27655310621242485,0.2770541082164329,0.2775551102204409,0.27805611222444887,0.2785571142284569,0.2790581162324649,0.27955911823647295,0.28006012024048094,0.280561122244489,0.28106212424849697,0.281563126252505,0.282064128256513,0.28256513026052105,0.28306613226452904,0.2835671342685371,0.28406813627254507,0.2845691382765531,0.2850701402805611,0.28557114228456915,0.28607214428857713,0.2865731462925852,0.28707414829659317,0.2875751503006012,0.2880761523046092,0.28857715430861725,0.28907815631262523,0.2895791583166333,0.29008016032064127,0.2905811623246493,0.2910821643286573,0.29158316633266534,0.29208416833667333,0.2925851703406814,0.29308617234468937,0.2935871743486974,0.2940881763527054,0.29458917835671344,0.29509018036072143,0.2955911823647295,0.29609218436873747,0.2965931863727455,0.2970941883767535,0.29759519038076154,0.29809619238476953,0.2985971943887776,0.29909819639278556,0.2995991983967936,0.3001002004008016,0.30060120240480964,0.30110220440881763,0.3016032064128257,0.30210420841683366,0.3026052104208417,0.3031062124248497,0.30360721442885774,0.30410821643286573,0.3046092184368738,0.30511022044088176,0.30561122244488975,0.3061122244488978,0.3066132264529058,0.30711422845691383,0.3076152304609218,0.30811623246492986,0.30861723446893785,0.3091182364729459,0.3096192384769539,0.31012024048096193,0.3106212424849699,0.31112224448897796,0.31162324649298595,0.312124248496994,0.312625250501002,0.31312625250501,0.313627254509018,0.31412825651302606,0.31462925851703405,0.3151302605210421,0.3156312625250501,0.3161322645290581,0.3166332665330661,0.31713426853707416,0.31763527054108215,0.3181362725450902,0.3186372745490982,0.3191382765531062,0.3196392785571142,0.32014028056112226,0.32064128256513025,0.3211422845691383,0.3216432865731463,0.3221442885771543,0.3226452905811623,0.32314629258517036,0.32364729458917835,0.3241482965931864,0.3246492985971944,0.3251503006012024,0.3256513026052104,0.32615230460921846,0.32665330661322645,0.3271543086172345,0.3276553106212425,0.3281563126252505,0.3286573146292585,0.32915831663326656,0.32965931863727455,0.3301603206412826,0.3306613226452906,0.3311623246492986,0.3316633266533066,0.33216432865731466,0.33266533066132264,0.3331663326653307,0.3336673346693387,0.33416833667334667,0.3346693386773547,0.3351703406813627,0.33567134268537074,0.33617234468937873,0.3366733466933868,0.33717434869739477,0.3376753507014028,0.3381763527054108,0.33867735470941884,0.33917835671342683,0.3396793587174349,0.34018036072144286,0.3406813627254509,0.3411823647294589,0.34168336673346694,0.34218436873747493,0.342685370741483,0.34318637274549096,0.343687374749499,0.344188376753507,0.34468937875751504,0.34519038076152303,0.3456913827655311,0.34619238476953906,0.3466933867735471,0.3471943887775551,0.34769539078156314,0.34819639278557113,0.3486973947895792,0.34919839679358716,0.3496993987975952,0.3502004008016032,0.35070140280561124,0.35120240480961923,0.3517034068136273,0.35220440881763526,0.3527054108216433,0.3532064128256513,0.35370741482965934,0.35420841683366733,0.35470941883767537,0.35521042084168336,0.3557114228456914,0.3562124248496994,0.35671342685370744,0.3572144288577154,0.35771543086172347,0.35821643286573146,0.3587174348697395,0.3592184368737475,0.35971943887775554,0.3602204408817635,0.36072144288577157,0.36122244488977956,0.36172344689378755,0.3622244488977956,0.3627254509018036,0.3632264529058116,0.3637274549098196,0.36422845691382766,0.36472945891783565,0.3652304609218437,0.3657314629258517,0.3662324649298597,0.3667334669338677,0.36723446893787576,0.36773547094188375,0.3682364729458918,0.3687374749498998,0.3692384769539078,0.3697394789579158,0.37024048096192386,0.37074148296593185,0.3712424849699399,0.3717434869739479,0.3722444889779559,0.3727454909819639,0.37324649298597196,0.37374749498997994,0.374248496993988,0.374749498997996,0.375250501002004,0.375751503006012,0.37625250501002006,0.37675350701402804,0.3772545090180361,0.3777555110220441,0.3782565130260521,0.3787575150300601,0.37925851703406815,0.37975951903807614,0.3802605210420842,0.3807615230460922,0.3812625250501002,0.3817635270541082,0.38226452905811625,0.38276553106212424,0.3832665330661323,0.3837675350701403,0.3842685370741483,0.3847695390781563,0.38527054108216435,0.38577154308617234,0.3862725450901804,0.3867735470941884,0.3872745490981964,0.3877755511022044,0.38827655310621245,0.38877755511022044,0.38927855711422843,0.3897795591182365,0.39028056112224446,0.3907815631262525,0.3912825651302605,0.39178356713426854,0.39228456913827653,0.3927855711422846,0.39328657314629256,0.3937875751503006,0.3942885771543086,0.39478957915831664,0.39529058116232463,0.39579158316633267,0.39629258517034066,0.3967935871743487,0.3972945891783567,0.39779559118236474,0.3982965931863727,0.39879759519038077,0.39929859719438876,0.3997995991983968,0.4003006012024048,0.40080160320641284,0.4013026052104208,0.40180360721442887,0.40230460921843686,0.4028056112224449,0.4033066132264529,0.40380761523046094,0.4043086172344689,0.40480961923847697,0.40531062124248496,0.405811623246493,0.406312625250501,0.40681362725450904,0.407314629258517,0.40781563126252507,0.40831663326653306,0.4088176352705411,0.4093186372745491,0.40981963927855714,0.4103206412825651,0.41082164328657317,0.41132264529058116,0.4118236472945892,0.4123246492985972,0.41282565130260523,0.4133266533066132,0.41382765531062127,0.41432865731462926,0.4148296593186373,0.4153306613226453,0.41583166332665333,0.4163326653306613,0.4168336673346693,0.41733466933867736,0.41783567134268534,0.4183366733466934,0.4188376753507014,0.4193386773547094,0.4198396793587174,0.42034068136272545,0.42084168336673344,0.4213426853707415,0.4218436873747495,0.4223446893787575,0.4228456913827655,0.42334669338677355,0.42384769539078154,0.4243486973947896,0.4248496993987976,0.4253507014028056,0.4258517034068136,0.42635270541082165,0.42685370741482964,0.4273547094188377,0.4278557114228457,0.4283567134268537,0.4288577154308617,0.42935871743486975,0.42985971943887774,0.4303607214428858,0.4308617234468938,0.4313627254509018,0.4318637274549098,0.43236472945891785,0.43286573146292584,0.4333667334669339,0.4338677354709419,0.4343687374749499,0.4348697394789579,0.43537074148296595,0.43587174348697394,0.436372745490982,0.43687374749499,0.437374749498998,0.437875751503006,0.43837675350701405,0.43887775551102204,0.4393787575150301,0.43987975951903807,0.4403807615230461,0.4408817635270541,0.44138276553106215,0.44188376753507014,0.4423847695390782,0.44288577154308617,0.4433867735470942,0.4438877755511022,0.44438877755511025,0.44488977955911824,0.4453907815631262,0.44589178356713427,0.44639278557114226,0.4468937875751503,0.4473947895791583,0.44789579158316634,0.4483967935871743,0.44889779559118237,0.44939879759519036,0.4498997995991984,0.4504008016032064,0.45090180360721444,0.4514028056112224,0.45190380761523047,0.45240480961923846,0.4529058116232465,0.4534068136272545,0.45390781563126253,0.4544088176352705,0.45490981963927857,0.45541082164328656,0.4559118236472946,0.4564128256513026,0.45691382765531063,0.4574148296593186,0.45791583166332667,0.45841683366733466,0.4589178356713427,0.4594188376753507,0.45991983967935873,0.4604208416833667,0.46092184368737477,0.46142284569138275,0.4619238476953908,0.4624248496993988,0.46292585170340683,0.4634268537074148,0.46392785571142287,0.46442885771543085,0.4649298597194389,0.4654308617234469,0.46593186372745493,0.4664328657314629,0.46693386773547096,0.46743486973947895,0.467935871743487,0.468436873747495,0.46893787575150303,0.469438877755511,0.46993987975951906,0.47044088176352705,0.4709418837675351,0.4714428857715431,0.47194388777555113,0.4724448897795591,0.4729458917835671,0.47344689378757515,0.47394789579158314,0.4744488977955912,0.4749498997995992,0.4754509018036072,0.4759519038076152,0.47645290581162325,0.47695390781563124,0.4774549098196393,0.4779559118236473,0.4784569138276553,0.4789579158316633,0.47945891783567135,0.47995991983967934,0.4804609218436874,0.48096192384769537,0.4814629258517034,0.4819639278557114,0.48246492985971945,0.48296593186372744,0.4834669338677355,0.48396793587174347,0.4844689378757515,0.4849699398797595,0.48547094188376755,0.48597194388777554,0.4864729458917836,0.48697394789579157,0.4874749498997996,0.4879759519038076,0.48847695390781565,0.48897795591182364,0.4894789579158317,0.48997995991983967,0.4904809619238477,0.4909819639278557,0.49148296593186375,0.49198396793587174,0.4924849699398798,0.49298597194388777,0.4934869739478958,0.4939879759519038,0.49448897795591185,0.49498997995991983,0.4954909819639279,0.49599198396793587,0.4964929859719439,0.4969939879759519,0.49749498997995995,0.49799599198396793,0.498496993987976,0.49899799599198397,0.499498997995992,0.5]}
},{}],64:[function(require,module,exports){
module.exports={"expected":[0.4769362762044699,0.4765653565446719,0.4761945679715928,0.47582391029072746,0.4754533833079204,0.47508298682936523,0.4747127206616034,0.47434258461152307,0.4739725784863588,0.4736027020936903,0.47323295524144177,0.4728633377378804,0.4724938493916161,0.4721244900116002,0.47175525940712526,0.471386157387823,0.47101718376366436,0.4706483383449587,0.4702796209423517,0.4699110313668264,0.4695425694297003,0.469174234942626,0.46880602771758956,0.46843794756691004,0.4680699943032384,0.4677021677395567,0.4673344676891771,0.46696689396574115,0.46659944638321926,0.4662321247559091,0.46586492889843534,0.4654978586257489,0.46513091375312554,0.4647640940961652,0.4643973994707914,0.4640308296932509,0.46366438458011144,0.4632980639482621,0.4629318676149119,0.4625657953975898,0.4621998471141427,0.46183402258273515,0.4614683216218488,0.46110274405028157,0.4607372896871464,0.46037195835187034,0.4600067498641949,0.45964166404417356,0.4592767007121726,0.4589118596888687,0.4585471407952499,0.4581825438526136,0.45781806868256536,0.45745371510701976,0.45708948294819823,0.45672537202862906,0.4563613821711456,0.4559975131988867,0.4556337649352953,0.4552701372041176,0.4549066298294025,0.4545432426355007,0.4541799754470643,0.4538168280890454,0.4534538003866956,0.45309089216556564,0.4527281032515042,0.4523654334706571,0.4520028826494671,0.45164045061467206,0.45127813719330573,0.4509159422126956,0.45055386550046295,0.45019190688452165,0.44983006619307836,0.4494683432546298,0.4491067378979647,0.44874524995216103,0.4483838792465855,0.44802262561089407,0.44766148887503,0.44730046886922364,0.44693956542399105,0.44657877837013493,0.44621810753874186,0.44585755276118305,0.44549711386911267,0.44513679069446815,0.4447765830694686,0.44441649082661416,0.44405651379868594,0.44369665181874485,0.44333690472013104,0.4429772723364629,0.4426177545016365,0.4422583510498257,0.4418990618154801,0.4415398866333253,0.4411808253383618,0.4408218777658646,0.4404630437513824,0.4401043231307365,0.4397457157400209,0.43938722141560105,0.4390288399941138,0.43867057131246556,0.43831241520783254,0.43795437151766065,0.4375964400796631,0.43723862073182107,0.4368809133123831,0.43652331765986346,0.4361658336130424,0.43580846101096493,0.4354511996929407,0.4350940494985428,0.43473701026760725,0.43438008184023275,0.4340232640567795,0.4336665567578692,0.43330995978438314,0.43295347297746334,0.4325970961785108,0.4322408292291844,0.4318846719714015,0.43152862424733707,0.4311726858994219,0.4308168567703432,0.4304611367030436,0.43010552554072035,0.4297500231268249,0.4293946293050623,0.4290393439193903,0.42868416681401894,0.4283290978334102,0.4279741368222767,0.42761928362558194,0.4272645380885387,0.4269099000566095,0.4265553693755051,0.42620094589118446,0.4258466294498538,0.4254924198979662,0.42513831708222083,0.4247843208495628,0.424430431047182,0.4240766475225122,0.42372297012323196,0.42336939869726237,0.4230159330927676,0.4226625731581534,0.42230931874206706,0.4219561696933972,0.4216031258612724,0.42125018709506074,0.42089735324436967,0.4205446241590455,0.4201919996891717,0.41983947968506985,0.4194870639972983,0.41913475247665144,0.4187825449741591,0.41843044134108687,0.4180784414289344,0.41772654508943563,0.41737475217455766,0.4170230625365007,0.41667147602769705,0.4163199925008109,0.4159686118087376,0.41561733380460336,0.415266158341764,0.414915085273805,0.4145641144545412,0.4142132457380156,0.41386247897849915,0.41351181403049,0.41316125074871335,0.41281078898812035,0.4124604286038883,0.41211016945141926,0.4117600113863399,0.4114099542645015,0.4110599979419787,0.41071014227506875,0.4103603871202918,0.41001073233439034,0.4096611777743273,0.40931172329728743,0.4089623687606755,0.40861311402211625,0.4082639589394537,0.40791490337075087,0.407565947174289,0.40721709020856695,0.40686833233230096,0.40651967340442424,0.4061711132840859,0.40582265183065125,0.4054742889037002,0.405126024363028,0.4047778580686438,0.4044297898807703,0.40408181965984363,0.40373394726651285,0.4033861725616388,0.40303849540629383,0.4026909156617623,0.4023434331895383,0.40199604785132714,0.40164875950904266,0.40130156802480904,0.4009544732609584,0.4006074750800316,0.4002605733447766,0.39991376791814937,0.39956705866331227,0.39922044544363366,0.3988739281226882,0.3985275065642557,0.3981811806323207,0.3978349501910721,0.39748881510490264,0.39714277523840863,0.3967968304563893,0.39645098062384604,0.39610522560598244,0.39575956526820355,0.3954139994761155,0.3950685280955248,0.3947231509924382,0.3943778680330622,0.3940326790838019,0.39368758401126197,0.39334258268224453,0.39299767496375004,0.3926528607229756,0.3923081398273158,0.39196351214436137,0.3916189775418991,0.391274535887911,0.39093018705057414,0.39058593089826066,0.3902417672995361,0.3898976961231601,0.38955371723808535,0.38920983051345764,0.3888660358186147,0.38852233302308614,0.3881787219965933,0.38783520260904863,0.38749177473055424,0.38714843823140355,0.3868051929820787,0.38646203885325187,0.3861189757157833,0.3857760034407219,0.3854331218993046,0.385090330962956,0.3847476305032869,0.3844050203920959,0.3840625005013671,0.3837200707032702,0.38337773087016086,0.3830354808745792,0.3826933205892502,0.3823512498870824,0.3820092686411684,0.38166737672478396,0.3813255740113875,0.38098386037462,0.3806422356883041,0.3803006998264443,0.37995925266322644,0.3796178940730162,0.3792766239303604,0.37893544210998564,0.37859434848679757,0.37825334293588125,0.37791242533250025,0.3775715955520967,0.37723085347029006,0.3768901989628777,0.37654963190583357,0.37620915217530876,0.3758687596476301,0.3755284541993006,0.37518823570699833,0.37484810404757696,0.37450805909806406,0.37416810073566203,0.3738282288377467,0.37348844328186753,0.3731487439457468,0.37280913070728,0.3724696034445342,0.37213016203574856,0.3717908063593338,0.37145153629387184,0.371112351718115,0.37077325251098614,0.37043423855157775,0.37009530971915205,0.36975646589314076,0.3694177069531435,0.3690790327789289,0.3687404432504338,0.36840193824776213,0.3680635176511851,0.36772518134114135,0.3673869291982353,0.36704876110323775,0.36671067693708564,0.3663726765808805,0.36603475991588974,0.36569692682354454,0.3653591771854407,0.36502151088333806,0.36468392779916003,0.36434642781499244,0.36400901081308473,0.3636716766758485,0.3633344252858568,0.36299725652584536,0.36266017027871056,0.36232316642750984,0.36198624485546116,0.361649405445943,0.3613126480824934,0.36097597264881026,0.3606393790287502,0.36030286710632875,0.35996643676572015,0.35963008789125656,0.3592938203674275,0.3589576340788806,0.3586215289104201,0.35828550474700677,0.3579495614737578,0.35761369897594647,0.3572779171390018,0.35694221584850766,0.3566065949902032,0.3562710544499821,0.3559355941138922,0.35560021386813506,0.35526491359906615,0.3549296931931939,0.35459455253717986,0.3542594915178376,0.35392451002213343,0.35358960793718536,0.3532547851502624,0.3529200415487854,0.35258537702032583,0.3522507914526056,0.35191628473349656,0.3515818567510208,0.3512475073933497,0.35091323654880385,0.3505790441058526,0.3502449299531137,0.3499108939793534,0.34957693607348567,0.34924305612457174,0.34890925402182016,0.34857552965458677,0.34824188291237307,0.34790831368482766,0.34757482186174427,0.347241407333063,0.3469080699888685,0.34657480971939053,0.3462416264150036,0.34590851996622657,0.3455754902637217,0.34524253719829556,0.3449096606608978,0.344576860542621,0.3442441367347004,0.34391148912851377,0.34357891761558096,0.34324642208756334,0.34291400243626385,0.34258165855362666,0.34224939033173674,0.34191719766281936,0.34158508043924,0.34125303855350436,0.3409210718982575,0.3405891803662835,0.34025736385050576,0.3399256222439862,0.33959395543992543,0.3392623633316613,0.3389308458126702,0.33859940277656564,0.3382680341170982,0.3379367397281555,0.33760551950376144,0.33727437333807664,0.33694330112539694,0.3366123027601544,0.3362813781369164,0.335950527150385,0.33561974969539726,0.33528904566692475,0.33495841496007295,0.3346278574700816,0.33429737309232355,0.3339669617223054,0.33363662325566634,0.3333063575881787,0.33297616461574675,0.33264604423440713,0.33231599634032827,0.33198602082981016,0.33165611759928404,0.33132628654531204,0.3309965275645872,0.3306668405539327,0.3303372254103021,0.3300076820307784,0.3296782103125746,0.32934881015303263,0.3290194814496236,0.32869022409994725,0.3283610380017318,0.3280319230528333,0.3277028791512361,0.3273739061950521,0.32704500408251996,0.32671617271200615,0.32638741198200344,0.326058721791131,0.3257301020381344,0.3254015526218852,0.32507307344138037,0.3247446643957426,0.32441632538421933,0.324088056306183,0.3237598570611307,0.32343172754868377,0.3231036676685874,0.32277567732071066,0.32244775640504636,0.32211990482170993,0.32179212247094047,0.3214644092530993,0.3211367650686704,0.3208091898182595,0.32048168340259475,0.3201542457225256,0.319826876679023,0.319499576173179,0.31917234410620615,0.3188451803794382,0.318518084894329,0.318191057552452,0.31786409825550077,0.31753720690528886,0.3172103834037483,0.31688362765293077,0.31655693955500624,0.3162303190122637,0.31590376592710995,0.31557728020206993,0.3152508617397864,0.31492451044301967,0.31459822621464695,0.3142720089576628,0.31394585857517815,0.31361977497042104,0.3132937580467349,0.31296780770757976,0.31264192385653133,0.3123161063972802,0.31199035523363294,0.3116646702695108,0.3113390514089496,0.3110134985560999,0.3106880116152263,0.3103625904907076,0.31003723508703623,0.309711945308818,0.3093867210607722,0.30906156224773107,0.3087364687746397,0.3084114405465554,0.30808647746864803,0.3077615794461996,0.30743674638460355,0.3071119781893652,0.30678727476610107,0.306462636020539,0.3061380618585173,0.305813552185985,0.30548910690900166,0.30516472593373706,0.3048404091664704,0.30451615651359093,0.30419196788159747,0.3038678431770978,0.30354378230680834,0.303219785177555,0.3028958516962716,0.3025719817700001,0.30224817530589115,0.3019244322112027,0.30160075239330053,0.3012771357596573,0.30095358221785334,0.3006300916755755,0.30030666404061745,0.2999832992208792,0.2996599971243669,0.29933675765919293,0.2990135807335751,0.29869046625583673,0.2983674141344067,0.2980444242778189,0.2977214965947117,0.2973986309938284,0.2970758273840168,0.29675308567422853,0.29643040577351937,0.2961077875910488,0.29578523103607973,0.29546273601797857,0.29514030244621436,0.29481793023035935,0.2944956192800883,0.2941733695051785,0.29385118081550904,0.29352905312106137,0.29320698633191855,0.29288498035826505,0.29256303511038667,0.2922411504986706,0.29191932643360474,0.2915975628257773,0.29127585958587754,0.29095421662469456,0.2906326338531176,0.29031111118213576,0.28998964852283754,0.289668245786411,0.28934690288414344,0.2890256197274209,0.28870439622772825,0.2883832322966491,0.28806212784586493,0.28774108278715593,0.2874200970323997,0.287099170493572,0.28677830308274543,0.2864574947120906,0.2861367452938745,0.28581605474046196,0.28549542296431346,0.28517484987798636,0.28485433539413435,0.2845338794255071,0.28421348188495016,0.28389314268540466,0.2835728617399072,0.28325263896158964,0.28293247426367873,0.2826123675594962,0.2822923187624586,0.2819723277860764,0.2816523945439546,0.2813325189497923,0.28101270091738245,0.28069294036061126,0.2803732371934588,0.2800535913299981,0.2797340026843954,0.2794144711709095,0.2790949967038922,0.2787755791977877,0.27845621856713193,0.27813691472655344,0.2778176675907724,0.27749847707460085,0.27717934309294173,0.2768602655607899,0.276541244393231,0.2762222795054416,0.2759033708126888,0.2755845182303304,0.27526572167381436,0.274946981058679,0.2746282963005521,0.2743096673151516,0.2739910940182849,0.2736725763258485,0.27335411415382826,0.273035707418299,0.2727173560354244,0.27239905992145635,0.2720808189927356,0.2717626331656908,0.27144450235683903,0.27112642648278473,0.27080840546022006,0.270490439205925,0.27017252763676664,0.2698546706696988,0.269536868221763,0.26921912021008665,0.26890142655188426,0.26858378716445636,0.26826620196519,0.26794867087155794,0.2676311938011189,0.26731377067151696,0.26699640140048214,0.26667908590582945,0.2663618241054587,0.266044615917355,0.2657274612595882,0.26541036005031254,0.2650933122077665,0.26477631765027293,0.26445937629623884,0.2641424880641545,0.26382565287259446,0.26350887064021655,0.26319214128576174,0.26287546472805395,0.26255884088600073,0.26224226967859166,0.26192575102489946,0.2616092848440788,0.26129287105536686,0.26097650957808294,0.26066020033162807,0.2603439432354849,0.26002773820921793,0.2597115851724729,0.2593954840449766,0.25907943474653694,0.2587634371970429,0.2584474913164639,0.2581315970248497,0.2578157542423307,0.25749996288911775,0.2571842228855008,0.2568685341518504,0.2565528966086165,0.2562373101763285,0.25592177477559536,0.2556062903271047,0.25529085675162355,0.2549754739699978,0.2546601419031516,0.2543448604720878,0.2540296295978877,0.25371444920171066,0.25339931920479364,0.2530842395284519,0.2527692100940784,0.2524542308231431,0.2521393016371937,0.25182442245785486,0.25150959320682825,0.2511948138058926,0.2508800841769026,0.2505654042417906,0.25025077392256406,0.24993619314130752,0.24962166182018108,0.2493071798814208,0.24899274724733853,0.24867836384032127,0.24836402958283202,0.24804974439740846,0.24773550820666357,0.24742132093328514,0.24710718250003552,0.24679309282975195,0.24647905184534608,0.24616505946980327,0.24585111562618372,0.24553722023762098,0.24522337322732282,0.24490957451857018,0.24459582403471775,0.24428212169919378,0.24396846743549888,0.24365486116720736,0.24334130281796618,0.24302779231149504,0.2427143295715859,0.24240091452210324,0.2420875470869839,0.24177422719023675,0.24146095475594226,0.24114772970825304,0.2408345519713931,0.24052142146965816,0.24020833812741474,0.23989530186910082,0.2395823126192256,0.2392693703023687,0.23895647484318044,0.23864362616638213,0.23833082419676505,0.2380180688591909,0.23770536007859142,0.23739269777996805,0.23708008188839272,0.23676751232900614,0.23645498902701895,0.23614251190771124,0.23583008089643206,0.23551769591859953,0.2352053568997007,0.23489306376529157,0.2345808164409963,0.23426861485250788,0.23395645892558742,0.23364434858606445,0.23333228375983606,0.2330202643728677,0.2327082903511922,0.23239636162091004,0.23208447810818927,0.23177263973926499,0.23146084644043968,0.2311490981380829,0.23083739475863052,0.23052573622858585,0.2302141224745182,0.22990255342306357,0.2295910290009243,0.22927954913486845,0.2289681137517308,0.22865672277841115,0.2283453761418758,0.22803407376915602,0.22772281558734897,0.22741160152361667,0.22710043150518652,0.22678930545935097,0.22647822331346748,0.2261671849949576,0.22585619043130822,0.2255452395500704,0.2252343322788592,0.22492346854535433,0.22461264827729935,0.2243018714025017,0.2239911378488326,0.2236804475442266,0.22336980041668242,0.2230591963942615,0.2227486354050886,0.22243811737735167,0.22212764223930173,0.22181720991925252,0.22150682034558006,0.22119647344672327,0.22088616915118367,0.22057590738752442,0.22026568808437136,0.21995551117041198,0.21964537657439592,0.21933528422513401,0.21902523405149935,0.21871522598242601,0.21840525994690968,0.21809533587400692,0.21778545369283542,0.21747561333257404,0.21716581472246235,0.21685605779180017,0.21654634246994844,0.21623666868632802,0.2159270363704202,0.21561744545176664,0.2153078958599684,0.21499838752468725,0.21468892037564377,0.2143794943426188,0.21407010935545243,0.2137607653440441,0.21345146223835257,0.21314219996839545,0.21283297846424948,0.21252379765605042,0.2122146574739922,0.21190555784832785,0.2115964987093687,0.21128747998748387,0.21097850161310164,0.21066956351670757,0.2103606656288457,0.21005180788011718,0.20974299020118156,0.2094342125227554,0.20912547477561336,0.2088167768905865,0.2085081187985637,0.20819950043049074,0.2078909217173704,0.20758238259026193,0.20727388298028157,0.20696542281860209,0.20665700203645257,0.2063486205651184,0.20604027833594127,0.20573197528031886,0.20542371132970458,0.20511548641560795,0.20480730046959394,0.2044991534232836,0.20419104520835232,0.203882975756532,0.20357494499960901,0.20326695286942517,0.20295899929787692,0.2026510842169157,0.20234320755854782,0.20203536925483373,0.2017275692378887,0.20141980743988233,0.20111208379303858,0.20080439822963475,0.20049675068200298,0.20018914108252905,0.19988156936365237,0.19957403545786587,0.19926653929771612,0.19895908081580307,0.19865165994478012,0.19834427661735335,0.19803693076628223,0.19772962232437935,0.19742235122450924,0.19711511739959,0.19680792078259204,0.19650076130653787,0.19619363890450275,0.19588655350961376,0.19557950505505053,0.19527249347404427,0.19496551869987813,0.194658580665887,0.19435167930545755,0.19404481455202804,0.19373798633908743,0.19343119460017677,0.19312443926888803,0.1928177202788639,0.19251103756379837,0.19220439105743606,0.19189778069357252,0.19159120640605348,0.19128466812877556,0.19097816579568544,0.19067169934078038,0.19036526869810727,0.19005887380176348,0.18975251458589606,0.189446190984702,0.18913990293242772,0.18883365036336947,0.18852743321187285,0.18822125141233273,0.18791510489919336,0.1876089936069479,0.18730291747013886,0.18699687642335733,0.18669087040124313,0.18638489933848518,0.18607896316982053,0.18577306183003495,0.1854671952539623,0.18516136337648498,0.18485556613253326,0.18454980345708555,0.1842440752851681,0.18393838155185502,0.183632722192268,0.18332709714157636,0.18302150633499692,0.18271594970779398,0.18241042719527867,0.18210493873280956,0.1817994842557923,0.1814940636996795,0.18118867699997016,0.18088332409221042,0.1805780049119929,0.1802727193949568,0.17996746747678732,0.1796622490932164,0.179357064180022,0.1790519126730279,0.17874679450810424,0.17844170962116662,0.17813665794817685,0.17783163942514188,0.1775266539881144,0.1772217015731927,0.17691678211652023,0.17661189555428544,0.17630704182272225,0.17600222085810946,0.17569743259677081,0.17539267697507457,0.17508795392943402,0.17478326339630706,0.1744786053121957,0.17417397961364658,0.1738693862372507,0.17356482511964322,0.17326029619750297,0.17295579940755318,0.17265133468656074,0.17234690197133662,0.17204250119873482,0.17173813230565352,0.171433795229034,0.17112948990586097,0.1708252162731623,0.17052097426800916,0.17021676382751583,0.16991258488883912,0.169608437389179,0.16930432126577824,0.16900023645592221,0.16869618289693847,0.16839216052619735,0.1680881692811115,0.16778420909913574,0.167480279917767,0.1671763816745441,0.16687251430704805,0.1665686777529017,0.16626487194976936,0.16596109683535706,0.16565735234741266,0.16535363842372497,0.1650499550021244,0.1647463020204827,0.1644426794167126,0.16413908712876776,0.1638355250946429,0.16353199325237372,0.16322849154003644,0.1629250198957479,0.16262157825766566,0.16231816656398762,0.1620147847529522,0.16171143276283753,0.16140811053196266,0.16110481799868612,0.16080155510140673,0.16049832177856285,0.1601951179686328,0.15989194361013484,0.1595887986416261,0.1592856830017038,0.15898259662900424,0.15867953946220328,0.15837651144001547,0.1580735125011949,0.1577705425845345,0.15746760162886625,0.15716468957306043,0.15686180635602665,0.15655895191671276,0.15625612619410537,0.1559533291272291,0.1556505606551472,0.15534782071696143,0.1550451092518109,0.15474242619887357,0.15443977149736482,0.15413714508653825,0.15383454690568474,0.15353197689413345,0.15322943499125063,0.15292692113644032,0.15262443526914354,0.15232197732883906,0.15201954725504266,0.15171714498730715,0.15141477046522242,0.15111242362841523,0.15081010441654946,0.15050781276932515,0.15020554862647947,0.149903311927786,0.14960110261305481,0.14929892062213218,0.14899676589490077,0.14869463837127955,0.14839253799122337,0.14809046469472312,0.14778841842180568,0.14748639911253372,0.14718440670700575,0.14688244114535554,0.14658050236775277,0.14627859031440255,0.1459767049255451,0.14567484614145618,0.14537301390244659,0.14507120814886226,0.14476942882108407,0.14446767585952788,0.14416594920464434,0.143864248796919,0.14356257457687158,0.14326092648505684,0.14295930446206387,0.1426577084485161,0.14235613838507108,0.14205459421242084,0.1417530758712914,0.14145158330244267,0.14115011644666867,0.14084867524479727,0.14054725963769002,0.14024586956624197,0.139944504971382,0.13964316579407243,0.13934185197530902,0.13904056345612054,0.13873930017756933,0.1384380620807508,0.1381368491067933,0.1378356611968582,0.1375344982921397,0.137233360333865,0.1369322472632935,0.1366311590217178,0.13633009555046274,0.1360290567908857,0.1357280426843762,0.13542705317235623,0.13512608819627986,0.13482514769763354,0.13452423161793517,0.13422333989873508,0.13392247248161518,0.13362162930818938,0.1333208103201028,0.1330200154590326,0.13271924466668733,0.13241849788480664,0.13211777505516192,0.13181707611955557,0.13151640101982126,0.13121574969782349,0.13091512209545808,0.13061451815465158,0.13031393781736136,0.13001338102557541,0.1297128477213126,0.12941233784662223,0.12911185134358413,0.1288113881543084,0.1285109482209356,0.1282105314856365,0.12791013789061176,0.1276097673780925,0.12730941989033964,0.12700909536964403,0.126708793758326,0.12640851499873607,0.1261082590332542,0.12580802580429007,0.1255078152542824,0.12520762732569973,0.12490746196103988,0.1246073191028297,0.12430719869362523,0.12400710067601173,0.12370702499260336,0.12340697158604305,0.1231069403990027,0.12280693137418286,0.12250694445431302,0.12220697958215065,0.12190703670048227,0.12160711575212244,0.1213072166799145,0.12100733942672943,0.12070748393546682,0.12040765014905416,0.12010783801044717,0.11980804746262905,0.11950827844861121,0.1192085309114328,0.11890880479416047,0.11860910003988849,0.11830941659173888,0.11800975439286088,0.117710113386431,0.11741049351565333,0.11711089472375891,0.1168113169540061,0.11651176014967998,0.11621222425409292,0.11591270921058393,0.11561321496251915,0.11531374145329092,0.11501428862631861,0.11471485642504814,0.11441544479295157,0.11411605367352778,0.11381668301030173,0.11351733274682478,0.11321800282667421,0.11291869319345359,0.11261940379079236,0.11232013456234619,0.11202088545179605,0.11172165640284919,0.11142244735923827,0.11112325826472179,0.11082408906308344,0.11052493969813265,0.1102258101137043,0.10992670025365814,0.10962761006187952,0.10932853948227889,0.1090294884587917,0.10873045693537833,0.10843144485602414,0.10813245216473936,0.10783347880555903,0.10753452472254253,0.10723558985977423,0.10693667416136286,0.10663777757144172,0.10633890003416815,0.10604004149372419,0.10574120189431593,0.10544238118017338,0.10514357929555096,0.10484479618472693,0.10454603179200352,0.10424728606170658,0.10394855893818597,0.1036498503658151,0.10335116028899112,0.10305248865213448,0.10275383539968919,0.10245520047612276,0.10215658382592589,0.10185798539361243,0.10155940512371946,0.10126084296080727,0.10096229884945881,0.10066377273428026,0.1003652645599005,0.10006677427097134,0.09976830181216696,0.09946984712818445,0.09917141016374341,0.0988729908635859,0.09857458917247622,0.09827620503520111,0.09797783839656962,0.09767948920141299,0.09738115739458425,0.09708284292095878,0.09678454572543398,0.09648626575292864,0.09618800294838374,0.095889757256762,0.09559152862304773,0.09529331699224661,0.09499512230938602,0.0946969445195148,0.09439878356770309,0.09410063939904217,0.09380251195864474,0.09350440119164455,0.09320630704319649,0.09290822945847618,0.0926101683826804,0.09231212376102674,0.09201409553875334,0.09171608366111937,0.09141808807340432,0.09112010872090856,0.09082214554895247,0.09052419850287714,0.09022626752804402,0.08992835256983475,0.08963045357365092,0.08933257048491457,0.08903470324906758,0.08873685181157198,0.08843901611790936,0.08814119611358141,0.08784339174410953,0.08754560295503462,0.08724782969191733,0.08695007190033785,0.08665232952589588,0.08635460251421011,0.08605689081091907,0.08575919436168021,0.08546151311217037,0.08516384700808512,0.08486619599513939,0.08456856001906696,0.08427093902562059,0.08397333296057151,0.08367574176971003,0.08337816539884516,0.08308060379380408,0.08278305690043294,0.08248552466459613,0.08218800703217656,0.08189050394907518,0.08159301536121144,0.08129554121452287,0.08099808145496519,0.08070063602851182,0.08040320488115452,0.0801057879589027,0.07980838520778383,0.07951099657384272,0.07921362200314215,0.07891626144176248,0.07861891483580159,0.07832158213137465,0.0780242632746144,0.07772695821167094,0.07742966688871136,0.07713238925192019,0.07683512524749896,0.07653787482166631,0.07624063792065765,0.07594341449072552,0.07564620447813913,0.07534900782918469,0.07505182449016463,0.07475465440739845,0.07445749752722203,0.07416035379598782,0.07386322316006434,0.0735661055658369,0.07326900095970693,0.07297190928809175,0.07267483049742528,0.07237776453415723,0.07208071134475345,0.07178367087569547,0.07148664307348093,0.07118962788462314,0.07089262525565121,0.07059563513310965,0.07029865746355887,0.07000169219357459,0.06970473926974813,0.0694077986386859,0.0691108702470098,0.06881395404135716,0.06851704996837998,0.0682201579747458,0.06792327800713698,0.06762641001225098,0.06732955393679982,0.06703270972751077,0.06673587733112557,0.06643905669440085,0.06614224776410753,0.06584545048703142,0.06554866480997265,0.06525189067974589,0.06495512804317982,0.06465837684711775,0.06436163703841714,0.06406490856394935,0.0637681913706001,0.06347148540526895,0.06317479061486952,0.0628781069463291,0.0625814343465889,0.06228477276260394,0.06198812214134286,0.061691482429787683,0.06139485357493426,0.061098235523791726,0.06080162822338282,0.060505031620743215,0.06020844566292218,0.0599118702969822,0.05961530546999856,0.05931875112905987,0.05902220722126769,0.05872567369373655,0.05842915049359359,0.058132637567978984,0.05783613486404557,0.05753964232895888,0.057243159909896826,0.05694668755405007,0.056650225208621625,0.056353772820827035,0.05605733033789384,0.05576089770706212,0.05546447487558415,0.05516806179072403,0.05487165839975821,0.05457526464997504,0.054278880488674866,0.053982505863169564,0.05368614072078319,0.0533897850088513,0.05309343867472127,0.05279710166575177,0.05250077392931329,0.05220445541278759,0.05190814606356807,0.051611845829058985,0.05131555465667629,0.05101927249384703,0.0507229992880091,0.05042673498661178,0.05013047953711522,0.04983423288699058,0.0495379949837196,0.04924176577479512,0.048945545207720556,0.04864933323001015,0.0483531297891884,0.048056934832790624,0.04776074830836254,0.047464570163460354,0.047168400345650265,0.04687223880250907,0.046576085481623786,0.04627994033059121,0.045983803297018566,0.04568767432852293,0.045391553372731444,0.04509544037728083,0.04479933528981788,0.04450323805799908,0.04420714862949063,0.04391106695196809,0.04361499297311686,0.04331892664063168,0.043022867902216835,0.042726816705585674,0.042430772998461104,0.042134736728575234,0.04183870784366908,0.041542686291493,0.04124667201980631,0.04095066497637733,0.04065466510898304,0.0403586723654095,0.04006268669345145,0.03976670804091243,0.039470736355604295,0.0391747715853478,0.038878813677972086,0.03858286258131481,0.03828691824322174,0.03799098061154723,0.037695049634153883,0.03739912525891219,0.03710320743370103,0.03680729610640727,0.036511391224925825,0.03621549273715924,0.03591960059101824,0.03562371473442121,0.03532783511529437,0.03503196168157131,0.03473609438119351,0.03444023316210988,0.03414437797227691,0.033848528759658186,0.03355268547222492,0.03325684805795562,0.032961016464835693,0.032665190640857995,0.03236937053402236,0.03207355609233577,0.03177774726381179,0.03148194399647123,0.031186146238341622,0.030890353937457336,0.030594567041859148,0.03029878549959478,0.03000300925871839,0.029707238267290756,0.02941147247337881,0.02911571182505614,0.028819956270402625,0.028524205757504157,0.02822846023445305,0.027932719649347647,0.027636983950292467,0.027341253085397695,0.027045527002779776,0.026749805650560895,0.026454088976869104,0.026158376929837964,0.02586266945760695,0.02556696650832107,0.025271268030130946,0.024975573971192423,0.02467988427966703,0.024384198903721652,0.02408851779152817,0.023792840891263992,0.02349716815111156,0.023201499519258557,0.02290583494389736,0.022610174373225624,0.022314517755445826,0.022018865038765368,0.021723216171396144,0.021427571101555035,0.021131929777463518,0.02083629214734771,0.02054065815943798,0.020245027761969455,0.019949400903181643,0.0196537775313181,0.019358157594626956,0.019062541041360417,0.018766927819774955,0.018471317878130833,0.018175711164692594,0.01788010762772866,0.01758450721551143,0.017288909876316833,0.016993315558424857,0.01669772421011908,0.016402135779686824,0.01610655021541868,0.015810967465609053,0.015515387478555772,0.01521981020255977,0.014924235585925587,0.014628663576960908,0.014333094123976724,0.01403752717528685,0.013741962679208453,0.013446400584061621,0.013150840838169453,0.012855283389857653,0.012559728187455012,0.012264175179292975,0.011968624313705774,0.011673075539029958,0.011377528803604941,0.011081984055772614,0.01078644124387702,0.010490900316264864,0.010195361221285048,0.009899823907288819,0.009604288322629304,0.009308754415662044,0.00901322213474453,0.008717691428236345,0.008422162244498701,0.008126634531894958,0.007831108238790185,0.007535583313551294,0.007240059704546553,0.0069445373601461505,0.006649016228721818,0.0063534962586464724,0.00605797739829475,0.005762459596042539,0.005466942800267128,0.005171426959346736,0.004875912021661046,0.004580397935590741,0.004284884649517657,0.0039893721118243,0.003693860270894393,0.0033983490751124117,0.0031028384728637153,0.002807328412534099,0.0025118188425103105,0.0022163097111797016,0.0019208009669298611,0.0016252925581491488,0.0013297844332262358,0.001034276540550238,0.0007387688285102604,0.0004432612454959242,0.0001477537398969097,-0.0001477537398969097,-0.0004432612454960226,-0.0007387688285102604,-0.0010342765405501396,-0.0013297844332263342,-0.0016252925581491488,-0.0019208009669297625,-0.0022163097111797016,-0.0025118188425103105,-0.0028073284125340004,-0.0031028384728637153,-0.0033983490751124117,-0.0036938602708944915,-0.0039893721118243,-0.004284884649517558,-0.004580397935590839,-0.004875912021661046,-0.0051714269593466375,-0.005466942800267128,-0.005762459596042539,-0.006057977398294848,-0.0063534962586464724,-0.006649016228721719,-0.006944537360146249,-0.007240059704546553,-0.007535583313551195,-0.007831108238790284,-0.008126634531894958,-0.008422162244498602,-0.008717691428236345,-0.00901322213474453,-0.00930875441566214,-0.009604288322629304,-0.00989982390728872,-0.010195361221285146,-0.010490900316264864,-0.010786441243876923,-0.011081984055772614,-0.011377528803604941,-0.01167307553902986,-0.011968624313705774,-0.012264175179292975,-0.012559728187455111,-0.012855283389857653,-0.013150840838169357,-0.01344640058406172,-0.013741962679208453,-0.014037527175286751,-0.014333094123976724,-0.014628663576960908,-0.014924235585925684,-0.01521981020255977,-0.015515387478555673,-0.01581096746560915,-0.01610655021541868,-0.016402135779686727,-0.016697724210119176,-0.016993315558424857,-0.017288909876316736,-0.01758450721551143,-0.01788010762772866,-0.01817571116469269,-0.018471317878130833,-0.01876692781977486,-0.019062541041360518,-0.019358157594626956,-0.019653777531318004,-0.019949400903181643,-0.020245027761969455,-0.020540658159437883,-0.02083629214734771,-0.021131929777463518,-0.021427571101555132,-0.021723216171396144,-0.022018865038765267,-0.022314517755445924,-0.022610174373225624,-0.022905834943897255,-0.023201499519258557,-0.02349716815111156,-0.02379284089126409,-0.02408851779152817,-0.02438419890372156,-0.02467988427966713,-0.024975573971192423,-0.02527126803013085,-0.025566966508321166,-0.02586266945760695,-0.026158376929837867,-0.026454088976869104,-0.026749805650560895,-0.027045527002779873,-0.027341253085397695,-0.02763698395029237,-0.027932719649347744,-0.02822846023445305,-0.028524205757504056,-0.028819956270402625,-0.02911571182505614,-0.02941147247337871,-0.029707238267290756,-0.03000300925871839,-0.030298785499594878,-0.030594567041859148,-0.03089035393745724,-0.031186146238341723,-0.03148194399647123,-0.03177774726381169,-0.03207355609233577,-0.03236937053402236,-0.03266519064085809,-0.032961016464835693,-0.03325684805795552,-0.033552685472225015,-0.033848528759658186,-0.03414437797227681,-0.03444023316210998,-0.03473609438119351,-0.0350319616815712,-0.03532783511529437,-0.03562371473442121,-0.035919600591018334,-0.03621549273715924,-0.03651139122492573,-0.036807296106407365,-0.03710320743370103,-0.03739912525891209,-0.037695049634153883,-0.03799098061154723,-0.03828691824322163,-0.03858286258131481,-0.038878813677972086,-0.0391747715853479,-0.039470736355604295,-0.03976670804091233,-0.040062686693451546,-0.0403586723654095,-0.04065466510898294,-0.04095066497637733,-0.04124667201980631,-0.041542686291493096,-0.04183870784366908,-0.04213473672857514,-0.0424307729984612,-0.042726816705585674,-0.04302286790221674,-0.04331892664063178,-0.04361499297311686,-0.043911066951967996,-0.04420714862949063,-0.04450323805799908,-0.04479933528981799,-0.04509544037728083,-0.04539155337273134,-0.045687674328523026,-0.045983803297018566,-0.046279940330591116,-0.046576085481623786,-0.04687223880250907,-0.04716840034565036,-0.047464570163460354,-0.04776074830836254,-0.04805693483279072,-0.0483531297891884,-0.04864933323001005,-0.04894554520772065,-0.04924176577479512,-0.049537994983719504,-0.04983423288699058,-0.05013047953711522,-0.050426734986611876,-0.0507229992880091,-0.05101927249384693,-0.051315554656676386,-0.051611845829058985,-0.05190814606356797,-0.05220445541278769,-0.05250077392931329,-0.052797101665751675,-0.05309343867472127,-0.0533897850088513,-0.05368614072078329,-0.053982505863169564,-0.054278880488674755,-0.05457526464997514,-0.05487165839975821,-0.05516806179072393,-0.05546447487558415,-0.05576089770706212,-0.05605733033789394,-0.056353772820827035,-0.056650225208621625,-0.05694668755405018,-0.057243159909896826,-0.057539642328958786,-0.057836134864045666,-0.058132637567978984,-0.05842915049359349,-0.05872567369373655,-0.05902220722126769,-0.05931875112905997,-0.05961530546999856,-0.059911870296982105,-0.06020844566292228,-0.060505031620743215,-0.060801628223382725,-0.061098235523791844,-0.06139485357493426,-0.061691482429787586,-0.06198812214134286,-0.06228477276260394,-0.06258143434658901,-0.0628781069463291,-0.06317479061486943,-0.06347148540526905,-0.0637681913706001,-0.06406490856394925,-0.06436163703841714,-0.06465837684711775,-0.06495512804317992,-0.06525189067974589,-0.06554866480997265,-0.06584545048703151,-0.06614224776410753,-0.06643905669440076,-0.06673587733112567,-0.06703270972751077,-0.06732955393679975,-0.06762641001225098,-0.06792327800713698,-0.0682201579747459,-0.06851704996837998,-0.06881395404135707,-0.0691108702470099,-0.0694077986386859,-0.06970473926974803,-0.07000169219357469,-0.07029865746355887,-0.07059563513310955,-0.07089262525565121,-0.07118962788462314,-0.07148664307348103,-0.07178367087569547,-0.07208071134475334,-0.07237776453415733,-0.07267483049742528,-0.07297190928809165,-0.07326900095970693,-0.0735661055658369,-0.07386322316006444,-0.07416035379598782,-0.07445749752722203,-0.07475465440739855,-0.07505182449016463,-0.07534900782918458,-0.07564620447813923,-0.07594341449072552,-0.07624063792065755,-0.07653787482166631,-0.07683512524749896,-0.07713238925192029,-0.07742966688871136,-0.07772695821167085,-0.0780242632746145,-0.07832158213137465,-0.0786189148358015,-0.07891626144176257,-0.07921362200314215,-0.07951099657384263,-0.07980838520778383,-0.0801057879589027,-0.0804032048811546,-0.08070063602851182,-0.08099808145496509,-0.08129554121452295,-0.08159301536121144,-0.08189050394907509,-0.08218800703217656,-0.08248552466459613,-0.08278305690043304,-0.08308060379380408,-0.08337816539884504,-0.08367574176971013,-0.08397333296057151,-0.0842709390256205,-0.08456856001906705,-0.08486619599513939,-0.085163847008085,-0.08546151311217037,-0.08575919436168021,-0.08605689081091916,-0.08635460251421011,-0.08665232952589573,-0.08695007190033795,-0.08724782969191733,-0.08754560295503452,-0.08784339174410953,-0.08814119611358141,-0.08843901611790925,-0.08873685181157198,-0.08903470324906758,-0.08933257048491466,-0.08963045357365092,-0.08992835256983464,-0.09022626752804414,-0.09052419850287714,-0.09082214554895236,-0.09112010872090856,-0.09141808807340432,-0.09171608366111944,-0.09201409553875334,-0.09231212376102663,-0.09261016838268049,-0.09290822945847618,-0.09320630704319638,-0.09350440119164466,-0.09380251195864474,-0.09410063939904208,-0.09439878356770309,-0.0946969445195148,-0.09499512230938613,-0.09529331699224661,-0.09559152862304764,-0.0958897572567621,-0.09618800294838374,-0.09648626575292853,-0.09678454572543398,-0.09708284292095878,-0.09738115739458415,-0.09767948920141299,-0.09797783839656962,-0.09827620503520124,-0.09857458917247622,-0.09887299086358581,-0.0991714101637435,-0.09946984712818445,-0.09976830181216685,-0.10006677427097134,-0.1003652645599005,-0.10066377273428039,-0.10096229884945881,-0.10126084296080717,-0.10155940512371955,-0.10185798539361243,-0.1021565838259258,-0.10245520047612286,-0.10275383539968919,-0.10305248865213439,-0.10335116028899112,-0.1036498503658151,-0.10394855893818607,-0.10424728606170658,-0.10454603179200342,-0.10484479618472703,-0.10514357929555096,-0.10544238118017325,-0.10574120189431593,-0.10604004149372419,-0.10633890003416809,-0.10663777757144172,-0.10693667416136286,-0.10723558985977433,-0.10753452472254253,-0.10783347880555892,-0.10813245216473948,-0.10843144485602414,-0.10873045693537821,-0.1090294884587917,-0.10932853948227889,-0.10962761006187963,-0.10992670025365814,-0.11022581011370419,-0.11052493969813276,-0.11082408906308344,-0.11112325826472169,-0.11142244735923837,-0.11172165640284919,-0.11202088545179598,-0.11232013456234619,-0.11261940379079236,-0.11291869319345368,-0.11321800282667421,-0.11351733274682468,-0.11381668301030183,-0.11411605367352778,-0.11441544479295152,-0.11471485642504814,-0.11501428862631861,-0.11531374145329082,-0.11561321496251915,-0.11591270921058393,-0.116212224254093,-0.11651176014967998,-0.116811316954006,-0.11711089472375899,-0.11741049351565333,-0.11771011338643088,-0.11800975439286088,-0.11830941659173888,-0.1186091000398886,-0.11890880479416047,-0.1192085309114327,-0.11950827844861131,-0.11980804746262905,-0.12010783801044707,-0.12040765014905426,-0.12070748393546682,-0.12100733942672937,-0.1213072166799145,-0.12160711575212244,-0.12190703670048235,-0.12220697958215065,-0.12250694445431291,-0.12280693137418297,-0.1231069403990027,-0.12340697158604297,-0.12370702499260336,-0.12400710067601173,-0.12430719869362533,-0.1246073191028297,-0.12490746196103988,-0.12520762732569984,-0.1255078152542824,-0.12580802580428999,-0.12610825903325432,-0.12640851499873607,-0.1267087937583259,-0.12700909536964403,-0.12730941989033964,-0.1276097673780926,-0.12791013789061176,-0.12821053148563638,-0.12851094822093564,-0.1288113881543084,-0.12911185134358405,-0.12941233784662234,-0.1297128477213126,-0.13001338102557533,-0.13031393781736136,-0.13061451815465158,-0.1309151220954582,-0.13121574969782349,-0.13151640101982115,-0.13181707611955565,-0.13211777505516192,-0.13241849788480653,-0.13271924466668733,-0.1330200154590326,-0.1333208103201029,-0.13362162930818938,-0.13392247248161518,-0.1342233398987352,-0.13452423161793517,-0.13482514769763343,-0.13512608819627994,-0.13542705317235623,-0.1357280426843761,-0.1360290567908857,-0.13633009555046274,-0.1366311590217179,-0.1369322472632935,-0.1372333603338649,-0.1375344982921398,-0.1378356611968582,-0.1381368491067932,-0.1384380620807509,-0.13873930017756933,-0.13904056345612043,-0.13934185197530902,-0.13964316579407243,-0.13994450497138208,-0.14024586956624197,-0.1405472596376899,-0.14084867524479736,-0.14115011644666867,-0.1414515833024426,-0.1417530758712914,-0.14205459421242084,-0.1423561383850712,-0.1426577084485161,-0.14295930446206387,-0.14326092648505695,-0.14356257457687158,-0.1438642487969189,-0.14416594920464443,-0.14446767585952788,-0.14476942882108396,-0.14507120814886226,-0.14537301390244659,-0.1456748461414563,-0.1459767049255451,-0.14627859031440246,-0.14658050236775289,-0.14688244114535554,-0.14718440670700564,-0.1474863991125338,-0.14778841842180568,-0.14809046469472298,-0.14839253799122337,-0.14869463837127955,-0.14899676589490088,-0.14929892062213218,-0.1496011026130547,-0.1499033119277861,-0.15020554862647947,-0.15050781276932504,-0.15081010441654946,-0.15111242362841523,-0.1514147704652225,-0.15171714498730715,-0.15201954725504266,-0.15232197732883918,-0.15262443526914354,-0.15292692113644024,-0.15322943499125072,-0.15353197689413345,-0.15383454690568465,-0.15413714508653825,-0.15443977149736482,-0.15474242619887368,-0.1550451092518109,-0.15534782071696132,-0.15565056065514735,-0.1559533291272291,-0.15625612619410525,-0.15655895191671285,-0.15686180635602665,-0.15716468957306037,-0.15746760162886625,-0.1577705425845345,-0.158073512501195,-0.15837651144001547,-0.15867953946220315,-0.15898259662900432,-0.1592856830017038,-0.159588798641626,-0.15989194361013484,-0.1601951179686328,-0.16049832177856296,-0.16080155510140673,-0.16110481799868612,-0.16140811053196275,-0.16171143276283753,-0.16201478475295206,-0.16231816656398773,-0.16262157825766566,-0.1629250198957478,-0.16322849154003644,-0.16353199325237372,-0.16383552509464303,-0.16413908712876776,-0.16444267941671253,-0.1647463020204828,-0.1650499550021244,-0.16535363842372489,-0.16565735234741266,-0.16596109683535706,-0.16626487194976924,-0.1665686777529017,-0.16687251430704805,-0.16717638167454418,-0.167480279917767,-0.16778420909913563,-0.16808816928111156,-0.16839216052619735,-0.16869618289693836,-0.16900023645592221,-0.16930432126577824,-0.16960843738917916,-0.16991258488883912,-0.17021676382751572,-0.17052097426800925,-0.1708252162731623,-0.1711294899058609,-0.1714337952290341,-0.17173813230565352,-0.17204250119873474,-0.17234690197133662,-0.17265133468656074,-0.1729557994075533,-0.17326029619750297,-0.1735648251196431,-0.1738693862372508,-0.17417397961364658,-0.1744786053121956,-0.17478326339630706,-0.17508795392943402,-0.17539267697507446,-0.17569743259677081,-0.17600222085810946,-0.1763070418227224,-0.17661189555428544,-0.17691678211652015,-0.17722170157319278,-0.1775266539881144,-0.1778316394251417,-0.17813665794817685,-0.17844170962116662,-0.1787467945081043,-0.1790519126730279,-0.17935706418002192,-0.1796622490932165,-0.17996746747678732,-0.18027271939495668,-0.180578004911993,-0.18088332409221042,-0.18118867699997007,-0.1814940636996795,-0.1817994842557923,-0.18210493873280967,-0.18241042719527867,-0.18271594970779384,-0.18302150633499706,-0.18332709714157636,-0.1836327221922679,-0.18393838155185502,-0.1842440752851681,-0.1845498034570855,-0.18485556613253326,-0.18516136337648498,-0.1854671952539624,-0.18577306183003495,-0.18607896316982045,-0.18638489933848526,-0.18669087040124313,-0.1869968764233572,-0.18730291747013886,-0.1876089936069479,-0.18791510489919344,-0.18822125141233273,-0.18852743321187276,-0.18883365036336955,-0.18913990293242772,-0.18944619098470192,-0.18975251458589618,-0.19005887380176348,-0.19036526869810716,-0.19067169934078038,-0.19097816579568544,-0.19128466812877568,-0.19159120640605348,-0.19189778069357238,-0.19220439105743614,-0.19251103756379837,-0.19281772027886376,-0.19312443926888803,-0.19343119460017677,-0.19373798633908734,-0.19404481455202804,-0.19435167930545755,-0.19465858066588712,-0.19496551869987813,-0.19527249347404418,-0.19557950505505073,-0.19588655350961376,-0.19619363890450267,-0.19650076130653787,-0.19680792078259204,-0.19711511739959012,-0.19742235122450924,-0.19772962232437918,-0.19803693076628234,-0.19834427661735335,-0.19865165994478,-0.19895908081580319,-0.19926653929771612,-0.19957403545786578,-0.19988156936365237,-0.20018914108252905,-0.20049675068200318,-0.20080439822963475,-0.20111208379303847,-0.20141980743988247,-0.2017275692378887,-0.20203536925483362,-0.20234320755854782,-0.2026510842169157,-0.20295899929787684,-0.20326695286942517,-0.20357494499960901,-0.20388297575653214,-0.20419104520835232,-0.2044991534232834,-0.20480730046959414,-0.20511548641560795,-0.20542371132970444,-0.20573197528031886,-0.20604027833594127,-0.20634862056511857,-0.20665700203645257,-0.20696542281860197,-0.20727388298028168,-0.20758238259026193,-0.2078909217173703,-0.20819950043049082,-0.2085081187985637,-0.20881677689058642,-0.20912547477561336,-0.2094342125227554,-0.20974299020118164,-0.21005180788011718,-0.21036066562884556,-0.21066956351670765,-0.21097850161310164,-0.2112874799874838,-0.2115964987093687,-0.21190555784832785,-0.21221465747399235,-0.21252379765605042,-0.21283297846424948,-0.21314219996839553,-0.21345146223835257,-0.213760765344044,-0.21407010935545248,-0.2143794943426188,-0.21468892037564366,-0.21499838752468725,-0.2153078958599684,-0.21561744545176673,-0.2159270363704202,-0.2162366686863279,-0.21654634246994853,-0.21685605779180017,-0.21716581472246224,-0.21747561333257412,-0.21778545369283542,-0.2180953358740068,-0.21840525994690968,-0.21871522598242601,-0.21902523405149943,-0.21933528422513401,-0.2196453765743958,-0.2199555111704121,-0.22026568808437136,-0.2205759073875243,-0.22088616915118367,-0.22119647344672327,-0.22150682034558009,-0.22181720991925252,-0.22212764223930173,-0.22243811737735178,-0.2227486354050886,-0.22305919639426133,-0.2233698004166825,-0.2236804475442266,-0.22399113784883248,-0.2243018714025017,-0.22461264827729935,-0.22492346854535442,-0.2252343322788592,-0.2255452395500703,-0.2258561904313083,-0.2261671849949576,-0.22647822331346723,-0.2267893054593511,-0.22710043150518652,-0.22741160152361653,-0.22772281558734897,-0.22803407376915602,-0.22834537614187594,-0.22865672277841115,-0.22896811375173065,-0.2292795491348686,-0.2295910290009243,-0.22990255342306354,-0.2302141224745182,-0.23052573622858585,-0.23083739475863066,-0.2311490981380829,-0.23146084644043968,-0.23177263973926504,-0.23208447810818927,-0.23239636162090999,-0.23270829035119223,-0.2330202643728677,-0.23333228375983606,-0.23364434858606445,-0.23395645892558742,-0.2342686148525079,-0.2345808164409963,-0.23489306376529145,-0.2352053568997008,-0.23551769591859953,-0.23583008089643204,-0.23614251190771127,-0.23645498902701895,-0.23676751232900603,-0.23708008188839272,-0.23739269777996805,-0.2377053600785915,-0.2380180688591909,-0.23833082419676502,-0.23864362616638224,-0.23895647484318044,-0.2392693703023686,-0.2395823126192256,-0.23989530186910082,-0.2402083381274148,-0.24052142146965816,-0.2408345519713931,-0.24114772970825316,-0.24146095475594226,-0.24177422719023664,-0.24208754708698396,-0.24240091452210324,-0.2427143295715857,-0.24302779231149504,-0.24334130281796618,-0.24365486116720747,-0.24396846743549888,-0.2442821216991937,-0.24459582403471788,-0.24490957451857018,-0.24522337322732268,-0.24553722023762106,-0.24585111562618372,-0.2461650594698032,-0.24647905184534608,-0.24679309282975195,-0.24710718250003563,-0.24742132093328514,-0.2477355082066635,-0.24804974439740854,-0.24836402958283202,-0.24867836384032116,-0.24899274724733853,-0.2493071798814208,-0.24962166182018108,-0.24993619314130752,-0.25025077392256395,-0.25056540424179063,-0.2508800841769026,-0.2511948138058924,-0.25150959320682836,-0.25182442245785486,-0.2521393016371936,-0.2524542308231431,-0.2527692100940784,-0.2530842395284521,-0.25339931920479364,-0.25371444920171055,-0.2540296295978878,-0.2543448604720878,-0.25466014190315145,-0.2549754739699978,-0.25529085675162355,-0.25560629032710463,-0.25592177477559536,-0.2562373101763285,-0.2565528966086166,-0.2568685341518504,-0.2571842228855007,-0.25749996288911775,-0.2578157542423307,-0.25813159702484956,-0.2584474913164639,-0.2587634371970429,-0.2590794347465371,-0.2593954840449766,-0.25971158517247284,-0.260027738209218,-0.2603439432354849,-0.26066020033162796,-0.26097650957808294,-0.26129287105536686,-0.26160928484407864,-0.26192575102489946,-0.26224226967859166,-0.26255884088600084,-0.26287546472805395,-0.2631921412857616,-0.26350887064021666,-0.26382565287259446,-0.2641424880641544,-0.26445937629623884,-0.26477631765027293,-0.2650933122077664,-0.26541036005031254,-0.2657274612595882,-0.2660446159173551,-0.2663618241054587,-0.26667908590582934,-0.26699640140048225,-0.26731377067151696,-0.2676311938011187,-0.26794867087155794,-0.26826620196519,-0.26858378716445647,-0.26890142655188426,-0.26921912021008654,-0.26953686822176304,-0.2698546706696988,-0.2701725276367665,-0.2704904392059251,-0.27080840546022006,-0.27112642648278457,-0.27144450235683903,-0.2717626331656908,-0.2720808189927357,-0.27239905992145635,-0.2727173560354243,-0.27303570741829913,-0.27335411415382826,-0.2736725763258484,-0.2739910940182849,-0.2743096673151516,-0.27462829630055197,-0.274946981058679,-0.27526572167381436,-0.2755845182303305,-0.2759033708126888,-0.27622227950544154,-0.276541244393231,-0.2768602655607899,-0.2771793430929416,-0.27749847707460085,-0.2778176675907724,-0.27813691472655355,-0.27845621856713193,-0.2787755791977876,-0.2790949967038924,-0.2794144711709095,-0.2797340026843953,-0.28005359132999813,-0.2803732371934588,-0.28069294036061115,-0.28101270091738245,-0.2813325189497923,-0.28165239454395474,-0.2819723277860764,-0.28229231876245847,-0.28261236755949626,-0.28293247426367873,-0.28325263896158953,-0.2835728617399072,-0.28389314268540466,-0.2842134818849501,-0.2845338794255071,-0.28485433539413435,-0.2851748498779864,-0.28549542296431346,-0.2858160547404619,-0.28613674529387473,-0.2864574947120906,-0.28677830308274527,-0.287099170493572,-0.2874200970323997,-0.28774108278715604,-0.28806212784586493,-0.288383232296649,-0.28870439622772837,-0.2890256197274209,-0.28934690288414333,-0.28966824578641115,-0.28998964852283754,-0.29031111118213565,-0.2906326338531176,-0.29095421662469456,-0.2912758595858776,-0.2915975628257773,-0.29191932643360463,-0.2922411504986708,-0.29256303511038667,-0.2928849803582649,-0.29320698633191855,-0.29352905312106137,-0.29385118081550915,-0.2941733695051785,-0.2944956192800883,-0.2948179302303594,-0.29514030244621436,-0.2954627360179784,-0.2957852310360798,-0.2961077875910488,-0.2964304057735193,-0.29675308567422853,-0.2970758273840168,-0.2973986309938285,-0.2977214965947117,-0.2980444242778188,-0.2983674141344068,-0.29869046625583673,-0.2990135807335749,-0.29933675765919304,-0.2996599971243669,-0.2999832992208791,-0.30030666404061745,-0.3006300916755755,-0.3009535822178534,-0.3012771357596573,-0.3016007523933004,-0.3019244322112028,-0.30224817530589115,-0.30257198177000005,-0.3028958516962716,-0.303219785177555,-0.3035437823068085,-0.3038678431770978,-0.30419196788159747,-0.30451615651359115,-0.3048404091664704,-0.3051647259337369,-0.3054891069090018,-0.305813552185985,-0.30613806185851716,-0.306462636020539,-0.30678727476610107,-0.30711197818936525,-0.30743674638460355,-0.3077615794461995,-0.3080864774686481,-0.3084114405465554,-0.3087364687746396,-0.30906156224773124,-0.3093867210607722,-0.30971194530881785,-0.31003723508703623,-0.3103625904907076,-0.31068801161522636,-0.3110134985560999,-0.31133905140894946,-0.3116646702695109,-0.31199035523363294,-0.3123161063972801,-0.31264192385653133,-0.31296780770757976,-0.31329375804673504,-0.31361977497042104,-0.31394585857517815,-0.31427200895766283,-0.31459822621464695,-0.31492451044301956,-0.3152508617397865,-0.31557728020206993,-0.31590376592710984,-0.3162303190122637,-0.31655693955500624,-0.3168836276529309,-0.3172103834037483,-0.3175372069052888,-0.3178640982555009,-0.318191057552452,-0.3185180848943288,-0.31884518037943826,-0.31917234410620615,-0.31949957617317876,-0.319826876679023,-0.3201542457225256,-0.3204816834025948,-0.3208091898182595,-0.3211367650686703,-0.32146440925309944,-0.32179212247094047,-0.3221199048217099,-0.32244775640504636,-0.32277567732071066,-0.3231036676685875,-0.32343172754868377,-0.3237598570611307,-0.32408805630618315,-0.32441632538421933,-0.32474466439574257,-0.3250730734413805,-0.3254015526218852,-0.3257301020381343,-0.326058721791131,-0.32638741198200344,-0.32671617271200626,-0.32704500408251996,-0.327373906195052,-0.32770287915123625,-0.3280319230528333,-0.32836103800173166,-0.32869022409994736,-0.3290194814496236,-0.3293488101530326,-0.3296782103125746,-0.3300076820307784,-0.33033722541030214,-0.3306668405539327,-0.33099652756458714,-0.3313262865453121,-0.33165611759928404,-0.33198602082981005,-0.33231599634032827,-0.33264604423440713,-0.3329761646157469,-0.3333063575881787,-0.33363662325566634,-0.33396696172230556,-0.33429737309232355,-0.33462785747008145,-0.334958414960073,-0.33528904566692475,-0.33561974969539715,-0.335950527150385,-0.3362813781369164,-0.3366123027601546,-0.33694330112539694,-0.3372743733380765,-0.3376055195037616,-0.3379367397281555,-0.33826803411709816,-0.33859940277656564,-0.3389308458126702,-0.33926236333166127,-0.33959395543992543,-0.3399256222439862,-0.3402573638505058,-0.3405891803662835,-0.3409210718982573,-0.3412530385535045,-0.34158508043924,-0.3419171976628192,-0.34224939033173674,-0.34258165855362666,-0.34291400243626396,-0.34324642208756334,-0.3435789176155808,-0.3439114891285139,-0.3442441367347004,-0.3445768605426208,-0.3449096606608979,-0.34524253719829556,-0.34557549026372164,-0.34590851996622657,-0.3462416264150036,-0.34657480971939064,-0.3469080699888685,-0.3472414073330629,-0.34757482186174443,-0.34790831368482766,-0.34824188291237296,-0.34857552965458677,-0.34890925402182016,-0.34924305612457157,-0.34957693607348567,-0.3499108939793534,-0.35024492995311385,-0.3505790441058526,-0.3509132365488038,-0.35124750739334976,-0.3515818567510208,-0.3519162847334964,-0.3522507914526056,-0.35258537702032583,-0.35292004154878553,-0.3532547851502624,-0.35358960793718514,-0.35392451002213354,-0.3542594915178376,-0.3545945525371798,-0.354929693193194,-0.35526491359906615,-0.3556002138681349,-0.3559355941138922,-0.3562710544499821,-0.3566065949902033,-0.35694221584850766,-0.3572779171390017,-0.3576136989759466,-0.3579495614737578,-0.35828550474700666,-0.3586215289104201,-0.3589576340788806,-0.35929382036742746,-0.35963008789125656,-0.35996643676572015,-0.36030286710632875,-0.3606393790287502,-0.3609759726488101,-0.3613126480824936,-0.361649405445943,-0.361986244855461,-0.36232316642750984,-0.36266017027871056,-0.36299725652584547,-0.3633344252858568,-0.3636716766758483,-0.36400901081308484,-0.36434642781499244,-0.3646839277991598,-0.3650215108833383,-0.3653591771854407,-0.3656969268235444,-0.36603475991588974,-0.3663726765808805,-0.3667106769370857,-0.36704876110323775,-0.3673869291982352,-0.3677251813411414,-0.3680635176511851,-0.368401938247762,-0.3687404432504338,-0.3690790327789289,-0.3694177069531433,-0.36975646589314076,-0.37009530971915205,-0.3704342385515778,-0.37077325251098614,-0.37111235171811496,-0.371451536293872,-0.3717908063593338,-0.37213016203574856,-0.3724696034445342,-0.37280913070728,-0.373148743945747,-0.37348844328186753,-0.37382822883774663,-0.3741681007356621,-0.37450805909806406,-0.37484810404757685,-0.3751882357069985,-0.3755284541993006,-0.37586875964763,-0.37620915217530876,-0.37654963190583357,-0.3768901989628778,-0.37723085347029006,-0.3775715955520966,-0.37791242533250036,-0.37825334293588125,-0.37859434848679735,-0.37893544210998564,-0.3792766239303604,-0.37961789407301605,-0.37995925266322644,-0.3803006998264443,-0.38064223568830413,-0.38098386037462,-0.3813255740113875,-0.38166737672478407,-0.3820092686411684,-0.38235124988708236,-0.3826933205892502,-0.3830354808745792,-0.383377730870161,-0.3837200707032702,-0.3840625005013669,-0.384405020392096,-0.3847476305032869,-0.3850903309629558,-0.38543312189930473,-0.3857760034407219,-0.38611897571578313,-0.38646203885325187,-0.3868051929820787,-0.38714843823140355,-0.38749177473055424,-0.38783520260904847,-0.38817872199659337,-0.38852233302308614,-0.38886603581861456,-0.38920983051345764,-0.38955371723808535,-0.3898976961231601,-0.3902417672995361,-0.39058593089826066,-0.3909301870505744,-0.391274535887911,-0.391618977541899,-0.39196351214436154,-0.3923081398273158,-0.39265286072297556,-0.39299767496375004,-0.39334258268224453,-0.3936875840112621,-0.3940326790838019,-0.39437786803306213,-0.3947231509924384,-0.3950685280955248,-0.39541399947611533,-0.3957595652682036,-0.39610522560598244,-0.3964509806238459,-0.3967968304563893,-0.39714277523840863,-0.3974888151049027,-0.3978349501910721,-0.39818118063232066,-0.39852750656425584,-0.3988739281226882,-0.39922044544363344,-0.39956705866331227,-0.39991376791814937,-0.4002605733447767,-0.4006074750800316,-0.4009544732609584,-0.4013015680248091,-0.40164875950904266,-0.401996047851327,-0.4023434331895384,-0.4026909156617623,-0.4030384954062937,-0.4033861725616388,-0.40373394726651285,-0.40408181965984385,-0.4044297898807703,-0.4047778580686437,-0.4051260243630281,-0.4054742889037002,-0.40582265183065114,-0.406171113284086,-0.40651967340442424,-0.4068683323323009,-0.40721709020856695,-0.407565947174289,-0.4079149033707511,-0.4082639589394537,-0.40861311402211614,-0.40896236876067554,-0.40931172329728743,-0.4096611777743272,-0.41001073233439034,-0.4103603871202918,-0.41071014227506875,-0.4110599979419787,-0.4114099542645015,-0.41176001138634005,-0.41211016945141926,-0.41246042860388826,-0.41281078898812046,-0.41316125074871335,-0.41351181403049,-0.41386247897849915,-0.4142132457380156,-0.41456411445454133,-0.414915085273805,-0.4152661583417638,-0.4156173338046034,-0.4159686118087376,-0.41631999250081086,-0.41667147602769716,-0.4170230625365007,-0.41737475217455766,-0.41772654508943563,-0.4180784414289344,-0.4184304413410869,-0.4187825449741591,-0.4191347524766512,-0.41948706399729846,-0.41983947968506985,-0.4201919996891715,-0.4205446241590455,-0.42089735324436967,-0.42125018709506085,-0.4216031258612724,-0.4219561696933972,-0.4223093187420672,-0.4226625731581534,-0.4230159330927675,-0.4233693986972626,-0.42372297012323196,-0.4240766475225121,-0.424430431047182,-0.4247843208495628,-0.42513831708222094,-0.4254924198979662,-0.4258466294498537,-0.4262009458911845,-0.4265553693755051,-0.4269099000566094,-0.4272645380885388,-0.42761928362558194,-0.42797413682227664,-0.4283290978334102,-0.42868416681401894,-0.4290393439193902,-0.4293946293050623,-0.4297500231268248,-0.43010552554072035,-0.4304611367030436,-0.4308168567703431,-0.4311726858994219,-0.43152862424733707,-0.43188467197140185,-0.4322408292291844,-0.43259709617851055,-0.4329534729774634,-0.43330995978438314,-0.43366655675786897,-0.4340232640567796,-0.43438008184023275,-0.4347370102676071,-0.4350940494985428,-0.4354511996929407,-0.4358084610109651,-0.4361658336130424,-0.4365233176598635,-0.43688091331238316,-0.43723862073182107,-0.43759644007966286,-0.43795437151766065,-0.43831241520783254,-0.43867057131246534,-0.4390288399941138,-0.43938722141560105,-0.4397457157400209,-0.4401043231307365,-0.44046304375138223,-0.44082187776586473,-0.4411808253383618,-0.44153988663332533,-0.4418990618154801,-0.4422583510498257,-0.44261775450163665,-0.4429772723364629,-0.4433369047201309,-0.44369665181874507,-0.44405651379868594,-0.444416490826614,-0.4447765830694685,-0.44513679069446815,-0.44549711386911267,-0.44585755276118305,-0.44621810753874186,-0.446578778370135,-0.44693956542399105,-0.4473004688692234,-0.44766148887503004,-0.44802262561089407,-0.44838387924658535,-0.44874524995216103,-0.4491067378979647,-0.44946834325462975,-0.44983006619307836,-0.45019190688452165,-0.45055386550046295,-0.4509159422126956,-0.45127813719330556,-0.45164045061467223,-0.4520028826494671,-0.45236543347065694,-0.4527281032515042,-0.45309089216556564,-0.4534538003866956,-0.4538168280890454,-0.45417997544706423,-0.4545432426355009,-0.4549066298294025,-0.4552701372041174,-0.45563376493529534,-0.4559975131988867,-0.4563613821711455,-0.45672537202862906,-0.45708948294819823,-0.4574537151070198,-0.45781806868256536,-0.45818254385261314,-0.4585471407952499,-0.4589118596888687,-0.4592767007121722,-0.45964166404417356,-0.4600067498641949,-0.4603719583518703,-0.4607372896871464,-0.46110274405028157,-0.461468321621849,-0.46183402258273515,-0.4621998471141425,-0.46256579539758996,-0.4629318676149119,-0.46329806394826195,-0.46366438458011144,-0.4640308296932509,-0.46439739947079156,-0.4647640940961652,-0.46513091375312543,-0.46549785862574894,-0.46586492889843534,-0.46623212475590897,-0.4665994463832193,-0.46696689396574115,-0.46733446768917697,-0.4677021677395567,-0.4680699943032384,-0.4684379475669101,-0.46880602771758956,-0.46917423494262583,-0.46954256942970035,-0.4699110313668264,-0.4702796209423517,-0.4706483383449587,-0.47101718376366436,-0.4713861573878229,-0.47175525940712526,-0.4721244900116002,-0.47249384939161615,-0.4728633377378804,-0.47323295524144177,-0.47360270209369054,-0.4739725784863588,-0.474342584611523,-0.4747127206616034,-0.47508298682936523,-0.4754533833079206,-0.47582391029072746,-0.4761945679715927,-0.4765653565446719,-0.4769362762044699],"x":[0.5,0.5003334444814939,0.5006668889629876,0.5010003334444815,0.5013337779259753,0.5016672224074692,0.5020006668889629,0.5023341113704568,0.5026675558519507,0.5030010003334445,0.5033344448149383,0.5036678892964321,0.504001333777926,0.5043347782594199,0.5046682227409136,0.5050016672224075,0.5053351117039013,0.5056685561853951,0.5060020006668889,0.5063354451483828,0.5066688896298767,0.5070023341113704,0.5073357785928643,0.5076692230743581,0.508002667555852,0.5083361120373457,0.5086695565188396,0.5090030010003335,0.5093364454818273,0.5096698899633211,0.5100033344448149,0.5103367789263088,0.5106702234078025,0.5110036678892964,0.5113371123707903,0.5116705568522841,0.5120040013337779,0.5123374458152717,0.5126708902967656,0.5130043347782595,0.5133377792597532,0.5136712237412471,0.5140046682227409,0.5143381127042348,0.5146715571857285,0.5150050016672224,0.5153384461487163,0.51567189063021,0.5160053351117039,0.5163387795931977,0.5166722240746916,0.5170056685561853,0.5173391130376792,0.5176725575191731,0.5180060020006669,0.5183394464821607,0.5186728909636545,0.5190063354451484,0.5193397799266423,0.519673224408136,0.5200066688896299,0.5203401133711237,0.5206735578526175,0.5210070023341113,0.5213404468156052,0.5216738912970991,0.5220073357785928,0.5223407802600867,0.5226742247415805,0.5230076692230744,0.5233411137045682,0.523674558186062,0.5240080026675559,0.5243414471490497,0.5246748916305435,0.5250083361120373,0.5253417805935312,0.525675225075025,0.5260086695565188,0.5263421140380127,0.5266755585195065,0.5270090030010003,0.5273424474824941,0.527675891963988,0.5280093364454819,0.5283427809269756,0.5286762254084695,0.5290096698899633,0.5293431143714572,0.529676558852951,0.5300100033344448,0.5303434478159387,0.5306768922974324,0.5310103367789263,0.5313437812604201,0.531677225741914,0.5320106702234078,0.5323441147049016,0.5326775591863955,0.5330110036678893,0.5333444481493831,0.533677892630877,0.5340113371123708,0.5343447815938647,0.5346782260753584,0.5350116705568523,0.5353451150383461,0.5356785595198399,0.5360120040013338,0.5363454484828276,0.5366788929643215,0.5370123374458152,0.5373457819273091,0.537679226408803,0.5380126708902968,0.5383461153717906,0.5386795598532844,0.5390130043347783,0.5393464488162721,0.5396798932977659,0.5400133377792597,0.5403467822607536,0.5406802267422474,0.5410136712237412,0.5413471157052351,0.5416805601867289,0.5420140046682227,0.5423474491497166,0.5426808936312104,0.5430143381127043,0.543347782594198,0.5436812270756919,0.5440146715571857,0.5443481160386796,0.5446815605201734,0.5450150050016672,0.5453484494831611,0.5456818939646549,0.5460153384461487,0.5463487829276426,0.5466822274091364,0.5470156718906302,0.547349116372124,0.5476825608536179,0.5480160053351117,0.5483494498166055,0.5486828942980994,0.5490163387795932,0.5493497832610871,0.5496832277425808,0.5500166722240747,0.5503501167055685,0.5506835611870624,0.5510170056685562,0.55135045015005,0.5516838946315439,0.5520173391130376,0.5523507835945315,0.5526842280760254,0.5530176725575192,0.553351117039013,0.5536845615205068,0.5540180060020007,0.5543514504834945,0.5546848949649883,0.5550183394464822,0.555351783927976,0.5556852284094699,0.5560186728909636,0.5563521173724575,0.5566855618539513,0.5570190063354451,0.557352450816939,0.5576858952984328,0.5580193397799267,0.5583527842614204,0.5586862287429143,0.5590196732244082,0.559353117705902,0.5596865621873958,0.5600200066688896,0.5603534511503835,0.5606868956318773,0.5610203401133711,0.561353784594865,0.5616872290763588,0.5620206735578526,0.5623541180393464,0.5626875625208403,0.5630210070023342,0.5633544514838279,0.5636878959653218,0.5640213404468156,0.5643547849283095,0.5646882294098032,0.5650216738912971,0.565355118372791,0.5656885628542848,0.5660220073357786,0.5663554518172724,0.5666888962987663,0.56702234078026,0.5673557852617539,0.5676892297432478,0.5680226742247416,0.5683561187062354,0.5686895631877292,0.5690230076692231,0.569356452150717,0.5696898966322107,0.5700233411137046,0.5703567855951984,0.5706902300766923,0.571023674558186,0.5713571190396799,0.5716905635211738,0.5720240080026675,0.5723574524841614,0.5726908969656552,0.5730243414471491,0.5733577859286428,0.5736912304101367,0.5740246748916306,0.5743581193731244,0.5746915638546182,0.575025008336112,0.5753584528176059,0.5756918972990998,0.5760253417805935,0.5763587862620874,0.5766922307435812,0.577025675225075,0.5773591197065688,0.5776925641880627,0.5780260086695566,0.5783594531510503,0.5786928976325442,0.579026342114038,0.5793597865955319,0.5796932310770256,0.5800266755585195,0.5803601200400134,0.5806935645215072,0.581027009003001,0.5813604534844948,0.5816938979659887,0.5820273424474824,0.5823607869289763,0.5826942314104702,0.583027675891964,0.5833611203734578,0.5836945648549516,0.5840280093364455,0.5843614538179394,0.5846948982994331,0.585028342780927,0.5853617872624208,0.5856952317439147,0.5860286762254084,0.5863621207069023,0.5866955651883962,0.5870290096698899,0.5873624541513838,0.5876958986328776,0.5880293431143715,0.5883627875958652,0.5886962320773591,0.589029676558853,0.5893631210403468,0.5896965655218406,0.5900300100033344,0.5903634544848283,0.5906968989663222,0.5910303434478159,0.5913637879293098,0.5916972324108036,0.5920306768922974,0.5923641213737912,0.5926975658552851,0.593031010336779,0.5933644548182727,0.5936978992997666,0.5940313437812604,0.5943647882627543,0.594698232744248,0.5950316772257419,0.5953651217072358,0.5956985661887296,0.5960320106702234,0.5963654551517172,0.5966988996332111,0.5970323441147048,0.5973657885961987,0.5976992330776926,0.5980326775591864,0.5983661220406802,0.598699566522174,0.5990330110036679,0.5993664554851618,0.5996998999666555,0.6000333444481494,0.6003667889296432,0.6007002334111371,0.6010336778926308,0.6013671223741247,0.6017005668556186,0.6020340113371123,0.6023674558186062,0.6027009003001,0.6030343447815939,0.6033677892630877,0.6037012337445815,0.6040346782260754,0.6043681227075692,0.604701567189063,0.6050350116705568,0.6053684561520507,0.6057019006335446,0.6060353451150383,0.6063687895965322,0.606702234078026,0.6070356785595198,0.6073691230410136,0.6077025675225075,0.6080360120040014,0.6083694564854951,0.608702900966989,0.6090363454484828,0.6093697899299767,0.6097032344114705,0.6100366788929643,0.6103701233744582,0.610703567855952,0.6110370123374458,0.6113704568189396,0.6117039013004335,0.6120373457819273,0.6123707902634211,0.612704234744915,0.6130376792264088,0.6133711237079026,0.6137045681893964,0.6140380126708903,0.6143714571523842,0.6147049016338779,0.6150383461153718,0.6153717905968656,0.6157052350783595,0.6160386795598533,0.6163721240413471,0.616705568522841,0.6170390130043347,0.6173724574858286,0.6177059019673224,0.6180393464488163,0.6183727909303101,0.6187062354118039,0.6190396798932978,0.6193731243747916,0.6197065688562854,0.6200400133377792,0.6203734578192731,0.620706902300767,0.6210403467822607,0.6213737912637546,0.6217072357452484,0.6220406802267422,0.622374124708236,0.6227075691897299,0.6230410136712238,0.6233744581527175,0.6237079026342114,0.6240413471157052,0.6243747915971991,0.6247082360786929,0.6250416805601867,0.6253751250416806,0.6257085695231744,0.6260420140046682,0.626375458486162,0.6267089029676559,0.6270423474491497,0.6273757919306435,0.6277092364121374,0.6280426808936312,0.628376125375125,0.6287095698566189,0.6290430143381127,0.6293764588196066,0.6297099033011003,0.6300433477825942,0.630376792264088,0.6307102367455819,0.6310436812270757,0.6313771257085695,0.6317105701900634,0.6320440146715571,0.632377459153051,0.6327109036345449,0.6330443481160387,0.6333777925975325,0.6337112370790263,0.6340446815605202,0.634378126042014,0.6347115705235078,0.6350450150050017,0.6353784594864955,0.6357119039679894,0.6360453484494831,0.636378792930977,0.6367122374124708,0.6370456818939647,0.6373791263754585,0.6377125708569523,0.6380460153384462,0.6383794598199399,0.6387129043014338,0.6390463487829277,0.6393797932644215,0.6397132377459153,0.6400466822274091,0.640380126708903,0.6407135711903968,0.6410470156718906,0.6413804601533845,0.6417139046348783,0.6420473491163722,0.6423807935978659,0.6427142380793598,0.6430476825608537,0.6433811270423474,0.6437145715238413,0.6440480160053351,0.644381460486829,0.6447149049683227,0.6450483494498166,0.6453817939313105,0.6457152384128043,0.6460486828942981,0.6463821273757919,0.6467155718572858,0.6470490163387796,0.6473824608202734,0.6477159053017673,0.6480493497832611,0.6483827942647549,0.6487162387462487,0.6490496832277426,0.6493831277092365,0.6497165721907302,0.6500500166722241,0.6503834611537179,0.6507169056352118,0.6510503501167055,0.6513837945981994,0.6517172390796933,0.6520506835611871,0.6523841280426809,0.6527175725241747,0.6530510170056686,0.6533844614871623,0.6537179059686562,0.6540513504501501,0.6543847949316439,0.6547182394131377,0.6550516838946315,0.6553851283761254,0.6557185728576193,0.656052017339113,0.6563854618206069,0.6567189063021007,0.6570523507835946,0.6573857952650883,0.6577192397465822,0.6580526842280761,0.6583861287095698,0.6587195731910637,0.6590530176725575,0.6593864621540514,0.6597199066355451,0.660053351117039,0.6603867955985329,0.6607202400800267,0.6610536845615205,0.6613871290430143,0.6617205735245082,0.662054018006002,0.6623874624874958,0.6627209069689897,0.6630543514504835,0.6633877959319773,0.6637212404134711,0.664054684894965,0.6643881293764589,0.6647215738579526,0.6650550183394465,0.6653884628209403,0.6657219073024342,0.6660553517839279,0.6663887962654218,0.6667222407469157,0.6670556852284095,0.6673891297099033,0.6677225741913971,0.668056018672891,0.6683894631543847,0.6687229076358786,0.6690563521173725,0.6693897965988663,0.6697232410803601,0.6700566855618539,0.6703901300433478,0.6707235745248417,0.6710570190063354,0.6713904634878293,0.6717239079693231,0.672057352450817,0.6723907969323107,0.6727242414138046,0.6730576858952985,0.6733911303767922,0.6737245748582861,0.6740580193397799,0.6743914638212738,0.6747249083027675,0.6750583527842614,0.6753917972657553,0.6757252417472491,0.6760586862287429,0.6763921307102367,0.6767255751917306,0.6770590196732245,0.6773924641547182,0.6777259086362121,0.6780593531177059,0.6783927975991997,0.6787262420806935,0.6790596865621874,0.6793931310436813,0.679726575525175,0.6800600200066689,0.6803934644881627,0.6807269089696566,0.6810603534511503,0.6813937979326442,0.6817272424141381,0.6820606868956319,0.6823941313771257,0.6827275758586195,0.6830610203401134,0.6833944648216072,0.683727909303101,0.6840613537845949,0.6843947982660887,0.6847282427475825,0.6850616872290763,0.6853951317105702,0.6857285761920641,0.6860620206735578,0.6863954651550517,0.6867289096365455,0.6870623541180394,0.6873957985995331,0.687729243081027,0.6880626875625209,0.6883961320440146,0.6887295765255085,0.6890630210070023,0.6893964654884962,0.68972990996999,0.6900633544514838,0.6903967989329777,0.6907302434144715,0.6910636878959653,0.6913971323774591,0.691730576858953,0.6920640213404469,0.6923974658219406,0.6927309103034345,0.6930643547849283,0.6933977992664221,0.693731243747916,0.6940646882294098,0.6943981327109037,0.6947315771923974,0.6950650216738913,0.6953984661553851,0.695731910636879,0.6960653551183728,0.6963987995998666,0.6967322440813605,0.6970656885628543,0.6973991330443481,0.697732577525842,0.6980660220073358,0.6983994664888296,0.6987329109703234,0.6990663554518173,0.6993997999333111,0.6997332444148049,0.7000666888962987,0.7004001333777926,0.7007335778592865,0.7010670223407802,0.7014004668222741,0.7017339113037679,0.7020673557852618,0.7024008002667556,0.7027342447482494,0.7030676892297433,0.703401133711237,0.7037345781927309,0.7040680226742247,0.7044014671557186,0.7047349116372124,0.7050683561187062,0.7054018006002001,0.7057352450816939,0.7060686895631877,0.7064021340446816,0.7067355785261754,0.7070690230076693,0.707402467489163,0.7077359119706569,0.7080693564521507,0.7084028009336445,0.7087362454151384,0.7090696898966322,0.7094031343781261,0.7097365788596198,0.7100700233411137,0.7104034678226075,0.7107369123041014,0.7110703567855952,0.711403801267089,0.7117372457485829,0.7120706902300767,0.7124041347115705,0.7127375791930644,0.7130710236745582,0.713404468156052,0.7137379126375458,0.7140713571190397,0.7144048016005335,0.7147382460820273,0.7150716905635212,0.715405135045015,0.7157385795265089,0.7160720240080026,0.7164054684894965,0.7167389129709903,0.7170723574524842,0.717405801933978,0.7177392464154718,0.7180726908969657,0.7184061353784594,0.7187395798599533,0.7190730243414472,0.719406468822941,0.7197399133044348,0.7200733577859286,0.7204068022674225,0.7207402467489163,0.7210736912304101,0.721407135711904,0.7217405801933978,0.7220740246748917,0.7224074691563854,0.7227409136378793,0.7230743581193732,0.7234078026008669,0.7237412470823608,0.7240746915638546,0.7244081360453485,0.7247415805268422,0.7250750250083361,0.72540846948983,0.7257419139713238,0.7260753584528176,0.7264088029343114,0.7267422474158053,0.7270756918972991,0.7274091363787929,0.7277425808602868,0.7280760253417806,0.7284094698232745,0.7287429143047682,0.7290763587862621,0.729409803267756,0.7297432477492497,0.7300766922307436,0.7304101367122374,0.7307435811937313,0.731077025675225,0.7314104701567189,0.7317439146382128,0.7320773591197066,0.7324108036012004,0.7327442480826942,0.7330776925641881,0.733411137045682,0.7337445815271757,0.7340780260086696,0.7344114704901634,0.7347449149716572,0.735078359453151,0.7354118039346449,0.7357452484161388,0.7360786928976325,0.7364121373791264,0.7367455818606202,0.7370790263421141,0.7374124708236078,0.7377459153051017,0.7380793597865956,0.7384128042680894,0.7387462487495832,0.739079693231077,0.7394131377125709,0.7397465821940646,0.7400800266755585,0.7404134711570524,0.7407469156385462,0.74108036012004,0.7414138046015338,0.7417472490830277,0.7420806935645216,0.7424141380460153,0.7427475825275092,0.743081027009003,0.7434144714904969,0.7437479159719906,0.7440813604534845,0.7444148049349784,0.7447482494164721,0.745081693897966,0.7454151383794598,0.7457485828609537,0.7460820273424474,0.7464154718239413,0.7467489163054352,0.747082360786929,0.7474158052684228,0.7477492497499166,0.7480826942314105,0.7484161387129044,0.7487495831943981,0.749083027675892,0.7494164721573858,0.7497499166388796,0.7500833611203734,0.7504168056018673,0.7507502500833612,0.7510836945648549,0.7514171390463488,0.7517505835278426,0.7520840280093365,0.7524174724908302,0.7527509169723241,0.753084361453818,0.7534178059353118,0.7537512504168056,0.7540846948982994,0.7544181393797933,0.754751583861287,0.7550850283427809,0.7554184728242748,0.7557519173057686,0.7560853617872624,0.7564188062687562,0.7567522507502501,0.757085695231744,0.7574191397132377,0.7577525841947316,0.7580860286762254,0.7584194731577193,0.758752917639213,0.7590863621207069,0.7594198066022008,0.7597532510836945,0.7600866955651884,0.7604201400466822,0.7607535845281761,0.7610870290096698,0.7614204734911637,0.7617539179726576,0.7620873624541514,0.7624208069356452,0.762754251417139,0.7630876958986329,0.7634211403801268,0.7637545848616205,0.7640880293431144,0.7644214738246082,0.764754918306102,0.7650883627875958,0.7654218072690897,0.7657552517505836,0.7660886962320773,0.7664221407135712,0.766755585195065,0.7670890296765589,0.7674224741580526,0.7677559186395465,0.7680893631210404,0.7684228076025342,0.768756252084028,0.7690896965655218,0.7694231410470157,0.7697565855285095,0.7700900300100033,0.7704234744914972,0.770756918972991,0.7710903634544848,0.7714238079359786,0.7717572524174725,0.7720906968989664,0.7724241413804601,0.772757585861954,0.7730910303434478,0.7734244748249417,0.7737579193064354,0.7740913637879293,0.7744248082694232,0.7747582527509169,0.7750916972324108,0.7754251417139046,0.7757585861953985,0.7760920306768923,0.7764254751583861,0.77675891963988,0.7770923641213738,0.7774258086028676,0.7777592530843614,0.7780926975658553,0.7784261420473492,0.7787595865288429,0.7790930310103368,0.7794264754918306,0.7797599199733244,0.7800933644548182,0.7804268089363121,0.780760253417806,0.7810936978992997,0.7814271423807936,0.7817605868622874,0.7820940313437813,0.782427475825275,0.7827609203067689,0.7830943647882628,0.7834278092697566,0.7837612537512504,0.7840946982327442,0.7844281427142381,0.7847615871957319,0.7850950316772257,0.7854284761587196,0.7857619206402134,0.7860953651217072,0.786428809603201,0.7867622540846949,0.7870956985661888,0.7874291430476825,0.7877625875291764,0.7880960320106702,0.7884294764921641,0.7887629209736579,0.7890963654551517,0.7894298099366456,0.7897632544181393,0.7900966988996332,0.790430143381127,0.7907635878626209,0.7910970323441147,0.7914304768256085,0.7917639213071024,0.7920973657885962,0.79243081027009,0.7927642547515839,0.7930976992330777,0.7934311437145716,0.7937645881960653,0.7940980326775592,0.794431477159053,0.7947649216405468,0.7950983661220407,0.7954318106035345,0.7957652550850284,0.7960986995665221,0.796432144048016,0.7967655885295098,0.7970990330110037,0.7974324774924975,0.7977659219739913,0.7980993664554852,0.798432810936979,0.7987662554184728,0.7990996998999667,0.7994331443814605,0.7997665888629543,0.8001000333444481,0.800433477825942,0.8007669223074358,0.8011003667889296,0.8014338112704235,0.8017672557519173,0.8021007002334112,0.8024341447149049,0.8027675891963988,0.8031010336778927,0.8034344781593865,0.8037679226408803,0.8041013671223741,0.804434811603868,0.8047682560853617,0.8051017005668556,0.8054351450483495,0.8057685895298433,0.8061020340113371,0.8064354784928309,0.8067689229743248,0.8071023674558186,0.8074358119373124,0.8077692564188063,0.8081027009003001,0.808436145381794,0.8087695898632877,0.8091030343447816,0.8094364788262755,0.8097699233077692,0.8101033677892631,0.8104368122707569,0.8107702567522508,0.8111037012337445,0.8114371457152384,0.8117705901967323,0.8121040346782261,0.8124374791597199,0.8127709236412137,0.8131043681227076,0.8134378126042014,0.8137712570856952,0.8141047015671891,0.8144381460486829,0.8147715905301767,0.8151050350116705,0.8154384794931644,0.8157719239746583,0.816105368456152,0.8164388129376459,0.8167722574191397,0.8171057019006336,0.8174391463821273,0.8177725908636212,0.8181060353451151,0.8184394798266089,0.8187729243081027,0.8191063687895965,0.8194398132710904,0.8197732577525843,0.820106702234078,0.8204401467155719,0.8207735911970657,0.8211070356785595,0.8214404801600533,0.8217739246415472,0.822107369123041,0.8224408136045348,0.8227742580860287,0.8231077025675225,0.8234411470490164,0.8237745915305101,0.824108036012004,0.8244414804934979,0.8247749249749917,0.8251083694564855,0.8254418139379793,0.8257752584194732,0.8261087029009669,0.8264421473824608,0.8267755918639547,0.8271090363454485,0.8274424808269423,0.8277759253084361,0.82810936978993,0.8284428142714239,0.8287762587529176,0.8291097032344115,0.8294431477159053,0.8297765921973992,0.8301100366788929,0.8304434811603868,0.8307769256418807,0.8311103701233744,0.8314438146048683,0.8317772590863621,0.832110703567856,0.8324441480493497,0.8327775925308436,0.8331110370123375,0.8334444814938313,0.8337779259753251,0.8341113704568189,0.8344448149383128,0.8347782594198067,0.8351117039013004,0.8354451483827943,0.8357785928642881,0.8361120373457819,0.8364454818272757,0.8367789263087696,0.8371123707902635,0.8374458152717572,0.8377792597532511,0.8381127042347449,0.8384461487162388,0.8387795931977325,0.8391130376792264,0.8394464821607203,0.8397799266422141,0.8401133711237079,0.8404468156052017,0.8407802600866956,0.8411137045681893,0.8414471490496832,0.8417805935311771,0.8421140380126709,0.8424474824941647,0.8427809269756585,0.8431143714571524,0.8434478159386463,0.84378126042014,0.8441147049016339,0.8444481493831277,0.8447815938646216,0.8451150383461153,0.8454484828276092,0.8457819273091031,0.8461153717905968,0.8464488162720907,0.8467822607535845,0.8471157052350784,0.8474491497165721,0.847782594198066,0.8481160386795599,0.8484494831610537,0.8487829276425475,0.8491163721240413,0.8494498166055352,0.8497832610870291,0.8501167055685228,0.8504501500500167,0.8507835945315105,0.8511170390130043,0.8514504834944981,0.851783927975992,0.8521173724574859,0.8524508169389796,0.8527842614204735,0.8531177059019673,0.8534511503834612,0.853784594864955,0.8541180393464488,0.8544514838279427,0.8547849283094365,0.8551183727909303,0.8554518172724241,0.855785261753918,0.8561187062354118,0.8564521507169056,0.8567855951983995,0.8571190396798933,0.8574524841613871,0.857785928642881,0.8581193731243748,0.8584528176058687,0.8587862620873624,0.8591197065688563,0.8594531510503501,0.859786595531844,0.8601200400133377,0.8604534844948316,0.8607869289763255,0.8611203734578192,0.8614538179393131,0.8617872624208069,0.8621207069023008,0.8624541513837946,0.8627875958652884,0.8631210403467823,0.8634544848282761,0.8637879293097699,0.8641213737912637,0.8644548182727576,0.8647882627542515,0.8651217072357452,0.8654551517172391,0.8657885961987329,0.8661220406802267,0.8664554851617206,0.8667889296432144,0.8671223741247083,0.867455818606202,0.8677892630876959,0.8681227075691897,0.8684561520506836,0.8687895965321774,0.8691230410136712,0.8694564854951651,0.8697899299766589,0.8701233744581527,0.8704568189396465,0.8707902634211404,0.8711237079026342,0.871457152384128,0.8717905968656219,0.8721240413471157,0.8724574858286095,0.8727909303101034,0.8731243747915972,0.8734578192730911,0.8737912637545848,0.8741247082360787,0.8744581527175725,0.8747915971990664,0.8751250416805602,0.875458486162054,0.8757919306435479,0.8761253751250416,0.8764588196065355,0.8767922640880293,0.8771257085695232,0.877459153051017,0.8777925975325108,0.8781260420140047,0.8784594864954985,0.8787929309769923,0.8791263754584862,0.87945981993998,0.8797932644214739,0.8801267089029676,0.8804601533844615,0.8807935978659553,0.8811270423474491,0.881460486828943,0.8817939313104368,0.8821273757919307,0.8824608202734244,0.8827942647549183,0.8831277092364122,0.883461153717906,0.8837945981993998,0.8841280426808936,0.8844614871623875,0.8847949316438813,0.8851283761253751,0.885461820606869,0.8857952650883628,0.8861287095698566,0.8864621540513504,0.8867955985328443,0.8871290430143381,0.8874624874958319,0.8877959319773258,0.8881293764588196,0.8884628209403135,0.8887962654218072,0.8891297099033011,0.889463154384795,0.8897965988662888,0.8901300433477826,0.8904634878292764,0.8907969323107703,0.891130376792264,0.8914638212737579,0.8917972657552518,0.8921307102367456,0.8924641547182394,0.8927975991997332,0.8931310436812271,0.893464488162721,0.8937979326442147,0.8941313771257086,0.8944648216072024,0.8947982660886963,0.89513171057019,0.8954651550516839,0.8957985995331778,0.8961320440146715,0.8964654884961654,0.8967989329776592,0.8971323774591531,0.8974658219406468,0.8977992664221407,0.8981327109036346,0.8984661553851284,0.8987995998666222,0.899133044348116,0.8994664888296099,0.8997999333111038,0.9001333777925975,0.9004668222740914,0.9008002667555852,0.901133711237079,0.9014671557185728,0.9018006002000667,0.9021340446815606,0.9024674891630543,0.9028009336445482,0.903134378126042,0.9034678226075359,0.9038012670890296,0.9041347115705235,0.9044681560520174,0.9048016005335112,0.905135045015005,0.9054684894964988,0.9058019339779927,0.9061353784594864,0.9064688229409803,0.9068022674224742,0.907135711903968,0.9074691563854618,0.9078026008669556,0.9081360453484495,0.9084694898299434,0.9088029343114371,0.909136378792931,0.9094698232744248,0.9098032677559187,0.9101367122374124,0.9104701567189063,0.9108036012004002,0.911137045681894,0.9114704901633878,0.9118039346448816,0.9121373791263755,0.9124708236078692,0.9128042680893631,0.913137712570857,0.9134711570523508,0.9138046015338446,0.9141380460153384,0.9144714904968323,0.9148049349783262,0.9151383794598199,0.9154718239413138,0.9158052684228076,0.9161387129043015,0.9164721573857952,0.9168056018672891,0.917139046348783,0.9174724908302767,0.9178059353117706,0.9181393797932644,0.9184728242747583,0.918806268756252,0.9191397132377459,0.9194731577192398,0.9198066022007336,0.9201400466822274,0.9204734911637212,0.9208069356452151,0.921140380126709,0.9214738246082027,0.9218072690896966,0.9221407135711904,0.9224741580526842,0.922807602534178,0.9231410470156719,0.9234744914971658,0.9238079359786595,0.9241413804601534,0.9244748249416472,0.9248082694231411,0.9251417139046348,0.9254751583861287,0.9258086028676226,0.9261420473491164,0.9264754918306102,0.926808936312104,0.9271423807935979,0.9274758252750916,0.9278092697565855,0.9281427142380794,0.9284761587195732,0.928809603201067,0.9291430476825608,0.9294764921640547,0.9298099366455486,0.9301433811270423,0.9304768256085362,0.93081027009003,0.9311437145715239,0.9314771590530176,0.9318106035345115,0.9321440480160054,0.9324774924974991,0.932810936978993,0.9331443814604868,0.9334778259419807,0.9338112704234744,0.9341447149049683,0.9344781593864622,0.934811603867956,0.9351450483494498,0.9354784928309436,0.9358119373124375,0.9361453817939314,0.9364788262754251,0.936812270756919,0.9371457152384128,0.9374791597199066,0.9378126042014004,0.9381460486828943,0.9384794931643882,0.9388129376458819,0.9391463821273758,0.9394798266088696,0.9398132710903635,0.9401467155718572,0.9404801600533511,0.940813604534845,0.9411470490163388,0.9414804934978326,0.9418139379793264,0.9421473824608203,0.942480826942314,0.9428142714238079,0.9431477159053018,0.9434811603867956,0.9438146048682894,0.9441480493497832,0.9444814938312771,0.944814938312771,0.9451483827942647,0.9454818272757586,0.9458152717572524,0.9461487162387463,0.94648216072024,0.9468156052017339,0.9471490496832278,0.9474824941647215,0.9478159386462154,0.9481493831277092,0.9484828276092031,0.9488162720906969,0.9491497165721907,0.9494831610536846,0.9498166055351784,0.9501500500166722,0.950483494498166,0.9508169389796599,0.9511503834611538,0.9514838279426475,0.9518172724241414,0.9521507169056352,0.952484161387129,0.9528176058686229,0.9531510503501167,0.9534844948316106,0.9538179393131043,0.9541513837945982,0.954484828276092,0.9548182727575859,0.9551517172390797,0.9554851617205735,0.9558186062020674,0.9561520506835612,0.956485495165055,0.9568189396465488,0.9571523841280427,0.9574858286095365,0.9578192730910303,0.9581527175725242,0.958486162054018,0.9588196065355118,0.9591530510170057,0.9594864954984995,0.9598199399799934,0.9601533844614871,0.960486828942981,0.9608202734244748,0.9611537179059687,0.9614871623874625,0.9618206068689563,0.9621540513504502,0.9624874958319439,0.9628209403134378,0.9631543847949317,0.9634878292764255,0.9638212737579193,0.9641547182394131,0.964488162720907,0.9648216072024008,0.9651550516838946,0.9654884961653885,0.9658219406468823,0.9661553851283762,0.9664888296098699,0.9668222740913638,0.9671557185728576,0.9674891630543514,0.9678226075358453,0.9681560520173391,0.968489496498833,0.9688229409803267,0.9691563854618206,0.9694898299433145,0.9698232744248083,0.9701567189063021,0.9704901633877959,0.9708236078692898,0.9711570523507836,0.9714904968322774,0.9718239413137713,0.9721573857952651,0.9724908302767589,0.9728242747582527,0.9731577192397466,0.9734911637212404,0.9738246082027342,0.9741580526842281,0.9744914971657219,0.9748249416472158,0.9751583861287095,0.9754918306102034,0.9758252750916973,0.9761587195731911,0.9764921640546849,0.9768256085361787,0.9771590530176726,0.9774924974991663,0.9778259419806602,0.9781593864621541,0.9784928309436479,0.9788262754251417,0.9791597199066355,0.9794931643881294,0.9798266088696233,0.980160053351117,0.9804934978326109,0.9808269423141047,0.9811603867955986,0.9814938312770923,0.9818272757585862,0.98216072024008,0.9824941647215738,0.9828276092030677,0.9831610536845615,0.9834944981660554,0.9838279426475491,0.984161387129043,0.9844948316105369,0.9848282760920307,0.9851617205735245,0.9854951650550183,0.9858286095365122,0.986162054018006,0.9864954984994998,0.9868289429809937,0.9871623874624875,0.9874958319439813,0.9878292764254751,0.988162720906969,0.9884961653884629,0.9888296098699566,0.9891630543514505,0.9894964988329443,0.9898299433144382,0.9901633877959319,0.9904968322774258,0.9908302767589197,0.9911637212404135,0.9914971657219073,0.9918306102034011,0.992164054684895,0.9924974991663887,0.9928309436478826,0.9931643881293765,0.9934978326108703,0.9938312770923641,0.9941647215738579,0.9944981660553518,0.9948316105368457,0.9951650550183394,0.9954984994998333,0.9958319439813271,0.996165388462821,0.9964988329443147,0.9968322774258086,0.9971657219073025,0.9974991663887962,0.9978326108702901,0.9981660553517839,0.9984994998332778,0.9988329443147715,0.9991663887962654,0.9994998332777593,0.9998332777592531,1.0001667222407469,1.0005001667222408,1.0008336112037346,1.0011670556852283,1.0015005001667223,1.001833944648216,1.0021673891297098,1.0025008336112038,1.0028342780926975,1.0031677225741913,1.0035011670556853,1.003834611537179,1.004168056018673,1.0045015005001667,1.0048349449816605,1.0051683894631545,1.0055018339446482,1.005835278426142,1.006168722907636,1.0065021673891297,1.0068356118706236,1.0071690563521174,1.0075025008336111,1.0078359453151051,1.0081693897965989,1.0085028342780926,1.0088362787595866,1.0091697232410803,1.009503167722574,1.009836612204068,1.0101700566855618,1.0105035011670558,1.0108369456485495,1.0111703901300433,1.0115038346115373,1.011837279093031,1.0121707235745248,1.0125041680560187,1.0128376125375125,1.0131710570190062,1.0135045015005002,1.013837945981994,1.014171390463488,1.0145048349449817,1.0148382794264754,1.0151717239079694,1.0155051683894631,1.015838612870957,1.0161720573524509,1.0165055018339446,1.0168389463154386,1.0171723907969323,1.017505835278426,1.01783927975992,1.0181727242414138,1.0185061687229076,1.0188396132044015,1.0191730576858953,1.019506502167389,1.019839946648883,1.0201733911303767,1.0205068356118707,1.0208402800933645,1.0211737245748582,1.0215071690563522,1.021840613537846,1.0221740580193397,1.0225075025008337,1.0228409469823274,1.0231743914638212,1.0235078359453151,1.0238412804268089,1.0241747249083029,1.0245081693897966,1.0248416138712904,1.0251750583527843,1.025508502834278,1.0258419473157718,1.0261753917972658,1.0265088362787596,1.0268422807602535,1.0271757252417473,1.027509169723241,1.027842614204735,1.0281760586862287,1.0285095031677225,1.0288429476492165,1.0291763921307102,1.029509836612204,1.029843281093698,1.0301767255751917,1.0305101700566857,1.0308436145381794,1.0311770590196732,1.0315105035011671,1.0318439479826609,1.0321773924641546,1.0325108369456486,1.0328442814271424,1.033177725908636,1.03351117039013,1.0338446148716238,1.0341780593531178,1.0345115038346115,1.0348449483161053,1.0351783927975993,1.035511837279093,1.0358452817605868,1.0361787262420807,1.0365121707235745,1.0368456152050685,1.0371790596865622,1.037512504168056,1.03784594864955,1.0381793931310437,1.0385128376125374,1.0388462820940314,1.0391797265755252,1.039513171057019,1.0398466155385129,1.0401800600200066,1.0405135045015006,1.0408469489829943,1.041180393464488,1.041513837945982,1.0418472824274758,1.0421807269089696,1.0425141713904635,1.0428476158719573,1.043181060353451,1.043514504834945,1.0438479493164388,1.0441813937979327,1.0445148382794265,1.0448482827609202,1.0451817272424142,1.045515171723908,1.0458486162054017,1.0461820606868957,1.0465155051683894,1.0468489496498834,1.0471823941313771,1.047515838612871,1.0478492830943649,1.0481827275758586,1.0485161720573524,1.0488496165388463,1.04918306102034,1.0495165055018338,1.0498499499833278,1.0501833944648216,1.0505168389463155,1.0508502834278093,1.051183727909303,1.051517172390797,1.0518506168722908,1.0521840613537845,1.0525175058352785,1.0528509503167722,1.0531843947982662,1.05351783927976,1.0538512837612537,1.0541847282427477,1.0545181727242414,1.0548516172057352,1.0551850616872291,1.055518506168723,1.0558519506502166,1.0561853951317106,1.0565188396132044,1.0568522840946983,1.057185728576192,1.0575191730576858,1.0578526175391798,1.0581860620206736,1.0585195065021673,1.0588529509836613,1.059186395465155,1.0595198399466488,1.0598532844281428,1.0601867289096365,1.0605201733911305,1.0608536178726242,1.061187062354118,1.061520506835612,1.0618539513171057,1.0621873957985994,1.0625208402800934,1.0628542847615872,1.0631877292430811,1.0635211737245749,1.0638546182060686,1.0641880626875626,1.0645215071690564,1.06485495165055,1.065188396132044,1.0655218406135378,1.0658552850950316,1.0661887295765256,1.0665221740580193,1.0668556185395133,1.067189063021007,1.0675225075025008,1.0678559519839947,1.0681893964654885,1.0685228409469822,1.0688562854284762,1.06918972990997,1.0695231743914637,1.0698566188729577,1.0701900633544514,1.0705235078359454,1.0708569523174392,1.071190396798933,1.0715238412804269,1.0718572857619206,1.0721907302434144,1.0725241747249084,1.072857619206402,1.073191063687896,1.0735245081693898,1.0738579526508836,1.0741913971323775,1.0745248416138713,1.074858286095365,1.075191730576859,1.0755251750583528,1.0758586195398465,1.0761920640213405,1.0765255085028342,1.0768589529843282,1.077192397465822,1.0775258419473157,1.0778592864288097,1.0781927309103034,1.0785261753917972,1.0788596198732912,1.079193064354785,1.0795265088362787,1.0798599533177726,1.0801933977992664,1.0805268422807603,1.080860286762254,1.0811937312437478,1.0815271757252418,1.0818606202067356,1.0821940646882293,1.0825275091697233,1.082860953651217,1.083194398132711,1.0835278426142048,1.0838612870956985,1.0841947315771925,1.0845281760586862,1.08486162054018,1.085195065021674,1.0855285095031677,1.0858619539846615,1.0861953984661554,1.0865288429476492,1.0868622874291431,1.087195731910637,1.0875291763921306,1.0878626208736246,1.0881960653551184,1.0885295098366121,1.088862954318106,1.0891963987995998,1.0895298432810936,1.0898632877625876,1.0901967322440813,1.0905301767255753,1.090863621207069,1.0911970656885628,1.0915305101700568,1.0918639546515505,1.0921973991330443,1.0925308436145382,1.092864288096032,1.093197732577526,1.0935311770590197,1.0938646215405134,1.0941980660220074,1.0945315105035012,1.094864954984995,1.095198399466489,1.0955318439479826,1.0958652884294764,1.0961987329109704,1.0965321773924641,1.096865621873958,1.0971990663554518,1.0975325108369456,1.0978659553184396,1.0981993997999333,1.098532844281427,1.098866288762921,1.0991997332444148,1.0995331777259085,1.0998666222074025,1.1002000666888962,1.1005335111703902,1.100866955651884,1.1012004001333777,1.1015338446148717,1.1018672890963654,1.1022007335778592,1.1025341780593532,1.102867622540847,1.1032010670223409,1.1035345115038346,1.1038679559853284,1.1042014004668224,1.104534844948316,1.1048682894298099,1.1052017339113038,1.1055351783927976,1.1058686228742913,1.1062020673557853,1.106535511837279,1.106868956318773,1.1072024008002668,1.1075358452817605,1.1078692897632545,1.1082027342447482,1.108536178726242,1.108869623207736,1.1092030676892297,1.1095365121707235,1.1098699566522174,1.1102034011337112,1.1105368456152052,1.110870290096699,1.1112037345781927,1.1115371790596866,1.1118706235411804,1.1122040680226741,1.112537512504168,1.1128709569856619,1.1132044014671558,1.1135378459486496,1.1138712904301433,1.1142047349116373,1.114538179393131,1.1148716238746248,1.1152050683561188,1.1155385128376125,1.1158719573191063,1.1162054018006002,1.116538846282094,1.116872290763588,1.1172057352450817,1.1175391797265755,1.1178726242080694,1.1182060686895632,1.118539513171057,1.118872957652551,1.1192064021340447,1.1195398466155384,1.1198732910970324,1.1202067355785261,1.12054018006002,1.1208736245415138,1.1212070690230076,1.1215405135045016,1.1218739579859953,1.122207402467489,1.122540846948983,1.1228742914304768,1.1232077359119708,1.1235411803934645,1.1238746248749583,1.1242080693564522,1.124541513837946,1.1248749583194397,1.1252084028009337,1.1255418472824275,1.1258752917639212,1.1262087362454152,1.126542180726909,1.126875625208403,1.1272090696898966,1.1275425141713904,1.1278759586528844,1.1282094031343781,1.1285428476158719,1.1288762920973658,1.1292097365788596,1.1295431810603533,1.1298766255418473,1.130210070023341,1.130543514504835,1.1308769589863288,1.1312104034678225,1.1315438479493165,1.1318772924308103,1.132210736912304,1.132544181393798,1.1328776258752917,1.1332110703567857,1.1335445148382794,1.1338779593197732,1.1342114038012672,1.134544848282761,1.1348782927642547,1.1352117372457486,1.1355451817272424,1.1358786262087361,1.1362120706902301,1.1365455151717239,1.1368789596532178,1.1372124041347116,1.1375458486162053,1.1378792930976993,1.138212737579193,1.1385461820606868,1.1388796265421808,1.1392130710236745,1.1395465155051685,1.1398799599866623,1.140213404468156,1.14054684894965,1.1408802934311437,1.1412137379126375,1.1415471823941314,1.1418806268756252,1.142214071357119,1.142547515838613,1.1428809603201067,1.1432144048016006,1.1435478492830944,1.1438812937645881,1.144214738246082,1.1445481827275759,1.1448816272090696,1.1452150716905636,1.1455485161720573,1.145881960653551,1.146215405135045,1.1465488496165388,1.1468822940980328,1.1472157385795265,1.1475491830610203,1.1478826275425142,1.148216072024008,1.1485495165055017,1.1488829609869957,1.1492164054684895,1.1495498499499834,1.1498832944314772,1.150216738912971,1.150550183394465,1.1508836278759587,1.1512170723574524,1.1515505168389464,1.1518839613204401,1.1522174058019339,1.1525508502834279,1.1528842947649216,1.1532177392464156,1.1535511837279093,1.153884628209403,1.154218072690897,1.1545515171723908,1.1548849616538845,1.1552184061353785,1.1555518506168723,1.155885295098366,1.15621873957986,1.1565521840613537,1.1568856285428477,1.1572190730243415,1.1575525175058352,1.1578859619873292,1.158219406468823,1.1585528509503167,1.1588862954318107,1.1592197399133044,1.1595531843947984,1.1598866288762921,1.1602200733577859,1.1605535178392798,1.1608869623207736,1.1612204068022673,1.1615538512837613,1.161887295765255,1.1622207402467488,1.1625541847282428,1.1628876292097365,1.1632210736912305,1.1635545181727243,1.163887962654218,1.164221407135712,1.1645548516172057,1.1648882960986995,1.1652217405801935,1.1655551850616872,1.165888629543181,1.166222074024675,1.1665555185061687,1.1668889629876626,1.1672224074691564,1.1675558519506501,1.1678892964321441,1.1682227409136379,1.1685561853951316,1.1688896298766256,1.1692230743581193,1.1695565188396133,1.169889963321107,1.1702234078026008,1.1705568522840948,1.1708902967655885,1.1712237412470823,1.1715571857285763,1.17189063021007,1.1722240746915638,1.1725575191730577,1.1728909636545515,1.1732244081360454,1.1735578526175392,1.173891297099033,1.174224741580527,1.1745581860620207,1.1748916305435144,1.1752250750250084,1.1755585195065021,1.175891963987996,1.1762254084694899,1.1765588529509836,1.1768922974324776,1.1772257419139713,1.177559186395465,1.177892630876959,1.1782260753584528,1.1785595198399466,1.1788929643214405,1.1792264088029343,1.1795598532844283,1.179893297765922,1.1802267422474157,1.1805601867289097,1.1808936312104035,1.1812270756918972,1.1815605201733912,1.181893964654885,1.1822274091363787,1.1825608536178727,1.1828942980993664,1.1832277425808604,1.1835611870623541,1.1838946315438479,1.1842280760253419,1.1845615205068356,1.1848949649883294,1.1852284094698233,1.185561853951317,1.1858952984328108,1.1862287429143048,1.1865621873957986,1.1868956318772925,1.1872290763587863,1.18756252084028,1.187895965321774,1.1882294098032677,1.1885628542847615,1.1888962987662555,1.1892297432477492,1.1895631877292432,1.189896632210737,1.1902300766922307,1.1905635211737247,1.1908969656552184,1.1912304101367122,1.1915638546182061,1.1918972990996999,1.1922307435811936,1.1925641880626876,1.1928976325441814,1.1932310770256753,1.193564521507169,1.1938979659886628,1.1942314104701568,1.1945648549516505,1.1948982994331443,1.1952317439146383,1.195565188396132,1.1958986328776258,1.1962320773591197,1.1965655218406135,1.1968989663221075,1.1972324108036012,1.197565855285095,1.197899299766589,1.1982327442480827,1.1985661887295764,1.1988996332110704,1.1992330776925642,1.1995665221740581,1.1998999666555519,1.2002334111370456,1.2005668556185396,1.2009003001000333,1.201233744581527,1.201567189063021,1.2019006335445148,1.2022340780260086,1.2025675225075025,1.2029009669889963,1.2032344114704903,1.203567855951984,1.2039013004334778,1.2042347449149717,1.2045681893964655,1.2049016338779592,1.2052350783594532,1.205568522840947,1.2059019673224407,1.2062354118039347,1.2065688562854284,1.2069023007669224,1.2072357452484161,1.20756918972991,1.2079026342114039,1.2082360786928976,1.2085695231743914,1.2089029676558853,1.209236412137379,1.209569856618873,1.2099033011003668,1.2102367455818606,1.2105701900633545,1.2109036345448483,1.211237079026342,1.211570523507836,1.2119039679893298,1.2122374124708235,1.2125708569523175,1.2129043014338112,1.2132377459153052,1.213571190396799,1.2139046348782927,1.2142380793597867,1.2145715238412804,1.2149049683227742,1.2152384128042681,1.215571857285762,1.2159053017672556,1.2162387462487496,1.2165721907302434,1.2169056352117373,1.217239079693231,1.2175725241747248,1.2179059686562188,1.2182394131377126,1.2185728576192063,1.2189063021007003,1.219239746582194,1.219573191063688,1.2199066355451818,1.2202400800266755,1.2205735245081695,1.2209069689896632,1.221240413471157,1.221573857952651,1.2219073024341447,1.2222407469156384,1.2225741913971324,1.2229076358786262,1.2232410803601201,1.2235745248416139,1.2239079693231076,1.2242414138046016,1.2245748582860954,1.224908302767589,1.225241747249083,1.2255751917305768,1.2259086362120706,1.2262420806935646,1.2265755251750583,1.2269089696565523,1.227242414138046,1.2275758586195398,1.2279093031010337,1.2282427475825275,1.2285761920640212,1.2289096365455152,1.229243081027009,1.229576525508503,1.2299099699899967,1.2302434144714904,1.2305768589529844,1.2309103034344782,1.231243747915972,1.2315771923974659,1.2319106368789596,1.2322440813604534,1.2325775258419474,1.232910970323441,1.233244414804935,1.2335778592864288,1.2339113037679226,1.2342447482494165,1.2345781927309103,1.234911637212404,1.235245081693898,1.2355785261753918,1.2359119706568857,1.2362454151383795,1.2365788596198732,1.2369123041013672,1.237245748582861,1.2375791930643547,1.2379126375458487,1.2382460820273424,1.2385795265088362,1.2389129709903302,1.239246415471824,1.2395798599533179,1.2399133044348116,1.2402467489163054,1.2405801933977993,1.240913637879293,1.2412470823607868,1.2415805268422808,1.2419139713237746,1.2422474158052683,1.2425808602867623,1.242914304768256,1.24324774924975,1.2435811937312438,1.2439146382127375,1.2442480826942315,1.2445815271757252,1.244914971657219,1.245248416138713,1.2455818606202067,1.2459153051017007,1.2462487495831944,1.2465821940646882,1.2469156385461821,1.247249083027676,1.2475825275091696,1.2479159719906636,1.2482494164721574,1.2485828609536511,1.248916305435145,1.2492497499166388,1.2495831943981328,1.2499166388796266,1.2502500833611203,1.2505835278426143,1.250916972324108,1.2512504168056018,1.2515838612870958,1.2519173057685895,1.2522507502500833,1.2525841947315772,1.252917639213071,1.253251083694565,1.2535845281760587,1.2539179726575524,1.2542514171390464,1.2545848616205402,1.254918306102034,1.255251750583528,1.2555851950650216,1.2559186395465156,1.2562520840280094,1.2565855285095031,1.256918972990997,1.2572524174724908,1.2575858619539846,1.2579193064354786,1.2582527509169723,1.258586195398466,1.25891963987996,1.2592530843614538,1.2595865288429478,1.2599199733244415,1.2602534178059352,1.2605868622874292,1.260920306768923,1.2612537512504167,1.2615871957319107,1.2619206402134044,1.2622540846948982,1.2625875291763922,1.262920973657886,1.2632544181393799,1.2635878626208736,1.2639213071023674,1.2642547515838614,1.264588196065355,1.2649216405468489,1.2652550850283428,1.2655885295098366,1.2659219739913306,1.2662554184728243,1.266588862954318,1.266922307435812,1.2672557519173058,1.2675891963987995,1.2679226408802935,1.2682560853617872,1.268589529843281,1.268922974324775,1.2692564188062687,1.2695898632877627,1.2699233077692564,1.2702567522507502,1.2705901967322442,1.270923641213738,1.2712570856952317,1.2715905301767256,1.2719239746582194,1.2722574191397131,1.272590863621207,1.2729243081027009,1.2732577525841948,1.2735911970656886,1.2739246415471823,1.2742580860286763,1.27459153051017,1.2749249749916638,1.2752584194731578,1.2755918639546515,1.2759253084361455,1.2762587529176392,1.276592197399133,1.276925641880627,1.2772590863621207,1.2775925308436145,1.2779259753251084,1.2782594198066022,1.278592864288096,1.27892630876959,1.2792597532510837,1.2795931977325776,1.2799266422140714,1.2802600866955651,1.280593531177059,1.2809269756585528,1.2812604201400466,1.2815938646215406,1.2819273091030343,1.282260753584528,1.282594198066022,1.2829276425475158,1.2832610870290098,1.2835945315105035,1.2839279759919973,1.2842614204734912,1.284594864954985,1.2849283094364787,1.2852617539179727,1.2855951983994665,1.2859286428809604,1.2862620873624542,1.286595531843948,1.286928976325442,1.2872624208069356,1.2875958652884294,1.2879293097699234,1.2882627542514171,1.2885961987329109,1.2889296432144048,1.2892630876958986,1.2895965321773926,1.2899299766588863,1.29026342114038,1.290596865621874,1.2909303101033678,1.2912637545848615,1.2915971990663555,1.2919306435478493,1.292264088029343,1.292597532510837,1.2929309769923307,1.2932644214738247,1.2935978659553184,1.2939313104368122,1.2942647549183062,1.2945981993998,1.2949316438812937,1.2952650883627876,1.2955985328442814,1.2959319773257754,1.2962654218072691,1.2965988662887629,1.2969323107702568,1.2972657552517506,1.2975991997332443,1.2979326442147383,1.298266088696232,1.2985995331777258,1.2989329776592198,1.2992664221407135,1.2995998666222075,1.2999333111037013,1.300266755585195,1.300600200066689,1.3009336445481827,1.3012670890296765,1.3016005335111704,1.3019339779926642,1.302267422474158,1.302600866955652,1.3029343114371457,1.3032677559186396,1.3036012004001334,1.3039346448816271,1.304268089363121,1.3046015338446149,1.3049349783261086,1.3052684228076026,1.3056018672890963,1.3059353117705903,1.306268756252084,1.3066022007335778,1.3069356452150718,1.3072690896965655,1.3076025341780593,1.3079359786595532,1.308269423141047,1.3086028676225407,1.3089363121040347,1.3092697565855285,1.3096032010670224,1.3099366455485162,1.31027009003001,1.310603534511504,1.3109369789929977,1.3112704234744914,1.3116038679559854,1.3119373124374791,1.3122707569189729,1.3126042014004669,1.3129376458819606,1.3132710903634546,1.3136045348449483,1.313937979326442,1.314271423807936,1.3146048682894298,1.3149383127709235,1.3152717572524175,1.3156052017339113,1.3159386462154052,1.316272090696899,1.3166055351783927,1.3169389796598867,1.3172724241413805,1.3176058686228742,1.3179393131043682,1.318272757585862,1.3186062020673557,1.3189396465488497,1.3192730910303434,1.3196065355118374,1.3199399799933311,1.3202734244748249,1.3206068689563188,1.3209403134378126,1.3212737579193063,1.3216072024008003,1.321940646882294,1.322274091363788,1.3226075358452818,1.3229409803267755,1.3232744248082695,1.3236078692897633,1.323941313771257,1.324274758252751,1.3246082027342447,1.3249416472157385,1.3252750916972325,1.3256085361787262,1.3259419806602202,1.326275425141714,1.3266088696232077,1.3269423141047016,1.3272757585861954,1.3276092030676891,1.3279426475491831,1.3282760920306769,1.3286095365121706,1.3289429809936646,1.3292764254751583,1.3296098699566523,1.329943314438146,1.3302767589196398,1.3306102034011338,1.3309436478826275,1.3312770923641213,1.3316105368456153,1.331943981327109,1.332277425808603,1.3326108702900967,1.3329443147715905,1.3332777592530844,1.3336112037345782,1.333944648216072,1.334278092697566,1.3346115371790597,1.3349449816605534,1.3352784261420474,1.3356118706235411,1.3359453151050351,1.3362787595865289,1.3366122040680226,1.3369456485495166,1.3372790930310103,1.337612537512504,1.337945981993998,1.3382794264754918,1.3386128709569856,1.3389463154384795,1.3392797599199733,1.3396132044014673,1.339946648882961,1.3402800933644547,1.3406135378459487,1.3409469823274425,1.3412804268089362,1.3416138712904302,1.341947315771924,1.342280760253418,1.3426142047349117,1.3429476492164054,1.3432810936978994,1.3436145381793931,1.3439479826608869,1.3442814271423809,1.3446148716238746,1.3449483161053684,1.3452817605868623,1.345615205068356,1.34594864954985,1.3462820940313438,1.3466155385128376,1.3469489829943315,1.3472824274758253,1.347615871957319,1.347949316438813,1.3482827609203067,1.3486162054018005,1.3489496498832945,1.3492830943647882,1.3496165388462822,1.349949983327776,1.3502834278092697,1.3506168722907637,1.3509503167722574,1.3512837612537512,1.3516172057352451,1.3519506502167389,1.3522840946982329,1.3526175391797266,1.3529509836612204,1.3532844281427143,1.353617872624208,1.3539513171057018,1.3542847615871958,1.3546182060686895,1.3549516505501833,1.3552850950316773,1.355618539513171,1.355951983994665,1.3562854284761587,1.3566188729576525,1.3569523174391465,1.3572857619206402,1.357619206402134,1.357952650883628,1.3582860953651217,1.3586195398466154,1.3589529843281094,1.3592864288096032,1.3596198732910971,1.3599533177725909,1.3602867622540846,1.3606202067355786,1.3609536512170723,1.361287095698566,1.36162054018006,1.3619539846615538,1.3622874291430478,1.3626208736245415,1.3629543181060353,1.3632877625875293,1.363621207069023,1.3639546515505168,1.3642880960320107,1.3646215405135045,1.3649549849949982,1.3652884294764922,1.365621873957986,1.36595531843948,1.3662887629209737,1.3666222074024674,1.3669556518839614,1.3672890963654551,1.367622540846949,1.3679559853284429,1.3682894298099366,1.3686228742914304,1.3689563187729243,1.369289763254418,1.369623207735912,1.3699566522174058,1.3702900966988996,1.3706235411803935,1.3709569856618873,1.371290430143381,1.371623874624875,1.3719573191063688,1.3722907635878627,1.3726242080693565,1.3729576525508502,1.3732910970323442,1.373624541513838,1.3739579859953317,1.3742914304768257,1.3746248749583194,1.3749583194398132,1.3752917639213071,1.375625208402801,1.3759586528842949,1.3762920973657886,1.3766255418472824,1.3769589863287763,1.37729243081027,1.3776258752917638,1.3779593197732578,1.3782927642547516,1.3786262087362453,1.3789596532177393,1.379293097699233,1.379626542180727,1.3799599866622208,1.3802934311437145,1.3806268756252085,1.3809603201067022,1.381293764588196,1.38162720906969,1.3819606535511837,1.3822940980326777,1.3826275425141714,1.3829609869956652,1.3832944314771591,1.3836278759586529,1.3839613204401466,1.3842947649216406,1.3846282094031344,1.384961653884628,1.385295098366122,1.3856285428476158,1.3859619873291098,1.3862954318106036,1.3866288762920973,1.3869623207735913,1.387295765255085,1.3876292097365788,1.3879626542180727,1.3882960986995665,1.3886295431810602,1.3889629876625542,1.389296432144048,1.389629876625542,1.3899633211070357,1.3902967655885294,1.3906302100700234,1.3909636545515172,1.391297099033011,1.3916305435145049,1.3919639879959986,1.3922974324774926,1.3926308769589864,1.39296432144048,1.393297765921974,1.3936312104034678,1.3939646548849616,1.3942980993664555,1.3946315438479493,1.394964988329443,1.395298432810937,1.3956318772924308,1.3959653217739247,1.3962987662554185,1.3966322107369122,1.3969656552184062,1.3972990996999,1.3976325441813937,1.3979659886628877,1.3982994331443814,1.3986328776258752,1.3989663221073692,1.399299766588863,1.3996332110703569,1.3999666555518506,1.4003001000333444,1.4006335445148383,1.400966988996332,1.4013004334778258,1.4016338779593198,1.4019673224408136,1.4023007669223075,1.4026342114038013,1.402967655885295,1.403301100366789,1.4036345448482828,1.4039679893297765,1.4043014338112705,1.4046348782927642,1.404968322774258,1.405301767255752,1.4056352117372457,1.4059686562187397,1.4063021007002334,1.4066355451817272,1.4069689896632211,1.407302434144715,1.4076358786262086,1.4079693231077026,1.4083027675891964,1.4086362120706901,1.408969656552184,1.4093031010336778,1.4096365455151718,1.4099699899966656,1.4103034344781593,1.4106368789596533,1.410970323441147,1.4113037679226408,1.4116372124041348,1.4119706568856285,1.4123041013671225,1.4126375458486162,1.41297099033011,1.413304434811604,1.4136378792930977,1.4139713237745914,1.4143047682560854,1.4146382127375792,1.414971657219073,1.415305101700567,1.4156385461820606,1.4159719906635546,1.4163054351450484,1.4166388796265421,1.416972324108036,1.4173057685895298,1.4176392130710236,1.4179726575525176,1.4183061020340113,1.4186395465155053,1.418972990996999,1.4193064354784928,1.4196398799599868,1.4199733244414805,1.4203067689229742,1.4206402134044682,1.420973657885962,1.4213071023674557,1.4216405468489497,1.4219739913304434,1.4223074358119374,1.4226408802934312,1.422974324774925,1.4233077692564189,1.4236412137379126,1.4239746582194064,1.4243081027009004,1.424641547182394,1.4249749916638879,1.4253084361453818,1.4256418806268756,1.4259753251083696,1.4263087695898633,1.426642214071357,1.426975658552851,1.4273091030343448,1.4276425475158385,1.4279759919973325,1.4283094364788262,1.4286428809603202,1.428976325441814,1.4293097699233077,1.4296432144048017,1.4299766588862954,1.4303101033677892,1.4306435478492832,1.430976992330777,1.4313104368122707,1.4316438812937646,1.4319773257752584,1.4323107702567524,1.432644214738246,1.4329776592197399,1.4333111037012338,1.4336445481827276,1.4339779926642213,1.4343114371457153,1.434644881627209,1.4349783261087028,1.4353117705901968,1.4356452150716905,1.4359786595531845,1.4363121040346782,1.436645548516172,1.436978992997666,1.4373124374791597,1.4376458819606535,1.4379793264421474,1.4383127709236412,1.4386462154051352,1.438979659886629,1.4393131043681227,1.4396465488496166,1.4399799933311104,1.4403134378126041,1.440646882294098,1.4409803267755918,1.4413137712570856,1.4416472157385796,1.4419806602200733,1.4423141047015673,1.442647549183061,1.4429809936645548,1.4433144381460488,1.4436478826275425,1.4439813271090363,1.4443147715905302,1.444648216072024,1.4449816605535177,1.4453151050350117,1.4456485495165055,1.4459819939979994,1.4463154384794932,1.446648882960987,1.446982327442481,1.4473157719239746,1.4476492164054684,1.4479826608869624,1.4483161053684561,1.44864954984995,1.4489829943314438,1.4493164388129376,1.4496498832944316,1.4499833277759253,1.450316772257419,1.450650216738913,1.4509836612204068,1.4513171057019005,1.4516505501833945,1.4519839946648883,1.4523174391463822,1.452650883627876,1.4529843281093697,1.4533177725908637,1.4536512170723574,1.4539846615538512,1.4543181060353452,1.454651550516839,1.4549849949983327,1.4553184394798266,1.4556518839613204,1.4559853284428144,1.4563187729243081,1.4566522174058019,1.4569856618872958,1.4573191063687896,1.4576525508502833,1.4579859953317773,1.458319439813271,1.458652884294765,1.4589863287762588,1.4593197732577525,1.4596532177392465,1.4599866622207403,1.460320106702234,1.460653551183728,1.4609869956652217,1.4613204401467155,1.4616538846282094,1.4619873291097032,1.4623207735911972,1.462654218072691,1.4629876625541847,1.4633211070356786,1.4636545515171724,1.4639879959986661,1.46432144048016,1.4646548849616539,1.4649883294431476,1.4653217739246416,1.4656552184061353,1.4659886628876293,1.466322107369123,1.4666555518506168,1.4669889963321108,1.4673224408136045,1.4676558852950983,1.4679893297765922,1.468322774258086,1.46865621873958,1.4689896632210737,1.4693231077025675,1.4696565521840614,1.4699899966655552,1.470323441147049,1.470656885628543,1.4709903301100367,1.4713237745915304,1.4716572190730244,1.4719906635545181,1.472324108036012,1.4726575525175059,1.4729909969989996,1.4733244414804936,1.4736578859619873,1.473991330443481,1.474324774924975,1.4746582194064688,1.4749916638879625,1.4753251083694565,1.4756585528509503,1.4759919973324442,1.476325441813938,1.4766588862954317,1.4769923307769257,1.4773257752584195,1.4776592197399132,1.4779926642214072,1.478326108702901,1.478659553184395,1.4789929976658887,1.4793264421473824,1.4796598866288764,1.4799933311103701,1.4803267755918639,1.4806602200733578,1.4809936645548516,1.4813271090363453,1.4816605535178393,1.481993997999333,1.482327442480827,1.4826608869623208,1.4829943314438145,1.4833277759253085,1.4836612204068023,1.483994664888296,1.48432810936979,1.4846615538512837,1.4849949983327775,1.4853284428142715,1.4856618872957652,1.4859953317772592,1.486328776258753,1.4866622207402467,1.4869956652217406,1.4873291097032344,1.4876625541847281,1.4879959986662221,1.4883294431477159,1.4886628876292098,1.4889963321107036,1.4893297765921973,1.4896632210736913,1.489996665555185,1.4903301100366788,1.4906635545181728,1.4909969989996665,1.4913304434811603,1.4916638879626543,1.491997332444148,1.492330776925642,1.4926642214071357,1.4929976658886295,1.4933311103701234,1.4936645548516172,1.493997999333111,1.494331443814605,1.4946648882960987,1.4949983327775924,1.4953317772590864,1.4956652217405801,1.4959986662220741,1.4963321107035679,1.4966655551850616,1.4969989996665556,1.4973324441480493,1.497665888629543,1.497999333111037,1.4983327775925308,1.4986662220740248,1.4989996665555185,1.4993331110370123,1.4996665555185063,1.5]}
},{}],65:[function(require,module,exports){
module.exports={"expected":[-0.4769362762044699,-0.47749383172417675,-0.4780516842773507,-0.47860983452822164,-0.4791682831428271,-0.47972703078901724,-0.48028607813646207,-0.4808454258566608,-0.48140507462294574,-0.4819650251104933,-0.48252527799632844,-0.4830858339593334,-0.4836466936802547,-0.4842078578417114,-0.48476932712820087,-0.4853311022261084,-0.48589318382371277,-0.48645557261119576,-0.4870182692806485,-0.4875812745260788,-0.4881445890434208,-0.4887082135305407,-0.4892721486872453,-0.4898363952152903,-0.4904009538183871,-0.490965825202212,-0.49153101007441335,-0.4920965091446188,-0.49266232312444547,-0.49322845272750615,-0.49379489866941784,-0.49436166166781026,-0.4949287424423337,-0.4954961417146676,-0.49606386020852844,-0.496631898649678,-0.49720025776593246,-0.4977689382871701,-0.49833794094533934,-0.4989072664744685,-0.49947691561067337,-0.5000468890921655,-0.5006171876592624,-0.501187812054394,-0.5017587630221133,-0.5023300413091041,-0.5029016476641893,-0.5034735828383415,-0.5040458475846894,-0.5046184426585297,-0.5051913688173334,-0.505764626820756,-0.5063382174306464,-0.5069121414110569,-0.5074863995282501,-0.5080609925507107,-0.5086359212491527,-0.5092111863965302,-0.509786788768046,-0.5103627291411602,-0.5109390082956016,-0.511515627013376,-0.5120925860787751,-0.5126698862783875,-0.5132475284011074,-0.5138255132381446,-0.5144038415830344,-0.5149825142316468,-0.5155615319821968,-0.5161408956352549,-0.516720605993755,-0.517300663863007,-0.5178810700507055,-0.518461825366939,-0.5190429306242023,-0.5196243866374043,-0.5202061942238804,-0.5207883542034014,-0.5213708673981842,-0.5219537346329026,-0.5225369567346975,-0.5231205345331871,-0.5237044688604781,-0.5242887605511759,-0.5248734104423957,-0.5254584193737732,-0.5260437881874747,-0.5266295177282088,-0.5272156088432374,-0.5278020623823856,-0.5283888791980546,-0.5289760601452302,-0.5295636060814969,-0.5301515178670472,-0.5307397963646929,-0.5313284424398776,-0.5319174569606877,-0.5325068407978621,-0.5330965948248075,-0.5336867199176057,-0.5342772169550285,-0.5348680868185481,-0.5354593303923485,-0.5360509485633382,-0.5366429422211625,-0.537235312258213,-0.5378280595696432,-0.5384211850533778,-0.5390146896101259,-0.5396085741433942,-0.5402028395594971,-0.5407974867675707,-0.5413925166795857,-0.5419879302103575,-0.5425837282775616,-0.5431799118017452,-0.5437764817063382,-0.5443734389176692,-0.5449707843649753,-0.5455685189804174,-0.546166643699092,-0.5467651594590438,-0.5473640672012806,-0.5479633678697847,-0.5485630624115271,-0.549163151776481,-0.5497636369176343,-0.5503645187910045,-0.5509657983556513,-0.5515674765736902,-0.5521695544103071,-0.5527720328337717,-0.5533749128154506,-0.5539781953298225,-0.5545818813544916,-0.5551859718702017,-0.5557904678608513,-0.5563953703135062,-0.5570006802184154,-0.5576063985690255,-0.5582125263619936,-0.5588190645972043,-0.5594260142777822,-0.5600333764101081,-0.560641152003834,-0.5612493420718965,-0.5618579476305332,-0.5624669696992984,-0.5630764093010758,-0.563686267462097,-0.564296545211954,-0.5649072435836167,-0.5655183636134476,-0.5661299063412176,-0.5667418728101216,-0.5673542640667951,-0.5679670811613285,-0.5685803251472853,-0.5691939970817158,-0.5698080980251754,-0.5704226290417403,-0.5710375911990231,-0.5716529855681898,-0.572268813223977,-0.5728850752447076,-0.5735017727123084,-0.5741189067123259,-0.5747364783339443,-0.5753544886700033,-0.5759729388170125,-0.5765918298751715,-0.5772111629483864,-0.5778309391442858,-0.5784511595742412,-0.5790718253533824,-0.5796929376006156,-0.5803144974386434,-0.5809365059939787,-0.5815589643969679,-0.5821818737818045,-0.5828052352865505,-0.5834290500531534,-0.5840533192274656,-0.5846780439592615,-0.5853032254022588,-0.5859288647141345,-0.5865549630565464,-0.587181521595151,-0.587808541499622,-0.5884360239436717,-0.5890639701050686,-0.5896923811656576,-0.5903212583113805,-0.5909506027322937,-0.5915804156225907,-0.5922106981806204,-0.5928414516089077,-0.5934726771141745,-0.594104375907359,-0.5947365492036367,-0.5953691982224416,-0.5960023241874861,-0.5966359283267825,-0.5972700118726645,-0.5979045760618067,-0.5985396221352474,-0.5991751513384108,-0.5998111649211252,-0.6004476641376493,-0.6010846502466894,-0.6017221245114255,-0.6023600881995309,-0.6029985425831946,-0.6036374889391447,-0.6042769285486708,-0.6049168626976448,-0.6055572926765471,-0.6061982197804863,-0.6068396453092236,-0.6074815705671975,-0.6081239968635439,-0.6087669255121224,-0.6094103578315391,-0.61005429514517,-0.6106987387811854,-0.6113436900725745,-0.6119891503571683,-0.6126351209776654,-0.6132816032816556,-0.613928598621646,-0.614576108355084,-0.6152241338443836,-0.6158726764569505,-0.6165217375652079,-0.61717131854662,-0.6178214207837207,-0.6184720456641367,-0.6191231945806155,-0.6197748689310512,-0.6204270701185092,-0.621079799551255,-0.6217330586427801,-0.6223868488118282,-0.6230411714824228,-0.6236960280838945,-0.6243514200509086,-0.6250073488234922,-0.6256638158470615,-0.6263208225724514,-0.6269783704559423,-0.6276364609592878,-0.6282950955497454,-0.6289542757001025,-0.6296140028887075,-0.6302742785994982,-0.6309351043220295,-0.6315964815515056,-0.6322584117888069,-0.6329208965405219,-0.6335839373189761,-0.6342475356422617,-0.6349116930342701,-0.6355764110247207,-0.6362416911491917,-0.6369075349491522,-0.6375739439719932,-0.6382409197710572,-0.6389084639056734,-0.6395765779411855,-0.640245263448987,-0.6409145220065525,-0.6415843551974687,-0.6422547646114692,-0.6429257518444668,-0.6435973184985854,-0.644269466182196,-0.644942196509947,-0.6456155111028011,-0.646289411588068,-0.6469638995994373,-0.6476389767770163,-0.648314644767362,-0.6489909052235165,-0.6496677598050439,-0.6503452101780641,-0.6510232580152886,-0.6517019049960578,-0.6523811528063753,-0.653061003138946,-0.6537414576932126,-0.654422518175391,-0.6551041862985097,-0.6557864637824458,-0.6564693523539625,-0.6571528537467491,-0.6578369697014569,-0.6585217019657389,-0.6592070522942892,-0.6598930224488795,-0.660579614198402,-0.6612668293189068,-0.6619546695936411,-0.6626431368130917,-0.6633322327750238,-0.6640219592845215,-0.664712318154031,-0.6654033112033982,-0.666094940259914,-0.6667872071583546,-0.6674801137410222,-0.6681736618577911,-0.6688678533661464,-0.6695626901312303,-0.6702581740258841,-0.6709543069306911,-0.6716510907340228,-0.6723485273320816,-0.673046618628945,-0.6737453665366125,-0.6744447729750491,-0.6751448398722318,-0.6758455691641959,-0.6765469627950793,-0.6772490227171719,-0.677951750890961,-0.6786551492851779,-0.6793592198768469,-0.6800639646513327,-0.680769385602389,-0.6814754847322069,-0.6821822640514633,-0.6828897255793718,-0.6835978713437315,-0.6843067033809765,-0.6850162237362281,-0.6857264344633439,-0.6864373376249702,-0.687148935292593,-0.68786122954659,-0.6885742224762837,-0.6892879161799934,-0.6900023127650879,-0.6907174143480402,-0.691433223054482,-0.6921497410192546,-0.6928669703864684,-0.6935849133095536,-0.6943035719513199,-0.6950229484840094,-0.6957430450893533,-0.6964638639586309,-0.6971854072927255,-0.6979076773021804,-0.6986306762072607,-0.6993544062380077,-0.7000788696343023,-0.7008040686459214,-0.7015300055325971,-0.7022566825640811,-0.7029841020202019,-0.7037122661909265,-0.7044411773764245,-0.7051708378871274,-0.7059012500437931,-0.7066324161775693,-0.7073643386300557,-0.7080970197533688,-0.7088304619102085,-0.7095646674739192,-0.71029963882856,-0.7110353783689667,-0.7117718885008225,-0.7125091716407225,-0.7132472302162414,-0.7139860666660033,-0.7147256834397505,-0.7154660829984106,-0.7162072678141697,-0.7169492403705391,-0.7176920031624296,-0.7184355586962221,-0.7191799094898378,-0.7199250580728138,-0.7206710069863748,-0.7214177587835064,-0.7221653160290316,-0.7229136812996829,-0.7236628571841812,-0.7244128462833096,-0.7251636512099912,-0.7259152745893662,-0.7266677190588712,-0.727420987268315,-0.7281750818799614,-0.7289300055686082,-0.7296857610216654,-0.7304423509392398,-0.731199778034215,-0.7319580450323347,-0.7327171546722864,-0.7334771097057831,-0.7342379128976513,-0.7349995670259144,-0.7357620748818785,-0.7365254392702203,-0.7372896630090731,-0.7380547489301167,-0.7388206998786653,-0.7395875187137565,-0.7403552083082436,-0.7411237715488853,-0.741893211336437,-0.742663530585746,-0.7434347322258413,-0.7442068192000315,-0.7449797944659979,-0.7457536609958892,-0.7465284217764209,-0.747304079808971,-0.7480806381096774,-0.7488580997095393,-0.7496364676545147,-0.7504157450056231,-0.7511959348390463,-0.75197704024623,-0.7527590643339885,-0.7535420102246089,-0.7543258810559543,-0.7551106799815729,-0.7558964101708013,-0.756683074808876,-0.7574706770970393,-0.7582592202526504,-0.7590487075092958,-0.759839142116901,-0.7606305273418422,-0.7614228664670616,-0.7622161627921795,-0.7630104196336125,-0.7638056403246885,-0.7646018282157634,-0.765398986674342,-0.7661971190851968,-0.766996228850486,-0.7677963193898799,-0.7685973941406805,-0.7693994565579455,-0.7702025101146154,-0.7710065583016371,-0.7718116046280925,-0.7726176526213273,-0.7734247058270787,-0.774232767809608,-0.7750418421518316,-0.775851932455453,-0.7766630423410995,-0.7774751754484548,-0.7782883354363974,-0.7791025259831388,-0.7799177507863602,-0.7807340135633558,-0.7815513180511735,-0.7823696680067557,-0.7831890672070873,-0.7840095194493374,-0.7848310285510098,-0.7856535983500892,-0.7864772327051899,-0.787301935495709,-0.7881277106219788,-0.7889545620054172,-0.7897824935886875,-0.7906115093358507,-0.7914416132325276,-0.792272809286056,-0.7931051015256512,-0.7939384940025705,-0.7947729907902773,-0.7956085959846033,-0.796445313703921,-0.7972831480893074,-0.7981221033047176,-0.7989621835371564,-0.7998033929968495,-0.8006457359174223,-0.8014892165560745,-0.802333839193758,-0.8031796081353602,-0.8040265277098823,-0.8048746022706266,-0.8057238361953798,-0.8065742338866002,-0.8074257997716088,-0.8082785383027781,-0.8091324539577259,-0.8099875512395103,-0.8108438346768245,-0.8117013088241982,-0.8125599782621958,-0.8134198475976185],"x":[1.5,1.500501002004008,1.501002004008016,1.501503006012024,1.502004008016032,1.50250501002004,1.503006012024048,1.5035070140280562,1.5040080160320641,1.504509018036072,1.5050100200400802,1.5055110220440882,1.506012024048096,1.5065130260521042,1.5070140280561122,1.5075150300601203,1.5080160320641283,1.5085170340681362,1.5090180360721444,1.5095190380761523,1.5100200400801602,1.5105210420841684,1.5110220440881763,1.5115230460921845,1.5120240480961924,1.5125250501002003,1.5130260521042085,1.5135270541082164,1.5140280561122244,1.5145290581162325,1.5150300601202404,1.5155310621242486,1.5160320641282565,1.5165330661322645,1.5170340681362726,1.5175350701402806,1.5180360721442885,1.5185370741482966,1.5190380761523046,1.5195390781563127,1.5200400801603207,1.5205410821643286,1.5210420841683367,1.5215430861723447,1.5220440881763526,1.5225450901803608,1.5230460921843687,1.5235470941883769,1.5240480961923848,1.5245490981963927,1.5250501002004009,1.5255511022044088,1.5260521042084167,1.526553106212425,1.5270541082164328,1.527555110220441,1.528056112224449,1.5285571142284569,1.529058116232465,1.529559118236473,1.5300601202404809,1.530561122244489,1.531062124248497,1.531563126252505,1.532064128256513,1.532565130260521,1.5330661322645291,1.533567134268537,1.534068136272545,1.5345691382765532,1.535070140280561,1.535571142284569,1.5360721442885772,1.5365731462925851,1.5370741482965933,1.5375751503006012,1.5380761523046091,1.5385771543086173,1.5390781563126252,1.5395791583166332,1.5400801603206413,1.5405811623246493,1.5410821643286574,1.5415831663326653,1.5420841683366733,1.5425851703406814,1.5430861723446894,1.5435871743486973,1.5440881763527055,1.5445891783567134,1.5450901803607215,1.5455911823647295,1.5460921843687374,1.5465931863727456,1.5470941883767535,1.5475951903807614,1.5480961923847696,1.5485971943887775,1.5490981963927857,1.5495991983967936,1.5501002004008015,1.5506012024048097,1.5511022044088176,1.5516032064128256,1.5521042084168337,1.5526052104208417,1.5531062124248498,1.5536072144288577,1.5541082164328657,1.5546092184368738,1.5551102204408818,1.5556112224448897,1.5561122244488979,1.5566132264529058,1.5571142284569137,1.5576152304609219,1.5581162324649298,1.558617234468938,1.559118236472946,1.5596192384769538,1.560120240480962,1.56062124248497,1.5611222444889779,1.561623246492986,1.562124248496994,1.562625250501002,1.56312625250501,1.563627254509018,1.5641282565130261,1.564629258517034,1.565130260521042,1.5656312625250501,1.566132264529058,1.5666332665330662,1.5671342685370742,1.567635270541082,1.5681362725450902,1.5686372745490982,1.5691382765531061,1.5696392785571143,1.5701402805611222,1.5706412825651304,1.5711422845691383,1.5716432865731462,1.5721442885771544,1.5726452905811623,1.5731462925851702,1.5736472945891784,1.5741482965931863,1.5746492985971945,1.5751503006012024,1.5756513026052104,1.5761523046092185,1.5766533066132264,1.5771543086172344,1.5776553106212425,1.5781563126252505,1.5786573146292586,1.5791583166332666,1.5796593186372745,1.5801603206412826,1.5806613226452906,1.5811623246492985,1.5816633266533067,1.5821643286573146,1.5826653306613228,1.5831663326653307,1.5836673346693386,1.5841683366733468,1.5846693386773547,1.5851703406813626,1.5856713426853708,1.5861723446893787,1.5866733466933867,1.5871743486973948,1.5876753507014028,1.588176352705411,1.5886773547094188,1.5891783567134268,1.589679358717435,1.5901803607214429,1.5906813627254508,1.591182364729459,1.5916833667334669,1.592184368737475,1.592685370741483,1.593186372745491,1.593687374749499,1.594188376753507,1.594689378757515,1.595190380761523,1.595691382765531,1.5961923847695392,1.596693386773547,1.597194388777555,1.5976953907815632,1.5981963927855711,1.598697394789579,1.5991983967935872,1.5996993987975952,1.6002004008016033,1.6007014028056112,1.6012024048096192,1.6017034068136273,1.6022044088176353,1.6027054108216432,1.6032064128256514,1.6037074148296593,1.6042084168336674,1.6047094188376754,1.6052104208416833,1.6057114228456915,1.6062124248496994,1.6067134268537073,1.6072144288577155,1.6077154308617234,1.6082164328657316,1.6087174348697395,1.6092184368737474,1.6097194388777556,1.6102204408817635,1.6107214428857715,1.6112224448897796,1.6117234468937875,1.6122244488977955,1.6127254509018036,1.6132264529058116,1.6137274549098197,1.6142284569138277,1.6147294589178356,1.6152304609218437,1.6157314629258517,1.6162324649298596,1.6167334669338678,1.6172344689378757,1.6177354709418839,1.6182364729458918,1.6187374749498997,1.6192384769539079,1.6197394789579158,1.6202404809619237,1.620741482965932,1.6212424849699398,1.621743486973948,1.622244488977956,1.6227454909819639,1.623246492985972,1.62374749498998,1.6242484969939879,1.624749498997996,1.625250501002004,1.6257515030060121,1.62625250501002,1.626753507014028,1.6272545090180361,1.627755511022044,1.628256513026052,1.6287575150300602,1.629258517034068,1.6297595190380763,1.6302605210420842,1.6307615230460921,1.6312625250501003,1.6317635270541082,1.6322645290581161,1.6327655310621243,1.6332665330661322,1.6337675350701404,1.6342685370741483,1.6347695390781563,1.6352705410821644,1.6357715430861723,1.6362725450901803,1.6367735470941884,1.6372745490981964,1.6377755511022045,1.6382765531062125,1.6387775551102204,1.6392785571142285,1.6397795591182365,1.6402805611222444,1.6407815631262526,1.6412825651302605,1.6417835671342684,1.6422845691382766,1.6427855711422845,1.6432865731462927,1.6437875751503006,1.6442885771543085,1.6447895791583167,1.6452905811623246,1.6457915831663326,1.6462925851703407,1.6467935871743486,1.6472945891783568,1.6477955911823647,1.6482965931863727,1.6487975951903808,1.6492985971943888,1.6497995991983967,1.6503006012024048,1.6508016032064128,1.651302605210421,1.6518036072144289,1.6523046092184368,1.652805611222445,1.653306613226453,1.6538076152304608,1.654308617234469,1.654809619238477,1.655310621242485,1.655811623246493,1.656312625250501,1.656813627254509,1.657314629258517,1.657815631262525,1.6583166332665331,1.658817635270541,1.6593186372745492,1.6598196392785571,1.660320641282565,1.6608216432865732,1.6613226452905812,1.661823647294589,1.6623246492985972,1.6628256513026052,1.6633266533066133,1.6638276553106213,1.6643286573146292,1.6648296593186374,1.6653306613226453,1.6658316633266532,1.6663326653306614,1.6668336673346693,1.6673346693386772,1.6678356713426854,1.6683366733466933,1.6688376753507015,1.6693386773547094,1.6698396793587174,1.6703406813627255,1.6708416833667334,1.6713426853707414,1.6718436873747495,1.6723446893787575,1.6728456913827656,1.6733466933867736,1.6738476953907815,1.6743486973947896,1.6748496993987976,1.6753507014028055,1.6758517034068137,1.6763527054108216,1.6768537074148298,1.6773547094188377,1.6778557114228456,1.6783567134268538,1.6788577154308617,1.6793587174348696,1.6798597194388778,1.6803607214428857,1.6808617234468939,1.6813627254509018,1.6818637274549098,1.682364729458918,1.6828657314629258,1.6833667334669338,1.683867735470942,1.6843687374749499,1.684869739478958,1.685370741482966,1.6858717434869739,1.686372745490982,1.68687374749499,1.687374749498998,1.687875751503006,1.688376753507014,1.6888777555110221,1.68937875751503,1.689879759519038,1.6903807615230462,1.690881763527054,1.691382765531062,1.6918837675350702,1.6923847695390781,1.6928857715430863,1.6933867735470942,1.6938877755511021,1.6943887775551103,1.6948897795591182,1.6953907815631262,1.6958917835671343,1.6963927855711423,1.6968937875751502,1.6973947895791583,1.6978957915831663,1.6983967935871744,1.6988977955911824,1.6993987975951903,1.6998997995991985,1.7004008016032064,1.7009018036072143,1.7014028056112225,1.7019038076152304,1.7024048096192386,1.7029058116232465,1.7034068136272544,1.7039078156312626,1.7044088176352705,1.7049098196392785,1.7054108216432866,1.7059118236472945,1.7064128256513027,1.7069138276553106,1.7074148296593186,1.7079158316633267,1.7084168336673347,1.7089178356713426,1.7094188376753507,1.7099198396793587,1.7104208416833668,1.7109218436873748,1.7114228456913827,1.7119238476953909,1.7124248496993988,1.7129258517034067,1.7134268537074149,1.7139278557114228,1.714428857715431,1.714929859719439,1.7154308617234468,1.715931863727455,1.716432865731463,1.7169338677354709,1.717434869739479,1.717935871743487,1.718436873747495,1.718937875751503,1.719438877755511,1.7199398797595191,1.720440881763527,1.720941883767535,1.7214428857715431,1.721943887775551,1.722444889779559,1.7229458917835672,1.723446893787575,1.7239478957915833,1.7244488977955912,1.7249498997995991,1.7254509018036073,1.7259519038076152,1.7264529058116231,1.7269539078156313,1.7274549098196392,1.7279559118236474,1.7284569138276553,1.7289579158316633,1.7294589178356714,1.7299599198396793,1.7304609218436873,1.7309619238476954,1.7314629258517034,1.7319639278557115,1.7324649298597194,1.7329659318637274,1.7334669338677355,1.7339679358717435,1.7344689378757514,1.7349699398797596,1.7354709418837675,1.7359719438877756,1.7364729458917836,1.7369739478957915,1.7374749498997997,1.7379759519038076,1.7384769539078155,1.7389779559118237,1.7394789579158316,1.7399799599198398,1.7404809619238477,1.7409819639278556,1.7414829659318638,1.7419839679358717,1.7424849699398797,1.7429859719438878,1.7434869739478958,1.743987975951904,1.7444889779559118,1.7449899799599198,1.745490981963928,1.7459919839679359,1.7464929859719438,1.746993987975952,1.74749498997996,1.747995991983968,1.748496993987976,1.748997995991984,1.749498997995992,1.75]}
},{}],66:[function(require,module,exports){
module.exports={"expected":[-0.8134198475976185,-0.8142802321219518,-0.8151418238991791,-0.8160046276047782,-0.8168686479412066,-0.8177338896381146,-0.8186003574525569,-0.8194680561692116,-0.8203369906005947,-0.8212071655872835,-0.822078585998136,-0.8229512567305188,-0.8238251827105308,-0.8247003688932352,-0.8255768202628876,-0.8264545418331734,-0.8273335386474403,-0.8282138157789413,-0.8290953783310699,-0.8299782314376102,-0.8308623802629752,-0.8317478300024626,-0.8326345858825004,-0.8335226531609019,-0.8344120371271242,-0.835302743102522,-0.8361947764406148,-0.8370881425273448,-0.8379828467813499,-0.8388788946542278,-0.8397762916308127,-0.8406750432294476,-0.841575155002264,-0.8424766325354618,-0.8433794814495946,-0.8442837073998551,-0.8451893160763672,-0.8460963132044746,-0.8470047045450446,-0.8479144958947579,-0.8488256930864198,-0.8497383019892589,-0.8506523285092414,-0.8515677785893798,-0.8524846582100492,-0.8534029733893074,-0.8543227301832165,-0.8552439346861689,-0.856166593031216,-0.857090711390403,-0.8580162959751024,-0.8589433530363587,-0.8598718888652269,-0.8608019097931255,-0.8617334221921837,-0.8626664324756009,-0.8636009470980007,-0.8645369725558008,-0.8654745153875728,-0.8664135821744214,-0.8673541795403532,-0.8682963141526603,-0.8692399927223025,-0.8701852220042962,-0.8711320087981067,-0.872080359948045,-0.8730302823436695,-0.8739817829201914,-0.8749348686588863,-0.8758895465875086,-0.8768458237807117,-0.8778037073604711,-0.8787632044965183,-0.8797243224067687,-0.8806870683577688,-0.8816514496651331,-0.8826174736939995,-0.8835851478594812,-0.8845544796271272,-0.8855254765133889,-0.8864981460860897,-0.8874724959649006,-0.8884485338218262,-0.8894262673816862,-0.8904057044226141,-0.8913868527765528,-0.8923697203297616,-0.8933543150233261,-0.8943406448536761,-0.8953287178731083,-0.896318542190315,-0.8973101259709215,-0.8983034774380271,-0.8992986048727541,-0.9002955166148037,-0.9012942210630173,-0.9022947266759439,-0.9032970419724206,-0.9043011755321483,-0.9053071359962888,-0.9063149320680562,-0.907324572513325,-0.9083360661612382,-0.9093494219048307,-0.9103646487016529,-0.9113817555744081,-0.9124007516115927,-0.9134216459681485,-0.9144444478661194,-0.9154691665953227,-0.9164958115140188,-0.9175243920495976,-0.9185549176992723,-0.9195873980307783,-0.9206218426830848,-0.9216582613671126,-0.9226966638664635,-0.9237370600381561,-0.9247794598133754,-0.9258238731982261,-0.9268703102745032,-0.9279187812004621,-0.9289692962116121,-0.9300218656215054,-0.9310764998225508,-0.9321332092868244,-0.9331920045669045,-0.9342528962967032,-0.9353158951923228,-0.9363810120529118,-0.9374482577615411,-0.9385176432860847,-0.939589179680119,-0.9406628780838274,-0.9417387497249217,-0.9428168059195741,-0.9438970580733617,-0.9449795176822243,-0.9460641963334329,-0.9471511057065772,-0.9482402575745573,-0.9493316638045991,-0.9504253363592743,-0.9515212872975427,-0.9526195287757999,-0.9537200730489506,-0.9548229324714829,-0.9559281194985733,-0.9570356466871908,-0.9581455266972309,-0.9592577722926541,-0.9603723963426495,-0.9614894118228056,-0.9626088318163075,-0.9637306695151419,-0.9648549382213242,-0.9659816513481457,-0.9671108224214293,-0.9682424650808127,-0.9693765930810444,-0.9705132202933026,-0.9716523607065267,-0.9727940284287765,-0.9739382376886012,-0.9750850028364408,-0.9762343383460335,-0.9773862588158584,-0.9785407789705849,-0.9796979136625579,-0.9808576778732911,-0.9820200867149956,-0.9831851554321184,-0.9843528994029158,-0.9855233341410408,-0.9866964752971609,-0.9878723386605949,-0.9890509401609808,-0.9902322958699629,-0.991416422002905,-0.9926033349206377,-0.9937930511312201,-0.9949855872917394,-0.9961809602101297,-0.9973791868470274,-0.9985802843176459,-0.9997842698936883,-1.0009911610052822,-1.0022009752429524,-1.0034137303596171,-1.0046294442726214,-1.0058481350657988,-1.0070698209915676,-1.0082945204730602,-1.0095222521062872,-1.0107530346623324,-1.0119868870895885,-1.0132238285160242,-1.0144638782514916,-1.0157070557900658,-1.0169533808124294,-1.0182028731882922,-1.0194555529788467,-1.0207114404392732,-1.0219705560212768,-1.0232329203756734,-1.024498554355013,-1.0257674790162525,-1.0270397156234656,-1.0283152856506081,-1.029594210784319,-1.0308765129267776,-1.0321622141986027,-1.0334513369418068,-1.034743903722794,-1.0360399373354177,-1.03733946080408,-1.0386424973868966,-1.0399490705789056,-1.041259204115341,-1.0425729219749549,-1.0438902483834045,-1.045211207816696,-1.0465358250046872,-1.0478641249346574,-1.0491961328549326,-1.050531874278584,-1.051871374987185,-1.0532146610346425,-1.0545617587510887,-1.0559126947468547,-1.0572674959165027,-1.0586261894429438,-1.059988802801623,-1.0613553637647855,-1.062725900405816,-1.064100441103668,-1.065479014547363,-1.0668616497405843,-1.068248376006348,-1.0696392229917695,-1.0710342206729127,-1.0724333993597372,-1.073836789701133,-1.0752444226900557,-1.0766563296687608,-1.078072542334133,-1.0794930927431245,-1.0809180133182923,-1.082347336853452,-1.0837810965194299,-1.0852193258699399,-1.0866620588475662,-1.088109329789873,-1.0895611734356248,-1.0910176249311432,-1.0924787198367778,-1.093944494133519,-1.0954149842297325,-1.096890226968042,-1.0983702596323406,-1.0998551199549542,-1.1013448461239452,-1.1028394767905731,-1.104339051076901,-1.105843608583565,-1.1073531893977118,-1.108867834101086,-1.1103875837783042,-1.1119124800252933,-1.1134425649579138,-1.1149778812207611,-1.1165184719961623,-1.1180643810133573,-1.1196156525578886,-1.121172331481183,-1.1227344632103544,-1.1243020937582089,-1.12587526973348,-1.1274540383512812,-1.1290384474437989,-1.1306285454712128,-1.132224381532874,-1.1338260053787195,-1.1354334674209592,-1.1370468187460137,-1.1386661111267387,-1.1402913970349153,-1.1419227296540368,-1.1435601628923922,-1.1452037513964433,-1.1468535505645265,-1.148509616560864,-1.1501720063299192,-1.1518407776110746,-1.1535159889536766,-1.1551976997324247,-1.1568859701631427,-1.1585808613189204,-1.1602824351466579,-1.1619907544839998,-1.163705883076699,-1.1654278855963955,-1.1671568276588453,-1.1688927758425938,-1.1706357977081268,-1.172385961817489,-1.1741433377544153,-1.1759079961449563,-1.1776800086786432,-1.17945944813019,-1.1812463883817554,-1.1830409044457861,-1.1848430724884493,-1.1866529698536883,-1.188470675087902,-1.1902962679652898,-1.1921298295138576,-1.1939714420421381,-1.1958211891666144,-1.1976791558398963,-1.19954542837966,-1.201420094498387,-1.2033032433339075,-1.205194965480811,-1.2070953530227095,-1.2090044995654272,-1.2109225002711017,-1.212849451893277,-1.214785452812975,-1.2167306030758156,-1.2186850044302011,-1.2206487603666099,-1.2226219761580421,-1.2246047589016413,-1.2265972175615625,-1.2285994630130948,-1.2306116080881255,-1.2326337676219496,-1.2346660585015174,-1.2367085997151355,-1.2387615124037026,-1.2408249199135184,-1.2428989478507393,-1.244983724137527,-1.2470793790699721,-1.2491860453778414,-1.251303858286238,-1.2534329555792278,-1.2555734776655332,-1.257725567646345,-1.2598893713853692,-1.262065037581164,-1.2642527178418874,-1.2664525667625368,-1.2686647420047763,-1.270889404379478,-1.2731267179320644,-1.2753768500307894,-1.2776399714580595,-1.2799162565049444,-1.2822058830689886,-1.2845090327554893,-1.286825890982361,-1.2891566470887728,-1.2915014944476897,-1.2938606305825213,-1.296234257288026,-1.2986225807556968,-1.3010258117037872,-1.30344416551223,-1.3058778623626324,-1.3083271273836148,-1.3107921908017055,-1.3132732880980866,-1.3157706601714292,-1.3182845535071375,-1.3208152203532804,-1.323362918903562,-1.3259279134876414,-1.328510474769175,-1.3311108799519726,-1.333729412994645,-1.3363663648342012,-1.3390220336190062,-1.3416967249516254,-1.3443907521420149,-1.3471044364716394,-1.3498381074690478,-1.3525921031975525,-1.3553667705556156,-1.3581624655906692,-1.3609795538270506,-1.3638184106088787,-1.3666794214586409,-1.3695629824524251,-1.3724695006126777,-1.3753993943195326,-1.378353093741751,-1.381331041288408,-1.3843336920825662,-1.3873615144581972,-1.3904149904817868,-1.3934946165000697,-1.3966009037155263,-1.399734378791314,-1.4028955844875104,-1.4060850803305949,-1.4093034433183158,-1.4125512686622042,-1.415829170570191,-1.4191377830719465,-1.422477760889818,-1.4258497803583794,-1.4292545403959656,-1.4326927635317044,-1.4361651969919627,-1.439672613850351,-1.4432158142458562,-1.446795626674001,-1.4504129093563545,-1.454068551694232,-1.4577634758128415,-1.4614986382027968,-1.465275031466425,-1.469093686177095,-1.4729556728604258,-1.476862104107191,-1.480814136828538,-1.4848129746652912,-1.488859870564132,-1.4929561295348222,-1.497103111603967,-1.5013022349824905,-1.5055549794656469,-1.509862890086513,-1.5142275810459895,-1.5186507399449722,-1.523134132347045,-1.527679606703345,-1.5322890996746978,-1.5369646418903355,-1.5417083641869918,-1.546522504377456,-1.5514094146036712,-1.5563715693361826,-1.5614115740896481,-1.566532174932942,-1.5717362688827952,-1.5770269152816108,-1.5824073482739487,-1.5878809905118607,-1.5934514682378633,-1.5991226279156463,-1.6048985546038823,-1.6107835922977867,-1.6167823664978525,-1.6228998093059306,-1.6291411873973858,-1.6355121332754965,-1.6420186802831778,-1.648667301929283,-1.655464956186108,-1.6624191355344564,-1.6695379236782921,-1.676830060028849,-1.684305013276031,-1.69197306563423,-1.6998454096833946,-1.7079342601432548,-1.7162529834421405,-1.7248162486046323,-1.7336402038263365,-1.7427426841883673,-1.7521434573674615,-1.7618645160308983,-1.7719304280217858,-1.782368758658774,-1.7932105838063133,-1.8044911182729035,-1.81625049223434,-1.828534719763203,-1.8413969197069848,-1.8548988724815862,-1.8691130306211288,-1.884125152307242,-1.9000378058568115,-1.9169751168928721,-1.935089329867054,-1.9545700890679383,-1.9756579209741356,-1.998664440077225,-2.024003771525621,-2.052243645178586,-2.084193163999863,-2.121064406952069,-2.164798289877086,-2.2188091258695435,-2.290032098532596,-2.396627958776389,-2.6297417762102957],"x":[1.75,1.750500601202405,1.7510012024048096,1.7515018036072145,1.7520024048096192,1.7525030060120241,1.7530036072144288,1.7535042084168337,1.7540048096192384,1.7545054108216434,1.755006012024048,1.755506613226453,1.7560072144288577,1.7565078156312626,1.7570084168336673,1.7575090180360722,1.7580096192384769,1.7585102204408818,1.7590108216432865,1.7595114228456914,1.760012024048096,1.760512625250501,1.761013226452906,1.7615138276553106,1.7620144288577155,1.7625150300601202,1.7630156312625251,1.7635162324649298,1.7640168336673347,1.7645174348697394,1.7650180360721444,1.765518637274549,1.766019238476954,1.7665198396793587,1.7670204408817636,1.7675210420841683,1.7680216432865732,1.7685222444889779,1.7690228456913828,1.7695234468937875,1.7700240480961924,1.770524649298597,1.771025250501002,1.7715258517034067,1.7720264529058116,1.7725270541082165,1.7730276553106212,1.7735282565130261,1.7740288577154308,1.7745294589178358,1.7750300601202404,1.7755306613226454,1.77603126252505,1.776531863727455,1.7770324649298597,1.7775330661322646,1.7780336673346693,1.7785342685370742,1.7790348697394789,1.7795354709418838,1.7800360721442885,1.7805366733466934,1.781037274549098,1.781537875751503,1.7820384769539077,1.7825390781563126,1.7830396793587175,1.7835402805611222,1.7840408817635272,1.7845414829659318,1.7850420841683368,1.7855426853707415,1.7860432865731464,1.786543887775551,1.787044488977956,1.7875450901803607,1.7880456913827656,1.7885462925851703,1.7890468937875752,1.78954749498998,1.7900480961923848,1.7905486973947895,1.7910492985971944,1.791549899799599,1.792050501002004,1.7925511022044087,1.7930517034068136,1.7935523046092183,1.7940529058116232,1.7945535070140282,1.7950541082164329,1.7955547094188378,1.7960553106212425,1.7965559118236474,1.797056513026052,1.797557114228457,1.7980577154308617,1.7985583166332666,1.7990589178356713,1.7995595190380762,1.800060120240481,1.8005607214428858,1.8010613226452905,1.8015619238476954,1.8020625250501001,1.802563126252505,1.8030637274549097,1.8035643286573146,1.8040649298597193,1.8045655310621243,1.8050661322645292,1.8055667334669339,1.8060673346693388,1.8065679358717435,1.8070685370741484,1.807569138276553,1.808069739478958,1.8085703406813627,1.8090709418837676,1.8095715430861723,1.8100721442885772,1.810572745490982,1.8110733466933868,1.8115739478957915,1.8120745490981964,1.8125751503006011,1.813075751503006,1.8135763527054107,1.8140769539078156,1.8145775551102203,1.8150781563126253,1.81557875751503,1.8160793587174349,1.8165799599198398,1.8170805611222445,1.8175811623246494,1.818081763527054,1.818582364729459,1.8190829659318637,1.8195835671342686,1.8200841683366733,1.8205847695390782,1.821085370741483,1.8215859719438878,1.8220865731462925,1.8225871743486974,1.8230877755511021,1.823588376753507,1.8240889779559117,1.8245895791583167,1.8250901803607213,1.8255907815631263,1.826091382765531,1.8265919839679359,1.8270925851703408,1.8275931863727455,1.8280937875751504,1.828594388777555,1.82909498997996,1.8295955911823647,1.8300961923847696,1.8305967935871743,1.8310973947895792,1.831597995991984,1.8320985971943888,1.8325991983967935,1.8330997995991984,1.8336004008016031,1.834101002004008,1.8346016032064127,1.8351022044088177,1.8356028056112224,1.8361034068136273,1.836604008016032,1.8371046092184369,1.8376052104208416,1.8381058116232465,1.8386064128256514,1.839107014028056,1.839607615230461,1.8401082164328657,1.8406088176352706,1.8411094188376753,1.8416100200400802,1.842110621242485,1.8426112224448898,1.8431118236472945,1.8436124248496994,1.8441130260521041,1.844613627254509,1.8451142284569138,1.8456148296593187,1.8461154308617234,1.8466160320641283,1.847116633266533,1.8476172344689379,1.8481178356713426,1.8486184368737475,1.8491190380761524,1.849619639278557,1.850120240480962,1.8506208416833667,1.8511214428857716,1.8516220440881763,1.8521226452905812,1.852623246492986,1.8531238476953908,1.8536244488977955,1.8541250501002005,1.8546256513026051,1.85512625250501,1.8556268537074148,1.8561274549098197,1.8566280561122244,1.8571286573146293,1.857629258517034,1.858129859719439,1.8586304609218436,1.8591310621242485,1.8596316633266534,1.860132264529058,1.860632865731463,1.8611334669338677,1.8616340681362726,1.8621346693386773,1.8626352705410822,1.863135871743487,1.8636364729458919,1.8641370741482965,1.8646376753507015,1.8651382765531062,1.865638877755511,1.8661394789579158,1.8666400801603207,1.8671406813627254,1.8676412825651303,1.868141883767535,1.86864248496994,1.8691430861723446,1.8696436873747495,1.8701442885771542,1.8706448897795591,1.871145490981964,1.8716460921843687,1.8721466933867736,1.8726472945891783,1.8731478957915833,1.873648496993988,1.8741490981963929,1.8746496993987976,1.8751503006012025,1.8756509018036072,1.876151503006012,1.8766521042084168,1.8771527054108217,1.8776533066132264,1.8781539078156313,1.878654509018036,1.879155110220441,1.8796557114228456,1.8801563126252505,1.8806569138276552,1.8811575150300601,1.881658116232465,1.8821587174348697,1.8826593186372746,1.8831599198396793,1.8836605210420843,1.884161122244489,1.8846617234468939,1.8851623246492986,1.8856629258517035,1.8861635270541082,1.886664128256513,1.8871647294589178,1.8876653306613227,1.8881659318637274,1.8886665330661323,1.889167134268537,1.889667735470942,1.8901683366733466,1.8906689378757515,1.8911695390781562,1.8916701402805611,1.8921707414829658,1.8926713426853707,1.8931719438877757,1.8936725450901803,1.8941731462925853,1.89467374749499,1.8951743486973949,1.8956749498997996,1.8961755511022045,1.8966761523046092,1.897176753507014,1.8976773547094188,1.8981779559118237,1.8986785571142284,1.8991791583166333,1.899679759519038,1.900180360721443,1.9006809619238476,1.9011815631262525,1.9016821643286572,1.9021827655310621,1.9026833667334668,1.9031839679358717,1.9036845691382767,1.9041851703406814,1.9046857715430863,1.905186372745491,1.9056869739478959,1.9061875751503006,1.9066881763527055,1.9071887775551102,1.907689378757515,1.9081899799599198,1.9086905811623247,1.9091911823647294,1.9096917835671343,1.910192384769539,1.910692985971944,1.9111935871743486,1.9116941883767535,1.9121947895791582,1.9126953907815631,1.9131959919839678,1.9136965931863728,1.9141971943887774,1.9146977955911824,1.9151983967935873,1.915698997995992,1.9161995991983969,1.9167002004008016,1.9172008016032065,1.9177014028056112,1.918202004008016,1.9187026052104208,1.9192032064128257,1.9197038076152304,1.9202044088176353,1.92070501002004,1.921205611222445,1.9217062124248496,1.9222068136272545,1.9227074148296592,1.9232080160320641,1.9237086172344688,1.9242092184368738,1.9247098196392785,1.9252104208416834,1.9257110220440883,1.926211623246493,1.926712224448898,1.9272128256513026,1.9277134268537075,1.9282140280561122,1.928714629258517,1.9292152304609218,1.9297158316633267,1.9302164328657314,1.9307170340681363,1.931217635270541,1.931718236472946,1.9322188376753506,1.9327194388777555,1.9332200400801602,1.9337206412825652,1.9342212424849698,1.9347218436873748,1.9352224448897795,1.9357230460921844,1.936223647294589,1.936724248496994,1.937224849699399,1.9377254509018036,1.9382260521042085,1.9387266533066132,1.9392272545090181,1.9397278557114228,1.9402284569138277,1.9407290581162324,1.9412296593186373,1.941730260521042,1.942230861723447,1.9427314629258516,1.9432320641282566,1.9437326653306612,1.9442332665330662,1.9447338677354709,1.9452344689378758,1.9457350701402805,1.9462356713426854,1.94673627254509,1.947236873747495,1.9477374749499,1.9482380761523046,1.9487386773547095,1.9492392785571142,1.9497398797595191,1.9502404809619238,1.9507410821643287,1.9512416833667334,1.9517422845691383,1.952242885771543,1.952743486973948,1.9532440881763526,1.9537446893787576,1.9542452905811623,1.9547458917835672,1.9552464929859719,1.9557470941883768,1.9562476953907815,1.9567482965931864,1.957248897795591,1.957749498997996,1.958250100200401,1.9587507014028056,1.9592513026052105,1.9597519038076152,1.9602525050100201,1.9607531062124248,1.9612537074148297,1.9617543086172344,1.9622549098196393,1.962755511022044,1.963256112224449,1.9637567134268537,1.9642573146292586,1.9647579158316633,1.9652585170340682,1.9657591182364729,1.9662597194388778,1.9667603206412825,1.9672609218436874,1.967761523046092,1.968262124248497,1.9687627254509017,1.9692633266533066,1.9697639278557115,1.9702645290581162,1.9707651302605211,1.9712657314629258,1.9717663326653307,1.9722669338677354,1.9727675350701404,1.973268136272545,1.97376873747495,1.9742693386773547,1.9747699398797596,1.9752705410821643,1.9757711422845692,1.9762717434869739,1.9767723446893788,1.9772729458917835,1.9777735470941884,1.978274148296593,1.978774749498998,1.9792753507014027,1.9797759519038076,1.9802765531062125,1.9807771543086172,1.9812777555110221,1.9817783567134268,1.9822789579158318,1.9827795591182364,1.9832801603206414,1.983780761523046,1.984281362725451,1.9847819639278557,1.9852825651302606,1.9857831663326653,1.9862837675350702,1.9867843687374749,1.9872849699398798,1.9877855711422845,1.9882861723446894,1.988786773547094,1.989287374749499,1.9897879759519037,1.9902885771543086,1.9907891783567133,1.9912897795591182,1.9917903807615231,1.9922909819639278,1.9927915831663328,1.9932921843687375,1.9937927855711424,1.994293386773547,1.994793987975952,1.9952945891783567,1.9957951903807616,1.9962957915831663,1.9967963927855712,1.9972969939879759,1.9977975951903808,1.9982981963927855,1.9987987975951904,1.999299398797595,1.9998]}
},{}],67:[function(require,module,exports){
module.exports={"expected":[-2.6297417762102957,-2.6301000913988455,-2.6304590832188754,-2.630818754323363,-2.631179107381878,-2.6315401450785085,-2.6319018701147954,-2.632264285207647,-2.6326273930904827,-2.6329911965131587,-2.6333556982418957,-2.63372090106043,-2.6340868077679196,-2.634453421181915,-2.6348207441362717,-2.6351887794820947,-2.635557530088704,-2.6359269988415246,-2.6362971886453,-2.6366681024209573,-2.6370397431088364,-2.6374121136665756,-2.637785217070088,-2.6381590563145307,-2.638533634412193,-2.6389089543955393,-2.6392850193150994,-2.6396618322406527,-2.64003939626118,-2.640417714485032,-2.6407967900400897,-2.6411766260737095,-2.641557225753751,-2.641938592267458,-2.6423207288224937,-2.642703638646887,-2.643087324989211,-2.643471791118545,-2.643857040325717,-2.64424307592114,-2.6446299012379773,-2.645017519629976,-2.6454059344725147,-2.6457951491636367,-2.6461851671218874,-2.646575991789723,-2.6469676266302673,-2.647360075130516,-2.6477533408002523,-2.64814742717093,-2.648542337798931,-2.6489380762622727,-2.64933464616432,-2.6497320511304783,-2.650130294811712,-2.6505293808823214,-2.650929313041054,-2.6513300950122036,-2.651731730543389,-2.6521342234088876,-2.65253757740742,-2.652941796363483,-2.653346884127369,-2.653752844575381,-2.6541596816098676,-2.654567399160342,-2.6549760011823826,-2.655385491658777,-2.655795874599541,-2.6562071540419434,-2.656619334051898,-2.657032418721711,-2.657446412173759,-2.6578613185571025,-2.658277142050947,-2.6586938868635426,-2.6591115572310695,-2.6595301574211407,-2.659949691729384,-2.6603701644834254,-2.6607915800394593,-2.6612139427857944,-2.6616372571417504,-2.662061527556538,-2.662486758512849,-2.6629129545233905,-2.6633401201347238,-2.6637682599249795,-2.664197378505352,-2.6646274805201777,-2.665058570647011,-2.6654906535979133,-2.66592373411834,-2.6663578169884294,-2.6667929070231033,-2.667229009072398,-2.6676661280215743,-2.6681042687926775,-2.6685434363422145,-2.668983635664915,-2.6694248717914206,-2.6698671497896194,-2.670310474765998,-2.67075485186332,-2.671200286264689,-2.6716467831899924,-2.672094347900247,-2.6725429856940246,-2.6729927019113253,-2.6734435019325,-2.6738953911771546,-2.6743483751080626,-2.6748024592275814,-2.6752576490818427,-2.67571395025841,-2.676171368387734,-2.6766299091445993,-2.6770895782457806,-2.6775503814540587,-2.6780123245758785,-2.678475413463091,-2.678939654013163,-2.6794050521696593,-2.6798716139224688,-2.680339345309328,-2.6808082524147654,-2.6812783413716375,-2.681749618361387,-2.682222089614553,-2.682695761411034,-2.6831706400814044,-2.683646732007462,-2.684124043619869,-2.684602581403708,-2.6850823518948297,-2.6855633616827936,-2.6860456174111915,-2.6865291257752784,-2.6870138935276566,-2.6874999274745788,-2.687987234479523,-2.6884758214608366,-2.688965695394786,-2.68945686331593,-2.6899493323161323,-2.6904431095476538,-2.690938202220821,-2.691434617607147,-2.6919323630397454,-2.6924314459129155,-2.6929318736828387,-2.6934336538693886,-2.693936794056582,-2.694441301893024,-2.6949471850923743,-2.6954544514338066,-2.695963108763889,-2.6964731649970832,-2.6969846281162493,-2.697497506173148,-2.698011807288965,-2.6985275396562556,-2.699044711539505,-2.6995633312762535,-2.7000834072747897,-2.700604948020476,-2.701127962072025,-2.70165245806499,-2.7021784447123864,-2.702705930802407,-2.7032349252048857,-2.7037654368675863,-2.704297474820377,-2.704831048172979,-2.7053661661186004,-2.705902837934657,-2.7064410729820123,-2.706980880708995,-2.707522270647662,-2.708065252420566,-2.7086098357385415,-2.709156030402106,-2.70970384630228,-2.710253293422924,-2.7108043818416068,-2.7113571217304693,-2.7119115233571174,-2.712467597085513,-2.713025353378436,-2.7135848027984353,-2.714145956009414,-2.714708823774494,-2.7152734169632335,-2.715839746547985,-2.716407823608056,-2.716977659330783,-2.7175492650094477,-2.718122652050707,-2.718697831970976,-2.719274816401709,-2.719853617085784,-2.720434245885097,-2.7210167147785853,-2.721601035863474,-2.7221872213597704,-2.722775283606709,-2.723365235070562,-2.7239570883427495,-2.7245508561418696,-2.725146551315095,-2.7257441868412524,-2.7263437758322993,-2.7269453315348167,-2.7275488673315356,-2.728154396742885,-2.72876193343025,-2.729371491197602,-2.729983083993837,-2.7305967259110595,-2.731212431193094,-2.731830214232148,-2.7324500895740127,-2.733072071919902,-2.733696176124879,-2.734322417206645,-2.734950810342321,-2.7355813708738927,-2.7362141143102505,-2.7368490563257546,-2.737486212769353,-2.7381255996614815,-2.7387672332008557,-2.739411129761389,-2.740057305901602,-2.7407057783634188,-2.741356564074542,-2.7420096801545064,-2.7426651439117493,-2.7433229728533917,-2.743983184684235,-2.744645797310138,-2.745310828840725,-2.745978297593986,-2.746648222099128,-2.7473206210998335,-2.747995513555362,-2.7486729186472725,-2.7493528557806592,-2.75003534458917,-2.7507204049382383,-2.7514080569264685,-2.7520983208927867,-2.7527912174179754,-2.753486767330873,-2.75418499170849,-2.7548859118835236,-2.755589549448116,-2.7562959262557403,-2.757005064428618,-2.757716986359383,-2.758431714717119,-2.7591492724515585,-2.7598696827973397,-2.7605929692807925,-2.761319155720793,-2.76204826623735,-2.762780325256281,-2.763515357511987,-2.76425338805639,-2.764994442259873,-2.7657385458204646,-2.766485724769109,-2.7672360054733653,-2.76798941464496,-2.7687459793453937,-2.7695057269921097,-2.7702686853643606,-2.77103488261135,-2.771804347256689,-2.772577108204696,-2.773353194751114,-2.7741326365858843,-2.7749154638020417,-2.775701706904823,-2.77649139681442,-2.7772845648797753,-2.778081242881672,-2.7788814630429868,-2.779685258036511,-2.7804926609929477,-2.7813037055113634,-2.7821184256653573,-2.7829368560139183,-2.783759031610266,-2.784584988010898,-2.7854147612876323,-2.786248388032993,-2.787085905375021,-2.787927350984984,-2.7887727630899737,-2.789622180483447,-2.79047564253367,-2.791333189199505,-2.792194861039434,-2.793060699226085,-2.7939307455563145,-2.7948050424634663,-2.795683633034846,-2.796566561019831,-2.797453870848051,-2.798345607640611,-2.7992418172241087,-2.800142546149996,-2.8010478417049502,-2.801957751929054,-2.8028723256314505,-2.8037916124063953,-2.804715662652331,-2.8056445275863213,-2.8065782592640485,-2.8075169105977777,-2.808460535374809,-2.809409188279609,-2.8103629249086235,-2.8113218017961437,-2.8122858764323584,-2.8132552072872925,-2.8142298538327357,-2.8152098765620828,-2.8161953370189474,-2.8171862978183713,-2.818182822674733,-2.819184976424947,-2.820192825054543,-2.8212064357301894,-2.822225876821875,-2.823251217937135,-2.8242825299477414,-2.8253198850200834,-2.8263633566522843,-2.8274130197014107,-2.828468950420305,-2.8295312264920485,-2.8305999270655278,-2.8316751327950858,-2.832756925875486,-2.8338453900846083,-2.8349406108208757,-2.836042675151056,-2.8371516718510454,-2.8382676914473777,-2.8393908262725596,-2.84052117050349,-2.8416588202200757,-2.842803873453178,-2.8439564302348113,-2.8451165926590893,-2.8462844649355947,-2.8474601534517716,-2.8486437668303104,-2.8498354159951655,-2.8510352142366275,-2.85224327727872,-2.8534597233524415,-2.8546846732655546,-2.8559182504776794,-2.8571605811850844,-2.8584117943947565,-2.859672022015246,-2.860941398940405,-2.8622200631398664,-2.863508155760163,-2.8648058212161147,-2.866113207297377,-2.867430465270449,-2.8687577499957664,-2.870095220039137,-2.8714430377869107,-2.8728013695809262,-2.8741703858362326,-2.875550261186643,-2.8769411746209794,-2.8783433096250137,-2.879756854345172,-2.8811820017355374,-2.8826189497359107,-2.884067901436787,-2.8855290652645245,-2.8870026551698738,-2.8884888908249566,-2.8899879978333165,-2.8915002079411836,-2.8930257592669353,-2.894564896536978,-2.8961178713335665,-2.8976849423543904,-2.8992663756845847,-2.9008624450810068,-2.9024734322748866,-2.904099627280361,-2.9057413287275087,-2.907398844207529,-2.9090724906354795,-2.9107625946363522,-2.912469492941709,-2.914193532817642,-2.9159350725047983,-2.917694481696631,-2.919472142029793,-2.9212684476003323,-2.923083805528669,-2.924918636525678,-2.9267733755216994,-2.928648472310837,-2.93054439223362,-2.9324616169146296,-2.9344006450277944,-2.9363619931196547,-2.938346196470587,-2.940353810020203,-2.942385409344841,-2.9444415916967968,-2.946522977116972,-2.9486302096020864,-2.9507639583710303,-2.9529249192035567,-2.9551138158643684,-2.9573314016357077,-2.959578460949974,-2.961855811137169,-2.964164304303459,-2.966504829332682,-2.968878314049396,-2.9712857275285054,-2.9737280826000796,-2.9762064385275298,-2.9787219038934385,-2.981275639742753,-2.983868862936237,-2.9865028498226187,-2.9891789401871542,-2.991898541534799,-2.9946631337735368,-2.9974742742619327,-3.0003336033584973,-3.00324285042434,-3.0062038404331566,-3.0092185011621715,-3.0122888711010245,-3.015417108137443,-3.018605499086513,-3.021856470239536,-3.0251725989683274,-3.0285566265971977,-3.032011472666572,-3.0355402507883107,-3.0391462863068144,-3.042833136031542,-3.0466046103069266,-3.050464797806609,-3.054418093430243,-3.058469229794416,-3.0626233129029705,-3.066885862626989,-3.071262858904486,-3.075760794505534,-3.080386735688006,-3.0851483920593297,-3.090054197440591,-3.095113403940576,-3.1003361917641237,-3.105733798232731,-3.1113186699843514,-3.1171046437709062,-3.1231071623510243,-3.12934353416247,-3.135833247831464,-3.1425983559979644,-3.1496639478454598,-3.157058735941727,-3.1648157925401184,-3.172973483446196,-3.1815766668520173,-3.1906782529720505,-3.2003412634689226,-3.210641596387407,-3.2216718088423764,-3.233546403811669,-3.2464094028260044,-3.2604455065647096,-3.275897103436739,-3.2930912480180643,-3.3124845828698093,-3.3347427961347758,-3.360892469182823,-3.392642776785606,-3.4331737620186193,-3.4895555036521424,-3.5840249110755766,-5.805018683193453],"x":[1.9998,1.9998004008016033,1.9998008016032065,1.9998012024048095,1.999801603206413,1.999802004008016,1.9998024048096192,1.9998028056112225,1.9998032064128257,1.999803607214429,1.999804008016032,1.9998044088176354,1.9998048096192385,1.9998052104208417,1.999805611222445,1.999806012024048,1.9998064128256514,1.9998068136272544,1.999807214428858,1.999807615230461,1.9998080160320642,1.9998084168336674,1.9998088176352704,1.9998092184368739,1.9998096192384769,1.9998100200400801,1.9998104208416834,1.9998108216432866,1.9998112224448898,1.999811623246493,1.9998120240480963,1.9998124248496993,1.9998128256513026,1.9998132264529058,1.999813627254509,1.9998140280561123,1.9998144288577155,1.9998148296593186,1.999815230460922,1.999815631262525,1.9998160320641283,1.9998164328657315,1.9998168336673345,1.999817234468938,1.999817635270541,1.9998180360721445,1.9998184368737475,1.9998188376753505,1.999819238476954,1.999819639278557,1.9998200400801605,1.9998204408817635,1.999820841683367,1.99982124248497,1.9998216432865732,1.9998220440881764,1.9998224448897794,1.999822845691383,1.999823246492986,1.9998236472945892,1.9998240480961924,1.9998244488977956,1.9998248496993989,1.9998252505010021,1.9998256513026051,1.9998260521042084,1.9998264529058116,1.9998268537074149,1.999827254509018,1.9998276553106211,1.9998280561122246,1.9998284569138276,1.999828857715431,1.999829258517034,1.999829659318637,1.9998300601202406,1.9998304609218436,1.999830861723447,1.99983126252505,1.9998316633266535,1.9998320641282565,1.9998324649298596,1.999832865731463,1.999833266533066,1.9998336673346695,1.9998340681362725,1.9998344689378758,1.999834869739479,1.9998352705410822,1.9998356713426855,1.9998360721442885,1.9998364729458917,1.999836873747495,1.9998372745490982,1.9998376753507014,1.9998380761523047,1.9998384769539077,1.9998388777555112,1.9998392785571142,1.9998396793587174,1.9998400801603207,1.9998404809619237,1.9998408817635271,1.9998412825651302,1.9998416833667336,1.9998420841683366,1.99984248496994,1.9998428857715431,1.9998432865731461,1.9998436873747496,1.9998440881763526,1.999844488977956,1.999844889779559,1.9998452905811623,1.9998456913827656,1.9998460921843686,1.999846492985972,1.999846893787575,1.9998472945891783,1.9998476953907816,1.9998480961923848,1.999848496993988,1.9998488977955913,1.9998492985971943,1.9998496993987975,1.9998501002004008,1.999850501002004,1.9998509018036073,1.9998513026052105,1.9998517034068135,1.9998521042084165,1.9998525050100202,1.9998529058116232,1.9998533066132265,1.9998537074148295,1.9998541082164325,1.9998545090180362,1.9998549098196392,1.9998553106212424,1.9998557114228455,1.999856112224449,1.9998565130260522,1.9998569138276552,1.9998573146292584,1.9998577154308614,1.999858116232465,1.9998585170340681,1.9998589178356712,1.9998593186372744,1.9998597194388779,1.999860120240481,1.9998605210420841,1.9998609218436871,1.9998613226452904,1.9998617234468938,1.999862124248497,1.9998625250501,1.999862925851703,1.9998633266533064,1.9998637274549098,1.999864128256513,1.999864529058116,1.999864929859719,1.9998653306613228,1.9998657314629258,1.999866132264529,1.999866533066132,1.999866933867735,1.9998673346693387,1.9998677354709418,1.999868136272545,1.999868537074148,1.9998689378757515,1.9998693386773547,1.9998697394789577,1.999870140280561,1.999870541082164,1.9998709418837677,1.9998713426853707,1.9998717434869737,1.999872144288577,1.9998725450901804,1.9998729458917837,1.9998733466933867,1.9998737474949897,1.999874148296593,1.9998745490981964,1.9998749498997996,1.9998753507014027,1.9998757515030057,1.9998761523046094,1.9998765531062124,1.9998769539078156,1.9998773547094186,1.9998777555110216,1.9998781563126253,1.9998785571142284,1.9998789579158316,1.9998793587174346,1.9998797595190383,1.9998801603206413,1.9998805611222443,1.9998809619238476,1.9998813627254506,1.9998817635270543,1.9998821643286573,1.9998825651302603,1.9998829659318635,1.999883366733467,1.9998837675350702,1.9998841683366733,1.9998845691382763,1.9998849699398795,1.999885370741483,1.9998857715430862,1.9998861723446892,1.9998865731462923,1.999886973947896,1.999887374749499,1.9998877755511022,1.9998881763527052,1.9998885771543082,1.999888977955912,1.999889378757515,1.9998897795591182,1.9998901803607212,1.9998905811623242,1.999890981963928,1.999891382765531,1.9998917835671342,1.9998921843687372,1.9998925851703409,1.9998929859719439,1.9998933867735469,1.9998937875751501,1.9998941883767531,1.9998945891783568,1.9998949899799598,1.9998953907815629,1.999895791583166,1.9998961923847696,1.9998965931863728,1.9998969939879758,1.9998973947895788,1.9998977955911823,1.9998981963927855,1.9998985971943888,1.9998989979959918,1.9998993987975948,1.9998997995991983,1.9999002004008015,1.9999006012024048,1.9999010020040078,1.9999014028056112,1.9999018036072145,1.9999022044088175,1.9999026052104207,1.9999030060120238,1.999903406813627,1.9999038076152302,1.9999042084168335,1.9999046092184367,1.9999050100200397,1.9999054108216432,1.9999058116232464,1.9999062124248494,1.9999066132264527,1.9999070140280557,1.9999074148296592,1.9999078156312624,1.9999082164328654,1.9999086172344687,1.999909018036072,1.9999094188376751,1.9999098196392784,1.9999102204408816,1.9999106212424846,1.9999110220440879,1.9999114228456913,1.9999118236472944,1.9999122244488976,1.9999126252505008,1.9999130260521039,1.9999134268537073,1.9999138276553103,1.9999142284569136,1.9999146292585168,1.99991503006012,1.9999154308617233,1.9999158316633263,1.9999162324649296,1.9999166332665328,1.999917034068136,1.9999174348697393,1.9999178356713423,1.9999182364729458,1.999918637274549,1.9999190380761522,1.9999194388777553,1.9999198396793583,1.9999202404809617,1.999920641282565,1.9999210420841682,1.9999214428857712,1.9999218436873745,1.999922244488978,1.999922645290581,1.9999230460921842,1.9999234468937872,1.9999238476953904,1.999924248496994,1.999924649298597,1.9999250501002002,1.9999254509018034,1.9999258517034066,1.9999262525050099,1.999926653306613,1.9999270541082161,1.9999274549098194,1.9999278557114226,1.9999282565130259,1.9999286573146289,1.9999290581162323,1.9999294589178356,1.9999298597194388,1.9999302605210418,1.9999306613226449,1.9999310621242483,1.9999314629258516,1.9999318637274548,1.9999322645290578,1.999932665330661,1.9999330661322645,1.9999334669338675,1.9999338677354708,1.9999342685370738,1.999934669338677,1.9999350701402805,1.9999354709418835,1.9999358717434867,1.99993627254509,1.9999366733466932,1.9999370741482965,1.9999374749498995,1.9999378757515027,1.999938276553106,1.9999386773547094,1.9999390781563124,1.9999394789579155,1.999939879759519,1.999940280561122,1.9999406813627254,1.9999410821643284,1.9999414829659314,1.999941883767535,1.9999422845691381,1.9999426853707414,1.9999430861723444,1.9999434869739476,1.9999438877755509,1.9999442885771541,1.9999446893787574,1.9999450901803604,1.9999454909819636,1.999945891783567,1.99994629258517,1.9999466933867733,1.9999470941883764,1.9999474949899796,1.999947895791583,1.999948296593186,1.9999486973947893,1.9999490981963925,1.999949498997996,1.999949899799599,1.999950300601202,1.9999507014028055,1.9999511022044085,1.999951503006012,1.999951903807615,1.999952304609218,1.9999527054108215,1.9999531062124245,1.999953507014028,1.999953907815631,1.9999543086172342,1.9999547094188375,1.9999551102204407,1.999955511022044,1.999955911823647,1.9999563126252502,1.9999567134268534,1.9999571142284567,1.99995751503006,1.9999579158316632,1.9999583166332664,1.9999587174348696,1.9999591182364727,1.999959519038076,1.9999599198396791,1.9999603206412824,1.9999607214428856,1.9999611222444886,1.9999615230460919,1.9999619238476951,1.9999623246492986,1.9999627254509016,1.9999631262525046,1.999963527054108,1.999963927855711,1.9999643286573145,1.9999647294589176,1.9999651302605206,1.999965531062124,1.9999659318637273,1.9999663326653305,1.9999667334669335,1.9999671342685368,1.99996753507014,1.9999679358717433,1.9999683366733465,1.9999687374749495,1.999969138276553,1.9999695390781562,1.9999699398797592,1.9999703406813625,1.9999707414829657,1.999971142284569,1.9999715430861722,1.9999719438877752,1.9999723446893785,1.9999727454909817,1.9999731462925852,1.9999735470941882,1.9999739478957912,1.9999743486973947,1.9999747494989977,1.9999751503006011,1.9999755511022042,1.9999759519038072,1.9999763527054106,1.9999767535070136,1.9999771543086171,1.9999775551102201,1.9999779559118236,1.9999783567134266,1.9999787575150298,1.999979158316633,1.999979559118236,1.9999799599198396,1.9999803607214426,1.9999807615230458,1.999981162324649,1.9999815631262523,1.9999819639278555,1.9999823647294588,1.9999827655310618,1.999983166332665,1.9999835671342683,1.9999839679358715,1.9999843687374748,1.9999847695390778,1.9999851703406812,1.9999855711422843,1.9999859719438877,1.9999863727454907,1.9999867735470938,1.9999871743486972,1.9999875751503002,1.9999879759519037,1.9999883767535067,1.9999887775551102,1.9999891783567132,1.9999895791583164,1.9999899799599197,1.9999903807615227,1.9999907815631262,1.9999911823647292,1.9999915831663324,1.9999919839679356,1.999992384769539,1.9999927855711421,1.9999931863727454,1.9999935871743484,1.9999939879759516,1.9999943887775549,1.999994789579158,1.9999951903807613,1.9999955911823644,1.9999959919839678,1.9999963927855708,1.999996793587174,1.9999971943887773,1.9999975951903806,1.9999979959919838,1.9999983967935868,1.9999987975951903,1.9999991983967933,1.9999995991983968,1.9999999999999998]}
},{}],68:[function(require,module,exports){
module.exports={"expected":[-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,-5.805018683193453,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"x":[1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,1.9999999999999998,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0]}
},{}],69:[function(require,module,exports){
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
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var erfcinv = require( './../lib' );


// FIXTURES //

var x1 = require( './fixtures/julia/x_0.5_1.5.json' );
var x2 = require( './fixtures/julia/x_0.25_0.5.json' );
var x3 = require( './fixtures/julia/x_1.5_1.75.json' );
var x4 = require( './fixtures/julia/x_1.75_1.9998.json' );
var x5 = require( './fixtures/julia/x_0.0002_0.25.json' );
var x6 = require( './fixtures/julia/x_1.9998_1.9999..8.json' );
var x7 = require( './fixtures/julia/x_1.9999..8_2.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof erfcinv, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var y = erfcinv( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `0`, the function returns `+infinity`', function test( t ) {
	var y = erfcinv( 0.0 );
	t.equal( y, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if provided `2`, the function returns `-infinity`', function test( t ) {
	var y = erfcinv( 2.0 );
	t.equal( y, NINF, 'returns `-infinity`' );
	t.end();
});

tape( 'if provided `1`, the function returns `0`', function test( t ) {
	var y = erfcinv( 1.0 );
	t.equal( isPositiveZero( y ), true, 'returns `+0`' );
	t.end();
});

tape( 'if provided a value which is either less than `0` or greater than `2`, the function returns `NaN`', function test( t ) {
	var values;
	var v;
	var i;

	values = [
		3.14,
		-3.14,
		-0.00000001,
		2.00000001,
		PINF,
		NINF
	];

	for ( i = 0; i < values.length; i++ ) {
		v = erfcinv( values[i] );
		t.equal( isnan( v ), true, 'returns NaN when provided '+values[i] );
	}
	t.end();
});

tape( 'the function evaluates the inverse complementary error function for `x` on the interval `[0.5,1.5]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x1.expected;
	x = x1.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfcinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 3.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse complementary error function for `x` on the interval `[0.25,0.5]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x2.expected;
	x = x2.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfcinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 3.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse complementary error function for `x` on the interval `[1.5,1.75]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x3.expected;
	x = x3.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfcinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 3.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse complementary error function for `x` on the interval `[1.75,1.9998]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x4.expected;
	x = x4.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfcinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 13.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse complementary error function for `x` on the interval `[0.0002,0.25]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x5.expected;
	x = x5.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfcinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 14.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse complementary error function for `x` on the interval `[1.9998,1.9999..8]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x6.expected;
	x = x6.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfcinv( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 9.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the inverse complementary error function for `x` on the interval `[1.9999..8,2]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = x7.expected;
	x = x7.x;
	for ( i = 0; i < x.length; i++ ) {
		y = erfcinv( x[i] );
		if ( expected[ i ] === null ) {
			expected[ i ] = NINF;
		}
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/erfcinv/test/test.js")
},{"./../lib":56,"./fixtures/julia/x_0.0002_0.25.json":62,"./fixtures/julia/x_0.25_0.5.json":63,"./fixtures/julia/x_0.5_1.5.json":64,"./fixtures/julia/x_1.5_1.75.json":65,"./fixtures/julia/x_1.75_1.9998.json":66,"./fixtures/julia/x_1.9998_1.9999..8.json":67,"./fixtures/julia/x_1.9999..8_2.json":68,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/assert/is-positive-zero":51,"@stdlib/math/base/special/abs":53,"tape":194}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm.
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

var ln = require( './ln.js' );


// EXPORTS //

module.exports = ln;

},{"./ln.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* Evaluates the natural logarithm.
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

},{"./polyval_p.js":72,"./polyval_q.js":73,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":49,"@stdlib/number/float64/base/get-high-word":79,"@stdlib/number/float64/base/set-high-word":82}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

var sqrt = require( './main.js' );


// EXPORTS //

module.exports = sqrt;

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

var Number = require( './number.js' );


// EXPORTS //

module.exports = Number;

},{"./number.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var getHighWord = require( './main.js' );


// EXPORTS //

module.exports = getHighWord;

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

},{"./high.js":78,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],81:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":78}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
* var PINF = require( '@stdlib/constants/float64/pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './main.js' );


// EXPORTS //

module.exports = setHighWord;

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
* var y = setHighWord( 3.14e201, high ); //  => 0 00000000000 0000000000000000010110010011110010110101100010000010
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

},{"./high.js":81,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './native_class.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":85,"./polyfill.js":86,"@stdlib/assert/has-tostringtag-support":20}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":87}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":87,"./tostringtag.js":88,"@stdlib/assert/has-own-property":16}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){

},{}],91:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"dup":90}],92:[function(require,module,exports){
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
},{"base64-js":89,"buffer":92,"ieee754":180}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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
},{"_process":186}],95:[function(require,module,exports){
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

},{"events":93,"inherits":181,"readable-stream/lib/_stream_duplex.js":97,"readable-stream/lib/_stream_passthrough.js":98,"readable-stream/lib/_stream_readable.js":99,"readable-stream/lib/_stream_transform.js":100,"readable-stream/lib/_stream_writable.js":101,"readable-stream/lib/internal/streams/end-of-stream.js":105,"readable-stream/lib/internal/streams/pipeline.js":107}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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
},{"./_stream_readable":99,"./_stream_writable":101,"_process":186,"inherits":181}],98:[function(require,module,exports){
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
},{"./_stream_transform":100,"inherits":181}],99:[function(require,module,exports){
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
},{"../errors":96,"./_stream_duplex":97,"./internal/streams/async_iterator":102,"./internal/streams/buffer_list":103,"./internal/streams/destroy":104,"./internal/streams/from":106,"./internal/streams/state":108,"./internal/streams/stream":109,"_process":186,"buffer":92,"events":93,"inherits":181,"string_decoder/":193,"util":90}],100:[function(require,module,exports){
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
},{"../errors":96,"./_stream_duplex":97,"inherits":181}],101:[function(require,module,exports){
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
},{"../errors":96,"./_stream_duplex":97,"./internal/streams/destroy":104,"./internal/streams/state":108,"./internal/streams/stream":109,"_process":186,"buffer":92,"inherits":181,"util-deprecate":202}],102:[function(require,module,exports){
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
},{"./end-of-stream":105,"_process":186}],103:[function(require,module,exports){
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
},{"buffer":92,"util":90}],104:[function(require,module,exports){
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
},{"_process":186}],105:[function(require,module,exports){
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
},{"../../../errors":96}],106:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],107:[function(require,module,exports){
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
},{"../../../errors":96,"./end-of-stream":105}],108:[function(require,module,exports){
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
},{"../../../errors":96}],109:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":93}],110:[function(require,module,exports){
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

},{"./":111,"get-intrinsic":175}],111:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":174,"get-intrinsic":175}],112:[function(require,module,exports){
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

},{"./lib/is_arguments.js":113,"./lib/keys.js":114}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],115:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = require('has-property-descriptors')();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
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

},{"has-property-descriptors":176,"object-keys":184}],116:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],117:[function(require,module,exports){
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

},{"./ToNumber":147,"./ToPrimitive":149,"./Type":154}],118:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
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
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
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

},{"../helpers/isFinite":163,"../helpers/isNaN":165,"../helpers/isPrefixOf":166,"./ToNumber":147,"./ToPrimitive":149,"./Type":154,"get-intrinsic":175}],119:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

},{"get-intrinsic":175}],120:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

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

},{"./DayWithinYear":123,"./InLeapYear":127,"./MonthFromTime":137,"get-intrinsic":175}],121:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":170,"./floor":158}],122:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":158}],123:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":121,"./DayFromYear":122,"./YearFromTime":156}],124:[function(require,module,exports){
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

},{"./modulo":159}],125:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

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

},{"../helpers/assertRecord":162,"./IsAccessorDescriptor":128,"./IsDataDescriptor":130,"./Type":154,"get-intrinsic":175}],126:[function(require,module,exports){
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

},{"../helpers/timeConstants":170,"./floor":158,"./modulo":159}],127:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

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

},{"./DaysInYear":124,"./YearFromTime":156,"get-intrinsic":175}],128:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":162,"./Type":154,"has":179}],129:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":182}],130:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":162,"./Type":154,"has":179}],131:[function(require,module,exports){
'use strict';

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"../helpers/assertRecord":162,"./IsAccessorDescriptor":128,"./IsDataDescriptor":130,"./Type":154}],132:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

},{"../helpers/isPropertyDescriptor":167,"./IsAccessorDescriptor":128,"./IsDataDescriptor":130,"./Type":154}],133:[function(require,module,exports){
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

},{"../helpers/isFinite":163,"../helpers/timeConstants":170}],134:[function(require,module,exports){
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

},{"../helpers/isFinite":163,"./DateFromTime":120,"./Day":121,"./MonthFromTime":137,"./ToInteger":146,"./YearFromTime":156,"./floor":158,"./modulo":159,"get-intrinsic":175}],135:[function(require,module,exports){
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

},{"../helpers/isFinite":163,"../helpers/timeConstants":170,"./ToInteger":146}],136:[function(require,module,exports){
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

},{"../helpers/timeConstants":170,"./floor":158,"./modulo":159}],137:[function(require,module,exports){
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

},{"./DayWithinYear":123,"./InLeapYear":127}],138:[function(require,module,exports){
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

},{"../helpers/isNaN":165}],139:[function(require,module,exports){
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

},{"../helpers/timeConstants":170,"./floor":158,"./modulo":159}],140:[function(require,module,exports){
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

},{"./Type":154}],141:[function(require,module,exports){
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


},{"../helpers/isFinite":163,"./ToNumber":147,"./abs":157,"get-intrinsic":175}],142:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":170,"./DayFromYear":122}],143:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":170,"./modulo":159}],144:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],145:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":147}],146:[function(require,module,exports){
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

},{"../helpers/isFinite":163,"../helpers/isNaN":165,"../helpers/sign":169,"./ToNumber":147,"./abs":157,"./floor":158}],147:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	// eslint-disable-next-line no-control-regex
	var trimmed = prim.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, '');
	if ((/^0[ob]|^[+-]0x/).test(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":149}],148:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":119,"get-intrinsic":175}],149:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":171}],150:[function(require,module,exports){
'use strict';

var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":129,"./ToBoolean":144,"./Type":154,"get-intrinsic":175,"has":179}],151:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":175}],152:[function(require,module,exports){
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

},{"../helpers/isFinite":163,"../helpers/isNaN":165,"../helpers/sign":169,"./ToNumber":147,"./abs":157,"./floor":158,"./modulo":159}],153:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":147}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":121,"./modulo":159}],156:[function(require,module,exports){
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

},{"call-bind/callBound":110,"get-intrinsic":175}],157:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":175}],158:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],159:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":168}],160:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":170,"./modulo":159}],161:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
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

},{"./5/AbstractEqualityComparison":117,"./5/AbstractRelationalComparison":118,"./5/CheckObjectCoercible":119,"./5/DateFromTime":120,"./5/Day":121,"./5/DayFromYear":122,"./5/DayWithinYear":123,"./5/DaysInYear":124,"./5/FromPropertyDescriptor":125,"./5/HourFromTime":126,"./5/InLeapYear":127,"./5/IsAccessorDescriptor":128,"./5/IsCallable":129,"./5/IsDataDescriptor":130,"./5/IsGenericDescriptor":131,"./5/IsPropertyDescriptor":132,"./5/MakeDate":133,"./5/MakeDay":134,"./5/MakeTime":135,"./5/MinFromTime":136,"./5/MonthFromTime":137,"./5/SameValue":138,"./5/SecFromTime":139,"./5/StrictEqualityComparison":140,"./5/TimeClip":141,"./5/TimeFromYear":142,"./5/TimeWithinDay":143,"./5/ToBoolean":144,"./5/ToInt32":145,"./5/ToInteger":146,"./5/ToNumber":147,"./5/ToObject":148,"./5/ToPrimitive":149,"./5/ToPropertyDescriptor":150,"./5/ToString":151,"./5/ToUint16":152,"./5/ToUint32":153,"./5/Type":154,"./5/WeekDay":155,"./5/YearFromTime":156,"./5/abs":157,"./5/floor":158,"./5/modulo":159,"./5/msFromTime":160}],162:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var isMatchRecord = require('./isMatchRecord');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Desc) {
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},
	// https://262.ecma-international.org/13.0/#sec-match-records
	'Match Record': isMatchRecord
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (Type(value) !== 'Object' || !predicate(value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"./isMatchRecord":164,"get-intrinsic":175,"has":179}],163:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],164:[function(require,module,exports){
'use strict';

var has = require('has');

// https://262.ecma-international.org/13.0/#sec-match-records

module.exports = function isMatchRecord(record) {
	return (
		has(record, '[[StartIndex]]')
        && has(record, '[[EndIndex]]')
        && record['[[StartIndex]]'] >= 0
        && record['[[EndIndex]]'] >= record['[[StartIndex]]']
        && String(parseInt(record['[[StartIndex]]'], 10)) === String(record['[[StartIndex]]'])
        && String(parseInt(record['[[EndIndex]]'], 10)) === String(record['[[EndIndex]]'])
	);
};

},{"has":179}],165:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],166:[function(require,module,exports){
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

},{"call-bind/callBound":110}],167:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"get-intrinsic":175,"has":179}],168:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],169:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{"./helpers/isPrimitive":172,"is-callable":182}],172:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],173:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],174:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":173}],175:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

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

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
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
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

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
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
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
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

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

},{"function-bind":174,"has":179,"has-symbols":177}],176:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
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

},{"get-intrinsic":175}],177:[function(require,module,exports){
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

},{"./shams":178}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":174}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

module.exports = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

},{}],183:[function(require,module,exports){
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

},{"./isArguments":185}],184:[function(require,module,exports){
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

},{"./implementation":183,"./isArguments":185}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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
},{"_process":186,"through":200,"timers":201}],188:[function(require,module,exports){
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

},{"buffer":92}],189:[function(require,module,exports){
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

},{"es-abstract/es5":161,"function-bind":174}],190:[function(require,module,exports){
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

},{"./implementation":189,"./polyfill":191,"./shim":192,"define-properties":115,"function-bind":174}],191:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":189}],192:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":191,"define-properties":115}],193:[function(require,module,exports){
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
},{"safe-buffer":188}],194:[function(require,module,exports){
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
},{"./lib/default_stream":195,"./lib/results":197,"./lib/test":198,"_process":186,"defined":116,"through":200,"timers":201}],195:[function(require,module,exports){
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
},{"_process":186,"fs":91,"through":200}],196:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":186,"timers":201}],197:[function(require,module,exports){
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
},{"_process":186,"events":93,"function-bind":174,"has":179,"inherits":181,"object-inspect":199,"resumer":187,"through":200,"timers":201}],198:[function(require,module,exports){
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
},{"./next_tick":196,"deep-equal":112,"defined":116,"events":93,"has":179,"inherits":181,"path":94,"string.prototype.trim":190}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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
},{"_process":186,"stream":95}],201:[function(require,module,exports){
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
},{"process/browser.js":186,"timers":201}],202:[function(require,module,exports){
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
},{}]},{},[69]);
