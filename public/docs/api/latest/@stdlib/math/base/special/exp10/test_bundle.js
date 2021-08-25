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

},{"@stdlib/utils/native-class":95}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":95}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":95}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":95}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* The maximum base 10 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base10-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE10_EXPONENT = require( '@stdlib/constants/float64/max-base10-exponent' );
* // returns 308
*/


// MAIN //

/**
* The maximum base 10 exponent for a double-precision floating-point number.
*
* @constant
* @type {integer32}
* @default 308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE10_EXPONENT = 308|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE10_EXPONENT;

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
* The minimum base 10 exponent for a normal double-precision floating-point number.
*
* @module @stdlib/constants/float64/min-base10-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE10_EXPONENT = require( '@stdlib/constants/float64/min-base10-exponent' );
* // returns -308
*/


// MAIN //

/**
* The minimum base 10 exponent for a normal double-precision floating-point number.
*
* ```text
* 2^-1022 = 2.2250738585072014e-308 => -308
* ```
*
* @constant
* @type {integer32}
* @default -308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE10_EXPONENT = -308|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE10_EXPONENT;

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

},{"@stdlib/number/ctor":78}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isInfinite = require( './main.js' );


// EXPORTS //

module.exports = isInfinite;

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

var isnan = require( './main.js' );


// EXPORTS //

module.exports = isnan;

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

var abs = require( './main.js' );


// EXPORTS //

module.exports = abs;

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

},{"@stdlib/number/float64/base/from-words":82,"@stdlib/number/float64/base/get-high-word":86,"@stdlib/number/float64/base/to-words":91}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1991, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var MAXL10 = require( '@stdlib/constants/float64/max-base10-exponent' );
var MINL10 = require( '@stdlib/constants/float64/min-base10-exponent' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LOG210 = 3.32192809488736234787e0;
var LG102A = 3.01025390625000000000e-1;
var LG102B = 4.60503898119521373889e-6;


// MAIN //

/**
* Returns `10` raised to the `x` power.
*
* ## Method
*
* -   Range reduction is accomplished by expressing the argument as \\( 10^x = 2^n 10^f \\), with \\( |f| < 0.5 log_{10}(2) \\). The Pade' form
*
*     ```tex
*     1 + 2x \frac{P(x^2)}{Q(x^2) - P(x^2)}
*     ```
*
*     is used to approximate \\( 10^f \\).
*
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain      | # trials | peak    | rms     |
*     |:----------:|:-----------:|:--------:|:-------:|:-------:|
*     | IEEE       | -307,+307   |  30000   | 2.2e-16 | 5.5e-17 |
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp10( 3.0 );
* // returns 1000.0
*
* @example
* var v = exp10( -9.0 );
* // returns 1.0e-9
*
* @example
* var v = exp10( 0.0 );
* // returns 1.0
*
* @example
* var v = exp10( NaN );
* // returns NaN
*/
function exp10( x ) {
	var px;
	var xx;
	var n;

	if ( isnan( x ) ) {
		return x;
	}
	if ( x > MAXL10 ) {
		return PINF;
	}
	if ( x < MINL10 ) {
		return 0.0;
	}

	// Express 10^x = 10^g 2^n = 10^g 10^( n log10(2) ) = 10^( g + n log10(2) )
	px = floor( (LOG210*x) + 0.5 );
	n = px;
	x -= px * LG102A;
	x -= px * LG102B;

	// Rational approximation for exponential of the fractional part: 10^x = 1 + 2x P(x^2)/( Q(x^2) - P(x^2) )
	xx = x * x;
	px = x * polyvalP( xx );
	x = px / ( polyvalQ( xx ) - px );
	x = 1.0 + ldexp( x, 1 );

	// Multiply by power of 2:
	return ldexp( x, n );
}


// EXPORTS //

module.exports = exp10;

},{"./polyval_p.js":66,"./polyval_q.js":67,"@stdlib/constants/float64/max-base10-exponent":45,"@stdlib/constants/float64/min-base10-exponent":48,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/floor":74,"@stdlib/math/base/special/ldexp":76}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the base `10` exponential function.
*
* @module @stdlib/math/base/special/exp10
*
* @example
* var exp10 = require( '@stdlib/math/base/special/exp10' );
*
* var v = exp10( 3.0 );
* // returns 1000.0
*
* v = exp10( -9.0 );
* // returns 1.0e-9
*
* v = exp10( 0.0 );
* // returns 1.0
*
* v = exp10( NaN );
* // returns NaN
*/

// MODULES //

var exp10 = require( './exp10.js' );


// EXPORTS //

module.exports = exp10;

},{"./exp10.js":64}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 2394.2374120738828;
	}
	return 2394.2374120738828 + (x * (406.7172899368727 + (x * (11.745273255434405 + (x * 0.040996251979858706))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return 2079.608192860019;
	}
	return 2079.608192860019 + (x * (1272.0927117834513 + (x * (85.09361608493066 + (x * 1.0))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],68:[function(require,module,exports){
module.exports={"expected": [1e-300, 1.4104271176297771e-300, 1.989304654145441e-300, 2.8057692294338553e-300, 3.957333007004713e-300, 5.581529786570837e-300, 7.87234096883785e-300, 1.1103363181676776e-299, 1.5660484528328967e-299, 2.2087972053976743e-299, 3.1153474758377486e-299, 4.3939705607610377e-299, 6.197375232964286e-299, 8.740946086698842e-299, 1.2328467394419929e-298, 1.7388404731904388e-298, 2.4525077566199885e-298, 3.459083446134201e-298, 4.878785094571937e-298, 6.8811707984722175e-298, 9.705389895207363e-298, 1.3688745095370485e-297, 1.9306977288832142e-297, 2.7231084327631084e-297, 3.840745977815411e-297, 5.4170922790383495e-297, 7.64041384905858e-297, 1.0776246882626325e-296, 1.5199110829529518e-296, 2.143723807782885e-296, 3.0235661912055445e-296, 4.2645197480248803e-296, 6.014794296281995e-296, 8.483428982441038e-296, 1.1965258287321227e-295, 1.687612475788228e-295, 2.3802543999020426e-295, 3.3571753524794326e-295, 4.735051155775297e-295, 6.678444553468823e-295, 9.419459301799317e-295, 1.3285460832667803e-294, 1.873817422860295e-294, 2.642882906689303e-294, 3.727593720314801e-294, 5.257499266638462e-294, 7.415319536585552e-294, 1.0458767760290136e-293, 1.4751329666105257e-293, 2.080567538217146e-293, 2.9344888759616904e-293, 4.138882687039292e-293, 5.837592378488614e-293, 8.233498592289252e-293, 1.1612749687531357e-292, 1.6378937069540948e-292, 2.3101297000832148e-292, 3.25826957423931e-292, 4.595551764055151e-292, 6.481690828494745e-292, 9.141952512601205e-292, 1.2894057731856418e-291, 1.8186128681294187e-291, 2.565020905680198e-291, 3.6177750426586416e-291, 5.102608025649304e-291, 7.196856730011117e-291, 1.0150641893704043e-290, 1.4316740588229056e-290, 2.0192719161709146e-290, 2.8480358684357e-290, 4.0169470208239837e-290, 5.665611008252292e-290, 7.990931403980814e-290, 1.1270626347293928e-289, 1.5896397032895998e-289, 2.2420709447806046e-289, 3.1622776601683794e-289, 4.4601621653763235e-289, 6.290733667073113e-289, 8.872621353826528e-289, 1.2514185761897963e-288, 1.7650346953637338e-288, 2.489452797898423e-288, 3.511191734215257e-288, 4.9522800371347226e-288, 6.984830058471413e-288, 9.851593726503663e-288, 1.3894954943732155e-287, 1.9597821250883767e-287, 2.7641298538703967e-287, 3.898603702548841e-287, 5.498696382966738e-287, 7.755510490149058e-287, 1.0938582306368436e-286, 1.542807311332731e-286, 2.17601726918117e-286, 3.0691137648838167e-286, 4.328761281082956e-286, 6.105402296585214e-286, 8.611224963142905e-286, 1.2145505204027231e-285, 1.7130349897073586e-285, 2.416111002931905e-285, 3.407748477738836e-285, 4.806380863064449e-285, 6.779049906922909e-285, 9.561355820489688e-285, 1.3485595530525965e-284, 1.902044963364074e-284, 2.682695795279826e-284, 3.7837468980140477e-284, 5.3366992312065634e-284, 7.527025314327721e-284, 1.0616320618413615e-283, 1.4973546489660728e-283, 2.1119096016110413e-283, 2.978694572094522e-283, 4.201231599618739e-283, 5.925530975545396e-283, 8.357529574264454e-283, 1.1787686347935433e-282, 1.6625672479242445e-282, 2.3449299313554634e-282, 3.3073527641254774e-282, 4.6647800260903734e-282, 6.579332246575601e-282, 9.279668616466272e-282, 1.3088296259282025e-281, 1.8460087967663742e-281, 2.60366086634241e-281, 3.672273891000774e-281, 5.179474679231308e-281, 7.305271542664628e-281, 1.0303553085423307e-280, 1.4532410679618991e-280, 2.0496906107067206e-280, 2.890939220091897e-280, 4.0774590714370907e-280, 5.750958845380403e-280, 8.111308307896292e-280, 1.1440409196914128e-279, 1.6135863368106677e-279, 2.2758459260746608e-279, 3.2099148096829546e-279, 4.527350892858264e-279, 6.385498470312679e-279, 9.006280202112463e-279, 1.270270182603161e-278, 1.7916235122600268e-278, 2.5269543862746473e-278, 3.564084991415273e-278, 5.026882121429393e-278, 7.090050861192318e-278, 1.0000000000000001e-277, 1.410427117629777e-277, 1.9893046541454411e-277, 2.8057692294338553e-277, 3.9573330070047135e-277, 5.581529786570836e-277, 7.87234096883785e-277, 1.1103363181676776e-276, 1.5660484528328967e-276, 2.2087972053976743e-276, 3.115347475837749e-276, 4.393970560761037e-276, 6.197375232964286e-276, 8.740946086698842e-276, 1.2328467394419928e-275, 1.7388404731904388e-275, 2.4525077566199882e-275, 3.459083446134201e-275, 4.878785094571938e-275, 6.881170798472218e-275, 9.705389895207362e-275, 1.3688745095370485e-274, 1.930697728883214e-274, 2.7231084327631086e-274, 3.840745977815411e-274, 5.41709227903835e-274, 7.64041384905858e-274, 1.0776246882626324e-273, 1.5199110829529519e-273, 2.143723807782885e-273, 3.0235661912055448e-273, 4.26451974802488e-273, 6.014794296281995e-273, 8.483428982441038e-273, 1.1965258287321226e-272, 1.687612475788228e-272, 2.3802543999020426e-272, 3.3571753524794325e-272, 4.735051155774678e-272, 6.678444553468823e-272, 9.419459301799317e-272, 1.3285460832667804e-271, 1.873817422860295e-271, 2.642882906689303e-271, 3.7275937203148005e-271, 5.257499266638462e-271, 7.415319536585553e-271, 1.0458767760290137e-270, 1.4751329666105257e-270, 2.080567538217146e-270, 2.9344888759616904e-270, 4.138882687039292e-270, 5.837592378488616e-270, 8.233498592289252e-270, 1.1612749687531357e-269, 1.6378937069540948e-269, 2.3101297000832146e-269, 3.25826957423931e-269, 4.595551764055152e-269, 6.481690828494745e-269, 9.141952512601204e-269, 1.2894057731856417e-268, 1.8186128681294187e-268, 2.5650209056798623e-268, 3.617775042658642e-268, 5.102608025649305e-268, 7.196856730011117e-268, 1.0150641893704042e-267, 1.4316740588229054e-267, 2.0192719161709146e-267, 2.8480358684357003e-267, 4.016947020823983e-267, 5.665611008252291e-267, 7.990931403980814e-267, 1.127062634729393e-266, 1.5896397032896e-266, 2.2420709447806044e-266, 3.1622776601683797e-266, 4.460162165376323e-266, 6.290733667073113e-266, 8.872621353826529e-266, 1.251418576189796e-265, 1.7650346953637339e-265, 2.489452797898423e-265, 3.5111917342152567e-265, 4.952280037134723e-265, 6.984830058471413e-265, 9.851593726503663e-265, 1.3894954943730338e-264, 1.9597821250883767e-264, 2.7641298538703965e-264, 3.8986037025488406e-264, 5.498696382966739e-264, 7.755510490149058e-264, 1.0938582306368436e-263, 1.5428073113327312e-263, 2.17601726918117e-263, 3.069113764883817e-263, 4.3287612810829555e-263, 6.105402296585214e-263, 8.611224963142905e-263, 1.2145505204027232e-262, 1.7130349897073584e-262, 2.4161110029319048e-262, 3.4077484777388367e-262, 4.806380863064448e-262, 6.77904990692291e-262, 9.561355820489689e-262, 1.3485595530525964e-261, 1.9020449633640742e-261, 2.682695795279826e-261, 3.783746898014048e-261, 5.336699231206563e-261, 7.527025314327722e-261, 1.0616320618413616e-260, 1.4973546489660728e-260, 2.111909601611041e-260, 2.978694572094522e-260, 4.201231599618739e-260, 5.925530975545396e-260, 8.357529574264454e-260, 1.1787686347935432e-259, 1.6625672479242444e-259, 2.3449299313554635e-259, 3.307352764125477e-259, 4.664780026090373e-259, 6.579332246575602e-259, 9.279668616466272e-259, 1.3088296259282028e-258, 1.8460087967663743e-258, 2.60366086634241e-258, 3.672273891000774e-258, 5.179474679231307e-258, 7.305271542664629e-258, 1.0303553085423306e-257, 1.4532410679618993e-257, 2.0496906107067204e-257, 2.8909392200918974e-257, 4.0774590714370904e-257, 5.750958845380403e-257, 8.111308307896292e-257, 1.144040919691338e-256, 1.6135863368107733e-256, 2.2758459260748094e-256, 3.2099148096831647e-256, 4.5273508928585607e-256, 6.38549847031268e-256, 9.006280202112464e-256, 1.2702701826031609e-255, 1.791623512260027e-255, 2.5269543862746473e-255, 3.564084991415273e-255, 5.026882121429393e-255, 7.090050861192318e-255, 1e-254, 1.4104271176297772e-254, 1.9893046541454413e-254, 2.8057692294338554e-254, 3.957333007004713e-254, 5.581529786570836e-254, 7.87234096883785e-254, 1.1103363181676776e-253, 1.566048452832794e-253, 2.2087972053975298e-253, 3.115347475837545e-253, 4.39397056076075e-253, 6.19737523296388e-253, 8.740946086699415e-253, 1.2328467394420734e-252, 1.7388404731905526e-252, 2.4525077566201486e-252, 3.459083446134201e-252, 4.878785094571938e-252, 6.881170798472218e-252, 9.705389895207362e-252, 1.3688745095370485e-251, 1.9306977288832142e-251, 2.7231084327631087e-251, 3.8407459778154105e-251, 5.41709227903835e-251, 7.640413849058581e-251, 1.0776246882626324e-250, 1.519911082952952e-250, 2.1437238077828852e-250, 3.023566191205545e-250, 4.26451974802488e-250, 6.014794296281995e-250, 8.483428982440484e-250, 1.1965258287320444e-249, 1.6876124757881177e-249, 2.3802543999018866e-249, 3.3571753524792133e-249, 4.735051155774988e-249, 6.678444553469262e-249, 9.419459301799933e-249, 1.3285460832668673e-248, 1.8738174228604173e-248, 2.642882906689303e-248, 3.727593720314801e-248, 5.257499266638461e-248, 7.415319536585554e-248, 1.0458767760290135e-247, 1.4751329666105256e-247, 2.0805675382171462e-247, 2.93448887596169e-247, 4.1388826870392916e-247, 5.837592378488614e-247, 8.233498592289252e-247, 1.1612749687531358e-246, 1.6378937069540948e-246, 2.310129700083215e-246, 3.25826957423931e-246, 4.595551764055152e-246, 6.48169082849432e-246, 9.141952512600607e-246, 1.2894057731855573e-245, 1.8186128681292997e-245, 2.56502090568003e-245, 3.617775042658405e-245, 5.102608025649639e-245, 7.196856730011587e-245, 1.0150641893704705e-244, 1.4316740588229056e-244, 2.0192719161709145e-244, 2.8480358684357e-244, 4.016947020823983e-244, 5.6656110082522915e-244, 7.990931403980815e-244, 1.1270626347293929e-243, 1.5896397032895998e-243, 2.2420709447806047e-243, 3.162277660168379e-243, 4.460162165376323e-243, 6.290733667073113e-243, 8.872621353826529e-243, 1.2514185761897963e-242, 1.7650346953637339e-242, 2.489452797898423e-242, 3.5111917342152567e-242, 4.9522800371343985e-242, 6.984830058470956e-242, 9.851593726503019e-242, 1.3894954943731247e-241, 1.9597821250882483e-241, 2.7641298538705775e-241, 3.898603702549096e-241, 5.498696382967098e-241, 7.755510490149565e-241, 1.0938582306368435e-240, 1.5428073113327312e-240, 2.1760172691811704e-240, 3.069113764883817e-240, 4.3287612810829553e-240, 6.105402296585214e-240, 8.611224963142905e-240, 1.2145505204027231e-239, 1.7130349897073587e-239, 2.416111002931905e-239, 3.4077484777388364e-239, 4.806380863064448e-239, 6.77904990692291e-239, 9.561355820489688e-239, 1.3485595530525965e-238, 1.9020449633640742e-238, 2.6826957952796504e-238, 3.7837468980138e-238, 5.336699231206214e-238, 7.527025314327228e-238, 1.061632061841292e-237, 1.4973546489661708e-237, 2.1119096016109032e-237, 2.978694572094717e-237, 4.201231599619014e-237, 5.925530975545784e-237, 8.357529574264454e-237, 1.1787686347935433e-236, 1.6625672479242446e-236, 2.3449299313554633e-236, 3.3073527641254773e-236, 4.664780026090373e-236, 6.579332246575601e-236, 9.27966861646627e-236, 1.3088296259282025e-235, 1.846008796766374e-235, 2.60366086634241e-235, 3.672273891000774e-235, 5.179474679231308e-235, 7.305271542664628e-235, 1.0303553085423307e-234, 1.453241067961899e-234, 2.0496906107067204e-234, 2.8909392200917084e-234, 4.077459071436824e-234, 5.750958845380027e-234, 8.111308307896823e-234, 1.1440409196913381e-233, 1.6135863368107732e-233, 2.2758459260748097e-233, 3.209914809682955e-233, 4.527350892858264e-233, 6.38549847031268e-233, 9.006280202112464e-233, 1.2702701826031608e-232, 1.791623512260027e-232, 2.5269543862746474e-232, 3.5640849914152735e-232, 5.026882121429393e-232, 7.090050861192318e-232, 1e-231, 1.410427117629777e-231, 1.989304654145441e-231, 2.805769229433855e-231, 3.957333007004713e-231, 5.581529786570837e-231, 7.87234096883785e-231, 1.1103363181676776e-230, 1.5660484528328968e-230, 2.2087972053975297e-230, 3.115347475837545e-230, 4.39397056076075e-230, 6.197375232963881e-230, 8.740946086699414e-230, 1.2328467394420736e-229, 1.7388404731904386e-229, 2.4525077566199883e-229, 3.459083446134201e-229, 4.878785094571938e-229, 6.881170798472218e-229, 9.705389895207362e-229, 1.3688745095370485e-228, 1.9306977288832143e-228, 2.723108432763108e-228, 3.840745977815411e-228, 5.41709227903835e-228, 7.64041384905858e-228, 1.0776246882626325e-227, 1.5199110829529517e-227, 2.143723807782885e-227, 3.023566191205545e-227, 4.2645197480248805e-227, 6.014794296281996e-227, 8.483428982441038e-227, 1.1965258287320443e-226, 1.6876124757881177e-226, 2.3802543999018868e-226, 3.357175352479213e-226, 4.735051155774987e-226, 6.678444553469261e-226, 9.419459301799933e-226, 1.3285460832667803e-225, 1.8738174228602947e-225, 2.642882906689303e-225, 3.7275937203148004e-225, 5.2574992666384623e-225, 7.415319536585554e-225, 1.0458767760290136e-224, 1.4751329666105256e-224, 2.0805675382171462e-224, 2.9344888759616905e-224, 4.1388826870392918e-224, 5.837592378488615e-224, 8.233498592289252e-224, 1.1612749687531358e-223, 1.6378937069540948e-223, 2.3101297000832147e-223, 3.25826957423931e-223, 4.595551764055151e-223, 6.481690828494745e-223, 9.141952512600607e-223, 1.2894057731855571e-222, 1.8186128681292997e-222, 2.56502090568003e-222, 3.617775042658405e-222, 5.1026080256496383e-222, 7.196856730011588e-222, 1.0150641893704042e-221, 1.4316740588229056e-221, 2.0192719161709144e-221, 2.8480358684357e-221, 4.0169470208239833e-221, 5.665611008252291e-221, 7.990931403980815e-221, 1.1270626347293927e-220, 1.5896397032896e-220, 2.2420709447806045e-220, 3.1622776601683794e-220, 4.460162165376323e-220, 6.290733667073113e-220, 8.872621353826528e-220, 1.2514185761897962e-219, 1.7650346953637338e-219, 2.489452797898423e-219, 3.5111917342152564e-219, 4.952280037134723e-219, 6.984830058470956e-219, 9.851593726503018e-219, 1.3894954943731245e-218, 1.9597821250882484e-218, 2.7641298538705777e-218, 3.898603702549096e-218, 5.498696382966738e-218, 7.755510490149057e-218, 1.0938582306368436e-217, 1.5428073113327314e-217, 2.1760172691811703e-217, 3.069113764883817e-217, 4.328761281082955e-217, 6.105402296585214e-217, 8.611224963142905e-217, 1.2145505204027231e-216, 1.7130349897073586e-216, 2.416111002931905e-216, 3.407748477738836e-216, 4.806380863064448e-216, 6.77904990692291e-216, 9.561355820489689e-216, 1.3485595530525964e-215, 1.902044963364074e-215, 2.682695795279826e-215, 3.7837468980138003e-215, 5.336699231206214e-215, 7.527025314327228e-215, 1.061632061841292e-214, 1.497354648966171e-214, 2.111909601610903e-214, 2.978694572094717e-214, 4.2012315996187386e-214, 5.925530975545396e-214, 8.357529574264453e-214, 1.1787686347935433e-213, 1.6625672479242445e-213, 2.3449299313554633e-213, 3.307352764125477e-213, 4.664780026090374e-213, 6.579332246575602e-213, 9.279668616466273e-213, 1.3088296259282026e-212, 1.8460087967663742e-212, 2.60366086634241e-212, 3.672273891000774e-212, 5.179474679231308e-212, 7.305271542664628e-212, 1.0303553085423307e-211, 1.4532410679618993e-211, 2.0496906107067206e-211, 2.8909392200917084e-211, 4.077459071436824e-211, 5.750958845380028e-211, 8.111308307896823e-211, 1.1440409196913381e-210, 1.6135863368107732e-210, 2.275845926074661e-210, 3.2099148096829546e-210, 4.527350892858264e-210, 6.385498470312679e-210, 9.006280202112463e-210, 1.270270182603161e-209, 1.7916235122600268e-209, 2.5269543862746476e-209, 3.564084991415273e-209, 5.026882121429393e-209, 7.090050861192318e-209, 1e-208, 1.410427117629777e-208, 1.989304654145441e-208, 2.805769229433855e-208, 3.957333007004713e-208, 5.581529786570836e-208, 7.87234096883785e-208, 1.1103363181676775e-207, 1.566048452832794e-207, 2.20879720539753e-207, 3.115347475837545e-207, 4.39397056076075e-207, 6.1973752329638805e-207, 8.740946086699414e-207, 1.2328467394420734e-206, 1.738840473190439e-206, 2.4525077566199883e-206, 3.459083446134201e-206, 4.8787850945719374e-206, 6.881170798472217e-206, 9.705389895207362e-206, 1.3688745095370483e-205, 1.930697728883214e-205, 2.723108432763108e-205, 3.840745977815411e-205, 5.41709227903835e-205, 7.64041384905858e-205, 1.0776246882626325e-204, 1.5199110829529518e-204, 2.143723807782885e-204, 3.023566191205545e-204, 4.26451974802488e-204, 6.014794296281995e-204, 8.483428982441039e-204, 1.1965258287320443e-203, 1.6876124757881175e-203, 2.3802543999018868e-203, 3.3571753524792127e-203, 4.7350511557749875e-203, 6.678444553469261e-203, 9.419459301799934e-203, 1.3285460832667802e-202, 1.8738174228602948e-202, 2.642882906689303e-202, 3.727593720314801e-202, 5.257499266638462e-202, 7.415319536585553e-202, 1.0458767760290136e-201, 1.4751329666105256e-201, 2.080567538217146e-201, 2.9344888759616903e-201, 4.138882687039292e-201, 5.8375923784886146e-201, 8.233498592289252e-201, 1.1612749687531358e-200, 1.6378937069540948e-200, 2.310129700083215e-200, 3.25826957423931e-200, 4.595551764055151e-200, 6.481690828494744e-200, 9.141952512600607e-200, 1.2894057731855572e-199, 1.8186128681292995e-199, 2.56502090568003e-199, 3.6177750426584053e-199, 5.102608025649638e-199, 7.196856730011117e-199, 1.0150641893704043e-198, 1.4316740588229054e-198, 2.0192719161709147e-198, 2.8480358684357e-198, 4.016947020823983e-198, 5.665611008252291e-198, 7.990931403980815e-198, 1.1270626347293928e-197, 1.5896397032895998e-197, 2.2420709447806046e-197, 3.162277660168379e-197, 4.460162165376323e-197, 6.290733667073112e-197, 8.872621353826528e-197, 1.251418576189796e-196, 1.765034695363734e-196, 2.489452797898423e-196, 3.511191734215257e-196, 4.952280037134399e-196, 6.984830058470956e-196, 9.851593726503017e-196, 1.3894954943731247e-195, 1.9597821250882482e-195, 2.7641298538705775e-195, 3.898603702549095e-195, 5.498696382966738e-195, 7.755510490149057e-195, 1.0938582306368435e-194, 1.542807311332731e-194, 2.1760172691811703e-194, 3.0691137648838166e-194, 4.328761281082955e-194, 6.105402296585214e-194, 8.611224963142905e-194, 1.214550520402723e-193, 1.7130349897073586e-193, 2.4161110029319046e-193, 3.407748477738836e-193, 4.806380863064448e-193, 6.77904990692291e-193, 9.561355820489689e-193, 1.3485595530525965e-192, 1.902044963364074e-192, 2.682695795279826e-192, 3.7837468980138e-192, 5.3366992312062144e-192, 7.527025314327229e-192, 1.061632061841292e-191, 1.4973546489661707e-191, 2.111909601610903e-191, 2.978694572094522e-191, 4.201231599618739e-191, 5.925530975545395e-191, 8.357529574264455e-191, 1.1787686347935433e-190, 1.6625672479242445e-190, 2.3449299313554633e-190, 3.3073527641254776e-190, 4.664780026090373e-190, 6.579332246575602e-190, 9.279668616466273e-190, 1.3088296259282026e-189, 1.846008796766374e-189, 2.6036608663424106e-189, 3.672273891000774e-189, 5.179474679231308e-189, 7.305271542664628e-189, 1.0303553085423306e-188, 1.453241067961899e-188, 2.0496906107065863e-188, 2.890939220091708e-188, 4.0774590714368244e-188, 5.750958845380026e-188, 8.111308307896823e-188, 1.1440409196913381e-187, 1.613586336810773e-187, 2.2758459260746606e-187, 3.2099148096829544e-187, 4.527350892858264e-187, 6.385498470312679e-187, 9.006280202112464e-187, 1.270270182603161e-186, 1.7916235122600268e-186, 2.5269543862746475e-186, 3.5640849914152733e-186, 5.0268821214293935e-186, 7.090050861192318e-186, 1e-185, 1.410427117629777e-185, 1.9893046541454412e-185, 2.8057692294338553e-185, 3.957333007004713e-185, 5.581529786570837e-185, 7.87234096883785e-185, 1.1103363181676775e-184, 1.566048452832794e-184, 2.20879720539753e-184, 3.115347475837545e-184, 4.39397056076075e-184, 6.19737523296388e-184, 8.740946086699414e-184, 1.2328467394420734e-183, 1.7388404731904387e-183, 2.452507756619988e-183, 3.459083446134201e-183, 4.878785094571938e-183, 6.881170798472218e-183, 9.705389895207362e-183, 1.3688745095370484e-182, 1.930697728883214e-182, 2.7231084327631086e-182, 3.840745977815411e-182, 5.41709227903835e-182, 7.64041384905858e-182, 1.0776246882626324e-181, 1.5199110829529519e-181, 2.143723807782885e-181, 3.023566191205545e-181, 4.2645197480248804e-181, 6.014794296281995e-181, 8.483428982441038e-181, 1.1965258287320444e-180, 1.6876124757881176e-180, 2.380254399901887e-180, 3.357175352479213e-180, 4.735051155774987e-180, 6.6784445534692606e-180, 9.419459301799317e-180, 1.3285460832667803e-179, 1.8738174228602947e-179, 2.642882906689303e-179, 3.7275937203148005e-179, 5.257499266638462e-179, 7.415319536585553e-179, 1.0458767760290137e-178, 1.4751329666105256e-178, 2.080567538217146e-178, 2.93448887596169e-178, 4.138882687039292e-178, 5.837592378488615e-178, 8.233498592289252e-178, 1.1612749687531357e-177, 1.6378937069540948e-177, 2.3101297000832146e-177, 3.25826957423931e-177, 4.595551764055151e-177, 6.48169082849432e-177, 9.141952512600606e-177, 1.2894057731855572e-176, 1.8186128681292996e-176, 2.56502090568003e-176, 3.617775042658405e-176, 5.102608025649638e-176, 7.196856730011116e-176, 1.0150641893704042e-175, 1.4316740588229056e-175, 2.0192719161709146e-175, 2.8480358684357e-175, 4.0169470208239834e-175, 5.665611008252292e-175, 7.990931403980815e-175, 1.1270626347293928e-174, 1.5896397032896e-174, 2.2420709447806047e-174, 3.1622776601683797e-174, 4.460162165376323e-174, 6.290733667073112e-174, 8.87262135382653e-174, 1.2514185761897962e-173, 1.765034695363734e-173, 2.4894527978984228e-173, 3.511191734215257e-173, 4.9522800371343985e-173, 6.984830058470956e-173, 9.851593726503017e-173, 1.3894954943731248e-172, 1.9597821250882484e-172, 2.7641298538705775e-172, 3.898603702549096e-172, 5.498696382967099e-172, 7.755510490149566e-172, 1.0938582306368435e-171, 1.5428073113327314e-171, 2.17601726918117e-171, 3.0691137648838167e-171, 4.3287612810829555e-171, 6.105402296585215e-171, 8.611224963142906e-171, 1.2145505204027231e-170, 1.7130349897073587e-170, 2.4161110029319048e-170, 3.4077484777388366e-170, 4.806380863064448e-170, 6.779049906922909e-170, 9.561355820489062e-170, 1.3485595530525083e-169, 1.9020449633639494e-169, 2.6826957952796506e-169, 3.7837468980138005e-169, 5.336699231206214e-169, 7.527025314327229e-169, 1.061632061841292e-168, 1.4973546489661709e-168, 2.111909601610903e-168, 2.978694572094717e-168, 4.201231599619014e-168, 5.925530975545784e-168, 8.357529574264454e-168, 1.1787686347935434e-167, 1.6625672479242447e-167, 2.3449299313554636e-167, 3.3073527641254774e-167, 4.664780026090373e-167, 6.5793322465756016e-167, 9.279668616466272e-167, 1.3088296259282025e-166, 1.846008796766374e-166, 2.60366086634241e-166, 3.6722738910007736e-166, 5.179474679231308e-166, 7.30527154266415e-166, 1.0303553085422632e-165, 1.4532410679618043e-165, 2.0496906107065865e-165, 2.8909392200917085e-165, 4.077459071436824e-165, 5.750958845380027e-165, 8.111308307896823e-165, 1.144040919691338e-164, 1.6135863368107733e-164, 2.27584592607481e-164, 3.2099148096831647e-164, 4.52735089285856e-164, 6.38549847031268e-164, 9.006280202112463e-164, 1.2702701826031609e-163, 1.7916235122600268e-163, 2.5269543862746473e-163, 3.564084991415273e-163, 5.026882121429393e-163, 7.090050861192318e-163, 1e-162, 1.410427117629777e-162, 1.989304654145441e-162, 2.805769229433855e-162, 3.9573330070047134e-162, 5.58152978657047e-162, 7.872340968837334e-162, 1.1103363181676049e-161, 1.5660484528327942e-161, 2.2087972053975298e-161, 3.115347475837545e-161, 4.39397056076075e-161, 6.19737523296388e-161, 8.740946086699414e-161, 1.2328467394420735e-160, 1.7388404731905525e-160, 2.452507756620149e-160, 3.459083446134201e-160, 4.878785094571938e-160, 6.881170798472218e-160, 9.705389895207362e-160, 1.3688745095370484e-159, 1.9306977288832142e-159, 2.7231084327631086e-159, 3.840745977815411e-159, 5.41709227903835e-159, 7.64041384905858e-159, 1.0776246882626324e-158, 1.5199110829529518e-158, 2.143723807782885e-158, 3.023566191205347e-158, 4.264519748024601e-158, 6.014794296281602e-158, 8.483428982440482e-158, 1.1965258287320443e-157, 1.6876124757881176e-157, 2.3802543999018866e-157, 3.357175352479213e-157, 4.735051155774988e-157, 6.67844455346926e-157, 9.419459301799933e-157, 1.3285460832668674e-156, 1.8738174228604177e-156, 2.642882906689303e-156, 3.727593720314801e-156, 5.257499266638462e-156, 7.415319536585553e-156, 1.0458767760290136e-155, 1.4751329666105256e-155, 2.080567538217146e-155, 2.9344888759616904e-155, 4.138882687039291e-155, 5.837592378488615e-155, 8.233498592289252e-155, 1.1612749687531359e-154, 1.6378937069540948e-154, 2.3101297000830636e-154, 3.258269574239097e-154, 4.5955517640548504e-154, 6.48169082849432e-154, 9.141952512600606e-154, 1.2894057731855572e-153, 1.8186128681292997e-153, 2.56502090568003e-153, 3.617775042658405e-153, 5.102608025649639e-153, 7.196856730011588e-153, 1.0150641893704706e-152, 1.4316740588229055e-152, 2.0192719161709147e-152, 2.8480358684357e-152, 4.0169470208239835e-152, 5.665611008252292e-152, 7.990931403980815e-152, 1.1270626347293928e-151, 1.5896397032896e-151, 2.2420709447806047e-151, 3.162277660168379e-151, 4.460162165376323e-151, 6.290733667073113e-151, 8.872621353826528e-151, 1.2514185761897141e-150, 1.7650346953636183e-150, 2.48945279789826e-150, 3.5111917342150274e-150, 4.952280037134399e-150, 6.984830058470956e-150, 9.851593726503017e-150, 1.3894954943731247e-149, 1.9597821250882485e-149, 2.7641298538705777e-149, 3.8986037025490956e-149, 5.498696382967098e-149, 7.755510490149565e-149, 1.0938582306368435e-148, 1.5428073113327312e-148, 2.1760172691811703e-148, 3.0691137648838168e-148, 4.328761281082955e-148, 6.105402296585214e-148, 8.611224963142905e-148, 1.2145505204027232e-147, 1.7130349897073588e-147, 2.4161110029319048e-147, 3.4077484777388365e-147, 4.8063808630644477e-147, 6.77904990692291e-147, 9.561355820489062e-147, 1.348559553052508e-146, 1.9020449633639497e-146, 2.6826957952796504e-146, 3.7837468980138e-146, 5.336699231206214e-146, 7.527025314327229e-146, 1.0616320618412921e-145, 1.4973546489661708e-145, 2.111909601610903e-145, 2.978694572094717e-145, 4.201231599619014e-145, 5.9255309755457836e-145, 8.357529574264455e-145, 1.1787686347935433e-144, 1.6625672479242445e-144, 2.3449299313554635e-144, 3.3073527641254775e-144, 4.6647800260903733e-144, 6.579332246575602e-144, 9.279668616466272e-144, 1.3088296259282024e-143, 1.8460087967663742e-143, 2.60366086634241e-143, 3.672273891000774e-143, 5.179474679231308e-143, 7.30527154266415e-143, 1.0303553085422633e-142, 1.4532410679618041e-142, 2.0496906107065864e-142, 2.890939220091708e-142, 4.0774590714368236e-142, 5.750958845380027e-142, 8.111308307896822e-142, 1.144040919691338e-141, 1.6135863368107732e-141, 2.2758459260748097e-141, 3.2099148096831646e-141, 4.5273508928582644e-141, 6.38549847031268e-141, 9.006280202112463e-141, 1.2702701826031608e-140, 1.791623512260027e-140, 2.526954386274647e-140, 3.5640849914152732e-140, 5.026882121429393e-140, 7.090050861192318e-140, 1e-139, 1.410427117629777e-139, 1.989304654145441e-139, 2.8057692294338553e-139, 3.957333007004455e-139, 5.5815297865704716e-139, 7.872340968837334e-139, 1.110336318167605e-138, 1.566048452832794e-138, 2.2087972053975298e-138, 3.115347475837545e-138, 4.39397056076075e-138, 6.19737523296388e-138, 8.740946086699414e-138, 1.2328467394420736e-137, 1.7388404731905525e-137, 2.4525077566201486e-137, 3.459083446134201e-137, 4.878785094571938e-137, 6.881170798472218e-137, 9.705389895207362e-137, 1.3688745095370484e-136, 1.930697728883214e-136, 2.7231084327631087e-136, 3.840745977815411e-136, 5.41709227903835e-136, 7.640413849058581e-136, 1.0776246882626325e-135, 1.5199110829529517e-135, 2.143723807782885e-135, 3.0235661912053467e-135, 4.2645197480246015e-135, 6.014794296281602e-135, 8.483428982440483e-135, 1.1965258287320444e-134, 1.6876124757881176e-134, 2.380254399901887e-134, 3.357175352479213e-134, 4.735051155774988e-134, 6.678444553469261e-134, 9.419459301799934e-134, 1.3285460832668673e-133, 1.873817422860295e-133, 2.642882906689303e-133, 3.727593720314801e-133, 5.257499266638462e-133, 7.415319536585553e-133, 1.0458767760290137e-132, 1.4751329666105256e-132, 2.080567538217146e-132, 2.9344888759616904e-132, 4.1388826870392916e-132, 5.837592378488615e-132, 8.233498592289252e-132, 1.1612749687531358e-131, 1.6378937069539874e-131, 2.3101297000830637e-131, 3.258269574239097e-131, 4.595551764054851e-131, 6.48169082849432e-131, 9.141952512600607e-131, 1.2894057731855572e-130, 1.8186128681292997e-130, 2.56502090568003e-130, 3.617775042658405e-130, 5.102608025649638e-130, 7.196856730011587e-130, 1.0150641893704706e-129, 1.4316740588229056e-129, 2.0192719161709145e-129, 2.8480358684357e-129, 4.0169470208239834e-129, 5.6656110082522915e-129, 7.990931403980814e-129, 1.1270626347293928e-128, 1.5896397032896e-128, 2.2420709447806045e-128, 3.1622776601683794e-128, 4.460162165376323e-128, 6.290733667073112e-128, 8.872621353826528e-128, 1.251418576189714e-127, 1.7650346953636183e-127, 2.48945279789826e-127, 3.511191734215027e-127, 4.952280037134398e-127, 6.984830058470956e-127, 9.851593726503017e-127, 1.3894954943731247e-126, 1.9597821250882484e-126, 2.7641298538705774e-126, 3.898603702549096e-126, 5.4986963829670984e-126, 7.755510490149565e-126, 1.0938582306368435e-125, 1.5428073113327313e-125, 2.1760172691811703e-125, 3.0691137648838165e-125, 4.3287612810829557e-125, 6.105402296585214e-125, 8.611224963142906e-125, 1.214550520402723e-124, 1.7130349897073586e-124, 2.4161110029319048e-124, 3.4077484777388362e-124, 4.806380863064448e-124, 6.77904990692291e-124, 9.561355820489062e-124, 1.3485595530525082e-123, 1.9020449633639495e-123, 2.6826957952796505e-123, 3.7837468980138005e-123, 5.3366992312062145e-123, 7.527025314327229e-123, 1.061632061841292e-122, 1.497354648966171e-122, 2.111909601610903e-122, 2.978694572094717e-122, 4.2012315996190137e-122, 5.925530975545396e-122, 8.357529574264455e-122, 1.1787686347935433e-121, 1.6625672479242446e-121, 2.3449299313554633e-121, 3.3073527641254774e-121, 4.664780026090373e-121, 6.579332246575602e-121, 9.279668616466273e-121, 1.3088296259282026e-120, 1.846008796766374e-120, 2.60366086634241e-120, 3.672273891000774e-120, 5.179474679230969e-120, 7.30527154266415e-120, 1.0303553085422633e-119, 1.453241067961804e-119, 2.0496906107065863e-119, 2.8909392200917083e-119, 4.0774590714368237e-119, 5.750958845380027e-119, 8.111308307896823e-119, 1.144040919691338e-118, 1.6135863368107732e-118, 2.2758459260748096e-118, 3.2099148096831645e-118, 4.527350892858264e-118, 6.38549847031268e-118, 9.006280202112463e-118, 1.2702701826031609e-117, 1.791623512260027e-117, 2.5269543862746474e-117, 3.564084991415273e-117, 5.026882121429393e-117, 7.090050861192318e-117, 1e-116, 1.4104271176297772e-116, 1.9893046541454412e-116, 2.8057692294338555e-116, 3.9573330070044545e-116, 5.581529786570471e-116, 7.872340968837335e-116, 1.110336318167605e-115, 1.5660484528327942e-115, 2.20879720539753e-115, 3.1153474758375446e-115, 4.39397056076075e-115, 6.19737523296388e-115, 8.740946086699415e-115, 1.2328467394420735e-114, 1.7388404731905524e-114, 2.4525077566199884e-114, 3.459083446134201e-114, 4.878785094571937e-114, 6.881170798472218e-114, 9.70538989520736e-114, 1.3688745095370485e-113, 1.930697728883214e-113, 2.7231084327631084e-113, 3.8407459778154113e-113, 5.41709227903835e-113, 7.64041384905858e-113, 1.0776246882626324e-112, 1.519911082952952e-112, 2.143723807782745e-112, 3.023566191205347e-112, 4.264519748024601e-112, 6.014794296281601e-112, 8.483428982440483e-112, 1.1965258287320443e-111, 1.6876124757881176e-111, 2.3802543999018867e-111, 3.357175352479213e-111, 4.7350511557749875e-111, 6.67844455346926e-111, 9.419459301799934e-111, 1.3285460832668673e-110, 1.8738174228602946e-110, 2.642882906689303e-110, 3.727593720314801e-110, 5.257499266638462e-110, 7.415319536585553e-110, 1.0458767760290137e-109, 1.4751329666105255e-109, 2.080567538217146e-109, 2.9344888759616903e-109, 4.1388826870392917e-109, 5.837592378488615e-109, 8.233498592289253e-109, 1.1612749687531356e-108, 1.6378937069539875e-108, 2.3101297000830635e-108, 3.258269574239097e-108, 4.59555176405485e-108, 6.48169082849432e-108, 9.141952512600606e-108, 1.2894057731855573e-107, 1.8186128681292996e-107, 2.56502090568003e-107, 3.6177750426584055e-107, 5.102608025649639e-107, 7.196856730011587e-107, 1.0150641893704706e-106, 1.4316740588229056e-106, 2.0192719161709146e-106, 2.8480358684357003e-106, 4.0169470208239837e-106, 5.665611008252292e-106, 7.990931403980815e-106, 1.127062634729393e-105, 1.5896397032896e-105, 2.2420709447806045e-105, 3.1622776601683793e-105, 4.460162165376323e-105, 6.2907336670731124e-105, 8.872621353826529e-105, 1.2514185761897143e-104, 1.7650346953636183e-104, 2.48945279789826e-104, 3.5111917342150266e-104, 4.952280037134399e-104, 6.984830058470956e-104, 9.851593726503017e-104, 1.3894954943731247e-103, 1.9597821250882484e-103, 2.7641298538705775e-103, 3.898603702549096e-103, 5.498696382967097e-103, 7.755510490149057e-103, 1.0938582306368437e-102, 1.5428073113327313e-102, 2.1760172691811705e-102, 3.069113764883817e-102, 4.328761281082956e-102, 6.105402296585214e-102, 8.611224963142905e-102, 1.2145505204027232e-101, 1.7130349897073587e-101, 2.416111002931905e-101, 3.407748477738837e-101, 4.806380863064448e-101, 6.779049906922467e-101, 9.561355820489064e-101, 1.3485595530525083e-100, 1.9020449633639495e-100, 2.6826957952796504e-100, 3.7837468980138e-100, 5.336699231206215e-100, 7.527025314327229e-100, 1.061632061841292e-99, 1.4973546489661708e-99, 2.111909601610903e-99, 2.978694572094717e-99, 4.201231599619014e-99, 5.925530975545396e-99, 8.357529574264454e-99, 1.1787686347935432e-98, 1.6625672479242445e-98, 2.3449299313554635e-98, 3.3073527641254776e-98, 4.664780026090373e-98, 6.579332246575601e-98, 9.279668616466272e-98, 1.3088296259282025e-97, 1.8460087967663742e-97, 2.6036608663424103e-97, 3.672273891000774e-97, 5.179474679230969e-97, 7.305271542664149e-97, 1.0303553085422632e-96, 1.453241067961804e-96, 2.0496906107065864e-96, 2.8909392200917082e-96, 4.077459071436824e-96, 5.750958845380027e-96, 8.111308307896823e-96, 1.144040919691338e-95, 1.613586336810773e-95, 2.2758459260748097e-95, 3.209914809682954e-95, 4.5273508928582646e-95, 6.385498470312679e-95, 9.006280202112464e-95, 1.270270182603161e-94, 1.791623512260027e-94, 2.5269543862746476e-94, 3.5640849914152733e-94, 5.026882121429393e-94, 7.090050861192318e-94, 1e-93, 1.4104271176297772e-93, 1.989304654145441e-93, 2.805769229433672e-93, 3.957333007004455e-93, 5.581529786570471e-93, 7.872340968837335e-93, 1.110336318167605e-92, 1.5660484528327942e-92, 2.2087972053975296e-92, 3.115347475837545e-92, 4.39397056076075e-92, 6.19737523296388e-92, 8.740946086699414e-92, 1.2328467394420736e-91, 1.7388404731905527e-91, 2.4525077566199882e-91, 3.459083446134201e-91, 4.8787850945719375e-91, 6.881170798472217e-91, 9.705389895207362e-91, 1.3688745095370484e-90, 1.9306977288832142e-90, 2.7231084327631085e-90, 3.840745977815411e-90, 5.41709227903835e-90, 7.64041384905858e-90, 1.0776246882626324e-89, 1.5199110829529517e-89, 2.1437238077827444e-89, 3.023566191205347e-89, 4.2645197480246015e-89, 6.014794296281601e-89, 8.483428982440482e-89, 1.1965258287320444e-88, 1.6876124757881178e-88, 2.3802543999018868e-88, 3.3571753524792135e-88, 4.735051155774988e-88, 6.678444553469261e-88, 9.419459301799933e-88, 1.3285460832668672e-87, 1.8738174228602948e-87, 2.642882906689303e-87, 3.727593720314801e-87, 5.257499266638462e-87, 7.415319536585553e-87, 1.0458767760290135e-86, 1.4751329666105256e-86, 2.080567538217146e-86, 2.9344888759616906e-86, 4.1388826870392914e-86, 5.837592378488615e-86, 8.233498592289252e-86, 1.1612749687531357e-85, 1.6378937069539874e-85, 2.3101297000830635e-85, 3.258269574239097e-85, 4.59555176405485e-85, 6.48169082849432e-85, 9.141952512600606e-85, 1.2894057731855573e-84, 1.8186128681292998e-84, 2.5650209056800303e-84, 3.6177750426584054e-84, 5.102608025649639e-84, 7.1968567300115875e-84, 1.0150641893704043e-83, 1.4316740588229055e-83, 2.0192719161709147e-83, 2.8480358684357e-83, 4.016947020823983e-83, 5.665611008252291e-83, 7.990931403980815e-83, 1.1270626347293928e-82, 1.5896397032896e-82, 2.2420709447806046e-82, 3.1622776601683793e-82, 4.460162165376323e-82, 6.290733667073113e-82, 8.872621353825948e-82, 1.2514185761897143e-81, 1.7650346953636183e-81, 2.48945279789826e-81, 3.511191734215027e-81, 4.952280037134399e-81, 6.984830058470956e-81, 9.851593726503017e-81, 1.3894954943731246e-80, 1.9597821250882482e-80, 2.7641298538705777e-80, 3.8986037025490955e-80, 5.498696382967098e-80, 7.755510490149058e-80, 1.0938582306368435e-79, 1.5428073113327312e-79, 2.1760172691811702e-79, 3.069113764883817e-79, 4.3287612810829554e-79, 6.105402296585214e-79, 8.611224963142906e-79, 1.214550520402723e-78, 1.7130349897073588e-78, 2.4161110029319046e-78, 3.407748477738836e-78, 4.806380863064448e-78, 6.779049906922467e-78, 9.561355820489063e-78, 1.3485595530525081e-77, 1.9020449633639497e-77, 2.6826957952796503e-77, 3.7837468980138e-77, 5.336699231206215e-77, 7.527025314327229e-77, 1.0616320618412921e-76, 1.497354648966171e-76, 2.111909601610903e-76, 2.978694572094717e-76, 4.201231599618739e-76, 5.925530975545396e-76, 8.357529574264455e-76, 1.1787686347935432e-75, 1.6625672479242445e-75, 2.3449299313554635e-75, 3.3073527641254773e-75, 4.664780026090373e-75, 6.579332246575602e-75, 9.27966861646627e-75, 1.3088296259282026e-74, 1.846008796766374e-74, 2.60366086634241e-74, 3.672273891000533e-74, 5.179474679230968e-74, 7.30527154266415e-74, 1.0303553085422633e-73, 1.453241067961804e-73, 2.0496906107065866e-73, 2.890939220091708e-73, 4.077459071436824e-73, 5.750958845380027e-73, 8.111308307896823e-73, 1.144040919691338e-72, 1.6135863368107732e-72, 2.27584592607481e-72, 3.209914809682955e-72, 4.5273508928582644e-72, 6.385498470312679e-72, 9.006280202112464e-72, 1.2702701826031608e-71, 1.7916235122600268e-71, 2.5269543862746474e-71, 3.5640849914152734e-71, 5.026882121429393e-71, 7.090050861192318e-71, 9.999999999999998e-71, 1.4104271176297771e-70, 1.989304654145441e-70, 2.8057692294336715e-70, 3.957333007004455e-70, 5.581529786570471e-70, 7.872340968837335e-70, 1.110336318167605e-69, 1.566048452832794e-69, 2.2087972053975299e-69, 3.115347475837545e-69, 4.39397056076075e-69, 6.197375232963881e-69, 8.740946086699414e-69, 1.2328467394420734e-68, 1.7388404731905525e-68, 2.452507756619988e-68, 3.459083446134201e-68, 4.878785094571937e-68, 6.881170798472218e-68, 9.705389895207362e-68, 1.3688745095370484e-67, 1.930697728883214e-67, 2.7231084327631085e-67, 3.840745977815411e-67, 5.41709227903835e-67, 7.64041384905858e-67, 1.0776246882626325e-66, 1.5199110829529518e-66, 2.1437238077827447e-66, 3.0235661912053467e-66, 4.264519748024601e-66, 6.014794296281601e-66, 8.483428982440482e-66, 1.1965258287320442e-65, 1.6876124757881177e-65, 2.380254399901887e-65, 3.357175352479213e-65, 4.735051155774988e-65, 6.678444553469261e-65, 9.419459301799933e-65, 1.3285460832667804e-64, 1.8738174228602948e-64, 2.642882906689303e-64, 3.7275937203148006e-64, 5.257499266638462e-64, 7.415319536585554e-64, 1.0458767760290138e-63, 1.4751329666105257e-63, 2.0805675382171462e-63, 2.9344888759616904e-63, 4.1388826870392916e-63, 5.837592378488615e-63, 8.233498592289252e-63, 1.1612749687530598e-62, 1.6378937069539876e-62, 2.3101297000830636e-62, 3.258269574239097e-62, 4.59555176405485e-62, 6.4816908284943205e-62, 9.141952512600606e-62, 1.2894057731855572e-61, 1.8186128681292995e-61, 2.56502090568003e-61, 3.617775042658405e-61, 5.102608025649638e-61, 7.196856730011587e-61, 1.0150641893704042e-60, 1.4316740588229055e-60, 2.0192719161709144e-60, 2.8480358684357003e-60, 4.0169470208239836e-60, 5.665611008252292e-60, 7.990931403980815e-60, 1.127062634729393e-59, 1.5896397032895999e-59, 2.2420709447806045e-59, 3.1622776601683796e-59, 4.460162165376323e-59, 6.290733667073112e-59, 8.872621353825948e-59, 1.2514185761897143e-58, 1.7650346953636183e-58, 2.48945279789826e-58, 3.511191734215027e-58, 4.9522800371343984e-58, 6.984830058470956e-58, 9.851593726503018e-58, 1.3894954943731247e-57, 1.9597821250882483e-57, 2.7641298538705774e-57, 3.8986037025490957e-57, 5.498696382966738e-57, 7.755510490149058e-57, 1.0938582306368436e-56, 1.5428073113327313e-56, 2.1760172691811704e-56, 3.0691137648838168e-56, 4.328761281082955e-56, 6.105402296585215e-56, 8.611224963142905e-56, 1.2145505204027231e-55, 1.713034989707359e-55, 2.416111002931905e-55, 3.4077484777388365e-55, 4.8063808630641334e-55, 6.779049906922466e-55, 9.561355820489062e-55, 1.3485595530525082e-54, 1.9020449633639498e-54, 2.682695795279651e-54, 3.7837468980138e-54, 5.336699231206215e-54, 7.527025314327229e-54, 1.061632061841292e-53, 1.497354648966171e-53, 2.111909601610903e-53, 2.978694572094717e-53, 4.201231599618739e-53, 5.925530975545397e-53, 8.357529574264453e-53, 1.1787686347935432e-52, 1.6625672479242446e-52, 2.3449299313554632e-52, 3.3073527641254774e-52, 4.6647800260903735e-52, 6.5793322465756015e-52, 9.279668616466271e-52, 1.3088296259282026e-51, 1.846008796766374e-51, 2.6036608663424102e-51, 3.6722738910005335e-51, 5.179474679230969e-51, 7.30527154266415e-51, 1.0303553085422633e-50, 1.453241067961804e-50, 2.0496906107065863e-50, 2.890939220091708e-50, 4.077459071436824e-50, 5.750958845380026e-50, 8.111308307896822e-50, 1.144040919691338e-49, 1.6135863368107732e-49, 2.2758459260748097e-49, 3.2099148096829547e-49, 4.527350892858264e-49, 6.385498470312679e-49, 9.006280202112464e-49, 1.2702701826031608e-48, 1.791623512260027e-48, 2.5269543862746474e-48, 3.5640849914152735e-48, 5.026882121429393e-48, 7.090050861192317e-48, 1e-47, 1.410427117629777e-47, 1.989304654145441e-47, 2.8057692294336716e-47, 3.957333007004454e-47, 5.581529786570472e-47, 7.872340968837334e-47, 1.110336318167605e-46, 1.5660484528327942e-46, 2.20879720539753e-46, 3.115347475837545e-46, 4.3939705607607494e-46, 6.1973752329638806e-46, 8.740946086699414e-46, 1.2328467394420735e-45, 1.7388404731904388e-45, 2.4525077566199885e-45, 3.459083446134201e-45, 4.8787850945719374e-45, 6.881170798472218e-45, 9.705389895207361e-45, 1.3688745095370485e-44, 1.9306977288832142e-44, 2.7231084327631084e-44, 3.840745977815411e-44, 5.41709227903835e-44, 7.64041384905858e-44, 1.0776246882626325e-43, 1.5199110829529517e-43, 2.143723807782885e-43, 3.023566191205545e-43, 4.26451974802488e-43, 6.014794296281995e-43, 8.483428982441038e-43, 1.196525828731966e-42, 1.687612475788007e-42, 2.380254399901731e-42, 3.357175352478993e-42, 4.735051155774678e-42, 6.678444553468824e-42, 9.419459301799317e-42, 1.3285460832667804e-41, 1.873817422860295e-41, 2.642882906689303e-41, 3.727593720314801e-41, 5.257499266638462e-41, 7.415319536585554e-41, 1.0458767760290136e-40, 1.4751329666105256e-40, 2.080567538217146e-40, 2.9344888759616904e-40, 4.1388826870392915e-40, 5.8375923784886146e-40, 8.233498592289252e-40, 1.1612749687531358e-39, 1.6378937069540947e-39, 2.310129700083215e-39, 3.25826957423931e-39, 4.595551764055151e-39, 6.481690828494744e-39, 9.141952512600009e-39, 1.2894057731854728e-38, 1.8186128681291806e-38, 2.5650209056798624e-38, 3.6177750426581685e-38, 5.102608025649304e-38, 7.196856730011117e-38, 1.0150641893704042e-37, 1.4316740588229054e-37, 2.0192719161709145e-37, 2.8480358684357e-37, 4.016947020823984e-37, 5.6656110082522914e-37, 7.990931403980815e-37, 1.1270626347293928e-36, 1.5896397032896e-36, 2.242070944780605e-36, 3.1622776601683796e-36, 4.460162165376323e-36, 6.290733667073113e-36, 8.872621353826528e-36, 1.2514185761897963e-35, 1.7650346953637338e-35, 2.489452797898423e-35, 3.5111917342152564e-35, 4.952280037134723e-35, 6.984830058470499e-35, 9.851593726502372e-35, 1.3894954943730338e-34, 1.95978212508812e-34, 2.7641298538703964e-34, 3.898603702548841e-34, 5.498696382966739e-34, 7.755510490149059e-34, 1.0938582306368435e-33, 1.5428073113327314e-33, 2.1760172691811703e-33, 3.0691137648838168e-33, 4.328761281082955e-33, 6.105402296585214e-33, 8.611224963142905e-33, 1.2145505204027232e-32, 1.7130349897073587e-32, 2.4161110029319048e-32, 3.4077484777388366e-32, 4.806380863064448e-32, 6.77904990692291e-32, 9.561355820489688e-32, 1.3485595530525964e-31, 1.9020449633640742e-31, 2.682695795279826e-31, 3.7837468980135524e-31, 5.336699231205865e-31, 7.527025314326736e-31, 1.0616320618412225e-30, 1.4973546489660729e-30, 2.1119096016107648e-30, 2.978694572094522e-30, 4.201231599618739e-30, 5.925530975545396e-30, 8.357529574264453e-30, 1.1787686347935432e-29, 1.6625672479242445e-29, 2.3449299313554634e-29, 3.3073527641254774e-29, 4.6647800260903734e-29, 6.579332246575602e-29, 9.279668616466272e-29, 1.3088296259282026e-28, 1.846008796766374e-28, 2.60366086634241e-28, 3.672273891000774e-28, 5.1794746792313075e-28, 7.305271542664628e-28, 1.0303553085423307e-27, 1.453241067961899e-27, 2.0496906107067206e-27, 2.890939220091519e-27, 4.077459071436557e-27, 5.7509588453796504e-27, 8.111308307896291e-27, 1.1440409196912631e-26, 1.6135863368106677e-26, 2.275845926074661e-26, 3.2099148096829544e-26, 4.527350892858264e-26, 6.38549847031268e-26, 9.006280202112464e-26, 1.2702701826031608e-25, 1.7916235122600269e-25, 2.5269543862746472e-25, 3.5640849914152734e-25, 5.026882121429393e-25, 7.090050861192318e-25, 1e-24, 1.410427117629777e-24, 1.9893046541454412e-24, 2.805769229433855e-24, 3.957333007004713e-24, 5.5815297865708365e-24, 7.87234096883785e-24, 1.1103363181676776e-23, 1.5660484528328966e-23, 2.2087972053973852e-23, 3.115347475837341e-23, 4.3939705607604624e-23, 6.197375232963475e-23, 8.740946086698842e-23, 1.2328467394419928e-22, 1.7388404731904387e-22, 2.4525077566199885e-22, 3.4590834461342013e-22, 4.878785094571937e-22, 6.881170798472218e-22, 9.705389895207363e-22, 1.3688745095370484e-21, 1.930697728883214e-21, 2.7231084327631085e-21, 3.840745977815411e-21, 5.41709227903835e-21, 7.64041384905858e-21, 1.0776246882626325e-20, 1.5199110829529518e-20, 2.143723807782885e-20, 3.0235661912055445e-20, 4.26451974802488e-20, 6.014794296281995e-20, 8.483428982441038e-20, 1.196525828731966e-19, 1.6876124757880072e-19, 2.380254399901731e-19, 3.3571753524789934e-19, 4.735051155774678e-19, 6.678444553468823e-19, 9.419459301799316e-19, 1.3285460832667803e-18, 1.873817422860295e-18, 2.642882906689303e-18, 3.727593720314801e-18, 5.257499266638462e-18, 7.415319536585554e-18, 1.0458767760290136e-17, 1.4751329666105257e-17, 2.080567538217146e-17, 2.9344888759616905e-17, 4.138882687039292e-17, 5.837592378488615e-17, 8.233498592289253e-17, 1.1612749687531358e-16, 1.637893706954095e-16, 2.310129700083215e-16, 3.25826957423931e-16, 4.595551764055151e-16, 6.481690828494745e-16, 9.141952512600008e-16, 1.289405773185473e-15, 1.8186128681291805e-15, 2.5650209056798623e-15, 3.617775042658168e-15, 5.102608025649305e-15, 7.196856730011116e-15, 1.0150641893704042e-14, 1.4316740588229055e-14, 2.0192719161709146e-14, 2.8480358684357e-14, 4.016947020823983e-14, 5.665611008252291e-14, 7.990931403980815e-14, 1.1270626347293928e-13, 1.5896397032895999e-13, 2.2420709447806045e-13, 3.162277660168379e-13, 4.4601621653763234e-13, 6.290733667073113e-13, 8.872621353826528e-13, 1.2514185761897962e-12, 1.7650346953637337e-12, 2.489452797898423e-12, 3.511191734215257e-12, 4.952280037134074e-12, 6.9848300584704986e-12, 9.851593726502372e-12, 1.3894954943730337e-11, 1.9597821250881202e-11, 2.7641298538703966e-11, 3.89860370254884e-11, 5.498696382966738e-11, 7.755510490149057e-11, 1.0938582306368436e-10, 1.5428073113327312e-10, 2.1760172691811703e-10, 3.069113764883817e-10, 4.328761281082955e-10, 6.105402296585215e-10, 8.611224963142905e-10, 1.2145505204027232e-09, 1.7130349897073587e-09, 2.416111002931905e-09, 3.4077484777388367e-09, 4.8063808630644475e-09, 6.7790499069229095e-09, 9.561355820489689e-09, 1.3485595530525965e-08, 1.9020449633640743e-08, 2.682695795279826e-08, 3.7837468980135526e-08, 5.336699231205865e-08, 7.527025314326735e-08, 1.0616320618412225e-07, 1.4973546489660727e-07, 2.1119096016107649e-07, 2.978694572094522e-07, 4.201231599618739e-07, 5.925530975545396e-07, 8.357529574264454e-07, 1.1787686347935432e-06, 1.6625672479242445e-06, 2.3449299313554633e-06, 3.3073527641254774e-06, 4.664780026090373e-06, 6.579332246575601e-06, 9.279668616466272e-06, 1.3088296259282025e-05, 1.846008796766374e-05, 2.60366086634241e-05, 3.672273891000774e-05, 5.1794746792313074e-05, 7.305271542664627e-05, 0.00010303553085423307, 0.0001453241067961899, 0.00020496906107064523, 0.0002890939220091519, 0.0004077459071436557, 0.0005750958845379651, 0.0008111308307896291, 0.001144040919691263, 0.0016135863368106677, 0.002275845926074661, 0.0032099148096829547, 0.004527350892858264, 0.006385498470312679, 0.009006280202112464, 0.012702701826031608, 0.01791623512260027, 0.025269543862746473, 0.035640849914152735, 0.05026882121429393, 0.07090050861192318, 0.1], "x": [-300.0, -299.85064935064935, -299.7012987012987, -299.55194805194805, -299.4025974025974, -299.25324675324674, -299.1038961038961, -298.95454545454544, -298.8051948051948, -298.65584415584414, -298.5064935064935, -298.35714285714283, -298.2077922077922, -298.0584415584416, -297.90909090909093, -297.7597402597403, -297.61038961038963, -297.461038961039, -297.31168831168833, -297.1623376623377, -297.012987012987, -296.8636363636364, -296.7142857142857, -296.56493506493507, -296.4155844155844, -296.26623376623377, -296.1168831168831, -295.96753246753246, -295.8181818181818, -295.66883116883116, -295.5194805194805, -295.37012987012986, -295.2207792207792, -295.07142857142856, -294.9220779220779, -294.77272727272725, -294.6233766233766, -294.47402597402595, -294.3246753246753, -294.1753246753247, -294.02597402597405, -293.8766233766234, -293.72727272727275, -293.5779220779221, -293.42857142857144, -293.2792207792208, -293.12987012987014, -292.9805194805195, -292.83116883116884, -292.6818181818182, -292.53246753246754, -292.3831168831169, -292.23376623376623, -292.0844155844156, -291.93506493506493, -291.7857142857143, -291.6363636363636, -291.487012987013, -291.3376623376623, -291.18831168831167, -291.038961038961, -290.88961038961037, -290.7402597402597, -290.59090909090907, -290.4415584415584, -290.2922077922078, -290.14285714285717, -289.9935064935065, -289.84415584415586, -289.6948051948052, -289.54545454545456, -289.3961038961039, -289.24675324675326, -289.0974025974026, -288.94805194805195, -288.7987012987013, -288.64935064935065, -288.5, -288.35064935064935, -288.2012987012987, -288.05194805194805, -287.9025974025974, -287.75324675324674, -287.6038961038961, -287.45454545454544, -287.3051948051948, -287.15584415584414, -287.0064935064935, -286.85714285714283, -286.7077922077922, -286.5584415584416, -286.40909090909093, -286.2597402597403, -286.11038961038963, -285.961038961039, -285.81168831168833, -285.6623376623377, -285.512987012987, -285.3636363636364, -285.2142857142857, -285.06493506493507, -284.9155844155844, -284.76623376623377, -284.6168831168831, -284.46753246753246, -284.3181818181818, -284.16883116883116, -284.0194805194805, -283.87012987012986, -283.7207792207792, -283.57142857142856, -283.4220779220779, -283.27272727272725, -283.1233766233766, -282.97402597402595, -282.82467532467535, -282.67532467532465, -282.52597402597405, -282.3766233766234, -282.22727272727275, -282.0779220779221, -281.92857142857144, -281.7792207792208, -281.62987012987014, -281.4805194805195, -281.33116883116884, -281.1818181818182, -281.03246753246754, -280.8831168831169, -280.73376623376623, -280.5844155844156, -280.43506493506493, -280.2857142857143, -280.1363636363636, -279.987012987013, -279.8376623376623, -279.68831168831167, -279.538961038961, -279.38961038961037, -279.2402597402597, -279.0909090909091, -278.9415584415584, -278.7922077922078, -278.64285714285717, -278.4935064935065, -278.34415584415586, -278.1948051948052, -278.04545454545456, -277.8961038961039, -277.74675324675326, -277.5974025974026, -277.44805194805195, -277.2987012987013, -277.14935064935065, -277.0, -276.85064935064935, -276.7012987012987, -276.55194805194805, -276.4025974025974, -276.25324675324674, -276.1038961038961, -275.95454545454544, -275.8051948051948, -275.65584415584414, -275.5064935064935, -275.35714285714283, -275.2077922077922, -275.0584415584416, -274.90909090909093, -274.7597402597403, -274.61038961038963, -274.461038961039, -274.31168831168833, -274.1623376623377, -274.012987012987, -273.8636363636364, -273.7142857142857, -273.56493506493507, -273.4155844155844, -273.26623376623377, -273.1168831168831, -272.96753246753246, -272.8181818181818, -272.66883116883116, -272.5194805194805, -272.37012987012986, -272.2207792207792, -272.07142857142856, -271.9220779220779, -271.77272727272725, -271.6233766233766, -271.47402597402595, -271.32467532467535, -271.1753246753247, -271.02597402597405, -270.8766233766234, -270.72727272727275, -270.5779220779221, -270.42857142857144, -270.2792207792208, -270.12987012987014, -269.9805194805195, -269.83116883116884, -269.6818181818182, -269.53246753246754, -269.3831168831169, -269.23376623376623, -269.0844155844156, -268.93506493506493, -268.7857142857143, -268.6363636363636, -268.487012987013, -268.3376623376623, -268.18831168831167, -268.038961038961, -267.88961038961037, -267.7402597402597, -267.5909090909091, -267.4415584415584, -267.2922077922078, -267.14285714285717, -266.9935064935065, -266.84415584415586, -266.6948051948052, -266.54545454545456, -266.3961038961039, -266.24675324675326, -266.0974025974026, -265.94805194805195, -265.7987012987013, -265.64935064935065, -265.5, -265.35064935064935, -265.2012987012987, -265.05194805194805, -264.9025974025974, -264.75324675324674, -264.6038961038961, -264.45454545454544, -264.3051948051948, -264.15584415584414, -264.0064935064935, -263.8571428571429, -263.7077922077922, -263.5584415584416, -263.40909090909093, -263.2597402597403, -263.11038961038963, -262.961038961039, -262.81168831168833, -262.6623376623377, -262.512987012987, -262.3636363636364, -262.2142857142857, -262.06493506493507, -261.9155844155844, -261.76623376623377, -261.6168831168831, -261.46753246753246, -261.3181818181818, -261.16883116883116, -261.0194805194805, -260.87012987012986, -260.7207792207792, -260.57142857142856, -260.4220779220779, -260.27272727272725, -260.1233766233766, -259.97402597402595, -259.82467532467535, -259.67532467532465, -259.52597402597405, -259.3766233766234, -259.22727272727275, -259.0779220779221, -258.92857142857144, -258.7792207792208, -258.62987012987014, -258.4805194805195, -258.33116883116884, -258.1818181818182, -258.03246753246754, -257.8831168831169, -257.73376623376623, -257.5844155844156, -257.43506493506493, -257.2857142857143, -257.1363636363636, -256.987012987013, -256.8376623376623, -256.68831168831167, -256.538961038961, -256.38961038961037, -256.2402597402597, -256.0909090909091, -255.94155844155844, -255.7922077922078, -255.64285714285714, -255.4935064935065, -255.34415584415584, -255.1948051948052, -255.04545454545456, -254.8961038961039, -254.74675324675326, -254.5974025974026, -254.44805194805195, -254.2987012987013, -254.14935064935065, -254.0, -253.85064935064935, -253.7012987012987, -253.55194805194805, -253.4025974025974, -253.25324675324674, -253.1038961038961, -252.95454545454544, -252.80519480519482, -252.65584415584416, -252.5064935064935, -252.35714285714286, -252.2077922077922, -252.05844155844156, -251.9090909090909, -251.75974025974025, -251.6103896103896, -251.46103896103898, -251.31168831168833, -251.16233766233768, -251.01298701298703, -250.86363636363637, -250.71428571428572, -250.56493506493507, -250.41558441558442, -250.26623376623377, -250.11688311688312, -249.96753246753246, -249.8181818181818, -249.66883116883116, -249.5194805194805, -249.37012987012986, -249.2207792207792, -249.07142857142858, -248.92207792207793, -248.77272727272728, -248.62337662337663, -248.47402597402598, -248.32467532467533, -248.17532467532467, -248.02597402597402, -247.87662337662337, -247.72727272727272, -247.5779220779221, -247.42857142857144, -247.2792207792208, -247.12987012987014, -246.9805194805195, -246.83116883116884, -246.6818181818182, -246.53246753246754, -246.38311688311688, -246.23376623376623, -246.08441558441558, -245.93506493506493, -245.78571428571428, -245.63636363636363, -245.48701298701297, -245.33766233766232, -245.1883116883117, -245.03896103896105, -244.8896103896104, -244.74025974025975, -244.5909090909091, -244.44155844155844, -244.2922077922078, -244.14285714285714, -243.9935064935065, -243.84415584415586, -243.6948051948052, -243.54545454545456, -243.3961038961039, -243.24675324675326, -243.0974025974026, -242.94805194805195, -242.7987012987013, -242.64935064935065, -242.5, -242.35064935064935, -242.2012987012987, -242.05194805194805, -241.9025974025974, -241.75324675324674, -241.6038961038961, -241.45454545454544, -241.30519480519482, -241.15584415584416, -241.0064935064935, -240.85714285714286, -240.7077922077922, -240.55844155844156, -240.4090909090909, -240.25974025974025, -240.1103896103896, -239.96103896103898, -239.81168831168833, -239.66233766233768, -239.51298701298703, -239.36363636363637, -239.21428571428572, -239.06493506493507, -238.91558441558442, -238.76623376623377, -238.61688311688312, -238.46753246753246, -238.3181818181818, -238.16883116883116, -238.0194805194805, -237.87012987012986, -237.7207792207792, -237.57142857142858, -237.42207792207793, -237.27272727272728, -237.12337662337663, -236.97402597402598, -236.82467532467533, -236.67532467532467, -236.52597402597402, -236.37662337662337, -236.22727272727272, -236.0779220779221, -235.92857142857144, -235.7792207792208, -235.62987012987014, -235.4805194805195, -235.33116883116884, -235.1818181818182, -235.03246753246754, -234.88311688311688, -234.73376623376623, -234.58441558441558, -234.43506493506493, -234.28571428571428, -234.13636363636363, -233.98701298701297, -233.83766233766232, -233.68831168831167, -233.53896103896105, -233.3896103896104, -233.24025974025975, -233.0909090909091, -232.94155844155844, -232.7922077922078, -232.64285714285714, -232.49350649350652, -232.34415584415586, -232.1948051948052, -232.04545454545456, -231.8961038961039, -231.74675324675326, -231.5974025974026, -231.44805194805195, -231.2987012987013, -231.14935064935065, -231.0, -230.85064935064935, -230.7012987012987, -230.55194805194805, -230.4025974025974, -230.25324675324674, -230.1038961038961, -229.95454545454544, -229.8051948051948, -229.65584415584416, -229.5064935064935, -229.35714285714286, -229.2077922077922, -229.05844155844156, -228.9090909090909, -228.75974025974028, -228.61038961038963, -228.46103896103898, -228.31168831168833, -228.16233766233768, -228.01298701298703, -227.86363636363637, -227.71428571428572, -227.56493506493507, -227.41558441558442, -227.26623376623377, -227.11688311688312, -226.96753246753246, -226.8181818181818, -226.66883116883116, -226.5194805194805, -226.37012987012986, -226.2207792207792, -226.07142857142856, -225.92207792207793, -225.77272727272728, -225.62337662337663, -225.47402597402598, -225.32467532467533, -225.17532467532467, -225.02597402597402, -224.8766233766234, -224.72727272727275, -224.5779220779221, -224.42857142857144, -224.2792207792208, -224.12987012987014, -223.9805194805195, -223.83116883116884, -223.6818181818182, -223.53246753246754, -223.38311688311688, -223.23376623376623, -223.08441558441558, -222.93506493506493, -222.78571428571428, -222.63636363636363, -222.48701298701297, -222.33766233766232, -222.18831168831167, -222.03896103896105, -221.8896103896104, -221.74025974025975, -221.5909090909091, -221.44155844155844, -221.2922077922078, -221.14285714285714, -220.99350649350652, -220.84415584415586, -220.6948051948052, -220.54545454545456, -220.3961038961039, -220.24675324675326, -220.0974025974026, -219.94805194805195, -219.7987012987013, -219.64935064935065, -219.5, -219.35064935064935, -219.2012987012987, -219.05194805194805, -218.9025974025974, -218.75324675324674, -218.6038961038961, -218.45454545454544, -218.3051948051948, -218.15584415584416, -218.0064935064935, -217.85714285714286, -217.7077922077922, -217.55844155844156, -217.4090909090909, -217.25974025974028, -217.11038961038963, -216.96103896103898, -216.81168831168833, -216.66233766233768, -216.51298701298703, -216.36363636363637, -216.21428571428572, -216.06493506493507, -215.91558441558442, -215.76623376623377, -215.61688311688312, -215.46753246753246, -215.3181818181818, -215.16883116883116, -215.0194805194805, -214.87012987012986, -214.7207792207792, -214.57142857142856, -214.42207792207793, -214.27272727272728, -214.12337662337663, -213.97402597402598, -213.82467532467533, -213.67532467532467, -213.52597402597402, -213.3766233766234, -213.22727272727275, -213.0779220779221, -212.92857142857144, -212.7792207792208, -212.62987012987014, -212.4805194805195, -212.33116883116884, -212.1818181818182, -212.03246753246754, -211.88311688311688, -211.73376623376623, -211.58441558441558, -211.43506493506493, -211.28571428571428, -211.13636363636363, -210.98701298701297, -210.83766233766232, -210.68831168831167, -210.53896103896105, -210.3896103896104, -210.24025974025975, -210.0909090909091, -209.94155844155844, -209.7922077922078, -209.64285714285717, -209.49350649350652, -209.34415584415586, -209.1948051948052, -209.04545454545456, -208.8961038961039, -208.74675324675326, -208.5974025974026, -208.44805194805195, -208.2987012987013, -208.14935064935065, -208.0, -207.85064935064935, -207.7012987012987, -207.55194805194805, -207.4025974025974, -207.25324675324674, -207.1038961038961, -206.95454545454544, -206.80519480519482, -206.65584415584416, -206.5064935064935, -206.35714285714286, -206.2077922077922, -206.05844155844156, -205.9090909090909, -205.75974025974028, -205.61038961038963, -205.46103896103898, -205.31168831168833, -205.16233766233768, -205.01298701298703, -204.86363636363637, -204.71428571428572, -204.56493506493507, -204.41558441558442, -204.26623376623377, -204.11688311688312, -203.96753246753246, -203.8181818181818, -203.66883116883116, -203.5194805194805, -203.37012987012986, -203.2207792207792, -203.07142857142856, -202.92207792207793, -202.77272727272728, -202.62337662337663, -202.47402597402598, -202.32467532467533, -202.17532467532467, -202.02597402597402, -201.8766233766234, -201.72727272727275, -201.5779220779221, -201.42857142857144, -201.2792207792208, -201.12987012987014, -200.9805194805195, -200.83116883116884, -200.6818181818182, -200.53246753246754, -200.38311688311688, -200.23376623376623, -200.08441558441558, -199.93506493506493, -199.78571428571428, -199.63636363636363, -199.48701298701297, -199.33766233766232, -199.18831168831167, -199.03896103896105, -198.8896103896104, -198.74025974025975, -198.5909090909091, -198.44155844155844, -198.2922077922078, -198.14285714285717, -197.99350649350652, -197.84415584415586, -197.6948051948052, -197.54545454545456, -197.3961038961039, -197.24675324675326, -197.0974025974026, -196.94805194805195, -196.7987012987013, -196.64935064935065, -196.5, -196.35064935064935, -196.2012987012987, -196.05194805194805, -195.9025974025974, -195.75324675324674, -195.6038961038961, -195.45454545454544, -195.30519480519482, -195.15584415584416, -195.0064935064935, -194.85714285714286, -194.7077922077922, -194.55844155844156, -194.4090909090909, -194.25974025974028, -194.11038961038963, -193.96103896103898, -193.81168831168833, -193.66233766233768, -193.51298701298703, -193.36363636363637, -193.21428571428572, -193.06493506493507, -192.91558441558442, -192.76623376623377, -192.61688311688312, -192.46753246753246, -192.3181818181818, -192.16883116883116, -192.0194805194805, -191.87012987012986, -191.7207792207792, -191.57142857142856, -191.42207792207793, -191.27272727272728, -191.12337662337663, -190.97402597402598, -190.82467532467533, -190.67532467532467, -190.52597402597405, -190.3766233766234, -190.22727272727275, -190.0779220779221, -189.92857142857144, -189.7792207792208, -189.62987012987014, -189.4805194805195, -189.33116883116884, -189.1818181818182, -189.03246753246754, -188.88311688311688, -188.73376623376623, -188.58441558441558, -188.43506493506493, -188.28571428571428, -188.13636363636363, -187.98701298701297, -187.83766233766232, -187.6883116883117, -187.53896103896105, -187.3896103896104, -187.24025974025975, -187.0909090909091, -186.94155844155844, -186.7922077922078, -186.64285714285717, -186.49350649350652, -186.34415584415586, -186.1948051948052, -186.04545454545456, -185.8961038961039, -185.74675324675326, -185.5974025974026, -185.44805194805195, -185.2987012987013, -185.14935064935065, -185.0, -184.85064935064935, -184.7012987012987, -184.55194805194805, -184.4025974025974, -184.25324675324674, -184.1038961038961, -183.95454545454544, -183.80519480519482, -183.65584415584416, -183.5064935064935, -183.35714285714286, -183.2077922077922, -183.05844155844156, -182.9090909090909, -182.75974025974028, -182.61038961038963, -182.46103896103898, -182.31168831168833, -182.16233766233768, -182.01298701298703, -181.86363636363637, -181.71428571428572, -181.56493506493507, -181.41558441558442, -181.26623376623377, -181.11688311688312, -180.96753246753246, -180.8181818181818, -180.66883116883116, -180.5194805194805, -180.37012987012986, -180.2207792207792, -180.07142857142856, -179.92207792207793, -179.77272727272728, -179.62337662337663, -179.47402597402598, -179.32467532467533, -179.17532467532467, -179.02597402597405, -178.8766233766234, -178.72727272727275, -178.5779220779221, -178.42857142857144, -178.2792207792208, -178.12987012987014, -177.9805194805195, -177.83116883116884, -177.6818181818182, -177.53246753246754, -177.38311688311688, -177.23376623376623, -177.08441558441558, -176.93506493506493, -176.78571428571428, -176.63636363636363, -176.48701298701297, -176.33766233766232, -176.1883116883117, -176.03896103896105, -175.8896103896104, -175.74025974025975, -175.5909090909091, -175.44155844155844, -175.2922077922078, -175.14285714285717, -174.99350649350652, -174.84415584415586, -174.6948051948052, -174.54545454545456, -174.3961038961039, -174.24675324675326, -174.0974025974026, -173.94805194805195, -173.7987012987013, -173.64935064935065, -173.5, -173.35064935064935, -173.2012987012987, -173.05194805194805, -172.9025974025974, -172.75324675324674, -172.6038961038961, -172.45454545454544, -172.30519480519482, -172.15584415584416, -172.0064935064935, -171.85714285714286, -171.7077922077922, -171.55844155844156, -171.4090909090909, -171.25974025974025, -171.1103896103896, -170.96103896103898, -170.81168831168833, -170.66233766233768, -170.51298701298703, -170.36363636363637, -170.21428571428572, -170.06493506493507, -169.91558441558442, -169.76623376623377, -169.61688311688312, -169.46753246753246, -169.3181818181818, -169.16883116883116, -169.01948051948054, -168.8701298701299, -168.72077922077924, -168.57142857142858, -168.42207792207793, -168.27272727272728, -168.12337662337663, -167.97402597402598, -167.82467532467533, -167.67532467532467, -167.52597402597402, -167.37662337662337, -167.22727272727272, -167.0779220779221, -166.92857142857144, -166.7792207792208, -166.62987012987014, -166.4805194805195, -166.33116883116884, -166.1818181818182, -166.03246753246754, -165.88311688311688, -165.73376623376623, -165.58441558441558, -165.43506493506493, -165.28571428571428, -165.13636363636365, -164.987012987013, -164.83766233766235, -164.6883116883117, -164.53896103896105, -164.3896103896104, -164.24025974025975, -164.0909090909091, -163.94155844155844, -163.7922077922078, -163.64285714285714, -163.4935064935065, -163.34415584415584, -163.1948051948052, -163.04545454545456, -162.8961038961039, -162.74675324675326, -162.5974025974026, -162.44805194805195, -162.2987012987013, -162.14935064935065, -162.0, -161.85064935064935, -161.7012987012987, -161.55194805194805, -161.4025974025974, -161.25324675324677, -161.10389610389612, -160.95454545454547, -160.80519480519482, -160.65584415584416, -160.5064935064935, -160.35714285714286, -160.2077922077922, -160.05844155844156, -159.9090909090909, -159.75974025974025, -159.6103896103896, -159.46103896103898, -159.31168831168833, -159.16233766233768, -159.01298701298703, -158.86363636363637, -158.71428571428572, -158.56493506493507, -158.41558441558442, -158.26623376623377, -158.11688311688312, -157.96753246753246, -157.8181818181818, -157.66883116883116, -157.51948051948054, -157.3701298701299, -157.22077922077924, -157.07142857142858, -156.92207792207793, -156.77272727272728, -156.62337662337663, -156.47402597402598, -156.32467532467533, -156.17532467532467, -156.02597402597402, -155.87662337662337, -155.72727272727272, -155.5779220779221, -155.42857142857144, -155.2792207792208, -155.12987012987014, -154.9805194805195, -154.83116883116884, -154.6818181818182, -154.53246753246754, -154.38311688311688, -154.23376623376623, -154.08441558441558, -153.93506493506493, -153.78571428571428, -153.63636363636365, -153.487012987013, -153.33766233766235, -153.1883116883117, -153.03896103896105, -152.8896103896104, -152.74025974025975, -152.5909090909091, -152.44155844155844, -152.2922077922078, -152.14285714285714, -151.9935064935065, -151.84415584415586, -151.6948051948052, -151.54545454545456, -151.3961038961039, -151.24675324675326, -151.0974025974026, -150.94805194805195, -150.7987012987013, -150.64935064935065, -150.5, -150.35064935064935, -150.2012987012987, -150.05194805194805, -149.90259740259742, -149.75324675324677, -149.60389610389612, -149.45454545454547, -149.30519480519482, -149.15584415584416, -149.0064935064935, -148.85714285714286, -148.7077922077922, -148.55844155844156, -148.4090909090909, -148.25974025974025, -148.1103896103896, -147.96103896103898, -147.81168831168833, -147.66233766233768, -147.51298701298703, -147.36363636363637, -147.21428571428572, -147.06493506493507, -146.91558441558442, -146.76623376623377, -146.61688311688312, -146.46753246753246, -146.3181818181818, -146.16883116883116, -146.01948051948054, -145.8701298701299, -145.72077922077924, -145.57142857142858, -145.42207792207793, -145.27272727272728, -145.12337662337663, -144.97402597402598, -144.82467532467533, -144.67532467532467, -144.52597402597402, -144.37662337662337, -144.22727272727272, -144.0779220779221, -143.92857142857144, -143.7792207792208, -143.62987012987014, -143.4805194805195, -143.33116883116884, -143.1818181818182, -143.03246753246754, -142.88311688311688, -142.73376623376623, -142.58441558441558, -142.43506493506493, -142.28571428571428, -142.13636363636365, -141.987012987013, -141.83766233766235, -141.6883116883117, -141.53896103896105, -141.3896103896104, -141.24025974025975, -141.0909090909091, -140.94155844155844, -140.7922077922078, -140.64285714285714, -140.4935064935065, -140.34415584415586, -140.1948051948052, -140.04545454545456, -139.8961038961039, -139.74675324675326, -139.5974025974026, -139.44805194805195, -139.2987012987013, -139.14935064935065, -139.0, -138.85064935064935, -138.7012987012987, -138.55194805194805, -138.40259740259742, -138.25324675324677, -138.10389610389612, -137.95454545454547, -137.80519480519482, -137.65584415584416, -137.5064935064935, -137.35714285714286, -137.2077922077922, -137.05844155844156, -136.9090909090909, -136.75974025974025, -136.6103896103896, -136.46103896103898, -136.31168831168833, -136.16233766233768, -136.01298701298703, -135.86363636363637, -135.71428571428572, -135.56493506493507, -135.41558441558442, -135.26623376623377, -135.11688311688312, -134.96753246753246, -134.8181818181818, -134.66883116883116, -134.51948051948054, -134.3701298701299, -134.22077922077924, -134.07142857142858, -133.92207792207793, -133.77272727272728, -133.62337662337663, -133.47402597402598, -133.32467532467533, -133.17532467532467, -133.02597402597402, -132.87662337662337, -132.72727272727275, -132.5779220779221, -132.42857142857144, -132.2792207792208, -132.12987012987014, -131.9805194805195, -131.83116883116884, -131.6818181818182, -131.53246753246754, -131.38311688311688, -131.23376623376623, -131.08441558441558, -130.93506493506493, -130.7857142857143, -130.63636363636365, -130.487012987013, -130.33766233766235, -130.1883116883117, -130.03896103896105, -129.8896103896104, -129.74025974025975, -129.5909090909091, -129.44155844155844, -129.2922077922078, -129.14285714285714, -128.9935064935065, -128.84415584415586, -128.6948051948052, -128.54545454545456, -128.3961038961039, -128.24675324675326, -128.0974025974026, -127.94805194805195, -127.7987012987013, -127.64935064935065, -127.5, -127.35064935064935, -127.2012987012987, -127.05194805194805, -126.90259740259742, -126.75324675324677, -126.60389610389612, -126.45454545454547, -126.30519480519482, -126.15584415584416, -126.00649350649351, -125.85714285714286, -125.70779220779221, -125.55844155844156, -125.4090909090909, -125.25974025974025, -125.1103896103896, -124.96103896103898, -124.81168831168833, -124.66233766233768, -124.51298701298703, -124.36363636363637, -124.21428571428572, -124.06493506493507, -123.91558441558442, -123.76623376623377, -123.61688311688312, -123.46753246753246, -123.31818181818181, -123.16883116883116, -123.01948051948054, -122.87012987012989, -122.72077922077924, -122.57142857142858, -122.42207792207793, -122.27272727272728, -122.12337662337663, -121.97402597402598, -121.82467532467533, -121.67532467532467, -121.52597402597402, -121.37662337662337, -121.22727272727275, -121.0779220779221, -120.92857142857144, -120.7792207792208, -120.62987012987014, -120.48051948051949, -120.33116883116884, -120.18181818181819, -120.03246753246754, -119.88311688311688, -119.73376623376623, -119.58441558441558, -119.43506493506493, -119.2857142857143, -119.13636363636365, -118.987012987013, -118.83766233766235, -118.6883116883117, -118.53896103896105, -118.3896103896104, -118.24025974025975, -118.0909090909091, -117.94155844155844, -117.79220779220779, -117.64285714285714, -117.49350649350649, -117.34415584415586, -117.19480519480521, -117.04545454545456, -116.89610389610391, -116.74675324675326, -116.5974025974026, -116.44805194805195, -116.2987012987013, -116.14935064935065, -116.0, -115.85064935064935, -115.7012987012987, -115.55194805194805, -115.40259740259742, -115.25324675324677, -115.10389610389612, -114.95454545454547, -114.80519480519482, -114.65584415584416, -114.50649350649351, -114.35714285714286, -114.20779220779221, -114.05844155844156, -113.9090909090909, -113.75974025974025, -113.61038961038963, -113.46103896103898, -113.31168831168833, -113.16233766233768, -113.01298701298703, -112.86363636363637, -112.71428571428572, -112.56493506493507, -112.41558441558442, -112.26623376623377, -112.11688311688312, -111.96753246753246, -111.81818181818181, -111.66883116883119, -111.51948051948054, -111.37012987012989, -111.22077922077924, -111.07142857142858, -110.92207792207793, -110.77272727272728, -110.62337662337663, -110.47402597402598, -110.32467532467533, -110.17532467532467, -110.02597402597402, -109.87662337662337, -109.72727272727275, -109.5779220779221, -109.42857142857144, -109.2792207792208, -109.12987012987014, -108.98051948051949, -108.83116883116884, -108.68181818181819, -108.53246753246754, -108.38311688311688, -108.23376623376623, -108.08441558441558, -107.93506493506493, -107.7857142857143, -107.63636363636365, -107.487012987013, -107.33766233766235, -107.1883116883117, -107.03896103896105, -106.8896103896104, -106.74025974025975, -106.5909090909091, -106.44155844155844, -106.29220779220779, -106.14285714285714, -105.99350649350649, -105.84415584415586, -105.69480519480521, -105.54545454545456, -105.39610389610391, -105.24675324675326, -105.0974025974026, -104.94805194805195, -104.7987012987013, -104.64935064935065, -104.5, -104.35064935064935, -104.2012987012987, -104.05194805194805, -103.90259740259742, -103.75324675324677, -103.60389610389612, -103.45454545454547, -103.30519480519482, -103.15584415584416, -103.00649350649351, -102.85714285714286, -102.70779220779221, -102.55844155844156, -102.4090909090909, -102.25974025974025, -102.11038961038963, -101.96103896103898, -101.81168831168833, -101.66233766233768, -101.51298701298703, -101.36363636363637, -101.21428571428572, -101.06493506493507, -100.91558441558442, -100.76623376623377, -100.61688311688312, -100.46753246753246, -100.31818181818181, -100.16883116883119, -100.01948051948054, -99.87012987012989, -99.72077922077924, -99.57142857142858, -99.42207792207793, -99.27272727272728, -99.12337662337663, -98.97402597402598, -98.82467532467533, -98.67532467532467, -98.52597402597402, -98.37662337662337, -98.22727272727275, -98.0779220779221, -97.92857142857144, -97.7792207792208, -97.62987012987014, -97.48051948051949, -97.33116883116884, -97.18181818181819, -97.03246753246754, -96.88311688311688, -96.73376623376623, -96.58441558441558, -96.43506493506493, -96.2857142857143, -96.13636363636365, -95.987012987013, -95.83766233766235, -95.6883116883117, -95.53896103896105, -95.3896103896104, -95.24025974025975, -95.0909090909091, -94.94155844155844, -94.79220779220779, -94.64285714285714, -94.49350649350652, -94.34415584415586, -94.19480519480521, -94.04545454545456, -93.89610389610391, -93.74675324675326, -93.5974025974026, -93.44805194805195, -93.2987012987013, -93.14935064935065, -93.0, -92.85064935064935, -92.7012987012987, -92.55194805194807, -92.40259740259742, -92.25324675324677, -92.10389610389612, -91.95454545454547, -91.80519480519482, -91.65584415584416, -91.50649350649351, -91.35714285714286, -91.20779220779221, -91.05844155844156, -90.9090909090909, -90.75974025974025, -90.61038961038963, -90.46103896103898, -90.31168831168833, -90.16233766233768, -90.01298701298703, -89.86363636363637, -89.71428571428572, -89.56493506493507, -89.41558441558442, -89.26623376623377, -89.11688311688312, -88.96753246753246, -88.81818181818181, -88.66883116883119, -88.51948051948054, -88.37012987012989, -88.22077922077924, -88.07142857142858, -87.92207792207793, -87.77272727272728, -87.62337662337663, -87.47402597402598, -87.32467532467533, -87.17532467532467, -87.02597402597402, -86.87662337662337, -86.72727272727275, -86.5779220779221, -86.42857142857144, -86.2792207792208, -86.12987012987014, -85.98051948051949, -85.83116883116884, -85.68181818181819, -85.53246753246754, -85.38311688311688, -85.23376623376623, -85.08441558441558, -84.93506493506493, -84.7857142857143, -84.63636363636365, -84.487012987013, -84.33766233766235, -84.1883116883117, -84.03896103896105, -83.8896103896104, -83.74025974025975, -83.5909090909091, -83.44155844155844, -83.29220779220779, -83.14285714285714, -82.99350649350652, -82.84415584415586, -82.69480519480521, -82.54545454545456, -82.39610389610391, -82.24675324675326, -82.0974025974026, -81.94805194805195, -81.7987012987013, -81.64935064935065, -81.5, -81.35064935064935, -81.2012987012987, -81.05194805194807, -80.90259740259742, -80.75324675324677, -80.60389610389612, -80.45454545454547, -80.30519480519482, -80.15584415584416, -80.00649350649351, -79.85714285714286, -79.70779220779221, -79.55844155844156, -79.4090909090909, -79.25974025974025, -79.11038961038963, -78.96103896103898, -78.81168831168833, -78.66233766233768, -78.51298701298703, -78.36363636363637, -78.21428571428572, -78.06493506493507, -77.91558441558442, -77.76623376623377, -77.61688311688312, -77.46753246753246, -77.31818181818181, -77.16883116883119, -77.01948051948054, -76.87012987012989, -76.72077922077924, -76.57142857142858, -76.42207792207793, -76.27272727272728, -76.12337662337663, -75.97402597402598, -75.82467532467533, -75.67532467532467, -75.52597402597402, -75.3766233766234, -75.22727272727275, -75.0779220779221, -74.92857142857144, -74.7792207792208, -74.62987012987014, -74.48051948051949, -74.33116883116884, -74.18181818181819, -74.03246753246754, -73.88311688311688, -73.73376623376623, -73.58441558441558, -73.43506493506496, -73.2857142857143, -73.13636363636365, -72.987012987013, -72.83766233766235, -72.6883116883117, -72.53896103896105, -72.3896103896104, -72.24025974025975, -72.0909090909091, -71.94155844155844, -71.79220779220779, -71.64285714285714, -71.49350649350652, -71.34415584415586, -71.19480519480521, -71.04545454545456, -70.89610389610391, -70.74675324675326, -70.5974025974026, -70.44805194805195, -70.2987012987013, -70.14935064935065, -70.0, -69.85064935064935, -69.7012987012987, -69.55194805194807, -69.40259740259742, -69.25324675324677, -69.10389610389612, -68.95454545454547, -68.80519480519482, -68.65584415584416, -68.50649350649351, -68.35714285714286, -68.20779220779221, -68.05844155844156, -67.9090909090909, -67.75974025974025, -67.61038961038963, -67.46103896103898, -67.31168831168833, -67.16233766233768, -67.01298701298703, -66.86363636363637, -66.71428571428572, -66.56493506493507, -66.41558441558442, -66.26623376623377, -66.11688311688312, -65.96753246753246, -65.81818181818181, -65.66883116883119, -65.51948051948054, -65.37012987012989, -65.22077922077924, -65.07142857142858, -64.92207792207793, -64.77272727272728, -64.62337662337663, -64.47402597402598, -64.32467532467533, -64.17532467532467, -64.02597402597402, -63.8766233766234, -63.72727272727275, -63.577922077922096, -63.428571428571445, -63.27922077922079, -63.12987012987014, -62.98051948051949, -62.83116883116884, -62.68181818181819, -62.532467532467535, -62.383116883116884, -62.23376623376623, -62.08441558441558, -61.93506493506496, -61.785714285714306, -61.636363636363654, -61.487012987013, -61.33766233766235, -61.1883116883117, -61.03896103896105, -60.8896103896104, -60.740259740259745, -60.59090909090909, -60.44155844155844, -60.29220779220779, -60.14285714285714, -59.993506493506516, -59.844155844155864, -59.69480519480521, -59.54545454545456, -59.39610389610391, -59.24675324675326, -59.097402597402606, -58.948051948051955, -58.7987012987013, -58.64935064935065, -58.5, -58.35064935064935, -58.2012987012987, -58.051948051948074, -57.90259740259742, -57.75324675324677, -57.60389610389612, -57.45454545454547, -57.305194805194816, -57.155844155844164, -57.00649350649351, -56.85714285714286, -56.70779220779221, -56.55844155844156, -56.40909090909091, -56.25974025974028, -56.11038961038963, -55.96103896103898, -55.81168831168833, -55.66233766233768, -55.512987012987026, -55.363636363636374, -55.21428571428572, -55.06493506493507, -54.91558441558442, -54.76623376623377, -54.616883116883116, -54.467532467532465, -54.31818181818184, -54.16883116883119, -54.01948051948054, -53.87012987012989, -53.720779220779235, -53.571428571428584, -53.42207792207793, -53.27272727272728, -53.12337662337663, -52.97402597402598, -52.824675324675326, -52.675324675324674, -52.52597402597402, -52.3766233766234, -52.22727272727275, -52.077922077922096, -51.928571428571445, -51.77922077922079, -51.62987012987014, -51.48051948051949, -51.33116883116884, -51.18181818181819, -51.032467532467535, -50.883116883116884, -50.73376623376623, -50.58441558441558, -50.43506493506496, -50.285714285714306, -50.136363636363654, -49.987012987013, -49.83766233766235, -49.6883116883117, -49.53896103896105, -49.3896103896104, -49.240259740259745, -49.09090909090909, -48.94155844155844, -48.79220779220779, -48.64285714285714, -48.493506493506516, -48.344155844155864, -48.19480519480521, -48.04545454545456, -47.89610389610391, -47.74675324675326, -47.597402597402606, -47.448051948051955, -47.2987012987013, -47.14935064935065, -47.0, -46.85064935064935, -46.7012987012987, -46.551948051948074, -46.40259740259742, -46.25324675324677, -46.10389610389612, -45.95454545454547, -45.805194805194816, -45.655844155844164, -45.50649350649351, -45.35714285714286, -45.20779220779221, -45.05844155844156, -44.90909090909091, -44.75974025974028, -44.61038961038963, -44.46103896103898, -44.31168831168833, -44.16233766233768, -44.012987012987026, -43.863636363636374, -43.71428571428572, -43.56493506493507, -43.41558441558442, -43.26623376623377, -43.116883116883116, -42.967532467532465, -42.81818181818181, -42.66883116883116, -42.51948051948051, -42.37012987012986, -42.22077922077921, -42.071428571428555, -41.92207792207796, -41.77272727272731, -41.62337662337666, -41.474025974026006, -41.324675324675354, -41.1753246753247, -41.02597402597405, -40.8766233766234, -40.72727272727275, -40.577922077922096, -40.428571428571445, -40.27922077922079, -40.12987012987014, -39.98051948051949, -39.83116883116884, -39.68181818181819, -39.532467532467535, -39.383116883116884, -39.23376623376623, -39.08441558441558, -38.93506493506493, -38.78571428571428, -38.636363636363626, -38.487012987012974, -38.33766233766232, -38.18831168831167, -38.03896103896108, -37.889610389610425, -37.74025974025977, -37.59090909090912, -37.44155844155847, -37.29220779220782, -37.14285714285717, -36.993506493506516, -36.844155844155864, -36.69480519480521, -36.54545454545456, -36.39610389610391, -36.24675324675326, -36.097402597402606, -35.948051948051955, -35.7987012987013, -35.64935064935065, -35.5, -35.35064935064935, -35.2012987012987, -35.051948051948045, -34.902597402597394, -34.75324675324674, -34.60389610389609, -34.45454545454544, -34.30519480519479, -34.15584415584419, -34.00649350649354, -33.85714285714289, -33.70779220779224, -33.55844155844159, -33.409090909090935, -33.25974025974028, -33.11038961038963, -32.96103896103898, -32.81168831168833, -32.66233766233768, -32.512987012987026, -32.363636363636374, -32.21428571428572, -32.06493506493507, -31.91558441558442, -31.766233766233768, -31.616883116883116, -31.467532467532465, -31.318181818181813, -31.16883116883116, -31.01948051948051, -30.87012987012986, -30.720779220779207, -30.571428571428555, -30.42207792207796, -30.27272727272731, -30.123376623376657, -29.974025974026006, -29.824675324675354, -29.675324675324703, -29.52597402597405, -29.3766233766234, -29.227272727272748, -29.077922077922096, -28.928571428571445, -28.779220779220793, -28.62987012987014, -28.48051948051949, -28.33116883116884, -28.181818181818187, -28.032467532467535, -27.883116883116884, -27.733766233766232, -27.58441558441558, -27.43506493506493, -27.285714285714278, -27.136363636363626, -26.987012987012974, -26.837662337662323, -26.68831168831167, -26.538961038961077, -26.389610389610425, -26.240259740259773, -26.090909090909122, -25.94155844155847, -25.79220779220782, -25.642857142857167, -25.493506493506516, -25.344155844155864, -25.194805194805213, -25.04545454545456, -24.89610389610391, -24.746753246753258, -24.597402597402606, -24.448051948051955, -24.298701298701303, -24.14935064935065, -24.0, -23.85064935064935, -23.701298701298697, -23.551948051948045, -23.402597402597394, -23.253246753246742, -23.10389610389609, -22.95454545454544, -22.805194805194787, -22.655844155844193, -22.50649350649354, -22.35714285714289, -22.207792207792238, -22.058441558441586, -21.909090909090935, -21.759740259740283, -21.610389610389632, -21.46103896103898, -21.31168831168833, -21.162337662337677, -21.012987012987026, -20.863636363636374, -20.714285714285722, -20.56493506493507, -20.41558441558442, -20.266233766233768, -20.116883116883116, -19.967532467532465, -19.818181818181813, -19.66883116883116, -19.51948051948051, -19.37012987012986, -19.220779220779207, -19.071428571428555, -18.92207792207796, -18.77272727272731, -18.623376623376657, -18.474025974026006, -18.324675324675354, -18.175324675324703, -18.02597402597405, -17.8766233766234, -17.727272727272748, -17.577922077922096, -17.428571428571445, -17.279220779220793, -17.12987012987014, -16.98051948051949, -16.83116883116884, -16.681818181818187, -16.532467532467535, -16.383116883116884, -16.233766233766232, -16.08441558441558, -15.93506493506493, -15.785714285714278, -15.636363636363626, -15.487012987012974, -15.337662337662323, -15.188311688311671, -15.038961038961077, -14.889610389610425, -14.740259740259773, -14.590909090909122, -14.44155844155847, -14.292207792207819, -14.142857142857167, -13.993506493506516, -13.844155844155864, -13.694805194805213, -13.545454545454561, -13.39610389610391, -13.246753246753258, -13.097402597402606, -12.948051948051955, -12.798701298701303, -12.649350649350652, -12.5, -12.350649350649348, -12.201298701298697, -12.051948051948045, -11.902597402597394, -11.753246753246742, -11.60389610389609, -11.454545454545439, -11.305194805194844, -11.155844155844193, -11.006493506493541, -10.85714285714289, -10.707792207792238, -10.558441558441586, -10.409090909090935, -10.259740259740283, -10.110389610389632, -9.96103896103898, -9.811688311688329, -9.662337662337677, -9.512987012987026, -9.363636363636374, -9.214285714285722, -9.06493506493507, -8.91558441558442, -8.766233766233768, -8.616883116883116, -8.467532467532465, -8.318181818181813, -8.168831168831161, -8.01948051948051, -7.870129870129858, -7.720779220779207, -7.571428571428555, -7.4220779220779605, -7.272727272727309, -7.123376623376657, -6.974025974026006, -6.824675324675354, -6.675324675324703, -6.525974025974051, -6.3766233766233995, -6.227272727272748, -6.077922077922096, -5.928571428571445, -5.779220779220793, -5.629870129870142, -5.48051948051949, -5.3311688311688386, -5.181818181818187, -5.032467532467535, -4.883116883116884, -4.733766233766232, -4.584415584415581, -4.435064935064929, -4.285714285714278, -4.136363636363626, -3.9870129870129745, -3.837662337662323, -3.688311688311728, -3.5389610389610766, -3.389610389610425, -3.2402597402597735, -3.090909090909122, -2.9415584415584703, -2.792207792207819, -2.642857142857167, -2.4935064935065157, -2.344155844155864, -2.1948051948052125, -2.045454545454561, -1.8961038961039094, -1.7467532467532578, -1.5974025974026063, -1.4480519480519547, -1.2987012987013031, -1.1493506493506516, -1.0]}
},{}],69:[function(require,module,exports){
module.exports={"expected": [10.0, 14.104271176297699, 19.893046541454208, 28.057692294338125, 39.573330070046325, 55.81529786570694, 78.72340968837608, 111.03363181676379, 156.60484528328325, 220.87972053975727, 311.53474758375893, 439.397056076079, 619.7375232963906, 874.0946086699405, 1232.8467394420659, 1738.840473190533, 2452.507756620109, 3459.083446134353, 4878.7850945721275, 6881.17079847245, 9705.38989520764, 13688.74509537082, 19306.977288832495, 27231.08432763142, 38407.45977815442, 54170.92279038372, 76404.13849058564, 107762.46882626237, 151991.10829529332, 214372.38077828498, 302356.61912054766, 426451.97480247583, 601479.4296281799, 848342.8982440726, 1196525.8287320712, 1687612.4757881453, 2380254.399901916, 3357175.3524792404, 4735051.155774998, 6678444.553469233, 9419459.301799856, 13285460.83266851, 18738174.22860383, 26428829.06689411, 37275937.20314938, 52574992.66638634, 74153195.3658575, 104587677.6029035, 147513296.66105497, 208056753.82171714, 293448887.59617144, 413888268.7039292, 583759237.8488591, 823349859.2289186, 1161274968.7531168, 1637893706.9540613, 2310129700.083158, 3258269574.239217, 4595551764.055001, 6481690828.494479, 9141952512.600794, 12894057731.855785, 18186128681.293144, 25650209056.800407, 36177750426.58405, 51026080256.49617, 71968567300.11528, 101506418937.04541, 143167405882.297, 201927191617.09973, 284803586843.57935, 401694702082.4098, 566561100825.243, 799093140398.0979, 1127062634729.4114, 1589639703289.613, 2242070944780.614, 3162277660168.3794, 4460162165376.287, 6290733667073.035, 8872621353826.383, 12514185761897.707, 17650346953636.906, 24894527978983.414, 35111917342151.273, 49522800371345.2, 69848300584710.7, 98515937265031.39, 138949549437313.6, 195978212508825.62, 276412985387057.75, 389860370254906.4, 549869638296703.06, 775551049014943.8, 1093858230636888.2, 1542807311332788.0, 2176017269181241.5, 3069113764883904.5, 4328761281083061.5, 6105402296585314.0, 8611224963143011.0, 1.214550520402733e+16, 1.7130349897073586e+16, 2.416111002931905e+16, 3.407748477738809e+16, 4.80638086306437e+16, 6.779049906922799e+16, 9.561355820489453e+16, 1.3485595530525523e+17, 1.9020449633640118e+17, 2.6826957952797165e+17, 3.783746898013893e+17, 5.3366992312063014e+17, 7.527025314327291e+17, 1.0616320618413007e+18, 1.4973546489661706e+18, 2.111909601610903e+18, 2.9786945720946924e+18, 4.201231599618945e+18, 5.925530975545687e+18, 8.357529574264796e+18, 1.1787686347935818e+19, 1.662567247924299e+19, 2.344929931355521e+19, 3.3073527641255313e+19, 4.664780026090449e+19, 6.579332246575655e+19, 9.279668616466348e+19, 1.3088296259282026e+20, 1.846008796766359e+20, 2.6036608663423887e+20, 3.672273891000714e+20, 5.1794746792312236e+20, 7.305271542664449e+20, 1.030355308542297e+21, 1.4532410679618516e+21, 2.0496906107066369e+21, 2.8909392200917556e+21, 4.0774590714368906e+21, 5.750958845380074e+21, 8.111308307896823e+21, 1.144040919691338e+22, 1.61358633681076e+22, 2.275845926074791e+22, 3.209914809683112e+22, 4.527350892858449e+22, 6.385498470312941e+22, 9.006280202112758e+22, 1.2702701826032023e+23, 1.791623512260071e+23, 2.5269543862746886e+23, 3.564084991415332e+23, 5.026882121429434e+23, 7.090050861192318e+23, 1e+24, 1.4104271176297654e+24, 1.9893046541454086e+24, 2.8057692294338093e+24, 3.9573330070046166e+24, 5.581529786570699e+24, 7.872340968837592e+24, 1.110336318167632e+25, 1.5660484528328326e+25, 2.208797205397566e+25, 3.115347475837596e+25, 4.393970560760786e+25, 6.19737523296388e+25, 8.740946086699415e+25, 1.2328467394420634e+26, 1.738840473190524e+26, 2.4525077566201087e+26, 3.459083446134343e+26, 4.878785094572098e+26, 6.881170798472444e+26, 9.7053898952076e+26, 1.368874509537082e+27, 1.9306977288832458e+27, 2.7231084327631306e+27, 3.8407459778154425e+27, 5.41709227903835e+27, 7.64041384905858e+27, 1.0776246882626236e+28, 1.519911082952927e+28, 2.14372380778285e+28, 3.0235661912054706e+28, 4.264519748024741e+28, 6.014794296281798e+28, 8.48342898244069e+28, 1.1965258287320639e+29, 1.687612475788145e+29, 2.3802543999019062e+29, 3.35717535247924e+29, 4.7350511557749876e+29, 6.678444553469206e+29, 9.419459301799856e+29, 1.3285460832668454e+30, 1.873817422860387e+30, 2.642882906689411e+30, 3.7275937203149225e+30, 5.257499266638634e+30, 7.415319536585735e+30, 1.0458767760290308e+31, 1.47513296661055e+31, 2.080567538217163e+31, 2.9344888759616906e+31, 4.138882687039292e+31, 5.8375923784885675e+31, 8.233498592289185e+31, 1.1612749687531169e+32, 1.637893706954041e+32, 2.3101297000831394e+32, 3.2582695742392036e+32, 4.595551764055001e+32, 6.4816908284945326e+32, 9.141952512600755e+32, 1.2894057731855783e+33, 1.8186128681292997e+33, 2.56502090568003e+33, 3.617775042658405e+33, 5.1026080256496386e+33, 7.19685673001147e+33, 1.015064189370454e+34, 1.4316740588229758e+34, 2.0192719161709805e+34, 2.8480358684357934e+34, 4.0169470208241147e+34, 5.665611008252384e+34, 7.990931403980945e+34, 1.1270626347294114e+35, 1.5896397032896e+35, 2.242070944780605e+35, 3.162277660168379e+35, 4.460162165376323e+35, 6.29073366707301e+35, 8.872621353826384e+35, 1.2514185761897757e+36, 1.765034695363676e+36, 2.4894527978983414e+36, 3.511191734215142e+36, 4.95228003713448e+36, 6.98483005847107e+36, 9.851593726503179e+36, 1.3894954943731246e+37, 1.9597821250882485e+37, 2.7641298538705773e+37, 3.8986037025490317e+37, 5.498696382967008e+37, 7.755510490149439e+37, 1.0938582306368793e+38, 1.5428073113327816e+38, 2.1760172691812416e+38, 3.0691137648839175e+38, 4.328761281083026e+38, 6.105402296585314e+38, 8.611224963143045e+38, 1.2145505204027232e+39, 1.7130349897073588e+39, 2.4161110029319047e+39, 3.4077484777387804e+39, 4.8063808630643695e+39, 6.779049906922799e+39, 9.561355820489377e+39, 1.3485595530525523e+40, 1.9020449633640118e+40, 2.682695795279738e+40, 3.783746898013862e+40, 5.336699231206302e+40, 7.527025314327352e+40, 1.061632061841292e+41, 1.4973546489661709e+41, 2.111909601610903e+41, 2.978694572094668e+41, 4.201231599618945e+41, 5.925530975545687e+41, 8.357529574264727e+41, 1.1787686347935818e+42, 1.662567247924299e+42, 2.344929931355502e+42, 3.3073527641255314e+42, 4.66478002609045e+42, 6.579332246575602e+42, 9.279668616466272e+42, 1.3088296259282026e+43, 1.846008796766374e+43, 2.603660866342368e+43, 3.6722738910007136e+43, 5.179474679231223e+43, 7.305271542664389e+43, 1.0303553085422969e+44, 1.4532410679618517e+44, 2.04969061070662e+44, 2.8909392200917555e+44, 4.077459071436891e+44, 5.750958845380027e+44, 8.111308307896823e+44, 1.144040919691338e+45, 1.6135863368107732e+45, 2.2758459260747726e+45, 3.209914809683112e+45, 4.527350892858487e+45, 6.385498470312888e+45, 9.006280202112759e+45, 1.2702701826032024e+46, 1.791623512260056e+46, 2.5269543862746886e+46, 3.564084991415332e+46, 5.026882121429393e+46, 7.090050861192318e+46, 1e+47, 1.4104271176297542e+47, 1.9893046541454084e+47, 2.8057692294338094e+47, 3.957333007004584e+47, 5.581529786570654e+47, 7.872340968837593e+47, 1.1103363181676414e+48, 1.5660484528328198e+48, 2.208797205397566e+48, 3.115347475837596e+48, 4.3939705607607505e+48, 6.19737523296388e+48, 8.740946086699414e+48, 1.2328467394420534e+49, 1.738840473190524e+49, 2.4525077566201084e+49, 3.459083446134314e+49, 4.878785094572097e+49, 6.881170798472443e+49, 9.70538989520768e+49, 1.3688745095370708e+50, 1.9306977288832457e+50, 2.723108432763153e+50, 3.840745977815411e+50, 5.41709227903835e+50, 7.64041384905858e+50, 1.0776246882626149e+51, 1.519911082952927e+51, 2.14372380778285e+51, 3.0235661912054456e+51, 4.26451974802474e+51, 6.014794296281798e+51, 8.483428982440621e+51, 1.1965258287320639e+52, 1.6876124757881451e+52, 2.3802543999018867e+52, 3.357175352479213e+52, 4.7350511557749876e+52, 6.67844455346926e+52, 9.419459301799779e+52, 1.3285460832668455e+53, 1.8738174228603869e+53, 2.6428829066893894e+53, 3.7275937203149226e+53, 5.257499266638634e+53, 7.415319536585674e+53, 1.0458767760290307e+54, 1.4751329666105498e+54, 2.080567538217146e+54, 2.9344888759616905e+54, 4.1388826870392914e+54, 5.837592378488615e+54, 8.233498592289117e+54, 1.1612749687531167e+55, 1.6378937069540678e+55, 2.3101297000831393e+55, 3.258269574239203e+55, 4.5955517640550007e+55, 6.481690828494427e+55, 9.141952512600756e+55, 1.2894057731855783e+56, 1.8186128681292997e+56, 2.5650209056800303e+56, 3.6177750426584054e+56, 5.102608025649555e+56, 7.19685673001147e+56, 1.0150641893704541e+57, 1.4316740588229524e+57, 2.0192719161709807e+57, 2.8480358684357932e+57, 4.016947020824115e+57, 5.6656110082523844e+57, 7.990931403980945e+57, 1.1270626347294113e+58, 1.5896397032896e+58, 2.2420709447806044e+58, 3.1622776601683794e+58, 4.46016216537625e+58, 6.29073366707301e+58, 8.872621353826384e+58, 1.2514185761897553e+59, 1.765034695363676e+59, 2.4894527978983414e+59, 3.5111917342151417e+59, 4.95228003713448e+59, 6.98483005847107e+59, 9.85159372650318e+59, 1.3894954943731246e+60, 1.9597821250882484e+60, 2.7641298538705777e+60, 3.898603702549032e+60, 5.498696382967008e+60, 7.755510490149439e+60, 1.0938582306368793e+61, 1.5428073113327816e+61, 2.1760172691812414e+61, 3.069113764883867e+61, 4.3287612810830265e+61, 6.105402296585314e+61, 8.611224963142906e+61, 1.2145505204027233e+62, 1.7130349897073588e+62, 2.416111002931905e+62, 3.4077484777387805e+62, 4.806380863064369e+62, 6.779049906922799e+62, 9.561355820489376e+62, 1.3485595530525523e+63, 1.9020449633640117e+63, 2.6826957952796946e+63, 3.783746898013862e+63, 5.336699231206302e+63, 7.527025314327229e+63, 1.061632061841292e+64, 1.4973546489661708e+64, 2.1119096016109028e+64, 2.978694572094717e+64, 4.2012315996190136e+64, 5.925530975545783e+64, 8.357529574264727e+64, 1.1787686347935817e+65, 1.662567247924299e+65, 2.34492993135554e+65, 3.3073527641254775e+65, 4.664780026090373e+65, 6.579332246575601e+65, 9.279668616466271e+65, 1.3088296259282025e+66, 1.846008796766374e+66, 2.6036608663424102e+66, 3.672273891000654e+66, 5.1794746792311385e+66, 7.305271542664389e+66, 1.030355308542297e+67, 1.4532410679618516e+67, 2.0496906107066534e+67, 2.890939220091708e+67, 4.0774590714368236e+67, 5.750958845380028e+67, 8.111308307896824e+67, 1.144040919691338e+68, 1.6135863368107733e+68, 2.2758459260748094e+68, 3.2099148096830597e+68, 4.527350892858412e+68, 6.385498470312889e+68, 9.006280202112758e+68, 1.2702701826032023e+69, 1.7916235122600855e+69, 2.5269543862746472e+69, 3.564084991415273e+69, 5.026882121429393e+69, 7.090050861192318e+69, 1e+70, 1.4104271176297772e+70, 1.989304654145441e+70, 2.805769229433763e+70, 3.957333007004584e+70, 5.581529786570653e+70, 7.872340968837593e+70, 1.1103363181676413e+71, 1.5660484528328454e+71, 2.2087972053975297e+71, 3.1153474758375447e+71, 4.39397056076075e+71, 6.19737523296388e+71, 8.740946086699414e+71, 1.2328467394420733e+72, 1.7388404731904957e+72, 2.4525077566200685e+72, 3.4590834461343143e+72, 4.878785094572098e+72, 6.881170798472443e+72, 9.70538989520768e+72, 1.3688745095370932e+73, 1.930697728883214e+73, 2.7231084327631085e+73, 3.840745977815411e+73, 5.41709227903835e+73, 7.640413849058581e+73, 1.0776246882626324e+74, 1.519911082952902e+74, 2.1437238077828147e+74, 3.023566191205446e+74, 4.2645197480247405e+74, 6.014794296281799e+74, 8.48342898244076e+74, 1.1965258287320444e+75, 1.6876124757881177e+75, 2.3802543999018868e+75, 3.3571753524792132e+75, 4.735051155774988e+75, 6.678444553469261e+75, 9.419459301799934e+75, 1.3285460832668238e+76, 1.8738174228603562e+76, 2.6428829066893893e+76, 3.727593720314923e+76, 5.257499266638634e+76, 7.415319536585796e+76, 1.0458767760290136e+77, 1.4751329666105258e+77, 2.080567538217146e+77, 2.9344888759616904e+77, 4.1388826870392917e+77, 5.837592378488615e+77, 8.233498592289253e+77, 1.1612749687530977e+78, 1.6378937069540413e+78, 2.310129700083139e+78, 3.2582695742392035e+78, 4.595551764055001e+78, 6.481690828494532e+78, 9.141952512600606e+78, 1.2894057731855572e+79, 1.8186128681292997e+79, 2.56502090568003e+79, 3.617775042658405e+79, 5.1026080256496383e+79, 7.196856730011588e+79, 1.0150641893704375e+80, 1.4316740588229523e+80, 2.0192719161709806e+80, 2.848035868435793e+80, 4.016947020824115e+80, 5.665611008252477e+80, 7.990931403980815e+80, 1.1270626347293928e+81, 1.5896397032896002e+81, 2.2420709447806046e+81, 3.1622776601683793e+81, 4.460162165376324e+81, 6.2907336670729074e+81, 8.872621353826238e+81, 1.251418576189755e+82, 1.765034695363676e+82, 2.4894527978983412e+82, 3.511191734215142e+82, 4.952280037134561e+82, 6.984830058470956e+82, 9.851593726503018e+82, 1.3894954943731246e+83, 1.9597821250882483e+83, 2.7641298538705777e+83, 3.8986037025490957e+83, 5.498696382966918e+83, 7.755510490149311e+83, 1.0938582306368793e+84, 1.5428073113327818e+84, 2.1760172691812415e+84, 3.0691137648839173e+84, 4.328761281082956e+84, 6.1054022965852145e+84, 8.611224963142905e+84, 1.2145505204027231e+85, 1.7130349897073585e+85, 2.4161110029319047e+85, 3.407748477738836e+85, 4.806380863064291e+85, 6.779049906922689e+85, 9.561355820489375e+85, 1.3485595530525523e+86, 1.9020449633640118e+86, 2.6826957952797383e+86, 3.7837468980138e+86, 5.336699231206215e+86, 7.527025314327228e+86, 1.061632061841292e+87, 1.4973546489661707e+87, 2.111909601610903e+87, 2.978694572094717e+87, 4.201231599618877e+87, 5.92553097554559e+87, 8.357529574264727e+87, 1.1787686347935819e+88, 1.662567247924299e+88, 2.3449299313555403e+88, 3.3073527641254774e+88, 4.664780026090373e+88, 6.579332246575602e+88, 9.279668616466272e+88, 1.3088296259282026e+89, 1.8460087967663741e+89, 2.6036608663424104e+89, 3.672273891000654e+89, 5.179474679231139e+89, 7.305271542664389e+89, 1.030355308542297e+90, 1.4532410679618516e+90, 2.0496906107066534e+90, 2.890939220091708e+90, 4.077459071436824e+90, 5.750958845380027e+90, 8.111308307896823e+90, 1.144040919691338e+91, 1.6135863368107732e+91, 2.2758459260747353e+91, 3.2099148096830598e+91, 4.5273508928584126e+91, 6.3854984703128884e+91, 9.006280202112758e+91, 1.2702701826032024e+92, 1.7916235122600853e+92, 2.5269543862746473e+92, 3.5640849914152737e+92, 5.026882121429393e+92, 7.090050861192318e+92, 1e+93, 1.4104271176297773e+93, 1.989304654145376e+93, 2.805769229433763e+93, 3.957333007004584e+93, 5.581529786570654e+93, 7.872340968837593e+93, 1.1103363181676412e+94, 1.5660484528327942e+94, 2.20879720539753e+94, 3.115347475837545e+94, 4.39397056076075e+94, 6.19737523296388e+94, 8.740946086699414e+94, 1.2328467394420735e+95, 1.7388404731904955e+95, 2.4525077566200685e+95, 3.4590834461343143e+95, 4.8787850945720975e+95, 6.881170798472443e+95, 9.705389895207679e+95, 1.3688745095370484e+96, 1.9306977288832141e+96, 2.7231084327631084e+96, 3.840745977815411e+96, 5.41709227903835e+96, 7.64041384905858e+96, 1.0776246882626323e+97, 1.5199110829529021e+97, 2.143723807782815e+97, 3.023566191205446e+97, 4.2645197480247405e+97, 6.014794296281798e+97, 8.483428982440761e+97, 1.1965258287320443e+98, 1.6876124757881175e+98, 2.380254399901887e+98, 3.357175352479213e+98, 4.735051155774988e+98, 6.67844455346926e+98, 9.419459301799932e+98, 1.3285460832668238e+99, 1.8738174228603563e+99, 2.642882906689389e+99, 3.7275937203149226e+99, 5.257499266638634e+99, 7.415319536585796e+99, 1.0458767760290136e+100, 1.4751329666105257e+100, 2.0805675382171458e+100, 2.9344888759616903e+100, 4.138882687039291e+100, 5.837592378488615e+100, 8.233498592288983e+100, 1.1612749687530978e+101, 1.6378937069540412e+101, 2.310129700083139e+101, 3.2582695742392036e+101, 4.595551764055001e+101, 6.481690828494533e+101, 9.141952512600606e+101, 1.2894057731855572e+102, 1.8186128681292997e+102, 2.56502090568003e+102, 3.6177750426584054e+102, 5.102608025649638e+102, 7.196856730011352e+102, 1.0150641893704374e+103, 1.4316740588229523e+103, 2.0192719161709806e+103, 2.848035868435793e+103, 4.016947020824115e+103, 5.665611008252291e+103, 7.990931403980816e+103, 1.127062634729393e+104, 1.5896397032896e+104, 2.2420709447806045e+104, 3.162277660168379e+104, 4.460162165376323e+104, 6.290733667072907e+104, 8.872621353826237e+104, 1.2514185761897552e+105, 1.765034695363676e+105, 2.4894527978983415e+105, 3.511191734215142e+105, 4.952280037134399e+105, 6.984830058470956e+105, 9.851593726503017e+105, 1.3894954943731248e+106, 1.9597821250882484e+106, 2.7641298538705775e+106, 3.898603702549096e+106, 5.498696382966918e+106, 7.755510490149311e+106, 1.0938582306368795e+107, 1.5428073113327817e+107, 2.1760172691812415e+107, 3.069113764883917e+107, 4.328761281082955e+107, 6.105402296585214e+107, 8.611224963142905e+107, 1.2145505204027233e+108, 1.7130349897073588e+108, 2.416111002931905e+108, 3.407748477738836e+108, 4.80638086306429e+108, 6.779049906922689e+108, 9.561355820489375e+108, 1.3485595530525525e+109, 1.902044963364012e+109, 2.682695795279738e+109, 3.7837468980138e+109, 5.3366992312062146e+109, 7.527025314327229e+109, 1.0616320618412922e+110, 1.4973546489661708e+110, 2.111909601610903e+110, 2.9786945720946193e+110, 4.2012315996188765e+110, 5.9255309755455895e+110, 8.357529574264728e+110, 1.1787686347935817e+111, 1.662567247924299e+111, 2.3449299313555402e+111, 3.307352764125477e+111, 4.664780026090373e+111, 6.579332246575601e+111, 9.279668616466272e+111, 1.3088296259282026e+112, 1.8460087967663742e+112, 2.603660866342325e+112, 3.6722738910006538e+112, 5.1794746792311386e+112, 7.305271542664389e+112, 1.030355308542297e+113, 1.4532410679618515e+113, 2.0496906107065863e+113, 2.890939220091708e+113, 4.077459071436824e+113, 5.750958845380027e+113, 8.111308307896822e+113, 1.1440409196913381e+114, 1.6135863368107733e+114, 2.2758459260747354e+114, 3.20991480968306e+114, 4.527350892858412e+114, 6.385498470312888e+114, 9.006280202112759e+114, 1.2702701826032025e+115, 1.7916235122600268e+115, 2.5269543862746474e+115, 3.564084991415273e+115, 5.026882121429393e+115, 7.090050861192318e+115, 1e+116, 1.4104271176297772e+116, 1.989304654145376e+116, 2.8057692294337633e+116, 3.9573330070045834e+116, 5.581529786570654e+116, 7.872340968837592e+116, 1.1103363181676412e+117, 1.5660484528327943e+117, 2.20879720539753e+117, 3.1153474758375447e+117, 4.3939705607607505e+117, 6.19737523296388e+117, 8.740946086699414e+117, 1.2328467394420734e+118, 1.7388404731904956e+118, 2.4525077566200683e+118, 3.4590834461343143e+118, 4.878785094572097e+118, 6.8811707984724435e+118, 9.70538989520768e+118, 1.3688745095370483e+119, 1.9306977288832142e+119, 2.7231084327631084e+119, 3.840745977815411e+119, 5.41709227903835e+119, 7.64041384905858e+119, 1.0776246882625972e+120, 1.519911082952902e+120, 2.1437238077828148e+120, 3.023566191205446e+120, 4.264519748024741e+120, 6.014794296281798e+120, 8.48342898244076e+120, 1.1965258287320444e+121, 1.6876124757881176e+121, 2.380254399901887e+121, 3.357175352479213e+121, 4.735051155774987e+121, 6.67844455346926e+121, 9.419459301799624e+121, 1.328546083266824e+122, 1.873817422860356e+122, 2.6428829066893896e+122, 3.727593720314923e+122, 5.2574992666386344e+122, 7.415319536585553e+122, 1.0458767760290136e+123, 1.4751329666105256e+123, 2.080567538217146e+123, 2.9344888759616904e+123, 4.138882687039292e+123, 5.837592378488615e+123, 8.233498592288982e+123, 1.1612749687530977e+124, 1.6378937069540412e+124, 2.310129700083139e+124, 3.2582695742392034e+124, 4.595551764055001e+124, 6.481690828494321e+124, 9.141952512600607e+124, 1.2894057731855572e+125, 1.8186128681292996e+125, 2.56502090568003e+125, 3.617775042658405e+125, 5.102608025649638e+125, 7.196856730011351e+125, 1.0150641893704374e+126, 1.4316740588229522e+126, 2.0192719161709806e+126, 2.848035868435793e+126, 4.016947020824115e+126, 5.665611008252291e+126, 7.990931403980816e+126, 1.1270626347293928e+127, 1.5896397032896002e+127, 2.242070944780605e+127, 3.162277660168379e+127, 4.460162165376323e+127, 6.290733667072907e+127, 8.872621353826238e+127, 1.2514185761897961e+128, 1.7650346953637338e+128, 2.489452797898423e+128, 3.5111917342152566e+128, 4.952280037134399e+128, 6.984830058470956e+128, 9.851593726503019e+128, 1.3894954943731247e+129, 1.9597821250882484e+129, 2.7641298538705775e+129, 3.898603702549095e+129, 5.498696382967098e+129, 7.755510490149565e+129, 1.0938582306368436e+130, 1.5428073113327312e+130, 2.1760172691811704e+130, 3.069113764883817e+130, 4.328761281082955e+130, 6.105402296585214e+130, 8.611224963142906e+130, 1.2145505204027231e+131, 1.7130349897073586e+131, 2.4161110029319046e+131, 3.4077484777388367e+131, 4.806380863064448e+131, 6.7790499069229096e+131, 9.561355820489062e+131, 1.3485595530525081e+132, 1.9020449633639494e+132, 2.6826957952796506e+132, 3.7837468980138003e+132, 5.336699231206214e+132, 7.527025314327229e+132, 1.061632061841292e+133, 1.497354648966171e+133, 2.1119096016109031e+133, 2.978694572094717e+133, 4.201231599619014e+133, 5.925530975545784e+133, 8.357529574264454e+133, 1.178768634793543e+134, 1.6625672479242446e+134, 2.3449299313554634e+134, 3.3073527641254775e+134, 4.664780026090373e+134, 6.579332246575601e+134, 9.279668616466272e+134, 1.3088296259282026e+135, 1.846008796766374e+135, 2.6036608663424104e+135, 3.672273891000774e+135, 5.179474679231308e+135, 7.30527154266415e+135, 1.0303553085422633e+136, 1.453241067961804e+136, 2.0496906107065864e+136, 2.8909392200917085e+136, 4.0774590714368236e+136, 5.750958845380027e+136, 8.111308307896823e+136, 1.144040919691338e+137, 1.6135863368107733e+137, 2.2758459260748097e+137, 3.2099148096831647e+137, 4.527350892858561e+137, 6.385498470312679e+137, 9.006280202112464e+137, 1.2702701826031609e+138, 1.7916235122600267e+138, 2.5269543862746473e+138, 3.5640849914152733e+138, 5.026882121429393e+138, 7.090050861192318e+138, 9.999999999999999e+138, 1.410427117629777e+139, 1.9893046541454411e+139, 2.805769229433855e+139, 3.957333007004713e+139, 5.581529786570472e+139, 7.872340968837335e+139, 1.1103363181676049e+140, 1.566048452832794e+140, 2.20879720539753e+140, 3.115347475837545e+140, 4.3939705607607504e+140, 6.19737523296388e+140, 8.740946086699414e+140, 1.2328467394420735e+141, 1.7388404731905526e+141, 2.4525077566201488e+141, 3.459083446134201e+141, 4.878785094571938e+141, 6.881170798472218e+141, 9.705389895207362e+141, 1.3688745095370485e+142, 1.930697728883214e+142, 2.7231084327631083e+142, 3.840745977815411e+142, 5.41709227903835e+142, 7.640413849058581e+142, 1.0776246882626324e+143, 1.5199110829529518e+143, 2.143723807782885e+143, 3.0235661912053467e+143, 4.264519748024601e+143, 6.014794296281602e+143, 8.483428982440483e+143, 1.1965258287320444e+144, 1.6876124757881176e+144, 2.3802543999018867e+144, 3.357175352479213e+144, 4.7350511557749876e+144, 6.678444553469261e+144, 9.419459301799933e+144, 1.3285460832668673e+145, 1.8738174228604177e+145, 2.642882906689303e+145, 3.727593720314801e+145, 5.257499266638462e+145, 7.415319536585553e+145, 1.0458767760290137e+146, 1.4751329666105256e+146, 2.080567538217146e+146, 2.93448887596169e+146, 4.138882687039292e+146, 5.837592378488615e+146, 8.233498592289253e+146, 1.1612749687531358e+147, 1.637893706954095e+147, 2.310129700083064e+147, 3.258269574239097e+147, 4.59555176405485e+147, 6.48169082849432e+147, 9.141952512600607e+147, 1.2894057731855573e+148, 1.8186128681292997e+148, 2.5650209056800303e+148, 3.617775042658405e+148, 5.1026080256496387e+148, 7.196856730011588e+148, 1.0150641893704706e+149, 1.4316740588229056e+149, 2.0192719161709145e+149, 2.8480358684357e+149, 4.0169470208239834e+149, 5.6656110082522915e+149, 7.990931403980815e+149, 1.1270626347293927e+150, 1.5896397032896e+150, 2.2420709447806044e+150, 3.1622776601683793e+150, 4.460162165376323e+150, 6.2907336670731125e+150, 8.87262135382653e+150, 1.2514185761897143e+151, 1.7650346953636184e+151, 2.48945279789826e+151, 3.511191734215027e+151, 4.952280037134399e+151, 6.984830058470956e+151, 9.851593726503018e+151, 1.3894954943731247e+152, 1.9597821250882485e+152, 2.7641298538705777e+152, 3.8986037025490957e+152, 5.498696382967098e+152, 7.7555104901495655e+152, 1.0938582306368435e+153, 1.5428073113327312e+153, 2.17601726918117e+153, 3.069113764883817e+153, 4.3287612810829555e+153, 6.1054022965852145e+153, 8.611224963142904e+153, 1.2145505204027232e+154, 1.7130349897073586e+154, 2.416111002931905e+154, 3.4077484777388367e+154, 4.806380863064448e+154, 6.77904990692291e+154, 9.561355820489063e+154, 1.3485595530525082e+155, 1.9020449633639495e+155, 2.6826957952796503e+155, 3.7837468980138e+155, 5.336699231206214e+155, 7.527025314327229e+155, 1.061632061841292e+156, 1.4973546489661708e+156, 2.111909601610903e+156, 2.9786945720947168e+156, 4.201231599619014e+156, 5.9255309755457835e+156, 8.357529574264454e+156, 1.1787686347935432e+157, 1.6625672479242447e+157, 2.3449299313554635e+157, 3.307352764125477e+157, 4.664780026090373e+157, 6.579332246575602e+157, 9.279668616466273e+157, 1.3088296259282025e+158, 1.846008796766374e+158, 2.6036608663424103e+158, 3.672273891000774e+158, 5.179474679231308e+158, 7.30527154266415e+158, 1.0303553085422634e+159, 1.4532410679618042e+159, 2.0496906107065864e+159, 2.8909392200917084e+159, 4.077459071436824e+159, 5.750958845380027e+159, 8.111308307896823e+159, 1.1440409196913381e+160, 1.6135863368107732e+160, 2.2758459260748097e+160, 3.209914809683165e+160, 4.5273508928582646e+160, 6.385498470312679e+160, 9.006280202112464e+160, 1.2702701826031608e+161, 1.791623512260027e+161, 2.5269543862746473e+161, 3.5640849914152733e+161, 5.026882121429393e+161, 7.090050861192318e+161, 1e+162, 1.4104271176297772e+162, 1.989304654145441e+162, 2.805769229433855e+162, 3.9573330070044546e+162, 5.581529786570471e+162, 7.872340968837335e+162, 1.1103363181676049e+163, 1.566048452832794e+163, 2.20879720539753e+163, 3.115347475837545e+163, 4.3939705607607504e+163, 6.19737523296388e+163, 8.740946086699414e+163, 1.2328467394420734e+164, 1.7388404731905524e+164, 2.452507756620149e+164, 3.459083446134201e+164, 4.878785094571937e+164, 6.881170798472218e+164, 9.705389895207362e+164, 1.3688745095370482e+165, 1.930697728883214e+165, 2.7231084327631086e+165, 3.840745977815411e+165, 5.417092279038351e+165, 7.64041384905858e+165, 1.0776246882626326e+166, 1.519911082952952e+166, 2.143723807782885e+166, 3.0235661912053466e+166, 4.2645197480246007e+166, 6.014794296281602e+166, 8.483428982440483e+166, 1.1965258287320444e+167, 1.6876124757881177e+167, 2.3802543999018866e+167, 3.357175352479213e+167, 4.735051155774987e+167, 6.678444553469261e+167, 9.419459301799933e+167, 1.3285460832668671e+168, 1.873817422860295e+168, 2.642882906689303e+168, 3.727593720314801e+168, 5.257499266638462e+168, 7.4153195365855535e+168, 1.0458767760290135e+169, 1.4751329666105257e+169, 2.080567538217146e+169, 2.9344888759616905e+169, 4.1388826870392914e+169, 5.837592378488615e+169, 8.233498592289253e+169, 1.1612749687531358e+170, 1.6378937069539877e+170, 2.3101297000830635e+170, 3.258269574239097e+170, 4.5955517640548503e+170, 6.48169082849432e+170, 9.141952512600607e+170, 1.2894057731855571e+171, 1.8186128681292996e+171, 2.56502090568003e+171, 3.617775042658405e+171, 5.102608025649639e+171, 7.196856730011588e+171, 1.0150641893704706e+172, 1.4316740588229054e+172, 2.0192719161709146e+172, 2.8480358684357e+172, 4.016947020823983e+172, 5.665611008252292e+172, 7.990931403980814e+172, 1.1270626347293928e+173, 1.5896397032896e+173, 2.2420709447806045e+173, 3.1622776601683794e+173, 4.4601621653763233e+173, 6.290733667073113e+173, 8.872621353826529e+173, 1.2514185761897142e+174, 1.7650346953636183e+174, 2.48945279789826e+174, 3.511191734215027e+174, 4.952280037134399e+174, 6.984830058470956e+174, 9.851593726503018e+174, 1.3894954943731247e+175, 1.9597821250882483e+175, 2.7641298538705777e+175, 3.8986037025490954e+175, 5.498696382967098e+175, 7.755510490149565e+175, 1.0938582306368436e+176, 1.5428073113327312e+176, 2.1760172691811703e+176, 3.0691137648838165e+176, 4.3287612810829557e+176, 6.105402296585214e+176, 8.611224963142906e+176, 1.2145505204027232e+177, 1.7130349897073586e+177, 2.4161110029319048e+177, 3.407748477738836e+177, 4.806380863064448e+177, 6.77904990692291e+177, 9.561355820489063e+177, 1.3485595530525081e+178, 1.90204496336395e+178, 2.6826957952796504e+178, 3.7837468980138e+178, 5.336699231206214e+178, 7.527025314327228e+178, 1.061632061841292e+179, 1.497354648966171e+179, 2.111909601610903e+179, 2.978694572094717e+179, 4.201231599619014e+179, 5.925530975545395e+179, 8.357529574264454e+179, 1.1787686347935434e+180, 1.6625672479242447e+180, 2.3449299313554635e+180, 3.307352764125477e+180, 4.664780026090373e+180, 6.579332246575602e+180, 9.279668616466273e+180, 1.3088296259282026e+181, 1.846008796766374e+181, 2.60366086634241e+181, 3.672273891000774e+181, 5.1794746792309696e+181, 7.30527154266415e+181, 1.0303553085422634e+182, 1.453241067961804e+182, 2.0496906107065864e+182, 2.8909392200917084e+182, 4.077459071436824e+182, 5.750958845380027e+182, 8.111308307896822e+182, 1.144040919691338e+183, 1.613586336810773e+183, 2.2758459260748096e+183, 3.2099148096831646e+183, 4.527350892858265e+183, 6.385498470312679e+183, 9.006280202112463e+183, 1.270270182603161e+184, 1.7916235122600268e+184, 2.526954386274647e+184, 3.5640849914152735e+184, 5.026882121429393e+184, 7.090050861192318e+184, 1e+185, 1.410427117629777e+185, 1.9893046541454412e+185, 2.8057692294338555e+185, 3.957333007004454e+185, 5.58152978657047e+185, 7.872340968837335e+185, 1.110336318167605e+186, 1.5660484528327943e+186, 2.20879720539753e+186, 3.1153474758375447e+186, 4.39397056076075e+186, 6.197375232963881e+186, 8.740946086699414e+186, 1.2328467394420735e+187, 1.7388404731905526e+187, 2.452507756619988e+187, 3.459083446134201e+187, 4.878785094571937e+187, 6.881170798472218e+187, 9.705389895207361e+187, 1.3688745095370484e+188, 1.930697728883214e+188, 2.7231084327631086e+188, 3.840745977815411e+188, 5.41709227903835e+188, 7.64041384905858e+188, 1.0776246882626325e+189, 1.5199110829529517e+189, 2.1437238077827446e+189, 3.023566191205347e+189, 4.264519748024601e+189, 6.014794296281602e+189, 8.483428982440483e+189, 1.1965258287320443e+190, 1.6876124757881177e+190, 2.380254399901887e+190, 3.3571753524792132e+190, 4.735051155774987e+190, 6.678444553469261e+190, 9.419459301799933e+190, 1.3285460832668673e+191, 1.873817422860295e+191, 2.642882906689303e+191, 3.727593720314801e+191, 5.257499266638462e+191, 7.415319536585554e+191, 1.0458767760290136e+192, 1.4751329666105256e+192, 2.0805675382171459e+192, 2.9344888759616903e+192, 4.138882687039292e+192, 5.837592378488615e+192, 8.233498592289253e+192, 1.1612749687531358e+193, 1.6378937069539876e+193, 2.3101297000830636e+193, 3.258269574239097e+193, 4.595551764054851e+193, 6.48169082849432e+193, 9.141952512600606e+193, 1.2894057731855572e+194, 1.8186128681292998e+194, 2.5650209056800302e+194, 3.6177750426584053e+194, 5.1026080256496383e+194, 7.196856730011587e+194, 1.0150641893704707e+195, 1.4316740588229055e+195, 2.0192719161709145e+195, 2.8480358684357e+195, 4.0169470208239834e+195, 5.665611008252291e+195, 7.990931403980815e+195, 1.127062634729393e+196, 1.5896397032896e+196, 2.2420709447806048e+196, 3.1622776601683794e+196, 4.460162165376323e+196, 6.290733667073113e+196, 8.872621353826528e+196, 1.2514185761897143e+197, 1.7650346953636185e+197, 2.48945279789826e+197, 3.511191734215027e+197, 4.952280037134399e+197, 6.984830058470956e+197, 9.851593726503018e+197, 1.3894954943731246e+198, 1.9597821250882484e+198, 2.7641298538705775e+198, 3.898603702549096e+198, 5.498696382967099e+198, 7.755510490149058e+198, 1.0938582306368435e+199, 1.5428073113327312e+199, 2.17601726918117e+199, 3.069113764883817e+199, 4.328761281082955e+199, 6.105402296585214e+199, 8.611224963142905e+199, 1.2145505204027233e+200, 1.7130349897073586e+200, 2.4161110029319048e+200, 3.407748477738836e+200, 4.806380863064448e+200, 6.779049906922466e+200, 9.561355820489063e+200, 1.348559553052508e+201, 1.9020449633639496e+201, 2.6826957952796504e+201, 3.7837468980138e+201, 5.336699231206215e+201, 7.527025314327229e+201, 1.061632061841292e+202, 1.4973546489661708e+202, 2.111909601610903e+202, 2.978694572094717e+202, 4.201231599619014e+202, 5.925530975545396e+202, 8.357529574264454e+202, 1.1787686347935432e+203, 1.6625672479242445e+203, 2.3449299313554632e+203, 3.3073527641254776e+203, 4.664780026090373e+203, 6.579332246575602e+203, 9.279668616466272e+203, 1.3088296259282026e+204, 1.8460087967663742e+204, 2.60366086634241e+204, 3.6722738910007737e+204, 5.179474679230969e+204, 7.30527154266415e+204, 1.0303553085422632e+205, 1.4532410679618043e+205, 2.0496906107065865e+205, 2.890939220091708e+205, 4.0774590714368235e+205, 5.750958845380028e+205, 8.111308307896822e+205, 1.144040919691338e+206, 1.6135863368107734e+206, 2.2758459260748096e+206, 3.2099148096829547e+206, 4.527350892858264e+206, 6.3854984703126795e+206, 9.006280202112464e+206, 1.2702701826031609e+207, 1.791623512260027e+207, 2.5269543862746472e+207, 3.5640849914152733e+207, 5.026882121429393e+207, 7.090050861192318e+207, 1e+208, 1.410427117629777e+208, 1.9893046541454413e+208, 2.8057692294336714e+208, 3.9573330070044543e+208, 5.581529786570472e+208, 7.872340968837335e+208, 1.110336318167605e+209, 1.5660484528327941e+209, 2.20879720539753e+209, 3.115347475837545e+209, 4.39397056076075e+209, 6.1973752329638806e+209, 8.740946086699415e+209, 1.2328467394420735e+210, 1.7388404731905523e+210, 2.4525077566199882e+210, 3.4590834461342006e+210, 4.878785094571938e+210, 6.881170798472218e+210, 9.705389895207362e+210, 1.3688745095370484e+211, 1.930697728883214e+211, 2.7231084327631085e+211, 3.840745977815411e+211, 5.41709227903835e+211, 7.64041384905858e+211, 1.0776246882626324e+212, 1.5199110829529517e+212, 2.1437238077827445e+212, 3.023566191205347e+212, 4.2645197480246014e+212, 6.0147942962816016e+212, 8.483428982440483e+212, 1.1965258287320443e+213, 1.6876124757881177e+213, 2.3802543999018868e+213, 3.357175352479213e+213, 4.735051155774988e+213, 6.67844455346926e+213, 9.419459301799934e+213, 1.3285460832668672e+214, 1.8738174228602948e+214, 2.642882906689303e+214, 3.7275937203148007e+214, 5.257499266638462e+214, 7.415319536585553e+214, 1.0458767760290136e+215, 1.4751329666105257e+215, 2.080567538217146e+215, 2.9344888759616906e+215, 4.1388826870392916e+215, 5.837592378488615e+215, 8.233498592289251e+215, 1.1612749687531357e+216, 1.6378937069539876e+216, 2.3101297000830636e+216, 3.258269574239097e+216, 4.5955517640548505e+216, 6.48169082849432e+216, 9.141952512600606e+216, 1.289405773185557e+217, 1.8186128681292996e+217, 2.56502090568003e+217, 3.617775042658405e+217, 5.102608025649638e+217, 7.196856730011587e+217, 1.0150641893704043e+218, 1.4316740588229055e+218, 2.0192719161709147e+218, 2.8480358684357e+218, 4.016947020823984e+218, 5.6656110082522915e+218, 7.990931403980814e+218, 1.1270626347293929e+219, 1.5896397032895998e+219, 2.2420709447806044e+219, 3.1622776601683793e+219, 4.460162165376323e+219, 6.290733667073112e+219, 8.872621353825948e+219, 1.251418576189714e+220, 1.7650346953636183e+220, 2.48945279789826e+220, 3.511191734215027e+220, 4.952280037134399e+220, 6.984830058470956e+220, 9.851593726503019e+220, 1.3894954943731248e+221, 1.9597821250882485e+221, 2.7641298538705778e+221, 3.898603702549096e+221, 5.498696382967098e+221, 7.755510490149057e+221, 1.0938582306368436e+222, 1.5428073113327313e+222, 2.1760172691811703e+222, 3.069113764883817e+222, 4.3287612810829555e+222, 6.105402296585214e+222, 8.611224963142905e+222, 1.2145505204027233e+223, 1.7130349897073588e+223, 2.4161110029319047e+223, 3.407748477738836e+223, 4.806380863064448e+223, 6.779049906922465e+223, 9.561355820489062e+223, 1.3485595530525083e+224, 1.9020449633639495e+224, 2.6826957952796506e+224, 3.7837468980138e+224, 5.336699231206214e+224, 7.527025314327229e+224, 1.061632061841292e+225, 1.4973546489661708e+225, 2.111909601610903e+225, 2.978694572094717e+225, 4.201231599618739e+225, 5.925530975545396e+225, 8.357529574264453e+225, 1.1787686347935432e+226, 1.6625672479242446e+226, 2.3449299313554634e+226, 3.3073527641254773e+226, 4.664780026090373e+226, 6.579332246575602e+226, 9.279668616466272e+226, 1.3088296259282026e+227, 1.8460087967663742e+227, 2.60366086634241e+227, 3.6722738910005337e+227, 5.179474679230969e+227, 7.30527154266415e+227, 1.0303553085422631e+228, 1.453241067961804e+228, 2.0496906107065863e+228, 2.8909392200917083e+228, 4.077459071436824e+228, 5.750958845380027e+228, 8.111308307896823e+228, 1.144040919691338e+229, 1.6135863368107734e+229, 2.2758459260748097e+229, 3.2099148096829545e+229, 4.527350892858264e+229, 6.38549847031268e+229, 9.006280202112464e+229, 1.2702701826031609e+230, 1.7916235122600268e+230, 2.5269543862746477e+230, 3.5640849914152735e+230, 5.026882121429393e+230, 7.090050861192318e+230, 1e+231, 1.410427117629777e+231, 1.9893046541454413e+231, 2.8057692294336717e+231, 3.957333007004454e+231, 5.581529786570471e+231, 7.872340968837334e+231, 1.1103363181676049e+232, 1.566048452832794e+232, 2.2087972053975297e+232, 3.1153474758375445e+232, 4.39397056076075e+232, 6.19737523296388e+232, 8.740946086699414e+232, 1.2328467394420735e+233, 1.7388404731905526e+233, 2.452507756619988e+233, 3.4590834461342014e+233, 4.878785094571938e+233, 6.881170798472218e+233, 9.705389895207362e+233, 1.3688745095370484e+234, 1.930697728883214e+234, 2.7231084327631085e+234, 3.840745977815411e+234, 5.41709227903835e+234, 7.64041384905858e+234, 1.0776246882626325e+235, 1.5199110829529518e+235, 2.1437238077827445e+235, 3.023566191205347e+235, 4.264519748024601e+235, 6.014794296281601e+235, 8.483428982440483e+235, 1.1965258287320443e+236, 1.6876124757881178e+236, 2.3802543999018867e+236, 3.357175352479213e+236, 4.735051155774988e+236, 6.678444553469261e+236, 9.419459301799933e+236, 1.3285460832667804e+237, 1.873817422860295e+237, 2.642882906689303e+237, 3.727593720314801e+237, 5.257499266638462e+237, 7.415319536585553e+237, 1.0458767760290137e+238, 1.4751329666105256e+238, 2.080567538217146e+238, 2.93448887596169e+238, 4.1388826870392915e+238, 5.837592378488615e+238, 8.233498592289252e+238, 1.1612749687530597e+239, 1.6378937069539876e+239, 2.3101297000830637e+239, 3.258269574239097e+239, 4.5955517640548505e+239, 6.481690828494321e+239, 9.141952512600606e+239, 1.2894057731855572e+240, 1.8186128681292996e+240, 2.5650209056800302e+240, 3.617775042658405e+240, 5.102608025649638e+240, 7.196856730011588e+240, 1.0150641893704043e+241, 1.4316740588229056e+241, 2.0192719161709146e+241, 2.8480358684357e+241, 4.016947020823983e+241, 5.665611008252291e+241, 7.990931403980814e+241, 1.1270626347293928e+242, 1.5896397032895998e+242, 2.2420709447806047e+242, 3.162277660168379e+242, 4.460162165376323e+242, 6.290733667073113e+242, 8.872621353825948e+242, 1.2514185761897143e+243, 1.7650346953636185e+243, 2.48945279789826e+243, 3.511191734215027e+243, 4.952280037134399e+243, 6.984830058470956e+243, 9.85159372650302e+243, 1.3894954943731247e+244, 1.9597821250882482e+244, 2.764129853870578e+244, 3.898603702549096e+244, 5.498696382966738e+244, 7.755510490149058e+244, 1.0938582306368435e+245, 1.5428073113327312e+245, 2.1760172691811703e+245, 3.069113764883817e+245, 4.328761281082955e+245, 6.105402296585214e+245, 8.611224963142905e+245, 1.214550520402723e+246, 1.7130349897073587e+246, 2.416111002931905e+246, 3.4077484777388364e+246, 4.806380863064133e+246, 6.779049906922466e+246, 9.561355820489063e+246, 1.3485595530525082e+247, 1.9020449633639495e+247, 2.6826957952796505e+247, 3.7837468980138004e+247, 5.3366992312062145e+247, 7.527025314327229e+247, 1.061632061841292e+248, 1.4973546489661708e+248, 2.111909601610903e+248, 2.978694572094717e+248, 4.201231599618739e+248, 5.925530975545396e+248, 8.357529574264454e+248, 1.1787686347935431e+249, 1.6625672479242446e+249, 2.344929931355463e+249, 3.3073527641254775e+249, 4.664780026090373e+249, 6.579332246575601e+249, 9.279668616466272e+249, 1.3088296259282026e+250, 1.8460087967663743e+250, 2.60366086634241e+250, 3.672273891000534e+250, 5.179474679230969e+250, 7.30527154266415e+250, 1.0303553085422633e+251, 1.453241067961804e+251, 2.0496906107065864e+251, 2.890939220091708e+251, 4.077459071436824e+251, 5.750958845380027e+251, 8.111308307896822e+251, 1.144040919691338e+252, 1.6135863368107732e+252, 2.2758459260748097e+252, 3.2099148096829544e+252, 4.527350892858264e+252, 6.38549847031268e+252, 9.006280202112463e+252, 1.270270182603161e+253, 1.791623512260027e+253, 2.5269543862746474e+253, 3.5640849914152734e+253, 5.0268821214293926e+253, 7.090050861192318e+253, 1e+254, 1.410427117629777e+254, 1.989304654145441e+254, 2.805769229433672e+254, 3.9573330070044544e+254, 5.581529786570471e+254, 7.872340968837335e+254, 1.1103363181676048e+255, 1.5660484528327942e+255, 2.2087972053975296e+255, 3.115347475837545e+255, 4.39397056076075e+255, 6.19737523296388e+255, 8.740946086699414e+255, 1.232846739442154e+256, 1.738840473190439e+256, 2.4525077566199883e+256, 3.459083446134201e+256, 4.878785094571938e+256, 6.881170798472218e+256, 9.705389895207362e+256, 1.3688745095370484e+257, 1.930697728883214e+257, 2.723108432763109e+257, 3.8407459778154113e+257, 5.41709227903835e+257, 7.64041384905858e+257, 1.0776246882626324e+258, 1.5199110829529517e+258, 2.1437238077828847e+258, 3.0235661912055446e+258, 4.26451974802488e+258, 6.014794296281995e+258, 8.483428982441038e+258, 1.196525828731966e+259, 1.6876124757880073e+259, 2.380254399901731e+259, 3.357175352478993e+259, 4.735051155774678e+259, 6.678444553468824e+259, 9.419459301799317e+259, 1.3285460832667803e+260, 1.873817422860295e+260, 2.642882906689303e+260, 3.7275937203148004e+260, 5.257499266638462e+260, 7.415319536585553e+260, 1.0458767760290137e+261, 1.4751329666105255e+261, 2.080567538217146e+261, 2.9344888759616905e+261, 4.138882687039291e+261, 5.837592378488615e+261, 8.233498592289252e+261, 1.1612749687531359e+262, 1.637893706954095e+262, 2.3101297000832147e+262, 3.25826957423931e+262, 4.5955517640551516e+262, 6.481690828494745e+262, 9.141952512600008e+262, 1.2894057731854727e+263, 1.8186128681291806e+263, 2.5650209056798624e+263, 3.6177750426581687e+263, 5.102608025649305e+263, 7.196856730011117e+263, 1.0150641893704043e+264, 1.4316740588229053e+264, 2.0192719161709144e+264, 2.8480358684357e+264, 4.0169470208239835e+264, 5.665611008252291e+264, 7.990931403980815e+264, 1.127062634729393e+265, 1.5896397032895999e+265, 2.2420709447806045e+265, 3.1622776601683792e+265, 4.4601621653763236e+265, 6.290733667073113e+265, 8.872621353826529e+265, 1.2514185761897962e+266, 1.7650346953637336e+266, 2.4894527978984228e+266, 3.5111917342152565e+266, 4.952280037134723e+266, 6.984830058470499e+266, 9.851593726502373e+266, 1.3894954943730337e+267, 1.9597821250881203e+267, 2.7641298538703967e+267, 3.8986037025488407e+267, 5.498696382966738e+267, 7.755510490149058e+267, 1.0938582306368436e+268, 1.5428073113327312e+268, 2.1760172691811702e+268, 3.069113764883817e+268, 4.328761281082955e+268, 6.1054022965852144e+268, 8.611224963142905e+268, 1.2145505204027232e+269, 1.7130349897073587e+269, 2.4161110029319048e+269, 3.407748477738837e+269, 4.806380863064448e+269, 6.77904990692291e+269, 9.561355820489688e+269, 1.3485595530525963e+270, 1.9020449633640741e+270, 2.682695795279826e+270, 3.7837468980135523e+270, 5.336699231205865e+270, 7.527025314326736e+270, 1.0616320618412226e+271, 1.4973546489660727e+271, 2.1119096016107647e+271, 2.978694572094522e+271, 4.201231599618739e+271, 5.925530975545396e+271, 8.357529574264454e+271, 1.1787686347935432e+272, 1.6625672479242446e+272, 2.3449299313554635e+272, 3.3073527641254777e+272, 4.6647800260903734e+272, 6.579332246575602e+272, 9.279668616466272e+272, 1.3088296259282024e+273, 1.846008796766374e+273, 2.60366086634241e+273, 3.672273891000774e+273, 5.179474679231308e+273, 7.305271542664629e+273, 1.0303553085423308e+274, 1.4532410679618993e+274, 2.0496906107067205e+274, 2.8909392200915192e+274, 4.077459071436557e+274, 5.7509588453796506e+274, 8.111308307896292e+274, 1.1440409196912631e+275, 1.6135863368106678e+275, 2.2758459260746608e+275, 3.209914809682954e+275, 4.5273508928582644e+275, 6.38549847031268e+275, 9.006280202112464e+275, 1.270270182603161e+276, 1.7916235122600267e+276, 2.5269543862746474e+276, 3.5640849914152734e+276, 5.026882121429393e+276, 7.090050861192318e+276, 1e+277, 1.410427117629777e+277, 1.989304654145441e+277, 2.8057692294338553e+277, 3.957333007004713e+277, 5.581529786570836e+277, 7.872340968837849e+277, 1.1103363181676776e+278, 1.5660484528328967e+278, 2.2087972053973853e+278, 3.115347475837341e+278, 4.3939705607604624e+278, 6.197375232963474e+278, 8.740946086698843e+278, 1.2328467394419928e+279, 1.7388404731904388e+279, 2.4525077566199885e+279, 3.459083446134201e+279, 4.878785094571938e+279, 6.881170798472218e+279, 9.705389895207362e+279, 1.3688745095370484e+280, 1.930697728883214e+280, 2.7231084327631086e+280, 3.8407459778154105e+280, 5.4170922790383495e+280, 7.64041384905858e+280, 1.0776246882626324e+281, 1.5199110829529518e+281, 2.143723807782885e+281, 3.023566191205545e+281, 4.2645197480248797e+281, 6.014794296281995e+281, 8.483428982441038e+281, 1.196525828731966e+282, 1.6876124757880073e+282, 2.380254399901731e+282, 3.3571753524789936e+282, 4.735051155774678e+282, 6.678444553468823e+282, 9.419459301799318e+282, 1.3285460832667803e+283, 1.873817422860295e+283, 2.642882906689303e+283, 3.727593720314801e+283, 5.257499266638462e+283, 7.415319536585553e+283, 1.0458767760290137e+284, 1.4751329666105257e+284, 2.0805675382171456e+284, 2.9344888759616905e+284, 4.138882687039291e+284, 5.837592378488615e+284, 8.233498592289253e+284, 1.1612749687531358e+285, 1.6378937069540947e+285, 2.3101297000832148e+285, 3.2582695742393105e+285, 4.5955517640551515e+285, 6.481690828494745e+285, 9.141952512600008e+285, 1.289405773185473e+286, 1.8186128681291806e+286, 2.5650209056798623e+286, 3.6177750426581686e+286, 5.102608025649305e+286, 7.196856730011117e+286, 1.0150641893704041e+287, 1.4316740588229055e+287, 2.0192719161709146e+287, 2.8480358684357e+287, 4.0169470208239835e+287, 5.665611008252291e+287, 7.990931403980814e+287, 1.1270626347293929e+288, 1.5896397032896e+288, 2.2420709447806045e+288, 3.1622776601683793e+288, 4.460162165376323e+288, 6.290733667073113e+288, 8.872621353826529e+288, 1.2514185761897963e+289, 1.7650346953637338e+289, 2.4894527978984227e+289, 3.5111917342152565e+289, 4.952280037134075e+289, 6.984830058470499e+289, 9.851593726502373e+289, 1.3894954943730338e+290, 1.95978212508812e+290, 2.7641298538703966e+290, 3.89860370254884e+290, 5.4986963829667385e+290, 7.755510490149057e+290, 1.0938582306368435e+291, 1.5428073113327312e+291, 2.1760172691811703e+291, 3.069113764883817e+291, 4.3287612810829555e+291, 6.105402296585215e+291, 8.611224963142905e+291, 1.2145505204027233e+292, 1.7130349897073588e+292, 2.4161110029319047e+292, 3.4077484777388367e+292, 4.806380863064448e+292, 6.77904990692291e+292, 9.561355820489688e+292, 1.3485595530525964e+293, 1.902044963364074e+293, 2.682695795279826e+293, 3.783746898013552e+293, 5.336699231205865e+293, 7.527025314326736e+293, 1.0616320618412225e+294, 1.4973546489660727e+294, 2.1119096016107648e+294, 2.978694572094522e+294, 4.201231599618739e+294, 5.925530975545396e+294, 8.357529574264455e+294, 1.1787686347935432e+295, 1.6625672479242445e+295, 2.3449299313554635e+295, 3.3073527641254774e+295, 4.664780026090373e+295, 6.579332246575602e+295, 9.279668616466273e+295, 1.3088296259282026e+296, 1.846008796766374e+296, 2.6036608663424102e+296, 3.672273891000774e+296, 5.1794746792313076e+296, 7.305271542664628e+296, 1.0303553085423307e+297, 1.4532410679618993e+297, 2.0496906107064523e+297, 2.890939220091519e+297, 4.077459071436557e+297, 5.750958845379651e+297, 8.111308307896292e+297, 1.1440409196912631e+298, 1.6135863368106675e+298, 2.2758459260746606e+298, 3.209914809682955e+298, 4.527350892858264e+298, 6.38549847031268e+298, 9.006280202112464e+298, 1.2702701826031608e+299, 1.7916235122600267e+299, 2.5269543862746474e+299, 3.564084991415273e+299, 5.0268821214293925e+299, 7.090050861192318e+299, 1e+300], "x": [1.0, 1.1493506493506493, 1.2987012987012987, 1.448051948051948, 1.5974025974025974, 1.7467532467532467, 1.896103896103896, 2.0454545454545454, 2.1948051948051948, 2.344155844155844, 2.4935064935064934, 2.642857142857143, 2.792207792207792, 2.9415584415584415, 3.090909090909091, 3.24025974025974, 3.3896103896103895, 3.538961038961039, 3.688311688311688, 3.8376623376623376, 3.987012987012987, 4.136363636363637, 4.285714285714286, 4.4350649350649345, 4.584415584415584, 4.733766233766234, 4.883116883116883, 5.032467532467532, 5.181818181818182, 5.3311688311688314, 5.48051948051948, 5.629870129870129, 5.779220779220779, 5.928571428571429, 6.077922077922078, 6.227272727272727, 6.376623376623376, 6.525974025974026, 6.675324675324675, 6.824675324675324, 6.974025974025974, 7.123376623376624, 7.2727272727272725, 7.422077922077921, 7.571428571428571, 7.720779220779221, 7.87012987012987, 8.019480519480519, 8.168831168831169, 8.318181818181818, 8.467532467532468, 8.616883116883116, 8.766233766233766, 8.915584415584416, 9.064935064935064, 9.214285714285714, 9.363636363636363, 9.512987012987013, 9.662337662337663, 9.811688311688311, 9.96103896103896, 10.11038961038961, 10.259740259740258, 10.409090909090908, 10.558441558441558, 10.707792207792208, 10.857142857142858, 11.006493506493506, 11.155844155844155, 11.305194805194805, 11.454545454545453, 11.603896103896103, 11.753246753246753, 11.902597402597403, 12.051948051948052, 12.2012987012987, 12.35064935064935, 12.5, 12.649350649350648, 12.798701298701298, 12.948051948051948, 13.097402597402597, 13.246753246753247, 13.396103896103895, 13.545454545454545, 13.694805194805195, 13.844155844155843, 13.993506493506493, 14.142857142857142, 14.292207792207792, 14.441558441558442, 14.59090909090909, 14.74025974025974, 14.88961038961039, 15.038961038961038, 15.188311688311687, 15.337662337662337, 15.487012987012987, 15.636363636363637, 15.785714285714285, 15.935064935064934, 16.084415584415584, 16.233766233766232, 16.383116883116884, 16.532467532467532, 16.68181818181818, 16.83116883116883, 16.98051948051948, 17.129870129870127, 17.27922077922078, 17.428571428571427, 17.57792207792208, 17.727272727272727, 17.876623376623375, 18.025974025974026, 18.175324675324674, 18.324675324675326, 18.474025974025974, 18.623376623376622, 18.772727272727273, 18.92207792207792, 19.07142857142857, 19.22077922077922, 19.37012987012987, 19.519480519480517, 19.66883116883117, 19.818181818181817, 19.967532467532468, 20.116883116883116, 20.266233766233764, 20.415584415584416, 20.564935064935064, 20.714285714285715, 20.863636363636363, 21.01298701298701, 21.162337662337663, 21.31168831168831, 21.46103896103896, 21.61038961038961, 21.75974025974026, 21.909090909090907, 22.058441558441558, 22.207792207792206, 22.357142857142858, 22.506493506493506, 22.655844155844154, 22.805194805194805, 22.954545454545453, 23.103896103896105, 23.253246753246753, 23.4025974025974, 23.551948051948052, 23.7012987012987, 23.85064935064935, 24.0, 24.149350649350648, 24.298701298701296, 24.448051948051948, 24.597402597402596, 24.746753246753247, 24.896103896103895, 25.045454545454543, 25.194805194805195, 25.344155844155843, 25.493506493506494, 25.642857142857142, 25.79220779220779, 25.941558441558442, 26.09090909090909, 26.240259740259738, 26.38961038961039, 26.538961038961038, 26.688311688311686, 26.837662337662337, 26.987012987012985, 27.136363636363637, 27.285714285714285, 27.435064935064933, 27.584415584415584, 27.733766233766232, 27.883116883116884, 28.032467532467532, 28.18181818181818, 28.33116883116883, 28.48051948051948, 28.629870129870127, 28.77922077922078, 28.928571428571427, 29.077922077922075, 29.227272727272727, 29.376623376623375, 29.525974025974026, 29.675324675324674, 29.824675324675322, 29.974025974025974, 30.123376623376622, 30.272727272727273, 30.42207792207792, 30.57142857142857, 30.72077922077922, 30.87012987012987, 31.019480519480517, 31.16883116883117, 31.318181818181817, 31.467532467532465, 31.616883116883116, 31.766233766233764, 31.915584415584416, 32.064935064935064, 32.21428571428571, 32.36363636363636, 32.51298701298701, 32.66233766233766, 32.811688311688314, 32.96103896103896, 33.11038961038961, 33.259740259740255, 33.40909090909091, 33.55844155844156, 33.70779220779221, 33.857142857142854, 34.006493506493506, 34.15584415584416, 34.3051948051948, 34.45454545454545, 34.603896103896105, 34.75324675324675, 34.9025974025974, 35.05194805194805, 35.2012987012987, 35.35064935064935, 35.5, 35.64935064935065, 35.798701298701296, 35.94805194805195, 36.0974025974026, 36.246753246753244, 36.396103896103895, 36.54545454545455, 36.69480519480519, 36.84415584415584, 36.993506493506494, 37.14285714285714, 37.29220779220779, 37.44155844155844, 37.590909090909086, 37.74025974025974, 37.88961038961039, 38.038961038961034, 38.188311688311686, 38.33766233766234, 38.48701298701299, 38.63636363636363, 38.785714285714285, 38.935064935064936, 39.08441558441558, 39.23376623376623, 39.383116883116884, 39.53246753246753, 39.68181818181818, 39.83116883116883, 39.980519480519476, 40.12987012987013, 40.27922077922078, 40.42857142857143, 40.577922077922075, 40.72727272727273, 40.87662337662338, 41.02597402597402, 41.175324675324674, 41.324675324675326, 41.47402597402597, 41.62337662337662, 41.77272727272727, 41.92207792207792, 42.07142857142857, 42.22077922077922, 42.370129870129865, 42.51948051948052, 42.66883116883117, 42.81818181818181, 42.967532467532465, 43.116883116883116, 43.26623376623377, 43.41558441558441, 43.564935064935064, 43.714285714285715, 43.86363636363636, 44.01298701298701, 44.16233766233766, 44.31168831168831, 44.46103896103896, 44.61038961038961, 44.759740259740255, 44.90909090909091, 45.05844155844156, 45.20779220779221, 45.357142857142854, 45.506493506493506, 45.65584415584416, 45.8051948051948, 45.95454545454545, 46.103896103896105, 46.25324675324675, 46.4025974025974, 46.55194805194805, 46.7012987012987, 46.85064935064935, 47.0, 47.149350649350644, 47.298701298701296, 47.44805194805195, 47.59740259740259, 47.746753246753244, 47.896103896103895, 48.04545454545455, 48.19480519480519, 48.34415584415584, 48.493506493506494, 48.64285714285714, 48.79220779220779, 48.94155844155844, 49.090909090909086, 49.24025974025974, 49.38961038961039, 49.538961038961034, 49.688311688311686, 49.83766233766234, 49.98701298701299, 50.13636363636363, 50.285714285714285, 50.435064935064936, 50.58441558441558, 50.73376623376623, 50.883116883116884, 51.03246753246753, 51.18181818181818, 51.33116883116883, 51.480519480519476, 51.62987012987013, 51.77922077922078, 51.92857142857142, 52.077922077922075, 52.22727272727273, 52.37662337662337, 52.52597402597402, 52.675324675324674, 52.824675324675326, 52.97402597402597, 53.12337662337662, 53.27272727272727, 53.42207792207792, 53.57142857142857, 53.72077922077922, 53.870129870129865, 54.01948051948052, 54.16883116883117, 54.31818181818181, 54.467532467532465, 54.616883116883116, 54.76623376623377, 54.91558441558441, 55.064935064935064, 55.214285714285715, 55.36363636363636, 55.51298701298701, 55.66233766233766, 55.81168831168831, 55.96103896103896, 56.11038961038961, 56.259740259740255, 56.40909090909091, 56.55844155844156, 56.7077922077922, 56.857142857142854, 57.006493506493506, 57.15584415584415, 57.3051948051948, 57.45454545454545, 57.603896103896105, 57.75324675324675, 57.9025974025974, 58.05194805194805, 58.2012987012987, 58.35064935064935, 58.5, 58.649350649350644, 58.798701298701296, 58.94805194805195, 59.09740259740259, 59.246753246753244, 59.396103896103895, 59.54545454545455, 59.69480519480519, 59.84415584415584, 59.993506493506494, 60.14285714285714, 60.29220779220779, 60.44155844155844, 60.590909090909086, 60.74025974025974, 60.88961038961039, 61.038961038961034, 61.188311688311686, 61.33766233766234, 61.48701298701298, 61.63636363636363, 61.785714285714285, 61.93506493506493, 62.08441558441558, 62.23376623376623, 62.383116883116884, 62.53246753246753, 62.68181818181818, 62.83116883116883, 62.980519480519476, 63.12987012987013, 63.27922077922078, 63.42857142857142, 63.577922077922075, 63.72727272727273, 63.87662337662337, 64.02597402597402, 64.17532467532467, 64.32467532467533, 64.47402597402598, 64.62337662337663, 64.77272727272728, 64.92207792207792, 65.07142857142857, 65.22077922077922, 65.37012987012987, 65.51948051948051, 65.66883116883116, 65.81818181818181, 65.96753246753246, 66.11688311688312, 66.26623376623377, 66.41558441558442, 66.56493506493506, 66.71428571428571, 66.86363636363636, 67.01298701298701, 67.16233766233766, 67.31168831168831, 67.46103896103895, 67.6103896103896, 67.75974025974025, 67.9090909090909, 68.05844155844156, 68.20779220779221, 68.35714285714286, 68.5064935064935, 68.65584415584415, 68.8051948051948, 68.95454545454545, 69.1038961038961, 69.25324675324676, 69.4025974025974, 69.55194805194805, 69.7012987012987, 69.85064935064935, 70.0, 70.14935064935065, 70.2987012987013, 70.44805194805194, 70.59740259740259, 70.74675324675324, 70.8961038961039, 71.04545454545455, 71.1948051948052, 71.34415584415584, 71.49350649350649, 71.64285714285714, 71.79220779220779, 71.94155844155844, 72.0909090909091, 72.24025974025973, 72.38961038961038, 72.53896103896103, 72.68831168831169, 72.83766233766234, 72.98701298701299, 73.13636363636364, 73.28571428571428, 73.43506493506493, 73.58441558441558, 73.73376623376623, 73.88311688311688, 74.03246753246754, 74.18181818181817, 74.33116883116882, 74.48051948051948, 74.62987012987013, 74.77922077922078, 74.92857142857143, 75.07792207792207, 75.22727272727272, 75.37662337662337, 75.52597402597402, 75.67532467532467, 75.82467532467533, 75.97402597402598, 76.12337662337661, 76.27272727272727, 76.42207792207792, 76.57142857142857, 76.72077922077922, 76.87012987012987, 77.01948051948051, 77.16883116883116, 77.31818181818181, 77.46753246753246, 77.61688311688312, 77.76623376623377, 77.91558441558442, 78.06493506493506, 78.21428571428571, 78.36363636363636, 78.51298701298701, 78.66233766233766, 78.81168831168831, 78.96103896103895, 79.1103896103896, 79.25974025974025, 79.4090909090909, 79.55844155844156, 79.70779220779221, 79.85714285714286, 80.0064935064935, 80.15584415584415, 80.3051948051948, 80.45454545454545, 80.6038961038961, 80.75324675324676, 80.9025974025974, 81.05194805194805, 81.2012987012987, 81.35064935064935, 81.5, 81.64935064935065, 81.79870129870129, 81.94805194805194, 82.09740259740259, 82.24675324675324, 82.3961038961039, 82.54545454545455, 82.6948051948052, 82.84415584415584, 82.99350649350649, 83.14285714285714, 83.29220779220779, 83.44155844155844, 83.5909090909091, 83.74025974025973, 83.88961038961038, 84.03896103896103, 84.18831168831169, 84.33766233766234, 84.48701298701299, 84.63636363636363, 84.78571428571428, 84.93506493506493, 85.08441558441558, 85.23376623376623, 85.38311688311688, 85.53246753246754, 85.68181818181817, 85.83116883116882, 85.98051948051948, 86.12987012987013, 86.27922077922078, 86.42857142857143, 86.57792207792207, 86.72727272727272, 86.87662337662337, 87.02597402597402, 87.17532467532467, 87.32467532467533, 87.47402597402598, 87.62337662337661, 87.77272727272727, 87.92207792207792, 88.07142857142857, 88.22077922077922, 88.37012987012987, 88.51948051948051, 88.66883116883116, 88.81818181818181, 88.96753246753246, 89.11688311688312, 89.26623376623377, 89.41558441558442, 89.56493506493506, 89.71428571428571, 89.86363636363636, 90.01298701298701, 90.16233766233766, 90.31168831168831, 90.46103896103895, 90.6103896103896, 90.75974025974025, 90.9090909090909, 91.05844155844156, 91.20779220779221, 91.35714285714285, 91.5064935064935, 91.65584415584415, 91.8051948051948, 91.95454545454545, 92.1038961038961, 92.25324675324676, 92.4025974025974, 92.55194805194805, 92.7012987012987, 92.85064935064935, 93.0, 93.14935064935065, 93.29870129870129, 93.44805194805194, 93.59740259740259, 93.74675324675324, 93.8961038961039, 94.04545454545455, 94.19480519480518, 94.34415584415584, 94.49350649350649, 94.64285714285714, 94.79220779220779, 94.94155844155844, 95.0909090909091, 95.24025974025973, 95.38961038961038, 95.53896103896103, 95.68831168831169, 95.83766233766234, 95.98701298701299, 96.13636363636363, 96.28571428571428, 96.43506493506493, 96.58441558441558, 96.73376623376623, 96.88311688311688, 97.03246753246754, 97.18181818181817, 97.33116883116882, 97.48051948051948, 97.62987012987013, 97.77922077922078, 97.92857142857143, 98.07792207792207, 98.22727272727272, 98.37662337662337, 98.52597402597402, 98.67532467532467, 98.82467532467533, 98.97402597402598, 99.12337662337661, 99.27272727272727, 99.42207792207792, 99.57142857142857, 99.72077922077922, 99.87012987012987, 100.01948051948051, 100.16883116883116, 100.31818181818181, 100.46753246753246, 100.61688311688312, 100.76623376623377, 100.9155844155844, 101.06493506493506, 101.21428571428571, 101.36363636363636, 101.51298701298701, 101.66233766233766, 101.81168831168831, 101.96103896103895, 102.1103896103896, 102.25974025974025, 102.4090909090909, 102.55844155844156, 102.70779220779221, 102.85714285714285, 103.0064935064935, 103.15584415584415, 103.3051948051948, 103.45454545454545, 103.6038961038961, 103.75324675324674, 103.9025974025974, 104.05194805194805, 104.2012987012987, 104.35064935064935, 104.5, 104.64935064935065, 104.79870129870129, 104.94805194805194, 105.09740259740259, 105.24675324675324, 105.3961038961039, 105.54545454545455, 105.69480519480518, 105.84415584415584, 105.99350649350649, 106.14285714285714, 106.29220779220779, 106.44155844155844, 106.5909090909091, 106.74025974025973, 106.88961038961038, 107.03896103896103, 107.18831168831169, 107.33766233766234, 107.48701298701299, 107.63636363636363, 107.78571428571428, 107.93506493506493, 108.08441558441558, 108.23376623376623, 108.38311688311688, 108.53246753246754, 108.68181818181817, 108.83116883116882, 108.98051948051948, 109.12987012987013, 109.27922077922078, 109.42857142857143, 109.57792207792207, 109.72727272727272, 109.87662337662337, 110.02597402597402, 110.17532467532467, 110.32467532467533, 110.47402597402596, 110.62337662337661, 110.77272727272727, 110.92207792207792, 111.07142857142857, 111.22077922077922, 111.37012987012987, 111.51948051948051, 111.66883116883116, 111.81818181818181, 111.96753246753246, 112.11688311688312, 112.26623376623377, 112.4155844155844, 112.56493506493506, 112.71428571428571, 112.86363636363636, 113.01298701298701, 113.16233766233766, 113.3116883116883, 113.46103896103895, 113.6103896103896, 113.75974025974025, 113.9090909090909, 114.05844155844156, 114.20779220779221, 114.35714285714285, 114.5064935064935, 114.65584415584415, 114.8051948051948, 114.95454545454545, 115.1038961038961, 115.25324675324674, 115.4025974025974, 115.55194805194805, 115.7012987012987, 115.85064935064935, 116.0, 116.14935064935065, 116.29870129870129, 116.44805194805194, 116.59740259740259, 116.74675324675324, 116.8961038961039, 117.04545454545455, 117.19480519480518, 117.34415584415584, 117.49350649350649, 117.64285714285714, 117.79220779220779, 117.94155844155844, 118.0909090909091, 118.24025974025973, 118.38961038961038, 118.53896103896103, 118.68831168831169, 118.83766233766234, 118.98701298701299, 119.13636363636363, 119.28571428571428, 119.43506493506493, 119.58441558441558, 119.73376623376623, 119.88311688311688, 120.03246753246752, 120.18181818181817, 120.33116883116882, 120.48051948051948, 120.62987012987013, 120.77922077922078, 120.92857142857143, 121.07792207792207, 121.22727272727272, 121.37662337662337, 121.52597402597402, 121.67532467532467, 121.82467532467533, 121.97402597402596, 122.12337662337661, 122.27272727272727, 122.42207792207792, 122.57142857142857, 122.72077922077922, 122.87012987012986, 123.01948051948051, 123.16883116883116, 123.31818181818181, 123.46753246753246, 123.61688311688312, 123.76623376623377, 123.9155844155844, 124.06493506493506, 124.21428571428571, 124.36363636363636, 124.51298701298701, 124.66233766233766, 124.8116883116883, 124.96103896103895, 125.1103896103896, 125.25974025974025, 125.4090909090909, 125.55844155844156, 125.70779220779221, 125.85714285714285, 126.0064935064935, 126.15584415584415, 126.3051948051948, 126.45454545454545, 126.6038961038961, 126.75324675324674, 126.9025974025974, 127.05194805194805, 127.2012987012987, 127.35064935064935, 127.5, 127.64935064935065, 127.79870129870129, 127.94805194805194, 128.0974025974026, 128.24675324675326, 128.3961038961039, 128.54545454545456, 128.69480519480518, 128.84415584415584, 128.9935064935065, 129.14285714285714, 129.2922077922078, 129.44155844155844, 129.5909090909091, 129.74025974025975, 129.8896103896104, 130.03896103896102, 130.18831168831167, 130.33766233766232, 130.48701298701297, 130.63636363636363, 130.78571428571428, 130.93506493506493, 131.08441558441558, 131.23376623376623, 131.38311688311688, 131.53246753246754, 131.6818181818182, 131.83116883116884, 131.98051948051946, 132.1298701298701, 132.27922077922076, 132.42857142857142, 132.57792207792207, 132.72727272727272, 132.87662337662337, 133.02597402597402, 133.17532467532467, 133.32467532467533, 133.47402597402598, 133.62337662337663, 133.77272727272728, 133.9220779220779, 134.07142857142856, 134.2207792207792, 134.37012987012986, 134.5194805194805, 134.66883116883116, 134.8181818181818, 134.96753246753246, 135.11688311688312, 135.26623376623377, 135.41558441558442, 135.56493506493507, 135.71428571428572, 135.86363636363635, 136.012987012987, 136.16233766233765, 136.3116883116883, 136.46103896103895, 136.6103896103896, 136.75974025974025, 136.9090909090909, 137.05844155844156, 137.2077922077922, 137.35714285714286, 137.5064935064935, 137.65584415584416, 137.8051948051948, 137.95454545454544, 138.1038961038961, 138.25324675324674, 138.4025974025974, 138.55194805194805, 138.7012987012987, 138.85064935064935, 139.0, 139.14935064935065, 139.2987012987013, 139.44805194805195, 139.5974025974026, 139.74675324675323, 139.89610389610388, 140.04545454545453, 140.19480519480518, 140.34415584415584, 140.4935064935065, 140.64285714285714, 140.7922077922078, 140.94155844155844, 141.0909090909091, 141.24025974025975, 141.3896103896104, 141.53896103896102, 141.68831168831167, 141.83766233766232, 141.98701298701297, 142.13636363636363, 142.28571428571428, 142.43506493506493, 142.58441558441558, 142.73376623376623, 142.88311688311688, 143.03246753246754, 143.1818181818182, 143.33116883116884, 143.48051948051946, 143.6298701298701, 143.77922077922076, 143.92857142857142, 144.07792207792207, 144.22727272727272, 144.37662337662337, 144.52597402597402, 144.67532467532467, 144.82467532467533, 144.97402597402598, 145.12337662337663, 145.27272727272728, 145.4220779220779, 145.57142857142856, 145.7207792207792, 145.87012987012986, 146.0194805194805, 146.16883116883116, 146.3181818181818, 146.46753246753246, 146.61688311688312, 146.76623376623377, 146.91558441558442, 147.06493506493507, 147.21428571428572, 147.36363636363635, 147.512987012987, 147.66233766233765, 147.8116883116883, 147.96103896103895, 148.1103896103896, 148.25974025974025, 148.4090909090909, 148.55844155844156, 148.7077922077922, 148.85714285714286, 149.0064935064935, 149.15584415584414, 149.3051948051948, 149.45454545454544, 149.6038961038961, 149.75324675324674, 149.9025974025974, 150.05194805194805, 150.2012987012987, 150.35064935064935, 150.5, 150.64935064935065, 150.7987012987013, 150.94805194805195, 151.09740259740258, 151.24675324675323, 151.39610389610388, 151.54545454545453, 151.69480519480518, 151.84415584415584, 151.9935064935065, 152.14285714285714, 152.2922077922078, 152.44155844155844, 152.5909090909091, 152.74025974025975, 152.8896103896104, 153.03896103896102, 153.18831168831167, 153.33766233766232, 153.48701298701297, 153.63636363636363, 153.78571428571428, 153.93506493506493, 154.08441558441558, 154.23376623376623, 154.38311688311688, 154.53246753246754, 154.6818181818182, 154.83116883116884, 154.98051948051946, 155.1298701298701, 155.27922077922076, 155.42857142857142, 155.57792207792207, 155.72727272727272, 155.87662337662337, 156.02597402597402, 156.17532467532467, 156.32467532467533, 156.47402597402598, 156.62337662337663, 156.77272727272728, 156.9220779220779, 157.07142857142856, 157.2207792207792, 157.37012987012986, 157.5194805194805, 157.66883116883116, 157.8181818181818, 157.96753246753246, 158.11688311688312, 158.26623376623377, 158.41558441558442, 158.56493506493507, 158.71428571428572, 158.86363636363635, 159.012987012987, 159.16233766233765, 159.3116883116883, 159.46103896103895, 159.6103896103896, 159.75974025974025, 159.9090909090909, 160.05844155844156, 160.2077922077922, 160.35714285714286, 160.5064935064935, 160.65584415584414, 160.8051948051948, 160.95454545454544, 161.1038961038961, 161.25324675324674, 161.4025974025974, 161.55194805194805, 161.7012987012987, 161.85064935064935, 162.0, 162.14935064935065, 162.2987012987013, 162.44805194805195, 162.59740259740258, 162.74675324675323, 162.89610389610388, 163.04545454545453, 163.19480519480518, 163.34415584415584, 163.4935064935065, 163.64285714285714, 163.7922077922078, 163.94155844155844, 164.0909090909091, 164.24025974025975, 164.3896103896104, 164.53896103896102, 164.68831168831167, 164.83766233766232, 164.98701298701297, 165.13636363636363, 165.28571428571428, 165.43506493506493, 165.58441558441558, 165.73376623376623, 165.88311688311688, 166.03246753246754, 166.1818181818182, 166.33116883116884, 166.48051948051946, 166.6298701298701, 166.77922077922076, 166.92857142857142, 167.07792207792207, 167.22727272727272, 167.37662337662337, 167.52597402597402, 167.67532467532467, 167.82467532467533, 167.97402597402598, 168.12337662337663, 168.27272727272725, 168.4220779220779, 168.57142857142856, 168.7207792207792, 168.87012987012986, 169.0194805194805, 169.16883116883116, 169.3181818181818, 169.46753246753246, 169.61688311688312, 169.76623376623377, 169.91558441558442, 170.06493506493507, 170.2142857142857, 170.36363636363635, 170.512987012987, 170.66233766233765, 170.8116883116883, 170.96103896103895, 171.1103896103896, 171.25974025974025, 171.4090909090909, 171.55844155844156, 171.7077922077922, 171.85714285714286, 172.0064935064935, 172.15584415584414, 172.3051948051948, 172.45454545454544, 172.6038961038961, 172.75324675324674, 172.9025974025974, 173.05194805194805, 173.2012987012987, 173.35064935064935, 173.5, 173.64935064935065, 173.7987012987013, 173.94805194805195, 174.09740259740258, 174.24675324675323, 174.39610389610388, 174.54545454545453, 174.69480519480518, 174.84415584415584, 174.9935064935065, 175.14285714285714, 175.2922077922078, 175.44155844155844, 175.5909090909091, 175.74025974025975, 175.8896103896104, 176.03896103896102, 176.18831168831167, 176.33766233766232, 176.48701298701297, 176.63636363636363, 176.78571428571428, 176.93506493506493, 177.08441558441558, 177.23376623376623, 177.38311688311688, 177.53246753246754, 177.6818181818182, 177.83116883116884, 177.98051948051946, 178.1298701298701, 178.27922077922076, 178.42857142857142, 178.57792207792207, 178.72727272727272, 178.87662337662337, 179.02597402597402, 179.17532467532467, 179.32467532467533, 179.47402597402598, 179.62337662337663, 179.77272727272725, 179.9220779220779, 180.07142857142856, 180.2207792207792, 180.37012987012986, 180.5194805194805, 180.66883116883116, 180.8181818181818, 180.96753246753246, 181.11688311688312, 181.26623376623377, 181.41558441558442, 181.56493506493507, 181.7142857142857, 181.86363636363635, 182.012987012987, 182.16233766233765, 182.3116883116883, 182.46103896103895, 182.6103896103896, 182.75974025974025, 182.9090909090909, 183.05844155844156, 183.2077922077922, 183.35714285714286, 183.5064935064935, 183.65584415584414, 183.8051948051948, 183.95454545454544, 184.1038961038961, 184.25324675324674, 184.4025974025974, 184.55194805194805, 184.7012987012987, 184.85064935064935, 185.0, 185.14935064935065, 185.2987012987013, 185.44805194805195, 185.59740259740258, 185.74675324675323, 185.89610389610388, 186.04545454545453, 186.19480519480518, 186.34415584415584, 186.4935064935065, 186.64285714285714, 186.7922077922078, 186.94155844155844, 187.0909090909091, 187.24025974025975, 187.38961038961037, 187.53896103896102, 187.68831168831167, 187.83766233766232, 187.98701298701297, 188.13636363636363, 188.28571428571428, 188.43506493506493, 188.58441558441558, 188.73376623376623, 188.88311688311688, 189.03246753246754, 189.1818181818182, 189.3311688311688, 189.48051948051946, 189.6298701298701, 189.77922077922076, 189.92857142857142, 190.07792207792207, 190.22727272727272, 190.37662337662337, 190.52597402597402, 190.67532467532467, 190.82467532467533, 190.97402597402598, 191.12337662337663, 191.27272727272725, 191.4220779220779, 191.57142857142856, 191.7207792207792, 191.87012987012986, 192.0194805194805, 192.16883116883116, 192.3181818181818, 192.46753246753246, 192.61688311688312, 192.76623376623377, 192.91558441558442, 193.06493506493507, 193.2142857142857, 193.36363636363635, 193.512987012987, 193.66233766233765, 193.8116883116883, 193.96103896103895, 194.1103896103896, 194.25974025974025, 194.4090909090909, 194.55844155844156, 194.7077922077922, 194.85714285714286, 195.0064935064935, 195.15584415584414, 195.3051948051948, 195.45454545454544, 195.6038961038961, 195.75324675324674, 195.9025974025974, 196.05194805194805, 196.2012987012987, 196.35064935064935, 196.5, 196.64935064935065, 196.7987012987013, 196.94805194805195, 197.09740259740258, 197.24675324675323, 197.39610389610388, 197.54545454545453, 197.69480519480518, 197.84415584415584, 197.9935064935065, 198.14285714285714, 198.2922077922078, 198.44155844155844, 198.5909090909091, 198.74025974025975, 198.88961038961037, 199.03896103896102, 199.18831168831167, 199.33766233766232, 199.48701298701297, 199.63636363636363, 199.78571428571428, 199.93506493506493, 200.08441558441558, 200.23376623376623, 200.38311688311688, 200.53246753246754, 200.6818181818182, 200.8311688311688, 200.98051948051946, 201.1298701298701, 201.27922077922076, 201.42857142857142, 201.57792207792207, 201.72727272727272, 201.87662337662337, 202.02597402597402, 202.17532467532467, 202.32467532467533, 202.47402597402598, 202.62337662337663, 202.77272727272725, 202.9220779220779, 203.07142857142856, 203.2207792207792, 203.37012987012986, 203.5194805194805, 203.66883116883116, 203.8181818181818, 203.96753246753246, 204.11688311688312, 204.26623376623377, 204.41558441558442, 204.56493506493507, 204.7142857142857, 204.86363636363635, 205.012987012987, 205.16233766233765, 205.3116883116883, 205.46103896103895, 205.6103896103896, 205.75974025974025, 205.9090909090909, 206.05844155844156, 206.2077922077922, 206.35714285714286, 206.50649350649348, 206.65584415584414, 206.8051948051948, 206.95454545454544, 207.1038961038961, 207.25324675324674, 207.4025974025974, 207.55194805194805, 207.7012987012987, 207.85064935064935, 208.0, 208.14935064935065, 208.2987012987013, 208.44805194805193, 208.59740259740258, 208.74675324675323, 208.89610389610388, 209.04545454545453, 209.19480519480518, 209.34415584415584, 209.4935064935065, 209.64285714285714, 209.7922077922078, 209.94155844155844, 210.0909090909091, 210.24025974025975, 210.38961038961037, 210.53896103896102, 210.68831168831167, 210.83766233766232, 210.98701298701297, 211.13636363636363, 211.28571428571428, 211.43506493506493, 211.58441558441558, 211.73376623376623, 211.88311688311688, 212.03246753246754, 212.1818181818182, 212.3311688311688, 212.48051948051946, 212.6298701298701, 212.77922077922076, 212.92857142857142, 213.07792207792207, 213.22727272727272, 213.37662337662337, 213.52597402597402, 213.67532467532467, 213.82467532467533, 213.97402597402598, 214.12337662337663, 214.27272727272725, 214.4220779220779, 214.57142857142856, 214.7207792207792, 214.87012987012986, 215.0194805194805, 215.16883116883116, 215.3181818181818, 215.46753246753246, 215.61688311688312, 215.76623376623377, 215.91558441558442, 216.06493506493507, 216.2142857142857, 216.36363636363635, 216.512987012987, 216.66233766233765, 216.8116883116883, 216.96103896103895, 217.1103896103896, 217.25974025974025, 217.4090909090909, 217.55844155844156, 217.7077922077922, 217.85714285714286, 218.00649350649348, 218.15584415584414, 218.3051948051948, 218.45454545454544, 218.6038961038961, 218.75324675324674, 218.9025974025974, 219.05194805194805, 219.2012987012987, 219.35064935064935, 219.5, 219.64935064935065, 219.7987012987013, 219.94805194805193, 220.09740259740258, 220.24675324675323, 220.39610389610388, 220.54545454545453, 220.69480519480518, 220.84415584415584, 220.9935064935065, 221.14285714285714, 221.2922077922078, 221.44155844155844, 221.5909090909091, 221.74025974025975, 221.88961038961037, 222.03896103896102, 222.18831168831167, 222.33766233766232, 222.48701298701297, 222.63636363636363, 222.78571428571428, 222.93506493506493, 223.08441558441558, 223.23376623376623, 223.38311688311688, 223.53246753246754, 223.6818181818182, 223.8311688311688, 223.98051948051946, 224.1298701298701, 224.27922077922076, 224.42857142857142, 224.57792207792207, 224.72727272727272, 224.87662337662337, 225.02597402597402, 225.17532467532467, 225.32467532467533, 225.47402597402598, 225.6233766233766, 225.77272727272725, 225.9220779220779, 226.07142857142856, 226.2207792207792, 226.37012987012986, 226.5194805194805, 226.66883116883116, 226.8181818181818, 226.96753246753246, 227.11688311688312, 227.26623376623377, 227.41558441558442, 227.56493506493504, 227.7142857142857, 227.86363636363635, 228.012987012987, 228.16233766233765, 228.3116883116883, 228.46103896103895, 228.6103896103896, 228.75974025974025, 228.9090909090909, 229.05844155844156, 229.2077922077922, 229.35714285714286, 229.50649350649348, 229.65584415584414, 229.8051948051948, 229.95454545454544, 230.1038961038961, 230.25324675324674, 230.4025974025974, 230.55194805194805, 230.7012987012987, 230.85064935064935, 231.0, 231.14935064935065, 231.2987012987013, 231.44805194805193, 231.59740259740258, 231.74675324675323, 231.89610389610388, 232.04545454545453, 232.19480519480518, 232.34415584415584, 232.4935064935065, 232.64285714285714, 232.7922077922078, 232.94155844155844, 233.0909090909091, 233.24025974025975, 233.38961038961037, 233.53896103896102, 233.68831168831167, 233.83766233766232, 233.98701298701297, 234.13636363636363, 234.28571428571428, 234.43506493506493, 234.58441558441558, 234.73376623376623, 234.88311688311688, 235.03246753246754, 235.1818181818182, 235.3311688311688, 235.48051948051946, 235.6298701298701, 235.77922077922076, 235.92857142857142, 236.07792207792207, 236.22727272727272, 236.37662337662337, 236.52597402597402, 236.67532467532467, 236.82467532467533, 236.97402597402598, 237.1233766233766, 237.27272727272725, 237.4220779220779, 237.57142857142856, 237.7207792207792, 237.87012987012986, 238.0194805194805, 238.16883116883116, 238.3181818181818, 238.46753246753246, 238.61688311688312, 238.76623376623377, 238.91558441558442, 239.06493506493504, 239.2142857142857, 239.36363636363635, 239.512987012987, 239.66233766233765, 239.8116883116883, 239.96103896103895, 240.1103896103896, 240.25974025974025, 240.4090909090909, 240.55844155844156, 240.7077922077922, 240.85714285714286, 241.00649350649348, 241.15584415584414, 241.3051948051948, 241.45454545454544, 241.6038961038961, 241.75324675324674, 241.9025974025974, 242.05194805194805, 242.2012987012987, 242.35064935064935, 242.5, 242.64935064935065, 242.7987012987013, 242.94805194805193, 243.09740259740258, 243.24675324675323, 243.39610389610388, 243.54545454545453, 243.69480519480518, 243.84415584415584, 243.9935064935065, 244.14285714285714, 244.2922077922078, 244.44155844155844, 244.5909090909091, 244.74025974025972, 244.88961038961037, 245.03896103896102, 245.18831168831167, 245.33766233766232, 245.48701298701297, 245.63636363636363, 245.78571428571428, 245.93506493506493, 246.08441558441558, 246.23376623376623, 246.38311688311688, 246.53246753246754, 246.68181818181816, 246.8311688311688, 246.98051948051946, 247.1298701298701, 247.27922077922076, 247.42857142857142, 247.57792207792207, 247.72727272727272, 247.87662337662337, 248.02597402597402, 248.17532467532467, 248.32467532467533, 248.47402597402598, 248.6233766233766, 248.77272727272725, 248.9220779220779, 249.07142857142856, 249.2207792207792, 249.37012987012986, 249.5194805194805, 249.66883116883116, 249.8181818181818, 249.96753246753246, 250.11688311688312, 250.26623376623377, 250.41558441558442, 250.56493506493504, 250.7142857142857, 250.86363636363635, 251.012987012987, 251.16233766233765, 251.3116883116883, 251.46103896103895, 251.6103896103896, 251.75974025974025, 251.9090909090909, 252.05844155844156, 252.2077922077922, 252.35714285714286, 252.50649350649348, 252.65584415584414, 252.8051948051948, 252.95454545454544, 253.1038961038961, 253.25324675324674, 253.4025974025974, 253.55194805194805, 253.7012987012987, 253.85064935064935, 254.0, 254.14935064935065, 254.2987012987013, 254.44805194805193, 254.59740259740258, 254.74675324675323, 254.89610389610388, 255.04545454545453, 255.19480519480518, 255.34415584415584, 255.4935064935065, 255.64285714285714, 255.7922077922078, 255.94155844155844, 256.0909090909091, 256.2402597402597, 256.38961038961037, 256.538961038961, 256.68831168831167, 256.8376623376623, 256.987012987013, 257.1363636363636, 257.2857142857143, 257.43506493506493, 257.5844155844156, 257.73376623376623, 257.8831168831169, 258.03246753246754, 258.1818181818182, 258.33116883116884, 258.4805194805195, 258.62987012987014, 258.7792207792208, 258.92857142857144, 259.07792207792204, 259.2272727272727, 259.37662337662334, 259.525974025974, 259.67532467532465, 259.8246753246753, 259.97402597402595, 260.1233766233766, 260.27272727272725, 260.4220779220779, 260.57142857142856, 260.7207792207792, 260.87012987012986, 261.0194805194805, 261.16883116883116, 261.3181818181818, 261.46753246753246, 261.6168831168831, 261.76623376623377, 261.9155844155844, 262.06493506493507, 262.2142857142857, 262.3636363636364, 262.512987012987, 262.6623376623377, 262.81168831168833, 262.9610389610389, 263.1103896103896, 263.2597402597402, 263.4090909090909, 263.55844155844153, 263.7077922077922, 263.85714285714283, 264.0064935064935, 264.15584415584414, 264.3051948051948, 264.45454545454544, 264.6038961038961, 264.75324675324674, 264.9025974025974, 265.05194805194805, 265.2012987012987, 265.35064935064935, 265.5, 265.64935064935065, 265.7987012987013, 265.94805194805195, 266.0974025974026, 266.24675324675326, 266.3961038961039, 266.54545454545456, 266.6948051948052, 266.8441558441558, 266.99350649350646, 267.1428571428571, 267.29220779220776, 267.4415584415584, 267.59090909090907, 267.7402597402597, 267.88961038961037, 268.038961038961, 268.18831168831167, 268.3376623376623, 268.487012987013, 268.6363636363636, 268.7857142857143, 268.93506493506493, 269.0844155844156, 269.23376623376623, 269.3831168831169, 269.53246753246754, 269.6818181818182, 269.83116883116884, 269.9805194805195, 270.12987012987014, 270.2792207792208, 270.42857142857144, 270.57792207792204, 270.7272727272727, 270.87662337662334, 271.025974025974, 271.17532467532465, 271.3246753246753, 271.47402597402595, 271.6233766233766, 271.77272727272725, 271.9220779220779, 272.07142857142856, 272.2207792207792, 272.37012987012986, 272.5194805194805, 272.66883116883116, 272.8181818181818, 272.96753246753246, 273.1168831168831, 273.26623376623377, 273.4155844155844, 273.56493506493507, 273.7142857142857, 273.8636363636364, 274.012987012987, 274.1623376623377, 274.31168831168833, 274.4610389610389, 274.6103896103896, 274.7597402597402, 274.9090909090909, 275.05844155844153, 275.2077922077922, 275.35714285714283, 275.5064935064935, 275.65584415584414, 275.8051948051948, 275.95454545454544, 276.1038961038961, 276.25324675324674, 276.4025974025974, 276.55194805194805, 276.7012987012987, 276.85064935064935, 277.0, 277.14935064935065, 277.2987012987013, 277.44805194805195, 277.5974025974026, 277.74675324675326, 277.8961038961039, 278.04545454545456, 278.1948051948052, 278.3441558441558, 278.49350649350646, 278.6428571428571, 278.79220779220776, 278.9415584415584, 279.09090909090907, 279.2402597402597, 279.38961038961037, 279.538961038961, 279.68831168831167, 279.8376623376623, 279.987012987013, 280.1363636363636, 280.2857142857143, 280.43506493506493, 280.5844155844156, 280.73376623376623, 280.8831168831169, 281.03246753246754, 281.1818181818182, 281.33116883116884, 281.4805194805195, 281.62987012987014, 281.7792207792208, 281.92857142857144, 282.07792207792204, 282.2272727272727, 282.37662337662334, 282.525974025974, 282.67532467532465, 282.8246753246753, 282.97402597402595, 283.1233766233766, 283.27272727272725, 283.4220779220779, 283.57142857142856, 283.7207792207792, 283.87012987012986, 284.0194805194805, 284.16883116883116, 284.3181818181818, 284.46753246753246, 284.6168831168831, 284.76623376623377, 284.9155844155844, 285.06493506493507, 285.2142857142857, 285.3636363636364, 285.512987012987, 285.6623376623377, 285.81168831168833, 285.9610389610389, 286.1103896103896, 286.2597402597402, 286.4090909090909, 286.55844155844153, 286.7077922077922, 286.85714285714283, 287.0064935064935, 287.15584415584414, 287.3051948051948, 287.45454545454544, 287.6038961038961, 287.75324675324674, 287.9025974025974, 288.05194805194805, 288.2012987012987, 288.35064935064935, 288.5, 288.64935064935065, 288.7987012987013, 288.94805194805195, 289.0974025974026, 289.24675324675326, 289.3961038961039, 289.54545454545456, 289.69480519480516, 289.8441558441558, 289.99350649350646, 290.1428571428571, 290.29220779220776, 290.4415584415584, 290.59090909090907, 290.7402597402597, 290.88961038961037, 291.038961038961, 291.18831168831167, 291.3376623376623, 291.487012987013, 291.6363636363636, 291.7857142857143, 291.93506493506493, 292.0844155844156, 292.23376623376623, 292.3831168831169, 292.53246753246754, 292.6818181818182, 292.83116883116884, 292.9805194805195, 293.12987012987014, 293.2792207792208, 293.42857142857144, 293.57792207792204, 293.7272727272727, 293.87662337662334, 294.025974025974, 294.17532467532465, 294.3246753246753, 294.47402597402595, 294.6233766233766, 294.77272727272725, 294.9220779220779, 295.07142857142856, 295.2207792207792, 295.37012987012986, 295.5194805194805, 295.66883116883116, 295.8181818181818, 295.96753246753246, 296.1168831168831, 296.26623376623377, 296.4155844155844, 296.56493506493507, 296.7142857142857, 296.8636363636364, 297.012987012987, 297.1623376623377, 297.3116883116883, 297.4610389610389, 297.6103896103896, 297.7597402597402, 297.9090909090909, 298.05844155844153, 298.2077922077922, 298.35714285714283, 298.5064935064935, 298.65584415584414, 298.8051948051948, 298.95454545454544, 299.1038961038961, 299.25324675324674, 299.4025974025974, 299.55194805194805, 299.7012987012987, 299.85064935064935, 300.0]}
},{}],70:[function(require,module,exports){
module.exports={"expected": [0.1, 0.10022914734024366, 0.10045881976552276, 0.10068901847905562, 0.10091974468681786, 0.10115099959754839, 0.10138278442275606, 0.10161510037672578, 0.10184794867652497, 0.10208133054200996, 0.10231524719583235, 0.10254969986344532, 0.10278468977311028, 0.10302021815590306, 0.10325628624572054, 0.10349289527928701, 0.10373004649616066, 0.10396774113874015, 0.10420598045227099, 0.1044447656848522, 0.10468409808744279, 0.10492397891386823, 0.10516440942082718, 0.10540539086789799, 0.1056469245175452, 0.10588901163512641, 0.10613165348889861, 0.10637485135002503, 0.1066186064925818, 0.1068629201935644, 0.10710779373289468, 0.10735322839342729, 0.10759922546095653, 0.10784578622422311, 0.10809291197492078, 0.10834060400770323, 0.10858886362019084, 0.10883769211297732, 0.10908709078963683, 0.10933706095673046, 0.1095876039238134, 0.10983872100344161, 0.11009041351117865, 0.11034268276560279, 0.11059553008831366, 0.11084895680393941, 0.11110296424014351, 0.11135755372763168, 0.11161272660015895, 0.11186848419453667, 0.11212482785063935, 0.1123817589114119, 0.11263927872287645, 0.11289738863413956, 0.11315608999739926, 0.11341538416795204, 0.11367527250420005, 0.11393575636765815, 0.11419683712296115, 0.11445851613787082, 0.11472079478328312, 0.11498367443323543, 0.11524715646491362, 0.11551124225865943, 0.11577593319797758, 0.11604123066954303, 0.11630713606320829, 0.11657365077201075, 0.11684077619217974, 0.11710851372314417, 0.11737686476753967, 0.11764583073121587, 0.11791541302324406, 0.11818561305592415, 0.11845643224479245, 0.11872787200862896, 0.11899993376946463, 0.11927261895258912, 0.11954592898655793, 0.1198198653032002, 0.12009442933762605, 0.12036962252823402, 0.12064544631671884, 0.12092190214807869, 0.12119899147062306, 0.12147671573598016, 0.12175507639910452, 0.12203407491828473, 0.12231371275515093, 0.12259399137468263, 0.1228749122452163, 0.12315647683845295, 0.12343868662946605, 0.12372154309670921, 0.12400504772202374, 0.12428920199064664, 0.12457400739121831, 0.12485946541579022, 0.125145577559833, 0.12543234532224393, 0.1257197702053551, 0.12600785371494114, 0.12629659736022705, 0.12658600265389627, 0.12687607111209845, 0.12716680425445748, 0.12745820360407947, 0.12775027068756056, 0.12804300703499522, 0.12833641417998393, 0.12863049365964144, 0.12892524701460484, 0.12922067578904137, 0.12951678153065688, 0.12981356579070358, 0.13011103012398842, 0.1304091760888812, 0.13070800524732254, 0.13100751916483233, 0.13130771941051778, 0.1316086075570816, 0.13191018518083036, 0.13221245386168276, 0.1325154151831777, 0.1328190707324828, 0.13312342210040265, 0.13342847088138707, 0.13373421867353957, 0.13404066707862564, 0.1343478177020812, 0.13465567215302093, 0.1349642320442468, 0.1352734989922565, 0.1355834746172518, 0.1358941605431472, 0.13620555839757828, 0.13651766981191035, 0.136830496421247, 0.1371440398644385, 0.1374583017840906, 0.13777328382657295, 0.13808898764202787, 0.13840541488437902, 0.13872256721133977, 0.13904044628442233, 0.139359053768946, 0.13967839133404628, 0.13999846065268337, 0.1403192634016511, 0.14064080126158549, 0.14096307591697382, 0.14128608905616322, 0.1416098423713697, 0.14193433755868695, 0.14225957631809516, 0.14258556035347, 0.1429122913725915, 0.14323977108715308, 0.1435680012127704, 0.1438969834689905, 0.14422671957930056, 0.14455721127113721, 0.14488846027589544, 0.14522046832893767, 0.14555323716960283, 0.14588676854121557, 0.14622106419109518, 0.14655612587056505, 0.14689195533496163, 0.14722855434364363, 0.1475659246600013, 0.14790406805146566, 0.14824298628951776, 0.14858268114969797, 0.14892315441161527, 0.14926440785895645, 0.14960644327949574, 0.14994926246510384, 0.1502928672117576, 0.15063725931954933, 0.15098244059269603, 0.15132841283954918, 0.15167517787260396, 0.15202273750850887, 0.15237109356807527, 0.15272024787628669, 0.15307020226230877, 0.15342095855949842, 0.15377251860541385, 0.15412488424182388, 0.15447805731471764, 0.15483203967431444, 0.15518683317507315, 0.1555424396757022, 0.1558988610391692, 0.15625609913271063, 0.15661415582784177, 0.15697303300036633, 0.15733273253038646, 0.1576932563023125, 0.15805460620487294, 0.15841678413112398, 0.15877979197846004, 0.1591436316486231, 0.1595083050477131, 0.15987381408619772, 0.16024016067892233, 0.16060734674512028, 0.16097537420842264, 0.16134424499686853, 0.1617139610429151, 0.1620845242834476, 0.16245593665978977, 0.16282820011771362, 0.16320131660744996, 0.16357528808369862, 0.16395011650563832, 0.16432580383693743, 0.16470235204576378, 0.16507976310479539, 0.16545803899123063, 0.16583718168679834, 0.16621719317776873, 0.16659807545496325, 0.16697983051376544, 0.1673624603541311, 0.167745966980599, 0.16813035240230106, 0.16851561863297326, 0.16890176769096585, 0.16928880159925422, 0.16967672238544934, 0.1700655320818082, 0.17045523272524493, 0.17084582635734097, 0.17123731502435613, 0.17162970077723916, 0.17202298567163835, 0.17241717176791269, 0.1728122611311422, 0.17320825583113914, 0.17360515794245868, 0.17400296954440964, 0.1744016927210657, 0.17480132956127592, 0.17520188215867616, 0.17560335261169963, 0.17600574302358804, 0.17640905550240274, 0.17681329216103547, 0.17721845511721973, 0.17762454649354173, 0.1780315684174516, 0.1784395230212743, 0.178848412442221, 0.17925823882240038, 0.17966900430882957, 0.18008071105344553, 0.18049336121311643, 0.18090695694965267, 0.18132150042981854, 0.18173699382534336, 0.18215343931293299, 0.18257083907428093, 0.18298919529608024, 0.18340851017003446, 0.1838287858928696, 0.18425002466634535, 0.18467222869726663, 0.18509540019749515, 0.18551954138396104, 0.18594465447867464, 0.1863707417087378, 0.1867978053063558, 0.1872258475088489, 0.1876548705586641, 0.18808487670338694, 0.1885158681957533, 0.18894784729366118, 0.1893808162601823, 0.18981477736357424, 0.1902497328772923, 0.1906856850800013, 0.19112263625558756, 0.19156058869317089, 0.19199954468711636, 0.19243950653704683, 0.19288047654785448, 0.19332245702971323, 0.19376545029809053, 0.1942094586737598, 0.19465448448281236, 0.19510053005666972, 0.19554759773209587, 0.19599568985120938, 0.1964448087614957, 0.19689495681581942, 0.19734613637243675, 0.19779834979500782, 0.198251599452609, 0.1987058877197452, 0.19916121697636258, 0.1996175896078608, 0.20007500800510575, 0.20053347456444176, 0.20099299168770443, 0.20145356178223298, 0.2019151872608831, 0.2023778705420394, 0.2028416140496283, 0.2033064202131304, 0.20377229146759337, 0.20423923025364493, 0.20470723901750526, 0.20517632021100018, 0.2056464762915735, 0.2061177097223005, 0.20659002297190032, 0.2070634185147492, 0.20753789883089332, 0.20801346640606197, 0.20849012373168013, 0.208967873304882, 0.20944671762852388, 0.2099266592111973, 0.2104077005672422, 0.21088984421675994, 0.21137309268562662, 0.2118574485055065, 0.21234291421386498, 0.21282949235398196, 0.21331718547496525, 0.21380599613176376, 0.21429592688518118, 0.21478698030188909, 0.2152791589544406, 0.21577246542128367, 0.2162669022867747, 0.2167624721411922, 0.21725917758075014, 0.21775702120761176, 0.21825600562990283, 0.21875613346172584, 0.21925740732317328, 0.21975982984034154, 0.22026340364534466, 0.2207681313763282, 0.22127401567748273, 0.22178105919905802, 0.22228926459737688, 0.22279863453484897, 0.22330917167998482, 0.22382087870740972, 0.22433375829787774, 0.22484781313828597, 0.2253630459216884, 0.2258794593473101, 0.2263970561205613, 0.22691583895305148, 0.227435810562604, 0.22795697367326984, 0.22847933101534212, 0.22900288532537033, 0.22952763934617468, 0.2300535958268605, 0.23058075752283264, 0.23110912719580998, 0.2316387076138395, 0.23216950155131147, 0.23270151178897325, 0.2332347411139445, 0.23376919231973126, 0.23430486820624108, 0.23484177157979716, 0.23537990525315336, 0.235919272045509, 0.2364598747825235, 0.2370017162963312, 0.23754479942555615, 0.23808912701532695, 0.2386347019172919, 0.23918152698963377, 0.23972960509708477, 0.24027893911094142, 0.24082953190907982, 0.24138138637597073, 0.24193450540269457, 0.24248889188695655, 0.24304454873310188, 0.24360147885213101, 0.24415968516171488, 0.24471917058621026, 0.24527993805667497, 0.24584199051088315, 0.24640533089334096, 0.24696996215530165, 0.2475358872547813, 0.24810310915657424, 0.24867163083226834, 0.2492414552602611, 0.24981258542577459, 0.2503850243208717, 0.2509587749444714, 0.2515338403023648, 0.25211022340723044, 0.25268792727865047, 0.25326695494312634, 0.2538473094340946, 0.254428993791943, 0.25501201106402605, 0.25559636430468113, 0.2561820565752448, 0.25676909094406847, 0.2573574704865347, 0.257947198285073, 0.2585382774291763, 0.259130711015417, 0.25972450214746334, 0.2603196539360954, 0.2609161694992215, 0.26151405196189464, 0.2621133044563288, 0.26271393012191524, 0.26331593210523924, 0.2639193135600962, 0.26452407764750857, 0.2651302275357419, 0.26573776640032204, 0.26634669742405126, 0.2669570237970254, 0.26756874871665, 0.2681818753876574, 0.2687964070221238, 0.26941234683948556, 0.2700296980665563, 0.2706484639375439, 0.2712686476940671, 0.27189025258517296, 0.2725132818673537, 0.2731377388045635, 0.2737636266682359, 0.27439094873730074, 0.2750197082982016, 0.27564990864491284, 0.2762815530789568, 0.27691464490942114, 0.2775491874529763, 0.2781851840338927, 0.27882263798405826, 0.27946155264299605, 0.2801019313578811, 0.2807437774835589, 0.28138709438256204, 0.2820318854251286, 0.28267815398921936, 0.2833259034605356, 0.2839751372325368, 0.28462585870645846, 0.28527807129133, 0.2859317784039925, 0.2865869834691167, 0.2872436899192208, 0.28790190119468845, 0.288561620743787, 0.2892228520226854, 0.2898855984954723, 0.2905498636341742, 0.29121565091877344, 0.2918829638372271, 0.29255180588548446, 0.29322218056750593, 0.29389409139528083, 0.2945675418888465, 0.29524253557630586, 0.2959190759938469, 0.2965971666857605, 0.29727681120445903, 0.2979580131104953, 0.2986407759725808, 0.29932510336760504, 0.3000109988806535, 0.30069846610502704, 0.30138750864226027, 0.30207813010214063, 0.30277033410272747, 0.3034641242703707, 0.30415950423973004, 0.3048564776537938, 0.30555504816389795, 0.30625521942974576, 0.3069569951194264, 0.30766037890943454, 0.30836537448468915, 0.30907198553855325, 0.3097802157728531, 0.31049006889789765, 0.311201548632498, 0.31191465870398644, 0.3126294028482368, 0.31334578480968317, 0.3140638083413402, 0.31478347720482236, 0.3155047951703638, 0.31622776601683794, 0.31695239353177745, 0.31767868151139417, 0.31840663376059875, 0.3191362540930205, 0.31986754633102793, 0.3206005143057482, 0.3213351618570873, 0.3220714928337506, 0.32280951109326217, 0.323549220501986, 0.32429062493514543, 0.32503372827684385, 0.32577853442008514, 0.32652504726679354, 0.3272732707278348, 0.32802320872303614, 0.3287748651812069, 0.32952824404015935, 0.3302833492467291, 0.3310401847567956, 0.3317987545353036, 0.3325590625562828, 0.3333211128028698, 0.33408490926732826, 0.33485045595106977, 0.33561775686467554, 0.3363868160279163, 0.3371576374697747, 0.3379302252284651, 0.33870458335145553, 0.3394807158954888, 0.3402586269266035, 0.3410383205201554, 0.3418198007608391, 0.34260307174270876, 0.3433881375692002, 0.3441750023531524, 0.3449636702168282, 0.34575414529193704, 0.34654643171965577, 0.34734053365065065, 0.3481364552450993, 0.3489342006727121, 0.3497337741127541, 0.3505351797540673, 0.35133842179509206, 0.35214350444388964, 0.35295043191816367, 0.35375920844528264, 0.35456983826230215, 0.3553823256159865, 0.3561966747628316, 0.35701288996908703, 0.35783097551077825, 0.3586509356737292, 0.3594727747535845, 0.3602964970558325, 0.3611221068958271, 0.36194960859881076, 0.3627790064999374, 0.36361030494429436, 0.36444350828692607, 0.36527862089285634, 0.36611564713711103, 0.3669545914047417, 0.3677954580908477, 0.3686382516005998, 0.3694829763492634, 0.37032963676222086, 0.37117823727499555, 0.3720287823332746, 0.3728812763929321, 0.3737357239200533, 0.37459212939095643, 0.3754504972922179, 0.3763108321206947, 0.3771731383835481, 0.3780374205982676, 0.3789036832926943, 0.3797719310050448, 0.38064216828393493, 0.38151439968840334, 0.3823886297879359, 0.38326486316248926, 0.3841431044025146, 0.38502335810898247, 0.385905628893406, 0.38678992137786583, 0.3876762401950339, 0.38856458998819743, 0.38945497541128415, 0.3903474011288858, 0.39124187181628284, 0.3921383921594695, 0.39303696685517714, 0.3939376006109001, 0.39484029814491983, 0.39574506418632904, 0.3966519034750577, 0.39756082076189664, 0.3984718208085234, 0.3993849083875267, 0.40030008828243135, 0.4012173652877236, 0.40213674420887613, 0.4030582298623732, 0.40398182707573616, 0.4049075406875479, 0.40583537554747945, 0.4067653365163145, 0.4076974284659748, 0.4086316562795465, 0.4095680248513047, 0.41050653908673995, 0.41144720390258366, 0.4123900242268333, 0.4133350049987794, 0.4142821511690301, 0.41523146769953817, 0.4161829595636265, 0.4171366317460139, 0.41809248924284187, 0.4190505370617005, 0.4200107802216541, 0.4209732237532688, 0.4219378726986374, 0.422904732111407, 0.423873807056805, 0.4248451026116652, 0.4258186238644554, 0.42679437591530295, 0.4277723638760224, 0.4287525928701419, 0.42973506803292955, 0.4307197945114213, 0.43170677746444724, 0.43269602206265867, 0.4336875334885555, 0.43468131693651285, 0.435677377612809, 0.4366757207356522, 0.4376763515352078, 0.43867927525362627, 0.4396844971450702, 0.4406920224757418, 0.4417018565239111, 0.4427140045799425, 0.4437284719463236, 0.44474526393769254, 0.4457643858808655, 0.4467858431148651, 0.447809640990948, 0.4488357848726334, 0.44986428013573093, 0.4508951321683683, 0.45192834637102036, 0.4529639281565367, 0.45400188295017063, 0.45504221618960716, 0.45608493332499145, 0.4571300398189577, 0.4581775411466578, 0.4592274427957892, 0.4602797502666248, 0.46133446907204095, 0.46239160473754676, 0.46345116280131293, 0.46451314881420047, 0.4655775683397904, 0.46664442695441216, 0.46771373024717344, 0.4687854838199894, 0.4698596932876113, 0.47093636427765684, 0.47201550243063944, 0.473097113399997, 0.47418120285212273, 0.4752677764663938, 0.4763568399352017, 0.4774483989639821, 0.478542459271244, 0.4796390265886008, 0.48073810666079914, 0.4818397052457501, 0.48294382811455877, 0.4840504810515542, 0.48515966985432046, 0.4862714003337267, 0.487385678313957, 0.4885025096325421, 0.48962190014038864, 0.4907438557018108, 0.4918683821945608, 0.49299548550985917, 0.49412517155242647, 0.49525744624051327, 0.4963923155059321, 0.497529785294088, 0.4986698615640094, 0.49981255028838006, 0.50095785745357, 0.5021057890596665, 0.5032563511205063, 0.5044095496637062, 0.5055653907306956, 0.5067238803767476, 0.5078850246710105, 0.5090488296965401, 0.5102153015503311, 0.5113844463433499, 0.5125562702005656, 0.5137307792609823, 0.5149079796776719, 0.5160878776178057, 0.517270479262687, 0.5184557908077831, 0.5196438184627584, 0.5208345684515064, 0.5220280470121827, 0.5232242603972371, 0.524423214873447, 0.5256249167219499, 0.5268293722382762, 0.5280365877323827, 0.5292465695286849, 0.5304593239660906, 0.5316748573980336, 0.5328931761925054, 0.5341142867320907, 0.5353381954139986, 0.5365649086500982, 0.5377944328669509, 0.539026774505844, 0.5402619400228255, 0.5414999358887366, 0.5427407685892468, 0.5439844446248872, 0.5452309705110844, 0.5464803527781952, 0.5477325979715407, 0.5489877126514401, 0.5502457033932455, 0.5515065767873761, 0.5527703394393533, 0.5540369979698345, 0.5553065590146482, 0.556579029224829, 0.5578544152666517, 0.5591327238216671, 0.5604139615867365, 0.5616981352740666, 0.5629852516112455, 0.5642753173412768, 0.5655683392226158, 0.5668643240292048, 0.568163278550508, 0.5694652095915477, 0.5707701239729398, 0.5720780285309293, 0.5733889301174264, 0.5747028356000421, 0.5760197518621244, 0.5773396858027948, 0.578662644336983, 0.579988634395465, 0.5813176629248977, 0.5826497368878567, 0.5839848632628721, 0.5853230490444645, 0.586664301243183, 0.588008626885641, 0.5893560330145527, 0.5907065266887712, 0.5920601149833243, 0.5934168049894522, 0.5947766038146446, 0.5961395185826774, 0.5975055564336511, 0.5988747245240269, 0.6002470300266652, 0.6016224801308631, 0.6030010820423909, 0.6043828429835315, 0.6057677701931174, 0.6071558709265683, 0.6085471524559299, 0.6099416220699112, 0.6113392870739235, 0.6127401547901181, 0.6141442325574246, 0.6155515277315899, 0.6169620476852161, 0.6183757998077996, 0.6197927915057698, 0.6212130302025272, 0.6226365233384834, 0.6240632783710992, 0.625493302774924, 0.6269266040416351, 0.6283631896800764, 0.6298030672162985, 0.6312462441935979, 0.6326927281725555, 0.6341425267310781, 0.6355956474644363, 0.6370520979853056, 0.6385118859238055, 0.6399750189275395, 0.6414415046616359, 0.6429113508087871, 0.6443845650692901, 0.6458611551610871, 0.6473411288198058, 0.6488244937987997, 0.6503112578691891, 0.6518014288199014, 0.6532950144577127, 0.654792022607287, 0.6562924611112192, 0.6577963378300753, 0.6593036606424332, 0.6608144374449244, 0.6623286761522758, 0.6638463846973497, 0.6653675710311876, 0.6668922431230494, 0.6684204089604572, 0.669952076549236, 0.6714872539135558, 0.673025949095974, 0.6745681701574772, 0.6761139251775233, 0.6776632222540848, 0.6792160695036895, 0.6807724750614648, 0.6823324470811792, 0.6838959937352852, 0.6854631232149628, 0.6870338437301611, 0.6886081635096425, 0.6901860908010257, 0.691767633870828, 0.6933528010045096, 0.6949416005065164, 0.6965340407003238, 0.6981301299284804, 0.6997298765526512, 0.7013332889536619, 0.7029403755315428, 0.7045511447055721, 0.7061656049143213, 0.7077837646156981, 0.7094056322869915, 0.711031216424916, 0.7126605255456558, 0.7142935681849103, 0.7159303528979376, 0.7175708882596004, 0.7192151828644102, 0.7208632453265724, 0.7225150842800325, 0.7241707083785196, 0.7258301262955927, 0.7274933467246865, 0.7291603783791557, 0.7308312299923221, 0.7325059103175198, 0.7341844281281399, 0.7358667922176789, 0.737553011399782, 0.7392430945082917, 0.7409370503972925, 0.7426348879411577, 0.7443366160345964, 0.7460422435926997, 0.7477517795509864, 0.7494652328654523, 0.7511826125126144, 0.7529039274895599, 0.7546291868139926, 0.7563583995242792, 0.7580915746794987, 0.7598287213594881, 0.7615698486648909, 0.7633149657172043, 0.7650640816588271, 0.7668172056531078, 0.7685743468843929, 0.7703355145580736, 0.772100717900636, 0.7738699661597075, 0.7756432686041069, 0.7774206345238924, 0.7792020732304094, 0.7809875940563404, 0.7827772063557535, 0.7845709195041514, 0.7863687428985207, 0.78817068595738, 0.7899767581208317, 0.7917869688506087, 0.7936013276301258, 0.7954198439645288, 0.7972425273807439, 0.7990693874275282, 0.8009004336755199, 0.8027356757172873, 0.8045751231673807, 0.8064187856623808, 0.8082666728609514, 0.8101187944438885, 0.8119751601141707, 0.8138357795970115, 0.8157006626399095, 0.8175698190126988, 0.8194432585076015, 0.8213209909392776, 0.823203026144878, 0.8250893739840944, 0.826980044339212, 0.8288750471151615, 0.8307743922395692, 0.8326780896628115, 0.8345861493580659, 0.8364985813213619, 0.8384153955716357, 0.8403366021507817, 0.8422622111237041, 0.8441922325783718, 0.8461266766258687, 0.848065553400449, 0.8500088730595889, 0.8519566457840402, 0.8539088817778837, 0.8558655912685821, 0.8578267845070346, 0.8597924717676305, 0.8617626633483013, 0.8637373695705768, 0.8657166007796386, 0.867700367344373, 0.8696886796574272, 0.8716815481352624, 0.8736789832182092, 0.8756809953705218, 0.8776875950804326, 0.8796987928602082, 0.8817145992462029, 0.8837350247989156, 0.8857600801030443, 0.8877897757675405, 0.889824122425667, 0.8918631307350521, 0.8939068113777453, 0.8959551750602746, 0.8980082325137007, 0.9000659944936749, 0.902128471780495, 0.9041956751791609, 0.9062676155194324, 0.9083443036558848, 0.910425750467967, 0.912511966860058, 0.914602963761523, 0.9166987521267722, 0.9187993429353177, 0.9209047471918302, 0.9230149759261982, 0.9251300401935837, 0.9272499510744824, 0.9293747196747805, 0.9315043571258123, 0.9336388745844201, 0.9357782832330112, 0.9379225942796173, 0.9400718189579537, 0.9422259685274761, 0.9443850542734419, 0.9465490875069683, 0.9487180795650911, 0.9508920418108255, 0.9530709856332237, 0.9552549224474363, 0.9574438636947715, 0.9596378208427542, 0.9618368053851878, 0.9640408288422126, 0.9662499027603675, 0.9684640387126501, 0.9706832482985764, 0.9729075431442434, 0.9751369349023886, 0.977371435252451, 0.9796110559006336, 0.9818558085799627, 0.9841057050503516, 0.9863607570986609, 0.9886209765387597, 0.9908863752115894, 0.9931569649852235, 0.9954327577549319, 0.9977137654432416, 0.9999999999999999], "x": [-1.0, -0.9990059642147118, -0.9980119284294234, -0.9970178926441352, -0.9960238568588469, -0.9950298210735586, -0.9940357852882704, -0.9930417495029821, -0.9920477137176938, -0.9910536779324056, -0.9900596421471173, -0.989065606361829, -0.9880715705765407, -0.9870775347912525, -0.9860834990059643, -0.9850894632206759, -0.9840954274353877, -0.9831013916500994, -0.9821073558648111, -0.9811133200795229, -0.9801192842942346, -0.9791252485089463, -0.9781312127236581, -0.9771371769383698, -0.9761431411530815, -0.9751491053677932, -0.974155069582505, -0.9731610337972167, -0.9721669980119284, -0.9711729622266402, -0.9701789264413518, -0.9691848906560636, -0.9681908548707754, -0.967196819085487, -0.9662027833001988, -0.9652087475149106, -0.9642147117296223, -0.963220675944334, -0.9622266401590457, -0.9612326043737575, -0.9602385685884692, -0.9592445328031809, -0.9582504970178927, -0.9572564612326043, -0.9562624254473161, -0.9552683896620279, -0.9542743538767395, -0.9532803180914513, -0.9522862823061631, -0.9512922465208747, -0.9502982107355865, -0.9493041749502982, -0.94831013916501, -0.9473161033797217, -0.9463220675944334, -0.9453280318091452, -0.9443339960238568, -0.9433399602385686, -0.9423459244532804, -0.941351888667992, -0.9403578528827038, -0.9393638170974155, -0.9383697813121272, -0.937375745526839, -0.9363817097415507, -0.9353876739562624, -0.9343936381709742, -0.9333996023856859, -0.9324055666003976, -0.9314115308151094, -0.9304174950298211, -0.9294234592445328, -0.9284294234592445, -0.9274353876739563, -0.926441351888668, -0.9254473161033797, -0.9244532803180915, -0.9234592445328031, -0.9224652087475149, -0.9214711729622267, -0.9204771371769384, -0.9194831013916501, -0.9184890656063618, -0.9174950298210736, -0.9165009940357853, -0.915506958250497, -0.9145129224652088, -0.9135188866799204, -0.9125248508946322, -0.911530815109344, -0.9105367793240556, -0.9095427435387674, -0.9085487077534792, -0.9075546719681908, -0.9065606361829026, -0.9055666003976144, -0.904572564612326, -0.9035785288270378, -0.9025844930417495, -0.9015904572564613, -0.900596421471173, -0.8996023856858847, -0.8986083499005965, -0.8976143141153081, -0.8966202783300199, -0.8956262425447317, -0.8946322067594433, -0.8936381709741551, -0.8926441351888668, -0.8916500994035785, -0.8906560636182903, -0.889662027833002, -0.8886679920477137, -0.8876739562624254, -0.8866799204771372, -0.885685884691849, -0.8846918489065606, -0.8836978131212724, -0.8827037773359842, -0.8817097415506958, -0.8807157057654076, -0.8797216699801194, -0.878727634194831, -0.8777335984095428, -0.8767395626242545, -0.8757455268389662, -0.874751491053678, -0.8737574552683897, -0.8727634194831014, -0.8717693836978131, -0.8707753479125249, -0.8697813121272366, -0.8687872763419483, -0.8677932405566601, -0.8667992047713717, -0.8658051689860835, -0.8648111332007953, -0.8638170974155069, -0.8628230616302187, -0.8618290258449304, -0.8608349900596421, -0.8598409542743539, -0.8588469184890656, -0.8578528827037774, -0.856858846918489, -0.8558648111332008, -0.8548707753479126, -0.8538767395626243, -0.852882703777336, -0.8518886679920478, -0.8508946322067594, -0.8499005964214712, -0.848906560636183, -0.8479125248508946, -0.8469184890656064, -0.8459244532803181, -0.8449304174950298, -0.8439363817097416, -0.8429423459244533, -0.841948310139165, -0.8409542743538767, -0.8399602385685885, -0.8389662027833003, -0.8379721669980119, -0.8369781312127237, -0.8359840954274353, -0.8349900596421471, -0.8339960238568589, -0.8330019880715706, -0.8320079522862823, -0.831013916500994, -0.8300198807157058, -0.8290258449304175, -0.8280318091451293, -0.827037773359841, -0.8260437375745527, -0.8250497017892644, -0.8240556660039762, -0.823061630218688, -0.8220675944333996, -0.8210735586481114, -0.820079522862823, -0.8190854870775348, -0.8180914512922466, -0.8170974155069582, -0.81610337972167, -0.8151093439363817, -0.8141153081510935, -0.8131212723658052, -0.8121272365805169, -0.8111332007952287, -0.8101391650099403, -0.8091451292246521, -0.8081510934393639, -0.8071570576540755, -0.8061630218687873, -0.805168986083499, -0.8041749502982107, -0.8031809145129225, -0.8021868787276343, -0.8011928429423459, -0.8001988071570577, -0.7992047713717694, -0.7982107355864811, -0.7972166998011929, -0.7962226640159046, -0.7952286282306164, -0.794234592445328, -0.7932405566600398, -0.7922465208747516, -0.7912524850894632, -0.790258449304175, -0.7892644135188867, -0.7882703777335984, -0.7872763419483102, -0.7862823061630219, -0.7852882703777336, -0.7842942345924453, -0.7833001988071571, -0.7823061630218688, -0.7813121272365805, -0.7803180914512923, -0.7793240556660039, -0.7783300198807157, -0.7773359840954275, -0.7763419483101393, -0.7753479125248509, -0.7743538767395627, -0.7733598409542743, -0.7723658051689861, -0.7713717693836979, -0.7703777335984096, -0.7693836978131213, -0.768389662027833, -0.7673956262425448, -0.7664015904572565, -0.7654075546719682, -0.76441351888668, -0.7634194831013916, -0.7624254473161034, -0.7614314115308152, -0.7604373757455268, -0.7594433399602386, -0.7584493041749503, -0.757455268389662, -0.7564612326043738, -0.7554671968190855, -0.7544731610337972, -0.7534791252485089, -0.7524850894632207, -0.7514910536779325, -0.7504970178926442, -0.7495029821073559, -0.7485089463220675, -0.7475149105367793, -0.7465208747514911, -0.7455268389662029, -0.7445328031809145, -0.7435387673956262, -0.742544731610338, -0.7415506958250497, -0.7405566600397615, -0.7395626242544732, -0.7385685884691849, -0.7375745526838966, -0.7365805168986084, -0.7355864811133201, -0.7345924453280319, -0.7335984095427436, -0.7326043737574552, -0.731610337972167, -0.7306163021868788, -0.7296222664015906, -0.7286282306163022, -0.7276341948310139, -0.7266401590457257, -0.7256461232604374, -0.7246520874751492, -0.7236580516898609, -0.7226640159045725, -0.7216699801192843, -0.7206759443339961, -0.7196819085487078, -0.7186878727634195, -0.7176938369781312, -0.7166998011928429, -0.7157057654075547, -0.7147117296222665, -0.7137176938369781, -0.7127236580516899, -0.7117296222664016, -0.7107355864811133, -0.7097415506958251, -0.7087475149105369, -0.7077534791252486, -0.7067594433399602, -0.705765407554672, -0.7047713717693838, -0.7037773359840955, -0.7027833001988072, -0.7017892644135189, -0.7007952286282306, -0.6998011928429424, -0.6988071570576542, -0.6978131212723658, -0.6968190854870775, -0.6958250497017893, -0.694831013916501, -0.6938369781312128, -0.6928429423459245, -0.6918489065606361, -0.6908548707753479, -0.6898608349900597, -0.6888667992047715, -0.6878727634194831, -0.6868787276341949, -0.6858846918489065, -0.6848906560636183, -0.6838966202783301, -0.6829025844930419, -0.6819085487077535, -0.6809145129224652, -0.679920477137177, -0.6789264413518887, -0.6779324055666005, -0.6769383697813122, -0.6759443339960238, -0.6749502982107356, -0.6739562624254474, -0.6729622266401591, -0.6719681908548708, -0.6709741550695825, -0.6699801192842942, -0.668986083499006, -0.6679920477137178, -0.6669980119284294, -0.6660039761431411, -0.6650099403578529, -0.6640159045725647, -0.6630218687872764, -0.6620278330019881, -0.6610337972166999, -0.6600397614314115, -0.6590457256461233, -0.6580516898608351, -0.6570576540755468, -0.6560636182902585, -0.6550695825049702, -0.6540755467196819, -0.6530815109343937, -0.6520874751491055, -0.6510934393638171, -0.6500994035785288, -0.6491053677932406, -0.6481113320079523, -0.6471172962226641, -0.6461232604373758, -0.6451292246520874, -0.6441351888667992, -0.643141153081511, -0.6421471172962228, -0.6411530815109344, -0.6401590457256461, -0.6391650099403579, -0.6381709741550696, -0.6371769383697814, -0.6361829025844931, -0.6351888667992048, -0.6341948310139165, -0.6332007952286283, -0.63220675944334, -0.6312127236580518, -0.6302186878727635, -0.6292246520874751, -0.6282306163021869, -0.6272365805168987, -0.6262425447316105, -0.6252485089463221, -0.6242544731610338, -0.6232604373757455, -0.6222664015904573, -0.6212723658051691, -0.6202783300198808, -0.6192842942345924, -0.6182902584493042, -0.617296222664016, -0.6163021868787277, -0.6153081510934394, -0.614314115308151, -0.6133200795228628, -0.6123260437375746, -0.6113320079522864, -0.610337972166998, -0.6093439363817098, -0.6083499005964215, -0.6073558648111332, -0.606361829025845, -0.6053677932405567, -0.6043737574552684, -0.6033797216699801, -0.6023856858846919, -0.6013916500994037, -0.6003976143141154, -0.5994035785288271, -0.5984095427435387, -0.5974155069582505, -0.5964214711729623, -0.5954274353876741, -0.5944333996023857, -0.5934393638170974, -0.5924453280318092, -0.5914512922465209, -0.5904572564612327, -0.5894632206759444, -0.588469184890656, -0.5874751491053678, -0.5864811133200796, -0.5854870775347913, -0.584493041749503, -0.5834990059642148, -0.5825049701789264, -0.5815109343936382, -0.58051689860835, -0.5795228628230616, -0.5785288270377734, -0.5775347912524851, -0.5765407554671969, -0.5755467196819086, -0.5745526838966204, -0.5735586481113321, -0.5725646123260437, -0.5715705765407555, -0.5705765407554673, -0.569582504970179, -0.5685884691848907, -0.5675944333996024, -0.5666003976143141, -0.5656063618290259, -0.5646123260437377, -0.5636182902584493, -0.562624254473161, -0.5616302186878728, -0.5606361829025845, -0.5596421471172963, -0.558648111332008, -0.5576540755467198, -0.5566600397614314, -0.5556660039761432, -0.554671968190855, -0.5536779324055666, -0.5526838966202784, -0.55168986083499, -0.5506958250497018, -0.5497017892644136, -0.5487077534791254, -0.547713717693837, -0.5467196819085487, -0.5457256461232605, -0.5447316103379722, -0.543737574552684, -0.5427435387673957, -0.5417495029821073, -0.5407554671968191, -0.5397614314115309, -0.5387673956262427, -0.5377733598409543, -0.536779324055666, -0.5357852882703777, -0.5347912524850895, -0.5337972166998013, -0.532803180914513, -0.5318091451292247, -0.5308151093439364, -0.5298210735586482, -0.5288270377733599, -0.5278330019880716, -0.5268389662027834, -0.525844930417495, -0.5248508946322068, -0.5238568588469186, -0.5228628230616303, -0.521868787276342, -0.5208747514910537, -0.5198807157057654, -0.5188866799204772, -0.517892644135189, -0.5168986083499006, -0.5159045725646123, -0.5149105367793241, -0.5139165009940359, -0.5129224652087476, -0.5119284294234593, -0.510934393638171, -0.5099403578528827, -0.5089463220675945, -0.5079522862823063, -0.5069582504970179, -0.5059642147117297, -0.5049701789264414, -0.5039761431411531, -0.5029821073558649, -0.5019880715705766, -0.5009940357852883, -0.5, -0.4990059642147118, -0.49801192842942354, -0.4970178926441352, -0.496023856858847, -0.49502982107355875, -0.4940357852882704, -0.4930417495029822, -0.49204771371769385, -0.4910536779324056, -0.4900596421471174, -0.48906560636182905, -0.4880715705765408, -0.4870775347912525, -0.48608349900596426, -0.48508946322067603, -0.4840954274353877, -0.48310139165009947, -0.48210735586481124, -0.4811133200795229, -0.48011928429423467, -0.47912524850894633, -0.4781312127236581, -0.4771371769383699, -0.47614314115308154, -0.4751491053677933, -0.474155069582505, -0.47316103379721675, -0.4721669980119285, -0.4711729622266402, -0.47017892644135195, -0.4691848906560637, -0.4681908548707754, -0.46719681908548716, -0.4662027833001988, -0.4652087475149106, -0.46421471172962236, -0.463220675944334, -0.4622266401590458, -0.46123260437375746, -0.46023856858846923, -0.459244532803181, -0.45825049701789267, -0.45725646123260444, -0.4562624254473162, -0.4552683896620279, -0.45427435387673964, -0.4532803180914513, -0.4522862823061631, -0.45129224652087485, -0.4502982107355865, -0.4493041749502983, -0.44831013916500995, -0.4473161033797217, -0.4463220675944335, -0.44532803180914515, -0.4443339960238569, -0.4433399602385687, -0.44234592445328036, -0.44135188866799213, -0.4403578528827038, -0.43936381709741557, -0.43836978131212734, -0.437375745526839, -0.43638170974155077, -0.43538767395626243, -0.4343936381709742, -0.433399602385686, -0.43240556660039764, -0.4314115308151094, -0.4304174950298212, -0.42942345924453285, -0.4284294234592446, -0.4274353876739563, -0.42644135188866805, -0.4254473161033798, -0.4244532803180915, -0.42345924453280326, -0.4224652087475149, -0.4214711729622267, -0.42047713717693846, -0.4194831013916501, -0.4184890656063619, -0.41749502982107367, -0.41650099403578533, -0.4155069582504971, -0.41451292246520877, -0.41351888667992054, -0.4125248508946323, -0.411530815109344, -0.41053677932405575, -0.4095427435387674, -0.4085487077534792, -0.40755467196819095, -0.4065606361829026, -0.4055666003976144, -0.40457256461232616, -0.4035785288270378, -0.4025844930417496, -0.40159045725646125, -0.400596421471173, -0.3996023856858848, -0.39860834990059646, -0.39761431411530823, -0.3966202783300199, -0.39562624254473167, -0.39463220675944344, -0.3936381709741551, -0.39264413518886687, -0.39165009940357864, -0.3906560636182903, -0.3896620278330021, -0.38866799204771374, -0.3876739562624255, -0.3866799204771373, -0.38568588469184895, -0.3846918489065607, -0.3836978131212724, -0.38270377733598415, -0.3817097415506959, -0.3807157057654076, -0.37972166998011936, -0.37872763419483113, -0.3777335984095428, -0.37673956262425456, -0.3757455268389662, -0.374751491053678, -0.37375745526838977, -0.37276341948310143, -0.3717693836978132, -0.37077534791252487, -0.36978131212723664, -0.3687872763419484, -0.3677932405566601, -0.36679920477137185, -0.3658051689860836, -0.3648111332007953, -0.36381709741550705, -0.3628230616302187, -0.3618290258449305, -0.36083499005964226, -0.3598409542743539, -0.3588469184890657, -0.35785288270377735, -0.3568588469184891, -0.3558648111332009, -0.35487077534791256, -0.35387673956262433, -0.3528827037773361, -0.35188866799204777, -0.35089463220675954, -0.3499005964214712, -0.34890656063618297, -0.34791252485089474, -0.3469184890656064, -0.3459244532803182, -0.34493041749502984, -0.3439363817097416, -0.3429423459244534, -0.34194831013916505, -0.3409542743538768, -0.3399602385685886, -0.33896620278330025, -0.337972166998012, -0.3369781312127237, -0.33598409542743546, -0.33499005964214723, -0.3339960238568589, -0.33300198807157066, -0.3320079522862823, -0.3310139165009941, -0.33001988071570587, -0.32902584493041753, -0.3280318091451293, -0.3270377733598411, -0.32604373757455274, -0.3250497017892645, -0.3240556660039762, -0.32306163021868795, -0.3220675944333997, -0.3210735586481114, -0.32007952286282315, -0.3190854870775348, -0.3180914512922466, -0.31709741550695836, -0.31610337972167, -0.3151093439363818, -0.31411530815109356, -0.3131212723658052, -0.312127236580517, -0.31113320079522866, -0.31013916500994043, -0.3091451292246522, -0.30815109343936387, -0.30715705765407564, -0.3061630218687873, -0.30516898608349907, -0.30417495029821084, -0.3031809145129225, -0.3021868787276343, -0.30119284294234605, -0.3001988071570577, -0.2992047713717695, -0.29821073558648115, -0.2972166998011929, -0.2962226640159047, -0.29522862823061635, -0.2942345924453281, -0.2932405566600398, -0.29224652087475156, -0.29125248508946333, -0.290258449304175, -0.28926441351888676, -0.28827037773359854, -0.2872763419483102, -0.28628230616302197, -0.28528827037773363, -0.2842942345924454, -0.2833001988071572, -0.28230616302186884, -0.2813121272365806, -0.2803180914512923, -0.27932405566600405, -0.2783300198807158, -0.2773359840954275, -0.27634194831013925, -0.275347912524851, -0.2743538767395627, -0.27335984095427446, -0.2723658051689861, -0.2713717693836979, -0.27037773359840966, -0.2693836978131213, -0.2683896620278331, -0.26739562624254476, -0.26640159045725653, -0.2654075546719683, -0.26441351888667997, -0.26341948310139174, -0.2624254473161035, -0.26143141153081517, -0.26043737574552694, -0.2594433399602386, -0.2584493041749504, -0.25745526838966215, -0.2564612326043738, -0.2554671968190856, -0.25447316103379725, -0.253479125248509, -0.2524850894632208, -0.25149105367793245, -0.2504970178926442, -0.249502982107356, -0.24850894632206766, -0.24751491053677943, -0.2465208747514911, -0.24552683896620286, -0.24453280318091464, -0.2435387673956263, -0.24254473161033807, -0.24155069582504973, -0.2405566600397615, -0.23956262425447328, -0.23856858846918494, -0.2375745526838967, -0.23658051689860837, -0.23558648111332015, -0.23459244532803192, -0.23359840954274358, -0.23260437375745535, -0.23161033797216712, -0.23061630218687879, -0.22962226640159056, -0.22862823061630222, -0.227634194831014, -0.22664015904572576, -0.22564612326043743, -0.2246520874751492, -0.22365805168986086, -0.22266401590457263, -0.2216699801192844, -0.22067594433399607, -0.21968190854870784, -0.2186878727634196, -0.21769383697813127, -0.21669980119284304, -0.2157057654075547, -0.21471172962226648, -0.21371769383697825, -0.2127236580516899, -0.21172962226640168, -0.21073558648111335, -0.20974155069582512, -0.2087475149105369, -0.20775347912524855, -0.20675944333996032, -0.2057654075546721, -0.20477137176938376, -0.20377733598409553, -0.2027833001988072, -0.20178926441351897, -0.20079522862823074, -0.1998011928429424, -0.19880715705765417, -0.19781312127236583, -0.1968190854870776, -0.19582504970178938, -0.19483101391650104, -0.1938369781312128, -0.19284294234592458, -0.19184890656063625, -0.19085487077534802, -0.18986083499005968, -0.18886679920477145, -0.18787276341948322, -0.18687872763419489, -0.18588469184890666, -0.18489065606361832, -0.1838966202783301, -0.18290258449304186, -0.18190854870775353, -0.1809145129224653, -0.17992047713717707, -0.17892644135188873, -0.1779324055666005, -0.17693836978131217, -0.17594433399602394, -0.1749502982107357, -0.17395626242544737, -0.17296222664015914, -0.1719681908548708, -0.17097415506958258, -0.16998011928429435, -0.168986083499006, -0.16799204771371778, -0.16699801192842956, -0.16600397614314122, -0.165009940357853, -0.16401590457256465, -0.16302186878727642, -0.1620278330019882, -0.16103379721669986, -0.16003976143141163, -0.1590457256461233, -0.15805168986083507, -0.15705765407554684, -0.1560636182902585, -0.15506958250497027, -0.15407554671968204, -0.1530815109343937, -0.15208747514910548, -0.15109343936381714, -0.1500994035785289, -0.14910536779324068, -0.14811133200795235, -0.14711729622266412, -0.14612326043737578, -0.14512922465208755, -0.14413518886679932, -0.14314115308151099, -0.14214711729622276, -0.14115308151093453, -0.1401590457256462, -0.13916500994035796, -0.13817097415506963, -0.1371769383697814, -0.13618290258449317, -0.13518886679920483, -0.1341948310139166, -0.13320079522862827, -0.13220675944334004, -0.1312127236580518, -0.13021868787276347, -0.12922465208747524, -0.12823061630218702, -0.12723658051689868, -0.12624254473161045, -0.1252485089463221, -0.12425447316103388, -0.12326043737574566, -0.12226640159045732, -0.12127236580516909, -0.12027833001988075, -0.11928429423459253, -0.1182902584493043, -0.11729622266401596, -0.11630218687872773, -0.1153081510934395, -0.11431411530815117, -0.11332007952286294, -0.1123260437375746, -0.11133200795228637, -0.11033797216699814, -0.1093439363817098, -0.10834990059642158, -0.10735586481113324, -0.10636182902584501, -0.10536779324055678, -0.10437375745526845, -0.10337972166998022, -0.10238568588469199, -0.10139165009940365, -0.10039761431411542, -0.09940357852882709, -0.09840954274353886, -0.09741550695825063, -0.09642147117296229, -0.09542743538767406, -0.09443339960238573, -0.0934393638170975, -0.09244532803180927, -0.09145129224652093, -0.0904572564612327, -0.08946322067594448, -0.08846918489065614, -0.08747514910536791, -0.08648111332007957, -0.08548707753479134, -0.08449304174950312, -0.08349900596421478, -0.08250497017892655, -0.08151093439363821, -0.08051689860834998, -0.07952286282306176, -0.07852882703777342, -0.07753479125248519, -0.07654075546719696, -0.07554671968190863, -0.0745526838966204, -0.07355864811133206, -0.07256461232604383, -0.0715705765407556, -0.07057654075546727, -0.06958250497017904, -0.0685884691848907, -0.06759443339960247, -0.06660039761431424, -0.0656063618290259, -0.06461232604373768, -0.06361829025844945, -0.06262425447316111, -0.061630218687872884, -0.060636182902584546, -0.05964214711729632, -0.05864811133200809, -0.05765407554671975, -0.056660039761431524, -0.055666003976143186, -0.05467196819085496, -0.05367793240556673, -0.05268389662027839, -0.051689860834990164, -0.05069582504970194, -0.0497017892644136, -0.04870775347912537, -0.04771371769383703, -0.046719681908548805, -0.04572564612326058, -0.04473161033797224, -0.04373757455268401, -0.04274353876739567, -0.041749502982107445, -0.04075546719681922, -0.03976143141153088, -0.03876739562624265, -0.037773359840954424, -0.036779324055666085, -0.03578528827037786, -0.03479125248508952, -0.03379721669980129, -0.032803180914513064, -0.031809145129224725, -0.030815109343936498, -0.02982107355864816, -0.02882703777335993, -0.027833001988071704, -0.026838966202783365, -0.025844930417495138, -0.02485089463220691, -0.02385685884691857, -0.022862823061630344, -0.021868787276342005, -0.020874751491053778, -0.01988071570576555, -0.018886679920477212, -0.017892644135188984, -0.016898608349900646, -0.015904572564612418, -0.01491053677932419, -0.013916500994035852, -0.012922465208747624, -0.011928429423459397, -0.010934393638171058, -0.00994035785288283, -0.008946322067594492, -0.007952286282306265, -0.006958250497018037, -0.005964214711729698, -0.004970178926441471, -0.003976143141153132, -0.0029821073558649047, -0.001988071570576677, -0.0009940357852883386, -5.551115123125783e-17]}
},{}],71:[function(require,module,exports){
module.exports={"expected": [1.0000000000000002, 1.0022914734024368, 1.0045881976552276, 1.0068901847905565, 1.0091974468681786, 1.011509995975484, 1.0138278442275608, 1.0161510037672579, 1.01847948676525, 1.0208133054200998, 1.0231524719583236, 1.0254969986344533, 1.027846897731103, 1.0302021815590308, 1.0325628624572056, 1.0349289527928702, 1.0373004649616069, 1.0396774113874014, 1.04205980452271, 1.0444476568485221, 1.046840980874428, 1.0492397891386824, 1.051644094208272, 1.05405390867898, 1.0564692451754523, 1.0588901163512643, 1.0613165348889861, 1.0637485135002507, 1.0661860649258181, 1.0686292019356443, 1.071077937328947, 1.073532283934273, 1.0759922546095655, 1.0784578622422312, 1.080929119749208, 1.0834060400770327, 1.0858886362019085, 1.0883769211297734, 1.0908709078963683, 1.0933706095673048, 1.0958760392381341, 1.098387210034416, 1.1009041351117868, 1.103426827656028, 1.1059553008831369, 1.1084895680393945, 1.1110296424014352, 1.1135755372763168, 1.1161272660015897, 1.1186848419453668, 1.1212482785063937, 1.123817589114119, 1.1263927872287645, 1.1289738863413958, 1.1315608999739928, 1.1341538416795205, 1.1367527250420006, 1.1393575636765818, 1.1419683712296118, 1.1445851613787084, 1.1472079478328314, 1.1498367443323543, 1.1524715646491364, 1.1551124225865945, 1.1577593319797759, 1.1604123066954304, 1.1630713606320833, 1.1657365077201074, 1.1684077619217976, 1.171085137231442, 1.1737686476753968, 1.176458307312159, 1.1791541302324406, 1.1818561305592417, 1.1845643224479248, 1.1872787200862898, 1.1899993376946465, 1.1927261895258912, 1.1954592898655794, 1.1981986530320021, 1.2009442933762606, 1.2036962252823404, 1.2064544631671883, 1.209219021480787, 1.2119899147062307, 1.2147671573598018, 1.2175507639910452, 1.2203407491828473, 1.2231371275515095, 1.2259399137468265, 1.228749122452163, 1.2315647683845297, 1.2343868662946609, 1.2372154309670922, 1.2400504772202376, 1.2428920199064666, 1.2457400739121833, 1.2485946541579025, 1.25145577559833, 1.2543234532224394, 1.2571977020535512, 1.2600785371494114, 1.2629659736022707, 1.2658600265389628, 1.2687607111209847, 1.271668042544575, 1.274582036040795, 1.277502706875606, 1.2804300703499523, 1.2833641417998394, 1.2863049365964148, 1.2892524701460484, 1.292206757890414, 1.2951678153065687, 1.2981356579070358, 1.3011103012398844, 1.304091760888812, 1.3070800524732256, 1.3100751916483235, 1.313077194105178, 1.3160860755708161, 1.319101851808304, 1.3221245386168279, 1.325154151831777, 1.3281907073248282, 1.3312342210040267, 1.334284708813871, 1.3373421867353958, 1.3404066707862565, 1.343478177020812, 1.3465567215302094, 1.3496423204424681, 1.3527349899225651, 1.3558347461725182, 1.358941605431472, 1.3620555839757829, 1.3651766981191038, 1.36830496421247, 1.371440398644385, 1.374583017840906, 1.3777328382657295, 1.3808898764202793, 1.3840541488437903, 1.387225672113398, 1.3904044628442231, 1.39359053768946, 1.396783913340463, 1.399984606526834, 1.403192634016511, 1.406408012615855, 1.4096307591697381, 1.4128608905616322, 1.4160984237136973, 1.4193433755868698, 1.4225957631809516, 1.4258556035347003, 1.4291229137259152, 1.432397710871531, 1.4356800121277042, 1.438969834689905, 1.4422671957930056, 1.4455721127113723, 1.4488846027589546, 1.4522046832893767, 1.4555323716960284, 1.4588676854121556, 1.462210641910952, 1.4655612587056508, 1.4689195533496164, 1.4722855434364364, 1.4756592466000131, 1.4790406805146568, 1.482429862895178, 1.4858268114969801, 1.4892315441161528, 1.4926440785895647, 1.4960644327949573, 1.4994926246510385, 1.5029286721175765, 1.5063725931954934, 1.5098244059269605, 1.5132841283954919, 1.5167517787260398, 1.5202273750850892, 1.5237109356807528, 1.527202478762867, 1.5307020226230876, 1.5342095855949847, 1.5377251860541388, 1.541248842418239, 1.5447805731471766, 1.5483203967431445, 1.5518683317507316, 1.5554243967570223, 1.5589886103916921, 1.5625609913271066, 1.5661415582784177, 1.5697303300036634, 1.573327325303865, 1.5769325630231257, 1.5805460620487297, 1.5841678413112403, 1.5877979197846006, 1.5914363164862313, 1.5950830504771314, 1.5987381408619774, 1.6024016067892237, 1.606073467451203, 1.6097537420842267, 1.6134424499686857, 1.617139610429151, 1.6208452428344766, 1.6245593665978977, 1.6282820011771364, 1.6320131660745, 1.6357528808369863, 1.6395011650563835, 1.6432580383693742, 1.647023520457638, 1.6507976310479542, 1.6545803899123062, 1.6583718168679837, 1.6621719317776873, 1.6659807545496328, 1.6697983051376546, 1.6736246035413114, 1.67745966980599, 1.6813035240230105, 1.6851561863297326, 1.6890176769096588, 1.6928880159925428, 1.6967672238544935, 1.7006553208180826, 1.7045523272524497, 1.70845826357341, 1.7123731502435617, 1.7162970077723916, 1.7202298567163838, 1.724171717679127, 1.7281226113114223, 1.732082558311392, 1.736051579424587, 1.7400296954440966, 1.744016927210657, 1.7480132956127594, 1.7520188215867618, 1.7560335261169964, 1.7600574302358807, 1.7640905550240273, 1.7681329216103545, 1.7721845511721974, 1.7762454649354178, 1.780315684174516, 1.784395230212743, 1.7884841244222103, 1.7925823882240042, 1.796690043088296, 1.8008071105344556, 1.8049336121311643, 1.8090695694965269, 1.8132150042981858, 1.8173699382534343, 1.82153439312933, 1.8257083907428093, 1.8298919529608022, 1.8340851017003448, 1.8382878589286966, 1.842500246663454, 1.8467222869726663, 1.8509540019749513, 1.8551954138396107, 1.859446544786747, 1.8637074170873784, 1.8679780530635581, 1.872258475088489, 1.876548705586641, 1.8808487670338696, 1.8851586819575337, 1.889478472936612, 1.893808162601823, 1.8981477736357424, 1.9024973287729232, 1.9068568508000134, 1.9112263625558759, 1.9156058869317085, 1.9199954468711635, 1.9243950653704684, 1.9288047654785454, 1.9332245702971327, 1.9376545029809056, 1.942094586737598, 1.9465448448281237, 1.9510053005666976, 1.9554759773209591, 1.959956898512094, 1.9644480876149568, 1.9689495681581943, 1.973461363724368, 1.9779834979500788, 1.9825159945260902, 1.9870588771974522, 1.991612169763626, 1.9961758960786082, 2.000750080051058, 2.0053347456444177, 2.009929916877044, 2.0145356178223297, 2.019151872608831, 2.0237787054203946, 2.028416140496283, 2.0330642021313037, 2.0377229146759337, 2.0423923025364497, 2.047072390175053, 2.051763202110002, 2.056464762915735, 2.061177097223005, 2.0659002297190034, 2.0706341851474925, 2.075378988308934, 2.08013466406062, 2.084901237316801, 2.0896787330488205, 2.0944671762852396, 2.0992665921119738, 2.1040770056724223, 2.1088984421675994, 2.1137309268562667, 2.118574485055065, 2.12342914213865, 2.12829492353982, 2.1331718547496523, 2.1380599613176376, 2.142959268851812, 2.1478698030188914, 2.152791589544406, 2.1577246542128363, 2.162669022867747, 2.167624721411922, 2.172591775807502, 2.177570212076118, 2.1825600562990286, 2.1875613346172584, 2.192574073231733, 2.197598298403416, 2.202634036453447, 2.207681313763282, 2.2127401567748275, 2.2178105919905806, 2.2228926459737695, 2.2279863453484903, 2.2330917167998487, 2.238208787074097, 2.2433375829787776, 2.24847813138286, 2.2536304592168843, 2.2587945934731013, 2.2639705612056127, 2.269158389530515, 2.2743581056260402, 2.279569736732699, 2.2847933101534217, 2.290028853253703, 2.2952763934617466, 2.3005359582686054, 2.305807575228327, 2.3110912719581, 2.3163870761383953, 2.3216950155131144, 2.327015117889733, 2.3323474111394455, 2.3376919231973132, 2.343048682062411, 2.3484177157979715, 2.3537990525315338, 2.3591927204550904, 2.3645987478252355, 2.3700171629633124, 2.3754479942555613, 2.3808912701532696, 2.3863470191729195, 2.3918152698963384, 2.397296050970848, 2.402789391109414, 2.4082953190907985, 2.413813863759708, 2.4193450540269463, 2.424888918869566, 2.430445487331019, 2.43601478852131, 2.4415968516171493, 2.447191705862103, 2.45279938056675, 2.4584199051088316, 2.46405330893341, 2.4696996215530165, 2.4753588725478135, 2.4810310915657428, 2.4867163083226838, 2.492414552602611, 2.4981258542577462, 2.503850243208717, 2.5095877494447145, 2.515338403023648, 2.5211022340723046, 2.526879272786505, 2.532669549431264, 2.538473094340947, 2.5442899379194306, 2.5501201106402602, 2.5559636430468116, 2.561820565752448, 2.5676909094406852, 2.5735747048653472, 2.57947198285073, 2.585382774291763, 2.5913071101541707, 2.597245021474634, 2.6031965393609546, 2.609161694992215, 2.6151405196189463, 2.621133044563288, 2.627139301219153, 2.6331593210523927, 2.639193135600962, 2.6452407764750854, 2.6513022753574194, 2.6573776640032207, 2.6634669742405133, 2.6695702379702544, 2.6756874871665, 2.6818187538765743, 2.6879640702212386, 2.694123468394856, 2.7002969806655632, 2.706484639375439, 2.712686476940671, 2.71890252585173, 2.7251328186735373, 2.7313773880456353, 2.737636266682359, 2.7439094873730077, 2.750197082982017, 2.756499086449129, 2.762815530789568, 2.7691464490942113, 2.775491874529763, 2.781851840338927, 2.7882263798405837, 2.794615526429961, 2.801019313578811, 2.8074377748355888, 2.813870943825621, 2.820318854251287, 2.826781539892194, 2.8332590346053563, 2.839751372325368, 2.846258587064585, 2.8527807129133, 2.8593177840399253, 2.8658698346911673, 2.8724368991922082, 2.879019011946885, 2.88561620743787, 2.8922285202268547, 2.8988559849547233, 2.9054986363417417, 2.9121565091877346, 2.918829638372271, 2.9255180588548453, 2.9322218056750597, 2.938940913952808, 2.945675418888465, 2.9524253557630593, 2.95919075993847, 2.9659716668576053, 2.9727681120445903, 2.9795801311049526, 2.9864077597258087, 2.993251033676051, 3.0001099888065355, 3.0069846610502706, 3.0138750864226025, 3.0207813010214064, 3.027703341027275, 3.034641242703708, 3.041595042397301, 3.048564776537938, 3.05555048163898, 3.0625521942974583, 3.069569951194265, 3.076603789094346, 3.0836537448468917, 3.090719855385532, 3.0978021577285313, 3.104900688978977, 3.1120154863249803, 3.1191465870398645, 3.1262940284823677, 3.133457848096832, 3.1406380834134024, 3.1478347720482245, 3.155047951703638, 3.162277660168379, 3.1695239353177747, 3.1767868151139416, 3.184066337605988, 3.191362540930206, 3.19867546331028, 3.206005143057482, 3.213351618570873, 3.2207149283375065, 3.228095110932623, 3.2354922050198605, 3.242906249351454, 3.250337282768439, 3.2577853442008524, 3.2652504726679363, 3.2727327072783483, 3.2802320872303614, 3.287748651812069, 3.295282440401593, 3.3028334924672915, 3.310401847567957, 3.317987545353036, 3.3255906255628283, 3.3332111280286982, 3.3408490926732832, 3.3485045595106984, 3.356177568646755, 3.3638681602791634, 3.3715763746977467, 3.379302252284652, 3.387045833514556, 3.3948071589548885, 3.402586269266035, 3.410383205201554, 3.4181980076083915, 3.4260307174270883, 3.4338813756920032, 3.441750023531524, 3.449636702168282, 3.4575414529193713, 3.4654643171965582, 3.4734053365065076, 3.4813645524509935, 3.4893420067271204, 3.4973377411275406, 3.5053517975406736, 3.5133842179509216, 3.521435044438897, 3.5295043191816364, 3.5375920844528266, 3.5456983826230224, 3.5538232561598653, 3.5619667476283166, 3.57012889969087, 3.578309755107782, 3.586509356737293, 3.5947277475358463, 3.6029649705583258, 3.611221068958271, 3.6194960859881076, 3.627790064999375, 3.6361030494429443, 3.6444350828692618, 3.652786208928563, 3.66115647137111, 3.6695459140474176, 3.6779545809084775, 3.6863825160059993, 3.6948297634926344, 3.7032963676222086, 3.7117823727499553, 3.7202878233327468, 3.7288127639293225, 3.7373572392005325, 3.7459212939095643, 3.754504972922179, 3.763108321206948, 3.771731383835482, 3.7803742059826764, 3.7890368329269433, 3.797719310050448, 3.8064216828393502, 3.815143996884035, 3.82388629787936, 3.8326486316248927, 3.841431044025146, 3.850233581089826, 3.8590562889340614, 3.8678992137786596, 3.8767624019503386, 3.8856458998819745, 3.894549754112843, 3.9034740112888584, 3.9124187181628294, 3.9213839215946944, 3.9303696685517715, 3.9393760061090015, 3.948402981449199, 3.9574506418632915, 3.9665190347505765, 3.9756082076189663, 3.984718208085234, 3.993849083875268, 4.003000882824314, 4.0121736528772365, 4.021367442088762, 4.030582298623732, 4.039818270757363, 4.04907540687548, 4.058353755474796, 4.067653365163145, 4.076974284659748, 4.086316562795466, 4.095680248513048, 4.1050653908674, 4.114472039025836, 4.123900242268333, 4.133350049987795, 4.142821511690302, 4.152314676995383, 4.161829595636265, 4.171366317460139, 4.180924892428418, 4.1905053706170055, 4.200107802216542, 4.2097322375326875, 4.219378726986374, 4.22904732111407, 4.238738070568051, 4.248451026116653, 4.258186238644554, 4.26794375915303, 4.277723638760224, 4.287525928701419, 4.297350680329297, 4.307197945114214, 4.317067774644473, 4.326960220626587, 4.336875334885556, 4.34681316936513, 4.356773776128091, 4.366757207356522, 4.376763515352078, 4.386792752536264, 4.396844971450703, 4.406920224757419, 4.41701856523911, 4.427140045799424, 4.437284719463236, 4.447452639376927, 4.457643858808655, 4.467858431148651, 4.4780964099094795, 4.488357848726334, 4.4986428013573105, 4.508951321683684, 4.519283463710203, 4.529639281565367, 4.540018829501706, 4.550422161896073, 4.560849333249916, 4.571300398189579, 4.581775411466578, 4.592274427957892, 4.602797502666249, 4.61334469072041, 4.623916047375468, 4.634511628013129, 4.645131488142004, 4.655775683397905, 4.666444269544122, 4.677137302471736, 4.687854838199894, 4.698596932876113, 4.709363642776569, 4.720155024306395, 4.730971133999971, 4.7418120285212275, 4.752677764663938, 4.763568399352017, 4.774483989639823, 4.785424592712441, 4.796390265886008, 4.8073810666079915, 4.8183970524575015, 4.829438281145588, 4.840504810515543, 4.851596698543206, 4.862714003337267, 4.873856783139571, 4.885025096325422, 4.896219001403887, 4.907438557018109, 4.918683821945608, 4.929954855098591, 4.941251715524266, 4.952574462405134, 4.963923155059322, 4.97529785294088, 4.986698615640094, 4.9981255028838, 5.009578574535702, 5.0210578905966665, 5.032563511205063, 5.044095496637063, 5.055653907306957, 5.067238803767478, 5.078850246710106, 5.0904882969654, 5.102153015503312, 5.113844463433499, 5.125562702005658, 5.137307792609825, 5.149079796776721, 5.160878776178058, 5.172704792626869, 5.184557908077833, 5.196438184627586, 5.2083456845150655, 5.2202804701218275, 5.232242603972371, 5.244232148734472, 5.2562491672195, 5.268293722382762, 5.280365877323827, 5.2924656952868485, 5.304593239660907, 5.3167485739803375, 5.328931761925055, 5.341142867320907, 5.353381954139986, 5.365649086500983, 5.3779443286695106, 5.390267745058441, 5.402619400228255, 5.414999358887366, 5.427407685892468, 5.439844446248873, 5.452309705110845, 5.464803527781953, 5.477325979715408, 5.489877126514401, 5.502457033932456, 5.515065767873763, 5.527703394393534, 5.540369979698345, 5.553065590146482, 5.565790292248291, 5.5785441526665185, 5.591327238216673, 5.604139615867365, 5.616981352740666, 5.629852516112454, 5.642753173412769, 5.655683392226159, 5.668643240292049, 5.68163278550508, 5.694652095915476, 5.707701239729399, 5.720780285309294, 5.733889301174264, 5.7470283560004205, 5.760197518621244, 5.773396858027949, 5.786626443369832, 5.79988634395465, 5.813176629248977, 5.826497368878567, 5.839848632628723, 5.8532304904446475, 5.866643012431831, 5.8800862688564095, 5.893560330145528, 5.907065266887715, 5.920601149833245, 5.934168049894524, 5.947766038146446, 5.961395185826774, 5.975055564336513, 5.988747245240271, 6.002470300266655, 6.016224801308631, 6.030010820423909, 6.043828429835315, 6.057677701931176, 6.071558709265685, 6.0854715245593, 6.099416220699113, 6.1133928707392355, 6.127401547901183, 6.141442325574247, 6.155515277315899, 6.169620476852161, 6.183757998077996, 6.1979279150577, 6.212130302025273, 6.2263652333848345, 6.240632783710992, 6.25493302774924, 6.269266040416353, 6.283631896800766, 6.298030672162987, 6.3124624419359785, 6.326927281725555, 6.3414252673107825, 6.3559564746443655, 6.370520979853057, 6.385118859238055, 6.399750189275395, 6.414415046616359, 6.429113508087872, 6.443845650692902, 6.458611551610872, 6.473411288198058, 6.4882449379879965, 6.503112578691893, 6.518014288199017, 6.532950144577127, 6.54792022607287, 6.562924611112192, 6.577963378300756, 6.5930366064243335, 6.608144374449246, 6.623286761522758, 6.638463846973497, 6.653675710311878, 6.668922431230496, 6.684204089604574, 6.699520765492361, 6.714872539135558, 6.730259490959742, 6.745681701574774, 6.761139251775235, 6.776632222540848, 6.792160695036896, 6.807724750614648, 6.823324470811794, 6.838959937352854, 6.854631232149628, 6.87033843730161, 6.886081635096425, 6.901860908010259, 6.917676338708282, 6.933528010045096, 6.949416005065164, 6.965340407003238, 6.981301299284807, 6.997298765526514, 7.0133328895366205, 7.029403755315427, 7.045511447055721, 7.061656049143215, 7.077837646156983, 7.094056322869916, 7.11031216424916, 7.126605255456558, 7.142935681849105, 7.159303528979378, 7.1757088825960045, 7.192151828644102, 7.208632453265725, 7.225150842800325, 7.241707083785198, 7.2583012629559285, 7.274933467246864, 7.291603783791556, 7.308312299923221, 7.325059103175199, 7.341844281281402, 7.358667922176789, 7.37553011399782, 7.392430945082917, 7.409370503972927, 7.42634887941158, 7.443366160345966, 7.460422435926995, 7.477517795509864, 7.494652328654525, 7.511826125126146, 7.529039274895601, 7.546291868139925, 7.563583995242792, 7.5809157467949895, 7.598287213594883, 7.61569848664891, 7.6331496571720425, 7.650640816588271, 7.668172056531079, 7.685743468843931, 7.703355145580738, 7.721007179006359, 7.7386996615970745, 7.7564326860410695, 7.774206345238927, 7.7920207323040955, 7.809875940563405, 7.827772063557536, 7.845709195041514, 7.863687428985208, 7.881706859573803, 7.899767581208319, 7.917869688506088, 7.936013276301259, 7.954198439645291, 7.972425273807441, 7.990693874275284, 8.009004336755199, 8.027356757172873, 8.045751231673808, 8.06418785662381, 8.082666728609517, 8.101187944438884, 8.119751601141706, 8.138357795970114, 8.157006626399097, 8.17569819012699, 8.194432585076015, 8.213209909392777, 8.232030261448779, 8.250893739840945, 8.269800443392123, 8.288750471151614, 8.30774392239569, 8.326780896628115, 8.34586149358066, 8.36498581321362, 8.384153955716359, 8.403366021507816, 8.422622111237041, 8.44192232578372, 8.461266766258689, 8.480655534004493, 8.50008873059589, 8.519566457840401, 8.539088817778838, 8.558655912685822, 8.578267845070348, 8.597924717676305, 8.617626633483013, 8.637373695705769, 8.657166007796388, 8.677003673443732, 8.696886796574272, 8.716815481352626, 8.736789832182092, 8.75680995370522, 8.776875950804328, 8.796987928602082, 8.817145992462029, 8.837350247989157, 8.857600801030445, 8.877897757675408, 8.898241224256672, 8.918631307350521, 8.939068113777454, 8.959551750602749, 8.980082325137008, 9.000659944936752, 9.021284717804951, 9.04195675179161, 9.062676155194326, 9.08344303655885, 9.104257504679673, 9.125119668600579, 9.146029637615229, 9.166987521267721, 9.18799342935318, 9.209047471918305, 9.230149759261982, 9.251300401935836, 9.272499510744824, 9.293747196747807, 9.315043571258125, 9.3363887458442, 9.35778283233011, 9.379225942796173, 9.400718189579539, 9.422259685274764, 9.44385054273442, 9.465490875069683, 9.48718079565091, 9.508920418108259, 9.53070985633224, 9.552549224474365, 9.574438636947715, 9.596378208427542, 9.618368053851881, 9.640408288422128, 9.662499027603678, 9.6846403871265, 9.706832482985766, 9.729075431442435, 9.75136934902389, 9.773714352524513, 9.796110559006335, 9.818558085799628, 9.841057050503515, 9.863607570986611, 9.8862097653876, 9.908863752115893, 9.931569649852236, 9.954327577549318, 9.977137654432418, 10.0], "x": [5.551115123125783e-17, 0.0009940357852883258, 0.001988071570576596, 0.0029821073558648666, 0.003976143141153137, 0.004970178926441407, 0.005964214711729678, 0.006958250497017948, 0.007952286282306218, 0.008946322067594489, 0.009940357852882758, 0.010934393638171029, 0.0119284294234593, 0.012922465208747569, 0.01391650099403584, 0.014910536779324109, 0.01590457256461238, 0.01689860834990065, 0.017892644135188922, 0.01888667992047719, 0.01988071570576546, 0.020874751491053733, 0.021868787276342002, 0.02286282306163027, 0.023856858846918544, 0.024850894632206813, 0.025844930417495082, 0.02683896620278335, 0.027833001988071624, 0.028827037773359893, 0.029821073558648162, 0.030815109343936435, 0.031809145129224704, 0.032803180914512974, 0.03379721669980124, 0.03479125248508951, 0.03578528827037779, 0.03677932405566606, 0.037773359840954326, 0.038767395626242596, 0.039761431411530865, 0.040755467196819134, 0.04174950298210741, 0.04274353876739568, 0.04373757455268395, 0.04473161033797222, 0.04572564612326049, 0.046719681908548756, 0.04771371769383703, 0.0487077534791253, 0.04970178926441357, 0.05069582504970184, 0.05168986083499011, 0.05268389662027838, 0.05367793240556665, 0.054671968190854923, 0.05566600397614319, 0.05666003976143146, 0.05765407554671973, 0.058648111332008, 0.05964214711729627, 0.060636182902584546, 0.061630218687872815, 0.06262425447316108, 0.06361829025844935, 0.06461232604373762, 0.06560636182902589, 0.06660039761431416, 0.06759443339960243, 0.0685884691848907, 0.06958250497017897, 0.07057654075546725, 0.07157057654075552, 0.07256461232604379, 0.07355864811133206, 0.07455268389662033, 0.0755467196819086, 0.07654075546719687, 0.07753479125248514, 0.0785288270377734, 0.07952286282306167, 0.08051689860834994, 0.08151093439363821, 0.08250497017892648, 0.08349900596421476, 0.08449304174950303, 0.0854870775347913, 0.08648111332007957, 0.08747514910536784, 0.08846918489065611, 0.08946322067594438, 0.09045725646123265, 0.09145129224652092, 0.09244532803180919, 0.09343936381709746, 0.09443339960238573, 0.09542743538767401, 0.09642147117296228, 0.09741550695825055, 0.09840954274353882, 0.09940357852882709, 0.10039761431411535, 0.10139165009940362, 0.1023856858846919, 0.10337972166998016, 0.10437375745526843, 0.1053677932405567, 0.10636182902584497, 0.10735586481113324, 0.10834990059642152, 0.10934393638170979, 0.11033797216699806, 0.11133200795228633, 0.1123260437375746, 0.11332007952286287, 0.11431411530815114, 0.1153081510934394, 0.11630218687872768, 0.11729622266401594, 0.11829025844930421, 0.11928429423459248, 0.12027833001988075, 0.12127236580516904, 0.1222664015904573, 0.12326043737574557, 0.12425447316103384, 0.1252485089463221, 0.12624254473161037, 0.12723658051689865, 0.12823061630218693, 0.1292246520874752, 0.13021868787276347, 0.13121272365805173, 0.13220675944334, 0.13320079522862827, 0.13419483101391655, 0.1351888667992048, 0.1361829025844931, 0.13717693836978134, 0.13817097415506963, 0.13916500994035788, 0.14015904572564616, 0.14115308151093445, 0.1421471172962227, 0.14314115308151099, 0.14413518886679924, 0.14512922465208752, 0.14612326043737578, 0.14711729622266406, 0.14811133200795232, 0.1491053677932406, 0.15009940357852886, 0.15109343936381714, 0.1520874751491054, 0.15308151093439368, 0.15407554671968196, 0.15506958250497022, 0.1560636182902585, 0.15705765407554675, 0.15805168986083504, 0.1590457256461233, 0.16003976143141158, 0.16103379721669983, 0.16202783300198811, 0.16302186878727637, 0.16401590457256465, 0.1650099403578529, 0.1660039761431412, 0.16699801192842947, 0.16799204771371773, 0.168986083499006, 0.16998011928429427, 0.17097415506958255, 0.1719681908548708, 0.1729622266401591, 0.17395626242544734, 0.17495029821073563, 0.17594433399602388, 0.17693836978131217, 0.17793240556660042, 0.1789264413518887, 0.179920477137177, 0.18091451292246524, 0.18190854870775353, 0.18290258449304178, 0.18389662027833006, 0.18489065606361832, 0.1858846918489066, 0.18687872763419486, 0.18787276341948314, 0.1888667992047714, 0.18986083499005968, 0.19085487077534796, 0.19184890656063622, 0.1928429423459245, 0.19383697813121276, 0.19483101391650104, 0.1958250497017893, 0.19681908548707758, 0.19781312127236583, 0.19880715705765412, 0.19980119284294237, 0.20079522862823065, 0.2017892644135189, 0.2027833001988072, 0.20377733598409548, 0.20477137176938373, 0.20576540755467201, 0.20675944333996027, 0.20775347912524855, 0.2087475149105368, 0.2097415506958251, 0.21073558648111335, 0.21172962226640163, 0.21272365805168988, 0.21371769383697817, 0.21471172962226642, 0.2157057654075547, 0.216699801192843, 0.21769383697813124, 0.21868787276341953, 0.21968190854870778, 0.22067594433399607, 0.22166998011928432, 0.2226640159045726, 0.22365805168986086, 0.22465208747514914, 0.2256461232604374, 0.22664015904572568, 0.22763419483101394, 0.22862823061630222, 0.2296222664015905, 0.23061630218687876, 0.23161033797216704, 0.2326043737574553, 0.23359840954274358, 0.23459244532803183, 0.23558648111332012, 0.23658051689860837, 0.23757455268389666, 0.2385685884691849, 0.2395626242544732, 0.24055666003976145, 0.24155069582504973, 0.24254473161033802, 0.24353876739562627, 0.24453280318091455, 0.2455268389662028, 0.2465208747514911, 0.24751491053677935, 0.24850894632206763, 0.2495029821073559, 0.25049701789264417, 0.25149105367793245, 0.2524850894632207, 0.25347912524850896, 0.25447316103379725, 0.25546719681908553, 0.2564612326043738, 0.25745526838966204, 0.2584493041749503, 0.2594433399602386, 0.2604373757455269, 0.2614314115308151, 0.2624254473161034, 0.2634194831013917, 0.26441351888667997, 0.2654075546719682, 0.2664015904572565, 0.26739562624254476, 0.26838966202783304, 0.2693836978131213, 0.27037773359840955, 0.27137176938369784, 0.2723658051689861, 0.2733598409542744, 0.27435387673956263, 0.2753479125248509, 0.2763419483101392, 0.2773359840954275, 0.2783300198807157, 0.279324055666004, 0.2803180914512923, 0.28131212723658056, 0.28230616302186884, 0.28330019880715707, 0.28429423459244535, 0.28528827037773363, 0.2862823061630219, 0.28727634194831014, 0.2882703777335984, 0.2892644135188867, 0.290258449304175, 0.2912524850894632, 0.2922465208747515, 0.2932405566600398, 0.29423459244532807, 0.29522862823061635, 0.2962226640159046, 0.29721669980119286, 0.29821073558648115, 0.29920477137176943, 0.30019880715705766, 0.30119284294234594, 0.3021868787276342, 0.3031809145129225, 0.30417495029821073, 0.305168986083499, 0.3061630218687873, 0.3071570576540756, 0.30815109343936387, 0.3091451292246521, 0.3101391650099404, 0.31113320079522866, 0.31212723658051694, 0.31312127236580517, 0.31411530815109345, 0.31510934393638174, 0.31610337972167, 0.31709741550695825, 0.31809145129224653, 0.3190854870775348, 0.3200795228628231, 0.3210735586481114, 0.3220675944333996, 0.3230616302186879, 0.3240556660039762, 0.32504970178926446, 0.3260437375745527, 0.32703777335984097, 0.32803180914512925, 0.32902584493041753, 0.33001988071570576, 0.33101391650099404, 0.3320079522862823, 0.3330019880715706, 0.3339960238568589, 0.3349900596421471, 0.3359840954274354, 0.3369781312127237, 0.33797216699801197, 0.3389662027833002, 0.3399602385685885, 0.34095427435387676, 0.34194831013916505, 0.3429423459244533, 0.34393638170974156, 0.34493041749502984, 0.3459244532803181, 0.3469184890656064, 0.34791252485089463, 0.3489065606361829, 0.3499005964214712, 0.3508946322067595, 0.3518886679920477, 0.352882703777336, 0.3538767395626243, 0.35487077534791256, 0.3558648111332008, 0.35685884691848907, 0.35785288270377735, 0.35884691848906564, 0.3598409542743539, 0.36083499005964215, 0.36182902584493043, 0.3628230616302187, 0.363817097415507, 0.3648111332007952, 0.3658051689860835, 0.3667992047713718, 0.3677932405566601, 0.3687872763419483, 0.3697813121272366, 0.37077534791252487, 0.37176938369781315, 0.37276341948310143, 0.37375745526838966, 0.37475149105367794, 0.3757455268389662, 0.3767395626242545, 0.37773359840954274, 0.378727634194831, 0.3797216699801193, 0.3807157057654076, 0.38170974155069587, 0.3827037773359841, 0.3836978131212724, 0.38469184890656066, 0.38568588469184895, 0.3866799204771372, 0.38767395626242546, 0.38866799204771374, 0.389662027833002, 0.39065606361829025, 0.39165009940357853, 0.3926441351888668, 0.3936381709741551, 0.3946322067594434, 0.3956262425447316, 0.3966202783300199, 0.3976143141153082, 0.39860834990059646, 0.3996023856858847, 0.40059642147117297, 0.40159045725646125, 0.40258449304174954, 0.40357852882703776, 0.40457256461232605, 0.40556660039761433, 0.4065606361829026, 0.4075546719681909, 0.4085487077534791, 0.4095427435387674, 0.4105367793240557, 0.411530815109344, 0.4125248508946322, 0.4135188866799205, 0.41451292246520877, 0.41550695825049705, 0.4165009940357853, 0.41749502982107356, 0.41848906560636184, 0.4194831013916501, 0.4204771371769384, 0.42147117296222664, 0.4224652087475149, 0.4234592445328032, 0.4244532803180915, 0.4254473161033797, 0.426441351888668, 0.4274353876739563, 0.42842942345924456, 0.4294234592445328, 0.4304174950298211, 0.43141153081510936, 0.43240556660039764, 0.4333996023856859, 0.43439363817097415, 0.43538767395626243, 0.4363817097415507, 0.437375745526839, 0.4383697813121272, 0.4393638170974155, 0.4403578528827038, 0.4413518886679921, 0.4423459244532803, 0.4433399602385686, 0.44433399602385687, 0.44532803180914515, 0.44632206759443344, 0.44731610337972166, 0.44831013916500995, 0.44930417495029823, 0.4502982107355865, 0.45129224652087474, 0.452286282306163, 0.4532803180914513, 0.4542743538767396, 0.4552683896620278, 0.4562624254473161, 0.4572564612326044, 0.45825049701789267, 0.45924453280318095, 0.4602385685884692, 0.46123260437375746, 0.46222664015904574, 0.463220675944334, 0.46421471172962225, 0.46520874751491054, 0.4662027833001988, 0.4671968190854871, 0.46819085487077533, 0.4691848906560636, 0.4701789264413519, 0.4711729622266402, 0.47216699801192846, 0.4731610337972167, 0.474155069582505, 0.47514910536779326, 0.47614314115308154, 0.47713717693836977, 0.47813121272365805, 0.47912524850894633, 0.4801192842942346, 0.48111332007952284, 0.4821073558648111, 0.4831013916500994, 0.4840954274353877, 0.485089463220676, 0.4860834990059642, 0.4870775347912525, 0.48807157057654077, 0.48906560636182905, 0.4900596421471173, 0.49105367793240556, 0.49204771371769385, 0.49304174950298213, 0.49403578528827036, 0.49502982107355864, 0.4960238568588469, 0.4970178926441352, 0.4980119284294235, 0.4990059642147117, 0.5, 0.5009940357852882, 0.5019880715705765, 0.5029821073558649, 0.5039761431411531, 0.5049701789264414, 0.5059642147117296, 0.5069582504970178, 0.5079522862823063, 0.5089463220675945, 0.5099403578528827, 0.510934393638171, 0.5119284294234592, 0.5129224652087476, 0.5139165009940359, 0.5149105367793241, 0.5159045725646123, 0.5168986083499005, 0.5178926441351888, 0.5188866799204772, 0.5198807157057654, 0.5208747514910537, 0.5218687872763419, 0.5228628230616301, 0.5238568588469186, 0.5248508946322068, 0.525844930417495, 0.5268389662027833, 0.5278330019880715, 0.5288270377733599, 0.5298210735586482, 0.5308151093439364, 0.5318091451292246, 0.5328031809145128, 0.5337972166998013, 0.5347912524850895, 0.5357852882703777, 0.536779324055666, 0.5377733598409542, 0.5387673956262427, 0.5397614314115309, 0.5407554671968191, 0.5417495029821073, 0.5427435387673956, 0.5437375745526838, 0.5447316103379722, 0.5457256461232605, 0.5467196819085487, 0.5477137176938369, 0.5487077534791251, 0.5497017892644136, 0.5506958250497018, 0.55168986083499, 0.5526838966202783, 0.5536779324055665, 0.554671968190855, 0.5556660039761432, 0.5566600397614314, 0.5576540755467196, 0.5586481113320079, 0.5596421471172963, 0.5606361829025845, 0.5616302186878728, 0.562624254473161, 0.5636182902584492, 0.5646123260437377, 0.5656063618290259, 0.5666003976143141, 0.5675944333996024, 0.5685884691848906, 0.5695825049701788, 0.5705765407554673, 0.5715705765407555, 0.5725646123260437, 0.573558648111332, 0.5745526838966202, 0.5755467196819086, 0.5765407554671969, 0.5775347912524851, 0.5785288270377733, 0.5795228628230615, 0.58051689860835, 0.5815109343936382, 0.5825049701789264, 0.5834990059642147, 0.5844930417495029, 0.5854870775347913, 0.5864811133200796, 0.5874751491053678, 0.588469184890656, 0.5894632206759443, 0.5904572564612327, 0.5914512922465209, 0.5924453280318092, 0.5934393638170974, 0.5944333996023856, 0.5954274353876738, 0.5964214711729623, 0.5974155069582505, 0.5984095427435387, 0.599403578528827, 0.6003976143141152, 0.6013916500994037, 0.6023856858846919, 0.6033797216699801, 0.6043737574552683, 0.6053677932405566, 0.606361829025845, 0.6073558648111332, 0.6083499005964215, 0.6093439363817097, 0.6103379721669979, 0.6113320079522864, 0.6123260437375746, 0.6133200795228628, 0.614314115308151, 0.6153081510934393, 0.6163021868787277, 0.617296222664016, 0.6182902584493042, 0.6192842942345924, 0.6202783300198806, 0.6212723658051689, 0.6222664015904573, 0.6232604373757455, 0.6242544731610338, 0.625248508946322, 0.6262425447316102, 0.6272365805168987, 0.6282306163021869, 0.6292246520874751, 0.6302186878727634, 0.6312127236580516, 0.63220675944334, 0.6332007952286283, 0.6341948310139165, 0.6351888667992047, 0.636182902584493, 0.6371769383697814, 0.6381709741550696, 0.6391650099403579, 0.6401590457256461, 0.6411530815109343, 0.6421471172962228, 0.643141153081511, 0.6441351888667992, 0.6451292246520874, 0.6461232604373757, 0.6471172962226639, 0.6481113320079523, 0.6491053677932406, 0.6500994035785288, 0.651093439363817, 0.6520874751491053, 0.6530815109343937, 0.6540755467196819, 0.6550695825049702, 0.6560636182902584, 0.6570576540755466, 0.6580516898608351, 0.6590457256461233, 0.6600397614314115, 0.6610337972166997, 0.662027833001988, 0.6630218687872764, 0.6640159045725647, 0.6650099403578529, 0.6660039761431411, 0.6669980119284293, 0.6679920477137178, 0.668986083499006, 0.6699801192842942, 0.6709741550695825, 0.6719681908548707, 0.6729622266401589, 0.6739562624254474, 0.6749502982107356, 0.6759443339960238, 0.676938369781312, 0.6779324055666003, 0.6789264413518887, 0.679920477137177, 0.6809145129224652, 0.6819085487077534, 0.6829025844930416, 0.6838966202783301, 0.6848906560636183, 0.6858846918489065, 0.6868787276341948, 0.687872763419483, 0.6888667992047715, 0.6898608349900597, 0.6908548707753479, 0.6918489065606361, 0.6928429423459244, 0.6938369781312128, 0.694831013916501, 0.6958250497017893, 0.6968190854870775, 0.6978131212723657, 0.698807157057654, 0.6998011928429424, 0.7007952286282306, 0.7017892644135189, 0.7027833001988071, 0.7037773359840953, 0.7047713717693838, 0.705765407554672, 0.7067594433399602, 0.7077534791252484, 0.7087475149105367, 0.7097415506958251, 0.7107355864811133, 0.7117296222664016, 0.7127236580516898, 0.713717693836978, 0.7147117296222665, 0.7157057654075547, 0.7166998011928429, 0.7176938369781312, 0.7186878727634194, 0.7196819085487078, 0.7206759443339961, 0.7216699801192843, 0.7226640159045725, 0.7236580516898607, 0.724652087475149, 0.7256461232604374, 0.7266401590457257, 0.7276341948310139, 0.7286282306163021, 0.7296222664015903, 0.7306163021868788, 0.731610337972167, 0.7326043737574552, 0.7335984095427435, 0.7345924453280317, 0.7355864811133201, 0.7365805168986084, 0.7375745526838966, 0.7385685884691848, 0.7395626242544731, 0.7405566600397615, 0.7415506958250497, 0.742544731610338, 0.7435387673956262, 0.7445328031809144, 0.7455268389662029, 0.7465208747514911, 0.7475149105367793, 0.7485089463220675, 0.7495029821073558, 0.750497017892644, 0.7514910536779325, 0.7524850894632207, 0.7534791252485089, 0.7544731610337971, 0.7554671968190854, 0.7564612326043738, 0.757455268389662, 0.7584493041749503, 0.7594433399602385, 0.7604373757455267, 0.7614314115308152, 0.7624254473161034, 0.7634194831013916, 0.7644135188866799, 0.7654075546719681, 0.7664015904572565, 0.7673956262425448, 0.768389662027833, 0.7693836978131212, 0.7703777335984094, 0.7713717693836979, 0.7723658051689861, 0.7733598409542743, 0.7743538767395626, 0.7753479125248508, 0.7763419483101393, 0.7773359840954275, 0.7783300198807157, 0.7793240556660039, 0.7803180914512922, 0.7813121272365804, 0.7823061630218688, 0.7833001988071571, 0.7842942345924453, 0.7852882703777335, 0.7862823061630217, 0.7872763419483102, 0.7882703777335984, 0.7892644135188867, 0.7902584493041749, 0.7912524850894631, 0.7922465208747516, 0.7932405566600398, 0.794234592445328, 0.7952286282306162, 0.7962226640159045, 0.7972166998011929, 0.7982107355864811, 0.7992047713717694, 0.8001988071570576, 0.8011928429423458, 0.8021868787276343, 0.8031809145129225, 0.8041749502982107, 0.805168986083499, 0.8061630218687872, 0.8071570576540754, 0.8081510934393639, 0.8091451292246521, 0.8101391650099403, 0.8111332007952285, 0.8121272365805168, 0.8131212723658052, 0.8141153081510935, 0.8151093439363817, 0.8161033797216699, 0.8170974155069581, 0.8180914512922466, 0.8190854870775348, 0.820079522862823, 0.8210735586481113, 0.8220675944333995, 0.823061630218688, 0.8240556660039762, 0.8250497017892644, 0.8260437375745526, 0.8270377733598409, 0.8280318091451293, 0.8290258449304175, 0.8300198807157058, 0.831013916500994, 0.8320079522862822, 0.8330019880715704, 0.8339960238568589, 0.8349900596421471, 0.8359840954274353, 0.8369781312127236, 0.8379721669980118, 0.8389662027833003, 0.8399602385685885, 0.8409542743538767, 0.8419483101391649, 0.8429423459244532, 0.8439363817097416, 0.8449304174950298, 0.8459244532803181, 0.8469184890656063, 0.8479125248508945, 0.848906560636183, 0.8499005964214712, 0.8508946322067594, 0.8518886679920477, 0.8528827037773359, 0.8538767395626243, 0.8548707753479126, 0.8558648111332008, 0.856858846918489, 0.8578528827037772, 0.8588469184890655, 0.8598409542743539, 0.8608349900596421, 0.8618290258449304, 0.8628230616302186, 0.8638170974155068, 0.8648111332007953, 0.8658051689860835, 0.8667992047713717, 0.86779324055666, 0.8687872763419482, 0.8697813121272366, 0.8707753479125249, 0.8717693836978131, 0.8727634194831013, 0.8737574552683895, 0.874751491053678, 0.8757455268389662, 0.8767395626242545, 0.8777335984095427, 0.8787276341948309, 0.8797216699801194, 0.8807157057654076, 0.8817097415506958, 0.882703777335984, 0.8836978131212723, 0.8846918489065605, 0.885685884691849, 0.8866799204771372, 0.8876739562624254, 0.8886679920477136, 0.8896620278330019, 0.8906560636182903, 0.8916500994035785, 0.8926441351888668, 0.893638170974155, 0.8946322067594432, 0.8956262425447317, 0.8966202783300199, 0.8976143141153081, 0.8986083499005963, 0.8996023856858846, 0.900596421471173, 0.9015904572564613, 0.9025844930417495, 0.9035785288270377, 0.9045725646123259, 0.9055666003976144, 0.9065606361829026, 0.9075546719681908, 0.9085487077534791, 0.9095427435387673, 0.9105367793240555, 0.911530815109344, 0.9125248508946322, 0.9135188866799204, 0.9145129224652087, 0.9155069582504969, 0.9165009940357853, 0.9174950298210736, 0.9184890656063618, 0.91948310139165, 0.9204771371769382, 0.9214711729622267, 0.9224652087475149, 0.9234592445328031, 0.9244532803180914, 0.9254473161033796, 0.926441351888668, 0.9274353876739563, 0.9284294234592445, 0.9294234592445327, 0.930417495029821, 0.9314115308151094, 0.9324055666003976, 0.9333996023856859, 0.9343936381709741, 0.9353876739562623, 0.9363817097415505, 0.937375745526839, 0.9383697813121272, 0.9393638170974155, 0.9403578528827037, 0.9413518886679919, 0.9423459244532804, 0.9433399602385686, 0.9443339960238568, 0.945328031809145, 0.9463220675944333, 0.9473161033797217, 0.94831013916501, 0.9493041749502982, 0.9502982107355864, 0.9512922465208746, 0.9522862823061631, 0.9532803180914513, 0.9542743538767395, 0.9552683896620278, 0.956262425447316, 0.9572564612326044, 0.9582504970178927, 0.9592445328031809, 0.9602385685884691, 0.9612326043737573, 0.9622266401590456, 0.963220675944334, 0.9642147117296223, 0.9652087475149105, 0.9662027833001987, 0.9671968190854869, 0.9681908548707754, 0.9691848906560636, 0.9701789264413518, 0.9711729622266401, 0.9721669980119283, 0.9731610337972167, 0.974155069582505, 0.9751491053677932, 0.9761431411530814, 0.9771371769383697, 0.9781312127236581, 0.9791252485089463, 0.9801192842942346, 0.9811133200795228, 0.982107355864811, 0.9831013916500995, 0.9840954274353877, 0.9850894632206759, 0.9860834990059641, 0.9870775347912524, 0.9880715705765406, 0.989065606361829, 0.9900596421471173, 0.9910536779324055, 0.9920477137176937, 0.993041749502982, 0.9940357852882704, 0.9950298210735586, 0.9960238568588469, 0.9970178926441351, 0.9980119284294233, 0.9990059642147118, 1.0]}
},{}],72:[function(require,module,exports){
module.exports={"expected": [0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 0.9999999999999999, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002, 1.0000000000000002], "x": [-5.551115123125783e-17, -5.540079108964499e-17, -5.529043094803215e-17, -5.5180070806419313e-17, -5.506971066480647e-17, -5.495935052319363e-17, -5.484899038158079e-17, -5.473863023996796e-17, -5.462827009835512e-17, -5.451790995674228e-17, -5.440754981512944e-17, -5.4297189673516605e-17, -5.4186829531903765e-17, -5.4076469390290925e-17, -5.3966109248678085e-17, -5.3855749107065245e-17, -5.374538896545241e-17, -5.363502882383957e-17, -5.352466868222673e-17, -5.341430854061389e-17, -5.330394839900106e-17, -5.319358825738822e-17, -5.308322811577538e-17, -5.297286797416254e-17, -5.2862507832549703e-17, -5.2752147690936863e-17, -5.2641787549324023e-17, -5.2531427407711183e-17, -5.2421067266098343e-17, -5.231070712448551e-17, -5.220034698287267e-17, -5.208998684125983e-17, -5.197962669964699e-17, -5.1869266558034155e-17, -5.1758906416421315e-17, -5.1648546274808475e-17, -5.1538186133195635e-17, -5.14278259915828e-17, -5.131746584996996e-17, -5.120710570835712e-17, -5.109674556674428e-17, -5.098638542513144e-17, -5.087602528351861e-17, -5.076566514190577e-17, -5.065530500029293e-17, -5.054494485868009e-17, -5.0434584717067253e-17, -5.0324224575454413e-17, -5.0213864433841573e-17, -5.0103504292228733e-17, -4.99931441506159e-17, -4.988278400900306e-17, -4.977242386739022e-17, -4.966206372577738e-17, -4.955170358416454e-17, -4.9441343442551705e-17, -4.9330983300938865e-17, -4.9220623159326025e-17, -4.9110263017713185e-17, -4.899990287610035e-17, -4.888954273448751e-17, -4.877918259287467e-17, -4.866882245126183e-17, -4.8558462309649e-17, -4.844810216803616e-17, -4.833774202642332e-17, -4.822738188481048e-17, -4.811702174319764e-17, -4.8006661601584803e-17, -4.7896301459971963e-17, -4.7785941318359123e-17, -4.7675581176746283e-17, -4.7565221035133443e-17, -4.745486089352061e-17, -4.734450075190777e-17, -4.723414061029493e-17, -4.7123780468682096e-17, -4.7013420327069256e-17, -4.6903060185456416e-17, -4.6792700043843575e-17, -4.6682339902230735e-17, -4.65719797606179e-17, -4.646161961900506e-17, -4.635125947739222e-17, -4.624089933577938e-17, -4.613053919416654e-17, -4.602017905255371e-17, -4.590981891094087e-17, -4.579945876932803e-17, -4.5689098627715194e-17, -4.5578738486102354e-17, -4.5468378344489514e-17, -4.5358018202876674e-17, -4.5247658061263834e-17, -4.5137297919651e-17, -4.502693777803816e-17, -4.491657763642532e-17, -4.480621749481248e-17, -4.469585735319964e-17, -4.4585497211586806e-17, -4.4475137069973966e-17, -4.4364776928361126e-17, -4.425441678674829e-17, -4.414405664513545e-17, -4.403369650352261e-17, -4.392333636190977e-17, -4.381297622029693e-17, -4.37026160786841e-17, -4.359225593707126e-17, -4.348189579545842e-17, -4.337153565384558e-17, -4.326117551223274e-17, -4.3150815370619904e-17, -4.3040455229007064e-17, -4.2930095087394224e-17, -4.281973494578139e-17, -4.270937480416855e-17, -4.259901466255571e-17, -4.248865452094287e-17, -4.237829437933003e-17, -4.2267934237717196e-17, -4.2157574096104356e-17, -4.2047213954491516e-17, -4.1936853812878676e-17, -4.1826493671265836e-17, -4.1716133529653e-17, -4.160577338804016e-17, -4.149541324642732e-17, -4.138505310481449e-17, -4.127469296320164e-17, -4.116433282158881e-17, -4.105397267997597e-17, -4.094361253836313e-17, -4.0833252396750294e-17, -4.0722892255137454e-17, -4.0612532113524614e-17, -4.050217197191178e-17, -4.0391811830298934e-17, -4.02814516886861e-17, -4.017109154707326e-17, -4.006073140546042e-17, -3.9950371263847586e-17, -3.984001112223474e-17, -3.9729650980621906e-17, -3.9619290839009066e-17, -3.9508930697396226e-17, -3.939857055578339e-17, -3.928821041417055e-17, -3.917785027255771e-17, -3.906749013094488e-17, -3.895712998933203e-17, -3.88467698477192e-17, -3.873640970610636e-17, -3.862604956449352e-17, -3.8515689422880684e-17, -3.840532928126784e-17, -3.8294969139655004e-17, -3.8184608998042164e-17, -3.8074248856429324e-17, -3.796388871481649e-17, -3.785352857320365e-17, -3.774316843159081e-17, -3.7632808289977976e-17, -3.752244814836513e-17, -3.7412088006752296e-17, -3.7301727865139456e-17, -3.7191367723526616e-17, -3.708100758191378e-17, -3.6970647440300936e-17, -3.68602872986881e-17, -3.674992715707526e-17, -3.663956701546242e-17, -3.652920687384959e-17, -3.641884673223675e-17, -3.630848659062391e-17, -3.6198126449011074e-17, -3.608776630739823e-17, -3.5977406165785394e-17, -3.5867046024172554e-17, -3.5756685882559714e-17, -3.564632574094688e-17, -3.5535965599334034e-17, -3.54256054577212e-17, -3.531524531610836e-17, -3.520488517449552e-17, -3.5094525032882686e-17, -3.4984164891269846e-17, -3.4873804749657006e-17, -3.476344460804417e-17, -3.4653084466431326e-17, -3.454272432481849e-17, -3.443236418320565e-17, -3.432200404159281e-17, -3.421164389997998e-17, -3.410128375836713e-17, -3.39909236167543e-17, -3.388056347514146e-17, -3.377020333352862e-17, -3.3659843191915784e-17, -3.3549483050302944e-17, -3.3439122908690104e-17, -3.332876276707727e-17, -3.3218402625464424e-17, -3.310804248385159e-17, -3.299768234223875e-17, -3.288732220062591e-17, -3.2776962059013076e-17, -3.266660191740023e-17, -3.2556241775787396e-17, -3.2445881634174556e-17, -3.2335521492561716e-17, -3.222516135094888e-17, -3.211480120933604e-17, -3.20044410677232e-17, -3.189408092611037e-17, -3.178372078449752e-17, -3.167336064288469e-17, -3.156300050127185e-17, -3.145264035965901e-17, -3.1342280218046174e-17, -3.123192007643333e-17, -3.1121559934820494e-17, -3.1011199793207654e-17, -3.0900839651594814e-17, -3.079047950998198e-17, -3.068011936836914e-17, -3.05697592267563e-17, -3.0459399085143467e-17, -3.034903894353062e-17, -3.0238678801917786e-17, -3.0128318660304946e-17, -3.0017958518692106e-17, -2.990759837707927e-17, -2.9797238235466426e-17, -2.968687809385359e-17, -2.957651795224075e-17, -2.946615781062791e-17, -2.935579766901508e-17, -2.924543752740224e-17, -2.91350773857894e-17, -2.9024717244176565e-17, -2.891435710256372e-17, -2.8803996960950885e-17, -2.8693636819338045e-17, -2.8583276677725205e-17, -2.847291653611237e-17, -2.8362556394499524e-17, -2.825219625288669e-17, -2.814183611127385e-17, -2.803147596966101e-17, -2.7921115828048177e-17, -2.7810755686435337e-17, -2.7700395544822497e-17, -2.7590035403209657e-17, -2.7479675261596823e-17, -2.7369315119983983e-17, -2.7258954978371143e-17, -2.7148594836758303e-17, -2.7038234695145463e-17, -2.692787455353263e-17, -2.681751441191979e-17, -2.670715427030695e-17, -2.659679412869411e-17, -2.6486433987081275e-17, -2.6376073845468435e-17, -2.6265713703855595e-17, -2.6155353562242755e-17, -2.604499342062992e-17, -2.593463327901708e-17, -2.582427313740424e-17, -2.57139129957914e-17, -2.560355285417856e-17, -2.5493192712565727e-17, -2.5382832570952887e-17, -2.5272472429340047e-17, -2.5162112287727207e-17, -2.5051752146114373e-17, -2.4941392004501533e-17, -2.4831031862888693e-17, -2.4720671721275853e-17, -2.461031157966302e-17, -2.449995143805018e-17, -2.438959129643734e-17, -2.42792311548245e-17, -2.416887101321166e-17, -2.4058510871598825e-17, -2.3948150729985985e-17, -2.3837790588373145e-17, -2.3727430446760305e-17, -2.361707030514747e-17, -2.350671016353463e-17, -2.339635002192179e-17, -2.328598988030895e-17, -2.3175629738696117e-17, -2.3065269597083277e-17, -2.2954909455470437e-17, -2.2844549313857597e-17, -2.2734189172244757e-17, -2.2623829030631923e-17, -2.2513468889019083e-17, -2.2403108747406243e-17, -2.2292748605793403e-17, -2.218238846418057e-17, -2.207202832256773e-17, -2.196166818095489e-17, -2.185130803934205e-17, -2.1740947897729215e-17, -2.1630587756116375e-17, -2.1520227614503535e-17, -2.1409867472890695e-17, -2.1299507331277855e-17, -2.118914718966502e-17, -2.107878704805218e-17, -2.096842690643934e-17, -2.08580667648265e-17, -2.0747706623213667e-17, -2.0637346481600827e-17, -2.0526986339987987e-17, -2.0416626198375147e-17, -2.0306266056762313e-17, -2.0195905915149473e-17, -2.0085545773536633e-17, -1.9975185631923793e-17, -1.9864825490310953e-17, -1.975446534869812e-17, -1.964410520708528e-17, -1.953374506547244e-17, -1.94233849238596e-17, -1.9313024782246765e-17, -1.9202664640633925e-17, -1.9092304499021085e-17, -1.8981944357408245e-17, -1.887158421579541e-17, -1.876122407418257e-17, -1.865086393256973e-17, -1.854050379095689e-17, -1.843014364934405e-17, -1.8319783507731217e-17, -1.8209423366118377e-17, -1.8099063224505537e-17, -1.7988703082892697e-17, -1.7878342941279863e-17, -1.7767982799667023e-17, -1.7657622658054183e-17, -1.7547262516441343e-17, -1.743690237482851e-17, -1.732654223321567e-17, -1.721618209160283e-17, -1.710582194998999e-17, -1.699546180837715e-17, -1.6885101666764315e-17, -1.6774741525151475e-17, -1.6664381383538635e-17, -1.6554021241925795e-17, -1.644366110031296e-17, -1.633330095870012e-17, -1.622294081708728e-17, -1.611258067547444e-17, -1.6002220533861607e-17, -1.5891860392248767e-17, -1.5781500250635927e-17, -1.5671140109023087e-17, -1.5560779967410247e-17, -1.5450419825797413e-17, -1.5340059684184573e-17, -1.5229699542571733e-17, -1.5119339400958893e-17, -1.500897925934606e-17, -1.489861911773322e-17, -1.478825897612038e-17, -1.467789883450754e-17, -1.4567538692894705e-17, -1.4457178551281865e-17, -1.4346818409669025e-17, -1.4236458268056185e-17, -1.4126098126443345e-17, -1.401573798483051e-17, -1.390537784321767e-17, -1.3795017701604831e-17, -1.3684657559991991e-17, -1.3574297418379157e-17, -1.3463937276766317e-17, -1.3353577135153477e-17, -1.3243216993540637e-17, -1.3132856851927797e-17, -1.3022496710314963e-17, -1.2912136568702123e-17, -1.2801776427089283e-17, -1.2691416285476443e-17, -1.258105614386361e-17, -1.247069600225077e-17, -1.236033586063793e-17, -1.224997571902509e-17, -1.2139615577412256e-17, -1.2029255435799416e-17, -1.1918895294186575e-17, -1.1808535152573735e-17, -1.1698175010960895e-17, -1.1587814869348062e-17, -1.1477454727735222e-17, -1.1367094586122381e-17, -1.1256734444509541e-17, -1.1146374302896708e-17, -1.1036014161283868e-17, -1.0925654019671028e-17, -1.0815293878058187e-17, -1.0704933736445354e-17, -1.0594573594832514e-17, -1.0484213453219674e-17, -1.0373853311606834e-17, -1.0263493169993993e-17, -1.015313302838116e-17, -1.004277288676832e-17, -9.93241274515548e-18, -9.82205260354264e-18, -9.711692461929806e-18, -9.601332320316966e-18, -9.490972178704126e-18, -9.380612037091286e-18, -9.270251895478452e-18, -9.159891753865612e-18, -9.049531612252772e-18, -8.939171470639932e-18, -8.828811329027092e-18, -8.718451187414258e-18, -8.608091045801418e-18, -8.497730904188578e-18, -8.387370762575738e-18, -8.277010620962904e-18, -8.166650479350064e-18, -8.056290337737224e-18, -7.945930196124384e-18, -7.83557005451155e-18, -7.72520991289871e-18, -7.61484977128587e-18, -7.50448962967303e-18, -7.39412948806019e-18, -7.283769346447356e-18, -7.173409204834516e-18, -7.063049063221676e-18, -6.952688921608836e-18, -6.842328779996002e-18, -6.731968638383162e-18, -6.621608496770322e-18, -6.511248355157482e-18, -6.400888213544648e-18, -6.290528071931808e-18, -6.180167930318968e-18, -6.069807788706128e-18, -5.959447647093288e-18, -5.849087505480454e-18, -5.738727363867614e-18, -5.628367222254774e-18, -5.518007080641934e-18, -5.4076469390291e-18, -5.29728679741626e-18, -5.18692665580342e-18, -5.07656651419058e-18, -4.966206372577746e-18, -4.855846230964906e-18, -4.745486089352066e-18, -4.635125947739226e-18, -4.524765806126386e-18, -4.414405664513552e-18, -4.304045522900712e-18, -4.193685381287872e-18, -4.083325239675032e-18, -3.972965098062198e-18, -3.862604956449358e-18, -3.752244814836518e-18, -3.641884673223678e-18, -3.531524531610844e-18, -3.421164389998004e-18, -3.310804248385164e-18, -3.200444106772324e-18, -3.090083965159484e-18, -2.97972382354665e-18, -2.86936368193381e-18, -2.75900354032097e-18, -2.64864339870813e-18, -2.538283257095296e-18, -2.427923115482456e-18, -2.317562973869616e-18, -2.207202832256776e-18, -2.096842690643942e-18, -1.986482549031102e-18, -1.876122407418262e-18, -1.765762265805422e-18, -1.655402124192582e-18, -1.5450419825797481e-18, -1.434681840966908e-18, -1.324321699354068e-18, -1.213961557741228e-18, -1.1036014161283942e-18, -9.932412745155541e-19, -8.82881132902714e-19, -7.725209912898741e-19, -6.621608496770402e-19, -5.518007080642002e-19, -4.414405664513601e-19, -3.310804248385201e-19, -2.2072028322568006e-19, -1.103601416128462e-19, -6.162975822039155e-33, 1.1036014161283387e-19, 2.2072028322566774e-19, 3.3108042483851393e-19, 4.414405664513478e-19, 5.518007080641817e-19, 6.621608496770279e-19, 7.725209912898617e-19, 8.82881132902708e-19, 9.932412745155418e-19, 1.1036014161283757e-18, 1.2139615577412219e-18, 1.3243216993540557e-18, 1.434681840966902e-18, 1.5450419825797358e-18, 1.6554021241925697e-18, 1.765762265805416e-18, 1.8761224074182497e-18, 1.9864825490310836e-18, 2.0968426906439298e-18, 2.2072028322567636e-18, 2.31756297386961e-18, 2.4279231154824437e-18, 2.5382832570952776e-18, 2.6486433987081238e-18, 2.7590035403209576e-18, 2.869363681933804e-18, 2.9797238235466377e-18, 3.0900839651594716e-18, 3.2004441067723178e-18, 3.3108042483851516e-18, 3.4211643899979855e-18, 3.531524531610832e-18, 3.6418846732236656e-18, 3.752244814836512e-18, 3.862604956449346e-18, 3.9729650980621795e-18, 4.083325239675026e-18, 4.1936853812878596e-18, 4.304045522900706e-18, 4.41440566451354e-18, 4.5247658061263735e-18, 4.63512594773922e-18, 4.7454860893520536e-18, 4.8558462309648874e-18, 4.966206372577734e-18, 5.0765665141905675e-18, 5.186926655803414e-18, 5.2972867974162475e-18, 5.4076469390290814e-18, 5.5180070806419276e-18, 5.6283672222547615e-18, 5.738727363867608e-18, 5.8490875054804415e-18, 5.9594476470932754e-18, 6.0698077887061216e-18, 6.1801679303189555e-18, 6.290528071931789e-18, 6.4008882135446355e-18, 6.5112483551574694e-18, 6.6216084967703156e-18, 6.7319686383831495e-18, 6.842328779995983e-18, 6.95268892160883e-18, 7.063049063221663e-18, 7.17340920483451e-18, 7.283769346447343e-18, 7.394129488060177e-18, 7.504489629673024e-18, 7.614849771285857e-18, 7.725209912898691e-18, 7.835570054511537e-18, 7.945930196124371e-18, 8.056290337737218e-18, 8.166650479350051e-18, 8.277010620962885e-18, 8.387370762575731e-18, 8.497730904188565e-18, 8.608091045801412e-18, 8.718451187414245e-18, 8.82881132902708e-18, 8.939171470639925e-18, 9.04953161225276e-18, 9.159891753865593e-18, 9.27025189547844e-18, 9.380612037091273e-18, 9.49097217870412e-18, 9.601332320316953e-18, 9.711692461929787e-18, 9.822052603542633e-18, 9.932412745155467e-18, 1.0042772886768313e-17, 1.0153133028381147e-17, 1.0263493169993981e-17, 1.0373853311606827e-17, 1.0484213453219661e-17, 1.0594573594832495e-17, 1.0704933736445341e-17, 1.0815293878058175e-17, 1.0925654019671021e-17, 1.1036014161283855e-17, 1.1146374302896689e-17, 1.1256734444509535e-17, 1.1367094586122369e-17, 1.1477454727735215e-17, 1.1587814869348049e-17, 1.1698175010960883e-17, 1.180853515257373e-17, 1.1918895294186563e-17, 1.2029255435799397e-17, 1.2139615577412243e-17, 1.2249975719025077e-17, 1.2360335860637923e-17, 1.2470696002250757e-17, 1.2581056143863591e-17, 1.2691416285476437e-17, 1.2801776427089271e-17, 1.2912136568702117e-17, 1.3022496710314951e-17, 1.3132856851927785e-17, 1.3243216993540631e-17, 1.3353577135153465e-17, 1.3463937276766299e-17, 1.3574297418379145e-17, 1.3684657559991979e-17, 1.3795017701604825e-17, 1.390537784321766e-17, 1.4015737984830493e-17, 1.412609812644334e-17, 1.4236458268056173e-17, 1.434681840966902e-17, 1.4457178551281853e-17, 1.4567538692894687e-17, 1.4677898834507533e-17, 1.4788258976120367e-17, 1.48986191177332e-17, 1.5008979259346047e-17, 1.511933940095888e-17, 1.5229699542571727e-17, 1.534005968418456e-17, 1.5450419825797395e-17, 1.556077996741024e-17, 1.5671140109023075e-17, 1.578150025063592e-17, 1.5891860392248755e-17, 1.600222053386159e-17, 1.6112580675474435e-17, 1.622294081708727e-17, 1.6333300958700103e-17, 1.644366110031295e-17, 1.6554021241925783e-17, 1.666438138353863e-17, 1.6774741525151463e-17, 1.6885101666764297e-17, 1.6995461808377143e-17, 1.7105821949989977e-17, 1.7216182091602823e-17, 1.7326542233215657e-17, 1.743690237482849e-17, 1.7547262516441337e-17, 1.765762265805417e-17, 1.7767982799667005e-17, 1.787834294127985e-17, 1.7988703082892685e-17, 1.809906322450553e-17, 1.8209423366118365e-17, 1.83197835077312e-17, 1.8430143649344045e-17, 1.854050379095688e-17, 1.8650863932569725e-17, 1.876122407418256e-17, 1.8871584215795393e-17, 1.898194435740824e-17, 1.9092304499021073e-17, 1.9202664640633907e-17, 1.9313024782246753e-17, 1.9423384923859587e-17, 1.9533745065472433e-17, 1.9644105207085267e-17, 1.97544653486981e-17, 1.9864825490310947e-17, 1.997518563192378e-17, 2.0085545773536627e-17, 2.019590591514946e-17, 2.0306266056762295e-17, 2.041662619837514e-17, 2.0526986339987975e-17, 2.063734648160081e-17, 2.0747706623213655e-17, 2.085806676482649e-17, 2.0968426906439335e-17, 2.107878704805217e-17, 2.1189147189665003e-17, 2.129950733127785e-17, 2.1409867472890683e-17, 2.152022761450353e-17, 2.1630587756116363e-17, 2.1740947897729197e-17, 2.1851308039342043e-17, 2.1961668180954877e-17, 2.207202832256771e-17, 2.2182388464180557e-17, 2.229274860579339e-17, 2.2403108747406237e-17, 2.251346888901907e-17, 2.2623829030631904e-17, 2.273418917224475e-17, 2.2844549313857585e-17, 2.295490945547043e-17, 2.3065269597083265e-17, 2.3175629738696098e-17, 2.3285989880308945e-17, 2.339635002192178e-17, 2.3506710163534612e-17, 2.361707030514746e-17, 2.3727430446760292e-17, 2.383779058837314e-17, 2.3948150729985972e-17, 2.4058510871598806e-17, 2.4168871013211653e-17, 2.4279231154824486e-17, 2.4389591296437333e-17, 2.4499951438050166e-17, 2.4610311579663e-17, 2.4720671721275847e-17, 2.483103186288868e-17, 2.4941392004501514e-17, 2.505175214611436e-17, 2.5162112287727194e-17, 2.527247242934004e-17, 2.5382832570952874e-17, 2.5493192712565708e-17, 2.5603552854178554e-17, 2.5713912995791388e-17, 2.5824273137404235e-17, 2.5934633279017068e-17, 2.6044993420629902e-17, 2.615535356224275e-17, 2.6265713703855582e-17, 2.6376073845468416e-17, 2.6486433987081262e-17, 2.6596794128694096e-17, 2.6707154270306942e-17, 2.6817514411919776e-17, 2.692787455353261e-17, 2.7038234695145456e-17, 2.714859483675829e-17, 2.7258954978371136e-17, 2.736931511998397e-17, 2.7479675261596804e-17, 2.759003540320965e-17, 2.7700395544822484e-17, 2.781075568643532e-17, 2.7921115828048164e-17, 2.8031475969661e-17, 2.8141836111273844e-17, 2.825219625288668e-17, 2.836255639449951e-17, 2.847291653611236e-17, 2.858327667772519e-17, 2.869363681933804e-17, 2.880399696095087e-17, 2.8914357102563706e-17, 2.902471724417655e-17, 2.9135077385789386e-17, 2.924543752740223e-17, 2.9355797669015066e-17, 2.94661578106279e-17, 2.9576517952240746e-17, 2.968687809385358e-17, 2.9797238235466414e-17, 2.990759837707926e-17, 3.0017958518692094e-17, 3.012831866030494e-17, 3.0238678801917774e-17, 3.034903894353061e-17, 3.0459399085143454e-17, 3.056975922675629e-17, 3.0680119368369134e-17, 3.079047950998197e-17, 3.09008396515948e-17, 3.101119979320765e-17, 3.112155993482048e-17, 3.1231920076433316e-17, 3.134228021804616e-17, 3.1452640359658996e-17, 3.156300050127184e-17, 3.1673360642884676e-17, 3.178372078449751e-17, 3.1894080926110356e-17, 3.200444106772319e-17, 3.2114801209336036e-17, 3.222516135094887e-17, 3.2335521492561704e-17, 3.244588163417455e-17, 3.2556241775787384e-17, 3.266660191740022e-17, 3.2776962059013064e-17, 3.28873222006259e-17, 3.2997682342238744e-17, 3.310804248385158e-17, 3.321840262546441e-17, 3.332876276707726e-17, 3.343912290869009e-17, 3.354948305030294e-17, 3.365984319191577e-17, 3.3770203333528606e-17, 3.388056347514145e-17, 3.3990923616754286e-17, 3.410128375836712e-17, 3.4211643899979966e-17, 3.43220040415928e-17, 3.4432364183205646e-17, 3.454272432481848e-17, 3.4653084466431314e-17, 3.476344460804416e-17, 3.4873804749656994e-17, 3.498416489126984e-17, 3.5094525032882674e-17, 3.520488517449551e-17, 3.5315245316108354e-17, 3.542560545772119e-17, 3.553596559933402e-17, 3.564632574094687e-17, 3.57566858825597e-17, 3.586704602417255e-17, 3.597740616578538e-17, 3.6087766307398216e-17, 3.619812644901106e-17, 3.6308486590623896e-17, 3.641884673223674e-17, 3.6529206873849576e-17, 3.663956701546241e-17, 3.6749927157075256e-17, 3.686028729868809e-17, 3.6970647440300924e-17, 3.708100758191377e-17, 3.7191367723526604e-17, 3.730172786513945e-17, 3.7412088006752284e-17, 3.752244814836512e-17, 3.7632808289977964e-17, 3.77431684315908e-17, 3.7853528573203644e-17, 3.796388871481648e-17, 3.807424885642931e-17, 3.818460899804216e-17, 3.829496913965499e-17, 3.8405329281267826e-17, 3.851568942288067e-17, 3.8626049564493506e-17, 3.873640970610635e-17, 3.8846769847719186e-17, 3.895712998933202e-17, 3.9067490130944866e-17, 3.91778502725577e-17, 3.9288210414170546e-17, 3.939857055578338e-17, 3.9508930697396214e-17, 3.961929083900906e-17, 3.9729650980621894e-17, 3.984001112223473e-17, 3.9950371263847574e-17, 4.006073140546041e-17, 4.0171091547073254e-17, 4.028145168868609e-17, 4.039181183029892e-17, 4.050217197191177e-17, 4.06125321135246e-17, 4.072289225513745e-17, 4.083325239675028e-17, 4.0943612538363115e-17, 4.105397267997596e-17, 4.1164332821588796e-17, 4.127469296320163e-17, 4.1385053104814476e-17, 4.149541324642731e-17, 4.1605773388040156e-17, 4.171613352965299e-17, 4.1826493671265823e-17, 4.193685381287867e-17, 4.2047213954491503e-17, 4.215757409610435e-17, 4.2267934237717183e-17, 4.237829437933002e-17, 4.2488654520942864e-17, 4.25990146625557e-17, 4.270937480416853e-17, 4.281973494578138e-17, 4.293009508739421e-17, 4.304045522900706e-17, 4.315081537061989e-17, 4.3261175512232725e-17, 4.337153565384557e-17, 4.3481895795458405e-17, 4.359225593707125e-17, 4.3702616078684085e-17, 4.381297622029692e-17, 4.3923336361909765e-17, 4.40336965035226e-17, 4.4144056645135433e-17, 4.425441678674828e-17, 4.4364776928361113e-17, 4.447513706997396e-17, 4.4585497211586793e-17, 4.469585735319963e-17, 4.4806217494812473e-17, 4.491657763642531e-17, 4.5026937778038153e-17, 4.513729791965099e-17, 4.524765806126382e-17, 4.535801820287667e-17, 4.54683783444895e-17, 4.5578738486102335e-17, 4.568909862771518e-17, 4.5799458769328015e-17, 4.590981891094086e-17, 4.6020179052553695e-17, 4.613053919416653e-17, 4.6240899335779375e-17, 4.635125947739221e-17, 4.6461619619005055e-17, 4.657197976061789e-17, 4.6682339902230723e-17, 4.679270004384357e-17, 4.6903060185456403e-17, 4.701342032706924e-17, 4.7123780468682083e-17, 4.723414061029492e-17, 4.7344500751907763e-17, 4.74548608935206e-17, 4.756522103513343e-17, 4.767558117674628e-17, 4.778594131835911e-17, 4.789630145997196e-17, 4.800666160158479e-17, 4.8117021743197625e-17, 4.822738188481047e-17, 4.8337742026423305e-17, 4.844810216803614e-17, 4.8558462309648985e-17, 4.866882245126182e-17, 4.8779182592874665e-17, 4.88895427344875e-17, 4.899990287610033e-17, 4.911026301771318e-17, 4.922062315932601e-17, 4.933098330093886e-17, 4.9441343442551693e-17, 4.955170358416453e-17, 4.9662063725777373e-17, 4.977242386739021e-17, 4.988278400900304e-17, 4.999314415061589e-17, 5.010350429222872e-17, 5.021386443384157e-17, 5.03242245754544e-17, 5.0434584717067235e-17, 5.054494485868008e-17, 5.0655305000292915e-17, 5.076566514190576e-17, 5.0876025283518595e-17, 5.098638542513143e-17, 5.1096745566744275e-17, 5.120710570835711e-17, 5.131746584996994e-17, 5.142782599158279e-17, 5.153818613319562e-17, 5.164854627480847e-17, 5.17589064164213e-17, 5.1869266558034137e-17, 5.197962669964698e-17, 5.2089986841259817e-17, 5.220034698287266e-17, 5.23107071244855e-17, 5.242106726609833e-17, 5.253142740771118e-17, 5.264178754932401e-17, 5.2752147690936845e-17, 5.286250783254969e-17, 5.2972867974162525e-17, 5.308322811577537e-17, 5.3193588257388205e-17, 5.330394839900104e-17, 5.3414308540613885e-17, 5.352466868222672e-17, 5.3635028823839565e-17, 5.37453889654524e-17, 5.385574910706523e-17, 5.396610924867808e-17, 5.407646939029091e-17, 5.4186829531903747e-17, 5.429718967351659e-17, 5.4407549815129427e-17, 5.451790995674227e-17, 5.4628270098355107e-17, 5.473863023996794e-17, 5.4848990381580787e-17, 5.495935052319362e-17, 5.5069710664806467e-17, 5.51800708064193e-17, 5.5290430948032135e-17, 5.540079108964498e-17, 5.551115123125783e-17]}
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
var exp10 = require( './../lib' );


// FIXTURES //

var mediumNegative = require( './fixtures/python/medium_negative.json' );
var mediumPositive = require( './fixtures/python/medium_positive.json' );
var smallNegative = require( './fixtures/python/small_negative.json' );
var smallPositive = require( './fixtures/python/small_positive.json' );
var tiny = require( './fixtures/python/tiny.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof exp10, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accurately computes `10**x` for negative medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp10( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `10**x` for positive medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp10( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `10**x` for negative small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp10( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `10**x` for positive small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp10( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `10**x` for very small `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp10( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function returns `+infinity` for very large `x`', function test( t ) {
	t.equal( exp10( 400.0 ), PINF, 'equals +infinity' );
	t.equal( exp10( 500.0 ), PINF, 'equals +infinity' );
	t.equal( exp10( 600.0 ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `0.0` for negative large `x`', function test( t ) {
	t.equal( exp10( -400.0 ), 0.0, 'equals 0' );
	t.equal( exp10( -500.0 ), 0.0, 'equals 0' );
	t.equal( exp10( -600.0 ), 0.0, 'equals 0' );
	t.end();
});

tape( 'the function returns `0.0` if provided `-infinity`', function test( t ) {
	t.equal( exp10( NINF ), 0.0, 'equals 0' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	t.equal( exp10( PINF ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `1` if provided `0`', function test( t ) {
	var v = exp10( 0.0 );
	t.equal( v, 1.0, 'equals 1' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var val = exp10( NaN );
	t.equal( isnan( val ), true, 'equals NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/exp10/test/test.js")
},{"./../lib":65,"./fixtures/python/medium_negative.json":68,"./fixtures/python/medium_positive.json":69,"./fixtures/python/small_negative.json":70,"./fixtures/python/small_positive.json":71,"./fixtures/python/tiny.json":72,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60,"tape":203}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":49,"@stdlib/constants/float64/ninf":50,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/copysign":63,"@stdlib/number/float64/base/exponent":80,"@stdlib/number/float64/base/from-words":82,"@stdlib/number/float64/base/normalize":88,"@stdlib/number/float64/base/to-words":91}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":86}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":84}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":83,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":85,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":60}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":93}],92:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":83}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":94}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":92,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":96,"./polyfill.js":97,"@stdlib/assert/has-tostringtag-support":20}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":98}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":98,"./tostringtag.js":99,"@stdlib/assert/has-own-property":16}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){

},{}],102:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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
},{"_process":195}],105:[function(require,module,exports){
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

},{"events":103,"inherits":190,"readable-stream/lib/_stream_duplex.js":107,"readable-stream/lib/_stream_passthrough.js":108,"readable-stream/lib/_stream_readable.js":109,"readable-stream/lib/_stream_transform.js":110,"readable-stream/lib/_stream_writable.js":111,"readable-stream/lib/internal/streams/end-of-stream.js":115,"readable-stream/lib/internal/streams/pipeline.js":117}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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
},{"./_stream_readable":109,"./_stream_writable":111,"_process":195,"inherits":190}],108:[function(require,module,exports){
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
},{"./_stream_transform":110,"inherits":190}],109:[function(require,module,exports){
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
},{"../errors":106,"./_stream_duplex":107,"./internal/streams/async_iterator":112,"./internal/streams/buffer_list":113,"./internal/streams/destroy":114,"./internal/streams/from":116,"./internal/streams/state":118,"./internal/streams/stream":119,"_process":195,"buffer":120,"events":103,"inherits":190,"string_decoder/":202,"util":101}],110:[function(require,module,exports){
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
},{"../errors":106,"./_stream_duplex":107,"inherits":190}],111:[function(require,module,exports){
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
},{"../errors":106,"./_stream_duplex":107,"./internal/streams/destroy":114,"./internal/streams/state":118,"./internal/streams/stream":119,"_process":195,"buffer":120,"inherits":190,"util-deprecate":211}],112:[function(require,module,exports){
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
},{"./end-of-stream":115,"_process":195}],113:[function(require,module,exports){
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
},{"buffer":120,"util":101}],114:[function(require,module,exports){
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
},{"_process":195}],115:[function(require,module,exports){
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
},{"../../../errors":106}],116:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],117:[function(require,module,exports){
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
},{"../../../errors":106,"./end-of-stream":115}],118:[function(require,module,exports){
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
},{"../../../errors":106}],119:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":103}],120:[function(require,module,exports){
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
},{"base64-js":100,"buffer":120,"ieee754":189}],121:[function(require,module,exports){
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

},{"./":122,"get-intrinsic":185}],122:[function(require,module,exports){
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

},{"function-bind":184,"get-intrinsic":185}],123:[function(require,module,exports){
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

},{"./lib/is_arguments.js":124,"./lib/keys.js":125}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],126:[function(require,module,exports){
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

},{"object-keys":193}],127:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],128:[function(require,module,exports){
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

},{"./ToNumber":158,"./ToPrimitive":160,"./Type":165}],129:[function(require,module,exports){
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

},{"../helpers/isFinite":174,"../helpers/isNaN":175,"../helpers/isPrefixOf":176,"./ToNumber":158,"./ToPrimitive":160,"./Type":165,"get-intrinsic":185}],130:[function(require,module,exports){
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

},{"get-intrinsic":185}],131:[function(require,module,exports){
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

},{"./DayWithinYear":134,"./InLeapYear":138,"./MonthFromTime":148,"get-intrinsic":185}],132:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":180,"./floor":169}],133:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":169}],134:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":132,"./DayFromYear":133,"./YearFromTime":167}],135:[function(require,module,exports){
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

},{"./modulo":170}],136:[function(require,module,exports){
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

},{"../helpers/assertRecord":173,"./IsAccessorDescriptor":139,"./IsDataDescriptor":141,"./Type":165,"get-intrinsic":185}],137:[function(require,module,exports){
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

},{"../helpers/timeConstants":180,"./floor":169,"./modulo":170}],138:[function(require,module,exports){
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

},{"./DaysInYear":135,"./YearFromTime":167,"get-intrinsic":185}],139:[function(require,module,exports){
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

},{"../helpers/assertRecord":173,"./Type":165,"has":188}],140:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":191}],141:[function(require,module,exports){
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

},{"../helpers/assertRecord":173,"./Type":165,"has":188}],142:[function(require,module,exports){
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

},{"../helpers/assertRecord":173,"./IsAccessorDescriptor":139,"./IsDataDescriptor":141,"./Type":165}],143:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":177,"./IsAccessorDescriptor":139,"./IsDataDescriptor":141,"./Type":165}],144:[function(require,module,exports){
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

},{"../helpers/isFinite":174,"../helpers/timeConstants":180}],145:[function(require,module,exports){
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

},{"../helpers/isFinite":174,"./DateFromTime":131,"./Day":132,"./MonthFromTime":148,"./ToInteger":157,"./YearFromTime":167,"./floor":169,"./modulo":170,"get-intrinsic":185}],146:[function(require,module,exports){
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

},{"../helpers/isFinite":174,"../helpers/timeConstants":180,"./ToInteger":157}],147:[function(require,module,exports){
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

},{"../helpers/timeConstants":180,"./floor":169,"./modulo":170}],148:[function(require,module,exports){
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

},{"./DayWithinYear":134,"./InLeapYear":138}],149:[function(require,module,exports){
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

},{"../helpers/isNaN":175}],150:[function(require,module,exports){
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

},{"../helpers/timeConstants":180,"./floor":169,"./modulo":170}],151:[function(require,module,exports){
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

},{"./Type":165}],152:[function(require,module,exports){
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


},{"../helpers/isFinite":174,"./ToNumber":158,"./abs":168,"get-intrinsic":185}],153:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":180,"./DayFromYear":133}],154:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":180,"./modulo":170}],155:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],156:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":158}],157:[function(require,module,exports){
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

},{"../helpers/isFinite":174,"../helpers/isNaN":175,"../helpers/sign":179,"./ToNumber":158,"./abs":168,"./floor":169}],158:[function(require,module,exports){
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

},{"./ToPrimitive":160}],159:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":130,"get-intrinsic":185}],160:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":181}],161:[function(require,module,exports){
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

},{"./IsCallable":140,"./ToBoolean":155,"./Type":165,"get-intrinsic":185,"has":188}],162:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":185}],163:[function(require,module,exports){
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

},{"../helpers/isFinite":174,"../helpers/isNaN":175,"../helpers/sign":179,"./ToNumber":158,"./abs":168,"./floor":169,"./modulo":170}],164:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":158}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":132,"./modulo":170}],167:[function(require,module,exports){
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

},{"call-bind/callBound":121,"get-intrinsic":185}],168:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":185}],169:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],170:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":178}],171:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":180,"./modulo":170}],172:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":128,"./5/AbstractRelationalComparison":129,"./5/CheckObjectCoercible":130,"./5/DateFromTime":131,"./5/Day":132,"./5/DayFromYear":133,"./5/DayWithinYear":134,"./5/DaysInYear":135,"./5/FromPropertyDescriptor":136,"./5/HourFromTime":137,"./5/InLeapYear":138,"./5/IsAccessorDescriptor":139,"./5/IsCallable":140,"./5/IsDataDescriptor":141,"./5/IsGenericDescriptor":142,"./5/IsPropertyDescriptor":143,"./5/MakeDate":144,"./5/MakeDay":145,"./5/MakeTime":146,"./5/MinFromTime":147,"./5/MonthFromTime":148,"./5/SameValue":149,"./5/SecFromTime":150,"./5/StrictEqualityComparison":151,"./5/TimeClip":152,"./5/TimeFromYear":153,"./5/TimeWithinDay":154,"./5/ToBoolean":155,"./5/ToInt32":156,"./5/ToInteger":157,"./5/ToNumber":158,"./5/ToObject":159,"./5/ToPrimitive":160,"./5/ToPropertyDescriptor":161,"./5/ToString":162,"./5/ToUint16":163,"./5/ToUint32":164,"./5/Type":165,"./5/WeekDay":166,"./5/YearFromTime":167,"./5/abs":168,"./5/floor":169,"./5/modulo":170,"./5/msFromTime":171}],173:[function(require,module,exports){
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

},{"get-intrinsic":185,"has":188}],174:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],175:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],176:[function(require,module,exports){
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

},{"call-bind/callBound":121}],177:[function(require,module,exports){
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

},{"get-intrinsic":185,"has":188}],178:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],179:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{"./helpers/isPrimitive":182,"is-callable":191}],182:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":183}],185:[function(require,module,exports){
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

},{"function-bind":184,"has":188,"has-symbols":186}],186:[function(require,module,exports){
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

},{"./shams":187}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":184}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{"./isArguments":194}],193:[function(require,module,exports){
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

},{"./implementation":192,"./isArguments":194}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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
},{"_process":195,"through":209,"timers":210}],197:[function(require,module,exports){
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

},{"buffer":120}],198:[function(require,module,exports){
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

},{"es-abstract/es5":172,"function-bind":184}],199:[function(require,module,exports){
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

},{"./implementation":198,"./polyfill":200,"./shim":201,"define-properties":126,"function-bind":184}],200:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":198}],201:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":200,"define-properties":126}],202:[function(require,module,exports){
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
},{"safe-buffer":197}],203:[function(require,module,exports){
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
},{"./lib/default_stream":204,"./lib/results":206,"./lib/test":207,"_process":195,"defined":127,"through":209,"timers":210}],204:[function(require,module,exports){
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
},{"_process":195,"fs":102,"through":209}],205:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":195,"timers":210}],206:[function(require,module,exports){
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
},{"_process":195,"events":103,"function-bind":184,"has":188,"inherits":190,"object-inspect":208,"resumer":196,"through":209,"timers":210}],207:[function(require,module,exports){
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
},{"./next_tick":205,"deep-equal":123,"defined":127,"events":103,"has":188,"inherits":190,"path":104,"string.prototype.trim":199}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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
},{"_process":195,"stream":105}],210:[function(require,module,exports){
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
},{"process/browser.js":195,"timers":210}],211:[function(require,module,exports){
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
