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

},{"@stdlib/utils/native-class":96}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":96}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":96}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":96}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":79}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":83,"@stdlib/number/float64/base/get-high-word":87,"@stdlib/number/float64/base/to-words":92}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":65,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/trunc":77}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":67,"@stdlib/math/base/special/ldexp":75}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the standard logistic function.
*
* @module @stdlib/math/base/special/expit
*
* @example
* var expit = require( '@stdlib/math/base/special/expit' );
*
* var y = expit( 0.0 );
* // returns 0.5
*
* y = expit( 1.0 );
* // returns ~0.731
*
* y = expit( -1.0 );
* // returns ~0.269
*
* y = expit( Infinity );
* // returns 1.0
*
* y = expit( NaN );
* // returns NaN
*/

// MODULES //

var expit = require( './main.js' );


// EXPORTS //

module.exports = expit;

},{"./main.js":69}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Evaluates the standard logistic function.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = expit( 0.0 );
* // returns 0.5
*
* @example
* var y = expit( 1.0 );
* // returns ~0.731
*
* @example
* var y = expit( -1.0 );
* // returns ~0.269
*
* @example
* var y = expit( Infinity );
* // returns 1.0
*
* @example
* var y = expit( NaN );
* // returns NaN
*/
function expit( x ) {
	if ( isnan( x ) ) {
		return x;
	}
	return 1.0 / ( 1.0 + exp( -x ) );
}


// EXPORTS //

module.exports = expit;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":66}],70:[function(require,module,exports){
module.exports={"x": [-0.0001, -0.00010041540866611251, -0.00010083254297582394, -0.00010125141009760714, -0.00010167201722971383, -0.00010209437160029746, -0.0001025184804675382, -0.00010294435111976733, -0.00010337199087559213, -0.00010380140708402249, -0.00010423260712459624, -0.00010466559840750683, -0.00010510038837373024, -0.00010553698449515262, -0.0001059753942746993, -0.00010641562524646341, -0.00010685768497583504, -0.00010730158105963198, -0.00010774732112622943, -0.00010819491283569187, -0.00010864436387990433, -0.00010909568198270426, -0.00010954887490001507, -0.00011000395041997849, -0.00011046091636308919, -0.00011091978058232888, -0.00011138055096330086, -0.00011184323542436638, -0.00011230784191677982, -0.00011277437842482606, -0.00011324285296595743, -0.00011371327359093107, -0.00011418564838394814, -0.00011465998546279183, -0.0001151362929789676, -0.00011561457911784304, -0.00011609485209878807, -0.00011657712017531694, -0.00011706139163522974, -0.00011754767480075438, -0.00011803597802869059, -0.00011852630971055243, -0.00011901867827271343, -0.00011951309217655097, -0.0001200095599185914, -0.00012050809003065684, -0.00012100869108001086, -0.00012151137166950654, -0.00012201614043773398, -0.00012252300605916834, -0.00012303197724431982, -0.0001235430627398823, -0.0001240562713288846, -0.00012457161183084095, -0.0001250890931019023, -0.00012560872403500928, -0.00012613051356004406, -0.0001266544706439847, -0.00012718060429105888, -0.0001277089235428982, -0.00012823943747869454, -0.00012877215521535495, -0.0001293070859076594, -0.0001298442387484175, -0.00013038362296862626, -0.0001309252478376295, -0.00013146912266327632, -0.00013201525679208166, -0.0001325636596093868, -0.00013311434053952007, -0.00013366730904595977, -0.00013422257463149623, -0.00013478014683839478, -0.00013534003524856079, -0.00013590224948370304, -0.0001364667992055002, -0.00013703369411576633, -0.00013760294395661734, -0.0001381745585106392, -0.0001387485476010551, -0.00013932492109189514, -0.00013990368888816543, -0.00014048486093601797, -0.00014106844722292243, -0.0001416544577778368, -0.00014224290267138065, -0.0001428337920160077, -0.0001434271359661793, -0.0001440229447185398, -0.0001446212285120912, -0.0001452219976283688, -0.00014582526239161888, -0.00014643103316897498, -0.00014703932037063701, -0.0001476501344500497, -0.000148263485904082, -0.00014887938527320823, -0.00014949784314168815, -0.00015011887013775002, -0.00015074247693377257, -0.00015136867424646812, -0.00015199747283706772, -0.00015262888351150493, -0.00015326291712060248, -0.00015389958456025847, -0.00015453889677163293, -0.00015518086474133712, -0.00015582549950162098, -0.0001564728121305638, -0.0001571228137522643, -0.00015777551553703103, -0.0001584309287015757, -0.0001590890645092046, -0.00015974993427001315, -0.00016041354934108, -0.0001610799211266615, -0.00016174906107838902, -0.00016242098069546427, -0.00016309569152485817, -0.00016377320516150872, -0.00016445353324851986, -0.00016513668747736242, -0.0001658226795880747, -0.00016651152136946354, -0.00016720322465930827, -0.0001678978013445626, -0.00016859526336156027, -0.0001692956226962196, -0.00016999889138424884, -0.00017070508151135436, -0.00017141420521344695, -0.0001721262746768515, -0.00017284130213851597, -0.00017355929988622108, -0.0001742802802587928, -0.00017500425564631302, -0.00017573123849033348, -0.00017646124128408935, -0.00017719427657271318, -0.0001779303569534516, -0.00017866949507588137, -0.00017941170364212605, -0.0001801569954070757, -0.00018090538317860463, -0.0001816568798177926, -0.0001824114982391455, -0.00018316925141081657, -0.0001839301523548307, -0.0001846942141473066, -0.00018546144991868292, -0.00018623187285394326, -0.00018700549619284217, -0.00018778233323013413, -0.00018856239731580038, -0.00018934570185527973, -0.0001901322603096983, -0.00019092208619610041, -0.000191715193087682, -0.00019251159461402257, -0.0001933113044613206, -0.00019411433637262827, -0.00019492070414808696, -0.00019573042164516586, -0.00019654350277889844, -0.00019735996152212308, -0.0001981798119057225, -0.00019900306801886434, -0.00019982974400924468, -0.00020065985408332954, -0.0002014934125066004, -0.00020233043360379886, -0.00020317093175917206, -0.0002040149214167214, -0.0002048624170804491, -0.00020571343331460886, -0.00020656798474395554, -0.0002074260860539959, -0.0002082877519912422, -0.00020915299736346497, -0.0002100218370399469, -0.00021089428595173973, -0.00021177035909191935, -0.00021265007151584478, -0.00021353343834141627, -0.00021442047474933454, -0.00021531119598336288, -0.00021620561735058848, -0.00021710375422168487, -0.00021800562203117758, -0.0002189112362777076, -0.00021982061252429923, -0.000220733766398627, -0.00022165071359328344, -0.0002225714698660504, -0.00022349605104016797, -0.0002244244730046081, -0.0002253567517143468, -0.00022629290319063785, -0.0002272329435212896, -0.00022817688886093957, -0.00022912475543133382, -0.00023007655952160492, -0.00023103231748855118, -0.00023199204575691945, -0.00023295576081968538, -0.0002339234792383387, -0.0002348952176431669, -0.00023587099273354048, -0.00023685082127820146, -0.00023783472011554976, -0.00023882270615393418, -0.0002398147963719423, -0.00024081100781869142, -0.0002418113576141234, -0.00024281586294929678, -0.00024382454108668405, -0.0002448374093604674, -0.0002458544851768362, -0.0002468757860142873, -0.0002479013294239241, -0.00024893113302975917, -0.0002499652145290171, -0.00025100359169243736, -0.00025204628236458144, -0.0002530933044641386, -0.00025414467598423315, -0.00025520041499273546, -0.0002562605396325704, -0.0002573250681220308, -0.0002583940187550899, -0.00025946740990171493, -0.00026054526000818457, -0.00026162758759740396, -0.00026271441126922467, -0.0002638057497007638, -0.00026490162164672385, -0.0002660020459397169, -0.0002671070414905874, -0.000268216627288736, -0.00026933082240244836, -0.0002704496459792203, -0.00027157311724608854, -0.000272701255509961, -0.000273834080157947, -0.00027497161065769286, -0.00027611386655771407, -0.00027726086748773316, -0.00027841263315901623, -0.0002795691833647108, -0.0002807305379801881, -0.00028189671696338207, -0.0002830677403551346, -0.000284243628279539, -0.0002854244009442848, -0.0002866100786410074, -0.00028780068174563407, -0.0002889962307187363, -0.00029019674610588074, -0.0002914022485379811, -0.0002926127587316549, -0.0002938282974895771, -0.00029504888570083967, -0.0002962745443413096, -0.0002975052944739888, -0.00029874115724937763, -0.00029998215390583633, -0.0003012283057699522, -0.00030247963425690473, -0.00030373616087083334, -0.0003049979072052086, -0.0003062648949432008, -0.0003075371458580552, -0.000308814681813465, -0.0003100975247639459, -0.0003113856967552157, -0.00031267921992457205, -0.0003139781165012717, -0.00031528240880691514, -0.00031659211925582736, -0.00031790727035544564, -0.0003192278847067039, -0.00032055398500442325, -0.0003218855940377006, -0.0003232227346903013, -0.00032456542994105066, -0.00032591370286423144, -0.00032726757662997766, -0.00032862707450467495, -0.00032999221985135975, -0.00033136303613011934, -0.00033273954689849776, -0.00033412177581189763, -0.00033550974662398925, -0.0003369034831871178, -0.000338303009452712, -0.00033970834947169836, -0.00034111952739491157, -0.0003425365674735121, -0.00034395949405940175, -0.00034538833160564124, -0.00034682310466687283, -0.0003482638378997395, -0.00034971055606331105, -0.0003511632840195087, -0.000352622046733531, -0.0003540868692742858, -0.00035555777681481766, -0.0003570347946327434, -0.00035851794811068516, -0.00036000726273670573, -0.0003615027641047488, -0.0003630044779150762, -0.0003645124299747119, -0.00036602664619788457, -0.00036754715260647154, -0.000369073975330449, -0.00037060714060833765, -0.0003721466747876564, -0.0003736926043253743, -0.00037524495578836344, -0.00037680375585385877, -0.00037836903130991314, -0.0003799408090558605, -0.0003815191161027769, -0.0003831039795739437, -0.00038469542670531616, -0.00038629348484598856, -0.00038789818145866685, -0.000389509544120139, -0.00039112760052174974, -0.00039275237846987546, -0.00039438390588640234, -0.00039602221080920744, -0.00039766732139263927, -0.0003993192659080022, -0.0004009780727440409, -0.000402643770407431, -0.00040431638752326564, -0.00040599595283555035, -0.0004076824952076957, -0.0004093760436230122, -0.0004110766271852111, -0.00041278427511890153, -0.00041449901677009516, -0.00041622088160670975, -0.0004179498992190739, -0.00041968609932043887, -0.00042142951174748555, -0.0004231801664608403, -0.00042493809354558835, -0.00042670332321179, -0.00042847588579500234, -0.00043025581175679714, -0.00043204313168528763, -0.00043383787629565265, -0.0004356400764306633, -0.00043744976306121585, -0.0004392669672868608, -0.00044109172033634006, -0.0004429240535681224, -0.0004447639984709412, -0.0004466115866643385, -0.00044846684989920474, -0.00045032982005832785, -0.0004522005291569395, -0.00045407900934326404, -0.00045596529289907426, -0.00045785941224024234, -0.0004597613999173001, -0.0004616712886159973, -0.00046358911115786144, -0.00046551490050076563, -0.00046744868973949086, -0.0004693905121062981, -0.000471340400971498, -0.0004732983898440231, -0.0004752645123720067, -0.00047723880234335734, -0.0004792212936863432, -0.00048121202047017277, -0.0004832110169055815, -0.00048521831734541816, -0.00048723395628523633, -0.0004892579683638881, -0.0004912903883641177, -0.0004933312512131606, -0.0004953805919833413, -0.0004974384458926801, -0.0004995048483054937, -0.0005015798347330068, -0.0005036634408339611, -0.0005057557024152259, -0.0005078566554324174, -0.0005099663359905129, -0.0005120847803444739, -0.0005142120248998686, -0.0005163481062134953, -0.0005184930609940145, -0.0005206469261025756, -0.0005228097385534542, -0.000524981535514686, -0.0005271623543087045, -0.0005293522324129862, -0.0005315512074606897, -0.0005337593172413072, -0.000535976599701311, -0.0005382030929448055, -0.0005404388352341843, -0.0005426838649907847, -0.0005449382207955507, -0.0005472019413896953, -0.000549475065675364, -0.0005517576327163075, -0.0005540496817385482, -0.000556351252131059, -0.0005586623834464375, -0.0005609831154015847, -0.0005633134878783914, -0.0005656535409244189, -0.0005680033147535912, -0.0005703628497468845, -0.0005727321864530194, -0.0005751113655891615, -0.0005775004280416169, -0.0005798994148665386, -0.0005823083672906305, -0.0005847273267118541, -0.0005871563347001438, -0.0005895954329981168, -0.0005920446635217946, -0.0005945040683613208, -0.0005969736897816858, -0.0005994535702234511, -0.0006019437523034802, -0.0006044442788156717, -0.0006069551927316933, -0.0006094765372017212, -0.0006120083555551796, -0.0006145506913014892, -0.0006171035881308099, -0.0006196670899147966, -0.0006222412407073505, -0.0006248260847453749, -0.0006274216664495393, -0.0006300280304250382, -0.0006326452214623618, -0.0006352732845380638, -0.0006379122648155325, -0.0006405622076457715, -0.0006432231585681736, -0.0006458951633113084, -0.0006485782677937059, -0.0006512725181246434, -0.000653977960604943, -0.0006566946417277618, -0.0006594226081793954, -0.0006621619068400785, -0.000664912584784788, -0.0006676746892840574, -0.0006704482678047833, -0.0006732333680110455, -0.0006760300377649252, -0.0006788383251273244, -0.0006816582783587971, -0.0006844899459203729, -0.0006873333764743949, -0.000690188618885354, -0.0006930557222207261, -0.0006959347357518203, -0.0006988257089546206, -0.0007017286915106403, -0.0007046437333077741, -0.0007075708844411534, -0.0007105101952140116, -0.0007134617161385435, -0.0007164254979367781, -0.0007194015915414479, -0.0007223900480968625, -0.000725390918959792, -0.0007284042557003441, -0.0007314301101028557, -0.0007344685341667792, -0.0007375195801075784, -0.0007405833003576226, -0.0007436597475670902, -0.0007467489746048743, -0.0007498510345594893, -0.0007529659807399845, -0.0007560938666768575, -0.0007592347461229792, -0.0007623886730545113, -0.00076555570167184, -0.000768735886400504, -0.0007719292818921285, -0.0007751359430253693, -0.0007783559249068497, -0.000781589282872113, -0.0007848360724865711, -0.0007880963495464574, -0.0007913701700797905, -0.0007946575903473314, -0.0007979586668435551, -0.0008012734562976198, -0.0008046020156743394, -0.0008079444021751674, -0.000811300673239174, -0.0008146708865440387, -0.0008180551000070391, -0.0008214533717860438, -0.0008248657602805172, -0.0008282923241325174, -0.0008317331222277086, -0.0008351882136963715, -0.0008386576579144166, -0.0008421415145044101, -0.0008456398433365926, -0.0008491527045299131, -0.00085268015845306, -0.0008562222657254959, -0.0008597790872185054, -0.0008633506840562341, -0.0008669371176167454, -0.0008705384495330722, -0.0008741547416942742, -0.0008777860562465066, -0.0008814324555940818, -0.0008850940024005479, -0.0008887707595897628, -0.0008924627903469727, -0.0008961701581199045, -0.0008998929266198488, -0.0009036311598227612, -0.0009073849219703578, -0.0009111542775712219, -0.0009149392914019086, -0.0009187400285080605, -0.0009225565542055275, -0.0009263889340814863, -0.0009302372339955691, -0.0009341015200809921, -0.0009379818587456981, -0.000941878316673491, -0.0009457909608251874, -0.0009497198584397649, -0.0009536650770355153, -0.0009576266844112103, -0.0009616047486472604, -0.0009655993381068905, -0.0009696105214373126, -0.000973638367570902, -0.0009776829457263888, -0.0009817443254100404, -0.0009858225764168614, -0.0009899177688317917, -0.0009940299730309067, -0.000998159259682634, -0.0010023056997489602, -0.001006469364486657, -0.001010650325448503, -0.0010148486544845105, -0.0010190644237431665, -0.001023297705672665, -0.00102754857302216, -0.0010318170988430095, -0.001036103356490035, -0.0010404074196227783, -0.001044729362206769, -0.0010490692585147978, -0.0010534271831281906, -0.0010578032109380912, -0.0010621974171467455, -0.0010666098772687963, -0.001071040667132583, -0.001075489862881441, -0.0010799575409750131, -0.00108444377819056, -0.0010889486516242816, -0.0010934722386926443, -0.0010980146171337079, -0.0011025758650084645, -0.001107156060702176, -0.0011117552829257226, -0.0011163736107169598, -0.0011210111234420711, -0.0011256679007969359, -0.0011303440228084944, -0.0011350395698361256, -0.001139754622573031, -0.0011444892620476174, -0.0011492435696248916, -0.0011540176270078554, -0.001158811516238912, -0.0011636253197012782, -0.0011684591201203966, -0.00117331300056536, -0.0011781870444503345, -0.001183081335535996, -0.0011879959579309722, -0.0011929309960932838, -0.0011978865348317989, -0.0012028626593076864, -0.001207859455035882, -0.0012128770078865603, -0.0012179154040866072, -0.0012229747302211036, -0.001228055073234808, -0.001233156520433661, -0.0012382791594862741, -0.0012434230784254452, -0.0012485883656496689, -0.00125377510992465, -0.00125898340038484, -0.0012642133265349568, -0.0012694649782515322, -0.0012747384457844524, -0.0012800338197585103, -0.0012853511911749594, -0.0012906906514130805, -0.0012960522922317546, -0.0013014362057710352, -0.0013068424845537354, -0.0013122712214870128, -0.0013177225098639704, -0.0013231964433652607, -0.0013286931160606927, -0.0013342126224108505, -0.0013397550572687134, -0.0013453205158812883, -0.001350909093891249, -0.0013565208873385752, -0.0013621559926622073, -0.0013678145067016984, -0.0013734965266988814, -0.001379202150299543, -0.0013849314755550973, -0.0013906846009242746, -0.0013964616252748075, -0.001402262647885135, -0.0014080877684461085, -0.001413937087062704, -0.0014198107042557426, -0.0014257087209636156, -0.0014316312385440203, -0.001437578358775706, -0.0014435501838602183, -0.0014495468164236582, -0.0014555683595184417, -0.001461614916625073, -0.0014676865916539268, -0.0014737834889470285, -0.0014799057132798513, -0.0014860533698631115, -0.0014922265643445799, -0.0014984254028109004, -0.0015046499917894082, -0.001510900438249964, -0.0015171768496067865, -0.0015234793337203074, -0.0015298079988990147, -0.0015361629539013236, -0.0015425443079374412, -0.0015489521706712386, -0.0015553866522221465, -0.0015618478631670345, -0.0015683359145421236, -0.0015748509178448865, -0.0015813929850359682, -0.0015879622285411045, -0.0015945587612530576, -0.0016011826965335592, -0.0016078341482152537, -0.0016145132306036576, -0.00162122005847912, -0.0016279547470987967, -0.0016347174121986352, -0.0016415081699953586, -0.0016483271371884659, -0.0016551744309622326, -0.0016620501689877283, -0.0016689544694248408, -0.0016758874509243038, -0.0016828492326297372, -0.0016898399341796907, -0.0016968596757097032, -0.00170390857785437, -0.0017109867617494114, -0.0017180943490337581, -0.0017252314618516355, -0.0017323982228546668, -0.0017395947552039843, -0.0017468211825723402, -0.0017540776291462368, -0.0017613642196280528, -0.0017686810792381929, -0.0017760283337172407, -0.0017834061093281158, -0.0017908145328582466, -0.0017982537316217437, -0.0018057238334615922, -0.0018132249667518507, -0.0018207572603998537, -0.0018283208438484293, -0.001835915847078117, -0.0018435424006094144, -0.0018512006355050046, -0.0018588906833720224, -0.0018666126763643097, -0.0018743667471846817, -0.00188215302908722, -0.0018899716558795476, -0.0018978227619251412, -0.0019057064821456362, -0.001913622952023137, -0.0019215723076025611, -0.0019295546854939604, -0.0019375702228748824, -0.0019456190574927202, -0.0019537013276670835, -0.00196181717229217, -0.001969966730839155, -0.0019781501433585942, -0.0019863675504828227, -0.0019946190934283774, -0.002002904913998416, -0.0020112251545851586, -0.00201957995817234, -0.0020279694683376596, -0.0020363938292552518, -0.002044853185698161, -0.002053347683040829, -0.0020618774672616007, -0.002070442684945227, -0.002079043483285384, -0.002087680010087201, -0.002096352413769802, -0.0021050608433688606, -0.0021138054485391558, -0.002122586379557148, -0.0021314037873235545, -0.002140257823365947, -0.00214914863984136, -0.0021580763895389004, -0.002167041225882375, -0.0021760433029329234, -0.0021850827753916676, -0.0021941597986023767, -0.002203274528554128, -0.0022124271218839937, -0.0022216177358797256, -0.0022308465284824625, -0.0022401136582894487, -0.002249419284556753, -0.00225876356720201, -0.00226814666680716, -0.002277568744621221, -0.0022870299625630474, -0.002296530483224124, -0.0023060704698713553, -0.0023156500864498623, -0.0023252694975858194, -0.0023349288685892617, -0.0023446283654569443, -0.002354368154875187, -0.0023641484042227316, -0.002373969281573636, -0.002383830955700142, -0.002393733596075593, -0.002403677372877338, -0.0024136624569896584, -0.0024236890200067, -0.0024337572342354253, -0.0024438672726985796, -0.002454019309137657, -0.0024642135180158917, -0.002474450074521248, -0.002484729154569437, -0.0024950509348069428, -0.002505415592614052, -0.002515823306107907, -0.0025262742541455607, -0.0025367686163270506, -0.0025473065729984955, -0.0025578883052551848, -0.002568513994944696, -0.0025791838246700116, -0.002589897977792663, -0.0026006566384358864, -0.0026114599914877795, -0.0026223082226044833, -0.0026332015182133663, -0.002644140065516231, -0.002655124052492538, -0.00266615366790263, -0.002677229101290977, -0.0026883505429894285, -0.0026995181841204894, -0.002710732216600609, -0.0027219928331434716, -0.002733300227263314, -0.0027446545932782417, -0.002756056126313575, -0.0027675050223052063, -0.002779001478002961, -0.002790545690973983, -0.002802137859606118, -0.0028137781831113445, -0.0028254668615291722, -0.0028372040957301017, -0.0028489900874190664, -0.0028608250391388918, -0.0028727091542737945, -0.002884642637052855, -0.002896625692553549, -0.002908658526705261, -0.0029207413462928153, -0.0029328743589600503, -0.002945057773213362, -0.0029572917984253106, -0.002969576644838204, -0.002981912523567718, -0.0029942996466065155, -0.0030067382268278956, -0.0030192284779894563, -0.0030317706147367615, -0.0030443648526070335, -0.00305701140803285, -0.003069710498345866, -0.0030824623417805607, -0.0030952671574779717, -0.003108125165489473, -0.003121036586780543, -0.003134001643234572, -0.003147020557656677, -0.003160093553777525, -0.003173220856257183, -0.0031864026906889683, -0.0031996392836033324, -0.003212930862471761, -0.003226277655710672, -0.0032396798926853493, -0.003253137803713872, -0.003266651620071082, -0.0032802215739925616, -0.0032938478986786193, -0.0033075308282982984, -0.003321270597993396, -0.0033350674438825073, -0.0033489216030650926, -0.0033628333136255387, -0.0033768028146372612, -0.0033908303461667993, -0.003404916149277949, -0.003419060466035914, -0.0034332635395114544, -0.0034475256137850695, -0.0034618469339511813, -0.0034762277461223685, -0.0034906682974335684, -0.0035051688360463497, -0.0035197296111531646, -0.003534350872981623, -0.0035490328727988156, -0.003563775862915604, -0.0035785800966909812, -0.003593445828536417, -0.0036083733139202156, -0.003623362809371935, -0.003638414572486764, -0.0036535288619299745, -0.0036687059374413537, -0.003683946059839673, -0.003699249491027161, -0.003714616493994011, -0.003730047332822907, -0.003745542272693552, -0.0037611015798872326, -0.0037767255217913825, -0.003792414366904187, -0.003808168384839203, -0.003823987846329982, -0.00383987302323473, -0.0038558241885409674, -0.003871841616370229, -0.003887925581982782, -0.0039040763617823435, -0.003920294233320841, -0.003936579475303169, -0.003952932367591986, -0.003969353191212529, -0.00398584222835744, -0.004002399762391613, -0.004019026077857058, -0.004035721460477798, -0.0040524861971647855, -0.004069320576020821, -0.0040862248863455155, -0.004103199418640245, -0.004120244464613155, -0.004137360317184179, -0.004154547270490062, -0.0041718056198894226, -0.004189135661967817, -0.0042065376945428406, -0.0042240120166692615, -0.004241558928644139, -0.004259178732012, -0.00427687172957, -0.004294638225373154, -0.004312478524739535, -0.004330392934255543, -0.0043483817617811695, -0.004366445316455264, -0.004384583908700888, -0.004402797850230606, -0.004421087454051879, -0.004439453034472429, -0.004457894907105622, -0.004476413388875932, -0.004495008798024343, -0.004513681454113856, -0.004532431678034958, -0.004551259792011149, -0.004570166119604462, -0.004589150985721037, -0.00460821471661671, -0.004627357639902608, -0.004646580084550787, -0.004665882380899875, -0.00468526486066075, -0.0047047278569222585, -0.004724271704156923, -0.004743896738226697, -0.004763603296388724, -0.004783391717301144, -0.004803262341028922, -0.004823215509049674, -0.004843251564259555, -0.004863370850979124, -0.004883573714959281, -0.004903860503387214, -0.004924231564892354, -0.00494468724955237, -0.0049652279088991755, -0.004985853895924979, -0.005006565565088361, -0.0050273632723203425, -0.005048247375030524, -0.005069218232113203, -0.005090276203953557, -0.005111421652433843, -0.005132654940939604, -0.005153976434365925, -0.005175386499123683, -0.00519688550314586, -0.005218473815893873, -0.005240151808363908, -0.005261919853093309, -0.005283778324166953, -0.005305727597223722, -0.005327768049462913, -0.005349900059650756, -0.005372124008126909, -0.005394440276810979, -0.005416849249209121, -0.005439351310420586, -0.005461946847144378, -0.005484636247685881, -0.0055074199019635155, -0.0055302982015154835, -0.005553271539506443, -0.005576340310734312, -0.005599504911637028, -0.00562276574029937, -0.0056461231964597845, -0.005669577681517267, -0.005693129598538271, -0.005716779352263616, -0.005740527349115455, -0.005764373997204246, -0.005788319706335769, -0.0058123648880181854, -0.005836509955469094, -0.005860755323622638, -0.005885101409136623, -0.005909548630399686, -0.0059340974075385, -0.005958748162424973, -0.005983501318683512, -0.006008357301698286, -0.006033316538620544, -0.006058379458375974, -0.006083546491672048, -0.006108818071005444, -0.006134194630669454, -0.006159676606761463, -0.006185264437190456, -0.00621095856168452, -0.0062367594217984205, -0.006262667460921166, -0.006288683124283641, -0.006314806858966271, -0.006341039113906684, -0.006367380339907443, -0.006393830989643769, -0.006420391517671337, -0.0064470623804340965, -0.006473844036272099, -0.0065007369454293884, -0.00652774157006188, -0.006554858374245353, -0.00658208782398337, -0.006609430387215333, -0.006636886533824506, -0.0066644567356460675, -0.006692141466475268, -0.006719941202075514, -0.006747856420186602, -0.006775887600532894, -0.00680403522483155, -0.006832299776800855, -0.006860681742168472, -0.006889181608679839, -0.006917799866106525, -0.006946537006254657, -0.00697539352297336, -0.0070043699121632415, -0.007033466671784945, -0.0070626843018676755, -0.007092023304517809, -0.007121484183927502, -0.007151067446383369, -0.007180773600275196, -0.007210603156104659, -0.007240556626494107, -0.007270634526195355, -0.007300837372098539, -0.007331165683241017, -0.007361619980816267, -0.007392200788182856, -0.007422908630873412, -0.007453744036603674, -0.00748470753528157, -0.007515799659016306, -0.0075470209421275225, -0.007578371921154454, -0.007609853134865167, -0.007641465124265832, -0.007673208432609997, -0.007705083605407943, -0.00773709119043603, -0.0077692317377461295, -0.00780150579967509, -0.007833913930854211, -0.007866456688218783, -0.00789913463101764, -0.007931948320822781, -0.007964898321539045, -0.007997985199413768, -0.008031209523046538, -0.008064571863398927, -0.008098072793804366, -0.008131712889977927, -0.008165492730026284, -0.008199412894457608, -0.008233473966191533, -0.008267676530569219, -0.008302021175363354, -0.008336508490788309, -0.008371139069510257, -0.008405913506657333, -0.008440832399829918, -0.008475896349110845, -0.008511105957075766, -0.008546461828803477, -0.008581964571886333, -0.008617614796440663, -0.008653413115117272, -0.008689360143111986, -0.0087254564981762, -0.00876170280062751, -0.008798099673360349, -0.008834647741856704, -0.00887134763419689, -0.00890819998107031, -0.00894520541578632, -0.00898236457428507, -0.009019678095148472, -0.00905714661961117, -0.009094770791571552, -0.009132551257602818, -0.009170488666964077, -0.009208583671611512, -0.009246836926209609, -0.009285249088142374, -0.00932382081752466, -0.00936255277721347, -0.009401445632819373, -0.009440500052717961, -0.009479716708061308, -0.00951909627278952, -0.00955863942364229, -0.009598346840170548, -0.009638219204748152, -0.009678257202583597, -0.009718461521731798, -0.009758832853105892, -0.009799371890489128, -0.009840079330546814, -0.009880955872838252, -0.009922002219828785, -0.00996321907690183, -0.010004607152371066, -0.010046167157492526, -0.0100878998064769, -0.010129805816501762, -0.01017188590772388, -0.010214140803291654, -0.010256571229357461, -0.010299177915090215, -0.010341961592687856, -0.010384922997389908, -0.01042806286749019, -0.010471381944349404, -0.010514880972407973, -0.010558560699198782, -0.010602421875360002, -0.010646465254648057, -0.010690691593950533, -0.010735101653299167, -0.01077969619588297, -0.010824475988061268, -0.010869441799376944, -0.010914594402569621, -0.010959934573588927, -0.011005463091607888, -0.011051180739036241, -0.011097088301533956, -0.011143186568024696, -0.011189476330709356, -0.011235958385079743, -0.01128263352993216, -0.011329502567381213, -0.011376566302873566, -0.01142382554520174, -0.011471281106518095, -0.011518933802348698, -0.011566784451607418, -0.011614833876609961, -0.01166308290308797, -0.011711532360203298, -0.011760183080562153, -0.011809035900229506, -0.01185809165874341, -0.011907351199129394, -0.01195681536791503, -0.012006485015144433, -0.012056360994392844, -0.012106444162781373, -0.01215673538099164, -0.012207235513280644, -0.012257945427495589, -0.012308865995088748, -0.012359998091132536, -0.012411342594334442, -0.01246290038705222, -0.012514672355309018, -0.012566659388808559, -0.012618862380950524, -0.012671282228845804, -0.012723919833332004, -0.012776776098988888, -0.012829851934153879, -0.012883148250937771, -0.01293666596524029, -0.012990405996765927, -0.013044369269039704, -0.013098556709423012, -0.013152969249129618, -0.01320760782324163, -0.01326247337072553, -0.013317566834448402, -0.013372889161194026, -0.013428441301679247, -0.013484224210570269, -0.013540238846499018, -0.013596486172079723, -0.013652967153925331, -0.013709682762664231, -0.013766633972956887, -0.01382382176351254, -0.013881247117106131, -0.013938911020595085, -0.013996814464936348, -0.014054958445203398, -0.014113343960603285, -0.014171972014493913, -0.01423084361440116, -0.014289959772036303, -0.014349321503313348, -0.014408929828366458, -0.014468785771567577, -0.014528890361543922, -0.014589244631195762, -0.014649849617714119, -0.014710706362598554, -0.014771815911675153, -0.014833179315114454, -0.014894797627449448, -0.014956671907593809, -0.015018803218859969, -0.015081192628977499, -0.015143841210111409, -0.015206750038880529, -0.015269920196376123, -0.015333352768180333, -0.015397048844384958, -0.015461009519610125, -0.015525235893023067, -0.01558972906835711, -0.015654490153930528, -0.015719520262665685, -0.015784820512108128, -0.015850392024445728, -0.015916235926528098, -0.01598235334988581, -0.01604874543074996, -0.016115413310071647, -0.016182358133541533, -0.01624958105160963, -0.016317083219505008, -0.016384865797255625, -0.016452929949708345, -0.016521276846548853, -0.016589907662321858, -0.016658823576451223, -0.016728025773260196, -0.016797515441991873, -0.016867293776829495, -0.0169373619769171, -0.017007721246380076, -0.0170783727943458, -0.01714931783496453, -0.01722055758743015, -0.017292093276001234, -0.01736392613002202, -0.017436057383943503, -0.017508488277344775, -0.017581220054954157, -0.01765425396667075, -0.01772759126758583, -0.017801233218004385, -0.017875181083466894, -0.01794943613477092, -0.01802399964799309, -0.01809887290451096, -0.018174057191024988, -0.01824955379958075, -0.018325364027591093, -0.01840148917785837, -0.01847793055859697, -0.018554689483455632, -0.018631767271540176, -0.018709165247436085, -0.018786884741231247, -0.01886492708853891, -0.018943293630520507, -0.01902198571390883, -0.019101004691031112, -0.019180351919832212, -0.019260028763898093, -0.019340036592479088, -0.019420376780513577, -0.019501050708651553, -0.019582059763278287, -0.019663405336538296, -0.019745088826359107, -0.019827111636475415, -0.019909475176453157, -0.019992180861713664, -0.020075230113558107, -0.020158624359191878, -0.02024236503174903, -0.020326453570317066, -0.020410891419961497, -0.020495680031750833, -0.02058082086278144, -0.020666315376202525, -0.020752165041241433, -0.020838371333228724, -0.02092493573362366, -0.021011859730039627, -0.021099144816269618, -0.02118679249231205, -0.02127480426439639, -0.02136318164500917, -0.021451926152919916, -0.021541039313207205, -0.02163052265728499, -0.021720377722928785, -0.0218106060543022, -0.021901209201983456, -0.021992188722991926, -0.022083546180815077, -0.02217528314543514, -0.022267401193356264, -0.02235990190763153, -0.02245278687789009, -0.02254605770036462, -0.022639715977918685, -0.022733763320074218, -0.022828201343039336, -0.022923031669735933, -0.023018255929827734, -0.023113875759748218, -0.023209892802728692, -0.023306308708826676, -0.023403125134954076, -0.02350034374490583, -0.023597966209388425, -0.023695994206048527, -0.023794429419501995, -0.02389327354136263, -0.02399252827027142, -0.02409219531192565, -0.02419227637910814, -0.024292773191716868, -0.02439368747679432, -0.024495020968557324, -0.024596775408426814, -0.02469895254505765, -0.024801554134368835, -0.024904581939573615, -0.025008037731209697, -0.025111923287169855, -0.025216240392732285, -0.02532099084059146, -0.025426176430888858, -0.025531798971243826, -0.025637860276784826, -0.025744362170180408, -0.02585130648167073, -0.02595869504909892, -0.026066529717942596, -0.02617481234134575, -0.026283544780150388, -0.026392728902928694, -0.02650236658601507, -0.026612459713538286, -0.02672301017745405, -0.026834019877577324, -0.026945490721615135, -0.027057424625199295, -0.027169823511919232, -0.02728268931335522, -0.027396023969111477, -0.02750982942684943, -0.02762410764232136, -0.02773886057940381, -0.02785409021013152, -0.027969798514731234, -0.02808598748165564, -0.02820265910761774, -0.028319815397624952, -0.028437458365013754, -0.028555590031484186, -0.028674212427134534, -0.028793327590496392, -0.028912937568569476, -0.029033044416857015, -0.029153650199400964, -0.029274756988817405, -0.02939636686633236, -0.029518481921817333, -0.029641104253825417, -0.02976423596962728, -0.029887879185247292, -0.030012036025500077, -0.030136708624026814, -0.0302618991233321, -0.030387609674820678, -0.030513842438834326, -0.030640599584689163, -0.030767883290712828, -0.03089569574428183, -0.031024039141859364, -0.03115291568903279, -0.03128232760055175, -0.03141227710036618, -0.031542766421664384, -0.03167379780691164, -0.0318053735078885, -0.03193749578572973, -0.032070166910963, -0.03220338916354788, -0.03233716483291523, -0.032471496218006254, -0.032606385627312245, -0.0327418353789142, -0.032877847800522504, -0.03301442522951719, -0.03315157001298784, -0.033289284507774144, -0.03342757108050633, -0.03356643210764567, -0.033705869975525604, -0.03384588708039259, -0.03398648582844719, -0.0341276686358857, -0.034269437928941326, -0.0344117961439262, -0.03455474572727307, -0.034698289135577313, -0.03484242883563931, -0.03498716730450664, -0.03513250702951685, -0.03527845050834008, -0.03542500024902194, -0.03557215877002679, -0.03571992860028079, -0.03586831227921555, -0.03601731235681175, -0.036166931393642764, -0.03631717196091896, -0.036468036640531595, -0.03661952802509745, -0.036771648718003244, -0.036924401333450284, -0.037077788496499633, -0.03723181284311696, -0.037386477020218065, -0.03754178368571425, -0.03769773550855792, -0.037854335168788646, -0.038011585357579106, -0.03816948877728125, -0.038328048141472955, -0.03848726617500441, -0.03864714561404517, -0.03880768920613108, -0.03896889971021135, -0.039130779896696305, -0.03929333254750459, -0.03945656045611134, -0.039620466427595986, -0.03978505327869042, -0.03995032383782762, -0.040116280945189965, -0.04028292745275833, -0.040450266224360945, -0.040618300135722527, -0.04078703207451395, -0.04095646494040157, -0.04112660164509733, -0.041297445112408675, -0.041468998278288684, -0.04164126409088674, -0.041814245510599125, -0.041987945510119716, -0.0421623670744914, -0.042337513201157, -0.042513386900011135, -0.04268999119345177, -0.04286732911643204, -0.04304540371651271, -0.04322421805391422, -0.04340377520156955, -0.04358407824517691, -0.043765130283252636, -0.04394693442718474, -0.04412949380128605, -0.04431281154284818, -0.04449689080219532, -0.04468173474273826, -0.04486734654102905, -0.04505372938681521, -0.045240886483094926, -0.04542882104617187, -0.045617536305710416, -0.045807035504791406, -0.045997321899967546, -0.04618839876131968, -0.04638026937251285, -0.0465729370308526, -0.046766405047341884, -0.046960676746737866, -0.047155755467608904, -0.04735164456239222, -0.047548347397451195, -0.04774586735313349, -0.04794420782382904, -0.04814337221802822, -0.048343363958380764, -0.04854418648175419, -0.048745843239293214, -0.04894833769647891, -0.0491516733331881, -0.04935585364375353, -0.04956088213702349, -0.04976676233642249, -0.04997349778001166, -0.05018109202054937, -0.05038954862555268, -0.05059887117735821, -0.05080906327318406, -0.051020128525191506, -0.05123207056054689, -0.051444893021484285, -0.05165859956536789, -0.051873193864754794, -0.05208867960745838, -0.05230506049661134, -0.05252234025072966, -0.052740522603776346, -0.05295961130522546, -0.053179610120126924, -0.05340052282917078, -0.05362235322875254, -0.0538451051310383, -0.054068782364030024, -0.05429338877163178, -0.05451892821371529, -0.05474540456618673, -0.054972821721053076, -0.055201183586488914, -0.055430494086903925, -0.05566075716300991, -0.05589197677188889, -0.05612415688706097, -0.0563573014985524, -0.0565914146129646, -0.05682650025354252, -0.05706256246024419, -0.057299605289809964, -0.057537632815832095, -0.05777664912882506, -0.05801665833629568, -0.05825766456281354, -0.05849967195008229, -0.05874268465701032, -0.05898670685978268, -0.059231742751932666, -0.059477796544413666, -0.059724872465671985, -0.05997297476171903, -0.06022210769620469, -0.060472275550490395, -0.06072348262372257, -0.0609757332329069, -0.061229031712982045, -0.06148338241689455, -0.06173878971567349, -0.06199525799850538, -0.062252791672810046, -0.06251139516431586, -0.06277107291713627, -0.06303182939384593, -0.06329366907555721, -0.06355659646199766, -0.06382061607158701, -0.06408573244151479, -0.06435195012781858, -0.06461927370546194, -0.06488770776841339, -0.06515725692972521, -0.06542792582161248, -0.0656997190955332, -0.06597264142226762, -0.06624669749199906, -0.06652189201439422, -0.06679822971868403, -0.06707571535374525, -0.06735435368818167, -0.06763414951040646, -0.06791510762872424, -0.0681972328714136, -0.06848053008681046, -0.06876500414339086, -0.06905065992985512, -0.0693375023552117, -0.06962553634886122, -0.06991476686068178, -0.0702051988611134, -0.070496837341244, -0.07078968731289484, -0.07108375380870655, -0.071379041882226, -0.07167555660799292, -0.0719733030816269, -0.07227228641991548, -0.07257251176090146, -0.07287398426397178, -0.07317670910994585, -0.07348069150116451, -0.07378593666157983, -0.07409244983684432, -0.07440023629440164, -0.07470930132357685, -0.07501965023566709, -0.07533128836403342, -0.07564422106419183, -0.07595845371390579, -0.07627399171327849, -0.0765908404848454, -0.07690900547366793, -0.0772284921474265, -0.07754930599651493, -0.07787145253413463, -0.07819493729638913, -0.07851976584237957, -0.07884594375430015, -0.07917347663753371, -0.07950237012074868, -0.07983262985599511, -0.08016426151880243, -0.08049727080827672, -0.08083166344719836, -0.081167445182121, -0.08150462178346966, -0.08184319904564041, -0.08218318278709981, -0.0825245788504845, -0.08286739310270236, -0.0832116314350325, -0.08355729976322723, -0.08390440402761337, -0.08425295019319413, -0.08460294424975222, -0.08495439221195202, -0.08530730011944368, -0.08566167403696655, -0.08601752005445316, -0.08637484428713443, -0.08673365287564447, -0.08709395198612584, -0.08745574781033616, -0.0878190465657538, -0.08818385449568533, -0.08855017786937254, -0.08891802298209996, -0.08928739615530361, -0.08965830373667895, -0.0900307521002906, -0.09040474764668156, -0.09078029680298304, -0.09115740602302537, -0.09153608178744839, -0.0919163306038133, -0.09229815900671426, -0.09268157355789045, -0.09306658084633947, -0.09345318748842976, -0.09384140012801508, -0.09423122543654827, -0.09462267011319571, -0.09501574088495307, -0.09541044450676019, -0.09580678776161773, -0.09620477746070362, -0.09660442044348963, -0.09700572357785965, -0.09740869376022733, -0.09781333791565432, -0.09821966299796997, -0.09862767598989003, -0.0990373839031374, -0.09944879377856226, -0.09986191268626277, -0.10027674772570731, -0.10069330602585569, -0.1011115947452823, -0.10153162107229886, -0.10195339222507771, -0.10237691545177646, -0.10280219803066182, -0.10322924727023534, -0.10365807050935871, -0.10408867511737961, -0.10452106849425902, -0.10495525807069755, -0.10539125130826399, -0.10582905569952304, -0.1062686787681639, -0.10671012806913012, -0.10715341118874916, -0.1075985357448624, -0.10804550938695684, -0.10849433979629566, -0.10894503468605103, -0.10939760180143629, -0.10985204891983871, -0.11030838385095398, -0.1107666144369195, -0.1112267485524499, -0.11168879410497207, -0.11215275903476069, -0.11261865131507548, -0.11308647895229734, -0.11355624998606668, -0.11402797248942131, -0.11450165456893475, -0.11497730436485644, -0.11545493005125061, -0.11593453983613765, -0.11641614196163474, -0.11689974470409722, -0.11738535637426156, -0.11787298531738731, -0.11836263991340126, -0.1188543285770412, -0.11934805975800007, -0.11984384194107195, -0.12034168364629746, -0.12084159342910988, -0.12134357988048299, -0.12184765162707767, -0.12235381733139114, -0.12286208569190533, -0.12337246544323609, -0.12388496535628409, -0.12439959423838456, -0.12491636093345962, -0.12543527432216972, -0.125956343322066, -0.12647957688774444, -0.12700498401099858, -0.12753257372097507, -0.12806235508432848, -0.12859433720537655, -0.12912852922625775, -0.12966494032708725, -0.1302035797261156, -0.13074445667988674, -0.1312875804833967, -0.13183296047025417, -0.13238060601284043, -0.13293052652247003, -0.1334827314495535, -0.13403723028375863, -0.13459403255417454, -0.13515314782947502, -0.1357145857180825, -0.13627835586833428, -0.136844467968647, -0.1374129317476843, -0.13798375697452359, -0.1385569534588234, -0.13913253105099296, -0.1397104996423605, -0.14029086916534395, -0.14087364959362147, -0.14145885094230237, -0.14204648326810002, -0.14263655666950376, -0.14322908128695336, -0.14382406730301286, -0.14442152494254507, -0.14502146447288838, -0.14562389620403204, -0.1462288304887943, -0.14683627772299987, -0.14744624834565823, -0.14805875283914388, -0.14867380172937594, -0.1492914055859987, -0.14991157502256428, -0.15053432069671377, -0.15115965331036152, -0.15178758360987854, -0.15241812238627675, -0.15305128047539548, -0.15368706875808644, -0.15432549816040184, -0.1549665796537816, -0.15561032425524157, -0.1562567430275638, -0.15690584707948543, -0.15755764756589086, -0.15821215568800276, -0.15886938269357415, -0.15952933987708287, -0.16019203857992434, -0.16085749019060766, -0.16152570614495068, -0.16219669792627625, -0.16287047706561034, -0.16354705514187984, -0.16422644378211101, -0.16490865466163046, -0.16559369950426445, -0.16628159008254145, -0.1669723382178942, -0.16766595578086202, -0.16836245469129626, -0.16906184691856366, -0.16976414448175325, -0.1704693594498824, -0.1711775039421037, -0.17188859012791446, -0.17260263022736444, -0.17331963651126703, -0.17403962130140974, -0.17476259697076518, -0.1754885759437052, -0.1762175706962128, -0.1769495937560978, -0.1776846577032117, -0.1784227751696632, -0.1791639588400366, -0.17990822145160837, -0.18065557579456726, -0.18140603471223352, -0.1821596111012792, -0.1829163179119508, -0.18367616814829113, -0.1844391748683625, -0.1852053511844723, -0.1859747102633967, -0.18674726532660849, -0.18752302965050355, -0.18830201656662848, -0.18908423946191105, -0.18986971177888878, -0.19065844701594112, -0.1914504587275211, -0.19224576052438735, -0.19304436607383976, -0.19384628909995247, -0.1946515433838112, -0.19546014276374948, -0.196272101135586, -0.19708743245286453, -0.1979061507270924, -0.1987282700279824, -0.19955380448369434, -0.20038276828107682, -0.20121517566591257, -0.20205104094316248, -0.20289037847721092, -0.20373320269211395, -0.20457952807184557, -0.20542936916054808, -0.20628274056278148, -0.20713965694377368, -0.20800013302967404, -0.20886418360780487, -0.20973182352691683, -0.21060306769744366, -0.21147793109175766, -0.21235642874442848, -0.21323857575247987, -0.21412438727565059, -0.21501387853665416, -0.21590706482144006, -0.2168039614794577, -0.21770458392391862, -0.21860894763206276, -0.21951706814542393, -0.22042896107009613, -0.2213446420770033, -0.2222641269021669, -0.22318743134697783, -0.22411457127846732, -0.22504556262957898, -0.2259804213994439, -0.226919163653655, -0.22786180552454233, -0.22880836321145193, -0.2297588529810225, -0.2307132911674664, -0.23167169417284966, -0.23263407846737336, -0.23360046058965805, -0.23457085714702625, -0.23554528481578937, -0.23652376034153383, -0.23750630053940774, -0.2384929222944119, -0.2394836425616879, -0.24047847836681105, -0.24147744680608252, -0.24248056504682222, -0.24348785032766557, -0.24449931995885776, -0.245514991322553, -0.24653488187311254, -0.2475590091374037, -0.24858739071510272, -0.2496200442789965, -0.2506569875752853, -0.2516982384238899, -0.2527438147187553, -0.25379373442816033, -0.25484801559502573, -0.25590667633722325, -0.2569697348478888, -0.2580372093957333, -0.2591091183253581, -0.2601854800575696, -0.26126631308969517, -0.2623516359959027, -0.2634414674275176, -0.26453582611334553, -0.26563473085999295, -0.26673820055219, -0.2678462541531167, -0.26895891070472644, -0.2700761893280757, -0.27119810922365123, -0.2723246896716996, -0.2734559500325598, -0.27459190974699565, -0.27573258833652853, -0.2768780054037751, -0.27802818063278184, -0.2791831337893654, -0.2803428847214512, -0.2815074533594139, -0.2826768597164218, -0.28385112388877853, -0.2850302660562703, -0.2862143064825119, -0.28740326551529405, -0.28859716358693527, -0.2897960212146303, -0.2909998590008051, -0.29220869763346996, -0.2934225578865739, -0.294641460620364, -0.2958654267817415, -0.29709447740462364, -0.29832863361030443, -0.2995679166078167, -0.30081234769429854, -0.3020619482553572, -0.3033167397654382, -0.3045767437881941, -0.3058419819768536, -0.3071124760745957, -0.3083882479149226, -0.30966931942203374, -0.3109557126112048, -0.3122474495891637, -0.31354455255447233, -0.3148470437979077, -0.31615494570284325, -0.3174682807456365, -0.31878707149601226, -0.320111340617453, -0.32144111086758714, -0.3227764050985794, -0.3241172462575257, -0.3254636573868447, -0.3268156616246764, -0.3281732822052786, -0.32953654245942515, -0.3309054658148095, -0.3322800757964442, -0.3336603960270679, -0.33504645022755, -0.33643826221729756, -0.3378358559146665, -0.3392392553373718, -0.3406484846028988, -0.34206356792892056, -0.34348452963371096, -0.3449113941365652, -0.3463441859582183, -0.34778292972126557, -0.34922765015058804, -0.35067837207377467, -0.35213512042155143, -0.35359792022820863, -0.3550667966320302, -0.35654177487572813, -0.3580228803068733, -0.3595101383783337, -0.36100357464871075, -0.3625032147827774, -0.36400908455192194, -0.3655212098345874, -0.3670396166167196, -0.368564330992212, -0.3700953791633532, -0.37163278744128014, -0.3731765822464267, -0.37472679010898086, -0.3762834376693392, -0.3778465516785637, -0.37941615899884373, -0.38099228660395656, -0.38257496157972964, -0.3841642111245088, -0.3857600625496228, -0.387362543279855, -0.38897168085391376, -0.3905875029249044, -0.39221003726080733, -0.39383931174495185, -0.3954753543764982, -0.3971181932709178, -0.3987678566604746, -0.4004243728947138, -0.40208777044094507, -0.40375807788473533, -0.4054353239303983, -0.4071195374014865, -0.40881074724128985, -0.4105089825133295, -0.41221427240186015, -0.4139266462123705, -0.4156461333720856, -0.41737276343047486, -0.4191065660597587, -0.42084757105541754, -0.4225958083367062, -0.4243513079471651, -0.4261141000551394, -0.42788421495429624, -0.4296616830641439, -0.4314465349305576, -0.4332388012263013, -0.43503851275155736, -0.43684570043445475, -0.4386603953315994, -0.4404826286286107, -0.44231243164065415, -0.4441498358129824, -0.4459948727214745, -0.447847574073177, -0.44970797170685206, -0.45157609759352113, -0.4534519838370173, -0.45533566267453585, -0.45722716647718675, -0.4591265277505541, -0.4610337791352514, -0.46294895340748526, -0.4648720834796176, -0.4668032024007297, -0.46874234335719306, -0.47068953967323823, -0.4726448248115259, -0.4746082323737258, -0.4765797961010897, -0.47855954987503496, -0.48054752771772535, -0.48254376379265423, -0.4845482924052349, -0.48656114800338646, -0.48858236517812903, -0.490611978664177, -0.49265002334053404, -0.49469653423109644, -0.49675154650525066, -0.4988150954784814, -0.500887216612977, -0.502967945518237, -0.5050573179516883, -0.5071553698192951, -0.5092621371761794, -0.5113776562272395, -0.5135019633277705, -0.515635094984092, -0.517777087854174, -0.5199279787482651, -0.5220878046295296, -0.5242566026146772, -0.5264344099746057, -0.528621264135039, -0.5308172026771695, -0.533022263338307, -0.5352364840125233, -0.5374599027513073, -0.5396925577642167, -0.5419344874195335, -0.5441857302449272, -0.5464463249281123, -0.548716310317517, -0.5509957254229494, -0.5532846094162659, -0.5555830016320483, -0.5578909415682759, -0.5602084688870073, -0.5625356234150607, -0.5648724451446968, -0.5672189742343101, -0.569575251009114, -0.571941315961838, -0.5743172097534219, -0.5767029732137132, -0.5790986473421715, -0.5815042733085718, -0.5839198924537102, -0.5863455462901184, -0.5887812765027723, -0.5912271249498127, -0.5936831336632626, -0.5961493448497482, -0.5986258008912276, -0.6011125443457153, -0.6036096179480168, -0.6061170646104621, -0.6086349274236407, -0.6111632496571467, -0.6137020747603174, -0.616251446362984, -0.6188114082762202, -0.6213820044930926, -0.6239632791894211, -0.6265552767245338, -0.6291580416420327, -0.6317716186705581, -0.6343960527245549, -0.6370313889050484, -0.6396776725004175, -0.6423349489871711, -0.6450032640307338, -0.6476826634862262, -0.6503731933992563, -0.6530749000067101, -0.6557878297375436, -0.6585120292135852, -0.6612475452503318, -0.663994424857758, -0.6667527152411217, -0.6695224638017738, -0.6723037181379771, -0.6750965260457189, -0.6779009355195373, -0.6807169947533439, -0.68354475214125, -0.6863842562784027, -0.6892355559618152, -0.6920987001912093, -0.6949737381698563, -0.69786071930542, -0.7007596932108106, -0.7036707097050318, -0.7065938188140418, -0.7095290707716114, -0.7124765160201844, -0.7154362052117487, -0.7184081892087055, -0.7213925190847404, -0.7243892461257065, -0.7273984218304999, -0.7304200979119494, -0.7334543262977039, -0.7365011591311217, -0.7395606487721722, -0.7426328477983297, -0.7457178090054821, -0.7488155854088361, -0.7519262302438255, -0.7550497969670322, -0.7581863392570982, -0.7613359110156535, -0.7644985663682399, -0.7676743596652394, -0.7708633454828134, -0.7740655786238338, -0.7772811141188313, -0.7805100072269375, -0.7837523134368336, -0.7870080884677075, -0.7902773882702097, -0.7935602690274117, -0.7968567871557782, -0.800166999306129, -0.8034909623646191, -0.8068287334537134, -0.810180369933166, -0.8135459294010116, -0.8169254696945489, -0.8203190488913404, -0.8237267253102077, -0.8271485575122312, -0.8305846043017624, -0.8340349247274282, -0.837499578083151, -0.840978623909165, -0.8444721219930373, -0.8479801323707016, -0.8515027153274818, -0.8550399313991356, -0.8585918413728909, -0.8621585062884889, -0.8657399874392383, -0.8693363463730623, -0.8729476448935619, -0.8765739450610758, -0.8802153091937438, -0.8838717998685837, -0.8875434799225633, -0.8912304124536782, -0.894932660822042, -0.8986502886509681, -0.9023833598280693, -0.9061319385063533, -0.9098960891053219, -0.9136758763120852, -0.9174713650824651, -0.9212826206421184, -0.9251097084876552, -0.9289526943877611, -0.9328116443843345, -0.9366866247936136, -0.9405777022073232, -0.9444849434938153, -0.9484084157992164, -0.9523481865485878, -0.9563043234470759, -0.9602768944810838, -0.9642659679194353, -0.9682716123145463, -0.9722938965036083, -0.9763328896097683, -0.980388661043314, -0.9844612805028733, -0.9885508179766045, -0.9926573437434054, -0.9967809283741188, -1.0009216427327428, -1.0050795579776501, -1.0092547455628147, -1.0134472772390344, -1.0176572250551668, -1.0218846613593682, -1.0261296588003295, -1.0303922903285367, -1.0346726291975166, -1.0389707489650974, -1.0432867234946746, -1.0476206269564727, -1.0519725338288322, -1.0563425188994806, -1.0607306572668203, -1.065137024341221, -1.0695616958463072, -1.0740047478202728, -1.078466256617178, -1.082946298908265, -1.087444951683277, -1.0919622922517722, -1.096498398244467, -1.1010533476145594, -1.105627218639072, -1.1102200899202, -1.1148320403866505, -1.1194631492950156, -1.1241134962311232, -1.1287831611114076, -1.1334722241842832, -1.1381807660315253, -1.142908867569646, -1.1476566100512988, -1.152424075066665, -1.1572113445448589, -1.1620185007553376, -1.166845626309306, -1.1716928041611496, -1.176560117609852, -1.1814476503004268, -1.1863554862253598, -1.1912837097260411, -1.1962324054942297, -1.201201658573499, -1.2061915543607005, -1.2112021786074345, -1.2162336174215134, -1.221285957268456, -1.2263592849729643, -1.2314536877204176, -1.2365692530583727, -1.2417060688980601, -1.2468642235159075, -1.2520438055550491, -1.2572449040268499, -1.2624676083124378, -1.267712008164231, -1.2729781937074942, -1.2782662554418778, -1.2835762842429752, -1.288908371363888, -1.2942626084367834, -1.2996390874744836, -1.305037900872038, -1.3104591414083135, -1.3159029022475899, -1.3213692769411525, -1.3268583594289143, -1.3323702440410203, -1.337905025499471, -1.3434627989197534, -1.3490436598124638, -1.3546477040849663, -1.3602750280430294, -1.3659257283924846, -1.3715999022408902, -1.3772976470991896, -1.3830190608834034, -1.3887642419163009, -1.394533288929093, -1.4003263010631282, -1.4061433778716002, -1.411984619321246, -1.4178501257940823, -1.423739998089118, -1.4296543374240904, -1.4355932454372065, -1.4415568241888783, -1.4475451761634952, -1.4535584042711722, -1.4595966118495214, -1.4656599026654318, -1.4717483809168403, -1.4778621512345393, -1.4840013186839645, -1.4901659887670016, -1.496356267423804, -1.5025722610346002, -1.5088140764215408, -1.5150818208505212, -1.5213756020330296, -1.5276955281279994, -1.5340417077436563, -1.5404142499394038, -1.5468132642276842, -1.5532388605758638, -1.5596911494081265, -1.5661702416073577, -1.57267624851707, -1.579209281943303, -1.5857694541565486, -1.5923568778936834, -1.5989716663598923, -1.605613933230635, -1.612283792653585, -1.6189813592505955, -1.6257067481196719, -1.632460074836937, -1.6392414554586363, -1.6460510065231204, -1.6528888450528498, -1.6597550885564096, -1.6666498550305164, -1.6735732629620648, -1.6805254313301512, -1.6875064796081214, -1.6945165277656271, -1.7015556962706744, -1.7086241060917138, -1.7157218786997064, -1.7228491360702134, -1.7300060006854936, -1.7371925955366112, -1.744409044125535, -1.751655470467283, -1.758931999092038, -1.7662387550472924, -1.7735758639000003, -1.7809434517387206, -1.7883416451758067, -1.795770571349566, -1.8032303579264504, -1.8107211331032522, -1.8182430256092939, -1.8257961647086611, -1.8333806802024109, -1.840996702430804, -1.848644362275551, -1.856323791162044, -1.8640351210616395, -1.8717784844939105, -1.8795540145289276, -1.8873618447895504, -1.895202109453707, -1.9030749432567249, -1.910980481493629, -1.9189188600214724, -1.926890215261673, -1.934894684202344, -1.9429324044006708, -1.9510035139852595, -1.9591081516585138, -1.967246456699024, -1.9754185689639432, -1.983624628891415, -1.9918647775029723, -2.0001391564059623, -2.0084479077959863, -2.0167911744593265, -2.0251690997754226, -2.0335818277193227, -2.0420295028641577, -2.050512270383634, -2.059030276054508, -2.067583666259119, -2.076172587987886, -2.0847971888418404, -2.0934576170351638, -2.10215402139772, -2.110886551377639, -2.1196553570438654, -2.1284605890887436, -2.1373023988306077, -2.1461809382163852, -2.155096359824191, -2.164048816865976, -2.1730384631901423, -2.1820654532841925, -2.1911299422773864, -2.200232085943393, -2.20937204070299, -2.218549963626737, -2.2277660124376784, -2.2370203455140585, -2.246313121892024, -2.2556445012683857, -2.265014644003345, -2.2744237111232524, -2.283871864323381, -2.2933592659706856, -2.302886079106622, -2.31245246744993, -2.3220585953994495, -2.331704628036954, -2.341390731129966, -2.351117071134635, -2.360883815198579, -2.3706911311637615, -2.3805391875693815, -2.390428153654749, -2.4003581993622243, -2.4103294953401173, -2.4203422129456262, -2.4303965242477865, -2.440492602030409, -2.4506306197950782, -2.4608107517641136, -2.4710331728835704, -2.481298058826249, -2.4916055859946944, -2.50195593152426, -2.512349273286128, -2.522785789890373, -2.533265660689038, -2.5437890657791926, -2.554356186006062, -2.564967202966112, -2.575622299010177, -2.586321657246597, -2.5970654615443443, -2.607853896536214, -2.6186871476219786, -2.629565400971575, -2.640488843528307, -2.651457663012063, -2.6624720479225195, -2.673532187542413, -2.6846382719407713, -2.6957904919761866, -2.7069890393000984, -2.718234106360067, -2.7295258864031124, -2.7408645734790156, -2.752250362443655, -2.763683448962365, -2.7751640295132716, -2.786692301390707, -2.7982684627085743, -2.809892712403759, -2.821565250239554, -2.8332862768090683, -2.84505599353871, -2.8568746026916227, -2.8687423073711713, -2.880659311524433, -2.8926258199456827, -2.904642038279945, -2.916708173026507, -2.928824431542471, -2.940991022046325, -2.9532081536214965, -2.9654760362199815, -2.9777948806659293, -2.99016489865927, -3.0025863027793616, -3.0150593064886144, -3.0275841241361996, -3.040160970961708, -3.0527900630988536, -3.065471617579194, -3.0782058523358375, -3.090992986207223, -3.1038332389408576, -3.1167268311970986, -3.129673984552952, -3.1426749215058534, -3.1557298654775336, -3.168839040817828, -3.1820026728085415, -3.1952209876673265, -3.2084942125515425, -3.2218225755622, -3.235206305747855, -3.24864563310855, -3.2621407885997686, -3.2756920041364097, -3.289299512596747, -3.3029635478264705, -3.3166843446426792, -3.330462138837922, -3.3442971671842576, -3.358189667437296, -3.3721398783403256, -3.386148039628387, -3.4002143920324026, -3.414339177283317, -3.4285226381162266, -3.442765018274591, -3.4570665625143935, -3.4714275166083564, -3.485848127350169, -3.5003286425587024, -3.5148693110823097, -3.5294703828030745, -3.5441321086411133, -3.5588547405588917, -3.5736385315655292, -3.5884837357211885, -3.6033906081414124, -3.618359405001516, -3.633390383540997, -3.648483802067925, -3.663639919963426, -3.678858997686112, -3.69414129677656, -3.7094870798618187, -3.7248966106598886, -3.740370153984301, -3.7559079757486376, -3.7715103429711085, -3.7871775237791483, -3.802909787413992, -3.818707404235351, -3.8345706457260245, -3.8504997844965767, -3.8664950942900274, -3.882556849986523, -3.898685327608112, -3.9148808043234533, -3.9311435584525882, -3.947473869471732, -3.9638720180180447, -3.9803382858945007, -3.9968729560747005, -4.013476312707742, -4.030148641123103, -4.0468902278355525, -4.063701360550041, -4.080582328166699, -4.0975334207857586, -4.114554929712559, -4.131647147462553, -4.148810367766303, -4.166044885574579, -4.183350997063393, -4.200728999639098, -4.218179191943509, -4.235701873858997, -4.253297346513698, -4.270965912286649, -4.288707874812999, -4.306523538989231, -4.324413210978368, -4.342377198215286, -4.3604158094119665, -4.3785293545628035, -4.396718144949947, -4.41498249314861, -4.433322713032499, -4.451739119779171, -4.470232029875454, -4.488801761122904, -4.50744863264322, -4.52617296488379, -4.544975079623158, -4.5638552999765665, -4.582813950401514, -4.601851356703295, -4.6209678460406565, -4.640163746931383, -4.659439389257947, -4.678795104273194, -4.698231224605992, -4.71774808426701, -4.737346018654412, -4.757025364559638, -4.7767864601731995, -4.796629645090448, -4.816555260317475, -4.8365636482769325, -4.856655152813922, -4.876830119201921, -4.897088894148671, -4.917431825802198, -4.9378592637567555, -4.958371559058841, -4.978969064213229, -4.999652133189042, -5.020421121425788, -5.041276385839534, -5.062218284828995, -5.083247178281707, -5.104363427580219, -5.1255673956082655, -5.14685944675706, -5.168239946931519, -5.189709263556561, -5.21126776558343, -5.232915823495991, -5.254653809317166, -5.276482096615281, -5.298401060510496, -5.320411077681265, -5.342512526370763, -5.364705786393454, -5.3869912391415715, -5.409369267591687, -5.431840256311301, -5.454404591465407, -5.477062660823193, -5.499814853764665, -5.522661561287347, -5.54560317601301, -5.568640092194379, -5.59177270572197, -5.6150014141308535, -5.638326616607493, -5.66174871399662, -5.685268108808076, -5.708885205223796, -5.732600409104711, -5.756414127997733, -5.780326771142772, -5.804338749479721, -5.828450475655587, -5.852662364031536, -5.8769748306900285, -5.901388293441978, -5.925903171833886, -5.95051988715512, -5.97523886244511, -6.00006052250063, -6.024985293883094, -6.0500136049259, -6.075145885741749, -6.100382568230098, -6.125724086084543, -6.15117087480028, -6.176723371681601, -6.202382015849364, -6.2281472482486055, -6.254019511656079, -6.279999250687865, -6.306086911807037, -6.33228294333127, -6.3585877954406325, -6.385001920185266, -6.4115257714931655, -6.438159805177999, -6.46490447894688, -6.491760252408322, -6.518727587080074, -6.545806946397071, -6.572998795719413, -6.600303602340302, -6.62772183549416, -6.655253966364635, -6.6829004680927095, -6.710661815784854, -6.7385384865211275, -6.766530959363464, -6.794639715363846, -6.822865237572589, -6.851208011046658, -6.879668522857941, -6.908247262101707, -6.936944719904958, -6.965761389434878, -6.994697765907324, -7.023754346595282, -7.0529316308374925, -7.082230120046982, -7.111650317719688, -7.141192729443127, -7.170857862905032, -7.2006462279021495, -7.230558336348959, -7.260594702286473, -7.290755841891092, -7.321042273483411, -7.351454517537222, -7.381993096688392, -7.412658535743863, -7.443451361690672, -7.4743721037050195, -7.505421293161307, -7.536599463641353, -7.567907150943507, -7.599344893091875, -7.630913230345573, -7.662612705207955, -7.694443862436028, -7.72640724904975, -7.7585034143414475, -7.790732909885273, -7.823096289546616, -7.855594109491719, -7.888226928197172, -7.920995306459523, -7.953899807404938, -7.986940996498805, -8.020119441555554, -8.05343571274835, -8.086890382618906, -8.120484026087341, -8.154217220461991, -8.188090545449429, -8.222104583164365, -8.256259918139664, -8.290557137336407, -8.324996830153912, -8.359579588439964, -8.394306006500916, -8.429176681111922, -8.464192211527214, -8.499353199490319, -8.534660249244514, -8.570113967543135, -8.605714963660027, -8.64146384940003, -8.677361239109418, -8.713407749686567, -8.749604000592484, -8.785950613861472, -8.822448214111835, -8.859097428556545, -8.89589888701412, -8.932853221919384, -8.969961068334348, -9.007223063959145, -9.044639849142916, -9.082212066894922, -9.11994036289552, -9.15782538550728, -9.19586778578613, -9.234068217492553, -9.272427337102759, -9.310945803820069, -9.349624279586177, -9.388463429092537, -9.42746391979181, -9.466626421909256, -9.505951608454364, -9.545440155232345, -9.585092740855764, -9.62491004675622, -9.664892757195979, -9.705041559279852, -9.745357142966922, -9.78584020108242, -9.826491429329659, -9.867311526301899, -9.908301193494475, -9.949461135316781, -9.990792059104383, -10.032294675131205, -10.073969696621642, -10.115817839762958, -10.157839823717488, -10.20003637063504, -10.242408205665306, -10.284956056970259, -10.327680655736778, -10.370582736189133, -10.413663035601632, -10.456922294311298, -10.500361255730517, -10.543980666359943, -10.58778127580123, -10.631763836769947, -10.675929105108526, -10.720277839799175, -10.76481080297704, -10.809528759943223, -10.854432479177952, -10.89952273235381, -10.944800294348912, -10.990265943260345, -11.03592046041746, -11.081764630395318, -11.127799241028194, -11.174025083423029, -11.220442951973153, -11.26705364437186, -11.313857961626127, -11.360856708070383, -11.408050691380355, -11.455440722586857, -11.503027616089865, -11.550812189672417, -11.598795264514697, -11.646977665208162, -11.695360219769626, -11.743943759655625, -11.792729119776613, -11.84171713851134, -11.89090865772127, -11.940304522764968, -11.989905582512758, -12.039712689361224, -12.089726699247878, -12.139948471665898, -12.19037886967879, -12.241018759935384, -12.291869012684614, -12.342930501790505, -12.394204104747214, -12.445690702694007, -12.497391180430556, -12.549306426432045, -12.601437332864458, -12.653784795599941, -12.706349714232092, -12.759132992091574, -12.812135536261543, -12.865358257593254, -12.918802070721744, -12.972467894081445, -13.026356649922123, -13.080469264324623, -13.134806667216811, -13.18936979238958, -13.244159577512793, -13.299176964151552, -13.354422897782277, -13.409898327808978, -13.4656042075796, -13.521541494402298, -13.577711149562044, -13.634114138337049, -13.690751430015373, -13.747623997911608, -13.804732819383496, -13.862078875848892, -13.91966315280252, -13.977486639832934, -14.035550330639518, -14.093855223049607, -14.152402319035506, -14.211192624731888, -14.270227150452966, -14.329506910709888, -14.389032924228198, -14.448806213965225, -14.50882780712784, -14.569098735189991, -14.62962003391046, -14.690392743350685, -14.751417907892527, -14.812696576256386, -14.874229801519107, -14.936018641132106, -14.99806415693958, -15.060367415196623, -15.122929486587735, -15.185751446245105, -15.248834373767112, -15.312179353236916, -15.375787473240953, -15.439659826887839, -15.503797511827022, -15.568201630267689, -15.632873288997722, -15.697813599402606, -15.763023677484714, -15.828504643882352, -15.894257623889061, -15.960283747472978, -16.026584149296127, -16.093159968734117, -16.160012349895588, -16.227142441641906, -16.29455139760694, -16.36224037621676, -16.430210540709723, -16.498463059156364, -16.56699910447947, -16.635819854474295, -16.704926491828648, -16.77432020414343, -16.844002183952902, -16.913973628745225, -16.984235740983053, -17.054789728124074, -17.125636802641967, -17.196778182047098, -17.268215088907468, -17.339948750869738, -17.411980400680353, -17.48431127620659, -17.55694262045804, -17.629875681607825, -17.703111713014085, -17.776651973241563, -17.85049772608307, -17.924650240581435, -17.99911079105117, -18.073880657100386, -18.148961123652853, -18.224353480969896, -18.300059024672823, -18.376079055765018, -18.452414880654352, -18.529067811175665, -18.60603916461315, -18.683330263723242, -18.760942436757173, -18.838877017483842, -18.917135345212785, -18.995718764817035, -19.074628626756443, -19.15386628710077, -19.233433107552987, -19.313330455472755, -19.393559703899736, -19.47412223157744, -19.555019422976756, -19.636252668319788, -19.717823363603777, -19.799732910624947, -19.881982717002813, -19.964574196204232, -20.047508767567727, -20.130787856327913, -20.214412893639825, -20.298385316603767, -20.38270656828985, -20.46737809776281, -20.552401360106973, -20.637777816451084, -20.723508933993667, -20.809596186028077, -20.89604105196786, -20.982845017372203, -21.070009573971326, -21.15753621969234, -21.245426458684832, -21.33368180134677, -21.422303764350435, -21.51129387066854, -21.600653649600222, -21.69038463679761, -21.780488374292005, -21.87096641052044, -21.961820300352347, -22.053051605116067, -22.144661892625983, -22.23665273720927, -22.329025719732982, -22.42178242763129, -22.51492445493256, -22.608453402287036, -22.70237087699415, -22.796678493030186, -22.891377871076084, -22.986470638545097, -23.08195842961102, -23.177842885236114, -23.274125653199327, -23.37080838812468, -23.4678927515095, -23.56538041175326, -23.663273044186063, -23.76157233109748, -23.8602799617655, -23.95939763248538, -24.05892704659908, -24.15886991452434, -24.259227953784126, -24.360002889036185, -24.4611964521025, -24.562810381999338, -24.664846424966946, -24.7673063344996, -24.8701918713758, -24.973504803688304, -25.077246906874848, -25.18141996374844, -25.286025764528038, -25.39106610686938, -25.49654279589567, -25.60245764422891, -25.70881247202082, -25.815609106984212, -25.922849384424406, -26.0305351472706, -26.138668246107827, -26.247250539208558, -26.356283892564694, -26.465770179919623, -26.575711282800484, -26.68610909055028, -26.796965500360663, -26.908282417304342, -27.020061754367852, -27.132305432484504, -27.245015380567164, -27.358193535541727, -27.471841842380197, -27.58596225413417, -27.700556731968426, -27.815627245194435, -27.931175771304527, -28.047204296005646, -28.163714813253534, -28.28070932528706, -28.39818984266239, -28.516158384287895, -28.634616977458595, -28.753567657891082, -28.873012469758546, -28.99295346572567, -29.113392706984264, -29.234332263288444, -29.35577421299027, -29.477720643075514, -29.600173649199288, -29.723135335722414, -29.846607815747355, -29.970593211154583, -30.09509365263911, -30.22011127974685, -30.345648240911764, -30.471706693492532, -30.598288803809684, -30.72539674718291, -30.853032707968158, -30.981198879595585, -31.109897464606977, -31.239130674693673, -31.368900730734627, -31.49920986283433, -31.63006031036151, -31.761454321987365, -31.89339415572427, -32.025882078964635, -32.15892036851963, -32.29251131065868, -32.42665720114852, -32.56136034529269, -32.69662305797116, -32.83244766368018, -32.96883649657196, -33.105791900495184, -33.24331622903502, -33.381411845553615, -33.520081123230824, -33.65932644510467, -33.799150204112735, -33.93955480313301, -34.080542655025226, -34.222116182672444, -34.364277819022355, -34.50703000712955, -34.65037520019722, -34.79431586161933, -34.938854465023134, -35.08399349431128, -35.229735443704996, -35.37608281778666, -35.52303813154288, -35.67060391040784, -35.81878269030634, -35.967577017697884, -36.11698944962009, -36.26702255373276, -36.417678908362014, -36.56896110254438, -36.720871736071665, -36.87341341953537, -37.02658877437161, -37.18040043290627, -37.3348510383999, -37.489943245093606, -37.645679718254385, -37.80206313422098, -37.95909618044993, -38.1167815555615, -38.27512196938648, -38.43412014301245, -38.59377880883062, -38.754100710582875, -38.915088603408606, -39.076745253892526, -39.23907344011191, -39.40207595168439, -39.565755589816, -39.73011516734899, -39.89515750881064, -40.06088545046148, -40.2273018403441, -40.39440953833213, -40.56221141617942, -40.73071035756911, -40.89990925816364, -41.069811025654204, -41.24041857981081, -41.4117348525325, -41.583762787897456, -41.75650534221405, -41.92996548407134, -42.10414619439016, -42.27905046647442, -42.45468130606224, -42.631041731378076, -42.80813477318426, -42.98596347483319, -43.164530892319696, -43.3438400943332, -43.52389416231102, -43.70469619049089, -43.88624928596434, -44.06855656873007, -44.25162117174726, -44.43544624098998, -44.62003493550082, -44.80539042744532, -44.99151590216657, -45.17841455823956, -45.36608960752672, -45.55454427523276, -45.74378179996013, -45.93380543376486, -46.12461844221198, -46.31622410443226, -46.50862571317816, -46.701826574880535, -46.89583000970552, -47.09063935161123, -47.28625794840561, -47.482689161803606, -47.679936367485006, -47.87800295515257, -48.07689232858988, -48.276607905720425, -48.477153118665946, -48.678531413805516, -48.880746251834864, -49.08380110782545, -49.28769947128479, -49.492444846215996, -49.698040751178134, -49.904490719346654, -50.11179829857424, -50.31996705145134, -50.52900055536803, -50.73890240257507, -50.94967620024573, -51.161325570537926, -51.37385415065598, -51.5872655929138, -51.80156356479725, -52.01675174902719, -52.23283384362299, -52.449813561965556, -52.66769463286182, -52.886480800608396, -53.106175825056056, -53.3267834816744, -53.548307561616326, -53.770751871783865, -53.99412023489311, -54.21841648954006, -54.4436444902667, -54.66980810762676, -54.89691122825292, -55.12495775492317, -55.35395160662799, -55.58389671863776, -55.81479704257001, -56.04665654645795, -56.27947921481826, -56.51326904871961, -56.74803006585158, -56.98376630059327, -57.22048180408323, -57.458180644288724, -57.696866906075684, -57.93654469127904, -58.177218118772764, -58.41889132454133, -58.66156846175032, -58.90525370081796, -59.14995122948684, -59.39566525289545, -59.64239999365115, -59.89015969190227, -60.13894860541106, -60.38877100962701, -60.63963119775984, -60.891533480854, -61.144482187862266, -61.39848166572027, -61.653536279421175, -61.90965041209084, -62.16682846506263, -62.425074857953796, -62.68439402874096, -62.94479043383647, -63.20626854816511, -63.468832865240536, -63.73248789724321, -63.997238175097465, -64.2630882485495, -64.53004268624562, -64.7981060758104, -65.0672830239261, -65.33757815641144, -65.6089961183012, -65.88154157392619, -66.1552192069928, -66.43003372066437, -66.70598983764147, -66.98309230024317, -67.26134587048865, -67.54075533017858, -67.82132548097799, -68.10306114449834, -68.3859671623805, -68.67004839637802, -68.95530972844023, -69.2417560607969, -69.52939231604194, -69.81822343721814, -70.10825438790229, -70.39949015228984, -70.69193573528148, -70.98559616256853, -71.28047648071946, -71.57658175726681, -71.8739170807936, -72.17248756102174, -72.4722983288992, -72.77335453668836, -73.0756613580547, -73.37922398815509, -73.684047643728, -73.99013756318251, -74.29749900668855, -74.60613725626719, -74.91605761588167, -75.2272654115279, -75.53976599132683, -75.85356472561593, -76.16866700704139, -76.48507825065118, -76.80280389398732, -77.12184939718034, -77.44222024304247, -77.76392193716201, -78.08696000799812, -78.41134000697515, -78.73706750857907, -79.06414811045256, -79.39258743349141, -79.72239112194126, -80.05356484349392, -80.38611428938579, -80.72004517449501, -81.05536323743979, -81.39207424067726, -81.73018397060176, -82.06969823764534, -82.4106228763769, -82.75296374560268, -83.09672672846703, -83.44191773255291, -83.78854268998441, -84.136607557528, -84.48611831669504, -84.83708097384483, -85.18950156028707, -85.54338613238656, -85.89874077166658, -86.25557158491361, -86.6138847042824, -86.9736862874007, -87.33498251747606, -87.6977796034015, -88.06208377986229, -88.42790130744328, -88.79523847273582, -89.16410158844684, -89.53449699350661, -89.90643105317788, -90.27991015916544, -90.6549407297252, -91.03152920977564, -91.4096820710078, -91.78940581199666, -92.17070695831288, -92.55359206263506, -92.93806770486167, -93.32414049222518, -93.7118170594049, -94.10110406864118, -94.49200820985006, -94.88453620073751, -95.27869478691605, -95.67449074201978, -96.07193086782115, -96.4710219943479, -96.87177097999972, -97.27418471166732, -97.67827010484987, -98.0840341037742, -98.49148368151424, -98.90062584011004, -99.31146761068936, -99.72401605358769, -100.13827825846973, -100.55426134445148, -100.97197246022176, -101.39141878416626, -101.81260752449012, -102.23554591934197, -102.66024123693856, -103.08670077568881, -103.5149318643205, -103.94494186200535, -104.37673815848574, -104.81032817420187, -105.24571936041846, -105.6829191993541, -106.1219352043089, -106.56277491979391, -107.00544592166092, -107.44995581723184, -107.89631224543068, -108.34452287691401, -108.79459541420297, -109.24653759181584, -109.7003571764001, -110.15606196686726, -110.61365979452589, -111.07315852321656, -111.53456604944712, -111.99789030252751, -112.46313924470739, -112.93032087131209, -113.3994432108802, -113.87051432530153, -114.34354230995595, -114.81853529385154, -115.29550143976564, -115.77444894438432, -116.25538603844329, -116.73832098686978, -117.22326208892348, -117.71021767834065, -118.19919612347638, -118.69020582744862, -119.18325522828287, -119.67835279905616, -120.17550704804414, -120.67472651886636, -121.17601979063332, -121.67939547809407, -122.18486223178338, -122.69242873817184, -123.20210371981413, -123.71389593549917, -124.2278141804009, -124.74386728622844, -125.26206412137932, -125.78241359109094, -126.30492463759381, -126.82960624026552, -127.35646741578395, -127.88551721828388, -128.41676473951145, -128.9502191089807, -129.48588949413073, -130.02378510048223, -130.56391517179713, -131.10628899023658, -131.65091587652054, -132.19780519008836, -132.74696632925853, -133.29840873139173, -133.852141873052, -134.4081752701699, -134.96651847820613, -135.52718109231495, -136.09017274751042, -136.65550311883106, -137.22318192150635, -137.79321891112392, -138.3656238837961, -138.94040667633004, -139.51757716639548, -140.0971452726949, -140.67912095513393, -141.26351421499274, -141.85033509509688, -142.43959367999156, -143.0313000961137, -143.62546451196636, -144.22209713829372, -144.8212082282554, -145.4228080776044, -146.02690702486294, -146.63351545150027, -147.24264378211154, -147.85430248459562, -148.46850207033683, -149.08525309438446, -149.7045661556343, -150.32645189701125, -150.95092100565088, -151.57798421308502, -152.20765229542482, -152.83993607354643, -153.47484641327708, -154.1123942255807, -154.75259046674725, -155.3954461385797, -156.04097228858356, -156.6891800101569, -157.3400804427797, -157.99368477220742, -158.65000423066166, -159.3090500970237, -159.97083369702858, -160.63536640345848, -161.30265963634002, -161.97272486313935, -162.64557359895943, -163.32121740673824, -163.99966789744627, -164.680936730288, -165.3650356129009, -166.05197630155692, -166.74177060136503, -167.43443036647255, -168.129967500271, -168.82839395559927, -169.52972173494942, -170.23396289067315, -170.9411295251878, -171.65123379118603, -172.36428789184367, -173.0803040810295, -173.79929466351598, -174.521271995191, -175.24624848326883, -175.97423658650538, -176.70524881541107, -177.43929773246597, -178.17639595233618, -178.91655614208912, -179.6597910214134, -180.406113362836, -181.155535991942, -181.90807178759547, -182.6637336821593, -183.42253466171968, -184.18448776630768, -184.94960609012386, -185.71790278176357, -186.48939104444145, -187.2640841362205, -188.0419953702386, -188.82313811493745, -189.60752579429288, -190.3951718880439, -191.18608993192663, -191.98029351790552, -192.77779629440715, -193.57861196655523, -194.3827542964046, -195.19023710318007, -196.00107426351224, -196.8152797116765, -197.63286743983278, -198.4538514982645, -199.27824599562237, -200.1060650991652, -200.93732303500386, -201.77203408834617, -202.61021260374065, -203.4518729853256, -204.29702969707486, -205.14569726304694, -205.997890267635, -206.8536233558157, -207.7129112334035, -208.57576866730165, -209.44221048575642, -210.3122515786123, -211.18590689756618, -212.06319145642698, -212.94412033137175, -213.82870866120533, -214.71697164762045, -215.60892455545945, -216.5045827129748, -217.40396151209526, -218.3070764086884, -219.21394292282696, -220.1245766390558, -221.0389932066579, -221.9572083399262, -222.87923781843165, -223.80509748729494, -224.7348032574592, -225.66837110596157, -226.60581707621068, -227.54715727826033, -228.49240788908688, -229.4415851528678, -230.39470538125872, -231.35178495367686, -232.3128403175804, -233.27788798875176, -234.24694455158175, -235.2200266593528, -236.1971510345279, -237.1783344690362, -238.1635938245619, -239.15294603283462, -240.1464080959184, -241.14399708650677, -242.14573014821423, -243.15162449587132, -244.16169741582104, -245.17596626621375, -246.1944484773087, -247.21716155177134, -248.2441230649748, -249.2753506653022, -250.3108620744482, -251.35067508772642, -252.39480757437315, -253.44327747785508, -254.4961028161782, -255.5533016821952, -256.6148922439197, -257.6808927448362, -258.7513215042144, -259.82619691742406, -260.9055374562496, -261.98936166921027, -263.077688181877, -264.17053569719303, -265.267922995795, -266.36986893633673, -267.4763924558108, -268.5875125698774, -269.70324837318867, -270.82361903971787, -271.94864382308896, -273.0783420569055, -274.21273315508626, -275.3518366121965, -276.4956720037835, -277.64425898671385, -278.7976172995085, -279.95576676268587, -281.1187272790998, -282.2865188342824, -283.4591614967879, -284.6366754185354, -285.81908083515856, -287.0063980663509, -288.19864751621594, -289.39584967361793, -290.59802511253207, -291.80519449240137, -293.01737855848927, -294.23459814223696, -295.4568741616217, -296.68422762151425, -297.916679614043, -299.1542513189544, -300.3969640039773, -301.64483902518936, -302.8978978273811, -304.1561619444287, -305.419652999661, -306.6883927062324, -307.9624028674959, -309.2417053773758, -310.52632222074755, -311.816275473813, -313.11158730448045, -314.4122799727464, -315.7183758310751, -317.02989732478704, -318.34686699244185, -319.6693074662261, -320.9972414723433, -322.33069183140157, -323.6696814588096, -325.01423336516825, -326.3643706566663, -327.72011653547764, -329.0814943001607, -330.44852734605615, -331.8212391656929, -333.1996533491891, -334.58379358465845, -335.9736836586178, -337.36934745639314, -338.77080896253426, -340.1780922612241, -341.5912215366934, -343.0102210736371, -344.4351152576287, -345.86592857554353, -347.3026856159768, -348.7454110696671, -350.1941297299209, -351.64886649303634, -353.10964635873484, -354.57649443058824, -356.0494359164509, -357.52849612889327, -359.0137004856344, -360.50507450998293, -362.0026438312728, -363.50643418530433, -365.01647141478736, -366.5327814697825, -368.05539040815125, -369.5843243960009, -371.11960970813533, -372.6612727285066, -374.209339950666, -375.7638379782235, -377.324793525302, -378.89223341699727, -380.4661845898395, -382.04667409225334, -383.6337290850272, -385.22737684177696, -386.82764474941564, -388.43456030862444, -390.0481511343225, -391.66844495614606, -393.295469618922, -394.92925308314693, -396.56982342546854, -398.21720883916504, -399.8714376346343, -401.5325382398773, -403.20053920098724, -404.87546918264053, -406.5573569685898, -408.24623146215527, -409.9421216867268, -411.645056786259, -413.3550660257728, -415.07217879185987, -416.79642459318325, -418.5278330609905, -420.2664339496187, -422.01225713700745, -423.76533262521247, -425.5256905409181, -427.2933611359602, -429.0683747878424, -430.85076200025924, -432.640553403621, -434.4377797555768, -436.2424719415482, -438.05466097525687, -439.8743779992579, -441.7016542854762, -443.5365212357404, -445.37901038232764, -447.22915338850197, -449.08698204905943, -450.9525282908753, -452.82582417344906, -454.706901889461, -456.5957937653215, -458.4925322617279, -460.39714997422277, -462.3096796337507, -464.2301541072263, -466.1586063980952, -468.0950696469022, -470.0395771318618, -471.99216226942616, -473.9528586148652, -475.9216998628393, -477.8987198479795, -479.8839525454698, -481.8774320716269, -483.8791926844929, -485.8892687844195, -487.90769491466074, -489.93450576196705, -491.96973615717775, -494.01342107582553, -496.06559563873344, -498.1262951126194, -500.1955549107024, -502.27341059331206, -504.3598978684955, -506.4550525926375, -508.558910771072, -510.67150855870244, -512.7928822606239, -514.9230683327426, -517.0621033824093, -519.2100241690434, -521.3668676047665, -523.5326707550371, -525.7074708392838, -527.8913052315511, -530.0842114611374, -532.2862272132412, -534.4973903296094, -536.7177388091839, -538.9473108087603, -541.1861446436403, -543.4342787882902, -545.6917518770039, -547.9586027045622, -550.2348702269059, -552.5205935618014, -554.8158119895135, -557.1205649534814, -559.4348920609932, -561.7588330838718, -564.0924279591547, -566.4357167897815, -568.788739845284, -571.1515375624734, -573.5241505461428, -575.9066195697596, -578.2989855761681, -580.7012896782934, -583.1135731598442, -585.5358774760285, -587.9682442542619, -590.4107152948836, -592.8633325718766, -595.3261382335837, -597.7991746034389, -600.2824841806907, -602.7761096411328, -605.2800938378392, -607.7944798018955, -610.319310743146, -612.8546300509312, -615.4004812948345, -617.9569082254314, -620.5239547750421, -623.1016650584817, -625.690083373826, -628.2892542031675, -630.8992222133811, -633.5200322568933, -636.1517293724471, -638.7943587858849, -641.4479659109194, -644.1125963499157, -646.7882958946769, -649.4751105272248, -652.1730864205988, -654.8822699396434, -657.602707641807, -660.3344462779429, -663.0775327931076, -665.8320143273752, -668.5979382166427, -671.3753519934442, -674.1643033877697, -676.9648403278795, -679.7770109411363, -682.6008635548263, -685.436446696992, -688.2838090972664, -691.1429996877057, -694.0140676036384, -696.8970621845039, -699.7920329747018, -702.699029724445, -705.618102390609, -708.5493011375983, -711.4926763382034, -714.4482785744682, -717.4161586385596, -720.3963675336357, -723.3889564747302, -726.3939768896271, -729.4114804197459, -732.4415189210306, -735.4841444648347, -738.5394093388251, -741.6073660478747, -744.6880673149664, -747.7815660820985, -750.887915511197, -754.0071689850221, -757.1393801080955, -760.284602707615, -763.4428908343816, -766.614298763729, -769.7988809964513, -772.9966922597476, -776.2077875081577, -779.4322219245068, -782.6700509208562, -785.9213301394486, -789.1861154536746, -792.4644629690258, -795.7564290240612, -799.0620701913762, -802.3814432785692, -805.7146053292271, -809.0616136238989, -812.4225256810823, -815.7973992582133, -819.1862923526525, -822.5892632026912, -826.0063702885462, -829.4376723333662, -832.8832283042427, -836.3430974132161, -839.8173391183045, -843.3060131245174, -846.8091793848846, -850.3268981014874, -853.8592297264867, -857.4062349631721, -860.967974766998, -864.5445103466336, -868.1359031650153, -871.7422149403969, -875.3635076474204, -878.9998435181743, -882.6512850432642, -886.3178949728892, -889.9997363179126, -893.6968723509557, -897.4093666074781, -901.1372828868709, -904.8806852535557, -908.6396380380772, -912.4142058382208, -916.2044535201144, -920.0104462193458, -923.8322493420814, -927.6699285661924, -931.5235498423762, -935.3931793953003, -939.2788837247336, -943.1807296066911, -947.0987840945825, -951.0331145203576, -954.983788495675, -958.9508739130555, -962.9344389470521, -966.9345520554219, -970.9512819802964, -974.9846977493731, -979.0348686770949, -983.1018643658427, -987.1857547071342, -991.2866098828158, -995.404500366282, -999.5394969236775, -1003.6916706151159, -1007.8610927959026, -1012.047835117753, -1016.2519695300363, -1020.473568281003, -1024.71270391903, -1028.9694492938677, -1033.2438775578846, -1037.536062167337, -1041.8460768836226, -1046.1739957745503, -1050.5198932156156, -1054.8838438912692, -1059.2659227962142, -1063.6662052366864, -1068.0847668317497, -1072.5216835145986, -1076.977031533854, -1081.450887454887, -1085.9433281611252, -1090.4544308553773, -1094.9842730611606, -1099.5329326240258, -1104.100487712907, -1108.6870168214568, -1113.2925987693975, -1117.917312703877, -1122.5612381008211, -1127.224454766312, -1131.9070428379507, -1136.6090827862374, -1141.3306554159533, -1146.0718418675524, -1150.8327236185455, -1155.6133824849155, -1160.413900622514, -1165.2343605284739, -1170.0748450426324, -1174.935437348942, -1179.8162209769164, -1184.7172798030558, -1189.63869805229, -1194.5805602994299, -1199.542951470609, -1204.5259568447598, -1209.5296620550675, -1214.5541530904457, -1219.5995162970153, -1224.6658383795793, -1229.7532064031277, -1234.8617077943227, -1239.9914303430053, -1245.1424622037052, -1250.314891897146, -1255.508808311782, -1260.7243007053153, -1265.9614587062315, -1271.220372315344, -1276.5011319073299, -1281.8038282322973, -1287.128552417336, -1292.4753959680863, -1297.8444507703123, -1303.2358090914727, -1308.64956358232, -1314.0858072784847, -1319.544633602074, -1325.0261363632824, -1330.5304097619912, -1336.057548389405, -1341.6076472296647, -1347.180801661485, -1352.7771074597936, -1358.3966607973678, -1364.039558246503, -1369.7058967806618, -1375.395773776143, -1381.109287013757, -1386.846534680497, -1392.6076153712409, -1398.3926280904357, -1404.201672253802, -1410.034847690041, -1415.8922546425547, -1421.7739937711558, -1427.680166153815, -1433.6108732883877, -1439.5662170943588, -1445.5462999145998, -1451.5512245171137, -1457.5810940968202, -1463.636012277316, -1469.7160831126596, -1475.821411089162, -1481.9521011271702, -1488.108258582889, -1494.2899892501782, -1500.4973993623753, -1506.7305955941226, -1512.9896850631892, -1519.2747753323301, -1525.5859744111222, -1531.923390757823, -1538.2871332812388, -1544.6773113425827, -1551.0940347573735, -1557.53741379731, -1564.0075591921686, -1570.5045821317108, -1577.02859426758, -1583.57970771524, -1590.1580350558884, -1596.763689338395, -1603.3967840812477, -1610.0574332744907, -1616.7457513817014, -1623.4618533419468, -1630.2058545717603, -1636.9778709671282, -1643.7780189054697, -1650.6064152476556, -1657.4631773400035, -1664.3484230162976, -1671.2622705998178, -1678.2048389053582, -1685.1762472412906, -1692.1766154116006, -1699.2060637179497, -1706.264712961747, -1713.3526844462097, -1720.4700999784707, -1727.6170818716557, -1734.7937529469907, -1742.000236535911, -1749.2366564821853, -1756.503137144029, -1763.7998033962635, -1771.126780632447, -1778.4841947670338, -1785.872172237541, -1793.2908400067076, -1800.7403255646973, -1808.2207569312757, -1815.7322626580135, -1823.2749718304995, -1830.849014070544, -1838.4545195384283, -1846.091618935128, -1853.7604435045614, -1861.461125035849, -1869.1937958655633, -1876.9585888800264, -1884.755637517577, -1892.5850757708693, -1900.4470381891774, -1908.341659880694, -1916.2690765148736, -1924.2294243247507, -1932.2228401092825, -1940.2494612357057, -1948.3094256418801, -1956.4028718386835, -1964.5299389123754, -1972.6907665269923, -1980.8854949267509, -1989.1142649384424, -1997.377217973877, -2005.6744960322974, -2014.006241702824, -2022.3725981669086, -2030.7737092007787, -2039.2097191779333, -2047.680773071607, -2056.187016457266, -2064.728595515114, -2073.305657032587, -2081.9183484069013, -2090.56681764757, -2099.251213378951, -2107.9716848428034, -2116.7283819008385, -2125.5214550373175, -2134.3510553616234, -2143.2173346108593, -2152.1204451524586, -2161.0605399868055, -2170.0377727498485, -2179.052297715766, -2188.1042697996013, -2197.193844559927, -2206.321178201524, -2215.4864275780487, -2224.6897501947547, -2233.9313042111803, -2243.211248443874, -2252.529742369125, -2261.886946125688, -2271.283020517562, -2280.718127016734, -2290.1924277659605, -2299.7060855815575, -2309.2592639561803, -2318.85212706166, -2328.4848397518085, -2338.157567565254, -2347.87047672829, -2357.6237341577166, -2367.4175074637333, -2377.2519649528026, -2387.1272756305466, -2397.043609204656, -2407.0011360877884, -2417.000027400524, -2427.0404549742875, -2437.122591354307, -2447.246609802584, -2457.4126843008485, -2467.620989553582, -2477.871700990999, -2488.1649947720653, -2498.501047787531, -2508.880037662953, -2519.3021427617714, -2529.7675421883623, -2540.2764157911142, -2550.828944165528, -2561.425308657298, -2572.0656913654593, -2582.750275145498, -2593.4792436124976, -2604.2527811442983, -2615.071072884648, -2625.934304746412, -2636.84266341475, -2647.7963363503272, -2658.7955117925358, -2669.840378762738, -2680.93112706749, -2692.067947301836, -2703.251030852565, -2714.4805699015023, -2725.756757428819, -2737.0797872163257, -2748.4498538508365, -2759.8671527274896, -2771.331880053112, -2782.844232849597, -2794.4044089572667, -2806.0126070383053, -2817.669026580152, -2829.3738678989343, -2841.127332142915, -2852.929621295928, -2864.780938180882, -2876.6814864632247, -2888.631470654447, -2900.631096115605, -2912.6805690608235, -2924.7800965608776, -2936.9298865467254, -2949.130147813089, -2961.3810900220474, -2973.682923706616, -2986.0358602744013, -2998.4401120112084, -3010.8958920846967, -3023.403414548048, -3035.962894343623, -3048.5745473066863, -3061.2385901690986, -3073.9552405630416, -3086.7247170247665, -3099.5472389983242, -3112.4230268393744, -3125.3523018189467, -3138.335286127249, -3151.372202877495, -3164.463276109709, -3177.608730794617, -3190.8087928374857, -3204.0636890820124, -3217.37364731423, -3230.7388962663936, -3244.1596656209517, -3257.636186014468, -3271.1686890415895, -3284.7574072590273, -3298.4025741895607, -3312.104424326022, -3325.8631931353684, -3339.679117062699, -3353.5524335353275, -3367.483380966867, -3381.472198761302, -3395.5191273171417, -3409.624408031525, -3423.7882833043755, -3438.010996542574, -3452.292792164113, -3466.6339156023405, -3481.034613310148, -3495.4951327642143, -3510.0157224692653, -3524.5966319623144, -3539.2381118169956, -3553.94041364784, -3568.703790114608, -3583.5284949266374, -3598.4147828471737, -3613.3629096977947, -3628.373132362775, -3643.4457087935075, -3658.5808980129477, -3673.7789601200307, -3689.0401562941875, -3704.364748799804, -3719.7530009907355, -3735.2051773148387, -3750.721543318488, -3766.302365651182, -3781.9479120700976, -3797.658451444698, -3813.434253761361, -3829.275590127989, -3845.182732778712, -3861.1559550785364, -3877.195531528052, -3893.3017377681545, -3909.4748505847524, -3925.715147913571, -3942.0229088448955, -3958.398413628378, -3974.8419436778586, -3991.353781576171, -4007.934211080048, -4024.583517124963, -4041.301985830036, -4058.089904502951, -4074.9475616449013, -4091.8752469555147, -4108.873251337881, -4125.941866903518, -4143.081386977399, -4160.292106103006, -4177.574320047353, -4194.9283258061205, -4212.3544216087275, -4229.852906923464, -4247.424082462644, -4265.0682501877445, -4282.785713314637, -4300.576776318775, -4318.441744940425, -4336.380926189937, -4354.39462835298, -4372.4831609958965, -4390.646834970983, -4408.885962421848, -4427.200856788775, -4445.591832814083, -4464.059206547583, -4482.603295351975, -4501.224417908312, -4519.922894221485, -4538.699045625684, -4557.55319478998, -4576.485665723825, -4595.496783782639, -4614.586875673403, -4633.756269460241, -4653.005294570111, -4672.3342817984285, -4691.743563314765, -4711.23347266856, -4730.804344794819, -4750.4565160199245, -4770.190324067377, -4790.006108063614, -4809.904208543839, -4829.8849674578405, -4849.948728175926, -4870.0958354947825, -4890.326635643412, -4910.641476289094, -4931.040706543314, -4951.524676967831, -4972.093739580654, -4992.74824786211, -5013.48855676091, -5034.315022700264, -5055.228003583965, -5076.227858802599, -5097.314949239683, -5118.489637277873, -5139.752286805207, -5161.103263221312, -5182.542933443749, -5204.071665914276, -5225.68983060519, -5247.397799025694, -5269.195944228245, -5291.084640815018, -5313.064264944312, -5335.135194337017, -5357.297808283123, -5379.552487648187, -5401.899614879949, -5424.339574014858, -5446.872750684686, -5469.499532123163, -5492.220307172586, -5515.035466290572, -5537.945401556722, -5560.950506679368, -5584.051177002353, -5607.2478095117785, -5630.540802842895, -5653.930557286905, -5677.417474797858, -5701.001958999566, -5724.684415192494, -5748.465250360797, -5772.344873179261, -5796.32369402035, -5820.402124961255, -5844.580579790941, -5868.859474017321, -5893.2392248743545, -5917.720251329225, -5942.302974089554, -5966.987815610583, -5991.775200102507, -6016.665553537713, -6041.659303658115, -6066.756879982517, -6091.958713813941, -6117.265238247121, -6142.676888175887, -6168.1941003006605, -6193.81731313595, -6219.546967017906, -6245.383504111837, -6271.327368419878, -6297.379005788581, -6323.538863916577, -6349.8073923622915, -6376.185042551618, -6402.672267785747, -6429.269523248911, -6455.977266016218, -6482.795955061516, -6509.726051265234, -6536.768017422373, -6563.9223182504165, -6591.1894203973225, -6618.569792449557, -6646.063904940098, -6673.672230356595, -6701.39524314944, -6729.233419739935, -6757.187238528488, -6785.257179902784, -6813.4437262461215, -6841.747361945647, -6870.168573400693, -6898.707849031152, -6927.365679285812, -6956.142556650869, -6985.038975658337, -7014.055432894559, -7043.192427008753, -7072.450458721527, -7101.830030833571, -7131.331648234234, -7160.955817910223, -7190.703048954326, -7220.573852574098, -7250.568742100745, -7280.688232997877, -7310.932842870384, -7341.303091473348, -7371.799500720915, -7402.422594695348, -7433.172899655983, -7464.050944048281, -7495.057258512926, -7526.192375894883, -7557.45683125265, -7588.851161867386, -7620.3759072521625, -7652.0316091612385, -7683.818811599379, -7715.738060831146, -7747.78990539038, -7779.974896089562, -7812.293586029296, -7844.74653060783, -7877.334287530535, -7910.05741681959, -7942.916480823534, -7975.912044226954, -8009.044674060201, -8042.314939709069, -8075.723412924682, -8109.270667833249, -8142.957280945948, -8176.783831168854, -8210.750899812816, -8244.85907060355, -8279.1089296916, -8313.501065662434, -8348.03606954657, -8382.714534829664, -8417.53705746282, -8452.504235872751, -8487.616670972095, -8522.87496616974, -8558.279727381143, -8593.831563038835, -8629.531084102811, -8665.378904071047, -8701.37563899006, -8737.521907465429, -8773.81833067252, -8810.265532367102, -8846.864138896079, -8883.614779208272, -8920.518084865154, -8957.574690051819, -8994.785231587794, -9032.15034893802, -9069.670684223836, -9107.34688223397, -9145.179590435697, -9183.16945898592, -9221.317140742345, -9259.623291274707, -9298.088568876054, -9336.713634573982, -9375.49915214211, -9414.445788111414, -9453.554211781693, -9492.825095233098, -9532.259113337599, -9571.856943770705, -9611.61926702302, -9651.546766411973, -9691.64012809357, -9731.900041074108, -9772.327197222137, -9812.922291280269, -9853.686020877134, -9894.619086539395, -9935.722191703702, -9976.996042728904, -10018.441348908122, -10060.058822480885, -10101.849178645489, -10143.813135571198, -10185.95141441062, -10228.264739312091, -10270.753837432123, -10313.4194389479, -10356.262277069822, -10399.283088054111, -10442.482611215504, -10485.861588939786, -10529.420766696805, -10573.160893053113, -10617.082719684875, -10661.187001390781, -10705.474496105018, -10749.945964910303, -10794.602172050953, -10839.443884946022, -10884.471874202536, -10929.686913628551, -10975.08978024673, -11020.681254307503, -11066.462119302534, -11112.433161978175, -11158.595172348994, -11204.948943711344, -11251.495272657003, -11298.23495908686, -11345.168806224707, -11392.297620630858, -11439.622212216287, -11487.143394256367, -11534.861983404879, -11582.77879970806, -11630.89466661869, -11679.210411010243, -11727.726863191094, -11776.444856918795, -11825.365229414445, -11874.488821376888, -11923.81647699745, -11973.349043974249, -12023.087373526818, -12073.032320410726, -12123.184742932277, -12173.545502963249, -12224.115465955707, -12274.895500956887, -12325.886480624167, -12377.08928123987, -12428.504782726624, -12480.133868662278, -12531.977426295145, -12584.036346559238, -12636.311524089595, -12688.803857237637, -12741.51424808662, -12794.443602467132, -12847.59282997266, -12900.962843975269, -12954.554561641096, -13008.368903946428, -13062.406795693307, -13116.669165525487, -13171.156945944387, -13225.871073325121, -13280.81248793258, -13335.982133937605, -13391.3809594332, -13447.009916450881, -13502.869960976826, -13558.962052968627, -13615.287156371565, -13671.846239135237, -13728.640273230183, -13785.670234664594, -13842.937103501083, -13900.441863873531, -13958.185504003994, -14016.169016219745, -14074.393396970097, -14132.85964684388, -14191.568770586387, -14250.521777116719, -14309.719679545113, -14369.16349519035, -14428.854245597247, -14488.792956554202, -14548.980658110828, -14609.418384595712, -14670.107174633958, -14731.048071165382, -14792.242121462203, -14853.690377147102, -14915.39389421129, -14977.353733032662, -15039.570958394004, -15102.046639501314, -15164.781850002157, -15227.777668004184, -15291.03517609342, -15354.555461353226, -15418.339615382738, -15482.388734315697, -15546.703918839272, -15611.286274212984, -15676.136910287698, -15741.256941524694, -15806.647487014827, -15872.309670497742, -15938.244620381269, -16004.453469760543, -16070.937356437875, -16137.69742294203, -16204.734816547947, -16272.050689296439, -16339.646198013997, -16407.52250433267, -16475.68077471003, -16544.12218044921, -16612.847897719104, -16681.85910757432, -16751.156995975864, -16820.74275381126, -16890.617576915083, -16960.78266608951, -17031.239227124956, -17101.988470820786, -17173.03161300614, -17244.36987456081, -17316.004481436303, -17387.936664676618, -17460.16766043984, -17532.69871001908, -17605.531059863897, -17678.665961601702, -17752.10467205928, -17825.848453284376, -17899.898572567403, -17974.2563024632, -18048.92292081298, -18123.899710766003, -18199.187960802068, -18274.788964753345, -18350.704021826703, -18426.934436626027, -18503.481519174642, -18580.346584937823, -18657.530954845395, -18735.035955314448, -18812.862918272196, -18891.013181178565, -18969.488087049638, -19048.288984480423, -19127.41722766811, -19206.87417643534, -19286.66119625358, -19366.779658266576, -19447.23093931393, -19528.016421954755, -19609.137494491428, -19690.595550993545, -19772.391991321536, -19854.528221151224, -19937.00565199764, -20019.82570123938, -20102.989792142947, -20186.499353887222, -20270.35582158802, -20354.560636322738, -20439.115245155146, -20524.021101160328, -20609.27966344931, -20694.892397194642, -20780.860773655248, -20867.18627020179, -20953.870370342047, -21040.914563746428, -21128.320346273562, -21216.089219995996, -21304.22269322602, -21392.72228054168, -21481.589502812432, -21570.82588722583, -21660.43296731341, -21750.41228297712, -21840.765380515808, -21931.49381265177, -22022.599138557456, -22114.082923882244, -22205.946740779356, -22298.192167932975, -22390.82079058499, -22483.834200562804, -22577.23399630631, -22671.021782895466, -22765.199172077868, -22859.767782296454, -22954.72923871731, -23050.085173257605, -23145.83722461363, -23241.98703828907, -23338.53626662287, -23435.486568818233, -23532.839610970736, -23630.597066097067, -23728.760614163763, -23827.331942116092, -23926.312743907038, -24025.70472052641, -24125.50958003008, -24225.72903756933, -24326.364815420427, -24427.41864301383, -24528.892256964493, -24630.787401101323, -24733.105826497245, -24835.849291499297, -24939.019561758825, -25042.618410261868, -25146.647617359584, -25251.10897079887, -25356.004265753185, -25461.335304852983, -25567.10389821731, -25673.31186348449, -25779.9610258435, -25887.05321806528, -25994.59028053428, -26102.574061280062, -26211.006416009055, -26319.889208136465, -26429.224308818382, -26539.013596983532, -26649.25895936618, -26759.96229053815, -26871.125492941486, -26982.750476921134, -27094.83916075778, -27207.393470700816, -27320.415341001437, -27433.90671394589, -27547.869539888954, -27662.305777287023, -27777.217392732415, -27892.606360986738, -28008.474665014925, -28124.824296019327, -28241.657253473906, -28358.97554515863, -28476.78118719395, -28595.07620407545, -28713.86262870877, -28833.142502444072, -28952.917875111794, -29073.19080505745, -29193.963359177083, -29315.237612952817, -29437.015650488498, -29559.299564545523, -29682.091456578804, -29805.393436772873, -29929.207624078157, -30053.53614624751, -30178.381139872276, -30303.74475041977, -30429.62913226963, -30556.036448750976, -30682.968872179586, -30810.428583895224, -30938.41777429913, -31066.938642891666, -31195.993398310093, -31325.58425836669, -31455.71345008632, -31586.383209745498, -31717.595782910288, -31849.353424475037, -31981.658398701107, -32114.51297925581, -32247.91944925147, -32381.88010128464, -32516.397237475543, -32651.473169507717, -32787.11021866726, -32923.31071588346, -33060.07700176839, -33197.41142665721, -33335.316350648565, -33473.79414364518, -33612.847185394545, -33752.47786552983, -33892.68858361095, -34033.481749165934, -34174.85978173179, -34316.825110896905, -34459.380176342245, -34602.527427883426, -34746.26932551281, -34890.60833944179, -35035.5469501432, -35181.087648394016, -35327.23293531808, -35473.9853224293, -35621.347331674144, -35769.32149547596, -35917.910356777815, -36067.11646908639, -36216.94239651587, -36367.39071383197, -36518.46400649623, -36670.164870710396, -36822.49591346107, -36975.459752564515, -37129.05901671176, -37283.29634551321, -37438.17438954488, -37593.69581039337, -37749.86328070172, -37906.679484215376, -38064.1471158283, -38222.26888162927, -38381.047498948385, -38540.485696403775, -38700.58621394865, -38861.351802917736, -39022.78522607553, -39184.88925766312, -39347.66668344604, -39511.120300762144, -39675.25291856965, -39840.06735749545, -40005.56644988355, -40171.75303984376, -40338.62998330075, -40506.200148042444, -40674.46641377029, -40843.431672148115, -41013.098826851965, -41183.47079362, -41354.55050030261, -41526.340886912745, -41698.8449056764, -41872.065521083394, -42046.00570993846, -42220.668461411704, -42396.05677709104, -42572.17367103306, -42749.022169815, -42926.60531258677, -43104.926151123174, -43283.98774987634, -43463.7931860284, -43644.345549544385, -43825.64794322546, -44007.70348276158, -44190.51529678607, -44374.086526928695, -44558.42032786982, -44743.51986739463, -44929.38832644756, -45116.02889918697, -45303.44479304001, -45491.639228757806, -45680.615440470705, -45870.37667574413, -46060.92619563363, -46252.26727474198, -46444.40320127478, -46637.33727709711, -46831.07281779029, -47025.61315270886, -47220.96162503776, -47417.12159184983, -47614.09642416348, -47811.889507000815, -48010.504239445036, -48209.944034700005, -48410.212320148144, -48611.3125374095, -48813.248142400946, -49016.02260539548, -49219.63941108196, -49424.10205862493, -49629.41406172475, -49835.578948678216, -50042.60026243837, -50250.481560676584, -50459.2264158429, -50668.83841522765, -50879.32116102305, -51090.67827038516, -51302.913375496, -51516.030123626006, -51730.032177196685, -51944.92321384376, -52160.70692647956, -52377.3870233577, -52594.967228136025, -52813.45127994074, -53032.84293343072, -53253.14595886203, -53474.364142152685, -53696.50128494775, -53919.56120468464, -54143.54773465896, -54368.4647240895, -54594.316038185694, -54821.10555821317, -55048.83718156067, -55277.514821807046, -55507.14240878846, -55737.72388866598, -55969.26322399337, -56201.76439378515, -56435.231393585076, -56669.66823553491, -56905.07894844253, -57141.46757785253, -57378.8381861148, -57617.194852454595, -57856.54167304263, -58096.88276106544, -58338.22224679613, -58580.564277665304, -58823.913018332336, -59068.272650757215, -59313.64737427143, -59560.04140565157, -59807.45897919085, -60055.90434677209, -60305.38177794083, -60555.89555997863, -60807.44999797682, -61060.04941491045, -61313.69815171257, -61568.400567349105, -61824.16103889274, -62080.98396159965, -62338.87374898406, -62597.834832894274, -62857.871663588914, -63118.98870981335, -63381.19045887649, -63644.48141672794, -63908.86610803539, -64174.349076262675, -64440.93488374677, -64708.628111777776, -64977.433360676616, -65247.35524987435, -65518.39841799154, -65790.567522918, -66063.86724189282, -66338.3022715847, -66613.87732817278, -66890.59714742783, -67168.46648479266, -67447.49011546536, -67727.6728344804, -68009.01945679115, -68291.53481735282, -68575.22377120533, -68860.09119355697, -69146.14197986799, -69433.38104593482, -69721.81332797455, -70011.44378271003, -70302.27738745391, -70594.31914019585, -70887.57405968735, -71182.04718552821, -71477.7435782532, -71774.66831941894, -72072.82651169132, -72372.22327893312, -72672.86376629211, -72974.75314028971, -73277.8965889087, -73582.299321684, -73887.96656979111, -74194.90358613634, -74503.11564544697, -74812.60804436199, -75123.38610152305, -75435.45515766594, -75748.8205757123, -76063.48774086215, -76379.46206068512, -76696.74896521532, -77015.35390704339, -77335.28236141047, -77656.53982630235, -77979.13182254392, -78303.06389389407, -78628.34160714093, -78954.97055219754, -79282.95634219827, -79612.30461359397, -79943.02102625073, -80275.11126354591, -80608.58103246614, -80943.43606370535, -81279.68211176322, -81617.32495504418, -81956.37039595665, -82296.82426101272, -82638.69240092869, -82981.98069072422, -83326.69502982529, -83672.84134216433, -84020.42557628226, -84369.45370543074, -84719.93172767489, -85071.86566599626, -85425.2615683964, -85780.1255080008, -86136.46358316322, -86494.28191757089, -86853.58666034826, -87214.38398616489, -87576.68009534007, -87940.48121394974, -88305.79359393353, -88672.62351320215, -89040.97727574532, -89410.86121174005, -89782.28167765944, -90155.24505638235, -90529.75775730154, -90905.82621643603, -91283.45689654029, -91662.65628721559, -92043.43090502161, -92425.78729358836, -92809.73202372865, -93195.27169355101, -93582.41292857313, -93971.162381836, -94361.5267340168, -94753.51269354598, -95147.126996721, -95542.37640782245, -95939.26771923038, -96337.80775154095, -96738.00335368367, -97139.86140303909, -97543.38880555698, -97948.59249587549, -98355.4794374386, -98764.05662261823, -99174.33107283285, -99586.30983866852, -100000.0], "expected": [0.4999750000000208, 0.4999748961478546, 0.49997479186427746, 0.49997468714749715, 0.49997458199571443, 0.49997447640712206, 0.4999743703799056, 0.49997426391224276, 0.49997415700230413, 0.49997404964825226, 0.49997394184824245, 0.4999738336004221, 0.4999737249029307, 0.49997361575390065, 0.4999735061514562, 0.4999733960937135, 0.4999732855787815, 0.4999731746047608, 0.4999730631697445, 0.4999729512718174, 0.4999728389090567, 0.49997272607953136, 0.4999726127813024, 0.4999724990124227, 0.4999723847709373, 0.49997227005488293, 0.499972154862288, 0.499972039191173, 0.4999719230395504, 0.49997180640542366, 0.49997168928678876, 0.4999715716816329, 0.49997145358793504, 0.49997133500366564, 0.4999712159267871, 0.4999710963552527, 0.499970976287008, 0.4999708557199892, 0.49997073465212466, 0.49997061308133356, 0.4999704910055271, 0.49997036842260706, 0.49997024533046697, 0.49997012172699146, 0.49996999761005634, 0.49996987297752876, 0.4999697478272669, 0.4999696221571201, 0.4999694959649285, 0.4999693692485236, 0.4999692420057278, 0.4999691142343543, 0.49996898593220757, 0.49996885709708255, 0.4999687277267653, 0.4999685978190325, 0.4999684673716518, 0.49996833638238136, 0.49996820484897014, 0.49996807276915767, 0.49996794014067425, 0.49996780696124066, 0.4999676732285681, 0.49996753894035856, 0.499967404094304, 0.4999672686880873, 0.49996713271938154, 0.49996699618585, 0.49996685908514626, 0.4999667214149143, 0.49996658317278836, 0.4999664443563924, 0.49996630496334143, 0.49996616499123947, 0.49996602443768146, 0.49996588330025155, 0.4999657415765246, 0.4999655992640652, 0.49996545636042733, 0.49996531286315543, 0.49996516876978336, 0.49996502407783505, 0.49996487878482376, 0.4999647328882528, 0.49996458638561475, 0.49996443927439205, 0.4999642915520566, 0.4999641432160699, 0.4999639942638826, 0.499963844692935, 0.4999636945006567, 0.49996354368446666, 0.4999633922417731, 0.4999632401699736, 0.49996308746645457, 0.4999629341285919, 0.49996278015375045, 0.4999626255392842, 0.49996247028253604, 0.499962314380838, 0.4999621578315106, 0.49996200063186386, 0.49996184277919614, 0.4999616842707949, 0.4999615251039359, 0.499961365275884, 0.4999612047838925, 0.49996104362520344, 0.4999608817970472, 0.49996071929664265, 0.4999605561211976, 0.49996039226790756, 0.4999602277339566, 0.4999600625165174, 0.49995989661275075, 0.4999597300198053, 0.49995956273481856, 0.49995939475491535, 0.4999592260772092, 0.4999590566988011, 0.49995888661678045, 0.4999587158282245, 0.49995854433019793, 0.49995837211975375, 0.49995819919393253, 0.49995802554976243, 0.49995785118425945, 0.49995767609442704, 0.49995750027725633, 0.4999573237297258, 0.49995714644880157, 0.499956968431437, 0.499956789674573, 0.4999566101751373, 0.4999564299300456, 0.49995624893620005, 0.4999560671904905, 0.49995588468979346, 0.49995570143097273, 0.49995551741087907, 0.4999553326263499, 0.49995514707420974, 0.49995496075127005, 0.49995477365432867, 0.49995458578017044, 0.4999543971255666, 0.4999542076872753, 0.4999540174620409, 0.49995382644659453, 0.49995363463765324, 0.4999534420319211, 0.49995324862608803, 0.4999530544168304, 0.4999528594008107, 0.4999526635746776, 0.49995246693506573, 0.49995226947859595, 0.49995207120187496, 0.49995187210149516, 0.4999516721740351, 0.4999514714160592, 0.49995126982411725, 0.49995106739474493, 0.49995086412446343, 0.49995066000977956, 0.49995045504718566, 0.49995024923315956, 0.4999500425641639, 0.49994983503664747, 0.4999496266470438, 0.49994941739177157, 0.4999492072672349, 0.49994899626982264, 0.499948784395909, 0.4999485716418528, 0.4999483580039977, 0.49994814347867234, 0.4999479280621904, 0.4999477117508497, 0.499947494540933, 0.4999472764287075, 0.4999470574104249, 0.4999468374823214, 0.4999466166406175, 0.4999463948815181, 0.49994617220121207, 0.499945948595873, 0.4999457240616577, 0.49994549859470805, 0.49994527219114915, 0.49994504484709024, 0.4999448165586244, 0.4999445873218285, 0.49994435713276325, 0.4999441259874725, 0.4999438938819844, 0.4999436608123099, 0.49994342677444376, 0.4999431917643642, 0.4999429557780322, 0.49994271881139274, 0.49994248086037335, 0.49994224192088477, 0.4999420019888208, 0.49994176106005844, 0.4999415191304571, 0.49994127619585915, 0.4999410322520901, 0.4999407872949573, 0.4999405413202514, 0.49994029432374526, 0.4999400463011944, 0.4999397972483363, 0.499939547160891, 0.499939296034561, 0.4999390438650303, 0.4999387906479656, 0.4999385363790154, 0.49993828105380983, 0.4999380246679614, 0.49993776721706396, 0.49993750869669307, 0.49993724910240633, 0.4999369884297424, 0.49993672667422173, 0.4999364638313459, 0.49993619989659804, 0.49993593486544247, 0.49993566873332446, 0.4999354014956707, 0.4999351331478885, 0.49993486368536644, 0.4999345931034737, 0.49993432139756044, 0.4999340485629572, 0.4999337745949757, 0.49993349948890725, 0.49993322324002437, 0.4999329458435799, 0.4999326672948064, 0.49993238758891734, 0.49993210672110583, 0.49993182468654507, 0.4999315414803883, 0.49993125709776876, 0.4999309715337991, 0.4999306847835721, 0.4999303968421598, 0.49993010770461405, 0.49992981736596587, 0.49992952582122585, 0.4999292330653837, 0.49992893909340846, 0.49992864390024844, 0.49992834748083026, 0.4999280498300602, 0.4999277509428232, 0.49992745081398265, 0.49992714943838096, 0.4999268468108391, 0.4999265429261561, 0.4999262377791098, 0.4999259313644565, 0.49992562367693005, 0.49992531471124313, 0.499925004462086, 0.499924692924127, 0.4999243800920123, 0.49992406596036604, 0.49992375052378973, 0.4999234337768627, 0.49992311571414144, 0.49992279633016024, 0.49992247561943015, 0.4999221535764401, 0.4999218301956557, 0.49992150547151953, 0.49992117939845115, 0.4999208519708471, 0.49992052318308045, 0.499920193029501, 0.4999198615044351, 0.49991952860218536, 0.4999191943170309, 0.499918858643227, 0.49991852157500516, 0.49991818310657266, 0.4999178432321132, 0.4999175019457859, 0.4999171592417254, 0.4999168151140428, 0.4999164695568241, 0.4999161225641308, 0.4999157741299999, 0.4999154242484435, 0.4999150729134488, 0.49991472011897825, 0.49991436585896887, 0.49991401012733294, 0.499913652917957, 0.49991329422470243, 0.4999129340414051, 0.4999125723618752, 0.49991220917989726, 0.49991184448923004, 0.4999114782836063, 0.49991111055673276, 0.4999107413022899, 0.4999103705139323, 0.49990999818528786, 0.4999096243099581, 0.4999092488815178, 0.49990887189351535, 0.4999084933394721, 0.49990811321288287, 0.4999077315072148, 0.4999073482159084, 0.49990696333237683, 0.4999065768500058, 0.4999061887621537, 0.49990579906215105, 0.49990540774330106, 0.49990501479887867, 0.4999046202221312, 0.499904224006278, 0.4999038261445097, 0.4999034266299894, 0.49990302545585136, 0.4999026226152012, 0.4999022181011162, 0.4999018119066446, 0.4999014040248064, 0.4999009944485916, 0.499900583170962, 0.4999001701848495, 0.4998997554831571, 0.499899339058758, 0.4998989209044962, 0.49989850101318534, 0.4998980793776097, 0.49989765599052355, 0.4998972308446508, 0.4998968039326856, 0.49989637524729114, 0.4998959447811005, 0.4998955125267162, 0.49989507847670994, 0.49989464262362243, 0.4998942049599636, 0.4998937654782122, 0.49989332417081567, 0.4998928810301901, 0.49989243604872025, 0.4998919892187588, 0.4998915405326273, 0.4998910899826147, 0.49989063756097873, 0.4998901832599441, 0.4998897270717039, 0.4998892689884182, 0.4998888090022152, 0.49988834710518976, 0.4998878832894043, 0.49988741754688804, 0.4998869498696372, 0.49988648024961474, 0.49988600867875016, 0.4998855351489396, 0.4998850596520453, 0.499884582179896, 0.49988410272428613, 0.49988362127697644, 0.4998831378296931, 0.49988265237412804, 0.49988216490193865, 0.4998816754047478, 0.4998811838741435, 0.4998806903016786, 0.49988019467887124, 0.49987969699720397, 0.4998791972481242, 0.49987869542304364, 0.49987819151333845, 0.4998776855103489, 0.4998771774053794, 0.4998766671896981, 0.49987615485453685, 0.49987564039109117, 0.49987512379052, 0.4998746050439457, 0.4998740841424534, 0.4998735610770913, 0.4998730358388707, 0.4998725084187654, 0.4998719788077115, 0.4998714469966076, 0.49987091297631464, 0.4998703767376554, 0.4998698382714146, 0.4998692975683387, 0.49986875461913566, 0.49986820941447485, 0.49986766194498705, 0.49986711220126373, 0.49986656017385783, 0.4998660058532824, 0.49986544923001164, 0.49986489029447995, 0.4998643290370819, 0.4998637654481724, 0.49986319951806607, 0.4998626312370374, 0.4998620605953204, 0.49986148758310867, 0.4998609121905549, 0.49986033440777095, 0.49985975422482753, 0.4998591716317545, 0.4998585866185395, 0.49985799917512935, 0.4998574092914288, 0.4998568169573007, 0.4998562221625656, 0.4998556248970021, 0.4998550251503461, 0.4998544229122909, 0.4998538181724871, 0.4998532109205421, 0.4998526011460204, 0.499851988838443, 0.4998513739872872, 0.4998507565819868, 0.49985013661193184, 0.49984951406646805, 0.4998488889348968, 0.49984826120647546, 0.4998476308704162, 0.4998469979158868, 0.4998463623320101, 0.4998457241078632, 0.4998450832324784, 0.4998444396948423, 0.49984379348389574, 0.49984314458853313, 0.4998424929976038, 0.49984183869990967, 0.49984118168420666, 0.4998405219392041, 0.4998398594535643, 0.4998391942159022, 0.49983852621478586, 0.49983785543873555, 0.49983718187622383, 0.4998365055156759, 0.49983582634546797, 0.499835144353929, 0.4998344595293386, 0.499833771859928, 0.4998330813338799, 0.49983238793932727, 0.4998316916643543, 0.4998309924969954, 0.4998302904252354, 0.499829585437009, 0.49982887752020116, 0.49982816666264634, 0.49982745285212826, 0.4998267360763802, 0.49982601632308404, 0.49982529357987127, 0.4998245678343212, 0.49982383907396205, 0.4998231072862699, 0.49982237245866906, 0.49982163457853135, 0.49982089363317656, 0.49982014960987126, 0.4998194024958295, 0.49981865227821204, 0.4998178989441263, 0.49981714248062653, 0.49981638287471253, 0.49981562011333064, 0.4998148541833728, 0.49981408507167635, 0.499813312765024, 0.49981253725014396, 0.49981175851370874, 0.4998109765423359, 0.4998101913225869, 0.4998094028409682, 0.4998086110839294, 0.4998078160378642, 0.4998070176891098, 0.49980621602394637, 0.4998054110285974, 0.499804602689229, 0.49980379099195, 0.49980297592281103, 0.4998021574678052, 0.4998013356128676, 0.4998005103438744, 0.49979968164664335, 0.49979884950693326, 0.4997980139104438, 0.49979717484281533, 0.49979633228962833, 0.4997954862364035, 0.49979463666860147, 0.4997937835716224, 0.49979292693080574, 0.4997920667314301, 0.49979120295871293, 0.4997903355978103, 0.49978946463381657, 0.49978859005176424, 0.4997877118366236, 0.4997868299733024, 0.4997859444466459, 0.49978505524143635, 0.49978416234239254, 0.49978326573417026, 0.499782365401361, 0.4997814613284927, 0.49978055350002876, 0.4997796419003682, 0.4997787265138452, 0.49977780732472865, 0.4997768843172224, 0.4997759574754645, 0.49977502678352714, 0.49977409222541647, 0.49977315378507187, 0.49977221144636635, 0.49977126519310594, 0.49977031500902913, 0.49976936087780693, 0.4997684027830426, 0.49976744070827134, 0.49976647463695983, 0.4997655045525061, 0.4997645304382393, 0.49976355227741925, 0.49976257005323627, 0.4997615837488107, 0.4997605933471929, 0.49975959883136273, 0.49975860018422963, 0.49975759738863185, 0.49975659042733606, 0.4997555792830378, 0.4997545639383605, 0.4997535443758555, 0.4997525205780015, 0.49975149252720474, 0.49975046020579783, 0.4997494235960405, 0.4997483826801186, 0.499747337440144, 0.49974628785815406, 0.49974523391611186, 0.4997441755959054, 0.4997431128793475, 0.49974204574817505, 0.4997409741840497, 0.49973989816855646, 0.4997388176832041, 0.49973773270942434, 0.49973664322857203, 0.49973554922192437, 0.49973445067068073, 0.49973334755596277, 0.49973223985881315, 0.49973112756019616, 0.4997300106409972, 0.49972888908202173, 0.49972776286399573, 0.4997266319675653, 0.4997254963732959, 0.49972435606167226, 0.4997232110130983, 0.49972206120789625, 0.4997209066263067, 0.4997197472484882, 0.49971858305451666, 0.49971741402438563, 0.49971624013800536, 0.4997150613752023, 0.49971387771571973, 0.49971268913921624, 0.4997114956252661, 0.4997102971533591, 0.49970909370289923, 0.4997078852532052, 0.49970667178350986, 0.49970545327295973, 0.4997042297006146, 0.4997030010454477, 0.4997017672863442, 0.49970052840210216, 0.49969928437143135, 0.499698035172953, 0.4996967807851998, 0.499695521186615, 0.4996942563555523, 0.49969298627027575, 0.4996917109089588, 0.4996904302496847, 0.4996891442704448, 0.4996878529491399, 0.4996865562635788, 0.49968525419147747, 0.4996839467104602, 0.49968263379805783, 0.49968131543170796, 0.4996799915887545, 0.4996786622464472, 0.49967732738194126, 0.49967598697229715, 0.49967464099448, 0.49967328942535894, 0.49967193224170753, 0.49967056942020244, 0.4996692009374237, 0.4996678267698537, 0.49966644689387774, 0.4996650612857825, 0.49966366992175626, 0.49966227277788866, 0.4996608698301695, 0.4996594610544894, 0.49965804642663847, 0.49965662592230625, 0.4996551995170817, 0.49965376718645177, 0.499652328905802, 0.4996508846504155, 0.49964943439547305, 0.4996479781160516, 0.4996465157871254, 0.499645047383564, 0.4996435728801332, 0.4996420922514937, 0.49964060547220074, 0.4996391125167042, 0.49963761335934753, 0.49963610797436786, 0.4996345963358953, 0.4996330784179521, 0.49963155419445304, 0.4996300236392044, 0.4996284867259036, 0.4996269434281389, 0.4996253937193886, 0.49962383757302115, 0.49962227496229406, 0.49962070586035395, 0.4996191302402361, 0.4996175480748633, 0.49961595933704617, 0.4996143639994822, 0.4996127620347556, 0.49961115341533674, 0.49960953811358166, 0.49960791610173116, 0.49960628735191115, 0.49960465183613173, 0.4996030095262865, 0.4996013603941525, 0.4995997044113893, 0.4995980415495391, 0.4995963717800257, 0.499594695074154, 0.49959301140310997, 0.4995913207379598, 0.4995896230496495, 0.49958791830900445, 0.49958620648672863, 0.4995844875534044, 0.49958276147949215, 0.4995810282353292, 0.49957928779113003, 0.4995775401169849, 0.4995757851828605, 0.4995740229585982, 0.4995722534139141, 0.4995704765183989, 0.4995686922415167, 0.49956690055260466, 0.49956510142087285, 0.4995632948154032, 0.49956148070514944, 0.499559659058936, 0.499557829845458, 0.49955599303328074, 0.4995541485908386, 0.49955229648643484, 0.49955043668824123, 0.4995485691642973, 0.4995466938825097, 0.49954481081065194, 0.49954291991636346, 0.4995410211671495, 0.4995391145303799, 0.49953719997328955, 0.49953527746297666, 0.4995333469664032, 0.49953140845039373, 0.499529461881635, 0.49952750722667516, 0.4995255444519238, 0.4995235735236508, 0.4995215944079858, 0.4995196070709179, 0.4995176114782948, 0.4995156075958226, 0.49951359538906454, 0.499511574823441, 0.49950954586422897, 0.4995075084765607, 0.4995054626254239, 0.49950340827566087, 0.49950134539196794, 0.4994992739388944, 0.49949719388084246, 0.4994951051820666, 0.4994930078066729, 0.4994909017186178, 0.4994887868817087, 0.4994866632596022, 0.4994845308158042, 0.49948238951366847, 0.49948023931639735, 0.4994780801870398, 0.4994759120884913, 0.49947373498349346, 0.49947154883463274, 0.49946935360434075, 0.4994671492548923, 0.4994649357484061, 0.4994627130468432, 0.49946048111200675, 0.4994582399055412, 0.49945598938893176, 0.49945372952350336, 0.49945146027042064, 0.49944918159068674, 0.4994468934451427, 0.4994445957944672, 0.49944228859917505, 0.49943997181961786, 0.49943764541598173, 0.4994353093482878, 0.4994329635763909, 0.49943060805997946, 0.49942824275857417, 0.4994258676315276, 0.49942348263802355, 0.49942108773707616, 0.49941868288752944, 0.49941626804805633, 0.4994138431771582, 0.499411408233164, 0.49940896317422945, 0.4994065079583366, 0.4994040425432931, 0.49940156688673093, 0.4993990809461064, 0.499396584678699, 0.49939407804161057, 0.4993915609917653, 0.4993890334859079, 0.49938649548060327, 0.4993839469322367, 0.49938138779701147, 0.49937881803094947, 0.49937623758988947, 0.4993736464294871, 0.4993710445052138, 0.49936843177235585, 0.49936580818601384, 0.499363173701102, 0.4993605282723471, 0.4993578718542878, 0.4993552044012743, 0.4993525258674667, 0.49934983620683493, 0.4993471353731577, 0.4993444233200216, 0.4993417000008206, 0.49933896536875494, 0.4993362193768304, 0.49933346197785783, 0.4993306931244518, 0.49932791276902994, 0.49932512086381264, 0.4993223173608214, 0.49931950221187865, 0.4993166753686067, 0.4993138367824267, 0.4993109864045583, 0.49930812418601817, 0.49930525007761994, 0.4993023640299725, 0.49929946599347985, 0.49929655591833977, 0.4992936337545433, 0.4992906994518737, 0.49928775295990585, 0.49928479422800465, 0.49928182320532516, 0.499278839840811, 0.4992758440831938, 0.4992728358809921, 0.4992698151825108, 0.49926678193583995, 0.4992637360888537, 0.4992606775892102, 0.49925760638434974, 0.4992545224214946, 0.4992514256476475, 0.49924831600959124, 0.49924519345388757, 0.4992420579268762, 0.49923890937467374, 0.49923574774317336, 0.49923257297804335, 0.49922938502472597, 0.4992261838284375, 0.4992229693341659, 0.4992197414866711, 0.4992165002304836, 0.4992132455099032, 0.4992099772689987, 0.49920669545160606, 0.49920340000132835, 0.49920009086153433, 0.4991967679753572, 0.49919343128569454, 0.4991900807352059, 0.49918671626631345, 0.4991833378211998, 0.4991799453418074, 0.49917653876983753, 0.49917311804674946, 0.4991696831137591, 0.4991662339118383, 0.4991627703817137, 0.49915929246386564, 0.4991558000985273, 0.49915229322568355, 0.49914877178506994, 0.4991452357161719, 0.49914168495822325, 0.4991381194502056, 0.49913453913084666, 0.4991309439386202, 0.4991273338117441, 0.49912370868817973, 0.4991200685056305, 0.49911641320154143, 0.4991127427130974, 0.4991090569772227, 0.4991053559305789, 0.49910163950956543, 0.4990979076503169, 0.4990941602887026, 0.499090397360326, 0.49908661880052235, 0.4990828245443589, 0.49907901452663284, 0.4990751886818707, 0.4990713469443266, 0.4990674892479822, 0.49906361552654466, 0.49905972571344553, 0.49905581974184043, 0.49905189754460655, 0.499047959054343, 0.4990440042033685, 0.4990400329237205, 0.4990360451471547, 0.4990320408051429, 0.4990280198288723, 0.4990239821492442, 0.4990199276968731, 0.49901585640208523, 0.49901176819491727, 0.49900766300511556, 0.4990035407621341, 0.4989994013951345, 0.49899524483298363, 0.4989910710042531, 0.49898687983721784, 0.4989826712598546, 0.4989784451998415, 0.4989742015845557, 0.498969940341073, 0.498965661396166, 0.49896136467630364, 0.4989570501076489, 0.4989527176160583, 0.4989483671270806, 0.4989439985659548, 0.4989396118576097, 0.4989352069266622, 0.4989307836974163, 0.4989263420938611, 0.4989218820396702, 0.49891740345820046, 0.4989129062724899, 0.49890839040525725, 0.49890385577889995, 0.49889930231549307, 0.4988947299367884, 0.49889013856421244, 0.4988855281188653, 0.4988808985215191, 0.49887624969261757, 0.4988715815522734, 0.4988668940202677, 0.4988621870160482, 0.49885746045872814, 0.4988527142670848, 0.4988479483595582, 0.4988431626542493, 0.49883835706891916, 0.498833531520987, 0.49882868592752927, 0.4988238202052778, 0.4988189342706185, 0.4988140280395902, 0.4988091014278829, 0.49880415435083625, 0.4987991867234385, 0.4987941984603244, 0.4987891894757747, 0.4987841596837136, 0.4987791089977081, 0.4987740373309658, 0.4987689445963343, 0.4987638307062988, 0.49875869557298114, 0.49875353910813824, 0.49874836122316024, 0.49874316182906936, 0.49873794083651857, 0.4987326981557891, 0.4987274336967899, 0.4987221473690557, 0.49871683908174547, 0.49871150874364084, 0.4987061562631444, 0.4987007815482786, 0.4986953845066836, 0.49868996504561597, 0.49868452307194716, 0.49867905849216176, 0.49867357121235584, 0.4986680611382356, 0.4986625281751155, 0.49865697222791683, 0.49865139320116564, 0.4986457909989917, 0.4986401655251266, 0.49863451668290193, 0.4986288443752479, 0.4986231485046915, 0.49861742897335487, 0.49861168568295333, 0.49860591853479447, 0.49860012742977566, 0.49859431226838263, 0.4985884729506878, 0.4985826093763488, 0.4985767214446061, 0.49857080905428186, 0.498564872103778, 0.4985589104910745, 0.49855292411372737, 0.49854691286886765, 0.4985408766531983, 0.49853481536299415, 0.4985287288940984, 0.49852261714192214, 0.49851648000144194, 0.4985103173671982, 0.4985041291332931, 0.49849791519338915, 0.49849167544070744, 0.498485409768025, 0.498479118067674, 0.49847280023153895, 0.49846645615105595, 0.4984600857172096, 0.49845368882053204, 0.4984472653511008, 0.4984408151985365, 0.4984343382520018, 0.49842783440019867, 0.49842130353136666, 0.49841474553328174, 0.49840816029325324, 0.49840154769812267, 0.49839490763426164, 0.4983882399875694, 0.498381544643472, 0.49837482148691886, 0.49836807040238223, 0.4983612912738541, 0.4983544839848448, 0.49834764841838075, 0.4983407844570029, 0.49833389198276395, 0.49832697087722677, 0.49832002102146256, 0.4983130422960485, 0.49830603458106565, 0.49829899775609715, 0.4982919317002259, 0.49828483629203274, 0.4982777114095942, 0.4982705569304804, 0.49826337273175286, 0.4982561586899628, 0.4982489146811487, 0.49824164058083376, 0.4982343362640247, 0.498227001605209, 0.49821963647835277, 0.4982122407568987, 0.4982048143137642, 0.4981973570213381, 0.49818986875148, 0.49818234937551725, 0.4981747987642422, 0.4981672167879115, 0.49815960331624204, 0.4981519582184103, 0.49814428136304917, 0.4981365726182459, 0.4981288318515401, 0.49812105892992126, 0.4981132537198261, 0.4981054160871373, 0.4980975458971799, 0.4980896430147199, 0.49808170730396184, 0.498073738628546, 0.49806573685154654, 0.49805770183546905, 0.49804963344224795, 0.49804153153324415, 0.4980333959692433, 0.49802522661045223, 0.4980170233164978, 0.4980087859464236, 0.49800051435868786, 0.49799220841116115, 0.4979838679611237, 0.49797549286526305, 0.49796708297967135, 0.4979586381598437, 0.49795015826067457, 0.497941643136456, 0.497933092640875, 0.4979245066270107, 0.49791588494733247, 0.497907227453697, 0.4978985339973451, 0.49788980442890096, 0.49788103859836735, 0.4978722363551248, 0.497863397547928, 0.49785452202490404, 0.4978456096335488, 0.497836660220725, 0.4978276736326596, 0.49781864971494094, 0.49780958831251587, 0.4978004892696878, 0.4977913524301132, 0.4977821776367995, 0.49777296473210214, 0.4977637135577219, 0.49775442395470243, 0.4977450957634269, 0.49773572882361583, 0.4977263229743244, 0.4977168780539392, 0.4977073939001759, 0.4976978703500759, 0.49768830724000424, 0.49767870440564665, 0.49766906168200603, 0.4976593789034006, 0.4976496559034603, 0.4976398925151242, 0.49763008857063795, 0.4976202439015506, 0.4976103583387112, 0.4976004317122671, 0.4975904638516599, 0.49758045458562317, 0.4975704037421793, 0.4975603111486365, 0.49755017663158624, 0.4975400000168992, 0.49752978112972374, 0.49751951979448206, 0.49750921583486707, 0.49749886907383967, 0.49748847933362594, 0.4974780464357134, 0.49746757020084853, 0.4974570504490337, 0.49744648699952354, 0.4974358796708226, 0.49742522828068136, 0.4974145326460939, 0.49740379258329476, 0.4973930079077546, 0.49738217843417865, 0.4973713039765023, 0.4973603843478889, 0.49734941936072574, 0.4973384088266211, 0.4973273525564011, 0.49731625036010657, 0.4973051020469894, 0.4972939074255097, 0.49728266630333234, 0.4972713784873234, 0.4972600437835475, 0.49724866199726353, 0.4972372329329222, 0.49722575639416233, 0.4972142321838075, 0.49720266010386255, 0.4971910399555101, 0.49717937153910785, 0.4971676546541842, 0.49715588909943537, 0.497144074672722, 0.4971322111710652, 0.4971202983906437, 0.49710833612678984, 0.4970963241739863, 0.4970842623258626, 0.4970721503751915, 0.4970599881138853, 0.4970477753329926, 0.4970355118226946, 0.49702319737230105, 0.49701083177024746, 0.4969984148040908, 0.49698594626050624, 0.49697342592528326, 0.4969608535833221, 0.49694822901863, 0.4969355520143178, 0.4969228223525956, 0.4969100398147696, 0.4968972041812382, 0.496884315231488, 0.4968713727440903, 0.4968583764966974, 0.49684532626603806, 0.49683222182791487, 0.49681906295719935, 0.49680584942782857, 0.4967925810128013, 0.4967792574841738, 0.4967658786130565, 0.4967524441696093, 0.4967389539230383, 0.4967254076415916, 0.4967118050925553, 0.49669814604224927, 0.4966844302560238, 0.496670657498255, 0.49665682753234086, 0.49664294012069765, 0.49662899502475505, 0.4966149920049528, 0.49660093082073603, 0.49658681123055176, 0.49657263299184434, 0.496558395861051, 0.4965440995935985, 0.49652974394389815, 0.49651532866534237, 0.49650085351029943, 0.4964863182301105, 0.4964717225750842, 0.4964570662944929, 0.49644234913656865, 0.49642757084849837, 0.49641273117641976, 0.49639782986541686, 0.49638286665951575, 0.49636784130168043, 0.49635275353380787, 0.4963376030967241, 0.49632238973017917, 0.49630711317284343, 0.4962917731623026, 0.4962763694350535, 0.4962609017264993, 0.49624536977094497, 0.49622977330159307, 0.496214112050539, 0.4961983857487663, 0.49618259412614224, 0.496166736911413, 0.49615081383219917, 0.4961348246149912, 0.4961187689851444, 0.49610264666687426, 0.4960864573832524, 0.4960702008562007, 0.4960538768064877, 0.49603748495372285, 0.4960210250163524, 0.49600449671165436, 0.4959878997557332, 0.4959712338635162, 0.4959544987487471, 0.4959376941239821, 0.4959208197005848, 0.49590387518872137, 0.4958868602973551, 0.4958697747342419, 0.4958526182059252, 0.49583539041773095, 0.49581809107376223, 0.49580071987689495, 0.4957832765287718, 0.4957657607297979, 0.4957481721791353, 0.4957305105746983, 0.49571277561314747, 0.4956949669898852, 0.4956770843990503, 0.49565912753351243, 0.49564109608486756, 0.49562298974343183, 0.49560480819823693, 0.4955865511370243, 0.4955682182462404, 0.49554980921103087, 0.49553132371523506, 0.4955127614413811, 0.49549412207068, 0.4954754052830208, 0.4954566107569641, 0.49543773816973774, 0.49541878719723054, 0.4953997575139868, 0.49538064879320115, 0.49536146070671266, 0.49534219292499915, 0.49532284511717173, 0.49530341695096936, 0.4952839080927527, 0.4952643182074986, 0.4952446469587948, 0.49522489400883324, 0.49520505901840545, 0.4951851416468957, 0.4951651415522761, 0.4951450583910999, 0.4951248918184964, 0.49510464148816447, 0.49508430705236706, 0.4950638881619248, 0.4950433844662108, 0.4950227956131439, 0.4950021212491828, 0.4949813610193206, 0.49496051456707796, 0.4949395815344976, 0.49491856156213787, 0.4948974542890669, 0.4948762593528559, 0.4948549763895739, 0.4948336050337804, 0.49481214491852027, 0.4947905956753165, 0.4947689569341647, 0.4947472283235264, 0.49472540947032245, 0.49470349999992747, 0.49468149953616275, 0.49465940770128997, 0.4946372241160051, 0.49461494839943126, 0.4945925801691133, 0.4945701190410101, 0.49454756462948873, 0.49452491654731795, 0.49450217440566097, 0.49447933781406955, 0.49445640638047694, 0.4944333797111911, 0.49441025741088873, 0.49438703908260734, 0.49436372432773956, 0.49434031274602575, 0.4943168039355475, 0.49429319749272055, 0.4942694930122882, 0.494245690087314, 0.4942217883091752, 0.49419778726755553, 0.4941736865504387, 0.4941494857441004, 0.4941251844331026, 0.49410078220028514, 0.4940762786267596, 0.494051673291902, 0.494026965773345, 0.49400215564697153, 0.4939772424869072, 0.49395222586551296, 0.4939271053533781, 0.4939018805193129, 0.49387655093034083, 0.4938511161516919, 0.4938255757467949, 0.49379992927727007, 0.4937741763029213, 0.49374831638172934, 0.49372234906984347, 0.49369627392157467, 0.4936700904893879, 0.4936437983238939, 0.4936173969738423, 0.49359088598611384, 0.49356426490571204, 0.49353753327575617, 0.49351069063747344, 0.4934837365301909, 0.49345667049132735, 0.49342949205638664, 0.4934022007589483, 0.4933747961306607, 0.49334727770123293, 0.4933196449984264, 0.4932918975480468, 0.49326403487393694, 0.49323605649796765, 0.4932079619400303, 0.4931797507180281, 0.49315142234786846, 0.4931229763434549, 0.493094412216678, 0.49306572947740773, 0.4930369276334853, 0.4930080061907143, 0.4929789646528525, 0.49294980252160386, 0.4929205192966095, 0.4928911144754395, 0.4928615875535842, 0.4928319380244463, 0.49280216537933125, 0.4927722691074396, 0.4927422486958576, 0.4927121036295489, 0.49268183339134614, 0.49265143746194145, 0.4926209153198783, 0.4925902664415422, 0.4925594903011523, 0.4925285863707522, 0.4924975541202011, 0.49246639301716466, 0.49243510252710654, 0.4924036821132786, 0.4923721312367126, 0.49234044935621024, 0.4923086359283348, 0.4922766904074019, 0.49224461224546956, 0.49221240089232954, 0.49218005579549795, 0.4921475764002058, 0.49211496214939016, 0.4920822124836838, 0.4920493268414064, 0.4920163046585551, 0.4919831453687947, 0.4919498484034483, 0.49191641319148743, 0.491882839159523, 0.49184912573179507, 0.4918152723301631, 0.4917812783740967, 0.4917471432806657, 0.49171286646452994, 0.49167844733792965, 0.4916438853106758, 0.49160917979013996, 0.49157433018124386, 0.4915393358864505, 0.4915041963057526, 0.49146891083666383, 0.4914334788742081, 0.49139789981090926, 0.491362173036781, 0.49132629793931676, 0.49129027390347935, 0.49125410031169037, 0.49121777654382015, 0.4911813019771769, 0.4911446759864971, 0.49110789794393406, 0.49107096721904764, 0.491033883178794, 0.4909966451875146, 0.4909592526069258, 0.4909217047961079, 0.49088400111149455, 0.49084614090686185, 0.49080812353331754, 0.4907699483392901, 0.4907316146705182, 0.4906931218700389, 0.4906544692781775, 0.4906156562325359, 0.49057668206798166, 0.4905375461166373, 0.4904982477078683, 0.4904587861682725, 0.4904191608216687, 0.490379370989085, 0.4903394159887481, 0.4902992951360712, 0.4902590077436428, 0.49021855312121565, 0.4901779305756947, 0.49013713941112524, 0.49009617892868207, 0.4900550484266575, 0.4900137472004492, 0.48997227454254927, 0.4899306297425314, 0.4898888120870401, 0.4898468208597778, 0.48980465534149376, 0.48976231480997146, 0.48971979854001685, 0.48967710580344637, 0.48963423586907423, 0.48959118800270085, 0.4895479614671008, 0.48950455552200955, 0.48946096942411216, 0.48941720242703024, 0.48937325378130997, 0.48932912273440937, 0.48928480853068596, 0.4892403104113841, 0.48919562761462226, 0.48915075937538066, 0.48910570492548827, 0.48906046349361015, 0.489015034305235, 0.4889694165826617, 0.48892360954498676, 0.4888776124080913, 0.4888314243846281, 0.4887850446840086, 0.48873847251238944, 0.4886917070726599, 0.4886447475644282, 0.4885975931840083, 0.48855024312440715, 0.48850269657531054, 0.4884549527230702, 0.48840701075069026, 0.48835886983781385, 0.4883105291607091, 0.4882619878922561, 0.48821324520193304, 0.48816430025580204, 0.4881151522164964, 0.48806580024320595, 0.4880162434916631, 0.4879664811141299, 0.4879165122593828, 0.48786633607269986, 0.4878159516958457, 0.4877653582670577, 0.4877145549210322, 0.4876635407889097, 0.4876123149982611, 0.4875608766730726, 0.4875092249337324, 0.4874573588970152, 0.4874052776760684, 0.48735298038039715, 0.48730046611585015, 0.4872477339846046, 0.48719478308515146, 0.48714161251228116, 0.4870882213570682, 0.4870346087068568, 0.48698077364524556, 0.48692671525207265, 0.48687243260340074, 0.4868179247715018, 0.4867631908248425, 0.4867082298280678, 0.4866530408419872, 0.4865976229235582, 0.48654197512587144, 0.4864860964981354, 0.4864299860856605, 0.48637364292984403, 0.48631706606815406, 0.4862602545341141, 0.48620320735728745, 0.4861459235632611, 0.48608840217363014, 0.4860306422059819, 0.48597264267387974, 0.4859144025868476, 0.48585592095035307, 0.48579719676579236, 0.4857382290304732, 0.4856790167375989, 0.48561955887625224, 0.4855598544313792, 0.48549990238377216, 0.4854397017100536, 0.4853792513826595, 0.4853185503698235, 0.48525759763555887, 0.4851963921396429, 0.4851349328375999, 0.4850732186806841, 0.48501124861586337, 0.48494902158580105, 0.4848865365288409, 0.48482379237898815, 0.4847607880658933, 0.48469752251483517, 0.4846339946467029, 0.4845702033779792, 0.484506147620723, 0.4844418262825519, 0.4843772382666244, 0.4843123824716229, 0.484247257791736, 0.4841818631166403, 0.4841161973314836, 0.484050259316866, 0.4839840479488234, 0.4839175620988082, 0.48385080063367236, 0.4837837624156492, 0.4837164463023347, 0.4836488511466699, 0.48358097579692305, 0.4835128190966704, 0.4834443798847785, 0.4833756569953857, 0.48330664925788347, 0.4832373554968986, 0.48316777453227344, 0.4830979051790484, 0.4830277462474425, 0.482957296542835, 0.48288655486574633, 0.48281552001181977, 0.48274419077180136, 0.482672565931522, 0.48260064427187793, 0.48252842456881156, 0.4824559055932925, 0.48238308611129765, 0.4823099648837931, 0.482236540666713, 0.48216281221094226, 0.482088778262295, 0.48201443756149615, 0.48193978884416144, 0.48186483084077814, 0.4817895622766844, 0.4817139818720502, 0.4816380883418574, 0.4815618803958792, 0.48148535673866083, 0.481408516069499, 0.481331357082422, 0.48125387846616935, 0.48117607890417174, 0.4810979570745303, 0.48101951164999684, 0.48094074129795256, 0.4808616446803882, 0.4807822204538835, 0.48070246726958576, 0.4806223837731901, 0.480541968604918, 0.48046122039949674, 0.4803801377861387, 0.48029871938851987, 0.4802169638247592, 0.48013486970739766, 0.48005243564337685, 0.4799696602340172, 0.47988654207499826, 0.4798030797563357, 0.4797192718623609, 0.47963511697169914, 0.47955061365724805, 0.47946576048615636, 0.4793805560198019, 0.4792949988137698, 0.4792090874178311, 0.4791228203759207, 0.4790361962261155, 0.47894921350061215, 0.4788618707257058, 0.47877416642176707, 0.4786860991032207, 0.4785976672785226, 0.4785088694501384, 0.4784197041145204, 0.4783301697620856, 0.4782402648771932, 0.47814998793812175, 0.4780593374170472, 0.4779683117800198, 0.4778769094869413, 0.4777851289915428, 0.47769296874136113, 0.47760042717771695, 0.4775075027356907, 0.47741419384410055, 0.4773204989254791, 0.4772264163960496, 0.4771319446657039, 0.4770370821379784, 0.4769418272100312, 0.4768461782726184, 0.4767501337100709, 0.476653691900271, 0.476556851214629, 0.47645961001805903, 0.47636196666895614, 0.4762639195191722, 0.4761654669139923, 0.4760666071921109, 0.475967338685608, 0.47586765971992523, 0.4757675686138416, 0.47566706367945055, 0.4755661432221342, 0.4754648055405404, 0.4753630489265586, 0.47526087166529485, 0.475158272035048, 0.4750552483072856, 0.4749517987466189, 0.4748479216107786, 0.47474361515059094, 0.4746388776099521, 0.47453370722580474, 0.47442810222811216, 0.4743220608398348, 0.4742155812769048, 0.4741086617482009, 0.47400130045552435, 0.47389349559357374, 0.47378524534992, 0.47367654790498126, 0.4735674014319979, 0.4734578040970078, 0.4733477540588206, 0.47323724946899337, 0.4731262884718044, 0.4730148692042287, 0.4729029897959124, 0.47279064836914725, 0.47267784303884575, 0.4725645719125153, 0.47245083309023245, 0.47233662466461823, 0.47222194472081197, 0.47210679133644556, 0.4719911625816186, 0.4718750565188719, 0.4717584712031623, 0.4716414046818366, 0.4715238549946062, 0.4714058201735206, 0.4712872982429425, 0.471168287219521, 0.47104878511216614, 0.47092878992202303, 0.47080829964244575, 0.47068731225897126, 0.47056582574929345, 0.4704438380832371, 0.4703213472227315, 0.47019835112178504, 0.47007484772645847, 0.4699508349748386, 0.4698263107970124, 0.46970127311504134, 0.4695757198429337, 0.4694496488866198, 0.46932305814392483, 0.4691959455045428, 0.4690683088500104, 0.4689401460536802, 0.4688114549806947, 0.46868223348796, 0.4685524794241191, 0.4684221906295255, 0.4682913649362172, 0.46816000016788994, 0.4680280941398707, 0.4678956446590917, 0.4677626495240634, 0.4676291065248484, 0.46749501344303496, 0.46736036805171033, 0.46722516811543435, 0.4670894113902135, 0.4669530956234733, 0.4668162185540334, 0.46667877791207923, 0.46654077141913763, 0.4664021967880484, 0.46626305172293947, 0.4661233339191994, 0.4659830410634514, 0.46584217083352714, 0.46570072089843967, 0.4655586889183576, 0.46541607254457856, 0.46527286941950297, 0.4651290771766073, 0.46498469344041815, 0.4648397158264859, 0.4646941419413585, 0.4645479693825549, 0.46440119573853916, 0.4642538185886939, 0.46410583550329504, 0.46395724404348443, 0.46380804176124474, 0.4636582261993728, 0.4635077948914542, 0.46335674536183663, 0.46320507512560444, 0.46305278168855285, 0.4628998625471615, 0.46274631518856923, 0.46259213709054814, 0.4624373257214781, 0.4622818785403207, 0.46212579299659423, 0.46196906653034764, 0.4618116965721355, 0.4616536805429923, 0.46149501585440733, 0.4613356999082994, 0.461175730096992, 0.461015103803187, 0.46085381839994144, 0.46069187125064087, 0.46052925970897557, 0.46036598111891514, 0.46020203281468447, 0.46003741212073845, 0.4598721163517377, 0.4597061428125241, 0.4595394887980967, 0.4593721515935873, 0.45920412847423625, 0.45903541670536846, 0.4588660135423696, 0.4586959162306622, 0.45852512200568196, 0.4583536280928542, 0.45818143170757025, 0.45800853005516456, 0.457834920330891, 0.4576605997199001, 0.4574855653972155, 0.45730981452771235, 0.4571333442660934, 0.45695615175686716, 0.4567782341343253, 0.45659958852252025, 0.4564202120352438, 0.45624010177600416, 0.45605925483800497, 0.4558776683041236, 0.4556953392468892, 0.45551226472846207, 0.45532844180061227, 0.4551438675046988, 0.4549585388716485, 0.4547724529219361, 0.4545856066655636, 0.45439799710203993, 0.4542096212203612, 0.454020475998991, 0.45383055840584063, 0.4536398653982501, 0.4534483939229684, 0.45325614091613514, 0.453063103303262, 0.4528692779992135, 0.4526746619081896, 0.4524792519237073, 0.45228304492858273, 0.4520860377949145, 0.45188822738406514, 0.45168961054664547, 0.4514901841224967, 0.451289944940675, 0.45108888981943457, 0.450887015566212, 0.45068431897761096, 0.4504807968393861, 0.45027644592642846, 0.4500712630027514, 0.44986524482147455, 0.449658388124811, 0.4494506896440533, 0.4492421460995594, 0.4490327542007399, 0.448822510646045, 0.44861141212295214, 0.4483994553079538, 0.4481866368665458, 0.44797295345321547, 0.4477584017114309, 0.44754297827363004, 0.44732667976121054, 0.4471095027845192, 0.4468914439428435, 0.446672499824401, 0.4464526670063316, 0.44623194205468875, 0.4460103215244313, 0.44578780195941664, 0.4455643798923925, 0.4453400518449911, 0.4451148143277226, 0.4448886638399692, 0.4446615968699802, 0.44443360989486635, 0.4442046993805961, 0.4439748617819917, 0.44374409354272504, 0.4435123910953153, 0.44327975086112653, 0.44304616925036505, 0.442811642662079, 0.4425761674841563, 0.4423397400933252, 0.44210235685515414, 0.4418640141240522, 0.44162470824327077, 0.44138443554490525, 0.44114319234989713, 0.44090097496803765, 0.44065777969797104, 0.4404136028271984, 0.44016844063208316, 0.43992228937785577, 0.4396751453186209, 0.4394270046973625, 0.4391778637459529, 0.4389277186851594, 0.4386765657246537, 0.4384244010630214, 0.4381712208877713, 0.43791702137534644, 0.4376617986911364, 0.43740554898948797, 0.43714826841371957, 0.43688995309613354, 0.4366305991580312, 0.4363702027097285, 0.4361087598505706, 0.4358462666689502, 0.4355827192423235, 0.4353181136372296, 0.43505244590930914, 0.43478571210332434, 0.4345179082531799, 0.43424903038194457, 0.4339790745018734, 0.4337080366144317, 0.43343591271031867, 0.4331626987694935, 0.4328883907612001, 0.4326129846439953, 0.4323364763657764, 0.43205886186380993, 0.4317801370647614, 0.431500297884727, 0.4312193402292643, 0.4309372599934258, 0.4306540530617927, 0.43036971530850926, 0.4300842425973199, 0.42979763078160466, 0.42950987570441873, 0.4292209731985303, 0.42893091908646197, 0.4286397091805315, 0.42834733928289415, 0.42805380518558683, 0.4277591026705726, 0.42746322750978666, 0.42716617546518365, 0.426867942288786, 0.4265685237227335, 0.4262679154993342, 0.4259661133411162, 0.42566311296088166, 0.42535891006176074, 0.4250535003372681, 0.42474687947136003, 0.4244390431384926, 0.4241299870036826, 0.4238197067225679, 0.4235081979414707, 0.42319545629746175, 0.4228814774184252, 0.4225662569231268, 0.42224979042128113, 0.421932073513622, 0.4216131017919744, 0.42129287083932654, 0.420971376229905, 0.4206486135292504, 0.42032457829429504, 0.4199992660734421, 0.41967267240664674, 0.41934479282549797, 0.41901562285330285, 0.4186851580051727, 0.41835339378811004, 0.4180203257010976, 0.41768594923518987, 0.41735025987360497, 0.4170132530918191, 0.4166749243576634, 0.41633526913142105, 0.41599428286592766, 0.4156519610066726, 0.4153082989919028, 0.41496329225272804, 0.4146169362132284, 0.4142692262905632, 0.41392015789508285, 0.41356972643044165, 0.41321792729371354, 0.4128647558755086, 0.41251020756009316, 0.4121542777255112, 0.41179696174370706, 0.4114382549806523, 0.41107815279647253, 0.4107166505455778, 0.4103537435767954, 0.40998942723350296, 0.4096236968537662, 0.4092565477704776, 0.4088879753114972, 0.4085179747997971, 0.40814654155360647, 0.4077736708865605, 0.40739935810785066, 0.4070235985223779, 0.4066463874309088, 0.4062677201302329, 0.4058875919133234, 0.4055059980695012, 0.405122933884599, 0.4047383946411311, 0.4043523756184634, 0.4039648720929868, 0.4035758793382946, 0.40318539262535985, 0.4027934072227182, 0.4023999183966516, 0.4020049214113758, 0.4016084115292304, 0.40121038401087133, 0.4008108341154673, 0.40040975710089743, 0.4000071482239538, 0.39960300274054517, 0.3991973159059051, 0.3987900829748024, 0.39838129920175414, 0.397970959841243, 0.3975590601479368, 0.39714559537691174, 0.3967305607838777, 0.3963139516254086, 0.39589576315917424, 0.39547599064417654, 0.3950546293409883, 0.3946316745119959, 0.3942071214216453, 0.393780965336691, 0.3933532015264488, 0.3929238252630518, 0.3924928318217103, 0.3920602164809748, 0.39162597452300235, 0.3911901012338279, 0.39075259190363704, 0.39031344182704386, 0.38987264630337337, 0.3894302006369447, 0.3889861001373614, 0.3885403401198031, 0.38809291590532224, 0.38764382282114457, 0.3871930562009726, 0.38674061138529464, 0.3862864837216961, 0.3858306685651756, 0.38537316127846577, 0.38491395723235633, 0.3844530518060233, 0.3839904403873609, 0.38352611837331807, 0.3830600811702399, 0.38259232419421146, 0.38212284287140835, 0.38165163263844953, 0.3811786889427554, 0.38070400724291076, 0.3802275830090303, 0.379749411723131, 0.3792694888795075, 0.3787878099851117, 0.37830437055993865, 0.37781916613741484, 0.37733219226479275, 0.37684344450354973, 0.3763529184297906, 0.3758606096346564, 0.37536651372473717, 0.37487062632248896, 0.3743729430666575, 0.3738734596127045, 0.3733721716332402, 0.37286907481846104, 0.37236416487659124, 0.37185743753433054, 0.3713488885373059, 0.37083851365052906, 0.3703263086588593, 0.3698122693674703, 0.36929639160232375, 0.3687786712106464, 0.3682591040614139, 0.36773768604583923, 0.36721441307786623, 0.36668928109466903, 0.3661622860571563, 0.36563342395048104, 0.3651026907845569, 0.3645700825945774, 0.3640355954415441, 0.36349922541279656, 0.3629609686225513, 0.3624208212124442, 0.36187877935207896, 0.3613348392395819, 0.36078899710216134, 0.3602412491966736, 0.3596915918101948, 0.3591400212605971, 0.35858653389713235, 0.3580311261010211, 0.3574737942860465, 0.3569145348991553, 0.35635334442106437, 0.35579021936687233, 0.3552251562866789, 0.3546581517662081, 0.35408920242743924, 0.3535183049292428, 0.35294545596802246, 0.3523706522783646, 0.351793890633691, 0.351215167846921, 0.35063448077113685, 0.35005182630025733, 0.34946720136971654, 0.3488806029571485, 0.3482920280830792, 0.3477014738116234, 0.3471089372511886, 0.34651441555518503, 0.34591790592274196, 0.34531940559942936, 0.3447189118779879, 0.34411642209906257, 0.34351193365194477, 0.34290544397531936, 0.3422969505580187, 0.341686450939783, 0.34107394271202607, 0.34045942351860886, 0.3398428910566178, 0.3392243430771505, 0.33860377738610753, 0.33798119184498987, 0.33735658437170407, 0.33672995294137165, 0.33610129558714685, 0.3354706104010399, 0.3348378955347453, 0.3342031492004791, 0.3335663696718196, 0.33292755528455603, 0.3322867044375433, 0.33164381559356193, 0.3309988872801857, 0.33035191809065423, 0.3297029066847518, 0.32905185178969365, 0.3283987522010167, 0.327743606783477, 0.32708641447195397, 0.326427174272359, 0.32576588526255246, 0.3251025465932636, 0.3244371574890191, 0.32376971724907655, 0.32310022524836285, 0.3224286809384202, 0.32175508384835594, 0.3210794335857997, 0.32040172983786586, 0.31972197237212013, 0.31904016103755445, 0.3183562957655648, 0.3176703765709357, 0.3169824035528308, 0.3162923768957866, 0.31560029687071406, 0.3149061638359032, 0.3142099782380342, 0.3135117406131937, 0.3128114515878943, 0.312109111880101, 0.31140472230026195, 0.31069828375234293, 0.309989797234868, 0.30927926384196325, 0.3085666847644059, 0.30785206129067866, 0.30713539480802565, 0.30641668680351575, 0.30569593886510776, 0.3049731526827201, 0.3042483300493057, 0.3035214728619281, 0.30279258312284396, 0.30206166294058684, 0.3013287145310557, 0.30059374021860674, 0.2998567424371469, 0.2991177237312329, 0.29837668675717044, 0.29763363428411793, 0.29688856919519285, 0.296141494488579, 0.29539241327863824, 0.2946413287970223, 0.29388824439378786, 0.29313316353851393, 0.2923760898214188, 0.2916170269544807, 0.2908559787725592, 0.29009294923451623, 0.2893279424243411, 0.28856096255227315, 0.28779201395592674, 0.2870211011014173, 0.2862482285844852, 0.2854734011316224, 0.28469662360119663, 0.28391790098457653, 0.2831372384072565, 0.28235464112997866, 0.28157011454985675, 0.28078366420149586, 0.2799952957581125, 0.2792050150326532, 0.27841282797890876, 0.27761874069263, 0.27682275941263695, 0.27602489052192863, 0.2752251405487887, 0.2744235161678871, 0.2736200242013792, 0.2728146716200016, 0.27200746554416216, 0.27119841324502775, 0.270387522145606, 0.2695747998218226, 0.2687602540035941, 0.2679438925758945, 0.2671257235798156, 0.2663057552136227, 0.26548399583380305, 0.2646604539561072, 0.26383513825658583, 0.2630080575726146, 0.26217922090391593, 0.2613486374135706, 0.2605163164290211, 0.2596822674430678, 0.25884650011485316, 0.2580090242708396, 0.25716984990577635, 0.2563289871836555, 0.2554864464386607, 0.25464223817609993, 0.25379637307333186, 0.25294886198067845, 0.25209971592232533, 0.2512489460972127, 0.2503965638799085, 0.24954258082147307, 0.24868700865030857, 0.2478298592729937, 0.24697114477510723, 0.24611087742203158, 0.24524906965974633, 0.2443857341156039, 0.24352088359908933, 0.2426545311025635, 0.24178668980199208, 0.24091737305765223, 0.2400465944148264, 0.23917436760447613, 0.23830070654389623, 0.23742562533735354, 0.2365491382767009, 0.235671259841976, 0.23479200470197767, 0.23391138771482117, 0.23302942392847464, 0.23214612858126946, 0.23126151710239276, 0.23037560511235478, 0.22948840842343363, 0.22859994304009837, 0.2277102251594036, 0.22681927117136397, 0.22592709765930155, 0.2250337214001677, 0.2241391593648408, 0.22324342871839378, 0.22234654682033847, 0.2214485312248409, 0.220549399680908, 0.21964917013254898, 0.21874786071890262, 0.21784548977434, 0.21694207582853542, 0.21603763760650618, 0.21513219402862463, 0.21422576421059417, 0.2133183674633976, 0.21241002329321124, 0.21150075140128652, 0.21059057168380013, 0.20967950423166615, 0.20876756933031868, 0.20785478745945715, 0.20694117929275693, 0.20602676569754605, 0.20511156773444195, 0.20419560665695569, 0.2032789039110571, 0.20236148113470248, 0.20144336015732653, 0.20052456299929125, 0.19960511187130112, 0.1986850291737759, 0.1977643374961848, 0.1968430596163399, 0.19592121849965105, 0.19499883729833545, 0.1940759393505903, 0.19315254817972138, 0.19222868749322916, 0.19130438118185497, 0.19037965331857912, 0.18945452815758057, 0.18852903013315037, 0.1876031838585607, 0.18667701412489202, 0.18575054589981077, 0.18482380432630605, 0.18389681472137875, 0.1829696025746849, 0.18204219354713477, 0.18111461346944108, 0.18018688834062513, 0.17925904432647302, 0.1783311077579452, 0.17740310512954022, 0.17647506309760602, 0.17554700847860788, 0.17461896824734569, 0.17369096953512234, 0.17276303962786618, 0.17183520596419938, 0.170907496133462, 0.16997993787368457, 0.16905255906951078, 0.16812538775007357, 0.16719845208681608, 0.16627178039126805, 0.16534540111276969, 0.16441934283614573, 0.1634936342793314, 0.16256830429094432, 0.16164338184781007, 0.16071889605243633, 0.15979487613043591, 0.15887135142790262, 0.15794835140873245, 0.15702590565189906, 0.15610404384867738, 0.15518279579981728, 0.1542621914126697, 0.15334226069825904, 0.15242303376831023, 0.15150454083222473, 0.1505868121940077, 0.1496698782491459, 0.14875376948143945, 0.14783851645978055, 0.14692414983488886, 0.1460107003359966, 0.1450981987674865, 0.14418667600548482, 0.14327616299440274, 0.14236669074343689, 0.1414582903230203, 0.14055099286122916, 0.1396448295401458, 0.138739831592173, 0.13783603029630873, 0.1369334569743747, 0.13603214298720218, 0.1351321197307775, 0.13423341863234098, 0.13333607114644921, 0.13244010875099435, 0.13154556294318334, 0.1306524652354802, 0.12976084715150474, 0.1288707402218985, 0.12798217598015063, 0.12709518595838765, 0.12620980168312979, 0.12532605467100796, 0.12444397642445136, 0.1235635984273395, 0.12268495214062212, 0.12180806899791007, 0.12093298040103113, 0.12005971771556095, 0.1191883122663234, 0.11831879533286295, 0.11745119814489326, 0.11658555187771591, 0.1157218876476186, 0.11486023650724868, 0.11400062944096351, 0.11314309736016283, 0.11228767109859618, 0.11143438140765621, 0.11058325895165212, 0.10973433430306671, 0.10888763793780036, 0.10804320023039683, 0.10720105144926069, 0.10636122175186119, 0.10552374117992624, 0.10468863965462766, 0.10385594697176048, 0.10302569279691229, 0.10219790666063196, 0.10137261795359268, 0.10054985592175346, 0.0997296496615213, 0.09891202811491118, 0.09809702006471126, 0.09728465412965054, 0.09647495875957145, 0.095667962230611, 0.09486369264038608, 0.09406217790319231, 0.09326344574521238, 0.09246752369973632, 0.09167443910239856, 0.09088421908642628, 0.0900968905779091, 0.08931248029108547, 0.08853101472364941, 0.08775252015208099, 0.08697702262699623, 0.08620454796852611, 0.08543512176171993, 0.08466876935197676, 0.08390551584050868, 0.08314538607983109, 0.08238840466929, 0.08163459595062149, 0.08088398400354721, 0.08013659264140924, 0.07939244540684015, 0.0786515655674778, 0.07791397611171966, 0.07717969974452181, 0.07644875888324418, 0.0757211756535392, 0.07499697188529275, 0.07427616910861247, 0.0735587885498678, 0.07284485112778459, 0.07213437744959024, 0.07142738780721837, 0.0707239021735688, 0.07002394019882631, 0.06932752120684105, 0.06863466419156727, 0.06794538781356807, 0.06725971039658307, 0.06657764992416176, 0.06589922403636363, 0.06522445002652837, 0.06455334483811212, 0.06388592506159822, 0.06322220693147819, 0.06256220632330631, 0.06190593875083031, 0.06125341936319465, 0.06060466294222395, 0.05995968389978301, 0.05931849627521597, 0.05868111373286727, 0.058047549559680875, 0.057417816662885146, 0.056791927567759304, 0.05616989441548433, 0.055551728961080765, 0.05493744257142949, 0.05432704622338281, 0.05372055050196167, 0.053117965598641986, 0.052519301309731495, 0.05192456703483434, 0.051333771775409195, 0.05074692413341782, 0.05016403231006573, 0.04958510410463723, 0.04901014691342103, 0.04843916772873266, 0.04787217313803004, 0.04730916932312371, 0.046750162059484145, 0.04619515671564174, 0.04564415825268569, 0.045097171223857986, 0.04455419977424395, 0.04401524764056085, 0.043480318151041135, 0.04294941422541531, 0.04242253837499094, 0.041899692702828874, 0.04138087890401832, 0.0408660982660465, 0.0403553516692685, 0.03984863958747278, 0.039345962088543934, 0.03884731883522368, 0.038352709085965976, 0.03786213169589108, 0.03737558511783462, 0.0368930674034927, 0.03641457620466228, 0.03594010877457767, 0.0354696619693395, 0.03500323224943985, 0.0345408156813802, 0.034082407939381915, 0.03362800430719076, 0.03317759967997056, 0.03273118856629046, 0.03228876509020126, 0.03185032299340152, 0.03141585563749344, 0.03098535600632469, 0.030558816708419513, 0.030136229979494927, 0.02971758768506234, 0.029302881323114476, 0.0288921020268936, 0.02848524056774413, 0.028082287358045386, 0.02768323245422467, 0.0272880655598501, 0.02689677602879953, 0.026509352868508026, 0.026125784743289814, 0.02574605997773444, 0.025370166560176755, 0.024998092146236734, 0.024629824062431322, 0.024265349309854457, 0.023904654567924455, 0.0235477261981986, 0.02319455024825056, 0.02284511245561289, 0.022499398251780454, 0.02215739276627412, 0.021819080830764098, 0.021484446983248782, 0.021153475472291097, 0.020826150261307932, 0.020502455032912283, 0.020182373193307034, 0.0198658878767264, 0.01955298194992675, 0.01924363801672253, 0.018937838422566612, 0.018635565259174036, 0.01833680036918529, 0.01804152535087034, 0.017749721562869487, 0.01746137012897036, 0.01717645194291874, 0.01689494767326275, 0.016616837768226075, 0.016342102460611792, 0.016070721772732496, 0.015802675521366084, 0.015537943322735783, 0.01527650459751088, 0.015018338575829066, 0.014763424302336403, 0.014511740641244235, 0.01426326628140154, 0.014017979741379343, 0.013775859374567845, 0.013536883374282683, 0.013301029778879219, 0.013068276476873716, 0.01283860121206794, 0.012611981588677743, 0.01238839507646237, 0.012167819015853043, 0.011950230623080116, 0.011735606995295063, 0.011523925115688135, 0.011315161858598315, 0.0111092939946143, 0.010906298195665765, 0.010706151040101386, 0.010508829017754349, 0.010314308534992062, 0.010122565919749173, 0.009933577426542673, 0.00974731924146627, 0.009563767487164261, 0.00938289822778224, 0.009204687473893343, 0.00902911118739928, 0.008856145286403251, 0.008685765650055166, 0.008517948123366426, 0.008352668521993355, 0.008189902636988393, 0.008029626239516379, 0.007871815085536422, 0.007716444920446767, 0.0075634914836917875, 0.007412930513330374, 0.00726473775056326, 0.007118888944219733, 0.006975359855201357, 0.006834126260882079, 0.0066951639594634935, 0.006558448774284615, 0.006423956558084003, 0.006291663197214737, 0.006161544615810072, 0.006033576779899322, 0.005907735701473206, 0.005783997442496886, 0.0056623381188710955, 0.005542733904339486, 0.005425161034341806, 0.005309595809812306, 0.005196014600921778, 0.005084393850763713, 0.004974710078982877, 0.004866939885346078, 0.004761059953254607, 0.004657047053197031, 0.004554878046142787, 0.00445452988687519, 0.004355979627263669, 0.004259204419474907, 0.004164181519121715, 0.004070888288350172, 0.003979302198863897, 0.0038894008348853005, 0.0038011618960536978, 0.0037145632002592768, 0.0036295826864135585, 0.0035461984171553376, 0.00346438858149218, 0.0033841314973773917, 0.0033054056142217364, 0.0032281895153404927, 0.0031524619203351775, 0.0030782016874099914, 0.003005387815623142, 0.0029339994470724156, 0.0028640158690157328, 0.0027954165159261323, 0.002728180971481433, 0.0026622889704887623, 0.0025977204007435776, 0.0025344553048239227, 0.0024724738818195837, 0.0024117564889965114, 0.0023522836433966165, 0.002294036023373314, 0.002236994470062679, 0.0021811399887909696, 0.0021264537504184274, 0.002072917092619788, 0.0020205115211019468, 0.0019692187107587613, 0.0019190205067638624, 0.0018698989256014968, 0.0018218361560359217, 0.0017748145600199356, 0.001728816673542614, 0.0016838252074172144, 0.0016398230480093928, 0.0015967932579063475, 0.0015547190765275456, 0.001513583920677241, 0.0014733713850398065, 0.0014340652426181023, 0.0013956494451156255, 0.0013581081232631432, 0.0013214255870901293, 0.0012855863261420734, 0.0012505750096440088, 0.0012163764866110385, 0.0011829757859066457, 0.0011503581162492218, 0.0011185088661678764, 0.0010874136039079987, 0.0010570580772874016, 0.0010274282135038768, 0.0009985101188946853, 0.0009702900786490746, 0.0009427545564743721, 0.0009158901942165193, 0.0008896838114359246, 0.0008641224049392439, 0.0008391931482681613, 0.0008148833911458174, 0.0007911806588817682, 0.0007680726517363789, 0.0007455472442453311, 0.00072359248450531, 0.0007021965934215735, 0.0006813479639183107, 0.0006610351601127136, 0.0006412469164534706, 0.0006219721368247694, 0.0006031998936165215, 0.0005849194267617526, 0.0005671201427420216, 0.000549791613561797, 0.0005329235756925485, 0.0005165059289876043, 0.0005005287355685303, 0.0004849822186839624, 0.00046985676154179994, 0.0004551429061155386, 0.000440831351925767, 0.00042691295479759125, 0.00041337872559490263, 0.00040021982893239223, 0.0003874275818660779, 0.00037499345256334716, 0.0003629090589532719, 0.0003511661673580862, 0.00033975669110671155, 0.0003286726891310809, 0.00031790636454622547, 0.00030745006321486695, 0.0002972962722973778, 0.0002874376187879527, 0.00027786686803773104, 0.0002685769222657804, 0.000259560819058665, 0.00025081172985941746, 0.00024232295844671666, 0.00023408793940498667, 0.00022610023658626557, 0.00021835354156454038, 0.00021084167208331584, 0.0002035585704971777, 0.00019649830220801808, 0.00018965505409672252, 0.0001830231329509648, 0.0001765969638898331, 0.00017037108878598459, 0.00016434016468596144, 0.0001584989622293925, 0.00015284236406768953, 0.0001473653632828964, 0.00014206306180733304, 0.00013693066884461335, 0.0001319634992926963, 0.00012715697216952626, 0.00012250660904185483, 0.00011800803245782831, 0.00011365696438386089, 0.00010944922464638507, 0.00010538072937897498, 0.00010144748947537639, 9.764560904894437e-05, 9.39712838989919e-05, 9.042079998450245e-05, 8.69905319057084e-05, 8.367694139396325e-05, 8.047657581035488e-05, 7.73860666534957e-05, 7.440212807688029e-05, 7.152155541624119e-05, 6.874122372726767e-05, 6.605808633406884e-05, 6.346917338874936e-05, 6.0971590442424163e-05, 5.856251702803507e-05, 5.623920525526921e-05, 5.3998978417895355e-05, 5.183922961381937e-05, 4.975742037812418e-05, 4.775107932938559e-05, 4.581780082950617e-05, 4.395524365731518e-05, 4.216112969617264e-05, 4.0433242635781046e-05, 3.87694266884328e-05, 3.716758531987129e-05, 3.5625679994956067e-05, 3.4141728938303683e-05, 3.271380591005418e-05, 3.1340038996924045e-05, 3.0018609418670295e-05, 2.8747750350094393e-05, 2.7525745758701458e-05, 2.6350929258107647e-05, 2.5221682977299672e-05, 2.4136436445816954e-05, 2.309366549492992e-05, 2.209189117487618e-05, 2.1129678688196738e-05, 2.0205636339221307e-05, 1.9318414499725162e-05, 1.8466704590779902e-05, 1.7649238080811105e-05, 1.686478549985789e-05, 1.6112155470035416e-05, 1.5390193752177734e-05, 1.4697782308638695e-05, 1.4033838382219013e-05, 1.3397313591173613e-05, 1.2787193040256663e-05, 1.2202494447742752e-05, 1.164226728836181e-05, 1.110559195207575e-05, 1.0591578918620012e-05, 1.0099367947720875e-05, 9.628127284901892e-06, 9.177052882777381e-06, 8.745367637730182e-06, 8.332320641864306e-06, 7.937186450113761e-06, 7.559264362390345e-06, 7.1978777206406455e-06, 6.85237322068221e-06, 6.52212023868289e-06, 6.20651017214045e-06, 5.904955795220283e-06, 5.616890628299552e-06, 5.341768321565277e-06, 5.079062052510106e-06, 4.828263937163156e-06, 4.588884454895077e-06, 4.360451886628234e-06, 4.142511766283126e-06, 3.934626345289053e-06, 3.7363740699825406e-06, 3.5473490717184564e-06, 3.3671606695128993e-06, 3.1954328850371916e-06, 3.031803969780386e-06, 2.875925944194535e-06, 2.727464148638533e-06, 2.5860968059321367e-06, 2.451514595332529e-06, 2.3234202377447305e-06, 2.2015280919751987e-06, 2.085563761839718e-06, 1.9752637139339804e-06, 1.8703749058763581e-06, 1.770654424832199e-06, 1.6758691361279792e-06, 1.5857953417657056e-06, 1.5002184486463957e-06, 1.4189326463130925e-06, 1.3417405940242367e-06, 1.268453116968279e-06, 1.1988889114325217e-06, 1.1328742587388226e-06, 1.0702427477605897e-06, 1.0108350058366076e-06, 9.544984378979077e-07, 9.010869736263203e-07, 8.504608224636954e-07, 8.024862362930037e-07, 7.570352796138776e-07, 7.139856070370878e-07, 6.732202479237176e-07, 6.346273979974687e-07, 5.98100217759646e-07, 5.635366375388382e-07, 5.308391690092901e-07, 4.999147230137569e-07, 4.7067443352937606e-07, 4.4303348761670083e-07, 4.1691096119464974e-07, 3.922296604863716e-07, 3.689159689831378e-07, 3.468996997761634e-07, 3.261139531082317e-07, 3.064949789996693e-07, 2.8798204480567203e-07, 2.705173075642489e-07, 2.540456909968982e-07, 2.385147670263023e-07, 2.2387464167804043e-07, 2.1007784523584852e-07, 1.9707922652234421e-07, 1.8483585117994597e-07, 1.7330690382899892e-07, 1.6245359398283196e-07, 1.5223906560198236e-07, 1.4262831017228058e-07, 1.3358808319419623e-07, 1.2508682397318075e-07, 1.170945786033746e-07, 1.095829260395224e-07, 1.025249071543513e-07, 9.589495668127148e-08, 8.966883794456172e-08, 8.382358028171104e-08, 7.833741906498268e-08, 7.318973823158879e-08, 6.836101523431555e-08, 6.383276832667463e-08, 5.9587506098999244e-08, 5.5608679184183296e-08, 5.188063405395104e-08, 4.838856882883245e-08, 4.511849102712049e-08, 4.205717718027598e-08, 3.9192134244349544e-08, 3.651156273904002e-08, 3.400432154810075e-08, 3.165989431675933e-08, 2.9468357383816507e-08, 2.7420349188013844e-08, 2.5507041090162347e-08, 2.372010955436379e-08, 2.205170963351246e-08, 2.049444970601276e-08, 1.9041367412416953e-08, 1.7685906742390408e-08, 1.6421896224068653e-08, 1.524352816952785e-08, 1.4145338931658069e-08, 1.3122190129298616e-08, 1.2169250799013114e-08, 1.1281980433349042e-08, 1.0456112866890687e-08, 9.687640972798689e-09, 8.972802133910829e-09, 8.308064453808147e-09, 7.690113674539384e-09, 7.1158407689695026e-09, 6.582330176928692e-09, 6.086848655535199e-09, 5.626834715218772e-09, 5.19988861408701e-09, 4.803762884371144e-09, 4.436353365733834e-09, 4.095690721245569e-09, 3.779932412825473e-09, 3.4873551138949745e-09, 3.2163475379251053e-09, 2.9654036624474987e-09, 2.7331163289682578e-09, 2.5181712000598297e-09, 2.3193410557117503e-09, 2.1354804118046084e-09, 1.965520444320195e-09, 1.8084642036287035e-09, 1.6633821038929712e-09, 1.529407673302369e-09, 1.4057335515007436e-09, 1.2916077211949743e-09, 1.186329961533413e-09, 1.0892485114217979e-09, 9.99756931498923e-10, 9.17291154030355e-10, 8.413267104897179e-10, 7.713761270905748e-10, 7.069864790043321e-10, 6.477370944522995e-10, 5.932374002955556e-10, 5.431249011615763e-10, 4.970632845460238e-10, 4.5474064470958196e-10, 4.1586781855526774e-10, 3.8017682702060247e-10, 3.474194158538346e-10, 3.173656899618448e-10, 2.8980283582274164e-10, 2.645339267471803e-10, 2.413768060499388e-10, 2.2016304345874684e-10, 2.0073696033947965e-10, 1.8295471955782493e-10, 1.666834760268103e-10, 1.5180058420770214e-10, 1.3819285903983383e-10, 1.25755886972234e-10, 1.1439338395796606e-10, 1.040165974506184e-10, 9.454374961186116e-11, 8.589951910018846e-11, 7.801455896357677e-11, 7.08250483038325e-11, 6.427227551780567e-11, 5.830225105079655e-11, 5.2865347720952265e-11, 4.7915966790106e-11, 4.341222806709818e-11, 3.9315682434134863e-11, 3.55910452855273e-11, 3.2205949461617827e-11, 2.9130716348831086e-11, 2.6338143900110384e-11, 2.3803310408576298e-11, 2.1503392941336885e-11, 1.941749941030062e-11, 1.7526513322636315e-11, 1.5812950315564966e-11, 1.4260825638540898e-11, 1.285553180079184e-11, 1.1583725653876255e-11, 1.0433224227446517e-11, 9.392908682049153e-12, 8.452635785638917e-12, 7.603156360691739e-12, 6.8360401865527535e-12, 6.1436068770197914e-12, 5.5188622863388956e-12, 4.955440027853142e-12, 4.4475477186328195e-12, 3.9899175906498224e-12, 3.5777611345171e-12, 3.206727465630895e-12, 2.872865124802866e-12, 2.5725870462538407e-12, 2.302638445240104e-12, 2.060067395692999e-12, 1.8421978851314e-12, 1.6466051498486934e-12, 1.4710931080389882e-12, 1.3136737221800802e-12, 1.1725481347029243e-12, 1.046089432796554e-12, 9.328269091916354e-13, 8.314316959806353e-13, 7.407036580198114e-13, 6.595594412682375e-13, 5.870215795899606e-13, 5.222085711259272e-13, 4.643258423673042e-13, 4.1265752456956095e-13, 3.6655897317396923e-13, 3.254499664789385e-13, 2.8880852496268207e-13, 2.561652974272717e-13, 2.2709846454000484e-13, 2.0122911441764817e-13, 1.7821704865412765e-13, 1.5775698065720705e-13, 1.3957509135393778e-13, 1.2342591026806617e-13, 1.0908949268397706e-13, 9.636886610692088e-14, 8.508772152537503e-14, 7.50883270924277e-14, 6.622964378303322e-14, 5.838562436613042e-14, 5.1443678666197686e-14, 4.530328958975076e-14, 3.987476576845744e-14, 3.507811793170179e-14, 3.084204727675765e-14, 2.7103035162133315e-14, 2.3804524417261725e-14, 2.0896183446419653e-14, 1.8333245113266828e-14, 1.6075913130937856e-14, 1.4088829356689333e-14, 1.2340596005157597e-14, 1.0803347355050315e-14, 9.452366035100442e-15, 8.265739440548569e-15, 7.224052255016853e-15, 6.310111438022188e-15, 5.508700388731826e-15, 4.806359314914683e-15, 4.191189125122657e-15, 3.652676424514066e-15, 3.181537432687727e-15, 2.7695788576191426e-15, 2.409573955214296e-15, 2.0951521809299086e-15, 1.820701000019558e-15, 1.581278567740034e-15, 1.372536121706179e-15, 1.1906490467666034e-15, 1.0322556794521007e-15, 8.944030152911243e-16, 7.744985690479527e-16, 6.702677161169961e-16, 5.797159136998496e-16, 5.010952637365008e-16, 4.328749365334201e-16, 3.737150252313709e-16, 3.2244344724690284e-16, 2.780355501038898e-16, 2.395961161043721e-16, 2.063434934896805e-16, 1.7759561148753535e-16, 1.527576632746551e-16, 1.3131126471540504e-16, 1.1280491804702162e-16, 9.684562872590652e-17, 8.309154065612794e-17, 7.124547019994257e-17, 6.1049232907675e-17, 5.227866897040229e-17, 4.4739284146777524e-17, 3.8262432482064e-17, 3.27019756478269e-17, 2.7931361295965785e-17, 2.3841069541441976e-17, 2.0336382654587148e-17, 1.7335438337055457e-17, 1.4767531648421083e-17, 1.2571634808176868e-17, 1.0695107779041167e-17, 9.092575794503991e-18, 7.724952873198979e-18, 6.558592907082005e-18, 5.564552156928878e-18, 4.7179489708441856e-18, 3.997408289229261e-18, 3.3845800395728628e-18, 2.8637218803328275e-18, 2.4213379461775284e-18, 2.0458662958020075e-18, 1.7274086851560684e-18, 1.4574970981147167e-18, 1.2288921765692805e-18, 1.0354093143705197e-18, 8.717687248870036e-19, 7.334662693682113e-19, 6.166622509787481e-19, 5.180857445005707e-19, 4.349523506705687e-19, 3.6489354255696605e-19, 3.0589601425298035e-19, 2.5624965386749293e-19, 2.1450294718025445e-19, 1.7942477881201677e-19, 1.4997173732975474e-19, 1.2526015199892807e-19, 1.0454219422346718e-19, 8.718546810982894e-20, 7.265559383878645e-20, 6.050135618869984e-20, 5.0342049996170685e-20, 4.1856705762543534e-20, 3.4774923064575313e-20, 2.886907782128714e-20, 2.394770260533989e-20, 1.9849867764009057e-20, 1.6440415740209526e-20, 1.3605922187399088e-20, 1.1251275714996876e-20, 9.296783783944771e-21, 7.675725743701247e-21, 6.332285564936404e-21, 5.2198067388190224e-21, 4.299320311744482e-21, 3.538304300637048e-21, 2.9096389591609453e-21, 2.390727686813219e-21, 1.962757918325983e-21, 1.6100802101468603e-21, 1.3196870488503304e-21, 1.0807757249541453e-21, 8.84382015208299e-22, 7.230734575619361e-22, 5.906927378069733e-22, 4.821431800727665e-22, 3.932095833048663e-22, 3.2040870552945165e-22, 2.6086459528158287e-22, 2.122047292120429e-22, 1.7247355722690574e-22, 1.4006059920294592e-22, 1.1364069542245788e-22, 9.212439923387766e-23, 7.461682601763041e-23, 6.038354664666279e-23, 4.8822344208935885e-23, 3.9439846547495953e-23, 3.183220989883796e-23, 2.566916542916262e-23, 2.0680854899791426e-23, 1.6646977524561987e-23, 1.3387850264708662e-23, 1.0757050835538153e-23, 8.635368680943111e-24, 6.925835884850728e-24, 5.549648931881436e-24, 4.442824665438473e-24, 3.553460782650351e-24, 2.8394936451541055e-24, 2.266864822967706e-24, 1.8080232551162774e-24, 1.4407027330377045e-24, 1.1469250331383222e-24, 9.121878130288815e-25, 7.24803651169412e-25, 5.753626100839986e-25, 4.562956544238802e-25, 3.6152033654561386e-25, 2.861535234623336e-25, 2.2627870444044225e-25, 1.7875769154057033e-25, 1.4107839189300591e-25, 1.112318616661464e-25, 8.761310653792675e-26, 6.894112086813527e-26, 5.419449809152274e-26, 4.255963148581328e-26, 3.3389084964040823e-26, 2.616817061029508e-26, 2.0488142032633867e-26, 1.6024715641094218e-26, 1.2520878327789569e-26, 9.773140122176438e-27, 7.620552742306242e-27, 5.9359465486213215e-27, 4.6189449493812995e-27, 3.590401483119317e-27, 2.787974434376605e-27, 2.162610042250326e-27, 1.6757506789505745e-27, 1.297120877490475e-27, 1.0029734577583943e-27, 7.747016069074292e-28, 5.977417240543073e-28, 4.607070414124356e-28, 3.547042138172887e-28, 2.72794816470472e-28, 2.095714837915146e-28, 1.608246457715619e-28, 1.2328078286254053e-28, 9.439707651732305e-29, 7.220048143930562e-29, 5.516174931517268e-29, 4.209692229608183e-29, 3.209039202661918e-29, 2.443487013254901e-29, 1.858460561337451e-29, 1.411896697752763e-29, 1.0714124869409886e-29, 8.121058392456957e-30, 6.148492435519562e-30, 4.649675627516612e-30, 3.512146218387372e-30, 2.6498198202366843e-30, 1.9968793309412427e-30, 1.5030620491375534e-30, 1.130028734747632e-30, 8.485695147948801e-31, 6.364562960778439e-31, 4.767940475869167e-31, 3.567565730167204e-31, 2.6661826506348176e-31, 1.990134347041856e-31, 1.4837040835519994e-31, 1.1047967728651466e-31, 8.216474454147876e-32, 6.103155271165868e-32, 4.527796579129103e-32, 3.354909001846701e-32, 2.482754027817681e-32, 1.8350314452849204e-32, 1.354590219627847e-32, 9.986762090667349e-33, 7.353456726712044e-33, 5.407619957362378e-33, 3.9716070549937356e-33, 2.9131951045469316e-33, 2.1340949744945474e-33, 1.5613363317352896e-33, 1.1408154836241275e-33, 8.324692970418193e-34, 6.066700674867806e-34, 4.415359544664629e-34, 3.2092708590192075e-34, 2.329544881698373e-34, 1.6887206402274202e-34, 1.222543046734154e-34, 8.838686218750657e-35, 6.381548287537678e-35, 4.6012598403723373e-35, 3.313121582646683e-35, 2.382349374306177e-35, 1.7107184206115408e-35, 1.2267445647954932e-35, 8.784757991092541e-36, 6.282073557809729e-36, 4.486124133869956e-36, 3.199131533480664e-36, 2.2781531895232506e-36, 1.620023202072555e-36, 1.1503883743444846e-36, 8.157369177812866e-37, 5.7761115162075136e-37, 4.084117827112519e-37, 2.883603949679454e-37, 2.0330357596428426e-37, 1.4312775927828961e-37, 1.0061658113311726e-37, 7.062841161699318e-38, 4.950520695740798e-38, 3.4648243851467167e-38, 2.421407129095975e-38, 1.6896936602381853e-38, 1.177332182165699e-38, 8.191024841971272e-39, 5.6901399687071776e-39, 3.946848132796795e-39, 2.73349265968503e-39, 1.890265014059625e-39, 1.305154772372144e-39, 8.997733088771169e-40, 6.193457918929138e-40, 4.256567098695161e-40, 2.920849533177444e-40, 2.0011492664650864e-40, 1.3688868725115848e-40, 9.349116570919203e-41, 6.375080702122356e-41, 4.340202942198147e-41, 2.950127295774334e-41, 2.0020501956900795e-41, 1.3564686530007786e-41, 9.175764327310464e-42, 6.196828971558109e-42, 4.1781940964209026e-42, 2.8125264269355182e-42, 1.8901251388827435e-42, 1.268140826050306e-42, 8.494237723657304e-43, 5.6801309501810556e-43, 3.791982213670707e-43, 2.5272326629165594e-43, 1.681481612951062e-43, 1.1168733824337567e-43, 7.405896306040754e-44, 4.90241547702987e-44, 3.239651729942759e-44, 2.1371704773186108e-44, 1.4074388461355496e-44, 9.252653734225863e-45, 6.072204144974021e-45, 3.978016249997315e-45, 2.6014993393368646e-45, 1.698301118016151e-45, 1.1067162753859436e-45, 7.19921804829571e-46, 4.674752028212872e-46, 3.030071157364474e-46, 1.9604909318407347e-46, 1.2661680785432749e-46, 8.1626115969013795e-47, 5.252606612068332e-47, 3.373846368190048e-47, 2.163102542727685e-47, 1.3842896573490468e-47, 8.842428771320344e-48, 5.63777254973527e-48, 3.58782752073985e-48, 2.2789784340402242e-48, 1.444874543729704e-48, 9.143193861084779e-49, 5.774842789798921e-49, 3.640436191362308e-49, 2.2905208890797705e-49, 1.4383984569797063e-49, 9.015395963135868e-50, 5.6395904003544905e-50, 3.520983395805378e-50, 2.193969235713581e-50, 1.364406254817418e-50, 8.468372173882909e-51, 5.245606128672745e-51, 3.242853669178517e-51, 2.0007432886184895e-51, 1.2319245899389979e-51, 7.570106661297172e-52, 4.64238717919322e-52, 2.8411787197764825e-52, 1.7352814294275242e-52, 1.0576738722582547e-52, 6.433398139183992e-53, 3.905100072867875e-53, 2.365501707801814e-53, 1.4299142116089188e-53, 8.625585027522411e-54, 5.1922456087214166e-54, 3.11893407825706e-54, 1.869552478992969e-54, 1.1182677556549128e-54, 6.67462370186023e-55, 3.975362716165698e-55, 2.3626090158152473e-55, 1.4010969661785464e-55, 8.29090364477125e-56, 4.895408827402699e-56, 2.884201223584169e-56, 1.6955386333767066e-56, 9.94560944204714e-57, 5.820934445665766e-57, 3.399285288221359e-57, 1.9806699159354958e-57, 1.1514952444822744e-57, 6.679342250016479e-58, 3.865651390586612e-58, 2.232158521994634e-58, 1.285987186935305e-58, 7.391854225707407e-59, 4.239075557068465e-59, 2.425413459071911e-59, 1.3845004578609662e-59, 7.884768276796035e-60, 4.479907777393063e-60, 2.539389399253237e-60, 1.4360361846299372e-60, 8.101642256473918e-61, 4.55982386328071e-61, 2.5602720086894702e-61, 1.434111365558394e-61, 8.013717898404859e-62, 4.467198822858253e-62, 2.484175144227722e-62, 1.3780674038283258e-62, 7.625979418031791e-63, 4.2097208818924273e-63, 2.3181367090399184e-63, 1.2733517922408032e-63, 6.977131511113068e-64, 3.813467677421347e-64, 2.07909042025996e-64, 1.1306607196535962e-64, 6.1332731292613245e-65, 3.3185534305111657e-65, 1.7910068544386575e-65, 9.64124241915219e-66, 5.176681638142941e-66, 2.77234943436488e-66, 1.480873215886134e-66, 7.88962760330119e-67, 4.192365600412249e-67, 2.221882517314653e-67, 1.1744582823876233e-67, 6.191614377718479e-68, 3.255481480556975e-68, 1.7071307461840462e-68, 8.927991079087112e-69, 4.656625172266642e-69, 2.422225254659618e-69, 1.2565466269741006e-69, 6.500677567089194e-70, 3.3538965278572826e-70, 1.7256263846807774e-70, 8.854111843790446e-71, 4.530429464097841e-71, 2.311664906377388e-71, 1.1762415121183468e-71, 5.96828011598779e-72, 3.0197980711186056e-72, 1.523623047744777e-72, 7.665544040264064e-73, 3.845644415408586e-73, 1.923759649403818e-73, 9.59583721782047e-74, 4.772655821530075e-74, 2.366885951404574e-74, 1.1703864470366002e-74, 5.770463746874423e-75, 2.836719229027441e-75, 1.3904036250288573e-75, 6.794836506893358e-76, 3.310742233673463e-76, 1.6083279072015785e-76, 7.7897103528533e-77, 3.761491574317122e-77, 1.8108626702482156e-77, 8.691447716353234e-78, 4.1588612598983446e-78, 1.9839327486660126e-78, 9.435048555424716e-79, 4.473222131308831e-79, 2.1142208550688784e-79, 9.961579585345739e-80, 4.678950147767834e-80, 2.19081315333222e-80, 1.0225706206661327e-80, 4.757805071174279e-81, 2.206681384020212e-81, 1.0202028581652727e-81, 4.701555866170115e-82, 2.15972792966271e-82, 9.889015577961016e-83, 4.513337600226646e-83, 2.0531820936237543e-83, 9.309709423460908e-84, 4.207439608130516e-84, 1.8952514425481166e-84, 8.508970312756915e-85, 3.8075220923293016e-85, 1.6980759250924967e-85, 7.547706437339822e-86, 3.343567282928929e-86, 1.4761695009916967e-86, 6.495123030071681e-87, 2.84811421082051e-87, 1.2446296195471114e-87, 5.420375797999153e-88, 2.3524423706957695e-88, 1.0174256655906882e-88, 4.385046767679026e-89, 1.8833339414711137e-89, 8.060383261294933e-90, 3.437581259460635e-90, 1.4608741853830603e-90, 6.186269435809497e-91, 2.610325157927848e-91, 1.0974979265331257e-91, 4.597795625736247e-92, 1.9192253822454983e-92, 7.98226489019998e-93, 3.307833082243761e-93, 1.3657517194082655e-93, 5.618288576755423e-94, 2.3026812065892713e-94, 9.402739861748138e-95, 3.825244253405029e-95, 1.5503914163761354e-95, 6.2602868365750675e-96, 2.5183206946458504e-96, 1.0092179467487693e-96, 4.029110695422995e-97, 1.6024219476162945e-97, 6.348646408216589e-98, 2.5056191156534657e-98, 9.850804238690513e-99, 3.857838799601336e-99, 1.5049609155812932e-99, 5.848009870673342e-100, 2.26352684219737e-100, 8.726715006654319e-101, 3.351169665313067e-101, 1.2817855602585419e-101, 4.883154850009468e-102, 1.8528684166708982e-102, 7.002294765907208e-103, 2.635607073436124e-103, 9.880026583013322e-104, 3.688632697932475e-104, 1.3714980897083917e-104, 5.078554472582714e-105, 1.872805694581915e-105, 6.877737245779166e-106, 2.5153082521227316e-106, 9.16056203688118e-107, 3.322238106099379e-107, 1.1998019158629688e-107, 4.314702996043568e-108, 1.5450665415430138e-108, 5.509227815953486e-109, 1.9560224751366453e-109, 6.914945900722182e-110, 2.4340405517673302e-110, 8.530669486094158e-111, 2.976780972684448e-111, 1.0342159879908599e-111, 3.5774067678619246e-112, 1.2319985282358894e-112, 4.224048397639291e-113, 1.4418378591585572e-113, 4.899646918501369e-114, 1.6575472212449362e-114, 5.5822812133064605e-115, 1.8715182448930397e-115, 6.246040803086464e-116, 2.075084448594963e-116, 6.862442476411471e-117, 2.25904760427324e-117, 7.402313600846459e-118, 2.414330284115415e-118, 7.83798858337377e-119, 2.532695142329007e-119, 8.145600814831228e-120, 2.607454732096995e-120, 8.307213622560564e-121, 2.6340886678446147e-121, 8.312530255752187e-122, 2.610690074081003e-122, 8.15995912006751e-123, 2.5381808000904614e-123, 7.856883562323495e-124, 2.420262759853582e-124, 7.419085407201749e-125, 2.263106796326316e-125, 6.869382379037034e-126, 2.0748151048826427e-126, 6.235642977495519e-127, 1.8647226293804146e-127, 5.548420789014768e-128, 1.642622025240391e-128, 4.8384907065631415e-129, 1.4180027602924112e-129, 4.134566454364341e-130, 1.1993872126881986e-130, 3.461434775939484e-131, 9.938272869867151e-132, 2.8386666367749965e-132, 8.065981668650291e-133, 2.2799747504638114e-133, 6.410964675260523e-134, 1.793196163286102e-134, 4.9892329315774423e-135, 1.3808031649375108e-135, 3.801125371857362e-136, 1.0407955188385889e-136, 2.8345346169838556e-137, 7.678060698857846e-138, 2.0685450968362776e-138, 5.5425846413951874e-139, 1.4770110131394582e-139, 3.9144371315102378e-140, 1.0317136810936545e-140, 2.7042284845928615e-141, 7.048746784692135e-142, 1.82706809555461e-142, 4.70935879901573e-143, 1.207043520222575e-143, 3.076295290003479e-144, 7.795910633392829e-145, 1.9643966207724757e-145, 4.92158184712079e-146, 1.2259792574800604e-146, 3.0363654173350154e-147, 7.476649774805968e-148, 1.8303395606248707e-148, 4.4546893124364935e-149, 1.0778386462448315e-149, 2.592567484577837e-150, 6.199201333384584e-151, 1.4735337478515449e-151, 3.4817083044716434e-152, 8.177524677587039e-153, 1.9091397254131722e-153, 4.430258623378742e-154, 1.021845075228668e-154, 2.3425814325617224e-155, 5.337612086665274e-156, 1.2087345929492876e-156, 2.7204167625114175e-157, 6.084842615621458e-158, 1.3525754391659957e-158, 2.9878628658850294e-159, 6.558968890429941e-160, 1.4307867544207666e-160, 3.101468087619268e-161, 6.680383238261099e-162, 1.4297682047158766e-162, 3.040525028846607e-163, 6.424490145201137e-164, 1.3487277298008954e-164, 2.8131558375192594e-165, 5.829556043805087e-166, 1.200155755664533e-166, 2.454643274481568e-167, 4.987420195684563e-168, 1.0066730397579757e-168, 2.0184308596030955e-169, 4.0201317457368285e-170, 7.953451185380288e-171, 1.5629597245416748e-171, 3.050736118506228e-172, 5.914444992434989e-173, 1.1388423326966945e-173, 2.177916196133894e-174, 4.136512469219289e-175, 7.802445154875412e-176, 1.4615641301889068e-176, 2.718837750435672e-177, 5.022436079440582e-178, 9.212948675262303e-179, 1.6781212426153887e-179, 3.0351192433767776e-180, 5.450585532512217e-181, 9.71880172676132e-182, 1.7205669591549347e-182, 3.0241742175807463e-183, 5.277222796864401e-184, 9.14227790983819e-185, 1.5723190996086406e-185, 2.6844239493313537e-186, 4.54959219759596e-187, 7.654054310051633e-188, 1.2781888043278476e-188, 2.118700269604016e-189, 3.4857935659686496e-190, 5.692171368084646e-191, 9.225393599223426e-192, 1.4839145606185405e-192, 2.368843146439045e-193, 3.752782851563724e-194, 5.899925627577814e-195, 9.204533899030549e-196, 1.4249688245287983e-196, 2.1889875836708664e-197, 3.3365806441746673e-198, 5.046221475186517e-199, 7.572220376682029e-200, 1.1273487359437181e-200, 1.665164734291246e-201, 2.4400893990062335e-202, 3.547231640513104e-203, 5.115572525752148e-204, 7.318218557679489e-205, 1.038504600585104e-205, 1.4618029072951438e-206, 2.0409479614913913e-207, 2.8263312563415028e-208, 3.8819278169731876e-209, 5.28798601100209e-210, 7.143922085649943e-211, 9.571318117612718e-212, 1.271687552702499e-212, 1.6755124281837188e-213, 2.1890633177567115e-214, 2.8359413215674727e-215, 3.642915956791865e-216, 4.639794456498345e-217, 5.859096213988751e-218, 7.335494108028846e-219, 9.10498977522692e-220, 1.120379946866685e-220, 1.3666941308881808e-221, 1.6526533479305877e-222, 1.980983576254612e-223, 2.353709273261808e-224, 2.771926431883692e-225, 3.235575621299364e-226, 3.743228614297953e-227, 4.2919039582904444e-228, 4.876927721565413e-229, 5.491855393005757e-230, 6.128469349536223e-231, 6.776863344686923e-232, 7.425621151840349e-233, 8.062090994113515e-234, 8.672751028960192e-235, 9.24365437831463e-236, 9.7609355493629e-237, 1.0211354174734473e-237, 1.0582847403798331e-238, 1.0865059518162742e-239, 1.1049816812406414e-240, 1.1131517676273131e-241, 1.110741212051483e-242, 1.097775145459491e-243, 1.0745796981638421e-244, 1.0417685777621744e-245, 1.0002161101021537e-246, 9.510183931664799e-248, 8.954449799595478e-249, 8.34884079574588e-250, 7.707846004899405e-251, 7.045984346710972e-252, 6.377261984447427e-253, 5.7146923320935035e-254, 5.069900729611501e-255, 4.452828678013742e-256, 3.871544815742486e-257, 3.3321622599641536e-258, 2.8388551419698936e-259, 2.3939616194056035e-260, 1.9981566703788008e-261, 1.650675706720827e-262, 1.3495694553147045e-263, 1.0919714677339367e-264, 8.74361739188053e-266, 6.928128912011785e-267, 5.432088201801921e-268, 4.2142927760706614e-269, 3.2349721965801133e-270, 2.456887101885333e-271, 1.846075289673809e-272, 1.3722835598258e-273, 1.009134736341657e-274, 7.340840968755575e-276, 5.282193182269709e-277, 3.759541717988758e-278, 2.646597980810528e-279, 1.842695948014705e-280, 1.2688554030462184e-281, 8.640589330946514e-283, 5.818718157949141e-284, 3.874751623770968e-285, 2.5513661338801097e-286, 1.6610923221366635e-287, 1.0692676652815048e-288, 6.80503405771267e-290, 4.281587468258601e-291, 2.6631114594955865e-292, 1.6374315063769625e-293, 9.951886242991783e-295, 5.978541160462668e-296, 3.549863188894888e-297, 2.083212170509732e-298, 1.2082024879651788e-299, 6.924828618264152e-301, 3.92211277006059e-302, 2.195085488496571e-303, 1.2138963322873958e-304, 6.632678580497953e-306, 3.580566967069196e-307, 1.9096261779793894e-308, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}
},{}],71:[function(require,module,exports){
module.exports={"x": [0.0001, 0.00010041540866611251, 0.00010083254297582394, 0.00010125141009760714, 0.00010167201722971383, 0.00010209437160029746, 0.0001025184804675382, 0.00010294435111976733, 0.00010337199087559213, 0.00010380140708402249, 0.00010423260712459624, 0.00010466559840750683, 0.00010510038837373024, 0.00010553698449515262, 0.0001059753942746993, 0.00010641562524646341, 0.00010685768497583504, 0.00010730158105963198, 0.00010774732112622943, 0.00010819491283569187, 0.00010864436387990433, 0.00010909568198270426, 0.00010954887490001507, 0.00011000395041997849, 0.00011046091636308919, 0.00011091978058232888, 0.00011138055096330086, 0.00011184323542436638, 0.00011230784191677982, 0.00011277437842482606, 0.00011324285296595743, 0.00011371327359093107, 0.00011418564838394814, 0.00011465998546279183, 0.0001151362929789676, 0.00011561457911784304, 0.00011609485209878807, 0.00011657712017531694, 0.00011706139163522974, 0.00011754767480075438, 0.00011803597802869059, 0.00011852630971055243, 0.00011901867827271343, 0.00011951309217655097, 0.0001200095599185914, 0.00012050809003065684, 0.00012100869108001086, 0.00012151137166950654, 0.00012201614043773398, 0.00012252300605916834, 0.00012303197724431982, 0.0001235430627398823, 0.0001240562713288846, 0.00012457161183084095, 0.0001250890931019023, 0.00012560872403500928, 0.00012613051356004406, 0.0001266544706439847, 0.00012718060429105888, 0.0001277089235428982, 0.00012823943747869454, 0.00012877215521535495, 0.0001293070859076594, 0.0001298442387484175, 0.00013038362296862626, 0.0001309252478376295, 0.00013146912266327632, 0.00013201525679208166, 0.0001325636596093868, 0.00013311434053952007, 0.00013366730904595977, 0.00013422257463149623, 0.00013478014683839478, 0.00013534003524856079, 0.00013590224948370304, 0.0001364667992055002, 0.00013703369411576633, 0.00013760294395661734, 0.0001381745585106392, 0.0001387485476010551, 0.00013932492109189514, 0.00013990368888816543, 0.00014048486093601797, 0.00014106844722292243, 0.0001416544577778368, 0.00014224290267138065, 0.0001428337920160077, 0.0001434271359661793, 0.0001440229447185398, 0.0001446212285120912, 0.0001452219976283688, 0.00014582526239161888, 0.00014643103316897498, 0.00014703932037063701, 0.0001476501344500497, 0.000148263485904082, 0.00014887938527320823, 0.00014949784314168815, 0.00015011887013775002, 0.00015074247693377257, 0.00015136867424646812, 0.00015199747283706772, 0.00015262888351150493, 0.00015326291712060248, 0.00015389958456025847, 0.00015453889677163293, 0.00015518086474133712, 0.00015582549950162098, 0.0001564728121305638, 0.0001571228137522643, 0.00015777551553703103, 0.0001584309287015757, 0.0001590890645092046, 0.00015974993427001315, 0.00016041354934108, 0.0001610799211266615, 0.00016174906107838902, 0.00016242098069546427, 0.00016309569152485817, 0.00016377320516150872, 0.00016445353324851986, 0.00016513668747736242, 0.0001658226795880747, 0.00016651152136946354, 0.00016720322465930827, 0.0001678978013445626, 0.00016859526336156027, 0.0001692956226962196, 0.00016999889138424884, 0.00017070508151135436, 0.00017141420521344695, 0.0001721262746768515, 0.00017284130213851597, 0.00017355929988622108, 0.0001742802802587928, 0.00017500425564631302, 0.00017573123849033348, 0.00017646124128408935, 0.00017719427657271318, 0.0001779303569534516, 0.00017866949507588137, 0.00017941170364212605, 0.0001801569954070757, 0.00018090538317860463, 0.0001816568798177926, 0.0001824114982391455, 0.00018316925141081657, 0.0001839301523548307, 0.0001846942141473066, 0.00018546144991868292, 0.00018623187285394326, 0.00018700549619284217, 0.00018778233323013413, 0.00018856239731580038, 0.00018934570185527973, 0.0001901322603096983, 0.00019092208619610041, 0.000191715193087682, 0.00019251159461402257, 0.0001933113044613206, 0.00019411433637262827, 0.00019492070414808696, 0.00019573042164516586, 0.00019654350277889844, 0.00019735996152212308, 0.0001981798119057225, 0.00019900306801886434, 0.00019982974400924468, 0.00020065985408332954, 0.0002014934125066004, 0.00020233043360379886, 0.00020317093175917206, 0.0002040149214167214, 0.0002048624170804491, 0.00020571343331460886, 0.00020656798474395554, 0.0002074260860539959, 0.0002082877519912422, 0.00020915299736346497, 0.0002100218370399469, 0.00021089428595173973, 0.00021177035909191935, 0.00021265007151584478, 0.00021353343834141627, 0.00021442047474933454, 0.00021531119598336288, 0.00021620561735058848, 0.00021710375422168487, 0.00021800562203117758, 0.0002189112362777076, 0.00021982061252429923, 0.000220733766398627, 0.00022165071359328344, 0.0002225714698660504, 0.00022349605104016797, 0.0002244244730046081, 0.0002253567517143468, 0.00022629290319063785, 0.0002272329435212896, 0.00022817688886093957, 0.00022912475543133382, 0.00023007655952160492, 0.00023103231748855118, 0.00023199204575691945, 0.00023295576081968538, 0.0002339234792383387, 0.0002348952176431669, 0.00023587099273354048, 0.00023685082127820146, 0.00023783472011554976, 0.00023882270615393418, 0.0002398147963719423, 0.00024081100781869142, 0.0002418113576141234, 0.00024281586294929678, 0.00024382454108668405, 0.0002448374093604674, 0.0002458544851768362, 0.0002468757860142873, 0.0002479013294239241, 0.00024893113302975917, 0.0002499652145290171, 0.00025100359169243736, 0.00025204628236458144, 0.0002530933044641386, 0.00025414467598423315, 0.00025520041499273546, 0.0002562605396325704, 0.0002573250681220308, 0.0002583940187550899, 0.00025946740990171493, 0.00026054526000818457, 0.00026162758759740396, 0.00026271441126922467, 0.0002638057497007638, 0.00026490162164672385, 0.0002660020459397169, 0.0002671070414905874, 0.000268216627288736, 0.00026933082240244836, 0.0002704496459792203, 0.00027157311724608854, 0.000272701255509961, 0.000273834080157947, 0.00027497161065769286, 0.00027611386655771407, 0.00027726086748773316, 0.00027841263315901623, 0.0002795691833647108, 0.0002807305379801881, 0.00028189671696338207, 0.0002830677403551346, 0.000284243628279539, 0.0002854244009442848, 0.0002866100786410074, 0.00028780068174563407, 0.0002889962307187363, 0.00029019674610588074, 0.0002914022485379811, 0.0002926127587316549, 0.0002938282974895771, 0.00029504888570083967, 0.0002962745443413096, 0.0002975052944739888, 0.00029874115724937763, 0.00029998215390583633, 0.0003012283057699522, 0.00030247963425690473, 0.00030373616087083334, 0.0003049979072052086, 0.0003062648949432008, 0.0003075371458580552, 0.000308814681813465, 0.0003100975247639459, 0.0003113856967552157, 0.00031267921992457205, 0.0003139781165012717, 0.00031528240880691514, 0.00031659211925582736, 0.00031790727035544564, 0.0003192278847067039, 0.00032055398500442325, 0.0003218855940377006, 0.0003232227346903013, 0.00032456542994105066, 0.00032591370286423144, 0.00032726757662997766, 0.00032862707450467495, 0.00032999221985135975, 0.00033136303613011934, 0.00033273954689849776, 0.00033412177581189763, 0.00033550974662398925, 0.0003369034831871178, 0.000338303009452712, 0.00033970834947169836, 0.00034111952739491157, 0.0003425365674735121, 0.00034395949405940175, 0.00034538833160564124, 0.00034682310466687283, 0.0003482638378997395, 0.00034971055606331105, 0.0003511632840195087, 0.000352622046733531, 0.0003540868692742858, 0.00035555777681481766, 0.0003570347946327434, 0.00035851794811068516, 0.00036000726273670573, 0.0003615027641047488, 0.0003630044779150762, 0.0003645124299747119, 0.00036602664619788457, 0.00036754715260647154, 0.000369073975330449, 0.00037060714060833765, 0.0003721466747876564, 0.0003736926043253743, 0.00037524495578836344, 0.00037680375585385877, 0.00037836903130991314, 0.0003799408090558605, 0.0003815191161027769, 0.0003831039795739437, 0.00038469542670531616, 0.00038629348484598856, 0.00038789818145866685, 0.000389509544120139, 0.00039112760052174974, 0.00039275237846987546, 0.00039438390588640234, 0.00039602221080920744, 0.00039766732139263927, 0.0003993192659080022, 0.0004009780727440409, 0.000402643770407431, 0.00040431638752326564, 0.00040599595283555035, 0.0004076824952076957, 0.0004093760436230122, 0.0004110766271852111, 0.00041278427511890153, 0.00041449901677009516, 0.00041622088160670975, 0.0004179498992190739, 0.00041968609932043887, 0.00042142951174748555, 0.0004231801664608403, 0.00042493809354558835, 0.00042670332321179, 0.00042847588579500234, 0.00043025581175679714, 0.00043204313168528763, 0.00043383787629565265, 0.0004356400764306633, 0.00043744976306121585, 0.0004392669672868608, 0.00044109172033634006, 0.0004429240535681224, 0.0004447639984709412, 0.0004466115866643385, 0.00044846684989920474, 0.00045032982005832785, 0.0004522005291569395, 0.00045407900934326404, 0.00045596529289907426, 0.00045785941224024234, 0.0004597613999173001, 0.0004616712886159973, 0.00046358911115786144, 0.00046551490050076563, 0.00046744868973949086, 0.0004693905121062981, 0.000471340400971498, 0.0004732983898440231, 0.0004752645123720067, 0.00047723880234335734, 0.0004792212936863432, 0.00048121202047017277, 0.0004832110169055815, 0.00048521831734541816, 0.00048723395628523633, 0.0004892579683638881, 0.0004912903883641177, 0.0004933312512131606, 0.0004953805919833413, 0.0004974384458926801, 0.0004995048483054937, 0.0005015798347330068, 0.0005036634408339611, 0.0005057557024152259, 0.0005078566554324174, 0.0005099663359905129, 0.0005120847803444739, 0.0005142120248998686, 0.0005163481062134953, 0.0005184930609940145, 0.0005206469261025756, 0.0005228097385534542, 0.000524981535514686, 0.0005271623543087045, 0.0005293522324129862, 0.0005315512074606897, 0.0005337593172413072, 0.000535976599701311, 0.0005382030929448055, 0.0005404388352341843, 0.0005426838649907847, 0.0005449382207955507, 0.0005472019413896953, 0.000549475065675364, 0.0005517576327163075, 0.0005540496817385482, 0.000556351252131059, 0.0005586623834464375, 0.0005609831154015847, 0.0005633134878783914, 0.0005656535409244189, 0.0005680033147535912, 0.0005703628497468845, 0.0005727321864530194, 0.0005751113655891615, 0.0005775004280416169, 0.0005798994148665386, 0.0005823083672906305, 0.0005847273267118541, 0.0005871563347001438, 0.0005895954329981168, 0.0005920446635217946, 0.0005945040683613208, 0.0005969736897816858, 0.0005994535702234511, 0.0006019437523034802, 0.0006044442788156717, 0.0006069551927316933, 0.0006094765372017212, 0.0006120083555551796, 0.0006145506913014892, 0.0006171035881308099, 0.0006196670899147966, 0.0006222412407073505, 0.0006248260847453749, 0.0006274216664495393, 0.0006300280304250382, 0.0006326452214623618, 0.0006352732845380638, 0.0006379122648155325, 0.0006405622076457715, 0.0006432231585681736, 0.0006458951633113084, 0.0006485782677937059, 0.0006512725181246434, 0.000653977960604943, 0.0006566946417277618, 0.0006594226081793954, 0.0006621619068400785, 0.000664912584784788, 0.0006676746892840574, 0.0006704482678047833, 0.0006732333680110455, 0.0006760300377649252, 0.0006788383251273244, 0.0006816582783587971, 0.0006844899459203729, 0.0006873333764743949, 0.000690188618885354, 0.0006930557222207261, 0.0006959347357518203, 0.0006988257089546206, 0.0007017286915106403, 0.0007046437333077741, 0.0007075708844411534, 0.0007105101952140116, 0.0007134617161385435, 0.0007164254979367781, 0.0007194015915414479, 0.0007223900480968625, 0.000725390918959792, 0.0007284042557003441, 0.0007314301101028557, 0.0007344685341667792, 0.0007375195801075784, 0.0007405833003576226, 0.0007436597475670902, 0.0007467489746048743, 0.0007498510345594893, 0.0007529659807399845, 0.0007560938666768575, 0.0007592347461229792, 0.0007623886730545113, 0.00076555570167184, 0.000768735886400504, 0.0007719292818921285, 0.0007751359430253693, 0.0007783559249068497, 0.000781589282872113, 0.0007848360724865711, 0.0007880963495464574, 0.0007913701700797905, 0.0007946575903473314, 0.0007979586668435551, 0.0008012734562976198, 0.0008046020156743394, 0.0008079444021751674, 0.000811300673239174, 0.0008146708865440387, 0.0008180551000070391, 0.0008214533717860438, 0.0008248657602805172, 0.0008282923241325174, 0.0008317331222277086, 0.0008351882136963715, 0.0008386576579144166, 0.0008421415145044101, 0.0008456398433365926, 0.0008491527045299131, 0.00085268015845306, 0.0008562222657254959, 0.0008597790872185054, 0.0008633506840562341, 0.0008669371176167454, 0.0008705384495330722, 0.0008741547416942742, 0.0008777860562465066, 0.0008814324555940818, 0.0008850940024005479, 0.0008887707595897628, 0.0008924627903469727, 0.0008961701581199045, 0.0008998929266198488, 0.0009036311598227612, 0.0009073849219703578, 0.0009111542775712219, 0.0009149392914019086, 0.0009187400285080605, 0.0009225565542055275, 0.0009263889340814863, 0.0009302372339955691, 0.0009341015200809921, 0.0009379818587456981, 0.000941878316673491, 0.0009457909608251874, 0.0009497198584397649, 0.0009536650770355153, 0.0009576266844112103, 0.0009616047486472604, 0.0009655993381068905, 0.0009696105214373126, 0.000973638367570902, 0.0009776829457263888, 0.0009817443254100404, 0.0009858225764168614, 0.0009899177688317917, 0.0009940299730309067, 0.000998159259682634, 0.0010023056997489602, 0.001006469364486657, 0.001010650325448503, 0.0010148486544845105, 0.0010190644237431665, 0.001023297705672665, 0.00102754857302216, 0.0010318170988430095, 0.001036103356490035, 0.0010404074196227783, 0.001044729362206769, 0.0010490692585147978, 0.0010534271831281906, 0.0010578032109380912, 0.0010621974171467455, 0.0010666098772687963, 0.001071040667132583, 0.001075489862881441, 0.0010799575409750131, 0.00108444377819056, 0.0010889486516242816, 0.0010934722386926443, 0.0010980146171337079, 0.0011025758650084645, 0.001107156060702176, 0.0011117552829257226, 0.0011163736107169598, 0.0011210111234420711, 0.0011256679007969359, 0.0011303440228084944, 0.0011350395698361256, 0.001139754622573031, 0.0011444892620476174, 0.0011492435696248916, 0.0011540176270078554, 0.001158811516238912, 0.0011636253197012782, 0.0011684591201203966, 0.00117331300056536, 0.0011781870444503345, 0.001183081335535996, 0.0011879959579309722, 0.0011929309960932838, 0.0011978865348317989, 0.0012028626593076864, 0.001207859455035882, 0.0012128770078865603, 0.0012179154040866072, 0.0012229747302211036, 0.001228055073234808, 0.001233156520433661, 0.0012382791594862741, 0.0012434230784254452, 0.0012485883656496689, 0.00125377510992465, 0.00125898340038484, 0.0012642133265349568, 0.0012694649782515322, 0.0012747384457844524, 0.0012800338197585103, 0.0012853511911749594, 0.0012906906514130805, 0.0012960522922317546, 0.0013014362057710352, 0.0013068424845537354, 0.0013122712214870128, 0.0013177225098639704, 0.0013231964433652607, 0.0013286931160606927, 0.0013342126224108505, 0.0013397550572687134, 0.0013453205158812883, 0.001350909093891249, 0.0013565208873385752, 0.0013621559926622073, 0.0013678145067016984, 0.0013734965266988814, 0.001379202150299543, 0.0013849314755550973, 0.0013906846009242746, 0.0013964616252748075, 0.001402262647885135, 0.0014080877684461085, 0.001413937087062704, 0.0014198107042557426, 0.0014257087209636156, 0.0014316312385440203, 0.001437578358775706, 0.0014435501838602183, 0.0014495468164236582, 0.0014555683595184417, 0.001461614916625073, 0.0014676865916539268, 0.0014737834889470285, 0.0014799057132798513, 0.0014860533698631115, 0.0014922265643445799, 0.0014984254028109004, 0.0015046499917894082, 0.001510900438249964, 0.0015171768496067865, 0.0015234793337203074, 0.0015298079988990147, 0.0015361629539013236, 0.0015425443079374412, 0.0015489521706712386, 0.0015553866522221465, 0.0015618478631670345, 0.0015683359145421236, 0.0015748509178448865, 0.0015813929850359682, 0.0015879622285411045, 0.0015945587612530576, 0.0016011826965335592, 0.0016078341482152537, 0.0016145132306036576, 0.00162122005847912, 0.0016279547470987967, 0.0016347174121986352, 0.0016415081699953586, 0.0016483271371884659, 0.0016551744309622326, 0.0016620501689877283, 0.0016689544694248408, 0.0016758874509243038, 0.0016828492326297372, 0.0016898399341796907, 0.0016968596757097032, 0.00170390857785437, 0.0017109867617494114, 0.0017180943490337581, 0.0017252314618516355, 0.0017323982228546668, 0.0017395947552039843, 0.0017468211825723402, 0.0017540776291462368, 0.0017613642196280528, 0.0017686810792381929, 0.0017760283337172407, 0.0017834061093281158, 0.0017908145328582466, 0.0017982537316217437, 0.0018057238334615922, 0.0018132249667518507, 0.0018207572603998537, 0.0018283208438484293, 0.001835915847078117, 0.0018435424006094144, 0.0018512006355050046, 0.0018588906833720224, 0.0018666126763643097, 0.0018743667471846817, 0.00188215302908722, 0.0018899716558795476, 0.0018978227619251412, 0.0019057064821456362, 0.001913622952023137, 0.0019215723076025611, 0.0019295546854939604, 0.0019375702228748824, 0.0019456190574927202, 0.0019537013276670835, 0.00196181717229217, 0.001969966730839155, 0.0019781501433585942, 0.0019863675504828227, 0.0019946190934283774, 0.002002904913998416, 0.0020112251545851586, 0.00201957995817234, 0.0020279694683376596, 0.0020363938292552518, 0.002044853185698161, 0.002053347683040829, 0.0020618774672616007, 0.002070442684945227, 0.002079043483285384, 0.002087680010087201, 0.002096352413769802, 0.0021050608433688606, 0.0021138054485391558, 0.002122586379557148, 0.0021314037873235545, 0.002140257823365947, 0.00214914863984136, 0.0021580763895389004, 0.002167041225882375, 0.0021760433029329234, 0.0021850827753916676, 0.0021941597986023767, 0.002203274528554128, 0.0022124271218839937, 0.0022216177358797256, 0.0022308465284824625, 0.0022401136582894487, 0.002249419284556753, 0.00225876356720201, 0.00226814666680716, 0.002277568744621221, 0.0022870299625630474, 0.002296530483224124, 0.0023060704698713553, 0.0023156500864498623, 0.0023252694975858194, 0.0023349288685892617, 0.0023446283654569443, 0.002354368154875187, 0.0023641484042227316, 0.002373969281573636, 0.002383830955700142, 0.002393733596075593, 0.002403677372877338, 0.0024136624569896584, 0.0024236890200067, 0.0024337572342354253, 0.0024438672726985796, 0.002454019309137657, 0.0024642135180158917, 0.002474450074521248, 0.002484729154569437, 0.0024950509348069428, 0.002505415592614052, 0.002515823306107907, 0.0025262742541455607, 0.0025367686163270506, 0.0025473065729984955, 0.0025578883052551848, 0.002568513994944696, 0.0025791838246700116, 0.002589897977792663, 0.0026006566384358864, 0.0026114599914877795, 0.0026223082226044833, 0.0026332015182133663, 0.002644140065516231, 0.002655124052492538, 0.00266615366790263, 0.002677229101290977, 0.0026883505429894285, 0.0026995181841204894, 0.002710732216600609, 0.0027219928331434716, 0.002733300227263314, 0.0027446545932782417, 0.002756056126313575, 0.0027675050223052063, 0.002779001478002961, 0.002790545690973983, 0.002802137859606118, 0.0028137781831113445, 0.0028254668615291722, 0.0028372040957301017, 0.0028489900874190664, 0.0028608250391388918, 0.0028727091542737945, 0.002884642637052855, 0.002896625692553549, 0.002908658526705261, 0.0029207413462928153, 0.0029328743589600503, 0.002945057773213362, 0.0029572917984253106, 0.002969576644838204, 0.002981912523567718, 0.0029942996466065155, 0.0030067382268278956, 0.0030192284779894563, 0.0030317706147367615, 0.0030443648526070335, 0.00305701140803285, 0.003069710498345866, 0.0030824623417805607, 0.0030952671574779717, 0.003108125165489473, 0.003121036586780543, 0.003134001643234572, 0.003147020557656677, 0.003160093553777525, 0.003173220856257183, 0.0031864026906889683, 0.0031996392836033324, 0.003212930862471761, 0.003226277655710672, 0.0032396798926853493, 0.003253137803713872, 0.003266651620071082, 0.0032802215739925616, 0.0032938478986786193, 0.0033075308282982984, 0.003321270597993396, 0.0033350674438825073, 0.0033489216030650926, 0.0033628333136255387, 0.0033768028146372612, 0.0033908303461667993, 0.003404916149277949, 0.003419060466035914, 0.0034332635395114544, 0.0034475256137850695, 0.0034618469339511813, 0.0034762277461223685, 0.0034906682974335684, 0.0035051688360463497, 0.0035197296111531646, 0.003534350872981623, 0.0035490328727988156, 0.003563775862915604, 0.0035785800966909812, 0.003593445828536417, 0.0036083733139202156, 0.003623362809371935, 0.003638414572486764, 0.0036535288619299745, 0.0036687059374413537, 0.003683946059839673, 0.003699249491027161, 0.003714616493994011, 0.003730047332822907, 0.003745542272693552, 0.0037611015798872326, 0.0037767255217913825, 0.003792414366904187, 0.003808168384839203, 0.003823987846329982, 0.00383987302323473, 0.0038558241885409674, 0.003871841616370229, 0.003887925581982782, 0.0039040763617823435, 0.003920294233320841, 0.003936579475303169, 0.003952932367591986, 0.003969353191212529, 0.00398584222835744, 0.004002399762391613, 0.004019026077857058, 0.004035721460477798, 0.0040524861971647855, 0.004069320576020821, 0.0040862248863455155, 0.004103199418640245, 0.004120244464613155, 0.004137360317184179, 0.004154547270490062, 0.0041718056198894226, 0.004189135661967817, 0.0042065376945428406, 0.0042240120166692615, 0.004241558928644139, 0.004259178732012, 0.00427687172957, 0.004294638225373154, 0.004312478524739535, 0.004330392934255543, 0.0043483817617811695, 0.004366445316455264, 0.004384583908700888, 0.004402797850230606, 0.004421087454051879, 0.004439453034472429, 0.004457894907105622, 0.004476413388875932, 0.004495008798024343, 0.004513681454113856, 0.004532431678034958, 0.004551259792011149, 0.004570166119604462, 0.004589150985721037, 0.00460821471661671, 0.004627357639902608, 0.004646580084550787, 0.004665882380899875, 0.00468526486066075, 0.0047047278569222585, 0.004724271704156923, 0.004743896738226697, 0.004763603296388724, 0.004783391717301144, 0.004803262341028922, 0.004823215509049674, 0.004843251564259555, 0.004863370850979124, 0.004883573714959281, 0.004903860503387214, 0.004924231564892354, 0.00494468724955237, 0.0049652279088991755, 0.004985853895924979, 0.005006565565088361, 0.0050273632723203425, 0.005048247375030524, 0.005069218232113203, 0.005090276203953557, 0.005111421652433843, 0.005132654940939604, 0.005153976434365925, 0.005175386499123683, 0.00519688550314586, 0.005218473815893873, 0.005240151808363908, 0.005261919853093309, 0.005283778324166953, 0.005305727597223722, 0.005327768049462913, 0.005349900059650756, 0.005372124008126909, 0.005394440276810979, 0.005416849249209121, 0.005439351310420586, 0.005461946847144378, 0.005484636247685881, 0.0055074199019635155, 0.0055302982015154835, 0.005553271539506443, 0.005576340310734312, 0.005599504911637028, 0.00562276574029937, 0.0056461231964597845, 0.005669577681517267, 0.005693129598538271, 0.005716779352263616, 0.005740527349115455, 0.005764373997204246, 0.005788319706335769, 0.0058123648880181854, 0.005836509955469094, 0.005860755323622638, 0.005885101409136623, 0.005909548630399686, 0.0059340974075385, 0.005958748162424973, 0.005983501318683512, 0.006008357301698286, 0.006033316538620544, 0.006058379458375974, 0.006083546491672048, 0.006108818071005444, 0.006134194630669454, 0.006159676606761463, 0.006185264437190456, 0.00621095856168452, 0.0062367594217984205, 0.006262667460921166, 0.006288683124283641, 0.006314806858966271, 0.006341039113906684, 0.006367380339907443, 0.006393830989643769, 0.006420391517671337, 0.0064470623804340965, 0.006473844036272099, 0.0065007369454293884, 0.00652774157006188, 0.006554858374245353, 0.00658208782398337, 0.006609430387215333, 0.006636886533824506, 0.0066644567356460675, 0.006692141466475268, 0.006719941202075514, 0.006747856420186602, 0.006775887600532894, 0.00680403522483155, 0.006832299776800855, 0.006860681742168472, 0.006889181608679839, 0.006917799866106525, 0.006946537006254657, 0.00697539352297336, 0.0070043699121632415, 0.007033466671784945, 0.0070626843018676755, 0.007092023304517809, 0.007121484183927502, 0.007151067446383369, 0.007180773600275196, 0.007210603156104659, 0.007240556626494107, 0.007270634526195355, 0.007300837372098539, 0.007331165683241017, 0.007361619980816267, 0.007392200788182856, 0.007422908630873412, 0.007453744036603674, 0.00748470753528157, 0.007515799659016306, 0.0075470209421275225, 0.007578371921154454, 0.007609853134865167, 0.007641465124265832, 0.007673208432609997, 0.007705083605407943, 0.00773709119043603, 0.0077692317377461295, 0.00780150579967509, 0.007833913930854211, 0.007866456688218783, 0.00789913463101764, 0.007931948320822781, 0.007964898321539045, 0.007997985199413768, 0.008031209523046538, 0.008064571863398927, 0.008098072793804366, 0.008131712889977927, 0.008165492730026284, 0.008199412894457608, 0.008233473966191533, 0.008267676530569219, 0.008302021175363354, 0.008336508490788309, 0.008371139069510257, 0.008405913506657333, 0.008440832399829918, 0.008475896349110845, 0.008511105957075766, 0.008546461828803477, 0.008581964571886333, 0.008617614796440663, 0.008653413115117272, 0.008689360143111986, 0.0087254564981762, 0.00876170280062751, 0.008798099673360349, 0.008834647741856704, 0.00887134763419689, 0.00890819998107031, 0.00894520541578632, 0.00898236457428507, 0.009019678095148472, 0.00905714661961117, 0.009094770791571552, 0.009132551257602818, 0.009170488666964077, 0.009208583671611512, 0.009246836926209609, 0.009285249088142374, 0.00932382081752466, 0.00936255277721347, 0.009401445632819373, 0.009440500052717961, 0.009479716708061308, 0.00951909627278952, 0.00955863942364229, 0.009598346840170548, 0.009638219204748152, 0.009678257202583597, 0.009718461521731798, 0.009758832853105892, 0.009799371890489128, 0.009840079330546814, 0.009880955872838252, 0.009922002219828785, 0.00996321907690183, 0.010004607152371066, 0.010046167157492526, 0.0100878998064769, 0.010129805816501762, 0.01017188590772388, 0.010214140803291654, 0.010256571229357461, 0.010299177915090215, 0.010341961592687856, 0.010384922997389908, 0.01042806286749019, 0.010471381944349404, 0.010514880972407973, 0.010558560699198782, 0.010602421875360002, 0.010646465254648057, 0.010690691593950533, 0.010735101653299167, 0.01077969619588297, 0.010824475988061268, 0.010869441799376944, 0.010914594402569621, 0.010959934573588927, 0.011005463091607888, 0.011051180739036241, 0.011097088301533956, 0.011143186568024696, 0.011189476330709356, 0.011235958385079743, 0.01128263352993216, 0.011329502567381213, 0.011376566302873566, 0.01142382554520174, 0.011471281106518095, 0.011518933802348698, 0.011566784451607418, 0.011614833876609961, 0.01166308290308797, 0.011711532360203298, 0.011760183080562153, 0.011809035900229506, 0.01185809165874341, 0.011907351199129394, 0.01195681536791503, 0.012006485015144433, 0.012056360994392844, 0.012106444162781373, 0.01215673538099164, 0.012207235513280644, 0.012257945427495589, 0.012308865995088748, 0.012359998091132536, 0.012411342594334442, 0.01246290038705222, 0.012514672355309018, 0.012566659388808559, 0.012618862380950524, 0.012671282228845804, 0.012723919833332004, 0.012776776098988888, 0.012829851934153879, 0.012883148250937771, 0.01293666596524029, 0.012990405996765927, 0.013044369269039704, 0.013098556709423012, 0.013152969249129618, 0.01320760782324163, 0.01326247337072553, 0.013317566834448402, 0.013372889161194026, 0.013428441301679247, 0.013484224210570269, 0.013540238846499018, 0.013596486172079723, 0.013652967153925331, 0.013709682762664231, 0.013766633972956887, 0.01382382176351254, 0.013881247117106131, 0.013938911020595085, 0.013996814464936348, 0.014054958445203398, 0.014113343960603285, 0.014171972014493913, 0.01423084361440116, 0.014289959772036303, 0.014349321503313348, 0.014408929828366458, 0.014468785771567577, 0.014528890361543922, 0.014589244631195762, 0.014649849617714119, 0.014710706362598554, 0.014771815911675153, 0.014833179315114454, 0.014894797627449448, 0.014956671907593809, 0.015018803218859969, 0.015081192628977499, 0.015143841210111409, 0.015206750038880529, 0.015269920196376123, 0.015333352768180333, 0.015397048844384958, 0.015461009519610125, 0.015525235893023067, 0.01558972906835711, 0.015654490153930528, 0.015719520262665685, 0.015784820512108128, 0.015850392024445728, 0.015916235926528098, 0.01598235334988581, 0.01604874543074996, 0.016115413310071647, 0.016182358133541533, 0.01624958105160963, 0.016317083219505008, 0.016384865797255625, 0.016452929949708345, 0.016521276846548853, 0.016589907662321858, 0.016658823576451223, 0.016728025773260196, 0.016797515441991873, 0.016867293776829495, 0.0169373619769171, 0.017007721246380076, 0.0170783727943458, 0.01714931783496453, 0.01722055758743015, 0.017292093276001234, 0.01736392613002202, 0.017436057383943503, 0.017508488277344775, 0.017581220054954157, 0.01765425396667075, 0.01772759126758583, 0.017801233218004385, 0.017875181083466894, 0.01794943613477092, 0.01802399964799309, 0.01809887290451096, 0.018174057191024988, 0.01824955379958075, 0.018325364027591093, 0.01840148917785837, 0.01847793055859697, 0.018554689483455632, 0.018631767271540176, 0.018709165247436085, 0.018786884741231247, 0.01886492708853891, 0.018943293630520507, 0.01902198571390883, 0.019101004691031112, 0.019180351919832212, 0.019260028763898093, 0.019340036592479088, 0.019420376780513577, 0.019501050708651553, 0.019582059763278287, 0.019663405336538296, 0.019745088826359107, 0.019827111636475415, 0.019909475176453157, 0.019992180861713664, 0.020075230113558107, 0.020158624359191878, 0.02024236503174903, 0.020326453570317066, 0.020410891419961497, 0.020495680031750833, 0.02058082086278144, 0.020666315376202525, 0.020752165041241433, 0.020838371333228724, 0.02092493573362366, 0.021011859730039627, 0.021099144816269618, 0.02118679249231205, 0.02127480426439639, 0.02136318164500917, 0.021451926152919916, 0.021541039313207205, 0.02163052265728499, 0.021720377722928785, 0.0218106060543022, 0.021901209201983456, 0.021992188722991926, 0.022083546180815077, 0.02217528314543514, 0.022267401193356264, 0.02235990190763153, 0.02245278687789009, 0.02254605770036462, 0.022639715977918685, 0.022733763320074218, 0.022828201343039336, 0.022923031669735933, 0.023018255929827734, 0.023113875759748218, 0.023209892802728692, 0.023306308708826676, 0.023403125134954076, 0.02350034374490583, 0.023597966209388425, 0.023695994206048527, 0.023794429419501995, 0.02389327354136263, 0.02399252827027142, 0.02409219531192565, 0.02419227637910814, 0.024292773191716868, 0.02439368747679432, 0.024495020968557324, 0.024596775408426814, 0.02469895254505765, 0.024801554134368835, 0.024904581939573615, 0.025008037731209697, 0.025111923287169855, 0.025216240392732285, 0.02532099084059146, 0.025426176430888858, 0.025531798971243826, 0.025637860276784826, 0.025744362170180408, 0.02585130648167073, 0.02595869504909892, 0.026066529717942596, 0.02617481234134575, 0.026283544780150388, 0.026392728902928694, 0.02650236658601507, 0.026612459713538286, 0.02672301017745405, 0.026834019877577324, 0.026945490721615135, 0.027057424625199295, 0.027169823511919232, 0.02728268931335522, 0.027396023969111477, 0.02750982942684943, 0.02762410764232136, 0.02773886057940381, 0.02785409021013152, 0.027969798514731234, 0.02808598748165564, 0.02820265910761774, 0.028319815397624952, 0.028437458365013754, 0.028555590031484186, 0.028674212427134534, 0.028793327590496392, 0.028912937568569476, 0.029033044416857015, 0.029153650199400964, 0.029274756988817405, 0.02939636686633236, 0.029518481921817333, 0.029641104253825417, 0.02976423596962728, 0.029887879185247292, 0.030012036025500077, 0.030136708624026814, 0.0302618991233321, 0.030387609674820678, 0.030513842438834326, 0.030640599584689163, 0.030767883290712828, 0.03089569574428183, 0.031024039141859364, 0.03115291568903279, 0.03128232760055175, 0.03141227710036618, 0.031542766421664384, 0.03167379780691164, 0.0318053735078885, 0.03193749578572973, 0.032070166910963, 0.03220338916354788, 0.03233716483291523, 0.032471496218006254, 0.032606385627312245, 0.0327418353789142, 0.032877847800522504, 0.03301442522951719, 0.03315157001298784, 0.033289284507774144, 0.03342757108050633, 0.03356643210764567, 0.033705869975525604, 0.03384588708039259, 0.03398648582844719, 0.0341276686358857, 0.034269437928941326, 0.0344117961439262, 0.03455474572727307, 0.034698289135577313, 0.03484242883563931, 0.03498716730450664, 0.03513250702951685, 0.03527845050834008, 0.03542500024902194, 0.03557215877002679, 0.03571992860028079, 0.03586831227921555, 0.03601731235681175, 0.036166931393642764, 0.03631717196091896, 0.036468036640531595, 0.03661952802509745, 0.036771648718003244, 0.036924401333450284, 0.037077788496499633, 0.03723181284311696, 0.037386477020218065, 0.03754178368571425, 0.03769773550855792, 0.037854335168788646, 0.038011585357579106, 0.03816948877728125, 0.038328048141472955, 0.03848726617500441, 0.03864714561404517, 0.03880768920613108, 0.03896889971021135, 0.039130779896696305, 0.03929333254750459, 0.03945656045611134, 0.039620466427595986, 0.03978505327869042, 0.03995032383782762, 0.040116280945189965, 0.04028292745275833, 0.040450266224360945, 0.040618300135722527, 0.04078703207451395, 0.04095646494040157, 0.04112660164509733, 0.041297445112408675, 0.041468998278288684, 0.04164126409088674, 0.041814245510599125, 0.041987945510119716, 0.0421623670744914, 0.042337513201157, 0.042513386900011135, 0.04268999119345177, 0.04286732911643204, 0.04304540371651271, 0.04322421805391422, 0.04340377520156955, 0.04358407824517691, 0.043765130283252636, 0.04394693442718474, 0.04412949380128605, 0.04431281154284818, 0.04449689080219532, 0.04468173474273826, 0.04486734654102905, 0.04505372938681521, 0.045240886483094926, 0.04542882104617187, 0.045617536305710416, 0.045807035504791406, 0.045997321899967546, 0.04618839876131968, 0.04638026937251285, 0.0465729370308526, 0.046766405047341884, 0.046960676746737866, 0.047155755467608904, 0.04735164456239222, 0.047548347397451195, 0.04774586735313349, 0.04794420782382904, 0.04814337221802822, 0.048343363958380764, 0.04854418648175419, 0.048745843239293214, 0.04894833769647891, 0.0491516733331881, 0.04935585364375353, 0.04956088213702349, 0.04976676233642249, 0.04997349778001166, 0.05018109202054937, 0.05038954862555268, 0.05059887117735821, 0.05080906327318406, 0.051020128525191506, 0.05123207056054689, 0.051444893021484285, 0.05165859956536789, 0.051873193864754794, 0.05208867960745838, 0.05230506049661134, 0.05252234025072966, 0.052740522603776346, 0.05295961130522546, 0.053179610120126924, 0.05340052282917078, 0.05362235322875254, 0.0538451051310383, 0.054068782364030024, 0.05429338877163178, 0.05451892821371529, 0.05474540456618673, 0.054972821721053076, 0.055201183586488914, 0.055430494086903925, 0.05566075716300991, 0.05589197677188889, 0.05612415688706097, 0.0563573014985524, 0.0565914146129646, 0.05682650025354252, 0.05706256246024419, 0.057299605289809964, 0.057537632815832095, 0.05777664912882506, 0.05801665833629568, 0.05825766456281354, 0.05849967195008229, 0.05874268465701032, 0.05898670685978268, 0.059231742751932666, 0.059477796544413666, 0.059724872465671985, 0.05997297476171903, 0.06022210769620469, 0.060472275550490395, 0.06072348262372257, 0.0609757332329069, 0.061229031712982045, 0.06148338241689455, 0.06173878971567349, 0.06199525799850538, 0.062252791672810046, 0.06251139516431586, 0.06277107291713627, 0.06303182939384593, 0.06329366907555721, 0.06355659646199766, 0.06382061607158701, 0.06408573244151479, 0.06435195012781858, 0.06461927370546194, 0.06488770776841339, 0.06515725692972521, 0.06542792582161248, 0.0656997190955332, 0.06597264142226762, 0.06624669749199906, 0.06652189201439422, 0.06679822971868403, 0.06707571535374525, 0.06735435368818167, 0.06763414951040646, 0.06791510762872424, 0.0681972328714136, 0.06848053008681046, 0.06876500414339086, 0.06905065992985512, 0.0693375023552117, 0.06962553634886122, 0.06991476686068178, 0.0702051988611134, 0.070496837341244, 0.07078968731289484, 0.07108375380870655, 0.071379041882226, 0.07167555660799292, 0.0719733030816269, 0.07227228641991548, 0.07257251176090146, 0.07287398426397178, 0.07317670910994585, 0.07348069150116451, 0.07378593666157983, 0.07409244983684432, 0.07440023629440164, 0.07470930132357685, 0.07501965023566709, 0.07533128836403342, 0.07564422106419183, 0.07595845371390579, 0.07627399171327849, 0.0765908404848454, 0.07690900547366793, 0.0772284921474265, 0.07754930599651493, 0.07787145253413463, 0.07819493729638913, 0.07851976584237957, 0.07884594375430015, 0.07917347663753371, 0.07950237012074868, 0.07983262985599511, 0.08016426151880243, 0.08049727080827672, 0.08083166344719836, 0.081167445182121, 0.08150462178346966, 0.08184319904564041, 0.08218318278709981, 0.0825245788504845, 0.08286739310270236, 0.0832116314350325, 0.08355729976322723, 0.08390440402761337, 0.08425295019319413, 0.08460294424975222, 0.08495439221195202, 0.08530730011944368, 0.08566167403696655, 0.08601752005445316, 0.08637484428713443, 0.08673365287564447, 0.08709395198612584, 0.08745574781033616, 0.0878190465657538, 0.08818385449568533, 0.08855017786937254, 0.08891802298209996, 0.08928739615530361, 0.08965830373667895, 0.0900307521002906, 0.09040474764668156, 0.09078029680298304, 0.09115740602302537, 0.09153608178744839, 0.0919163306038133, 0.09229815900671426, 0.09268157355789045, 0.09306658084633947, 0.09345318748842976, 0.09384140012801508, 0.09423122543654827, 0.09462267011319571, 0.09501574088495307, 0.09541044450676019, 0.09580678776161773, 0.09620477746070362, 0.09660442044348963, 0.09700572357785965, 0.09740869376022733, 0.09781333791565432, 0.09821966299796997, 0.09862767598989003, 0.0990373839031374, 0.09944879377856226, 0.09986191268626277, 0.10027674772570731, 0.10069330602585569, 0.1011115947452823, 0.10153162107229886, 0.10195339222507771, 0.10237691545177646, 0.10280219803066182, 0.10322924727023534, 0.10365807050935871, 0.10408867511737961, 0.10452106849425902, 0.10495525807069755, 0.10539125130826399, 0.10582905569952304, 0.1062686787681639, 0.10671012806913012, 0.10715341118874916, 0.1075985357448624, 0.10804550938695684, 0.10849433979629566, 0.10894503468605103, 0.10939760180143629, 0.10985204891983871, 0.11030838385095398, 0.1107666144369195, 0.1112267485524499, 0.11168879410497207, 0.11215275903476069, 0.11261865131507548, 0.11308647895229734, 0.11355624998606668, 0.11402797248942131, 0.11450165456893475, 0.11497730436485644, 0.11545493005125061, 0.11593453983613765, 0.11641614196163474, 0.11689974470409722, 0.11738535637426156, 0.11787298531738731, 0.11836263991340126, 0.1188543285770412, 0.11934805975800007, 0.11984384194107195, 0.12034168364629746, 0.12084159342910988, 0.12134357988048299, 0.12184765162707767, 0.12235381733139114, 0.12286208569190533, 0.12337246544323609, 0.12388496535628409, 0.12439959423838456, 0.12491636093345962, 0.12543527432216972, 0.125956343322066, 0.12647957688774444, 0.12700498401099858, 0.12753257372097507, 0.12806235508432848, 0.12859433720537655, 0.12912852922625775, 0.12966494032708725, 0.1302035797261156, 0.13074445667988674, 0.1312875804833967, 0.13183296047025417, 0.13238060601284043, 0.13293052652247003, 0.1334827314495535, 0.13403723028375863, 0.13459403255417454, 0.13515314782947502, 0.1357145857180825, 0.13627835586833428, 0.136844467968647, 0.1374129317476843, 0.13798375697452359, 0.1385569534588234, 0.13913253105099296, 0.1397104996423605, 0.14029086916534395, 0.14087364959362147, 0.14145885094230237, 0.14204648326810002, 0.14263655666950376, 0.14322908128695336, 0.14382406730301286, 0.14442152494254507, 0.14502146447288838, 0.14562389620403204, 0.1462288304887943, 0.14683627772299987, 0.14744624834565823, 0.14805875283914388, 0.14867380172937594, 0.1492914055859987, 0.14991157502256428, 0.15053432069671377, 0.15115965331036152, 0.15178758360987854, 0.15241812238627675, 0.15305128047539548, 0.15368706875808644, 0.15432549816040184, 0.1549665796537816, 0.15561032425524157, 0.1562567430275638, 0.15690584707948543, 0.15755764756589086, 0.15821215568800276, 0.15886938269357415, 0.15952933987708287, 0.16019203857992434, 0.16085749019060766, 0.16152570614495068, 0.16219669792627625, 0.16287047706561034, 0.16354705514187984, 0.16422644378211101, 0.16490865466163046, 0.16559369950426445, 0.16628159008254145, 0.1669723382178942, 0.16766595578086202, 0.16836245469129626, 0.16906184691856366, 0.16976414448175325, 0.1704693594498824, 0.1711775039421037, 0.17188859012791446, 0.17260263022736444, 0.17331963651126703, 0.17403962130140974, 0.17476259697076518, 0.1754885759437052, 0.1762175706962128, 0.1769495937560978, 0.1776846577032117, 0.1784227751696632, 0.1791639588400366, 0.17990822145160837, 0.18065557579456726, 0.18140603471223352, 0.1821596111012792, 0.1829163179119508, 0.18367616814829113, 0.1844391748683625, 0.1852053511844723, 0.1859747102633967, 0.18674726532660849, 0.18752302965050355, 0.18830201656662848, 0.18908423946191105, 0.18986971177888878, 0.19065844701594112, 0.1914504587275211, 0.19224576052438735, 0.19304436607383976, 0.19384628909995247, 0.1946515433838112, 0.19546014276374948, 0.196272101135586, 0.19708743245286453, 0.1979061507270924, 0.1987282700279824, 0.19955380448369434, 0.20038276828107682, 0.20121517566591257, 0.20205104094316248, 0.20289037847721092, 0.20373320269211395, 0.20457952807184557, 0.20542936916054808, 0.20628274056278148, 0.20713965694377368, 0.20800013302967404, 0.20886418360780487, 0.20973182352691683, 0.21060306769744366, 0.21147793109175766, 0.21235642874442848, 0.21323857575247987, 0.21412438727565059, 0.21501387853665416, 0.21590706482144006, 0.2168039614794577, 0.21770458392391862, 0.21860894763206276, 0.21951706814542393, 0.22042896107009613, 0.2213446420770033, 0.2222641269021669, 0.22318743134697783, 0.22411457127846732, 0.22504556262957898, 0.2259804213994439, 0.226919163653655, 0.22786180552454233, 0.22880836321145193, 0.2297588529810225, 0.2307132911674664, 0.23167169417284966, 0.23263407846737336, 0.23360046058965805, 0.23457085714702625, 0.23554528481578937, 0.23652376034153383, 0.23750630053940774, 0.2384929222944119, 0.2394836425616879, 0.24047847836681105, 0.24147744680608252, 0.24248056504682222, 0.24348785032766557, 0.24449931995885776, 0.245514991322553, 0.24653488187311254, 0.2475590091374037, 0.24858739071510272, 0.2496200442789965, 0.2506569875752853, 0.2516982384238899, 0.2527438147187553, 0.25379373442816033, 0.25484801559502573, 0.25590667633722325, 0.2569697348478888, 0.2580372093957333, 0.2591091183253581, 0.2601854800575696, 0.26126631308969517, 0.2623516359959027, 0.2634414674275176, 0.26453582611334553, 0.26563473085999295, 0.26673820055219, 0.2678462541531167, 0.26895891070472644, 0.2700761893280757, 0.27119810922365123, 0.2723246896716996, 0.2734559500325598, 0.27459190974699565, 0.27573258833652853, 0.2768780054037751, 0.27802818063278184, 0.2791831337893654, 0.2803428847214512, 0.2815074533594139, 0.2826768597164218, 0.28385112388877853, 0.2850302660562703, 0.2862143064825119, 0.28740326551529405, 0.28859716358693527, 0.2897960212146303, 0.2909998590008051, 0.29220869763346996, 0.2934225578865739, 0.294641460620364, 0.2958654267817415, 0.29709447740462364, 0.29832863361030443, 0.2995679166078167, 0.30081234769429854, 0.3020619482553572, 0.3033167397654382, 0.3045767437881941, 0.3058419819768536, 0.3071124760745957, 0.3083882479149226, 0.30966931942203374, 0.3109557126112048, 0.3122474495891637, 0.31354455255447233, 0.3148470437979077, 0.31615494570284325, 0.3174682807456365, 0.31878707149601226, 0.320111340617453, 0.32144111086758714, 0.3227764050985794, 0.3241172462575257, 0.3254636573868447, 0.3268156616246764, 0.3281732822052786, 0.32953654245942515, 0.3309054658148095, 0.3322800757964442, 0.3336603960270679, 0.33504645022755, 0.33643826221729756, 0.3378358559146665, 0.3392392553373718, 0.3406484846028988, 0.34206356792892056, 0.34348452963371096, 0.3449113941365652, 0.3463441859582183, 0.34778292972126557, 0.34922765015058804, 0.35067837207377467, 0.35213512042155143, 0.35359792022820863, 0.3550667966320302, 0.35654177487572813, 0.3580228803068733, 0.3595101383783337, 0.36100357464871075, 0.3625032147827774, 0.36400908455192194, 0.3655212098345874, 0.3670396166167196, 0.368564330992212, 0.3700953791633532, 0.37163278744128014, 0.3731765822464267, 0.37472679010898086, 0.3762834376693392, 0.3778465516785637, 0.37941615899884373, 0.38099228660395656, 0.38257496157972964, 0.3841642111245088, 0.3857600625496228, 0.387362543279855, 0.38897168085391376, 0.3905875029249044, 0.39221003726080733, 0.39383931174495185, 0.3954753543764982, 0.3971181932709178, 0.3987678566604746, 0.4004243728947138, 0.40208777044094507, 0.40375807788473533, 0.4054353239303983, 0.4071195374014865, 0.40881074724128985, 0.4105089825133295, 0.41221427240186015, 0.4139266462123705, 0.4156461333720856, 0.41737276343047486, 0.4191065660597587, 0.42084757105541754, 0.4225958083367062, 0.4243513079471651, 0.4261141000551394, 0.42788421495429624, 0.4296616830641439, 0.4314465349305576, 0.4332388012263013, 0.43503851275155736, 0.43684570043445475, 0.4386603953315994, 0.4404826286286107, 0.44231243164065415, 0.4441498358129824, 0.4459948727214745, 0.447847574073177, 0.44970797170685206, 0.45157609759352113, 0.4534519838370173, 0.45533566267453585, 0.45722716647718675, 0.4591265277505541, 0.4610337791352514, 0.46294895340748526, 0.4648720834796176, 0.4668032024007297, 0.46874234335719306, 0.47068953967323823, 0.4726448248115259, 0.4746082323737258, 0.4765797961010897, 0.47855954987503496, 0.48054752771772535, 0.48254376379265423, 0.4845482924052349, 0.48656114800338646, 0.48858236517812903, 0.490611978664177, 0.49265002334053404, 0.49469653423109644, 0.49675154650525066, 0.4988150954784814, 0.500887216612977, 0.502967945518237, 0.5050573179516883, 0.5071553698192951, 0.5092621371761794, 0.5113776562272395, 0.5135019633277705, 0.515635094984092, 0.517777087854174, 0.5199279787482651, 0.5220878046295296, 0.5242566026146772, 0.5264344099746057, 0.528621264135039, 0.5308172026771695, 0.533022263338307, 0.5352364840125233, 0.5374599027513073, 0.5396925577642167, 0.5419344874195335, 0.5441857302449272, 0.5464463249281123, 0.548716310317517, 0.5509957254229494, 0.5532846094162659, 0.5555830016320483, 0.5578909415682759, 0.5602084688870073, 0.5625356234150607, 0.5648724451446968, 0.5672189742343101, 0.569575251009114, 0.571941315961838, 0.5743172097534219, 0.5767029732137132, 0.5790986473421715, 0.5815042733085718, 0.5839198924537102, 0.5863455462901184, 0.5887812765027723, 0.5912271249498127, 0.5936831336632626, 0.5961493448497482, 0.5986258008912276, 0.6011125443457153, 0.6036096179480168, 0.6061170646104621, 0.6086349274236407, 0.6111632496571467, 0.6137020747603174, 0.616251446362984, 0.6188114082762202, 0.6213820044930926, 0.6239632791894211, 0.6265552767245338, 0.6291580416420327, 0.6317716186705581, 0.6343960527245549, 0.6370313889050484, 0.6396776725004175, 0.6423349489871711, 0.6450032640307338, 0.6476826634862262, 0.6503731933992563, 0.6530749000067101, 0.6557878297375436, 0.6585120292135852, 0.6612475452503318, 0.663994424857758, 0.6667527152411217, 0.6695224638017738, 0.6723037181379771, 0.6750965260457189, 0.6779009355195373, 0.6807169947533439, 0.68354475214125, 0.6863842562784027, 0.6892355559618152, 0.6920987001912093, 0.6949737381698563, 0.69786071930542, 0.7007596932108106, 0.7036707097050318, 0.7065938188140418, 0.7095290707716114, 0.7124765160201844, 0.7154362052117487, 0.7184081892087055, 0.7213925190847404, 0.7243892461257065, 0.7273984218304999, 0.7304200979119494, 0.7334543262977039, 0.7365011591311217, 0.7395606487721722, 0.7426328477983297, 0.7457178090054821, 0.7488155854088361, 0.7519262302438255, 0.7550497969670322, 0.7581863392570982, 0.7613359110156535, 0.7644985663682399, 0.7676743596652394, 0.7708633454828134, 0.7740655786238338, 0.7772811141188313, 0.7805100072269375, 0.7837523134368336, 0.7870080884677075, 0.7902773882702097, 0.7935602690274117, 0.7968567871557782, 0.800166999306129, 0.8034909623646191, 0.8068287334537134, 0.810180369933166, 0.8135459294010116, 0.8169254696945489, 0.8203190488913404, 0.8237267253102077, 0.8271485575122312, 0.8305846043017624, 0.8340349247274282, 0.837499578083151, 0.840978623909165, 0.8444721219930373, 0.8479801323707016, 0.8515027153274818, 0.8550399313991356, 0.8585918413728909, 0.8621585062884889, 0.8657399874392383, 0.8693363463730623, 0.8729476448935619, 0.8765739450610758, 0.8802153091937438, 0.8838717998685837, 0.8875434799225633, 0.8912304124536782, 0.894932660822042, 0.8986502886509681, 0.9023833598280693, 0.9061319385063533, 0.9098960891053219, 0.9136758763120852, 0.9174713650824651, 0.9212826206421184, 0.9251097084876552, 0.9289526943877611, 0.9328116443843345, 0.9366866247936136, 0.9405777022073232, 0.9444849434938153, 0.9484084157992164, 0.9523481865485878, 0.9563043234470759, 0.9602768944810838, 0.9642659679194353, 0.9682716123145463, 0.9722938965036083, 0.9763328896097683, 0.980388661043314, 0.9844612805028733, 0.9885508179766045, 0.9926573437434054, 0.9967809283741188, 1.0009216427327428, 1.0050795579776501, 1.0092547455628147, 1.0134472772390344, 1.0176572250551668, 1.0218846613593682, 1.0261296588003295, 1.0303922903285367, 1.0346726291975166, 1.0389707489650974, 1.0432867234946746, 1.0476206269564727, 1.0519725338288322, 1.0563425188994806, 1.0607306572668203, 1.065137024341221, 1.0695616958463072, 1.0740047478202728, 1.078466256617178, 1.082946298908265, 1.087444951683277, 1.0919622922517722, 1.096498398244467, 1.1010533476145594, 1.105627218639072, 1.1102200899202, 1.1148320403866505, 1.1194631492950156, 1.1241134962311232, 1.1287831611114076, 1.1334722241842832, 1.1381807660315253, 1.142908867569646, 1.1476566100512988, 1.152424075066665, 1.1572113445448589, 1.1620185007553376, 1.166845626309306, 1.1716928041611496, 1.176560117609852, 1.1814476503004268, 1.1863554862253598, 1.1912837097260411, 1.1962324054942297, 1.201201658573499, 1.2061915543607005, 1.2112021786074345, 1.2162336174215134, 1.221285957268456, 1.2263592849729643, 1.2314536877204176, 1.2365692530583727, 1.2417060688980601, 1.2468642235159075, 1.2520438055550491, 1.2572449040268499, 1.2624676083124378, 1.267712008164231, 1.2729781937074942, 1.2782662554418778, 1.2835762842429752, 1.288908371363888, 1.2942626084367834, 1.2996390874744836, 1.305037900872038, 1.3104591414083135, 1.3159029022475899, 1.3213692769411525, 1.3268583594289143, 1.3323702440410203, 1.337905025499471, 1.3434627989197534, 1.3490436598124638, 1.3546477040849663, 1.3602750280430294, 1.3659257283924846, 1.3715999022408902, 1.3772976470991896, 1.3830190608834034, 1.3887642419163009, 1.394533288929093, 1.4003263010631282, 1.4061433778716002, 1.411984619321246, 1.4178501257940823, 1.423739998089118, 1.4296543374240904, 1.4355932454372065, 1.4415568241888783, 1.4475451761634952, 1.4535584042711722, 1.4595966118495214, 1.4656599026654318, 1.4717483809168403, 1.4778621512345393, 1.4840013186839645, 1.4901659887670016, 1.496356267423804, 1.5025722610346002, 1.5088140764215408, 1.5150818208505212, 1.5213756020330296, 1.5276955281279994, 1.5340417077436563, 1.5404142499394038, 1.5468132642276842, 1.5532388605758638, 1.5596911494081265, 1.5661702416073577, 1.57267624851707, 1.579209281943303, 1.5857694541565486, 1.5923568778936834, 1.5989716663598923, 1.605613933230635, 1.612283792653585, 1.6189813592505955, 1.6257067481196719, 1.632460074836937, 1.6392414554586363, 1.6460510065231204, 1.6528888450528498, 1.6597550885564096, 1.6666498550305164, 1.6735732629620648, 1.6805254313301512, 1.6875064796081214, 1.6945165277656271, 1.7015556962706744, 1.7086241060917138, 1.7157218786997064, 1.7228491360702134, 1.7300060006854936, 1.7371925955366112, 1.744409044125535, 1.751655470467283, 1.758931999092038, 1.7662387550472924, 1.7735758639000003, 1.7809434517387206, 1.7883416451758067, 1.795770571349566, 1.8032303579264504, 1.8107211331032522, 1.8182430256092939, 1.8257961647086611, 1.8333806802024109, 1.840996702430804, 1.848644362275551, 1.856323791162044, 1.8640351210616395, 1.8717784844939105, 1.8795540145289276, 1.8873618447895504, 1.895202109453707, 1.9030749432567249, 1.910980481493629, 1.9189188600214724, 1.926890215261673, 1.934894684202344, 1.9429324044006708, 1.9510035139852595, 1.9591081516585138, 1.967246456699024, 1.9754185689639432, 1.983624628891415, 1.9918647775029723, 2.0001391564059623, 2.0084479077959863, 2.0167911744593265, 2.0251690997754226, 2.0335818277193227, 2.0420295028641577, 2.050512270383634, 2.059030276054508, 2.067583666259119, 2.076172587987886, 2.0847971888418404, 2.0934576170351638, 2.10215402139772, 2.110886551377639, 2.1196553570438654, 2.1284605890887436, 2.1373023988306077, 2.1461809382163852, 2.155096359824191, 2.164048816865976, 2.1730384631901423, 2.1820654532841925, 2.1911299422773864, 2.200232085943393, 2.20937204070299, 2.218549963626737, 2.2277660124376784, 2.2370203455140585, 2.246313121892024, 2.2556445012683857, 2.265014644003345, 2.2744237111232524, 2.283871864323381, 2.2933592659706856, 2.302886079106622, 2.31245246744993, 2.3220585953994495, 2.331704628036954, 2.341390731129966, 2.351117071134635, 2.360883815198579, 2.3706911311637615, 2.3805391875693815, 2.390428153654749, 2.4003581993622243, 2.4103294953401173, 2.4203422129456262, 2.4303965242477865, 2.440492602030409, 2.4506306197950782, 2.4608107517641136, 2.4710331728835704, 2.481298058826249, 2.4916055859946944, 2.50195593152426, 2.512349273286128, 2.522785789890373, 2.533265660689038, 2.5437890657791926, 2.554356186006062, 2.564967202966112, 2.575622299010177, 2.586321657246597, 2.5970654615443443, 2.607853896536214, 2.6186871476219786, 2.629565400971575, 2.640488843528307, 2.651457663012063, 2.6624720479225195, 2.673532187542413, 2.6846382719407713, 2.6957904919761866, 2.7069890393000984, 2.718234106360067, 2.7295258864031124, 2.7408645734790156, 2.752250362443655, 2.763683448962365, 2.7751640295132716, 2.786692301390707, 2.7982684627085743, 2.809892712403759, 2.821565250239554, 2.8332862768090683, 2.84505599353871, 2.8568746026916227, 2.8687423073711713, 2.880659311524433, 2.8926258199456827, 2.904642038279945, 2.916708173026507, 2.928824431542471, 2.940991022046325, 2.9532081536214965, 2.9654760362199815, 2.9777948806659293, 2.99016489865927, 3.0025863027793616, 3.0150593064886144, 3.0275841241361996, 3.040160970961708, 3.0527900630988536, 3.065471617579194, 3.0782058523358375, 3.090992986207223, 3.1038332389408576, 3.1167268311970986, 3.129673984552952, 3.1426749215058534, 3.1557298654775336, 3.168839040817828, 3.1820026728085415, 3.1952209876673265, 3.2084942125515425, 3.2218225755622, 3.235206305747855, 3.24864563310855, 3.2621407885997686, 3.2756920041364097, 3.289299512596747, 3.3029635478264705, 3.3166843446426792, 3.330462138837922, 3.3442971671842576, 3.358189667437296, 3.3721398783403256, 3.386148039628387, 3.4002143920324026, 3.414339177283317, 3.4285226381162266, 3.442765018274591, 3.4570665625143935, 3.4714275166083564, 3.485848127350169, 3.5003286425587024, 3.5148693110823097, 3.5294703828030745, 3.5441321086411133, 3.5588547405588917, 3.5736385315655292, 3.5884837357211885, 3.6033906081414124, 3.618359405001516, 3.633390383540997, 3.648483802067925, 3.663639919963426, 3.678858997686112, 3.69414129677656, 3.7094870798618187, 3.7248966106598886, 3.740370153984301, 3.7559079757486376, 3.7715103429711085, 3.7871775237791483, 3.802909787413992, 3.818707404235351, 3.8345706457260245, 3.8504997844965767, 3.8664950942900274, 3.882556849986523, 3.898685327608112, 3.9148808043234533, 3.9311435584525882, 3.947473869471732, 3.9638720180180447, 3.9803382858945007, 3.9968729560747005, 4.013476312707742, 4.030148641123103, 4.0468902278355525, 4.063701360550041, 4.080582328166699, 4.0975334207857586, 4.114554929712559, 4.131647147462553, 4.148810367766303, 4.166044885574579, 4.183350997063393, 4.200728999639098, 4.218179191943509, 4.235701873858997, 4.253297346513698, 4.270965912286649, 4.288707874812999, 4.306523538989231, 4.324413210978368, 4.342377198215286, 4.3604158094119665, 4.3785293545628035, 4.396718144949947, 4.41498249314861, 4.433322713032499, 4.451739119779171, 4.470232029875454, 4.488801761122904, 4.50744863264322, 4.52617296488379, 4.544975079623158, 4.5638552999765665, 4.582813950401514, 4.601851356703295, 4.6209678460406565, 4.640163746931383, 4.659439389257947, 4.678795104273194, 4.698231224605992, 4.71774808426701, 4.737346018654412, 4.757025364559638, 4.7767864601731995, 4.796629645090448, 4.816555260317475, 4.8365636482769325, 4.856655152813922, 4.876830119201921, 4.897088894148671, 4.917431825802198, 4.9378592637567555, 4.958371559058841, 4.978969064213229, 4.999652133189042, 5.020421121425788, 5.041276385839534, 5.062218284828995, 5.083247178281707, 5.104363427580219, 5.1255673956082655, 5.14685944675706, 5.168239946931519, 5.189709263556561, 5.21126776558343, 5.232915823495991, 5.254653809317166, 5.276482096615281, 5.298401060510496, 5.320411077681265, 5.342512526370763, 5.364705786393454, 5.3869912391415715, 5.409369267591687, 5.431840256311301, 5.454404591465407, 5.477062660823193, 5.499814853764665, 5.522661561287347, 5.54560317601301, 5.568640092194379, 5.59177270572197, 5.6150014141308535, 5.638326616607493, 5.66174871399662, 5.685268108808076, 5.708885205223796, 5.732600409104711, 5.756414127997733, 5.780326771142772, 5.804338749479721, 5.828450475655587, 5.852662364031536, 5.8769748306900285, 5.901388293441978, 5.925903171833886, 5.95051988715512, 5.97523886244511, 6.00006052250063, 6.024985293883094, 6.0500136049259, 6.075145885741749, 6.100382568230098, 6.125724086084543, 6.15117087480028, 6.176723371681601, 6.202382015849364, 6.2281472482486055, 6.254019511656079, 6.279999250687865, 6.306086911807037, 6.33228294333127, 6.3585877954406325, 6.385001920185266, 6.4115257714931655, 6.438159805177999, 6.46490447894688, 6.491760252408322, 6.518727587080074, 6.545806946397071, 6.572998795719413, 6.600303602340302, 6.62772183549416, 6.655253966364635, 6.6829004680927095, 6.710661815784854, 6.7385384865211275, 6.766530959363464, 6.794639715363846, 6.822865237572589, 6.851208011046658, 6.879668522857941, 6.908247262101707, 6.936944719904958, 6.965761389434878, 6.994697765907324, 7.023754346595282, 7.0529316308374925, 7.082230120046982, 7.111650317719688, 7.141192729443127, 7.170857862905032, 7.2006462279021495, 7.230558336348959, 7.260594702286473, 7.290755841891092, 7.321042273483411, 7.351454517537222, 7.381993096688392, 7.412658535743863, 7.443451361690672, 7.4743721037050195, 7.505421293161307, 7.536599463641353, 7.567907150943507, 7.599344893091875, 7.630913230345573, 7.662612705207955, 7.694443862436028, 7.72640724904975, 7.7585034143414475, 7.790732909885273, 7.823096289546616, 7.855594109491719, 7.888226928197172, 7.920995306459523, 7.953899807404938, 7.986940996498805, 8.020119441555554, 8.05343571274835, 8.086890382618906, 8.120484026087341, 8.154217220461991, 8.188090545449429, 8.222104583164365, 8.256259918139664, 8.290557137336407, 8.324996830153912, 8.359579588439964, 8.394306006500916, 8.429176681111922, 8.464192211527214, 8.499353199490319, 8.534660249244514, 8.570113967543135, 8.605714963660027, 8.64146384940003, 8.677361239109418, 8.713407749686567, 8.749604000592484, 8.785950613861472, 8.822448214111835, 8.859097428556545, 8.89589888701412, 8.932853221919384, 8.969961068334348, 9.007223063959145, 9.044639849142916, 9.082212066894922, 9.11994036289552, 9.15782538550728, 9.19586778578613, 9.234068217492553, 9.272427337102759, 9.310945803820069, 9.349624279586177, 9.388463429092537, 9.42746391979181, 9.466626421909256, 9.505951608454364, 9.545440155232345, 9.585092740855764, 9.62491004675622, 9.664892757195979, 9.705041559279852, 9.745357142966922, 9.78584020108242, 9.826491429329659, 9.867311526301899, 9.908301193494475, 9.949461135316781, 9.990792059104383, 10.032294675131205, 10.073969696621642, 10.115817839762958, 10.157839823717488, 10.20003637063504, 10.242408205665306, 10.284956056970259, 10.327680655736778, 10.370582736189133, 10.413663035601632, 10.456922294311298, 10.500361255730517, 10.543980666359943, 10.58778127580123, 10.631763836769947, 10.675929105108526, 10.720277839799175, 10.76481080297704, 10.809528759943223, 10.854432479177952, 10.89952273235381, 10.944800294348912, 10.990265943260345, 11.03592046041746, 11.081764630395318, 11.127799241028194, 11.174025083423029, 11.220442951973153, 11.26705364437186, 11.313857961626127, 11.360856708070383, 11.408050691380355, 11.455440722586857, 11.503027616089865, 11.550812189672417, 11.598795264514697, 11.646977665208162, 11.695360219769626, 11.743943759655625, 11.792729119776613, 11.84171713851134, 11.89090865772127, 11.940304522764968, 11.989905582512758, 12.039712689361224, 12.089726699247878, 12.139948471665898, 12.19037886967879, 12.241018759935384, 12.291869012684614, 12.342930501790505, 12.394204104747214, 12.445690702694007, 12.497391180430556, 12.549306426432045, 12.601437332864458, 12.653784795599941, 12.706349714232092, 12.759132992091574, 12.812135536261543, 12.865358257593254, 12.918802070721744, 12.972467894081445, 13.026356649922123, 13.080469264324623, 13.134806667216811, 13.18936979238958, 13.244159577512793, 13.299176964151552, 13.354422897782277, 13.409898327808978, 13.4656042075796, 13.521541494402298, 13.577711149562044, 13.634114138337049, 13.690751430015373, 13.747623997911608, 13.804732819383496, 13.862078875848892, 13.91966315280252, 13.977486639832934, 14.035550330639518, 14.093855223049607, 14.152402319035506, 14.211192624731888, 14.270227150452966, 14.329506910709888, 14.389032924228198, 14.448806213965225, 14.50882780712784, 14.569098735189991, 14.62962003391046, 14.690392743350685, 14.751417907892527, 14.812696576256386, 14.874229801519107, 14.936018641132106, 14.99806415693958, 15.060367415196623, 15.122929486587735, 15.185751446245105, 15.248834373767112, 15.312179353236916, 15.375787473240953, 15.439659826887839, 15.503797511827022, 15.568201630267689, 15.632873288997722, 15.697813599402606, 15.763023677484714, 15.828504643882352, 15.894257623889061, 15.960283747472978, 16.026584149296127, 16.093159968734117, 16.160012349895588, 16.227142441641906, 16.29455139760694, 16.36224037621676, 16.430210540709723, 16.498463059156364, 16.56699910447947, 16.635819854474295, 16.704926491828648, 16.77432020414343, 16.844002183952902, 16.913973628745225, 16.984235740983053, 17.054789728124074, 17.125636802641967, 17.196778182047098, 17.268215088907468, 17.339948750869738, 17.411980400680353, 17.48431127620659, 17.55694262045804, 17.629875681607825, 17.703111713014085, 17.776651973241563, 17.85049772608307, 17.924650240581435, 17.99911079105117, 18.073880657100386, 18.148961123652853, 18.224353480969896, 18.300059024672823, 18.376079055765018, 18.452414880654352, 18.529067811175665, 18.60603916461315, 18.683330263723242, 18.760942436757173, 18.838877017483842, 18.917135345212785, 18.995718764817035, 19.074628626756443, 19.15386628710077, 19.233433107552987, 19.313330455472755, 19.393559703899736, 19.47412223157744, 19.555019422976756, 19.636252668319788, 19.717823363603777, 19.799732910624947, 19.881982717002813, 19.964574196204232, 20.047508767567727, 20.130787856327913, 20.214412893639825, 20.298385316603767, 20.38270656828985, 20.46737809776281, 20.552401360106973, 20.637777816451084, 20.723508933993667, 20.809596186028077, 20.89604105196786, 20.982845017372203, 21.070009573971326, 21.15753621969234, 21.245426458684832, 21.33368180134677, 21.422303764350435, 21.51129387066854, 21.600653649600222, 21.69038463679761, 21.780488374292005, 21.87096641052044, 21.961820300352347, 22.053051605116067, 22.144661892625983, 22.23665273720927, 22.329025719732982, 22.42178242763129, 22.51492445493256, 22.608453402287036, 22.70237087699415, 22.796678493030186, 22.891377871076084, 22.986470638545097, 23.08195842961102, 23.177842885236114, 23.274125653199327, 23.37080838812468, 23.4678927515095, 23.56538041175326, 23.663273044186063, 23.76157233109748, 23.8602799617655, 23.95939763248538, 24.05892704659908, 24.15886991452434, 24.259227953784126, 24.360002889036185, 24.4611964521025, 24.562810381999338, 24.664846424966946, 24.7673063344996, 24.8701918713758, 24.973504803688304, 25.077246906874848, 25.18141996374844, 25.286025764528038, 25.39106610686938, 25.49654279589567, 25.60245764422891, 25.70881247202082, 25.815609106984212, 25.922849384424406, 26.0305351472706, 26.138668246107827, 26.247250539208558, 26.356283892564694, 26.465770179919623, 26.575711282800484, 26.68610909055028, 26.796965500360663, 26.908282417304342, 27.020061754367852, 27.132305432484504, 27.245015380567164, 27.358193535541727, 27.471841842380197, 27.58596225413417, 27.700556731968426, 27.815627245194435, 27.931175771304527, 28.047204296005646, 28.163714813253534, 28.28070932528706, 28.39818984266239, 28.516158384287895, 28.634616977458595, 28.753567657891082, 28.873012469758546, 28.99295346572567, 29.113392706984264, 29.234332263288444, 29.35577421299027, 29.477720643075514, 29.600173649199288, 29.723135335722414, 29.846607815747355, 29.970593211154583, 30.09509365263911, 30.22011127974685, 30.345648240911764, 30.471706693492532, 30.598288803809684, 30.72539674718291, 30.853032707968158, 30.981198879595585, 31.109897464606977, 31.239130674693673, 31.368900730734627, 31.49920986283433, 31.63006031036151, 31.761454321987365, 31.89339415572427, 32.025882078964635, 32.15892036851963, 32.29251131065868, 32.42665720114852, 32.56136034529269, 32.69662305797116, 32.83244766368018, 32.96883649657196, 33.105791900495184, 33.24331622903502, 33.381411845553615, 33.520081123230824, 33.65932644510467, 33.799150204112735, 33.93955480313301, 34.080542655025226, 34.222116182672444, 34.364277819022355, 34.50703000712955, 34.65037520019722, 34.79431586161933, 34.938854465023134, 35.08399349431128, 35.229735443704996, 35.37608281778666, 35.52303813154288, 35.67060391040784, 35.81878269030634, 35.967577017697884, 36.11698944962009, 36.26702255373276, 36.417678908362014, 36.56896110254438, 36.720871736071665, 36.87341341953537, 37.02658877437161, 37.18040043290627, 37.3348510383999, 37.489943245093606, 37.645679718254385, 37.80206313422098, 37.95909618044993, 38.1167815555615, 38.27512196938648, 38.43412014301245, 38.59377880883062, 38.754100710582875, 38.915088603408606, 39.076745253892526, 39.23907344011191, 39.40207595168439, 39.565755589816, 39.73011516734899, 39.89515750881064, 40.06088545046148, 40.2273018403441, 40.39440953833213, 40.56221141617942, 40.73071035756911, 40.89990925816364, 41.069811025654204, 41.24041857981081, 41.4117348525325, 41.583762787897456, 41.75650534221405, 41.92996548407134, 42.10414619439016, 42.27905046647442, 42.45468130606224, 42.631041731378076, 42.80813477318426, 42.98596347483319, 43.164530892319696, 43.3438400943332, 43.52389416231102, 43.70469619049089, 43.88624928596434, 44.06855656873007, 44.25162117174726, 44.43544624098998, 44.62003493550082, 44.80539042744532, 44.99151590216657, 45.17841455823956, 45.36608960752672, 45.55454427523276, 45.74378179996013, 45.93380543376486, 46.12461844221198, 46.31622410443226, 46.50862571317816, 46.701826574880535, 46.89583000970552, 47.09063935161123, 47.28625794840561, 47.482689161803606, 47.679936367485006, 47.87800295515257, 48.07689232858988, 48.276607905720425, 48.477153118665946, 48.678531413805516, 48.880746251834864, 49.08380110782545, 49.28769947128479, 49.492444846215996, 49.698040751178134, 49.904490719346654, 50.11179829857424, 50.31996705145134, 50.52900055536803, 50.73890240257507, 50.94967620024573, 51.161325570537926, 51.37385415065598, 51.5872655929138, 51.80156356479725, 52.01675174902719, 52.23283384362299, 52.449813561965556, 52.66769463286182, 52.886480800608396, 53.106175825056056, 53.3267834816744, 53.548307561616326, 53.770751871783865, 53.99412023489311, 54.21841648954006, 54.4436444902667, 54.66980810762676, 54.89691122825292, 55.12495775492317, 55.35395160662799, 55.58389671863776, 55.81479704257001, 56.04665654645795, 56.27947921481826, 56.51326904871961, 56.74803006585158, 56.98376630059327, 57.22048180408323, 57.458180644288724, 57.696866906075684, 57.93654469127904, 58.177218118772764, 58.41889132454133, 58.66156846175032, 58.90525370081796, 59.14995122948684, 59.39566525289545, 59.64239999365115, 59.89015969190227, 60.13894860541106, 60.38877100962701, 60.63963119775984, 60.891533480854, 61.144482187862266, 61.39848166572027, 61.653536279421175, 61.90965041209084, 62.16682846506263, 62.425074857953796, 62.68439402874096, 62.94479043383647, 63.20626854816511, 63.468832865240536, 63.73248789724321, 63.997238175097465, 64.2630882485495, 64.53004268624562, 64.7981060758104, 65.0672830239261, 65.33757815641144, 65.6089961183012, 65.88154157392619, 66.1552192069928, 66.43003372066437, 66.70598983764147, 66.98309230024317, 67.26134587048865, 67.54075533017858, 67.82132548097799, 68.10306114449834, 68.3859671623805, 68.67004839637802, 68.95530972844023, 69.2417560607969, 69.52939231604194, 69.81822343721814, 70.10825438790229, 70.39949015228984, 70.69193573528148, 70.98559616256853, 71.28047648071946, 71.57658175726681, 71.8739170807936, 72.17248756102174, 72.4722983288992, 72.77335453668836, 73.0756613580547, 73.37922398815509, 73.684047643728, 73.99013756318251, 74.29749900668855, 74.60613725626719, 74.91605761588167, 75.2272654115279, 75.53976599132683, 75.85356472561593, 76.16866700704139, 76.48507825065118, 76.80280389398732, 77.12184939718034, 77.44222024304247, 77.76392193716201, 78.08696000799812, 78.41134000697515, 78.73706750857907, 79.06414811045256, 79.39258743349141, 79.72239112194126, 80.05356484349392, 80.38611428938579, 80.72004517449501, 81.05536323743979, 81.39207424067726, 81.73018397060176, 82.06969823764534, 82.4106228763769, 82.75296374560268, 83.09672672846703, 83.44191773255291, 83.78854268998441, 84.136607557528, 84.48611831669504, 84.83708097384483, 85.18950156028707, 85.54338613238656, 85.89874077166658, 86.25557158491361, 86.6138847042824, 86.9736862874007, 87.33498251747606, 87.6977796034015, 88.06208377986229, 88.42790130744328, 88.79523847273582, 89.16410158844684, 89.53449699350661, 89.90643105317788, 90.27991015916544, 90.6549407297252, 91.03152920977564, 91.4096820710078, 91.78940581199666, 92.17070695831288, 92.55359206263506, 92.93806770486167, 93.32414049222518, 93.7118170594049, 94.10110406864118, 94.49200820985006, 94.88453620073751, 95.27869478691605, 95.67449074201978, 96.07193086782115, 96.4710219943479, 96.87177097999972, 97.27418471166732, 97.67827010484987, 98.0840341037742, 98.49148368151424, 98.90062584011004, 99.31146761068936, 99.72401605358769, 100.13827825846973, 100.55426134445148, 100.97197246022176, 101.39141878416626, 101.81260752449012, 102.23554591934197, 102.66024123693856, 103.08670077568881, 103.5149318643205, 103.94494186200535, 104.37673815848574, 104.81032817420187, 105.24571936041846, 105.6829191993541, 106.1219352043089, 106.56277491979391, 107.00544592166092, 107.44995581723184, 107.89631224543068, 108.34452287691401, 108.79459541420297, 109.24653759181584, 109.7003571764001, 110.15606196686726, 110.61365979452589, 111.07315852321656, 111.53456604944712, 111.99789030252751, 112.46313924470739, 112.93032087131209, 113.3994432108802, 113.87051432530153, 114.34354230995595, 114.81853529385154, 115.29550143976564, 115.77444894438432, 116.25538603844329, 116.73832098686978, 117.22326208892348, 117.71021767834065, 118.19919612347638, 118.69020582744862, 119.18325522828287, 119.67835279905616, 120.17550704804414, 120.67472651886636, 121.17601979063332, 121.67939547809407, 122.18486223178338, 122.69242873817184, 123.20210371981413, 123.71389593549917, 124.2278141804009, 124.74386728622844, 125.26206412137932, 125.78241359109094, 126.30492463759381, 126.82960624026552, 127.35646741578395, 127.88551721828388, 128.41676473951145, 128.9502191089807, 129.48588949413073, 130.02378510048223, 130.56391517179713, 131.10628899023658, 131.65091587652054, 132.19780519008836, 132.74696632925853, 133.29840873139173, 133.852141873052, 134.4081752701699, 134.96651847820613, 135.52718109231495, 136.09017274751042, 136.65550311883106, 137.22318192150635, 137.79321891112392, 138.3656238837961, 138.94040667633004, 139.51757716639548, 140.0971452726949, 140.67912095513393, 141.26351421499274, 141.85033509509688, 142.43959367999156, 143.0313000961137, 143.62546451196636, 144.22209713829372, 144.8212082282554, 145.4228080776044, 146.02690702486294, 146.63351545150027, 147.24264378211154, 147.85430248459562, 148.46850207033683, 149.08525309438446, 149.7045661556343, 150.32645189701125, 150.95092100565088, 151.57798421308502, 152.20765229542482, 152.83993607354643, 153.47484641327708, 154.1123942255807, 154.75259046674725, 155.3954461385797, 156.04097228858356, 156.6891800101569, 157.3400804427797, 157.99368477220742, 158.65000423066166, 159.3090500970237, 159.97083369702858, 160.63536640345848, 161.30265963634002, 161.97272486313935, 162.64557359895943, 163.32121740673824, 163.99966789744627, 164.680936730288, 165.3650356129009, 166.05197630155692, 166.74177060136503, 167.43443036647255, 168.129967500271, 168.82839395559927, 169.52972173494942, 170.23396289067315, 170.9411295251878, 171.65123379118603, 172.36428789184367, 173.0803040810295, 173.79929466351598, 174.521271995191, 175.24624848326883, 175.97423658650538, 176.70524881541107, 177.43929773246597, 178.17639595233618, 178.91655614208912, 179.6597910214134, 180.406113362836, 181.155535991942, 181.90807178759547, 182.6637336821593, 183.42253466171968, 184.18448776630768, 184.94960609012386, 185.71790278176357, 186.48939104444145, 187.2640841362205, 188.0419953702386, 188.82313811493745, 189.60752579429288, 190.3951718880439, 191.18608993192663, 191.98029351790552, 192.77779629440715, 193.57861196655523, 194.3827542964046, 195.19023710318007, 196.00107426351224, 196.8152797116765, 197.63286743983278, 198.4538514982645, 199.27824599562237, 200.1060650991652, 200.93732303500386, 201.77203408834617, 202.61021260374065, 203.4518729853256, 204.29702969707486, 205.14569726304694, 205.997890267635, 206.8536233558157, 207.7129112334035, 208.57576866730165, 209.44221048575642, 210.3122515786123, 211.18590689756618, 212.06319145642698, 212.94412033137175, 213.82870866120533, 214.71697164762045, 215.60892455545945, 216.5045827129748, 217.40396151209526, 218.3070764086884, 219.21394292282696, 220.1245766390558, 221.0389932066579, 221.9572083399262, 222.87923781843165, 223.80509748729494, 224.7348032574592, 225.66837110596157, 226.60581707621068, 227.54715727826033, 228.49240788908688, 229.4415851528678, 230.39470538125872, 231.35178495367686, 232.3128403175804, 233.27788798875176, 234.24694455158175, 235.2200266593528, 236.1971510345279, 237.1783344690362, 238.1635938245619, 239.15294603283462, 240.1464080959184, 241.14399708650677, 242.14573014821423, 243.15162449587132, 244.16169741582104, 245.17596626621375, 246.1944484773087, 247.21716155177134, 248.2441230649748, 249.2753506653022, 250.3108620744482, 251.35067508772642, 252.39480757437315, 253.44327747785508, 254.4961028161782, 255.5533016821952, 256.6148922439197, 257.6808927448362, 258.7513215042144, 259.82619691742406, 260.9055374562496, 261.98936166921027, 263.077688181877, 264.17053569719303, 265.267922995795, 266.36986893633673, 267.4763924558108, 268.5875125698774, 269.70324837318867, 270.82361903971787, 271.94864382308896, 273.0783420569055, 274.21273315508626, 275.3518366121965, 276.4956720037835, 277.64425898671385, 278.7976172995085, 279.95576676268587, 281.1187272790998, 282.2865188342824, 283.4591614967879, 284.6366754185354, 285.81908083515856, 287.0063980663509, 288.19864751621594, 289.39584967361793, 290.59802511253207, 291.80519449240137, 293.01737855848927, 294.23459814223696, 295.4568741616217, 296.68422762151425, 297.916679614043, 299.1542513189544, 300.3969640039773, 301.64483902518936, 302.8978978273811, 304.1561619444287, 305.419652999661, 306.6883927062324, 307.9624028674959, 309.2417053773758, 310.52632222074755, 311.816275473813, 313.11158730448045, 314.4122799727464, 315.7183758310751, 317.02989732478704, 318.34686699244185, 319.6693074662261, 320.9972414723433, 322.33069183140157, 323.6696814588096, 325.01423336516825, 326.3643706566663, 327.72011653547764, 329.0814943001607, 330.44852734605615, 331.8212391656929, 333.1996533491891, 334.58379358465845, 335.9736836586178, 337.36934745639314, 338.77080896253426, 340.1780922612241, 341.5912215366934, 343.0102210736371, 344.4351152576287, 345.86592857554353, 347.3026856159768, 348.7454110696671, 350.1941297299209, 351.64886649303634, 353.10964635873484, 354.57649443058824, 356.0494359164509, 357.52849612889327, 359.0137004856344, 360.50507450998293, 362.0026438312728, 363.50643418530433, 365.01647141478736, 366.5327814697825, 368.05539040815125, 369.5843243960009, 371.11960970813533, 372.6612727285066, 374.209339950666, 375.7638379782235, 377.324793525302, 378.89223341699727, 380.4661845898395, 382.04667409225334, 383.6337290850272, 385.22737684177696, 386.82764474941564, 388.43456030862444, 390.0481511343225, 391.66844495614606, 393.295469618922, 394.92925308314693, 396.56982342546854, 398.21720883916504, 399.8714376346343, 401.5325382398773, 403.20053920098724, 404.87546918264053, 406.5573569685898, 408.24623146215527, 409.9421216867268, 411.645056786259, 413.3550660257728, 415.07217879185987, 416.79642459318325, 418.5278330609905, 420.2664339496187, 422.01225713700745, 423.76533262521247, 425.5256905409181, 427.2933611359602, 429.0683747878424, 430.85076200025924, 432.640553403621, 434.4377797555768, 436.2424719415482, 438.05466097525687, 439.8743779992579, 441.7016542854762, 443.5365212357404, 445.37901038232764, 447.22915338850197, 449.08698204905943, 450.9525282908753, 452.82582417344906, 454.706901889461, 456.5957937653215, 458.4925322617279, 460.39714997422277, 462.3096796337507, 464.2301541072263, 466.1586063980952, 468.0950696469022, 470.0395771318618, 471.99216226942616, 473.9528586148652, 475.9216998628393, 477.8987198479795, 479.8839525454698, 481.8774320716269, 483.8791926844929, 485.8892687844195, 487.90769491466074, 489.93450576196705, 491.96973615717775, 494.01342107582553, 496.06559563873344, 498.1262951126194, 500.1955549107024, 502.27341059331206, 504.3598978684955, 506.4550525926375, 508.558910771072, 510.67150855870244, 512.7928822606239, 514.9230683327426, 517.0621033824093, 519.2100241690434, 521.3668676047665, 523.5326707550371, 525.7074708392838, 527.8913052315511, 530.0842114611374, 532.2862272132412, 534.4973903296094, 536.7177388091839, 538.9473108087603, 541.1861446436403, 543.4342787882902, 545.6917518770039, 547.9586027045622, 550.2348702269059, 552.5205935618014, 554.8158119895135, 557.1205649534814, 559.4348920609932, 561.7588330838718, 564.0924279591547, 566.4357167897815, 568.788739845284, 571.1515375624734, 573.5241505461428, 575.9066195697596, 578.2989855761681, 580.7012896782934, 583.1135731598442, 585.5358774760285, 587.9682442542619, 590.4107152948836, 592.8633325718766, 595.3261382335837, 597.7991746034389, 600.2824841806907, 602.7761096411328, 605.2800938378392, 607.7944798018955, 610.319310743146, 612.8546300509312, 615.4004812948345, 617.9569082254314, 620.5239547750421, 623.1016650584817, 625.690083373826, 628.2892542031675, 630.8992222133811, 633.5200322568933, 636.1517293724471, 638.7943587858849, 641.4479659109194, 644.1125963499157, 646.7882958946769, 649.4751105272248, 652.1730864205988, 654.8822699396434, 657.602707641807, 660.3344462779429, 663.0775327931076, 665.8320143273752, 668.5979382166427, 671.3753519934442, 674.1643033877697, 676.9648403278795, 679.7770109411363, 682.6008635548263, 685.436446696992, 688.2838090972664, 691.1429996877057, 694.0140676036384, 696.8970621845039, 699.7920329747018, 702.699029724445, 705.618102390609, 708.5493011375983, 711.4926763382034, 714.4482785744682, 717.4161586385596, 720.3963675336357, 723.3889564747302, 726.3939768896271, 729.4114804197459, 732.4415189210306, 735.4841444648347, 738.5394093388251, 741.6073660478747, 744.6880673149664, 747.7815660820985, 750.887915511197, 754.0071689850221, 757.1393801080955, 760.284602707615, 763.4428908343816, 766.614298763729, 769.7988809964513, 772.9966922597476, 776.2077875081577, 779.4322219245068, 782.6700509208562, 785.9213301394486, 789.1861154536746, 792.4644629690258, 795.7564290240612, 799.0620701913762, 802.3814432785692, 805.7146053292271, 809.0616136238989, 812.4225256810823, 815.7973992582133, 819.1862923526525, 822.5892632026912, 826.0063702885462, 829.4376723333662, 832.8832283042427, 836.3430974132161, 839.8173391183045, 843.3060131245174, 846.8091793848846, 850.3268981014874, 853.8592297264867, 857.4062349631721, 860.967974766998, 864.5445103466336, 868.1359031650153, 871.7422149403969, 875.3635076474204, 878.9998435181743, 882.6512850432642, 886.3178949728892, 889.9997363179126, 893.6968723509557, 897.4093666074781, 901.1372828868709, 904.8806852535557, 908.6396380380772, 912.4142058382208, 916.2044535201144, 920.0104462193458, 923.8322493420814, 927.6699285661924, 931.5235498423762, 935.3931793953003, 939.2788837247336, 943.1807296066911, 947.0987840945825, 951.0331145203576, 954.983788495675, 958.9508739130555, 962.9344389470521, 966.9345520554219, 970.9512819802964, 974.9846977493731, 979.0348686770949, 983.1018643658427, 987.1857547071342, 991.2866098828158, 995.404500366282, 999.5394969236775, 1003.6916706151159, 1007.8610927959026, 1012.047835117753, 1016.2519695300363, 1020.473568281003, 1024.71270391903, 1028.9694492938677, 1033.2438775578846, 1037.536062167337, 1041.8460768836226, 1046.1739957745503, 1050.5198932156156, 1054.8838438912692, 1059.2659227962142, 1063.6662052366864, 1068.0847668317497, 1072.5216835145986, 1076.977031533854, 1081.450887454887, 1085.9433281611252, 1090.4544308553773, 1094.9842730611606, 1099.5329326240258, 1104.100487712907, 1108.6870168214568, 1113.2925987693975, 1117.917312703877, 1122.5612381008211, 1127.224454766312, 1131.9070428379507, 1136.6090827862374, 1141.3306554159533, 1146.0718418675524, 1150.8327236185455, 1155.6133824849155, 1160.413900622514, 1165.2343605284739, 1170.0748450426324, 1174.935437348942, 1179.8162209769164, 1184.7172798030558, 1189.63869805229, 1194.5805602994299, 1199.542951470609, 1204.5259568447598, 1209.5296620550675, 1214.5541530904457, 1219.5995162970153, 1224.6658383795793, 1229.7532064031277, 1234.8617077943227, 1239.9914303430053, 1245.1424622037052, 1250.314891897146, 1255.508808311782, 1260.7243007053153, 1265.9614587062315, 1271.220372315344, 1276.5011319073299, 1281.8038282322973, 1287.128552417336, 1292.4753959680863, 1297.8444507703123, 1303.2358090914727, 1308.64956358232, 1314.0858072784847, 1319.544633602074, 1325.0261363632824, 1330.5304097619912, 1336.057548389405, 1341.6076472296647, 1347.180801661485, 1352.7771074597936, 1358.3966607973678, 1364.039558246503, 1369.7058967806618, 1375.395773776143, 1381.109287013757, 1386.846534680497, 1392.6076153712409, 1398.3926280904357, 1404.201672253802, 1410.034847690041, 1415.8922546425547, 1421.7739937711558, 1427.680166153815, 1433.6108732883877, 1439.5662170943588, 1445.5462999145998, 1451.5512245171137, 1457.5810940968202, 1463.636012277316, 1469.7160831126596, 1475.821411089162, 1481.9521011271702, 1488.108258582889, 1494.2899892501782, 1500.4973993623753, 1506.7305955941226, 1512.9896850631892, 1519.2747753323301, 1525.5859744111222, 1531.923390757823, 1538.2871332812388, 1544.6773113425827, 1551.0940347573735, 1557.53741379731, 1564.0075591921686, 1570.5045821317108, 1577.02859426758, 1583.57970771524, 1590.1580350558884, 1596.763689338395, 1603.3967840812477, 1610.0574332744907, 1616.7457513817014, 1623.4618533419468, 1630.2058545717603, 1636.9778709671282, 1643.7780189054697, 1650.6064152476556, 1657.4631773400035, 1664.3484230162976, 1671.2622705998178, 1678.2048389053582, 1685.1762472412906, 1692.1766154116006, 1699.2060637179497, 1706.264712961747, 1713.3526844462097, 1720.4700999784707, 1727.6170818716557, 1734.7937529469907, 1742.000236535911, 1749.2366564821853, 1756.503137144029, 1763.7998033962635, 1771.126780632447, 1778.4841947670338, 1785.872172237541, 1793.2908400067076, 1800.7403255646973, 1808.2207569312757, 1815.7322626580135, 1823.2749718304995, 1830.849014070544, 1838.4545195384283, 1846.091618935128, 1853.7604435045614, 1861.461125035849, 1869.1937958655633, 1876.9585888800264, 1884.755637517577, 1892.5850757708693, 1900.4470381891774, 1908.341659880694, 1916.2690765148736, 1924.2294243247507, 1932.2228401092825, 1940.2494612357057, 1948.3094256418801, 1956.4028718386835, 1964.5299389123754, 1972.6907665269923, 1980.8854949267509, 1989.1142649384424, 1997.377217973877, 2005.6744960322974, 2014.006241702824, 2022.3725981669086, 2030.7737092007787, 2039.2097191779333, 2047.680773071607, 2056.187016457266, 2064.728595515114, 2073.305657032587, 2081.9183484069013, 2090.56681764757, 2099.251213378951, 2107.9716848428034, 2116.7283819008385, 2125.5214550373175, 2134.3510553616234, 2143.2173346108593, 2152.1204451524586, 2161.0605399868055, 2170.0377727498485, 2179.052297715766, 2188.1042697996013, 2197.193844559927, 2206.321178201524, 2215.4864275780487, 2224.6897501947547, 2233.9313042111803, 2243.211248443874, 2252.529742369125, 2261.886946125688, 2271.283020517562, 2280.718127016734, 2290.1924277659605, 2299.7060855815575, 2309.2592639561803, 2318.85212706166, 2328.4848397518085, 2338.157567565254, 2347.87047672829, 2357.6237341577166, 2367.4175074637333, 2377.2519649528026, 2387.1272756305466, 2397.043609204656, 2407.0011360877884, 2417.000027400524, 2427.0404549742875, 2437.122591354307, 2447.246609802584, 2457.4126843008485, 2467.620989553582, 2477.871700990999, 2488.1649947720653, 2498.501047787531, 2508.880037662953, 2519.3021427617714, 2529.7675421883623, 2540.2764157911142, 2550.828944165528, 2561.425308657298, 2572.0656913654593, 2582.750275145498, 2593.4792436124976, 2604.2527811442983, 2615.071072884648, 2625.934304746412, 2636.84266341475, 2647.7963363503272, 2658.7955117925358, 2669.840378762738, 2680.93112706749, 2692.067947301836, 2703.251030852565, 2714.4805699015023, 2725.756757428819, 2737.0797872163257, 2748.4498538508365, 2759.8671527274896, 2771.331880053112, 2782.844232849597, 2794.4044089572667, 2806.0126070383053, 2817.669026580152, 2829.3738678989343, 2841.127332142915, 2852.929621295928, 2864.780938180882, 2876.6814864632247, 2888.631470654447, 2900.631096115605, 2912.6805690608235, 2924.7800965608776, 2936.9298865467254, 2949.130147813089, 2961.3810900220474, 2973.682923706616, 2986.0358602744013, 2998.4401120112084, 3010.8958920846967, 3023.403414548048, 3035.962894343623, 3048.5745473066863, 3061.2385901690986, 3073.9552405630416, 3086.7247170247665, 3099.5472389983242, 3112.4230268393744, 3125.3523018189467, 3138.335286127249, 3151.372202877495, 3164.463276109709, 3177.608730794617, 3190.8087928374857, 3204.0636890820124, 3217.37364731423, 3230.7388962663936, 3244.1596656209517, 3257.636186014468, 3271.1686890415895, 3284.7574072590273, 3298.4025741895607, 3312.104424326022, 3325.8631931353684, 3339.679117062699, 3353.5524335353275, 3367.483380966867, 3381.472198761302, 3395.5191273171417, 3409.624408031525, 3423.7882833043755, 3438.010996542574, 3452.292792164113, 3466.6339156023405, 3481.034613310148, 3495.4951327642143, 3510.0157224692653, 3524.5966319623144, 3539.2381118169956, 3553.94041364784, 3568.703790114608, 3583.5284949266374, 3598.4147828471737, 3613.3629096977947, 3628.373132362775, 3643.4457087935075, 3658.5808980129477, 3673.7789601200307, 3689.0401562941875, 3704.364748799804, 3719.7530009907355, 3735.2051773148387, 3750.721543318488, 3766.302365651182, 3781.9479120700976, 3797.658451444698, 3813.434253761361, 3829.275590127989, 3845.182732778712, 3861.1559550785364, 3877.195531528052, 3893.3017377681545, 3909.4748505847524, 3925.715147913571, 3942.0229088448955, 3958.398413628378, 3974.8419436778586, 3991.353781576171, 4007.934211080048, 4024.583517124963, 4041.301985830036, 4058.089904502951, 4074.9475616449013, 4091.8752469555147, 4108.873251337881, 4125.941866903518, 4143.081386977399, 4160.292106103006, 4177.574320047353, 4194.9283258061205, 4212.3544216087275, 4229.852906923464, 4247.424082462644, 4265.0682501877445, 4282.785713314637, 4300.576776318775, 4318.441744940425, 4336.380926189937, 4354.39462835298, 4372.4831609958965, 4390.646834970983, 4408.885962421848, 4427.200856788775, 4445.591832814083, 4464.059206547583, 4482.603295351975, 4501.224417908312, 4519.922894221485, 4538.699045625684, 4557.55319478998, 4576.485665723825, 4595.496783782639, 4614.586875673403, 4633.756269460241, 4653.005294570111, 4672.3342817984285, 4691.743563314765, 4711.23347266856, 4730.804344794819, 4750.4565160199245, 4770.190324067377, 4790.006108063614, 4809.904208543839, 4829.8849674578405, 4849.948728175926, 4870.0958354947825, 4890.326635643412, 4910.641476289094, 4931.040706543314, 4951.524676967831, 4972.093739580654, 4992.74824786211, 5013.48855676091, 5034.315022700264, 5055.228003583965, 5076.227858802599, 5097.314949239683, 5118.489637277873, 5139.752286805207, 5161.103263221312, 5182.542933443749, 5204.071665914276, 5225.68983060519, 5247.397799025694, 5269.195944228245, 5291.084640815018, 5313.064264944312, 5335.135194337017, 5357.297808283123, 5379.552487648187, 5401.899614879949, 5424.339574014858, 5446.872750684686, 5469.499532123163, 5492.220307172586, 5515.035466290572, 5537.945401556722, 5560.950506679368, 5584.051177002353, 5607.2478095117785, 5630.540802842895, 5653.930557286905, 5677.417474797858, 5701.001958999566, 5724.684415192494, 5748.465250360797, 5772.344873179261, 5796.32369402035, 5820.402124961255, 5844.580579790941, 5868.859474017321, 5893.2392248743545, 5917.720251329225, 5942.302974089554, 5966.987815610583, 5991.775200102507, 6016.665553537713, 6041.659303658115, 6066.756879982517, 6091.958713813941, 6117.265238247121, 6142.676888175887, 6168.1941003006605, 6193.81731313595, 6219.546967017906, 6245.383504111837, 6271.327368419878, 6297.379005788581, 6323.538863916577, 6349.8073923622915, 6376.185042551618, 6402.672267785747, 6429.269523248911, 6455.977266016218, 6482.795955061516, 6509.726051265234, 6536.768017422373, 6563.9223182504165, 6591.1894203973225, 6618.569792449557, 6646.063904940098, 6673.672230356595, 6701.39524314944, 6729.233419739935, 6757.187238528488, 6785.257179902784, 6813.4437262461215, 6841.747361945647, 6870.168573400693, 6898.707849031152, 6927.365679285812, 6956.142556650869, 6985.038975658337, 7014.055432894559, 7043.192427008753, 7072.450458721527, 7101.830030833571, 7131.331648234234, 7160.955817910223, 7190.703048954326, 7220.573852574098, 7250.568742100745, 7280.688232997877, 7310.932842870384, 7341.303091473348, 7371.799500720915, 7402.422594695348, 7433.172899655983, 7464.050944048281, 7495.057258512926, 7526.192375894883, 7557.45683125265, 7588.851161867386, 7620.3759072521625, 7652.0316091612385, 7683.818811599379, 7715.738060831146, 7747.78990539038, 7779.974896089562, 7812.293586029296, 7844.74653060783, 7877.334287530535, 7910.05741681959, 7942.916480823534, 7975.912044226954, 8009.044674060201, 8042.314939709069, 8075.723412924682, 8109.270667833249, 8142.957280945948, 8176.783831168854, 8210.750899812816, 8244.85907060355, 8279.1089296916, 8313.501065662434, 8348.03606954657, 8382.714534829664, 8417.53705746282, 8452.504235872751, 8487.616670972095, 8522.87496616974, 8558.279727381143, 8593.831563038835, 8629.531084102811, 8665.378904071047, 8701.37563899006, 8737.521907465429, 8773.81833067252, 8810.265532367102, 8846.864138896079, 8883.614779208272, 8920.518084865154, 8957.574690051819, 8994.785231587794, 9032.15034893802, 9069.670684223836, 9107.34688223397, 9145.179590435697, 9183.16945898592, 9221.317140742345, 9259.623291274707, 9298.088568876054, 9336.713634573982, 9375.49915214211, 9414.445788111414, 9453.554211781693, 9492.825095233098, 9532.259113337599, 9571.856943770705, 9611.61926702302, 9651.546766411973, 9691.64012809357, 9731.900041074108, 9772.327197222137, 9812.922291280269, 9853.686020877134, 9894.619086539395, 9935.722191703702, 9976.996042728904, 10018.441348908122, 10060.058822480885, 10101.849178645489, 10143.813135571198, 10185.95141441062, 10228.264739312091, 10270.753837432123, 10313.4194389479, 10356.262277069822, 10399.283088054111, 10442.482611215504, 10485.861588939786, 10529.420766696805, 10573.160893053113, 10617.082719684875, 10661.187001390781, 10705.474496105018, 10749.945964910303, 10794.602172050953, 10839.443884946022, 10884.471874202536, 10929.686913628551, 10975.08978024673, 11020.681254307503, 11066.462119302534, 11112.433161978175, 11158.595172348994, 11204.948943711344, 11251.495272657003, 11298.23495908686, 11345.168806224707, 11392.297620630858, 11439.622212216287, 11487.143394256367, 11534.861983404879, 11582.77879970806, 11630.89466661869, 11679.210411010243, 11727.726863191094, 11776.444856918795, 11825.365229414445, 11874.488821376888, 11923.81647699745, 11973.349043974249, 12023.087373526818, 12073.032320410726, 12123.184742932277, 12173.545502963249, 12224.115465955707, 12274.895500956887, 12325.886480624167, 12377.08928123987, 12428.504782726624, 12480.133868662278, 12531.977426295145, 12584.036346559238, 12636.311524089595, 12688.803857237637, 12741.51424808662, 12794.443602467132, 12847.59282997266, 12900.962843975269, 12954.554561641096, 13008.368903946428, 13062.406795693307, 13116.669165525487, 13171.156945944387, 13225.871073325121, 13280.81248793258, 13335.982133937605, 13391.3809594332, 13447.009916450881, 13502.869960976826, 13558.962052968627, 13615.287156371565, 13671.846239135237, 13728.640273230183, 13785.670234664594, 13842.937103501083, 13900.441863873531, 13958.185504003994, 14016.169016219745, 14074.393396970097, 14132.85964684388, 14191.568770586387, 14250.521777116719, 14309.719679545113, 14369.16349519035, 14428.854245597247, 14488.792956554202, 14548.980658110828, 14609.418384595712, 14670.107174633958, 14731.048071165382, 14792.242121462203, 14853.690377147102, 14915.39389421129, 14977.353733032662, 15039.570958394004, 15102.046639501314, 15164.781850002157, 15227.777668004184, 15291.03517609342, 15354.555461353226, 15418.339615382738, 15482.388734315697, 15546.703918839272, 15611.286274212984, 15676.136910287698, 15741.256941524694, 15806.647487014827, 15872.309670497742, 15938.244620381269, 16004.453469760543, 16070.937356437875, 16137.69742294203, 16204.734816547947, 16272.050689296439, 16339.646198013997, 16407.52250433267, 16475.68077471003, 16544.12218044921, 16612.847897719104, 16681.85910757432, 16751.156995975864, 16820.74275381126, 16890.617576915083, 16960.78266608951, 17031.239227124956, 17101.988470820786, 17173.03161300614, 17244.36987456081, 17316.004481436303, 17387.936664676618, 17460.16766043984, 17532.69871001908, 17605.531059863897, 17678.665961601702, 17752.10467205928, 17825.848453284376, 17899.898572567403, 17974.2563024632, 18048.92292081298, 18123.899710766003, 18199.187960802068, 18274.788964753345, 18350.704021826703, 18426.934436626027, 18503.481519174642, 18580.346584937823, 18657.530954845395, 18735.035955314448, 18812.862918272196, 18891.013181178565, 18969.488087049638, 19048.288984480423, 19127.41722766811, 19206.87417643534, 19286.66119625358, 19366.779658266576, 19447.23093931393, 19528.016421954755, 19609.137494491428, 19690.595550993545, 19772.391991321536, 19854.528221151224, 19937.00565199764, 20019.82570123938, 20102.989792142947, 20186.499353887222, 20270.35582158802, 20354.560636322738, 20439.115245155146, 20524.021101160328, 20609.27966344931, 20694.892397194642, 20780.860773655248, 20867.18627020179, 20953.870370342047, 21040.914563746428, 21128.320346273562, 21216.089219995996, 21304.22269322602, 21392.72228054168, 21481.589502812432, 21570.82588722583, 21660.43296731341, 21750.41228297712, 21840.765380515808, 21931.49381265177, 22022.599138557456, 22114.082923882244, 22205.946740779356, 22298.192167932975, 22390.82079058499, 22483.834200562804, 22577.23399630631, 22671.021782895466, 22765.199172077868, 22859.767782296454, 22954.72923871731, 23050.085173257605, 23145.83722461363, 23241.98703828907, 23338.53626662287, 23435.486568818233, 23532.839610970736, 23630.597066097067, 23728.760614163763, 23827.331942116092, 23926.312743907038, 24025.70472052641, 24125.50958003008, 24225.72903756933, 24326.364815420427, 24427.41864301383, 24528.892256964493, 24630.787401101323, 24733.105826497245, 24835.849291499297, 24939.019561758825, 25042.618410261868, 25146.647617359584, 25251.10897079887, 25356.004265753185, 25461.335304852983, 25567.10389821731, 25673.31186348449, 25779.9610258435, 25887.05321806528, 25994.59028053428, 26102.574061280062, 26211.006416009055, 26319.889208136465, 26429.224308818382, 26539.013596983532, 26649.25895936618, 26759.96229053815, 26871.125492941486, 26982.750476921134, 27094.83916075778, 27207.393470700816, 27320.415341001437, 27433.90671394589, 27547.869539888954, 27662.305777287023, 27777.217392732415, 27892.606360986738, 28008.474665014925, 28124.824296019327, 28241.657253473906, 28358.97554515863, 28476.78118719395, 28595.07620407545, 28713.86262870877, 28833.142502444072, 28952.917875111794, 29073.19080505745, 29193.963359177083, 29315.237612952817, 29437.015650488498, 29559.299564545523, 29682.091456578804, 29805.393436772873, 29929.207624078157, 30053.53614624751, 30178.381139872276, 30303.74475041977, 30429.62913226963, 30556.036448750976, 30682.968872179586, 30810.428583895224, 30938.41777429913, 31066.938642891666, 31195.993398310093, 31325.58425836669, 31455.71345008632, 31586.383209745498, 31717.595782910288, 31849.353424475037, 31981.658398701107, 32114.51297925581, 32247.91944925147, 32381.88010128464, 32516.397237475543, 32651.473169507717, 32787.11021866726, 32923.31071588346, 33060.07700176839, 33197.41142665721, 33335.316350648565, 33473.79414364518, 33612.847185394545, 33752.47786552983, 33892.68858361095, 34033.481749165934, 34174.85978173179, 34316.825110896905, 34459.380176342245, 34602.527427883426, 34746.26932551281, 34890.60833944179, 35035.5469501432, 35181.087648394016, 35327.23293531808, 35473.9853224293, 35621.347331674144, 35769.32149547596, 35917.910356777815, 36067.11646908639, 36216.94239651587, 36367.39071383197, 36518.46400649623, 36670.164870710396, 36822.49591346107, 36975.459752564515, 37129.05901671176, 37283.29634551321, 37438.17438954488, 37593.69581039337, 37749.86328070172, 37906.679484215376, 38064.1471158283, 38222.26888162927, 38381.047498948385, 38540.485696403775, 38700.58621394865, 38861.351802917736, 39022.78522607553, 39184.88925766312, 39347.66668344604, 39511.120300762144, 39675.25291856965, 39840.06735749545, 40005.56644988355, 40171.75303984376, 40338.62998330075, 40506.200148042444, 40674.46641377029, 40843.431672148115, 41013.098826851965, 41183.47079362, 41354.55050030261, 41526.340886912745, 41698.8449056764, 41872.065521083394, 42046.00570993846, 42220.668461411704, 42396.05677709104, 42572.17367103306, 42749.022169815, 42926.60531258677, 43104.926151123174, 43283.98774987634, 43463.7931860284, 43644.345549544385, 43825.64794322546, 44007.70348276158, 44190.51529678607, 44374.086526928695, 44558.42032786982, 44743.51986739463, 44929.38832644756, 45116.02889918697, 45303.44479304001, 45491.639228757806, 45680.615440470705, 45870.37667574413, 46060.92619563363, 46252.26727474198, 46444.40320127478, 46637.33727709711, 46831.07281779029, 47025.61315270886, 47220.96162503776, 47417.12159184983, 47614.09642416348, 47811.889507000815, 48010.504239445036, 48209.944034700005, 48410.212320148144, 48611.3125374095, 48813.248142400946, 49016.02260539548, 49219.63941108196, 49424.10205862493, 49629.41406172475, 49835.578948678216, 50042.60026243837, 50250.481560676584, 50459.2264158429, 50668.83841522765, 50879.32116102305, 51090.67827038516, 51302.913375496, 51516.030123626006, 51730.032177196685, 51944.92321384376, 52160.70692647956, 52377.3870233577, 52594.967228136025, 52813.45127994074, 53032.84293343072, 53253.14595886203, 53474.364142152685, 53696.50128494775, 53919.56120468464, 54143.54773465896, 54368.4647240895, 54594.316038185694, 54821.10555821317, 55048.83718156067, 55277.514821807046, 55507.14240878846, 55737.72388866598, 55969.26322399337, 56201.76439378515, 56435.231393585076, 56669.66823553491, 56905.07894844253, 57141.46757785253, 57378.8381861148, 57617.194852454595, 57856.54167304263, 58096.88276106544, 58338.22224679613, 58580.564277665304, 58823.913018332336, 59068.272650757215, 59313.64737427143, 59560.04140565157, 59807.45897919085, 60055.90434677209, 60305.38177794083, 60555.89555997863, 60807.44999797682, 61060.04941491045, 61313.69815171257, 61568.400567349105, 61824.16103889274, 62080.98396159965, 62338.87374898406, 62597.834832894274, 62857.871663588914, 63118.98870981335, 63381.19045887649, 63644.48141672794, 63908.86610803539, 64174.349076262675, 64440.93488374677, 64708.628111777776, 64977.433360676616, 65247.35524987435, 65518.39841799154, 65790.567522918, 66063.86724189282, 66338.3022715847, 66613.87732817278, 66890.59714742783, 67168.46648479266, 67447.49011546536, 67727.6728344804, 68009.01945679115, 68291.53481735282, 68575.22377120533, 68860.09119355697, 69146.14197986799, 69433.38104593482, 69721.81332797455, 70011.44378271003, 70302.27738745391, 70594.31914019585, 70887.57405968735, 71182.04718552821, 71477.7435782532, 71774.66831941894, 72072.82651169132, 72372.22327893312, 72672.86376629211, 72974.75314028971, 73277.8965889087, 73582.299321684, 73887.96656979111, 74194.90358613634, 74503.11564544697, 74812.60804436199, 75123.38610152305, 75435.45515766594, 75748.8205757123, 76063.48774086215, 76379.46206068512, 76696.74896521532, 77015.35390704339, 77335.28236141047, 77656.53982630235, 77979.13182254392, 78303.06389389407, 78628.34160714093, 78954.97055219754, 79282.95634219827, 79612.30461359397, 79943.02102625073, 80275.11126354591, 80608.58103246614, 80943.43606370535, 81279.68211176322, 81617.32495504418, 81956.37039595665, 82296.82426101272, 82638.69240092869, 82981.98069072422, 83326.69502982529, 83672.84134216433, 84020.42557628226, 84369.45370543074, 84719.93172767489, 85071.86566599626, 85425.2615683964, 85780.1255080008, 86136.46358316322, 86494.28191757089, 86853.58666034826, 87214.38398616489, 87576.68009534007, 87940.48121394974, 88305.79359393353, 88672.62351320215, 89040.97727574532, 89410.86121174005, 89782.28167765944, 90155.24505638235, 90529.75775730154, 90905.82621643603, 91283.45689654029, 91662.65628721559, 92043.43090502161, 92425.78729358836, 92809.73202372865, 93195.27169355101, 93582.41292857313, 93971.162381836, 94361.5267340168, 94753.51269354598, 95147.126996721, 95542.37640782245, 95939.26771923038, 96337.80775154095, 96738.00335368367, 97139.86140303909, 97543.38880555698, 97948.59249587549, 98355.4794374386, 98764.05662261823, 99174.33107283285, 99586.30983866852, 100000.0], "expected": [0.5000249999999792, 0.5000251038521455, 0.5000252081357226, 0.5000253128525027, 0.5000254180042856, 0.5000255235928779, 0.5000256296200944, 0.5000257360877572, 0.5000258429976959, 0.5000259503517477, 0.5000260581517575, 0.500026166399578, 0.5000262750970692, 0.5000263842460992, 0.5000264938485439, 0.5000266039062865, 0.5000267144212185, 0.5000268253952392, 0.5000269368302555, 0.5000270487281826, 0.5000271610909433, 0.5000272739204686, 0.5000273872186977, 0.5000275009875773, 0.5000276152290627, 0.5000277299451171, 0.500027845137712, 0.5000279608088269, 0.5000280769604497, 0.5000281935945764, 0.5000283107132113, 0.5000284283183671, 0.500028546412065, 0.5000286649963344, 0.5000287840732129, 0.5000289036447473, 0.5000290237129921, 0.5000291442800108, 0.5000292653478754, 0.5000293869186664, 0.500029508994473, 0.500029631577393, 0.500029754669533, 0.5000298782730086, 0.5000300023899437, 0.5000301270224712, 0.5000302521727331, 0.50003037784288, 0.5000305040350715, 0.5000306307514765, 0.5000307579942722, 0.5000308857656457, 0.5000310140677925, 0.5000311429029174, 0.5000312722732347, 0.5000314021809674, 0.5000315326283482, 0.5000316636176186, 0.5000317951510299, 0.5000319272308423, 0.5000320598593258, 0.5000321930387593, 0.5000323267714318, 0.5000324610596415, 0.5000325959056959, 0.5000327313119126, 0.5000328672806185, 0.5000330038141501, 0.5000331409148538, 0.5000332785850857, 0.5000334168272117, 0.5000335556436075, 0.5000336950366586, 0.5000338350087605, 0.5000339755623187, 0.5000341166997484, 0.5000342584234754, 0.5000344007359349, 0.5000345436395727, 0.5000346871368446, 0.5000348312302166, 0.500034975922165, 0.5000351212151762, 0.5000352671117473, 0.5000354136143852, 0.5000355607256078, 0.5000357084479433, 0.5000358567839301, 0.5000360057361174, 0.500036155307065, 0.5000363054993433, 0.5000364563155333, 0.5000366077582269, 0.5000367598300264, 0.5000369125335454, 0.5000370658714082, 0.5000372198462496, 0.5000373744607158, 0.500037529717464, 0.5000376856191621, 0.5000378421684893, 0.5000379993681361, 0.5000381572208038, 0.5000383157292052, 0.5000384748960641, 0.500038634724116, 0.5000387952161074, 0.5000389563747966, 0.5000391182029529, 0.5000392807033572, 0.5000394438788024, 0.5000396077320926, 0.5000397722660435, 0.5000399374834825, 0.5000401033872492, 0.5000402699801946, 0.5000404372651814, 0.5000406052450846, 0.5000407739227909, 0.5000409433011989, 0.5000411133832194, 0.5000412841717755, 0.500041455669802, 0.5000416278802462, 0.5000418008060674, 0.5000419744502375, 0.5000421488157406, 0.500042323905573, 0.5000424997227437, 0.5000426762702742, 0.5000428535511984, 0.5000430315685629, 0.500043210325427, 0.5000433898248626, 0.5000435700699545, 0.5000437510637998, 0.5000439328095095, 0.5000441153102065, 0.5000442985690272, 0.500044482589121, 0.5000446673736502, 0.5000448529257903, 0.50004503924873, 0.5000452263456714, 0.5000454142198295, 0.5000456028744333, 0.5000457923127247, 0.5000459825379591, 0.5000461735534055, 0.5000463653623468, 0.500046557968079, 0.500046751373912, 0.5000469455831695, 0.5000471405991893, 0.5000473364253224, 0.5000475330649342, 0.500047730521404, 0.5000479287981251, 0.5000481278985048, 0.5000483278259649, 0.5000485285839408, 0.5000487301758827, 0.5000489326052551, 0.5000491358755366, 0.5000493399902204, 0.5000495449528143, 0.5000497507668406, 0.500049957435836, 0.5000501649633525, 0.5000503733529562, 0.5000505826082284, 0.5000507927327651, 0.5000510037301773, 0.500051215604091, 0.5000514283581472, 0.5000516419960024, 0.5000518565213276, 0.5000520719378095, 0.5000522882491503, 0.500052505459067, 0.5000527235712925, 0.5000529425895751, 0.5000531625176786, 0.5000533833593825, 0.500053605118482, 0.5000538277987879, 0.5000540514041271, 0.5000542759383423, 0.500054501405292, 0.5000547278088509, 0.5000549551529098, 0.5000551834413756, 0.5000554126781714, 0.5000556428672368, 0.5000558740125275, 0.5000561061180157, 0.5000563391876901, 0.5000565732255562, 0.5000568082356359, 0.5000570442219677, 0.5000572811886073, 0.5000575191396267, 0.5000577580791152, 0.5000579980111791, 0.5000582389399416, 0.500058480869543, 0.5000587238041407, 0.50005896774791, 0.5000592127050427, 0.5000594586797487, 0.5000597056762547, 0.5000599536988056, 0.5000602027516637, 0.5000604528391089, 0.500060703965439, 0.5000609561349697, 0.5000612093520344, 0.5000614636209846, 0.5000617189461901, 0.5000619753320387, 0.500062232782936, 0.5000624913033069, 0.5000627508975937, 0.5000630115702576, 0.5000632733257783, 0.5000635361686541, 0.5000638001034019, 0.5000640651345575, 0.5000643312666755, 0.5000645985043294, 0.5000648668521115, 0.5000651363146336, 0.5000654068965262, 0.5000656786024396, 0.5000659514370427, 0.5000662254050244, 0.5000665005110928, 0.5000667767599756, 0.5000670541564203, 0.5000673327051935, 0.5000676124110827, 0.5000678932788942, 0.500068175313455, 0.5000684585196117, 0.5000687429022312, 0.5000690284662009, 0.500069315216428, 0.5000696031578401, 0.500069892295386, 0.5000701826340341, 0.5000704741787741, 0.5000707669346163, 0.5000710609065915, 0.5000713560997516, 0.5000716525191697, 0.5000719501699398, 0.5000722490571768, 0.5000725491860173, 0.500072850561619, 0.5000731531891609, 0.5000734570738439, 0.5000737622208901, 0.5000740686355435, 0.50007437632307, 0.5000746852887569, 0.500074995537914, 0.5000753070758731, 0.5000756199079877, 0.5000759340396339, 0.5000762494762102, 0.5000765662231373, 0.5000768842858585, 0.5000772036698399, 0.5000775243805697, 0.5000778464235598, 0.5000781698043443, 0.5000784945284805, 0.5000788206015487, 0.5000791480291529, 0.5000794768169194, 0.5000798069704989, 0.5000801384955649, 0.5000804713978146, 0.5000808056829691, 0.500081141356773, 0.5000814784249948, 0.5000818168934272, 0.5000821567678868, 0.5000824980542142, 0.5000828407582745, 0.5000831848859572, 0.5000835304431759, 0.5000838774358692, 0.5000842258700001, 0.5000845757515565, 0.5000849270865512, 0.5000852798810218, 0.500085634141031, 0.5000859898726671, 0.500086347082043, 0.5000867057752976, 0.5000870659585949, 0.5000874276381247, 0.5000877908201027, 0.5000881555107699, 0.5000885217163937, 0.5000888894432672, 0.50008925869771, 0.5000896294860676, 0.5000900018147122, 0.5000903756900419, 0.5000907511184822, 0.5000911281064847, 0.5000915066605278, 0.5000918867871171, 0.5000922684927852, 0.5000926517840916, 0.5000930366676232, 0.5000934231499942, 0.5000938112378464, 0.500094200937849, 0.500094592256699, 0.5000949852011213, 0.5000953797778688, 0.500095775993722, 0.5000961738554903, 0.5000965733700107, 0.5000969745441487, 0.5000973773847989, 0.5000977818988839, 0.5000981880933553, 0.5000985959751937, 0.5000990055514084, 0.500099416829038, 0.5000998298151504, 0.5001002445168429, 0.500100660941242, 0.5001010790955038, 0.5001014989868147, 0.5001019206223903, 0.5001023440094764, 0.5001027691553491, 0.5001031960673145, 0.5001036247527089, 0.5001040552188996, 0.5001044874732837, 0.5001049215232901, 0.5001053573763775, 0.5001057950400364, 0.5001062345217878, 0.5001066758291843, 0.5001071189698099, 0.5001075639512799, 0.5001080107812412, 0.5001084594673728, 0.5001089100173852, 0.5001093624390213, 0.500109816740056, 0.5001102729282961, 0.5001107310115818, 0.5001111909977848, 0.5001116528948102, 0.5001121167105957, 0.500112582453112, 0.5001130501303628, 0.5001135197503853, 0.5001139913212498, 0.5001144648510604, 0.5001149403479547, 0.5001154178201039, 0.5001158972757138, 0.5001163787230236, 0.5001168621703069, 0.500117347625872, 0.5001178350980613, 0.5001183245952522, 0.5001188161258565, 0.5001193096983214, 0.5001198053211288, 0.5001203030027961, 0.5001208027518759, 0.5001213045769564, 0.5001218084866615, 0.500122314489651, 0.5001228225946206, 0.5001233328103019, 0.5001238451454632, 0.5001243596089088, 0.5001248762094799, 0.5001253949560543, 0.5001259158575466, 0.5001264389229086, 0.5001269641611292, 0.5001274915812346, 0.5001280211922885, 0.5001285530033923, 0.5001290870236853, 0.5001296232623446, 0.5001301617285854, 0.5001307024316612, 0.5001312453808644, 0.500131790585525, 0.500132338055013, 0.5001328877987362, 0.5001334398261423, 0.5001339941467176, 0.5001345507699884, 0.50013510970552, 0.500135670962918, 0.5001362345518275, 0.5001368004819339, 0.5001373687629627, 0.5001379394046795, 0.5001385124168913, 0.5001390878094452, 0.5001396655922291, 0.5001402457751725, 0.5001408283682456, 0.5001414133814605, 0.5001420008248706, 0.5001425907085711, 0.5001431830426993, 0.5001437778374344, 0.5001443751029979, 0.5001449748496539, 0.5001455770877091, 0.5001461818275129, 0.5001467890794579, 0.5001473988539795, 0.500148011161557, 0.5001486260127128, 0.5001492434180131, 0.5001498633880681, 0.500150485933532, 0.5001511110651032, 0.5001517387935246, 0.5001523691295838, 0.5001530020841132, 0.50015363766799, 0.5001542758921368, 0.5001549167675216, 0.5001555603051576, 0.5001562065161043, 0.5001568554114667, 0.5001575070023963, 0.5001581613000904, 0.5001588183157933, 0.5001594780607959, 0.5001601405464356, 0.5001608057840978, 0.5001614737852143, 0.5001621445612646, 0.5001628181237762, 0.5001634944843242, 0.5001641736545319, 0.500164855646071, 0.5001655404706614, 0.500166228140072, 0.5001669186661202, 0.5001676120606727, 0.5001683083356457, 0.5001690075030046, 0.5001697095747647, 0.500170414562991, 0.5001711224797989, 0.5001718333373537, 0.5001725471478717, 0.5001732639236199, 0.5001739836769159, 0.5001747064201287, 0.5001754321656787, 0.5001761609260379, 0.5001768927137301, 0.5001776275413309, 0.5001783654214685, 0.5001791063668235, 0.5001798503901287, 0.5001805975041704, 0.500181347721788, 0.5001821010558736, 0.5001828575193735, 0.5001836171252874, 0.5001843798866694, 0.5001851458166273, 0.5001859149283238, 0.500186687234976, 0.500187462749856, 0.5001882414862913, 0.5001890234576641, 0.500189808677413, 0.5001905971590318, 0.5001913889160706, 0.5001921839621357, 0.5001929823108903, 0.5001937839760536, 0.5001945889714026, 0.5001953973107709, 0.5001962090080501, 0.500197024077189, 0.5001978425321948, 0.5001986643871325, 0.5001994896561257, 0.5002003183533568, 0.5002011504930668, 0.5002019860895562, 0.5002028251571847, 0.5002036677103717, 0.5002045137635964, 0.5002053633313984, 0.5002062164283776, 0.5002070730691943, 0.5002079332685699, 0.5002087970412871, 0.5002096644021897, 0.5002105353661834, 0.5002114099482358, 0.5002122881633764, 0.5002131700266976, 0.5002140555533541, 0.5002149447585637, 0.5002158376576074, 0.5002167342658298, 0.500217634598639, 0.5002185386715072, 0.5002194464999712, 0.5002203580996317, 0.5002212734861549, 0.5002221926752713, 0.5002231156827776, 0.5002240425245356, 0.5002249732164729, 0.5002259077745836, 0.5002268462149282, 0.5002277885536336, 0.5002287348068941, 0.5002296849909709, 0.5002306391221931, 0.5002315972169574, 0.5002325592917286, 0.5002335253630401, 0.5002344954474938, 0.5002354695617607, 0.5002364477225807, 0.5002374299467638, 0.5002384162511894, 0.5002394066528072, 0.5002404011686372, 0.5002413998157703, 0.5002424026113682, 0.500243409572664, 0.5002444207169622, 0.5002454360616394, 0.5002464556241445, 0.5002474794219984, 0.5002485074727954, 0.5002495397942022, 0.5002505764039594, 0.5002516173198813, 0.500252662559856, 0.5002537121418459, 0.5002547660838881, 0.5002558244040946, 0.5002568871206526, 0.500257954251825, 0.5002590258159503, 0.5002601018314434, 0.5002611823167958, 0.5002622672905755, 0.500263356771428, 0.5002644507780757, 0.5002655493293192, 0.5002666524440373, 0.5002677601411869, 0.5002688724398038, 0.5002699893590028, 0.5002711109179784, 0.5002722371360043, 0.5002733680324347, 0.5002745036267041, 0.5002756439383277, 0.5002767889869016, 0.5002779387921037, 0.5002790933736934, 0.5002802527515119, 0.5002814169454832, 0.5002825859756143, 0.5002837598619947, 0.5002849386247977, 0.5002861222842804, 0.5002873108607838, 0.5002885043747338, 0.500289702846641, 0.5002909062971008, 0.5002921147467948, 0.5002933282164902, 0.5002945467270402, 0.5002957702993853, 0.5002969989545524, 0.5002982327136558, 0.5002994715978978, 0.5003007156285687, 0.500301964827047, 0.5003032192148003, 0.5003044788133851, 0.5003057436444477, 0.5003070137297243, 0.5003082890910411, 0.5003095697503154, 0.5003108557295552, 0.50031214705086, 0.5003134437364213, 0.5003147458085225, 0.5003160532895398, 0.5003173662019421, 0.500318684568292, 0.5003200084112455, 0.5003213377535528, 0.5003226726180587, 0.5003240130277028, 0.5003253590055201, 0.5003267105746411, 0.5003280677582925, 0.5003294305797976, 0.5003307990625764, 0.5003321732301463, 0.5003335531061223, 0.5003349387142175, 0.5003363300782436, 0.5003377272221115, 0.5003391301698304, 0.5003405389455106, 0.5003419535733615, 0.5003433740776936, 0.5003448004829183, 0.5003462328135483, 0.500347671094198, 0.5003491153495844, 0.500350565604527, 0.5003520218839483, 0.5003534842128747, 0.500354952616436, 0.5003564271198667, 0.5003579077485063, 0.5003593945277992, 0.5003608874832959, 0.5003623866406525, 0.5003638920256321, 0.5003654036641048, 0.5003669215820479, 0.5003684458055468, 0.5003699763607955, 0.5003715132740963, 0.5003730565718612, 0.5003746062806114, 0.5003761624269789, 0.500377725037706, 0.500379294139646, 0.5003808697597639, 0.5003824519251366, 0.5003840406629538, 0.5003856360005178, 0.5003872379652443, 0.5003888465846632, 0.5003904618864183, 0.500392083898269, 0.5003937126480889, 0.5003953481638683, 0.5003969904737136, 0.5003986396058476, 0.5004002955886107, 0.5004019584504609, 0.5004036282199743, 0.500405304925846, 0.50040698859689, 0.5004086792620401, 0.5004103769503504, 0.5004120816909956, 0.5004137935132714, 0.5004155124465957, 0.5004172385205079, 0.5004189717646708, 0.5004207122088701, 0.500422459883015, 0.5004242148171395, 0.5004259770414018, 0.5004277465860858, 0.5004295234816011, 0.5004313077584834, 0.5004330994473953, 0.5004348985791272, 0.5004367051845968, 0.5004385192948506, 0.500440340941064, 0.500442170154542, 0.5004440069667193, 0.5004458514091614, 0.5004477035135652, 0.5004495633117587, 0.5004514308357026, 0.5004533061174902, 0.5004551891893481, 0.5004570800836365, 0.5004589788328505, 0.5004608854696201, 0.5004628000267105, 0.5004647225370233, 0.5004666530335967, 0.5004685915496062, 0.5004705381183651, 0.5004724927733248, 0.5004744555480762, 0.5004764264763493, 0.5004784055920143, 0.5004803929290822, 0.5004823885217051, 0.5004843924041774, 0.5004864046109355, 0.500488425176559, 0.500490454135771, 0.5004924915234393, 0.500494537374576, 0.500496591724339, 0.5004986546080321, 0.5005007260611057, 0.5005028061191577, 0.5005048948179334, 0.5005069921933272, 0.5005090982813822, 0.5005112131182913, 0.5005133367403978, 0.5005154691841959, 0.5005176104863315, 0.5005197606836026, 0.5005219198129602, 0.5005240879115087, 0.5005262650165065, 0.5005284511653671, 0.5005306463956594, 0.5005328507451077, 0.5005350642515939, 0.5005372869531568, 0.5005395188879933, 0.5005417600944588, 0.5005440106110682, 0.5005462704764966, 0.5005485397295794, 0.5005508184093133, 0.5005531065548573, 0.5005554042055329, 0.5005577114008248, 0.5005600281803821, 0.5005623545840183, 0.5005646906517123, 0.5005670364236091, 0.5005693919400205, 0.5005717572414258, 0.5005741323684724, 0.5005765173619764, 0.5005789122629238, 0.5005813171124706, 0.5005837319519436, 0.5005861568228418, 0.500588591766836, 0.5005910368257706, 0.5005934920416634, 0.5005959574567069, 0.500598433113269, 0.5006009190538937, 0.500603415321301, 0.5006059219583894, 0.5006084390082347, 0.5006109665140922, 0.5006135045193967, 0.5006160530677632, 0.5006186122029884, 0.5006211819690505, 0.5006237624101105, 0.5006263535705129, 0.5006289554947861, 0.5006315682276442, 0.5006341918139862, 0.500636826298898, 0.5006394717276529, 0.5006421281457122, 0.5006447955987258, 0.5006474741325333, 0.5006501637931651, 0.5006528646268423, 0.5006555766799784, 0.5006582999991793, 0.5006610346312451, 0.5006637806231695, 0.5006665380221422, 0.5006693068755482, 0.50067208723097, 0.5006748791361875, 0.5006776826391787, 0.5006804977881214, 0.5006833246313933, 0.5006861632175733, 0.5006890135954417, 0.5006918758139818, 0.5006947499223801, 0.5006976359700275, 0.5007005340065203, 0.5007034440816603, 0.5007063662454567, 0.5007093005481262, 0.5007122470400942, 0.5007152057719954, 0.5007181767946749, 0.500721160159189, 0.5007241559168062, 0.5007271641190079, 0.5007301848174891, 0.50073321806416, 0.5007362639111463, 0.5007393224107898, 0.5007423936156502, 0.5007454775785054, 0.5007485743523525, 0.5007516839904087, 0.5007548065461124, 0.5007579420731239, 0.5007610906253263, 0.5007642522568265, 0.5007674270219566, 0.500770614975274, 0.5007738161715626, 0.5007770306658341, 0.5007802585133289, 0.5007834997695164, 0.5007867544900968, 0.5007900227310014, 0.5007933045483939, 0.5007965999986715, 0.5007999091384657, 0.5008032320246427, 0.5008065687143055, 0.5008099192647941, 0.5008132837336865, 0.5008166621788002, 0.5008200546581926, 0.5008234612301624, 0.5008268819532505, 0.5008303168862409, 0.5008337660881617, 0.5008372296182863, 0.5008407075361344, 0.5008441999014728, 0.5008477067743166, 0.5008512282149301, 0.500854764283828, 0.5008583150417767, 0.5008618805497945, 0.5008654608691533, 0.5008690560613798, 0.5008726661882559, 0.5008762913118203, 0.5008799314943694, 0.5008835867984585, 0.5008872572869025, 0.5008909430227774, 0.5008946440694211, 0.5008983604904346, 0.5009020923496832, 0.5009058397112973, 0.500909602639674, 0.5009133811994776, 0.5009171754556411, 0.500920985473367, 0.5009248113181294, 0.5009286530556735, 0.5009325107520178, 0.5009363844734553, 0.5009402742865544, 0.5009441802581596, 0.5009481024553935, 0.5009520409456569, 0.5009559957966315, 0.5009599670762794, 0.5009639548528453, 0.5009679591948571, 0.5009719801711278, 0.5009760178507559, 0.5009800723031269, 0.5009841435979148, 0.5009882318050827, 0.5009923369948844, 0.5009964592378658, 0.5010005986048655, 0.5010047551670164, 0.501008928995747, 0.5010131201627822, 0.5010173287401454, 0.5010215548001585, 0.5010257984154443, 0.5010300596589271, 0.501034338603834, 0.5010386353236963, 0.5010429498923511, 0.5010472823839417, 0.5010516328729194, 0.5010560014340453, 0.5010603881423903, 0.5010647930733377, 0.5010692163025837, 0.501073657906139, 0.5010781179603297, 0.5010825965417995, 0.50108709372751, 0.5010916095947429, 0.5010961442211002, 0.5011006976845069, 0.5011052700632115, 0.5011098614357875, 0.5011144718811348, 0.5011191014784808, 0.5011237503073824, 0.5011284184477266, 0.5011331059797324, 0.5011378129839519, 0.5011425395412719, 0.5011472857329152, 0.5011520516404419, 0.5011568373457507, 0.5011616429310808, 0.5011664684790129, 0.5011713140724707, 0.5011761797947222, 0.5011810657293815, 0.5011859719604098, 0.5011908985721171, 0.5011958456491638, 0.5012008132765616, 0.5012058015396755, 0.5012108105242252, 0.5012158403162864, 0.501220891002292, 0.5012259626690342, 0.5012310554036656, 0.5012361692937012, 0.5012413044270189, 0.5012464608918618, 0.5012516387768399, 0.5012568381709306, 0.5012620591634814, 0.501267301844211, 0.5012725663032102, 0.5012778526309443, 0.5012831609182545, 0.5012884912563592, 0.5012938437368556, 0.5012992184517214, 0.5013046154933164, 0.501310034954384, 0.5013154769280528, 0.5013209415078382, 0.5013264287876441, 0.5013319388617644, 0.5013374718248844, 0.5013430277720832, 0.5013486067988344, 0.5013542090010084, 0.5013598344748734, 0.5013654833170981, 0.501371155624752, 0.5013768514953084, 0.5013825710266451, 0.5013883143170466, 0.5013940814652055, 0.5013998725702243, 0.5014056877316173, 0.5014115270493121, 0.5014173906236512, 0.5014232785553939, 0.5014291909457181, 0.501435127896222, 0.5014410895089255, 0.5014470758862726, 0.5014530871311323, 0.5014591233468016, 0.501465184637006, 0.5014712711059017, 0.501477382858078, 0.5014835199985581, 0.5014896826328018, 0.5014958708667069, 0.5015020848066107, 0.5015083245592925, 0.501514590231975, 0.5015208819323261, 0.501527199768461, 0.5015335438489441, 0.5015399142827904, 0.5015463111794679, 0.5015527346488992, 0.5015591848014634, 0.5015656617479982, 0.5015721655998014, 0.5015786964686333, 0.5015852544667183, 0.5015918397067468, 0.5015984523018773, 0.5016050923657385, 0.5016117600124306, 0.501618455356528, 0.5016251785130812, 0.5016319295976178, 0.5016387087261459, 0.5016455160151553, 0.5016523515816192, 0.5016592155429971, 0.5016661080172361, 0.5016730291227732, 0.5016799789785373, 0.5016869577039514, 0.5016939654189344, 0.5017010022439029, 0.5017080682997741, 0.5017151637079672, 0.5017222885904058, 0.5017294430695196, 0.5017366272682472, 0.5017438413100371, 0.5017510853188514, 0.5017583594191662, 0.5017656637359753, 0.5017729983947911, 0.5017803635216472, 0.5017877592431013, 0.5017951856862359, 0.501802642978662, 0.5018101312485199, 0.5018176506244828, 0.5018252012357577, 0.5018327832120886, 0.5018403966837579, 0.5018480417815897, 0.5018557186369509, 0.501863427381754, 0.5018711681484599, 0.5018789410700788, 0.5018867462801738, 0.5018945839128627, 0.5019024541028201, 0.5019103569852801, 0.5019182926960382, 0.501926261371454, 0.5019342631484535, 0.5019422981645308, 0.501950366557752, 0.5019584684667557, 0.5019666040307568, 0.5019747733895478, 0.5019829766835022, 0.5019912140535765, 0.5019994856413121, 0.5020077915888388, 0.5020161320388763, 0.502024507134737, 0.5020329170203286, 0.5020413618401562, 0.5020498417393254, 0.5020583568635439, 0.5020669073591251, 0.5020754933729893, 0.5020841150526675, 0.5020927725463031, 0.5021014660026548, 0.502110195571099, 0.5021189614016327, 0.5021277636448753, 0.5021366024520719, 0.502145477975096, 0.5021543903664512, 0.502163339779275, 0.5021723263673403, 0.5021813502850591, 0.5021904116874841, 0.5021995107303122, 0.5022086475698868, 0.5022178223632005, 0.5022270352678978, 0.502236286442278, 0.5022455760452976, 0.5022549042365732, 0.5022642711763842, 0.5022736770256756, 0.5022831219460607, 0.5022926060998242, 0.5023021296499242, 0.5023116927599958, 0.5023212955943533, 0.5023309383179939, 0.5023406210965995, 0.5023503440965398, 0.5023601074848758, 0.5023699114293619, 0.5023797560984494, 0.5023896416612887, 0.5023995682877329, 0.50240953614834, 0.5024195454143768, 0.5024295962578207, 0.5024396888513634, 0.5024498233684138, 0.5024599999831008, 0.5024702188702762, 0.5024804802055179, 0.5024907841651329, 0.5025011309261602, 0.5025115206663741, 0.5025219535642866, 0.5025324297991515, 0.5025429495509662, 0.5025535130004765, 0.5025641203291774, 0.5025747717193186, 0.502585467353906, 0.5025962074167053, 0.5026069920922455, 0.5026178215658215, 0.5026286960234977, 0.5026396156521111, 0.5026505806392743, 0.5026615911733789, 0.5026726474435989, 0.5026837496398935, 0.5026948979530106, 0.5027060925744903, 0.5027173336966677, 0.5027286215126765, 0.5027399562164526, 0.5027513380027365, 0.5027627670670778, 0.5027742436058377, 0.5027857678161924, 0.5027973398961375, 0.5028089600444899, 0.5028206284608921, 0.5028323453458158, 0.5028441109005646, 0.5028559253272781, 0.5028677888289348, 0.5028797016093564, 0.5028916638732102, 0.5029036758260137, 0.5029157376741373, 0.5029278496248085, 0.5029400118861147, 0.5029522246670074, 0.5029644881773054, 0.502976802627699, 0.5029891682297526, 0.5030015851959092, 0.5030140537394938, 0.5030265740747167, 0.5030391464166779, 0.5030517709813699, 0.5030644479856822, 0.5030771776474043, 0.5030899601852303, 0.5031027958187617, 0.503115684768512, 0.5031286272559096, 0.5031416235033026, 0.5031546737339619, 0.5031677781720851, 0.5031809370428006, 0.5031941505721714, 0.5032074189871988, 0.5032207425158262, 0.5032341213869436, 0.5032475558303907, 0.5032610460769616, 0.5032745923584083, 0.5032881949074448, 0.5033018539577507, 0.5033155697439762, 0.503329342501745, 0.503343172467659, 0.5033570598793023, 0.503371004975245, 0.5033850079950473, 0.5033990691792639, 0.5034131887694482, 0.5034273670081557, 0.503441604138949, 0.5034559004064015, 0.5034702560561019, 0.5034846713346577, 0.5034991464897005, 0.5035136817698895, 0.5035282774249158, 0.5035429337055071, 0.5035576508634313, 0.5035724291515016, 0.5035872688235803, 0.5036021701345832, 0.5036171333404842, 0.5036321586983196, 0.5036472464661921, 0.503662396903276, 0.5036776102698209, 0.5036928868271566, 0.5037082268376973, 0.5037236305649465, 0.5037390982735007, 0.5037546302290551, 0.5037702266984069, 0.503785887949461, 0.5038016142512337, 0.5038174058738577, 0.503833263088587, 0.5038491861678007, 0.5038651753850087, 0.5038812310148556, 0.5038973533331257, 0.5039135426167476, 0.5039297991437993, 0.5039461231935124, 0.5039625150462772, 0.5039789749836476, 0.5039955032883456, 0.5040121002442667, 0.5040287661364837, 0.5040455012512529, 0.5040623058760179, 0.5040791802994151, 0.5040961248112786, 0.5041131397026449, 0.5041302252657581, 0.5041473817940747, 0.504164609582269, 0.5041819089262377, 0.504199280123105, 0.5042167234712283, 0.5042342392702022, 0.5042518278208646, 0.5042694894253017, 0.5042872243868526, 0.5043050330101148, 0.5043229156009497, 0.5043408724664875, 0.5043589039151324, 0.5043770102565682, 0.5043951918017632, 0.5044134488629757, 0.5044317817537596, 0.5044501907889691, 0.5044686762847649, 0.5044872385586189, 0.5045058779293199, 0.5045245947169792, 0.5045433892430359, 0.5045622618302623, 0.5045812128027695, 0.5046002424860132, 0.5046193512067989, 0.5046385392932874, 0.5046578070750009, 0.5046771548828283, 0.5046965830490306, 0.5047160919072473, 0.5047356817925014, 0.5047553530412052, 0.5047751059911667, 0.5047949409815946, 0.5048148583531042, 0.5048348584477239, 0.5048549416089001, 0.5048751081815036, 0.5048953585118355, 0.504915692947633, 0.5049361118380752, 0.5049566155337891, 0.5049772043868561, 0.5049978787508171, 0.5050186389806794, 0.5050394854329221, 0.5050604184655024, 0.5050814384378621, 0.5051025457109332, 0.505123740647144, 0.5051450236104261, 0.5051663949662196, 0.5051878550814798, 0.5052094043246835, 0.5052310430658353, 0.5052527716764736, 0.5052745905296775, 0.5052965000000724, 0.5053185004638372, 0.50534059229871, 0.5053627758839949, 0.5053850516005687, 0.5054074198308867, 0.5054298809589899, 0.5054524353705112, 0.5054750834526821, 0.5054978255943391, 0.5055206621859305, 0.5055435936195231, 0.5055666202888088, 0.5055897425891113, 0.5056129609173927, 0.5056362756722604, 0.5056596872539743, 0.5056831960644524, 0.5057068025072794, 0.5057305069877117, 0.505754309912686, 0.5057782116908248, 0.5058022127324444, 0.5058263134495613, 0.5058505142558996, 0.5058748155668974, 0.5058992177997149, 0.5059237213732403, 0.505948326708098, 0.505973034226655, 0.5059978443530284, 0.5060227575130928, 0.506047774134487, 0.5060728946466219, 0.5060981194806872, 0.5061234490696592, 0.5061488838483081, 0.506174424253205, 0.50620007072273, 0.5062258236970787, 0.5062516836182708, 0.5062776509301565, 0.5063037260784253, 0.5063299095106122, 0.5063562016761061, 0.5063826030261577, 0.5064091140138862, 0.506435735094288, 0.5064624667242438, 0.5064893093625265, 0.5065162634698092, 0.5065433295086725, 0.5065705079436134, 0.5065977992410517, 0.5066252038693392, 0.506652722298767, 0.5066803550015736, 0.5067081024519531, 0.506735965126063, 0.5067639435020322, 0.5067920380599698, 0.5068202492819719, 0.5068485776521314, 0.5068770236565451, 0.5069055877833221, 0.5069342705225922, 0.5069630723665147, 0.5069919938092857, 0.5070210353471475, 0.5070501974783962, 0.5070794807033905, 0.5071088855245605, 0.5071384124464157, 0.5071680619755536, 0.5071978346206687, 0.5072277308925605, 0.5072577513041424, 0.507287896370451, 0.5073181666086538, 0.5073485625380585, 0.5073790846801217, 0.5074097335584579, 0.5074405096988477, 0.5074714136292477, 0.507502445879799, 0.5075336069828353, 0.5075648974728935, 0.5075963178867214, 0.5076278687632875, 0.5076595506437898, 0.5076913640716652, 0.5077233095925981, 0.5077553877545304, 0.5077875991076706, 0.507819944204502, 0.5078524235997941, 0.5078850378506098, 0.5079177875163162, 0.5079506731585935, 0.5079836953414449, 0.5080168546312053, 0.5080501515965518, 0.5080835868085125, 0.508117160840477, 0.5081508742682049, 0.5081847276698369, 0.5082187216259032, 0.5082528567193343, 0.5082871335354701, 0.5083215526620704, 0.5083561146893241, 0.50839082020986, 0.508425669818756, 0.5084606641135496, 0.5084958036942474, 0.5085310891633362, 0.5085665211257919, 0.5086021001890908, 0.508637826963219, 0.5086737020606833, 0.5087097260965207, 0.5087458996883096, 0.50878222345618, 0.508818698022823, 0.5088553240135029, 0.5088921020560659, 0.5089290327809524, 0.508966116821206, 0.5090033548124854, 0.5090407473930741, 0.509078295203892, 0.5091159988885054, 0.5091538590931383, 0.5091918764666825, 0.5092300516607098, 0.5092683853294817, 0.509306878129961, 0.5093455307218225, 0.5093843437674641, 0.5094233179320182, 0.5094624538833626, 0.5095017522921317, 0.5095412138317275, 0.5095808391783313, 0.509620629010915, 0.5096605840112519, 0.5097007048639289, 0.5097409922563572, 0.5097814468787844, 0.5098220694243053, 0.5098628605888748, 0.5099038210713179, 0.5099449515733425, 0.5099862527995508, 0.5100277254574507, 0.5100693702574686, 0.51011118791296, 0.5101531791402222, 0.5101953446585062, 0.5102376851900285, 0.5102802014599831, 0.5103228941965536, 0.5103657641309258, 0.5104088119972991, 0.5104520385328992, 0.5104954444779904, 0.5105390305758879, 0.5105827975729698, 0.51062674621869, 0.5106708772655906, 0.510715191469314, 0.5107596895886158, 0.5108043723853777, 0.5108492406246193, 0.5108942950745118, 0.5109395365063899, 0.510984965694765, 0.5110305834173383, 0.5110763904550132, 0.5111223875919086, 0.5111685756153719, 0.5112149553159914, 0.5112615274876104, 0.51130829292734, 0.5113552524355719, 0.5114024068159917, 0.5114497568755929, 0.5114973034246895, 0.5115450472769297, 0.5115929892493097, 0.5116411301621862, 0.5116894708392908, 0.5117380121077438, 0.511786754798067, 0.511835699744198, 0.5118848477835035, 0.5119341997567941, 0.5119837565083368, 0.5120335188858701, 0.5120834877406172, 0.5121336639273001, 0.5121840483041543, 0.5122346417329423, 0.5122854450789678, 0.5123364592110903, 0.5123876850017389, 0.5124391233269274, 0.5124907750662676, 0.5125426411029848, 0.5125947223239317, 0.5126470196196028, 0.5126995338841498, 0.5127522660153954, 0.5128052169148485, 0.5128583874877188, 0.5129117786429318, 0.5129653912931432, 0.5130192263547545, 0.5130732847479273, 0.5131275673965993, 0.5131820752284981, 0.5132368091751576, 0.5132917701719322, 0.5133469591580128, 0.5134023770764418, 0.5134580248741286, 0.5135139035018647, 0.5135700139143395, 0.513626357070156, 0.5136829339318459, 0.5137397454658859, 0.5137967926427126, 0.513854076436739, 0.51391159782637, 0.5139693577940182, 0.5140273573261203, 0.5140855974131525, 0.514144079049647, 0.5142028032342076, 0.5142617709695269, 0.5143209832624012, 0.5143804411237477, 0.5144401455686207, 0.5145000976162278, 0.5145602982899464, 0.5146207486173404, 0.5146814496301765, 0.5147424023644411, 0.5148036078603571, 0.5148650671624001, 0.5149267813193158, 0.5149887513841368, 0.5150509784141989, 0.515113463471159, 0.5151762076210119, 0.5152392119341066, 0.5153024774851649, 0.5153660053532971, 0.5154297966220208, 0.515493852379277, 0.5155581737174482, 0.5156227617333757, 0.5156876175283771, 0.5157527422082641, 0.5158181368833596, 0.5158838026685165, 0.515949740683134, 0.5160159520511767, 0.5160824379011918, 0.5161491993663275, 0.5162162375843509, 0.5162835536976653, 0.51635114885333, 0.5164190242030768, 0.5164871809033296, 0.5165556201152215, 0.5166243430046144, 0.5166933507421164, 0.5167626445031014, 0.5168322254677266, 0.5169020948209516, 0.5169722537525575, 0.5170427034571651, 0.5171134451342536, 0.5171844799881803, 0.5172558092281987, 0.517327434068478, 0.5173993557281221, 0.5174715754311884, 0.5175440944067076, 0.5176169138887023, 0.517690035116207, 0.5177634593332869, 0.5178371877890577, 0.5179112217377051, 0.5179855624385039, 0.5180602111558384, 0.5181351691592219, 0.5182104377233157, 0.5182860181279497, 0.5183619116581426, 0.5184381196041208, 0.5185146432613392, 0.518591483930501, 0.5186686429175781, 0.5187461215338306, 0.5188239210958283, 0.5189020429254696, 0.5189804883500031, 0.5190592587020475, 0.5191383553196117, 0.5192177795461165, 0.5192975327304142, 0.5193776162268099, 0.519458031395082, 0.5195387796005032, 0.5196198622138612, 0.5197012806114801, 0.5197830361752408, 0.5198651302926023, 0.5199475643566233, 0.5200303397659827, 0.5201134579250017, 0.5201969202436643, 0.5202807281376391, 0.520364883028301, 0.520449386342752, 0.5205342395138436, 0.5206194439801981, 0.5207050011862302, 0.5207909125821689, 0.5208771796240793, 0.5209638037738845, 0.5210507864993879, 0.5211381292742941, 0.5212258335782328, 0.5213139008967793, 0.5214023327214773, 0.5214911305498616, 0.5215802958854796, 0.5216698302379144, 0.5217597351228068, 0.5218500120618782, 0.5219406625829528, 0.5220316882199802, 0.5221230905130586, 0.5222148710084572, 0.5223070312586389, 0.522399572822283, 0.5224924972643094, 0.5225858061558993, 0.522679501074521, 0.5227735836039504, 0.5228680553342961, 0.5229629178620215, 0.5230581727899688, 0.5231538217273817, 0.5232498662899292, 0.5233463080997289, 0.523443148785371, 0.523540389981941, 0.5236380333310439, 0.5237360804808278, 0.5238345330860077, 0.5239333928078891, 0.5240326613143921, 0.5241323402800749, 0.5242324313861583, 0.5243329363205494, 0.5244338567778658, 0.5245351944594595, 0.5246369510734413, 0.5247391283347052, 0.524841727964952, 0.5249447516927144, 0.5250482012533811, 0.5251520783892214, 0.5252563848494092, 0.5253611223900478, 0.5254662927741953, 0.5255718977718878, 0.5256779391601651, 0.5257844187230953, 0.5258913382517992, 0.5259986995444758, 0.5261065044064261, 0.52621475465008, 0.5263234520950187, 0.5264325985680022, 0.5265421959029922, 0.5266522459411794, 0.5267627505310066, 0.5268737115281956, 0.5269851307957714, 0.5270970102040876, 0.5272093516308527, 0.5273221569611543, 0.5274354280874848, 0.5275491669097676, 0.5276633753353818, 0.5277780552791881, 0.5278932086635544, 0.5280088374183813, 0.5281249434811282, 0.5282415287968377, 0.5283585953181633, 0.5284761450053939, 0.5285941798264794, 0.5287127017570575, 0.528831712780479, 0.5289512148878339, 0.529071210077977, 0.5291917003575541, 0.5293126877410287, 0.5294341742507066, 0.529556161916763, 0.5296786527772684, 0.5298016488782149, 0.5299251522735415, 0.5300491650251614, 0.5301736892029875, 0.5302987268849587, 0.5304242801570663, 0.5305503511133802, 0.5306769418560752, 0.5308040544954571, 0.5309316911499896, 0.5310598539463198, 0.5311885450193052, 0.53131776651204, 0.5314475205758808, 0.5315778093704745, 0.5317086350637827, 0.53183999983211, 0.5319719058601292, 0.5321043553409083, 0.5322373504759366, 0.5323708934751517, 0.532504986556965, 0.5326396319482898, 0.5327748318845656, 0.5329105886097865, 0.5330469043765266, 0.5331837814459667, 0.5333212220879207, 0.5334592285808625, 0.5335978032119515, 0.5337369482770605, 0.5338766660808005, 0.5340169589365485, 0.5341578291664729, 0.5342992791015604, 0.5344413110816424, 0.5345839274554214, 0.534727130580497, 0.5348709228233928, 0.5350153065595818, 0.535160284173514, 0.5353058580586415, 0.5354520306174452, 0.5355988042614609, 0.535746181411306, 0.5358941644967049, 0.5360427559565155, 0.5361919582387553, 0.5363417738006272, 0.5364922051085458, 0.5366432546381634, 0.5367949248743955, 0.5369472183114472, 0.5371001374528386, 0.5372536848114308, 0.5374078629094519, 0.5375626742785219, 0.5377181214596792, 0.5378742070034057, 0.5380309334696523, 0.5381883034278646, 0.5383463194570077, 0.5385049841455927, 0.5386643000917005, 0.538824269903008, 0.538984896196813, 0.5391461816000586, 0.5393081287493592, 0.5394707402910245, 0.5396340188810849, 0.5397979671853155, 0.5399625878792615, 0.5401278836482624, 0.5402938571874759, 0.5404605112019033, 0.5406278484064126, 0.5407958715257637, 0.5409645832946316, 0.5411339864576304, 0.5413040837693378, 0.541474877994318, 0.5416463719071459, 0.5418185682924298, 0.5419914699448354, 0.542165079669109, 0.5423394002801, 0.5425144346027845, 0.5426901854722875, 0.5428666557339066, 0.5430438482431328, 0.5432217658656747, 0.5434004114774798, 0.5435797879647561, 0.543759898223996, 0.543940745161995, 0.5441223316958764, 0.5443046607531109, 0.5444877352715379, 0.5446715581993877, 0.5448561324953013, 0.5450414611283515, 0.545227547078064, 0.5454143933344364, 0.5456020028979601, 0.5457903787796388, 0.5459795240010089, 0.5461694415941594, 0.5463601346017499, 0.5465516060770316, 0.5467438590838648, 0.546936896696738, 0.5471307220007865, 0.5473253380918104, 0.5475207480762927, 0.5477169550714173, 0.5479139622050856, 0.5481117726159349, 0.5483103894533545, 0.5485098158775032, 0.548710055059325, 0.5489111101805654, 0.5491129844337879, 0.549315681022389, 0.549519203160614, 0.5497235540735714, 0.5499287369972486, 0.5501347551785255, 0.5503416118751889, 0.5505493103559466, 0.5507578539004405, 0.5509672457992602, 0.5511774893539549, 0.5513885878770479, 0.5516005446920462, 0.5518133631334542, 0.5520270465467845, 0.552241598288569, 0.5524570217263699, 0.5526733202387896, 0.5528904972154808, 0.5531085560571565, 0.553327500175599, 0.5535473329936684, 0.5537680579453113, 0.5539896784755687, 0.5542121980405833, 0.5544356201076075, 0.554659948155009, 0.5548851856722775, 0.5551113361600308, 0.5553384031300198, 0.5555663901051336, 0.5557953006194039, 0.5560251382180084, 0.556255906457275, 0.5564876089046846, 0.5567202491388734, 0.5569538307496349, 0.557188357337921, 0.5574238325158437, 0.5576602599066748, 0.5578976431448459, 0.5581359858759478, 0.5583752917567293, 0.5586155644550949, 0.5588568076501029, 0.5590990250319623, 0.559342220302029, 0.5595863971728016, 0.559831559367917, 0.5600777106221442, 0.5603248546813792, 0.5605729953026375, 0.5608221362540471, 0.5610722813148407, 0.5613234342753463, 0.5615755989369786, 0.5618287791122288, 0.5620829786246535, 0.5623382013088636, 0.562594451010512, 0.5628517315862804, 0.5631100469038666, 0.5633694008419687, 0.5636297972902715, 0.5638912401494294, 0.5641537333310498, 0.5644172807576765, 0.5646818863627704, 0.5649475540906909, 0.5652142878966757, 0.5654820917468201, 0.5657509696180555, 0.5660209254981267, 0.5662919633855683, 0.5665640872896813, 0.5668373012305066, 0.5671116092387999, 0.5673870153560047, 0.5676635236342236, 0.5679411381361902, 0.5682198629352386, 0.568499702115273, 0.5687806597707358, 0.5690627400065742, 0.5693459469382073, 0.5696302846914907, 0.5699157574026801, 0.5702023692183954, 0.5704901242955813, 0.5707790268014696, 0.5710690809135379, 0.5713602908194685, 0.5716526607171059, 0.5719461948144131, 0.5722408973294274, 0.5725367724902134, 0.5728338245348165, 0.573132057711214, 0.5734314762772664, 0.5737320845006658, 0.5740338866588838, 0.5743368870391183, 0.5746410899382393, 0.5749464996627319, 0.57525312052864, 0.5755609568615074, 0.5758700129963175, 0.5761802932774321, 0.5764918020585292, 0.5768045437025382, 0.5771185225815748, 0.5774337430768731, 0.5777502095787189, 0.5780679264863781, 0.5783868982080257, 0.5787071291606735, 0.579028623770095, 0.5793513864707496, 0.579675421705705, 0.5800007339265578, 0.5803273275933533, 0.5806552071745021, 0.5809843771466972, 0.5813148419948273, 0.58164660621189, 0.5819796742989024, 0.5823140507648101, 0.5826497401263951, 0.5829867469081809, 0.5833250756423366, 0.583664730868579, 0.5840057171340723, 0.5843480389933273, 0.5846917010080972, 0.5850367077472719, 0.5853830637867716, 0.5857307737094368, 0.5860798421049171, 0.5864302735695583, 0.5867820727062865, 0.5871352441244914, 0.5874897924399067, 0.5878457222744888, 0.5882030382562929, 0.5885617450193478, 0.5889218472035275, 0.5892833494544222, 0.5896462564232046, 0.590010572766497, 0.5903763031462338, 0.5907434522295224, 0.5911120246885029, 0.5914820252002029, 0.5918534584463936, 0.5922263291134394, 0.5926006418921494, 0.5929764014776221, 0.5933536125690912, 0.5937322798697672, 0.5941124080866765, 0.5944940019304988, 0.594877066115401, 0.5952616053588689, 0.5956476243815366, 0.5960351279070132, 0.5964241206617054, 0.5968146073746401, 0.5972065927772818, 0.5976000816033483, 0.5979950785886241, 0.5983915884707697, 0.5987896159891286, 0.5991891658845327, 0.5995902428991026, 0.5999928517760463, 0.6003969972594548, 0.6008026840940949, 0.6012099170251977, 0.6016187007982459, 0.602029040158757, 0.6024409398520632, 0.6028544046230883, 0.6032694392161223, 0.6036860483745913, 0.6041042368408257, 0.6045240093558235, 0.6049453706590118, 0.6053683254880041, 0.6057928785783547, 0.606219034663309, 0.6066467984735512, 0.6070761747369482, 0.6075071681782898, 0.6079397835190252, 0.6083740254769977, 0.6088098987661721, 0.609247408096363, 0.609686558172956, 0.6101273536966266, 0.6105697993630552, 0.6110138998626385, 0.6114596598801968, 0.6119070840946778, 0.6123561771788554, 0.6128069437990274, 0.6132593886147053, 0.6137135162783038, 0.6141693314348244, 0.6146268387215342, 0.6150860427676437, 0.6155469481939767, 0.6160095596126391, 0.6164738816266819, 0.6169399188297602, 0.6174076758057885, 0.6178771571285916, 0.6183483673615504, 0.6188213110572446, 0.6192959927570894, 0.6197724169909697, 0.620250588276869, 0.6207305111204925, 0.6212121900148884, 0.6216956294400613, 0.6221808338625852, 0.6226678077352071, 0.6231565554964503, 0.6236470815702094, 0.6241393903653436, 0.6246334862752629, 0.6251293736775111, 0.6256270569333425, 0.6261265403872955, 0.6266278283667598, 0.6271309251815389, 0.6276358351234088, 0.6281425624656695, 0.628651111462694, 0.629161486349471, 0.6296736913411407, 0.6301877306325296, 0.6307036083976763, 0.6312213287893537, 0.6317408959385862, 0.6322623139541608, 0.6327855869221338, 0.633310718905331, 0.6338377139428437, 0.634366576049519, 0.6348973092154431, 0.6354299174054225, 0.6359644045584559, 0.6365007745872034, 0.6370390313774487, 0.6375791787875558, 0.638121220647921, 0.6386651607604181, 0.6392110028978387, 0.6397587508033263, 0.6403084081898052, 0.6408599787394029, 0.6414134661028676, 0.6419688738989788, 0.6425262057139535, 0.6430854651008446, 0.6436466555789356, 0.6442097806331277, 0.644774843713321, 0.6453418482337919, 0.6459107975725609, 0.6464816950707573, 0.6470545440319775, 0.6476293477216353, 0.6482061093663091, 0.648784832153079, 0.6493655192288631, 0.6499481736997427, 0.6505327986302835, 0.6511193970428515, 0.6517079719169208, 0.6522985261883766, 0.6528910627488115, 0.653485584444815, 0.654082094077258, 0.6546805944005707, 0.655281088122012, 0.6558835779009375, 0.6564880663480552, 0.6570945560246806, 0.6577030494419813, 0.658313549060217, 0.6589260572879739, 0.6595405764813912, 0.6601571089433822, 0.6607756569228496, 0.6613962226138925, 0.6620188081550101, 0.662643415628296, 0.6632700470586284, 0.6638987044128531, 0.6645293895989601, 0.6651621044652547, 0.665796850799521, 0.6664336303281804, 0.667072444715444, 0.6677132955624567, 0.6683561844064381, 0.6690011127198142, 0.6696480819093458, 0.6702970933152482, 0.6709481482103063, 0.6716012477989832, 0.672256393216523, 0.672913585528046, 0.673572825727641, 0.6742341147374475, 0.6748974534067363, 0.675562842510981, 0.6762302827509235, 0.6768997747516372, 0.6775713190615799, 0.6782449161516441, 0.6789205664142002, 0.6795982701621341, 0.6802780276278799, 0.6809598389624456, 0.6816437042344352, 0.6823296234290643, 0.6830175964471692, 0.6837076231042135, 0.684399703129286, 0.6850938361640968, 0.6857900217619658, 0.6864882593868064, 0.6871885484121057, 0.6878908881198991, 0.6885952776997379, 0.6893017162476571, 0.6900102027651319, 0.6907207361580368, 0.6914333152355941, 0.6921479387093213, 0.6928646051919743, 0.6935833131964843, 0.6943040611348922, 0.6950268473172799, 0.6957516699506943, 0.6964785271380719, 0.697207416877156, 0.6979383370594131, 0.6986712854689443, 0.6994062597813933, 0.7001432575628531, 0.700882276268767, 0.7016233132428296, 0.7023663657158821, 0.7031114308048071, 0.703858505511421, 0.7046075867213617, 0.7053586712029777, 0.7061117556062121, 0.7068668364614861, 0.7076239101785812, 0.7083829730455193, 0.7091440212274408, 0.7099070507654838, 0.7106720575756589, 0.7114390374477269, 0.7122079860440733, 0.7129788988985827, 0.7137517714155148, 0.7145265988683775, 0.7153033763988035, 0.7160820990154235, 0.7168627615927435, 0.7176453588700213, 0.7184298854501432, 0.7192163357985041, 0.7200047042418874, 0.7207949849673468, 0.7215871720210912, 0.7223812593073701, 0.7231772405873631, 0.7239751094780713, 0.7247748594512113, 0.7255764838321128, 0.7263799757986208, 0.7271853283799983, 0.7279925344558378, 0.7288015867549722, 0.729612477854394, 0.7304252001781774, 0.7312397459964058, 0.7320561074241055, 0.7328742764201843, 0.7336942447863772, 0.734516004166197, 0.7353395460438927, 0.7361648617434141, 0.7369919424273854, 0.7378207790960841, 0.7386513625864294, 0.7394836835709788, 0.7403177325569321, 0.7411534998851468, 0.7419909757291603, 0.7428301500942237, 0.7436710128163444, 0.7445135535613393, 0.7453577618239001, 0.7462036269266682, 0.7470511380193215, 0.7479002840776746, 0.7487510539027873, 0.7496034361200915, 0.7504574191785269, 0.7513129913496914, 0.7521701407270063, 0.7530288552248928, 0.7538891225779684, 0.7547509303402535, 0.7556142658843961, 0.7564791164009107, 0.7573454688974365, 0.7582133101980079, 0.7590826269423477, 0.7599534055851735, 0.7608256323955239, 0.7616992934561038, 0.7625743746626464, 0.7634508617232991, 0.7643287401580241, 0.7652079952980223, 0.7660886122851789, 0.7669705760715254, 0.7678538714187305, 0.7687384828976072, 0.7696243948876452, 0.7705115915765663, 0.7714000569599017, 0.7722897748405964, 0.773180728828636, 0.7740729023406985, 0.7749662785998324, 0.7758608406351591, 0.7767565712816062, 0.7776534531796615, 0.7785514687751591, 0.7794506003190921, 0.780350829867451, 0.7812521392810974, 0.78215451022566, 0.7830579241714646, 0.7839623623934939, 0.7848678059713753, 0.7857742357894059, 0.7866816325366023, 0.7875899767067888, 0.7884992485987136, 0.7894094283161999, 0.7903204957683337, 0.7912324306696812, 0.7921452125405428, 0.7930588207072431, 0.7939732343024539, 0.7948884322655582, 0.7958043933430444, 0.7967210960889429, 0.7976385188652975, 0.7985566398426736, 0.7994754370007088, 0.8003948881286989, 0.801314970826224, 0.8022356625038153, 0.80315694038366, 0.804078781500349, 0.8050011627016646, 0.8059240606494097, 0.8068474518202786, 0.8077713125067708, 0.808695618818145, 0.8096203466814209, 0.8105454718424193, 0.8114709698668496, 0.8123968161414393, 0.813322985875108, 0.8142494541001892, 0.8151761956736939, 0.8161031852786212, 0.8170303974253151, 0.8179578064528652, 0.818885386530559, 0.819813111659375, 0.8207409556735269, 0.8216688922420549, 0.8225968948704597, 0.823524936902394, 0.8244529915213921, 0.8253810317526543, 0.8263090304648776, 0.8272369603721339, 0.8281647940358007, 0.829092503866538, 0.8300200621263154, 0.8309474409304892, 0.8318746122499264, 0.832801547913184, 0.8337282196087319, 0.8346545988872303, 0.8355806571638543, 0.8365063657206686, 0.8374316957090556, 0.8383566181521899, 0.8392811039475636, 0.8402051238695641, 0.8411286485720973, 0.8420516485912676, 0.842974094348101, 0.8438959561513226, 0.8448172042001827, 0.8457378085873303, 0.8466577393017409, 0.8475769662316898, 0.8484954591677752, 0.8494131878059923, 0.8503301217508542, 0.8512462305185605, 0.8521614835402195, 0.8530758501651111, 0.8539892996640034, 0.8549018012325135, 0.8558133239945152, 0.8567238370055972, 0.8576333092565631, 0.8585417096769797, 0.8594490071387709, 0.8603551704598541, 0.8612601684078269, 0.8621639697036914, 0.8630665430256252, 0.8639678570127978, 0.8648678802692225, 0.8657665813676589, 0.8666639288535507, 0.8675598912490057, 0.8684544370568166, 0.8693475347645198, 0.8702391528484953, 0.8711292597781015, 0.8720178240198494, 0.8729048140416124, 0.8737901983168702, 0.8746739453289921, 0.8755560235755486, 0.8764364015726605, 0.8773150478593779, 0.8781919310020899, 0.8790670195989689, 0.879940282284439, 0.8808116877336767, 0.881681204667137, 0.8825488018551069, 0.883414448122284, 0.8842781123523814, 0.8851397634927514, 0.8859993705590364, 0.8868569026398372, 0.8877123289014038, 0.8885656185923438, 0.889416741048348, 0.8902656656969333, 0.8911123620621997, 0.8919567997696031, 0.8927989485507394, 0.8936387782481389, 0.8944762588200738, 0.8953113603453724, 0.8961440530282395, 0.8969743072030878, 0.897802093339368, 0.8986273820464074, 0.8994501440782465, 0.9002703503384788, 0.9010879718850887, 0.9019029799352888, 0.9027153458703494, 0.9035250412404285, 0.904332037769389, 0.9051363073596139, 0.9059378220968077, 0.9067365542547876, 0.9075324763002638, 0.9083255608976014, 0.9091157809135737, 0.9099031094220908, 0.9106875197089146, 0.9114689852763506, 0.9122474798479191, 0.9130229773730038, 0.9137954520314739, 0.9145648782382801, 0.9153312306480232, 0.9160944841594914, 0.916854613920169, 0.91761159533071, 0.9183654040493785, 0.9191160159964527, 0.9198634073585908, 0.9206075545931599, 0.9213484344325221, 0.9220860238882803, 0.9228203002554781, 0.9235512411167558, 0.9242788243464608, 0.9250030281147072, 0.9257238308913875, 0.9264412114501321, 0.9271551488722154, 0.9278656225504098, 0.9285726121927815, 0.9292760978264312, 0.9299760598011737, 0.930672478793159, 0.9313653358084327, 0.932054612186432, 0.9327402896034169, 0.9334223500758383, 0.9341007759636364, 0.9347755499734717, 0.9354466551618879, 0.9361140749384017, 0.9367777930685217, 0.9374377936766936, 0.9380940612491696, 0.9387465806368053, 0.939395337057776, 0.940040316100217, 0.940681503724784, 0.9413188862671328, 0.9419524504403191, 0.9425821833371147, 0.9432080724322407, 0.9438301055845156, 0.9444482710389194, 0.9450625574285706, 0.9456729537766172, 0.9462794494980383, 0.946882034401358, 0.9474806986902686, 0.9480754329651656, 0.9486662282245908, 0.9492530758665821, 0.9498359676899343, 0.9504148958953628, 0.9509898530865789, 0.9515608322712674, 0.95212782686197, 0.9526908306768762, 0.9532498379405159, 0.9538048432843582, 0.9543558417473142, 0.9549028287761421, 0.9554458002257561, 0.9559847523594392, 0.9565196818489589, 0.9570505857745848, 0.9575774616250091, 0.9581003072971712, 0.9586191210959817, 0.9591339017339535, 0.9596446483307316, 0.9601513604125271, 0.9606540379114561, 0.9611526811647764, 0.961647290914034, 0.9621378683041089, 0.9626244148821654, 0.9631069325965074, 0.9635854237953377, 0.9640598912254223, 0.9645303380306605, 0.9649967677505601, 0.9654591843186198, 0.9659175920606181, 0.9663719956928093, 0.9668224003200293, 0.9672688114337095, 0.9677112349097987, 0.9681496770065986, 0.9685841443625066, 0.9690146439936753, 0.9694411832915806, 0.9698637700205052, 0.9702824123149376, 0.9706971186768856, 0.9711078979731065, 0.9715147594322557, 0.9719177126419546, 0.9723167675457752, 0.9727119344401499, 0.9731032239712005, 0.973490647131492, 0.9738742152567103, 0.9742539400222656, 0.9746298334398233, 0.9750019078537633, 0.9753701759375687, 0.9757346506901456, 0.9760953454320755, 0.9764522738018013, 0.9768054497517495, 0.9771548875443871, 0.9775006017482196, 0.977842607233726, 0.978180919169236, 0.9785155530167512, 0.9788465245277089, 0.979173849738692, 0.9794975449670876, 0.9798176268066929, 0.9801341121232736, 0.9804470180500734, 0.9807563619832774, 0.9810621615774333, 0.9813644347408259, 0.9816631996308148, 0.9819584746491298, 0.9822502784371305, 0.9825386298710297, 0.9828235480570813, 0.9831050523267372, 0.983383162231774, 0.9836578975393883, 0.9839292782272674, 0.984197324478634, 0.9844620566772642, 0.9847234954024893, 0.984981661424171, 0.9852365756976635, 0.9854882593587557, 0.9857367337185985, 0.9859820202586206, 0.9862241406254321, 0.9864631166257174, 0.9866989702211209, 0.9869317235231262, 0.9871613987879321, 0.9873880184113224, 0.9876116049235377, 0.9878321809841469, 0.9880497693769199, 0.9882643930047048, 0.9884760748843119, 0.9886848381414017, 0.9888907060053858, 0.9890937018043342, 0.9892938489598987, 0.9894911709822457, 0.9896856914650081, 0.9898774340802508, 0.9900664225734572, 0.9902526807585337, 0.9904362325128357, 0.9906171017722178, 0.9907953125261068, 0.9909708888126006, 0.9911438547135967, 0.9913142343499449, 0.9914820518766336, 0.9916473314780067, 0.9918100973630116, 0.9919703737604836, 0.9921281849144636, 0.9922835550795531, 0.9924365085163083, 0.9925870694866696, 0.9927352622494368, 0.9928811110557801, 0.9930246401447987, 0.993165873739118, 0.9933048360405364, 0.9934415512257153, 0.993576043441916, 0.9937083368027853, 0.9938384553841899, 0.9939664232201005, 0.9940922642985269, 0.994216002557503, 0.9943376618811289, 0.9944572660956604, 0.9945748389656581, 0.9946904041901876, 0.9948039853990783, 0.9949156061492364, 0.9950252899210171, 0.995133060114654, 0.9952389400467454, 0.995342952946803, 0.9954451219538573, 0.9955454701131247, 0.9956440203727365, 0.9957407955805251, 0.9958358184808783, 0.9959291117116499, 0.9960206978011361, 0.9961105991651147, 0.9961988381039464, 0.9962854367997407, 0.9963704173135866, 0.9964538015828447, 0.9965356114185079, 0.9966158685026226, 0.9966945943857782, 0.9967718104846595, 0.9968475380796648, 0.99692179831259, 0.9969946121843769, 0.9970660005529276, 0.9971359841309844, 0.9972045834840739, 0.9972718190285185, 0.9973377110295113, 0.9974022795992565, 0.9974655446951762, 0.9975275261181803, 0.9975882435110034, 0.9976477163566033, 0.9977059639766268, 0.9977630055299374, 0.997818860011209, 0.9978735462495815, 0.9979270829073801, 0.9979794884788981, 0.9980307812892412, 0.9980809794932362, 0.9981301010743986, 0.9981781638439642, 0.9982251854399801, 0.9982711833264575, 0.9983161747925828, 0.9983601769519906, 0.9984032067420937, 0.9984452809234725, 0.9984864160793228, 0.9985266286149601, 0.9985659347573818, 0.9986043505548844, 0.9986418918767368, 0.9986785744129099, 0.998714413673858, 0.998749424990356, 0.9987836235133889, 0.9988170242140934, 0.9988496418837508, 0.9988814911338322, 0.998912586396092, 0.9989429419227126, 0.9989725717864961, 0.9990014898811054, 0.999029709921351, 0.9990572454435257, 0.9990841098057834, 0.999110316188564, 0.9991358775950607, 0.9991608068517319, 0.9991851166088542, 0.9992088193411183, 0.9992319273482637, 0.9992544527557546, 0.9992764075154946, 0.9992978034065785, 0.9993186520360817, 0.9993389648398873, 0.9993587530835466, 0.9993780278631752, 0.9993968001063834, 0.9994150805732382, 0.999432879857258, 0.9994502083864382, 0.9994670764243074, 0.9994834940710124, 0.9994994712644315, 0.9995150177813159, 0.9995301432384582, 0.9995448570938844, 0.9995591686480743, 0.9995730870452024, 0.9995866212744051, 0.9995997801710675, 0.999612572418134, 0.9996250065474367, 0.9996370909410467, 0.999648833832642, 0.9996602433088934, 0.9996713273108689, 0.9996820936354537, 0.999692549936785, 0.9997027037277025, 0.999712562381212, 0.9997221331319622, 0.9997314230777343, 0.9997404391809414, 0.9997491882701405, 0.9997576770415533, 0.999765912060595, 0.9997738997634138, 0.9997816464584355, 0.9997891583279166, 0.9997964414295029, 0.999803501697792, 0.9998103449459033, 0.999816976867049, 0.9998234030361102, 0.999829628911214, 0.9998356598353141, 0.9998415010377707, 0.9998471576359322, 0.999852634636717, 0.9998579369381927, 0.9998630693311553, 0.9998680365007074, 0.9998728430278304, 0.9998774933909581, 0.999881991967542, 0.9998863430356161, 0.9998905507753536, 0.999894619270621, 0.9998985525105247, 0.9999023543909511, 0.9999060287161011, 0.9999095792000154, 0.9999130094680942, 0.9999163230586059, 0.9999195234241895, 0.9999226139333466, 0.9999255978719231, 0.9999284784445837, 0.9999312587762728, 0.999933941913666, 0.9999365308266113, 0.9999390284095576, 0.9999414374829719, 0.9999437607947448, 0.9999460010215822, 0.9999481607703863, 0.9999502425796218, 0.9999522489206705, 0.9999541821991705, 0.9999560447563426, 0.9999578388703039, 0.9999595667573643, 0.9999612305733117, 0.9999628324146801, 0.9999643743200051, 0.9999658582710617, 0.99996728619409, 0.999968659961003, 0.9999699813905812, 0.99997125224965, 0.9999724742542414, 0.9999736490707419, 0.9999747783170227, 0.9999758635635542, 0.9999769063345051, 0.9999779081088251, 0.9999788703213118, 0.9999797943636607, 0.9999806815855004, 0.9999815332954092, 0.9999823507619192, 0.9999831352145001, 0.9999838878445301, 0.9999846098062478, 0.9999853022176913, 0.9999859661616177, 0.9999866026864088, 0.9999872128069597, 0.9999877975055522, 0.9999883577327118, 0.999988894408048, 0.9999894084210814, 0.9999899006320524, 0.9999903718727151, 0.9999908229471173, 0.9999912546323624, 0.9999916676793582, 0.9999920628135499, 0.9999924407356378, 0.9999928021222794, 0.9999931476267794, 0.9999934778797613, 0.9999937934898278, 0.9999940950442047, 0.9999943831093716, 0.9999946582316784, 0.9999949209379476, 0.9999951717360629, 0.999995411115545, 0.9999956395481132, 0.9999958574882337, 0.9999960653736548, 0.99999626362593, 0.9999964526509282, 0.9999966328393306, 0.9999968045671149, 0.9999969681960302, 0.9999971240740557, 0.9999972725358514, 0.9999974139031941, 0.9999975484854048, 0.9999976765797622, 0.9999977984719082, 0.9999979144362383, 0.999998024736286, 0.9999981296250942, 0.9999982293455751, 0.9999983241308638, 0.9999984142046582, 0.9999984997815514, 0.9999985810673536, 0.9999986582594059, 0.999998731546883, 0.9999988011110885, 0.9999988671257414, 0.9999989297572521, 0.9999989891649942, 0.9999990455015622, 0.9999990989130264, 0.9999991495391775, 0.9999991975137636, 0.9999992429647204, 0.9999992860143929, 0.999999326779752, 0.999999365372602, 0.9999994018997822, 0.9999994364633624, 0.9999994691608309, 0.9999995000852769, 0.9999995293255665, 0.9999995569665123, 0.9999995830890389, 0.9999996077703395, 0.9999996310840311, 0.9999996531003001, 0.9999996738860468, 0.999999693505021, 0.9999997120179552, 0.9999997294826924, 0.999999745954309, 0.999999761485233, 0.9999997761253582, 0.9999997899221549, 0.9999998029207735, 0.9999998151641489, 0.9999998266930962, 0.9999998375464061, 0.9999998477609345, 0.9999998573716898, 0.9999998664119168, 0.9999998749131761, 0.9999998829054214, 0.9999998904170739, 0.9999998974750929, 0.9999999041050432, 0.9999999103311621, 0.9999999161764196, 0.9999999216625809, 0.9999999268102617, 0.9999999316389847, 0.9999999361672317, 0.999999940412494, 0.9999999443913208, 0.999999948119366, 0.9999999516114312, 0.9999999548815088, 0.9999999579428229, 0.9999999608078658, 0.9999999634884373, 0.9999999659956784, 0.9999999683401056, 0.9999999705316427, 0.9999999725796508, 0.9999999744929589, 0.9999999762798905, 0.9999999779482904, 0.9999999795055503, 0.9999999809586325, 0.9999999823140934, 0.9999999835781037, 0.9999999847564718, 0.9999999858546611, 0.99999998687781, 0.9999999878307492, 0.9999999887180197, 0.999999989543887, 0.999999990312359, 0.9999999910271978, 0.9999999916919357, 0.9999999923098865, 0.9999999928841592, 0.9999999934176698, 0.9999999939131512, 0.9999999943731652, 0.9999999948001113, 0.9999999951962371, 0.9999999955636467, 0.9999999959043093, 0.9999999962200676, 0.9999999965126449, 0.9999999967836524, 0.9999999970345963, 0.9999999972668836, 0.9999999974818288, 0.9999999976806588, 0.9999999978645195, 0.9999999980344796, 0.9999999981915357, 0.9999999983366179, 0.9999999984705923, 0.9999999985942665, 0.9999999987083923, 0.9999999988136701, 0.9999999989107515, 0.9999999990002431, 0.9999999990827089, 0.9999999991586732, 0.9999999992286239, 0.9999999992930135, 0.9999999993522628, 0.9999999994067625, 0.9999999994568751, 0.9999999995029367, 0.9999999995452593, 0.9999999995841322, 0.9999999996198232, 0.9999999996525806, 0.9999999996826343, 0.9999999997101972, 0.999999999735466, 0.9999999997586233, 0.999999999779837, 0.999999999799263, 0.9999999998170452, 0.9999999998333164, 0.9999999998481994, 0.9999999998618072, 0.9999999998742441, 0.9999999998856066, 0.9999999998959834, 0.9999999999054563, 0.9999999999141005, 0.9999999999219855, 0.9999999999291749, 0.9999999999357276, 0.9999999999416977, 0.9999999999471347, 0.9999999999520841, 0.9999999999565878, 0.9999999999606843, 0.9999999999644089, 0.999999999967794, 0.9999999999708693, 0.999999999973662, 0.9999999999761966, 0.9999999999784965, 0.9999999999805824, 0.9999999999824736, 0.9999999999841871, 0.9999999999857392, 0.9999999999871445, 0.9999999999884164, 0.9999999999895668, 0.9999999999906071, 0.9999999999915474, 0.9999999999923967, 0.9999999999931639, 0.9999999999938565, 0.9999999999944811, 0.9999999999950446, 0.9999999999955524, 0.9999999999960101, 0.9999999999964222, 0.9999999999967932, 0.9999999999971272, 0.9999999999974274, 0.9999999999976974, 0.9999999999979399, 0.9999999999981577, 0.9999999999983533, 0.999999999998529, 0.9999999999986864, 0.9999999999988274, 0.999999999998954, 0.9999999999990672, 0.9999999999991687, 0.9999999999992593, 0.9999999999993405, 0.9999999999994129, 0.9999999999994778, 0.9999999999995357, 0.9999999999995874, 0.9999999999996334, 0.9999999999996745, 0.9999999999997111, 0.9999999999997438, 0.9999999999997728, 0.9999999999997988, 0.9999999999998217, 0.9999999999998423, 0.9999999999998603, 0.9999999999998765, 0.999999999999891, 0.9999999999999036, 0.999999999999915, 0.999999999999925, 0.9999999999999338, 0.9999999999999416, 0.9999999999999485, 0.9999999999999547, 0.99999999999996, 0.9999999999999649, 0.9999999999999691, 0.9999999999999729, 0.9999999999999762, 0.9999999999999791, 0.9999999999999816, 0.999999999999984, 0.999999999999986, 0.9999999999999876, 0.9999999999999891, 0.9999999999999905, 0.9999999999999918, 0.9999999999999927, 0.9999999999999938, 0.9999999999999944, 0.9999999999999951, 0.9999999999999958, 0.9999999999999964, 0.9999999999999969, 0.9999999999999973, 0.9999999999999976, 0.999999999999998, 0.9999999999999982, 0.9999999999999984, 0.9999999999999987, 0.9999999999999989, 0.9999999999999989, 0.9999999999999991, 0.9999999999999993, 0.9999999999999993, 0.9999999999999993, 0.9999999999999996, 0.9999999999999996, 0.9999999999999996, 0.9999999999999998, 0.9999999999999998, 0.9999999999999998, 0.9999999999999998, 0.9999999999999998, 0.9999999999999998, 0.9999999999999998, 0.9999999999999998, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]}
},{}],72:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var expit = require( './../lib' );


// FIXTURES //

var positive = require( './fixtures/python/positive.json' );
var negative = require( './fixtures/python/negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof expit, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` when provided `NaN`', function test( t ) {
	var y = expit( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `0.5` when provided `0`', function test( t ) {
	var y = expit( 0.0 );
	t.equal( y, 0.5, 'returns 0.5' );
	t.end();
});

tape( 'the function returns `1.0` when provided `+Infinity`', function test( t ) {
	var y = expit( PINF );
	t.equal( y, 1.0, 'returns 1.0' );
	t.end();
});

tape( 'the function returns `0.0` when provided `-Infinity`', function test( t ) {
	var y = expit( NINF );
	t.equal( y, 0.0, 'returns 0.0' );
	t.end();
});

tape( 'the function evaluates the standard logistic function for negative numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = negative.expected;
	x = negative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = expit( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.5 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. v: '+y+'. E: '+expected[i]+' Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the standard logistic function for positive numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = positive.expected;
	x = positive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = expit( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.5 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. v: '+y+'. E: '+expected[i]+' Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/expit/test/test.js")
},{"./../lib":68,"./fixtures/python/negative.json":70,"./fixtures/python/positive.json":71,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":204}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":76}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":46,"@stdlib/constants/float64/max-base2-exponent-subnormal":45,"@stdlib/constants/float64/min-base2-exponent-subnormal":47,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":63,"@stdlib/number/float64/base/exponent":81,"@stdlib/number/float64/base/from-words":83,"@stdlib/number/float64/base/normalize":89,"@stdlib/number/float64/base/to-words":92}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":60,"@stdlib/math/base/special/floor":73}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":82}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":87}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":85}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":84,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":86,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":91}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":50,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":94}],93:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":84}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":93,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":97,"./polyfill.js":98,"@stdlib/assert/has-tostringtag-support":20}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":99}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":99,"./tostringtag.js":100,"@stdlib/assert/has-own-property":16}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){

},{}],103:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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
},{"_process":196}],106:[function(require,module,exports){
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

},{"events":104,"inherits":191,"readable-stream/lib/_stream_duplex.js":108,"readable-stream/lib/_stream_passthrough.js":109,"readable-stream/lib/_stream_readable.js":110,"readable-stream/lib/_stream_transform.js":111,"readable-stream/lib/_stream_writable.js":112,"readable-stream/lib/internal/streams/end-of-stream.js":116,"readable-stream/lib/internal/streams/pipeline.js":118}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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
},{"./_stream_readable":110,"./_stream_writable":112,"_process":196,"inherits":191}],109:[function(require,module,exports){
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
},{"./_stream_transform":111,"inherits":191}],110:[function(require,module,exports){
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
},{"../errors":107,"./_stream_duplex":108,"./internal/streams/async_iterator":113,"./internal/streams/buffer_list":114,"./internal/streams/destroy":115,"./internal/streams/from":117,"./internal/streams/state":119,"./internal/streams/stream":120,"_process":196,"buffer":121,"events":104,"inherits":191,"string_decoder/":203,"util":102}],111:[function(require,module,exports){
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
},{"../errors":107,"./_stream_duplex":108,"inherits":191}],112:[function(require,module,exports){
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
},{"../errors":107,"./_stream_duplex":108,"./internal/streams/destroy":115,"./internal/streams/state":119,"./internal/streams/stream":120,"_process":196,"buffer":121,"inherits":191,"util-deprecate":212}],113:[function(require,module,exports){
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
},{"./end-of-stream":116,"_process":196}],114:[function(require,module,exports){
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
},{"buffer":121,"util":102}],115:[function(require,module,exports){
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
},{"_process":196}],116:[function(require,module,exports){
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
},{"../../../errors":107}],117:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],118:[function(require,module,exports){
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
},{"../../../errors":107,"./end-of-stream":116}],119:[function(require,module,exports){
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
},{"../../../errors":107}],120:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":104}],121:[function(require,module,exports){
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
},{"base64-js":101,"buffer":121,"ieee754":190}],122:[function(require,module,exports){
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

},{"./":123,"get-intrinsic":186}],123:[function(require,module,exports){
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

},{"function-bind":185,"get-intrinsic":186}],124:[function(require,module,exports){
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

},{"./lib/is_arguments.js":125,"./lib/keys.js":126}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],127:[function(require,module,exports){
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

},{"object-keys":194}],128:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],129:[function(require,module,exports){
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

},{"./ToNumber":159,"./ToPrimitive":161,"./Type":166}],130:[function(require,module,exports){
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

},{"../helpers/isFinite":175,"../helpers/isNaN":176,"../helpers/isPrefixOf":177,"./ToNumber":159,"./ToPrimitive":161,"./Type":166,"get-intrinsic":186}],131:[function(require,module,exports){
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

},{"get-intrinsic":186}],132:[function(require,module,exports){
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

},{"./DayWithinYear":135,"./InLeapYear":139,"./MonthFromTime":149,"get-intrinsic":186}],133:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":181,"./floor":170}],134:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":170}],135:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":133,"./DayFromYear":134,"./YearFromTime":168}],136:[function(require,module,exports){
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

},{"./modulo":171}],137:[function(require,module,exports){
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

},{"../helpers/assertRecord":174,"./IsAccessorDescriptor":140,"./IsDataDescriptor":142,"./Type":166,"get-intrinsic":186}],138:[function(require,module,exports){
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

},{"../helpers/timeConstants":181,"./floor":170,"./modulo":171}],139:[function(require,module,exports){
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

},{"./DaysInYear":136,"./YearFromTime":168,"get-intrinsic":186}],140:[function(require,module,exports){
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

},{"../helpers/assertRecord":174,"./Type":166,"has":189}],141:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":192}],142:[function(require,module,exports){
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

},{"../helpers/assertRecord":174,"./Type":166,"has":189}],143:[function(require,module,exports){
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

},{"../helpers/assertRecord":174,"./IsAccessorDescriptor":140,"./IsDataDescriptor":142,"./Type":166}],144:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":178,"./IsAccessorDescriptor":140,"./IsDataDescriptor":142,"./Type":166}],145:[function(require,module,exports){
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

},{"../helpers/isFinite":175,"../helpers/timeConstants":181}],146:[function(require,module,exports){
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

},{"../helpers/isFinite":175,"./DateFromTime":132,"./Day":133,"./MonthFromTime":149,"./ToInteger":158,"./YearFromTime":168,"./floor":170,"./modulo":171,"get-intrinsic":186}],147:[function(require,module,exports){
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

},{"../helpers/isFinite":175,"../helpers/timeConstants":181,"./ToInteger":158}],148:[function(require,module,exports){
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

},{"../helpers/timeConstants":181,"./floor":170,"./modulo":171}],149:[function(require,module,exports){
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

},{"./DayWithinYear":135,"./InLeapYear":139}],150:[function(require,module,exports){
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

},{"../helpers/isNaN":176}],151:[function(require,module,exports){
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

},{"../helpers/timeConstants":181,"./floor":170,"./modulo":171}],152:[function(require,module,exports){
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

},{"./Type":166}],153:[function(require,module,exports){
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


},{"../helpers/isFinite":175,"./ToNumber":159,"./abs":169,"get-intrinsic":186}],154:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":181,"./DayFromYear":134}],155:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":181,"./modulo":171}],156:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],157:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":159}],158:[function(require,module,exports){
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

},{"../helpers/isFinite":175,"../helpers/isNaN":176,"../helpers/sign":180,"./ToNumber":159,"./abs":169,"./floor":170}],159:[function(require,module,exports){
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

},{"./ToPrimitive":161}],160:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":131,"get-intrinsic":186}],161:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":182}],162:[function(require,module,exports){
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

},{"./IsCallable":141,"./ToBoolean":156,"./Type":166,"get-intrinsic":186,"has":189}],163:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":186}],164:[function(require,module,exports){
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

},{"../helpers/isFinite":175,"../helpers/isNaN":176,"../helpers/sign":180,"./ToNumber":159,"./abs":169,"./floor":170,"./modulo":171}],165:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":159}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":133,"./modulo":171}],168:[function(require,module,exports){
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

},{"call-bind/callBound":122,"get-intrinsic":186}],169:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":186}],170:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],171:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":179}],172:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":181,"./modulo":171}],173:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":129,"./5/AbstractRelationalComparison":130,"./5/CheckObjectCoercible":131,"./5/DateFromTime":132,"./5/Day":133,"./5/DayFromYear":134,"./5/DayWithinYear":135,"./5/DaysInYear":136,"./5/FromPropertyDescriptor":137,"./5/HourFromTime":138,"./5/InLeapYear":139,"./5/IsAccessorDescriptor":140,"./5/IsCallable":141,"./5/IsDataDescriptor":142,"./5/IsGenericDescriptor":143,"./5/IsPropertyDescriptor":144,"./5/MakeDate":145,"./5/MakeDay":146,"./5/MakeTime":147,"./5/MinFromTime":148,"./5/MonthFromTime":149,"./5/SameValue":150,"./5/SecFromTime":151,"./5/StrictEqualityComparison":152,"./5/TimeClip":153,"./5/TimeFromYear":154,"./5/TimeWithinDay":155,"./5/ToBoolean":156,"./5/ToInt32":157,"./5/ToInteger":158,"./5/ToNumber":159,"./5/ToObject":160,"./5/ToPrimitive":161,"./5/ToPropertyDescriptor":162,"./5/ToString":163,"./5/ToUint16":164,"./5/ToUint32":165,"./5/Type":166,"./5/WeekDay":167,"./5/YearFromTime":168,"./5/abs":169,"./5/floor":170,"./5/modulo":171,"./5/msFromTime":172}],174:[function(require,module,exports){
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

},{"get-intrinsic":186,"has":189}],175:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],176:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],177:[function(require,module,exports){
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

},{"call-bind/callBound":122}],178:[function(require,module,exports){
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

},{"get-intrinsic":186,"has":189}],179:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],180:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{"./helpers/isPrimitive":183,"is-callable":192}],183:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":184}],186:[function(require,module,exports){
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

},{"function-bind":185,"has":189,"has-symbols":187}],187:[function(require,module,exports){
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

},{"./shams":188}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":185}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
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

},{"./isArguments":195}],194:[function(require,module,exports){
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

},{"./implementation":193,"./isArguments":195}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
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
},{"_process":196,"through":210,"timers":211}],198:[function(require,module,exports){
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

},{"buffer":121}],199:[function(require,module,exports){
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

},{"es-abstract/es5":173,"function-bind":185}],200:[function(require,module,exports){
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

},{"./implementation":199,"./polyfill":201,"./shim":202,"define-properties":127,"function-bind":185}],201:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":199}],202:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":201,"define-properties":127}],203:[function(require,module,exports){
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
},{"safe-buffer":198}],204:[function(require,module,exports){
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
},{"./lib/default_stream":205,"./lib/results":207,"./lib/test":208,"_process":196,"defined":128,"through":210,"timers":211}],205:[function(require,module,exports){
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
},{"_process":196,"fs":103,"through":210}],206:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":196,"timers":211}],207:[function(require,module,exports){
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
},{"_process":196,"events":104,"function-bind":185,"has":189,"inherits":191,"object-inspect":209,"resumer":197,"through":210,"timers":211}],208:[function(require,module,exports){
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
},{"./next_tick":206,"deep-equal":124,"defined":128,"events":104,"has":189,"inherits":191,"path":105,"string.prototype.trim":200}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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
},{"_process":196,"stream":106}],211:[function(require,module,exports){
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
},{"process/browser.js":196,"timers":211}],212:[function(require,module,exports){
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
},{}]},{},[72]);
