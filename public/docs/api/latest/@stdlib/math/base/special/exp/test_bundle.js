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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":51}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":52}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":53}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":97}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":97}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":97}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":97}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":80}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isInfinite = require( './main.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./main.js":55}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":59}],59:[function(require,module,exports){
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

var ceil = require( './main.js' );


// EXPORTS //

module.exports = ceil;

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

// MODULES //

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


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
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

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

},{"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/to-words":93}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var copysign = require( './copysign.js' );


// EXPORTS //

module.exports = copysign;

},{"./copysign.js":62}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
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
	// Reduce and compute `r = hi - lo` for extra precision.
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

},{"./expmulti.js":65,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/trunc":78}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi);

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":67,"@stdlib/math/base/special/ldexp":76}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":64}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],68:[function(require,module,exports){
module.exports={"expected":[5.577796105262746e-309,1.1339398160779814e-308,2.305246520707203e-308,4.686458175189963e-308,9.527349908359073e-308,1.936865600483901e-307,3.937557023119308e-307,8.004868952416926e-307,1.6273523550040948e-306,3.308331095836083e-306,6.725682121650714e-306,1.3672996653333795e-305,2.7796561612729665e-305,5.650910748243318e-305,1.148803680452031e-304,2.3354640606034155e-304,4.7478890180992455e-304,9.652235933943541e-304,1.9622543443906778e-303,3.989171150012887e-303,8.109798054255199e-303,1.6486839498122047e-302,3.3516972286905064e-302,6.813843438028223e-302,1.3852224479149914e-301,2.816092338573974e-301,5.724983789652396e-301,1.1638623827362127e-300,2.3660776968429808e-300,4.810125106317893e-300,9.778758985513798e-300,1.9879758880113021e-299,4.041461843132057e-299,8.216102583533701e-299,1.6702951625751893e-298,3.3956318117462523e-298,6.903160387034531e-298,1.4033801651955533e-297,2.853006127111835e-297,5.800027792328483e-297,1.1791184768971283e-296,2.3970926215203577e-296,4.8731769951290485e-296,9.906940521470375e-296,2.01403459373717e-295,4.094437971015507e-295,8.323800569576132e-295,1.692189658569519e-294,3.440142296340201e-294,6.993648116885296e-294,1.4217758967368118e-293,2.890403787490341e-293,5.876055483787729e-293,1.194574550379188e-292,2.428514094787992e-292,4.937055378178396e-292,1.003680228148947e-291,2.0404348811432797e-291,4.1481085184521685e-291,8.432910278034609e-291,1.714371151117459e-290,3.4852362314809936e-290,7.085321974363766e-290,1.4404127624679073e-289,2.9282916623792526e-289,5.953079758380626e-289,1.2102332245430295e-288,2.4603474457503446e-288,5.001771089283406e-288,1.0168366290217815e-287,2.0671812277371344e-287,4.202482588003608e-287,8.54345021399415e-287,1.7368434022153222e-286,3.530921265132056e-286,7.17819750742131e-286,1.459293923214019e-285,2.9666761775890716e-285,6.031113679476846e-285,1.226097155111051e-284,2.4925980733655195e-284,5.0673351042746426e-284,1.0301654861004768e-283,2.0942781697174158e-283,4.257569401551122e-283,8.655439125103524e-283,1.7596102231728544e-282,3.577205145507556e-282,7.272290467811877e-282,1.4784225812335872e-281,3.005563843159841e-281,6.110170481684826e-281,1.2421690326167307e-280,2.5252714473628646e-280,5.133758542855636e-280,1.043669059968313e-279,2.121730302744969e-279,4.313378301855978e-279,8.76889600476159e-279,1.782675475259067e-278,3.624095722385273e-278,7.367616813769214e-278,1.4978019807600995e-277,3.044961254467259e-277,6.190263573094396e-277,1.2584515828619083e-276,2.558373109169826e-276,5.201052670487014e-276,1.0573496408411288e-275,2.149542282720339e-275,4.3699187541473034e-275,8.883840095335756e-275,1.806043070356495e-274,3.6716009484407647e-274,7.464192712706816e-274,1.5174354085534791e-273,3.0848750933402777e-273,6.271406537548655e-273,1.2749475673786746e-272,2.5919086728508935e-272,5.269228900301216e-272,1.0712095489548002e-271,2.1777188265750804e-271,4.427200347725982e-271,9.000290891422426e-271,1.8297169716260705e-270,3.7197288805928735e-270,7.562034543965731e-270,1.53732619445703e-269,3.125312129193278e-269,6.353613136952727e-269,1.2916597838972903e-268,2.625883826061485e-268,5.338298795033464e-268,1.085251134959587e-267,2.2062647130710533e-267,4.485232797589477e-267,9.118268143160358e-267,1.8537011941776465e-266,3.768487681373072e-266,7.661158901590064e-266,1.557477711961651e-265,3.16627922017662e-265,6.436897313602117e-265,1.308591066821546e-264,2.6603043310117267e-264,5.408274068986959e-264,1.0994767803184525e-263,2.235184783610137e-263,4.544025946083015e-263,9.237791859572165e-263,1.8779998057524016e-262,3.8178856203086194e-262,7.761582597138686e-262,1.5778933787792019e-261,3.207783314336963e-261,6.521273192552332e-261,1.325744287709056e-260,2.6951760254428076e-260,5.479166590017883e-260,1.1138888977105826e-259,2.2644839430570926e-259,4.6035897645648077e-259,9.358882311965036e-259,1.9026169274121239e-258,3.867931075323755e-258,7.863322662542579e-258,1.598576657420743e-257,3.2498314507981538e-257,6.6067550840123956e-257,1.343122355757819e-256,2.73050482361918e-256,5.550988381546308e-256,1.128489931441323e-255,2.294167160569408e-255,4.663934355100772e-255,9.48156003736574e-255,1.92755673423749e-254,3.9186325341636394e-254,7.966396352986444e-254,1.619531055785021e-253,3.292430760954013e-253,6.693357485769586e-253,1.360728218300673e-252,2.7662967173291856e-252,5.623751624599085e-252,1.1432823578563689e-251,2.324239470441855e-251,4.7250699521763406e-251,9.605845842000438e-251,1.952823456037672e-250,3.9699985958303804e-250,8.070821149841385e-250,1.6407601277528884e-249,3.3355884696766896e-249,6.781095085653516e-249,1.3785648613039508e-248,2.8025577769034184e-248,5.697468659873938e-248,1.1582686857613612e-247,2.354705972959555e-247,4.787006924430606e-247,9.731760804830971e-247,1.978421378065974e-246,4.022037972044517e-246,8.176614763627148e-246,1.6622674737894752e-245,3.379311896544618e-245,6.869982764021157e-245,1.3966353098749735e-244,2.8392941522433465e-244,5.7721519898304863e-244,1.1734514568482892e-243,2.38557183526218e-243,4.84975577641805e-243,9.859326281121186e-243,2.004354841748152e-242,4.074759488721232e-242,8.283795137013012e-242,1.6840567415561355e-241,3.42360845708091e-241,6.960035596285888e-241,1.414942628774659e-240,2.8765120738633627e-240,5.847814280815196e-240,1.1888332461255176e-239,2.4168422922218988e-239,4.913327150388557e-239,9.98856390606646e-239,2.0306282454180745e-238,4.128172087465825e-238,8.39238044786738e-238,1.7061316265275902e-237,3.4684856640136915e-237,7.051268855472049e-237,1.4334899229368177e-236,2.9142178539497378e-236,5.924468365204385e-236,1.2044166623554316e-235,2.44852264733043e-235,4.9777318280906455e-235,1.0119495598459814e-234,2.0572460450629784e-234,4.182284827093454e-234,8.502389112333263e-234,1.7284958726200088e-233,3.513951128549147e-233,7.143698014802818e-233,1.452280337995878e-232,2.952417887428572e-232,6.002127243585206e-232,1.2202043484964968e-231,2.480618273597676e-231,5.04298073260397e-231,1.0252143564405858e-230,2.0842127550805887e-230,4.237106885161781e-230,8.613839787958288e-230,1.751153272825419e-229,3.5600125616611685e-229,7.237338750330084e-229,1.4713170608190894e-228,2.991118653052673e-228,6.080804086958614e-228,1.2361989821510846e-227,2.513134614464931e-227,5.109084930187377e-227,1.0386530301093825e-226,2.111532949044085e-226,4.292647559530792e-226,8.726751376856227e-226,1.7741076698543978e-225,3.6066777754019344e-225,7.332206943586662e-225,1.4906033200481627e-224,3.03032671449939e-224,6.160512238971073e-224,1.2524032760205647e-223,2.546077184725855e-223,5.17605563216002e-223,1.0522678600609746e-222,2.1392112604771773e-222,4.3489162699380746e-222,8.841143028909814e-222,1.797362956789086e-221,3.653954684223624e-221,7.428318684285925e-221,1.5101423866463676e-220,3.0700487214827697e-220,6.241265218182131e-220,1.2688199783642639e-219,2.5794515714639056e-219,5.243904196799655e-219,1.0660611553798977e-218,2.167252383640901e-218,4.405922559596156e-218,8.957034145024987e-218,1.820923077742365e-217,3.701851306323759e-217,7.525690273045694e-217,1.529937574452767e-216,3.1102914108835845e-216,6.323076720353374e-216,1.2854518734666324e-215,2.6132634349983484e-215,5.312642131270151e-215,1.0800352554187135e-214,2.1956610743296642e-214,4.46367609681176e-214,9.074444380415858e-214,1.8447920285272794e-213,3.7503757650026376e-213,7.624338224156593e-213,1.54999224074536e-212,3.151061607890021e-212,6.405960620772977e-212,1.302301782108678e-211,2.647518509844812e-211,5.3822810935740225e-211,1.0941925301947153e-210,2.2244421506772187e-210,4.52218667662532e-210,9.19339364794073e-210,1.8689738573345238e-209,3.799536290042921e-209,7.724279268379926e-209,1.5703097868095354e-208,3.1923662271560974e-208,6.489930976608603e-208,1.319372562046654e-207,2.6822226056883252e-207,5.452832894527841e-207,1.1085353807915785e-206,2.253600493974308e-206,4.581464222472228e-206,9.313902121478307e-206,1.8934726654194425e-205,3.84934121910394e-205,7.8255303557869144e-205,1.5908936585153611e-204,3.234212273974039e-204,6.575002029291149e-204,1.3366671084969645e-203,2.7173816083677446e-203,5.524309499766552e-203,1.1230662397668273e-202,2.2831410494962835e-202,4.641518787865587e-202,9.435990239351307e-202,1.918292607796971e-201,3.899798999136609e-201,7.928108658633028e-201,1.61174734690183e-200,3.2766068454631125e-200,6.661188206931579e-200,1.3541883546267487e-199,2.753001480874593e-199,5.596723031772553e-199,1.1377875715642754e-198,2.3130688273423476e-198,4.70236055810235e-198,9.559678707789663e-198,1.9434378939467516e-197,3.950918187815825e-197,8.032031574269945e-197,1.632874388769306e-196,3.319557131772208e-196,6.748504126765727e-196,1.3719392720516437e-195,2.789088264364241e-195,5.6700857719313604e-195,1.1527018729322531e-194,2.3433889032844935e-194,4.763999851989178e-194,9.684988504444407e-194,1.9689127885269588e-193,4.002707454991628e-193,8.137316728097983e-193,1.6542783672788234e-192,3.363070417300018e-192,6.8369645976348616e-192,1.3899228713396205e-191,2.8256480791803284e-191,5.744410162615821e-191,1.1678116733466732e-190,2.374106419628875e-190,4.826447123593562e-190,9.811940881944418e-190,1.994721612097474e-189,4.055175584160521e-189,8.243981976552652e-189,1.6759629125601556e-188,3.4071540819303e-188,6.926584622496517e-188,1.408142202521894e-187,2.8626871258934185e-187,5.819708809294425e-187,1.1831195354402878e-186,2.405226586087817e-186,4.889712964016306e-186,9.940557371503104e-186,2.020868741853109e-185,4.1083314739538025e-185,8.352045410134935e-185,1.697931702327397e-184,3.4518156022833113e-184,7.017379400970573e-184,1.4266003556097374e-183,2.9002116863516642e-183,5.8959944826704844e-183,1.1986280554372486e-182,2.4367546806632477e-182,4.953808103188889e-182,1.0070859786566787e-181,2.0473586123653049e-181,4.1621841396476754e-181,8.461525356478988e-181,1.720188462502609e-180,3.497062552984629e-180,7.109364331914777e-180,1.4453004611188666e-179,2.9382281247468484e-179,5.973280120847388e-179,1.21433986359336e-178,2.468696050542404e-178,5.018743411691611e-178,1.0202870226516492e-177,2.0741957163346863e-177,4.2167427146917895e-177,8.57244038346004e-177,1.742736967848128e-176,3.542902607948646e-176,7.202555016037959e-176,1.4642456906002963e-175,2.9767428886934275e-175,6.051578831524274e-175,1.2302576246424464e-174,2.5010561130038933e-174,5.084529902598356e-174,1.0336611080415455e-173,2.101384605352798e-173,4.2720164522592285e-173,8.68480930234546e-173,1.765581042606185e-172,3.5893435416808484e-172,7.296967258545532e-172,1.4834392571781554e-171,3.0157625103227276e-171,6.130903894217076e-171,1.246384038247882e-170,2.5338403563370128e-170,5.151178733344142e-170,1.0472105030805743e-169,2.128929890674532e-169,4.3280147268144307e-169,8.798651170982253e-169,1.7887245611478879e-168,3.636393230596182e-168,7.392617071819651e-168,1.50288441609497e-167,3.055293607389788e-167,6.2112687625120856e-167,1.2627218394607297e-166,2.5670543407722906e-166,5.21870120761713e-166,1.0609375057557593e-165,2.1568362439994871e-165,4.384747035704051e-165,8.913985297031219e-165,1.8121714486301166e-164,3.684059654354691e-164,7.489520678136594e-164,1.5225844652632532e-163,3.095342884396408e-163,6.292687066347353e-163,1.2792737991834658e-162,2.6007036994250804e-162,5.287108777276924e-162,1.0748444441763274e-161,2.185108398264769e-161,4.442223000767485e-161,9.030831241240542e-161,1.835925681661645e-160,3.732350897215705e-160,7.58769451241557e-160,1.5425427458251658e-159,3.135917133728068e-159,6.375172614323973e-159,1.2960427246402176e-158,2.6347941392500764e-158,5.356413044295044e-158,1.0889336769687921e-157,2.2137511484475773e-157,4.5004523699684775e-157,9.149208820765369e-157,1.8599912889769599e-156,3.78127514940769e-156,7.687155225007756e-156,1.5627626427190956e-155,3.177023236805744e-155,6.45873939604948e-155,1.3130314598524366e-154,2.669331442009792e-154,5.426625762723801e-154,1.1032075936768581e-153,2.242769352378313e-153,4.5594450190494115e-153,9.269138112525738e-153,1.8843723521199478e-152,3.830840708518145e-152,7.787919684519353e-152,1.5832475852536525e-151,3.2186681652537186e-151,6.54340158450833e-151,1.330242886121535e-150,2.7043214652550084e-150,5.497758840689197e-150,1.1176686151669393e-149,2.272167931564977e-149,4.61921095320471e-149,9.39063945661368e-149,1.909073006136025e-148,3.8810559809004546e-148,7.890004980674273e-148,1.6040010476896432e-147,3.260858982080898e-147,6.629173538467089e-147,1.3476799225174843e-146,2.739770143318063e-146,5.5698243424117825e-146,1.1323191940383646e-145,2.3019518720271006e-145,4.679760308778741e-145,9.513733459742407e-145,1.9340974402733336e-144,3.931929483100484e-144,7.993428427209938e-144,1.6250265498287688e-143,3.3036028428794194e-143,6.716069804909331e-143,1.3653455263738141e-142,2.775683488319938e-142,5.642834490250907e-142,1.1471618150395905e-141,2.332126225141884e-141,4.7411033549844244e-141,9.638440998740668e-141,1.9594498986936807e-140,3.9834698432996856e-140,8.098207564815445e-140,1.646327657610945e-139,3.3469069970378758e-139,6.804105121502429e-139,1.3832426937894885e-138,2.8120675911889896e-138,5.716801666778874e-138,1.162198995489553e-137,2.3626961085006536e-137,4.803250495645974e-137,9.764783224095667e-137,1.9851346811916935e-136,4.0356858027793116e-136,8.20436016410605e-136,1.667907983718903e-135,3.3907787889715745e-135,6.893294419098615e-135,1.4013744601365812e-134,2.8489286226945937e-134,5.791738416880719e-134,1.1774332857045404e-133,2.3936667067773423e-133,4.866212270961785e-133,9.89278156353693e-133,2.011156143924506e-132,4.088586217402727e-132,8.311904228636605e-132,1.6897711881912803e-131,3.435225659367022e-131,6.983652824264958e-131,1.4197439005753877e-130,2.8862728344935574e-130,5.867657449881506e-130,1.1928672694309954e-129,2.425043272607017e-129,4.9299993592931284e-129,1.0022457725672639e-128,2.03751870015034e-128,4.1421800591171353e-128,8.420857997956848e-128,1.711920979042803e-127,3.4802551464446238e-127,7.075195661850377e-127,1.4383541305758128e-126,2.9241065601902377e-126,5.944571641703163e-126,1.208503564283321e-125,2.456831127477257e-125,4.994622578974941e-125,1.01538337036703e-124,2.0642268209774586e-124,4.1964764174761616e-124,8.531239950702038e-124,1.7343611128935404e-123,3.525874887236983e-123,7.167938457583947e-123,1.4572083064460852e-122,2.9624362164113893e-122,6.022494037046261e-122,1.2243448221880953e-121,2.4890356626305524e-121,5.060092890150337e-121,1.028693177898911e-120,2.0912850361217793e-120,4.25148450118005e-120,8.643068807728812e-120,1.7570953956059387e-119,3.572092618883945e-119,7.26189694070971e-119,1.4763096258675812e-118,3.001268303893438e-118,6.101437851603724e-118,1.2403937298337742e-117,2.5216623399785177e-117,5.126421396630599e-117,1.042177452515546e-116,2.118697934675576e-116,4.3072136396383906e-116,8.756363535289288e-116,1.7801276829301964e-115,3.6189161799456277e-115,7.357087046651926e-115,1.4956613284374767e-114,3.0406094085856655e-114,6.1814164743015405e-114,1.2566530091262836e-113,2.5547166930288092e-113,5.1936193477766836e-113,1.0558384811593716e-112,2.146470165885678e-112,4.363673284551923e-112,8.871143348249992e-112,1.8034618811586052e-111,3.666353511730642e-111,7.453524919719353e-111,1.5152666962180626e-110,3.0804662027669454e-110,6.262443469571114e-110,1.2731254176509417e-109,2.588204327822755e-109,5.261698140408103e-109,1.0696785807504e-108,2.1746064399419227e-108,4.42087301151653e-108,8.987427713346492e-108,1.8271019477874576e-107,3.714412659643636e-107,7.551226915842714e-107,1.5351290542935562e-106,3.1208454461776207e-106,6.344532579646813e-106,1.2898137491397218e-105,2.6221309238866384e-105,5.3306693207361534e-105,1.0837000985792937e-104,2.2031115287761924e-104,4.478822521645796e-104,9.105236352489455e-104,1.8510518921885878e-103,3.7631017745500265e-103,7.650209605349532e-103,1.555251771333737e-102,3.1617539871657963e-102,6.427697726899839e-102,1.3067208339453163e-101,2.6565022351951044e-101,5.400544586321264e-101,1.0979054127052532e-100,2.2319902668716172e-100,4.537531643217298e-100,9.224589246106225e-100,1.875315776289475e-99,3.812429114157761e-99,7.750489775772965e-99,1.5756382601656218e-98,3.203198763848639e-98,6.511953016197154e-98,1.3238495395212452e-97,2.6913240911465935e-97,5.471335788057351e-97,1.1122969323595835e-96,2.261247552082315e-96,4.597010333339117e-96,9.345506636531827e-96,1.8998977152617826e-95,3.8624030444181375e-95,7.852084434700718e-95,1.5962919783519317e-94,3.245186805289263e-94,6.597312737295311e-94,1.3412027709079174e-93,2.726602397552231e-93,5.543054932182207e-93,1.126877098354053e-92,2.2908883464645132e-92,4.6572686796390915e-92,9.468009031439989e-92,1.9248018782197146e-91,3.9130320409450104e-91,7.955010812657782e-91,1.617216428777853e-90,3.287725232689139e-90,6.683791367262526e-90,1.3587834712256281e-89,2.7623431376376903e-89,5.615714182312686e-89,1.1416483834951081e-88,2.3209176771176732e-88,4.7183169019747707e-88,9.592117207323375e-88,1.9500324889267297e-87,3.964324690451493e-87,8.059286366030529e-87,1.6384151602448146e-86,3.3308212605952174e-86,6.771403572935499e-86,1.3765946221734492e-85,2.798552373057411e-85,5.689325861508908e-85,1.1566132930030414e-84,2.3513406370372774e-84,4.780165354167764e-84,9.717852213015156e-84,1.9755938265120505e-83,4.016289692207155e-83,8.16492878002552e-83,1.6598917680725003e-82,3.374482198124256e-82,6.8601642134054e-82,1.3946392445350384e-81,2.8352362449232845e-81,5.763902454362993e-81,1.1717743649369724e-80,2.382162385978807e-80,4.842824525758688e-80,9.845235373261065e-80,2.0014902261965784e-79,4.0689358595125295e-79,8.271955971670754e-79,1.6816498947087608e-78,3.418715450201704e-78,6.950088342539521e-78,1.4129203986910884e-77,2.8724009748455583e-77,5.839456609117741e-77,1.1871341706254048e-76,2.4133881513323738e-76,4.906305043787284e-76,9.974288292334188e-76,2.0277260800277571e-75,4.1222721211947596e-75,8.380386092852801e-75,1.7036932303470447e-74,3.4635285188183435e-74,7.041191211533065e-74,1.4314411851380912e-73,2.9100528659886665e-73,5.916001139810648e-73,1.2026953151020937e-72,2.445023229009828e-72,4.970617674593815e-72,1.0105032857699861e-71,2.054305837624919e-71,4.176307523121017e-71,8.490237533396051e-71,1.7260255135526395e-70,3.5089290043018594e-70,7.133488271496333e-70,1.4502047450145038e-69,2.948198304139601e-69,5.99354902844766e-69,1.2184604375481285e-68,2.4770729843424014e-68,5.035773325645447e-68,1.0237491243728681e-67,2.0812340069334866e-67,4.231051229733619e-67,8.601528924182376e-67,1.7486505318963485e-66,3.554924606606643e-66,7.226995176075859e-66,1.4692142606331654e-65,2.986843758791603e-65,6.072113427205436e-65,1.2344322117392692e-64,2.5095428529912272e-64,5.1017830473865995e-64,1.0371685915455274e-63,2.1085151549899856e-63,4.2865125256034997e-63,8.714279140309257e-63,1.7715721225972566e-62,3.601523126619019e-62,7.321727784107859e-62,1.4884729560213455e-61,3.0259957842408145e-61,6.15170766066079e-61,1.2506133464996945e-60,2.5424383418687405e-60,5.168658035112107e-60,1.0507639632390712e-59,2.1361539086962107e-59,4.34270081700523e-59,8.828507304292952e-59,1.7947941731731296e-58,3.648732467480575e-58,7.417702162309538e-58,1.5079840974672106e-57,3.065661020698136e-57,6.232345228051909e-57,1.2670065861611429e-56,2.5757650300728634e-56,5.236409630867103e-56,1.0645375452380337e-55,2.164154955604121e-55,4.39962563351264e-55,8.944232789309848e-55,1.8183206221001402e-54,3.6965606359287973e-54,7.514934588002467e-54,1.5277509940741256e-53,3.1058461954156297e-53,6.3140398055665395e-53,1.2836147110286346e-52,2.6095285698334068e-52,5.3050493253695445e-52,1.0784916735516008e-51,2.1925230447110106e-51,4.457296629614552e-51,9.061475222483528e-51,1.8421554594804573e-50,3.745015743654617e-50,7.613441551874373e-50,1.5477769983215597e-49,3.1465581238271266e-49,6.396805248662438e-49,1.3004405378517467e-48,2.6437346874703684e-48,5.3745887599598544e-48,1.0926287148097254e-47,2.2212629872646655e-47,4.515723586352244e-47,9.18025448821292e-47,1.8663027277192497e-46,3.794106008678196e-46,7.713239760775443e-46,1.5680655066339062e-45,3.187803710704161e-45,6.480655594416824e-45,1.3174869203025317e-44,2.6783891843653383e-44,5.445039728574931e-44,1.106951066664524e-43,2.250379657579541e-43,4.574916412978637e-43,9.300590731544835e-43,1.8907665222101536e-42,3.843839756742979e-42,7.814346140551932e-42,1.58861995995641e-41,3.229589951327252e-41,6.565605063907172e-41,1.3347567494594142e-40,2.7134979379452288e-40,5.516414179748483e-40,1.1214611581969206e-39,2.279877993863288e-39,4.634885148638658e-39,9.422504361590574e-39,1.915550992029907e-38,3.894225422727534e-38,7.916777838916791e-38,1.6094438443388e-37,3.2719239326721286e-37,6.651668064623113e-37,1.3522529542975555e-36,2.74906690267932e-36,5.588724218637509e-36,1.1361614503286201e-35,2.3097629990544694e-35,4.695639964071954e-35,9.546016054987335e-35,1.940660340641927e-34,3.945271552076166e-34,8.020552228357932e-34,1.6305406915264323e-33,3.31481283461173e-33,6.738859192909953e-33,1.3699785021855343e-32,2.7851021110889865e-32,5.661982109075342e-32,1.1510544362394988e-31,2.3400397416709346e-31,4.757191163337849e-31,9.671146759405116e-31,1.9660988266093837e-30,3.9969868022482265e-30,8.125686909084621e-30,1.6519140795594158e-29,3.358263931133918e-29,6.827193236444227e-29,1.3879363993887286e-28,2.8216096747708596e-28,5.736200275651642e-28,1.166142641790376e-27,2.3707133566694745e-27,4.819549185562962e-27,9.797917697098842e-27,1.9918707643173452e-26,4.049379944186461e-26,8.232199712012533e-26,1.6735676333793573e-25,3.402284591575175e-25,6.91668517674175e-25,1.4061296915791041e-24,2.858595785433355e-24,5.811391305819454e-24,1.1814286259515409e-23,2.401789046316716e-23,4.8827246067115464e-23,9.926350368508839e-23,2.0179805247045302e-22,4.1024598638044473e-22,8.340108701787662e-22,1.6955050254441776e-21,3.44688228187035e-21,7.007350191698287e-21,1.4245614643517816e-20,2.8960667159468125e-20,5.887567952030293e-20,1.1969149812366076e-19,2.433272081071444e-19,4.946728141379391e-19,1.0056466555906084e-18,2.04443253600462e-18,4.156235563493823e-18,8.449432179850508e-18,1.7177299763509637e-17,3.492064565819034e-17,7.09920365816409e-17,1.4432348437483558e-16,2.934028821407298e-16,5.964743133896848e-16,1.212604334142307e-15,2.4651678004784084e-15,5.011570644610882e-15,1.0188288327087328e-14,2.0712312844972986e-14,4.210716163651004e-14,8.560188687539537e-14,1.7402462554669895e-13,3.5378391063682986e-13,7.192261154551421e-13,1.4621529967870802e-12,2.9724885402145535e-12,6.042929940384029e-12,1.2284993455939044e-11,2.497481614074018e-11,5.0772631137400835e-11,1.0321838039117488e-10,2.0983813152691067e-10,4.265910904223971e-10,8.672397009236225e-10,1.7630576815689856e-9,3.584213666912314e-9,7.28653846347701e-9,1.4813191319999786e-8,3.011452395163886e-8,6.122141632029118e-8,1.2446027113964883e-7,2.5302190023037357e-7,5.143816690255835e-7,1.0457138342121358e-6,2.125887232984309e-6,4.321829146279477e-6,8.786076175550694e-6,1.786168123490818e-5,3.631196112609106e-5,7.382051574438627e-5,0.00015007364999770258,0.0003050926994552417,0.0006202391643190607,0.001260917162692199,0.0025633855174515712,0.005211242661691401,0.010594212183125328,0.02153753702665852,0.04378480373590605,0.08901245466549268,0.18095815007796634,0.36787944117144233],"x":[-709.78,-709.0705105105105,-708.361021021021,-707.6515315315315,-706.9420420420421,-706.2325525525525,-705.5230630630631,-704.8135735735735,-704.1040840840841,-703.3945945945947,-702.6851051051051,-701.9756156156157,-701.2661261261261,-700.5566366366367,-699.8471471471471,-699.1376576576577,-698.4281681681682,-697.7186786786787,-697.0091891891892,-696.2996996996997,-695.5902102102102,-694.8807207207208,-694.1712312312312,-693.4617417417418,-692.7522522522522,-692.0427627627628,-691.3332732732732,-690.6237837837838,-689.9142942942943,-689.2048048048048,-688.4953153153153,-687.7858258258258,-687.0763363363363,-686.3668468468469,-685.6573573573573,-684.9478678678679,-684.2383783783783,-683.5288888888889,-682.8193993993993,-682.1099099099099,-681.4004204204205,-680.6909309309309,-679.9814414414415,-679.2719519519519,-678.5624624624625,-677.852972972973,-677.1434834834835,-676.433993993994,-675.7245045045045,-675.015015015015,-674.3055255255256,-673.596036036036,-672.8865465465466,-672.177057057057,-671.4675675675676,-670.758078078078,-670.0485885885886,-669.3390990990991,-668.6296096096096,-667.9201201201201,-667.2106306306306,-666.5011411411411,-665.7916516516517,-665.0821621621621,-664.3726726726727,-663.6631831831832,-662.9536936936937,-662.2442042042042,-661.5347147147147,-660.8252252252253,-660.1157357357357,-659.4062462462463,-658.6967567567567,-657.9872672672673,-657.2777777777778,-656.5682882882883,-655.8587987987988,-655.1493093093093,-654.4398198198198,-653.7303303303303,-653.0208408408408,-652.3113513513514,-651.6018618618618,-650.8923723723724,-650.1828828828828,-649.4733933933934,-648.763903903904,-648.0544144144144,-647.344924924925,-646.6354354354354,-645.925945945946,-645.2164564564565,-644.506966966967,-643.7974774774775,-643.087987987988,-642.3784984984985,-641.669009009009,-640.9595195195195,-640.2500300300301,-639.5405405405405,-638.8310510510511,-638.1215615615615,-637.4120720720721,-636.7025825825826,-635.9930930930931,-635.2836036036036,-634.5741141141141,-633.8646246246246,-633.1551351351351,-632.4456456456456,-631.7361561561562,-631.0266666666666,-630.3171771771772,-629.6076876876876,-628.8981981981982,-628.1887087087088,-627.4792192192192,-626.7697297297298,-626.0602402402402,-625.3507507507508,-624.6412612612612,-623.9317717717718,-623.2222822822823,-622.5127927927928,-621.8033033033033,-621.0938138138138,-620.3843243243243,-619.6748348348349,-618.9653453453453,-618.2558558558559,-617.5463663663663,-616.8368768768769,-616.1273873873874,-615.4178978978979,-614.7084084084084,-613.9989189189189,-613.2894294294294,-612.5799399399399,-611.8704504504504,-611.160960960961,-610.4514714714715,-609.741981981982,-609.0324924924925,-608.323003003003,-607.6135135135136,-606.904024024024,-606.1945345345346,-605.485045045045,-604.7755555555556,-604.066066066066,-603.3565765765766,-602.6470870870871,-601.9375975975976,-601.2281081081081,-600.5186186186186,-599.8091291291291,-599.0996396396397,-598.3901501501501,-597.6806606606607,-596.9711711711711,-596.2616816816817,-595.5521921921921,-594.8427027027027,-594.1332132132133,-593.4237237237237,-592.7142342342343,-592.0047447447447,-591.2952552552553,-590.5857657657658,-589.8762762762763,-589.1667867867868,-588.4572972972973,-587.7478078078078,-587.0383183183184,-586.3288288288288,-585.6193393393394,-584.9098498498498,-584.2003603603604,-583.4908708708708,-582.7813813813814,-582.0718918918919,-581.3624024024024,-580.6529129129129,-579.9434234234234,-579.2339339339339,-578.5244444444445,-577.8149549549549,-577.1054654654655,-576.395975975976,-575.6864864864865,-574.976996996997,-574.2675075075075,-573.5580180180181,-572.8485285285285,-572.1390390390391,-571.4295495495495,-570.7200600600601,-570.0105705705706,-569.3010810810811,-568.5915915915916,-567.8821021021021,-567.1726126126126,-566.4631231231231,-565.7536336336336,-565.0441441441442,-564.3346546546546,-563.6251651651652,-562.9156756756756,-562.2061861861862,-561.4966966966967,-560.7872072072072,-560.0777177177177,-559.3682282282282,-558.6587387387387,-557.9492492492493,-557.2397597597597,-556.5302702702703,-555.8207807807808,-555.1112912912913,-554.4018018018018,-553.6923123123123,-552.9828228228229,-552.2733333333333,-551.5638438438439,-550.8543543543543,-550.1448648648649,-549.4353753753754,-548.7258858858859,-548.0163963963964,-547.3069069069069,-546.5974174174174,-545.8879279279279,-545.1784384384384,-544.468948948949,-543.7594594594594,-543.04996996997,-542.3404804804804,-541.630990990991,-540.9215015015016,-540.212012012012,-539.5025225225226,-538.793033033033,-538.0835435435436,-537.374054054054,-536.6645645645646,-535.9550750750751,-535.2455855855856,-534.5360960960961,-533.8266066066066,-533.1171171171171,-532.4076276276277,-531.6981381381381,-530.9886486486487,-530.2791591591591,-529.5696696696697,-528.8601801801802,-528.1506906906907,-527.4412012012012,-526.7317117117117,-526.0222222222222,-525.3127327327327,-524.6032432432432,-523.8937537537538,-523.1842642642642,-522.4747747747748,-521.7652852852852,-521.0557957957958,-520.3463063063064,-519.6368168168168,-518.9273273273274,-518.2178378378378,-517.5083483483484,-516.7988588588588,-516.0893693693694,-515.3798798798799,-514.6703903903904,-513.9609009009009,-513.2514114114114,-512.5419219219219,-511.8324324324324,-511.1229429429429,-510.4134534534534,-509.703963963964,-508.9944744744745,-508.284984984985,-507.5754954954955,-506.866006006006,-506.1565165165165,-505.44702702702705,-504.73753753753755,-504.02804804804805,-503.31855855855855,-502.60906906906905,-501.89957957957955,-501.1900900900901,-500.4806006006006,-499.7711111111111,-499.0616216216216,-498.3521321321321,-497.64264264264267,-496.93315315315317,-496.2236636636637,-495.5141741741742,-494.8046846846847,-494.0951951951952,-493.38570570570573,-492.67621621621623,-491.96672672672673,-491.25723723723723,-490.54774774774774,-489.83825825825824,-489.1287687687688,-488.4192792792793,-487.7097897897898,-487.0003003003003,-486.2908108108108,-485.5813213213213,-484.87183183183186,-484.16234234234236,-483.45285285285286,-482.74336336336336,-482.03387387387386,-481.32438438438436,-480.6148948948949,-479.9054054054054,-479.1959159159159,-478.4864264264264,-477.7769369369369,-477.0674474474474,-476.357957957958,-475.6484684684685,-474.938978978979,-474.2294894894895,-473.52,-472.8105105105105,-472.10102102102104,-471.39153153153154,-470.68204204204204,-469.97255255255254,-469.26306306306304,-468.5535735735736,-467.8440840840841,-467.1345945945946,-466.4251051051051,-465.7156156156156,-465.0061261261261,-464.29663663663666,-463.58714714714716,-462.87765765765766,-462.16816816816817,-461.45867867867867,-460.74918918918917,-460.0396996996997,-459.3302102102102,-458.6207207207207,-457.9112312312312,-457.2017417417417,-456.49225225225223,-455.7827627627628,-455.0732732732733,-454.3637837837838,-453.6542942942943,-452.9448048048048,-452.2353153153153,-451.52582582582585,-450.81633633633635,-450.10684684684685,-449.39735735735735,-448.68786786786785,-447.97837837837835,-447.2688888888889,-446.5593993993994,-445.8499099099099,-445.1404204204204,-444.4309309309309,-443.7214414414414,-443.01195195195197,-442.3024624624625,-441.592972972973,-440.8834834834835,-440.173993993994,-439.46450450450453,-438.75501501501503,-438.04552552552553,-437.33603603603603,-436.62654654654654,-435.91705705705704,-435.2075675675676,-434.4980780780781,-433.7885885885886,-433.0790990990991,-432.3696096096096,-431.6601201201201,-430.95063063063066,-430.24114114114116,-429.53165165165166,-428.82216216216216,-428.11267267267266,-427.40318318318316,-426.6936936936937,-425.9842042042042,-425.2747147147147,-424.5652252252252,-423.8557357357357,-423.1462462462462,-422.4367567567568,-421.7272672672673,-421.0177777777778,-420.3082882882883,-419.5987987987988,-418.8893093093093,-418.17981981981984,-417.47033033033034,-416.76084084084084,-416.05135135135134,-415.34186186186184,-414.63237237237234,-413.9228828828829,-413.2133933933934,-412.5039039039039,-411.7944144144144,-411.0849249249249,-410.37543543543546,-409.66594594594596,-408.95645645645646,-408.24696696696697,-407.53747747747747,-406.82798798798797,-406.1184984984985,-405.409009009009,-404.6995195195195,-403.99003003003,-403.2805405405405,-402.57105105105103,-401.8615615615616,-401.1520720720721,-400.4425825825826,-399.7330930930931,-399.0236036036036,-398.3141141141141,-397.60462462462465,-396.89513513513515,-396.18564564564565,-395.47615615615615,-394.76666666666665,-394.05717717717715,-393.3476876876877,-392.6381981981982,-391.9287087087087,-391.2192192192192,-390.5097297297297,-389.8002402402402,-389.0907507507508,-388.3812612612613,-387.6717717717718,-386.9622822822823,-386.2527927927928,-385.5433033033033,-384.83381381381383,-384.12432432432433,-383.41483483483483,-382.70534534534534,-381.99585585585584,-381.2863663663664,-380.5768768768769,-379.8673873873874,-379.1578978978979,-378.4484084084084,-377.7389189189189,-377.02942942942946,-376.31993993993996,-375.61045045045046,-374.90096096096096,-374.19147147147146,-373.48198198198196,-372.7724924924925,-372.063003003003,-371.3535135135135,-370.644024024024,-369.9345345345345,-369.225045045045,-368.5155555555556,-367.8060660660661,-367.0965765765766,-366.3870870870871,-365.6775975975976,-364.9681081081081,-364.25861861861864,-363.54912912912914,-362.83963963963964,-362.13015015015014,-361.42066066066064,-360.71117117117115,-360.0016816816817,-359.2921921921922,-358.5827027027027,-357.8732132132132,-357.1637237237237,-356.4542342342342,-355.74474474474476,-355.03525525525527,-354.32576576576577,-353.61627627627627,-352.90678678678677,-352.1972972972973,-351.4878078078078,-350.7783183183183,-350.0688288288288,-349.35933933933933,-348.64984984984983,-347.9403603603604,-347.2308708708709,-346.5213813813814,-345.8118918918919,-345.1024024024024,-344.3929129129129,-343.68342342342345,-342.97393393393395,-342.26444444444445,-341.55495495495495,-340.84546546546545,-340.13597597597595,-339.4264864864865,-338.716996996997,-338.0075075075075,-337.298018018018,-336.5885285285285,-335.879039039039,-335.1695495495496,-334.4600600600601,-333.7505705705706,-333.0410810810811,-332.3315915915916,-331.6221021021021,-330.91261261261263,-330.20312312312313,-329.49363363363364,-328.78414414414414,-328.07465465465464,-327.36516516516514,-326.6556756756757,-325.9461861861862,-325.2366966966967,-324.5272072072072,-323.8177177177177,-323.10822822822826,-322.39873873873876,-321.68924924924926,-320.97975975975976,-320.27027027027026,-319.56078078078076,-318.8512912912913,-318.1418018018018,-317.4323123123123,-316.7228228228228,-316.0133333333333,-315.3038438438438,-314.5943543543544,-313.8848648648649,-313.1753753753754,-312.4658858858859,-311.7563963963964,-311.0469069069069,-310.33741741741744,-309.62792792792794,-308.91843843843844,-308.20894894894894,-307.49945945945944,-306.78996996996995,-306.0804804804805,-305.370990990991,-304.6615015015015,-303.952012012012,-303.2425225225225,-302.533033033033,-301.82354354354356,-301.11405405405407,-300.40456456456457,-299.69507507507507,-298.98558558558557,-298.27609609609607,-297.5666066066066,-296.8571171171171,-296.1476276276276,-295.43813813813813,-294.72864864864863,-294.0191591591592,-293.3096696696697,-292.6001801801802,-291.8906906906907,-291.1812012012012,-290.4717117117117,-289.76222222222225,-289.05273273273275,-288.34324324324325,-287.63375375375375,-286.92426426426425,-286.21477477477475,-285.5052852852853,-284.7957957957958,-284.0863063063063,-283.3768168168168,-282.6673273273273,-281.9578378378378,-281.2483483483484,-280.5388588588589,-279.8293693693694,-279.1198798798799,-278.4103903903904,-277.7009009009009,-276.99141141141143,-276.28192192192193,-275.57243243243244,-274.86294294294294,-274.15345345345344,-273.44396396396394,-272.7344744744745,-272.024984984985,-271.3154954954955,-270.606006006006,-269.8965165165165,-269.187027027027,-268.47753753753756,-267.76804804804806,-267.05855855855856,-266.34906906906906,-265.63957957957956,-264.9300900900901,-264.2206006006006,-263.5111111111111,-262.8016216216216,-262.0921321321321,-261.3826426426426,-260.6731531531532,-259.9636636636637,-259.2541741741742,-258.5446846846847,-257.8351951951952,-257.1257057057057,-256.41621621621624,-255.7067267267267,-254.99723723723724,-254.28774774774774,-253.57825825825824,-252.86876876876877,-252.15927927927927,-251.44978978978978,-250.7403003003003,-250.0308108108108,-249.32132132132134,-248.61183183183184,-247.90234234234234,-247.19285285285287,-246.48336336336337,-245.77387387387387,-245.0643843843844,-244.3548948948949,-243.6454054054054,-242.93591591591593,-242.22642642642643,-241.51693693693693,-240.80744744744746,-240.09795795795796,-239.38846846846846,-238.678978978979,-237.9694894894895,-237.26,-236.55051051051052,-235.84102102102102,-235.13153153153152,-234.42204204204205,-233.71255255255255,-233.00306306306305,-232.29357357357358,-231.58408408408408,-230.87459459459458,-230.1651051051051,-229.4556156156156,-228.74612612612611,-228.03663663663664,-227.32714714714714,-226.61765765765765,-225.90816816816817,-225.19867867867868,-224.48918918918918,-223.7796996996997,-223.0702102102102,-222.3607207207207,-221.65123123123124,-220.94174174174174,-220.23225225225227,-219.52276276276277,-218.81327327327327,-218.1037837837838,-217.3942942942943,-216.6848048048048,-215.97531531531533,-215.26582582582583,-214.55633633633633,-213.84684684684686,-213.13735735735736,-212.42786786786786,-211.7183783783784,-211.0088888888889,-210.2993993993994,-209.58990990990992,-208.88042042042042,-208.17093093093092,-207.46144144144145,-206.75195195195195,-206.04246246246245,-205.33297297297298,-204.62348348348348,-203.91399399399398,-203.2045045045045,-202.495015015015,-201.78552552552551,-201.07603603603604,-200.36654654654654,-199.65705705705705,-198.94756756756757,-198.23807807807808,-197.52858858858858,-196.8190990990991,-196.1096096096096,-195.4001201201201,-194.69063063063064,-193.98114114114114,-193.27165165165164,-192.56216216216217,-191.85267267267267,-191.1431831831832,-190.4336936936937,-189.7242042042042,-189.01471471471473,-188.30522522522523,-187.59573573573573,-186.88624624624626,-186.17675675675676,-185.46726726726726,-184.7577777777778,-184.0482882882883,-183.3387987987988,-182.62930930930932,-181.91981981981982,-181.21033033033032,-180.50084084084085,-179.79135135135135,-179.08186186186185,-178.37237237237238,-177.66288288288288,-176.95339339339338,-176.2439039039039,-175.5344144144144,-174.82492492492491,-174.11543543543544,-173.40594594594594,-172.69645645645645,-171.98696696696697,-171.27747747747748,-170.56798798798798,-169.8584984984985,-169.149009009009,-168.4395195195195,-167.73003003003004,-167.02054054054054,-166.31105105105104,-165.60156156156157,-164.89207207207207,-164.18258258258257,-163.4730930930931,-162.7636036036036,-162.05411411411413,-161.34462462462463,-160.63513513513513,-159.92564564564566,-159.21615615615616,-158.50666666666666,-157.7971771771772,-157.0876876876877,-156.3781981981982,-155.66870870870872,-154.95921921921922,-154.24972972972972,-153.54024024024025,-152.83075075075075,-152.12126126126125,-151.41177177177178,-150.70228228228228,-149.99279279279278,-149.2833033033033,-148.5738138138138,-147.86432432432431,-147.15483483483484,-146.44534534534534,-145.73585585585585,-145.02636636636637,-144.31687687687688,-143.60738738738738,-142.8978978978979,-142.1884084084084,-141.4789189189189,-140.76942942942944,-140.05993993993994,-139.35045045045044,-138.64096096096097,-137.93147147147147,-137.22198198198197,-136.5124924924925,-135.803003003003,-135.0935135135135,-134.38402402402403,-133.67453453453453,-132.96504504504506,-132.25555555555556,-131.54606606606606,-130.8365765765766,-130.1270870870871,-129.4175975975976,-128.70810810810812,-127.99861861861862,-127.28912912912912,-126.57963963963964,-125.87015015015015,-125.16066066066067,-124.45117117117117,-123.74168168168168,-123.0321921921922,-122.3227027027027,-121.61321321321321,-120.90372372372373,-120.19423423423423,-119.48474474474475,-118.77525525525526,-118.06576576576576,-117.35627627627628,-116.64678678678679,-115.93729729729729,-115.2278078078078,-114.51831831831832,-113.80882882882882,-113.09933933933934,-112.38984984984985,-111.68036036036035,-110.97087087087087,-110.26138138138138,-109.5518918918919,-108.8424024024024,-108.13291291291291,-107.42342342342343,-106.71393393393393,-106.00444444444445,-105.29495495495496,-104.58546546546546,-103.87597597597598,-103.16648648648649,-102.45699699699699,-101.7475075075075,-101.03801801801802,-100.32852852852852,-99.61903903903904,-98.90954954954955,-98.20006006006005,-97.49057057057057,-96.78108108108108,-96.0715915915916,-95.3621021021021,-94.65261261261261,-93.94312312312313,-93.23363363363363,-92.52414414414415,-91.81465465465466,-91.10516516516516,-90.39567567567568,-89.68618618618619,-88.97669669669669,-88.2672072072072,-87.55771771771772,-86.84822822822822,-86.13873873873874,-85.42924924924925,-84.71975975975975,-84.01027027027027,-83.30078078078078,-82.59129129129128,-81.8818018018018,-81.17231231231231,-80.46282282282283,-79.75333333333333,-79.04384384384385,-78.33435435435436,-77.62486486486486,-76.91537537537538,-76.20588588588589,-75.49639639639639,-74.7869069069069,-74.07741741741742,-73.36792792792792,-72.65843843843844,-71.94894894894895,-71.23945945945945,-70.52996996996997,-69.82048048048048,-69.11099099099098,-68.4015015015015,-67.69201201201201,-66.98252252252253,-66.27303303303303,-65.56354354354355,-64.85405405405406,-64.14456456456456,-63.435075075075076,-62.725585585585584,-62.0160960960961,-61.30660660660661,-60.597117117117115,-59.88762762762763,-59.17813813813814,-58.468648648648646,-57.75915915915916,-57.04966966966967,-56.34018018018018,-55.63069069069069,-54.9212012012012,-54.211711711711715,-53.50222222222222,-52.79273273273273,-52.083243243243246,-51.37375375375375,-50.66426426426426,-49.954774774774776,-49.245285285285284,-48.5357957957958,-47.82630630630631,-47.116816816816815,-46.40732732732733,-45.69783783783784,-44.988348348348346,-44.27885885885886,-43.56936936936937,-42.85987987987988,-42.15039039039039,-41.4409009009009,-40.731411411411415,-40.02192192192192,-39.31243243243243,-38.602942942942946,-37.89345345345345,-37.18396396396396,-36.474474474474476,-35.764984984984984,-35.05549549549549,-34.34600600600601,-33.636516516516515,-32.92702702702703,-32.21753753753754,-31.50804804804805,-30.798558558558558,-30.08906906906907,-29.37957957957958,-28.67009009009009,-27.9606006006006,-27.25111111111111,-26.541621621621623,-25.83213213213213,-25.122642642642642,-24.413153153153154,-23.703663663663665,-22.994174174174173,-22.284684684684684,-21.575195195195196,-20.865705705705707,-20.156216216216215,-19.446726726726727,-18.737237237237238,-18.027747747747746,-17.318258258258258,-16.60876876876877,-15.899279279279279,-15.18978978978979,-14.4803003003003,-13.770810810810811,-13.061321321321321,-12.351831831831833,-11.642342342342342,-10.932852852852854,-10.223363363363363,-9.513873873873873,-8.804384384384385,-8.094894894894894,-7.385405405405406,-6.675915915915916,-5.966426426426427,-5.2569369369369365,-4.547447447447447,-3.837957957957958,-3.1284684684684683,-2.418978978978979,-1.7094894894894894,-1.0]}
},{}],69:[function(require,module,exports){
module.exports={"expected":[2.718281828459045,5.526139605036564,11.234382915941184,22.838974134305474,46.430564403080524,94.3911621472732,191.89281039456188,390.1090933033613,793.0735099718115,1612.2812900695583,3277.692326907691,6663.394939853256,13546.369730911094,27539.1350119472,55985.77126354929,113816.45003064431,231383.5105815943,470391.8366338771,956284.5658950494,1.9440817202804782e6,3.952227056588822e6,8.034692443164972e6,1.6334153309494097e7,3.320656841881039e7,6.7507397858952e7,1.3723937710785338e8,2.79001223959248e8,5.671964170282148e8,1.1530837425166144e9,2.3441652262587843e9,4.765578080224924e9,9.688196968507166e9,1.969565054239165e10,4.004033480625908e10,8.140012476087735e10,1.654826400215472e11,3.364184542584713e11,6.839229562141511e11,1.390383328012468e12,2.8265841660236807e12,5.746313183312399e12,1.168198548538573e13,2.3748929187687773e13,4.828046039497257e13,9.815191403067452e13,1.9953824278129953e14,4.056518991550728e14,8.246713060837892e14,1.6765181292001192e15,3.408282811347276e15,6.928879276520302e15,1.4086086949343948e16,2.86363548311272e16,5.821636775090438e16,1.1835114818540298e17,2.4060233947841443e17,4.891332838765486e17,9.943850500976485e17,2.0215382196466348e18,4.10969249094277e18,8.354812293909443e18,1.698494196835819e19,3.4529591272660636e19,7.019704133686012e19,1.4270729628793422e20,2.9011724747889538e20,5.8979477205502604e20,1.1990251395472278e21,2.437561934055444e21,4.955449211515154e21,1.0074196082907584e22,2.0480368657807375e22,4.163562997064869e22,8.46432850900819e22,1.7207583302790377e23,3.498221067475627e23,7.111719537598168e23,1.4457792634000888e24,2.939201507352518e24,5.975258962081781e24,1.2147421527453798e25,2.4695138855410728e25,5.0204060319280825e25,1.020625025556297e26,2.0748828604042807e26,4.218139646392603e26,8.575280280161115e26,1.743314305542441e27,3.544076308432735e27,7.204941094133833e27,1.464730769098349e28,2.97772903055404e28,6.053583611725806e28,1.2306651870649697e29,2.5018846683144406e29,5.0862143167265915e29,1.0340035415422764e30,2.102080756616804e30,4.273431695164021e30,8.687686424866277e30,1.7661659481352722e31,3.5905326272184534e31,7.2993846137344085e31,1.4839306941627655e32,3.0167615786884446e32,6.1329349533978755e32,1.2467969430637725e33,2.534679772482983e33,5.152885227041958e33,1.0475574252544317e34,2.1296351672005585e34,4.32944852094939e34,8.801566007284992e34,1.7893171337121245e35,3.637597902857043e35,7.395066114087081e35,1.503382294914111e36,3.056305771703304e36,6.213326445141211e36,1.2631401566989335e37,2.567904760119395e37,5.220430070307349e37,1.0612889754409135e38,2.1575507654029278e38,4.386199624241668e38,8.916938341474034e38,1.8127717887303275e39,3.6852801176522753e39,7.492001822841556e39,1.5230888703575218e40,3.0963683163215003e40,6.294771721409309e40,1.2796975997909523e41,2.6015652662048933e41,5.288860302175652e41,1.0752005209822831e42,2.1858322857289538e42,4.4436946300677905e42,9.033822994662357e42,1.83653389111583e43,3.733587358541237e43,7.590208180361837e43,1.5430537627420194e44,3.1369560071787094e44,6.3772845953779945e44,1.2964720804937949e45,2.6356669995849262e45,5.358187528462056e45,1.0892944212864251e46,2.2144845247443276e46,4.501943289621154e46,9.15223979056915e46,1.8606074709378684e47,3.78252781846593e47,7.689701842515174e47,1.5632803581273612e48,3.17807572797578e48,6.460879061288674e48,1.313466443771158e49,2.6702157439374034e49,5.428423507112857e49,1.1035730666887203e50,2.24351234188889e50,4.5609554819151595e50,9.272208812766088e50,1.8849966110924724e51,3.832109797762591e51,7.790499683496476e51,1.5837720869583161e52,3.219734452646256e52,6.54556929682142e52,1.330683571878978e53,2.705217358753646e53,5.499580150199315e53,1.1180388788574473e54,2.2729206603008283e54,4.6207412154590904e54,9.393750408083512e54,1.9097054479949248e55,3.882341705569751e55,7.892618798690413e55,1.6045324246464722e56,3.261939246538981e56,6.631369665499698e56,1.348126384854262e57,2.74067778033201e57,5.571669525938102e57,1.1326943112044998e58,2.3027144676515153e58,4.681310629955237e58,9.516885190061268e58,1.9347381722813283e59,3.933232061254162e59,7.996076507570235e59,1.6255648921596907e60,3.3046972676166096e60,6.718294719125951e60,1.365797841010349e61,2.7766030227848744e61,5.644703860737691e61,1.1475418493015033e62,2.3328988169915814e62,4.742673998018997e62,9.641634042444913e62,1.9600990295192038e63,3.984789495856024e63,8.10089035663641e63,1.6468730566191503e64,3.3480157676696593e64,6.806359200250649e64,1.3837009374385438e65,2.8129991790586834e65,5.7186955412728235e65,1.1625840113012882e66,2.3634788276079526e66,4.804841726920517e66,9.768018122726928e66,1.985792320927844e67,4.03702275355231e67,8.207078122390827e67,1.6684605319045866e68,3.391902093546041e68,6.895578044671195e68,1.4018387105166406e69,2.8498724219670017e69,5.793657116584114e69,1.1778233483651491e70,2.394459685891821e70,4.867824360350101e70,9.896058865736563e70,2.0118224041073873e71,4.0899406931400593e71,8.314657814353527e71,1.6903309792668612e72,3.4363636883973177e72,6.9859663839665905e72,1.4202142364236007e73,2.887229005237616e73,5.869601300207659e73,1.1932624450952784e74,2.42584664621842e74,4.931632580206846e74,1.002577798727311e75,2.0381936937783186e75,4.143552289539186e75,8.42364767811528e75,1.712488107949287e76,3.4814080929413676e76,7.077539548062208e76,1.438830631661591e77,2.925075264573424e77,5.946540972329955e77,1.2089039199733817e78,2.457645031838381e78,4.99627720840933e78,1.0157197487791164e79,2.064910662529813e79,4.197866635313822e79,8.534066198433931e79,1.7349356758163888e80,3.5270429467406087e80,7.170313067831331e80,1.4576910535842666e81,2.963417618726397e81,6.024489181973714e81,1.22475042580454e82,2.489860235780077e82,5.0617692087321384e82,1.0290339656129946e83,2.0919778415784573e83,4.2528929422153574e83,8.645932102367514e83,1.7576774899913759e84,3.573275989498466e84,7.2643026777276e84,1.4767987009323769e85,3.0022625705868714e85,6.1034591492096444e85,1.2408046501672253e86,2.522497721764841e86,5.128119688664192e86,1.0425227073294325e87,2.1193998215369277e87,4.308640542743812e87,8.75926436245232e87,1.780717407501989e88,3.620115062371228e88,7.359524318455214e88,1.4961568143764023e89,3.041616708285768e89,6.183464267399944e89,1.257069315869224e90,2.5555630251330543e90,5.195339901293731e90,1.0561882616285486e91,2.1471812531921466e91,4.365118891731594e91,8.874082199918935e91,1.8040593359343038e92,3.667568109298722e92,7.455994139671046e92,1.515768677065881e93,3.081486706312625e93,6.26451810546862e93,1.2735471814091809e94,2.589061753783512e94,5.263441247215839e94,1.0700329461978809e95,2.175326848294537e95,4.422337567946199e95,8.990405087952898e95,1.8277072340958613e96,3.7156431783507973e96,7.553728502724248e96,1.5356376151865715e97,3.1218793266469087e97,6.346634410203303e97,1.2902410414447245e98,2.622999589123952e98,5.3324352764664166e98,1.084059109105707e99,2.203841380356653e99,4.480306275715133e99,9.108252754998148e99,1.8516651126866795e100,3.764348423093105e100,7.652743983431797e100,1.5557669985242334e101,3.1628014199055456e101,6.429827108587249e101,1.3071537272661575e102,2.657382287035208e102,5.402333690481535e102,1.098269129199036e103,2.232729685463264e103,4.539034846572159e103,9.227645188101187e103,1.8759370349798817e104,3.813692103969224e104,7.753057374888264e104,1.5761602410364925e105,3.2042599265041777e105,6.514110310160114e105,1.3242881072769356e106,2.6922156788468976e106,5.47314834408095e106,1.1126654165073082e107,2.2619966630911242e107,4.5985332409238474e107,9.348602636302962e107,1.9005271175104678e108,3.863682589701943e108,7.854685690315661e108,1.5968208014314984e109,3.246261877834521e109,6.599498309412389e109,1.3416470874798563e110,2.7275056723266345e110,5.5448912474799075e110,1.1272504126508899e111,2.2916472769401742e111,4.658811549739753e111,9.471145614071031e111,1.9254395307736332e112,3.9143283587129365e112,7.957646165947374e112,1.617752183754927e113,3.288814397457082e113,6.686005588208288e113,1.359233611970218e114,2.763258252682228e114,5.617574568325011e114,1.1420265912554561e115,2.3216865557751957e115,4.719879996263479e115,9.59529490478094e115,1.9506784999322564e116,3.965638000560055e116,8.061956263951853e116,1.6389579379836778e117,3.33192470230914e117,6.77364681824337e117,1.3770506634348756e118,2.7994794835763174e118,5.691210633758149e118,1.1569964583711044e119,2.3521195942792175e119,4.781748937746276e119,9.721071564239238e119,1.9762483055331612e120,4.01762021739433e120,8.167633675395823e120,1.660441660628777e121,3.3756001039285545e121,6.862436863531553e121,1.3951012636582593e122,2.8361755081549135e122,5.765811932508329e122,1.1721625528979636e123,2.382951553916794e123,4.8444288672040274e123,9.84849692425562e123,2.0021532842332052e124,4.0702838254366636e124,8.27469632324196e124,1.6822069953445675e125,3.419848009694084e125,6.95239078292682e125,1.4133884740347517e126,2.873352550089855e126,5.841391117007843e126,1.1875274470162422e127,2.414187663809912e127,4.907930415196749e127,9.977592596259984e127,2.028397829535178e128,4.123637756471705e128,8.383162365390457e128,1.7042576335470887e129,3.464675924081397e129,7.043523832676614e129,1.4319153960882236e130,2.911016914633378e130,5.917961005539414e130,1.203093746622763e131,2.445833221624588e131,4.972264351631255e131,1.010838047497001e132,2.0549863925322652e132,4.177691059363594e132,8.493050197758171e132,1.7265973150399536e133,3.5100914499366185e133,7.135851469010914e133,1.4506851719975754e134,2.949174989688138e134,5.99553458440986e134,1.2188640917727925e135,2.477893594469907e135,5.037441587588865e135,1.0240882742101137e136,2.0819234826634065e136,4.232452901590427e136,8.604378457398081e136,1.7492298286490129e137,3.5561022897646037e137,7.229389350761227e137,1.4697009851299708e138,2.987833246890437e138,6.074125010152243e138,1.2348411571280708e139,2.5103742198074616e139,5.10347317717425e139,1.0375121870130836e140,2.1092136684779894e140,4.287932570798826e140,8.71716602566211e140,1.7721590128643576e141,3.602716247036072e141,7.324153342017929e141,1.4889660605805753e142,3.02699824270765e142,6.153745611758598e142,1.2510276524100243e143,2.5432806063741e143,5.170370319391335e143,1.0511120626108816e144,2.1368615784105536e144,4.3441394763801005e144,8.83143203140049e144,1.7953887564917197e145,3.649941227510883e145,7.420159514820007e145,1.5084836657198705e146,3.0666766195508886e146,6.234409892938482e146,1.2674263228596097e147,2.576618335116071e147,5.238144360042081e147,1.0648902075520698e148,2.164871901566265e148,4.401083151064634e148,8.947195854207969e148,1.818922999311917e149,3.6977852405786503e149,7.517424151882569e149,1.5282571107472992e150,3.1068751069005364e150,6.316131534410581e150,1.2840399497028416e151,2.610393060135414e151,5.306806793651927e151,1.0788489586196393e152,2.193249388515464e152,4.458773252539607e152,9.06447712771012e152,1.84276573274894e153,3.746256400617978e153,7.615963749355889e153,1.5482897492530123e154,3.147600522448253e154,6.398924396222265e154,1.3008713506224158e155,2.644610509649484e155,5.376369265417497e155,1.0929906832275646e156,2.2219988520998485e156,4.5172195650864526e156,9.183295742892697e156,1.8669210005473165e157,3.7953629283714105e157,7.71579501962484e157,1.5685849787865557e158,3.1888597732529095e158,6.482802520101712e158,1.3179233802358847e159,2.6792764869615816e159,5.44684357318281e159,1.1073177798222621e160,2.2511251682484865e160,4.5764320012412964e160,9.303671851477243e160,1.891392899457311e161,3.8451131523405107e161,7.816934894142907e161,1.5891462414330084e162,3.230659856912751e162,6.5677801318372256e162,1.3351989305793623e163,2.7143968714457814e163,5.5182416694399125e163,1.1218326782893032e164,2.2806332768052872e164,4.636420603474603e164,9.425625869335721e164,1.9161855799301493e165,3.895515510198172e165,7.91940052630332e165,1.6099770243971216e166,3.273007862751117e166,6.653871643691381e166,1.3527009315983085e167,2.7499776195437783e167,5.590575663355707e167,1.1365378403657788e168,2.31052818236604e168,4.697195545895404e168,9.549178479955125e168,1.9413032468217243e169,3.946578550219425e169,8.023209294350087e169,1.6310808605942129e170,3.3159109730195114e170,6.741091656844995e170,1.370432351644298e171,2.786024765775726e171,5.663857822826948e171,1.151435760057432e172,2.340814955127704e172,4.758767135976575e172,9.67435063794436e172,1.9667501601061845e173,3.9983109327321337e173,8.128378804322657e173,1.6524613292497084e174,3.359376464115538e174,6.829454963873107e174,1.388396197978767e175,2.8225444237627626e175,5.738100576558985e175,1.1665289640618956e176,2.3714987317481904e176,4.821145816302722e176,9.801163572590342e176,1.992530635597769e177,4.050721431584448e177,8.234926893043718e177,1.674122056506094e178,3.4034117078167914e178,6.918976551255361e178,1.4065955172825814e179,2.8595427872645075e179,5.813316516174944e179,1.1818200121970919e180,2.402584716217406e180,4.88434216634234e180,9.929638791455218e180,2.0186490456832094e181,4.103818935633747e181,8.342871631143399e181,1.6960667160378143e182,3.4480241725318854e182,7.009671601915408e182,1.4250333961730644e183,2.8970261312293706e183,5.889518398350624e183,1.197311497835647e184,2.434078180740401e184,4.948366904240469e184,1.0059798084026256e185,2.0451098200631826e185,4.157612450253738e185,8.452231326125965e185,1.7182990296747147e186,3.493221424565946e186,7.101555497797475e186,1.443712961727413e187,2.935000812858621e187,5.966719146979375e187,1.2130060483443286e188,2.4659844666307196e188,5.013230888637577e188,1.01916635254108e189,2.0719174465034718e189,4.2121110988627123e189,8.56302452547195e189,1.740822768032692e190,3.5390111294046312e190,7.194643822474773e190,1.462637382012968e191,2.97347327268524e191,6.044931855362001e191,1.2289063255299147e192,2.4983089852168365e192,5.078945120510643e192,1.0325257480079645e193,2.099076471596565e193,4.267324124469481e193,8.675270019785699e193,1.7636417511535762e194,3.585401053013807e194,7.28895236379207e194,1.4818098666248542e195,3.0124500356652437e195,6.124169788428722e195,1.2450150260905728e196,2.5310572187596405e196,5.145520745040073e196,1.046060260566241e197,2.1265915015320573e197,4.323260891241928e197,8.788986845981806e197,1.7867598491528128e198,3.63239906315747e198,7.384497116544967e198,1.5012336672298316e199,3.051937712284981e199,6.2044463849885845e199,1.2613348820731488e200,2.5642347213828038e200,5.2129690534982155e200,1.0597721856786773e201,2.1544672028783325e201,4.379930886094945e201,8.904194290513277e201,1.8101809828762463e202,3.6800131307309177e202,7.481294285190162e202,1.5209120781181115e203,3.0919429996821137e203,6.285775260008332e203,1.2778686613368105e204,2.597847120013909e204,5.28130148516551e204,1.0736638488973937e205,2.182708303373773e205,4.437343720299169e205,9.020911892644546e205,1.8339091245644888e206,3.728251331113418e206,7.579360286595374e206,1.5408484367619003e207,3.132472682781276e207,6.368170206922942e207,1.2946191680220515e208,2.6319001153393474e208,5.3505296292703145e208,1.0877376062581575e209,2.2113195927290856e209,4.495509131112067e209,9.139159447762329e209,1.8579482985270195e210,3.7771218455376025e210,7.678711752822814e210,1.5610461243817867e211,3.1735336354455126e211,6.451645199972873e211,1.3115892430265582e212,2.66639948277102e212,5.420665226954133e212,1.1019958446802146e213,2.2403059234388968e213,4.5544369834278736e213,9.258957010734941e213,1.8823025818246093e214,3.8266329624767894e214,7.77936553395173e214,1.581508566519676e215,3.21513282164103e215,6.536214396575515e215,1.3287817644869588e216,2.7013510734256957e216,5.4917201732641563e216,1.1164409823707446e217,2.2696722116052337e217,4.61413727145169e217,9.380324899312588e217,1.9069761049606857e218,3.876793079051584e218,7.881338700933595e218,1.6022392336201122e219,3.2572772966189957e219,6.621892139725574e219,1.3461996482668792e220,2.7367608151179786e220,5.56370651916883e220,1.1310754692352356e221,2.2994234377711743e221,4.674620120393989e221,9.503283697575388e221,1.9319730525823e222,3.9276107024527366e222,7.984648548488625e222,1.6232416416187814e223,3.299974208111748e223,6.708692960429533e223,1.3638458484517823e224,2.7726347133645956e224,5.6366364736029274e224,1.1459017872928624e225,2.3295646477655507e225,4.735895788188915e225,9.627854259421822e225,1.9572976641892008e226,3.9790944513846064e226,8.089312598040814e226,1.644519352538723e227,3.3432307975459984e227,6.796631580165971e227,1.3817233578494463e228,2.8089788524043332e228,5.7105224055375696e228,1.1609224510977665e229,2.360100953558593e229,4.797974667232731e229,9.754057712104942e229,1.982954234853173e230,4.031253057527815e230,8.195348600684575e230,1.666075975094919e231,3.387054401268909e231,6.885722913387253e231,1.3998352084982448e232,2.8457993962280395e232,5.785376846079627e232,1.1761400081648057e233,2.3910375341293196e233,4.860867286146062e233,9.881915459819952e233,2.0089471159469417e234,4.084095367017649e234,8.30277454020221e234,1.6879151653053035e235,3.431452451794797e235,6.975982070046793e235,1.4181844721804396e236,2.883102589626424e236,5.861212490593431e236,1.1915570394024665e237,2.4223796363437775e237,4.9245843115617444e237,1.0011449187331718e238,2.0352807158809237e238,4.1376303419477996e238,8.411608636106561e238,1.7100406271120468e239,3.476432479064578e239,7.0674243581593165e239,1.4367742609443464e240,2.9208947592466093e240,5.93804220085815e240,1.207176159550201e241,2.4541325758439465e241,4.9891365499325606e241,1.0142680863649048e242,2.061959500852605e242,4.191867061886642e242,8.521869346737586e242,1.7324561130091922e243,3.5220021117216505e243,7.160065286402646e243,1.4556077276308583e244,2.959182314667405e244,6.015879007247236e244,1.2230000176214733e245,2.4863017379511993e245,5.054534949362305e245,1.027563274575745e246,2.08898799560217e246,4.2468147254203966e246,8.633575372390155e246,1.755165424678485e247,3.568169078408484e247,7.253920566741593e247,1.4746880664093015e248,2.9979717494854137e248,6.094736110936308e248,1.239031297353991e249,2.5188925785774396e249,5.1207906014659684e249,1.0410327382390596e250,2.1163707841815245e250,4.3024826517118425e250,8.746745658482649e250,1.7781724136355142e251,3.6149412090742156e251,7.349006117098361e251,1.49401851331869e252,3.0372696424153212e252,6.174626886146859e252,1.255272717663765e253,2.551910625152383e253,5.187914743249224e253,1.0546787617851016e254,2.1441125107310678e254,4.3588802820793664e254,8.861399398776967e254,1.8014809818813485e255,3.6623264363054237e255,7.445338064049854e255,1.5136023468160453e256,3.0770826584080275e256,6.255564882409024e256,1.271727033107215e257,2.5853614775601904e257,5.255918759012445e257,1.0685036595892776e258,2.1722178802666036e258,4.416017181601132e258,8.977556038625909e258,1.8250950825657157e259,3.7103327966703164e259,7.542932745560185e259,1.5334428883336117e260,3.1174175497782846e260,6.337563826864452e260,1.2883970343479316e261,2.6192508090883164e261,5.324814182285606e261,1.0825097763637138e262,2.200691659478766e262,4.473903040735897e262,9.095235278278092e262,1.8490187206568717e263,3.758968432080457e263,7.641806713757516e263,1.5535435028408049e264,3.158281157352315e264,6.420637626592389e264,1.3052855486295308e265,2.6535843673917588e265,5.3946126977796324e265,1.0966994875557626e266,2.229538677540741e266,4.5325476769649754e266,9.214457076216174e266,1.8732559536202045e267,3.8082415911745856e267,7.741976737734506e267,1.5739075994161213e268,3.1996804116269987e268,6.504800370966105e268,1.3223954402561795e269,2.688367975465496e269,5.465326143372324e269,1.1110751997505245e270,2.258763826926529e270,4.591961036460845e270,9.335241652538658e270,1.897810892107638e271,3.8581606307141965e271,7.84345980639836e271,1.5945386318248098e272,3.2416223339441866e272,6.590066334047568e272,1.3397296110772037e273,2.723607532634162e273,5.536966512114298e273,1.1256393510786237e274,2.288372064242482e274,4.652153195769923e274,9.457609492395469e274,1.9226877006541878e275,3.908734017003849e275,7.946273131349635e275,1.6154400991040821e276,3.2841140376840634e276,6.676449977002456e276,1.3572910009802857e277,2.7593090155516903e277,5.60954595426111e277,1.1403944116305984e278,2.318368411065906e278,4.7131343635251814e278,9.581581349459197e278,1.9478905983836035e279,3.959970327325792e279,8.050434149798584e279,1.6366155461578195e280,3.327162729468656e280,6.7639659505579644e280,1.3750825883896315e281,2.795478479214012e281,5.6830767793383383e281,1.1553428838748138e282,2.348757954798527e282,4.774914882175999e282,9.70717824944162e282,1.9734238597254636e283,4.011878251393313e283,8.155960527527913e283,1.6580685643563303e284,3.3707757103866656e284,6.852629097485392e284,1.3931073907706383e285,2.832122057988173e285,5.757571458224227e285,1.1704873030827786e286,2.3795458495285536e286,4.837505229740609e286,9.83442149366729e286,1.9992918151383613e287,4.0644665928271963e287,8.262870161886266e287,1.679802792146737e288,3.4149603772306433e288,6.94245445511512e288,1.4113684651427516e289,2.8692459666502044e289,5.833042625269221e289,1.1858302377587515e290,2.4107373169039982e290,4.900916021586968e290,9.963332662677489e290,2.0254988518459067e291,4.117744270647519e291,8.371181184820777e291,1.7018219156695166e292,3.4597242237503184e292,7.033457257892398e292,1.4298689085966795e293,2.906856501441382e293,5.909503080436877e293,1.2013742900749513e294,2.442337647020157e294,4.9651580122287575e294,1.0093933619898035e295,2.052049414580146e295,4.17172032078489e295,8.480911965958825e295,1.724129669383083e296,3.5050748419258515e296,7.125652939954838e296,1.4486118588207703e297,2.94496004113513e297,5.986965791472706e297,1.2171220963138285e298,2.474352199314639e298,5.030242097153217e298,1.0226246515344071e299,2.0789480063346853e299,4.226403897616227e299,8.592081115715967e299,1.7467298366983097e300,3.5510199232543085e300,7.219057137755598e300,1.4676004946327002e301,2.9835630481178506e301,6.065443896108204e301,1.2330763273140956e302,2.5067864034782503e302,5.096179314667393e302,1.036029378937319e303,2.106199189130029e303,4.2818042755135755e303,8.704707488458952e303,1.7696262506196317e304,3.5975672600529185e304,7.313685692712992e304,1.4868380365180948e305,3.0226720694872875e305,6.144950704283608e305,1.2492396889246612e306,2.539645760375062e306,5.162980847768492e306,1.0496098176499464e307,2.1338075847854238e307,4.3379308504203717e307,8.818810185700627e307,1.7928227943945155e308],"x":[1.0,1.7094894894894894,2.418978978978979,3.1284684684684683,3.837957957957958,4.547447447447447,5.2569369369369365,5.966426426426427,6.675915915915916,7.385405405405406,8.094894894894894,8.804384384384385,9.513873873873873,10.223363363363363,10.932852852852854,11.642342342342342,12.351831831831833,13.061321321321321,13.770810810810811,14.4803003003003,15.18978978978979,15.899279279279279,16.60876876876877,17.318258258258258,18.027747747747746,18.737237237237238,19.446726726726727,20.156216216216215,20.865705705705707,21.575195195195196,22.284684684684684,22.994174174174173,23.703663663663665,24.413153153153154,25.122642642642642,25.83213213213213,26.541621621621623,27.25111111111111,27.9606006006006,28.67009009009009,29.37957957957958,30.08906906906907,30.798558558558558,31.50804804804805,32.21753753753754,32.92702702702703,33.636516516516515,34.34600600600601,35.05549549549549,35.764984984984984,36.474474474474476,37.18396396396396,37.89345345345345,38.602942942942946,39.31243243243243,40.02192192192192,40.731411411411415,41.4409009009009,42.15039039039039,42.85987987987988,43.56936936936937,44.27885885885886,44.988348348348346,45.69783783783784,46.40732732732733,47.116816816816815,47.82630630630631,48.5357957957958,49.245285285285284,49.954774774774776,50.66426426426426,51.37375375375375,52.083243243243246,52.79273273273273,53.50222222222222,54.211711711711715,54.9212012012012,55.63069069069069,56.34018018018018,57.04966966966967,57.75915915915916,58.468648648648646,59.17813813813814,59.88762762762763,60.597117117117115,61.30660660660661,62.0160960960961,62.725585585585584,63.435075075075076,64.14456456456456,64.85405405405406,65.56354354354355,66.27303303303303,66.98252252252253,67.69201201201201,68.4015015015015,69.11099099099098,69.82048048048048,70.52996996996997,71.23945945945945,71.94894894894895,72.65843843843844,73.36792792792792,74.07741741741742,74.7869069069069,75.49639639639639,76.20588588588589,76.91537537537538,77.62486486486486,78.33435435435436,79.04384384384385,79.75333333333333,80.46282282282283,81.17231231231231,81.8818018018018,82.59129129129128,83.30078078078078,84.01027027027027,84.71975975975975,85.42924924924925,86.13873873873874,86.84822822822822,87.55771771771772,88.2672072072072,88.97669669669669,89.68618618618619,90.39567567567568,91.10516516516516,91.81465465465466,92.52414414414415,93.23363363363363,93.94312312312313,94.65261261261261,95.3621021021021,96.0715915915916,96.78108108108108,97.49057057057057,98.20006006006005,98.90954954954955,99.61903903903904,100.32852852852852,101.03801801801802,101.7475075075075,102.45699699699699,103.16648648648649,103.87597597597598,104.58546546546546,105.29495495495496,106.00444444444445,106.71393393393393,107.42342342342343,108.13291291291291,108.8424024024024,109.5518918918919,110.26138138138138,110.97087087087087,111.68036036036035,112.38984984984985,113.09933933933934,113.80882882882882,114.51831831831832,115.2278078078078,115.93729729729729,116.64678678678679,117.35627627627628,118.06576576576576,118.77525525525526,119.48474474474475,120.19423423423423,120.90372372372373,121.61321321321321,122.3227027027027,123.0321921921922,123.74168168168168,124.45117117117117,125.16066066066067,125.87015015015015,126.57963963963964,127.28912912912912,127.99861861861862,128.70810810810812,129.4175975975976,130.1270870870871,130.8365765765766,131.54606606606606,132.25555555555556,132.96504504504506,133.67453453453453,134.38402402402403,135.0935135135135,135.803003003003,136.5124924924925,137.22198198198197,137.93147147147147,138.64096096096097,139.35045045045044,140.05993993993994,140.76942942942944,141.4789189189189,142.1884084084084,142.8978978978979,143.60738738738738,144.31687687687688,145.02636636636637,145.73585585585585,146.44534534534534,147.15483483483484,147.86432432432431,148.5738138138138,149.2833033033033,149.99279279279278,150.70228228228228,151.41177177177178,152.12126126126125,152.83075075075075,153.54024024024025,154.24972972972972,154.95921921921922,155.66870870870872,156.3781981981982,157.0876876876877,157.7971771771772,158.50666666666666,159.21615615615616,159.92564564564566,160.63513513513513,161.34462462462463,162.05411411411413,162.7636036036036,163.4730930930931,164.18258258258257,164.89207207207207,165.60156156156157,166.31105105105104,167.02054054054054,167.73003003003004,168.4395195195195,169.149009009009,169.8584984984985,170.56798798798798,171.27747747747748,171.98696696696697,172.69645645645645,173.40594594594594,174.11543543543544,174.82492492492491,175.5344144144144,176.2439039039039,176.95339339339338,177.66288288288288,178.37237237237238,179.08186186186185,179.79135135135135,180.50084084084085,181.21033033033032,181.91981981981982,182.62930930930932,183.3387987987988,184.0482882882883,184.7577777777778,185.46726726726726,186.17675675675676,186.88624624624626,187.59573573573573,188.30522522522523,189.01471471471473,189.7242042042042,190.4336936936937,191.1431831831832,191.85267267267267,192.56216216216217,193.27165165165164,193.98114114114114,194.69063063063064,195.4001201201201,196.1096096096096,196.8190990990991,197.52858858858858,198.23807807807808,198.94756756756757,199.65705705705705,200.36654654654654,201.07603603603604,201.78552552552551,202.495015015015,203.2045045045045,203.91399399399398,204.62348348348348,205.33297297297298,206.04246246246245,206.75195195195195,207.46144144144145,208.17093093093092,208.88042042042042,209.58990990990992,210.2993993993994,211.0088888888889,211.7183783783784,212.42786786786786,213.13735735735736,213.84684684684686,214.55633633633633,215.26582582582583,215.97531531531533,216.6848048048048,217.3942942942943,218.1037837837838,218.81327327327327,219.52276276276277,220.23225225225227,220.94174174174174,221.65123123123124,222.3607207207207,223.0702102102102,223.7796996996997,224.48918918918918,225.19867867867868,225.90816816816817,226.61765765765765,227.32714714714714,228.03663663663664,228.74612612612611,229.4556156156156,230.1651051051051,230.87459459459458,231.58408408408408,232.29357357357358,233.00306306306305,233.71255255255255,234.42204204204205,235.13153153153152,235.84102102102102,236.55051051051052,237.26,237.9694894894895,238.678978978979,239.38846846846846,240.09795795795796,240.80744744744746,241.51693693693693,242.22642642642643,242.93591591591593,243.6454054054054,244.3548948948949,245.0643843843844,245.77387387387387,246.48336336336337,247.19285285285287,247.90234234234234,248.61183183183184,249.32132132132134,250.0308108108108,250.7403003003003,251.44978978978978,252.15927927927927,252.86876876876877,253.57825825825824,254.28774774774774,254.99723723723724,255.7067267267267,256.41621621621624,257.1257057057057,257.8351951951952,258.5446846846847,259.2541741741742,259.9636636636637,260.6731531531532,261.3826426426426,262.0921321321321,262.8016216216216,263.5111111111111,264.2206006006006,264.9300900900901,265.63957957957956,266.34906906906906,267.05855855855856,267.76804804804806,268.47753753753756,269.187027027027,269.8965165165165,270.606006006006,271.3154954954955,272.024984984985,272.7344744744745,273.44396396396394,274.15345345345344,274.86294294294294,275.57243243243244,276.28192192192193,276.99141141141143,277.7009009009009,278.4103903903904,279.1198798798799,279.8293693693694,280.5388588588589,281.2483483483484,281.9578378378378,282.6673273273273,283.3768168168168,284.0863063063063,284.7957957957958,285.5052852852853,286.21477477477475,286.92426426426425,287.63375375375375,288.34324324324325,289.05273273273275,289.76222222222225,290.4717117117117,291.1812012012012,291.8906906906907,292.6001801801802,293.3096696696697,294.0191591591592,294.72864864864863,295.43813813813813,296.1476276276276,296.8571171171171,297.5666066066066,298.27609609609607,298.98558558558557,299.69507507507507,300.40456456456457,301.11405405405407,301.82354354354356,302.533033033033,303.2425225225225,303.952012012012,304.6615015015015,305.370990990991,306.0804804804805,306.78996996996995,307.49945945945944,308.20894894894894,308.91843843843844,309.62792792792794,310.33741741741744,311.0469069069069,311.7563963963964,312.4658858858859,313.1753753753754,313.8848648648649,314.5943543543544,315.3038438438438,316.0133333333333,316.7228228228228,317.4323123123123,318.1418018018018,318.8512912912913,319.56078078078076,320.27027027027026,320.97975975975976,321.68924924924926,322.39873873873876,323.10822822822826,323.8177177177177,324.5272072072072,325.2366966966967,325.9461861861862,326.6556756756757,327.36516516516514,328.07465465465464,328.78414414414414,329.49363363363364,330.20312312312313,330.91261261261263,331.6221021021021,332.3315915915916,333.0410810810811,333.7505705705706,334.4600600600601,335.1695495495496,335.879039039039,336.5885285285285,337.298018018018,338.0075075075075,338.716996996997,339.4264864864865,340.13597597597595,340.84546546546545,341.55495495495495,342.26444444444445,342.97393393393395,343.68342342342345,344.3929129129129,345.1024024024024,345.8118918918919,346.5213813813814,347.2308708708709,347.9403603603604,348.64984984984983,349.35933933933933,350.0688288288288,350.7783183183183,351.4878078078078,352.1972972972973,352.90678678678677,353.61627627627627,354.32576576576577,355.03525525525527,355.74474474474476,356.4542342342342,357.1637237237237,357.8732132132132,358.5827027027027,359.2921921921922,360.0016816816817,360.71117117117115,361.42066066066064,362.13015015015014,362.83963963963964,363.54912912912914,364.25861861861864,364.9681081081081,365.6775975975976,366.3870870870871,367.0965765765766,367.8060660660661,368.5155555555556,369.225045045045,369.9345345345345,370.644024024024,371.3535135135135,372.063003003003,372.7724924924925,373.48198198198196,374.19147147147146,374.90096096096096,375.61045045045046,376.31993993993996,377.02942942942946,377.7389189189189,378.4484084084084,379.1578978978979,379.8673873873874,380.5768768768769,381.2863663663664,381.99585585585584,382.70534534534534,383.41483483483483,384.12432432432433,384.83381381381383,385.5433033033033,386.2527927927928,386.9622822822823,387.6717717717718,388.3812612612613,389.0907507507508,389.8002402402402,390.5097297297297,391.2192192192192,391.9287087087087,392.6381981981982,393.3476876876877,394.05717717717715,394.76666666666665,395.47615615615615,396.18564564564565,396.89513513513515,397.60462462462465,398.3141141141141,399.0236036036036,399.7330930930931,400.4425825825826,401.1520720720721,401.8615615615616,402.57105105105103,403.2805405405405,403.99003003003,404.6995195195195,405.409009009009,406.1184984984985,406.82798798798797,407.53747747747747,408.24696696696697,408.95645645645646,409.66594594594596,410.37543543543546,411.0849249249249,411.7944144144144,412.5039039039039,413.2133933933934,413.9228828828829,414.63237237237234,415.34186186186184,416.05135135135134,416.76084084084084,417.47033033033034,418.17981981981984,418.8893093093093,419.5987987987988,420.3082882882883,421.0177777777778,421.7272672672673,422.4367567567568,423.1462462462462,423.8557357357357,424.5652252252252,425.2747147147147,425.9842042042042,426.6936936936937,427.40318318318316,428.11267267267266,428.82216216216216,429.53165165165166,430.24114114114116,430.95063063063066,431.6601201201201,432.3696096096096,433.0790990990991,433.7885885885886,434.4980780780781,435.2075675675676,435.91705705705704,436.62654654654654,437.33603603603603,438.04552552552553,438.75501501501503,439.46450450450453,440.173993993994,440.8834834834835,441.592972972973,442.3024624624625,443.01195195195197,443.7214414414414,444.4309309309309,445.1404204204204,445.8499099099099,446.5593993993994,447.2688888888889,447.97837837837835,448.68786786786785,449.39735735735735,450.10684684684685,450.81633633633635,451.52582582582585,452.2353153153153,452.9448048048048,453.6542942942943,454.3637837837838,455.0732732732733,455.7827627627628,456.49225225225223,457.2017417417417,457.9112312312312,458.6207207207207,459.3302102102102,460.0396996996997,460.74918918918917,461.45867867867867,462.16816816816817,462.87765765765766,463.58714714714716,464.29663663663666,465.0061261261261,465.7156156156156,466.4251051051051,467.1345945945946,467.8440840840841,468.5535735735736,469.26306306306304,469.97255255255254,470.68204204204204,471.39153153153154,472.10102102102104,472.8105105105105,473.52,474.2294894894895,474.938978978979,475.6484684684685,476.357957957958,477.0674474474474,477.7769369369369,478.4864264264264,479.1959159159159,479.9054054054054,480.6148948948949,481.32438438438436,482.03387387387386,482.74336336336336,483.45285285285286,484.16234234234236,484.87183183183186,485.5813213213213,486.2908108108108,487.0003003003003,487.7097897897898,488.4192792792793,489.1287687687688,489.83825825825824,490.54774774774774,491.25723723723723,491.96672672672673,492.67621621621623,493.38570570570573,494.0951951951952,494.8046846846847,495.5141741741742,496.2236636636637,496.93315315315317,497.64264264264267,498.3521321321321,499.0616216216216,499.7711111111111,500.4806006006006,501.1900900900901,501.89957957957955,502.60906906906905,503.31855855855855,504.02804804804805,504.73753753753755,505.44702702702705,506.1565165165165,506.866006006006,507.5754954954955,508.284984984985,508.9944744744745,509.703963963964,510.4134534534534,511.1229429429429,511.8324324324324,512.5419219219219,513.2514114114114,513.9609009009009,514.6703903903904,515.3798798798799,516.0893693693694,516.7988588588588,517.5083483483484,518.2178378378378,518.9273273273274,519.6368168168168,520.3463063063064,521.0557957957958,521.7652852852852,522.4747747747748,523.1842642642642,523.8937537537538,524.6032432432432,525.3127327327327,526.0222222222222,526.7317117117117,527.4412012012012,528.1506906906907,528.8601801801802,529.5696696696697,530.2791591591591,530.9886486486487,531.6981381381381,532.4076276276277,533.1171171171171,533.8266066066066,534.5360960960961,535.2455855855856,535.9550750750751,536.6645645645646,537.374054054054,538.0835435435436,538.793033033033,539.5025225225226,540.212012012012,540.9215015015016,541.630990990991,542.3404804804804,543.04996996997,543.7594594594594,544.468948948949,545.1784384384384,545.8879279279279,546.5974174174174,547.3069069069069,548.0163963963964,548.7258858858859,549.4353753753754,550.1448648648649,550.8543543543543,551.5638438438439,552.2733333333333,552.9828228228229,553.6923123123123,554.4018018018018,555.1112912912913,555.8207807807808,556.5302702702703,557.2397597597597,557.9492492492493,558.6587387387387,559.3682282282282,560.0777177177177,560.7872072072072,561.4966966966967,562.2061861861862,562.9156756756756,563.6251651651652,564.3346546546546,565.0441441441442,565.7536336336336,566.4631231231231,567.1726126126126,567.8821021021021,568.5915915915916,569.3010810810811,570.0105705705706,570.7200600600601,571.4295495495495,572.1390390390391,572.8485285285285,573.5580180180181,574.2675075075075,574.976996996997,575.6864864864865,576.395975975976,577.1054654654655,577.8149549549549,578.5244444444445,579.2339339339339,579.9434234234234,580.6529129129129,581.3624024024024,582.0718918918919,582.7813813813814,583.4908708708708,584.2003603603604,584.9098498498498,585.6193393393394,586.3288288288288,587.0383183183184,587.7478078078078,588.4572972972973,589.1667867867868,589.8762762762763,590.5857657657658,591.2952552552553,592.0047447447447,592.7142342342343,593.4237237237237,594.1332132132133,594.8427027027027,595.5521921921921,596.2616816816817,596.9711711711711,597.6806606606607,598.3901501501501,599.0996396396397,599.8091291291291,600.5186186186186,601.2281081081081,601.9375975975976,602.6470870870871,603.3565765765766,604.066066066066,604.7755555555556,605.485045045045,606.1945345345346,606.904024024024,607.6135135135136,608.323003003003,609.0324924924925,609.741981981982,610.4514714714715,611.160960960961,611.8704504504504,612.5799399399399,613.2894294294294,613.9989189189189,614.7084084084084,615.4178978978979,616.1273873873874,616.8368768768769,617.5463663663663,618.2558558558559,618.9653453453453,619.6748348348349,620.3843243243243,621.0938138138138,621.8033033033033,622.5127927927928,623.2222822822823,623.9317717717718,624.6412612612612,625.3507507507508,626.0602402402402,626.7697297297298,627.4792192192192,628.1887087087088,628.8981981981982,629.6076876876876,630.3171771771772,631.0266666666666,631.7361561561562,632.4456456456456,633.1551351351351,633.8646246246246,634.5741141141141,635.2836036036036,635.9930930930931,636.7025825825826,637.4120720720721,638.1215615615615,638.8310510510511,639.5405405405405,640.2500300300301,640.9595195195195,641.669009009009,642.3784984984985,643.087987987988,643.7974774774775,644.506966966967,645.2164564564565,645.925945945946,646.6354354354354,647.344924924925,648.0544144144144,648.763903903904,649.4733933933934,650.1828828828828,650.8923723723724,651.6018618618618,652.3113513513514,653.0208408408408,653.7303303303303,654.4398198198198,655.1493093093093,655.8587987987988,656.5682882882883,657.2777777777778,657.9872672672673,658.6967567567567,659.4062462462463,660.1157357357357,660.8252252252253,661.5347147147147,662.2442042042042,662.9536936936937,663.6631831831832,664.3726726726727,665.0821621621621,665.7916516516517,666.5011411411411,667.2106306306306,667.9201201201201,668.6296096096096,669.3390990990991,670.0485885885886,670.758078078078,671.4675675675676,672.177057057057,672.8865465465466,673.596036036036,674.3055255255256,675.015015015015,675.7245045045045,676.433993993994,677.1434834834835,677.852972972973,678.5624624624625,679.2719519519519,679.9814414414415,680.6909309309309,681.4004204204205,682.1099099099099,682.8193993993993,683.5288888888889,684.2383783783783,684.9478678678679,685.6573573573573,686.3668468468469,687.0763363363363,687.7858258258258,688.4953153153153,689.2048048048048,689.9142942942943,690.6237837837838,691.3332732732732,692.0427627627628,692.7522522522522,693.4617417417418,694.1712312312312,694.8807207207208,695.5902102102102,696.2996996996997,697.0091891891892,697.7186786786787,698.4281681681682,699.1376576576577,699.8471471471471,700.5566366366367,701.2661261261261,701.9756156156157,702.6851051051051,703.3945945945947,704.1040840840841,704.8135735735735,705.5230630630631,706.2325525525525,706.9420420420421,707.6515315315315,708.361021021021,709.0705105105105,709.78]}
},{}],70:[function(require,module,exports){
module.exports={"expected":[0.36787944117144233,0.3682478732299681,0.36861667427399997,0.3689858446730776,0.36935538479711094,0.3697252950163802,0.3700955757015367,0.3704662272236028,0.3708372499539725,0.3712086442644116,0.3715804105270584,0.37195254911442394,0.3723250603993921,0.37269794475522044,0.3730712025555402,0.3734448341743568,0.37381883998605037,0.37419322036537583,0.3745679756874635,0.3749431063278193,0.37531861266232536,0.3756944950672402,0.37607075391919903,0.37644738959521457,0.3768244024726768,0.37720179292935374,0.377579561343392,0.37795770809331647,0.37833623355803153,0.3787151381168207,0.3790944221493477,0.3794740860356562,0.3798541301561706,0.3802345548916962,0.38061536062341994,0.3809965477329102,0.3813781166021177,0.3817600676133756,0.3821424011494,0.3825251175932903,0.3829082173285295,0.3832917007389847,0.38367556820890764,0.38405982012293455,0.3844444568660871,0.3848294788237724,0.3852148863817837,0.38560067992630065,0.3859868598438895,0.38637342652150364,0.3867603803464842,0.38714772170656,0.38753545098984843,0.38792356858485527,0.3883120748804756,0.38870097026599393,0.3890902551310847,0.3894799298658125,0.38986999486063256,0.3902604505063913,0.39065129719432645,0.3910425353160676,0.3914341652636365,0.39182618742944764,0.39221860220630844,0.3926114099874196,0.3930046111663759,0.3933982061371661,0.3937921952941735,0.3941865790321764,0.3945813577463487,0.3949765318322598,0.39537210168587533,0.39576806770355755,0.39616443028206555,0.3965611898185559,0.396958346710583,0.3973559013560992,0.3977538541534554,0.39815220550140157,0.39855095579908706,0.3989501054460608,0.39934965484227214,0.3997496043880706,0.4001499544842069,0.40055070553183325,0.4009518579325032,0.40135341208817293,0.40175536840120074,0.4021577272743482,0.40256048911078013,0.40296365431406506,0.4033672232881759,0.40377119643748993,0.4041755741667895,0.4045803568812623,0.404985544986502,0.4053911388885082,0.40579713899368725,0.40620354570885253,0.40661035944122487,0.40701758059843285,0.40742520958851336,0.4078332468199118,0.4082416927014828,0.4086505476424905,0.40905981205260866,0.40946948634192154,0.40987957092092403,0.41029006620052216,0.4107009725920335,0.41111229050718745,0.41152402035812585,0.41193616255740334,0.41234871751798763,0.41276168565326005,0.41317506737701604,0.4135888631034652,0.41400307324723223,0.414417698223357,0.41483273844729496,0.4152481943349177,0.41566406630251335,0.41608035476678684,0.41649706014486054,0.41691418285427445,0.41733172331298696,0.4177496819393748,0.41816805915223376,0.4185868553707792,0.41900607101464615,0.4194257065038901,0.4198457622589869,0.4202662387008339,0.4206871362507497,0.4211084553304749,0.4215301963621727,0.42195235976842876,0.42237494597225217,0.4227979553970756,0.4232213884667557,0.423645245605574,0.4240695272382363,0.4244942337898744,0.4249193656860454,0.42534492335273283,0.4257709072163468,0.4261973177037245,0.4266241552421304,0.42705142025925713,0.42747911318322557,0.4279072344425854,0.4283357844663153,0.4287647636838238,0.42919417252494946,0.42962401141996115,0.4300542807995589,0.43048498109487376,0.43091611273746894,0.43134767615933955,0.43177967179291366,0.432212100071052,0.4326449614270491,0.4330782562946335,0.4335119851079679,0.4339461483016499,0.43438074631071244,0.4348157795706239,0.43525124851728914,0.4356871535870493,0.4361234952166826,0.43656027384340473,0.4369974899048692,0.4374351438391678,0.4378732360848312,0.43831176708082925,0.4387507372665712,0.4391901470819066,0.4396299969671255,0.44007028736295883,0.44051101871057885,0.44095219145159975,0.44139380602807804,0.4418358628825128,0.4422783624578464,0.4427213051974649,0.4431646915451981,0.4436085219453206,0.4440527968425518,0.4444975166820565,0.4449426819094454,0.4453882929707754,0.4458343503125502,0.4462808543817206,0.44672780562568504,0.4471752044922901,0.4476230514298307,0.4480713468870511,0.4485200913131444,0.4489692851577542,0.449418928870974,0.4498690229033481,0.4503195677058723,0.4507705637299937,0.4512220114276118,0.45167391125107864,0.45212626365319913,0.45257906908723183,0.45303232800688914,0.4534860408663379,0.4539402081202,0.4543948302235521,0.4548499076319271,0.455305440801314,0.4557614301881584,0.45621787624936316,0.45667477944228857,0.45713214022475296,0.45758995905503336,0.4580482363918657,0.4585069726944451,0.45896616842242693,0.4594258240359266,0.4598859399955205,0.46034651676224636,0.4608075547976034,0.46126905456355305,0.4617310165225197,0.4621934411373905,0.4626563288715166,0.46311968018871263,0.4635834955532582,0.46404777542989767,0.46451252028384094,0.46497773058076386,0.4654434067868085,0.46590954936858386,0.4663761587931663,0.4668432355280998,0.46731078004139687,0.46777879280153833,0.4682472742774746,0.4687162249386254,0.46918564525488093,0.4696555356966017,0.4701258967346193,0.47059672884023707,0.47106803248523016,0.4715398081418463,0.47201205628280624,0.4724847773813039,0.4729579719110074,0.4734316403460591,0.47390578316107623,0.4743804008311514,0.4748554938318529,0.47533106263922537,0.4758071077297903,0.4762836295805463,0.47676062866896984,0.4772381054730153,0.47771606047111603,0.47819449414218435,0.4786734069656123,0.4791527994212721,0.4796326719895163,0.4801130251511788,0.48059385938757493,0.4810751751805021,0.4815569730122402,0.48203925336555214,0.48252201672368433,0.48300526357036716,0.48348899438981546,0.483973209666729,0.48445790988629295,0.48494309553417847,0.48542876709654303,0.4859149250600311,0.48640156991177447,0.48688870213939267,0.48737632223099375,0.4878644306751746,0.48835302796102137,0.48884211457811,0.4893316910165068,0.48982175776676895,0.49031231531994474,0.4908033641675745,0.49129490480169047,0.4917869377148181,0.49227946339997575,0.4927724823506757,0.49326599506092456,0.49376000202522347,0.494254503738569,0.49474950069645335,0.495244993394865,0.49574098233028924,0.49623746799970847,0.4967344509006028,0.4972319315309507,0.49772991038922926,0.49822838797441493,0.4987273647859837,0.4992268413239118,0.4997268180886764,0.5002272955812558,0.5007282743031298,0.5012297547562808,0.5017317374431937,0.5022342228668567,0.5027372115307617,0.5032407039389051,0.5037447005957875,0.5042492020064153,0.5047542086763006,0.5052597211114613,0.5057657398184229,0.5062722653042173,0.5067792980763848,0.5072868386429736,0.5077948875125411,0.5083034451941539,0.5088125121973882,0.5093220890323308,0.5098321762095791,0.5103427742402422,0.510853883635941,0.5113655049088084,0.5118776385714907,0.5123902851371473,0.5129034451194519,0.513417119032592,0.5139313073912707,0.5144460107107063,0.5149612295066329,0.5154769642953017,0.5159932155934803,0.516509983918454,0.5170272697880266,0.5175450737205198,0.5180633962347749,0.5185822378501528,0.519101599086534,0.5196214804643204,0.5201418825044346,0.5206628057283212,0.5211842506579467,0.5217062178158006,0.5222287077248957,0.5227517209087683,0.5232752578914794,0.5237993191976146,0.5243239053522849,0.5248490168811274,0.5253746543103053,0.5259008181665091,0.5264275089769564,0.5269547272693932,0.5274824735720938,0.5280107484138615,0.5285395523240295,0.5290688858324609,0.5295987494695495,0.5301291437662203,0.53066006925393,0.5311915264646676,0.5317235159309549,0.5322560381858469,0.5327890937629326,0.5333226831963354,0.5338568070207134,0.5343914657712604,0.5349266599837061,0.535462390194317,0.535998656939896,0.5365354607577844,0.537072802185861,0.5376106817625437,0.5381491000267894,0.5386880575180951,0.5392275547764978,0.5397675923425751,0.5403081707574467,0.5408492905627738,0.5413909523007597,0.5419331565141517,0.5424759037462398,0.5430191945408585,0.5435630294423867,0.5441074089957487,0.5446523337464146,0.5451978042404007,0.5457438210242699,0.5462903846451329,0.546837495650648,0.5473851545890224,0.5479333620090117,0.5484821184599216,0.5490314244916077,0.5495812806544764,0.5501316874994853,0.5506826455781436,0.5512341554425131,0.5517862176452084,0.5523388327393977,0.5528920012788026,0.5534457238177,0.5540000009109215,0.5545548331138546,0.5551102209824427,0.5556661650731861,0.5562226659431427,0.556779724149928,0.5573373402517161,0.5578955148072401,0.5584542483757924,0.5590135415172259,0.5595733947919541,0.5601338087609516,0.5606947839857551,0.5612563210284633,0.5618184204517381,0.5623810828188051,0.5629443086934534,0.5635080986400371,0.5640724532234758,0.5646373730092541,0.5652028585634237,0.5657689104526026,0.5663355292439768,0.5669027155052999,0.5674704698048944,0.5680387927116518,0.5686076847950333,0.5691771466250708,0.5697471787723666,0.5703177818080947,0.5708889563040012,0.5714607028324045,0.5720330219661967,0.572605914278843,0.5731793803443834,0.5737534207374327,0.5743280360331813,0.5749032268073953,0.5754789936364176,0.5760553370971685,0.5766322577671457,0.5772097562244257,0.5777878330476638,0.5783664888160945,0.5789457241095328,0.5795255395083743,0.5801059355935957,0.5806869129467559,0.5812684721499957,0.5818506137860393,0.5824333384381947,0.5830166466903534,0.5836005391269923,0.5841850163331734,0.5847700788945446,0.5853557273973404,0.5859419624283825,0.5865287845750802,0.587116194425431,0.5877041925680213,0.5882927795920274,0.588881956087215,0.5894717226439409,0.590062079853153,0.590653028306391,0.5912445685957871,0.5918367013140665,0.592429427054548,0.5930227464111447,0.5936166599783643,0.5942111683513102,0.5948062721256815,0.5954019718977739,0.5959982682644807,0.5965951618232924,0.5971926531722984,0.597790742910187,0.5983894316362455,0.5989887199503622,0.5995886084530259,0.6001890977453264,0.6007901884289562,0.6013918811062098,0.6019941763799851,0.602597074853784,0.6032005771317124,0.6038046838184817,0.6044093955194085,0.6050147128404159,0.6056206363880334,0.6062271667693988,0.606834304592257,0.6074420504649621,0.6080504049964774,0.6086593687963759,0.6092689424748414,0.6098791266426684,0.6104899219112634,0.6111013288926451,0.6117133481994453,0.6123259804449092,0.6129392262428961,0.6135530862078803,0.6141675609549513,0.6147826510998147,0.6153983572587928,0.6160146800488249,0.6166316200874686,0.6172491779928995,0.6178673543839127,0.6184861498799227,0.6191055651009646,0.6197256006676943,0.6203462572013894,0.6209675353239497,0.6215894356578976,0.6222119588263794,0.622835105453165,0.6234588761626495,0.624083271579853,0.6247082923304215,0.6253339390406277,0.6259602123373718,0.6265871128481814,0.6272146412012127,0.6278427980252512,0.6284715839497119,0.6291009996046402,0.6297310456207126,0.6303617226292371,0.6309930312621539,0.6316249721520364,0.6322575459320913,0.6328907532361594,0.6335245946987165,0.6341590709548734,0.6347941826403776,0.6354299303916128,0.6360663148456003,0.6367033366399992,0.6373409964131074,0.6379792948038618,0.6386182324518395,0.639257809997258,0.639898028080976,0.6405388873444938,0.6411803884299545,0.6418225319801443,0.6424653186384928,0.6431087490490742,0.6437528238566079,0.644397543706459,0.6450429092446384,0.6456889211178045,0.6463355799732634,0.646982886458969,0.6476308412235245,0.6482794449161826,0.6489286981868462,0.6495786016860691,0.6502291560650564,0.650880361975666,0.6515322200704079,0.652184731002446,0.6528378954255982,0.6534917139943376,0.654146187363792,0.654801316189746,0.6554571011286406,0.6561135428375745,0.6567706419743041,0.6574283991972448,0.6580868151654715,0.6587458905387189,0.6594056259773826,0.6600660221425196,0.6607270796958489,0.661388799299752,0.6620511816172744,0.6627142273121248,0.6633779370486772,0.6640423114919709,0.664707351307711,0.6653730571622696,0.6660394297226858,0.6667064696566671,0.6673741776325897,0.6680425543194988,0.6687116003871101,0.6693813165058097,0.6700517033466553,0.6707227615813766,0.6713944918823759,0.6720668949227291,0.6727399713761861,0.6734137219171717,0.674088147220786,0.6747632479628051,0.6754390248196821,0.6761154784685475,0.6767926095872099,0.6774704188541569,0.6781489069485555,0.6788280745502526,0.6795079223397764,0.6801884509983366,0.6808696612078248,0.6815515536508159,0.682234129010568,0.6829173879710241,0.6836013312168114,0.6842859594332434,0.6849712733063197,0.6856572735227267,0.6863439607698388,0.687031335735719,0.6877193991091187,0.6884081515794799,0.6890975938369346,0.6897877265723059,0.6904785504771092,0.6911700662435519,0.6918622745645352,0.6925551761336538,0.6932487716451973,0.6939430617941504,0.6946380472761943,0.6953337287877062,0.6960301070257614,0.6967271826881329,0.6974249564732928,0.6981234290804125,0.6988226012093637,0.699522473560719,0.7002230468357526,0.7009243217364414,0.7016262989654647,0.702328979226206,0.703032363222753,0.7037364516598987,0.7044412452431419,0.7051467446786879,0.7058529506734493,0.7065598639350468,0.7072674851718095,0.7079758150927762,0.7086848544076956,0.7093946038270273,0.7101050640619424,0.7108162358243242,0.7115281198267692,0.7122407167825872,0.7129540274058026,0.7136680524111547,0.714382792514099,0.7150982484308072,0.7158144208781683,0.7165313105737892,0.7172489182359958,0.7179672445838331,0.7186862903370663,0.7194060562161815,0.7201265429423864,0.7208477512376108,0.7215696818245076,0.7222923354264537,0.7230157127675498,0.7237398145726228,0.7244646415672247,0.7251901944776342,0.7259164740308579,0.7266434809546298,0.7273712159774133,0.7280996798284012,0.7288288732375163,0.7295587969354127,0.7302894516534764,0.7310208381238256,0.7317529570793115,0.7324858092535201,0.7332193953807711,0.7339537161961203,0.7346887724353592,0.7354245648350166,0.7361610941323589,0.7368983610653903,0.7376363663728549,0.7383751107942362,0.7391145950697583,0.7398548199403869,0.7405957861478294,0.7413374944345363,0.7420799455437019,0.742823140219264,0.7435670792059063,0.7443117632490578,0.7450571930948943,0.7458033694903388,0.7465502931830622,0.7472979649214846,0.7480463854547752,0.7487955555328538,0.749545475906391,0.7502961473268094,0.7510475705462841,0.7517997463177435,0.7525526753948701,0.753306358532101,0.7540607964846291,0.7548159900084037,0.7555719398601308,0.7563286467972746,0.7570861115780578,0.7578443349614624,0.7586033177072307,0.7593630605758656,0.7601235643286318,0.7608848297275566,0.76164685753543,0.7624096485158065,0.7631732034330048,0.7639375230521095,0.764702608138971,0.7654684594602069,0.7662350777832028,0.7670024638761126,0.7677706185078593,0.7685395424481365,0.7693092364674081,0.7700797013369101,0.7708509378286506,0.771622946715411,0.7723957287707464,0.7731692847689869,0.7739436154852382,0.7747187216953818,0.7754946041760766,0.7762712637047593,0.7770487010596451,0.7778269170197286,0.7786059123647847,0.779385687875369,0.780166244332819,0.7809475825192549,0.7817297032175796,0.7825126072114807,0.7832962952854304,0.7840807682246865,0.7848660268152934,0.7856520718440826,0.7864389040986736,0.7872265243674748,0.788014933439684,0.7888041321052897,0.7895941211550713,0.7903849013806004,0.791176473574241,0.7919688385291512,0.7927619970392829,0.7935559498993833,0.7943506979049958,0.7951462418524603,0.7959425825389143,0.7967397207622936,0.7975376573213331,0.7983363930155679,0.7991359286453334,0.799936265011767,0.800737402916808,0.8015393431631992,0.802342086554487,0.803145633895023,0.803949985989964,0.8047551436452733,0.8055611076677214,0.8063678788648866,0.8071754580451562,0.8079838460177271,0.8087930435926066,0.809603051580613,0.8104138707933768,0.8112255020433415,0.812037946143764,0.8128512039087159,0.8136652761530839,0.8144801636925709,0.8152958673436969,0.8161123879237993,0.8169297262510342,0.8177478831443772,0.8185668594236242,0.8193866559093916,0.8202072734231184,0.8210287127870657,0.8218509748243181,0.822674060358785,0.8234979702152005,0.824322705219125,0.8251482661969451,0.825974653975876,0.8268018693839604,0.8276299132500707,0.8284587864039097,0.8292884896760107,0.8301190238977387,0.830950389901292,0.8317825885197015,0.8326156205868331,0.8334494869373874,0.834284188406901,0.8351197258317473,0.8359561000491376,0.8367933118971211,0.837631362214587,0.8384702518412641,0.8393099816177226,0.8401505523853742,0.8409919649864732,0.841834220264118,0.8426773190622507,0.8435212622256592,0.8443660505999768,0.8452116850316842,0.8460581663681098,0.8469054954574304,0.8477536731486726,0.8486027002917127,0.8494525777372788,0.8503033063369505,0.8511548869431607,0.8520073204091957,0.8528606075891965,0.8537147493381594,0.8545697465119371,0.8554255999672394,0.8562823105616343,0.8571398791535482,0.8579983066022676,0.8588575937679395,0.8597177415115721,0.8605787506950363,0.8614406221810659,0.8623033568332586,0.8631669555160776,0.864031419094851,0.8648967484357744,0.8657629444059101,0.8666300078731892,0.8674979397064122,0.8683667407752493,0.8692364119502419,0.8701069541028033,0.8709783681052191,0.8718506548306492,0.8727238151531274,0.873597849947563,0.8744727600897417,0.875348546456326,0.8762252099248568,0.8771027513737533,0.8779811716823149,0.8788604717307215,0.8797406524000344,0.8806217145721973,0.8815036591300374,0.8823864869572656,0.8832701989384782,0.8841547959591576,0.8850402789056724,0.8859266486652794,0.8868139061261238,0.8877020521772403,0.8885910877085541,0.8894810136108814,0.8903718307759309,0.8912635400963038,0.8921561424654959,0.8930496387778974,0.8939440299287945,0.8948393168143698,0.8957355003317033,0.8966325813787741,0.8975305608544599,0.8984294396585389,0.8993292186916906,0.9002298988554961,0.90113148105244,0.9020339661859103,0.9029373551601998,0.9038416488805072,0.9047468482529376,0.9056529541845035,0.9065599675831258,0.9074678893576348,0.908376720417771,0.9092864616741857,0.9101971140384426,0.9111086784230181,0.9120211557413027,0.9129345469076013,0.9138488528371348,0.9147640744460405,0.9156802126513732,0.9165972683711064,0.9175152425241326,0.9184341360302648,0.9193539498102372,0.920274684785706,0.9211963418792504,0.9221189220143736,0.923042426115504,0.9239668551079954,0.9248922099181285,0.9258184914731117,0.926745700701082,0.9276738385311059,0.9286029058931803,0.9295329037182336,0.9304638329381266,0.9313956944856532,0.9323284892945415,0.9332622182994548,0.9341968824359923,0.9351324826406906,0.936069019851024,0.9370064950054054,0.9379449090431881,0.9388842629046656,0.9398245575310735,0.94076579386459,0.9417079728483367,0.9426510954263799,0.9435951625437313,0.9445401751463491,0.9454861341811388,0.9464330405959543,0.9473808953395988,0.9483296993618255,0.9492794536133393,0.9502301590457966,0.9511818166118071,0.952134427264935,0.9530879919596988,0.9540425116515734,0.9549979872969904,0.9559544198533394,0.9569118102789688,0.9578701595331868,0.9588294685762621,0.9597897383694255,0.9607509698748703,0.9617131640557534,0.9626763218761963,0.9636404443012861,0.9646055322970767,0.9655715868305889,0.9665386088698125,0.9675065993837065,0.9684755593422004,0.9694454897161952,0.970416391477564,0.9713882655991534,0.9723611130547842,0.9733349348192526,0.9743097318683311,0.9752855051787692,0.976262255728295,0.9772399844956152,0.9782186924604175,0.9791983806033699,0.9801790499061231,0.9811607013513108,0.9821433359225509,0.983126954604446,0.9841115583825852,0.9850971482435446,0.9860837251748881,0.9870712901651689,0.9880598442039302,0.9890493882817063,0.9900399233900232,0.9910314505214004,0.9920239706693509,0.993017484828383,0.9940119939940012,0.9950074991627064,0.9960040013319981,0.9970015015003744,0.9980000006673336,0.9989994998333751,1.0],"x":[-1.0,-0.998998998998999,-0.997997997997998,-0.996996996996997,-0.995995995995996,-0.994994994994995,-0.993993993993994,-0.992992992992993,-0.991991991991992,-0.990990990990991,-0.98998998998999,-0.988988988988989,-0.987987987987988,-0.986986986986987,-0.985985985985986,-0.984984984984985,-0.983983983983984,-0.982982982982983,-0.9819819819819819,-0.980980980980981,-0.97997997997998,-0.978978978978979,-0.977977977977978,-0.9769769769769769,-0.975975975975976,-0.974974974974975,-0.973973973973974,-0.972972972972973,-0.9719719719719719,-0.970970970970971,-0.96996996996997,-0.968968968968969,-0.9679679679679679,-0.9669669669669669,-0.965965965965966,-0.964964964964965,-0.963963963963964,-0.9629629629629629,-0.9619619619619619,-0.960960960960961,-0.95995995995996,-0.958958958958959,-0.9579579579579579,-0.9569569569569569,-0.955955955955956,-0.954954954954955,-0.953953953953954,-0.9529529529529529,-0.9519519519519519,-0.950950950950951,-0.94994994994995,-0.948948948948949,-0.9479479479479479,-0.9469469469469469,-0.9459459459459459,-0.944944944944945,-0.943943943943944,-0.9429429429429429,-0.9419419419419419,-0.9409409409409409,-0.93993993993994,-0.938938938938939,-0.9379379379379379,-0.9369369369369369,-0.9359359359359359,-0.934934934934935,-0.933933933933934,-0.9329329329329329,-0.9319319319319319,-0.9309309309309309,-0.92992992992993,-0.928928928928929,-0.9279279279279279,-0.9269269269269269,-0.9259259259259259,-0.924924924924925,-0.923923923923924,-0.9229229229229229,-0.9219219219219219,-0.9209209209209209,-0.91991991991992,-0.918918918918919,-0.9179179179179179,-0.9169169169169169,-0.9159159159159159,-0.914914914914915,-0.913913913913914,-0.9129129129129129,-0.9119119119119119,-0.9109109109109109,-0.9099099099099099,-0.908908908908909,-0.9079079079079079,-0.9069069069069069,-0.9059059059059059,-0.9049049049049049,-0.9039039039039038,-0.9029029029029029,-0.9019019019019019,-0.9009009009009009,-0.8998998998998999,-0.8988988988988988,-0.8978978978978979,-0.8968968968968969,-0.8958958958958959,-0.8948948948948949,-0.8938938938938938,-0.8928928928928929,-0.8918918918918919,-0.8908908908908909,-0.8898898898898899,-0.8888888888888888,-0.8878878878878879,-0.8868868868868869,-0.8858858858858859,-0.8848848848848849,-0.8838838838838838,-0.8828828828828829,-0.8818818818818819,-0.8808808808808809,-0.8798798798798799,-0.8788788788788788,-0.8778778778778779,-0.8768768768768769,-0.8758758758758759,-0.8748748748748749,-0.8738738738738738,-0.8728728728728729,-0.8718718718718719,-0.8708708708708709,-0.8698698698698699,-0.8688688688688688,-0.8678678678678678,-0.8668668668668669,-0.8658658658658659,-0.8648648648648649,-0.8638638638638638,-0.8628628628628628,-0.8618618618618619,-0.8608608608608609,-0.8598598598598599,-0.8588588588588588,-0.8578578578578578,-0.8568568568568569,-0.8558558558558559,-0.8548548548548549,-0.8538538538538538,-0.8528528528528528,-0.8518518518518519,-0.8508508508508509,-0.8498498498498499,-0.8488488488488488,-0.8478478478478478,-0.8468468468468469,-0.8458458458458459,-0.8448448448448449,-0.8438438438438438,-0.8428428428428428,-0.8418418418418419,-0.8408408408408409,-0.8398398398398398,-0.8388388388388388,-0.8378378378378378,-0.8368368368368369,-0.8358358358358359,-0.8348348348348348,-0.8338338338338338,-0.8328328328328328,-0.8318318318318318,-0.8308308308308309,-0.8298298298298298,-0.8288288288288288,-0.8278278278278278,-0.8268268268268268,-0.8258258258258259,-0.8248248248248248,-0.8238238238238238,-0.8228228228228228,-0.8218218218218218,-0.8208208208208209,-0.8198198198198198,-0.8188188188188188,-0.8178178178178178,-0.8168168168168168,-0.8158158158158159,-0.8148148148148148,-0.8138138138138138,-0.8128128128128128,-0.8118118118118118,-0.8108108108108109,-0.8098098098098098,-0.8088088088088088,-0.8078078078078078,-0.8068068068068068,-0.8058058058058059,-0.8048048048048048,-0.8038038038038038,-0.8028028028028028,-0.8018018018018018,-0.8008008008008008,-0.7997997997997998,-0.7987987987987988,-0.7977977977977978,-0.7967967967967968,-0.7957957957957958,-0.7947947947947948,-0.7937937937937938,-0.7927927927927928,-0.7917917917917918,-0.7907907907907908,-0.7897897897897898,-0.7887887887887888,-0.7877877877877878,-0.7867867867867868,-0.7857857857857858,-0.7847847847847848,-0.7837837837837838,-0.7827827827827828,-0.7817817817817818,-0.7807807807807807,-0.7797797797797797,-0.7787787787787788,-0.7777777777777778,-0.7767767767767768,-0.7757757757757757,-0.7747747747747747,-0.7737737737737738,-0.7727727727727728,-0.7717717717717718,-0.7707707707707707,-0.7697697697697697,-0.7687687687687688,-0.7677677677677678,-0.7667667667667668,-0.7657657657657657,-0.7647647647647647,-0.7637637637637638,-0.7627627627627628,-0.7617617617617618,-0.7607607607607607,-0.7597597597597597,-0.7587587587587588,-0.7577577577577578,-0.7567567567567568,-0.7557557557557557,-0.7547547547547547,-0.7537537537537538,-0.7527527527527528,-0.7517517517517518,-0.7507507507507507,-0.7497497497497497,-0.7487487487487487,-0.7477477477477478,-0.7467467467467468,-0.7457457457457457,-0.7447447447447447,-0.7437437437437437,-0.7427427427427428,-0.7417417417417418,-0.7407407407407407,-0.7397397397397397,-0.7387387387387387,-0.7377377377377378,-0.7367367367367368,-0.7357357357357357,-0.7347347347347347,-0.7337337337337337,-0.7327327327327328,-0.7317317317317318,-0.7307307307307307,-0.7297297297297297,-0.7287287287287287,-0.7277277277277278,-0.7267267267267268,-0.7257257257257257,-0.7247247247247247,-0.7237237237237237,-0.7227227227227228,-0.7217217217217218,-0.7207207207207207,-0.7197197197197197,-0.7187187187187187,-0.7177177177177178,-0.7167167167167167,-0.7157157157157157,-0.7147147147147147,-0.7137137137137137,-0.7127127127127127,-0.7117117117117117,-0.7107107107107107,-0.7097097097097097,-0.7087087087087087,-0.7077077077077077,-0.7067067067067067,-0.7057057057057057,-0.7047047047047047,-0.7037037037037037,-0.7027027027027027,-0.7017017017017017,-0.7007007007007007,-0.6996996996996997,-0.6986986986986987,-0.6976976976976977,-0.6966966966966966,-0.6956956956956957,-0.6946946946946947,-0.6936936936936937,-0.6926926926926927,-0.6916916916916916,-0.6906906906906907,-0.6896896896896897,-0.6886886886886887,-0.6876876876876877,-0.6866866866866866,-0.6856856856856857,-0.6846846846846847,-0.6836836836836837,-0.6826826826826827,-0.6816816816816816,-0.6806806806806807,-0.6796796796796797,-0.6786786786786787,-0.6776776776776777,-0.6766766766766766,-0.6756756756756757,-0.6746746746746747,-0.6736736736736737,-0.6726726726726727,-0.6716716716716716,-0.6706706706706707,-0.6696696696696697,-0.6686686686686687,-0.6676676676676677,-0.6666666666666666,-0.6656656656656657,-0.6646646646646647,-0.6636636636636637,-0.6626626626626627,-0.6616616616616616,-0.6606606606606606,-0.6596596596596597,-0.6586586586586587,-0.6576576576576577,-0.6566566566566566,-0.6556556556556556,-0.6546546546546547,-0.6536536536536537,-0.6526526526526526,-0.6516516516516516,-0.6506506506506506,-0.6496496496496497,-0.6486486486486487,-0.6476476476476476,-0.6466466466466466,-0.6456456456456456,-0.6446446446446447,-0.6436436436436437,-0.6426426426426426,-0.6416416416416416,-0.6406406406406406,-0.6396396396396397,-0.6386386386386387,-0.6376376376376376,-0.6366366366366366,-0.6356356356356356,-0.6346346346346347,-0.6336336336336337,-0.6326326326326326,-0.6316316316316316,-0.6306306306306306,-0.6296296296296297,-0.6286286286286287,-0.6276276276276276,-0.6266266266266266,-0.6256256256256256,-0.6246246246246246,-0.6236236236236237,-0.6226226226226226,-0.6216216216216216,-0.6206206206206206,-0.6196196196196196,-0.6186186186186187,-0.6176176176176176,-0.6166166166166166,-0.6156156156156156,-0.6146146146146146,-0.6136136136136137,-0.6126126126126126,-0.6116116116116116,-0.6106106106106106,-0.6096096096096096,-0.6086086086086087,-0.6076076076076076,-0.6066066066066066,-0.6056056056056056,-0.6046046046046046,-0.6036036036036037,-0.6026026026026026,-0.6016016016016016,-0.6006006006006006,-0.5995995995995996,-0.5985985985985987,-0.5975975975975976,-0.5965965965965966,-0.5955955955955956,-0.5945945945945946,-0.5935935935935935,-0.5925925925925926,-0.5915915915915916,-0.5905905905905906,-0.5895895895895896,-0.5885885885885885,-0.5875875875875876,-0.5865865865865866,-0.5855855855855856,-0.5845845845845846,-0.5835835835835835,-0.5825825825825826,-0.5815815815815816,-0.5805805805805806,-0.5795795795795796,-0.5785785785785785,-0.5775775775775776,-0.5765765765765766,-0.5755755755755756,-0.5745745745745746,-0.5735735735735735,-0.5725725725725725,-0.5715715715715716,-0.5705705705705706,-0.5695695695695696,-0.5685685685685685,-0.5675675675675675,-0.5665665665665666,-0.5655655655655656,-0.5645645645645646,-0.5635635635635635,-0.5625625625625625,-0.5615615615615616,-0.5605605605605606,-0.5595595595595596,-0.5585585585585585,-0.5575575575575575,-0.5565565565565566,-0.5555555555555556,-0.5545545545545546,-0.5535535535535535,-0.5525525525525525,-0.5515515515515516,-0.5505505505505506,-0.5495495495495496,-0.5485485485485485,-0.5475475475475475,-0.5465465465465466,-0.5455455455455456,-0.5445445445445446,-0.5435435435435435,-0.5425425425425425,-0.5415415415415415,-0.5405405405405406,-0.5395395395395396,-0.5385385385385385,-0.5375375375375375,-0.5365365365365365,-0.5355355355355356,-0.5345345345345346,-0.5335335335335335,-0.5325325325325325,-0.5315315315315315,-0.5305305305305306,-0.5295295295295295,-0.5285285285285285,-0.5275275275275275,-0.5265265265265265,-0.5255255255255256,-0.5245245245245245,-0.5235235235235235,-0.5225225225225225,-0.5215215215215215,-0.5205205205205206,-0.5195195195195195,-0.5185185185185185,-0.5175175175175175,-0.5165165165165165,-0.5155155155155156,-0.5145145145145145,-0.5135135135135135,-0.5125125125125125,-0.5115115115115115,-0.5105105105105106,-0.5095095095095095,-0.5085085085085085,-0.5075075075075075,-0.5065065065065065,-0.5055055055055055,-0.5045045045045045,-0.5035035035035035,-0.5025025025025025,-0.5015015015015015,-0.5005005005005005,-0.4994994994994995,-0.4984984984984985,-0.4974974974974975,-0.4964964964964965,-0.4954954954954955,-0.4944944944944945,-0.4934934934934935,-0.4924924924924925,-0.4914914914914915,-0.4904904904904905,-0.4894894894894895,-0.48848848848848847,-0.4874874874874875,-0.48648648648648657,-0.48548548548548554,-0.48448448448448456,-0.4834834834834835,-0.48248248248248254,-0.48148148148148157,-0.48048048048048053,-0.47947947947947955,-0.4784784784784785,-0.47747747747747754,-0.4764764764764765,-0.47547547547547553,-0.47447447447447455,-0.4734734734734735,-0.47247247247247254,-0.4714714714714715,-0.4704704704704705,-0.46946946946946955,-0.4684684684684685,-0.46746746746746753,-0.4664664664664665,-0.4654654654654655,-0.46446446446446454,-0.4634634634634635,-0.46246246246246253,-0.4614614614614615,-0.4604604604604605,-0.45945945945945954,-0.4584584584584585,-0.45745745745745753,-0.4564564564564565,-0.4554554554554555,-0.45445445445445454,-0.4534534534534535,-0.4524524524524525,-0.4514514514514515,-0.4504504504504505,-0.44944944944944953,-0.4484484484484485,-0.4474474474474475,-0.4464464464464465,-0.4454454454454455,-0.4444444444444445,-0.4434434434434435,-0.4424424424424425,-0.4414414414414415,-0.4404404404404405,-0.43943943943943947,-0.4384384384384385,-0.4374374374374375,-0.4364364364364365,-0.4354354354354355,-0.43443443443443447,-0.4334334334334335,-0.4324324324324325,-0.4314314314314315,-0.4304304304304305,-0.42942942942942947,-0.4284284284284285,-0.4274274274274275,-0.4264264264264265,-0.4254254254254255,-0.42442442442442446,-0.4234234234234235,-0.4224224224224225,-0.42142142142142147,-0.4204204204204205,-0.41941941941941946,-0.4184184184184185,-0.41741741741741745,-0.41641641641641647,-0.4154154154154155,-0.41441441441441446,-0.4134134134134135,-0.41241241241241244,-0.41141141141141147,-0.4104104104104105,-0.40940940940940945,-0.4084084084084085,-0.40740740740740744,-0.40640640640640646,-0.4054054054054055,-0.40440440440440445,-0.40340340340340347,-0.40240240240240244,-0.40140140140140146,-0.4004004004004005,-0.39939939939939945,-0.39839839839839847,-0.39739739739739743,-0.39639639639639646,-0.3953953953953955,-0.39439439439439444,-0.39339339339339346,-0.39239239239239243,-0.39139139139139145,-0.3903903903903905,-0.38938938938938944,-0.38838838838838846,-0.3873873873873874,-0.38638638638638645,-0.3853853853853854,-0.38438438438438444,-0.38338338338338346,-0.3823823823823824,-0.38138138138138145,-0.3803803803803804,-0.37937937937937943,-0.37837837837837845,-0.3773773773773774,-0.37637637637637644,-0.3753753753753754,-0.37437437437437443,-0.37337337337337345,-0.3723723723723724,-0.37137137137137144,-0.3703703703703704,-0.3693693693693694,-0.36836836836836845,-0.3673673673673674,-0.36636636636636644,-0.3653653653653654,-0.3643643643643644,-0.36336336336336345,-0.3623623623623624,-0.36136136136136143,-0.3603603603603604,-0.3593593593593594,-0.35835835835835844,-0.3573573573573574,-0.35635635635635643,-0.3553553553553554,-0.3543543543543544,-0.3533533533533534,-0.3523523523523524,-0.3513513513513514,-0.3503503503503504,-0.3493493493493494,-0.3483483483483484,-0.3473473473473474,-0.3463463463463464,-0.3453453453453454,-0.3443443443443444,-0.3433433433433434,-0.3423423423423424,-0.3413413413413414,-0.3403403403403404,-0.3393393393393394,-0.3383383383383384,-0.3373373373373374,-0.3363363363363364,-0.3353353353353354,-0.3343343343343344,-0.33333333333333337,-0.3323323323323324,-0.3313313313313314,-0.3303303303303304,-0.3293293293293294,-0.32832832832832837,-0.3273273273273274,-0.3263263263263264,-0.3253253253253254,-0.3243243243243244,-0.32332332332332336,-0.3223223223223224,-0.32132132132132135,-0.3203203203203204,-0.3193193193193194,-0.31831831831831836,-0.3173173173173174,-0.31631631631631635,-0.31531531531531537,-0.3143143143143144,-0.31331331331331336,-0.3123123123123124,-0.31131131131131135,-0.31031031031031037,-0.3093093093093094,-0.30830830830830835,-0.3073073073073074,-0.30630630630630634,-0.30530530530530536,-0.3043043043043044,-0.30330330330330335,-0.3023023023023024,-0.30130130130130134,-0.30030030030030036,-0.2992992992992994,-0.29829829829829835,-0.29729729729729737,-0.29629629629629634,-0.29529529529529536,-0.2942942942942944,-0.29329329329329334,-0.29229229229229237,-0.29129129129129133,-0.29029029029029035,-0.2892892892892893,-0.28828828828828834,-0.28728728728728736,-0.28628628628628633,-0.28528528528528535,-0.2842842842842843,-0.28328328328328334,-0.28228228228228236,-0.2812812812812813,-0.28028028028028035,-0.2792792792792793,-0.27827827827827833,-0.27727727727727736,-0.2762762762762763,-0.27527527527527534,-0.2742742742742743,-0.27327327327327333,-0.27227227227227235,-0.2712712712712713,-0.27027027027027034,-0.2692692692692693,-0.26826826826826833,-0.26726726726726735,-0.2662662662662663,-0.26526526526526534,-0.2642642642642643,-0.2632632632632633,-0.26226226226226235,-0.2612612612612613,-0.26026026026026033,-0.2592592592592593,-0.2582582582582583,-0.2572572572572573,-0.2562562562562563,-0.2552552552552553,-0.2542542542542543,-0.25325325325325326,-0.2522522522522523,-0.2512512512512513,-0.2502502502502503,-0.24924924924924927,-0.2482482482482483,-0.24724724724724728,-0.24624624624624628,-0.24524524524524527,-0.24424424424424426,-0.24324324324324328,-0.24224224224224228,-0.24124124124124127,-0.24024024024024027,-0.23923923923923926,-0.23823823823823825,-0.23723723723723728,-0.23623623623623627,-0.23523523523523526,-0.23423423423423426,-0.23323323323323325,-0.23223223223223227,-0.2312312312312313,-0.2302302302302303,-0.22922922922922928,-0.22822822822822827,-0.2272272272272273,-0.2262262262262263,-0.22522522522522528,-0.22422422422422428,-0.22322322322322327,-0.22222222222222227,-0.2212212212212213,-0.22022022022022028,-0.21921921921921927,-0.21821821821821827,-0.21721721721721726,-0.21621621621621628,-0.21521521521521528,-0.21421421421421427,-0.21321321321321327,-0.21221221221221226,-0.21121121121121128,-0.21021021021021027,-0.20920920920920927,-0.20820820820820826,-0.20720720720720726,-0.20620620620620625,-0.20520520520520527,-0.20420420420420426,-0.20320320320320326,-0.20220220220220225,-0.20120120120120125,-0.20020020020020027,-0.19919919919919926,-0.19819819819819826,-0.19719719719719725,-0.19619619619619624,-0.19519519519519526,-0.19419419419419426,-0.19319319319319325,-0.19219219219219225,-0.19119119119119124,-0.19019019019019023,-0.18918918918918926,-0.18818818818818825,-0.18718718718718724,-0.18618618618618624,-0.18518518518518523,-0.18418418418418425,-0.18318318318318325,-0.18218218218218224,-0.18118118118118123,-0.18018018018018023,-0.17917917917917925,-0.17817817817817824,-0.17717717717717724,-0.17617617617617623,-0.17517517517517522,-0.17417417417417422,-0.17317317317317324,-0.17217217217217223,-0.17117117117117123,-0.17017017017017022,-0.16916916916916921,-0.16816816816816824,-0.16716716716716723,-0.16616616616616622,-0.16516516516516522,-0.1641641641641642,-0.16316316316316323,-0.16216216216216223,-0.16116116116116122,-0.16016016016016021,-0.1591591591591592,-0.1581581581581582,-0.15715715715715722,-0.15615615615615622,-0.1551551551551552,-0.1541541541541542,-0.1531531531531532,-0.15215215215215222,-0.15115115115115121,-0.1501501501501502,-0.1491491491491492,-0.1481481481481482,-0.14714714714714722,-0.1461461461461462,-0.1451451451451452,-0.1441441441441442,-0.1431431431431432,-0.14214214214214219,-0.1411411411411412,-0.1401401401401402,-0.1391391391391392,-0.1381381381381382,-0.13713713713713718,-0.1361361361361362,-0.1351351351351352,-0.1341341341341342,-0.13313313313313319,-0.13213213213213218,-0.1311311311311312,-0.1301301301301302,-0.1291291291291292,-0.12812812812812818,-0.12712712712712718,-0.12612612612612617,-0.12512512512512516,-0.12412412412412417,-0.12312312312312317,-0.12212212212212216,-0.12112112112112117,-0.12012012012012016,-0.11911911911911917,-0.11811811811811816,-0.11711711711711716,-0.11611611611611616,-0.11511511511511516,-0.11411411411411415,-0.11311311311311316,-0.11211211211211215,-0.11111111111111116,-0.11011011011011015,-0.10910910910910915,-0.10810810810810816,-0.10710710710710715,-0.10610610610610614,-0.10510510510510515,-0.10410410410410414,-0.10310310310310317,-0.10210210210210216,-0.10110110110110115,-0.10010010010010016,-0.09909909909909916,-0.09809809809809815,-0.09709709709709716,-0.09609609609609615,-0.09509509509509516,-0.09409409409409415,-0.09309309309309315,-0.09209209209209215,-0.09109109109109115,-0.09009009009009014,-0.08908908908908915,-0.08808808808808814,-0.08708708708708715,-0.08608608608608614,-0.08508508508508514,-0.08408408408408415,-0.08308308308308314,-0.08208208208208213,-0.08108108108108114,-0.08008008008008013,-0.07907907907907914,-0.07807807807807814,-0.07707707707707713,-0.07607607607607614,-0.07507507507507513,-0.07407407407407413,-0.07307307307307313,-0.07207207207207213,-0.07107107107107113,-0.07007007007007013,-0.06906906906906912,-0.06806806806806813,-0.06706706706706712,-0.06606606606606612,-0.06506506506506513,-0.06406406406406412,-0.06306306306306311,-0.062062062062062114,-0.061061061061061114,-0.06006006006006011,-0.05905905905905911,-0.05805805805805811,-0.0570570570570571,-0.056056056056056104,-0.055055055055055105,-0.054054054054054106,-0.0530530530530531,-0.0520520520520521,-0.0510510510510511,-0.0500500500500501,-0.049049049049049095,-0.048048048048048096,-0.0470470470470471,-0.0460460460460461,-0.04504504504504509,-0.04404404404404409,-0.04304304304304309,-0.042042042042042094,-0.04104104104104109,-0.04004004004004009,-0.039039039039039096,-0.0380380380380381,-0.03703703703703709,-0.03603603603603609,-0.03503503503503509,-0.03403403403403409,-0.033033033033033087,-0.03203203203203209,-0.031031031031031085,-0.030030030030030082,-0.029029029029029083,-0.02802802802802808,-0.02702702702702708,-0.026026026026026078,-0.02502502502502508,-0.024024024024024076,-0.023023023023023077,-0.022022022022022074,-0.021021021021021075,-0.020020020020020072,-0.019019019019019073,-0.01801801801801807,-0.01701701701701707,-0.016016016016016068,-0.01501501501501507,-0.01401401401401407,-0.013013013013013068,-0.012012012012012067,-0.011011011011011066,-0.010010010010010065,-0.009009009009009064,-0.008008008008008063,-0.0070070070070070625,-0.0060060060060060615,-0.0050050050050050605,-0.0040040040040040595,-0.003003003003003058,-0.0020020020020020575,-0.0010010010010010565,-5.551115123125783e-17]}
},{}],71:[function(require,module,exports){
module.exports={"expected":[1.0,1.0010015021697125,1.002004007346021,1.0030075165334387,1.004012030737485,1.005017550964686,1.0060240782225762,1.0070316135196993,1.0080401578656082,1.009049712270868,1.010060277747055,1.0110718553067592,1.012084445963584,1.013098050732149,1.0141126706280887,1.0151283066680556,1.0161449598697203,1.0171626312517723,1.0181813218339215,1.019201032636899,1.020221764682458,1.0212435189933753,1.0222662965934521,1.0232900985075144,1.024314925761415,1.025340779382034,1.0263676603972798,1.0273955698360904,1.0284245087284343,1.0294544781053114,1.030485478998754,1.0315175124418285,1.0325505794686356,1.0335846811143112,1.0346198184150288,1.035655992407999,1.0366932041314716,1.0377314546247354,1.038770744928121,1.0398110760830004,1.0408524491317885,1.0418948651179447,1.0429383250859727,1.0439828300814225,1.0450283811508918,1.0460749793420254,1.0471226257035184,1.0481713212851156,1.0492210671376132,1.0502718643128595,1.0513237138637568,1.0523766168442616,1.053430574309386,1.0544855873151981,1.055541656918825,1.0565987841784512,1.0576569701533214,1.0587162159037415,1.059776522491079,1.0608378909777643,1.0619003224272916,1.062963817904221,1.064028378474178,1.0650940052038556,1.066160699161015,1.067228461414487,1.0682972930341725,1.0693671950910442,1.0704381686571474,1.0715102148056006,1.0725833346105975,1.0736575291474075,1.0747327994923768,1.0758091467229296,1.076886571917569,1.0779650761558788,1.0790446605185233,1.0801253260872494,1.0812070739448871,1.0822899051753514,1.0833738208636425,1.084458822095847,1.08554490995914,1.0866320855417846,1.0877203499331338,1.0888097042236324,1.0899001495048164,1.0909916868693155,1.0920843174108534,1.0931780422242494,1.094272862405419,1.0953687790513755,1.0964657932602309,1.0975639061311966,1.098663118764585,1.0997634322618108,1.1008648477253915,1.1019673662589489,1.1030709889672095,1.1041757169560071,1.1052815513322825,1.1063884932040848,1.1074965436805737,1.108605703872019,1.1097159748898024,1.1108273578464192,1.1119398538554783,1.1130534640317045,1.1141681894909383,1.1152840313501382,1.116400990727381,1.1175190687418637,1.1186382665139039,1.119758585164941,1.1208800258175378,1.1220025895953816,1.1231262776232844,1.1242510910271852,1.1253770309341506,1.1265040984723758,1.1276322947711859,1.1287616209610372,1.1298920781735178,1.1310236675413496,1.1321563901983884,1.133290247279626,1.1344252399211907,1.1355613692603483,1.1366986364355043,1.1378370425862037,1.1389765888531331,1.1401172763781213,1.1412591063041406,1.1424020797753083,1.1435461979368875,1.1446914619352877,1.1458378729180674,1.1469854320339334,1.148134140432744,1.1492839992655086,1.1504350096843887,1.151587172842701,1.152740489894916,1.1538949619966612,1.1550505903047212,1.1562073759770393,1.1573653201727179,1.1585244240520207,1.1596846887763739,1.1608461155083658,1.1620087054117496,1.1631724596514443,1.1643373793935352,1.1655034658052752,1.1666707200550865,1.167839143312562,1.1690087367484645,1.1701795015347312,1.1713514388444712,1.1725245498519699,1.1736988357326879,1.1748742976632631,1.1760509368215124,1.1772287543864315,1.1784077515381974,1.179587929458169,1.1807692893288881,1.181951832334081,1.183135559658659,1.1843204724887213,1.1855065720115536,1.1866938594156318,1.187882335890621,1.1890720026273787,1.1902628608179544,1.1914549116555917,1.1926481563347293,1.1938425960510024,1.1950382320012425,1.1962350653834812,1.197433097396949,1.1986323292420775,1.1998327621205012,1.201034397235057,1.2022372357897873,1.2034412789899398,1.2046465280419698,1.2058529841535406,1.2070606485335247,1.2082695223920057,1.2094796069402787,1.2106909033908524,1.2119034129574495,1.2131171368550084,1.214332076299684,1.2155482325088498,1.2167656067010977,1.2179842000962404,1.2192040139153122,1.2204250493805706,1.2216473077154968,1.2228707901447973,1.2240954978944054,1.225321432191482,1.226548594264417,1.2277769853428306,1.2290066066575744,1.230237459440733,1.2314695449256248,1.2327028643468025,1.2339374189400567,1.2351732099424146,1.2364102385921427,1.2376485061287474,1.238888013792977,1.2401287628268214,1.2413707544735153,1.2426139899775381,1.2438584705846158,1.2451041975417216,1.246351172097078,1.2475993955001567,1.2488488690016823,1.2500995938536303,1.2513515713092316,1.252604802622971,1.2538592890505902,1.2551150318490887,1.2563720322767242,1.2576302915930153,1.258889811058742,1.2601505919359464,1.2614126354879347,1.2626759429792787,1.2639405156758161,1.265206354844653,1.266473461754164,1.2677418376739942,1.26901148387506,1.2702824016295509,1.2715545922109306,1.2728280568939376,1.274102796954588,1.2753788136701747,1.276656108319271,1.2779346821817292,1.279214536538685,1.2804956726725565,1.2817780918670456,1.2830617954071402,1.2843467845791157,1.285633060670535,1.2869206249702507,1.2882094787684062,1.289499623356437,1.290791060027072,1.2920837900743347,1.2933778147935444,1.2946731354813181,1.2959697534355712,1.2972676699555188,1.298566886341677,1.299867403895865,1.3011692239212054,1.3024723477221256,1.30377677660436,1.30508251187495,1.3063895548422466,1.307697906815911,1.3090075691069154,1.3103185430275461,1.3116308298914028,1.3129444310134009,1.3142593477097728,1.315575581298069,1.3168931330971598,1.3182120044272363,1.3195321966098112,1.3208537109677214,1.3221765488251283,1.3235007115075197,1.3248262003417106,1.3261530166558448,1.3274811617793965,1.328810637043171,1.3301414437793069,1.3314735833212763,1.3328070570038875,1.334141866163285,1.3354780121369518,1.3368154962637102,1.3381543198837238,1.3394944843384975,1.3408359909708805,1.3421788411250664,1.3435230361465953,1.3448685773823548,1.3462154661805816,1.3475637038908619,1.3489132918641344,1.3502642314526905,1.3516165240101756,1.352970170891591,1.3543251734532953,1.355681533053005,1.3570392510497968,1.3583983288041082,1.3597587676777394,1.3611205690338541,1.362483734236982,1.3638482646530183,1.3652141616492268,1.3665814265942409,1.367950060858064,1.3693200658120717,1.3706914428290133,1.3720641932830129,1.3734383185495707,1.3748138200055644,1.3761906990292507,1.3775689570002667,1.378948595299631,1.3803296153097455,1.3817120184143967,1.3830958059987566,1.3844809794493846,1.385867540154229,1.3872554895026274,1.38864482888531,1.3900355596943987,1.3914276833234103,1.3928212011672567,1.3942161146222474,1.3956124250860895,1.397010133957891,1.3984092426381602,1.3998097525288085,1.4012116650331508,1.402614981555908,1.4040197035032076,1.405425832282585,1.4068333693029862,1.408242315974767,1.4096526737096966,1.4110644439209579,1.412477628023149,1.4138922274322847,1.4153082435657978,1.4167256778425408,1.4181445316827874,1.4195648065082338,1.4209865037419993,1.422409624808629,1.423834171134095,1.4252601441457966,1.4266875452725634,1.4281163759446556,1.4295466375937662,1.4309783316530216,1.4324114595569837,1.4338460227416512,1.4352820226444605,1.4367194607042881,1.4381583383614518,1.439598657057711,1.4410404182362693,1.4424836233417766,1.443928273820328,1.4453743711194684,1.4468219166881915,1.4482709119769421,1.4497213584376185,1.4511732575235725,1.4526266106896113,1.4540814193919989,1.4555376850884585,1.4569954092381732,1.4584545933017863,1.4599152387414052,1.461377347020601,1.4628409196044108,1.464305957959339,1.4657724635533582,1.4672404378559118,1.4687098823379143,1.470180798471754,1.471653187731293,1.4731270515918704,1.474602391530302,1.4760792090248827,1.4775575055553887,1.4790372826030773,1.48051854165069,1.482001284182453,1.4834855116840782,1.484971225642767,1.486458427547209,1.4879471188875848,1.4894373011555682,1.4909289758443263,1.4924221444485217,1.4939168084643137,1.4954129693893607,1.4969106287228207,1.4984097879653522,1.499910448619118,1.5014126121877844,1.5029162801765241,1.5044214540920173,1.5059281354424525,1.5074363257375292,1.5089460264884589,1.510457239207966,1.511969965410291,1.5134842066111895,1.5149999643279362,1.516517240079325,1.5180360353856708,1.5195563517688115,1.5210781907521083,1.522601553860449,1.5241264426202479,1.5256528585594482,1.5271808032075236,1.528710278095479,1.5302412847558537,1.5317738247227202,1.533307899531689,1.5348435107199072,1.5363806598260625,1.5379193483903826,1.5394595779546383,1.5410013500621447,1.5425446662577618,1.5440895280878975,1.5456359371005077,1.5471838948450995,1.5487334028727313,1.5502844627360146,1.5518370759891162,1.5533912441877598,1.5549469688892261,1.5565042516523566,1.558063094037553,1.5596234976067809,1.5611854639235685,1.5627489945530117,1.5643140910617725,1.5658807550180829,1.5674489879917446,1.5690187915541318,1.570590167278193,1.5721631167384513,1.573737641511007,1.5753137431735384,1.5768914233053046,1.5784706834871458,1.580051525301486,1.581633950332333,1.5832179601652818,1.5848035563875151,1.5863907405878053,1.5879795143565159,1.589569879285603,1.5911618369686171,1.592755389000705,1.5943505369786104,1.5959472825006769,1.597545627166848,1.5991455725786703,1.600747120339294,1.6023502720534748,1.603955029327576,1.6055613937695687,1.6071693669890357,1.6087789505971708,1.6103901462067816,1.6120029554322914,1.6136173798897397,1.6152334211967851,1.616851080972706,1.6184703608384021,1.620091262416397,1.6217137873308394,1.6233379372075039,1.624963713673794,1.6265911183587423,1.6282201528930136,1.6298508189089056,1.6314831180403506,1.6331170519229175,1.6347526221938127,1.636389830491883,1.6380286784576161,1.6396691677331428,1.6413112999622381,1.642955076790324,1.6446004998644697,1.6462475708333941,1.647896291347468,1.6495466630587137,1.651198687620809,1.6528523666890875,1.6545077019205412,1.6561646949738207,1.6578233475092383,1.6594836611887689,1.6611456376760518,1.6628092786363928,1.664474585736765,1.666141560645812,1.667810205033847,1.669480520572857,1.6711525089365034,1.6728261718001238,1.6745015108407337,1.6761785277370276,1.6778572241693817,1.6795376018198551,1.6812196623721913,1.6829034075118208,1.6845888389258603,1.686275958303118,1.6879647673340925,1.689655267710976,1.6913474611276547,1.6930413492797118,1.6947369338644285,1.6964342165807855,1.6981331991294657,1.6998338832128548,1.7015362705350434,1.7032403628018287,1.7049461617207167,1.706653669000923,1.7083628863533753,1.7100738154907145,1.711786458127297,1.713500815979196,1.7152168907642034,1.7169346842018314,1.718654198013314,1.72037543392161,1.7220983936514025,1.723823078929103,1.7255494914828509,1.7272776330425172,1.7290075053397052,1.730739110107752,1.7324724490817314,1.7342075239984538,1.73594433659647,1.7376828886160716,1.739423181799293,1.7411652178899133,1.7429089986334578,1.7446545257772006,1.7464018010701652,1.748150826263127,1.749901603108614,1.7516541333609108,1.7534084187760577,1.755164461111854,1.7569222621278597,1.7586818235853974,1.760443147247552,1.7622062348791758,1.7639710882468882,1.7657377091190776,1.7675060992659037,1.7692762604592986,1.7710481944729695,1.7728219030823995,1.7745973880648502,1.7763746511993634,1.778153694266762,1.7799345190496525,1.7817171273324268,1.7835015209012641,1.7852877015441324,1.78707567105079,1.7888654312127876,1.790656983823471,1.792450330677981,1.7942454735732571,1.7960424143080376,1.7978411546828628,1.799641696500076,1.801444041563826,1.803248191680068,1.8050541486565657,1.8068619143028937,1.8086714904304388,1.8104828788524021,1.8122960813838003,1.8141110998414676,1.8159279360440583,1.8177465918120481,1.8195670689677355,1.821389369335244,1.8232134947405245,1.8250394470113562,1.826867227977349,1.8286968394699452,1.8305282833224208,1.8323615613698883,1.834196675449298,1.83603362739944,1.8378724190609457,1.8397130522762901,1.8415555288897931,1.8433998507476224,1.8452460196977938,1.8470940375901745,1.848943906276484,1.8507956276102968,1.8526492034470428,1.8545046356440111,1.8563619260603508,1.858221076557072,1.8600820889970493,1.861944965245023,1.8638097071676012,1.865676316633261,1.8675447955123505,1.8694151456770913,1.8712873690015803,1.873161467361791,1.8750374426355758,1.8769152967026677,1.8787950314446817,1.8806766487451188,1.8825601504893645,1.884445538564694,1.8863328148602718,1.8882219812671541,1.8901130396782921,1.8920059919885317,1.8939008400946176,1.8957975858951925,1.8976962312908023,1.8995967781838952,1.9014992284788252,1.9034035840818537,1.9053098469011502,1.9072180188467962,1.909128101830786,1.9110400977670288,1.9129540085713501,1.9148698361614946,1.9167875824571272,1.918707249379836,1.9206288388531332,1.922552352802457,1.9244777931551746,1.926405161840583,1.9283344607899118,1.9302656919363244,1.9321988572149202,1.9341339585627368,1.936070997918752,1.9380099772238852,1.9399508984209997,1.9418937634549038,1.9438385742723552,1.9457853328220598,1.9477340410546757,1.949684700922815,1.9516373143810446,1.953591883385889,1.9555484098958327,1.9575068958713213,1.9594673432747638,1.961429754070534,1.9633941302249744,1.9653604737063954,1.9673287864850797,1.9692990705332825,1.9712713278252345,1.9732455603371435,1.9752217700471966,1.9771999589355622,1.9791801289843918,1.9811622821778216,1.9831464205019753,1.9851325459449656,1.9871206604968963,1.9891107661498646,1.9911028648979623,1.9930969587372782,1.995093049665901,1.9970911396839197,1.999091230793427,2.0010933249985197,2.0030974243053032,2.0051035307218905,2.0071116462584064,2.0091217729269895,2.011133912741793,2.013148067718986,2.015164239876759,2.0171824312353226,2.019202643816911,2.0212248796457826,2.023249140748225,2.025275429152553,2.027303746889115,2.029334095990291,2.031366478490497,2.033400896426186,2.0354373518358524,2.03747584676003,2.039516383241297,2.041558963324277,2.0436035890556425,2.0456502624841137,2.047698985660465,2.049749760637522,2.051802589470168,2.053857474215344,2.055914416932051,2.057973419681352,2.0600344845263736,2.062097613532309,2.0641628087664206,2.06623007229804,2.0682994061985718,2.070370812541495,2.0724442934023646,2.0745198508588154,2.076597486990562,2.078677203879403,2.08075900360922,2.0828428882659833,2.0849288599377522,2.087016920714676,2.0891070726889986,2.0911993179550583,2.0932936586092916,2.095390096750234,2.0974886344785237,2.0995892738969015,2.101692017110214,2.1037968662254176,2.1059038233515768,2.108012890599869,2.110124070083587,2.112237363918138,2.11435277422105,2.11647030311197,2.118589952712669,2.120711725147042,2.1228356225411114,2.1249616470230293,2.1270898007230787,2.129220085773676,2.131352504309374,2.133487058466862,2.13562375038497,2.13776258220467,2.1399035560690782,2.142046674123457,2.1441919385152173,2.1463393513939204,2.1484889149112805,2.1506406312211674,2.1527945024796074,2.154950530844786,2.1571087184770503,2.1592690675389106,2.161431580195044,2.1635962586122948,2.1657631049596766,2.167932121408377,2.170103310131757,2.1722766733053542,2.1744522131068855,2.1766299317162483,2.1788098313155233,2.1809919140889766,2.183176182223062,2.1853626379064233,2.187551283329895,2.1897421206865073,2.191935152171486,2.194130379982255,2.1963278063184393,2.198527433381867,2.2007292633765716,2.2029332985087926,2.2051395409869814,2.207347993021799,2.2095586568261205,2.211771534615039,2.2139866286058645,2.2162039410181276,2.2184234740735826,2.2206452299962085,2.2228692110122115,2.225095419350027,2.227323857240324,2.2295545269160026,2.231787430612201,2.2340225705662964,2.236259949017905,2.238499568208888,2.2407414303833497,2.2429855377876433,2.2452318926703714,2.2474804972823885,2.2497313538768036,2.2519844647089813,2.2542398320365464,2.2564974581193833,2.2587573452196406,2.261019495601732,2.2632839115323398,2.2655505952804145,2.2678195491171813,2.2700907753161386,2.2723642761530622,2.2746400539060065,2.2769181108553087,2.2791984492835877,2.2814810714757505,2.283765979718992,2.286053176302796,2.2883426635189412,2.290634443661501,2.2929285190268462,2.2952248919136475,2.2975235646228773,2.2998245394578127,2.302127818724038,2.3044334047294455,2.3067412997842403,2.3090515062009396,2.3113640262943775,2.313678862381707,2.3159960167824,2.3183154918182534,2.3206372898133876,2.322961413094251,2.3252878639896233,2.3276166448306155,2.329947757950672,2.3322812056855766,2.3346169903734504,2.336955114354757,2.3392955799723043,2.3416383895712456,2.343983545499083,2.346331050105671,2.3486809057432154,2.3510331147662797,2.3533876795317843,2.35574460239901,2.358103885729601,2.3604655318875665,2.362829543239284,2.365195922153499,2.3675646710013307,2.369935792156273,2.372309287994197,2.3746851608933524,2.3770634132343713,2.3794440474002694,2.3818270657764504,2.3842124707507053,2.386600264713218,2.388990450056565,2.391383029175719,2.393778004468052,2.3961753783333366,2.3985751531737494,2.4009773313938716,2.403381915400693,2.4057889076036147,2.4081983104144498,2.410610126247428,2.4130243575191956,2.4154410066488206,2.4178600760577917,2.420281568170025,2.4227054854118624,2.425131830212077,2.427560605001873,2.429991812214891,2.4324254542872077,2.4348615336573407,2.437300052766248,2.4397410140573337,2.4421844199764484,2.444630272971893,2.4470785754944195,2.449529329997234,2.451982538936001,2.4544382047688424,2.4568963299563435,2.459356916961554,2.4618199682499884,2.464285486289632,2.466753473550942,2.4692239325068495,2.471696865632761,2.474172275406564,2.476650164308626,2.4791305348218,2.4816133894314247,2.4840987306253277,2.486586560893829,2.4890768827297425,2.4915696986283775,2.4940650110875437,2.4965628226075522,2.499063135691217,2.50156595284386,2.5040712765733124,2.5065791093899157,2.5090894538065256,2.5116023123385154,2.514117687503777,2.516635581822725,2.5191559978182965,2.5216789380159557,2.524204404943697,2.526732401132046,2.5292629291140623,2.531795991425344,2.534331590604026,2.5368697291907867,2.5394104097288492,2.541953634763983,2.544499406844508,2.547047728521295,2.5495986023477704,2.5521520308799177,2.5547080166762797,2.557266562297963,2.5598276703086382,2.562391343274542,2.564957583764484,2.5675263943498448,2.5700977776045804,2.5726717361052245,2.5752482724308923,2.57782738916328,2.5804090888866713,2.5829933741879376,2.5855802476565395,2.5881697118845333,2.59076176946657,2.593356422999899,2.5959536750843712,2.5985535283224417,2.6011559853191706,2.6037610486822285,2.606368721021896,2.608979004951071,2.6115919030852637,2.614207418042607,2.6168255524438555,2.619446308912387,2.622069690074208,2.624695698557955,2.6273243369948958,2.6299556080189346,2.632589514266613,2.635226058377114,2.6378652429922615,2.6405070707565272,2.643151544317031,2.645798666323544,2.6484484394284893,2.6511008662869484,2.6537559495566616,2.65641369189803,2.65907409597412,2.6617371644506647,2.6644028999960665,2.6670713052814006,2.669742382980418,2.6724161357695464,2.675092566327894,2.6777716773372537,2.6804534714821013,2.683137951449604,2.685825119929619,2.688514979614697,2.6912075332000858,2.693902783383732,2.6966007328662855,2.6993013843510996,2.7020047405442353,2.7047108041544634,2.707419577893269,2.7101310644748513,2.7128452666161285,2.715562187036739,2.718281828459045],"x":[5.551115123125783e-17,0.0010010010010010565,0.0020020020020020575,0.003003003003003058,0.0040040040040040595,0.0050050050050050605,0.0060060060060060615,0.0070070070070070625,0.008008008008008063,0.009009009009009064,0.010010010010010065,0.011011011011011066,0.012012012012012067,0.013013013013013068,0.01401401401401407,0.01501501501501507,0.016016016016016068,0.01701701701701707,0.01801801801801807,0.019019019019019073,0.020020020020020072,0.021021021021021075,0.022022022022022074,0.023023023023023077,0.024024024024024076,0.02502502502502508,0.026026026026026078,0.02702702702702708,0.02802802802802808,0.029029029029029083,0.030030030030030082,0.031031031031031085,0.03203203203203209,0.033033033033033087,0.03403403403403409,0.03503503503503509,0.03603603603603609,0.03703703703703709,0.0380380380380381,0.039039039039039096,0.04004004004004009,0.04104104104104109,0.042042042042042094,0.04304304304304309,0.04404404404404409,0.04504504504504509,0.0460460460460461,0.0470470470470471,0.048048048048048096,0.049049049049049095,0.0500500500500501,0.0510510510510511,0.0520520520520521,0.0530530530530531,0.054054054054054106,0.055055055055055105,0.056056056056056104,0.0570570570570571,0.05805805805805811,0.05905905905905911,0.06006006006006011,0.061061061061061114,0.062062062062062114,0.06306306306306311,0.06406406406406412,0.06506506506506513,0.06606606606606612,0.06706706706706712,0.06806806806806813,0.06906906906906912,0.07007007007007013,0.07107107107107113,0.07207207207207213,0.07307307307307313,0.07407407407407413,0.07507507507507513,0.07607607607607614,0.07707707707707713,0.07807807807807814,0.07907907907907914,0.08008008008008013,0.08108108108108114,0.08208208208208213,0.08308308308308314,0.08408408408408415,0.08508508508508514,0.08608608608608614,0.08708708708708715,0.08808808808808814,0.08908908908908915,0.09009009009009014,0.09109109109109115,0.09209209209209215,0.09309309309309315,0.09409409409409415,0.09509509509509516,0.09609609609609615,0.09709709709709716,0.09809809809809815,0.09909909909909916,0.10010010010010016,0.10110110110110115,0.10210210210210216,0.10310310310310317,0.10410410410410414,0.10510510510510515,0.10610610610610614,0.10710710710710715,0.10810810810810816,0.10910910910910915,0.11011011011011015,0.11111111111111116,0.11211211211211215,0.11311311311311316,0.11411411411411415,0.11511511511511516,0.11611611611611616,0.11711711711711716,0.11811811811811816,0.11911911911911917,0.12012012012012016,0.12112112112112117,0.12212212212212216,0.12312312312312317,0.12412412412412417,0.12512512512512516,0.12612612612612617,0.12712712712712718,0.12812812812812818,0.1291291291291292,0.1301301301301302,0.1311311311311312,0.13213213213213218,0.13313313313313319,0.1341341341341342,0.1351351351351352,0.1361361361361362,0.13713713713713718,0.1381381381381382,0.1391391391391392,0.1401401401401402,0.1411411411411412,0.14214214214214219,0.1431431431431432,0.1441441441441442,0.1451451451451452,0.1461461461461462,0.14714714714714722,0.1481481481481482,0.1491491491491492,0.1501501501501502,0.15115115115115121,0.15215215215215222,0.1531531531531532,0.1541541541541542,0.1551551551551552,0.15615615615615622,0.15715715715715722,0.1581581581581582,0.1591591591591592,0.16016016016016021,0.16116116116116122,0.16216216216216223,0.16316316316316323,0.1641641641641642,0.16516516516516522,0.16616616616616622,0.16716716716716723,0.16816816816816824,0.16916916916916921,0.17017017017017022,0.17117117117117123,0.17217217217217223,0.17317317317317324,0.17417417417417422,0.17517517517517522,0.17617617617617623,0.17717717717717724,0.17817817817817824,0.17917917917917925,0.18018018018018023,0.18118118118118123,0.18218218218218224,0.18318318318318325,0.18418418418418425,0.18518518518518523,0.18618618618618624,0.18718718718718724,0.18818818818818825,0.18918918918918926,0.19019019019019023,0.19119119119119124,0.19219219219219225,0.19319319319319325,0.19419419419419426,0.19519519519519526,0.19619619619619624,0.19719719719719725,0.19819819819819826,0.19919919919919926,0.20020020020020027,0.20120120120120125,0.20220220220220225,0.20320320320320326,0.20420420420420426,0.20520520520520527,0.20620620620620625,0.20720720720720726,0.20820820820820826,0.20920920920920927,0.21021021021021027,0.21121121121121128,0.21221221221221226,0.21321321321321327,0.21421421421421427,0.21521521521521528,0.21621621621621628,0.21721721721721726,0.21821821821821827,0.21921921921921927,0.22022022022022028,0.2212212212212213,0.22222222222222227,0.22322322322322327,0.22422422422422428,0.22522522522522528,0.2262262262262263,0.2272272272272273,0.22822822822822827,0.22922922922922928,0.2302302302302303,0.2312312312312313,0.23223223223223227,0.23323323323323325,0.23423423423423426,0.23523523523523526,0.23623623623623627,0.23723723723723728,0.23823823823823825,0.23923923923923926,0.24024024024024027,0.24124124124124127,0.24224224224224228,0.24324324324324328,0.24424424424424426,0.24524524524524527,0.24624624624624628,0.24724724724724728,0.2482482482482483,0.24924924924924927,0.2502502502502503,0.2512512512512513,0.2522522522522523,0.25325325325325326,0.2542542542542543,0.2552552552552553,0.2562562562562563,0.2572572572572573,0.2582582582582583,0.2592592592592593,0.26026026026026033,0.2612612612612613,0.26226226226226235,0.2632632632632633,0.2642642642642643,0.26526526526526534,0.2662662662662663,0.26726726726726735,0.26826826826826833,0.2692692692692693,0.27027027027027034,0.2712712712712713,0.27227227227227235,0.27327327327327333,0.2742742742742743,0.27527527527527534,0.2762762762762763,0.27727727727727736,0.27827827827827833,0.2792792792792793,0.28028028028028035,0.2812812812812813,0.28228228228228236,0.28328328328328334,0.2842842842842843,0.28528528528528535,0.28628628628628633,0.28728728728728736,0.28828828828828834,0.2892892892892893,0.29029029029029035,0.29129129129129133,0.29229229229229237,0.29329329329329334,0.2942942942942944,0.29529529529529536,0.29629629629629634,0.29729729729729737,0.29829829829829835,0.2992992992992994,0.30030030030030036,0.30130130130130134,0.3023023023023024,0.30330330330330335,0.3043043043043044,0.30530530530530536,0.30630630630630634,0.3073073073073074,0.30830830830830835,0.3093093093093094,0.31031031031031037,0.31131131131131135,0.3123123123123124,0.31331331331331336,0.3143143143143144,0.31531531531531537,0.31631631631631635,0.3173173173173174,0.31831831831831836,0.3193193193193194,0.3203203203203204,0.32132132132132135,0.3223223223223224,0.32332332332332336,0.3243243243243244,0.3253253253253254,0.3263263263263264,0.3273273273273274,0.32832832832832837,0.3293293293293294,0.3303303303303304,0.3313313313313314,0.3323323323323324,0.33333333333333337,0.3343343343343344,0.3353353353353354,0.3363363363363364,0.3373373373373374,0.3383383383383384,0.3393393393393394,0.3403403403403404,0.3413413413413414,0.3423423423423424,0.3433433433433434,0.3443443443443444,0.3453453453453454,0.3463463463463464,0.3473473473473474,0.3483483483483484,0.3493493493493494,0.3503503503503504,0.3513513513513514,0.3523523523523524,0.3533533533533534,0.3543543543543544,0.3553553553553554,0.35635635635635643,0.3573573573573574,0.35835835835835844,0.3593593593593594,0.3603603603603604,0.36136136136136143,0.3623623623623624,0.36336336336336345,0.3643643643643644,0.3653653653653654,0.36636636636636644,0.3673673673673674,0.36836836836836845,0.3693693693693694,0.3703703703703704,0.37137137137137144,0.3723723723723724,0.37337337337337345,0.37437437437437443,0.3753753753753754,0.37637637637637644,0.3773773773773774,0.37837837837837845,0.37937937937937943,0.3803803803803804,0.38138138138138145,0.3823823823823824,0.38338338338338346,0.38438438438438444,0.3853853853853854,0.38638638638638645,0.3873873873873874,0.38838838838838846,0.38938938938938944,0.3903903903903905,0.39139139139139145,0.39239239239239243,0.39339339339339346,0.39439439439439444,0.3953953953953955,0.39639639639639646,0.39739739739739743,0.39839839839839847,0.39939939939939945,0.4004004004004005,0.40140140140140146,0.40240240240240244,0.40340340340340347,0.40440440440440445,0.4054054054054055,0.40640640640640646,0.40740740740740744,0.4084084084084085,0.40940940940940945,0.4104104104104105,0.41141141141141147,0.41241241241241244,0.4134134134134135,0.41441441441441446,0.4154154154154155,0.41641641641641647,0.41741741741741745,0.4184184184184185,0.41941941941941946,0.4204204204204205,0.42142142142142147,0.4224224224224225,0.4234234234234235,0.42442442442442446,0.4254254254254255,0.4264264264264265,0.4274274274274275,0.4284284284284285,0.42942942942942947,0.4304304304304305,0.4314314314314315,0.4324324324324325,0.4334334334334335,0.43443443443443447,0.4354354354354355,0.4364364364364365,0.4374374374374375,0.4384384384384385,0.43943943943943947,0.4404404404404405,0.4414414414414415,0.4424424424424425,0.4434434434434435,0.4444444444444445,0.4454454454454455,0.4464464464464465,0.4474474474474475,0.4484484484484485,0.44944944944944953,0.4504504504504505,0.4514514514514515,0.4524524524524525,0.4534534534534535,0.45445445445445454,0.4554554554554555,0.4564564564564565,0.45745745745745753,0.4584584584584585,0.45945945945945954,0.4604604604604605,0.4614614614614615,0.46246246246246253,0.4634634634634635,0.46446446446446454,0.4654654654654655,0.4664664664664665,0.46746746746746753,0.4684684684684685,0.46946946946946955,0.4704704704704705,0.4714714714714715,0.47247247247247254,0.4734734734734735,0.47447447447447455,0.47547547547547553,0.4764764764764765,0.47747747747747754,0.4784784784784785,0.47947947947947955,0.48048048048048053,0.48148148148148157,0.48248248248248254,0.4834834834834835,0.48448448448448456,0.48548548548548554,0.48648648648648657,0.4874874874874875,0.48848848848848847,0.4894894894894895,0.4904904904904905,0.4914914914914915,0.4924924924924925,0.4934934934934935,0.4944944944944945,0.4954954954954955,0.4964964964964965,0.4974974974974975,0.4984984984984985,0.4994994994994995,0.5005005005005005,0.5015015015015015,0.5025025025025025,0.5035035035035035,0.5045045045045045,0.5055055055055055,0.5065065065065065,0.5075075075075075,0.5085085085085085,0.5095095095095095,0.5105105105105106,0.5115115115115115,0.5125125125125125,0.5135135135135135,0.5145145145145145,0.5155155155155156,0.5165165165165165,0.5175175175175175,0.5185185185185185,0.5195195195195195,0.5205205205205206,0.5215215215215215,0.5225225225225225,0.5235235235235235,0.5245245245245245,0.5255255255255256,0.5265265265265265,0.5275275275275275,0.5285285285285285,0.5295295295295295,0.5305305305305306,0.5315315315315315,0.5325325325325325,0.5335335335335335,0.5345345345345346,0.5355355355355356,0.5365365365365365,0.5375375375375375,0.5385385385385385,0.5395395395395396,0.5405405405405406,0.5415415415415415,0.5425425425425425,0.5435435435435435,0.5445445445445446,0.5455455455455456,0.5465465465465466,0.5475475475475475,0.5485485485485485,0.5495495495495496,0.5505505505505506,0.5515515515515516,0.5525525525525525,0.5535535535535535,0.5545545545545546,0.5555555555555556,0.5565565565565566,0.5575575575575575,0.5585585585585585,0.5595595595595596,0.5605605605605606,0.5615615615615616,0.5625625625625625,0.5635635635635635,0.5645645645645646,0.5655655655655656,0.5665665665665666,0.5675675675675675,0.5685685685685685,0.5695695695695696,0.5705705705705706,0.5715715715715716,0.5725725725725725,0.5735735735735735,0.5745745745745746,0.5755755755755756,0.5765765765765766,0.5775775775775776,0.5785785785785785,0.5795795795795796,0.5805805805805806,0.5815815815815816,0.5825825825825826,0.5835835835835835,0.5845845845845846,0.5855855855855856,0.5865865865865866,0.5875875875875876,0.5885885885885885,0.5895895895895896,0.5905905905905906,0.5915915915915916,0.5925925925925926,0.5935935935935935,0.5945945945945946,0.5955955955955956,0.5965965965965966,0.5975975975975976,0.5985985985985987,0.5995995995995996,0.6006006006006006,0.6016016016016016,0.6026026026026026,0.6036036036036037,0.6046046046046046,0.6056056056056056,0.6066066066066066,0.6076076076076076,0.6086086086086087,0.6096096096096096,0.6106106106106106,0.6116116116116116,0.6126126126126126,0.6136136136136137,0.6146146146146146,0.6156156156156156,0.6166166166166166,0.6176176176176176,0.6186186186186187,0.6196196196196196,0.6206206206206206,0.6216216216216216,0.6226226226226226,0.6236236236236237,0.6246246246246246,0.6256256256256256,0.6266266266266266,0.6276276276276276,0.6286286286286287,0.6296296296296297,0.6306306306306306,0.6316316316316316,0.6326326326326326,0.6336336336336337,0.6346346346346347,0.6356356356356356,0.6366366366366366,0.6376376376376376,0.6386386386386387,0.6396396396396397,0.6406406406406406,0.6416416416416416,0.6426426426426426,0.6436436436436437,0.6446446446446447,0.6456456456456456,0.6466466466466466,0.6476476476476476,0.6486486486486487,0.6496496496496497,0.6506506506506506,0.6516516516516516,0.6526526526526526,0.6536536536536537,0.6546546546546547,0.6556556556556556,0.6566566566566566,0.6576576576576577,0.6586586586586587,0.6596596596596597,0.6606606606606606,0.6616616616616616,0.6626626626626627,0.6636636636636637,0.6646646646646647,0.6656656656656657,0.6666666666666666,0.6676676676676677,0.6686686686686687,0.6696696696696697,0.6706706706706707,0.6716716716716716,0.6726726726726727,0.6736736736736737,0.6746746746746747,0.6756756756756757,0.6766766766766766,0.6776776776776777,0.6786786786786787,0.6796796796796797,0.6806806806806807,0.6816816816816816,0.6826826826826827,0.6836836836836837,0.6846846846846847,0.6856856856856857,0.6866866866866866,0.6876876876876877,0.6886886886886887,0.6896896896896897,0.6906906906906907,0.6916916916916916,0.6926926926926927,0.6936936936936937,0.6946946946946947,0.6956956956956957,0.6966966966966966,0.6976976976976977,0.6986986986986987,0.6996996996996997,0.7007007007007007,0.7017017017017017,0.7027027027027027,0.7037037037037037,0.7047047047047047,0.7057057057057057,0.7067067067067067,0.7077077077077077,0.7087087087087087,0.7097097097097097,0.7107107107107107,0.7117117117117117,0.7127127127127127,0.7137137137137137,0.7147147147147147,0.7157157157157157,0.7167167167167167,0.7177177177177178,0.7187187187187187,0.7197197197197197,0.7207207207207207,0.7217217217217218,0.7227227227227228,0.7237237237237237,0.7247247247247247,0.7257257257257257,0.7267267267267268,0.7277277277277278,0.7287287287287287,0.7297297297297297,0.7307307307307307,0.7317317317317318,0.7327327327327328,0.7337337337337337,0.7347347347347347,0.7357357357357357,0.7367367367367368,0.7377377377377378,0.7387387387387387,0.7397397397397397,0.7407407407407407,0.7417417417417418,0.7427427427427428,0.7437437437437437,0.7447447447447447,0.7457457457457457,0.7467467467467468,0.7477477477477478,0.7487487487487487,0.7497497497497497,0.7507507507507507,0.7517517517517518,0.7527527527527528,0.7537537537537538,0.7547547547547547,0.7557557557557557,0.7567567567567568,0.7577577577577578,0.7587587587587588,0.7597597597597597,0.7607607607607607,0.7617617617617618,0.7627627627627628,0.7637637637637638,0.7647647647647647,0.7657657657657657,0.7667667667667668,0.7677677677677678,0.7687687687687688,0.7697697697697697,0.7707707707707707,0.7717717717717718,0.7727727727727728,0.7737737737737738,0.7747747747747747,0.7757757757757757,0.7767767767767768,0.7777777777777778,0.7787787787787788,0.7797797797797797,0.7807807807807807,0.7817817817817818,0.7827827827827828,0.7837837837837838,0.7847847847847848,0.7857857857857858,0.7867867867867868,0.7877877877877878,0.7887887887887888,0.7897897897897898,0.7907907907907908,0.7917917917917918,0.7927927927927928,0.7937937937937938,0.7947947947947948,0.7957957957957958,0.7967967967967968,0.7977977977977978,0.7987987987987988,0.7997997997997998,0.8008008008008008,0.8018018018018018,0.8028028028028028,0.8038038038038038,0.8048048048048048,0.8058058058058059,0.8068068068068068,0.8078078078078078,0.8088088088088088,0.8098098098098098,0.8108108108108109,0.8118118118118118,0.8128128128128128,0.8138138138138138,0.8148148148148148,0.8158158158158159,0.8168168168168168,0.8178178178178178,0.8188188188188188,0.8198198198198198,0.8208208208208209,0.8218218218218218,0.8228228228228228,0.8238238238238238,0.8248248248248248,0.8258258258258259,0.8268268268268268,0.8278278278278278,0.8288288288288288,0.8298298298298298,0.8308308308308309,0.8318318318318318,0.8328328328328328,0.8338338338338338,0.8348348348348348,0.8358358358358359,0.8368368368368369,0.8378378378378378,0.8388388388388388,0.8398398398398398,0.8408408408408409,0.8418418418418419,0.8428428428428428,0.8438438438438438,0.8448448448448449,0.8458458458458459,0.8468468468468469,0.8478478478478478,0.8488488488488488,0.8498498498498499,0.8508508508508509,0.8518518518518519,0.8528528528528528,0.8538538538538538,0.8548548548548549,0.8558558558558559,0.8568568568568569,0.8578578578578578,0.8588588588588588,0.8598598598598599,0.8608608608608609,0.8618618618618619,0.8628628628628628,0.8638638638638638,0.8648648648648649,0.8658658658658659,0.8668668668668669,0.8678678678678678,0.8688688688688688,0.8698698698698699,0.8708708708708709,0.8718718718718719,0.8728728728728729,0.8738738738738738,0.8748748748748749,0.8758758758758759,0.8768768768768769,0.8778778778778779,0.8788788788788788,0.8798798798798799,0.8808808808808809,0.8818818818818819,0.8828828828828829,0.8838838838838838,0.8848848848848849,0.8858858858858859,0.8868868868868869,0.8878878878878879,0.8888888888888888,0.8898898898898899,0.8908908908908909,0.8918918918918919,0.8928928928928929,0.8938938938938938,0.8948948948948949,0.8958958958958959,0.8968968968968969,0.8978978978978979,0.8988988988988988,0.8998998998998999,0.9009009009009009,0.9019019019019019,0.9029029029029029,0.9039039039039038,0.9049049049049049,0.9059059059059059,0.9069069069069069,0.9079079079079079,0.908908908908909,0.9099099099099099,0.9109109109109109,0.9119119119119119,0.9129129129129129,0.913913913913914,0.914914914914915,0.9159159159159159,0.9169169169169169,0.9179179179179179,0.918918918918919,0.91991991991992,0.9209209209209209,0.9219219219219219,0.9229229229229229,0.923923923923924,0.924924924924925,0.9259259259259259,0.9269269269269269,0.9279279279279279,0.928928928928929,0.92992992992993,0.9309309309309309,0.9319319319319319,0.9329329329329329,0.933933933933934,0.934934934934935,0.9359359359359359,0.9369369369369369,0.9379379379379379,0.938938938938939,0.93993993993994,0.9409409409409409,0.9419419419419419,0.9429429429429429,0.943943943943944,0.944944944944945,0.9459459459459459,0.9469469469469469,0.9479479479479479,0.948948948948949,0.94994994994995,0.950950950950951,0.9519519519519519,0.9529529529529529,0.953953953953954,0.954954954954955,0.955955955955956,0.9569569569569569,0.9579579579579579,0.958958958958959,0.95995995995996,0.960960960960961,0.9619619619619619,0.9629629629629629,0.963963963963964,0.964964964964965,0.965965965965966,0.9669669669669669,0.9679679679679679,0.968968968968969,0.96996996996997,0.970970970970971,0.9719719719719719,0.972972972972973,0.973973973973974,0.974974974974975,0.975975975975976,0.9769769769769769,0.977977977977978,0.978978978978979,0.97997997997998,0.980980980980981,0.9819819819819819,0.982982982982983,0.983983983983984,0.984984984984985,0.985985985985986,0.986986986986987,0.987987987987988,0.988988988988989,0.98998998998999,0.990990990990991,0.991991991991992,0.992992992992993,0.993993993993994,0.994994994994995,0.995995995995996,0.996996996996997,0.997997997997998,0.998998998998999,1.0]}
},{}],72:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[-5.551115123125783e-17,-5.5400017795359415e-17,-5.5288884359461e-17,-5.5177750923562586e-17,-5.506661748766417e-17,-5.4955484051765757e-17,-5.4844350615867345e-17,-5.473321717996893e-17,-5.4622083744070516e-17,-5.45109503081721e-17,-5.4399816872273687e-17,-5.4288683436375275e-17,-5.417755000047686e-17,-5.4066416564578446e-17,-5.395528312868003e-17,-5.3844149692781617e-17,-5.37330162568832e-17,-5.362188282098479e-17,-5.3510749385086376e-17,-5.339961594918796e-17,-5.3288482513289546e-17,-5.317734907739113e-17,-5.306621564149272e-17,-5.2955082205594306e-17,-5.284394876969589e-17,-5.2732815333797476e-17,-5.262168189789906e-17,-5.251054846200065e-17,-5.2399415026102235e-17,-5.228828159020382e-17,-5.2177148154305406e-17,-5.206601471840699e-17,-5.1954881282508577e-17,-5.1843747846610165e-17,-5.173261441071175e-17,-5.1621480974813336e-17,-5.151034753891492e-17,-5.1399214103016507e-17,-5.1288080667118095e-17,-5.117694723121968e-17,-5.1065813795321266e-17,-5.095468035942285e-17,-5.0843546923524437e-17,-5.0732413487626025e-17,-5.062128005172761e-17,-5.0510146615829196e-17,-5.039901317993078e-17,-5.0287879744032366e-17,-5.017674630813395e-17,-5.006561287223554e-17,-4.9954479436337126e-17,-4.984334600043871e-17,-4.9732212564540296e-17,-4.962107912864188e-17,-4.950994569274347e-17,-4.9398812256845055e-17,-4.928767882094664e-17,-4.9176545385048226e-17,-4.906541194914981e-17,-4.8954278513251397e-17,-4.8843145077352985e-17,-4.873201164145457e-17,-4.8620878205556156e-17,-4.850974476965774e-17,-4.8398611333759327e-17,-4.8287477897860915e-17,-4.81763444619625e-17,-4.8065211026064086e-17,-4.795407759016567e-17,-4.7842944154267257e-17,-4.7731810718368845e-17,-4.762067728247043e-17,-4.7509543846572016e-17,-4.73984104106736e-17,-4.7287276974775186e-17,-4.7176143538876775e-17,-4.706501010297836e-17,-4.6953876667079946e-17,-4.684274323118153e-17,-4.6731609795283116e-17,-4.66204763593847e-17,-4.650934292348629e-17,-4.6398209487587875e-17,-4.628707605168946e-17,-4.6175942615791046e-17,-4.606480917989263e-17,-4.5953675743994217e-17,-4.5842542308095805e-17,-4.573140887219739e-17,-4.5620275436298976e-17,-4.550914200040056e-17,-4.5398008564502147e-17,-4.5286875128603735e-17,-4.517574169270532e-17,-4.5064608256806906e-17,-4.495347482090849e-17,-4.4842341385010077e-17,-4.4731207949111665e-17,-4.462007451321325e-17,-4.4508941077314836e-17,-4.439780764141642e-17,-4.4286674205518006e-17,-4.4175540769619595e-17,-4.406440733372118e-17,-4.3953273897822766e-17,-4.384214046192435e-17,-4.3731007026025936e-17,-4.3619873590127525e-17,-4.350874015422911e-17,-4.3397606718330695e-17,-4.328647328243228e-17,-4.3175339846533866e-17,-4.306420641063545e-17,-4.2953072974737037e-17,-4.2841939538838625e-17,-4.273080610294021e-17,-4.2619672667041796e-17,-4.250853923114338e-17,-4.2397405795244967e-17,-4.2286272359346555e-17,-4.217513892344814e-17,-4.2064005487549726e-17,-4.195287205165131e-17,-4.1841738615752897e-17,-4.1730605179854485e-17,-4.161947174395607e-17,-4.1508338308057656e-17,-4.139720487215924e-17,-4.1286071436260826e-17,-4.1174938000362415e-17,-4.1063804564464e-17,-4.0952671128565586e-17,-4.084153769266717e-17,-4.0730404256768756e-17,-4.0619270820870345e-17,-4.050813738497193e-17,-4.0397003949073515e-17,-4.02858705131751e-17,-4.0174737077276686e-17,-4.0063603641378275e-17,-3.9952470205479857e-17,-3.9841336769581445e-17,-3.973020333368303e-17,-3.9619069897784616e-17,-3.95079364618862e-17,-3.9396803025987787e-17,-3.9285669590089375e-17,-3.917453615419096e-17,-3.9063402718292546e-17,-3.895226928239413e-17,-3.8841135846495717e-17,-3.8730002410597305e-17,-3.861886897469889e-17,-3.8507735538800476e-17,-3.839660210290206e-17,-3.8285468667003646e-17,-3.8174335231105235e-17,-3.806320179520682e-17,-3.7952068359308406e-17,-3.784093492340999e-17,-3.7729801487511576e-17,-3.7618668051613165e-17,-3.750753461571475e-17,-3.7396401179816335e-17,-3.728526774391792e-17,-3.7174134308019506e-17,-3.7063000872121095e-17,-3.6951867436222677e-17,-3.6840734000324265e-17,-3.672960056442585e-17,-3.6618467128527436e-17,-3.6507333692629024e-17,-3.6396200256730607e-17,-3.6285066820832195e-17,-3.617393338493378e-17,-3.6062799949035366e-17,-3.595166651313695e-17,-3.5840533077238537e-17,-3.5729399641340125e-17,-3.561826620544171e-17,-3.5507132769543296e-17,-3.539599933364488e-17,-3.5284865897746466e-17,-3.5173732461848055e-17,-3.506259902594964e-17,-3.4951465590051226e-17,-3.484033215415281e-17,-3.4729198718254396e-17,-3.4618065282355985e-17,-3.450693184645757e-17,-3.4395798410559155e-17,-3.428466497466074e-17,-3.4173531538762326e-17,-3.4062398102863915e-17,-3.3951264666965497e-17,-3.3840131231067085e-17,-3.372899779516867e-17,-3.3617864359270256e-17,-3.3506730923371844e-17,-3.3395597487473427e-17,-3.3284464051575015e-17,-3.31733306156766e-17,-3.3062197179778186e-17,-3.295106374387977e-17,-3.2839930307981357e-17,-3.2728796872082945e-17,-3.261766343618453e-17,-3.2506530000286116e-17,-3.23953965643877e-17,-3.2284263128489286e-17,-3.2173129692590875e-17,-3.206199625669246e-17,-3.1950862820794046e-17,-3.183972938489563e-17,-3.1728595948997216e-17,-3.1617462513098805e-17,-3.150632907720039e-17,-3.1395195641301975e-17,-3.128406220540356e-17,-3.1172928769505146e-17,-3.1061795333606735e-17,-3.0950661897708317e-17,-3.0839528461809905e-17,-3.072839502591149e-17,-3.0617261590013076e-17,-3.0506128154114664e-17,-3.0394994718216247e-17,-3.0283861282317835e-17,-3.017272784641942e-17,-3.0061594410521006e-17,-2.9950460974622594e-17,-2.9839327538724177e-17,-2.9728194102825765e-17,-2.961706066692735e-17,-2.9505927231028936e-17,-2.939479379513052e-17,-2.9283660359232106e-17,-2.9172526923333695e-17,-2.906139348743528e-17,-2.8950260051536866e-17,-2.883912661563845e-17,-2.8727993179740036e-17,-2.8616859743841625e-17,-2.850572630794321e-17,-2.8394592872044795e-17,-2.828345943614638e-17,-2.8172326000247966e-17,-2.8061192564349555e-17,-2.7950059128451137e-17,-2.7838925692552725e-17,-2.772779225665431e-17,-2.7616658820755896e-17,-2.750552538485748e-17,-2.7394391948959067e-17,-2.7283258513060655e-17,-2.717212507716224e-17,-2.7060991641263826e-17,-2.694985820536541e-17,-2.6838724769466997e-17,-2.6727591333568582e-17,-2.661645789767017e-17,-2.6505324461771756e-17,-2.639419102587334e-17,-2.6283057589974926e-17,-2.6171924154076512e-17,-2.60607907181781e-17,-2.5949657282279686e-17,-2.583852384638127e-17,-2.5727390410482856e-17,-2.5616256974584442e-17,-2.550512353868603e-17,-2.5393990102787615e-17,-2.52828566668892e-17,-2.5171723230990786e-17,-2.506058979509237e-17,-2.4949456359193957e-17,-2.4838322923295545e-17,-2.472718948739713e-17,-2.4616056051498716e-17,-2.45049226156003e-17,-2.4393789179701887e-17,-2.4282655743803475e-17,-2.417152230790506e-17,-2.4060388872006646e-17,-2.394925543610823e-17,-2.3838122000209817e-17,-2.3726988564311405e-17,-2.361585512841299e-17,-2.3504721692514576e-17,-2.339358825661616e-17,-2.3282454820717746e-17,-2.3171321384819332e-17,-2.306018794892092e-17,-2.2949054513022506e-17,-2.283792107712409e-17,-2.2726787641225676e-17,-2.2615654205327262e-17,-2.250452076942885e-17,-2.2393387333530435e-17,-2.228225389763202e-17,-2.2171120461733606e-17,-2.205998702583519e-17,-2.194885358993678e-17,-2.1837720154038365e-17,-2.172658671813995e-17,-2.1615453282241536e-17,-2.150431984634312e-17,-2.1393186410444707e-17,-2.1282052974546295e-17,-2.117091953864788e-17,-2.1059786102749466e-17,-2.094865266685105e-17,-2.0837519230952637e-17,-2.0726385795054225e-17,-2.061525235915581e-17,-2.0504118923257396e-17,-2.039298548735898e-17,-2.0281852051460566e-17,-2.0170718615562155e-17,-2.005958517966374e-17,-1.9948451743765326e-17,-1.983731830786691e-17,-1.9726184871968496e-17,-1.9615051436070082e-17,-1.950391800017167e-17,-1.9392784564273255e-17,-1.928165112837484e-17,-1.9170517692476426e-17,-1.905938425657801e-17,-1.89482508206796e-17,-1.8837117384781185e-17,-1.872598394888277e-17,-1.8614850512984356e-17,-1.850371707708594e-17,-1.839258364118753e-17,-1.8281450205289115e-17,-1.81703167693907e-17,-1.8059183333492286e-17,-1.794804989759387e-17,-1.7836916461695457e-17,-1.7725783025797045e-17,-1.761464958989863e-17,-1.7503516154000216e-17,-1.73923827181018e-17,-1.7281249282203386e-17,-1.7170115846304975e-17,-1.705898241040656e-17,-1.6947848974508146e-17,-1.683671553860973e-17,-1.6725582102711316e-17,-1.6614448666812905e-17,-1.650331523091449e-17,-1.6392181795016075e-17,-1.628104835911766e-17,-1.6169914923219246e-17,-1.605878148732083e-17,-1.594764805142242e-17,-1.5836514615524005e-17,-1.572538117962559e-17,-1.5614247743727176e-17,-1.550311430782876e-17,-1.539198087193035e-17,-1.5280847436031935e-17,-1.516971400013352e-17,-1.5058580564235106e-17,-1.494744712833669e-17,-1.483631369243828e-17,-1.4725180256539865e-17,-1.461404682064145e-17,-1.4502913384743036e-17,-1.439177994884462e-17,-1.4280646512946206e-17,-1.4169513077047795e-17,-1.405837964114938e-17,-1.3947246205250966e-17,-1.3836112769352551e-17,-1.3724979333454138e-17,-1.3613845897555723e-17,-1.350271246165731e-17,-1.3391579025758895e-17,-1.328044558986048e-17,-1.3169312153962068e-17,-1.3058178718063653e-17,-1.2947045282165238e-17,-1.2835911846266825e-17,-1.272477841036841e-17,-1.2613644974469997e-17,-1.2502511538571583e-17,-1.2391378102673168e-17,-1.2280244666774755e-17,-1.216911123087634e-17,-1.2057977794977926e-17,-1.1946844359079513e-17,-1.1835710923181098e-17,-1.1724577487282685e-17,-1.161344405138427e-17,-1.1502310615485856e-17,-1.1391177179587443e-17,-1.1280043743689028e-17,-1.1168910307790613e-17,-1.10577768718922e-17,-1.0946643435993786e-17,-1.0835510000095371e-17,-1.0724376564196958e-17,-1.0613243128298543e-17,-1.050210969240013e-17,-1.0390976256501715e-17,-1.02798428206033e-17,-1.0168709384704888e-17,-1.0057575948806473e-17,-9.946442512908058e-18,-9.835309077009645e-18,-9.72417564111123e-18,-9.613042205212817e-18,-9.501908769314403e-18,-9.390775333415988e-18,-9.279641897517575e-18,-9.16850846161916e-18,-9.057375025720746e-18,-8.946241589822333e-18,-8.835108153923918e-18,-8.723974718025505e-18,-8.61284128212709e-18,-8.501707846228676e-18,-8.390574410330263e-18,-8.279440974431848e-18,-8.168307538533433e-18,-8.05717410263502e-18,-7.946040666736606e-18,-7.834907230838192e-18,-7.723773794939778e-18,-7.612640359041363e-18,-7.50150692314295e-18,-7.390373487244535e-18,-7.27924005134612e-18,-7.168106615447708e-18,-7.056973179549293e-18,-6.94583974365088e-18,-6.834706307752465e-18,-6.723572871854051e-18,-6.612439435955637e-18,-6.501306000057223e-18,-6.390172564158809e-18,-6.279039128260395e-18,-6.1679056923619804e-18,-6.0567722564635666e-18,-5.945638820565153e-18,-5.834505384666739e-18,-5.723371948768324e-18,-5.61223851286991e-18,-5.5011050769714964e-18,-5.3899716410730825e-18,-5.278838205174668e-18,-5.167704769276254e-18,-5.05657133337784e-18,-4.945437897479426e-18,-4.834304461581012e-18,-4.723171025682598e-18,-4.612037589784184e-18,-4.50090415388577e-18,-4.389770717987355e-18,-4.2786372820889415e-18,-4.1675038461905276e-18,-4.056370410292114e-18,-3.945236974393699e-18,-3.834103538495285e-18,-3.722970102596871e-18,-3.6118366666984575e-18,-3.500703230800043e-18,-3.389569794901629e-18,-3.278436359003215e-18,-3.167302923104801e-18,-3.056169487206387e-18,-2.9450360513079727e-18,-2.833902615409559e-18,-2.7227691795111445e-18,-2.6116357436127307e-18,-2.5005023077143164e-18,-2.3893688718159025e-18,-2.2782354359174883e-18,-2.1671020000190744e-18,-2.05596856412066e-18,-1.9448351282222463e-18,-1.833701692323832e-18,-1.7225682564254181e-18,-1.611434820527004e-18,-1.50030138462859e-18,-1.389167948730176e-18,-1.2780345128317619e-18,-1.1669010769333478e-18,-1.0557676410349337e-18,-9.446342051365197e-19,-8.335007692381055e-19,-7.223673333396914e-19,-6.112338974412774e-19,-5.001004615428633e-19,-3.8896702564444924e-19,-2.7783358974603517e-19,-1.667001538476211e-19,-5.556671794920703e-20,5.556671794920703e-20,1.667001538476211e-19,2.7783358974603517e-19,3.8896702564444924e-19,5.001004615428633e-19,6.112338974412774e-19,7.223673333396914e-19,8.335007692381055e-19,9.446342051365197e-19,1.0557676410349337e-18,1.1669010769333478e-18,1.2780345128317619e-18,1.389167948730176e-18,1.50030138462859e-18,1.611434820527004e-18,1.7225682564254181e-18,1.833701692323832e-18,1.9448351282222463e-18,2.05596856412066e-18,2.1671020000190744e-18,2.2782354359174883e-18,2.3893688718159025e-18,2.5005023077143164e-18,2.6116357436127307e-18,2.7227691795111445e-18,2.833902615409559e-18,2.9450360513079727e-18,3.056169487206387e-18,3.167302923104801e-18,3.278436359003215e-18,3.389569794901629e-18,3.500703230800043e-18,3.6118366666984575e-18,3.722970102596871e-18,3.834103538495285e-18,3.945236974393699e-18,4.056370410292114e-18,4.1675038461905276e-18,4.2786372820889415e-18,4.389770717987355e-18,4.50090415388577e-18,4.612037589784184e-18,4.723171025682598e-18,4.834304461581012e-18,4.945437897479426e-18,5.05657133337784e-18,5.167704769276254e-18,5.278838205174668e-18,5.3899716410730825e-18,5.5011050769714964e-18,5.61223851286991e-18,5.723371948768324e-18,5.834505384666739e-18,5.945638820565153e-18,6.0567722564635666e-18,6.1679056923619804e-18,6.279039128260395e-18,6.390172564158809e-18,6.501306000057223e-18,6.612439435955637e-18,6.723572871854051e-18,6.834706307752465e-18,6.94583974365088e-18,7.056973179549293e-18,7.168106615447708e-18,7.27924005134612e-18,7.390373487244535e-18,7.50150692314295e-18,7.612640359041363e-18,7.723773794939778e-18,7.834907230838192e-18,7.946040666736606e-18,8.05717410263502e-18,8.168307538533433e-18,8.279440974431848e-18,8.390574410330263e-18,8.501707846228676e-18,8.61284128212709e-18,8.723974718025505e-18,8.835108153923918e-18,8.946241589822333e-18,9.057375025720746e-18,9.16850846161916e-18,9.279641897517575e-18,9.390775333415988e-18,9.501908769314403e-18,9.613042205212817e-18,9.72417564111123e-18,9.835309077009645e-18,9.946442512908058e-18,1.0057575948806473e-17,1.0168709384704888e-17,1.02798428206033e-17,1.0390976256501715e-17,1.050210969240013e-17,1.0613243128298543e-17,1.0724376564196958e-17,1.0835510000095371e-17,1.0946643435993786e-17,1.10577768718922e-17,1.1168910307790613e-17,1.1280043743689028e-17,1.1391177179587443e-17,1.1502310615485856e-17,1.161344405138427e-17,1.1724577487282685e-17,1.1835710923181098e-17,1.1946844359079513e-17,1.2057977794977926e-17,1.216911123087634e-17,1.2280244666774755e-17,1.2391378102673168e-17,1.2502511538571583e-17,1.2613644974469997e-17,1.272477841036841e-17,1.2835911846266825e-17,1.2947045282165238e-17,1.3058178718063653e-17,1.3169312153962068e-17,1.328044558986048e-17,1.3391579025758895e-17,1.350271246165731e-17,1.3613845897555723e-17,1.3724979333454138e-17,1.3836112769352551e-17,1.3947246205250966e-17,1.405837964114938e-17,1.4169513077047795e-17,1.4280646512946206e-17,1.439177994884462e-17,1.4502913384743036e-17,1.461404682064145e-17,1.4725180256539865e-17,1.483631369243828e-17,1.494744712833669e-17,1.5058580564235106e-17,1.516971400013352e-17,1.5280847436031935e-17,1.539198087193035e-17,1.550311430782876e-17,1.5614247743727176e-17,1.572538117962559e-17,1.5836514615524005e-17,1.594764805142242e-17,1.605878148732083e-17,1.6169914923219246e-17,1.628104835911766e-17,1.6392181795016075e-17,1.650331523091449e-17,1.6614448666812905e-17,1.6725582102711316e-17,1.683671553860973e-17,1.6947848974508146e-17,1.705898241040656e-17,1.7170115846304975e-17,1.7281249282203386e-17,1.73923827181018e-17,1.7503516154000216e-17,1.761464958989863e-17,1.7725783025797045e-17,1.7836916461695457e-17,1.794804989759387e-17,1.8059183333492286e-17,1.81703167693907e-17,1.8281450205289115e-17,1.839258364118753e-17,1.850371707708594e-17,1.8614850512984356e-17,1.872598394888277e-17,1.8837117384781185e-17,1.89482508206796e-17,1.905938425657801e-17,1.9170517692476426e-17,1.928165112837484e-17,1.9392784564273255e-17,1.950391800017167e-17,1.9615051436070082e-17,1.9726184871968496e-17,1.983731830786691e-17,1.9948451743765326e-17,2.005958517966374e-17,2.0170718615562155e-17,2.0281852051460566e-17,2.039298548735898e-17,2.0504118923257396e-17,2.061525235915581e-17,2.0726385795054225e-17,2.0837519230952637e-17,2.094865266685105e-17,2.1059786102749466e-17,2.117091953864788e-17,2.1282052974546295e-17,2.1393186410444707e-17,2.150431984634312e-17,2.1615453282241536e-17,2.172658671813995e-17,2.1837720154038365e-17,2.194885358993678e-17,2.205998702583519e-17,2.2171120461733606e-17,2.228225389763202e-17,2.2393387333530435e-17,2.250452076942885e-17,2.2615654205327262e-17,2.2726787641225676e-17,2.283792107712409e-17,2.2949054513022506e-17,2.306018794892092e-17,2.3171321384819332e-17,2.3282454820717746e-17,2.339358825661616e-17,2.3504721692514576e-17,2.361585512841299e-17,2.3726988564311405e-17,2.3838122000209817e-17,2.394925543610823e-17,2.4060388872006646e-17,2.417152230790506e-17,2.4282655743803475e-17,2.4393789179701887e-17,2.45049226156003e-17,2.4616056051498716e-17,2.472718948739713e-17,2.4838322923295545e-17,2.4949456359193957e-17,2.506058979509237e-17,2.5171723230990786e-17,2.52828566668892e-17,2.5393990102787615e-17,2.550512353868603e-17,2.5616256974584442e-17,2.5727390410482856e-17,2.583852384638127e-17,2.5949657282279686e-17,2.60607907181781e-17,2.6171924154076512e-17,2.6283057589974926e-17,2.639419102587334e-17,2.6505324461771756e-17,2.661645789767017e-17,2.6727591333568582e-17,2.6838724769466997e-17,2.694985820536541e-17,2.7060991641263826e-17,2.717212507716224e-17,2.7283258513060655e-17,2.7394391948959067e-17,2.750552538485748e-17,2.7616658820755896e-17,2.772779225665431e-17,2.7838925692552725e-17,2.7950059128451137e-17,2.8061192564349555e-17,2.8172326000247966e-17,2.828345943614638e-17,2.8394592872044795e-17,2.850572630794321e-17,2.8616859743841625e-17,2.8727993179740036e-17,2.883912661563845e-17,2.8950260051536866e-17,2.906139348743528e-17,2.9172526923333695e-17,2.9283660359232106e-17,2.939479379513052e-17,2.9505927231028936e-17,2.961706066692735e-17,2.9728194102825765e-17,2.9839327538724177e-17,2.9950460974622594e-17,3.0061594410521006e-17,3.017272784641942e-17,3.0283861282317835e-17,3.0394994718216247e-17,3.0506128154114664e-17,3.0617261590013076e-17,3.072839502591149e-17,3.0839528461809905e-17,3.0950661897708317e-17,3.1061795333606735e-17,3.1172928769505146e-17,3.128406220540356e-17,3.1395195641301975e-17,3.150632907720039e-17,3.1617462513098805e-17,3.1728595948997216e-17,3.183972938489563e-17,3.1950862820794046e-17,3.206199625669246e-17,3.2173129692590875e-17,3.2284263128489286e-17,3.23953965643877e-17,3.2506530000286116e-17,3.261766343618453e-17,3.2728796872082945e-17,3.2839930307981357e-17,3.295106374387977e-17,3.3062197179778186e-17,3.31733306156766e-17,3.3284464051575015e-17,3.3395597487473427e-17,3.3506730923371844e-17,3.3617864359270256e-17,3.372899779516867e-17,3.3840131231067085e-17,3.3951264666965497e-17,3.4062398102863915e-17,3.4173531538762326e-17,3.428466497466074e-17,3.4395798410559155e-17,3.450693184645757e-17,3.4618065282355985e-17,3.4729198718254396e-17,3.484033215415281e-17,3.4951465590051226e-17,3.506259902594964e-17,3.5173732461848055e-17,3.5284865897746466e-17,3.539599933364488e-17,3.5507132769543296e-17,3.561826620544171e-17,3.5729399641340125e-17,3.5840533077238537e-17,3.595166651313695e-17,3.6062799949035366e-17,3.617393338493378e-17,3.6285066820832195e-17,3.6396200256730607e-17,3.6507333692629024e-17,3.6618467128527436e-17,3.672960056442585e-17,3.6840734000324265e-17,3.6951867436222677e-17,3.7063000872121095e-17,3.7174134308019506e-17,3.728526774391792e-17,3.7396401179816335e-17,3.750753461571475e-17,3.7618668051613165e-17,3.7729801487511576e-17,3.784093492340999e-17,3.7952068359308406e-17,3.806320179520682e-17,3.8174335231105235e-17,3.8285468667003646e-17,3.839660210290206e-17,3.8507735538800476e-17,3.861886897469889e-17,3.8730002410597305e-17,3.8841135846495717e-17,3.895226928239413e-17,3.9063402718292546e-17,3.917453615419096e-17,3.9285669590089375e-17,3.9396803025987787e-17,3.95079364618862e-17,3.9619069897784616e-17,3.973020333368303e-17,3.9841336769581445e-17,3.9952470205479857e-17,4.0063603641378275e-17,4.0174737077276686e-17,4.02858705131751e-17,4.0397003949073515e-17,4.050813738497193e-17,4.0619270820870345e-17,4.0730404256768756e-17,4.084153769266717e-17,4.0952671128565586e-17,4.1063804564464e-17,4.1174938000362415e-17,4.1286071436260826e-17,4.139720487215924e-17,4.1508338308057656e-17,4.161947174395607e-17,4.1730605179854485e-17,4.1841738615752897e-17,4.195287205165131e-17,4.2064005487549726e-17,4.217513892344814e-17,4.2286272359346555e-17,4.2397405795244967e-17,4.250853923114338e-17,4.2619672667041796e-17,4.273080610294021e-17,4.2841939538838625e-17,4.2953072974737037e-17,4.306420641063545e-17,4.3175339846533866e-17,4.328647328243228e-17,4.3397606718330695e-17,4.350874015422911e-17,4.3619873590127525e-17,4.3731007026025936e-17,4.384214046192435e-17,4.3953273897822766e-17,4.406440733372118e-17,4.4175540769619595e-17,4.4286674205518006e-17,4.439780764141642e-17,4.4508941077314836e-17,4.462007451321325e-17,4.4731207949111665e-17,4.4842341385010077e-17,4.495347482090849e-17,4.5064608256806906e-17,4.517574169270532e-17,4.5286875128603735e-17,4.5398008564502147e-17,4.550914200040056e-17,4.5620275436298976e-17,4.573140887219739e-17,4.5842542308095805e-17,4.5953675743994217e-17,4.606480917989263e-17,4.6175942615791046e-17,4.628707605168946e-17,4.6398209487587875e-17,4.650934292348629e-17,4.66204763593847e-17,4.6731609795283116e-17,4.684274323118153e-17,4.6953876667079946e-17,4.706501010297836e-17,4.7176143538876775e-17,4.7287276974775186e-17,4.73984104106736e-17,4.7509543846572016e-17,4.762067728247043e-17,4.7731810718368845e-17,4.7842944154267257e-17,4.795407759016567e-17,4.8065211026064086e-17,4.81763444619625e-17,4.8287477897860915e-17,4.8398611333759327e-17,4.850974476965774e-17,4.8620878205556156e-17,4.873201164145457e-17,4.8843145077352985e-17,4.8954278513251397e-17,4.906541194914981e-17,4.9176545385048226e-17,4.928767882094664e-17,4.9398812256845055e-17,4.950994569274347e-17,4.962107912864188e-17,4.9732212564540296e-17,4.984334600043871e-17,4.9954479436337126e-17,5.006561287223554e-17,5.017674630813395e-17,5.0287879744032366e-17,5.039901317993078e-17,5.0510146615829196e-17,5.062128005172761e-17,5.0732413487626025e-17,5.0843546923524437e-17,5.095468035942285e-17,5.1065813795321266e-17,5.117694723121968e-17,5.1288080667118095e-17,5.1399214103016507e-17,5.151034753891492e-17,5.1621480974813336e-17,5.173261441071175e-17,5.1843747846610165e-17,5.1954881282508577e-17,5.206601471840699e-17,5.2177148154305406e-17,5.228828159020382e-17,5.2399415026102235e-17,5.251054846200065e-17,5.262168189789906e-17,5.2732815333797476e-17,5.284394876969589e-17,5.2955082205594306e-17,5.306621564149272e-17,5.317734907739113e-17,5.3288482513289546e-17,5.339961594918796e-17,5.3510749385086376e-17,5.362188282098479e-17,5.37330162568832e-17,5.3844149692781617e-17,5.395528312868003e-17,5.4066416564578446e-17,5.417755000047686e-17,5.4288683436375275e-17,5.4399816872273687e-17,5.45109503081721e-17,5.4622083744070516e-17,5.473321717996893e-17,5.4844350615867345e-17,5.4955484051765757e-17,5.506661748766417e-17,5.5177750923562586e-17,5.5288884359461e-17,5.5400017795359415e-17,5.551115123125783e-17]}
},{}],73:[function(require,module,exports){
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
var exp = require( './../lib' );


// FIXTURES //

var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var tiny = require( './fixtures/julia/tiny.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof exp, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accurately computes the natural exponential function for negative medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes the natural exponential function for positive medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes the natural exponential function for negative small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes the natural exponential function for positive small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes the natural exponential function for very small `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function returns `0` if provided a `-infinity`', function test( t ) {
	var val = exp( NINF );
	t.equal( val, 0.0, 'returns 0' );
	t.end();
});

tape( 'the function returns `+infinity` if provided a `+infinity`', function test( t ) {
	var val = exp( PINF );
	t.equal( val, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var val = exp( NaN );
	t.equal( isnan( val ), true, 'returns NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/exp/test/test.js")
},{"./../lib":66,"./fixtures/julia/medium_negative.json":68,"./fixtures/julia/medium_positive.json":69,"./fixtures/julia/small_negative.json":70,"./fixtures/julia/small_positive.json":71,"./fixtures/julia/tiny.json":72,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":205}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var floor = require( './main.js' );


// EXPORTS //

module.exports = floor;

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

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var normalize = require( '@stdlib/number/float64/base/normalize' );
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


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
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( FRAC, frac );
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
	toWords( WORDS, frac );
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":46,"@stdlib/constants/float64/max-base2-exponent-subnormal":45,"@stdlib/constants/float64/min-base2-exponent-subnormal":47,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":63,"@stdlib/number/float64/base/exponent":82,"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/normalize":90,"@stdlib/number/float64/base/to-words":93}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var trunc = require( './main.js' );


// EXPORTS //

module.exports = trunc;

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

},{"@stdlib/math/base/special/ceil":60,"@stdlib/math/base/special/floor":74}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var exponent = require( './main.js' );


// EXPORTS //

module.exports = exponent;

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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":88}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var fromWords = require( './main.js' );


// EXPORTS //

module.exports = fromWords;

},{"./main.js":86}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
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

},{"./indices.js":85,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":87,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var normalize = require( './main.js' );


// EXPORTS //

module.exports = normalize;

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

var fcn = require( './normalize.js' );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ 0 ] = x;
		out[ 1 ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ 0 ] = x * SCALAR;
		out[ 1 ] = -52;
		return out;
	}
	out[ 0 ] = x;
	out[ 1 ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/float64/smallest-normal":50,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = require( './main.js' );


// EXPORTS //

module.exports = toWords;

},{"./main.js":95}],94:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":85}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './to_words.js' );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":94,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":98,"./polyfill.js":99,"@stdlib/assert/has-tostringtag-support":20}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":100}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":100,"./tostringtag.js":101,"@stdlib/assert/has-own-property":16}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){

},{}],104:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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
},{"_process":197}],107:[function(require,module,exports){
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

},{"events":105,"inherits":192,"readable-stream/lib/_stream_duplex.js":109,"readable-stream/lib/_stream_passthrough.js":110,"readable-stream/lib/_stream_readable.js":111,"readable-stream/lib/_stream_transform.js":112,"readable-stream/lib/_stream_writable.js":113,"readable-stream/lib/internal/streams/end-of-stream.js":117,"readable-stream/lib/internal/streams/pipeline.js":119}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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
},{"./_stream_readable":111,"./_stream_writable":113,"_process":197,"inherits":192}],110:[function(require,module,exports){
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
},{"./_stream_transform":112,"inherits":192}],111:[function(require,module,exports){
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
},{"../errors":108,"./_stream_duplex":109,"./internal/streams/async_iterator":114,"./internal/streams/buffer_list":115,"./internal/streams/destroy":116,"./internal/streams/from":118,"./internal/streams/state":120,"./internal/streams/stream":121,"_process":197,"buffer":122,"events":105,"inherits":192,"string_decoder/":204,"util":103}],112:[function(require,module,exports){
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
},{"../errors":108,"./_stream_duplex":109,"inherits":192}],113:[function(require,module,exports){
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
},{"../errors":108,"./_stream_duplex":109,"./internal/streams/destroy":116,"./internal/streams/state":120,"./internal/streams/stream":121,"_process":197,"buffer":122,"inherits":192,"util-deprecate":213}],114:[function(require,module,exports){
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
},{"./end-of-stream":117,"_process":197}],115:[function(require,module,exports){
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
},{"buffer":122,"util":103}],116:[function(require,module,exports){
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
},{"_process":197}],117:[function(require,module,exports){
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
},{"../../../errors":108}],118:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],119:[function(require,module,exports){
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
},{"../../../errors":108,"./end-of-stream":117}],120:[function(require,module,exports){
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
},{"../../../errors":108}],121:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":105}],122:[function(require,module,exports){
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
},{"base64-js":102,"buffer":122,"ieee754":191}],123:[function(require,module,exports){
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

},{"./":124,"get-intrinsic":187}],124:[function(require,module,exports){
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

},{"function-bind":186,"get-intrinsic":187}],125:[function(require,module,exports){
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

},{"./lib/is_arguments.js":126,"./lib/keys.js":127}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],128:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

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
		object[name] = value;
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

},{"object-keys":195}],129:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],130:[function(require,module,exports){
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

},{"./ToNumber":160,"./ToPrimitive":162,"./Type":167}],131:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":177,"../helpers/isPrefixOf":178,"./ToNumber":160,"./ToPrimitive":162,"./Type":167,"get-intrinsic":187}],132:[function(require,module,exports){
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

},{"get-intrinsic":187}],133:[function(require,module,exports){
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

},{"./DayWithinYear":136,"./InLeapYear":140,"./MonthFromTime":150,"get-intrinsic":187}],134:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":182,"./floor":171}],135:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":171}],136:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":134,"./DayFromYear":135,"./YearFromTime":169}],137:[function(require,module,exports){
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

},{"./modulo":172}],138:[function(require,module,exports){
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
	} else {
		throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
	}
};

},{"../helpers/assertRecord":175,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167,"get-intrinsic":187}],139:[function(require,module,exports){
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

},{"../helpers/timeConstants":182,"./floor":171,"./modulo":172}],140:[function(require,module,exports){
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

},{"./DaysInYear":137,"./YearFromTime":169,"get-intrinsic":187}],141:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./Type":167,"has":190}],142:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":193}],143:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./Type":167,"has":190}],144:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167}],145:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":179,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167}],146:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/timeConstants":182}],147:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"./DateFromTime":133,"./Day":134,"./MonthFromTime":150,"./ToInteger":159,"./YearFromTime":169,"./floor":171,"./modulo":172,"get-intrinsic":187}],148:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/timeConstants":182,"./ToInteger":159}],149:[function(require,module,exports){
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

},{"../helpers/timeConstants":182,"./floor":171,"./modulo":172}],150:[function(require,module,exports){
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

},{"./DayWithinYear":136,"./InLeapYear":140}],151:[function(require,module,exports){
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

},{"../helpers/isNaN":177}],152:[function(require,module,exports){
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

},{"../helpers/timeConstants":182,"./floor":171,"./modulo":172}],153:[function(require,module,exports){
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

},{"./Type":167}],154:[function(require,module,exports){
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


},{"../helpers/isFinite":176,"./ToNumber":160,"./abs":170,"get-intrinsic":187}],155:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":182,"./DayFromYear":135}],156:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":182,"./modulo":172}],157:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],158:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":160}],159:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":177,"../helpers/sign":181,"./ToNumber":160,"./abs":170,"./floor":171}],160:[function(require,module,exports){
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

},{"./ToPrimitive":162}],161:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":132,"get-intrinsic":187}],162:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":183}],163:[function(require,module,exports){
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

},{"./IsCallable":142,"./ToBoolean":157,"./Type":167,"get-intrinsic":187,"has":190}],164:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":187}],165:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":177,"../helpers/sign":181,"./ToNumber":160,"./abs":170,"./floor":171,"./modulo":172}],166:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":160}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":134,"./modulo":172}],169:[function(require,module,exports){
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

},{"call-bind/callBound":123,"get-intrinsic":187}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":187}],171:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],172:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":180}],173:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":182,"./modulo":172}],174:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":130,"./5/AbstractRelationalComparison":131,"./5/CheckObjectCoercible":132,"./5/DateFromTime":133,"./5/Day":134,"./5/DayFromYear":135,"./5/DayWithinYear":136,"./5/DaysInYear":137,"./5/FromPropertyDescriptor":138,"./5/HourFromTime":139,"./5/InLeapYear":140,"./5/IsAccessorDescriptor":141,"./5/IsCallable":142,"./5/IsDataDescriptor":143,"./5/IsGenericDescriptor":144,"./5/IsPropertyDescriptor":145,"./5/MakeDate":146,"./5/MakeDay":147,"./5/MakeTime":148,"./5/MinFromTime":149,"./5/MonthFromTime":150,"./5/SameValue":151,"./5/SecFromTime":152,"./5/StrictEqualityComparison":153,"./5/TimeClip":154,"./5/TimeFromYear":155,"./5/TimeWithinDay":156,"./5/ToBoolean":157,"./5/ToInt32":158,"./5/ToInteger":159,"./5/ToNumber":160,"./5/ToObject":161,"./5/ToPrimitive":162,"./5/ToPropertyDescriptor":163,"./5/ToString":164,"./5/ToUint16":165,"./5/ToUint32":166,"./5/Type":167,"./5/WeekDay":168,"./5/YearFromTime":169,"./5/abs":170,"./5/floor":171,"./5/modulo":172,"./5/msFromTime":173}],175:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
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
	}
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"get-intrinsic":187,"has":190}],176:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],177:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],178:[function(require,module,exports){
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

},{"call-bind/callBound":123}],179:[function(require,module,exports){
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

},{"get-intrinsic":187,"has":190}],180:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],181:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{"./helpers/isPrimitive":184,"is-callable":193}],184:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":185}],187:[function(require,module,exports){
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

},{"function-bind":186,"has":190,"has-symbols":188}],188:[function(require,module,exports){
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

},{"./shams":189}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":186}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{"./isArguments":196}],195:[function(require,module,exports){
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

},{"./implementation":194,"./isArguments":196}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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
},{"_process":197,"through":211,"timers":212}],199:[function(require,module,exports){
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

},{"buffer":122}],200:[function(require,module,exports){
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

},{"es-abstract/es5":174,"function-bind":186}],201:[function(require,module,exports){
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

},{"./implementation":200,"./polyfill":202,"./shim":203,"define-properties":128,"function-bind":186}],202:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":200}],203:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":202,"define-properties":128}],204:[function(require,module,exports){
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
},{"safe-buffer":199}],205:[function(require,module,exports){
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
},{"./lib/default_stream":206,"./lib/results":208,"./lib/test":209,"_process":197,"defined":129,"through":211,"timers":212}],206:[function(require,module,exports){
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
},{"_process":197,"fs":104,"through":211}],207:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":197,"timers":212}],208:[function(require,module,exports){
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
},{"_process":197,"events":105,"function-bind":186,"has":190,"inherits":192,"object-inspect":210,"resumer":198,"through":211,"timers":212}],209:[function(require,module,exports){
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
},{"./next_tick":207,"deep-equal":125,"defined":129,"events":105,"has":190,"inherits":192,"path":106,"string.prototype.trim":201}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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
},{"_process":197,"stream":107}],212:[function(require,module,exports){
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
},{"process/browser.js":197,"timers":212}],213:[function(require,module,exports){
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
},{}]},{},[73]);
